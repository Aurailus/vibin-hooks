import { createElement } from 'react';

import { useMediaMatches } from '../Main';

export default function UseMediaMatches() {
	const matches = useMediaMatches('(min-width: 900px)');

	return (
		<div>
			<p>{matches ? 'ABOVE 900 PX' : '(below 900 px)'}</p>
		</div>
	);
}
