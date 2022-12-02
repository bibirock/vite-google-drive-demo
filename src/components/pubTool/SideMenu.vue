<template lang="pug">
#side-menu(:class="'mt-[-40px] min-h-screen hidden md:block md:w-64'")
	.out-side(:class="'bg-white sticky top-[75px] left-[20px] w-fit '")
		a-dropdown(:trigger="['click']")
			template(#overlay)
				a-menu
					ContextMenuPage
			.new-file-area(:class="'shadow-md h-[48px] w-[118px] border-1px rounded-full set-item-center p-[20px] cursor-pointer'")
				.icon(:class="'set-item-between ml-[-20px] w-[80px]'")
					img(src="@/assets/img/new.svg")
					div(:class='"items-center"') {{$t('New')}} 
		.select-area(:class='"mt-[10px]"')
			a-menu(
				v-model:openKeys="state.openKeysopenKeys" 
				v-model:selectedKeys="state.selectedKeysselectedKeys" 
				mode="inline" 
				style="width: 240px; border: none; max-height: 100vh; overflow-y: overlay; overflow-x: hidden;"
				:class='"relative left-[-20px]"'
				)
				a-sub-menu(key="1" class="my-drive-menu" @click="goMyDrive(),getFileList()")
					template(#icon)
						custom-icon(:iconStr="'myDrive'")
					template(#title :class="'pl-[4px] max-h-[500px] overflow-auto'") {{$t('My Drive')}}
					a-sub-menu(v-for="(folder,i) in folderList" :key="i" @click="getFolderItem(folder.id)") 
						template(#icon)
							custom-icon(:iconStr="'folder'")
						template(#title) {{ folder.name }}
				a-sub-menu(key="2")
					template(#icon)
						custom-icon(:iconStr="'computer'")
					template(#title) {{$t('Computer')}}
				a-menu-item(key="3")
					template(#icon)
						custom-icon(:iconStr="'sharedDrives'")
					span {{$t('Shared drives')}}
				a-menu-item(key="4")
					template(#icon)
						custom-icon(:iconStr="'recent'")
					span {{$t('Recent')}}
				a-menu-item(key="5")
					template(#icon)
						custom-icon(:iconStr="'starrted'")
					span {{$t('Starrted')}}
				a-menu-item(key="6")
					template(#icon)
						custom-icon(:iconStr="'trash'")
					span {{$t('Trash')}}
				hr
				a-menu-item(key="7")
					template(#icon)
						custom-icon(:iconStr="'storage'")
					span {{ $t('Storage') }}
</template>

<script setup>
import GoogleAPI from '@/apis/googleAPI.js';
import ContextMenuPage from '@/components/contextMenu/ContextMenuPage.vue';

import { reactive, ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();

const $t = inject('$t');
const $TYPE = inject('$TYPE');

const apis = new GoogleAPI();
const state = reactive({
    theme: 'li',
    selectedKeys: ['1'],
    openKeys: ['sub1'],
});

async function getFolderItem(id) {
    await apis.getFolderItemByAPI(id);
}

const folderList = ref([]);
async function getFileList() {
    const res = await apis.getDriveRootListByAPI();
    const folderListArr = res.filter((item) => item.mimeType === $TYPE.GOOGLE_FOLDER);
    folderList.value = folderListArr;
}

function goMyDrive() {
    if (route.path === '/drive/my-drive') return;
    router.push('/drive/my-drive');
}
</script>

<style lang="scss"></style>
