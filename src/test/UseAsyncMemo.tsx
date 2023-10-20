import { createElement, useState } from 'react';

import { useAsyncMemo } from '../Main';

const testAsync = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 500));

export default function UseAsyncMemo() {
	const [ prompt, setPrompt ] = useState<number>(0);
	const [ def, setDef ] = useState<number>(-1);
	const [ cache, setCache ] = useState<boolean>(false);

	const res = useAsyncMemo<number>(async (signal) => {
		await testAsync();
		if (signal.aborted) return;
		return prompt + 5;
	}, { default: def, cacheOnUpdate: cache }, [ prompt ]);

	return (
		<div>
			<p>Res: { res }</p>
			<button onClick={() => setPrompt(prompt + 1)}>Increase Prompt</button>
			<button onClick={() => setDef(def - 1)}>Decrease Default</button>
			<button onClick={() => setCache(!cache)}>Toggle Cache</button>
		</div>
	);
}
