<template lang="pug">
div.select-none(@contextmenu.prevent="")
    router-view
div
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { provide } from 'vue';

const { t } = useI18n();

provide('$t', t);
</script>

<style scoped></style>
