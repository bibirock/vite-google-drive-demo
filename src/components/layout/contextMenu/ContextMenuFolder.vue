<template lang="pug">
div(:class="'w-[250px]'")
    .control-area
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
        a-menu-item
            .control-item(@click="getLink()")
                .icon
                    custom-icon(:iconStr="'getLink'")
                span {{ $t("Get link") }}
delete-file-modal(:pageState="deleteFileModalProps" @closeModal="deleteFileModalProps.isShowMsg = false")
update-file-name(:pageState="updateFileModalProps" @closeModal="updateFileModalProps.isShowMsg = false")
</template>

<script setup lang="ts">
import DeleteFileModal from '@/components/modal/DeleteFileModal.vue';
import UpdateFileName from '@/components/modal/UpdateFileNameModal.vue';
import { reactive } from 'vue';
import { globalMethod } from '@/stores/lin';
const $globalMethod = globalMethod();
const $globalF = $globalMethod.$globalFunction;
const $emitter = $globalMethod.$emitter;
const $t = $globalMethod.$t;

interface props {
    fileData: {
        isShowMsg?: boolean;
        name: string;
        id: string;
        webViewLink: string;
        webContentLink: string;
        [propsName: string]: unknown;
    };
}

const props = defineProps<props>();

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

async function getLink() {
    await $globalF.copyLink(props.fileData.webViewLink);
    $emitter.emit('show-success-msg', $t('Link copied to clipboard'));
}
</script>
<style lang="scss" scoped>
@import './ContextMenu.scss';
</style>
