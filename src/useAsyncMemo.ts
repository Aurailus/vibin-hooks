import { useState, useEffect } from 'react';

import useAsyncEffect, { Dependants } from './useAsyncEffect';

/** Options for `useAsyncMemo`. */
export interface AsyncMemoOptions<T> {
	/** The default value to return until `fn` is finished executing. Defaults to `undefined`. */
	default?: T;

	/**
	 * Set this to true if, when the dependants change, the previously memoized value should be kept until `fn`
	 * is finished executing. Otherwise, the currently memoized value will be replaced by `default` during execution.
	 */

	cacheOnUpdate?: boolean;
}

/** A function supplied to `useAsyncMemo`. Provides an abort signal if the memo is being re-executed. */
export type AsyncMemoFunction<T> = (abort: AbortSignal) => Promise<T | undefined>;

/**
 * Executes an asynchronous function to get a memoized value. This value is then returned every render unless
 * the dependants array changes, in which case the value will be recomputed. While the value is being computed,
 * this function will return the default value or undefined. If no dependants array is supplied, the value
 * will never be recomputed due to technical limitations.
 *
 * This overload asserts that `options.default` is of type `T`, and therefore always returns a type `T`.
 *
 * @param fn - The function to call to get the memoized value.
 * @param options - An options object.
 * @param dep - An optional dependants array.
 * @returns the memoized value once it is computed, or the default value from the options array.
 */

export default function useAsyncMemo<T>(fn: AsyncMemoFunction<T>, options: AsyncMemoOptions<T> & { default: T }, dep?: Dependants): T;

/**
 * Executes an asynchronous function to get a memoized value. This value is then returned every render unless
 * the dependants array changes, in which case the value will be recomputed. While the value is being computed,
 * this function will return the default value or undefined. If no dependants array is supplied, the value
 * will never be recomputed due to technical limitations.
 *
 * May return `undefined`, because default is undefined or unspecified. If `T` should always be returned,
 * provide `options.default`.
 *
 * @param fn - The function to call to get the memoized value.
 * @param options - An options object.
 * @param dep - An optional dependants array.
 * @returns the memoized value once it is computed, or the default value from the options array.
 */

export default function useAsyncMemo<T>(fn: AsyncMemoFunction<T>, options: AsyncMemoOptions<T>, dep?: Dependants):
 	T | undefined;

/**
 * Executes an asynchronous function to get a memoized value. This value is then returned every render unless
 * the dependants array changes, in which case the value will be recomputed. While the value is being computed,
 * this function will return the default value or undefined. If no dependants array is supplied, the value
 * will never be recomputed due to technical limitations.
 *
 * Behavior can be altered by providing an AsyncMemoOptions before the dependants array.
 *
 * @param fn - The function to call to get the memoized value.
 * @param dep - An optional dependants array.
 * @returns the memoized value once it is computed, or undefined.
 */

export default function useAsyncMemo<T>(fn: AsyncMemoFunction<T>, dep?: Dependants): T | undefined;

export default function useAsyncMemo<T>(fn: AsyncMemoFunction<T>,
	optsOrDep?: AsyncMemoOptions<T> | Dependants, mDep?: Dependants): any {

	const [ opts, dep ] = optsOrDep
		? Array.isArray(optsOrDep)
			? [ undefined, optsOrDep ]
			: [ optsOrDep, mDep ]
		: [ undefined, undefined ];

	const [ memo, setMemo ] = useState<T>(opts?.default as T);

	useEffect(() => {
		if (!opts?.cacheOnUpdate) setMemo(opts?.default as T);
	}, [ opts?.default, opts?.cacheOnUpdate ]);

	useAsyncEffect(async (abort) => {
		if (!opts?.cacheOnUpdate) setMemo(opts?.default as T);
		let memo = await fn(abort);
		if (!abort.aborted) setMemo(memo as T);
	}, [ opts?.default, opts?.cacheOnUpdate, ...dep ?? [] ]);

	return memo;
}
