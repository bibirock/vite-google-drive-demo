<template lang="pug">
.home-page(class="h-screen overflow-hidden relative z-50")
	nav-bar-vue(class="sticky top-0 z-50 bg-white shadow-md")
	bread-crumbs(@openInfoMenu='toggleInfoMenu()' class="sticky top-[60px] h-[50px]")
	.page-content.flex
		side-menu-vue(class="shrink-0")
		.conter(class="w-full h-screen overflow-auto")
			router-view
		.right-menu(v-show="isShowInfoMenu" class="hidden border-1px sticky top-0 md:block md:basis-[500px]")
			info-menu(@closeInfoMenu="isShowInfoMenu = false")
message-modal
upload-progress-modal
</template>

<script setup lang="ts">
import MessageModal from '@/components/modal/MessageModal.vue';
import UploadProgressModal from '@/components/modal/UploadProgressModal.vue';
import SideMenuVue from '@/components/layout/SideMenu.vue';
import navBarVue from '@/components/layout/navBar.vue';
import BreadCrumbs from '@/components/layout/BreadCrumbs.vue';
import InfoMenu from '@/components/layout/InfoMenu.vue';
import { ref } from 'vue';
import { linStore } from '@/stores/useStore';
const pinia = linStore();

checkLoginState();
function checkLoginState() {
    if (window.sessionStorage.getItem('token') == undefined) return;
    const tokenDate: object = JSON.parse(window.sessionStorage.getItem('token') || '{}');
    pinia.changeTokenData(tokenDate);
}

const isShowInfoMenu = ref<boolean>(true);

function toggleInfoMenu() {
    isShowInfoMenu.value === true ? (isShowInfoMenu.value = false) : (isShowInfoMenu.value = true);
}
</script>

<style scoped></style>
