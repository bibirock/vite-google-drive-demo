# Google Drive Demo

![Demo-gif](public/google-drive-demo.gif)

## 串接 Google Drive API 來模擬雲端硬碟的功能

- 檔案夾瀏覽功能，使用動態路由來傳遞參數
- 收尋檔案功能，透過即時輸入來查詢資料，與資料結果呈現頁面
- 可上傳檔案與新增資料夾，並具有視覺化提醒
- 檔案改名、移至垃圾桶、分享檔案連結，一切皆與雲端硬碟連動
- 可下載為桌面版的 PWA APP，隨時可以進行雲端硬碟的操作
- Service Workers PWA 漸進式網站，可以透過右上網址列的安裝應用程式安裝到本機![Random-user](public/install-app.png)

## 個人專案作品採用技術如下

- PWA 漸進式網站
- 前端框架： Vite + Vue3 + Pinia
- 串接第三方 API: Google Drive API
- 主要使用語言： TypeScript + Javascript
- CSS 預處理器： Tailwind CSS + SASS
- UI library： ant-design-vue
- HTML 模板: PUG
- GitHub 部署：gh-pages
- 多語系系統： i18n
- plugins : mitt、axios、iconify

## 遇到的困難及解法

- 使用google drive api 要進行第三方驗證，需使用`google.accounts.oauth2.initCodeClient`，使用者登入之後，獲得`CodeResponse`之後再向 google 請求 api 所需訪問的`access_token`，才能對使用者的雲端硬碟檔案進行操作。

- GitPage SPA 部署問題，因為 GitPage 為靜態資源伺服器，需使用 `hash mode` 不進行頁面重整才不會導至頁面出現 404 not Found 的錯誤，或是在設置一個`404.html`，捕捉錯誤之後導向，並將原先`index.html`頁面內容掛載，即可避免錯誤。

- 在未導入**TypeScrip**時，utils方法是透過`provide()`、`inject()`進行注入，在導入**TypeScrip**時，發現其類型推導較為繁瑣，後續使用Pinia進行改寫全域方法的使用，以獲得良好的類型推導體驗。

- 所有的**Icon**原本為分別撰寫於template中，造成不好集中管理的問題，後續改寫成組件，並且在引用時傳入props，來決定該渲染那個**Icon**，這裡使用了`v-if`而不是`v-show`的原因是因爲`v-if`只會載入需要的元素，而`v-show`會載入全部元素，並透過`display: none;`來進行渲染切換，在不需要頻繁切換顯示元素的情況下，使用`v-if`，較為適合。

- 加入PWA功能帶來的dev環境錯誤，在資料更新撰寫後，不會獲取新的資源，而是使用緩存，造成API呼叫錯誤，改善此方法的做法是將`handler: 'NetworkFirst'`，讓資源可以優先使用網路更新，並且在 dev 模式下使用**https**server，才能使**Service Worker**正常運作。
