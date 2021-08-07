import { useState, useEffect } from 'react';

/**
 * Creates a stateful value that is stored in local storage via a unique key, providing a simple way to
 * store persistent state. State is stored using `JSON.stringify` on update, and retrieved using `JSON.parse`.
 * Based on https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/.
 *
 * @param def - The default value if no stored value exists.
 * @param key - The unique key to store the value under.
 * @returns the value and a function to update it, wrapped in an array.
 */

export default function useStoredState<T>(def: T | (() => T), key: string): [
	T, (value: T | ((currentValue: T) => T)) => void ] {

	const [ value, setValue ] = useState<T>(() => {
		const stored = window.localStorage.getItem(key);
		return stored !== null ? JSON.parse(stored) : def;
	});

	useEffect(() => window.localStorage.setItem(key, JSON.stringify(value)), [ key, value ]);

	return [ value, setValue ];
}
