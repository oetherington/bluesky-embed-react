import React, { FC } from "react";
import {
	BlueskyListPosition,
	blueskyUriToPostId,
	getBlueskyLinkProps,
	getBlueskyPostUrl,
	getBlueskyProfileUrl,
} from "../helpers";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import { BlueskyAvatar } from "./BlueskyAvatar";
import { BlueskyText } from "./BlueskyText";
import { BlueskyEmbed } from "./BlueskyEmbed";
import { BlueskyPostLayout } from "./BlueskyPostLayout";
import { useBlueskyHoverDecoration } from "../hooks/useBlueskyHoverDecoration";
import type { BlueskyProfileData } from "../hooks/useBlueskyProfile";
import type { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

export type BlueskyPostDisplayProps = {
	profile: BlueskyProfileData;
	post: AppBskyFeedDefs.PostView;
	listPosition?: BlueskyListPosition;
};

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

	const hoverEventHandlers = useBlueskyHoverDecoration();

	// TODO: Fix janky types
	const post = post_.record as AppBskyFeedPost.Record;
	const embed = post_.embed;

	const linkProps = getBlueskyLinkProps(openLinksInNewTab);
	const postId = blueskyUriToPostId(post_.uri);
	const postUrl = getBlueskyPostUrl(app, profile.handle, postId);
	const profileUrl = getBlueskyProfileUrl(app, profile.handle);

	return (
		<BlueskyPostLayout
			avatar={<BlueskyAvatar profile={profile} />}
			header={
				<>
					<a
						href={profileUrl}
						style={{
							textDecoration: "none",
							color: textPrimaryColor,
							fontWeight: titleFontWeight,
						}}
						{...hoverEventHandlers}
						{...linkProps}
					>
						{profile.displayName}
					</a>
					<span style={{ color: textSecondaryColor, fontWeight }}>
						@{profile.handle} ·{" "}
						<a
							href={postUrl}
							style={{
								color: textSecondaryColor,
								textDecoration: "none",
							}}
							{...hoverEventHandlers}
							{...linkProps}
						>
							<abbr
								title={formatLongDate(post.createdAt)}
								style={{ textDecoration: "none" }}
							>
								{formatShortDate(post.createdAt)}
							</abbr>
						</a>
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
};
