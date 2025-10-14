import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  target: 'node18',
  format: ['cjs'],
  sourcemap: true,
  dts: false,
  clean: true,
  minify: false,
  external: ['grammy', 'node-schedule', 'dotenv'],
});
