import React, {
	CSSProperties,
	FC,
	MouseEvent,
	useCallback,
	useRef,
	useState,
} from "react";
import type {
	AppBskyEmbedDefs,
	AppBskyEmbedExternal,
	AppBskyEmbedImages,
	AppBskyEmbedRecord,
	AppBskyEmbedRecordWithMedia,
	AppBskyEmbedVideo,
} from "@atproto/api";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import { getBlueskyLinkProps } from "../helpers";
import { BlueskyPlayIcon } from "./BlueskyPlayIcon";
import { BlueskyWorldIcon } from "./BlueskyWorldIcon";
import { useBlueskyHLS } from "../hooks/useBlueskyHLS";

export type BlueskyEmbedData =
	| AppBskyEmbedImages.View
	| AppBskyEmbedVideo.View
	| AppBskyEmbedExternal.View
	| AppBskyEmbedRecord.View
	| AppBskyEmbedRecordWithMedia.View
	| { $type: string; [k: string]: unknown };

export type BlueskyEmbedProps = {
	embed: BlueskyEmbedData;
};

const commonStyles = (
	borderColor: string,
	aspect?: AppBskyEmbedDefs.AspectRatio,
): CSSProperties => ({
	width: "100%",
	borderRadius: 10,
	border: `1px solid ${borderColor}`,
	aspectRatio: aspect ? `${aspect.width} / ${aspect.height}` : undefined,
});

const youtubeRegex = new RegExp(
	"(?:youtu\\.be\\/|youtube\\.com(?:\\/embed\\/|\\/v\\/|\\/watch\\?v=|\\/user\\/\\S+|\\/ytscreeningroom\\?v=))([\\w-]{10,12})\\b",
);
const vimeoRegex = new RegExp(
	"vimeo\\.com\\/(?:channels\\/(?:\\w+\\/)?|groups\\/(?:[^\\/]*)\\/videos\\/|video\\/|)(\\d+)(?:|\\/\\?)",
);
const twitchRegex = new RegExp("twitch.tv/(.+)");

const getIframeEmbedUrl = (url: string): string | null => {
	let match = url.match(youtubeRegex);
	if (match) {
		return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
	}
	match = url.match(vimeoRegex);
	if (match) {
		return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
	}
	match = url.match(twitchRegex);
	if (match) {
		const parent =
			typeof window === "undefined" ? "localhost" : window.location.hostname;
		const [channelOrVideo, clipOrId, id] = match[1].split("/");
		if (channelOrVideo === "videos") {
			return `https://player.twitch.tv/?volume=0.5&!muted&autoplay&video=${clipOrId}&parent=${parent}`;
		} else if (clipOrId === "clip") {
			return `https://clips.twitch.tv/embed?volume=0.5&autoplay=true&clip=${id}&parent=${parent}`;
		} else if (channelOrVideo) {
			return `https://player.twitch.tv/?volume=0.5&!muted&autoplay&channel=${channelOrVideo}&parent=${parent}`;
		}
	}
	return null;
};

const getUrlHost = (url: string): string | null => {
	try {
		const host = new URL(url).hostname;
		return host.replace("www.", "");
	} catch (_e) {
		return null;
	}
};

const BlueskyImages: FC<{ image: AppBskyEmbedImages.View }> = ({
	image: { images },
}) => {
	const { openLinksInNewTab, borderColor, grid } = useBlueskyConfig();
	const linkProps = getBlueskyLinkProps(openLinksInNewTab);

	switch (images.length) {
		case 0:
			return null;

		case 1: {
			const image = images[0];
			return (
				<a href={image.fullsize} {...linkProps}>
					<img
						src={image.fullsize}
						title={image.alt}
						alt={image.alt}
						style={commonStyles(borderColor, image.aspectRatio)}
					/>
				</a>
			);
		}

		default: {
			return (
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: grid,
						width: "100%",
					}}
				>
					{images.map((image) => (
						<div
							key={image.thumb}
							style={{
								flexGrow: 1,
								flexBasis: "40%",
							}}
						>
							<a href={image.fullsize} {...linkProps}>
								<img
									src={image.thumb}
									title={image.alt}
									alt={image.alt}
									style={{
										...commonStyles(borderColor),
										aspectRatio: 1,
										objectFit: "cover",
									}}
								/>
							</a>
						</div>
					))}
				</div>
			);
		}
	}
};

const BlueskyVideo: FC<{ video: AppBskyEmbedVideo.View }> = ({ video }) => {
	const { borderColor } = useBlueskyConfig();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [_hasSubtitleTrack, setHasSubtitleTrack] = useState(false);
	const [_hlsLoading, setHlsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useBlueskyHLS({
		playlist: video.playlist,
		setHasSubtitleTrack,
		setError,
		videoRef,
		setHlsLoading,
	});

	if (error) {
		console.error("Video embed error", error);
		return null;
	}

	return (
		<video
			ref={videoRef}
			title={video.alt}
			poster={video.thumbnail}
			style={commonStyles(borderColor, video.aspectRatio)}
			preload="none"
			playsInline
			controls
		/>
	);
};

export const BlueskyEmbed: FC<BlueskyEmbedProps> = ({ embed }) => {
	const {
		openLinksInNewTab,
		embedFontSize,
		titleFontWeight,
		fontWeight,
		lineHeight,
		borderColor,
		textPrimaryColor,
		grid,
	} = useBlueskyConfig();
	const marginTop = 2 * grid;

	const [revealed, setRevealed] = useState(false);
	const onReveal = useCallback(
		(ev?: MouseEvent) => {
			if (!revealed) {
				ev?.preventDefault();
				ev?.stopPropagation();
				setRevealed(true);
			}
		},
		[revealed],
	);

	switch (embed.$type) {
		case "app.bsky.embed.images#view": {
			return (
				<div style={{ width: "100%", marginTop }}>
					<BlueskyImages image={embed as AppBskyEmbedImages.View} />
				</div>
			);
		}

		case "app.bsky.embed.video#view": {
			return (
				<div style={{ width: "100%", marginTop }}>
					<BlueskyVideo video={embed as AppBskyEmbedVideo.View} />
				</div>
			);
		}

		case "app.bsky.embed.external#view": {
			const external = embed as AppBskyEmbedExternal.View;
			const { title, description, thumb, uri } = external.external;
			const iframeEmbedUrl = getIframeEmbedUrl(uri);
			const host = getUrlHost(uri);
			return (
				<a
					href={uri}
					{...getBlueskyLinkProps(openLinksInNewTab)}
					style={{
						display: "block",
						overflow: "hidden",
						textDecoration: "none",
						color: textPrimaryColor,
						fontWeight,
						lineHeight,
						marginTop,
						...commonStyles(borderColor),
					}}
				>
					{thumb && (
						<div
							onClick={iframeEmbedUrl ? onReveal : undefined}
							style={{
								height: 300,
								overflow: "hidden",
								borderBottom: `1px solid ${borderColor}`,
								backgroundImage: revealed
									? undefined
									: `url(${thumb})`,
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundColor: "white",
							}}
						>
							{iframeEmbedUrl && revealed && (
								<iframe
									src={iframeEmbedUrl}
									title={title}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
									style={{
										width: "100%",
										height: "100%",
										border: 0,
									}}
								/>
							)}
							{iframeEmbedUrl && !revealed && (
								<div
									style={{
										width: "100%",
										height: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										background: "rgba(100, 100, 100, 0.4)",
									}}
								>
									<BlueskyPlayIcon />
								</div>
							)}
						</div>
					)}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: grid / 2,
							padding: grid,
						}}
					>
						{title && (
							<div
								style={{
									fontWeight: titleFontWeight,
								}}
							>
								{title}
							</div>
						)}
						{description && (
							<div style={{ fontSize: embedFontSize }}>
								{description}
							</div>
						)}
						{host && (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: grid / 2,
									borderTop: `1px solid ${borderColor}`,
									fontSize: "0.7rem",
									marginTop: grid / 2,
									paddingTop: grid / 2,
									opacity: 0.6,
								}}
							>
								<BlueskyWorldIcon />
								{host}
							</div>
						)}
					</div>
				</a>
			);
		}

		default: {
			return null;
		}
	}
};
