import { useEffect, useCallback } from 'react';

/** A function called when a message is received, accepting a message event and data. */
export type MessagingCallback = (event: string, data: unknown) => void;

/** A map of message events to callback functions, with an optional default callback. */
export type MessagingCallbacks = {
	[ event: string ]: (data: unknown) => void;
} & {
	DEFAULT?: MessagingCallback;
};

/** Options for `useMessaging`. */
export interface MessagingOptions {
	/** A unique key to identify this messaging channel, defaults to '!'. */
	key?: string;

	/** If specified, messages will not be sent if the target's origin does not equal this value. */
	targetOrigin?: string;
}

/**
 * Allows event-based cross-origin messaging between windows.
 * This hook should be used on both windows, with the same (or no) key.
 * Either the entire callbacks object or individual callbacks should be memoized, to prevent unnecessary rerenders.
 *
 * @param target - The target to send messages to.
 * @param callbacks - Either a `MessagingCallbacks` object (recommended), or a function to handle all messages.
 * @param options - An options object.
 * @returns a function to send messages between origins.
 */

export default function useMessaging(
	target: Window | null | undefined,
	callbacks: MessagingCallbacks | MessagingCallback,
	options?: MessagingOptions) {

	const callbackDeps = typeof callbacks === 'function'
		? [ callbacks ]
		: [ ...Object.keys(callbacks), ...Object.values(callbacks) ];

	useEffect(() => {
		const onMessage = ({ data: { key, event, data } }: any) => {
			if (key !== options?.key ?? '!') return;
			if (typeof callbacks === 'function') callbacks(event, data);
			else if (callbacks[event]) callbacks[event](data);
			else if (callbacks.DEFAULT) callbacks.DEFAULT(event, data);
			else console.warn('[useMessaging] unhandled event \'' + event + '\' received: ' + JSON.stringify(data));
		};

		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	}, [ target, options?.key, ...callbackDeps ]);

	const sendMessage = useCallback((event: string, data: any) => {
		if (!target) console.warn('[useMessaging] attempted to send message to undefined target: '
			+ JSON.stringify({ event, data }));
		target?.postMessage({ key: options?.key ?? '!', event, data }, options?.targetOrigin ?? '*');
	}, [ target, options?.targetOrigin, options?.key ]);

	return sendMessage;
}
