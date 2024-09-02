import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        rollupOptions: {
            input: {
                home: './src/index.html',
                about: './src/about.html',
                content: './src/content.html',
                projects: './src/projects.html',
                game1: './src/game1.html'
            }
        }
    },
    server: {
        open: '/src/index.html', // Automatically opens the home page in the browser
    },
    base: './' // Ensure correct paths during build
});
