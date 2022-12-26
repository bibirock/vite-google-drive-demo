<template lang="pug">
nav#nav-bar
    .nav-outside
        .nav-inside(:class='"flex items-center justify-start"')
            .img-area(:class='"set-item-center cursor-pointer md:mr-[60px] md:ml-[20px]"' @click="goHome()")
                img(src="/vite-drive.png" :class='"my-2.5 min-w-[40px] w-[40px] ml-[10px]"')
                div(:class='"hidden md:block ml-3 text-slate-500 text-[22px] min-w-[80px] whitespace-nowrap"') {{$t('drive')}} 
            .input(:class='"ml-3 relative w-[400px] basis-[700px]"')
                div(:class="'flex items-center'")
                    input(type="text" v-model="inputValue" ref="searchInput" @keyup="getSearchData()" @focus="onFocus()" @blur="onFocus()" @keypress.enter="goToSearchResult()" :placeholder="$t('Search from Google Drive')" :class='"border max-w-[500px] min-w-[230px] w-[100%] h-12 px-14 rounded-lg bg-slate-100 focus:bg-inherit placeholder:text-base"')
                    Icon(icon="carbon:search" color="grayText" width="25" height="25").absolute.top-3.left-3
                    Icon(v-if="inputValue !== ''" @click="inputValue = ''" icon="iconoir:cancel" color="grayText" width="25" height="25" :class="'cursor-pointer ml-[-50px]'")
                .search-result-area(v-show="searchResult.length > 0 && inputValue !== '' && isFoucs" :class="'absolute top-[43px] border-solid border-2 border-gray-300  max-w-[500px] min-w-[230px] w-[100%] min-h-[50px] max-h-[200px] overflow-auto bg-white rounded-b-lg'")
                    .serch-result-item(v-for="(item,i) in searchResult" :key="i" ) 
                        .result-body(:class="'hover:bg-slate-100 h-[50px] flex items-center'" @click="goToFile(item)" @mousedown.prevent)
                            img(:src="item.iconLink" :class="'h-[20px] w-[20px] ml-[10px] mr-[10px]'")
                            .name {{ item.name }}
            .setting(:class='"ml-[30px]"')
                a-dropdown(:trigger="['click']")
                    template(#overlay)
                        a-menu( @click="switchLanguage" v-model="$i18n.locale")
                            a-menu-item( v-for="locale in $i18n.availableLocales" :key="`${locale}`") {{ locale }}
                    Icon(icon="ant-design:setting-outlined" color="grayText" width="25" height="25" :class="'cursor-pointer focus:outline-none'") {{ $t('language') }} 
            .profile(:class='"mr-10"')
</template>

<script setup lang="ts">
import GoogleAPI from '@/apis/googleAPI';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { globalMethod } from '@/stores/lin';
import type { drive_v3 } from '@googleapis/drive/v3';
const $globalMethod = globalMethod();
const $globalF = $globalMethod.$globalFunction;
const $emitter = $globalMethod.$emitter;
const $TYPE = $globalMethod.$TYPE;
const apis = new GoogleAPI();
const { locale } = useI18n();
const router = useRouter();

$emitter.on('clear-search-input', () => {
    console.log('object');
    inputValue.value = '';
});

function switchLanguage(e: any) {
    locale.value = e.key;
}

const isFoucs = ref(false);
function onFocus() {
    isFoucs.value = !isFoucs.value;
}

const inputValue = ref<string>('');
const searchResult = ref([] as any);
async function getSearchData() {
    if (inputValue.value === '') return;
    const res = await apis.searchFileByAPI(inputValue.value);
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
    if (item.mimeType === $TYPE.GOOGLE_FOLDER) return $globalF.goToFolder(item.id);
    $globalF.openFileView(item.webViewLink);
    inputBlur();
}
</script>

<style scoped></style>
