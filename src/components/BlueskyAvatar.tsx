import React, { FC } from "react";
import { getBlueskyLinkProps, getBlueskyProfileUrl } from "../helpers";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import { useBlueskyShimmer } from "../hooks/useBlueskyShimmer";
import type { BlueskyProfileData } from "../hooks/useBlueskyProfile";

export type BlueskyAvatarProps = {
	profile: BlueskyProfileData | null;
};

export const BlueskyAvatar: FC<BlueskyAvatarProps> = ({ profile }) => {
	const { app, openLinksInNewTab, avatarSize, borderColor } = useBlueskyConfig();
	const { shimmerStyles } = useBlueskyShimmer();

	if (!profile) {
		return (
			<div>
				<div
					style={{
						width: avatarSize,
						height: avatarSize,
						borderRadius: "50%",
						border: `1px solid ${borderColor}`,
						...shimmerStyles,
					}}
				/>
			</div>
		);
	}

	if (!profile.avatar) {
		return <div>TODO NO AVATAR</div>;
	}

	return (
		<div>
			<a
				href={getBlueskyProfileUrl(app, profile.handle)}
				{...getBlueskyLinkProps(openLinksInNewTab)}
			>
				<img
					src={profile.avatar}
					title={profile.displayName ?? profile.handle}
					width={avatarSize}
					height={avatarSize}
					style={{
						borderRadius: "50%",
						border: `1px solid ${borderColor}`,
					}}
				/>
			</a>
		</div>
	);
};
