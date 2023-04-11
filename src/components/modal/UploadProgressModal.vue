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
    .info(class="set-item-center flex-col")
        p {{ $t("File uploading...") }}
        a-progress(
            type="circle"
            :stroke-color="strokeColor"
            :percent="uploadProgress"
        )
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { linStore, commonUtilities } from '@/stores/useStore';
const $commonUtilities = commonUtilities();
const pinia = linStore();
const $emitter = $commonUtilities.$emitter;
const strokeColor = reactive({
    '0%': '#108ee9',
    '100%': '#87d068'
});
const maskClosable = ref<boolean>(false);
const isShowModal = ref<boolean>(false);

$emitter.on('show-upload-progress', openUploadProgress);

const uploadProgress = computed(() => {
    if (pinia.getProgress === 100) {
        clearProgress();
    }
    return pinia.getProgress;
});

function clearProgress() {
    setTimeout(() => {
        isShowModal.value = false;
        setTimeout(() => {
            pinia.uploadProgress(0);
        }, 2000);
    }, 1500);
}

function openUploadProgress() {
    isShowModal.value = true;
}
</script>
