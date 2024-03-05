import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    svgr({
      include: '**/*.svg',
    }),
  ],
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
