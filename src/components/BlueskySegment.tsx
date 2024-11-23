import React, { FC } from "react";
import type { RichTextSegment } from "@atproto/api";
import {
	getBlueskyLinkProps,
	getBlueskyProfileUrl,
	getBlueskyTagUrl,
} from "../helpers";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";

export type BlueskySegmentProps = {
	segment: RichTextSegment,
}

export const BlueskySegment: FC<BlueskySegmentProps> = ({segment}) => {
	const {app, openLinksInNewTab} = useBlueskyConfig();
	const linkProps = getBlueskyLinkProps(openLinksInNewTab);

	if (segment.isLink()) {
		return (
			<a href={segment.link?.uri} {...linkProps}>
				{segment.text}
			</a>
		);
	}

	if (segment.isMention()) {
		return (
			<a
				href={getBlueskyProfileUrl(app, segment.mention?.did ?? "")}
				{...linkProps}
			>
				{segment.text}
			</a>
		);
	}

	if (segment.isTag()) {
		return (
			<a href={getBlueskyTagUrl(app, segment.tag?.tag ?? "")} {...linkProps}>
				{segment.text}
			</a>
		);
	}

	return (
		<span>
			{segment.text}
		</span>
	);
}
