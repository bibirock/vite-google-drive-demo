import{_ as l}from"./vite-drive.eb5f7837.js";import{d as F,r as h,o as x,c,a,n as u,t as B,p as y,b as C,e as k,f as r,u as w,_ as A}from"./index.fdb2478c.js";import{l as b,G as D}from"./googleAPI.beb59a60.js";const I="/vite-google-drive-demo/assets/noSupport.50da7ab3.png",S=o=>(y("data-v-0e774305"),o=o(),C(),o),G={key:0},E=k('<article class="flex h-screen w-screen justify-center flex-col items-center" data-v-0e774305><img src="'+l+'" class="mb-[20px]" data-v-0e774305><p class="mx-auto px-[15px]" data-v-0e774305>\u60A8\u6240\u4F7F\u7528\u7684\u5167\u5D4C\u5F0F\u700F\u89BD\u5668\u4E26\u4E0D\u652F\u63F4Google OAuth\u767B\u5165\u653F\u7B56\uFF0C\u8ACB\u4F7F\u7528\u7DB2\u9801\u700F\u89BD\u5668\u958B\u555F\u6B64Demo Web</p><p data-v-0e774305>Google OAuth</p><img src="'+I+'" class="w-[95%]" data-v-0e774305><a href="https://developers.googleblog.com/2016/08/modernizing-oauth-interactions-in-native-apps.html?fbclid=IwAR2KDyMTyHkv1iik96VarrFpfjp8Y6T78J1_sYwV30FV_Uo0ITV0WZw2LYY" data-v-0e774305>\u8A73\u60C5\u8ACB\u898B</a></article>',1),P=[E],T={key:1},V={class:u("flex h-screen w-screen justify-center flex-col items-center")},L=S(()=>a("img",{src:l,class:u("mb-[20px]")},null,-1)),Y=F({__name:"LoginPage",setup(o){const{userAgent:t}=navigator,d=new D,s=b(),p=w(),i=h(!1);x(()=>{_()});function _(){t.includes("Firefox/")||t.includes("Edg/")||t.includes("Chrome/")||t.includes("Safari/")||(i.value=!0)}function g(){return google.accounts.oauth2.initCodeClient({client_id:s.googleClientData.clientId,scope:s.googleClientData.scope,ux_mode:"popup",redirect_uri:s.googleClientData.redirecutURI,callback:f})}function m(){g().requestCode()}async function f(n){const e=await d.getAccountTokenByAPI(n.code);s.changeTokenData(e),v(e)}function v(n){p.replace("drive"),window.sessionStorage.setItem("token",JSON.stringify(n))}return(n,e)=>i.value?(r(),c("div",G,P)):(r(),c("div",T,[a("article",V,[L,a("button",{class:u("border-2 border-slate-500 h-13 p-2 px-5 hover:text-sky-400 hover:border-sky-400 rounded-lg text-slate-500"),onClick:e[0]||(e[0]=j=>m())},B("\u767B\u5165Google\u4EE5\u4F7F\u7528\u96F2\u7AEF\u786C\u789F"))])]))}});const z=A(Y,[["__scopeId","data-v-0e774305"]]);export{z as default};