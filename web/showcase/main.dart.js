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
if(a[b]!==s){A.pP(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.b(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.l_(b)
return new s(c,this)}:function(){if(s===null)s=A.l_(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.l_(a).prototype
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
l5(a,b,c,d){return{i:a,p:b,e:c,x:d}},
l1(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.l3==null){A.pz()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.c(A.lR("Return interceptor for "+A.p(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.jd
if(o==null)o=$.jd=A.jS(n)
p=q[o]}if(p!=null)return p
p=A.pF(a)
if(p!=null)return p
if(typeof a=="function")return B.bV
s=Object.getPrototypeOf(a)
if(s==null)return B.aM
if(s===Object.prototype)return B.aM
if(typeof q=="function"){o=$.jd
if(o==null)o=$.jd=A.jS(n)
Object.defineProperty(q,o,{value:B.an,enumerable:false,writable:true,configurable:true})
return B.an}return B.an},
lq(a,b){if(a<0||a>4294967295)throw A.c(A.aU(a,0,4294967295,"length",null))
return J.ls(new Array(a),b)},
lr(a,b){if(a<0)throw A.c(A.j("Length must be a non-negative integer: "+a,null))
return A.b(new Array(a),b.h("r<0>"))},
ks(a,b){if(a<0)throw A.c(A.j("Length must be a non-negative integer: "+a,null))
return A.b(new Array(a),b.h("r<0>"))},
ls(a,b){var s=A.b(a,b.h("r<0>"))
s.$flags=1
return s},
nb(a,b){var s=t.e8
return J.le(s.a(a),s.a(b))},
lt(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
nc(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.lt(r))break;++b}return b},
nd(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.h(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.lt(q))break}return b},
c_(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cX.prototype
return J.eC.prototype}if(typeof a=="string")return J.bp.prototype
if(a==null)return J.cY.prototype
if(typeof a=="boolean")return J.eB.prototype
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bq.prototype
if(typeof a=="symbol")return J.d0.prototype
if(typeof a=="bigint")return J.cZ.prototype
return a}if(a instanceof A.y)return a
return J.l1(a)},
jR(a){if(typeof a=="string")return J.bp.prototype
if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bq.prototype
if(typeof a=="symbol")return J.d0.prototype
if(typeof a=="bigint")return J.cZ.prototype
return a}if(a instanceof A.y)return a
return J.l1(a)},
cF(a){if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bq.prototype
if(typeof a=="symbol")return J.d0.prototype
if(typeof a=="bigint")return J.cZ.prototype
return a}if(a instanceof A.y)return a
return J.l1(a)},
pv(a){if(typeof a=="number")return J.cg.prototype
if(typeof a=="string")return J.bp.prototype
if(a==null)return a
if(!(a instanceof A.y))return J.bO.prototype
return a},
pw(a){if(typeof a=="string")return J.bp.prototype
if(a==null)return a
if(!(a instanceof A.y))return J.bO.prototype
return a},
aG(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.c_(a).a3(a,b)},
kn(a,b){if(typeof b==="number")if(Array.isArray(a)||A.pD(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.cF(a).t(a,b)},
h3(a,b,c){return J.cF(a).E(a,b,c)},
h4(a,b){return J.cF(a).j(a,b)},
le(a,b){return J.pv(a).O(a,b)},
ko(a,b){return J.cF(a).a_(a,b)},
S(a){return J.c_(a).gP(a)},
a6(a){return J.cF(a).gC(a)},
bE(a){return J.jR(a).gu(a)},
e3(a){return J.c_(a).gN(a)},
mR(a,b){return J.pw(a).cR(a,b)},
c4(a){return J.c_(a).i(a)},
ey:function ey(){},
eB:function eB(){},
cY:function cY(){},
d_:function d_(){},
br:function br(){},
eU:function eU(){},
bO:function bO(){},
bq:function bq(){},
cZ:function cZ(){},
d0:function d0(){},
r:function r(a){this.$ti=a},
eA:function eA(){},
hE:function hE(a){this.$ti=a},
cI:function cI(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cg:function cg(){},
cX:function cX(){},
eC:function eC(){},
bp:function bp(){}},A={kt:function kt(){},
lu(a){return new A.d1("Field '"+a+"' has been assigned during initialization.")},
ne(a){return new A.d1("Field '"+a+"' has not been initialized.")},
a3(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
fd(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
bZ(a,b,c){return a},
l4(a){var s,r
for(s=$.aE.length,r=0;r<s;++r)if(a===$.aE[r])return!0
return!1},
iG(a,b,c,d){A.im(b,"start")
if(c!=null){A.im(c,"end")
if(b>c)A.m(A.aU(b,0,c,"start",null))}return new A.dt(a,b,c,d.h("dt<0>"))},
ez(){return new A.cr("No element")},
lp(){return new A.cr("Too many elements")},
cu:function cu(){},
cL:function cL(a,b){this.a=a
this.$ti=b},
dA:function dA(){},
cM:function cM(a,b){this.a=a
this.$ti=b},
d1:function d1(a){this.a=a},
iE:function iE(){},
aJ:function aJ(){},
Q:function Q(){},
dt:function dt(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ao:function ao(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
d6:function d6(a,b,c){this.a=a
this.b=b
this.$ti=c},
d7:function d7(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
O:function O(a,b,c){this.a=a
this.b=b
this.$ti=c},
a5:function a5(a,b,c){this.a=a
this.b=b
this.$ti=c},
K:function K(a,b,c){this.a=a
this.b=b
this.$ti=c},
an:function an(){},
dn:function dn(a,b){this.a=a
this.$ti=b},
dY:function dY(){},
ll(a,b,c){var s,r,q,p,o,n,m,l=A.v(a),k=A.d5(new A.ba(a,l.h("ba<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.A)(k),++i,p=o){r=k[i]
c.a(a.t(0,r))
o=p+1
q[r]=p}n=A.d5(new A.aS(a,l.h("aS<2>")),!0,c)
m=new A.V(q,n,b.h("@<0>").S(c).h("V<1,2>"))
m.$keys=k
return m}return new A.cQ(A.ng(a,b,c),b.h("@<0>").S(c).h("cQ<1,2>"))},
mZ(){throw A.c(A.bP("Cannot modify constant Set"))},
mD(a){var s=A.mC(a)
if(s!=null)return s
return"minified:"+a},
pD(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
p(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.c4(a)
return s},
eY(a){var s,r=$.lG
if(r==null)r=$.lG=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
nA(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.h(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
ih(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.w.cD(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
eZ(a){var s,r,q,p
if(a instanceof A.y)return A.aD(A.c1(a),null)
s=J.c_(a)
if(s===B.bU||s===B.bW||t.ak.b(a)){r=B.ar(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aD(A.c1(a),null)},
lH(a){var s,r,q
if(a==null||typeof a=="number"||A.kU(a))return J.c4(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bn)return a.i(0)
if(a instanceof A.aM)return a.cg(!0)
s=$.mQ()
for(r=0;r<1;++r){q=s[r].eM(a)
if(q!=null)return q}return"Instance of '"+A.eZ(a)+"'"},
ck(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
nx(a){var s=A.ck(a).getUTCFullYear()+0
return s},
nv(a){var s=A.ck(a).getUTCMonth()+1
return s},
nr(a){var s=A.ck(a).getUTCDate()+0
return s},
ns(a){var s=A.ck(a).getUTCHours()+0
return s},
nu(a){var s=A.ck(a).getUTCMinutes()+0
return s},
nw(a){var s=A.ck(a).getUTCSeconds()+0
return s},
nt(a){var s=A.ck(a).getUTCMilliseconds()+0
return s},
nq(a){var s=a.$thrownJsError
if(s==null)return null
return A.cG(s)},
lI(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.Z(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
c0(a){throw A.c(A.mu(a))},
h(a,b){if(a==null)J.bE(a)
throw A.c(A.jP(a,b))},
jP(a,b){var s,r="index"
if(!A.ml(b))return new A.aY(!0,b,r,null)
s=A.d(J.bE(a))
if(b<0||b>=s)return A.hD(b,s,a,r)
return new A.di(null,null,!0,b,r,"Value not in range")},
mu(a){return new A.aY(!0,a,null,null)},
e1(a){return a},
c(a){return A.Z(a,new Error())},
Z(a,b){var s
if(a==null)a=new A.bg()
b.dartException=a
s=A.pQ
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
pQ(){return J.c4(this.dartException)},
m(a,b){throw A.Z(a,b==null?new Error():b)},
bD(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.m(A.oG(a,b,c),s)},
oG(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.aH.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.dx("'"+s+"': Cannot "+o+" "+l+k+n)},
A(a){throw A.c(A.aI(a))},
bh(a){var s,r,q,p,o,n
a=A.pJ(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.b([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.iL(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
iM(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
lQ(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
ku(a,b){var s=b==null,r=s?null:b.method
return new A.eD(a,r,s?null:b.receiver)},
c3(a){var s
if(a==null)return new A.hU(a)
if(a instanceof A.cU){s=a.a
return A.bC(a,s==null?A.dZ(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bC(a,a.dartException)
return A.pg(a)},
bC(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
pg(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.d.dB(r,16)&8191)===10)switch(q){case 438:return A.bC(a,A.ku(A.p(s)+" (Error "+q+")",null))
case 445:case 5007:A.p(s)
return A.bC(a,new A.de())}}if(a instanceof TypeError){p=$.mG()
o=$.mH()
n=$.mI()
m=$.mJ()
l=$.mM()
k=$.mN()
j=$.mL()
$.mK()
i=$.mP()
h=$.mO()
g=p.ac(s)
if(g!=null)return A.bC(a,A.ku(A.U(s),g))
else{g=o.ac(s)
if(g!=null){g.method="call"
return A.bC(a,A.ku(A.U(s),g))}else if(n.ac(s)!=null||m.ac(s)!=null||l.ac(s)!=null||k.ac(s)!=null||j.ac(s)!=null||m.ac(s)!=null||i.ac(s)!=null||h.ac(s)!=null){A.U(s)
return A.bC(a,new A.de())}}return A.bC(a,new A.fh(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.ds()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bC(a,new A.aY(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.ds()
return a},
cG(a){var s
if(a instanceof A.cU)return a.b
if(a==null)return new A.dN(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.dN(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
h2(a){if(a==null)return J.S(a)
if(typeof a=="object")return A.eY(a)
return J.S(a)},
pt(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.E(0,a[s],a[r])}return b},
pu(a,b){var s,r=a.length
for(s=0;s<r;++s)b.j(0,a[s])
return b},
oT(a,b,c,d,e,f){t.Z.a(a)
switch(A.d(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.c(new A.j_("Unsupported number of arguments for wrapped closure"))},
cD(a,b){var s=a.$identity
if(!!s)return s
s=A.pn(a,b)
a.$identity=s
return s},
pn(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.oT)},
mY(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fb().constructor.prototype):Object.create(new A.c8(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.lk(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.mU(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.lk(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
mU(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.c("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.mS)}throw A.c("Error in functionType of tearoff")},
mV(a,b,c,d){var s=A.li
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
lk(a,b,c,d){if(c)return A.mX(a,b,d)
return A.mV(b.length,d,a,b)},
mW(a,b,c,d){var s=A.li,r=A.mT
switch(b?-1:a){case 0:throw A.c(new A.f3("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
mX(a,b,c){var s,r
if($.lg==null)$.lg=A.lf("interceptor")
if($.lh==null)$.lh=A.lf("receiver")
s=b.length
r=A.mW(s,c,a,b)
return r},
l_(a){return A.mY(a)},
mS(a,b){return A.dS(v.typeUniverse,A.c1(a.a),b)},
li(a){return a.a},
mT(a){return a.b},
lf(a){var s,r,q,p=new A.c8("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.c(A.j("Field name "+a+" not found.",null))},
jS(a){return v.getIsolateTag(a)},
mB(){return v.G},
pF(a){var s,r,q,p,o,n=A.U($.my.$1(a)),m=$.jQ[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jW[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bW($.mt.$2(a,n))
if(q!=null){m=$.jQ[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jW[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.kd(s)
$.jQ[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.jW[n]=s
return s}if(p==="-"){o=A.kd(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.mz(a,s)
if(p==="*")throw A.c(A.lR(n))
if(v.leafTags[n]===true){o=A.kd(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.mz(a,s)},
mz(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.l5(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
kd(a){return J.l5(a,!1,null,!!a.$iaw)},
pH(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.kd(s)
else return J.l5(s,c,null,null)},
pz(){if(!0===$.l3)return
$.l3=!0
A.pA()},
pA(){var s,r,q,p,o,n,m,l
$.jQ=Object.create(null)
$.jW=Object.create(null)
A.py()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.mA.$1(o)
if(n!=null){m=A.pH(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
py(){var s,r,q,p,o,n,m=B.bg()
m=A.cC(B.bh,A.cC(B.bi,A.cC(B.as,A.cC(B.as,A.cC(B.bj,A.cC(B.bk,A.cC(B.bl(B.ar),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.my=new A.jT(p)
$.mt=new A.jU(o)
$.mA=new A.jV(n)},
cC(a,b){return a(b)||b},
po(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
pO(a,b,c){var s=a.indexOf(b,c)
return s>=0},
pJ(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
E:function E(a,b){this.a=a
this.b=b},
dJ:function dJ(a,b){this.a=a
this.b=b},
dK:function dK(a,b){this.a=a
this.b=b},
cy:function cy(a,b){this.a=a
this.b=b},
bV:function bV(a,b,c){this.a=a
this.b=b
this.c=c},
cQ:function cQ(a,b){this.a=a
this.$ti=b},
cP:function cP(){},
V:function V(a,b,c){this.a=a
this.b=b
this.$ti=c},
bR:function bR(a,b){this.a=a
this.$ti=b},
bS:function bS(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cR:function cR(){},
aZ:function aZ(a,b,c){this.a=a
this.b=b
this.$ti=c},
dp:function dp(){},
iL:function iL(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
de:function de(){},
eD:function eD(a,b,c){this.a=a
this.b=b
this.c=c},
fh:function fh(a){this.a=a},
hU:function hU(a){this.a=a},
cU:function cU(a,b){this.a=a
this.b=b},
dN:function dN(a){this.a=a
this.b=null},
bn:function bn(){},
ee:function ee(){},
ef:function ef(){},
fe:function fe(){},
fb:function fb(){},
c8:function c8(a,b){this.a=a
this.b=b},
f3:function f3(a){this.a=a},
b8:function b8(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hG:function hG(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
ba:function ba(a,b){this.a=a
this.$ti=b},
d3:function d3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aS:function aS(a,b){this.a=a
this.$ti=b},
bb:function bb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b9:function b9(a,b){this.a=a
this.$ti=b},
d2:function d2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
jT:function jT(a){this.a=a},
jU:function jU(a){this.a=a},
jV:function jV(a){this.a=a},
aM:function aM(){},
bk:function bk(){},
cx:function cx(){},
t(a){return a},
eR(a){return new Uint8Array(A.t(a))},
bX(a,b,c){if(a>>>0!==a||a>=c)throw A.c(A.jP(b,a))},
cj:function cj(){},
dc:function dc(){},
eJ:function eJ(){},
a9:function a9(){},
da:function da(){},
db:function db(){},
d9:function d9(){},
eK:function eK(){},
eL:function eL(){},
eM:function eM(){},
eN:function eN(){},
eO:function eO(){},
eP:function eP(){},
dd:function dd(){},
eQ:function eQ(){},
dF:function dF(){},
dG:function dG(){},
dH:function dH(){},
dI:function dI(){},
kB(a,b){var s=b.c
return s==null?b.c=A.dQ(a,"bI",[b.x]):s},
lK(a){var s=a.w
if(s===6||s===7)return A.lK(a.x)
return s===11||s===12},
nS(a){return a.as},
bB(a){return A.jk(v.typeUniverse,a,!1)},
bY(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bY(a1,s,a3,a4)
if(r===s)return a2
return A.m9(a1,r,!0)
case 7:s=a2.x
r=A.bY(a1,s,a3,a4)
if(r===s)return a2
return A.m8(a1,r,!0)
case 8:q=a2.y
p=A.cB(a1,q,a3,a4)
if(p===q)return a2
return A.dQ(a1,a2.x,p)
case 9:o=a2.x
n=A.bY(a1,o,a3,a4)
m=a2.y
l=A.cB(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.kM(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.cB(a1,j,a3,a4)
if(i===j)return a2
return A.ma(a1,k,i)
case 11:h=a2.x
g=A.bY(a1,h,a3,a4)
f=a2.y
e=A.pd(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.m7(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.cB(a1,d,a3,a4)
o=a2.x
n=A.bY(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.kN(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.c(A.e5("Attempted to substitute unexpected RTI kind "+a0))}},
cB(a,b,c,d){var s,r,q,p,o=b.length,n=A.jl(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bY(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
pe(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.jl(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bY(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
pd(a,b,c,d){var s,r=b.a,q=A.cB(a,r,c,d),p=b.b,o=A.cB(a,p,c,d),n=b.c,m=A.pe(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.fB()
s.a=q
s.b=o
s.c=m
return s},
b(a,b){a[v.arrayRti]=b
return a},
l0(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.px(s)
return a.$S()}return null},
pB(a,b){var s
if(A.lK(b))if(a instanceof A.bn){s=A.l0(a)
if(s!=null)return s}return A.c1(a)},
c1(a){if(a instanceof A.y)return A.v(a)
if(Array.isArray(a))return A.H(a)
return A.kT(J.c_(a))},
H(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
v(a){var s=a.$ti
return s!=null?s:A.kT(a)},
kT(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.oP(a,s)},
oP(a,b){var s=a instanceof A.bn?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.ox(v.typeUniverse,s.name)
b.$ccache=r
return r},
px(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.jk(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
l2(a){return A.b5(A.v(a))},
kY(a){var s
if(a instanceof A.aM)return a.c1()
s=a instanceof A.bn?A.l0(a):null
if(s!=null)return s
if(t.dm.b(a))return J.e3(a).a
if(Array.isArray(a))return A.H(a)
return A.c1(a)},
b5(a){var s=a.r
return s==null?a.r=new A.jj(a):s},
ps(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.h(q,0)
s=A.dS(v.typeUniverse,A.kY(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.h(q,r)
s=A.mc(v.typeUniverse,s,A.kY(q[r]))}return A.dS(v.typeUniverse,s,a)},
aP(a){return A.b5(A.jk(v.typeUniverse,a,!1))},
oO(a){var s=this
s.b=A.pb(s)
return s.b(a)},
pb(a){var s,r,q,p,o
if(a===t.K)return A.oZ
if(A.c2(a))return A.p2
s=a.w
if(s===6)return A.oM
if(s===1)return A.mn
if(s===7)return A.oU
r=A.pa(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.c2)){a.f="$i"+q
if(q==="z")return A.oX
if(a===t.m)return A.oW
return A.p1}}else if(s===10){p=A.po(a.x,a.y)
o=p==null?A.mn:p
return o==null?A.dZ(o):o}return A.oK},
pa(a){if(a.w===8){if(a===t.S)return A.ml
if(a===t.i||a===t.q)return A.oY
if(a===t.N)return A.p0
if(a===t.y)return A.kU}return null},
oN(a){var s=this,r=A.oJ
if(A.c2(s))r=A.oC
else if(s===t.K)r=A.dZ
else if(A.cH(s)){r=A.oL
if(s===t.h6)r=A.oB
else if(s===t.dk)r=A.bW
else if(s===t.fQ)r=A.oA
else if(s===t.cg)r=A.mf
else if(s===t.cD)r=A.kO
else if(s===t.bX)r=A.C}else if(s===t.S)r=A.d
else if(s===t.N)r=A.U
else if(s===t.y)r=A.h_
else if(s===t.q)r=A.aO
else if(s===t.i)r=A.h0
else if(s===t.m)r=A.l
s.a=r
return s.a(a)},
oK(a){var s=this
if(a==null)return A.cH(s)
return A.pE(v.typeUniverse,A.pB(a,s),s)},
oM(a){if(a==null)return!0
return this.x.b(a)},
p1(a){var s,r=this
if(a==null)return A.cH(r)
s=r.f
if(a instanceof A.y)return!!a[s]
return!!J.c_(a)[s]},
oX(a){var s,r=this
if(a==null)return A.cH(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.y)return!!a[s]
return!!J.c_(a)[s]},
oW(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.y)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
mm(a){if(typeof a=="object"){if(a instanceof A.y)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
oJ(a){var s=this
if(a==null){if(A.cH(s))return a}else if(s.b(a))return a
throw A.Z(A.mg(a,s),new Error())},
oL(a){var s=this
if(a==null||s.b(a))return a
throw A.Z(A.mg(a,s),new Error())},
mg(a,b){return new A.dO("TypeError: "+A.m2(a,A.aD(b,null)))},
m2(a,b){return A.hk(a)+": type '"+A.aD(A.kY(a),null)+"' is not a subtype of type '"+b+"'"},
aN(a,b){return new A.dO("TypeError: "+A.m2(a,b))},
oU(a){var s=this
return s.x.b(a)||A.kB(v.typeUniverse,s).b(a)},
oZ(a){return a!=null},
dZ(a){if(a!=null)return a
throw A.Z(A.aN(a,"Object"),new Error())},
p2(a){return!0},
oC(a){return a},
mn(a){return!1},
kU(a){return!0===a||!1===a},
h_(a){if(!0===a)return!0
if(!1===a)return!1
throw A.Z(A.aN(a,"bool"),new Error())},
oA(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.Z(A.aN(a,"bool?"),new Error())},
h0(a){if(typeof a=="number")return a
throw A.Z(A.aN(a,"double"),new Error())},
kO(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Z(A.aN(a,"double?"),new Error())},
ml(a){return typeof a=="number"&&Math.floor(a)===a},
d(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.Z(A.aN(a,"int"),new Error())},
oB(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.Z(A.aN(a,"int?"),new Error())},
oY(a){return typeof a=="number"},
aO(a){if(typeof a=="number")return a
throw A.Z(A.aN(a,"num"),new Error())},
mf(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Z(A.aN(a,"num?"),new Error())},
p0(a){return typeof a=="string"},
U(a){if(typeof a=="string")return a
throw A.Z(A.aN(a,"String"),new Error())},
bW(a){if(typeof a=="string")return a
if(a==null)return a
throw A.Z(A.aN(a,"String?"),new Error())},
l(a){if(A.mm(a))return a
throw A.Z(A.aN(a,"JSObject"),new Error())},
C(a){if(a==null)return a
if(A.mm(a))return a
throw A.Z(A.aN(a,"JSObject?"),new Error())},
mq(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aD(a[q],b)
return s},
p5(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.mq(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aD(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
mi(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.b([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.j(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.h(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aD(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aD(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aD(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aD(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aD(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aD(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aD(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aD(a.x,b)+">"
if(l===8){p=A.pf(a.x)
o=a.y
return o.length>0?p+("<"+A.mq(o,b)+">"):p}if(l===10)return A.p5(a,b)
if(l===11)return A.mi(a,b,null)
if(l===12)return A.mi(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.h(b,n)
return b[n]}return"?"},
pf(a){var s=A.mC(a)
if(s!=null)return s
return"minified:"+a},
oy(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
ox(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.jk(a,b,!1)
else if(typeof m=="number"){s=m
r=A.dR(a,5,"#")
q=A.jl(s)
for(p=0;p<s;++p)q[p]=r
o=A.dQ(a,b,q)
n[b]=o
return o}else return m},
ow(a,b){return A.md(a.tR,b)},
ov(a,b){return A.md(a.eT,b)},
jk(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.mb(a,null,b,!1)
r.set(b,s)
return s},
dS(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.mb(a,b,c,!0)
q.set(c,r)
return r},
mc(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.kM(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
mb(a,b,c,d){return A.on(A.oh(a,b,c,d))},
bA(a,b){b.a=A.oN
b.b=A.oO
return b},
dR(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aV(null,null)
s.w=b
s.as=c
r=A.bA(a,s)
a.eC.set(c,r)
return r},
m9(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.ot(a,b,r,c)
a.eC.set(r,s)
return s},
ot(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.c2(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.cH(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.aV(null,null)
q.w=6
q.x=b
q.as=c
return A.bA(a,q)},
m8(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.or(a,b,r,c)
a.eC.set(r,s)
return s},
or(a,b,c,d){var s,r
if(d){s=b.w
if(A.c2(b)||b===t.K)return b
else if(s===1)return A.dQ(a,"bI",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.aV(null,null)
r.w=7
r.x=b
r.as=c
return A.bA(a,r)},
ou(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aV(null,null)
s.w=13
s.x=b
s.as=q
r=A.bA(a,s)
a.eC.set(q,r)
return r},
dP(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
oq(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
dQ(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.dP(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.aV(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bA(a,r)
a.eC.set(p,q)
return q},
kM(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.dP(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.aV(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bA(a,o)
a.eC.set(q,n)
return n},
ma(a,b,c){var s,r,q="+"+(b+"("+A.dP(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aV(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bA(a,s)
a.eC.set(q,r)
return r},
m7(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.dP(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.dP(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.oq(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aV(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bA(a,p)
a.eC.set(r,o)
return o},
kN(a,b,c,d){var s,r=b.as+("<"+A.dP(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.os(a,b,c,r,d)
a.eC.set(r,s)
return s},
os(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.jl(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bY(a,b,r,0)
m=A.cB(a,c,r,0)
return A.kN(a,n,m,c!==m)}}l=new A.aV(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bA(a,l)},
oh(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
on(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.oj(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.m4(a,r,l,k,!1)
else if(q===46)r=A.m4(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bU(a.u,a.e,k.pop()))
break
case 94:k.push(A.ou(a.u,k.pop()))
break
case 35:k.push(A.dR(a.u,5,"#"))
break
case 64:k.push(A.dR(a.u,2,"@"))
break
case 126:k.push(A.dR(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.ol(a,k)
break
case 38:A.ok(a,k)
break
case 63:p=a.u
k.push(A.m9(p,A.bU(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.m8(p,A.bU(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.oi(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.m5(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.oo(a.u,a.e,o)
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
return A.bU(a.u,a.e,m)},
oj(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
m4(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.oy(s,o.x)[p]
if(n==null)A.m('No "'+p+'" in "'+A.nS(o)+'"')
d.push(A.dS(s,o,n))}else d.push(p)
return m},
ol(a,b){var s,r=a.u,q=A.m3(a,b),p=b.pop()
if(typeof p=="string")b.push(A.dQ(r,p,q))
else{s=A.bU(r,a.e,p)
switch(s.w){case 11:b.push(A.kN(r,s,q,a.n))
break
default:b.push(A.kM(r,s,q))
break}}},
oi(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.m3(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bU(p,a.e,o)
q=new A.fB()
q.a=s
q.b=n
q.c=m
b.push(A.m7(p,r,q))
return
case-4:b.push(A.ma(p,b.pop(),s))
return
default:throw A.c(A.e5("Unexpected state under `()`: "+A.p(o)))}},
ok(a,b){var s=b.pop()
if(0===s){b.push(A.dR(a.u,1,"0&"))
return}if(1===s){b.push(A.dR(a.u,4,"1&"))
return}throw A.c(A.e5("Unexpected extended operation "+A.p(s)))},
m3(a,b){var s=b.splice(a.p)
A.m5(a.u,a.e,s)
a.p=b.pop()
return s},
bU(a,b,c){if(typeof c=="string")return A.dQ(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.om(a,b,c)}else return c},
m5(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bU(a,b,c[s])},
oo(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bU(a,b,c[s])},
om(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.c(A.e5("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.c(A.e5("Bad index "+c+" for "+b.i(0)))},
pE(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.a0(a,b,null,c,null)
r.set(c,s)}return s},
a0(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.c2(d))return!0
s=b.w
if(s===4)return!0
if(A.c2(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.a0(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.a0(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.a0(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.a0(a,b.x,c,d,e))return!1
return A.a0(a,A.kB(a,b),c,d,e)}if(s===6)return A.a0(a,p,c,d,e)&&A.a0(a,b.x,c,d,e)
if(q===7){if(A.a0(a,b,c,d.x,e))return!0
return A.a0(a,b,c,A.kB(a,d),e)}if(q===6)return A.a0(a,b,c,p,e)||A.a0(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.gT)return!0
if(q===12){if(b===t.cj)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.a0(a,j,c,i,e)||!A.a0(a,i,e,j,c))return!1}return A.mk(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.mk(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.oV(a,b,c,d,e)}if(o&&q===10)return A.p_(a,b,c,d,e)
return!1},
mk(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.a0(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.a0(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.a0(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.a0(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.a0(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
oV(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.dS(a,b,r[o])
return A.me(a,p,null,c,d.y,e)}return A.me(a,b.y,null,c,d.y,e)},
me(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.a0(a,b[s],d,e[s],f))return!1
return!0},
p_(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.a0(a,r[s],c,q[s],e))return!1
return!0},
cH(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.c2(a))if(s!==6)r=s===7&&A.cH(a.x)
return r},
c2(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
md(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
jl(a){return a>0?new Array(a):v.typeUniverse.sEA},
aV:function aV(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
fB:function fB(){this.c=this.b=this.a=null},
jj:function jj(a){this.a=a},
fz:function fz(){},
dO:function dO(a){this.a=a},
oc(){var s,r,q
if(self.scheduleImmediate!=null)return A.ph()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.cD(new A.iW(s),1)).observe(r,{childList:true})
return new A.iV(s,r,q)}else if(self.setImmediate!=null)return A.pi()
return A.pj()},
od(a){self.scheduleImmediate(A.cD(new A.iX(t.M.a(a)),0))},
oe(a){self.setImmediate(A.cD(new A.iY(t.M.a(a)),0))},
of(a){t.M.a(a)
A.op(0,a)},
op(a,b){var s=new A.jh()
s.cW(a,b)
return s},
kW(a){return new A.fp(new A.Y($.R,a.h("Y<0>")),a.h("fp<0>"))},
kS(a,b){a.$2(0,null)
b.b=!0
return b.a},
kP(a,b){A.oD(a,b)},
kR(a,b){b.bl(a)},
kQ(a,b){b.bm(A.c3(a),A.cG(a))},
oD(a,b){var s,r,q=new A.jn(b),p=new A.jo(b)
if(a instanceof A.Y)a.cd(q,p,t.A)
else{s=t.A
if(a instanceof A.Y)a.cB(q,p,s)
else{r=new A.Y($.R,t.e)
r.a=8
r.c=a
r.cd(q,p,s)}}},
kZ(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.R.cz(new A.jJ(s),t.H,t.S,t.A)},
m6(a,b,c){return 0},
kp(a){var s
if(t.Q.b(a)){s=a.gaE()
if(s!=null)return s}return B.P},
oQ(a,b){if($.R===B.x)return null
return null},
oR(a,b){if($.R!==B.x)A.oQ(a,b)
if(b==null)if(t.Q.b(a)){b=a.gaE()
if(b==null){A.lI(a,B.P)
b=B.P}}else b=B.P
else if(t.Q.b(a))A.lI(a,b)
return new A.aH(a,b)},
kG(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.e;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.nW()
b.b6(new A.aH(new A.aY(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.c4(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aR()
b.aP(o.a)
A.cv(b,p)
return}b.a^=2
A.h1(null,null,b.b,t.M.a(new A.j5(o,b)))},
cv(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.kX(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.cv(d.a,c)
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
A.kX(j.a,j.b)
return}g=$.R
if(g!==h)$.R=h
else g=null
c=c.c
if((c&15)===8)new A.j9(q,d,n).$0()
else if(o){if((c&1)!==0)new A.j8(q,j).$0()}else if((c&2)!==0)new A.j7(d,q).$0()
if(g!=null)$.R=g
c=q.c
if(c instanceof A.Y){p=q.a.$ti
p=p.h("bI<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aS(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.kG(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aS(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
p6(a,b){var s
if(t.f.b(a))return b.cz(a,t.A,t.K,t.l)
s=t.x
if(s.b(a))return s.a(a)
throw A.c(A.al(a,"onError",u.c))},
p4(){var s,r
for(s=$.cA;s!=null;s=$.cA){$.e0=null
r=s.b
$.cA=r
if(r==null)$.e_=null
s.a.$0()}},
pc(){$.kV=!0
try{A.p4()}finally{$.e0=null
$.kV=!1
if($.cA!=null)$.ld().$1(A.mv())}},
mr(a){var s=new A.fq(a),r=$.e_
if(r==null){$.cA=$.e_=s
if(!$.kV)$.ld().$1(A.mv())}else $.e_=r.b=s},
p9(a){var s,r,q,p=$.cA
if(p==null){A.mr(a)
$.e0=$.e_
return}s=new A.fq(a)
r=$.e0
if(r==null){s.b=p
$.cA=$.e0=s}else{q=r.b
s.b=q
$.e0=r.b=s
if(q==null)$.e_=s}},
q2(a,b){A.bZ(a,"stream",t.K)
return new A.fQ(b.h("fQ<0>"))},
kX(a,b){A.p9(new A.jI(a,b))},
mp(a,b,c,d,e){var s,r=$.R
if(r===c)return d.$0()
$.R=c
s=r
try{r=d.$0()
return r}finally{$.R=s}},
p8(a,b,c,d,e,f,g){var s,r=$.R
if(r===c)return d.$1(e)
$.R=c
s=r
try{r=d.$1(e)
return r}finally{$.R=s}},
p7(a,b,c,d,e,f,g,h,i){var s,r=$.R
if(r===c)return d.$2(e,f)
$.R=c
s=r
try{r=d.$2(e,f)
return r}finally{$.R=s}},
h1(a,b,c,d){t.M.a(d)
if(B.x!==c){d=c.dP(d)
d=d}A.mr(d)},
iW:function iW(a){this.a=a},
iV:function iV(a,b,c){this.a=a
this.b=b
this.c=c},
iX:function iX(a){this.a=a},
iY:function iY(a){this.a=a},
jh:function jh(){},
ji:function ji(a,b){this.a=a
this.b=b},
fp:function fp(a,b){this.a=a
this.b=!1
this.$ti=b},
jn:function jn(a){this.a=a},
jo:function jo(a){this.a=a},
jJ:function jJ(a){this.a=a},
bl:function bl(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
bz:function bz(a,b){this.a=a
this.$ti=b},
aH:function aH(a,b){this.a=a
this.b=b},
fu:function fu(){},
dz:function dz(a,b){this.a=a
this.$ti=b},
bQ:function bQ(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
Y:function Y(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
j2:function j2(a,b){this.a=a
this.b=b},
j6:function j6(a,b){this.a=a
this.b=b},
j5:function j5(a,b){this.a=a
this.b=b},
j4:function j4(a,b){this.a=a
this.b=b},
j3:function j3(a,b){this.a=a
this.b=b},
j9:function j9(a,b,c){this.a=a
this.b=b
this.c=c},
ja:function ja(a,b){this.a=a
this.b=b},
jb:function jb(a){this.a=a},
j8:function j8(a,b){this.a=a
this.b=b},
j7:function j7(a,b){this.a=a
this.b=b},
fq:function fq(a){this.a=a
this.b=null},
fQ:function fQ(a){this.$ti=a},
dX:function dX(){},
fK:function fK(){},
jf:function jf(a,b){this.a=a
this.b=b},
jI:function jI(a,b){this.a=a
this.b=b},
kH(a,b){var s=a[b]
return s===a?null:s},
kJ(a,b,c){if(c==null)a[b]=a
else a[b]=c},
kI(){var s=Object.create(null)
A.kJ(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
nf(a,b){return new A.b8(a.h("@<0>").S(b).h("b8<1,2>"))},
lw(a,b,c){return b.h("@<0>").S(c).h("lv<1,2>").a(A.pt(a,new A.b8(b.h("@<0>").S(c).h("b8<1,2>"))))},
ax(a,b){return new A.b8(a.h("@<0>").S(b).h("b8<1,2>"))},
kv(a){return new A.aX(a.h("aX<0>"))},
at(a){return new A.aX(a.h("aX<0>"))},
d4(a,b){return b.h("lx<0>").a(A.pu(a,new A.aX(b.h("aX<0>"))))},
kL(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
kK(a,b,c){var s=new A.bT(a,b,c.h("bT<0>"))
s.c=a.e
return s},
ng(a,b,c){var s=A.nf(b,c)
a.aJ(0,new A.hH(s,b,c))
return s},
nh(a,b){var s,r,q=A.kv(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r)q.j(0,b.a(a[r]))
return q},
kw(a,b){var s=A.kv(b)
s.F(0,a)
return s},
hI(a){var s,r
if(A.l4(a))return"{...}"
s=new A.fc("")
try{r={}
B.a.j($.aE,a)
s.a+="{"
r.a=!0
a.aJ(0,new A.hJ(r,s))
s.a+="}"}finally{if(0>=$.aE.length)return A.h($.aE,-1)
$.aE.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
oz(){throw A.c(A.bP("Cannot change an unmodifiable set"))},
dB:function dB(){},
dE:function dE(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
dC:function dC(a,b){this.a=a
this.$ti=b},
dD:function dD(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aX:function aX(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fD:function fD(a){this.a=a
this.c=this.b=null},
bT:function bT(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
hH:function hH(a,b,c){this.a=a
this.b=b
this.c=c},
I:function I(){},
bK:function bK(){},
hJ:function hJ(a,b){this.a=a
this.b=b},
dT:function dT(){},
ci:function ci(){},
dv:function dv(){},
bf:function bf(){},
dL:function dL(){},
fT:function fT(){},
dw:function dw(a,b){this.a=a
this.$ti=b},
cz:function cz(){},
dU:function dU(){},
pC(a){var s=A.nA(a,null)
if(s!=null)return s
throw A.c(new A.hr(a))},
n2(a,b){a=A.Z(a,new Error())
if(a==null)a=A.dZ(a)
a.stack=b.i(0)
throw a},
eE(a,b,c,d){var s,r=c?J.lr(a,d):J.lq(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
d5(a,b,c){var s,r=A.b([],c.h("r<0>"))
for(s=J.a6(a);s.k();)B.a.j(r,c.a(s.gn()))
if(b)return r
r.$flags=1
return r},
ap(a,b){var s,r
if(Array.isArray(a))return A.b(a.slice(0),b.h("r<0>"))
s=A.b([],b.h("r<0>"))
for(r=J.a6(a);r.k();)B.a.j(s,r.gn())
return s},
ch(a,b){var s=A.d5(a,!1,b)
s.$flags=3
return s},
lO(a,b,c){var s=J.a6(b)
if(!s.k())return a
if(c.length===0){do a+=A.p(s.gn())
while(s.k())}else{a+=A.p(s.gn())
while(s.k())a=a+c+A.p(s.gn())}return a},
nW(){return A.cG(new Error())},
n_(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
ln(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
eh(a){if(a>=10)return""+a
return"0"+a},
hk(a){if(typeof a=="number"||A.kU(a)||a==null)return J.c4(a)
if(typeof a=="string")return JSON.stringify(a)
return A.lH(a)},
n3(a,b){A.bZ(a,"error",t.K)
A.bZ(b,"stackTrace",t.l)
A.n2(a,b)},
e5(a){return new A.e4(a)},
j(a,b){return new A.aY(!1,null,b,a)},
al(a,b,c){return new A.aY(!0,a,b,c)},
aU(a,b,c,d,e){return new A.di(b,c,!0,a,d,"Invalid value")},
nL(a,b,c){if(0>a||a>c)throw A.c(A.aU(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.c(A.aU(b,a,c,"end",null))
return b}return c},
im(a,b){if(a<0)throw A.c(A.aU(a,0,null,b,null))
return a},
hD(a,b,c,d){return new A.ew(b,!0,a,d,"Index out of range")},
bP(a){return new A.dx(a)},
lR(a){return new A.fg(a)},
k(a){return new A.cr(a)},
aI(a){return new A.eg(a)},
na(a,b,c){var s,r
if(A.l4(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.b([],t.s)
B.a.j($.aE,a)
try{A.p3(a,s)}finally{if(0>=$.aE.length)return A.h($.aE,-1)
$.aE.pop()}r=A.lO(b,t.hf.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
kr(a,b,c){var s,r
if(A.l4(a))return b+"..."+c
s=new A.fc(b)
B.a.j($.aE,a)
try{r=s
r.a=A.lO(r.a,a,", ")}finally{if(0>=$.aE.length)return A.h($.aE,-1)
$.aE.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
p3(a,b){var s,r,q,p,o,n,m,l=a.gC(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.p(l.gn())
B.a.j(b,s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
if(0>=b.length)return A.h(b,-1)
r=b.pop()
if(0>=b.length)return A.h(b,-1)
q=b.pop()}else{p=l.gn();++j
if(!l.k()){if(j<=4){B.a.j(b,A.p(p))
return}r=A.p(p)
if(0>=b.length)return A.h(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gn();++j
for(;l.k();p=o,o=n){n=l.gn();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.h(b,-1)
k-=b.pop().length+2;--j}B.a.j(b,"...")
return}}q=A.p(p)
r=A.p(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.h(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.j(b,m)
B.a.j(b,q)
B.a.j(b,r)},
bL(a,b,c,d,e,f){var s
if(B.k===c){s=J.S(a)
b=J.S(b)
return A.fd(A.a3(A.a3($.e2(),s),b))}if(B.k===d){s=J.S(a)
b=J.S(b)
c=J.S(c)
return A.fd(A.a3(A.a3(A.a3($.e2(),s),b),c))}if(B.k===e){s=J.S(a)
b=J.S(b)
c=J.S(c)
d=J.S(d)
return A.fd(A.a3(A.a3(A.a3(A.a3($.e2(),s),b),c),d))}if(B.k===f){s=J.S(a)
b=J.S(b)
c=J.S(c)
d=J.S(d)
e=J.S(e)
return A.fd(A.a3(A.a3(A.a3(A.a3(A.a3($.e2(),s),b),c),d),e))}s=J.S(a)
b=J.S(b)
c=J.S(c)
d=J.S(d)
e=J.S(e)
f=J.S(f)
f=A.fd(A.a3(A.a3(A.a3(A.a3(A.a3(A.a3($.e2(),s),b),c),d),e),f))
return f},
bF:function bF(a,b,c){this.a=a
this.b=b
this.c=c},
iZ:function iZ(){},
M:function M(){},
e4:function e4(a){this.a=a},
bg:function bg(){},
aY:function aY(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
di:function di(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
ew:function ew(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
dx:function dx(a){this.a=a},
fg:function fg(a){this.a=a},
cr:function cr(a){this.a=a},
eg:function eg(a){this.a=a},
eS:function eS(){},
ds:function ds(){},
j_:function j_(a){this.a=a},
hr:function hr(a){this.a=a},
n:function n(){},
ae:function ae(a,b,c){this.a=a
this.b=b
this.$ti=c},
a1:function a1(){},
y:function y(){},
fR:function fR(){},
fc:function fc(a){this.a=a},
hT:function hT(a){this.a=a},
L(a){var s
if(typeof a=="function")throw A.c(A.j("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.oE,a)
s[$.l7()]=a
return s},
oE(a,b,c){t.Z.a(a)
if(A.d(c)>=1)return a.$1(b)
return a.$0()},
mx(a,b,c){return c.a(a[b])},
mj(a,b){return a[b]},
ac(a,b,c,d){return d.a(a[b].apply(a,c))},
pI(a,b){var s=new A.Y($.R,b.h("Y<0>")),r=new A.dz(s,b.h("dz<0>"))
a.then(A.cD(new A.ke(r,b),1),A.cD(new A.kf(r),1))
return s},
mo(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
cE(a){if(A.mo(a))return a
return new A.jN(new A.dE(t.hg)).$1(a)},
ke:function ke(a,b){this.a=a
this.b=b},
kf:function kf(a){this.a=a},
jN:function jN(a){this.a=a},
fJ:function fJ(){this.b=this.a=0},
iq:function iq(a){this.z=a},
cm:function cm(a,b){this.a=a
this.b=b},
aA:function aA(a,b){this.a=a
this.b=b},
hd:function hd(a,b){this.a=a
this.b=b},
he:function he(){this.a=null
this.d=0},
eW(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){return new A.eV(f,b,l,d,a4,g,i,o,n,m,j,e,c,a,q,h,r,a3,a2,a1,s,a0,!1,p)},
lF(){return A.eW(0,0.3,0,0,0,1.15,0.08,8,0,1,!1,0.75,0,0,0,B.al,0,0,0,0,0,0,0,0.22)},
cs:function cs(a,b){this.a=a
this.b=b},
eV:function eV(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){var _=this
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
lj(a,b,c,d,e,f,g,h){return new A.cK(g,f,h,b,d,e,c,a)},
ed(a,b,c,d,e,f,g){var s,r,q,p
if(!d.gI(0)||d.ga1()<1e-12)throw A.c(A.j("CameraView.look requires a finite, nonzero forward: "+d.i(0),null))
if(!isFinite(e)||e<=0||e>=3.141592653589793)throw A.c(A.j("CameraView.look requires 0 < fovYRadians < pi: "+e,null))
s=d.gD()
if(g.a8(s).ga1()<1e-12)throw A.c(A.j("CameraView.look requires up ("+g.i(0)+") not parallel to forward ("+d.i(0)+")",null))
r=A.kx(b,s,g)
q=A.lz(a,c,e,f)
p=A.lj(a,b,c,s,f,q,r,q.m(0,r))
p.A()
return p},
cK:function cK(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.z=_.y=_.x=$},
dr:function dr(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
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
en:function en(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2){var _=this
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
ht:function ht(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=f},
hu:function hu(){this.b=this.a=0},
bo(a,b){return new A.hC(a,b)},
bd:function bd(){},
az:function az(a,b,c){this.a=a
this.b=b
this.c=c},
aB:function aB(a,b,c){this.a=a
this.b=b
this.c=c},
b1:function b1(a,b,c){this.a=a
this.b=b
this.c=c},
eT:function eT(a,b,c){this.a=a
this.b=b
this.c=c},
b_:function b_(a,b,c){this.a=a
this.b=b
this.c=c},
cf:function cf(a,b){this.a=a
this.b=b},
hC:function hC(a,b){this.a=a
this.b=b},
jK(a,b,c,d){return A.pl(a,b,c,d)},
pl(a,b,a0,a1){var s=0,r=A.kW(t.fW),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c
var $async$jK=A.kZ(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:d=b.length
if(d===0)throw A.c(A.j("bootstrapRenderer requires a non-empty profile ladder",null))
a1.A()
n=A.b([],t.eT)
m=0
i=d-1
h=t.eD
case 3:g=m
if(typeof g!=="number"){q=g.cI()
s=1
break}if(!(g<d)){s=4
break}l=B.a.t(b,m)
k=a.$1(l)
if(k.a!==l)throw A.c(A.j("configurationFor("+l.a.b+") returned a configuration for "+k.a.a.b+". The mapping must be total and faithful, or the renderer runs a graph the host did not choose.",null))
p=6
s=9
return A.kP(a0.ec(k,a1),$async$jK)
case 9:J.h4(n,new A.cl(l,null))
f=A.d5(n,!1,h)
f.$flags=3
g=new A.ea()
q=g
s=1
break
p=2
s=8
break
case 6:p=5
c=o.pop()
j=A.c3(c)
J.h4(n,new A.cl(l,j))
if(J.aG(m,i))throw c
s=8
break
case 5:s=2
break
case 8:g=m
if(typeof g!=="number"){q=g.H()
s=1
break}m=g+1
s=3
break
case 4:throw A.c(A.k("bootstrapRenderer exhausted its ladder without a result"))
case 1:return A.kR(q,r)
case 2:return A.kQ(o.at(-1),r)}})
return A.kS($async$jK,r)},
pr(a){var s,r,q=B.a.bv(B.a4,new A.jO(a))
if(q>=0)return A.ch(B.a.cO(B.a4,q),t.W)
s=t.W
r=A.d4([a],s)
r.F(0,B.a4)
return A.ch(r,s)},
cl:function cl(a,b){this.a=a
this.b=b},
ea:function ea(){},
jO:function jO(a){this.a=a},
pK(a,b,c,d){var s,r,q,p,o,n,m=A.b([],t.cw)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.a.j(m,new A.dJ(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.a.ai(m,new A.kg())
s=A.b([],t.w)
for(r=A.iG(m,0,A.bZ(b,"count",t.S),t.fk),q=r.$ti,r=new A.ao(r,r.gu(0),q.h("ao<Q.E>")),q=q.h("Q.E");r.k();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
x:function x(a,b,c){this.a=a
this.b=b
this.c=c},
ca:function ca(a,b,c){this.a=a
this.b=b
this.c=c},
bu:function bu(a,b,c,d){var _=this
_.b=a
_.c=b
_.d=c
_.e=d},
av:function av(){},
kg:function kg(){},
aq(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return new A.aT(d,a,l,k,j,0,g,f,h,i,e,c,b,m,n)},
lB(a,b){return A.aq(null,0.1,0.5,a,1,1,null,null,b,0.35,0.78,1,1,1)},
hL(a,b,c){return A.aq(null,0.2,0.3,b,0,1,null,null,c,a.c,a.b,a.a,1,1)},
lA(a,b,c,d){return A.aq(null,0.08,a,c,0,1,null,null,d,b.c,b.b,b.a,1,1)},
eG(a,b){if(!isFinite(b)||b<0||b>1)throw A.c(A.j("MaterialDefinition."+a+" must be in [0, 1]: "+A.p(b),null))},
h5:function h5(a,b){this.a=a
this.b=b},
eH:function eH(a,b){this.a=a
this.b=b},
aT:function aT(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
_.a=a
_.b=b
_.d=c
_.e=d
_.f=e
_.w=f
_.x=g
_.z=h
_.Q=i
_.at=j
_.ax=k
_.ch=l
_.CW=m
_.db=n
_.dx=o},
nj(a){A:{break A}return a},
bj:function bj(a,b){this.a=a
this.b=b},
ah:function ah(a,b,c){this.a=a
this.b=b
this.c=c},
iO:function iO(){},
iP:function iP(){},
bs:function bs(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hN:function hN(){},
hO:function hO(){},
hP:function hP(){},
hi:function hi(){},
hW(a){var s,r,q="volumetric",p=t.N,o=A.d4(["sceneColor","present"],p),n=a.a.b
if(n.p(0,"shadows"))o.F(0,A.d4(["shadowMap","sceneDepth"],p))
if(n.p(0,q)){o.j(0,"volumetricLight")
o.j(0,"sceneColor#"+(a.d>1?2:1))}if(n.p(0,"ssao"))o.F(0,A.d4(["ssaoRaw","ssaoBlurred"],p))
if(n.p(0,"bloom")){if(a.d>1)s=n.p(0,q)?3:2
else s=n.p(0,q)?2:1
o.F(0,A.d4(["bloomBlurH","bloomBlurV","sceneColor#"+s],p))}if(a.d>1)o.j(0,"sceneColor#1")
if(n.p(0,"dof"))o.F(0,A.d4(["dofBlurH","dofBlurV","dofOutput"],p))
if(n.p(0,"grade"))o.j(0,"gradeOutput")
if(n.p(0,"ps1"))o.j(0,"ps1Output")
r=n.p(0,"vhs")
if(r)o.j(0,"vhsOutput")
return new A.hV(new A.dw(A.kw(o,p),t.am),r)},
hV:function hV(a,b){this.a=a
this.b=b},
hX:function hX(){},
ib:function ib(a){this.b=a},
f2:function f2(){this.a=null
this.c=0
this.d=!1},
cT:function cT(a,b){this.a=a
this.b=b},
e8:function e8(a,b){this.a=a
this.b=b},
be:function be(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=i},
lP(a,b,c,d,e){var s,r
if(!isFinite(c)||c<=0)throw A.c(A.j("SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: "+A.p(c),null))
if(!isFinite(d)||d<=0)throw A.c(A.j("SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: "+A.p(d),null))
s=c>d?d:c
r=new A.iH(b,a,B.c.J(b*s),B.c.J(a*s),s,!0)
r.A()
return r},
iH:function iH(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hc:function hc(a,b){this.a=a
this.b=b},
dk:function dk(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
co:function co(a,b){this.a=a
this.b=b},
X:function X(a,b,c){this.a=a
this.b=b
this.d=c},
hv:function hv(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f},
ni(){return new A.eI(new A.b2(new A.hM(),A.b([],t.ha),A.b([],t.t),t.ex))},
eI:function eI(a){this.a=a},
hM:function hM(){},
ms(a){var s=4
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
case 3:s=A.m(A.bP("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
oF(a,b,c){var s,r,q
for(s=0,r=0;r<7;++r){q=B.H[r]
if(A.ms(q.a)===b)s+=q.c}return s},
nk(a){return new A.hQ(a,new A.b2(new A.hR(),A.b([],t.c9),A.b([],t.t),t.cE),A.ax(t.S,t.bw))},
lC(a){var s
A:{s=a.byteLength
break A}return s},
fi:function fi(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hQ:function hQ(a,b,c){this.a=a
this.b=b
this.c=c},
hR:function hR(){},
hS:function hS(){},
nX(a){var s=new A.ff(a,new A.b2(new A.iI(),A.b([],t.fq),A.b([],t.t),t.g2),A.ax(t.S,t.j))
s.d=s.aa($.lc())
s.e=s.aa($.l9())
s.f=s.aa($.la())
s.r=s.aa($.l8())
s.w=s.aa($.lb())
return s},
b4:function b4(a,b,c){this.a=a
this.b=b
this.c=c},
ff:function ff(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
iI:function iI(){},
iK:function iK(){},
iJ:function iJ(){},
nV(a,b,c,d,e){var s,r,q
if(c)return B.e3
if(d)return B.dY
s=A.lM(b,e)
if(Math.abs(s)<0.5&&a>=0.2617993877991494)return B.e7
r=s<0
if(a>=0.2617993877991494)return r?B.aV:B.e8
if(a>=0.10471975511965977)return r?B.aV:B.e9
if(a>=-0.014538592669112763)return r?B.e6:B.ea
q=a*180/3.141592653589793
if(q>=-6)return r?B.e5:B.e_
if(q>=-12)return r?B.e4:B.e0
if(q>=-18)return r?B.dZ:B.e1
return B.e2},
lN(a,b,c){var s
if(b<=a)return c<a?0:1
s=B.c.q((c-a)/(b-a),0,1)
return s*s*(3-2*s)},
lM(a,b){var s=a-b
while(s>12)s-=24
while(s<-12)s+=24
return s},
ab:function ab(a,b){this.a=a
this.b=b},
iF:function iF(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.r=e
_.x=f},
pL(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b.gI(0)
if(!i)throw A.c(A.j("invalid volumetric source selection inputs",null))
s=A.at(t.N)
r=A.b([],t.gg)
for(q=0;!1;++q){p=c[q]
p.A()
if(!s.j(0,p.gL()))throw A.c(A.j("duplicate volumetric source id: "+A.p(p.gL()),null))
o=p.geT().a6(0,b).length
i=p.geU()
n=A.o0(p.geR(),o,i)
i=p.gcm().geW()
m=p.gcm().geX()
l=p.gcm().geY()
l=Math.max(A.e1(m),A.e1(l))
k=Math.max(A.e1(i),l)
B.a.j(r,new A.dK(p.geS().m(0,k).m(0,n),p))}B.a.ai(r,new A.kh())
i=A.b([],t.az)
for(m=A.iG(r,0,A.bZ(a,"count",t.S),t.eS),l=m.$ti,m=new A.ao(m,m.gu(0),l.h("ao<Q.E>")),l=l.h("Q.E");m.k();){j=m.d
i.push((j==null?l.a(j):j).b)}return i},
o0(a,b,c){var s,r,q,p,o,n
for(s=[new A.E("distance",b),new A.E("referenceDistance",c),new A.E("cutoffDistance",a)],r=0;r<3;++r){q=s[r]
p=q.b
if(!isFinite(p))A.m(A.j(q.a+" must be finite: "+A.p(p),null))}if(b.cI(0,0)||c.cH(0,0)||a.cH(0,0))throw A.c(A.j("invalid inverse-square attenuation inputs",null))
if(b.cG(0,a))return 0
s=c.m(0,c)
q=c.m(0,c)
o=b.m(0,b)
n=s.cF(0,Math.max(A.e1(q),A.e1(o)))
o=b.cF(0,a)
A.e1(o)
return n.m(0,1-Math.pow(o,4)).q(0,0,1).eV(0)},
kh:function kh(){},
hb:function hb(){this.b=this.a=0},
bG:function bG(a,b,c,d){var _=this
_.a=a
_.c=_.b=0
_.d=b
_.y=c
_.z=d},
lD(a,b){return new A.bt(b,a,a,b)},
bt:function bt(a,b,c,d){var _=this
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
cq:function cq(a,b,c,d,e,f,g,h){var _=this
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
pk(a){var s,r,q,p,o,n,m,l,k,j=A.b([],t.gk),i=A.ax(t.N,t.S)
for(s=a.length,r=t.dR,q=0;q<a.length;a.length===s||(0,A.A)(a),++q){p=a[q]
o=p.gl().y
if(o==null){B.a.j(j,new A.b7(p,A.b([p],r)))
continue}n=""+p.gl().a.a+":"+p.gl().b.a+":"+A.p(o)
m=i.t(0,n)
if(m==null){i.E(0,n,j.length)
B.a.j(j,new A.b7(p,A.b([p],r)))}else{l=j.length
if(m>>>0!==m||m>=l)return A.h(j,m)
k=j[m].b
if(k.length>=16){i.E(0,n,l)
B.a.j(j,new A.b7(p,A.b([p],r)))}else B.a.j(k,p)}}return j},
b7:function b7(a,b){this.a=a
this.b=b},
el:function el(a){this.a=a},
hn:function hn(){},
ho:function ho(a){this.a=a},
hl:function hl(a){this.a=a},
hm:function hm(a){this.a=a},
em:function em(a,b){this.a=a
this.b=b},
cd:function cd(a,b){this.a=a
this.b=b},
eo:function eo(a,b){this.a=a
this.b=b
this.c=0},
og(){return new A.cw()},
hs:function hs(a){this.a=a
this.b=null},
cw:function cw(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
ky(){return!0},
J:function J(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
hY:function hY(){},
hZ:function hZ(){},
aR:function aR(a,b){this.a=a
this.b=b},
ad:function ad(a,b,c){this.a=a
this.b=b
this.c=c},
f0:function f0(a,b){this.a=a
this.b=b},
b6:function b6(a,b){this.a=a
this.b=b},
T:function T(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dm:function dm(a,b){this.a=a
this.b=b},
o:function o(a,b){this.a=a
this.b=b},
cO:function cO(a){this.b=a},
il:function il(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=_.d=0},
a7:function a7(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ir:function ir(){},
a2:function a2(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.r=f},
it:function it(a,b){this.a=a
this.b=b},
iy:function iy(){},
ix:function ix(){},
iw:function iw(){},
iv:function iv(a){this.a=a},
iu:function iu(a,b,c){this.a=a
this.b=b
this.c=c},
is:function is(a,b){this.a=a
this.b=b},
nQ(a){return new A.dj(a,new A.b2(new A.iz(),A.b([],t.aO),A.b([],t.t),t.b0),A.ax(t.gL,t.cm))},
bx:function bx(a,b,c){this.a=a
this.b=b
this.c=c},
dj:function dj(a,b,c){this.a=a
this.b=b
this.c=c},
iz:function iz(){},
mh(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.oH(a,r,s,a.x.gn().a.b.a).b},
oH(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.jE(a),j=new A.jF(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.p(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.pm(b,h,B.Z,i,s.geu(),new A.jp(j),new A.jq(j),new A.jr(a),new A.jw(a),new A.jx(a),new A.jy(j),new A.jz(j),s.gew(),new A.jA(a),s.geA(),r.gey(),k,s.geC(),s.geE(),new A.jB(j,c),new A.jC(j),new A.jD(j),new A.js(j),new A.jt(j),new A.ju(a),new A.jv(j),e,f,g,512)}else{p=new A.T(l,B.p,g,f,e,0)
o=new A.T(l,B.p,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.d8(h,p,o):null
k=A.b([new A.fo(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nout vec4 oColor;\nvoid main(){\n  vec3 n=normalize(vNormal);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+\n    vec3(ndotl)*uDirectLightScale,0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.E)
if(n!=null)k.push(n)
k.push(new A.dg(b,u.l,u.b,h,i,B.Z))
q=new A.el(k)}a.r.toString
m=q.dR(B.ab,new A.ir(),!1,new A.fG())
k=m.a.b
if(k.length!==0)throw A.c(A.k("safe renderer graph is invalid: "+A.p(k)))
return new A.jg(q,m)},
oI(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.c(A.k("renderer graph is not initialized"))
s=b7.c
s=A.ap(new A.aS(s,A.v(s).h("aS<2>")),t.Y)
for(r=0;r<b9.length;++r){q=b9[r]
p=b6.w.a.b
o=p.$ti
n=o.c.a(q.a)
p.af(n)
p=p.b
n=n.a
if(!(n>=0&&n<p.length))return A.h(p,n)
n=p[n].c
p=(n==null?o.y[1].a(n):n).d
o=q.c.a5()
p=p.gal()
n=A.H(p)
B.a.j(s,new A.fS(new A.b_((r|1073741824)>>>0,0,"transient"),q,A.c5(new A.O(p,n.h("a(1)").a(o.gan()),n.h("O<1,a>")))))}p=b8.a
m=A.pp(A.n5(p.c),s,b8.d)
for(o=s.length,l=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gl().a
j=b6.w.a
i=n.a
h=j.c.t(0,i)
if(h==null)A.m(A.bo(B.U,n))
j=j.b
g=j.$ti
j.af(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.h(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
l+=B.d.V(n>0?n:h.e,3)}for(s=m.a,o=s.length,f=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gl().a
j=b6.w.a
i=n.a
h=j.c.t(0,i)
if(h==null)A.m(A.bo(B.U,n))
j=j.b
g=j.$ti
j.af(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.h(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
f+=B.d.V(n>0?n:h.e,3)}o=t.N
n=A.ax(o,t.a8)
e=new A.hs(n)
e.dO("cull")
j=l-f
d=e.b
if(d==null)A.m(A.k("cull recorded outside an active frame"))
if(j<0)A.m(A.j("cull totals must be non-negative",null))
c=n.t(0,d)
c.c+=j
c.e+=m.b.b
b=A.b([],t.c1)
a=A.b([],t.aM)
for(i=s.length,g=t.k,a0=p.a,a1=t.d,k=0;k<s.length;s.length===i||(0,A.A)(s),++k){a2=s[k]
if(a2.gl().e===B.S)B.a.j(a,new A.a_(new A.as(a0.b3(a2.gl().c.a).c,a2.gL().a),a2,a1))
else B.a.j(b,new A.a_(new A.au(B.dt,a2.gl().b,a2.gl().a,a2.gL().a),a2,g))}a3=new A.fA(A.pk(A.pN(b)),A.pM(a),p,b8.b,b8.c)
a4=new A.ej(b6.a,e)
for(s=b4.b,p=s.length,i=t.do,k=0;k<s.length;s.length===p||(0,A.A)(s),++k){a5=s[k]
g=a5.gl().a
if(g.length===0)A.m(A.al(g,"passId",null))
e.b=g
n.bC(g,A.mw())
a6=A.ax(o,i)
for(g=a5.gl().c,a0=g.length,a7=0;a7<g.length;g.length===a0||(0,A.A)(g),++a7){a8=g[a7].a
a9=b5.c
if(a9==null)A.m(A.k("GPU resource adapter is not initialized"))
a1=a8.f
b0=a8.a
b1=a1===0?b0:b0+"#"+a1
b2=a9.b.t(0,b1)
if(b2==null)A.m(A.k("resource is not in candidate: "+b1))
b3=new A.c9(b2)
a6.E(0,b0+"#"+a1,b3)
a6.bC(b0,new A.jG(b3))}a5.T(new A.eb(a6,a4,new A.jH(b8,b6).$0(),a3))}return new A.j0(e,m,j)},
f1:function f1(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.w=f
_.x=!1},
j0:function j0(a,b,c){this.a=a
this.b=b
this.c=c},
fS:function fS(a,b,c){this.a=a
this.b=b
this.c=c},
jE:function jE(a){this.a=a},
jF:function jF(a,b){this.a=a
this.b=b},
jD:function jD(a){this.a=a},
jw:function jw(a){this.a=a},
jx:function jx(a){this.a=a},
jC:function jC(a){this.a=a},
jr:function jr(a){this.a=a},
jt:function jt(a){this.a=a},
js:function js(a){this.a=a},
jB:function jB(a,b){this.a=a
this.b=b},
jp:function jp(a){this.a=a},
jq:function jq(a){this.a=a},
jy:function jy(a){this.a=a},
jz:function jz(a){this.a=a},
jA:function jA(a){this.a=a},
jv:function jv(a){this.a=a},
ju:function ju(a){this.a=a},
jG:function jG(a){this.a=a},
jH:function jH(a,b){this.a=a
this.b=b},
jg:function jg(a,b){this.a=a
this.b=b},
fG:function fG(){},
fA:function fA(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
f4:function f4(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.ax=_.at=_.as=_.Q=_.y=_.x=_.w=_.r=null
_.a$=f
_.b$=g},
iB:function iB(){},
iC:function iC(){},
iD:function iD(){},
fF:function fF(a){this.b=a},
jc:function jc(){},
fL:function fL(){},
f6:function f6(a,b){this.a=a
this.b=b},
pN(a){var s,r,q=A.ap(a,t.k)
B.a.ai(q,new A.kl())
s=A.H(q)
r=s.h("O<1,aK>")
s=A.ap(new A.O(q,s.h("aK(1)").a(new A.km()),r),r.h("Q.E"))
s.$flags=1
return s},
pM(a){var s,r,q=A.ap(a,t.d)
B.a.ai(q,new A.kj())
s=A.H(q)
r=s.h("O<1,aK>")
s=A.ap(new A.O(q,s.h("aK(1)").a(new A.kk()),r),r.h("Q.E"))
s.$flags=1
return s},
au:function au(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
as:function as(a,b){this.a=a
this.b=b},
a_:function a_(a,b,c){this.a=a
this.b=b
this.$ti=c},
kl:function kl(){},
km:function km(){},
kj:function kj(){},
kk:function kk(){},
pp(a,b,c){var s,r,q,p,o,n,m,l=A.b([],t.dR)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.A)(b),++p){o=b[p];++r
if((o.gl().d&c)>>>0===0){++q
continue}n=o.gaC()
m=n.a
if(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)){n=n.b
n=isFinite(n.a)&&isFinite(n.b)&&isFinite(n.c)}else n=!1
if(!n)throw A.c(A.j("cullItems: non-finite world bounds for instance "+o.gL().i(0),null))
if(a.eJ(o.gaC())===B.av){++q
continue}B.a.j(l,o)}return new A.hg(l,new A.hh(q))},
hh:function hh(a){this.b=a},
hg:function hg(a,b){this.a=a
this.b=b},
kA(a){var s,r,q,p
if(a<=0)throw A.c(A.al(a,"size","must be > 0"))
s=a*0.5
r=new A.aC(A.b([],t.n),A.b([],t.t))
q=new A.ic(r,1)
p=-s
q.$6(new A.a(p,p,s),new A.a(s,p,s),new A.a(s,s,s),new A.a(p,s,s),B.u,B.m)
q.$6(new A.a(s,p,p),new A.a(p,p,p),new A.a(p,s,p),new A.a(s,s,p),B.y,B.v)
q.$6(new A.a(p,s,s),new A.a(s,s,s),new A.a(s,s,p),new A.a(p,s,p),B.f,B.m)
q.$6(new A.a(p,p,p),new A.a(s,p,p),new A.a(s,p,s),new A.a(p,p,s),B.o,B.v)
q.$6(new A.a(s,p,s),new A.a(s,p,p),new A.a(s,s,p),new A.a(s,s,s),B.m,B.y)
q.$6(new A.a(p,p,p),new A.a(p,p,s),new A.a(p,s,s),new A.a(p,s,p),B.v,B.u)
return r.a7(new A.ak(new A.a(p,p,p),new A.a(s,s,s)))},
nB(a,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a2<=0||a<=0)throw A.c(A.j("dimensions must be > 0",null))
if(a0<1||a1<1)throw A.c(A.j("subdivisions must be >= 1",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aC(s,q)
o=a2*0.5
n=a*0.5
for(s=-o,m=-n,l=0;l<=a1;++l){k=l/a1
j=m+k*a
for(i=0;i<=a0;++i){h=i/a0
p.G(new A.a(s+h*a2,0,j),B.f,B.m,new A.D(h,k))}}g=a0+1
for(l=0;l<a1;)for(f=l*g,++l,e=l*g,i=0;i<a0;++i){d=f+i
c=e+i
b=c+1
B.a.F(q,A.b([d,c,b,d,b,d+1],r))}return p.a7(new A.ak(new A.a(s,0,m),new A.a(o,0,n)))},
nD(a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(a6<=0)throw A.c(A.al(a6,"radius","must be > 0"))
if(a7<2||a8<3)throw A.c(A.j("invalid ring or sector count",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aC(s,q)
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
a=0}p.G(new A.a(e*a6,s,d*a6),new A.a(e,k,d),new A.a(c,0,a),new A.D(i,n))}}a0=a8+1
for(o=0;o<a7;)for(s=o*a0,++o,a1=o*a0,j=0;j<a8;++j){a2=s+j
a3=a1+j
a4=a3+1
B.a.F(q,A.b([a2,a2+1,a4,a2,a4,a3],r))}a5=new A.a(a6,a6,a6)
return p.a7(new A.ak(a5.m(0,-1),a5))},
no(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a1<=0||a<=0)throw A.c(A.j("radius and height must be > 0",null))
if(a0<3)throw A.c(A.j("radialSegments must be >= 3",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aC(s,q)
o=a*0.5
for(n=-o,m=0;m<=a0;++m){l=m/a0
k=l*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
h=new A.a(j,0,i)
g=new A.a(-i,0,j)
f=j*a1
e=i*a1
p.G(new A.a(f,n,e),h,g,new A.D(l,0))
p.G(new A.a(f,o,e),h,g,new A.D(l,1))}for(m=0;m<a0;++m){d=m*2
f=d+3
B.a.F(q,A.b([d,d+2,f,d,f,d+1],r))}c=s.length/18|0
p.G(new A.a(0,o,0),B.f,B.m,B.ao)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.G(new A.a(j*a1,o,i*a1),B.f,B.m,new A.D(j*0.5+0.5,i*0.5+0.5))}for(f=c+1,e=c+2,m=0;m<a0;++m)B.a.F(q,A.b([c,f+m,e+m],r))
b=s.length/18|0
p.G(new A.a(0,n,0),B.o,B.v,B.ao)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.G(new A.a(j*a1,n,i*a1),B.o,B.v,new A.D(j*0.5+0.5,i*0.5+0.5))}for(s=b+2,f=b+1,m=0;m<a0;++m)B.a.F(q,A.b([b,s+m,f+m],r))
s=-a1
return p.a7(new A.ak(new A.a(s,n,s),new A.a(a1,o,a1)))},
nn(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a6<=0||a4<=0)throw A.c(A.j("radius and height must be > 0",null))
if(a5<3)throw A.c(A.j("radialSegments must be >= 3",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aC(s,q)
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
p.G(new A.a(0,o,0),d,c,new A.D((i+h)*0.5,1))
p.G(new A.a(Math.cos(g)*a6,m,Math.sin(g)*a6),d,c,new A.D(i,0))
p.G(new A.a(Math.cos(f)*a6,m,Math.sin(f)*a6),d,c,new A.D(h,0))
B.a.F(q,A.b([b,b+1,b+2],r))}a=s.length/18|0
p.G(new A.a(0,m,0),B.o,B.v,B.ao)
for(j=0;j<=a5;++j){a0=j/a5*2*3.141592653589793
a1=Math.cos(a0)
a2=Math.sin(a0)
p.G(new A.a(a1*a6,m,a2*a6),B.o,B.v,new A.D(a1*0.5+0.5,a2*0.5+0.5))}for(s=a+2,a3=a+1,j=0;j<a5;++j)B.a.F(q,A.b([a,s+j,a3+j],r))
s=-a6
return p.a7(new A.ak(new A.a(s,m,s),new A.a(a6,o,a6)))},
nE(a0,a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a1<=0||a2<=0)throw A.c(A.j("radii must be > 0",null))
if(a0<3||a3<3)throw A.c(A.j("segments must be >= 3",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aC(s,q)
for(o=0;o<=a0;++o){s=o/a0
n=s*2*3.141592653589793
m=Math.cos(n)
l=Math.sin(n)
for(k=a1+a2*m,j=a2*l,i=0;i<=a3;++i){h=i/a3
g=h*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
p.G(new A.a(k*f,j,k*e),new A.a(m*f,l,m*e),new A.a(-e,0,f),new A.D(h,s))}}d=a3+1
for(o=0;o<a0;)for(s=o*d,++o,k=o*d,i=0;i<a3;++i){c=s+i
h=k+i
b=h+1
B.a.F(q,A.b([c,c+1,b,c,b,h],r))}a=a1+a2
s=-a
return p.a7(new A.ak(new A.a(s,-a2,s),new A.a(a,a2,a)))},
nm(a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a6<=0||a5<=0)throw A.c(A.j("radius and height must be > 0",null))
if(a7<2||a8<3)throw A.c(A.j("invalid ring or sector count",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aC(s,q)
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
p.G(new A.a(d*a6,j,c*a6),new A.a(d,l,c),new A.a(-e,0,f),new A.D(h,s))}}for(s=-o,n=0;n<=a7;++n){j=n/a7
m=j*1.5707963267948966
l=Math.sin(m)
k=Math.cos(m)
for(b=-l,h=s+b*a6,j=0.5-0.5*j,i=0;i<=a8;++i){a=i/a8
g=a*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
d=k*f
c=k*e
p.G(new A.a(d*a6,h,c*a6),new A.a(d,b,c),new A.a(-e,0,f),new A.D(a,j))}}a0=a8+1
for(n=0;n<a7;)for(s=n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1
B.a.F(q,A.b([a1,h,a,a1,a,a1+1],r))}a2=(a7+1)*a0
for(n=0;n<a7;)for(s=a2+n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1+a2
B.a.F(q,A.b([a1,a1+1,a,a1,a,h+a2],r))}for(i=0;i<a8;i=a3){a3=i+1
s=a2+i
j=s+1
B.a.F(q,A.b([i,a3,j,i,j,s],r))}a4=o+a6
s=-a6
return p.a7(new A.ak(new A.a(s,-a4,s),new A.a(a6,a4,a6)))},
ny(a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
if(a7<=0)throw A.c(A.al(a7,"radius","must be > 0"))
if(a8>5)throw A.c(A.al(a8,"subdivisions","must be between 0 and 5"))
s=(1+Math.sqrt(5))/2
r=-s
q=t.fm
p=A.ap(new A.O(A.b([new A.a(-1,s,0),new A.a(1,s,0),new A.a(-1,r,0),new A.a(1,r,0),new A.a(0,-1,s),new A.a(0,1,s),new A.a(0,-1,r),new A.a(0,1,r),new A.a(s,0,-1),new A.a(s,0,1),new A.a(r,0,-1),new A.a(r,0,1)],t.G),t.dO.a(new A.ie()),q),q.h("Q.E"))
r=t.t
q=t.r
o=A.b([A.b([0,11,5],r),A.b([0,5,1],r),A.b([0,1,7],r),A.b([0,7,10],r),A.b([0,10,11],r),A.b([1,5,9],r),A.b([5,11,4],r),A.b([11,10,2],r),A.b([10,7,6],r),A.b([7,1,8],r),A.b([3,9,4],r),A.b([3,4,2],r),A.b([3,2,6],r),A.b([3,6,8],r),A.b([3,8,9],r),A.b([4,9,5],r),A.b([2,4,11],r),A.b([6,2,10],r),A.b([8,6,7],r),A.b([9,8,1],r)],q)
n=A.d5(p,!0,t.b)
m=t.S
l=new A.ig(A.ax(m,m),n)
for(k=0;k<a8;++k,o=j){j=A.b([],q)
for(m=o.length,i=0;i<o.length;o.length===m||(0,A.A)(o),++i){h=o[i]
g=h.length
if(0>=g)return A.h(h,0)
f=h[0]
if(1>=g)return A.h(h,1)
e=h[1]
if(2>=g)return A.h(h,2)
d=h[2]
c=l.$2(f,e)
b=l.$2(e,d)
a=l.$2(d,f)
B.a.j(j,A.b([f,c,a],r))
B.a.j(j,A.b([e,b,c],r))
B.a.j(j,A.b([d,a,b],r))
B.a.j(j,A.b([c,b,a],r))}}q=A.b([],t.n)
m=A.b([],r)
e=new A.aC(q,m)
for(q=n.length,i=0;i<n.length;n.length===q||(0,A.A)(n),++i){a0=n[i]
g=a0.a
a1=a0.b
a2=a0.c
a3=-a2
a4=Math.sqrt(a3*a3+g*g)
a5=a4>0.000001?new A.a(a3/a4,0,g/a4):B.m
e.G(new A.a(g*a7,a1*a7,a2*a7),a0,a5,new A.D(0.5+Math.atan2(a2,g)/6.283185307179586,0.5-Math.asin(B.c.q(a1,-1,1))/3.141592653589793))}for(q=o.length,i=0;i<o.length;o.length===q||(0,A.A)(o),++i){h=o[i]
g=h.length
if(0>=g)return A.h(h,0)
a1=h[0]
if(1>=g)return A.h(h,1)
a2=h[1]
if(2>=g)return A.h(h,2)
B.a.F(m,A.b([a1,a2,h[2]],r))}a6=new A.a(a7,a7,a7)
return e.a7(new A.ak(a6.m(0,-1),a6))},
nz(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
if(a7<=0)throw A.c(A.al(a7,"radius","must be > 0"))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aC(s,q)
o=new A.a(0,a7,0)
n=-a7
m=new A.a(0,n,0)
l=new A.a(a7,0,0)
k=new A.a(0,0,a7)
j=new A.a(n,0,0)
i=new A.a(0,0,n)
n=t.G
h=[A.b([o,l,k],n),A.b([o,k,j],n),A.b([o,j,i],n),A.b([o,i,l],n),A.b([m,k,l],n),A.b([m,j,k],n),A.b([m,i,j],n),A.b([m,l,i],n)]
for(g=0;g<8;++g){f=h[g]
n=f.length
if(0>=n)return A.h(f,0)
e=f[0]
if(1>=n)return A.h(f,1)
d=f[1]
if(2>=n)return A.h(f,2)
c=f[2]
n=e.a
b=d.a-n
a=e.b
a0=d.b-a
a1=e.c
a2=d.c-a1
a3=new A.a(b,a0,a2).a8(new A.a(c.a-n,c.b-a,c.c-a1)).gD()
a4=new A.a(b,a0,a2).gD()
n=a4.a
b=a4.b
a=a4.c
if(n*n+b*b+a*a<0.000001)a4=B.m
a5=s.length/18|0
p.G(e,a3,a4,B.ex)
p.G(d,a3,a4,B.b2)
p.G(c,a3,a4,B.b3)
B.a.F(q,A.b([a5,a5+1,a5+2],r))}a6=new A.a(a7,a7,a7)
return p.a7(new A.ak(a6.m(0,-1),a6))},
np(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a5<=0)throw A.c(A.al(a5,"radius","must be > 0"))
s=(1+Math.sqrt(5))/2
r=1/s
q=-r
p=-s
o=t.fm
n=A.ap(new A.O(A.b([new A.a(-1,-1,-1),new A.a(-1,-1,1),new A.a(-1,1,-1),new A.a(-1,1,1),new A.a(1,-1,-1),new A.a(1,-1,1),new A.a(1,1,-1),new A.a(1,1,1),new A.a(0,q,p),new A.a(0,q,s),new A.a(0,r,p),new A.a(0,r,s),new A.a(q,p,0),new A.a(q,s,0),new A.a(r,p,0),new A.a(r,s,0),new A.a(p,0,q),new A.a(s,0,q),new A.a(p,0,r),new A.a(s,0,r)],t.G),t.dO.a(new A.id(a5)),o),o.h("Q.E"))
q=A.b([],t.n)
p=t.t
o=A.b([],p)
m=new A.aC(q,o)
for(l=0;l<12;++l){k=B.cw[l]
j=k[0]
i=n.length
if(!(j<i))return A.h(n,j)
h=n[j]
j=k[1]
if(!(j<i))return A.h(n,j)
g=n[j]
j=k[2]
if(!(j<i))return A.h(n,j)
f=n[j]
j=h.a
i=g.a-j
e=h.b
d=g.b-e
c=h.c
b=g.c-c
a=new A.a(i,d,b).a8(new A.a(f.a-j,f.b-e,f.c-c)).gD()
a0=new A.a(i,d,b).gD()
j=a0.a
i=a0.b
e=a0.c
if(j*j+i*i+e*e<0.000001)a0=B.m
a1=q.length/18|0
for(a2=0;a2<5;++a2){j=k[a2]
if(!(j<n.length))return A.h(n,j)
a3=a2*1.2566370614359172
m.G(n[j],a,a0,new A.D(0.5+0.5*Math.cos(a3),0.5+0.5*Math.sin(a3)))}j=a1+2
B.a.F(o,A.b([a1,a1+1,j],p))
i=a1+3
B.a.F(o,A.b([a1,j,i],p))
B.a.F(o,A.b([a1,i,a1+4],p))}a4=new A.a(a5,a5,a5)
return m.a7(new A.ak(a4.m(0,-1),a4))},
nC(c9,d0,d1,d2,d3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8
if(d3<=0||d2<=0||d1<=0)throw A.c(A.j("dimensions must be > 0",null))
if(d0<1)throw A.c(A.j("bevelSegments must be >= 1",null))
s=B.c.q(c9,0.001,Math.min(d3,Math.min(d2,d1))*0.45)
r=d3*0.5
q=r-s
p=d2*0.5
o=p-s
n=d1*0.5
m=n-s
l=A.b([],t.n)
k=t.t
j=A.b([],k)
i=new A.aC(l,j)
h=new A.ij(i)
g=-q
f=-o
e=m+s
h.$6(new A.a(g,f,e),new A.a(q,f,e),new A.a(q,o,e),new A.a(g,o,e),B.u,B.m)
e=-m
d=e-s
h.$6(new A.a(q,f,d),new A.a(g,f,d),new A.a(g,o,d),new A.a(q,o,d),B.y,B.v)
d=o+s
h.$6(new A.a(g,d,m),new A.a(q,d,m),new A.a(q,d,e),new A.a(g,d,e),B.f,B.m)
d=f-s
h.$6(new A.a(g,d,e),new A.a(q,d,e),new A.a(q,d,m),new A.a(g,d,m),B.o,B.m)
d=q+s
h.$6(new A.a(d,f,m),new A.a(d,f,e),new A.a(d,o,e),new A.a(d,o,m),B.m,B.y)
d=g-s
h.$6(new A.a(d,f,e),new A.a(d,f,m),new A.a(d,o,m),new A.a(d,o,e),B.v,B.u)
c=new A.ii(d0,s,i)
c.$5(new A.a(g,o,m),new A.a(q,o,m),B.u,B.f,B.m)
c.$5(new A.a(g,f,m),new A.a(q,f,m),B.o,B.u,B.m)
c.$5(new A.a(g,o,e),new A.a(q,o,e),B.f,B.y,B.m)
c.$5(new A.a(g,f,e),new A.a(q,f,e),B.y,B.o,B.m)
c.$5(new A.a(q,f,m),new A.a(q,o,m),B.u,B.m,B.f)
c.$5(new A.a(g,f,m),new A.a(g,o,m),B.v,B.u,B.f)
c.$5(new A.a(q,f,e),new A.a(q,o,e),B.m,B.y,B.f)
c.$5(new A.a(g,f,e),new A.a(g,o,e),B.y,B.v,B.f)
c.$5(new A.a(q,o,e),new A.a(q,o,m),B.f,B.m,B.u)
c.$5(new A.a(g,o,e),new A.a(g,o,m),B.v,B.f,B.u)
c.$5(new A.a(q,f,e),new A.a(q,f,m),B.m,B.o,B.u)
c.$5(new A.a(g,f,e),new A.a(g,f,m),B.o,B.v,B.u)
for(g=[-1,1],b=d0+1,a=0;a<2;++a){a0=g[a]
for(f=[-1,1],e=q*a0,a1=0;a1<2;++a1){a2=f[a1]
for(d=[-1,1],a3=a0*a2,a4=o*a2,a5=0;a5<2;++a5){a6=d[a5]
a7=m*a6
a8=l.length/18|0
for(a9=0;a9<=d0;++a9){b0=a9/d0
b1=b0*1.5707963267948966
for(b2=0;b2<=d0;++b2){b3=b2/d0
b4=b3*1.5707963267948966
b5=new A.a(a0*Math.sin(b1)*Math.cos(b4),a2*Math.cos(b1),a6*Math.sin(b1)*Math.sin(b4)).gD()
b6=b5.a
b7=b5.b
b8=b5.c
b9=Math.abs(b7)>0.85?B.m:B.f
c0=b9.a
c1=b9.b
c2=b9.c
c3=b6*c0+b7*c1+b8*c2
i.G(new A.a(e+b6*s,a4+b7*s,a7+b8*s),b5,new A.a(c0-b6*c3,c1-b7*c3,c2-b8*c3).gD(),new A.D(b0,b3))}}for(a7=a3*a6>0,a9=0;a9<d0;)for(b0=a8+a9*b,++a9,b3=a8+a9*b,b2=0;b2<d0;){c4=b0+b2
c5=b3+b2;++b2
c6=b3+b2
c7=b0+b2
if(a7)B.a.F(j,A.b([c4,c5,c6,c4,c6,c7],k))
else B.a.F(j,A.b([c4,c7,c6,c4,c6,c5],k))}}}}c8=new A.a(r,p,n)
return i.a7(new A.ak(c8.m(0,-1),c8))},
ic:function ic(a,b){this.a=a
this.b=b},
ie:function ie(){},
ig:function ig(a,b){this.a=a
this.b=b},
id:function id(a){this.a=a},
ij:function ij(a){this.a=a},
ii:function ii(a,b,c){this.a=a
this.b=b
this.c=c},
aC:function aC(a,b){this.a=a
this.b=b},
nH(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l=a1*c*4,k=new Uint8Array(l),j=B.c.J(B.c.q(d.a,0,1)*255),i=B.c.J(B.c.q(d.b,0,1)*255),h=B.c.J(B.c.q(d.c,0,1)*255),g=B.c.J(B.c.q(a.a,0,1)*255),f=B.c.J(B.c.q(a.b,0,1)*255),e=B.c.J(B.c.q(a.c,0,1)*255)
for(s=0,r=0;r<c;++r)for(q=B.d.K(r,b)>=a0,p=0;p<a1;++p){o=!q||B.d.K(p,b)<a0
n=o?j:g
if(!(s>=0&&s<l))return A.h(k,s)
k[s]=n
n=s+1
m=o?i:f
if(!(n<l))return A.h(k,n)
k[n]=m
m=s+2
n=o?h:e
if(!(m<l))return A.h(k,m)
k[m]=n
n=s+3
if(!(n<l))return A.h(k,n)
k[n]=255
s+=4}return k},
nJ(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a6*a4*4,a1=new Uint8Array(a0),a2=new A.ik(a6,a4,a3)
for(s=0,r=0;r<a4;r=p)for(q=r-1,p=r+1,o=0;o<a6;o=n){n=o+1
m=a2.$2(n,q)
l=a2.$2(n,r)
if(typeof l!=="number")return A.c0(l)
if(typeof m!=="number")return m.H()
k=a2.$2(n,p)
if(typeof k!=="number")return A.c0(k)
j=o-1
i=a2.$2(j,q)
h=a2.$2(j,r)
if(typeof h!=="number")return A.c0(h)
if(typeof i!=="number")return i.H()
g=a2.$2(j,p)
if(typeof g!=="number")return A.c0(g)
f=a2.$2(j,p)
e=a2.$2(o,p)
if(typeof e!=="number")return A.c0(e)
if(typeof f!=="number")return f.H()
d=a2.$2(n,p)
if(typeof d!=="number")return A.c0(d)
j=a2.$2(j,q)
c=a2.$2(o,q)
if(typeof c!=="number")return A.c0(c)
if(typeof j!=="number")return j.H()
b=a2.$2(n,q)
if(typeof b!=="number")return A.c0(b)
a=new A.a(-(m+2*l+k-(i+2*h+g))*a5,-(f+2*e+d-(j+2*c+b))*a5,1).gD()
b=B.d.q(B.c.J((a.a*0.5+0.5)*255),0,255)
if(!(s>=0&&s<a0))return A.h(a1,s)
a1[s]=b
b=s+1
c=B.d.q(B.c.J((a.b*0.5+0.5)*255),0,255)
if(!(b<a0))return A.h(a1,b)
a1[b]=c
c=s+2
b=B.d.q(B.c.J((a.c*0.5+0.5)*255),0,255)
if(!(c<a0))return A.h(a1,c)
a1[c]=b
b=s+3
if(!(b<a0))return A.h(a1,b)
a1[b]=255
s+=4}return a1},
nF(a,b,c,d){var s,r,q,p,o,n,m,l,k,j=d*b*4,i=new Uint8Array(j),h=new A.fJ()
h.bM(1337)
s=new Float32Array(b)
for(r=0;r<b;++r){q=h.ad()
if(!(r<b))return A.h(s,r)
s[r]=(q*2-1)*0.18}p=B.c.J(B.c.q(c,0,1)*255)
for(o=0,n=0;n<b;++n)for(m=0;m<d;++m){l=B.c.q(a+s[n],0.04,1)
if(!(o>=0&&o<j))return A.h(i,o)
i[o]=255
q=o+1
k=B.c.J(l*255)
if(!(q<j))return A.h(i,q)
i[q]=k
k=o+2
if(!(k<j))return A.h(i,k)
i[k]=p
k=o+3
if(!(k<j))return A.h(i,k)
i[k]=255
o+=4}return i},
nK(b1,b2,b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=b5*b4*4,b0=new Uint8Array(a9)
for(s=b1.a,r=b3.a,q=b1.b,p=b3.b,o=b1.c,n=b3.c,m=0,l=0;l<b4;++l){k=l/b4*b2
j=B.c.b_(k)
for(i=0;i<b5;++i){h=i/b5*b2
g=B.c.b_(h)
for(f=1e9,e=-1;e<=1;++e)for(d=j+e,c=-1;c<=1;++c){b=g+c
a=B.d.K(B.d.K(b,b2)+b2,b2)
a0=B.d.K(B.d.K(d,b2)+b2,b2)
a1=h-(b+A.lJ(a,a0))
a2=k-(d+A.lJ(a+107,a0+233))
a3=Math.sqrt(a1*a1+a2*a2)
if(a3<f)f=a3}a4=B.c.q(f,0,1)
a5=1-a4
a6=B.c.J(B.c.q(s*a5+r*a4,0,1)*255)
a7=B.c.J(B.c.q(q*a5+p*a4,0,1)*255)
a8=B.c.J(B.c.q(o*a5+n*a4,0,1)*255)
if(!(m>=0&&m<a9))return A.h(b0,m)
b0[m]=a6
a5=m+1
if(!(a5<a9))return A.h(b0,a5)
b0[a5]=a7
a5=m+2
if(!(a5<a9))return A.h(b0,a5)
b0[a5]=a8
a5=m+3
if(!(a5<a9))return A.h(b0,a5)
b0[a5]=255
m+=4}}return b0},
nI(b2,b3,b4,b5,b6,b7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=b7*b3*4,a1=new Uint8Array(a0),a2=B.c.J(B.c.q(b5.a,0,1)*255),a3=B.c.J(B.c.q(b5.b,0,1)*255),a4=B.c.J(B.c.q(b5.c,0,1)*255),a5=B.c.J(B.c.q(b2.a,0,1)*255),a6=B.c.J(B.c.q(b2.b,0,1)*255),a7=B.c.J(B.c.q(b2.c,0,1)*255),a8=Math.sqrt(3),a9=b4*1.5,b0=b4*a8,b1=b4*(a8*0.5)
for(s=b6*0.5,r=b0*0.5,q=0,p=0;p<b3;++p)for(o=p/a9,n=0;n<b7;++n){m=B.c.J(o)
l=(m&1)!==0?r:0
k=n-(B.c.J((n-l)/b0)*b0+l)
j=p-m*a9
i=j>0?m+1:m-1
h=(i&1)!==0?r:0
g=n-(B.c.J((n-h)/b0)*b0+h)
f=p-i*a9
e=k*k+j*j<g*g+f*f
d=e?k:g
c=e?j:f
b=Math.abs(b1/Math.cos(B.c.K(B.c.K(Math.atan2(c,d),1.0471975511965976)+1.0471975511965976,1.0471975511965976)-0.5235987755982988)-Math.sqrt(d*d+c*c))<=s
e=b?a2:a5
if(!(q>=0&&q<a0))return A.h(a1,q)
a1[q]=e
e=q+1
a=b?a3:a6
if(!(e<a0))return A.h(a1,e)
a1[e]=a
a=q+2
e=b?a4:a7
if(!(a<a0))return A.h(a1,a)
a1[a]=e
e=q+3
if(!(e<a0))return A.h(a1,e)
a1[e]=255
q+=4}return a1},
nG(a,b,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=a2*a0*4,d=new Uint8Array(e),c=B.c.J(B.c.q(a1,0,1)*255)
for(s=0,r=0;r<a0;++r){q=B.d.bK(r,b)
p=B.d.K(r,b)/b
for(o=1-p,n=0;n<a2;++n){m=B.d.bK(n,b)
l=B.d.K(n,b)/b
k=B.d.K(m+q,4)
j=k===0||k===1
i=B.c.q((j?Math.min(p,o):Math.min(l,1-l))*8,0.65,1)
h=B.c.q(a+Math.sin((j?l:p)*3.141592653589793)*0.12,0.05,0.95)
g=B.c.J(i*255)
if(!(s>=0&&s<e))return A.h(d,s)
d[s]=g
g=s+1
f=B.c.J(h*255)
if(!(g<e))return A.h(d,g)
d[g]=f
f=s+2
if(!(f<e))return A.h(d,f)
d[f]=c
f=s+3
if(!(f<e))return A.h(d,f)
d[f]=255
s+=4}}return d},
lJ(a,b){var s=a*374761393+b*668265263&2147483647
return((s^s>>>13)*1274126177&2147483647)/2147483647},
ik:function ik(a,b,c){this.a=a
this.b=b
this.c=c},
c5(a){var s,r,q,p,o,n,m,l,k,j
for(s=a.$ti,r=new A.ao(a,a.gu(0),s.h("ao<Q.E>")),s=s.h("Q.E"),q=B.eJ,p=B.eT,o=!1;r.k();o=!0){n=r.d
if(n==null)n=s.a(n)
m=n.a
l=Math.min(q.a,m)
k=n.b
j=Math.min(q.b,k)
n=n.c
q=new A.a(l,j,Math.min(q.c,n))
p=new A.a(Math.max(p.a,m),Math.max(p.b,k),Math.max(p.c,n))}if(!o)throw A.c(A.j("Aabb.fromPoints requires at least one point",null))
return new A.ak(q,p)},
ak:function ak(a,b){this.a=a
this.b=b},
lm(a){var s
A.h0(a)
if(a<0.5)return 4*a*a*a
s=2*a-2
return 0.5*s*s*s+1},
j1:function j1(a){this.a=a},
n5(a){var s,r,q,p,o,n,m=a.a,l=new A.hx(),k=m.length
if(3>=k)return A.h(m,3)
s=m[3]
r=m[0]
if(7>=k)return A.h(m,7)
q=m[7]
p=m[4]
if(11>=k)return A.h(m,11)
o=m[11]
n=m[8]
if(15>=k)return A.h(m,15)
return new A.hw(A.b([l.$4(s+r,q+p,o+n,m[15]+m[12]),l.$4(m[3]-m[0],m[7]-m[4],m[11]-m[8],m[15]-m[12]),l.$4(m[3]+m[1],m[7]+m[5],m[11]+m[9],m[15]+m[13]),l.$4(m[3]-m[1],m[7]-m[5],m[11]-m[9],m[15]-m[13]),l.$4(m[3]+m[2],m[7]+m[6],m[11]+m[10],m[15]+m[14]),l.$4(m[3]-m[2],m[7]-m[6],m[11]-m[10],m[15]-m[14])],t.dV))},
bM:function bM(a,b){this.a=a
this.b=b},
cV:function cV(a,b){this.a=a
this.b=b},
hw:function hw(a){this.a=a},
hx:function hx(){},
ly(a){if(a.length!==16)throw A.c(A.j("Mat4.fromColumnMajor requires 16 values",null))
return new A.bc(new Float32Array(A.t(a)))},
lz(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.bc(q)},
kx(a,b,c){var s=b.gD(),r=c.a8(s).gD(),q=s.a8(r),p=new Float32Array(16)
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
p[12]=-r.bn(a)
p[13]=-q.bn(a)
p[14]=s.bn(a)
p[15]=1
return new A.bc(p)},
bc:function bc(a){this.a=a},
hK:function hK(){},
dh(a,b){var s=a.gD(),r=b/2,q=Math.sin(r)
return new A.cn(s.a*q,s.b*q,s.c*q,Math.cos(r))},
cn:function cn(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
io:function io(a,b){this.a=a
this.b=b},
ip:function ip(a,b,c,d){var _=this
_.a=a
_.b=b
_.d=c
_.f=d},
ag:function ag(a,b,c){this.a=a
this.b=b
this.c=c},
lS(a,b,c){var s=a.a,r=a.b,q=a.c
return new A.a(s+(b.a-s)*c,r+(b.b-r)*c,q+(b.c-q)*c)},
D:function D(a,b){this.a=a
this.b=b},
a:function a(a,b,c){this.a=a
this.b=b
this.c=c},
kq(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.e7(j,i,b,k,f,g,a,p,e,h,l,o,m,c,!1,n)},
e6:function e6(a,b){this.a=a
this.b=b},
c6:function c6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
e7:function e7(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
h9:function h9(){},
fr:function fr(a,b){this.a=a
this.b=b},
cJ:function cJ(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
fs:function fs(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
e9:function e9(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
ft:function ft(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
ei:function ei(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
fv:function fv(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fw:function fw(a,b){this.a=a
this.b=b},
cS:function cS(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
fx:function fx(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ek:function ek(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
fy:function fy(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
ev:function ev(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f
_.w=g},
fC:function fC(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
d8:function d8(a,b,c){this.a=a
this.b=b
this.c=c},
fE:function fE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
c9:function c9(a){this.b=a},
eb:function eb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aa(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.T(a.a,a.b,b,c,s,r)},
kz:function kz(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var _=this
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
nl(a){var s
switch(a.a){case 0:s=0
break
case 1:s=1
break
case 2:s=2.5
break
case 3:s=3.5
break
default:s=null}return s},
dg:function dg(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
fH:function fH(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
f_:function f_(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fI:function fI(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
lL(a){var s=A.kx(B.f,B.o,Math.abs(0)<0.99?B.m:B.f)
return new A.bN(A.lz(1,1,B.d.q(1,0.1,3),0.05).m(0,s))},
bN:function bN(a){this.a=a},
f7:function f7(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fM:function fM(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
pm(c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3=u.l,b4="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[5]=float[5](0.227027,0.1945946,0.1216216,0.054054,0.016216);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<5;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b5="bloomBlurH",b6="bloomBlurV",b7="dofBlurH",b8="dofBlurV",b9={},c0=c4.b
if(!c0.p(0,"shadows"))throw A.c(A.al(c4,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=c0.p(0,"ssao")
r=c0.p(0,"bloom")
q=c0.p(0,"dof")
p=c0.p(0,"grade")
o=c0.p(0,"ps1")
n=c0.p(0,"vhs")
m=c0.p(0,"volumetric")
c0=B.d.V(e9+1,2)
l=B.d.V(e8+1,2)
k=A.aa(B.aa,e9,e8,e7,b2)
j=A.aa(B.aa.cu(),e9,e8,b2,b2)
i=e7>1
h=A.aa(B.dF,e9,e8,b2,i?2:1)
g=A.aa(B.dE,c0,l,b2,b2)
A.aa(B.dN,e9,e8,b2,b2)
f=A.aa(B.dK,e9,e8,b2,b2)
e=A.aa(B.dD,f0,f0,b2,b2)
d=A.aa(B.dG,c0,l,b2,b2)
c=A.aa(B.dH,c0,l,b2,b2)
b=A.aa(B.dL,c0,l,b2,b2)
a=A.aa(B.dM,c0,l,b2,b2)
a0=$.mE()
a1=i?1:0
a2=A.aa(a0,e9,e8,b2,a1+(m?1:0)+1)
a0=A.aa(B.dA,c0,l,b2,b2)
a1=A.aa(B.dB,c0,l,b2,b2)
a3=A.aa(B.dC,e9,e8,b2,b2)
a4=A.aa(B.dI,e9,e8,b2,b2)
a5=A.aa(B.dO,e9,e8,b2,b2)
a6=A.aa(B.dJ,e9,e8,b2,b2)
a7=i?new A.d8(c2,k,j):b2
b9.a=null
a8=A.lL(B.bn)
if(m){a9=i?j:k
b0=new A.fl(c1,b3,"#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\n\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform mat4 uViewProjection;\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform float uShaftIntensity;\nuniform float uFogDensity;\nuniform float uAnisotropy;\nuniform mat4 uView;\nuniform mat4 uInverseProjection;\nuniform vec3 uVolumetricAlbedo;\nuniform float uVolumetricHeightFalloff;\nuniform float uVolumetricDustDensity;\nuniform float uVolumetricJitter;\nuniform float uVolumetricIntensity;\nuniform float uVolumetricSampleCount;\nuniform float uVolumetricSourceCount;\n\nuniform vec3 uSourcePosition0;\nuniform vec3 uSourceColor0;\nuniform float uSourceIntensity0;\nuniform float uSourceReferenceDistance0;\nuniform float uSourceCutoffDistance0;\nuniform vec3 uSourcePosition1;\nuniform vec3 uSourceColor1;\nuniform float uSourceIntensity1;\nuniform float uSourceReferenceDistance1;\nuniform float uSourceCutoffDistance1;\nuniform vec3 uSourcePosition2;\nuniform vec3 uSourceColor2;\nuniform float uSourceIntensity2;\nuniform float uSourceReferenceDistance2;\nuniform float uSourceCutoffDistance2;\nuniform vec3 uSourcePosition3;\nuniform vec3 uSourceColor3;\nuniform float uSourceIntensity3;\nuniform float uSourceReferenceDistance3;\nuniform float uSourceCutoffDistance3;\n\nfloat linearDepth(float depth) {\n  float z = depth * 2.0 - 1.0;\n  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);\n}\n\nfloat phaseHenyeyGreenstein(float cosTheta, float anisotropy) {\n  float g = clamp(anisotropy, -0.85, 0.85);\n  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;\n  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));\n}\n\nvec3 sourceContribution(\n  vec3 position,\n  vec3 color,\n  float intensity,\n  float referenceDistance,\n  float cutoffDistance,\n  vec3 viewRay,\n  float rayLength\n) {\n  vec4 clip = uViewProjection * vec4(position, 1.0);\n  if (clip.w <= 0.0) return vec3(0.0);\n  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;\n  float sourceDistance = length(sourceView);\n  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);\n  vec3 sampleToSource = sourceView - viewRay * tClosest;\n  float distanceToSource = max(length(sampleToSource), 1e-3);\n  float cutoff = 1.0 - smoothstep(\n    cutoffDistance * 0.65, cutoffDistance, sourceDistance);\n  float inverseSquare = intensity * referenceDistance * referenceDistance /\n      max(distanceToSource * distanceToSource,\n          referenceDistance * referenceDistance);\n  // The incoming direction is source -> sample and the outgoing direction is\n  // sample -> camera. This is the same phase convention as the directional\n  // medium path, but now evaluated against the located source.\n  float phase = phaseHenyeyGreenstein(\n    dot(normalize(sampleToSource), viewRay), uAnisotropy);\n  // Located practicals and lightning must also acquire visible body in a\n  // dust-filled room. Use the same broad haze plus particulate density as the\n  // directional march; otherwise a clear-air fog toggle would accidentally\n  // erase dust-lit source rays while the directional shafts still showed it.\n  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);\n  float mediumWeight = 1.0 - exp(-max(\n    mediumDensity * min(rayLength, cutoffDistance), 0.0));\n  float pathWeight = clamp(\n    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);\n  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *\n    uVolumetricIntensity * 0.35;\n}\n\nvoid main() {\n  float depth = texture(uSceneDepth, vUv).r;\n  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);\n  viewPoint /= max(abs(viewPoint.w), 1e-5);\n  vec3 viewRay = normalize(viewPoint.xyz);\n  // linearDepth is camera-space Z; convert it to distance along the actual\n  // reconstructed ray so wide and tall projections integrate equally.\n  float cameraDepth = linearDepth(depth);\n  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);\n  float density = max(uFogDensity, 0.0);\n\n  // A fixed, bounded integral keeps the pass deterministic and makes its\n  // cost predictable on weak adapters. The depth buffer stops integration at\n  // the first opaque surface, so shafts do not leak through geometry.\n  const int maxSampleCount = 24;\n  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));\n  vec3 scatter = vec3(0.0);\n  float transmittance = 1.0;\n  float stepLength = rayLength / float(sampleCount);\n  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);\n  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);\n  for (int i = 0; i < maxSampleCount; i++) {\n    if (i >= sampleCount) break;\n    float distanceAlongRay = clamp(\n      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);\n    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));\n    // Dust is a separate, host-resolved particulate phase. It is denser near\n    // the occupied room volume than the broad atmospheric haze, so shafts gain\n    // visible body without turning the far horizon opaque. At zero density the\n    // extra term is exactly zero and the established fog path is unchanged.\n    float dustWeight = exp(-max(distanceAlongRay *\n      uVolumetricHeightFalloff * 0.45, 0.0));\n    float opticalDensity = density +\n      max(uVolumetricDustDensity, 0.0) * dustWeight;\n    float opticalDepth = opticalDensity * stepLength * heightWeight;\n    float sampleTransmittance = exp(-opticalDepth);\n    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);\n    scatter += transmittance * (uLightColor * uVolumetricAlbedo *\n      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;\n    transmittance *= sampleTransmittance;\n  }\n\n  if (uVolumetricSourceCount > 0.5) {\n    scatter += sourceContribution(\n      uSourcePosition0, uSourceColor0, uSourceIntensity0,\n      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 1.5) {\n    scatter += sourceContribution(\n      uSourcePosition1, uSourceColor1, uSourceIntensity1,\n      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 2.5) {\n    scatter += sourceContribution(\n      uSourcePosition2, uSourceColor2, uSourceIntensity2,\n      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 3.5) {\n    scatter += sourceContribution(\n      uSourcePosition3, uSourceColor3, uSourceIntensity3,\n      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);\n  }\n\n  // Fade the final sample at the far plane and keep the additive output\n  // bounded so a storm flash cannot blow out the entire frame.\n  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);\n  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);\n}\n","#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\nuniform sampler2D uVolumetric;\nuniform float uVolumetricStrength;\n\nvoid main() {\n  vec3 light = texture(uVolumetric, vUv).rgb;\n  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);\n}\n",c2,e1,c8,g,f,a9,h,A.b([],t.J))}else b0=b2
g=t.E
b1=A.b([],g)
if(!m)h=i?j:k
if(r){B.a.F(b1,A.b([new A.cJ(c1,b3,b4,c2,b5,b5,B.b9,!0,h,b,e0,c0,l),new A.cJ(c1,b3,b4,c2,b6,b6,B.f5,!1,b,a,c6,c0,l),new A.e9(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",c2,c7,a,h,a2)],g))
h=a2}if(q){B.a.F(b1,A.b([new A.cS(c1,b3,b4,c2,b7,b7,B.ba,h,a0,e0,c0,l),new A.cS(c1,b3,b4,c2,b8,b8,B.f6,a0,a1,d1,c0,l),new A.ek(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// Circle-of-confusion is a simple linear ramp from the focus distance\n// outward (front and back treated the same \u2014 no separate near/far falloff\n// curve), clamped to [0,1] and scaled by uStrength so\n// PostProcessState.depthOfFieldStrength == 0 is a true no-op (coc == 0\n// everywhere, oColor == the sharp source exactly).\nvoid main(){\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n  float coc=clamp(abs(depth-uFocusDistance)/max(uFocusRange,0.0001),0.0,1.0)*uStrength;\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  vec3 blurred=texture(uBlurred,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,coc),1.0);\n}\n",c2,e0,d2,e1,c8,h,f,a1,a3)],g))
h=a3}if(p){B.a.j(b1,new A.ev(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",c2,d4,h,a4))
h=a4}if(o){B.a.j(b1,new A.f_(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",c2,h,a5))
h=a5}if(n){B.a.j(b1,new A.fk(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',c2,e6,e5,h,a6))
h=a6}j=A.b([new A.ei(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d7,d6,c5,f)],g)
if(s)j.push(new A.fa(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=8;\nconst vec3 KERNEL[8]=vec3[8](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    // NDC [-1,1] -> UV [0,1] requires the constant 0.5, not vUv (the\n    // *current* fragment's own UV) \u2014 adding vUv here was a real bug: it\n    // conflated \"this sample's own absolute reprojected screen position\"\n    // with \"an offset relative to the current fragment,\" producing an\n    // error of (vUv-0.5) per axis that grows with distance from screen\n    // center. That's exactly what produced a huge, blobby, non-local dark\n    // region instead of contact occlusion \u2014 every sample tested a wildly\n    // wrong depth location except right at screen center, where the error\n    // happened to be near zero.\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    occlusion+=(occluderView.z>=samplePos.z+0.02?1.0:0.0)*rangeCheck;\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",c2,e1,c8,d))
if(s)j.push(new A.f9(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float centerDepth=linearDepth(texture(uSceneDepth,vUv).r);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleDepth=linearDepth(texture(uSceneDepth,sampleUv).r);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*4.0);\n      sum+=texture(uSsaoRaw,sampleUv).r*depthWeight;\n      weightSum+=depthWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',c2,e4,e1,c8,c0,l,d,c))
j.push(new A.f7(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d7,d6,c5,c9,b2,b2,new A.jL(b9),e))
j.push(new A.f8(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nuniform vec3 uReflectionColor;\nuniform float uReflectionIntensity;\nuniform float uReflectionConfidence;\nuniform vec2 uShadowMapTexelSize;\nuniform float uShadowFilterRadius;\nuniform float uShadowBias;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uSpecularScale;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nuniform float uSurfaceSnowCoverage;\nuniform float uSurfaceDissolution;\nuniform float uThermalSourceCount;\nuniform vec3 uThermalSourcePosition0;\nuniform float uThermalSourceRadius0;\nuniform float uThermalSourceDissolution0;\nuniform vec3 uThermalSourcePosition1;\nuniform float uThermalSourceRadius1;\nuniform float uThermalSourceDissolution1;\nuniform vec3 uThermalSourcePosition2;\nuniform float uThermalSourceRadius2;\nuniform float uThermalSourceDissolution2;\nuniform vec3 uThermalSourcePosition3;\nuniform float uThermalSourceRadius3;\nuniform float uThermalSourceDissolution3;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return lightColor*lightIntensity*ndotl*coneFalloff*\n    distanceFalloff*enabled;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0);\n  float ndotl=max(dot(normal,lightDir),0.0);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlick(hdotv,f0);\n  float distribution=distributionGgx(ndoth,roughness);\n  float geometry=geometrySmith(ndotv,ndotl,roughness);\n  vec3 numerator=distribution*geometry*fresnel;\n  float denominator=max(4.0*ndotv*ndotl,0.001);\n  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog keeps the smooth distance ramp for authored horizon control, but\n// the participating-medium term is an analytic optical depth along the actual\n// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the\n// integral has a stable constant-height limit and therefore does not shimmer\n// when a surface is nearly level with the camera. Zero density remains an\n// exact no-op; the host can still use the distance ramp independently.\nfloat heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){\n  float segmentLength=length(rayEnd-rayStart);\n  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;\n  float falloff=max(uFogHeightFalloff,0.);\n  float h0=max(rayStart.y,0.);\n  float h1=max(rayEnd.y,0.);\n  float integral;\n  if(falloff<=0.||abs(h1-h0)<=0.0001){\n    integral=segmentLength*exp(-falloff*h0);\n  }else{\n    float denominator=falloff*(h1-h0);\n    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;\n  }\n  return max(uFogDensity*integral,0.);\n}\n\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);\n  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);\n  float mediumFactor=1.-exp(-opticalDepth);\n  return clamp(max(distFactor,mediumFactor),0.,1.);\n}\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);\n  // Fixed low-discrepancy offsets avoid the directional shimmer of a regular\n  // square lattice while remaining deterministic and free of per-frame noise.\n  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);\n  float sum=0.;\n  sum+=sampleShadow(projCoord+vec3(vec2(-.942,-.399)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.945,-.768)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.094,.886)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.344,.294)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.716,.642)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.688,-.089)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.287,-.885)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.052,.008)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.831,.486)*t,0.),bias);\n  return sum/9.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // \xa76.2's alpha-masked route. Deliberately the first thing after the\n  // fetch it depends on, and ahead of all the lighting below: a discarded\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  direct*=uDirectLightScale;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  float upward=clamp(n.y*0.5+0.5,0.0,1.0);\n  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao*mix(0.85,1.15,upward);\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Weather changes the material before direct and environment response.\n  // Thawing therefore affects the same specular lobe the viewer sees,\n  // instead of changing only diffuse color after the highlight is computed.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);\n  // A steady spherical conductive field decays approximately as 1/r. The\n  // host keeps the slow latent material memory in uSurfaceDissolution; this\n  // local term therefore models the spatial heat field without making warm\n  // surfaces snap back or disappear at an arbitrary exponential radius.\n  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/\n      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));\n  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/\n      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));\n  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/\n      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));\n  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/\n      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));\n  thermalDissolution=clamp(thermalDissolution,0.0,1.0);\n  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*\n    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);\n  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);\n  float dissolution=thermalDissolution;\n  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);\n  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  // A continuous water film forms a second dielectric lobe. It smooths the\n  // authored surface only as coverage rises, so damp cloth stays diffuse\n  // while puddled stone gains a tight grazing reflection.\n  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);\n  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  specular*=uDirectLightScale*uSpecularScale;\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*(1.0-0.25*rough));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);\n  float coat=coatStrength*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*\n    uDirectLightScale*uSpecularScale;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  // Environment fallback reflections are deliberately bounded and weighted\n  // by wetness/grazing angle. A real probe/history hit can raise confidence;\n  // the current host fallback remains visible but never masquerades as SSR.\n  float reflectionNdotV=max(dot(n,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metal);\n  vec3 envFresnel=f0+(max(vec3(1.0-specRough),f0)-f0)*pow(clamp(1.0-reflectionNdotV,0.0,1.0),5.0);\n  float envGloss=(1.0-specRough)*(1.0-specRough);\n  float reflectionSurface=clamp(metal*0.85+(1.0-metal)*(wetness+0.18*dissolution+envGloss*0.25),0.0,1.0);\n  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);\n  float reflectionWeight=clamp(\n    uReflectionIntensity*reflectionSurface*\n      (1.0-0.72*rough)*reflectionConfidence,\n    0.0,1.0);\n  lit+=uReflectionColor*envFresnel*reflectionWeight*ao;\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  oGlow=vec4(emissive,1.);\n}\n",d7,d6,c5,d8,d9,d3,d5,e2,new A.jM(b9,a8),c9,d0,e3,s,e9,e8,f0,f0,e,c,k))
if(a7!=null)j.push(a7)
if(b0!=null)j.push(b0)
B.a.F(j,b1)
j.push(new A.dg(c1,b3,u.b,c2,h,c3))
return new A.el(j)},
jL:function jL(a){this.a=a},
jM:function jM(a,b){this.a=a
this.b=b},
f8:function f8(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
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
fN:function fN(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
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
fa:function fa(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
fP:function fP(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
f9:function f9(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fO:function fO(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fk:function fk(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fU:function fU(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
fl:function fl(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
fW:function fW(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fV:function fV(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dl:function dl(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fo:function fo(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fZ:function fZ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lT(a,b){var s=t.c,r=A.d5(a,!0,s)
B.a.ai(r,new A.hF(t.b))
s=A.ch(r,s)
if(s.length===0)A.m(A.j("KeyframeTrack requires at least one keyframe",null))
return new A.fj(b,s)},
eF:function eF(a,b){this.a=a
this.b=b},
b0:function b0(a,b,c){this.a=a
this.b=b
this.$ti=c},
bJ:function bJ(){},
hF:function hF(a){this.a=a},
iN:function iN(a,b){this.a=a
this.b=b},
fj:function fj(a,b){this.a=a
this.b=b},
h6:function h6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ct:function ct(a,b){this.a=a
this.b=0
this.c=b},
h7:function h7(a){this.a=a},
h8:function h8(a){this.a=a},
ex:function ex(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var _=this
_.cy=a
_.db=b
_.dx=!0
_.fr=_.dy=null
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
_.at=m
_.ax=n
_.ay=o
_.ch=p
_.CW=q
_.cx=null},
kC(a,b,c,d,e,f,g,h,i,j,k,l,m){var s=new A.b3(i,l,B.I,A.b([],t.D),g,f,b,h,m,d,a,!0,!0,k,e)
s.bL(a,b,!0,d,e,f,g,h,i,!0,k,l,m)
return s},
b3:function b3(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
_.at=k
_.ax=l
_.ay=m
_.ch=n
_.CW=o
_.cx=null},
iA:function iA(a,b){this.a=a
this.b=b},
f5(a,b){return new A.dq(a,b)},
hy:function hy(a,b){this.a=a
this.b=b},
eq:function eq(a,b){this.a=a
this.b=b},
et:function et(a,b){this.a=a
this.b=b},
eu:function eu(a,b){this.a=a
this.b=b},
ep:function ep(a,b,c){this.a=a
this.b=b
this.c=c},
es:function es(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
ce:function ce(a,b){this.a=a
this.b=b},
cW:function cW(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
er:function er(a,b){this.a=a
this.b=b},
cp:function cp(a,b){this.a=a
this.b=b},
dq:function dq(a,b){this.a=a
this.b=b},
bi:function bi(a,b){this.a=a
this.b=b},
f:function f(a,b){this.a=a
this.b=b},
cN:function cN(a,b){this.a=a
this.b=b},
ej:function ej(a,b){this.a=a
this.b=b},
i9(a,b,c,d){var s=0,r=A.kW(t.ac),q,p,o,n,m,l,k,j,i
var $async$i9=A.kZ(function(e,f){if(e===1)return A.kQ(f,r)
for(;;)switch(s){case 0:j=B.bp.e1(a)
i=j==null?null:new A.f4(j.a,new A.hd(new A.he(),new A.f2()),new A.eo(A.b([],t.c4),B.bw),A.b([],t.cR),B.a7,A.b([],t.cL),null)
if(i==null){q=null
s=1
break}p=A.d(a.clientWidth)>0?A.d(a.clientWidth):A.d(a.width)
o=A.d(a.clientHeight)>0?A.d(a.clientHeight):A.d(a.height)
n=A.lP(o,p,A.aO(A.l(v.G.window).devicePixelRatio),2,!0)
a.width=n.c
a.height=n.d
m=A.pr(c)
s=3
return A.kP(A.jK(new A.ia(n),m,i,n),$async$i9)
case 3:i.aQ()
l=A.nQ(i.w.a.b)
B.a.j(i.d,l)
m=t.N
k=new A.df(a,i,l,new A.hu(),A.kC(B.C,null,!0,B.G,null,null,null,null,"root",!0,0,B.I,-1),B.bu,B.du,n,new A.hb(),A.at(m),new A.h7(A.ax(m,t.aQ)),A.b([],t.fA))
k.y=A.lD(5,B.r)
k.w=!0
k.dr()
q=k
s=1
break
case 1:return A.kR(q,r)}})
return A.kS($async$i9,r)},
cc:function cc(a,b){this.a=a
this.b=b},
df:function df(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
_.ay=null
_.ch=!1
_.CW=0
_.db=_.cx=!1
_.fr=_.dy=_.dx=0
_.fx=null
_.id=_.go=_.fy=0},
ia:function ia(a){this.a=a},
i_:function i_(a){this.a=a},
i0:function i0(a){this.a=a},
i1:function i1(a){this.a=a},
i2:function i2(){},
i3:function i3(a){this.a=a},
i4:function i4(a){this.a=a},
i5:function i5(a){this.a=a},
i6:function i6(a){this.a=a},
i7:function i7(a){this.a=a},
i8:function i8(a){this.a=a},
eX:function eX(a,b){this.a=a
this.b=b},
hz:function hz(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
hA:function hA(){},
hB:function hB(){},
dM:function dM(a,b){this.a=a
this.b=b},
by:function by(a,b){var _=this
_.a=0
_.b=a
_.f=_.c=null
_.$ti=b},
b2:function b2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=0
_.$ti=d},
n1(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.cb(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
ha:function ha(a,b){this.a=a
this.b=b},
c7:function c7(a,b){this.a=a
this.b=b},
hf:function hf(a,b){this.a=a
this.b=b},
hj:function hj(a,b){this.a=a
this.b=b},
cb:function cb(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
af:function af(a,b){this.a=a
this.b=b},
iU:function iU(){this.a=null},
o1(a){var s=new A.fm(a,B.h,new A.iU(),A.ob(a))
s.cV(a)
return s},
ob(a){var s,r,q=t.du.a(a.getSupportedExtensions())
if(q==null)return A.at(t.N)
s=A.at(t.N)
r=J.a6(t.dy.b(q)?q:new A.cM(q,A.H(q).h("cM<1,u>")))
while(r.k())s.j(0,r.gn())
return s},
ai(a,b){var s,r
if(a.b!==B.h)A.m(A.k(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.d(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.d(s.drawingBufferWidth),A.d(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.d(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
lV(a,b){var s
if(a.b!==B.h)A.m(A.k(u.k))
switch(b){case 1:a.a.drawBuffers(A.b([A.d(v.G.WebGL2RenderingContext.COLOR_ATTACHMENT0)],t.n))
break
case 2:s=v.G
a.a.drawBuffers(A.b([A.d(s.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.d(s.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
break
default:throw A.c(A.j("WebGl2Device.setColorAttachmentCount: count must be 1 or 2, got "+b,null))}},
o6(a,b,c){var s,r,q,p
if(a.b!==B.h)A.m(A.k(u.k))
s=t.V.a(c.a)
r=a.a
q=v.G
r.activeTexture(A.d(q.WebGL2RenderingContext.TEXTURE0)+b)
p=s.f
if(p!=null){r.bindTexture(A.d(q.WebGL2RenderingContext.TEXTURE_2D),p)
return}throw A.c(A.k("WebGl2Device.bindGlowTexture: target has no glow attachment \u2014 create it with GpuTargetAttachment.colorAndGlow/colorDepthGlow, and resolve a multisampled source before sampling (single-sample only)"))},
o5(a,b){var s
switch(b.a){case 0:s=A.d(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.d(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.d(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.d(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
o4(a,b){var s
switch(b.a){case 0:s=A.d(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.d(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
lU(a,b){var s
switch(b.a){case 0:s=A.d(v.G.WebGL2RenderingContext.ZERO)
break
case 1:s=A.d(v.G.WebGL2RenderingContext.ONE)
break
case 2:s=A.d(v.G.WebGL2RenderingContext.SRC_ALPHA)
break
case 3:s=A.d(v.G.WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA)
break
case 4:s=A.d(v.G.WebGL2RenderingContext.DST_ALPHA)
break
case 5:s=A.d(v.G.WebGL2RenderingContext.ONE_MINUS_DST_ALPHA)
break
default:s=null}return s},
o2(a,b){var s
switch(b.a){case 0:s=A.d(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.d(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.d(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
a4(a,b){var s,r,q,p
if(a.b!==B.h)A.m(A.k(u.k))
s=a.f
r=s.e2(b)
if(r.a===0)return
if(r.p(0,B.ac)){q=v.G
p=a.a
if(b.a)p.enable(A.d(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.d(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.p(0,B.ad))a.a.depthFunc(A.o5(a,b.b))
if(r.p(0,B.ae))a.a.depthMask(b.c)
if(r.p(0,B.ai)){q=v.G
p=a.a
if(b.w)p.enable(A.d(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.d(q.WebGL2RenderingContext.CULL_FACE))}if(r.p(0,B.aj))a.a.cullFace(A.o4(a,b.x))
if(r.p(0,B.aY)){q=v.G.WebGL2RenderingContext
q=A.d(q.CCW)
a.a.frontFace(q)}if(r.p(0,B.af)){q=v.G
p=a.a
if(b.d)p.enable(A.d(q.WebGL2RenderingContext.BLEND))
else p.disable(A.d(q.WebGL2RenderingContext.BLEND))}if(r.p(0,B.ag))a.a.blendFunc(A.lU(a,b.e),A.lU(a,b.f))
if(r.p(0,B.ah))a.a.blendEquation(A.o2(a,b.r))
if(r.p(0,B.aW))a.a.colorMask(!0,!0,!0,!0)
if(r.p(0,B.aX)){q=v.G.WebGL2RenderingContext
a.a.disable(A.d(q.SCISSOR_TEST))}s.a=b},
o3(a,b){var s
switch(b.a){case 0:s=A.d(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.d(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.d(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.d(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
aW(a,b,c,d,e,f){var s
if(a.b!==B.h)A.m(A.k(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.o3(a,b))},
ar(a,b){var s
if(a.b!==B.h)A.m(A.k(u.k))
s=A.l(b.a)
a.a.useProgram(s)
a.e=s},
e(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.h)A.m(A.k(u.k))
s=a.e
if(s==null)throw A.c(A.k("WebGl2Device.setUniform called with no bound program"))
r=a.a
q=A.C(r.getUniformLocation(s,b))
if(q==null)return
switch(c.a.a){case 0:r.uniform1f(q,A.h0(c.b))
break
case 1:p=t.B.a(c.b)
o=p.length
if(0>=o)return A.h(p,0)
n=p[0]
if(1>=o)return A.h(p,1)
r.uniform2f(q,n,p[1])
break
case 2:p=t.B.a(c.b)
o=p.length
if(0>=o)return A.h(p,0)
n=p[0]
if(1>=o)return A.h(p,1)
m=p[1]
if(2>=o)return A.h(p,2)
r.uniform3f(q,n,m,p[2])
break
case 3:p=t.B.a(c.b)
o=p.length
if(0>=o)return A.h(p,0)
n=p[0]
if(1>=o)return A.h(p,1)
m=p[1]
if(2>=o)return A.h(p,2)
l=p[2]
if(3>=o)return A.h(p,3)
A.ac(r,"uniform4f",[q,n,m,l,p[3]],t.H)
break
case 4:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 5:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 6:r.uniform1i(q,A.d(c.b))
break}},
a8(a,b){if(a.b!==B.h)A.m(A.k(u.k))
a.a.bindVertexArray(A.l(b.a))},
P(a,b,c){var s,r,q,p,o,n
if(a.b!==B.h)A.m(A.k(u.k))
s=c.a
r=a.a
q=v.G
r.activeTexture(A.d(q.WebGL2RenderingContext.TEXTURE0)+b)
if(s instanceof A.dW){p=s.d>1?A.d(q.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.d(q.WebGL2RenderingContext.TEXTURE_2D)
r.bindTexture(p,s.a)
return}if(s instanceof A.dV){o=s.b
if(o!=null){r.bindTexture(A.d(q.WebGL2RenderingContext.TEXTURE_2D),o)
return}n=s.e
if(n!=null){r.bindTexture(A.d(q.WebGL2RenderingContext.TEXTURE_2D),n)
return}throw A.c(A.k("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.c(A.k("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
o7(a,b,c){var s,r,q,p
if(a.b!==B.h)A.m(A.k(u.k))
s=A.l(b.a)
r=a.a
q=v.G
r.bindBuffer(A.d(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),s)
A:{p=q.WebGL2RenderingContext
r.bufferData(A.d(p.ELEMENT_ARRAY_BUFFER),c,A.d(q.WebGL2RenderingContext.STATIC_DRAW))
break A}},
o8(a,b){var s
switch(b.a){case 0:s=A.d(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.d(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.d(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
lY(a,b){var s,r,q,p
if(a.b!==B.h)A.m(A.k(u.k))
s=a.a
r=A.C(s.createBuffer())
if(r==null)throw A.c(A.k("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.aw?A.d(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.d(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.o8(a,b.b))
return new A.bm(r)},
lW(a,b){var s
switch(b.a){case 0:s=A.d(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.d(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.d(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
lX(a,b){var s
switch(b.a){case 0:s=A.d(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.d(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
o9(a,b,c){var s=b>c?b:c,r=1
for(;s>1;s=(s+1)/2|0)++r
return r},
kD(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(a.b!==B.h)A.m(A.k(u.k))
s=a.a
r=A.C(s.createTexture())
if(r==null)throw A.c(A.k("WebGl2Device: gl.createTexture() returned null"))
q=b.c
p=q>1
o=v.G
n=p?A.d(o.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.d(o.WebGL2RenderingContext.TEXTURE_2D)
s.bindTexture(n,r)
m=b.d
l=m?A.o9(a,b.a,b.b):1
k=t.H
j=b.a
i=b.b
if(p)A.ac(s,"texStorage3D",[n,l,A.d(o.WebGL2RenderingContext.RGBA8),j,i,q],k)
else A.ac(s,"texStorage2D",[n,l,A.d(o.WebGL2RenderingContext.RGBA8),j,i],k)
s.texParameteri(n,A.d(o.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.lW(a,b.e))
s.texParameteri(n,A.d(o.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.lW(a,b.f))
p=b.r
s.texParameteri(n,A.d(o.WebGL2RenderingContext.TEXTURE_WRAP_S),A.lX(a,p))
s.texParameteri(n,A.d(o.WebGL2RenderingContext.TEXTURE_WRAP_T),A.lX(a,p))
h=a.r.p(0,"EXT_texture_filter_anisotropic")
g=h?a.c3(34047):1
f=b.w
if(!isFinite(f)||f<1||f>16)A.m(A.al(f,"requested","anisotropy must be finite and in [1, 16]"))
if(h&&isFinite(g)&&g>=1)e=g>16?16:g
else e=1
f=f<e?f:e
if(f>1)s.texParameterf(n,34046,f)
return new A.bm(new A.dW(r,j,i,q,m))},
kE(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.h)A.m(A.k(u.k))
s=t.R.a(b.a)
r=s.d
if(c>=r)throw A.c(A.j("WebGl2Device.uploadTextureLayer: layer "+c+" out of range for "+r+"-layer texture",null))
q=s.b
p=s.c
o=q*p*4
n=d.length
if(n!==o)throw A.c(A.j("WebGl2Device.uploadTextureLayer: expected "+o+" RGBA8 bytes for "+q+"x"+p+", got "+n,null))
r=r>1
n=v.G
m=r?A.d(n.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.d(n.WebGL2RenderingContext.TEXTURE_2D)
l=a.a
l.bindTexture(m,s.a)
k=t.H
if(r)A.ac(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.d(n.WebGL2RenderingContext.RGBA),A.d(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.ac(l,"texSubImage2D",[m,0,0,0,q,p,A.d(n.WebGL2RenderingContext.RGBA),A.d(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
lZ(a,b){var s,r,q
if(a.b!==B.h)A.m(A.k(u.k))
s=t.R.a(b.a)
if(!s.e)return
r=v.G
q=s.d>1?A.d(r.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.d(r.WebGL2RenderingContext.TEXTURE_2D)
r=a.a
r.bindTexture(q,s.a)
r.generateMipmap(q)},
fn(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
m0(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.h)A.m(A.k(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.c(A.j("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.C(r.createFramebuffer())
if(q==null)throw A.c(A.k("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.d(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.a_
if(n&&!a1.e)throw A.c(A.j("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.ay||o===B.bD
l=d
k=d
j=d
i=d
if(n){r.drawBuffers(A.b([A.d(p.WebGL2RenderingContext.NONE)],t.n))
r.readBuffer(A.d(p.WebGL2RenderingContext.NONE))}else{o=a1.c
h=t.H
g=a1.b
if(o>1){k=A.C(r.createRenderbuffer())
r.bindRenderbuffer(A.d(p.WebGL2RenderingContext.RENDERBUFFER),k)
A.ac(r,c,[A.d(p.WebGL2RenderingContext.RENDERBUFFER),o,A.d(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.d(p.WebGL2RenderingContext.FRAMEBUFFER),A.d(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.d(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.C(r.createRenderbuffer())
r.bindRenderbuffer(A.d(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.ac(r,c,[A.d(p.WebGL2RenderingContext.RENDERBUFFER),o,A.d(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.d(p.WebGL2RenderingContext.FRAMEBUFFER),A.d(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.d(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.b([A.d(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.d(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.C(r.createTexture())
r.bindTexture(A.d(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.ac(r,b,[A.d(p.WebGL2RenderingContext.TEXTURE_2D),1,A.d(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.d(p.WebGL2RenderingContext.TEXTURE_2D),A.d(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.d(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.d(p.WebGL2RenderingContext.TEXTURE_2D),A.d(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.d(p.WebGL2RenderingContext.LINEAR))
A.ac(r,a,[A.d(p.WebGL2RenderingContext.FRAMEBUFFER),A.d(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.d(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.C(r.createTexture())
r.bindTexture(A.d(p.WebGL2RenderingContext.TEXTURE_2D),j)
A.ac(r,b,[A.d(p.WebGL2RenderingContext.TEXTURE_2D),1,A.d(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.d(p.WebGL2RenderingContext.TEXTURE_2D),A.d(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.d(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.d(p.WebGL2RenderingContext.TEXTURE_2D),A.d(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.d(p.WebGL2RenderingContext.LINEAR))
A.ac(r,a,[A.d(p.WebGL2RenderingContext.FRAMEBUFFER),A.d(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.d(p.WebGL2RenderingContext.TEXTURE_2D),j,0],h)
r.drawBuffers(A.b([A.d(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.d(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}}f=d
e=d
if(a1.e){o=a1.c
h=t.H
g=a1.b
if(o>1){f=A.C(r.createRenderbuffer())
r.bindRenderbuffer(A.d(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.ac(r,c,[A.d(p.WebGL2RenderingContext.RENDERBUFFER),o,A.d(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.d(p.WebGL2RenderingContext.FRAMEBUFFER),A.d(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.d(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.C(r.createTexture())
r.bindTexture(A.d(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.ac(r,b,[A.d(p.WebGL2RenderingContext.TEXTURE_2D),1,A.d(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.d(p.WebGL2RenderingContext.TEXTURE_2D),A.d(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.d(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.d(p.WebGL2RenderingContext.TEXTURE_2D),A.d(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.d(p.WebGL2RenderingContext.NEAREST))
A.ac(r,a,[A.d(p.WebGL2RenderingContext.FRAMEBUFFER),A.d(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.d(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.d(r.checkFramebufferStatus(A.d(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.d(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.d(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.kF(a0,q,l,k,f,e,j,i)
throw A.c(A.k("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.bm(new A.dV(q,l,k,f,e,j,i,s,a1.b,a1.c))},
kF(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
aL(a){var s
if(a.b!==B.h)A.m(A.k(u.k))
s=A.C(a.a.createVertexArray())
if(s==null)throw A.c(A.k("WebGl2Device: gl.createVertexArray() returned null"))
return new A.bm(s)},
m_(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.C(p.createShader(b))
if(o==null)throw A.c(A.f5(b===A.mx(A.mj(A.mB(),r),q,t.S)?B.aR:B.aS,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.aG(A.cE(p.getShaderParameter(o,A.d(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bW(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.c(A.f5(b===A.mx(A.mj(A.mB(),r),q,t.S)?B.aR:B.aS,s))}return o},
oa(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.h)A.m(A.k(u.k))
q=v.G
s=A.m_(a,A.d(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.m_(a,A.d(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.C(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.c(B.dU)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.aG(A.cE(o.getProgramParameter(n,A.d(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bW(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.f5(B.aT,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.A)(c),++l){k=c[l]
if(A.d(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.f5(B.aU,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.C(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.f5(B.aU,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.bm(n)},
bm:function bm(a){this.a=a},
dW:function dW(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dV:function dV(a,b,c,d,e,f,g,h,i,j){var _=this
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
fY:function fY(a){this.a=a
this.b=!1},
fm:function fm(a,b,c,d){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=c
_.r=d
_.w=!1},
iR:function iR(a){this.a=a},
iS:function iS(a){this.a=a},
jm:function jm(){},
fX:function fX(){},
iQ:function iQ(a){this.a=a},
iT:function iT(){},
jX(){return A.pG()},
pG(){var s=0,r=A.kW(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2
var $async$jX=A.kZ(function(h3,h4){if(h3===1)return A.kQ(h4,r)
for(;;)A:switch(s){case 0:g9={}
h0=v.G
h1=A.C(A.l(h0.document).querySelector("#showcase-canvas"))
h2=t.m
if(!h2.b(h1)){s=1
break}s=3
return A.kP(A.i9(h1,!0,B.aP,!0),$async$jX)
case 3:p=h4
if(p==null){s=1
break}o=p.y
o=o instanceof A.bt?o:null
if(o!=null){o.b=8.5
o.d=0.45
o.a=B.V
o.as=!0
o.at=0.18}n=p.f.co(B.dX)
p.f=n
p.f=n.e0(B.c6,1,B.aE,B.bq,B.cl,0.85,1.2)
p.r=A.lF()
m=A.C(A.l(h0.document).querySelector("#tone-map-select"))
if(h2.b(m))m.addEventListener("change",A.L(new A.jY(m,p)))
l=A.C(A.l(h0.document).querySelector("#post-preset-select"))
if(h2.b(l))l.addEventListener("change",A.L(new A.jZ(l,p,m)))
k=A.C(A.l(h0.document).querySelector("#turntable-toggle"))
j=A.C(A.l(h0.document).querySelector("#turntable-group"))
if(h2.b(k)){k.checked=!0
k.addEventListener("change",A.L(new A.k_(p,k)))}n=t.D
i=A.b([],n)
h=A.C(A.l(h0.document).querySelector("#camera-mode-select"))
if(h2.b(h))h.addEventListener("change",A.L(new A.k4(h,p,j,i,k)))
g=A.C(A.l(h0.document).querySelector("#shake-button"))
if(h2.b(g))g.addEventListener("click",A.L(new A.k5(p)))
f=A.C(A.l(h0.document).querySelector("#solar-time-slider"))
e=A.C(A.l(h0.document).querySelector("#solar-time-label"))
if(h2.b(f)){d=new A.kc(f,e,p)
f.addEventListener("input",A.L(new A.k6(d)))
d.$0()}c=A.C(A.l(h0.document).querySelector("#dof-slider"))
b=A.C(A.l(h0.document).querySelector("#dof-label"))
if(h2.b(c))c.addEventListener("input",A.L(new A.k7(c,b,p)))
a=A.C(A.l(h0.document).querySelector("#bloom-slider"))
a0=A.C(A.l(h0.document).querySelector("#bloom-label"))
if(h2.b(a))a.addEventListener("input",A.L(new A.k8(a,a0,p)))
a1=A.C(A.l(h0.document).querySelector("#ssao-slider"))
a2=A.C(A.l(h0.document).querySelector("#ssao-label"))
if(h2.b(a1))a1.addEventListener("input",A.L(new A.k9(a1,a2,p)))
a3=A.nB(30,4,4,30)
d=p.b
a4=d.gv().a2(a3,"ground")
a5=A.nD(1,40,40)
a6=d.gv().a2(a5,"center_sphere")
a7=A.nE(20,1.8,0.08,48)
a8=d.gv().a2(a7,"orbit_torus")
a9=A.nm(0.6,0.3,12,24)
b0=A.no(0.9,24,0.35)
b1=A.nn(0.9,24,0.4)
b2=A.kA(0.65)
b3=A.ny(0.35,2)
b4=A.nz(0.38)
b5=A.np(0.35)
b6=A.nC(0.08,2,0.55,0.55,0.55)
b7=[a9,b0,b1,b2,b3,b4,b5,b6]
b8=[d.gv().a2(a9,"satellite_capsule"),d.gv().a2(b0,"satellite_cylinder"),d.gv().a2(b1,"satellite_cone"),d.gv().a2(b2,"satellite_cube"),d.gv().a2(b3,"satellite_icosphere"),d.gv().a2(b4,"satellite_octahedron"),d.gv().a2(b5,"satellite_dodecahedron"),d.gv().a2(b6,"satellite_rounded_box")]
b9=p.ar(A.nH(B.c_,32,256,B.c3,2,256),"ground_grid_albedo",256,256)
c0=new Uint8Array(65536)
for(c1=0;c1<256;++c1)for(c2=c1*256,c3=B.d.K(c1,32)>=2,c4=0;c4<256;++c4){c5=!c3||B.d.K(c4,32)<2
c6=c2+c4
c7=c5?220:50
if(!(c6<65536)){q=A.h(c0,c6)
s=1
break A}c0[c6]=c7}c8=p.ar(A.nJ(c0,256,3,256),"ground_grid_normal",256,256)
c9=p.ar(A.nF(0.22,256,0.95,256),"brushed_metal_orm",256,256)
d0=p.ar(A.nG(0.22,8,256,0.4,256),"carbon_fiber_orm",256,256)
d1=p.ar(A.nI(B.c7,256,20,B.ce,2,256),"hex_shield_albedo",256,256)
d2=p.ar(A.nK(B.ca,6,B.c1,256,256),"voronoi_cell_albedo",256,256)
c2=A.aq(b9,0.2,0,"ground_pbr",0.1,1.5,c8,null,0.5,1,1,1,8,8)
d3=d.gv().M(c2)
c2=A.lB("hero_gold",0.12)
c2=d.gv().M(c2)
c3=A.aq(null,0.2,0,"hero_chrome",0.98,1,null,null,0.05,0.98,0.95,0.95,1,1)
c3=d.gv().M(c3)
c6=A.aq(null,0.2,0,"hero_copper",1,1,null,null,0.15,0.54,0.64,0.95,1,1)
c6=d.gv().M(c6)
c7=A.aq(null,0.2,0,"hero_silver",1,1,null,null,0.08,0.91,0.96,0.97,1,1)
c7=d.gv().M(c7)
d4=A.lA(0.9,B.c4,"hero_ceramic",0.18)
d4=d.gv().M(d4)
d5=A.hL(B.cb,"hero_plastic",0.22)
d5=d.gv().M(d5)
d6=A.aq(null,0.2,0,"hero_iron",0.85,1,null,null,0.28,0.58,0.57,0.56,1,1)
d6=d.gv().M(d6)
d7=A.aq(null,0.2,0,"hero_brushed",0.95,1,null,c9,0.22,1,0.95,0.95,1,1)
d7=d.gv().M(d7)
d8=A.aq(null,0.2,0,"hero_carbon",0.35,1,null,d0,0.25,0.18,0.15,0.15,1,1)
d8=d.gv().M(d8)
d9=A.aq(d1,0.2,0.8,"hero_hex",0.7,1,null,null,0.15,1,1,1,1,1)
d9=d.gv().M(d9)
e0=A.aq(d2,0.2,0.85,"hero_voronoi",0.1,1,null,null,0.3,1,1,1,1,1)
e1=A.lw(["gold",c2,"chrome",c3,"copper",c6,"silver",c7,"ceramic",d4,"plastic",d5,"iron",d6,"brushed",d7,"carbon",d8,"hex",d9,"voronoi",d.gv().M(e0)],t.N,t.eL)
e0=A.aq(null,0.2,0,"torus_chrome",0.98,1,null,null,0.06,0.98,0.95,0.95,1,1)
e2=d.gv().M(e0)
e0=A.hL(B.ck,"sat_emerald",0.22)
e0=d.gv().M(e0)
d9=A.lA(0.8,B.ci,"sat_ruby",0.18)
d9=d.gv().M(d9)
d8=A.hL(B.cc,"sat_sapphire",0.2)
d8=d.gv().M(d8)
d7=A.aq(null,0.2,0,"sat_copper",1,1,null,null,0.2,0.54,0.64,0.95,1,1)
d7=d.gv().M(d7)
d6=A.lB("sat_gold",0.14)
d6=d.gv().M(d6)
d5=A.aq(null,0.2,0,"sat_chrome",0.98,1,null,null,0.05,0.98,0.95,0.95,1,1)
d5=d.gv().M(d5)
d4=A.hL(B.cg,"sat_amethyst",0.24)
d4=d.gv().M(d4)
c7=A.aq(null,0.2,0,"sat_brushed",0.9,1,null,c9,0.25,1,1,1,1,1)
e3=[e0,d9,d8,d7,d6,d5,d4,d.gv().M(c7)]
c7=p.e
c7.aV(0,d3,a4,a3,"ground_node",new A.ag(B.o,B.A,1))
d4=e1.t(0,"gold")
d4.toString
e4=c7.aV(0,d4,a6,a5,"center_sphere_node",new A.ag(B.V,B.A,1))
e5=A.C(A.l(h0.document).querySelector("#material-select"))
if(h2.b(e5))e5.addEventListener("change",A.L(new A.ka(e1,e5,e4)))
e6=c7.aV(0,e2,a8,a7,"torus_ring_node",new A.ag(B.V,B.A,1))
e7=A.kC(B.C,null,!0,B.G,null,null,null,null,"orbit_ring",!0,0,B.I,-1)
e4.bk(e7)
B.a.a0(i)
for(e8=0;e8<8;++e8){e9=e8*0.7853981633974483
c2=b8[e8]
c3=b7[e8]
B.a.j(i,e7.aV(0,e3[e8],c2,c3,"satellite_"+e8,new A.ag(new A.a(Math.cos(e9)*3.4,0,Math.sin(e9)*3.4),B.A,1)))}f0=A.kA(0.35)
f1=d.gv().a2(f0,"asteroid_mesh")
f2=d.gv().M(B.d5)
c2=t.ek
f3=A.b([],c2)
f4=new A.fJ()
f4.bM(1337)
for(e8=0;e8<48;++e8){e9=e8/48*3.141592653589793*2+f4.ad()*0.1
f5=5.2+f4.ad()*1.8
c3=f4.ad()
c6=f4.ad()
f6=A.dh(new A.a(f4.ad()*2-1,f4.ad()*2-1,f4.ad()*2-1).gD(),f4.ad()*3.141592653589793*2)
B.a.j(f3,new A.ag(new A.a(Math.cos(e9)*f5,(c3-0.5)*0.8+0.5,Math.sin(e9)*f5),f6,0.5+c6*0.9))}c2=A.b([],c2)
c3=A.b([],t.d9)
c6=$.lo
$.lo=c6+1
f7=new A.ex(c2,c3,"asteroid_belt",B.I,B.I,A.b([],n),f1,f2,null,f0,-1,B.G,B.C,!0,!0,0,c6)
f7.bL(B.C,null,!0,B.G,c6,f2,f1,f0,"asteroid_belt",!0,0,B.I,-1)
B.a.F(c2,f3)
c7.bk(f7)
f8=A.kA(0.08)
f9=d.gv().a2(f8,"particle_mesh")
g0=d.gv().M(B.d7)
g1=d.gv().M(B.d6)
g2=d.gv().M(B.d4)
g3=A.kq(B.eF,B.bb,B.bf,!1,0.55,B.eH,B.eI,5.5,g0,f9,B.r,48,0.055,!1,101,B.eR)
g4=A.kq(B.eL,B.aq,B.C,!1,0.8,B.eB,B.eO,8,g1,f9,B.r,64,0.035,!0,202,B.eS)
g5=A.kq(B.eG,B.aq,B.C,!1,0.85,B.eE,B.eP,7,g2,f9,B.r,80,0.04,!0,303,B.eK)
B.a.j(p.ax,g3)
g6=A.C(A.l(h0.document).querySelector("#particles-select"))
if(h2.b(g6))g6.addEventListener("change",A.L(new A.kb(p,g6,g3,g4,g5)))
p.br(B.aD,35,0.08,6)
g7=A.C(A.l(h0.document).querySelector("#fog-select"))
if(h2.b(g7))g7.addEventListener("change",A.L(new A.k0(g7,p)))
g8=A.C(A.l(h0.document).querySelector("#asteroid-toggle"))
if(h2.b(g8))g8.addEventListener("change",A.L(new A.k1(f7,g8)))
g9.a=null
g9.b=0
h1.addEventListener("click",A.L(new A.k2(g9,p,A.C(A.l(h0.document).querySelector("#picking-status")))))
h0=A.ch(A.b([A.lT(B.aF,e4),A.lT(B.aF,e6)],t.e9),t.a3)
p.at.a.E(0,"hero_bob",new A.ct(new A.h6("hero_bob",4,B.cT,h0),1))
p.sen(new A.k3(g9,e4,e6,e7,f7,i,p))
p.cN()
case 1:return A.kR(q,r)}})
return A.kS($async$jX,r)},
jY:function jY(a,b){this.a=a
this.b=b},
jZ:function jZ(a,b,c){this.a=a
this.b=b
this.c=c},
k_:function k_(a,b){this.a=a
this.b=b},
k4:function k4(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
k5:function k5(a){this.a=a},
kc:function kc(a,b,c){this.a=a
this.b=b
this.c=c},
k6:function k6(a){this.a=a},
k7:function k7(a,b,c){this.a=a
this.b=b
this.c=c},
k8:function k8(a,b,c){this.a=a
this.b=b
this.c=c},
k9:function k9(a,b,c){this.a=a
this.b=b
this.c=c},
ka:function ka(a,b,c){this.a=a
this.b=b
this.c=c},
kb:function kb(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
k0:function k0(a,b){this.a=a
this.b=b},
k1:function k1(a,b){this.a=a
this.b=b},
k2:function k2(a,b,c){this.a=a
this.b=b
this.c=c},
k3:function k3(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
mC(a){return v.mangledGlobalNames[a]},
pP(a){throw A.Z(A.lu(a),new Error())},
aF(){throw A.Z(A.ne(""),new Error())},
l6(){throw A.Z(A.lu(""),new Error())},
nU(a){var s=Math.cos(a)
if(s>=0)return 1/(s+0.025*Math.exp(-11*s))
else return 38+(B.c.q(a*57.29577951308232,90,105)-90)/15*62},
ki(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.c(A.al(b.ged(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].gl().c.a5()
o=q*16
n=o+16
B.a5.bJ(s,o,n,p.a)
if(l)B.a5.bJ(r,o,n,p.bB().a)}m=a.a
A.e(m,"uInstanceModels",new A.f(B.b_,s))
if(l)A.e(m,"uInstanceNormalMatrices",new A.f(B.b_,r))
A.e(m,"uUseInstances",B.b0)}},B={}
var w=[A,J,B]
var $={}
A.kt.prototype={}
J.ey.prototype={
a3(a,b){return a===b},
gP(a){return A.eY(a)},
i(a){return"Instance of '"+A.eZ(a)+"'"},
gN(a){return A.b5(A.kT(this))}}
J.eB.prototype={
i(a){return String(a)},
gP(a){return a?519018:218159},
gN(a){return A.b5(t.y)},
$iG:1,
$iw:1}
J.cY.prototype={
a3(a,b){return null==b},
i(a){return"null"},
gP(a){return 0},
$iG:1}
J.d_.prototype={$iN:1}
J.br.prototype={
gP(a){return 0},
gN(a){return B.ek},
i(a){return String(a)}}
J.eU.prototype={}
J.bO.prototype={}
J.bq.prototype={
i(a){var s=a[$.mF()]
if(s==null)s=a[$.l7()]
if(s==null)return this.cT(a)
return"JavaScript function for "+J.c4(s)},
$ibH:1}
J.cZ.prototype={
gP(a){return 0},
i(a){return String(a)}}
J.d0.prototype={
gP(a){return 0},
i(a){return String(a)}}
J.r.prototype={
j(a,b){A.H(a).c.a(b)
a.$flags&1&&A.bD(a,29)
a.push(b)},
a4(a,b){var s
a.$flags&1&&A.bD(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aG(a[s],b)){a.splice(s,1)
return!0}return!1},
F(a,b){var s
A.H(a).h("n<1>").a(b)
a.$flags&1&&A.bD(a,"addAll",2)
if(Array.isArray(b)){this.cY(a,b)
return}for(s=J.a6(b);s.k();)a.push(s.gn())},
cY(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.c(A.aI(a))
for(r=0;r<s;++r)a.push(b[r])},
a0(a){a.$flags&1&&A.bD(a,"clear","clear")
a.length=0},
a_(a,b){if(!(b>=0&&b<a.length))return A.h(a,b)
return a[b]},
cO(a,b){var s
if(b<0||b>a.length)throw A.c(A.aU(b,0,a.length,"start",null))
s=a.length
if(b===s)return A.b([],A.H(a))
return A.b(a.slice(b,s),A.H(a))},
gbt(a){if(a.length>0)return a[0]
throw A.c(A.ez())},
gbA(a){var s=a.length
if(s>0)return a[s-1]
throw A.c(A.ez())},
gaD(a){var s=a.length
if(s===1){if(0>=s)return A.h(a,0)
return a[0]}if(s===0)throw A.c(A.ez())
throw A.c(A.lp())},
aZ(a,b){var s,r
A.H(a).h("w(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.c(A.aI(a))}return!0},
ai(a,b){var s,r,q,p,o,n=A.H(a)
n.h("i(1,1)?").a(b)
a.$flags&2&&A.bD(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.oS()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.eP()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.cD(b,2))
if(p>0)this.dv(a,p)},
cM(a){return this.ai(a,null)},
dv(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
eb(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.h(a,s)
if(J.aG(a[s],b))return s}return-1},
p(a,b){var s
for(s=0;s<a.length;++s)if(J.aG(a[s],b))return!0
return!1},
i(a){return A.kr(a,"[","]")},
gC(a){return new J.cI(a,a.length,A.H(a).h("cI<1>"))},
gP(a){return A.eY(a)},
gu(a){return a.length},
t(a,b){if(!(b>=0&&b<a.length))throw A.c(A.jP(a,b))
return a[b]},
E(a,b,c){A.H(a).c.a(c)
a.$flags&2&&A.bD(a)
if(!(b>=0&&b<a.length))throw A.c(A.jP(a,b))
a[b]=c},
bv(a,b){var s
A.H(a).h("w(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gN(a){return A.b5(A.H(a))},
$in:1,
$iz:1}
J.eA.prototype={
eM(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.eZ(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.hE.prototype={}
J.cI.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.A(q)
throw A.c(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iW:1}
J.cg.prototype={
O(a,b){var s
A.aO(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaK(b)
if(this.gaK(a)===s)return 0
if(this.gaK(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaK(a){return a===0?1/a<0:a<0},
bG(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.c(A.bP(""+a+".toInt()"))},
b_(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.c(A.bP(""+a+".floor()"))},
J(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.c(A.bP(""+a+".round()"))},
q(a,b,c){if(this.O(b,c)>0)throw A.c(A.mu(b))
if(this.O(a,b)<0)return b
if(this.O(a,c)>0)return c
return a},
a9(a,b){var s
if(b>20)throw A.c(A.aU(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaK(a))return"-"+s
return s},
eL(a,b){var s
if(b>20)throw A.c(A.aU(b,0,20,"fractionDigits",null))
s=a.toExponential(b)
if(a===0&&this.gaK(a))return"-"+s
return s},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gP(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
K(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
if(b<0)return s-b
else return s+b},
bK(a,b){if((a|0)===a)if(b>=1)return a/b|0
return this.cc(a,b)},
V(a,b){return(a|0)===a?a/b|0:this.cc(a,b)},
cc(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.c(A.bP("Result of truncating division is "+A.p(s)+": "+A.p(a)+" ~/ "+b))},
dB(a,b){var s
if(a>0)s=this.dA(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
dA(a,b){return b>31?0:a>>>b},
gN(a){return A.b5(t.q)},
$iam:1,
$iq:1,
$iaj:1}
J.cX.prototype={
gN(a){return A.b5(t.S)},
$iG:1,
$ii:1}
J.eC.prototype={
gN(a){return A.b5(t.i)},
$iG:1}
J.bp.prototype={
aj(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
cS(a,b,c){return a.substring(b,A.nL(b,c,a.length))},
cR(a,b){return this.cS(a,b,null)},
cD(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.h(p,0)
if(p.charCodeAt(0)===133){s=J.nc(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.h(p,r)
q=p.charCodeAt(r)===133?J.nd(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
m(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.c(B.bm)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
cw(a,b,c){var s=b-a.length
if(s<=0)return a
return this.m(c,s)+a},
O(a,b){var s
A.U(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
i(a){return a},
gP(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gN(a){return A.b5(t.N)},
gu(a){return a.length},
$iG:1,
$iam:1,
$ilE:1,
$iu:1}
A.cu.prototype={
gC(a){return new A.cL(J.a6(this.gaT()),A.v(this).h("cL<1,2>"))},
gu(a){return J.bE(this.gaT())},
a_(a,b){return A.v(this).y[1].a(J.ko(this.gaT(),b))},
i(a){return J.c4(this.gaT())}}
A.cL.prototype={
k(){return this.a.k()},
gn(){return this.$ti.y[1].a(this.a.gn())},
$iW:1}
A.dA.prototype={
t(a,b){return this.$ti.y[1].a(J.kn(this.a,b))},
$iz:1}
A.cM.prototype={
gaT(){return this.a}}
A.d1.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.iE.prototype={}
A.aJ.prototype={}
A.Q.prototype={
gC(a){var s=this
return new A.ao(s,s.gu(s),A.v(s).h("ao<Q.E>"))},
aA(a){var s,r=this,q=A.kv(A.v(r).h("Q.E"))
for(s=0;s<r.gu(r);++s)q.j(0,r.a_(0,s))
return q}}
A.dt.prototype={
gdk(){var s=J.bE(this.a),r=this.c
if(r==null||r>s)return s
return r},
gdC(){var s=J.bE(this.a),r=this.b
if(r>s)return s
return r},
gu(a){var s,r=J.bE(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
a_(a,b){var s=this,r=s.gdC()+b
if(b<0||r>=s.gdk())throw A.c(A.hD(b,s.gu(0),s,"index"))
return J.ko(s.a,r)},
cC(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.jR(n),l=m.gu(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.lr(0,n):J.lq(0,n)}r=A.eE(s,m.a_(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.a.E(r,q,m.a_(n,o+q))
if(m.gu(n)<l)throw A.c(A.aI(p))}return r},
eK(a){return this.cC(0,!0)}}
A.ao.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.jR(q),o=p.gu(q)
if(r.b!==o)throw A.c(A.aI(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.a_(q,s);++r.c
return!0},
$iW:1}
A.d6.prototype={
gC(a){var s=this.a
return new A.d7(s.gC(s),this.b,A.v(this).h("d7<1,2>"))},
gu(a){var s=this.a
return s.gu(s)},
a_(a,b){var s=this.a
return this.b.$1(s.a_(s,b))}}
A.d7.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gn())
return!0}s.a=null
return!1},
gn(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iW:1}
A.O.prototype={
gu(a){return J.bE(this.a)},
a_(a,b){return this.b.$1(J.ko(this.a,b))}}
A.a5.prototype={
gC(a){return new A.K(J.a6(this.a),this.b,this.$ti.h("K<1>"))}}
A.K.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gn()))return!0
return!1},
gn(){return this.a.gn()},
$iW:1}
A.an.prototype={}
A.dn.prototype={
gu(a){return J.bE(this.a)},
a_(a,b){var s=this.a,r=J.jR(s)
return r.a_(s,r.gu(s)-1-b)}}
A.dY.prototype={}
A.E.prototype={$r:"+(1,2)",$s:1}
A.dJ.prototype={$r:"+influence,light(1,2)",$s:2}
A.dK.prototype={$r:"+influence,source(1,2)",$s:3}
A.cy.prototype={$r:"+rotation,translation(1,2)",$s:4}
A.bV.prototype={$r:"+(1,2,3)",$s:5}
A.cQ.prototype={}
A.cP.prototype={
i(a){return A.hI(this)},
gaI(){return new A.bz(this.e5(),A.v(this).h("bz<ae<1,2>>"))},
e5(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gaI(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gah(),o=o.gC(o),n=A.v(s),m=n.y[1],n=n.h("ae<1,2>")
case 2:if(!o.k()){r=3
break}l=o.gn()
k=s.t(0,l)
r=4
return a.b=new A.ae(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iay:1}
A.V.prototype={
gu(a){return this.b.length},
gc2(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
aH(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
t(a,b){if(!this.aH(b))return null
return this.b[this.a[b]]},
aJ(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gc2()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gah(){return new A.bR(this.gc2(),this.$ti.h("bR<1>"))},
gcE(){return new A.bR(this.b,this.$ti.h("bR<2>"))}}
A.bR.prototype={
gu(a){return this.a.length},
gC(a){var s=this.a
return new A.bS(s,s.length,this.$ti.h("bS<1>"))}}
A.bS.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iW:1}
A.cR.prototype={
j(a,b){A.v(this).c.a(b)
A.mZ()}}
A.aZ.prototype={
gu(a){return this.b},
gct(a){return this.b!==0},
gC(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.bS(s,s.length,r.$ti.h("bS<1>"))},
p(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
aA(a){return A.kw(this,this.$ti.c)}}
A.dp.prototype={}
A.iL.prototype={
ac(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.de.prototype={
i(a){return"Null check operator used on a null value"}}
A.eD.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.fh.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hU.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.cU.prototype={}
A.dN.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibw:1}
A.bn.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.mD(r==null?"unknown":r)+"'"},
gN(a){var s=A.l0(this)
return A.b5(s==null?A.c1(this):s)},
$ibH:1,
geO(){return this},
$C:"$1",
$R:1,
$D:null}
A.ee.prototype={$C:"$0",$R:0}
A.ef.prototype={$C:"$2",$R:2}
A.fe.prototype={}
A.fb.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.mD(s)+"'"}}
A.c8.prototype={
a3(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.c8))return!1
return this.$_target===b.$_target&&this.a===b.a},
gP(a){return(A.h2(this.a)^A.eY(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.eZ(this.a)+"'")}}
A.f3.prototype={
i(a){return"RuntimeError: "+this.a}}
A.b8.prototype={
gu(a){return this.a},
gah(){return new A.ba(this,A.v(this).h("ba<1>"))},
aH(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.ee(a)},
ee(a){var s=this.d
if(s==null)return!1
return this.b0(this.c0(s,a),a)>=0},
t(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.ef(b)},
ef(a){var s,r,q=this.d
if(q==null)return null
s=this.c0(q,a)
r=this.b0(s,a)
if(r<0)return null
return s[r].b},
E(a,b,c){var s,r,q=this,p=A.v(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bQ(s==null?q.b=q.bg():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bQ(r==null?q.c=q.bg():r,b,c)}else q.eh(b,c)},
eh(a,b){var s,r,q,p,o=this,n=A.v(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bg()
r=o.bw(a)
q=s[r]
if(q==null)s[r]=[o.bh(a,b)]
else{p=o.b0(q,a)
if(p>=0)q[p].b=b
else q.push(o.bh(a,b))}},
bC(a,b){var s,r,q=this,p=A.v(q)
p.c.a(a)
p.h("2()").a(b)
if(q.aH(a)){s=q.t(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.E(0,a,r)
return r},
a4(a,b){var s=this
if(typeof b=="string")return s.bN(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.bN(s.c,b)
else return s.eg(b)},
eg(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.bw(a)
r=n[s]
q=o.b0(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.bO(p)
if(r.length===0)delete n[s]
return p.b},
a0(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bf()}},
aJ(a,b){var s,r,q=this
A.v(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.c(A.aI(q))
s=s.c}},
bQ(a,b,c){var s,r=A.v(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bh(b,c)
else s.b=c},
bN(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.bO(s)
delete a[b]
return s.b},
bf(){this.r=this.r+1&1073741823},
bh(a,b){var s=this,r=A.v(s),q=new A.hG(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bf()
return q},
bO(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bf()},
bw(a){return J.S(a)&1073741823},
c0(a,b){return a[this.bw(b)]},
b0(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aG(a[r].a,b))return r
return-1},
i(a){return A.hI(this)},
bg(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ilv:1}
A.hG.prototype={}
A.ba.prototype={
gu(a){return this.a.a},
gC(a){var s=this.a
return new A.d3(s,s.r,s.e,this.$ti.h("d3<1>"))}}
A.d3.prototype={
gn(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.aI(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iW:1}
A.aS.prototype={
gu(a){return this.a.a},
gC(a){var s=this.a
return new A.bb(s,s.r,s.e,this.$ti.h("bb<1>"))}}
A.bb.prototype={
gn(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.aI(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iW:1}
A.b9.prototype={
gu(a){return this.a.a},
gC(a){var s=this.a
return new A.d2(s,s.r,s.e,this.$ti.h("d2<1,2>"))}}
A.d2.prototype={
gn(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.aI(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.ae(s.a,s.b,r.$ti.h("ae<1,2>"))
r.c=s.c
return!0}},
$iW:1}
A.jT.prototype={
$1(a){return this.a(a)},
$S:23}
A.jU.prototype={
$2(a,b){return this.a(a,b)},
$S:65}
A.jV.prototype={
$1(a){return this.a(A.U(a))},
$S:50}
A.aM.prototype={
gN(a){return A.b5(this.c1())},
c1(){return A.ps(this.$r,this.be())},
i(a){return this.cg(!1)},
cg(a){var s,r,q,p,o,n=this.dl(),m=this.be(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.h(m,q)
o=m[q]
l=a?l+A.lH(o):l+A.p(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
dl(){var s,r=this.$s
while($.je.length<=r)B.a.j($.je,null)
s=$.je[r]
if(s==null){s=this.da()
B.a.E($.je,r,s)}return s},
da(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.ks(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.E(j,q,r[s])}}return A.ch(j,k)}}
A.bk.prototype={
be(){return[this.a,this.b]},
a3(a,b){if(b==null)return!1
return b instanceof A.bk&&this.$s===b.$s&&J.aG(this.a,b.a)&&J.aG(this.b,b.b)},
gP(a){return A.bL(this.$s,this.a,this.b,B.k,B.k,B.k)}}
A.cx.prototype={
be(){return[this.a,this.b,this.c]},
a3(a,b){var s=this
if(b==null)return!1
return b instanceof A.cx&&s.$s===b.$s&&J.aG(s.a,b.a)&&J.aG(s.b,b.b)&&J.aG(s.c,b.c)},
gP(a){var s=this
return A.bL(s.$s,s.a,s.b,s.c,B.k,B.k)}}
A.cj.prototype={
gN(a){return B.ed},
$iG:1}
A.dc.prototype={
ds(a,b,c,d){var s=A.aU(b,0,c,d,null)
throw A.c(s)},
bS(a,b,c,d){if(b>>>0!==b||b>c)this.ds(a,b,c,d)}}
A.eJ.prototype={
gN(a){return B.ee},
$iG:1}
A.a9.prototype={
gu(a){return a.length},
$iaw:1}
A.da.prototype={
t(a,b){A.bX(b,a,a.length)
return a[b]},
bJ(a,b,c,d){var s,r,q,p
t.bM.a(d)
a.$flags&2&&A.bD(a,5)
s=a.length
this.bS(a,b,s,"start")
this.bS(a,c,s,"end")
if(b>c)A.m(A.aU(b,0,c,null,null))
r=c-b
q=d.length
if(q<r)A.m(A.k("Not enough elements"))
p=q!==r?d.subarray(0,r):d
a.set(p,b)
return},
$in:1,
$iz:1}
A.db.prototype={$in:1,$iz:1}
A.d9.prototype={
gN(a){return B.ef},
$iG:1,
$ihp:1}
A.eK.prototype={
gN(a){return B.eg},
$iG:1,
$ihq:1}
A.eL.prototype={
gN(a){return B.eh},
t(a,b){A.bX(b,a,a.length)
return a[b]},
$iG:1}
A.eM.prototype={
gN(a){return B.ei},
t(a,b){A.bX(b,a,a.length)
return a[b]},
$iG:1}
A.eN.prototype={
gN(a){return B.ej},
t(a,b){A.bX(b,a,a.length)
return a[b]},
$iG:1}
A.eO.prototype={
gN(a){return B.em},
t(a,b){A.bX(b,a,a.length)
return a[b]},
$iG:1}
A.eP.prototype={
gN(a){return B.en},
t(a,b){A.bX(b,a,a.length)
return a[b]},
$iG:1}
A.dd.prototype={
gN(a){return B.eo},
gu(a){return a.length},
t(a,b){A.bX(b,a,a.length)
return a[b]},
$iG:1}
A.eQ.prototype={
gN(a){return B.ep},
gu(a){return a.length},
t(a,b){A.bX(b,a,a.length)
return a[b]},
$iG:1,
$idu:1}
A.dF.prototype={}
A.dG.prototype={}
A.dH.prototype={}
A.dI.prototype={}
A.aV.prototype={
h(a){return A.dS(v.typeUniverse,this,a)},
S(a){return A.mc(v.typeUniverse,this,a)}}
A.fB.prototype={}
A.jj.prototype={
i(a){return A.aD(this.a,null)}}
A.fz.prototype={
i(a){return this.a}}
A.dO.prototype={$ibg:1}
A.iW.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:11}
A.iV.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:68}
A.iX.prototype={
$0(){this.a.$0()},
$S:12}
A.iY.prototype={
$0(){this.a.$0()},
$S:12}
A.jh.prototype={
cW(a,b){if(self.setTimeout!=null)self.setTimeout(A.cD(new A.ji(this,b),0),a)
else throw A.c(A.bP("`setTimeout()` not found."))}}
A.ji.prototype={
$0(){this.b.$0()},
$S:1}
A.fp.prototype={
bl(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.b5(a)
else{s=r.a
if(q.h("bI<1>").b(a))s.bR(a)
else s.bW(a)}},
bm(a,b){var s=this.a
if(this.b)s.b9(new A.aH(a,b))
else s.b6(new A.aH(a,b))}}
A.jn.prototype={
$1(a){return this.a.$2(0,a)},
$S:6}
A.jo.prototype={
$2(a,b){this.a.$2(1,new A.cU(a,t.l.a(b)))},
$S:18}
A.jJ.prototype={
$2(a,b){this.a(A.d(a),b)},
$S:30}
A.bl.prototype={
gn(){var s=this.b
return s==null?this.$ti.c.a(s):s},
dw(a,b){var s,r,q
a=A.d(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
k(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.k()){o.b=s.gn()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.dw(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.m6
return!1}if(0>=p.length)return A.h(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.m6
throw n
return!1}if(0>=p.length)return A.h(p,-1)
o.a=p.pop()
m=1
continue}throw A.c(A.k("sync*"))}return!1},
eQ(a){var s,r,q=this
if(a instanceof A.bz){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.j(r,q.a)
q.a=s
return 2}else{q.d=J.a6(a)
return 2}},
$iW:1}
A.bz.prototype={
gC(a){return new A.bl(this.a(),this.$ti.h("bl<1>"))}}
A.aH.prototype={
i(a){return A.p(this.a)},
$iM:1,
gaE(){return this.b}}
A.fu.prototype={
bm(a,b){var s=this.a
if((s.a&30)!==0)throw A.c(A.k("Future already completed"))
s.b6(A.oR(a,b))},
cn(a){return this.bm(a,null)}}
A.dz.prototype={
bl(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.c(A.k("Future already completed"))
s.b5(r.h("1/").a(a))}}
A.bQ.prototype={
em(a){if((this.c&15)!==6)return!0
return this.b.b.bF(t.al.a(this.d),a.a,t.y,t.K)},
ea(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.f.b(q))p=l.eH(q,m,a.b,o,n,t.l)
else p=l.bF(t.x.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.c3(s))){if((r.c&1)!==0)throw A.c(A.j("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.c(A.j("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.Y.prototype={
cB(a,b,c){var s,r,q=this.$ti
q.S(c).h("1/(2)").a(a)
s=$.R
if(s===B.x){if(!t.f.b(b)&&!t.x.b(b))throw A.c(A.al(b,"onError",u.c))}else{c.h("@<0/>").S(q.c).h("1(2)").a(a)
b=A.p6(b,s)}r=new A.Y(s,c.h("Y<0>"))
this.b4(new A.bQ(r,3,a,b,q.h("@<1>").S(c).h("bQ<1,2>")))
return r},
cd(a,b,c){var s,r=this.$ti
r.S(c).h("1/(2)").a(a)
s=new A.Y($.R,c.h("Y<0>"))
this.b4(new A.bQ(s,19,a,b,r.h("@<1>").S(c).h("bQ<1,2>")))
return s},
dz(a){this.a=this.a&1|16
this.c=a},
aP(a){this.a=a.a&30|this.a&1
this.c=a.c},
b4(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.e.a(r.c)
if((s.a&24)===0){s.b4(a)
return}r.aP(s)}A.h1(null,null,r.b,t.M.a(new A.j2(r,a)))}},
c4(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.e.a(m.c)
if((n.a&24)===0){n.c4(a)
return}m.aP(n)}l.a=m.aS(a)
A.h1(null,null,m.b,t.M.a(new A.j6(l,m)))}},
aR(){var s=t.F.a(this.c)
this.c=null
return this.aS(s)},
aS(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bW(a){var s,r=this
r.$ti.c.a(a)
s=r.aR()
r.a=8
r.c=a
A.cv(r,s)},
d9(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aR()
q.aP(a)
A.cv(q,r)},
b9(a){var s=this.aR()
this.dz(a)
A.cv(this,s)},
b5(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bI<1>").b(a)){this.bR(a)
return}this.cZ(a)},
cZ(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.h1(null,null,s.b,t.M.a(new A.j4(s,a)))},
bR(a){A.kG(this.$ti.h("bI<1>").a(a),this,!1)
return},
b6(a){this.a^=2
A.h1(null,null,this.b,t.M.a(new A.j3(this,a)))},
$ibI:1}
A.j2.prototype={
$0(){A.cv(this.a,this.b)},
$S:1}
A.j6.prototype={
$0(){A.cv(this.b,this.a.a)},
$S:1}
A.j5.prototype={
$0(){A.kG(this.a.a,this.b,!0)},
$S:1}
A.j4.prototype={
$0(){this.a.bW(this.b)},
$S:1}
A.j3.prototype={
$0(){this.a.b9(this.b)},
$S:1}
A.j9.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.eG(t.fO.a(q.d),t.A)}catch(p){s=A.c3(p)
r=A.cG(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.kp(q)
n=k.a
n.c=new A.aH(q,o)
q=n}q.b=!0
return}if(j instanceof A.Y&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.Y){m=k.b.a
l=new A.Y(m.b,m.$ti)
j.cB(new A.ja(l,m),new A.jb(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:1}
A.ja.prototype={
$1(a){this.a.d9(this.b)},
$S:11}
A.jb.prototype={
$2(a,b){A.dZ(a)
t.l.a(b)
this.a.b9(new A.aH(a,b))},
$S:31}
A.j8.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bF(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.c3(l)
r=A.cG(l)
q=s
p=r
if(p==null)p=A.kp(q)
o=this.a
o.c=new A.aH(q,p)
o.b=!0}},
$S:1}
A.j7.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.em(s)&&p.a.e!=null){p.c=p.a.ea(s)
p.b=!1}}catch(o){r=A.c3(o)
q=A.cG(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.kp(p)
m=l.b
m.c=new A.aH(p,n)
p=m}p.b=!0}},
$S:1}
A.fq.prototype={}
A.fQ.prototype={}
A.dX.prototype={$im1:1}
A.fK.prototype={
eI(a){var s,r,q
t.M.a(a)
try{if(B.x===$.R){a.$0()
return}A.mp(null,null,this,a,t.H)}catch(q){s=A.c3(q)
r=A.cG(q)
A.kX(A.dZ(s),t.l.a(r))}},
dP(a){return new A.jf(this,t.M.a(a))},
eG(a,b){b.h("0()").a(a)
if($.R===B.x)return a.$0()
return A.mp(null,null,this,a,b)},
bF(a,b,c,d){c.h("@<0>").S(d).h("1(2)").a(a)
d.a(b)
if($.R===B.x)return a.$1(b)
return A.p8(null,null,this,a,b,c,d)},
eH(a,b,c,d,e,f){d.h("@<0>").S(e).S(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.R===B.x)return a.$2(b,c)
return A.p7(null,null,this,a,b,c,d,e,f)},
cz(a,b,c,d){return b.h("@<0>").S(c).S(d).h("1(2,3)").a(a)}}
A.jf.prototype={
$0(){return this.a.eI(this.b)},
$S:1}
A.jI.prototype={
$0(){A.n3(this.a,this.b)},
$S:1}
A.dB.prototype={
gu(a){return this.a},
gah(){return new A.dC(this,this.$ti.h("dC<1>"))},
aH(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.dd(a)},
dd(a){var s=this.d
if(s==null)return!1
return this.ag(this.bV(s,a),a)>=0},
t(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.kH(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.kH(q,b)
return r}else return this.dq(b)},
dq(a){var s,r,q=this.d
if(q==null)return null
s=this.bV(q,a)
r=this.ag(s,a)
return r<0?null:s[r+1]},
E(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.bU(s==null?m.b=A.kI():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.bU(r==null?m.c=A.kI():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.kI()
p=A.h2(b)&1073741823
o=q[p]
if(o==null){A.kJ(q,p,[b,c]);++m.a
m.e=null}else{n=m.ag(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
a4(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.aG(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.aG(s.c,b)
else return s.bi(b)},
bi(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.h2(a)&1073741823
r=n[s]
q=o.ag(r,a)
if(q<0)return null;--o.a
o.e=null
p=r.splice(q,2)[1]
if(0===r.length)delete n[s]
return p},
aJ(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.bX()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.t(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.c(A.aI(m))}},
bX(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.eE(i.a,null,!1,t.A)
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
bU(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.kJ(a,b,c)},
aG(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.kH(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
bV(a,b){return a[A.h2(b)&1073741823]}}
A.dE.prototype={
ag(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.dC.prototype={
gu(a){return this.a.a},
gC(a){var s=this.a
return new A.dD(s,s.bX(),this.$ti.h("dD<1>"))}}
A.dD.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.c(A.aI(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iW:1}
A.aX.prototype={
dt(){return new A.aX(A.v(this).h("aX<1>"))},
gC(a){var s=this,r=new A.bT(s,s.r,A.v(s).h("bT<1>"))
r.c=s.e
return r},
gu(a){return this.a},
p(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.dc(b)},
dc(a){var s=this.d
if(s==null)return!1
return this.ag(s[this.ba(a)],a)>=0},
j(a,b){var s,r,q=this
A.v(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bT(s==null?q.b=A.kL():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bT(r==null?q.c=A.kL():r,b)}else return q.cX(b)},
cX(a){var s,r,q,p=this
A.v(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.kL()
r=p.ba(a)
q=s[r]
if(q==null)s[r]=[p.b8(a)]
else{if(p.ag(q,a)>=0)return!1
q.push(p.b8(a))}return!0},
a4(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.aG(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.aG(s.c,b)
else return s.bi(b)},
bi(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.ba(a)
r=n[s]
q=o.ag(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.ci(p)
return!0},
a0(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.b7()}},
bT(a,b){A.v(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b8(b)
return!0},
aG(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.ci(s)
delete a[b]
return!0},
b7(){this.r=this.r+1&1073741823},
b8(a){var s,r=this,q=new A.fD(A.v(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.b7()
return q},
ci(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.b7()},
ba(a){return J.S(a)&1073741823},
ag(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aG(a[r].a,b))return r
return-1},
$ilx:1}
A.fD.prototype={}
A.bT.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.c(A.aI(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iW:1}
A.hH.prototype={
$2(a,b){this.a.E(0,this.b.a(a),this.c.a(b))},
$S:36}
A.I.prototype={
gC(a){return new A.ao(a,this.gu(a),A.c1(a).h("ao<I.E>"))},
a_(a,b){return this.t(a,b)},
aZ(a,b){var s,r
A.c1(a).h("w(I.E)").a(b)
s=this.gu(a)
for(r=0;r<s;++r){if(!b.$1(this.t(a,r)))return!1
if(s!==this.gu(a))throw A.c(A.aI(a))}return!0},
i(a){return A.kr(a,"[","]")}}
A.bK.prototype={
aJ(a,b){var s,r,q,p=A.v(this)
p.h("~(1,2)").a(b)
for(s=this.gah(),s=s.gC(s),p=p.y[1];s.k();){r=s.gn()
q=this.t(0,r)
b.$2(r,q==null?p.a(q):q)}},
er(a,b){var s,r,q,p,o,n=this,m=A.v(n)
m.h("w(1,2)").a(b)
s=A.b([],m.h("r<1>"))
for(r=n.gah(),r=r.gC(r),m=m.y[1];r.k();){q=r.gn()
p=n.t(0,q)
if(b.$2(q,p==null?m.a(p):p))B.a.j(s,q)}for(m=s.length,o=0;o<s.length;s.length===m||(0,A.A)(s),++o)n.a4(0,s[o])},
gu(a){var s=this.gah()
return s.gu(s)},
i(a){return A.hI(this)},
$iay:1}
A.hJ.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.p(a)
r.a=(r.a+=s)+": "
s=A.p(b)
r.a+=s},
$S:17}
A.dT.prototype={}
A.ci.prototype={
t(a,b){return this.a.t(0,b)},
gu(a){return this.a.a},
gah(){var s=this.a
return new A.ba(s,A.v(s).h("ba<1>"))},
i(a){return A.hI(this.a)},
gcE(){var s=this.a
return new A.aS(s,A.v(s).h("aS<2>"))},
gaI(){var s=this.a
return new A.b9(s,A.v(s).h("b9<1,2>"))},
$iay:1}
A.dv.prototype={}
A.bf.prototype={
gct(a){return this.gu(this)!==0},
F(a,b){var s
for(s=J.a6(A.v(this).h("n<1>").a(b));s.k();)this.j(0,s.gn())},
cq(a){var s,r,q=this.aA(0)
for(s=this.gC(this);s.k();){r=s.gn()
if(a.p(0,r))q.a4(0,r)}return q},
i(a){return A.kr(this,"{","}")},
ek(a,b){var s,r,q=this.gC(this)
if(!q.k())return""
s=J.c4(q.gn())
if(!q.k())return s
if(b.length===0){r=s
do r+=A.p(q.gn())
while(q.k())}else{r=s
do r=r+b+A.p(q.gn())
while(q.k())}return r.charCodeAt(0)==0?r:r},
dK(a,b){var s
A.v(this).h("w(1)").a(b)
for(s=this.gC(this);s.k();)if(b.$1(s.gn()))return!0
return!1},
a_(a,b){var s,r
A.im(b,"index")
s=this.gC(this)
for(r=b;s.k();){if(r===0)return s.gn();--r}throw A.c(A.hD(b,b-r,this,"index"))},
$in:1,
$ibv:1}
A.dL.prototype={
aA(a){var s=this.dt()
s.F(0,this)
return s}}
A.fT.prototype={
j(a,b){this.$ti.c.a(b)
return A.oz()}}
A.dw.prototype={
gu(a){return this.a.a},
gC(a){var s=this.a
return A.kK(s,s.r,A.v(s).c)},
aA(a){return this.a.aA(0)}}
A.cz.prototype={}
A.dU.prototype={}
A.bF.prototype={
a3(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bF)if(this.a===b.a)s=this.b===b.b
return s},
gP(a){return A.bL(this.a,this.b,B.k,B.k,B.k,B.k)},
O(a,b){var s
t.df.a(b)
s=B.d.O(this.a,b.a)
if(s!==0)return s
return B.d.O(this.b,b.b)},
i(a){var s=this,r=A.n_(A.nx(s)),q=A.eh(A.nv(s)),p=A.eh(A.nr(s)),o=A.eh(A.ns(s)),n=A.eh(A.nu(s)),m=A.eh(A.nw(s)),l=A.ln(A.nt(s)),k=s.b,j=k===0?"":A.ln(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iam:1}
A.iZ.prototype={
i(a){return this.B()}}
A.M.prototype={
gaE(){return A.nq(this)}}
A.e4.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.hk(s)
return"Assertion failed"}}
A.bg.prototype={}
A.aY.prototype={
gbd(){return"Invalid argument"+(!this.a?"(s)":"")},
gbc(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.p(p),n=s.gbd()+q+o
if(!s.a)return n
return n+s.gbc()+": "+A.hk(s.gbx())},
gbx(){return this.b}}
A.di.prototype={
gbx(){return A.mf(this.b)},
gbd(){return"RangeError"},
gbc(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.p(q):""
else if(q==null)s=": Not greater than or equal to "+A.p(r)
else if(q>r)s=": Not in inclusive range "+A.p(r)+".."+A.p(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.p(r)
return s}}
A.ew.prototype={
gbx(){return A.d(this.b)},
gbd(){return"RangeError"},
gbc(){if(A.d(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gu(a){return this.f}}
A.dx.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.fg.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.cr.prototype={
i(a){return"Bad state: "+this.a}}
A.eg.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.hk(s)+"."}}
A.eS.prototype={
i(a){return"Out of Memory"},
gaE(){return null},
$iM:1}
A.ds.prototype={
i(a){return"Stack Overflow"},
gaE(){return null},
$iM:1}
A.j_.prototype={
i(a){return"Exception: "+this.a}}
A.hr.prototype={
i(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.n.prototype={
bu(a,b,c,d){var s,r
d.a(b)
A.v(this).S(d).h("1(1,n.E)").a(c)
for(s=this.gC(this),r=b;s.k();)r=c.$2(r,s.gn())
return r},
gu(a){var s,r=this.gC(this)
for(s=0;r.k();)++s
return s},
gaD(a){var s,r=this.gC(this)
if(!r.k())throw A.c(A.ez())
s=r.gn()
if(r.k())throw A.c(A.lp())
return s},
e9(a,b){var s,r
A.v(this).h("w(n.E)").a(b)
for(s=this.gC(this);s.k();){r=s.gn()
if(b.$1(r))return r}throw A.c(A.ez())},
a_(a,b){var s,r
A.im(b,"index")
s=this.gC(this)
for(r=b;s.k();){if(r===0)return s.gn();--r}throw A.c(A.hD(b,b-r,this,"index"))},
i(a){return A.na(this,"(",")")}}
A.ae.prototype={
i(a){return"MapEntry("+A.p(this.a)+": "+A.p(this.b)+")"}}
A.a1.prototype={
gP(a){return A.y.prototype.gP.call(this,0)},
i(a){return"null"}}
A.y.prototype={$iy:1,
a3(a,b){return this===b},
gP(a){return A.eY(this)},
i(a){return"Instance of '"+A.eZ(this)+"'"},
gN(a){return A.l2(this)},
toString(){return this.i(this)}}
A.fR.prototype={
i(a){return""},
$ibw:1}
A.fc.prototype={
gu(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.hT.prototype={
i(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.ke.prototype={
$1(a){return this.a.bl(this.b.h("0/?").a(a))},
$S:6}
A.kf.prototype={
$1(a){if(a==null)return this.a.cn(new A.hT(a===undefined))
return this.a.cn(a)},
$S:6}
A.jN.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.mo(a))return a
s=this.a
a.toString
if(s.aH(a))return s.t(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.m(A.aU(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.bZ(!0,"isUtc",t.y)
return new A.bF(r,0,!0)}if(a instanceof RegExp)throw A.c(A.j("structured clone of RegExp",null))
if(a instanceof Promise)return A.pI(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.ax(p,p)
s.E(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.cF(n),p=s.gC(n);p.k();)m.push(A.cE(p.gn()))
for(l=0;l<s.gu(n);++l){k=s.t(n,l)
if(!(l<m.length))return A.h(m,l)
j=m[l]
if(k!=null)o.E(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.E(0,a,o)
h=A.d(a.length)
for(s=J.cF(i),l=0;l<h;++l)o.push(this.$1(s.t(i,l)))
return o}return a},
$S:51}
A.fJ.prototype={
bM(a){var s,r,q,p,o,n,m,l=this,k=4294967296
do{s=a>>>0
a=B.d.V(a-s,k)
r=a>>>0
a=B.d.V(a-r,k)
q=(~s>>>0)+(s<<21>>>0)
p=q>>>0
r=(~r>>>0)+((r<<21|s>>>11)>>>0)+B.d.V(q-p,k)>>>0
q=((p^(p>>>24|r<<8))>>>0)*265
s=q>>>0
r=((r^r>>>24)>>>0)*265+B.d.V(q-s,k)>>>0
q=((s^(s>>>14|r<<18))>>>0)*21
s=q>>>0
r=((r^r>>>14)>>>0)*21+B.d.V(q-s,k)>>>0
s=(s^(s>>>28|r<<4))>>>0
r=(r^r>>>28)>>>0
q=(s<<31>>>0)+s
p=q>>>0
o=B.d.V(q-p,k)
q=l.a*1037
n=l.a=q>>>0
m=l.b*1037+B.d.V(q-n,k)>>>0
l.b=m
n=(n^p)>>>0
l.a=n
o=(m^r+((r<<31|s>>>1)>>>0)+o>>>0)>>>0
l.b=o}while(a!==0)
if(o===0&&n===0)l.a=23063
l.ap()
l.ap()
l.ap()
l.ap()},
ap(){var s=this,r=s.a,q=4294901760*r,p=q>>>0,o=55905*r,n=o>>>0,m=n+p+s.b
r=m>>>0
s.a=r
s.b=B.d.V(o-n+(q-p)+(m-r),4294967296)>>>0},
ad(){var s,r=this
r.ap()
s=r.a
r.ap()
return((s&67108863)*134217728+(r.a&134217727))/9007199254740992}}
A.iq.prototype={}
A.cm.prototype={
B(){return"QualityProfileKind."+this.b}}
A.aA.prototype={}
A.hd.prototype={}
A.he.prototype={}
A.cs.prototype={
B(){return"ToneMappingMode."+this.b}}
A.eV.prototype={
aW(a,b,c,d){var s=this,r=a==null?s.b:a,q=c==null?s.c:c,p=b==null?s.d:b,o=d==null?s.fr:d
return A.eW(s.at,r,s.as,p,s.Q,s.a,s.f,s.ay,s.r,s.z,!1,q,s.y,s.x,s.w,o,s.ax,s.ch,s.db,s.dx,s.cy,s.cx,s.CW,s.e)},
dV(a){return this.aW(null,null,a,null)},
dS(a){return this.aW(a,null,null,null)},
dT(a){return this.aW(null,a,null,null)},
dW(a){return this.aW(null,null,null,a)},
A(){var s,r,q,p,o,n,m,l,k,j=this,i=null
for(s=j.r,r=j.w,q=j.x,p=j.y,o=j.z,n=A.lw(["exposure",j.a,"bloomStrength",j.b,"ssaoStrength",j.c,"depthOfFieldStrength",j.d,"vignette",j.e,"grain",j.f,"rainIntensity",s,"surfaceWetness",r,"surfaceSnowCoverage",q,"surfaceDissolution",p,"rainWindowVisibility",o,"ditherStrength",j.Q,"colorGradeStrength",j.as,"affineWarpStrength",j.at,"vertexSnapGrid",j.ax,"vhsChromaWeight",j.ch,"vhsTrackingWeight",j.CW,"vhsNoiseWeight",j.cx,"vhsHeadSwitchWeight",j.cy,"vhsDropoutWeight",j.db,"vhsGhostWeight",j.dx],t.N,t.i),n=new A.b9(n,A.v(n).h("b9<1,2>")).gC(0);n.k();){m=n.d
l=m.a
k=m.b
if(!isFinite(k)||k<0)throw A.c(A.j("PostProcessState."+l+" must be >= 0: "+A.p(k),i))}n=j.ay
if(n<1||n>8)throw A.c(A.j("PostProcessState.quantizationBits must be in [1, 8]: "+n,i))
if(s>1)throw A.c(A.j("PostProcessState.rainIntensity must be in [0, 1]: "+s,i))
if(r>1)throw A.c(A.j("PostProcessState.surfaceWetness must be in [0, 1]: "+r,i))
if(q>1)throw A.c(A.j("PostProcessState.surfaceSnowCoverage must be in [0, 1]: "+q,i))
if(p>1)throw A.c(A.j("PostProcessState.surfaceDissolution must be in [0, 1]: "+p,i))
if(o>1)throw A.c(A.j("PostProcessState.rainWindowVisibility must be in [0, 1]: "+o,i))}}
A.cK.prototype={
gcs(){var s,r=this,q=r.x
if(q===$){s=r.b.bz()
r.x!==$&&A.l6()
r.x=s
q=s}return q},
gej(){var s,r=this,q=r.z
if(q===$){s=r.c.bz()
r.z!==$&&A.l6()
r.z=s
q=s}return q},
A(){var s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=i.d
if(!g.gI(0))throw A.c(A.j("CameraView.eye must be finite: "+g.i(0),h))
g=i.e
if(!g.gI(0)||g.ga1()<1e-12)throw A.c(A.j("CameraView.forward must be finite and nonzero: "+g.i(0),h))
g=i.f
if(isFinite(g)){s=i.r
s=!isFinite(s)||g<=0||s<=g}else s=!0
if(s)throw A.c(A.j("CameraView requires 0 < near < far, got "+A.p(g)+"/"+i.r,h))
g=i.w
if(!isFinite(g)||g<=0)throw A.c(A.j("CameraView.aspect must be finite and > 0: "+A.p(g),h))
g=i.a
if(!g.gI(0)||!i.b.gI(0)||!i.c.gI(0))throw A.c(A.j("CameraView matrices must be finite",h))
for(s=i.c.a,r=s.length,g=i.b.m(0,g).a,q=g.length,p=0,o=-1,n=0;n<16;++n){if(!(n<r))return A.h(s,n)
m=s[n]
if(!(n<q))return A.h(g,n)
l=g[n]
k=Math.abs(m-l)/(1+Math.abs(l))
if(k>p){o=n
p=k}}if(p>0.0001){m=B.c.eL(p,2)
l=B.d.V(o,4)
j=B.d.K(o,4)
if(!(o>=0&&o<r))return A.h(s,o)
s=s[o]
if(!(o<q))return A.h(g,o)
throw A.c(A.j("CameraView.viewProjection must equal projection * view. Worst relative mismatch "+m+" at column "+l+" row "+j+" (got "+A.p(s)+", expected "+A.p(g[o])+"). Prefer CameraView.look/lookAt/fromMatrices, which derive it.",h))}}}
A.dr.prototype={}
A.en.prototype={
A(){var s,r,q,p,o,n,m,l,k,j=this,i=null
if(!j.a.gI(0)||!j.b.gI(0)||!j.fx.gI(0)||!j.r.gI(0)||!j.dx.gI(0))throw A.c(A.j("FrameEnvironment colors must be finite",i))
s=j.k4
if(s!=null){r=!0
if(B.w.cD(s.a).length!==0)if(s.c.gI(0))if(s.d.gI(0))if(s.e.gI(0)){q=s.f
if(isFinite(q))if(!(q<0))if(!(q>1)){q=s.r
if(isFinite(q))if(!(q<0))if(!(q>0.1))if(isFinite(s.w)){q=s.x
if(isFinite(q))if(q>0){q=s.z
if(!(q<0))if(!(q>1))if(isFinite(q)){q=s.Q
if(!(q<0))if(!(q>1))if(isFinite(q)){q=s.as
if(q>0)if(q<=1e5)if(isFinite(q)){q=s.at
if(q>0)if(q<=1e5)if(isFinite(q)){q=s.ax
if(!(q<=0))if(!(q>1))if(isFinite(q)){q=s.ay
if(isFinite(q)){p=s.ch
if(isFinite(p))if(Math.abs(q)<=1000)if(Math.abs(p)<=1000)if(isFinite(s.CW)){q=s.cx
if(!(q<0))if(!(q>1))if(isFinite(q)){q=s.cy
if(!(q<0))if(!(q>1))if(isFinite(q)){s=s.db
s=s<4||s>24}else s=r
else s=r
else s=r}else s=r
else s=r
else s=r}else s=r
else s=r
else s=r
else s=r}else s=r}else s=r
else s=r
else s=r}else s=r
else s=r
else s=r}else s=r
else s=r
else s=r}else s=r
else s=r
else s=r}else s=r
else s=r
else s=r}else s=r
else s=r}else s=r
else s=r
else s=r
else s=r}else s=r
else s=r
else s=r}else s=r
else s=r
else s=r
else s=r
if(s)A.m(A.j("SkyboxDeclaration contains invalid values",i))}s=j.c
if(isFinite(s)){r=j.d
r=!isFinite(r)||r<s}else r=!0
if(r)throw A.c(A.j("FrameEnvironment requires fogEnd >= fogStart, got "+s+"/"+j.d,i))
s=j.fy
if(!isFinite(s)||s<0)throw A.c(A.j("FrameEnvironment.ambientIntensity must be >= 0: "+A.p(s),i))
s=j.go
if(s!=null)s.A()
for(s=j.id,r=s.length,o=0;o<r;++o){n=s[o]
q=n.b
if(!(isFinite(q.a)&&isFinite(q.b)&&isFinite(q.c)))A.m(A.j("PointLight.position must be finite: "+q.i(0),i))
q=n.d
if(!isFinite(q)||q<0)A.m(A.j("PointLight.intensity must be >= 0: "+A.p(q),i))
q=n.e
if(!isFinite(q)||q<=0)A.m(A.j("PointLight.radius must be > 0: "+q,i))}for(s=isFinite(0),r=isFinite(1),q=isFinite(-1),o=0;!1;++o){if(s)p=r
else p=!1
if(!p)A.m(A.j("SpotLight.position must be finite: "+B.f.i(0),i))
if(s)p=q
else p=!1
if(!p)A.m(A.j("SpotLight.direction must be finite and nonzero: "+B.o.i(0),i))}s=t.N
m=A.at(s)
for(r=j.k2,o=0;!1;++o){l=r[o]
l.A()
if(!m.j(0,l.gL()))throw A.c(A.j("FrameEnvironment.volumetricSources contains duplicate id: "+A.p(l.gL()),i))}r=j.w
q=!0
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
r=r<0||r>1||!isFinite(r)}else r=q
else r=q
else r=q}else r=q
else r=q
else r=q}else r=q
else r=q}else r=q
else r=q}else r=q
else r=q}else r=q
else r=q}else r=q
else r=q}else r=q
else r=q}else r=q
else r=q}else r=q
else r=q}else r=q
else r=q
else r=q}else r=q
else r=q
else r=q}else r=q
else r=q
else r=q}else r=q
else r=q
else r=q}else r=q
else r=q
if(r)throw A.c(A.j("invalid volumetric medium controls",i))
k=A.at(s)
for(s=j.k3,o=0;!1;++o){l=s[o]
l.A()
if(!k.j(0,l.gL()))throw A.c(A.j("FrameEnvironment.thermalSources contains duplicate id: "+A.p(l.gL()),i))}},
ak(a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this
t.c3.a(b1)
s=a4==null?a1.a:a4
r=a6==null?a1.b:a6
q=b0==null?a1.c:b0
p=a8==null?a1.d:a8
o=a9===B.l?a1.e:A.kO(a9)
n=a7===B.l?a1.f:A.kO(a7)
m=b6==null?a1.r:b6
l=b9==null?a1.w:b9
k=b8==null?a1.x:b8
j=b7==null?a1.y:b7
i=c0==null?a1.Q:c0
h=c1==null?a1.as:c1
g=b2==null?a1.dx:b2
f=b4==null?a1.dy:b4
e=b3==null?a1.fr:b3
d=a2==null?a1.fx:a2
c=a3==null?a1.fy:a3
b=a5===B.l?a1.go:t.eB.a(a5)
a=b1==null?a1.id:b1
a0=b5===B.l?a1.k4:t.bG.a(b5)
return new A.en(s,r,q,p,o,n,m,l,k,j,a1.z,i,h,a1.at,a1.ax,a1.ay,a1.ch,a1.CW,a1.cx,a1.cy,a1.db,g,f,e,d,c,b,a,a1.k1,a1.k2,a1.k3,a0)},
co(a){var s=null
return this.ak(s,s,s,B.l,s,B.l,s,B.l,s,s,s,s,s,a,s,s,s,s,s,s)},
e0(a,b,c,d,e,f,g){var s=null
return this.ak(a,b,c,d,s,B.l,s,B.l,s,s,e,f,g,B.l,s,s,s,s,s,s)},
dU(a){var s=null
return this.ak(s,s,s,B.l,s,B.l,s,B.l,s,a,s,s,s,B.l,s,s,s,s,s,s)},
e_(a,b,c,d,e,f){var s=null
return this.ak(s,s,s,B.l,s,B.l,s,B.l,s,s,s,s,s,B.l,a,b,c,d,e,f)},
dY(a,b,c,d){var s=null
return this.ak(s,s,s,B.l,s,a,b,c,d,s,s,s,s,B.l,s,s,s,s,s,s)},
dZ(a,b,c,d,e){var s=null
return this.ak(s,s,s,B.l,a,b,c,d,e,s,s,s,s,B.l,s,s,s,s,s,s)},
dX(a,b,c,d){var s=null
return this.ak(a,b,s,c,d,B.l,s,B.l,s,s,s,s,s,B.l,s,s,s,s,s,s)}}
A.ht.prototype={}
A.hu.prototype={
by(a){++this.b}}
A.bd.prototype={
a3(a,b){if(b==null)return!1
return J.e3(b)===A.l2(this)&&b instanceof A.bd&&this.a===b.a&&this.b===b.b},
gP(a){return A.bL(A.l2(this),this.a,this.b,B.k,B.k,B.k)}}
A.az.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MeshHandle(#"+this.a+"."+this.b+s+")"}}
A.aB.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"TextureHandle(#"+this.a+"."+this.b+s+")"}}
A.b1.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MaterialHandle(#"+this.a+"."+this.b+s+")"}}
A.eT.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"PipelineHandle(#"+this.a+"."+this.b+s+")"}}
A.b_.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.cf.prototype={
B(){return"HandleRejection."+this.b}}
A.hC.prototype={
i(a){return"HandleException("+this.a.b+", "+this.b.i(0)+")"}}
A.cl.prototype={
i(a){var s=this.b,r=this.a.a
return s==null?r.b+": ok":r.b+": "+A.p(s)}}
A.ea.prototype={}
A.jO.prototype={
$1(a){return t.W.a(a)===this.a},
$S:63}
A.x.prototype={
gI(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
a3(a,b){if(b==null)return!1
return b instanceof A.x&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gP(a){return A.bL(this.a,this.b,this.c,B.k,B.k,B.k)},
i(a){return"LinearColor("+A.p(this.a)+", "+A.p(this.b)+", "+A.p(this.c)+")"}}
A.ca.prototype={
A(){var s=this.a
if(!s.gI(0)||s.ga1()<1e-12)throw A.c(A.j("DirectionalLight.direction must be finite and nonzero: "+s.i(0),null))
s=this.c
if(!isFinite(s)||s<0)throw A.c(A.j("DirectionalLight.intensity must be >= 0: "+A.p(s),null))}}
A.bu.prototype={}
A.av.prototype={}
A.kg.prototype={
$2(a,b){var s,r=t.fk
r.a(a)
s=B.c.O(r.a(b).a,a.a)
return s===0?0:s},
$S:64}
A.h5.prototype={
B(){return"AlphaMode."+this.b}}
A.eH.prototype={
B(){return"MaterialMapColorSpace."+this.b}}
A.aT.prototype={
A(){var s,r,q,p,o,n,m,l=this,k=null
if(l.a.length===0)throw A.c(A.j("MaterialDefinition.key must not be empty",k))
s=l.w
if(!isFinite(s)||s<0)throw A.c(A.j("MaterialDefinition.emissiveStrength must be >= 0: "+A.p(s),k))
s=l.z
if(!isFinite(s)||s<0)throw A.c(A.j("MaterialDefinition.normalStrength must be >= 0: "+A.p(s),k))
A.eG("roughness",l.at)
A.eG("metallic",l.ax)
A.eG("occlusionStrength",1)
A.eG("clearcoatStrength",l.ch)
A.eG("clearcoatRoughness",l.CW)
if(!isFinite(0))throw A.c(A.j("MaterialDefinition.lightmapIntensity must be >= 0: 0",k))
for(s=l.db,r=l.dx,q=[new A.E("uvScaleU",s),new A.E("uvScaleV",r),new A.E("uvOffsetU",0),new A.E("uvOffsetV",0),new A.E("tintR",l.d),new A.E("tintG",l.e),new A.E("tintB",l.f)],p=0;p<7;++p){o=q[p]
n=o.a
m=o.b
if(!isFinite(m))throw A.c(A.j("MaterialDefinition."+n+" must be finite: "+A.p(m),k))}if(s===0||r===0)throw A.c(A.j("MaterialDefinition uv scale must not be zero",k))
if(!isFinite(0.5))throw A.c(A.j("MaterialDefinition.alphaCutoff must be in (0, 1]: 0.5",k))}}
A.bj.prototype={
B(){return"VertexAttributeKind."+this.b}}
A.ah.prototype={}
A.iO.prototype={
A(){var s,r,q,p,o='VertexLayoutDescriptor "surfaceV2": attribute '
for(s=0;s<7;++s){r=B.H[s]
q=r.c
if(q<=0)throw A.c(A.j(o+r.a.i(0)+" must have a positive floatCount",null))
p=r.b
q=p+q
if(q>18)throw A.c(A.j(o+r.a.i(0)+" range ["+p+", "+q+") exceeds stride 18",null))}q=t.fg.a(new A.iP())
for(p=B.a.gC(B.H),q=new A.K(p,q,t.an);q.k();)if(p.gn().c!==4)throw A.c(A.j('VertexLayoutDescriptor "surfaceV2": tangent4 must contain 4 floats',null))}}
A.iP.prototype={
$1(a){return t.p.a(a).a===B.ap},
$S:7}
A.bs.prototype={
A(){var s,r,q,p,o,n=this
n.a.A()
s=n.b.length
if(B.d.K(s,18)!==0)throw A.c(A.j("MeshData.vertices length "+s+" is not a multiple of stride 18",null))
n.dG()
r=s/18|0
for(s=A.nj(n.c),q=s.length,p=0;p<q;++p){o=s[p]
if(o>=r)throw A.c(A.j("MeshData index "+o+" out of range for "+r+" vertices",null))}s=n.d
q=s.a
if(q.gI(0)&&s.b.gI(0)){s=s.b
s=q.a<=s.a&&q.b<=s.b&&q.c<=s.c}else s=!1
if(!s)throw A.c(A.j("MeshData.localBounds must be a valid AABB",null))},
dG(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=null,a2=t.fg,a3=t.fl,a4=new A.a5(B.H,a2.a(new A.hN()),a3)
if(!a4.gC(0).k())return
s=new A.a5(B.H,a2.a(new A.hO()),a3)
if(s.gu(0)!==1)throw A.c(A.j("surface-v2 tangent data requires one normal slot",a1))
r=a4.gaD(0)
for(a2=this.b,a3=a2.length,q=a3/18|0,p=t.n,o=s.gaD(0).b,n=r.b,m=0;m<q;++m){l=m*18
k=l+o
if(!(k<a3))return A.h(a2,k)
j=a2[k]
i=k+1
if(!(i<a3))return A.h(a2,i)
h=a2[i]
k+=2
if(!(k<a3))return A.h(a2,k)
g=a2[k]
k=l+n
if(!(k<a3))return A.h(a2,k)
f=a2[k]
i=k+1
if(!(i<a3))return A.h(a2,i)
e=a2[i]
i=k+2
if(!(i<a3))return A.h(a2,i)
d=a2[i]
k+=3
if(!(k<a3))return A.h(a2,k)
c=a2[k]
b=j*j+h*h+g*g
a=f*f+e*e+d*d
if(!B.a.aZ(A.b([j,h,g,f,e,d,c],p),new A.hP()))throw A.c(A.j("surface-v2 tangent basis must be finite",a1))
if(b<1e-8||a<1e-8)throw A.c(A.j("surface-v2 tangent basis must be non-zero",a1))
a0=(j*f+h*e+g*d)/Math.sqrt(b*a)
if(Math.abs(a0)>0.05)throw A.c(A.j("surface-v2 tangent must be orthogonal to its normal: "+A.p(a0),a1))
if(Math.abs(Math.abs(c)-1)>0.05)throw A.c(A.j("surface-v2 tangent handedness must be -1 or +1: "+A.p(c),a1))}}}
A.hN.prototype={
$1(a){return t.p.a(a).a===B.ap},
$S:7}
A.hO.prototype={
$1(a){return t.p.a(a).a===B.b8},
$S:7}
A.hP.prototype={
$1(a){return isFinite(A.h0(a))},
$S:13}
A.hi.prototype={}
A.hV.prototype={
A(){var s=this.a,r=s.a
if(!r.p(0,"sceneColor")||!r.p(0,"present"))throw A.c(A.j("resource plan must contain sceneColor and present",null))
if(s.dK(0,new A.hX()))throw A.c(A.j("resource plan contains an empty resource ID",null))
if(this.b!==r.p(0,"vhsOutput"))throw A.c(A.j("resource history does not match vhsOutput ownership",null))}}
A.hX.prototype={
$1(a){return A.U(a).length===0},
$S:8}
A.ib.prototype={}
A.f2.prototype={
cr(a){var s=this
if(s.d)A.m(A.k("resource assembler is disposed"))
if(s.a!=null)throw A.c(A.k("resource assembler is initialized"))
a.A()
s.a=a
s.c=1},
am(){if(this.d)return
this.d=!0
this.a=null}}
A.cT.prototype={
B(){return"DrawMode."+this.b}}
A.e8.prototype={
B(){return"BlendMode."+this.b}}
A.be.prototype={}
A.iH.prototype={
i(a){var s=this
return"SurfaceMetrics(css "+s.a+"x"+s.b+", pixels "+s.c+"x"+s.d+", dpr "+A.p(s.e)+", visible: true)"},
A(){var s,r=this
if(r.a<0||r.b<0)throw A.c(A.j("SurfaceMetrics css size must be >= 0",null))
if(r.c<0||r.d<0)throw A.c(A.j("SurfaceMetrics pixel size must be >= 0",null))
s=r.e
if(!isFinite(s)||s<=0)throw A.c(A.j("SurfaceMetrics.devicePixelRatio must be finite and > 0: "+A.p(s),null))}}
A.hc.prototype={
B(){return"ColorEncoding."+this.b}}
A.dk.prototype={
A(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.cq(B.dQ)
if(o.a!==0)A.m(A.al(o,r,"contains unknown pipeline features"))
if(q.a===B.aN&&p.gct(p))A.m(A.al(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.c(A.j("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.c(A.j("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.co.prototype={
B(){return"RendererState."+this.b}}
A.X.prototype={}
A.hv.prototype={
i(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.b+" tris="+s.c+" culled="+s.d+" gpu="+s.r+"B)"}}
A.eI.prototype={
ez(a){return this.a.au(a)}}
A.hM.prototype={
$3(a,b,c){return new A.b1(A.d(a),A.d(b),A.bW(c))},
$S:20}
A.fi.prototype={}
A.hQ.prototype={
ck(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.b,d=A.lY(f,new A.ep(e.byteLength,B.ax,B.bB))
if(f.b!==B.h)A.m(A.k(g))
s=A.l(d.a)
r=f.a
q=v.G
r.bindBuffer(A.d(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.d(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.aL(f)
A.a8(f,p)
if(f.b!==B.h)A.m(A.k(g))
r.bindBuffer(A.d(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=A.at(t.S)
for(n=a.a,m=0;m<7;++m){l=B.H[m]
k=A.ms(l.a)
if(!o.j(0,k))continue
j=A.oF(n,k,l)
if(f.b!==B.h)A.m(A.k(g))
r.vertexAttribPointer.apply(r,[k,j,A.d(q.WebGL2RenderingContext.FLOAT),!1,72,l.b*4])
if(f.b!==B.h)A.m(A.k(g))
r.enableVertexAttribArray(k)}i=a.c
h=A.lY(f,new A.ep(A.lC(i),B.ax,B.aw))
if(f.b!==B.h)A.m(A.k(g))
r.bindBuffer(A.d(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),A.l(h.a))
A.o7(f,h,t.bW.a(i))
f=i.length
return new A.fi(d,h,p,f,e.length/18|0,!1)},
es(a){var s=this.c.t(0,a.a)
if(s==null)throw A.c(A.bo(B.U,a))
this.b.au(a)
return s},
bD(){var s,r,q,p
for(s=this.b.aL(),r=s.$ti,s=new A.bl(s.a(),r.h("bl<1>")),q=this.c,r=r.c;s.k();){p=s.b
if(p==null)p=r.a(p)
q.E(0,p.a.a,this.ck(p.b))}},
gaM(){return this.b.aL().bu(0,0,new A.hS(),t.S)}}
A.hR.prototype={
$3(a,b,c){return new A.az(A.d(a),A.d(b),A.bW(c))},
$S:21}
A.hS.prototype={
$2(a,b){var s,r
A.d(a)
s=t.ai.a(b).b
r=s.b.byteLength
s=A.lC(s.c)
return a+r+s},
$S:22}
A.b4.prototype={}
A.ff.prototype={
aa(a){var s=this.a,r=A.kD(s,B.bE)
A.kE(s,r,0,a)
return r},
e8(a){var s,r=this.b,q=r.au(a),p=q.a
if(!p.d)return
s=this.c.t(0,a.a)
if(s==null)throw A.c(A.k("TextureStore.finalizeMips: no pixels uploaded yet for "+a.i(0)))
A.lZ(this.a,s)
r.bH(a,new A.b4(p,q.b,!0))},
bj(a,b){var s
this.b.au(a)
s=this.c.t(0,a.a)
return s==null?b:s},
ev(a){var s
if(a==null){s=this.d
s===$&&A.aF()
return s}s=this.d
s===$&&A.aF()
return this.bj(a,s)},
eD(a){var s
if(a==null){s=this.e
s===$&&A.aF()
return s}s=this.e
s===$&&A.aF()
return this.bj(a,s)},
eF(a){var s
if(a==null){s=this.f
s===$&&A.aF()
return s}s=this.f
s===$&&A.aF()
return this.bj(a,s)},
ex(a){var s=this.r
s===$&&A.aF()
return s},
eB(a){var s=this.w
s===$&&A.aF()
return s},
am(){var s,r,q,p,o,n=this
for(s=n.c,r=new A.bb(s,s.r,s.e,A.v(s).h("bb<2>")),q=n.a,p=q.a,o=t.R;r.k();)p.deleteTexture(o.a(r.d.a).a)
s.a0(0)
s=n.d
s===$&&A.aF()
A.fn(q,s)
s=n.e
s===$&&A.aF()
A.fn(q,s)
s=n.f
s===$&&A.aF()
A.fn(q,s)
s=n.r
s===$&&A.aF()
A.fn(q,s)
s=n.w
s===$&&A.aF()
A.fn(q,s)},
bD(){var s,r,q,p,o,n,m,l,k,j,i=this
i.d=i.aa($.lc())
i.e=i.aa($.l9())
i.f=i.aa($.la())
i.r=i.aa($.l8())
i.w=i.aa($.lb())
for(s=i.b.aL(),r=s.$ti,s=new A.bl(s.a(),r.h("bl<1>")),q=i.c,p=i.a,r=r.c;s.k();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
o=m.b
if(B.a.aZ(o,new A.iK()))continue
l=A.kD(p,m.a)
for(k=0;k<o.length;++k){j=o[k]
if(j!=null)A.kE(p,l,k,j)}if(m.c)A.lZ(p,l)
q.E(0,n.a,l)}},
gaM(){return this.b.aL().bu(0,0,new A.iJ(),t.S)}}
A.iI.prototype={
$3(a,b,c){return new A.aB(A.d(a),A.d(b),A.bW(c))},
$S:24}
A.iK.prototype={
$1(a){return t.aD.a(a)==null},
$S:25}
A.iJ.prototype={
$2(a,b){var s
A.d(a)
s=t.dU.a(b).b.a
return a+s.a*s.b*s.c*4},
$S:26}
A.ab.prototype={
B(){return"SolarPhase."+this.b}}
A.iF.prototype={
A(){var s,r,q,p,o,n,m,l,k,j,i=this,h="cloudCover01",g="precipitation01",f="relativeHumidity01",e=null
for(s=i.c,r=i.d,q=i.e,p=i.r,o=i.x,n=[new A.E("timeHours",i.a),new A.E("solarNoonHours",12),new A.E("latitudeRadians",s),new A.E("solarDeclinationRadians",r),new A.E(h,q),new A.E(g,0),new A.E("aerosolTurbidity",p),new A.E(f,0.7),new A.E("solarIntensity",o),new A.E("baseFogDensity",0.0015),new A.E("fogHeightFalloff",0.06)],m=0;m<11;++m){l=n[m]
k=l.a
if(!isFinite(l.b))throw A.c(A.j(k+" must be finite",e))}if(s<-1.5707963267948966||s>1.5707963267948966)throw A.c(A.j("latitudeRadians must be in [-pi/2, pi/2]",e))
if(r<-1.5707963267948966||r>1.5707963267948966)throw A.c(A.j("solarDeclinationRadians must be in [-pi/2, pi/2]",e))
for(s=[new A.E(h,q),new A.E(g,0),new A.E(f,0.7)],m=0;m<3;++m){r=s[m]
k=r.a
j=r.b
if(j<0||j>1)throw A.c(A.j(k+" must be in [0, 1]",e))}if(p>=1)s=o<0
else s=!0
if(s)throw A.c(A.j("solar attenuation inputs are out of bounds",e))}}
A.kh.prototype={
$2(a,b){var s,r=t.eS
r.a(a)
s=J.le(r.a(b).a,a.a)
return s},
$S:27}
A.hb.prototype={
dJ(a){if(a<=0)return
this.a=B.c.q(this.a+a,0,1)},
ae(a){var s
if(a<=0)return
this.b+=a
s=this.a
if(s>0)this.a=Math.max(0,s-a*1.25)},
e6(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this.a,c=d*d
if(c<=0.000001)return new A.cy(B.A,B.r)
s=this.b*22
d=Math.sin(s)
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
g=A.dh(B.m,(m+0.4*l)*0.71*0.05*c)
f=A.dh(B.f,(k+0.4*j)*0.71*0.05*c)
e=A.dh(B.u,(i+0.4*h)*0.71*0.035*c)
return new A.cy(f.m(0,g).m(0,e),new A.a((d+0.5*r)*0.67*0.2*c,(q+0.5*p)*0.67*0.2*c,(o+0.5*n)*0.67*0.2*c))},
dL(a){var s,r,q,p,o,n
if(this.a<=0.000001)return a
s=this.e6()
r=s.a
q=a.d.H(0,s.b)
p=r.bE(a.e)
o=A.kx(q,p,r.bE(B.f))
n=a.b
return A.lj(a.w,q,a.r,p,a.f,n,o,n.m(0,o))}}
A.bG.prototype={
gav(){var s=this,r=Math.cos(s.c),q=Math.sin(s.c)
return new A.a(Math.sin(s.b)*r,q,-Math.cos(s.b)*r).gD()},
ae(a){var s,r,q,p,o,n,m=this
if(a<=0)return
s=10*a
if(m.z.ga1()>0.000001){r=new A.a(m.gav().a,0,m.gav().c).gD()
q=new A.a(m.gav().a8(B.f).gD().a,0,m.gav().a8(B.f).gD().c).gD()
p=m.z
o=r.m(0,p.c).H(0,q.m(0,p.a)).H(0,B.f.m(0,p.b)).gD().m(0,m.d)
n=B.c.q(s,0,1)
s=m.y.m(0,1-n).H(0,o.m(0,n))
m.y=s
m.a=m.a.H(0,s.m(0,a))}else{n=B.c.q(s,0,1)
s=m.y=m.y.m(0,1-n)
if(s.ga1()>0.000001)m.a=m.a.H(0,s.m(0,a))}},
b2(a){return A.ed(a,this.a,200,this.gav(),1,0.1,B.f)},
$iec:1}
A.bt.prototype={
gbs(){var s=this,r=Math.cos(s.d),q=Math.sin(s.d),p=Math.sin(s.c),o=Math.cos(s.c),n=s.a,m=s.b
return n.H(0,new A.a(r*p*m,q*m,r*o*m))},
gcA(){return this.a.a6(0,this.gbs()).gD().a8(B.f).gD()},
ae(a){var s,r,q,p=this
if(a<=0)return
if(p.as)p.ax=p.ax+p.at*a
s=B.c.q(1-Math.exp(-10*a),0,1)
r=p.c
p.c=r+(p.ax-r)*s
r=p.d
p.d=r+(p.ay-r)*s
r=p.b
p.b=r+(p.ch-r)*s
r=p.CW
q=p.a
p.a=q.H(0,r.a6(0,q).m(0,s))},
b2(a){var s=this.gbs(),r=this.a,q=r.a6(0,s)
if(q.ga1()<1e-12)A.m(A.j("CameraView.lookAt requires target ("+r.i(0)+") distinct from eye ("+s.i(0)+")",null))
return A.ed(a,s,200,q,1,0.1,B.f)},
$iec:1}
A.cq.prototype={
ae(a){var s,r,q=this,p=q.a.gao().a,o=p.H(0,q.c),n=Math.cos(q.Q),m=Math.sin(q.Q),l=o.H(0,new A.a(Math.sin(q.z)*n,m,Math.cos(q.z)*n).m(0,q.d)).H(0,new A.a(0,q.e,0))
if(!q.ax){q.as=l
q.at=o
q.ax=!0
return}s=B.c.q(a*q.f,0,1)
r=B.c.q(a*8,0,1)
q.as=A.lS(q.as,l,s)
q.at=A.lS(q.at,o,r)},
b2(a){var s=this.as,r=this.at.a6(0,s)
return A.ed(a,s,250,r.ga1()>1e-8?r.gD():B.y,1,0.1,B.f)},
$iec:1}
A.b7.prototype={
ged(){return this.b.length}}
A.el.prototype={
dR(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h
t.U.a(a)
s=new A.it(A.b([],t.cU),A.at(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p)r[p].X(s,b)
o=s.dQ(a,!1)
if(o.b.length!==0)return new A.em(o,B.cF)
q=o.a
n=A.H(q)
m=new A.O(q,n.h("u(1)").a(new A.hn()),n.h("O<1,u>")).aA(0)
l=A.b([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p){k=r[p]
for(n=k.W(d),j=n.length,i=0;i<n.length;n.length===j||(0,A.A)(n),++i){h=n[i]
if(!m.p(0,h.gl().a))throw A.c(A.k('RenderFeature "'+k.gL()+'" created a pass "'+h.gl().a+'" that it never declared into the graph'))
B.a.j(l,h)}}B.a.ai(l,new A.ho(o))
return new A.em(o,l)}}
A.hn.prototype={
$1(a){return t.z.a(a).a},
$S:28}
A.ho.prototype={
$2(a,b){var s=t.g7
s.a(a)
s.a(b)
s=this.a.a
return B.d.O(B.a.bv(s,new A.hl(a)),B.a.bv(s,new A.hm(b)))},
$S:29}
A.hl.prototype={
$1(a){return t.z.a(a).a===this.a.gl().a},
$S:4}
A.hm.prototype={
$1(a){return t.z.a(a).a===this.a.gl().a},
$S:4}
A.em.prototype={}
A.cd.prototype={
B(){return"FrameQueueState."+this.b}}
A.eo.prototype={$inM:1}
A.hs.prototype={
dO(a){if(a.length===0)throw A.c(A.al(a,"passId",null))
this.b=a
this.a.bC(a,A.mw())},
cL(){var s,r,q,p,o=t.A
o=A.ax(o,o)
for(s=this.a,s=new A.b9(s,A.v(s).h("b9<1,2>")).gC(0);s.k();){r=s.d
q=r.a
p=r.b
o.E(0,q,new A.X(p.a,p.b,p.d))}return A.ll(o,t.N,t.o)},
aq(a,b){var s,r=this.b
if(r==null)throw A.c(A.k("draw recorded outside an active render pass"))
if(b<1)throw A.c(A.j("draw count and instance count must be positive",null))
s=this.a.t(0,r);++s.a
s.d+=b
s.b=s.b+B.d.V(a,3)*b}}
A.cw.prototype={}
A.J.prototype={
gaw(){var s=this.c,r=A.H(s)
return new A.a5(s,r.h("w(1)").a(new A.hY()),r.h("a5<1>"))},
gaN(){var s=this.c,r=A.H(s)
return new A.a5(s,r.h("w(1)").a(new A.hZ()),r.h("a5<1>"))},
i(a){return"PassDeclaration("+this.a+" @ "+this.b.i(0)+")"}}
A.hY.prototype={
$1(a){var s=t.L.a(a).b
return s===B.e||s===B.B},
$S:9}
A.hZ.prototype={
$1(a){return t.L.a(a).b===B.i},
$S:9}
A.aR.prototype={
B(){return"GraphValidationFailureKind."+this.b}}
A.ad.prototype={
i(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.f0.prototype={
B(){return"ResourceFormat."+this.b}}
A.b6.prototype={
B(){return"GraphStage."+this.b}}
A.T.prototype={
cu(){var s=this
return new A.T(s.a,s.b,s.c,s.d,s.e,s.f+1)},
a3(a,b){var s=this
if(b==null)return!1
return b instanceof A.T&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gP(a){var s=this
return A.bL(s.a,s.b,s.c,s.d,s.e,s.f)},
i(a){var s=this,r=s.b.i(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.dm.prototype={
B(){return"ResourceAccess."+this.b}}
A.o.prototype={}
A.cO.prototype={}
A.il.prototype={
Y(a){var s,r,q,p,o,n,m=this
a.A()
s=null
try{r=a.d.gah()
r=A.ap(r,A.v(r).h("n.E"))
q=t.dy
s=A.oa(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.c3(p) instanceof A.dq){++m.e
throw p}else throw p}o=new A.cO(s)
r=m.b
q=a.a
n=r.t(0,q)
r.E(0,q,o);++m.d
if(n!=null)m.a.a.deleteProgram(A.l(n.b.a))
return o},
df(a){var s,r
t.cr.a(a)
for(s=a.a,s=new A.bb(s,s.r,s.e,a.$ti.h("bb<1>")),r=this.a.a;s.k();)r.deleteProgram(A.l(s.d.b.a))}}
A.a7.prototype={
A(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.c(A.j("ProgramSource.id must not be empty",m))
s=t.S
r=A.at(s)
for(q=this.d.gaI(),q=q.gC(q);q.k();){p=q.gn()
o=p.b
if(o<0)throw A.c(A.j('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.j(0,o))throw A.c(A.j('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.at(s)
for(s=this.e.gaI(),s=s.gC(s);s.k();){q=s.gn()
p=q.b
if(p<0)throw A.c(A.j('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.j(0,p))throw A.c(A.j('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.ir.prototype={}
A.a2.prototype={
R(){var s=this
return A.n1(B.bc,s.f,B.O,B.L,!0,!0,!0,!0,s.r,B.Q,B.R,s.d,s.e,!0,!1,!1)}}
A.it.prototype={
dQ(a,b){var s=this.dF(t.U.a(a),!1),r=this.a,q=A.H(r)
return new A.is(A.ch(new A.a5(r,q.h("w(1)").a(new A.iy()),q.h("a5<1>")),t.z),s)},
dF(a,b){var s,r,q,p,o,n,m=this
t.U.a(a)
s=A.b([],t.b7)
r=m.a
q=A.H(r)
p=q.h("a5<1>")
o=A.ap(new A.a5(r,q.h("w(1)").a(new A.ix()),p),p.h("n.E"))
m.d_(o,a,s)
m.d3(o,s)
m.d5(o,s)
m.d2(o,!1,s)
n=m.d8(o,s)
m.d4(o,n,s)
m.d6(o,s)
m.d1(o,n,s)
m.d0(o,s)
return s},
d_(a,b,c){var s,r,q,p
t.O.a(a)
t.U.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
p=B.ab.cq(b)
if(p.a!==0)B.a.j(c,new A.ad(B.bS,q.a,"missing capabilities: "+p.ek(0,", ")))}},
d3(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gaw(),o=J.a6(p.a),p=new A.K(o,p.b,p.$ti.h("K<1>")),n=q.a;p.k();){m=o.gn().a
if(m.e>1)B.a.j(b,new A.ad(B.bN,n,"reads multisampled resource "+m.i(0)+" directly; resolve before sampling"))}}},
d5(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.H(a),r=s.h("w(1)").a(new A.iw()),q=B.a.gC(a),s=new A.K(q,r,s.h("K<1>"));s.k();){r=q.gn()
p=r.gaw()
o=A.ap(p,p.$ti.h("n.E"))
p=r.gaN()
n=A.ap(p,p.$ti.h("n.E"))
if(o.length!==1||n.length!==1){B.a.j(b,new A.ad(B.a2,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.a.gaD(o).a
l=B.a.gaD(n).a
if(m.e<=1||l.e>1)B.a.j(b,new A.ad(B.a2,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.a.j(b,new A.ad(B.a2,r.a,"resolve source and destination must match format and extent"))}},
d2(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.A)(p),++m){l=p[m]
if(l.b===B.B)B.a.j(c,new A.ad(B.bQ,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
d8(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.ax(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.A)(a),++q){p=a[q]
for(o=p.gaN(),n=J.a6(o.a),o=new A.K(n,o.b,o.$ti.h("K<1>")),m=p.a;o.k();){l=n.gn().a
k=l.a+"#"+l.f
j=s.t(0,k)
if(j!=null){B.a.j(b,new A.ad(B.bM,m,l.i(0)+" already written by "+j.a))
continue}s.E(0,k,p)}}return s},
d4(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gaw(),p=J.a6(q.a),q=new A.K(p,q.b,q.$ti.h("K<1>")),o=r.a;q.k();){n=p.gn()
if(n.b===B.B)continue
n=n.a
m=b.t(0,n.a+"#"+n.f)
if(m==null){B.a.j(c,new A.ad(B.aA,o,"reads "+n.i(0)+" but no pass writes that version"))
continue}if(B.a.eb(a,m)>s)B.a.j(c,new A.ad(B.aA,o,"reads "+n.i(0)+" before writer "+m.a+" runs"))}}},
d6(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gaw(),o=J.a6(p.a),p=new A.K(o,p.b,p.$ti.h("K<1>")),n=q.a;p.k();){m=o.gn()
if(m.b===B.B)continue
for(l=q.gaN(),k=J.a6(l.a),l=new A.K(k,l.b,l.$ti.h("K<1>")),m=m.a,j=m.a,i=m.f;l.k();){h=k.gn().a
if(j===h.a&&i===h.f)B.a.j(b,new A.ad(B.bP,n,"reads and writes "+m.i(0)+" at the same version; declare a ping-pong version bump"))}}}},
d1(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gaw(),o=J.a6(p.a),p=new A.K(o,p.b,p.$ti.h("K<1>")),n=q.a;p.k();){m=o.gn()
if(m.b===B.B)continue
l=m.a
k=b.t(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gaN().e9(0,new A.iv(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.a.j(c,new A.ad(B.bO,n,"reads "+l.i(0)+" but writer "+k.a+" produced "+j.i(0)))}}},
d0(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.ax(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gaN(),o=J.a6(p.a),p=new A.K(o,p.b,p.$ti.h("K<1>"));p.k();){n=o.gn().a
r.E(0,n.a+"#"+n.f,q)}m=J.ks(p,t.cJ)
for(l=0;l<p;++l)m[l]=A.at(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gaw(),p=J.a6(s.a),s=new A.K(p,s.b,s.$ti.h("K<1>"));s.k();){o=p.gn()
if(o.b===B.B)continue
o=o.a
k=r.t(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.h(m,k)
m[k].j(0,q)}}p=t.y
j=A.eE(s,!1,!1,p)
s=a.length
i=A.eE(s,!1,!1,p)
h=new A.iu(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.h(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.h(a,q)
B.a.j(b,new A.ad(B.bR,a[q].a,"participates in a resource dependency cycle"))}}}}
A.iy.prototype={
$1(a){t.z.a(a)
return A.ky()},
$S:4}
A.ix.prototype={
$1(a){t.z.a(a)
return A.ky()},
$S:4}
A.iw.prototype={
$1(a){return t.z.a(a).f},
$S:4}
A.iv.prototype={
$1(a){var s=t.L.a(a).a,r=this.a.a
return s.a===r.a&&s.f===r.f},
$S:9}
A.iu.prototype={
$1(a){var s,r,q,p,o=this,n=o.a
if(!(a>=0&&a<n.length))return A.h(n,a)
if(n[a])return!0
s=o.b
if(!(a<s.length))return A.h(s,a)
if(s[a])return!1
B.a.E(n,a,!0)
r=o.c
if(!(a<r.length))return A.h(r,a)
r=r[a]
r=A.kK(r,r.r,A.v(r).c)
q=r.$ti.c
while(r.k()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.a.E(n,a,!1)
B.a.E(s,a,!0)
return!1},
$S:32}
A.is.prototype={}
A.bx.prototype={$iaK:1,
gL(){return this.a},
gl(){return this.b},
gaC(){return this.c}}
A.dj.prototype={
cl(a){var s,r,q,p=a.c
p.A()
s=this.a.au(a.a)
p=p.a5()
r=s.d.gal()
q=A.H(r)
return A.c5(new A.O(r,q.h("a(1)").a(p.gan()),q.h("O<1,a>")))},
dI(a){var s=this.cl(a),r=this.b.cp(a)
this.c.E(0,r,new A.bx(r,a,s))
return r},
eN(a,b){var s=this.cl(b)
this.b.bH(a,b)
this.c.E(0,a,new A.bx(a,b,s))},
eq(a){this.b.az(a)
this.c.a4(0,a)},
$inP:1}
A.iz.prototype={
$3(a,b,c){return new A.b_(A.d(a),A.d(b),A.bW(c))},
$S:33}
A.f1.prototype={
a2(a,b){var s,r
if(this.x)A.m(A.k("resource library is disposed"))
s=this.a
a.A()
r=s.b.aY(a,b)
s.c.E(0,r.a,s.ck(a))
this.f.j(0,r)
return r},
M(a){var s
if(this.x)A.m(A.k("resource library is disposed"))
a.A()
s=this.b.a.aY(a,null)
this.r.j(0,s)
return s},
am(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
if(e.x)return
s=e.w
r=A.ap(s,A.v(s).c)
q=r.length
p=e.c
o=p.c
n=p.a.a
m=t.R
l=0
for(;l<r.length;r.length===q||(0,A.A)(r),++l){k=r[l]
j=o.a4(0,k.a)
if(j!=null)n.deleteTexture(m.a(j.a).a)
p.b.az(k)}r=e.r
q=A.ap(r,A.v(r).c)
o=q.length
n=e.b.a
l=0
for(;l<q.length;q.length===o||(0,A.A)(q),++l)n.az(q[l])
q=e.f
o=A.ap(q,A.v(q).c)
n=o.length
m=e.a
i=m.c
h=m.a.a
l=0
for(;l<o.length;o.length===n||(0,A.A)(o),++l){k=o[l]
g=i.a4(0,k.a)
if(g!=null){h.deleteVertexArray(A.l(g.c.a))
h.deleteBuffer(A.l(g.a.a))
f=g.b
if(f!=null)h.deleteBuffer(A.l(f.a))}m.b.az(k)}s.a0(0)
r.a0(0)
q.a0(0)
p.am()
e.x=!0},
$inR:1}
A.j0.prototype={}
A.fS.prototype={$iaK:1,
gL(){return this.a},
gl(){return this.b},
gaC(){return this.c}}
A.jE.prototype={
$1(a){var s=this.a.w.a.es(a),r=s.b!=null,q=r?s.d:s.e
return new A.dl(s.c,r,q,s.f)},
$S:34}
A.jF.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.p(0,a))return this.b.x.gn().cv(a)
if(b!=null&&s.p(0,b))return this.b.x.gn().cv(b)
throw A.c(A.k("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:35}
A.jD.prototype={
$0(){return this.a.$1("shadowMap")},
$S:2}
A.jw.prototype={
$0(){return null},
$S:37}
A.jx.prototype={
$0(){var s,r=this.a.at
if(r==null)return B.a3
s=r.b
return A.pK(s.k1,3,r.a.d,null)},
$S:38}
A.jC.prototype={
$0(){return this.a.$1("sceneDepth")},
$S:2}
A.jr.prototype={
$0(){return this.a.at.a},
$S:39}
A.jt.prototype={
$0(){return this.a.$2$fallback("ssaoRaw","sceneColor")},
$S:2}
A.js.prototype={
$0(){return this.a.$2$fallback("ssaoBlurred","sceneColor")},
$S:2}
A.jB.prototype={
$0(){var s=this.b.d>1?"sceneColor#1":"sceneColor"
return this.a.$1(s)},
$S:2}
A.jp.prototype={
$0(){return this.a.$2$fallback("bloomBlurH","sceneColor")},
$S:2}
A.jq.prototype={
$0(){return this.a.$2$fallback("bloomBlurV","sceneColor")},
$S:2}
A.jy.prototype={
$0(){return this.a.$2$fallback("dofBlurH","sceneColor")},
$S:2}
A.jz.prototype={
$0(){return this.a.$2$fallback("dofBlurV","sceneColor")},
$S:2}
A.jA.prototype={
$0(){var s=this.a.w.c.d
s===$&&A.aF()
return s},
$S:2}
A.jv.prototype={
$0(){return this.a.$2$fallback("vhsOutput","sceneColor")},
$S:2}
A.ju.prototype={
$0(){return this.a.at.w},
$S:40}
A.jG.prototype={
$0(){return this.a},
$S:41}
A.jH.prototype={
$0(){return null},
$S:42}
A.jg.prototype={}
A.fG.prototype={$inO:1}
A.fA.prototype={$in4:1}
A.f4.prototype={
gv(){var s=this.w
return s==null?A.m(A.k("renderer is not initialized")):s},
ec(a,b){var s,r,q,p,o,n,m,l=this
if(l.e!==B.a7)throw A.c(A.k("renderer can only be initialized once"))
a.A()
b.A()
s=l.a
if(s.b===B.T)throw A.c(A.k("renderer device is context lost"))
l.e=B.dz
try{r=v.G
s.aF(A.d(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.aF(A.d(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.aF(A.d(r.WebGL2RenderingContext.MAX_SAMPLES))
s.aF(A.d(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.aF(A.d(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
q=s.r
if(q.p(0,"EXT_texture_filter_anisotropic"))s.c3(34047)
p=q.p(0,"EXT_disjoint_timer_query_webgl2")
s.w=p
q.p(0,"EXT_color_buffer_float")
q.p(0,"EXT_color_buffer_half_float")
q.p(0,"WEBGL_lose_context")
q=s.a
A.cE(q.getParameter(A.d(r.WebGL2RenderingContext.RENDERER)))
A.cE(q.getParameter(A.d(r.WebGL2RenderingContext.VENDOR)))
l.r=new A.iq(p)
r=l.b
o=A.hW(a)
q=r.a
if(q.a!=null)A.m(A.k("configuration state is already initialized"))
a.A()
q.a=a
A.hW(a)
q.d=1
r.b.cr(o)
r=A.ni()
l.w=new A.f1(A.nk(s),r,A.nX(s),A.at(t.cA),A.at(t.eL),A.at(t.aj))
r=new A.f2()
q=new A.hz(s,r)
o=A.hW(a)
n=q.bY(o,a)
r.cr(o)
q.c=new A.eX(new A.ib(o),n)
l.x=q
l.y=new A.il(s,A.ax(t.N,t.dN))
l.as=a
A.mh(l)
l.e=B.a8}catch(m){s=l.y
if(s!=null){r=s.b
s.df(new A.aS(r,A.v(r).h("aS<2>")))
r.a0(0)}s=l.x
if(s!=null)s.am()
s=l.w
if(s!=null)s.am()
l.w=null
l.e=B.a7
throw m}s=new A.Y($.R,t.cd)
s.b5(null)
return s},
dM(a,b){var s,r,q,p,o=this
o.du()
o.aQ()
r=B.a.p(o.d,a)
if(!r)throw A.c(A.j("world was not created by this renderer",null))
if(o.at!=null)throw A.c(A.k("renderer.beginFrame called twice without end/abort"))
b.a.A()
b.b.A()
b.c.A()
r=b.w
if(!isFinite(r))A.m(A.j("FrameInput.timeSeconds must be finite: "+A.p(r),null))
o.at=b
o.ax=a
q=o.c
if(q.b===B.M)A.m(A.k("FrameQueue.beginFrame called twice without end/abort"))
q.b=B.M
q.c=0
B.a.a0(q.a)
s=q
try{r=o.r
if((r==null?A.m(A.k("renderer is not initialized")):r).z)o.b$=o.a.dN()
return s}catch(p){if(q.b!==B.M)A.m(A.k("FrameQueue.abortFrame called without an active frame"))
q.c=0
q.b=B.by
o.bP()
o.ax=o.at=null
throw p}},
e4(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
d.aQ()
s=d.at
r=d.ax
if(s==null||r==null)throw A.c(A.k("renderer.endFrame called without an active frame"))
m=d.c
if(m.b!==B.M)A.m(A.k("FrameQueue.endFrame called without an active frame"))
l=m.a
k=A.iG(l,0,A.bZ(m.c,"count",t.S),A.H(l).c).cC(0,!1)
m.b=B.bx
q=k
try{p=A.oI(d,r,s,q)
o=p.a.cL()
m=o.gaI()
l=A.v(m)
n=new A.d6(new A.a5(m,l.h("w(n.E)").a(new A.iB()),l.h("a5<n.E>")),l.h("X(n.E)").a(new A.iC()),l.h("d6<n.E,X>")).bu(0,B.bv,new A.iD(),t.o)
l=s.e
m=n.a
j=n.b
i=p.c
h=n.d
p.toString
g=d.w
f=g.a.gaM()
g=g.c.gaM()
e=d.w
e.a.gaM()
e.c.gaM()
d.w.toString
return new A.hv(l,m,j,i,h,f+g)}finally{d.dn(s.e)
d.ax=d.at=null}},
du(){var s,r,q,p=this
if(p.e!==B.a9)return
if(p.a.b===B.T)throw A.c(A.k("renderer context remains lost"))
s=p.w
if(s.x)A.m(A.k("resource library is disposed"))
s.a.bD()
s.c.bD()
s=p.x
s.toString
r=p.as
r.toString
if(s.e)A.m(A.k("GPU resource adapter is disposed"))
q=s.c
if(q==null)A.m(A.k("GPU resource adapter is not initialized"))
s.c=new A.eX(q.a,s.bY(A.hW(r),r))
s=p.y
s.c=null
s.b.a0(0)
A.mh(p)
p.e=B.a8},
aQ(){var s=this,r=s.e
if(r!==B.a8)throw A.c(A.k("renderer is not ready: "+r.b))
if(s.a.b===B.T){s.dh()
s.e=B.a9
throw A.c(A.k("renderer context lost"))}},
$inT:1}
A.iB.prototype={
$1(a){t.ao.a(a)
return A.pO(a.a.toLowerCase(),"world",0)},
$S:43}
A.iC.prototype={
$1(a){return t.ao.a(a).b},
$S:44}
A.iD.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return new A.X(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:45}
A.fF.prototype={}
A.jc.prototype={
dn(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.h)A.m(A.k(u.k))
r=s.cf(o)
if(r.b)A.m(A.k("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.a.j(p.a$,new A.fF(o))}catch(q){p.bb(o)}},
bP(){var s=this.b$
this.b$=null
if(s!=null)this.bb(s)},
dh(){var s,r,q
this.bP()
s=this.a$
r=J.ls(s.slice(0),A.H(s).c)
B.a.a0(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.A)(r),++q)this.bb(r[q].b)},
bb(a){var s,r
try{s=this.a
s.a.deleteQuery(s.cf(a).a)}catch(r){}}}
A.fL.prototype={}
A.f6.prototype={
B(){return"ShadowCasterLod."+this.b}}
A.au.prototype={
O(a,b){var s,r=this
t.fy.a(b)
s=B.d.O(r.a.a,b.a.a)
if(s!==0)return s
s=B.d.O(r.b.a,b.b.a)
if(s!==0)return s
s=B.d.O(r.c.a,b.c.a)
if(s!==0)return s
return B.d.O(r.d,b.d)},
$iam:1}
A.as.prototype={
O(a,b){var s
t.g0.a(b)
s=B.c.O(b.a,this.a)
if(s!==0)return s
return B.d.O(this.b,b.b)},
$iam:1}
A.a_.prototype={}
A.kl.prototype={
$2(a,b){var s=t.k
return s.a(a).a.O(0,s.a(b).a)},
$S:46}
A.km.prototype={
$1(a){return t.k.a(a).b},
$S:71}
A.kj.prototype={
$2(a,b){var s=t.d
return s.a(a).a.O(0,s.a(b).a)},
$S:48}
A.kk.prototype={
$1(a){return t.d.a(a).b},
$S:49}
A.hh.prototype={}
A.hg.prototype={}
A.ic.prototype={
$6(a,b,c,d,e,f){var s=this.a,r=s.a.length/18|0,q=this.b
s.G(a,e,f,new A.D(0,0).m(0,q))
s.G(b,e,f,new A.D(1,0).m(0,q))
s.G(c,e,f,new A.D(1,1).m(0,q))
s.G(d,e,f,new A.D(0,1).m(0,q))
q=r+2
B.a.F(s.b,A.b([r,r+1,q,r,q,r+3],t.t))},
$S:14}
A.ie.prototype={
$1(a){return t.b.a(a).gD()},
$S:10}
A.ig.prototype={
$2(a,b){var s,r,q,p,o,n=(Math.min(a,b)<<16|Math.max(a,b))>>>0,m=this.a,l=m.t(0,n)
if(l!=null)return l
s=this.b
r=s.length
if(!(a>=0&&a<r))return A.h(s,a)
q=s[a]
if(!(b>=0&&b<r))return A.h(s,b)
p=q.H(0,s[b]).m(0,0.5).gD()
o=s.length
B.a.j(s,p)
m.E(0,n,o)
return o},
$S:52}
A.id.prototype={
$1(a){return t.b.a(a).gD().m(0,this.a)},
$S:10}
A.ij.prototype={
$6(a,b,c,d,e,f){var s,r=this.a,q=r.a.length/18|0
r.G(a,e,f,B.b2)
r.G(b,e,f,B.b3)
r.G(c,e,f,B.ew)
r.G(d,e,f,B.ev)
s=q+2
B.a.F(r.b,A.b([q,q+1,s,q,s,q+3],t.t))},
$S:14}
A.ii.prototype={
$5(b3,b4,b5,b6,b7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2
for(s=this.a,r=b5.a,q=b5.b,p=b5.c,o=b6.a,n=b6.b,m=b6.c,l=this.b,k=b3.a,j=b3.b,i=b3.c,h=b4.a,g=b4.b,f=b4.c,e=this.c,d=e.a,c=e.b,b=t.t,a=0;a<s;){a0=a/s;++a
a1=a/s
a2=a0*1.5707963267948966
a3=a1*1.5707963267948966
a4=Math.cos(a2)
a5=Math.sin(a2)
a6=new A.a(r*a4+o*a5,q*a4+n*a5,p*a4+m*a5).gD()
a5=Math.cos(a3)
a4=Math.sin(a3)
a7=new A.a(r*a5+o*a4,q*a5+n*a4,p*a5+m*a4).gD()
a4=a6.a*l
a5=a6.b*l
a8=a6.c*l
a9=a7.a*l
b0=a7.b*l
b1=a7.c*l
b2=d.length/18|0
e.G(new A.a(k+a4,j+a5,i+a8),a6,b7,new A.D(0,a0))
e.G(new A.a(h+a4,g+a5,f+a8),a6,b7,new A.D(1,a0))
e.G(new A.a(h+a9,g+b0,f+b1),a7,b7,new A.D(1,a1))
e.G(new A.a(k+a9,j+b0,i+b1),a7,b7,new A.D(0,a1))
a1=b2+2
B.a.F(c,A.b([b2,b2+1,a1,b2,a1,b2+3],b))}},
$S:53}
A.aC.prototype={
G(a,b,c,d){B.a.F(this.a,A.b([a.a,a.b,a.c,b.a,b.b,b.c,c.a,c.b,c.c,1,1,1,1,0,1,d.a,d.b,0],t.n))},
a7(a){var s=new A.bs(B.bo,new Float32Array(A.t(this.a)),new Uint16Array(A.t(this.b)),a)
s.A()
return s}}
A.ik.prototype={
$2(a,b){var s=this.a,r=B.d.K(a+s,s),q=this.b,p=this.c
s=B.d.K(b+q,q)*s+r
if(!(s>=0&&s<65536))return A.h(p,s)
return p[s]/255},
$S:54}
A.ak.prototype={
gal(){var s,r,q,p=this.a,o=p.a,n=p.b
p=p.c
s=this.b
r=s.a
q=s.b
s=s.c
return A.b([new A.a(o,n,p),new A.a(r,n,p),new A.a(o,q,p),new A.a(r,q,p),new A.a(o,n,s),new A.a(r,n,s),new A.a(o,q,s),new A.a(r,q,s)],t.G)},
i(a){return"Aabb("+this.a.i(0)+", "+this.b.i(0)+")"}}
A.j1.prototype={}
A.bM.prototype={}
A.cV.prototype={
B(){return"FrustumTest."+this.b}}
A.hw.prototype={
eJ(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
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
if(h*f+e*c+i*a+a0<0)return B.av
g=g?o:r
f=d?m:p
d=b?n:q
if(h*g+e*f+i*d+a0<0)l=!0}return l?B.bz:B.bA}}
A.hx.prototype={
$4(a,b,c,d){var s=new A.a(a,b,c),r=new A.bM(s,d),q=Math.sqrt(s.ga1())
return q<1e-9?r:new A.bM(s.m(0,1/q),d/q)},
$S:55}
A.bc.prototype={
m(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=new Float32Array(16)
for(s=this.a,r=s.length,q=b.a,p=q.length,o=0;o<4;++o)for(n=o*4,m=0;m<4;++m){for(l=0,k=0;k<4;++k){j=k*4+m
if(!(j<r))return A.h(s,j)
j=s[j]
i=n+k
if(!(i<p))return A.h(q,i)
l+=j*q[i]}j=n+m
if(!(j<16))return A.h(h,j)
h[j]=l}return new A.bc(h)},
b3(a){var s,r,q,p,o,n,m,l,k,j,i,h
t.b.a(a)
s=a.a
r=this.a
q=r.length
if(0>=q)return A.h(r,0)
p=r[0]
o=a.b
if(4>=q)return A.h(r,4)
n=r[4]
m=a.c
if(8>=q)return A.h(r,8)
l=r[8]
if(12>=q)return A.h(r,12)
k=s*p+o*n+m*l+r[12]
l=r[1]
n=r[5]
p=r[9]
if(13>=q)return A.h(r,13)
j=s*l+o*n+m*p+r[13]
p=r[2]
n=r[6]
l=r[10]
if(14>=q)return A.h(r,14)
i=s*p+o*n+m*l+r[14]
l=r[3]
n=r[7]
p=r[11]
if(15>=q)return A.h(r,15)
h=s*l+o*n+m*p+r[15]
return h===0||h===1?new A.a(k,j,i):new A.a(k/h,j/h,i/h)},
bB(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this.a,d=e.length
if(0>=d)return A.h(e,0)
s=e[0]
if(5>=d)return A.h(e,5)
r=e[5]
if(10>=d)return A.h(e,10)
d=e[10]
q=e[9]
p=e[6]
o=r*d-q*p
n=e[4]
m=e[1]
l=e[2]
k=s*o-n*(m*d-q*l)+e[8]*(m*p-r*l)
if(!isFinite(k)||Math.abs(k)<1e-12)A.m(A.k("Mat4.inverse3x3: singular upper-left 3x3 (det="+A.p(k)+")"))
j=1/k
i=new Float32Array(16)
i[0]=o*j
i[1]=(e[8]*e[6]-e[4]*e[10])*j
i[2]=(e[4]*e[9]-e[8]*e[5])*j
i[4]=(e[9]*e[2]-e[1]*e[10])*j
i[5]=(e[0]*e[10]-e[8]*e[2])*j
i[6]=(e[8]*e[1]-e[0]*e[9])*j
i[8]=(e[1]*e[6]-e[5]*e[2])*j
i[9]=(e[4]*e[2]-e[0]*e[6])*j
i[10]=(e[0]*e[5]-e[4]*e[1])*j
i[15]=1
h=new Float32Array(16)
for(g=0;g<3;++g)for(e=g*4,f=0;f<3;++f){d=e+f
s=f*4+g
if(!(s<16))return A.h(i,s)
s=i[s]
if(!(d<16))return A.h(h,d)
h[d]=s}if(15>=16)return A.h(h,15)
h[15]=1
return new A.bc(h)},
bz(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=J.ks(4,t.gN)
for(s=t.n,r=this.a,q=r.length,p=0;p<4;++p){if(!(p<q))return A.h(r,p)
o=r[p]
n=4+p
if(!(n<q))return A.h(r,n)
n=r[n]
m=8+p
if(!(m<q))return A.h(r,m)
m=r[m]
l=12+p
if(!(l<q))return A.h(r,l)
l=r[l]
k=p===0?1:0
j=p===1?1:0
i=p===2?1:0
a1[p]=new Float64Array(A.t(A.b([o,n,m,l,k,j,i,p===3?1:0],s)))}for(h=0;h<4;h=p){s=a1[h]
if(!(h<s.length))return A.h(s,h)
g=Math.abs(s[h])
for(p=h+1,f=p,e=h;f<4;++f){r=a1[f]
if(!(h<r.length))return A.h(r,h)
d=Math.abs(r[h])
if(d>g){g=d
e=f}}if(!isFinite(g)||g<1e-12)throw A.c(A.k("Mat4.inverse: singular matrix"))
if(e!==h){if(!(e>=0&&e<4))return A.h(a1,e)
a1[h]=a1[e]
a1[e]=s}s=a1[h]
if(!(h<s.length))return A.h(s,h)
c=s[h]
for(b=0;b<8;++b){if(!(b<s.length))return A.h(s,b)
r=s[b]
s.$flags&2&&A.bD(s)
s[b]=r/c}for(f=0;f<4;++f){if(f===h)continue
s=a1[f]
if(!(h<s.length))return A.h(s,h)
a=s[h]
if(a===0)continue
for(b=0;b<8;++b){if(!(b<s.length))return A.h(s,b)
r=s[b]
q=a1[h]
if(!(b<q.length))return A.h(q,b)
q=q[b]
s.$flags&2&&A.bD(s)
s[b]=r-a*q}}}a0=new Float32Array(16)
for(p=0;p<4;++p)for(h=0;h<4;++h){s=h*4+p
r=a1[p]
q=4+h
if(!(q<r.length))return A.h(r,q)
q=r[q]
if(!(s<16))return A.h(a0,s)
a0[s]=q}return new A.bc(a0)},
gI(a){return B.a5.aZ(this.a,new A.hK())},
i(a){return"Mat4("+A.p(this.a)+")"}}
A.hK.prototype={
$1(a){return isFinite(A.h0(a))},
$S:13}
A.cn.prototype={
m(a,b){var s=this,r=s.d,q=b.a,p=s.a,o=b.d,n=s.b,m=b.c,l=s.c,k=b.b
return new A.cn(r*q+p*o+n*m-l*k,r*k-p*m+n*o+l*q,r*m+p*k-n*q+l*o,r*o-p*q-n*k-l*m)},
bE(a){var s=this,r=new A.a(s.a,s.b,s.c),q=r.a8(a),p=r.a8(q)
return a.H(0,q.m(0,2*s.d)).H(0,p.m(0,2))},
i(a){var s=this
return"Quat("+A.p(s.a)+", "+A.p(s.b)+", "+A.p(s.c)+", "+A.p(s.d)+")"}}
A.io.prototype={
ei(a){var s,r,q,p,o,n,m,l,k=null,j=this.b,i=j.a
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
i(a){return"Ray(origin: "+this.a.i(0)+", direction: "+this.b.i(0)+")"}}
A.ip.prototype={
i(a){var s=this,r=s.f,q=r!=null?", instance: #"+A.p(r):""
return'RaycastHit(node: "'+s.a.a+'"'+q+", distance: "+B.c.a9(s.d,2)+", point: "+s.b.i(0)+")"}}
A.ag.prototype={
A(){var s=this.a
if(!s.gI(0))throw A.c(A.j("Transform.translation must be finite: "+s.i(0),null))
s=this.b
if(!(isFinite(s.a)&&isFinite(s.b)&&isFinite(s.c)&&isFinite(s.d)))throw A.c(A.j("Transform.rotation must be finite: "+s.i(0),null))
s=this.c
if(!isFinite(s)||s<=0)throw A.c(A.j("Transform.scale must be finite and positive: "+A.p(s),null))},
a5(){var s,r,q,p,o,n,m,l,k,j,i,h=this.b,g=h.a,f=g*g,e=h.b,d=e*e,c=h.c,b=c*c,a=g*e,a0=g*c,a1=e*c
h=h.d
s=h*g
r=h*e
q=h*c
c=t.n
h=A.ly(A.b([1-2*(d+b),2*(a+q),2*(a0-r),0,2*(a-q),1-2*(f+b),2*(a1+s),0,2*(a0+r),2*(a1-s),1-2*(f+d),0,0,0,0,1],c)).a
e=h.length
if(0>=e)return A.h(h,0)
g=h[0]
p=this.c
if(1>=e)return A.h(h,1)
o=h[1]
if(2>=e)return A.h(h,2)
n=h[2]
if(4>=e)return A.h(h,4)
m=h[4]
if(5>=e)return A.h(h,5)
l=h[5]
if(6>=e)return A.h(h,6)
k=h[6]
if(8>=e)return A.h(h,8)
j=h[8]
if(9>=e)return A.h(h,9)
i=h[9]
if(10>=e)return A.h(h,10)
e=this.a
return A.ly(A.b([g*p,o*p,n*p,0,m*p,l*p,k*p,0,j*p,i*p,h[10]*p,0,e.a,e.b,e.c,1],c))},
m(a,b){var s,r,q,p,o=this.b,n=this.c,m=this.a.H(0,o.bE(b.a.m(0,n)))
o=o.m(0,b.b)
s=o.a
r=o.b
q=o.c
o=o.d
p=Math.sqrt(s*s+r*r+q*q+o*o)
o=p<1e-9?B.A:new A.cn(s/p,r/p,q/p,o/p)
return new A.ag(m,o,n*b.c)},
i(a){return"Transform("+this.a.i(0)+", "+this.b.i(0)+", scale="+A.p(this.c)+")"}}
A.D.prototype={
m(a,b){return new A.D(this.a*b,this.b*b)},
gu(a){var s=this.a,r=this.b
return Math.sqrt(s*s+r*r)},
a3(a,b){if(b==null)return!1
return b instanceof A.D&&this.a===b.a&&this.b===b.b},
gP(a){return A.bL(this.a,this.b,B.k,B.k,B.k,B.k)},
i(a){return"Vec2("+A.p(this.a)+", "+A.p(this.b)+")"}}
A.a.prototype={
H(a,b){return new A.a(this.a+b.a,this.b+b.b,this.c+b.c)},
a6(a,b){return new A.a(this.a-b.a,this.b-b.b,this.c-b.c)},
m(a,b){return new A.a(this.a*b,this.b*b,this.c*b)},
bn(a){return this.a*a.a+this.b*a.b+this.c*a.c},
a8(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.a(s*r-q*p,q*o-n*r,n*p-s*o)},
ga1(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gu(a){return Math.sqrt(this.ga1())},
gI(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gD(){var s=this,r=Math.sqrt(s.ga1())
return r<1e-9?B.r:new A.a(s.a/r,s.b/r,s.c/r)},
a3(a,b){if(b==null)return!1
return b instanceof A.a&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gP(a){return A.bL(this.a,this.b,this.c,B.k,B.k,B.k)},
i(a){return"Vec3("+A.p(this.a)+", "+A.p(this.b)+", "+A.p(this.c)+")"}}
A.e6.prototype={
B(){return"AtmosphericParticleAnchor."+this.b}}
A.c6.prototype={}
A.e7.prototype={
A(){var s,r,q,p,o,n,m,l=this,k=null
if(l.a.a<0||l.b.a<0)throw A.c(A.j("AtmosphericParticleField requires live resources",k))
s=l.e
r=A.b([new A.E("origin",l.d),new A.E("halfExtents",s),new A.E("initialVelocity",l.f),new A.E("acceleration",l.r)],t.be)
r.push(new A.E("terminalVelocity",l.w))
q=r.length
p=0
for(;p<q;++p){o=r[p]
n=o.a
m=o.b
if(!(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)))throw A.c(A.j("AtmosphericParticleField."+n+" must be finite",k))}if(s.a<0||s.b<0||s.c<0)throw A.c(A.j("AtmosphericParticleField.halfExtents must be >= 0",k))
s=l.y
if(!isFinite(s)||s<=0)throw A.c(A.j("AtmosphericParticleField.lifetimeSeconds must be finite and > 0",k))
s=l.x
if(!isFinite(s)||s<0)throw A.c(A.j("AtmosphericParticleField.dragCoefficient must be finite and >= 0",k))
if(s<=0)throw A.c(A.j("AtmosphericParticleField terminalVelocity requires dragCoefficient > 0",k))
s=l.as
if(!isFinite(s)||s<=0)throw A.c(A.j("AtmosphericParticleField.particleScale must be finite and > 0",k))},
cK(a,b){var s,r,q,p,o,n=this,m=null
n.A()
s=n.z
if(b>=s)throw A.c(A.aU(b,0,s-1,"particleIndex",m))
r=n.y
q=B.c.K(a.w+n.aU(b,0)*r,r)
switch(n.c.a){case 0:s=B.r
break
case 1:s=a.a.d
break
default:s=m}p=n.e
o=s.H(0,n.d).H(0,new A.a((n.aU(b,1)*2-1)*p.a,(n.aU(b,2)*2-1)*p.b,(n.aU(b,3)*2-1)*p.c))
p=o.H(0,n.di(q))
s=n.dH(q)
if(!isFinite(q)||q<0)A.m(A.j("atmospheric particle age must be finite and >= 0",m))
if(!o.gI(0)||!p.gI(0)||!s.gI(0))A.m(A.j("atmospheric particle kinematics must be finite",m))
return new A.c6(q,o,p,s)},
cP(a,b){return this.cQ(a,b,new A.h9())},
cQ(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=this
t.d6.a(c)
g.A()
for(s=g.z,r=a.a,q=g.as,p=g.ay,o=g.CW,n=g.a,m=g.b,l=0,k=0;k<s;++k){j=g.cK(b,k)
if(!c.$1(j))continue
i=new A.ag(j.c,B.A,q)
h=new A.be(n,m,i,-1,B.S,p,!1,o,null)
if(a.b!==B.M)A.m(A.k("FrameQueue.submit called outside an active frame"))
i.A()
i=a.c
if(i<r.length)B.a.E(r,i,h)
else B.a.j(r,h);++a.c;++l}return l},
dH(a){var s=this.w,r=Math.exp(-this.x*a)
return s.H(0,this.f.a6(0,s).m(0,r))},
di(a){var s=this.w,r=this.x,q=Math.exp(-r*a)
return s.m(0,a).H(0,this.f.a6(0,s).m(0,(1-q)/r))},
aU(a,b){return(((this.Q^a*73244475^b*668265261)&2147483647)*1103515245+12345&2147483647)/2147483647}}
A.h9.prototype={
$1(a){return!0},
$S:56}
A.fr.prototype={
B(){return"_BloomBlurAxis."+this.b}}
A.cJ.prototype={
gL(){return this.f},
X(a,b){B.a.j(a.a,new A.J(this.f,B.z,A.b([new A.o(this.x,B.e),new A.o(this.y,B.i)],t.C),!1))},
W(a){var s=this,r=s.a.Y(new A.a7(s.e,s.b,s.c,B.t,B.aJ,B.aG)),q=A.aL(s.d),p=t.n,o=s.r===B.b9?new Float32Array(A.t(A.b([1/s.Q,0],p))):new Float32Array(A.t(A.b([0,1/s.as],p)))
p=s.y
return A.b([new A.fs(new A.a2(s.f,A.b([new A.o(s.x,B.e),new A.o(p,B.i)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iF:1}
A.fs.prototype={
T(a){var s,r,q,p,o=this
if(a.d.f.b<=0)return
s=a.b
r=s.a
A.ai(r,a.U(o.r).b)
A.a4(r,o.a.R())
A.aW(r,B.D,1,0,0,0)
A.ar(r,o.b.b)
q=t.j
p=o.d
if(o.e)A.o6(r,0,q.a(p.$0()))
else A.P(r,0,q.a(p.$0()))
A.e(r,"uSource",B.q)
A.e(r,"uTexelStep",new A.f(B.J,o.f))
A.a8(r,o.c)
s.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.e9.prototype={
gL(){return"bloomComposite"},
X(a,b){B.a.j(a.a,new A.J("bloomComposite",B.z,A.b([new A.o(this.f,B.e),new A.o(this.r,B.e),new A.o(this.w,B.i)],t.C),!1))},
W(a){var s=this,r="bloomComposite",q=s.a.Y(new A.a7(r,s.b,s.c,B.t,B.d_,B.cO)),p=A.aL(s.d),o=s.w,n=A.b([new A.o(s.f,B.e),new A.o(s.r,B.e),new A.o(o,B.i)],t.C)
return A.b([new A.ft(new A.a2(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iF:1}
A.ft.prototype={
T(a){var s,r,q=this,p=a.d.f.b
if(p<=0)return
s=a.b
r=s.a
A.ai(r,a.aB(q.f).b)
A.lV(r,1)
A.a4(r,B.au)
A.ar(r,q.b.b)
A.P(r,0,t.j.a(q.d.$0()))
A.e(r,"uBloom",B.q)
A.e(r,"uBloomStrength",new A.f(B.b,p))
A.a8(r,q.c)
s.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.ei.prototype={
gL(){return"depthPrepass"},
X(a,b){B.a.j(a.a,new A.J("depthPrepass",B.bJ,A.b([new A.o(this.w,B.i)],t.C),!1))},
W(a){var s=this,r="depthPrepass",q=s.a.Y(new A.a7(r,s.b,s.c,B.aI,B.aH,B.cy))
return A.b([new A.fv(new A.a2(r,A.b([new A.o(s.w,B.i)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iF:1}
A.fv.prototype={
T(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=u.k,b=a2.b,a=a2.d,a0=a.f,a1=b.a
A.ai(a1,a2.U("sceneDepth").b)
A.a4(a1,d.a.R())
A.aW(a1,B.Y,1,0,0,0)
A.ar(a1,d.b.b)
A.e(a1,"uVertexSnapGrid",new A.f(B.b,a0.ax))
A.e(a1,"uAlbedo",B.q)
for(s=a.a,r=s.length,a=a.c.c.a,q=d.c,p=a0.at,o=v.G,n=b.b,m=a1.a,l=0;l<s.length;s.length===r||(0,A.A)(s),++l){k=s[l]
j=k.a
i=j.gl()
A.e(a1,"uViewProjection",new A.f(B.n,new Float32Array(A.t(a))))
A.e(a1,"uModel",new A.f(B.n,new Float32Array(A.t(i.c.a5().a))))
A.ki(b,k,!1)
d.dg(b,j.gl().b,p)
h=q.$1(j.gl().a)
i=h.a
if(a1.b!==B.h)A.m(A.k(c))
m.bindVertexArray(A.l(i.a))
i=h.b
g=h.c
f=k.b.length
if(i){i=h.d
if(a1.b!==B.h)A.m(A.k(c))
e=A.d(o.WebGL2RenderingContext.TRIANGLES)
m.drawElementsInstanced.apply(m,[e,g,i?A.d(o.WebGL2RenderingContext.UNSIGNED_INT):A.d(o.WebGL2RenderingContext.UNSIGNED_SHORT),0,f])
n.aq(g,f)}else{if(a1.b!==B.h)A.m(A.k(c))
m.drawArraysInstanced(A.d(o.WebGL2RenderingContext.TRIANGLES),0,g,f)
n.aq(g,f)}}},
dg(a,b,c){var s,r=a.a
A.P(r,0,t.j.a(this.e.$1(this.d.$1(b).b)))
A.e(r,"uAlphaCutoff",new A.f(B.b,0))
A.e(r,"uAffineWarpStrength",new A.f(B.b,0))
s=this.a.R()
A.a4(r,s)},
$iB:1,
gl(){return this.a}}
A.fw.prototype={
B(){return"_DofBlurAxis."+this.b}}
A.cS.prototype={
gL(){return this.f},
X(a,b){B.a.j(a.a,new A.J(this.f,B.z,A.b([new A.o(this.w,B.e),new A.o(this.x,B.i)],t.C),!1))},
W(a){var s=this,r=s.a.Y(new A.a7(s.e,s.b,s.c,B.t,B.aJ,B.aG)),q=A.aL(s.d),p=t.n,o=s.r===B.ba?new Float32Array(A.t(A.b([1/s.z,0],p))):new Float32Array(A.t(A.b([0,1/s.Q],p)))
p=s.x
return A.b([new A.fx(new A.a2(s.f,A.b([new A.o(s.w,B.e),new A.o(p,B.i)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iF:1}
A.fx.prototype={
T(a){var s,r,q=this
if(a.d.f.d<=0)return
s=a.b
r=s.a
A.ai(r,a.U(q.f).b)
A.a4(r,q.a.R())
A.aW(r,B.D,1,0,0,0)
A.ar(r,q.b.b)
A.P(r,0,t.j.a(q.d.$0()))
A.e(r,"uSource",B.q)
A.e(r,"uTexelStep",new A.f(B.J,q.e))
A.a8(r,q.c)
s.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.ek.prototype={
gL(){return"dofComposite"},
X(a,b){var s=this
B.a.j(a.a,new A.J("dofComposite",B.z,A.b([new A.o(s.z,B.e),new A.o(s.Q,B.e),new A.o(s.as,B.e),new A.o(s.at,B.i)],t.C),!1))},
W(a){var s=this,r="dofComposite",q=s.a.Y(new A.a7(r,s.b,s.c,B.t,B.cY,B.cx)),p=A.aL(s.d)
return A.b([new A.fy(new A.a2(r,A.b([new A.o(s.z,B.e),new A.o(s.Q,B.e),new A.o(s.as,B.e),new A.o(s.at,B.i)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iF:1}
A.fy.prototype={
T(a){var s,r=this,q=a.U("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.ai(n,q.b)
A.a4(n,r.a.R())
A.ar(n,r.b.b)
s=t.j
A.P(n,0,s.a(r.d.$0()))
A.e(n,"uSharp",B.q)
A.P(n,1,s.a(r.e.$0()))
A.e(n,"uBlurred",B.K)
A.P(n,2,s.a(r.f.$0()))
A.e(n,"uSceneDepth",B.b1)
A.e(n,"uNear",new A.f(B.b,o.f))
A.e(n,"uFar",new A.f(B.b,o.r))
A.e(n,"uFocusDistance",new A.f(B.b,r.w))
A.e(n,"uFocusRange",new A.f(B.b,r.x))
A.e(n,"uStrength",new A.f(B.b,a.d.f.d))
A.a8(n,r.c)
p.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.ev.prototype={
gL(){return"grade"},
X(a,b){B.a.j(a.a,new A.J("grade",B.z,A.b([new A.o(this.r,B.e),new A.o(this.w,B.i)],t.C),!1))},
W(a){var s=this,r=s.a.Y(new A.a7("grade",s.b,s.c,B.t,B.cW,B.cP)),q=A.aL(s.d),p=s.r,o=s.w
return A.b([new A.fC(new A.a2("grade",A.b([new A.o(p,B.e),new A.o(o,B.i)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iF:1}
A.fC.prototype={
T(a){var s=this,r=a.U(s.f.a),q=a.b,p=q.a
A.ai(p,a.U(s.r.a).b)
A.a4(p,s.a.R())
A.ar(p,s.b.b)
A.P(p,0,r.b)
A.e(p,"uScene",B.q)
A.P(p,1,t.j.a(s.d.$0()))
A.e(p,"uLut",B.K)
A.e(p,"uLutSize",new A.f(B.b,s.e))
A.e(p,"uStrength",new A.f(B.b,a.d.f.as))
A.a8(p,s.c)
q.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.d8.prototype={
gL(){return"msaaResolve"},
X(a,b){B.a.j(a.a,new A.J("msaaResolve",B.bK,A.b([new A.o(this.b,B.e),new A.o(this.c,B.i)],t.C),!0))},
W(a){var s=this.b,r=this.c
return A.b([new A.fE(new A.a2("msaaResolve",A.b([new A.o(s,B.e),new A.o(r,B.i)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iF:1}
A.fE.prototype={
T(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.aB(this.c),j=a.aB(this.d),i=this.b
if(i.b!==B.h)A.m(A.k(u.k))
s=t.V
r=s.a(k.b.a)
q=s.a(j.b.a)
s=r.y
if(s<=1)A.m(A.j("WebGl2Device.resolveTarget: source must be multisampled (samples > 1), got "+s,null))
s=q.y
if(s>1)A.m(A.j("WebGl2Device.resolveTarget: destination must be single-sample, got samples="+s,null))
s=r.w
p=q.w
if(s!==p||r.x!==q.x)A.m(A.j("WebGl2Device.resolveTarget: source ("+s+"x"+r.x+") and destination ("+p+"x"+q.x+") must match",null))
o=r.r!=null||r.f!=null
n=q.r!=null||q.f!=null
i=i.a
m=v.G
i.bindFramebuffer(A.d(m.WebGL2RenderingContext.READ_FRAMEBUFFER),r.a)
i.bindFramebuffer(A.d(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),q.a)
if(r.c!=null||r.b!=null){if(o){i.readBuffer(A.d(m.WebGL2RenderingContext.COLOR_ATTACHMENT0))
i.drawBuffers(A.b([A.d(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.d(m.WebGL2RenderingContext.NONE)],t.n))}A.ac(i,l,[0,0,s,r.x,0,0,p,q.x,A.d(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.d(m.WebGL2RenderingContext.LINEAR)],t.H)}if(o&&n){i.readBuffer(A.d(m.WebGL2RenderingContext.COLOR_ATTACHMENT1))
i.drawBuffers(A.b([A.d(m.WebGL2RenderingContext.NONE),A.d(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
A.ac(i,l,[0,0,s,r.x,0,0,p,q.x,A.d(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.d(m.WebGL2RenderingContext.LINEAR)],t.H)}if(r.d!=null||r.e!=null)A.ac(i,l,[0,0,s,r.x,0,0,p,q.x,A.d(m.WebGL2RenderingContext.DEPTH_BUFFER_BIT),A.d(m.WebGL2RenderingContext.NEAREST)],t.H)
if(n)i.drawBuffers(A.b([A.d(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.d(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
i.bindFramebuffer(A.d(m.WebGL2RenderingContext.READ_FRAMEBUFFER),null)
i.bindFramebuffer(A.d(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),null)},
$iB:1,
gl(){return this.a}}
A.c9.prototype={}
A.eb.prototype={
U(a){var s=this.a.t(0,a)
if(s==null)throw A.c(A.k('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
aB(a){var s=a.a,r=this.a.t(0,s+"#"+a.f)
if(r!=null)return r
return this.U(s)},
$inN:1}
A.kz.prototype={}
A.dg.prototype={
gL(){return"present"},
X(a,b){B.a.j(a.a,new A.J("present",B.bL,A.b([new A.o(this.f,B.e)],t.C),!1))},
W(a){var s=this,r=s.a.Y(new A.a7("present",s.b,s.c,B.t,B.cZ,B.cJ)),q=A.aL(s.d),p=s.f
return A.b([new A.fH(new A.a2("present",A.b([new A.o(p,B.e)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iF:1}
A.fH.prototype={
T(a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=null,a1=a4.aB(a.d),a2=a4.b,a3=a2.a
A.ai(a3,a0)
A.a4(a3,a.a.R())
A.ar(a3,a.b.b)
A.a8(a3,a.c)
A.P(a3,0,a1.b)
s=a4.c
r=s!=null
if(r)A.P(a3,1,s)
q=a4.d
p=q.f
o=q.d
n=q.c
A.e(a3,"uExposure",new A.f(B.b,p.a))
A.e(a3,"uVignette",new A.f(B.b,p.e))
A.e(a3,"uGrain",new A.f(B.b,p.f))
A.e(a3,"uOutputEncoding",new A.f(B.b,a.e===B.Z?1:0))
A.e(a3,"uToneMap",new A.f(B.b,A.nl(p.fr)))
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
A.e(a3,"uClearColor",new A.f(B.j,new Float32Array(A.t(A.b([m.a,m.b,m.c],d)))))
A.e(a3,"uSkyHorizon",new A.f(B.j,new Float32Array(A.t(A.b([k.a,k.b,k.c],d)))))
A.e(a3,"uSkyZenith",new A.f(B.j,new Float32Array(A.t(A.b([j,i,h],d)))))
A.e(a3,"uSkyGround",new A.f(B.j,new Float32Array(A.t(A.b([g,f,e],d)))))
A.e(a3,"uSkyEnabled",new A.f(B.b,q?0:1))
j=q?a0:l.f
A.e(a3,"uSkyHorizonGlow",new A.f(B.b,j==null?0:j))
j=q?a0:l.r
A.e(a3,"uSkyStarDensity",new A.f(B.b,j==null?0:j))
A.e(a3,"uSkyTexture",B.K)
A.e(a3,"uSkyTextureEnabled",new A.f(B.b,!q&&r?1:0))
r=q?a0:l.w
A.e(a3,"uSkyRotation",new A.f(B.b,r==null?0:r))
r=q?a0:l.x
A.e(a3,"uSkyExposure",new A.f(B.b,r==null?1:r))
A.e(a3,"uSkyTextureSrgb",new A.f(B.b,(!q||a0)===!0?1:0))
A.e(a3,"uInverseProjection",new A.f(B.n,new Float32Array(A.t(n.gcs().a))))
c=n.y
if(c===$){b=n.a.bz()
n.y!==$&&A.l6()
n.y=b
c=b}A.e(a3,"uInverseView",new A.f(B.n,new Float32Array(A.t(c.a))))
r=n.d
A.e(a3,"uCameraPosition",new A.f(B.j,new Float32Array(A.t(A.b([r.a,r.b,r.c],d)))))
r=q?a0:l.z
A.e(a3,"uCloudCoverage",new A.f(B.b,r==null?0:r))
r=q?a0:l.Q
A.e(a3,"uCloudDensity",new A.f(B.b,r==null?0:r))
r=q?a0:l.as
A.e(a3,"uCloudBaseHeight",new A.f(B.b,r==null?650:r))
r=q?a0:l.at
A.e(a3,"uCloudThickness",new A.f(B.b,r==null?350:r))
r=q?a0:l.ax
A.e(a3,"uCloudScale",new A.f(B.b,r==null?0:r))
r=q?a0:l.ay
if(r==null)r=0
j=q?a0:l.ch
A.e(a3,"uCloudWind",new A.f(B.J,new Float32Array(A.t(A.b([r,j==null?0:j],d)))))
r=q?a0:l.CW
A.e(a3,"uCloudPhase",new A.f(B.b,r==null?0:r))
r=q?a0:l.cx
A.e(a3,"uCloudDetail",new A.f(B.b,r==null?0:r))
r=q?a0:l.cy
A.e(a3,"uCloudSilverLining",new A.f(B.b,r==null?0:r))
r=q?a0:l.db
A.e(a3,"uCloudSampleCount",new A.f(B.b,r==null?4:r))
r=o.go
q=r==null
j=q?a0:r.a.a
if(j==null)j=0
i=q?a0:r.a.b
if(i==null)i=1
h=q?a0:r.a.c
A.e(a3,"uCloudLightDirection",new A.f(B.j,new Float32Array(A.t(A.b([j,i,h==null?0:h],d)))))
j=q?a0:r.b.a
if(j==null)j=1
i=q?a0:r.b.b
if(i==null)i=1
h=q?a0:r.b.c
A.e(a3,"uCloudLightColor",new A.f(B.j,new Float32Array(A.t(A.b([j,i,h==null?1:h],d)))))
r=q?a0:r.c
A.e(a3,"uCloudLightIntensity",new A.f(B.b,r==null?0:r))
a2.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.f_.prototype={
gL(){return"ps1Quantize"},
X(a,b){B.a.j(a.a,new A.J("ps1Quantize",B.z,A.b([new A.o(this.e,B.e),new A.o(this.f,B.i)],t.C),!1))},
W(a){var s=this,r="ps1Quantize",q=s.a.Y(new A.a7(r,s.b,s.c,B.t,B.d0,B.cs)),p=A.aL(s.d),o=s.e,n=s.f
return A.b([new A.fI(new A.a2(r,A.b([new A.o(o,B.e),new A.o(n,B.i)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iF:1}
A.fI.prototype={
T(a){var s=this,r=a.U(s.d.a),q=a.b,p=a.d.f,o=q.a
A.ai(o,a.U(s.e.a).b)
A.a4(o,s.a.R())
A.ar(o,s.b.b)
A.P(o,0,r.b)
A.e(o,"uScene",B.q)
A.e(o,"uQuantizationBits",new A.f(B.b,p.ay))
A.e(o,"uDitherStrength",new A.f(B.b,p.Q))
A.a8(o,s.c)
q.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.bN.prototype={}
A.f7.prototype={
gL(){return"shadow"},
X(a,b){B.a.j(a.a,new A.J("shadowCaster",B.bI,A.b([new A.o(this.z,B.i)],t.C),!1))},
W(a){var s=this,r="shadowCaster",q=s.a.Y(new A.a7(r,s.b,s.c,B.aI,B.aH,B.cN))
return A.b([new A.fM(new A.a2(r,A.b([new A.o(s.z,B.i)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iF:1}
A.fM.prototype={
T(a){var s,r,q,p,o=this,n=a.U("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.ai(s,n.b)
A.a4(s,o.a.R())
A.aW(s,B.Y,1,0,0,0)
return}r=A.lL(l)
o.x.$1(r)
s=m.a
A.ai(s,n.b)
A.a4(s,o.a.R())
A.aW(s,B.Y,1,0,0,0)
A.ar(s,o.b.b)
A.e(s,"uAlbedo",B.q)
for(s=a.d.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.A)(s),++p)o.dj(m,s[p],l,r)},
c9(a,b){var s,r=a.a
A.P(r,0,t.j.a(this.e.$1(this.d.$1(b).b)))
A.e(r,"uAlphaCutoff",new A.f(B.b,0))
s=this.a.R()
A.a4(r,s)},
dj(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){if(!b.gl().r)return
s=a.a
A.e(s,"uUseInstances",B.am)
n.c6(a,b.gl().c,d)
n.c9(a,b.gl().b)
r=b.gl()
q=n.c.$1(r.a)
A.a8(s,q.a)
s=q.b
r=q.c
if(s)a.bp(r,q.d,0)
else a.Z(r,0)}else if(b instanceof A.b7){p=b.a
if(!p.gl().r)return
if(n.dE(b,c)===B.dW)return
n.c6(a,p.gl().c,d)
A.ki(a,b,!1)
n.c9(a,p.gl().b)
s=p.gl()
q=n.c.$1(s.a)
A.a8(a.a,q.a)
s=q.b
r=q.c
o=b.b.length
if(s)a.bq(r,q.d,o,0)
else a.bo(r,0,o)}else throw A.c(A.j("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.e3(b).i(0),null))},
dE(a,b){return B.dV},
c6(a,b,c){var s=a.a
A.e(s,"uModel",new A.f(B.n,new Float32Array(A.t(b.a5().a))))
A.e(s,"uLightViewProjection",new A.f(B.n,new Float32Array(A.t(c.a.a))))},
$iB:1,
gl(){return this.a}}
A.jL.prototype={
$1(a){return this.a.a=a},
$S:57}
A.jM.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:58}
A.f8.prototype={
gL(){return"shadowedWorld"},
X(a,b){var s=this,r=A.b([new A.o(s.db,B.e)],t.C)
if(s.ay)r.push(new A.o(s.dx,B.e))
r.push(new A.o(s.dy,B.i))
B.a.j(a.a,new A.J("shadowedWorld",B.az,r,!1))},
W(a){var s=this,r="shadowedWorld",q=s.a.Y(new A.a7(r,s.b,s.c,B.d1,B.cX,B.cq)),p=A.b([new A.o(s.db,B.e)],t.C)
if(s.ay)p.push(new A.o(s.dx,B.e))
p.push(new A.o(s.dy,B.i))
return A.b([new A.fN(new A.a2(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iF:1}
A.fN.prototype={
T(b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=null,a5=b3.U("sceneColor"),a6=b3.b,a7=b3.d,a8=a7.c,a9=a7.d,b0=a7.f,b1=a3.z.$0(),b2=a6.a
A.ai(b2,a5.b)
A.a4(b2,a3.a.R())
s=a9.a
A.aW(b2,B.at,1,s.c,s.b,s.a)
A.ar(b2,a3.b.b)
A.e(b2,"uAlbedo",B.q)
A.e(b2,"uNormalMap",B.er)
A.e(b2,"uOrmMap",B.es)
A.e(b2,"uEmissiveMap",B.et)
A.e(b2,"uLightmap",B.eu)
s=t.j
A.P(b2,1,s.a(a3.y.$0()))
A.e(b2,"uShadowMap",B.K)
r=a8.d
q=t.n
A.e(b2,"uCameraPosition",new A.f(B.j,new Float32Array(A.t(A.b([r.a,r.b,r.c],q)))))
A.e(b2,"uShadowMapTexelSize",new A.f(B.J,new Float32Array(A.t(A.b([1/a3.ch,1/a3.CW],q)))))
A.e(b2,"uShadowFilterRadius",new A.f(B.b,a9.at))
A.e(b2,"uShadowBias",new A.f(B.b,a9.db))
A.P(b2,2,s.a(a3.at.$0()))
A.e(b2,"uSsao",B.b1)
A.e(b2,"uVertexSnapGrid",new A.f(B.b,b0.ax))
A.e(b2,"uSceneColorSize",new A.f(B.J,new Float32Array(A.t(A.b([a3.ax,a3.ay],q)))))
A.e(b2,"uViewProjection",new A.f(B.n,new Float32Array(A.t(a8.c.a))))
A.e(b2,"uView",new A.f(B.n,new Float32Array(A.t(a8.a.a))))
A.e(b2,"uLightViewProjection",new A.f(B.n,new Float32Array(A.t(b1.a.a))))
s=a9.b
A.e(b2,"uFogColor",new A.f(B.j,new Float32Array(A.t(A.b([s.a,s.b,s.c],q)))))
A.e(b2,"uFogStart",new A.f(B.b,a9.c))
A.e(b2,"uFogEnd",new A.f(B.b,a9.d))
s=a9.e
A.e(b2,"uFogHeightFalloff",new A.f(B.b,s==null?0:s))
A.e(b2,"uFogDensity",new A.f(B.b,0))
p=a3.Q.$0()
s=A.b([],t.w)
r=a3.as.$0()
r=J.a6(r==null?B.a3:r)
o=p==null
while(r.k()){n=r.gn()
if(-1!==(o?a4:-1))s.push(n)}m=o?a4:B.f
if(m==null)m=B.f
l=o?a4:B.o
if(l==null)l=B.o
A.e(b2,"uLightPosition",new A.f(B.j,new Float32Array(A.t(A.b([m.a,m.b,m.c],q)))))
A.e(b2,"uLightDirection",new A.f(B.j,new Float32Array(A.t(A.b([l.a,l.b,l.c],q)))))
k=o?a4:B.N
if(k==null)k=B.E
A.e(b2,"uLightColor",new A.f(B.j,new Float32Array(A.t(A.b([k.a,k.b,k.c],q)))))
r=o?a4:1
A.e(b2,"uLightIntensity",new A.f(B.b,r==null?0:r))
A.e(b2,"uSpotEnabled",new A.f(B.b,!o?1:0))
j=a9.go
r=j==null
i=r?a4:j.a
if(i==null)i=B.f
h=r?a4:j.b
if(h==null)h=B.E
A.e(b2,"uDirectionalDirection",new A.f(B.j,new Float32Array(A.t(A.b([i.a,i.b,i.c],q)))))
A.e(b2,"uDirectionalColor",new A.f(B.j,new Float32Array(A.t(A.b([h.a,h.b,h.c],q)))))
r=r?a4:j.c
A.e(b2,"uDirectionalIntensity",new A.f(B.b,r==null?0:r))
for(r=a9.id,g=0;g<4;++g){n=r.length
if(g<n){if(!(g<n))return A.h(r,g)
f=r[g]}else f=a4
n=f==null
e=n?a4:f.b
if(e==null)e=B.r
d=n?a4:f.c
if(d==null)d=B.E
c=""+g
A.e(b2,"uPointPosition"+c,new A.f(B.j,new Float32Array(A.t(A.b([e.a,e.b,e.c],q)))))
A.e(b2,"uPointColor"+c,new A.f(B.j,new Float32Array(A.t(A.b([d.a,d.b,d.c],q)))))
b=n?a4:f.d
if(b==null)b=0
A.e(b2,"uPointIntensity"+c,new A.f(B.b,b))
n=n?a4:f.e
if(n==null)n=1
A.e(b2,"uPointRadius"+c,new A.f(B.b,n))}for(g=0;g<3;++g){r=s.length
if(g<r){if(!(g<r))return A.h(s,g)
f=s[g]}else f=a4
r=f==null
e=r?a4:B.f
if(e==null)e=B.r
a=r?a4:B.o
if(a==null)a=B.o
d=r?a4:B.N
if(d==null)d=B.E
n=""+g
A.e(b2,"uDirectSpotPosition"+n,new A.f(B.j,new Float32Array(A.t(A.b([e.a,e.b,e.c],q)))))
A.e(b2,"uDirectSpotDirection"+n,new A.f(B.j,new Float32Array(A.t(A.b([a.a,a.b,a.c],q)))))
A.e(b2,"uDirectSpotColor"+n,new A.f(B.j,new Float32Array(A.t(A.b([d.a,d.b,d.c],q)))))
c=r?a4:1
if(c==null)c=0
A.e(b2,"uDirectSpotIntensity"+n,new A.f(B.b,c))
c=r?a4:1
if(c==null)c=1
A.e(b2,"uDirectSpotRange"+n,new A.f(B.b,c))
c=r?a4:0.3
if(c==null)c=0.3
A.e(b2,"uDirectSpotInnerCos"+n,new A.f(B.b,Math.cos(c)))
c=r?a4:0.5
if(c==null)c=0.5
A.e(b2,"uDirectSpotOuterCos"+n,new A.f(B.b,Math.cos(c)))
r=r?0:1
A.e(b2,"uDirectSpotEnabled"+n,new A.f(B.b,r))}s=o?a4:1
A.e(b2,"uLightRange",new A.f(B.b,s==null?1:s))
s=o?a4:0.3
if(s==null)s=0.3
A.e(b2,"uLightInnerCos",new A.f(B.b,Math.cos(s)))
s=o?a4:0.5
if(s==null)s=0.5
A.e(b2,"uLightOuterCos",new A.f(B.b,Math.cos(s)))
a0=a9.fx
A.e(b2,"uAmbientColor",new A.f(B.j,new Float32Array(A.t(A.b([a0.a,a0.b,a0.c],q)))))
A.e(b2,"uAmbientIntensity",new A.f(B.b,a9.fy))
A.e(b2,"uAmbientLightScale",new A.f(B.b,a9.ax))
A.e(b2,"uDirectLightScale",new A.f(B.b,a9.ay))
s=a9.dx
A.e(b2,"uReflectionColor",new A.f(B.j,new Float32Array(A.t(A.b([s.a,s.b,s.c],q)))))
A.e(b2,"uReflectionIntensity",new A.f(B.b,a9.dy))
A.e(b2,"uReflectionConfidence",new A.f(B.b,a9.fr))
A.e(b2,"uRainWetness",new A.f(B.b,b0.w))
A.e(b2,"uSurfaceSnowCoverage",new A.f(B.b,b0.x))
A.e(b2,"uSurfaceDissolution",new A.f(B.b,b0.y))
s=a9.k3
a1=A.iG(s,0,A.bZ(4,"count",t.S),A.H(s).c).eK(0)
A.e(b2,"uThermalSourceCount",new A.f(B.b,a1.length))
for(g=0;g<4;++g){s=a1.length
if(g<s)if(!(g<s))return A.h(a1,g)
s=""+g
A.e(b2,"uThermalSourcePosition"+s,new A.f(B.j,new Float32Array(A.t(A.b([0,0,0],q)))))
A.e(b2,"uThermalSourceRadius"+s,new A.f(B.b,1))
A.e(b2,"uThermalSourceDissolution"+s,new A.f(B.b,0))}for(b2=a7.a,s=b2.length,r=b0.at,a2=0;a2<b2.length;b2.length===s||(0,A.A)(b2),++a2)a3.ca(a6,b2[a2],r,a9)
for(a7=a7.b,b2=a7.length,a2=0;a2<a7.length;a7.length===b2||(0,A.A)(a7),++a2)a3.ca(a6,a7[a2],r,a9)},
ca(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){s=a.a
A.e(s,"uUseInstances",B.am)
n.cb(a,b.gl().c)
n.c7(a,b.gl().b,b.gl().e,b.gl().f,c,b.gl().w,d)
r=n.c.$1(b.gl().a)
A.a8(s,r.a)
s=r.b
q=r.c
if(s)a.bp(q,r.d,0)
else a.Z(q,0)}else if(b instanceof A.b7){p=b.a
n.cb(a,p.gl().c)
A.ki(a,b,!0)
n.c7(a,p.gl().b,p.gl().e,p.gl().f,c,p.gl().w,d)
r=n.c.$1(p.gl().a)
A.a8(a.a,r.a)
s=r.b
q=r.c
o=b.b.length
if(s)a.bq(q,r.d,o,0)
else a.bo(q,0,o)}else throw A.c(A.j("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.e3(b).i(0),null))},
c7(a,b,c,d,e,f,g){var s=this,r=s.d.$1(b),q=t.j,p=a.a
A.P(p,0,q.a(s.e.$1(r.b)))
A.P(p,3,q.a(s.f.$1(r.x)))
A.P(p,4,q.a(s.r.$1(r.Q)))
A.P(p,5,q.a(s.w.$1(null)))
A.P(p,6,q.a(s.x.$1(null)))
A.e(p,"uAlphaCutoff",new A.f(B.b,0))
A.e(p,"uOpaqueCoverage",new A.f(B.b,c===B.S?0:1))
A.e(p,"uAffineWarpStrength",new A.f(B.b,0))
q=t.n
A.e(p,"uMaterialTint",new A.f(B.j,new Float32Array(A.t(A.b([r.d,r.e,r.f],q)))))
A.e(p,"uEmissiveStrength",new A.f(B.b,r.w))
A.e(p,"uUvScaleOffset",new A.f(B.eq,new Float32Array(A.t(A.b([r.db,r.dx,0,0],q)))))
A.e(p,"uNormalStrength",new A.f(B.b,r.z*g.ch))
A.e(p,"uRoughness",new A.f(B.b,r.at*g.CW))
A.e(p,"uMetallic",new A.f(B.b,r.ax*g.cx))
A.e(p,"uSpecularScale",new A.f(B.b,g.cy))
A.e(p,"uClearcoatStrength",new A.f(B.b,r.ch))
A.e(p,"uClearcoatRoughness",new A.f(B.b,r.CW))
A.e(p,"uOcclusionStrength",new A.f(B.b,1))
A.e(p,"uLightmapIntensity",new A.f(B.b,0))
A.e(p,"uReceivesShadow",new A.f(B.b,f?1:0))
A:{q=null
if(B.S===c){switch(d.a){case 0:q=B.bt
break
case 1:q=B.bs
break}break A}if(B.G===c||B.br===c){q=s.a.R()
break A}}A.a4(p,q)},
cb(a,b){var s=b.a5(),r=a.a
A.e(r,"uModel",new A.f(B.n,new Float32Array(A.t(s.a))))
A.e(r,"uNormalMatrix",new A.f(B.n,new Float32Array(A.t(s.bB().a))))},
$iB:1,
gl(){return this.a}}
A.fa.prototype={
gL(){return"ssaoOcclusion"},
X(a,b){B.a.j(a.a,new A.J("ssaoOcclusion",B.a1,A.b([new A.o(this.w,B.i)],t.C),!1))},
W(a){var s=this,r="ssaoOcclusion",q=s.a.Y(new A.a7(r,s.b,s.c,B.t,B.aK,B.cn)),p=A.aL(s.d)
return A.b([new A.fP(new A.a2(r,A.b([new A.o(s.w,B.i)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iF:1}
A.fP.prototype={
T(a){var s,r,q,p=this,o=a.b,n=a.d.f.c,m=o.a
A.ai(m,a.U("ssaoRaw").b)
A.a4(m,p.a.R())
if(n<=0){A.aW(m,B.D,1,1,1,1)
return}A.aW(m,B.D,1,0,0,0)
s=p.e.$0()
A.ar(m,p.b.b)
A.P(m,0,t.j.a(p.d.$0()))
A.e(m,"uSceneDepth",B.q)
A.e(m,"uNear",new A.f(B.b,s.f))
A.e(m,"uFar",new A.f(B.b,s.r))
r=s.b.a
q=r.length
if(0>=q)return A.h(r,0)
A.e(m,"uProjScaleX",new A.f(B.b,r[0]))
if(5>=q)return A.h(r,5)
A.e(m,"uProjScaleY",new A.f(B.b,r[5]))
A.e(m,"uRadius",new A.f(B.b,p.f))
A.e(m,"uStrength",new A.f(B.b,n))
A.a8(m,p.c)
o.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.f9.prototype={
gL(){return"ssaoBlur"},
X(a,b){B.a.j(a.a,new A.J("ssaoBlur",B.a1,A.b([new A.o(this.y,B.e),new A.o(this.z,B.i)],t.C),!1))},
W(a){var s=this,r="ssaoBlur",q=s.a.Y(new A.a7(r,s.b,s.c,B.t,B.cU,B.cQ)),p=A.aL(s.d)
return A.b([new A.fO(new A.a2(r,A.b([new A.o(s.y,B.e),new A.o(s.z,B.i)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iF:1}
A.fO.prototype={
T(a){var s,r,q=this,p=a.b,o=p.a
A.ai(o,a.U("ssaoBlurred").b)
A.a4(o,q.a.R())
if(a.d.f.c<=0){A.aW(o,B.D,1,1,1,1)
return}A.aW(o,B.D,1,0,0,0)
s=q.f.$0()
A.ar(o,q.b.b)
r=t.j
A.P(o,0,r.a(q.d.$0()))
A.e(o,"uSsaoRaw",B.q)
A.P(o,1,r.a(q.e.$0()))
A.e(o,"uSceneDepth",B.K)
A.e(o,"uTexelSize",new A.f(B.J,new Float32Array(A.t(A.b([1/q.r,1/q.w],t.n)))))
A.e(o,"uNear",new A.f(B.b,s.f))
A.e(o,"uFar",new A.f(B.b,s.r))
A.a8(o,q.c)
p.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.fk.prototype={
gL(){return"vhs"},
X(a,b){var s=this.w
a.b.j(0,s.a)
B.a.j(a.a,new A.J("vhs",B.z,A.b([new A.o(this.r,B.e),new A.o(s,B.B),new A.o(s,B.i)],t.C),!1))},
W(a){var s=this,r=s.a.Y(new A.a7("vhs",s.b,s.c,B.t,B.cV,B.ct)),q=A.aL(s.d),p=s.r,o=s.w
return A.b([new A.fU(new A.a2("vhs",A.b([new A.o(p,B.e),new A.o(o,B.B),new A.o(o,B.i)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iF:1}
A.fU.prototype={
T(a){var s=this,r=a.U(s.f.a),q=a.U(s.r.a),p=a.b,o=a.d.f,n=p.a
A.ai(n,q.b)
A.a4(n,s.a.R())
A.ar(n,s.b.b)
A.P(n,0,r.b)
A.e(n,"uScene",B.q)
A.P(n,1,t.j.a(s.d.$0()))
A.e(n,"uHistory",B.K)
A.e(n,"uTime",new A.f(B.b,s.e.$0()))
A.e(n,"uChromaWeight",new A.f(B.b,o.ch))
A.e(n,"uTrackingWeight",new A.f(B.b,o.CW))
A.e(n,"uNoiseWeight",new A.f(B.b,o.cx))
A.e(n,"uHeadSwitchWeight",new A.f(B.b,o.cy))
A.e(n,"uDropoutWeight",new A.f(B.b,o.db))
A.e(n,"uGhostWeight",new A.f(B.b,o.dx))
A.a8(n,s.c)
p.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.fl.prototype={
gL(){return"volumetricLight"},
X(a,b){var s=this,r=s.w,q=t.C,p=a.a
B.a.j(p,new A.J("volumetricLight",B.a1,A.b([new A.o(s.x,B.e),new A.o(r,B.i)],q),!1))
B.a.j(p,new A.J("volumetricComposite",B.z,A.b([new A.o(r,B.e),new A.o(s.y,B.e),new A.o(s.z,B.i)],q),!1))},
W(a){var s,r,q,p,o,n,m=this,l="volumetricLight",k="volumetricComposite",j=m.a,i=m.b,h=j.Y(new A.a7(l,i,m.c,B.t,B.aK,B.cv)),g=m.e,f=A.aL(g),e=m.Q
B.a.j(e,f)
s=m.w
r=t.C
q=A.b([new A.fW(new A.a2(l,A.b([new A.o(m.x,B.e),new A.o(s,B.i)],r),!1,!1,!1,!1),h,f,s.a,m.f,m.r)],t.u)
p=m.z
o=j.Y(new A.a7(k,i,m.d,B.t,B.d2,B.cR))
n=A.aL(g)
B.a.j(e,n)
B.a.j(q,new A.fV(new A.a2(k,A.b([new A.o(s,B.e),new A.o(m.y,B.e),new A.o(p,B.i)],r),!1,!1,!0,!1),o,n,s,p))
return q},
$iF:1}
A.fW.prototype={
T(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this,a1=a7.U(a0.d),a2=a7.b,a3=a0.f.$0(),a4=a7.d.d,a5=a4.go,a6=a2.a
A.ai(a6,a1.b)
A.a4(a6,a0.a.R())
A.aW(a6,B.D,1,0,0,0)
A.ar(a6,a0.b.b)
A.P(a6,0,t.j.a(a0.e.$0()))
A.e(a6,"uSceneDepth",B.q)
A.e(a6,"uNear",new A.f(B.b,a3.f))
A.e(a6,"uFar",new A.f(B.b,a3.r))
A.e(a6,"uViewProjection",new A.f(B.n,new Float32Array(A.t(a3.c.a))))
s=a3.a.a
A.e(a6,"uView",new A.f(B.n,new Float32Array(A.t(s))))
A.e(a6,"uInverseProjection",new A.f(B.n,new Float32Array(A.t(a3.gcs().a))))
r=a5==null
A.e(a6,"uShaftIntensity",new A.f(B.b,r?0:a5.c*0.15))
A.e(a6,"uFogDensity",new A.f(B.b,0))
A.e(a6,"uAnisotropy",new A.f(B.b,a4.y))
q=a4.r
p=t.n
A.e(a6,"uVolumetricAlbedo",new A.f(B.j,new Float32Array(A.t(A.b([q.a,q.b,q.c],p)))))
A.e(a6,"uVolumetricHeightFalloff",new A.f(B.b,a4.w))
A.e(a6,"uVolumetricDustDensity",new A.f(B.b,a4.x))
A.e(a6,"uVolumetricJitter",new A.f(B.b,a4.z))
A.e(a6,"uVolumetricIntensity",new A.f(B.b,a4.Q))
A.e(a6,"uVolumetricSampleCount",new A.f(B.b,a4.as))
if(r)o=B.f
else{q=a5.a.gD()
n=q.a
m=s.length
if(0>=m)return A.h(s,0)
l=s[0]
k=q.b
if(4>=m)return A.h(s,4)
j=s[4]
q=q.c
if(8>=m)return A.h(s,8)
i=s[8]
h=s[1]
g=s[5]
if(9>=m)return A.h(s,9)
f=s[9]
e=s[2]
d=s[6]
if(10>=m)return A.h(s,10)
o=new A.a(n*l+k*j+q*i,n*h+k*g+q*f,n*e+k*d+q*s[10]).gD()}c=r?null:a5.b
if(c==null)c=B.E
A.e(a6,"uLightDir",new A.f(B.j,new Float32Array(A.t(A.b([o.a,o.b,o.c],p)))))
A.e(a6,"uLightColor",new A.f(B.j,new Float32Array(A.t(A.b([c.a,c.b,c.c],p)))))
b=A.pL(4,a3.d,a4.k2)
A.e(a6,"uVolumetricSourceCount",new A.f(B.b,b.length))
for(a=0;a<4;++a){s=b.length
if(a<s)if(!(a<s))return A.h(b,a)
s=""+a
A.e(a6,"uSourcePosition"+s,new A.f(B.j,new Float32Array(A.t(A.b([0,0,0],p)))))
A.e(a6,"uSourceColor"+s,new A.f(B.j,new Float32Array(A.t(A.b([0,0,0],p)))))
A.e(a6,"uSourceIntensity"+s,new A.f(B.b,0))
A.e(a6,"uSourceReferenceDistance"+s,new A.f(B.b,1))
A.e(a6,"uSourceCutoffDistance"+s,new A.f(B.b,1))}A.a8(a6,a0.c)
a2.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.fV.prototype={
T(a){var s=this,r=a.aB(s.e),q=a.aB(s.d),p=a.b,o=p.a
A.ai(o,r.b)
A.lV(o,1)
A.a4(o,B.au)
A.ar(o,s.b.b)
A.P(o,0,q.b)
A.e(o,"uVolumetric",B.q)
A.e(o,"uVolumetricStrength",B.b0)
A.a8(o,s.c)
p.Z(3,0)},
$iB:1,
gl(){return this.a}}
A.dl.prototype={}
A.fo.prototype={
gL(){return"world"},
X(a,b){B.a.j(a.a,new A.J("worldOpaqueTransparent",B.az,A.b([new A.o(this.e,B.i)],t.C),!1))},
W(a){var s=this,r=s.a.Y(new A.a7("safeWorld",s.b,s.c,B.d3,B.t,B.cD)),q=s.e
return A.b([new A.fZ(new A.a2("worldOpaqueTransparent",A.b([new A.o(q,B.i)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iF:1}
A.fZ.prototype={
T(a){var s,r,q,p,o,n=this,m=a.b,l=a.d,k=l.d,j=m.a
A.ai(j,a.U(n.d).b)
A.a4(j,n.a.R())
s=k.a
A.aW(j,B.at,1,s.c,s.b,s.a)
A.ar(j,n.b.b)
A.e(j,"uViewProjection",new A.f(B.n,new Float32Array(A.t(l.c.c.a))))
r=k.go
q=r==null?null:r.a
if(q==null)q=B.f
s=t.n
A.e(j,"uLightDir",new A.f(B.j,new Float32Array(A.t(A.b([q.a,q.b,q.c],s)))))
p=k.fx
A.e(j,"uAmbientColor",new A.f(B.j,new Float32Array(A.t(A.b([p.a,p.b,p.c],s)))))
A.e(j,"uAmbientIntensity",new A.f(B.b,k.fy))
A.e(j,"uAmbientLightScale",new A.f(B.b,k.ax))
A.e(j,"uDirectLightScale",new A.f(B.b,k.ay))
for(j=l.a,s=j.length,o=0;o<j.length;j.length===s||(0,A.A)(j),++o)n.c_(m,j[o])
for(l=l.b,j=l.length,o=0;o<l.length;l.length===j||(0,A.A)(l),++o)n.c_(m,l[o])},
c_(a,b){var s,r,q,p,o,n=this
if(b instanceof A.b7){s=b.a
n.c8(a,s.gl().c)
A.ki(a,b,!0)
r=n.c.$1(s.gl().a)
A.a8(a.a,r.a)
q=r.b
p=r.c
o=b.b.length
if(q)a.bq(p,r.d,o,0)
else a.bo(p,0,o)}else if(t.Y.b(b)){q=a.a
A.e(q,"uUseInstances",B.am)
n.c8(a,b.gl().c)
r=n.c.$1(b.gl().a)
A.a8(q,r.a)
q=r.b
p=r.c
if(q)a.bp(p,r.d,0)
else a.Z(p,0)}else throw A.c(A.j("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.e3(b).i(0),null))},
c8(a,b){var s=b.a5(),r=a.a
A.e(r,"uModel",new A.f(B.n,new Float32Array(A.t(s.a))))
A.e(r,"uNormalMatrix",new A.f(B.n,new Float32Array(A.t(s.bB().a))))},
$iB:1,
gl(){return this.a}}
A.eF.prototype={
B(){return"LoopMode."+this.b}}
A.b0.prototype={}
A.bJ.prototype={
dm(a){var s,r,q,p,o,n,m,l=this.b
if(a<=B.a.gbt(l).a)return new A.bV(B.a.gbt(l),B.a.gbt(l),0)
if(a>=B.a.gbA(l).a)return new A.bV(B.a.gbA(l),B.a.gbA(l),1)
s=l.length
r=s-1
q=0
for(;;){if(!(q<r&&l[q+1].a<=a))break;++q}if(!(q<s))return A.h(l,q)
p=l[q]
r=q+1
if(!(r<s))return A.h(l,r)
o=l[r]
r=p.a
n=o.a-r
m=n>0.000001?(a-r)/n:0
return new A.bV(p,o,A.lm(B.c.q(m,0,1)))}}
A.hF.prototype={
$2(a,b){var s=this.a.h("b0<0>")
return B.d.O(s.a(a).a,s.a(b).a)},
$S(){return this.a.h("i(b0<0>,b0<0>)")}}
A.iN.prototype={
B(){return"Vector3Property."+this.b}}
A.fj.prototype={
e7(a){var s,r=this.dm(a),q=r.a.b,p=q.H(0,r.b.b.a6(0,q).m(0,r.c))
switch(0){case 0:q=this.a
s=q.b
q.b=new A.ag(p,s.b,s.c)
q.ab()
break}}}
A.h6.prototype={
cJ(a){var s,r,q,p,o,n,m,l=this
switch(l.c.a){case 0:s=B.c.q(a,0,l.b)
break
case 1:r=l.b
s=B.c.K(a,r)
if(s<0)s+=r
break
case 2:r=l.b
q=B.c.b_(a/r)
p=B.c.K(a,r)
o=p<0?p+r:p
s=(q&1)===0?o:r-o
break
default:s=a}for(r=l.d,n=r.length,m=0;m<n;++m)r[m].e7(s)}}
A.ct.prototype={
ae(a){var s,r=this,q=r.b+a*r.c
r.b=q
s=r.a
s.cJ(q)
if(s.c===B.cS&&r.b>=s.b)return!1
return!0}}
A.h7.prototype={
ae(a){this.a.er(0,new A.h8(a))}}
A.h8.prototype={
$2(a,b){A.U(a)
return!t.aQ.a(b).ae(this.a)},
$S:59}
A.ex.prototype={
ab(){this.fr=null
this.cU()},
gaC(){var s,r,q,p,o,n,m,l,k,j=this,i=j.y
if(i==null){s=j.z
i=s==null?null:s.d}if(i==null||j.cy.length===0)return null
s=j.fr
if(s==null){r=j.gao()
s=j.cy
if(0>=s.length)return A.h(s,0)
q=r.m(0,s[0]).a5()
p=i.gal()
o=A.H(p)
n=A.c5(new A.O(p,o.h("a(1)").a(q.gan()),o.h("O<1,a>")))
for(m=1;m<s.length;++m){q=r.m(0,s[m]).a5()
p=i.gal()
o=A.H(p)
l=A.c5(new A.O(p,o.h("a(1)").a(q.gan()),o.h("O<1,a>")))
o=n.a
q=l.a
p=n.b
k=l.b
n=new A.ak(new A.a(Math.min(o.a,q.a),Math.min(o.b,q.b),Math.min(o.c,q.c)),new A.a(Math.max(p.a,k.a),Math.max(p.b,k.b),Math.max(p.c,k.c)))}j.fr=n
s=n}return s},
aO(b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9=a8.w,b0=a8.x
if(a9==null||b0==null||a8.cy.length===0)a8.d7(b1)
else{s=a8.gao()
r=a8.dy!==s
if(a8.dx||r){q=a8.CW
for(p=a8.db,o=a8.cy,n=b1.b,m=b1.c;p.length>o.length;){l=p.pop()
n.az(l)
m.a4(0,l)}for(l=b1.a,k=l.$ti,j=k.c,i=l.b,h=a8.as,g=a8.at,k=k.y[1],f=n.$ti,e=f.c,f=f.y[1],d=n.b,c=0;c<o.length;++c){b=s.m(0,o[c])
a=new A.be(a9,b0,b,a8.Q,h,g,!0,!0,q)
if(c<p.length){a0=p[c]
b.A()
j.a(a9)
l.af(a9)
a1=a9.a
if(!(a1>=0&&a1<i.length))return A.h(i,a1)
a2=i[a1].c
a1=(a2==null?k.a(a2):a2).d
a3=b.a5()
a1=a1.gal()
a4=A.H(a1)
a5=A.c5(new A.O(a1,a4.h("a(1)").a(a3.gan()),a4.h("O<1,a>")))
e.a(a0)
f.a(a)
n.af(a0)
a4=a0.a
if(!(a4>=0&&a4<d.length))return A.h(d,a4)
d[a4].saX(a)
m.E(0,a0,new A.bx(a0,a,a5))}else{b.A()
j.a(a9)
l.af(a9)
a0=a9.a
if(!(a0>=0&&a0<i.length))return A.h(i,a0)
a2=i[a0].c
a0=(a2==null?k.a(a2):a2).d
a1=b.a5()
a0=a0.gal()
a3=A.H(a0)
a5=A.c5(new A.O(a0,a3.h("a(1)").a(a1.gan()),a3.h("O<1,a>")))
a6=n.cp(a)
m.E(0,a6,new A.bx(a6,a,a5))
B.a.j(p,a6)}}a8.dy=s
a8.dx=!1}}for(p=A.ch(a8.r,t.dB),o=p.length,a7=0;a7<o;++a7)p[a7].aO(b1)},
d7(a){var s,r,q,p,o,n
for(s=this.db,r=s.length,q=a.b,p=a.c,o=0;o<s.length;s.length===r||(0,A.A)(s),++o){n=s[o]
q.az(n)
p.a4(0,n)}B.a.a0(s)}}
A.b3.prototype={
bL(a,b,c,d,e,f,g,h,i,j,k,l,m){var s
if(this.y==null){s=this.z
this.y=s==null?null:s.d}},
sbI(a){var s=this.b
this.b=new A.ag(s.a,s.b,a)
this.ab()},
b1(a,b){var s=A.dh(a,b),r=this.b
this.b=new A.ag(r.a,r.b.m(0,s),r.c)
this.ab()},
gao(){var s,r=this
if(r.d){s=r.f
r.c=s!=null?s.gao().m(0,r.b):r.b
r.d=!1}return r.c},
ab(){var s,r,q,p=this
if(p.d)return
p.e=p.d=!0
for(s=p.r,r=s.length,q=0;q<s.length;s.length===r||(0,A.A)(s),++q)s[q].ab()},
bk(a){var s=a.f
if(s===this)return
if(s!=null)if(B.a.a4(s.r,a)){a.f=null
a.ab()}a.f=this
a.ab()
B.a.j(this.r,a)},
aV(a,b,c,d,e,f){var s=A.kC(B.C,null,!0,B.G,null,b,c,d,e,!0,0,f,-1)
this.bk(s)
return s},
gaC(){var s,r,q=this.y
if(q==null)q=null
else{s=this.gao().a5()
q=q.gal()
r=A.H(q)
r=A.c5(new A.O(q,r.h("a(1)").a(s.gan()),r.h("O<1,a>")))
q=r}return q},
ep(a){var s={}
s.a=null
new A.iA(s,a).$1(this)
return s.a},
aO(a){var s,r,q,p,o=this,n=o.w,m=o.x
if(n!=null&&m!=null){s=o.cx
if(s==null){o.cx=a.dI(new A.be(n,m,o.gao(),o.Q,o.as,o.at,!0,!0,o.CW))
o.e=!1}else if(o.e||o.d){a.eN(s,new A.be(n,m,o.gao(),o.Q,o.as,o.at,!0,!0,o.CW))
o.e=!1}}else{r=o.cx
if(r!=null){a.eq(r)
o.cx=null
o.e=!0}}for(r=o.r,q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p)r[p].aO(a)}}
A.iA.prototype={
$1(a){var s,r,q,p,o,n,m=a.gaC()
if(m!=null){s=this.b
r=s.ei(m)
if(r!=null){q=this.a
p=q.a
if(p==null||r<p.d){o=s.a.H(0,s.b.m(0,r))
o.a6(0,m.a.H(0,m.b).m(0,0.5)).gD()
q.a=new A.ip(a,o,r,null)}}}for(s=a.r,q=s.length,n=0;n<s.length;s.length===q||(0,A.A)(s),++n)this.$1(s[n])},
$S:60}
A.hy.prototype={
B(){return"GpuBufferUsage."+this.b}}
A.eq.prototype={
B(){return"GpuBufferKind."+this.b}}
A.et.prototype={
B(){return"GpuTextureFilter."+this.b}}
A.eu.prototype={
B(){return"GpuTextureWrap."+this.b}}
A.ep.prototype={}
A.es.prototype={}
A.ce.prototype={
B(){return"GpuTargetAttachment."+this.b}}
A.cW.prototype={}
A.er.prototype={
B(){return"GpuDeviceStatus."+this.b}}
A.cp.prototype={
B(){return"ShaderCompileStage."+this.b}}
A.dq.prototype={
i(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.bi.prototype={
B(){return"UniformType."+this.b}}
A.f.prototype={}
A.cN.prototype={
B(){return"ClearMask."+this.b}}
A.ej.prototype={
Z(a,b){var s=this.a
if(s.b!==B.h)A.m(A.k(u.k))
s.a.drawArrays(A.d(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.aq(a,1)},
bo(a,b,c){var s=this.a
if(s.b!==B.h)A.m(A.k(u.k))
s.a.drawArraysInstanced(A.d(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.aq(a,c)},
bp(a,b,c){var s,r,q=this.a
if(q.b!==B.h)A.m(A.k(u.k))
s=v.G
r=A.d(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.d(s.WebGL2RenderingContext.UNSIGNED_INT):A.d(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.aq(a,1)},
bq(a,b,c,d){var s,r,q=this.a
if(q.b!==B.h)A.m(A.k(u.k))
s=v.G
r=A.d(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.d(s.WebGL2RenderingContext.UNSIGNED_INT):A.d(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.ac(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.aq(a,c)},
$in0:1}
A.cc.prototype={}
A.df.prototype={
ar(a,b,c,d){var s,r,q,p,o,n,m,l,k="resource library is disposed",j=this.b,i=j.gv()
if(i.x)A.m(A.k(k))
s=i.c
if(d>0)r=c<=0
else r=!0
if(r)A.m(A.j("TextureStore.declare dimensions/layers must be > 0",null))
if(!isFinite(16))A.m(A.j("TextureStore.declare anisotropy must be in [1, 16]: 16",null))
r=s.b
q=t.aD
p=r.aY(new A.b4(new A.es(d,c,1,!0,B.bF,B.a0,B.bH,16),A.eE(1,null,!1,q),!1),b)
o=r.au(p)
n=A.ap(o.b,q)
B.a.E(n,0,a)
q=o.a
r.bH(p,new A.b4(q,n,o.c))
r=s.c
m=p.a
l=r.t(0,m)
if(l==null){l=A.kD(s.a,q)
r.E(0,m,l)}A.kE(s.a,l,0,a)
i.w.j(0,p)
j=j.gv()
if(j.x)A.m(A.k(k))
j.c.e8(p)
return p},
eo(a,b){var s,r,q,p,o,n,m,l,k=this,j=A.l(k.a.getBoundingClientRect()),i=a-A.aO(j.left),h=b-A.aO(j.top)
if(i<0||i>A.aO(j.width)||h<0||h>A.aO(j.height))return null
s=k.y
r=k.x
q=r.c/r.d
p=s!=null?s.b2(q):A.ed(q,B.b4,200,B.b6,1,0.1,B.f)
r=B.c.bG(A.aO(j.width))
o=B.c.bG(A.aO(j.height))
if(r<=0||o<=0)A.m(A.j("Viewport dimensions must be > 0",null))
n=i/r*2-1
m=1-h/o*2
r=p.gej()
l=r.b3(new A.a(n,m,-1))
return k.e.ep(new A.io(p.d,r.b3(new A.a(n,m,1)).a6(0,l).gD()))},
br(a,b,c,d){this.f=this.f.dZ(a,null,b,c,d)},
e3(a,b,c){return this.br(a,b,null,c)},
dr(){var s,r=this,q=v.G
A.l(q.window).addEventListener("resize",A.L(new A.i_(r)))
s=r.a
s.addEventListener("webglcontextlost",A.L(new A.i0(r)))
s.addEventListener("webglcontextrestored",A.L(new A.i1(r)))
s.addEventListener("contextmenu",A.L(new A.i2()))
s.addEventListener("mousedown",A.L(new A.i3(r)))
A.l(q.window).addEventListener("mousemove",A.L(new A.i4(r)))
A.l(q.window).addEventListener("mouseup",A.L(new A.i5(r)))
s.addEventListener("wheel",A.L(new A.i6(r)))
A.l(q.window).addEventListener("keydown",A.L(new A.i7(r)))
A.l(q.window).addEventListener("keyup",A.L(new A.i8(r)))},
cj(){var s,r,q,p,o=this.y
if(o instanceof A.bG){s=this.as
r=s.p(0,"keyw")||s.p(0,"arrowup")?1:0
if(s.p(0,"keys")||s.p(0,"arrowdown"))--r
q=s.p(0,"keya")||s.p(0,"arrowleft")?-1:0
if(s.p(0,"keyd")||s.p(0,"arrowright"))++q
p=s.p(0,"space")||s.p(0,"keye")?1:0
o.z=new A.a(q,s.p(0,"shiftleft")||s.p(0,"keyq")?p-1:p,r)}},
c5(){var s,r=this,q=r.a,p=A.d(q.clientWidth)>0?A.d(q.clientWidth):A.d(q.width),o=A.d(q.clientHeight)>0?A.d(q.clientHeight):A.d(q.height),n=r.x
if(p===n.a&&o===n.b)return
n=n.e
n=A.lP(o,p,n,n,!0)
r.x=n
q.width=n.c
q.height=r.x.d
try{q=r.x
r.b.aQ()
q.A()
r.d.by("surface resized")}catch(s){}},
cN(){var s=this
if(s.ch)return
s.ch=!0
s.CW=0
A.d(A.l(v.G.window).requestAnimationFrame(A.L(s.gce())))},
dD(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this
A.aO(a0)
if(!a.ch)return
s=a0/1000
r=a.CW
q=r>0?s-r:0.016666666666666666
a.CW=s
a.c5()
if(!a.cx&&a.b.e!==B.a9){a.at.ae(q)
r=a.c
a.e.aO(r)
p=a.y
o=p!=null
if(o)p.ae(q)
n=a.z
n.ae(q)
m=a.x
l=m.c/m.d
k=n.dL(o?p.b2(l):A.ed(l,B.b4,200,B.b6,1,0.1,B.f))
n=a.d
m=a.f
j=a.r
i=n.a
h=new A.ht(k,m,j,-1,i,s)
n.a=i+1
o=a.b
g=o.dM(r,h)
for(r=a.ax,f=0;f<r.length;++f)r[f].cP(g,h)
o.gv()
r=a.ay
if(r!=null)r.$1(new A.cc(s,q))
e=o.e4()
if(a.w){r=a.fy+=q
o=++a.go
if(r>=0.5){a.id=o/r
a.go=a.fy=0
d=a.fx
if(d==null){r=v.G
d=A.l(A.l(r.document).createElement("div"))
A.l(d.style).position="absolute"
A.l(d.style).left="12px"
A.l(d.style).top="12px"
A.l(d.style).padding="8px 12px"
A.l(d.style).backgroundColor="rgba(10, 12, 16, 0.85)"
A.l(d.style).color="#00ffaa"
A.l(d.style).fontFamily="monospace"
A.l(d.style).fontSize="12px"
A.l(d.style).lineHeight="1.4"
A.l(d.style).borderRadius="4px"
A.l(d.style).pointerEvents="none"
A.l(d.style).zIndex="9999"
c=A.C(a.a.parentElement)
if(c==null)c=A.C(A.l(r.document).body)
if(c!=null)A.l(c.appendChild(d))
a.fx=d}b=B.c.a9(q*1000,1)
d.innerText="FPS: "+B.c.a9(a.id,0)+" ("+b+" ms)\nDraws: "+e.b+" | Tris: "+e.c+"\nInstances: "+e.e+" | VRAM: "+B.c.a9(e.r/1024,0)+" KB"}}}A.d(A.l(v.G.window).requestAnimationFrame(A.L(a.gce())))},
sen(a){this.ay=t.a4.a(a)}}
A.ia.prototype={
$1(a){var s=this.a,r=a.a===B.a6?2:1,q=a===B.aO?0:1
return new A.dk(a,s.c,s.d,r,q)},
$S:62}
A.i_.prototype={
$1(a){A.l(a)
return this.a.c5()},
$S:15}
A.i0.prototype={
$1(a){var s
A.l(a)
s=this.a
s.cx=!0
s.d.by("gl context lost")},
$S:0}
A.i1.prototype={
$1(a){var s
A.l(a)
s=this.a
s.cx=!1
s.d.by("gl context restored")},
$S:0}
A.i2.prototype={
$1(a){A.l(a).preventDefault()},
$S:0}
A.i3.prototype={
$1(a){var s
A.l(a)
s=this.a
s.db=!0
s.dx=A.d(a.button)
s.dy=A.d(a.clientX)
s.fr=A.d(a.clientY)},
$S:0}
A.i4.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
A.l(a)
s=this.a
if(s.db)r=s.y!=null
else r=!1
if(r){q=A.d(a.clientX)
p=A.d(a.clientY)
o=q-s.dy
n=p-s.fr
s.dy=q
s.fr=p
m=s.y
if(m instanceof A.bt)if(s.dx===0&&!A.h_(a.shiftKey)){m.ax+=o*0.006
m.ay=B.c.q(m.ay+n*0.006,-1.5079644737231006,1.5079644737231006)}else{s=m.b
l=m.gcA()
k=m.gcA().a8(m.a.a6(0,m.gbs()).gD()).gD()
j=l.m(0,-o*0.003*s).H(0,k.m(0,n*0.003*s))
m.CW=m.CW.H(0,j)}else if(m instanceof A.bG){m.b+=o*0.003
m.c=B.c.q(m.c-n*0.003,-1.5393804002589986,1.5393804002589986)}else if(m instanceof A.cq){m.z+=o*0.006
m.Q=B.c.q(m.Q+-n*0.006,-1.0995574287564276,1.2566370614359172)}}},
$S:0}
A.i5.prototype={
$1(a){A.l(a)
this.a.db=!1},
$S:0}
A.i6.prototype={
$1(a){var s,r,q
A.l(a)
s=this.a
r=s.y
if(r!=null){a.preventDefault()
q=s.y
if(q instanceof A.bt){s=A.aO(a.deltaY)
q.ch=B.c.q(q.ch+s*0.003,0.5,100)}else if(q instanceof A.bG){s=A.aO(a.deltaY)
q.a=q.a.H(0,q.gav().m(0,q.d*(-s*0.002)))}else if(q instanceof A.cq){s=A.aO(a.deltaY)
q.d=B.c.q(q.d+s*0.003,1.5,40)}}},
$S:0}
A.i7.prototype={
$1(a){var s=this.a
s.as.j(0,A.U(A.l(a).code).toLowerCase())
s.cj()},
$S:0}
A.i8.prototype={
$1(a){var s=this.a
s.as.a4(0,A.U(A.l(a).code).toLowerCase())
s.cj()},
$S:0}
A.eX.prototype={
cv(a){var s=this.b.t(0,a)
if(s==null)throw A.c(A.k("resource is not in candidate: "+a))
return s}}
A.hz.prototype={
gn(){var s=this.c
if(s==null)throw A.c(A.k("GPU resource adapter is not initialized"))
return s},
am(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.de(s.b)
r.b.am()
r.c=null
r.e=!0},
bY(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.ax(a0,a1),a3=A.b([],t.J)
try{k=a4.a
j=k.$ti
i=j.h("w(1)")
j=j.h("a5<1>")
s=new A.a5(k,i.a(new A.hA()),j)
for(h=s,g=J.a6(h.a),h=new A.K(g,h.b,h.$ti.h("K<1>")),f=a.a;h.k();){r=g.gn()
q=A.m0(f,a.bZ(r,a5))
J.h4(a3,q)
J.h3(a2,r,q)}e=A.ap(new A.a5(k,i.a(new A.hB()),j),j.h("n.E"))
B.a.cM(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.A)(k),++d){o=k[d]
n=A.pC(J.mR(o,11))
if(i){h=J.kn(a2,"sceneColor")
h.toString
J.h3(a2,o,h)}else{h=n
if(typeof h!=="number")return h.cG()
if(h>=2){h=J.kn(a2,"sceneColor#1")
h.toString
J.h3(a2,o,h)}else{m=A.m0(f,a.bZ(o,a5))
J.h4(a3,m)
J.h3(a2,o,m)}}}a0=A.ll(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.H(a0).h("dn<1>"),a0=new A.dn(a0,k),a0=new A.ao(a0,a0.gu(0),k.h("ao<Q.E>")),j=a.a,i=t.V,k=k.h("Q.E");a0.k();){h=a0.d
l=h==null?k.a(h):h
b=i.a(a1.a(l).a)
A.kF(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}throw c}},
bZ(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.cW(512,512,1,B.a_,!0)
if(a==="sceneDepth")return new A.cW(n,m,1,B.a_,!0)
s=B.w.aj(a,"ssao")||B.w.aj(a,"bloomBlur")||B.w.aj(a,"dofBlur")||B.w.aj(a,"volumetricLight")
r=s?B.d.V(n+1,2):n
q=s?B.d.V(m+1,2):m
p=a==="sceneColor"
o=p||B.w.aj(a,"sceneColor#")
p=p?b.d:1
return new A.cW(r,q,p,o?B.ay:B.bC,o)},
de(a){var s,r,q,p,o,n=A.kw(t.bS.a(a).gcE(),t.j)
for(n=A.kK(n,n.r,A.v(n).c),s=this.a,r=t.V,q=n.$ti.c;n.k();){p=n.d
o=r.a((p==null?q.a(p):p).a)
A.kF(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}
A.hA.prototype={
$1(a){return!B.w.aj(A.U(a),"sceneColor#")},
$S:8}
A.hB.prototype={
$1(a){return B.w.aj(A.U(a),"sceneColor#")},
$S:8}
A.dM.prototype={
B(){return"_SlotState."+this.b}}
A.by.prototype={
saX(a){this.c=this.$ti.h("1?").a(a)}}
A.b2.prototype={
aY(a,b){var s,r,q,p,o=this,n=o.$ti
n.y[1].a(a)
s=o.c
r=s.length
if(r!==0){if(0>=r)return A.h(s,-1)
q=s.pop()}else{s=o.b
B.a.j(s,new A.by(B.W,n.h("by<2>")))
q=s.length-1}n=o.b
if(!(q>=0&&q<n.length))return A.h(n,q)
p=n[q];++p.a
p.b=B.f7
p.saX(a)
p.f=b;++o.d
return o.a.$3(q,p.a,b)},
cp(a){return this.aY(a,null)},
af(a){var s,r,q
this.$ti.c.a(a)
s=a.a
if(s<0||s>=this.b.length)throw A.c(A.bo(B.aB,a))
r=this.b
if(!(s>=0&&s<r.length))return A.h(r,s)
q=r[s]
if(q.a!==a.b)throw A.c(A.bo(B.aC,a))
s=q.b
if(s===B.X||s===B.W)throw A.c(A.bo(B.U,a))},
au(a){var s,r,q=this.$ti
q.c.a(a)
this.af(a)
s=this.b
r=a.a
if(!(r>=0&&r<s.length))return A.h(s,r)
r=s[r].c
return r==null?q.y[1].a(r):r},
bH(a,b){var s,r=this.$ti
r.c.a(a)
r.y[1].a(b)
this.af(a)
r=this.b
s=a.a
if(!(s>=0&&s<r.length))return A.h(r,s)
r[s].saX(b)},
az(a){var s,r,q,p=this
p.$ti.c.a(a)
s=a.a
if(s<0||s>=p.b.length)throw A.c(A.bo(B.aB,a))
r=p.b
if(!(s>=0&&s<r.length))return A.h(r,s)
q=r[s]
if(q.a!==a.b)throw A.c(A.bo(B.aC,a))
r=q.b
if(r===B.X||r===B.W)throw A.c(A.bo(B.bT,a))
q.b=B.X
q.saX(null)
B.a.j(p.c,s);++p.e},
aL(){return new A.bz(this.el(),this.$ti.h("bz<+(1,2)>"))},
el(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k,j,i
return function $async$aL(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b,n=s.a,m=s.$ti.y[1],l=0
case 2:if(!(l<o.length)){r=4
break}k=o[l]
j=k.b
if(j===B.X||j===B.W){r=3
break}j=n.$3(l,k.a,k.f)
i=k.c
r=5
return a.b=new A.E(j,i==null?m.a(i):i),1
case 5:case 3:++l
r=2
break
case 4:return 0
case 1:return a.c=p.at(-1),3}}}}}
A.ha.prototype={
B(){return"BlendEquation."+this.b}}
A.c7.prototype={
B(){return"BlendFactor."+this.b}}
A.hf.prototype={
B(){return"CullFace."+this.b}}
A.hj.prototype={
B(){return"DepthFunc."+this.b}}
A.cb.prototype={}
A.af.prototype={
B(){return"StateField."+this.b}}
A.iU.prototype={
e2(a){var s,r=this.a
if(r==null)return A.nh(B.cL,t.d5)
s=A.at(t.d5)
if(r.a!==a.a)s.j(0,B.ac)
if(r.b!==a.b)s.j(0,B.ad)
if(r.c!==a.c)s.j(0,B.ae)
if(r.d!==a.d)s.j(0,B.af)
if(r.e!==a.e||r.f!==a.f)s.j(0,B.ag)
if(r.r!==a.r)s.j(0,B.ah)
if(r.w!==a.w)s.j(0,B.ai)
if(r.x!==a.x)s.j(0,B.aj)
return s}}
A.bm.prototype={$iaQ:1}
A.dW.prototype={}
A.dV.prototype={}
A.fY.prototype={}
A.fm.prototype={
cV(a){var s=this,r=A.l(s.a.canvas)
s.c=A.L(new A.iR(s))
s.d=A.L(new A.iS(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
aF(a){var s=A.cE(this.a.getParameter(a))
return typeof s=="number"?B.c.bG(s):0},
c3(a){var s=A.cE(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
$in6:1}
A.iR.prototype={
$1(a){A.l(a).preventDefault()
this.a.b=B.T},
$S:16}
A.iS.prototype={
$1(a){this.a.b=B.h},
$S:16}
A.jm.prototype={
dN(){var s,r=this
if(r.b!==B.h)A.m(A.k(u.k))
s=r.w?A.C(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.bm(new A.fY(s))},
cf(a){var s=a.a
if(!(s instanceof A.fY))throw A.c(A.al(a,"query","is not a GPU timer query"))
return s}}
A.fX.prototype={}
A.iQ.prototype={}
A.iT.prototype={
e1(a){var s=A.C(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.iQ(A.o1(s))}}
A.jY.prototype={
$1(a){var s,r,q
A.l(a)
s=A.U(this.a.value)
A:{if("aces"===s){r=B.ec
break A}if("reinhard"===s){r=B.ak
break A}if("off"===s){r=B.aZ
break A}r=B.al
break A}q=this.b
q.r=q.r.dW(r)},
$S:0}
A.jZ.prototype={
$1(a){var s,r,q
A.l(a)
s=A.U(this.a.value)
A:{if("clean"===s){r=A.eW(0,0,0,0,0,1,0,8,0,1,!1,0,0,0,0,B.al,0,0,0,0,0,0,0,0)
break A}if("ps1"===s){r=A.eW(0.35,0,0,0,0.65,1,0,5,0,1,!1,0,0,0,0,B.aZ,0,0,0,0,0,0,0,0)
break A}if("vhs"===s){r=A.eW(0,0,0,0,0,1,0,8,0,1,!1,0,0,0,0,B.ak,0,0.45,0,0,0,0.25,0.4,0.3)
break A}r=A.lF()
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
A.k_.prototype={
$1(a){var s
A.l(a)
s=this.a.y
s=s instanceof A.bt?s:null
if(s!=null)s.as=A.h_(this.b.checked)},
$S:0}
A.k4.prototype={
$1(a){var s,r,q,p=this
A.l(a)
s=p.a
if(A.U(s.value)==="fly"){p.b.y=new A.bG(B.ez,6,B.r,B.r)
s=p.c
if(t.m.b(s))A.l(s.style).display="none"}else if(A.U(s.value)==="follow"){s=p.d
r=s.length
if(r!==0){if(0>=r)return A.h(s,0)
s=s[0]
p.b.y=new A.cq(s,B.r,B.b5,3.8,1.2,7,B.eA,B.r.H(0,B.b5))}s=p.c
if(t.m.b(s))A.l(s.style).display="none"}else{q=p.b.y=A.lD(8.5,B.V)
q.d=0.45
s=p.e
r=t.m
if(r.b(s)){q.as=A.h_(s.checked)
q.at=0.18}s=p.c
if(r.b(s))A.l(s.style).display="flex"}},
$S:0}
A.k5.prototype={
$1(a){A.l(a)
this.a.z.dJ(0.65)},
$S:0}
A.kc.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0=A.ih(A.U(this.a.value))
if(c0==null)c0=14
s=B.c.b_(c0)
r=B.c.J((c0-s)*60)
q=B.w.cw(B.d.i(s),2,"0")
p=B.w.cw(B.d.i(r),2,"0")
o=this.b
if(t.m.b(o))o.innerText=q+":"+p
o=this.c
new A.iF(c0,0.65,0.35,0.25,2,2.5).A()
c0=B.c.K(B.c.K(c0,24)+24,24)
n=A.lM(c0,12)*3.141592653589793/12
m=Math.sin(0.65)
l=Math.cos(0.65)
k=m*Math.sin(0.35)
j=l*Math.cos(0.35)
i=k+j*Math.cos(n)
h=Math.asin(B.c.q(i,-1,1))
g=Math.cos(h)
f=Math.atan2(Math.sin(n),Math.cos(n)*m-Math.tan(0.35)*l)
e=new A.a(Math.sin(f)*g,Math.sin(h),Math.cos(f)*g).gD()
if(Math.abs(j)<1e-12)d=i>0?-2:2
else d=(Math.sin(-0.014538592669112763)-k)/j
c=d>-1&&d<1
b=c?Math.acos(d)*12/3.141592653589793:0
a=B.c.K(B.c.K(12-b,24)+24,24)
a0=B.c.K(B.c.K(12+b,24)+24,24)
k=!c
a1=k&&i>0
A.nV(h,c0,a1,k&&!a1,12)
a2=A.nU(Math.max(0,1.5707963267948966-h))
j=B.c.q(Math.exp(-(0.0046416*a2*2.875)),0,1)
a3=B.c.q(Math.exp(-(0.010846399999999999*a2*2.875)),0,1)
a4=B.c.q(Math.exp(-(0.02648*a2*2.875)),0,1)
a5=B.c.q(Math.exp(-0.55),0,1)
a6=A.lN(-0.3141592653589793,0.10471975511965977,h)
a7=A.lN(-0.014538592669112763,0.03490658503988659,h)
a8=Math.max(0,Math.sin(h)+a7*0.018)
a9=j*0.2126+a3*0.7152+a4*0.0722
b0=2.5*Math.pow(a8,0.35)*a9*a5
b1=B.c.q(a8*a9,0,1)
b2=0.42*b1
b3=0.055+b2*0.8875000000000001+a6*0.041499999999999995
b4=0.035+j*0.18+0.025
b5=0.045+a3*0.2+0.03
b6=0.07+a4*0.24+0.04+a6*0.018
b7=new A.x(b4,b5,b6)
b8=new A.x(j,a3,a4)
b2=new A.x(0.14+0.38*b1,0.16+b2,0.22+0.52*b1)
if(!isFinite(c0)||!isFinite(a)||!isFinite(a0)||!isFinite(h)||!isFinite(a6)||!isFinite(a7)||!isFinite(f)||!isFinite(b0)||!isFinite(b3)||!isFinite(0.0034800000000000005)||!isFinite(0.06)||!e.gI(0)||!new A.a(j,a3,a4).gI(0)||!b8.gI(0)||!b2.gI(0)||!b7.gI(0))A.m(A.k("solar lighting state is not finite"))
if(e.ga1()<0.999||e.ga1()>1.001||b0<0||b3<0||a5<0||a5>1||a6<0||a6>1||a7<0||a7>1)A.m(A.k("solar lighting state is out of bounds"))
new A.ca(e,b8,b0).A()
k=o.f.dX(b2,b3,new A.ca(e,b8,b0),b7)
o.f=k
b9=k.k4
if(b9!=null){k=B.c.q(b4*0.4+0.02,0,1)
j=B.c.q(b5*0.5+0.04,0,1)
a3=B.c.q(b6*0.8+0.08,0,1)
o.f=o.f.co(new A.dr(b9.a,b9.b,b7,new A.x(k,j,a3),new A.x(B.c.q(b4*0.2,0,1),B.c.q(b5*0.2,0,1),B.c.q(b6*0.2,0,1)),B.c.q(a7*0.25,0,1),B.c.q((1-a6)*0.008,0,0.1),b9.w,b9.x,!0,b9.z,b9.Q,b9.as,b9.at,b9.ax,b9.ay,b9.ch,b9.CW,b9.cx,b9.cy,b9.db))}},
$S:1}
A.k6.prototype={
$1(a){A.l(a)
return this.a.$0()},
$S:15}
A.k7.prototype={
$1(a){var s,r,q
A.l(a)
s=A.ih(A.U(this.a.value))
if(s==null)s=0
r=this.b
if(t.m.b(r)){q=s<=0?"Off":B.c.a9(s,2)
r.innerText=q}r=this.c
r.r=r.r.dT(s)},
$S:0}
A.k8.prototype={
$1(a){var s,r
A.l(a)
s=A.ih(A.U(this.a.value))
if(s==null)s=0.3
r=this.b
if(t.m.b(r))r.innerText=B.c.a9(s,2)
r=this.c
r.r=r.r.dS(s)},
$S:0}
A.k9.prototype={
$1(a){var s,r
A.l(a)
s=A.ih(A.U(this.a.value))
if(s==null)s=0.75
r=this.b
if(t.m.b(r))r.innerText=B.c.a9(s,2)
r=this.c
r.r=r.r.dV(s)},
$S:0}
A.ka.prototype={
$1(a){var s
A.l(a)
s=this.a.t(0,A.U(this.b.value))
if(s!=null)this.c.x=s},
$S:0}
A.kb.prototype={
$1(a){var s,r=this
A.l(a)
s=r.a.ax
B.a.a0(s)
switch(A.U(r.b.value)){case"embers":B.a.j(s,r.c)
break
case"dust":B.a.j(s,r.d)
break
case"snow":B.a.j(s,r.e)
break
case"off":break}},
$S:0}
A.k0.prototype={
$1(a){var s,r=this
A.l(a)
switch(A.U(r.a.value)){case"on":r.b.br(B.aD,35,0.08,6)
break
case"volumetric":s=r.b
s.e3(B.cf,45,8)
s.f=s.f.e_(B.N,0.7,0.04,0.02,1.2,16)
break
case"off":s=r.b
s.f=s.f.dY(null,10001,null,1e4)
break}},
$S:0}
A.k1.prototype={
$1(a){var s
A.l(a)
s=A.h_(this.b.checked)?-1:0
this.a.Q=s},
$S:0}
A.k2.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
A.l(a)
s=j.b.eo(A.d(a.clientX),A.d(a.clientY))
r=j.a
if(s!=null){q=s.a
r.a=q
r.b=1
p=B.c.a9(s.d,2)
o=s.b
r=B.c.a9(o.a,1)
n=B.c.a9(o.b,1)
m=B.c.a9(o.c,1)
l=s.f
k=l!=null?" (Instance #"+A.p(l)+")":""
l=j.c
if(l!=null)l.textContent="Selected: "+q.a+k+" | Dist: "+p+" | Pt: "+("("+r+", "+n+", "+m+")")}else{r.a=null
r=j.c
if(r!=null)r.textContent="Click any 3D object to inspect"}},
$S:0}
A.k3.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=a.a,e=a.b,d=g.a,c=d.b
if(c>0)c=d.b=Math.max(0,c-e*2.5)
s=g.b
s.sbI(d.a===s?1+Math.sin(c*3.141592653589793)*0.2:1)
c=g.c
c.sbI(d.a===c?1+Math.sin(d.b*3.141592653589793)*0.18:1)
s.b1(B.f,0.35*e)
c.b1(B.eM.gD(),0.7*e)
g.d.b1(B.f,0.65*e)
g.e.b1(B.f,0.12*e)
for(c=g.f,r=0;r<c.length;++r){q=c[r]
p=q===d.a?1+Math.sin(d.b*3.141592653589793)*0.25:1
s=q.b
q.b=new A.ag(s.a,s.b,p)
q.ab()
o=B.d.K(r,3)
A:{if(0===o){s=B.eD.gD()
break A}if(1===o){s=B.ey.gD()
break A}s=B.eC.gD()
break A}n=A.dh(s,(2.2+r*1.2)*e)
s=q.b
q.b=new A.ag(s.a,s.b.m(0,n),s.c)
q.ab()}d=f*1.2
c=Math.cos(d)
s=Math.sin(f*2)
d=Math.sin(d)
m=f+2
l=Math.cos(m)
m=Math.sin(m)
k=f*0.8+4
j=Math.cos(k)
k=Math.sin(k)
i=Math.sin(f*2.2)
h=g.r
h.f=h.f.dU(A.b([new A.bu(new A.a(c*4.2,1.5+s*0.6,d*4.2),B.c0,4,9),new A.bu(new A.a(l*4.5,1.8,m*4.5),B.c5,4,9),new A.bu(new A.a(j*3.8,1.2,k*3.8),B.cd,3.5,8),new A.bu(new A.a(0,3.8+i*0.9,0),B.ch,4.5,10)],t.h))},
$S:66};(function aliases(){var s=J.br.prototype
s.cT=s.i
s=A.b3.prototype
s.cU=s.ab})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"oS","nb",67)
r(A,"ph","od",5)
r(A,"pi","oe",5)
r(A,"pj","of",5)
q(A,"mv","pc",1)
p(A.eI.prototype,"gey","ez",19)
var o
p(o=A.ff.prototype,"geu","ev",3)
p(o,"geC","eD",3)
p(o,"geE","eF",3)
p(o,"gew","ex",3)
p(o,"geA","eB",3)
q(A,"mw","og",69)
q(A,"qh","ky",70)
r(A,"pq","lm",47)
p(A.bc.prototype,"gan","b3",10)
p(A.df.prototype,"gce","dD",61)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.y,null)
q(A.y,[A.kt,J.ey,A.dp,J.cI,A.n,A.cL,A.M,A.iE,A.ao,A.d7,A.K,A.an,A.aM,A.ci,A.cP,A.bS,A.bf,A.iL,A.hU,A.cU,A.dN,A.bn,A.bK,A.hG,A.d3,A.bb,A.d2,A.aV,A.fB,A.jj,A.jh,A.fp,A.bl,A.aH,A.fu,A.bQ,A.Y,A.fq,A.fQ,A.dX,A.dD,A.fD,A.bT,A.I,A.dT,A.fT,A.bF,A.iZ,A.eS,A.ds,A.j_,A.hr,A.ae,A.a1,A.fR,A.fc,A.hT,A.fJ,A.iq,A.aA,A.hd,A.he,A.eV,A.cK,A.dr,A.en,A.ht,A.hu,A.bd,A.hC,A.cl,A.ea,A.x,A.ca,A.bu,A.av,A.aT,A.ah,A.iO,A.bs,A.hi,A.hV,A.ib,A.f2,A.be,A.iH,A.dk,A.X,A.hv,A.eI,A.fi,A.hQ,A.b4,A.ff,A.iF,A.hb,A.bG,A.bt,A.cq,A.b7,A.el,A.em,A.eo,A.hs,A.cw,A.J,A.ad,A.T,A.o,A.cO,A.il,A.a7,A.ir,A.a2,A.it,A.is,A.bx,A.dj,A.f1,A.j0,A.fS,A.jg,A.fG,A.fA,A.fL,A.fF,A.jc,A.au,A.as,A.a_,A.hh,A.hg,A.aC,A.ak,A.j1,A.bM,A.hw,A.bc,A.cn,A.io,A.ip,A.ag,A.D,A.a,A.c6,A.e7,A.cJ,A.fs,A.e9,A.ft,A.ei,A.fv,A.cS,A.fx,A.ek,A.fy,A.ev,A.fC,A.d8,A.fE,A.c9,A.eb,A.kz,A.dg,A.fH,A.f_,A.fI,A.bN,A.f7,A.fM,A.f8,A.fN,A.fa,A.fP,A.f9,A.fO,A.fk,A.fU,A.fl,A.fW,A.fV,A.dl,A.fo,A.fZ,A.b0,A.bJ,A.h6,A.ct,A.h7,A.b3,A.ep,A.es,A.cW,A.dq,A.f,A.ej,A.cc,A.df,A.eX,A.hz,A.by,A.b2,A.cb,A.iU,A.bm,A.dW,A.dV,A.fY,A.fX,A.jm,A.iQ,A.iT])
q(J.ey,[J.eB,J.cY,J.d_,J.cZ,J.d0,J.cg,J.bp])
q(J.d_,[J.br,J.r,A.cj,A.dc])
q(J.br,[J.eU,J.bO,J.bq])
r(J.eA,A.dp)
r(J.hE,J.r)
q(J.cg,[J.cX,J.eC])
q(A.n,[A.cu,A.aJ,A.d6,A.a5,A.bR,A.bz])
r(A.dY,A.cu)
r(A.dA,A.dY)
r(A.cM,A.dA)
q(A.M,[A.d1,A.bg,A.eD,A.fh,A.f3,A.fz,A.e4,A.aY,A.dx,A.fg,A.cr,A.eg])
q(A.aJ,[A.Q,A.ba,A.aS,A.b9,A.dC])
q(A.Q,[A.dt,A.O,A.dn])
q(A.aM,[A.bk,A.cx])
q(A.bk,[A.E,A.dJ,A.dK,A.cy])
r(A.bV,A.cx)
r(A.cz,A.ci)
r(A.dv,A.cz)
r(A.cQ,A.dv)
r(A.V,A.cP)
q(A.bf,[A.cR,A.dL,A.dU])
r(A.aZ,A.cR)
r(A.de,A.bg)
q(A.bn,[A.ee,A.ef,A.fe,A.jT,A.jV,A.iW,A.iV,A.jn,A.ja,A.ke,A.kf,A.jN,A.jO,A.iP,A.hN,A.hO,A.hP,A.hX,A.hM,A.hR,A.iI,A.iK,A.hn,A.hl,A.hm,A.hY,A.hZ,A.iy,A.ix,A.iw,A.iv,A.iu,A.iz,A.jE,A.jF,A.iB,A.iC,A.km,A.kk,A.ic,A.ie,A.id,A.ij,A.ii,A.hx,A.hK,A.h9,A.jL,A.iA,A.ia,A.i_,A.i0,A.i1,A.i2,A.i3,A.i4,A.i5,A.i6,A.i7,A.i8,A.hA,A.hB,A.iR,A.iS,A.jY,A.jZ,A.k_,A.k4,A.k5,A.k6,A.k7,A.k8,A.k9,A.ka,A.kb,A.k0,A.k1,A.k2,A.k3])
q(A.fe,[A.fb,A.c8])
q(A.bK,[A.b8,A.dB])
q(A.ef,[A.jU,A.jo,A.jJ,A.jb,A.hH,A.hJ,A.kg,A.hS,A.iJ,A.kh,A.ho,A.iD,A.kl,A.kj,A.ig,A.ik,A.hF,A.h8])
q(A.dc,[A.eJ,A.a9])
q(A.a9,[A.dF,A.dH])
r(A.dG,A.dF)
r(A.da,A.dG)
r(A.dI,A.dH)
r(A.db,A.dI)
q(A.da,[A.d9,A.eK])
q(A.db,[A.eL,A.eM,A.eN,A.eO,A.eP,A.dd,A.eQ])
r(A.dO,A.fz)
q(A.ee,[A.iX,A.iY,A.ji,A.j2,A.j6,A.j5,A.j4,A.j3,A.j9,A.j8,A.j7,A.jf,A.jI,A.jD,A.jw,A.jx,A.jC,A.jr,A.jt,A.js,A.jB,A.jp,A.jq,A.jy,A.jz,A.jA,A.jv,A.ju,A.jG,A.jH,A.jM,A.kc])
r(A.dz,A.fu)
r(A.fK,A.dX)
r(A.dE,A.dB)
r(A.aX,A.dL)
r(A.dw,A.dU)
q(A.aY,[A.di,A.ew])
q(A.iZ,[A.cm,A.cs,A.cf,A.h5,A.eH,A.bj,A.cT,A.e8,A.hc,A.co,A.ab,A.cd,A.aR,A.f0,A.b6,A.dm,A.f6,A.cV,A.e6,A.fr,A.fw,A.eF,A.iN,A.hy,A.eq,A.et,A.eu,A.ce,A.er,A.cp,A.bi,A.cN,A.dM,A.ha,A.c7,A.hf,A.hj,A.af])
q(A.bd,[A.az,A.aB,A.b1,A.eT,A.b_])
r(A.f4,A.fL)
r(A.fj,A.bJ)
r(A.ex,A.b3)
r(A.fm,A.fX)
s(A.dY,A.I)
s(A.dF,A.I)
s(A.dG,A.an)
s(A.dH,A.I)
s(A.dI,A.an)
s(A.cz,A.dT)
s(A.dU,A.fT)
s(A.fL,A.jc)
s(A.fX,A.jm)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{i:"int",q:"double",aj:"num",u:"String",w:"bool",a1:"Null",z:"List",y:"Object",ay:"Map",N:"JSObject"},mangledNames:{},types:["a1(N)","~()","aQ()","aQ(aB?)","w(J)","~(~())","~(@)","w(ah)","w(u)","w(o)","a(a)","a1(@)","a1()","w(q)","~(a,a,a,a,a,a)","~(N)","a1(y?)","~(y?,y?)","a1(@,bw)","aT(b1)","b1(i,i,u?)","az(i,i,u?)","i(i,+(az,bs))","@(@)","aB(i,i,u?)","w(du?)","i(i,+(aB,b4))","i(+influence,source(q,dy),+influence,source(q,dy))","u(J)","i(B,B)","~(i,@)","a1(y,bw)","w(i)","b_(i,i,u?)","dl(az)","aQ(u{fallback:u?})","~(@,@)","av?()","z<av>()","cK()","q()","c9()","aQ?()","w(ae<u,X>)","X(ae<u,X>)","X(X,X)","i(a_<au>,a_<au>)","q(q)","i(a_<as>,a_<as>)","aK(a_<as>)","@(u)","y?(y?)","i(i,i)","~(a,a,a,a,a)","q(i,i)","bM(q,q,q,q)","w(c6)","~(bN)","bN()","w(u,ct)","~(b3)","~(aj)","dk(aA)","w(aA)","i(+influence,light(q,av),+influence,light(q,av))","@(@,u)","~(cc)","i(@,@)","a1(~())","cw()","w()","aK(a_<au>)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.E&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.dJ&&a.b(c.a)&&b.b(c.b),"2;influence,source":(a,b)=>c=>c instanceof A.dK&&a.b(c.a)&&b.b(c.b),"2;rotation,translation":(a,b)=>c=>c instanceof A.cy&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.bV&&a.b(d.a)&&b.b(d.b)&&c.b(d.c)}}
A.ow(v.typeUniverse,JSON.parse('{"eU":"br","bO":"br","bq":"br","q0":"cj","r":{"z":["1"],"N":[],"n":["1"]},"eB":{"w":[],"G":[]},"cY":{"G":[]},"d_":{"N":[]},"br":{"N":[]},"eA":{"dp":[]},"hE":{"r":["1"],"z":["1"],"N":[],"n":["1"]},"cI":{"W":["1"]},"cg":{"q":[],"aj":[],"am":["aj"]},"cX":{"q":[],"i":[],"aj":[],"am":["aj"],"G":[]},"eC":{"q":[],"aj":[],"am":["aj"],"G":[]},"bp":{"u":[],"am":["u"],"lE":[],"G":[]},"cu":{"n":["2"]},"cL":{"W":["2"]},"dA":{"I":["2"],"z":["2"],"cu":["1","2"],"n":["2"]},"cM":{"dA":["1","2"],"I":["2"],"z":["2"],"cu":["1","2"],"n":["2"],"I.E":"2","n.E":"2"},"d1":{"M":[]},"aJ":{"n":["1"]},"Q":{"aJ":["1"],"n":["1"]},"dt":{"Q":["1"],"aJ":["1"],"n":["1"],"Q.E":"1","n.E":"1"},"ao":{"W":["1"]},"d6":{"n":["2"],"n.E":"2"},"d7":{"W":["2"]},"O":{"Q":["2"],"aJ":["2"],"n":["2"],"Q.E":"2","n.E":"2"},"a5":{"n":["1"],"n.E":"1"},"K":{"W":["1"]},"dn":{"Q":["1"],"aJ":["1"],"n":["1"],"Q.E":"1","n.E":"1"},"E":{"bk":[],"aM":[]},"dJ":{"bk":[],"aM":[]},"dK":{"bk":[],"aM":[]},"cy":{"bk":[],"aM":[]},"bV":{"cx":[],"aM":[]},"cQ":{"dv":["1","2"],"cz":["1","2"],"ci":["1","2"],"dT":["1","2"],"ay":["1","2"]},"cP":{"ay":["1","2"]},"V":{"cP":["1","2"],"ay":["1","2"]},"bR":{"n":["1"],"n.E":"1"},"bS":{"W":["1"]},"cR":{"bf":["1"],"bv":["1"],"n":["1"]},"aZ":{"cR":["1"],"bf":["1"],"bv":["1"],"n":["1"]},"de":{"bg":[],"M":[]},"eD":{"M":[]},"fh":{"M":[]},"dN":{"bw":[]},"bn":{"bH":[]},"ee":{"bH":[]},"ef":{"bH":[]},"fe":{"bH":[]},"fb":{"bH":[]},"c8":{"bH":[]},"f3":{"M":[]},"b8":{"bK":["1","2"],"lv":["1","2"],"ay":["1","2"]},"ba":{"aJ":["1"],"n":["1"],"n.E":"1"},"d3":{"W":["1"]},"aS":{"aJ":["1"],"n":["1"],"n.E":"1"},"bb":{"W":["1"]},"b9":{"aJ":["ae<1,2>"],"n":["ae<1,2>"],"n.E":"ae<1,2>"},"d2":{"W":["ae<1,2>"]},"bk":{"aM":[]},"cx":{"aM":[]},"cj":{"N":[],"G":[]},"dc":{"N":[]},"eJ":{"N":[],"G":[]},"a9":{"aw":["1"],"N":[]},"da":{"I":["q"],"a9":["q"],"z":["q"],"aw":["q"],"N":[],"n":["q"],"an":["q"]},"db":{"I":["i"],"a9":["i"],"z":["i"],"aw":["i"],"N":[],"n":["i"],"an":["i"]},"d9":{"hp":[],"I":["q"],"a9":["q"],"z":["q"],"aw":["q"],"N":[],"n":["q"],"an":["q"],"G":[],"I.E":"q"},"eK":{"hq":[],"I":["q"],"a9":["q"],"z":["q"],"aw":["q"],"N":[],"n":["q"],"an":["q"],"G":[],"I.E":"q"},"eL":{"I":["i"],"a9":["i"],"z":["i"],"aw":["i"],"N":[],"n":["i"],"an":["i"],"G":[],"I.E":"i"},"eM":{"I":["i"],"a9":["i"],"z":["i"],"aw":["i"],"N":[],"n":["i"],"an":["i"],"G":[],"I.E":"i"},"eN":{"I":["i"],"a9":["i"],"z":["i"],"aw":["i"],"N":[],"n":["i"],"an":["i"],"G":[],"I.E":"i"},"eO":{"I":["i"],"a9":["i"],"z":["i"],"aw":["i"],"N":[],"n":["i"],"an":["i"],"G":[],"I.E":"i"},"eP":{"I":["i"],"a9":["i"],"z":["i"],"aw":["i"],"N":[],"n":["i"],"an":["i"],"G":[],"I.E":"i"},"dd":{"I":["i"],"a9":["i"],"z":["i"],"aw":["i"],"N":[],"n":["i"],"an":["i"],"G":[],"I.E":"i"},"eQ":{"du":[],"I":["i"],"a9":["i"],"z":["i"],"aw":["i"],"N":[],"n":["i"],"an":["i"],"G":[],"I.E":"i"},"fz":{"M":[]},"dO":{"bg":[],"M":[]},"bl":{"W":["1"]},"bz":{"n":["1"],"n.E":"1"},"aH":{"M":[]},"dz":{"fu":["1"]},"Y":{"bI":["1"]},"dX":{"m1":[]},"fK":{"dX":[],"m1":[]},"dB":{"bK":["1","2"],"ay":["1","2"]},"dE":{"dB":["1","2"],"bK":["1","2"],"ay":["1","2"]},"dC":{"aJ":["1"],"n":["1"],"n.E":"1"},"dD":{"W":["1"]},"aX":{"bf":["1"],"lx":["1"],"bv":["1"],"n":["1"]},"bT":{"W":["1"]},"bK":{"ay":["1","2"]},"ci":{"ay":["1","2"]},"dv":{"cz":["1","2"],"ci":["1","2"],"dT":["1","2"],"ay":["1","2"]},"bf":{"bv":["1"],"n":["1"]},"dL":{"bf":["1"],"bv":["1"],"n":["1"]},"dw":{"bf":["1"],"fT":["1"],"bv":["1"],"n":["1"]},"bF":{"am":["bF"]},"q":{"aj":[],"am":["aj"]},"i":{"aj":[],"am":["aj"]},"z":{"n":["1"]},"aj":{"am":["aj"]},"bv":{"n":["1"]},"u":{"am":["u"],"lE":[]},"e4":{"M":[]},"bg":{"M":[]},"aY":{"M":[]},"di":{"M":[]},"ew":{"M":[]},"dx":{"M":[]},"fg":{"M":[]},"cr":{"M":[]},"eg":{"M":[]},"eS":{"M":[]},"ds":{"M":[]},"fR":{"bw":[]},"az":{"bd":[]},"aB":{"bd":[]},"b1":{"bd":[]},"b_":{"bd":[]},"eT":{"bd":[]},"bG":{"ec":[]},"bt":{"ec":[]},"cq":{"ec":[]},"eo":{"nM":[]},"bx":{"aK":[]},"dj":{"nP":[]},"f1":{"nR":[]},"fS":{"aK":[]},"fG":{"nO":[]},"fA":{"n4":[]},"f4":{"nT":[]},"au":{"am":["au"]},"as":{"am":["as"]},"cJ":{"F":[]},"fs":{"B":[]},"e9":{"F":[]},"ft":{"B":[]},"ei":{"F":[]},"fv":{"B":[]},"cS":{"F":[]},"fx":{"B":[]},"ek":{"F":[]},"fy":{"B":[]},"ev":{"F":[]},"fC":{"B":[]},"d8":{"F":[]},"fE":{"B":[]},"eb":{"nN":[]},"dg":{"F":[]},"fH":{"B":[]},"f_":{"F":[]},"fI":{"B":[]},"f7":{"F":[]},"fM":{"B":[]},"f8":{"F":[]},"fN":{"B":[]},"fa":{"F":[]},"fP":{"B":[]},"f9":{"F":[]},"fO":{"B":[]},"fk":{"F":[]},"fU":{"B":[]},"fl":{"F":[]},"fW":{"B":[]},"fV":{"B":[]},"fo":{"F":[]},"fZ":{"B":[]},"fj":{"bJ":["a"],"bJ.T":"a"},"ex":{"b3":[]},"ej":{"n0":[]},"bm":{"aQ":[]},"fm":{"n6":[]},"n9":{"z":["i"],"n":["i"]},"du":{"z":["i"],"n":["i"]},"o_":{"z":["i"],"n":["i"]},"n7":{"z":["i"],"n":["i"]},"nY":{"z":["i"],"n":["i"]},"n8":{"z":["i"],"n":["i"]},"nZ":{"z":["i"],"n":["i"]},"hp":{"z":["q"],"n":["q"]},"hq":{"z":["q"],"n":["q"]}}'))
A.ov(v.typeUniverse,JSON.parse('{"dY":2,"a9":1,"dL":1,"dU":1}'))
var u={l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",b:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nuniform vec3 uClearColor;\nuniform vec3 uSkyHorizon;\nuniform vec3 uSkyZenith;\nuniform vec3 uSkyGround;\nuniform float uSkyEnabled;\nuniform float uSkyHorizonGlow;\nuniform float uSkyStarDensity;\nuniform sampler2D uSkyTexture;\nuniform float uSkyTextureEnabled;\nuniform float uSkyRotation;\nuniform float uSkyExposure;\nuniform float uSkyTextureSrgb;\nuniform mat4 uInverseProjection;\nuniform mat4 uInverseView;\nuniform vec3 uCameraPosition;\nuniform float uCloudCoverage;\nuniform float uCloudDensity;\nuniform float uCloudBaseHeight;\nuniform float uCloudThickness;\nuniform float uCloudScale;\nuniform vec2 uCloudWind;\nuniform float uCloudPhase;\nuniform float uCloudDetail;\nuniform float uCloudSilverLining;\nuniform float uCloudSampleCount;\nuniform vec3 uCloudLightDirection;\nuniform vec3 uCloudLightColor;\nuniform float uCloudLightIntensity;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 acesToneMap(vec3 color){\n  return clamp((color*(2.51*color+0.03))/(color*(2.43*color+0.59)+0.14),0.0,1.0);\n}\n\nvec3 agxToneMap(vec3 color){\n  const mat3 agxMat=mat3(\n    0.842479062253094,0.0423282422610123,0.0423756549057051,\n    0.0784335999999992,0.878468636469772,0.0784336,\n    0.0792237451477643,0.0791661274605434,0.879142973793104\n  );\n  const mat3 agxMatInv=mat3(\n    1.19687902425764,-0.0528968517032958,-0.0529716355080549,\n    -0.0980208811401368,1.15190312990417,-0.0980434501171241,\n    -0.0990297440797205,-0.0989611768448433,1.15107367264185\n  );\n  vec3 val=agxMat*color;\n  val=clamp(log2(max(val,vec3(1e-10)))*0.0625+0.625,0.0,1.0);\n  val=val*val*val*(val*(val*6.0-15.0)+10.0);\n  val=agxMatInv*val;\n  return max(val,vec3(0.0));\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nvec3 skyBackground(vec2 uv){\n  // A deliberately cheap, high-quality fallback sky: three atmospheric bands\n  // provide depth at every camera angle, while the tiny deterministic star\n  // field and horizon glow keep the clear background from reading as a flat\n  // color. It is an environment layer, not a game/weather simulation.\n  float lower=smoothstep(0.0,0.48,uv.y);\n  float upper=smoothstep(0.42,1.0,uv.y);\n  vec3 color=mix(uSkyGround,uSkyHorizon,lower);\n  color=mix(color,uSkyZenith,upper);\n  float horizonGlow=exp(-pow((uv.y-0.48)*7.0,2.0));\n  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);\n  float starMask=smoothstep(0.62,0.92,uv.y);\n  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),hash(floor(uv*vec2(180.0,100.0))))*starMask;\n  color+=vec3(0.16,0.19,0.24)*stars;\n  return max(color,vec3(0.0));\n}\n\nfloat hash3(vec3 p){\n  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);\n}\n\nfloat valueNoise(vec3 p){\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  f=f*f*(3.0-2.0*f);\n  float n000=hash3(i+vec3(0,0,0));\n  float n100=hash3(i+vec3(1,0,0));\n  float n010=hash3(i+vec3(0,1,0));\n  float n110=hash3(i+vec3(1,1,0));\n  float n001=hash3(i+vec3(0,0,1));\n  float n101=hash3(i+vec3(1,0,1));\n  float n011=hash3(i+vec3(0,1,1));\n  float n111=hash3(i+vec3(1,1,1));\n  float x00=mix(n000,n100,f.x);\n  float x10=mix(n010,n110,f.x);\n  float x01=mix(n001,n101,f.x);\n  float x11=mix(n011,n111,f.x);\n  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);\n}\n\nfloat cloudNoise(vec3 p){\n  float value=0.0;\n  float amplitude=0.5;\n  for(int octave=0;octave<4;octave++){\n    value+=valueNoise(p)*amplitude;\n    p=p*2.03+vec3(17.3,11.7,7.1);\n    amplitude*=0.5;\n  }\n  return value;\n}\n\nfloat cloudDensityAt(vec3 position){\n  float height01=clamp(\n    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),\n    0.0,1.0\n  );\n  float vertical=smoothstep(0.0,0.12,height01)*\n    (1.0-smoothstep(0.72,1.0,height01));\n  vec3 q=position*max(uCloudScale,0.00001)+\n    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);\n  float macro=cloudNoise(q*0.82);\n  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));\n  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));\n  float threshold=1.0-clamp(uCloudCoverage,0.,1.);\n  float body=smoothstep(threshold,threshold+0.26,shape);\n  return body*vertical*clamp(uCloudDensity,0.,1.);\n}\n\nvec4 volumetricClouds(vec3 worldDirection){\n  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){\n    return vec4(0.0);\n  }\n  float directionY=max(worldDirection.y,0.001);\n  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;\n  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;\n  startT=max(startT,0.0);\n  endT=max(endT,0.0);\n  if(endT<=startT) return vec4(0.0);\n  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));\n  float stepLength=(endT-startT)/float(sampleCount);\n  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;\n  vec3 sunDirection=normalize(-uCloudLightDirection);\n  float transmittance=1.0;\n  vec3 inScatter=vec3(0.0);\n  for(int i=0;i<24;i++){\n    if(i>=sampleCount) break;\n    float t=startT+(float(i)+0.5)*stepLength+jitter;\n    vec3 position=uCameraPosition+worldDirection*t;\n    float density=cloudDensityAt(position);\n    float opticalDepth=density*stepLength*0.0035;\n    float segmentAlpha=1.0-exp(-opticalDepth);\n    float towardLight=cloudDensityAt(position+sunDirection*90.0);\n    float lightTransmittance=exp(-towardLight*0.025);\n    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);\n    vec3 ambient=uSkyHorizon*0.32;\n    vec3 direct=uCloudLightColor*\n      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;\n    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;\n    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);\n    inScatter+=transmittance*segmentAlpha*sampleLight;\n    transmittance*=1.0-segmentAlpha;\n    if(transmittance<0.01) break;\n  }\n  return vec4(inScatter,1.0-transmittance);\n}\n\nvec3 srgbToLinear(vec3 color){\n  vec3 low=color/12.92;\n  vec3 high=pow((color+0.055)/1.055,vec3(2.4));\n  return mix(low,high,step(vec3(0.04045),color));\n}\n\nvec3 worldDirectionForUv(vec2 uv){\n  vec2 ndc=uv*2.0-1.0;\n  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);\n  return normalize(viewPoint.xyz/viewPoint.w);\n}\n\nvec3 equirectangularSky(vec2 uv){\n  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);\n  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;\n  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));\n  vec2 sampleUv=vec2(\n    fract(longitude/(2.0*3.14159265359)+0.5),\n    0.5-latitude/3.14159265359\n  );\n  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));\n  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));\n  return linear*max(uSkyExposure,0.0);\n}\n\nvoid main(){\n  vec4 source=texture(uTex,vUv);\n  // The world pass clears untouched pixels to uClearColor. Replace only that\n  // exact background, so the sky is always active without covering geometry.\n  if(uSkyEnabled>0.5 && distance(source.rgb,uClearColor)<0.004){\n    vec3 viewDirection=worldDirectionForUv(vUv);\n    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);\n    source.rgb=uSkyTextureEnabled>0.5\n      ? equirectangularSky(vUv)\n      : skyBackground(vUv);\n    vec4 clouds=volumetricClouds(worldDirection);\n    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;\n  }\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  vec3 mapped=uToneMap>3.0\n    ?agxToneMap(color)\n    :(uToneMap>1.5?acesToneMap(color):reinhardToneMap(color));\n  float toneMix=uToneMap>3.0\n    ?clamp(uToneMap-3.0,0.,1.)\n    :(uToneMap>1.5?clamp(uToneMap-1.5,0.,1.):clamp(uToneMap,0.,1.));\n  color=mix(color,mapped,toneMix);\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  // Atmospheric precipitation is submitted as depth-tested world geometry;\n  // the present pass must never paint weather over unrelated surfaces.\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",k:"WebGl2Device: operation attempted while context is not ready"}
var t=(function rtii(){var s=A.bB
return{v:s("aH"),g0:s("as"),fW:s("ea"),do:s("c9"),e8:s("am<@>"),dN:s("cO"),I:s("V<u,i>"),P:s("aZ<u>"),df:s("bF"),Q:s("M"),B:s("hp"),gN:s("hq"),o:s("X"),Z:s("bH"),j:s("aQ"),gL:s("b_"),cr:s("n<cO>"),bM:s("n<q>"),hf:s("n<@>"),fA:s("r<e7>"),J:s("r<aQ>"),b7:s("r<ad>"),gk:s("r<b7>"),d9:s("r<b_>"),e9:s("r<bJ<@>>"),r:s("r<z<i>>"),cU:s("r<J>"),dV:s("r<bM>"),h:s("r<bu>"),eT:s("r<cl>"),be:s("r<+(u,a)>"),cw:s("r<+influence,light(q,av)>"),gg:s("r<+influence,source(q,dy)>"),E:s("r<F>"),u:s("r<B>"),cR:s("r<dj>"),C:s("r<o>"),c4:s("r<be>"),dR:s("r<aK>"),D:s("r<b3>"),aM:s("r<a_<as>>"),c1:s("r<a_<au>>"),w:s("r<av>"),s:s("r<u>"),ek:s("r<ag>"),G:s("r<a>"),az:s("r<dy>"),cL:s("r<fF>"),ha:s("r<by<aT>>"),c9:s("r<by<bs>>"),aO:s("r<by<be>>"),fq:s("r<by<b4>>"),n:s("r<q>"),gn:s("r<@>"),t:s("r<i>"),T:s("cY"),m:s("N"),cj:s("bq"),aU:s("aw<@>"),a3:s("bJ<@>"),c:s("b0<a>"),_:s("z<ad>"),O:s("z<J>"),dy:s("z<u>"),aH:s("z<@>"),bW:s("z<i>"),ao:s("ae<u,X>"),bS:s("ay<u,aQ>"),a1:s("ay<u,J>"),fm:s("O<a,a>"),eL:s("b1"),cA:s("az"),a:s("a1"),K:s("y"),fy:s("au"),z:s("J"),eD:s("cl"),W:s("aA"),gT:s("q1"),bQ:s("+()"),ai:s("+(az,bs)"),dU:s("+(aB,b4)"),fk:s("+influence,light(q,av)"),eS:s("+influence,source(q,dy)"),g7:s("B"),b0:s("b2<b_,be>"),ex:s("b2<b1,aT>"),cE:s("b2<az,bs>"),g2:s("b2<aB,b4>"),L:s("o"),Y:s("aK"),dB:s("b3"),U:s("bv<u>"),cJ:s("bv<i>"),d:s("a_<as>"),k:s("a_<au>"),l:s("bw"),d5:s("af"),N:s("u"),aj:s("aB"),dm:s("G"),eK:s("bg"),ak:s("bO"),am:s("dw<u>"),bw:s("fi"),b:s("a"),dO:s("a(a)"),p:s("ah"),fl:s("a5<ah>"),an:s("K<ah>"),aQ:s("ct"),e:s("Y<@>"),cd:s("Y<~>"),hg:s("dE<y?,y?>"),cm:s("bx"),a8:s("cw"),V:s("dV"),R:s("dW"),y:s("w"),d6:s("w(c6)"),al:s("w(y)"),fg:s("w(ah)"),i:s("q"),A:s("@"),fO:s("@()"),x:s("@(y)"),f:s("@(y,bw)"),S:s("i"),eB:s("ca?"),eH:s("bI<a1>?"),du:s("r<y?>?"),bX:s("N?"),c3:s("z<bu>?"),X:s("y?"),ac:s("df?"),bG:s("dr?"),dk:s("u?"),aD:s("du?"),F:s("bQ<@,@>?"),g:s("fD?"),fQ:s("w?"),cD:s("q?"),h6:s("i?"),cg:s("aj?"),a4:s("~(cc)?"),q:s("aj"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.bU=J.ey.prototype
B.a=J.r.prototype
B.d=J.cX.prototype
B.c=J.cg.prototype
B.w=J.bp.prototype
B.bV=J.bq.prototype
B.bW=J.d_.prototype
B.a5=A.d9.prototype
B.aM=J.eU.prototype
B.an=J.bO.prototype
B.f8=new A.h5(0,"opaque")
B.bb=new A.e6(0,"world")
B.aq=new A.e6(1,"camera")
B.O=new A.ha(0,"add")
B.bc=new A.c7(0,"zero")
B.L=new A.c7(1,"one")
B.C=new A.e8(0,"alpha")
B.bf=new A.e8(1,"additive")
B.f9=new A.hi()
B.ar=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.bg=function() {
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
B.bl=function(getTagFallback) {
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
B.bh=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.bk=function(hooks) {
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
B.bj=function(hooks) {
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
B.bi=function(hooks) {
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
B.as=function(hooks) { return hooks; }

B.l=new A.y()
B.bm=new A.eS()
B.k=new A.iE()
B.f=new A.a(0,1,0)
B.o=new A.a(0,-1,0)
B.N=new A.x(1,1,1)
B.bn=new A.av()
B.eU=new A.bj(0,"position")
B.eZ=new A.ah(B.eU,0,3)
B.b8=new A.bj(1,"normal")
B.f_=new A.ah(B.b8,3,3)
B.ap=new A.bj(6,"tangent4")
B.f3=new A.ah(B.ap,6,4)
B.eV=new A.bj(2,"color")
B.f0=new A.ah(B.eV,10,4)
B.eW=new A.bj(4,"alpha")
B.f1=new A.ah(B.eW,14,1)
B.eX=new A.bj(5,"uv0")
B.f2=new A.ah(B.eX,15,2)
B.eY=new A.bj(8,"legacyMaterialEffect")
B.f4=new A.ah(B.eY,17,1)
B.H=s([B.eZ,B.f_,B.f3,B.f0,B.f1,B.f2,B.f4],A.bB("r<ah>"))
B.bo=new A.iO()
B.bp=new A.iT()
B.x=new A.fK()
B.P=new A.fR()
B.D=new A.cN(0,"colorOnly")
B.at=new A.cN(1,"colorAndDepth")
B.Y=new A.cN(2,"depthOnly")
B.Z=new A.hc(1,"srgb")
B.Q=new A.hf(1,"back")
B.R=new A.hj(0,"less")
B.eN=new A.a(0.6,-1,0.4)
B.c2=new A.x(1,0.95,0.88)
B.bq=new A.ca(B.eN,B.c2,2.4)
B.G=new A.cT(0,"opaque")
B.br=new A.cT(1,"masked")
B.S=new A.cT(2,"blended")
B.au=new A.cb(!1,B.R,!1,!0,B.L,B.L,B.O,!1,B.Q,!0,!1,!0,!0,!0,!0,!1)
B.bs=new A.cb(!0,B.R,!1,!0,B.L,B.L,B.O,!0,B.Q,!0,!1,!0,!0,!0,!0,!1)
B.bd=new A.c7(2,"srcAlpha")
B.be=new A.c7(3,"oneMinusSrcAlpha")
B.bt=new A.cb(!0,B.R,!1,!0,B.bd,B.be,B.O,!0,B.Q,!0,!1,!0,!0,!0,!0,!1)
B.c8=new A.x(0.03,0.03,0.04)
B.E=new A.x(0,0,0)
B.cG=s([],t.h)
B.a3=s([],t.w)
B.cH=s([],t.az)
B.cI=s([],A.bB("r<q3>"))
B.bu=new A.en(B.c8,B.E,0,1,null,null,B.N,0.02,0,0.7,0.35,1,12,1,1,1,1,1,1,1,0.003,B.E,0,0,B.N,0,null,B.cG,B.a3,B.cH,B.cI,null)
B.bv=new A.X(0,0,0)
B.bw=new A.cd(0,"idle")
B.M=new A.cd(1,"active")
B.bx=new A.cd(2,"ended")
B.by=new A.cd(3,"aborted")
B.av=new A.cV(0,"outside")
B.bz=new A.cV(1,"intersects")
B.bA=new A.cV(2,"inside")
B.bB=new A.eq(0,"vertex")
B.aw=new A.eq(1,"indices")
B.ax=new A.hy(0,"staticDraw")
B.h=new A.er(0,"ready")
B.T=new A.er(1,"lost")
B.bC=new A.ce(0,"color")
B.ay=new A.ce(1,"colorAndGlow")
B.bD=new A.ce(2,"colorDepthGlow")
B.a_=new A.ce(3,"depthOnly")
B.a0=new A.et(1,"linear")
B.bG=new A.eu(0,"clampToEdge")
B.bE=new A.es(1,1,1,!1,B.a0,B.a0,B.bG,1)
B.bF=new A.et(2,"linearMipmapLinear")
B.bH=new A.eu(1,"repeat")
B.bI=new A.b6(0,"beforeShadow")
B.bJ=new A.b6(2,"beforeDepth")
B.a1=new A.b6(3,"afterDepth")
B.az=new A.b6(4,"beforeWorld")
B.bK=new A.b6(5,"afterWorld")
B.z=new A.b6(6,"afterResolve")
B.bL=new A.b6(9,"beforePresent")
B.aA=new A.aR(0,"readBeforeWrite")
B.bM=new A.aR(1,"duplicateWriter")
B.bN=new A.aR(2,"sampledMultisampledAttachment")
B.a2=new A.aR(3,"invalidResolve")
B.bO=new A.aR(4,"formatOrSizeMismatch")
B.bP=new A.aR(5,"unversionedReadWrite")
B.bQ=new A.aR(6,"invalidHistoryRead")
B.bR=new A.aR(7,"dependencyCycle")
B.bS=new A.aR(8,"missingCapability")
B.aB=new A.cf(0,"wrongKind")
B.aC=new A.cf(1,"staleGeneration")
B.bT=new A.cf(2,"doubleRelease")
B.U=new A.cf(3,"releasedResource")
B.fa=new A.x(0.25,0.55,1)
B.aD=new A.x(0.02,0.03,0.05)
B.c_=new A.x(0.06,0.08,0.12)
B.c0=new A.x(1,0.25,0.25)
B.c1=new A.x(0.08,0.02,0.04)
B.fb=new A.x(0.06,0.08,0.11)
B.c3=new A.x(0.22,0.48,0.95)
B.c4=new A.x(0.95,0.12,0.22)
B.fc=new A.x(0.1,0.12,0.15)
B.c5=new A.x(0.25,0.5,1)
B.c6=new A.x(0.04,0.05,0.07)
B.c7=new A.x(0.04,0.08,0.16)
B.fd=new A.x(0.05,0.07,0.1)
B.ca=new A.x(0.92,0.35,0.25)
B.cb=new A.x(0.1,0.85,0.45)
B.cc=new A.x(0.18,0.42,0.98)
B.cd=new A.x(0.2,1,0.45)
B.fe=new A.x(0.85,0.85,0.88)
B.ce=new A.x(0.2,0.85,1)
B.cf=new A.x(0.03,0.04,0.06)
B.cg=new A.x(0.72,0.18,0.92)
B.aE=new A.x(0.015,0.02,0.03)
B.ch=new A.x(1,0.85,0.35)
B.ci=new A.x(0.98,0.12,0.22)
B.ck=new A.x(0.1,0.88,0.42)
B.cl=new A.x(0.7,0.8,1)
B.ff=new A.x(0.25,0.75,1)
B.cn=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.cq=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale","uShadowMapTexelSize","uShadowFilterRadius","uShadowBias","uReflectionColor","uReflectionIntensity","uReflectionConfidence","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uSpecularScale","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness","uSurfaceSnowCoverage","uSurfaceDissolution","uThermalSourceCount","uThermalSourcePosition0","uThermalSourceRadius0","uThermalSourceDissolution0","uThermalSourcePosition1","uThermalSourceRadius1","uThermalSourceDissolution1","uThermalSourcePosition2","uThermalSourceRadius2","uThermalSourceDissolution2","uThermalSourcePosition3","uThermalSourceRadius3","uThermalSourceDissolution3"],t.s)
B.cs=s(["uQuantizationBits","uDitherStrength"],t.s)
B.ct=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.cv=s(["uNear","uFar","uLightDir","uLightColor","uShaftIntensity","uFogDensity","uAnisotropy","uViewProjection","uView","uInverseProjection","uVolumetricAlbedo","uVolumetricHeightFalloff","uVolumetricDustDensity","uVolumetricJitter","uVolumetricIntensity","uVolumetricSampleCount"],t.s)
B.cE=s([3,11,7,19,5],t.t)
B.cz=s([7,11,10,8,17],t.t)
B.cM=s([11,3,13,15,10],t.t)
B.co=s([3,5,9,12,13],t.t)
B.cm=s([5,19,14,4,9],t.t)
B.cC=s([19,7,17,1,14],t.t)
B.cA=s([2,12,9,4,8],t.t)
B.cK=s([2,8,10,15,6],t.t)
B.cB=s([6,15,13,0,16],t.t)
B.cu=s([16,0,1,17,8],t.t)
B.cp=s([14,1,0,18,4],t.t)
B.cr=s([2,6,16,18,12],t.t)
B.cw=s([B.cE,B.cz,B.cM,B.co,B.cm,B.cC,B.cA,B.cK,B.cB,B.cu,B.cp,B.cr],t.r)
B.cx=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.cy=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.b7=new A.a(0,0.35,0)
B.fk=new A.j1(A.pq())
B.bZ=new A.b0(0,B.b7,t.c)
B.eQ=new A.a(0,0.65,0)
B.bY=new A.b0(2,B.eQ,t.c)
B.bX=new A.b0(4,B.b7,t.c)
B.aF=s([B.bZ,B.bY,B.bX],A.bB("r<b0<a>>"))
B.cD=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale"],t.s)
B.cF=s([],t.u)
B.a6=new A.cm(2,"high")
B.dg={shadows:0,ssao:1,bloom:2,dof:3,grade:4,volumetric:5}
B.dS=new A.aZ(B.dg,6,t.P)
B.dy=new A.aA(B.a6,B.dS)
B.d9={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.dP=new A.aZ(B.d9,5,t.P)
B.aP=new A.aA(B.a6,B.dP)
B.dv=new A.cm(1,"standard")
B.dh={shadows:0}
B.dT=new A.aZ(B.dh,1,t.P)
B.dx=new A.aA(B.dv,B.dT)
B.aN=new A.cm(0,"safe")
B.aL={}
B.ab=new A.aZ(B.aL,0,t.P)
B.aO=new A.aA(B.aN,B.ab)
B.a4=s([B.dy,B.aP,B.dx,B.aO],A.bB("r<aA>"))
B.cJ=s(["uExposure","uVignette","uGrain","uOutputEncoding","uToneMap","uClearColor","uSkyHorizon","uSkyZenith","uSkyGround","uSkyEnabled","uSkyHorizonGlow","uSkyStarDensity","uSkyTexture","uSkyTextureEnabled","uSkyRotation","uSkyExposure","uSkyTextureSrgb","uInverseProjection","uInverseView","uCameraPosition","uCloudCoverage","uCloudDensity","uCloudBaseHeight","uCloudThickness","uCloudScale","uCloudWind","uCloudPhase","uCloudDetail","uCloudSilverLining","uCloudSampleCount","uCloudLightDirection","uCloudLightColor","uCloudLightIntensity"],t.s)
B.ac=new A.af(0,"depthTest")
B.ad=new A.af(1,"depthFunc")
B.ae=new A.af(2,"depthWrite")
B.af=new A.af(3,"blendEnable")
B.ag=new A.af(4,"blendFunc")
B.ah=new A.af(5,"blendEquation")
B.ai=new A.af(6,"cullEnable")
B.aj=new A.af(7,"cullFace")
B.aY=new A.af(8,"frontFace")
B.eb=new A.af(9,"stencilEnable")
B.aW=new A.af(10,"colorMask")
B.aX=new A.af(11,"scissorEnable")
B.cL=s([B.ac,B.ad,B.ae,B.af,B.ag,B.ah,B.ai,B.aj,B.aY,B.eb,B.aW,B.aX],A.bB("r<af>"))
B.cN=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.cO=s(["uBloomStrength"],t.s)
B.cP=s(["uLutSize","uStrength"],t.s)
B.cQ=s(["uTexelSize","uNear","uFar"],t.s)
B.aG=s(["uTexelStep"],t.s)
B.cR=s(["uVolumetricStrength"],t.s)
B.cS=new A.eF(0,"once")
B.cT=new A.eF(1,"loop")
B.di={uAlbedo:0}
B.aH=new A.V(B.di,[0],t.I)
B.dq={uSsaoRaw:0,uSceneDepth:1}
B.cU=new A.V(B.dq,[0,1],t.I)
B.dm={uScene:0,uHistory:1}
B.cV=new A.V(B.dm,[0,1],t.I)
B.dd={aPosition:0,aUvMat:1}
B.aI=new A.V(B.dd,[0,4],t.I)
B.dn={uScene:0,uLut:1}
B.cW=new A.V(B.dn,[0,1],t.I)
B.dp={uSource:0}
B.aJ=new A.V(B.dp,[0],t.I)
B.df={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.cX=new A.V(B.df,[0,1,2,3,4,5,6],t.I)
B.db={uSharp:0,uBlurred:1,uSceneDepth:2}
B.cY=new A.V(B.db,[0,1,2],t.I)
B.dr={uTex:0,uSkyTexture:1}
B.cZ=new A.V(B.dr,[0,1],t.I)
B.dj={uBloom:0}
B.d_=new A.V(B.dj,[0],t.I)
B.dk={uSceneDepth:0}
B.aK=new A.V(B.dk,[0],t.I)
B.dl={uScene:0}
B.d0=new A.V(B.dl,[0],t.I)
B.t=new A.V(B.aL,[],t.I)
B.d8={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.d1=new A.V(B.d8,[0,1,2,3,4,5,6],t.I)
B.ds={uVolumetric:0}
B.d2=new A.V(B.ds,[0],t.I)
B.de={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.d3=new A.V(B.de,[0,1,2,3],t.I)
B.fg=new A.eH(0,"srgb")
B.fh=new A.eH(1,"linear")
B.d4=new A.aT("snow_mat",null,0.95,0.98,1,0,null,1,null,0.8,0.1,0,0.2,1,1)
B.d5=new A.aT("asteroid_pbr",null,0.28,0.32,0.42,0,null,1,null,0.65,0.4,0,0.2,1,1)
B.d6=new A.aT("dust_mat",null,0.7,0.85,1,0.5,null,1,null,0.4,0.2,0,0.2,1,1)
B.d7=new A.aT("ember_mat",null,1,0.45,0.08,2.5,null,1,null,0.2,0,0,0.2,1,1)
B.dt=new A.eT(0,1,null)
B.ak=new A.cs(1,"reinhard")
B.du=new A.eV(1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,8,0,0,0,0,0,0,!1,B.ak)
B.dw=new A.cm(4,"shipping")
B.da={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.dR=new A.aZ(B.da,7,t.P)
B.fi=new A.aA(B.dw,B.dR)
B.A=new A.cn(0,0,0,1)
B.a7=new A.co(0,"constructed")
B.dz=new A.co(1,"initializing")
B.a8=new A.co(2,"ready")
B.a9=new A.co(3,"contextLost")
B.e=new A.dm(0,"read")
B.i=new A.dm(1,"write")
B.B=new A.dm(2,"historyRead")
B.p=new A.f0(0,"rgba8")
B.dA=new A.T("dofBlurH",B.p,192,108,1,0)
B.dB=new A.T("dofBlurV",B.p,192,108,1,0)
B.dC=new A.T("dofOutput",B.p,384,216,1,0)
B.aQ=new A.f0(2,"depth24")
B.dD=new A.T("shadowMap",B.aQ,512,512,1,0)
B.dE=new A.T("volumetricLight",B.p,192,108,1,0)
B.dF=new A.T("sceneColor",B.p,384,216,1,1)
B.dG=new A.T("ssaoRaw",B.p,192,108,1,0)
B.dH=new A.T("ssaoBlurred",B.p,192,108,1,0)
B.dI=new A.T("gradeOutput",B.p,384,216,1,0)
B.dJ=new A.T("vhsOutput",B.p,384,216,1,0)
B.dK=new A.T("sceneDepth",B.aQ,384,216,1,0)
B.dL=new A.T("bloomBlurH",B.p,192,108,1,0)
B.dM=new A.T("bloomBlurV",B.p,192,108,1,0)
B.dN=new A.T("present",B.p,384,216,1,0)
B.aa=new A.T("sceneColor",B.p,384,216,1,0)
B.dO=new A.T("ps1Output",B.p,384,216,1,0)
B.dc={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8,volumetric:9}
B.dQ=new A.aZ(B.dc,10,t.P)
B.aT=new A.cp(2,"link")
B.dU=new A.dq(B.aT,"gl.createProgram() returned null")
B.aR=new A.cp(0,"vertex")
B.aS=new A.cp(1,"fragment")
B.aU=new A.cp(3,"validation")
B.dV=new A.f6(0,"full")
B.dW=new A.f6(2,"culled")
B.c9=new A.x(0.12,0.16,0.24)
B.cj=new A.x(0.03,0.06,0.14)
B.dX=new A.dr("showcase_sky",null,B.c9,B.cj,B.aE,0.12,0.005,0,1,!0,0.32,0.4,650,350,0.0012,0,0,0,0.55,0.25,12)
B.dY=new A.ab(0,"polarNight")
B.dZ=new A.ab(1,"astronomicalDawn")
B.e_=new A.ab(10,"civilDusk")
B.e0=new A.ab(11,"nauticalDusk")
B.e1=new A.ab(12,"astronomicalDusk")
B.e2=new A.ab(13,"night")
B.e3=new A.ab(14,"polarDay")
B.e4=new A.ab(2,"nauticalDawn")
B.e5=new A.ab(3,"civilDawn")
B.e6=new A.ab(4,"sunrise")
B.aV=new A.ab(5,"morning")
B.e7=new A.ab(6,"solarNoon")
B.e8=new A.ab(7,"afternoon")
B.e9=new A.ab(8,"goldenHour")
B.ea=new A.ab(9,"sunset")
B.aZ=new A.cs(0,"off")
B.ec=new A.cs(2,"aces")
B.al=new A.cs(3,"agx")
B.r=new A.a(0,0,0)
B.I=new A.ag(B.r,B.A,1)
B.ed=A.aP("pS")
B.ee=A.aP("pT")
B.ef=A.aP("hp")
B.eg=A.aP("hq")
B.eh=A.aP("n7")
B.ei=A.aP("n8")
B.ej=A.aP("n9")
B.ek=A.aP("N")
B.el=A.aP("y")
B.em=A.aP("nY")
B.en=A.aP("nZ")
B.eo=A.aP("o_")
B.ep=A.aP("du")
B.b=new A.bi(0,"float1")
B.J=new A.bi(1,"float2")
B.j=new A.bi(2,"float3")
B.eq=new A.bi(3,"float4")
B.n=new A.bi(4,"mat4")
B.b_=new A.bi(5,"mat4Array")
B.am=new A.f(B.b,0)
B.b0=new A.f(B.b,1)
B.F=new A.bi(6,"sampler")
B.q=new A.f(B.F,0)
B.K=new A.f(B.F,1)
B.b1=new A.f(B.F,2)
B.er=new A.f(B.F,3)
B.es=new A.f(B.F,4)
B.et=new A.f(B.F,5)
B.eu=new A.f(B.F,6)
B.b2=new A.D(0,0)
B.ev=new A.D(0,1)
B.ao=new A.D(0.5,0.5)
B.b3=new A.D(1,0)
B.ew=new A.D(1,1)
B.ex=new A.D(0.5,1)
B.u=new A.a(0,0,1)
B.y=new A.a(0,0,-1)
B.ey=new A.a(0,1,1)
B.b4=new A.a(0,2,5)
B.ez=new A.a(0,2,7)
B.eA=new A.a(0,3,8)
B.eB=new A.a(12,5,12)
B.m=new A.a(1,0,0)
B.eC=new A.a(1,0,1)
B.eD=new A.a(1,1,0)
B.eE=new A.a(20,10,20)
B.eF=new A.a(0,0.2,0)
B.eG=new A.a(0.15,-0.75,0.1)
B.eH=new A.a(8,4,8)
B.eI=new A.a(0.05,0.45,0.02)
B.b5=new A.a(0,0.8,0)
B.eJ=new A.a(1/0,1/0,1/0)
B.eK=new A.a(0.9,-1.9,0.4)
B.eL=new A.a(0.015,-0.015,0.01)
B.eM=new A.a(1,0.3,0.2)
B.V=new A.a(0,0.5,0)
B.eO=new A.a(0.04,-0.03,0.02)
B.eP=new A.a(0.4,-1.2,0.2)
B.b6=new A.a(0,-0.2,-1)
B.v=new A.a(-1,0,0)
B.eR=new A.a(0.3,0.85,0.2)
B.eS=new A.a(0.12,-0.12,0.08)
B.eT=new A.a(-1/0,-1/0,-1/0)
B.fj=new A.iN(0,"position")
B.b9=new A.fr(0,"horizontal")
B.f5=new A.fr(1,"vertical")
B.ba=new A.fw(0,"horizontal")
B.f6=new A.fw(1,"vertical")
B.W=new A.dM(0,"empty")
B.f7=new A.dM(1,"cpuReady")
B.X=new A.dM(4,"released")})();(function staticFields(){$.jd=null
$.aE=A.b([],A.bB("r<y>"))
$.lG=null
$.lh=null
$.lg=null
$.my=null
$.mt=null
$.mA=null
$.jQ=null
$.jW=null
$.l3=null
$.je=A.b([],A.bB("r<z<y>?>"))
$.cA=null
$.e_=null
$.e0=null
$.kV=!1
$.R=B.x
$.lo=2000})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"pV","mF",()=>A.jS("_$dart_dartClosure"))
s($,"pU","l7",()=>A.jS("_$dart_dartClosure_dartJSInterop"))
s($,"qg","mQ",()=>A.b([new J.eA()],A.bB("r<dp>")))
s($,"q4","mG",()=>A.bh(A.iM({
toString:function(){return"$receiver$"}})))
s($,"q5","mH",()=>A.bh(A.iM({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"q6","mI",()=>A.bh(A.iM(null)))
s($,"q7","mJ",()=>A.bh(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"qa","mM",()=>A.bh(A.iM(void 0)))
s($,"qb","mN",()=>A.bh(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"q9","mL",()=>A.bh(A.lQ(null)))
s($,"q8","mK",()=>A.bh(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"qd","mP",()=>A.bh(A.lQ(void 0)))
s($,"qc","mO",()=>A.bh(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"qe","ld",()=>A.oc())
s($,"qf","e2",()=>A.h2(B.el))
s($,"pR","mE",()=>B.aa.cu())
s($,"q_","lc",()=>A.eR(A.b([255,255,255,255],t.t)))
s($,"pX","l9",()=>A.eR(A.b([128,128,255,255],t.t)))
s($,"pW","l8",()=>A.eR(A.b([0,0,0,255],t.t)))
s($,"pY","la",()=>A.eR(A.b([255,255,0,255],t.t)))
s($,"pZ","lb",()=>A.eR(A.b([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.cj,SharedArrayBuffer:A.cj,ArrayBufferView:A.dc,DataView:A.eJ,Float32Array:A.d9,Float64Array:A.eK,Int16Array:A.eL,Int32Array:A.eM,Int8Array:A.eN,Uint16Array:A.eO,Uint32Array:A.eP,Uint8ClampedArray:A.dd,CanvasPixelArray:A.dd,Uint8Array:A.eQ})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.a9.$nativeSuperclassTag="ArrayBufferView"
A.dF.$nativeSuperclassTag="ArrayBufferView"
A.dG.$nativeSuperclassTag="ArrayBufferView"
A.da.$nativeSuperclassTag="ArrayBufferView"
A.dH.$nativeSuperclassTag="ArrayBufferView"
A.dI.$nativeSuperclassTag="ArrayBufferView"
A.db.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.jX
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
