#!/bin/sh
":" //# comment; exec /usr/bin/env node  --no-warnings --experimental-loader=./cli/loader.mjs --experimental-json-modules --noharmony "$0" "$@"

const { execute } = await import("./program")

execute()
