//如果想在非setup函式中使用router，不能使用useRouter 要使用單獨引入的方式
import router from '../router';
import bus from '../bus';

export const globalFunction = {
    openFileView: (viewLink: string) => {
        window.open(viewLink, '_blank');
    },

    goToFolder: (folderId: string) => {
        router.push({ name: 'my-drive-folders', params: { folderId: folderId } });
    },

    sendFileDatil: (mataData: string) => {
        bus.$emit('send-file-data', mataData);
    },

    copyLink: (link: string) => {
        return navigator.clipboard.writeText(link);
    },
};

export const TYPE = {
    IMG: 'image/nef',
    WORD: 'application/msword',
    PDF: 'application/pdf',
    GOOGLE_DOCS: 'application/vnd.google-apps.document',
    GOOGLE_FOLDER: 'application/vnd.google-apps.folder',
    GOOGLE_SHEETS: 'application/vnd.google-apps.spreadsheet',
};
