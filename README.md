# Absolutely Vibin' Hooks for (P)React.

## Okay, but what is this, anyways?

I've been working on a lot of React projects recently, and I seem to run into the need for the same hooks again and again. So I thought: 'why not make this simpler and just publish a package with all of them in it?' And now we're here. All of them are compatible with React and Preact, and the package has its own typings, because I'm not a troglodyte.

## What hooks are included?

View the [source](https://github.com/Aurailus/vibin-hooks) for the full documentation, but a basic list are as follows:

- `useAsyncEffect` - Calls an effect asynchronously, with aborting.
- `useAsyncMemo` - Memoizes an asynchronous value, with caching, defaults, and aborting.
- `useMediaMatches` - Checks a media query using `window.matchMedia`.
- `useMessaging` - Event-based cross-origin message sharing.
- `useRerender` - Returns a memoized callback that makes the component rerender.
- `useStoredState` - A `useState` that caches the state value in the local storage.

## Why "Vibin'"?

I don't know man, it's 2:00 AM.
