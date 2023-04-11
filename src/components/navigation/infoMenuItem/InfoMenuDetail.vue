<template lang="pug">
.noChooseFile(v-if="infoData.data == undefined")
    .img-area(class="flex flex-col mt-5")
        .img
            custom-icon(:iconStr="'fileDetail'")
        .text(class="mt-5 opacity-60 mx-auto") {{ $t('Select a file or folder to view its details') }}
.info-area(v-else)
    .img(class="h-36 w-full border-1px set-item-center overflow-hidden")
        img(v-if="infoData.data.thumbnailLink !== undefined" class="h-full" referrerPolicy="no-referrer" :src="$utils.setIcon(infoData.data.thumbnailLink)")
        Icon(v-else icon="fluent:image-prohibited-20-regular" color="grayText" width="100" height="100%")
    .info-detail(class="p-4")
        .has-access(class="text-lg opacity-75") {{ $t('Who has access') }}
        .access(class="mt-5 mb-5 overflow-auto max-h-[60px]")
            .access-info(v-if="infoData.data.shared" v-for="user in infoData.data.permissions")
                .access-arr(class="set-item-start  mb-1")
                    img(v-if="user.photoLink !== undefined" :src="$utils.setIcon(user.photoLink)" class="h-6 mr-1 rounded-full")
                    Icon(v-else icon="ci:link" color="#FFFFFF" width="25" height="25" class="bg-lime-600 mr-1 rounded-full")
                    .access {{ formatDisplayName(user) }}
            .access-info(v-else class="set-item-start h-14")
                custom-icon(:iconStr="'noShare'")
                .no-shared(class="ml-4") {{ $t("Not shared") }}
        .system-properties
            .title(class="text-lg opacity-75 title-color mb-2") {{ $t("System properties") }}
            table
                tbody
                    tr
                        td(class="w-28") {{ $t("Type") }}
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
                        td {{ infoData.data.spaces?.join(",") }}
                    tr
                        td {{ $t("Owner") }}
                        td {{ formatOwner(infoData) }}
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
<script setup lang="ts">
import { reactive } from 'vue';
import { commonUtilities } from '@/stores/useStore';
import type { drive_v3 } from '@googleapis/drive/v3';
const $commonUtilities = commonUtilities();
const $emitter = $commonUtilities.$emitter;
const $TYPE = $commonUtilities.$TYPE;
const $t = $commonUtilities.$t;
const $utils = $commonUtilities.$utils;
const infoData: InfoData = reactive({});

interface InfoData {
    data?: drive_v3.Schema$File;
}

$emitter.on('send-file-data', (data) => {
    infoData.data = data as InfoData['data'];
});

function formatBytes(bytesStr: drive_v3.Schema$File['size'], decimals = 1) {
    if (bytesStr === undefined) return false;
    const bytes = parseInt(bytesStr as string);
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatDate(dateTime: drive_v3.Schema$File['modifiedTime']) {
    const date = new Date(dateTime as string).toLocaleString();
    return date;
}

function formatType(type: drive_v3.Schema$File['mimeType']) {
    if (type === $TYPE.IMG) return $t('Image');
    if (type === $TYPE.WORD) return 'Word';
    if (type === $TYPE.GOOGLE_SHEETS) return $t('Google Sheets');
    if (type === $TYPE.PDF) return 'PDF';
    if (type === $TYPE.GOOGLE_FOLDER) return $t('Google Drive Folder');
    if (type === $TYPE.GOOGLE_DOCS) return $t('Google Docs');
    return $t('Other');
}

function formatDisplayName(user: drive_v3.Schema$Permission) {
    if (user.displayName === undefined) return $t('Anyone with link');
    if (user.displayName !== undefined && user.role === 'owner') return user.displayName + $t('is owner');
    return user.displayName;
}

function formatOwner(infoData: InfoData) {
    const owners = infoData.data?.owners as Array<drive_v3.Schema$User>;
    return owners[0].me ? $t('Me') : '';
}
</script>