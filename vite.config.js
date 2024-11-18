import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
        preprocessorOptions: {
            css: {
                charset: false
            }
        }
    }
});
