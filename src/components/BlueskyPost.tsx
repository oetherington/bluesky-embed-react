import React, { FC } from "react";
import { useBlueskyPost } from "../hooks/useBlueskyPost";
import { BlueskyText } from "./BlueskyText";

export type BlueskyPostProps = {
	username: string,
	postId: string,
}

export const BlueskyPost: FC<BlueskyPostProps> = ({username, postId}) => {
	const {value: post, loading, error} = useBlueskyPost(username, postId);

	if (loading || error || !post) {
		// TODO
		return null;
	}

	console.log("post", post.value);

	return (
		<div>
			<BlueskyText text={post.value.text} />
		</div>
	);
}
