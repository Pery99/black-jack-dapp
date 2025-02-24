import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    // nodePolyfills({
    //   include: ["buffer", "crypto", "stream", "util"],
    // }),
  ],
  define: {
    "process.env": {},
    global: {},
  },
  resolve: {
    alias: {
      stream: "stream-browserify",
      buffer: "buffer",
    },
  },
});
