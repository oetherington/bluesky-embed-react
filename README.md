# Bluesky Embed React

[![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://oetherington.github.io/bluesky-embed-react/) ![CI](https://github.com/oetherington/bluesky-embed-react/actions/workflows/ci.yml/badge.svg) [![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/oetherington/bluesky-embed-react/refs/heads/main/COPYING)

Lightweight configurable React component for embedding posts, profiles and feeds
from [Bluesky](https://bsky.app).

Bluesky Embed React is an independent project, not affiliated with Bluesky.

## Demo and Examples

https://oetherington.github.io/bluesky-embed-react/

## Install

```bash
npm install bluesky-embed-react
```

or

```bash
yarn add bluesky-embed-react
```

## Basic Usage

### Importing

```jsx
import {
	BlueskyPost,
	BlueskyProfilePosts,
	BlueskyConfigProvider,
} from "bluesky-embed-react";
```

### Embed a post

```jsx
<BlueskyPost userHandle="bsky.app" postId="3l6oveex3ii2l" />
```

-   **userHandle** The username or DID of the user who created the post
-   **postId** The ID of the post to embed

For instance, in the post https://bsky.app/profile/bsky.app/post/3l3t5pvpm222b
the `userHandle` is "bsky.app" and the `postId` is "3l3t5pvpm222b".

### Embed a users profile feed

```jsx
<BlueskyProfilePosts userHandle="bsky.app" />
```

-   **userHandle** The username or DID of the user to embed
-   **pageSize** The number of posts to display (and fetch if using infinite loading)
-   **infiniteLoad** Enable inifite loading when scrolling to the end of the list

## Configuration

Advanced configuration can be done by wrapping the components in a
`BlueskyConfigProvider`:

```jsx
<BlueskyConfigProvider hideAvatars>
	<BlueskyPost userHandle="bsky.app" postId="3l6oveex3ii2l" />
</BlueskyConfigProvider>
```

The props are of type `BlueskyConfig` which has the following properties:

-   **app** The base URL to use for outward links (default `https://bsky.app`)
-   **service** The base URL for the API (default `https://public.api.bsky.app`)
-   **openLinksInNewTab** Open links in place or in a new tab (default `false`)
-   **avatarSize** The size of user avatars in pixels (default `42`)
-   **hideAvatars** Whether or not to hide user avatars (default `false`)
-   **hideEmbeds** Whether or not to hide embedded media and links (default `false`)
-   **textPrimaryColor** CSS color string for primary text (default `#f1f3f5`)
-   **textSecondaryColor** CSS color string for secondary text (default `#aebbc9`)
-   **backgroundColor** CSS color string for post backgrounds (default `#161e27`)
-   **borderColor** CSS color string for borders (default `#2e4052`)
-   **loadingShimmer** CSS color string for the loading shimmer effect (default `linear-gradient(100deg, #aaa 40%, #bdbdbd 50%, #aaa 60%)`)
-   **fontFamily** CSS font stack to apply to all posts (default `InterVariable, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`)
-   **fontSize** CSS font size for main text (default `15px`)
-   **embedFontSize** CSS font size for embedded media descriptions (default `14px`)
-   **fontWeight** CSS font weight for main text (default `400`)
-   **titleFontWeight** CSS font weight for title text (default `600`)
-   **lineHeight** CSS line height for all text (default `140%`)
-   **grid** Grid size in pixels used for calculating all margins and padding (default `8px`)
-   **borderRadius** CSS border radius applied to posts and loaders (default `6px`)
-   **width** CSS width applied to posts (default `600px`)
-   **formatShortDate** Function to format dates into a short format
-   **formatLongDate** Function to format dates into a long format

## License

MIT © [oetherington](https://github.com/oetherington). See the included [COPYING](https://raw.githubusercontent.com/oetherington/bluesky-embed-react/refs/heads/main/COPYING) file for details.
