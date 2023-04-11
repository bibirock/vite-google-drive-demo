<template lang="pug">
a-dropdown(:trigger="['contextmenu']" )
    div
        #my-drive-page()
            .empty-folder(v-if="folderList.length === 0 && fileList.length === 0 && !showLoading" class="set-item-center flex-col h-screen mt-[-50px]")
                Icon(icon="fluent-emoji-high-contrast:open-file-folder" :class="'opacity-90'" color="#6f6f6f" width="100" height="100")
                span(class="mt-1 text-slate-500") {{ $t('Empty folder you can use new') }}
            loading(v-if="showLoading")
            .page-content(v-else-if="folderList.length !== 0 || fileList.length !== 0 " class="pr-5" @contextmenu.capture="openContextMenu(['toOmit'])")
                div(class="ml-6 md:ml-0 set-item-between mt-2 mb-5 md:pr-[50px]")
                    div {{ $t('Folder') }}
                    div(class="flex")
                        div {{ $t('Name') }}
                        icon(@click="reverseList()" :icon="reverseIcon" width="20" height="20" class="ml-[6px] cursor-pointer")
                .folder-mobile(class="ml-6 md:hidden flex flex-wrap")
                    .folder(v-for='item in folderList' @contextmenu="openContextMenu(['ContextMenuFolder',item])" @click="$utils.goToFolder(item.id)" class="flex justify-start cursor-pointer hover:bg-slate-100 items-center border-1px mb-[14px] pr-[50px] pl-6 rounded-lg w-full h-12")
                        div(class="flex relative")
                            img(:src="$utils.setIcon(item.iconLink)" class="w-6 mr-[10px]")
                            div(class="truncate flex items-center") {{ item.name }}
                            a-dropdown(:trigger="['click']")
                                template(#overlay)
                                    a-menu
                                        ContextMenuFolder(:fileData='fileData')
                                custom-icon(:iconStr="'info'" @click.stop="fileData = item" class="absolute left-[250px] md:hidden")
                .folder-area(class="ml-6 hidden md:ml-0 md:flex md:flex-wrap")
                    .folder(v-for='item in folderList' @contextmenu="openContextMenu(['ContextMenuFolder',item])" @click="$utils.sendFileDetail(item)" @dblclick="$utils.goToFolder(item.id)" class="flex justify-start cursor-pointer hover:bg-slate-100 items-center border-1px mb-[14px] pr-[50px] pl-6 rounded-lg w-full h-12 lg:w-[30%] lg:mr-5 min-w-[222px] 2xl:w-[228px]")
                        div(class="flex relative")
                            img(:src="$utils.setIcon(item.iconLink)" class="w-6 mr-[10px]")
                            div(class="lg:w-[150px] truncate flex items-center") {{ item.name }}
                div(class="ml-6 md:ml-0 set-item-between mt-2 mb-4 pr-[50px]")
                    div {{ $t('File') }}
                .file-area(class="ml-6 md:ml-0 hidden md:flex md:flex-wrap pb-24")
                    .file(v-for='item in fileList' @click="$utils.sendFileDetail(item)" @contextmenu="openContextMenu(['ContextMenuFile',item])" @dblclick="$utils.openFileView(item.webViewLink)" class="flex flex-col items-start mb-[14px] rounded-lg w-full h-[40vw] min-w-[200px] min-h-[200px] max-h-[429px] lg:w-[228px] lg:mr-5 lg:h-[228px] 2xl:w-[228px] 2xl:h-[228px] justify-start cursor-pointer  border-1px")
                        .file-outside(class="h-full w-full set-item-center overflow-hidden")
                            img(v-if="item.thumbnailLink !== undefined" class="scale-125" :src="$utils.setIcon(item.thumbnailLink)" referrerPolicy="no-referrer")
                            icon(v-else icon="fluent:image-prohibited-20-regular" color="grayText" width="60" height="100%")
                        .img-area(class="flex basis-12 items-center pr-6 pl-6")
                            img(:src="$utils.setIcon(item.iconLink)" class="mr-[10px]")
                            div(class="w-[150px] truncate") {{ item.name }}
                .file-area-mobile(class="ml-6 md:hidden flex flex-wrap pb-25")
                    .file(v-for='(item) in fileList' class="flex flex-col items-start mb-[14px] rounded-lg w-full h-[40vw] min-w-[200px] min-h-[200px] max-h-[429px] lg:w-[228px] lg:mr-5 lg:h-[228px] 2xl:w-[228px] 2xl:h-[228px] justify-start cursor-pointer border-1px")
                        .file-outside(class="h-full w-full set-item-center overflow-hidden")
                            img(v-if="item.thumbnailLink !== undefined" class="scale-125" :src="$utils.setIcon(item.thumbnailLink)" referrerPolicy="no-referrer")
                            icon(v-else icon="fluent:image-prohibited-20-regular" color="grayText" width="60" height="100%")
                        .img-area(class="flex basis-12 items-center pr-6 pl-6")
                            img(:src="$utils.setIcon(item.iconLink)" class="mr-[10px]")
                            div(class="w-[150px] truncate") {{ item.name }}
                            a-dropdown(:trigger="['click']" class="ml-12")
                                template(#overlay)
                                    a-menu
                                        ContextMenuFile(:fileData='fileData')
                                custom-icon(:iconStr="'info'" @click.stop="fileData = item")
    template(#overlay)
        a-menu
            component(:is="current.menus" :key="current.menus" :fileData='fileData')
</template>

<script setup lang="ts">
import ContextMenuFile from '@/components/navigation/contextMenu/ContextMenuFile.vue';
import ContextMenuFolder from '@/components/navigation/contextMenu/ContextMenuFolder.vue';
import ContextMenuPage from '@/components/navigation/contextMenu/ContextMenuPage.vue';
import Loading from '@/components/transitions/LoadingIcon.vue';
import { ref, watch, onMounted, onBeforeUnmount, reactive, markRaw, defineComponent } from 'vue';
import type { drive_v3 } from '@googleapis/drive/v3';
import { commonUtilities } from '@/stores/useStore';
import { googleApi } from '@/apis/googleApi.js';
import { useRoute } from 'vue-router';

const $commonUtilities = commonUtilities();
const $utils = $commonUtilities.$utils;
const $emitter = $commonUtilities.$emitter;
const $TYPE = $commonUtilities.$TYPE;
const route = useRoute();

interface menus {
    name: string;
    component: ReturnType<typeof defineComponent>;
}

const menus: Array<menus> = reactive([
    {
        name: 'ContextMenuFile',
        component: markRaw(ContextMenuFile)
    },
    {
        name: 'ContextMenuFolder',
        component: markRaw(ContextMenuFolder)
    },
    {
        name: 'ContextMenuPage',
        component: markRaw(ContextMenuPage)
    }
]);

const current = reactive({
    menus: menus[2].component
});

onMounted(() => {
    setCurrentPage();
    $emitter.on('refresh-page', () => {
        setCurrentPage();
    });
});

onBeforeUnmount(() => {
    $emitter.off('refresh-page');
});

function setCurrentPage() {
    if (route.params.folderId === undefined) return getDriveList();
    refreshPage(route.params.folderId as drive_v3.Schema$File['id']);
}

const showLoading = ref(true);
watch(
    () => route.params.folderId,
    (newId) => {
        showLoading.value = true;
        $utils.sendFileDetail(undefined);
        if (newId === undefined) return getDriveList();
        refreshPage(newId as drive_v3.Schema$File['id']);
    }
);

type FileList = NonNullable<drive_v3.Schema$FileList['files']>;

async function getDriveList() {
    const res = await googleApi.getDriveRootListByAPI();
    setPageContent(res as FileList);
}

async function refreshPage(folderId: drive_v3.Schema$File['id']) {
    const res = await googleApi.getFolderItemByAPI(folderId);
    setPageContent(res as FileList);
}

const folderList = ref<FileList>([]);
const fileList = ref<FileList>([]);
function setPageContent(res: FileList) {
    folderList.value = filterFolder(res);
    fileList.value = filterFolder(res, true);
    showLoading.value = false;
}

function filterFolder(arr: FileList, file = false) {
    if (file === false) return arr.filter((item) => item.mimeType === $TYPE.GOOGLE_FOLDER);
    if (file === true) return arr.filter((item) => item.mimeType !== $TYPE.GOOGLE_FOLDER);
    return [];
}

const fileData = ref();
function openContextMenu(data: Array<string | drive_v3.Schema$File>) {
    if (data[0] === 'toOmit') {
        current.menus = menus[2].component;
        fileData.value = {};
        return;
    }
    fileData.value = data[1];
    current.menus = menus.find((item) => item.name == data[0])?.component;
}

const reverseIcon = ref('akar-icons:arrow-up');
function reverseList() {
    folderList.value.reverse();
    fileList.value.reverse();
    reverseIcon.value === 'akar-icons:arrow-up' ? (reverseIcon.value = 'akar-icons:arrow-down') : (reverseIcon.value = 'akar-icons:arrow-up');
}
</script>
<style lang="scss" scoped>
.file {
    &:hover {
        .img-area {
            width: 100%;
            background-color: rgb(243 244 246);
        }
    }
}
</style>
