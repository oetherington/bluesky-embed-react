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

const createProfilePostsStory = (userHandle: string, pageSize?: number) => {
	const story: StoryFn<BlueskyProfilePostsProps & BlueskyConfig> = ({
		userHandle,
		pageSize,
		infiniteLoad,
		...config
	}) => (
		<BlueskyConfigProvider {...config}>
			<BlueskyProfilePostsComponent
				userHandle={userHandle}
				pageSize={pageSize}
				infiniteLoad={infiniteLoad}
			/>
		</BlueskyConfigProvider>
	);
	story.args = {
		userHandle,
		pageSize,
		infiniteLoad: false,
		...defaultBlueskyConfig,
		openLinksInNewTab: true,
	};
	return story;
}

export const BlueskyProfilePosts = createProfilePostsStory("bsky.app");
