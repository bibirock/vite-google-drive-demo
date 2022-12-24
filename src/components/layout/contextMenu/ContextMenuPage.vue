<template lang="pug">
div(:class="'w-[250px]'")
    .control-area
        a-menu-item
            .control-item(@click="createFolderModalProps.isShowMsg = true")
                .icon
                    custom-icon(:iconStr="'newFolder'")
                span {{ $t("New folder") }}
        a-menu-item
            label(form="fileUpload" :class="'cursor-pointer'")
                .control-item
                    .icon
                        custom-icon(:iconStr="'fileUpload'")
                    span {{ $t("File upload") }}
                    input(:key="refreshKey" type="file" id="fileUpload" multiple :class="'hidden'" @change="getFileData()" ref="inputElement")
create-folder-modal(:pageState="createFolderModalProps" @closeModal="createFolderModalProps.isShowMsg = false")
</template>

<script setup lang="ts">
import CreateFolderModal from '@/components/modal/CreateFolderModal.vue';
import GoogleAPI from '@/apis/googleAPI';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { globalMethod } from '@/stores/lin';
const $globalMethod = globalMethod();
const $t = $globalMethod.$t;
const $emitter = $globalMethod.$emitter;

const route = useRoute();
const apis = new GoogleAPI();

const props = defineProps<props>();

interface props {
    fileData: {
        isShowMsg?: boolean;
        name: string;
        id: string;
        [propsName: string]: any;
    };
}

const inputElement = ref<HTMLInputElement>();
const refreshKey = ref(0);
function getFileData() {
    const reader = new FileReader();
    const target = inputElement.value;
    const fileData = target?.files as FileList;
    reader.readAsArrayBuffer(fileData[0]);
    reader.onload = async (f) => {
        packageRequest(fileData[0].name, f.target?.result as Uint8Array);
    };
}

interface fileMetadata {
    name: string;
    parents: any;
}

async function packageRequest(fileName: File['name'], data: Uint8Array) {
    const fileMetadata: fileMetadata = {
        name: fileName,
        parents: route.params.folderId === undefined ? [] : [route.params.folderId],
    };
    uploadFileAndRefresh(fileMetadata, data);
    refreshKey.value += 1;
}

async function uploadFileAndRefresh(fileMetadata: fileMetadata, data: Uint8Array) {
    $emitter.emit('show-upload-progress');
    const res = await apis.toUploadFileByAPI(fileMetadata, data);
    if (res.status === 200) {
        successUpload(fileMetadata);
    }
}

function successUpload(fileMetadata: fileMetadata) {
    $emitter.emit('refresh-page');
    $emitter.emit('show-success-msg', $t('File upload success, your file name is') + ':' + fileMetadata.name);
}

const createFolderModalProps = reactive({
    isShowMsg: false,
});
</script>

<style lang="scss" scoped>
@import './ContextMenu.scss';
</style>
