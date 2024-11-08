import{b as R,t as U,S as W,i as F}from"./index.CgDp2n8m.js";import{N as J,ab as O,s as T,r as D,K as y,L as k,b as w,f as b,m as a,ac as V,i as X,h as j,n as G,U as H,V as Z}from"./scheduler.B7yQ8r1a.js";import{w as g}from"./entry.Du9te5fI.js";function ue(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function $(e,t){R(e,1,1,()=>{t.delete(e.key)})}function de(e,t){e.f(),$(e,t)}function ce(e,t,s,r,l,i,o,d,n,E,_,f){let c=e.length,h=i.length,v=c;const x={};for(;v--;)x[e[v].key]=v;const S=[],A=new Map,M=new Map,z=[];for(v=h;v--;){const u=f(l,i,v),p=s(u);let m=o.get(p);m?z.push(()=>m.p(u,t)):(m=E(p,u),m.c()),A.set(p,S[v]=m),p in x&&M.set(p,Math.abs(v-x[p]))}const B=new Set,I=new Set;function N(u){U(u,1),u.m(d,_),o.set(u.key,u),_=u.first,h--}for(;c&&h;){const u=S[h-1],p=e[c-1],m=u.key,q=p.key;u===p?(_=u.first,c--,h--):A.has(q)?!o.has(m)||B.has(m)?N(u):I.has(q)?c--:M.get(m)>M.get(q)?(I.add(m),N(u)):(B.add(q),c--):(n(p,o),c--)}for(;c--;){const u=e[c];A.has(u.key)||n(u,o)}for(;h;)N(S[h-1]);return J(z),S}function ee(e,t){const s={},r={},l={$$scope:1};let i=e.length;for(;i--;){const o=e[i],d=t[i];if(d){for(const n in o)n in d||(r[n]=1);for(const n in d)l[n]||(s[n]=d[n],l[n]=1);e[i]=d}else for(const n in o)l[n]=1}for(const o in r)o in s||(s[o]=void 0);return s}function fe(e){return typeof e=="object"&&e!==null?e:{}}const L={navbar:[{title:"Guide",to:"/raccoon-sql-docs/v2-2-0/guide/developer/foundation/"},{title:"Version",items:[{title:"v2.4.x (current)",to:"https://chinlinlee.github.io/raccoon-sql-docs/current"},{title:"v2.3.0 (current)",to:"https://chinlinlee.github.io/raccoon-sql-docs/v2-3-0/"},{title:"v2.2.0",to:"https://chinlinlee.github.io/raccoon-sql-docs/v2-2-0/"}]}],sidebar:{"/raccoon-sql-docs/v2-2-0/guide/":[{title:"Getting Started",collapsible:!0,items:[{title:"Installation - Debian Linux",to:"/guide/getting-started/installation-debian/"}]},{title:"開發人員",collapsible:!0,items:[{title:"基礎觀念",to:"/guide/developer/foundation/"},{title:"影像處理相關",to:"/guide/developer/image-processing/"},{title:"node-java-bridge",to:"/guide/developer/node-java-bridge/"},{title:"Mongoose Schema",to:"/guide/developer/mongoose-schema/"},{title:"相依專案",to:"/guide/developer/deps-projects/"},{title:"Swagger API Docs",to:"/guide/developer/swagger/"},{title:"SQL",to:"/guide/developer/sql/"},{title:"DIMSE 服務",to:"/guide/developer/dimse/"},{title:"Logging System",to:"/guide/developer/logging-system/"},{title:"OAuth 串接",to:"/guide/developer/oauth/"}]}]},github:"https://github.com/Chinlinlee/raccoon-dicom",logo:"/raccoon-sql-docs/v2-2-0/raccoon.png",preBuildIconifyIcons:{"vscode-icons":["file-type-mongo","file-type-docker2","file-type-node","file-type-sequelize"]},highlighter:{languages:["svelte","sh","js","html","ts","md","css","scss","yaml","java","ini","dockerfile"]}};var C=function(e,t,s){if(s||arguments.length===2)for(var r=0,l=t.length,i;r<l;r++)(i||!(r in t))&&(i||(i=Array.prototype.slice.call(t,0,r)),i[r]=t[r]);return e.concat(i||Array.prototype.slice.call(t))},Y=g(!0),K=g(!0),he=g(!0),ge=g([]),te=g([]),se=g(0),ae=g(0),P=g("up"),ve=g(!1),pe=g(!0),me=g(!0),Q=g(Object.entries(L.sidebar||{}).reduce(function(e,t){var s=t[1];return C(C([],e,!0),s,!0)},[]));se.subscribe(function(e){var t=e-O(ae)>0?"down":"up";t!==O(P)&&P.set(t)});Q.subscribe(function(e){te.set(e.reduce(function(t,s){return Array.isArray(s.items)?C(C([],t,!0),s.items,!0):C(C([],t,!0),[s],!1)},[]))});Y.subscribe(function(e){e||K.set(!0)});K.subscribe(function(e){e||Y.set(!0)});function be(e){var t;if(e){var s=Object.keys(L.sidebar||{}).find(function(r){return e.startsWith(r)});s&&Q.set(((t=L.sidebar)===null||t===void 0?void 0:t[s])||[])}}const _e={title:"Raccoon",description:"mini-PACS for the healthcare"};function re(e){let t,s,r,l,i,o,d,n,E=[e[0],{width:"1em"},{height:"1em"},{viewBox:"0 0 24 24"}],_={};for(let f=0;f<E.length;f+=1)_=D(_,E[f]);return{c(){t=y("svg"),s=y("g"),r=y("path"),l=y("animate"),i=y("path"),o=y("animate"),d=y("path"),n=y("animate"),this.h()},l(f){t=k(f,"svg",{width:!0,height:!0,viewBox:!0});var c=w(t);s=k(c,"g",{fill:!0,stroke:!0,strokelinecap:!0,strokelinejoin:!0,strokewidth:!0});var h=w(s);r=k(h,"path",{strokedasharray:!0,strokedashoffset:!0,d:!0});var v=w(r);l=k(v,"animate",{fill:!0,attributeName:!0,dur:!0,values:!0}),w(l).forEach(b),v.forEach(b),i=k(h,"path",{strokedasharray:!0,strokedashoffset:!0,d:!0});var x=w(i);o=k(x,"animate",{fill:!0,attributeName:!0,begin:!0,dur:!0,values:!0}),w(o).forEach(b),x.forEach(b),d=k(h,"path",{strokedasharray:!0,strokedashoffset:!0,d:!0});var S=w(d);n=k(S,"animate",{fill:!0,attributeName:!0,begin:!0,dur:!0,values:!0}),w(n).forEach(b),S.forEach(b),h.forEach(b),c.forEach(b),this.h()},h(){a(l,"fill","freeze"),a(l,"attributeName","stroke-dashoffset"),a(l,"dur","0.6s"),a(l,"values","36;0"),a(r,"strokedasharray","36"),a(r,"strokedashoffset","36"),a(r,"d","M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12"),a(o,"fill","freeze"),a(o,"attributeName","stroke-dashoffset"),a(o,"begin","0.6s"),a(o,"dur","0.3s"),a(o,"values","12;0"),a(i,"strokedasharray","12"),a(i,"strokedashoffset","12"),a(i,"d","M13 11L20 4"),a(n,"fill","freeze"),a(n,"attributeName","stroke-dashoffset"),a(n,"begin","0.9s"),a(n,"dur","0.2s"),a(n,"values","8;0"),a(d,"strokedasharray","8"),a(d,"strokedashoffset","8"),a(d,"d","M21 3H15M21 3V9"),a(s,"fill","none"),a(s,"stroke","currentColor"),a(s,"strokelinecap","round"),a(s,"strokelinejoin","round"),a(s,"strokewidth","2"),V(t,_)},m(f,c){X(f,t,c),j(t,s),j(s,r),j(r,l),j(s,i),j(i,o),j(s,d),j(d,n)},p(f,[c]){V(t,_=ee(E,[c&1&&f[0],{width:"1em"},{height:"1em"},{viewBox:"0 0 24 24"}]))},i:G,o:G,d(f){f&&b(t)}}}function ie(e,t,s){const r=[];let l=H(t,r);return e.$$set=i=>{t=D(D({},t),Z(i)),s(0,l=H(t,r))},[l]}class ye extends W{constructor(t){super(),F(this,t,ie,re,T,{})}}export{ye as E,fe as a,me as b,pe as c,ge as d,ue as e,de as f,ee as g,K as h,ve as i,Y as j,P as k,ae as l,se as m,he as n,$ as o,te as p,be as q,Q as r,_e as s,L as t,ce as u};
