<template lang="pug">
a-space
</template>
<script setup lang="ts">
import { globalMethod } from '@/stores/lin';
import { message } from 'ant-design-vue';
const $globalMethod = globalMethod();
const $emitter = $globalMethod.$emitter;

$emitter.on('show-success-msg', (msg) => {
    message.success(msg as string);
});

message.config({
    maxCount: 1
});
</script>
