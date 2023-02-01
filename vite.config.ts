import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueI18n({
            include: path.resolve(__dirname, './src/locales/**'),
            compositionOnly: true
        }),
        VitePWA({
            registerType: 'autoUpdate',
            mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
            devOptions: {
                enabled: true
            },
            includeAssets: ['favicon.svg'],
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /(.*?)\.(js|css|ts)/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'js-css-cache'
                        }
                    },
                    {
                        urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'image-cache'
                        }
                    }
                ]
            },
            manifest: {
                name: 'Google Drive Demo',
                short_name: 'Vite Drive',
                theme_color: '#ffffff',
                start_url: process.env.NODE_ENV === 'production' ? 'https://bibirock.github.io/vite-google-drive-demo/#/' : 'http://localhost:5173/#/',
                scope: './',
                display: 'standalone',
                prefer_related_applications: true,
                icons: [
                    {
                        src: './vite-drive-145x145.png',
                        sizes: '145x145',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
    base: process.env.NODE_ENV === 'production' ? '/vite-google-drive-demo/' : '/',
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    server: {
        host: '0.0.0.0'
    },
    define: {
        'process.env': {}
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
                }
            }
        }
    }
});
