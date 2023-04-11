import { defineConfig } from 'ptsup'

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'node',
  format: ['cjs', 'esm'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: {
    enable: true,
  },
  external: [],
  esbuild: {
    bundle: true,
  },
})
