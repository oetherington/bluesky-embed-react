import React, { FC, useEffect, useState } from "react";
import { Facet, RichText, RichTextSegment } from "@atproto/api";
import { useBlueskyClient } from "../hooks/useBlueskyClient";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import { BlueskySegment } from "./BlueskySegment";

export type BlueskyTextProps = {
	text: string;
	facets?: Facet[];
};

export const BlueskyText: FC<BlueskyTextProps> = ({ text, facets }) => {
	const client = useBlueskyClient();
	const { textPrimaryColor, fontSize, fontWeight } = useBlueskyConfig();

	const [segments, setSegments] = useState<RichTextSegment[]>(() => {
		if (facets?.length) {
			const rt = new RichText({ text, facets });
			return Array.from(rt.segments());
		} else {
			return [];
		}
	});

	useEffect(() => {
		if (!facets?.length) {
			void (async () => {
				const rt = new RichText({ text, facets });
				await rt.detectFacets(client);
				setSegments(Array.from(rt.segments()));
			})();
		}
	}, [text, client]);

	return (
		<div
			style={{
				color: textPrimaryColor,
				fontSize,
				fontWeight,
				whiteSpace: "pre-line",
			}}
		>
			{segments.map((segment, i) => (
				<BlueskySegment key={i} segment={segment} />
			))}
		</div>
	);
};
