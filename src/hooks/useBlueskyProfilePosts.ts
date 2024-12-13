import { useCallback } from "react";
import type { AppBskyFeedGetAuthorFeed } from "@atproto/api";
import type { BlueskyClient } from "./useBlueskyClient";
import { useBlueskyFetch } from "./useBlueskyFetch";

type BlueskyProfilePostsData = AppBskyFeedGetAuthorFeed.OutputSchema;

export const getBlueskyProfilePosts = async (
	client: BlueskyClient,
	userHandle: string,
	limit: number = 10,
	cursor?: string,
): Promise<BlueskyProfilePostsData> => {
	const result = await client.getAuthorFeed({
		actor: userHandle,
		limit,
		cursor,
	});
	return result.data;
};

export const useBlueskyProfilePosts = (
	userHandle: string,
	limit: number = 10,
	cursor?: string,
) => {
	const callback = useCallback(
		async (client: BlueskyClient) => {
			return getBlueskyProfilePosts(client, userHandle, limit, cursor);
		},
		[userHandle, limit, cursor],
	);
	return useBlueskyFetch<BlueskyProfilePostsData>(callback);
};
