<template lang="pug">
a-modal(v-model:visible="pageState.isShowMsg"
    :title='$t("Information")'
    :ok-text='$t("OK")'
    :cancel-text='$t("Cancel")'
    wrapClassName="newFolderModal"
    okType="create"
    width="340px"
    centered=true
    @ok="confirmInput()")
    p(:class="'text-orange-600'") {{ $t("This action will trash your google drive file to Bin, you need to enter file name confrim.") }}
    p {{ $t("Your file name is :") }} 
        span(:class="'text-red-600'") {{ pageState.name }}
    input(v-model.trim="inputVal" @keyup.enter="confirmInput()" :placeholder='$t("Please enter file name")' :class="'w-[100%] px-[10px] h-[40px] rounded-md border-2 border-slate-300 hover:border-slate-400 active:border-sky-400'")
    span(v-if="inputErr" :class="'text-red-600'") {{ $t("Name confrim error") }}
</template>
<script setup lang="ts">
import { globalMethod } from '@/stores/lin';
import GoogleAPI from '@/apis/googleAPI';
import { ref } from 'vue';
const apis = new GoogleAPI();
const $globalMethod = globalMethod();
const $emitter = $globalMethod.$emitter;
const $t = $globalMethod.$t;

interface props {
    pageState: {
        isShowMsg: boolean;
        name: string;
        id: string;
    };
}

const props = defineProps<props>();

const emit = defineEmits(['closeModal']);

async function deleteFile(fileId: string) {
    await apis.toTrashFileByAPI(fileId);
    $emitter.emit('show-success-msg', $t('File moved to trash'));
    $emitter.emit('refresh-page');
}

const inputVal = ref('');
const inputErr = ref(false);
async function confirmInput() {
    if (inputVal.value === props.pageState.name) {
        deleteFile(props.pageState.id);
        emit('closeModal');
        return;
    }
    inputErr.value = true;
}
</script>
<style scoped></style>
