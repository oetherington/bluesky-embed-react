import React, { CSSProperties, FC } from "react";
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

	console.log({embed})

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
						<div style={{
							height: 300,
							overflow: "hidden",
							borderBottom: `1px solid ${borderColor}`,
							backgroundImage: `url(${thumb})`,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}} />
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
