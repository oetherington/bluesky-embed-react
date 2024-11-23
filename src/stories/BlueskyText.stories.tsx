import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import {
	BlueskyText as BlueskyTextComponent,
	BlueskyTextProps,
} from "../components/BlueskyText";

const meta: Meta = {
	title: "Bluesky Text",
	component: BlueskyTextComponent,
};

export default meta;

export const BlueskyText: StoryFn<BlueskyTextProps> = (args) => (
	<BlueskyTextComponent {...args} />
);
BlueskyText.args = {
	text: "Some sample text #bluesky @bsky.app https://bsky.app",
};
