<template lang="pug">
.outer 
    .inside
        .header
            .header-info(:class="'h-[72px] set-item-around'")
                .file-name
                    .no-chose-data(v-if="infoData.data == undefined" :class="'flex'")
                        custom-icon(:iconStr="'myDrive'")
                        .title(:class="'text-[22px] text-slate-500'") {{ $t('My Drive') }}
                    .has-data(v-else :class="'flex'")
                        img(:src="infoData.data.iconLink" :class="'w-[20px] h-[20px] mt-[8px] mr-[10px] set-item-start'")
                        a-tooltip(placement="bottom")
                            template(#title) {{ infoData.data.name }}
                            .title(:class="'text-[22px] text-slate-500 w-[160px] truncate'") {{ infoData.data.name }}
                Icon(@click="closeInfoMenu()" icon="iconoir:cancel" color="grayText" width="25" height="25" :class="'cursor-pointer'")
            .header-control(:class="'h-[50px] w-[100%] set-item-around border-b-2'")
                .view(@click="switchView(view.component)" v-for="(view,i) in views" :key="i" :class="'w-[48%] h-[50px] set-item-center cursor-pointer opacity-80 border-b-4 border-transparent hover:border-b-4 hover:border-gray-500',{ 'in-this-page': showBookmark(view.component) }") {{ $t(view.name) }}
        .body 
            keep-alive
                component(:is="current.views" :key="current.views") 
</template>
<script setup>
import { reactive, markRaw, inject } from 'vue';
import InfoMenuDetail from '@/components/infoMenuChid/InfoMenuDetail.vue';
import InfoMenuActivity from '@/components/infoMenuChid/InfoMenuActivity.vue';

const emit = defineEmits(['closeInfoMenu']);

const $eventBus = inject('$eventBus');

const views = reactive([
    {
        name: 'Details',
        component: markRaw(InfoMenuDetail),
    },
    {
        name: 'Activity',
        component: markRaw(InfoMenuActivity),
    },
]);

function switchView(component) {
    current.views = component;
}

const current = reactive({
    views: views[0].component,
});

function showBookmark(page) {
    if (page === current.views) return true;
}

const infoData = reactive({});
$eventBus.$on('send-file-data', (data) => {
    infoData.data = data;
});

function closeInfoMenu() {
    emit('closeInfoMenu');
}
</script>

<style scoped>
.in-this-page {
    border-color: #1a73e8;
    color: #1a73e8;
}
</style>
