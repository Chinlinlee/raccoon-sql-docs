import{s as a1,e as s,a as h,t as e1,c as i,b as E,f as n,g as u,l as H,d as l1,m as z,i as r,h as c,n as n1}from"../chunks/scheduler.B7yQ8r1a.js";import{S as s1,i as i1,c as j,a as q,m as P,t as V,b as N,d as U}from"../chunks/index.CgDp2n8m.js";import{P as r1}from"../chunks/CopyCode.svelte_svelte_type_style_lang.DpbyWf-X.js";import"../chunks/Link.svelte_svelte_type_style_lang.B2SJBfYY.js";import{L as J}from"../chunks/Link.swrOpj1R.js";function c1(w){let e,m,l,d='<a href="#DIMSE-服務" class="svp-title-anchor" aria-label="DIMSE 服務"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>DIMSE 服務',$,o,_,K=`DICOM 的 DIMSE 服務非常廣泛，Raccoon 主要實作的是 DIMSE-C 的功能，以下是 Raccoon 目前支援的 DIMSE-C 功能
<ul><li>C-ECHO: 驗證兩端的端到端通訊是否成功，通常用於確定 Server 是否可呼叫</li> <li>C-STORE: 儲存功能，用於將 DICOM 檔上傳到 PACS Server</li> <li>C-FIND: 查詢功能</li> <li>C-MOVE: 調閱功能，用於將 DICOM 下載到 Client，比較需要注意的是，C-MOVE 的下載方式為，開啟多個 C-STORE 的子程序讓 Server 透過 C-STORE 把影像上傳過來</li></ul>`,A,p,B,v,F,S,Q="但目前已經將 DIMSE 主要功能移植到 Raccoon 內部",G,D,X="DIMSE 的相關實作可以至 <code>dimse</code> 資料夾中查看",O,C,b,M,Y='<a href="#參考資料" class="svp-title-anchor" aria-label="參考資料"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>參考資料',R,f,L,I,W,x,g,k;return v=new J({props:{to:"https://github.com/Chinlinlee/dcm4che-tool-dcmqrscp-raccoon-dicom",label:"Chinlinlee / dcm4che-tool-dcmqrscp-raccoon-dicom"}}),I=new J({props:{to:"https://www.jianshu.com/p/2812b0b6e548",label:"Dicom 学习笔记-Dicom 消息服务（DIMSE-C/DIMSE-N"}}),g=new J({props:{to:"https://zhuanlan.zhihu.com/p/386657486",label:"DICOM通讯（ACSE-＞DIMSE-＞Worklist）"}}),{c(){e=s("div"),m=h(),l=s("h1"),l.innerHTML=d,$=h(),o=s("ul"),_=s("li"),_.innerHTML=K,A=h(),p=s("li"),B=e1("Raccoon 的 DIMSE 原先由另一個專案 "),j(v.$$.fragment),F=e1(" 利用 java 主導開發，"),S=s("strong"),S.textContent=Q,G=h(),D=s("li"),D.innerHTML=X,O=h(),C=s("div"),b=h(),M=s("h2"),M.innerHTML=Y,R=h(),f=s("ul"),L=s("li"),j(I.$$.fragment),W=h(),x=s("li"),j(g.$$.fragment),this.h()},l(t){e=i(t,"DIV",{id:!0,class:!0}),E(e).forEach(n),m=u(t),l=i(t,"H1",{"data-svelte-h":!0}),H(l)!=="svelte-1f0uv2t"&&(l.innerHTML=d),$=u(t),o=i(t,"UL",{});var a=E(o);_=i(a,"LI",{"data-svelte-h":!0}),H(_)!=="svelte-n54d20"&&(_.innerHTML=K),A=u(a),p=i(a,"LI",{});var T=E(p);B=l1(T,"Raccoon 的 DIMSE 原先由另一個專案 "),q(v.$$.fragment,T),F=l1(T," 利用 java 主導開發，"),S=i(T,"STRONG",{"data-svelte-h":!0}),H(S)!=="svelte-1eup3h9"&&(S.textContent=Q),T.forEach(n),G=u(a),D=i(a,"LI",{"data-svelte-h":!0}),H(D)!=="svelte-1wjl8f3"&&(D.innerHTML=X),a.forEach(n),O=u(t),C=i(t,"DIV",{id:!0,class:!0}),E(C).forEach(n),b=u(t),M=i(t,"H2",{"data-svelte-h":!0}),H(M)!=="svelte-1q3902k"&&(M.innerHTML=Y),R=u(t),f=i(t,"UL",{});var y=E(f);L=i(y,"LI",{});var Z=E(L);q(I.$$.fragment,Z),Z.forEach(n),W=u(y),x=i(y,"LI",{});var t1=E(x);q(g.$$.fragment,t1),t1.forEach(n),y.forEach(n),this.h()},h(){z(e,"id","DIMSE-服務"),z(e,"class","svp-anchor-item"),z(C,"id","參考資料"),z(C,"class","svp-anchor-item")},m(t,a){r(t,e,a),r(t,m,a),r(t,l,a),r(t,$,a),r(t,o,a),c(o,_),c(o,A),c(o,p),c(p,B),P(v,p,null),c(p,F),c(p,S),c(o,G),c(o,D),r(t,O,a),r(t,C,a),r(t,b,a),r(t,M,a),r(t,R,a),r(t,f,a),c(f,L),P(I,L,null),c(f,W),c(f,x),P(g,x,null),k=!0},p:n1,i(t){k||(V(v.$$.fragment,t),V(I.$$.fragment,t),V(g.$$.fragment,t),k=!0)},o(t){N(v.$$.fragment,t),N(I.$$.fragment,t),N(g.$$.fragment,t),k=!1},d(t){t&&(n(e),n(m),n(l),n($),n(o),n(O),n(C),n(b),n(M),n(R),n(f)),U(v),U(I),U(g)}}}function o1(w){let e,m;return e=new r1({props:{fm:w[0],$$slots:{default:[c1]},$$scope:{ctx:w}}}),{c(){j(e.$$.fragment)},l(l){q(e.$$.fragment,l)},m(l,d){P(e,l,d),m=!0},p(l,[d]){const $={};d&2&&($.$$scope={dirty:d,ctx:l}),e.$set($)},i(l){m||(V(e.$$.fragment,l),m=!0)},o(l){N(e.$$.fragment,l),m=!1},d(l){U(e,l)}}}function m1(w){return[{pageType:"md",lastUpdate:"Invalid Date",anchors:[{slugId:"DIMSE-服務",title:"DIMSE 服務",depth:1},{slugId:"參考資料",title:"參考資料",depth:2}]}]}class $1 extends s1{constructor(e){super(),i1(this,e,m1,o1,a1,{})}}export{$1 as component};
