import{s as K,K as X,L as Y,b as k,f as m,m as d,i as w,h as b,n as O,q as se,e as A,c as R,v as U,M as Z,w as le,x as ae,y as ne,N as ce,aa as re,t as B,a as F,d as M,g as S,j as ue,P as me,z as q,k as x}from"./scheduler.B7yQ8r1a.js";import{S as G,i as H,t as $,b as v,c as W,a as j,m as y,j as pe,d as z,g as oe,e as fe}from"./index.CgDp2n8m.js";import{t as V}from"./Link.svelte_svelte_type_style_lang.D1SKiWqL.js";import{f as _e}from"./index.BDTKfGqz.js";import{C as de}from"./0.BOvCwRuK.js";const $e=()=>({needRefresh:!1,updateServiceWorker:!1,offlineReady:!1});function he(n){let t,l;return{c(){t=X("svg"),l=X("path"),this.h()},l(e){t=Y(e,"svg",{xmlns:!0,width:!0,height:!0,viewBox:!0});var s=k(t);l=Y(s,"path",{fill:!0,d:!0}),k(l).forEach(m),s.forEach(m),this.h()},h(){d(l,"fill","currentColor"),d(l,"d","M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4l4-4v8zm0-12V0l4 4l-4 4z"),d(t,"xmlns","http://www.w3.org/2000/svg"),d(t,"width","1em"),d(t,"height","1em"),d(t,"viewBox","0 0 20 20")},m(e,s){w(e,t,s),b(t,l)},p:O,i:O,o:O,d(e){e&&m(t)}}}class ve extends G{constructor(t){super(),H(this,t,null,he,K,{})}}function ge(n){let t,l,e,s;const a=n[3].default,f=se(a,n,n[2],null);return{c(){t=A("div"),f&&f.c(),this.h()},l(r){t=R(r,"DIV",{role:!0,class:!0,tabindex:!0});var i=k(t);f&&f.l(i),i.forEach(m),this.h()},h(){d(t,"role","button"),d(t,"class","btn svelte-1btitu1"),d(t,"tabindex","0"),U(t,"primary",!n[0]),U(t,"flat",n[0])},m(r,i){w(r,t,i),f&&f.m(t,null),l=!0,e||(s=[Z(t,"click",n[1]),Z(t,"keyup",n[1])],e=!0)},p(r,[i]){f&&f.p&&(!l||i&4)&&le(f,a,r,r[2],l?ne(a,r[2],i,null):ae(r[2]),null),(!l||i&1)&&U(t,"primary",!r[0]),(!l||i&1)&&U(t,"flat",r[0])},i(r){l||($(f,r),l=!0)},o(r){v(f,r),l=!1},d(r){r&&m(t),f&&f.d(r),e=!1,ce(s)}}}function be(n,t,l){let{$$slots:e={},$$scope:s}=t,{flat:a=!1}=t;const f=re();function r(){f("click")}return n.$$set=i=>{"flat"in i&&l(0,a=i.flat),"$$scope"in i&&l(2,s=i.$$scope)},[a,r,s,e]}class ie extends G{constructor(t){super(),H(this,t,be,ge,K,{flat:0})}}function we(n){var f,r,i;let t=(((i=(r=(f=V)==null?void 0:f.i18n)==null?void 0:r.pwa)==null?void 0:i.close)||Ae)+"",l,e,s,a;return s=new de({}),{c(){l=B(t),e=F(),W(s.$$.fragment)},l(o){l=M(o,t),e=S(o),j(s.$$.fragment,o)},m(o,u){w(o,l,u),w(o,e,u),y(s,o,u),a=!0},p:O,i(o){a||($(s.$$.fragment,o),a=!0)},o(o){v(s.$$.fragment,o),a=!1},d(o){o&&(m(l),m(e)),z(s,o)}}}function ke(n){var L,T,N;let t,l,e=(((N=(T=(L=V)==null?void 0:L.i18n)==null?void 0:T.pwa)==null?void 0:N.tip)||Ee)+"",s,a,f,r,i,o,u,D,h,C,g;const E=n[2].default,p=se(E,n,n[3],null);return h=new ie({props:{flat:!0,$$slots:{default:[we]},$$scope:{ctx:n}}}),h.$on("click",n[1]),{c(){t=A("div"),l=A("div"),s=B(e),a=F(),f=A("div"),r=A("span"),i=B(n[0]),o=F(),u=A("div"),p&&p.c(),D=F(),W(h.$$.fragment),this.h()},l(c){t=R(c,"DIV",{class:!0,role:!0});var _=k(t);l=R(_,"DIV",{class:!0});var I=k(l);s=M(I,e),I.forEach(m),a=S(_),f=R(_,"DIV",{class:!0});var J=k(f);r=R(J,"SPAN",{});var Q=k(r);i=M(Q,n[0]),Q.forEach(m),J.forEach(m),o=S(_),u=R(_,"DIV",{class:!0});var P=k(u);p&&p.l(P),D=S(P),j(h.$$.fragment,P),P.forEach(m),_.forEach(m),this.h()},h(){d(l,"class","pwa-title svelte-s3dj2x"),d(f,"class","message svelte-s3dj2x"),d(u,"class","actions svelte-s3dj2x"),d(t,"class","pwa-toast svelte-s3dj2x"),d(t,"role","alert")},m(c,_){w(c,t,_),b(t,l),b(l,s),b(t,a),b(t,f),b(f,r),b(r,i),b(t,o),b(t,u),p&&p.m(u,null),b(u,D),y(h,u,null),g=!0},p(c,[_]){(!g||_&1)&&ue(i,c[0]),p&&p.p&&(!g||_&8)&&le(p,E,c,c[3],g?ne(E,c[3],_,null):ae(c[3]),null);const I={};_&8&&(I.$$scope={dirty:_,ctx:c}),h.$set(I)},i(c){g||($(p,c),$(h.$$.fragment,c),c&&(C||me(()=>{C=pe(t,_e,{}),C.start()})),g=!0)},o(c){v(p,c),v(h.$$.fragment,c),g=!1},d(c){c&&m(t),p&&p.d(c),z(h)}}}const Ee="Tip",Ae="Close";function Re(n,t,l){let{$$slots:e={},$$scope:s}=t,{message:a}=t;const f=re();function r(){f("close")}return n.$$set=i=>{"message"in i&&l(0,a=i.message),"$$scope"in i&&l(3,s=i.$$scope)},[a,r,e,s]}class De extends G{constructor(t){super(),H(this,t,Re,ke,K,{message:0})}}function ee(n){let t,l;return t=new De({props:{message:n[1],$$slots:{default:[Le]},$$scope:{ctx:n}}}),t.$on("close",n[6]),{c(){W(t.$$.fragment)},l(e){j(t.$$.fragment,e)},m(e,s){y(t,e,s),l=!0},p(e,s){const a={};s&2&&(a.message=e[1]),s&2049&&(a.$$scope={dirty:s,ctx:e}),t.$set(a)},i(e){l||($(t.$$.fragment,e),l=!0)},o(e){v(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function te(n){let t,l;return t=new ie({props:{$$slots:{default:[Ce]},$$scope:{ctx:n}}}),t.$on("click",n[8]),{c(){W(t.$$.fragment)},l(e){j(t.$$.fragment,e)},m(e,s){y(t,e,s),l=!0},p(e,s){const a={};s&2048&&(a.$$scope={dirty:s,ctx:e}),t.$set(a)},i(e){l||($(t.$$.fragment,e),l=!0)},o(e){v(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function Ce(n){var f,r,i;let t=(((i=(r=(f=V)==null?void 0:f.i18n)==null?void 0:r.pwa)==null?void 0:i.reload)||Oe)+"",l,e,s,a;return s=new ve({}),{c(){l=B(t),e=F(),W(s.$$.fragment)},l(o){l=M(o,t),e=S(o),j(s.$$.fragment,o)},m(o,u){w(o,l,u),w(o,e,u),y(s,o,u),a=!0},p:O,i(o){a||($(s.$$.fragment,o),a=!0)},o(o){v(s.$$.fragment,o),a=!1},d(o){o&&(m(l),m(e)),z(s,o)}}}function Le(n){let t,l,e=n[0]&&te(n);return{c(){e&&e.c(),t=q()},l(s){e&&e.l(s),t=q()},m(s,a){e&&e.m(s,a),w(s,t,a),l=!0},p(s,a){s[0]?e?(e.p(s,a),a&1&&$(e,1)):(e=te(s),e.c(),$(e,1),e.m(t.parentNode,t)):e&&(oe(),v(e,1,1,()=>{e=null}),fe())},i(s){l||($(e),l=!0)},o(s){v(e),l=!1},d(s){s&&m(t),e&&e.d(s)}}}function Te(n){let t,l,e=n[2]&&ee(n);return{c(){e&&e.c(),t=q()},l(s){e&&e.l(s),t=q()},m(s,a){e&&e.m(s,a),w(s,t,a),l=!0},p(s,[a]){s[2]?e?(e.p(s,a),a&4&&$(e,1)):(e=ee(s),e.c(),$(e,1),e.m(t.parentNode,t)):e&&(oe(),v(e,1,1,()=>{e=null}),fe())},i(s){l||($(e),l=!0)},o(s){v(e),l=!1},d(s){s&&m(t),e&&e.d(s)}}}const Ne="App ready to work offline",Ie="New content available, click on reload button to update",Oe="Reload";function Fe(n,t,l){var g,E,p,L,T,N;let e,s,a,f;const{needRefresh:r,updateServiceWorker:i,offlineReady:o}=$e();x(n,r,c=>l(0,f=c)),x(n,o,c=>l(7,a=c));function u(){o.set(!1),r.set(!1)}const D=((p=(E=(g=V)==null?void 0:g.i18n)==null?void 0:E.pwa)==null?void 0:p.appReadyToWorkOffline)||Ne,h=((N=(T=(L=V)==null?void 0:L.i18n)==null?void 0:T.pwa)==null?void 0:N.newContentAvailable)||Ie,C=()=>i(!0);return n.$$.update=()=>{n.$$.dirty&129&&l(2,e=a||f),n.$$.dirty&128&&l(1,s=a?D:h)},[f,s,e,r,i,o,u,a,C]}class ze extends G{constructor(t){super(),H(this,t,Fe,Te,K,{})}}export{ze as default};
