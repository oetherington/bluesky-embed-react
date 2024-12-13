/**
 * This file is adapted from the implementation is the main Bluesky source code.
 * https://github.com/bluesky-social/social-app/blob/b9406aa011db2db7d3bcdf7d91ef929b17a07c02/src/view/com/util/post-embeds/VideoEmbedInner/VideoEmbedInnerWeb.tsx
 * MIT License - Copyright 2023–2024 Bluesky PBC
 */

import {
	RefObject,
	useCallback,
	useEffect,
	useInsertionEffect,
	useRef,
	useState,
} from "react";
import type * as HlsTypes from "hls.js";
import { BlueskyError } from "../helpers";

type HlsModule = typeof HlsTypes.default;

const hlsLoader = new (class HlsLoader {
	public value: HlsModule | null = null;
	private listeners: ((mod: HlsModule) => void)[] = [];

	constructor() {
		void this.load();
	}

	addListener(callback: (mod: HlsModule) => void) {
		this.listeners.push(callback);
	}

	private async load() {
		// @ts-expect-error hls.js is a relatively large library - load async
		const module = (await import("hls.js/dist/hls.min.js")) as {
			default: HlsModule;
		};
		this.value = module.default;
		for (const listener of this.listeners) {
			listener(module.default);
		}
	}
})();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useNonReactiveCallback = <T extends (...args: any) => any>(fn: T): T => {
	const ref = useRef<T>(fn);
	useInsertionEffect(() => {
		ref.current = fn;
	}, [fn]);
	return useCallback(
		((...args: Parameters<T>) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return ref.current(...args);
		}) as T,
		[ref],
	);
};

export class BlueskyHLSUnsupportedError extends BlueskyError {
	constructor() {
		super("HLS unsupported");
	}
}

export class BlueskyVideoNotFoundError extends BlueskyError {
	constructor() {
		super("Video not found");
	}
}

export const useBlueskyHLS = ({
	playlist,
	setHasSubtitleTrack,
	setError,
	videoRef,
	setHlsLoading,
}: {
	playlist: string;
	setHasSubtitleTrack: (v: boolean) => void;
	setError: (v: Error | null) => void;
	videoRef: RefObject<HTMLVideoElement | null>;
	setHlsLoading: (v: boolean) => void;
}) => {
	const [Hls, setHls] = useState(() => hlsLoader.value);
	useEffect(() => {
		if (!Hls) {
			setHlsLoading(true);
			hlsLoader.addListener((loadedHls) => {
				setHls(loadedHls);
				setHlsLoading(false);
			});
		}
	}, [Hls, setHlsLoading]);

	const hlsRef = useRef<HlsTypes.default | undefined>(undefined);
	const [lowQualityFragments, setLowQualityFragments] = useState<
		HlsTypes.Fragment[]
	>([]);

	// Purge low quality segments from buffer on next frag change
	const handleFragChange = useNonReactiveCallback(
		(
			_event: HlsTypes.Events.FRAG_CHANGED,
			{ frag }: HlsTypes.FragChangedData,
		) => {
			if (!Hls || !hlsRef.current) {
				return;
			}
			const hls = hlsRef.current;

			// If the current quality level goes above 0, flush the low quality
			// segments
			if (hls.nextAutoLevel > 0) {
				const flushed: HlsTypes.Fragment[] = [];

				for (const lowQualFrag of lowQualityFragments) {
					// Avoid if close to the current fragment
					if (Math.abs(frag.start - lowQualFrag.start) < 0.1) {
						continue;
					}
					hls.trigger(Hls.Events.BUFFER_FLUSHING, {
						startOffset: lowQualFrag.start,
						endOffset: lowQualFrag.end,
						type: "video",
					});
					flushed.push(lowQualFrag);
				}

				setLowQualityFragments((prev) =>
					prev.filter((f) => !flushed.includes(f)),
				);
			}
		},
	);

	const flushOnLoop = useNonReactiveCallback(() => {
		if (!Hls || !hlsRef.current) {
			return;
		}
		const hls = hlsRef.current;
		// The above callback will catch most stale frags, but there's a corner
		// case - if there's only one segment in the video, it won't get flushed
		// because it avoids flushing the currently active segment. Therefore, we
		// have to catch it when we loop.
		if (
			hls.nextAutoLevel > 0 &&
			lowQualityFragments.length === 1 &&
			lowQualityFragments[0].start === 0
		) {
			const lowQualFrag = lowQualityFragments[0];

			hls.trigger(Hls.Events.BUFFER_FLUSHING, {
				startOffset: lowQualFrag.start,
				endOffset: lowQualFrag.end,
				type: "video",
			});
			setLowQualityFragments([]);
		}
	});

	useEffect(() => {
		if (!videoRef.current || !Hls) {
			return;
		}
		if (!Hls.isSupported()) {
			throw new BlueskyHLSUnsupportedError();
		}

		const hls = new Hls({
			maxMaxBufferLength: 10, // Only load 10s ahead
			// Note: the amount buffered is affected by both maxBufferLength and
			// maxBufferSize. It will buffer until it is greater than *both* of
			// those values so we use maxMaxBufferLength to set the actual maximum
			// amount of buffering instead.
		});
		hlsRef.current = hls;

		hls.attachMedia(videoRef.current);
		hls.loadSource(playlist);

		// Manually loop, so if we've flushed the first buffer it doesn't get
		// confused
		const abortController = new AbortController();
		const { signal } = abortController;
		const videoNode = videoRef.current;
		videoNode.addEventListener(
			"ended",
			() => {
				flushOnLoop();
				videoNode.currentTime = 0;
				void videoNode.play();
			},
			{ signal },
		);

		hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, (_event, data) => {
			if (data.subtitleTracks.length > 0) {
				setHasSubtitleTrack(true);
			}
		});

		hls.on(Hls.Events.FRAG_BUFFERED, (_event, { frag }) => {
			if (frag.level === 0) {
				setLowQualityFragments((prev) => [...prev, frag]);
			}
		});

		hls.on(Hls.Events.ERROR, (_event, data) => {
			if (data.fatal) {
				if (
					(data.details as string) === "manifestLoadError" &&
					data.response?.code === 404
				) {
					setError(new BlueskyVideoNotFoundError());
				} else {
					setError(data.error);
				}
			} else {
				console.error(data.error);
			}
		});

		hls.on(Hls.Events.FRAG_CHANGED, handleFragChange);

		return () => {
			hlsRef.current = undefined;
			hls.detachMedia();
			hls.destroy();
			abortController.abort();
		};
	}, [
		playlist,
		setError,
		setHasSubtitleTrack,
		videoRef,
		handleFragChange,
		flushOnLoop,
		Hls,
	]);

	return hlsRef;
};
