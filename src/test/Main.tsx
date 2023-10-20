import { render } from 'react-dom';
import { createElement } from 'react';

import UseRerender from './UseRerender';
import UseAsyncMemo from './UseAsyncMemo';
import UseAsyncEffect from './UseAsyncEffect';
import UseStoredState from './UseStoredState';
import UseMediaMatches from './UseMediaMatches';

export default function Test() {
	return (
		<div>
			<UseRerender/>
			<UseAsyncMemo/>
			<UseAsyncEffect/>
			<UseStoredState/>
			<UseMediaMatches/>
		</div>
	);
}

render(<Test/>, document.getElementById('root')!);
