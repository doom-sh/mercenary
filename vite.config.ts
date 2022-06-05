import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  // when building, output as library
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.tsx"),
      name: "Mercenary",
      fileName: (format) => `mercenary.${format}.js`,
    },
    rollupOptions: {
      external: ["fs", "path", "onigasm"],
    },
  },
});
