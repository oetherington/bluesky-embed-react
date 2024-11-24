import React, { CSSProperties, FC, MouseEvent } from "react";
import { getBlueskyLinkProps, getBlueskyProfileUrl } from "../helpers";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import { BlueskyAvatar } from "./BlueskyAvatar";
import { BlueskyText } from "./BlueskyText";
import { BlueskyEmbed } from "./BlueskyEmbed";
import type { BlueskyProfileData } from "../hooks/useBlueskyProfile";
import type { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

export type BlueskyListPosition = {
	index: number,
	total: number,
}

export type BlueskyPostDisplayProps = {
	profile: BlueskyProfileData,
	post: AppBskyFeedDefs.PostView,
	listPosition?: BlueskyListPosition,
}

const decorationHandler = (
	value: "underline" | "none",
	ev: MouseEvent<HTMLAnchorElement>,
) => {
	const target = ev.target as HTMLAnchorElement;
	target.style.textDecoration = value;
}

export const BlueskyPostDisplay: FC<BlueskyPostDisplayProps> = ({
	profile,
	post: post_,
	listPosition,
}) => {
	const {
		app,
		openLinksInNewTab,
		hideAvatars,
		hideEmbeds,
		textPrimaryColor,
		textSecondaryColor,
		backgroundColor,
		borderColor,
		fontFamily,
		fontWeight,
		titleFontWeight,
		grid,
		borderRadius,
		width,
		formatShortDate,
		formatLongDate,
	} = useBlueskyConfig();

	// TODO: Fix janky types
	const post = post_.record as AppBskyFeedPost.Record;
	const embed = post_.embed;

	const listStyles: CSSProperties = {};
	if (listPosition) {
		const {index, total} = listPosition;
		if (index === 0) {
			listStyles.borderTopLeftRadius = borderRadius;
			listStyles.borderTopRightRadius = borderRadius;
		} else if (index === total - 1) {
			listStyles.borderBottomLeftRadius = borderRadius;
			listStyles.borderBottomRightRadius = borderRadius;
		}
		if (index > 0) {
			listStyles.borderTopWidth = 0;
		}
	} else {
		listStyles.borderRadius = borderRadius;
	}

	return (
		<div style={{
			display: "flex",
			gap: grid * 1.5,
			padding: grid * 2,
			backgroundColor,
			border: `1px solid ${borderColor}`,
			fontFamily,
			minWidth: 0,
			maxWidth: "100%",
			width,
			...listStyles,
		}}>
			{!hideAvatars && <BlueskyAvatar profile={profile} />}
			<div style={{minWidth: 0}}>
				<div style={{
					display: "flex",
					gap: grid,
					marginBottom: grid,
				}}>
					<a
						href={getBlueskyProfileUrl(app, profile?.handle ?? "")}
						onMouseOver={decorationHandler.bind(null, "underline")}
						onMouseOut={decorationHandler.bind(null, "none")}
						style={{
							textDecoration: "none",
							color: textPrimaryColor,
							fontWeight: titleFontWeight,
						}}
						{...getBlueskyLinkProps(openLinksInNewTab)}
					>
						{profile?.displayName}
					</a>
					<span style={{color: textSecondaryColor, fontWeight}}>
						@{profile?.handle} ·{" "}
						<abbr
							title={formatLongDate(post.createdAt)}
							style={{textDecoration: "none"}}
						>
							{formatShortDate(post.createdAt)}
						</abbr>
					</span>
				</div>
				<BlueskyText text={post.text} />
				{embed && !hideEmbeds && <BlueskyEmbed embed={embed} />}
			</div>
		</div>
	);
}
