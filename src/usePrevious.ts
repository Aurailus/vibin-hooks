import { useEffect, useRef } from 'react';

/**
 * Accepts a value, stores it, and then returns it on the next render.
 *
 * @param value - The current value.
 * @returns the previous value, or undefined if this is the first render.
 */

export default function usePrevious<T = any>(value: T): T | undefined {
	const ref = useRef<T | undefined>(undefined);
	useEffect(() => { ref.current = value; }, [ value ]);
	return ref.current;
};
