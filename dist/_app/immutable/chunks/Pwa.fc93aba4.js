import{_ as b}from"./preload-helper.a4192956.js";import{s as D,e as m,a as O,O as A,d as _,c as I,r as L,i as p,T as N,o as R,q as $,K as q,L as H,f as S,g as V,j as g,u as j}from"./scheduler.1a0b7d29.js";import{S as C,i as K,a as u,g as T,t as d,c as P,b as y,d as z,m as v,e as E}from"./index.9c173392.js";import{w as B,t as h}from"./Link.svelte_svelte_type_style_lang.09afadaa.js";function F(l){let e,t;return{c(){e=new q(!1),t=m(),this.h()},l(a){e=H(a,!1),t=m(),this.h()},h(){e.a=t},m(a,i){e.m(l[1],a,i),p(a,t,i)},p(a,i){i&2&&e.p(a[1])},d(a){a&&(_(t),e.d())}}}function G(l){let e;return{c(){e=S("meta"),this.h()},l(t){e=V(t,"META",{rel:!0,href:!0}),this.h()},h(){g(e,"rel","manifest"),g(e,"href",h.pwa.darkManifest)},m(t,a){p(t,e,a)},p:j,d(t){t&&_(e)}}}function M(l){let e,t,a;var i=l[0];function c(n,s){return{}}return i&&(e=$(i,c())),{c(){e&&y(e.$$.fragment),t=m()},l(n){e&&z(e.$$.fragment,n),t=m()},m(n,s){e&&v(e,n,s),p(n,t,s),a=!0},p(n,s){if(s&1&&i!==(i=n[0])){if(e){T();const r=e;d(r.$$.fragment,1,0,()=>{E(r,1)}),P()}i?(e=$(i,c()),y(e.$$.fragment),u(e.$$.fragment,1),v(e,t.parentNode,t)):e=null}},i(n){a||(e&&u(e.$$.fragment,n),a=!0)},o(n){e&&d(e.$$.fragment,n),a=!1},d(n){n&&_(t),e&&E(e,n)}}}function J(l){let e,t,a,i;function c(o,f){var k,w;return(w=(k=h)==null?void 0:k.pwa)!=null&&w.darkManifest&&o[2]?G:F}let n=c(l),s=n(l),r=l[0]&&M(l);return{c(){s.c(),e=m(),t=O(),r&&r.c(),a=m()},l(o){const f=A("svelte-15asdu4",document.head);s.l(f),e=m(),f.forEach(_),t=I(o),r&&r.l(o),a=m()},m(o,f){s.m(document.head,null),L(document.head,e),p(o,t,f),r&&r.m(o,f),p(o,a,f),i=!0},p(o,[f]){n===(n=c(o))&&s?s.p(o,f):(s.d(1),s=n(o),s&&(s.c(),s.m(e.parentNode,e))),o[0]?r?(r.p(o,f),f&1&&u(r,1)):(r=M(o),r.c(),u(r,1),r.m(a.parentNode,a)):r&&(T(),d(r,1,1,()=>{r=null}),P())},i(o){i||(u(r),i=!0)},o(o){d(r),i=!1},d(o){o&&(_(t),_(a)),s.d(o),_(e),r&&r.d(o)}}}function Q(l,e,t){let a;N(l,B,n=>t(2,a=n));let i,c;return R(async()=>{if(h.pwa){const{pwaInfo:n}=await b(()=>import("./virtual_pwa-info.1b631e04.js"),[],import.meta.url);t(1,c=n?n.webManifest.linkTag:""),n&&t(0,i=(await b(()=>import("./ReloadPrompt.19b13311.js"),["./ReloadPrompt.19b13311.js","./scheduler.1a0b7d29.js","./index.9c173392.js","./Link.svelte_svelte_type_style_lang.09afadaa.js","./singletons.0058ccfa.js","..\\assets\\Link.0d396f12.css","./index.084d8f85.js","./0.ce414110.js","./preload-helper.a4192956.js","./stores.f92c811e.js","./Link.e4d4a403.js","..\\assets\\0.f13e4a5e.css","..\\assets\\ReloadPrompt.6625b86a.css"],import.meta.url)).default)}}),[i,c,a]}class Z extends C{constructor(e){super(),K(this,e,Q,J,D,{})}}export{Z as default};
