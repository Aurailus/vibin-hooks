import { createElement } from 'react';

import { useStoredState } from '../Main';

export default function UseStoredState() {
	const [ value, setValue ] = useStoredState('', 'storedstatetest.value');

	return (
		<div>
			<input type='text' placeholder='Type to set stored value.'
				value={value} onInput={(e: any) => setValue(e.target.value)}/>
		</div>
	);
}
