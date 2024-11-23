import React, { FC, MouseEvent } from "react";
import { getBlueskyLinkProps, getBlueskyProfileUrl } from "../helpers";
import { useBlueskyPost } from "../hooks/useBlueskyPost";
import { useBlueskyProfile } from "../hooks/useBlueskyProfile";
import { BlueskyText } from "./BlueskyText";
import { BlueskyAvatar } from "./BlueskyAvatar";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";

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
		value: post,
		loading: postLoading,
		error: postError,
	} = useBlueskyPost(userHandle, postId);
	const {value: profile} = useBlueskyProfile(userHandle);
	console.log(post);

	if (postLoading || postError || !post) {
		// TODO
		return null;
	}

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
			<div>
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
			</div>
		</div>
	);
}
