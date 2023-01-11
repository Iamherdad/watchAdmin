import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, //注意这里要设置为true，否则无效
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
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
});
