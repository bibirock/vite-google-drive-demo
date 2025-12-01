/*
 * @Author: JoeChen
 * @Date: 2025-12-01 09:42:09
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-01 09:42:23
 * @Description:
 */
export default {
    googleClientData: {
        scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file',
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        clientSerect: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirecutURI: 'https://localhost:5173',
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY
    }
};
