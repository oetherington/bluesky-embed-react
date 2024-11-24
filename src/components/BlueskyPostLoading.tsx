import React, { FC } from "react";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import { useBlueskyShimmer } from "../hooks/useBlueskyShimmer";
import { BlueskyAvatar } from "./BlueskyAvatar";
import { BlueskyPostLayout } from "./BlueskyPostLayout";
import type { BlueskyListPosition } from "../helpers";

export type BlueskyPostLoadingProps = {
	listPosition?: BlueskyListPosition;
};

export const BlueskyPostLoading: FC<BlueskyPostLoadingProps> = ({
	listPosition,
}) => {
	const { fontSize, borderRadius, grid } = useBlueskyConfig();
	const { shimmerStyles } = useBlueskyShimmer();

	return (
		<BlueskyPostLayout
			avatar={<BlueskyAvatar profile={null} />}
			header={
				<div
					style={{
						width: 250,
						maxWidth: "100%",
						height: fontSize,
						borderRadius,
						...shimmerStyles,
					}}
				/>
			}
			content={
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						gap: grid,
					}}
				>
					{[0, 0].map((_, i) => (
						<div
							key={i}
							style={{
								height: fontSize,
								borderRadius,
								...shimmerStyles,
							}}
						/>
					))}
				</div>
			}
			listPosition={listPosition}
		/>
	);
};
