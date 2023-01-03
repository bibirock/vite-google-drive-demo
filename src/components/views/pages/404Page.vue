<template lang="pug">
.404-img(:class="'flex flex-col justify-center items-center h-screen'")
    img(src="/vite-drive.png")
    h1(:class="'mt-[20px] text-lg'") {{ $t("404 result not fount!") }}
</template>
<script setup></script>
<style scoped></style>
