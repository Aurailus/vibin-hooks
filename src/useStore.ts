import { useCallback, useRef, useState } from 'react';

type StoreReturnValue<T> = T extends Record<any, any> ? Readonly<T> : T extends Array<any> ? Readonly<T> : T;

function StoreAccessor<T>(): StoreReturnValue<T>;
function StoreAccessor<T>(v: T | ((value: T) => T)): StoreReturnValue<T>;
function StoreAccessor<T>(_v?: T | ((value: T) => T)): StoreReturnValue<T> {
	throw new Error('This function is only for typing purposes.');
};

/**
 * `useStore` is an alternative to `useState` which might expose a more desireable syntax.
 * It returns a single value, a function which can be used as a getter and a setter of the currently stored value.
 * If no argument is passed, it acts as a getter. If an argument is passed, it acts as a setter.
 * This does properly work with `undefined`, passing no arguments acts as a getter, and passing `undefined` acts
 * as a setter, setting the value to `undefined`. The function being used as a setter will also return the new value.
 * The returned function is never invalidated, so it can be passed to other hooks without being a dependent.
 * The value returned from calling the function will always be the most current value stored, so if an old version
 * is needed, it should be copied beforehand. This hook does not allow mutating the stored value.
 * This hook will cause the component to rerender if the value changes, just like regular `useState`.
 *
 * @param initial - The initial value to store, or a function to generate it.
 * @returns a getter/setter function for retrieving and mutating the stored value.
 */

export default function useStore<T>(initial: T | (() => T)): typeof StoreAccessor<T> {
	const value = useRef(initial instanceof Function ? initial() : initial);
	const [ , setId ] = useState(0);

	const fn = useCallback(function (newValue?: T | ((value: T) => T)) {
		if (arguments.length === 0) return value.current;

		const oldValue = value.current;
		value.current = (newValue instanceof Function) ? (value as any)(value.current) : newValue!;
		if (value.current !== oldValue) setId(id => (id + 1) % Number.MAX_SAFE_INTEGER);

		return value.current;
	}, []);

	return fn as typeof StoreAccessor<T>;
}
