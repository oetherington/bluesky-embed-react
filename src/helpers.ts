import type { CSSProperties } from "react";

export type BlueskyListPosition = {
	index: number;
	total: number;
};

export const getBlueskyListStyles = (
	listPosition: BlueskyListPosition | undefined,
	borderRadius: string | number,
): CSSProperties => {
	const listStyles: CSSProperties = {};
	if (listPosition) {
		const { index, total } = listPosition;
		if (index === 0) {
			listStyles.borderTopLeftRadius = borderRadius;
			listStyles.borderTopRightRadius = borderRadius;
		}
		if (index === total - 1) {
			listStyles.borderBottomLeftRadius = borderRadius;
			listStyles.borderBottomRightRadius = borderRadius;
		}
		if (index > 0) {
			listStyles.borderTopWidth = 0;
		}
	} else {
		listStyles.borderRadius = borderRadius;
	}
	return listStyles;
};

export const getBlueskyProfileUrl = (app: string, userHandleOrDid: string) =>
	`${app}/profile/${userHandleOrDid}`;

export const getBlueskyTagUrl = (app: string, tagName: string) =>
	`${app}/hashtag/${tagName}`;

export const getBlueskyPostUrl = (
	app: string,
	userHandleOrDid: string,
	postId: string,
) => `${getBlueskyProfileUrl(app, userHandleOrDid)}/post/${postId}`;

export const blueskyUriToPostId = (uri: string) => {
	const parts = uri.split("/");
	return parts[parts.length - 1] ?? "";
};

export const getBlueskyLinkProps = (openLinksInNewTab: boolean) =>
	openLinksInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {};

export const formatBlueskyShortDate = (dateString: string) => {
	const now = new Date().getTime();
	const then = new Date(dateString).getTime();
	const seconds = Math.floor((now - then) / 1000);
	let interval = seconds / 31536000;
	if (interval > 1) {
		return `${Math.floor(interval)}yr`;
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return `${Math.floor(interval)}mo`;
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return `${Math.floor(interval)}d`;
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return `${Math.floor(interval)}h`;
	}
	interval = seconds / 60;
	if (interval > 1) {
		return `${Math.floor(interval)}m`;
	}
	return `${Math.floor(seconds)}s`;
};

export const formatBlueskyLongDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = date.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const time = date.toLocaleTimeString(undefined, {
		hour: "numeric",
		minute: "numeric",
	});
	return `${day} at ${time}`;
};

export class BlueskyError extends Error {}
