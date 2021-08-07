import { createElement } from 'react';

import { useRerender } from '../Main';

export default function UseRerender() {
	const rerender = useRerender();

	return (
		<div>
			<p>{Math.random()}</p>
			<button onClick={rerender}>Rerender</button>
		</div>
	);
}
