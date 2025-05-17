import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import {resolve} from 'path'
import {readdirSync} from 'fs'

const files = readdirSync(resolve(__dirname,"src"),{"recursive": true})
    .filter(path=>path.endsWith(".html"))
    .map(path=>resolve(__dirname,"src",path));


export default defineConfig({
    root: resolve(__dirname,"src"),
    plugins: [
        react(),
        false??compression({algorithm:"gzip",ext:".gz",deleteOriginFile: false})
    ],
    build: {
        outDir: resolve(__dirname,"dist"),
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("react")) return "react";
                        return "vendor";
                    }
                },
            },
            "input": files
        }
    }
})
