<template lang="pug">
.outer
    .inside
        .header
            .header-info(class="h-[72px] set-item-around")
                .file-name
                    .no-chose-data(v-if="infoData == undefined" class="flex")
                        custom-icon(:iconStr="'myDrive'")
                        .title(class="text-[22px] text-slate-500") {{ $t('My Drive') }}
                    .has-data(v-else class="flex")
                        img(:src="$utils.setIcon(infoData.iconLink)" class="w-5 h-5 mt-2 mr-[10px] set-item-start")
                        a-tooltip(placement="bottom")
                            template(#title) {{ infoData.name }}
                            .title(class="text-[22px] text-slate-500 w-40 truncate") {{ infoData.name }}
                Icon(@click="closeInfoMenu()" icon="iconoir:cancel" color="grayText" width="25" height="25" class="cursor-pointer")
            .header-control(class="h-12 w-full set-item-around border-b-2")
                .view(@click="switchView(view.component)" v-for="(view,i) in views" :key="i" class="w-[48%] h-[50px] set-item-center cursor-pointer opacity-80 border-b-4 border-transparent hover:border-b-4 hover:border-gray-500" :class="{ 'book-mark': showBookmark(view.component)}") {{ $t(view.name) }}
        .body 
            keep-alive
                component(:is="current.views" :key="current.views")
</template>

<script setup lang="ts">
import { reactive, markRaw, defineComponent, ref } from 'vue';
import { commonUtilities } from '@/stores/useStore';
import InfoMenuDetail from '@/components/navigation/infoMenuItem/InfoMenuDetail.vue';
import InfoMenuActivity from '@/components/navigation/infoMenuItem/InfoMenuActivity.vue';
import type { drive_v3 } from '@googleapis/drive/v3';
const $commonUtilities = commonUtilities();
const $utils = $commonUtilities.$utils;
const $emitter = $commonUtilities.$emitter;
const emit = defineEmits(['closeInfoMenu']);

interface Views {
    name: string;
    component: ReturnType<typeof defineComponent>;
}

const views: Array<Views> = reactive([
    {
        name: 'Details',
        component: markRaw(InfoMenuDetail)
    },
    {
        name: 'Activity',
        component: markRaw(InfoMenuActivity)
    }
]);

function switchView(component: Views['component']) {
    current.views = component;
}

const current = reactive({
    views: views[0].component
});
function showBookmark(page: Views) {
    if (page === current.views) return true;
}

const infoData = ref();
$emitter.on('send-file-data', (data) => {
    infoData.value = data as drive_v3.Schema$File;
});

function closeInfoMenu() {
    emit('closeInfoMenu');
}
</script>

<style scoped>
.book-mark {
    @apply border-lightLight text-lightLight;
}
</style>
