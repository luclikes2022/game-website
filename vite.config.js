import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        rollupOptions: {
            input: {
                home: './src/pages/index.html',
                about: './src/pages/about.html',
                content: './src/pages/content.html',
                projects: './src/pages/projects.html',
                game1: './src/pages/game1.html'
            }
        }
    },
    server: {
        open: '/src/pages/index.html', // Automatically opens the home page in the browser
    },
    base: './' // Ensure correct paths during build
});
