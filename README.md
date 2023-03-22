# ptsup test

## Issue 1: `internal` option not respected

### Description

`ptsup` does not respect `internal` when set. The following command does not inline the `react` dep in bundle:

```bash
ptsup --entry=src/index.ts --clean --internal=react
```

When providing an empty array `--external=[]` as external, it does inline the dep as expected in the bundle:

```bash
ptsup --entry=src/index.ts --clean --external=[] --internal=react
```

### Replicate 

1. Clone the repo, switch branch, install & build:
```bash
git clone https://github.com/jrson83/node-ts-preset
cd node-ts-preset
git checkout ptsup

pnpm install
pnpm build
```

> It builds and inlines the `react` dep.

2. Remove from `package.json` `build` script:

```bash
--external=[]
```

3. run `pnpm build`.

> It does not inline the `react` dep.

## Issue 2: when dependencies missing error not caught

### Description

When adding an internal dep, which does not exist in `dependencies`, the following error happens:

```bash
> ptsup --entry=src/index.ts --clean --external=[] --internal=react

X X [[ERROR]ERROR ]Could not resolve "react" 

    src/index.ts:1:33:
Could not resolve "react"      1 │ export { default as React } from

    src/index.ts:1:33:
'react'      1 │ export { default as React } from
        ╵                                  'react'~~~~~~~
        ╵

  You can mark the path "react" as external to exclude it from the bundle, which will remove this
  error.

~~~~~~~

  You can mark the path "react" as external to exclude it from the bundle, which will remove this
  error.

D:\__projects\ptsup\bundle-test\nn\node_modules\.pnpm\esbuild@0.17.12\node_modules\esbuild\lib\main.js:1636
  let error = new Error(`${text}${summary}`);
              ^

Error: Build failed with 1 error:
src/index.ts:1:33: ERROR: Could not resolve "react"
    at failureErrorWithLog (D:\__projects\ptsup\bundle-test\nn\node_modules\.pnpm\esbuild@0.17.12\node_modules\esbuild\lib\main.js:1636:15)
    at D:\__projects\ptsup\bundle-test\nn\node_modules\.pnpm\esbuild@0.17.12\node_modules\esbuild\lib\main.js:1048:25
    at D:\__projects\ptsup\bundle-test\nn\node_modules\.pnpm\esbuild@0.17.12\node_modules\esbuild\lib\main.js:993:52
    at buildResponseToResult (D:\__projects\ptsup\bundle-test\nn\node_modules\.pnpm\esbuild@0.17.12\node_modules\esbuild\lib\main.js:1046:7)
    at D:\__projects\ptsup\bundle-test\nn\node_modules\.pnpm\esbuild@0.17.12\node_modules\esbuild\lib\main.js:1075:16
    at responseCallbacks.<computed> (D:\__projects\ptsup\bundle-test\nn\node_modules\.pnpm\esbuild@0.17.12\node_modules\esbuild\lib\main.js:697:9)
    at handleIncomingPacket (D:\__projects\ptsup\bundle-test\nn\node_modules\.pnpm\esbuild@0.17.12\node_modules\esbuild\lib\main.js:752:9)
    at Socket.readFromStdout (D:\__projects\ptsup\bundle-test\nn\node_modules\.pnpm\esbuild@0.17.12\node_modules\esbuild\lib\main.js:673:7)
    at Socket.emit (node:events:513:28)
    at addChunk (node:internal/streams/readable:324:12) {
  errors: [
    {
      detail: undefined,
      id: '',
      location: {
        column: 33,
        file: 'src/index.ts',
        length: 7,
        line: 1,
        lineText: "export { default as React } from 'react'",
        namespace: '',
        suggestion: ''
      },
      notes: [
        {
          location: null,
          text: 'You can mark the path "react" as external to exclude it from the bundle, which will remove this error.'
        }
      ],
      pluginName: '',
      text: 'Could not resolve "react"'
    }
  ],
  warnings: []
}

Node.js v18.14.0
 ELIFECYCLE  Command failed with exit code 1.
```

### Replicate 

> If exist, remove `lockfile` and `node_modules` folder before.

1. Clone the repo and install & buiild:
```bash
git clone https://github.com/jrson83/node-ts-preset
cd node-ts-preset
git checkout ptsup

pnpm install
pnpm build
```

> It should build with no errors.

2. Remove from `package.json`:

```json
"dependencies": {
  "react": "18.2.0"
},
```

3. run `pnpm build`.

> The error is not caught:

