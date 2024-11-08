import{s as qe,r as ce,e as ee,a as Be,t as Fe,c as te,b as le,g as Ve,d as Ze,f as oe,S as ge,m as W,u as fe,i as Ye,h as K,T as Xe,E as Ke,j as Je,n as be,U as he,V as ve}from"./scheduler.B7yQ8r1a.js";import{g as Qe}from"./Link.svelte_svelte_type_style_lang.CdlSOqm3.js";import{S as De,i as $e}from"./index.CgDp2n8m.js";const me="-",et=e=>{const t=ot(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:d=>{const a=d.split(me);return a[0]===""&&a.length!==1&&a.shift(),ke(a,t)||tt(d)},getConflictingClassGroupIds:(d,a)=>{const b=o[d]||[];return a&&r[d]?[...b,...r[d]]:b}}},ke=(e,t)=>{var d;if(e.length===0)return t.classGroupId;const o=e[0],r=t.nextPart.get(o),s=r?ke(e.slice(1),r):void 0;if(s)return s;if(t.validators.length===0)return;const l=e.join(me);return(d=t.validators.find(({validator:a})=>a(l)))==null?void 0:d.classGroupId},ye=/^\[(.+)\]$/,tt=e=>{if(ye.test(e)){const t=ye.exec(e)[1],o=t==null?void 0:t.substring(0,t.indexOf(":"));if(o)return"arbitrary.."+o}},ot=e=>{const{theme:t,prefix:o}=e,r={nextPart:new Map,validators:[]};return nt(Object.entries(e.classGroups),o).forEach(([l,d])=>{ue(d,r,l,t)}),r},ue=(e,t,o,r)=>{e.forEach(s=>{if(typeof s=="string"){const l=s===""?t:we(t,s);l.classGroupId=o;return}if(typeof s=="function"){if(rt(s)){ue(s(r),t,o,r);return}t.validators.push({validator:s,classGroupId:o});return}Object.entries(s).forEach(([l,d])=>{ue(d,we(t,l),o,r)})})},we=(e,t)=>{let o=e;return t.split(me).forEach(r=>{o.nextPart.has(r)||o.nextPart.set(r,{nextPart:new Map,validators:[]}),o=o.nextPart.get(r)}),o},rt=e=>e.isThemeGetter,nt=(e,t)=>t?e.map(([o,r])=>{const s=r.map(l=>typeof l=="string"?t+l:typeof l=="object"?Object.fromEntries(Object.entries(l).map(([d,a])=>[t+d,a])):l);return[o,s]}):e,at=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,o=new Map,r=new Map;const s=(l,d)=>{o.set(l,d),t++,t>e&&(t=0,r=o,o=new Map)};return{get(l){let d=o.get(l);if(d!==void 0)return d;if((d=r.get(l))!==void 0)return s(l,d),d},set(l,d){o.has(l)?o.set(l,d):s(l,d)}}},Se="!",it=e=>{const{separator:t,experimentalParseClassName:o}=e,r=t.length===1,s=t[0],l=t.length,d=a=>{const b=[];let h=0,w=0,S;for(let g=0;g<a.length;g++){let k=a[g];if(h===0){if(k===s&&(r||a.slice(g,g+l)===t)){b.push(a.slice(w,g)),w=g+l;continue}if(k==="/"){S=g;continue}}k==="["?h++:k==="]"&&h--}const I=b.length===0?a:a.substring(w),f=I.startsWith(Se),v=f?I.substring(1):I,u=S&&S>w?S-w:void 0;return{modifiers:b,hasImportantModifier:f,baseClassName:v,maybePostfixModifierPosition:u}};return o?a=>o({className:a,parseClassName:d}):d},st=e=>{if(e.length<=1)return e;const t=[];let o=[];return e.forEach(r=>{r[0]==="["?(t.push(...o.sort(),r),o=[]):o.push(r)}),t.push(...o.sort()),t},lt=e=>({cache:at(e.cacheSize),parseClassName:it(e),...et(e)}),dt=/\s+/,ct=(e,t)=>{const{parseClassName:o,getClassGroupId:r,getConflictingClassGroupIds:s}=t,l=[],d=e.trim().split(dt);let a="";for(let b=d.length-1;b>=0;b-=1){const h=d[b],{modifiers:w,hasImportantModifier:S,baseClassName:I,maybePostfixModifierPosition:f}=o(h);let v=!!f,u=r(v?I.substring(0,f):I);if(!u){if(!v){a=h+(a.length>0?" "+a:a);continue}if(u=r(I),!u){a=h+(a.length>0?" "+a:a);continue}v=!1}const g=st(w).join(":"),k=S?g+Se:g,T=k+u;if(l.includes(T))continue;l.push(T);const A=s(u,v);for(let H=0;H<A.length;++H){const P=A[H];l.push(k+P)}a=h+(a.length>0?" "+a:a)}return a};function ut(){let e=0,t,o,r="";for(;e<arguments.length;)(t=arguments[e++])&&(o=Ae(t))&&(r&&(r+=" "),r+=o);return r}const Ae=e=>{if(typeof e=="string")return e;let t,o="";for(let r=0;r<e.length;r++)e[r]&&(t=Ae(e[r]))&&(o&&(o+=" "),o+=t);return o};function mt(e,...t){let o,r,s,l=d;function d(b){const h=t.reduce((w,S)=>S(w),e());return o=lt(h),r=o.cache.get,s=o.cache.set,l=a,a(b)}function a(b){const h=r(b);if(h)return h;const w=ct(b,o);return s(b,w),w}return function(){return l(ut.apply(null,arguments))}}const z=e=>{const t=o=>o[e]||[];return t.isThemeGetter=!0,t},Le=/^\[(?:([a-z-]+):)?(.+)\]$/i,pt=/^\d+\/\d+$/,gt=new Set(["px","full","screen"]),ft=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,bt=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,ht=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,vt=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,yt=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,R=e=>V(e)||gt.has(e)||pt.test(e),U=e=>Z(e,"length",At),V=e=>!!e&&!Number.isNaN(Number(e)),de=e=>Z(e,"number",V),J=e=>!!e&&Number.isInteger(Number(e)),wt=e=>e.endsWith("%")&&V(e.slice(0,-1)),c=e=>Le.test(e),q=e=>ft.test(e),xt=new Set(["length","size","percentage"]),zt=e=>Z(e,xt,Ie),Ct=e=>Z(e,"position",Ie),Et=new Set(["image","url"]),kt=e=>Z(e,Et,It),St=e=>Z(e,"",Lt),Q=()=>!0,Z=(e,t,o)=>{const r=Le.exec(e);return r?r[1]?typeof t=="string"?r[1]===t:t.has(r[1]):o(r[2]):!1},At=e=>bt.test(e)&&!ht.test(e),Ie=()=>!1,Lt=e=>vt.test(e),It=e=>yt.test(e),Ot=()=>{const e=z("colors"),t=z("spacing"),o=z("blur"),r=z("brightness"),s=z("borderColor"),l=z("borderRadius"),d=z("borderSpacing"),a=z("borderWidth"),b=z("contrast"),h=z("grayscale"),w=z("hueRotate"),S=z("invert"),I=z("gap"),f=z("gradientColorStops"),v=z("gradientColorStopPositions"),u=z("inset"),g=z("margin"),k=z("opacity"),T=z("padding"),A=z("saturate"),H=z("scale"),P=z("sepia"),Y=z("skew"),y=z("space"),n=z("translate"),j=()=>["auto","contain","none"],E=()=>["auto","hidden","clip","visible","scroll"],L=()=>["auto",c,t],i=()=>[c,t],m=()=>["",R,U],x=()=>["auto",V,c],C=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],p=()=>["solid","dashed","dotted","double","none"],O=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],M=()=>["start","end","center","between","around","evenly","stretch"],N=()=>["","0",c],G=()=>["auto","avoid","all","avoid-page","page","left","right","column"],_=()=>[V,c];return{cacheSize:500,separator:":",theme:{colors:[Q],spacing:[R,U],blur:["none","",q,c],brightness:_(),borderColor:[e],borderRadius:["none","","full",q,c],borderSpacing:i(),borderWidth:m(),contrast:_(),grayscale:N(),hueRotate:_(),invert:N(),gap:i(),gradientColorStops:[e],gradientColorStopPositions:[wt,U],inset:L(),margin:L(),opacity:_(),padding:i(),saturate:_(),scale:_(),sepia:N(),skew:_(),space:i(),translate:i()},classGroups:{aspect:[{aspect:["auto","square","video",c]}],container:["container"],columns:[{columns:[q]}],"break-after":[{"break-after":G()}],"break-before":[{"break-before":G()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...C(),c]}],overflow:[{overflow:E()}],"overflow-x":[{"overflow-x":E()}],"overflow-y":[{"overflow-y":E()}],overscroll:[{overscroll:j()}],"overscroll-x":[{"overscroll-x":j()}],"overscroll-y":[{"overscroll-y":j()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[u]}],"inset-x":[{"inset-x":[u]}],"inset-y":[{"inset-y":[u]}],start:[{start:[u]}],end:[{end:[u]}],top:[{top:[u]}],right:[{right:[u]}],bottom:[{bottom:[u]}],left:[{left:[u]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",J,c]}],basis:[{basis:L()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",c]}],grow:[{grow:N()}],shrink:[{shrink:N()}],order:[{order:["first","last","none",J,c]}],"grid-cols":[{"grid-cols":[Q]}],"col-start-end":[{col:["auto",{span:["full",J,c]},c]}],"col-start":[{"col-start":x()}],"col-end":[{"col-end":x()}],"grid-rows":[{"grid-rows":[Q]}],"row-start-end":[{row:["auto",{span:[J,c]},c]}],"row-start":[{"row-start":x()}],"row-end":[{"row-end":x()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",c]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",c]}],gap:[{gap:[I]}],"gap-x":[{"gap-x":[I]}],"gap-y":[{"gap-y":[I]}],"justify-content":[{justify:["normal",...M()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...M(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...M(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[T]}],px:[{px:[T]}],py:[{py:[T]}],ps:[{ps:[T]}],pe:[{pe:[T]}],pt:[{pt:[T]}],pr:[{pr:[T]}],pb:[{pb:[T]}],pl:[{pl:[T]}],m:[{m:[g]}],mx:[{mx:[g]}],my:[{my:[g]}],ms:[{ms:[g]}],me:[{me:[g]}],mt:[{mt:[g]}],mr:[{mr:[g]}],mb:[{mb:[g]}],ml:[{ml:[g]}],"space-x":[{"space-x":[y]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[y]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",c,t]}],"min-w":[{"min-w":[c,t,"min","max","fit"]}],"max-w":[{"max-w":[c,t,"none","full","min","max","fit","prose",{screen:[q]},q]}],h:[{h:[c,t,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[c,t,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[c,t,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[c,t,"auto","min","max","fit"]}],"font-size":[{text:["base",q,U]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",de]}],"font-family":[{font:[Q]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",c]}],"line-clamp":[{"line-clamp":["none",V,de]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",R,c]}],"list-image":[{"list-image":["none",c]}],"list-style-type":[{list:["none","disc","decimal",c]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[k]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[k]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...p(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",R,U]}],"underline-offset":[{"underline-offset":["auto",R,c]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:i()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",c]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",c]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[k]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...C(),Ct]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",zt]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},kt]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[v]}],"gradient-via-pos":[{via:[v]}],"gradient-to-pos":[{to:[v]}],"gradient-from":[{from:[f]}],"gradient-via":[{via:[f]}],"gradient-to":[{to:[f]}],rounded:[{rounded:[l]}],"rounded-s":[{"rounded-s":[l]}],"rounded-e":[{"rounded-e":[l]}],"rounded-t":[{"rounded-t":[l]}],"rounded-r":[{"rounded-r":[l]}],"rounded-b":[{"rounded-b":[l]}],"rounded-l":[{"rounded-l":[l]}],"rounded-ss":[{"rounded-ss":[l]}],"rounded-se":[{"rounded-se":[l]}],"rounded-ee":[{"rounded-ee":[l]}],"rounded-es":[{"rounded-es":[l]}],"rounded-tl":[{"rounded-tl":[l]}],"rounded-tr":[{"rounded-tr":[l]}],"rounded-br":[{"rounded-br":[l]}],"rounded-bl":[{"rounded-bl":[l]}],"border-w":[{border:[a]}],"border-w-x":[{"border-x":[a]}],"border-w-y":[{"border-y":[a]}],"border-w-s":[{"border-s":[a]}],"border-w-e":[{"border-e":[a]}],"border-w-t":[{"border-t":[a]}],"border-w-r":[{"border-r":[a]}],"border-w-b":[{"border-b":[a]}],"border-w-l":[{"border-l":[a]}],"border-opacity":[{"border-opacity":[k]}],"border-style":[{border:[...p(),"hidden"]}],"divide-x":[{"divide-x":[a]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[a]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[k]}],"divide-style":[{divide:p()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-s":[{"border-s":[s]}],"border-color-e":[{"border-e":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",...p()]}],"outline-offset":[{"outline-offset":[R,c]}],"outline-w":[{outline:[R,U]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:m()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[k]}],"ring-offset-w":[{"ring-offset":[R,U]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",q,St]}],"shadow-color":[{shadow:[Q]}],opacity:[{opacity:[k]}],"mix-blend":[{"mix-blend":[...O(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":O()}],filter:[{filter:["","none"]}],blur:[{blur:[o]}],brightness:[{brightness:[r]}],contrast:[{contrast:[b]}],"drop-shadow":[{"drop-shadow":["","none",q,c]}],grayscale:[{grayscale:[h]}],"hue-rotate":[{"hue-rotate":[w]}],invert:[{invert:[S]}],saturate:[{saturate:[A]}],sepia:[{sepia:[P]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[o]}],"backdrop-brightness":[{"backdrop-brightness":[r]}],"backdrop-contrast":[{"backdrop-contrast":[b]}],"backdrop-grayscale":[{"backdrop-grayscale":[h]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[w]}],"backdrop-invert":[{"backdrop-invert":[S]}],"backdrop-opacity":[{"backdrop-opacity":[k]}],"backdrop-saturate":[{"backdrop-saturate":[A]}],"backdrop-sepia":[{"backdrop-sepia":[P]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[d]}],"border-spacing-x":[{"border-spacing-x":[d]}],"border-spacing-y":[{"border-spacing-y":[d]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",c]}],duration:[{duration:_()}],ease:[{ease:["linear","in","out","in-out",c]}],delay:[{delay:_()}],animate:[{animate:["none","spin","ping","pulse","bounce",c]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[H]}],"scale-x":[{"scale-x":[H]}],"scale-y":[{"scale-y":[H]}],rotate:[{rotate:[J,c]}],"translate-x":[{"translate-x":[n]}],"translate-y":[{"translate-y":[n]}],"skew-x":[{"skew-x":[Y]}],"skew-y":[{"skew-y":[Y]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",c]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",c]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":i()}],"scroll-mx":[{"scroll-mx":i()}],"scroll-my":[{"scroll-my":i()}],"scroll-ms":[{"scroll-ms":i()}],"scroll-me":[{"scroll-me":i()}],"scroll-mt":[{"scroll-mt":i()}],"scroll-mr":[{"scroll-mr":i()}],"scroll-mb":[{"scroll-mb":i()}],"scroll-ml":[{"scroll-ml":i()}],"scroll-p":[{"scroll-p":i()}],"scroll-px":[{"scroll-px":i()}],"scroll-py":[{"scroll-py":i()}],"scroll-ps":[{"scroll-ps":i()}],"scroll-pe":[{"scroll-pe":i()}],"scroll-pt":[{"scroll-pt":i()}],"scroll-pr":[{"scroll-pr":i()}],"scroll-pb":[{"scroll-pb":i()}],"scroll-pl":[{"scroll-pl":i()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",c]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[R,U,de]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Tt=mt(Ot);function Oe(e){var t,o,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(o=Oe(e[t]))&&(r&&(r+=" "),r+=o)}else for(o in e)e[o]&&(r&&(r+=" "),r+=o);return r}function Mt(){for(var e,t,o=0,r="",s=arguments.length;o<s;o++)(e=arguments[o])&&(t=Oe(e))&&(r&&(r+=" "),r+=t);return r}function D(...e){return Tt(Mt(e))}/*! medium-zoom 1.1.0 | MIT License | https://github.com/francoischalifour/medium-zoom */var B=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},re=function(t){return t.tagName==="IMG"},_t=function(t){return NodeList.prototype.isPrototypeOf(t)},ne=function(t){return t&&t.nodeType===1},xe=function(t){var o=t.currentSrc||t.src;return o.substr(-4).toLowerCase()===".svg"},ze=function(t){try{return Array.isArray(t)?t.filter(re):_t(t)?[].slice.call(t).filter(re):ne(t)?[t].filter(re):typeof t=="string"?[].slice.call(document.querySelectorAll(t)).filter(re):[]}catch{throw new TypeError(`The provided selector is invalid.
Expects a CSS selector, a Node element, a NodeList or an array.
See: https://github.com/francoischalifour/medium-zoom`)}},Ht=function(t){var o=document.createElement("div");return o.classList.add("medium-zoom-overlay"),o.style.background=t,o},Nt=function(t){var o=t.getBoundingClientRect(),r=o.top,s=o.left,l=o.width,d=o.height,a=t.cloneNode(),b=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,h=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;return a.removeAttribute("id"),a.style.position="absolute",a.style.top=r+b+"px",a.style.left=s+h+"px",a.style.width=l+"px",a.style.height=d+"px",a.style.transform="",a},F=function(t,o){var r=B({bubbles:!1,cancelable:!1,detail:void 0},o);if(typeof window.CustomEvent=="function")return new CustomEvent(t,r);var s=document.createEvent("CustomEvent");return s.initCustomEvent(t,r.bubbles,r.cancelable,r.detail),s},Pt=function e(t){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=window.Promise||function(i){function m(){}i(m,m)},s=function(i){var m=i.target;if(m===j){v();return}A.indexOf(m)!==-1&&u({target:m})},l=function(){if(!(P||!n.original)){var i=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;Math.abs(Y-i)>y.scrollOffset&&setTimeout(v,150)}},d=function(i){var m=i.key||i.keyCode;(m==="Escape"||m==="Esc"||m===27)&&v()},a=function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},m=i;if(i.background&&(j.style.background=i.background),i.container&&i.container instanceof Object&&(m.container=B({},y.container,i.container)),i.template){var x=ne(i.template)?i.template:document.querySelector(i.template);m.template=x}return y=B({},y,m),A.forEach(function(C){C.dispatchEvent(F("medium-zoom:update",{detail:{zoom:E}}))}),E},b=function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return e(B({},y,i))},h=function(){for(var i=arguments.length,m=Array(i),x=0;x<i;x++)m[x]=arguments[x];var C=m.reduce(function(p,O){return[].concat(p,ze(O))},[]);return C.filter(function(p){return A.indexOf(p)===-1}).forEach(function(p){A.push(p),p.classList.add("medium-zoom-image")}),H.forEach(function(p){var O=p.type,M=p.listener,N=p.options;C.forEach(function(G){G.addEventListener(O,M,N)})}),E},w=function(){for(var i=arguments.length,m=Array(i),x=0;x<i;x++)m[x]=arguments[x];n.zoomed&&v();var C=m.length>0?m.reduce(function(p,O){return[].concat(p,ze(O))},[]):A;return C.forEach(function(p){p.classList.remove("medium-zoom-image"),p.dispatchEvent(F("medium-zoom:detach",{detail:{zoom:E}}))}),A=A.filter(function(p){return C.indexOf(p)===-1}),E},S=function(i,m){var x=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return A.forEach(function(C){C.addEventListener("medium-zoom:"+i,m,x)}),H.push({type:"medium-zoom:"+i,listener:m,options:x}),E},I=function(i,m){var x=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return A.forEach(function(C){C.removeEventListener("medium-zoom:"+i,m,x)}),H=H.filter(function(C){return!(C.type==="medium-zoom:"+i&&C.listener.toString()===m.toString())}),E},f=function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},m=i.target,x=function(){var p={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,left:0,top:0,right:0,bottom:0},O=void 0,M=void 0;if(y.container)if(y.container instanceof Object)p=B({},p,y.container),O=p.width-p.left-p.right-y.margin*2,M=p.height-p.top-p.bottom-y.margin*2;else{var N=ne(y.container)?y.container:document.querySelector(y.container),G=N.getBoundingClientRect(),_=G.width,Te=G.height,Me=G.left,_e=G.top;p=B({},p,{width:_,height:Te,left:Me,top:_e})}O=O||p.width-y.margin*2,M=M||p.height-y.margin*2;var X=n.zoomedHd||n.original,He=xe(X)?O:X.naturalWidth||O,Ne=xe(X)?M:X.naturalHeight||M,$=X.getBoundingClientRect(),Pe=$.top,Ge=$.left,ae=$.width,ie=$.height,Re=Math.min(Math.max(ae,He),O)/ae,je=Math.min(Math.max(ie,Ne),M)/ie,se=Math.min(Re,je),We=(-Ge+(O-ae)/2+y.margin+p.left)/se,Ue=(-Pe+(M-ie)/2+y.margin+p.top)/se,pe="scale("+se+") translate3d("+We+"px, "+Ue+"px, 0)";n.zoomed.style.transform=pe,n.zoomedHd&&(n.zoomedHd.style.transform=pe)};return new r(function(C){if(m&&A.indexOf(m)===-1){C(E);return}var p=function _(){P=!1,n.zoomed.removeEventListener("transitionend",_),n.original.dispatchEvent(F("medium-zoom:opened",{detail:{zoom:E}})),C(E)};if(n.zoomed){C(E);return}if(m)n.original=m;else if(A.length>0){var O=A;n.original=O[0]}else{C(E);return}if(n.original.dispatchEvent(F("medium-zoom:open",{detail:{zoom:E}})),Y=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,P=!0,n.zoomed=Nt(n.original),document.body.appendChild(j),y.template){var M=ne(y.template)?y.template:document.querySelector(y.template);n.template=document.createElement("div"),n.template.appendChild(M.content.cloneNode(!0)),document.body.appendChild(n.template)}if(n.original.parentElement&&n.original.parentElement.tagName==="PICTURE"&&n.original.currentSrc&&(n.zoomed.src=n.original.currentSrc),document.body.appendChild(n.zoomed),window.requestAnimationFrame(function(){document.body.classList.add("medium-zoom--opened")}),n.original.classList.add("medium-zoom-image--hidden"),n.zoomed.classList.add("medium-zoom-image--opened"),n.zoomed.addEventListener("click",v),n.zoomed.addEventListener("transitionend",p),n.original.getAttribute("data-zoom-src")){n.zoomedHd=n.zoomed.cloneNode(),n.zoomedHd.removeAttribute("srcset"),n.zoomedHd.removeAttribute("sizes"),n.zoomedHd.removeAttribute("loading"),n.zoomedHd.src=n.zoomed.getAttribute("data-zoom-src"),n.zoomedHd.onerror=function(){clearInterval(N),console.warn("Unable to reach the zoom image target "+n.zoomedHd.src),n.zoomedHd=null,x()};var N=setInterval(function(){n.zoomedHd.complete&&(clearInterval(N),n.zoomedHd.classList.add("medium-zoom-image--opened"),n.zoomedHd.addEventListener("click",v),document.body.appendChild(n.zoomedHd),x())},10)}else if(n.original.hasAttribute("srcset")){n.zoomedHd=n.zoomed.cloneNode(),n.zoomedHd.removeAttribute("sizes"),n.zoomedHd.removeAttribute("loading");var G=n.zoomedHd.addEventListener("load",function(){n.zoomedHd.removeEventListener("load",G),n.zoomedHd.classList.add("medium-zoom-image--opened"),n.zoomedHd.addEventListener("click",v),document.body.appendChild(n.zoomedHd),x()})}else x()})},v=function(){return new r(function(i){if(P||!n.original){i(E);return}var m=function x(){n.original.classList.remove("medium-zoom-image--hidden"),document.body.removeChild(n.zoomed),n.zoomedHd&&document.body.removeChild(n.zoomedHd),document.body.removeChild(j),n.zoomed.classList.remove("medium-zoom-image--opened"),n.template&&document.body.removeChild(n.template),P=!1,n.zoomed.removeEventListener("transitionend",x),n.original.dispatchEvent(F("medium-zoom:closed",{detail:{zoom:E}})),n.original=null,n.zoomed=null,n.zoomedHd=null,n.template=null,i(E)};P=!0,document.body.classList.remove("medium-zoom--opened"),n.zoomed.style.transform="",n.zoomedHd&&(n.zoomedHd.style.transform=""),n.template&&(n.template.style.transition="opacity 150ms",n.template.style.opacity=0),n.original.dispatchEvent(F("medium-zoom:close",{detail:{zoom:E}})),n.zoomed.addEventListener("transitionend",m)})},u=function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},m=i.target;return n.original?v():f({target:m})},g=function(){return y},k=function(){return A},T=function(){return n.original},A=[],H=[],P=!1,Y=0,y=o,n={original:null,zoomed:null,zoomedHd:null,template:null};Object.prototype.toString.call(t)==="[object Object]"?y=t:(t||typeof t=="string")&&h(t),y=B({margin:0,background:"#fff",scrollOffset:40,container:null,template:null},y);var j=Ht(y.background);document.addEventListener("click",s),document.addEventListener("keyup",d),document.addEventListener("scroll",l),window.addEventListener("resize",v);var E={open:f,close:v,toggle:u,update:a,clone:b,attach:h,detach:w,on:S,off:I,getOptions:g,getImages:k,getZoomedImage:T};return E};function Gt(e,t){t===void 0&&(t={});var o=t.insertAt;if(!(typeof document>"u")){var r=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css",o==="top"&&r.firstChild?r.insertBefore(s,r.firstChild):r.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e))}}var Rt=".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";Gt(Rt);function jt(e){let t,o,r,s,l,d,a,b,h,w,S,I,f=[e[6]],v={};for(let u=0;u<f.length;u+=1)v=ce(v,f[u]);return{c(){t=ee("figure"),o=ee("img"),d=Be(),a=ee("figcaption"),b=ee("p"),h=Fe(e[2]),this.h()},l(u){t=te(u,"FIGURE",{});var g=le(t);o=te(g,"IMG",{src:!0,class:!0,alt:!0}),d=Ve(g),a=te(g,"FIGCAPTION",{});var k=le(a);b=te(k,"P",{class:!0});var T=le(b);h=Ze(T,e[2]),T.forEach(oe),k.forEach(oe),g.forEach(oe),this.h()},h(){ge(o.src,r=e[0])||W(o,"src",r),W(o,"class",s=D(e[7].class,Ee)),W(o,"alt",e[1]),W(b,"class",w=D(Ce,e[3])),fe(t,v)},m(u,g){Ye(u,t,g),K(t,o),K(t,d),K(t,a),K(a,b),K(b,h),S||(I=Xe(l=e[5].call(null,o,e[4])),S=!0)},p(u,[g]){g&1&&!ge(o.src,r=u[0])&&W(o,"src",r),g&128&&s!==(s=D(u[7].class,Ee))&&W(o,"class",s),g&2&&W(o,"alt",u[1]),l&&Ke(l.update)&&g&16&&l.update.call(null,u[4]),g&4&&Je(h,u[2]),g&8&&w!==(w=D(Ce,u[3]))&&W(b,"class",w),fe(t,v=Qe(f,[g&64&&u[6]]))},i:be,o:be,d(u){u&&oe(t),S=!1,I()}}}const Ce="text-center text-sm m-1 font-bold leading-relaxed text-gray-800 dark:text-gray-300",Ee="rounded-t h-72 w-full object-scale-down";function Wt(e,t,o){const r=["src","alt","title","titleClass","zoomOptions"];let s=he(t,r),{src:l}=t,{alt:d}=t,{title:a}=t,{titleClass:b}=t,{zoomOptions:h={background:"#050505"}}=t,w;function S(){return w||(w=Pt(h),w.on("open",f=>{f.target.classList.remove("h-72"),f.target.classList.add("z-1001")}),w.on("closed",f=>{f.target.className=D(f.target.className,"h-72")})),w}function I(f){const v=S();return v.attach(f),{update(u){v.update(u)},destroy(){v.detach()}}}return e.$$set=f=>{o(7,t=ce(ce({},t),ve(f))),o(6,s=he(t,r)),"src"in f&&o(0,l=f.src),"alt"in f&&o(1,d=f.alt),"title"in f&&o(2,a=f.title),"titleClass"in f&&o(3,b=f.titleClass),"zoomOptions"in f&&o(4,h=f.zoomOptions)},t=ve(t),[l,d,a,b,h,I,s,t]}class Ft extends De{constructor(t){super(),$e(this,t,Wt,jt,qe,{src:0,alt:1,title:2,titleClass:3,zoomOptions:4})}}export{Ft as C};
