<template lang="pug">
nav#nav-bar
    .nav-outside
        .nav-inside(class="flex items-center justify-start")
            .img-area(@click="goHome()" class="set-item-center cursor-pointer md:mr-[60px] md:ml-5")
                img(src="/vite-drive.png" class="my-2.5 min-w-10 w-10 ml-[10px]")
                div(class="hidden md:block ml-3 text-slate-500 text-[22px] min-w-[80px] whitespace-nowrap") {{$t('drive')}} 
            .input(class="ml-3 relative w-[400px] basis-[700px]")
                div(class="flex items-center")
                    input(type="text" v-model="inputValue" ref="searchInput" @keyup="getSearchData()" @focus="onFocus()" @blur="onFocus()" @keypress.enter="goToSearchResult()" :placeholder="$t('Search from Google Drive')" class="border max-w-[500px] min-w-[230px] w-full h-12 px-14 rounded-lg bg-slate-100 focus:bg-inherit placeholder:text-base")
                    Icon(icon="carbon:search" color="grayText" width="25" height="25" class="absolute top-3 left-3")
                    Icon(v-if="inputValue !== ''" @click="inputValue = ''" icon="iconoir:cancel" color="grayText" width="25" height="25" class="cursor-pointer ml-[-50px]")
                .search-result-area(v-show="searchResult !== undefined && searchResult.length > 0 && inputValue !== '' && isFocus" class="absolute top-11 border-solid border-2 border-gray-300 max-w-[500px] min-w-[230px] w-full min-h-[50px] max-h-[200px] overflow-auto bg-white rounded-b-lg")
                    .search-result-item(v-for="(item,i) in searchResult" :key="i" )
                        .result-body(class="hover:bg-slate-100 h-[50px] flex items-center" @click="goToFile(item)" @mousedown.prevent)
                            img(:src="$utils.setIcon(item.iconLink)" class="h-5 w-5 ml-[10px] mr-[10px]")
                            .name {{ item.name }}
            .setting(class="ml-7")
                a-dropdown(:trigger="['click']")
                    template(#overlay)
                        a-menu(@click="switchLanguage" v-model="$i18n.locale")
                            a-menu-item(v-for="locale in $i18n.availableLocales" :key="`${locale}`") {{ locale }}
                    Icon(icon="ant-design:setting-outlined" color="grayText" width="25" height="25" class="cursor-pointer focus:outline-none") {{ $t('language') }} 
            .profile(class="mr-10")
</template>

<script setup lang="ts">
import { googleApi } from '@/apis/googleApi.js';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { commonUtilities } from '@/stores/useStore';
import type { drive_v3 } from '@googleapis/drive/v3';
const $commonUtilities = commonUtilities();
const $utils = $commonUtilities.$utils;
const $emitter = $commonUtilities.$emitter;
const $TYPE = $commonUtilities.$TYPE;
const { locale } = useI18n();
const router = useRouter();

$emitter.on('clear-search-input', () => {
    inputValue.value = '';
});

function switchLanguage(e: { key: string }) {
    locale.value = e.key;
}

const isFocus = ref(false);
function onFocus() {
    isFocus.value = !isFocus.value;
}

const inputValue = ref<string>('');
const searchResult = ref<drive_v3.Schema$FileList['files']>();
async function getSearchData() {
    if (inputValue.value === '') return;
    const res = await googleApi.searchFileByAPI(inputValue.value);
    searchResult.value = res;
}

const searchInput = ref<HTMLInputElement>();
function goToSearchResult() {
    searchResult.value = [];
    router.push({ path: '/drive/search', query: { q: inputValue.value } });
    inputBlur();
}

function goHome() {
    router.replace('/drive/my-drive');
}

function inputBlur() {
    if (searchInput.value === undefined) return;
    searchInput.value.blur();
}

function goToFile(item: drive_v3.Schema$File) {
    if (item.mimeType === $TYPE.GOOGLE_FOLDER) return $utils.goToFolder(item.id);
    $utils.openFileView(item.webViewLink);
    inputBlur();
}
</script>
