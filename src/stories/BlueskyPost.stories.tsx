import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import {
	BlueskyPost as BlueskyPostComponent,
	BlueskyPostProps,
} from "../components/BlueskyPost";
import {
	BlueskyConfig,
	BlueskyConfigProvider,
	defaultBlueskyConfig,
} from "../hooks/useBlueskyConfig";
import "./story.css";

const meta: Meta = {
	title: "Bluesky Post",
	component: BlueskyPostComponent,
	argTypes: {
		formatShortDate: {table: {disable: true}},
		formatLongDate: {table: {disable: true}},
	},
};

export default meta;

export const BlueskyPost: StoryFn<BlueskyPostProps & BlueskyConfig> = ({
	userHandle,
	postId,
	...config
}) => (
	<BlueskyConfigProvider {...config}>
		<BlueskyPostComponent userHandle={userHandle} postId={postId} />
	</BlueskyConfigProvider>
);
BlueskyPost.args = {
	userHandle: "bsky.app",
	postId: "3l6oveex3ii2l",
	...defaultBlueskyConfig,
};
