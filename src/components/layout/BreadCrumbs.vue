<template lang="pug">
#bread-crumbs(:class="'border-1px h-[48px] bg-white set-item-start'")
    .side-meun
        a-dropdown(:trigger="['click']")
                template(#overlay)
                    a-menu
                        ContextMenuPage
                Icon( icon="material-symbols:menu" color="grayText" width="25" height="25" :class="'ml-[18px] md:hidden'")
    .content(:class="'md:pl-[260px] pl-[25px] w-100 text-slate-500 text-[18px] shrink-0'") {{ setCurrentPageTitle() }}
    .control-icon(@click="openInfoMenu()" :class="'hidden md:block  2xl:ml-[65%] xl:ml-[55%] lg:ml-[45%] md:ml-[35%] cursor-pointer'")
        custom-icon(:iconStr="'info'")
</template>

<script setup lang="ts">
import ContextMenuPage from '@/components/layout/contextMenu/ContextMenuPage.vue';
import { useRoute } from 'vue-router';
import { globalMethod } from '@/stores/lin';
const $globalMethod = globalMethod();
const $t = $globalMethod.$t;
const route = useRoute();
const emit = defineEmits(['openInfoMenu']);

function setCurrentPageTitle() {
    if (route.name === 'my-drive' || route.name === 'my-drive-folders') return $t('My Drive');
    if (route.name === 'search-result-page') return $t('Search result');
}

function openInfoMenu() {
    emit('openInfoMenu');
}
</script>

<style scoped></style>
