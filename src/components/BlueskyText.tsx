import React, { FC, useEffect, useState } from "react";
import { RichText, RichTextSegment } from "@atproto/api";
import { useBlueskyClient } from "../hooks/useBlueskyClient";
import { useBlueskyConfig } from "../hooks/useBlueskyConfig";
import { BlueskySegment } from "./BlueskySegment";

export type BlueskyTextProps = {
	text: string,
}

export const BlueskyText: FC<BlueskyTextProps> = ({text}) => {
	const client = useBlueskyClient();
	const {textPrimaryColor, fontSize} = useBlueskyConfig();
	const [segments, setSegments] = useState<RichTextSegment[]>([]);

	useEffect(() => {
		(async () => {
			const rt = new RichText({text});
			await rt.detectFacets(client);
			setSegments(Array.from(rt.segments()));
		})();
	}, [text, client]);

	return (
		<div style={{color: textPrimaryColor, fontSize}}>
			{segments.map((segment, i) => (
				<BlueskySegment key={i} segment={segment} />
			))}
		</div>
	);
}
