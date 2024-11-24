import React, { FC } from "react";
import { useBlueskyInfiniteLoad } from "../hooks/useBlueskyInfiniteLoad";
import { useBlueskyProfilePosts } from "../hooks/useBlueskyProfilePosts";
import { useBlueskyProfile } from "../hooks/useBlueskyProfile";
import { BlueskyPostDisplay } from "./BlueskyPostDisplay";
import { BlueskyPostLoading } from "./BlueskyPostLoading";

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

	if (!profilePosts || !profile) {
		return null; // TODO
	}

	const { feed } = profilePosts;

	return (
		<div>
			{feed.map(({ post }, index) => (
				<BlueskyPostDisplay
					key={post.cid}
					profile={profile}
					post={post}
					listPosition={{
						index,
						total: feed.length + (profilePostsLoading ? 1 : 0),
					}}
				/>
			))}
			{profilePostsLoading && (
				<BlueskyPostLoading
					listPosition={{
						index: feed.length,
						total: feed.length + 1,
					}}
				/>
			)}
			{infiniteLoad && feed.length > 0 && <div ref={setRef} />}
		</div>
	);
};
