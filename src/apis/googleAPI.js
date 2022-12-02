import { linStore } from '@/stores/lin';
import axios from 'axios';
import router from '@/router';
const baseURL = 'https://www.googleapis.com/drive/v3';
const pinia = linStore();
const clientByPinia = pinia.googleClientData;

function return404Page() {
    router.push({ name: '404Page' });
}
export default class GoogleAPI {
    async getAccountTokenByAPI(params) {
        try {
            const res = await axios({
                method: 'post',
                baseURL: 'https://www.googleapis.com/oauth2/v4/token',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    client_id: clientByPinia.clientId,
                    client_secret: clientByPinia.clientSerect,
                    scope: clientByPinia.scope,
                    grant_type: 'authorization_code',
                    redirect_uri: process.env.NODE_ENV === 'production' ? 'https://bibirock.github.io' : clientByPinia.redirecutURI,
                    code: params,
                },
            });
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async getDriveRootListByAPI() {
        try {
            const res = await axios({
                method: 'get',
                baseURL: baseURL,
                url: `/files?key=${clientByPinia.apiKey}`,
                headers: {
                    authorization: `Bearer ${pinia.tokenData.access_token}`,
                    'Content-Type': 'text/html',
                },
                params: { q: `'root' in parents and trashed=false`, fields: '*' },
            });
            return res?.data?.files;
        } catch (e) {
            console.log(e);
        }
    }

    async getFolderItemByAPI(folderId) {
        try {
            const res = await axios({
                method: 'get',
                baseURL: baseURL,
                url: `/files?key=${clientByPinia.apiKey}`,
                headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
                params: { q: `'${folderId}' in parents and trashed=false`, fields: '*' },
            });
            return res?.data?.files;
        } catch (e) {
            return404Page();
        }
    }

    async searchFileByAPI(inputValue) {
        try {
            const res = await axios({
                method: 'get',
                baseURL: baseURL,
                url: `/files?key=${clientByPinia.apiKey}`,
                headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
                params: { q: `name contains '${inputValue}' and trashed=false`, fields: '*' },
            });
            return res?.data?.files;
        } catch (e) {
            return404Page();
        }
    }

    async createFolderByAPI(params) {
        try {
            const res = await axios({
                method: 'post',
                baseURL: baseURL,
                url: `/files?uploadType=multipart`,
                data: {
                    mimeType: 'application/vnd.google-apps.folder',
                    name: params.name,
                    parents: params.parents !== '' ? [params.parents] : [],
                },
                headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
            });
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * 此方法先暫停使用
     * @param {*} params
     * @returns
     */
    async deleteFileByAPI(params) {
        try {
            const res = await axios({
                method: 'delete',
                baseURL: baseURL,
                url: `files/${params}?key=${clientByPinia.apiKey}`,
                headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
            });
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async toUploadFileByAPI(fileMetadata, data) {
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
        form.append('file', new Blob([new Uint8Array(data)]));
        try {
            const res = await axios({
                onUploadProgress: (progressEvent) => {
                    let percentComplete = progressEvent.loaded / progressEvent.total;
                    percentComplete = parseInt(percentComplete * 100);
                    pinia.uploadProgress(percentComplete);
                },
                method: 'post',
                url: `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`,
                data: form,
                headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
            });
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async toTrashFileByAPI(params) {
        try {
            const res = await axios({
                method: 'post',
                baseURL: `https://www.googleapis.com/drive/v2/files/${params}/trash`,
                url: `?key=${clientByPinia.apiKey}`,
                headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
            });
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async toUpdateFileByAPI(params) {
        try {
            const res = await axios({
                method: 'patch',
                baseURL: baseURL,
                url: `/files/${params.fileId}`,
                headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
                data: {
                    name: params.name,
                },
            });
            return res;
        } catch (e) {
            console.log(e);
        }
    }
}