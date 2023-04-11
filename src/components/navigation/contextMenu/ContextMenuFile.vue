<template lang="pug">
div(class="w-[250px]")
    .control-area
        a-menu-item
            .control-item(@click="$utils.openFileView(fileData.webViewLink)")
                .icon
                    custom-icon(:iconStr="'preview'")
                span(class="menu-item") {{ $t("Preview") }}
        a-menu-item
            .control-item(@click="downloadFile(fileData.webContentLink)")
                .icon
                    custom-icon(:iconStr="'download'")
                span(class="menu-item") {{ $t("Download") }}
        a-menu-item
            .control-item(@click="updateFileModalProps.isShowMsg = true")
                .icon
                    custom-icon(:iconStr="'rename'")
                span(class="menu-item") {{ $t("Rename") }}
        a-menu-item
            .control-item(@click="deleteFileModalProps.isShowMsg = true")
                .icon
                    custom-icon(:iconStr="'delete'")
                span(class="menu-item") {{ $t("Delete") }}
        a-menu-item
            .control-item
                .icon
                    custom-icon(:iconStr="'getLink'")
                span(class="menu-item") {{ $t("Get link") }}
delete-file-modal(:pageState="deleteFileModalProps" @closeModal="deleteFileModalProps.isShowMsg = false")
update-file-name(:pageState="updateFileModalProps" @closeModal="updateFileModalProps.isShowMsg = false")
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import DeleteFileModal from '@/components/modal/DeleteFileModal.vue';
import UpdateFileName from '@/components/modal/UpdateFileNameModal.vue';
import { commonUtilities } from '@/stores/useStore';
const $commonUtilities = commonUtilities();
const $utils = $commonUtilities.$utils;

interface Props {
    fileData: {
        isShowMsg?: boolean;
        name: string;
        id: string;
        webViewLink: string;
        webContentLink: string;
        [propsName: string]: unknown;
    };
}

const props = defineProps<Props>();

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
