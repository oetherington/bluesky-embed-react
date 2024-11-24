import React, { FC, MouseEvent } from "react";
import { getBlueskyLinkProps, getBlueskyProfileUrl } from "../helpers";
import { useBlueskyThread } from "../hooks/useBlueskyThread";
import { useBlueskyProfile } from "../hooks/useBlueskyProfile";
import { BlueskyText } from "./BlueskyText";
import { BlueskyAvatar } from "./BlueskyAvatar";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import { BlueskyEmbed, BlueskyEmbedData } from "./BlueskyEmbed";
import { AppBskyFeedPost } from "@atproto/api";

export type BlueskyPostProps = {
	userHandle: string,
	postId: string,
}

const decorationHandler = (
	value: "underline" | "none",
	ev: MouseEvent<HTMLAnchorElement>,
) => {
	const target = ev.target as HTMLAnchorElement;
	target.style.textDecoration = value;
}

export const BlueskyPost: FC<BlueskyPostProps> = ({userHandle, postId}) => {
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
	const {
		value: thread,
		loading: threadLoading,
		error: threadError,
	} = useBlueskyThread(userHandle, postId);
	const {value: profile} = useBlueskyProfile(userHandle);

	if (threadLoading || threadError || !thread?.post) {
		// TODO
		return null;
	}

	// TODO: Janky types
	const post: AppBskyFeedPost.Record = (thread.post as any).record;
	const embed: BlueskyEmbedData | undefined = (thread.post as any).embed;

	return (
		<div style={{
			display: "flex",
			gap: grid * 1.5,
			padding: grid * 2,
			backgroundColor,
			border: `1px solid ${borderColor}`,
			borderRadius,
			fontFamily,
			minWidth: 0,
			maxWidth: "100%",
			width,
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
