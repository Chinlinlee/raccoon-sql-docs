import{s as oe,f as s,a as c,g as o,h as f,d as r,c as m,X as B,j as se,i as x,r as a,u as ce}from"../chunks/scheduler.1a0b7d29.js";import{S as me,i as pe,b as M,d as k,m as T,a as H,t as E,e as I}from"../chunks/index.9c173392.js";import{P as fe}from"../chunks/CopyCode.svelte_svelte_type_style_lang.f434e07d.js";import"../chunks/Link.svelte_svelte_type_style_lang.09afadaa.js";import{L as P}from"../chunks/Link.e4d4a403.js";function $e(z){let l,p,n,$='<a href="#相依專案" class="svp-title-anchor" aria-label="相依專案"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>相依專案',d,h,ee="以下是 Raccoon 所使用/參考的主要相依專案，沒有這些專案，就不會有 Raccoon",K,i,D,u,G,g,v,J,q,te="<li>因 node-java-bridge 直接使用 dcm4che 的 dcm2jpg 工具會造成效能問題，所以用 java 把 class 包進 function 裡，並透過 node-java-bridge 呼叫</li>",N,_,w,O,y,le="<li>此專案是使用 dcm4che 的 dcmqrscp 工具撰寫而成</li> <li>後續希望能夠改成用 node-java-bridge 來重構</li>",Q,C,L,W,U,ne="<li>此專案是使用 napi 混和 C++ DCMTK 的 dcm2json 撰寫而成</li> <li>後續也許能改成使用 java 或 node-java-bridge 撰寫</li>",Y,R,b,Z,S,j,V;return u=new P({props:{to:"https://github.com/dcm4che/dcm4che",label:"dcm4che"}}),v=new P({props:{to:"https://github.com/Chinlinlee/java-dcm2jpg/tree/main",label:"Chinlinlee / java-dcm2jpg"}}),w=new P({props:{to:"https://github.com/Chinlinlee/dcm4che-tool-dcmqrscp-raccoon-dicom",label:"Chinlinlee / dcm4che-tool-dcmqrscp-raccoon-dicom"}}),L=new P({props:{to:"https://github.com/Chinlinlee/dicom-to-json",label:"Chinlinlee / dicom-to-json"}}),b=new P({props:{to:"https://www.npmjs.com/package/dicom-parser",label:"dicom-parser"}}),j=new P({props:{to:"https://www.npmjs.com/package/java-bridge",label:"java-bridge"}}),{c(){l=s("div"),p=c(),n=s("h1"),n.innerHTML=$,d=c(),h=s("p"),h.textContent=ee,K=c(),i=s("ul"),D=s("li"),M(u.$$.fragment),G=c(),g=s("li"),M(v.$$.fragment),J=c(),q=s("ul"),q.innerHTML=te,N=c(),_=s("li"),M(w.$$.fragment),O=c(),y=s("ul"),y.innerHTML=le,Q=c(),C=s("li"),M(L.$$.fragment),W=c(),U=s("ul"),U.innerHTML=ne,Y=c(),R=s("li"),M(b.$$.fragment),Z=c(),S=s("li"),M(j.$$.fragment),this.h()},l(e){l=o(e,"DIV",{id:!0,class:!0}),f(l).forEach(r),p=m(e),n=o(e,"H1",{"data-svelte-h":!0}),B(n)!=="svelte-1e6ilht"&&(n.innerHTML=$),d=m(e),h=o(e,"P",{"data-svelte-h":!0}),B(h)!=="svelte-1u7qcc5"&&(h.textContent=ee),K=m(e),i=o(e,"UL",{});var t=f(i);D=o(t,"LI",{});var ae=f(D);k(u.$$.fragment,ae),ae.forEach(r),G=m(t),g=o(t,"LI",{});var X=f(g);k(v.$$.fragment,X),J=m(X),q=o(X,"UL",{"data-svelte-h":!0}),B(q)!=="svelte-acsqww"&&(q.innerHTML=te),X.forEach(r),N=m(t),_=o(t,"LI",{});var A=f(_);k(w.$$.fragment,A),O=m(A),y=o(A,"UL",{"data-svelte-h":!0}),B(y)!=="svelte-137pb14"&&(y.innerHTML=le),A.forEach(r),Q=m(t),C=o(t,"LI",{});var F=f(C);k(L.$$.fragment,F),W=m(F),U=o(F,"UL",{"data-svelte-h":!0}),B(U)!=="svelte-10sku03"&&(U.innerHTML=ne),F.forEach(r),Y=m(t),R=o(t,"LI",{});var ie=f(R);k(b.$$.fragment,ie),ie.forEach(r),Z=m(t),S=o(t,"LI",{});var re=f(S);k(j.$$.fragment,re),re.forEach(r),t.forEach(r),this.h()},h(){se(l,"id","相依專案"),se(l,"class","svp-anchor-item")},m(e,t){x(e,l,t),x(e,p,t),x(e,n,t),x(e,d,t),x(e,h,t),x(e,K,t),x(e,i,t),a(i,D),T(u,D,null),a(i,G),a(i,g),T(v,g,null),a(g,J),a(g,q),a(i,N),a(i,_),T(w,_,null),a(_,O),a(_,y),a(i,Q),a(i,C),T(L,C,null),a(C,W),a(C,U),a(i,Y),a(i,R),T(b,R,null),a(i,Z),a(i,S),T(j,S,null),V=!0},p:ce,i(e){V||(H(u.$$.fragment,e),H(v.$$.fragment,e),H(w.$$.fragment,e),H(L.$$.fragment,e),H(b.$$.fragment,e),H(j.$$.fragment,e),V=!0)},o(e){E(u.$$.fragment,e),E(v.$$.fragment,e),E(w.$$.fragment,e),E(L.$$.fragment,e),E(b.$$.fragment,e),E(j.$$.fragment,e),V=!1},d(e){e&&(r(l),r(p),r(n),r(d),r(h),r(K),r(i)),I(u),I(v),I(w),I(L),I(b),I(j)}}}function de(z){let l,p;return l=new fe({props:{fm:z[0],$$slots:{default:[$e]},$$scope:{ctx:z}}}),{c(){M(l.$$.fragment)},l(n){k(l.$$.fragment,n)},m(n,$){T(l,n,$),p=!0},p(n,[$]){const d={};$&2&&(d.$$scope={dirty:$,ctx:n}),l.$set(d)},i(n){p||(H(l.$$.fragment,n),p=!0)},o(n){E(l.$$.fragment,n),p=!1},d(n){I(l,n)}}}function he(z){return[{pageType:"md",lastUpdate:"2023/08/16 21:26:15",anchors:[{slugId:"相依專案",title:"相依專案",depth:1}]}]}class Ce extends me{constructor(l){super(),pe(this,l,he,de,oe,{})}}export{Ce as component};
