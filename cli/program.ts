import { dirname, resolve } from 'path';
import dotenv from 'dotenv';
import { Command } from 'commander';
import ssrBuild from 'vite-ssr/build';
import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import pkg from '../package.json';
import { fileURLToPath } from 'url';

const commander = new Command();

const targetPath = pkg['directus:extension'].path;

const dest = targetPath.startsWith('/')
  ? dirname(targetPath)
  : dirname(resolve(dirname(fileURLToPath(import.meta.url)), targetPath));

export const execute = async (): Promise<void> => {
  commander.command('build').action(async () => {
    await ssrBuild();

    const bundle = await rollup({
      input: 'src/extension/index.ts',
      external: ['express', 'path'],
      plugins: [
        typescript({ include: 'src/extension/**' }),
        copy({ targets: [{ src: 'dist/*', dest }] }),
      ],
    });

    await bundle.write({
      format: 'commonjs',
      file: `dist/index.js`,
      exports: 'auto',
    });
  });

  commander.parse(process.argv);
};
