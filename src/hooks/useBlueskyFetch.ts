import AtpAgent from "@atproto/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useBlueskyClient } from "./useBlueskyClient";

export const useBlueskyFetch = <T>(
	callback: (client: AtpAgent) => Promise<T>,
) => {
	const client = useBlueskyClient();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [value, setValue] = useState<T | null>(null);

	const refetch = useCallback(async () => {
		setLoading(true);
		try {
			const response = await callback(client);
			setValue(response);
			setError(null);
		} catch (e) {
			setValue(null);
			setError(e);
			console.error("Bluesky fetch error:", e);
		} finally {
			setLoading(false);
		}
	}, [client, callback]);

	useEffect(() => {
		void refetch();
	}, [refetch]);

	const result = useMemo(
		() => ({value, loading, error, refetch}),
		[value, loading, error, refetch],
	);

	return result;
}
