import { linStore } from '../stores/lin';
import axios from 'axios';
import router from '@/router';
import * as requireType from './requireTypes.mjs';
import type { drive_v3 } from '@googleapis/drive/v3';
const baseURL = 'https://www.googleapis.com/drive/v3';
const pinia = linStore();
const clientByPinia = pinia.googleClientData;

function return404Page(): void {
    router.push({ name: '404Page' });
}
export default class GoogleAPI {
    async getAccountTokenByAPI(params: google.accounts.oauth2.CodeResponse['code']): Promise<google.accounts.oauth2.TokenResponse> {
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
        return res.data;
    }

    async getDriveRootListByAPI() {
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
    }

    async getFolderItemByAPI(folderId: drive_v3.Params$Resource$Files$Get): Promise<drive_v3.Schema$FileList['files']> {
        const res = await axios({
            method: 'get',
            baseURL: baseURL,
            url: `/files?key=${clientByPinia.apiKey}`,
            headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
            params: { q: `'${folderId}' in parents and trashed=false`, fields: '*' },
        });
        return res?.data?.files;
    }

    async searchFileByAPI(inputValue: drive_v3.Schema$Drive['name']): Promise<drive_v3.Schema$FileList['files']> {
        const res = await axios({
            method: 'get',
            baseURL: baseURL,
            url: `/files?key=${clientByPinia.apiKey}`,
            headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
            params: { q: `name contains '${inputValue}' and trashed=false`, fields: '*' },
        });
        return res?.data?.files;
    }

    async createFolderByAPI(params: requireType.createFolderParamsType): Promise<void | object> {
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
    }

    async toUploadFileByAPI(fileMetadata: Object, data: Uint8Array): Promise<void | object> {
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
        form.append('file', new Blob([new Uint8Array(data)]));
        const res = await axios({
            onUploadProgress: (progressEvent) => {
                const percent = progressEvent.loaded / progressEvent.total;
                pinia.uploadProgress(Math.round(percent * 100));
            },
            method: 'post',
            url: `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`,
            data: form,
            headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
        });
        return res;
    }

    async toTrashFileByAPI(params: string): Promise<void | object> {
        const res = await axios({
            method: 'post',
            baseURL: `https://www.googleapis.com/drive/v2/files/${params}/trash`,
            url: `?key=${clientByPinia.apiKey}`,
            headers: { authorization: `Bearer ${pinia.tokenData.access_token}` },
        });
        return res;
    }

    async toUpdateFileByAPI(params: requireType.toUpdateFileParamsType): Promise<void | object> {
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
    }
}
