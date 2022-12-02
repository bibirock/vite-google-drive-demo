import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { resolve } from 'path';

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueI18n({
            include: path.resolve(__dirname, './src/locales/**'),
            compositionOnly: true,
        }),
    ],
    base: process.env.NODE_ENV === 'production' ? '/google-drive-demo/' : '/', //github發布版的網址需改為"/google-drive-demo/"
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    server: {
        host: '0.0.0.0',
    },
    define: {
        'process.env': {},
    },
    build: {
        rollupOptions: {
            output: {
                // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
                sanitizeFileName(name) {
                    const match = DRIVE_LETTER_REGEX.exec(name);
                    const driveLetter = match ? match[0] : '';
                    // substr 是被淘汰語法，因此要改 slice
                    return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '');
                },
            },
        },
    },
});
