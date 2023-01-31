<template lang="pug">
div.select-none(@contextmenu.prevent="" :class="''")
    router-view(:class="'overflow-hidden'")
div
</template>

<script setup lang="ts"></script>
<style scoped></style>
