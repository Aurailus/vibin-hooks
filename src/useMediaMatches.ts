import { useState, useEffect, useMemo } from 'react';

/**
 * Returns a boolean indicating if a media query matches.
 *
 * @param query - The media query to match against.
 * @param serverDefault - The default value for if the hook is used in SSR. Defaults to false.
 * @returns a boolean indicating if the media query matches.
 */

export default function useMediaMatches(query: string, serverDefault = false) {
	const media = useMemo(() => 'window' in globalThis ? window.matchMedia(query) : null, [ query ]);

	const [ matches, setMatches ] = useState<boolean>(media?.matches ?? serverDefault);

	useEffect(() => {
		setMatches(media!.matches);
		media!.onchange = () => setMatches(media!.matches);
		return () => {
			media!.onchange = null;
		};
	}, [ media ]);

	return matches;
};
