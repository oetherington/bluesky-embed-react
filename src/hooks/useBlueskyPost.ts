import AtpAgent from "@atproto/api";
import { useCallback } from "react";
import { useBlueskyFetch } from "./useBlueskyFetch";

export const useBlueskyPost = (username: string, postId: string) => {
	const callback = useCallback((client: AtpAgent) => {
		return client.getPost({
			repo: username,
			rkey: postId,
		});
	}, [username, postId]);
	return useBlueskyFetch(callback);
}
