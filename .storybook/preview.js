/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		darkMode: {
			current: "light",
			classTarget: "html",
			stylePreview: true,
		},
	},
};

export default preview;
