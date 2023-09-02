import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import removeConsole from "vite-plugin-remove-console";

export default defineConfig({
  build: {
    target: 'esnext',
    devtool: '#source-map',
    productionSourceMap: false, // Previously it was set as true
    cssSourceMap: false, // Previously set as true
  },
  resolve: {
    alias: {
      vue: '@vue/compat',
      "@unhead/vue": require.resolve("@unhead/vue"),
    },
  },
  plugins: [vue(), removeConsole()],
});
