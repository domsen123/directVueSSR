## DirectVuSSR

### What is DirectVuSSR?

DirectVuSSR is an extension for Directus 9 which renderes an Vue Application directly under Directus Root Path. It's using [vite](https://github.com/vitejs/vite) and [frandiox/vite-ssr](https://github.com/frandiox/vite-ssr). But use it with care, cause its not official supported to render something at direcuts root. :)

### Additional .env vars which needs to be set in the directus instance

```
# required
ROOT_REDIRECT=false

# optional in dev
EXTENSIONS_AUTO_RELOAD=true
```

### What to do:

Start developing your Vue application with:

```
pnpm dev
```

### For deployment (or production):

Set the path to your directus extension path in package.json and run

```
pnpm build
```

You have to install all used packages to the directus instance too, cause dependencies are note bundled in build.