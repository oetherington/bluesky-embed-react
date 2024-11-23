import React, { FC } from "react";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import type { BlueskyProfileData } from "../hooks/useBlueskyProfile";

export type BlueskyAvatarProps = {
	profile: BlueskyProfileData | null,
}

export const BlueskyAvatar: FC<BlueskyAvatarProps> = ({profile}) => {
	const {app, openLinksInNewTab, avatarSize, borderColor} = useBlueskyConfig();
	const linkProps = openLinksInNewTab
		? {target: "_blank", rel: "noopener noreferrer"}
		: {};

	if (!profile) {
		return (
			<div>
				TODO PLACEHOLDER
			</div>
		);
	}

	if (!profile.avatar) {
		return (
			<div>
				TODO NO AVATAR
			</div>
		);
	}

	return (
		<div>
			<a href={`${app}/profile/${profile.handle}`} {...linkProps}>
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
}
