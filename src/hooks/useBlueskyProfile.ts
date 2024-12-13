import { useCallback } from "react";
import type { AppBskyActorDefs } from "@atproto/api";
import type { BlueskyClient } from "./useBlueskyClient";
import { useBlueskyFetch } from "./useBlueskyFetch";

export type BlueskyProfileData = AppBskyActorDefs.ProfileViewDetailed;

export const getBlueskyProfile = async (
	client: BlueskyClient,
	userHandle: string,
): Promise<BlueskyProfileData> => {
	const result = await client.getProfile({
		actor: userHandle,
	});
	return result.data;
};

export const useBlueskyProfile = (userHandle: string) => {
	const callback = useCallback(
		async (client: BlueskyClient) => {
			return getBlueskyProfile(client, userHandle);
		},
		[userHandle],
	);
	return useBlueskyFetch<BlueskyProfileData>(callback);
};
