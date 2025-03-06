'use client';

import { useState, useEffect } from 'react';

export function useFetch<T>(fetchFn: () => Promise<T>) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchFn();
				setData(result);
			} catch (e) {
				setError(e as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [fetchFn]);

	return { data, loading, error };
}
