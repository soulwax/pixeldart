(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q)){b[q]=a[q]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++){inherit(b[s],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s){A.rp(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.d(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.mi(b)
return new s(c,this)}:function(){if(s===null)s=A.mi(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.mi(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
mo(a,b,c,d){return{i:a,p:b,e:c,x:d}},
mk(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.mm==null){A.r8()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.b(A.nd("Return interceptor for "+A.m(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.k9
if(o==null)o=$.k9=A.kO(n)
p=q[o]}if(p!=null)return p
p=A.re(a)
if(p!=null)return p
if(typeof a=="function")return B.cC
s=Object.getPrototypeOf(a)
if(s==null)return B.bc
if(s===Object.prototype)return B.bc
if(typeof q=="function"){o=$.k9
if(o==null)o=$.k9=A.kO(n)
Object.defineProperty(q,o,{value:B.aH,enumerable:false,writable:true,configurable:true})
return B.aH}return B.aH},
mJ(a,b){if(a<0||a>4294967295)throw A.b(A.aM(a,0,4294967295,"length",null))
return J.iq(new Array(a),b)},
mK(a,b){if(a<0)throw A.b(A.f("Length must be a non-negative integer: "+a,null))
return A.d(new Array(a),b.h("r<0>"))},
ip(a,b){if(a<0)throw A.b(A.f("Length must be a non-negative integer: "+a,null))
return A.d(new Array(a),b.h("r<0>"))},
iq(a,b){var s=A.d(a,b.h("r<0>"))
s.$flags=1
return s},
oB(a,b){var s=t.bP
return J.mw(s.a(a),s.a(b))},
mL(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
oC(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.mL(r))break;++b}return b},
oD(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.c(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.mL(q))break}return b},
ci(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ds.prototype
return J.fc.prototype}if(typeof a=="string")return J.bH.prototype
if(a==null)return J.dt.prototype
if(typeof a=="boolean")return J.fb.prototype
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bI.prototype
if(typeof a=="symbol")return J.dw.prototype
if(typeof a=="bigint")return J.du.prototype
return a}if(a instanceof A.z)return a
return J.mk(a)},
hF(a){if(typeof a=="string")return J.bH.prototype
if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bI.prototype
if(typeof a=="symbol")return J.dw.prototype
if(typeof a=="bigint")return J.du.prototype
return a}if(a instanceof A.z)return a
return J.mk(a)},
d3(a){if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bI.prototype
if(typeof a=="symbol")return J.dw.prototype
if(typeof a=="bigint")return J.du.prototype
return a}if(a instanceof A.z)return a
return J.mk(a)},
r4(a){if(typeof a=="number")return J.cz.prototype
if(typeof a=="string")return J.bH.prototype
if(a==null)return a
if(!(a instanceof A.z))return J.c7.prototype
return a},
r5(a){if(typeof a=="string")return J.bH.prototype
if(a==null)return a
if(!(a instanceof A.z))return J.c7.prototype
return a},
aP(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.ci(a).a8(a,b)},
lD(a,b){if(typeof b==="number")if(Array.isArray(a)||A.rc(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.d3(a).B(a,b)},
eA(a,b,c){return J.d3(a).E(a,b,c)},
d6(a,b){return J.d3(a).i(a,b)},
mw(a,b){return J.r4(a).R(a,b)},
lE(a,b){return J.d3(a).a5(a,b)},
X(a){return J.ci(a).gU(a)},
ad(a){return J.d3(a).gJ(a)},
bW(a){return J.hF(a).gv(a)},
eB(a){return J.ci(a).gT(a)},
od(a,b){return J.hF(a).sv(a,b)},
oe(a,b){return J.r5(a).e8(a,b)},
ck(a){return J.ci(a).j(a)},
f8:function f8(){},
fb:function fb(){},
dt:function dt(){},
dv:function dv(){},
bJ:function bJ(){},
fv:function fv(){},
c7:function c7(){},
bI:function bI(){},
du:function du(){},
dw:function dw(){},
r:function r(a){this.$ti=a},
fa:function fa(){},
ir:function ir(a){this.$ti=a},
d8:function d8(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cz:function cz(){},
ds:function ds(){},
fc:function fc(){},
bH:function bH(){}},A={lK:function lK(){},
mM(a){return new A.cA("Field '"+a+"' has been assigned during initialization.")},
oF(a){return new A.cA("Field '"+a+"' has not been initialized.")},
oE(a){return new A.cA("Field '"+a+"' has already been initialized.")},
aa(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
fR(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
bS(a,b,c){return a},
mn(a){var s,r
for(s=$.aO.length,r=0;r<s;++r)if(a===$.aO[r])return!0
return!1},
fQ(a,b,c,d){A.jd(b,"start")
if(c!=null){A.jd(c,"end")
if(b>c)A.l(A.aM(b,0,c,"start",null))}return new A.e_(a,b,c,d.h("e_<0>"))},
f9(){return new A.cN("No element")},
mI(){return new A.cN("Too many elements")},
cR:function cR(){},
dc:function dc(a,b){this.a=a
this.$ti=b},
e6:function e6(){},
dd:function dd(a,b){this.a=a
this.$ti=b},
cA:function cA(a){this.a=a},
ju:function ju(){},
aS:function aS(){},
P:function P(){},
e_:function e_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ah:function ah(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
dA:function dA(a,b,c){this.a=a
this.b=b
this.$ti=c},
dB:function dB(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
O:function O(a,b,c){this.a=a
this.b=b
this.$ti=c},
ac:function ac(a,b,c){this.a=a
this.b=b
this.$ti=c},
R:function R(a,b,c){this.a=a
this.b=b
this.$ti=c},
V:function V(){},
dU:function dU(a,b){this.a=a
this.$ti=b},
eu:function eu(){},
lI(a,b,c){var s,r,q,p,o,n,m,l=A.y(a),k=A.bo(new A.bm(a,l.h("bm<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.A)(k),++i,p=o){r=k[i]
c.a(a.B(0,r))
o=p+1
q[r]=p}n=A.bo(new A.b1(a,l.h("b1<2>")),!0,c)
m=new A.a_(q,n,b.h("@<0>").Y(c).h("a_<1,2>"))
m.$keys=k
return m}return new A.dj(A.oH(a,b,c),b.h("@<0>").Y(c).h("dj<1,2>"))},
on(){throw A.b(A.bd("Cannot modify constant Set"))},
o_(a){var s=A.nZ(a)
if(s!=null)return s
return"minified:"+a},
rc(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.dX.b(a)},
m(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.ck(a)
return s},
fz(a){var s,r=$.mY
if(r==null)r=$.mY=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
p1(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.c(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
dN(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.E.dS(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
fA(a){var s,r,q,p
if(a instanceof A.z)return A.aN(A.bC(a),null)
s=J.ci(a)
if(s===B.cB||s===B.cD||t.cx.b(a)){r=B.aM(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aN(A.bC(a),null)},
n0(a){var s,r,q
if(a==null||typeof a=="number"||A.mc(a))return J.ck(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bD)return a.j(0)
if(a instanceof A.aW)return a.d8(!0)
s=$.oc()
for(r=0;r<1;++r){q=s[r].hq(a)
if(q!=null)return q}return"Instance of '"+A.fA(a)+"'"},
cG(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
p_(a){var s=A.cG(a).getUTCFullYear()+0
return s},
oY(a){var s=A.cG(a).getUTCMonth()+1
return s},
oU(a){var s=A.cG(a).getUTCDate()+0
return s},
oV(a){var s=A.cG(a).getUTCHours()+0
return s},
oX(a){var s=A.cG(a).getUTCMinutes()+0
return s},
oZ(a){var s=A.cG(a).getUTCSeconds()+0
return s},
oW(a){var s=A.cG(a).getUTCMilliseconds()+0
return s},
oT(a){var s=a.$thrownJsError
if(s==null)return null
return A.bB(s)},
n1(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.a1(a,s)
a.$thrownJsError=s
s.stack=b.j(0)}},
bg(a){throw A.b(A.nR(a))},
c(a,b){if(a==null)J.bW(a)
throw A.b(A.kM(a,b))},
kM(a,b){var s,r="index"
if(!A.nI(b))return new A.b6(!0,b,r,null)
s=A.e(J.bW(a))
if(b<0||b>=s)return A.io(b,s,a,r)
return new A.cJ(null,null,!0,b,r,"Value not in range")},
nR(a){return new A.b6(!0,a,null,null)},
ch(a){return a},
b(a){return A.a1(a,new Error())},
a1(a,b){var s
if(a==null)a=new A.bs()
b.dartException=a
s=A.rq
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
rq(){return J.ck(this.dartException)},
l(a,b){throw A.a1(a,b==null?new Error():b)},
aY(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.l(A.qe(a,b,c),s)},
qe(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.gs.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.e3("'"+s+"': Cannot "+o+" "+l+k+n)},
A(a){throw A.b(A.aR(a))},
bt(a){var s,r,q,p,o,n
a=A.ri(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.d([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.jH(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
jI(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
nc(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
lL(a,b){var s=b==null,r=s?null:b.method
return new A.fd(a,r,s?null:b.receiver)},
bh(a){var s
if(a==null)return new A.iG(a)
if(a instanceof A.dn){s=a.a
return A.bV(a,s==null?A.ev(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bV(a,a.dartException)
return A.qP(a)},
bV(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
qP(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.d.d1(r,16)&8191)===10)switch(q){case 438:return A.bV(a,A.lL(A.m(s)+" (Error "+q+")",null))
case 445:case 5007:A.m(s)
return A.bV(a,new A.dI())}}if(a instanceof TypeError){p=$.o2()
o=$.o3()
n=$.o4()
m=$.o5()
l=$.o8()
k=$.o9()
j=$.o7()
$.o6()
i=$.ob()
h=$.oa()
g=p.ah(s)
if(g!=null)return A.bV(a,A.lL(A.M(s),g))
else{g=o.ah(s)
if(g!=null){g.method="call"
return A.bV(a,A.lL(A.M(s),g))}else if(n.ah(s)!=null||m.ah(s)!=null||l.ah(s)!=null||k.ah(s)!=null||j.ah(s)!=null||m.ah(s)!=null||i.ah(s)!=null||h.ah(s)!=null){A.M(s)
return A.bV(a,new A.dI())}}return A.bV(a,new A.fV(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.dY()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bV(a,new A.b6(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.dY()
return a},
bB(a){var s
if(a instanceof A.dn)return a.b
if(a==null)return new A.ej(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.ej(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
hG(a){if(a==null)return J.X(a)
if(typeof a=="object")return A.fz(a)
return J.X(a)},
r2(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.E(0,a[s],a[r])}return b},
r3(a,b){var s,r=a.length
for(s=0;s<r;++s)b.i(0,a[s])
return b},
qr(a,b,c,d,e,f){t.Z.a(a)
switch(A.e(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.jX("Unsupported number of arguments for wrapped closure"))},
d2(a,b){var s=a.$identity
if(!!s)return s
s=A.qW(a,b)
a.$identity=s
return s},
qW(a,b){var s
switch(b){case 0:s=a.$0
break
case 1:s=a.$1
break
case 2:s=a.$2
break
case 3:s=a.$3
break
case 4:s=a.$4
break
default:s=null}if(s!=null)return s.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.qr)},
om(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fO().constructor.prototype):Object.create(new A.co(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.mD(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.oi(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.mD(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
oi(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.of)}throw A.b("Error in functionType of tearoff")},
oj(a,b,c,d){var s=A.mA
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
mD(a,b,c,d){if(c)return A.ol(a,b,d)
return A.oj(b.length,d,a,b)},
ok(a,b,c,d){var s=A.mA,r=A.og
switch(b?-1:a){case 0:throw A.b(new A.fE("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
ol(a,b,c){var s,r
if($.my==null)$.my=A.mx("interceptor")
if($.mz==null)$.mz=A.mx("receiver")
s=b.length
r=A.ok(s,c,a,b)
return r},
mi(a){return A.om(a)},
of(a,b){return A.eo(v.typeUniverse,A.bC(a.a),b)},
mA(a){return a.a},
og(a){return a.b},
mx(a){var s,r,q,p=new A.co("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.f("Field name "+a+" not found.",null))},
kO(a){return v.getIsolateTag(a)},
nY(){return v.G},
re(a){var s,r,q,p,o,n=A.M($.nV.$1(a)),m=$.kN[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.kS[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bz($.nQ.$2(a,n))
if(q!=null){m=$.kN[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.kS[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.lr(s)
$.kN[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.kS[n]=s
return s}if(p==="-"){o=A.lr(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.nW(a,s)
if(p==="*")throw A.b(A.nd(n))
if(v.leafTags[n]===true){o=A.lr(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.nW(a,s)},
nW(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.mo(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
lr(a){return J.mo(a,!1,null,!!a.$iaG)},
rg(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.lr(s)
else return J.mo(s,c,null,null)},
r8(){if(!0===$.mm)return
$.mm=!0
A.r9()},
r9(){var s,r,q,p,o,n,m,l
$.kN=Object.create(null)
$.kS=Object.create(null)
A.r7()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.nX.$1(o)
if(n!=null){m=A.rg(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
r7(){var s,r,q,p,o,n,m=B.bN()
m=A.d1(B.bO,A.d1(B.bP,A.d1(B.aN,A.d1(B.aN,A.d1(B.bQ,A.d1(B.bR,A.d1(B.bS(B.aM),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.nV=new A.kP(p)
$.nQ=new A.kQ(o)
$.nX=new A.kR(n)},
d1(a,b){return a(b)||b},
qX(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
ro(a,b,c){var s=a.indexOf(b,c)
return s>=0},
ri(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
F:function F(a,b){this.a=a
this.b=b},
cV:function cV(a,b){this.a=a
this.b=b},
eg:function eg(a,b){this.a=a
this.b=b},
cW:function cW(a,b){this.a=a
this.b=b},
ce:function ce(a,b,c){this.a=a
this.b=b
this.c=c},
dj:function dj(a,b){this.a=a
this.$ti=b},
di:function di(){},
a_:function a_(a,b,c){this.a=a
this.b=b
this.$ti=c},
c9:function c9(a,b){this.a=a
this.$ti=b},
ca:function ca(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
dk:function dk(){},
b7:function b7(a,b,c){this.a=a
this.b=b
this.$ti=c},
dV:function dV(){},
jH:function jH(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dI:function dI(){},
fd:function fd(a,b,c){this.a=a
this.b=b
this.c=c},
fV:function fV(a){this.a=a},
iG:function iG(a){this.a=a},
dn:function dn(a,b){this.a=a
this.b=b},
ej:function ej(a){this.a=a
this.b=null},
bD:function bD(){},
eN:function eN(){},
eO:function eO(){},
fS:function fS(){},
fO:function fO(){},
co:function co(a,b){this.a=a
this.b=b},
fE:function fE(a){this.a=a},
bk:function bk(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
it:function it(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
bm:function bm(a,b){this.a=a
this.$ti=b},
dy:function dy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b1:function b1(a,b){this.a=a
this.$ti=b},
bn:function bn(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
bl:function bl(a,b){this.a=a
this.$ti=b},
dx:function dx(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
kP:function kP(a){this.a=a},
kQ:function kQ(a){this.a=a},
kR:function kR(a){this.a=a},
aW:function aW(){},
bw:function bw(){},
cU:function cU(){},
t(a){return a},
fq(a){return new Uint8Array(A.t(a))},
bA(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.kM(b,a))},
cC:function cC(){},
dG:function dG(){},
fi:function fi(){},
aj:function aj(){},
dE:function dE(){},
dF:function dF(){},
dD:function dD(){},
fj:function fj(){},
fk:function fk(){},
fl:function fl(){},
fm:function fm(){},
fn:function fn(){},
fo:function fo(){},
dH:function dH(){},
fp:function fp(){},
ec:function ec(){},
ed:function ed(){},
ee:function ee(){},
ef:function ef(){},
lU(a,b){var s=b.c
return s==null?b.c=A.em(a,"bF",[b.x]):s},
n5(a){var s=a.w
if(s===6||s===7)return A.n5(a.x)
return s===11||s===12},
po(a){return a.as},
bU(a){return A.kh(v.typeUniverse,a,!1)},
cg(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cg(a1,s,a3,a4)
if(r===s)return a2
return A.nv(a1,r,!0)
case 7:s=a2.x
r=A.cg(a1,s,a3,a4)
if(r===s)return a2
return A.nu(a1,r,!0)
case 8:q=a2.y
p=A.d0(a1,q,a3,a4)
if(p===q)return a2
return A.em(a1,a2.x,p)
case 9:o=a2.x
n=A.cg(a1,o,a3,a4)
m=a2.y
l=A.d0(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.m4(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.d0(a1,j,a3,a4)
if(i===j)return a2
return A.nw(a1,k,i)
case 11:h=a2.x
g=A.cg(a1,h,a3,a4)
f=a2.y
e=A.qM(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.nt(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.d0(a1,d,a3,a4)
o=a2.x
n=A.cg(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.m5(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.eD("Attempted to substitute unexpected RTI kind "+a0))}},
d0(a,b,c,d){var s,r,q,p,o=b.length,n=A.ki(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cg(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
qN(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.ki(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cg(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
qM(a,b,c,d){var s,r=b.a,q=A.d0(a,r,c,d),p=b.b,o=A.d0(a,p,c,d),n=b.c,m=A.qN(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.he()
s.a=q
s.b=o
s.c=m
return s},
d(a,b){a[v.arrayRti]=b
return a},
mj(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.r6(s)
return a.$S()}return null},
ra(a,b){var s
if(A.n5(b))if(a instanceof A.bD){s=A.mj(a)
if(s!=null)return s}return A.bC(a)},
bC(a){if(a instanceof A.z)return A.y(a)
if(Array.isArray(a))return A.H(a)
return A.mb(J.ci(a))},
H(a){var s=a[v.arrayRti],r=t.dG
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
y(a){var s=a.$ti
return s!=null?s:A.mb(a)},
mb(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.qn(a,s)},
qn(a,b){var s=a instanceof A.bD?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.q5(v.typeUniverse,s.name)
b.$ccache=r
return r},
r6(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.kh(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
ml(a){return A.bf(A.y(a))},
mg(a){var s
if(a instanceof A.aW)return a.cP()
s=a instanceof A.bD?A.mj(a):null
if(s!=null)return s
if(t.aJ.b(a))return J.eB(a).a
if(Array.isArray(a))return A.H(a)
return A.bC(a)},
bf(a){var s=a.r
return s==null?a.r=new A.kg(a):s},
r1(a,b){var s,r,q=b,p=q.length
if(p===0)return t.aK
if(0>=p)return A.c(q,0)
s=A.eo(v.typeUniverse,A.mg(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.c(q,r)
s=A.ny(v.typeUniverse,s,A.mg(q[r]))}return A.eo(v.typeUniverse,s,a)},
aZ(a){return A.bf(A.kh(v.typeUniverse,a,!1))},
qm(a){var s=this
s.b=A.qK(s)
return s.b(a)},
qK(a){var s,r,q,p,o
if(a===t.K)return A.qx
if(A.cj(a))return A.qB
s=a.w
if(s===6)return A.qk
if(s===1)return A.nK
if(s===7)return A.qs
r=A.qJ(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cj)){a.f="$i"+q
if(q==="C")return A.qv
if(a===t.m)return A.qu
return A.qA}}else if(s===10){p=A.qX(a.x,a.y)
o=p==null?A.nK:p
return o==null?A.ev(o):o}return A.qi},
qJ(a){if(a.w===8){if(a===t.S)return A.nI
if(a===t.i||a===t.E)return A.qw
if(a===t.N)return A.qz
if(a===t.y)return A.mc}return null},
ql(a){var s=this,r=A.qh
if(A.cj(s))r=A.q9
else if(s===t.K)r=A.ev
else if(A.d4(s)){r=A.qj
if(s===t.aV)r=A.nB
else if(s===t.jv)r=A.bz
else if(s===t.fU)r=A.q8
else if(s===t.jh)r=A.nC
else if(s===t.dA)r=A.m6
else if(s===t.mU)r=A.u}else if(s===t.S)r=A.e
else if(s===t.N)r=A.M
else if(s===t.y)r=A.cf
else if(s===t.E)r=A.aF
else if(s===t.i)r=A.cZ
else if(s===t.m)r=A.k
s.a=r
return s.a(a)},
qi(a){var s=this
if(a==null)return A.d4(s)
return A.rd(v.typeUniverse,A.ra(a,s),s)},
qk(a){if(a==null)return!0
return this.x.b(a)},
qA(a){var s,r=this
if(a==null)return A.d4(r)
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.ci(a)[s]},
qv(a){var s,r=this
if(a==null)return A.d4(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.ci(a)[s]},
qu(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.z)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
nJ(a){if(typeof a=="object"){if(a instanceof A.z)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
qh(a){var s=this
if(a==null){if(A.d4(s))return a}else if(s.b(a))return a
throw A.a1(A.nD(a,s),new Error())},
qj(a){var s=this
if(a==null||s.b(a))return a
throw A.a1(A.nD(a,s),new Error())},
nD(a,b){return new A.ek("TypeError: "+A.no(a,A.aN(b,null)))},
no(a,b){return A.i1(a)+": type '"+A.aN(A.mg(a),null)+"' is not a subtype of type '"+b+"'"},
aX(a,b){return new A.ek("TypeError: "+A.no(a,b))},
qs(a){var s=this
return s.x.b(a)||A.lU(v.typeUniverse,s).b(a)},
qx(a){return a!=null},
ev(a){if(a!=null)return a
throw A.a1(A.aX(a,"Object"),new Error())},
qB(a){return!0},
q9(a){return a},
nK(a){return!1},
mc(a){return!0===a||!1===a},
cf(a){if(!0===a)return!0
if(!1===a)return!1
throw A.a1(A.aX(a,"bool"),new Error())},
q8(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.a1(A.aX(a,"bool?"),new Error())},
cZ(a){if(typeof a=="number")return a
throw A.a1(A.aX(a,"double"),new Error())},
m6(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a1(A.aX(a,"double?"),new Error())},
nI(a){return typeof a=="number"&&Math.floor(a)===a},
e(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.a1(A.aX(a,"int"),new Error())},
nB(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.a1(A.aX(a,"int?"),new Error())},
qw(a){return typeof a=="number"},
aF(a){if(typeof a=="number")return a
throw A.a1(A.aX(a,"num"),new Error())},
nC(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a1(A.aX(a,"num?"),new Error())},
qz(a){return typeof a=="string"},
M(a){if(typeof a=="string")return a
throw A.a1(A.aX(a,"String"),new Error())},
bz(a){if(typeof a=="string")return a
if(a==null)return a
throw A.a1(A.aX(a,"String?"),new Error())},
k(a){if(A.nJ(a))return a
throw A.a1(A.aX(a,"JSObject"),new Error())},
u(a){if(a==null)return a
if(A.nJ(a))return a
throw A.a1(A.aX(a,"JSObject?"),new Error())},
nN(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aN(a[q],b)
return s},
qE(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.nN(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aN(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
nF(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.d([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.b.i(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.c(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aN(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aN(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aN(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aN(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aN(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aN(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aN(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aN(a.x,b)+">"
if(l===8){p=A.qO(a.x)
o=a.y
return o.length>0?p+("<"+A.nN(o,b)+">"):p}if(l===10)return A.qE(a,b)
if(l===11)return A.nF(a,b,null)
if(l===12)return A.nF(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.c(b,n)
return b[n]}return"?"},
qO(a){var s=A.nZ(a)
if(s!=null)return s
return"minified:"+a},
q6(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
q5(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.kh(a,b,!1)
else if(typeof m=="number"){s=m
r=A.en(a,5,"#")
q=A.ki(s)
for(p=0;p<s;++p)q[p]=r
o=A.em(a,b,q)
n[b]=o
return o}else return m},
q4(a,b){return A.nz(a.tR,b)},
q3(a,b){return A.nz(a.eT,b)},
kh(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.nx(a,null,b,!1)
r.set(b,s)
return s},
eo(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.nx(a,b,c,!0)
q.set(c,r)
return r},
ny(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.m4(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
nx(a,b,c,d){return A.pV(A.pP(a,b,c,d))},
bR(a,b){b.a=A.ql
b.b=A.qm
return b},
en(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.b3(null,null)
s.w=b
s.as=c
r=A.bR(a,s)
a.eC.set(c,r)
return r},
nv(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.q1(a,b,r,c)
a.eC.set(r,s)
return s},
q1(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cj(b))if(!(b===t.b||b===t.T))if(s!==6)r=s===7&&A.d4(b.x)
if(r)return b
else if(s===1)return t.b}q=new A.b3(null,null)
q.w=6
q.x=b
q.as=c
return A.bR(a,q)},
nu(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.q_(a,b,r,c)
a.eC.set(r,s)
return s},
q_(a,b,c,d){var s,r
if(d){s=b.w
if(A.cj(b)||b===t.K)return b
else if(s===1)return A.em(a,"bF",[b])
else if(b===t.b||b===t.T)return t.gK}r=new A.b3(null,null)
r.w=7
r.x=b
r.as=c
return A.bR(a,r)},
q2(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.b3(null,null)
s.w=13
s.x=b
s.as=q
r=A.bR(a,s)
a.eC.set(q,r)
return r},
el(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
pZ(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
em(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.el(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.b3(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bR(a,r)
a.eC.set(p,q)
return q},
m4(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.el(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.b3(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bR(a,o)
a.eC.set(q,n)
return n},
nw(a,b,c){var s,r,q="+"+(b+"("+A.el(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.b3(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bR(a,s)
a.eC.set(q,r)
return r},
nt(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.el(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.el(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.pZ(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.b3(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bR(a,p)
a.eC.set(r,o)
return o},
m5(a,b,c,d){var s,r=b.as+("<"+A.el(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.q0(a,b,c,r,d)
a.eC.set(r,s)
return s},
q0(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.ki(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cg(a,b,r,0)
m=A.d0(a,c,r,0)
return A.m5(a,n,m,c!==m)}}l=new A.b3(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bR(a,l)},
pP(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
pV(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.pR(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.nq(a,r,l,k,!1)
else if(q===46)r=A.nq(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.cc(a.u,a.e,k.pop()))
break
case 94:k.push(A.q2(a.u,k.pop()))
break
case 35:k.push(A.en(a.u,5,"#"))
break
case 64:k.push(A.en(a.u,2,"@"))
break
case 126:k.push(A.en(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.pT(a,k)
break
case 38:A.pS(a,k)
break
case 63:p=a.u
k.push(A.nv(p,A.cc(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.nu(p,A.cc(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.pQ(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.nr(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.pW(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.cc(a.u,a.e,m)},
pR(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
nq(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.q6(s,o.x)[p]
if(n==null)A.l('No "'+p+'" in "'+A.po(o)+'"')
d.push(A.eo(s,o,n))}else d.push(p)
return m},
pT(a,b){var s,r=a.u,q=A.np(a,b),p=b.pop()
if(typeof p=="string")b.push(A.em(r,p,q))
else{s=A.cc(r,a.e,p)
switch(s.w){case 11:b.push(A.m5(r,s,q,a.n))
break
default:b.push(A.m4(r,s,q))
break}}},
pQ(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.np(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.cc(p,a.e,o)
q=new A.he()
q.a=s
q.b=n
q.c=m
b.push(A.nt(p,r,q))
return
case-4:b.push(A.nw(p,b.pop(),s))
return
default:throw A.b(A.eD("Unexpected state under `()`: "+A.m(o)))}},
pS(a,b){var s=b.pop()
if(0===s){b.push(A.en(a.u,1,"0&"))
return}if(1===s){b.push(A.en(a.u,4,"1&"))
return}throw A.b(A.eD("Unexpected extended operation "+A.m(s)))},
np(a,b){var s=b.splice(a.p)
A.nr(a.u,a.e,s)
a.p=b.pop()
return s},
cc(a,b,c){if(typeof c=="string")return A.em(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.pU(a,b,c)}else return c},
nr(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cc(a,b,c[s])},
pW(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cc(a,b,c[s])},
pU(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.b(A.eD("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.eD("Bad index "+c+" for "+b.j(0)))},
rd(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.a7(a,b,null,c,null)
r.set(c,s)}return s},
a7(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.cj(d))return!0
s=b.w
if(s===4)return!0
if(A.cj(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.a7(a,c[b.x],c,d,e))return!0
q=d.w
p=t.b
if(b===p||b===t.T){if(q===7)return A.a7(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.a7(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.a7(a,b.x,c,d,e))return!1
return A.a7(a,A.lU(a,b),c,d,e)}if(s===6)return A.a7(a,p,c,d,e)&&A.a7(a,b.x,c,d,e)
if(q===7){if(A.a7(a,b,c,d.x,e))return!0
return A.a7(a,b,c,A.lU(a,d),e)}if(q===6)return A.a7(a,b,c,p,e)||A.a7(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.lZ)return!0
if(q===12){if(b===t.dY)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.a7(a,j,c,i,e)||!A.a7(a,i,e,j,c))return!1}return A.nH(a,b.x,c,d.x,e)}if(q===11){if(b===t.dY)return!0
if(p)return!1
return A.nH(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.qt(a,b,c,d,e)}if(o&&q===10)return A.qy(a,b,c,d,e)
return!1},
nH(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.a7(a3,a4.x,a5,a6.x,a7))return!1
s=a4.y
r=a6.y
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.a7(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.a7(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.a7(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.a7(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
qt(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.eo(a,b,r[o])
return A.nA(a,p,null,c,d.y,e)}return A.nA(a,b.y,null,c,d.y,e)},
nA(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.a7(a,b[s],d,e[s],f))return!1
return!0},
qy(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.a7(a,r[s],c,q[s],e))return!1
return!0},
d4(a){var s=a.w,r=!0
if(!(a===t.b||a===t.T))if(!A.cj(a))if(s!==6)r=s===7&&A.d4(a.x)
return r},
cj(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
nz(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
ki(a){return a>0?new Array(a):v.typeUniverse.sEA},
b3:function b3(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
he:function he(){this.c=this.b=this.a=null},
kg:function kg(a){this.a=a},
hc:function hc(){},
ek:function ek(a){this.a=a},
pK(){var s,r,q
if(self.scheduleImmediate!=null)return A.qQ()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.d2(new A.jT(s),1)).observe(r,{childList:true})
return new A.jS(s,r,q)}else if(self.setImmediate!=null)return A.qR()
return A.qS()},
pL(a){self.scheduleImmediate(A.d2(new A.jU(t.M.a(a)),0))},
pM(a){self.setImmediate(A.d2(new A.jV(t.M.a(a)),0))},
pN(a){t.M.a(a)
A.pX(0,a)},
pX(a,b){var s=new A.ke()
s.ef(a,b)
return s},
me(a){return new A.h2(new A.a3($.W,a.h("a3<0>")),a.h("h2<0>"))},
ma(a,b){a.$2(0,null)
b.b=!0
return b.a},
m7(a,b){A.qa(a,b)},
m9(a,b){b.c_(a)},
m8(a,b){b.c0(A.bh(a),A.bB(a))},
qa(a,b){var s,r,q=new A.kk(b),p=new A.kl(b)
if(a instanceof A.a3)a.d5(q,p,t.A)
else{s=t.A
if(a instanceof A.a3)a.dQ(q,p,s)
else{r=new A.a3($.W,t.e)
r.a=8
r.c=a
r.d5(q,p,s)}}},
mh(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.W.dM(new A.kG(s),t.H,t.S,t.A)},
ns(a,b,c){return 0},
lF(a){var s
if(t.Q.b(a)){s=a.gaZ()
if(s!=null)return s}return B.a3},
qo(a,b){if($.W===B.J)return null
return null},
qp(a,b){if($.W!==B.J)A.qo(a,b)
if(b==null)if(t.Q.b(a)){b=a.gaZ()
if(b==null){A.n1(a,B.a3)
b=B.a3}}else b=B.a3
else if(t.Q.b(a))A.n1(a,b)
return new A.aQ(a,b)},
m_(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.e;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.pt()
b.bJ(new A.aQ(new A.b6(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.cT(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.bk()
b.bg(o.a)
A.cS(b,p)
return}b.a^=2
A.hE(null,null,b.b,t.M.a(new A.k1(o,b)))},
cS(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.mf(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.cS(d.a,c)
q.a=l
k=l.a}p=d.a
j=p.c
q.b=n
q.c=j
if(o){i=c.c
i=(i&1)!==0||(i&15)===8}else i=!0
if(i){h=c.b.b
if(n){p=p.b===h
p=!(p||p)}else p=!1
if(p){s.a(j)
A.mf(j.a,j.b)
return}g=$.W
if(g!==h)$.W=h
else g=null
c=c.c
if((c&15)===8)new A.k5(q,d,n).$0()
else if(o){if((c&1)!==0)new A.k4(q,j).$0()}else if((c&2)!==0)new A.k3(d,q).$0()
if(g!=null)$.W=g
c=q.c
if(c instanceof A.a3){p=q.a.$ti
p=p.h("bF<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.bl(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.m_(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.bl(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
qF(a,b){var s
if(t.D.b(a))return b.dM(a,t.A,t.K,t.l)
s=t.x
if(s.b(a))return s.a(a)
throw A.b(A.Z(a,"onError",u.c))},
qD(){var s,r
for(s=$.d_;s!=null;s=$.d_){$.ex=null
r=s.b
$.d_=r
if(r==null)$.ew=null
s.a.$0()}},
qL(){$.md=!0
try{A.qD()}finally{$.ex=null
$.md=!1
if($.d_!=null)$.mv().$1(A.nS())}},
nO(a){var s=new A.h3(a),r=$.ew
if(r==null){$.d_=$.ew=s
if(!$.md)$.mv().$1(A.nS())}else $.ew=r.b=s},
qI(a){var s,r,q,p=$.d_
if(p==null){A.nO(a)
$.ex=$.ew
return}s=new A.h3(a)
r=$.ex
if(r==null){s.b=p
$.d_=$.ex=s}else{q=r.b
s.b=q
$.ex=r.b=s
if(q==null)$.ew=s}},
rF(a,b){A.bS(a,"stream",t.K)
return new A.hu(b.h("hu<0>"))},
mf(a,b){A.qI(new A.kF(a,b))},
nM(a,b,c,d,e){var s,r=$.W
if(r===c)return d.$0()
$.W=c
s=r
try{r=d.$0()
return r}finally{$.W=s}},
qH(a,b,c,d,e,f,g){var s,r=$.W
if(r===c)return d.$1(e)
$.W=c
s=r
try{r=d.$1(e)
return r}finally{$.W=s}},
qG(a,b,c,d,e,f,g,h,i){var s,r=$.W
if(r===c)return d.$2(e,f)
$.W=c
s=r
try{r=d.$2(e,f)
return r}finally{$.W=s}},
hE(a,b,c,d){t.M.a(d)
if(B.J!==c){d=c.fc(d)
d=d}A.nO(d)},
jT:function jT(a){this.a=a},
jS:function jS(a,b,c){this.a=a
this.b=b
this.c=c},
jU:function jU(a){this.a=a},
jV:function jV(a){this.a=a},
ke:function ke(){},
kf:function kf(a,b){this.a=a
this.b=b},
h2:function h2(a,b){this.a=a
this.b=!1
this.$ti=b},
kk:function kk(a){this.a=a},
kl:function kl(a){this.a=a},
kG:function kG(a){this.a=a},
bx:function bx(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
bQ:function bQ(a,b){this.a=a
this.$ti=b},
aQ:function aQ(a,b){this.a=a
this.b=b},
h7:function h7(){},
e5:function e5(a,b){this.a=a
this.$ti=b},
c8:function c8(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
a3:function a3(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
jZ:function jZ(a,b){this.a=a
this.b=b},
k2:function k2(a,b){this.a=a
this.b=b},
k1:function k1(a,b){this.a=a
this.b=b},
k0:function k0(a,b){this.a=a
this.b=b},
k_:function k_(a,b){this.a=a
this.b=b},
k5:function k5(a,b,c){this.a=a
this.b=b
this.c=c},
k6:function k6(a,b){this.a=a
this.b=b},
k7:function k7(a){this.a=a},
k4:function k4(a,b){this.a=a
this.b=b},
k3:function k3(a,b){this.a=a
this.b=b},
h3:function h3(a){this.a=a
this.b=null},
hu:function hu(a){this.$ti=a},
et:function et(){},
ho:function ho(){},
kc:function kc(a,b){this.a=a
this.b=b},
kF:function kF(a,b){this.a=a
this.b=b},
m0(a,b){var s=a[b]
return s===a?null:s},
m2(a,b,c){if(c==null)a[b]=a
else a[b]=c},
m1(){var s=Object.create(null)
A.m2(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
oG(a,b){return new A.bk(a.h("@<0>").Y(b).h("bk<1,2>"))},
lM(a,b,c){return b.h("@<0>").Y(c).h("mN<1,2>").a(A.r2(a,new A.bk(b.h("@<0>").Y(c).h("bk<1,2>"))))},
a5(a,b){return new A.bk(a.h("@<0>").Y(b).h("bk<1,2>"))},
lN(a){return new A.b5(a.h("b5<0>"))},
ag(a){return new A.b5(a.h("b5<0>"))},
dz(a,b){return b.h("mO<0>").a(A.r3(a,new A.b5(b.h("b5<0>"))))},
m3(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
ka(a,b,c){var s=new A.cb(a,b,c.h("cb<0>"))
s.c=a.e
return s},
oH(a,b,c){var s=A.oG(b,c)
a.b4(0,new A.iu(s,b,c))
return s},
oI(a,b){var s,r,q=A.lN(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r)q.i(0,b.a(a[r]))
return q},
lO(a,b){var s=A.lN(b)
s.G(0,a)
return s},
iv(a){var s,r
if(A.mn(a))return"{...}"
s=new A.fP("")
try{r={}
B.b.i($.aO,a)
s.a+="{"
r.a=!0
a.b4(0,new A.iw(r,s))
s.a+="}"}finally{if(0>=$.aO.length)return A.c($.aO,-1)
$.aO.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
q7(){throw A.b(A.bd("Cannot change an unmodifiable set"))},
e8:function e8(){},
eb:function eb(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
e9:function e9(a,b){this.a=a
this.$ti=b},
ea:function ea(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
b5:function b5(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hh:function hh(a){this.a=a
this.c=this.b=null},
cb:function cb(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
iu:function iu(a,b,c){this.a=a
this.b=b
this.c=c},
I:function I(){},
c2:function c2(){},
iw:function iw(a,b){this.a=a
this.b=b},
ep:function ep(){},
cB:function cB(){},
e1:function e1(){},
br:function br(){},
eh:function eh(){},
hx:function hx(){},
e2:function e2(a,b){this.a=a
this.$ti=b},
cY:function cY(){},
eq:function eq(){},
rb(a){var s=A.p1(a,null)
if(s!=null)return s
throw A.b(new A.i8(a))},
ot(a,b){a=A.a1(a,new Error())
if(a==null)a=A.ev(a)
a.stack=b.j(0)
throw a},
c1(a,b,c,d){var s,r=c?J.mK(a,d):J.mJ(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
bo(a,b,c){var s,r=A.d([],c.h("r<0>"))
for(s=J.ad(a);s.p();)B.b.i(r,c.a(s.gq()))
if(b)return r
r.$flags=1
return r},
ai(a,b){var s,r
if(Array.isArray(a))return A.d(a.slice(0),b.h("r<0>"))
s=A.d([],b.h("r<0>"))
for(r=J.ad(a);r.p();)B.b.i(s,r.gq())
return s},
aw(a,b){var s=A.bo(a,!1,b)
s.$flags=3
return s},
n9(a,b,c){var s=J.ad(b)
if(!s.p())return a
if(c.length===0){do a+=A.m(s.gq())
while(s.p())}else{a+=A.m(s.gq())
while(s.p())a=a+c+A.m(s.gq())}return a},
pt(){return A.bB(new Error())},
oq(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
mF(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
eS(a){if(a>=10)return""+a
return"0"+a},
i1(a){if(typeof a=="number"||A.mc(a)||a==null)return J.ck(a)
if(typeof a=="string")return JSON.stringify(a)
return A.n0(a)},
ou(a,b){A.bS(a,"error",t.K)
A.bS(b,"stackTrace",t.l)
A.ot(a,b)},
eD(a){return new A.eC(a)},
f(a,b){return new A.b6(!1,null,b,a)},
Z(a,b,c){return new A.b6(!0,a,b,c)},
n4(a){var s=null
return new A.cJ(s,s,!1,s,s,a)},
aM(a,b,c,d,e){return new A.cJ(b,c,!0,a,d,"Invalid value")},
ph(a,b,c){if(0>a||a>c)throw A.b(A.aM(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.aM(b,a,c,"end",null))
return b}return c},
jd(a,b){if(a<0)throw A.b(A.aM(a,0,null,b,null))
return a},
io(a,b,c,d){return new A.f6(b,!0,a,d,"Index out of range")},
bd(a){return new A.e3(a)},
nd(a){return new A.fU(a)},
n(a){return new A.cN(a)},
aR(a){return new A.eP(a)},
oA(a,b,c){var s,r
if(A.mn(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.d([],t.s)
B.b.i($.aO,a)
try{A.qC(a,s)}finally{if(0>=$.aO.length)return A.c($.aO,-1)
$.aO.pop()}r=A.n9(b,t.e7.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
lJ(a,b,c){var s,r
if(A.mn(a))return b+"..."+c
s=new A.fP(b)
B.b.i($.aO,a)
try{r=s
r.a=A.n9(r.a,a,", ")}finally{if(0>=$.aO.length)return A.c($.aO,-1)
$.aO.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
qC(a,b){var s,r,q,p,o,n,m,l=a.gJ(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.p())return
s=A.m(l.gq())
B.b.i(b,s)
k+=s.length+2;++j}if(!l.p()){if(j<=5)return
if(0>=b.length)return A.c(b,-1)
r=b.pop()
if(0>=b.length)return A.c(b,-1)
q=b.pop()}else{p=l.gq();++j
if(!l.p()){if(j<=4){B.b.i(b,A.m(p))
return}r=A.m(p)
if(0>=b.length)return A.c(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gq();++j
for(;l.p();p=o,o=n){n=l.gq();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.c(b,-1)
k-=b.pop().length+2;--j}B.b.i(b,"...")
return}}q=A.m(p)
r=A.m(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.c(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.i(b,m)
B.b.i(b,q)
B.b.i(b,r)},
c3(a,b,c,d,e,f){var s
if(B.p===c){s=J.X(a)
b=J.X(b)
return A.fR(A.aa(A.aa($.ez(),s),b))}if(B.p===d){s=J.X(a)
b=J.X(b)
c=J.X(c)
return A.fR(A.aa(A.aa(A.aa($.ez(),s),b),c))}if(B.p===e){s=J.X(a)
b=J.X(b)
c=J.X(c)
d=J.X(d)
return A.fR(A.aa(A.aa(A.aa(A.aa($.ez(),s),b),c),d))}if(B.p===f){s=J.X(a)
b=J.X(b)
c=J.X(c)
d=J.X(d)
e=J.X(e)
return A.fR(A.aa(A.aa(A.aa(A.aa(A.aa($.ez(),s),b),c),d),e))}s=J.X(a)
b=J.X(b)
c=J.X(c)
d=J.X(d)
e=J.X(e)
f=J.X(f)
f=A.fR(A.aa(A.aa(A.aa(A.aa(A.aa(A.aa($.ez(),s),b),c),d),e),f))
return f},
pq(a,b){return new A.e2(A.lO(a,b),b.h("e2<0>"))},
bX:function bX(a,b,c){this.a=a
this.b=b
this.c=c},
jW:function jW(){},
S:function S(){},
eC:function eC(a){this.a=a},
bs:function bs(){},
b6:function b6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cJ:function cJ(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
f6:function f6(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
e3:function e3(a){this.a=a},
fU:function fU(a){this.a=a},
cN:function cN(a){this.a=a},
eP:function eP(a){this.a=a},
fr:function fr(){},
dY:function dY(){},
jX:function jX(a){this.a=a},
i8:function i8(a){this.a=a},
p:function p(){},
ap:function ap(a,b,c){this.a=a
this.b=b
this.$ti=c},
a8:function a8(){},
z:function z(){},
hv:function hv(){},
fP:function fP(a){this.a=a},
iF:function iF(a){this.a=a},
B(a){var s
if(typeof a=="function")throw A.b(A.f("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.qb,a)
s[$.lC()]=a
return s},
qb(a,b,c){t.Z.a(a)
if(A.e(c)>=1)return a.$1(b)
return a.$0()},
qc(a,b,c,d){t.Z.a(a)
A.e(d)
if(d>=2)return a.$2(b,c)
if(d===1)return a.$1(b)
return a.$0()},
nU(a,b,c){return c.a(a[b])},
nG(a,b){return a[b]},
an(a,b,c,d){return d.a(a[b].apply(a,c))},
rh(a,b){var s=new A.a3($.W,b.h("a3<0>")),r=new A.e5(s,b.h("e5<0>"))
a.then(A.d2(new A.ls(r,b),1),A.d2(new A.lt(r),1))
return s},
nL(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
bT(a){if(A.nL(a))return a
return new A.kK(new A.eb(t.mp)).$1(a)},
ls:function ls(a,b){this.a=a
this.b=b},
lt:function lt(a){this.a=a},
kK:function kK(a){this.a=a},
hg:function hg(){},
cd:function cd(){this.b=this.a=0},
jg:function jg(a){this.z=a},
cI:function cI(a,b){this.a=a
this.b=b},
aL:function aL(a,b){this.a=a
this.b=b},
eQ:function eQ(a,b){this.a=a
this.b=b
this.d=!1},
eR:function eR(){this.a=null
this.d=0
this.e=!1},
fx(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){return new A.fw(f,b,l,d,a4,g,i,o,n,m,j,e,c,a,q,h,r,a3,a2,a1,s,a0,!1,p)},
mX(){return A.fx(0,0.3,0,0,0,1.15,0.08,8,0,1,!1,0.75,0,0,0,B.aF,0,0,0,0,0,0,0,0.22)},
cP:function cP(a,b){this.a=a
this.b=b},
fw:function fw(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.CW=r
_.cx=s
_.cy=a0
_.db=a1
_.dx=a2
_.dy=a3
_.fr=a4},
mB(a,b,c,d,e,f,g,h){return new A.db(g,f,h,b,d,e,c,a)},
eK(a,b,c,d,e,f,g){var s,r,q,p
if(!d.gK(0)||d.gO()<1e-12)throw A.b(A.f("CameraView.look requires a finite, nonzero forward: "+d.j(0),null))
if(!isFinite(e)||e<=0||e>=3.141592653589793)throw A.b(A.f("CameraView.look requires 0 < fovYRadians < pi: "+A.m(e),null))
s=d.gm()
if(g.S(s).gO()<1e-12)throw A.b(A.f("CameraView.look requires up ("+g.j(0)+") not parallel to forward ("+d.j(0)+")",null))
r=A.mQ(b,s,g)
q=A.mR(a,c,e,f)
p=A.mB(a,b,c,s,f,q,r,q.k(0,r))
p.n()
return p},
mC(a,b,c,d,e,f,g){var s=f.M(0,b)
if(s.gO()<1e-12)throw A.b(A.f("CameraView.lookAt requires target ("+f.j(0)+") distinct from eye ("+b.j(0)+")",null))
return A.eK(a,b,c,s,d,e,g)},
db:function db(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.z=_.y=_.x=$},
dX:function dX(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.CW=r
_.cx=s
_.cy=a0
_.db=a1},
jv:function jv(a){this.a=a},
eY:function eY(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.CW=r
_.cx=s
_.cy=a0
_.db=a1
_.dx=a2
_.dy=a3
_.fr=a4
_.fx=a5
_.fy=a6
_.go=a7
_.id=a8
_.k1=a9
_.k2=b0
_.k3=b1
_.k4=b2},
ia:function ia(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=f},
ib:function ib(){this.b=this.a=0},
bG(a,b){return new A.im(a,b)},
bp:function bp(){},
aJ:function aJ(a,b,c){this.a=a
this.b=b
this.c=c},
aE:function aE(a,b,c){this.a=a
this.b=b
this.c=c},
b2:function b2(a,b,c){this.a=a
this.b=b
this.c=c},
fu:function fu(a,b,c){this.a=a
this.b=b
this.c=c},
b8:function b8(a,b,c){this.a=a
this.b=b
this.c=c},
cy:function cy(a,b){this.a=a
this.b=b},
im:function im(a,b){this.a=a
this.b=b},
kH(a,b,c,d){return A.qU(a,b,c,d)},
qU(a,b,a0,a1){var s=0,r=A.me(t.gn),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c
var $async$kH=A.mh(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:d=b.length
if(d===0)throw A.b(A.f("bootstrapRenderer requires a non-empty profile ladder",null))
a1.n()
n=A.d([],t.ng)
m=0
i=d-1
h=t.oe
case 3:g=m
if(typeof g!=="number"){q=g.dX()
s=1
break}if(!(g<d)){s=4
break}l=B.b.B(b,m)
k=a.$1(l)
if(k.a!==l)throw A.b(A.f("configurationFor("+l.a.b+") returned a configuration for "+k.a.a.b+". The mapping must be total and faithful, or the renderer runs a graph the host did not choose.",null))
p=6
s=9
return A.m7(a0.fQ(k,a1),$async$kH)
case 9:J.d6(n,new A.cH(l,null))
f=A.bo(n,!1,h)
f.$flags=3
g=new A.eI()
q=g
s=1
break
p=2
s=8
break
case 6:p=5
c=o.pop()
j=A.bh(c)
J.d6(n,new A.cH(l,j))
if(J.aP(m,i))throw c
s=8
break
case 5:s=2
break
case 8:g=m
if(typeof g!=="number"){q=g.u()
s=1
break}m=g+1
s=3
break
case 4:throw A.b(A.n("bootstrapRenderer exhausted its ladder without a result"))
case 1:return A.m9(q,r)
case 2:return A.m8(o.at(-1),r)}})
return A.ma($async$kH,r)},
r0(a){var s,r,q=B.b.cc(B.aq,new A.kL(a))
if(q>=0)return A.aw(B.b.e6(B.aq,q),t.q)
s=t.q
r=A.dz([a],s)
r.G(0,B.aq)
return A.aw(r,s)},
cH:function cH(a,b){this.a=a
this.b=b},
eI:function eI(){},
kL:function kL(a){this.a=a},
rk(a,b,c,d){var s,r,q,p,o,n,m=A.d([],t.gf)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.b.i(m,new A.cV(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.b.ak(m,new A.lv())
s=A.d([],t.w)
for(r=A.fQ(m,0,A.bS(b,"count",t.S),t.jX),q=r.$ti,r=new A.ah(r,r.gv(0),q.h("ah<P.E>")),q=q.h("P.E");r.p();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
rj(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=J.iq(a.slice(0),A.H(a).c)
if(f.length<=4)return f
s=A.d([],t.pb)
for(r=f.length,q=b.a,p=b.b,o=b.c,n=0;n<f.length;f.length===r||(0,A.A)(f),++n){m=f[n]
l=m.b
k=l.a-q
j=l.b-p
l=l.c-o
i=m.c
h=m.e
B.b.i(s,new A.cV(m.d*h*h*Math.max(Math.max(i.a,Math.max(i.b,i.c)),0.000001)/(1+(k*k+j*j+l*l)),m))}B.b.ak(s,new A.lu())
r=A.d([],t.h)
for(q=A.fQ(s,0,A.bS(4,"count",t.S),t.eJ),p=q.$ti,q=new A.ah(q,q.gv(0),p.h("ah<P.E>")),p=p.h("P.E");q.p();){g=q.d
r.push((g==null?p.a(g):g).b)}return r},
v:function v(a,b,c){this.a=a
this.b=b
this.c=c},
ct:function ct(a,b,c){this.a=a
this.b=b
this.c=c},
aC:function aC(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
aD:function aD(){},
lv:function lv(){},
lu:function lu(){},
J(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0){return new A.aq(k,c,b,a6,a5,a4,j,i,q,o,p,a0,s,a3,n,r,g,f,m,l,a9,b0,a7,a8,e,d,!1,!0,!1,!1)},
lP(a,b,c){var s=null
return A.J(!1,B.i,s,0.5,B.o,0.2,0.3,!1,0,s,b,0,s,0,B.e,1,s,1,B.e,s,!1,!0,c,a.c,a.b,a.a,0,0,1,1)},
mS(a,b,c,d){var s=null
return A.J(!1,B.i,s,0.5,B.o,0.08,a,!1,0,s,c,0,s,0,B.e,1,s,1,B.e,s,!1,!0,d,b.c,b.b,b.a,0,0,1,1)},
ff(a,b){if(!isFinite(b)||b<0||b>1)throw A.b(A.f("MaterialDefinition."+a+" must be in [0, 1]: "+A.m(b),null))},
d7:function d7(a,b){this.a=a
this.b=b},
fg:function fg(a,b){this.a=a
this.b=b},
aq:function aq(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.CW=r
_.cx=s
_.cy=a0
_.db=a1
_.dx=a2
_.dy=a3
_.fr=a4
_.fx=a5
_.fy=a6
_.go=a7
_.id=a8
_.k1=a9
_.k2=b0},
oK(a){A:{break A}return a},
bv:function bv(a,b){this.a=a
this.b=b},
as:function as(a,b,c){this.a=a
this.b=b
this.c=c},
jK:function jK(){},
jL:function jL(){},
ba:function ba(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iz:function iz(){},
iA:function iA(){},
iB:function iB(){},
i_:function i_(){},
iI(a){var s,r,q="volumetric",p=t.N,o=A.dz(["sceneColor","present"],p),n=a.a.b
if(n.A(0,"shadows"))o.G(0,A.dz(["shadowMap","sceneDepth"],p))
if(n.A(0,q)){o.i(0,"volumetricLight")
o.i(0,"sceneColor#"+(a.d>1?2:1))}if(n.A(0,"ssao"))o.G(0,A.dz(["ssaoRaw","ssaoBlurred"],p))
if(n.A(0,"bloom")){if(a.d>1)s=n.A(0,q)?3:2
else s=n.A(0,q)?2:1
o.G(0,A.dz(["bloomBlurH","bloomBlurV","sceneColor#"+s],p))}if(a.d>1)o.i(0,"sceneColor#1")
if(n.A(0,"dof"))o.G(0,A.dz(["dofBlurH","dofBlurV","dofOutput"],p))
if(n.A(0,"grade"))o.i(0,"gradeOutput")
if(n.A(0,"ps1"))o.i(0,"ps1Output")
r=n.A(0,"vhs")
if(r)o.i(0,"vhsOutput")
return new A.iH(A.pq(o,p),r)},
iH:function iH(a,b){this.a=a
this.b=b},
iJ:function iJ(){},
j4:function j4(a){this.b=a},
dT:function dT(){this.a=null
this.c=0
this.d=!1},
dm:function dm(a,b){this.a=a
this.b=b},
eG:function eG(a,b){this.a=a
this.b=b},
bq:function bq(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=i},
na(a,b,c,d,e){var s,r
if(!isFinite(c)||c<=0)throw A.b(A.f("SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: "+A.m(c),null))
if(!isFinite(d)||d<=0)throw A.b(A.f("SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: "+A.m(d),null))
s=c>d?d:c
r=new A.jA(b,a,B.a.C(b*s),B.a.C(a*s),s,!0)
r.n()
return r},
jA:function jA(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hV:function hV(a,b){this.a=a
this.b=b},
dQ:function dQ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
cK:function cK(a,b){this.a=a
this.b=b},
a2:function a2(a,b,c){this.a=a
this.b=b
this.d=c},
ic:function ic(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.w=f},
oJ(){return new A.fh(new A.bb(new A.iy(),A.d([],t.dz),A.d([],t.t),t.kk))},
fh:function fh(a){this.a=a},
iy:function iy(){},
nP(a){var s=4
switch(a.a){case 0:s=0
break
case 1:s=1
break
case 2:s=2
break
case 4:s=3
break
case 5:break
case 6:s=5
break
case 7:s=6
break
case 8:break
case 3:s=A.l(A.bd("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
qd(a,b,c){var s,r,q
for(s=0,r=0;r<7;++r){q=B.T[r]
if(A.nP(q.a)===b)s+=q.c}return s},
oL(a){return new A.iC(a,new A.bb(new A.iD(),A.d([],t.bR),A.d([],t.t),t.ll),A.a5(t.S,t.mL))},
mT(a){var s
A:{s=a.byteLength
break A}return s},
fW:function fW(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
iC:function iC(a,b,c){this.a=a
this.b=b
this.c=c},
iD:function iD(){},
iE:function iE(){},
pu(a){var s=new A.fT(a,new A.bb(new A.jE(),A.d([],t.mQ),A.d([],t.t),t.ox),A.a5(t.S,t.j))
s.d=s.af($.mu())
s.e=s.af($.mq())
s.f=s.af($.mr())
s.r=s.af($.ms())
s.w=s.af($.mt())
return s},
be:function be(a,b,c){this.a=a
this.b=b
this.c=c},
fT:function fT(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
jE:function jE(){},
jG:function jG(){},
jF:function jF(){},
ps(a,b,c,d,e){var s,r,q
if(c)return B.f6
if(d)return B.f0
s=A.n7(b,e)
if(Math.abs(s)<0.5&&a>=0.2617993877991494)return B.fa
r=s<0
if(a>=0.2617993877991494)return r?B.bm:B.fb
if(a>=0.10471975511965977)return r?B.bm:B.fc
if(a>=-0.014538592669112763)return r?B.f9:B.fd
q=a*180/3.141592653589793
if(q>=-6)return r?B.f8:B.f2
if(q>=-12)return r?B.f7:B.f3
if(q>=-18)return r?B.f1:B.f4
return B.f5},
n8(a,b,c){var s
if(b<=a)return c<a?0:1
s=B.a.l((c-a)/(b-a),0,1)
return s*s*(3-2*s)},
n7(a,b){var s=a-b
while(s>12)s-=24
while(s<-12)s+=24
return s},
am:function am(a,b){this.a=a
this.b=b},
jw:function jw(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.r=e
_.x=f},
rl(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b.gK(0)
if(!i)throw A.b(A.f("invalid volumetric source selection inputs",null))
s=A.ag(t.N)
r=A.d([],t.fA)
for(q=0;!1;++q){p=c[q]
p.n()
if(!s.i(0,p.gN()))throw A.b(A.f("duplicate volumetric source id: "+A.m(p.gN()),null))
o=p.gaP().M(0,b).length
i=p.ghF()
n=A.py(p.ghB(),o,i)
i=p.gde().gbB()
m=p.gde().gbC()
l=p.gde().gbD()
l=Math.max(A.ch(m),A.ch(l))
k=Math.max(A.ch(i),l)
B.b.i(r,new A.eg(p.ghE().k(0,k).k(0,n),p))}B.b.ak(r,new A.lw())
i=A.d([],t.k5)
for(m=A.fQ(r,0,A.bS(a,"count",t.S),t.nA),l=m.$ti,m=new A.ah(m,m.gv(0),l.h("ah<P.E>")),l=l.h("P.E");m.p();){j=m.d
i.push((j==null?l.a(j):j).b)}return i},
py(a,b,c){var s,r,q,p,o,n
for(s=[new A.F("distance",b),new A.F("referenceDistance",c),new A.F("cutoffDistance",a)],r=0;r<3;++r){q=s[r]
p=q.b
if(!isFinite(p))A.l(A.f(q.a+" must be finite: "+A.m(p),null))}if(b.dX(0,0)||c.aW(0,0)||a.aW(0,0))throw A.b(A.f("invalid inverse-square attenuation inputs",null))
if(b.dT(0,a))return 0
s=c.k(0,c)
q=c.k(0,c)
o=b.k(0,b)
n=s.aH(0,Math.max(A.ch(q),A.ch(o)))
o=b.aH(0,a)
A.ch(o)
return n.k(0,1-Math.pow(o,4)).l(0,0,1).hG(0)},
lw:function lw(){},
hP:function hP(){this.b=this.a=0
this.x=1},
hQ:function hQ(a){this.a=a},
oh(a,b,c,d,e){var s=new A.eL(A.aw(e,t.f),!0,c,a,b,B.h,B.h)
s.ec(a,b,c,300,!0,0.1,e)
return s},
aA:function aA(a,b,c){this.a=a
this.b=b
this.c=c},
eL:function eL(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.x=_.w=$
_.y=0
_.z=!0
_.as=f
_.at=g
_.ax=1},
hT:function hT(){},
hU:function hU(){},
bZ:function bZ(a,b,c,d){var _=this
_.a=a
_.c=_.b=0
_.d=b
_.y=c
_.z=d},
mU(a,b){return new A.bK(b,a,a,b)},
bK:function bK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=0
_.d=0.3
_.as=!1
_.at=0.5
_.ax=0
_.ay=0.3
_.ch=c
_.CW=d},
cM:function cM(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.z=0
_.Q=0.25
_.as=g
_.at=h
_.ax=!1},
qT(a){var s,r,q,p,o,n,m,l,k,j=A.d([],t.og),i=A.a5(t.N,t.S)
for(s=a.length,r=t.bH,q=0;q<a.length;a.length===s||(0,A.A)(a),++q){p=a[q]
o=p.gt().y
if(o==null){B.b.i(j,new A.bj(p,A.d([p],r)))
continue}n=""+p.gt().a.a+":"+p.gt().b.a+":"+A.m(o)
m=i.B(0,n)
if(m==null){i.E(0,n,j.length)
B.b.i(j,new A.bj(p,A.d([p],r)))}else{l=j.length
if(m>>>0!==m||m>=l)return A.c(j,m)
k=j[m].b
if(k.length>=16){i.E(0,n,l)
B.b.i(j,new A.bj(p,A.d([p],r)))}else B.b.i(k,p)}}return j},
bj:function bj(a,b){this.a=a
this.b=b},
eW:function eW(a){this.a=a},
i4:function i4(){},
i5:function i5(a){this.a=a},
i2:function i2(a){this.a=a},
i3:function i3(a){this.a=a},
eX:function eX(a,b){this.a=a
this.b=b},
cw:function cw(a,b){this.a=a
this.b=b},
eZ:function eZ(a,b){this.a=a
this.b=b
this.c=0},
pO(){return new A.cT()},
i9:function i9(a){this.a=a
this.b=null},
cT:function cT(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
lQ(){return!0},
Q:function Q(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
iP:function iP(){},
iQ:function iQ(){},
b0:function b0(a,b){this.a=a
this.b=b},
ao:function ao(a,b,c){this.a=a
this.b=b
this.c=c},
fC:function fC(a,b){this.a=a
this.b=b},
bi:function bi(a,b){this.a=a
this.b=b},
Y:function Y(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dS:function dS(a,b){this.a=a
this.b=b},
q:function q(a,b){this.a=a
this.b=b},
dg:function dg(a){this.b=a},
jc:function jc(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=_.d=0},
ae:function ae(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
jh:function jh(){},
a9:function a9(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.r=f},
jj:function jj(a,b){this.a=a
this.b=b},
jo:function jo(){},
jn:function jn(){},
jm:function jm(){},
jl:function jl(a){this.a=a},
jk:function jk(a,b,c){this.a=a
this.b=b
this.c=c},
ji:function ji(a,b){this.a=a
this.b=b},
pm(a){return new A.dP(a,new A.bb(new A.jp(),A.d([],t.fS),A.d([],t.t),t.ml),A.a5(t.hL,t.lX))},
bO:function bO(a,b,c){this.a=a
this.b=b
this.c=c},
dP:function dP(a,b,c){this.a=a
this.b=b
this.c=c},
jp:function jp(){},
nE(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.qf(a,r,s,a.x.gq().a.b.a).b},
qf(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.kB(a),j=new A.kC(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.A(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.qV(b,h,B.ak,i,s.gh8(),new A.km(j),new A.kn(j),new A.ko(a),new A.kt(a),new A.ku(a),new A.kv(j),new A.kw(j),s.gha(),new A.kx(a),s.ghe(),r.ghc(),k,s.ghg(),s.ghi(),new A.ky(j,c),new A.kz(j),new A.kA(j),new A.kp(j),new A.kq(j),new A.kr(a),new A.ks(j),e,f,g,512)}else{p=new A.Y(l,B.y,g,f,e,0)
o=new A.Y(l,B.y,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.dC(h,p,o):null
k=A.d([new A.h1(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nout vec4 oColor;\nvoid main(){\n  // A double-sided surface seen from behind faces the other way; single-\n  // sided materials cull back faces, so this only affects double-sided ones.\n  vec3 n=normalize(vNormal)*(gl_FrontFacing?1.0:-1.0);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+\n    vec3(ndotl)*uDirectLightScale,0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.o5)
if(n!=null)k.push(n)
k.push(new A.dM(b,u.l,u.m,h,i,B.ak))
q=new A.eW(k)}a.r.toString
m=q.ff(B.aa,new A.jh(),!1,new A.hl())
k=m.a.b
if(k.length!==0)throw A.b(A.n("safe renderer graph is invalid: "+A.m(k)))
return new A.kd(q,m)},
qg(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.b(A.n("renderer graph is not initialized"))
s=b7.c
s=A.ai(new A.b1(s,A.y(s).h("b1<2>")),t.Y)
for(r=0;r<b9.length;++r){q=b9[r]
p=b6.w.a.b
o=p.$ti
n=o.c.a(q.a)
p.aq(n)
p=p.b
n=n.a
if(!(n>=0&&n<p.length))return A.c(p,n)
n=p[n].c
p=(n==null?o.y[1].a(n):n).d
o=q.c.ae()
p=p.gaC()
n=A.H(p)
B.b.i(s,new A.hw(new A.b8((r|1073741824)>>>0,0,"transient"),q,A.cl(new A.O(p,n.h("a(1)").a(o.gaG()),n.h("O<1,a>")))))}p=b8.a
m=A.qY(A.mG(p.c),s,b8.d)
for(o=s.length,l=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gt().a
j=b6.w.a
i=n.a
h=j.c.B(0,i)
if(h==null)A.l(A.bG(B.a7,n))
j=j.b
g=j.$ti
j.aq(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.c(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
l+=B.d.a0(n>0?n:h.e,3)}for(s=m.a,o=s.length,f=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gt().a
j=b6.w.a
i=n.a
h=j.c.B(0,i)
if(h==null)A.l(A.bG(B.a7,n))
j=j.b
g=j.$ti
j.aq(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.c(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
f+=B.d.a0(n>0?n:h.e,3)}o=t.N
n=A.a5(o,t.a1)
e=new A.i9(n)
e.fa("cull")
j=l-f
d=e.b
if(d==null)A.l(A.n("cull recorded outside an active frame"))
if(j<0)A.l(A.f("cull totals must be non-negative",null))
c=n.B(0,d)
c.c+=j
c.e+=m.b.b
b=A.d([],t.mX)
a=A.d([],t.ao)
for(i=s.length,g=t.k,a0=p.a,a1=t.d,k=0;k<s.length;s.length===i||(0,A.A)(s),++k){a2=s[k]
if(a2.gt().e===B.w)B.b.i(a,new A.a6(new A.az(a0.ai(a2.gt().c.a).c,a2.gN().a),a2,a1))
else B.b.i(b,new A.a6(new A.aB(B.eu,a2.gt().b,a2.gt().a,a2.gN().a),a2,g))}a3=new A.hd(A.qT(A.rn(b)),A.rm(a),p,b8.b,b8.c)
a4=new A.eU(b6.a,e)
for(s=b4.b,p=s.length,i=t.kp,k=0;k<s.length;s.length===p||(0,A.A)(s),++k){a5=s[k]
g=a5.gt().a
if(g.length===0)A.l(A.Z(g,"passId",null))
e.b=g
n.b8(g,A.nT())
a6=A.a5(o,i)
for(g=a5.gt().c,a0=g.length,a7=0;a7<g.length;g.length===a0||(0,A.A)(g),++a7){a8=g[a7].a
a9=b5.c
if(a9==null)A.l(A.n("GPU resource adapter is not initialized"))
a1=a8.f
b0=a8.a
b1=a1===0?b0:b0+"#"+a1
b2=a9.b.B(0,b1)
if(b2==null)A.l(A.n("resource is not in candidate: "+b1))
b3=new A.cp(b2)
a6.E(0,b0+"#"+a1,b3)
a6.b8(b0,new A.kD(b3))}a5.Z(new A.eJ(a6,a4,new A.kE(b8,b6).$0(),a3))}return new A.jY(e,m,j)},
fD:function fD(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.w=f
_.x=!1},
jY:function jY(a,b,c){this.a=a
this.b=b
this.c=c},
hw:function hw(a,b,c){this.a=a
this.b=b
this.c=c},
kB:function kB(a){this.a=a},
kC:function kC(a,b){this.a=a
this.b=b},
kA:function kA(a){this.a=a},
kt:function kt(a){this.a=a},
ku:function ku(a){this.a=a},
kz:function kz(a){this.a=a},
ko:function ko(a){this.a=a},
kq:function kq(a){this.a=a},
kp:function kp(a){this.a=a},
ky:function ky(a,b){this.a=a
this.b=b},
km:function km(a){this.a=a},
kn:function kn(a){this.a=a},
kv:function kv(a){this.a=a},
kw:function kw(a){this.a=a},
kx:function kx(a){this.a=a},
ks:function ks(a){this.a=a},
kr:function kr(a){this.a=a},
kD:function kD(a){this.a=a},
kE:function kE(a,b){this.a=a
this.b=b},
kd:function kd(a,b){this.a=a
this.b=b},
hl:function hl(){},
hd:function hd(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
fF:function fF(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.ay=_.ax=_.at=_.as=_.Q=_.y=_.x=_.w=_.r=null
_.a$=f
_.b$=g},
jr:function jr(){},
js:function js(){},
jt:function jt(){},
hk:function hk(a){this.b=a},
k8:function k8(){},
hp:function hp(){},
fH:function fH(a,b){this.a=a
this.b=b},
rn(a){var s,r,q=A.ai(a,t.k)
B.b.ak(q,new A.lA())
s=A.H(q)
r=s.h("O<1,aU>")
s=A.ai(new A.O(q,s.h("aU(1)").a(new A.lB()),r),r.h("P.E"))
s.$flags=1
return s},
rm(a){var s,r,q=A.ai(a,t.d)
B.b.ak(q,new A.ly())
s=A.H(q)
r=s.h("O<1,aU>")
s=A.ai(new A.O(q,s.h("aU(1)").a(new A.lz()),r),r.h("P.E"))
s.$flags=1
return s},
aB:function aB(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
az:function az(a,b){this.a=a
this.b=b},
a6:function a6(a,b,c){this.a=a
this.b=b
this.$ti=c},
lA:function lA(){},
lB:function lB(){},
ly:function ly(){},
lz:function lz(){},
qY(a,b,c){var s,r,q,p,o,n,m,l=A.d([],t.bH)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.A)(b),++p){o=b[p];++r
if((o.gt().d&c)>>>0===0){++q
continue}n=o.gaU()
m=n.a
if(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)){n=n.b
n=isFinite(n.a)&&isFinite(n.b)&&isFinite(n.c)}else n=!1
if(!n)throw A.b(A.f("cullItems: non-finite world bounds for instance "+o.gN().j(0),null))
if(a.dP(o.gaU())===B.al){++q
continue}B.b.i(l,o)}return new A.hY(l,new A.hZ(q))},
hZ:function hZ(a){this.b=a},
hY:function hY(a,b){this.a=a
this.b=b},
lS(a){var s,r,q,p
if(a<=0)throw A.b(A.Z(a,"size","must be > 0"))
s=a*0.5
r=new A.ay(A.d([],t.n),A.d([],t.t))
q=new A.j5(r,1)
p=-s
q.$6(new A.a(p,p,s),new A.a(s,p,s),new A.a(s,s,s),new A.a(p,s,s),B.r,B.k)
q.$6(new A.a(s,p,p),new A.a(p,p,p),new A.a(p,s,p),new A.a(s,s,p),B.H,B.D)
q.$6(new A.a(p,s,s),new A.a(s,s,s),new A.a(s,s,p),new A.a(p,s,p),B.f,B.k)
q.$6(new A.a(p,p,p),new A.a(s,p,p),new A.a(s,p,s),new A.a(p,p,s),B.v,B.D)
q.$6(new A.a(s,p,s),new A.a(s,p,p),new A.a(s,s,p),new A.a(s,s,s),B.k,B.H)
q.$6(new A.a(p,p,p),new A.a(p,p,s),new A.a(p,s,s),new A.a(p,s,p),B.D,B.r)
return r.a9(new A.a4(new A.a(p,p,p),new A.a(s,s,s)))},
p2(a,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a2<=0||a<=0)throw A.b(A.f("dimensions must be > 0",null))
if(a0<1||a1<1)throw A.b(A.f("subdivisions must be >= 1",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.ay(s,q)
o=a2*0.5
n=a*0.5
for(s=-o,m=-n,l=0;l<=a1;++l){k=l/a1
j=m+k*a
for(i=0;i<=a0;++i){h=i/a0
p.H(new A.a(s+h*a2,0,j),B.f,B.k,new A.D(h,k))}}g=a0+1
for(l=0;l<a1;)for(f=l*g,++l,e=l*g,i=0;i<a0;++i){d=f+i
c=e+i
b=c+1
B.b.G(q,A.d([d,c,b,d,b,d+1],r))}return p.a9(new A.a4(new A.a(s,0,m),new A.a(o,0,n)))},
p3(a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(a6<=0)throw A.b(A.Z(a6,"radius","must be > 0"))
if(a7<2||a8<3)throw A.b(A.f("invalid ring or sector count",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.ay(s,q)
for(o=0;o<=a7;++o){n=o/a7
m=n*3.141592653589793
l=Math.sin(m)
k=Math.cos(m)
for(s=k*a6,j=0;j<=a8;++j){i=j/a8
h=i*2*3.141592653589793
g=Math.sin(h)
f=Math.cos(h)
e=l*f
d=l*g
c=-g
b=Math.sqrt(c*c+f*f)
if(b>0.000001){c/=b
a=f/b}else{c=1
a=0}p.H(new A.a(e*a6,s,d*a6),new A.a(e,k,d),new A.a(c,0,a),new A.D(i,n))}}a0=a8+1
for(o=0;o<a7;)for(s=o*a0,++o,a1=o*a0,j=0;j<a8;++j){a2=s+j
a3=a1+j
a4=a3+1
B.b.G(q,A.d([a2,a2+1,a4,a2,a4,a3],r))}a5=new A.a(a6,a6,a6)
return p.a9(new A.a4(a5.k(0,-1),a5))},
oR(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a1<=0||a<=0)throw A.b(A.f("radius and height must be > 0",null))
if(a0<3)throw A.b(A.f("radialSegments must be >= 3",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.ay(s,q)
o=a*0.5
for(n=-o,m=0;m<=a0;++m){l=m/a0
k=l*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
h=new A.a(j,0,i)
g=new A.a(-i,0,j)
f=j*a1
e=i*a1
p.H(new A.a(f,n,e),h,g,new A.D(l,0))
p.H(new A.a(f,o,e),h,g,new A.D(l,1))}for(m=0;m<a0;++m){d=m*2
f=d+3
B.b.G(q,A.d([d,d+2,f,d,f,d+1],r))}c=s.length/18|0
p.H(new A.a(0,o,0),B.f,B.k,B.aI)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.H(new A.a(j*a1,o,i*a1),B.f,B.k,new A.D(j*0.5+0.5,i*0.5+0.5))}for(f=c+1,e=c+2,m=0;m<a0;++m)B.b.G(q,A.d([c,f+m,e+m],r))
b=s.length/18|0
p.H(new A.a(0,n,0),B.v,B.D,B.aI)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.H(new A.a(j*a1,n,i*a1),B.v,B.D,new A.D(j*0.5+0.5,i*0.5+0.5))}for(s=b+2,f=b+1,m=0;m<a0;++m)B.b.G(q,A.d([b,s+m,f+m],r))
s=-a1
return p.a9(new A.a4(new A.a(s,n,s),new A.a(a1,o,a1)))},
oQ(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a6<=0||a4<=0)throw A.b(A.f("radius and height must be > 0",null))
if(a5<3)throw A.b(A.f("radialSegments must be >= 3",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.ay(s,q)
o=a4*0.5
n=a6/a4
m=1+n*n
l=n/Math.sqrt(m)
k=1/Math.sqrt(m)
for(m=-o,j=0;j<a5;){i=j/a5;++j
h=j/a5
g=i*2*3.141592653589793
f=h*2*3.141592653589793
e=(g+f)*0.5
d=new A.a(Math.cos(e)*k,l,Math.sin(e)*k)
c=new A.a(-Math.sin(e),0,Math.cos(e))
b=s.length/18|0
p.H(new A.a(0,o,0),d,c,new A.D((i+h)*0.5,1))
p.H(new A.a(Math.cos(g)*a6,m,Math.sin(g)*a6),d,c,new A.D(i,0))
p.H(new A.a(Math.cos(f)*a6,m,Math.sin(f)*a6),d,c,new A.D(h,0))
B.b.G(q,A.d([b,b+1,b+2],r))}a=s.length/18|0
p.H(new A.a(0,m,0),B.v,B.D,B.aI)
for(j=0;j<=a5;++j){a0=j/a5*2*3.141592653589793
a1=Math.cos(a0)
a2=Math.sin(a0)
p.H(new A.a(a1*a6,m,a2*a6),B.v,B.D,new A.D(a1*0.5+0.5,a2*0.5+0.5))}for(s=a+2,a3=a+1,j=0;j<a5;++j)B.b.G(q,A.d([a,s+j,a3+j],r))
s=-a6
return p.a9(new A.a4(new A.a(s,m,s),new A.a(a6,o,a6)))},
p4(a0,a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a1<=0||a2<=0)throw A.b(A.f("radii must be > 0",null))
if(a0<3||a3<3)throw A.b(A.f("segments must be >= 3",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.ay(s,q)
for(o=0;o<=a0;++o){s=o/a0
n=s*2*3.141592653589793
m=Math.cos(n)
l=Math.sin(n)
for(k=a1+a2*m,j=a2*l,i=0;i<=a3;++i){h=i/a3
g=h*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
p.H(new A.a(k*f,j,k*e),new A.a(m*f,l,m*e),new A.a(-e,0,f),new A.D(h,s))}}d=a3+1
for(o=0;o<a0;)for(s=o*d,++o,k=o*d,i=0;i<a3;++i){c=s+i
h=k+i
b=h+1
B.b.G(q,A.d([c,c+1,b,c,b,h],r))}a=a1+a2
s=-a
return p.a9(new A.a4(new A.a(s,-a2,s),new A.a(a,a2,a)))},
oP(a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a6<=0||a5<=0)throw A.b(A.f("radius and height must be > 0",null))
if(a7<2||a8<3)throw A.b(A.f("invalid ring or sector count",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.ay(s,q)
o=a5*0.5
for(n=0;n<=a7;++n){s=n/a7
m=s*1.5707963267948966
l=Math.sin(m)
k=Math.cos(m)
for(j=o+l*a6,s=0.5+0.5*s,i=0;i<=a8;++i){h=i/a8
g=h*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
d=k*f
c=k*e
p.H(new A.a(d*a6,j,c*a6),new A.a(d,l,c),new A.a(-e,0,f),new A.D(h,s))}}for(s=-o,n=0;n<=a7;++n){j=n/a7
m=j*1.5707963267948966
l=Math.sin(m)
k=Math.cos(m)
for(b=-l,h=s+b*a6,j=0.5-0.5*j,i=0;i<=a8;++i){a=i/a8
g=a*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
d=k*f
c=k*e
p.H(new A.a(d*a6,h,c*a6),new A.a(d,b,c),new A.a(-e,0,f),new A.D(a,j))}}a0=a8+1
for(n=0;n<a7;)for(s=n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1
B.b.G(q,A.d([a1,h,a,a1,a,a1+1],r))}a2=(a7+1)*a0
for(n=0;n<a7;)for(s=a2+n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1+a2
B.b.G(q,A.d([a1,a1+1,a,a1,a,h+a2],r))}for(i=0;i<a8;i=a3){a3=i+1
s=a2+i
j=s+1
B.b.G(q,A.d([i,a3,j,i,j,s],r))}a4=o+a6
s=-a6
return p.a9(new A.a4(new A.a(s,-a4,s),new A.a(a6,a4,a6)))},
mZ(a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
if(a7<=0)throw A.b(A.Z(a7,"radius","must be > 0"))
if(a8>5)throw A.b(A.Z(a8,"subdivisions","must be between 0 and 5"))
s=(1+Math.sqrt(5))/2
r=-s
q=t.mz
p=A.ai(new A.O(A.d([new A.a(-1,s,0),new A.a(1,s,0),new A.a(-1,r,0),new A.a(1,r,0),new A.a(0,-1,s),new A.a(0,1,s),new A.a(0,-1,r),new A.a(0,1,r),new A.a(s,0,-1),new A.a(s,0,1),new A.a(r,0,-1),new A.a(r,0,1)],t.G),t.pc.a(new A.j7()),q),q.h("P.E"))
r=t.t
q=t.fC
o=A.d([A.d([0,11,5],r),A.d([0,5,1],r),A.d([0,1,7],r),A.d([0,7,10],r),A.d([0,10,11],r),A.d([1,5,9],r),A.d([5,11,4],r),A.d([11,10,2],r),A.d([10,7,6],r),A.d([7,1,8],r),A.d([3,9,4],r),A.d([3,4,2],r),A.d([3,2,6],r),A.d([3,6,8],r),A.d([3,8,9],r),A.d([4,9,5],r),A.d([2,4,11],r),A.d([6,2,10],r),A.d([8,6,7],r),A.d([9,8,1],r)],q)
n=A.bo(p,!0,t.a)
m=t.S
l=new A.j8(A.a5(m,m),n)
for(k=0;k<a8;++k,o=j){j=A.d([],q)
for(m=o.length,i=0;i<o.length;o.length===m||(0,A.A)(o),++i){h=o[i]
g=h.length
if(0>=g)return A.c(h,0)
f=h[0]
if(1>=g)return A.c(h,1)
e=h[1]
if(2>=g)return A.c(h,2)
d=h[2]
c=l.$2(f,e)
b=l.$2(e,d)
a=l.$2(d,f)
B.b.i(j,A.d([f,c,a],r))
B.b.i(j,A.d([e,b,c],r))
B.b.i(j,A.d([d,a,b],r))
B.b.i(j,A.d([c,b,a],r))}}q=A.d([],t.n)
m=A.d([],r)
e=new A.ay(q,m)
for(q=n.length,i=0;i<n.length;n.length===q||(0,A.A)(n),++i){a0=n[i]
g=a0.a
a1=a0.b
a2=a0.c
a3=-a2
a4=Math.sqrt(a3*a3+g*g)
a5=a4>0.000001?new A.a(a3/a4,0,g/a4):B.k
e.H(new A.a(g*a7,a1*a7,a2*a7),a0,a5,new A.D(0.5+Math.atan2(a2,g)/6.283185307179586,0.5-Math.asin(B.a.l(a1,-1,1))/3.141592653589793))}for(q=o.length,i=0;i<o.length;o.length===q||(0,A.A)(o),++i){h=o[i]
g=h.length
if(0>=g)return A.c(h,0)
a1=h[0]
if(1>=g)return A.c(h,1)
a2=h[1]
if(2>=g)return A.c(h,2)
B.b.G(m,A.d([a1,a2,h[2]],r))}a6=new A.a(a7,a7,a7)
return e.a9(new A.a4(a6.k(0,-1),a6))},
p0(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
if(a7<=0)throw A.b(A.Z(a7,"radius","must be > 0"))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.ay(s,q)
o=new A.a(0,a7,0)
n=-a7
m=new A.a(0,n,0)
l=new A.a(a7,0,0)
k=new A.a(0,0,a7)
j=new A.a(n,0,0)
i=new A.a(0,0,n)
n=t.G
h=[A.d([o,l,k],n),A.d([o,k,j],n),A.d([o,j,i],n),A.d([o,i,l],n),A.d([m,k,l],n),A.d([m,j,k],n),A.d([m,i,j],n),A.d([m,l,i],n)]
for(g=0;g<8;++g){f=h[g]
n=f.length
if(0>=n)return A.c(f,0)
e=f[0]
if(1>=n)return A.c(f,1)
d=f[1]
if(2>=n)return A.c(f,2)
c=f[2]
n=e.a
b=d.a-n
a=e.b
a0=d.b-a
a1=e.c
a2=d.c-a1
a3=new A.a(b,a0,a2).S(new A.a(c.a-n,c.b-a,c.c-a1)).gm()
a4=new A.a(b,a0,a2).gm()
n=a4.a
b=a4.b
a=a4.c
if(n*n+b*b+a*a<0.000001)a4=B.k
a5=s.length/18|0
p.H(e,a3,a4,B.fD)
p.H(d,a3,a4,B.ab)
p.H(c,a3,a4,B.ac)
B.b.G(q,A.d([a5,a5+1,a5+2],r))}a6=new A.a(a7,a7,a7)
return p.a9(new A.a4(a6.k(0,-1),a6))},
oS(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a5<=0)throw A.b(A.Z(a5,"radius","must be > 0"))
s=(1+Math.sqrt(5))/2
r=1/s
q=-r
p=-s
o=t.mz
n=A.ai(new A.O(A.d([B.hm,B.hl,B.hk,B.hj,B.fW,B.fV,B.fU,B.u,new A.a(0,q,p),new A.a(0,q,s),new A.a(0,r,p),new A.a(0,r,s),new A.a(q,p,0),new A.a(q,s,0),new A.a(r,p,0),new A.a(r,s,0),new A.a(p,0,q),new A.a(p,0,r),new A.a(s,0,q),new A.a(s,0,r)],t.G),t.pc.a(new A.j6(a5)),o),o.h("P.E"))
q=A.d([],t.n)
p=t.t
o=A.d([],p)
m=new A.ay(q,o)
for(l=0;l<12;++l){k=B.da[l]
j=k[0]
i=n.length
if(!(j<i))return A.c(n,j)
h=n[j]
j=k[1]
if(!(j<i))return A.c(n,j)
g=n[j]
j=k[2]
if(!(j<i))return A.c(n,j)
f=n[j]
j=h.a
i=g.a-j
e=h.b
d=g.b-e
c=h.c
b=g.c-c
a=new A.a(i,d,b).S(new A.a(f.a-j,f.b-e,f.c-c)).gm()
a0=new A.a(i,d,b).gm()
j=a0.a
i=a0.b
e=a0.c
if(j*j+i*i+e*e<0.000001)a0=B.k
a1=q.length/18|0
for(a2=0;a2<5;++a2){j=k[a2]
if(!(j<n.length))return A.c(n,j)
a3=a2*1.2566370614359172
m.H(n[j],a,a0,new A.D(0.5+0.5*Math.cos(a3),0.5+0.5*Math.sin(a3)))}j=a1+2
B.b.G(o,A.d([a1,a1+1,j],p))
i=a1+3
B.b.G(o,A.d([a1,j,i],p))
B.b.G(o,A.d([a1,i,a1+4],p))}a4=new A.a(a5,a5,a5)
return m.a9(new A.a4(a4.k(0,-1),a4))},
n_(c9,d0,d1,d2,d3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8
if(d3<=0||d2<=0||d1<=0)throw A.b(A.f("dimensions must be > 0",null))
if(d0<1)throw A.b(A.f("bevelSegments must be >= 1",null))
s=B.a.l(c9,0.001,Math.min(d3,Math.min(d2,d1))*0.45)
r=d3*0.5
q=r-s
p=d2*0.5
o=p-s
n=d1*0.5
m=n-s
l=A.d([],t.n)
k=t.t
j=A.d([],k)
i=new A.ay(l,j)
h=new A.ja(i)
g=-q
f=-o
e=m+s
h.$6(new A.a(g,f,e),new A.a(q,f,e),new A.a(q,o,e),new A.a(g,o,e),B.r,B.k)
e=-m
d=e-s
h.$6(new A.a(q,f,d),new A.a(g,f,d),new A.a(g,o,d),new A.a(q,o,d),B.H,B.D)
d=o+s
h.$6(new A.a(g,d,m),new A.a(q,d,m),new A.a(q,d,e),new A.a(g,d,e),B.f,B.k)
d=f-s
h.$6(new A.a(g,d,e),new A.a(q,d,e),new A.a(q,d,m),new A.a(g,d,m),B.v,B.k)
d=q+s
h.$6(new A.a(d,f,m),new A.a(d,f,e),new A.a(d,o,e),new A.a(d,o,m),B.k,B.H)
d=g-s
h.$6(new A.a(d,f,e),new A.a(d,f,m),new A.a(d,o,m),new A.a(d,o,e),B.D,B.r)
c=new A.j9(d0,s,i)
c.$5(new A.a(g,o,m),new A.a(q,o,m),B.r,B.f,B.k)
c.$5(new A.a(g,f,m),new A.a(q,f,m),B.v,B.r,B.k)
c.$5(new A.a(g,o,e),new A.a(q,o,e),B.f,B.H,B.k)
c.$5(new A.a(g,f,e),new A.a(q,f,e),B.H,B.v,B.k)
c.$5(new A.a(q,f,m),new A.a(q,o,m),B.r,B.k,B.f)
c.$5(new A.a(g,f,m),new A.a(g,o,m),B.D,B.r,B.f)
c.$5(new A.a(q,f,e),new A.a(q,o,e),B.k,B.H,B.f)
c.$5(new A.a(g,f,e),new A.a(g,o,e),B.H,B.D,B.f)
c.$5(new A.a(q,o,e),new A.a(q,o,m),B.f,B.k,B.r)
c.$5(new A.a(g,o,e),new A.a(g,o,m),B.D,B.f,B.r)
c.$5(new A.a(q,f,e),new A.a(q,f,m),B.k,B.v,B.r)
c.$5(new A.a(g,f,e),new A.a(g,f,m),B.v,B.D,B.r)
for(g=[-1,1],b=d0+1,a=0;a<2;++a){a0=g[a]
for(f=[-1,1],e=q*a0,a1=0;a1<2;++a1){a2=f[a1]
for(d=[-1,1],a3=a0*a2,a4=o*a2,a5=0;a5<2;++a5){a6=d[a5]
a7=m*a6
a8=l.length/18|0
for(a9=0;a9<=d0;++a9){b0=a9/d0
b1=b0*1.5707963267948966
for(b2=0;b2<=d0;++b2){b3=b2/d0
b4=b3*1.5707963267948966
b5=new A.a(a0*Math.sin(b1)*Math.cos(b4),a2*Math.cos(b1),a6*Math.sin(b1)*Math.sin(b4)).gm()
b6=b5.a
b7=b5.b
b8=b5.c
b9=Math.abs(b7)>0.85?B.k:B.f
c0=b9.a
c1=b9.b
c2=b9.c
c3=b6*c0+b7*c1+b8*c2
i.H(new A.a(e+b6*s,a4+b7*s,a7+b8*s),b5,new A.a(c0-b6*c3,c1-b7*c3,c2-b8*c3).gm(),new A.D(b0,b3))}}for(a7=a3*a6<0,a9=0;a9<d0;)for(b0=a9===0,b3=a8+a9*b,++a9,b6=a8+a9*b,b2=0;b2<d0;){c4=b3+b2
c5=b6+b2;++b2
c6=b6+b2
c7=b3+b2
if(b0)if(a7)B.b.G(j,A.d([c4,c5,c6],k))
else B.b.G(j,A.d([c4,c6,c5],k))
else if(a7)B.b.G(j,A.d([c4,c5,c6,c4,c6,c7],k))
else B.b.G(j,A.d([c4,c7,c6,c4,c6,c5],k))}}}}c8=new A.a(r,p,n)
return i.a9(new A.a4(c8.k(0,-1),c8))},
p5(d3,d4,d5,d6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2
if(d6.length<2)throw A.b(A.f("tubePath requires at least 2 spine points",null))
if(d5<=0)throw A.b(A.Z(d5,"radius","must be > 0"))
if(d4<3)throw A.b(A.Z(d4,"radialSegments","must be >= 3"))
s=A.bo(d6,!0,t.a)
r=Math.sqrt(B.b.gaE(s).M(0,B.b.gau(s)).gO())
if(r>0.0001)B.b.i(s,B.b.gau(s))
q=s.length
r=t.G
p=A.d([],r)
for(o=q-1,n=q-2,m=0;m<q;++m){if(m===0){if(1>=s.length)return A.c(s,1)
l=s[1]
k=s[0]
j=new A.a(l.a-k.a,l.b-k.b,l.c-k.c).gm()}else{l=s.length
if(m===o){if(!(o>=0&&o<l))return A.c(s,o)
k=s[o]
if(!(n>=0&&n<l))return A.c(s,n)
l=s[n]
j=new A.a(k.a-l.a,k.b-l.b,k.c-l.c).gm()}else{k=m+1
if(!(k<l))return A.c(s,k)
k=s[k]
i=m-1
if(!(i>=0&&i<l))return A.c(s,i)
i=s[i]
j=new A.a(k.a-i.a,k.b-i.b,k.c-i.c).gm()}}l=j.a
k=j.b
i=j.c
B.b.i(p,l*l+k*k+i*i<1e-8?B.r:j)}h=A.d([],r)
g=A.d([],r)
if(0>=p.length)return A.c(p,0)
r=p[0]
f=Math.abs(r.b)>0.85?B.k:B.f
e=f.M(0,r.k(0,r.aD(f))).gm()
if(0>=p.length)return A.c(p,0)
d=p[0].S(e).gm()
B.b.i(h,e)
B.b.i(g,d)
for(m=0;m<o;m=b){r=p.length
if(!(m<r))return A.c(p,m)
c=p[m]
b=m+1
if(!(b<r))return A.c(p,b)
a=p[b]
a0=c.S(a)
r=a0.a
n=a0.b
l=a0.c
a1=Math.sqrt(r*r+n*n+l*l)
if(a1>0.000001){k=1/a1
a2=A.al(new A.a(r*k,n*k,l*k),Math.acos(B.a.l(c.a*a.a+c.b*a.b+c.c*a.c,-1,1)))
if(!(m<h.length))return A.c(h,m)
a3=a2.aF(h[m]).gm()}else{if(!(m<h.length))return A.c(h,m)
a3=h[m]}a4=a.S(a3).gm()
B.b.i(h,a3)
B.b.i(g,a4)}r=A.d([],t.n)
n=t.t
l=A.d([],n)
a5=new A.ay(r,l)
a6=new A.a(1/0,1/0,1/0)
a7=new A.a(-1/0,-1/0,-1/0)
for(m=0;m<q;++m){if(!(m<s.length))return A.c(s,m)
a8=s[m]
if(!(m<h.length))return A.c(h,m)
a9=h[m]
if(!(m<g.length))return A.c(g,m)
b0=g[m]
if(!(m<p.length))return A.c(p,m)
b1=p[m]
b2=m/o
for(r=a9.a,k=a9.b,i=a9.c,b3=b0.a,b4=b0.b,b5=b0.c,b6=a8.a,b7=a8.b,b8=a8.c,b9=0;b9<=d4;++b9){c0=b9/d4
c1=c0*6.283185307179586
c2=Math.cos(c1)
c3=Math.sin(c1)
c4=new A.a(r*c2+b3*c3,k*c2+b4*c3,i*c2+b5*c3).gm()
c5=b6+c4.a*d5
c6=b7+c4.b*d5
c7=b8+c4.c*d5
if(c5<a6.a)a6=new A.a(c5,a6.b,a6.c)
if(c6<a6.b)a6=new A.a(a6.a,c6,a6.c)
if(c7<a6.c)a6=new A.a(a6.a,a6.b,c7)
if(c5>a7.a)a7=new A.a(c5,a7.b,a7.c)
if(c6>a7.b)a7=new A.a(a7.a,c6,a7.c)
if(c7>a7.c)a7=new A.a(a7.a,a7.b,c7)
a5.H(new A.a(c5,c6,c7),c4,b1,new A.D(c0,b2))}}c8=d4+1
for(m=0;m<o;){c9=m*c8;++m
d0=m*c8
for(b9=0;b9<d4;++b9){b=c9+b9
d1=d0+b9
d2=d1+1
B.b.G(l,A.d([b,d1,d2,b,d2,b+1],n))}}return a5.a9(new A.a4(a6,a7))},
j5:function j5(a,b){this.a=a
this.b=b},
j7:function j7(){},
j8:function j8(a,b){this.a=a
this.b=b},
j6:function j6(a){this.a=a},
ja:function ja(a){this.a=a},
j9:function j9(a,b,c){this.a=a
this.b=b
this.c=c},
ay:function ay(a,b){this.a=a
this.b=b},
p9(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l=a1*c*4,k=new Uint8Array(l),j=B.a.C(B.a.l(d.a,0,1)*255),i=B.a.C(B.a.l(d.b,0,1)*255),h=B.a.C(B.a.l(d.c,0,1)*255),g=B.a.C(B.a.l(a.a,0,1)*255),f=B.a.C(B.a.l(a.b,0,1)*255),e=B.a.C(B.a.l(a.c,0,1)*255)
for(s=0,r=0;r<c;++r)for(q=B.d.F(r,b)>=a0,p=0;p<a1;++p){o=!q||B.d.F(p,b)<a0
n=o?j:g
if(!(s>=0&&s<l))return A.c(k,s)
k[s]=n
n=s+1
m=o?i:f
if(!(n<l))return A.c(k,n)
k[n]=m
m=s+2
n=o?h:e
if(!(m<l))return A.c(k,m)
k[m]=n
n=s+3
if(!(n<l))return A.c(k,n)
k[n]=255
s+=4}return k},
pc(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a6*a4*4,a1=new Uint8Array(a0),a2=new A.jb(a6,a4,a3)
for(s=0,r=0;r<a4;r=p)for(q=r-1,p=r+1,o=0;o<a6;o=n){n=o+1
m=a2.$2(n,q)
l=a2.$2(n,r)
if(typeof l!=="number")return A.bg(l)
if(typeof m!=="number")return m.u()
k=a2.$2(n,p)
if(typeof k!=="number")return A.bg(k)
j=o-1
i=a2.$2(j,q)
h=a2.$2(j,r)
if(typeof h!=="number")return A.bg(h)
if(typeof i!=="number")return i.u()
g=a2.$2(j,p)
if(typeof g!=="number")return A.bg(g)
f=a2.$2(j,p)
e=a2.$2(o,p)
if(typeof e!=="number")return A.bg(e)
if(typeof f!=="number")return f.u()
d=a2.$2(n,p)
if(typeof d!=="number")return A.bg(d)
j=a2.$2(j,q)
c=a2.$2(o,q)
if(typeof c!=="number")return A.bg(c)
if(typeof j!=="number")return j.u()
b=a2.$2(n,q)
if(typeof b!=="number")return A.bg(b)
a=new A.a(-(m+2*l+k-(i+2*h+g))*a5,-(f+2*e+d-(j+2*c+b))*a5,1).gm()
b=B.d.l(B.a.C((a.a*0.5+0.5)*255),0,255)
if(!(s>=0&&s<a0))return A.c(a1,s)
a1[s]=b
b=s+1
c=B.d.l(B.a.C((a.b*0.5+0.5)*255),0,255)
if(!(b<a0))return A.c(a1,b)
a1[b]=c
c=s+2
b=B.d.l(B.a.C((a.c*0.5+0.5)*255),0,255)
if(!(c<a0))return A.c(a1,c)
a1[c]=b
b=s+3
if(!(b<a0))return A.c(a1,b)
a1[b]=255
s+=4}return a1},
p6(a,b,c,d){var s,r,q,p,o,n,m,l,k,j=d*b*4,i=new Uint8Array(j),h=new A.cd()
h.bf(1337)
s=new Float32Array(b)
for(r=0;r<b;++r){q=h.L()
if(!(r<b))return A.c(s,r)
s[r]=(q*2-1)*0.18}p=B.a.C(B.a.l(c,0,1)*255)
for(o=0,n=0;n<b;++n)for(m=0;m<d;++m){l=B.a.l(a+s[n],0.04,1)
if(!(o>=0&&o<j))return A.c(i,o)
i[o]=255
q=o+1
k=B.a.C(l*255)
if(!(q<j))return A.c(i,q)
i[q]=k
k=o+2
if(!(k<j))return A.c(i,k)
i[k]=p
k=o+3
if(!(k<j))return A.c(i,k)
i[k]=255
o+=4}return i},
pg(b1,b2,b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=b5*b4*4,b0=new Uint8Array(a9)
for(s=b1.a,r=b3.a,q=b1.b,p=b3.b,o=b1.c,n=b3.c,m=0,l=0;l<b4;++l){k=l/b4*b2
j=B.a.a6(k)
for(i=0;i<b5;++i){h=i/b5*b2
g=B.a.a6(h)
for(f=1e9,e=-1;e<=1;++e)for(d=j+e,c=-1;c<=1;++c){b=g+c
a=B.d.F(B.d.F(b,b2)+b2,b2)
a0=B.d.F(B.d.F(d,b2)+b2,b2)
a1=h-(b+A.dO(a,a0))
a2=k-(d+A.dO(a+107,a0+233))
a3=Math.sqrt(a1*a1+a2*a2)
if(a3<f)f=a3}a4=B.a.l(f,0,1)
a5=1-a4
a6=B.a.C(B.a.l(s*a5+r*a4,0,1)*255)
a7=B.a.C(B.a.l(q*a5+p*a4,0,1)*255)
a8=B.a.C(B.a.l(o*a5+n*a4,0,1)*255)
if(!(m>=0&&m<a9))return A.c(b0,m)
b0[m]=a6
a5=m+1
if(!(a5<a9))return A.c(b0,a5)
b0[a5]=a7
a5=m+2
if(!(a5<a9))return A.c(b0,a5)
b0[a5]=a8
a5=m+3
if(!(a5<a9))return A.c(b0,a5)
b0[a5]=255
m+=4}}return b0},
pa(b2,b3,b4,b5,b6,b7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=b7*b3*4,a1=new Uint8Array(a0),a2=B.a.C(B.a.l(b5.a,0,1)*255),a3=B.a.C(B.a.l(b5.b,0,1)*255),a4=B.a.C(B.a.l(b5.c,0,1)*255),a5=B.a.C(B.a.l(b2.a,0,1)*255),a6=B.a.C(B.a.l(b2.b,0,1)*255),a7=B.a.C(B.a.l(b2.c,0,1)*255),a8=Math.sqrt(3),a9=b4*1.5,b0=b4*a8,b1=b4*(a8*0.5)
for(s=b6*0.5,r=b0*0.5,q=0,p=0;p<b3;++p)for(o=p/a9,n=0;n<b7;++n){m=B.a.C(o)
l=(m&1)!==0?r:0
k=n-(B.a.C((n-l)/b0)*b0+l)
j=p-m*a9
i=j>0?m+1:m-1
h=(i&1)!==0?r:0
g=n-(B.a.C((n-h)/b0)*b0+h)
f=p-i*a9
e=k*k+j*j<g*g+f*f
d=e?k:g
c=e?j:f
b=Math.abs(b1/Math.cos(B.a.F(B.a.F(Math.atan2(c,d),1.0471975511965976)+1.0471975511965976,1.0471975511965976)-0.5235987755982988)-Math.sqrt(d*d+c*c))<=s
e=b?a2:a5
if(!(q>=0&&q<a0))return A.c(a1,q)
a1[q]=e
e=q+1
a=b?a3:a6
if(!(e<a0))return A.c(a1,e)
a1[e]=a
a=q+2
e=b?a4:a7
if(!(a<a0))return A.c(a1,a)
a1[a]=e
e=q+3
if(!(e<a0))return A.c(a1,e)
a1[e]=255
q+=4}return a1},
p7(a,b,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=a2*a0*4,d=new Uint8Array(e),c=B.a.C(B.a.l(a1,0,1)*255)
for(s=0,r=0;r<a0;++r){q=B.d.b_(r,b)
p=B.d.F(r,b)/b
for(o=1-p,n=0;n<a2;++n){m=B.d.b_(n,b)
l=B.d.F(n,b)/b
k=B.d.F(m+q,4)
j=k===0||k===1
i=B.a.l((j?Math.min(p,o):Math.min(l,1-l))*8,0.65,1)
h=B.a.l(a+Math.sin((j?l:p)*3.141592653589793)*0.12,0.05,0.95)
g=B.a.C(i*255)
if(!(s>=0&&s<e))return A.c(d,s)
d[s]=g
g=s+1
f=B.a.C(h*255)
if(!(g<e))return A.c(d,g)
d[g]=f
f=s+2
if(!(f<e))return A.c(d,f)
d[f]=c
f=s+3
if(!(f<e))return A.c(d,f)
d[f]=255
s+=4}}return d},
pb(a3,a4,a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(a8<=0||a4<=0)throw A.b(A.f("dimensions must be > 0",null))
s=a8*a4*4
r=new Uint8Array(s)
for(q=a3.a,p=a7.a-q,o=a3.b,n=a7.b-o,m=a3.c,l=a7.c-m,k=0,j=0;j<a4;++j)for(i=j/a4*a5,h=0;h<a8;++h){for(g=h/a8*a5,f=0,e=1,d=1,c=0;c<4;++c){f+=A.n2(g*d,i*d)*e
d*=2.02
e*=0.5}b=Math.pow(Math.sin((g+f*a6)*3.141592653589793*2)*0.5+0.5,4)
a=B.a.l(q+p*b,0,1)
a0=B.a.l(o+n*b,0,1)
a1=B.a.l(m+l*b,0,1)
g=B.a.C(a*255)
if(!(k>=0&&k<s))return A.c(r,k)
r[k]=g
g=k+1
a2=B.a.C(a0*255)
if(!(g<s))return A.c(r,g)
r[g]=a2
a2=k+2
g=B.a.C(a1*255)
if(!(a2<s))return A.c(r,a2)
r[a2]=g
g=k+3
if(!(g<s))return A.c(r,g)
r[g]=255
k+=4}return r},
p8(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i,h
if(f<=0||c<=0)throw A.b(A.f("dimensions must be > 0",null))
s=f*c*4
r=new Uint8Array(s)
q=B.a.C(B.a.l(e,0,1)*255)
for(p=0,o=0;o<c;++o)for(n=o/c*4,m=0;m<f;++m){l=m/f
k=Math.sin((l+A.n2(l*4,n)*b)*d*3.141592653589793*2)*0.5+0.5
j=B.a.l(a+k*0.12,0.05,0.95)
i=B.a.C(B.a.l(0.85+(1-k)*0.15,0,1)*255)
if(!(p>=0&&p<s))return A.c(r,p)
r[p]=i
i=p+1
h=B.a.C(j*255)
if(!(i<s))return A.c(r,i)
r[i]=h
h=p+2
if(!(h<s))return A.c(r,h)
r[h]=q
h=p+3
if(!(h<s))return A.c(r,h)
r[h]=255
p+=4}return r},
pe(a0,a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a3<=0||a1<=0)throw A.b(A.f("dimensions must be > 0",null))
if(a2<0||a2>=1)throw A.b(A.Z(a2,"innerRadius","must be in [0, 1)"))
if(a0<=0)throw A.b(A.Z(a0,"falloffExponent","must be > 0"))
s=a3*a1*4
r=new Uint8Array(s)
q=a3*0.5
p=a1*0.5
for(o=1-a2,n=0,m=0;m<a1;++m){l=(m+0.5-p)/p
for(k=l*l,j=0;j<a3;++j){i=(j+0.5-q)/q
h=Math.sqrt(i*i+k)
if(h>=1)g=0
else if(h<=a2)g=1
else{f=(h-a2)/o
g=Math.pow(B.a.l(1-f*f,0,1),a0)}e=1+0*B.a.l((h-a2)/o,0,1)
d=B.a.l(e,0,1)
c=B.a.l(e,0,1)
b=B.a.l(e,0,1)
e=B.a.C(d*255)
if(!(n>=0&&n<s))return A.c(r,n)
r[n]=e
e=n+1
a=B.a.C(c*255)
if(!(e<s))return A.c(r,e)
r[e]=a
a=n+2
e=B.a.C(b*255)
if(!(a<s))return A.c(r,a)
r[a]=e
e=n+3
a=B.a.C(B.a.l(g,0,1)*255)
if(!(e<s))return A.c(r,e)
r[e]=a
n+=4}}return r},
pf(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a1<=0||a0<=0)throw A.b(A.f("dimensions must be > 0",null))
s=a1*a0*4
r=new Uint8Array(s)
q=a1*0.5
for(p=a0-1,o=0,n=0;n<a0;++n){m=n/p
l=B.a.l(1-m*0.5,0.1,1)
for(k=-m*2.8,j=1+0*m,i=1+-0.4*m,h=1+-0.9*m,g=0;g<a1;++g){f=B.a.l(Math.exp(k)*Math.pow(B.a.l(1-Math.abs((g+0.5-q)/q)/l,0,1),2.5),0,1)
e=B.a.l(j,0,1)
d=B.a.l(i,0,1)
c=B.a.l(h,0,1)
b=B.a.C(e*255)
if(!(o>=0&&o<s))return A.c(r,o)
r[o]=b
b=o+1
a=B.a.C(d*255)
if(!(b<s))return A.c(r,b)
r[b]=a
a=o+2
b=B.a.C(c*255)
if(!(a<s))return A.c(r,a)
r[a]=b
b=o+3
a=B.a.C(f*255)
if(!(b<s))return A.c(r,b)
r[b]=a
o+=4}}return r},
pd(c0,c1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9
if(c1<=0||c0<=0||B.d.F(c1,2)!==0||B.d.F(c0,2)!==0)throw A.b(A.f("particleAtlas dimensions must be positive even integers",null))
s=c1*c0*4
r=new Uint8Array(s)
q=c1/2|0
p=c0/2|0
o=B.a.C(B.d.l(1,0,1)*255)
n=B.a.C(B.d.l(1,0,1)*255)
m=B.a.C(B.d.l(1,0,1)*255)
for(l=q-1,k=p-1,j=0,i=0;i<c0;++i){h=B.d.b_(i,p)
g=(B.d.F(i,p)/k-0.5)*2
for(f=h===1,e=h===0,d=g*g,c=g-0.18,c*=c,b=g-0.12,b*=b,a=g+0.25,a*=a,a0=-Math.abs(g),a1=a0*1.5,a0*=6,a2=0;a2<c1;++a2){a3=B.d.b_(a2,q)
a4=(B.d.F(a2,q)/l-0.5)*2
a5=a4*a4
a6=a5+d
a7=Math.sqrt(a6)
a8=0
if(e&&a3===0){if(a7<1){a9=1-a7*a7
a8=B.a.l(a9*a9,0,1)}}else if(e&&a3===1){if(a7<1){a5=-Math.abs(a4)
a8=B.a.l((Math.exp(a5*6)*Math.exp(a1)+Math.exp(a0)*Math.exp(a5*1.5)+Math.exp(-a7*4)*0.8)*(1-a7),0,1)}}else if(f&&a3===0){if(a7<1){b0=Math.abs(a7-0.55)
if(b0<0.35){b1=1-b0/0.35
a8=B.a.l(b1*b1,0,1)}}}else if(a7<1){b2=Math.sqrt(a6)/0.65
a6=a4-0.22
b3=Math.sqrt(a6*a6+c)/0.5
a6=a4+0.25
b4=Math.sqrt(a6*a6+b)/0.45
b5=Math.sqrt(a5+a)/0.48
b6=b2<1?Math.pow(1-b2*b2,2):0
b7=b3<1?Math.pow(1-b3*b3,2):0
b8=b4<1?Math.pow(1-b4*b4,2):0
b9=b5<1?Math.pow(1-b5*b5,2):0
a8=B.a.l((b6*0.7+b7*0.6+b8*0.55+b9*0.5)*(1-a7),0,1)}if(!(j>=0&&j<s))return A.c(r,j)
r[j]=o
a5=j+1
if(!(a5<s))return A.c(r,a5)
r[a5]=n
a5=j+2
if(!(a5<s))return A.c(r,a5)
r[a5]=m
a5=j+3
a6=B.a.C(a8*255)
if(!(a5<s))return A.c(r,a5)
r[a5]=a6
j+=4}}return r},
n2(a,b){var s=B.a.a6(a),r=B.a.a6(b),q=a-s,p=b-r,o=q*q*q*(q*(q*6-15)+10),n=p*p*p*(p*(p*6-15)+10),m=s+1,l=r+1,k=1-o,j=1-n
return A.dO(s,r)*k*j+A.dO(m,r)*o*j+A.dO(s,l)*k*n+A.dO(m,l)*o*n},
dO(a,b){var s=a*374761393+b*668265263&2147483647
return((s^s>>>13)*1274126177&2147483647)/2147483647},
jb:function jb(a,b,c){this.a=a
this.b=b
this.c=c},
nb(a){return a*a*a*(a*(a*6-15)+10)},
jD(a,b,c){var s=a&7,r=s<4,q=r?b:c,p=r?c:b
r=(s&1)!==0?-q:q
return r+((s&2)!==0?-2*p:2*p)},
jC:function jC(a){this.a=a
this.b=$},
jB:function jB(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
jM:function jM(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.x=_.w=_.r=_.f=$},
cl(a){var s,r,q,p,o,n,m,l,k,j
for(s=a.$ti,r=new A.ah(a,a.gv(0),s.h("ah<P.E>")),s=s.h("P.E"),q=B.h5,p=B.hz,o=!1;r.p();o=!0){n=r.d
if(n==null)n=s.a(n)
m=n.a
l=Math.min(q.a,m)
k=n.b
j=Math.min(q.b,k)
n=n.c
q=new A.a(l,j,Math.min(q.c,n))
p=new A.a(Math.max(p.a,m),Math.max(p.b,k),Math.max(p.c,n))}if(!o)throw A.b(A.f("Aabb.fromPoints requires at least one point",null))
return new A.a4(q,p)},
a4:function a4(a,b){this.a=a
this.b=b},
op(a){A.cZ(a)
return a*a},
mE(a){var s
A.cZ(a)
if(a<0.5)return 4*a*a*a
s=2*a-2
return 0.5*s*s*s+1},
e7:function e7(a){this.a=a},
mG(a){var s,r,q,p,o,n,m=a.a,l=new A.ie(),k=m.length
if(3>=k)return A.c(m,3)
s=m[3]
r=m[0]
if(7>=k)return A.c(m,7)
q=m[7]
p=m[4]
if(11>=k)return A.c(m,11)
o=m[11]
n=m[8]
if(15>=k)return A.c(m,15)
return new A.id(A.d([l.$4(s+r,q+p,o+n,m[15]+m[12]),l.$4(m[3]-m[0],m[7]-m[4],m[11]-m[8],m[15]-m[12]),l.$4(m[3]+m[1],m[7]+m[5],m[11]+m[9],m[15]+m[13]),l.$4(m[3]-m[1],m[7]-m[5],m[11]-m[9],m[15]-m[13]),l.$4(m[3]+m[2],m[7]+m[6],m[11]+m[10],m[15]+m[14]),l.$4(m[3]-m[2],m[7]-m[6],m[11]-m[10],m[15]-m[14])],t.de))},
c4:function c4(a,b){this.a=a
this.b=b},
dp:function dp(a,b){this.a=a
this.b=b},
id:function id(a){this.a=a},
ie:function ie(){},
mP(a,b,c,d,e,f,g,h,i,a0){var s=b*b,r=c*c,q=d*d,p=b*c,o=b*d,n=c*d,m=a*b,l=a*c,k=a*d,j=new Float32Array(16)
j[0]=(1-2*(r+q))*e
j[1]=2*(p+k)*e
j[2]=2*(o-l)*e
j[4]=2*(p-k)*f
j[5]=(1-2*(s+q))*f
j[6]=2*(n+m)*f
j[8]=2*(o+l)*g
j[9]=2*(n-m)*g
j[10]=(1-2*(s+r))*g
j[12]=h
j[13]=i
j[14]=a0
j[15]=1
return new A.aI(j)},
mR(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.aI(q)},
mQ(a,b,c){var s=b.gm(),r=s.S(c).gm(),q=r.S(s),p=new Float32Array(16)
p[0]=r.a
p[1]=q.a
p[2]=-s.a
p[3]=0
p[4]=r.b
p[5]=q.b
p[6]=-s.b
p[7]=0
p[8]=r.c
p[9]=q.c
p[10]=-s.c
p[11]=0
p[12]=-r.aD(a)
p[13]=-q.aD(a)
p[14]=s.aD(a)
p[15]=1
return new A.aI(p)},
aI:function aI(a){this.a=a},
ix:function ix(){},
al(a,b){var s=a.gm(),r=b/2,q=Math.sin(r)
return new A.bL(s.a*q,s.b*q,s.c*q,Math.cos(r))},
n3(a,b){var s,r=a.gm(),q=b.gm(),p=r.aD(q)
if(p>=0.999999)return B.t
if(p<=-0.999999){s=B.k.S(r)
return A.al((s.gO()<0.001?B.f.S(r):s).gm(),3.141592653589793)}s=r.S(q)
return new A.bL(s.a,s.b,s.c,1+p).gm()},
bL:function bL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
je:function je(a,b){this.a=a
this.b=b},
jf:function jf(a,b,c,d){var _=this
_.a=a
_.b=b
_.d=c
_.f=d},
lH(a,b){var s=A.d([],t.n),r=A.aw(b,t.a)
s=new A.hR(r,!0,s)
if(r.length<2)A.l(A.f("CatmullRomSpline3D requires at least 2 control points",null))
s.ew()
return s},
hR:function hR(a,b,c){this.a=a
this.b=b
this.c=c},
hS:function hS(){},
T:function T(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lW(a,b,c){var s=a.a,r=a.b,q=a.c
return new A.a(s+(b.a-s)*c,r+(b.b-r)*c,q+(b.c-q)*c)},
D:function D(a,b){this.a=a
this.b=b},
a:function a(a,b,c){this.a=a
this.b=b
this.c=c},
hN:function hN(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.Q=_.z=_.y=_.x=_.w=0},
hO:function hO(a,b,c){this.a=a
this.b=b
this.c=c},
ig(a,b,c,d,e){var s,r,q,p
if(b.gO()>0.000001){s=Math.sqrt(b.gO())
r=s<1e-9?B.ab:new A.D(b.a/s,b.b/s)}else r=B.ac
q=new A.dq(r,a,e,d,c)
if(a<0)A.l(A.Z(a,"amplitude","must be >= 0"))
if(e<=0)A.l(A.Z(e,"wavelength","must be > 0"))
p=6.283185307179586/e
q.f=p
q.r=c*p
q.w=r.a
q.x=r.b
return q},
dq:function dq(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.x=_.w=_.r=_.f=$},
ih:function ih(a,b){this.a=a
this.b=b},
lG(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.eF(j,i,b,k,f,g,a,p,e,h,l,o,m,c,!1,n)},
eE:function eE(a,b){this.a=a
this.b=b},
cm:function cm(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eF:function eF(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.ay=n
_.ch=o
_.CW=p},
hK:function hK(){},
oM(a){var s=t.dh,r=A.bo(a,!0,s)
B.b.ak(r,new A.iL())
s=new A.iK(A.aw(r,s))
s.n()
return s},
jz(a,b,c,d,e,f,g){return new A.dZ(b,g,a,c,d,f,e)},
aK(a,b,c,d,e,f,g,h,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3){var s,r,q,p,o,n,m,l,k,j,i=$.mV
$.mV=i+1
s=c7==null?B.bd:c7
r=b1==null?b8:b1
q=a6==null?b4:a6
p=d==null
o=p?B.du:A.aw(d,t.aZ)
n=d2==null?B.dv:A.aw(d2,t.g9)
m=A.d([],t.bk)
p=p?A.d([],t.t):A.c1(1,0,!1,t.S)
if(c6!=null){l=new A.cd()
l.bf(c6)}else l=B.bY
if(a9>4294967295)A.l(A.aM(a9,0,4294967295,"length",null))
k=J.iq(new Array(a9),t.hh)
for(j=0;j<a9;++j)k[j]=new A.hj()
i=new A.ft(b2,a3,a4,h,c,i,d0,c9,s,d3,b,d1,c5,o,b6,a8,b7,b0,b8,r,b4,q,c8,a0,a1,f,b5,a7,b3,a5,a2,a,g,c4,c2,c3,c1,b9,c0,m,e,n,a9,l,k,p,A.a5(t.K,t.i))
i.n()
return i},
cD:function cD(a,b){this.a=a
this.b=b},
fs:function fs(a,b){this.a=a
this.b=b},
dJ:function dJ(){},
aT:function aT(a,b){this.a=a
this.b=b},
iK:function iK(a){this.a=a},
iL:function iL(){},
d9:function d9(a,b){this.a=a
this.b=b},
cE:function cE(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
cO:function cO(a,b){this.a=a
this.b=b},
dZ:function dZ(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
hj:function hj(){var _=this
_.at=_.as=_.Q=_.z=_.y=_.x=_.w=_.r=_.f=_.e=_.d=_.c=_.b=_.a=0
_.CW=_.ch=_.ay=_.ax=1
_.cy=_.cx=0
_.db=1
_.fx=_.fr=_.dy=_.dx=0
_.fy=!1
_.go=0
_.id=!1},
ft:function ft(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.x=f
_.y=g
_.z=h
_.at=i
_.ax=j
_.ay=k
_.ch=l
_.CW=m
_.cx=n
_.dy=!0
_.fr=o
_.fx=p
_.fy=q
_.go=r
_.id=s
_.k1=a0
_.k2=a1
_.k3=a2
_.k4=a3
_.ok=a4
_.p1=a5
_.p3=a6
_.p4=a7
_.R8=a8
_.RG=a9
_.rx=b0
_.ry=b1
_.x1=b2
_.x2=b3
_.xr=b4
_.y1=b5
_.y2=b6
_.du=b7
_.dv=b8
_.dw=b9
_.dz=c0
_.dA=c1
_.aM=c2
_.bu=c3
_.dB=c4
_.bv=c5
_.fK=_.fJ=_.bw=_.dC=_.ao=0
_.fL=c6
_.hD=c7
_.ca=null},
iM:function iM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ey(a){var s=2*a.L()-1,r=6.283185307179586*a.L(),q=Math.sqrt(Math.max(0,1-s*s))
return new A.a(q*Math.cos(r),s,q*Math.sin(r))},
bY:function bY(a,b){this.a=a
this.b=b},
c5:function c5(a,b){this.b=a
this.c=b},
hM:function hM(a,b){this.a=a
this.b=b},
cq:function cq(a,b){this.a=a
this.b=b},
jy:function jy(a,b){this.a=a
this.b=b},
jx:function jx(a,b){this.a=a
this.b=b},
fK:function fK(){},
hW:function hW(a,b){this.a=a
this.b=b},
dh:function dh(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eM:function eM(a,b){this.a=a
this.b=b},
de:function de(a,b){this.a=a
this.b=b},
cs:function cs(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
oN(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
if(b<=0||d<=0)throw A.b(A.f("columns and rows must be > 0",null))
s=b*d
if(s<=0||s>s)throw A.b(A.f("frameCount must be in 1.."+s,null))
r=1/b
q=1/d
p=A.d([],t.hg)
for(o=0;o<s;++o){n=B.d.F(o,b)*r
m=n+r
l=1-B.d.b_(o,b)*q
k=l-q
if(o<4){if(!(o<4))return A.c(c,o)
j=c[o]}else j="frame_"+o
i=1
i=new A.dK(j,o,n,k,m,l,m-n,l-k,n,k,i,1,B.aa)
i.n()
B.b.i(p,i)}i=t.N
h=A.d([],t.cT)
g=A.aw(p,t.po)
f=A.lI(a,i,t.oU)
i=new A.iN(e,g,f,A.a5(i,t.S),A.a5(i,t.f4),h)
i.eM()
i.n()
return i},
cF:function cF(a,b){this.a=a
this.b=b},
dK:function dK(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.as=k
_.ax=l
_.ay=m},
fL:function fL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iN:function iN(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=null},
iO:function iO(){},
h4:function h4(a,b){this.a=a
this.b=b},
da:function da(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m},
h5:function h5(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
eH:function eH(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
h6:function h6(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
eT:function eT(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
h8:function h8(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
h9:function h9(a,b){this.a=a
this.b=b},
dl:function dl(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l},
ha:function ha(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eV:function eV(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.z=i
_.Q=j
_.as=k
_.at=l},
hb:function hb(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
f5:function f5(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f
_.w=g},
hf:function hf(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dC:function dC(a,b,c){this.a=a
this.b=b
this.c=c},
hi:function hi(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cp:function cp(a){this.b=a},
eJ:function eJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ak(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.Y(a.a,a.b,b,c,s,r)},
lR:function lR(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var _=this
_.c=a
_.d=b
_.r=c
_.w=d
_.y=e
_.z=f
_.Q=g
_.as=h
_.at=i
_.ax=j
_.ay=k
_.ch=l
_.CW=m
_.cx=n
_.cy=o
_.db=p
_.dx=q
_.dy=r
_.fr=s},
oO(a){var s
switch(a.a){case 0:s=0
break
case 1:s=1
break
case 2:s=2.5
break
case 3:s=3.5
break
default:s=null}return s},
dM:function dM(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
hm:function hm(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fB:function fB(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hn:function hn(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
n6(a){var s=A.mQ(B.f,B.v,Math.abs(0)<0.99?B.k:B.f)
return new A.c6(A.mR(1,1,B.d.l(1,0.1,3),0.05).k(0,s))},
c6:function c6(a){this.a=a},
fI:function fI(a,b,c,d,e,f,g,h,i,j,k){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k},
hq:function hq(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
qV(c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3=u.l,b4="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[7]=float[7](\n  0.167465,0.153582,0.118331,0.076665,0.041582,0.018907,0.007203\n);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<7;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b5="bloomBlurH",b6="bloomBlurV",b7="dofBlurH",b8="dofBlurV",b9={},c0=c4.b
if(!c0.A(0,"shadows"))throw A.b(A.Z(c4,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=c0.A(0,"ssao")
r=c0.A(0,"bloom")
q=c0.A(0,"dof")
p=c0.A(0,"grade")
o=c0.A(0,"ps1")
n=c0.A(0,"vhs")
m=c0.A(0,"volumetric")
c0=B.d.a0(e9+1,2)
l=B.d.a0(e8+1,2)
k=A.ak(B.au,e9,e8,e7,b2)
j=A.ak(B.au.dI(),e9,e8,b2,b2)
i=e7>1
h=A.ak(B.eI,e9,e8,b2,i?2:1)
g=A.ak(B.eH,c0,l,b2,b2)
A.ak(B.eQ,e9,e8,b2,b2)
f=A.ak(B.eN,e9,e8,b2,b2)
e=A.ak(B.eG,f0,f0,b2,b2)
d=A.ak(B.eJ,c0,l,b2,b2)
c=A.ak(B.eK,c0,l,b2,b2)
b=A.ak(B.eO,c0,l,b2,b2)
a=A.ak(B.eP,c0,l,b2,b2)
a0=$.o0()
a1=i?1:0
a2=A.ak(a0,e9,e8,b2,a1+(m?1:0)+1)
a0=A.ak(B.eD,c0,l,b2,b2)
a1=A.ak(B.eE,c0,l,b2,b2)
a3=A.ak(B.eF,e9,e8,b2,b2)
a4=A.ak(B.eL,e9,e8,b2,b2)
a5=A.ak(B.eR,e9,e8,b2,b2)
a6=A.ak(B.eM,e9,e8,b2,b2)
a7=i?new A.dC(c2,k,j):b2
b9.a=null
a8=A.n6(B.bW)
if(m){a9=i?j:k
b0=new A.fZ(c1,b3,"#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\n\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform mat4 uViewProjection;\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform float uShaftIntensity;\nuniform float uFogDensity;\nuniform float uAnisotropy;\nuniform mat4 uView;\nuniform mat4 uInverseProjection;\nuniform vec3 uVolumetricAlbedo;\nuniform float uVolumetricHeightFalloff;\nuniform float uVolumetricDustDensity;\nuniform float uVolumetricJitter;\nuniform float uVolumetricIntensity;\nuniform float uVolumetricSampleCount;\nuniform float uVolumetricSourceCount;\n\nuniform vec3 uSourcePosition0;\nuniform vec3 uSourceColor0;\nuniform float uSourceIntensity0;\nuniform float uSourceReferenceDistance0;\nuniform float uSourceCutoffDistance0;\nuniform vec3 uSourcePosition1;\nuniform vec3 uSourceColor1;\nuniform float uSourceIntensity1;\nuniform float uSourceReferenceDistance1;\nuniform float uSourceCutoffDistance1;\nuniform vec3 uSourcePosition2;\nuniform vec3 uSourceColor2;\nuniform float uSourceIntensity2;\nuniform float uSourceReferenceDistance2;\nuniform float uSourceCutoffDistance2;\nuniform vec3 uSourcePosition3;\nuniform vec3 uSourceColor3;\nuniform float uSourceIntensity3;\nuniform float uSourceReferenceDistance3;\nuniform float uSourceCutoffDistance3;\n\nfloat linearDepth(float depth) {\n  float z = depth * 2.0 - 1.0;\n  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);\n}\n\nfloat phaseHenyeyGreenstein(float cosTheta, float anisotropy) {\n  float g = clamp(anisotropy, -0.85, 0.85);\n  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;\n  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));\n}\n\nvec3 sourceContribution(\n  vec3 position,\n  vec3 color,\n  float intensity,\n  float referenceDistance,\n  float cutoffDistance,\n  vec3 viewRay,\n  float rayLength\n) {\n  vec4 clip = uViewProjection * vec4(position, 1.0);\n  if (clip.w <= 0.0) return vec3(0.0);\n  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;\n  float sourceDistance = length(sourceView);\n  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);\n  vec3 sampleToSource = sourceView - viewRay * tClosest;\n  float distanceToSource = max(length(sampleToSource), 1e-3);\n  float cutoff = 1.0 - smoothstep(\n    cutoffDistance * 0.65, cutoffDistance, sourceDistance);\n  float inverseSquare = intensity * referenceDistance * referenceDistance /\n      max(distanceToSource * distanceToSource,\n          referenceDistance * referenceDistance);\n  // The incoming direction is source -> sample and the outgoing direction is\n  // sample -> camera. This is the same phase convention as the directional\n  // medium path, but now evaluated against the located source.\n  float phase = phaseHenyeyGreenstein(\n    dot(normalize(sampleToSource), viewRay), uAnisotropy);\n  // Located practicals and lightning must also acquire visible body in a\n  // dust-filled room. Use the same broad haze plus particulate density as the\n  // directional march; otherwise a clear-air fog toggle would accidentally\n  // erase dust-lit source rays while the directional shafts still showed it.\n  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);\n  float mediumWeight = 1.0 - exp(-max(\n    mediumDensity * min(rayLength, cutoffDistance), 0.0));\n  float pathWeight = clamp(\n    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);\n  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *\n    uVolumetricIntensity * 0.35;\n}\n\nvoid main() {\n  float depth = texture(uSceneDepth, vUv).r;\n  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);\n  viewPoint /= max(abs(viewPoint.w), 1e-5);\n  vec3 viewRay = normalize(viewPoint.xyz);\n  // linearDepth is camera-space Z; convert it to distance along the actual\n  // reconstructed ray so wide and tall projections integrate equally.\n  float cameraDepth = linearDepth(depth);\n  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);\n  float density = max(uFogDensity, 0.0);\n\n  // A fixed, bounded integral keeps the pass deterministic and makes its\n  // cost predictable on weak adapters. The depth buffer stops integration at\n  // the first opaque surface, so shafts do not leak through geometry.\n  const int maxSampleCount = 24;\n  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));\n  vec3 scatter = vec3(0.0);\n  float transmittance = 1.0;\n  float stepLength = rayLength / float(sampleCount);\n  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);\n  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);\n  for (int i = 0; i < maxSampleCount; i++) {\n    if (i >= sampleCount) break;\n    float distanceAlongRay = clamp(\n      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);\n    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));\n    // Dust is a separate, host-resolved particulate phase. It is denser near\n    // the occupied room volume than the broad atmospheric haze, so shafts gain\n    // visible body without turning the far horizon opaque. At zero density the\n    // extra term is exactly zero and the established fog path is unchanged.\n    float dustWeight = exp(-max(distanceAlongRay *\n      uVolumetricHeightFalloff * 0.45, 0.0));\n    float opticalDensity = density +\n      max(uVolumetricDustDensity, 0.0) * dustWeight;\n    float opticalDepth = opticalDensity * stepLength * heightWeight;\n    float sampleTransmittance = exp(-opticalDepth);\n    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);\n    scatter += transmittance * (uLightColor * uVolumetricAlbedo *\n      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;\n    transmittance *= sampleTransmittance;\n  }\n\n  if (uVolumetricSourceCount > 0.5) {\n    scatter += sourceContribution(\n      uSourcePosition0, uSourceColor0, uSourceIntensity0,\n      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 1.5) {\n    scatter += sourceContribution(\n      uSourcePosition1, uSourceColor1, uSourceIntensity1,\n      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 2.5) {\n    scatter += sourceContribution(\n      uSourcePosition2, uSourceColor2, uSourceIntensity2,\n      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 3.5) {\n    scatter += sourceContribution(\n      uSourcePosition3, uSourceColor3, uSourceIntensity3,\n      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);\n  }\n\n  // Fade the final sample at the far plane and keep the additive output\n  // bounded so a storm flash cannot blow out the entire frame.\n  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);\n  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);\n}\n","#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\nuniform sampler2D uVolumetric;\nuniform float uVolumetricStrength;\n\nvoid main() {\n  vec3 light = texture(uVolumetric, vUv).rgb;\n  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);\n}\n",c2,e1,c8,g,f,a9,h,A.d([],t.J))}else b0=b2
g=t.o5
b1=A.d([],g)
if(!m)h=i?j:k
if(r){B.b.G(b1,A.d([new A.da(c1,b3,b4,c2,b5,b5,B.bF,!0,h,b,e0,c0,l),new A.da(c1,b3,b4,c2,b6,b6,B.hN,!1,b,a,c6,c0,l),new A.eH(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",c2,c7,a,h,a2)],g))
h=a2}if(q){B.b.G(b1,A.d([new A.dl(c1,b3,b4,c2,b7,b7,B.bG,h,a0,e0,c0,l),new A.dl(c1,b3,b4,c2,b8,b8,B.hO,a0,a1,d1,c0,l),new A.eV(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvoid main(){\n  if(uStrength<=0.0001){\n    oColor=vec4(texture(uSharp,vUv).rgb,1.0);\n    return;\n  }\n\n  vec2 texelSize=1.0/vec2(textureSize(uSharp,0));\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n\n  // Signed disparity relative to physical focal plane:\n  // Foreground (signedDisparity < 0) exhibits optical hyper-focal expansion,\n  // blurring at a steeper rate than background (signedDisparity > 0).\n  float signedDisparity=depth-uFocusDistance;\n  float normRange=max(uFocusRange,0.0001);\n  float signedCoc=(signedDisparity<0.0)\n    ?(signedDisparity/(normRange*0.75))\n    :(signedDisparity/(normRange*1.25));\n  float rawCoc=clamp(abs(signedCoc),0.0,1.0)*clamp(uStrength,0.0,1.0);\n\n  // Depth-aware disparity weighting to prevent out-of-focus foreground halos\n  // from bleeding over sharp in-focus background edges.\n  float depthN=linearDepth(texture(uSceneDepth,vUv+vec2(0.0,texelSize.y*2.0)).r);\n  float depthS=linearDepth(texture(uSceneDepth,vUv-vec2(0.0,texelSize.y*2.0)).r);\n  float depthE=linearDepth(texture(uSceneDepth,vUv+vec2(texelSize.x*2.0,0.0)).r);\n  float depthW=linearDepth(texture(uSceneDepth,vUv-vec2(texelSize.x*2.0,0.0)).r);\n  float minNeighborDepth=min(min(depthN,depthS),min(depthE,depthW));\n\n  // If this pixel is in-focus background but neighbors are close foreground,\n  // suppress foreground halo bleeding onto this sharp pixel.\n  float coc=rawCoc;\n  if(depth>uFocusDistance && minNeighborDepth<uFocusDistance){\n    float bleedProtection=clamp((depth-minNeighborDepth)/(normRange*2.0),0.0,1.0);\n    coc=mix(rawCoc,rawCoc*0.25,bleedProtection);\n  }\n\n  // Smooth cubic hermite curve for cinematic optical circle of confusion\n  float smoothCoc=coc*coc*(3.0-2.0*coc);\n\n  // Longitudinal (axial) chromatic aberration inside the optical bokeh circle:\n  // Out-of-focus highlights separate into subtle complementary chromatic fringes.\n  vec2 radialDir=vUv-vec2(0.5);\n  float radialDist=length(radialDir);\n  vec2 chromaDir=(radialDist>0.001)?(radialDir/radialDist):vec2(0.0,1.0);\n  vec2 chromaOffset=chromaDir*(smoothCoc*texelSize*2.8*sign(signedDisparity));\n\n  vec3 blurred=vec3(\n    texture(uBlurred,vUv-chromaOffset).r,\n    texture(uBlurred,vUv).g,\n    texture(uBlurred,vUv+chromaOffset).b\n  );\n\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,smoothCoc),1.0);\n}\n",c2,e0,d2,e1,c8,h,f,a1,a3)],g))
h=a3}if(p){B.b.i(b1,new A.f5(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",c2,d4,h,a4))
h=a4}if(o){B.b.i(b1,new A.fB(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",c2,h,a5))
h=a5}if(n){B.b.i(b1,new A.fY(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',c2,e6,e5,h,a6))
h=a6}j=A.d([new A.eT(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d7,d6,c5,f)],g)
if(s)j.push(new A.fN(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=16;\nconst vec3 KERNEL[16]=vec3[16](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48),\n  vec3( 0.22, 0.14, 0.72),\n  vec3(-0.18,-0.25, 0.65),\n  vec3( 0.42,-0.28, 0.35),\n  vec3(-0.36, 0.32, 0.52),\n  vec3( 0.15, 0.58, 0.25),\n  vec3(-0.48, 0.12, 0.39),\n  vec3( 0.28,-0.52, 0.22),\n  vec3(-0.24,-0.42, 0.58)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  float rawDepth=texture(uSceneDepth,vUv).r;\n  if(rawDepth>=0.9999){\n    oColor=vec4(1.0);\n    return;\n  }\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    vec3 toOccluder=occluderView-originView;\n    float angleWeight=max(dot(normalView,normalize(toOccluder)),0.0);\n    float bias=max(0.015,abs(originView.z)*0.001);\n    occlusion+=(occluderView.z>=samplePos.z+bias?1.0:0.0)*rangeCheck*(0.35+0.65*angleWeight);\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",c2,e1,c8,d))
if(s)j.push(new A.fM(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float rawCenter=texture(uSceneDepth,vUv).r;\n  if(rawCenter>=0.9999){\n    oColor=vec4(1.0);\n    return;\n  }\n  float centerDepth=linearDepth(rawCenter);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleRaw=texture(uSceneDepth,sampleUv).r;\n      if(sampleRaw>=0.9999) continue;\n      float sampleDepth=linearDepth(sampleRaw);\n      float spatialDistSq=float(x*x+y*y);\n      float spatialWeight=exp(-spatialDistSq*0.22);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*6.0);\n      float totalWeight=spatialWeight*depthWeight;\n      sum+=texture(uSsaoRaw,sampleUv).r*totalWeight;\n      weightSum+=totalWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',c2,e4,e1,c8,c0,l,d,c))
j.push(new A.fI(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d7,d6,c5,c9,b2,b2,new A.kI(b9),e))
j.push(new A.fJ(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nuniform vec3 uReflectionColor;\nuniform float uReflectionIntensity;\nuniform float uReflectionConfidence;\nuniform vec2 uShadowMapTexelSize;\nuniform float uShadowFilterRadius;\nuniform float uShadowBias;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uSpecularScale;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nuniform float uSurfaceSnowCoverage;\nuniform float uSurfaceDissolution;\nuniform float uThermalSourceCount;\nuniform vec3 uThermalSourcePosition0;\nuniform float uThermalSourceRadius0;\nuniform float uThermalSourceDissolution0;\nuniform vec3 uThermalSourcePosition1;\nuniform float uThermalSourceRadius1;\nuniform float uThermalSourceDissolution1;\nuniform vec3 uThermalSourcePosition2;\nuniform float uThermalSourceRadius2;\nuniform float uThermalSourceDissolution2;\nuniform vec3 uThermalSourcePosition3;\nuniform float uThermalSourceRadius3;\nuniform float uThermalSourceDissolution3;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nfloat directSpotAttenuation(vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,float lightRange,float innerCos,float outerCos,float enabled){\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return coneFalloff*distanceFalloff*enabled;\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  float atten=directSpotAttenuation(worldPos,lightPosition,lightDirection,\n    lightRange,innerCos,outerCos,enabled);\n  return lightColor*lightIntensity*ndotl*atten;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\n// Disney/Burley energy-conserving diffuse retro-reflection model\nfloat diffuseBurley(float ndotl,float ndotv,float lndoth,float roughness){\n  float fd90=0.5+2.0*roughness*lndoth*lndoth;\n  float lightScatter=1.0+(fd90-1.0)*pow(clamp(1.0-ndotl,0.0,1.0),5.0);\n  float viewScatter=1.0+(fd90-1.0)*pow(clamp(1.0-ndotv,0.0,1.0),5.0);\n  return lightScatter*viewScatter;\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 fresnelSchlickRoughness(float cosTheta,vec3 f0,float roughness){\n  return f0+(max(vec3(1.0-roughness),f0)-f0)*pow(clamp(1.0-cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0);\n  float ndotl=max(dot(normal,lightDir),0.0);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlickRoughness(hdotv,f0,roughness);\n  float distribution=distributionGgx(ndoth,roughness);\n  float geometry=geometrySmith(ndotv,ndotl,roughness);\n  vec3 numerator=distribution*geometry*fresnel;\n  float denominator=max(4.0*ndotv*ndotl,0.001);\n  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog keeps the smooth distance ramp for authored horizon control, but\n// the participating-medium term is an analytic optical depth along the actual\n// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the\n// integral has a stable constant-height limit and therefore does not shimmer\n// when a surface is nearly level with the camera. Zero density remains an\n// exact no-op; the host can still use the distance ramp independently.\nfloat heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){\n  float segmentLength=length(rayEnd-rayStart);\n  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;\n  float falloff=max(uFogHeightFalloff,0.);\n  float h0=max(rayStart.y,0.);\n  float h1=max(rayEnd.y,0.);\n  float integral;\n  if(falloff<=0.||abs(h1-h0)<=0.0001){\n    integral=segmentLength*exp(-falloff*h0);\n  }else{\n    float denominator=falloff*(h1-h0);\n    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;\n  }\n  return max(uFogDensity*integral,0.);\n}\n\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=(uFogEnd>uFogStart&&uFogEnd>1.0)?smoothstep(uFogStart,uFogEnd,viewDepth):0.0;\n  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);\n  float mediumFactor=1.-exp(-opticalDepth);\n  return clamp(max(distFactor,mediumFactor),0.,1.);\n}\n\nconst vec2 VOGEL_16[16]=vec2[16](\n  vec2( 0.1768,  0.0000),\n  vec2(-0.2263,  0.2064),\n  vec2( 0.0346, -0.3938),\n  vec2( 0.2809,  0.3739),\n  vec2(-0.5186, -0.1111),\n  vec2( 0.4907, -0.3224),\n  vec2(-0.1724,  0.6137),\n  vec2(-0.2642, -0.6316),\n  vec2( 0.6186,  0.3860),\n  vec2(-0.6698,  0.3824),\n  vec2( 0.3479, -0.7314),\n  vec2( 0.1770,  0.8291),\n  vec2(-0.6558, -0.5927),\n  vec2( 0.8719,  0.2891),\n  vec2(-0.7099,  0.6348),\n  vec2( 0.1983, -0.9641)\n);\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);\n  // 16-tap Vogel spiral with golden ratio rotation produces silky smooth\n  // penumbras free of regular lattice banding or directional noise.\n  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);\n  // Adaptive contact-hardening: estimate blocker proximity to sharpen contact shadows\n  float blockerSum=0.0;\n  float blockerCount=0.0;\n  for(int b=0;b<4;b++){\n    float depthSample=texture(uShadowMap,projCoord.xy+VOGEL_16[b*4]*t*1.5).r;\n    if(depthSample<projCoord.z-bias){\n      blockerSum+=depthSample;\n      blockerCount+=1.0;\n    }\n  }\n  float penumbraScale=1.0;\n  if(blockerCount>0.0){\n    float avgBlockerDepth=blockerSum/blockerCount;\n    float penumbraRatio=clamp((projCoord.z-avgBlockerDepth)/max(projCoord.z,0.0001),0.0,1.0);\n    penumbraScale=mix(0.38,1.0,smoothstep(0.0002,0.012,penumbraRatio));\n  }\n  vec2 filterRadius=t*penumbraScale;\n  float sum=0.;\n  for(int i=0;i<16;i++){\n    sum+=sampleShadow(projCoord+vec3(VOGEL_16[i]*filterRadius,0.),bias);\n  }\n  return sum/16.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  // A double-sided surface seen from behind is the same sheet facing the\n  // other way: negate the finished (normal-mapped) front normal, so a bump\n  // on the front reads as a dent from behind. Single-sided materials cull\n  // back faces, so this only affects double-sided ones.\n  if(!gl_FrontFacing) n=-n;\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  direct*=uDirectLightScale;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  float upward=clamp(n.y*0.5+0.5,0.0,1.0);\n  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao*mix(0.85,1.15,upward);\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Weather changes the material before direct and environment response.\n  // Thawing therefore affects the same specular lobe the viewer sees,\n  // instead of changing only diffuse color after the highlight is computed.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);\n  // A steady spherical conductive field decays approximately as 1/r. The\n  // host keeps the slow latent material memory in uSurfaceDissolution; this\n  // local term therefore models the spatial heat field without making warm\n  // surfaces snap back or disappear at an arbitrary exponential radius.\n  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/\n      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));\n  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/\n      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));\n  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/\n      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));\n  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/\n      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));\n  thermalDissolution=clamp(thermalDissolution,0.0,1.0);\n  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*\n    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);\n  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);\n  float dissolution=thermalDissolution;\n  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);\n  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  // A continuous water film forms a second dielectric lobe. It smooths the\n  // authored surface only as coverage rises, so damp cloth stays diffuse\n  // while puddled stone gains a tight grazing reflection.\n  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);\n  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  float spotAtten0=directSpotAttenuation(vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  if(spotAtten0>0.001){\n    specular+=specularContribution(n,viewDir,normalize(uDirectSpotPosition0-vWorldPos),\n      uDirectSpotColor0,uDirectSpotIntensity0,spotAtten0,baseColor,specRough,metal);\n  }\n  float spotAtten1=directSpotAttenuation(vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  if(spotAtten1>0.001){\n    specular+=specularContribution(n,viewDir,normalize(uDirectSpotPosition1-vWorldPos),\n      uDirectSpotColor1,uDirectSpotIntensity1,spotAtten1,baseColor,specRough,metal);\n  }\n  float spotAtten2=directSpotAttenuation(vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  if(spotAtten2>0.001){\n    specular+=specularContribution(n,viewDir,normalize(uDirectSpotPosition2-vWorldPos),\n      uDirectSpotColor2,uDirectSpotIntensity2,spotAtten2,baseColor,specRough,metal);\n  }\n  specular*=uDirectLightScale*uSpecularScale;\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*(1.0-0.25*rough));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);\n  float coat=coatStrength*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*\n    uDirectLightScale*uSpecularScale;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  // Environment fallback reflections are deliberately bounded and weighted\n  // by wetness/grazing angle. A real probe/history hit can raise confidence;\n  // the current host fallback remains visible but never masquerades as SSR.\n  float reflectionNdotV=max(dot(n,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metal);\n  vec3 envFresnel=f0+(max(vec3(1.0-specRough),f0)-f0)*pow(clamp(1.0-reflectionNdotV,0.0,1.0),5.0);\n  float envGloss=(1.0-specRough)*(1.0-specRough);\n  float reflectionSurface=clamp(metal*0.85+(1.0-metal)*(wetness+0.18*dissolution+envGloss*0.25),0.0,1.0);\n  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);\n  float reflectionWeight=clamp(\n    uReflectionIntensity*reflectionSurface*\n      (1.0-0.72*rough)*reflectionConfidence,\n    0.0,1.0);\n  vec3 reflectDir=reflect(-viewDir,n);\n  float refUp=clamp(reflectDir.y*0.5+0.5,0.0,1.0);\n  // Ambient radiance is colour \xd7 intensity, as in the diffuse term above;\n  // the raw colour made dark scenes (night) reflect a bright sky.\n  vec3 envAmbient=uAmbientColor*uAmbientIntensity*uAmbientLightScale;\n  vec3 envRadiance=mix(envAmbient*0.35,mix(envAmbient,uReflectionColor,refUp),refUp);\n  vec3 sunReflectDir=normalize(uDirectionalDirection);\n  float sunRdotL=max(dot(reflectDir,sunReflectDir),0.0);\n  envRadiance+=uDirectionalColor*pow(sunRdotL,mix(32.0,4.0,specRough))*(1.0-specRough)*0.4;\n  lit+=envRadiance*envFresnel*reflectionWeight*ao;\n  float backScatter=max(dot(-viewDir,normalize(uDirectionalDirection)),0.0);\n  vec3 subsurface=baseColor*uDirectionalColor*(pow(backScatter,4.0)*(1.0-metal)*0.12*uDirectionalIntensity);\n  lit+=subsurface;\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  // Glow carries the same coverage as colour: opaque draws write alpha 1 as\n  // before, while blended and additive draws (both blend with srcAlpha)\n  // fade their glow with the sprite instead of blooming the whole quad.\n  oGlow=vec4(emissive,outAlpha);\n}\n",d7,d6,c5,d8,d9,d3,d5,e2,new A.kJ(b9,a8),c9,d0,e3,s,e9,e8,f0,f0,e,c,k))
if(a7!=null)j.push(a7)
if(b0!=null)j.push(b0)
B.b.G(j,b1)
j.push(new A.dM(c1,b3,u.m,c2,h,c3))
return new A.eW(j)},
kI:function kI(a){this.a=a},
kJ:function kJ(a,b){this.a=a
this.b=b},
fJ:function fJ(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.CW=r
_.cx=s
_.cy=a0
_.db=a1
_.dx=a2
_.dy=a3},
hr:function hr(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.CW=r},
fN:function fN(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
ht:function ht(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fM:function fM(a,b,c,d,e,f,g,h,i,j,k){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k},
hs:function hs(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fY:function fY(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
hy:function hy(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
fZ:function fZ(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l},
hA:function hA(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hz:function hz(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dR:function dR(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h1:function h1(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hD:function hD(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ne(a,b){var s=t.c,r=A.bo(a,!0,s)
B.b.ak(r,new A.is(t.a))
s=A.aw(r,s)
if(s.length===0)A.l(A.f("KeyframeTrack requires at least one keyframe",null))
return new A.fX(b,s)},
fe:function fe(a,b){this.a=a
this.b=b},
b9:function b9(a,b,c){this.a=a
this.b=b
this.$ti=c},
c0:function c0(){},
is:function is(a){this.a=a},
jJ:function jJ(a,b){this.a=a
this.b=b},
fX:function fX(a,b){this.a=a
this.b=b},
hH:function hH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cQ:function cQ(a,b){this.a=a
this.b=0
this.c=b},
hI:function hI(a){this.a=a},
hJ:function hJ(a){this.a=a},
f7:function f7(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
_.dx=a
_.dy=b
_.fr=!0
_.fy=_.fx=null
_.a=c
_.b=d
_.c=e
_.e=_.d=!0
_.f=null
_.r=f
_.w=g
_.x=h
_.y=i
_.z=j
_.Q=k
_.as=l
_.at=!0
_.ax=m
_.ay=n
_.ch=o
_.CW=p
_.cx=q
_.cy=r
_.db=null},
lV(a,b,c,d,e,f,g,h,i,j,k,l,m){var s=t.cL
s=new A.bc(i,l,B.F,A.d([],s),A.d([],s),b,h,g,f,m,d,a,!0,!0,k,e)
s.cv(a,b,!0,d,e,f,g,h,i,!0,k,l,m)
return s},
bc:function bc(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=!0
_.f=null
_.r=d
_.w=e
_.x=f
_.y=g
_.z=h
_.Q=i
_.as=j
_.at=!0
_.ax=k
_.ay=l
_.ch=m
_.CW=n
_.cx=o
_.cy=p
_.db=null},
jq:function jq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fG(a,b){return new A.dW(a,b)},
ii:function ii(a,b){this.a=a
this.b=b},
f0:function f0(a,b){this.a=a
this.b=b},
f3:function f3(a,b){this.a=a
this.b=b},
f4:function f4(a,b){this.a=a
this.b=b},
f_:function f_(a,b,c){this.a=a
this.b=b
this.c=c},
f2:function f2(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
cx:function cx(a,b){this.a=a
this.b=b},
dr:function dr(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
f1:function f1(a,b){this.a=a
this.b=b},
cL:function cL(a,b){this.a=a
this.b=b},
dW:function dW(a,b){this.a=a
this.b=b},
bu:function bu(a,b){this.a=a
this.b=b},
i:function i(a,b){this.a=a
this.b=b},
df:function df(a,b){this.a=a
this.b=b},
eU:function eU(a,b){this.a=a
this.b=b},
j2(a,b,c,d){var s=0,r=A.me(t.co),q,p,o,n,m,l,k,j,i,h
var $async$j2=A.mh(function(e,f){if(e===1)return A.m8(f,r)
for(;;)switch(s){case 0:i=B.bX.fz(a)
h=i==null?null:new A.fF(i.a,new A.eQ(new A.eR(),new A.dT()),new A.eZ(A.d([],t.c8),B.cf),A.d([],t.oZ),B.at,A.d([],t.is),null)
if(h==null){q=null
s=1
break}p=A.e(a.clientWidth)>0?A.e(a.clientWidth):A.e(a.width)
o=A.e(a.clientHeight)>0?A.e(a.clientHeight):A.e(a.height)
n=v.G
m=A.na(o,p,A.aF(A.k(n.window).devicePixelRatio),2,!0)
a.width=m.c
a.height=m.d
l=A.r0(c)
s=3
return A.m7(A.kH(new A.j3(m),l,h,m),$async$j2)
case 3:h.bh()
k=A.pm(h.w.a.b)
B.b.i(h.d,k)
l=t.N
j=new A.dL(a,h,k,new A.ib(),A.lV(B.A,null,!0,B.S,null,null,null,null,"root",!0,0,B.F,-1),B.cd,B.ex,m,new A.hP(),A.ag(l),new A.hI(A.a5(l,t.dp)),A.d([],t.mC),A.d([],t.a3),A.ag(l),A.a5(t.W,t.oz),A.a5(l,t.lO),2)
j.RG=A.aF(A.k(n.window).devicePixelRatio)
j.y=A.mU(5,B.h)
j.w=!0
j.eN()
q=j
s=1
break
case 1:return A.m9(q,r)}})
return A.ma($async$j2,r)},
cv:function cv(a,b){this.a=a
this.b=b},
dL:function dL(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=!1
_.x=h
_.y=null
_.z=i
_.as=j
_.at=k
_.ax=l
_.ay=m
_.ch=null
_.db=n
_.dx=o
_.dy=p
_.fx=_.fr=0
_.fy=!1
_.go=0
_.k2=_.id=!1
_.ok=_.k4=_.k3=0
_.p1=null
_.p4=_.p3=_.p2=0
_.R8=q
_.RG=1
_.rx=!0
_.ry=!1},
j3:function j3(a){this.a=a},
iR:function iR(a){this.a=a},
iS:function iS(a){this.a=a},
iT:function iT(a){this.a=a},
iV:function iV(a){this.a=a},
iW:function iW(){},
iX:function iX(a){this.a=a},
iY:function iY(a){this.a=a},
iZ:function iZ(a){this.a=a},
j_:function j_(a){this.a=a},
j0:function j0(a){this.a=a},
j1:function j1(a){this.a=a},
iU:function iU(a){this.a=a},
fy:function fy(a,b){this.a=a
this.b=b},
ij:function ij(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
ik:function ik(){},
il:function il(){},
ei:function ei(a,b){this.a=a
this.b=b},
bP:function bP(a,b){var _=this
_.a=0
_.b=a
_.f=_.c=null
_.$ti=b},
bb:function bb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=0
_.$ti=d},
os(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.cu(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
hL:function hL(a,b){this.a=a
this.b=b},
cn:function cn(a,b){this.a=a
this.b=b},
hX:function hX(a,b){this.a=a
this.b=b},
i0:function i0(a,b){this.a=a
this.b=b},
cu:function cu(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p},
ar:function ar(a,b){this.a=a
this.b=b},
jR:function jR(){this.a=null},
pY(){var s=t.N
return new A.cX(A.a5(s,t.m),A.ag(s))},
pz(a){var s=new A.h_(a,B.l,new A.jR(),A.pJ(a),A.ag(t.N),A.a5(t.m,t.mK))
s.ee(a)
return s},
pJ(a){var s,r,q=t.kM.a(a.getSupportedExtensions())
if(q==null)return A.ag(t.N)
s=A.ag(t.N)
r=J.ad(t.bF.b(q)?q:new A.dd(q,A.H(q).h("dd<1,x>")))
while(r.p())s.i(0,r.gq())
return s},
at(a,b){var s,r
if(a.b!==B.l)A.l(A.n(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.e(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.e(s.drawingBufferWidth),A.e(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.e(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
ng(a,b){var s
if(a.b!==B.l)A.l(A.n(u.k))
switch(b){case 1:a.a.drawBuffers(A.d([A.e(v.G.WebGL2RenderingContext.COLOR_ATTACHMENT0)],t.n))
break
case 2:s=v.G
a.a.drawBuffers(A.d([A.e(s.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(s.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
break
default:throw A.b(A.f("WebGl2Device.setColorAttachmentCount: count must be 1 or 2, got "+b,null))}},
pE(a,b,c){var s,r,q,p
if(a.b!==B.l)A.l(A.n(u.k))
s=t.V.a(c.a)
r=a.a
q=v.G
r.activeTexture(A.e(q.WebGL2RenderingContext.TEXTURE0)+b)
p=s.f
if(p!=null){r.bindTexture(A.e(q.WebGL2RenderingContext.TEXTURE_2D),p)
return}throw A.b(A.n("WebGl2Device.bindGlowTexture: target has no glow attachment \u2014 create it with GpuTargetAttachment.colorAndGlow/colorDepthGlow, and resolve a multisampled source before sampling (single-sample only)"))},
pD(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.e(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.e(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
pC(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
nf(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.ZERO)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.ONE)
break
case 2:s=A.e(v.G.WebGL2RenderingContext.SRC_ALPHA)
break
case 3:s=A.e(v.G.WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA)
break
case 4:s=A.e(v.G.WebGL2RenderingContext.DST_ALPHA)
break
case 5:s=A.e(v.G.WebGL2RenderingContext.ONE_MINUS_DST_ALPHA)
break
default:s=null}return s},
pA(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.e(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
ab(a,b){var s,r,q,p
if(a.b!==B.l)A.l(A.n(u.k))
s=a.f
r=s.fC(b)
if(r.a===0)return
if(r.A(0,B.av)){q=v.G
p=a.a
if(b.a)p.enable(A.e(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.e(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.A(0,B.aw))a.a.depthFunc(A.pD(a,b.b))
if(r.A(0,B.ax))a.a.depthMask(b.c)
if(r.A(0,B.aB)){q=v.G
p=a.a
if(b.w)p.enable(A.e(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.e(q.WebGL2RenderingContext.CULL_FACE))}if(r.A(0,B.aC))a.a.cullFace(A.pC(a,b.x))
if(r.A(0,B.bp)){q=v.G.WebGL2RenderingContext
q=A.e(q.CCW)
a.a.frontFace(q)}if(r.A(0,B.ay)){q=v.G
p=a.a
if(b.d)p.enable(A.e(q.WebGL2RenderingContext.BLEND))
else p.disable(A.e(q.WebGL2RenderingContext.BLEND))}if(r.A(0,B.az))a.a.blendFunc(A.nf(a,b.e),A.nf(a,b.f))
if(r.A(0,B.aA))a.a.blendEquation(A.pA(a,b.r))
if(r.A(0,B.bn))a.a.colorMask(!0,!0,!0,!0)
if(r.A(0,B.bo)){q=v.G.WebGL2RenderingContext
a.a.disable(A.e(q.SCISSOR_TEST))}s.a=b},
pB(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.e(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.e(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.e(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
b4(a,b,c,d,e,f){var s
if(a.b!==B.l)A.l(A.n(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.pB(a,b))},
ax(a,b){var s
if(a.b!==B.l)A.l(A.n(u.k))
s=A.k(b.a)
a.a.useProgram(s)
a.bE(s)},
h(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.l)A.l(A.n(u.k))
s=a.e
if(s==null)throw A.b(A.n("WebGl2Device.setUniform called with no bound program"))
r=a.x
q=r.a
p=q.B(0,b)
if(p==null){o=r.b
if(o.A(0,b))return
p=A.u(a.a.getUniformLocation(s,b))
if(p==null){o.i(0,b)
return}q.E(0,b,p)}switch(c.a.a){case 0:a.a.uniform1f(p,A.cZ(c.b))
break
case 1:n=t.B.a(c.b)
q=n.length
if(0>=q)return A.c(n,0)
o=n[0]
if(1>=q)return A.c(n,1)
a.a.uniform2f(p,o,n[1])
break
case 2:n=t.B.a(c.b)
q=n.length
if(0>=q)return A.c(n,0)
o=n[0]
if(1>=q)return A.c(n,1)
m=n[1]
if(2>=q)return A.c(n,2)
a.a.uniform3f(p,o,m,n[2])
break
case 3:n=t.B.a(c.b)
q=n.length
if(0>=q)return A.c(n,0)
o=n[0]
if(1>=q)return A.c(n,1)
m=n[1]
if(2>=q)return A.c(n,2)
l=n[2]
if(3>=q)return A.c(n,3)
A.an(a.a,"uniform4f",[p,o,m,l,n[3]],t.H)
break
case 4:a.a.uniformMatrix4fv(p,!1,t.B.a(c.b))
break
case 5:a.a.uniformMatrix4fv(p,!1,t.B.a(c.b))
break
case 6:a.a.uniform1i(p,A.e(c.b))
break}},
af(a,b){if(a.b!==B.l)A.l(A.n(u.k))
a.a.bindVertexArray(A.k(b.a))},
U(a,b,c){var s,r,q,p,o,n
if(a.b!==B.l)A.l(A.n(u.k))
s=c.a
r=a.a
q=v.G
r.activeTexture(A.e(q.WebGL2RenderingContext.TEXTURE0)+b)
if(s instanceof A.es){p=s.d>1?A.e(q.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.e(q.WebGL2RenderingContext.TEXTURE_2D)
r.bindTexture(p,s.a)
return}if(s instanceof A.er){o=s.b
if(o!=null){r.bindTexture(A.e(q.WebGL2RenderingContext.TEXTURE_2D),o)
return}n=s.e
if(n!=null){r.bindTexture(A.e(q.WebGL2RenderingContext.TEXTURE_2D),n)
return}throw A.b(A.n("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.b(A.n("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
pF(a,b,c){var s,r,q,p
if(a.b!==B.l)A.l(A.n(u.k))
s=A.k(b.a)
r=a.a
q=v.G
r.bindBuffer(A.e(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),s)
A:{p=q.WebGL2RenderingContext
r.bufferData(A.e(p.ELEMENT_ARRAY_BUFFER),c,A.e(q.WebGL2RenderingContext.STATIC_DRAW))
break A}},
pG(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.e(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
nj(a,b){var s,r,q,p
if(a.b!==B.l)A.l(A.n(u.k))
s=a.a
r=A.u(s.createBuffer())
if(r==null)throw A.b(A.n("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.aT?A.e(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.e(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.pG(a,b.b))
return new A.by(r,a.Q)},
nh(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.e(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
ni(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
pH(a,b,c){var s=b>c?b:c,r=1
for(;s>1;s=(s+1)/2|0)++r
return r},
lX(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(a.b!==B.l)A.l(A.n(u.k))
s=a.a
r=A.u(s.createTexture())
if(r==null)throw A.b(A.n("WebGl2Device: gl.createTexture() returned null"))
q=b.c
p=q>1
o=v.G
n=p?A.e(o.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.e(o.WebGL2RenderingContext.TEXTURE_2D)
s.bindTexture(n,r)
m=b.d
l=m?A.pH(a,b.a,b.b):1
k=t.H
j=b.a
i=b.b
if(p)A.an(s,"texStorage3D",[n,l,A.e(o.WebGL2RenderingContext.RGBA8),j,i,q],k)
else A.an(s,"texStorage2D",[n,l,A.e(o.WebGL2RenderingContext.RGBA8),j,i],k)
s.texParameteri(n,A.e(o.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.nh(a,b.e))
s.texParameteri(n,A.e(o.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.nh(a,b.f))
p=b.r
s.texParameteri(n,A.e(o.WebGL2RenderingContext.TEXTURE_WRAP_S),A.ni(a,p))
s.texParameteri(n,A.e(o.WebGL2RenderingContext.TEXTURE_WRAP_T),A.ni(a,p))
h=a.az("EXT_texture_filter_anisotropic")
g=h?a.cS(34047):1
f=b.w
if(!isFinite(f)||f<1||f>16)A.l(A.Z(f,"requested","anisotropy must be finite and in [1, 16]"))
if(h&&isFinite(g)&&g>=1)e=g>16?16:g
else e=1
f=f<e?f:e
if(f>1)s.texParameterf(n,34046,f)
return new A.by(new A.es(r,j,i,q,m),a.Q)},
lY(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.l)A.l(A.n(u.k))
s=t.R.a(b.a)
r=s.d
if(c>=r)throw A.b(A.f("WebGl2Device.uploadTextureLayer: layer "+c+" out of range for "+r+"-layer texture",null))
q=s.b
p=s.c
o=q*p*4
n=d.length
if(n!==o)throw A.b(A.f("WebGl2Device.uploadTextureLayer: expected "+o+" RGBA8 bytes for "+q+"x"+p+", got "+n,null))
r=r>1
n=v.G
m=r?A.e(n.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.e(n.WebGL2RenderingContext.TEXTURE_2D)
l=a.a
l.bindTexture(m,s.a)
k=t.H
if(r)A.an(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.e(n.WebGL2RenderingContext.RGBA),A.e(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.an(l,"texSubImage2D",[m,0,0,0,q,p,A.e(n.WebGL2RenderingContext.RGBA),A.e(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
nk(a,b){var s,r,q
if(a.b!==B.l)A.l(A.n(u.k))
s=t.R.a(b.a)
if(!s.e)return
r=v.G
q=s.d>1?A.e(r.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.e(r.WebGL2RenderingContext.TEXTURE_2D)
r=a.a
r.bindTexture(q,s.a)
r.generateMipmap(q)},
h0(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
nm(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.l)A.l(A.n(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.b(A.f("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.u(r.createFramebuffer())
if(q==null)throw A.b(A.n("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.e(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.am
if(n&&!a1.e)throw A.b(A.f("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.aV||o===B.cm
l=d
k=d
j=d
i=d
if(n){r.drawBuffers(A.d([A.e(p.WebGL2RenderingContext.NONE)],t.n))
r.readBuffer(A.e(p.WebGL2RenderingContext.NONE))}else{o=a1.c
h=t.H
g=a1.b
if(o>1){k=A.u(r.createRenderbuffer())
r.bindRenderbuffer(A.e(p.WebGL2RenderingContext.RENDERBUFFER),k)
A.an(r,c,[A.e(p.WebGL2RenderingContext.RENDERBUFFER),o,A.e(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.u(r.createRenderbuffer())
r.bindRenderbuffer(A.e(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.an(r,c,[A.e(p.WebGL2RenderingContext.RENDERBUFFER),o,A.e(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.e(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.d([A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.u(r.createTexture())
r.bindTexture(A.e(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.an(r,b,[A.e(p.WebGL2RenderingContext.TEXTURE_2D),1,A.e(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.e(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.e(p.WebGL2RenderingContext.LINEAR))
A.an(r,a,[A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.u(r.createTexture())
r.bindTexture(A.e(p.WebGL2RenderingContext.TEXTURE_2D),j)
A.an(r,b,[A.e(p.WebGL2RenderingContext.TEXTURE_2D),1,A.e(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.e(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.e(p.WebGL2RenderingContext.LINEAR))
A.an(r,a,[A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.e(p.WebGL2RenderingContext.TEXTURE_2D),j,0],h)
r.drawBuffers(A.d([A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}}f=d
e=d
if(a1.e){o=a1.c
h=t.H
g=a1.b
if(o>1){f=A.u(r.createRenderbuffer())
r.bindRenderbuffer(A.e(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.an(r,c,[A.e(p.WebGL2RenderingContext.RENDERBUFFER),o,A.e(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.e(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.u(r.createTexture())
r.bindTexture(A.e(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.an(r,b,[A.e(p.WebGL2RenderingContext.TEXTURE_2D),1,A.e(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.e(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.e(p.WebGL2RenderingContext.NEAREST))
A.an(r,a,[A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.e(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.e(r.checkFramebufferStatus(A.e(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.e(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.e(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.lZ(a0,q,l,k,f,e,j,i)
throw A.b(A.n("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.by(new A.er(q,l,k,f,e,j,i,s,a1.b,a1.c),a0.Q)},
lZ(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
aV(a){var s
if(a.b!==B.l)A.l(A.n(u.k))
s=A.u(a.a.createVertexArray())
if(s==null)throw A.b(A.n("WebGl2Device: gl.createVertexArray() returned null"))
return new A.by(s,a.Q)},
nl(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.u(p.createShader(b))
if(o==null)throw A.b(A.fG(b===A.nU(A.nG(A.nY(),r),q,t.S)?B.bi:B.bj,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.aP(A.bT(p.getShaderParameter(o,A.e(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bz(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.b(A.fG(b===A.nU(A.nG(A.nY(),r),q,t.S)?B.bi:B.bj,s))}return o},
pI(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.l)A.l(A.n(u.k))
q=v.G
s=A.nl(a,A.e(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.nl(a,A.e(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.u(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.b(B.eX)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.aP(A.bT(o.getProgramParameter(n,A.e(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bz(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.fG(B.bk,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.A)(c),++l){k=c[l]
if(A.e(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.fG(B.bl,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.u(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.fG(B.bl,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.by(n,a.Q)},
cX:function cX(a,b){this.a=a
this.b=b},
by:function by(a,b){this.a=a
this.b=b},
es:function es(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
er:function er(a,b,c,d,e,f,g,h,i,j){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j},
hC:function hC(a){this.a=a
this.b=!1},
h_:function h_(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=c
_.r=d
_.w=!1
_.x=null
_.y=e
_.z=f
_.Q=0},
jO:function jO(a){this.a=a},
jP:function jP(a){this.a=a},
kj:function kj(){},
hB:function hB(){},
jN:function jN(a){this.a=a},
jQ:function jQ(){},
kT(){return A.rf()},
rf(){var s=0,r=A.me(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4,k5,k6,k7,k8,k9,l0,l1,l2,l3
var $async$kT=A.mh(function(l4,l5){if(l4===1)return A.m8(l5,r)
for(;;)A:switch(s){case 0:l0={}
l1=v.G
l2=A.u(A.k(l1.document).querySelector("#showcase-canvas"))
l3=t.m
if(!l3.b(l2)){s=1
break}s=3
return A.m7(A.j2(l2,!0,B.bg,!0),$async$kT)
case 3:p=l5
if(p==null){s=1
break}o=p.y
o=o instanceof A.bK?o:null
if(o!=null){o.b=8.5
o.d=0.45
o.a=B.R
o.as=!0
o.at=0.18}n=p.f.dh(B.f_)
p.f=n
p.f=n.fv(B.cR,1,B.b1,B.c9,B.d6,0.85,0.65)
p.r=A.mX()
m=A.u(A.k(l1.document).querySelector("#tone-map-select"))
if(l3.b(m))m.addEventListener("change",A.B(new A.kV(m,p)))
l=A.u(A.k(l1.document).querySelector("#post-preset-select"))
if(l3.b(l))l.addEventListener("change",A.B(new A.kW(l,p,m)))
k=A.u(A.k(l1.document).querySelector("#turntable-toggle"))
j=A.u(A.k(l1.document).querySelector("#turntable-group"))
if(l3.b(k)){k.checked=!0
k.addEventListener("change",A.B(new A.kX(p,k)))}n=t.cL
i=A.d([],n)
h=A.u(A.k(l1.document).querySelector("#camera-mode-select"))
if(l3.b(h))h.addEventListener("change",A.B(new A.l7(h,p,j,i,k)))
g=A.u(A.k(l1.document).querySelector("#shake-button"))
if(l3.b(g))g.addEventListener("click",A.B(new A.lh(p)))
f=A.k(A.k(l1.document).querySelectorAll(".tab-btn"))
e=new A.lo(f,A.k(A.k(l1.document).querySelectorAll(".topic-panel")))
for(d=0;d<A.e(f.length);++d){c=A.u(f.item(d))
if(l3.b(c)){b=A.bz(c.getAttribute("data-topic"))
c.addEventListener("click",A.B(new A.li(e,b==null?"":b)))}}l0.a=14
l0.b=!0
l0.c=1
l0.d=!1
a=A.u(A.k(l1.document).querySelector("#solar-time-slider"))
a0=A.u(A.k(l1.document).querySelector("#solar-time-label"))
a1=A.u(A.k(l1.document).querySelector("#solar-phase-badge"))
a2=A.u(A.k(l1.document).querySelector("#solar-play-pause-btn"))
a3=A.u(A.k(l1.document).querySelector("#solar-speed-select"))
a4=new A.lp(l0,a0,a1)
a5=new A.kU(l0,p,a4)
if(l3.b(a)){a.addEventListener("input",A.B(new A.lj(l0,a,a5)))
a.addEventListener("mousedown",A.B(new A.lk(l0)))
a.addEventListener("mouseup",A.B(new A.ll(l0)))
a.addEventListener("touchstart",A.B(new A.lm(l0)))
a.addEventListener("touchend",A.B(new A.ln(l0)))}if(l3.b(a2))a2.addEventListener("click",A.B(new A.kY(l0,a2)))
if(l3.b(a3))a3.addEventListener("change",A.B(new A.kZ(l0,a3)))
a5.$0()
a6=A.u(A.k(l1.document).querySelector("#dof-slider"))
a7=A.u(A.k(l1.document).querySelector("#dof-label"))
if(l3.b(a6))a6.addEventListener("input",A.B(new A.l_(a6,a7,p)))
a8=A.u(A.k(l1.document).querySelector("#bloom-slider"))
a9=A.u(A.k(l1.document).querySelector("#bloom-label"))
if(l3.b(a8))a8.addEventListener("input",A.B(new A.l0(a8,a9,p)))
b0=A.u(A.k(l1.document).querySelector("#ssao-slider"))
b1=A.u(A.k(l1.document).querySelector("#ssao-label"))
if(l3.b(b0))b0.addEventListener("input",A.B(new A.l1(b0,b1,p)))
b2=A.p2(30,4,4,30)
b3=p.b
b4=b3.gP().W(b2,"ground")
b5=A.p3(1,40,40)
b6=b3.gP().W(b5,"center_sphere")
b7=A.p4(20,1.8,0.08,48)
b8=b3.gP().W(b7,"orbit_torus")
b9=A.oP(0.6,0.3,12,24)
c0=A.oR(0.9,24,0.35)
c1=A.oQ(0.9,24,0.4)
c2=A.lS(0.65)
c3=A.mZ(0.35,2)
c4=A.p0(0.38)
c5=A.oS(0.35)
c6=A.n_(0.08,2,0.55,0.55,0.55)
c7=[b9,c0,c1,c2,c3,c4,c5,c6]
c8=[b3.gP().W(b9,"satellite_capsule"),b3.gP().W(c0,"satellite_cylinder"),b3.gP().W(c1,"satellite_cone"),b3.gP().W(c2,"satellite_cube"),b3.gP().W(c3,"satellite_icosphere"),b3.gP().W(c4,"satellite_octahedron"),b3.gP().W(c5,"satellite_dodecahedron"),b3.gP().W(c6,"satellite_rounded_box")]
c9=p.an(A.p9(B.cI,32,256,B.cO,2,256),"ground_grid_albedo",256,256)
d0=new Uint8Array(65536)
for(d1=0;d1<256;++d1)for(d2=d1*256,d3=B.d.F(d1,32)>=2,d4=0;d4<256;++d4){d5=!d3||B.d.F(d4,32)<2
d6=d2+d4
d7=d5?220:50
if(!(d6<65536)){q=A.c(d0,d6)
s=1
break A}d0[d6]=d7}d8=p.an(A.pc(d0,256,3,256),"ground_grid_normal",256,256)
d9=p.an(A.p6(0.22,256,0.95,256),"brushed_metal_orm",256,256)
e0=p.an(A.p7(0.22,8,256,0.4,256),"carbon_fiber_orm",256,256)
e1=p.an(A.pa(B.cS,256,20,B.d1,2,256),"hex_shield_albedo",256,256)
e2=p.an(A.pg(B.cX,6,B.cK,256,256),"voronoi_cell_albedo",256,256)
e3=p.an(A.pb(B.cT,256,3.5,4.5,B.cU,256),"marble_albedo",256,256)
e4=p.an(A.p8(0.18,4,256,18,0.95,256),"damascus_steel_orm",256,256)
e5=p.I(A.J(!1,B.i,c9,0.5,B.o,0.2,0,!1,0,null,"ground_pbr",0,null,0.1,B.e,1.5,d8,1,B.e,null,!1,!0,0.5,1,1,1,0,0,8,8))
d2=t.N
e6=A.lM(["gold",p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"hero_gold",0,null,1,B.e,1,null,1,B.e,null,!1,!0,0.12,0.35,0.78,1,0,0,1,1)),"chrome",p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"hero_chrome",0,null,0.98,B.e,1,null,1,B.e,null,!1,!0,0.05,0.98,0.95,0.95,0,0,1,1)),"copper",p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"hero_copper",0,null,1,B.e,1,null,1,B.e,null,!1,!0,0.15,0.54,0.64,0.95,0,0,1,1)),"silver",p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"hero_silver",0,null,1,B.e,1,null,1,B.e,null,!1,!0,0.08,0.91,0.96,0.97,0,0,1,1)),"ceramic",p.I(A.mS(0.9,B.cP,"hero_ceramic",0.18)),"plastic",p.I(A.lP(B.cY,"hero_plastic",0.22)),"iron",p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"hero_iron",0,null,0.85,B.e,1,null,1,B.e,null,!1,!0,0.28,0.58,0.57,0.56,0,0,1,1)),"brushed",p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"hero_brushed",0,null,0.95,B.e,1,null,1,B.e,d9,!1,!0,0.22,1,0.95,0.95,0,0,1,1)),"carbon",p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"hero_carbon",0,null,0.35,B.e,1,null,1,B.e,e0,!1,!0,0.25,0.18,0.15,0.15,0,0,1,1)),"damascus",p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0.6,!1,0,null,"hero_damascus",0,null,0.95,B.e,1,null,1,B.e,e4,!1,!0,0.18,0.94,0.9,0.88,0,0,1,1)),"marble",p.I(A.J(!1,B.i,e3,0.5,B.o,0.08,0.85,!1,0,null,"hero_marble",0,null,0.05,B.e,1,null,1,B.e,null,!1,!0,0.15,1,1,1,0,0,1,1)),"hex",p.I(A.J(!1,B.i,e1,0.5,B.o,0.2,0.8,!1,0,null,"hero_hex",0,null,0.7,B.e,1,null,1,B.e,null,!1,!0,0.15,1,1,1,0,0,1,1)),"voronoi",p.I(A.J(!1,B.i,e2,0.5,B.o,0.2,0.85,!1,0,null,"hero_voronoi",0,null,0.1,B.e,1,null,1,B.e,null,!1,!0,0.3,1,1,1,0,0,1,1))],d2,t.W)
e7=p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"torus_chrome",0,null,0.98,B.e,1,null,1,B.e,null,!1,!0,0.06,0.98,0.95,0.95,0,0,1,1))
e8=[p.I(A.lP(B.d7,"sat_emerald",0.22)),p.I(A.mS(0.8,B.d4,"sat_ruby",0.18)),p.I(A.lP(B.d_,"sat_sapphire",0.2)),p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"sat_copper",0,null,1,B.e,1,null,1,B.e,null,!1,!0,0.2,0.54,0.64,0.95,0,0,1,1)),p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"sat_gold",0,null,1,B.e,1,null,1,B.e,null,!1,!0,0.14,0.35,0.78,1,0,0,1,1)),p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"sat_chrome",0,null,0.98,B.e,1,null,1,B.e,null,!1,!0,0.05,0.98,0.95,0.95,0,0,1,1)),p.I(A.J(!1,B.i,e3,0.5,B.o,0.2,0.8,!1,0,null,"sat_marble",0,null,0.05,B.e,1,null,1,B.e,null,!1,!0,0.16,1,1,1,0,0,1,1)),p.I(A.J(!1,B.i,null,0.5,B.o,0.2,0,!1,0,null,"sat_damascus",0,null,0.95,B.e,1,null,1,B.e,e4,!1,!0,0.2,0.96,0.92,0.9,0,0,1,1))]
d3=p.e
d3.aA(0,e5,b4,b2,"ground_node",new A.T(B.v,B.t,1,B.u))
d6=e6.B(0,"gold")
d6.toString
e9=d3.aA(0,d6,b6,b5,"center_sphere_node",new A.T(B.R,B.t,1,B.u))
f0=A.u(A.k(l1.document).querySelector("#material-select"))
if(l3.b(f0))f0.addEventListener("change",A.B(new A.l2(e6,f0,e9)))
f1=d3.aA(0,e7,b8,b7,"torus_ring_node",new A.T(B.R,B.t,1,B.u))
f2=A.lV(B.A,null,!0,B.S,null,null,null,null,"orbit_ring",!0,0,B.F,-1)
e9.bZ(f2)
B.b.V(i)
for(d=0;d<8;++d){f3=d*0.7853981633974483
d6=c8[d]
d7=c7[d]
B.b.i(i,f2.aA(0,e8[d],d6,d7,"satellite_"+d,new A.T(new A.a(Math.cos(f3)*3.4,0,Math.sin(f3)*3.4),B.t,1,B.u)))}f4=A.lS(0.35)
f5=b3.gP().W(f4,"asteroid_mesh")
f6=p.I(B.e_)
d6=t.bV
f7=A.d([],d6)
f8=new A.cd()
f8.bf(1337)
for(d=0;d<48;++d){f3=d/48*3.141592653589793*2+f8.L()*0.1
f9=5.2+f8.L()*1.8
d7=f8.L()
g0=f8.L()
g1=A.al(new A.a(f8.L()*2-1,f8.L()*2-1,f8.L()*2-1).gm(),f8.L()*3.141592653589793*2)
B.b.i(f7,new A.T(new A.a(Math.cos(f3)*f9,(d7-0.5)*0.8+0.5,Math.sin(f3)*f9),g1,0.5+g0*0.9,B.u))}d6=A.d([],d6)
d7=A.d([],t.jj)
g0=$.mH
$.mH=g0+1
g2=new A.f7(d6,d7,"asteroid_belt",B.F,B.F,A.d([],n),A.d([],n),null,f4,f5,f6,-1,B.S,B.A,!0,!0,0,g0)
g2.cv(B.A,null,!0,B.S,g0,f6,f5,f4,"asteroid_belt",!0,0,B.F,-1)
B.b.G(d6,f7)
d3.bZ(g2)
g3=A.lH(!0,B.ds)
g4=A.d([],t.G)
for(d=0;d<=120;++d)B.b.i(g4,g3.aj(d/120))
g5=A.p5(!0,10,0.12,g4)
g6=b3.gP().W(g5,"conduit_rail")
d3.bp(0,p.I(B.e0),g6,g5,"conduit_rail_node")
g7=d3.f3(0,"ocean_diorama",new A.T(B.bz,B.t,1,B.u))
n=A.aw(A.d([A.ig(0.6,B.fC,2.2,0.45,18),A.ig(0.35,B.fB,1.8,0.35,10),A.ig(0.18,B.fz,1.4,0.25,5.5),A.ig(0.08,B.fA,1.1,0.2,2.2)],t.ky),t.mv)
g8=A.mZ(0.45,2)
g9=b3.gP().W(g8,"ocean_buoy")
h0=g7.aA(0,p.I(B.dZ),g9,g8,"buoy_beacon_node",new A.T(new A.a(15.5,0,3),B.t,1,B.u))
d3=new A.jC(42)
d3.ed(42)
h1=new A.jB(32,32,36,36,3.2,-0.6,13.5,d3)
h2=h1.dV()
h3=b3.gP().W(h2,"island_terrain")
g7.bp(0,p.I(A.J(!1,B.i,p.an(h1.dU(256,256),"terrain_biome_albedo",256,256),0.5,B.o,0.2,0,!1,0,null,"terrain_biome_pbr",0,null,0.05,B.e,1,null,1,B.e,null,!1,!0,0.85,1,1,1,0,0,1,1)),h3,h2,"terrain_node")
h4=new A.jM(38,38,32,32,0)
h4.ej()
d3=h4.f
d3===$&&A.G()
h5=b3.gP().W(d3,"water_surface")
g7.bp(0,p.I(B.dX),h5,d3,"water_node")
h6=A.n_(0.08,3,3.2,0.45,1.8)
h7=b3.gP().W(h6,"vessel_hull")
h8=g7.bp(0,p.I(B.dW),h7,h6,"buoyant_vessel_node")
h9=A.u(A.k(l1.document).querySelector("#terrain-toggle"))
if(l3.b(h9))h9.addEventListener("change",A.B(new A.l3(g7,h9)))
d3=A.d([],t.n)
d6=t.t
d7=A.d([],d6)
i0=new A.ay(d3,d7)
i0.H(new A.a(-0.5,-0.5,0),B.r,B.k,B.ab)
i0.H(new A.a(0.5,-0.5,0),B.r,B.k,B.ac)
i0.H(new A.a(0.5,0.5,0),B.r,B.k,B.bx)
i0.H(new A.a(-0.5,0.5,0),B.r,B.k,B.bw)
B.b.G(d7,A.d([0,1,2,0,2,3],d6))
d7=i0.a9(new A.a4(new A.a(-0.5,-0.5,0),new A.a(0.5,0.5,0)))
i1=b3.gP().W(d7,"particle_quad_mesh")
d7=A.lS(0.15)
i2=b3.gP().W(d7,"particle_cube_mesh")
i3=p.c4(A.pe(2,128,0.05,128),"particle_soft_radial_tex",128,128,B.a6)
i4=p.c4(A.pf(128,64),"particle_spark_streak_tex",128,64,B.a6)
i5=p.I(A.J(!1,B.i,i3,0.5,B.G,0.2,0,!1,3.5,null,"ember_mat",0,null,0,B.e,1,null,1,B.e,null,!1,!0,0.2,0.12,0.55,1,0,0,1,1))
i6=p.I(A.J(!1,B.i,i3,0.5,B.G,0.2,0,!1,0.8,null,"dust_mat",0,null,0.1,B.e,1,null,1,B.e,null,!1,!0,0.4,1,0.88,0.75,0,0,1,1))
i7=p.I(A.J(!1,B.i,i3,0.5,B.G,0.2,0,!1,0,null,"snow_mat",0,null,0.1,B.e,1,null,1,B.e,null,!1,!0,0.8,1,0.98,0.95,0,0,1,1))
i8=A.lG(B.Q,B.bH,B.I,!1,0.55,B.h0,B.h3,5.5,i5,i1,B.h,48,0.055,!1,101,B.hs)
i9=A.lG(B.h7,B.aK,B.A,!1,0.8,B.fQ,B.he,8,i6,i1,B.h,64,0.035,!0,202,B.hw)
j0=A.lG(B.fY,B.aK,B.A,!1,0.85,B.fX,B.hf,7,i7,i1,B.h,80,0.04,!0,303,B.h6)
B.b.i(p.ax,i8)
j1=A.u(A.k(l1.document).querySelector("#particles-select"))
if(l3.b(j1))j1.addEventListener("change",A.B(new A.l4(p,j1,i8,i9,j0)))
j2=p.I(A.J(!1,B.i,i3,0.5,B.G,0.2,0,!1,5.5,null,"vfx_fire_mat",0,null,0,B.e,1,null,1,B.e,null,!1,!0,0.2,0.08,0.45,1,0,0,1,1))
j3=p.I(A.J(!1,B.i,i4,0.5,B.G,0.2,0,!1,7,null,"vfx_spark_mat",0,null,0,B.e,1,null,1,B.e,null,!1,!0,0.1,0.45,0.9,1,0,0,1,1))
j4=p.I(A.J(!1,B.i,i4,0.5,B.G,0.2,0,!1,6,null,"vfx_rocket_mat",0,null,0,B.e,1,null,1,B.e,null,!1,!0,0.1,0.08,0.35,1,0,0,1,1))
j5=p.I(A.J(!1,B.i,i3,0.5,B.G,0.2,0,!1,1,null,"vfx_water_mat",0,null,0.1,B.e,1,null,1,B.e,null,!1,!0,0.1,1,0.82,0.45,0,0,1,1))
j6=p.I(A.J(!1,B.i,i3,0.5,B.G,0.2,0,!1,2,null,"vfx_splash_mat",0,null,0,B.e,1,null,1,B.e,null,!1,!0,0.3,1,0.96,0.9,0,0,1,1))
j7=p.I(A.J(!1,B.i,i3,0.5,B.G,0.2,0,!1,5.5,null,"vfx_vortex_mat",0,null,0,B.e,1,null,1,B.e,null,!1,!0,0.2,1,0.25,0.85,0,0,1,1))
j8=p.I(B.dY)
j9=p.fA("particle_atlas_tex",256,A.pd(256,256),256,B.a6)
d3=A.d(["orb","star","ring","smoke"],t.s)
d6=new A.fL("combustion",A.aw(A.d([0,1,2,3],d6),t.S),8,!0)
d6.n()
k0=A.oN(A.lM(["combustion",d6],d2,t.oU),2,d3,2,j9)
d3=A.J(!1,B.i,j9,0.5,B.G,0.2,0,!1,1.5,null,"vfx_spritesheet_base",0,null,0,B.e,1,null,1,B.e,null,!1,!0,1,1,1,1,0,0,1,1)
k0.fb(b3.gP(),d3)
k1=A.aK(B.h,B.a0,B.A,null,null,null,0.4,B.w,0.1,0.4,B.bB,j2,null,0,0.2,0,2.2,400,2.2,0.9,i1,0,0,0,1.2,0.6,0.5,1,1,0.3,0,B.f,0,0,null,null,null,B.et,k0,0.1,null,new A.T(B.h,B.t,1,B.u))
k2=A.u(A.k(l1.document).querySelector("#vfx-particles-select"))
if(l3.b(k2))k2.addEventListener("change",A.B(new A.l5(new A.lq(p,i1,j2,j4,j3,j7,j5,j6,i7,i2,j8,k1),k2)))
k3=A.u(A.k(l1.document).querySelector("#emit-star-btn"))
if(l3.b(k3))k3.addEventListener("click",A.B(new A.l6(k1)))
k4=A.u(A.k(l1.document).querySelector("#emit-ring-btn"))
if(l3.b(k4))k4.addEventListener("click",A.B(new A.l8(k1)))
k5=A.u(A.k(l1.document).querySelector("#emit-smoke-btn"))
if(l3.b(k5))k5.addEventListener("click",A.B(new A.l9(k1)))
k6=A.u(A.k(l1.document).querySelector("#emit-orb-btn"))
if(l3.b(k6))k6.addEventListener("click",A.B(new A.la(k1)))
k7=A.u(A.k(l1.document).querySelector("#emit-anim-btn"))
if(l3.b(k7))k7.addEventListener("click",A.B(new A.lb(k1)))
p.c8(B.b0,120,0.04,20)
k8=A.u(A.k(l1.document).querySelector("#fog-select"))
if(l3.b(k8))k8.addEventListener("change",A.B(new A.lc(k8,p)))
k9=A.u(A.k(l1.document).querySelector("#asteroid-toggle"))
if(l3.b(k9))k9.addEventListener("change",A.B(new A.ld(g2,k9)))
l0.e=null
l0.f=0
l2.addEventListener("click",A.B(new A.le(l0,p,A.u(A.k(l1.document).querySelector("#picking-status")))))
l3=A.aw(A.d([A.ne(B.b2,e9),A.ne(B.b2,f1)],t.hq),t.aw)
p.at.a.E(0,"hero_bob",new A.cQ(new A.hH("hero_bob",4,B.dK,l3),1))
p.sh1(new A.lf(l0,e9,f1,f2,g2,new A.ih(n,0),h0,h4,h8,new A.hN(B.hu,2,3.5),i,h,a6,p,a,a4))
A.k(l1.window).addEventListener("keydown",A.B(new A.lg(l0,a2,e,a,a5,h)))
p.e5()
case 1:return A.m9(q,r)}})
return A.ma($async$kT,r)},
kV:function kV(a,b){this.a=a
this.b=b},
kW:function kW(a,b,c){this.a=a
this.b=b
this.c=c},
kX:function kX(a,b){this.a=a
this.b=b},
l7:function l7(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
lh:function lh(a){this.a=a},
lo:function lo(a,b){this.a=a
this.b=b},
li:function li(a,b){this.a=a
this.b=b},
lp:function lp(a,b,c){this.a=a
this.b=b
this.c=c},
kU:function kU(a,b,c){this.a=a
this.b=b
this.c=c},
lj:function lj(a,b,c){this.a=a
this.b=b
this.c=c},
lk:function lk(a){this.a=a},
ll:function ll(a){this.a=a},
lm:function lm(a){this.a=a},
ln:function ln(a){this.a=a},
kY:function kY(a,b){this.a=a
this.b=b},
kZ:function kZ(a,b){this.a=a
this.b=b},
l_:function l_(a,b,c){this.a=a
this.b=b
this.c=c},
l0:function l0(a,b,c){this.a=a
this.b=b
this.c=c},
l1:function l1(a,b,c){this.a=a
this.b=b
this.c=c},
l2:function l2(a,b,c){this.a=a
this.b=b
this.c=c},
l3:function l3(a,b){this.a=a
this.b=b},
l4:function l4(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
lq:function lq(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l},
l5:function l5(a,b){this.a=a
this.b=b},
l6:function l6(a){this.a=a},
l8:function l8(a){this.a=a},
l9:function l9(a){this.a=a},
la:function la(a){this.a=a},
lb:function lb(a){this.a=a},
lc:function lc(a,b){this.a=a
this.b=b},
ld:function ld(a,b){this.a=a
this.b=b},
le:function le(a,b,c){this.a=a
this.b=b
this.c=c},
lf:function lf(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p},
lg:function lg(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
nZ(a){return v.mangledGlobalNames[a]},
rp(a){throw A.a1(A.mM(a),new Error())},
G(){throw A.a1(A.oF(""),new Error())},
d5(){throw A.a1(A.oE(""),new Error())},
mp(){throw A.a1(A.mM(""),new Error())},
pr(a){var s=Math.cos(a)
if(s>=0)return 1/(s+0.025*Math.exp(-11*s))
else return 38+(B.a.l(a*57.29577951308232,90,105)-90)/15*62},
lx(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.b(A.Z(b.gfR(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].gt().c.ae()
o=q*16
n=o+16
B.ar.cr(s,o,n,p.a)
if(l)B.ar.cr(r,o,n,p.ck().a)}m=a.a
A.h(m,"uInstanceModels",new A.i(B.bt,s))
if(l)A.h(m,"uInstanceNormalMatrices",new A.i(B.bt,r))
A.h(m,"uUseInstances",B.bu)}},B={}
var w=[A,J,B]
var $={}
A.lK.prototype={}
J.f8.prototype={
a8(a,b){return a===b},
gU(a){return A.fz(a)},
j(a){return"Instance of '"+A.fA(a)+"'"},
gT(a){return A.bf(A.mb(this))}}
J.fb.prototype={
j(a){return String(a)},
gU(a){return a?519018:218159},
gT(a){return A.bf(t.y)},
$iL:1,
$iw:1}
J.dt.prototype={
a8(a,b){return null==b},
j(a){return"null"},
gU(a){return 0},
$iL:1}
J.dv.prototype={$iN:1}
J.bJ.prototype={
gU(a){return 0},
gT(a){return B.fo},
j(a){return String(a)}}
J.fv.prototype={}
J.c7.prototype={}
J.bI.prototype={
j(a){var s=a[$.o1()]
if(s==null)s=a[$.lC()]
if(s==null)return this.ea(a)
return"JavaScript function for "+J.ck(s)},
$ic_:1}
J.du.prototype={
gU(a){return 0},
j(a){return String(a)}}
J.dw.prototype={
gU(a){return 0},
j(a){return String(a)}}
J.r.prototype={
i(a,b){A.H(a).c.a(b)
a.$flags&1&&A.aY(a,29)
a.push(b)},
aa(a,b){var s
a.$flags&1&&A.aY(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aP(a[s],b)){a.splice(s,1)
return!0}return!1},
G(a,b){var s
A.H(a).h("p<1>").a(b)
a.$flags&1&&A.aY(a,"addAll",2)
if(Array.isArray(b)){this.eh(a,b)
return}for(s=J.ad(b);s.p();)a.push(s.gq())},
eh(a,b){var s,r
t.dG.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.aR(a))
for(r=0;r<s;++r)a.push(b[r])},
V(a){a.$flags&1&&A.aY(a,"clear","clear")
a.length=0},
ci(a,b){var s,r=A.c1(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.E(r,s,A.m(a[s]))
return r.join(b)},
a5(a,b){if(!(b>=0&&b<a.length))return A.c(a,b)
return a[b]},
e6(a,b){var s
if(b<0||b>a.length)throw A.b(A.aM(b,0,a.length,"start",null))
s=a.length
if(b===s)return A.d([],A.H(a))
return A.d(a.slice(b,s),A.H(a))},
gau(a){if(a.length>0)return a[0]
throw A.b(A.f9())},
gaE(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.f9())},
gaY(a){var s=a.length
if(s===1){if(0>=s)return A.c(a,0)
return a[0]}if(s===0)throw A.b(A.f9())
throw A.b(A.mI())},
bt(a,b){var s,r
A.H(a).h("w(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.b(A.aR(a))}return!0},
ak(a,b){var s,r,q,p,o,n=A.H(a)
n.h("j(1,1)?").a(b)
a.$flags&2&&A.aY(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.qq()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.bc()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.d2(b,2))
if(p>0)this.eS(a,p)},
e4(a){return this.ak(a,null)},
eS(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
fP(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.c(a,s)
if(J.aP(a[s],b))return s}return-1},
A(a,b){var s
for(s=0;s<a.length;++s)if(J.aP(a[s],b))return!0
return!1},
j(a){return A.lJ(a,"[","]")},
gJ(a){return new J.d8(a,a.length,A.H(a).h("d8<1>"))},
gU(a){return A.fz(a)},
gv(a){return a.length},
sv(a,b){a.$flags&1&&A.aY(a,"set length","change the length of")
if(b<0)throw A.b(A.aM(b,0,null,"newLength",null))
if(b>a.length)A.H(a).c.a(null)
a.length=b},
B(a,b){if(!(b>=0&&b<a.length))throw A.b(A.kM(a,b))
return a[b]},
E(a,b,c){A.H(a).c.a(c)
a.$flags&2&&A.aY(a)
if(!(b>=0&&b<a.length))throw A.b(A.kM(a,b))
a[b]=c},
cc(a,b){var s
A.H(a).h("w(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gT(a){return A.bf(A.H(a))},
$ip:1,
$iC:1}
J.fa.prototype={
hq(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.fA(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.ir.prototype={}
J.d8.prototype={
gq(){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.A(q)
throw A.b(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$ia0:1}
J.cz.prototype={
R(a,b){var s
A.aF(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gb5(b)
if(this.gb5(a)===s)return 0
if(this.gb5(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gb5(a){return a===0?1/a<0:a<0},
cn(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.b(A.bd(""+a+".toInt()"))},
fj(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.b(A.bd(""+a+".ceil()"))},
a6(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.b(A.bd(""+a+".floor()"))},
C(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.bd(""+a+".round()"))},
l(a,b,c){if(this.R(b,c)>0)throw A.b(A.nR(b))
if(this.R(a,b)<0)return b
if(this.R(a,c)>0)return c
return a},
ab(a,b){var s
if(b>20)throw A.b(A.aM(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gb5(a))return"-"+s
return s},
hp(a,b){var s
if(b>20)throw A.b(A.aM(b,0,20,"fractionDigits",null))
s=a.toExponential(b)
if(a===0&&this.gb5(a))return"-"+s
return s},
j(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gU(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
u(a,b){return a+b},
aH(a,b){return a/b},
F(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
if(b<0)return s-b
else return s+b},
b_(a,b){if((a|0)===a)if(b>=1)return a/b|0
return this.d4(a,b)},
a0(a,b){return(a|0)===a?a/b|0:this.d4(a,b)},
d4(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.bd("Result of truncating division is "+A.m(s)+": "+A.m(a)+" ~/ "+b))},
d1(a,b){var s
if(a>0)s=this.eW(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
eW(a,b){return b>31?0:a>>>b},
aW(a,b){return a<=b},
gT(a){return A.bf(t.E)},
$iav:1,
$io:1,
$iau:1}
J.ds.prototype={
gT(a){return A.bf(t.S)},
$iL:1,
$ij:1}
J.fc.prototype={
gT(a){return A.bf(t.i)},
$iL:1}
J.bH.prototype={
aw(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
e9(a,b,c){return a.substring(b,A.ph(b,c,a.length))},
e8(a,b){return this.e9(a,b,null)},
dS(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.c(p,0)
if(p.charCodeAt(0)===133){s=J.oC(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.c(p,r)
q=p.charCodeAt(r)===133?J.oD(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
k(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.b(B.bT)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
dK(a,b,c){var s=b-a.length
if(s<=0)return a
return this.k(c,s)+a},
R(a,b){var s
A.M(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
j(a){return a},
gU(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gT(a){return A.bf(t.N)},
gv(a){return a.length},
$iL:1,
$iav:1,
$imW:1,
$ix:1}
A.cR.prototype={
gJ(a){return new A.dc(J.ad(this.gbm()),A.y(this).h("dc<1,2>"))},
gv(a){return J.bW(this.gbm())},
a5(a,b){return A.y(this).y[1].a(J.lE(this.gbm(),b))},
j(a){return J.ck(this.gbm())}}
A.dc.prototype={
p(){return this.a.p()},
gq(){return this.$ti.y[1].a(this.a.gq())},
$ia0:1}
A.e6.prototype={
B(a,b){return this.$ti.y[1].a(J.lD(this.a,b))},
E(a,b,c){var s=this.$ti
J.eA(this.a,b,s.c.a(s.y[1].a(c)))},
sv(a,b){J.od(this.a,b)},
i(a,b){var s=this.$ti
J.d6(this.a,s.c.a(s.y[1].a(b)))},
$iC:1}
A.dd.prototype={
gbm(){return this.a}}
A.cA.prototype={
j(a){return"LateInitializationError: "+this.a}}
A.ju.prototype={}
A.aS.prototype={}
A.P.prototype={
gJ(a){var s=this
return new A.ah(s,s.gv(s),A.y(s).h("ah<P.E>"))},
aS(a){var s,r=this,q=A.lN(A.y(r).h("P.E"))
for(s=0;s<r.gv(r);++s)q.i(0,r.a5(0,s))
return q}}
A.e_.prototype={
geF(){var s=J.bW(this.a),r=this.c
if(r==null||r>s)return s
return r},
geY(){var s=J.bW(this.a),r=this.b
if(r>s)return s
return r},
gv(a){var s,r=J.bW(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
a5(a,b){var s=this,r=s.geY()+b
if(b<0||r>=s.geF())throw A.b(A.io(b,s.gv(0),s,"index"))
return J.lE(s.a,r)},
dR(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.hF(n),l=m.gv(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.mK(0,n):J.mJ(0,n)}r=A.c1(s,m.a5(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.E(r,q,m.a5(n,o+q))
if(m.gv(n)<l)throw A.b(A.aR(p))}return r},
ho(a){return this.dR(0,!0)}}
A.ah.prototype={
gq(){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=J.hF(q),o=p.gv(q)
if(r.b!==o)throw A.b(A.aR(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.a5(q,s);++r.c
return!0},
$ia0:1}
A.dA.prototype={
gJ(a){var s=this.a
return new A.dB(s.gJ(s),this.b,A.y(this).h("dB<1,2>"))},
gv(a){var s=this.a
return s.gv(s)},
a5(a,b){var s=this.a
return this.b.$1(s.a5(s,b))}}
A.dB.prototype={
p(){var s=this,r=s.b
if(r.p()){s.a=s.c.$1(r.gq())
return!0}s.a=null
return!1},
gq(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$ia0:1}
A.O.prototype={
gv(a){return J.bW(this.a)},
a5(a,b){return this.b.$1(J.lE(this.a,b))}}
A.ac.prototype={
gJ(a){return new A.R(J.ad(this.a),this.b,this.$ti.h("R<1>"))}}
A.R.prototype={
p(){var s,r
for(s=this.a,r=this.b;s.p();)if(r.$1(s.gq()))return!0
return!1},
gq(){return this.a.gq()},
$ia0:1}
A.V.prototype={
sv(a,b){throw A.b(A.bd("Cannot change the length of a fixed-length list"))},
i(a,b){A.bC(a).h("V.E").a(b)
throw A.b(A.bd("Cannot add to a fixed-length list"))}}
A.dU.prototype={
gv(a){return J.bW(this.a)},
a5(a,b){var s=this.a,r=J.hF(s)
return r.a5(s,r.gv(s)-1-b)}}
A.eu.prototype={}
A.F.prototype={$r:"+(1,2)",$s:1}
A.cV.prototype={$r:"+influence,light(1,2)",$s:2}
A.eg.prototype={$r:"+influence,source(1,2)",$s:3}
A.cW.prototype={$r:"+rotation,translation(1,2)",$s:4}
A.ce.prototype={$r:"+(1,2,3)",$s:6}
A.dj.prototype={}
A.di.prototype={
j(a){return A.iv(this)},
gb3(){return new A.bQ(this.fF(),A.y(this).h("bQ<ap<1,2>>"))},
fF(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gb3(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gav(),o=o.gJ(o),n=A.y(s),m=n.y[1],n=n.h("ap<1,2>")
case 2:if(!o.p()){r=3
break}l=o.gq()
k=s.B(0,l)
r=4
return a.b=new A.ap(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iaH:1}
A.a_.prototype={
gv(a){return this.b.length},
gcQ(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
b2(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
B(a,b){if(!this.b2(b))return null
return this.b[this.a[b]]},
b4(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gcQ()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gav(){return new A.c9(this.gcQ(),this.$ti.h("c9<1>"))},
gcp(){return new A.c9(this.b,this.$ti.h("c9<2>"))}}
A.c9.prototype={
gv(a){return this.a.length},
gJ(a){var s=this.a
return new A.ca(s,s.length,this.$ti.h("ca<1>"))}}
A.ca.prototype={
gq(){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$ia0:1}
A.dk.prototype={
i(a,b){A.y(this).c.a(b)
A.on()}}
A.b7.prototype={
gv(a){return this.b},
gdG(a){return this.b!==0},
gJ(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.ca(s,s.length,r.$ti.h("ca<1>"))},
A(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
aS(a){return A.lO(this,this.$ti.c)}}
A.dV.prototype={}
A.jH.prototype={
ah(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.dI.prototype={
j(a){return"Null check operator used on a null value"}}
A.fd.prototype={
j(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.fV.prototype={
j(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.iG.prototype={
j(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.dn.prototype={}
A.ej.prototype={
j(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibN:1}
A.bD.prototype={
j(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.o_(r==null?"unknown":r)+"'"},
gT(a){var s=A.mj(this)
return A.bf(s==null?A.bC(this):s)},
$ic_:1,
ghw(){return this},
$C:"$1",
$R:1,
$D:null}
A.eN.prototype={$C:"$0",$R:0}
A.eO.prototype={$C:"$2",$R:2}
A.fS.prototype={}
A.fO.prototype={
j(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.o_(s)+"'"}}
A.co.prototype={
a8(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.co))return!1
return this.$_target===b.$_target&&this.a===b.a},
gU(a){return(A.hG(this.a)^A.fz(this.$_target))>>>0},
j(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.fA(this.a)+"'")}}
A.fE.prototype={
j(a){return"RuntimeError: "+this.a}}
A.bk.prototype={
gv(a){return this.a},
gav(){return new A.bm(this,A.y(this).h("bm<1>"))},
b2(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.fS(a)},
fS(a){var s=this.d
if(s==null)return!1
return this.bx(this.cO(s,a),a)>=0},
B(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.fT(b)},
fT(a){var s,r,q=this.d
if(q==null)return null
s=this.cO(q,a)
r=this.bx(s,a)
if(r<0)return null
return s[r].b},
E(a,b,c){var s,r,q=this,p=A.y(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.cw(s==null?q.b=q.bU():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.cw(r==null?q.c=q.bU():r,b,c)}else q.fV(b,c)},
fV(a,b){var s,r,q,p,o=this,n=A.y(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bU()
r=o.cd(a)
q=s[r]
if(q==null)s[r]=[o.bV(a,b)]
else{p=o.bx(q,a)
if(p>=0)q[p].b=b
else q.push(o.bV(a,b))}},
b8(a,b){var s,r,q=this,p=A.y(q)
p.c.a(a)
p.h("2()").a(b)
if(q.b2(a)){s=q.B(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.E(0,a,r)
return r},
aa(a,b){var s=this
if(typeof b=="string")return s.cU(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.cU(s.c,b)
else return s.fU(b)},
fU(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.cd(a)
r=n[s]
q=o.bx(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.d9(p)
if(r.length===0)delete n[s]
return p.b},
V(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bT()}},
b4(a,b){var s,r,q=this
A.y(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.aR(q))
s=s.c}},
cw(a,b,c){var s,r=A.y(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bV(b,c)
else s.b=c},
cU(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.d9(s)
delete a[b]
return s.b},
bT(){this.r=this.r+1&1073741823},
bV(a,b){var s=this,r=A.y(s),q=new A.it(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bT()
return q},
d9(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bT()},
cd(a){return J.X(a)&1073741823},
cO(a,b){return a[this.cd(b)]},
bx(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aP(a[r].a,b))return r
return-1},
j(a){return A.iv(this)},
bU(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$imN:1}
A.it.prototype={}
A.bm.prototype={
gv(a){return this.a.a},
gJ(a){var s=this.a
return new A.dy(s,s.r,s.e,this.$ti.h("dy<1>"))}}
A.dy.prototype={
gq(){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.aR(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$ia0:1}
A.b1.prototype={
gv(a){return this.a.a},
gJ(a){var s=this.a
return new A.bn(s,s.r,s.e,this.$ti.h("bn<1>"))}}
A.bn.prototype={
gq(){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.aR(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$ia0:1}
A.bl.prototype={
gv(a){return this.a.a},
gJ(a){var s=this.a
return new A.dx(s,s.r,s.e,this.$ti.h("dx<1,2>"))}}
A.dx.prototype={
gq(){var s=this.d
s.toString
return s},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.aR(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.ap(s.a,s.b,r.$ti.h("ap<1,2>"))
r.c=s.c
return!0}},
$ia0:1}
A.kP.prototype={
$1(a){return this.a(a)},
$S:27}
A.kQ.prototype={
$2(a,b){return this.a(a,b)},
$S:76}
A.kR.prototype={
$1(a){return this.a(A.M(a))},
$S:75}
A.aW.prototype={
gT(a){return A.bf(this.cP())},
cP(){return A.r1(this.$r,this.bS())},
j(a){return this.d8(!1)},
d8(a){var s,r,q,p,o,n=this.eH(),m=this.bS(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.c(m,q)
o=m[q]
l=a?l+A.n0(o):l+A.m(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
eH(){var s,r=this.$s
while($.kb.length<=r)B.b.i($.kb,null)
s=$.kb[r]
if(s==null){s=this.ex()
B.b.E($.kb,r,s)}return s},
ex(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.ip(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.b.E(j,q,r[s])}}return A.aw(j,k)}}
A.bw.prototype={
bS(){return[this.a,this.b]},
a8(a,b){if(b==null)return!1
return b instanceof A.bw&&this.$s===b.$s&&J.aP(this.a,b.a)&&J.aP(this.b,b.b)},
gU(a){return A.c3(this.$s,this.a,this.b,B.p,B.p,B.p)}}
A.cU.prototype={
bS(){return[this.a,this.b,this.c]},
a8(a,b){var s=this
if(b==null)return!1
return b instanceof A.cU&&s.$s===b.$s&&J.aP(s.a,b.a)&&J.aP(s.b,b.b)&&J.aP(s.c,b.c)},
gU(a){var s=this
return A.c3(s.$s,s.a,s.b,s.c,B.p,B.p)}}
A.cC.prototype={
gT(a){return B.fh},
$iL:1}
A.dG.prototype={
eP(a,b,c,d){var s=A.aM(b,0,c,d,null)
throw A.b(s)},
cA(a,b,c,d){if(b>>>0!==b||b>c)this.eP(a,b,c,d)}}
A.fi.prototype={
gT(a){return B.fi},
$iL:1}
A.aj.prototype={
gv(a){return a.length},
$iaG:1}
A.dE.prototype={
B(a,b){A.bA(b,a,a.length)
return a[b]},
E(a,b,c){A.cZ(c)
a.$flags&2&&A.aY(a)
A.bA(b,a,a.length)
a[b]=c},
cr(a,b,c,d){var s,r,q,p
t.id.a(d)
a.$flags&2&&A.aY(a,5)
s=a.length
this.cA(a,b,s,"start")
this.cA(a,c,s,"end")
if(b>c)A.l(A.aM(b,0,c,null,null))
r=c-b
q=d.length
if(q<r)A.l(A.n("Not enough elements"))
p=q!==r?d.subarray(0,r):d
a.set(p,b)
return},
$ip:1,
$iC:1}
A.dF.prototype={
E(a,b,c){A.e(c)
a.$flags&2&&A.aY(a)
A.bA(b,a,a.length)
a[b]=c},
$ip:1,
$iC:1}
A.dD.prototype={
gT(a){return B.fj},
$iL:1,
$ii6:1}
A.fj.prototype={
gT(a){return B.fk},
$iL:1,
$ii7:1}
A.fk.prototype={
gT(a){return B.fl},
B(a,b){A.bA(b,a,a.length)
return a[b]},
$iL:1}
A.fl.prototype={
gT(a){return B.fm},
B(a,b){A.bA(b,a,a.length)
return a[b]},
$iL:1}
A.fm.prototype={
gT(a){return B.fn},
B(a,b){A.bA(b,a,a.length)
return a[b]},
$iL:1}
A.fn.prototype={
gT(a){return B.fq},
B(a,b){A.bA(b,a,a.length)
return a[b]},
$iL:1}
A.fo.prototype={
gT(a){return B.fr},
B(a,b){A.bA(b,a,a.length)
return a[b]},
$iL:1}
A.dH.prototype={
gT(a){return B.fs},
gv(a){return a.length},
B(a,b){A.bA(b,a,a.length)
return a[b]},
$iL:1}
A.fp.prototype={
gT(a){return B.ft},
gv(a){return a.length},
B(a,b){A.bA(b,a,a.length)
return a[b]},
$iL:1,
$ie0:1}
A.ec.prototype={}
A.ed.prototype={}
A.ee.prototype={}
A.ef.prototype={}
A.b3.prototype={
h(a){return A.eo(v.typeUniverse,this,a)},
Y(a){return A.ny(v.typeUniverse,this,a)}}
A.he.prototype={}
A.kg.prototype={
j(a){return A.aN(this.a,null)}}
A.hc.prototype={
j(a){return this.a}}
A.ek.prototype={$ibs:1}
A.jT.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:13}
A.jS.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:79}
A.jU.prototype={
$0(){this.a.$0()},
$S:14}
A.jV.prototype={
$0(){this.a.$0()},
$S:14}
A.ke.prototype={
ef(a,b){if(self.setTimeout!=null)self.setTimeout(A.d2(new A.kf(this,b),0),a)
else throw A.b(A.bd("`setTimeout()` not found."))}}
A.kf.prototype={
$0(){this.b.$0()},
$S:1}
A.h2.prototype={
c_(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.bI(a)
else{s=r.a
if(q.h("bF<1>").b(a))s.cz(a)
else s.cH(a)}},
c0(a,b){var s=this.a
if(this.b)s.bM(new A.aQ(a,b))
else s.bJ(new A.aQ(a,b))}}
A.kk.prototype={
$1(a){return this.a.$2(0,a)},
$S:7}
A.kl.prototype={
$2(a,b){this.a.$2(1,new A.dn(a,t.l.a(b)))},
$S:25}
A.kG.prototype={
$2(a,b){this.a(A.e(a),b)},
$S:30}
A.bx.prototype={
gq(){var s=this.b
return s==null?this.$ti.c.a(s):s},
eT(a,b){var s,r,q
a=A.e(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
p(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.p()){o.b=s.gq()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.eT(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.ns
return!1}if(0>=p.length)return A.c(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.ns
throw n
return!1}if(0>=p.length)return A.c(p,-1)
o.a=p.pop()
m=1
continue}throw A.b(A.n("sync*"))}return!1},
hy(a){var s,r,q=this
if(a instanceof A.bQ){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.i(r,q.a)
q.a=s
return 2}else{q.d=J.ad(a)
return 2}},
$ia0:1}
A.bQ.prototype={
gJ(a){return new A.bx(this.a(),this.$ti.h("bx<1>"))}}
A.aQ.prototype={
j(a){return A.m(this.a)},
$iS:1,
gaZ(){return this.b}}
A.h7.prototype={
c0(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.n("Future already completed"))
s.bJ(A.qp(a,b))},
df(a){return this.c0(a,null)}}
A.e5.prototype={
c_(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.b(A.n("Future already completed"))
s.bI(r.h("1/").a(a))}}
A.c8.prototype={
h_(a){if((this.c&15)!==6)return!0
return this.b.b.cm(t.iW.a(this.d),a.a,t.y,t.K)},
fO(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.D.b(q))p=l.hm(q,m,a.b,o,n,t.l)
else p=l.cm(t.x.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.do.b(A.bh(s))){if((r.c&1)!==0)throw A.b(A.f("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.f("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.a3.prototype={
dQ(a,b,c){var s,r,q=this.$ti
q.Y(c).h("1/(2)").a(a)
s=$.W
if(s===B.J){if(!t.D.b(b)&&!t.x.b(b))throw A.b(A.Z(b,"onError",u.c))}else{c.h("@<0/>").Y(q.c).h("1(2)").a(a)
b=A.qF(b,s)}r=new A.a3(s,c.h("a3<0>"))
this.bH(new A.c8(r,3,a,b,q.h("@<1>").Y(c).h("c8<1,2>")))
return r},
d5(a,b,c){var s,r=this.$ti
r.Y(c).h("1/(2)").a(a)
s=new A.a3($.W,c.h("a3<0>"))
this.bH(new A.c8(s,19,a,b,r.h("@<1>").Y(c).h("c8<1,2>")))
return s},
eV(a){this.a=this.a&1|16
this.c=a},
bg(a){this.a=a.a&30|this.a&1
this.c=a.c},
bH(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.e.a(r.c)
if((s.a&24)===0){s.bH(a)
return}r.bg(s)}A.hE(null,null,r.b,t.M.a(new A.jZ(r,a)))}},
cT(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.e.a(m.c)
if((n.a&24)===0){n.cT(a)
return}m.bg(n)}l.a=m.bl(a)
A.hE(null,null,m.b,t.M.a(new A.k2(l,m)))}},
bk(){var s=t.F.a(this.c)
this.c=null
return this.bl(s)},
bl(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cH(a){var s,r=this
r.$ti.c.a(a)
s=r.bk()
r.a=8
r.c=a
A.cS(r,s)},
ev(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.bk()
q.bg(a)
A.cS(q,r)},
bM(a){var s=this.bk()
this.eV(a)
A.cS(this,s)},
bI(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bF<1>").b(a)){this.cz(a)
return}this.ei(a)},
ei(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.hE(null,null,s.b,t.M.a(new A.k0(s,a)))},
cz(a){A.m_(this.$ti.h("bF<1>").a(a),this,!1)
return},
bJ(a){this.a^=2
A.hE(null,null,this.b,t.M.a(new A.k_(this,a)))},
$ibF:1}
A.jZ.prototype={
$0(){A.cS(this.a,this.b)},
$S:1}
A.k2.prototype={
$0(){A.cS(this.b,this.a.a)},
$S:1}
A.k1.prototype={
$0(){A.m_(this.a.a,this.b,!0)},
$S:1}
A.k0.prototype={
$0(){this.a.cH(this.b)},
$S:1}
A.k_.prototype={
$0(){this.a.bM(this.b)},
$S:1}
A.k5.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.hl(t.mY.a(q.d),t.A)}catch(p){s=A.bh(p)
r=A.bB(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.lF(q)
n=k.a
n.c=new A.aQ(q,o)
q=n}q.b=!0
return}if(j instanceof A.a3&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.a3){m=k.b.a
l=new A.a3(m.b,m.$ti)
j.dQ(new A.k6(l,m),new A.k7(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:1}
A.k6.prototype={
$1(a){this.a.ev(this.b)},
$S:13}
A.k7.prototype={
$2(a,b){A.ev(a)
t.l.a(b)
this.a.bM(new A.aQ(a,b))},
$S:31}
A.k4.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.cm(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.bh(l)
r=A.bB(l)
q=s
p=r
if(p==null)p=A.lF(q)
o=this.a
o.c=new A.aQ(q,p)
o.b=!0}},
$S:1}
A.k3.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.h_(s)&&p.a.e!=null){p.c=p.a.fO(s)
p.b=!1}}catch(o){r=A.bh(o)
q=A.bB(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.lF(p)
m=l.b
m.c=new A.aQ(p,n)
p=m}p.b=!0}},
$S:1}
A.h3.prototype={}
A.hu.prototype={}
A.et.prototype={$inn:1}
A.ho.prototype={
hn(a){var s,r,q
t.M.a(a)
try{if(B.J===$.W){a.$0()
return}A.nM(null,null,this,a,t.H)}catch(q){s=A.bh(q)
r=A.bB(q)
A.mf(A.ev(s),t.l.a(r))}},
fc(a){return new A.kc(this,t.M.a(a))},
hl(a,b){b.h("0()").a(a)
if($.W===B.J)return a.$0()
return A.nM(null,null,this,a,b)},
cm(a,b,c,d){c.h("@<0>").Y(d).h("1(2)").a(a)
d.a(b)
if($.W===B.J)return a.$1(b)
return A.qH(null,null,this,a,b,c,d)},
hm(a,b,c,d,e,f){d.h("@<0>").Y(e).Y(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.W===B.J)return a.$2(b,c)
return A.qG(null,null,this,a,b,c,d,e,f)},
dM(a,b,c,d){return b.h("@<0>").Y(c).Y(d).h("1(2,3)").a(a)}}
A.kc.prototype={
$0(){return this.a.hn(this.b)},
$S:1}
A.kF.prototype={
$0(){A.ou(this.a,this.b)},
$S:1}
A.e8.prototype={
gv(a){return this.a},
gav(){return new A.e9(this,this.$ti.h("e9<1>"))},
b2(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.ez(a)},
ez(a){var s=this.d
if(s==null)return!1
return this.ar(this.cF(s,a),a)>=0},
B(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.m0(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.m0(q,b)
return r}else return this.eL(b)},
eL(a){var s,r,q=this.d
if(q==null)return null
s=this.cF(q,a)
r=this.ar(s,a)
return r<0?null:s[r+1]},
E(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.cE(s==null?m.b=A.m1():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.cE(r==null?m.c=A.m1():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.m1()
p=A.hG(b)&1073741823
o=q[p]
if(o==null){A.m2(q,p,[b,c]);++m.a
m.e=null}else{n=m.ar(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
aa(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.b0(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.b0(s.c,b)
else return s.bW(b)},
bW(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.hG(a)&1073741823
r=n[s]
q=o.ar(r,a)
if(q<0)return null;--o.a
o.e=null
p=r.splice(q,2)[1]
if(0===r.length)delete n[s]
return p},
b4(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.cI()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.B(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.aR(m))}},
cI(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.c1(i.a,null,!1,t.A)
s=i.b
r=0
if(s!=null){q=Object.getOwnPropertyNames(s)
p=q.length
for(o=0;o<p;++o){h[r]=q[o];++r}}n=i.c
if(n!=null){q=Object.getOwnPropertyNames(n)
p=q.length
for(o=0;o<p;++o){h[r]=+q[o];++r}}m=i.d
if(m!=null){q=Object.getOwnPropertyNames(m)
p=q.length
for(o=0;o<p;++o){l=m[q[o]]
k=l.length
for(j=0;j<k;j+=2){h[r]=l[j];++r}}}return i.e=h},
cE(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.m2(a,b,c)},
b0(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.m0(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
cF(a,b){return a[A.hG(b)&1073741823]}}
A.eb.prototype={
ar(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.e9.prototype={
gv(a){return this.a.a},
gJ(a){var s=this.a
return new A.ea(s,s.cI(),this.$ti.h("ea<1>"))}}
A.ea.prototype={
gq(){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.aR(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$ia0:1}
A.b5.prototype={
eQ(){return new A.b5(A.y(this).h("b5<1>"))},
gJ(a){var s=this,r=new A.cb(s,s.r,A.y(s).h("cb<1>"))
r.c=s.e
return r},
gv(a){return this.a},
A(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.ey(b)},
ey(a){var s=this.d
if(s==null)return!1
return this.ar(s[this.bN(a)],a)>=0},
i(a,b){var s,r,q=this
A.y(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.cD(s==null?q.b=A.m3():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.cD(r==null?q.c=A.m3():r,b)}else return q.eg(b)},
eg(a){var s,r,q,p=this
A.y(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.m3()
r=p.bN(a)
q=s[r]
if(q==null)s[r]=[p.bL(a)]
else{if(p.ar(q,a)>=0)return!1
q.push(p.bL(a))}return!0},
aa(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.b0(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.b0(s.c,b)
else return s.bW(b)},
bW(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.bN(a)
r=n[s]
q=o.ar(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.cG(p)
return!0},
V(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bK()}},
cD(a,b){A.y(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.bL(b)
return!0},
b0(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.cG(s)
delete a[b]
return!0},
bK(){this.r=this.r+1&1073741823},
bL(a){var s,r=this,q=new A.hh(A.y(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.bK()
return q},
cG(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.bK()},
bN(a){return J.X(a)&1073741823},
ar(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aP(a[r].a,b))return r
return-1},
$imO:1}
A.hh.prototype={}
A.cb.prototype={
gq(){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.aR(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$ia0:1}
A.iu.prototype={
$2(a,b){this.a.E(0,this.b.a(a),this.c.a(b))},
$S:34}
A.I.prototype={
gJ(a){return new A.ah(a,this.gv(a),A.bC(a).h("ah<I.E>"))},
a5(a,b){return this.B(a,b)},
bt(a,b){var s,r
A.bC(a).h("w(I.E)").a(b)
s=this.gv(a)
for(r=0;r<s;++r){if(!b.$1(this.B(a,r)))return!1
if(s!==this.gv(a))throw A.b(A.aR(a))}return!0},
i(a,b){var s
A.bC(a).h("I.E").a(b)
s=this.gv(a)
this.sv(a,s+1)
this.E(a,s,b)},
j(a){return A.lJ(a,"[","]")}}
A.c2.prototype={
b4(a,b){var s,r,q,p=A.y(this)
p.h("~(1,2)").a(b)
for(s=this.gav(),s=s.gJ(s),p=p.y[1];s.p();){r=s.gq()
q=this.B(0,r)
b.$2(r,q==null?p.a(q):q)}},
h6(a,b){var s,r,q,p,o,n=this,m=A.y(n)
m.h("w(1,2)").a(b)
s=A.d([],m.h("r<1>"))
for(r=n.gav(),r=r.gJ(r),m=m.y[1];r.p();){q=r.gq()
p=n.B(0,q)
if(b.$2(q,p==null?m.a(p):p))B.b.i(s,q)}for(m=s.length,o=0;o<s.length;s.length===m||(0,A.A)(s),++o)n.aa(0,s[o])},
gv(a){var s=this.gav()
return s.gv(s)},
j(a){return A.iv(this)},
$iaH:1}
A.iw.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.m(a)
r.a=(r.a+=s)+": "
s=A.m(b)
r.a+=s},
$S:35}
A.ep.prototype={}
A.cB.prototype={
B(a,b){return this.a.B(0,b)},
gv(a){return this.a.a},
gav(){var s=this.a
return new A.bm(s,A.y(s).h("bm<1>"))},
j(a){return A.iv(this.a)},
gcp(){var s=this.a
return new A.b1(s,A.y(s).h("b1<2>"))},
gb3(){var s=this.a
return new A.bl(s,A.y(s).h("bl<1,2>"))},
$iaH:1}
A.e1.prototype={}
A.br.prototype={
gdG(a){return this.gv(this)!==0},
G(a,b){var s
for(s=J.ad(A.y(this).h("p<1>").a(b));s.p();)this.i(0,s.gq())},
ds(a){var s,r,q=this.aS(0)
for(s=this.gJ(this);s.p();){r=s.gq()
if(a.A(0,r))q.aa(0,r)}return q},
j(a){return A.lJ(this,"{","}")},
ci(a,b){var s,r,q=this.gJ(this)
if(!q.p())return""
s=J.ck(q.gq())
if(!q.p())return s
if(b.length===0){r=s
do r+=A.m(q.gq())
while(q.p())}else{r=s
do r=r+b+A.m(q.gq())
while(q.p())}return r.charCodeAt(0)==0?r:r},
f6(a,b){var s
A.y(this).h("w(1)").a(b)
for(s=this.gJ(this);s.p();)if(b.$1(s.gq()))return!0
return!1},
a5(a,b){var s,r
A.jd(b,"index")
s=this.gJ(this)
for(r=b;s.p();){if(r===0)return s.gq();--r}throw A.b(A.io(b,b-r,this,"index"))},
$ip:1,
$ibM:1}
A.eh.prototype={
aS(a){var s=this.eQ()
s.G(0,this)
return s}}
A.hx.prototype={
i(a,b){this.$ti.c.a(b)
return A.q7()}}
A.e2.prototype={
gv(a){return this.a.a},
gJ(a){var s=this.a
return A.ka(s,s.r,A.y(s).c)},
aS(a){return this.a.aS(0)}}
A.cY.prototype={}
A.eq.prototype={}
A.bX.prototype={
a8(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bX)if(this.a===b.a)s=this.b===b.b
return s},
gU(a){return A.c3(this.a,this.b,B.p,B.p,B.p,B.p)},
R(a,b){var s
t.cs.a(b)
s=B.d.R(this.a,b.a)
if(s!==0)return s
return B.d.R(this.b,b.b)},
j(a){var s=this,r=A.oq(A.p_(s)),q=A.eS(A.oY(s)),p=A.eS(A.oU(s)),o=A.eS(A.oV(s)),n=A.eS(A.oX(s)),m=A.eS(A.oZ(s)),l=A.mF(A.oW(s)),k=s.b,j=k===0?"":A.mF(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iav:1}
A.jW.prototype={
j(a){return this.D()}}
A.S.prototype={
gaZ(){return A.oT(this)}}
A.eC.prototype={
j(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.i1(s)
return"Assertion failed"}}
A.bs.prototype={}
A.b6.prototype={
gbR(){return"Invalid argument"+(!this.a?"(s)":"")},
gbQ(){return""},
j(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.m(p),n=s.gbR()+q+o
if(!s.a)return n
return n+s.gbQ()+": "+A.i1(s.gce())},
gce(){return this.b}}
A.cJ.prototype={
gce(){return A.nC(this.b)},
gbR(){return"RangeError"},
gbQ(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.m(q):""
else if(q==null)s=": Not greater than or equal to "+A.m(r)
else if(q>r)s=": Not in inclusive range "+A.m(r)+".."+A.m(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.m(r)
return s}}
A.f6.prototype={
gce(){return A.e(this.b)},
gbR(){return"RangeError"},
gbQ(){if(A.e(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gv(a){return this.f}}
A.e3.prototype={
j(a){return"Unsupported operation: "+this.a}}
A.fU.prototype={
j(a){return"UnimplementedError: "+this.a}}
A.cN.prototype={
j(a){return"Bad state: "+this.a}}
A.eP.prototype={
j(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.i1(s)+"."}}
A.fr.prototype={
j(a){return"Out of Memory"},
gaZ(){return null},
$iS:1}
A.dY.prototype={
j(a){return"Stack Overflow"},
gaZ(){return null},
$iS:1}
A.jX.prototype={
j(a){return"Exception: "+this.a}}
A.i8.prototype={
j(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.p.prototype={
cb(a,b,c,d){var s,r
d.a(b)
A.y(this).Y(d).h("1(1,p.E)").a(c)
for(s=this.gJ(this),r=b;s.p();)r=c.$2(r,s.gq())
return r},
gv(a){var s,r=this.gJ(this)
for(s=0;r.p();)++s
return s},
gaY(a){var s,r=this.gJ(this)
if(!r.p())throw A.b(A.f9())
s=r.gq()
if(r.p())throw A.b(A.mI())
return s},
fN(a,b){var s,r
A.y(this).h("w(p.E)").a(b)
for(s=this.gJ(this);s.p();){r=s.gq()
if(b.$1(r))return r}throw A.b(A.f9())},
a5(a,b){var s,r
A.jd(b,"index")
s=this.gJ(this)
for(r=b;s.p();){if(r===0)return s.gq();--r}throw A.b(A.io(b,b-r,this,"index"))},
j(a){return A.oA(this,"(",")")}}
A.ap.prototype={
j(a){return"MapEntry("+A.m(this.a)+": "+A.m(this.b)+")"}}
A.a8.prototype={
gU(a){return A.z.prototype.gU.call(this,0)},
j(a){return"null"}}
A.z.prototype={$iz:1,
a8(a,b){return this===b},
gU(a){return A.fz(this)},
j(a){return"Instance of '"+A.fA(this)+"'"},
gT(a){return A.ml(this)},
toString(){return this.j(this)}}
A.hv.prototype={
j(a){return""},
$ibN:1}
A.fP.prototype={
gv(a){return this.a.length},
j(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.iF.prototype={
j(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.ls.prototype={
$1(a){return this.a.c_(this.b.h("0/?").a(a))},
$S:7}
A.lt.prototype={
$1(a){if(a==null)return this.a.df(new A.iF(a===undefined))
return this.a.df(a)},
$S:7}
A.kK.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.nL(a))return a
s=this.a
a.toString
if(s.b2(a))return s.B(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.l(A.aM(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.bS(!0,"isUtc",t.y)
return new A.bX(r,0,!0)}if(a instanceof RegExp)throw A.b(A.f("structured clone of RegExp",null))
if(a instanceof Promise)return A.rh(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.a5(p,p)
s.E(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.d3(n),p=s.gJ(n);p.p();)m.push(A.bT(p.gq()))
for(l=0;l<s.gv(n);++l){k=s.B(n,l)
if(!(l<m.length))return A.c(m,l)
j=m[l]
if(k!=null)o.E(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.E(0,a,o)
h=A.e(a.length)
for(s=J.d3(i),l=0;l<h;++l)o.push(this.$1(s.B(i,l)))
return o}return a},
$S:40}
A.hg.prototype={
aO(a){if(a<=0||a>4294967296)throw A.b(A.n4(u.g+a))
return Math.random()*a>>>0},
L(){return Math.random()},
cj(){return Math.random()<0.5},
$ilT:1}
A.cd.prototype={
bf(a){var s,r,q,p,o,n,m,l=this,k=4294967296
do{s=a>>>0
a=B.d.a0(a-s,k)
r=a>>>0
a=B.d.a0(a-r,k)
q=(~s>>>0)+(s<<21>>>0)
p=q>>>0
r=(~r>>>0)+((r<<21|s>>>11)>>>0)+B.d.a0(q-p,k)>>>0
q=((p^(p>>>24|r<<8))>>>0)*265
s=q>>>0
r=((r^r>>>24)>>>0)*265+B.d.a0(q-s,k)>>>0
q=((s^(s>>>14|r<<18))>>>0)*21
s=q>>>0
r=((r^r>>>14)>>>0)*21+B.d.a0(q-s,k)>>>0
s=(s^(s>>>28|r<<4))>>>0
r=(r^r>>>28)>>>0
q=(s<<31>>>0)+s
p=q>>>0
o=B.d.a0(q-p,k)
q=l.a*1037
n=l.a=q>>>0
m=l.b*1037+B.d.a0(q-n,k)>>>0
l.b=m
n=(n^p)>>>0
l.a=n
o=(m^r+((r<<31|s>>>1)>>>0)+o>>>0)>>>0
l.b=o}while(a!==0)
if(o===0&&n===0)l.a=23063
l.al()
l.al()
l.al()
l.al()},
al(){var s=this,r=s.a,q=4294901760*r,p=q>>>0,o=55905*r,n=o>>>0,m=n+p+s.b
r=m>>>0
s.a=r
s.b=B.d.a0(o-n+(q-p)+(m-r),4294967296)>>>0},
aO(a){var s,r,q,p=this
if(a<=0||a>4294967296)throw A.b(A.n4(u.g+a))
s=a-1
if((a&s)>>>0===0){p.al()
return(p.a&s)>>>0}do{p.al()
r=p.a
q=r%a}while(r-q+a>=4294967296)
return q},
L(){var s,r=this
r.al()
s=r.a
r.al()
return((s&67108863)*134217728+(r.a&134217727))/9007199254740992},
cj(){this.al()
return(this.a&1)===0},
$ilT:1}
A.jg.prototype={}
A.cI.prototype={
D(){return"QualityProfileKind."+this.b}}
A.aL.prototype={}
A.eQ.prototype={
ad(){var s=this
if(s.d)return
s.a.ad()
s.b.ad()
s.d=!0}}
A.eR.prototype={
ad(){if(this.e)return
this.e=!0
this.a=null}}
A.cP.prototype={
D(){return"ToneMappingMode."+this.b}}
A.fw.prototype={
br(a,b,c,d){var s=this,r=a==null?s.b:a,q=c==null?s.c:c,p=b==null?s.d:b,o=d==null?s.fr:d
return A.fx(s.at,r,s.as,p,s.Q,s.a,s.f,s.ay,s.r,s.z,!1,q,s.y,s.x,s.w,o,s.ax,s.ch,s.db,s.dx,s.cy,s.cx,s.CW,s.e)},
dg(a){return this.br(null,a,null,null)},
fm(a){return this.br(null,null,a,null)},
fk(a){return this.br(a,null,null,null)},
fn(a){return this.br(null,null,null,a)},
n(){var s,r,q,p,o,n,m,l,k,j=this,i=null
for(s=j.r,r=j.w,q=j.x,p=j.y,o=j.z,n=A.lM(["exposure",j.a,"bloomStrength",j.b,"ssaoStrength",j.c,"depthOfFieldStrength",j.d,"vignette",j.e,"grain",j.f,"rainIntensity",s,"surfaceWetness",r,"surfaceSnowCoverage",q,"surfaceDissolution",p,"rainWindowVisibility",o,"ditherStrength",j.Q,"colorGradeStrength",j.as,"affineWarpStrength",j.at,"vertexSnapGrid",j.ax,"vhsChromaWeight",j.ch,"vhsTrackingWeight",j.CW,"vhsNoiseWeight",j.cx,"vhsHeadSwitchWeight",j.cy,"vhsDropoutWeight",j.db,"vhsGhostWeight",j.dx],t.N,t.i),n=new A.bl(n,A.y(n).h("bl<1,2>")).gJ(0);n.p();){m=n.d
l=m.a
k=m.b
if(!isFinite(k)||k<0)throw A.b(A.f("PostProcessState."+l+" must be >= 0: "+A.m(k),i))}n=j.ay
if(n<1||n>8)throw A.b(A.f("PostProcessState.quantizationBits must be in [1, 8]: "+n,i))
if(s>1)throw A.b(A.f("PostProcessState.rainIntensity must be in [0, 1]: "+s,i))
if(r>1)throw A.b(A.f("PostProcessState.surfaceWetness must be in [0, 1]: "+r,i))
if(q>1)throw A.b(A.f("PostProcessState.surfaceSnowCoverage must be in [0, 1]: "+q,i))
if(p>1)throw A.b(A.f("PostProcessState.surfaceDissolution must be in [0, 1]: "+p,i))
if(o>1)throw A.b(A.f("PostProcessState.rainWindowVisibility must be in [0, 1]: "+o,i))}}
A.db.prototype={
gdF(){var s,r=this,q=r.x
if(q===$){s=r.b.cg()
r.x!==$&&A.mp()
r.x=s
q=s}return q},
gfY(){var s,r=this,q=r.z
if(q===$){s=r.c.cg()
r.z!==$&&A.mp()
r.z=s
q=s}return q},
n(){var s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=i.d
if(!g.gK(0))throw A.b(A.f("CameraView.eye must be finite: "+g.j(0),h))
g=i.e
if(!g.gK(0)||g.gO()<1e-12)throw A.b(A.f("CameraView.forward must be finite and nonzero: "+g.j(0),h))
g=i.f
if(isFinite(g)){s=i.r
s=!isFinite(s)||g<=0||s<=g}else s=!0
if(s)throw A.b(A.f("CameraView requires 0 < near < far, got "+A.m(g)+"/"+i.r,h))
g=i.w
if(!isFinite(g)||g<=0)throw A.b(A.f("CameraView.aspect must be finite and > 0: "+A.m(g),h))
g=i.a
if(!g.gK(0)||!i.b.gK(0)||!i.c.gK(0))throw A.b(A.f("CameraView matrices must be finite",h))
for(s=i.c.a,r=s.length,g=i.b.k(0,g).a,q=g.length,p=0,o=-1,n=0;n<16;++n){if(!(n<r))return A.c(s,n)
m=s[n]
if(!(n<q))return A.c(g,n)
l=g[n]
k=Math.abs(m-l)/(1+Math.abs(l))
if(k>p){o=n
p=k}}if(p>0.0001){m=B.a.hp(p,2)
l=B.d.a0(o,4)
j=B.d.F(o,4)
if(!(o>=0&&o<r))return A.c(s,o)
s=s[o]
if(!(o<q))return A.c(g,o)
throw A.b(A.f("CameraView.viewProjection must equal projection * view. Worst relative mismatch "+m+" at column "+l+" row "+j+" (got "+A.m(s)+", expected "+A.m(g[o])+"). Prefer CameraView.look/lookAt/fromMatrices, which derive it.",h))}}}
A.dX.prototype={
ft(a,b,c,d,e){var s=this,r=e==null?s.d:e,q=c==null?s.f:c,p=d==null?s.r:d
return new A.dX(s.a,s.b,b,r,a,q,p,s.w,s.x,!0,s.z,s.Q,s.as,s.at,s.ax,s.ay,s.ch,s.CW,s.cx,s.cy,s.db)},
n(){var s,r,q,p,o=this,n=A.d([],t.s),m=new A.jv(n)
if(B.E.dS(o.a).length===0)B.b.i(n,"assetId must not be empty")
for(s=[new A.F("horizon",o.c),new A.F("zenith",o.d),new A.F("ground",o.e)],r=0;r<3;++r){q=s[r]
p=q.b
if(!(isFinite(p.a)&&isFinite(p.b)&&isFinite(p.c)))B.b.i(n,q.a+" must be finite: "+p.j(0))}m.$4("horizonGlow",o.f,0,1)
m.$4("starDensity",o.r,0,0.1)
s=o.w
if(!isFinite(s))B.b.i(n,"rotationRadians must be finite: "+s)
m.$5$loOpen("exposure",o.x,0,17976931348623157e292,!0)
s=o.z
m.$4("cloudCoverage",s,0,1)
m.$4("cloudDensity",o.Q,0,1)
m.$5$loOpen("cloudBaseHeight",o.as,0,1e5,!0)
m.$5$loOpen("cloudThickness",o.at,0,1e5,!0)
m.$5$loOpen("cloudScale",o.ax,0,1,!0)
m.$4("cloudWindX",o.ay,-1000,1000)
m.$4("cloudWindZ",o.ch,-1000,1000)
q=o.CW
if(!isFinite(q))B.b.i(n,"cloudPhase must be finite: "+q)
m.$4("cloudDetail",o.cx,0,1)
m.$4("cloudSilverLining",o.cy,0,1)
if(s>0){s=o.db
s=s<4||s>24}else s=!1
if(s)B.b.i(n,"cloudSampleCount="+o.db+" (expected [4, 24] while cloudCoverage > 0)")
if(n.length!==0)throw A.b(A.f("SkyboxDeclaration is invalid: "+B.b.ci(n,"; "),null))}}
A.jv.prototype={
$5$loOpen(a,b,c,d,e){var s,r=e?b<=c:b<c
if(!isFinite(b)||r||b>d){s=e?"(":"["
B.b.i(this.a,a+"="+A.m(b)+" (expected "+s+c+", "+A.m(d)+"])")}},
$4(a,b,c,d){return this.$5$loOpen(a,b,c,d,!1)},
$S:54}
A.eY.prototype={
n(){var s,r,q,p,o,n,m,l,k,j=this,i=null
if(!j.a.gK(0)||!j.b.gK(0)||!j.fx.gK(0)||!j.r.gK(0)||!j.dx.gK(0))throw A.b(A.f("FrameEnvironment colors must be finite",i))
s=j.k4
if(s!=null)s.n()
s=j.c
if(isFinite(s)){r=j.d
r=!isFinite(r)||r<s}else r=!0
if(r)throw A.b(A.f("FrameEnvironment requires fogEnd >= fogStart, got "+s+"/"+j.d,i))
s=j.fy
if(!isFinite(s)||s<0)throw A.b(A.f("FrameEnvironment.ambientIntensity must be >= 0: "+A.m(s),i))
s=j.go
if(s!=null)s.n()
for(s=j.id,r=s.length,q=0;q<r;++q){p=s[q]
o=p.b
if(!(isFinite(o.a)&&isFinite(o.b)&&isFinite(o.c)))A.l(A.f("PointLight.position must be finite: "+o.j(0),i))
o=p.d
if(!isFinite(o)||o<0)A.l(A.f("PointLight.intensity must be >= 0: "+A.m(o),i))
o=p.e
if(!isFinite(o)||o<=0)A.l(A.f("PointLight.radius must be > 0: "+A.m(o),i))}for(s=isFinite(0),r=isFinite(1),o=isFinite(-1),q=0;!1;++q){if(s)n=r
else n=!1
if(!n)A.l(A.f("SpotLight.position must be finite: "+B.f.j(0),i))
if(s)n=o
else n=!1
if(!n)A.l(A.f("SpotLight.direction must be finite and nonzero: "+B.v.j(0),i))}s=t.N
m=A.ag(s)
for(r=j.k2,q=0;!1;++q){l=r[q]
l.n()
if(!m.i(0,l.gN()))throw A.b(A.f("FrameEnvironment.volumetricSources contains duplicate id: "+A.m(l.gN()),i))}r=j.w
o=!0
if(!(r<0))if(isFinite(r)){r=j.x
if(!(r<0))if(!(r>0.5))if(isFinite(r)){r=j.y
if(!(r<=-0.999))if(!(r>=0.999))if(isFinite(r)){r=j.z
if(!(r<0))if(!(r>0.5))if(isFinite(r)){r=j.Q
if(!(r<0))if(!(r>8))if(isFinite(r)){r=j.as
if(r>=4)if(r<=24){r=j.at
if(r<=3)if(isFinite(r)){r=j.ax
if(r<=3)if(isFinite(r)){r=j.ay
if(r<=3)if(isFinite(r)){r=j.ch
if(r<=2)if(isFinite(r)){r=j.CW
if(r<=2)if(isFinite(r)){r=j.cx
if(r<=2)if(isFinite(r)){r=j.cy
if(r<=3)if(isFinite(r)){r=j.db
if(!(r<0))if(!(r>0.01))if(isFinite(r)){r=j.dy
if(!(r<0))if(!(r>4))if(isFinite(r)){r=j.fr
r=r<0||r>1||!isFinite(r)}else r=o
else r=o
else r=o}else r=o
else r=o
else r=o}else r=o
else r=o}else r=o
else r=o}else r=o
else r=o}else r=o
else r=o}else r=o
else r=o}else r=o
else r=o}else r=o
else r=o}else r=o
else r=o}else r=o
else r=o
else r=o}else r=o
else r=o
else r=o}else r=o
else r=o
else r=o}else r=o
else r=o
else r=o}else r=o
else r=o
if(r)throw A.b(A.f("invalid volumetric medium controls",i))
k=A.ag(s)
for(s=j.k3,q=0;!1;++q){l=s[q]
l.n()
if(!k.i(0,l.gN()))throw A.b(A.f("FrameEnvironment.thermalSources contains duplicate id: "+A.m(l.gN()),i))}},
aB(a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this
A.nB(c3)
t.aE.a(b2)
s=a5==null?a2.a:a5
r=a7==null?a2.b:a7
q=b1==null?a2.c:b1
p=a9==null?a2.d:a9
o=b0===B.q?a2.e:A.m6(b0)
n=a8===B.q?a2.f:A.m6(a8)
m=b7==null?a2.r:b7
l=c0==null?a2.w:c0
k=b9==null?a2.x:b9
j=b8==null?a2.y:b8
i=c2==null?a2.z:c2
h=c1==null?a2.Q:c1
g=c3==null?a2.as:c3
f=b3==null?a2.dx:b3
e=b5==null?a2.dy:b5
d=b4==null?a2.fr:b4
c=a3==null?a2.fx:a3
b=a4==null?a2.fy:a4
a=a6===B.q?a2.go:t.dl.a(a6)
a0=b2==null?a2.id:b2
a1=b6===B.q?a2.k4:t.cB.a(b6)
return new A.eY(s,r,q,p,o,n,m,l,k,j,i,h,g,a2.at,a2.ax,a2.ay,a2.ch,a2.CW,a2.cx,a2.cy,a2.db,f,e,d,c,b,a,a0,a2.k1,a2.k2,a2.k3,a1)},
dh(a){var s=null
return this.aB(s,s,s,B.q,s,B.q,s,B.q,s,s,s,s,s,a,s,s,s,s,s,s,s)},
fv(a,b,c,d,e,f,g){var s=null
return this.aB(a,b,c,d,s,B.q,s,B.q,s,s,e,f,g,B.q,s,s,s,s,s,s,s)},
fl(a){var s=null
return this.aB(s,s,s,B.q,s,B.q,s,B.q,s,a,s,s,s,B.q,s,s,s,s,s,s,s)},
fq(a,b,c,d,e){var s=null
return this.aB(a,b,s,c,d,B.q,s,B.q,s,s,e,s,s,B.q,s,s,s,s,s,s,s)},
fw(a,b,c,d,e,f,g){var s=null
return this.aB(s,s,s,B.q,s,B.q,s,B.q,s,s,s,s,s,B.q,a,b,c,d,e,f,g)},
fo(a,b,c,d){var s=null
return this.aB(s,s,s,B.q,s,a,b,c,d,s,s,s,s,B.q,s,s,s,s,s,s,s)},
fs(a,b,c,d,e){var s=null
return this.aB(s,s,s,B.q,a,b,c,d,e,s,s,s,s,B.q,s,s,s,s,s,s,s)}}
A.ia.prototype={}
A.ib.prototype={
cf(a){++this.b}}
A.bp.prototype={
a8(a,b){if(b==null)return!1
return J.eB(b)===A.ml(this)&&b instanceof A.bp&&this.a===b.a&&this.b===b.b},
gU(a){return A.c3(A.ml(this),this.a,this.b,B.p,B.p,B.p)}}
A.aJ.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MeshHandle(#"+this.a+"."+this.b+s+")"}}
A.aE.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"TextureHandle(#"+this.a+"."+this.b+s+")"}}
A.b2.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MaterialHandle(#"+this.a+"."+this.b+s+")"}}
A.fu.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"PipelineHandle(#"+this.a+"."+this.b+s+")"}}
A.b8.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.cy.prototype={
D(){return"HandleRejection."+this.b}}
A.im.prototype={
j(a){return"HandleException("+this.a.b+", "+this.b.j(0)+")"}}
A.cH.prototype={
j(a){var s=this.b,r=this.a.a
return s==null?r.b+": ok":r.b+": "+A.m(s)}}
A.eI.prototype={}
A.kL.prototype={
$1(a){return t.q.a(a)===this.a},
$S:71}
A.v.prototype={
gK(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
a8(a,b){if(b==null)return!1
return b instanceof A.v&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gU(a){return A.c3(this.a,this.b,this.c,B.p,B.p,B.p)},
j(a){return"LinearColor("+A.m(this.a)+", "+A.m(this.b)+", "+A.m(this.c)+")"}}
A.ct.prototype={
n(){var s=this.a
if(!s.gK(0)||s.gO()<1e-12)throw A.b(A.f("DirectionalLight.direction must be finite and nonzero: "+s.j(0),null))
s=this.c
if(!isFinite(s)||s<0)throw A.b(A.f("DirectionalLight.intensity must be >= 0: "+A.m(s),null))}}
A.aC.prototype={}
A.aD.prototype={}
A.lv.prototype={
$2(a,b){var s,r=t.jX
r.a(a)
s=B.a.R(r.a(b).a,a.a)
return s===0?0:s},
$S:73}
A.lu.prototype={
$2(a,b){var s,r=t.eJ
r.a(a)
r.a(b)
s=B.a.R(b.a,a.a)
return s===0?B.d.R(a.b.a,b.b.a):s},
$S:74}
A.d7.prototype={
D(){return"AlphaMode."+this.b}}
A.fg.prototype={
D(){return"MaterialMapColorSpace."+this.b}}
A.aq.prototype={
dj(a,b,c,d,e,f,g,h,i){var s=this,r=a==null?s.b:a,q=e==null?s.d:e,p=d==null?s.e:d,o=c==null?s.f:c,n=h==null?s.db:h,m=i==null?s.dx:i,l=f==null?s.dy:f,k=g==null?s.fr:g
return A.J(!1,s.c,r,s.fy,s.fx,s.CW,s.ch,!1,s.w,s.r,b,s.cy,s.cx,s.ax,s.y,s.z,s.x,s.ay,s.as,s.Q,!1,!0,s.at,o,p,q,l,k,n,m)},
fp(a,b,c,d){var s=null
return this.dj(s,a,b,c,d,s,s,s,s)},
fu(a,b,c,d,e,f){return this.dj(a,b,null,null,null,c,d,e,f)},
n(){var s,r,q,p,o,n,m=this,l=null,k=m.a
if(k.length===0)throw A.b(A.f("MaterialDefinition.key must not be empty",l))
if(m.c!==B.i)throw A.b(A.f("MaterialDefinition.albedoColorSpace must be srgb: "+k,l))
if(m.y!==B.e)throw A.b(A.f("MaterialDefinition.normalColorSpace must be linear: "+k,l))
if(m.as!==B.e)throw A.b(A.f("MaterialDefinition.ormColorSpace must be linear: "+k,l))
k=m.w
if(!isFinite(k)||k<0)throw A.b(A.f("MaterialDefinition.emissiveStrength must be >= 0: "+A.m(k),l))
k=m.z
if(!isFinite(k)||k<0)throw A.b(A.f("MaterialDefinition.normalStrength must be >= 0: "+A.m(k),l))
A.ff("roughness",m.at)
A.ff("metallic",m.ax)
A.ff("occlusionStrength",m.ay)
A.ff("clearcoatStrength",m.ch)
A.ff("clearcoatRoughness",m.CW)
k=m.cy
if(!isFinite(k))throw A.b(A.f("MaterialDefinition.lightmapIntensity must be >= 0: "+k,l))
for(k=m.db,s=m.dx,r=[new A.F("uvScaleU",k),new A.F("uvScaleV",s),new A.F("uvOffsetU",m.dy),new A.F("uvOffsetV",m.fr),new A.F("tintR",m.d),new A.F("tintG",m.e),new A.F("tintB",m.f)],q=0;q<7;++q){p=r[q]
o=p.a
n=p.b
if(!isFinite(n))throw A.b(A.f("MaterialDefinition."+o+" must be finite: "+A.m(n),l))}if(k===0||s===0)throw A.b(A.f("MaterialDefinition uv scale must not be zero",l))
k=m.fy
if(!isFinite(k)||k<=0||k>1)throw A.b(A.f("MaterialDefinition.alphaCutoff must be in (0, 1]: "+A.m(k),l))}}
A.bv.prototype={
D(){return"VertexAttributeKind."+this.b}}
A.as.prototype={}
A.jK.prototype={
n(){var s,r,q,p,o='VertexLayoutDescriptor "surfaceV2": attribute '
for(s=0;s<7;++s){r=B.T[s]
q=r.c
if(q<=0)throw A.b(A.f(o+r.a.j(0)+" must have a positive floatCount",null))
p=r.b
q=p+q
if(q>18)throw A.b(A.f(o+r.a.j(0)+" range ["+p+", "+q+") exceeds stride 18",null))}q=t.iV.a(new A.jL())
for(p=B.b.gJ(B.T),q=new A.R(p,q,t.cz);q.p();)if(p.gq().c!==4)throw A.b(A.f('VertexLayoutDescriptor "surfaceV2": tangent4 must contain 4 floats',null))}}
A.jL.prototype={
$1(a){return t.r.a(a).a===B.aJ},
$S:8}
A.ba.prototype={
n(){var s,r,q,p,o,n=this
n.a.n()
s=n.b.length
if(B.d.F(s,18)!==0)throw A.b(A.f("MeshData.vertices length "+s+" is not a multiple of stride 18",null))
n.f1()
r=s/18|0
for(s=A.oK(n.c),q=s.length,p=0;p<q;++p){o=s[p]
if(o>=r)throw A.b(A.f("MeshData index "+o+" out of range for "+r+" vertices",null))}s=n.d
q=s.a
if(q.gK(0)&&s.b.gK(0)){s=s.b
s=q.a<=s.a&&q.b<=s.b&&q.c<=s.c}else s=!1
if(!s)throw A.b(A.f("MeshData.localBounds must be a valid AABB",null))},
f1(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=null,a2=t.iV,a3=t.kh,a4=new A.ac(B.T,a2.a(new A.iz()),a3)
if(!a4.gJ(0).p())return
s=new A.ac(B.T,a2.a(new A.iA()),a3)
if(s.gv(0)!==1)throw A.b(A.f("surface-v2 tangent data requires one normal slot",a1))
r=a4.gaY(0)
for(a2=this.b,a3=a2.length,q=a3/18|0,p=t.n,o=s.gaY(0).b,n=r.b,m=0;m<q;++m){l=m*18
k=l+o
if(!(k<a3))return A.c(a2,k)
j=a2[k]
i=k+1
if(!(i<a3))return A.c(a2,i)
h=a2[i]
k+=2
if(!(k<a3))return A.c(a2,k)
g=a2[k]
k=l+n
if(!(k<a3))return A.c(a2,k)
f=a2[k]
i=k+1
if(!(i<a3))return A.c(a2,i)
e=a2[i]
i=k+2
if(!(i<a3))return A.c(a2,i)
d=a2[i]
k+=3
if(!(k<a3))return A.c(a2,k)
c=a2[k]
b=j*j+h*h+g*g
a=f*f+e*e+d*d
if(!B.b.bt(A.d([j,h,g,f,e,d,c],p),new A.iB()))throw A.b(A.f("surface-v2 tangent basis must be finite",a1))
if(b<1e-8||a<1e-8)throw A.b(A.f("surface-v2 tangent basis must be non-zero",a1))
a0=(j*f+h*e+g*d)/Math.sqrt(b*a)
if(Math.abs(a0)>0.05)throw A.b(A.f("surface-v2 tangent must be orthogonal to its normal: "+A.m(a0),a1))
if(Math.abs(Math.abs(c)-1)>0.05)throw A.b(A.f("surface-v2 tangent handedness must be -1 or +1: "+A.m(c),a1))}}}
A.iz.prototype={
$1(a){return t.r.a(a).a===B.aJ},
$S:8}
A.iA.prototype={
$1(a){return t.r.a(a).a===B.bE},
$S:8}
A.iB.prototype={
$1(a){return isFinite(A.cZ(a))},
$S:15}
A.i_.prototype={}
A.iH.prototype={
n(){var s=this.a,r=s.a
if(!r.A(0,"sceneColor")||!r.A(0,"present"))throw A.b(A.f("resource plan must contain sceneColor and present",null))
if(s.f6(0,new A.iJ()))throw A.b(A.f("resource plan contains an empty resource ID",null))
if(this.b!==r.A(0,"vhsOutput"))throw A.b(A.f("resource history does not match vhsOutput ownership",null))}}
A.iJ.prototype={
$1(a){return A.M(a).length===0},
$S:9}
A.j4.prototype={}
A.dT.prototype={
dE(a){var s=this
if(s.d)A.l(A.n("resource assembler is disposed"))
if(s.a!=null)throw A.b(A.n("resource assembler is initialized"))
a.n()
s.a=a
s.c=1},
ad(){if(this.d)return
this.d=!0
this.a=null}}
A.dm.prototype={
D(){return"DrawMode."+this.b}}
A.eG.prototype={
D(){return"BlendMode."+this.b}}
A.bq.prototype={}
A.jA.prototype={
j(a){var s=this
return"SurfaceMetrics(css "+s.a+"x"+s.b+", pixels "+s.c+"x"+s.d+", dpr "+A.m(s.e)+", visible: true)"},
n(){var s,r=this
if(r.a<0||r.b<0)throw A.b(A.f("SurfaceMetrics css size must be >= 0",null))
if(r.c<0||r.d<0)throw A.b(A.f("SurfaceMetrics pixel size must be >= 0",null))
s=r.e
if(!isFinite(s)||s<=0)throw A.b(A.f("SurfaceMetrics.devicePixelRatio must be finite and > 0: "+A.m(s),null))}}
A.hV.prototype={
D(){return"ColorEncoding."+this.b}}
A.dQ.prototype={
n(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.ds(B.eT)
if(o.a!==0)A.l(A.Z(o,r,"contains unknown pipeline features"))
if(q.a===B.be&&p.gdG(p))A.l(A.Z(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.b(A.f("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.b(A.f("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.cK.prototype={
D(){return"RendererState."+this.b}}
A.a2.prototype={}
A.ic.prototype={
j(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.c+" tris="+s.d+" culled="+s.e+" gpu="+s.w+"B)"}}
A.fh.prototype={
hd(a){return this.a.aL(a)}}
A.iy.prototype={
$3(a,b,c){return new A.b2(A.e(a),A.e(b),A.bz(c))},
$S:22}
A.fW.prototype={}
A.iC.prototype={
dc(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.b,d=A.nj(f,new A.f_(e.byteLength,B.aU,B.ck))
if(f.b!==B.l)A.l(A.n(g))
s=A.k(d.a)
r=f.a
q=v.G
r.bindBuffer(A.e(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.e(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.aV(f)
A.af(f,p)
if(f.b!==B.l)A.l(A.n(g))
r.bindBuffer(A.e(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=A.ag(t.S)
for(n=a.a,m=0;m<7;++m){l=B.T[m]
k=A.nP(l.a)
if(!o.i(0,k))continue
j=A.qd(n,k,l)
if(f.b!==B.l)A.l(A.n(g))
r.vertexAttribPointer.apply(r,[k,j,A.e(q.WebGL2RenderingContext.FLOAT),!1,72,l.b*4])
if(f.b!==B.l)A.l(A.n(g))
r.enableVertexAttribArray(k)}i=a.c
h=A.nj(f,new A.f_(A.mT(i),B.aU,B.aT))
if(f.b!==B.l)A.l(A.n(g))
r.bindBuffer(A.e(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),A.k(h.a))
A.pF(f,h,t.f4.a(i))
f=i.length
return new A.fW(d,h,p,f,e.length/18|0,!1)},
h7(a){var s=this.c.B(0,a.a)
if(s==null)throw A.b(A.bG(B.a7,a))
this.b.aL(a)
return s},
cl(){var s,r,q,p
for(s=this.b.b6(),r=s.$ti,s=new A.bx(s.a(),r.h("bx<1>")),q=this.c,r=r.c;s.p();){p=s.b
if(p==null)p=r.a(p)
q.E(0,p.a.a,this.dc(p.b))}},
gb7(){return this.b.b6().cb(0,0,new A.iE(),t.S)}}
A.iD.prototype={
$3(a,b,c){return new A.aJ(A.e(a),A.e(b),A.bz(c))},
$S:23}
A.iE.prototype={
$2(a,b){var s,r
A.e(a)
s=t.o7.a(b).b
r=s.b.byteLength
s=A.mT(s.c)
return a+r+s},
$S:24}
A.be.prototype={}
A.fT.prototype={
af(a){var s=this.a,r=A.lX(s,B.cn)
A.lY(s,r,0,a)
return r},
fM(a){var s,r=this.b,q=r.aL(a),p=q.a
if(!p.d)return
s=this.c.B(0,a.a)
if(s==null)throw A.b(A.n("TextureStore.finalizeMips: no pixels uploaded yet for "+a.j(0)))
A.nk(this.a,s)
r.co(a,new A.be(p,q.b,!0))},
bY(a,b){var s
this.b.aL(a)
s=this.c.B(0,a.a)
return s==null?b:s},
h9(a){var s
if(a==null){s=this.d
s===$&&A.G()
return s}s=this.d
s===$&&A.G()
return this.bY(a,s)},
hh(a){var s
if(a==null){s=this.e
s===$&&A.G()
return s}s=this.e
s===$&&A.G()
return this.bY(a,s)},
hj(a){var s
if(a==null){s=this.f
s===$&&A.G()
return s}s=this.f
s===$&&A.G()
return this.bY(a,s)},
hb(a){var s=this.r
s===$&&A.G()
return s},
hf(a){var s=this.w
s===$&&A.G()
return s},
ad(){var s,r,q,p,o,n,m=this
for(s=m.c,r=new A.bn(s,s.r,s.e,A.y(s).h("bn<2>")),q=m.a,p=q.a,o=t.R;r.p();){n=r.d
if(n.b===q.Q)p.deleteTexture(o.a(n.a).a)}s.V(0)
s=m.d
s===$&&A.G()
if(s.b===q.Q)A.h0(q,s)
s=m.e
s===$&&A.G()
if(s.b===q.Q)A.h0(q,s)
s=m.f
s===$&&A.G()
if(s.b===q.Q)A.h0(q,s)
s=m.r
s===$&&A.G()
if(s.b===q.Q)A.h0(q,s)
s=m.w
s===$&&A.G()
if(s.b===q.Q)A.h0(q,s)},
cl(){var s,r,q,p,o,n,m,l,k,j,i=this
i.d=i.af($.mu())
i.e=i.af($.mq())
i.f=i.af($.mr())
i.r=i.af($.ms())
i.w=i.af($.mt())
for(s=i.b.b6(),r=s.$ti,s=new A.bx(s.a(),r.h("bx<1>")),q=i.c,p=i.a,r=r.c;s.p();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
o=m.b
if(B.b.bt(o,new A.jG()))continue
l=A.lX(p,m.a)
for(k=0;k<o.length;++k){j=o[k]
if(j!=null)A.lY(p,l,k,j)}if(m.c)A.nk(p,l)
q.E(0,n.a,l)}},
gb7(){return this.b.b6().cb(0,0,new A.jF(),t.S)}}
A.jE.prototype={
$3(a,b,c){return new A.aE(A.e(a),A.e(b),A.bz(c))},
$S:26}
A.jG.prototype={
$1(a){return t.nh.a(a)==null},
$S:21}
A.jF.prototype={
$2(a,b){var s
A.e(a)
s=t.p3.a(b).b.a
return a+s.a*s.b*s.c*4},
$S:28}
A.am.prototype={
D(){return"SolarPhase."+this.b}}
A.jw.prototype={
n(){var s,r,q,p,o,n,m,l,k,j,i=this,h="cloudCover01",g="precipitation01",f="relativeHumidity01",e=null
for(s=i.c,r=i.d,q=i.e,p=i.r,o=i.x,n=[new A.F("timeHours",i.a),new A.F("solarNoonHours",12),new A.F("latitudeRadians",s),new A.F("solarDeclinationRadians",r),new A.F(h,q),new A.F(g,0),new A.F("aerosolTurbidity",p),new A.F(f,0.7),new A.F("solarIntensity",o),new A.F("baseFogDensity",0.0015),new A.F("fogHeightFalloff",0.06)],m=0;m<11;++m){l=n[m]
k=l.a
if(!isFinite(l.b))throw A.b(A.f(k+" must be finite",e))}if(s<-1.5707963267948966||s>1.5707963267948966)throw A.b(A.f("latitudeRadians must be in [-pi/2, pi/2]",e))
if(r<-1.5707963267948966||r>1.5707963267948966)throw A.b(A.f("solarDeclinationRadians must be in [-pi/2, pi/2]",e))
for(s=[new A.F(h,q),new A.F(g,0),new A.F(f,0.7)],m=0;m<3;++m){r=s[m]
k=r.a
j=r.b
if(j<0||j>1)throw A.b(A.f(k+" must be in [0, 1]",e))}if(p>=1)s=o<0
else s=!0
if(s)throw A.b(A.f("solar attenuation inputs are out of bounds",e))}}
A.lw.prototype={
$2(a,b){var s,r=t.nA
r.a(a)
s=J.mw(r.a(b).a,a.a)
return s},
$S:29}
A.hP.prototype={
f5(a){if(a<=0)return
this.a=B.a.l(this.a+a,0,1)},
ac(a){var s
if(a<=0)return
this.b+=a
s=this.a
if(s>0)this.a=Math.max(0,s-a*1.25)},
fG(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this.a,b=c*c
if(b<=0.000001)return new A.cW(B.t,B.h)
s=this.b*22
c=Math.sin(s)
r=Math.sin(s*2.37+1.2)
q=Math.sin(s*1.13+2.1)
p=Math.sin(s*2.71+0.4)
o=Math.sin(s*0.89+4.3)
n=Math.sin(s*1.93+3.1)
m=Math.sin(s*1.21+0.8)
l=Math.sin(s*3.11)
k=Math.sin(s*0.97+2.7)
j=Math.sin(s*2.49+1.8)
i=Math.sin(s*1.45+5.1)
h=Math.sin(s*2.83+2.2)
g=b*this.x
f=A.al(B.k,(m+0.4*l)*0.71*0.05*g)
e=A.al(B.f,(k+0.4*j)*0.71*0.05*g)
d=A.al(B.r,(i+0.4*h)*0.71*0.035*g)
return new A.cW(e.k(0,f).k(0,d),new A.a((c+0.5*r)*0.67*0.2*b,(q+0.5*p)*0.67*0.2*b,(o+0.5*n)*0.67*0.2*b))},
f7(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
if(this.a<=0.000001)return a1
s=this.fG()
r=s.b
q=s.a
p=q.a
o=q.b
n=q.c
m=q.d
l=A.mP(m,p,o,n,1,1,1,0,0,0).a
k=l.length
if(0>=k)return A.c(l,0)
j=l[0]
if(1>=k)return A.c(l,1)
i=l[1]
if(2>=k)return A.c(l,2)
h=l[2]
if(4>=k)return A.c(l,4)
g=l[4]
if(5>=k)return A.c(l,5)
f=l[5]
if(6>=k)return A.c(l,6)
e=l[6]
if(8>=k)return A.c(l,8)
d=l[8]
if(9>=k)return A.c(l,9)
c=l[9]
if(10>=k)return A.c(l,10)
l=A.d([j,i,h,0,g,f,e,0,d,c,l[10],0,-r.a,-r.b,-r.c,1],t.n)
if(l.length!==16)A.l(A.f("Mat4.fromColumnMajor requires 16 values",null))
b=a1.a
a=new A.aI(new Float32Array(A.t(l))).k(0,b)
l=new A.hQ(b)
a0=new A.bL(-p,-o,-n,m)
m=a1.b
return A.mB(a1.w,a1.d.u(0,l.$1(a0.aF(r))),a1.r,l.$1(a0.aF(B.H)).gm(),a1.f,m,a,m.k(0,a))}}
A.hQ.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a.a,g=h.length
if(0>=g)return A.c(h,0)
s=h[0]
r=a.a
if(1>=g)return A.c(h,1)
q=h[1]
p=a.b
if(2>=g)return A.c(h,2)
o=h[2]
n=a.c
if(4>=g)return A.c(h,4)
m=h[4]
if(5>=g)return A.c(h,5)
l=h[5]
if(6>=g)return A.c(h,6)
k=h[6]
if(8>=g)return A.c(h,8)
j=h[8]
if(9>=g)return A.c(h,9)
i=h[9]
if(10>=g)return A.c(h,10)
return new A.a(s*r+q*p+o*n,m*r+l*p+k*n,j*r+i*p+h[10]*n)},
$S:5}
A.aA.prototype={}
A.eL.prototype={
ec(a,b,c,d,e,f,g){var s,r,q,p,o=this,n=o.a
if(n.length<2)throw A.b(A.f("CinematicTourCameraController requires at least 2 waypoints",null))
s=o.c
if(s<=0)throw A.b(A.Z(s,"duration","must be > 0"))
s=A.H(n)
r=s.h("a(1)")
s=s.h("O<1,a>")
q=s.h("P.E")
p=A.ai(new A.O(n,r.a(new A.hT()),s),q)
p=A.lH(!0,p)
o.w!==$&&A.d5()
o.w=p
n=A.ai(new A.O(n,r.a(new A.hU()),s),q)
n=A.lH(!0,n)
o.x!==$&&A.d5()
o.x=n
o.cN(0)},
cN(a){var s,r,q,p,o,n,m,l,k=this,j=k.w
j===$&&A.G()
s=j.aj(a)
j=k.x
j===$&&A.G()
r=j.aj(a)
j=k.f
if(j>0){q=a*k.c*k.r
k.as=s.u(0,new A.a(Math.sin(q*1.1)*j,Math.cos(q*0.85)*(j*0.75),Math.sin(q*0.7+1.2)*j))}else k.as=s
k.at=r
j=k.a
p=j.length
o=a*p
n=Math.min(B.a.a6(o),p-1)
m=B.d.F(n+1,p)
if(n>>>0!==n||n>=p)return A.c(j,n)
l=j[n].c
if(!(m>=0&&m<p))return A.c(j,m)
k.ax=l+(j[m].c-l)*(o-n)},
ac(a){var s,r=this
if(!r.z||a<=0)return
s=B.a.F(B.a.F(r.y+a/r.c,1)+1,1)
r.y=s
r.cN(s)},
b9(a){var s=this.as,r=this.at
return A.mC(a,s,300,this.ax,0.1,r,B.f)},
$icr:1}
A.hT.prototype={
$1(a){return t.f.a(a).a},
$S:16}
A.hU.prototype={
$1(a){return t.f.a(a).b},
$S:16}
A.bZ.prototype={
gaN(){var s=this,r=Math.cos(s.c),q=Math.sin(s.c)
return new A.a(Math.sin(s.b)*r,q,-Math.cos(s.b)*r).gm()},
ac(a){var s,r,q,p,o,n,m=this
if(a<=0)return
s=10*a
if(m.z.gO()>0.000001){r=new A.a(m.gaN().a,0,m.gaN().c).gm()
q=new A.a(m.gaN().S(B.f).gm().a,0,m.gaN().S(B.f).gm().c).gm()
p=m.z
o=r.k(0,p.c).u(0,q.k(0,p.a)).u(0,B.f.k(0,p.b)).gm().k(0,m.d)
n=B.a.l(s,0,1)
s=m.y.k(0,1-n).u(0,o.k(0,n))
m.y=s
m.a=m.a.u(0,s.k(0,a))}else{n=B.a.l(s,0,1)
s=m.y=m.y.k(0,1-n)
if(s.gO()>0.000001)m.a=m.a.u(0,s.k(0,a))}},
b9(a){return A.eK(a,this.a,200,this.gaN(),1,0.1,B.f)},
$icr:1}
A.bK.prototype={
gc9(){var s=this,r=Math.cos(s.d),q=Math.sin(s.d),p=Math.sin(s.c),o=Math.cos(s.c),n=s.a,m=s.b
return n.u(0,new A.a(r*p*m,q*m,r*o*m))},
gdO(){return this.a.M(0,this.gc9()).gm().S(B.f).gm()},
ac(a){var s,r,q,p=this
if(a<=0)return
if(p.as)p.ax=p.ax+p.at*a
s=B.a.l(1-Math.exp(-10*a),0,1)
r=p.c
p.c=r+(p.ax-r)*s
r=p.d
p.d=r+(p.ay-r)*s
r=p.b
p.b=r+(p.ch-r)*s
r=p.CW
q=p.a
p.a=q.u(0,r.M(0,q).k(0,s))},
b9(a){return A.mC(a,this.gc9(),200,1,0.1,this.a,B.f)},
$icr:1}
A.cM.prototype={
ac(a){var s,r,q=this,p=q.a.gaV().a,o=p.u(0,q.c),n=Math.cos(q.Q),m=Math.sin(q.Q),l=o.u(0,new A.a(Math.sin(q.z)*n,m,Math.cos(q.z)*n).k(0,q.d)).u(0,new A.a(0,q.e,0))
if(!q.ax){q.as=l
q.at=o
q.ax=!0
return}s=B.a.l(a*q.f,0,1)
r=B.a.l(a*8,0,1)
q.as=A.lW(q.as,l,s)
q.at=A.lW(q.at,o,r)},
b9(a){var s=this.as,r=this.at.M(0,s)
return A.eK(a,s,250,r.gO()>1e-8?r.gm():B.H,1,0.1,B.f)},
$icr:1}
A.bj.prototype={
gfR(){return this.b.length}}
A.eW.prototype={
ff(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h
t.U.a(a)
s=new A.jj(A.d([],t.hJ),A.ag(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p)r[p].a2(s,b)
o=s.fe(a,!1)
if(o.b.length!==0)return new A.eX(o,B.dw)
q=o.a
n=A.H(q)
m=new A.O(q,n.h("x(1)").a(new A.i4()),n.h("O<1,x>")).aS(0)
l=A.d([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p){k=r[p]
for(n=k.a1(d),j=n.length,i=0;i<n.length;n.length===j||(0,A.A)(n),++i){h=n[i]
if(!m.A(0,h.gt().a))throw A.b(A.n('RenderFeature "'+k.gN()+'" created a pass "'+h.gt().a+'" that it never declared into the graph'))
B.b.i(l,h)}}B.b.ak(l,new A.i5(o))
return new A.eX(o,l)}}
A.i4.prototype={
$1(a){return t.z.a(a).a},
$S:32}
A.i5.prototype={
$2(a,b){var s=t.ks
s.a(a)
s.a(b)
s=this.a.a
return B.d.R(B.b.cc(s,new A.i2(a)),B.b.cc(s,new A.i3(b)))},
$S:33}
A.i2.prototype={
$1(a){return t.z.a(a).a===this.a.gt().a},
$S:4}
A.i3.prototype={
$1(a){return t.z.a(a).a===this.a.gt().a},
$S:4}
A.eX.prototype={}
A.cw.prototype={
D(){return"FrameQueueState."+this.b}}
A.eZ.prototype={
ct(a){var s,r,q=this
if(q.b!==B.X)throw A.b(A.n("FrameQueue.submit called outside an active frame"))
a.c.n()
s=q.c
r=q.a
if(s<r.length)B.b.E(r,s,a)
else B.b.i(r,a);++q.c},
bo(){if(this.b!==B.X)throw A.b(A.n("FrameQueue.abortFrame called without an active frame"))
this.c=0
this.b=B.ch},
$ipi:1}
A.i9.prototype={
fa(a){if(a.length===0)throw A.b(A.Z(a,"passId",null))
this.b=a
this.a.b8(a,A.nT())},
e3(){var s,r,q,p,o=t.A
o=A.a5(o,o)
for(s=this.a,s=new A.bl(s,A.y(s).h("bl<1,2>")).gJ(0);s.p();){r=s.d
q=r.a
p=r.b
o.E(0,q,new A.a2(p.a,p.b,p.d))}return A.lI(o,t.N,t.o)},
aJ(a,b){var s,r=this.b
if(r==null)throw A.b(A.n("draw recorded outside an active render pass"))
if(b<1)throw A.b(A.f("draw count and instance count must be positive",null))
s=this.a.B(0,r);++s.a
s.d+=b
s.b=s.b+B.d.a0(a,3)*b}}
A.cT.prototype={}
A.Q.prototype={
gaQ(){var s=this.c,r=A.H(s)
return new A.ac(s,r.h("w(1)").a(new A.iP()),r.h("ac<1>"))},
gbb(){var s=this.c,r=A.H(s)
return new A.ac(s,r.h("w(1)").a(new A.iQ()),r.h("ac<1>"))},
j(a){return"PassDeclaration("+this.a+" @ "+this.b.j(0)+")"}}
A.iP.prototype={
$1(a){var s=t.L.a(a).b
return s===B.j||s===B.L},
$S:10}
A.iQ.prototype={
$1(a){return t.L.a(a).b===B.m},
$S:10}
A.b0.prototype={
D(){return"GraphValidationFailureKind."+this.b}}
A.ao.prototype={
j(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.fC.prototype={
D(){return"ResourceFormat."+this.b}}
A.bi.prototype={
D(){return"GraphStage."+this.b}}
A.Y.prototype={
dI(){var s=this
return new A.Y(s.a,s.b,s.c,s.d,s.e,s.f+1)},
a8(a,b){var s=this
if(b==null)return!1
return b instanceof A.Y&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gU(a){var s=this
return A.c3(s.a,s.b,s.c,s.d,s.e,s.f)},
j(a){var s=this,r=s.b.j(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.dS.prototype={
D(){return"ResourceAccess."+this.b}}
A.q.prototype={}
A.dg.prototype={}
A.jc.prototype={
a3(a){var s,r,q,p,o,n,m=this
a.n()
s=null
try{r=a.d.gav()
r=A.ai(r,A.y(r).h("p.E"))
q=t.bF
s=A.pI(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.bh(p) instanceof A.dW){++m.e
throw p}else throw p}o=new A.dg(s)
r=m.b
q=a.a
n=r.B(0,q)
r.E(0,q,o);++m.d
if(n!=null)m.a.dn(n.b)
return o},
eB(a){var s,r
t.bI.a(a)
for(s=a.a,s=new A.bn(s,s.r,s.e,a.$ti.h("bn<1>")),r=this.a;s.p();)r.dn(s.d.b)}}
A.ae.prototype={
n(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.b(A.f("ProgramSource.id must not be empty",m))
s=t.S
r=A.ag(s)
for(q=this.d.gb3(),q=q.gJ(q);q.p();){p=q.gq()
o=p.b
if(o<0)throw A.b(A.f('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.i(0,o))throw A.b(A.f('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.ag(s)
for(s=this.e.gb3(),s=s.gJ(s);s.p();){q=s.gq()
p=q.b
if(p<0)throw A.b(A.f('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.i(0,p))throw A.b(A.f('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.jh.prototype={}
A.a9.prototype={
X(){var s=this
return A.os(B.bL,s.f,B.a1,B.a2,!0,!0,!0,!0,s.r,B.a4,B.a5,s.d,s.e,!0,!1,!1)}}
A.jj.prototype={
fe(a,b){var s=this.f0(t.U.a(a),!1),r=this.a,q=A.H(r)
return new A.ji(A.aw(new A.ac(r,q.h("w(1)").a(new A.jo()),q.h("ac<1>")),t.z),s)},
f0(a,b){var s,r,q,p,o,n,m=this
t.U.a(a)
s=A.d([],t.aW)
r=m.a
q=A.H(r)
p=q.h("ac<1>")
o=A.ai(new A.ac(r,q.h("w(1)").a(new A.jn()),p),p.h("p.E"))
m.ek(o,a,s)
m.eo(o,s)
m.eq(o,s)
m.en(o,!1,s)
n=m.eu(o,s)
m.ep(o,n,s)
m.er(o,s)
m.em(o,n,s)
m.el(o,s)
return s},
ek(a,b,c){var s,r,q,p
t.O.a(a)
t.U.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
p=B.aa.ds(b)
if(p.a!==0)B.b.i(c,new A.ao(B.cz,q.a,"missing capabilities: "+p.ci(0,", ")))}},
eo(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gaQ(),o=J.ad(p.a),p=new A.R(o,p.b,p.$ti.h("R<1>")),n=q.a;p.p();){m=o.gq().a
if(m.e>1)B.b.i(b,new A.ao(B.cu,n,"reads multisampled resource "+m.j(0)+" directly; resolve before sampling"))}}},
eq(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.H(a),r=s.h("w(1)").a(new A.jm()),q=B.b.gJ(a),s=new A.R(q,r,s.h("R<1>"));s.p();){r=q.gq()
p=r.gaQ()
o=A.ai(p,p.$ti.h("p.E"))
p=r.gbb()
n=A.ai(p,p.$ti.h("p.E"))
if(o.length!==1||n.length!==1){B.b.i(b,new A.ao(B.ao,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.b.gaY(o).a
l=B.b.gaY(n).a
if(m.e<=1||l.e>1)B.b.i(b,new A.ao(B.ao,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.b.i(b,new A.ao(B.ao,r.a,"resolve source and destination must match format and extent"))}},
en(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.A)(p),++m){l=p[m]
if(l.b===B.L)B.b.i(c,new A.ao(B.cx,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
eu(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.a5(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.A)(a),++q){p=a[q]
for(o=p.gbb(),n=J.ad(o.a),o=new A.R(n,o.b,o.$ti.h("R<1>")),m=p.a;o.p();){l=n.gq().a
k=l.a+"#"+l.f
j=s.B(0,k)
if(j!=null){B.b.i(b,new A.ao(B.ct,m,l.j(0)+" already written by "+j.a))
continue}s.E(0,k,p)}}return s},
ep(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.iE.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gaQ(),p=J.ad(q.a),q=new A.R(p,q.b,q.$ti.h("R<1>")),o=r.a;q.p();){n=p.gq()
if(n.b===B.L)continue
n=n.a
m=b.B(0,n.a+"#"+n.f)
if(m==null){B.b.i(c,new A.ao(B.aY,o,"reads "+n.j(0)+" but no pass writes that version"))
continue}if(B.b.fP(a,m)>s)B.b.i(c,new A.ao(B.aY,o,"reads "+n.j(0)+" before writer "+m.a+" runs"))}}},
er(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gaQ(),o=J.ad(p.a),p=new A.R(o,p.b,p.$ti.h("R<1>")),n=q.a;p.p();){m=o.gq()
if(m.b===B.L)continue
for(l=q.gbb(),k=J.ad(l.a),l=new A.R(k,l.b,l.$ti.h("R<1>")),m=m.a,j=m.a,i=m.f;l.p();){h=k.gq().a
if(j===h.a&&i===h.f)B.b.i(b,new A.ao(B.cw,n,"reads and writes "+m.j(0)+" at the same version; declare a ping-pong version bump"))}}}},
em(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.iE.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gaQ(),o=J.ad(p.a),p=new A.R(o,p.b,p.$ti.h("R<1>")),n=q.a;p.p();){m=o.gq()
if(m.b===B.L)continue
l=m.a
k=b.B(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gbb().fN(0,new A.jl(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.b.i(c,new A.ao(B.cv,n,"reads "+l.j(0)+" but writer "+k.a+" produced "+j.j(0)))}}},
el(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.a5(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gbb(),o=J.ad(p.a),p=new A.R(o,p.b,p.$ti.h("R<1>"));p.p();){n=o.gq().a
r.E(0,n.a+"#"+n.f,q)}m=J.ip(p,t.nO)
for(l=0;l<p;++l)m[l]=A.ag(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gaQ(),p=J.ad(s.a),s=new A.R(p,s.b,s.$ti.h("R<1>"));s.p();){o=p.gq()
if(o.b===B.L)continue
o=o.a
k=r.B(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.c(m,k)
m[k].i(0,q)}}p=t.y
j=A.c1(s,!1,!1,p)
s=a.length
i=A.c1(s,!1,!1,p)
h=new A.jk(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.c(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.c(a,q)
B.b.i(b,new A.ao(B.cy,a[q].a,"participates in a resource dependency cycle"))}}}}
A.jo.prototype={
$1(a){t.z.a(a)
return A.lQ()},
$S:4}
A.jn.prototype={
$1(a){t.z.a(a)
return A.lQ()},
$S:4}
A.jm.prototype={
$1(a){return t.z.a(a).f},
$S:4}
A.jl.prototype={
$1(a){var s=t.L.a(a).a,r=this.a.a
return s.a===r.a&&s.f===r.f},
$S:10}
A.jk.prototype={
$1(a){var s,r,q,p,o=this,n=o.a
if(!(a>=0&&a<n.length))return A.c(n,a)
if(n[a])return!0
s=o.b
if(!(a<s.length))return A.c(s,a)
if(s[a])return!1
B.b.E(n,a,!0)
r=o.c
if(!(a<r.length))return A.c(r,a)
r=r[a]
r=A.ka(r,r.r,A.y(r).c)
q=r.$ti.c
while(r.p()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.b.E(n,a,!1)
B.b.E(s,a,!0)
return!1},
$S:36}
A.ji.prototype={}
A.bO.prototype={$iaU:1,
gN(){return this.a},
gt(){return this.b},
gaU(){return this.c}}
A.dP.prototype={
dd(a){var s,r,q,p=a.c
p.n()
s=this.a.aL(a.a)
p=p.ae()
r=s.d.gaC()
q=A.H(r)
return A.cl(new A.O(r,q.h("a(1)").a(p.gaG()),q.h("O<1,a>")))},
f4(a){var s=this.dd(a),r=this.b.dm(a)
this.c.E(0,r,new A.bO(r,a,s))
return r},
hs(a,b){var s=this.dd(b)
this.b.co(a,b)
this.c.E(0,a,new A.bO(a,b,s))},
dN(a){this.b.aR(a)
this.c.aa(0,a)},
$ipl:1}
A.jp.prototype={
$3(a,b,c){return new A.b8(A.e(a),A.e(b),A.bz(c))},
$S:37}
A.fD.prototype={
W(a,b){var s,r
if(this.x)A.l(A.n("resource library is disposed"))
s=this.a
a.n()
r=s.b.aK(a,b)
s.c.E(0,r.a,s.dc(a))
this.f.i(0,r)
return r},
h4(a){var s
if(this.x)A.l(A.n("resource library is disposed"))
a.n()
s=this.b.a.aK(a,null)
this.r.i(0,s)
return s},
ad(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this
if(c.x)return
s=c.w
r=A.ai(s,A.y(s).c)
q=r.length
p=c.c
o=p.c
n=p.a
m=n.a
l=t.R
k=0
for(;k<r.length;r.length===q||(0,A.A)(r),++k){j=r[k]
i=o.aa(0,j.a)
if(i!=null)if(i.b===n.Q)m.deleteTexture(l.a(i.a).a)
p.b.aR(j)}r=c.r
q=A.ai(r,A.y(r).c)
o=q.length
n=c.b.a
k=0
for(;k<q.length;q.length===o||(0,A.A)(q),++k)n.aR(q[k])
q=c.f
o=A.ai(q,A.y(q).c)
n=o.length
m=c.a
l=m.c
h=m.a
g=h.a
k=0
for(;k<o.length;o.length===n||(0,A.A)(o),++k){j=o[k]
f=l.aa(0,j.a)
if(f!=null){e=f.c
if(e.b===h.Q)g.deleteVertexArray(A.k(e.a))
e=f.a
if(e.b===h.Q)g.deleteBuffer(A.k(e.a))
d=f.b
if(d!=null)if(d.b===h.Q)g.deleteBuffer(A.k(d.a))}m.b.aR(j)}s.V(0)
r.V(0)
q.V(0)
p.ad()
c.x=!0},
$ipn:1}
A.jY.prototype={}
A.hw.prototype={$iaU:1,
gN(){return this.a},
gt(){return this.b},
gaU(){return this.c}}
A.kB.prototype={
$1(a){var s=this.a.w.a.h7(a),r=s.b!=null,q=r?s.d:s.e
return new A.dR(s.c,r,q,s.f)},
$S:38}
A.kC.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.A(0,a))return this.b.x.gq().dJ(a)
if(b!=null&&s.A(0,b))return this.b.x.gq().dJ(b)
throw A.b(A.n("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:39}
A.kA.prototype={
$0(){return this.a.$1("shadowMap")},
$S:2}
A.kt.prototype={
$0(){return null},
$S:41}
A.ku.prototype={
$0(){var s,r=this.a.at
if(r==null)return B.ap
s=r.b
return A.rk(s.k1,3,r.a.d,null)},
$S:42}
A.kz.prototype={
$0(){return this.a.$1("sceneDepth")},
$S:2}
A.ko.prototype={
$0(){return this.a.at.a},
$S:43}
A.kq.prototype={
$0(){return this.a.$2$fallback("ssaoRaw","sceneColor")},
$S:2}
A.kp.prototype={
$0(){return this.a.$2$fallback("ssaoBlurred","sceneColor")},
$S:2}
A.ky.prototype={
$0(){var s=this.b.d>1?"sceneColor#1":"sceneColor"
return this.a.$1(s)},
$S:2}
A.km.prototype={
$0(){return this.a.$2$fallback("bloomBlurH","sceneColor")},
$S:2}
A.kn.prototype={
$0(){return this.a.$2$fallback("bloomBlurV","sceneColor")},
$S:2}
A.kv.prototype={
$0(){return this.a.$2$fallback("dofBlurH","sceneColor")},
$S:2}
A.kw.prototype={
$0(){return this.a.$2$fallback("dofBlurV","sceneColor")},
$S:2}
A.kx.prototype={
$0(){var s=this.a.w.c.d
s===$&&A.G()
return s},
$S:2}
A.ks.prototype={
$0(){return this.a.$2$fallback("vhsOutput","sceneColor")},
$S:2}
A.kr.prototype={
$0(){return this.a.at.w},
$S:44}
A.kD.prototype={
$0(){return this.a},
$S:45}
A.kE.prototype={
$0(){return null},
$S:46}
A.kd.prototype={}
A.hl.prototype={$ipk:1}
A.hd.prototype={$iov:1}
A.fF.prototype={
gP(){var s=this.w
return s==null?A.l(A.n("renderer is not initialized")):s},
fQ(a,b){var s,r,q,p,o,n,m,l,k=this
if(k.e!==B.at)throw A.b(A.n("renderer can only be initialized once"))
a.n()
b.n()
s=k.a
if(s.b===B.Y)throw A.b(A.n("renderer device is context lost"))
k.e=B.eC
try{r=v.G
s.b1(A.e(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.b1(A.e(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.b1(A.e(r.WebGL2RenderingContext.MAX_SAMPLES))
s.b1(A.e(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.b1(A.e(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
if(s.az("EXT_texture_filter_anisotropic"))s.cS(34047)
q=s.az("EXT_disjoint_timer_query_webgl2")
s.w=q
s.az("EXT_color_buffer_float")
s.az("EXT_color_buffer_half_float")
s.az("WEBGL_lose_context")
p=s.az("WEBGL_debug_renderer_info")
o=s.a
if(p)A.bT(o.getParameter(37446))
else A.bT(o.getParameter(A.e(r.WebGL2RenderingContext.RENDERER)))
if(p)A.bT(o.getParameter(37445))
else A.bT(o.getParameter(A.e(r.WebGL2RenderingContext.VENDOR)))
k.r=new A.jg(q)
r=k.b
if(r.d)A.l(A.n("configuration coordinator is disposed"))
n=A.iI(a)
q=r.a
if(q.e)A.l(A.n("configuration state is disposed"))
if(q.a!=null)A.l(A.n("configuration state is already initialized"))
a.n()
q.a=a
A.iI(a)
q.d=1
r.b.dE(n)
r=A.oJ()
k.w=new A.fD(A.oL(s),r,A.pu(s),A.ag(t.l0),A.ag(t.W),A.ag(t.lu))
r=new A.dT()
q=new A.ij(s,r)
n=A.iI(a)
m=q.cJ(n,a)
r.dE(n)
q.c=new A.fy(new A.j4(n),m)
k.x=q
k.y=new A.jc(s,A.a5(t.N,t.gY))
k.as=a
A.nE(k)
k.e=B.a8
k.ay=k.gbP()}catch(l){s=k.y
if(s!=null){r=s.b
s.eB(new A.b1(r,A.y(r).h("b1<2>")))
r.V(0)}s=k.x
if(s!=null)s.ad()
s=k.w
if(s!=null)s.ad()
k.w=null
k.b.ad()
k.b=new A.eQ(new A.eR(),new A.dT())
k.e=B.at
throw l}s=new A.a3($.W,t.cU)
s.bI(null)
return s},
f8(a,b){var s,r,q,p,o=this
o.eR()
o.bh()
r=B.b.A(o.d,a)
if(!r)throw A.b(A.f("world was not created by this renderer",null))
if(o.at!=null)throw A.b(A.n("renderer.beginFrame called twice without end/abort"))
b.a.n()
b.b.n()
b.c.n()
r=b.w
if(!isFinite(r))A.l(A.f("FrameInput.timeSeconds must be finite: "+A.m(r),null))
o.at=b
o.ax=a
q=o.c
if(q.b===B.X)A.l(A.n("FrameQueue.beginFrame called twice without end/abort"))
q.b=B.X
q.c=0
B.b.V(q.a)
s=q
try{r=o.r
if((r==null?A.l(A.n("renderer is not initialized")):r).z)o.b$=o.a.f9()
return s}catch(p){q.bo()
o.bG()
o.ax=o.at=null
throw p}},
fE(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this
c.bh()
s=c.at
r=c.ax
if(s==null||r==null)throw A.b(A.n("renderer.endFrame called without an active frame"))
l=c.c
if(l.b!==B.X)A.l(A.n("FrameQueue.endFrame called without an active frame"))
k=l.a
j=A.fQ(k,0,A.bS(l.c,"count",t.S),A.H(k).c).dR(0,!1)
l.b=B.cg
q=j
try{p=A.qg(c,r,s,q)
o=p.a.e3()
l=o.gb3()
k=A.y(l)
n=new A.dA(new A.ac(l,k.h("w(p.E)").a(new A.jr()),k.h("ac<p.E>")),k.h("a2(p.E)").a(new A.js()),k.h("dA<p.E,a2>")).cb(0,B.ce,new A.jt(),t.o)
m=s.b.id.length
k=s.e
l=m
if(typeof l!=="number")return l.bc()
if(l>4){l=m
if(typeof l!=="number")return l.M()}l=n.a
i=n.b
h=p.c
g=n.d
p.toString
f=c.w
e=f.a.gb7()
f=f.c.gb7()
d=c.w
d.a.gb7()
d.c.gb7()
c.w.toString
return new A.ic(k,l,i,h,g,e+f)}finally{c.eJ(s.e)
c.ax=c.at=null}},
bo(){var s=this
if(s.at==null)throw A.b(A.n("renderer.abortFrame called without an active frame"))
try{s.c.bo()}finally{s.bG()
s.ax=s.at=null}},
gbP(){A:{var s=this.a.Q
break A}return s},
eR(){var s,r=this,q=r.ay,p=r.gbP(),o=r.e
if(o===B.a8&&q!=null&&p!=null&&p!==q&&r.a.b!==B.Y){r.cL()
o=r.e=B.a9}if(o!==B.a9)return
if(r.a.b===B.Y)throw A.b(A.n("renderer context remains lost"))
o=r.w
if(o.x)A.l(A.n("resource library is disposed"))
o.a.cl()
o.c.cl()
o=r.x
o.toString
s=r.as
s.toString
if(o.e)A.l(A.n("GPU resource adapter is disposed"))
p=o.c
if(p==null)A.l(A.n("GPU resource adapter is not initialized"))
o.c=new A.fy(p.a,o.cJ(A.iI(s),s))
o=r.y
o.c=null
o.b.V(0)
A.nE(r)
r.e=B.a8
r.ay=r.gbP()},
bh(){var s=this,r=s.e
if(r!==B.a8)throw A.b(A.n("renderer is not ready: "+r.b))
if(s.a.b===B.Y){s.cL()
s.e=B.a9
throw A.b(A.n("renderer context lost"))}},
$ipp:1}
A.jr.prototype={
$1(a){t.iO.a(a)
return A.ro(a.a.toLowerCase(),"world",0)},
$S:47}
A.js.prototype={
$1(a){return t.iO.a(a).b},
$S:48}
A.jt.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return new A.a2(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:49}
A.hk.prototype={}
A.k8.prototype={
eJ(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.l)A.l(A.n(u.k))
r=s.d7(o)
if(r.b)A.l(A.n("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.b.i(p.a$,new A.hk(o))}catch(q){p.bO(o)}},
bG(){var s=this.b$
this.b$=null
if(s!=null)this.bO(s)},
cL(){var s,r,q
this.bG()
s=this.a$
r=J.iq(s.slice(0),A.H(s).c)
B.b.V(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.A)(r),++q)this.bO(r[q].b)},
bO(a){var s
try{this.a.fB(a)}catch(s){}}}
A.hp.prototype={}
A.fH.prototype={
D(){return"ShadowCasterLod."+this.b}}
A.aB.prototype={
R(a,b){var s,r=this
t.nL.a(b)
s=B.d.R(r.a.a,b.a.a)
if(s!==0)return s
s=B.d.R(r.b.a,b.b.a)
if(s!==0)return s
s=B.d.R(r.c.a,b.c.a)
if(s!==0)return s
return B.d.R(r.d,b.d)},
$iav:1}
A.az.prototype={
R(a,b){var s
t.dP.a(b)
s=B.a.R(b.a,this.a)
if(s!==0)return s
return B.d.R(this.b,b.b)},
$iav:1}
A.a6.prototype={}
A.lA.prototype={
$2(a,b){var s=t.k
return s.a(a).a.R(0,s.a(b).a)},
$S:50}
A.lB.prototype={
$1(a){return t.k.a(a).b},
$S:51}
A.ly.prototype={
$2(a,b){var s=t.d
return s.a(a).a.R(0,s.a(b).a)},
$S:52}
A.lz.prototype={
$1(a){return t.d.a(a).b},
$S:53}
A.hZ.prototype={}
A.hY.prototype={}
A.j5.prototype={
$6(a,b,c,d,e,f){var s=this.a,r=s.a.length/18|0,q=this.b
s.H(a,e,f,new A.D(0,0).k(0,q))
s.H(b,e,f,new A.D(1,0).k(0,q))
s.H(c,e,f,new A.D(1,1).k(0,q))
s.H(d,e,f,new A.D(0,1).k(0,q))
q=r+2
B.b.G(s.b,A.d([r,r+1,q,r,q,r+3],t.t))},
$S:17}
A.j7.prototype={
$1(a){return t.a.a(a).gm()},
$S:5}
A.j8.prototype={
$2(a,b){var s,r,q,p,o,n=(Math.min(a,b)<<16|Math.max(a,b))>>>0,m=this.a,l=m.B(0,n)
if(l!=null)return l
s=this.b
r=s.length
if(!(a>=0&&a<r))return A.c(s,a)
q=s[a]
if(!(b>=0&&b<r))return A.c(s,b)
p=q.u(0,s[b]).k(0,0.5).gm()
o=s.length
B.b.i(s,p)
m.E(0,n,o)
return o},
$S:83}
A.j6.prototype={
$1(a){return t.a.a(a).gm().k(0,this.a)},
$S:5}
A.ja.prototype={
$6(a,b,c,d,e,f){var s,r=this.a,q=r.a.length/18|0
r.H(a,e,f,B.ab)
r.H(b,e,f,B.ac)
r.H(c,e,f,B.bx)
r.H(d,e,f,B.bw)
s=q+2
B.b.G(r.b,A.d([q,q+1,s,q,s,q+3],t.t))},
$S:17}
A.j9.prototype={
$5(b4,b5,b6,b7,b8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3=b5.M(0,b4).S(b7.M(0,b6)).aD(b6.u(0,b7).gm())<0
for(s=this.a,r=this.c,q=r.b,p=t.t,o=b6.a,n=b6.b,m=b6.c,l=b7.a,k=b7.b,j=b7.c,i=this.b,h=b4.a,g=b4.b,f=b4.c,e=b5.a,d=b5.b,c=b5.c,b=r.a,a=0;a<s;){a0=a/s;++a
a1=a/s
a2=a0*1.5707963267948966
a3=a1*1.5707963267948966
a4=Math.cos(a2)
a5=Math.sin(a2)
a6=new A.a(o*a4+l*a5,n*a4+k*a5,m*a4+j*a5).gm()
a5=Math.cos(a3)
a4=Math.sin(a3)
a7=new A.a(o*a5+l*a4,n*a5+k*a4,m*a5+j*a4).gm()
a4=a6.a*i
a5=a6.b*i
a8=a6.c*i
a9=a7.a*i
b0=a7.b*i
b1=a7.c*i
b2=b.length/18|0
r.H(new A.a(h+a4,g+a5,f+a8),a6,b8,new A.D(0,a0))
r.H(new A.a(e+a4,d+a5,c+a8),a6,b8,new A.D(1,a0))
r.H(new A.a(e+a9,d+b0,c+b1),a7,b8,new A.D(1,a1))
r.H(new A.a(h+a9,g+b0,f+b1),a7,b8,new A.D(0,a1))
a1=b2+3
a4=b2+2
a5=b2+1
if(b3)B.b.G(q,A.d([b2,a1,a4,b2,a4,a5],p))
else B.b.G(q,A.d([b2,a5,a4,b2,a4,a1],p))}},
$S:56}
A.ay.prototype={
H(a,b,c,d){B.b.G(this.a,A.d([a.a,a.b,a.c,b.a,b.b,b.c,c.a,c.b,c.c,1,1,1,1,0,1,d.a,d.b,0],t.n))},
a9(a){var s=new A.ba(B.ai,new Float32Array(A.t(this.a)),new Uint16Array(A.t(this.b)),a)
s.n()
return s}}
A.jb.prototype={
$2(a,b){var s=this.a,r=B.d.F(a+s,s),q=this.b,p=this.c
s=B.d.F(b+q,q)*s+r
if(!(s>=0&&s<65536))return A.c(p,s)
return p[s]/255},
$S:57}
A.jC.prototype={
ed(a){var s,r,q,p,o,n=new Uint8Array(512)
this.b!==$&&A.d5()
this.b=n
s=J.ip(256,t.S)
for(r=0;r<256;++r)s[r]=r
q=new A.cd()
q.bf(this.a)
for(r=255;r>0;--r){p=q.aO(r+1)
o=s[r]
if(!(p>=0&&p<256))return A.c(s,p)
s[r]=s[p]
s[p]=o}for(r=0;r<512;++r)n[r]=s[r&255]},
dt(a,b){var s,r,q,p,o,n,m,l=B.a.a6(a)&255,k=B.a.a6(b)&255,j=a-B.a.a6(a),i=b-B.a.a6(b),h=A.nb(j),g=A.nb(i),f=this.b
f===$&&A.G()
s=f[l]+k
if(!(s<512))return A.c(f,s)
r=f[s];++s
if(!(s<512))return A.c(f,s)
q=f[s]
s=f[l+1]+k
if(!(s<512))return A.c(f,s)
p=f[s];++s
if(!(s<512))return A.c(f,s)
o=f[s]
s=A.jD(r,j,i)
f=j-1
n=s+h*(A.jD(p,f,i)-s)
s=i-1
m=A.jD(q,j,s)
return B.a.l((n+g*(m+h*(A.jD(o,f,s)-m)-n))*0.45,-1,1)},
fI(a,b,c,d){var s,r,q,p,o
for(s=c,r=0,q=1,p=0,o=0;o<d;++o){r+=(this.dt(a*s,b*s)*0.5+0.5)*q
p+=q
q*=0.5
s*=2}return p>0?r/p:0},
hk(a,b,c,d){var s,r,q,p,o,n
for(s=c,r=0,q=1,p=0,o=0;o<d;++o){n=1-Math.abs(this.dt(a*s,b*s))
r+=n*n*q
p+=q
q*=0.5
s*=2}return p>0?r/p:0}}
A.jB.prototype={
aI(a,b){var s=this,r=1-B.a.l(Math.sqrt(a*a+b*b)/s.r,0,1),q=s.w
return s.f+(q.fI(a*0.08,b*0.08,1,4)*0.65+q.hk(a*0.12,b*0.12,1,4)*0.35)*s.e*(r*r*(3-2*r))},
cq(a,b){var s=this,r=s.aI(a-0.05,b),q=s.aI(a+0.05,b),p=s.aI(a,b-0.05),o=-(q-r),n=-(s.aI(a,b+0.05)-p),m=Math.sqrt(o*o+0.010000000000000002+n*n)
return m>0.000001?new A.a(o/m,0.1/m,n/m):B.f},
dV(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=this,a5=t.n,a6=A.d([],a5),a7=t.t,a8=A.d([],a7),a9=a4.a,b0=a4.c,b1=a9/b0,b2=a4.b,b3=a4.d,b4=b2/b3,b5=new A.a(1/0,1/0,1/0),b6=new A.a(-1/0,-1/0,-1/0)
for(a9=-(a9*0.5),b2=-(b2*0.5),s=0;s<=b3;++s){r=b2+s*b4
q=s/b3
for(p=0;p<=b0;++p){o=a9+p*b1
n=a4.aI(o,r)
m=a4.cq(o,r)
l=m.a
k=Math.abs(l)>0.85?B.r:B.k
j=k.a
i=k.b
h=m.b
g=k.c
f=m.c
e=j*l+i*h+g*f
d=new A.a(j-l*e,i-h*e,g-f*e).gm()
if(o<b5.a)b5=new A.a(o,b5.b,b5.c)
if(n<b5.b)b5=new A.a(b5.a,n,b5.c)
if(r<b5.c)b5=new A.a(b5.a,b5.b,r)
if(o>b6.a)b6=new A.a(o,b6.b,b6.c)
if(n>b6.b)b6=new A.a(b6.a,n,b6.c)
if(r>b6.c)b6=new A.a(b6.a,b6.b,r)
B.b.G(a6,A.d([o,n,r,l,h,f,d.a,d.b,d.c,1,1,1,1,1,0,p/b0,q,0],a5))}}c=b0+1
for(s=0;s<b3;){b=s*c;++s
a=s*c
for(p=0;p<b0;++p){a0=b+p
a1=a+p
a2=a1+1
B.b.G(a8,A.d([a0,a1,a2,a0,a2,a0+1],a7))}}a3=new A.ba(B.ai,new Float32Array(A.t(a6)),new Uint16Array(A.t(a8)),new A.a4(b5,b6))
a3.n()
return a3},
dU(a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b=a3*a2*4,a=new Uint8Array(b),a0=c.a,a1=c.b
for(s=c.e*0.7,r=-(a0*0.5),q=-(a1*0.5),p=0,o=0;o<a2;++o){n=q+o/a2*a1
for(m=0;m<a3;++m){l=r+m/a3*a0
k=c.aI(l,n)
j=Math.acos(B.a.l(c.cq(l,n).b,0,1))
if(k<0.05){i=0.76
h=0.69
g=0.5}else if(j>0.42){i=0.38
h=0.36
g=0.35}else if(k>s){i=0.92
h=0.94
g=0.96}else{f=B.a.l(k/s,0,1)
i=0.2+f*0.12
h=0.46-f*0.06
g=0.18+f*0.08}e=B.d.l(B.a.C(i*255),0,255)
if(!(p>=0&&p<b))return A.c(a,p)
a[p]=e
e=p+1
d=B.d.l(B.a.C(h*255),0,255)
if(!(e<b))return A.c(a,e)
a[e]=d
d=p+2
e=B.d.l(B.a.C(g*255),0,255)
if(!(d<b))return A.c(a,d)
a[d]=e
e=p+3
if(!(e<b))return A.c(a,e)
a[e]=255
p+=4}}return a}}
A.jM.prototype={
ej(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=b0.c,b2=b1+1,b3=b0.d
b0.x!==$&&A.d5()
s=b0.x=b2*(b3+1)
r=new Float32Array(s)
b0.r!==$&&A.d5()
b0.r=r
q=new Float32Array(s)
b0.w!==$&&A.d5()
b0.w=q
p=s*18
o=new Float32Array(p)
n=b1*b3*6
m=new Uint16Array(n)
l=b0.a
k=l/b1
j=b0.b
i=j/b3
h=l*0.5
g=j*0.5
for(l=-h,j=b0.e,f=-g,e=0,d=0,c=0;c<=b3;++c){b=f+c*i
a=c/b3
for(a0=0;a0<=b1;++a0){a1=l+a0*k
if(!(e>=0&&e<s))return A.c(r,e)
r[e]=a1
q[e]=b;++e
if(!(d>=0&&d<p))return A.c(o,d)
o[d]=a1
a2=d+1
if(!(a2<p))return A.c(o,a2)
o[a2]=j
a2=d+2
if(!(a2<p))return A.c(o,a2)
o[a2]=b
a2=d+3
if(!(a2<p))return A.c(o,a2)
o[a2]=0
a2=d+4
if(!(a2<p))return A.c(o,a2)
o[a2]=1
a2=d+5
if(!(a2<p))return A.c(o,a2)
o[a2]=0
a2=d+6
if(!(a2<p))return A.c(o,a2)
o[a2]=1
a2=d+7
if(!(a2<p))return A.c(o,a2)
o[a2]=0
a2=d+8
if(!(a2<p))return A.c(o,a2)
o[a2]=0
a2=d+9
if(!(a2<p))return A.c(o,a2)
o[a2]=1
a2=d+10
if(!(a2<p))return A.c(o,a2)
o[a2]=1
a2=d+11
if(!(a2<p))return A.c(o,a2)
o[a2]=1
a2=d+12
if(!(a2<p))return A.c(o,a2)
o[a2]=1
a2=d+13
if(!(a2<p))return A.c(o,a2)
o[a2]=1
a2=d+14
if(!(a2<p))return A.c(o,a2)
o[a2]=0
a2=d+15
if(!(a2<p))return A.c(o,a2)
o[a2]=a0/b1
a2=d+16
if(!(a2<p))return A.c(o,a2)
o[a2]=a
a2=d+17
if(!(a2<p))return A.c(o,a2)
o[a2]=0
d+=18}}for(a3=0,c=0;c<b3;){a4=c*b2;++c
a5=c*b2
for(a0=0;a0<b1;++a0){a6=a4+a0
a7=a5+a0
a8=a7+1
a9=a3+1
if(!(a3>=0&&a3<n))return A.c(m,a3)
m[a3]=a6
a3=a9+1
if(!(a9>=0&&a9<n))return A.c(m,a9)
m[a9]=a7
a9=a3+1
if(!(a3>=0&&a3<n))return A.c(m,a3)
m[a3]=a8
a3=a9+1
if(!(a9>=0&&a9<n))return A.c(m,a9)
m[a9]=a6
a9=a3+1
if(!(a3>=0&&a3<n))return A.c(m,a3)
m[a3]=a8
a3=a9+1
if(!(a9>=0&&a9<n))return A.c(m,a9)
m[a9]=a6+1}}b1=new A.ba(B.ai,o,m,new A.a4(new A.a(l-2,j-4,f-2),new A.a(h+2,j+4,g+2)))
b0.f!==$&&A.d5()
b0.f=b1
b1.n()},
ht(d2,d3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0=this,d1=d0.f
d1===$&&A.G()
s=d1.b
r=d3.a
q=r.length
p=new Float64Array(q)
o=new Float64Array(q)
n=new Float64Array(q)
m=new Float64Array(q)
l=new Float64Array(q)
k=new Float64Array(q)
j=new Float64Array(q)
i=new Float64Array(q)
h=new Float64Array(q)
g=new Float64Array(q)
f=new Float64Array(q)
e=new Float64Array(q)
d1=d0.c
d=d0.a/d1
for(c=0;c<q;++c){b=r[c]
a=b.w
a===$&&A.G()
if(!(c<q))return A.c(p,c)
p[c]=a
a0=b.x
a0===$&&A.G()
if(!(c<q))return A.c(o,c)
o[c]=a0
a0=b.f
a0===$&&A.G()
if(!(c<q))return A.c(n,c)
n[c]=a0
a1=b.r
a1===$&&A.G()
if(!(c<q))return A.c(m,c)
m[c]=d2*a1
a1=b.b
if(!(c<q))return A.c(l,c)
l[c]=a1
a2=b.d
if(!(c<q))return A.c(k,c)
k[c]=a2*a1
if(!(c<q))return A.c(j,c)
j[c]=a0*a1
if(!(c<q))return A.c(i,c)
i[c]=a2*a0*a1
a3=a*a0*d
a0=Math.cos(a3)
if(!(c<q))return A.c(h,c)
h[c]=a0
a0=Math.sin(a3)
if(!(c<q))return A.c(g,c)
g[c]=a0}a4=d1+1
d1=d0.e
a5=a4
a6=0
a7=0
for(;;){a=d0.x
a===$&&A.G()
if(!(a7<a))break
a=d0.r
a===$&&A.G()
if(!(a7<a.length))return A.c(a,a7)
a8=a[a7]
a=d0.w
a===$&&A.G()
if(!(a7<a.length))return A.c(a,a7)
a9=a[a7]
b0=a5+1
if(a5===a4){for(c=0;c<q;++c){b1=(p[c]*a8+o[c]*a9)*n[c]+m[c]
a=Math.cos(b1)
if(!(c<q))return A.c(f,c)
f[c]=a
a=Math.sin(b1)
if(!(c<q))return A.c(e,c)
e[c]=a}a5=1}else a5=b0
for(b2=0,b3=0,b4=0,b5=0,b6=1,b7=0,c=0;c<q;++c){b8=f[c]
b9=e[c]
a=h[c]
a0=g[c]
if(!(c<q))return A.c(f,c)
f[c]=b8*a-b9*a0
a0=h[c]
a=g[c]
if(!(c<q))return A.c(e,c)
e[c]=b9*a0+b8*a
a=p[c]
a0=k[c]
b2+=a*a0*b8
b3+=l[c]*b9
a1=o[c]
b4+=a1*a0*b8
a0=j[c]
b5-=a*a0*b8
b6-=i[c]*b9
b7-=a1*a0*b8}c0=Math.sqrt(b5*b5+b6*b6+b7*b7)
if(c0<0.000001){b5=0
b6=1
b7=0}else{b5/=c0
b6/=c0
b7/=c0}if(Math.abs(b5)>0.85){c1=0
c2=1}else{c1=1
c2=0}c3=c1*b5+c2*b7
c4=c1-b5*c3
c5=-b6*c3
c6=c2-b7*c3
c7=Math.sqrt(c4*c4+c5*c5+c6*c6)
if(c7>0.000001){c4/=c7
c5/=c7
c6/=c7}else{c4=1
c5=0
c6=0}s.$flags&2&&A.aY(s)
a=s.length
if(!(a6<a))return A.c(s,a6)
s[a6]=a8+b2
a0=a6+1
if(!(a0<a))return A.c(s,a0)
s[a0]=d1+b3
a0=a6+2
if(!(a0<a))return A.c(s,a0)
s[a0]=a9+b4
a0=a6+3
if(!(a0<a))return A.c(s,a0)
s[a0]=b5
a0=a6+4
if(!(a0<a))return A.c(s,a0)
s[a0]=b6
a0=a6+5
if(!(a0<a))return A.c(s,a0)
s[a0]=b7
a0=a6+6
if(!(a0<a))return A.c(s,a0)
s[a0]=c4
a0=a6+7
if(!(a0<a))return A.c(s,a0)
s[a0]=c5
a0=a6+8
if(!(a0<a))return A.c(s,a0)
s[a0]=c6
c8=(b3-0.15)*1.8
if(c8<0)c8=0
if(c8>1)c8=1
c9=c8*c8
a0=a6+10
if(!(a0<a))return A.c(s,a0)
s[a0]=0.35+0.65*c9
a0=a6+11
if(!(a0<a))return A.c(s,a0)
s[a0]=0.65+0.35*c9
a0=a6+12
if(!(a0<a))return A.c(s,a0)
s[a0]=0.9+0.1*c9
a0=a6+13
if(!(a0<a))return A.c(s,a0)
s[a0]=1
a6+=18;++a7}}}
A.a4.prototype={
gaC(){var s,r,q,p=this.a,o=p.a,n=p.b
p=p.c
s=this.b
r=s.a
q=s.b
s=s.c
return A.d([new A.a(o,n,p),new A.a(r,n,p),new A.a(o,q,p),new A.a(r,q,p),new A.a(o,n,s),new A.a(r,n,s),new A.a(o,q,s),new A.a(r,q,s)],t.G)},
j(a){return"Aabb("+this.a.j(0)+", "+this.b.j(0)+")"}}
A.e7.prototype={$ioo:1}
A.c4.prototype={}
A.dp.prototype={
D(){return"FrustumTest."+this.b}}
A.id.prototype={
dP(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
for(s=this.a,r=a1.b,q=r.c,p=r.b,r=r.a,o=a1.a,n=o.c,m=o.b,o=o.a,l=!1,k=0;k<6;++k){j=s[k]
i=j.a
h=i.a
g=h>=0
f=g?r:o
e=i.b
d=e>=0
c=d?p:m
i=i.c
b=i>=0
a=b?q:n
a0=j.b
if(h*f+e*c+i*a+a0<0)return B.al
g=g?o:r
f=d?m:p
d=b?n:q
if(h*g+e*f+i*d+a0<0)l=!0}return l?B.ci:B.cj}}
A.ie.prototype={
$4(a,b,c,d){var s=new A.a(a,b,c),r=new A.c4(s,d),q=Math.sqrt(s.gO())
return q<1e-9?r:new A.c4(s.k(0,1/q),d/q)},
$S:58}
A.aI.prototype={
k(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=new Float32Array(16)
for(s=this.a,r=s.length,q=b.a,p=q.length,o=0;o<4;++o)for(n=o*4,m=0;m<4;++m){for(l=0,k=0;k<4;++k){j=k*4+m
if(!(j<r))return A.c(s,j)
j=s[j]
i=n+k
if(!(i<p))return A.c(q,i)
l+=j*q[i]}j=n+m
if(!(j<16))return A.c(h,j)
h[j]=l}return new A.aI(h)},
ai(a){var s,r,q,p,o,n,m,l,k,j,i,h
t.a.a(a)
s=a.a
r=this.a
q=r.length
if(0>=q)return A.c(r,0)
p=r[0]
o=a.b
if(4>=q)return A.c(r,4)
n=r[4]
m=a.c
if(8>=q)return A.c(r,8)
l=r[8]
if(12>=q)return A.c(r,12)
k=s*p+o*n+m*l+r[12]
l=r[1]
n=r[5]
p=r[9]
if(13>=q)return A.c(r,13)
j=s*l+o*n+m*p+r[13]
p=r[2]
n=r[6]
l=r[10]
if(14>=q)return A.c(r,14)
i=s*p+o*n+m*l+r[14]
l=r[3]
n=r[7]
p=r[11]
if(15>=q)return A.c(r,15)
h=s*l+o*n+m*p+r[15]
return h===0||h===1?new A.a(k,j,i):new A.a(k/h,j/h,i/h)},
gdr(){var s,r,q,p,o,n,m,l=this.a,k=l.length
if(0>=k)return A.c(l,0)
s=l[0]
if(5>=k)return A.c(l,5)
r=l[5]
if(10>=k)return A.c(l,10)
k=l[10]
q=l[9]
p=l[6]
o=l[4]
n=l[1]
m=l[2]
return s*(r*k-q*p)-o*(n*k-q*m)+l[8]*(n*p-r*m)},
fX(){var s,r,q,p,o,n,m,l,k=this.gdr()
if(!isFinite(k)||Math.abs(k)<1e-12)throw A.b(A.n("Mat4.inverse3x3: singular upper-left 3x3 (det="+A.m(k)+")"))
s=1/k
r=this.cC()
q=new Float32Array(16)
for(p=0;p<3;++p)for(o=p*4,n=0;n<3;++n){m=o+n
l=n*3+p
if(!(l<9))return A.c(r,l)
l=r[l]
if(!(m<16))return A.c(q,m)
q[m]=l*s}if(15>=16)return A.c(q,15)
q[15]=1
return new A.aI(q)},
ck(){var s,r,q,p,o,n,m,l,k,j=this.gdr()
if(!isFinite(j)||Math.abs(j)<1e-12)return this.es(j)
s=this.fX()
r=new Float32Array(16)
for(q=s.a,p=q.length,o=0;o<3;++o)for(n=o*4,m=0;m<3;++m){l=n+m
k=m*4+o
if(!(k<p))return A.c(q,k)
k=q[k]
if(!(l<16))return A.c(r,l)
r[l]=k}if(15>=16)return A.c(r,15)
r[15]=1
return new A.aI(r)},
cC(){var s,r,q,p,o,n,m,l=this.a,k=l.length
if(5>=k)return A.c(l,5)
s=l[5]
if(10>=k)return A.c(l,10)
k=l[10]
r=l[6]
q=l[9]
p=l[8]
o=l[4]
n=l[2]
m=l[1]
l=l[0]
return A.d([s*k-r*q,r*p-o*k,o*q-s*p,n*q-m*k,l*k-n*p,m*p-l*q,m*r-n*s,n*o-l*r,l*s-m*o],t.n)},
es(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.cC()
for(s=0,r=0;r<9;++r){q=h[r]
if(!isFinite(q))throw A.b(A.n("Mat4.normalMatrix: non-finite upper-left 3x3 (det="+A.m(a)+")"))
s=Math.max(s,Math.abs(q))}if(s<1e-30){p=new Float32Array(16)
p[0]=1
p[5]=1
p[10]=1
p[15]=1
return new A.aI(p)}o=(a<0?-1:1)/s
n=new Float32Array(16)
for(m=0;m<3;++m)for(p=m*4,l=m*3,k=0;k<3;++k){j=p+k
i=l+k
if(!(i<9))return A.c(h,i)
i=h[i]
if(!(j<16))return A.c(n,j)
n[j]=i*o}if(15>=16)return A.c(n,15)
n[15]=1
return new A.aI(n)},
cg(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=J.ip(4,t.kI)
for(s=t.n,r=this.a,q=r.length,p=0;p<4;++p){if(!(p<q))return A.c(r,p)
o=r[p]
n=4+p
if(!(n<q))return A.c(r,n)
n=r[n]
m=8+p
if(!(m<q))return A.c(r,m)
m=r[m]
l=12+p
if(!(l<q))return A.c(r,l)
l=r[l]
k=p===0?1:0
j=p===1?1:0
i=p===2?1:0
a1[p]=new Float64Array(A.t(A.d([o,n,m,l,k,j,i,p===3?1:0],s)))}for(h=0;h<4;h=p){s=a1[h]
if(!(h<s.length))return A.c(s,h)
g=Math.abs(s[h])
for(p=h+1,f=p,e=h;f<4;++f){r=a1[f]
if(!(h<r.length))return A.c(r,h)
d=Math.abs(r[h])
if(d>g){g=d
e=f}}if(!isFinite(g)||g<1e-12)throw A.b(A.n("Mat4.inverse: singular matrix"))
if(e!==h){if(!(e>=0&&e<4))return A.c(a1,e)
a1[h]=a1[e]
a1[e]=s}s=a1[h]
if(!(h<s.length))return A.c(s,h)
c=s[h]
for(b=0;b<8;++b){if(!(b<s.length))return A.c(s,b)
r=s[b]
s.$flags&2&&A.aY(s)
s[b]=r/c}for(f=0;f<4;++f){if(f===h)continue
s=a1[f]
if(!(h<s.length))return A.c(s,h)
a=s[h]
if(a===0)continue
for(b=0;b<8;++b){if(!(b<s.length))return A.c(s,b)
r=s[b]
q=a1[h]
if(!(b<q.length))return A.c(q,b)
q=q[b]
s.$flags&2&&A.aY(s)
s[b]=r-a*q}}}a0=new Float32Array(16)
for(p=0;p<4;++p)for(h=0;h<4;++h){s=h*4+p
r=a1[p]
q=4+h
if(!(q<r.length))return A.c(r,q)
q=r[q]
if(!(s<16))return A.c(a0,s)
a0[s]=q}return new A.aI(a0)},
gK(a){return B.ar.bt(this.a,new A.ix())},
j(a){return"Mat4("+A.m(this.a)+")"}}
A.ix.prototype={
$1(a){return isFinite(A.cZ(a))},
$S:15}
A.bL.prototype={
k(a,b){var s=this,r=s.d,q=b.a,p=s.a,o=b.d,n=s.b,m=b.c,l=s.c,k=b.b
return new A.bL(r*q+p*o+n*m-l*k,r*k-p*m+n*o+l*q,r*m+p*k-n*q+l*o,r*o-p*q-n*k-l*m)},
gm(){var s=this,r=s.a,q=s.b,p=s.c,o=s.d,n=Math.sqrt(r*r+q*q+p*p+o*o)
return n<1e-9?B.t:new A.bL(r/n,q/n,p/n,o/n)},
aF(a){var s=this,r=new A.a(s.a,s.b,s.c),q=r.S(a),p=r.S(q)
return a.u(0,q.k(0,2*s.d)).u(0,p.k(0,2))},
j(a){var s=this
return"Quat("+A.m(s.a)+", "+A.m(s.b)+", "+A.m(s.c)+", "+A.m(s.d)+")"}}
A.je.prototype={
fW(a){var s,r,q,p,o,n,m,l,k=null,j=this.b,i=j.a
if(Math.abs(i)<1e-9){i=this.a
s=i.a
r=a.a
if(s<r.a||s>a.b.a)return k
s=r
q=0
p=1/0}else{o=1/i
i=a.a
s=this.a
r=s.a
n=(i.a-r)*o
m=(a.b.a-r)*o
if(n>m){l=m
m=n
n=l}q=Math.max(0,n)
p=Math.min(1/0,m)
if(q>p)return k
l=s
s=i
i=l}r=j.b
if(Math.abs(r)<1e-9){r=i.b
if(r<s.b||r>a.b.b)return k}else{o=1/r
r=i.b
n=(s.b-r)*o
m=(a.b.b-r)*o
if(n>m){l=m
m=n
n=l}q=Math.max(q,n)
p=Math.min(p,m)
if(q>p)return k}j=j.c
if(Math.abs(j)<1e-9){j=i.c
if(j<s.c||j>a.b.c)return k}else{o=1/j
j=i.c
n=(s.c-j)*o
i=(a.b.c-j)*o
if(n>i){j=i
i=n}else j=n
q=Math.max(q,j)
if(q>Math.min(p,i))return k}return q},
j(a){return"Ray(origin: "+this.a.j(0)+", direction: "+this.b.j(0)+")"}}
A.jf.prototype={
j(a){var s=this,r=s.f,q=r!=null?", instance: #"+A.m(r):""
return'RaycastHit(node: "'+s.a.a+'"'+q+", distance: "+B.a.ab(s.d,2)+", point: "+s.b.j(0)+")"}}
A.hR.prototype={
aj(a){var s,r,q,p=this,o=B.a.F(B.a.F(a,1)+1,1),n=p.a,m=n.length
if(m===2){if(0>=m)return A.c(n,0)
s=n[0]
if(1>=m)return A.c(n,1)
return A.lW(s,n[1],o)}r=o*m
q=Math.min(B.a.a6(r),m-1)
return p.eG(p.bi(q-1),p.bi(q),p.bi(q+1),p.bi(q+2),r-q)},
bi(a){var s=this.a,r=s.length
s=s[B.d.F(B.d.F(a,r)+r,r)]
return s},
eG(a,b,c,d,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=new A.hS(),e=f.$2(a,b)
if(typeof e!=="number")return A.bg(e)
s=0+e
e=f.$2(b,c)
if(typeof e!=="number")return A.bg(e)
e=s+e
f=f.$2(c,d)
if(typeof f!=="number")return A.bg(f)
r=e+f
f=e-s
q=s+a0*f
p=a.k(0,(s-q)/s).u(0,b.k(0,q/s))
o=e-q
n=o/f
m=q-s
f=m/f
l=b.k(0,n).u(0,c.k(0,f))
k=r-q
j=r-e
i=c.k(0,k/j).u(0,d.k(0,(q-e)/j))
h=p.k(0,o/e).u(0,l.k(0,q/e))
s=r-s
g=l.k(0,k/s).u(0,i.k(0,m/s))
return h.k(0,n).u(0,g.k(0,f))},
ew(){var s,r,q,p,o,n,m,l=this.c
B.b.V(l)
B.b.i(l,0)
s=this.aj(0)
for(r=0,q=1;q<=200;++q,s=p){p=this.aj(q/200)
o=p.a-s.a
n=p.b-s.b
m=p.c-s.c
r+=Math.sqrt(o*o+n*n+m*m)
B.b.i(l,r)}}}
A.hS.prototype={
$2(a,b){return Math.pow(Math.max(0.0001,Math.sqrt(b.M(0,a).gO())),0.5)},
$S:59}
A.T.prototype={
c3(a,b,c){var s=this,r=c==null?s.a:c,q=a==null?s.b:a,p=b==null?s.c:b
return new A.T(r,q,p,s.d)},
c2(a){return this.c3(null,a,null)},
di(a){return this.c3(null,null,a)},
c1(a){return this.c3(a,null,null)},
n(){var s=this,r=null,q=s.a
if(!q.gK(0))throw A.b(A.f("Transform.translation must be finite: "+q.j(0),r))
q=s.b
if(!(isFinite(q.a)&&isFinite(q.b)&&isFinite(q.c)&&isFinite(q.d)))throw A.b(A.f("Transform.rotation must be finite: "+q.j(0),r))
q=s.c
if(!isFinite(q)||q<=0)throw A.b(A.f("Transform.scale must be finite and positive: "+A.m(q),r))
q=s.d
if(!q.gK(0)||q.a<=0||q.b<=0||q.c<=0)throw A.b(A.f("Transform.stretch components must be finite and positive: "+q.j(0),r))},
ae(){var s=this,r=s.a,q=s.b,p=s.c,o=s.d
return A.mP(q.d,q.a,q.b,q.c,p*o.a,p*o.b,p*o.c,r.a,r.b,r.c)},
d3(a){var s=this.d
return new A.a(a.a*s.a,a.b*s.b,a.c*s.c)},
ai(a){var s=this
return s.a.u(0,s.b.aF(s.d3(a).k(0,s.c)))},
ba(a){return this.b.aF(this.d3(a).k(0,this.c))},
k(a,b){var s=this.b,r=this.c
return new A.T(this.a.u(0,s.aF(b.a.k(0,r))),s.k(0,b.b).gm(),r*b.c,b.d)},
j(a){var s=this,r=s.d,q=r.a!==1||r.b!==1||r.c!==1,p=s.a,o=s.b,n=A.m(s.c)
return q?"Transform("+p.j(0)+", "+o.j(0)+", scale="+n+", stretch="+r.j(0)+")":"Transform("+p.j(0)+", "+o.j(0)+", scale="+n+")"}}
A.D.prototype={
k(a,b){return new A.D(this.a*b,this.b*b)},
gO(){var s=this.a,r=this.b
return s*s+r*r},
gv(a){return Math.sqrt(this.gO())},
a8(a,b){if(b==null)return!1
return b instanceof A.D&&this.a===b.a&&this.b===b.b},
gU(a){return A.c3(this.a,this.b,B.p,B.p,B.p,B.p)},
j(a){return"Vec2("+A.m(this.a)+", "+A.m(this.b)+")"}}
A.a.prototype={
u(a,b){return new A.a(this.a+b.a,this.b+b.b,this.c+b.c)},
M(a,b){return new A.a(this.a-b.a,this.b-b.b,this.c-b.c)},
ap(a){return new A.a(-this.a,-this.b,-this.c)},
k(a,b){return new A.a(this.a*b,this.b*b,this.c*b)},
aD(a){return this.a*a.a+this.b*a.b+this.c*a.c},
S(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.a(s*r-q*p,q*o-n*r,n*p-s*o)},
gO(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gv(a){return Math.sqrt(this.gO())},
gK(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gm(){var s=this,r=Math.sqrt(s.gO())
return r<1e-9?B.h:new A.a(s.a/r,s.b/r,s.c/r)},
a8(a,b){if(b==null)return!1
return b instanceof A.a&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gU(a){return A.c3(this.a,this.b,this.c,B.p,B.p,B.p)},
j(a){return"Vec3("+A.m(this.a)+", "+A.m(this.b)+", "+A.m(this.c)+")"}}
A.hN.prototype={
dW(){var s=this.b*0.5,r=this.c*0.5,q=new A.hO(this,Math.cos(0),Math.sin(0)),p=-s,o=-r
return A.d([q.$2(p,r),q.$2(s,r),q.$2(p,o),q.$2(s,o)],t.G)},
hr(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=this
if(a<=0)return g.gdl()
s=B.a.l(a,0.001,0.1)
r=g.dW()
q=r[0]
p=c.bd(q.a,q.c,b)
q=r[1]
o=c.bd(q.a,q.c,b)
q=r[2]
n=c.bd(q.a,q.c,b)
q=r[3]
m=c.bd(q.a,q.c,b)
q=p+o
l=Math.atan2(p+n-(o+m),g.b*2)
k=Math.atan2(n+m-q,g.c*2)
j=g.a
i=j.b
h=g.w
h+=(((q+n+m)*0.25-i)*20-h*4.5)/1*s
g.w=h
g.a=new A.a(j.a,i+h*s,j.c)
j=g.x
h=g.z
h+=((l-j)*14-h*6)/1*s
g.z=h
g.x=B.a.l(j+h*s,-0.65,0.65)
h=g.y
j=g.Q
j+=((k-h)*14-j*6)/1*s
g.Q=j
g.y=B.a.l(h+j*s,-0.65,0.65)
return g.gdl()},
gdl(){var s=A.al(B.f,0),r=A.al(B.k,this.y),q=A.al(B.r,this.x),p=s.k(0,r).k(0,q)
return new A.T(this.a,p,1,B.u)},
gv(a){return this.c}}
A.hO.prototype={
$2(a,b){var s=this.b,r=this.c,q=this.a.a
return new A.a(q.a+(a*s-b*r),q.b,q.c+(a*r+b*s))},
$S:60}
A.dq.prototype={}
A.ih.prototype={
dZ(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
for(s=this.a,r=s.length,q=0,p=0,o=0,n=0;n<r;++n){m=s[n]
l=m.w
l===$&&A.G()
k=m.x
k===$&&A.G()
j=m.f
j===$&&A.G()
i=m.r
i===$&&A.G()
h=(l*a+k*b)*j+c*i
g=Math.cos(h)
i=m.b
f=m.d*i
q+=l*f*g
p+=i*Math.sin(h)
o+=k*f*g}return new A.a(q,p,o)},
bd(a,b,c){var s,r,q,p,o,n,m,l,k
for(s=this.a,r=s.length,q=0,p=0;p<r;++p){o=s[p]
n=o.w
n===$&&A.G()
m=o.x
m===$&&A.G()
l=o.f
l===$&&A.G()
k=o.r
k===$&&A.G()
q+=o.b*Math.sin((n*a+m*b)*l+c*k)}return this.b+q},
e0(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
for(s=this.a,r=s.length,q=0,p=1,o=0,n=0;n<r;++n){m=s[n]
l=m.w
l===$&&A.G()
k=m.x
k===$&&A.G()
j=m.f
j===$&&A.G()
i=m.r
i===$&&A.G()
h=(l*a+k*b)*j+c*i
g=Math.cos(h)
f=j*m.b
q-=l*f*g
p-=m.d*f*Math.sin(h)
o-=k*f*g}e=Math.sqrt(q*q+p*p+o*o)
if(e<0.000001)return B.f
d=1/e
return new A.a(q*d,p*d,o*d)}}
A.eE.prototype={
D(){return"AtmosphericParticleAnchor."+this.b}}
A.cm.prototype={}
A.eF.prototype={
n(){var s,r,q,p,o,n,m,l=this,k=null
if(l.a.a<0||l.b.a<0)throw A.b(A.f("AtmosphericParticleField requires live resources",k))
s=l.e
r=A.d([new A.F("origin",l.d),new A.F("halfExtents",s),new A.F("initialVelocity",l.f),new A.F("acceleration",l.r)],t.aA)
r.push(new A.F("terminalVelocity",l.w))
q=r.length
p=0
for(;p<q;++p){o=r[p]
n=o.a
m=o.b
if(!(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)))throw A.b(A.f("AtmosphericParticleField."+n+" must be finite",k))}if(s.a<0||s.b<0||s.c<0)throw A.b(A.f("AtmosphericParticleField.halfExtents must be >= 0",k))
s=l.y
if(!isFinite(s)||s<=0)throw A.b(A.f("AtmosphericParticleField.lifetimeSeconds must be finite and > 0",k))
s=l.x
if(!isFinite(s)||s<0)throw A.b(A.f("AtmosphericParticleField.dragCoefficient must be finite and >= 0",k))
if(s<=0)throw A.b(A.f("AtmosphericParticleField terminalVelocity requires dragCoefficient > 0",k))
s=l.as
if(!isFinite(s)||s<=0)throw A.b(A.f("AtmosphericParticleField.particleScale must be finite and > 0",k))},
e_(a,b){var s,r,q,p,o,n=this,m=null
n.n()
s=n.z
if(b>=s)throw A.b(A.aM(b,0,s-1,"particleIndex",m))
r=n.y
q=B.a.F(a.w+n.bn(b,0)*r,r)
switch(n.c.a){case 0:s=B.h
break
case 1:s=a.a.d
break
default:s=m}p=n.e
o=s.u(0,n.d).u(0,new A.a((n.bn(b,1)*2-1)*p.a,(n.bn(b,2)*2-1)*p.b,(n.bn(b,3)*2-1)*p.c))
p=o.u(0,n.eD(q))
s=n.f2(q)
if(!isFinite(q)||q<0)A.l(A.f("atmospheric particle age must be finite and >= 0",m))
if(!o.gK(0)||!p.gK(0)||!s.gK(0))A.l(A.f("atmospheric particle kinematics must be finite",m))
return new A.cm(q,o,p,s)},
bF(a,b){return this.e7(a,b,new A.hK())},
e7(a,b,c){var s,r,q,p,o,n,m,l,k,j=this
t.mR.a(c)
j.n()
for(s=j.z,r=j.as,q=j.ay,p=j.CW,o=j.a,n=j.b,m=0,l=0;l<s;++l){k=j.e_(b,l)
if(!c.$1(k))continue
a.ct(new A.bq(o,n,new A.T(k.c,B.t,r,B.u),-1,B.w,q,!1,p,null));++m}return m},
f2(a){var s=this.w,r=Math.exp(-this.x*a)
return s.u(0,this.f.M(0,s).k(0,r))},
eD(a){var s=this.w,r=this.x,q=Math.exp(-r*a)
return s.k(0,a).u(0,this.f.M(0,s).k(0,(1-q)/r))},
bn(a,b){return(((this.Q^a*73244475^b*668265261)&2147483647)*1103515245+12345&2147483647)/2147483647}}
A.hK.prototype={
$1(a){return!0},
$S:61}
A.cD.prototype={
D(){return"ParticleAlignment."+this.b}}
A.fs.prototype={
D(){return"ParticleCollisionAction."+this.b}}
A.dJ.prototype={
dY(a){return 1}}
A.aT.prototype={}
A.iK.prototype={
n(){var s,r,q,p=this.a,o=p.length
if(o===0)throw A.b(A.f("ParticleColorGradient requires at least one stop",null))
for(s=0;s<o;++s){r=p[s]
q=r.a
if(!isFinite(q)||q<0||q>1)A.l(A.f("ParticleColorStop.t must be in [0, 1]",null))
q=r.b
if(!isFinite(q.a)||!isFinite(q.b)||!isFinite(q.c))A.l(A.f("ParticleColorStop.color channels must be finite",null))}},
aj(a){var s,r,q,p,o,n,m,l,k=B.a.l(a,0,1),j=this.a
if(k<=B.b.gau(j).a)return B.b.gau(j).b
if(k>=B.b.gaE(j).a)return B.b.gaE(j).b
s=j.length
r=s-1
q=0
for(;;){if(!(q<r&&j[q+1].a<k))break;++q}if(!(q<s))return A.c(j,q)
p=j[q]
r=q+1
if(!(r<s))return A.c(j,r)
o=j[r]
r=p.a
n=o.a-r
m=n>0.000001?(k-r)/n:0
j=p.b
s=j.a
r=o.b
l=j.b
j=j.c
return new A.v(s+(r.a-s)*m,l+(r.b-l)*m,j+(r.c-j)*m)}}
A.iL.prototype={
$2(a,b){var s=t.dh
return B.a.R(s.a(a).a,s.a(b).a)},
$S:62}
A.d9.prototype={
D(){return"AttractorFalloff."+this.b}}
A.cE.prototype={}
A.cO.prototype={
D(){return"SubEmitterTrigger."+this.b}}
A.dZ.prototype={}
A.hj.prototype={}
A.ft.prototype={
n(){var s,r,q,p,o,n=this,m=null
if(n.a.a<0||n.b.a<0)throw A.b(A.f("ParticleEmitter requires live resources",m))
n.at.n()
n.ax.n()
s=n.CW
if(!isFinite(s)||s<0)throw A.b(A.f("ParticleEmitter.rate must be finite and >= 0",m))
for(s=n.cx.length,r=isFinite(1),q=isFinite(0),p=0;p<s;++p){if(!q)A.l(A.f("ParticleBurst.time must be finite and >= 0",m))
if(!r)A.l(A.f("ParticleBurst.repeatInterval must be finite and > 0",m))}if(!q)throw A.b(A.f("ParticleEmitter.duration must be finite and >= 0",m))
s=n.fr
if(!isFinite(s)||s<=0||n.fx<s)throw A.b(A.f("ParticleEmitter lifetime range must be valid: "+A.m(s)+".."+A.m(n.fx),m))
s=n.fy
if(!isFinite(s)||s<0||n.go<s)throw A.b(A.f("ParticleEmitter speed range must be valid: "+A.m(s)+".."+A.m(n.go),m))
s=n.id
if(!isFinite(s)||s<=0||n.k1<s)throw A.b(A.f("ParticleEmitter start size range must be valid: "+A.m(s)+".."+A.m(n.k1),m))
s=n.k2
if(!isFinite(s)||s<0||n.k3<s)throw A.b(A.f("ParticleEmitter end size range must be valid: "+A.m(s)+".."+A.m(n.k3),m))
s=n.ok
if(!isFinite(s)||s<0||s>1)throw A.b(A.f("ParticleEmitter.fadeInFraction must be in [0, 1]",m))
r=n.p1
if(!isFinite(r)||r<0||r>1)throw A.b(A.f("ParticleEmitter.fadeOutFraction must be in [0, 1]",m))
if(s+r>1)throw A.b(A.f("ParticleEmitter fadeInFraction + fadeOutFraction must be <= 1.0",m))
if(!n.ry.gK(0)||!n.x1.gK(0))throw A.b(A.f("ParticleEmitter gravity and acceleration must be finite",m))
s=n.x2
if(!isFinite(s)||s<0)throw A.b(A.f("ParticleEmitter.dragCoefficient must be finite and >= 0",m))
if(!isFinite(n.xr)||!isFinite(n.y1))throw A.b(A.f("ParticleEmitter radial and orbital accelerations must be finite",m))
s=n.y2
if(!s.gK(0)||s.gO()<0.000001)throw A.b(A.f("ParticleEmitter.orbitalAxis must be finite and non-zero",m))
s=n.du
if(!isFinite(s)||s<0||!isFinite(n.dv)||!isFinite(n.dw))throw A.b(A.f("ParticleEmitter noise parameters must be finite",m))
for(s=n.aM,r=s.length,p=0;p<r;++p){o=s[p]
o.a.n()
if(o.c<=0)A.l(A.f("SubEmitter.count must be > 0",m))
if(!isFinite(o.e))A.l(A.f("SubEmitter.inheritVelocityFactor must be finite",m))
q=o.f
if(!isFinite(q)||q<=0)A.l(A.f("SubEmitter.trailInterval must be finite and > 0",m))
q=o.r
if(!isFinite(q)||q<0)A.l(A.f("SubEmitter.trailDistance must be finite and >= 0",m))}for(s=n.dz,r=s.length,p=0;p<s.length;s.length===r||(0,A.A)(s),++p)s[p].n()
s=n.y
if(s!=null)s.n()
s=n.dA
if(s!=null){if(s.a.gK(0)){r=s.b
r=!r.gK(0)||r.gO()<0.000001}else r=!0
if(r)A.l(A.f("ParticleCollisionPlane geometry must be finite and valid",m))
r=s.c
if(!isFinite(r)||r<0||r>1)A.l(A.f("ParticleCollisionPlane.restitution must be in [0, 1]",m))
s=s.d
if(!isFinite(s)||s<0||s>1)A.l(A.f("ParticleCollisionPlane.friction must be in [0, 1]",m))}s=n.p3
if(s!=null)s.n()
if(n.bu<=0)throw A.b(A.f("ParticleEmitter.maxParticles must be > 0",m))},
am(a,b,c,d,e,f){var s,r,q
if(a<=0)return 0
s=Math.min(a,this.bu-this.ao)
for(r=0,q=0;q<s;++q){this.d2(b,c,d,e,f);++r}return r},
fh(a,b,c,d){return this.am(a,b,c,d,null,null)},
bq(a,b,c,d){return this.am(a,null,b,c,null,d)},
fg(a,b){var s=null
return this.am(a,s,s,b,s,s)},
fi(a,b,c,d){return this.am(a,b,null,null,c,d)},
fd(a,b){var s,r,q,p,o,n,m=this.p3
if(m==null)throw A.b(A.n("bindColorGradient: this emitter has no colorGradient"))
s=A.d([],t.cT)
for(r=a.b.a,q=a.r,p=0;p<8;++p){o=new A.iM(m,p,8,b).$0()
if(a.x)A.l(A.n("resource library is disposed"))
o.n()
n=r.aK(o,null)
q.i(0,n)
s.push(n)}this.ca=s},
ac(a){var s,r,q,p,o,n,m,l,k,j=this
if(!isFinite(a)||a<=0)return
j.n()
s=j.dC+=a
if(s<0)return
if(j.dy){for(r=j.cx,q=r.length,p=j.fL,o=j.dB,n=0;n<q;++n){m=r[n]
if(!(n<p.length))return A.c(p,n)
l=p[n]
if(l>=1)continue
if(s>=l){j.fi(m.dY(o),null,null,null)
if(!(n<p.length))return A.c(p,n)
B.b.E(p,n,p[n]+1)}}s=j.CW
if(s>0){s=j.bw=j.bw+s*a
r=j.bu
for(;;){if(!(s>=1&&j.ao<r))break
j.eX()
s=--j.bw}if(j.ao>=r)j.bw=0}}j.eO(a)
for(s=j.aM,r=s.length,k=0;k<r;++k)s[k].a.ac(a)},
d2(a,b,c,d,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this,e=f.ao
if(e>=f.bu)return
s=f.bv
f.ao=e+1
if(!(e>=0&&e<s.length))return A.c(s,e)
r=s[e]
r.id=!0
r.as=r.go=0
e=f.dB
q=f.at.aX(e,f.ax)
if(c!=null){s=r.a=c.a
p=r.b=c.b
o=r.c=c.c}else{s=q.a
p=r.a=s.a
o=r.b=s.b
s=r.c=s.c
n=o
o=s
s=p
p=n}r.r=s
r.w=p
r.x=o
r.y=s
r.z=p
r.Q=o
o=f.fy
m=q.b.k(0,o+(f.go-o)*e.L())
o=m.a
r.d=o
p=m.b
r.e=p
s=m.c
r.f=s
if(b!=null){r.d=o+b.a
r.e=p+b.b
r.f=s+b.c}r.at=0
s=f.fr
r.ax=s+(f.fx-s)*e.L()
s=f.id
r.ch=s+(f.k1-s)*e.L()
s=f.k2
r.CW=s+(f.k3-s)*e.L()
r.ay=r.ch
s=f.p4
r.cx=s+(f.R8-s)*e.L()
s=f.RG
r.cy=s+(f.rx-s)*e.L()
r.db=1
r.fx=r.fr=0
l=f.y
if(l!=null){if(a0!=null){k=l.d.B(0,a0)
e=k==null?0:k
r.dy=B.d.l(e,0,l.b.length-1)
r.fy=!1}else if(a!=null){j=l.c.B(0,a)
if(j!=null&&j.b.length!==0){r.dy=B.b.gau(j.b)
r.fy=!0}else{r.dy=0
r.fy=!1}}else switch(f.z.a){case 0:r.dy=0
r.fy=!1
break
case 1:case 2:r.dy=0
r.fy=!0
break
case 3:r.dy=e.aO(l.b.length)
r.fy=!1
break
case 4:r.dy=l.e1(e)
r.fy=!1
break
case 5:r.dy=0
r.fy=!1
break}r.dx=r.dy}else{r.dy=0
r.fy=!1
r.dx=0}++f.fJ
for(e=f.aM,s=e.length,i=0;i<s;++i){h=e[i]
if(h.b===B.ff){if(h.d){p=h.e
g=new A.a(r.d*p,r.e*p,r.f*p)}else g=B.h
h.a.am(h.c,null,g,new A.a(r.a,r.b,r.c),null,null)}}},
eX(){var s=null
return this.d2(s,s,s,s,s)},
eO(g7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8=this,f9=null,g0=f8.ry,g1=f8.x1,g2=f8.x2,g3=g2>0?Math.exp(-g2*g7):1,g4=f8.ax.a,g5=f8.y2.gm(),g6=f8.dA
A:for(s=f8.y,g2=f8.aM,r=g2.length,q=f8.k4,p=f8.dz,o=f8.du,n=o>0.000001,m=f8.y1,l=Math.abs(m)>0.000001,k=f8.xr,j=Math.abs(k)>0.000001,i=g0.a+g1.a,h=g0.b+g1.b,g=g0.c+g1.c,g1=f8.bv,g0=g1.length,f=g4.a,e=g4.b,d=g4.c,c=g5.b,b=g5.c,a=g5.a,a0=f8.dv,a1=f8.dw,a2=f8.z,a3=a2===B.es,a2=a2===B.er,a4=s!=null,a5=q==null,a6=g6!=null,a7=0;a7<f8.ao;){if(!(a7<g0))return A.c(g1,a7)
a8=g1[a7]
a9=a8.at+=g7
b0=a8.ax
if(a9>=b0){f8.bj(a7)
continue A}b1=a9/b0
a9=a8.a
a8.y=a9
b0=a8.b
a8.z=b0
b2=a8.c
a8.Q=b2
if(j){b3=a9-f
b4=b0-e
b5=b2-d
b6=Math.sqrt(b3*b3+b4*b4+b5*b5)
if(b6>0.00001){b7=k/b6
b8=i+b3*b7
b9=h+b4*b7
c0=g+b5*b7}else{c0=g
b9=h
b8=i}}else{c0=g
b9=h
b8=i}if(l){b3=a8.a-f
b4=a8.b-e
b5=a8.c-d
c1=c*b5-b*b4
c2=b*b3-a*b5
c3=a*b4-c*b3
c4=Math.sqrt(c1*c1+c2*c2+c3*c3)
if(c4>0.00001){c5=m/c4
b8+=c1*c5
b9+=c2*c5
c0+=c3*c5}}if(n){a9=a8.a
b0=a8.b
b2=a8.c
c6=a1*f8.dC
b0*=a0
b2*=a0
a9*=a0
b8+=(Math.sin(b0+c6)+Math.cos(b2*1.3-c6*0.7))*o
b9+=(Math.sin(b2+c6*1.1)+Math.cos(a9*1.1-c6))*o
c0+=(Math.sin(a9-c6*0.9)+Math.cos(b0*0.9+c6*1.2))*o}c8=0
for(;;){if(!(c8<p.length)){c7=!1
break}c9=p[c8]
d0=c9.gaP().gbB().M(0,a8.a)
d1=c9.gaP().gbC().M(0,a8.b)
d2=c9.gaP().gbD().M(0,a8.c)
d3=Math.sqrt(A.ch(d0.k(0,d0).u(0,d1.k(0,d1)).u(0,d2.k(0,d2))))
if(c9.gby().bc(0,0)&&B.a.aW(d3,c9.gby())){f8.bj(a7)
c7=!0
break}if(B.a.aW(d3,c9.gdL())&&d3>0.0001){switch(c9.ghC()){case B.bI:d4=1-B.a.aH(d3,c9.gdL())
break
case B.bJ:d5=B.a.aH(d3,c9.gdL())
d4=1/(1+d5*d5*4)
break
case B.bK:d4=1
break
default:d4=f9}d6=c9.ghx().k(0,d4).aH(0,d3)
b8=B.a.u(b8,d0.k(0,d6))
b9=B.a.u(b9,d1.k(0,d6))
c0=B.a.u(c0,d2.k(0,d6))
if(c9.gh2().hz(0).bc(0,0.000001)){d7=c9.ghA().gm()
b3=d0.ap(0)
b4=d1.ap(0)
b5=d2.ap(0)
c1=d7.gbC().k(0,b5).M(0,d7.gbD().k(0,b4))
c2=d7.gbD().k(0,b3).M(0,d7.gbB().k(0,b5))
c3=d7.gbB().k(0,b4).M(0,d7.gbC().k(0,b3))
c4=Math.sqrt(A.ch(c1.k(0,c1).u(0,c2.k(0,c2)).u(0,c3.k(0,c3))))
if(c4>0.00001){c5=c9.gh2().k(0,d4).aH(0,c4)
b8=B.a.u(b8,c1.k(0,c5))
b9=B.a.u(b9,c2.k(0,c5))
c0=B.a.u(c0,c3.k(0,c5))}}}++c8}if(c7)continue A
a9=a8.a
b0=a8.d
a8.a=a9+(b0*g7+0.5*b8*g7*g7)
a9=a8.b
b2=a8.e
a8.b=a9+(b2*g7+0.5*b9*g7*g7)
a9=a8.c
d8=a8.f
a8.c=a9+(d8*g7+0.5*c0*g7*g7)
a8.d=(b0+b8*g7)*g3
a8.e=(b2+b9*g7)*g3
a8.f=(d8+c0*g7)*g3
c8=0
for(;;){if(!(c8<p.length)){d9=!1
break}c9=p[c8]
if(c9.gby().bc(0,0)){e0=c9.gaP().gbB().M(0,a8.a)
e1=c9.gaP().gbC().M(0,a8.b)
e2=c9.gaP().gbD().M(0,a8.c)
if(e0.k(0,e0).u(0,e1.k(0,e1)).u(0,e2.k(0,e2)).aW(0,c9.gby().k(0,c9.gby()))){f8.bj(a7)
d9=!0
break}}++c8}if(d9)continue A
if(a6){e3=g6.b.gm()
a9=a8.a
b0=g6.a
b2=e3.a
d8=e3.b
e4=e3.c
d3=(a9-b0.a)*b2+(a8.b-b0.b)*d8+(a8.c-b0.c)*e4
if(d3<=0){for(c6=0;c6<r;++c6){e5=g2[c6]
if(e5.b===B.aD){if(e5.d){a9=e5.e
e6=new A.a(a8.d*a9,a8.e*a9,a8.f*a9)}else e6=B.h
e5.a.am(e5.c,f9,e6,new A.a(a8.a,a8.b,a8.c),f9,f9)}}switch(g6.e.a){case 1:f8.bj(a7)
continue A
case 2:a8.a=a8.a-d3*b2
a8.b=a8.b-d3*d8
a8.c=a8.c-d3*e4
a9=a8.d
b0=a8.e
e7=a8.f
e8=a9*b2+b0*d8+e7*e4
b2=a9-e8*b2
a8.d=b2
d8=b0-e8*d8
a8.e=d8
e4=e7-e8*e4
a8.f=e4
e7=1-g6.d
a8.d=b2*e7
a8.e=d8*e7
a8.f=e4*e7
break
case 0:a8.a=a8.a-d3*b2
a8.b=a8.b-d3*d8
a8.c=a8.c-d3*e4
a9=a8.d
b0=a8.e
e7=a8.f
e8=a9*b2+b0*d8+e7*e4
if(e8<0){e9=(1+g6.c)*e8
f0=1-g6.d
a8.d=(a9-e9*b2)*f0
a8.e=(b0-e9*d8)*f0
a8.f=(e7-e9*e4)*f0}break}}}if(a5)f1=f9
else{a9=B.a.l(b1,0,1)
a9=q.a.$1(a9)
f1=a9}if(f1==null)f1=b1
a9=a8.ch
a8.ay=a9+(a8.CW-a9)*f1
a8.cx=a8.cx+a8.cy*g7
f2=a8.a-a8.y
f3=a8.b-a8.z
f4=a8.c-a8.Q
f5=Math.sqrt(f2*f2+f3*f3+f4*f4)
a8.go+=g7
for(a9=f5>0.000001,f6=!1,c6=0;c6<r;++c6){e5=g2[c6]
if(e5.b===B.br){if(e5.d){b0=e5.e
e6=new A.a(a8.d*b0,a8.e*b0,a8.f*b0)}else e6=B.h
b0=e5.r
if(b0>0){a8.as+=f5
for(b2=e5.a,d8=e5.c;e4=a8.as,e4>=b0;){e4-=b0
a8.as=e4
f7=a9?B.a.l(f5-e4,0,f5)/f5:1
b2.am(d8,f9,e6,new A.a(a8.y+f2*f7,a8.z+f3*f7,a8.Q+f4*f7),f9,f9)}}else if(a8.go>=e5.f){e5.a.am(e5.c,f9,e6,new A.a(a8.a,a8.b,a8.c),f9,f9)
f6=!0}}}if(f6)a8.go=0
if(a4){if(a8.fy)if(a2){a9=s.b.length
a8.dy=B.d.l(B.a.a6(b1*a9),0,a9-1)}else if(a3)a8.dy=B.d.F(B.a.a6((a8.fr+=g7)*12),s.b.length)
a8.dx=a8.dy}++a7}},
bj(a){var s,r,q,p,o,n,m,l,k,j=this,i=j.bv,h=i.length
if(!(a<h))return A.c(i,a)
s=i[a]
r=new A.a(s.a,s.b,s.c)
for(q=j.aM,p=q.length,o=0;o<p;++o){n=q[o]
if(n.b===B.bq){if(n.d){m=n.e
l=new A.a(s.d*m,s.e*m,s.f*m)}else l=B.h
n.a.am(n.c,null,l,r,null,null)}}q=--j.ao;++j.fK
if(a<q){if(!(q<h))return A.c(i,q)
k=i[q]
s.a=k.a
s.b=k.b
s.c=k.c
s.d=k.d
s.e=k.e
s.f=k.f
s.r=k.r
s.w=k.w
s.x=k.x
s.y=k.y
s.z=k.z
s.Q=k.Q
s.as=k.as
s.at=k.at
s.ax=k.ax
s.ay=k.ay
s.ch=k.ch
s.CW=k.CW
s.cx=k.cx
s.cy=k.cy
s.db=k.db
s.dx=k.dx
s.dy=k.dy
s.fr=k.fr
s.fx=k.fx
s.fy=k.fy
s.go=k.go
s.id=k.id}if(!(q>=0&&q<h))return A.c(i,q)
i=i[q]
i.at=i.as=i.y=i.z=i.Q=i.r=i.w=i.x=i.d=i.e=i.f=i.a=i.b=i.c=0
i.CW=i.ch=i.ay=i.ax=1
i.cy=i.cx=0
i.db=1
i.fx=i.fr=i.dy=i.dx=0
i.fy=!1
i.go=0
i.id=!1},
cu(c2,c3,c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0=this,c1=0
if(c0.ao>0){s=c3.a
r=A.mG(s.c)
q=s.d
p=s.e
o=c0.ca
n=c0.b
for(s=c0.a,m=c0.d,l=c0.e,k=c0.x,j=o!=null,i=c0.y,h=c0.p1,g=h>0,f=c0.ok,e=f>0,d=c0.ay===B.O,c=c0.bv,b=c.length,a=c0.ch,a0=1-h,a1=t.W,a2=i!=null,a3=0;a3<c0.ao;++a3){if(!(a3<b))return A.c(c,a3)
a4=c[a3]
a5=a4.a
a6=a4.b
a7=a4.c
a8=a4.ay*0.5
if(r.dP(new A.a4(new A.a(a5-a8,a6-a8,a7-a8),new A.a(a5+a8,a6+a8,a7+a8)))===B.al)continue
a9=c0.eU(a4,q,p)
b0=a4.ay
if(d){a8=a4.d
b1=a4.e
b2=a4.f
b3=Math.sqrt(a8*a8+b1*b1+b2*b2)
b0=a4.ay*(1+b3*a)}a8=a4.ax
b4=B.a.l(a8>0?a4.at/a8:1,0,1)
b5=e&&b4<f?b4/f:1
if(g&&b4>a0)b5*=(1-b4)/h
b0*=b5
if(b0<=0.000001)continue
if(a2&&i.f.length===i.b.length){a8=a4.dy
b1=i.f
b6=A.bo(b1,!1,a1)
b6.$flags=3
b7=B.d.l(a8,0,b6.length-1)
b6=A.bo(b1,!1,a1)
b6.$flags=3
b1=b6
if(!(b7>=0&&b7<b1.length))return A.c(b1,b7)
b8=b1[b7]}else if(j){a8=a4.ax
b4=a8>0?B.a.l(a4.at/a8,0,1):0
a8=o.length
b1=B.a.C(b4*(a8-1))
if(!(b1>=0&&b1<a8))return A.c(o,b1)
b8=o[b1]}else b8=n
c2.ct(new A.bq(s,b8,new A.T(new A.a(a5,a6,a7),a9,b0,B.u),-1,m,l,!1,!1,k));++c1}}for(s=c0.aM,m=s.length,b9=0;b9<m;++b9)c1+=s[b9].a.cu(c2,c3,!0)
return c1},
bF(a,b){return this.cu(a,b,!0)},
eU(a,b,c){var s,r,q,p,o,n,m
switch(this.ay.a){case 0:s=b.M(0,new A.a(a.a,a.b,a.c)).gm()
if(s.gO()<0.000001)return B.t
r=A.n3(B.r,s)
q=a.cx
if(Math.abs(q)>0.000001)return r.k(0,A.al(B.r,q)).gm()
return r
case 1:case 2:p=new A.a(a.d,a.e,a.f)
if(p.gO()<0.000001){q=a.cx
return Math.abs(q)>0.000001?A.al(B.f,q):B.t}o=p.gm()
n=B.a.l(B.v.aD(o),-1,1)
if(n>0.999999)return B.t
if(n<-0.999999)return A.al(B.k,3.141592653589793)
m=A.al(B.v.S(o),Math.acos(n))
q=a.cx
if(Math.abs(q)>0.000001)return A.al(o,q).k(0,m).gm()
return m
case 3:return A.al(B.f,a.cx)}}}
A.iM.prototype={
$0(){var s=this,r=s.b,q=s.a.aj(r/(s.c-1)),p=s.d
return p.fp(p.a+"#gradient"+r,q.c,q.b,q.a)},
$S:63}
A.bY.prototype={}
A.c5.prototype={
n(){if(!B.h.gK(0))throw A.b(A.f("PointShape.offset must be finite",null))
var s=this.b
if(s!=null)s=!s.gK(0)||s.gO()<0.000001
else s=!1
if(s)throw A.b(A.f("PointShape.direction must be finite and non-zero",null))
s=this.c
if(!isFinite(s)||s<0||s>3.141592653589793)throw A.b(A.f("PointShape.spreadAngleRadians must be in [0, pi]",null))},
aX(a,b){var s,r,q,p,o,n,m,l,k,j,i
this.n()
s=b.ai(B.h)
r=this.b
if(r==null)q=A.ey(a)
else{p=this.c
if(p<=0.000001)q=r.gm()
else{o=r.gm()
n=Math.cos(p)
m=n+a.L()*(1-n)
l=Math.sqrt(Math.max(0,1-m*m))
k=a.L()*2*3.141592653589793
p=Math.cos(k)
j=Math.sin(k)
q=A.n3(B.f,o).aF(new A.a(l*p,m,l*j)).gm()}}i=b.ba(q).gm()
if(!s.gK(0)||!i.gK(0))A.l(A.f("EmitterSpawnSample must be finite",null))
return new A.bY(s,i)},
$ibE:1}
A.hM.prototype={
D(){return"BoxEmissionMode."+this.b}}
A.cq.prototype={
n(){var s=this.a
if(!s.gK(0)||s.a<0||s.b<0||s.c<0)throw A.b(A.f("BoxShape.halfExtents must be finite and >= 0",null))},
aX(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
f.n()
switch(f.b.a){case 0:s=f.a
r=new A.a((a.L()*2-1)*s.a,(a.L()*2-1)*s.b,(a.L()*2-1)*s.c)
q=A.ey(a)
break
case 1:p=a.aO(6)
o=a.L()*2-1
n=a.L()*2-1
s=f.a
m=s.a
l=s.b
s=s.c
switch(p){case 0:r=new A.a(m,o*l,n*s)
k=B.k
break
case 1:r=new A.a(-m,o*l,n*s)
k=B.k.ap(0)
break
case 2:r=new A.a(o*m,l,n*s)
k=B.f
break
case 3:r=new A.a(o*m,-l,n*s)
k=B.f.ap(0)
break
case 4:r=new A.a(o*m,n*l,s)
k=B.r
break
default:r=new A.a(o*m,n*l,-s)
k=B.r.ap(0)}q=A.ey(a)
break
case 2:j=a.aO(3)
i=a.cj()?1:-1
h=a.cj()?1:-1
g=a.L()*2-1
s=f.a
m=s.a
l=s.b
s=s.c
switch(j){case 0:r=new A.a(g*m,i*l,h*s)
break
case 1:r=new A.a(i*m,g*l,h*s)
break
default:r=new A.a(i*m,h*l,g*s)}q=A.ey(a)
break
default:r=null
q=null}return new A.bY(b.ai(r),b.ba(q).gm())},
$ibE:1}
A.jy.prototype={
D(){return"SphereEmissionMode."+this.b}}
A.jx.prototype={
D(){return"SphereDirectionMode."+this.b}}
A.fK.prototype={
n(){if(!isFinite(0.1))throw A.b(A.f("SphereShape.radius must be finite and > 0",null))
if(!isFinite(0))throw A.b(A.f("SphereShape.innerRadius must be in [0, radius]",null))},
aX(a,b){var s,r,q
this.n()
s=A.ey(a)
r=Math.pow(0+a.L()*0.0010000000000000002,0.3333333333333333)
q=s.k(0,r)
switch(0){case 0:break}return new A.bY(b.ai(q),b.ba(s).gm())},
$ibE:1}
A.hW.prototype={
D(){return"ConeEmissionMode."+this.b}}
A.dh.prototype={
n(){var s=this.a
if(!isFinite(s)||s<0)throw A.b(A.f("ConeShape.radius must be finite and >= 0",null))
s=this.b
if(!isFinite(s)||s<0||s>=1.5707963267948966)throw A.b(A.f("ConeShape.angleRadians must be in [0, pi/2)",null))
s=this.c
if(!isFinite(s)||s<=0)throw A.b(A.f("ConeShape.length must be finite and > 0",null))},
aX(a,b){var s,r,q,p,o,n,m,l,k,j=this
j.n()
switch(j.d.a){case 0:s=0
break
case 1:s=j.c
break
case 2:s=a.L()*j.c
break
default:s=null}r=j.b
q=Math.tan(r)
if(typeof s!=="number")return s.k()
p=Math.sqrt(a.L())*(j.a+s*q)
o=a.L()*2*3.141592653589793
n=p*Math.cos(o)
m=p*Math.sin(o)
if(p<0.000001)l=B.f
else{k=Math.sin(r)
l=new A.a(n/p*k,Math.cos(r),m/p*k).gm()}return new A.bY(b.ai(new A.a(n,s,m)),b.ba(l).gm())},
$ibE:1,
gv(a){return this.c}}
A.eM.prototype={
D(){return"CircleEmissionMode."+this.b}}
A.de.prototype={
D(){return"CircleDirectionMode."+this.b}}
A.cs.prototype={
n(){var s,r=this.a
if(!isFinite(r)||r<=0)throw A.b(A.f("CircleShape.radius must be finite and > 0",null))
s=this.b
if(!isFinite(s)||s<0||s>r)throw A.b(A.f("CircleShape.innerRadius must be in [0, radius]",null))
r=this.c
if(!r.gK(0)||r.gO()<0.000001)throw A.b(A.f("CircleShape.normal must be finite and non-zero",null))},
aX(a,b){var s,r,q,p,o,n,m,l,k=this
k.n()
s=a.L()*2*3.141592653589793
r=k.a
if(!(k.d===B.aP)){q=k.b
q*=q
r=Math.sqrt(q+a.L()*(r*r-q))}p=k.c.gm()
o=p.S(Math.abs(p.b)>0.9?B.k:B.f).gm()
n=p.S(o).gm()
m=o.k(0,r*Math.cos(s)).u(0,n.k(0,r*Math.sin(s)))
switch(k.e.a){case 0:l=p
break
case 1:l=r>0.000001?m.gm():p
break
case 2:l=r>0.000001?m.gm().ap(0):p.ap(0)
break
case 3:l=p.S(m).gm()
break
case 4:l=A.ey(a)
break
default:l=null}return new A.bY(b.ai(m),b.ba(l).gm())},
$ibE:1}
A.cF.prototype={
D(){return"ParticleSpritePlaybackMode."+this.b}}
A.dK.prototype={
n(){var s,r,q=this,p=null,o=q.a
if(o.length===0)throw A.b(A.f("ParticleSprite name must not be empty",p))
s=q.c
if(!isFinite(s)||!isFinite(q.d)||!isFinite(q.e)||!isFinite(q.f))throw A.b(A.f("ParticleSprite UV coordinates must be finite: "+o,p))
if(!(s<0)){r=q.e
r=r>1||s>=r}else r=!0
if(r)throw A.b(A.f("ParticleSprite horizontal UV range invalid: ["+A.m(s)+", "+A.m(q.e)+"] for "+o,p))
s=q.d
if(!(s<0)){r=q.f
r=r>1||s>=r}else r=!0
if(r)throw A.b(A.f("ParticleSprite vertical UV range invalid: ["+A.m(s)+", "+A.m(q.f)+"] for "+o,p))
o=q.as
if(!isFinite(o)||o<=0)throw A.b(A.f("ParticleSprite aspectRatio must be finite and > 0",p))
if(!isFinite(0.5))throw A.b(A.f("ParticleSprite anchor must be finite",p))
if(!isFinite(q.ax))throw A.b(A.f("ParticleSprite weight must be finite and >= 0",p))}}
A.fL.prototype={
n(){var s,r,q,p,o=null
if(this.a.length===0)throw A.b(A.f("SpriteAnimation name must not be empty",o))
s=this.b
r=s.length
if(r===0)throw A.b(A.f("SpriteAnimation must have at least one frame",o))
q=this.c
if(!isFinite(q)||q<=0)throw A.b(A.f("SpriteAnimation frameRate must be finite and > 0",o))
for(p=0;p<r;++p)if(s[p]<0)throw A.b(A.f("SpriteAnimation frameIndex must be >= 0",o))}}
A.iN.prototype={
eM(){var s,r,q,p,o,n,m,l=this.d
l.V(0)
s=this.e
s.V(0)
for(r=this.b,q=r.length,p=0;p<q;++p){o=r[p]
n=o.b
l.E(0,o.a,n)
for(m=o.ay,m=m.gJ(m);m.p();)J.d6(s.b8(m.gq(),new A.iO()),n)}},
n(){var s,r,q,p,o,n,m,l,k,j=null
if(this.a.a<0)throw A.b(A.f("ParticleSpriteSheet texture handle must be valid",j))
s=this.b
r=s.length
if(r===0)throw A.b(A.f("ParticleSpriteSheet must contain at least one sprite",j))
for(q=0;q<r;++q){p=s[q]
o=p.b
if(o!==q)throw A.b(A.f("Sprite index "+o+" does not match slot "+q,j))
p.n()}for(s=this.c.gcp(),s=s.gJ(s);s.p();){o=s.gq()
o.n()
for(n=o.b,m=n.length,l=0;l<m;++l){k=n[l]
if(k>=r)throw A.b(A.f("Animation "+o.a+" references out-of-range index "+k,j))}}},
fb(a,b){var s,r,q,p,o,n,m,l,k,j,i=this.f
B.b.V(i)
for(s=this.b,r=s.length,q=a.b.a,p=a.r,o=b.a+"_s",n=this.a,m=0;m<r;++m){l=s[m]
k=b.fu(n,o+m+"_"+l.a,l.x,l.y,l.r,l.w)
if(a.x)A.l(A.n("resource library is disposed"))
k.n()
j=q.aK(k,null)
p.i(0,j)
B.b.i(i,j)}},
e1(a){var s,r,q,p,o,n,m,l,k=this.b,j=k.length
if(j===1)return 0
s=this.r
if(s==null||s.length!==j){s=A.c1(j,0,!1,t.i)
for(r=0,q=0;q<j;++q){r+=k[q].ax
B.b.E(s,q,r)}this.r=s}p=B.b.gaE(s)
if(p<=0)return a.aO(j)
o=a.L()*p
n=j-1
for(k=s.length,m=0;m<n;){l=B.d.d1(m+n,1)
if(!(l<k))return A.c(s,l)
if(s[l]<o)m=l+1
else n=l}return m}}
A.iO.prototype={
$0(){return A.d([],t.t)},
$S:64}
A.h4.prototype={
D(){return"_BloomBlurAxis."+this.b}}
A.da.prototype={
gN(){return this.f},
a2(a,b){B.b.i(a.a,new A.Q(this.f,B.K,A.d([new A.q(this.x,B.j),new A.q(this.y,B.m)],t.C),!1))},
a1(a){var s=this,r=s.a.a3(new A.ae(s.e,s.b,s.c,B.B,B.b6,B.b3)),q=A.aV(s.d),p=t.n,o=s.r===B.bF?new Float32Array(A.t(A.d([1/s.Q,0],p))):new Float32Array(A.t(A.d([0,1/s.as],p)))
p=s.y
return A.d([new A.h5(new A.a9(s.f,A.d([new A.q(s.x,B.j),new A.q(p,B.m)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iK:1}
A.h5.prototype={
Z(a){var s,r,q,p,o=this
if(a.d.f.b<=0)return
s=a.b
r=s.a
A.at(r,a.a_(o.r).b)
A.ab(r,o.a.X())
A.b4(r,B.M,1,0,0,0)
A.ax(r,o.b.b)
q=t.j
p=o.d
if(o.e)A.pE(r,0,q.a(p.$0()))
else A.U(r,0,q.a(p.$0()))
A.h(r,"uSource",B.z)
A.h(r,"uTexelStep",new A.i(B.U,o.f))
A.af(r,o.c)
s.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.eH.prototype={
gN(){return"bloomComposite"},
a2(a,b){B.b.i(a.a,new A.Q("bloomComposite",B.K,A.d([new A.q(this.f,B.j),new A.q(this.r,B.j),new A.q(this.w,B.m)],t.C),!1))},
a1(a){var s=this,r="bloomComposite",q=s.a.a3(new A.ae(r,s.b,s.c,B.B,B.dR,B.dF)),p=A.aV(s.d),o=s.w,n=A.d([new A.q(s.f,B.j),new A.q(s.r,B.j),new A.q(o,B.m)],t.C)
return A.d([new A.h6(new A.a9(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iK:1}
A.h6.prototype={
Z(a){var s,r,q=this,p=a.d.f.b
if(p<=0)return
s=a.b
r=s.a
A.at(r,a.aT(q.f).b)
A.ng(r,1)
A.ab(r,B.aS)
A.ax(r,q.b.b)
A.U(r,0,t.j.a(q.d.$0()))
A.h(r,"uBloom",B.z)
A.h(r,"uBloomStrength",new A.i(B.c,p))
A.af(r,q.c)
s.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.eT.prototype={
gN(){return"depthPrepass"},
a2(a,b){B.b.i(a.a,new A.Q("depthPrepass",B.cq,A.d([new A.q(this.w,B.m)],t.C),!1))},
a1(a){var s=this,r="depthPrepass",q=s.a.a3(new A.ae(r,s.b,s.c,B.b5,B.b4,B.dp))
return A.d([new A.h8(new A.a9(r,A.d([new A.q(s.w,B.m)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iK:1}
A.h8.prototype={
Z(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=u.k,b=a2.b,a=a2.d,a0=a.f,a1=b.a
A.at(a1,a2.a_("sceneDepth").b)
A.ab(a1,d.a.X())
A.b4(a1,B.aj,1,0,0,0)
A.ax(a1,d.b.b)
A.h(a1,"uVertexSnapGrid",new A.i(B.c,a0.ax))
A.h(a1,"uAlbedo",B.z)
for(s=a.a,r=s.length,a=a.c.c.a,q=d.c,p=a0.at,o=v.G,n=b.b,m=a1.a,l=0;l<s.length;s.length===r||(0,A.A)(s),++l){k=s[l]
j=k.a
i=j.gt()
A.h(a1,"uViewProjection",new A.i(B.x,new Float32Array(A.t(a))))
A.h(a1,"uModel",new A.i(B.x,new Float32Array(A.t(i.c.ae().a))))
A.lx(b,k,!1)
d.eC(b,j.gt().b,p)
h=q.$1(j.gt().a)
i=h.a
if(a1.b!==B.l)A.l(A.n(c))
m.bindVertexArray(A.k(i.a))
i=h.b
g=h.c
f=k.b.length
if(i){i=h.d
if(a1.b!==B.l)A.l(A.n(c))
e=A.e(o.WebGL2RenderingContext.TRIANGLES)
m.drawElementsInstanced.apply(m,[e,g,i?A.e(o.WebGL2RenderingContext.UNSIGNED_INT):A.e(o.WebGL2RenderingContext.UNSIGNED_SHORT),0,f])
n.aJ(g,f)}else{if(a1.b!==B.l)A.l(A.n(c))
m.drawArraysInstanced(A.e(o.WebGL2RenderingContext.TRIANGLES),0,g,f)
n.aJ(g,f)}}},
eC(a,b,c){var s,r=this.d.$1(b),q=a.a
A.U(q,0,t.j.a(this.e.$1(r.b)))
A.h(q,"uAlphaCutoff",new A.i(B.c,r.fx===B.ag?r.fy:0))
A.h(q,"uAffineWarpStrength",new A.i(B.c,0))
s=this.a.X()
A.ab(q,s)},
$iE:1,
gt(){return this.a}}
A.h9.prototype={
D(){return"_DofBlurAxis."+this.b}}
A.dl.prototype={
gN(){return this.f},
a2(a,b){B.b.i(a.a,new A.Q(this.f,B.K,A.d([new A.q(this.w,B.j),new A.q(this.x,B.m)],t.C),!1))},
a1(a){var s=this,r=s.a.a3(new A.ae(s.e,s.b,s.c,B.B,B.b6,B.b3)),q=A.aV(s.d),p=t.n,o=s.r===B.bG?new Float32Array(A.t(A.d([1/s.z,0],p))):new Float32Array(A.t(A.d([0,1/s.Q],p)))
p=s.x
return A.d([new A.ha(new A.a9(s.f,A.d([new A.q(s.w,B.j),new A.q(p,B.m)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iK:1}
A.ha.prototype={
Z(a){var s,r,q=this
if(a.d.f.d<=0)return
s=a.b
r=s.a
A.at(r,a.a_(q.f).b)
A.ab(r,q.a.X())
A.b4(r,B.M,1,0,0,0)
A.ax(r,q.b.b)
A.U(r,0,t.j.a(q.d.$0()))
A.h(r,"uSource",B.z)
A.h(r,"uTexelStep",new A.i(B.U,q.e))
A.af(r,q.c)
s.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.eV.prototype={
gN(){return"dofComposite"},
a2(a,b){var s=this
B.b.i(a.a,new A.Q("dofComposite",B.K,A.d([new A.q(s.z,B.j),new A.q(s.Q,B.j),new A.q(s.as,B.j),new A.q(s.at,B.m)],t.C),!1))},
a1(a){var s=this,r="dofComposite",q=s.a.a3(new A.ae(r,s.b,s.c,B.B,B.dP,B.dk)),p=A.aV(s.d)
return A.d([new A.hb(new A.a9(r,A.d([new A.q(s.z,B.j),new A.q(s.Q,B.j),new A.q(s.as,B.j),new A.q(s.at,B.m)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iK:1}
A.hb.prototype={
Z(a){var s,r=this,q=a.a_("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.at(n,q.b)
A.ab(n,r.a.X())
A.ax(n,r.b.b)
s=t.j
A.U(n,0,s.a(r.d.$0()))
A.h(n,"uSharp",B.z)
A.U(n,1,s.a(r.e.$0()))
A.h(n,"uBlurred",B.V)
A.U(n,2,s.a(r.f.$0()))
A.h(n,"uSceneDepth",B.bv)
A.h(n,"uNear",new A.i(B.c,o.f))
A.h(n,"uFar",new A.i(B.c,o.r))
A.h(n,"uFocusDistance",new A.i(B.c,r.w))
A.h(n,"uFocusRange",new A.i(B.c,r.x))
A.h(n,"uStrength",new A.i(B.c,a.d.f.d))
A.af(n,r.c)
p.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.f5.prototype={
gN(){return"grade"},
a2(a,b){B.b.i(a.a,new A.Q("grade",B.K,A.d([new A.q(this.r,B.j),new A.q(this.w,B.m)],t.C),!1))},
a1(a){var s=this,r=s.a.a3(new A.ae("grade",s.b,s.c,B.B,B.dN,B.dG)),q=A.aV(s.d),p=s.r,o=s.w
return A.d([new A.hf(new A.a9("grade",A.d([new A.q(p,B.j),new A.q(o,B.m)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iK:1}
A.hf.prototype={
Z(a){var s=this,r=a.a_(s.f.a),q=a.b,p=q.a
A.at(p,a.a_(s.r.a).b)
A.ab(p,s.a.X())
A.ax(p,s.b.b)
A.U(p,0,r.b)
A.h(p,"uScene",B.z)
A.U(p,1,t.j.a(s.d.$0()))
A.h(p,"uLut",B.V)
A.h(p,"uLutSize",new A.i(B.c,s.e))
A.h(p,"uStrength",new A.i(B.c,a.d.f.as))
A.af(p,s.c)
q.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.dC.prototype={
gN(){return"msaaResolve"},
a2(a,b){B.b.i(a.a,new A.Q("msaaResolve",B.cr,A.d([new A.q(this.b,B.j),new A.q(this.c,B.m)],t.C),!0))},
a1(a){var s=this.b,r=this.c
return A.d([new A.hi(new A.a9("msaaResolve",A.d([new A.q(s,B.j),new A.q(r,B.m)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iK:1}
A.hi.prototype={
Z(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.aT(this.c),j=a.aT(this.d),i=this.b
if(i.b!==B.l)A.l(A.n(u.k))
s=t.V
r=s.a(k.b.a)
q=s.a(j.b.a)
s=r.y
if(s<=1)A.l(A.f("WebGl2Device.resolveTarget: source must be multisampled (samples > 1), got "+s,null))
s=q.y
if(s>1)A.l(A.f("WebGl2Device.resolveTarget: destination must be single-sample, got samples="+s,null))
s=r.w
p=q.w
if(s!==p||r.x!==q.x)A.l(A.f("WebGl2Device.resolveTarget: source ("+s+"x"+r.x+") and destination ("+p+"x"+q.x+") must match",null))
o=r.r!=null||r.f!=null
n=q.r!=null||q.f!=null
i=i.a
m=v.G
i.bindFramebuffer(A.e(m.WebGL2RenderingContext.READ_FRAMEBUFFER),r.a)
i.bindFramebuffer(A.e(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),q.a)
if(r.c!=null||r.b!=null){if(o){i.readBuffer(A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT0))
i.drawBuffers(A.d([A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(m.WebGL2RenderingContext.NONE)],t.n))}A.an(i,l,[0,0,s,r.x,0,0,p,q.x,A.e(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.e(m.WebGL2RenderingContext.LINEAR)],t.H)}if(o&&n){i.readBuffer(A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT1))
i.drawBuffers(A.d([A.e(m.WebGL2RenderingContext.NONE),A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
A.an(i,l,[0,0,s,r.x,0,0,p,q.x,A.e(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.e(m.WebGL2RenderingContext.LINEAR)],t.H)}if(r.d!=null||r.e!=null)A.an(i,l,[0,0,s,r.x,0,0,p,q.x,A.e(m.WebGL2RenderingContext.DEPTH_BUFFER_BIT),A.e(m.WebGL2RenderingContext.NEAREST)],t.H)
if(n)i.drawBuffers(A.d([A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
i.bindFramebuffer(A.e(m.WebGL2RenderingContext.READ_FRAMEBUFFER),null)
i.bindFramebuffer(A.e(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),null)},
$iE:1,
gt(){return this.a}}
A.cp.prototype={}
A.eJ.prototype={
a_(a){var s=this.a.B(0,a)
if(s==null)throw A.b(A.n('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
aT(a){var s=a.a,r=this.a.B(0,s+"#"+a.f)
if(r!=null)return r
return this.a_(s)},
$ipj:1}
A.lR.prototype={}
A.dM.prototype={
gN(){return"present"},
a2(a,b){B.b.i(a.a,new A.Q("present",B.cs,A.d([new A.q(this.f,B.j)],t.C),!1))},
a1(a){var s=this,r=s.a.a3(new A.ae("present",s.b,s.c,B.B,B.dQ,B.dA)),q=A.aV(s.d),p=s.f
return A.d([new A.hm(new A.a9("present",A.d([new A.q(p,B.j)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iK:1}
A.hm.prototype={
Z(a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=null,a1=a4.aT(a.d),a2=a4.b,a3=a2.a
A.at(a3,a0)
A.ab(a3,a.a.X())
A.ax(a3,a.b.b)
A.af(a3,a.c)
A.U(a3,0,a1.b)
s=a4.c
r=s!=null
if(r)A.U(a3,1,s)
q=a4.d
p=q.f
o=q.d
n=q.c
A.h(a3,"uExposure",new A.i(B.c,p.a))
A.h(a3,"uVignette",new A.i(B.c,p.e))
A.h(a3,"uGrain",new A.i(B.c,p.f))
A.h(a3,"uOutputEncoding",new A.i(B.c,a.e===B.ak?1:0))
A.h(a3,"uToneMap",new A.i(B.c,A.oO(p.fr)))
m=o.a
l=o.k4
q=l==null
k=q?a0:l.c
if(k==null)k=o.fx
j=q?a0:l.d.a
if(j==null)j=m.a*0.72+k.a*0.28
i=q?a0:l.d.b
if(i==null)i=m.b*0.72+k.b*0.28
h=q?a0:l.d.c
if(h==null)h=m.c*0.72+k.c*0.28
g=q?a0:l.e.a
if(g==null)g=m.a*0.9
f=q?a0:l.e.b
if(f==null)f=m.b*0.9
e=q?a0:l.e.c
if(e==null)e=m.c*0.9
d=t.n
A.h(a3,"uClearColor",new A.i(B.n,new Float32Array(A.t(A.d([m.a,m.b,m.c],d)))))
A.h(a3,"uSkyHorizon",new A.i(B.n,new Float32Array(A.t(A.d([k.a,k.b,k.c],d)))))
A.h(a3,"uSkyZenith",new A.i(B.n,new Float32Array(A.t(A.d([j,i,h],d)))))
A.h(a3,"uSkyGround",new A.i(B.n,new Float32Array(A.t(A.d([g,f,e],d)))))
A.h(a3,"uSkyEnabled",new A.i(B.c,q?0:1))
j=q?a0:l.f
A.h(a3,"uSkyHorizonGlow",new A.i(B.c,j==null?0:j))
j=q?a0:l.r
A.h(a3,"uSkyStarDensity",new A.i(B.c,j==null?0:j))
A.h(a3,"uSkyTexture",B.V)
A.h(a3,"uSkyTextureEnabled",new A.i(B.c,!q&&r?1:0))
r=q?a0:l.w
A.h(a3,"uSkyRotation",new A.i(B.c,r==null?0:r))
r=q?a0:l.x
A.h(a3,"uSkyExposure",new A.i(B.c,r==null?1:r))
A.h(a3,"uSkyTextureSrgb",new A.i(B.c,(!q||a0)===!0?1:0))
A.h(a3,"uInverseProjection",new A.i(B.x,new Float32Array(A.t(n.gdF().a))))
c=n.y
if(c===$){b=n.a.cg()
n.y!==$&&A.mp()
n.y=b
c=b}A.h(a3,"uInverseView",new A.i(B.x,new Float32Array(A.t(c.a))))
r=n.d
A.h(a3,"uCameraPosition",new A.i(B.n,new Float32Array(A.t(A.d([r.a,r.b,r.c],d)))))
r=q?a0:l.z
A.h(a3,"uCloudCoverage",new A.i(B.c,r==null?0:r))
r=q?a0:l.Q
A.h(a3,"uCloudDensity",new A.i(B.c,r==null?0:r))
r=q?a0:l.as
A.h(a3,"uCloudBaseHeight",new A.i(B.c,r==null?650:r))
r=q?a0:l.at
A.h(a3,"uCloudThickness",new A.i(B.c,r==null?350:r))
r=q?a0:l.ax
A.h(a3,"uCloudScale",new A.i(B.c,r==null?0:r))
r=q?a0:l.ay
if(r==null)r=0
j=q?a0:l.ch
A.h(a3,"uCloudWind",new A.i(B.U,new Float32Array(A.t(A.d([r,j==null?0:j],d)))))
r=q?a0:l.CW
A.h(a3,"uCloudPhase",new A.i(B.c,r==null?0:r))
r=q?a0:l.cx
A.h(a3,"uCloudDetail",new A.i(B.c,r==null?0:r))
r=q?a0:l.cy
A.h(a3,"uCloudSilverLining",new A.i(B.c,r==null?0:r))
r=q?a0:l.db
A.h(a3,"uCloudSampleCount",new A.i(B.c,B.d.l(r==null?4:r,4,24)))
r=o.go
q=r==null
j=q?a0:r.a.a
if(j==null)j=0
i=q?a0:r.a.b
if(i==null)i=1
h=q?a0:r.a.c
A.h(a3,"uCloudLightDirection",new A.i(B.n,new Float32Array(A.t(A.d([j,i,h==null?0:h],d)))))
j=q?a0:r.b.a
if(j==null)j=1
i=q?a0:r.b.b
if(i==null)i=1
h=q?a0:r.b.c
A.h(a3,"uCloudLightColor",new A.i(B.n,new Float32Array(A.t(A.d([j,i,h==null?1:h],d)))))
r=q?a0:r.c
A.h(a3,"uCloudLightIntensity",new A.i(B.c,r==null?0:r))
a2.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.fB.prototype={
gN(){return"ps1Quantize"},
a2(a,b){B.b.i(a.a,new A.Q("ps1Quantize",B.K,A.d([new A.q(this.e,B.j),new A.q(this.f,B.m)],t.C),!1))},
a1(a){var s=this,r="ps1Quantize",q=s.a.a3(new A.ae(r,s.b,s.c,B.B,B.dS,B.dg)),p=A.aV(s.d),o=s.e,n=s.f
return A.d([new A.hn(new A.a9(r,A.d([new A.q(o,B.j),new A.q(n,B.m)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iK:1}
A.hn.prototype={
Z(a){var s=this,r=a.a_(s.d.a),q=a.b,p=a.d.f,o=q.a
A.at(o,a.a_(s.e.a).b)
A.ab(o,s.a.X())
A.ax(o,s.b.b)
A.U(o,0,r.b)
A.h(o,"uScene",B.z)
A.h(o,"uQuantizationBits",new A.i(B.c,p.ay))
A.h(o,"uDitherStrength",new A.i(B.c,p.Q))
A.af(o,s.c)
q.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.c6.prototype={}
A.fI.prototype={
gN(){return"shadow"},
a2(a,b){B.b.i(a.a,new A.Q("shadowCaster",B.cp,A.d([new A.q(this.z,B.m)],t.C),!1))},
a1(a){var s=this,r="shadowCaster",q=s.a.a3(new A.ae(r,s.b,s.c,B.b5,B.b4,B.dE))
return A.d([new A.hq(new A.a9(r,A.d([new A.q(s.z,B.m)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iK:1}
A.hq.prototype={
Z(a){var s,r,q,p,o=this,n=a.a_("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.at(s,n.b)
A.ab(s,o.a.X())
A.b4(s,B.aj,1,0,0,0)
return}r=A.n6(l)
o.x.$1(r)
s=m.a
A.at(s,n.b)
A.ab(s,o.a.X())
A.b4(s,B.aj,1,0,0,0)
A.ax(s,o.b.b)
A.h(s,"uAlbedo",B.z)
for(s=a.d.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.A)(s),++p)o.eE(m,s[p],l,r)},
cZ(a,b){var s,r=this.d.$1(b),q=a.a
A.U(q,0,t.j.a(this.e.$1(r.b)))
A.h(q,"uAlphaCutoff",new A.i(B.c,r.fx===B.ag?r.fy:0))
s=this.a.X()
A.ab(q,s)},
eE(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){if(!b.gt().r)return
s=a.a
A.h(s,"uUseInstances",B.aG)
n.cW(a,b.gt().c,d)
n.cZ(a,b.gt().b)
r=b.gt()
q=n.c.$1(r.a)
A.af(s,q.a)
s=q.b
r=q.c
if(s)a.c6(r,q.d,0)
else a.a4(r,0)}else if(b instanceof A.bj){p=b.a
if(!p.gt().r)return
if(n.f_(b,c)===B.eZ)return
n.cW(a,p.gt().c,d)
A.lx(a,b,!1)
n.cZ(a,p.gt().b)
s=p.gt()
q=n.c.$1(s.a)
A.af(a.a,q.a)
s=q.b
r=q.c
o=b.b.length
if(s)a.c7(r,q.d,o,0)
else a.c5(r,0,o)}else throw A.b(A.f("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.eB(b).j(0),null))},
f_(a,b){return B.eY},
cW(a,b,c){var s=a.a
A.h(s,"uModel",new A.i(B.x,new Float32Array(A.t(b.ae().a))))
A.h(s,"uLightViewProjection",new A.i(B.x,new Float32Array(A.t(c.a.a))))},
$iE:1,
gt(){return this.a}}
A.kI.prototype={
$1(a){return this.a.a=a},
$S:65}
A.kJ.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:66}
A.fJ.prototype={
gN(){return"shadowedWorld"},
a2(a,b){var s=this,r=A.d([new A.q(s.db,B.j)],t.C)
if(s.ay)r.push(new A.q(s.dx,B.j))
r.push(new A.q(s.dy,B.m))
B.b.i(a.a,new A.Q("shadowedWorld",B.aX,r,!1))},
a1(a){var s=this,r="shadowedWorld",q=s.a.a3(new A.ae(r,s.b,s.c,B.dT,B.dO,B.df)),p=A.d([new A.q(s.db,B.j)],t.C)
if(s.ay)p.push(new A.q(s.dx,B.j))
p.push(new A.q(s.dy,B.m))
return A.d([new A.hr(new A.a9(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iK:1}
A.hr.prototype={
Z(b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=null,a5=b3.a_("sceneColor"),a6=b3.b,a7=b3.d,a8=a7.c,a9=a7.d,b0=a7.f,b1=a3.z.$0(),b2=a6.a
A.at(b2,a5.b)
A.ab(b2,a3.a.X())
s=a9.a
A.b4(b2,B.aQ,1,s.c,s.b,s.a)
A.ax(b2,a3.b.b)
A.h(b2,"uAlbedo",B.z)
A.h(b2,"uNormalMap",B.fv)
A.h(b2,"uOrmMap",B.fw)
A.h(b2,"uEmissiveMap",B.fx)
A.h(b2,"uLightmap",B.fy)
s=t.j
A.U(b2,1,s.a(a3.y.$0()))
A.h(b2,"uShadowMap",B.V)
r=a8.d
q=t.n
A.h(b2,"uCameraPosition",new A.i(B.n,new Float32Array(A.t(A.d([r.a,r.b,r.c],q)))))
A.h(b2,"uShadowMapTexelSize",new A.i(B.U,new Float32Array(A.t(A.d([1/a3.ch,1/a3.CW],q)))))
A.h(b2,"uShadowFilterRadius",new A.i(B.c,a9.at))
A.h(b2,"uShadowBias",new A.i(B.c,a9.db))
A.U(b2,2,s.a(a3.at.$0()))
A.h(b2,"uSsao",B.bv)
A.h(b2,"uVertexSnapGrid",new A.i(B.c,b0.ax))
A.h(b2,"uSceneColorSize",new A.i(B.U,new Float32Array(A.t(A.d([a3.ax,a3.ay],q)))))
A.h(b2,"uViewProjection",new A.i(B.x,new Float32Array(A.t(a8.c.a))))
A.h(b2,"uView",new A.i(B.x,new Float32Array(A.t(a8.a.a))))
A.h(b2,"uLightViewProjection",new A.i(B.x,new Float32Array(A.t(b1.a.a))))
s=a9.b
A.h(b2,"uFogColor",new A.i(B.n,new Float32Array(A.t(A.d([s.a,s.b,s.c],q)))))
A.h(b2,"uFogStart",new A.i(B.c,a9.c))
A.h(b2,"uFogEnd",new A.i(B.c,a9.d))
s=a9.e
A.h(b2,"uFogHeightFalloff",new A.i(B.c,s==null?0:s))
A.h(b2,"uFogDensity",new A.i(B.c,0))
p=a3.Q.$0()
s=A.d([],t.w)
o=a3.as.$0()
o=J.ad(o==null?B.ap:o)
n=p==null
while(o.p()){m=o.gq()
if(-1!==(n?a4:-1))s.push(m)}l=n?a4:B.f
if(l==null)l=B.f
k=n?a4:B.v
if(k==null)k=B.v
A.h(b2,"uLightPosition",new A.i(B.n,new Float32Array(A.t(A.d([l.a,l.b,l.c],q)))))
A.h(b2,"uLightDirection",new A.i(B.n,new Float32Array(A.t(A.d([k.a,k.b,k.c],q)))))
j=n?a4:B.a_
if(j==null)j=B.N
A.h(b2,"uLightColor",new A.i(B.n,new Float32Array(A.t(A.d([j.a,j.b,j.c],q)))))
o=n?a4:1
A.h(b2,"uLightIntensity",new A.i(B.c,o==null?0:o))
A.h(b2,"uSpotEnabled",new A.i(B.c,!n?1:0))
i=a9.go
o=i==null
h=o?a4:i.a
if(h==null)h=B.f
g=o?a4:i.b
if(g==null)g=B.N
A.h(b2,"uDirectionalDirection",new A.i(B.n,new Float32Array(A.t(A.d([h.a,h.b,h.c],q)))))
A.h(b2,"uDirectionalColor",new A.i(B.n,new Float32Array(A.t(A.d([g.a,g.b,g.c],q)))))
o=o?a4:i.c
A.h(b2,"uDirectionalIntensity",new A.i(B.c,o==null?0:o))
f=A.rj(a9.id,r)
for(e=0;e<4;++e){r=f.length
if(e<r){if(!(e<r))return A.c(f,e)
d=f[e]}else d=a4
r=d==null
c=r?a4:d.b
if(c==null)c=B.h
b=r?a4:d.c
if(b==null)b=B.N
o=""+e
A.h(b2,"uPointPosition"+o,new A.i(B.n,new Float32Array(A.t(A.d([c.a,c.b,c.c],q)))))
A.h(b2,"uPointColor"+o,new A.i(B.n,new Float32Array(A.t(A.d([b.a,b.b,b.c],q)))))
m=r?a4:d.d
if(m==null)m=0
A.h(b2,"uPointIntensity"+o,new A.i(B.c,m))
r=r?a4:d.e
if(r==null)r=1
A.h(b2,"uPointRadius"+o,new A.i(B.c,r))}for(e=0;e<3;++e){r=s.length
if(e<r){if(!(e<r))return A.c(s,e)
d=s[e]}else d=a4
r=d==null
c=r?a4:B.f
if(c==null)c=B.h
a=r?a4:B.v
if(a==null)a=B.v
b=r?a4:B.a_
if(b==null)b=B.N
o=""+e
A.h(b2,"uDirectSpotPosition"+o,new A.i(B.n,new Float32Array(A.t(A.d([c.a,c.b,c.c],q)))))
A.h(b2,"uDirectSpotDirection"+o,new A.i(B.n,new Float32Array(A.t(A.d([a.a,a.b,a.c],q)))))
A.h(b2,"uDirectSpotColor"+o,new A.i(B.n,new Float32Array(A.t(A.d([b.a,b.b,b.c],q)))))
m=r?a4:1
if(m==null)m=0
A.h(b2,"uDirectSpotIntensity"+o,new A.i(B.c,m))
m=r?a4:1
if(m==null)m=1
A.h(b2,"uDirectSpotRange"+o,new A.i(B.c,m))
m=r?a4:0.3
if(m==null)m=0.3
A.h(b2,"uDirectSpotInnerCos"+o,new A.i(B.c,Math.cos(m)))
m=r?a4:0.5
if(m==null)m=0.5
A.h(b2,"uDirectSpotOuterCos"+o,new A.i(B.c,Math.cos(m)))
r=r?0:1
A.h(b2,"uDirectSpotEnabled"+o,new A.i(B.c,r))}s=n?a4:1
A.h(b2,"uLightRange",new A.i(B.c,s==null?1:s))
s=n?a4:0.3
if(s==null)s=0.3
A.h(b2,"uLightInnerCos",new A.i(B.c,Math.cos(s)))
s=n?a4:0.5
if(s==null)s=0.5
A.h(b2,"uLightOuterCos",new A.i(B.c,Math.cos(s)))
a0=a9.fx
A.h(b2,"uAmbientColor",new A.i(B.n,new Float32Array(A.t(A.d([a0.a,a0.b,a0.c],q)))))
A.h(b2,"uAmbientIntensity",new A.i(B.c,a9.fy))
A.h(b2,"uAmbientLightScale",new A.i(B.c,a9.ax))
A.h(b2,"uDirectLightScale",new A.i(B.c,a9.ay))
s=a9.dx
A.h(b2,"uReflectionColor",new A.i(B.n,new Float32Array(A.t(A.d([s.a,s.b,s.c],q)))))
A.h(b2,"uReflectionIntensity",new A.i(B.c,a9.dy))
A.h(b2,"uReflectionConfidence",new A.i(B.c,a9.fr))
A.h(b2,"uRainWetness",new A.i(B.c,b0.w))
A.h(b2,"uSurfaceSnowCoverage",new A.i(B.c,b0.x))
A.h(b2,"uSurfaceDissolution",new A.i(B.c,b0.y))
s=a9.k3
a1=A.fQ(s,0,A.bS(4,"count",t.S),A.H(s).c).ho(0)
A.h(b2,"uThermalSourceCount",new A.i(B.c,a1.length))
for(e=0;e<4;++e){s=a1.length
if(e<s)if(!(e<s))return A.c(a1,e)
s=""+e
A.h(b2,"uThermalSourcePosition"+s,new A.i(B.n,new Float32Array(A.t(A.d([0,0,0],q)))))
A.h(b2,"uThermalSourceRadius"+s,new A.i(B.c,1))
A.h(b2,"uThermalSourceDissolution"+s,new A.i(B.c,0))}for(b2=a7.a,s=b2.length,r=b0.at,a2=0;a2<b2.length;b2.length===s||(0,A.A)(b2),++a2)a3.d_(a6,b2[a2],r,a9)
for(a7=a7.b,b2=a7.length,a2=0;a2<a7.length;a7.length===b2||(0,A.A)(a7),++a2)a3.d_(a6,a7[a2],r,a9)},
d_(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){s=a.a
A.h(s,"uUseInstances",B.aG)
n.d0(a,b.gt().c)
n.cX(a,b.gt().b,b.gt().e,b.gt().f,c,b.gt().w,d)
r=n.c.$1(b.gt().a)
A.af(s,r.a)
s=r.b
q=r.c
if(s)a.c6(q,r.d,0)
else a.a4(q,0)}else if(b instanceof A.bj){p=b.a
n.d0(a,p.gt().c)
A.lx(a,b,!0)
n.cX(a,p.gt().b,p.gt().e,p.gt().f,c,p.gt().w,d)
r=n.c.$1(p.gt().a)
A.af(a.a,r.a)
s=r.b
q=r.c
o=b.b.length
if(s)a.c7(q,r.d,o,0)
else a.c5(q,0,o)}else throw A.b(A.f("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.eB(b).j(0),null))},
cX(a,b,c,d,e,f,g){var s=this,r=s.d.$1(b),q=t.j,p=a.a
A.U(p,0,q.a(s.e.$1(r.b)))
A.U(p,3,q.a(s.f.$1(r.x)))
A.U(p,4,q.a(s.r.$1(r.Q)))
A.U(p,5,q.a(s.w.$1(r.r)))
A.U(p,6,q.a(s.x.$1(r.cx)))
A.h(p,"uAlphaCutoff",new A.i(B.c,r.fx===B.ag?r.fy:0))
A.h(p,"uOpaqueCoverage",new A.i(B.c,c===B.w?0:1))
A.h(p,"uAffineWarpStrength",new A.i(B.c,0))
q=t.n
A.h(p,"uMaterialTint",new A.i(B.n,new Float32Array(A.t(A.d([r.d,r.e,r.f],q)))))
A.h(p,"uEmissiveStrength",new A.i(B.c,r.w))
A.h(p,"uUvScaleOffset",new A.i(B.fu,new Float32Array(A.t(A.d([r.db,r.dx,r.dy,r.fr],q)))))
A.h(p,"uNormalStrength",new A.i(B.c,r.z*g.ch))
A.h(p,"uRoughness",new A.i(B.c,r.at*g.CW))
A.h(p,"uMetallic",new A.i(B.c,r.ax*g.cx))
A.h(p,"uSpecularScale",new A.i(B.c,g.cy))
A.h(p,"uClearcoatStrength",new A.i(B.c,r.ch))
A.h(p,"uClearcoatRoughness",new A.i(B.c,r.CW))
A.h(p,"uOcclusionStrength",new A.i(B.c,r.ay))
A.h(p,"uLightmapIntensity",new A.i(B.c,r.cy))
A.h(p,"uReceivesShadow",new A.i(B.c,f?1:0))
A:{q=null
if(B.w===c){switch(d.a){case 0:q=B.cb
break
case 1:q=B.cc
break}break A}if(B.S===c||B.ca===c){q=s.a.X()
break A}}A.ab(p,q)},
d0(a,b){var s=b.ae(),r=a.a
A.h(r,"uModel",new A.i(B.x,new Float32Array(A.t(s.a))))
A.h(r,"uNormalMatrix",new A.i(B.x,new Float32Array(A.t(s.ck().a))))},
$iE:1,
gt(){return this.a}}
A.fN.prototype={
gN(){return"ssaoOcclusion"},
a2(a,b){B.b.i(a.a,new A.Q("ssaoOcclusion",B.an,A.d([new A.q(this.w,B.m)],t.C),!1))},
a1(a){var s=this,r="ssaoOcclusion",q=s.a.a3(new A.ae(r,s.b,s.c,B.B,B.b7,B.dc)),p=A.aV(s.d)
return A.d([new A.ht(new A.a9(r,A.d([new A.q(s.w,B.m)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iK:1}
A.ht.prototype={
Z(a){var s,r,q,p=this,o=a.b,n=a.d.f.c,m=o.a
A.at(m,a.a_("ssaoRaw").b)
A.ab(m,p.a.X())
if(n<=0){A.b4(m,B.M,1,1,1,1)
return}A.b4(m,B.M,1,0,0,0)
s=p.e.$0()
A.ax(m,p.b.b)
A.U(m,0,t.j.a(p.d.$0()))
A.h(m,"uSceneDepth",B.z)
A.h(m,"uNear",new A.i(B.c,s.f))
A.h(m,"uFar",new A.i(B.c,s.r))
r=s.b.a
q=r.length
if(0>=q)return A.c(r,0)
A.h(m,"uProjScaleX",new A.i(B.c,r[0]))
if(5>=q)return A.c(r,5)
A.h(m,"uProjScaleY",new A.i(B.c,r[5]))
A.h(m,"uRadius",new A.i(B.c,p.f))
A.h(m,"uStrength",new A.i(B.c,n))
A.af(m,p.c)
o.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.fM.prototype={
gN(){return"ssaoBlur"},
a2(a,b){B.b.i(a.a,new A.Q("ssaoBlur",B.an,A.d([new A.q(this.y,B.j),new A.q(this.z,B.m)],t.C),!1))},
a1(a){var s=this,r="ssaoBlur",q=s.a.a3(new A.ae(r,s.b,s.c,B.B,B.dL,B.dH)),p=A.aV(s.d)
return A.d([new A.hs(new A.a9(r,A.d([new A.q(s.y,B.j),new A.q(s.z,B.m)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iK:1}
A.hs.prototype={
Z(a){var s,r,q=this,p=a.b,o=p.a
A.at(o,a.a_("ssaoBlurred").b)
A.ab(o,q.a.X())
if(a.d.f.c<=0){A.b4(o,B.M,1,1,1,1)
return}A.b4(o,B.M,1,0,0,0)
s=q.f.$0()
A.ax(o,q.b.b)
r=t.j
A.U(o,0,r.a(q.d.$0()))
A.h(o,"uSsaoRaw",B.z)
A.U(o,1,r.a(q.e.$0()))
A.h(o,"uSceneDepth",B.V)
A.h(o,"uTexelSize",new A.i(B.U,new Float32Array(A.t(A.d([1/q.r,1/q.w],t.n)))))
A.h(o,"uNear",new A.i(B.c,s.f))
A.h(o,"uFar",new A.i(B.c,s.r))
A.af(o,q.c)
p.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.fY.prototype={
gN(){return"vhs"},
a2(a,b){var s=this.w
a.b.i(0,s.a)
B.b.i(a.a,new A.Q("vhs",B.K,A.d([new A.q(this.r,B.j),new A.q(s,B.L),new A.q(s,B.m)],t.C),!1))},
a1(a){var s=this,r=s.a.a3(new A.ae("vhs",s.b,s.c,B.B,B.dM,B.dh)),q=A.aV(s.d),p=s.r,o=s.w
return A.d([new A.hy(new A.a9("vhs",A.d([new A.q(p,B.j),new A.q(o,B.L),new A.q(o,B.m)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iK:1}
A.hy.prototype={
Z(a){var s=this,r=a.a_(s.f.a),q=a.a_(s.r.a),p=a.b,o=a.d.f,n=p.a
A.at(n,q.b)
A.ab(n,s.a.X())
A.ax(n,s.b.b)
A.U(n,0,r.b)
A.h(n,"uScene",B.z)
A.U(n,1,t.j.a(s.d.$0()))
A.h(n,"uHistory",B.V)
A.h(n,"uTime",new A.i(B.c,s.e.$0()))
A.h(n,"uChromaWeight",new A.i(B.c,o.ch))
A.h(n,"uTrackingWeight",new A.i(B.c,o.CW))
A.h(n,"uNoiseWeight",new A.i(B.c,o.cx))
A.h(n,"uHeadSwitchWeight",new A.i(B.c,o.cy))
A.h(n,"uDropoutWeight",new A.i(B.c,o.db))
A.h(n,"uGhostWeight",new A.i(B.c,o.dx))
A.af(n,s.c)
p.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.fZ.prototype={
gN(){return"volumetricLight"},
a2(a,b){var s=this,r=s.w,q=t.C,p=a.a
B.b.i(p,new A.Q("volumetricLight",B.an,A.d([new A.q(s.x,B.j),new A.q(r,B.m)],q),!1))
B.b.i(p,new A.Q("volumetricComposite",B.K,A.d([new A.q(r,B.j),new A.q(s.y,B.j),new A.q(s.z,B.m)],q),!1))},
a1(a){var s,r,q,p,o,n,m=this,l="volumetricLight",k="volumetricComposite",j=m.a,i=m.b,h=j.a3(new A.ae(l,i,m.c,B.B,B.b7,B.di)),g=m.e,f=A.aV(g),e=m.Q
B.b.i(e,f)
s=m.w
r=t.C
q=A.d([new A.hA(new A.a9(l,A.d([new A.q(m.x,B.j),new A.q(s,B.m)],r),!1,!1,!1,!1),h,f,s.a,m.f,m.r)],t.u)
p=m.z
o=j.a3(new A.ae(k,i,m.d,B.B,B.dU,B.dI))
n=A.aV(g)
B.b.i(e,n)
B.b.i(q,new A.hz(new A.a9(k,A.d([new A.q(s,B.j),new A.q(m.y,B.j),new A.q(p,B.m)],r),!1,!1,!0,!1),o,n,s,p))
return q},
$iK:1}
A.hA.prototype={
Z(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this,a1=a7.a_(a0.d),a2=a7.b,a3=a0.f.$0(),a4=a7.d.d,a5=a4.go,a6=a2.a
A.at(a6,a1.b)
A.ab(a6,a0.a.X())
A.b4(a6,B.M,1,0,0,0)
A.ax(a6,a0.b.b)
A.U(a6,0,t.j.a(a0.e.$0()))
A.h(a6,"uSceneDepth",B.z)
A.h(a6,"uNear",new A.i(B.c,a3.f))
A.h(a6,"uFar",new A.i(B.c,a3.r))
A.h(a6,"uViewProjection",new A.i(B.x,new Float32Array(A.t(a3.c.a))))
s=a3.a.a
A.h(a6,"uView",new A.i(B.x,new Float32Array(A.t(s))))
A.h(a6,"uInverseProjection",new A.i(B.x,new Float32Array(A.t(a3.gdF().a))))
r=a5==null
A.h(a6,"uShaftIntensity",new A.i(B.c,r?0:a5.c*0.15))
A.h(a6,"uFogDensity",new A.i(B.c,0))
A.h(a6,"uAnisotropy",new A.i(B.c,a4.y))
q=a4.r
p=t.n
A.h(a6,"uVolumetricAlbedo",new A.i(B.n,new Float32Array(A.t(A.d([q.a,q.b,q.c],p)))))
A.h(a6,"uVolumetricHeightFalloff",new A.i(B.c,a4.w))
A.h(a6,"uVolumetricDustDensity",new A.i(B.c,a4.x))
A.h(a6,"uVolumetricJitter",new A.i(B.c,a4.z))
A.h(a6,"uVolumetricIntensity",new A.i(B.c,a4.Q))
A.h(a6,"uVolumetricSampleCount",new A.i(B.c,a4.as))
if(r)o=B.f
else{q=a5.a.gm()
n=q.a
m=s.length
if(0>=m)return A.c(s,0)
l=s[0]
k=q.b
if(4>=m)return A.c(s,4)
j=s[4]
q=q.c
if(8>=m)return A.c(s,8)
i=s[8]
h=s[1]
g=s[5]
if(9>=m)return A.c(s,9)
f=s[9]
e=s[2]
d=s[6]
if(10>=m)return A.c(s,10)
o=new A.a(n*l+k*j+q*i,n*h+k*g+q*f,n*e+k*d+q*s[10]).gm()}c=r?null:a5.b
if(c==null)c=B.N
A.h(a6,"uLightDir",new A.i(B.n,new Float32Array(A.t(A.d([o.a,o.b,o.c],p)))))
A.h(a6,"uLightColor",new A.i(B.n,new Float32Array(A.t(A.d([c.a,c.b,c.c],p)))))
b=A.rl(4,a3.d,a4.k2)
A.h(a6,"uVolumetricSourceCount",new A.i(B.c,b.length))
for(a=0;a<4;++a){s=b.length
if(a<s)if(!(a<s))return A.c(b,a)
s=""+a
A.h(a6,"uSourcePosition"+s,new A.i(B.n,new Float32Array(A.t(A.d([0,0,0],p)))))
A.h(a6,"uSourceColor"+s,new A.i(B.n,new Float32Array(A.t(A.d([0,0,0],p)))))
A.h(a6,"uSourceIntensity"+s,new A.i(B.c,0))
A.h(a6,"uSourceReferenceDistance"+s,new A.i(B.c,1))
A.h(a6,"uSourceCutoffDistance"+s,new A.i(B.c,1))}A.af(a6,a0.c)
a2.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.hz.prototype={
Z(a){var s=this,r=a.aT(s.e),q=a.aT(s.d),p=a.b,o=p.a
A.at(o,r.b)
A.ng(o,1)
A.ab(o,B.aS)
A.ax(o,s.b.b)
A.U(o,0,q.b)
A.h(o,"uVolumetric",B.z)
A.h(o,"uVolumetricStrength",B.bu)
A.af(o,s.c)
p.a4(3,0)},
$iE:1,
gt(){return this.a}}
A.dR.prototype={}
A.h1.prototype={
gN(){return"world"},
a2(a,b){B.b.i(a.a,new A.Q("worldOpaqueTransparent",B.aX,A.d([new A.q(this.e,B.m)],t.C),!1))},
a1(a){var s=this,r=s.a.a3(new A.ae("safeWorld",s.b,s.c,B.dV,B.B,B.dt)),q=s.e
return A.d([new A.hD(new A.a9("worldOpaqueTransparent",A.d([new A.q(q,B.m)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iK:1}
A.hD.prototype={
Z(a){var s,r,q,p,o,n=this,m=a.b,l=a.d,k=l.d,j=m.a
A.at(j,a.a_(n.d).b)
A.ab(j,n.a.X())
s=k.a
A.b4(j,B.aQ,1,s.c,s.b,s.a)
A.ax(j,n.b.b)
A.h(j,"uViewProjection",new A.i(B.x,new Float32Array(A.t(l.c.c.a))))
r=k.go
q=r==null?null:r.a
if(q==null)q=B.f
s=t.n
A.h(j,"uLightDir",new A.i(B.n,new Float32Array(A.t(A.d([q.a,q.b,q.c],s)))))
p=k.fx
A.h(j,"uAmbientColor",new A.i(B.n,new Float32Array(A.t(A.d([p.a,p.b,p.c],s)))))
A.h(j,"uAmbientIntensity",new A.i(B.c,k.fy))
A.h(j,"uAmbientLightScale",new A.i(B.c,k.ax))
A.h(j,"uDirectLightScale",new A.i(B.c,k.ay))
for(j=l.a,s=j.length,o=0;o<j.length;j.length===s||(0,A.A)(j),++o)n.cM(m,j[o])
for(l=l.b,j=l.length,o=0;o<l.length;l.length===j||(0,A.A)(l),++o)n.cM(m,l[o])},
cM(a,b){var s,r,q,p,o,n=this
if(b instanceof A.bj){s=b.a
n.cY(a,s.gt().c)
A.lx(a,b,!0)
r=n.c.$1(s.gt().a)
A.af(a.a,r.a)
q=r.b
p=r.c
o=b.b.length
if(q)a.c7(p,r.d,o,0)
else a.c5(p,0,o)}else if(t.Y.b(b)){q=a.a
A.h(q,"uUseInstances",B.aG)
n.cY(a,b.gt().c)
r=n.c.$1(b.gt().a)
A.af(q,r.a)
q=r.b
p=r.c
if(q)a.c6(p,r.d,0)
else a.a4(p,0)}else throw A.b(A.f("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.eB(b).j(0),null))},
cY(a,b){var s=b.ae(),r=a.a
A.h(r,"uModel",new A.i(B.x,new Float32Array(A.t(s.a))))
A.h(r,"uNormalMatrix",new A.i(B.x,new Float32Array(A.t(s.ck().a))))},
$iE:1,
gt(){return this.a}}
A.fe.prototype={
D(){return"LoopMode."+this.b}}
A.b9.prototype={}
A.c0.prototype={
eI(a){var s,r,q,p,o,n,m,l=this.b
if(a<=B.b.gau(l).a)return new A.ce(B.b.gau(l),B.b.gau(l),0)
if(a>=B.b.gaE(l).a)return new A.ce(B.b.gaE(l),B.b.gaE(l),1)
s=l.length
r=s-1
q=0
for(;;){if(!(q<r&&l[q+1].a<=a))break;++q}if(!(q<s))return A.c(l,q)
p=l[q]
r=q+1
if(!(r<s))return A.c(l,r)
o=l[r]
r=p.a
n=o.a-r
m=n>0.000001?(a-r)/n:0
return new A.ce(p,o,A.mE(B.a.l(m,0,1)))}}
A.is.prototype={
$2(a,b){var s=this.a.h("b9<0>")
return B.d.R(s.a(a).a,s.a(b).a)},
$S(){return this.a.h("j(b9<0>,b9<0>)")}}
A.jJ.prototype={
D(){return"Vector3Property."+this.b}}
A.fX.prototype={
fH(a){var s=this.eI(a),r=s.a.b,q=r.u(0,s.b.b.M(0,r).k(0,s.c))
switch(0){case 0:r=this.a
r.b=r.b.di(q)
r.a7()
break}}}
A.hH.prototype={
aj(a){var s,r,q,p,o,n,m,l=this
switch(l.c.a){case 0:s=B.a.l(a,0,l.b)
break
case 1:r=l.b
s=B.a.F(a,r)
if(s<0)s+=r
break
case 2:r=l.b
q=B.a.a6(a/r)
p=B.a.F(a,r)
o=p<0?p+r:p
s=(q&1)===0?o:r-o
break
default:s=a}for(r=l.d,n=r.length,m=0;m<n;++m)r[m].fH(s)}}
A.cQ.prototype={
ac(a){var s,r=this,q=r.b+a*r.c
r.b=q
s=r.a
s.aj(q)
if(s.c===B.dJ&&r.b>=s.b)return!1
return!0}}
A.hI.prototype={
ac(a){this.a.h6(0,new A.hJ(a))}}
A.hJ.prototype={
$2(a,b){A.M(a)
return!t.dp.a(b).ac(this.a)},
$S:67}
A.f7.prototype={
a7(){this.fy=null
this.eb()},
gaU(){var s,r,q,p,o,n,m,l,k,j=this,i=j.x
if(i==null){s=j.y
i=s==null?null:s.d}if(i==null||j.dx.length===0)return null
s=j.fy
if(s==null){r=j.gaV()
s=j.dx
if(0>=s.length)return A.c(s,0)
q=r.k(0,s[0]).ae()
p=i.gaC()
o=A.H(p)
n=A.cl(new A.O(p,o.h("a(1)").a(q.gaG()),o.h("O<1,a>")))
for(m=1;m<s.length;++m){q=r.k(0,s[m]).ae()
p=i.gaC()
o=A.H(p)
l=A.cl(new A.O(p,o.h("a(1)").a(q.gaG()),o.h("O<1,a>")))
o=n.a
q=l.a
p=n.b
k=l.b
n=new A.a4(new A.a(Math.min(o.a,q.a),Math.min(o.b,q.b),Math.min(o.c,q.c)),new A.a(Math.max(p.a,k.a),Math.max(p.b,k.b),Math.max(p.c,k.c)))}j.fy=n
s=n}return s},
be(b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=this
a9.dD(b0)
s=a9.z
r=a9.Q
if(s==null||r==null||a9.dx.length===0)a9.cB(b0)
else{q=a9.gaV()
p=a9.fx
if(a9.fr||p!==q||a9.e||a9.d){o=a9.cy
for(p=a9.dy,n=a9.dx,m=b0.b,l=b0.c;p.length>n.length;){k=p.pop()
m.aR(k)
l.aa(0,k)}for(k=b0.a,j=k.$ti,i=j.c,h=k.b,g=a9.ax,f=a9.ay,j=j.y[1],e=m.$ti,d=e.c,e=e.y[1],c=m.b,b=0;b<n.length;++b){a=q.k(0,n[b])
a0=new A.bq(s,r,a,a9.gdH()?a9.as:0,g,f,!0,!0,o)
if(b<p.length){a1=p[b]
a.n()
i.a(s)
k.aq(s)
a2=s.a
if(!(a2>=0&&a2<h.length))return A.c(h,a2)
a3=h[a2].c
a2=(a3==null?j.a(a3):a3).d
a4=a.ae()
a2=a2.gaC()
a5=A.H(a2)
a6=A.cl(new A.O(a2,a5.h("a(1)").a(a4.gaG()),a5.h("O<1,a>")))
d.a(a1)
e.a(a0)
m.aq(a1)
a5=a1.a
if(!(a5>=0&&a5<c.length))return A.c(c,a5)
c[a5].sbs(a0)
l.E(0,a1,new A.bO(a1,a0,a6))}else{a.n()
i.a(s)
k.aq(s)
a1=s.a
if(!(a1>=0&&a1<h.length))return A.c(h,a1)
a3=h[a1].c
a1=(a3==null?j.a(a3):a3).d
a2=a.ae()
a1=a1.gaC()
a4=A.H(a1)
a6=A.cl(new A.O(a1,a4.h("a(1)").a(a2.gaG()),a4.h("O<1,a>")))
a7=m.dm(a0)
l.E(0,a7,new A.bO(a7,a0,a6))
B.b.i(p,a7)}}a9.fx=q
a9.e=a9.fr=!1}}for(p=A.aw(a9.r,t.iU),n=p.length,a8=0;a8<n;++a8)p[a8].be(b0)},
cB(a){var s,r,q,p,o,n
for(s=this.dy,r=s.length,q=a.b,p=a.c,o=0;o<s.length;s.length===r||(0,A.A)(s),++o){n=s[o]
q.aR(n)
p.aa(0,n)}B.b.V(s)},
bz(a){var s,r,q,p=this
p.cB(a)
p.fx=null
p.fr=!0
for(s=A.aw(p.r,t.iU),r=s.length,q=0;q<r;++q)s[q].bz(a)}}
A.bc.prototype={
cv(a,b,c,d,e,f,g,h,i,j,k,l,m){var s
if(this.x==null){s=this.y
this.x=s==null?null:s.d}},
sh0(a){if(a.a8(0,this.Q))return
this.Q=a
this.e=!0},
shu(a){if(a===this.as)return
this.as=a
this.e=!0},
shv(a){if(a===this.at)return
this.at=a
this.cR()},
gdH(){for(var s=this;s!=null;s=s.f)if(!s.at)return!1
return!0},
cR(){var s,r,q
this.e=!0
for(s=this.r,r=s.length,q=0;q<s.length;s.length===r||(0,A.A)(s),++q)s[q].cR()},
bA(a,b){var s=A.al(a,b),r=this.b
this.b=r.c1(r.b.k(0,s))
this.a7()},
gaV(){var s,r=this
if(r.d){s=r.f
r.c=s!=null?s.gaV().k(0,r.b):r.b
r.d=!1}return r.c},
a7(){var s,r,q,p=this
if(p.d)return
p.e=p.d=!0
for(s=p.r,r=s.length,q=0;q<s.length;s.length===r||(0,A.A)(s),++q)s[q].a7()},
bZ(a){var s=a.f
if(s===this)return
if(s!=null)s.h5(a)
a.f=this
a.a7()
B.b.i(this.r,a)},
aA(a,b,c,d,e,f){var s=A.lV(B.A,null,!0,B.S,null,b,c,d,e,!0,0,f,-1)
this.bZ(s)
return s},
bp(a,b,c,d,e){return this.aA(0,b,c,d,e,B.F)},
f3(a,b,c){return this.aA(0,null,null,null,b,c)},
gaU(){var s,r,q=this.x
if(q==null)q=null
else{s=this.gaV().ae()
q=q.gaC()
r=A.H(q)
r=A.cl(new A.O(q,r.h("a(1)").a(s.gaG()),r.h("O<1,a>")))
q=r}return q},
h3(a,b,c){var s={}
s.a=null
new A.jq(s,c,a,!1).$1(this)
return s.a},
h5(a){var s,r
if(B.b.aa(this.r,a)){a.f=null
a.a7()
for(s=this;r=s.f,r!=null;s=r);B.b.i(s.w,a)}},
dD(a){var s,r,q=this.w,p=q.length
if(p===0)return
for(s=0;s<q.length;q.length===p||(0,A.A)(q),++s){r=q[s]
if(r.f==null)r.bz(a)}B.b.V(q)},
dq(a,b){var s=this,r=s.gaV(),q=s.gdH()?s.as:0
return new A.bq(a,b,r,q,s.ax,s.ay,!0,!0,s.cy)},
be(a){var s,r,q,p,o,n,m=this
m.dD(a)
s=m.z
r=m.Q
if(s!=null&&r!=null){q=m.db
if(q==null){m.db=a.f4(m.dq(s,r))
m.e=!1}else if(m.e||m.d){a.hs(q,m.dq(s,r))
m.e=!1}}else{p=m.db
if(p!=null){a.dN(p)
m.db=null
m.e=!0}}for(p=m.r,o=p.length,n=0;n<p.length;p.length===o||(0,A.A)(p),++n)p[n].be(a)},
bz(a){var s,r,q,p=this,o=p.db
if(o!=null){a.dN(o)
p.db=null
p.e=!0}for(s=p.r,r=s.length,q=0;q<s.length;s.length===r||(0,A.A)(s),++q)s[q].bz(a)}}
A.jq.prototype={
$1(a){var s,r,q,p,o,n,m=this
if(!a.at)return
s=a.gaU()
if(s!=null){r=m.c
q=r.fW(s)
if(q!=null){p=m.a.a
p=p==null||q<p.d}else p=!1
if(p){o=r.a.u(0,r.b.k(0,q))
o.M(0,s.a.u(0,s.b).k(0,0.5)).gm()
m.a.a=new A.jf(a,o,q,null)}}for(r=a.r,p=r.length,n=0;n<r.length;r.length===p||(0,A.A)(r),++n)m.$1(r[n])},
$S:68}
A.ii.prototype={
D(){return"GpuBufferUsage."+this.b}}
A.f0.prototype={
D(){return"GpuBufferKind."+this.b}}
A.f3.prototype={
D(){return"GpuTextureFilter."+this.b}}
A.f4.prototype={
D(){return"GpuTextureWrap."+this.b}}
A.f_.prototype={}
A.f2.prototype={}
A.cx.prototype={
D(){return"GpuTargetAttachment."+this.b}}
A.dr.prototype={}
A.f1.prototype={
D(){return"GpuDeviceStatus."+this.b}}
A.cL.prototype={
D(){return"ShaderCompileStage."+this.b}}
A.dW.prototype={
j(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.bu.prototype={
D(){return"UniformType."+this.b}}
A.i.prototype={}
A.df.prototype={
D(){return"ClearMask."+this.b}}
A.eU.prototype={
a4(a,b){var s=this.a
if(s.b!==B.l)A.l(A.n(u.k))
s.a.drawArrays(A.e(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.aJ(a,1)},
c5(a,b,c){var s=this.a
if(s.b!==B.l)A.l(A.n(u.k))
s.a.drawArraysInstanced(A.e(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.aJ(a,c)},
c6(a,b,c){var s,r,q=this.a
if(q.b!==B.l)A.l(A.n(u.k))
s=v.G
r=A.e(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.e(s.WebGL2RenderingContext.UNSIGNED_INT):A.e(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.aJ(a,1)},
c7(a,b,c,d){var s,r,q=this.a
if(q.b!==B.l)A.l(A.n(u.k))
s=v.G
r=A.e(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.e(s.WebGL2RenderingContext.UNSIGNED_INT):A.e(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.an(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.aJ(a,c)},
$ior:1}
A.cv.prototype={}
A.dL.prototype={
ag(a){var s,r=!1
if(a.p3!=null)if(a.ca==null)r=a.y==null
if(r){s=this.dx.B(0,a.b)
if(s!=null)a.fd(this.b.gP(),s)}B.b.i(this.ay,a)},
I(a){var s=this.b.gP().h4(a)
this.dx.E(0,s,a)
return s},
dk(a,b,c,d,e,f,g,h,i){var s,r,q,p,o,n,m,l,k=null,j=this.b.gP()
if(j.x)A.l(A.n("resource library is disposed"))
s=j.c
if(h>0)r=d<=0
else r=!0
if(r)A.l(A.f("TextureStore.declare dimensions/layers must be > 0",k))
if(!isFinite(a)||a<1||a>16)A.l(A.f("TextureStore.declare anisotropy must be in [1, 16]: "+a,k))
if(f===B.aW&&!c)A.l(A.f("TextureStore.declare linearMipmapLinear requires hasMips: true",k))
r=s.b
q=t.nh
p=r.aK(new A.be(new A.f2(h,d,1,c,f,e,i,a),A.c1(1,k,!1,q),!1),b)
o=r.aL(p)
n=A.ai(o.b,q)
B.b.E(n,0,g)
q=o.a
r.co(p,new A.be(q,n,o.c))
r=s.c
m=p.a
l=r.B(0,m)
if(l==null){l=A.lX(s.a,q)
r.E(0,m,l)}A.lY(s.a,l,0,g)
j.w.i(0,p)
return p},
fA(a,b,c,d,e){return this.dk(1,a,!1,b,B.Z,B.Z,c,d,e)},
c4(a,b,c,d,e){var s=this.dk(16,b,!0,c,B.Z,B.aW,a,d,e),r=this.b.gP()
if(r.x)A.l(A.n("resource library is disposed"))
r.c.fM(s)
return s},
an(a,b,c,d){return this.c4(a,b,c,d,B.co)},
e2(a,b){var s,r,q,p,o,n,m,l,k,j=A.k(this.a.getBoundingClientRect()),i=a-A.aF(j.left),h=b-A.aF(j.top)
if(i<0||i>A.aF(j.width)||h<0||h>A.aF(j.height))return null
s=this.x
r=s.c/s.d
q=this.y
s=q!=null?q.b9(r):A.eK(r,B.by,200,B.bC,1,0.1,B.f)
p=B.a.cn(A.aF(j.width))
o=B.a.cn(A.aF(j.height))
if(p<=0||o<=0)A.l(A.f("Viewport dimensions must be > 0",null))
n=i/p*2-1
m=1-h/o*2
p=s.gfY()
l=p.ai(new A.a(n,m,-1))
k=p.ai(new A.a(n,m,1)).M(0,l).gm()
p=s.b.a
if(15>=p.length)return A.c(p,15)
return new A.je(p[15]!==0?l:s.d,k)},
cs(c1,c2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0=this
new A.jw(c1,0.65,0.35,c2,2,2.5).n()
s=B.a.F(B.a.F(c1,24)+24,24)
r=A.n7(s,12)*3.141592653589793/12
q=Math.sin(0.65)
p=Math.cos(0.65)
o=q*Math.sin(0.35)
n=p*Math.cos(0.35)
m=o+n*Math.cos(r)
l=Math.asin(B.a.l(m,-1,1))
k=Math.cos(l)
j=Math.atan2(Math.sin(r),Math.cos(r)*q-Math.tan(0.35)*p)
i=new A.a(Math.sin(j)*k,Math.sin(l),Math.cos(j)*k).gm()
if(Math.abs(n)<1e-12)h=m>0?-2:2
else h=(Math.sin(-0.014538592669112763)-o)/n
g=h>-1&&h<1
f=g?Math.acos(h)*12/3.141592653589793:0
e=B.a.F(B.a.F(12-f,24)+24,24)
d=B.a.F(B.a.F(12+f,24)+24,24)
o=!g
c=o&&m>0
A.ps(l,s,c,o&&!c,12)
b=2+c2*3.5+0
a=A.pr(Math.max(0,1.5707963267948966-l))
n=B.a.l(Math.exp(-(0.0046416*a*b)),0,1)
a0=B.a.l(Math.exp(-(0.010846399999999999*a*b)),0,1)
a1=B.a.l(Math.exp(-(0.02648*a*b)),0,1)
a2=B.a.l(Math.exp(-(c2*2.2)),0,1)
a3=A.n8(-0.3141592653589793,0.10471975511965977,l)
a4=A.n8(-0.014538592669112763,0.03490658503988659,l)
a5=Math.max(0,Math.sin(l)+a4*0.018)
a6=n*0.2126+a0*0.7152+a1*0.0722
a7=2.5*Math.pow(a5,0.35)*a6*a2
a8=B.a.l(a5*a6,0,1)
a9=0.42*a8
b0=1-c2
b1=0.055+a9*(0.55+0.45*b0)+a3*(0.028+0.018*b0)
b2=0.0015*(2.12+c2*0.8)
b0=0.008+c2*0.006
b3=0.011+c2*0.007
b4=0.022+c2*0.01
b0+=(0.035+n*0.18+c2*0.1-b0)*a3
b3+=(0.045+a0*0.2+c2*0.12-b3)*a3
b4+=(0.07+a1*0.24+c2*0.16+a3*0.018-b4)*a3
b5=new A.v(b0,b3,b4)
b6=new A.v(n,a0,a1)
a9=new A.v(0.14+0.38*a8,0.16+a9,0.22+0.52*a8)
if(!isFinite(s)||!isFinite(e)||!isFinite(d)||!isFinite(l)||!isFinite(a3)||!isFinite(a4)||!isFinite(j)||!isFinite(a7)||!isFinite(b1)||!isFinite(b2)||!isFinite(0.06)||!i.gK(0)||!new A.a(n,a0,a1).gK(0)||!b6.gK(0)||!a9.gK(0)||!b5.gK(0))A.l(A.n("solar lighting state is not finite"))
if(i.gO()<0.999||i.gO()>1.001||a7<0||b1<0||b2<0||a2<0||a2>1||a3<0||a3>1||a4<0||a4>1)A.l(A.n("solar lighting state is out of bounds"))
new A.ct(i,b6,a7).n()
b7=c0.f.k4
o=B.a.l(b0*0.4+0.02,0,1)
n=b3*0.5
a0=B.a.l(n+0.04,0,1)
a1=B.a.l(b4*0.8+0.08,0,1)
b8=B.a.l(o*0.5+b0*0.5,0,1)
n=B.a.l(a0*0.5+n,0,1)
b9=B.a.l(a1*0.5+b4*0.5,0,1)
b9=c0.f.fq(a9,b1,new A.ct(i,b6,a7),b5,new A.v(b8,n,b9))
c0.f=b9
if(b7!=null)c0.f=b9.dh(b7.ft(new A.v(B.a.l(b0*0.2,0,1),B.a.l(b3*0.2,0,1),B.a.l(b4*0.2,0,1)),b5,B.a.l(a4*0.25,0,1),B.a.l((1-a3)*0.008,0,0.1),new A.v(o,a0,a1)))},
c8(a,b,c,d){this.f=this.f.fs(a,null,b,c,d)},
fD(a,b,c){return this.c8(a,b,null,c)},
eN(){var s,r,q,p=this,o=v.G
A.k(o.window).addEventListener("resize",A.B(new A.iR(p)))
s=o.ResizeObserver
r=new A.iS(p)
if(typeof r=="function")A.l(A.f("Attempting to rewrap a JS function.",null))
q=function(a,b){return function(c,d){return a(b,c,d,arguments.length)}}(A.qc,r)
q[$.lC()]=r
r=p.a
A.k(new s(q)).observe(r)
r.addEventListener("webglcontextlost",A.B(new A.iT(p)))
r.addEventListener("webglcontextrestored",A.B(new A.iV(p)))
r.addEventListener("contextmenu",A.B(new A.iW()))
r.addEventListener("mousedown",A.B(new A.iX(p)))
A.k(o.window).addEventListener("mousemove",A.B(new A.iY(p)))
A.k(o.window).addEventListener("mouseup",A.B(new A.iZ(p)))
r.addEventListener("mouseup",A.B(new A.j_(p)))
r.addEventListener("wheel",A.B(new A.j0(p)))
A.k(o.window).addEventListener("keydown",A.B(new A.j1(p)))
A.k(o.window).addEventListener("keyup",A.B(new A.iU(p)))},
da(){var s,r,q,p,o=this.y
if(o instanceof A.bZ){s=this.as
r=s.A(0,"keyw")||s.A(0,"arrowup")?1:0
if(s.A(0,"keys")||s.A(0,"arrowdown"))--r
q=s.A(0,"keya")||s.A(0,"arrowleft")?-1:0
if(s.A(0,"keyd")||s.A(0,"arrowright"))++q
p=s.A(0,"space")||s.A(0,"keye")?1:0
o.z=new A.a(q,s.A(0,"shiftleft")||s.A(0,"keyq")?p-1:p,r)}},
cV(){var s,r,q,p,o,n,m,l=this,k=A.aF(A.k(v.G.window).devicePixelRatio)
if(!l.rx&&k===l.RG)return
l.rx=!1
q=l.a
p=A.e(q.clientWidth)>0?A.e(q.clientWidth):A.e(q.width)
o=A.e(q.clientHeight)>0?A.e(q.clientHeight):A.e(q.height)
n=l.x
if(p===n.a&&o===n.b&&k===l.RG)return
l.RG=k
n=A.na(o,p,k,l.R8,!0)
l.x=n
q.width=n.c
q.height=l.x.d
try{q=l.x
l.b.bh()
q.n()
l.d.cf("surface resized")}catch(m){s=A.bh(m)
r=A.bB(m)
l.bX(s,r)}},
e5(){var s=this
if(s.fy)return
s.fy=!0
s.go=0
A.e(A.k(v.G.window).requestAnimationFrame(A.B(s.gd6())))},
eZ(a){var s,r,q,p,o,n,m,l,k=this
A.aF(a)
if(!k.fy)return
s=a/1000
o=k.go
if(o>0){n=s
if(typeof n!=="number")return n.M()
m=n-o}else m=0.016666666666666666
r=m
k.go=s
try{k.eK(s,r)}catch(l){q=A.bh(l)
p=A.bB(l)
if(k.ry){try{k.b.bo()}catch(l){}k.ry=!1}k.bX(q,p)}if(k.fy)A.e(A.k(v.G.window).requestAnimationFrame(A.B(k.gd6())))},
bX(a,b){t.l.a(b)
if(this.db.i(0,A.m(a)))A.k(v.G.console).error("Pixeldart frame error: "+A.m(a)+"\n"+b.j(0))},
eK(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this
c.cV()
if(c.id||c.b.e===B.a9)return
c.at.ac(b)
s=c.c
c.e.be(s)
r=c.y
q=r!=null
if(q)r.ac(b)
p=c.z
p.ac(b)
o=c.x
n=o.c/o.d
m=p.f7(q?r.b9(n):A.eK(n,B.by,200,B.bC,1,0.1,B.f))
p=c.d
o=c.f
l=c.r
k=p.a
j=new A.ia(m,o,l,-1,k,a)
p.a=k+1
q=c.b
i=q.f8(s,j)
c.ry=!0
for(s=c.ax,h=0;h<s.length;++h)s[h].bF(i,j)
for(s=c.ay,h=0;h<s.length;++h){s[h].ac(b)
if(!(h<s.length))return A.c(s,h)
s[h].bF(i,j)}q.gP()
s=c.ch
if(s!=null)s.$1(new A.cv(a,b))
g=q.fE()
c.ry=!1
if(c.w){s=c.p2+=b
q=++c.p3
if(s>=0.5){c.p4=q/s
c.p3=c.p2=0
f=c.p1
if(f==null){s=v.G
f=A.k(A.k(s.document).createElement("div"))
A.k(f.style).position="absolute"
A.k(f.style).left="12px"
A.k(f.style).top="12px"
A.k(f.style).padding="8px 12px"
A.k(f.style).backgroundColor="rgba(10, 12, 16, 0.85)"
A.k(f.style).color="#00ffaa"
A.k(f.style).fontFamily="monospace"
A.k(f.style).fontSize="12px"
A.k(f.style).lineHeight="1.4"
A.k(f.style).borderRadius="4px"
A.k(f.style).pointerEvents="none"
A.k(f.style).zIndex="9999"
e=A.u(c.a.parentElement)
if(e==null)e=A.u(A.k(s.document).body)
if(e!=null)A.k(e.appendChild(f))
c.p1=f}d=B.a.ab(b*1000,1)
f.innerText="FPS: "+B.a.ab(c.p4,0)+" ("+d+" ms)\nDraws: "+g.c+" | Tris: "+g.d+"\nInstances: "+g.f+" | VRAM: "+B.a.ab(g.w/1024,0)+" KB"}}},
sh1(a){this.ch=t.i1.a(a)}}
A.j3.prototype={
$1(a){var s=this.a,r=a.a===B.as?2:1,q=a===B.bf?0:1
return new A.dQ(a,s.c,s.d,r,q)},
$S:70}
A.iR.prototype={
$1(a){var s
A.k(a)
s=this.a
s.rx=!0
s.cV()},
$S:0}
A.iS.prototype={
$2(a,b){t.dM.a(a)
A.k(b)
return this.a.rx=!0},
$S:72}
A.iT.prototype={
$1(a){var s
A.k(a)
s=this.a
s.id=!0
s.d.cf("gl context lost")},
$S:0}
A.iV.prototype={
$1(a){var s
A.k(a)
s=this.a
s.id=!1
s.d.cf("gl context restored")},
$S:0}
A.iW.prototype={
$1(a){A.k(a).preventDefault()},
$S:0}
A.iX.prototype={
$1(a){var s,r,q
A.k(a)
s=this.a
s.k2=!0
s.k3=A.e(a.button)
r=A.e(a.clientX)
s.k4=r
q=A.e(a.clientY)
s.ok=q
s.fr=r
s.fx=q},
$S:0}
A.iY.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
A.k(a)
s=this.a
if(s.k2)r=s.y!=null
else r=!1
if(r){q=A.e(a.clientX)
p=A.e(a.clientY)
o=q-s.k4
n=p-s.ok
s.k4=q
s.ok=p
m=s.y
if(m instanceof A.bK)if(s.k3===0&&!A.cf(a.shiftKey)){m.ax+=o*0.006
m.ay=B.a.l(m.ay+n*0.006,-1.5079644737231006,1.5079644737231006)}else{s=m.b
l=m.gdO()
k=m.gdO().S(m.a.M(0,m.gc9()).gm()).gm()
j=l.k(0,-o*0.003*s).u(0,k.k(0,n*0.003*s))
m.CW=m.CW.u(0,j)}else if(m instanceof A.bZ){m.b+=o*0.003
m.c=B.a.l(m.c-n*0.003,-1.5393804002589986,1.5393804002589986)}else if(m instanceof A.cM){m.z+=o*0.006
m.Q=B.a.l(m.Q+-n*0.006,-1.0995574287564276,1.2566370614359172)}}},
$S:0}
A.iZ.prototype={
$1(a){A.k(a)
this.a.k2=!1},
$S:0}
A.j_.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i
A.k(a)
s=null
if(s!=null)n=A.e(a.button)!==0
else n=!0
if(n)return
r=A.e(a.clientX)
q=A.e(a.clientY)
n=r
m=this.a
l=m.fr
if(typeof n!=="number")return n.M()
k=q
j=m.fx
if(typeof k!=="number")return k.M()
if(Math.abs(n-l)+Math.abs(k-j)<6)try{s.$2(r,q)}catch(i){p=A.bh(i)
o=A.bB(i)
m.bX(p,o)}},
$S:0}
A.j0.prototype={
$1(a){var s,r,q
A.k(a)
s=this.a
r=s.y
if(r!=null){a.preventDefault()
q=s.y
if(q instanceof A.bK){s=A.aF(a.deltaY)
q.ch=B.a.l(q.ch+s*0.003,0.5,100)}else if(q instanceof A.bZ){s=A.aF(a.deltaY)
q.a=q.a.u(0,q.gaN().k(0,q.d*(-s*0.002)))}else if(q instanceof A.cM){s=A.aF(a.deltaY)
q.d=B.a.l(q.d+s*0.003,1.5,40)}}},
$S:0}
A.j1.prototype={
$1(a){var s=this.a
s.as.i(0,A.M(A.k(a).code).toLowerCase())
s.da()},
$S:0}
A.iU.prototype={
$1(a){var s=this.a
s.as.aa(0,A.M(A.k(a).code).toLowerCase())
s.da()},
$S:0}
A.fy.prototype={
dJ(a){var s=this.b.B(0,a)
if(s==null)throw A.b(A.n("resource is not in candidate: "+a))
return s}}
A.ij.prototype={
gq(){var s=this.c
if(s==null)throw A.b(A.n("GPU resource adapter is not initialized"))
return s},
ad(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.eA(s.b)
r.b.ad()
r.c=null
r.e=!0},
cJ(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.a5(a0,a1),a3=A.d([],t.J)
try{k=a4.a
j=k.$ti
i=j.h("w(1)")
j=j.h("ac<1>")
s=new A.ac(k,i.a(new A.ik()),j)
for(h=s,g=J.ad(h.a),h=new A.R(g,h.b,h.$ti.h("R<1>")),f=a.a;h.p();){r=g.gq()
q=A.nm(f,a.cK(r,a5))
J.d6(a3,q)
J.eA(a2,r,q)}e=A.ai(new A.ac(k,i.a(new A.il()),j),j.h("p.E"))
B.b.e4(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.A)(k),++d){o=k[d]
n=A.rb(J.oe(o,11))
if(i){h=J.lD(a2,"sceneColor")
h.toString
J.eA(a2,o,h)}else{h=n
if(typeof h!=="number")return h.dT()
if(h>=2){h=J.lD(a2,"sceneColor#1")
h.toString
J.eA(a2,o,h)}else{m=A.nm(f,a.cK(o,a5))
J.d6(a3,m)
J.eA(a2,o,m)}}}a0=A.lI(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.H(a0).h("dU<1>"),a0=new A.dU(a0,k),a0=new A.ah(a0,a0.gv(0),k.h("ah<P.E>")),j=a.a,k=k.h("P.E"),i=t.V;a0.p();){h=a0.d
l=h==null?k.a(h):h
h=a1.a(l)
if(h.b===j.Q){b=i.a(h.a)
A.lZ(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}}throw c}},
cK(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.dr(512,512,1,B.am,!0)
if(a==="sceneDepth")return new A.dr(n,m,1,B.am,!0)
s=B.E.aw(a,"ssao")||B.E.aw(a,"bloomBlur")||B.E.aw(a,"dofBlur")||B.E.aw(a,"volumetricLight")
r=s?B.d.a0(n+1,2):n
q=s?B.d.a0(m+1,2):m
p=a==="sceneColor"
o=p||B.E.aw(a,"sceneColor#")
p=p?b.d:1
return new A.dr(r,q,p,o?B.aV:B.cl,o)},
eA(a){var s,r,q,p,o,n=A.lO(t.f7.a(a).gcp(),t.j)
for(n=A.ka(n,n.r,A.y(n).c),s=this.a,r=n.$ti.c,q=t.V;n.p();){p=n.d
if(p==null)p=r.a(p)
if(p.b===s.Q){o=q.a(p.a)
A.lZ(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}}
A.ik.prototype={
$1(a){return!B.E.aw(A.M(a),"sceneColor#")},
$S:9}
A.il.prototype={
$1(a){return B.E.aw(A.M(a),"sceneColor#")},
$S:9}
A.ei.prototype={
D(){return"_SlotState."+this.b}}
A.bP.prototype={
sbs(a){this.c=this.$ti.h("1?").a(a)}}
A.bb.prototype={
aK(a,b){var s,r,q,p,o=this,n=o.$ti
n.y[1].a(a)
s=o.c
r=s.length
if(r!==0){if(0>=r)return A.c(s,-1)
q=s.pop()}else{s=o.b
B.b.i(s,new A.bP(B.ae,n.h("bP<2>")))
q=s.length-1}n=o.b
if(!(q>=0&&q<n.length))return A.c(n,q)
p=n[q];++p.a
p.b=B.hQ
p.sbs(a)
p.f=b;++o.d
return o.a.$3(q,p.a,b)},
dm(a){return this.aK(a,null)},
aq(a){var s,r,q
this.$ti.c.a(a)
s=a.a
if(s<0||s>=this.b.length)throw A.b(A.bG(B.aZ,a))
r=this.b
if(!(s>=0&&s<r.length))return A.c(r,s)
q=r[s]
if(q.a!==a.b)throw A.b(A.bG(B.b_,a))
s=q.b
if(s===B.af||s===B.ae)throw A.b(A.bG(B.a7,a))},
aL(a){var s,r,q=this.$ti
q.c.a(a)
this.aq(a)
s=this.b
r=a.a
if(!(r>=0&&r<s.length))return A.c(s,r)
r=s[r].c
return r==null?q.y[1].a(r):r},
co(a,b){var s,r=this.$ti
r.c.a(a)
r.y[1].a(b)
this.aq(a)
r=this.b
s=a.a
if(!(s>=0&&s<r.length))return A.c(r,s)
r[s].sbs(b)},
aR(a){var s,r,q,p=this
p.$ti.c.a(a)
s=a.a
if(s<0||s>=p.b.length)throw A.b(A.bG(B.aZ,a))
r=p.b
if(!(s>=0&&s<r.length))return A.c(r,s)
q=r[s]
if(q.a!==a.b)throw A.b(A.bG(B.b_,a))
r=q.b
if(r===B.af||r===B.ae)throw A.b(A.bG(B.cA,a))
q.b=B.af
q.sbs(null)
B.b.i(p.c,s);++p.e},
b6(){return new A.bQ(this.fZ(),this.$ti.h("bQ<+(1,2)>"))},
fZ(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k,j,i
return function $async$b6(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b,n=s.a,m=s.$ti.y[1],l=0
case 2:if(!(l<o.length)){r=4
break}k=o[l]
j=k.b
if(j===B.af||j===B.ae){r=3
break}j=n.$3(l,k.a,k.f)
i=k.c
r=5
return a.b=new A.F(j,i==null?m.a(i):i),1
case 5:case 3:++l
r=2
break
case 4:return 0
case 1:return a.c=p.at(-1),3}}}}}
A.hL.prototype={
D(){return"BlendEquation."+this.b}}
A.cn.prototype={
D(){return"BlendFactor."+this.b}}
A.hX.prototype={
D(){return"CullFace."+this.b}}
A.i0.prototype={
D(){return"DepthFunc."+this.b}}
A.cu.prototype={}
A.ar.prototype={
D(){return"StateField."+this.b}}
A.jR.prototype={
fC(a){var s,r=this.a
if(r==null)return A.oI(B.dB,t.dB)
s=A.ag(t.dB)
if(r.a!==a.a)s.i(0,B.av)
if(r.b!==a.b)s.i(0,B.aw)
if(r.c!==a.c)s.i(0,B.ax)
if(r.d!==a.d)s.i(0,B.ay)
if(r.e!==a.e||r.f!==a.f)s.i(0,B.az)
if(r.r!==a.r)s.i(0,B.aA)
if(r.w!==a.w)s.i(0,B.aB)
if(r.x!==a.x)s.i(0,B.aC)
return s}}
A.cX.prototype={}
A.by.prototype={$ib_:1}
A.es.prototype={}
A.er.prototype={}
A.hC.prototype={}
A.h_.prototype={
bE(a){this.e=a
this.x=a==null?null:this.z.b8(a,A.rr())},
ee(a){var s=this,r=A.k(s.a.canvas)
s.c=A.B(new A.jO(s))
s.d=A.B(new A.jP(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
az(a){var s
if(!this.r.A(0,a))return!1
s=A.u(this.a.getExtension(a))!=null
if(s)this.y.i(0,a)
return s},
b1(a){var s=A.bT(this.a.getParameter(a))
return typeof s=="number"?B.a.cn(s):0},
cS(a){var s=A.bT(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
dn(a){var s=this,r=a.a
s.z.aa(0,r)
if(r===s.e)s.bE(null)
if(a.b===s.Q)s.a.deleteProgram(A.k(r))},
$iow:1}
A.jO.prototype={
$1(a){A.k(a).preventDefault()
this.a.b=B.Y},
$S:18}
A.jP.prototype={
$1(a){var s,r,q,p=this.a
p.b=B.l;++p.Q
p.z.V(0)
p.bE(null)
for(s=p.y,s=A.ka(s,s.r,A.y(s).c),p=p.a,r=s.$ti.c;s.p();){q=s.d
if(q==null)q=r.a(q)
A.u(p.getExtension(q))}},
$S:18}
A.kj.prototype={
f9(){var s,r=this
if(r.b!==B.l)A.l(A.n(u.k))
s=r.w?A.u(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.by(new A.hC(s),r.Q)},
fB(a){if(a.b!==this.Q)return
this.a.deleteQuery(this.d7(a).a)},
d7(a){var s=a.a
if(!(s instanceof A.hC))throw A.b(A.Z(a,"query","is not a GPU timer query"))
return s}}
A.hB.prototype={}
A.jN.prototype={}
A.jQ.prototype={
fz(a){var s=A.u(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.jN(A.pz(s))}}
A.kV.prototype={
$1(a){var s,r,q
A.k(a)
s=A.M(this.a.value)
A:{if("aces"===s){r=B.fg
break A}if("reinhard"===s){r=B.aE
break A}if("off"===s){r=B.bs
break A}r=B.aF
break A}q=this.b
q.r=q.r.fn(r)},
$S:0}
A.kW.prototype={
$1(a){var s,r,q
A.k(a)
s=A.M(this.a.value)
A:{if("clean"===s){r=A.fx(0,0,0,0,0,1,0,8,0,1,!1,0,0,0,0,B.aF,0,0,0,0,0,0,0,0)
break A}if("ps1"===s){r=A.fx(0.35,0,0,0,0.65,1,0,5,0,1,!1,0,0,0,0,B.bs,0,0,0,0,0,0,0,0)
break A}if("vhs"===s){r=A.fx(0,0,0,0,0,1,0,8,0,1,!1,0,0,0,0,B.aE,0,0.45,0,0,0,0.25,0.4,0.3)
break A}r=A.mX()
break A}this.b.r=r
q=this.c
if(t.m.b(q)){switch(r.fr.a){case 2:r="aces"
break
case 1:r="reinhard"
break
case 0:r="off"
break
case 3:r="agx"
break
default:r=null}q.value=r}},
$S:0}
A.kX.prototype={
$1(a){var s
A.k(a)
s=this.a.y
s=s instanceof A.bK?s:null
if(s!=null)s.as=A.cf(this.b.checked)},
$S:0}
A.l7.prototype={
$1(a){var s,r,q,p=this
A.k(a)
s=p.a
if(A.M(s.value)==="fly"){p.b.y=new A.bZ(B.fH,6,B.h,B.h)
s=p.c
if(t.m.b(s))A.k(s.style).display="none"}else if(A.M(s.value)==="follow"){s=p.d
r=s.length
if(r!==0){if(0>=r)return A.c(s,0)
s=s[0]
p.b.y=new A.cM(s,B.h,B.bA,3.8,1.2,7,B.fI,B.h.u(0,B.bA))}s=p.c
if(t.m.b(s))A.k(s.style).display="none"}else{r=p.b
if(A.M(s.value)==="tour"){r.y=A.oh(0.04,1.2,22,!0,t.pg.a(A.d([B.c_,B.c4,B.c3,B.bZ,B.c0,B.c1,B.c2],t.mj)))
s=p.c
if(t.m.b(s))A.k(s.style).display="none"}else{q=r.y=A.mU(8.5,B.R)
q.d=0.45
s=p.e
r=t.m
if(r.b(s)){q.as=A.cf(s.checked)
q.at=0.18}s=p.c
if(r.b(s))A.k(s.style).display="flex"}}},
$S:0}
A.lh.prototype={
$1(a){A.k(a)
this.a.z.f5(0.65)},
$S:0}
A.lo.prototype={
$1(a){var s,r,q,p,o,n
for(s=this.a,r=t.m,q=0;q<A.e(s.length);++q){p=A.u(s.item(q))
if(r.b(p))if(A.bz(p.getAttribute("data-topic"))===a)A.k(p.classList).add("active")
else A.k(p.classList).remove("active")}for(s=this.b,o="panel-"+a,q=0;q<A.e(s.length);++q){n=A.u(s.item(q))
if(r.b(n))if(A.M(n.id)===o)A.k(n.classList).add("active")
else A.k(n.classList).remove("active")}},
$S:19}
A.li.prototype={
$1(a){A.k(a)
return this.a.$1(this.b)},
$S:20}
A.lp.prototype={
$0(){var s,r,q=this.a,p=B.a.a6(q.a),o=B.a.C((q.a-p)*60),n=B.E.dK(B.d.j(p),2,"0")+":"+B.E.dK(B.d.j(o),2,"0"),m=this.b,l=t.m
if(l.b(m))m.innerText=n
m=this.c
if(l.b(m)){q=q.a
if(q>=5&&q<8){s="\ud83c\udf05"
r="Sunrise"}else if(q>=8&&q<17.5){s="\u2600\ufe0f"
r="Day"}else if(q>=17.5&&q<20.5){s="\ud83c\udf07"
r="Sunset"}else{s="\ud83c\udf19"
r="Night"}m.innerText=s+" "+n+" "+r}},
$S:1}
A.kU.prototype={
$0(){this.b.cs(this.a.a,0.25)
this.c.$0()},
$S:1}
A.lj.prototype={
$1(a){var s
A.k(a)
s=A.dN(A.M(this.b.value))
if(s==null)s=14
this.a.a=s
this.c.$0()},
$S:0}
A.lk.prototype={
$1(a){A.k(a)
return this.a.d=!0},
$S:6}
A.ll.prototype={
$1(a){A.k(a)
return this.a.d=!1},
$S:6}
A.lm.prototype={
$1(a){A.k(a)
return this.a.d=!0},
$S:6}
A.ln.prototype={
$1(a){A.k(a)
return this.a.d=!1},
$S:6}
A.kY.prototype={
$1(a){var s,r
A.k(a)
s=this.a
r=!s.b
s.b=r
s=r?"\u23f8 Pause Time":"\u25b6 Play Time"
this.b.innerText=s},
$S:0}
A.kZ.prototype={
$1(a){var s
A.k(a)
s=A.dN(A.M(this.b.value))
if(s==null)s=1
this.a.c=s},
$S:0}
A.l_.prototype={
$1(a){var s,r,q
A.k(a)
s=A.dN(A.M(this.a.value))
if(s==null)s=0
r=this.b
if(t.m.b(r)){q=s<=0?"Off":B.a.ab(s,2)
r.innerText=q}r=this.c
r.r=r.r.dg(s)},
$S:0}
A.l0.prototype={
$1(a){var s,r
A.k(a)
s=A.dN(A.M(this.a.value))
if(s==null)s=0.3
r=this.b
if(t.m.b(r))r.innerText=B.a.ab(s,2)
r=this.c
r.r=r.r.fk(s)},
$S:0}
A.l1.prototype={
$1(a){var s,r
A.k(a)
s=A.dN(A.M(this.a.value))
if(s==null)s=0.75
r=this.b
if(t.m.b(r))r.innerText=B.a.ab(s,2)
r=this.c
r.r=r.r.fm(s)},
$S:0}
A.l2.prototype={
$1(a){var s
A.k(a)
s=this.a.B(0,A.M(this.b.value))
if(s!=null)this.c.sh0(s)},
$S:0}
A.l3.prototype={
$1(a){A.k(a)
this.a.shv(A.cf(this.b.checked))},
$S:0}
A.l4.prototype={
$1(a){var s,r=this
A.k(a)
s=r.a.ax
B.b.V(s)
switch(A.M(r.b.value)){case"embers":B.b.i(s,r.c)
break
case"dust":B.b.i(s,r.d)
break
case"snow":B.b.i(s,r.e)
break
case"off":break}},
$S:0}
A.lq.prototype={
$1(a){var s,r,q,p,o,n,m=this,l=null,k=m.a
B.b.V(k.ay)
s=A.u(A.k(v.G.document).querySelector("#spritesheet-controls"))
if(t.m.b(s)){r=A.k(s.style)
q=a==="spritesheet"?"block":"none"
r.display=q}switch(a){case"campfire":k.ag(A.aK(B.h,B.a0,B.I,l,l,A.oM(A.d([B.eo,B.ep,B.eq,B.en],t.mu)),0.4,B.w,0.1,0.4,new A.a(0,0.5,0),m.c,l,1.5,0.1,6.283185307179586,1.1,200,2.2,0.4,m.b,-1.5,0.05,0,0.6,1.2,0.25,1.5,2,1.2,0,B.f,0,75,1001,new A.dh(0.15,0.15,0.2,B.aR),B.hP,B.C,l,0.1,l,new A.T(B.ad,B.t,1,B.u)))
break
case"fireworks":r=m.b
q=m.e
p=A.aK(B.h,B.a0,B.I,l,l,l,1.5,B.w,0,0,B.fL,q,l,0,l,0,0.6,150,0.8,l,r,0,0.01,0,0.3,0.2,0.06,1,1,0,0,B.f,0,0,l,B.bd,l,B.C,l,0.1,l,B.F)
o=t.p
q=A.d([A.jz(4,A.aK(B.h,B.O,B.I,l,l,l,1.2,B.w,0,0,B.W,q,l,0,l,0,0.8,80,4.5,l,r,0,0.01,0,0.4,2,0.05,1,1,0,0,B.f,0,0,l,B.ev,l,B.C,l,0.1,l,B.F),!0,0.3,0,0.05,B.aD)],o)
n=A.aK(B.h,B.O,B.I,l,B.em,l,2,B.w,0,0,B.fM,m.c,l,0,l,0,1.5,120,14,l,r,0,0.03,0,0.9,8,0.2,1,1,0,0,B.f,0,0,l,B.bV,l,B.C,l,0.2,q,B.F)
k.ag(A.aK(B.h,B.b9,B.I,B.dr,l,l,0.1,B.w,0,0,B.W,m.d,l,0,l,0,1.5,10,22,l,r,0,0.14,0,1.2,18,0.14,1,1,0,0,B.f,0,0.8,l,B.ew,l,B.C,l,0.1,A.d([A.jz(1,p,!0,0.1,0.3,0.03,B.br),A.jz(80,n,!0,0.2,0,0.05,B.bq)],o),new A.T(B.ad,B.t,1,B.u)))
break
case"sparks":k.ag(A.aK(B.h,B.O,B.I,l,new A.cE(new A.a(0,-1,0),B.f,0.55,0.15,B.ba),l,0.8,B.w,0,0,B.W,m.e,l,0,0.03,0,2.2,300,11,0.12,m.b,0,0.01,0,1.2,6,0.08,1,1,0,0,B.f,0,80,4004,new A.c5(B.ha,0.4),l,B.C,l,0.25,l,new A.T(B.ht,B.t,1,B.u)))
break
case"vortex":k.ag(A.aK(B.h,B.a0,B.I,l,l,l,0,B.w,0,0,B.h,m.f,l,0,0.05,0,2.8,400,3.5,0.25,m.b,0,0.02,0,1.8,2,0.15,2,1,0.5,6,B.f,-4.5,90,5005,new A.cs(3,2.0999999999999996,B.f,B.aO,B.c7),l,B.C,l,0.1,l,new A.T(B.R,B.t,1,B.u)))
break
case"fountain":r=Math.sqrt(78.48)
q=Math.sqrt(78.48)
k.ag(A.aK(B.h,B.b9,B.A,l,new A.cE(B.ad,B.f,0.5,0.1,B.bb),l,0.25,B.w,0,0,B.W,m.r,l,0,0.22,0,1.8,350,q*1.15,0.14,m.b,0,0.16,0,1.4,r,0.08,1,1,0,0,B.f,0,110,6006,new A.dh(0.1,0.12,0.3,B.aR),l,B.C,l,0.1,l,new A.T(B.ad,B.t,1,B.u)))
break
case"rain":r=m.b
k.ag(A.aK(B.h,B.O,B.A,l,new A.cE(new A.a(0,-1,0),B.f,0.5,0.1,B.bb),l,0.1,B.w,0,0,B.W,m.r,l,0,l,0,1.2,300,18,l,r,0,0.06,0,0.8,14,0.06,1,1,0,0,B.f,0,150,l,new A.cq(B.fN,B.ah),l,B.C,l,0.25,A.d([A.jz(5,A.aK(B.h,B.a0,B.A,l,l,l,0.5,B.w,0,0,B.W,m.w,l,0,l,0,0.4,200,2.5,l,r,0,0.01,0,0.2,1,0.04,1,1,0,0,B.f,0,0,l,B.c8,l,B.C,l,0.1,l,B.F),!1,0.5,0,0.05,B.aD)],t.p),new A.T(B.fE,B.t,1,B.u)))
break
case"blizzard":k.ag(A.aK(B.fO,B.O,B.A,l,l,l,0.6,B.w,0,0,B.h,m.x,l,0,0.08,0,3.2,500,8,0.08,m.b,0,0.04,0,2,4,0.04,1.2,2.5,2.2,0,B.f,0,160,10101,new A.cq(B.fP,B.ah),l,B.C,l,0.12,l,new A.T(B.fJ,B.t,1,B.u)))
break
case"warp":k.ag(A.aK(B.h,B.O,B.I,l,l,l,0,B.w,0,0,B.h,m.e,l,0,0.14,0,1.2,300,35,0.12,m.b,0,0.08,0,0.8,28,0.06,1,1,0,0,B.f,0,140,8008,new A.cs(8,0.5,B.r,B.aO,B.c5),l,B.C,l,0.35,l,new A.T(B.fG,B.t,1,B.u)))
break
case"confetti":k.ag(A.aK(B.h,B.el,B.A,l,l,l,0.85,B.w,0,0,B.hb,m.z,l,3,0.2,6.283185307179586,5.5,350,1.5,0.2,m.y,-3,0.12,0,3.5,0.5,0.12,1,1.2,1.4,0,B.f,0,60,9009,new A.cq(B.hh,B.ah),l,B.C,l,0.1,l,new A.T(B.fK,B.t,1,B.u)))
break
case"spritesheet":r=m.Q
k.ag(r)
r.fg(16,B.Q)
break
case"none":default:break}},
$S:19}
A.l5.prototype={
$1(a){A.k(a)
return this.a.$1(A.M(this.b.value))},
$S:20}
A.l6.prototype={
$1(a){A.k(a)
this.a.bq(12,null,B.Q,"star")},
$S:0}
A.l8.prototype={
$1(a){A.k(a)
this.a.bq(4,null,B.Q,"ring")},
$S:0}
A.l9.prototype={
$1(a){A.k(a)
this.a.bq(10,null,B.Q,"smoke")},
$S:0}
A.la.prototype={
$1(a){A.k(a)
this.a.bq(8,null,B.Q,"orb")},
$S:0}
A.lb.prototype={
$1(a){A.k(a)
this.a.fh(16,"combustion",null,B.Q)},
$S:0}
A.lc.prototype={
$1(a){var s,r,q,p,o=this
A.k(a)
switch(A.M(o.a.value)){case"on":o.b.c8(B.b0,120,0.04,20)
break
case"volumetric":s=o.b
s.fD(B.d2,120,20)
r=B.d.fj(32)
q=s.f
p=B.d.l(16<r?r:16,4,24)
s.f=q.fw(B.a_,0.7,0.04,0.02,1.2,B.a.l(0.5,0,0.5),p)
break
case"off":s=o.b
s.f=s.f.fo(null,10001,null,1e4)
break}},
$S:0}
A.ld.prototype={
$1(a){var s
A.k(a)
s=A.cf(this.b.checked)?-1:0
this.a.shu(s)},
$S:0}
A.le.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i=this
A.k(a)
s=i.b
r=s.e2(A.e(a.clientX),A.e(a.clientY))
q=r==null?null:s.e.h3(r,!1,null)
s=i.a
if(q!=null){p=q.a
s.e=p
s.f=1
o=B.a.ab(q.d,2)
n=q.b
s=B.a.ab(n.a,1)
m=B.a.ab(n.b,1)
l=B.a.ab(n.c,1)
k=q.f
j=k!=null?" (Instance #"+A.m(k)+")":""
k=i.c
if(k!=null)k.textContent="Selected: "+p.a+j+" | Dist: "+o+" | Pt: "+("("+s+", "+m+", "+l+")")}else{s.e=null
s=i.c
if(s!=null)s.textContent="Click any 3D object to inspect"}},
$S:0}
A.lf.prototype={
$1(a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=this,a5=a9.a,a6=a9.b,a7=a4.a,a8=a7.f
if(a8>0)a8=a7.f=Math.max(0,a8-a6*2.5)
s=a4.b
r=a7.e===s?1+Math.sin(a8*3.141592653589793)*0.2:1
s.b=s.b.c2(r)
s.a7()
a8=a4.c
q=a7.e===a8?1+Math.sin(a7.f*3.141592653589793)*0.18:1
a8.b=a8.b.c2(q)
a8.a7()
s.bA(B.f,0.35*a6)
a8.bA(B.h8.gm(),0.7*a6)
a4.d.bA(B.f,0.65*a6)
a4.e.bA(B.f,0.12*a6)
a8=a4.f
p=a8.dZ(15.5,3,a5)
o=a8.e0(15.5,3,a5)
s=a4.r
n=new A.a(15.5+p.a,a8.b+p.b,3+p.c).u(0,B.bB)
s.b=s.b.di(n)
s.a7()
m=B.f.S(o)
if(m.gO()>0.000001){l=Math.acos(B.a.l(o.b,-1,1))
n=A.al(m.gm(),l*0.75)
s.b=s.b.c1(n)
s.a7()}a4.w.ht(a5,a8)
s=a4.x
s.b=a4.y.hr(a6,a5,a8)
s.a7()
for(a8=a4.z,k=0;k<a8.length;++k){j=a8[k]
i=j===a7.e?1+Math.sin(a7.f*3.141592653589793)*0.25:1
j.b=j.b.c2(i)
j.a7()
h=B.d.F(k,3)
A:{if(0===h){s=B.fT.gm()
break A}if(1===h){s=B.fF.gm()
break A}s=B.fS.gm()
break A}g=A.al(s,(2.2+k*1.2)*a6)
s=j.b
j.b=s.c1(s.b.k(0,g))
j.a7()}a8=a4.Q
s=t.m
if(s.b(a8)&&A.M(a8.value)==="tour"){a8=a4.as
if(s.b(a8)){a8=A.dN(A.M(a8.value))
f=a8==null?0:a8}else f=0
e=f>0?f:0.4
a8=a4.at
a8.r=a8.r.dg(e)}a8=a5*1.2
n=Math.cos(a8)
d=Math.sin(a5*2)
a8=Math.sin(a8)
c=a5+2
b=Math.cos(c)
c=Math.sin(c)
a=a5*0.8+4
a0=Math.cos(a)
a=Math.sin(a)
a1=Math.sin(a5*2.2)
a2=a4.at
a2.f=a2.f.fl(A.d([new A.aC(0,new A.a(n*4.2,1.5+d*0.6,a8*4.2),B.cJ,1.5,8),new A.aC(1,new A.a(b*4.5,1.8,c*4.5),B.cQ,1.5,8),new A.aC(2,new A.a(a0*3.8,1.2,a*3.8),B.d0,1.2,7.5),new A.aC(3,new A.a(0,3.8+a1*0.9,0),B.d3,1.6,9)],t.h))
if(a7.b&&!a7.d){a3=B.a.F(a7.a+a6*0.2667*a7.c,24)
a7.a=a3
a2.cs(a3,0.25)
a8=a4.ax
if(s.b(a8))a8.value=B.a.ab(a7.a,2)
a4.ay.$0()}},
$S:77}
A.lg.prototype={
$1(a){var s,r,q,p,o,n,m=this
A.k(a)
s=v.G
r=A.u(A.k(s.document).activeElement)
q=r==null?null:A.M(r.tagName).toLowerCase()
if(q==="input"||q==="select")return
switch(A.M(a.key)){case" ":a.preventDefault()
s=m.a
p=!s.b
s.b=p
s=m.b
if(t.m.b(s)){r=p?"\u23f8 Pause Time":"\u25b6 Play Time"
s.innerText=r}break
case"1":m.c.$1("time")
break
case"2":m.c.$1("camera")
break
case"3":m.c.$1("materials")
break
case"4":m.c.$1("vfx")
break
case"t":case"T":s=m.a
o=B.a.F(s.a+3,24)
s.a=o
s=m.d
if(t.m.b(s))s.value=B.a.ab(o,2)
m.e.$0()
break
case"c":case"C":r=m.f
if(t.m.b(r)){r.selectedIndex=B.d.F(A.e(r.selectedIndex)+1,A.e(A.k(r.options).length))
A.cf(r.dispatchEvent(A.k(new s.Event("change"))))}break
case"m":case"M":n=A.u(A.k(s.document).querySelector("#material-select"))
if(t.m.b(n)){n.selectedIndex=B.d.F(A.e(n.selectedIndex)+1,A.e(A.k(n.options).length))
A.cf(n.dispatchEvent(A.k(new s.Event("change"))))}break}},
$S:0};(function aliases(){var s=J.bJ.prototype
s.ea=s.j
s=A.bc.prototype
s.eb=s.a7})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"qq","oB",78)
r(A,"qQ","pL",11)
r(A,"qR","pM",11)
r(A,"qS","pN",11)
q(A,"nS","qL",1)
p(A.fh.prototype,"ghc","hd",82)
var o
p(o=A.fT.prototype,"gh8","h9",3)
p(o,"ghg","hh",3)
p(o,"ghi","hj",3)
p(o,"gha","hb",3)
p(o,"ghe","hf",3)
q(A,"nT","pO",80)
q(A,"rU","lQ",81)
r(A,"r_","op",12)
r(A,"qZ","mE",12)
p(A.aI.prototype,"gaG","ai",5)
p(A.dL.prototype,"gd6","eZ",69)
q(A,"rr","pY",55)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.z,null)
q(A.z,[A.lK,J.f8,A.dV,J.d8,A.p,A.dc,A.S,A.ju,A.ah,A.dB,A.R,A.V,A.aW,A.cB,A.di,A.ca,A.br,A.jH,A.iG,A.dn,A.ej,A.bD,A.c2,A.it,A.dy,A.bn,A.dx,A.b3,A.he,A.kg,A.ke,A.h2,A.bx,A.aQ,A.h7,A.c8,A.a3,A.h3,A.hu,A.et,A.ea,A.hh,A.cb,A.I,A.ep,A.hx,A.bX,A.jW,A.fr,A.dY,A.jX,A.i8,A.ap,A.a8,A.hv,A.fP,A.iF,A.hg,A.cd,A.jg,A.aL,A.eQ,A.eR,A.fw,A.db,A.dX,A.eY,A.ia,A.ib,A.bp,A.im,A.cH,A.eI,A.v,A.ct,A.aC,A.aD,A.aq,A.as,A.jK,A.ba,A.i_,A.iH,A.j4,A.dT,A.bq,A.jA,A.dQ,A.a2,A.ic,A.fh,A.fW,A.iC,A.be,A.fT,A.jw,A.hP,A.aA,A.eL,A.bZ,A.bK,A.cM,A.bj,A.eW,A.eX,A.eZ,A.i9,A.cT,A.Q,A.ao,A.Y,A.q,A.dg,A.jc,A.ae,A.jh,A.a9,A.jj,A.ji,A.bO,A.dP,A.fD,A.jY,A.hw,A.kd,A.hl,A.hd,A.hp,A.hk,A.k8,A.aB,A.az,A.a6,A.hZ,A.hY,A.ay,A.jC,A.jB,A.jM,A.a4,A.e7,A.c4,A.id,A.aI,A.bL,A.je,A.jf,A.hR,A.T,A.D,A.a,A.hN,A.dq,A.ih,A.cm,A.eF,A.dJ,A.aT,A.iK,A.cE,A.dZ,A.hj,A.ft,A.bY,A.c5,A.cq,A.fK,A.dh,A.cs,A.dK,A.fL,A.iN,A.da,A.h5,A.eH,A.h6,A.eT,A.h8,A.dl,A.ha,A.eV,A.hb,A.f5,A.hf,A.dC,A.hi,A.cp,A.eJ,A.lR,A.dM,A.hm,A.fB,A.hn,A.c6,A.fI,A.hq,A.fJ,A.hr,A.fN,A.ht,A.fM,A.hs,A.fY,A.hy,A.fZ,A.hA,A.hz,A.dR,A.h1,A.hD,A.b9,A.c0,A.hH,A.cQ,A.hI,A.bc,A.f_,A.f2,A.dr,A.dW,A.i,A.eU,A.cv,A.dL,A.fy,A.ij,A.bP,A.bb,A.cu,A.jR,A.cX,A.by,A.es,A.er,A.hC,A.hB,A.kj,A.jN,A.jQ])
q(J.f8,[J.fb,J.dt,J.dv,J.du,J.dw,J.cz,J.bH])
q(J.dv,[J.bJ,J.r,A.cC,A.dG])
q(J.bJ,[J.fv,J.c7,J.bI])
r(J.fa,A.dV)
r(J.ir,J.r)
q(J.cz,[J.ds,J.fc])
q(A.p,[A.cR,A.aS,A.dA,A.ac,A.c9,A.bQ])
r(A.eu,A.cR)
r(A.e6,A.eu)
r(A.dd,A.e6)
q(A.S,[A.cA,A.bs,A.fd,A.fV,A.fE,A.hc,A.eC,A.b6,A.e3,A.fU,A.cN,A.eP])
q(A.aS,[A.P,A.bm,A.b1,A.bl,A.e9])
q(A.P,[A.e_,A.O,A.dU])
q(A.aW,[A.bw,A.cU])
q(A.bw,[A.F,A.cV,A.eg,A.cW])
r(A.ce,A.cU)
r(A.cY,A.cB)
r(A.e1,A.cY)
r(A.dj,A.e1)
r(A.a_,A.di)
q(A.br,[A.dk,A.eh,A.eq])
r(A.b7,A.dk)
r(A.dI,A.bs)
q(A.bD,[A.eN,A.eO,A.fS,A.kP,A.kR,A.jT,A.jS,A.kk,A.k6,A.ls,A.lt,A.kK,A.jv,A.kL,A.jL,A.iz,A.iA,A.iB,A.iJ,A.iy,A.iD,A.jE,A.jG,A.hQ,A.hT,A.hU,A.i4,A.i2,A.i3,A.iP,A.iQ,A.jo,A.jn,A.jm,A.jl,A.jk,A.jp,A.kB,A.kC,A.jr,A.js,A.lB,A.lz,A.j5,A.j7,A.j6,A.ja,A.j9,A.ie,A.ix,A.hK,A.kI,A.jq,A.j3,A.iR,A.iT,A.iV,A.iW,A.iX,A.iY,A.iZ,A.j_,A.j0,A.j1,A.iU,A.ik,A.il,A.jO,A.jP,A.kV,A.kW,A.kX,A.l7,A.lh,A.lo,A.li,A.lj,A.lk,A.ll,A.lm,A.ln,A.kY,A.kZ,A.l_,A.l0,A.l1,A.l2,A.l3,A.l4,A.lq,A.l5,A.l6,A.l8,A.l9,A.la,A.lb,A.lc,A.ld,A.le,A.lf,A.lg])
q(A.fS,[A.fO,A.co])
q(A.c2,[A.bk,A.e8])
q(A.eO,[A.kQ,A.kl,A.kG,A.k7,A.iu,A.iw,A.lv,A.lu,A.iE,A.jF,A.lw,A.i5,A.jt,A.lA,A.ly,A.j8,A.jb,A.hS,A.hO,A.iL,A.is,A.hJ,A.iS])
q(A.dG,[A.fi,A.aj])
q(A.aj,[A.ec,A.ee])
r(A.ed,A.ec)
r(A.dE,A.ed)
r(A.ef,A.ee)
r(A.dF,A.ef)
q(A.dE,[A.dD,A.fj])
q(A.dF,[A.fk,A.fl,A.fm,A.fn,A.fo,A.dH,A.fp])
r(A.ek,A.hc)
q(A.eN,[A.jU,A.jV,A.kf,A.jZ,A.k2,A.k1,A.k0,A.k_,A.k5,A.k4,A.k3,A.kc,A.kF,A.kA,A.kt,A.ku,A.kz,A.ko,A.kq,A.kp,A.ky,A.km,A.kn,A.kv,A.kw,A.kx,A.ks,A.kr,A.kD,A.kE,A.iM,A.iO,A.kJ,A.lp,A.kU])
r(A.e5,A.h7)
r(A.ho,A.et)
r(A.eb,A.e8)
r(A.b5,A.eh)
r(A.e2,A.eq)
q(A.b6,[A.cJ,A.f6])
q(A.jW,[A.cI,A.cP,A.cy,A.d7,A.fg,A.bv,A.dm,A.eG,A.hV,A.cK,A.am,A.cw,A.b0,A.fC,A.bi,A.dS,A.fH,A.dp,A.eE,A.cD,A.fs,A.d9,A.cO,A.hM,A.jy,A.jx,A.hW,A.eM,A.de,A.cF,A.h4,A.h9,A.fe,A.jJ,A.ii,A.f0,A.f3,A.f4,A.cx,A.f1,A.cL,A.bu,A.df,A.ei,A.hL,A.cn,A.hX,A.i0,A.ar])
q(A.bp,[A.aJ,A.aE,A.b2,A.fu,A.b8])
r(A.fF,A.hp)
r(A.fX,A.c0)
r(A.f7,A.bc)
r(A.h_,A.hB)
s(A.eu,A.I)
s(A.ec,A.I)
s(A.ed,A.V)
s(A.ee,A.I)
s(A.ef,A.V)
s(A.cY,A.ep)
s(A.eq,A.hx)
s(A.hp,A.k8)
s(A.hB,A.kj)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{j:"int",o:"double",au:"num",x:"String",w:"bool",a8:"Null",C:"List",z:"Object",aH:"Map",N:"JSObject"},mangledNames:{},types:["a8(N)","~()","b_()","b_(aE?)","w(Q)","a(a)","w(N)","~(@)","w(as)","w(x)","w(q)","~(~())","o(o)","a8(@)","a8()","w(o)","a(aA)","~(a,a,a,a,a,a)","a8(z?)","~(x)","~(N)","w(e0?)","b2(j,j,x?)","aJ(j,j,x?)","j(j,+(aJ,ba))","a8(@,bN)","aE(j,j,x?)","@(@)","j(j,+(aE,be))","j(+influence,source(o,e4),+influence,source(o,e4))","~(j,@)","a8(z,bN)","x(Q)","j(E,E)","~(@,@)","~(z?,z?)","w(j)","b8(j,j,x?)","dR(aJ)","b_(x{fallback:x?})","z?(z?)","aD?()","C<aD>()","db()","o()","cp()","b_?()","w(ap<x,a2>)","a2(ap<x,a2>)","a2(a2,a2)","j(a6<aB>,a6<aB>)","aU(a6<aB>)","j(a6<az>,a6<az>)","aU(a6<az>)","~(x,o,o,o{loOpen:w})","cX()","~(a,a,a,a,a)","o(j,j)","c4(o,o,o,o)","o(a,a)","a(o,o)","w(cm)","j(aT,aT)","aq()","C<j>()","~(c6)","c6()","w(x,cQ)","~(bc)","~(au)","dQ(aL)","w(aL)","w(r<z?>,N)","j(+influence,light(o,aD),+influence,light(o,aD))","j(+influence,light(o,aC),+influence,light(o,aC))","@(x)","@(@,x)","~(cv)","j(@,@)","a8(~())","cT()","w()","aq(b2)","j(j,j)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.F&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.cV&&a.b(c.a)&&b.b(c.b),"2;influence,source":(a,b)=>c=>c instanceof A.eg&&a.b(c.a)&&b.b(c.b),"2;rotation,translation":(a,b)=>c=>c instanceof A.cW&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.ce&&a.b(d.a)&&b.b(d.b)&&c.b(d.c)}}
A.q4(v.typeUniverse,JSON.parse('{"fv":"bJ","c7":"bJ","bI":"bJ","rC":"cC","r":{"C":["1"],"N":[],"p":["1"]},"fb":{"w":[],"L":[]},"dt":{"L":[]},"dv":{"N":[]},"bJ":{"N":[]},"fa":{"dV":[]},"ir":{"r":["1"],"C":["1"],"N":[],"p":["1"]},"d8":{"a0":["1"]},"cz":{"o":[],"au":[],"av":["au"]},"ds":{"o":[],"j":[],"au":[],"av":["au"],"L":[]},"fc":{"o":[],"au":[],"av":["au"],"L":[]},"bH":{"x":[],"av":["x"],"mW":[],"L":[]},"cR":{"p":["2"]},"dc":{"a0":["2"]},"e6":{"I":["2"],"C":["2"],"cR":["1","2"],"p":["2"]},"dd":{"e6":["1","2"],"I":["2"],"C":["2"],"cR":["1","2"],"p":["2"],"I.E":"2","p.E":"2"},"cA":{"S":[]},"aS":{"p":["1"]},"P":{"aS":["1"],"p":["1"]},"e_":{"P":["1"],"aS":["1"],"p":["1"],"P.E":"1","p.E":"1"},"ah":{"a0":["1"]},"dA":{"p":["2"],"p.E":"2"},"dB":{"a0":["2"]},"O":{"P":["2"],"aS":["2"],"p":["2"],"P.E":"2","p.E":"2"},"ac":{"p":["1"],"p.E":"1"},"R":{"a0":["1"]},"dU":{"P":["1"],"aS":["1"],"p":["1"],"P.E":"1","p.E":"1"},"F":{"bw":[],"aW":[]},"cV":{"bw":[],"aW":[]},"eg":{"bw":[],"aW":[]},"cW":{"bw":[],"aW":[]},"ce":{"cU":[],"aW":[]},"dj":{"e1":["1","2"],"cY":["1","2"],"cB":["1","2"],"ep":["1","2"],"aH":["1","2"]},"di":{"aH":["1","2"]},"a_":{"di":["1","2"],"aH":["1","2"]},"c9":{"p":["1"],"p.E":"1"},"ca":{"a0":["1"]},"dk":{"br":["1"],"bM":["1"],"p":["1"]},"b7":{"dk":["1"],"br":["1"],"bM":["1"],"p":["1"]},"dI":{"bs":[],"S":[]},"fd":{"S":[]},"fV":{"S":[]},"ej":{"bN":[]},"bD":{"c_":[]},"eN":{"c_":[]},"eO":{"c_":[]},"fS":{"c_":[]},"fO":{"c_":[]},"co":{"c_":[]},"fE":{"S":[]},"bk":{"c2":["1","2"],"mN":["1","2"],"aH":["1","2"]},"bm":{"aS":["1"],"p":["1"],"p.E":"1"},"dy":{"a0":["1"]},"b1":{"aS":["1"],"p":["1"],"p.E":"1"},"bn":{"a0":["1"]},"bl":{"aS":["ap<1,2>"],"p":["ap<1,2>"],"p.E":"ap<1,2>"},"dx":{"a0":["ap<1,2>"]},"bw":{"aW":[]},"cU":{"aW":[]},"cC":{"N":[],"L":[]},"dG":{"N":[]},"fi":{"N":[],"L":[]},"aj":{"aG":["1"],"N":[]},"dE":{"I":["o"],"aj":["o"],"C":["o"],"aG":["o"],"N":[],"p":["o"],"V":["o"]},"dF":{"I":["j"],"aj":["j"],"C":["j"],"aG":["j"],"N":[],"p":["j"],"V":["j"]},"dD":{"i6":[],"I":["o"],"aj":["o"],"C":["o"],"aG":["o"],"N":[],"p":["o"],"V":["o"],"L":[],"I.E":"o","V.E":"o"},"fj":{"i7":[],"I":["o"],"aj":["o"],"C":["o"],"aG":["o"],"N":[],"p":["o"],"V":["o"],"L":[],"I.E":"o","V.E":"o"},"fk":{"I":["j"],"aj":["j"],"C":["j"],"aG":["j"],"N":[],"p":["j"],"V":["j"],"L":[],"I.E":"j","V.E":"j"},"fl":{"I":["j"],"aj":["j"],"C":["j"],"aG":["j"],"N":[],"p":["j"],"V":["j"],"L":[],"I.E":"j","V.E":"j"},"fm":{"I":["j"],"aj":["j"],"C":["j"],"aG":["j"],"N":[],"p":["j"],"V":["j"],"L":[],"I.E":"j","V.E":"j"},"fn":{"I":["j"],"aj":["j"],"C":["j"],"aG":["j"],"N":[],"p":["j"],"V":["j"],"L":[],"I.E":"j","V.E":"j"},"fo":{"I":["j"],"aj":["j"],"C":["j"],"aG":["j"],"N":[],"p":["j"],"V":["j"],"L":[],"I.E":"j","V.E":"j"},"dH":{"I":["j"],"aj":["j"],"C":["j"],"aG":["j"],"N":[],"p":["j"],"V":["j"],"L":[],"I.E":"j","V.E":"j"},"fp":{"e0":[],"I":["j"],"aj":["j"],"C":["j"],"aG":["j"],"N":[],"p":["j"],"V":["j"],"L":[],"I.E":"j","V.E":"j"},"hc":{"S":[]},"ek":{"bs":[],"S":[]},"bx":{"a0":["1"]},"bQ":{"p":["1"],"p.E":"1"},"aQ":{"S":[]},"e5":{"h7":["1"]},"a3":{"bF":["1"]},"et":{"nn":[]},"ho":{"et":[],"nn":[]},"e8":{"c2":["1","2"],"aH":["1","2"]},"eb":{"e8":["1","2"],"c2":["1","2"],"aH":["1","2"]},"e9":{"aS":["1"],"p":["1"],"p.E":"1"},"ea":{"a0":["1"]},"b5":{"br":["1"],"mO":["1"],"bM":["1"],"p":["1"]},"cb":{"a0":["1"]},"c2":{"aH":["1","2"]},"cB":{"aH":["1","2"]},"e1":{"cY":["1","2"],"cB":["1","2"],"ep":["1","2"],"aH":["1","2"]},"br":{"bM":["1"],"p":["1"]},"eh":{"br":["1"],"bM":["1"],"p":["1"]},"e2":{"br":["1"],"hx":["1"],"bM":["1"],"p":["1"]},"bX":{"av":["bX"]},"o":{"au":[],"av":["au"]},"j":{"au":[],"av":["au"]},"C":{"p":["1"]},"au":{"av":["au"]},"bM":{"p":["1"]},"x":{"av":["x"],"mW":[]},"eC":{"S":[]},"bs":{"S":[]},"b6":{"S":[]},"cJ":{"S":[]},"f6":{"S":[]},"e3":{"S":[]},"fU":{"S":[]},"cN":{"S":[]},"eP":{"S":[]},"fr":{"S":[]},"dY":{"S":[]},"hv":{"bN":[]},"hg":{"lT":[]},"cd":{"lT":[]},"aJ":{"bp":[]},"aE":{"bp":[]},"b2":{"bp":[]},"b8":{"bp":[]},"fu":{"bp":[]},"eL":{"cr":[]},"bZ":{"cr":[]},"bK":{"cr":[]},"cM":{"cr":[]},"eZ":{"pi":[]},"bO":{"aU":[]},"dP":{"pl":[]},"fD":{"pn":[]},"hw":{"aU":[]},"hl":{"pk":[]},"hd":{"ov":[]},"fF":{"pp":[]},"aB":{"av":["aB"]},"az":{"av":["az"]},"e7":{"oo":[]},"c5":{"bE":[]},"cq":{"bE":[]},"fK":{"bE":[]},"dh":{"bE":[]},"cs":{"bE":[]},"da":{"K":[]},"h5":{"E":[]},"eH":{"K":[]},"h6":{"E":[]},"eT":{"K":[]},"h8":{"E":[]},"dl":{"K":[]},"ha":{"E":[]},"eV":{"K":[]},"hb":{"E":[]},"f5":{"K":[]},"hf":{"E":[]},"dC":{"K":[]},"hi":{"E":[]},"eJ":{"pj":[]},"dM":{"K":[]},"hm":{"E":[]},"fB":{"K":[]},"hn":{"E":[]},"fI":{"K":[]},"hq":{"E":[]},"fJ":{"K":[]},"hr":{"E":[]},"fN":{"K":[]},"ht":{"E":[]},"fM":{"K":[]},"hs":{"E":[]},"fY":{"K":[]},"hy":{"E":[]},"fZ":{"K":[]},"hA":{"E":[]},"hz":{"E":[]},"h1":{"K":[]},"hD":{"E":[]},"fX":{"c0":["a"],"c0.T":"a"},"f7":{"bc":[]},"eU":{"or":[]},"by":{"b_":[]},"h_":{"ow":[]},"oz":{"C":["j"],"p":["j"]},"e0":{"C":["j"],"p":["j"]},"px":{"C":["j"],"p":["j"]},"ox":{"C":["j"],"p":["j"]},"pv":{"C":["j"],"p":["j"]},"oy":{"C":["j"],"p":["j"]},"pw":{"C":["j"],"p":["j"]},"i6":{"C":["o"],"p":["o"]},"i7":{"C":["o"],"p":["o"]}}'))
A.q3(v.typeUniverse,JSON.parse('{"eu":2,"aj":1,"eh":1,"eq":1}'))
var u={l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",m:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nuniform vec3 uClearColor;\nuniform vec3 uSkyHorizon;\nuniform vec3 uSkyZenith;\nuniform vec3 uSkyGround;\nuniform float uSkyEnabled;\nuniform float uSkyHorizonGlow;\nuniform float uSkyStarDensity;\nuniform sampler2D uSkyTexture;\nuniform float uSkyTextureEnabled;\nuniform float uSkyRotation;\nuniform float uSkyExposure;\nuniform float uSkyTextureSrgb;\nuniform mat4 uInverseProjection;\nuniform mat4 uInverseView;\nuniform vec3 uCameraPosition;\nuniform float uCloudCoverage;\nuniform float uCloudDensity;\nuniform float uCloudBaseHeight;\nuniform float uCloudThickness;\nuniform float uCloudScale;\nuniform vec2 uCloudWind;\nuniform float uCloudPhase;\nuniform float uCloudDetail;\nuniform float uCloudSilverLining;\nuniform float uCloudSampleCount;\nuniform vec3 uCloudLightDirection;\nuniform vec3 uCloudLightColor;\nuniform float uCloudLightIntensity;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 acesToneMap(vec3 color){\n  return clamp((color*(2.51*color+0.03))/(color*(2.43*color+0.59)+0.14),0.0,1.0);\n}\n\nvec3 agxToneMap(vec3 color){\n  const mat3 agxMat=mat3(\n    0.842479062253094,0.0423282422610123,0.0423756549057051,\n    0.0784335999999992,0.878468636469772,0.0784336,\n    0.0792237451477643,0.0791661274605434,0.879142973793104\n  );\n  const mat3 agxMatInv=mat3(\n    1.19687902425764,-0.0528968517032958,-0.0529716355080549,\n    -0.0980208811401368,1.15190312990417,-0.0980434501171241,\n    -0.0990297440797205,-0.0989611768448433,1.15107367264185\n  );\n  vec3 val=agxMat*color;\n  val=clamp(log2(max(val,vec3(1e-10)))*0.0625+0.625,0.0,1.0);\n  val=val*val*val*(val*(val*6.0-15.0)+10.0);\n  val=agxMatInv*val;\n  return pow(max(val,vec3(0.0)),vec3(2.2));\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nvec3 skyBackground(vec3 direction){\n  // A deliberately cheap, high-quality fallback sky: three atmospheric bands\n  // provide depth at every camera angle, while the tiny deterministic star\n  // field and horizon glow keep the clear background from reading as a flat\n  // color. It is an environment layer, not a game/weather simulation.\n  //\n  // The bands follow the real horizon (the view direction), not the screen.\n  // Below the horizon is ground, which a matched horizon makes equal to the\n  // fog, so fully fogged geometry and the sky beside it meet without a seam;\n  // a screen-space gradient painted zenith colour wherever a downward camera\n  // saw past the fog.\n  float elevation=clamp(direction.y,-1.,1.);\n  vec3 color=mix(uSkyHorizon,uSkyGround,smoothstep(0.0,-0.2,elevation));\n  color=mix(color,uSkyZenith,smoothstep(0.0,0.6,elevation));\n  float horizonGlow=exp(-pow(elevation*9.0,2.0));\n  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);\n  // Stars sit on a sky-fixed grid (about two cells per degree), so they stay\n  // put as the camera turns. Each lit cell holds one small round star at a\n  // jittered spot with its own brightness.\n  float starMask=smoothstep(0.04,0.3,elevation);\n  vec2 cell=vec2(atan(direction.z,direction.x),asin(elevation))*(360.0/3.14159265359);\n  vec2 id=floor(cell);\n  float seed=hash(id);\n  vec2 offset=vec2(hash(id+vec2(17.0,3.0)),hash(id+vec2(5.0,29.0)))*0.5+0.25;\n  float point=1.0-smoothstep(0.08,0.22,length(fract(cell)-offset));\n  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),seed)*point*starMask;\n  color+=vec3(0.16,0.19,0.24)*stars*(0.6+0.9*hash(id+vec2(41.0,11.0)));\n  return max(color,vec3(0.0));\n}\n\nfloat hash3(vec3 p){\n  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);\n}\n\nfloat valueNoise(vec3 p){\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  f=f*f*(3.0-2.0*f);\n  float n000=hash3(i+vec3(0,0,0));\n  float n100=hash3(i+vec3(1,0,0));\n  float n010=hash3(i+vec3(0,1,0));\n  float n110=hash3(i+vec3(1,1,0));\n  float n001=hash3(i+vec3(0,0,1));\n  float n101=hash3(i+vec3(1,0,1));\n  float n011=hash3(i+vec3(0,1,1));\n  float n111=hash3(i+vec3(1,1,1));\n  float x00=mix(n000,n100,f.x);\n  float x10=mix(n010,n110,f.x);\n  float x01=mix(n001,n101,f.x);\n  float x11=mix(n011,n111,f.x);\n  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);\n}\n\nfloat cloudNoise(vec3 p){\n  float value=0.0;\n  float amplitude=0.5;\n  for(int octave=0;octave<4;octave++){\n    value+=valueNoise(p)*amplitude;\n    p=p*2.03+vec3(17.3,11.7,7.1);\n    amplitude*=0.5;\n  }\n  return value;\n}\n\nfloat cloudDensityAt(vec3 position){\n  float height01=clamp(\n    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),\n    0.0,1.0\n  );\n  float vertical=smoothstep(0.0,0.12,height01)*\n    (1.0-smoothstep(0.72,1.0,height01));\n  vec3 q=position*max(uCloudScale,0.00001)+\n    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);\n  float macro=cloudNoise(q*0.82);\n  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));\n  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));\n  float threshold=1.0-clamp(uCloudCoverage,0.,1.);\n  float body=smoothstep(threshold,threshold+0.26,shape);\n  return body*vertical*clamp(uCloudDensity,0.,1.);\n}\n\nvec4 volumetricClouds(vec3 worldDirection){\n  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){\n    return vec4(0.0);\n  }\n  float directionY=max(worldDirection.y,0.001);\n  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;\n  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;\n  startT=max(startT,0.0);\n  endT=max(endT,0.0);\n  if(endT<=startT) return vec4(0.0);\n  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));\n  float stepLength=(endT-startT)/float(sampleCount);\n  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;\n  vec3 sunDirection=normalize(-uCloudLightDirection);\n  float transmittance=1.0;\n  vec3 inScatter=vec3(0.0);\n  for(int i=0;i<24;i++){\n    if(i>=sampleCount) break;\n    float t=startT+(float(i)+0.5)*stepLength+jitter;\n    vec3 position=uCameraPosition+worldDirection*t;\n    float density=cloudDensityAt(position);\n    float opticalDepth=density*stepLength*0.0035;\n    float segmentAlpha=1.0-exp(-opticalDepth);\n    float towardLight=cloudDensityAt(position+sunDirection*90.0);\n    float lightTransmittance=exp(-towardLight*0.025);\n    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);\n    vec3 ambient=uSkyHorizon*0.32;\n    vec3 direct=uCloudLightColor*\n      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;\n    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;\n    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);\n    inScatter+=transmittance*segmentAlpha*sampleLight;\n    transmittance*=1.0-segmentAlpha;\n    if(transmittance<0.01) break;\n  }\n  return vec4(inScatter,1.0-transmittance);\n}\n\nvec3 srgbToLinear(vec3 color){\n  vec3 low=color/12.92;\n  vec3 high=pow((color+0.055)/1.055,vec3(2.4));\n  return mix(low,high,step(vec3(0.04045),color));\n}\n\nvec3 worldDirectionForUv(vec2 uv){\n  vec2 ndc=uv*2.0-1.0;\n  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);\n  return normalize(viewPoint.xyz/viewPoint.w);\n}\n\nvec3 equirectangularSky(vec2 uv){\n  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);\n  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;\n  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));\n  vec2 sampleUv=vec2(\n    fract(longitude/(2.0*3.14159265359)+0.5),\n    0.5-latitude/3.14159265359\n  );\n  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));\n  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));\n  return linear*max(uSkyExposure,0.0);\n}\n\nvec4 applyFxaa(sampler2D tex, vec2 uv){\n  vec2 texelSize=1.0/vec2(textureSize(tex,0));\n  vec3 rgbM=texture(tex,uv).rgb;\n  vec3 rgbNW=texture(tex,uv+vec2(-texelSize.x,-texelSize.y)).rgb;\n  vec3 rgbNE=texture(tex,uv+vec2( texelSize.x,-texelSize.y)).rgb;\n  vec3 rgbSW=texture(tex,uv+vec2(-texelSize.x, texelSize.y)).rgb;\n  vec3 rgbSE=texture(tex,uv+vec2( texelSize.x, texelSize.y)).rgb;\n\n  const vec3 luma=vec3(0.299,0.587,0.114);\n  float lumaM =dot(rgbM, luma);\n  float lumaNW=dot(rgbNW,luma);\n  float lumaNE=dot(rgbNE,luma);\n  float lumaSW=dot(rgbSW,luma);\n  float lumaSE=dot(rgbSE,luma);\n\n  float lumaMin=min(lumaM,min(min(lumaNW,lumaNE),min(lumaSW,lumaSE)));\n  float lumaMax=max(lumaM,max(max(lumaNW,lumaNE),max(lumaSW,lumaSE)));\n\n  float range=lumaMax-lumaMin;\n  if(range<max(0.04,lumaMax*0.125)){\n    return vec4(rgbM,1.0);\n  }\n\n  vec2 dir=vec2(\n    -((lumaNW+lumaNE)-(lumaSW+lumaSE)),\n    ((lumaNW+lumaSW)-(lumaNE+lumaSE))\n  );\n  float dirReduce=max((lumaNW+lumaNE+lumaSW+lumaSE)*0.03125,0.0078125);\n  float rcpDirMin=1.0/(min(abs(dir.x),abs(dir.y))+dirReduce);\n  dir=min(vec2(8.0),max(vec2(-8.0),dir*rcpDirMin))*texelSize;\n\n  vec3 rgbA=0.5*(\n    texture(tex,uv+dir*(1.0/3.0-0.5)).rgb+\n    texture(tex,uv+dir*(2.0/3.0-0.5)).rgb\n  );\n  vec3 rgbB=rgbA*0.5+0.25*(\n    texture(tex,uv+dir*-0.5).rgb+\n    texture(tex,uv+dir* 0.5).rgb\n  );\n  float lumaB=dot(rgbB,luma);\n  if((lumaB<lumaMin)||(lumaB>lumaMax)){\n    return vec4(rgbA,1.0);\n  }\n  return vec4(rgbB,1.0);\n}\n\nvoid main(){\n  vec4 rawSource=texture(uTex,vUv);\n  bool isBackground=uSkyEnabled>0.5 && distance(rawSource.rgb,uClearColor)<0.004;\n  vec4 source=isBackground?rawSource:applyFxaa(uTex,vUv);\n  // Lens spectral dispersion (radial chromatic aberration towards viewport edges)\n  if(!isBackground){\n    vec2 centerOffset=vUv-vec2(0.5);\n    float distSq=dot(centerOffset,centerOffset);\n    if(distSq>0.04){\n      vec2 chromaOffset=centerOffset*distSq*0.010;\n      source.r=applyFxaa(uTex,vUv-chromaOffset).r;\n      source.b=applyFxaa(uTex,vUv+chromaOffset).b;\n    }\n  }\n  // The world pass clears untouched pixels to uClearColor. Replace only that\n  // exact background, so the sky is always active without covering geometry.\n  if(isBackground){\n    vec3 viewDirection=worldDirectionForUv(vUv);\n    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);\n    source.rgb=uSkyTextureEnabled>0.5\n      ? equirectangularSky(vUv)\n      : skyBackground(worldDirection);\n    vec4 clouds=volumetricClouds(worldDirection);\n    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;\n  }\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  vec3 mapped=uToneMap>3.0\n    ?agxToneMap(color)\n    :(uToneMap>1.5?acesToneMap(color):reinhardToneMap(color));\n  float toneMix=uToneMap>3.0\n    ?clamp((uToneMap-3.0)*2.0,0.,1.)\n    :(uToneMap>1.5?clamp(uToneMap-1.5,0.,1.):clamp(uToneMap,0.,1.));\n  color=mix(color,mapped,toneMix);\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  // Atmospheric precipitation is submitted as depth-tested world geometry;\n  // the present pass must never paint weather over unrelated surfaces.\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",k:"WebGl2Device: operation attempted while context is not ready",g:"max must be in range 0 < max \u2264 2^32, was "}
var t=(function rtii(){var s=A.bU
return{v:s("aQ"),dP:s("az"),gn:s("eI"),kp:s("cp"),f:s("aA"),bP:s("av<@>"),gY:s("dg"),I:s("a_<x,j>"),P:s("b7<x>"),cs:s("bX"),Q:s("S"),B:s("i6"),kI:s("i7"),o:s("a2"),Z:s("c_"),lO:s("bF<aE>"),mv:s("dq"),j:s("b_"),hL:s("b8"),bI:s("p<dg>"),id:s("p<o>"),e7:s("p<@>"),mC:s("r<eF>"),mj:s("r<aA>"),ky:s("r<dq>"),J:s("r<b_>"),aW:s("r<ao>"),og:s("r<bj>"),jj:s("r<b8>"),hq:s("r<c0<@>>"),fC:s("r<C<j>>"),cT:s("r<b2>"),bk:s("r<rD>"),eQ:s("r<dJ>"),mu:s("r<aT>"),a3:s("r<ft>"),hg:s("r<dK>"),hJ:s("r<Q>"),de:s("r<c4>"),h:s("r<aC>"),ng:s("r<cH>"),aA:s("r<+(x,a)>"),pb:s("r<+influence,light(o,aC)>"),gf:s("r<+influence,light(o,aD)>"),fA:s("r<+influence,source(o,e4)>"),o5:s("r<K>"),u:s("r<E>"),oZ:s("r<dP>"),C:s("r<q>"),c8:s("r<bq>"),bH:s("r<aU>"),cL:s("r<bc>"),ao:s("r<a6<az>>"),mX:s("r<a6<aB>>"),w:s("r<aD>"),s:s("r<x>"),p:s("r<dZ>"),bV:s("r<T>"),G:s("r<a>"),k5:s("r<e4>"),is:s("r<hk>"),dz:s("r<bP<aq>>"),bR:s("r<bP<ba>>"),fS:s("r<bP<bq>>"),mQ:s("r<bP<be>>"),n:s("r<o>"),dG:s("r<@>"),t:s("r<j>"),dM:s("r<z?>"),T:s("dt"),m:s("N"),dY:s("bI"),dX:s("aG<@>"),aw:s("c0<@>"),c:s("b9<a>"),pg:s("C<aA>"),_:s("C<ao>"),O:s("C<Q>"),bF:s("C<x>"),gs:s("C<@>"),f4:s("C<j>"),iO:s("ap<x,a2>"),f7:s("aH<x,b_>"),iE:s("aH<x,Q>"),mz:s("O<a,a>"),oz:s("aq"),W:s("b2"),l0:s("aJ"),b:s("a8"),K:s("z"),nL:s("aB"),aZ:s("dJ"),dh:s("aT"),po:s("dK"),z:s("Q"),oe:s("cH"),q:s("aL"),lZ:s("rE"),aK:s("+()"),o7:s("+(aJ,ba)"),p3:s("+(aE,be)"),eJ:s("+influence,light(o,aC)"),jX:s("+influence,light(o,aD)"),nA:s("+influence,source(o,e4)"),ks:s("E"),ml:s("bb<b8,bq>"),kk:s("bb<b2,aq>"),ll:s("bb<aJ,ba>"),ox:s("bb<aE,be>"),L:s("q"),Y:s("aU"),iU:s("bc"),U:s("bM<x>"),nO:s("bM<j>"),d:s("a6<az>"),k:s("a6<aB>"),oU:s("fL"),l:s("bN"),dB:s("ar"),N:s("x"),g9:s("dZ"),lu:s("aE"),aJ:s("L"),do:s("bs"),cx:s("c7"),mL:s("fW"),a:s("a"),pc:s("a(a)"),r:s("as"),kh:s("ac<as>"),cz:s("R<as>"),dp:s("cQ"),e:s("a3<@>"),cU:s("a3<~>"),mp:s("eb<z?,z?>"),lX:s("bO"),a1:s("cT"),hh:s("hj"),mK:s("cX"),V:s("er"),R:s("es"),y:s("w"),mR:s("w(cm)"),iW:s("w(z)"),iV:s("w(as)"),i:s("o"),A:s("@"),mY:s("@()"),x:s("@(z)"),D:s("@(z,bN)"),S:s("j"),dl:s("ct?"),gK:s("bF<a8>?"),kM:s("r<z?>?"),mU:s("N?"),aE:s("C<aC>?"),X:s("z?"),co:s("dL?"),cB:s("dX?"),jv:s("x?"),nh:s("e0?"),F:s("c8<@,@>?"),g:s("hh?"),fU:s("w?"),dA:s("o?"),aV:s("j?"),jh:s("au?"),i1:s("~(cv)?"),E:s("au"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.cB=J.f8.prototype
B.b=J.r.prototype
B.d=J.ds.prototype
B.a=J.cz.prototype
B.E=J.bH.prototype
B.cC=J.bI.prototype
B.cD=J.dv.prototype
B.ar=A.dD.prototype
B.bc=J.fv.prototype
B.aH=J.c7.prototype
B.o=new A.d7(0,"opaque")
B.ag=new A.d7(1,"masked")
B.G=new A.d7(2,"blended")
B.bH=new A.eE(0,"world")
B.aK=new A.eE(1,"camera")
B.bI=new A.d9(0,"linear")
B.bJ=new A.d9(1,"inverseSquare")
B.bK=new A.d9(2,"constant")
B.a1=new A.hL(0,"add")
B.bL=new A.cn(0,"zero")
B.a2=new A.cn(1,"one")
B.A=new A.eG(0,"alpha")
B.I=new A.eG(1,"additive")
B.ah=new A.hM(0,"volume")
B.hR=new A.i_()
B.aM=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.bN=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.bS=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.bO=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.bR=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.bQ=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.bP=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.aN=function(hooks) { return hooks; }

B.q=new A.z()
B.bT=new A.fr()
B.p=new A.ju()
B.i2=new A.jy(0,"volume")
B.i1=new A.jx(0,"outward")
B.bV=new A.fK()
B.f=new A.a(0,1,0)
B.v=new A.a(0,-1,0)
B.a_=new A.v(1,1,1)
B.bW=new A.aD()
B.hB=new A.bv(0,"position")
B.hG=new A.as(B.hB,0,3)
B.bE=new A.bv(1,"normal")
B.hH=new A.as(B.bE,3,3)
B.aJ=new A.bv(6,"tangent4")
B.hL=new A.as(B.aJ,6,4)
B.hC=new A.bv(2,"color")
B.hI=new A.as(B.hC,10,4)
B.hD=new A.bv(4,"alpha")
B.hJ=new A.as(B.hD,14,1)
B.hE=new A.bv(5,"uv0")
B.hK=new A.as(B.hE,15,2)
B.hF=new A.bv(8,"legacyMaterialEffect")
B.hM=new A.as(B.hF,17,1)
B.T=s([B.hG,B.hH,B.hL,B.hI,B.hJ,B.hK,B.hM],A.bU("r<as>"))
B.ai=new A.jK()
B.bX=new A.jQ()
B.bY=new A.hg()
B.J=new A.ho()
B.a3=new A.hv()
B.ho=new A.a(3.5,4.2,-7.5)
B.R=new A.a(0,0.5,0)
B.bZ=new A.aA(B.ho,B.R,1.15)
B.hd=new A.a(0,4.5,11)
B.c_=new A.aA(B.hd,B.R,1.05)
B.hy=new A.a(-6.5,2.8,-5)
B.hn=new A.a(-0.5,0.5,0)
B.c0=new A.aA(B.hy,B.hn,0.9)
B.hx=new A.a(-8.5,4,2)
B.hv=new A.a(0,0.5,0.5)
B.c1=new A.aA(B.hx,B.hv,1)
B.fZ=new A.a(-3.5,2,8.5)
B.h9=new A.a(0.5,0.5,0)
B.c2=new A.aA(B.fZ,B.h9,1.1)
B.h1=new A.a(9,7,-14)
B.bz=new A.a(0,-1,-40)
B.c3=new A.aA(B.h1,B.bz,1.05)
B.hi=new A.a(8,3.2,5.5)
B.hg=new A.a(1,0.8,0)
B.c4=new A.aA(B.hi,B.hg,0.95)
B.c5=new A.de(0,"normal")
B.c7=new A.de(3,"tangent")
B.aO=new A.eM(0,"volume")
B.aP=new A.eM(1,"edge")
B.c6=new A.de(1,"radialOutward")
B.c8=new A.cs(0.3,0,B.f,B.aP,B.c6)
B.M=new A.df(0,"colorOnly")
B.aQ=new A.df(1,"colorAndDepth")
B.aj=new A.df(2,"depthOnly")
B.ak=new A.hV(1,"srgb")
B.aR=new A.hW(1,"base")
B.a4=new A.hX(1,"back")
B.a5=new A.i0(0,"less")
B.hc=new A.a(0.6,-1,0.4)
B.cL=new A.v(1,0.95,0.88)
B.c9=new A.ct(B.hc,B.cL,2.4)
B.S=new A.dm(0,"opaque")
B.ca=new A.dm(1,"masked")
B.w=new A.dm(2,"blended")
B.aS=new A.cu(!1,B.a5,!1,!0,B.a2,B.a2,B.a1,!1,B.a4,!0,!1,!0,!0,!0,!0,!1)
B.aL=new A.cn(2,"srcAlpha")
B.bM=new A.cn(3,"oneMinusSrcAlpha")
B.cb=new A.cu(!0,B.a5,!1,!0,B.aL,B.bM,B.a1,!0,B.a4,!0,!1,!0,!0,!0,!0,!1)
B.cc=new A.cu(!0,B.a5,!1,!0,B.aL,B.a2,B.a1,!0,B.a4,!0,!1,!0,!0,!0,!0,!1)
B.cV=new A.v(0.03,0.03,0.04)
B.N=new A.v(0,0,0)
B.dx=s([],t.h)
B.ap=s([],t.w)
B.dy=s([],t.k5)
B.dz=s([],A.bU("r<rG>"))
B.cd=new A.eY(B.cV,B.N,0,1,null,null,B.a_,0.02,0,0.7,0.35,1,12,1,1,1,1,1,1,1,0.003,B.N,0,0,B.a_,0,null,B.dx,B.ap,B.dy,B.dz,null)
B.ce=new A.a2(0,0,0)
B.cf=new A.cw(0,"idle")
B.X=new A.cw(1,"active")
B.cg=new A.cw(2,"ended")
B.ch=new A.cw(3,"aborted")
B.al=new A.dp(0,"outside")
B.ci=new A.dp(1,"intersects")
B.cj=new A.dp(2,"inside")
B.ck=new A.f0(0,"vertex")
B.aT=new A.f0(1,"indices")
B.aU=new A.ii(0,"staticDraw")
B.l=new A.f1(0,"ready")
B.Y=new A.f1(1,"lost")
B.cl=new A.cx(0,"color")
B.aV=new A.cx(1,"colorAndGlow")
B.cm=new A.cx(2,"colorDepthGlow")
B.am=new A.cx(3,"depthOnly")
B.Z=new A.f3(1,"linear")
B.a6=new A.f4(0,"clampToEdge")
B.cn=new A.f2(1,1,1,!1,B.Z,B.Z,B.a6,1)
B.aW=new A.f3(2,"linearMipmapLinear")
B.co=new A.f4(1,"repeat")
B.cp=new A.bi(0,"beforeShadow")
B.cq=new A.bi(2,"beforeDepth")
B.an=new A.bi(3,"afterDepth")
B.aX=new A.bi(4,"beforeWorld")
B.cr=new A.bi(5,"afterWorld")
B.K=new A.bi(6,"afterResolve")
B.cs=new A.bi(9,"beforePresent")
B.aY=new A.b0(0,"readBeforeWrite")
B.ct=new A.b0(1,"duplicateWriter")
B.cu=new A.b0(2,"sampledMultisampledAttachment")
B.ao=new A.b0(3,"invalidResolve")
B.cv=new A.b0(4,"formatOrSizeMismatch")
B.cw=new A.b0(5,"unversionedReadWrite")
B.cx=new A.b0(6,"invalidHistoryRead")
B.cy=new A.b0(7,"dependencyCycle")
B.cz=new A.b0(8,"missingCapability")
B.aZ=new A.cy(0,"wrongKind")
B.b_=new A.cy(1,"staleGeneration")
B.cA=new A.cy(2,"doubleRelease")
B.a7=new A.cy(3,"releasedResource")
B.hS=new A.v(0.25,0.55,1)
B.hT=new A.v(1,0.6,0.1)
B.b0=new A.v(0.02,0.03,0.05)
B.cI=new A.v(0.06,0.08,0.12)
B.cJ=new A.v(1,0.25,0.25)
B.cK=new A.v(0.08,0.02,0.04)
B.hU=new A.v(0.06,0.08,0.11)
B.cO=new A.v(0.22,0.48,0.95)
B.cP=new A.v(0.95,0.12,0.22)
B.hV=new A.v(0.1,0.12,0.15)
B.cQ=new A.v(0.25,0.5,1)
B.cR=new A.v(0.04,0.05,0.07)
B.cS=new A.v(0.04,0.08,0.16)
B.hW=new A.v(0.05,0.07,0.1)
B.cT=new A.v(0.92,0.94,0.97)
B.cU=new A.v(0.12,0.15,0.2)
B.cX=new A.v(0.92,0.35,0.25)
B.cY=new A.v(0.1,0.85,0.45)
B.hX=new A.v(0.92,0.94,0.96)
B.d_=new A.v(0.18,0.42,0.98)
B.d0=new A.v(0.2,1,0.45)
B.hY=new A.v(0.85,0.85,0.88)
B.d1=new A.v(0.2,0.85,1)
B.d2=new A.v(0.03,0.04,0.06)
B.b1=new A.v(0.015,0.02,0.03)
B.d3=new A.v(1,0.85,0.35)
B.hZ=new A.v(0.12,0.14,0.18)
B.d4=new A.v(0.98,0.12,0.22)
B.d6=new A.v(0.5,0.6,0.75)
B.d7=new A.v(0.1,0.88,0.42)
B.i_=new A.v(0.25,0.75,1)
B.dm=s([0,8,4,14,12],t.t)
B.de=s([0,16,2,10,8],t.t)
B.d9=s([0,12,1,17,16],t.t)
B.dd=s([1,12,14,5,9],t.t)
B.dl=s([1,9,11,3,17],t.t)
B.dn=s([2,13,15,6,10],t.t)
B.dC=s([2,16,17,3,13],t.t)
B.dq=s([3,11,7,15,13],t.t)
B.dD=s([4,8,10,6,18],t.t)
B.d8=s([4,18,19,5,14],t.t)
B.db=s([5,19,7,11,9],t.t)
B.dj=s([6,15,7,19,18],t.t)
B.da=s([B.dm,B.de,B.d9,B.dd,B.dl,B.dn,B.dC,B.dq,B.dD,B.d8,B.db,B.dj],t.fC)
B.dc=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.df=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale","uShadowMapTexelSize","uShadowFilterRadius","uShadowBias","uReflectionColor","uReflectionIntensity","uReflectionConfidence","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uSpecularScale","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness","uSurfaceSnowCoverage","uSurfaceDissolution","uThermalSourceCount","uThermalSourcePosition0","uThermalSourceRadius0","uThermalSourceDissolution0","uThermalSourcePosition1","uThermalSourceRadius1","uThermalSourceDissolution1","uThermalSourcePosition2","uThermalSourceRadius2","uThermalSourceDissolution2","uThermalSourcePosition3","uThermalSourceRadius3","uThermalSourceDissolution3"],t.s)
B.dg=s(["uQuantizationBits","uDitherStrength"],t.s)
B.dh=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.di=s(["uNear","uFar","uLightDir","uLightColor","uShaftIntensity","uFogDensity","uAnisotropy","uViewProjection","uView","uInverseProjection","uVolumetricAlbedo","uVolumetricHeightFalloff","uVolumetricDustDensity","uVolumetricJitter","uVolumetricIntensity","uVolumetricSampleCount"],t.s)
B.dk=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.dp=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.bD=new A.a(0,0.35,0)
B.i4=new A.e7(A.qZ())
B.cG=new A.b9(0,B.bD,t.c)
B.hp=new A.a(0,0.65,0)
B.cF=new A.b9(2,B.hp,t.c)
B.cE=new A.b9(4,B.bD,t.c)
B.b2=s([B.cG,B.cF,B.cE],A.bU("r<b9<a>>"))
B.bU=new A.dJ()
B.dr=s([B.bU],t.eQ)
B.h4=new A.a(0,3.2,-6.5)
B.h2=new A.a(6.5,1.8,-3.5)
B.fR=new A.a(7.5,4,3.5)
B.hq=new A.a(2.5,2.2,7)
B.hA=new A.a(-4.5,3.5,6)
B.h_=new A.a(-7.5,1.5,-1)
B.hr=new A.a(-5,4.2,-5.5)
B.ds=s([B.h4,B.h2,B.fR,B.hq,B.hA,B.h_,B.hr],t.G)
B.dt=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale"],t.s)
B.du=s([],t.eQ)
B.dw=s([],t.u)
B.dv=s([],t.p)
B.as=new A.cI(2,"high")
B.e9={shadows:0,ssao:1,bloom:2,dof:3,grade:4,volumetric:5}
B.eV=new A.b7(B.e9,6,t.P)
B.eB=new A.aL(B.as,B.eV)
B.e2={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.eS=new A.b7(B.e2,5,t.P)
B.bg=new A.aL(B.as,B.eS)
B.ey=new A.cI(1,"standard")
B.ea={shadows:0}
B.eW=new A.b7(B.ea,1,t.P)
B.eA=new A.aL(B.ey,B.eW)
B.be=new A.cI(0,"safe")
B.b8={}
B.aa=new A.b7(B.b8,0,t.P)
B.bf=new A.aL(B.be,B.aa)
B.aq=s([B.eB,B.bg,B.eA,B.bf],A.bU("r<aL>"))
B.dA=s(["uExposure","uVignette","uGrain","uOutputEncoding","uToneMap","uClearColor","uSkyHorizon","uSkyZenith","uSkyGround","uSkyEnabled","uSkyHorizonGlow","uSkyStarDensity","uSkyTexture","uSkyTextureEnabled","uSkyRotation","uSkyExposure","uSkyTextureSrgb","uInverseProjection","uInverseView","uCameraPosition","uCloudCoverage","uCloudDensity","uCloudBaseHeight","uCloudThickness","uCloudScale","uCloudWind","uCloudPhase","uCloudDetail","uCloudSilverLining","uCloudSampleCount","uCloudLightDirection","uCloudLightColor","uCloudLightIntensity"],t.s)
B.av=new A.ar(0,"depthTest")
B.aw=new A.ar(1,"depthFunc")
B.ax=new A.ar(2,"depthWrite")
B.ay=new A.ar(3,"blendEnable")
B.az=new A.ar(4,"blendFunc")
B.aA=new A.ar(5,"blendEquation")
B.aB=new A.ar(6,"cullEnable")
B.aC=new A.ar(7,"cullFace")
B.bp=new A.ar(8,"frontFace")
B.fe=new A.ar(9,"stencilEnable")
B.bn=new A.ar(10,"colorMask")
B.bo=new A.ar(11,"scissorEnable")
B.dB=s([B.av,B.aw,B.ax,B.ay,B.az,B.aA,B.aB,B.aC,B.bp,B.fe,B.bn,B.bo],A.bU("r<ar>"))
B.dE=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.dF=s(["uBloomStrength"],t.s)
B.dG=s(["uLutSize","uStrength"],t.s)
B.dH=s(["uTexelSize","uNear","uFar"],t.s)
B.b3=s(["uTexelStep"],t.s)
B.dI=s(["uVolumetricStrength"],t.s)
B.dJ=new A.fe(0,"once")
B.dK=new A.fe(1,"loop")
B.eb={uAlbedo:0}
B.b4=new A.a_(B.eb,[0],t.I)
B.ei={uSsaoRaw:0,uSceneDepth:1}
B.dL=new A.a_(B.ei,[0,1],t.I)
B.ef={uScene:0,uHistory:1}
B.dM=new A.a_(B.ef,[0,1],t.I)
B.e6={aPosition:0,aUvMat:1}
B.b5=new A.a_(B.e6,[0,4],t.I)
B.eg={uScene:0,uLut:1}
B.dN=new A.a_(B.eg,[0,1],t.I)
B.eh={uSource:0}
B.b6=new A.a_(B.eh,[0],t.I)
B.e8={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.dO=new A.a_(B.e8,[0,1,2,3,4,5,6],t.I)
B.e4={uSharp:0,uBlurred:1,uSceneDepth:2}
B.dP=new A.a_(B.e4,[0,1,2],t.I)
B.ej={uTex:0,uSkyTexture:1}
B.dQ=new A.a_(B.ej,[0,1],t.I)
B.ec={uBloom:0}
B.dR=new A.a_(B.ec,[0],t.I)
B.ed={uSceneDepth:0}
B.b7=new A.a_(B.ed,[0],t.I)
B.ee={uScene:0}
B.dS=new A.a_(B.ee,[0],t.I)
B.B=new A.a_(B.b8,[],t.I)
B.e1={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.dT=new A.a_(B.e1,[0,1,2,3,4,5,6],t.I)
B.ek={uVolumetric:0}
B.dU=new A.a_(B.ek,[0],t.I)
B.e7={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.dV=new A.a_(B.e7,[0,1,2,3],t.I)
B.i=new A.fg(0,"srgb")
B.e=new A.fg(1,"linear")
B.dW=new A.aq("vessel_hull_pbr",null,B.i,0.95,0.95,0.98,null,0,null,B.e,1,null,B.e,0.25,0.85,1,0,0.2,null,0,1,1,0,0,B.o,0.5,!1,!0,!1,!1)
B.dX=new A.aq("water_pbr",null,B.i,0.08,0.35,0.65,null,0,null,B.e,1,null,B.e,0.08,0.45,1,0.9,0.05,null,0,1,1,0,0,B.o,0.5,!1,!0,!1,!1)
B.dY=new A.aq("vfx_confetti_mat",null,B.i,1,0.85,0.2,null,1,null,B.e,1,null,B.e,0.3,0.2,1,0,0.2,null,0,1,1,0,0,B.o,0.5,!1,!0,!1,!1)
B.dZ=new A.aq("buoy_beacon",null,B.i,1,0.45,0.1,null,1.2,null,B.e,1,null,B.e,0.35,0.5,1,0,0.2,null,0,1,1,0,0,B.o,0.5,!1,!0,!1,!1)
B.e_=new A.aq("asteroid_pbr",null,B.i,0.28,0.32,0.42,null,0,null,B.e,1,null,B.e,0.65,0.4,1,0,0.2,null,0,1,1,0,0,B.o,0.5,!1,!0,!1,!1)
B.e0=new A.aq("conduit_emissive_rail",null,B.i,0.1,0.85,1,null,1.8,null,B.e,1,null,B.e,0.25,0.85,1,0,0.2,null,0,1,1,0,0,B.o,0.5,!1,!0,!1,!1)
B.a0=new A.cD(0,"billboard")
B.b9=new A.cD(1,"velocityAligned")
B.O=new A.cD(2,"velocityStretched")
B.el=new A.cD(3,"axial")
B.ba=new A.fs(0,"bounce")
B.bb=new A.fs(1,"kill")
B.h=new A.a(0,0,0)
B.em=new A.cE(B.h,B.f,0.4,0.1,B.ba)
B.cZ=new A.v(0.2,0.05,0.02)
B.en=new A.aT(1,B.cZ)
B.cM=new A.v(1,1,0.8)
B.eo=new A.aT(0,B.cM)
B.cN=new A.v(1,0.65,0.1)
B.ep=new A.aT(0.3,B.cN)
B.cH=new A.v(0.85,0.15,0.02)
B.eq=new A.aT(0.7,B.cH)
B.C=new A.cF(0,"staticFrame")
B.er=new A.cF(1,"animatedOverLifetime")
B.es=new A.cF(2,"loopingAnimation")
B.et=new A.cF(3,"random")
B.eu=new A.fu(0,1,null)
B.ev=new A.c5(null,0.8)
B.bd=new A.c5(null,0)
B.ew=new A.c5(B.f,0.05)
B.aE=new A.cP(1,"reinhard")
B.ex=new A.fw(1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,8,0,0,0,0,0,0,!1,B.aE)
B.ez=new A.cI(4,"shipping")
B.e3={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.eU=new A.b7(B.e3,7,t.P)
B.i0=new A.aL(B.ez,B.eU)
B.t=new A.bL(0,0,0,1)
B.at=new A.cK(0,"constructed")
B.eC=new A.cK(1,"initializing")
B.a8=new A.cK(2,"ready")
B.a9=new A.cK(3,"contextLost")
B.j=new A.dS(0,"read")
B.m=new A.dS(1,"write")
B.L=new A.dS(2,"historyRead")
B.y=new A.fC(0,"rgba8")
B.eD=new A.Y("dofBlurH",B.y,192,108,1,0)
B.eE=new A.Y("dofBlurV",B.y,192,108,1,0)
B.eF=new A.Y("dofOutput",B.y,384,216,1,0)
B.bh=new A.fC(2,"depth24")
B.eG=new A.Y("shadowMap",B.bh,512,512,1,0)
B.eH=new A.Y("volumetricLight",B.y,192,108,1,0)
B.eI=new A.Y("sceneColor",B.y,384,216,1,1)
B.eJ=new A.Y("ssaoRaw",B.y,192,108,1,0)
B.eK=new A.Y("ssaoBlurred",B.y,192,108,1,0)
B.eL=new A.Y("gradeOutput",B.y,384,216,1,0)
B.eM=new A.Y("vhsOutput",B.y,384,216,1,0)
B.eN=new A.Y("sceneDepth",B.bh,384,216,1,0)
B.eO=new A.Y("bloomBlurH",B.y,192,108,1,0)
B.eP=new A.Y("bloomBlurV",B.y,192,108,1,0)
B.eQ=new A.Y("present",B.y,384,216,1,0)
B.au=new A.Y("sceneColor",B.y,384,216,1,0)
B.eR=new A.Y("ps1Output",B.y,384,216,1,0)
B.e5={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8,volumetric:9}
B.eT=new A.b7(B.e5,10,t.P)
B.bk=new A.cL(2,"link")
B.eX=new A.dW(B.bk,"gl.createProgram() returned null")
B.bi=new A.cL(0,"vertex")
B.bj=new A.cL(1,"fragment")
B.bl=new A.cL(3,"validation")
B.eY=new A.fH(0,"full")
B.eZ=new A.fH(2,"culled")
B.cW=new A.v(0.12,0.16,0.24)
B.d5=new A.v(0.03,0.06,0.14)
B.f_=new A.dX("showcase_sky",null,B.cW,B.d5,B.b1,0.12,0.005,0,1,!0,0.32,0.4,650,350,0.0012,0,0,0,0.55,0.25,12)
B.f0=new A.am(0,"polarNight")
B.f1=new A.am(1,"astronomicalDawn")
B.f2=new A.am(10,"civilDusk")
B.f3=new A.am(11,"nauticalDusk")
B.f4=new A.am(12,"astronomicalDusk")
B.f5=new A.am(13,"night")
B.f6=new A.am(14,"polarDay")
B.f7=new A.am(2,"nauticalDawn")
B.f8=new A.am(3,"civilDawn")
B.f9=new A.am(4,"sunrise")
B.bm=new A.am(5,"morning")
B.fa=new A.am(6,"solarNoon")
B.fb=new A.am(7,"afternoon")
B.fc=new A.am(8,"goldenHour")
B.fd=new A.am(9,"sunset")
B.ff=new A.cO(0,"birth")
B.bq=new A.cO(1,"death")
B.aD=new A.cO(2,"collision")
B.br=new A.cO(3,"trail")
B.bs=new A.cP(0,"off")
B.fg=new A.cP(2,"aces")
B.aF=new A.cP(3,"agx")
B.u=new A.a(1,1,1)
B.F=new A.T(B.h,B.t,1,B.u)
B.fh=A.aZ("rt")
B.fi=A.aZ("ru")
B.fj=A.aZ("i6")
B.fk=A.aZ("i7")
B.fl=A.aZ("ox")
B.fm=A.aZ("oy")
B.fn=A.aZ("oz")
B.fo=A.aZ("N")
B.fp=A.aZ("z")
B.fq=A.aZ("pv")
B.fr=A.aZ("pw")
B.fs=A.aZ("px")
B.ft=A.aZ("e0")
B.c=new A.bu(0,"float1")
B.U=new A.bu(1,"float2")
B.n=new A.bu(2,"float3")
B.fu=new A.bu(3,"float4")
B.x=new A.bu(4,"mat4")
B.bt=new A.bu(5,"mat4Array")
B.aG=new A.i(B.c,0)
B.bu=new A.i(B.c,1)
B.P=new A.bu(6,"sampler")
B.z=new A.i(B.P,0)
B.V=new A.i(B.P,1)
B.bv=new A.i(B.P,2)
B.fv=new A.i(B.P,3)
B.fw=new A.i(B.P,4)
B.fx=new A.i(B.P,5)
B.fy=new A.i(B.P,6)
B.ab=new A.D(0,0)
B.bw=new A.D(0,1)
B.aI=new A.D(0.5,0.5)
B.ac=new A.D(1,0)
B.bx=new A.D(1,1)
B.fz=new A.D(-0.7,0.7)
B.fA=new A.D(0.8,-0.6)
B.fB=new A.D(0.3,0.95)
B.fC=new A.D(1,0.2)
B.fD=new A.D(0.5,1)
B.r=new A.a(0,0,1)
B.H=new A.a(0,0,-1)
B.fE=new A.a(0,10,0)
B.fF=new A.a(0,1,1)
B.fG=new A.a(0,2,0)
B.by=new A.a(0,2,5)
B.fH=new A.a(0,2,7)
B.fI=new A.a(0,3,8)
B.fJ=new A.a(0,5,0)
B.fK=new A.a(0,6,0)
B.fL=new A.a(0,-3,0)
B.fM=new A.a(0,-6,0)
B.fN=new A.a(10,1,10)
B.fO=new A.a(10,-5,2)
B.fP=new A.a(12,1,12)
B.fQ=new A.a(12,5,12)
B.k=new A.a(1,0,0)
B.fS=new A.a(1,0,1)
B.fT=new A.a(1,1,0)
B.fU=new A.a(1,1,-1)
B.fV=new A.a(1,-1,1)
B.fW=new A.a(1,-1,-1)
B.fX=new A.a(20,10,20)
B.Q=new A.a(0,0.2,0)
B.fY=new A.a(0.15,-0.75,0.1)
B.W=new A.a(0,-9.81,0)
B.h0=new A.a(8,4,8)
B.h3=new A.a(0.05,0.45,0.02)
B.bA=new A.a(0,0.8,0)
B.h5=new A.a(1/0,1/0,1/0)
B.h6=new A.a(0.9,-1.9,0.4)
B.h7=new A.a(0.015,-0.015,0.01)
B.h8=new A.a(1,0.3,0.2)
B.ad=new A.a(0,-0.9,0)
B.bB=new A.a(0,0.4,0)
B.ha=new A.a(0.8,-0.5,0)
B.hb=new A.a(0,-2.5,0)
B.he=new A.a(0.04,-0.03,0.02)
B.hf=new A.a(0.4,-1.2,0.2)
B.hh=new A.a(4,0.5,4)
B.bC=new A.a(0,-0.2,-1)
B.D=new A.a(-1,0,0)
B.hj=new A.a(-1,1,1)
B.hk=new A.a(-1,1,-1)
B.hl=new A.a(-1,-1,1)
B.hm=new A.a(-1,-1,-1)
B.hs=new A.a(0.3,0.85,0.2)
B.ht=new A.a(0,0.6,0)
B.hu=new A.a(-14.5,0,7)
B.hw=new A.a(0.12,-0.12,0.08)
B.hz=new A.a(-1/0,-1/0,-1/0)
B.i3=new A.jJ(0,"position")
B.bF=new A.h4(0,"horizontal")
B.hN=new A.h4(1,"vertical")
B.bG=new A.h9(0,"horizontal")
B.hO=new A.h9(1,"vertical")
B.hP=new A.e7(A.r_())
B.ae=new A.ei(0,"empty")
B.hQ=new A.ei(1,"cpuReady")
B.af=new A.ei(4,"released")})();(function staticFields(){$.k9=null
$.aO=A.d([],A.bU("r<z>"))
$.mY=null
$.mz=null
$.my=null
$.nV=null
$.nQ=null
$.nX=null
$.kN=null
$.kS=null
$.mm=null
$.kb=A.d([],A.bU("r<C<z>?>"))
$.d_=null
$.ew=null
$.ex=null
$.md=!1
$.W=B.J
$.mV=5000
$.mH=2000})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"rw","o1",()=>A.kO("_$dart_dartClosure"))
s($,"rv","lC",()=>A.kO("_$dart_dartClosure_dartJSInterop"))
s($,"rT","oc",()=>A.d([new J.fa()],A.bU("r<dV>")))
s($,"rH","o2",()=>A.bt(A.jI({
toString:function(){return"$receiver$"}})))
s($,"rI","o3",()=>A.bt(A.jI({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"rJ","o4",()=>A.bt(A.jI(null)))
s($,"rK","o5",()=>A.bt(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"rN","o8",()=>A.bt(A.jI(void 0)))
s($,"rO","o9",()=>A.bt(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"rM","o7",()=>A.bt(A.nc(null)))
s($,"rL","o6",()=>A.bt(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"rQ","ob",()=>A.bt(A.nc(void 0)))
s($,"rP","oa",()=>A.bt(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"rR","mv",()=>A.pK())
s($,"rS","ez",()=>A.hG(B.fp))
s($,"rs","o0",()=>B.au.dI())
s($,"rB","mu",()=>A.fq(A.d([255,255,255,255],t.t)))
s($,"rx","mq",()=>A.fq(A.d([128,128,255,255],t.t)))
s($,"rz","ms",()=>A.fq(A.d([255,255,255,255],t.t)))
s($,"ry","mr",()=>A.fq(A.d([255,255,255,255],t.t)))
s($,"rA","mt",()=>A.fq(A.d([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.cC,SharedArrayBuffer:A.cC,ArrayBufferView:A.dG,DataView:A.fi,Float32Array:A.dD,Float64Array:A.fj,Int16Array:A.fk,Int32Array:A.fl,Int8Array:A.fm,Uint16Array:A.fn,Uint32Array:A.fo,Uint8ClampedArray:A.dH,CanvasPixelArray:A.dH,Uint8Array:A.fp})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.aj.$nativeSuperclassTag="ArrayBufferView"
A.ec.$nativeSuperclassTag="ArrayBufferView"
A.ed.$nativeSuperclassTag="ArrayBufferView"
A.dE.$nativeSuperclassTag="ArrayBufferView"
A.ee.$nativeSuperclassTag="ArrayBufferView"
A.ef.$nativeSuperclassTag="ArrayBufferView"
A.dF.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$6=function(a,b,c,d,e,f){return this(a,b,c,d,e,f)}
Function.prototype.$5=function(a,b,c,d,e){return this(a,b,c,d,e)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.kT
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()