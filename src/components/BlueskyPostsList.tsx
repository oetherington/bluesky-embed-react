import React, { FC, ReactNode } from "react";
import type { AppBskyFeedDefs } from "@atproto/api";
import type { BlueskyProfileData } from "../hooks/useBlueskyProfile";
import { BlueskyPostDisplay } from "./BlueskyPostDisplay";
import { BlueskyPostLoading } from "./BlueskyPostLoading";

export type BlueskyPostsListProps = {
	profile: BlueskyProfileData | null;
	posts: AppBskyFeedDefs.FeedViewPost[] | null;
	showLoadingMore?: boolean;
	children?: ReactNode;
};

export const BlueskyPostsList: FC<BlueskyPostsListProps> = ({
	profile,
	posts,
	showLoadingMore,
	children,
}) => {
	if (!profile || !posts) {
		return <BlueskyPostLoading />;
	}
	return (
		<div>
			{posts.map(({ post }, index) => (
				<BlueskyPostDisplay
					key={post.cid}
					profile={profile}
					post={post}
					listPosition={{
						index,
						total: posts.length + (showLoadingMore ? 1 : 0),
					}}
				/>
			))}
			{showLoadingMore && (
				<BlueskyPostLoading
					listPosition={{
						index: posts.length,
						total: posts.length + 1,
					}}
				/>
			)}
			{children}
		</div>
	);
};
