import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/5-letter-word-finder/",
  plugins: [
    react({
      fastRefresh: process.env.NODE_ENV !== "test",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.jsx",
  },
});
