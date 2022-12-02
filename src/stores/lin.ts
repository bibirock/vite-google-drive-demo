import { defineStore } from 'pinia';
import apiKey from './apiKey';

export const linStore = defineStore('linStore', {
    state: () => ({
        googleClientData: {
            scope: apiKey.googleClientData.scope,
            clientId: apiKey.googleClientData.clientId,
            clientSerect: apiKey.googleClientData.clientSerect,
            redirecutURI: apiKey.googleClientData.redirecutURI,
            apiKey: apiKey.googleClientData.apiKey,
        },

        tokenData: {},

        onUploadProgress: 0,
    }),
    getters: {
        getProgress(state) {
            return state.onUploadProgress;
        },
    },
    actions: {
        changeTokenData(tokenObj: object) {
            this.tokenData = tokenObj;
        },

        uploadProgress(number: number) {
            this.onUploadProgress = number;
        },
    },
});
