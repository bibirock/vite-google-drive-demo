/// <reference types="vite-plugin-pwa/client" />

declare module '*.json' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any;
    export default value;
}
declare module '*.vue' {
    import { defineComponent } from 'vue';
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}
