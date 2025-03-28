import React, { createContext, FC, ReactNode, useContext } from "react";
import { formatBlueskyLongDate, formatBlueskyShortDate } from "../helpers";

// When updating this type or the defaults below be sure to also update the README
export type BlueskyConfig = {
	app: string;
	service: string;
	openLinksInNewTab: boolean;
	avatarSize: number;
	hideAvatars: boolean;
	hideEmbeds: boolean;
	textPrimaryColor: string;
	textSecondaryColor: string;
	anchorColor: string;
	backgroundColor: string;
	borderColor: string;
	loadingShimmer: string;
	fontFamily: string;
	fontSize: string | number;
	embedFontSize: string | number;
	fontWeight: string | number;
	titleFontWeight: string | number;
	lineHeight: string | number;
	grid: number;
	borderRadius: number | string;
	width: number | string;
	formatShortDate: (dateString: string) => string;
	formatLongDate: (dateString: string) => string;
};

export const defaultBlueskyConfig: BlueskyConfig = {
	app: "https://bsky.app",
	service: "https://public.api.bsky.app",
	openLinksInNewTab: false,
	avatarSize: 42,
	hideAvatars: false,
	hideEmbeds: false,
	textPrimaryColor: "light-dark(#0b0f14, #f1f3f5)",
	textSecondaryColor: "light-dark(#42576c, #aebbc9)",
	anchorColor: "light-dark(#1083fe, #208bfe)",
	backgroundColor: "light-dark(#fff, #161e27)",
	borderColor: "light-dark(#d4dbe2, #2e4052)",
	loadingShimmer:
		"linear-gradient(100deg, light-dark(#d5d5d5, #aaa) 40%, light-dark(#dbdbdb, #bdbdbd) 50%, light-dark(#d5d5d5, #aaa) 60%)",
	fontFamily: `InterVariable, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
	fontSize: 15,
	embedFontSize: 14,
	fontWeight: 400,
	titleFontWeight: 600,
	lineHeight: "140%",
	grid: 8,
	borderRadius: 6,
	width: 600,
	formatShortDate: formatBlueskyShortDate,
	formatLongDate: formatBlueskyLongDate,
};

const blueskyConfigContext = createContext<BlueskyConfig>(defaultBlueskyConfig);

export type BlueskyConfigProviderProps = Partial<BlueskyConfig> & {
	children: ReactNode;
};

export const BlueskyConfigProvider: FC<BlueskyConfigProviderProps> = ({
	children,
	...config
}) => {
	return (
		<blueskyConfigContext.Provider
			value={{ ...defaultBlueskyConfig, ...config }}
		>
			{children}
		</blueskyConfigContext.Provider>
	);
};

export const useBlueskyConfig = () => useContext(blueskyConfigContext);
