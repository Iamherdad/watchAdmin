import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@babel/plugin-transform-react-jsx"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
      // buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      // process: "rollup-plugin-node-polyfills/polyfills/process-es6",
    },
  },
  server: {
    proxy: {
      "/miniapp": {
        target:
          "https://tcb-cvsk7m1c8a0975-8dbsfc582f419.service.tcloudbase.com",
        changeOrigin: true,
      },
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
