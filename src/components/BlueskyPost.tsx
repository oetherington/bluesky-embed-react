import React, { FC } from "react";
import { useBlueskyPost } from "../hooks/useBlueskyPost";
import { useBlueskyProfile } from "../hooks/useBlueskyProfile";
import { BlueskyText } from "./BlueskyText";
import { BlueskyAvatar } from "./BlueskyAvatar";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";

export type BlueskyPostProps = {
	userHandle: string,
	postId: string,
}

export const BlueskyPost: FC<BlueskyPostProps> = ({userHandle, postId}) => {
	const {
		hideAvatars,
		backgroundColor,
		borderColor,
		fontFamily,
	} = useBlueskyConfig();
	const {
		value: post,
		loading: postLoading,
		error: postError,
	} = useBlueskyPost(userHandle, postId);
	const {value: profile} = useBlueskyProfile(userHandle);

	if (postLoading || postError || !post) {
		// TODO
		return null;
	}

	return (
		<div style={{
			display: "flex",
			gap: 16,
			backgroundColor,
			padding: 16,
			border: `1px solid ${borderColor}`,
			fontFamily,
		}}>
			{!hideAvatars && <BlueskyAvatar profile={profile} />}
			<div>
				<BlueskyText text={post.text} />
			</div>
		</div>
	);
}
