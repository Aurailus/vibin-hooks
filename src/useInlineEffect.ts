import { useRef } from 'react';

/** A hook's dependants, either an array of unknown values or undefined. */
export type Dependants = unknown[];

/** A function supplied to `useInlineEffect`. */
export type InlineEffectFunction = () => void;

/**
 * Executes an effect function *immediately*, without waiting for the Component render to end.
 * Dependents can be supplied to prevent the effect from re-executing, same as with `useEffect`.
 *
 * @param fn - The function to call.
 * @param dep - An optional array of dependants, following the functionality of `useEffect`.
 */

export default function useInlineEffect(fn: InlineEffectFunction, dep?: Dependants) {
	const previous = useRef<undefined | unknown[]>(undefined);

	let isDirty = !previous.current || !dep || dep.length !== previous.current.length;
	if (!isDirty && dep && previous.current) {
		for (let i = 0; i < dep.length; i++) {
			if (dep[i] !== previous.current[i]) {
				isDirty = true;
				break;
			}
		}
	}

	if (isDirty) fn();
}
