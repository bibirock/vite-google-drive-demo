declare module '*.json' {
    const value: any;
    export default value;
}
declare module '*.vue' {
    import { defineComponent } from 'vue';
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}

//此檔案宣告擴充套件模組，定義引入的檔案並導出給ts
