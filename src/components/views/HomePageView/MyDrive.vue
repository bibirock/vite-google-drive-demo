<template lang="pug">
a-dropdown(:trigger="['contextmenu']" )
    div
        #my-drive-page()
            .empty-folder(v-if="folderList.length === 0 && fileList.length === 0 && !showLoading" :class="'set-item-center flex-col h-screen mt-[-50px]'")
                Icon(icon="fluent-emoji-high-contrast:open-file-folder" :class="'opacity-90'" color="#6f6f6f" width="100" height="100")
                span(:class="'mt-[5px] text-slate-500'") {{ $t('Empty folder you can use new') }}
            loading(v-if="showLoading")
            .page-content(v-else-if="folderList.length !== 0 || fileList.length !== 0 " :class="'pr-[20px]'" @contextmenu.capture="openContextMenu(undefined)")
                div(:class="'ml-[25px] md:ml-0 set-item-between mt-[8px] mb-[16px]  md:pr-[50px]'")
                    div {{ $t('Folder') }}
                    div.flex
                        div {{ $t('Name') }}
                        icon(@click="reverseList()" :icon="reverseIcon" width="20" height="20" :class="'ml-[6px] cursor-pointer'")
                .folder-mobile(:class="'ml-[25px]h md:hidden flex flex-wrap'")
                    .folder(v-for='item in folderList' @contextmenu="openContextMenu(['ContextMenuFolder',item])" @click="$globalF.goToFolder(item.id)" :class="'flex justify-start cursor-pointer hover:bg-slate-100 items-center border-1px mb-[14px] pr-[50px] pl-[25px] rounded-lg w-[100%] h-[48px]'")
                        div(:class="'flex relative'")
                            img(:src="item.iconLink" :class="'w-[25px] mr-[10px]'")
                            div(:class="'truncate flex items-center'") {{ item.name }}
                            a-dropdown(:trigger="['click']")
                                template(#overlay)
                                    a-menu
                                        ContextMenuFolder(:fileData='fileData')
                                custom-icon(:iconStr="'info'" @click.stop="fileData = item" :class="'absolute left-[250px] md:hidden'")
                .folder-area(:class="'ml-[25px] hidden md:ml-0 md:flex md:flex-wrap'")
                    .folder(v-for='item in folderList' @contextmenu="openContextMenu(['ContextMenuFolder',item])" @click="$globalF.sendFileDatil(item)" @dblclick="$globalF.goToFolder(item.id)" :class="'flex justify-start cursor-pointer hover:bg-slate-100 items-center border-1px mb-[14px] pr-[50px] pl-[25px] rounded-lg w-[100%] h-[48px] lg:w-[30%] lg:mr-[20px] min-w-[222px] 2xl:w-[228px]'")
                        div(:class="'flex relative'")
                            img(:src="item.iconLink" :class="'w-[25px] mr-[10px]'")
                            div(:class="'lg:w-[150px] truncate flex items-center '") {{ item.name }}
                div(:class="'ml-[25px] md:ml-0 set-item-between mt-[8px] mb-[16px] pr-[50px]'")
                    div {{ $t('File') }}
                .file-area(:class="'ml-[25px] md:ml-0 hidden md:flex md:flex-wrap pb-[100px]'")
                    .file(v-for='(item,i) in fileList' @click="$globalF.sendFileDatil(item)" @contextmenu="openContextMenu(['ContextMenuFile',item])" @dblclick="$globalF.openFileView(item.webViewLink)" :class="'flex flex-col items-start mb-[14px] rounded-lg w-[100%] h-[40vw] min-w-[200px] min-h-[200px] max-h-[429px] lg:w-[228px] lg:mr-[20px] lg:h-[228px] 2xl:w-[228px] 2xl:h-[228px] justify-start cursor-pointer  border-1px '")
                        .file-outside(:class="'h-[100%] w-[100%] set-item-center overflow-hidden'")
                            img(v-if="item.thumbnailLink !== undefined" :class="'scale-125'" :src="item.thumbnailLink" referrerPolicy="no-referrer")
                            icon(v-else icon="fluent:image-prohibited-20-regular" color="grayText" width="60" height="100%")
                        .img-area(:class="'flex basis-[48px] items-center pr-[25px] pl-[25px]'")
                            img(:src="item.iconLink" :class="'mr-[10px]'")
                            div(:class="'w-[150px] truncate'") {{ item.name }}
                .file-area-mobile(:class="'ml-[25px] md:hidden flex flex-wrap pb-[100px]'")
                    .file(v-for='(item) in fileList' :class="'flex flex-col items-start mb-[14px] rounded-lg w-[100%] h-[40vw] min-w-[200px] min-h-[200px] max-h-[429px] lg:w-[228px] lg:mr-[20px] lg:h-[228px] 2xl:w-[228px] 2xl:h-[228px] justify-start cursor-pointer  border-1px '")
                        .file-outside(:class="'h-[100%] w-[100%] set-item-center overflow-hidden'")
                            img(v-if="item.thumbnailLink !== undefined" :class="'scale-125'" :src="item.thumbnailLink" referrerPolicy="no-referrer")
                            icon(v-else icon="fluent:image-prohibited-20-regular" color="grayText" width="60" height="100%")
                        .img-area(:class="'flex basis-[48px] items-center pr-[25px] pl-[25px]'")
                            img(:src="item.iconLink" :class="'mr-[10px]'")
                            div(:class="'w-[150px] truncate'") {{ item.name }}
                            a-dropdown(:trigger="['click']" :class="'ml-12'")
                                template(#overlay)
                                    a-menu
                                        ContextMenuFile(:fileData='fileData')
                                custom-icon(:iconStr="'info'" @click.stop="fileData = item")
    template(#overlay)
        a-menu
            component(:is="current.meuns" :key="current.meuns" :fileData='fileData')
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch, onMounted, onBeforeUnmount, reactive, markRaw, defineComponent } from 'vue';
import Loading from '@/components/transitions/Loading.vue';
import ContextMenuFile from '@/components/layout/contextMenu/ContextMenuFile.vue';
import ContextMenuFolder from '@/components/layout/contextMenu/ContextMenuFolder.vue';
import ContextMenuPage from '@/components/layout/contextMenu/ContextMenuPage.vue';
import type { drive_v3 } from '@googleapis/drive/v3';
import GoogleAPI from '@/apis/googleAPI';
import { globalMethod } from '@/stores/lin';
const $globalMethod = globalMethod();

//全域方法
const $globalF = $globalMethod.$globalFunction;
const $TYPE = $globalMethod.$TYPE;
const $emitter = $globalMethod.$emitter;
const apis = new GoogleAPI();

const folderList = ref([] as any);
const fileList = ref([] as any);
const route = useRoute();
const showLoading = ref(true);
const fileData = ref({});

interface menus {
    name: string;
    component: ReturnType<typeof defineComponent>;
}

const menus: Array<menus> = reactive([
    {
        name: 'ContextMenuFile',
        component: markRaw(ContextMenuFile),
    },
    {
        name: 'ContextMenuFolder',
        component: markRaw(ContextMenuFolder),
    },
    {
        name: 'ContextMenuPage',
        component: markRaw(ContextMenuPage),
    },
]);

const current = reactive({
    meuns: menus[2].component,
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
    refreshPage(route.params.folderId as drive_v3.Params$Resource$Files$Get);
}

watch(
    () => route.params.folderId,
    (newId) => {
        showLoading.value = true;
        $globalF.sendFileDatil(undefined);
        if (newId === undefined) return getDriveList();
        refreshPage(newId as drive_v3.Params$Resource$Files$Get);
    }
);

async function getDriveList() {
    const res = await apis.getDriveRootListByAPI();
    setPageContent(res);
}

async function refreshPage(folderId: drive_v3.Params$Resource$Files$Get) {
    const res = await apis.getFolderItemByAPI(folderId);
    setPageContent(res);
}

function setPageContent(res: drive_v3.Schema$FileList['files']) {
    folderList.value = filterFolder(res);
    fileList.value = filterFolder(res, true);
    showLoading.value = false;
}

function filterFolder(arr: drive_v3.Schema$FileList['files'], file = false) {
    if (file === false) return arr?.filter((item) => item.mimeType === $TYPE.GOOGLE_FOLDER);
    if (file === true) return arr?.filter((item) => item.mimeType !== $TYPE.GOOGLE_FOLDER);
}

function openContextMenu(data: Array<string> | undefined) {
    if (data === undefined) {
        current.meuns = menus[2].component;
        fileData.value = {};
        return;
    }
    fileData.value = data[1];
    current.meuns = menus.find((item) => item.name == data[0])?.component;
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
