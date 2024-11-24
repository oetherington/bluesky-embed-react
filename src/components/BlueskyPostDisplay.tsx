import React, { FC, MouseEvent, useCallback } from "react";
import {
	BlueskyListPosition,
	getBlueskyLinkProps,
	getBlueskyProfileUrl,
} from "../helpers";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import { BlueskyAvatar } from "./BlueskyAvatar";
import { BlueskyText } from "./BlueskyText";
import { BlueskyEmbed } from "./BlueskyEmbed";
import type { BlueskyProfileData } from "../hooks/useBlueskyProfile";
import type { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";
import { BlueskyPostLayout } from "./BlueskyPostLayout";

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
		hideEmbeds,
		textPrimaryColor,
		textSecondaryColor,
		fontWeight,
		titleFontWeight,
		formatShortDate,
		formatLongDate,
	} = useBlueskyConfig();

	// TODO: Fix janky types
	const post = post_.record as AppBskyFeedPost.Record;
	const embed = post_.embed;

	const onMouseOverTitle = useCallback((ev: MouseEvent<HTMLAnchorElement>) => {
		decorationHandler("underline", ev);
	}, []);
	const onMouseOutTitle = useCallback((ev: MouseEvent<HTMLAnchorElement>) => {
		decorationHandler("none", ev);
	}, []);

	return (
		<BlueskyPostLayout
			avatar={<BlueskyAvatar profile={profile} />}
			header={
				<>
					<a
						href={getBlueskyProfileUrl(app, profile.handle)}
						onMouseOver={onMouseOverTitle}
						onMouseOut={onMouseOutTitle}
						style={{
							textDecoration: "none",
							color: textPrimaryColor,
							fontWeight: titleFontWeight,
						}}
						{...getBlueskyLinkProps(openLinksInNewTab)}
					>
						{profile.displayName}
					</a>
					<span style={{color: textSecondaryColor, fontWeight}}>
						@{profile.handle} ·{" "}
						<abbr
							title={formatLongDate(post.createdAt)}
							style={{textDecoration: "none"}}
						>
							{formatShortDate(post.createdAt)}
						</abbr>
					</span>
				</>
			}
			content={
				<>
					<BlueskyText text={post.text} />
					{embed && !hideEmbeds && <BlueskyEmbed embed={embed} />}
				</>
			}
			listPosition={listPosition}
		/>
	);
}
