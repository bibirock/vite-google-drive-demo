<template lang="pug">
a-modal(v-model:visible="pageState.isShowMsg"
    :title='$t("Rename")'
    :ok-text='$t("OK")'
    :cancel-text='$t("Cancel")'
    wrapClassName="input-modal"
    :afterClose="closeHandler()"
    okType="create"
    width="340px"
    centered=true
    @ok="updateFile()")
    input( v-model.trim="pageState.name" @keypress.enter="updateFile()" class="w-full px-[10px] h-10 rounded-md border-2 border-slate-300 hover:border-slate-400 active:border-sky-400")
</template>

<script setup lang="ts">
import { googleApi } from '@/apis/googleApi.js';
import { ref, onMounted } from 'vue';
import { commonUtilities } from '@/stores/useStore';
const $commonUtilities = commonUtilities();
const $emitter = $commonUtilities.$emitter;
const $t = $commonUtilities.$t;

interface props {
    pageState: {
        isShowMsg: boolean;
        name: string;
        id: string;
    };
}

const props = defineProps<props>();

const emit = defineEmits(['closeModal']);

const isLock = ref<boolean>(true);

async function updateFile() {
    if (!isLock.value) return;
    isLock.value = false;
    const folderItem = setFolderItem();
    const res = await googleApi.toUpdateFileNameByAPI(folderItem);
    if (res.status === 200) onSuccess();

    setTimeout(() => {
        isLock.value = true;
    }, 2000);
}

const newFileName = ref('');
onMounted(() => {
    newFileName.value = props.pageState.name;
});

function setFolderItem() {
    if (newFileName.value === '') newFileName.value = props.pageState.name;
    const folderItem = {
        name: newFileName.value,
        fileId: props.pageState.id
    };
    return folderItem;
}

function closeHandler() {
    newFileName.value = '';
}

function onSuccess() {
    $emitter.emit('show-success-msg', $t('File name update success'));
    $emitter.emit('refresh-page');
    emit('closeModal');
}
</script>
