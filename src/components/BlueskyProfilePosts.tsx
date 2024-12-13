import React, { FC } from "react";
import { useBlueskyInfiniteLoad } from "../hooks/useBlueskyInfiniteLoad";
import { useBlueskyProfilePosts } from "../hooks/useBlueskyProfilePosts";
import { useBlueskyProfile } from "../hooks/useBlueskyProfile";
import { BlueskyPostsList } from "./BlueskyPostsList";

export type BlueskyProfilePostsProps = {
	userHandle: string;
	pageSize?: number;
	infiniteLoad?: boolean;
};

export const BlueskyProfilePosts: FC<BlueskyProfilePostsProps> = ({
	userHandle,
	pageSize,
	infiniteLoad,
}) => {
	const { limit, setRef } = useBlueskyInfiniteLoad(pageSize);
	const { value: profile } = useBlueskyProfile(userHandle);
	const { value: profilePosts, loading: profilePostsLoading } =
		useBlueskyProfilePosts(userHandle, limit);
	const posts = profilePosts?.feed ?? [];
	return (
		<BlueskyPostsList
			profile={profile}
			posts={posts}
			showLoadingMore={profilePostsLoading}
		>
			{infiniteLoad && posts.length > 0 && <div ref={setRef} />}
		</BlueskyPostsList>
	);
};
