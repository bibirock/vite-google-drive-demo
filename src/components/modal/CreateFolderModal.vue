<template lang="pug">
a-modal(v-model:visible="pageState.isShowMsg"
	:title='$t("New folder")'
	:ok-text='$t("Create")'
	:cancel-text='$t("Cancel")'
	wrapClassName="newFolderModal"
	:afterClose="closeHandler()"
	okType="create"
	width="340px"
	centered=true
	@ok="createFolder()")
	input(v-model.trim="newFolderName" @keypress.enter="createFolder()" :placeholder='$t("Untitled folder")' class="w-full px-[10px] h-10 rounded-md border-2 border-slate-300 hover:border-slate-400 active:border-sky-400")
</template>

<script setup lang="ts">
import type { drive_v3 } from '@googleapis/drive/v3';
import { globalMethod } from '@/stores/lin';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import GoogleAPI from '@/apis/googleAPI';
const $globalMethod = globalMethod();
const $emitter = $globalMethod.$emitter;
const $t = $globalMethod.$t;
const apis = new GoogleAPI();
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
    const res = await apis.createFolderByAPI(folderItem);
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
<style lang="scss">
.newFolderModal {
    .ant-modal-title {
        font-size: 1.375rem;
        font-weight: 500;
        line-height: 1.5rem;
        margin-top: 0;
    }

    .ant-modal-header {
        border-bottom: none;
        border-radius: 8px;
        padding-bottom: 0;
    }

    .ant-modal-content {
        border-radius: 8px;
    }

    .ant-modal-close-x {
        display: none;
    }

    .ant-modal-footer {
        border: none;

        .ant-btn {
            border: none;
            letter-spacing: -1px;

            &:hover {
                background-color: rgb(244, 243, 243);
            }
        }

        .ant-btn-create {
            color: #1967d2;
        }
    }
}
</style>
