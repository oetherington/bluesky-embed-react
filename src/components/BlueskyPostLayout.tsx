import React, { FC, ReactNode } from "react";
import { BlueskyListPosition, getBlueskyListStyles } from "../helpers";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";

export type BlueskyPostLayoutProps = {
	avatar: ReactNode,
	header: ReactNode,
	content: ReactNode,
	listPosition?: BlueskyListPosition,
}

export const BlueskyPostLayout: FC<BlueskyPostLayoutProps> = ({
	avatar,
	header,
	content,
	listPosition,
}) => {
	const {
		hideAvatars,
		fontFamily,
		backgroundColor,
		borderColor,
		grid,
		borderRadius,
		width,
	} = useBlueskyConfig();

	return (
		<div style={{
			display: "flex",
			gap: grid * 1.5,
			padding: grid * 2,
			backgroundColor,
			border: `1px solid ${borderColor}`,
			fontFamily,
			minWidth: 0,
			maxWidth: "100%",
			width,
			...getBlueskyListStyles(listPosition, borderRadius),
		}}>
			{!hideAvatars && avatar}
			<div style={{minWidth: 0, width: "100%",}}>
				<div style={{
					display: "flex",
					gap: grid,
					marginBottom: grid,
				}}>
					{header}
				</div>
				{content}
			</div>
		</div>
	);
}
