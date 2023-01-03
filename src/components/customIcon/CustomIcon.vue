<template>
    <div v-if="props.iconStr === 'info'">
        <svg class="a-s-fa-Ha-pa c-qd" width="24px" height="24px" viewBox="0 0 24 24" fill="grayText">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'preview'">
        <svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="grayText">
            <path
                d="M12 7c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7zm0 7.2c-1.49 0-2.7-1.21-2.7-2.7 0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7c0 1.49-1.21 2.7-2.7 2.7z"
            ></path>
            <path
                d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 13a9.77 9.77 0 0 1-8.82-5.5C4.83 8.13 8.21 6 12 6s7.17 2.13 8.82 5.5A9.77 9.77 0 0 1 12 17z"
            ></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'download'">
        <svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="grayText">
            <path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m11.59-8.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5-1.41-1.41z"></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'rename'">
        <svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="grayText">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
                d="M18.41 5.8L17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"
            ></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'delete'">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="grayText" focusable="false">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
            <path d="M9 8h2v9H9zm4 0h2v9h-2z" style=""></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'getLink'">
        <svg class="icon" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="grayText">
            <path
                d="M3.9,12c0-1.7,1.4-3.1,3.1-3.1h4V7H7c-2.8,0-5,2.2-5,5s2.2,5,5,5h4v-1.9H7C5.3,15.1,3.9,13.7,3.9,12z M8,13h8v-2H8V13zM17,7h-4v1.9h4c1.7,0,3.1,1.4,3.1,3.1s-1.4,3.1-3.1,3.1h-4V17h4c2.8,0,5-2.2,5-5S19.8,7,17,7z"
            ></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'newFolder'">
        <svg class="a-s-fa-Ha-pa" width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="grayText">
            <path d="M12 12h2v-2h2v2h2v2h-2v2h-2v-2h-2v-2zm10-4v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2l.01-12c0-1.1.89-2 1.99-2h6l2 2h8c1.1 0 2 .9 2 2zm-2 0H4v10h16V8z"></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'fileUpload'">
        <svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="grayText">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path>
            <path d="M8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'noShare'">
        <svg class="border-1px rounded-full" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" focusable="false" fill="grayText">
            <g transform="translate(6.000000, 6.000000)">
                <path
                    d="M6,7v-2.004c0-2.199,1.791-3.996,4-3.996c2.205,0,4,1.789,4,3.996V7h0.504c0.816,0,1.496,0.674,1.496,1.506v7.988c0,0.834-0.67,1.506-1.496,1.506h-9.008c-0.816,0-1.496-0.674-1.496-1.506v-7.988c0-0.834,0.669-1.506,1.496-1.506H6L6,7zM12.5,7v-2.004C12.5,3.619,11.379,2.5,10,2.5c-1.378,0-2.5,1.122-2.5,2.496V7H12.5L12.5,7zM10,14c0.828,0,1.5-0.672,1.5-1.5s-0.672-1.5-1.5-1.5S8.5,11.672,8.5,12.5S9.172,14,10,14z"
                ></path>
            </g>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'fileDeatil'">
        <svg width="107px" height="82px" viewBox="0 0 107 82" class="opacity-25 mx-auto" focusable="false">
            <path
                class="a-s-fa-Ha-pa"
                fill="#000000"
                d="M0,4a4,4,0,0,1,4,-4h89a4,4,0,0,1,4,4v18.5l-23.5,40.5h-69.5a4,4,0,0,1,-4,-4ZM74.5,65l23,-39.15l1,0l7,4.1l1,1l-23,39.15ZM74,65.8l9.5,5.5l-9,4ZM97,51v8a4,4,0,0,1,-4,4h-3ZM21,63v19l23,-19Z"
            ></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'myDrive'">
        <svg class="mr-[10px] mt-[6px]" width="25px" height="25px" viewBox="0 0 24 24" fill="grayText" focusable="false">
            <path d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"></path>
            <path
                d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"
            ></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'folder'">
        <svg height="24" width="24" focusable="false" viewBox="0 0 24 24" fill="grayText" class="a-s-fa-Ha-pa">
            <g>
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
            </g>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'computer'">
        <svg class="" width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" focusable="false">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'sharedDrives'">
        <svg class="" width="24px" height="24px" viewBox="0 0 24 24" fill="grayText" focusable="false">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
                xmlns="http://www.w3.org/2000/svg"
                d="M15 8c0-1.42-.5-2.73-1.33-3.76.42-.14.86-.24 1.33-.24 2.21 0 4 1.79 4 4s-1.79 4-4 4c-.43 0-.84-.09-1.23-.21-.03-.01-.06-.02-.1-.03A5.98 5.98 0 0 0 15 8zm1.66 5.13C18.03 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.58-3.47-6.34-3.87zM9 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 9c-2.7 0-5.8 1.29-6 2.01V18h12v-1c-.2-.71-3.3-2-6-2M9 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 9c2.67 0 8 1.34 8 4v3H1v-3c0-2.66 5.33-4 8-4z"
            ></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'recent'">
        <svg class="" width="24px" height="24px" viewBox="0 0 24 24" fill="grayText" focusable="false">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'starrted'">
        <svg class="" width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="currentColor">
            <path
                d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
            ></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'trash'">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="grayText" focusable="false" class=" ">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
            <path d="M9 8h2v9H9zm4 0h2v9h-2z" style=""></path>
        </svg>
    </div>
    <div v-else-if="props.iconStr === 'storage'">
        <svg class="a-s-fa-Ha-pa a-ml-da-Q-c" width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="#6f6f6f">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
                d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"
            ></path>
        </svg>
    </div>
</template>

<script setup lang="ts">
interface props {
    iconStr: string;
}
const props = defineProps<props>();
</script>
<style scoped></style>
