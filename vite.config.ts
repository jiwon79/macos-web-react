import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    svgr({
      include: '**/*.svg',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      assets: resolve(__dirname, 'src/assets/'),
      domains: resolve(__dirname, 'src/domains/'),
      modules: resolve(__dirname, 'src/modules/'),
      utils: resolve(__dirname, 'src/utils/'),
      views: resolve(__dirname, 'src/views/'),
      'third-parties': resolve(__dirname, 'src/third-parties/'),
    },
  },
});
