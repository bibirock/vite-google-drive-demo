<template lang="pug">
a-space
</template>
<script setup>
import { inject } from 'vue';
import { message } from 'ant-design-vue';
const $eventBus = inject('$eventBus');

$eventBus.$on('show-success-msg', (msg) => {
    message.success(msg);
});

message.config({
    maxCount: 1,
});
</script>
<style scoped></style>
