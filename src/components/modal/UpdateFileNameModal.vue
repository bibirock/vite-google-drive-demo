<template lang="pug">
a-modal(v-model:visible="pageState.isShowMsg"
    :title='$t("Rename")'
    :ok-text='$t("OK")'
    :cancel-text='$t("Cancel")'
    wrapClassName="newFolderModal"
    :afterClose="closeHandler()"
    okType="create"
    width="340px"
    centered=true
    @ok="updateFile()")
    input( v-model.trim="pageState.name" @keypress.enter="updateFile()" class="w-full px-[10px] h-10 rounded-md border-2 border-slate-300 hover:border-slate-400 active:border-sky-400")
</template>

<script setup lang="ts">
import GoogleAPI from '@/apis/googleAPI';
import { ref, onMounted } from 'vue';
import { globalMethod } from '@/stores/lin';
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

const isLock = ref<boolean>(true);

async function updateFile() {
    if (!isLock.value) return;
    isLock.value = false;
    const folderItem = setFolderItem();
    const res = await apis.toUpdateFileNameByAPI(folderItem);
    if (res.status === 200) onSeccess();

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

function onSeccess() {
    $emitter.emit('show-success-msg', $t('File name update success'));
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
