if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const o=s=>i(s,r),t={module:{uri:r},exports:u,require:o};e[r]=Promise.all(n.map((s=>t[s]||o(s)))).then((s=>(l(...s),u)))}}define(["./workbox-082d0e8a"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/404Page.f879b279.js",revision:null},{url:"assets/ContextMenuPage.69fdb926.js",revision:null},{url:"assets/ContextMenuPage.fde62de9.css",revision:null},{url:"assets/DriveHomePage.7dc18256.css",revision:null},{url:"assets/DriveHomePage.f86b9808.js",revision:null},{url:"assets/googleAPI.6671e212.js",revision:null},{url:"assets/index.7c43cec6.css",revision:null},{url:"assets/index.a620fda3.js",revision:null},{url:"assets/LoadingIcon.9573e66b.css",revision:null},{url:"assets/LoadingIcon.fdab0dfc.js",revision:null},{url:"assets/LoginPage.3f674278.js",revision:null},{url:"assets/LoginPage.d2ae91cb.css",revision:null},{url:"assets/MyDrive.2600f338.css",revision:null},{url:"assets/MyDrive.9b251782.js",revision:null},{url:"assets/PrivacyPolicyPage.ac948c50.js",revision:null},{url:"assets/PubServerPage.b1f9d5ae.js",revision:null},{url:"assets/SearchResult.766b3d07.css",revision:null},{url:"assets/SearchResult.c9ee97fe.js",revision:null},{url:"assets/vite-drive.c72a7c9b.js",revision:null},{url:"assets/workbox-window.prod.es5.d2780aeb.js",revision:null},{url:"index.html",revision:"d9e25f9967f663ea00b682ba881074af"},{url:"./vite-drive-145x145.png",revision:"7a0616148c050487f8f0f3d9f545e63e"},{url:"manifest.webmanifest",revision:"1d5c49b91ff0fb14a72901f7cdcb611c"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/(.*?)\.(js|css|ts)/,new s.CacheFirst({cacheName:"js-css-cache",plugins:[]}),"GET"),s.registerRoute(/(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,new s.CacheFirst({cacheName:"image-cache",plugins:[]}),"GET")}));
