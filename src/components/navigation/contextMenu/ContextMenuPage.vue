<template lang="pug">
div(class="w-[250px]")
    .control-area
        a-menu-item
            .control-item(@click="createFolderModalProps.isShowMsg = true")
                .icon
                    custom-icon(:iconStr="'newFolder'")
                span {{ $t("New folder") }}
        a-menu-item
            label(form="fileUpload" class="cursor-pointer")
                .control-item
                    .icon
                        custom-icon(:iconStr="'fileUpload'")
                    span {{ $t("File upload") }}
                    input(:key="refreshKey" type="file" id="fileUpload" multiple class="hidden" @change="getFileData()" ref="inputElement")
create-folder-modal(:pageState="createFolderModalProps" @closeModal="createFolderModalProps.isShowMsg = false")
</template>

<script setup lang="ts">
import CreateFolderModal from '@/components/modal/CreateFolderModal.vue';
import { googleApi } from '@/apis/googleApi.js';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { commonUtilities } from '@/stores/useStore';
const $commonUtilities = commonUtilities();
const $t = $commonUtilities.$t;
const $emitter = $commonUtilities.$emitter;
const route = useRoute();
defineProps<Props>();

interface Props {
    fileData?: object;
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

interface FileMetadata {
    name: string;
    parents: Array<string> | [];
}

async function packageRequest(fileName: File['name'], data: Uint8Array) {
    const parentId: string | undefined = route.params.folderId as string;
    const fileMetadata: FileMetadata = {
        name: fileName,
        parents: parentId === undefined ? [] : [parentId]
    };
    uploadFileAndRefresh(fileMetadata, data);
    refreshKey.value += 1;
}

async function uploadFileAndRefresh(fileMetadata: FileMetadata, data: Uint8Array) {
    $emitter.emit('show-upload-progress');
    const res = await googleApi.toUploadFileByAPI(fileMetadata, data);
    if (res.status === 200) {
        successUpload(fileMetadata);
    }
}

function successUpload(fileMetadata: FileMetadata) {
    $emitter.emit('refresh-page');
    $emitter.emit('show-success-msg', $t('File upload success, your file name is') + ':' + fileMetadata.name);
}

const createFolderModalProps = reactive({
    isShowMsg: false
});
</script>

<style lang="scss" scoped>
@import './ContextMenu.scss';
</style>
