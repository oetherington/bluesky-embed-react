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

const createPostStory = (userHandle: string, postId: string) => {
	const story: StoryFn<BlueskyPostProps & BlueskyConfig> = ({
		userHandle,
		postId,
		...config
	}) => (
		<BlueskyConfigProvider {...config}>
			<BlueskyPostComponent userHandle={userHandle} postId={postId} />
		</BlueskyConfigProvider>
	);
	story.args = {
		userHandle,
		postId,
		...defaultBlueskyConfig,
		openLinksInNewTab: true,
	};
	return story;
}

export const BlueskyPost = createPostStory("bsky.app", "3l6oveex3ii2l");
export const BlueskySingleImagePost = createPostStory("bsky.app", "3lb6vz4ms6c25");
export const BlueskyMultiImagePost = createPostStory("bsky.app", "3ky73uy2vad2f");
export const BlueskyVideoPost = createPostStory("bsky.app", "3lax5zxh7bc2p");
export const BlueskyExternalPost = createPostStory("bsky.app", "3ksi2kwx5xe2x");
export const BlueskyYoutubePost = createPostStory("bsky.app", "3ksmub3wvpv2p");
