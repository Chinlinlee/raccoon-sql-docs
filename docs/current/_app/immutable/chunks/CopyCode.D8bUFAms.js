import{s as k,K as d,L as m,b as p,f as u,m as l,i as _,h as w,n as f,z as x,I,e as E,c as L,M as C,N as S}from"./scheduler.B7yQ8r1a.js";import{S as y,i as $,g as V,b as v,e as Z,t as g,c as H,a as B,m as M,d as D}from"./index.CgDp2n8m.js";import"./CopyCode.svelte_svelte_type_style_lang.vs4QzTVp.js";function q(i){let e,t,r;return{c(){e=d("svg"),t=d("path"),r=d("path"),this.h()},l(n){e=m(n,"svg",{xmlns:!0,width:!0,height:!0,viewBox:!0});var a=p(e);t=m(a,"path",{fill:!0,d:!0}),p(t).forEach(u),r=m(a,"path",{fill:!0,d:!0}),p(r).forEach(u),a.forEach(u),this.h()},h(){l(t,"fill","currentColor"),l(t,"d","M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 0 1-1.75 1.75H8.774a1.75 1.75 0 0 1-1.75-1.75Zm1.75-.25a.25.25 0 0 0-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25Z"),l(r,"fill","currentColor"),l(r,"d","M1.995 10.749a1.75 1.75 0 0 1 1.75-1.751H5.25a.75.75 0 1 1 0 1.5H3.745a.25.25 0 0 0-.25.25L3.5 20.25c0 .138.111.25.25.25h9.5a.25.25 0 0 0 .25-.25v-1.51a.75.75 0 1 1 1.5 0v1.51A1.75 1.75 0 0 1 13.25 22h-9.5A1.75 1.75 0 0 1 2 20.25l-.005-9.501Z"),l(e,"xmlns","http://www.w3.org/2000/svg"),l(e,"width","1em"),l(e,"height","1em"),l(e,"viewBox","0 0 24 24")},m(n,a){_(n,e,a),w(e,t),w(e,r)},p:f,i:f,o:f,d(n){n&&u(e)}}}class z extends y{constructor(e){super(),$(this,e,null,q,k,{})}}function A(i){let e,t;return{c(){e=d("svg"),t=d("path"),this.h()},l(r){e=m(r,"svg",{xmlns:!0,width:!0,height:!0,viewBox:!0});var n=p(e);t=m(n,"path",{fill:!0,d:!0}),p(t).forEach(u),n.forEach(u),this.h()},h(){l(t,"fill","currentColor"),l(t,"d","M9 16.2L4.8 12l-1.4 1.4L9 19L21 7l-1.4-1.4L9 16.2z"),l(e,"xmlns","http://www.w3.org/2000/svg"),l(e,"width","1em"),l(e,"height","1em"),l(e,"viewBox","0 0 24 24")},m(r,n){_(r,e,n),w(e,t)},p:f,i:f,o:f,d(r){r&&u(e)}}}class N extends y{constructor(e){super(),$(this,e,null,A,k,{})}}function T(i){let e,t,r,n,a;return t=new z({}),{c(){e=E("div"),H(t.$$.fragment),this.h()},l(o){e=L(o,"DIV",{class:!0,role:!0,tabindex:!0,"aria-label":!0});var c=p(e);B(t.$$.fragment,c),c.forEach(u),this.h()},h(){l(e,"class","svp-code-bock--copy-code"),l(e,"role","button"),l(e,"tabindex","0"),l(e,"aria-label","Copy code")},m(o,c){_(o,e,c),M(t,e,null),i[3](e),r=!0,n||(a=[C(e,"click",i[2]),C(e,"keyup",i[2])],n=!0)},p:f,i(o){r||(g(t.$$.fragment,o),r=!0)},o(o){v(t.$$.fragment,o),r=!1},d(o){o&&u(e),D(t),i[3](null),n=!1,S(a)}}}function K(i){let e,t,r;return t=new N({}),{c(){e=E("div"),H(t.$$.fragment),this.h()},l(n){e=L(n,"DIV",{class:!0});var a=p(e);B(t.$$.fragment,a),a.forEach(u),this.h()},h(){l(e,"class","svp-code-bock--copy-code")},m(n,a){_(n,e,a),M(t,e,null),r=!0},p:f,i(n){r||(g(t.$$.fragment,n),r=!0)},o(n){v(t.$$.fragment,n),r=!1},d(n){n&&u(e),D(t)}}}function j(i){let e,t,r,n;const a=[K,T],o=[];function c(s,h){return s[1]?0:1}return e=c(i),t=o[e]=a[e](i),{c(){t.c(),r=x()},l(s){t.l(s),r=x()},m(s,h){o[e].m(s,h),_(s,r,h),n=!0},p(s,[h]){let b=e;e=c(s),e===b?o[e].p(s,h):(V(),v(o[b],1,1,()=>{o[b]=null}),Z(),t=o[e],t?t.p(s,h):(t=o[e]=a[e](s),t.c()),g(t,1),t.m(r.parentNode,r))},i(s){n||(g(t),n=!0)},o(s){v(t),n=!1},d(s){s&&u(r),o[e].d(s)}}}function F(i,e,t){let r,n=!1;function a(){var s,h;const c=((h=(s=r==null?void 0:r.parentElement)==null?void 0:s.querySelector(".shiki"))==null?void 0:h.textContent)||"";navigator.clipboard.writeText(c),t(1,n=!0),setTimeout(()=>{t(1,n=!1)},2e3)}function o(c){I[c?"unshift":"push"](()=>{r=c,t(0,r)})}return[r,n,a,o]}class P extends y{constructor(e){super(),$(this,e,F,j,k,{})}}export{P as C};
