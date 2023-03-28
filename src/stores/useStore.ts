import { defineStore } from 'pinia';
import apiKey from './apiKey';
import { TokenDataType } from './typs.mjs';
import { globalFunction, TYPE } from '@/globalMethods/global';
import { emitter } from '@/main';
import { i18n } from '@/locales/lang.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore：
const { t } = i18n.global;

export const globalMethod = defineStore('globalMethod', {
    state: () => ({
        $globalFunction: globalFunction,
        $TYPE: TYPE,
        $emitter: emitter,
        $t: t
    })
});

export const linStore = defineStore('linStore', {
    state: () => ({
        googleClientData: {
            scope: apiKey.googleClientData.scope,
            clientId: apiKey.googleClientData.clientId,
            clientSerect: apiKey.googleClientData.clientSerect,
            redirecutURI: apiKey.googleClientData.redirecutURI,
            apiKey: apiKey.googleClientData.apiKey
        },
        tokenData: <TokenDataType>{},
        onUploadProgress: <number>0
    }),
    getters: {
        getProgress(state): number {
            return state.onUploadProgress;
        }
    },
    actions: {
        changeTokenData(tokenObj: object) {
            this.tokenData = <TokenDataType>tokenObj;
        },

        uploadProgress(number: number) {
            this.onUploadProgress = number;
        }
    }
});
