import { useEffect, useState } from "react";

const pageSizeToLimit = (pageSize?: number) => Math.max(pageSize ?? 10, 1);

export const useBlueskyInfiniteLoad = (pageSize: number = 10) => {
	const [limit, setLimit] = useState<number>(pageSizeToLimit.bind(null, pageSize));
	const [ref, setRef] = useState<HTMLDivElement | null>(null);

	useEffect(() => {
		setLimit(pageSizeToLimit(pageSize));
	}, [pageSize]);

	useEffect(() => {
		if (!ref) {
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) {
				setLimit((limit) => limit + pageSize);
			}
		}, {threshold: 1.0});
		observer.observe(ref);
		return () => observer.disconnect();
	}, [ref, pageSize]);

	return {limit, setRef};
}
