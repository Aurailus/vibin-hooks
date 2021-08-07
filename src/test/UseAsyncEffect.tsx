import { createElement, useState } from 'react';

import { useAsyncEffect } from '../Main';

const testAsync = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 500));

export default function UseAsyncEffect() {
	const [ data, setData ] = useState<number>(0);

	useAsyncEffect(async (signal) => {
		await testAsync();
		if (signal.aborted) return;
		setData(data + 1);
	}, [ data ]);

	return (
		<div>
			<p>Data: { data }</p>
			<button onClick={() => setData(0)}>Reset</button>
		</div>
	);
}
