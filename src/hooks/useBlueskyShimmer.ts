import { CSSProperties, useEffect } from "react";
import { useBlueskyConfig } from "./useBlueskyConfig";

const name = "bluesky-embed-react-shimmer";

export const useBlueskyShimmer = () => {
	useEffect(() => {
		const keyframes = document.getElementById(name);
		if (!keyframes) {
			const style = document.createElement("style");
			style.id = name;
			style.innerHTML = `@keyframes ${name}{to{background-position-x: 0%}}`;
			document.head.appendChild(style);
		}
	}, []);
	const {loadingShimmer} = useBlueskyConfig();
	const shimmerStyles: CSSProperties = {
		background: loadingShimmer,
		backgroundSize: "300%",
		backgroundPositionX: "100%",
		animation: `${name} 1.5s infinite linear`,
	};
	return {shimmerStyles};
}
