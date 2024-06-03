import { defineConfig } from 'vite';
export default defineConfig({
    root: './',
    build: {
        rollupOptions: {
            input: {
                home: '/src/pages/index.html',
                about: '/src/pages/about.html',
                content: '/src/pages/content.html',
                projects: '/src/pages/projects.html'
            }
        }
    }
});