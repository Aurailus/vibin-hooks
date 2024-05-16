import { useRef } from 'react';

/** A hook's dependant, either an array of unknown values or undefined. */
export type Dependant = unknown[];

/** A function supplied to `useInlineEffect`. */
export type InlineEffectFunction = () => void;

/**
 * Executes an effect function *immediately*, without waiting for the Component render to end.
 * Dependents can be supplied to prevent the effect from re-executing, same as with `useEffect`.
 *
 * @param fn - The function to call.
 * @param dep - An optional array of dependants, following the functionality of `useEffect`.
 */

export default function useInlineEffect(fn: InlineEffectFunction, dep?: Dependant) {
	const previous = useRef<undefined | unknown[]>(undefined);

	if (!previous.current || !dep ||
		dep.length !== previous.current.length ||
		dep.some((cur, i) => cur !== previous.current![i])) {

		previous.current = dep ? [ ...dep ] : undefined;
		fn();
	}
}
