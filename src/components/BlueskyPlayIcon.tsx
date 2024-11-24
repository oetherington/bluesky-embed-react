import React, { FC } from "react";

export const BlueskyPlayIcon: FC = () => {
	return (
		<div style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background: `rgba(242, 244, 246, 0.7)`,
			padding: 12,
			borderRadius: "50%",
			boxShadow: "rgba(11, 15, 20, 0.7) 0px 0px 32px",
		}}>
			<svg
				width="32"
				height="32"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					fill="hsl(211, 28%, 16.4%)"
					fillRule="evenodd"
					clipRule="evenodd"
					d="M6.514 2.143A1 1 0 0 0 5 3v18a1 1 0 0 0 1.514.858l15-9a1 1 0 0 0 0-1.716l-15-9Z"
				/>
			</svg>
		</div>
	);
}
