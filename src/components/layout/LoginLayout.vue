<template lang="pug">
div(v-if="notSupportBrowser")
    article(class="flex h-screen w-screen justify-center flex-col items-center")
        img(src="/vite-drive.png" :class="'mb-[20px]'")
        p(class="mx-auto px-[15px]") 您所使用的內嵌式瀏覽器並不支援Google OAuth登入政策，請使用網頁瀏覽器開啟此Demo Web
        p Google OAuth
        img(src="@/assets/img/noSupport.png" class="w-[95%]")
        a(href="https://developers.googleblog.com/2016/08/modernizing-oauth-interactions-in-native-apps.html?fbclid=IwAR2KDyMTyHkv1iik96VarrFpfjp8Y6T78J1_sYwV30FV_Uo0ITV0WZw2LYY") 詳情請見
div(v-else)
    article(class="flex sm:min-h-screen sm:mt-0 w-screen mt-[35%] justify-center flex-col items-center")
        img(src="/vite-drive.png" class="mb-5")
        button(class="border-2 border-slate-500 h-13 p-2 px-5 hover:text-sky-400 hover:border-sky-400 rounded-lg text-slate-500" @click='loginGoogle()') {{ "登入Google以使用雲端硬碟" }}
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { linStore } from '@/stores/useStore';
import { googleApi } from '@/apis/googleApi.js';
const { userAgent } = navigator;
const pinia = linStore();
const router = useRouter();

const notSupportBrowser = ref<boolean>(false);

onMounted(() => {
    detectBrowser();
});

function detectBrowser() {
    if (userAgent.includes('Firefox/') || userAgent.includes('Edg/') || userAgent.includes('Chrome/') || userAgent.includes('Safari/')) {
        return;
    }
    notSupportBrowser.value = true;
}

function initGoogle() {
    return google.accounts.oauth2.initCodeClient({
        client_id: pinia.googleClientData.clientId,
        scope: pinia.googleClientData.scope,
        ux_mode: 'popup',
        redirect_uri: pinia.googleClientData.redirecutURI,
        callback: toGetTokenByAPI
    });
}

function loginGoogle() {
    initGoogle().requestCode();
}

async function toGetTokenByAPI(code: google.accounts.oauth2.CodeResponse) {
    const res = await googleApi.getAccountTokenByAPI(code.code);
    pinia.changeTokenData(res);
    loginSuccess(res);
}

function loginSuccess(tokenData: object) {
    router.replace('drive');
    window.sessionStorage.setItem('token', JSON.stringify(tokenData));
}
</script>
