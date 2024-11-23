import React, { FC } from "react";
import { useBlueskyPost } from "../hooks/useBlueskyPost";

export type BlueskyPostProps = {
	username: string,
	postId: string,
}

export const BlueskyPost: FC<BlueskyPostProps> = ({username, postId}) => {
	const {value: post, loading, error} = useBlueskyPost(username, postId);
	console.log("POST", post, loading, error);
	return (
		<div>
			Post {post?.value?.createdAt}
		</div>
	);
}
