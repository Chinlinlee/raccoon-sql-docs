import{b as K,t as Q,S as U,i as W}from"./index.CgDp2n8m.js";import{N as J,ab as B,s as T,r as D,K as _,L as k,b as w,f as b,m as i,ac as H,i as X,h as S,n as V,U as F,V as Z}from"./scheduler.B7yQ8r1a.js";import{w as g}from"./entry.CvP1R5ns.js";function ue(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function $(e,t){K(e,1,1,()=>{t.delete(e.key)})}function ce(e,t){e.f(),$(e,t)}function de(e,t,s,a,l,o,n,c,r,A,y,h){let d=e.length,f=o.length,p=d;const j={};for(;p--;)j[e[p].key]=p;const x=[],E=new Map,M=new Map,L=[];for(p=f;p--;){const u=h(l,o,p),v=s(u);let m=n.get(v);m?L.push(()=>m.p(u,t)):(m=A(v,u),m.c()),E.set(v,x[p]=m),v in j&&M.set(v,Math.abs(p-j[v]))}const O=new Set,z=new Set;function N(u){Q(u,1),u.m(c,y),n.set(u.key,u),y=u.first,f--}for(;d&&f;){const u=x[f-1],v=e[d-1],m=u.key,C=v.key;u===v?(y=u.first,d--,f--):E.has(C)?!n.has(m)||O.has(m)?N(u):z.has(C)?d--:M.get(m)>M.get(C)?(z.add(m),N(u)):(O.add(C),d--):(r(v,n),d--)}for(;d--;){const u=e[d];E.has(u.key)||r(u,n)}for(;f;)N(x[f-1]);return J(L),x}function ee(e,t){const s={},a={},l={$$scope:1};let o=e.length;for(;o--;){const n=e[o],c=t[o];if(c){for(const r in n)r in c||(a[r]=1);for(const r in c)l[r]||(s[r]=c[r],l[r]=1);e[o]=c}else for(const r in n)l[r]=1}for(const n in a)n in s||(s[n]=void 0);return s}function he(e){return typeof e=="object"&&e!==null?e:{}}const I={navbar:[{title:"Guide",to:"/raccoon-sql-docs/v2-4-x/guide/developer/foundation/"},{title:"Version",items:[{title:"v2.6.x (current)",to:"https://chinlinlee.github.io/raccoon-sql-docs/current/"},{title:"v2.4.x",to:"https://chinlinlee.github.io/raccoon-sql-docs/v2-4-x/"},{title:"v2.3.0 (current)",to:"https://chinlinlee.github.io/raccoon-sql-docs/v2-3-0/"},{title:"v2.2.0",to:"https://chinlinlee.github.io/raccoon-sql-docs/v2-2-0/"}]}],sidebar:{"/raccoon-sql-docs/v2-4-x/guide/":[{title:"Getting Started",collapsible:!0,items:[{title:"Installation - Debian Linux",to:"/guide/getting-started/installation-debian/"}]},{title:"開發人員",collapsible:!0,items:[{title:"基礎觀念",to:"/guide/developer/foundation/"},{title:"影像處理相關",to:"/guide/developer/image-processing/"},{title:"node-java-bridge",to:"/guide/developer/node-java-bridge/"},{title:"Mongoose Schema",to:"/guide/developer/mongoose-schema/"},{title:"相依專案",to:"/guide/developer/deps-projects/"},{title:"Swagger API Docs",to:"/guide/developer/swagger/"},{title:"SQL",to:"/guide/developer/sql/"},{title:"DIMSE 服務",to:"/guide/developer/dimse/"},{title:"Logging System",to:"/guide/developer/logging-system/"},{title:"OAuth 串接",to:"/guide/developer/oauth/"},{title:"mocha 測試報告",to:"https://chinlinlee.github.io/raccoon-sql-docs/current/mocha-report/mochawesome.html"}]},{title:"插件列表",collapsible:!0,items:[{title:"OAuth",to:"/guide/plugin-list/oauth/"},{title:"getStudyFhir - 獲取 Study 的 FHIR 資料",to:"/guide/plugin-list/get-study-fhir/"},{title:"statistics",to:"/guide/plugin-list/statistics"}]}]},github:"https://github.com/Chinlinlee/raccoon-dicom",logo:"/raccoon-sql-docs/v2-4-x/raccoon.png",preBuildIconifyIcons:{"vscode-icons":["file-type-mongo","file-type-docker2","file-type-node","file-type-sequelize"]},highlighter:{languages:["svelte","sh","js","html","ts","md","css","scss","yaml","java","ini","dockerfile"]}};var q=function(e,t,s){if(s||arguments.length===2)for(var a=0,l=t.length,o;a<l;a++)(o||!(a in t))&&(o||(o=Array.prototype.slice.call(t,0,a)),o[a]=t[a]);return e.concat(o||Array.prototype.slice.call(t))},P=g(!0),R=g(!0),fe=g(!0),ge=g([]),te=g([]),se=g(0),ie=g(0),G=g("up"),pe=g(!1),ve=g(!0),me=g(!0),Y=g(Object.entries(I.sidebar||{}).reduce(function(e,t){var s=t[1];return q(q([],e,!0),s,!0)},[]));se.subscribe(function(e){var t=e-B(ie)>0?"down":"up";t!==B(G)&&G.set(t)});Y.subscribe(function(e){te.set(e.reduce(function(t,s){return Array.isArray(s.items)?q(q([],t,!0),s.items,!0):q(q([],t,!0),[s],!1)},[]))});P.subscribe(function(e){e||R.set(!0)});R.subscribe(function(e){e||P.set(!0)});function be(e){var t;if(e){var s=Object.keys(I.sidebar||{}).find(function(a){return e.startsWith(a)});s&&Y.set(((t=I.sidebar)===null||t===void 0?void 0:t[s])||[])}}const ye={title:"Raccoon",description:"mini-PACS for the healthcare"};function ae(e){let t,s,a,l,o,n,c,r,A=[e[0],{width:"1em"},{height:"1em"},{viewBox:"0 0 24 24"}],y={};for(let h=0;h<A.length;h+=1)y=D(y,A[h]);return{c(){t=_("svg"),s=_("g"),a=_("path"),l=_("animate"),o=_("path"),n=_("animate"),c=_("path"),r=_("animate"),this.h()},l(h){t=k(h,"svg",{width:!0,height:!0,viewBox:!0});var d=w(t);s=k(d,"g",{fill:!0,stroke:!0,strokelinecap:!0,strokelinejoin:!0,strokewidth:!0});var f=w(s);a=k(f,"path",{strokedasharray:!0,strokedashoffset:!0,d:!0});var p=w(a);l=k(p,"animate",{fill:!0,attributeName:!0,dur:!0,values:!0}),w(l).forEach(b),p.forEach(b),o=k(f,"path",{strokedasharray:!0,strokedashoffset:!0,d:!0});var j=w(o);n=k(j,"animate",{fill:!0,attributeName:!0,begin:!0,dur:!0,values:!0}),w(n).forEach(b),j.forEach(b),c=k(f,"path",{strokedasharray:!0,strokedashoffset:!0,d:!0});var x=w(c);r=k(x,"animate",{fill:!0,attributeName:!0,begin:!0,dur:!0,values:!0}),w(r).forEach(b),x.forEach(b),f.forEach(b),d.forEach(b),this.h()},h(){i(l,"fill","freeze"),i(l,"attributeName","stroke-dashoffset"),i(l,"dur","0.6s"),i(l,"values","36;0"),i(a,"strokedasharray","36"),i(a,"strokedashoffset","36"),i(a,"d","M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12"),i(n,"fill","freeze"),i(n,"attributeName","stroke-dashoffset"),i(n,"begin","0.6s"),i(n,"dur","0.3s"),i(n,"values","12;0"),i(o,"strokedasharray","12"),i(o,"strokedashoffset","12"),i(o,"d","M13 11L20 4"),i(r,"fill","freeze"),i(r,"attributeName","stroke-dashoffset"),i(r,"begin","0.9s"),i(r,"dur","0.2s"),i(r,"values","8;0"),i(c,"strokedasharray","8"),i(c,"strokedashoffset","8"),i(c,"d","M21 3H15M21 3V9"),i(s,"fill","none"),i(s,"stroke","currentColor"),i(s,"strokelinecap","round"),i(s,"strokelinejoin","round"),i(s,"strokewidth","2"),H(t,y)},m(h,d){X(h,t,d),S(t,s),S(s,a),S(a,l),S(s,o),S(o,n),S(s,c),S(c,r)},p(h,[d]){H(t,y=ee(A,[d&1&&h[0],{width:"1em"},{height:"1em"},{viewBox:"0 0 24 24"}]))},i:V,o:V,d(h){h&&b(t)}}}function oe(e,t,s){const a=[];let l=F(t,a);return e.$$set=o=>{t=D(D({},t),Z(o)),s(0,l=F(t,a))},[l]}class _e extends U{constructor(t){super(),W(this,t,oe,ae,T,{})}}export{_e as E,he as a,me as b,ve as c,ge as d,ue as e,ce as f,ee as g,R as h,pe as i,P as j,G as k,ie as l,se as m,fe as n,$ as o,te as p,be as q,Y as r,ye as s,I as t,de as u};
