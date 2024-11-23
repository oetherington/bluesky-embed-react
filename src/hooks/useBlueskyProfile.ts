import { useCallback } from "react";
import type { AppBskyActorDefs } from "@atproto/api";
import type { BlueskyClient } from "./useBlueskyClient";
import { useBlueskyFetch } from "./useBlueskyFetch";

export type BlueskyProfileData = AppBskyActorDefs.ProfileViewDetailed;

export const useBlueskyProfile = (userHandle: string) => {
	const callback = useCallback(async (client: BlueskyClient) => {
		const result = await client.getProfile({
			actor: userHandle,
		});
		return result.data;
	}, [userHandle]);
	return useBlueskyFetch<BlueskyProfileData>(callback);
}
