import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import {
	BlueskyPost as BlueskyPostComponent,
	BlueskyPostProps,
} from "../components/BlueskyPost";

const meta: Meta = {
	title: "Bluesky Post",
	component: BlueskyPostComponent,
};

export default meta;

export const BlueskyPost: StoryFn<BlueskyPostProps> = (args) => (
	<BlueskyPostComponent {...args} />
);
BlueskyPost.args = {
	userHandle: "bsky.app",
	postId: "3l6oveex3ii2l",
};
