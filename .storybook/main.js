/** @type { import("@storybook/react-vite").StorybookConfig } */
const config = {
	stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-coverage",
		"@storybook/addon-essentials",
		"storybook-dark-mode",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	core: {
		disableTelemetry: true,
	},
};

export default config;
