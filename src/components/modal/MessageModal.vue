<template lang="pug">
a-space
</template>
<script setup lang="ts">
import { commonUtilities } from '@/stores/useStore';
import { message } from 'ant-design-vue';
const $commonUtilities = commonUtilities();
const $emitter = $commonUtilities.$emitter;

$emitter.on('show-success-msg', (msg) => {
    message.success(msg as string);
});

message.config({
    maxCount: 1
});
</script>
