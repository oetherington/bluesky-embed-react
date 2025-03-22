import React, { FC } from "react";
import { isThreadViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useBlueskyThread } from "../hooks/useBlueskyThread";
import { useBlueskyProfile } from "../hooks/useBlueskyProfile";
import { BlueskyPostLoading } from "./BlueskyPostLoading";
import { BlueskyPostDisplay } from "./BlueskyPostDisplay";

export type BlueskyPostProps = {
	userHandle: string;
	postId: string;
};

export const BlueskyPost: FC<BlueskyPostProps> = ({ userHandle, postId }) => {
	const {
		value: thread,
		loading: threadLoading,
		error: threadError,
	} = useBlueskyThread(userHandle, postId);
	const { value: profile } = useBlueskyProfile(userHandle);

	if (threadError) {
		return null;
	}

	if (threadLoading || !profile || !thread) {
		return <BlueskyPostLoading />;
	}

	if (!isThreadViewPost(thread)) {
		return null;
	}

	return <BlueskyPostDisplay profile={profile} post={thread.post} />;
};
