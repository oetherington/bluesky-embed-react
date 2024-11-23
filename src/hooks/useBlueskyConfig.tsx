import React, { createContext, FC, ReactNode, useContext } from "react"

type BlueskyConfig = {
	app: string,
	service: string,
	openLinksInNewTab: boolean,
}

const defaultConfig: BlueskyConfig = {
	app: "https://bsky.app",
	service: "https://bsky.social",
	openLinksInNewTab: false,
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
