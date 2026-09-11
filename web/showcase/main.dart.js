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
if(a[b]!==s){A.r_(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.b(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.lZ(b)
return new s(c,this)}:function(){if(s===null)s=A.lZ(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.lZ(a).prototype
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
m4(a,b,c,d){return{i:a,p:b,e:c,x:d}},
m0(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.m2==null){A.qK()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.c(A.mX("Return interceptor for "+A.o(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.jW
if(o==null)o=$.jW=A.kA(n)
p=q[o]}if(p!=null)return p
p=A.qQ(a)
if(p!=null)return p
if(typeof a=="function")return B.cp
s=Object.getPrototypeOf(a)
if(s==null)return B.b1
if(s===Object.prototype)return B.b1
if(typeof q=="function"){o=$.jW
if(o==null)o=$.jW=A.kA(n)
Object.defineProperty(q,o,{value:B.aw,enumerable:false,writable:true,configurable:true})
return B.aw}return B.aw},
mr(a,b){if(a<0||a>4294967295)throw A.c(A.aQ(a,0,4294967295,"length",null))
return J.lo(new Array(a),b)},
ms(a,b){if(a<0)throw A.c(A.i("Length must be a non-negative integer: "+a,null))
return A.b(new Array(a),b.h("q<0>"))},
ih(a,b){if(a<0)throw A.c(A.i("Length must be a non-negative integer: "+a,null))
return A.b(new Array(a),b.h("q<0>"))},
lo(a,b){var s=A.b(a,b.h("q<0>"))
s.$flags=1
return s},
oi(a,b){var s=t.e8
return J.md(s.a(a),s.a(b))},
mt(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
oj(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.mt(r))break;++b}return b},
ok(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.d(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.mt(q))break}return b},
ce(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dl.prototype
return J.f6.prototype}if(typeof a=="string")return J.bz.prototype
if(a==null)return J.dm.prototype
if(typeof a=="boolean")return J.f5.prototype
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.dq.prototype
if(typeof a=="bigint")return J.dn.prototype
return a}if(a instanceof A.z)return a
return J.m0(a)},
kz(a){if(typeof a=="string")return J.bz.prototype
if(a==null)return a
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.dq.prototype
if(typeof a=="bigint")return J.dn.prototype
return a}if(a instanceof A.z)return a
return J.m0(a)},
cZ(a){if(a==null)return a
if(Array.isArray(a))return J.q.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.dq.prototype
if(typeof a=="bigint")return J.dn.prototype
return a}if(a instanceof A.z)return a
return J.m0(a)},
qG(a){if(typeof a=="number")return J.cx.prototype
if(typeof a=="string")return J.bz.prototype
if(a==null)return a
if(!(a instanceof A.z))return J.c0.prototype
return a},
qH(a){if(typeof a=="string")return J.bz.prototype
if(a==null)return a
if(!(a instanceof A.z))return J.c0.prototype
return a},
aJ(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.ce(a).a8(a,b)},
li(a,b){if(typeof b==="number")if(Array.isArray(a)||A.qO(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.cZ(a).C(a,b)},
hy(a,b,c){return J.cZ(a).K(a,b,c)},
hz(a,b){return J.cZ(a).i(a,b)},
md(a,b){return J.qG(a).S(a,b)},
lj(a,b){return J.cZ(a).a5(a,b)},
V(a){return J.ce(a).gU(a)},
ac(a){return J.cZ(a).gJ(a)},
bN(a){return J.kz(a).gB(a)},
ev(a){return J.ce(a).gT(a)},
nW(a,b){return J.qH(a).dC(a,b)},
ci(a){return J.ce(a).j(a)},
f2:function f2(){},
f5:function f5(){},
dm:function dm(){},
dp:function dp(){},
bB:function bB(){},
fp:function fp(){},
c0:function c0(){},
bA:function bA(){},
dn:function dn(){},
dq:function dq(){},
q:function q(a){this.$ti=a},
f4:function f4(){},
ii:function ii(a){this.$ti=a},
d2:function d2(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cx:function cx(){},
dl:function dl(){},
f6:function f6(){},
bz:function bz(){}},A={lp:function lp(){},
mu(a){return new A.cy("Field '"+a+"' has been assigned during initialization.")},
om(a){return new A.cy("Field '"+a+"' has not been initialized.")},
ol(a){return new A.cy("Field '"+a+"' has already been initialized.")},
a9(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
fJ(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
cc(a,b,c){return a},
m3(a){var s,r
for(s=$.aI.length,r=0;r<s;++r)if(a===$.aI[r])return!0
return!1},
jl(a,b,c,d){A.j0(b,"start")
if(c!=null){A.j0(c,"end")
if(b>c)A.l(A.aQ(b,0,c,"start",null))}return new A.dT(a,b,c,d.h("dT<0>"))},
f3(){return new A.cK("No element")},
mq(){return new A.cK("Too many elements")},
cO:function cO(){},
d6:function d6(a,b){this.a=a
this.$ti=b},
e_:function e_(){},
d7:function d7(a,b){this.a=a
this.$ti=b},
cy:function cy(a){this.a=a},
jh:function jh(){},
aM:function aM(){},
T:function T(){},
dT:function dT(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
at:function at(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
dv:function dv(a,b,c){this.a=a
this.b=b
this.$ti=c},
dw:function dw(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
M:function M(a,b,c){this.a=a
this.b=b
this.$ti=c},
ab:function ab(a,b,c){this.a=a
this.b=b
this.$ti=c},
Q:function Q(a,b,c){this.a=a
this.b=b
this.$ti=c},
as:function as(){},
dO:function dO(a,b){this.a=a
this.$ti=b},
eo:function eo(){},
ml(a,b,c){var s,r,q,p,o,n,m,l=A.x(a),k=A.bU(new A.bj(a,l.h("bj<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.C)(k),++i,p=o){r=k[i]
c.a(a.C(0,r))
o=p+1
q[r]=p}n=A.bU(new A.aZ(a,l.h("aZ<2>")),!0,c)
m=new A.X(q,n,b.h("@<0>").X(c).h("X<1,2>"))
m.$keys=k
return m}return new A.dd(A.oo(a,b,c),b.h("@<0>").X(c).h("dd<1,2>"))},
o4(){throw A.c(A.c1("Cannot modify constant Set"))},
nI(a){var s=A.nH(a)
if(s!=null)return s
return"minified:"+a},
qO(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
o(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.ci(a)
return s},
ft(a){var s,r=$.mH
if(r==null)r=$.mH=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
oI(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.d(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
dH(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.z.dk(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
fu(a){var s,r,q,p
if(a instanceof A.z)return A.aH(A.cf(a),null)
s=J.ce(a)
if(s===B.co||s===B.cq||t.ak.b(a)){r=B.aC(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aH(A.cf(a),null)},
mK(a){var s,r,q
if(a==null||typeof a=="number"||A.lT(a))return J.ci(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bw)return a.j(0)
if(a instanceof A.aT)return a.cR(!0)
s=$.nV()
for(r=0;r<1;++r){q=s[r].fI(a)
if(q!=null)return q}return"Instance of '"+A.fu(a)+"'"},
cD(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
oG(a){var s=A.cD(a).getUTCFullYear()+0
return s},
oE(a){var s=A.cD(a).getUTCMonth()+1
return s},
oA(a){var s=A.cD(a).getUTCDate()+0
return s},
oB(a){var s=A.cD(a).getUTCHours()+0
return s},
oD(a){var s=A.cD(a).getUTCMinutes()+0
return s},
oF(a){var s=A.cD(a).getUTCSeconds()+0
return s},
oC(a){var s=A.cD(a).getUTCMilliseconds()+0
return s},
oz(a){var s=a.$thrownJsError
if(s==null)return null
return A.d_(s)},
mL(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.Z(a,s)
a.$thrownJsError=s
s.stack=b.j(0)}},
bd(a){throw A.c(A.nz(a))},
d(a,b){if(a==null)J.bN(a)
throw A.c(A.kx(a,b))},
kx(a,b){var s,r="index"
if(!A.nq(b))return new A.b2(!0,b,r,null)
s=A.e(J.bN(a))
if(b<0||b>=s)return A.ig(b,s,a,r)
return new A.cG(null,null,!0,b,r,"Value not in range")},
nz(a){return new A.b2(!0,a,null,null)},
cd(a){return a},
c(a){return A.Z(a,new Error())},
Z(a,b){var s
if(a==null)a=new A.bo()
b.dartException=a
s=A.r0
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
r0(){return J.ci(this.dartException)},
l(a,b){throw A.Z(a,b==null?new Error():b)},
be(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.l(A.pQ(a,b,c),s)},
pQ(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.dX("'"+s+"': Cannot "+o+" "+l+k+n)},
C(a){throw A.c(A.aL(a))},
bp(a){var s,r,q,p,o,n
a=A.qU(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.b([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.jt(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
ju(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
mW(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
lq(a,b){var s=b==null,r=s?null:b.method
return new A.f7(a,r,s?null:b.receiver)},
ch(a){var s
if(a==null)return new A.iy(a)
if(a instanceof A.dh){s=a.a
return A.bM(a,s==null?A.eq(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bM(a,a.dartException)
return A.qq(a)},
bM(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
qq(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.e.eo(r,16)&8191)===10)switch(q){case 438:return A.bM(a,A.lq(A.o(s)+" (Error "+q+")",null))
case 445:case 5007:A.o(s)
return A.bM(a,new A.dD())}}if(a instanceof TypeError){p=$.nL()
o=$.nM()
n=$.nN()
m=$.nO()
l=$.nR()
k=$.nS()
j=$.nQ()
$.nP()
i=$.nU()
h=$.nT()
g=p.ah(s)
if(g!=null)return A.bM(a,A.lq(A.K(s),g))
else{g=o.ah(s)
if(g!=null){g.method="call"
return A.bM(a,A.lq(A.K(s),g))}else if(n.ah(s)!=null||m.ah(s)!=null||l.ah(s)!=null||k.ah(s)!=null||j.ah(s)!=null||m.ah(s)!=null||i.ah(s)!=null||h.ah(s)!=null){A.K(s)
return A.bM(a,new A.dD())}}return A.bM(a,new A.fN(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.dS()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bM(a,new A.b2(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.dS()
return a},
d_(a){var s
if(a instanceof A.dh)return a.b
if(a==null)return new A.ed(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.ed(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
hx(a){if(a==null)return J.V(a)
if(typeof a=="object")return A.ft(a)
return J.V(a)},
qE(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.K(0,a[s],a[r])}return b},
qF(a,b){var s,r=a.length
for(s=0;s<r;++s)b.i(0,a[s])
return b},
q2(a,b,c,d,e,f){t.f.a(a)
switch(A.e(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.c(new A.jJ("Unsupported number of arguments for wrapped closure"))},
cX(a,b){var s=a.$identity
if(!!s)return s
s=A.qx(a,b)
a.$identity=s
return s},
qx(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.q2)},
o3(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fH().constructor.prototype):Object.create(new A.cm(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.mk(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.o_(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.mk(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
o_(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.c("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.nX)}throw A.c("Error in functionType of tearoff")},
o0(a,b,c,d){var s=A.mh
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
mk(a,b,c,d){if(c)return A.o2(a,b,d)
return A.o0(b.length,d,a,b)},
o1(a,b,c,d){var s=A.mh,r=A.nY
switch(b?-1:a){case 0:throw A.c(new A.fy("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
o2(a,b,c){var s,r
if($.mf==null)$.mf=A.me("interceptor")
if($.mg==null)$.mg=A.me("receiver")
s=b.length
r=A.o1(s,c,a,b)
return r},
lZ(a){return A.o3(a)},
nX(a,b){return A.ei(v.typeUniverse,A.cf(a.a),b)},
mh(a){return a.a},
nY(a){return a.b},
me(a){var s,r,q,p=new A.cm("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.c(A.i("Field name "+a+" not found.",null))},
kA(a){return v.getIsolateTag(a)},
nG(){return v.G},
qQ(a){var s,r,q,p,o,n=A.K($.nD.$1(a)),m=$.ky[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.kE[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bv($.ny.$2(a,n))
if(q!=null){m=$.ky[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.kE[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.l8(s)
$.ky[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.kE[n]=s
return s}if(p==="-"){o=A.l8(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.nE(a,s)
if(p==="*")throw A.c(A.mX(n))
if(v.leafTags[n]===true){o=A.l8(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.nE(a,s)},
nE(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.m4(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
l8(a){return J.m4(a,!1,null,!!a.$iaB)},
qS(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.l8(s)
else return J.m4(s,c,null,null)},
qK(){if(!0===$.m2)return
$.m2=!0
A.qL()},
qL(){var s,r,q,p,o,n,m,l
$.ky=Object.create(null)
$.kE=Object.create(null)
A.qJ()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.nF.$1(o)
if(n!=null){m=A.qS(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
qJ(){var s,r,q,p,o,n,m=B.by()
m=A.cW(B.bz,A.cW(B.bA,A.cW(B.aD,A.cW(B.aD,A.cW(B.bB,A.cW(B.bC,A.cW(B.bD(B.aC),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.nD=new A.kB(p)
$.ny=new A.kC(o)
$.nF=new A.kD(n)},
cW(a,b){return a(b)||b},
qy(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
qZ(a,b,c){var s=a.indexOf(b,c)
return s>=0},
qU(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
F:function F(a,b){this.a=a
this.b=b},
e9:function e9(a,b){this.a=a
this.b=b},
ea:function ea(a,b){this.a=a
this.b=b},
cS:function cS(a,b){this.a=a
this.b=b},
c8:function c8(a,b,c){this.a=a
this.b=b
this.c=c},
dd:function dd(a,b){this.a=a
this.$ti=b},
dc:function dc(){},
X:function X(a,b,c){this.a=a
this.b=b
this.$ti=c},
c3:function c3(a,b){this.a=a
this.$ti=b},
c4:function c4(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
de:function de(){},
b3:function b3(a,b,c){this.a=a
this.b=b
this.$ti=c},
dP:function dP(){},
jt:function jt(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dD:function dD(){},
f7:function f7(a,b,c){this.a=a
this.b=b
this.c=c},
fN:function fN(a){this.a=a},
iy:function iy(a){this.a=a},
dh:function dh(a,b){this.a=a
this.b=b},
ed:function ed(a){this.a=a
this.b=null},
bw:function bw(){},
eH:function eH(){},
eI:function eI(){},
fK:function fK(){},
fH:function fH(){},
cm:function cm(a,b){this.a=a
this.b=b},
fy:function fy(a){this.a=a},
bh:function bh(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
ik:function ik(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
bj:function bj(a,b){this.a=a
this.$ti=b},
ds:function ds(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aZ:function aZ(a,b){this.a=a
this.$ti=b},
bk:function bk(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
bi:function bi(a,b){this.a=a
this.$ti=b},
dr:function dr(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
kB:function kB(a){this.a=a},
kC:function kC(a){this.a=a},
kD:function kD(a){this.a=a},
aT:function aT(){},
bs:function bs(){},
cR:function cR(){},
t(a){return a},
fk(a){return new Uint8Array(A.t(a))},
ca(a,b,c){if(a>>>0!==a||a>=c)throw A.c(A.kx(b,a))},
cA:function cA(){},
dB:function dB(){},
fc:function fc(){},
ag:function ag(){},
dz:function dz(){},
dA:function dA(){},
dy:function dy(){},
fd:function fd(){},
fe:function fe(){},
ff:function ff(){},
fg:function fg(){},
fh:function fh(){},
fi:function fi(){},
dC:function dC(){},
fj:function fj(){},
e5:function e5(){},
e6:function e6(){},
e7:function e7(){},
e8:function e8(){},
lz(a,b){var s=b.c
return s==null?b.c=A.eg(a,"bS",[b.x]):s},
mP(a){var s=a.w
if(s===6||s===7)return A.mP(a.x)
return s===11||s===12},
p1(a){return a.as},
bL(a){return A.k2(v.typeUniverse,a,!1)},
cb(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cb(a1,s,a3,a4)
if(r===s)return a2
return A.ne(a1,r,!0)
case 7:s=a2.x
r=A.cb(a1,s,a3,a4)
if(r===s)return a2
return A.nd(a1,r,!0)
case 8:q=a2.y
p=A.cV(a1,q,a3,a4)
if(p===q)return a2
return A.eg(a1,a2.x,p)
case 9:o=a2.x
n=A.cb(a1,o,a3,a4)
m=a2.y
l=A.cV(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.lL(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.cV(a1,j,a3,a4)
if(i===j)return a2
return A.nf(a1,k,i)
case 11:h=a2.x
g=A.cb(a1,h,a3,a4)
f=a2.y
e=A.qn(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.nc(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.cV(a1,d,a3,a4)
o=a2.x
n=A.cb(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.lM(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.c(A.ex("Attempted to substitute unexpected RTI kind "+a0))}},
cV(a,b,c,d){var s,r,q,p,o=b.length,n=A.k3(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cb(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
qo(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.k3(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cb(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
qn(a,b,c,d){var s,r=b.a,q=A.cV(a,r,c,d),p=b.b,o=A.cV(a,p,c,d),n=b.c,m=A.qo(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.h6()
s.a=q
s.b=o
s.c=m
return s},
b(a,b){a[v.arrayRti]=b
return a},
m_(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.qI(s)
return a.$S()}return null},
qM(a,b){var s
if(A.mP(b))if(a instanceof A.bw){s=A.m_(a)
if(s!=null)return s}return A.cf(a)},
cf(a){if(a instanceof A.z)return A.x(a)
if(Array.isArray(a))return A.H(a)
return A.lS(J.ce(a))},
H(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
x(a){var s=a.$ti
return s!=null?s:A.lS(a)},
lS(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.pZ(a,s)},
pZ(a,b){var s=a instanceof A.bw?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.pH(v.typeUniverse,s.name)
b.$ccache=r
return r},
qI(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.k2(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
m1(a){return A.bc(A.x(a))},
lX(a){var s
if(a instanceof A.aT)return a.cB()
s=a instanceof A.bw?A.m_(a):null
if(s!=null)return s
if(t.dm.b(a))return J.ev(a).a
if(Array.isArray(a))return A.H(a)
return A.cf(a)},
bc(a){var s=a.r
return s==null?a.r=new A.k1(a):s},
qD(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.d(q,0)
s=A.ei(v.typeUniverse,A.lX(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.d(q,r)
s=A.nh(v.typeUniverse,s,A.lX(q[r]))}return A.ei(v.typeUniverse,s,a)},
aW(a){return A.bc(A.k2(v.typeUniverse,a,!1))},
pY(a){var s=this
s.b=A.ql(s)
return s.b(a)},
ql(a){var s,r,q,p,o
if(a===t.K)return A.q8
if(A.cg(a))return A.qc
s=a.w
if(s===6)return A.pW
if(s===1)return A.ns
if(s===7)return A.q3
r=A.qk(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cg)){a.f="$i"+q
if(q==="A")return A.q6
if(a===t.m)return A.q5
return A.qb}}else if(s===10){p=A.qy(a.x,a.y)
o=p==null?A.ns:p
return o==null?A.eq(o):o}return A.pU},
qk(a){if(a.w===8){if(a===t.S)return A.nq
if(a===t.i||a===t.r)return A.q7
if(a===t.N)return A.qa
if(a===t.y)return A.lT}return null},
pX(a){var s=this,r=A.pT
if(A.cg(s))r=A.pM
else if(s===t.K)r=A.eq
else if(A.d0(s)){r=A.pV
if(s===t.h6)r=A.pL
else if(s===t.dk)r=A.bv
else if(s===t.fQ)r=A.pK
else if(s===t.cg)r=A.nk
else if(s===t.cD)r=A.lN
else if(s===t.bX)r=A.u}else if(s===t.S)r=A.e
else if(s===t.N)r=A.K
else if(s===t.y)r=A.c9
else if(s===t.r)r=A.aV
else if(s===t.i)r=A.ep
else if(s===t.m)r=A.k
s.a=r
return s.a(a)},
pU(a){var s=this
if(a==null)return A.d0(s)
return A.qP(v.typeUniverse,A.qM(a,s),s)},
pW(a){if(a==null)return!0
return this.x.b(a)},
qb(a){var s,r=this
if(a==null)return A.d0(r)
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.ce(a)[s]},
q6(a){var s,r=this
if(a==null)return A.d0(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.ce(a)[s]},
q5(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.z)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
nr(a){if(typeof a=="object"){if(a instanceof A.z)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
pT(a){var s=this
if(a==null){if(A.d0(s))return a}else if(s.b(a))return a
throw A.Z(A.nl(a,s),new Error())},
pV(a){var s=this
if(a==null||s.b(a))return a
throw A.Z(A.nl(a,s),new Error())},
nl(a,b){return new A.ee("TypeError: "+A.n7(a,A.aH(b,null)))},
n7(a,b){return A.hV(a)+": type '"+A.aH(A.lX(a),null)+"' is not a subtype of type '"+b+"'"},
aU(a,b){return new A.ee("TypeError: "+A.n7(a,b))},
q3(a){var s=this
return s.x.b(a)||A.lz(v.typeUniverse,s).b(a)},
q8(a){return a!=null},
eq(a){if(a!=null)return a
throw A.Z(A.aU(a,"Object"),new Error())},
qc(a){return!0},
pM(a){return a},
ns(a){return!1},
lT(a){return!0===a||!1===a},
c9(a){if(!0===a)return!0
if(!1===a)return!1
throw A.Z(A.aU(a,"bool"),new Error())},
pK(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.Z(A.aU(a,"bool?"),new Error())},
ep(a){if(typeof a=="number")return a
throw A.Z(A.aU(a,"double"),new Error())},
lN(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Z(A.aU(a,"double?"),new Error())},
nq(a){return typeof a=="number"&&Math.floor(a)===a},
e(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.Z(A.aU(a,"int"),new Error())},
pL(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.Z(A.aU(a,"int?"),new Error())},
q7(a){return typeof a=="number"},
aV(a){if(typeof a=="number")return a
throw A.Z(A.aU(a,"num"),new Error())},
nk(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Z(A.aU(a,"num?"),new Error())},
qa(a){return typeof a=="string"},
K(a){if(typeof a=="string")return a
throw A.Z(A.aU(a,"String"),new Error())},
bv(a){if(typeof a=="string")return a
if(a==null)return a
throw A.Z(A.aU(a,"String?"),new Error())},
k(a){if(A.nr(a))return a
throw A.Z(A.aU(a,"JSObject"),new Error())},
u(a){if(a==null)return a
if(A.nr(a))return a
throw A.Z(A.aU(a,"JSObject?"),new Error())},
nv(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aH(a[q],b)
return s},
qf(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.nv(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aH(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
nn(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.b([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.i(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.d(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aH(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aH(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aH(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aH(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aH(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aH(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aH(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aH(a.x,b)+">"
if(l===8){p=A.qp(a.x)
o=a.y
return o.length>0?p+("<"+A.nv(o,b)+">"):p}if(l===10)return A.qf(a,b)
if(l===11)return A.nn(a,b,null)
if(l===12)return A.nn(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.d(b,n)
return b[n]}return"?"},
qp(a){var s=A.nH(a)
if(s!=null)return s
return"minified:"+a},
pI(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
pH(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.k2(a,b,!1)
else if(typeof m=="number"){s=m
r=A.eh(a,5,"#")
q=A.k3(s)
for(p=0;p<s;++p)q[p]=r
o=A.eg(a,b,q)
n[b]=o
return o}else return m},
pG(a,b){return A.ni(a.tR,b)},
pF(a,b){return A.ni(a.eT,b)},
k2(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.ng(a,null,b,!1)
r.set(b,s)
return s},
ei(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.ng(a,b,c,!0)
q.set(c,r)
return r},
nh(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.lL(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
ng(a,b,c,d){return A.px(A.pr(a,b,c,d))},
bK(a,b){b.a=A.pX
b.b=A.pY
return b},
eh(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.b_(null,null)
s.w=b
s.as=c
r=A.bK(a,s)
a.eC.set(c,r)
return r},
ne(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.pD(a,b,r,c)
a.eC.set(r,s)
return s},
pD(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cg(b))if(!(b===t.b||b===t.T))if(s!==6)r=s===7&&A.d0(b.x)
if(r)return b
else if(s===1)return t.b}q=new A.b_(null,null)
q.w=6
q.x=b
q.as=c
return A.bK(a,q)},
nd(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.pB(a,b,r,c)
a.eC.set(r,s)
return s},
pB(a,b,c,d){var s,r
if(d){s=b.w
if(A.cg(b)||b===t.K)return b
else if(s===1)return A.eg(a,"bS",[b])
else if(b===t.b||b===t.T)return t.bH}r=new A.b_(null,null)
r.w=7
r.x=b
r.as=c
return A.bK(a,r)},
pE(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.b_(null,null)
s.w=13
s.x=b
s.as=q
r=A.bK(a,s)
a.eC.set(q,r)
return r},
ef(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
pA(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
eg(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.ef(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.b_(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bK(a,r)
a.eC.set(p,q)
return q},
lL(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.ef(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.b_(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bK(a,o)
a.eC.set(q,n)
return n},
nf(a,b,c){var s,r,q="+"+(b+"("+A.ef(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.b_(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bK(a,s)
a.eC.set(q,r)
return r},
nc(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.ef(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.ef(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.pA(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.b_(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bK(a,p)
a.eC.set(r,o)
return o},
lM(a,b,c,d){var s,r=b.as+("<"+A.ef(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.pC(a,b,c,r,d)
a.eC.set(r,s)
return s},
pC(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.k3(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cb(a,b,r,0)
m=A.cV(a,c,r,0)
return A.lM(a,n,m,c!==m)}}l=new A.b_(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bK(a,l)},
pr(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
px(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.pt(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.n9(a,r,l,k,!1)
else if(q===46)r=A.n9(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.c6(a.u,a.e,k.pop()))
break
case 94:k.push(A.pE(a.u,k.pop()))
break
case 35:k.push(A.eh(a.u,5,"#"))
break
case 64:k.push(A.eh(a.u,2,"@"))
break
case 126:k.push(A.eh(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.pv(a,k)
break
case 38:A.pu(a,k)
break
case 63:p=a.u
k.push(A.ne(p,A.c6(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.nd(p,A.c6(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.ps(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.na(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.py(a.u,a.e,o)
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
return A.c6(a.u,a.e,m)},
pt(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
n9(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.pI(s,o.x)[p]
if(n==null)A.l('No "'+p+'" in "'+A.p1(o)+'"')
d.push(A.ei(s,o,n))}else d.push(p)
return m},
pv(a,b){var s,r=a.u,q=A.n8(a,b),p=b.pop()
if(typeof p=="string")b.push(A.eg(r,p,q))
else{s=A.c6(r,a.e,p)
switch(s.w){case 11:b.push(A.lM(r,s,q,a.n))
break
default:b.push(A.lL(r,s,q))
break}}},
ps(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.n8(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.c6(p,a.e,o)
q=new A.h6()
q.a=s
q.b=n
q.c=m
b.push(A.nc(p,r,q))
return
case-4:b.push(A.nf(p,b.pop(),s))
return
default:throw A.c(A.ex("Unexpected state under `()`: "+A.o(o)))}},
pu(a,b){var s=b.pop()
if(0===s){b.push(A.eh(a.u,1,"0&"))
return}if(1===s){b.push(A.eh(a.u,4,"1&"))
return}throw A.c(A.ex("Unexpected extended operation "+A.o(s)))},
n8(a,b){var s=b.splice(a.p)
A.na(a.u,a.e,s)
a.p=b.pop()
return s},
c6(a,b,c){if(typeof c=="string")return A.eg(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.pw(a,b,c)}else return c},
na(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.c6(a,b,c[s])},
py(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.c6(a,b,c[s])},
pw(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.c(A.ex("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.c(A.ex("Bad index "+c+" for "+b.j(0)))},
qP(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.a4(a,b,null,c,null)
r.set(c,s)}return s},
a4(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.cg(d))return!0
s=b.w
if(s===4)return!0
if(A.cg(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.a4(a,c[b.x],c,d,e))return!0
q=d.w
p=t.b
if(b===p||b===t.T){if(q===7)return A.a4(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.a4(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.a4(a,b.x,c,d,e))return!1
return A.a4(a,A.lz(a,b),c,d,e)}if(s===6)return A.a4(a,p,c,d,e)&&A.a4(a,b.x,c,d,e)
if(q===7){if(A.a4(a,b,c,d.x,e))return!0
return A.a4(a,b,c,A.lz(a,d),e)}if(q===6)return A.a4(a,b,c,p,e)||A.a4(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.f)return!0
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
if(!A.a4(a,j,c,i,e)||!A.a4(a,i,e,j,c))return!1}return A.np(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.np(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.q4(a,b,c,d,e)}if(o&&q===10)return A.q9(a,b,c,d,e)
return!1},
np(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.a4(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.a4(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.a4(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.a4(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.a4(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
q4(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.ei(a,b,r[o])
return A.nj(a,p,null,c,d.y,e)}return A.nj(a,b.y,null,c,d.y,e)},
nj(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.a4(a,b[s],d,e[s],f))return!1
return!0},
q9(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.a4(a,r[s],c,q[s],e))return!1
return!0},
d0(a){var s=a.w,r=!0
if(!(a===t.b||a===t.T))if(!A.cg(a))if(s!==6)r=s===7&&A.d0(a.x)
return r},
cg(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
ni(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
k3(a){return a>0?new Array(a):v.typeUniverse.sEA},
b_:function b_(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
h6:function h6(){this.c=this.b=this.a=null},
k1:function k1(a){this.a=a},
h4:function h4(){},
ee:function ee(a){this.a=a},
pm(){var s,r,q
if(self.scheduleImmediate!=null)return A.qr()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.cX(new A.jF(s),1)).observe(r,{childList:true})
return new A.jE(s,r,q)}else if(self.setImmediate!=null)return A.qs()
return A.qt()},
pn(a){self.scheduleImmediate(A.cX(new A.jG(t.M.a(a)),0))},
po(a){self.setImmediate(A.cX(new A.jH(t.M.a(a)),0))},
pp(a){t.M.a(a)
A.pz(0,a)},
pz(a,b){var s=new A.k_()
s.dJ(a,b)
return s},
lV(a){return new A.fV(new A.a1($.U,a.h("a1<0>")),a.h("fV<0>"))},
lR(a,b){a.$2(0,null)
b.b=!0
return b.a},
lO(a,b){A.pN(a,b)},
lQ(a,b){b.bP(a)},
lP(a,b){b.bQ(A.ch(a),A.d_(a))},
pN(a,b){var s,r,q=new A.k5(b),p=new A.k6(b)
if(a instanceof A.a1)a.cO(q,p,t.A)
else{s=t.A
if(a instanceof A.a1)a.di(q,p,s)
else{r=new A.a1($.U,t.e)
r.a=8
r.c=a
r.cO(q,p,s)}}},
lY(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.U.de(new A.kr(s),t.H,t.S,t.A)},
nb(a,b,c){return 0},
lk(a){var s
if(t.Q.b(a)){s=a.gaU()
if(s!=null)return s}return B.U},
q_(a,b){if($.U===B.C)return null
return null},
q0(a,b){if($.U!==B.C)A.q_(a,b)
if(b==null)if(t.Q.b(a)){b=a.gaU()
if(b==null){A.mL(a,B.U)
b=B.U}}else b=B.U
else if(t.Q.b(a))A.mL(a,b)
return new A.aK(a,b)},
lF(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.e;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.p5()
b.bA(new A.aK(new A.b2(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.cE(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.bc()
b.b8(o.a)
A.cP(b,p)
return}b.a^=2
A.hw(null,null,b.b,t.M.a(new A.jO(o,b)))},
cP(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.lW(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.cP(d.a,c)
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
A.lW(j.a,j.b)
return}g=$.U
if(g!==h)$.U=h
else g=null
c=c.c
if((c&15)===8)new A.jS(q,d,n).$0()
else if(o){if((c&1)!==0)new A.jR(q,j).$0()}else if((c&2)!==0)new A.jQ(d,q).$0()
if(g!=null)$.U=g
c=q.c
if(c instanceof A.a1){p=q.a.$ti
p=p.h("bS<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.bd(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.lF(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.bd(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
qg(a,b){var s
if(t.q.b(a))return b.de(a,t.A,t.K,t.l)
s=t.x
if(s.b(a))return s.a(a)
throw A.c(A.a2(a,"onError",u.c))},
qe(){var s,r
for(s=$.cU;s!=null;s=$.cU){$.es=null
r=s.b
$.cU=r
if(r==null)$.er=null
s.a.$0()}},
qm(){$.lU=!0
try{A.qe()}finally{$.es=null
$.lU=!1
if($.cU!=null)$.mc().$1(A.nA())}},
nw(a){var s=new A.fW(a),r=$.er
if(r==null){$.cU=$.er=s
if(!$.lU)$.mc().$1(A.nA())}else $.er=r.b=s},
qj(a){var s,r,q,p=$.cU
if(p==null){A.nw(a)
$.es=$.er
return}s=new A.fW(a)
r=$.es
if(r==null){s.b=p
$.cU=$.es=s}else{q=r.b
s.b=q
$.es=r.b=s
if(q==null)$.er=s}},
re(a,b){A.cc(a,"stream",t.K)
return new A.hm(b.h("hm<0>"))},
lW(a,b){A.qj(new A.kq(a,b))},
nu(a,b,c,d,e){var s,r=$.U
if(r===c)return d.$0()
$.U=c
s=r
try{r=d.$0()
return r}finally{$.U=s}},
qi(a,b,c,d,e,f,g){var s,r=$.U
if(r===c)return d.$1(e)
$.U=c
s=r
try{r=d.$1(e)
return r}finally{$.U=s}},
qh(a,b,c,d,e,f,g,h,i){var s,r=$.U
if(r===c)return d.$2(e,f)
$.U=c
s=r
try{r=d.$2(e,f)
return r}finally{$.U=s}},
hw(a,b,c,d){t.M.a(d)
if(B.C!==c){d=c.eE(d)
d=d}A.nw(d)},
jF:function jF(a){this.a=a},
jE:function jE(a,b,c){this.a=a
this.b=b
this.c=c},
jG:function jG(a){this.a=a},
jH:function jH(a){this.a=a},
k_:function k_(){},
k0:function k0(a,b){this.a=a
this.b=b},
fV:function fV(a,b){this.a=a
this.b=!1
this.$ti=b},
k5:function k5(a){this.a=a},
k6:function k6(a){this.a=a},
kr:function kr(a){this.a=a},
bt:function bt(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
bJ:function bJ(a,b){this.a=a
this.$ti=b},
aK:function aK(a,b){this.a=a
this.b=b},
h_:function h_(){},
dZ:function dZ(a,b){this.a=a
this.$ti=b},
c2:function c2(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
a1:function a1(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
jL:function jL(a,b){this.a=a
this.b=b},
jP:function jP(a,b){this.a=a
this.b=b},
jO:function jO(a,b){this.a=a
this.b=b},
jN:function jN(a,b){this.a=a
this.b=b},
jM:function jM(a,b){this.a=a
this.b=b},
jS:function jS(a,b,c){this.a=a
this.b=b
this.c=c},
jT:function jT(a,b){this.a=a
this.b=b},
jU:function jU(a){this.a=a},
jR:function jR(a,b){this.a=a
this.b=b},
jQ:function jQ(a,b){this.a=a
this.b=b},
fW:function fW(a){this.a=a
this.b=null},
hm:function hm(a){this.$ti=a},
en:function en(){},
hg:function hg(){},
jY:function jY(a,b){this.a=a
this.b=b},
kq:function kq(a,b){this.a=a
this.b=b},
lG(a,b){var s=a[b]
return s===a?null:s},
lI(a,b,c){if(c==null)a[b]=a
else a[b]=c},
lH(){var s=Object.create(null)
A.lI(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
on(a,b){return new A.bh(a.h("@<0>").X(b).h("bh<1,2>"))},
mw(a,b,c){return b.h("@<0>").X(c).h("mv<1,2>").a(A.qE(a,new A.bh(b.h("@<0>").X(c).h("bh<1,2>"))))},
aC(a,b){return new A.bh(a.h("@<0>").X(b).h("bh<1,2>"))},
lr(a){return new A.b1(a.h("b1<0>"))},
ax(a){return new A.b1(a.h("b1<0>"))},
dt(a,b){return b.h("mx<0>").a(A.qF(a,new A.b1(b.h("b1<0>"))))},
lK(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
lJ(a,b,c){var s=new A.c5(a,b,c.h("c5<0>"))
s.c=a.e
return s},
oo(a,b,c){var s=A.on(b,c)
a.b_(0,new A.il(s,b,c))
return s},
op(a,b){var s,r,q=A.lr(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r)q.i(0,b.a(a[r]))
return q},
ls(a,b){var s=A.lr(b)
s.G(0,a)
return s},
im(a){var s,r
if(A.m3(a))return"{...}"
s=new A.fI("")
try{r={}
B.a.i($.aI,a)
s.a+="{"
r.a=!0
a.b_(0,new A.io(r,s))
s.a+="}"}finally{if(0>=$.aI.length)return A.d($.aI,-1)
$.aI.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
pJ(){throw A.c(A.c1("Cannot change an unmodifiable set"))},
e1:function e1(){},
e4:function e4(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
e2:function e2(a,b){this.a=a
this.$ti=b},
e3:function e3(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
b1:function b1(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h9:function h9(a){this.a=a
this.c=this.b=null},
c5:function c5(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
il:function il(a,b,c){this.a=a
this.b=b
this.c=c},
L:function L(){},
bV:function bV(){},
io:function io(a,b){this.a=a
this.b=b},
ej:function ej(){},
cz:function cz(){},
dV:function dV(){},
bn:function bn(){},
eb:function eb(){},
hp:function hp(){},
dW:function dW(a,b){this.a=a
this.$ti=b},
cT:function cT(){},
ek:function ek(){},
qN(a){var s=A.oI(a,null)
if(s!=null)return s
throw A.c(new A.i1(a))},
oa(a,b){a=A.Z(a,new Error())
if(a==null)a=A.eq(a)
a.stack=b.j(0)
throw a},
du(a,b,c,d){var s,r=c?J.ms(a,d):J.mr(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
bU(a,b,c){var s,r=A.b([],c.h("q<0>"))
for(s=J.ac(a);s.n();)B.a.i(r,c.a(s.gt()))
if(b)return r
r.$flags=1
return r},
af(a,b){var s,r
if(Array.isArray(a))return A.b(a.slice(0),b.h("q<0>"))
s=A.b([],b.h("q<0>"))
for(r=J.ac(a);r.n();)B.a.i(s,r.gt())
return s},
aN(a,b){var s=A.bU(a,!1,b)
s.$flags=3
return s},
mT(a,b,c){var s=J.ac(b)
if(!s.n())return a
if(c.length===0){do a+=A.o(s.gt())
while(s.n())}else{a+=A.o(s.gt())
while(s.n())a=a+c+A.o(s.gt())}return a},
p5(){return A.d_(new Error())},
o7(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
mn(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
eM(a){if(a>=10)return""+a
return"0"+a},
hV(a){if(typeof a=="number"||A.lT(a)||a==null)return J.ci(a)
if(typeof a=="string")return JSON.stringify(a)
return A.mK(a)},
ob(a,b){A.cc(a,"error",t.K)
A.cc(b,"stackTrace",t.l)
A.oa(a,b)},
ex(a){return new A.ew(a)},
i(a,b){return new A.b2(!1,null,b,a)},
a2(a,b,c){return new A.b2(!0,a,b,c)},
mO(a){var s=null
return new A.cG(s,s,!1,s,s,a)},
aQ(a,b,c,d,e){return new A.cG(b,c,!0,a,d,"Invalid value")},
oV(a,b,c){if(0>a||a>c)throw A.c(A.aQ(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.c(A.aQ(b,a,c,"end",null))
return b}return c},
j0(a,b){if(a<0)throw A.c(A.aQ(a,0,null,b,null))
return a},
ig(a,b,c,d){return new A.f0(b,!0,a,d,"Index out of range")},
c1(a){return new A.dX(a)},
mX(a){return new A.fM(a)},
m(a){return new A.cK(a)},
aL(a){return new A.eJ(a)},
oh(a,b,c){var s,r
if(A.m3(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.b([],t.s)
B.a.i($.aI,a)
try{A.qd(a,s)}finally{if(0>=$.aI.length)return A.d($.aI,-1)
$.aI.pop()}r=A.mT(b,t.hf.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
ln(a,b,c){var s,r
if(A.m3(a))return b+"..."+c
s=new A.fI(b)
B.a.i($.aI,a)
try{r=s
r.a=A.mT(r.a,a,", ")}finally{if(0>=$.aI.length)return A.d($.aI,-1)
$.aI.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
qd(a,b){var s,r,q,p,o,n,m,l=a.gJ(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.n())return
s=A.o(l.gt())
B.a.i(b,s)
k+=s.length+2;++j}if(!l.n()){if(j<=5)return
if(0>=b.length)return A.d(b,-1)
r=b.pop()
if(0>=b.length)return A.d(b,-1)
q=b.pop()}else{p=l.gt();++j
if(!l.n()){if(j<=4){B.a.i(b,A.o(p))
return}r=A.o(p)
if(0>=b.length)return A.d(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gt();++j
for(;l.n();p=o,o=n){n=l.gt();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.d(b,-1)
k-=b.pop().length+2;--j}B.a.i(b,"...")
return}}q=A.o(p)
r=A.o(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.d(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.i(b,m)
B.a.i(b,q)
B.a.i(b,r)},
bW(a,b,c,d,e,f){var s
if(B.m===c){s=J.V(a)
b=J.V(b)
return A.fJ(A.a9(A.a9($.eu(),s),b))}if(B.m===d){s=J.V(a)
b=J.V(b)
c=J.V(c)
return A.fJ(A.a9(A.a9(A.a9($.eu(),s),b),c))}if(B.m===e){s=J.V(a)
b=J.V(b)
c=J.V(c)
d=J.V(d)
return A.fJ(A.a9(A.a9(A.a9(A.a9($.eu(),s),b),c),d))}if(B.m===f){s=J.V(a)
b=J.V(b)
c=J.V(c)
d=J.V(d)
e=J.V(e)
return A.fJ(A.a9(A.a9(A.a9(A.a9(A.a9($.eu(),s),b),c),d),e))}s=J.V(a)
b=J.V(b)
c=J.V(c)
d=J.V(d)
e=J.V(e)
f=J.V(f)
f=A.fJ(A.a9(A.a9(A.a9(A.a9(A.a9(A.a9($.eu(),s),b),c),d),e),f))
return f},
bO:function bO(a,b,c){this.a=a
this.b=b
this.c=c},
jI:function jI(){},
R:function R(){},
ew:function ew(a){this.a=a},
bo:function bo(){},
b2:function b2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cG:function cG(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
f0:function f0(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
dX:function dX(a){this.a=a},
fM:function fM(a){this.a=a},
cK:function cK(a){this.a=a},
eJ:function eJ(a){this.a=a},
fl:function fl(){},
dS:function dS(){},
jJ:function jJ(a){this.a=a},
i1:function i1(a){this.a=a},
n:function n(){},
am:function am(a,b,c){this.a=a
this.b=b
this.$ti=c},
a7:function a7(){},
z:function z(){},
hn:function hn(){},
fI:function fI(a){this.a=a},
ix:function ix(a){this.a=a},
E(a){var s
if(typeof a=="function")throw A.c(A.i("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.pO,a)
s[$.m6()]=a
return s},
pO(a,b,c){t.f.a(a)
if(A.e(c)>=1)return a.$1(b)
return a.$0()},
nC(a,b,c){return c.a(a[b])},
no(a,b){return a[b]},
ak(a,b,c,d){return d.a(a[b].apply(a,c))},
qT(a,b){var s=new A.a1($.U,b.h("a1<0>")),r=new A.dZ(s,b.h("dZ<0>"))
a.then(A.cX(new A.l9(r,b),1),A.cX(new A.la(r),1))
return s},
nt(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
cY(a){if(A.nt(a))return a
return new A.kv(new A.e4(t.hg)).$1(a)},
l9:function l9(a,b){this.a=a
this.b=b},
la:function la(a){this.a=a},
kv:function kv(a){this.a=a},
h8:function h8(){},
c7:function c7(){this.b=this.a=0},
j3:function j3(a){this.z=a},
cF:function cF(a,b){this.a=a
this.b=b},
aF:function aF(a,b){this.a=a
this.b=b},
eK:function eK(a,b){this.a=a
this.b=b
this.d=!1},
eL:function eL(){this.a=null
this.d=0
this.e=!1},
fr(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){return new A.fq(f,b,l,d,a4,g,i,o,n,m,j,e,c,a,q,h,r,a3,a2,a1,s,a0,!1,p)},
mG(){return A.fr(0,0.3,0,0,0,1.15,0.08,8,0,1,!1,0.75,0,0,0,B.au,0,0,0,0,0,0,0,0.22)},
cM:function cM(a,b){this.a=a
this.b=b},
fq:function fq(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){var _=this
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
mi(a,b,c,d,e,f,g,h){return new A.d5(g,f,h,b,d,e,c,a)},
eE(a,b,c,d,e,f,g){var s,r,q,p
if(!d.gE(0)||d.gO()<1e-12)throw A.c(A.i("CameraView.look requires a finite, nonzero forward: "+d.j(0),null))
if(!isFinite(e)||e<=0||e>=3.141592653589793)throw A.c(A.i("CameraView.look requires 0 < fovYRadians < pi: "+A.o(e),null))
s=d.gm()
if(g.R(s).gO()<1e-12)throw A.c(A.i("CameraView.look requires up ("+g.j(0)+") not parallel to forward ("+d.j(0)+")",null))
r=A.lt(b,s,g)
q=A.mz(a,c,e,f)
p=A.mi(a,b,c,s,f,q,r,q.k(0,r))
p.p()
return p},
mj(a,b,c,d,e,f,g){var s=f.P(0,b)
if(s.gO()<1e-12)throw A.c(A.i("CameraView.lookAt requires target ("+f.j(0)+") distinct from eye ("+b.j(0)+")",null))
return A.eE(a,b,c,s,d,e,g)},
d5:function d5(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.z=_.y=_.x=$},
dR:function dR(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
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
eS:function eS(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2){var _=this
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
i3:function i3(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=f},
i4:function i4(){this.b=this.a=0},
by(a,b){return new A.ie(a,b)},
bm:function bm(){},
aE:function aE(a,b,c){this.a=a
this.b=b
this.c=c},
aG:function aG(a,b,c){this.a=a
this.b=b
this.c=c},
b6:function b6(a,b,c){this.a=a
this.b=b
this.c=c},
fo:function fo(a,b,c){this.a=a
this.b=b
this.c=c},
b4:function b4(a,b,c){this.a=a
this.b=b
this.c=c},
cw:function cw(a,b){this.a=a
this.b=b},
ie:function ie(a,b){this.a=a
this.b=b},
ks(a,b,c,d){return A.qv(a,b,c,d)},
qv(a,b,a0,a1){var s=0,r=A.lV(t.fW),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c
var $async$ks=A.lY(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:d=b.length
if(d===0)throw A.c(A.i("bootstrapRenderer requires a non-empty profile ladder",null))
a1.p()
n=A.b([],t.eT)
m=0
i=d-1
h=t.eD
case 3:g=m
if(typeof g!=="number"){q=g.ds()
s=1
break}if(!(g<d)){s=4
break}l=B.a.C(b,m)
k=a.$1(l)
if(k.a!==l)throw A.c(A.i("configurationFor("+l.a.b+") returned a configuration for "+k.a.a.b+". The mapping must be total and faithful, or the renderer runs a graph the host did not choose.",null))
p=6
s=9
return A.lO(a0.f5(k,a1),$async$ks)
case 9:J.hz(n,new A.cE(l,null))
f=A.bU(n,!1,h)
f.$flags=3
g=new A.eC()
q=g
s=1
break
p=2
s=8
break
case 6:p=5
c=o.pop()
j=A.ch(c)
J.hz(n,new A.cE(l,j))
if(J.aJ(m,i))throw c
s=8
break
case 5:s=2
break
case 8:g=m
if(typeof g!=="number"){q=g.v()
s=1
break}m=g+1
s=3
break
case 4:throw A.c(A.m("bootstrapRenderer exhausted its ladder without a result"))
case 1:return A.lQ(q,r)
case 2:return A.lP(o.at(-1),r)}})
return A.lR($async$ks,r)},
qC(a){var s,r,q=B.a.bX(B.ac,new A.kw(a))
if(q>=0)return A.aN(B.a.dA(B.ac,q),t.W)
s=t.W
r=A.dt([a],s)
r.G(0,B.ac)
return A.aN(r,s)},
cE:function cE(a,b){this.a=a
this.b=b},
eC:function eC(){},
kw:function kw(a){this.a=a},
qV(a,b,c,d){var s,r,q,p,o,n,m=A.b([],t.cw)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.a.i(m,new A.e9(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.a.ao(m,new A.lb())
s=A.b([],t.w)
for(r=A.jl(m,0,A.cc(b,"count",t.S),t.fk),q=r.$ti,r=new A.at(r,r.gB(0),q.h("at<T.E>")),q=q.h("T.E");r.n();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
v:function v(a,b,c){this.a=a
this.b=b
this.c=c},
cr:function cr(a,b,c){this.a=a
this.b=b
this.c=c},
bD:function bD(a,b,c,d){var _=this
_.b=a
_.c=b
_.d=c
_.e=d},
az:function az(){},
lb:function lb(){},
a6(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return new A.a0(d,a,l,k,j,0,g,f,h,i,e,c,b,m,n)},
mB(a,b){return A.a6(null,0.1,0.5,a,1,1,null,null,b,0.35,0.78,1,1,1)},
lu(a,b,c){return A.a6(null,0.2,0.3,b,0,1,null,null,c,a.c,a.b,a.a,1,1)},
mA(a,b,c,d){return A.a6(null,0.08,a,c,0,1,null,null,d,b.c,b.b,b.a,1,1)},
f9(a,b){if(!isFinite(b)||b<0||b>1)throw A.c(A.i("MaterialDefinition."+a+" must be in [0, 1]: "+A.o(b),null))},
hA:function hA(a,b){this.a=a
this.b=b},
fa:function fa(a,b){this.a=a
this.b=b},
a0:function a0(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
or(a){A:{break A}return a},
br:function br(a,b){this.a=a
this.b=b},
ao:function ao(a,b,c){this.a=a
this.b=b
this.c=c},
jw:function jw(){},
jx:function jx(){},
b7:function b7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ir:function ir(){},
is:function is(){},
it:function it(){},
hT:function hT(){},
iA(a){var s,r,q="volumetric",p=t.N,o=A.dt(["sceneColor","present"],p),n=a.a.b
if(n.A(0,"shadows"))o.G(0,A.dt(["shadowMap","sceneDepth"],p))
if(n.A(0,q)){o.i(0,"volumetricLight")
o.i(0,"sceneColor#"+(a.d>1?2:1))}if(n.A(0,"ssao"))o.G(0,A.dt(["ssaoRaw","ssaoBlurred"],p))
if(n.A(0,"bloom")){if(a.d>1)s=n.A(0,q)?3:2
else s=n.A(0,q)?2:1
o.G(0,A.dt(["bloomBlurH","bloomBlurV","sceneColor#"+s],p))}if(a.d>1)o.i(0,"sceneColor#1")
if(n.A(0,"dof"))o.G(0,A.dt(["dofBlurH","dofBlurV","dofOutput"],p))
if(n.A(0,"grade"))o.i(0,"gradeOutput")
if(n.A(0,"ps1"))o.i(0,"ps1Output")
r=n.A(0,"vhs")
if(r)o.i(0,"vhsOutput")
return new A.iz(new A.dW(A.ls(o,p),t.am),r)},
iz:function iz(a,b){this.a=a
this.b=b},
iB:function iB(){},
iS:function iS(a){this.b=a},
dN:function dN(){this.a=null
this.c=0
this.d=!1},
dg:function dg(a,b){this.a=a
this.b=b},
eA:function eA(a,b){this.a=a
this.b=b},
b9:function b9(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=i},
mU(a,b,c,d,e){var s,r
if(!isFinite(c)||c<=0)throw A.c(A.i("SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: "+A.o(c),null))
if(!isFinite(d)||d<=0)throw A.c(A.i("SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: "+A.o(d),null))
s=c>d?d:c
r=new A.jm(b,a,B.b.I(b*s),B.b.I(a*s),s,!0)
r.p()
return r},
jm:function jm(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hO:function hO(a,b){this.a=a
this.b=b},
dK:function dK(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
cH:function cH(a,b){this.a=a
this.b=b},
a_:function a_(a,b,c){this.a=a
this.b=b
this.d=c},
i5:function i5(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f},
oq(){return new A.fb(new A.b8(new A.iq(),A.b([],t.ha),A.b([],t.t),t.ex))},
fb:function fb(a){this.a=a},
iq:function iq(){},
nx(a){var s=4
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
case 3:s=A.l(A.c1("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
pP(a,b,c){var s,r,q
for(s=0,r=0;r<7;++r){q=B.M[r]
if(A.nx(q.a)===b)s+=q.c}return s},
os(a){return new A.iu(a,new A.b8(new A.iv(),A.b([],t.c9),A.b([],t.t),t.cE),A.aC(t.S,t.bw))},
mC(a){var s
A:{s=a.byteLength
break A}return s},
fO:function fO(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
iu:function iu(a,b,c){this.a=a
this.b=b
this.c=c},
iv:function iv(){},
iw:function iw(){},
p6(a){var s=new A.fL(a,new A.b8(new A.jq(),A.b([],t.fq),A.b([],t.t),t.g2),A.aC(t.S,t.j))
s.d=s.ag($.mb())
s.e=s.ag($.m8())
s.f=s.ag($.m9())
s.r=s.ag($.m7())
s.w=s.ag($.ma())
return s},
bb:function bb(a,b,c){this.a=a
this.b=b
this.c=c},
fL:function fL(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
jq:function jq(){},
js:function js(){},
jr:function jr(){},
p4(a,b,c,d,e){var s,r,q
if(c)return B.f_
if(d)return B.eU
s=A.mR(b,e)
if(Math.abs(s)<0.5&&a>=0.2617993877991494)return B.f3
r=s<0
if(a>=0.2617993877991494)return r?B.ba:B.f4
if(a>=0.10471975511965977)return r?B.ba:B.f5
if(a>=-0.014538592669112763)return r?B.f2:B.f6
q=a*180/3.141592653589793
if(q>=-6)return r?B.f1:B.eW
if(q>=-12)return r?B.f0:B.eX
if(q>=-18)return r?B.eV:B.eY
return B.eZ},
mS(a,b,c){var s
if(b<=a)return c<a?0:1
s=B.b.l((c-a)/(b-a),0,1)
return s*s*(3-2*s)},
mR(a,b){var s=a-b
while(s>12)s-=24
while(s<-12)s+=24
return s},
aj:function aj(a,b){this.a=a
this.b=b},
ji:function ji(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.r=e
_.x=f},
qW(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b.gE(0)
if(!i)throw A.c(A.i("invalid volumetric source selection inputs",null))
s=A.ax(t.N)
r=A.b([],t.gg)
for(q=0;!1;++q){p=c[q]
p.p()
if(!s.i(0,p.gN()))throw A.c(A.i("duplicate volumetric source id: "+A.o(p.gN()),null))
o=p.gam().P(0,b).length
i=p.gfU()
n=A.pa(p.gfR(),o,i)
i=p.gcW().gbt()
m=p.gcW().gbu()
l=p.gcW().gbv()
l=Math.max(A.cd(m),A.cd(l))
k=Math.max(A.cd(i),l)
B.a.i(r,new A.ea(p.gfT().k(0,k).k(0,n),p))}B.a.ao(r,new A.lc())
i=A.b([],t.az)
for(m=A.jl(r,0,A.cc(a,"count",t.S),t.eS),l=m.$ti,m=new A.at(m,m.gB(0),l.h("at<T.E>")),l=l.h("T.E");m.n();){j=m.d
i.push((j==null?l.a(j):j).b)}return i},
pa(a,b,c){var s,r,q,p,o,n
for(s=[new A.F("distance",b),new A.F("referenceDistance",c),new A.F("cutoffDistance",a)],r=0;r<3;++r){q=s[r]
p=q.b
if(!isFinite(p))A.l(A.i(q.a+" must be finite: "+A.o(p),null))}if(b.ds(0,0)||c.aR(0,0)||a.aR(0,0))throw A.c(A.i("invalid inverse-square attenuation inputs",null))
if(b.dm(0,a))return 0
s=c.k(0,c)
q=c.k(0,c)
o=b.k(0,b)
n=s.aD(0,Math.max(A.cd(q),A.cd(o)))
o=b.aD(0,a)
A.cd(o)
return n.k(0,1-Math.pow(o,4)).l(0,0,1).fV(0)},
lc:function lc(){},
hJ:function hJ(){this.b=this.a=0},
nZ(a,b,c,d,e){var s=new A.eF(A.aN(e,t.Z),!0,c,a,b,B.f,B.f)
s.dG(a,b,c,300,!0,0.1,e)
return s},
aw:function aw(a,b,c){this.a=a
this.b=b
this.c=c},
eF:function eF(a,b,c,d,e,f,g){var _=this
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
hM:function hM(){},
hN:function hN(){},
bQ:function bQ(a,b,c,d){var _=this
_.a=a
_.c=_.b=0
_.d=b
_.y=c
_.z=d},
mD(a,b){return new A.bC(b,a,a,b)},
bC:function bC(a,b,c,d){var _=this
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
cJ:function cJ(a,b,c,d,e,f,g,h){var _=this
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
qu(a){var s,r,q,p,o,n,m,l,k,j=A.b([],t.gk),i=A.aC(t.N,t.S)
for(s=a.length,r=t.dR,q=0;q<a.length;a.length===s||(0,A.C)(a),++q){p=a[q]
o=p.gq().y
if(o==null){B.a.i(j,new A.bg(p,A.b([p],r)))
continue}n=""+p.gq().a.a+":"+p.gq().b.a+":"+A.o(o)
m=i.C(0,n)
if(m==null){i.K(0,n,j.length)
B.a.i(j,new A.bg(p,A.b([p],r)))}else{l=j.length
if(m>>>0!==m||m>=l)return A.d(j,m)
k=j[m].b
if(k.length>=16){i.K(0,n,l)
B.a.i(j,new A.bg(p,A.b([p],r)))}else B.a.i(k,p)}}return j},
bg:function bg(a,b){this.a=a
this.b=b},
eQ:function eQ(a){this.a=a},
hY:function hY(){},
hZ:function hZ(a){this.a=a},
hW:function hW(a){this.a=a},
hX:function hX(a){this.a=a},
eR:function eR(a,b){this.a=a
this.b=b},
cu:function cu(a,b){this.a=a
this.b=b},
eT:function eT(a,b){this.a=a
this.b=b
this.c=0},
pq(){return new A.cQ()},
i2:function i2(a){this.a=a
this.b=null},
cQ:function cQ(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
lv(){return!0},
P:function P(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
iE:function iE(){},
iF:function iF(){},
aY:function aY(a,b){this.a=a
this.b=b},
al:function al(a,b,c){this.a=a
this.b=b
this.c=c},
fw:function fw(a,b){this.a=a
this.b=b},
bf:function bf(a,b){this.a=a
this.b=b},
W:function W(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dM:function dM(a,b){this.a=a
this.b=b},
p:function p(a,b){this.a=a
this.b=b},
da:function da(a){this.b=a},
j_:function j_(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=_.d=0},
ad:function ad(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
j4:function j4(){},
a8:function a8(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.r=f},
j6:function j6(a,b){this.a=a
this.b=b},
jb:function jb(){},
ja:function ja(){},
j9:function j9(){},
j8:function j8(a){this.a=a},
j7:function j7(a,b,c){this.a=a
this.b=b
this.c=c},
j5:function j5(a,b){this.a=a
this.b=b},
p_(a){return new A.dJ(a,new A.b8(new A.jc(),A.b([],t.aO),A.b([],t.t),t.b0),A.aC(t.gL,t.cm))},
bH:function bH(a,b,c){this.a=a
this.b=b
this.c=c},
dJ:function dJ(a,b,c){this.a=a
this.b=b
this.c=c},
jc:function jc(){},
nm(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.pR(a,r,s,a.x.gt().a.b.a).b},
pR(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.km(a),j=new A.kn(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.A(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.qw(b,h,B.a5,i,s.gfn(),new A.k7(j),new A.k8(j),new A.k9(a),new A.ke(a),new A.kf(a),new A.kg(j),new A.kh(j),s.gfp(),new A.ki(a),s.gfu(),r.gfs(),k,s.gfw(),s.gfA(),new A.kj(j,c),new A.kk(j),new A.kl(j),new A.ka(j),new A.kb(j),new A.kc(a),new A.kd(j),e,f,g,512)}else{p=new A.W(l,B.u,g,f,e,0)
o=new A.W(l,B.u,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.dx(h,p,o):null
k=A.b([new A.fU(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nout vec4 oColor;\nvoid main(){\n  vec3 n=normalize(vNormal);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+\n    vec3(ndotl)*uDirectLightScale,0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.cL)
if(n!=null)k.push(n)
k.push(new A.dG(b,u.l,u.j,h,i,B.a5))
q=new A.eQ(k)}a.r.toString
m=q.eG(B.aj,new A.j4(),!1,new A.hd())
k=m.a.b
if(k.length!==0)throw A.c(A.m("safe renderer graph is invalid: "+A.o(k)))
return new A.jZ(q,m)},
pS(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.c(A.m("renderer graph is not initialized"))
s=b7.c
s=A.af(new A.aZ(s,A.x(s).h("aZ<2>")),t.Y)
for(r=0;r<b9.length;++r){q=b9[r]
p=b6.w.a.b
o=p.$ti
n=o.c.a(q.a)
p.ap(n)
p=p.b
n=n.a
if(!(n>=0&&n<p.length))return A.d(p,n)
n=p[n].c
p=(n==null?o.y[1].a(n):n).d
o=q.c.ad()
p=p.gaz()
n=A.H(p)
B.a.i(s,new A.ho(new A.b4((r|1073741824)>>>0,0,"transient"),q,A.cj(new A.M(p,n.h("a(1)").a(o.gaB()),n.h("M<1,a>")))))}p=b8.a
m=A.qz(A.mo(p.c),s,b8.d)
for(o=s.length,l=0,k=0;k<s.length;s.length===o||(0,A.C)(s),++k){n=s[k].gq().a
j=b6.w.a
i=n.a
h=j.c.C(0,i)
if(h==null)A.l(A.by(B.Y,n))
j=j.b
g=j.$ti
j.ap(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.d(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
l+=B.e.a_(n>0?n:h.e,3)}for(s=m.a,o=s.length,f=0,k=0;k<s.length;s.length===o||(0,A.C)(s),++k){n=s[k].gq().a
j=b6.w.a
i=n.a
h=j.c.C(0,i)
if(h==null)A.l(A.by(B.Y,n))
j=j.b
g=j.$ti
j.ap(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.d(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
f+=B.e.a_(n>0?n:h.e,3)}o=t.N
n=A.aC(o,t.a8)
e=new A.i2(n)
e.eD("cull")
j=l-f
d=e.b
if(d==null)A.l(A.m("cull recorded outside an active frame"))
if(j<0)A.l(A.i("cull totals must be non-negative",null))
c=n.C(0,d)
c.c+=j
c.e+=m.b.b
b=A.b([],t.c1)
a=A.b([],t.aM)
for(i=s.length,g=t.k,a0=p.a,a1=t.d,k=0;k<s.length;s.length===i||(0,A.C)(s),++k){a2=s[k]
if(a2.gq().e===B.r)B.a.i(a,new A.a3(new A.av(a0.ai(a2.gq().c.a).c,a2.gN().a),a2,a1))
else B.a.i(b,new A.a3(new A.ay(B.em,a2.gq().b,a2.gq().a,a2.gN().a),a2,g))}a3=new A.h5(A.qu(A.qY(b)),A.qX(a),p,b8.b,b8.c)
a4=new A.eO(b6.a,e)
for(s=b4.b,p=s.length,i=t.do,k=0;k<s.length;s.length===p||(0,A.C)(s),++k){a5=s[k]
g=a5.gq().a
if(g.length===0)A.l(A.a2(g,"passId",null))
e.b=g
n.c3(g,A.nB())
a6=A.aC(o,i)
for(g=a5.gq().c,a0=g.length,a7=0;a7<g.length;g.length===a0||(0,A.C)(g),++a7){a8=g[a7].a
a9=b5.c
if(a9==null)A.l(A.m("GPU resource adapter is not initialized"))
a1=a8.f
b0=a8.a
b1=a1===0?b0:b0+"#"+a1
b2=a9.b.C(0,b1)
if(b2==null)A.l(A.m("resource is not in candidate: "+b1))
b3=new A.cn(b2)
a6.K(0,b0+"#"+a1,b3)
a6.c3(b0,new A.ko(b3))}a5.Y(new A.eD(a6,a4,new A.kp(b8,b6).$0(),a3))}return new A.jK(e,m,j)},
fx:function fx(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.w=f
_.x=!1},
jK:function jK(a,b,c){this.a=a
this.b=b
this.c=c},
ho:function ho(a,b,c){this.a=a
this.b=b
this.c=c},
km:function km(a){this.a=a},
kn:function kn(a,b){this.a=a
this.b=b},
kl:function kl(a){this.a=a},
ke:function ke(a){this.a=a},
kf:function kf(a){this.a=a},
kk:function kk(a){this.a=a},
k9:function k9(a){this.a=a},
kb:function kb(a){this.a=a},
ka:function ka(a){this.a=a},
kj:function kj(a,b){this.a=a
this.b=b},
k7:function k7(a){this.a=a},
k8:function k8(a){this.a=a},
kg:function kg(a){this.a=a},
kh:function kh(a){this.a=a},
ki:function ki(a){this.a=a},
kd:function kd(a){this.a=a},
kc:function kc(a){this.a=a},
ko:function ko(a){this.a=a},
kp:function kp(a,b){this.a=a
this.b=b},
jZ:function jZ(a,b){this.a=a
this.b=b},
hd:function hd(){},
h5:function h5(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
fz:function fz(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.ax=_.at=_.as=_.Q=_.y=_.x=_.w=_.r=null
_.a$=f
_.b$=g},
je:function je(){},
jf:function jf(){},
jg:function jg(){},
hc:function hc(a){this.b=a},
jV:function jV(){},
hh:function hh(){},
fB:function fB(a,b){this.a=a
this.b=b},
qY(a){var s,r,q=A.af(a,t.k)
B.a.ao(q,new A.lg())
s=A.H(q)
r=s.h("M<1,aR>")
s=A.af(new A.M(q,s.h("aR(1)").a(new A.lh()),r),r.h("T.E"))
s.$flags=1
return s},
qX(a){var s,r,q=A.af(a,t.d)
B.a.ao(q,new A.le())
s=A.H(q)
r=s.h("M<1,aR>")
s=A.af(new A.M(q,s.h("aR(1)").a(new A.lf()),r),r.h("T.E"))
s.$flags=1
return s},
ay:function ay(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
av:function av(a,b){this.a=a
this.b=b},
a3:function a3(a,b,c){this.a=a
this.b=b
this.$ti=c},
lg:function lg(){},
lh:function lh(){},
le:function le(){},
lf:function lf(){},
qz(a,b,c){var s,r,q,p,o,n,m,l=A.b([],t.dR)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.C)(b),++p){o=b[p];++r
if((o.gq().d&c)>>>0===0){++q
continue}n=o.gaQ()
m=n.a
if(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)){n=n.b
n=isFinite(n.a)&&isFinite(n.b)&&isFinite(n.c)}else n=!1
if(!n)throw A.c(A.i("cullItems: non-finite world bounds for instance "+o.gN().j(0),null))
if(a.dh(o.gaQ())===B.a6){++q
continue}B.a.i(l,o)}return new A.hR(l,new A.hS(q))},
hS:function hS(a){this.b=a},
hR:function hR(a,b){this.a=a
this.b=b},
lx(a){var s,r,q,p
if(a<=0)throw A.c(A.a2(a,"size","must be > 0"))
s=a*0.5
r=new A.aA(A.b([],t.n),A.b([],t.t))
q=new A.iT(r,1)
p=-s
q.$6(new A.a(p,p,s),new A.a(s,p,s),new A.a(s,s,s),new A.a(p,s,s),B.p,B.k)
q.$6(new A.a(s,p,p),new A.a(p,p,p),new A.a(p,s,p),new A.a(s,s,p),B.D,B.x)
q.$6(new A.a(p,s,s),new A.a(s,s,s),new A.a(s,s,p),new A.a(p,s,p),B.d,B.k)
q.$6(new A.a(p,p,p),new A.a(s,p,p),new A.a(s,p,s),new A.a(p,p,s),B.q,B.x)
q.$6(new A.a(s,p,s),new A.a(s,p,p),new A.a(s,s,p),new A.a(s,s,s),B.k,B.D)
q.$6(new A.a(p,p,p),new A.a(p,p,s),new A.a(p,s,s),new A.a(p,s,p),B.x,B.p)
return r.a9(new A.a5(new A.a(p,p,p),new A.a(s,s,s)))},
oJ(a,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a2<=0||a<=0)throw A.c(A.i("dimensions must be > 0",null))
if(a0<1||a1<1)throw A.c(A.i("subdivisions must be >= 1",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aA(s,q)
o=a2*0.5
n=a*0.5
for(s=-o,m=-n,l=0;l<=a1;++l){k=l/a1
j=m+k*a
for(i=0;i<=a0;++i){h=i/a0
p.L(new A.a(s+h*a2,0,j),B.d,B.k,new A.B(h,k))}}g=a0+1
for(l=0;l<a1;)for(f=l*g,++l,e=l*g,i=0;i<a0;++i){d=f+i
c=e+i
b=c+1
B.a.G(q,A.b([d,c,b,d,b,d+1],r))}return p.a9(new A.a5(new A.a(s,0,m),new A.a(o,0,n)))},
oK(a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(a6<=0)throw A.c(A.a2(a6,"radius","must be > 0"))
if(a7<2||a8<3)throw A.c(A.i("invalid ring or sector count",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aA(s,q)
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
a=0}p.L(new A.a(e*a6,s,d*a6),new A.a(e,k,d),new A.a(c,0,a),new A.B(i,n))}}a0=a8+1
for(o=0;o<a7;)for(s=o*a0,++o,a1=o*a0,j=0;j<a8;++j){a2=s+j
a3=a1+j
a4=a3+1
B.a.G(q,A.b([a2,a2+1,a4,a2,a4,a3],r))}a5=new A.a(a6,a6,a6)
return p.a9(new A.a5(a5.k(0,-1),a5))},
ox(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a1<=0||a<=0)throw A.c(A.i("radius and height must be > 0",null))
if(a0<3)throw A.c(A.i("radialSegments must be >= 3",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aA(s,q)
o=a*0.5
for(n=-o,m=0;m<=a0;++m){l=m/a0
k=l*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
h=new A.a(j,0,i)
g=new A.a(-i,0,j)
f=j*a1
e=i*a1
p.L(new A.a(f,n,e),h,g,new A.B(l,0))
p.L(new A.a(f,o,e),h,g,new A.B(l,1))}for(m=0;m<a0;++m){d=m*2
f=d+3
B.a.G(q,A.b([d,d+2,f,d,f,d+1],r))}c=s.length/18|0
p.L(new A.a(0,o,0),B.d,B.k,B.ay)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.L(new A.a(j*a1,o,i*a1),B.d,B.k,new A.B(j*0.5+0.5,i*0.5+0.5))}for(f=c+1,e=c+2,m=0;m<a0;++m)B.a.G(q,A.b([c,f+m,e+m],r))
b=s.length/18|0
p.L(new A.a(0,n,0),B.q,B.x,B.ay)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.L(new A.a(j*a1,n,i*a1),B.q,B.x,new A.B(j*0.5+0.5,i*0.5+0.5))}for(s=b+2,f=b+1,m=0;m<a0;++m)B.a.G(q,A.b([b,s+m,f+m],r))
s=-a1
return p.a9(new A.a5(new A.a(s,n,s),new A.a(a1,o,a1)))},
ow(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a6<=0||a4<=0)throw A.c(A.i("radius and height must be > 0",null))
if(a5<3)throw A.c(A.i("radialSegments must be >= 3",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aA(s,q)
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
p.L(new A.a(0,o,0),d,c,new A.B((i+h)*0.5,1))
p.L(new A.a(Math.cos(g)*a6,m,Math.sin(g)*a6),d,c,new A.B(i,0))
p.L(new A.a(Math.cos(f)*a6,m,Math.sin(f)*a6),d,c,new A.B(h,0))
B.a.G(q,A.b([b,b+1,b+2],r))}a=s.length/18|0
p.L(new A.a(0,m,0),B.q,B.x,B.ay)
for(j=0;j<=a5;++j){a0=j/a5*2*3.141592653589793
a1=Math.cos(a0)
a2=Math.sin(a0)
p.L(new A.a(a1*a6,m,a2*a6),B.q,B.x,new A.B(a1*0.5+0.5,a2*0.5+0.5))}for(s=a+2,a3=a+1,j=0;j<a5;++j)B.a.G(q,A.b([a,s+j,a3+j],r))
s=-a6
return p.a9(new A.a5(new A.a(s,m,s),new A.a(a6,o,a6)))},
oL(a0,a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a1<=0||a2<=0)throw A.c(A.i("radii must be > 0",null))
if(a0<3||a3<3)throw A.c(A.i("segments must be >= 3",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aA(s,q)
for(o=0;o<=a0;++o){s=o/a0
n=s*2*3.141592653589793
m=Math.cos(n)
l=Math.sin(n)
for(k=a1+a2*m,j=a2*l,i=0;i<=a3;++i){h=i/a3
g=h*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
p.L(new A.a(k*f,j,k*e),new A.a(m*f,l,m*e),new A.a(-e,0,f),new A.B(h,s))}}d=a3+1
for(o=0;o<a0;)for(s=o*d,++o,k=o*d,i=0;i<a3;++i){c=s+i
h=k+i
b=h+1
B.a.G(q,A.b([c,c+1,b,c,b,h],r))}a=a1+a2
s=-a
return p.a9(new A.a5(new A.a(s,-a2,s),new A.a(a,a2,a)))},
ov(a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a6<=0||a5<=0)throw A.c(A.i("radius and height must be > 0",null))
if(a7<2||a8<3)throw A.c(A.i("invalid ring or sector count",null))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aA(s,q)
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
p.L(new A.a(d*a6,j,c*a6),new A.a(d,l,c),new A.a(-e,0,f),new A.B(h,s))}}for(s=-o,n=0;n<=a7;++n){j=n/a7
m=j*1.5707963267948966
l=Math.sin(m)
k=Math.cos(m)
for(b=-l,h=s+b*a6,j=0.5-0.5*j,i=0;i<=a8;++i){a=i/a8
g=a*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
d=k*f
c=k*e
p.L(new A.a(d*a6,h,c*a6),new A.a(d,b,c),new A.a(-e,0,f),new A.B(a,j))}}a0=a8+1
for(n=0;n<a7;)for(s=n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1
B.a.G(q,A.b([a1,h,a,a1,a,a1+1],r))}a2=(a7+1)*a0
for(n=0;n<a7;)for(s=a2+n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1+a2
B.a.G(q,A.b([a1,a1+1,a,a1,a,h+a2],r))}for(i=0;i<a8;i=a3){a3=i+1
s=a2+i
j=s+1
B.a.G(q,A.b([i,a3,j,i,j,s],r))}a4=o+a6
s=-a6
return p.a9(new A.a5(new A.a(s,-a4,s),new A.a(a6,a4,a6)))},
mI(a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
if(a7<=0)throw A.c(A.a2(a7,"radius","must be > 0"))
if(a8>5)throw A.c(A.a2(a8,"subdivisions","must be between 0 and 5"))
s=(1+Math.sqrt(5))/2
r=-s
q=t.fm
p=A.af(new A.M(A.b([new A.a(-1,s,0),new A.a(1,s,0),new A.a(-1,r,0),new A.a(1,r,0),new A.a(0,-1,s),new A.a(0,1,s),new A.a(0,-1,r),new A.a(0,1,r),new A.a(s,0,-1),new A.a(s,0,1),new A.a(r,0,-1),new A.a(r,0,1)],t.G),t.dO.a(new A.iV()),q),q.h("T.E"))
r=t.t
q=t.E
o=A.b([A.b([0,11,5],r),A.b([0,5,1],r),A.b([0,1,7],r),A.b([0,7,10],r),A.b([0,10,11],r),A.b([1,5,9],r),A.b([5,11,4],r),A.b([11,10,2],r),A.b([10,7,6],r),A.b([7,1,8],r),A.b([3,9,4],r),A.b([3,4,2],r),A.b([3,2,6],r),A.b([3,6,8],r),A.b([3,8,9],r),A.b([4,9,5],r),A.b([2,4,11],r),A.b([6,2,10],r),A.b([8,6,7],r),A.b([9,8,1],r)],q)
n=A.bU(p,!0,t.a)
m=t.S
l=new A.iW(A.aC(m,m),n)
for(k=0;k<a8;++k,o=j){j=A.b([],q)
for(m=o.length,i=0;i<o.length;o.length===m||(0,A.C)(o),++i){h=o[i]
g=h.length
if(0>=g)return A.d(h,0)
f=h[0]
if(1>=g)return A.d(h,1)
e=h[1]
if(2>=g)return A.d(h,2)
d=h[2]
c=l.$2(f,e)
b=l.$2(e,d)
a=l.$2(d,f)
B.a.i(j,A.b([f,c,a],r))
B.a.i(j,A.b([e,b,c],r))
B.a.i(j,A.b([d,a,b],r))
B.a.i(j,A.b([c,b,a],r))}}q=A.b([],t.n)
m=A.b([],r)
e=new A.aA(q,m)
for(q=n.length,i=0;i<n.length;n.length===q||(0,A.C)(n),++i){a0=n[i]
g=a0.a
a1=a0.b
a2=a0.c
a3=-a2
a4=Math.sqrt(a3*a3+g*g)
a5=a4>0.000001?new A.a(a3/a4,0,g/a4):B.k
e.L(new A.a(g*a7,a1*a7,a2*a7),a0,a5,new A.B(0.5+Math.atan2(a2,g)/6.283185307179586,0.5-Math.asin(B.b.l(a1,-1,1))/3.141592653589793))}for(q=o.length,i=0;i<o.length;o.length===q||(0,A.C)(o),++i){h=o[i]
g=h.length
if(0>=g)return A.d(h,0)
a1=h[0]
if(1>=g)return A.d(h,1)
a2=h[1]
if(2>=g)return A.d(h,2)
B.a.G(m,A.b([a1,a2,h[2]],r))}a6=new A.a(a7,a7,a7)
return e.a9(new A.a5(a6.k(0,-1),a6))},
oH(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
if(a7<=0)throw A.c(A.a2(a7,"radius","must be > 0"))
s=A.b([],t.n)
r=t.t
q=A.b([],r)
p=new A.aA(s,q)
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
if(0>=n)return A.d(f,0)
e=f[0]
if(1>=n)return A.d(f,1)
d=f[1]
if(2>=n)return A.d(f,2)
c=f[2]
n=e.a
b=d.a-n
a=e.b
a0=d.b-a
a1=e.c
a2=d.c-a1
a3=new A.a(b,a0,a2).R(new A.a(c.a-n,c.b-a,c.c-a1)).gm()
a4=new A.a(b,a0,a2).gm()
n=a4.a
b=a4.b
a=a4.c
if(n*n+b*b+a*a<0.000001)a4=B.k
a5=s.length/18|0
p.L(e,a3,a4,B.fy)
p.L(d,a3,a4,B.ax)
p.L(c,a3,a4,B.az)
B.a.G(q,A.b([a5,a5+1,a5+2],r))}a6=new A.a(a7,a7,a7)
return p.a9(new A.a5(a6.k(0,-1),a6))},
oy(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a5<=0)throw A.c(A.a2(a5,"radius","must be > 0"))
s=(1+Math.sqrt(5))/2
r=1/s
q=-r
p=-s
o=t.fm
n=A.af(new A.M(A.b([B.hm,B.hl,B.hk,B.hj,B.fT,B.fS,B.fR,B.fQ,new A.a(0,q,p),new A.a(0,q,s),new A.a(0,r,p),new A.a(0,r,s),new A.a(q,p,0),new A.a(q,s,0),new A.a(r,p,0),new A.a(r,s,0),new A.a(p,0,q),new A.a(p,0,r),new A.a(s,0,q),new A.a(s,0,r)],t.G),t.dO.a(new A.iU(a5)),o),o.h("T.E"))
q=A.b([],t.n)
p=t.t
o=A.b([],p)
m=new A.aA(q,o)
for(l=0;l<12;++l){k=B.cY[l]
j=k[0]
i=n.length
if(!(j<i))return A.d(n,j)
h=n[j]
j=k[1]
if(!(j<i))return A.d(n,j)
g=n[j]
j=k[2]
if(!(j<i))return A.d(n,j)
f=n[j]
j=h.a
i=g.a-j
e=h.b
d=g.b-e
c=h.c
b=g.c-c
a=new A.a(i,d,b).R(new A.a(f.a-j,f.b-e,f.c-c)).gm()
a0=new A.a(i,d,b).gm()
j=a0.a
i=a0.b
e=a0.c
if(j*j+i*i+e*e<0.000001)a0=B.k
a1=q.length/18|0
for(a2=0;a2<5;++a2){j=k[a2]
if(!(j<n.length))return A.d(n,j)
a3=a2*1.2566370614359172
m.L(n[j],a,a0,new A.B(0.5+0.5*Math.cos(a3),0.5+0.5*Math.sin(a3)))}j=a1+2
B.a.G(o,A.b([a1,a1+1,j],p))
i=a1+3
B.a.G(o,A.b([a1,j,i],p))
B.a.G(o,A.b([a1,i,a1+4],p))}a4=new A.a(a5,a5,a5)
return m.a9(new A.a5(a4.k(0,-1),a4))},
mJ(c9,d0,d1,d2,d3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8
if(d3<=0||d2<=0||d1<=0)throw A.c(A.i("dimensions must be > 0",null))
if(d0<1)throw A.c(A.i("bevelSegments must be >= 1",null))
s=B.b.l(c9,0.001,Math.min(d3,Math.min(d2,d1))*0.45)
r=d3*0.5
q=r-s
p=d2*0.5
o=p-s
n=d1*0.5
m=n-s
l=A.b([],t.n)
k=t.t
j=A.b([],k)
i=new A.aA(l,j)
h=new A.iY(i)
g=-q
f=-o
e=m+s
h.$6(new A.a(g,f,e),new A.a(q,f,e),new A.a(q,o,e),new A.a(g,o,e),B.p,B.k)
e=-m
d=e-s
h.$6(new A.a(q,f,d),new A.a(g,f,d),new A.a(g,o,d),new A.a(q,o,d),B.D,B.x)
d=o+s
h.$6(new A.a(g,d,m),new A.a(q,d,m),new A.a(q,d,e),new A.a(g,d,e),B.d,B.k)
d=f-s
h.$6(new A.a(g,d,e),new A.a(q,d,e),new A.a(q,d,m),new A.a(g,d,m),B.q,B.k)
d=q+s
h.$6(new A.a(d,f,m),new A.a(d,f,e),new A.a(d,o,e),new A.a(d,o,m),B.k,B.D)
d=g-s
h.$6(new A.a(d,f,e),new A.a(d,f,m),new A.a(d,o,m),new A.a(d,o,e),B.x,B.p)
c=new A.iX(d0,s,i)
c.$5(new A.a(g,o,m),new A.a(q,o,m),B.p,B.d,B.k)
c.$5(new A.a(g,f,m),new A.a(q,f,m),B.q,B.p,B.k)
c.$5(new A.a(g,o,e),new A.a(q,o,e),B.d,B.D,B.k)
c.$5(new A.a(g,f,e),new A.a(q,f,e),B.D,B.q,B.k)
c.$5(new A.a(q,f,m),new A.a(q,o,m),B.p,B.k,B.d)
c.$5(new A.a(g,f,m),new A.a(g,o,m),B.x,B.p,B.d)
c.$5(new A.a(q,f,e),new A.a(q,o,e),B.k,B.D,B.d)
c.$5(new A.a(g,f,e),new A.a(g,o,e),B.D,B.x,B.d)
c.$5(new A.a(q,o,e),new A.a(q,o,m),B.d,B.k,B.p)
c.$5(new A.a(g,o,e),new A.a(g,o,m),B.x,B.d,B.p)
c.$5(new A.a(q,f,e),new A.a(q,f,m),B.k,B.q,B.p)
c.$5(new A.a(g,f,e),new A.a(g,f,m),B.q,B.x,B.p)
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
b9=Math.abs(b7)>0.85?B.k:B.d
c0=b9.a
c1=b9.b
c2=b9.c
c3=b6*c0+b7*c1+b8*c2
i.L(new A.a(e+b6*s,a4+b7*s,a7+b8*s),b5,new A.a(c0-b6*c3,c1-b7*c3,c2-b8*c3).gm(),new A.B(b0,b3))}}for(a7=a3*a6<0,a9=0;a9<d0;)for(b0=a8+a9*b,++a9,b3=a8+a9*b,b2=0;b2<d0;){c4=b0+b2
c5=b3+b2;++b2
c6=b3+b2
c7=b0+b2
if(a7)B.a.G(j,A.b([c4,c5,c6,c4,c6,c7],k))
else B.a.G(j,A.b([c4,c7,c6,c4,c6,c5],k))}}}}c8=new A.a(r,p,n)
return i.a9(new A.a5(c8.k(0,-1),c8))},
oM(d3,d4,d5,d6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2
if(d6.length<2)throw A.c(A.i("tubePath requires at least 2 spine points",null))
if(d5<=0)throw A.c(A.a2(d5,"radius","must be > 0"))
if(d4<3)throw A.c(A.a2(d4,"radialSegments","must be >= 3"))
s=A.bU(d6,!0,t.a)
r=Math.sqrt(B.a.gbq(s).P(0,B.a.gaZ(s)).gO())
if(r>0.0001)B.a.i(s,B.a.gaZ(s))
q=s.length
r=t.G
p=A.b([],r)
for(o=q-1,n=q-2,m=0;m<q;++m){if(m===0){if(1>=s.length)return A.d(s,1)
l=s[1]
k=s[0]
j=new A.a(l.a-k.a,l.b-k.b,l.c-k.c).gm()}else{l=s.length
if(m===o){if(!(o>=0&&o<l))return A.d(s,o)
k=s[o]
if(!(n>=0&&n<l))return A.d(s,n)
l=s[n]
j=new A.a(k.a-l.a,k.b-l.b,k.c-l.c).gm()}else{k=m+1
if(!(k<l))return A.d(s,k)
k=s[k]
i=m-1
if(!(i>=0&&i<l))return A.d(s,i)
i=s[i]
j=new A.a(k.a-i.a,k.b-i.b,k.c-i.c).gm()}}l=j.a
k=j.b
i=j.c
B.a.i(p,l*l+k*k+i*i<1e-8?B.p:j)}h=A.b([],r)
g=A.b([],r)
if(0>=p.length)return A.d(p,0)
r=p[0]
f=Math.abs(r.b)>0.85?B.k:B.d
e=f.P(0,r.k(0,r.aA(f))).gm()
if(0>=p.length)return A.d(p,0)
d=p[0].R(e).gm()
B.a.i(h,e)
B.a.i(g,d)
for(m=0;m<o;m=b){r=p.length
if(!(m<r))return A.d(p,m)
c=p[m]
b=m+1
if(!(b<r))return A.d(p,b)
a=p[b]
a0=c.R(a)
r=a0.a
n=a0.b
l=a0.c
a1=Math.sqrt(r*r+n*n+l*l)
if(a1>0.000001){k=1/a1
a2=A.ai(new A.a(r*k,n*k,l*k),Math.acos(B.b.l(c.a*a.a+c.b*a.b+c.c*a.c,-1,1)))
if(!(m<h.length))return A.d(h,m)
a3=a2.af(h[m]).gm()}else{if(!(m<h.length))return A.d(h,m)
a3=h[m]}a4=a.R(a3).gm()
B.a.i(h,a3)
B.a.i(g,a4)}r=A.b([],t.n)
n=t.t
l=A.b([],n)
a5=new A.aA(r,l)
a6=new A.a(1/0,1/0,1/0)
a7=new A.a(-1/0,-1/0,-1/0)
for(m=0;m<q;++m){if(!(m<s.length))return A.d(s,m)
a8=s[m]
if(!(m<h.length))return A.d(h,m)
a9=h[m]
if(!(m<g.length))return A.d(g,m)
b0=g[m]
if(!(m<p.length))return A.d(p,m)
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
a5.L(new A.a(c5,c6,c7),c4,b1,new A.B(c0,b2))}}c8=d4+1
for(m=0;m<o;){c9=m*c8;++m
d0=m*c8
for(b9=0;b9<d4;++b9){b=c9+b9
d1=d0+b9
d2=d1+1
B.a.G(l,A.b([b,d1,d2,b,d2,b+1],n))}}return a5.a9(new A.a5(a6,a7))},
iT:function iT(a,b){this.a=a
this.b=b},
iV:function iV(){},
iW:function iW(a,b){this.a=a
this.b=b},
iU:function iU(a){this.a=a},
iY:function iY(a){this.a=a},
iX:function iX(a,b,c){this.a=a
this.b=b
this.c=c},
aA:function aA(a,b){this.a=a
this.b=b},
oQ(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l=a1*c*4,k=new Uint8Array(l),j=B.b.I(B.b.l(d.a,0,1)*255),i=B.b.I(B.b.l(d.b,0,1)*255),h=B.b.I(B.b.l(d.c,0,1)*255),g=B.b.I(B.b.l(a.a,0,1)*255),f=B.b.I(B.b.l(a.b,0,1)*255),e=B.b.I(B.b.l(a.c,0,1)*255)
for(s=0,r=0;r<c;++r)for(q=B.e.F(r,b)>=a0,p=0;p<a1;++p){o=!q||B.e.F(p,b)<a0
n=o?j:g
if(!(s>=0&&s<l))return A.d(k,s)
k[s]=n
n=s+1
m=o?i:f
if(!(n<l))return A.d(k,n)
k[n]=m
m=s+2
n=o?h:e
if(!(m<l))return A.d(k,m)
k[m]=n
n=s+3
if(!(n<l))return A.d(k,n)
k[n]=255
s+=4}return k},
oT(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a6*a4*4,a1=new Uint8Array(a0),a2=new A.iZ(a6,a4,a3)
for(s=0,r=0;r<a4;r=p)for(q=r-1,p=r+1,o=0;o<a6;o=n){n=o+1
m=a2.$2(n,q)
l=a2.$2(n,r)
if(typeof l!=="number")return A.bd(l)
if(typeof m!=="number")return m.v()
k=a2.$2(n,p)
if(typeof k!=="number")return A.bd(k)
j=o-1
i=a2.$2(j,q)
h=a2.$2(j,r)
if(typeof h!=="number")return A.bd(h)
if(typeof i!=="number")return i.v()
g=a2.$2(j,p)
if(typeof g!=="number")return A.bd(g)
f=a2.$2(j,p)
e=a2.$2(o,p)
if(typeof e!=="number")return A.bd(e)
if(typeof f!=="number")return f.v()
d=a2.$2(n,p)
if(typeof d!=="number")return A.bd(d)
j=a2.$2(j,q)
c=a2.$2(o,q)
if(typeof c!=="number")return A.bd(c)
if(typeof j!=="number")return j.v()
b=a2.$2(n,q)
if(typeof b!=="number")return A.bd(b)
a=new A.a(-(m+2*l+k-(i+2*h+g))*a5,-(f+2*e+d-(j+2*c+b))*a5,1).gm()
b=B.e.l(B.b.I((a.a*0.5+0.5)*255),0,255)
if(!(s>=0&&s<a0))return A.d(a1,s)
a1[s]=b
b=s+1
c=B.e.l(B.b.I((a.b*0.5+0.5)*255),0,255)
if(!(b<a0))return A.d(a1,b)
a1[b]=c
c=s+2
b=B.e.l(B.b.I((a.c*0.5+0.5)*255),0,255)
if(!(c<a0))return A.d(a1,c)
a1[c]=b
b=s+3
if(!(b<a0))return A.d(a1,b)
a1[b]=255
s+=4}return a1},
oN(a,b,c,d){var s,r,q,p,o,n,m,l,k,j=d*b*4,i=new Uint8Array(j),h=new A.c7()
h.b7(1337)
s=new Float32Array(b)
for(r=0;r<b;++r){q=h.M()
if(!(r<b))return A.d(s,r)
s[r]=(q*2-1)*0.18}p=B.b.I(B.b.l(c,0,1)*255)
for(o=0,n=0;n<b;++n)for(m=0;m<d;++m){l=B.b.l(a+s[n],0.04,1)
if(!(o>=0&&o<j))return A.d(i,o)
i[o]=255
q=o+1
k=B.b.I(l*255)
if(!(q<j))return A.d(i,q)
i[q]=k
k=o+2
if(!(k<j))return A.d(i,k)
i[k]=p
k=o+3
if(!(k<j))return A.d(i,k)
i[k]=255
o+=4}return i},
oU(b1,b2,b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=b5*b4*4,b0=new Uint8Array(a9)
for(s=b1.a,r=b3.a,q=b1.b,p=b3.b,o=b1.c,n=b3.c,m=0,l=0;l<b4;++l){k=l/b4*b2
j=B.b.ab(k)
for(i=0;i<b5;++i){h=i/b5*b2
g=B.b.ab(h)
for(f=1e9,e=-1;e<=1;++e)for(d=j+e,c=-1;c<=1;++c){b=g+c
a=B.e.F(B.e.F(b,b2)+b2,b2)
a0=B.e.F(B.e.F(d,b2)+b2,b2)
a1=h-(b+A.dI(a,a0))
a2=k-(d+A.dI(a+107,a0+233))
a3=Math.sqrt(a1*a1+a2*a2)
if(a3<f)f=a3}a4=B.b.l(f,0,1)
a5=1-a4
a6=B.b.I(B.b.l(s*a5+r*a4,0,1)*255)
a7=B.b.I(B.b.l(q*a5+p*a4,0,1)*255)
a8=B.b.I(B.b.l(o*a5+n*a4,0,1)*255)
if(!(m>=0&&m<a9))return A.d(b0,m)
b0[m]=a6
a5=m+1
if(!(a5<a9))return A.d(b0,a5)
b0[a5]=a7
a5=m+2
if(!(a5<a9))return A.d(b0,a5)
b0[a5]=a8
a5=m+3
if(!(a5<a9))return A.d(b0,a5)
b0[a5]=255
m+=4}}return b0},
oR(b2,b3,b4,b5,b6,b7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=b7*b3*4,a1=new Uint8Array(a0),a2=B.b.I(B.b.l(b5.a,0,1)*255),a3=B.b.I(B.b.l(b5.b,0,1)*255),a4=B.b.I(B.b.l(b5.c,0,1)*255),a5=B.b.I(B.b.l(b2.a,0,1)*255),a6=B.b.I(B.b.l(b2.b,0,1)*255),a7=B.b.I(B.b.l(b2.c,0,1)*255),a8=Math.sqrt(3),a9=b4*1.5,b0=b4*a8,b1=b4*(a8*0.5)
for(s=b6*0.5,r=b0*0.5,q=0,p=0;p<b3;++p)for(o=p/a9,n=0;n<b7;++n){m=B.b.I(o)
l=(m&1)!==0?r:0
k=n-(B.b.I((n-l)/b0)*b0+l)
j=p-m*a9
i=j>0?m+1:m-1
h=(i&1)!==0?r:0
g=n-(B.b.I((n-h)/b0)*b0+h)
f=p-i*a9
e=k*k+j*j<g*g+f*f
d=e?k:g
c=e?j:f
b=Math.abs(b1/Math.cos(B.b.F(B.b.F(Math.atan2(c,d),1.0471975511965976)+1.0471975511965976,1.0471975511965976)-0.5235987755982988)-Math.sqrt(d*d+c*c))<=s
e=b?a2:a5
if(!(q>=0&&q<a0))return A.d(a1,q)
a1[q]=e
e=q+1
a=b?a3:a6
if(!(e<a0))return A.d(a1,e)
a1[e]=a
a=q+2
e=b?a4:a7
if(!(a<a0))return A.d(a1,a)
a1[a]=e
e=q+3
if(!(e<a0))return A.d(a1,e)
a1[e]=255
q+=4}return a1},
oO(a,b,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=a2*a0*4,d=new Uint8Array(e),c=B.b.I(B.b.l(a1,0,1)*255)
for(s=0,r=0;r<a0;++r){q=B.e.cg(r,b)
p=B.e.F(r,b)/b
for(o=1-p,n=0;n<a2;++n){m=B.e.cg(n,b)
l=B.e.F(n,b)/b
k=B.e.F(m+q,4)
j=k===0||k===1
i=B.b.l((j?Math.min(p,o):Math.min(l,1-l))*8,0.65,1)
h=B.b.l(a+Math.sin((j?l:p)*3.141592653589793)*0.12,0.05,0.95)
g=B.b.I(i*255)
if(!(s>=0&&s<e))return A.d(d,s)
d[s]=g
g=s+1
f=B.b.I(h*255)
if(!(g<e))return A.d(d,g)
d[g]=f
f=s+2
if(!(f<e))return A.d(d,f)
d[f]=c
f=s+3
if(!(f<e))return A.d(d,f)
d[f]=255
s+=4}}return d},
oS(a3,a4,a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(a8<=0||a4<=0)throw A.c(A.i("dimensions must be > 0",null))
s=a8*a4*4
r=new Uint8Array(s)
for(q=a3.a,p=a7.a-q,o=a3.b,n=a7.b-o,m=a3.c,l=a7.c-m,k=0,j=0;j<a4;++j)for(i=j/a4*a5,h=0;h<a8;++h){for(g=h/a8*a5,f=0,e=1,d=1,c=0;c<4;++c){f+=A.mM(g*d,i*d)*e
d*=2.02
e*=0.5}b=Math.pow(Math.sin((g+f*a6)*3.141592653589793*2)*0.5+0.5,4)
a=B.b.l(q+p*b,0,1)
a0=B.b.l(o+n*b,0,1)
a1=B.b.l(m+l*b,0,1)
g=B.b.I(a*255)
if(!(k>=0&&k<s))return A.d(r,k)
r[k]=g
g=k+1
a2=B.b.I(a0*255)
if(!(g<s))return A.d(r,g)
r[g]=a2
a2=k+2
g=B.b.I(a1*255)
if(!(a2<s))return A.d(r,a2)
r[a2]=g
g=k+3
if(!(g<s))return A.d(r,g)
r[g]=255
k+=4}return r},
oP(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i,h
if(f<=0||c<=0)throw A.c(A.i("dimensions must be > 0",null))
s=f*c*4
r=new Uint8Array(s)
q=B.b.I(B.b.l(e,0,1)*255)
for(p=0,o=0;o<c;++o)for(n=o/c*4,m=0;m<f;++m){l=m/f
k=Math.sin((l+A.mM(l*4,n)*b)*d*3.141592653589793*2)*0.5+0.5
j=B.b.l(a+k*0.12,0.05,0.95)
i=B.b.I(B.b.l(0.85+(1-k)*0.15,0,1)*255)
if(!(p>=0&&p<s))return A.d(r,p)
r[p]=i
i=p+1
h=B.b.I(j*255)
if(!(i<s))return A.d(r,i)
r[i]=h
h=p+2
if(!(h<s))return A.d(r,h)
r[h]=q
h=p+3
if(!(h<s))return A.d(r,h)
r[h]=255
p+=4}return r},
mM(a,b){var s=B.b.ab(a),r=B.b.ab(b),q=a-s,p=b-r,o=q*q*q*(q*(q*6-15)+10),n=p*p*p*(p*(p*6-15)+10),m=s+1,l=r+1,k=1-o,j=1-n
return A.dI(s,r)*k*j+A.dI(m,r)*o*j+A.dI(s,l)*k*n+A.dI(m,l)*o*n},
dI(a,b){var s=a*374761393+b*668265263&2147483647
return((s^s>>>13)*1274126177&2147483647)/2147483647},
iZ:function iZ(a,b,c){this.a=a
this.b=b
this.c=c},
mV(a){return a*a*a*(a*(a*6-15)+10)},
jp(a,b,c){var s=a&7,r=s<4,q=r?b:c,p=r?c:b
r=(s&1)!==0?-q:q
return r+((s&2)!==0?-2*p:2*p)},
jo:function jo(a){this.a=a
this.b=$},
jn:function jn(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
jy:function jy(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.x=_.w=_.r=_.f=$},
cj(a){var s,r,q,p,o,n,m,l,k,j
for(s=a.$ti,r=new A.at(a,a.gB(0),s.h("at<T.E>")),s=s.h("T.E"),q=B.h2,p=B.hz,o=!1;r.n();o=!0){n=r.d
if(n==null)n=s.a(n)
m=n.a
l=Math.min(q.a,m)
k=n.b
j=Math.min(q.b,k)
n=n.c
q=new A.a(l,j,Math.min(q.c,n))
p=new A.a(Math.max(p.a,m),Math.max(p.b,k),Math.max(p.c,n))}if(!o)throw A.c(A.i("Aabb.fromPoints requires at least one point",null))
return new A.a5(q,p)},
a5:function a5(a,b){this.a=a
this.b=b},
o6(a){A.ep(a)
return a*a},
mm(a){var s
A.ep(a)
if(a<0.5)return 4*a*a*a
s=2*a-2
return 0.5*s*s*s+1},
e0:function e0(a){this.a=a},
mo(a){var s,r,q,p,o,n,m=a.a,l=new A.i7(),k=m.length
if(3>=k)return A.d(m,3)
s=m[3]
r=m[0]
if(7>=k)return A.d(m,7)
q=m[7]
p=m[4]
if(11>=k)return A.d(m,11)
o=m[11]
n=m[8]
if(15>=k)return A.d(m,15)
return new A.i6(A.b([l.$4(s+r,q+p,o+n,m[15]+m[12]),l.$4(m[3]-m[0],m[7]-m[4],m[11]-m[8],m[15]-m[12]),l.$4(m[3]+m[1],m[7]+m[5],m[11]+m[9],m[15]+m[13]),l.$4(m[3]-m[1],m[7]-m[5],m[11]-m[9],m[15]-m[13]),l.$4(m[3]+m[2],m[7]+m[6],m[11]+m[10],m[15]+m[14]),l.$4(m[3]-m[2],m[7]-m[6],m[11]-m[10],m[15]-m[14])],t.dV))},
bX:function bX(a,b){this.a=a
this.b=b},
di:function di(a,b){this.a=a
this.b=b},
i6:function i6(a){this.a=a},
i7:function i7(){},
my(a){if(a.length!==16)throw A.c(A.i("Mat4.fromColumnMajor requires 16 values",null))
return new A.bl(new Float32Array(A.t(a)))},
mz(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.bl(q)},
lt(a,b,c){var s=b.gm(),r=c.R(s).gm(),q=s.R(r),p=new Float32Array(16)
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
p[12]=-r.aA(a)
p[13]=-q.aA(a)
p[14]=s.aA(a)
p[15]=1
return new A.bl(p)},
bl:function bl(a){this.a=a},
ip:function ip(){},
ai(a,b){var s=a.gm(),r=b/2,q=Math.sin(r)
return new A.bZ(s.a*q,s.b*q,s.c*q,Math.cos(r))},
mN(a,b){var s,r=a.gm(),q=b.gm(),p=r.aA(q)
if(p>=0.999999)return B.o
if(p<=-0.999999){s=B.k.R(r)
return A.ai((s.gO()<0.001?B.d.R(r):s).gm(),3.141592653589793)}s=r.R(q)
return new A.bZ(s.a,s.b,s.c,1+p).gm()},
bZ:function bZ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
j1:function j1(a,b){this.a=a
this.b=b},
j2:function j2(a,b,c,d){var _=this
_.a=a
_.b=b
_.d=c
_.f=d},
lm(a,b){var s=A.b([],t.n),r=A.aN(b,t.a)
s=new A.hK(r,!0,s)
if(r.length<2)A.l(A.i("CatmullRomSpline3D requires at least 2 control points",null))
s.dZ()
return s},
hK:function hK(a,b,c){this.a=a
this.b=b
this.c=c},
hL:function hL(){},
O:function O(a,b,c){this.a=a
this.b=b
this.c=c},
lB(a,b,c){var s=a.a,r=a.b,q=a.c
return new A.a(s+(b.a-s)*c,r+(b.b-r)*c,q+(b.c-q)*c)},
B:function B(a,b){this.a=a
this.b=b},
a:function a(a,b,c){this.a=a
this.b=b
this.c=c},
hH:function hH(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.Q=_.z=_.y=_.x=_.w=0},
hI:function hI(a,b,c){this.a=a
this.b=b
this.c=c},
i8(a,b,c,d,e){var s,r,q,p
if(b.gO()>0.000001){s=Math.sqrt(b.gO())
r=s<1e-9?B.ax:new A.B(b.a/s,b.b/s)}else r=B.az
q=new A.dj(r,a,e,d,c)
if(a<0)A.l(A.a2(a,"amplitude","must be >= 0"))
if(e<=0)A.l(A.a2(e,"wavelength","must be > 0"))
p=6.283185307179586/e
q.f=p
q.r=c*p
q.w=r.a
q.x=r.b
return q},
dj:function dj(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.x=_.w=_.r=_.f=$},
i9:function i9(a,b){this.a=a
this.b=b},
ll(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.ez(j,i,b,k,f,g,a,p,e,h,l,o,m,c,!1,n)},
ey:function ey(a,b){this.a=a
this.b=b},
ck:function ck(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ez:function ez(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
hE:function hE(){},
ot(a){var s=t.eH,r=A.bU(a,!0,s)
B.a.ao(r,new A.iD())
s=new A.iC(A.aN(r,s))
s.p()
return s},
aP(a,b,c,d,e,f,g,h,i,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0){var s,r,q,p,o,n,m,l,k,j=$.mE
$.mE=j+1
s=b0==null?b7:b0
r=a5==null?b3:a5
q=d==null
p=q?B.dg:A.aN(d,t.dz)
o=c9==null?B.dh:A.aN(c9,t.bn)
n=A.b([],t.br)
q=q?A.b([],t.t):A.du(1,0,!1,t.S)
if(c5!=null){m=new A.c7()
m.b7(c5)}else m=B.bJ
if(a8>4294967295)A.l(A.aQ(a8,0,4294967295,"length",null))
l=J.lo(new Array(a8),t.cK)
for(k=0;k<a8;++k)l[k]=new A.hb()
j=new A.fn(b1,a2,a3,h,c,j,c6,d0,b,c8,c4,p,b5,a7,b6,a9,b7,s,b3,r,c7,i,a0,f,b4,a6,b2,a4,a1,a,g,c3,c1,c2,c0,b8,b9,n,e,o,a8,m,l,q)
j.p()
return j},
cB:function cB(a,b){this.a=a
this.b=b},
fm:function fm(a,b){this.a=a
this.b=b},
dE:function dE(){},
aO:function aO(a,b){this.a=a
this.b=b},
iC:function iC(a){this.a=a},
iD:function iD(){},
d3:function d3(a,b){this.a=a
this.b=b},
cC:function cC(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
cL:function cL(a,b){this.a=a
this.b=b},
bG:function bG(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
hb:function hb(){var _=this
_.at=_.as=_.Q=_.z=_.y=_.x=_.w=_.r=_.f=_.e=_.d=_.c=_.b=_.a=0
_.CW=_.ch=_.ay=_.ax=1
_.cy=_.cx=0
_.db=1
_.dy=_.dx=0
_.fr=!1},
fn:function fn(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.x=f
_.y=g
_.z=h
_.Q=i
_.as=j
_.at=k
_.ax=l
_.cx=!0
_.cy=m
_.db=n
_.dx=o
_.dy=p
_.fr=q
_.fx=r
_.fy=s
_.go=a0
_.id=a1
_.k1=a2
_.k2=a3
_.k4=a4
_.ok=a5
_.p1=a6
_.p2=a7
_.p3=a8
_.p4=a9
_.RG=b0
_.rx=b1
_.ry=b2
_.to=b3
_.x1=b4
_.x2=b5
_.xr=b6
_.y1=b7
_.y2=b8
_.d3=b9
_.aK=c0
_.bl=c1
_.d4=c2
_.bm=c3
_.f_=_.eZ=_.bn=_.d5=_.al=0
_.f0=c4},
et(a){var s=2*a.M()-1,r=6.283185307179586*a.M(),q=Math.sqrt(Math.max(0,1-s*s))
return new A.a(q*Math.cos(r),s,q*Math.sin(r))},
bP:function bP(a,b){this.a=a
this.b=b},
bY:function bY(a,b){this.b=a
this.c=b},
hG:function hG(a,b){this.a=a
this.b=b},
co:function co(a,b){this.a=a
this.b=b},
jk:function jk(a,b){this.a=a
this.b=b},
jj:function jj(a,b){this.a=a
this.b=b},
fE:function fE(){},
hP:function hP(a,b){this.a=a
this.b=b},
db:function db(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eG:function eG(a,b){this.a=a
this.b=b},
d8:function d8(a,b){this.a=a
this.b=b},
cq:function cq(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fX:function fX(a,b){this.a=a
this.b=b},
d4:function d4(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
fY:function fY(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
eB:function eB(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fZ:function fZ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
eN:function eN(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
h0:function h0(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
h1:function h1(a,b){this.a=a
this.b=b},
df:function df(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
h2:function h2(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eP:function eP(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
h3:function h3(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
f_:function f_(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f
_.w=g},
h7:function h7(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dx:function dx(a,b,c){this.a=a
this.b=b
this.c=c},
ha:function ha(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cn:function cn(a){this.b=a},
eD:function eD(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ah(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.W(a.a,a.b,b,c,s,r)},
lw:function lw(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var _=this
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
ou(a){var s
switch(a.a){case 0:s=0
break
case 1:s=1
break
case 2:s=2.5
break
case 3:s=3.5
break
default:s=null}return s},
dG:function dG(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
he:function he(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fv:function fv(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hf:function hf(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
mQ(a){var s=A.lt(B.d,B.q,Math.abs(0)<0.99?B.k:B.d)
return new A.c_(A.mz(1,1,B.e.l(1,0.1,3),0.05).k(0,s))},
c_:function c_(a){this.a=a},
fC:function fC(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
hi:function hi(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
qw(c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3=u.l,b4="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[7]=float[7](\n  0.167465,0.153582,0.118331,0.076665,0.041582,0.018907,0.007203\n);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<7;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b5="bloomBlurH",b6="bloomBlurV",b7="dofBlurH",b8="dofBlurV",b9={},c0=c4.b
if(!c0.A(0,"shadows"))throw A.c(A.a2(c4,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=c0.A(0,"ssao")
r=c0.A(0,"bloom")
q=c0.A(0,"dof")
p=c0.A(0,"grade")
o=c0.A(0,"ps1")
n=c0.A(0,"vhs")
m=c0.A(0,"volumetric")
c0=B.e.a_(e9+1,2)
l=B.e.a_(e8+1,2)
k=A.ah(B.ai,e9,e8,e7,b2)
j=A.ah(B.ai.d9(),e9,e8,b2,b2)
i=e7>1
h=A.ah(B.eB,e9,e8,b2,i?2:1)
g=A.ah(B.eA,c0,l,b2,b2)
A.ah(B.eJ,e9,e8,b2,b2)
f=A.ah(B.eG,e9,e8,b2,b2)
e=A.ah(B.ez,f0,f0,b2,b2)
d=A.ah(B.eC,c0,l,b2,b2)
c=A.ah(B.eD,c0,l,b2,b2)
b=A.ah(B.eH,c0,l,b2,b2)
a=A.ah(B.eI,c0,l,b2,b2)
a0=$.nJ()
a1=i?1:0
a2=A.ah(a0,e9,e8,b2,a1+(m?1:0)+1)
a0=A.ah(B.ew,c0,l,b2,b2)
a1=A.ah(B.ex,c0,l,b2,b2)
a3=A.ah(B.ey,e9,e8,b2,b2)
a4=A.ah(B.eE,e9,e8,b2,b2)
a5=A.ah(B.eK,e9,e8,b2,b2)
a6=A.ah(B.eF,e9,e8,b2,b2)
a7=i?new A.dx(c2,k,j):b2
b9.a=null
a8=A.mQ(B.bH)
if(m){a9=i?j:k
b0=new A.fR(c1,b3,"#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\n\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform mat4 uViewProjection;\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform float uShaftIntensity;\nuniform float uFogDensity;\nuniform float uAnisotropy;\nuniform mat4 uView;\nuniform mat4 uInverseProjection;\nuniform vec3 uVolumetricAlbedo;\nuniform float uVolumetricHeightFalloff;\nuniform float uVolumetricDustDensity;\nuniform float uVolumetricJitter;\nuniform float uVolumetricIntensity;\nuniform float uVolumetricSampleCount;\nuniform float uVolumetricSourceCount;\n\nuniform vec3 uSourcePosition0;\nuniform vec3 uSourceColor0;\nuniform float uSourceIntensity0;\nuniform float uSourceReferenceDistance0;\nuniform float uSourceCutoffDistance0;\nuniform vec3 uSourcePosition1;\nuniform vec3 uSourceColor1;\nuniform float uSourceIntensity1;\nuniform float uSourceReferenceDistance1;\nuniform float uSourceCutoffDistance1;\nuniform vec3 uSourcePosition2;\nuniform vec3 uSourceColor2;\nuniform float uSourceIntensity2;\nuniform float uSourceReferenceDistance2;\nuniform float uSourceCutoffDistance2;\nuniform vec3 uSourcePosition3;\nuniform vec3 uSourceColor3;\nuniform float uSourceIntensity3;\nuniform float uSourceReferenceDistance3;\nuniform float uSourceCutoffDistance3;\n\nfloat linearDepth(float depth) {\n  float z = depth * 2.0 - 1.0;\n  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);\n}\n\nfloat phaseHenyeyGreenstein(float cosTheta, float anisotropy) {\n  float g = clamp(anisotropy, -0.85, 0.85);\n  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;\n  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));\n}\n\nvec3 sourceContribution(\n  vec3 position,\n  vec3 color,\n  float intensity,\n  float referenceDistance,\n  float cutoffDistance,\n  vec3 viewRay,\n  float rayLength\n) {\n  vec4 clip = uViewProjection * vec4(position, 1.0);\n  if (clip.w <= 0.0) return vec3(0.0);\n  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;\n  float sourceDistance = length(sourceView);\n  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);\n  vec3 sampleToSource = sourceView - viewRay * tClosest;\n  float distanceToSource = max(length(sampleToSource), 1e-3);\n  float cutoff = 1.0 - smoothstep(\n    cutoffDistance * 0.65, cutoffDistance, sourceDistance);\n  float inverseSquare = intensity * referenceDistance * referenceDistance /\n      max(distanceToSource * distanceToSource,\n          referenceDistance * referenceDistance);\n  // The incoming direction is source -> sample and the outgoing direction is\n  // sample -> camera. This is the same phase convention as the directional\n  // medium path, but now evaluated against the located source.\n  float phase = phaseHenyeyGreenstein(\n    dot(normalize(sampleToSource), viewRay), uAnisotropy);\n  // Located practicals and lightning must also acquire visible body in a\n  // dust-filled room. Use the same broad haze plus particulate density as the\n  // directional march; otherwise a clear-air fog toggle would accidentally\n  // erase dust-lit source rays while the directional shafts still showed it.\n  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);\n  float mediumWeight = 1.0 - exp(-max(\n    mediumDensity * min(rayLength, cutoffDistance), 0.0));\n  float pathWeight = clamp(\n    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);\n  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *\n    uVolumetricIntensity * 0.35;\n}\n\nvoid main() {\n  float depth = texture(uSceneDepth, vUv).r;\n  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);\n  viewPoint /= max(abs(viewPoint.w), 1e-5);\n  vec3 viewRay = normalize(viewPoint.xyz);\n  // linearDepth is camera-space Z; convert it to distance along the actual\n  // reconstructed ray so wide and tall projections integrate equally.\n  float cameraDepth = linearDepth(depth);\n  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);\n  float density = max(uFogDensity, 0.0);\n\n  // A fixed, bounded integral keeps the pass deterministic and makes its\n  // cost predictable on weak adapters. The depth buffer stops integration at\n  // the first opaque surface, so shafts do not leak through geometry.\n  const int maxSampleCount = 24;\n  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));\n  vec3 scatter = vec3(0.0);\n  float transmittance = 1.0;\n  float stepLength = rayLength / float(sampleCount);\n  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);\n  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);\n  for (int i = 0; i < maxSampleCount; i++) {\n    if (i >= sampleCount) break;\n    float distanceAlongRay = clamp(\n      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);\n    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));\n    // Dust is a separate, host-resolved particulate phase. It is denser near\n    // the occupied room volume than the broad atmospheric haze, so shafts gain\n    // visible body without turning the far horizon opaque. At zero density the\n    // extra term is exactly zero and the established fog path is unchanged.\n    float dustWeight = exp(-max(distanceAlongRay *\n      uVolumetricHeightFalloff * 0.45, 0.0));\n    float opticalDensity = density +\n      max(uVolumetricDustDensity, 0.0) * dustWeight;\n    float opticalDepth = opticalDensity * stepLength * heightWeight;\n    float sampleTransmittance = exp(-opticalDepth);\n    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);\n    scatter += transmittance * (uLightColor * uVolumetricAlbedo *\n      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;\n    transmittance *= sampleTransmittance;\n  }\n\n  if (uVolumetricSourceCount > 0.5) {\n    scatter += sourceContribution(\n      uSourcePosition0, uSourceColor0, uSourceIntensity0,\n      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 1.5) {\n    scatter += sourceContribution(\n      uSourcePosition1, uSourceColor1, uSourceIntensity1,\n      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 2.5) {\n    scatter += sourceContribution(\n      uSourcePosition2, uSourceColor2, uSourceIntensity2,\n      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 3.5) {\n    scatter += sourceContribution(\n      uSourcePosition3, uSourceColor3, uSourceIntensity3,\n      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);\n  }\n\n  // Fade the final sample at the far plane and keep the additive output\n  // bounded so a storm flash cannot blow out the entire frame.\n  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);\n  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);\n}\n","#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\nuniform sampler2D uVolumetric;\nuniform float uVolumetricStrength;\n\nvoid main() {\n  vec3 light = texture(uVolumetric, vUv).rgb;\n  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);\n}\n",c2,e1,c8,g,f,a9,h,A.b([],t.J))}else b0=b2
g=t.cL
b1=A.b([],g)
if(!m)h=i?j:k
if(r){B.a.G(b1,A.b([new A.d4(c1,b3,b4,c2,b5,b5,B.bp,!0,h,b,e0,c0,l),new A.d4(c1,b3,b4,c2,b6,b6,B.hN,!1,b,a,c6,c0,l),new A.eB(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",c2,c7,a,h,a2)],g))
h=a2}if(q){B.a.G(b1,A.b([new A.df(c1,b3,b4,c2,b7,b7,B.bq,h,a0,e0,c0,l),new A.df(c1,b3,b4,c2,b8,b8,B.hO,a0,a1,d1,c0,l),new A.eP(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvoid main(){\n  if(uStrength<=0.0001){\n    oColor=vec4(texture(uSharp,vUv).rgb,1.0);\n    return;\n  }\n\n  vec2 texelSize=1.0/vec2(textureSize(uSharp,0));\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n\n  // Signed disparity relative to physical focal plane:\n  // Foreground (signedDisparity < 0) exhibits optical hyper-focal expansion,\n  // blurring at a steeper rate than background (signedDisparity > 0).\n  float signedDisparity=depth-uFocusDistance;\n  float normRange=max(uFocusRange,0.0001);\n  float signedCoc=(signedDisparity<0.0)\n    ?(signedDisparity/(normRange*0.75))\n    :(signedDisparity/(normRange*1.25));\n  float rawCoc=clamp(abs(signedCoc),0.0,1.0)*clamp(uStrength,0.0,1.0);\n\n  // Depth-aware disparity weighting to prevent out-of-focus foreground halos\n  // from bleeding over sharp in-focus background edges.\n  float depthN=linearDepth(texture(uSceneDepth,vUv+vec2(0.0,texelSize.y*2.0)).r);\n  float depthS=linearDepth(texture(uSceneDepth,vUv-vec2(0.0,texelSize.y*2.0)).r);\n  float depthE=linearDepth(texture(uSceneDepth,vUv+vec2(texelSize.x*2.0,0.0)).r);\n  float depthW=linearDepth(texture(uSceneDepth,vUv-vec2(texelSize.x*2.0,0.0)).r);\n  float minNeighborDepth=min(min(depthN,depthS),min(depthE,depthW));\n\n  // If this pixel is in-focus background but neighbors are close foreground,\n  // suppress foreground halo bleeding onto this sharp pixel.\n  float coc=rawCoc;\n  if(depth>uFocusDistance && minNeighborDepth<uFocusDistance){\n    float bleedProtection=clamp((depth-minNeighborDepth)/(normRange*2.0),0.0,1.0);\n    coc=mix(rawCoc,rawCoc*0.25,bleedProtection);\n  }\n\n  // Smooth cubic hermite curve for cinematic optical circle of confusion\n  float smoothCoc=coc*coc*(3.0-2.0*coc);\n\n  // Longitudinal (axial) chromatic aberration inside the optical bokeh circle:\n  // Out-of-focus highlights separate into subtle complementary chromatic fringes.\n  vec2 radialDir=vUv-vec2(0.5);\n  float radialDist=length(radialDir);\n  vec2 chromaDir=(radialDist>0.001)?(radialDir/radialDist):vec2(0.0,1.0);\n  vec2 chromaOffset=chromaDir*(smoothCoc*texelSize*2.8*sign(signedDisparity));\n\n  vec3 blurred=vec3(\n    texture(uBlurred,vUv-chromaOffset).r,\n    texture(uBlurred,vUv).g,\n    texture(uBlurred,vUv+chromaOffset).b\n  );\n\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,smoothCoc),1.0);\n}\n",c2,e0,d2,e1,c8,h,f,a1,a3)],g))
h=a3}if(p){B.a.i(b1,new A.f_(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",c2,d4,h,a4))
h=a4}if(o){B.a.i(b1,new A.fv(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",c2,h,a5))
h=a5}if(n){B.a.i(b1,new A.fQ(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',c2,e6,e5,h,a6))
h=a6}j=A.b([new A.eN(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d7,d6,c5,f)],g)
if(s)j.push(new A.fG(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=16;\nconst vec3 KERNEL[16]=vec3[16](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48),\n  vec3( 0.22, 0.14, 0.72),\n  vec3(-0.18,-0.25, 0.65),\n  vec3( 0.42,-0.28, 0.35),\n  vec3(-0.36, 0.32, 0.52),\n  vec3( 0.15, 0.58, 0.25),\n  vec3(-0.48, 0.12, 0.39),\n  vec3( 0.28,-0.52, 0.22),\n  vec3(-0.24,-0.42, 0.58)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  float rawDepth=texture(uSceneDepth,vUv).r;\n  if(rawDepth>=0.9999){\n    oColor=vec4(1.0);\n    return;\n  }\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    vec3 toOccluder=occluderView-originView;\n    float angleWeight=max(dot(normalView,normalize(toOccluder)),0.0);\n    float bias=max(0.015,abs(originView.z)*0.001);\n    occlusion+=(occluderView.z>=samplePos.z+bias?1.0:0.0)*rangeCheck*(0.35+0.65*angleWeight);\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",c2,e1,c8,d))
if(s)j.push(new A.fF(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float rawCenter=texture(uSceneDepth,vUv).r;\n  if(rawCenter>=0.9999){\n    oColor=vec4(1.0);\n    return;\n  }\n  float centerDepth=linearDepth(rawCenter);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleRaw=texture(uSceneDepth,sampleUv).r;\n      if(sampleRaw>=0.9999) continue;\n      float sampleDepth=linearDepth(sampleRaw);\n      float spatialDistSq=float(x*x+y*y);\n      float spatialWeight=exp(-spatialDistSq*0.22);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*6.0);\n      float totalWeight=spatialWeight*depthWeight;\n      sum+=texture(uSsaoRaw,sampleUv).r*totalWeight;\n      weightSum+=totalWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',c2,e4,e1,c8,c0,l,d,c))
j.push(new A.fC(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d7,d6,c5,c9,b2,b2,new A.kt(b9),e))
j.push(new A.fD(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nuniform vec3 uReflectionColor;\nuniform float uReflectionIntensity;\nuniform float uReflectionConfidence;\nuniform vec2 uShadowMapTexelSize;\nuniform float uShadowFilterRadius;\nuniform float uShadowBias;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uSpecularScale;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nuniform float uSurfaceSnowCoverage;\nuniform float uSurfaceDissolution;\nuniform float uThermalSourceCount;\nuniform vec3 uThermalSourcePosition0;\nuniform float uThermalSourceRadius0;\nuniform float uThermalSourceDissolution0;\nuniform vec3 uThermalSourcePosition1;\nuniform float uThermalSourceRadius1;\nuniform float uThermalSourceDissolution1;\nuniform vec3 uThermalSourcePosition2;\nuniform float uThermalSourceRadius2;\nuniform float uThermalSourceDissolution2;\nuniform vec3 uThermalSourcePosition3;\nuniform float uThermalSourceRadius3;\nuniform float uThermalSourceDissolution3;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nfloat directSpotAttenuation(vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,float lightRange,float innerCos,float outerCos,float enabled){\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return coneFalloff*distanceFalloff*enabled;\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  float atten=directSpotAttenuation(worldPos,lightPosition,lightDirection,\n    lightRange,innerCos,outerCos,enabled);\n  return lightColor*lightIntensity*ndotl*atten;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\n// Disney/Burley energy-conserving diffuse retro-reflection model\nfloat diffuseBurley(float ndotl,float ndotv,float lndoth,float roughness){\n  float fd90=0.5+2.0*roughness*lndoth*lndoth;\n  float lightScatter=1.0+(fd90-1.0)*pow(clamp(1.0-ndotl,0.0,1.0),5.0);\n  float viewScatter=1.0+(fd90-1.0)*pow(clamp(1.0-ndotv,0.0,1.0),5.0);\n  return lightScatter*viewScatter;\n}\n\n// Heitz (2014) height-correlated Smith GGX visibility: V = G / (4 * NdotV * NdotL)\nfloat visibilitySmithGgxCorrelated(float ndotv,float ndotl,float roughness){\n  float a2=roughness*roughness;\n  float ggxV=ndotl*sqrt(ndotv*ndotv*(1.0-a2)+a2);\n  float ggxL=ndotv*sqrt(ndotl*ndotl*(1.0-a2)+a2);\n  return 0.5/max(ggxV+ggxL,0.0001);\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 fresnelSchlickRoughness(float cosTheta,vec3 f0,float roughness){\n  return f0+(max(vec3(1.0-roughness),f0)-f0)*pow(clamp(1.0-cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0001);\n  float ndotl=max(dot(normal,lightDir),0.0001);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlickRoughness(hdotv,f0,roughness);\n  float distribution=distributionGgx(ndoth,roughness);\n  float vis=visibilitySmithGgxCorrelated(ndotv,ndotl,roughness);\n  return distribution*vis*fresnel*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog keeps the smooth distance ramp for authored horizon control, but\n// the participating-medium term is an analytic optical depth along the actual\n// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the\n// integral has a stable constant-height limit and therefore does not shimmer\n// when a surface is nearly level with the camera. Zero density remains an\n// exact no-op; the host can still use the distance ramp independently.\nfloat heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){\n  float segmentLength=length(rayEnd-rayStart);\n  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;\n  float falloff=max(uFogHeightFalloff,0.);\n  float h0=max(rayStart.y,0.);\n  float h1=max(rayEnd.y,0.);\n  float integral;\n  if(falloff<=0.||abs(h1-h0)<=0.0001){\n    integral=segmentLength*exp(-falloff*h0);\n  }else{\n    float denominator=falloff*(h1-h0);\n    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;\n  }\n  return max(uFogDensity*integral,0.);\n}\n\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);\n  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);\n  float mediumFactor=1.-exp(-opticalDepth);\n  return clamp(max(distFactor,mediumFactor),0.,1.);\n}\n\nconst vec2 VOGEL_16[16]=vec2[16](\n  vec2( 0.1768,  0.0000),\n  vec2(-0.2263,  0.2064),\n  vec2( 0.0346, -0.3938),\n  vec2( 0.2809,  0.3739),\n  vec2(-0.5186, -0.1111),\n  vec2( 0.4907, -0.3224),\n  vec2(-0.1724,  0.6137),\n  vec2(-0.2642, -0.6316),\n  vec2( 0.6186,  0.3860),\n  vec2(-0.6698,  0.3824),\n  vec2( 0.3479, -0.7314),\n  vec2( 0.1770,  0.8291),\n  vec2(-0.6558, -0.5927),\n  vec2( 0.8719,  0.2891),\n  vec2(-0.7099,  0.6348),\n  vec2( 0.1983, -0.9641)\n);\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);\n  // 16-tap Vogel spiral with golden ratio rotation produces silky smooth\n  // penumbras free of regular lattice banding or directional noise.\n  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);\n  // Adaptive contact-hardening: estimate blocker proximity to sharpen contact shadows\n  float blockerSum=0.0;\n  float blockerCount=0.0;\n  for(int b=0;b<4;b++){\n    float depthSample=texture(uShadowMap,projCoord.xy+VOGEL_16[b*4]*t*1.5).r;\n    if(depthSample<projCoord.z-bias){\n      blockerSum+=depthSample;\n      blockerCount+=1.0;\n    }\n  }\n  float penumbraScale=1.0;\n  if(blockerCount>0.0){\n    float avgBlockerDepth=blockerSum/blockerCount;\n    float penumbraRatio=clamp((projCoord.z-avgBlockerDepth)/max(projCoord.z,0.0001),0.0,1.0);\n    penumbraScale=mix(0.38,1.0,smoothstep(0.0002,0.012,penumbraRatio));\n  }\n  vec2 filterRadius=t*penumbraScale;\n  float sum=0.;\n  for(int i=0;i<16;i++){\n    sum+=sampleShadow(projCoord+vec3(VOGEL_16[i]*filterRadius,0.),bias);\n  }\n  return sum/16.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  direct*=uDirectLightScale;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  float upward=clamp(n.y*0.5+0.5,0.0,1.0);\n  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao*mix(0.85,1.15,upward);\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Weather changes the material before direct and environment response.\n  // Thawing therefore affects the same specular lobe the viewer sees,\n  // instead of changing only diffuse color after the highlight is computed.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);\n  // A steady spherical conductive field decays approximately as 1/r. The\n  // host keeps the slow latent material memory in uSurfaceDissolution; this\n  // local term therefore models the spatial heat field without making warm\n  // surfaces snap back or disappear at an arbitrary exponential radius.\n  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/\n      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));\n  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/\n      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));\n  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/\n      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));\n  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/\n      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));\n  thermalDissolution=clamp(thermalDissolution,0.0,1.0);\n  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*\n    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);\n  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);\n  float dissolution=thermalDissolution;\n  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);\n  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  // A continuous water film forms a second dielectric lobe. It smooths the\n  // authored surface only as coverage rises, so damp cloth stays diffuse\n  // while puddled stone gains a tight grazing reflection.\n  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);\n  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  float spotAtten0=directSpotAttenuation(vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  if(spotAtten0>0.001){\n    specular+=specularContribution(n,viewDir,normalize(uDirectSpotPosition0-vWorldPos),\n      uDirectSpotColor0,uDirectSpotIntensity0,spotAtten0,baseColor,specRough,metal);\n  }\n  float spotAtten1=directSpotAttenuation(vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  if(spotAtten1>0.001){\n    specular+=specularContribution(n,viewDir,normalize(uDirectSpotPosition1-vWorldPos),\n      uDirectSpotColor1,uDirectSpotIntensity1,spotAtten1,baseColor,specRough,metal);\n  }\n  float spotAtten2=directSpotAttenuation(vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  if(spotAtten2>0.001){\n    specular+=specularContribution(n,viewDir,normalize(uDirectSpotPosition2-vWorldPos),\n      uDirectSpotColor2,uDirectSpotIntensity2,spotAtten2,baseColor,specRough,metal);\n  }\n  specular*=uDirectLightScale*uSpecularScale;\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 sunLightDir=normalize(uDirectionalDirection);\n  vec3 sunHalfDir=normalize(viewDir+sunLightDir);\n  float sunNdotV=max(dot(n,viewDir),0.0001);\n  float sunHdotL=max(dot(sunHalfDir,sunLightDir),0.0);\n  float burleySun=diffuseBurley(directionalNdotL,sunNdotV,sunHdotL,specRough);\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*mix(1.0-0.25*rough,burleySun,0.65));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);\n  float coat=coatStrength*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*\n    uDirectLightScale*uSpecularScale;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  // Environment fallback reflections are deliberately bounded and weighted\n  // by wetness/grazing angle. A real probe/history hit can raise confidence;\n  // the current host fallback remains visible but never masquerades as SSR.\n  float reflectionNdotV=max(dot(n,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metal);\n  vec3 envFresnel=f0+(max(vec3(1.0-specRough),f0)-f0)*pow(clamp(1.0-reflectionNdotV,0.0,1.0),5.0);\n  float envGloss=(1.0-specRough)*(1.0-specRough);\n  float reflectionSurface=clamp(metal*0.85+(1.0-metal)*(wetness+0.18*dissolution+envGloss*0.25),0.0,1.0);\n  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);\n  float reflectionWeight=clamp(\n    uReflectionIntensity*reflectionSurface*\n      (1.0-0.72*rough)*reflectionConfidence,\n    0.0,1.0);\n  vec3 reflectDir=reflect(-viewDir,n);\n  float refUp=clamp(reflectDir.y*0.5+0.5,0.0,1.0);\n  vec3 envRadiance=mix(uAmbientColor*0.35,mix(uAmbientColor,uReflectionColor,refUp),refUp);\n  vec3 sunReflectDir=normalize(uDirectionalDirection);\n  float sunRdotL=max(dot(reflectDir,sunReflectDir),0.0);\n  envRadiance+=uDirectionalColor*pow(sunRdotL,mix(32.0,4.0,specRough))*(1.0-specRough)*0.4;\n  lit+=envRadiance*envFresnel*reflectionWeight*ao;\n  float backScatter=max(dot(-viewDir,normalize(uDirectionalDirection)),0.0);\n  vec3 subsurface=baseColor*uDirectionalColor*(pow(backScatter,4.0)*(1.0-metal)*0.12*uDirectionalIntensity);\n  float wrapNdotL=max((directionalNdotL+0.35)/1.35,0.0);\n  float rimWrap=pow(clamp(1.0-coatNdotV,0.0,1.0),2.5);\n  vec3 wrapSubsurface=baseColor*uDirectionalColor*(wrapNdotL*rimWrap*(1.0-metal)*0.14*uDirectionalIntensity);\n  lit+=subsurface+wrapSubsurface;\n  // Wave crest foam glint and subsurface forward scatter for organic water bodies\n  float foamFactor=clamp(vColor.r*vColor.g*vColor.b,0.0,1.0);\n  if(foamFactor>0.04){\n    vec3 foamSheen=vec3(0.92,0.96,1.0)*uDirectionalColor*uDirectionalIntensity*0.55;\n    lit=mix(lit,lit+foamSheen,foamFactor*0.7);\n  }\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  oGlow=vec4(emissive,1.);\n}\n",d7,d6,c5,d8,d9,d3,d5,e2,new A.ku(b9,a8),c9,d0,e3,s,e9,e8,f0,f0,e,c,k))
if(a7!=null)j.push(a7)
if(b0!=null)j.push(b0)
B.a.G(j,b1)
j.push(new A.dG(c1,b3,u.j,c2,h,c3))
return new A.eQ(j)},
kt:function kt(a){this.a=a},
ku:function ku(a,b){this.a=a
this.b=b},
fD:function fD(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
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
hj:function hj(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
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
fG:function fG(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
hl:function hl(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fF:function fF(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
hk:function hk(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fQ:function fQ(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
hq:function hq(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
fR:function fR(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
hs:function hs(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hr:function hr(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dL:function dL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fU:function fU(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hv:function hv(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
mY(a,b){var s=t.c,r=A.bU(a,!0,s)
B.a.ao(r,new A.ij(t.a))
s=A.aN(r,s)
if(s.length===0)A.l(A.i("KeyframeTrack requires at least one keyframe",null))
return new A.fP(b,s)},
f8:function f8(a,b){this.a=a
this.b=b},
b5:function b5(a,b,c){this.a=a
this.b=b
this.$ti=c},
bT:function bT(){},
ij:function ij(a){this.a=a},
jv:function jv(a,b){this.a=a
this.b=b},
fP:function fP(a,b){this.a=a
this.b=b},
hB:function hB(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cN:function cN(a,b){this.a=a
this.b=0
this.c=b},
hC:function hC(a){this.a=a},
hD:function hD(a){this.a=a},
f1:function f1(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var _=this
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
lA(a,b,c,d,e,f,g,h,i,j,k,l,m){var s=new A.ba(i,l,B.A,A.b([],t.D),g,f,b,h,m,d,a,!0,!0,k,e)
s.ci(a,b,!0,d,e,f,g,h,i,!0,k,l,m)
return s},
ba:function ba(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
jd:function jd(a,b){this.a=a
this.b=b},
fA(a,b){return new A.dQ(a,b)},
ia:function ia(a,b){this.a=a
this.b=b},
eV:function eV(a,b){this.a=a
this.b=b},
eY:function eY(a,b){this.a=a
this.b=b},
eZ:function eZ(a,b){this.a=a
this.b=b},
eU:function eU(a,b,c){this.a=a
this.b=b
this.c=c},
eX:function eX(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
cv:function cv(a,b){this.a=a
this.b=b},
dk:function dk(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eW:function eW(a,b){this.a=a
this.b=b},
cI:function cI(a,b){this.a=a
this.b=b},
dQ:function dQ(a,b){this.a=a
this.b=b},
bq:function bq(a,b){this.a=a
this.b=b},
h:function h(a,b){this.a=a
this.b=b},
d9:function d9(a,b){this.a=a
this.b=b},
eO:function eO(a,b){this.a=a
this.b=b},
iQ(a,b,c,d){var s=0,r=A.lV(t.ac),q,p,o,n,m,l,k,j,i
var $async$iQ=A.lY(function(e,f){if(e===1)return A.lP(f,r)
for(;;)switch(s){case 0:j=B.bI.eR(a)
i=j==null?null:new A.fz(j.a,new A.eK(new A.eL(),new A.dN()),new A.eT(A.b([],t.c4),B.c0),A.b([],t.cR),B.af,A.b([],t.gz),null)
if(i==null){q=null
s=1
break}p=A.e(a.clientWidth)>0?A.e(a.clientWidth):A.e(a.width)
o=A.e(a.clientHeight)>0?A.e(a.clientHeight):A.e(a.height)
n=A.mU(o,p,A.aV(A.k(v.G.window).devicePixelRatio),2,!0)
a.width=n.c
a.height=n.d
m=A.qC(c)
s=3
return A.lO(A.ks(new A.iR(n),m,i,n),$async$iQ)
case 3:i.b9()
l=A.p_(i.w.a.b)
B.a.i(i.d,l)
m=t.N
k=new A.dF(a,i,l,new A.i4(),A.lA(B.y,null,!0,B.L,null,null,null,null,"root",!0,0,B.A,-1),B.bZ,B.eq,n,new A.hJ(),A.ax(m),new A.hC(A.aC(m,t.aQ)),A.b([],t.fA),A.b([],t.g7))
k.y=A.mD(5,B.f)
k.w=!0
k.ee()
q=k
s=1
break
case 1:return A.lQ(q,r)}})
return A.lR($async$iQ,r)},
ct:function ct(a,b){this.a=a
this.b=b},
dF:function dF(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
_.CW=!1
_.cx=0
_.dx=_.cy=!1
_.fx=_.fr=_.dy=0
_.fy=null
_.k1=_.id=_.go=0},
iR:function iR(a){this.a=a},
iG:function iG(a){this.a=a},
iH:function iH(a){this.a=a},
iI:function iI(a){this.a=a},
iJ:function iJ(){},
iK:function iK(a){this.a=a},
iL:function iL(a){this.a=a},
iM:function iM(a){this.a=a},
iN:function iN(a){this.a=a},
iO:function iO(a){this.a=a},
iP:function iP(a){this.a=a},
fs:function fs(a,b){this.a=a
this.b=b},
ib:function ib(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
ic:function ic(){},
id:function id(){},
ec:function ec(a,b){this.a=a
this.b=b},
bI:function bI(a,b){var _=this
_.a=0
_.b=a
_.f=_.c=null
_.$ti=b},
b8:function b8(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=0
_.$ti=d},
o9(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.cs(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
hF:function hF(a,b){this.a=a
this.b=b},
cl:function cl(a,b){this.a=a
this.b=b},
hQ:function hQ(a,b){this.a=a
this.b=b},
hU:function hU(a,b){this.a=a
this.b=b},
cs:function cs(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
an:function an(a,b){this.a=a
this.b=b},
jD:function jD(){this.a=null},
pb(a){var s=new A.fS(a,B.i,new A.jD(),A.pl(a))
s.dI(a)
return s},
pl(a){var s,r,q=t.du.a(a.getSupportedExtensions())
if(q==null)return A.ax(t.N)
s=A.ax(t.N)
r=J.ac(t.dy.b(q)?q:new A.d7(q,A.H(q).h("d7<1,w>")))
while(r.n())s.i(0,r.gt())
return s},
ap(a,b){var s,r
if(a.b!==B.i)A.l(A.m(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.e(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.e(s.drawingBufferWidth),A.e(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.e(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
n_(a,b){var s
if(a.b!==B.i)A.l(A.m(u.k))
switch(b){case 1:a.a.drawBuffers(A.b([A.e(v.G.WebGL2RenderingContext.COLOR_ATTACHMENT0)],t.n))
break
case 2:s=v.G
a.a.drawBuffers(A.b([A.e(s.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(s.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
break
default:throw A.c(A.i("WebGl2Device.setColorAttachmentCount: count must be 1 or 2, got "+b,null))}},
pg(a,b,c){var s,r,q,p
if(a.b!==B.i)A.l(A.m(u.k))
s=t.V.a(c.a)
r=a.a
q=v.G
r.activeTexture(A.e(q.WebGL2RenderingContext.TEXTURE0)+b)
p=s.f
if(p!=null){r.bindTexture(A.e(q.WebGL2RenderingContext.TEXTURE_2D),p)
return}throw A.c(A.m("WebGl2Device.bindGlowTexture: target has no glow attachment \u2014 create it with GpuTargetAttachment.colorAndGlow/colorDepthGlow, and resolve a multisampled source before sampling (single-sample only)"))},
pf(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.e(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.e(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
pe(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
mZ(a,b){var s
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
pc(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.e(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
aa(a,b){var s,r,q,p
if(a.b!==B.i)A.l(A.m(u.k))
s=a.f
r=s.eS(b)
if(r.a===0)return
if(r.A(0,B.ak)){q=v.G
p=a.a
if(b.a)p.enable(A.e(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.e(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.A(0,B.al))a.a.depthFunc(A.pf(a,b.b))
if(r.A(0,B.am))a.a.depthMask(b.c)
if(r.A(0,B.aq)){q=v.G
p=a.a
if(b.w)p.enable(A.e(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.e(q.WebGL2RenderingContext.CULL_FACE))}if(r.A(0,B.ar))a.a.cullFace(A.pe(a,b.x))
if(r.A(0,B.bd)){q=v.G.WebGL2RenderingContext
q=A.e(q.CCW)
a.a.frontFace(q)}if(r.A(0,B.an)){q=v.G
p=a.a
if(b.d)p.enable(A.e(q.WebGL2RenderingContext.BLEND))
else p.disable(A.e(q.WebGL2RenderingContext.BLEND))}if(r.A(0,B.ao))a.a.blendFunc(A.mZ(a,b.e),A.mZ(a,b.f))
if(r.A(0,B.ap))a.a.blendEquation(A.pc(a,b.r))
if(r.A(0,B.bb))a.a.colorMask(!0,!0,!0,!0)
if(r.A(0,B.bc)){q=v.G.WebGL2RenderingContext
a.a.disable(A.e(q.SCISSOR_TEST))}s.a=b},
pd(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.e(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.e(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.e(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
b0(a,b,c,d,e,f){var s
if(a.b!==B.i)A.l(A.m(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.pd(a,b))},
au(a,b){var s
if(a.b!==B.i)A.l(A.m(u.k))
s=A.k(b.a)
a.a.useProgram(s)
a.e=s},
f(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.i)A.l(A.m(u.k))
s=a.e
if(s==null)throw A.c(A.m("WebGl2Device.setUniform called with no bound program"))
r=a.a
q=A.u(r.getUniformLocation(s,b))
if(q==null)return
switch(c.a.a){case 0:r.uniform1f(q,A.ep(c.b))
break
case 1:p=t.B.a(c.b)
o=p.length
if(0>=o)return A.d(p,0)
n=p[0]
if(1>=o)return A.d(p,1)
r.uniform2f(q,n,p[1])
break
case 2:p=t.B.a(c.b)
o=p.length
if(0>=o)return A.d(p,0)
n=p[0]
if(1>=o)return A.d(p,1)
m=p[1]
if(2>=o)return A.d(p,2)
r.uniform3f(q,n,m,p[2])
break
case 3:p=t.B.a(c.b)
o=p.length
if(0>=o)return A.d(p,0)
n=p[0]
if(1>=o)return A.d(p,1)
m=p[1]
if(2>=o)return A.d(p,2)
l=p[2]
if(3>=o)return A.d(p,3)
A.ak(r,"uniform4f",[q,n,m,l,p[3]],t.H)
break
case 4:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 5:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 6:r.uniform1i(q,A.e(c.b))
break}},
ae(a,b){if(a.b!==B.i)A.l(A.m(u.k))
a.a.bindVertexArray(A.k(b.a))},
S(a,b,c){var s,r,q,p,o,n
if(a.b!==B.i)A.l(A.m(u.k))
s=c.a
r=a.a
q=v.G
r.activeTexture(A.e(q.WebGL2RenderingContext.TEXTURE0)+b)
if(s instanceof A.em){p=s.d>1?A.e(q.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.e(q.WebGL2RenderingContext.TEXTURE_2D)
r.bindTexture(p,s.a)
return}if(s instanceof A.el){o=s.b
if(o!=null){r.bindTexture(A.e(q.WebGL2RenderingContext.TEXTURE_2D),o)
return}n=s.e
if(n!=null){r.bindTexture(A.e(q.WebGL2RenderingContext.TEXTURE_2D),n)
return}throw A.c(A.m("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.c(A.m("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
ph(a,b,c){var s,r,q,p
if(a.b!==B.i)A.l(A.m(u.k))
s=A.k(b.a)
r=a.a
q=v.G
r.bindBuffer(A.e(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),s)
A:{p=q.WebGL2RenderingContext
r.bufferData(A.e(p.ELEMENT_ARRAY_BUFFER),c,A.e(q.WebGL2RenderingContext.STATIC_DRAW))
break A}},
pi(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.e(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
n2(a,b){var s,r,q,p
if(a.b!==B.i)A.l(A.m(u.k))
s=a.a
r=A.u(s.createBuffer())
if(r==null)throw A.c(A.m("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.aJ?A.e(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.e(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.pi(a,b.b))
return new A.bu(r)},
n0(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.e(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
n1(a,b){var s
switch(b.a){case 0:s=A.e(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.e(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
pj(a,b,c){var s=b>c?b:c,r=1
for(;s>1;s=(s+1)/2|0)++r
return r},
lC(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(a.b!==B.i)A.l(A.m(u.k))
s=a.a
r=A.u(s.createTexture())
if(r==null)throw A.c(A.m("WebGl2Device: gl.createTexture() returned null"))
q=b.c
p=q>1
o=v.G
n=p?A.e(o.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.e(o.WebGL2RenderingContext.TEXTURE_2D)
s.bindTexture(n,r)
m=b.d
l=m?A.pj(a,b.a,b.b):1
k=t.H
j=b.a
i=b.b
if(p)A.ak(s,"texStorage3D",[n,l,A.e(o.WebGL2RenderingContext.RGBA8),j,i,q],k)
else A.ak(s,"texStorage2D",[n,l,A.e(o.WebGL2RenderingContext.RGBA8),j,i],k)
s.texParameteri(n,A.e(o.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.n0(a,b.e))
s.texParameteri(n,A.e(o.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.n0(a,b.f))
p=b.r
s.texParameteri(n,A.e(o.WebGL2RenderingContext.TEXTURE_WRAP_S),A.n1(a,p))
s.texParameteri(n,A.e(o.WebGL2RenderingContext.TEXTURE_WRAP_T),A.n1(a,p))
h=a.aF("EXT_texture_filter_anisotropic")
g=h?a.cD(34047):1
f=b.w
if(!isFinite(f)||f<1||f>16)A.l(A.a2(f,"requested","anisotropy must be finite and in [1, 16]"))
if(h&&isFinite(g)&&g>=1)e=g>16?16:g
else e=1
f=f<e?f:e
if(f>1)s.texParameterf(n,34046,f)
return new A.bu(new A.em(r,j,i,q,m))},
lD(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.i)A.l(A.m(u.k))
s=t.R.a(b.a)
r=s.d
if(c>=r)throw A.c(A.i("WebGl2Device.uploadTextureLayer: layer "+c+" out of range for "+r+"-layer texture",null))
q=s.b
p=s.c
o=q*p*4
n=d.length
if(n!==o)throw A.c(A.i("WebGl2Device.uploadTextureLayer: expected "+o+" RGBA8 bytes for "+q+"x"+p+", got "+n,null))
r=r>1
n=v.G
m=r?A.e(n.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.e(n.WebGL2RenderingContext.TEXTURE_2D)
l=a.a
l.bindTexture(m,s.a)
k=t.H
if(r)A.ak(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.e(n.WebGL2RenderingContext.RGBA),A.e(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.ak(l,"texSubImage2D",[m,0,0,0,q,p,A.e(n.WebGL2RenderingContext.RGBA),A.e(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
n3(a,b){var s,r,q
if(a.b!==B.i)A.l(A.m(u.k))
s=t.R.a(b.a)
if(!s.e)return
r=v.G
q=s.d>1?A.e(r.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.e(r.WebGL2RenderingContext.TEXTURE_2D)
r=a.a
r.bindTexture(q,s.a)
r.generateMipmap(q)},
fT(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
n5(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.i)A.l(A.m(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.c(A.i("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.u(r.createFramebuffer())
if(q==null)throw A.c(A.m("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.e(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.a7
if(n&&!a1.e)throw A.c(A.i("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.aL||o===B.c7
l=d
k=d
j=d
i=d
if(n){r.drawBuffers(A.b([A.e(p.WebGL2RenderingContext.NONE)],t.n))
r.readBuffer(A.e(p.WebGL2RenderingContext.NONE))}else{o=a1.c
h=t.H
g=a1.b
if(o>1){k=A.u(r.createRenderbuffer())
r.bindRenderbuffer(A.e(p.WebGL2RenderingContext.RENDERBUFFER),k)
A.ak(r,c,[A.e(p.WebGL2RenderingContext.RENDERBUFFER),o,A.e(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.u(r.createRenderbuffer())
r.bindRenderbuffer(A.e(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.ak(r,c,[A.e(p.WebGL2RenderingContext.RENDERBUFFER),o,A.e(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.e(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.b([A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.u(r.createTexture())
r.bindTexture(A.e(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.ak(r,b,[A.e(p.WebGL2RenderingContext.TEXTURE_2D),1,A.e(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.e(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.e(p.WebGL2RenderingContext.LINEAR))
A.ak(r,a,[A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.u(r.createTexture())
r.bindTexture(A.e(p.WebGL2RenderingContext.TEXTURE_2D),j)
A.ak(r,b,[A.e(p.WebGL2RenderingContext.TEXTURE_2D),1,A.e(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.e(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.e(p.WebGL2RenderingContext.LINEAR))
A.ak(r,a,[A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.e(p.WebGL2RenderingContext.TEXTURE_2D),j,0],h)
r.drawBuffers(A.b([A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}}f=d
e=d
if(a1.e){o=a1.c
h=t.H
g=a1.b
if(o>1){f=A.u(r.createRenderbuffer())
r.bindRenderbuffer(A.e(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.ak(r,c,[A.e(p.WebGL2RenderingContext.RENDERBUFFER),o,A.e(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.e(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.u(r.createTexture())
r.bindTexture(A.e(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.ak(r,b,[A.e(p.WebGL2RenderingContext.TEXTURE_2D),1,A.e(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.e(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.e(p.WebGL2RenderingContext.TEXTURE_2D),A.e(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.e(p.WebGL2RenderingContext.NEAREST))
A.ak(r,a,[A.e(p.WebGL2RenderingContext.FRAMEBUFFER),A.e(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.e(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.e(r.checkFramebufferStatus(A.e(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.e(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.e(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.lE(a0,q,l,k,f,e,j,i)
throw A.c(A.m("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.bu(new A.el(q,l,k,f,e,j,i,s,a1.b,a1.c))},
lE(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
aS(a){var s
if(a.b!==B.i)A.l(A.m(u.k))
s=A.u(a.a.createVertexArray())
if(s==null)throw A.c(A.m("WebGl2Device: gl.createVertexArray() returned null"))
return new A.bu(s)},
n4(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.u(p.createShader(b))
if(o==null)throw A.c(A.fA(b===A.nC(A.no(A.nG(),r),q,t.S)?B.b6:B.b7,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.aJ(A.cY(p.getShaderParameter(o,A.e(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bv(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.c(A.fA(b===A.nC(A.no(A.nG(),r),q,t.S)?B.b6:B.b7,s))}return o},
pk(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.i)A.l(A.m(u.k))
q=v.G
s=A.n4(a,A.e(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.n4(a,A.e(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.u(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.c(B.eQ)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.aJ(A.cY(o.getProgramParameter(n,A.e(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bv(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.fA(B.b8,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.C)(c),++l){k=c[l]
if(A.e(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.fA(B.b9,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.u(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.fA(B.b9,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.bu(n)},
bu:function bu(a){this.a=a},
em:function em(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
el:function el(a,b,c,d,e,f,g,h,i,j){var _=this
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
hu:function hu(a){this.a=a
this.b=!1},
fS:function fS(a,b,c,d){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=c
_.r=d
_.w=!1},
jA:function jA(a){this.a=a},
jB:function jB(a){this.a=a},
k4:function k4(){},
ht:function ht(){},
jz:function jz(a){this.a=a},
jC:function jC(){},
kF(){return A.qR()},
qR(){var s=0,r=A.lV(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4,k5,k6,k7,k8,k9,l0
var $async$kF=A.lY(function(l1,l2){if(l1===1)return A.lP(l2,r)
for(;;)A:switch(s){case 0:k7={}
k8=v.G
k9=A.u(A.k(k8.document).querySelector("#showcase-canvas"))
l0=t.m
if(!l0.b(k9)){s=1
break}s=3
return A.lO(A.iQ(k9,!0,B.b4,!0),$async$kF)
case 3:p=l2
if(p==null){s=1
break}o=p.y
o=o instanceof A.bC?o:null
if(o!=null){o.b=8.5
o.d=0.45
o.a=B.K
o.as=!0
o.at=0.18}n=p.f.cZ(B.eT)
p.f=n
p.f=n.eQ(B.cE,1,B.aR,B.bV,B.cV,0.85,1.2)
p.r=A.mG()
m=A.u(A.k(k8.document).querySelector("#tone-map-select"))
if(l0.b(m))m.addEventListener("change",A.E(new A.kH(m,p)))
l=A.u(A.k(k8.document).querySelector("#post-preset-select"))
if(l0.b(l))l.addEventListener("change",A.E(new A.kI(l,p,m)))
k=A.u(A.k(k8.document).querySelector("#turntable-toggle"))
j=A.u(A.k(k8.document).querySelector("#turntable-group"))
if(l0.b(k)){k.checked=!0
k.addEventListener("change",A.E(new A.kJ(p,k)))}n=t.D
i=A.b([],n)
h=A.u(A.k(k8.document).querySelector("#camera-mode-select"))
if(l0.b(h))h.addEventListener("change",A.E(new A.kU(h,p,j,i,k)))
g=A.u(A.k(k8.document).querySelector("#shake-button"))
if(l0.b(g))g.addEventListener("click",A.E(new A.kZ(p)))
f=A.k(A.k(k8.document).querySelectorAll(".tab-btn"))
e=new A.l5(f,A.k(A.k(k8.document).querySelectorAll(".topic-panel")))
for(d=0;d<A.e(f.length);++d){c=A.u(f.item(d))
if(l0.b(c)){b=A.bv(c.getAttribute("data-topic"))
c.addEventListener("click",A.E(new A.l_(e,b==null?"":b)))}}k7.a=14
k7.b=!0
k7.c=1
k7.d=!1
a=A.u(A.k(k8.document).querySelector("#solar-time-slider"))
a0=A.u(A.k(k8.document).querySelector("#solar-time-label"))
a1=A.u(A.k(k8.document).querySelector("#solar-phase-badge"))
a2=A.u(A.k(k8.document).querySelector("#solar-play-pause-btn"))
a3=A.u(A.k(k8.document).querySelector("#solar-speed-select"))
a4=new A.l6(k7,a0,a1)
a5=new A.kG(k7,p,a4)
if(l0.b(a)){a.addEventListener("input",A.E(new A.l0(k7,a,a5)))
a.addEventListener("mousedown",A.E(new A.l1(k7)))
a.addEventListener("mouseup",A.E(new A.l2(k7)))
a.addEventListener("touchstart",A.E(new A.l3(k7)))
a.addEventListener("touchend",A.E(new A.l4(k7)))}if(l0.b(a2))a2.addEventListener("click",A.E(new A.kK(k7,a2)))
if(l0.b(a3))a3.addEventListener("change",A.E(new A.kL(k7,a3)))
a5.$0()
a6=A.u(A.k(k8.document).querySelector("#dof-slider"))
a7=A.u(A.k(k8.document).querySelector("#dof-label"))
if(l0.b(a6))a6.addEventListener("input",A.E(new A.kM(a6,a7,p)))
a8=A.u(A.k(k8.document).querySelector("#bloom-slider"))
a9=A.u(A.k(k8.document).querySelector("#bloom-label"))
if(l0.b(a8))a8.addEventListener("input",A.E(new A.kN(a8,a9,p)))
b0=A.u(A.k(k8.document).querySelector("#ssao-slider"))
b1=A.u(A.k(k8.document).querySelector("#ssao-label"))
if(l0.b(b0))b0.addEventListener("input",A.E(new A.kO(b0,b1,p)))
b2=A.oJ(30,4,4,30)
b3=p.b
b4=b3.gu().V(b2,"ground")
b5=A.oK(1,40,40)
b6=b3.gu().V(b5,"center_sphere")
b7=A.oL(20,1.8,0.08,48)
b8=b3.gu().V(b7,"orbit_torus")
b9=A.ov(0.6,0.3,12,24)
c0=A.ox(0.9,24,0.35)
c1=A.ow(0.9,24,0.4)
c2=A.lx(0.65)
c3=A.mI(0.35,2)
c4=A.oH(0.38)
c5=A.oy(0.35)
c6=A.mJ(0.08,2,0.55,0.55,0.55)
c7=[b9,c0,c1,c2,c3,c4,c5,c6]
c8=[b3.gu().V(b9,"satellite_capsule"),b3.gu().V(c0,"satellite_cylinder"),b3.gu().V(c1,"satellite_cone"),b3.gu().V(c2,"satellite_cube"),b3.gu().V(c3,"satellite_icosphere"),b3.gu().V(c4,"satellite_octahedron"),b3.gu().V(c5,"satellite_dodecahedron"),b3.gu().V(c6,"satellite_rounded_box")]
c9=p.ak(A.oQ(B.cv,32,256,B.cB,2,256),"ground_grid_albedo",256,256)
d0=new Uint8Array(65536)
for(d1=0;d1<256;++d1)for(d2=d1*256,d3=B.e.F(d1,32)>=2,d4=0;d4<256;++d4){d5=!d3||B.e.F(d4,32)<2
d6=d2+d4
d7=d5?220:50
if(!(d6<65536)){q=A.d(d0,d6)
s=1
break A}d0[d6]=d7}d8=p.ak(A.oT(d0,256,3,256),"ground_grid_normal",256,256)
d9=p.ak(A.oN(0.22,256,0.95,256),"brushed_metal_orm",256,256)
e0=p.ak(A.oO(0.22,8,256,0.4,256),"carbon_fiber_orm",256,256)
e1=p.ak(A.oR(B.cF,256,20,B.cP,2,256),"hex_shield_albedo",256,256)
e2=p.ak(A.oU(B.cK,6,B.cx,256,256),"voronoi_cell_albedo",256,256)
e3=p.ak(A.oS(B.cG,256,3.5,4.5,B.cH,256),"marble_albedo",256,256)
e4=p.ak(A.oP(0.18,4,256,18,0.95,256),"damascus_steel_orm",256,256)
d2=A.a6(c9,0.2,0,"ground_pbr",0.1,1.5,d8,null,0.5,1,1,1,8,8)
e5=b3.gu().H(d2)
d2=A.mB("hero_gold",0.12)
d2=b3.gu().H(d2)
d3=A.a6(null,0.2,0,"hero_chrome",0.98,1,null,null,0.05,0.98,0.95,0.95,1,1)
d3=b3.gu().H(d3)
d6=A.a6(null,0.2,0,"hero_copper",1,1,null,null,0.15,0.54,0.64,0.95,1,1)
d6=b3.gu().H(d6)
d7=A.a6(null,0.2,0,"hero_silver",1,1,null,null,0.08,0.91,0.96,0.97,1,1)
d7=b3.gu().H(d7)
e6=A.mA(0.9,B.cC,"hero_ceramic",0.18)
e6=b3.gu().H(e6)
e7=A.lu(B.cL,"hero_plastic",0.22)
e7=b3.gu().H(e7)
e8=A.a6(null,0.2,0,"hero_iron",0.85,1,null,null,0.28,0.58,0.57,0.56,1,1)
e8=b3.gu().H(e8)
e9=A.a6(null,0.2,0,"hero_brushed",0.95,1,null,d9,0.22,1,0.95,0.95,1,1)
e9=b3.gu().H(e9)
f0=A.a6(null,0.2,0,"hero_carbon",0.35,1,null,e0,0.25,0.18,0.15,0.15,1,1)
f0=b3.gu().H(f0)
f1=A.a6(null,0.2,0.6,"hero_damascus",0.95,1,null,e4,0.18,0.94,0.9,0.88,1,1)
f1=b3.gu().H(f1)
f2=A.a6(e3,0.08,0.85,"hero_marble",0.05,1,null,null,0.15,1,1,1,1,1)
f2=b3.gu().H(f2)
f3=A.a6(e1,0.2,0.8,"hero_hex",0.7,1,null,null,0.15,1,1,1,1,1)
f3=b3.gu().H(f3)
f4=A.a6(e2,0.2,0.85,"hero_voronoi",0.1,1,null,null,0.3,1,1,1,1,1)
f5=A.mw(["gold",d2,"chrome",d3,"copper",d6,"silver",d7,"ceramic",e6,"plastic",e7,"iron",e8,"brushed",e9,"carbon",f0,"damascus",f1,"marble",f2,"hex",f3,"voronoi",b3.gu().H(f4)],t.N,t.eL)
f4=A.a6(null,0.2,0,"torus_chrome",0.98,1,null,null,0.06,0.98,0.95,0.95,1,1)
f6=b3.gu().H(f4)
f4=A.lu(B.cU,"sat_emerald",0.22)
f4=b3.gu().H(f4)
f3=A.mA(0.8,B.cS,"sat_ruby",0.18)
f3=b3.gu().H(f3)
f2=A.lu(B.cN,"sat_sapphire",0.2)
f2=b3.gu().H(f2)
f1=A.a6(null,0.2,0,"sat_copper",1,1,null,null,0.2,0.54,0.64,0.95,1,1)
f1=b3.gu().H(f1)
f0=A.mB("sat_gold",0.14)
f0=b3.gu().H(f0)
e9=A.a6(null,0.2,0,"sat_chrome",0.98,1,null,null,0.05,0.98,0.95,0.95,1,1)
e9=b3.gu().H(e9)
e8=A.a6(e3,0.2,0.8,"sat_marble",0.05,1,null,null,0.16,1,1,1,1,1)
e8=b3.gu().H(e8)
e7=A.a6(null,0.2,0,"sat_damascus",0.95,1,null,e4,0.2,0.96,0.92,0.9,1,1)
f7=[f4,f3,f2,f1,f0,e9,e8,b3.gu().H(e7)]
e7=p.e
e7.aH(0,e5,b4,b2,"ground_node",new A.O(B.q,B.o,1))
e8=f5.C(0,"gold")
e8.toString
f8=e7.aH(0,e8,b6,b5,"center_sphere_node",new A.O(B.K,B.o,1))
f9=A.u(A.k(k8.document).querySelector("#material-select"))
if(l0.b(f9))f9.addEventListener("change",A.E(new A.kP(f5,f9,f8)))
g0=e7.aH(0,f6,b8,b7,"torus_ring_node",new A.O(B.K,B.o,1))
g1=A.lA(B.y,null,!0,B.L,null,null,null,null,"orbit_ring",!0,0,B.A,-1)
f8.bO(g1)
B.a.a3(i)
for(d=0;d<8;++d){g2=d*0.7853981633974483
d2=c8[d]
d3=c7[d]
B.a.i(i,g1.aH(0,f7[d],d2,d3,"satellite_"+d,new A.O(new A.a(Math.cos(g2)*3.4,0,Math.sin(g2)*3.4),B.o,1)))}g3=A.lx(0.35)
g4=b3.gu().V(g3,"asteroid_mesh")
g5=b3.gu().H(B.dO)
d2=t.ek
g6=A.b([],d2)
g7=new A.c7()
g7.b7(1337)
for(d=0;d<48;++d){g2=d/48*3.141592653589793*2+g7.M()*0.1
g8=5.2+g7.M()*1.8
d3=g7.M()
d6=g7.M()
g9=A.ai(new A.a(g7.M()*2-1,g7.M()*2-1,g7.M()*2-1).gm(),g7.M()*3.141592653589793*2)
B.a.i(g6,new A.O(new A.a(Math.cos(g2)*g8,(d3-0.5)*0.8+0.5,Math.sin(g2)*g8),g9,0.5+d6*0.9))}d2=A.b([],d2)
d3=A.b([],t.d9)
d6=$.mp
$.mp=d6+1
h0=new A.f1(d2,d3,"asteroid_belt",B.A,B.A,A.b([],n),g4,g5,null,g3,-1,B.L,B.y,!0,!0,0,d6)
h0.ci(B.y,null,!0,B.L,d6,g5,g4,g3,"asteroid_belt",!0,0,B.A,-1)
B.a.G(d2,g6)
e7.bO(h0)
h1=A.lm(!0,B.de)
h2=A.b([],t.G)
for(d=0;d<=120;++d)B.a.i(h2,h1.au(d/120))
h3=A.oM(!0,10,0.12,h2)
h4=b3.gu().V(h3,"conduit_rail")
e7.bg(0,b3.gu().H(B.dT),h4,h3,"conduit_rail_node")
n=A.aN(A.b([A.i8(0.6,B.fx,2.2,0.45,18),A.i8(0.35,B.fw,1.8,0.35,10),A.i8(0.18,B.fu,1.4,0.25,5.5),A.i8(0.08,B.fv,1.1,0.2,2.2)],t.aA),t.ef)
h5=A.mI(0.45,2)
h6=b3.gu().V(h5,"ocean_buoy")
h7=e7.aH(0,b3.gu().H(B.dU),h6,h5,"buoy_beacon_node",new A.O(B.hi,B.o,1))
d2=new A.jo(42)
d2.dH(42)
h8=new A.jn(32,32,36,36,3.2,-0.6,13.5,d2)
h9=h8.dq()
i0=b3.gu().V(h9,"island_terrain")
d2=A.a6(p.ak(h8.dn(256,256),"terrain_biome_albedo",256,256),0.2,0,"terrain_biome_pbr",0.05,1,null,null,0.85,1,1,1,1,1)
i1=e7.bg(0,b3.gu().H(d2),i0,h9,"terrain_node")
i2=new A.jy(38,38,32,32,0)
i2.dN()
d2=i2.f
d2===$&&A.G()
i3=b3.gu().V(d2,"water_surface")
i4=e7.bg(0,b3.gu().H(B.dK),i3,d2,"water_node")
i5=A.mJ(0.08,3,3.2,0.45,1.8)
i6=b3.gu().V(i5,"vessel_hull")
i7=e7.bg(0,b3.gu().H(B.dV),i6,i5,"buoyant_vessel_node")
i8=A.u(A.k(k8.document).querySelector("#terrain-toggle"))
if(l0.b(i8))i8.addEventListener("change",A.E(new A.kQ(i8,i1,i4,i7)))
i9=A.lx(0.08)
j0=b3.gu().V(i9,"particle_mesh")
j1=b3.gu().H(B.dW)
j2=b3.gu().H(B.dQ)
j3=b3.gu().H(B.dM)
j4=A.ll(B.fV,B.br,B.B,!1,0.55,B.fZ,B.h0,5.5,j1,j0,B.f,48,0.055,!1,101,B.hs)
j5=A.ll(B.h4,B.aB,B.y,!1,0.8,B.fM,B.hd,8,j2,j0,B.f,64,0.035,!0,202,B.hw)
j6=A.ll(B.fW,B.aB,B.y,!1,0.85,B.fU,B.he,7,j3,j0,B.f,80,0.04,!0,303,B.h3)
B.a.i(p.ax,j4)
j7=A.u(A.k(k8.document).querySelector("#particles-select"))
if(l0.b(j7))j7.addEventListener("change",A.E(new A.kR(p,j7,j4,j5,j6)))
j8=b3.gu().H(B.dJ)
j9=b3.gu().H(B.dN)
k0=b3.gu().H(B.dS)
k1=b3.gu().H(B.dP)
k2=b3.gu().H(B.dL)
k3=b3.gu().H(B.dR)
k4=A.u(A.k(k8.document).querySelector("#vfx-particles-select"))
if(l0.b(k4))k4.addEventListener("change",A.E(new A.kS(new A.l7(p,j0,j8,k0,j9,k3,k1,k2,j3),k4)))
p.bU(B.aQ,35,0.08,6)
k5=A.u(A.k(k8.document).querySelector("#fog-select"))
if(l0.b(k5))k5.addEventListener("change",A.E(new A.kT(k5,p)))
k6=A.u(A.k(k8.document).querySelector("#asteroid-toggle"))
if(l0.b(k6))k6.addEventListener("change",A.E(new A.kV(h0,k6)))
k7.e=null
k7.f=0
k9.addEventListener("click",A.E(new A.kW(k7,p,A.u(A.k(k8.document).querySelector("#picking-status")))))
l0=A.aN(A.b([A.mY(B.aS,f8),A.mY(B.aS,g0)],t.e9),t.a3)
p.at.a.K(0,"hero_bob",new A.cN(new A.hB("hero_bob",4,B.dx,l0),1))
p.sfg(new A.kX(k7,f8,g0,g1,h0,new A.i9(n,0),h7,i2,i7,new A.hH(B.hu,2,3.5),i,h,a6,p,a,a4))
A.k(k8.window).addEventListener("keydown",A.E(new A.kY(k7,a2,e,a,a5,h)))
p.dz()
case 1:return A.lQ(q,r)}})
return A.lR($async$kF,r)},
kH:function kH(a,b){this.a=a
this.b=b},
kI:function kI(a,b,c){this.a=a
this.b=b
this.c=c},
kJ:function kJ(a,b){this.a=a
this.b=b},
kU:function kU(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
kZ:function kZ(a){this.a=a},
l5:function l5(a,b){this.a=a
this.b=b},
l_:function l_(a,b){this.a=a
this.b=b},
l6:function l6(a,b,c){this.a=a
this.b=b
this.c=c},
kG:function kG(a,b,c){this.a=a
this.b=b
this.c=c},
l0:function l0(a,b,c){this.a=a
this.b=b
this.c=c},
l1:function l1(a){this.a=a},
l2:function l2(a){this.a=a},
l3:function l3(a){this.a=a},
l4:function l4(a){this.a=a},
kK:function kK(a,b){this.a=a
this.b=b},
kL:function kL(a,b){this.a=a
this.b=b},
kM:function kM(a,b,c){this.a=a
this.b=b
this.c=c},
kN:function kN(a,b,c){this.a=a
this.b=b
this.c=c},
kO:function kO(a,b,c){this.a=a
this.b=b
this.c=c},
kP:function kP(a,b,c){this.a=a
this.b=b
this.c=c},
kQ:function kQ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kR:function kR(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
l7:function l7(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
kS:function kS(a,b){this.a=a
this.b=b},
kT:function kT(a,b){this.a=a
this.b=b},
kV:function kV(a,b){this.a=a
this.b=b},
kW:function kW(a,b,c){this.a=a
this.b=b
this.c=c},
kX:function kX(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
kY:function kY(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
nH(a){return v.mangledGlobalNames[a]},
r_(a){throw A.Z(A.mu(a),new Error())},
G(){throw A.Z(A.om(""),new Error())},
d1(){throw A.Z(A.ol(""),new Error())},
m5(){throw A.Z(A.mu(""),new Error())},
p3(a){var s=Math.cos(a)
if(s>=0)return 1/(s+0.025*Math.exp(-11*s))
else return 38+(B.b.l(a*57.29577951308232,90,105)-90)/15*62},
ld(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.c(A.a2(b.gf6(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].gq().c.ad()
o=q*16
n=o+16
B.ad.cc(s,o,n,p.a)
if(l)B.ad.cc(r,o,n,p.c2().a)}m=a.a
A.f(m,"uInstanceModels",new A.h(B.bh,s))
if(l)A.f(m,"uInstanceNormalMatrices",new A.h(B.bh,r))
A.f(m,"uUseInstances",B.bi)}},B={}
var w=[A,J,B]
var $={}
A.lp.prototype={}
J.f2.prototype={
a8(a,b){return a===b},
gU(a){return A.ft(a)},
j(a){return"Instance of '"+A.fu(a)+"'"},
gT(a){return A.bc(A.lS(this))}}
J.f5.prototype={
j(a){return String(a)},
gU(a){return a?519018:218159},
gT(a){return A.bc(t.y)},
$iJ:1,
$iy:1}
J.dm.prototype={
a8(a,b){return null==b},
j(a){return"null"},
gU(a){return 0},
$iJ:1}
J.dp.prototype={$iN:1}
J.bB.prototype={
gU(a){return 0},
gT(a){return B.fh},
j(a){return String(a)}}
J.fp.prototype={}
J.c0.prototype={}
J.bA.prototype={
j(a){var s=a[$.nK()]
if(s==null)s=a[$.m6()]
if(s==null)return this.dE(a)
return"JavaScript function for "+J.ci(s)},
$ibR:1}
J.dn.prototype={
gU(a){return 0},
j(a){return String(a)}}
J.dq.prototype={
gU(a){return 0},
j(a){return String(a)}}
J.q.prototype={
i(a,b){A.H(a).c.a(b)
a.$flags&1&&A.be(a,29)
a.push(b)},
ac(a,b){var s
a.$flags&1&&A.be(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aJ(a[s],b)){a.splice(s,1)
return!0}return!1},
G(a,b){var s
A.H(a).h("n<1>").a(b)
a.$flags&1&&A.be(a,"addAll",2)
if(Array.isArray(b)){this.dL(a,b)
return}for(s=J.ac(b);s.n();)a.push(s.gt())},
dL(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.c(A.aL(a))
for(r=0;r<s;++r)a.push(b[r])},
a3(a){a.$flags&1&&A.be(a,"clear","clear")
a.length=0},
a5(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
dA(a,b){var s
if(b<0||b>a.length)throw A.c(A.aQ(b,0,a.length,"start",null))
s=a.length
if(b===s)return A.b([],A.H(a))
return A.b(a.slice(b,s),A.H(a))},
gaZ(a){if(a.length>0)return a[0]
throw A.c(A.f3())},
gbq(a){var s=a.length
if(s>0)return a[s-1]
throw A.c(A.f3())},
gaT(a){var s=a.length
if(s===1){if(0>=s)return A.d(a,0)
return a[0]}if(s===0)throw A.c(A.f3())
throw A.c(A.mq())},
bk(a,b){var s,r
A.H(a).h("y(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.c(A.aL(a))}return!0},
ao(a,b){var s,r,q,p,o,n=A.H(a)
n.h("j(1,1)?").a(b)
a.$flags&2&&A.be(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.q1()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.bw()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.cX(b,2))
if(p>0)this.ej(a,p)},
dw(a){return this.ao(a,null)},
ej(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
f4(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.d(a,s)
if(J.aJ(a[s],b))return s}return-1},
A(a,b){var s
for(s=0;s<a.length;++s)if(J.aJ(a[s],b))return!0
return!1},
j(a){return A.ln(a,"[","]")},
gJ(a){return new J.d2(a,a.length,A.H(a).h("d2<1>"))},
gU(a){return A.ft(a)},
gB(a){return a.length},
C(a,b){if(!(b>=0&&b<a.length))throw A.c(A.kx(a,b))
return a[b]},
K(a,b,c){A.H(a).c.a(c)
a.$flags&2&&A.be(a)
if(!(b>=0&&b<a.length))throw A.c(A.kx(a,b))
a[b]=c},
bX(a,b){var s
A.H(a).h("y(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gT(a){return A.bc(A.H(a))},
$in:1,
$iA:1}
J.f4.prototype={
fI(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.fu(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.ii.prototype={}
J.d2.prototype={
gt(){var s=this.d
return s==null?this.$ti.c.a(s):s},
n(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.C(q)
throw A.c(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iY:1}
J.cx.prototype={
S(a,b){var s
A.aV(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gb0(b)
if(this.gb0(a)===s)return 0
if(this.gb0(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gb0(a){return a===0?1/a<0:a<0},
c6(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.c(A.c1(""+a+".toInt()"))},
ab(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.c(A.c1(""+a+".floor()"))},
I(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.c(A.c1(""+a+".round()"))},
l(a,b,c){if(this.S(b,c)>0)throw A.c(A.nz(b))
if(this.S(a,b)<0)return b
if(this.S(a,c)>0)return c
return a},
a6(a,b){var s
if(b>20)throw A.c(A.aQ(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gb0(a))return"-"+s
return s},
fH(a,b){var s
if(b>20)throw A.c(A.aQ(b,0,20,"fractionDigits",null))
s=a.toExponential(b)
if(a===0&&this.gb0(a))return"-"+s
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
v(a,b){return a+b},
aD(a,b){return a/b},
F(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
if(b<0)return s-b
else return s+b},
cg(a,b){if((a|0)===a)if(b>=1)return a/b|0
return this.cN(a,b)},
a_(a,b){return(a|0)===a?a/b|0:this.cN(a,b)},
cN(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.c(A.c1("Result of truncating division is "+A.o(s)+": "+A.o(a)+" ~/ "+b))},
eo(a,b){var s
if(a>0)s=this.en(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
en(a,b){return b>31?0:a>>>b},
aR(a,b){return a<=b},
gT(a){return A.bc(t.r)},
$iar:1,
$ir:1,
$iaq:1}
J.dl.prototype={
gT(a){return A.bc(t.S)},
$iJ:1,
$ij:1}
J.f6.prototype={
gT(a){return A.bc(t.i)},
$iJ:1}
J.bz.prototype={
av(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
dD(a,b,c){return a.substring(b,A.oV(b,c,a.length))},
dC(a,b){return this.dD(a,b,null)},
dk(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.d(p,0)
if(p.charCodeAt(0)===133){s=J.oj(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.d(p,r)
q=p.charCodeAt(r)===133?J.ok(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
k(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.c(B.bE)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
dc(a,b,c){var s=b-a.length
if(s<=0)return a
return this.k(c,s)+a},
S(a,b){var s
A.K(b)
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
gT(a){return A.bc(t.N)},
gB(a){return a.length},
$iJ:1,
$iar:1,
$imF:1,
$iw:1}
A.cO.prototype={
gJ(a){return new A.d6(J.ac(this.gbe()),A.x(this).h("d6<1,2>"))},
gB(a){return J.bN(this.gbe())},
a5(a,b){return A.x(this).y[1].a(J.lj(this.gbe(),b))},
j(a){return J.ci(this.gbe())}}
A.d6.prototype={
n(){return this.a.n()},
gt(){return this.$ti.y[1].a(this.a.gt())},
$iY:1}
A.e_.prototype={
C(a,b){return this.$ti.y[1].a(J.li(this.a,b))},
$iA:1}
A.d7.prototype={
gbe(){return this.a}}
A.cy.prototype={
j(a){return"LateInitializationError: "+this.a}}
A.jh.prototype={}
A.aM.prototype={}
A.T.prototype={
gJ(a){var s=this
return new A.at(s,s.gB(s),A.x(s).h("at<T.E>"))},
aO(a){var s,r=this,q=A.lr(A.x(r).h("T.E"))
for(s=0;s<r.gB(r);++s)q.i(0,r.a5(0,s))
return q}}
A.dT.prototype={
ge8(){var s=J.bN(this.a),r=this.c
if(r==null||r>s)return s
return r},
geq(){var s=J.bN(this.a),r=this.b
if(r>s)return s
return r},
gB(a){var s,r=J.bN(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
a5(a,b){var s=this,r=s.geq()+b
if(b<0||r>=s.ge8())throw A.c(A.ig(b,s.gB(0),s,"index"))
return J.lj(s.a,r)},
dj(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.kz(n),l=m.gB(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.ms(0,n):J.mr(0,n)}r=A.du(s,m.a5(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.a.K(r,q,m.a5(n,o+q))
if(m.gB(n)<l)throw A.c(A.aL(p))}return r},
fG(a){return this.dj(0,!0)}}
A.at.prototype={
gt(){var s=this.d
return s==null?this.$ti.c.a(s):s},
n(){var s,r=this,q=r.a,p=J.kz(q),o=p.gB(q)
if(r.b!==o)throw A.c(A.aL(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.a5(q,s);++r.c
return!0},
$iY:1}
A.dv.prototype={
gJ(a){var s=this.a
return new A.dw(s.gJ(s),this.b,A.x(this).h("dw<1,2>"))},
gB(a){var s=this.a
return s.gB(s)},
a5(a,b){var s=this.a
return this.b.$1(s.a5(s,b))}}
A.dw.prototype={
n(){var s=this,r=s.b
if(r.n()){s.a=s.c.$1(r.gt())
return!0}s.a=null
return!1},
gt(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iY:1}
A.M.prototype={
gB(a){return J.bN(this.a)},
a5(a,b){return this.b.$1(J.lj(this.a,b))}}
A.ab.prototype={
gJ(a){return new A.Q(J.ac(this.a),this.b,this.$ti.h("Q<1>"))}}
A.Q.prototype={
n(){var s,r
for(s=this.a,r=this.b;s.n();)if(r.$1(s.gt()))return!0
return!1},
gt(){return this.a.gt()},
$iY:1}
A.as.prototype={}
A.dO.prototype={
gB(a){return J.bN(this.a)},
a5(a,b){var s=this.a,r=J.kz(s)
return r.a5(s,r.gB(s)-1-b)}}
A.eo.prototype={}
A.F.prototype={$r:"+(1,2)",$s:1}
A.e9.prototype={$r:"+influence,light(1,2)",$s:2}
A.ea.prototype={$r:"+influence,source(1,2)",$s:3}
A.cS.prototype={$r:"+rotation,translation(1,2)",$s:4}
A.c8.prototype={$r:"+(1,2,3)",$s:5}
A.dd.prototype={}
A.dc.prototype={
j(a){return A.im(this)},
gaY(){return new A.bJ(this.eV(),A.x(this).h("bJ<am<1,2>>"))},
eV(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gaY(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gar(),o=o.gJ(o),n=A.x(s),m=n.y[1],n=n.h("am<1,2>")
case 2:if(!o.n()){r=3
break}l=o.gt()
k=s.C(0,l)
r=4
return a.b=new A.am(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iaD:1}
A.X.prototype={
gB(a){return this.b.length},
gcC(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
aX(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
C(a,b){if(!this.aX(b))return null
return this.b[this.a[b]]},
b_(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gcC()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gar(){return new A.c3(this.gcC(),this.$ti.h("c3<1>"))},
gdl(){return new A.c3(this.b,this.$ti.h("c3<2>"))}}
A.c3.prototype={
gB(a){return this.a.length},
gJ(a){var s=this.a
return new A.c4(s,s.length,this.$ti.h("c4<1>"))}}
A.c4.prototype={
gt(){var s=this.d
return s==null?this.$ti.c.a(s):s},
n(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iY:1}
A.de.prototype={
i(a,b){A.x(this).c.a(b)
A.o4()}}
A.b3.prototype={
gB(a){return this.b},
gd8(a){return this.b!==0},
gJ(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.c4(s,s.length,r.$ti.h("c4<1>"))},
A(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
aO(a){return A.ls(this,this.$ti.c)}}
A.dP.prototype={}
A.jt.prototype={
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
A.dD.prototype={
j(a){return"Null check operator used on a null value"}}
A.f7.prototype={
j(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.fN.prototype={
j(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.iy.prototype={
j(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.dh.prototype={}
A.ed.prototype={
j(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibF:1}
A.bw.prototype={
j(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.nI(r==null?"unknown":r)+"'"},
gT(a){var s=A.m_(this)
return A.bc(s==null?A.cf(this):s)},
$ibR:1,
gfM(){return this},
$C:"$1",
$R:1,
$D:null}
A.eH.prototype={$C:"$0",$R:0}
A.eI.prototype={$C:"$2",$R:2}
A.fK.prototype={}
A.fH.prototype={
j(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.nI(s)+"'"}}
A.cm.prototype={
a8(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cm))return!1
return this.$_target===b.$_target&&this.a===b.a},
gU(a){return(A.hx(this.a)^A.ft(this.$_target))>>>0},
j(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.fu(this.a)+"'")}}
A.fy.prototype={
j(a){return"RuntimeError: "+this.a}}
A.bh.prototype={
gB(a){return this.a},
gar(){return new A.bj(this,A.x(this).h("bj<1>"))},
aX(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.f7(a)},
f7(a){var s=this.d
if(s==null)return!1
return this.bo(this.cA(s,a),a)>=0},
C(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.f8(b)},
f8(a){var s,r,q=this.d
if(q==null)return null
s=this.cA(q,a)
r=this.bo(s,a)
if(r<0)return null
return s[r].b},
K(a,b,c){var s,r,q=this,p=A.x(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.cm(s==null?q.b=q.bK():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.cm(r==null?q.c=q.bK():r,b,c)}else q.fa(b,c)},
fa(a,b){var s,r,q,p,o=this,n=A.x(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bK()
r=o.bY(a)
q=s[r]
if(q==null)s[r]=[o.bL(a,b)]
else{p=o.bo(q,a)
if(p>=0)q[p].b=b
else q.push(o.bL(a,b))}},
c3(a,b){var s,r,q=this,p=A.x(q)
p.c.a(a)
p.h("2()").a(b)
if(q.aX(a)){s=q.C(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.K(0,a,r)
return r},
ac(a,b){var s=this
if(typeof b=="string")return s.cj(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.cj(s.c,b)
else return s.f9(b)},
f9(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.bY(a)
r=n[s]
q=o.bo(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.ck(p)
if(r.length===0)delete n[s]
return p.b},
a3(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bJ()}},
b_(a,b){var s,r,q=this
A.x(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.c(A.aL(q))
s=s.c}},
cm(a,b,c){var s,r=A.x(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bL(b,c)
else s.b=c},
cj(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.ck(s)
delete a[b]
return s.b},
bJ(){this.r=this.r+1&1073741823},
bL(a,b){var s=this,r=A.x(s),q=new A.ik(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bJ()
return q},
ck(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bJ()},
bY(a){return J.V(a)&1073741823},
cA(a,b){return a[this.bY(b)]},
bo(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aJ(a[r].a,b))return r
return-1},
j(a){return A.im(this)},
bK(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$imv:1}
A.ik.prototype={}
A.bj.prototype={
gB(a){return this.a.a},
gJ(a){var s=this.a
return new A.ds(s,s.r,s.e,this.$ti.h("ds<1>"))}}
A.ds.prototype={
gt(){return this.d},
n(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.aL(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iY:1}
A.aZ.prototype={
gB(a){return this.a.a},
gJ(a){var s=this.a
return new A.bk(s,s.r,s.e,this.$ti.h("bk<1>"))}}
A.bk.prototype={
gt(){return this.d},
n(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.aL(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iY:1}
A.bi.prototype={
gB(a){return this.a.a},
gJ(a){var s=this.a
return new A.dr(s,s.r,s.e,this.$ti.h("dr<1,2>"))}}
A.dr.prototype={
gt(){var s=this.d
s.toString
return s},
n(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.aL(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.am(s.a,s.b,r.$ti.h("am<1,2>"))
r.c=s.c
return!0}},
$iY:1}
A.kB.prototype={
$1(a){return this.a(a)},
$S:25}
A.kC.prototype={
$2(a,b){return this.a(a,b)},
$S:67}
A.kD.prototype={
$1(a){return this.a(A.K(a))},
$S:37}
A.aT.prototype={
gT(a){return A.bc(this.cB())},
cB(){return A.qD(this.$r,this.bI())},
j(a){return this.cR(!1)},
cR(a){var s,r,q,p,o,n=this.ea(),m=this.bI(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.d(m,q)
o=m[q]
l=a?l+A.mK(o):l+A.o(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
ea(){var s,r=this.$s
while($.jX.length<=r)B.a.i($.jX,null)
s=$.jX[r]
if(s==null){s=this.e_()
B.a.K($.jX,r,s)}return s},
e_(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.ih(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.K(j,q,r[s])}}return A.aN(j,k)}}
A.bs.prototype={
bI(){return[this.a,this.b]},
a8(a,b){if(b==null)return!1
return b instanceof A.bs&&this.$s===b.$s&&J.aJ(this.a,b.a)&&J.aJ(this.b,b.b)},
gU(a){return A.bW(this.$s,this.a,this.b,B.m,B.m,B.m)}}
A.cR.prototype={
bI(){return[this.a,this.b,this.c]},
a8(a,b){var s=this
if(b==null)return!1
return b instanceof A.cR&&s.$s===b.$s&&J.aJ(s.a,b.a)&&J.aJ(s.b,b.b)&&J.aJ(s.c,b.c)},
gU(a){var s=this
return A.bW(s.$s,s.a,s.b,s.c,B.m,B.m)}}
A.cA.prototype={
gT(a){return B.fa},
$iJ:1}
A.dB.prototype={
eg(a,b,c,d){var s=A.aQ(b,0,c,d,null)
throw A.c(s)},
co(a,b,c,d){if(b>>>0!==b||b>c)this.eg(a,b,c,d)}}
A.fc.prototype={
gT(a){return B.fb},
$iJ:1}
A.ag.prototype={
gB(a){return a.length},
$iaB:1}
A.dz.prototype={
C(a,b){A.ca(b,a,a.length)
return a[b]},
cc(a,b,c,d){var s,r,q,p
t.bM.a(d)
a.$flags&2&&A.be(a,5)
s=a.length
this.co(a,b,s,"start")
this.co(a,c,s,"end")
if(b>c)A.l(A.aQ(b,0,c,null,null))
r=c-b
q=d.length
if(q<r)A.l(A.m("Not enough elements"))
p=q!==r?d.subarray(0,r):d
a.set(p,b)
return},
$in:1,
$iA:1}
A.dA.prototype={$in:1,$iA:1}
A.dy.prototype={
gT(a){return B.fc},
$iJ:1,
$ii_:1}
A.fd.prototype={
gT(a){return B.fd},
$iJ:1,
$ii0:1}
A.fe.prototype={
gT(a){return B.fe},
C(a,b){A.ca(b,a,a.length)
return a[b]},
$iJ:1}
A.ff.prototype={
gT(a){return B.ff},
C(a,b){A.ca(b,a,a.length)
return a[b]},
$iJ:1}
A.fg.prototype={
gT(a){return B.fg},
C(a,b){A.ca(b,a,a.length)
return a[b]},
$iJ:1}
A.fh.prototype={
gT(a){return B.fj},
C(a,b){A.ca(b,a,a.length)
return a[b]},
$iJ:1}
A.fi.prototype={
gT(a){return B.fk},
C(a,b){A.ca(b,a,a.length)
return a[b]},
$iJ:1}
A.dC.prototype={
gT(a){return B.fl},
gB(a){return a.length},
C(a,b){A.ca(b,a,a.length)
return a[b]},
$iJ:1}
A.fj.prototype={
gT(a){return B.fm},
gB(a){return a.length},
C(a,b){A.ca(b,a,a.length)
return a[b]},
$iJ:1,
$idU:1}
A.e5.prototype={}
A.e6.prototype={}
A.e7.prototype={}
A.e8.prototype={}
A.b_.prototype={
h(a){return A.ei(v.typeUniverse,this,a)},
X(a){return A.nh(v.typeUniverse,this,a)}}
A.h6.prototype={}
A.k1.prototype={
j(a){return A.aH(this.a,null)}}
A.h4.prototype={
j(a){return this.a}}
A.ee.prototype={$ibo:1}
A.jF.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:13}
A.jE.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:68}
A.jG.prototype={
$0(){this.a.$0()},
$S:14}
A.jH.prototype={
$0(){this.a.$0()},
$S:14}
A.k_.prototype={
dJ(a,b){if(self.setTimeout!=null)self.setTimeout(A.cX(new A.k0(this,b),0),a)
else throw A.c(A.c1("`setTimeout()` not found."))}}
A.k0.prototype={
$0(){this.b.$0()},
$S:1}
A.fV.prototype={
bP(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.bz(a)
else{s=r.a
if(q.h("bS<1>").b(a))s.cn(a)
else s.cs(a)}},
bQ(a,b){var s=this.a
if(this.b)s.bD(new A.aK(a,b))
else s.bA(new A.aK(a,b))}}
A.k5.prototype={
$1(a){return this.a.$2(0,a)},
$S:7}
A.k6.prototype={
$2(a,b){this.a.$2(1,new A.dh(a,t.l.a(b)))},
$S:69}
A.kr.prototype={
$2(a,b){this.a(A.e(a),b)},
$S:23}
A.bt.prototype={
gt(){var s=this.b
return s==null?this.$ti.c.a(s):s},
ek(a,b){var s,r,q
a=A.e(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
n(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.n()){o.b=s.gt()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.ek(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.nb
return!1}if(0>=p.length)return A.d(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.nb
throw n
return!1}if(0>=p.length)return A.d(p,-1)
o.a=p.pop()
m=1
continue}throw A.c(A.m("sync*"))}return!1},
fO(a){var s,r,q=this
if(a instanceof A.bJ){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.i(r,q.a)
q.a=s
return 2}else{q.d=J.ac(a)
return 2}},
$iY:1}
A.bJ.prototype={
gJ(a){return new A.bt(this.a(),this.$ti.h("bt<1>"))}}
A.aK.prototype={
j(a){return A.o(this.a)},
$iR:1,
gaU(){return this.b}}
A.h_.prototype={
bQ(a,b){var s=this.a
if((s.a&30)!==0)throw A.c(A.m("Future already completed"))
s.bA(A.q0(a,b))},
cX(a){return this.bQ(a,null)}}
A.dZ.prototype={
bP(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.c(A.m("Future already completed"))
s.bz(r.h("1/").a(a))}}
A.c2.prototype={
ff(a){if((this.c&15)!==6)return!0
return this.b.b.c5(t.al.a(this.d),a.a,t.y,t.K)},
f3(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.q.b(q))p=l.fE(q,m,a.b,o,n,t.l)
else p=l.c5(t.x.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.ch(s))){if((r.c&1)!==0)throw A.c(A.i("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.c(A.i("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.a1.prototype={
di(a,b,c){var s,r,q=this.$ti
q.X(c).h("1/(2)").a(a)
s=$.U
if(s===B.C){if(!t.q.b(b)&&!t.x.b(b))throw A.c(A.a2(b,"onError",u.c))}else{c.h("@<0/>").X(q.c).h("1(2)").a(a)
b=A.qg(b,s)}r=new A.a1(s,c.h("a1<0>"))
this.by(new A.c2(r,3,a,b,q.h("@<1>").X(c).h("c2<1,2>")))
return r},
cO(a,b,c){var s,r=this.$ti
r.X(c).h("1/(2)").a(a)
s=new A.a1($.U,c.h("a1<0>"))
this.by(new A.c2(s,19,a,b,r.h("@<1>").X(c).h("c2<1,2>")))
return s},
em(a){this.a=this.a&1|16
this.c=a},
b8(a){this.a=a.a&30|this.a&1
this.c=a.c},
by(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.e.a(r.c)
if((s.a&24)===0){s.by(a)
return}r.b8(s)}A.hw(null,null,r.b,t.M.a(new A.jL(r,a)))}},
cE(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.e.a(m.c)
if((n.a&24)===0){n.cE(a)
return}m.b8(n)}l.a=m.bd(a)
A.hw(null,null,m.b,t.M.a(new A.jP(l,m)))}},
bc(){var s=t.F.a(this.c)
this.c=null
return this.bd(s)},
bd(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cs(a){var s,r=this
r.$ti.c.a(a)
s=r.bc()
r.a=8
r.c=a
A.cP(r,s)},
dY(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.bc()
q.b8(a)
A.cP(q,r)},
bD(a){var s=this.bc()
this.em(a)
A.cP(this,s)},
bz(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bS<1>").b(a)){this.cn(a)
return}this.dM(a)},
dM(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.hw(null,null,s.b,t.M.a(new A.jN(s,a)))},
cn(a){A.lF(this.$ti.h("bS<1>").a(a),this,!1)
return},
bA(a){this.a^=2
A.hw(null,null,this.b,t.M.a(new A.jM(this,a)))},
$ibS:1}
A.jL.prototype={
$0(){A.cP(this.a,this.b)},
$S:1}
A.jP.prototype={
$0(){A.cP(this.b,this.a.a)},
$S:1}
A.jO.prototype={
$0(){A.lF(this.a.a,this.b,!0)},
$S:1}
A.jN.prototype={
$0(){this.a.cs(this.b)},
$S:1}
A.jM.prototype={
$0(){this.a.bD(this.b)},
$S:1}
A.jS.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.fD(t.fO.a(q.d),t.A)}catch(p){s=A.ch(p)
r=A.d_(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.lk(q)
n=k.a
n.c=new A.aK(q,o)
q=n}q.b=!0
return}if(j instanceof A.a1&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.a1){m=k.b.a
l=new A.a1(m.b,m.$ti)
j.di(new A.jT(l,m),new A.jU(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:1}
A.jT.prototype={
$1(a){this.a.dY(this.b)},
$S:13}
A.jU.prototype={
$2(a,b){A.eq(a)
t.l.a(b)
this.a.bD(new A.aK(a,b))},
$S:28}
A.jR.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.c5(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.ch(l)
r=A.d_(l)
q=s
p=r
if(p==null)p=A.lk(q)
o=this.a
o.c=new A.aK(q,p)
o.b=!0}},
$S:1}
A.jQ.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.ff(s)&&p.a.e!=null){p.c=p.a.f3(s)
p.b=!1}}catch(o){r=A.ch(o)
q=A.d_(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.lk(p)
m=l.b
m.c=new A.aK(p,n)
p=m}p.b=!0}},
$S:1}
A.fW.prototype={}
A.hm.prototype={}
A.en.prototype={$in6:1}
A.hg.prototype={
fF(a){var s,r,q
t.M.a(a)
try{if(B.C===$.U){a.$0()
return}A.nu(null,null,this,a,t.H)}catch(q){s=A.ch(q)
r=A.d_(q)
A.lW(A.eq(s),t.l.a(r))}},
eE(a){return new A.jY(this,t.M.a(a))},
fD(a,b){b.h("0()").a(a)
if($.U===B.C)return a.$0()
return A.nu(null,null,this,a,b)},
c5(a,b,c,d){c.h("@<0>").X(d).h("1(2)").a(a)
d.a(b)
if($.U===B.C)return a.$1(b)
return A.qi(null,null,this,a,b,c,d)},
fE(a,b,c,d,e,f){d.h("@<0>").X(e).X(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.U===B.C)return a.$2(b,c)
return A.qh(null,null,this,a,b,c,d,e,f)},
de(a,b,c,d){return b.h("@<0>").X(c).X(d).h("1(2,3)").a(a)}}
A.jY.prototype={
$0(){return this.a.fF(this.b)},
$S:1}
A.kq.prototype={
$0(){A.ob(this.a,this.b)},
$S:1}
A.e1.prototype={
gB(a){return this.a},
gar(){return new A.e2(this,this.$ti.h("e2<1>"))},
aX(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.e1(a)},
e1(a){var s=this.d
if(s==null)return!1
return this.aq(this.cr(s,a),a)>=0},
C(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.lG(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.lG(q,b)
return r}else return this.ed(b)},
ed(a){var s,r,q=this.d
if(q==null)return null
s=this.cr(q,a)
r=this.aq(s,a)
return r<0?null:s[r+1]},
K(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.cq(s==null?m.b=A.lH():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.cq(r==null?m.c=A.lH():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.lH()
p=A.hx(b)&1073741823
o=q[p]
if(o==null){A.lI(q,p,[b,c]);++m.a
m.e=null}else{n=m.aq(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
ac(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.aW(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.aW(s.c,b)
else return s.bM(b)},
bM(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.hx(a)&1073741823
r=n[s]
q=o.aq(r,a)
if(q<0)return null;--o.a
o.e=null
p=r.splice(q,2)[1]
if(0===r.length)delete n[s]
return p},
b_(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.ct()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.C(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.c(A.aL(m))}},
ct(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.du(i.a,null,!1,t.A)
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
cq(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.lI(a,b,c)},
aW(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.lG(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
cr(a,b){return a[A.hx(b)&1073741823]}}
A.e4.prototype={
aq(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.e2.prototype={
gB(a){return this.a.a},
gJ(a){var s=this.a
return new A.e3(s,s.ct(),this.$ti.h("e3<1>"))}}
A.e3.prototype={
gt(){var s=this.d
return s==null?this.$ti.c.a(s):s},
n(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.c(A.aL(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iY:1}
A.b1.prototype={
eh(){return new A.b1(A.x(this).h("b1<1>"))},
gJ(a){var s=this,r=new A.c5(s,s.r,A.x(s).h("c5<1>"))
r.c=s.e
return r},
gB(a){return this.a},
A(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.e0(b)},
e0(a){var s=this.d
if(s==null)return!1
return this.aq(s[this.bE(a)],a)>=0},
i(a,b){var s,r,q=this
A.x(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.cp(s==null?q.b=A.lK():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.cp(r==null?q.c=A.lK():r,b)}else return q.dK(b)},
dK(a){var s,r,q,p=this
A.x(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.lK()
r=p.bE(a)
q=s[r]
if(q==null)s[r]=[p.bC(a)]
else{if(p.aq(q,a)>=0)return!1
q.push(p.bC(a))}return!0},
ac(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.aW(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.aW(s.c,b)
else return s.bM(b)},
bM(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.bE(a)
r=n[s]
q=o.aq(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.cS(p)
return!0},
a3(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bB()}},
cp(a,b){A.x(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.bC(b)
return!0},
aW(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.cS(s)
delete a[b]
return!0},
bB(){this.r=this.r+1&1073741823},
bC(a){var s,r=this,q=new A.h9(A.x(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.bB()
return q},
cS(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.bB()},
bE(a){return J.V(a)&1073741823},
aq(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aJ(a[r].a,b))return r
return-1},
$imx:1}
A.h9.prototype={}
A.c5.prototype={
gt(){var s=this.d
return s==null?this.$ti.c.a(s):s},
n(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.c(A.aL(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iY:1}
A.il.prototype={
$2(a,b){this.a.K(0,this.b.a(a),this.c.a(b))},
$S:31}
A.L.prototype={
gJ(a){return new A.at(a,this.gB(a),A.cf(a).h("at<L.E>"))},
a5(a,b){return this.C(a,b)},
bk(a,b){var s,r
A.cf(a).h("y(L.E)").a(b)
s=this.gB(a)
for(r=0;r<s;++r){if(!b.$1(this.C(a,r)))return!1
if(s!==this.gB(a))throw A.c(A.aL(a))}return!0},
j(a){return A.ln(a,"[","]")}}
A.bV.prototype={
b_(a,b){var s,r,q,p=A.x(this)
p.h("~(1,2)").a(b)
for(s=this.gar(),s=s.gJ(s),p=p.y[1];s.n();){r=s.gt()
q=this.C(0,r)
b.$2(r,q==null?p.a(q):q)}},
fl(a,b){var s,r,q,p,o,n=this,m=A.x(n)
m.h("y(1,2)").a(b)
s=A.b([],m.h("q<1>"))
for(r=n.gar(),r=r.gJ(r),m=m.y[1];r.n();){q=r.gt()
p=n.C(0,q)
if(b.$2(q,p==null?m.a(p):p))B.a.i(s,q)}for(m=s.length,o=0;o<s.length;s.length===m||(0,A.C)(s),++o)n.ac(0,s[o])},
gB(a){var s=this.gar()
return s.gB(s)},
j(a){return A.im(this)},
$iaD:1}
A.io.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.o(a)
r.a=(r.a+=s)+": "
s=A.o(b)
r.a+=s},
$S:32}
A.ej.prototype={}
A.cz.prototype={
C(a,b){return this.a.C(0,b)},
gB(a){return this.a.a},
gar(){var s=this.a
return new A.bj(s,A.x(s).h("bj<1>"))},
j(a){return A.im(this.a)},
gdl(){var s=this.a
return new A.aZ(s,A.x(s).h("aZ<2>"))},
gaY(){var s=this.a
return new A.bi(s,A.x(s).h("bi<1,2>"))},
$iaD:1}
A.dV.prototype={}
A.bn.prototype={
gd8(a){return this.gB(this)!==0},
G(a,b){var s
for(s=J.ac(A.x(this).h("n<1>").a(b));s.n();)this.i(0,s.gt())},
d1(a){var s,r,q=this.aO(0)
for(s=this.gJ(this);s.n();){r=s.gt()
if(a.A(0,r))q.ac(0,r)}return q},
j(a){return A.ln(this,"{","}")},
fd(a,b){var s,r,q=this.gJ(this)
if(!q.n())return""
s=J.ci(q.gt())
if(!q.n())return s
if(b.length===0){r=s
do r+=A.o(q.gt())
while(q.n())}else{r=s
do r=r+b+A.o(q.gt())
while(q.n())}return r.charCodeAt(0)==0?r:r},
ez(a,b){var s
A.x(this).h("y(1)").a(b)
for(s=this.gJ(this);s.n();)if(b.$1(s.gt()))return!0
return!1},
a5(a,b){var s,r
A.j0(b,"index")
s=this.gJ(this)
for(r=b;s.n();){if(r===0)return s.gt();--r}throw A.c(A.ig(b,b-r,this,"index"))},
$in:1,
$ibE:1}
A.eb.prototype={
aO(a){var s=this.eh()
s.G(0,this)
return s}}
A.hp.prototype={
i(a,b){this.$ti.c.a(b)
return A.pJ()}}
A.dW.prototype={
gB(a){return this.a.a},
gJ(a){var s=this.a
return A.lJ(s,s.r,A.x(s).c)},
aO(a){return this.a.aO(0)}}
A.cT.prototype={}
A.ek.prototype={}
A.bO.prototype={
a8(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bO)if(this.a===b.a)s=this.b===b.b
return s},
gU(a){return A.bW(this.a,this.b,B.m,B.m,B.m,B.m)},
S(a,b){var s
t.df.a(b)
s=B.e.S(this.a,b.a)
if(s!==0)return s
return B.e.S(this.b,b.b)},
j(a){var s=this,r=A.o7(A.oG(s)),q=A.eM(A.oE(s)),p=A.eM(A.oA(s)),o=A.eM(A.oB(s)),n=A.eM(A.oD(s)),m=A.eM(A.oF(s)),l=A.mn(A.oC(s)),k=s.b,j=k===0?"":A.mn(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iar:1}
A.jI.prototype={
j(a){return this.D()}}
A.R.prototype={
gaU(){return A.oz(this)}}
A.ew.prototype={
j(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.hV(s)
return"Assertion failed"}}
A.bo.prototype={}
A.b2.prototype={
gbH(){return"Invalid argument"+(!this.a?"(s)":"")},
gbG(){return""},
j(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.o(p),n=s.gbH()+q+o
if(!s.a)return n
return n+s.gbG()+": "+A.hV(s.gbZ())},
gbZ(){return this.b}}
A.cG.prototype={
gbZ(){return A.nk(this.b)},
gbH(){return"RangeError"},
gbG(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.o(q):""
else if(q==null)s=": Not greater than or equal to "+A.o(r)
else if(q>r)s=": Not in inclusive range "+A.o(r)+".."+A.o(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.o(r)
return s}}
A.f0.prototype={
gbZ(){return A.e(this.b)},
gbH(){return"RangeError"},
gbG(){if(A.e(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gB(a){return this.f}}
A.dX.prototype={
j(a){return"Unsupported operation: "+this.a}}
A.fM.prototype={
j(a){return"UnimplementedError: "+this.a}}
A.cK.prototype={
j(a){return"Bad state: "+this.a}}
A.eJ.prototype={
j(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.hV(s)+"."}}
A.fl.prototype={
j(a){return"Out of Memory"},
gaU(){return null},
$iR:1}
A.dS.prototype={
j(a){return"Stack Overflow"},
gaU(){return null},
$iR:1}
A.jJ.prototype={
j(a){return"Exception: "+this.a}}
A.i1.prototype={
j(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.n.prototype={
bW(a,b,c,d){var s,r
d.a(b)
A.x(this).X(d).h("1(1,n.E)").a(c)
for(s=this.gJ(this),r=b;s.n();)r=c.$2(r,s.gt())
return r},
gB(a){var s,r=this.gJ(this)
for(s=0;r.n();)++s
return s},
gaT(a){var s,r=this.gJ(this)
if(!r.n())throw A.c(A.f3())
s=r.gt()
if(r.n())throw A.c(A.mq())
return s},
f2(a,b){var s,r
A.x(this).h("y(n.E)").a(b)
for(s=this.gJ(this);s.n();){r=s.gt()
if(b.$1(r))return r}throw A.c(A.f3())},
a5(a,b){var s,r
A.j0(b,"index")
s=this.gJ(this)
for(r=b;s.n();){if(r===0)return s.gt();--r}throw A.c(A.ig(b,b-r,this,"index"))},
j(a){return A.oh(this,"(",")")}}
A.am.prototype={
j(a){return"MapEntry("+A.o(this.a)+": "+A.o(this.b)+")"}}
A.a7.prototype={
gU(a){return A.z.prototype.gU.call(this,0)},
j(a){return"null"}}
A.z.prototype={$iz:1,
a8(a,b){return this===b},
gU(a){return A.ft(this)},
j(a){return"Instance of '"+A.fu(this)+"'"},
gT(a){return A.m1(this)},
toString(){return this.j(this)}}
A.hn.prototype={
j(a){return""},
$ibF:1}
A.fI.prototype={
gB(a){return this.a.length},
j(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.ix.prototype={
j(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.l9.prototype={
$1(a){return this.a.bP(this.b.h("0/?").a(a))},
$S:7}
A.la.prototype={
$1(a){if(a==null)return this.a.cX(new A.ix(a===undefined))
return this.a.cX(a)},
$S:7}
A.kv.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.nt(a))return a
s=this.a
a.toString
if(s.aX(a))return s.C(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.l(A.aQ(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.cc(!0,"isUtc",t.y)
return new A.bO(r,0,!0)}if(a instanceof RegExp)throw A.c(A.i("structured clone of RegExp",null))
if(a instanceof Promise)return A.qT(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.aC(p,p)
s.K(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.cZ(n),p=s.gJ(n);p.n();)m.push(A.cY(p.gt()))
for(l=0;l<s.gB(n);++l){k=s.C(n,l)
if(!(l<m.length))return A.d(m,l)
j=m[l]
if(k!=null)o.K(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.K(0,a,o)
h=A.e(a.length)
for(s=J.cZ(i),l=0;l<h;++l)o.push(this.$1(s.C(i,l)))
return o}return a},
$S:77}
A.h8.prototype={
br(a){if(a<=0||a>4294967296)throw A.c(A.mO(u.g+a))
return Math.random()*a>>>0},
M(){return Math.random()},
c1(){return Math.random()<0.5},
$ily:1}
A.c7.prototype={
b7(a){var s,r,q,p,o,n,m,l=this,k=4294967296
do{s=a>>>0
a=B.e.a_(a-s,k)
r=a>>>0
a=B.e.a_(a-r,k)
q=(~s>>>0)+(s<<21>>>0)
p=q>>>0
r=(~r>>>0)+((r<<21|s>>>11)>>>0)+B.e.a_(q-p,k)>>>0
q=((p^(p>>>24|r<<8))>>>0)*265
s=q>>>0
r=((r^r>>>24)>>>0)*265+B.e.a_(q-s,k)>>>0
q=((s^(s>>>14|r<<18))>>>0)*21
s=q>>>0
r=((r^r>>>14)>>>0)*21+B.e.a_(q-s,k)>>>0
s=(s^(s>>>28|r<<4))>>>0
r=(r^r>>>28)>>>0
q=(s<<31>>>0)+s
p=q>>>0
o=B.e.a_(q-p,k)
q=l.a*1037
n=l.a=q>>>0
m=l.b*1037+B.e.a_(q-n,k)>>>0
l.b=m
n=(n^p)>>>0
l.a=n
o=(m^r+((r<<31|s>>>1)>>>0)+o>>>0)>>>0
l.b=o}while(a!==0)
if(o===0&&n===0)l.a=23063
l.aj()
l.aj()
l.aj()
l.aj()},
aj(){var s=this,r=s.a,q=4294901760*r,p=q>>>0,o=55905*r,n=o>>>0,m=n+p+s.b
r=m>>>0
s.a=r
s.b=B.e.a_(o-n+(q-p)+(m-r),4294967296)>>>0},
br(a){var s,r,q,p=this
if(a<=0||a>4294967296)throw A.c(A.mO(u.g+a))
s=a-1
if((a&s)>>>0===0){p.aj()
return(p.a&s)>>>0}do{p.aj()
r=p.a
q=r%a}while(r-q+a>=4294967296)
return q},
M(){var s,r=this
r.aj()
s=r.a
r.aj()
return((s&67108863)*134217728+(r.a&134217727))/9007199254740992},
c1(){this.aj()
return(this.a&1)===0},
$ily:1}
A.j3.prototype={}
A.cF.prototype={
D(){return"QualityProfileKind."+this.b}}
A.aF.prototype={}
A.eK.prototype={
aa(){var s=this
if(s.d)return
s.a.aa()
s.b.aa()
s.d=!0}}
A.eL.prototype={
aa(){if(this.e)return
this.e=!0
this.a=null}}
A.cM.prototype={
D(){return"ToneMappingMode."+this.b}}
A.fq.prototype={
bh(a,b,c,d){var s=this,r=a==null?s.b:a,q=c==null?s.c:c,p=b==null?s.d:b,o=d==null?s.fr:d
return A.fr(s.at,r,s.as,p,s.Q,s.a,s.f,s.ay,s.r,s.z,!1,q,s.y,s.x,s.w,o,s.ax,s.ch,s.db,s.dx,s.cy,s.cx,s.CW,s.e)},
cY(a){return this.bh(null,a,null,null)},
eK(a){return this.bh(null,null,a,null)},
eI(a){return this.bh(a,null,null,null)},
eL(a){return this.bh(null,null,null,a)},
p(){var s,r,q,p,o,n,m,l,k,j=this,i=null
for(s=j.r,r=j.w,q=j.x,p=j.y,o=j.z,n=A.mw(["exposure",j.a,"bloomStrength",j.b,"ssaoStrength",j.c,"depthOfFieldStrength",j.d,"vignette",j.e,"grain",j.f,"rainIntensity",s,"surfaceWetness",r,"surfaceSnowCoverage",q,"surfaceDissolution",p,"rainWindowVisibility",o,"ditherStrength",j.Q,"colorGradeStrength",j.as,"affineWarpStrength",j.at,"vertexSnapGrid",j.ax,"vhsChromaWeight",j.ch,"vhsTrackingWeight",j.CW,"vhsNoiseWeight",j.cx,"vhsHeadSwitchWeight",j.cy,"vhsDropoutWeight",j.db,"vhsGhostWeight",j.dx],t.N,t.i),n=new A.bi(n,A.x(n).h("bi<1,2>")).gJ(0);n.n();){m=n.d
l=m.a
k=m.b
if(!isFinite(k)||k<0)throw A.c(A.i("PostProcessState."+l+" must be >= 0: "+A.o(k),i))}n=j.ay
if(n<1||n>8)throw A.c(A.i("PostProcessState.quantizationBits must be in [1, 8]: "+n,i))
if(s>1)throw A.c(A.i("PostProcessState.rainIntensity must be in [0, 1]: "+s,i))
if(r>1)throw A.c(A.i("PostProcessState.surfaceWetness must be in [0, 1]: "+r,i))
if(q>1)throw A.c(A.i("PostProcessState.surfaceSnowCoverage must be in [0, 1]: "+q,i))
if(p>1)throw A.c(A.i("PostProcessState.surfaceDissolution must be in [0, 1]: "+p,i))
if(o>1)throw A.c(A.i("PostProcessState.rainWindowVisibility must be in [0, 1]: "+o,i))}}
A.d5.prototype={
gd7(){var s,r=this,q=r.x
if(q===$){s=r.b.c0()
r.x!==$&&A.m5()
r.x=s
q=s}return q},
gfc(){var s,r=this,q=r.z
if(q===$){s=r.c.c0()
r.z!==$&&A.m5()
r.z=s
q=s}return q},
p(){var s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=i.d
if(!g.gE(0))throw A.c(A.i("CameraView.eye must be finite: "+g.j(0),h))
g=i.e
if(!g.gE(0)||g.gO()<1e-12)throw A.c(A.i("CameraView.forward must be finite and nonzero: "+g.j(0),h))
g=i.f
if(isFinite(g)){s=i.r
s=!isFinite(s)||g<=0||s<=g}else s=!0
if(s)throw A.c(A.i("CameraView requires 0 < near < far, got "+A.o(g)+"/"+i.r,h))
g=i.w
if(!isFinite(g)||g<=0)throw A.c(A.i("CameraView.aspect must be finite and > 0: "+A.o(g),h))
g=i.a
if(!g.gE(0)||!i.b.gE(0)||!i.c.gE(0))throw A.c(A.i("CameraView matrices must be finite",h))
for(s=i.c.a,r=s.length,g=i.b.k(0,g).a,q=g.length,p=0,o=-1,n=0;n<16;++n){if(!(n<r))return A.d(s,n)
m=s[n]
if(!(n<q))return A.d(g,n)
l=g[n]
k=Math.abs(m-l)/(1+Math.abs(l))
if(k>p){o=n
p=k}}if(p>0.0001){m=B.b.fH(p,2)
l=B.e.a_(o,4)
j=B.e.F(o,4)
if(!(o>=0&&o<r))return A.d(s,o)
s=s[o]
if(!(o<q))return A.d(g,o)
throw A.c(A.i("CameraView.viewProjection must equal projection * view. Worst relative mismatch "+m+" at column "+l+" row "+j+" (got "+A.o(s)+", expected "+A.o(g[o])+"). Prefer CameraView.look/lookAt/fromMatrices, which derive it.",h))}}}
A.dR.prototype={}
A.eS.prototype={
p(){var s,r,q,p,o,n,m,l,k,j=this,i=null
if(!j.a.gE(0)||!j.b.gE(0)||!j.fx.gE(0)||!j.r.gE(0)||!j.dx.gE(0))throw A.c(A.i("FrameEnvironment colors must be finite",i))
s=j.k4
if(s!=null){r=!0
if(B.z.dk(s.a).length!==0)if(s.c.gE(0))if(s.d.gE(0))if(s.e.gE(0)){q=s.f
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
if(s)A.l(A.i("SkyboxDeclaration contains invalid values",i))}s=j.c
if(isFinite(s)){r=j.d
r=!isFinite(r)||r<s}else r=!0
if(r)throw A.c(A.i("FrameEnvironment requires fogEnd >= fogStart, got "+s+"/"+j.d,i))
s=j.fy
if(!isFinite(s)||s<0)throw A.c(A.i("FrameEnvironment.ambientIntensity must be >= 0: "+A.o(s),i))
s=j.go
if(s!=null)s.p()
for(s=j.id,r=s.length,o=0;o<r;++o){n=s[o]
q=n.b
if(!(isFinite(q.a)&&isFinite(q.b)&&isFinite(q.c)))A.l(A.i("PointLight.position must be finite: "+q.j(0),i))
q=n.d
if(!isFinite(q)||q<0)A.l(A.i("PointLight.intensity must be >= 0: "+A.o(q),i))
q=n.e
if(!isFinite(q)||q<=0)A.l(A.i("PointLight.radius must be > 0: "+q,i))}for(s=isFinite(0),r=isFinite(1),q=isFinite(-1),o=0;!1;++o){if(s)p=r
else p=!1
if(!p)A.l(A.i("SpotLight.position must be finite: "+B.d.j(0),i))
if(s)p=q
else p=!1
if(!p)A.l(A.i("SpotLight.direction must be finite and nonzero: "+B.q.j(0),i))}s=t.N
m=A.ax(s)
for(r=j.k2,o=0;!1;++o){l=r[o]
l.p()
if(!m.i(0,l.gN()))throw A.c(A.i("FrameEnvironment.volumetricSources contains duplicate id: "+A.o(l.gN()),i))}r=j.w
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
if(r)throw A.c(A.i("invalid volumetric medium controls",i))
k=A.ax(s)
for(s=j.k3,o=0;!1;++o){l=s[o]
l.p()
if(!k.i(0,l.gN()))throw A.c(A.i("FrameEnvironment.thermalSources contains duplicate id: "+A.o(l.gN()),i))}},
aw(a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this
t.c3.a(b1)
s=a4==null?a1.a:a4
r=a6==null?a1.b:a6
q=b0==null?a1.c:b0
p=a8==null?a1.d:a8
o=a9===B.n?a1.e:A.lN(a9)
n=a7===B.n?a1.f:A.lN(a7)
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
b=a5===B.n?a1.go:t.eB.a(a5)
a=b1==null?a1.id:b1
a0=b5===B.n?a1.k4:t.bG.a(b5)
return new A.eS(s,r,q,p,o,n,m,l,k,j,a1.z,i,h,a1.at,a1.ax,a1.ay,a1.ch,a1.CW,a1.cx,a1.cy,a1.db,g,f,e,d,c,b,a,a1.k1,a1.k2,a1.k3,a0)},
cZ(a){var s=null
return this.aw(s,s,s,B.n,s,B.n,s,B.n,s,s,s,s,s,a,s,s,s,s,s,s)},
eQ(a,b,c,d,e,f,g){var s=null
return this.aw(a,b,c,d,s,B.n,s,B.n,s,s,e,f,g,B.n,s,s,s,s,s,s)},
eJ(a){var s=null
return this.aw(s,s,s,B.n,s,B.n,s,B.n,s,a,s,s,s,B.n,s,s,s,s,s,s)},
eM(a,b,c,d){var s=null
return this.aw(a,b,s,c,d,B.n,s,B.n,s,s,s,s,s,B.n,s,s,s,s,s,s)},
eP(a,b,c,d,e,f){var s=null
return this.aw(s,s,s,B.n,s,B.n,s,B.n,s,s,s,s,s,B.n,a,b,c,d,e,f)},
eN(a,b,c,d){var s=null
return this.aw(s,s,s,B.n,s,a,b,c,d,s,s,s,s,B.n,s,s,s,s,s,s)},
eO(a,b,c,d,e){var s=null
return this.aw(s,s,s,B.n,a,b,c,d,e,s,s,s,s,B.n,s,s,s,s,s,s)}}
A.i3.prototype={}
A.i4.prototype={
c_(a){++this.b}}
A.bm.prototype={
a8(a,b){if(b==null)return!1
return J.ev(b)===A.m1(this)&&b instanceof A.bm&&this.a===b.a&&this.b===b.b},
gU(a){return A.bW(A.m1(this),this.a,this.b,B.m,B.m,B.m)}}
A.aE.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MeshHandle(#"+this.a+"."+this.b+s+")"}}
A.aG.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"TextureHandle(#"+this.a+"."+this.b+s+")"}}
A.b6.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MaterialHandle(#"+this.a+"."+this.b+s+")"}}
A.fo.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"PipelineHandle(#"+this.a+"."+this.b+s+")"}}
A.b4.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.cw.prototype={
D(){return"HandleRejection."+this.b}}
A.ie.prototype={
j(a){return"HandleException("+this.a.b+", "+this.b.j(0)+")"}}
A.cE.prototype={
j(a){var s=this.b,r=this.a.a
return s==null?r.b+": ok":r.b+": "+A.o(s)}}
A.eC.prototype={}
A.kw.prototype={
$1(a){return t.W.a(a)===this.a},
$S:51}
A.v.prototype={
gE(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
a8(a,b){if(b==null)return!1
return b instanceof A.v&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gU(a){return A.bW(this.a,this.b,this.c,B.m,B.m,B.m)},
j(a){return"LinearColor("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.cr.prototype={
p(){var s=this.a
if(!s.gE(0)||s.gO()<1e-12)throw A.c(A.i("DirectionalLight.direction must be finite and nonzero: "+s.j(0),null))
s=this.c
if(!isFinite(s)||s<0)throw A.c(A.i("DirectionalLight.intensity must be >= 0: "+A.o(s),null))}}
A.bD.prototype={}
A.az.prototype={}
A.lb.prototype={
$2(a,b){var s,r=t.fk
r.a(a)
s=B.b.S(r.a(b).a,a.a)
return s===0?0:s},
$S:52}
A.hA.prototype={
D(){return"AlphaMode."+this.b}}
A.fa.prototype={
D(){return"MaterialMapColorSpace."+this.b}}
A.a0.prototype={
p(){var s,r,q,p,o,n,m,l=this,k=null
if(l.a.length===0)throw A.c(A.i("MaterialDefinition.key must not be empty",k))
s=l.w
if(!isFinite(s)||s<0)throw A.c(A.i("MaterialDefinition.emissiveStrength must be >= 0: "+A.o(s),k))
s=l.z
if(!isFinite(s)||s<0)throw A.c(A.i("MaterialDefinition.normalStrength must be >= 0: "+A.o(s),k))
A.f9("roughness",l.at)
A.f9("metallic",l.ax)
A.f9("occlusionStrength",1)
A.f9("clearcoatStrength",l.ch)
A.f9("clearcoatRoughness",l.CW)
if(!isFinite(0))throw A.c(A.i("MaterialDefinition.lightmapIntensity must be >= 0: 0",k))
for(s=l.db,r=l.dx,q=[new A.F("uvScaleU",s),new A.F("uvScaleV",r),new A.F("uvOffsetU",0),new A.F("uvOffsetV",0),new A.F("tintR",l.d),new A.F("tintG",l.e),new A.F("tintB",l.f)],p=0;p<7;++p){o=q[p]
n=o.a
m=o.b
if(!isFinite(m))throw A.c(A.i("MaterialDefinition."+n+" must be finite: "+A.o(m),k))}if(s===0||r===0)throw A.c(A.i("MaterialDefinition uv scale must not be zero",k))
if(!isFinite(0.5))throw A.c(A.i("MaterialDefinition.alphaCutoff must be in (0, 1]: 0.5",k))}}
A.br.prototype={
D(){return"VertexAttributeKind."+this.b}}
A.ao.prototype={}
A.jw.prototype={
p(){var s,r,q,p,o='VertexLayoutDescriptor "surfaceV2": attribute '
for(s=0;s<7;++s){r=B.M[s]
q=r.c
if(q<=0)throw A.c(A.i(o+r.a.j(0)+" must have a positive floatCount",null))
p=r.b
q=p+q
if(q>18)throw A.c(A.i(o+r.a.j(0)+" range ["+p+", "+q+") exceeds stride 18",null))}q=t.fg.a(new A.jx())
for(p=B.a.gJ(B.M),q=new A.Q(p,q,t.an);q.n();)if(p.gt().c!==4)throw A.c(A.i('VertexLayoutDescriptor "surfaceV2": tangent4 must contain 4 floats',null))}}
A.jx.prototype={
$1(a){return t.p.a(a).a===B.aA},
$S:8}
A.b7.prototype={
p(){var s,r,q,p,o,n=this
n.a.p()
s=n.b.length
if(B.e.F(s,18)!==0)throw A.c(A.i("MeshData.vertices length "+s+" is not a multiple of stride 18",null))
n.ev()
r=s/18|0
for(s=A.or(n.c),q=s.length,p=0;p<q;++p){o=s[p]
if(o>=r)throw A.c(A.i("MeshData index "+o+" out of range for "+r+" vertices",null))}s=n.d
q=s.a
if(q.gE(0)&&s.b.gE(0)){s=s.b
s=q.a<=s.a&&q.b<=s.b&&q.c<=s.c}else s=!1
if(!s)throw A.c(A.i("MeshData.localBounds must be a valid AABB",null))},
ev(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=null,a2=t.fg,a3=t.fl,a4=new A.ab(B.M,a2.a(new A.ir()),a3)
if(!a4.gJ(0).n())return
s=new A.ab(B.M,a2.a(new A.is()),a3)
if(s.gB(0)!==1)throw A.c(A.i("surface-v2 tangent data requires one normal slot",a1))
r=a4.gaT(0)
for(a2=this.b,a3=a2.length,q=a3/18|0,p=t.n,o=s.gaT(0).b,n=r.b,m=0;m<q;++m){l=m*18
k=l+o
if(!(k<a3))return A.d(a2,k)
j=a2[k]
i=k+1
if(!(i<a3))return A.d(a2,i)
h=a2[i]
k+=2
if(!(k<a3))return A.d(a2,k)
g=a2[k]
k=l+n
if(!(k<a3))return A.d(a2,k)
f=a2[k]
i=k+1
if(!(i<a3))return A.d(a2,i)
e=a2[i]
i=k+2
if(!(i<a3))return A.d(a2,i)
d=a2[i]
k+=3
if(!(k<a3))return A.d(a2,k)
c=a2[k]
b=j*j+h*h+g*g
a=f*f+e*e+d*d
if(!B.a.bk(A.b([j,h,g,f,e,d,c],p),new A.it()))throw A.c(A.i("surface-v2 tangent basis must be finite",a1))
if(b<1e-8||a<1e-8)throw A.c(A.i("surface-v2 tangent basis must be non-zero",a1))
a0=(j*f+h*e+g*d)/Math.sqrt(b*a)
if(Math.abs(a0)>0.05)throw A.c(A.i("surface-v2 tangent must be orthogonal to its normal: "+A.o(a0),a1))
if(Math.abs(Math.abs(c)-1)>0.05)throw A.c(A.i("surface-v2 tangent handedness must be -1 or +1: "+A.o(c),a1))}}}
A.ir.prototype={
$1(a){return t.p.a(a).a===B.aA},
$S:8}
A.is.prototype={
$1(a){return t.p.a(a).a===B.bo},
$S:8}
A.it.prototype={
$1(a){return isFinite(A.ep(a))},
$S:16}
A.hT.prototype={}
A.iz.prototype={
p(){var s=this.a,r=s.a
if(!r.A(0,"sceneColor")||!r.A(0,"present"))throw A.c(A.i("resource plan must contain sceneColor and present",null))
if(s.ez(0,new A.iB()))throw A.c(A.i("resource plan contains an empty resource ID",null))
if(this.b!==r.A(0,"vhsOutput"))throw A.c(A.i("resource history does not match vhsOutput ownership",null))}}
A.iB.prototype={
$1(a){return A.K(a).length===0},
$S:9}
A.iS.prototype={}
A.dN.prototype={
d6(a){var s=this
if(s.d)A.l(A.m("resource assembler is disposed"))
if(s.a!=null)throw A.c(A.m("resource assembler is initialized"))
a.p()
s.a=a
s.c=1},
aa(){if(this.d)return
this.d=!0
this.a=null}}
A.dg.prototype={
D(){return"DrawMode."+this.b}}
A.eA.prototype={
D(){return"BlendMode."+this.b}}
A.b9.prototype={}
A.jm.prototype={
j(a){var s=this
return"SurfaceMetrics(css "+s.a+"x"+s.b+", pixels "+s.c+"x"+s.d+", dpr "+A.o(s.e)+", visible: true)"},
p(){var s,r=this
if(r.a<0||r.b<0)throw A.c(A.i("SurfaceMetrics css size must be >= 0",null))
if(r.c<0||r.d<0)throw A.c(A.i("SurfaceMetrics pixel size must be >= 0",null))
s=r.e
if(!isFinite(s)||s<=0)throw A.c(A.i("SurfaceMetrics.devicePixelRatio must be finite and > 0: "+A.o(s),null))}}
A.hO.prototype={
D(){return"ColorEncoding."+this.b}}
A.dK.prototype={
p(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.d1(B.eM)
if(o.a!==0)A.l(A.a2(o,r,"contains unknown pipeline features"))
if(q.a===B.b2&&p.gd8(p))A.l(A.a2(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.c(A.i("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.c(A.i("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.cH.prototype={
D(){return"RendererState."+this.b}}
A.a_.prototype={}
A.i5.prototype={
j(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.b+" tris="+s.c+" culled="+s.d+" gpu="+s.r+"B)"}}
A.fb.prototype={
ft(a){return this.a.aJ(a)}}
A.iq.prototype={
$3(a,b,c){return new A.b6(A.e(a),A.e(b),A.bv(c))},
$S:71}
A.fO.prototype={}
A.iu.prototype={
cU(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.b,d=A.n2(f,new A.eU(e.byteLength,B.aK,B.c5))
if(f.b!==B.i)A.l(A.m(g))
s=A.k(d.a)
r=f.a
q=v.G
r.bindBuffer(A.e(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.e(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.aS(f)
A.ae(f,p)
if(f.b!==B.i)A.l(A.m(g))
r.bindBuffer(A.e(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=A.ax(t.S)
for(n=a.a,m=0;m<7;++m){l=B.M[m]
k=A.nx(l.a)
if(!o.i(0,k))continue
j=A.pP(n,k,l)
if(f.b!==B.i)A.l(A.m(g))
r.vertexAttribPointer.apply(r,[k,j,A.e(q.WebGL2RenderingContext.FLOAT),!1,72,l.b*4])
if(f.b!==B.i)A.l(A.m(g))
r.enableVertexAttribArray(k)}i=a.c
h=A.n2(f,new A.eU(A.mC(i),B.aK,B.aJ))
if(f.b!==B.i)A.l(A.m(g))
r.bindBuffer(A.e(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),A.k(h.a))
A.ph(f,h,t.bW.a(i))
f=i.length
return new A.fO(d,h,p,f,e.length/18|0,!1)},
fm(a){var s=this.c.C(0,a.a)
if(s==null)throw A.c(A.by(B.Y,a))
this.b.aJ(a)
return s},
c4(){var s,r,q,p
for(s=this.b.b1(),r=s.$ti,s=new A.bt(s.a(),r.h("bt<1>")),q=this.c,r=r.c;s.n();){p=s.b
if(p==null)p=r.a(p)
q.K(0,p.a.a,this.cU(p.b))}},
gb2(){return this.b.b1().bW(0,0,new A.iw(),t.S)}}
A.iv.prototype={
$3(a,b,c){return new A.aE(A.e(a),A.e(b),A.bv(c))},
$S:74}
A.iw.prototype={
$2(a,b){var s,r
A.e(a)
s=t.ai.a(b).b
r=s.b.byteLength
s=A.mC(s.c)
return a+r+s},
$S:22}
A.bb.prototype={}
A.fL.prototype={
ag(a){var s=this.a,r=A.lC(s,B.c8)
A.lD(s,r,0,a)
return r},
f1(a){var s,r=this.b,q=r.aJ(a),p=q.a
if(!p.d)return
s=this.c.C(0,a.a)
if(s==null)throw A.c(A.m("TextureStore.finalizeMips: no pixels uploaded yet for "+a.j(0)))
A.n3(this.a,s)
r.c7(a,new A.bb(p,q.b,!0))},
bN(a,b){var s
this.b.aJ(a)
s=this.c.C(0,a.a)
return s==null?b:s},
fo(a){var s
if(a==null){s=this.d
s===$&&A.G()
return s}s=this.d
s===$&&A.G()
return this.bN(a,s)},
fz(a){var s
if(a==null){s=this.e
s===$&&A.G()
return s}s=this.e
s===$&&A.G()
return this.bN(a,s)},
fB(a){var s
if(a==null){s=this.f
s===$&&A.G()
return s}s=this.f
s===$&&A.G()
return this.bN(a,s)},
fq(a){var s=this.r
s===$&&A.G()
return s},
fv(a){var s=this.w
s===$&&A.G()
return s},
aa(){var s,r,q,p,o,n=this
for(s=n.c,r=new A.bk(s,s.r,s.e,A.x(s).h("bk<2>")),q=n.a,p=q.a,o=t.R;r.n();)p.deleteTexture(o.a(r.d.a).a)
s.a3(0)
s=n.d
s===$&&A.G()
A.fT(q,s)
s=n.e
s===$&&A.G()
A.fT(q,s)
s=n.f
s===$&&A.G()
A.fT(q,s)
s=n.r
s===$&&A.G()
A.fT(q,s)
s=n.w
s===$&&A.G()
A.fT(q,s)},
c4(){var s,r,q,p,o,n,m,l,k,j,i=this
i.d=i.ag($.mb())
i.e=i.ag($.m8())
i.f=i.ag($.m9())
i.r=i.ag($.m7())
i.w=i.ag($.ma())
for(s=i.b.b1(),r=s.$ti,s=new A.bt(s.a(),r.h("bt<1>")),q=i.c,p=i.a,r=r.c;s.n();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
o=m.b
if(B.a.bk(o,new A.js()))continue
l=A.lC(p,m.a)
for(k=0;k<o.length;++k){j=o[k]
if(j!=null)A.lD(p,l,k,j)}if(m.c)A.n3(p,l)
q.K(0,n.a,l)}},
gb2(){return this.b.b1().bW(0,0,new A.jr(),t.S)}}
A.jq.prototype={
$3(a,b,c){return new A.aG(A.e(a),A.e(b),A.bv(c))},
$S:24}
A.js.prototype={
$1(a){return t.aD.a(a)==null},
$S:21}
A.jr.prototype={
$2(a,b){var s
A.e(a)
s=t.dU.a(b).b.a
return a+s.a*s.b*s.c*4},
$S:26}
A.aj.prototype={
D(){return"SolarPhase."+this.b}}
A.ji.prototype={
p(){var s,r,q,p,o,n,m,l,k,j,i=this,h="cloudCover01",g="precipitation01",f="relativeHumidity01",e=null
for(s=i.c,r=i.d,q=i.e,p=i.r,o=i.x,n=[new A.F("timeHours",i.a),new A.F("solarNoonHours",12),new A.F("latitudeRadians",s),new A.F("solarDeclinationRadians",r),new A.F(h,q),new A.F(g,0),new A.F("aerosolTurbidity",p),new A.F(f,0.7),new A.F("solarIntensity",o),new A.F("baseFogDensity",0.0015),new A.F("fogHeightFalloff",0.06)],m=0;m<11;++m){l=n[m]
k=l.a
if(!isFinite(l.b))throw A.c(A.i(k+" must be finite",e))}if(s<-1.5707963267948966||s>1.5707963267948966)throw A.c(A.i("latitudeRadians must be in [-pi/2, pi/2]",e))
if(r<-1.5707963267948966||r>1.5707963267948966)throw A.c(A.i("solarDeclinationRadians must be in [-pi/2, pi/2]",e))
for(s=[new A.F(h,q),new A.F(g,0),new A.F(f,0.7)],m=0;m<3;++m){r=s[m]
k=r.a
j=r.b
if(j<0||j>1)throw A.c(A.i(k+" must be in [0, 1]",e))}if(p>=1)s=o<0
else s=!0
if(s)throw A.c(A.i("solar attenuation inputs are out of bounds",e))}}
A.lc.prototype={
$2(a,b){var s,r=t.eS
r.a(a)
s=J.md(r.a(b).a,a.a)
return s},
$S:27}
A.hJ.prototype={
ey(a){if(a<=0)return
this.a=B.b.l(this.a+a,0,1)},
a7(a){var s
if(a<=0)return
this.b+=a
s=this.a
if(s>0)this.a=Math.max(0,s-a*1.25)},
eW(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this.a,c=d*d
if(c<=0.000001)return new A.cS(B.o,B.f)
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
g=A.ai(B.k,(m+0.4*l)*0.71*0.05*c)
f=A.ai(B.d,(k+0.4*j)*0.71*0.05*c)
e=A.ai(B.p,(i+0.4*h)*0.71*0.035*c)
return new A.cS(f.k(0,g).k(0,e),new A.a((d+0.5*r)*0.67*0.2*c,(q+0.5*p)*0.67*0.2*c,(o+0.5*n)*0.67*0.2*c))},
eA(a){var s,r,q,p,o,n
if(this.a<=0.000001)return a
s=this.eW()
r=s.a
q=a.d.v(0,s.b)
p=r.af(a.e)
o=A.lt(q,p,r.af(B.d))
n=a.b
return A.mi(a.w,q,a.r,p,a.f,n,o,n.k(0,o))}}
A.aw.prototype={}
A.eF.prototype={
dG(a,b,c,d,e,f,g){var s,r,q,p,o=this,n=o.a
if(n.length<2)throw A.c(A.i("CinematicTourCameraController requires at least 2 waypoints",null))
s=o.c
if(s<=0)throw A.c(A.a2(s,"duration","must be > 0"))
s=A.H(n)
r=s.h("a(1)")
s=s.h("M<1,a>")
q=s.h("T.E")
p=A.af(new A.M(n,r.a(new A.hM()),s),q)
p=A.lm(!0,p)
o.w!==$&&A.d1()
o.w=p
n=A.af(new A.M(n,r.a(new A.hN()),s),q)
n=A.lm(!0,n)
o.x!==$&&A.d1()
o.x=n
o.cz(0)},
cz(a){var s,r,q,p,o,n,m,l,k=this,j=k.w
j===$&&A.G()
s=j.au(a)
j=k.x
j===$&&A.G()
r=j.au(a)
j=k.f
if(j>0){q=a*k.c*k.r
k.as=s.v(0,new A.a(Math.sin(q*1.1)*j,Math.cos(q*0.85)*(j*0.75),Math.sin(q*0.7+1.2)*j))}else k.as=s
k.at=r
j=k.a
p=j.length
o=a*p
n=Math.min(B.b.ab(o),p-1)
m=B.e.F(n+1,p)
if(n>>>0!==n||n>=p)return A.d(j,n)
l=j[n].c
if(!(m>=0&&m<p))return A.d(j,m)
k.ax=l+(j[m].c-l)*(o-n)},
a7(a){var s,r=this
if(!r.z||a<=0)return
s=B.b.F(B.b.F(r.y+a/r.c,1)+1,1)
r.y=s
r.cz(s)},
b3(a){var s=this.as,r=this.at
return A.mj(a,s,300,this.ax,0.1,r,B.d)},
$icp:1}
A.hM.prototype={
$1(a){return t.Z.a(a).a},
$S:17}
A.hN.prototype={
$1(a){return t.Z.a(a).b},
$S:17}
A.bQ.prototype={
gaL(){var s=this,r=Math.cos(s.c),q=Math.sin(s.c)
return new A.a(Math.sin(s.b)*r,q,-Math.cos(s.b)*r).gm()},
a7(a){var s,r,q,p,o,n,m=this
if(a<=0)return
s=10*a
if(m.z.gO()>0.000001){r=new A.a(m.gaL().a,0,m.gaL().c).gm()
q=new A.a(m.gaL().R(B.d).gm().a,0,m.gaL().R(B.d).gm().c).gm()
p=m.z
o=r.k(0,p.c).v(0,q.k(0,p.a)).v(0,B.d.k(0,p.b)).gm().k(0,m.d)
n=B.b.l(s,0,1)
s=m.y.k(0,1-n).v(0,o.k(0,n))
m.y=s
m.a=m.a.v(0,s.k(0,a))}else{n=B.b.l(s,0,1)
s=m.y=m.y.k(0,1-n)
if(s.gO()>0.000001)m.a=m.a.v(0,s.k(0,a))}},
b3(a){return A.eE(a,this.a,200,this.gaL(),1,0.1,B.d)},
$icp:1}
A.bC.prototype={
gbV(){var s=this,r=Math.cos(s.d),q=Math.sin(s.d),p=Math.sin(s.c),o=Math.cos(s.c),n=s.a,m=s.b
return n.v(0,new A.a(r*p*m,q*m,r*o*m))},
gdf(){return this.a.P(0,this.gbV()).gm().R(B.d).gm()},
a7(a){var s,r,q,p=this
if(a<=0)return
if(p.as)p.ax=p.ax+p.at*a
s=B.b.l(1-Math.exp(-10*a),0,1)
r=p.c
p.c=r+(p.ax-r)*s
r=p.d
p.d=r+(p.ay-r)*s
r=p.b
p.b=r+(p.ch-r)*s
r=p.CW
q=p.a
p.a=q.v(0,r.P(0,q).k(0,s))},
b3(a){return A.mj(a,this.gbV(),200,1,0.1,this.a,B.d)},
$icp:1}
A.cJ.prototype={
a7(a){var s,r,q=this,p=q.a.gaC().a,o=p.v(0,q.c),n=Math.cos(q.Q),m=Math.sin(q.Q),l=o.v(0,new A.a(Math.sin(q.z)*n,m,Math.cos(q.z)*n).k(0,q.d)).v(0,new A.a(0,q.e,0))
if(!q.ax){q.as=l
q.at=o
q.ax=!0
return}s=B.b.l(a*q.f,0,1)
r=B.b.l(a*8,0,1)
q.as=A.lB(q.as,l,s)
q.at=A.lB(q.at,o,r)},
b3(a){var s=this.as,r=this.at.P(0,s)
return A.eE(a,s,250,r.gO()>1e-8?r.gm():B.D,1,0.1,B.d)},
$icp:1}
A.bg.prototype={
gf6(){return this.b.length}}
A.eQ.prototype={
eG(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h
t.U.a(a)
s=new A.j6(A.b([],t.cU),A.ax(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.C)(r),++p)r[p].a1(s,b)
o=s.eF(a,!1)
if(o.b.length!==0)return new A.eR(o,B.di)
q=o.a
n=A.H(q)
m=new A.M(q,n.h("w(1)").a(new A.hY()),n.h("M<1,w>")).aO(0)
l=A.b([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.C)(r),++p){k=r[p]
for(n=k.a0(d),j=n.length,i=0;i<n.length;n.length===j||(0,A.C)(n),++i){h=n[i]
if(!m.A(0,h.gq().a))throw A.c(A.m('RenderFeature "'+k.gN()+'" created a pass "'+h.gq().a+'" that it never declared into the graph'))
B.a.i(l,h)}}B.a.ao(l,new A.hZ(o))
return new A.eR(o,l)}}
A.hY.prototype={
$1(a){return t.z.a(a).a},
$S:29}
A.hZ.prototype={
$2(a,b){var s=t.g8
s.a(a)
s.a(b)
s=this.a.a
return B.e.S(B.a.bX(s,new A.hW(a)),B.a.bX(s,new A.hX(b)))},
$S:30}
A.hW.prototype={
$1(a){return t.z.a(a).a===this.a.gq().a},
$S:4}
A.hX.prototype={
$1(a){return t.z.a(a).a===this.a.gq().a},
$S:4}
A.eR.prototype={}
A.cu.prototype={
D(){return"FrameQueueState."+this.b}}
A.eT.prototype={
ce(a){var s,r,q=this
if(q.b!==B.R)throw A.c(A.m("FrameQueue.submit called outside an active frame"))
a.c.p()
s=q.c
r=q.a
if(s<r.length)B.a.K(r,s,a)
else B.a.i(r,a);++q.c},
$ioW:1}
A.i2.prototype={
eD(a){if(a.length===0)throw A.c(A.a2(a,"passId",null))
this.b=a
this.a.c3(a,A.nB())},
dv(){var s,r,q,p,o=t.A
o=A.aC(o,o)
for(s=this.a,s=new A.bi(s,A.x(s).h("bi<1,2>")).gJ(0);s.n();){r=s.d
q=r.a
p=r.b
o.K(0,q,new A.a_(p.a,p.b,p.d))}return A.ml(o,t.N,t.o)},
aG(a,b){var s,r=this.b
if(r==null)throw A.c(A.m("draw recorded outside an active render pass"))
if(b<1)throw A.c(A.i("draw count and instance count must be positive",null))
s=this.a.C(0,r);++s.a
s.d+=b
s.b=s.b+B.e.a_(a,3)*b}}
A.cQ.prototype={}
A.P.prototype={
gaM(){var s=this.c,r=A.H(s)
return new A.ab(s,r.h("y(1)").a(new A.iE()),r.h("ab<1>"))},
gb4(){var s=this.c,r=A.H(s)
return new A.ab(s,r.h("y(1)").a(new A.iF()),r.h("ab<1>"))},
j(a){return"PassDeclaration("+this.a+" @ "+this.b.j(0)+")"}}
A.iE.prototype={
$1(a){var s=t.L.a(a).b
return s===B.h||s===B.F},
$S:10}
A.iF.prototype={
$1(a){return t.L.a(a).b===B.j},
$S:10}
A.aY.prototype={
D(){return"GraphValidationFailureKind."+this.b}}
A.al.prototype={
j(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.fw.prototype={
D(){return"ResourceFormat."+this.b}}
A.bf.prototype={
D(){return"GraphStage."+this.b}}
A.W.prototype={
d9(){var s=this
return new A.W(s.a,s.b,s.c,s.d,s.e,s.f+1)},
a8(a,b){var s=this
if(b==null)return!1
return b instanceof A.W&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gU(a){var s=this
return A.bW(s.a,s.b,s.c,s.d,s.e,s.f)},
j(a){var s=this,r=s.b.j(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.dM.prototype={
D(){return"ResourceAccess."+this.b}}
A.p.prototype={}
A.da.prototype={}
A.j_.prototype={
a2(a){var s,r,q,p,o,n,m=this
a.p()
s=null
try{r=a.d.gar()
r=A.af(r,A.x(r).h("n.E"))
q=t.dy
s=A.pk(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.ch(p) instanceof A.dQ){++m.e
throw p}else throw p}o=new A.da(s)
r=m.b
q=a.a
n=r.C(0,q)
r.K(0,q,o);++m.d
if(n!=null)m.a.a.deleteProgram(A.k(n.b.a))
return o},
e3(a){var s,r
t.cr.a(a)
for(s=a.a,s=new A.bk(s,s.r,s.e,a.$ti.h("bk<1>")),r=this.a.a;s.n();)r.deleteProgram(A.k(s.d.b.a))}}
A.ad.prototype={
p(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.c(A.i("ProgramSource.id must not be empty",m))
s=t.S
r=A.ax(s)
for(q=this.d.gaY(),q=q.gJ(q);q.n();){p=q.gt()
o=p.b
if(o<0)throw A.c(A.i('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.i(0,o))throw A.c(A.i('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.ax(s)
for(s=this.e.gaY(),s=s.gJ(s);s.n();){q=s.gt()
p=q.b
if(p<0)throw A.c(A.i('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.i(0,p))throw A.c(A.i('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.j4.prototype={}
A.a8.prototype={
W(){var s=this
return A.o9(B.bv,s.f,B.T,B.Q,!0,!0,!0,!0,s.r,B.V,B.W,s.d,s.e,!0,!1,!1)}}
A.j6.prototype={
eF(a,b){var s=this.eu(t.U.a(a),!1),r=this.a,q=A.H(r)
return new A.j5(A.aN(new A.ab(r,q.h("y(1)").a(new A.jb()),q.h("ab<1>")),t.z),s)},
eu(a,b){var s,r,q,p,o,n,m=this
t.U.a(a)
s=A.b([],t.b7)
r=m.a
q=A.H(r)
p=q.h("ab<1>")
o=A.af(new A.ab(r,q.h("y(1)").a(new A.ja()),p),p.h("n.E"))
m.dO(o,a,s)
m.dS(o,s)
m.dU(o,s)
m.dR(o,!1,s)
n=m.dX(o,s)
m.dT(o,n,s)
m.dV(o,s)
m.dQ(o,n,s)
m.dP(o,s)
return s},
dO(a,b,c){var s,r,q,p
t.O.a(a)
t.U.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r){q=a[r]
p=B.aj.d1(b)
if(p.a!==0)B.a.i(c,new A.al(B.cm,q.a,"missing capabilities: "+p.fd(0,", ")))}},
dS(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gaM(),o=J.ac(p.a),p=new A.Q(o,p.b,p.$ti.h("Q<1>")),n=q.a;p.n();){m=o.gt().a
if(m.e>1)B.a.i(b,new A.al(B.ch,n,"reads multisampled resource "+m.j(0)+" directly; resolve before sampling"))}}},
dU(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.H(a),r=s.h("y(1)").a(new A.j9()),q=B.a.gJ(a),s=new A.Q(q,r,s.h("Q<1>"));s.n();){r=q.gt()
p=r.gaM()
o=A.af(p,p.$ti.h("n.E"))
p=r.gb4()
n=A.af(p,p.$ti.h("n.E"))
if(o.length!==1||n.length!==1){B.a.i(b,new A.al(B.aa,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.a.gaT(o).a
l=B.a.gaT(n).a
if(m.e<=1||l.e>1)B.a.i(b,new A.al(B.aa,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.a.i(b,new A.al(B.aa,r.a,"resolve source and destination must match format and extent"))}},
dR(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.C)(p),++m){l=p[m]
if(l.b===B.F)B.a.i(c,new A.al(B.ck,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
dX(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.aC(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.C)(a),++q){p=a[q]
for(o=p.gb4(),n=J.ac(o.a),o=new A.Q(n,o.b,o.$ti.h("Q<1>")),m=p.a;o.n();){l=n.gt().a
k=l.a+"#"+l.f
j=s.C(0,k)
if(j!=null){B.a.i(b,new A.al(B.cg,m,l.j(0)+" already written by "+j.a))
continue}s.K(0,k,p)}}return s},
dT(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gaM(),p=J.ac(q.a),q=new A.Q(p,q.b,q.$ti.h("Q<1>")),o=r.a;q.n();){n=p.gt()
if(n.b===B.F)continue
n=n.a
m=b.C(0,n.a+"#"+n.f)
if(m==null){B.a.i(c,new A.al(B.aN,o,"reads "+n.j(0)+" but no pass writes that version"))
continue}if(B.a.f4(a,m)>s)B.a.i(c,new A.al(B.aN,o,"reads "+n.j(0)+" before writer "+m.a+" runs"))}}},
dV(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r){q=a[r]
for(p=q.gaM(),o=J.ac(p.a),p=new A.Q(o,p.b,p.$ti.h("Q<1>")),n=q.a;p.n();){m=o.gt()
if(m.b===B.F)continue
for(l=q.gb4(),k=J.ac(l.a),l=new A.Q(k,l.b,l.$ti.h("Q<1>")),m=m.a,j=m.a,i=m.f;l.n();){h=k.gt().a
if(j===h.a&&i===h.f)B.a.i(b,new A.al(B.cj,n,"reads and writes "+m.j(0)+" at the same version; declare a ping-pong version bump"))}}}},
dQ(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r){q=a[r]
for(p=q.gaM(),o=J.ac(p.a),p=new A.Q(o,p.b,p.$ti.h("Q<1>")),n=q.a;p.n();){m=o.gt()
if(m.b===B.F)continue
l=m.a
k=b.C(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gb4().f2(0,new A.j8(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.a.i(c,new A.al(B.ci,n,"reads "+l.j(0)+" but writer "+k.a+" produced "+j.j(0)))}}},
dP(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.aC(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gb4(),o=J.ac(p.a),p=new A.Q(o,p.b,p.$ti.h("Q<1>"));p.n();){n=o.gt().a
r.K(0,n.a+"#"+n.f,q)}m=J.ih(p,t.cJ)
for(l=0;l<p;++l)m[l]=A.ax(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gaM(),p=J.ac(s.a),s=new A.Q(p,s.b,s.$ti.h("Q<1>"));s.n();){o=p.gt()
if(o.b===B.F)continue
o=o.a
k=r.C(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.d(m,k)
m[k].i(0,q)}}p=t.y
j=A.du(s,!1,!1,p)
s=a.length
i=A.du(s,!1,!1,p)
h=new A.j7(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.d(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.d(a,q)
B.a.i(b,new A.al(B.cl,a[q].a,"participates in a resource dependency cycle"))}}}}
A.jb.prototype={
$1(a){t.z.a(a)
return A.lv()},
$S:4}
A.ja.prototype={
$1(a){t.z.a(a)
return A.lv()},
$S:4}
A.j9.prototype={
$1(a){return t.z.a(a).f},
$S:4}
A.j8.prototype={
$1(a){var s=t.L.a(a).a,r=this.a.a
return s.a===r.a&&s.f===r.f},
$S:10}
A.j7.prototype={
$1(a){var s,r,q,p,o=this,n=o.a
if(!(a>=0&&a<n.length))return A.d(n,a)
if(n[a])return!0
s=o.b
if(!(a<s.length))return A.d(s,a)
if(s[a])return!1
B.a.K(n,a,!0)
r=o.c
if(!(a<r.length))return A.d(r,a)
r=r[a]
r=A.lJ(r,r.r,A.x(r).c)
q=r.$ti.c
while(r.n()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.a.K(n,a,!1)
B.a.K(s,a,!0)
return!1},
$S:33}
A.j5.prototype={}
A.bH.prototype={$iaR:1,
gN(){return this.a},
gq(){return this.b},
gaQ(){return this.c}}
A.dJ.prototype={
cV(a){var s,r,q,p=a.c
p.p()
s=this.a.aJ(a.a)
p=p.ad()
r=s.d.gaz()
q=A.H(r)
return A.cj(new A.M(r,q.h("a(1)").a(p.gaB()),q.h("M<1,a>")))},
ex(a){var s=this.cV(a),r=this.b.d0(a)
this.c.K(0,r,new A.bH(r,a,s))
return r},
fK(a,b){var s=this.cV(b)
this.b.c7(a,b)
this.c.K(0,a,new A.bH(a,b,s))},
fk(a){this.b.aN(a)
this.c.ac(0,a)},
$ioZ:1}
A.jc.prototype={
$3(a,b,c){return new A.b4(A.e(a),A.e(b),A.bv(c))},
$S:34}
A.fx.prototype={
V(a,b){var s,r
if(this.x)A.l(A.m("resource library is disposed"))
s=this.a
a.p()
r=s.b.bj(a,b)
s.c.K(0,r.a,s.cU(a))
this.f.i(0,r)
return r},
H(a){var s
if(this.x)A.l(A.m("resource library is disposed"))
a.p()
s=this.b.a.bj(a,null)
this.r.i(0,s)
return s},
aa(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
if(e.x)return
s=e.w
r=A.af(s,A.x(s).c)
q=r.length
p=e.c
o=p.c
n=p.a.a
m=t.R
l=0
for(;l<r.length;r.length===q||(0,A.C)(r),++l){k=r[l]
j=o.ac(0,k.a)
if(j!=null)n.deleteTexture(m.a(j.a).a)
p.b.aN(k)}r=e.r
q=A.af(r,A.x(r).c)
o=q.length
n=e.b.a
l=0
for(;l<q.length;q.length===o||(0,A.C)(q),++l)n.aN(q[l])
q=e.f
o=A.af(q,A.x(q).c)
n=o.length
m=e.a
i=m.c
h=m.a.a
l=0
for(;l<o.length;o.length===n||(0,A.C)(o),++l){k=o[l]
g=i.ac(0,k.a)
if(g!=null){h.deleteVertexArray(A.k(g.c.a))
h.deleteBuffer(A.k(g.a.a))
f=g.b
if(f!=null)h.deleteBuffer(A.k(f.a))}m.b.aN(k)}s.a3(0)
r.a3(0)
q.a3(0)
p.aa()
e.x=!0},
$ip0:1}
A.jK.prototype={}
A.ho.prototype={$iaR:1,
gN(){return this.a},
gq(){return this.b},
gaQ(){return this.c}}
A.km.prototype={
$1(a){var s=this.a.w.a.fm(a),r=s.b!=null,q=r?s.d:s.e
return new A.dL(s.c,r,q,s.f)},
$S:35}
A.kn.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.A(0,a))return this.b.x.gt().da(a)
if(b!=null&&s.A(0,b))return this.b.x.gt().da(b)
throw A.c(A.m("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:36}
A.kl.prototype={
$0(){return this.a.$1("shadowMap")},
$S:2}
A.ke.prototype={
$0(){return null},
$S:38}
A.kf.prototype={
$0(){var s,r=this.a.at
if(r==null)return B.ab
s=r.b
return A.qV(s.k1,3,r.a.d,null)},
$S:39}
A.kk.prototype={
$0(){return this.a.$1("sceneDepth")},
$S:2}
A.k9.prototype={
$0(){return this.a.at.a},
$S:40}
A.kb.prototype={
$0(){return this.a.$2$fallback("ssaoRaw","sceneColor")},
$S:2}
A.ka.prototype={
$0(){return this.a.$2$fallback("ssaoBlurred","sceneColor")},
$S:2}
A.kj.prototype={
$0(){var s=this.b.d>1?"sceneColor#1":"sceneColor"
return this.a.$1(s)},
$S:2}
A.k7.prototype={
$0(){return this.a.$2$fallback("bloomBlurH","sceneColor")},
$S:2}
A.k8.prototype={
$0(){return this.a.$2$fallback("bloomBlurV","sceneColor")},
$S:2}
A.kg.prototype={
$0(){return this.a.$2$fallback("dofBlurH","sceneColor")},
$S:2}
A.kh.prototype={
$0(){return this.a.$2$fallback("dofBlurV","sceneColor")},
$S:2}
A.ki.prototype={
$0(){var s=this.a.w.c.d
s===$&&A.G()
return s},
$S:2}
A.kd.prototype={
$0(){return this.a.$2$fallback("vhsOutput","sceneColor")},
$S:2}
A.kc.prototype={
$0(){return this.a.at.w},
$S:41}
A.ko.prototype={
$0(){return this.a},
$S:42}
A.kp.prototype={
$0(){return null},
$S:43}
A.jZ.prototype={}
A.hd.prototype={$ioY:1}
A.h5.prototype={$ioc:1}
A.fz.prototype={
gu(){var s=this.w
return s==null?A.l(A.m("renderer is not initialized")):s},
f5(a,b){var s,r,q,p,o,n,m,l=this
if(l.e!==B.af)throw A.c(A.m("renderer can only be initialized once"))
a.p()
b.p()
s=l.a
if(s.b===B.X)throw A.c(A.m("renderer device is context lost"))
l.e=B.ev
try{r=v.G
s.aV(A.e(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.aV(A.e(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.aV(A.e(r.WebGL2RenderingContext.MAX_SAMPLES))
s.aV(A.e(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.aV(A.e(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
if(s.aF("EXT_texture_filter_anisotropic"))s.cD(34047)
q=s.aF("EXT_disjoint_timer_query_webgl2")
s.w=q
s.aF("EXT_color_buffer_float")
s.aF("EXT_color_buffer_half_float")
s.aF("WEBGL_lose_context")
p=s.a
A.cY(p.getParameter(A.e(r.WebGL2RenderingContext.RENDERER)))
A.cY(p.getParameter(A.e(r.WebGL2RenderingContext.VENDOR)))
l.r=new A.j3(q)
r=l.b
if(r.d)A.l(A.m("configuration coordinator is disposed"))
o=A.iA(a)
q=r.a
if(q.e)A.l(A.m("configuration state is disposed"))
if(q.a!=null)A.l(A.m("configuration state is already initialized"))
a.p()
q.a=a
A.iA(a)
q.d=1
r.b.d6(o)
r=A.oq()
l.w=new A.fx(A.os(s),r,A.p6(s),A.ax(t.cA),A.ax(t.eL),A.ax(t.aj))
r=new A.dN()
q=new A.ib(s,r)
o=A.iA(a)
n=q.cu(o,a)
r.d6(o)
q.c=new A.fs(new A.iS(o),n)
l.x=q
l.y=new A.j_(s,A.aC(t.N,t.dN))
l.as=a
A.nm(l)
l.e=B.ag}catch(m){s=l.y
if(s!=null){r=s.b
s.e3(new A.aZ(r,A.x(r).h("aZ<2>")))
r.a3(0)}s=l.x
if(s!=null)s.aa()
s=l.w
if(s!=null)s.aa()
l.w=null
l.b.aa()
l.b=new A.eK(new A.eL(),new A.dN())
l.e=B.af
throw m}s=new A.a1($.U,t.cd)
s.bz(null)
return s},
eB(a,b){var s,r,q,p,o=this
o.ei()
o.b9()
r=B.a.A(o.d,a)
if(!r)throw A.c(A.i("world was not created by this renderer",null))
if(o.at!=null)throw A.c(A.m("renderer.beginFrame called twice without end/abort"))
b.a.p()
b.b.p()
b.c.p()
r=b.w
if(!isFinite(r))A.l(A.i("FrameInput.timeSeconds must be finite: "+A.o(r),null))
o.at=b
o.ax=a
q=o.c
if(q.b===B.R)A.l(A.m("FrameQueue.beginFrame called twice without end/abort"))
q.b=B.R
q.c=0
B.a.a3(q.a)
s=q
try{r=o.r
if((r==null?A.l(A.m("renderer is not initialized")):r).z)o.b$=o.a.eC()
return s}catch(p){if(q.b!==B.R)A.l(A.m("FrameQueue.abortFrame called without an active frame"))
q.c=0
q.b=B.c2
o.cl()
o.ax=o.at=null
throw p}},
eU(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
d.b9()
s=d.at
r=d.ax
if(s==null||r==null)throw A.c(A.m("renderer.endFrame called without an active frame"))
m=d.c
if(m.b!==B.R)A.l(A.m("FrameQueue.endFrame called without an active frame"))
l=m.a
k=A.jl(l,0,A.cc(m.c,"count",t.S),A.H(l).c).dj(0,!1)
m.b=B.c1
q=k
try{p=A.pS(d,r,s,q)
o=p.a.dv()
m=o.gaY()
l=A.x(m)
n=new A.dv(new A.ab(m,l.h("y(n.E)").a(new A.je()),l.h("ab<n.E>")),l.h("a_(n.E)").a(new A.jf()),l.h("dv<n.E,a_>")).bW(0,B.c_,new A.jg(),t.o)
l=s.e
m=n.a
j=n.b
i=p.c
h=n.d
p.toString
g=d.w
f=g.a.gb2()
g=g.c.gb2()
e=d.w
e.a.gb2()
e.c.gb2()
d.w.toString
return new A.i5(l,m,j,i,h,f+g)}finally{d.ec(s.e)
d.ax=d.at=null}},
ei(){var s,r,q,p=this
if(p.e!==B.ah)return
if(p.a.b===B.X)throw A.c(A.m("renderer context remains lost"))
s=p.w
if(s.x)A.l(A.m("resource library is disposed"))
s.a.c4()
s.c.c4()
s=p.x
s.toString
r=p.as
r.toString
if(s.e)A.l(A.m("GPU resource adapter is disposed"))
q=s.c
if(q==null)A.l(A.m("GPU resource adapter is not initialized"))
s.c=new A.fs(q.a,s.cu(A.iA(r),r))
s=p.y
s.c=null
s.b.a3(0)
A.nm(p)
p.e=B.ag},
b9(){var s=this,r=s.e
if(r!==B.ag)throw A.c(A.m("renderer is not ready: "+r.b))
if(s.a.b===B.X){s.e5()
s.e=B.ah
throw A.c(A.m("renderer context lost"))}},
$ip2:1}
A.je.prototype={
$1(a){t.ao.a(a)
return A.qZ(a.a.toLowerCase(),"world",0)},
$S:44}
A.jf.prototype={
$1(a){return t.ao.a(a).b},
$S:45}
A.jg.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return new A.a_(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:46}
A.hc.prototype={}
A.jV.prototype={
ec(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.i)A.l(A.m(u.k))
r=s.cQ(o)
if(r.b)A.l(A.m("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.a.i(p.a$,new A.hc(o))}catch(q){p.bF(o)}},
cl(){var s=this.b$
this.b$=null
if(s!=null)this.bF(s)},
e5(){var s,r,q
this.cl()
s=this.a$
r=J.lo(s.slice(0),A.H(s).c)
B.a.a3(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.C)(r),++q)this.bF(r[q].b)},
bF(a){var s,r
try{s=this.a
s.a.deleteQuery(s.cQ(a).a)}catch(r){}}}
A.hh.prototype={}
A.fB.prototype={
D(){return"ShadowCasterLod."+this.b}}
A.ay.prototype={
S(a,b){var s,r=this
t.fY.a(b)
s=B.e.S(r.a.a,b.a.a)
if(s!==0)return s
s=B.e.S(r.b.a,b.b.a)
if(s!==0)return s
s=B.e.S(r.c.a,b.c.a)
if(s!==0)return s
return B.e.S(r.d,b.d)},
$iar:1}
A.av.prototype={
S(a,b){var s
t.g0.a(b)
s=B.b.S(b.a,this.a)
if(s!==0)return s
return B.e.S(this.b,b.b)},
$iar:1}
A.a3.prototype={}
A.lg.prototype={
$2(a,b){var s=t.k
return s.a(a).a.S(0,s.a(b).a)},
$S:47}
A.lh.prototype={
$1(a){return t.k.a(a).b},
$S:48}
A.le.prototype={
$2(a,b){var s=t.d
return s.a(a).a.S(0,s.a(b).a)},
$S:49}
A.lf.prototype={
$1(a){return t.d.a(a).b},
$S:50}
A.hS.prototype={}
A.hR.prototype={}
A.iT.prototype={
$6(a,b,c,d,e,f){var s=this.a,r=s.a.length/18|0,q=this.b
s.L(a,e,f,new A.B(0,0).k(0,q))
s.L(b,e,f,new A.B(1,0).k(0,q))
s.L(c,e,f,new A.B(1,1).k(0,q))
s.L(d,e,f,new A.B(0,1).k(0,q))
q=r+2
B.a.G(s.b,A.b([r,r+1,q,r,q,r+3],t.t))},
$S:15}
A.iV.prototype={
$1(a){return t.a.a(a).gm()},
$S:11}
A.iW.prototype={
$2(a,b){var s,r,q,p,o,n=(Math.min(a,b)<<16|Math.max(a,b))>>>0,m=this.a,l=m.C(0,n)
if(l!=null)return l
s=this.b
r=s.length
if(!(a>=0&&a<r))return A.d(s,a)
q=s[a]
if(!(b>=0&&b<r))return A.d(s,b)
p=q.v(0,s[b]).k(0,0.5).gm()
o=s.length
B.a.i(s,p)
m.K(0,n,o)
return o},
$S:53}
A.iU.prototype={
$1(a){return t.a.a(a).gm().k(0,this.a)},
$S:11}
A.iY.prototype={
$6(a,b,c,d,e,f){var s,r=this.a,q=r.a.length/18|0
r.L(a,e,f,B.ax)
r.L(b,e,f,B.az)
r.L(c,e,f,B.ft)
r.L(d,e,f,B.fs)
s=q+2
B.a.G(r.b,A.b([q,q+1,s,q,s,q+3],t.t))},
$S:15}
A.iX.prototype={
$5(b4,b5,b6,b7,b8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3=b5.P(0,b4).R(b7.P(0,b6)).aA(b6.v(0,b7).gm())<0
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
r.L(new A.a(h+a4,g+a5,f+a8),a6,b8,new A.B(0,a0))
r.L(new A.a(e+a4,d+a5,c+a8),a6,b8,new A.B(1,a0))
r.L(new A.a(e+a9,d+b0,c+b1),a7,b8,new A.B(1,a1))
r.L(new A.a(h+a9,g+b0,f+b1),a7,b8,new A.B(0,a1))
a1=b2+3
a4=b2+2
a5=b2+1
if(b3)B.a.G(q,A.b([b2,a1,a4,b2,a4,a5],p))
else B.a.G(q,A.b([b2,a5,a4,b2,a4,a1],p))}},
$S:54}
A.aA.prototype={
L(a,b,c,d){B.a.G(this.a,A.b([a.a,a.b,a.c,b.a,b.b,b.c,c.a,c.b,c.c,1,1,1,1,0,1,d.a,d.b,0],t.n))},
a9(a){var s=new A.b7(B.a3,new Float32Array(A.t(this.a)),new Uint16Array(A.t(this.b)),a)
s.p()
return s}}
A.iZ.prototype={
$2(a,b){var s=this.a,r=B.e.F(a+s,s),q=this.b,p=this.c
s=B.e.F(b+q,q)*s+r
if(!(s>=0&&s<65536))return A.d(p,s)
return p[s]/255},
$S:55}
A.jo.prototype={
dH(a){var s,r,q,p,o,n=new Uint8Array(512)
this.b!==$&&A.d1()
this.b=n
s=J.ih(256,t.S)
for(r=0;r<256;++r)s[r]=r
q=new A.c7()
q.b7(this.a)
for(r=255;r>0;--r){p=q.br(r+1)
o=s[r]
if(!(p>=0&&p<256))return A.d(s,p)
s[r]=s[p]
s[p]=o}for(r=0;r<512;++r)n[r]=s[r&255]},
d2(a,b){var s,r,q,p,o,n,m,l=B.b.ab(a)&255,k=B.b.ab(b)&255,j=a-B.b.ab(a),i=b-B.b.ab(b),h=A.mV(j),g=A.mV(i),f=this.b
f===$&&A.G()
s=f[l]+k
if(!(s<512))return A.d(f,s)
r=f[s];++s
if(!(s<512))return A.d(f,s)
q=f[s]
s=f[l+1]+k
if(!(s<512))return A.d(f,s)
p=f[s];++s
if(!(s<512))return A.d(f,s)
o=f[s]
s=A.jp(r,j,i)
f=j-1
n=s+h*(A.jp(p,f,i)-s)
s=i-1
m=A.jp(q,j,s)
return B.b.l((n+g*(m+h*(A.jp(o,f,s)-m)-n))*0.45,-1,1)},
eY(a,b,c,d){var s,r,q,p,o
for(s=c,r=0,q=1,p=0,o=0;o<d;++o){r+=(this.d2(a*s,b*s)*0.5+0.5)*q
p+=q
q*=0.5
s*=2}return p>0?r/p:0},
fC(a,b,c,d){var s,r,q,p,o,n
for(s=c,r=0,q=1,p=0,o=0;o<d;++o){n=1-Math.abs(this.d2(a*s,b*s))
r+=n*n*q
p+=q
q*=0.5
s*=2}return p>0?r/p:0}}
A.jn.prototype={
aE(a,b){var s=this,r=1-B.b.l(Math.sqrt(a*a+b*b)/s.r,0,1),q=s.w
return s.f+(q.eY(a*0.08,b*0.08,1,4)*0.65+q.fC(a*0.12,b*0.12,1,4)*0.35)*s.e*(r*r*(3-2*r))},
c9(a,b){var s=this,r=s.aE(a-0.05,b),q=s.aE(a+0.05,b),p=s.aE(a,b-0.05),o=-(q-r),n=-(s.aE(a,b+0.05)-p),m=Math.sqrt(o*o+0.010000000000000002+n*n)
return m>0.000001?new A.a(o/m,0.1/m,n/m):B.d},
dq(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=this,a5=t.n,a6=A.b([],a5),a7=t.t,a8=A.b([],a7),a9=a4.a,b0=a4.c,b1=a9/b0,b2=a4.b,b3=a4.d,b4=b2/b3,b5=new A.a(1/0,1/0,1/0),b6=new A.a(-1/0,-1/0,-1/0)
for(a9=-(a9*0.5),b2=-(b2*0.5),s=0;s<=b3;++s){r=b2+s*b4
q=s/b3
for(p=0;p<=b0;++p){o=a9+p*b1
n=a4.aE(o,r)
m=a4.c9(o,r)
l=m.a
k=Math.abs(l)>0.85?B.p:B.k
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
B.a.G(a6,A.b([o,n,r,l,h,f,d.a,d.b,d.c,1,1,1,1,1,0,p/b0,q,0],a5))}}c=b0+1
for(s=0;s<b3;){b=s*c;++s
a=s*c
for(p=0;p<b0;++p){a0=b+p
a1=a+p
a2=a1+1
B.a.G(a8,A.b([a0,a1,a2,a0,a2,a0+1],a7))}}a3=new A.b7(B.a3,new Float32Array(A.t(a6)),new Uint16Array(A.t(a8)),new A.a5(b5,b6))
a3.p()
return a3},
dn(a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b=a3*a2*4,a=new Uint8Array(b),a0=c.a,a1=c.b
for(s=c.e*0.7,r=-(a0*0.5),q=-(a1*0.5),p=0,o=0;o<a2;++o){n=q+o/a2*a1
for(m=0;m<a3;++m){l=r+m/a3*a0
k=c.aE(l,n)
j=Math.acos(B.b.l(c.c9(l,n).b,0,1))
if(k<0.05){i=0.76
h=0.69
g=0.5}else if(j>0.42){i=0.38
h=0.36
g=0.35}else if(k>s){i=0.92
h=0.94
g=0.96}else{f=B.b.l(k/s,0,1)
i=0.2+f*0.12
h=0.46-f*0.06
g=0.18+f*0.08}e=B.e.l(B.b.I(i*255),0,255)
if(!(p>=0&&p<b))return A.d(a,p)
a[p]=e
e=p+1
d=B.e.l(B.b.I(h*255),0,255)
if(!(e<b))return A.d(a,e)
a[e]=d
d=p+2
e=B.e.l(B.b.I(g*255),0,255)
if(!(d<b))return A.d(a,d)
a[d]=e
e=p+3
if(!(e<b))return A.d(a,e)
a[e]=255
p+=4}}return a}}
A.jy.prototype={
dN(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=b0.c,b2=b1+1,b3=b0.d
b0.x!==$&&A.d1()
s=b0.x=b2*(b3+1)
r=new Float32Array(s)
b0.r!==$&&A.d1()
b0.r=r
q=new Float32Array(s)
b0.w!==$&&A.d1()
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
if(!(e>=0&&e<s))return A.d(r,e)
r[e]=a1
q[e]=b;++e
if(!(d>=0&&d<p))return A.d(o,d)
o[d]=a1
a2=d+1
if(!(a2<p))return A.d(o,a2)
o[a2]=j
a2=d+2
if(!(a2<p))return A.d(o,a2)
o[a2]=b
a2=d+3
if(!(a2<p))return A.d(o,a2)
o[a2]=0
a2=d+4
if(!(a2<p))return A.d(o,a2)
o[a2]=1
a2=d+5
if(!(a2<p))return A.d(o,a2)
o[a2]=0
a2=d+6
if(!(a2<p))return A.d(o,a2)
o[a2]=1
a2=d+7
if(!(a2<p))return A.d(o,a2)
o[a2]=0
a2=d+8
if(!(a2<p))return A.d(o,a2)
o[a2]=0
a2=d+9
if(!(a2<p))return A.d(o,a2)
o[a2]=1
a2=d+10
if(!(a2<p))return A.d(o,a2)
o[a2]=1
a2=d+11
if(!(a2<p))return A.d(o,a2)
o[a2]=1
a2=d+12
if(!(a2<p))return A.d(o,a2)
o[a2]=1
a2=d+13
if(!(a2<p))return A.d(o,a2)
o[a2]=1
a2=d+14
if(!(a2<p))return A.d(o,a2)
o[a2]=0
a2=d+15
if(!(a2<p))return A.d(o,a2)
o[a2]=a0/b1
a2=d+16
if(!(a2<p))return A.d(o,a2)
o[a2]=a
a2=d+17
if(!(a2<p))return A.d(o,a2)
o[a2]=0
d+=18}}for(a3=0,c=0;c<b3;){a4=c*b2;++c
a5=c*b2
for(a0=0;a0<b1;++a0){a6=a4+a0
a7=a5+a0
a8=a7+1
a9=a3+1
if(!(a3>=0&&a3<n))return A.d(m,a3)
m[a3]=a6
a3=a9+1
if(!(a9>=0&&a9<n))return A.d(m,a9)
m[a9]=a7
a9=a3+1
if(!(a3>=0&&a3<n))return A.d(m,a3)
m[a3]=a8
a3=a9+1
if(!(a9>=0&&a9<n))return A.d(m,a9)
m[a9]=a6
a9=a3+1
if(!(a3>=0&&a3<n))return A.d(m,a3)
m[a3]=a8
a3=a9+1
if(!(a9>=0&&a9<n))return A.d(m,a9)
m[a9]=a6+1}}b1=new A.b7(B.a3,o,m,new A.a5(new A.a(l-2,j-4,f-2),new A.a(h+2,j+4,g+2)))
b0.f!==$&&A.d1()
b0.f=b1
b1.p()},
fL(a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6=this,a7=a6.f
a7===$&&A.G()
s=a7.b
r=a6.e
q=r
p=q
o=0
n=0
for(;;){a7=a6.x
a7===$&&A.G()
if(!(n<a7))break
a7=a6.r
a7===$&&A.G()
if(!(n<a7.length))return A.d(a7,n)
m=a7[n]
a7=a6.w
a7===$&&A.G()
if(!(n<a7.length))return A.d(a7,n)
l=a7[n]
k=a9.c8(m,l,a8)
a7=k.b
j=r+a7
if(j<p)p=j
if(j>q)q=j
i=a9.ca(m,l,a8)
h=i.a
if(Math.abs(h)>0.85){g=0
f=1}else{g=1
f=0}e=i.b
d=i.c
c=g*h+0*e+f*d
b=g-h*c
a=0-e*c
a0=f-d*c
a1=Math.sqrt(b*b+a*a+a0*a0)
if(a1>0.000001){b/=a1
a/=a1
a0/=a1}else{b=1
a=0
a0=0}s.$flags&2&&A.be(s)
a2=s.length
if(!(o<a2))return A.d(s,o)
s[o]=m+k.a
a3=o+1
if(!(a3<a2))return A.d(s,a3)
s[a3]=j
a3=o+2
if(!(a3<a2))return A.d(s,a3)
s[a3]=l+k.c
a3=o+3
if(!(a3<a2))return A.d(s,a3)
s[a3]=h
h=o+4
if(!(h<a2))return A.d(s,h)
s[h]=e
e=o+5
if(!(e<a2))return A.d(s,e)
s[e]=d
d=o+6
if(!(d<a2))return A.d(s,d)
s[d]=b
d=o+7
if(!(d<a2))return A.d(s,d)
s[d]=a
d=o+8
if(!(d<a2))return A.d(s,d)
s[d]=a0
a4=B.b.l((a7-0.15)*1.8,0,1)
a5=a4*a4
a7=o+10
s.$flags&2&&A.be(s)
if(!(a7<a2))return A.d(s,a7)
s[a7]=0.35+0.65*a5
a7=o+11
if(!(a7<a2))return A.d(s,a7)
s[a7]=0.65+0.35*a5
a7=o+12
if(!(a7<a2))return A.d(s,a7)
s[a7]=0.9+0.1*a5
a7=o+13
if(!(a7<a2))return A.d(s,a7)
s[a7]=1
o+=18;++n}}}
A.a5.prototype={
gaz(){var s,r,q,p=this.a,o=p.a,n=p.b
p=p.c
s=this.b
r=s.a
q=s.b
s=s.c
return A.b([new A.a(o,n,p),new A.a(r,n,p),new A.a(o,q,p),new A.a(r,q,p),new A.a(o,n,s),new A.a(r,n,s),new A.a(o,q,s),new A.a(r,q,s)],t.G)},
j(a){return"Aabb("+this.a.j(0)+", "+this.b.j(0)+")"}}
A.e0.prototype={$io5:1}
A.bX.prototype={}
A.di.prototype={
D(){return"FrustumTest."+this.b}}
A.i6.prototype={
dh(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
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
if(h*f+e*c+i*a+a0<0)return B.a6
g=g?o:r
f=d?m:p
d=b?n:q
if(h*g+e*f+i*d+a0<0)l=!0}return l?B.c3:B.c4}}
A.i7.prototype={
$4(a,b,c,d){var s=new A.a(a,b,c),r=new A.bX(s,d),q=Math.sqrt(s.gO())
return q<1e-9?r:new A.bX(s.k(0,1/q),d/q)},
$S:56}
A.bl.prototype={
k(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=new Float32Array(16)
for(s=this.a,r=s.length,q=b.a,p=q.length,o=0;o<4;++o)for(n=o*4,m=0;m<4;++m){for(l=0,k=0;k<4;++k){j=k*4+m
if(!(j<r))return A.d(s,j)
j=s[j]
i=n+k
if(!(i<p))return A.d(q,i)
l+=j*q[i]}j=n+m
if(!(j<16))return A.d(h,j)
h[j]=l}return new A.bl(h)},
ai(a){var s,r,q,p,o,n,m,l,k,j,i,h
t.a.a(a)
s=a.a
r=this.a
q=r.length
if(0>=q)return A.d(r,0)
p=r[0]
o=a.b
if(4>=q)return A.d(r,4)
n=r[4]
m=a.c
if(8>=q)return A.d(r,8)
l=r[8]
if(12>=q)return A.d(r,12)
k=s*p+o*n+m*l+r[12]
l=r[1]
n=r[5]
p=r[9]
if(13>=q)return A.d(r,13)
j=s*l+o*n+m*p+r[13]
p=r[2]
n=r[6]
l=r[10]
if(14>=q)return A.d(r,14)
i=s*p+o*n+m*l+r[14]
l=r[3]
n=r[7]
p=r[11]
if(15>=q)return A.d(r,15)
h=s*l+o*n+m*p+r[15]
return h===0||h===1?new A.a(k,j,i):new A.a(k/h,j/h,i/h)},
c2(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this.a,d=e.length
if(0>=d)return A.d(e,0)
s=e[0]
if(5>=d)return A.d(e,5)
r=e[5]
if(10>=d)return A.d(e,10)
d=e[10]
q=e[9]
p=e[6]
o=r*d-q*p
n=e[4]
m=e[1]
l=e[2]
k=s*o-n*(m*d-q*l)+e[8]*(m*p-r*l)
if(!isFinite(k)||Math.abs(k)<1e-12)A.l(A.m("Mat4.inverse3x3: singular upper-left 3x3 (det="+A.o(k)+")"))
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
if(!(s<16))return A.d(i,s)
s=i[s]
if(!(d<16))return A.d(h,d)
h[d]=s}if(15>=16)return A.d(h,15)
h[15]=1
return new A.bl(h)},
c0(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=J.ih(4,t.gN)
for(s=t.n,r=this.a,q=r.length,p=0;p<4;++p){if(!(p<q))return A.d(r,p)
o=r[p]
n=4+p
if(!(n<q))return A.d(r,n)
n=r[n]
m=8+p
if(!(m<q))return A.d(r,m)
m=r[m]
l=12+p
if(!(l<q))return A.d(r,l)
l=r[l]
k=p===0?1:0
j=p===1?1:0
i=p===2?1:0
a1[p]=new Float64Array(A.t(A.b([o,n,m,l,k,j,i,p===3?1:0],s)))}for(h=0;h<4;h=p){s=a1[h]
if(!(h<s.length))return A.d(s,h)
g=Math.abs(s[h])
for(p=h+1,f=p,e=h;f<4;++f){r=a1[f]
if(!(h<r.length))return A.d(r,h)
d=Math.abs(r[h])
if(d>g){g=d
e=f}}if(!isFinite(g)||g<1e-12)throw A.c(A.m("Mat4.inverse: singular matrix"))
if(e!==h){if(!(e>=0&&e<4))return A.d(a1,e)
a1[h]=a1[e]
a1[e]=s}s=a1[h]
if(!(h<s.length))return A.d(s,h)
c=s[h]
for(b=0;b<8;++b){if(!(b<s.length))return A.d(s,b)
r=s[b]
s.$flags&2&&A.be(s)
s[b]=r/c}for(f=0;f<4;++f){if(f===h)continue
s=a1[f]
if(!(h<s.length))return A.d(s,h)
a=s[h]
if(a===0)continue
for(b=0;b<8;++b){if(!(b<s.length))return A.d(s,b)
r=s[b]
q=a1[h]
if(!(b<q.length))return A.d(q,b)
q=q[b]
s.$flags&2&&A.be(s)
s[b]=r-a*q}}}a0=new Float32Array(16)
for(p=0;p<4;++p)for(h=0;h<4;++h){s=h*4+p
r=a1[p]
q=4+h
if(!(q<r.length))return A.d(r,q)
q=r[q]
if(!(s<16))return A.d(a0,s)
a0[s]=q}return new A.bl(a0)},
gE(a){return B.ad.bk(this.a,new A.ip())},
j(a){return"Mat4("+A.o(this.a)+")"}}
A.ip.prototype={
$1(a){return isFinite(A.ep(a))},
$S:16}
A.bZ.prototype={
k(a,b){var s=this,r=s.d,q=b.a,p=s.a,o=b.d,n=s.b,m=b.c,l=s.c,k=b.b
return new A.bZ(r*q+p*o+n*m-l*k,r*k-p*m+n*o+l*q,r*m+p*k-n*q+l*o,r*o-p*q-n*k-l*m)},
gm(){var s=this,r=s.a,q=s.b,p=s.c,o=s.d,n=Math.sqrt(r*r+q*q+p*p+o*o)
return n<1e-9?B.o:new A.bZ(r/n,q/n,p/n,o/n)},
af(a){var s=this,r=new A.a(s.a,s.b,s.c),q=r.R(a),p=r.R(q)
return a.v(0,q.k(0,2*s.d)).v(0,p.k(0,2))},
j(a){var s=this
return"Quat("+A.o(s.a)+", "+A.o(s.b)+", "+A.o(s.c)+", "+A.o(s.d)+")"}}
A.j1.prototype={
fb(a){var s,r,q,p,o,n,m,l,k=null,j=this.b,i=j.a
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
A.j2.prototype={
j(a){var s=this,r=s.f,q=r!=null?", instance: #"+A.o(r):""
return'RaycastHit(node: "'+s.a.a+'"'+q+", distance: "+B.b.a6(s.d,2)+", point: "+s.b.j(0)+")"}}
A.hK.prototype={
au(a){var s,r,q,p=this,o=B.b.F(B.b.F(a,1)+1,1),n=p.a,m=n.length
if(m===2){if(0>=m)return A.d(n,0)
s=n[0]
if(1>=m)return A.d(n,1)
return A.lB(s,n[1],o)}r=o*m
q=Math.min(B.b.ab(r),m-1)
return p.e9(p.ba(q-1),p.ba(q),p.ba(q+1),p.ba(q+2),r-q)},
ba(a){var s=this.a,r=s.length
s=s[B.e.F(B.e.F(a,r)+r,r)]
return s},
e9(a,b,c,d,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=new A.hL(),e=f.$2(a,b)
if(typeof e!=="number")return A.bd(e)
s=0+e
e=f.$2(b,c)
if(typeof e!=="number")return A.bd(e)
e=s+e
f=f.$2(c,d)
if(typeof f!=="number")return A.bd(f)
r=e+f
f=e-s
q=s+a0*f
p=a.k(0,(s-q)/s).v(0,b.k(0,q/s))
o=e-q
n=o/f
m=q-s
f=m/f
l=b.k(0,n).v(0,c.k(0,f))
k=r-q
j=r-e
i=c.k(0,k/j).v(0,d.k(0,(q-e)/j))
h=p.k(0,o/e).v(0,l.k(0,q/e))
s=r-s
g=l.k(0,k/s).v(0,i.k(0,m/s))
return h.k(0,n).v(0,g.k(0,f))},
dZ(){var s,r,q,p,o,n,m,l=this.c
B.a.a3(l)
B.a.i(l,0)
s=this.au(0)
for(r=0,q=1;q<=200;++q,s=p){p=this.au(q/200)
o=p.a-s.a
n=p.b-s.b
m=p.c-s.c
r+=Math.sqrt(o*o+n*n+m*m)
B.a.i(l,r)}}}
A.hL.prototype={
$2(a,b){return Math.pow(Math.max(0.0001,Math.sqrt(b.P(0,a).gO())),0.5)},
$S:57}
A.O.prototype={
p(){var s=this.a
if(!s.gE(0))throw A.c(A.i("Transform.translation must be finite: "+s.j(0),null))
s=this.b
if(!(isFinite(s.a)&&isFinite(s.b)&&isFinite(s.c)&&isFinite(s.d)))throw A.c(A.i("Transform.rotation must be finite: "+s.j(0),null))
s=this.c
if(!isFinite(s)||s<=0)throw A.c(A.i("Transform.scale must be finite and positive: "+A.o(s),null))},
ad(){var s,r,q,p,o,n,m,l,k,j,i,h=this.b,g=h.a,f=g*g,e=h.b,d=e*e,c=h.c,b=c*c,a=g*e,a0=g*c,a1=e*c
h=h.d
s=h*g
r=h*e
q=h*c
c=t.n
h=A.my(A.b([1-2*(d+b),2*(a+q),2*(a0-r),0,2*(a-q),1-2*(f+b),2*(a1+s),0,2*(a0+r),2*(a1-s),1-2*(f+d),0,0,0,0,1],c)).a
e=h.length
if(0>=e)return A.d(h,0)
g=h[0]
p=this.c
if(1>=e)return A.d(h,1)
o=h[1]
if(2>=e)return A.d(h,2)
n=h[2]
if(4>=e)return A.d(h,4)
m=h[4]
if(5>=e)return A.d(h,5)
l=h[5]
if(6>=e)return A.d(h,6)
k=h[6]
if(8>=e)return A.d(h,8)
j=h[8]
if(9>=e)return A.d(h,9)
i=h[9]
if(10>=e)return A.d(h,10)
e=this.a
return A.my(A.b([g*p,o*p,n*p,0,m*p,l*p,k*p,0,j*p,i*p,h[10]*p,0,e.a,e.b,e.c,1],c))},
ai(a){return this.a.v(0,this.b.af(a.k(0,this.c)))},
k(a,b){var s=this.b,r=this.c
return new A.O(this.a.v(0,s.af(b.a.k(0,r))),s.k(0,b.b).gm(),r*b.c)},
j(a){return"Transform("+this.a.j(0)+", "+this.b.j(0)+", scale="+A.o(this.c)+")"}}
A.B.prototype={
k(a,b){return new A.B(this.a*b,this.b*b)},
gO(){var s=this.a,r=this.b
return s*s+r*r},
gB(a){return Math.sqrt(this.gO())},
a8(a,b){if(b==null)return!1
return b instanceof A.B&&this.a===b.a&&this.b===b.b},
gU(a){return A.bW(this.a,this.b,B.m,B.m,B.m,B.m)},
j(a){return"Vec2("+A.o(this.a)+", "+A.o(this.b)+")"}}
A.a.prototype={
v(a,b){return new A.a(this.a+b.a,this.b+b.b,this.c+b.c)},
P(a,b){return new A.a(this.a-b.a,this.b-b.b,this.c-b.c)},
an(a){return new A.a(-this.a,-this.b,-this.c)},
k(a,b){return new A.a(this.a*b,this.b*b,this.c*b)},
aA(a){return this.a*a.a+this.b*a.b+this.c*a.c},
R(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.a(s*r-q*p,q*o-n*r,n*p-s*o)},
gO(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gB(a){return Math.sqrt(this.gO())},
gE(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gm(){var s=this,r=Math.sqrt(s.gO())
return r<1e-9?B.f:new A.a(s.a/r,s.b/r,s.c/r)},
a8(a,b){if(b==null)return!1
return b instanceof A.a&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gU(a){return A.bW(this.a,this.b,this.c,B.m,B.m,B.m)},
j(a){return"Vec3("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.hH.prototype={
dr(){var s=this.b*0.5,r=this.c*0.5,q=new A.hI(this,Math.cos(0),Math.sin(0)),p=-s,o=-r
return A.b([q.$2(p,r),q.$2(s,r),q.$2(p,o),q.$2(s,o)],t.G)},
fJ(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=this
if(a<=0)return g.gd_()
s=B.b.l(a,0.001,0.1)
r=g.dr()
q=r[0]
p=c.b5(q.a,q.c,b)
q=r[1]
o=c.b5(q.a,q.c,b)
q=r[2]
n=c.b5(q.a,q.c,b)
q=r[3]
m=c.b5(q.a,q.c,b)
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
g.x=B.b.l(j+h*s,-0.65,0.65)
h=g.y
j=g.Q
j+=((k-h)*14-j*6)/1*s
g.Q=j
g.y=B.b.l(h+j*s,-0.65,0.65)
return g.gd_()},
gd_(){var s=A.ai(B.d,0),r=A.ai(B.k,this.y),q=A.ai(B.p,this.x),p=s.k(0,r).k(0,q)
return new A.O(this.a,p,1)},
gB(a){return this.c}}
A.hI.prototype={
$2(a,b){var s=this.b,r=this.c,q=this.a.a
return new A.a(q.a+(a*s-b*r),q.b,q.c+(a*r+b*s))},
$S:58}
A.dj.prototype={}
A.i9.prototype={
c8(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
b5(a,b,c){var s,r,q,p,o,n,m,l,k
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
ca(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
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
if(e<0.000001)return B.d
d=1/e
return new A.a(q*d,p*d,o*d)}}
A.ey.prototype={
D(){return"AtmosphericParticleAnchor."+this.b}}
A.ck.prototype={}
A.ez.prototype={
p(){var s,r,q,p,o,n,m,l=this,k=null
if(l.a.a<0||l.b.a<0)throw A.c(A.i("AtmosphericParticleField requires live resources",k))
s=l.e
r=A.b([new A.F("origin",l.d),new A.F("halfExtents",s),new A.F("initialVelocity",l.f),new A.F("acceleration",l.r)],t.be)
r.push(new A.F("terminalVelocity",l.w))
q=r.length
p=0
for(;p<q;++p){o=r[p]
n=o.a
m=o.b
if(!(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)))throw A.c(A.i("AtmosphericParticleField."+n+" must be finite",k))}if(s.a<0||s.b<0||s.c<0)throw A.c(A.i("AtmosphericParticleField.halfExtents must be >= 0",k))
s=l.y
if(!isFinite(s)||s<=0)throw A.c(A.i("AtmosphericParticleField.lifetimeSeconds must be finite and > 0",k))
s=l.x
if(!isFinite(s)||s<0)throw A.c(A.i("AtmosphericParticleField.dragCoefficient must be finite and >= 0",k))
if(s<=0)throw A.c(A.i("AtmosphericParticleField terminalVelocity requires dragCoefficient > 0",k))
s=l.as
if(!isFinite(s)||s<=0)throw A.c(A.i("AtmosphericParticleField.particleScale must be finite and > 0",k))},
du(a,b){var s,r,q,p,o,n=this,m=null
n.p()
s=n.z
if(b>=s)throw A.c(A.aQ(b,0,s-1,"particleIndex",m))
r=n.y
q=B.b.F(a.w+n.bf(b,0)*r,r)
switch(n.c.a){case 0:s=B.f
break
case 1:s=a.a.d
break
default:s=m}p=n.e
o=s.v(0,n.d).v(0,new A.a((n.bf(b,1)*2-1)*p.a,(n.bf(b,2)*2-1)*p.b,(n.bf(b,3)*2-1)*p.c))
p=o.v(0,n.e6(q))
s=n.ew(q)
if(!isFinite(q)||q<0)A.l(A.i("atmospheric particle age must be finite and >= 0",m))
if(!o.gE(0)||!p.gE(0)||!s.gE(0))A.l(A.i("atmospheric particle kinematics must be finite",m))
return new A.ck(q,o,p,s)},
bx(a,b){return this.dB(a,b,new A.hE())},
dB(a,b,c){var s,r,q,p,o,n,m,l,k,j=this
t.d6.a(c)
j.p()
for(s=j.z,r=j.as,q=j.ay,p=j.CW,o=j.a,n=j.b,m=0,l=0;l<s;++l){k=j.du(b,l)
if(!c.$1(k))continue
a.ce(new A.b9(o,n,new A.O(k.c,B.o,r),-1,B.r,q,!1,p,null));++m}return m},
ew(a){var s=this.w,r=Math.exp(-this.x*a)
return s.v(0,this.f.P(0,s).k(0,r))},
e6(a){var s=this.w,r=this.x,q=Math.exp(-r*a)
return s.k(0,a).v(0,this.f.P(0,s).k(0,(1-q)/r))},
bf(a,b){return(((this.Q^a*73244475^b*668265261)&2147483647)*1103515245+12345&2147483647)/2147483647}}
A.hE.prototype={
$1(a){return!0},
$S:59}
A.cB.prototype={
D(){return"ParticleAlignment."+this.b}}
A.fm.prototype={
D(){return"ParticleCollisionAction."+this.b}}
A.dE.prototype={
dt(a){return 1}}
A.aO.prototype={}
A.iC.prototype={
p(){var s,r,q,p=this.a,o=p.length
if(o===0)throw A.c(A.i("ParticleColorGradient requires at least one stop",null))
for(s=0;s<o;++s){r=p[s]
q=r.a
if(!isFinite(q)||q<0||q>1)A.l(A.i("ParticleColorStop.t must be in [0, 1]",null))
q=r.b
if(!isFinite(q.a)||!isFinite(q.b)||!isFinite(q.c))A.l(A.i("ParticleColorStop.color channels must be finite",null))}}}
A.iD.prototype={
$2(a,b){var s=t.eH
return B.b.S(s.a(a).a,s.a(b).a)},
$S:60}
A.d3.prototype={
D(){return"AttractorFalloff."+this.b}}
A.cC.prototype={}
A.cL.prototype={
D(){return"SubEmitterTrigger."+this.b}}
A.bG.prototype={}
A.hb.prototype={}
A.fn.prototype={
p(){var s,r,q,p,o,n=this,m=null
if(n.a.a<0||n.b.a<0)throw A.c(A.i("ParticleEmitter requires live resources",m))
n.y.p()
n.z.p()
s=n.at
if(!isFinite(s)||s<0)throw A.c(A.i("ParticleEmitter.rate must be finite and >= 0",m))
for(s=n.ax.length,r=isFinite(1),q=isFinite(0),p=0;p<s;++p){if(!q)A.l(A.i("ParticleBurst.time must be finite and >= 0",m))
if(!r)A.l(A.i("ParticleBurst.repeatInterval must be finite and > 0",m))}if(!q)throw A.c(A.i("ParticleEmitter.duration must be finite and >= 0",m))
s=n.cy
if(!isFinite(s)||s<=0||n.db<s)throw A.c(A.i("ParticleEmitter lifetime range must be valid: "+A.o(s)+".."+A.o(n.db),m))
s=n.dx
if(!isFinite(s)||s<0||n.dy<s)throw A.c(A.i("ParticleEmitter speed range must be valid: "+A.o(s)+".."+A.o(n.dy),m))
s=n.fr
if(!isFinite(s)||s<=0||n.fx<s)throw A.c(A.i("ParticleEmitter start size range must be valid: "+A.o(s)+".."+A.o(n.fx),m))
s=n.fy
if(!isFinite(s)||s<0||n.go<s)throw A.c(A.i("ParticleEmitter end size range must be valid: "+A.o(s)+".."+A.o(n.go),m))
s=n.k1
if(!isFinite(s)||s<0||s>1)throw A.c(A.i("ParticleEmitter.fadeInFraction must be in [0, 1]",m))
r=n.k2
if(!isFinite(r)||r<0||r>1)throw A.c(A.i("ParticleEmitter.fadeOutFraction must be in [0, 1]",m))
if(s+r>1)throw A.c(A.i("ParticleEmitter fadeInFraction + fadeOutFraction must be <= 1.0",m))
if(!n.p4.gE(0)||!n.RG.gE(0))throw A.c(A.i("ParticleEmitter gravity and acceleration must be finite",m))
s=n.rx
if(!isFinite(s)||s<0)throw A.c(A.i("ParticleEmitter.dragCoefficient must be finite and >= 0",m))
if(!isFinite(n.ry)||!isFinite(n.to))throw A.c(A.i("ParticleEmitter radial and orbital accelerations must be finite",m))
s=n.x1
if(!s.gE(0)||s.gO()<0.000001)throw A.c(A.i("ParticleEmitter.orbitalAxis must be finite and non-zero",m))
s=n.x2
if(!isFinite(s)||s<0||!isFinite(n.xr)||!isFinite(n.y1))throw A.c(A.i("ParticleEmitter noise parameters must be finite",m))
for(s=n.aK,r=s.length,p=0;p<r;++p){o=s[p]
o.a.p()
if(o.c<=0)A.l(A.i("SubEmitter.count must be > 0",m))
if(!isFinite(o.e))A.l(A.i("SubEmitter.inheritVelocityFactor must be finite",m))
q=o.f
if(!isFinite(q)||q<=0)A.l(A.i("SubEmitter.trailInterval must be finite and > 0",m))
q=o.r
if(!isFinite(q)||q<0)A.l(A.i("SubEmitter.trailDistance must be finite and >= 0",m))}for(s=n.y2,r=s.length,p=0;p<s.length;s.length===r||(0,A.C)(s),++p)s[p].p()
s=n.d3
if(s!=null){if(s.a.gE(0)){r=s.b
r=!r.gE(0)||r.gO()<0.000001}else r=!0
if(r)A.l(A.i("ParticleCollisionPlane geometry must be finite and valid",m))
r=s.c
if(!isFinite(r)||r<0||r>1)A.l(A.i("ParticleCollisionPlane.restitution must be in [0, 1]",m))
s=s.d
if(!isFinite(s)||s<0||s>1)A.l(A.i("ParticleCollisionPlane.friction must be in [0, 1]",m))}s=n.k4
if(s!=null)s.p()
if(n.bl<=0)throw A.c(A.i("ParticleEmitter.maxParticles must be > 0",m))},
aI(a,b,c){var s,r,q
if(a<=0)return 0
s=Math.min(a,this.bl-this.al)
for(r=0,q=0;q<s;++q){this.cM(b,c);++r}return r},
eH(a){return this.aI(a,null,null)},
a7(a){var s,r,q,p,o,n,m,l,k,j=this
if(!isFinite(a)||a<=0)return
j.p()
s=j.d5+=a
if(s<0)return
if(j.cx){for(r=j.ax,q=r.length,p=j.f0,o=j.d4,n=0;n<q;++n){m=r[n]
if(!(n<p.length))return A.d(p,n)
l=p[n]
if(l>=1)continue
if(s>=l){j.eH(m.dt(o))
if(!(n<p.length))return A.d(p,n)
B.a.K(p,n,p[n]+1)}}s=j.at
if(s>0){s=j.bn=j.bn+s*a
r=j.bl
for(;;){if(!(s>=1&&j.al<r))break
j.ep()
s=--j.bn}if(j.al>=r)j.bn=0}}j.ef(a)
for(s=j.aK,r=s.length,k=0;k<r;++k)s[k].a.a7(a)},
cM(a,b){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.al
if(h>=i.bl)return
s=i.bm
i.al=h+1
if(!(h>=0&&h<s.length))return A.d(s,h)
r=s[h]
r.fr=!0
r.as=r.dy=0
h=i.d4
q=i.y.aS(h,i.z)
if(b!=null){s=r.a=b.a
p=r.b=b.b
o=r.c=b.c}else{s=q.a
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
o=i.dx
m=q.b.k(0,o+(i.dy-o)*h.M())
o=m.a
r.d=o
p=m.b
r.e=p
s=m.c
r.f=s
if(a!=null){r.d=o+a.a
r.e=p+a.b
r.f=s+a.c}r.at=0
s=i.cy
r.ax=s+(i.db-s)*h.M()
s=i.fr
r.ch=s+(i.fx-s)*h.M()
s=i.fy
r.CW=s+(i.go-s)*h.M()
r.ay=r.ch
s=i.ok
r.cx=s+(i.p1-s)*h.M()
s=i.p2
r.cy=s+(i.p3-s)*h.M()
r.db=1
l=r.dx=0;++i.eZ
for(h=i.aK,s=h.length;l<s;++l){k=h[l]
if(k.b===B.f8){if(k.d){p=k.e
j=new A.a(r.d*p,r.e*p,r.f*p)}else j=B.f
k.a.aI(k.c,j,new A.a(r.a,r.b,r.c))}}},
ep(){return this.cM(null,null)},
ef(g2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4=this,f5=f4.p4,f6=f4.RG,f7=f4.rx,f8=f7>0?Math.exp(-f7*g2):1,f9=f4.z.a,g0=f4.x1.gm(),g1=f4.d3
A:for(f7=f4.aK,s=f7.length,r=f4.id,q=f4.y2,p=f4.x2,o=p>0.000001,n=f4.to,m=Math.abs(n)>0.000001,l=f4.ry,k=Math.abs(l)>0.000001,j=f5.a+f6.a,i=f5.b+f6.b,h=f5.c+f6.c,f6=f4.bm,f5=f6.length,g=f9.a,f=f9.b,e=f9.c,d=g0.b,c=g0.c,b=g0.a,a=f4.xr,a0=f4.y1,a1=r==null,a2=g1!=null,a3=0;a3<f4.al;){if(!(a3<f5))return A.d(f6,a3)
a4=f6[a3]
a5=a4.at+=g2
a6=a4.ax
if(a5>=a6){f4.bb(a3)
continue A}a7=a5/a6
a5=a4.a
a4.y=a5
a6=a4.b
a4.z=a6
a8=a4.c
a4.Q=a8
if(k){a9=a5-g
b0=a6-f
b1=a8-e
b2=Math.sqrt(a9*a9+b0*b0+b1*b1)
if(b2>0.00001){b3=l/b2
b4=j+a9*b3
b5=i+b0*b3
b6=h+b1*b3}else{b6=h
b5=i
b4=j}}else{b6=h
b5=i
b4=j}if(m){a9=a4.a-g
b0=a4.b-f
b1=a4.c-e
b7=d*b1-c*b0
b8=c*a9-b*b1
b9=b*b0-d*a9
c0=Math.sqrt(b7*b7+b8*b8+b9*b9)
if(c0>0.00001){c1=n/c0
b4+=b7*c1
b5+=b8*c1
b6+=b9*c1}}if(o){a5=a4.a
a6=a4.b
a8=a4.c
c2=a0*f4.d5
a6*=a
a8*=a
a5*=a
b4+=(Math.sin(a6+c2)+Math.cos(a8*1.3-c2*0.7))*p
b5+=(Math.sin(a8+c2*1.1)+Math.cos(a5*1.1-c2))*p
b6+=(Math.sin(a5-c2*0.9)+Math.cos(a6*0.9+c2*1.2))*p}c4=0
for(;;){if(!(c4<q.length)){c3=!1
break}c5=q[c4]
c6=c5.gam().gbt().P(0,a4.a)
c7=c5.gam().gbu().P(0,a4.b)
c8=c5.gam().gbv().P(0,a4.c)
c9=Math.sqrt(A.cd(c6.k(0,c6).v(0,c7.k(0,c7)).v(0,c8.k(0,c8))))
if(c5.gbp().bw(0,0)&&B.b.aR(c9,c5.gbp())){f4.bb(a3)
c3=!0
break}if(B.b.aR(c9,c5.gdd())&&c9>0.0001){switch(c5.gfS()){case B.bs:d0=1-B.b.aD(c9,c5.gdd())
break
case B.bt:d1=B.b.aD(c9,c5.gdd())
d0=1/(1+d1*d1*4)
break
case B.bu:d0=1
break
default:d0=null}d2=c5.gfN().k(0,d0).aD(0,c9)
b4=B.b.v(b4,c6.k(0,d2))
b5=B.b.v(b5,c7.k(0,d2))
b6=B.b.v(b6,c8.k(0,d2))
if(c5.gfh().fP(0).bw(0,0.000001)){d3=c5.gfQ().gm()
a9=c6.an(0)
b0=c7.an(0)
b1=c8.an(0)
b7=d3.gbu().k(0,b1).P(0,d3.gbv().k(0,b0))
b8=d3.gbv().k(0,a9).P(0,d3.gbt().k(0,b1))
b9=d3.gbt().k(0,b0).P(0,d3.gbu().k(0,a9))
c0=Math.sqrt(A.cd(b7.k(0,b7).v(0,b8.k(0,b8)).v(0,b9.k(0,b9))))
if(c0>0.00001){c1=c5.gfh().k(0,d0).aD(0,c0)
b4=B.b.v(b4,b7.k(0,c1))
b5=B.b.v(b5,b8.k(0,c1))
b6=B.b.v(b6,b9.k(0,c1))}}}++c4}if(c3)continue A
a5=a4.a
a6=a4.d
a4.a=a5+(a6*g2+0.5*b4*g2*g2)
a5=a4.b
a8=a4.e
a4.b=a5+(a8*g2+0.5*b5*g2*g2)
a5=a4.c
d4=a4.f
a4.c=a5+(d4*g2+0.5*b6*g2*g2)
a4.d=(a6+b4*g2)*f8
a4.e=(a8+b5*g2)*f8
a4.f=(d4+b6*g2)*f8
c4=0
for(;;){if(!(c4<q.length)){d5=!1
break}c5=q[c4]
if(c5.gbp().bw(0,0)){d6=c5.gam().gbt().P(0,a4.a)
d7=c5.gam().gbu().P(0,a4.b)
d8=c5.gam().gbv().P(0,a4.c)
if(d6.k(0,d6).v(0,d7.k(0,d7)).v(0,d8.k(0,d8)).aR(0,c5.gbp().k(0,c5.gbp()))){f4.bb(a3)
d5=!0
break}}++c4}if(d5)continue A
if(a2){d9=g1.b.gm()
a5=a4.a
a6=g1.a
a8=d9.a
d4=d9.b
e0=d9.c
c9=(a5-a6.a)*a8+(a4.b-a6.b)*d4+(a4.c-a6.c)*e0
if(c9<=0){for(c2=0;c2<s;++c2){e1=f7[c2]
if(e1.b===B.as){if(e1.d){a5=e1.e
e2=new A.a(a4.d*a5,a4.e*a5,a4.f*a5)}else e2=B.f
e1.a.aI(e1.c,e2,new A.a(a4.a,a4.b,a4.c))}}switch(g1.e.a){case 1:f4.bb(a3)
continue A
case 2:a4.a=a4.a-c9*a8
a4.b=a4.b-c9*d4
a4.c=a4.c-c9*e0
a5=a4.d
a6=a4.e
e3=a4.f
e4=a5*a8+a6*d4+e3*e0
a8=a5-e4*a8
a4.d=a8
d4=a6-e4*d4
a4.e=d4
e0=e3-e4*e0
a4.f=e0
e3=1-g1.d
a4.d=a8*e3
a4.e=d4*e3
a4.f=e0*e3
break
case 0:a4.a=a4.a-c9*a8
a4.b=a4.b-c9*d4
a4.c=a4.c-c9*e0
a5=a4.d
a6=a4.e
e3=a4.f
e4=a5*a8+a6*d4+e3*e0
if(e4<0){e5=(1+g1.c)*e4
e6=1-g1.d
a4.d=(a5-e5*a8)*e6
a4.e=(a6-e5*d4)*e6
a4.f=(e3-e5*e0)*e6}break}}}if(a1)e7=null
else{a5=B.b.l(a7,0,1)
a5=r.a.$1(a5)
e7=a5}if(e7==null)e7=a7
a5=a4.ch
a4.ay=a5+(a4.CW-a5)*e7
a4.cx=a4.cx+a4.cy*g2
e8=a4.a-a4.y
e9=a4.b-a4.z
f0=a4.c-a4.Q
f1=Math.sqrt(e8*e8+e9*e9+f0*f0)
a4.dy+=g2
for(a5=f1>0.000001,f2=!1,c2=0;c2<s;++c2){e1=f7[c2]
if(e1.b===B.bf){if(e1.d){a6=e1.e
e2=new A.a(a4.d*a6,a4.e*a6,a4.f*a6)}else e2=B.f
a6=e1.r
if(a6>0){a4.as+=f1
for(a8=e1.a,d4=e1.c;e0=a4.as,e0>=a6;){e0-=a6
a4.as=e0
f3=a5?B.b.l(f1-e0,0,f1)/f1:1
a8.aI(d4,e2,new A.a(a4.y+e8*f3,a4.z+e9*f3,a4.Q+f0*f3))}}else if(a4.dy>=e1.f){e1.a.aI(e1.c,e2,new A.a(a4.a,a4.b,a4.c))
f2=!0}}}if(f2)a4.dy=0;++a3}},
bb(a){var s,r,q,p,o,n,m,l,k,j=this,i=j.bm,h=i.length
if(!(a<h))return A.d(i,a)
s=i[a]
r=new A.a(s.a,s.b,s.c)
for(q=j.aK,p=q.length,o=0;o<p;++o){n=q[o]
if(n.b===B.be){if(n.d){m=n.e
l=new A.a(s.d*m,s.e*m,s.f*m)}else l=B.f
n.a.aI(n.c,l,r)}}q=--j.al;++j.f_
if(a<q){if(!(q<h))return A.d(i,q)
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
s.fr=k.fr}if(!(q>=0&&q<h))return A.d(i,q)
i=i[q]
i.at=i.as=i.y=i.z=i.Q=i.r=i.w=i.x=i.d=i.e=i.f=i.a=i.b=i.c=0
i.CW=i.ch=i.ay=i.ax=1
i.cy=i.cx=0
i.db=1
i.dy=i.dx=0
i.fr=!1},
cf(a7,a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=0
if(a5.al>0){s=a8.a
r=A.mo(s.c)
q=s.d
p=s.e
o=a5.b
for(s=a5.a,n=a5.d,m=a5.e,l=a5.x,k=a5.Q===B.I,j=a5.bm,i=j.length,h=a5.as,g=0;g<a5.al;++g){if(!(g<i))return A.d(j,g)
f=j[g]
e=f.a
d=f.b
c=f.c
b=f.ay*0.5
if(r.dh(new A.a5(new A.a(e-b,d-b,c-b),new A.a(e+b,d+b,c+b)))===B.a6)continue
a=a5.el(f,q,p)
a0=f.ay
if(k){b=f.d
a1=f.e
a2=f.f
a3=Math.sqrt(b*b+a1*a1+a2*a2)
a0=f.ay*(1+a3*h)}if(a0<=0.000001)a0=0.000001
a7.ce(new A.b9(s,o,new A.O(new A.a(e,d,c),a,a0),-1,n,m,!1,!1,l));++a6}}for(s=a5.aK,n=s.length,a4=0;a4<n;++a4)a6+=s[a4].a.cf(a7,a8,!0)
return a6},
bx(a,b){return this.cf(a,b,!0)},
el(a,b,c){var s,r,q,p,o,n,m
switch(this.Q.a){case 0:s=b.P(0,new A.a(a.a,a.b,a.c)).gm()
if(s.gO()<0.000001)return B.o
r=A.mN(B.p,s)
q=a.cx
if(Math.abs(q)>0.000001)return r.k(0,A.ai(B.p,q)).gm()
return r
case 1:case 2:p=new A.a(a.d,a.e,a.f)
if(p.gO()<0.000001){q=a.cx
return Math.abs(q)>0.000001?A.ai(B.d,q):B.o}o=p.gm()
n=B.b.l(B.q.aA(o),-1,1)
if(n>0.999999)return B.o
if(n<-0.999999)return A.ai(B.k,3.141592653589793)
m=A.ai(B.q.R(o),Math.acos(n))
q=a.cx
if(Math.abs(q)>0.000001)return A.ai(o,q).k(0,m).gm()
return m
case 3:return A.ai(B.d,a.cx)}}}
A.bP.prototype={}
A.bY.prototype={
p(){if(!B.f.gE(0))throw A.c(A.i("PointShape.offset must be finite",null))
var s=this.b
if(s!=null)s=!s.gE(0)||s.gO()<0.000001
else s=!1
if(s)throw A.c(A.i("PointShape.direction must be finite and non-zero",null))
s=this.c
if(!isFinite(s)||s<0||s>3.141592653589793)throw A.c(A.i("PointShape.spreadAngleRadians must be in [0, pi]",null))},
aS(a,b){var s,r,q,p,o,n,m,l,k,j,i
this.p()
s=b.ai(B.f)
r=this.b
if(r==null)q=A.et(a)
else{p=this.c
if(p<=0.000001)q=r.gm()
else{o=r.gm()
n=Math.cos(p)
m=n+a.M()*(1-n)
l=Math.sqrt(Math.max(0,1-m*m))
k=a.M()*2*3.141592653589793
p=Math.cos(k)
j=Math.sin(k)
q=A.mN(B.d,o).af(new A.a(l*p,m,l*j)).gm()}}i=b.b.af(q.k(0,b.c)).gm()
if(!s.gE(0)||!i.gE(0))A.l(A.i("EmitterSpawnSample must be finite",null))
return new A.bP(s,i)},
$ibx:1}
A.hG.prototype={
D(){return"BoxEmissionMode."+this.b}}
A.co.prototype={
p(){var s=this.a
if(!s.gE(0)||s.a<0||s.b<0||s.c<0)throw A.c(A.i("BoxShape.halfExtents must be finite and >= 0",null))},
aS(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
f.p()
switch(f.b.a){case 0:s=f.a
r=new A.a((a.M()*2-1)*s.a,(a.M()*2-1)*s.b,(a.M()*2-1)*s.c)
q=A.et(a)
break
case 1:p=a.br(6)
o=a.M()*2-1
n=a.M()*2-1
s=f.a
m=s.a
l=s.b
s=s.c
switch(p){case 0:r=new A.a(m,o*l,n*s)
k=B.k
break
case 1:r=new A.a(-m,o*l,n*s)
k=B.k.an(0)
break
case 2:r=new A.a(o*m,l,n*s)
k=B.d
break
case 3:r=new A.a(o*m,-l,n*s)
k=B.d.an(0)
break
case 4:r=new A.a(o*m,n*l,s)
k=B.p
break
default:r=new A.a(o*m,n*l,-s)
k=B.p.an(0)}q=A.et(a)
break
case 2:j=a.br(3)
i=a.c1()?1:-1
h=a.c1()?1:-1
g=a.M()*2-1
s=f.a
m=s.a
l=s.b
s=s.c
switch(j){case 0:r=new A.a(g*m,i*l,h*s)
break
case 1:r=new A.a(i*m,g*l,h*s)
break
default:r=new A.a(i*m,h*l,g*s)}q=A.et(a)
break
default:r=null
q=null}return new A.bP(b.ai(r),b.b.af(t.a.a(q).k(0,b.c)).gm())},
$ibx:1}
A.jk.prototype={
D(){return"SphereEmissionMode."+this.b}}
A.jj.prototype={
D(){return"SphereDirectionMode."+this.b}}
A.fE.prototype={
p(){if(!isFinite(0.1))throw A.c(A.i("SphereShape.radius must be finite and > 0",null))
if(!isFinite(0))throw A.c(A.i("SphereShape.innerRadius must be in [0, radius]",null))},
aS(a,b){var s,r,q
this.p()
s=A.et(a)
r=Math.pow(0+a.M()*0.0010000000000000002,0.3333333333333333)
q=s.k(0,r)
switch(0){case 0:break}return new A.bP(b.ai(q),b.b.af(s.k(0,b.c)).gm())},
$ibx:1}
A.hP.prototype={
D(){return"ConeEmissionMode."+this.b}}
A.db.prototype={
p(){var s=this.a
if(!isFinite(s)||s<0)throw A.c(A.i("ConeShape.radius must be finite and >= 0",null))
s=this.b
if(!isFinite(s)||s<0||s>=1.5707963267948966)throw A.c(A.i("ConeShape.angleRadians must be in [0, pi/2)",null))
s=this.c
if(!isFinite(s)||s<=0)throw A.c(A.i("ConeShape.length must be finite and > 0",null))},
aS(a,b){var s,r,q,p,o,n,m,l,k,j=this
j.p()
switch(j.d.a){case 0:s=0
break
case 1:s=j.c
break
case 2:s=a.M()*j.c
break
default:s=null}r=j.b
q=Math.tan(r)
if(typeof s!=="number")return s.k()
p=Math.sqrt(a.M())*(j.a+s*q)
o=a.M()*2*3.141592653589793
n=p*Math.cos(o)
m=p*Math.sin(o)
if(p<0.000001)l=B.d
else{k=Math.sin(r)
l=new A.a(n/p*k,Math.cos(r),m/p*k).gm()}return new A.bP(b.ai(new A.a(n,s,m)),b.b.af(l.k(0,b.c)).gm())},
$ibx:1,
gB(a){return this.c}}
A.eG.prototype={
D(){return"CircleEmissionMode."+this.b}}
A.d8.prototype={
D(){return"CircleDirectionMode."+this.b}}
A.cq.prototype={
p(){var s,r=this.a
if(!isFinite(r)||r<=0)throw A.c(A.i("CircleShape.radius must be finite and > 0",null))
s=this.b
if(!isFinite(s)||s<0||s>r)throw A.c(A.i("CircleShape.innerRadius must be in [0, radius]",null))
r=this.c
if(!r.gE(0)||r.gO()<0.000001)throw A.c(A.i("CircleShape.normal must be finite and non-zero",null))},
aS(a,b){var s,r,q,p,o,n,m,l,k=this
k.p()
s=a.M()*2*3.141592653589793
r=k.a
if(!(k.d===B.aF)){q=k.b
q*=q
r=Math.sqrt(q+a.M()*(r*r-q))}p=k.c.gm()
o=p.R(Math.abs(p.b)>0.9?B.k:B.d).gm()
n=p.R(o).gm()
m=o.k(0,r*Math.cos(s)).v(0,n.k(0,r*Math.sin(s)))
switch(k.e.a){case 0:l=p
break
case 1:l=r>0.000001?m.gm():p
break
case 2:l=r>0.000001?m.gm().an(0):p.an(0)
break
case 3:l=p.R(m).gm()
break
case 4:l=A.et(a)
break
default:l=null}return new A.bP(b.ai(m),b.b.af(t.a.a(l).k(0,b.c)).gm())},
$ibx:1}
A.fX.prototype={
D(){return"_BloomBlurAxis."+this.b}}
A.d4.prototype={
gN(){return this.f},
a1(a,b){B.a.i(a.a,new A.P(this.f,B.E,A.b([new A.p(this.x,B.h),new A.p(this.y,B.j)],t.C),!1))},
a0(a){var s=this,r=s.a.a2(new A.ad(s.e,s.b,s.c,B.w,B.aW,B.aT)),q=A.aS(s.d),p=t.n,o=s.r===B.bp?new Float32Array(A.t(A.b([1/s.Q,0],p))):new Float32Array(A.t(A.b([0,1/s.as],p)))
p=s.y
return A.b([new A.fY(new A.a8(s.f,A.b([new A.p(s.x,B.h),new A.p(p,B.j)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iI:1}
A.fY.prototype={
Y(a){var s,r,q,p,o=this
if(a.d.f.b<=0)return
s=a.b
r=s.a
A.ap(r,a.Z(o.r).b)
A.aa(r,o.a.W())
A.b0(r,B.G,1,0,0,0)
A.au(r,o.b.b)
q=t.j
p=o.d
if(o.e)A.pg(r,0,q.a(p.$0()))
else A.S(r,0,q.a(p.$0()))
A.f(r,"uSource",B.v)
A.f(r,"uTexelStep",new A.h(B.N,o.f))
A.ae(r,o.c)
s.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.eB.prototype={
gN(){return"bloomComposite"},
a1(a,b){B.a.i(a.a,new A.P("bloomComposite",B.E,A.b([new A.p(this.f,B.h),new A.p(this.r,B.h),new A.p(this.w,B.j)],t.C),!1))},
a0(a){var s=this,r="bloomComposite",q=s.a.a2(new A.ad(r,s.b,s.c,B.w,B.dE,B.ds)),p=A.aS(s.d),o=s.w,n=A.b([new A.p(s.f,B.h),new A.p(s.r,B.h),new A.p(o,B.j)],t.C)
return A.b([new A.fZ(new A.a8(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iI:1}
A.fZ.prototype={
Y(a){var s,r,q=this,p=a.d.f.b
if(p<=0)return
s=a.b
r=s.a
A.ap(r,a.aP(q.f).b)
A.n_(r,1)
A.aa(r,B.aI)
A.au(r,q.b.b)
A.S(r,0,t.j.a(q.d.$0()))
A.f(r,"uBloom",B.v)
A.f(r,"uBloomStrength",new A.h(B.c,p))
A.ae(r,q.c)
s.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.eN.prototype={
gN(){return"depthPrepass"},
a1(a,b){B.a.i(a.a,new A.P("depthPrepass",B.cd,A.b([new A.p(this.w,B.j)],t.C),!1))},
a0(a){var s=this,r="depthPrepass",q=s.a.a2(new A.ad(r,s.b,s.c,B.aV,B.aU,B.db))
return A.b([new A.h0(new A.a8(r,A.b([new A.p(s.w,B.j)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iI:1}
A.h0.prototype={
Y(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=u.k,b=a2.b,a=a2.d,a0=a.f,a1=b.a
A.ap(a1,a2.Z("sceneDepth").b)
A.aa(a1,d.a.W())
A.b0(a1,B.a4,1,0,0,0)
A.au(a1,d.b.b)
A.f(a1,"uVertexSnapGrid",new A.h(B.c,a0.ax))
A.f(a1,"uAlbedo",B.v)
for(s=a.a,r=s.length,a=a.c.c.a,q=d.c,p=a0.at,o=v.G,n=b.b,m=a1.a,l=0;l<s.length;s.length===r||(0,A.C)(s),++l){k=s[l]
j=k.a
i=j.gq()
A.f(a1,"uViewProjection",new A.h(B.t,new Float32Array(A.t(a))))
A.f(a1,"uModel",new A.h(B.t,new Float32Array(A.t(i.c.ad().a))))
A.ld(b,k,!1)
d.e4(b,j.gq().b,p)
h=q.$1(j.gq().a)
i=h.a
if(a1.b!==B.i)A.l(A.m(c))
m.bindVertexArray(A.k(i.a))
i=h.b
g=h.c
f=k.b.length
if(i){i=h.d
if(a1.b!==B.i)A.l(A.m(c))
e=A.e(o.WebGL2RenderingContext.TRIANGLES)
m.drawElementsInstanced.apply(m,[e,g,i?A.e(o.WebGL2RenderingContext.UNSIGNED_INT):A.e(o.WebGL2RenderingContext.UNSIGNED_SHORT),0,f])
n.aG(g,f)}else{if(a1.b!==B.i)A.l(A.m(c))
m.drawArraysInstanced(A.e(o.WebGL2RenderingContext.TRIANGLES),0,g,f)
n.aG(g,f)}}},
e4(a,b,c){var s,r=a.a
A.S(r,0,t.j.a(this.e.$1(this.d.$1(b).b)))
A.f(r,"uAlphaCutoff",new A.h(B.c,0))
A.f(r,"uAffineWarpStrength",new A.h(B.c,0))
s=this.a.W()
A.aa(r,s)},
$iD:1,
gq(){return this.a}}
A.h1.prototype={
D(){return"_DofBlurAxis."+this.b}}
A.df.prototype={
gN(){return this.f},
a1(a,b){B.a.i(a.a,new A.P(this.f,B.E,A.b([new A.p(this.w,B.h),new A.p(this.x,B.j)],t.C),!1))},
a0(a){var s=this,r=s.a.a2(new A.ad(s.e,s.b,s.c,B.w,B.aW,B.aT)),q=A.aS(s.d),p=t.n,o=s.r===B.bq?new Float32Array(A.t(A.b([1/s.z,0],p))):new Float32Array(A.t(A.b([0,1/s.Q],p)))
p=s.x
return A.b([new A.h2(new A.a8(s.f,A.b([new A.p(s.w,B.h),new A.p(p,B.j)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iI:1}
A.h2.prototype={
Y(a){var s,r,q=this
if(a.d.f.d<=0)return
s=a.b
r=s.a
A.ap(r,a.Z(q.f).b)
A.aa(r,q.a.W())
A.b0(r,B.G,1,0,0,0)
A.au(r,q.b.b)
A.S(r,0,t.j.a(q.d.$0()))
A.f(r,"uSource",B.v)
A.f(r,"uTexelStep",new A.h(B.N,q.e))
A.ae(r,q.c)
s.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.eP.prototype={
gN(){return"dofComposite"},
a1(a,b){var s=this
B.a.i(a.a,new A.P("dofComposite",B.E,A.b([new A.p(s.z,B.h),new A.p(s.Q,B.h),new A.p(s.as,B.h),new A.p(s.at,B.j)],t.C),!1))},
a0(a){var s=this,r="dofComposite",q=s.a.a2(new A.ad(r,s.b,s.c,B.w,B.dC,B.d7)),p=A.aS(s.d)
return A.b([new A.h3(new A.a8(r,A.b([new A.p(s.z,B.h),new A.p(s.Q,B.h),new A.p(s.as,B.h),new A.p(s.at,B.j)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iI:1}
A.h3.prototype={
Y(a){var s,r=this,q=a.Z("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.ap(n,q.b)
A.aa(n,r.a.W())
A.au(n,r.b.b)
s=t.j
A.S(n,0,s.a(r.d.$0()))
A.f(n,"uSharp",B.v)
A.S(n,1,s.a(r.e.$0()))
A.f(n,"uBlurred",B.O)
A.S(n,2,s.a(r.f.$0()))
A.f(n,"uSceneDepth",B.bj)
A.f(n,"uNear",new A.h(B.c,o.f))
A.f(n,"uFar",new A.h(B.c,o.r))
A.f(n,"uFocusDistance",new A.h(B.c,r.w))
A.f(n,"uFocusRange",new A.h(B.c,r.x))
A.f(n,"uStrength",new A.h(B.c,a.d.f.d))
A.ae(n,r.c)
p.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.f_.prototype={
gN(){return"grade"},
a1(a,b){B.a.i(a.a,new A.P("grade",B.E,A.b([new A.p(this.r,B.h),new A.p(this.w,B.j)],t.C),!1))},
a0(a){var s=this,r=s.a.a2(new A.ad("grade",s.b,s.c,B.w,B.dA,B.dt)),q=A.aS(s.d),p=s.r,o=s.w
return A.b([new A.h7(new A.a8("grade",A.b([new A.p(p,B.h),new A.p(o,B.j)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iI:1}
A.h7.prototype={
Y(a){var s=this,r=a.Z(s.f.a),q=a.b,p=q.a
A.ap(p,a.Z(s.r.a).b)
A.aa(p,s.a.W())
A.au(p,s.b.b)
A.S(p,0,r.b)
A.f(p,"uScene",B.v)
A.S(p,1,t.j.a(s.d.$0()))
A.f(p,"uLut",B.O)
A.f(p,"uLutSize",new A.h(B.c,s.e))
A.f(p,"uStrength",new A.h(B.c,a.d.f.as))
A.ae(p,s.c)
q.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.dx.prototype={
gN(){return"msaaResolve"},
a1(a,b){B.a.i(a.a,new A.P("msaaResolve",B.ce,A.b([new A.p(this.b,B.h),new A.p(this.c,B.j)],t.C),!0))},
a0(a){var s=this.b,r=this.c
return A.b([new A.ha(new A.a8("msaaResolve",A.b([new A.p(s,B.h),new A.p(r,B.j)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iI:1}
A.ha.prototype={
Y(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.aP(this.c),j=a.aP(this.d),i=this.b
if(i.b!==B.i)A.l(A.m(u.k))
s=t.V
r=s.a(k.b.a)
q=s.a(j.b.a)
s=r.y
if(s<=1)A.l(A.i("WebGl2Device.resolveTarget: source must be multisampled (samples > 1), got "+s,null))
s=q.y
if(s>1)A.l(A.i("WebGl2Device.resolveTarget: destination must be single-sample, got samples="+s,null))
s=r.w
p=q.w
if(s!==p||r.x!==q.x)A.l(A.i("WebGl2Device.resolveTarget: source ("+s+"x"+r.x+") and destination ("+p+"x"+q.x+") must match",null))
o=r.r!=null||r.f!=null
n=q.r!=null||q.f!=null
i=i.a
m=v.G
i.bindFramebuffer(A.e(m.WebGL2RenderingContext.READ_FRAMEBUFFER),r.a)
i.bindFramebuffer(A.e(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),q.a)
if(r.c!=null||r.b!=null){if(o){i.readBuffer(A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT0))
i.drawBuffers(A.b([A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(m.WebGL2RenderingContext.NONE)],t.n))}A.ak(i,l,[0,0,s,r.x,0,0,p,q.x,A.e(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.e(m.WebGL2RenderingContext.LINEAR)],t.H)}if(o&&n){i.readBuffer(A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT1))
i.drawBuffers(A.b([A.e(m.WebGL2RenderingContext.NONE),A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
A.ak(i,l,[0,0,s,r.x,0,0,p,q.x,A.e(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.e(m.WebGL2RenderingContext.LINEAR)],t.H)}if(r.d!=null||r.e!=null)A.ak(i,l,[0,0,s,r.x,0,0,p,q.x,A.e(m.WebGL2RenderingContext.DEPTH_BUFFER_BIT),A.e(m.WebGL2RenderingContext.NEAREST)],t.H)
if(n)i.drawBuffers(A.b([A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.e(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
i.bindFramebuffer(A.e(m.WebGL2RenderingContext.READ_FRAMEBUFFER),null)
i.bindFramebuffer(A.e(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),null)},
$iD:1,
gq(){return this.a}}
A.cn.prototype={}
A.eD.prototype={
Z(a){var s=this.a.C(0,a)
if(s==null)throw A.c(A.m('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
aP(a){var s=a.a,r=this.a.C(0,s+"#"+a.f)
if(r!=null)return r
return this.Z(s)},
$ioX:1}
A.lw.prototype={}
A.dG.prototype={
gN(){return"present"},
a1(a,b){B.a.i(a.a,new A.P("present",B.cf,A.b([new A.p(this.f,B.h)],t.C),!1))},
a0(a){var s=this,r=s.a.a2(new A.ad("present",s.b,s.c,B.w,B.dD,B.dm)),q=A.aS(s.d),p=s.f
return A.b([new A.he(new A.a8("present",A.b([new A.p(p,B.h)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iI:1}
A.he.prototype={
Y(a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=null,a1=a4.aP(a.d),a2=a4.b,a3=a2.a
A.ap(a3,a0)
A.aa(a3,a.a.W())
A.au(a3,a.b.b)
A.ae(a3,a.c)
A.S(a3,0,a1.b)
s=a4.c
r=s!=null
if(r)A.S(a3,1,s)
q=a4.d
p=q.f
o=q.d
n=q.c
A.f(a3,"uExposure",new A.h(B.c,p.a))
A.f(a3,"uVignette",new A.h(B.c,p.e))
A.f(a3,"uGrain",new A.h(B.c,p.f))
A.f(a3,"uOutputEncoding",new A.h(B.c,a.e===B.a5?1:0))
A.f(a3,"uToneMap",new A.h(B.c,A.ou(p.fr)))
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
A.f(a3,"uClearColor",new A.h(B.l,new Float32Array(A.t(A.b([m.a,m.b,m.c],d)))))
A.f(a3,"uSkyHorizon",new A.h(B.l,new Float32Array(A.t(A.b([k.a,k.b,k.c],d)))))
A.f(a3,"uSkyZenith",new A.h(B.l,new Float32Array(A.t(A.b([j,i,h],d)))))
A.f(a3,"uSkyGround",new A.h(B.l,new Float32Array(A.t(A.b([g,f,e],d)))))
A.f(a3,"uSkyEnabled",new A.h(B.c,q?0:1))
j=q?a0:l.f
A.f(a3,"uSkyHorizonGlow",new A.h(B.c,j==null?0:j))
j=q?a0:l.r
A.f(a3,"uSkyStarDensity",new A.h(B.c,j==null?0:j))
A.f(a3,"uSkyTexture",B.O)
A.f(a3,"uSkyTextureEnabled",new A.h(B.c,!q&&r?1:0))
r=q?a0:l.w
A.f(a3,"uSkyRotation",new A.h(B.c,r==null?0:r))
r=q?a0:l.x
A.f(a3,"uSkyExposure",new A.h(B.c,r==null?1:r))
A.f(a3,"uSkyTextureSrgb",new A.h(B.c,(!q||a0)===!0?1:0))
A.f(a3,"uInverseProjection",new A.h(B.t,new Float32Array(A.t(n.gd7().a))))
c=n.y
if(c===$){b=n.a.c0()
n.y!==$&&A.m5()
n.y=b
c=b}A.f(a3,"uInverseView",new A.h(B.t,new Float32Array(A.t(c.a))))
r=n.d
A.f(a3,"uCameraPosition",new A.h(B.l,new Float32Array(A.t(A.b([r.a,r.b,r.c],d)))))
r=q?a0:l.z
A.f(a3,"uCloudCoverage",new A.h(B.c,r==null?0:r))
r=q?a0:l.Q
A.f(a3,"uCloudDensity",new A.h(B.c,r==null?0:r))
r=q?a0:l.as
A.f(a3,"uCloudBaseHeight",new A.h(B.c,r==null?650:r))
r=q?a0:l.at
A.f(a3,"uCloudThickness",new A.h(B.c,r==null?350:r))
r=q?a0:l.ax
A.f(a3,"uCloudScale",new A.h(B.c,r==null?0:r))
r=q?a0:l.ay
if(r==null)r=0
j=q?a0:l.ch
A.f(a3,"uCloudWind",new A.h(B.N,new Float32Array(A.t(A.b([r,j==null?0:j],d)))))
r=q?a0:l.CW
A.f(a3,"uCloudPhase",new A.h(B.c,r==null?0:r))
r=q?a0:l.cx
A.f(a3,"uCloudDetail",new A.h(B.c,r==null?0:r))
r=q?a0:l.cy
A.f(a3,"uCloudSilverLining",new A.h(B.c,r==null?0:r))
r=q?a0:l.db
A.f(a3,"uCloudSampleCount",new A.h(B.c,r==null?4:r))
r=o.go
q=r==null
j=q?a0:r.a.a
if(j==null)j=0
i=q?a0:r.a.b
if(i==null)i=1
h=q?a0:r.a.c
A.f(a3,"uCloudLightDirection",new A.h(B.l,new Float32Array(A.t(A.b([j,i,h==null?0:h],d)))))
j=q?a0:r.b.a
if(j==null)j=1
i=q?a0:r.b.b
if(i==null)i=1
h=q?a0:r.b.c
A.f(a3,"uCloudLightColor",new A.h(B.l,new Float32Array(A.t(A.b([j,i,h==null?1:h],d)))))
r=q?a0:r.c
A.f(a3,"uCloudLightIntensity",new A.h(B.c,r==null?0:r))
a2.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.fv.prototype={
gN(){return"ps1Quantize"},
a1(a,b){B.a.i(a.a,new A.P("ps1Quantize",B.E,A.b([new A.p(this.e,B.h),new A.p(this.f,B.j)],t.C),!1))},
a0(a){var s=this,r="ps1Quantize",q=s.a.a2(new A.ad(r,s.b,s.c,B.w,B.dF,B.d3)),p=A.aS(s.d),o=s.e,n=s.f
return A.b([new A.hf(new A.a8(r,A.b([new A.p(o,B.h),new A.p(n,B.j)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iI:1}
A.hf.prototype={
Y(a){var s=this,r=a.Z(s.d.a),q=a.b,p=a.d.f,o=q.a
A.ap(o,a.Z(s.e.a).b)
A.aa(o,s.a.W())
A.au(o,s.b.b)
A.S(o,0,r.b)
A.f(o,"uScene",B.v)
A.f(o,"uQuantizationBits",new A.h(B.c,p.ay))
A.f(o,"uDitherStrength",new A.h(B.c,p.Q))
A.ae(o,s.c)
q.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.c_.prototype={}
A.fC.prototype={
gN(){return"shadow"},
a1(a,b){B.a.i(a.a,new A.P("shadowCaster",B.cc,A.b([new A.p(this.z,B.j)],t.C),!1))},
a0(a){var s=this,r="shadowCaster",q=s.a.a2(new A.ad(r,s.b,s.c,B.aV,B.aU,B.dr))
return A.b([new A.hi(new A.a8(r,A.b([new A.p(s.z,B.j)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iI:1}
A.hi.prototype={
Y(a){var s,r,q,p,o=this,n=a.Z("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.ap(s,n.b)
A.aa(s,o.a.W())
A.b0(s,B.a4,1,0,0,0)
return}r=A.mQ(l)
o.x.$1(r)
s=m.a
A.ap(s,n.b)
A.aa(s,o.a.W())
A.b0(s,B.a4,1,0,0,0)
A.au(s,o.b.b)
A.f(s,"uAlbedo",B.v)
for(s=a.d.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.C)(s),++p)o.e7(m,s[p],l,r)},
cJ(a,b){var s,r=a.a
A.S(r,0,t.j.a(this.e.$1(this.d.$1(b).b)))
A.f(r,"uAlphaCutoff",new A.h(B.c,0))
s=this.a.W()
A.aa(r,s)},
e7(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){if(!b.gq().r)return
s=a.a
A.f(s,"uUseInstances",B.av)
n.cG(a,b.gq().c,d)
n.cJ(a,b.gq().b)
r=b.gq()
q=n.c.$1(r.a)
A.ae(s,q.a)
s=q.b
r=q.c
if(s)a.bS(r,q.d,0)
else a.a4(r,0)}else if(b instanceof A.bg){p=b.a
if(!p.gq().r)return
if(n.es(b,c)===B.eS)return
n.cG(a,p.gq().c,d)
A.ld(a,b,!1)
n.cJ(a,p.gq().b)
s=p.gq()
q=n.c.$1(s.a)
A.ae(a.a,q.a)
s=q.b
r=q.c
o=b.b.length
if(s)a.bT(r,q.d,o,0)
else a.bR(r,0,o)}else throw A.c(A.i("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.ev(b).j(0),null))},
es(a,b){return B.eR},
cG(a,b,c){var s=a.a
A.f(s,"uModel",new A.h(B.t,new Float32Array(A.t(b.ad().a))))
A.f(s,"uLightViewProjection",new A.h(B.t,new Float32Array(A.t(c.a.a))))},
$iD:1,
gq(){return this.a}}
A.kt.prototype={
$1(a){return this.a.a=a},
$S:61}
A.ku.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:62}
A.fD.prototype={
gN(){return"shadowedWorld"},
a1(a,b){var s=this,r=A.b([new A.p(s.db,B.h)],t.C)
if(s.ay)r.push(new A.p(s.dx,B.h))
r.push(new A.p(s.dy,B.j))
B.a.i(a.a,new A.P("shadowedWorld",B.aM,r,!1))},
a0(a){var s=this,r="shadowedWorld",q=s.a.a2(new A.ad(r,s.b,s.c,B.dG,B.dB,B.d2)),p=A.b([new A.p(s.db,B.h)],t.C)
if(s.ay)p.push(new A.p(s.dx,B.h))
p.push(new A.p(s.dy,B.j))
return A.b([new A.hj(new A.a8(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iI:1}
A.hj.prototype={
Y(b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=null,a5=b3.Z("sceneColor"),a6=b3.b,a7=b3.d,a8=a7.c,a9=a7.d,b0=a7.f,b1=a3.z.$0(),b2=a6.a
A.ap(b2,a5.b)
A.aa(b2,a3.a.W())
s=a9.a
A.b0(b2,B.aG,1,s.c,s.b,s.a)
A.au(b2,a3.b.b)
A.f(b2,"uAlbedo",B.v)
A.f(b2,"uNormalMap",B.fo)
A.f(b2,"uOrmMap",B.fp)
A.f(b2,"uEmissiveMap",B.fq)
A.f(b2,"uLightmap",B.fr)
s=t.j
A.S(b2,1,s.a(a3.y.$0()))
A.f(b2,"uShadowMap",B.O)
r=a8.d
q=t.n
A.f(b2,"uCameraPosition",new A.h(B.l,new Float32Array(A.t(A.b([r.a,r.b,r.c],q)))))
A.f(b2,"uShadowMapTexelSize",new A.h(B.N,new Float32Array(A.t(A.b([1/a3.ch,1/a3.CW],q)))))
A.f(b2,"uShadowFilterRadius",new A.h(B.c,a9.at))
A.f(b2,"uShadowBias",new A.h(B.c,a9.db))
A.S(b2,2,s.a(a3.at.$0()))
A.f(b2,"uSsao",B.bj)
A.f(b2,"uVertexSnapGrid",new A.h(B.c,b0.ax))
A.f(b2,"uSceneColorSize",new A.h(B.N,new Float32Array(A.t(A.b([a3.ax,a3.ay],q)))))
A.f(b2,"uViewProjection",new A.h(B.t,new Float32Array(A.t(a8.c.a))))
A.f(b2,"uView",new A.h(B.t,new Float32Array(A.t(a8.a.a))))
A.f(b2,"uLightViewProjection",new A.h(B.t,new Float32Array(A.t(b1.a.a))))
s=a9.b
A.f(b2,"uFogColor",new A.h(B.l,new Float32Array(A.t(A.b([s.a,s.b,s.c],q)))))
A.f(b2,"uFogStart",new A.h(B.c,a9.c))
A.f(b2,"uFogEnd",new A.h(B.c,a9.d))
s=a9.e
A.f(b2,"uFogHeightFalloff",new A.h(B.c,s==null?0:s))
A.f(b2,"uFogDensity",new A.h(B.c,0))
p=a3.Q.$0()
s=A.b([],t.w)
r=a3.as.$0()
r=J.ac(r==null?B.ab:r)
o=p==null
while(r.n()){n=r.gt()
if(-1!==(o?a4:-1))s.push(n)}m=o?a4:B.d
if(m==null)m=B.d
l=o?a4:B.q
if(l==null)l=B.q
A.f(b2,"uLightPosition",new A.h(B.l,new Float32Array(A.t(A.b([m.a,m.b,m.c],q)))))
A.f(b2,"uLightDirection",new A.h(B.l,new Float32Array(A.t(A.b([l.a,l.b,l.c],q)))))
k=o?a4:B.S
if(k==null)k=B.H
A.f(b2,"uLightColor",new A.h(B.l,new Float32Array(A.t(A.b([k.a,k.b,k.c],q)))))
r=o?a4:1
A.f(b2,"uLightIntensity",new A.h(B.c,r==null?0:r))
A.f(b2,"uSpotEnabled",new A.h(B.c,!o?1:0))
j=a9.go
r=j==null
i=r?a4:j.a
if(i==null)i=B.d
h=r?a4:j.b
if(h==null)h=B.H
A.f(b2,"uDirectionalDirection",new A.h(B.l,new Float32Array(A.t(A.b([i.a,i.b,i.c],q)))))
A.f(b2,"uDirectionalColor",new A.h(B.l,new Float32Array(A.t(A.b([h.a,h.b,h.c],q)))))
r=r?a4:j.c
A.f(b2,"uDirectionalIntensity",new A.h(B.c,r==null?0:r))
for(r=a9.id,g=0;g<4;++g){n=r.length
if(g<n){if(!(g<n))return A.d(r,g)
f=r[g]}else f=a4
n=f==null
e=n?a4:f.b
if(e==null)e=B.f
d=n?a4:f.c
if(d==null)d=B.H
c=""+g
A.f(b2,"uPointPosition"+c,new A.h(B.l,new Float32Array(A.t(A.b([e.a,e.b,e.c],q)))))
A.f(b2,"uPointColor"+c,new A.h(B.l,new Float32Array(A.t(A.b([d.a,d.b,d.c],q)))))
b=n?a4:f.d
if(b==null)b=0
A.f(b2,"uPointIntensity"+c,new A.h(B.c,b))
n=n?a4:f.e
if(n==null)n=1
A.f(b2,"uPointRadius"+c,new A.h(B.c,n))}for(g=0;g<3;++g){r=s.length
if(g<r){if(!(g<r))return A.d(s,g)
f=s[g]}else f=a4
r=f==null
e=r?a4:B.d
if(e==null)e=B.f
a=r?a4:B.q
if(a==null)a=B.q
d=r?a4:B.S
if(d==null)d=B.H
n=""+g
A.f(b2,"uDirectSpotPosition"+n,new A.h(B.l,new Float32Array(A.t(A.b([e.a,e.b,e.c],q)))))
A.f(b2,"uDirectSpotDirection"+n,new A.h(B.l,new Float32Array(A.t(A.b([a.a,a.b,a.c],q)))))
A.f(b2,"uDirectSpotColor"+n,new A.h(B.l,new Float32Array(A.t(A.b([d.a,d.b,d.c],q)))))
c=r?a4:1
if(c==null)c=0
A.f(b2,"uDirectSpotIntensity"+n,new A.h(B.c,c))
c=r?a4:1
if(c==null)c=1
A.f(b2,"uDirectSpotRange"+n,new A.h(B.c,c))
c=r?a4:0.3
if(c==null)c=0.3
A.f(b2,"uDirectSpotInnerCos"+n,new A.h(B.c,Math.cos(c)))
c=r?a4:0.5
if(c==null)c=0.5
A.f(b2,"uDirectSpotOuterCos"+n,new A.h(B.c,Math.cos(c)))
r=r?0:1
A.f(b2,"uDirectSpotEnabled"+n,new A.h(B.c,r))}s=o?a4:1
A.f(b2,"uLightRange",new A.h(B.c,s==null?1:s))
s=o?a4:0.3
if(s==null)s=0.3
A.f(b2,"uLightInnerCos",new A.h(B.c,Math.cos(s)))
s=o?a4:0.5
if(s==null)s=0.5
A.f(b2,"uLightOuterCos",new A.h(B.c,Math.cos(s)))
a0=a9.fx
A.f(b2,"uAmbientColor",new A.h(B.l,new Float32Array(A.t(A.b([a0.a,a0.b,a0.c],q)))))
A.f(b2,"uAmbientIntensity",new A.h(B.c,a9.fy))
A.f(b2,"uAmbientLightScale",new A.h(B.c,a9.ax))
A.f(b2,"uDirectLightScale",new A.h(B.c,a9.ay))
s=a9.dx
A.f(b2,"uReflectionColor",new A.h(B.l,new Float32Array(A.t(A.b([s.a,s.b,s.c],q)))))
A.f(b2,"uReflectionIntensity",new A.h(B.c,a9.dy))
A.f(b2,"uReflectionConfidence",new A.h(B.c,a9.fr))
A.f(b2,"uRainWetness",new A.h(B.c,b0.w))
A.f(b2,"uSurfaceSnowCoverage",new A.h(B.c,b0.x))
A.f(b2,"uSurfaceDissolution",new A.h(B.c,b0.y))
s=a9.k3
a1=A.jl(s,0,A.cc(4,"count",t.S),A.H(s).c).fG(0)
A.f(b2,"uThermalSourceCount",new A.h(B.c,a1.length))
for(g=0;g<4;++g){s=a1.length
if(g<s)if(!(g<s))return A.d(a1,g)
s=""+g
A.f(b2,"uThermalSourcePosition"+s,new A.h(B.l,new Float32Array(A.t(A.b([0,0,0],q)))))
A.f(b2,"uThermalSourceRadius"+s,new A.h(B.c,1))
A.f(b2,"uThermalSourceDissolution"+s,new A.h(B.c,0))}for(b2=a7.a,s=b2.length,r=b0.at,a2=0;a2<b2.length;b2.length===s||(0,A.C)(b2),++a2)a3.cK(a6,b2[a2],r,a9)
for(a7=a7.b,b2=a7.length,a2=0;a2<a7.length;a7.length===b2||(0,A.C)(a7),++a2)a3.cK(a6,a7[a2],r,a9)},
cK(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){s=a.a
A.f(s,"uUseInstances",B.av)
n.cL(a,b.gq().c)
n.cH(a,b.gq().b,b.gq().e,b.gq().f,c,b.gq().w,d)
r=n.c.$1(b.gq().a)
A.ae(s,r.a)
s=r.b
q=r.c
if(s)a.bS(q,r.d,0)
else a.a4(q,0)}else if(b instanceof A.bg){p=b.a
n.cL(a,p.gq().c)
A.ld(a,b,!0)
n.cH(a,p.gq().b,p.gq().e,p.gq().f,c,p.gq().w,d)
r=n.c.$1(p.gq().a)
A.ae(a.a,r.a)
s=r.b
q=r.c
o=b.b.length
if(s)a.bT(q,r.d,o,0)
else a.bR(q,0,o)}else throw A.c(A.i("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.ev(b).j(0),null))},
cH(a,b,c,d,e,f,g){var s=this,r=s.d.$1(b),q=t.j,p=a.a
A.S(p,0,q.a(s.e.$1(r.b)))
A.S(p,3,q.a(s.f.$1(r.x)))
A.S(p,4,q.a(s.r.$1(r.Q)))
A.S(p,5,q.a(s.w.$1(null)))
A.S(p,6,q.a(s.x.$1(null)))
A.f(p,"uAlphaCutoff",new A.h(B.c,0))
A.f(p,"uOpaqueCoverage",new A.h(B.c,c===B.r?0:1))
A.f(p,"uAffineWarpStrength",new A.h(B.c,0))
q=t.n
A.f(p,"uMaterialTint",new A.h(B.l,new Float32Array(A.t(A.b([r.d,r.e,r.f],q)))))
A.f(p,"uEmissiveStrength",new A.h(B.c,r.w))
A.f(p,"uUvScaleOffset",new A.h(B.fn,new Float32Array(A.t(A.b([r.db,r.dx,0,0],q)))))
A.f(p,"uNormalStrength",new A.h(B.c,r.z*g.ch))
A.f(p,"uRoughness",new A.h(B.c,r.at*g.CW))
A.f(p,"uMetallic",new A.h(B.c,r.ax*g.cx))
A.f(p,"uSpecularScale",new A.h(B.c,g.cy))
A.f(p,"uClearcoatStrength",new A.h(B.c,r.ch))
A.f(p,"uClearcoatRoughness",new A.h(B.c,r.CW))
A.f(p,"uOcclusionStrength",new A.h(B.c,1))
A.f(p,"uLightmapIntensity",new A.h(B.c,0))
A.f(p,"uReceivesShadow",new A.h(B.c,f?1:0))
A:{q=null
if(B.r===c){switch(d.a){case 0:q=B.bY
break
case 1:q=B.bX
break}break A}if(B.L===c||B.bW===c){q=s.a.W()
break A}}A.aa(p,q)},
cL(a,b){var s=b.ad(),r=a.a
A.f(r,"uModel",new A.h(B.t,new Float32Array(A.t(s.a))))
A.f(r,"uNormalMatrix",new A.h(B.t,new Float32Array(A.t(s.c2().a))))},
$iD:1,
gq(){return this.a}}
A.fG.prototype={
gN(){return"ssaoOcclusion"},
a1(a,b){B.a.i(a.a,new A.P("ssaoOcclusion",B.a9,A.b([new A.p(this.w,B.j)],t.C),!1))},
a0(a){var s=this,r="ssaoOcclusion",q=s.a.a2(new A.ad(r,s.b,s.c,B.w,B.aX,B.d_)),p=A.aS(s.d)
return A.b([new A.hl(new A.a8(r,A.b([new A.p(s.w,B.j)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iI:1}
A.hl.prototype={
Y(a){var s,r,q,p=this,o=a.b,n=a.d.f.c,m=o.a
A.ap(m,a.Z("ssaoRaw").b)
A.aa(m,p.a.W())
if(n<=0){A.b0(m,B.G,1,1,1,1)
return}A.b0(m,B.G,1,0,0,0)
s=p.e.$0()
A.au(m,p.b.b)
A.S(m,0,t.j.a(p.d.$0()))
A.f(m,"uSceneDepth",B.v)
A.f(m,"uNear",new A.h(B.c,s.f))
A.f(m,"uFar",new A.h(B.c,s.r))
r=s.b.a
q=r.length
if(0>=q)return A.d(r,0)
A.f(m,"uProjScaleX",new A.h(B.c,r[0]))
if(5>=q)return A.d(r,5)
A.f(m,"uProjScaleY",new A.h(B.c,r[5]))
A.f(m,"uRadius",new A.h(B.c,p.f))
A.f(m,"uStrength",new A.h(B.c,n))
A.ae(m,p.c)
o.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.fF.prototype={
gN(){return"ssaoBlur"},
a1(a,b){B.a.i(a.a,new A.P("ssaoBlur",B.a9,A.b([new A.p(this.y,B.h),new A.p(this.z,B.j)],t.C),!1))},
a0(a){var s=this,r="ssaoBlur",q=s.a.a2(new A.ad(r,s.b,s.c,B.w,B.dy,B.du)),p=A.aS(s.d)
return A.b([new A.hk(new A.a8(r,A.b([new A.p(s.y,B.h),new A.p(s.z,B.j)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iI:1}
A.hk.prototype={
Y(a){var s,r,q=this,p=a.b,o=p.a
A.ap(o,a.Z("ssaoBlurred").b)
A.aa(o,q.a.W())
if(a.d.f.c<=0){A.b0(o,B.G,1,1,1,1)
return}A.b0(o,B.G,1,0,0,0)
s=q.f.$0()
A.au(o,q.b.b)
r=t.j
A.S(o,0,r.a(q.d.$0()))
A.f(o,"uSsaoRaw",B.v)
A.S(o,1,r.a(q.e.$0()))
A.f(o,"uSceneDepth",B.O)
A.f(o,"uTexelSize",new A.h(B.N,new Float32Array(A.t(A.b([1/q.r,1/q.w],t.n)))))
A.f(o,"uNear",new A.h(B.c,s.f))
A.f(o,"uFar",new A.h(B.c,s.r))
A.ae(o,q.c)
p.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.fQ.prototype={
gN(){return"vhs"},
a1(a,b){var s=this.w
a.b.i(0,s.a)
B.a.i(a.a,new A.P("vhs",B.E,A.b([new A.p(this.r,B.h),new A.p(s,B.F),new A.p(s,B.j)],t.C),!1))},
a0(a){var s=this,r=s.a.a2(new A.ad("vhs",s.b,s.c,B.w,B.dz,B.d4)),q=A.aS(s.d),p=s.r,o=s.w
return A.b([new A.hq(new A.a8("vhs",A.b([new A.p(p,B.h),new A.p(o,B.F),new A.p(o,B.j)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iI:1}
A.hq.prototype={
Y(a){var s=this,r=a.Z(s.f.a),q=a.Z(s.r.a),p=a.b,o=a.d.f,n=p.a
A.ap(n,q.b)
A.aa(n,s.a.W())
A.au(n,s.b.b)
A.S(n,0,r.b)
A.f(n,"uScene",B.v)
A.S(n,1,t.j.a(s.d.$0()))
A.f(n,"uHistory",B.O)
A.f(n,"uTime",new A.h(B.c,s.e.$0()))
A.f(n,"uChromaWeight",new A.h(B.c,o.ch))
A.f(n,"uTrackingWeight",new A.h(B.c,o.CW))
A.f(n,"uNoiseWeight",new A.h(B.c,o.cx))
A.f(n,"uHeadSwitchWeight",new A.h(B.c,o.cy))
A.f(n,"uDropoutWeight",new A.h(B.c,o.db))
A.f(n,"uGhostWeight",new A.h(B.c,o.dx))
A.ae(n,s.c)
p.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.fR.prototype={
gN(){return"volumetricLight"},
a1(a,b){var s=this,r=s.w,q=t.C,p=a.a
B.a.i(p,new A.P("volumetricLight",B.a9,A.b([new A.p(s.x,B.h),new A.p(r,B.j)],q),!1))
B.a.i(p,new A.P("volumetricComposite",B.E,A.b([new A.p(r,B.h),new A.p(s.y,B.h),new A.p(s.z,B.j)],q),!1))},
a0(a){var s,r,q,p,o,n,m=this,l="volumetricLight",k="volumetricComposite",j=m.a,i=m.b,h=j.a2(new A.ad(l,i,m.c,B.w,B.aX,B.d5)),g=m.e,f=A.aS(g),e=m.Q
B.a.i(e,f)
s=m.w
r=t.C
q=A.b([new A.hs(new A.a8(l,A.b([new A.p(m.x,B.h),new A.p(s,B.j)],r),!1,!1,!1,!1),h,f,s.a,m.f,m.r)],t.u)
p=m.z
o=j.a2(new A.ad(k,i,m.d,B.w,B.dH,B.dv))
n=A.aS(g)
B.a.i(e,n)
B.a.i(q,new A.hr(new A.a8(k,A.b([new A.p(s,B.h),new A.p(m.y,B.h),new A.p(p,B.j)],r),!1,!1,!0,!1),o,n,s,p))
return q},
$iI:1}
A.hs.prototype={
Y(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this,a1=a7.Z(a0.d),a2=a7.b,a3=a0.f.$0(),a4=a7.d.d,a5=a4.go,a6=a2.a
A.ap(a6,a1.b)
A.aa(a6,a0.a.W())
A.b0(a6,B.G,1,0,0,0)
A.au(a6,a0.b.b)
A.S(a6,0,t.j.a(a0.e.$0()))
A.f(a6,"uSceneDepth",B.v)
A.f(a6,"uNear",new A.h(B.c,a3.f))
A.f(a6,"uFar",new A.h(B.c,a3.r))
A.f(a6,"uViewProjection",new A.h(B.t,new Float32Array(A.t(a3.c.a))))
s=a3.a.a
A.f(a6,"uView",new A.h(B.t,new Float32Array(A.t(s))))
A.f(a6,"uInverseProjection",new A.h(B.t,new Float32Array(A.t(a3.gd7().a))))
r=a5==null
A.f(a6,"uShaftIntensity",new A.h(B.c,r?0:a5.c*0.15))
A.f(a6,"uFogDensity",new A.h(B.c,0))
A.f(a6,"uAnisotropy",new A.h(B.c,a4.y))
q=a4.r
p=t.n
A.f(a6,"uVolumetricAlbedo",new A.h(B.l,new Float32Array(A.t(A.b([q.a,q.b,q.c],p)))))
A.f(a6,"uVolumetricHeightFalloff",new A.h(B.c,a4.w))
A.f(a6,"uVolumetricDustDensity",new A.h(B.c,a4.x))
A.f(a6,"uVolumetricJitter",new A.h(B.c,a4.z))
A.f(a6,"uVolumetricIntensity",new A.h(B.c,a4.Q))
A.f(a6,"uVolumetricSampleCount",new A.h(B.c,a4.as))
if(r)o=B.d
else{q=a5.a.gm()
n=q.a
m=s.length
if(0>=m)return A.d(s,0)
l=s[0]
k=q.b
if(4>=m)return A.d(s,4)
j=s[4]
q=q.c
if(8>=m)return A.d(s,8)
i=s[8]
h=s[1]
g=s[5]
if(9>=m)return A.d(s,9)
f=s[9]
e=s[2]
d=s[6]
if(10>=m)return A.d(s,10)
o=new A.a(n*l+k*j+q*i,n*h+k*g+q*f,n*e+k*d+q*s[10]).gm()}c=r?null:a5.b
if(c==null)c=B.H
A.f(a6,"uLightDir",new A.h(B.l,new Float32Array(A.t(A.b([o.a,o.b,o.c],p)))))
A.f(a6,"uLightColor",new A.h(B.l,new Float32Array(A.t(A.b([c.a,c.b,c.c],p)))))
b=A.qW(4,a3.d,a4.k2)
A.f(a6,"uVolumetricSourceCount",new A.h(B.c,b.length))
for(a=0;a<4;++a){s=b.length
if(a<s)if(!(a<s))return A.d(b,a)
s=""+a
A.f(a6,"uSourcePosition"+s,new A.h(B.l,new Float32Array(A.t(A.b([0,0,0],p)))))
A.f(a6,"uSourceColor"+s,new A.h(B.l,new Float32Array(A.t(A.b([0,0,0],p)))))
A.f(a6,"uSourceIntensity"+s,new A.h(B.c,0))
A.f(a6,"uSourceReferenceDistance"+s,new A.h(B.c,1))
A.f(a6,"uSourceCutoffDistance"+s,new A.h(B.c,1))}A.ae(a6,a0.c)
a2.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.hr.prototype={
Y(a){var s=this,r=a.aP(s.e),q=a.aP(s.d),p=a.b,o=p.a
A.ap(o,r.b)
A.n_(o,1)
A.aa(o,B.aI)
A.au(o,s.b.b)
A.S(o,0,q.b)
A.f(o,"uVolumetric",B.v)
A.f(o,"uVolumetricStrength",B.bi)
A.ae(o,s.c)
p.a4(3,0)},
$iD:1,
gq(){return this.a}}
A.dL.prototype={}
A.fU.prototype={
gN(){return"world"},
a1(a,b){B.a.i(a.a,new A.P("worldOpaqueTransparent",B.aM,A.b([new A.p(this.e,B.j)],t.C),!1))},
a0(a){var s=this,r=s.a.a2(new A.ad("safeWorld",s.b,s.c,B.dI,B.w,B.df)),q=s.e
return A.b([new A.hv(new A.a8("worldOpaqueTransparent",A.b([new A.p(q,B.j)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iI:1}
A.hv.prototype={
Y(a){var s,r,q,p,o,n=this,m=a.b,l=a.d,k=l.d,j=m.a
A.ap(j,a.Z(n.d).b)
A.aa(j,n.a.W())
s=k.a
A.b0(j,B.aG,1,s.c,s.b,s.a)
A.au(j,n.b.b)
A.f(j,"uViewProjection",new A.h(B.t,new Float32Array(A.t(l.c.c.a))))
r=k.go
q=r==null?null:r.a
if(q==null)q=B.d
s=t.n
A.f(j,"uLightDir",new A.h(B.l,new Float32Array(A.t(A.b([q.a,q.b,q.c],s)))))
p=k.fx
A.f(j,"uAmbientColor",new A.h(B.l,new Float32Array(A.t(A.b([p.a,p.b,p.c],s)))))
A.f(j,"uAmbientIntensity",new A.h(B.c,k.fy))
A.f(j,"uAmbientLightScale",new A.h(B.c,k.ax))
A.f(j,"uDirectLightScale",new A.h(B.c,k.ay))
for(j=l.a,s=j.length,o=0;o<j.length;j.length===s||(0,A.C)(j),++o)n.cw(m,j[o])
for(l=l.b,j=l.length,o=0;o<l.length;l.length===j||(0,A.C)(l),++o)n.cw(m,l[o])},
cw(a,b){var s,r,q,p,o,n=this
if(b instanceof A.bg){s=b.a
n.cI(a,s.gq().c)
A.ld(a,b,!0)
r=n.c.$1(s.gq().a)
A.ae(a.a,r.a)
q=r.b
p=r.c
o=b.b.length
if(q)a.bT(p,r.d,o,0)
else a.bR(p,0,o)}else if(t.Y.b(b)){q=a.a
A.f(q,"uUseInstances",B.av)
n.cI(a,b.gq().c)
r=n.c.$1(b.gq().a)
A.ae(q,r.a)
q=r.b
p=r.c
if(q)a.bS(p,r.d,0)
else a.a4(p,0)}else throw A.c(A.i("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.ev(b).j(0),null))},
cI(a,b){var s=b.ad(),r=a.a
A.f(r,"uModel",new A.h(B.t,new Float32Array(A.t(s.a))))
A.f(r,"uNormalMatrix",new A.h(B.t,new Float32Array(A.t(s.c2().a))))},
$iD:1,
gq(){return this.a}}
A.f8.prototype={
D(){return"LoopMode."+this.b}}
A.b5.prototype={}
A.bT.prototype={
eb(a){var s,r,q,p,o,n,m,l=this.b
if(a<=B.a.gaZ(l).a)return new A.c8(B.a.gaZ(l),B.a.gaZ(l),0)
if(a>=B.a.gbq(l).a)return new A.c8(B.a.gbq(l),B.a.gbq(l),1)
s=l.length
r=s-1
q=0
for(;;){if(!(q<r&&l[q+1].a<=a))break;++q}if(!(q<s))return A.d(l,q)
p=l[q]
r=q+1
if(!(r<s))return A.d(l,r)
o=l[r]
r=p.a
n=o.a-r
m=n>0.000001?(a-r)/n:0
return new A.c8(p,o,A.mm(B.b.l(m,0,1)))}}
A.ij.prototype={
$2(a,b){var s=this.a.h("b5<0>")
return B.e.S(s.a(a).a,s.a(b).a)},
$S(){return this.a.h("j(b5<0>,b5<0>)")}}
A.jv.prototype={
D(){return"Vector3Property."+this.b}}
A.fP.prototype={
eX(a){var s=this.eb(a),r=s.a.b,q=r.v(0,s.b.b.P(0,r).k(0,s.c))
switch(0){case 0:this.a.sam(q)
break}}}
A.hB.prototype={
au(a){var s,r,q,p,o,n,m,l=this
switch(l.c.a){case 0:s=B.b.l(a,0,l.b)
break
case 1:r=l.b
s=B.b.F(a,r)
if(s<0)s+=r
break
case 2:r=l.b
q=B.b.ab(a/r)
p=B.b.F(a,r)
o=p<0?p+r:p
s=(q&1)===0?o:r-o
break
default:s=a}for(r=l.d,n=r.length,m=0;m<n;++m)r[m].eX(s)}}
A.cN.prototype={
a7(a){var s,r=this,q=r.b+a*r.c
r.b=q
s=r.a
s.au(q)
if(s.c===B.dw&&r.b>=s.b)return!1
return!0}}
A.hC.prototype={
a7(a){this.a.fl(0,new A.hD(a))}}
A.hD.prototype={
$2(a,b){A.K(a)
return!t.aQ.a(b).a7(this.a)},
$S:63}
A.f1.prototype={
ae(){this.fr=null
this.dF()},
gaQ(){var s,r,q,p,o,n,m,l,k,j=this,i=j.y
if(i==null){s=j.z
i=s==null?null:s.d}if(i==null||j.cy.length===0)return null
s=j.fr
if(s==null){r=j.gaC()
s=j.cy
if(0>=s.length)return A.d(s,0)
q=r.k(0,s[0]).ad()
p=i.gaz()
o=A.H(p)
n=A.cj(new A.M(p,o.h("a(1)").a(q.gaB()),o.h("M<1,a>")))
for(m=1;m<s.length;++m){q=r.k(0,s[m]).ad()
p=i.gaz()
o=A.H(p)
l=A.cj(new A.M(p,o.h("a(1)").a(q.gaB()),o.h("M<1,a>")))
o=n.a
q=l.a
p=n.b
k=l.b
n=new A.a5(new A.a(Math.min(o.a,q.a),Math.min(o.b,q.b),Math.min(o.c,q.c)),new A.a(Math.max(p.a,k.a),Math.max(p.b,k.b),Math.max(p.c,k.c)))}j.fr=n
s=n}return s},
b6(b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9=a8.w,b0=a8.x
if(a9==null||b0==null||a8.cy.length===0)a8.dW(b1)
else{s=a8.gaC()
r=a8.dy!==s
if(a8.dx||r){q=a8.CW
for(p=a8.db,o=a8.cy,n=b1.b,m=b1.c;p.length>o.length;){l=p.pop()
n.aN(l)
m.ac(0,l)}for(l=b1.a,k=l.$ti,j=k.c,i=l.b,h=a8.as,g=a8.at,k=k.y[1],f=n.$ti,e=f.c,f=f.y[1],d=n.b,c=0;c<o.length;++c){b=s.k(0,o[c])
a=new A.b9(a9,b0,b,a8.Q,h,g,!0,!0,q)
if(c<p.length){a0=p[c]
b.p()
j.a(a9)
l.ap(a9)
a1=a9.a
if(!(a1>=0&&a1<i.length))return A.d(i,a1)
a2=i[a1].c
a1=(a2==null?k.a(a2):a2).d
a3=b.ad()
a1=a1.gaz()
a4=A.H(a1)
a5=A.cj(new A.M(a1,a4.h("a(1)").a(a3.gaB()),a4.h("M<1,a>")))
e.a(a0)
f.a(a)
n.ap(a0)
a4=a0.a
if(!(a4>=0&&a4<d.length))return A.d(d,a4)
d[a4].sbi(a)
m.K(0,a0,new A.bH(a0,a,a5))}else{b.p()
j.a(a9)
l.ap(a9)
a0=a9.a
if(!(a0>=0&&a0<i.length))return A.d(i,a0)
a2=i[a0].c
a0=(a2==null?k.a(a2):a2).d
a1=b.ad()
a0=a0.gaz()
a3=A.H(a0)
a5=A.cj(new A.M(a0,a3.h("a(1)").a(a1.gaB()),a3.h("M<1,a>")))
a6=n.d0(a)
m.K(0,a6,new A.bH(a6,a,a5))
B.a.i(p,a6)}}a8.dy=s
a8.dx=!1}}for(p=A.aN(a8.r,t.dB),o=p.length,a7=0;a7<o;++a7)p[a7].b6(b1)},
dW(a){var s,r,q,p,o,n
for(s=this.db,r=s.length,q=a.b,p=a.c,o=0;o<s.length;s.length===r||(0,A.C)(s),++o){n=s[o]
q.aN(n)
p.ac(0,n)}B.a.a3(s)}}
A.ba.prototype={
ci(a,b,c,d,e,f,g,h,i,j,k,l,m){var s
if(this.y==null){s=this.z
this.y=s==null?null:s.d}},
sam(a){var s=this.b
this.b=new A.O(a,s.b,s.c)
this.ae()},
sdg(a){var s=this.b
this.b=new A.O(s.a,a,s.c)
this.ae()},
scb(a){var s=this.b
this.b=new A.O(s.a,s.b,a)
this.ae()},
bs(a,b){var s=A.ai(a,b)
this.sdg(this.b.b.k(0,s))},
gaC(){var s,r=this
if(r.d){s=r.f
r.c=s!=null?s.gaC().k(0,r.b):r.b
r.d=!1}return r.c},
ae(){var s,r,q,p=this
if(p.d)return
p.e=p.d=!0
for(s=p.r,r=s.length,q=0;q<s.length;s.length===r||(0,A.C)(s),++q)s[q].ae()},
bO(a){var s=a.f
if(s===this)return
if(s!=null)if(B.a.ac(s.r,a)){a.f=null
a.ae()}a.f=this
a.ae()
B.a.i(this.r,a)},
aH(a,b,c,d,e,f){var s=A.lA(B.y,null,!0,B.L,null,b,c,d,e,!0,0,f,-1)
this.bO(s)
return s},
bg(a,b,c,d,e){return this.aH(0,b,c,d,e,B.A)},
gaQ(){var s,r,q=this.y
if(q==null)q=null
else{s=this.gaC().ad()
q=q.gaz()
r=A.H(q)
r=A.cj(new A.M(q,r.h("a(1)").a(s.gaB()),r.h("M<1,a>")))
q=r}return q},
fj(a){var s={}
s.a=null
new A.jd(s,a).$1(this)
return s.a},
b6(a){var s,r,q,p,o=this,n=o.w,m=o.x
if(n!=null&&m!=null){s=o.cx
if(s==null){o.cx=a.ex(new A.b9(n,m,o.gaC(),o.Q,o.as,o.at,!0,!0,o.CW))
o.e=!1}else if(o.e||o.d){a.fK(s,new A.b9(n,m,o.gaC(),o.Q,o.as,o.at,!0,!0,o.CW))
o.e=!1}}else{r=o.cx
if(r!=null){a.fk(r)
o.cx=null
o.e=!0}}for(r=o.r,q=r.length,p=0;p<r.length;r.length===q||(0,A.C)(r),++p)r[p].b6(a)}}
A.jd.prototype={
$1(a){var s,r,q,p,o,n,m=a.gaQ()
if(m!=null){s=this.b
r=s.fb(m)
if(r!=null){q=this.a
p=q.a
if(p==null||r<p.d){o=s.a.v(0,s.b.k(0,r))
o.P(0,m.a.v(0,m.b).k(0,0.5)).gm()
q.a=new A.j2(a,o,r,null)}}}for(s=a.r,q=s.length,n=0;n<s.length;s.length===q||(0,A.C)(s),++n)this.$1(s[n])},
$S:64}
A.ia.prototype={
D(){return"GpuBufferUsage."+this.b}}
A.eV.prototype={
D(){return"GpuBufferKind."+this.b}}
A.eY.prototype={
D(){return"GpuTextureFilter."+this.b}}
A.eZ.prototype={
D(){return"GpuTextureWrap."+this.b}}
A.eU.prototype={}
A.eX.prototype={}
A.cv.prototype={
D(){return"GpuTargetAttachment."+this.b}}
A.dk.prototype={}
A.eW.prototype={
D(){return"GpuDeviceStatus."+this.b}}
A.cI.prototype={
D(){return"ShaderCompileStage."+this.b}}
A.dQ.prototype={
j(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.bq.prototype={
D(){return"UniformType."+this.b}}
A.h.prototype={}
A.d9.prototype={
D(){return"ClearMask."+this.b}}
A.eO.prototype={
a4(a,b){var s=this.a
if(s.b!==B.i)A.l(A.m(u.k))
s.a.drawArrays(A.e(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.aG(a,1)},
bR(a,b,c){var s=this.a
if(s.b!==B.i)A.l(A.m(u.k))
s.a.drawArraysInstanced(A.e(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.aG(a,c)},
bS(a,b,c){var s,r,q=this.a
if(q.b!==B.i)A.l(A.m(u.k))
s=v.G
r=A.e(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.e(s.WebGL2RenderingContext.UNSIGNED_INT):A.e(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.aG(a,1)},
bT(a,b,c,d){var s,r,q=this.a
if(q.b!==B.i)A.l(A.m(u.k))
s=v.G
r=A.e(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.e(s.WebGL2RenderingContext.UNSIGNED_INT):A.e(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.ak(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.aG(a,c)},
$io8:1}
A.ct.prototype={}
A.dF.prototype={
ak(a,b,c,d){var s,r,q,p,o,n,m,l,k="resource library is disposed",j=this.b,i=j.gu()
if(i.x)A.l(A.m(k))
s=i.c
if(d>0)r=c<=0
else r=!0
if(r)A.l(A.i("TextureStore.declare dimensions/layers must be > 0",null))
if(!isFinite(16))A.l(A.i("TextureStore.declare anisotropy must be in [1, 16]: 16",null))
r=s.b
q=t.aD
p=r.bj(new A.bb(new A.eX(d,c,1,!0,B.c9,B.a8,B.cb,16),A.du(1,null,!1,q),!1),b)
o=r.aJ(p)
n=A.af(o.b,q)
B.a.K(n,0,a)
q=o.a
r.c7(p,new A.bb(q,n,o.c))
r=s.c
m=p.a
l=r.C(0,m)
if(l==null){l=A.lC(s.a,q)
r.K(0,m,l)}A.lD(s.a,l,0,a)
i.w.i(0,p)
j=j.gu()
if(j.x)A.l(A.m(k))
j.c.f1(p)
return p},
fi(a,b){var s,r,q,p,o,n,m,l,k=this,j=A.k(k.a.getBoundingClientRect()),i=a-A.aV(j.left),h=b-A.aV(j.top)
if(i<0||i>A.aV(j.width)||h<0||h>A.aV(j.height))return null
s=k.y
r=k.x
q=r.c/r.d
p=s!=null?s.b3(q):A.eE(q,B.bk,200,B.bm,1,0.1,B.d)
r=B.b.c6(A.aV(j.width))
o=B.b.c6(A.aV(j.height))
if(r<=0||o<=0)A.l(A.i("Viewport dimensions must be > 0",null))
n=i/r*2-1
m=1-h/o*2
r=p.gfc()
l=r.ai(new A.a(n,m,-1))
return k.e.fj(new A.j1(p.d,r.ai(new A.a(n,m,1)).P(0,l).gm()))},
cd(b9,c0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8=this
new A.ji(b9,0.65,0.35,c0,2,2.5).p()
s=B.b.F(B.b.F(b9,24)+24,24)
r=A.mR(s,12)*3.141592653589793/12
q=Math.sin(0.65)
p=Math.cos(0.65)
o=q*Math.sin(0.35)
n=p*Math.cos(0.35)
m=o+n*Math.cos(r)
l=Math.asin(B.b.l(m,-1,1))
k=Math.cos(l)
j=Math.atan2(Math.sin(r),Math.cos(r)*q-Math.tan(0.35)*p)
i=new A.a(Math.sin(j)*k,Math.sin(l),Math.cos(j)*k).gm()
if(Math.abs(n)<1e-12)h=m>0?-2:2
else h=(Math.sin(-0.014538592669112763)-o)/n
g=h>-1&&h<1
f=g?Math.acos(h)*12/3.141592653589793:0
e=B.b.F(B.b.F(12-f,24)+24,24)
d=B.b.F(B.b.F(12+f,24)+24,24)
o=!g
c=o&&m>0
A.p4(l,s,c,o&&!c,12)
b=2+c0*3.5+0
a=A.p3(Math.max(0,1.5707963267948966-l))
n=B.b.l(Math.exp(-(0.0046416*a*b)),0,1)
a0=B.b.l(Math.exp(-(0.010846399999999999*a*b)),0,1)
a1=B.b.l(Math.exp(-(0.02648*a*b)),0,1)
a2=B.b.l(Math.exp(-(c0*2.2)),0,1)
a3=A.mS(-0.3141592653589793,0.10471975511965977,l)
a4=A.mS(-0.014538592669112763,0.03490658503988659,l)
a5=Math.max(0,Math.sin(l)+a4*0.018)
a6=n*0.2126+a0*0.7152+a1*0.0722
a7=2.5*Math.pow(a5,0.35)*a6*a2
a8=B.b.l(a5*a6,0,1)
a9=0.42*a8
b0=1-c0
b1=0.055+a9*(0.55+0.45*b0)+a3*(0.028+0.018*b0)
b2=0.0015*(2.12+c0*0.8)
b0=0.035+n*0.18+c0*0.1
b3=0.045+a0*0.2+c0*0.12
b4=0.07+a1*0.24+c0*0.16+a3*0.018
b5=new A.v(b0,b3,b4)
b6=new A.v(n,a0,a1)
a9=new A.v(0.14+0.38*a8,0.16+a9,0.22+0.52*a8)
if(!isFinite(s)||!isFinite(e)||!isFinite(d)||!isFinite(l)||!isFinite(a3)||!isFinite(a4)||!isFinite(j)||!isFinite(a7)||!isFinite(b1)||!isFinite(b2)||!isFinite(0.06)||!i.gE(0)||!new A.a(n,a0,a1).gE(0)||!b6.gE(0)||!a9.gE(0)||!b5.gE(0))A.l(A.m("solar lighting state is not finite"))
if(i.gO()<0.999||i.gO()>1.001||a7<0||b1<0||b2<0||a2<0||a2>1||a3<0||a3>1||a4<0||a4>1)A.l(A.m("solar lighting state is out of bounds"))
new A.cr(i,b6,a7).p()
o=b8.f.eM(a9,b1,new A.cr(i,b6,a7),b5)
b8.f=o
b7=o.k4
if(b7!=null){o=B.b.l(b0*0.4+0.02,0,1)
n=B.b.l(b3*0.5+0.04,0,1)
a0=B.b.l(b4*0.8+0.08,0,1)
b8.f=b8.f.cZ(new A.dR(b7.a,b7.b,b5,new A.v(o,n,a0),new A.v(B.b.l(b0*0.2,0,1),B.b.l(b3*0.2,0,1),B.b.l(b4*0.2,0,1)),B.b.l(a4*0.25,0,1),B.b.l((1-a3)*0.008,0,0.1),b7.w,b7.x,!0,b7.z,b7.Q,b7.as,b7.at,b7.ax,b7.ay,b7.ch,b7.CW,b7.cx,b7.cy,b7.db))}},
bU(a,b,c,d){this.f=this.f.eO(a,null,b,c,d)},
eT(a,b,c){return this.bU(a,b,null,c)},
ee(){var s,r=this,q=v.G
A.k(q.window).addEventListener("resize",A.E(new A.iG(r)))
s=r.a
s.addEventListener("webglcontextlost",A.E(new A.iH(r)))
s.addEventListener("webglcontextrestored",A.E(new A.iI(r)))
s.addEventListener("contextmenu",A.E(new A.iJ()))
s.addEventListener("mousedown",A.E(new A.iK(r)))
A.k(q.window).addEventListener("mousemove",A.E(new A.iL(r)))
A.k(q.window).addEventListener("mouseup",A.E(new A.iM(r)))
s.addEventListener("wheel",A.E(new A.iN(r)))
A.k(q.window).addEventListener("keydown",A.E(new A.iO(r)))
A.k(q.window).addEventListener("keyup",A.E(new A.iP(r)))},
cT(){var s,r,q,p,o=this.y
if(o instanceof A.bQ){s=this.as
r=s.A(0,"keyw")||s.A(0,"arrowup")?1:0
if(s.A(0,"keys")||s.A(0,"arrowdown"))--r
q=s.A(0,"keya")||s.A(0,"arrowleft")?-1:0
if(s.A(0,"keyd")||s.A(0,"arrowright"))++q
p=s.A(0,"space")||s.A(0,"keye")?1:0
o.z=new A.a(q,s.A(0,"shiftleft")||s.A(0,"keyq")?p-1:p,r)}},
cF(){var s,r=this,q=r.a,p=A.e(q.clientWidth)>0?A.e(q.clientWidth):A.e(q.width),o=A.e(q.clientHeight)>0?A.e(q.clientHeight):A.e(q.height),n=r.x
if(p===n.a&&o===n.b)return
n=n.e
n=A.mU(o,p,n,n,!0)
r.x=n
q.width=n.c
q.height=r.x.d
try{q=r.x
r.b.b9()
q.p()
r.d.c_("surface resized")}catch(s){}},
dz(){var s=this
if(s.CW)return
s.CW=!0
s.cx=0
A.e(A.k(v.G.window).requestAnimationFrame(A.E(s.gcP())))},
er(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this
A.aV(a0)
if(!a.CW)return
s=a0/1000
r=a.cx
q=r>0?s-r:0.016666666666666666
a.cx=s
a.cF()
if(!a.cy&&a.b.e!==B.ah){a.at.a7(q)
r=a.c
a.e.b6(r)
p=a.y
o=p!=null
if(o)p.a7(q)
n=a.z
n.a7(q)
m=a.x
l=m.c/m.d
k=n.eA(o?p.b3(l):A.eE(l,B.bk,200,B.bm,1,0.1,B.d))
n=a.d
m=a.f
j=a.r
i=n.a
h=new A.i3(k,m,j,-1,i,s)
n.a=i+1
o=a.b
g=o.eB(r,h)
for(r=a.ax,f=0;f<r.length;++f)r[f].bx(g,h)
for(r=a.ay,f=0;f<r.length;++f){r[f].a7(q)
if(!(f<r.length))return A.d(r,f)
r[f].bx(g,h)}o.gu()
r=a.ch
if(r!=null)r.$1(new A.ct(s,q))
e=o.eU()
if(a.w){r=a.go+=q
o=++a.id
if(r>=0.5){a.k1=o/r
a.id=a.go=0
d=a.fy
if(d==null){r=v.G
d=A.k(A.k(r.document).createElement("div"))
A.k(d.style).position="absolute"
A.k(d.style).left="12px"
A.k(d.style).top="12px"
A.k(d.style).padding="8px 12px"
A.k(d.style).backgroundColor="rgba(10, 12, 16, 0.85)"
A.k(d.style).color="#00ffaa"
A.k(d.style).fontFamily="monospace"
A.k(d.style).fontSize="12px"
A.k(d.style).lineHeight="1.4"
A.k(d.style).borderRadius="4px"
A.k(d.style).pointerEvents="none"
A.k(d.style).zIndex="9999"
c=A.u(a.a.parentElement)
if(c==null)c=A.u(A.k(r.document).body)
if(c!=null)A.k(c.appendChild(d))
a.fy=d}b=B.b.a6(q*1000,1)
d.innerText="FPS: "+B.b.a6(a.k1,0)+" ("+b+" ms)\nDraws: "+e.b+" | Tris: "+e.c+"\nInstances: "+e.e+" | VRAM: "+B.b.a6(e.r/1024,0)+" KB"}}}A.e(A.k(v.G.window).requestAnimationFrame(A.E(a.gcP())))},
sfg(a){this.ch=t.a4.a(a)}}
A.iR.prototype={
$1(a){var s=this.a,r=a.a===B.ae?2:1,q=a===B.b3?0:1
return new A.dK(a,s.c,s.d,r,q)},
$S:66}
A.iG.prototype={
$1(a){A.k(a)
return this.a.cF()},
$S:12}
A.iH.prototype={
$1(a){var s
A.k(a)
s=this.a
s.cy=!0
s.d.c_("gl context lost")},
$S:0}
A.iI.prototype={
$1(a){var s
A.k(a)
s=this.a
s.cy=!1
s.d.c_("gl context restored")},
$S:0}
A.iJ.prototype={
$1(a){A.k(a).preventDefault()},
$S:0}
A.iK.prototype={
$1(a){var s
A.k(a)
s=this.a
s.dx=!0
s.dy=A.e(a.button)
s.fr=A.e(a.clientX)
s.fx=A.e(a.clientY)},
$S:0}
A.iL.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
A.k(a)
s=this.a
if(s.dx)r=s.y!=null
else r=!1
if(r){q=A.e(a.clientX)
p=A.e(a.clientY)
o=q-s.fr
n=p-s.fx
s.fr=q
s.fx=p
m=s.y
if(m instanceof A.bC)if(s.dy===0&&!A.c9(a.shiftKey)){m.ax+=o*0.006
m.ay=B.b.l(m.ay+n*0.006,-1.5079644737231006,1.5079644737231006)}else{s=m.b
l=m.gdf()
k=m.gdf().R(m.a.P(0,m.gbV()).gm()).gm()
j=l.k(0,-o*0.003*s).v(0,k.k(0,n*0.003*s))
m.CW=m.CW.v(0,j)}else if(m instanceof A.bQ){m.b+=o*0.003
m.c=B.b.l(m.c-n*0.003,-1.5393804002589986,1.5393804002589986)}else if(m instanceof A.cJ){m.z+=o*0.006
m.Q=B.b.l(m.Q+-n*0.006,-1.0995574287564276,1.2566370614359172)}}},
$S:0}
A.iM.prototype={
$1(a){A.k(a)
this.a.dx=!1},
$S:0}
A.iN.prototype={
$1(a){var s,r,q
A.k(a)
s=this.a
r=s.y
if(r!=null){a.preventDefault()
q=s.y
if(q instanceof A.bC){s=A.aV(a.deltaY)
q.ch=B.b.l(q.ch+s*0.003,0.5,100)}else if(q instanceof A.bQ){s=A.aV(a.deltaY)
q.a=q.a.v(0,q.gaL().k(0,q.d*(-s*0.002)))}else if(q instanceof A.cJ){s=A.aV(a.deltaY)
q.d=B.b.l(q.d+s*0.003,1.5,40)}}},
$S:0}
A.iO.prototype={
$1(a){var s=this.a
s.as.i(0,A.K(A.k(a).code).toLowerCase())
s.cT()},
$S:0}
A.iP.prototype={
$1(a){var s=this.a
s.as.ac(0,A.K(A.k(a).code).toLowerCase())
s.cT()},
$S:0}
A.fs.prototype={
da(a){var s=this.b.C(0,a)
if(s==null)throw A.c(A.m("resource is not in candidate: "+a))
return s}}
A.ib.prototype={
gt(){var s=this.c
if(s==null)throw A.c(A.m("GPU resource adapter is not initialized"))
return s},
aa(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.e2(s.b)
r.b.aa()
r.c=null
r.e=!0},
cu(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.aC(a0,a1),a3=A.b([],t.J)
try{k=a4.a
j=k.$ti
i=j.h("y(1)")
j=j.h("ab<1>")
s=new A.ab(k,i.a(new A.ic()),j)
for(h=s,g=J.ac(h.a),h=new A.Q(g,h.b,h.$ti.h("Q<1>")),f=a.a;h.n();){r=g.gt()
q=A.n5(f,a.cv(r,a5))
J.hz(a3,q)
J.hy(a2,r,q)}e=A.af(new A.ab(k,i.a(new A.id()),j),j.h("n.E"))
B.a.dw(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.C)(k),++d){o=k[d]
n=A.qN(J.nW(o,11))
if(i){h=J.li(a2,"sceneColor")
h.toString
J.hy(a2,o,h)}else{h=n
if(typeof h!=="number")return h.dm()
if(h>=2){h=J.li(a2,"sceneColor#1")
h.toString
J.hy(a2,o,h)}else{m=A.n5(f,a.cv(o,a5))
J.hz(a3,m)
J.hy(a2,o,m)}}}a0=A.ml(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.H(a0).h("dO<1>"),a0=new A.dO(a0,k),a0=new A.at(a0,a0.gB(0),k.h("at<T.E>")),j=a.a,i=t.V,k=k.h("T.E");a0.n();){h=a0.d
l=h==null?k.a(h):h
b=i.a(a1.a(l).a)
A.lE(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}throw c}},
cv(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.dk(512,512,1,B.a7,!0)
if(a==="sceneDepth")return new A.dk(n,m,1,B.a7,!0)
s=B.z.av(a,"ssao")||B.z.av(a,"bloomBlur")||B.z.av(a,"dofBlur")||B.z.av(a,"volumetricLight")
r=s?B.e.a_(n+1,2):n
q=s?B.e.a_(m+1,2):m
p=a==="sceneColor"
o=p||B.z.av(a,"sceneColor#")
p=p?b.d:1
return new A.dk(r,q,p,o?B.aL:B.c6,o)},
e2(a){var s,r,q,p,o,n=A.ls(t.bS.a(a).gdl(),t.j)
for(n=A.lJ(n,n.r,A.x(n).c),s=this.a,r=t.V,q=n.$ti.c;n.n();){p=n.d
o=r.a((p==null?q.a(p):p).a)
A.lE(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}
A.ic.prototype={
$1(a){return!B.z.av(A.K(a),"sceneColor#")},
$S:9}
A.id.prototype={
$1(a){return B.z.av(A.K(a),"sceneColor#")},
$S:9}
A.ec.prototype={
D(){return"_SlotState."+this.b}}
A.bI.prototype={
sbi(a){this.c=this.$ti.h("1?").a(a)}}
A.b8.prototype={
bj(a,b){var s,r,q,p,o=this,n=o.$ti
n.y[1].a(a)
s=o.c
r=s.length
if(r!==0){if(0>=r)return A.d(s,-1)
q=s.pop()}else{s=o.b
B.a.i(s,new A.bI(B.a0,n.h("bI<2>")))
q=s.length-1}n=o.b
if(!(q>=0&&q<n.length))return A.d(n,q)
p=n[q];++p.a
p.b=B.hQ
p.sbi(a)
p.f=b;++o.d
return o.a.$3(q,p.a,b)},
d0(a){return this.bj(a,null)},
ap(a){var s,r,q
this.$ti.c.a(a)
s=a.a
if(s<0||s>=this.b.length)throw A.c(A.by(B.aO,a))
r=this.b
if(!(s>=0&&s<r.length))return A.d(r,s)
q=r[s]
if(q.a!==a.b)throw A.c(A.by(B.aP,a))
s=q.b
if(s===B.a1||s===B.a0)throw A.c(A.by(B.Y,a))},
aJ(a){var s,r,q=this.$ti
q.c.a(a)
this.ap(a)
s=this.b
r=a.a
if(!(r>=0&&r<s.length))return A.d(s,r)
r=s[r].c
return r==null?q.y[1].a(r):r},
c7(a,b){var s,r=this.$ti
r.c.a(a)
r.y[1].a(b)
this.ap(a)
r=this.b
s=a.a
if(!(s>=0&&s<r.length))return A.d(r,s)
r[s].sbi(b)},
aN(a){var s,r,q,p=this
p.$ti.c.a(a)
s=a.a
if(s<0||s>=p.b.length)throw A.c(A.by(B.aO,a))
r=p.b
if(!(s>=0&&s<r.length))return A.d(r,s)
q=r[s]
if(q.a!==a.b)throw A.c(A.by(B.aP,a))
r=q.b
if(r===B.a1||r===B.a0)throw A.c(A.by(B.cn,a))
q.b=B.a1
q.sbi(null)
B.a.i(p.c,s);++p.e},
b1(){return new A.bJ(this.fe(),this.$ti.h("bJ<+(1,2)>"))},
fe(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k,j,i
return function $async$b1(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b,n=s.a,m=s.$ti.y[1],l=0
case 2:if(!(l<o.length)){r=4
break}k=o[l]
j=k.b
if(j===B.a1||j===B.a0){r=3
break}j=n.$3(l,k.a,k.f)
i=k.c
r=5
return a.b=new A.F(j,i==null?m.a(i):i),1
case 5:case 3:++l
r=2
break
case 4:return 0
case 1:return a.c=p.at(-1),3}}}}}
A.hF.prototype={
D(){return"BlendEquation."+this.b}}
A.cl.prototype={
D(){return"BlendFactor."+this.b}}
A.hQ.prototype={
D(){return"CullFace."+this.b}}
A.hU.prototype={
D(){return"DepthFunc."+this.b}}
A.cs.prototype={}
A.an.prototype={
D(){return"StateField."+this.b}}
A.jD.prototype={
eS(a){var s,r=this.a
if(r==null)return A.op(B.dn,t.d5)
s=A.ax(t.d5)
if(r.a!==a.a)s.i(0,B.ak)
if(r.b!==a.b)s.i(0,B.al)
if(r.c!==a.c)s.i(0,B.am)
if(r.d!==a.d)s.i(0,B.an)
if(r.e!==a.e||r.f!==a.f)s.i(0,B.ao)
if(r.r!==a.r)s.i(0,B.ap)
if(r.w!==a.w)s.i(0,B.aq)
if(r.x!==a.x)s.i(0,B.ar)
return s}}
A.bu.prototype={$iaX:1}
A.em.prototype={}
A.el.prototype={}
A.hu.prototype={}
A.fS.prototype={
dI(a){var s=this,r=A.k(s.a.canvas)
s.c=A.E(new A.jA(s))
s.d=A.E(new A.jB(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
aF(a){if(!this.r.A(0,a))return!1
return A.u(this.a.getExtension(a))!=null},
aV(a){var s=A.cY(this.a.getParameter(a))
return typeof s=="number"?B.b.c6(s):0},
cD(a){var s=A.cY(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
$iod:1}
A.jA.prototype={
$1(a){A.k(a).preventDefault()
this.a.b=B.X},
$S:19}
A.jB.prototype={
$1(a){this.a.b=B.i},
$S:19}
A.k4.prototype={
eC(){var s,r=this
if(r.b!==B.i)A.l(A.m(u.k))
s=r.w?A.u(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.bu(new A.hu(s))},
cQ(a){var s=a.a
if(!(s instanceof A.hu))throw A.c(A.a2(a,"query","is not a GPU timer query"))
return s}}
A.ht.prototype={}
A.jz.prototype={}
A.jC.prototype={
eR(a){var s=A.u(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.jz(A.pb(s))}}
A.kH.prototype={
$1(a){var s,r,q
A.k(a)
s=A.K(this.a.value)
A:{if("aces"===s){r=B.f9
break A}if("reinhard"===s){r=B.at
break A}if("off"===s){r=B.bg
break A}r=B.au
break A}q=this.b
q.r=q.r.eL(r)},
$S:0}
A.kI.prototype={
$1(a){var s,r,q
A.k(a)
s=A.K(this.a.value)
A:{if("clean"===s){r=A.fr(0,0,0,0,0,1,0,8,0,1,!1,0,0,0,0,B.au,0,0,0,0,0,0,0,0)
break A}if("ps1"===s){r=A.fr(0.35,0,0,0,0.65,1,0,5,0,1,!1,0,0,0,0,B.bg,0,0,0,0,0,0,0,0)
break A}if("vhs"===s){r=A.fr(0,0,0,0,0,1,0,8,0,1,!1,0,0,0,0,B.at,0,0.45,0,0,0,0.25,0.4,0.3)
break A}r=A.mG()
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
A.kJ.prototype={
$1(a){var s
A.k(a)
s=this.a.y
s=s instanceof A.bC?s:null
if(s!=null)s.as=A.c9(this.b.checked)},
$S:0}
A.kU.prototype={
$1(a){var s,r,q,p=this
A.k(a)
s=p.a
if(A.K(s.value)==="fly"){p.b.y=new A.bQ(B.fC,6,B.f,B.f)
s=p.c
if(t.m.b(s))A.k(s.style).display="none"}else if(A.K(s.value)==="follow"){s=p.d
r=s.length
if(r!==0){if(0>=r)return A.d(s,0)
s=s[0]
p.b.y=new A.cJ(s,B.f,B.bl,3.8,1.2,7,B.fD,B.f.v(0,B.bl))}s=p.c
if(t.m.b(s))A.k(s.style).display="none"}else{r=p.b
if(A.K(s.value)==="tour"){r.y=A.nZ(0.04,1.2,22,!0,t.fy.a(A.b([B.bL,B.bQ,B.bP,B.bK,B.bM,B.bN,B.bO],t.d0)))
s=p.c
if(t.m.b(s))A.k(s.style).display="none"}else{q=r.y=A.mD(8.5,B.K)
q.d=0.45
s=p.e
r=t.m
if(r.b(s)){q.as=A.c9(s.checked)
q.at=0.18}s=p.c
if(r.b(s))A.k(s.style).display="flex"}}},
$S:0}
A.kZ.prototype={
$1(a){A.k(a)
this.a.z.ey(0.65)},
$S:0}
A.l5.prototype={
$1(a){var s,r,q,p,o,n
for(s=this.a,r=t.m,q=0;q<A.e(s.length);++q){p=A.u(s.item(q))
if(r.b(p))if(A.bv(p.getAttribute("data-topic"))===a)A.k(p.classList).add("active")
else A.k(p.classList).remove("active")}for(s=this.b,o="panel-"+a,q=0;q<A.e(s.length);++q){n=A.u(s.item(q))
if(r.b(n))if(A.K(n.id)===o)A.k(n.classList).add("active")
else A.k(n.classList).remove("active")}},
$S:20}
A.l_.prototype={
$1(a){A.k(a)
return this.a.$1(this.b)},
$S:12}
A.l6.prototype={
$0(){var s,r,q=this.a,p=B.b.ab(q.a),o=B.b.I((q.a-p)*60),n=B.z.dc(B.e.j(p),2,"0")+":"+B.z.dc(B.e.j(o),2,"0"),m=this.b,l=t.m
if(l.b(m))m.innerText=n
m=this.c
if(l.b(m)){q=q.a
if(q>=5&&q<8){s="\ud83c\udf05"
r="Sunrise"}else if(q>=8&&q<17.5){s="\u2600\ufe0f"
r="Day"}else if(q>=17.5&&q<20.5){s="\ud83c\udf07"
r="Sunset"}else{s="\ud83c\udf19"
r="Night"}m.innerText=s+" "+n+" "+r}},
$S:1}
A.kG.prototype={
$0(){this.b.cd(this.a.a,0.25)
this.c.$0()},
$S:1}
A.l0.prototype={
$1(a){var s
A.k(a)
s=A.dH(A.K(this.b.value))
if(s==null)s=14
this.a.a=s
this.c.$0()},
$S:0}
A.l1.prototype={
$1(a){A.k(a)
return this.a.d=!0},
$S:5}
A.l2.prototype={
$1(a){A.k(a)
return this.a.d=!1},
$S:5}
A.l3.prototype={
$1(a){A.k(a)
return this.a.d=!0},
$S:5}
A.l4.prototype={
$1(a){A.k(a)
return this.a.d=!1},
$S:5}
A.kK.prototype={
$1(a){var s,r
A.k(a)
s=this.a
r=!s.b
s.b=r
s=r?"\u23f8 Pause Time":"\u25b6 Play Time"
this.b.innerText=s},
$S:0}
A.kL.prototype={
$1(a){var s
A.k(a)
s=A.dH(A.K(this.b.value))
if(s==null)s=1
this.a.c=s},
$S:0}
A.kM.prototype={
$1(a){var s,r,q
A.k(a)
s=A.dH(A.K(this.a.value))
if(s==null)s=0
r=this.b
if(t.m.b(r)){q=s<=0?"Off":B.b.a6(s,2)
r.innerText=q}r=this.c
r.r=r.r.cY(s)},
$S:0}
A.kN.prototype={
$1(a){var s,r
A.k(a)
s=A.dH(A.K(this.a.value))
if(s==null)s=0.3
r=this.b
if(t.m.b(r))r.innerText=B.b.a6(s,2)
r=this.c
r.r=r.r.eI(s)},
$S:0}
A.kO.prototype={
$1(a){var s,r
A.k(a)
s=A.dH(A.K(this.a.value))
if(s==null)s=0.75
r=this.b
if(t.m.b(r))r.innerText=B.b.a6(s,2)
r=this.c
r.r=r.r.eK(s)},
$S:0}
A.kP.prototype={
$1(a){var s
A.k(a)
s=this.a.C(0,A.K(this.b.value))
if(s!=null)this.c.x=s},
$S:0}
A.kQ.prototype={
$1(a){var s,r,q=this
A.k(a)
s=A.c9(q.a.checked)
r=s?-1:0
q.b.Q=r
r=s?-1:0
q.c.Q=r
r=s?-1:0
q.d.Q=r},
$S:0}
A.kR.prototype={
$1(a){var s,r=this
A.k(a)
s=r.a.ax
B.a.a3(s)
switch(A.K(r.b.value)){case"embers":B.a.i(s,r.c)
break
case"dust":B.a.i(s,r.d)
break
case"snow":B.a.i(s,r.e)
break
case"off":break}},
$S:0}
A.l7.prototype={
$1(a){var s,r,q,p,o=this,n=null,m=o.a.ay
B.a.a3(m)
switch(a){case"campfire":B.a.i(m,A.aP(B.f,B.Z,B.B,n,n,A.ot(A.b([B.ej,B.ek,B.el,B.ei],t.aw)),0.4,B.r,0.1,0.4,new A.a(0,0.5,0),o.c,n,1.5,0.1,6.283185307179586,1.1,200,2.2,0.4,o.b,-1.5,0.05,0,0.6,1.2,0.25,1.5,2,1.2,0,B.d,0,75,1001,new A.db(0.15,0.15,0.2,B.aH),B.hP,0.1,n,new A.O(B.a_,B.o,1)))
break
case"fireworks":s=o.b
r=o.e
q=A.aP(B.f,B.Z,B.B,n,n,n,1.5,B.r,0,0,B.fG,r,n,0,n,0,0.6,150,0.8,n,s,0,0.01,0,0.3,0.2,0.06,1,1,0,0,B.d,0,0,n,B.eo,n,0.1,n,B.A)
p=t.h
r=A.b([new A.bG(A.aP(B.f,B.I,B.B,n,n,n,1.2,B.r,0,0,B.P,r,n,0,n,0,0.8,80,4.5,n,s,0,0.01,0,0.4,2,0.05,1,1,0,0,B.d,0,0,n,B.en,n,0.1,n,B.A),B.as,4,!0,0.3,0.05,0)],p)
B.a.i(m,A.aP(B.f,B.aZ,B.B,B.dd,n,n,0.1,B.r,0,0,B.P,o.d,n,0,n,0,1.5,10,22,n,s,0,0.14,0,1.2,18,0.14,1,1,0,0,B.d,0,0.8,n,B.ep,n,0.1,A.b([new A.bG(q,B.bf,1,!0,0.1,0.03,0.3),new A.bG(A.aP(B.f,B.I,B.B,n,B.eh,n,2,B.r,0,0,B.fH,o.c,n,0,n,0,1.5,120,14,n,s,0,0.03,0,0.9,8,0.2,1,1,0,0,B.d,0,0,n,B.bG,n,0.2,r,B.A),B.be,80,!0,0.2,0.05,0)],p),new A.O(B.a_,B.o,1)))
break
case"sparks":B.a.i(m,A.aP(B.f,B.I,B.B,n,new A.cC(new A.a(0,-1,0),B.d,0.55,0.15,B.b_),n,0.8,B.r,0,0,B.P,o.e,n,0,0.03,0,2.2,300,11,0.12,o.b,0,0.01,0,1.2,6,0.08,1,1,0,0,B.d,0,80,4004,new A.bY(B.h9,0.4),n,0.25,n,new A.O(B.ht,B.o,1)))
break
case"vortex":B.a.i(m,A.aP(B.f,B.Z,B.B,n,n,n,0,B.r,0,0,B.f,o.f,n,0,0.05,0,2.8,400,3.5,0.25,o.b,0,0.02,0,1.8,2,0.15,2,1,0.5,6,B.d,-4.5,90,5005,new A.cq(3,2.0999999999999996,B.d,B.aE,B.bT),n,0.1,n,new A.O(B.K,B.o,1)))
break
case"fountain":s=Math.sqrt(78.48)
r=Math.sqrt(78.48)
B.a.i(m,A.aP(B.f,B.aZ,B.y,n,new A.cC(B.a_,B.d,0.5,0.1,B.b0),n,0.25,B.r,0,0,B.P,o.r,n,0,0.22,0,1.8,350,r*1.15,0.14,o.b,0,0.16,0,1.4,s,0.08,1,1,0,0,B.d,0,110,6006,new A.db(0.1,0.12,0.3,B.aH),n,0.1,n,new A.O(B.a_,B.o,1)))
break
case"rain":s=o.b
B.a.i(m,A.aP(B.f,B.I,B.y,n,new A.cC(new A.a(0,-1,0),B.d,0.5,0.1,B.b0),n,0.1,B.r,0,0,B.P,o.r,n,0,n,0,1.2,300,18,n,s,0,0.06,0,0.8,14,0.06,1,1,0,0,B.d,0,150,n,new A.co(B.fJ,B.a2),n,0.25,A.b([new A.bG(A.aP(B.f,B.Z,B.y,n,n,n,0.5,B.r,0,0,B.P,o.w,n,0,n,0,0.4,200,2.5,n,s,0,0.01,0,0.2,1,0.04,1,1,0,0,B.d,0,0,n,B.bU,n,0.1,n,B.A),B.as,5,!1,0.5,0.05,0)],t.h),new A.O(B.fz,B.o,1)))
break
case"blizzard":B.a.i(m,A.aP(B.fK,B.I,B.y,n,n,n,0.6,B.r,0,0,B.f,o.x,n,0,0.08,0,3.2,500,8,0.08,o.b,0,0.04,0,2,4,0.04,1.2,2.5,2.2,0,B.d,0,160,10101,new A.co(B.fL,B.a2),n,0.12,n,new A.O(B.fE,B.o,1)))
break
case"warp":B.a.i(m,A.aP(B.f,B.I,B.B,n,n,n,0,B.r,0,0,B.f,o.e,n,0,0.14,0,1.2,300,35,0.12,o.b,0,0.08,0,0.8,28,0.06,1,1,0,0,B.d,0,140,8008,new A.cq(8,0.5,B.p,B.aE,B.bR),n,0.35,n,new A.O(B.fB,B.o,1)))
break
case"confetti":B.a.i(m,A.aP(B.f,B.eg,B.y,n,n,n,0.85,B.r,0,0,B.ha,o.c,n,3,0.2,6.283185307179586,5.5,350,1.5,0.2,o.b,-3,0.12,0,3.5,0.5,0.12,1,1.2,1.4,0,B.d,0,60,9009,new A.co(B.hg,B.a2),n,0.1,n,new A.O(B.fF,B.o,1)))
break
case"none":default:break}},
$S:20}
A.kS.prototype={
$1(a){A.k(a)
return this.a.$1(A.K(this.b.value))},
$S:12}
A.kT.prototype={
$1(a){var s,r=this
A.k(a)
switch(A.K(r.a.value)){case"on":r.b.bU(B.aQ,35,0.08,6)
break
case"volumetric":s=r.b
s.eT(B.cQ,45,8)
s.f=s.f.eP(B.S,0.7,0.04,0.02,1.2,16)
break
case"off":s=r.b
s.f=s.f.eN(null,10001,null,1e4)
break}},
$S:0}
A.kV.prototype={
$1(a){var s
A.k(a)
s=A.c9(this.b.checked)?-1:0
this.a.Q=s},
$S:0}
A.kW.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
A.k(a)
s=j.b.fi(A.e(a.clientX),A.e(a.clientY))
r=j.a
if(s!=null){q=s.a
r.e=q
r.f=1
p=B.b.a6(s.d,2)
o=s.b
r=B.b.a6(o.a,1)
n=B.b.a6(o.b,1)
m=B.b.a6(o.c,1)
l=s.f
k=l!=null?" (Instance #"+A.o(l)+")":""
l=j.c
if(l!=null)l.textContent="Selected: "+q.a+k+" | Dist: "+p+" | Pt: "+("("+r+", "+n+", "+m+")")}else{r.e=null
r=j.c
if(r!=null)r.textContent="Click any 3D object to inspect"}},
$S:0}
A.kX.prototype={
$1(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3=a7.a,a4=a7.b,a5=a2.a,a6=a5.f
if(a6>0)a6=a5.f=Math.max(0,a6-a4*2.5)
s=a2.b
s.scb(a5.e===s?1+Math.sin(a6*3.141592653589793)*0.2:1)
a6=a2.c
a6.scb(a5.e===a6?1+Math.sin(a5.f*3.141592653589793)*0.18:1)
s.bs(B.d,0.35*a4)
a6.bs(B.h5.gm(),0.7*a4)
a2.d.bs(B.d,0.65*a4)
a2.e.bs(B.d,0.12*a4)
a6=a2.f
r=a6.c8(5.2,5.2,a3)
q=a6.ca(5.2,5.2,a3)
s=a2.r
s.sam(new A.a(5.2+r.a,a6.b+r.b,5.2+r.c).v(0,B.h8))
p=B.d.R(q)
if(p.gO()>0.000001){o=Math.acos(B.b.l(q.b,-1,1))
s.sdg(A.ai(p.gm(),o*0.75))}a2.w.fL(a3,a6)
s=a2.x
s.b=a2.y.fJ(a4,a3,a6)
s.ae()
for(a6=a2.z,n=0;n<a6.length;++n){m=a6[n]
l=m===a5.e?1+Math.sin(a5.f*3.141592653589793)*0.25:1
s=m.b
m.b=new A.O(s.a,s.b,l)
m.ae()
k=B.e.F(n,3)
A:{if(0===k){s=B.fP.gm()
break A}if(1===k){s=B.fA.gm()
break A}s=B.fO.gm()
break A}j=A.ai(s,(2.2+n*1.2)*a4)
s=m.b
m.b=new A.O(s.a,s.b.k(0,j),s.c)
m.ae()}a6=a2.Q
s=t.m
if(s.b(a6)&&A.K(a6.value)==="tour"){a6=a2.as
if(s.b(a6)){a6=A.dH(A.K(a6.value))
i=a6==null?0:a6}else i=0
h=i>0?i:0.4
a6=a2.at
a6.r=a6.r.cY(h)}a6=a3*1.2
g=Math.cos(a6)
f=Math.sin(a3*2)
a6=Math.sin(a6)
e=a3+2
d=Math.cos(e)
e=Math.sin(e)
c=a3*0.8+4
b=Math.cos(c)
c=Math.sin(c)
a=Math.sin(a3*2.2)
a0=a2.at
a0.f=a0.f.eJ(A.b([new A.bD(new A.a(g*4.2,1.5+f*0.6,a6*4.2),B.cw,4,9),new A.bD(new A.a(d*4.5,1.8,e*4.5),B.cD,4,9),new A.bD(new A.a(b*3.8,1.2,c*3.8),B.cO,3.5,8),new A.bD(new A.a(0,3.8+a*0.9,0),B.cR,4.5,10)],t.bs))
if(a5.b&&!a5.d){a1=B.b.F(a5.a+a4*0.2667*a5.c,24)
a5.a=a1
a0.cd(a1,0.25)
a6=a2.ax
if(s.b(a6))a6.value=B.b.a6(a5.a,2)
a2.ay.$0()}},
$S:72}
A.kY.prototype={
$1(a){var s,r,q,p,o,n,m=this
A.k(a)
s=v.G
r=A.u(A.k(s.document).activeElement)
q=r==null?null:A.K(r.tagName).toLowerCase()
if(q==="input"||q==="select")return
switch(A.K(a.key)){case" ":a.preventDefault()
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
o=B.b.F(s.a+3,24)
s.a=o
s=m.d
if(t.m.b(s))s.value=B.b.a6(o,2)
m.e.$0()
break
case"c":case"C":r=m.f
if(t.m.b(r)){r.selectedIndex=B.e.F(A.e(r.selectedIndex)+1,A.e(A.k(r.options).length))
A.c9(r.dispatchEvent(A.k(new s.Event("change"))))}break
case"m":case"M":n=A.u(A.k(s.document).querySelector("#material-select"))
if(t.m.b(n)){n.selectedIndex=B.e.F(A.e(n.selectedIndex)+1,A.e(A.k(n.options).length))
A.c9(n.dispatchEvent(A.k(new s.Event("change"))))}break}},
$S:0};(function aliases(){var s=J.bB.prototype
s.dE=s.j
s=A.ba.prototype
s.dF=s.ae})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"q1","oi",73)
r(A,"qr","pn",6)
r(A,"qs","po",6)
r(A,"qt","pp",6)
q(A,"nA","qm",1)
p(A.fb.prototype,"gfs","ft",70)
var o
p(o=A.fL.prototype,"gfn","fo",3)
p(o,"gfw","fz",3)
p(o,"gfA","fB",3)
p(o,"gfp","fq",3)
p(o,"gfu","fv",3)
q(A,"nB","pq",75)
q(A,"rt","lv",76)
r(A,"qB","o6",18)
r(A,"qA","mm",18)
p(A.bl.prototype,"gaB","ai",11)
p(A.dF.prototype,"gcP","er",65)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.z,null)
q(A.z,[A.lp,J.f2,A.dP,J.d2,A.n,A.d6,A.R,A.jh,A.at,A.dw,A.Q,A.as,A.aT,A.cz,A.dc,A.c4,A.bn,A.jt,A.iy,A.dh,A.ed,A.bw,A.bV,A.ik,A.ds,A.bk,A.dr,A.b_,A.h6,A.k1,A.k_,A.fV,A.bt,A.aK,A.h_,A.c2,A.a1,A.fW,A.hm,A.en,A.e3,A.h9,A.c5,A.L,A.ej,A.hp,A.bO,A.jI,A.fl,A.dS,A.jJ,A.i1,A.am,A.a7,A.hn,A.fI,A.ix,A.h8,A.c7,A.j3,A.aF,A.eK,A.eL,A.fq,A.d5,A.dR,A.eS,A.i3,A.i4,A.bm,A.ie,A.cE,A.eC,A.v,A.cr,A.bD,A.az,A.a0,A.ao,A.jw,A.b7,A.hT,A.iz,A.iS,A.dN,A.b9,A.jm,A.dK,A.a_,A.i5,A.fb,A.fO,A.iu,A.bb,A.fL,A.ji,A.hJ,A.aw,A.eF,A.bQ,A.bC,A.cJ,A.bg,A.eQ,A.eR,A.eT,A.i2,A.cQ,A.P,A.al,A.W,A.p,A.da,A.j_,A.ad,A.j4,A.a8,A.j6,A.j5,A.bH,A.dJ,A.fx,A.jK,A.ho,A.jZ,A.hd,A.h5,A.hh,A.hc,A.jV,A.ay,A.av,A.a3,A.hS,A.hR,A.aA,A.jo,A.jn,A.jy,A.a5,A.e0,A.bX,A.i6,A.bl,A.bZ,A.j1,A.j2,A.hK,A.O,A.B,A.a,A.hH,A.dj,A.i9,A.ck,A.ez,A.dE,A.aO,A.iC,A.cC,A.bG,A.hb,A.fn,A.bP,A.bY,A.co,A.fE,A.db,A.cq,A.d4,A.fY,A.eB,A.fZ,A.eN,A.h0,A.df,A.h2,A.eP,A.h3,A.f_,A.h7,A.dx,A.ha,A.cn,A.eD,A.lw,A.dG,A.he,A.fv,A.hf,A.c_,A.fC,A.hi,A.fD,A.hj,A.fG,A.hl,A.fF,A.hk,A.fQ,A.hq,A.fR,A.hs,A.hr,A.dL,A.fU,A.hv,A.b5,A.bT,A.hB,A.cN,A.hC,A.ba,A.eU,A.eX,A.dk,A.dQ,A.h,A.eO,A.ct,A.dF,A.fs,A.ib,A.bI,A.b8,A.cs,A.jD,A.bu,A.em,A.el,A.hu,A.ht,A.k4,A.jz,A.jC])
q(J.f2,[J.f5,J.dm,J.dp,J.dn,J.dq,J.cx,J.bz])
q(J.dp,[J.bB,J.q,A.cA,A.dB])
q(J.bB,[J.fp,J.c0,J.bA])
r(J.f4,A.dP)
r(J.ii,J.q)
q(J.cx,[J.dl,J.f6])
q(A.n,[A.cO,A.aM,A.dv,A.ab,A.c3,A.bJ])
r(A.eo,A.cO)
r(A.e_,A.eo)
r(A.d7,A.e_)
q(A.R,[A.cy,A.bo,A.f7,A.fN,A.fy,A.h4,A.ew,A.b2,A.dX,A.fM,A.cK,A.eJ])
q(A.aM,[A.T,A.bj,A.aZ,A.bi,A.e2])
q(A.T,[A.dT,A.M,A.dO])
q(A.aT,[A.bs,A.cR])
q(A.bs,[A.F,A.e9,A.ea,A.cS])
r(A.c8,A.cR)
r(A.cT,A.cz)
r(A.dV,A.cT)
r(A.dd,A.dV)
r(A.X,A.dc)
q(A.bn,[A.de,A.eb,A.ek])
r(A.b3,A.de)
r(A.dD,A.bo)
q(A.bw,[A.eH,A.eI,A.fK,A.kB,A.kD,A.jF,A.jE,A.k5,A.jT,A.l9,A.la,A.kv,A.kw,A.jx,A.ir,A.is,A.it,A.iB,A.iq,A.iv,A.jq,A.js,A.hM,A.hN,A.hY,A.hW,A.hX,A.iE,A.iF,A.jb,A.ja,A.j9,A.j8,A.j7,A.jc,A.km,A.kn,A.je,A.jf,A.lh,A.lf,A.iT,A.iV,A.iU,A.iY,A.iX,A.i7,A.ip,A.hE,A.kt,A.jd,A.iR,A.iG,A.iH,A.iI,A.iJ,A.iK,A.iL,A.iM,A.iN,A.iO,A.iP,A.ic,A.id,A.jA,A.jB,A.kH,A.kI,A.kJ,A.kU,A.kZ,A.l5,A.l_,A.l0,A.l1,A.l2,A.l3,A.l4,A.kK,A.kL,A.kM,A.kN,A.kO,A.kP,A.kQ,A.kR,A.l7,A.kS,A.kT,A.kV,A.kW,A.kX,A.kY])
q(A.fK,[A.fH,A.cm])
q(A.bV,[A.bh,A.e1])
q(A.eI,[A.kC,A.k6,A.kr,A.jU,A.il,A.io,A.lb,A.iw,A.jr,A.lc,A.hZ,A.jg,A.lg,A.le,A.iW,A.iZ,A.hL,A.hI,A.iD,A.ij,A.hD])
q(A.dB,[A.fc,A.ag])
q(A.ag,[A.e5,A.e7])
r(A.e6,A.e5)
r(A.dz,A.e6)
r(A.e8,A.e7)
r(A.dA,A.e8)
q(A.dz,[A.dy,A.fd])
q(A.dA,[A.fe,A.ff,A.fg,A.fh,A.fi,A.dC,A.fj])
r(A.ee,A.h4)
q(A.eH,[A.jG,A.jH,A.k0,A.jL,A.jP,A.jO,A.jN,A.jM,A.jS,A.jR,A.jQ,A.jY,A.kq,A.kl,A.ke,A.kf,A.kk,A.k9,A.kb,A.ka,A.kj,A.k7,A.k8,A.kg,A.kh,A.ki,A.kd,A.kc,A.ko,A.kp,A.ku,A.l6,A.kG])
r(A.dZ,A.h_)
r(A.hg,A.en)
r(A.e4,A.e1)
r(A.b1,A.eb)
r(A.dW,A.ek)
q(A.b2,[A.cG,A.f0])
q(A.jI,[A.cF,A.cM,A.cw,A.hA,A.fa,A.br,A.dg,A.eA,A.hO,A.cH,A.aj,A.cu,A.aY,A.fw,A.bf,A.dM,A.fB,A.di,A.ey,A.cB,A.fm,A.d3,A.cL,A.hG,A.jk,A.jj,A.hP,A.eG,A.d8,A.fX,A.h1,A.f8,A.jv,A.ia,A.eV,A.eY,A.eZ,A.cv,A.eW,A.cI,A.bq,A.d9,A.ec,A.hF,A.cl,A.hQ,A.hU,A.an])
q(A.bm,[A.aE,A.aG,A.b6,A.fo,A.b4])
r(A.fz,A.hh)
r(A.fP,A.bT)
r(A.f1,A.ba)
r(A.fS,A.ht)
s(A.eo,A.L)
s(A.e5,A.L)
s(A.e6,A.as)
s(A.e7,A.L)
s(A.e8,A.as)
s(A.cT,A.ej)
s(A.ek,A.hp)
s(A.hh,A.jV)
s(A.ht,A.k4)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{j:"int",r:"double",aq:"num",w:"String",y:"bool",a7:"Null",A:"List",z:"Object",aD:"Map",N:"JSObject"},mangledNames:{},types:["a7(N)","~()","aX()","aX(aG?)","y(P)","y(N)","~(~())","~(@)","y(ao)","y(w)","y(p)","a(a)","~(N)","a7(@)","a7()","~(a,a,a,a,a,a)","y(r)","a(aw)","r(r)","a7(z?)","~(w)","y(dU?)","j(j,+(aE,b7))","~(j,@)","aG(j,j,w?)","@(@)","j(j,+(aG,bb))","j(+influence,source(r,dY),+influence,source(r,dY))","a7(z,bF)","w(P)","j(D,D)","~(@,@)","~(z?,z?)","y(j)","b4(j,j,w?)","dL(aE)","aX(w{fallback:w?})","@(w)","az?()","A<az>()","d5()","r()","cn()","aX?()","y(am<w,a_>)","a_(am<w,a_>)","a_(a_,a_)","j(a3<ay>,a3<ay>)","aR(a3<ay>)","j(a3<av>,a3<av>)","aR(a3<av>)","y(aF)","j(+influence,light(r,az),+influence,light(r,az))","j(j,j)","~(a,a,a,a,a)","r(j,j)","bX(r,r,r,r)","r(a,a)","a(r,r)","y(ck)","j(aO,aO)","~(c_)","c_()","y(w,cN)","~(ba)","~(aq)","dK(aF)","@(@,w)","a7(~())","a7(@,bF)","a0(b6)","b6(j,j,w?)","~(ct)","j(@,@)","aE(j,j,w?)","cQ()","y()","z?(z?)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.F&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.e9&&a.b(c.a)&&b.b(c.b),"2;influence,source":(a,b)=>c=>c instanceof A.ea&&a.b(c.a)&&b.b(c.b),"2;rotation,translation":(a,b)=>c=>c instanceof A.cS&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.c8&&a.b(d.a)&&b.b(d.b)&&c.b(d.c)}}
A.pG(v.typeUniverse,JSON.parse('{"fp":"bB","c0":"bB","bA":"bB","rb":"cA","q":{"A":["1"],"N":[],"n":["1"]},"f5":{"y":[],"J":[]},"dm":{"J":[]},"dp":{"N":[]},"bB":{"N":[]},"f4":{"dP":[]},"ii":{"q":["1"],"A":["1"],"N":[],"n":["1"]},"d2":{"Y":["1"]},"cx":{"r":[],"aq":[],"ar":["aq"]},"dl":{"r":[],"j":[],"aq":[],"ar":["aq"],"J":[]},"f6":{"r":[],"aq":[],"ar":["aq"],"J":[]},"bz":{"w":[],"ar":["w"],"mF":[],"J":[]},"cO":{"n":["2"]},"d6":{"Y":["2"]},"e_":{"L":["2"],"A":["2"],"cO":["1","2"],"n":["2"]},"d7":{"e_":["1","2"],"L":["2"],"A":["2"],"cO":["1","2"],"n":["2"],"L.E":"2","n.E":"2"},"cy":{"R":[]},"aM":{"n":["1"]},"T":{"aM":["1"],"n":["1"]},"dT":{"T":["1"],"aM":["1"],"n":["1"],"T.E":"1","n.E":"1"},"at":{"Y":["1"]},"dv":{"n":["2"],"n.E":"2"},"dw":{"Y":["2"]},"M":{"T":["2"],"aM":["2"],"n":["2"],"T.E":"2","n.E":"2"},"ab":{"n":["1"],"n.E":"1"},"Q":{"Y":["1"]},"dO":{"T":["1"],"aM":["1"],"n":["1"],"T.E":"1","n.E":"1"},"F":{"bs":[],"aT":[]},"e9":{"bs":[],"aT":[]},"ea":{"bs":[],"aT":[]},"cS":{"bs":[],"aT":[]},"c8":{"cR":[],"aT":[]},"dd":{"dV":["1","2"],"cT":["1","2"],"cz":["1","2"],"ej":["1","2"],"aD":["1","2"]},"dc":{"aD":["1","2"]},"X":{"dc":["1","2"],"aD":["1","2"]},"c3":{"n":["1"],"n.E":"1"},"c4":{"Y":["1"]},"de":{"bn":["1"],"bE":["1"],"n":["1"]},"b3":{"de":["1"],"bn":["1"],"bE":["1"],"n":["1"]},"dD":{"bo":[],"R":[]},"f7":{"R":[]},"fN":{"R":[]},"ed":{"bF":[]},"bw":{"bR":[]},"eH":{"bR":[]},"eI":{"bR":[]},"fK":{"bR":[]},"fH":{"bR":[]},"cm":{"bR":[]},"fy":{"R":[]},"bh":{"bV":["1","2"],"mv":["1","2"],"aD":["1","2"]},"bj":{"aM":["1"],"n":["1"],"n.E":"1"},"ds":{"Y":["1"]},"aZ":{"aM":["1"],"n":["1"],"n.E":"1"},"bk":{"Y":["1"]},"bi":{"aM":["am<1,2>"],"n":["am<1,2>"],"n.E":"am<1,2>"},"dr":{"Y":["am<1,2>"]},"bs":{"aT":[]},"cR":{"aT":[]},"cA":{"N":[],"J":[]},"dB":{"N":[]},"fc":{"N":[],"J":[]},"ag":{"aB":["1"],"N":[]},"dz":{"L":["r"],"ag":["r"],"A":["r"],"aB":["r"],"N":[],"n":["r"],"as":["r"]},"dA":{"L":["j"],"ag":["j"],"A":["j"],"aB":["j"],"N":[],"n":["j"],"as":["j"]},"dy":{"i_":[],"L":["r"],"ag":["r"],"A":["r"],"aB":["r"],"N":[],"n":["r"],"as":["r"],"J":[],"L.E":"r"},"fd":{"i0":[],"L":["r"],"ag":["r"],"A":["r"],"aB":["r"],"N":[],"n":["r"],"as":["r"],"J":[],"L.E":"r"},"fe":{"L":["j"],"ag":["j"],"A":["j"],"aB":["j"],"N":[],"n":["j"],"as":["j"],"J":[],"L.E":"j"},"ff":{"L":["j"],"ag":["j"],"A":["j"],"aB":["j"],"N":[],"n":["j"],"as":["j"],"J":[],"L.E":"j"},"fg":{"L":["j"],"ag":["j"],"A":["j"],"aB":["j"],"N":[],"n":["j"],"as":["j"],"J":[],"L.E":"j"},"fh":{"L":["j"],"ag":["j"],"A":["j"],"aB":["j"],"N":[],"n":["j"],"as":["j"],"J":[],"L.E":"j"},"fi":{"L":["j"],"ag":["j"],"A":["j"],"aB":["j"],"N":[],"n":["j"],"as":["j"],"J":[],"L.E":"j"},"dC":{"L":["j"],"ag":["j"],"A":["j"],"aB":["j"],"N":[],"n":["j"],"as":["j"],"J":[],"L.E":"j"},"fj":{"dU":[],"L":["j"],"ag":["j"],"A":["j"],"aB":["j"],"N":[],"n":["j"],"as":["j"],"J":[],"L.E":"j"},"h4":{"R":[]},"ee":{"bo":[],"R":[]},"bt":{"Y":["1"]},"bJ":{"n":["1"],"n.E":"1"},"aK":{"R":[]},"dZ":{"h_":["1"]},"a1":{"bS":["1"]},"en":{"n6":[]},"hg":{"en":[],"n6":[]},"e1":{"bV":["1","2"],"aD":["1","2"]},"e4":{"e1":["1","2"],"bV":["1","2"],"aD":["1","2"]},"e2":{"aM":["1"],"n":["1"],"n.E":"1"},"e3":{"Y":["1"]},"b1":{"bn":["1"],"mx":["1"],"bE":["1"],"n":["1"]},"c5":{"Y":["1"]},"bV":{"aD":["1","2"]},"cz":{"aD":["1","2"]},"dV":{"cT":["1","2"],"cz":["1","2"],"ej":["1","2"],"aD":["1","2"]},"bn":{"bE":["1"],"n":["1"]},"eb":{"bn":["1"],"bE":["1"],"n":["1"]},"dW":{"bn":["1"],"hp":["1"],"bE":["1"],"n":["1"]},"bO":{"ar":["bO"]},"r":{"aq":[],"ar":["aq"]},"j":{"aq":[],"ar":["aq"]},"A":{"n":["1"]},"aq":{"ar":["aq"]},"bE":{"n":["1"]},"w":{"ar":["w"],"mF":[]},"ew":{"R":[]},"bo":{"R":[]},"b2":{"R":[]},"cG":{"R":[]},"f0":{"R":[]},"dX":{"R":[]},"fM":{"R":[]},"cK":{"R":[]},"eJ":{"R":[]},"fl":{"R":[]},"dS":{"R":[]},"hn":{"bF":[]},"h8":{"ly":[]},"c7":{"ly":[]},"aE":{"bm":[]},"aG":{"bm":[]},"b6":{"bm":[]},"b4":{"bm":[]},"fo":{"bm":[]},"eF":{"cp":[]},"bQ":{"cp":[]},"bC":{"cp":[]},"cJ":{"cp":[]},"eT":{"oW":[]},"bH":{"aR":[]},"dJ":{"oZ":[]},"fx":{"p0":[]},"ho":{"aR":[]},"hd":{"oY":[]},"h5":{"oc":[]},"fz":{"p2":[]},"ay":{"ar":["ay"]},"av":{"ar":["av"]},"e0":{"o5":[]},"bY":{"bx":[]},"co":{"bx":[]},"fE":{"bx":[]},"db":{"bx":[]},"cq":{"bx":[]},"d4":{"I":[]},"fY":{"D":[]},"eB":{"I":[]},"fZ":{"D":[]},"eN":{"I":[]},"h0":{"D":[]},"df":{"I":[]},"h2":{"D":[]},"eP":{"I":[]},"h3":{"D":[]},"f_":{"I":[]},"h7":{"D":[]},"dx":{"I":[]},"ha":{"D":[]},"eD":{"oX":[]},"dG":{"I":[]},"he":{"D":[]},"fv":{"I":[]},"hf":{"D":[]},"fC":{"I":[]},"hi":{"D":[]},"fD":{"I":[]},"hj":{"D":[]},"fG":{"I":[]},"hl":{"D":[]},"fF":{"I":[]},"hk":{"D":[]},"fQ":{"I":[]},"hq":{"D":[]},"fR":{"I":[]},"hs":{"D":[]},"hr":{"D":[]},"fU":{"I":[]},"hv":{"D":[]},"fP":{"bT":["a"],"bT.T":"a"},"f1":{"ba":[]},"eO":{"o8":[]},"bu":{"aX":[]},"fS":{"od":[]},"og":{"A":["j"],"n":["j"]},"dU":{"A":["j"],"n":["j"]},"p9":{"A":["j"],"n":["j"]},"oe":{"A":["j"],"n":["j"]},"p7":{"A":["j"],"n":["j"]},"of":{"A":["j"],"n":["j"]},"p8":{"A":["j"],"n":["j"]},"i_":{"A":["r"],"n":["r"]},"i0":{"A":["r"],"n":["r"]}}'))
A.pF(v.typeUniverse,JSON.parse('{"eo":2,"ag":1,"eb":1,"ek":1}'))
var u={l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",j:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nuniform vec3 uClearColor;\nuniform vec3 uSkyHorizon;\nuniform vec3 uSkyZenith;\nuniform vec3 uSkyGround;\nuniform float uSkyEnabled;\nuniform float uSkyHorizonGlow;\nuniform float uSkyStarDensity;\nuniform sampler2D uSkyTexture;\nuniform float uSkyTextureEnabled;\nuniform float uSkyRotation;\nuniform float uSkyExposure;\nuniform float uSkyTextureSrgb;\nuniform mat4 uInverseProjection;\nuniform mat4 uInverseView;\nuniform vec3 uCameraPosition;\nuniform float uCloudCoverage;\nuniform float uCloudDensity;\nuniform float uCloudBaseHeight;\nuniform float uCloudThickness;\nuniform float uCloudScale;\nuniform vec2 uCloudWind;\nuniform float uCloudPhase;\nuniform float uCloudDetail;\nuniform float uCloudSilverLining;\nuniform float uCloudSampleCount;\nuniform vec3 uCloudLightDirection;\nuniform vec3 uCloudLightColor;\nuniform float uCloudLightIntensity;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 acesToneMap(vec3 color){\n  return clamp((color*(2.51*color+0.03))/(color*(2.43*color+0.59)+0.14),0.0,1.0);\n}\n\nvec3 agxToneMap(vec3 color){\n  const mat3 agxMat=mat3(\n    0.842479062253094,0.0423282422610123,0.0423756549057051,\n    0.0784335999999992,0.878468636469772,0.0784336,\n    0.0792237451477643,0.0791661274605434,0.879142973793104\n  );\n  const mat3 agxMatInv=mat3(\n    1.19687902425764,-0.0528968517032958,-0.0529716355080549,\n    -0.0980208811401368,1.15190312990417,-0.0980434501171241,\n    -0.0990297440797205,-0.0989611768448433,1.15107367264185\n  );\n  vec3 val=agxMat*color;\n  val=clamp(log2(max(val,vec3(1e-10)))*0.0625+0.625,0.0,1.0);\n  val=val*val*val*(val*(val*6.0-15.0)+10.0);\n  val=agxMatInv*val;\n  return max(val,vec3(0.0));\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nvec3 skyBackground(vec2 uv){\n  // A deliberately cheap, high-quality fallback sky: three atmospheric bands\n  // provide depth at every camera angle, while the tiny deterministic star\n  // field and horizon glow keep the clear background from reading as a flat\n  // color. It is an environment layer, not a game/weather simulation.\n  float lower=smoothstep(0.0,0.48,uv.y);\n  float upper=smoothstep(0.42,1.0,uv.y);\n  vec3 color=mix(uSkyGround,uSkyHorizon,lower);\n  color=mix(color,uSkyZenith,upper);\n  float horizonGlow=exp(-pow((uv.y-0.48)*7.0,2.0));\n  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);\n  float starMask=smoothstep(0.62,0.92,uv.y);\n  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),hash(floor(uv*vec2(180.0,100.0))))*starMask;\n  color+=vec3(0.16,0.19,0.24)*stars;\n  return max(color,vec3(0.0));\n}\n\nfloat hash3(vec3 p){\n  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);\n}\n\nfloat valueNoise(vec3 p){\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  f=f*f*(3.0-2.0*f);\n  float n000=hash3(i+vec3(0,0,0));\n  float n100=hash3(i+vec3(1,0,0));\n  float n010=hash3(i+vec3(0,1,0));\n  float n110=hash3(i+vec3(1,1,0));\n  float n001=hash3(i+vec3(0,0,1));\n  float n101=hash3(i+vec3(1,0,1));\n  float n011=hash3(i+vec3(0,1,1));\n  float n111=hash3(i+vec3(1,1,1));\n  float x00=mix(n000,n100,f.x);\n  float x10=mix(n010,n110,f.x);\n  float x01=mix(n001,n101,f.x);\n  float x11=mix(n011,n111,f.x);\n  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);\n}\n\nfloat cloudNoise(vec3 p){\n  float value=0.0;\n  float amplitude=0.5;\n  for(int octave=0;octave<4;octave++){\n    value+=valueNoise(p)*amplitude;\n    p=p*2.03+vec3(17.3,11.7,7.1);\n    amplitude*=0.5;\n  }\n  return value;\n}\n\nfloat cloudDensityAt(vec3 position){\n  float height01=clamp(\n    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),\n    0.0,1.0\n  );\n  float vertical=smoothstep(0.0,0.12,height01)*\n    (1.0-smoothstep(0.72,1.0,height01));\n  vec3 q=position*max(uCloudScale,0.00001)+\n    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);\n  float macro=cloudNoise(q*0.82);\n  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));\n  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));\n  float threshold=1.0-clamp(uCloudCoverage,0.,1.);\n  float body=smoothstep(threshold,threshold+0.26,shape);\n  return body*vertical*clamp(uCloudDensity,0.,1.);\n}\n\nvec4 volumetricClouds(vec3 worldDirection){\n  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){\n    return vec4(0.0);\n  }\n  float directionY=max(worldDirection.y,0.001);\n  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;\n  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;\n  startT=max(startT,0.0);\n  endT=max(endT,0.0);\n  if(endT<=startT) return vec4(0.0);\n  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));\n  float stepLength=(endT-startT)/float(sampleCount);\n  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;\n  vec3 sunDirection=normalize(-uCloudLightDirection);\n  float transmittance=1.0;\n  vec3 inScatter=vec3(0.0);\n  for(int i=0;i<24;i++){\n    if(i>=sampleCount) break;\n    float t=startT+(float(i)+0.5)*stepLength+jitter;\n    vec3 position=uCameraPosition+worldDirection*t;\n    float density=cloudDensityAt(position);\n    float opticalDepth=density*stepLength*0.0035;\n    float segmentAlpha=1.0-exp(-opticalDepth);\n    float towardLight=cloudDensityAt(position+sunDirection*90.0);\n    float lightTransmittance=exp(-towardLight*0.025);\n    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);\n    vec3 ambient=uSkyHorizon*0.32;\n    vec3 direct=uCloudLightColor*\n      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;\n    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;\n    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);\n    inScatter+=transmittance*segmentAlpha*sampleLight;\n    transmittance*=1.0-segmentAlpha;\n    if(transmittance<0.01) break;\n  }\n  return vec4(inScatter,1.0-transmittance);\n}\n\nvec3 srgbToLinear(vec3 color){\n  vec3 low=color/12.92;\n  vec3 high=pow((color+0.055)/1.055,vec3(2.4));\n  return mix(low,high,step(vec3(0.04045),color));\n}\n\nvec3 worldDirectionForUv(vec2 uv){\n  vec2 ndc=uv*2.0-1.0;\n  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);\n  return normalize(viewPoint.xyz/viewPoint.w);\n}\n\nvec3 equirectangularSky(vec2 uv){\n  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);\n  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;\n  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));\n  vec2 sampleUv=vec2(\n    fract(longitude/(2.0*3.14159265359)+0.5),\n    0.5-latitude/3.14159265359\n  );\n  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));\n  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));\n  return linear*max(uSkyExposure,0.0);\n}\n\nvec4 applyFxaa(sampler2D tex, vec2 uv){\n  vec2 texelSize=1.0/vec2(textureSize(tex,0));\n  vec3 rgbM=texture(tex,uv).rgb;\n  vec3 rgbNW=texture(tex,uv+vec2(-texelSize.x,-texelSize.y)).rgb;\n  vec3 rgbNE=texture(tex,uv+vec2( texelSize.x,-texelSize.y)).rgb;\n  vec3 rgbSW=texture(tex,uv+vec2(-texelSize.x, texelSize.y)).rgb;\n  vec3 rgbSE=texture(tex,uv+vec2( texelSize.x, texelSize.y)).rgb;\n\n  const vec3 luma=vec3(0.299,0.587,0.114);\n  float lumaM =dot(rgbM, luma);\n  float lumaNW=dot(rgbNW,luma);\n  float lumaNE=dot(rgbNE,luma);\n  float lumaSW=dot(rgbSW,luma);\n  float lumaSE=dot(rgbSE,luma);\n\n  float lumaMin=min(lumaM,min(min(lumaNW,lumaNE),min(lumaSW,lumaSE)));\n  float lumaMax=max(lumaM,max(max(lumaNW,lumaNE),max(lumaSW,lumaSE)));\n\n  float range=lumaMax-lumaMin;\n  if(range<max(0.04,lumaMax*0.125)){\n    return vec4(rgbM,1.0);\n  }\n\n  vec2 dir=vec2(\n    -((lumaNW+lumaNE)-(lumaSW+lumaSE)),\n    ((lumaNW+lumaSW)-(lumaNE+lumaSE))\n  );\n  float dirReduce=max((lumaNW+lumaNE+lumaSW+lumaSE)*0.03125,0.0078125);\n  float rcpDirMin=1.0/(min(abs(dir.x),abs(dir.y))+dirReduce);\n  dir=min(vec2(8.0),max(vec2(-8.0),dir*rcpDirMin))*texelSize;\n\n  vec3 rgbA=0.5*(\n    texture(tex,uv+dir*(1.0/3.0-0.5)).rgb+\n    texture(tex,uv+dir*(2.0/3.0-0.5)).rgb\n  );\n  vec3 rgbB=rgbA*0.5+0.25*(\n    texture(tex,uv+dir*-0.5).rgb+\n    texture(tex,uv+dir* 0.5).rgb\n  );\n  float lumaB=dot(rgbB,luma);\n  if((lumaB<lumaMin)||(lumaB>lumaMax)){\n    return vec4(rgbA,1.0);\n  }\n  return vec4(rgbB,1.0);\n}\n\nvoid main(){\n  vec4 rawSource=texture(uTex,vUv);\n  bool isBackground=uSkyEnabled>0.5 && distance(rawSource.rgb,uClearColor)<0.004;\n  vec4 source=isBackground?rawSource:applyFxaa(uTex,vUv);\n  // Lens spectral dispersion (radial chromatic aberration towards viewport edges)\n  if(!isBackground){\n    vec2 centerOffset=vUv-vec2(0.5);\n    float distSq=dot(centerOffset,centerOffset);\n    if(distSq>0.04){\n      vec2 chromaOffset=centerOffset*distSq*0.010;\n      source.r=applyFxaa(uTex,vUv-chromaOffset).r;\n      source.b=applyFxaa(uTex,vUv+chromaOffset).b;\n    }\n  }\n  // The world pass clears untouched pixels to uClearColor. Replace only that\n  // exact background, so the sky is always active without covering geometry.\n  if(isBackground){\n    vec3 viewDirection=worldDirectionForUv(vUv);\n    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);\n    source.rgb=uSkyTextureEnabled>0.5\n      ? equirectangularSky(vUv)\n      : skyBackground(vUv);\n    vec4 clouds=volumetricClouds(worldDirection);\n    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;\n  }\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  vec3 mapped=uToneMap>3.0\n    ?agxToneMap(color)\n    :(uToneMap>1.5?acesToneMap(color):reinhardToneMap(color));\n  float toneMix=uToneMap>3.0\n    ?clamp(uToneMap-3.0,0.,1.)\n    :(uToneMap>1.5?clamp(uToneMap-1.5,0.,1.):clamp(uToneMap,0.,1.));\n  color=mix(color,mapped,toneMix);\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  // Atmospheric precipitation is submitted as depth-tested world geometry;\n  // the present pass must never paint weather over unrelated surfaces.\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",k:"WebGl2Device: operation attempted while context is not ready",g:"max must be in range 0 < max \u2264 2^32, was "}
var t=(function rtii(){var s=A.bL
return{v:s("aK"),g0:s("av"),fW:s("eC"),do:s("cn"),Z:s("aw"),e8:s("ar<@>"),dN:s("da"),I:s("X<w,j>"),P:s("b3<w>"),df:s("bO"),Q:s("R"),B:s("i_"),gN:s("i0"),o:s("a_"),f:s("bR"),ef:s("dj"),j:s("aX"),gL:s("b4"),cr:s("n<da>"),bM:s("n<r>"),hf:s("n<@>"),fA:s("q<ez>"),d0:s("q<aw>"),aA:s("q<dj>"),J:s("q<aX>"),b7:s("q<al>"),gk:s("q<bg>"),d9:s("q<b4>"),e9:s("q<bT<@>>"),E:s("q<A<j>>"),br:s("q<rc>"),e3:s("q<dE>"),aw:s("q<aO>"),g7:s("q<fn>"),cU:s("q<P>"),dV:s("q<bX>"),bs:s("q<bD>"),eT:s("q<cE>"),be:s("q<+(w,a)>"),cw:s("q<+influence,light(r,az)>"),gg:s("q<+influence,source(r,dY)>"),cL:s("q<I>"),u:s("q<D>"),cR:s("q<dJ>"),C:s("q<p>"),c4:s("q<b9>"),dR:s("q<aR>"),D:s("q<ba>"),aM:s("q<a3<av>>"),c1:s("q<a3<ay>>"),w:s("q<az>"),s:s("q<w>"),h:s("q<bG>"),ek:s("q<O>"),G:s("q<a>"),az:s("q<dY>"),gz:s("q<hc>"),ha:s("q<bI<a0>>"),c9:s("q<bI<b7>>"),aO:s("q<bI<b9>>"),fq:s("q<bI<bb>>"),n:s("q<r>"),gn:s("q<@>"),t:s("q<j>"),T:s("dm"),m:s("N"),cj:s("bA"),aU:s("aB<@>"),a3:s("bT<@>"),c:s("b5<a>"),fy:s("A<aw>"),_:s("A<al>"),O:s("A<P>"),dy:s("A<w>"),aH:s("A<@>"),bW:s("A<j>"),ao:s("am<w,a_>"),bS:s("aD<w,aX>"),a1:s("aD<w,P>"),fm:s("M<a,a>"),eL:s("b6"),cA:s("aE"),b:s("a7"),K:s("z"),fY:s("ay"),dz:s("dE"),eH:s("aO"),z:s("P"),eD:s("cE"),W:s("aF"),gT:s("rd"),bQ:s("+()"),ai:s("+(aE,b7)"),dU:s("+(aG,bb)"),fk:s("+influence,light(r,az)"),eS:s("+influence,source(r,dY)"),g8:s("D"),b0:s("b8<b4,b9>"),ex:s("b8<b6,a0>"),cE:s("b8<aE,b7>"),g2:s("b8<aG,bb>"),L:s("p"),Y:s("aR"),dB:s("ba"),U:s("bE<w>"),cJ:s("bE<j>"),d:s("a3<av>"),k:s("a3<ay>"),l:s("bF"),d5:s("an"),N:s("w"),bn:s("bG"),aj:s("aG"),dm:s("J"),eK:s("bo"),ak:s("c0"),am:s("dW<w>"),bw:s("fO"),a:s("a"),dO:s("a(a)"),p:s("ao"),fl:s("ab<ao>"),an:s("Q<ao>"),aQ:s("cN"),e:s("a1<@>"),cd:s("a1<~>"),hg:s("e4<z?,z?>"),cm:s("bH"),a8:s("cQ"),cK:s("hb"),V:s("el"),R:s("em"),y:s("y"),d6:s("y(ck)"),al:s("y(z)"),fg:s("y(ao)"),i:s("r"),A:s("@"),fO:s("@()"),x:s("@(z)"),q:s("@(z,bF)"),S:s("j"),eB:s("cr?"),bH:s("bS<a7>?"),du:s("q<z?>?"),bX:s("N?"),c3:s("A<bD>?"),X:s("z?"),ac:s("dF?"),bG:s("dR?"),dk:s("w?"),aD:s("dU?"),F:s("c2<@,@>?"),g:s("h9?"),fQ:s("y?"),cD:s("r?"),h6:s("j?"),cg:s("aq?"),a4:s("~(ct)?"),r:s("aq"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.co=J.f2.prototype
B.a=J.q.prototype
B.e=J.dl.prototype
B.b=J.cx.prototype
B.z=J.bz.prototype
B.cp=J.bA.prototype
B.cq=J.dp.prototype
B.ad=A.dy.prototype
B.b1=J.fp.prototype
B.aw=J.c0.prototype
B.hR=new A.hA(0,"opaque")
B.br=new A.ey(0,"world")
B.aB=new A.ey(1,"camera")
B.bs=new A.d3(0,"linear")
B.bt=new A.d3(1,"inverseSquare")
B.bu=new A.d3(2,"constant")
B.T=new A.hF(0,"add")
B.bv=new A.cl(0,"zero")
B.Q=new A.cl(1,"one")
B.y=new A.eA(0,"alpha")
B.B=new A.eA(1,"additive")
B.a2=new A.hG(0,"volume")
B.hS=new A.hT()
B.aC=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.by=function() {
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
B.bD=function(getTagFallback) {
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
B.bz=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.bC=function(hooks) {
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
B.bB=function(hooks) {
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
B.bA=function(hooks) {
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
B.aD=function(hooks) { return hooks; }

B.n=new A.z()
B.bE=new A.fl()
B.m=new A.jh()
B.i4=new A.jk(0,"volume")
B.i3=new A.jj(0,"outward")
B.bG=new A.fE()
B.d=new A.a(0,1,0)
B.q=new A.a(0,-1,0)
B.S=new A.v(1,1,1)
B.bH=new A.az()
B.hB=new A.br(0,"position")
B.hG=new A.ao(B.hB,0,3)
B.bo=new A.br(1,"normal")
B.hH=new A.ao(B.bo,3,3)
B.aA=new A.br(6,"tangent4")
B.hL=new A.ao(B.aA,6,4)
B.hC=new A.br(2,"color")
B.hI=new A.ao(B.hC,10,4)
B.hD=new A.br(4,"alpha")
B.hJ=new A.ao(B.hD,14,1)
B.hE=new A.br(5,"uv0")
B.hK=new A.ao(B.hE,15,2)
B.hF=new A.br(8,"legacyMaterialEffect")
B.hM=new A.ao(B.hF,17,1)
B.M=s([B.hG,B.hH,B.hL,B.hI,B.hJ,B.hK,B.hM],A.bL("q<ao>"))
B.a3=new A.jw()
B.bI=new A.jC()
B.bJ=new A.h8()
B.C=new A.hg()
B.U=new A.hn()
B.ho=new A.a(3.5,4.2,-7.5)
B.K=new A.a(0,0.5,0)
B.bK=new A.aw(B.ho,B.K,1.15)
B.hc=new A.a(0,4.5,11)
B.bL=new A.aw(B.hc,B.K,1.05)
B.hy=new A.a(-6.5,2.8,-5)
B.hn=new A.a(-0.5,0.5,0)
B.bM=new A.aw(B.hy,B.hn,0.9)
B.hx=new A.a(-8.5,4,2)
B.hv=new A.a(0,0.5,0.5)
B.bN=new A.aw(B.hx,B.hv,1)
B.fX=new A.a(-3.5,2,8.5)
B.h7=new A.a(0.5,0.5,0)
B.bO=new A.aw(B.fX,B.h7,1.1)
B.fI=new A.a(7,2.2,-4.5)
B.h6=new A.a(5.5,0.2,-5.5)
B.bP=new A.aw(B.fI,B.h6,1.05)
B.hh=new A.a(8,3.2,5.5)
B.hf=new A.a(1,0.8,0)
B.bQ=new A.aw(B.hh,B.hf,0.95)
B.bR=new A.d8(0,"normal")
B.bT=new A.d8(3,"tangent")
B.aE=new A.eG(0,"volume")
B.aF=new A.eG(1,"edge")
B.bS=new A.d8(1,"radialOutward")
B.bU=new A.cq(0.3,0,B.d,B.aF,B.bS)
B.G=new A.d9(0,"colorOnly")
B.aG=new A.d9(1,"colorAndDepth")
B.a4=new A.d9(2,"depthOnly")
B.a5=new A.hO(1,"srgb")
B.aH=new A.hP(1,"base")
B.V=new A.hQ(1,"back")
B.W=new A.hU(0,"less")
B.hb=new A.a(0.6,-1,0.4)
B.cy=new A.v(1,0.95,0.88)
B.bV=new A.cr(B.hb,B.cy,2.4)
B.L=new A.dg(0,"opaque")
B.bW=new A.dg(1,"masked")
B.r=new A.dg(2,"blended")
B.aI=new A.cs(!1,B.W,!1,!0,B.Q,B.Q,B.T,!1,B.V,!0,!1,!0,!0,!0,!0,!1)
B.bX=new A.cs(!0,B.W,!1,!0,B.Q,B.Q,B.T,!0,B.V,!0,!1,!0,!0,!0,!0,!1)
B.bw=new A.cl(2,"srcAlpha")
B.bx=new A.cl(3,"oneMinusSrcAlpha")
B.bY=new A.cs(!0,B.W,!1,!0,B.bw,B.bx,B.T,!0,B.V,!0,!1,!0,!0,!0,!0,!1)
B.cI=new A.v(0.03,0.03,0.04)
B.H=new A.v(0,0,0)
B.dj=s([],t.bs)
B.ab=s([],t.w)
B.dk=s([],t.az)
B.dl=s([],A.bL("q<rf>"))
B.bZ=new A.eS(B.cI,B.H,0,1,null,null,B.S,0.02,0,0.7,0.35,1,12,1,1,1,1,1,1,1,0.003,B.H,0,0,B.S,0,null,B.dj,B.ab,B.dk,B.dl,null)
B.c_=new A.a_(0,0,0)
B.c0=new A.cu(0,"idle")
B.R=new A.cu(1,"active")
B.c1=new A.cu(2,"ended")
B.c2=new A.cu(3,"aborted")
B.a6=new A.di(0,"outside")
B.c3=new A.di(1,"intersects")
B.c4=new A.di(2,"inside")
B.c5=new A.eV(0,"vertex")
B.aJ=new A.eV(1,"indices")
B.aK=new A.ia(0,"staticDraw")
B.i=new A.eW(0,"ready")
B.X=new A.eW(1,"lost")
B.c6=new A.cv(0,"color")
B.aL=new A.cv(1,"colorAndGlow")
B.c7=new A.cv(2,"colorDepthGlow")
B.a7=new A.cv(3,"depthOnly")
B.a8=new A.eY(1,"linear")
B.ca=new A.eZ(0,"clampToEdge")
B.c8=new A.eX(1,1,1,!1,B.a8,B.a8,B.ca,1)
B.c9=new A.eY(2,"linearMipmapLinear")
B.cb=new A.eZ(1,"repeat")
B.cc=new A.bf(0,"beforeShadow")
B.cd=new A.bf(2,"beforeDepth")
B.a9=new A.bf(3,"afterDepth")
B.aM=new A.bf(4,"beforeWorld")
B.ce=new A.bf(5,"afterWorld")
B.E=new A.bf(6,"afterResolve")
B.cf=new A.bf(9,"beforePresent")
B.aN=new A.aY(0,"readBeforeWrite")
B.cg=new A.aY(1,"duplicateWriter")
B.ch=new A.aY(2,"sampledMultisampledAttachment")
B.aa=new A.aY(3,"invalidResolve")
B.ci=new A.aY(4,"formatOrSizeMismatch")
B.cj=new A.aY(5,"unversionedReadWrite")
B.ck=new A.aY(6,"invalidHistoryRead")
B.cl=new A.aY(7,"dependencyCycle")
B.cm=new A.aY(8,"missingCapability")
B.aO=new A.cw(0,"wrongKind")
B.aP=new A.cw(1,"staleGeneration")
B.cn=new A.cw(2,"doubleRelease")
B.Y=new A.cw(3,"releasedResource")
B.hT=new A.v(0.25,0.55,1)
B.aQ=new A.v(0.02,0.03,0.05)
B.cv=new A.v(0.06,0.08,0.12)
B.cw=new A.v(1,0.25,0.25)
B.cx=new A.v(0.08,0.02,0.04)
B.hU=new A.v(0.06,0.08,0.11)
B.cB=new A.v(0.22,0.48,0.95)
B.cC=new A.v(0.95,0.12,0.22)
B.hV=new A.v(0.1,0.12,0.15)
B.cD=new A.v(0.25,0.5,1)
B.cE=new A.v(0.04,0.05,0.07)
B.cF=new A.v(0.04,0.08,0.16)
B.hW=new A.v(0.05,0.07,0.1)
B.cG=new A.v(0.92,0.94,0.97)
B.cH=new A.v(0.12,0.15,0.2)
B.cK=new A.v(0.92,0.35,0.25)
B.cL=new A.v(0.1,0.85,0.45)
B.hX=new A.v(0.92,0.94,0.96)
B.cN=new A.v(0.18,0.42,0.98)
B.cO=new A.v(0.2,1,0.45)
B.hY=new A.v(0.85,0.85,0.88)
B.cP=new A.v(0.2,0.85,1)
B.cQ=new A.v(0.03,0.04,0.06)
B.aR=new A.v(0.015,0.02,0.03)
B.cR=new A.v(1,0.85,0.35)
B.hZ=new A.v(0.12,0.14,0.18)
B.cS=new A.v(0.98,0.12,0.22)
B.cU=new A.v(0.1,0.88,0.42)
B.cV=new A.v(0.7,0.8,1)
B.i_=new A.v(0.25,0.75,1)
B.d9=s([0,8,4,14,12],t.t)
B.d1=s([0,16,2,10,8],t.t)
B.cX=s([0,12,1,17,16],t.t)
B.d0=s([1,12,14,5,9],t.t)
B.d8=s([1,9,11,3,17],t.t)
B.da=s([2,13,15,6,10],t.t)
B.dp=s([2,16,17,3,13],t.t)
B.dc=s([3,11,7,15,13],t.t)
B.dq=s([4,8,10,6,18],t.t)
B.cW=s([4,18,19,5,14],t.t)
B.cZ=s([5,19,7,11,9],t.t)
B.d6=s([6,15,7,19,18],t.t)
B.cY=s([B.d9,B.d1,B.cX,B.d0,B.d8,B.da,B.dp,B.dc,B.dq,B.cW,B.cZ,B.d6],t.E)
B.d_=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.d2=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale","uShadowMapTexelSize","uShadowFilterRadius","uShadowBias","uReflectionColor","uReflectionIntensity","uReflectionConfidence","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uSpecularScale","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness","uSurfaceSnowCoverage","uSurfaceDissolution","uThermalSourceCount","uThermalSourcePosition0","uThermalSourceRadius0","uThermalSourceDissolution0","uThermalSourcePosition1","uThermalSourceRadius1","uThermalSourceDissolution1","uThermalSourcePosition2","uThermalSourceRadius2","uThermalSourceDissolution2","uThermalSourcePosition3","uThermalSourceRadius3","uThermalSourceDissolution3"],t.s)
B.d3=s(["uQuantizationBits","uDitherStrength"],t.s)
B.d4=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.d5=s(["uNear","uFar","uLightDir","uLightColor","uShaftIntensity","uFogDensity","uAnisotropy","uViewProjection","uView","uInverseProjection","uVolumetricAlbedo","uVolumetricHeightFalloff","uVolumetricDustDensity","uVolumetricJitter","uVolumetricIntensity","uVolumetricSampleCount"],t.s)
B.d7=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.db=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.bn=new A.a(0,0.35,0)
B.i6=new A.e0(A.qA())
B.ct=new A.b5(0,B.bn,t.c)
B.hp=new A.a(0,0.65,0)
B.cs=new A.b5(2,B.hp,t.c)
B.cr=new A.b5(4,B.bn,t.c)
B.aS=s([B.ct,B.cs,B.cr],A.bL("q<b5<a>>"))
B.bF=new A.dE()
B.dd=s([B.bF],t.e3)
B.h1=new A.a(0,3.2,-6.5)
B.h_=new A.a(6.5,1.8,-3.5)
B.fN=new A.a(7.5,4,3.5)
B.hq=new A.a(2.5,2.2,7)
B.hA=new A.a(-4.5,3.5,6)
B.fY=new A.a(-7.5,1.5,-1)
B.hr=new A.a(-5,4.2,-5.5)
B.de=s([B.h1,B.h_,B.fN,B.hq,B.hA,B.fY,B.hr],t.G)
B.df=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale"],t.s)
B.dg=s([],t.e3)
B.di=s([],t.u)
B.dh=s([],t.h)
B.ae=new A.cF(2,"high")
B.e4={shadows:0,ssao:1,bloom:2,dof:3,grade:4,volumetric:5}
B.eO=new A.b3(B.e4,6,t.P)
B.eu=new A.aF(B.ae,B.eO)
B.dY={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.eL=new A.b3(B.dY,5,t.P)
B.b4=new A.aF(B.ae,B.eL)
B.er=new A.cF(1,"standard")
B.e5={shadows:0}
B.eP=new A.b3(B.e5,1,t.P)
B.et=new A.aF(B.er,B.eP)
B.b2=new A.cF(0,"safe")
B.aY={}
B.aj=new A.b3(B.aY,0,t.P)
B.b3=new A.aF(B.b2,B.aj)
B.ac=s([B.eu,B.b4,B.et,B.b3],A.bL("q<aF>"))
B.dm=s(["uExposure","uVignette","uGrain","uOutputEncoding","uToneMap","uClearColor","uSkyHorizon","uSkyZenith","uSkyGround","uSkyEnabled","uSkyHorizonGlow","uSkyStarDensity","uSkyTexture","uSkyTextureEnabled","uSkyRotation","uSkyExposure","uSkyTextureSrgb","uInverseProjection","uInverseView","uCameraPosition","uCloudCoverage","uCloudDensity","uCloudBaseHeight","uCloudThickness","uCloudScale","uCloudWind","uCloudPhase","uCloudDetail","uCloudSilverLining","uCloudSampleCount","uCloudLightDirection","uCloudLightColor","uCloudLightIntensity"],t.s)
B.ak=new A.an(0,"depthTest")
B.al=new A.an(1,"depthFunc")
B.am=new A.an(2,"depthWrite")
B.an=new A.an(3,"blendEnable")
B.ao=new A.an(4,"blendFunc")
B.ap=new A.an(5,"blendEquation")
B.aq=new A.an(6,"cullEnable")
B.ar=new A.an(7,"cullFace")
B.bd=new A.an(8,"frontFace")
B.f7=new A.an(9,"stencilEnable")
B.bb=new A.an(10,"colorMask")
B.bc=new A.an(11,"scissorEnable")
B.dn=s([B.ak,B.al,B.am,B.an,B.ao,B.ap,B.aq,B.ar,B.bd,B.f7,B.bb,B.bc],A.bL("q<an>"))
B.dr=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.ds=s(["uBloomStrength"],t.s)
B.dt=s(["uLutSize","uStrength"],t.s)
B.du=s(["uTexelSize","uNear","uFar"],t.s)
B.aT=s(["uTexelStep"],t.s)
B.dv=s(["uVolumetricStrength"],t.s)
B.dw=new A.f8(0,"once")
B.dx=new A.f8(1,"loop")
B.e6={uAlbedo:0}
B.aU=new A.X(B.e6,[0],t.I)
B.ed={uSsaoRaw:0,uSceneDepth:1}
B.dy=new A.X(B.ed,[0,1],t.I)
B.ea={uScene:0,uHistory:1}
B.dz=new A.X(B.ea,[0,1],t.I)
B.e1={aPosition:0,aUvMat:1}
B.aV=new A.X(B.e1,[0,4],t.I)
B.eb={uScene:0,uLut:1}
B.dA=new A.X(B.eb,[0,1],t.I)
B.ec={uSource:0}
B.aW=new A.X(B.ec,[0],t.I)
B.e3={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.dB=new A.X(B.e3,[0,1,2,3,4,5,6],t.I)
B.e_={uSharp:0,uBlurred:1,uSceneDepth:2}
B.dC=new A.X(B.e_,[0,1,2],t.I)
B.ee={uTex:0,uSkyTexture:1}
B.dD=new A.X(B.ee,[0,1],t.I)
B.e7={uBloom:0}
B.dE=new A.X(B.e7,[0],t.I)
B.e8={uSceneDepth:0}
B.aX=new A.X(B.e8,[0],t.I)
B.e9={uScene:0}
B.dF=new A.X(B.e9,[0],t.I)
B.w=new A.X(B.aY,[],t.I)
B.dX={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.dG=new A.X(B.dX,[0,1,2,3,4,5,6],t.I)
B.ef={uVolumetric:0}
B.dH=new A.X(B.ef,[0],t.I)
B.e2={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.dI=new A.X(B.e2,[0,1,2,3],t.I)
B.i0=new A.fa(0,"srgb")
B.i1=new A.fa(1,"linear")
B.dJ=new A.a0("vfx_fire_mat",null,1,0.4,0.05,4,null,1,null,0.2,0,0,0.2,1,1)
B.dK=new A.a0("water_pbr",null,0.08,0.35,0.65,0,null,1,null,0.08,0.45,0.9,0.05,1,1)
B.dL=new A.a0("vfx_splash_mat",null,0.9,0.95,1,1.5,null,1,null,0.3,0,0,0.2,1,1)
B.dM=new A.a0("snow_mat",null,0.95,0.98,1,0,null,1,null,0.8,0.1,0,0.2,1,1)
B.dN=new A.a0("vfx_spark_mat",null,1,0.85,0.4,6,null,1,null,0.1,0,0,0.2,1,1)
B.dO=new A.a0("asteroid_pbr",null,0.28,0.32,0.42,0,null,1,null,0.65,0.4,0,0.2,1,1)
B.dP=new A.a0("vfx_water_mat",null,0.4,0.8,1,0.8,null,1,null,0.1,0.1,0,0.2,1,1)
B.dQ=new A.a0("dust_mat",null,0.7,0.85,1,0.5,null,1,null,0.4,0.2,0,0.2,1,1)
B.dR=new A.a0("vfx_vortex_mat",null,0.85,0.25,1,4.5,null,1,null,0.2,0,0,0.2,1,1)
B.dS=new A.a0("vfx_rocket_mat",null,1,0.2,0.05,5,null,1,null,0.1,0,0,0.2,1,1)
B.dT=new A.a0("conduit_emissive_rail",null,0.1,0.85,1,1.8,null,1,null,0.25,0.85,0,0.2,1,1)
B.dU=new A.a0("buoy_beacon",null,1,0.45,0.1,1.2,null,1,null,0.35,0.5,0,0.2,1,1)
B.dV=new A.a0("vessel_hull_pbr",null,0.95,0.95,0.98,0,null,1,null,0.25,0.85,0,0.2,1,1)
B.dW=new A.a0("ember_mat",null,1,0.45,0.08,2.5,null,1,null,0.2,0,0,0.2,1,1)
B.Z=new A.cB(0,"billboard")
B.aZ=new A.cB(1,"velocityAligned")
B.I=new A.cB(2,"velocityStretched")
B.eg=new A.cB(3,"axial")
B.b_=new A.fm(0,"bounce")
B.b0=new A.fm(1,"kill")
B.f=new A.a(0,0,0)
B.eh=new A.cC(B.f,B.d,0.4,0.1,B.b_)
B.cM=new A.v(0.2,0.05,0.02)
B.ei=new A.aO(1,B.cM)
B.cz=new A.v(1,1,0.8)
B.ej=new A.aO(0,B.cz)
B.cA=new A.v(1,0.65,0.1)
B.ek=new A.aO(0.3,B.cA)
B.cu=new A.v(0.85,0.15,0.02)
B.el=new A.aO(0.7,B.cu)
B.em=new A.fo(0,1,null)
B.en=new A.bY(null,0.8)
B.eo=new A.bY(null,0)
B.ep=new A.bY(B.d,0.05)
B.at=new A.cM(1,"reinhard")
B.eq=new A.fq(1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,8,0,0,0,0,0,0,!1,B.at)
B.es=new A.cF(4,"shipping")
B.dZ={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.eN=new A.b3(B.dZ,7,t.P)
B.i2=new A.aF(B.es,B.eN)
B.o=new A.bZ(0,0,0,1)
B.af=new A.cH(0,"constructed")
B.ev=new A.cH(1,"initializing")
B.ag=new A.cH(2,"ready")
B.ah=new A.cH(3,"contextLost")
B.h=new A.dM(0,"read")
B.j=new A.dM(1,"write")
B.F=new A.dM(2,"historyRead")
B.u=new A.fw(0,"rgba8")
B.ew=new A.W("dofBlurH",B.u,192,108,1,0)
B.ex=new A.W("dofBlurV",B.u,192,108,1,0)
B.ey=new A.W("dofOutput",B.u,384,216,1,0)
B.b5=new A.fw(2,"depth24")
B.ez=new A.W("shadowMap",B.b5,512,512,1,0)
B.eA=new A.W("volumetricLight",B.u,192,108,1,0)
B.eB=new A.W("sceneColor",B.u,384,216,1,1)
B.eC=new A.W("ssaoRaw",B.u,192,108,1,0)
B.eD=new A.W("ssaoBlurred",B.u,192,108,1,0)
B.eE=new A.W("gradeOutput",B.u,384,216,1,0)
B.eF=new A.W("vhsOutput",B.u,384,216,1,0)
B.eG=new A.W("sceneDepth",B.b5,384,216,1,0)
B.eH=new A.W("bloomBlurH",B.u,192,108,1,0)
B.eI=new A.W("bloomBlurV",B.u,192,108,1,0)
B.eJ=new A.W("present",B.u,384,216,1,0)
B.ai=new A.W("sceneColor",B.u,384,216,1,0)
B.eK=new A.W("ps1Output",B.u,384,216,1,0)
B.e0={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8,volumetric:9}
B.eM=new A.b3(B.e0,10,t.P)
B.b8=new A.cI(2,"link")
B.eQ=new A.dQ(B.b8,"gl.createProgram() returned null")
B.b6=new A.cI(0,"vertex")
B.b7=new A.cI(1,"fragment")
B.b9=new A.cI(3,"validation")
B.eR=new A.fB(0,"full")
B.eS=new A.fB(2,"culled")
B.cJ=new A.v(0.12,0.16,0.24)
B.cT=new A.v(0.03,0.06,0.14)
B.eT=new A.dR("showcase_sky",null,B.cJ,B.cT,B.aR,0.12,0.005,0,1,!0,0.32,0.4,650,350,0.0012,0,0,0,0.55,0.25,12)
B.eU=new A.aj(0,"polarNight")
B.eV=new A.aj(1,"astronomicalDawn")
B.eW=new A.aj(10,"civilDusk")
B.eX=new A.aj(11,"nauticalDusk")
B.eY=new A.aj(12,"astronomicalDusk")
B.eZ=new A.aj(13,"night")
B.f_=new A.aj(14,"polarDay")
B.f0=new A.aj(2,"nauticalDawn")
B.f1=new A.aj(3,"civilDawn")
B.f2=new A.aj(4,"sunrise")
B.ba=new A.aj(5,"morning")
B.f3=new A.aj(6,"solarNoon")
B.f4=new A.aj(7,"afternoon")
B.f5=new A.aj(8,"goldenHour")
B.f6=new A.aj(9,"sunset")
B.f8=new A.cL(0,"birth")
B.be=new A.cL(1,"death")
B.as=new A.cL(2,"collision")
B.bf=new A.cL(3,"trail")
B.bg=new A.cM(0,"off")
B.f9=new A.cM(2,"aces")
B.au=new A.cM(3,"agx")
B.A=new A.O(B.f,B.o,1)
B.fa=A.aW("r2")
B.fb=A.aW("r3")
B.fc=A.aW("i_")
B.fd=A.aW("i0")
B.fe=A.aW("oe")
B.ff=A.aW("of")
B.fg=A.aW("og")
B.fh=A.aW("N")
B.fi=A.aW("z")
B.fj=A.aW("p7")
B.fk=A.aW("p8")
B.fl=A.aW("p9")
B.fm=A.aW("dU")
B.c=new A.bq(0,"float1")
B.N=new A.bq(1,"float2")
B.l=new A.bq(2,"float3")
B.fn=new A.bq(3,"float4")
B.t=new A.bq(4,"mat4")
B.bh=new A.bq(5,"mat4Array")
B.av=new A.h(B.c,0)
B.bi=new A.h(B.c,1)
B.J=new A.bq(6,"sampler")
B.v=new A.h(B.J,0)
B.O=new A.h(B.J,1)
B.bj=new A.h(B.J,2)
B.fo=new A.h(B.J,3)
B.fp=new A.h(B.J,4)
B.fq=new A.h(B.J,5)
B.fr=new A.h(B.J,6)
B.ax=new A.B(0,0)
B.fs=new A.B(0,1)
B.ay=new A.B(0.5,0.5)
B.az=new A.B(1,0)
B.ft=new A.B(1,1)
B.fu=new A.B(-0.7,0.7)
B.fv=new A.B(0.8,-0.6)
B.fw=new A.B(0.3,0.95)
B.fx=new A.B(1,0.2)
B.fy=new A.B(0.5,1)
B.p=new A.a(0,0,1)
B.D=new A.a(0,0,-1)
B.fz=new A.a(0,10,0)
B.fA=new A.a(0,1,1)
B.fB=new A.a(0,2,0)
B.bk=new A.a(0,2,5)
B.fC=new A.a(0,2,7)
B.fD=new A.a(0,3,8)
B.fE=new A.a(0,5,0)
B.fF=new A.a(0,6,0)
B.fG=new A.a(0,-3,0)
B.fH=new A.a(0,-6,0)
B.fJ=new A.a(10,1,10)
B.fK=new A.a(10,-5,2)
B.fL=new A.a(12,1,12)
B.fM=new A.a(12,5,12)
B.k=new A.a(1,0,0)
B.fO=new A.a(1,0,1)
B.fP=new A.a(1,1,0)
B.fQ=new A.a(1,1,1)
B.fR=new A.a(1,1,-1)
B.fS=new A.a(1,-1,1)
B.fT=new A.a(1,-1,-1)
B.fU=new A.a(20,10,20)
B.fV=new A.a(0,0.2,0)
B.fW=new A.a(0.15,-0.75,0.1)
B.P=new A.a(0,-9.81,0)
B.fZ=new A.a(8,4,8)
B.h0=new A.a(0.05,0.45,0.02)
B.bl=new A.a(0,0.8,0)
B.h2=new A.a(1/0,1/0,1/0)
B.h3=new A.a(0.9,-1.9,0.4)
B.h4=new A.a(0.015,-0.015,0.01)
B.h5=new A.a(1,0.3,0.2)
B.a_=new A.a(0,-0.9,0)
B.h8=new A.a(0,0.4,0)
B.h9=new A.a(0.8,-0.5,0)
B.ha=new A.a(0,-2.5,0)
B.hd=new A.a(0.04,-0.03,0.02)
B.he=new A.a(0.4,-1.2,0.2)
B.hg=new A.a(4,0.5,4)
B.hi=new A.a(5.2,0,5.2)
B.bm=new A.a(0,-0.2,-1)
B.x=new A.a(-1,0,0)
B.hj=new A.a(-1,1,1)
B.hk=new A.a(-1,1,-1)
B.hl=new A.a(-1,-1,1)
B.hm=new A.a(-1,-1,-1)
B.hs=new A.a(0.3,0.85,0.2)
B.ht=new A.a(0,0.6,0)
B.hu=new A.a(5.5,0,-5.5)
B.hw=new A.a(0.12,-0.12,0.08)
B.hz=new A.a(-1/0,-1/0,-1/0)
B.i5=new A.jv(0,"position")
B.bp=new A.fX(0,"horizontal")
B.hN=new A.fX(1,"vertical")
B.bq=new A.h1(0,"horizontal")
B.hO=new A.h1(1,"vertical")
B.hP=new A.e0(A.qB())
B.a0=new A.ec(0,"empty")
B.hQ=new A.ec(1,"cpuReady")
B.a1=new A.ec(4,"released")})();(function staticFields(){$.jW=null
$.aI=A.b([],A.bL("q<z>"))
$.mH=null
$.mg=null
$.mf=null
$.nD=null
$.ny=null
$.nF=null
$.ky=null
$.kE=null
$.m2=null
$.jX=A.b([],A.bL("q<A<z>?>"))
$.cU=null
$.er=null
$.es=null
$.lU=!1
$.U=B.C
$.mE=5000
$.mp=2000})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"r5","nK",()=>A.kA("_$dart_dartClosure"))
s($,"r4","m6",()=>A.kA("_$dart_dartClosure_dartJSInterop"))
s($,"rs","nV",()=>A.b([new J.f4()],A.bL("q<dP>")))
s($,"rg","nL",()=>A.bp(A.ju({
toString:function(){return"$receiver$"}})))
s($,"rh","nM",()=>A.bp(A.ju({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"ri","nN",()=>A.bp(A.ju(null)))
s($,"rj","nO",()=>A.bp(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"rm","nR",()=>A.bp(A.ju(void 0)))
s($,"rn","nS",()=>A.bp(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"rl","nQ",()=>A.bp(A.mW(null)))
s($,"rk","nP",()=>A.bp(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"rp","nU",()=>A.bp(A.mW(void 0)))
s($,"ro","nT",()=>A.bp(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"rq","mc",()=>A.pm())
s($,"rr","eu",()=>A.hx(B.fi))
s($,"r1","nJ",()=>B.ai.d9())
s($,"ra","mb",()=>A.fk(A.b([255,255,255,255],t.t)))
s($,"r7","m8",()=>A.fk(A.b([128,128,255,255],t.t)))
s($,"r6","m7",()=>A.fk(A.b([0,0,0,255],t.t)))
s($,"r8","m9",()=>A.fk(A.b([255,255,0,255],t.t)))
s($,"r9","ma",()=>A.fk(A.b([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.cA,SharedArrayBuffer:A.cA,ArrayBufferView:A.dB,DataView:A.fc,Float32Array:A.dy,Float64Array:A.fd,Int16Array:A.fe,Int32Array:A.ff,Int8Array:A.fg,Uint16Array:A.fh,Uint32Array:A.fi,Uint8ClampedArray:A.dC,CanvasPixelArray:A.dC,Uint8Array:A.fj})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.ag.$nativeSuperclassTag="ArrayBufferView"
A.e5.$nativeSuperclassTag="ArrayBufferView"
A.e6.$nativeSuperclassTag="ArrayBufferView"
A.dz.$nativeSuperclassTag="ArrayBufferView"
A.e7.$nativeSuperclassTag="ArrayBufferView"
A.e8.$nativeSuperclassTag="ArrayBufferView"
A.dA.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.kF
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
