import { useEffect } from 'react';

/** A hook's dependants, either an array of unknown values or undefined. */
export type Dependants = any[];

/** A function supplied to `useAsyncEffect`. Provides an abort signal indicating if the effect has been cleaned up. */
export type AsyncEffectFunction = (abort: AbortSignal) => void;

/**
 * Executes an asychronous function as an effect, with an abort signal as an argument. If the effect is rerun,
 * the abort signal will be set. The function can check this signal to see if it is current.
 * Do not destructure the abort signal in the function signature, as that will prevent it from updating.
 * Dependents can be supplied to prevent the effect from re-executing, same as with `useEffect`.
 *
 * @param fn - The function to call, an abort signal is supplied to it.
 * @param dep - An optional array of dependants, following the functionality of `useEffect`.
 */

export default function useAsyncEffect(fn: AsyncEffectFunction, dep?: Dependants) {
	useEffect(() => {
		const controller = new AbortController();
		fn(controller.signal);
		return () => controller.abort();
	}, dep);
}
