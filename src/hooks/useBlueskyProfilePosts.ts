import { useCallback } from "react";
import type { AppBskyFeedGetAuthorFeed } from "@atproto/api";
import type { BlueskyClient } from "./useBlueskyClient";
import { useBlueskyFetch } from "./useBlueskyFetch";

type BlueskyProfilePostsData = AppBskyFeedGetAuthorFeed.OutputSchema;

export const useBlueskyProfilePosts = (
	userHandle: string,
	limit: number = 10,
	cursor?: string,
) => {
	const callback = useCallback(
		async (client: BlueskyClient) => {
			const result = await client.getAuthorFeed({
				actor: userHandle,
				limit,
				cursor,
			});
			return result.data;
		},
		[userHandle, limit, cursor],
	);
	return useBlueskyFetch<BlueskyProfilePostsData>(callback);
};
