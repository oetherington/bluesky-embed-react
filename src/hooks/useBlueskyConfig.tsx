import React, { createContext, FC, ReactNode, useContext } from "react"

type BlueskyConfig = {
	app: string,
	service: string,
	openLinksInNewTab: boolean,
	hideAvatars: boolean,
	avatarSize: number,
	textPrimaryColor: string,
	textSecondaryColor: string,
	backgroundColor: string,
	borderColor: string,
	fontFamily: string,
	fontSize: string | number,
	lineHeight: string | number,
}

const defaultConfig: BlueskyConfig = {
	app: "https://bsky.app",
	service: "https://public.api.bsky.app",
	openLinksInNewTab: false,
	hideAvatars: false,
	avatarSize: 42,
	textPrimaryColor: "#f1f3f5",
	textSecondaryColor: "#aebbc9",
	backgroundColor: "#161e27",
	borderColor: "#2e4052",
	fontFamily: `InterVariable, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
	fontSize: "15px",
	lineHeight: "140%",
}

const blueskyConfigContext = createContext<BlueskyConfig>(defaultConfig);

export type BlueskyConfigProviderProps = Partial<BlueskyConfig> & {
	children: ReactNode,
}

export const BlueskyConfigProvider: FC<BlueskyConfigProviderProps> = ({
	children,
	...config
}) => {
	return (
		<blueskyConfigContext.Provider value={{...defaultConfig, ...config}}>
			{children}
		</blueskyConfigContext.Provider>
	);
}

export const useBlueskyConfig = () =>  useContext(blueskyConfigContext);
