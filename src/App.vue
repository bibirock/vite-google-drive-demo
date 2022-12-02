<template lang="pug">
div.select-none(@contextmenu.prevent="")
    router-view
div
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { provide } from 'vue';
import { globalFunction, TYPE } from '@/apis/global.js';
import bus from './bus';

const { t } = useI18n();

provide('$eventBus', bus);
provide('$globalF', globalFunction);
provide('$TYPE', TYPE);
provide('$t', t);
</script>

<style scoped></style>
