import React, { FC } from "react";
import type { RichTextSegment } from "@atproto/api";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";

export type BlueskySegmentProps = {
	segment: RichTextSegment,
}

export const BlueskySegment: FC<BlueskySegmentProps> = ({segment}) => {
	const {app, openLinksInNewTab} = useBlueskyConfig();
	const linkProps = openLinksInNewTab
		? {target: "_blank", rel: "noopener noreferrer"}
		: {};

	if (segment.isLink()) {
		return (
			<a href={segment.link?.uri} {...linkProps}>
				{segment.text}
			</a>
		);
	}

	if (segment.isMention()) {
		return (
			<a href={`${app}/profile/${segment.mention?.did}`} {...linkProps}>
				{segment.text}
			</a>
		);
	}

	if (segment.isTag()) {
		return (
			<a href={`${app}/hashtag/${segment.tag?.tag}`} {...linkProps}>
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
