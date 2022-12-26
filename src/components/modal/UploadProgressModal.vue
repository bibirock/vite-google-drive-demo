<template lang="pug">
a-modal(v-model:visible="isShowModal"
    wrapClassName="loading-modal"
    okType="create"
    width="300px"
    :footer="null"
    centered=true
    :maskClosable="maskClosable"
    closable=true
    )
    .info(:class="'set-item-center flex-col'")
        p {{ $t("File uploading...") }}
        a-progress(
            type="circle"
            :stroke-color="strokeColor"
            :percent="uploadProgress"
        )
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { linStore, globalMethod } from '@/stores/lin';
const $globalMethod = globalMethod();
const pinia = linStore();
const $emitter = $globalMethod.$emitter;
const strokeColor = reactive({
    '0%': '#108ee9',
    '100%': '#87d068',
});
const maskClosable = ref<boolean>(false);
const isShowModal = ref<boolean>(false);

$emitter.on('show-upload-progress', openUploadProgress);

const uploadProgress = computed(() => {
    if (pinia.getProgress === 100) {
        setTimeout(() => {
            isShowModal.value = false;
            setTimeout(() => {
                pinia.uploadProgress(0);
            }, 2000);
        }, 1500);
    }
    return pinia.getProgress;
});

function openUploadProgress() {
    isShowModal.value = true;
}
</script>
<style lang="scss">
.loading-modal {
    .ant-modal-content {
        border-radius: 6px;
    }
    .ant-modal-close-x {
        display: none;
    }
}
</style>
