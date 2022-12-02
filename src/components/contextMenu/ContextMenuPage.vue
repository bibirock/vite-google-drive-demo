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

<script setup>
import CreateFolderModal from '../modal/CreateFolderModal.vue';
import GoogleAPI from '@/apis/googleAPI.js';
import { ref, reactive, inject } from 'vue';
import { useRoute } from 'vue-router';

const $eventBus = inject('$eventBus');
const $t = inject('$t');
const route = useRoute();
const apis = new GoogleAPI();

const inputElement = ref(null);

const props = defineProps({
    fileData: Object,
});

const refreshKey = ref(0);

function getFileData() {
    const reader = new FileReader();
    const fileData = inputElement.value.files[0];
    reader.readAsArrayBuffer(fileData);
    reader.onload = async (f) => {
        packageRequest(fileData.name, f.target.result);
    };
}

async function packageRequest(fileName, data) {
    const fileMetadata = {
        name: fileName,
        parents: route.params.folderId === undefined ? [] : [route.params.folderId],
    };
    uploadFileAndRefresh(fileMetadata, data);
    refreshKey.value += 1;
}

async function uploadFileAndRefresh(fileMetadata, data) {
    $eventBus.$emit('show-upload-progress');
    const res = await apis.toUploadFileByAPI(fileMetadata, data);
    if (res.status === 200) {
        successUpload(fileMetadata);
    }
}

function successUpload(fileMetadata) {
    $eventBus.$emit('refresh-page');
    $eventBus.$emit('show-success-msg', $t('File upload success, your file name is') + ':' + fileMetadata.name);
}

const createFolderModalProps = reactive({
    isShowMsg: false,
});
</script>

<style lang="scss" scoped>
@import './ContextMenu.scss';
</style>
