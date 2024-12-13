import { useCallback } from "react";
import type { AppBskyFeedGetPostThread } from "@atproto/api";
import type { BlueskyClient } from "./useBlueskyClient";
import { useBlueskyFetch } from "./useBlueskyFetch";

type BlueskyPostData = AppBskyFeedGetPostThread.OutputSchema["thread"];

export const getBlueskyThread = async (
	client: BlueskyClient,
	userHandle: string,
	postId: string,
	depth: number = 0,
): Promise<BlueskyPostData> => {
	const result = await client.getPostThread({
		uri: `at://${userHandle}/app.bsky.feed.post/${postId}`,
		depth,
	});
	return result.data.thread;
};

export const useBlueskyThread = (
	userHandle: string,
	postId: string,
	depth: number = 0,
) => {
	const callback = useCallback(
		async (client: BlueskyClient) => {
			return getBlueskyThread(client, userHandle, postId, depth);
		},
		[userHandle, postId, depth],
	);
	return useBlueskyFetch<BlueskyPostData>(callback);
};
