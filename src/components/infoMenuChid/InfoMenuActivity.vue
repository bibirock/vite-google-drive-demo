<template lang="pug">
.noChooseFile(v-if="true")
    .img-area(:class="'flex flex-col mt-[20px]'")
        .img
        .text.opacity-60.mx-auto(:class="'mt-[20px]'") {{ $t('No activity') }}
</template>
<script setup></script>
<style scoped></style>
