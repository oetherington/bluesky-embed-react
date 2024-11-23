import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import {
	BlueskyPost as BlueskyPostComponent,
	BlueskyPostProps,
} from "../components/BlueskyPost";

const meta: Meta = {
	title: "Bluesky Post",
	component: BlueskyPostComponent,
	argTypes: {},
};

export default meta;

export const BlueskyPost: StoryFn<BlueskyPostProps> = (args) => (
	<BlueskyPostComponent {...args} />
);
BlueskyPost.args = {
	username: "bsky.app",
	postId: "3l6oveex3ii2l",
};
