<template lang="pug">
div(:class="'w-[250px]'")
    .control-area
        a-menu-item
            .control-item(@click="$globalF.openFileView(fileData.webViewLink)")
                .icon
                    custom-icon(:iconStr="'preview'")
                span {{ $t("Preview") }}
        a-menu-item
            .control-item(@click="downloadFile(fileData.webContentLink)")
                .icon
                    custom-icon(:iconStr="'download'")
                span {{ $t("Download") }}
        a-menu-item
            .control-item(@click="updateFileModalProps.isShowMsg = true")
                .icon
                    custom-icon(:iconStr="'rename'")
                span {{ $t("Rename") }}
        a-menu-item
            .control-item(@click="deleteFileModalProps.isShowMsg = true")
                .icon
                    custom-icon(:iconStr="'delete'")
                span {{ $t("Delete") }}
        a-menu-item|
            .control-item
                .icon
                    custom-icon(:iconStr="'getLink'")
                span {{ $t("Get link") }}
delete-file-modal(:pageState="deleteFileModalProps" @closeModal="deleteFileModalProps.isShowMsg = false")
update-file-name(:pageState="updateFileModalProps" @closeModal="updateFileModalProps.isShowMsg = false")
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import DeleteFileModal from '@/components/modal/DeleteFileModal.vue';
import UpdateFileName from '@/components/modal/UpdateFileNameModal.vue';
import { globalMethod } from '@/stores/lin';
const $globalMethod = globalMethod();
const $globalF = $globalMethod.$globalFunction;

const props = defineProps<props>();

interface props {
    fileData: {
        isShowMsg?: boolean;
        name: string;
        id: string;
        [propsName: string]: any;
    };
}

const deleteFileModalProps = reactive({
    isShowMsg: false,
    name: props.fileData.name,
    id: props.fileData.id
});

const updateFileModalProps = reactive({
    isShowMsg: false,
    name: props.fileData.name,
    id: props.fileData.id
});

function downloadFile(link: string) {
    window.location.assign(link);
}
</script>

<style lang="scss" scoped>
@import './ContextMenu.scss';
</style>
