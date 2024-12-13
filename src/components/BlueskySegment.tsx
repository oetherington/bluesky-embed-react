import React, { FC } from "react";
import type { RichTextSegment } from "@atproto/api";
import {
	getBlueskyLinkProps,
	getBlueskyProfileUrl,
	getBlueskyTagUrl,
} from "../helpers";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import { useBlueskyHoverDecoration } from "../hooks/useBlueskyHoverDecoration";

export type BlueskySegmentProps = {
	segment: RichTextSegment;
};

export const BlueskySegment: FC<BlueskySegmentProps> = ({ segment }) => {
	const { app, anchorColor, openLinksInNewTab } = useBlueskyConfig();
	const eventHandlers = useBlueskyHoverDecoration();
	const anchorProps = {
		...eventHandlers,
		...getBlueskyLinkProps(openLinksInNewTab),
		style: {
			color: anchorColor,
			textDecoration: "none",
		},
	};

	if (segment.isLink()) {
		return (
			<a href={segment.link?.uri} {...anchorProps}>
				{segment.text}
			</a>
		);
	}

	if (segment.isMention()) {
		return (
			<a
				href={getBlueskyProfileUrl(app, segment.mention?.did ?? "")}
				{...anchorProps}
			>
				{segment.text}
			</a>
		);
	}

	if (segment.isTag()) {
		return (
			<a href={getBlueskyTagUrl(app, segment.tag?.tag ?? "")} {...anchorProps}>
				{segment.text}
			</a>
		);
	}

	return <span>{segment.text}</span>;
};
