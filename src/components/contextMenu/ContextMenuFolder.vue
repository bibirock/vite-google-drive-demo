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

<script setup>
import DeleteFileModal from '@/components/modal/DeleteFileModal.vue';
import UpdateFileName from '@/components/modal/UpdateFileNameModal.vue';
import { reactive, inject } from 'vue';
const $t = inject('$t');
const $globalF = inject('$globalF', () => {}, false);
const $eventBus = inject('$eventBus');

const props = defineProps({
    fileData: Object,
});

const deleteFileModalProps = reactive({
    isShowMsg: false,
    name: props.fileData.name,
    id: props.fileData.id,
});

const updateFileModalProps = reactive({
    isShowMsg: false,
    name: props.fileData.name,
    id: props.fileData.id,
});

async function getLink() {
    await $globalF.copyLink(props.fileData.webViewLink);
    $eventBus.$emit('show-success-msg', $t('Link copied to clipboard'));
}
</script>
<style lang="scss" scoped>
@import './ContextMenu.scss';
</style>
