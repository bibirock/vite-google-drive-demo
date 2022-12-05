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
	input( v-model.trim="newFolderName" @keypress.enter="createFolder()" :placeholder='$t("Untitled folder")' :class="'w-[100%] px-[10px] h-[40px] rounded-md border-2 border-slate-300 hover:border-slate-400 active:border-sky-400'")
</template>

<script setup>
import GoogleAPI from '@/apis/googleAPI.ts';
import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const apis = new GoogleAPI();
const $emitter = inject('$emitter');
const $t = inject('$t');
const props = defineProps({
    pageState: Object,
});

const emit = defineEmits(['closeModal']);

const isNewFolder = ref(false);
const newFolderName = ref('');
const isLock = ref(true);

async function createFolder() {
    if (!isLock.value) return;
    isLock.value = false;
    const folderItem = setFolderItem();
    const res = await apis.createFolderByAPI(folderItem);
    if (res.status === 200) onSeccess();

    setTimeout(() => {
        isLock.value = true;
    }, 2000);
}

function setFolderItem() {
    if (newFolderName.value === '') newFolderName.value = 'Untitled';
    const folderItem = {
        name: newFolderName.value,
        parents: route.params.folderId === undefined ? '' : route.params.folderId,
    };
    return folderItem;
}

function closeHandler() {
    newFolderName.value = '';
}

function onSeccess() {
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
