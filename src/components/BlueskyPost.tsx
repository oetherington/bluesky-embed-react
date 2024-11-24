import React, { FC } from "react";
import { useBlueskyThread } from "../hooks/useBlueskyThread";
import { useBlueskyProfile } from "../hooks/useBlueskyProfile";
import { BlueskyPostLoading } from "./BlueskyPostLoading";
import { BlueskyPostDisplay } from "./BlueskyPostDisplay";
import type { AppBskyFeedDefs } from "@atproto/api";

export type BlueskyPostProps = {
	userHandle: string,
	postId: string,
}

export const BlueskyPost: FC<BlueskyPostProps> = ({userHandle, postId}) => {
	const {
		value: thread,
		loading: threadLoading,
		error: threadError,
	} = useBlueskyThread(userHandle, postId);
	const {value: profile} = useBlueskyProfile(userHandle);

	if (threadError) {
		return null;
	}

	if (threadLoading || !thread?.post || !profile) {
		return (
			<BlueskyPostLoading />
		);
	}

	return (
		<BlueskyPostDisplay
			profile={profile}
			post={thread.post as AppBskyFeedDefs.PostView}
		/>
	);
}
