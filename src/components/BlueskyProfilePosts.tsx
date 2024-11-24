import React, { FC } from "react";
import { useBlueskyProfilePosts } from "../hooks/useBlueskyProfilePosts";
import { useBlueskyProfile } from "../hooks/useBlueskyProfile";
import { BlueskyPostDisplay } from "./BlueskyPostDisplay";

export type BlueskyProfilePostsProps = {
	userHandle: string,
}

export const BlueskyProfilePosts: FC<BlueskyProfilePostsProps> = ({
	userHandle,
}) => {
	const {value: profilePosts} = useBlueskyProfilePosts(userHandle);
	const {value: profile} = useBlueskyProfile(userHandle);

	if (!profilePosts || !profile) {
		return null; // TODO
	}

	const {feed} = profilePosts;

	return (
		<div>
			{feed.map(({post}, index) => (
				<BlueskyPostDisplay
					key={post.cid}
					profile={profile}
					post={post}
					listPosition={{index, total: feed.length}}
				/>
			))}
		</div>
	);
}
