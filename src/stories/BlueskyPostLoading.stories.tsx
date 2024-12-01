import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import {
	BlueskyPostLoading as BlueskyPostLoadingComponent,
	BlueskyPostLoadingProps,
} from "../components/BlueskyPostLoading";
import "./story.css";

const meta: Meta = {
	title: "Bluesky Post Loading",
	component: BlueskyPostLoadingComponent,
};

export default meta;

export const BlueskyPostLoading: StoryFn<BlueskyPostLoadingProps> = (args) => (
	<BlueskyPostLoadingComponent {...args} />
);
BlueskyPostLoading.args = {};
