import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        lib : {
            entry : path.resolve(__dirname, "index.ts"),
            name : "@waiin/raaghu-react",
            fileName : (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ["react","react-dom","react-measure"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                }
            }
        },
        sourcemap: true,
        emptyOutDir : true,
    },
    plugins: [react(), dts()],
    optimizeDeps: {
        include: ["charts"],
    }
});
