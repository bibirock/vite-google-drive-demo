<template lang="pug">
a-modal(v-model:visible="pageState.isShowMsg"
	:title='$t("New folder")'
	:ok-text='$t("Create")'
	:cancel-text='$t("Cancel")'
	wrapClassName="input-modal"
	:afterClose="closeHandler()"
	okType="create"
	width="340px"
	centered=true
	@ok="createFolder()")
	input(v-model.trim="newFolderName" @keypress.enter="createFolder()" :placeholder='$t("Untitled folder")' class="w-full px-[10px] h-10 rounded-md border-2 border-slate-300 hover:border-slate-400 active:border-sky-400")
</template>

<script setup lang="ts">
import type { drive_v3 } from '@googleapis/drive/v3';
import { commonUtilities } from '@/stores/useStore';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { googleApi } from '@/apis/googleApi.js';
const $commonUtilities = commonUtilities();
const $emitter = $commonUtilities.$emitter;
const $t = $commonUtilities.$t;
const route = useRoute();

interface Props {
    pageState: {
        isShowMsg: boolean;
    };
}

const emit = defineEmits(['closeModal']);
defineProps<Props>();

const isNewFolder = ref(false);
const newFolderName = ref('');
const isLock = ref(true);
async function createFolder() {
    if (!isLock.value) return;
    isLock.value = false;
    const folderItem = setFolderItem();
    const res = await googleApi.createFolderByAPI(folderItem);
    if (res.status === 200) onSuccess();

    setTimeout(() => {
        isLock.value = true;
    }, 2000);
}

function setFolderItem() {
    const parents: Array<string> = [];
    const folderId: string | undefined = route.params.folderId as string;
    if (newFolderName.value === '') newFolderName.value = 'Untitled';
    if (folderId !== undefined) parents.push(folderId as string);
    const folderItem: drive_v3.Params$Resource$Files$Create['requestBody'] = {
        name: newFolderName.value,
        parents: parents
    };
    return folderItem;
}

function closeHandler() {
    newFolderName.value = '';
}

function onSuccess() {
    isNewFolder.value = false;
    $emitter.emit('show-success-msg', $t('Folder create success'));
    $emitter.emit('refresh-page');
    emit('closeModal');
}
</script>
