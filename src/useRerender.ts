import { useCallback, useState } from 'react';

/**
 * Returns a function that, when called, forces the component to rerender.
 * This should only be used in exceptionally rare circumstances, and often indicates the presence of a larger issue.
 *
 * @returns a function that can be called to rerender the component.
 */

export default function useRerender(): () => void {
	const [ , setValue ] = useState<number>(0);
	return useCallback(() => setValue(value => (value + 1) % 999331), []);
};
