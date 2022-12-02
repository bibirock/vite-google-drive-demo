<template lang="pug">
#search-result-page
	.empty-folder(v-if="fileList.length === 0 && !showLoading" :class="'set-item-center flex-col h-screen mt-[-50px]'")
		Icon(icon="fluent-emoji-high-contrast:open-file-folder" :class="'opacity-90'" color="#6f6f6f" width="100" height="100")
		span(:class="'mt-[5px] text-slate-500'") {{ $t('Empty folder you can use new') }}
	Loading(v-if="showLoading")
	.page-content(v-else-if="fileList.length !== 0 " :class="'pr-[20px]'")
		div(:class="'set-item-between mt-[8px] mb-[16px] pr-[50px]'")
			div(:class="'text-grayText'") {{ $t('File') }}
		.file-area(:class="'flex flex-wrap pb-[100px]'")
			.file(v-for='(item,i) in fileList' @click="$globalF.sendFileDatil(item)" @dblclick="viewFileOrToFolder(item)" :class="'flex flex-col mb-[14px] rounded-lg w-[100%] h-[40vw] min-w-[200px] min-h-[200px] max-h-[429px] lg:w-[228px] lg:mr-[20px] lg:h-[228px] 2xl:w-[228px] 2xl:h-[228px] justify-start cursor-pointer  items-center border-1px '")
				.file-outside(:class="'h-[100%] w-[100%] set-item-center overflow-hidden'")
					img(v-if="item.thumbnailLink !== undefined" :class="'scale-125'" :src="item.thumbnailLink" referrerPolicy="no-referrer")
					Icon(v-else icon="fluent:image-prohibited-20-regular" color="grayText" width="100" height="100%")
				.img-area(:class="'flex basis-[48px] items-center pr-[25px] pl-[25px]'")
					img(:src="item.iconLink" :class="'w-[15px] mr-[10px]'")
					div(:class="'lg:w-[150px] truncate '") {{ item.name }}
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, watch, onMounted, inject } from 'vue';
import GoogleAPI from '@/apis/googleAPI.js';
import Loading from '@/components/transitions/Loading.vue';

//全域方法
const $globalF = inject('$globalF', () => {}, false);
const $TYPE = inject('$TYPE');
const $eventBus = inject('$eventBus');

const apis = new GoogleAPI();
const fileList = ref([]);
const route = useRoute();
const showLoading = ref(true);

function viewFileOrToFolder(item) {
    if (item.mimeType === $TYPE.GOOGLE_FOLDER) return clickFolderRefreshPage(item);
    $globalF.openFileView(item.webViewLink);
}

onMounted(() => {
    getSearchResult(route.query.q);
});

async function getSearchResult(query) {
    const res = await apis.searchFileByAPI(query);
    setPageContent(res);
}

watch(
    () => route.query.q,
    (newq) => {
        showLoading.value = true;
        getSearchResult(newq);
    }
);

function setPageContent(res) {
    fileList.value = res;
    showLoading.value = false;
}

function clickFolderRefreshPage(item) {
    $globalF.goToFolder(item.id);
    $eventBus.$emit('refresh-page');
    $eventBus.$emit('clear-search-input');
}
</script>

<style lang="scss" scoped>
.file {
    &:hover {
        .img-area {
            background-color: rgb(243 244 246);
        }
    }
}
</style>
