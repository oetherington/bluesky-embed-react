import React, { CSSProperties, FC, MouseEvent, useCallback, useState } from "react";
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

export type BlueskyEmbedData =
	| AppBskyEmbedImages.View
	| AppBskyEmbedVideo.View
	| AppBskyEmbedExternal.View
	| AppBskyEmbedRecord.View
	| AppBskyEmbedRecordWithMedia.View
	| { $type: string; [k: string]: unknown };

export type BlueskyEmbedProps = {
	embed: BlueskyEmbedData,
}

const commonStyles = (
	borderColor: string,
	aspect?: AppBskyEmbedDefs.AspectRatio
): CSSProperties => ({
	width: "100%",
	borderRadius: 10,
	border: `1px solid ${borderColor}`,
	aspectRatio: aspect ? `${aspect.width} / ${aspect.height}` : undefined,
});

const getYoutubeEmbedUrl = (uri: string) => {
	const result = uri.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/);
	return result ? `https://www.youtube.com/embed/${result[1]}?autoplay=1` : null;
}

const BlueskyImages: FC<{image: AppBskyEmbedImages.View}> = ({
	image: {images},
}) => {
	const {openLinksInNewTab, borderColor, grid} = useBlueskyConfig();
	const linkProps = getBlueskyLinkProps(openLinksInNewTab);

	switch (images.length) {
		case 0:
			return null;

		case 1:
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

		default:
			return (
				<div style={{
					display: "flex",
					flexWrap: "wrap",
					gap: grid,
					width: "100%",
				}}>
					{images.map((image) => (
						<div key={image.thumb} style={{
							flexGrow: 1,
							flexBasis: "40%",
						}}>
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

export const BlueskyEmbed: FC<BlueskyEmbedProps> = ({embed}) => {
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
	const onReveal = useCallback((ev?: MouseEvent) => {
		if (!revealed) {
			ev?.preventDefault();
			ev?.stopPropagation();
			setRevealed(true);
		}
	}, [revealed]);

	switch (embed.$type) {
		case "app.bsky.embed.images#view":
			return (
				<div style={{width: "100%", marginTop}}>
					<BlueskyImages image={embed as AppBskyEmbedImages.View} />
				</div>
			);

		case "app.bsky.embed.video#view":
			const video = embed as AppBskyEmbedVideo.View;
			return (
				<video
					controls
					src={video.playlist}
					poster={video.thumbnail}
					title={video.alt}
					style={{
						marginTop,
						...commonStyles(borderColor, video.aspectRatio),
					}}
				/>
			);

		case "app.bsky.embed.external#view":
			const external = embed as AppBskyEmbedExternal.View;
			const {title, description, thumb, uri} = external.external;
			const youtubeEmbedUrl = getYoutubeEmbedUrl(uri);
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
					{thumb &&
						<div
							onClick={youtubeEmbedUrl ? onReveal : undefined}
							style={{
								height: 300,
								overflow: "hidden",
								borderBottom: `1px solid ${borderColor}`,
								backgroundImage: `url(${thumb})`,
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
							}}
						>
							{youtubeEmbedUrl && revealed &&
								<iframe
									src={youtubeEmbedUrl}
									title={title}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
									style={{
										width: "100%",
										height: "100%",
										border: 0,
									}}
								/>
							}
							{youtubeEmbedUrl && !revealed &&
								<div style={{
									width: "100%",
									height: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									background: "rgba(100, 100, 100, 0.4)",
								}}>
									<BlueskyPlayIcon />
								</div>
							}
						</div>
					}
					<div style={{
						display: "flex",
						flexDirection: "column",
						gap: grid / 2,
						padding: grid,
					}}>
						{title &&
							<div style={{
								fontWeight: titleFontWeight,
							}}>
								{title}
							</div>
						}
						{description &&
							<div style={{fontSize: embedFontSize}}>
								{description}
							</div>
						}
					</div>
				</a>
			);

		default:
			return null;
	}
}
