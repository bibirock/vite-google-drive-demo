//如果想在非setup函式中使用router，不能使用useRouter 要使用單獨引入的方式
import type { drive_v3 } from '@googleapis/drive/v3';
import { emitter } from '@/main';
import router from '@/router';

export const utils = {
    openFileView: (viewLink: drive_v3.Schema$File['webViewLink']) => {
        window.open(viewLink as string, '_blank');
    },

    goToFolder: (folderId: drive_v3.Schema$File['id']) => {
        router.push({ name: 'my-drive-folders', params: { folderId: folderId } });
    },

    sendFileDetail: (metaData: drive_v3.Schema$File | undefined) => {
        emitter.emit('send-file-data', metaData);
    },

    copyLink: (link: drive_v3.Schema$File['webViewLink']) => {
        return navigator.clipboard.writeText(link as string);
    },

    setIcon: (url: string | null | undefined): string => {
        return url as string;
    }
};

export const TYPE = {
    IMG: 'image/nef',
    WORD: 'application/msword',
    PDF: 'application/pdf',
    GOOGLE_DOCS: 'application/vnd.google-apps.document',
    GOOGLE_FOLDER: 'application/vnd.google-apps.folder',
    GOOGLE_SHEETS: 'application/vnd.google-apps.spreadsheet'
};
