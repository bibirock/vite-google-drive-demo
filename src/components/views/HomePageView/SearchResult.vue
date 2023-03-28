<template lang="pug">
#search-result-page
	.empty-folder(v-if="fileList?.length === 0 && !showLoading" class="set-item-center flex-col h-screen mt-[-50px]")
		Icon(icon="fluent-emoji-high-contrast:open-file-folder" class="opacity-90" color="#6f6f6f" width="100" height="100")
		span(class="mt-[5px] text-slate-500") {{ $t('Empty folder you can use new') }}
	Loading(v-if="showLoading")
	.page-content(v-else-if="fileList?.length !== 0 " class="pr-5")
		div(class="set-item-between mt-2 mb-4 pr-[50px]")
			div(class="text-grayText") {{ $t('File') }}
		.file-area(class="flex flex-wrap pb-24")
			.file(v-for='item in fileList' @click="$utils.sendFileDetail(item)" @dblclick="viewFileOrToFolder(item)" class="flex flex-col mb-[14px] rounded-lg w-full h-[40vw] min-w-[200px] min-h-[200px] max-h-[429px] lg:w-[228px] lg:mr-5 lg:h-[228px] 2xl:w-[228px] 2xl:h-[228px] justify-start cursor-pointer items-center border-1px")
				.file-outside(class="h-full w-full set-item-center overflow-hidden")
					img(v-if="item.thumbnailLink !== undefined" class="scale-125" :src="$utils.setIcon(item.thumbnailLink)" referrerPolicy="no-referrer")
					Icon(v-else icon="fluent:image-prohibited-20-regular" color="grayText" width="100" height="100%")
				.img-area(class="flex basis-12 items-center pr-6 pl-6")
					img(:src="$utils.setIcon(item.iconLink)" class="w-[15px] mr-[10px]")
					div(class="lg:w-[150px] truncate") {{ item.name }}
</template>

<script setup lang="ts">
import Loading from '@/components/transitions/LoadingIcon.vue';
import type { drive_v3 } from '@googleapis/drive/v3';
import { ref, watch, onMounted } from 'vue';
import { commonUtilities } from '@/stores/useStore';
import GoogleAPI from '@/apis/googleAPI';
import { useRoute } from 'vue-router';
const $commonUtilities = commonUtilities();
const apis = new GoogleAPI();
const route = useRoute();

const $utils = $commonUtilities.$utils;
const $emitter = $commonUtilities.$emitter;
const $TYPE = $commonUtilities.$TYPE;

function viewFileOrToFolder(item: drive_v3.Schema$File) {
    if (item.mimeType === $TYPE.GOOGLE_FOLDER) return clickFolderRefreshPage(item);
    $utils.openFileView(item.webViewLink);
}

onMounted(() => {
    getSearchResult(route.query.q as drive_v3.Schema$Drive['name']);
});

async function getSearchResult(query: drive_v3.Schema$Drive['name']) {
    const res = await apis.searchFileByAPI(query);
    setPageContent(res as drive_v3.Schema$FileList['files']);
}

const showLoading = ref<boolean>(true);
watch(
    () => route.query.q,
    (newValue) => {
        showLoading.value = true;
        getSearchResult(newValue as drive_v3.Schema$Drive['name']);
    }
);

const fileList = ref<drive_v3.Schema$FileList['files']>();
function setPageContent(res: drive_v3.Schema$FileList['files']) {
    if (res === undefined) return;
    fileList.value = res;
    showLoading.value = false;
}

function clickFolderRefreshPage(item: drive_v3.Schema$File) {
    $utils.goToFolder(item.id);
    $emitter.emit('refresh-page');
    $emitter.emit('clear-search-input');
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
