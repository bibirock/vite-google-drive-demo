<template lang="pug">
.noChooseFile(v-if="infoData.data == undefined")
    .img-area(:class="'flex flex-col mt-[20px]'")
        .img
            custom-icon(:iconStr="'fileDeatil'")
        .text.opacity-60.mx-auto(:class="'mt-[20px]'") {{ $t('Select a file or folder to view its details') }}
.info-area(v-else)
    .img(:class="'h-[150px] w-[100%] border-1px set-item-center overflow-hidden'")
        img(v-if="infoData.data.thumbnailLink !== undefined" :class="'h-[100%]'" referrerPolicy="no-referrer" :src="infoData.data.thumbnailLink")
        Icon(v-else icon="fluent:image-prohibited-20-regular" color="grayText" width="100" height="100%")
    .info-detail(:class="'p-[16px]'")
        .has-access(:class="'text-lg opacity-75'") {{ $t('Who has access') }}
        .access(:class="'mt-[20px] mb-[20px] overflow-auto max-h-[60px]'")
            .access-info(v-if="infoData.data.shared" v-for="user in infoData.data.permissions" :class="''")
                .access-arr(:class="'set-item-start mb-[5px]'")
                    img(v-if="user.photoLink !== undefined" :src="user.photoLink" :class="'h-[25px] mr-[5px] rounded-full'")
                    Icon(v-else icon="ci:link" color="#FFFFFF" width="25" height="25" :class="'bg-lime-600 mr-[5px] rounded-full'")
                    .access {{ formatDisplayName(user) }}
            .access-info(v-else :class="'set-item-start h-[60px]'")
                custom-icon(:iconStr="'noShare'")
                .no-shared(:class="'ml-[15px]'") {{ $t("Not shared") }}
        .system-properties
            .title(:class="'text-lg opacity-75 title-color mb-[10px]'") {{ $t("System properties") }}
            table
                tbody
                    tr
                        td(:class="'w-[110px]'") {{ $t("Type") }}
                        a-tooltip(placement="bottom")
                            template(#title) {{ infoData.data.mimeType }}
                            td {{ formatType(infoData.data.mimeType) }}
                    tr(v-if="formatBytes(infoData.data.size) !== false")
                        td {{ $t("Size") }}
                        td {{ formatBytes(infoData.data.size) }}
                    tr(v-if="formatBytes(infoData.data.quotaBytesUsed) !== false")
                        td {{ $t("Storage used") }}
                        td {{ formatBytes(infoData.data.quotaBytesUsed) }}
                    tr
                        td {{ $t("Location") }}
                        td {{ infoData.data.spaces.join(",") }}
                    tr
                        td {{ $t("Owner") }}
                        td {{ infoData.data.owners[0].me? $t("Me") : ""}}
                    tr
                        td {{ $t("Modified") }}
                        td {{ formatDate(infoData.data.modifiedTime) }}
                    tr
                        td {{ $t("Opened") }}
                        td {{ formatDate(infoData.data.viewedByMeTime) }}
                    tr
                        td {{ $t("Created") }}
                        td {{ formatDate(infoData.data.createdTime) }}
</template>
<script setup>
import { reactive, inject } from 'vue';
const $eventBus = inject('$eventBus');
const $t = inject('$t');
const $TYPE = inject('$TYPE');

const infoData = reactive({});
$eventBus.$on('send-file-data', (data) => {
    infoData.data = data;
});

function formatBytes(bytes, decimals = 1) {
    if (bytes == 0) return '0 Bytes';
    if (bytes == undefined) return false;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatDate(dateTime) {
    const date = new Date(dateTime).toLocaleString();
    return date;
}

function formatType(type) {
    if (type === $TYPE.IMG) return $t('Image');
    if (type === $TYPE.WORD) return 'Word';
    if (type === $TYPE.GOOGLE_SHEETS) return $t('Google Sheets');
    if (type === $TYPE.PDF) return 'PDF';
    if (type === $TYPE.GOOGLE_FOLDER) return $t('Google Drive Folder');
    if (type === $TYPE.GOOGLE_DOCS) return $t('Google Docs');
    return $t('Other');
}

function formatDisplayName(user) {
    if (user.displayName === undefined) return $t('Anyone with link');
    if (user.displayName !== undefined && user.role === 'owner') return user.displayName + $t('is owner');
    return user.displayName;
}

function formatIcon(type) {
    if (type === $TYPE.GOOGLE_FOLDER) return 'ant-design:folder-filled';
    return 'bi:card-image';
}
</script>
<style scoped></style>
