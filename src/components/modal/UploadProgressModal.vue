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

<script setup>
import { ref, reactive, inject, computed } from 'vue';
import { linStore } from '@/stores/lin';
const pinia = linStore();
const $emitter = inject('$emitter');
const strokeColor = reactive({
    '0%': '#108ee9',
    '100%': '#87d068',
});

const isShowModal = ref(false);
const emit = defineEmits(['closeModal']);

//控制彈窗不能點擊遮罩關閉
const maskClosable = ref(false);

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
