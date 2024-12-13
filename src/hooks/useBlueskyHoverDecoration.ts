import { useCallback, MouseEvent } from "react";

const decorationHandler = (
	value: "underline" | "none",
	ev: MouseEvent<HTMLAnchorElement>,
) => {
	const target = ev.target as HTMLAnchorElement;
	target.style.textDecoration = value;
};

export const useBlueskyHoverDecoration = () => {
	const onMouseOver = useCallback((ev: MouseEvent<HTMLAnchorElement>) => {
		decorationHandler("underline", ev);
	}, []);
	const onMouseOut = useCallback((ev: MouseEvent<HTMLAnchorElement>) => {
		decorationHandler("none", ev);
	}, []);
	return { onMouseOver, onMouseOut };
};
