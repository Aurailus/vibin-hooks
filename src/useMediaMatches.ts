import { useState, useEffect, useMemo } from 'react';

/**
 * Returns a boolean indicating if a media query matches.
 *
 * @param query - The media query to match against.
 * @returns a boolean indicating if the media query matches.
 */

export default function useMediaMatches(query: string) {
	const media = useMemo(() => window.matchMedia(query), [ query ]);

	const [ matches, setMatches ] = useState<boolean>(media.matches);

	useEffect(() => {
		setMatches(media.matches);
		media.onchange = () => setMatches(media.matches);
		return () => {
			media.onchange = null;
		};
	}, [ media ]);

	return matches;
};
