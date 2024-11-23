import { useCallback } from "react";
import type { AppBskyFeedPost } from "@atproto/api";
import type { BlueskyClient } from "./useBlueskyClient";
import { useBlueskyFetch } from "./useBlueskyFetch";

type BlueskyPostData = AppBskyFeedPost.Record;

export const useBlueskyPost = (userHandle: string, postId: string) => {
	const callback = useCallback(async (client: BlueskyClient) => {
		const result = await client.getPost({
			repo: userHandle,
			rkey: postId,
		});
		return result.value;
	}, [userHandle, postId]);
	return useBlueskyFetch<BlueskyPostData>(callback);
}
