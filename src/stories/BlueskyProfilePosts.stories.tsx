import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import {
	BlueskyProfilePosts as BlueskyProfilePostsComponent,
	BlueskyProfilePostsProps,
} from "../components/BlueskyProfilePosts";
import {
	BlueskyConfig,
	BlueskyConfigProvider,
	defaultBlueskyConfig,
} from "../hooks/useBlueskyConfig";
import "./story.css";

const meta: Meta = {
	title: "Bluesky Profile Post",
	component: BlueskyProfilePostsComponent,
	argTypes: {
		formatShortDate: {table: {disable: true}},
		formatLongDate: {table: {disable: true}},
	},
};

export default meta;

const createProfilePostsStory = (userHandle: string) => {
	const story: StoryFn<BlueskyProfilePostsProps & BlueskyConfig> = ({
		userHandle,
		...config
	}) => (
		<BlueskyConfigProvider {...config}>
			<BlueskyProfilePostsComponent userHandle={userHandle} />
		</BlueskyConfigProvider>
	);
	story.args = {
		userHandle,
		...defaultBlueskyConfig,
		openLinksInNewTab: true,
	};
	return story;
}

export const BlueskyProfilePosts = createProfilePostsStory("bsky.app");
