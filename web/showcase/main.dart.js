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
if(a[b]!==s){A.p8(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.d(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.kv(b)
return new s(c,this)}:function(){if(s===null)s=A.kv(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.kv(a).prototype
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
kB(a,b,c,d){return{i:a,p:b,e:c,x:d}},
kx(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.kz==null){A.oT()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.b(A.lh("Return interceptor for "+A.o(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iR
if(o==null)o=$.iR=A.jx(n)
p=q[o]}if(p!=null)return p
p=A.oZ(a)
if(p!=null)return p
if(typeof a=="function")return B.bQ
s=Object.getPrototypeOf(a)
if(s==null)return B.aL
if(s===Object.prototype)return B.aL
if(typeof q=="function"){o=$.iR
if(o==null)o=$.iR=A.jx(n)
Object.defineProperty(q,o,{value:B.am,enumerable:false,writable:true,configurable:true})
return B.am}return B.am},
kU(a,b){if(a<0||a>4294967295)throw A.b(A.aY(a,0,4294967295,"length",null))
return J.kW(new Array(a),b)},
kV(a,b){if(a<0)throw A.b(A.j("Length must be a non-negative integer: "+a,null))
return A.d(new Array(a),b.h("t<0>"))},
k_(a,b){if(a<0)throw A.b(A.j("Length must be a non-negative integer: "+a,null))
return A.d(new Array(a),b.h("t<0>"))},
kW(a,b){var s=A.d(a,b.h("t<0>"))
s.$flags=1
return s},
mB(a,b){var s=t.e8
return J.kK(s.a(a),s.a(b))},
kX(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
mC(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.kX(r))break;++b}return b},
mD(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.h(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.kX(q))break}return b},
bY(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cQ.prototype
return J.eo.prototype}if(typeof a=="string")return J.bj.prototype
if(a==null)return J.cR.prototype
if(typeof a=="boolean")return J.en.prototype
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bk.prototype
if(typeof a=="symbol")return J.cU.prototype
if(typeof a=="bigint")return J.cS.prototype
return a}if(a instanceof A.w)return a
return J.kx(a)},
jw(a){if(typeof a=="string")return J.bj.prototype
if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bk.prototype
if(typeof a=="symbol")return J.cU.prototype
if(typeof a=="bigint")return J.cS.prototype
return a}if(a instanceof A.w)return a
return J.kx(a)},
cy(a){if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bk.prototype
if(typeof a=="symbol")return J.cU.prototype
if(typeof a=="bigint")return J.cS.prototype
return a}if(a instanceof A.w)return a
return J.kx(a)},
oP(a){if(typeof a=="number")return J.cb.prototype
if(typeof a=="string")return J.bj.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bM.prototype
return a},
oQ(a){if(typeof a=="string")return J.bj.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bM.prototype
return a},
aA(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bY(a).a_(a,b)},
jU(a,b){if(typeof b==="number")if(Array.isArray(a)||A.oX(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.cy(a).q(a,b)},
fP(a,b,c){return J.cy(a).A(a,b,c)},
fQ(a,b){return J.cy(a).j(a,b)},
kK(a,b){return J.oP(a).J(a,b)},
jV(a,b){return J.cy(a).X(a,b)},
N(a){return J.bY(a).gK(a)},
a3(a){return J.cy(a).gu(a)},
by(a){return J.jw(a).gp(a)},
dV(a){return J.bY(a).gG(a)},
mg(a,b){return J.oQ(a).cA(a,b)},
c2(a){return J.bY(a).i(a)},
ek:function ek(){},
en:function en(){},
cR:function cR(){},
cT:function cT(){},
bl:function bl(){},
eG:function eG(){},
bM:function bM(){},
bk:function bk(){},
cS:function cS(){},
cU:function cU(){},
t:function t(a){this.$ti=a},
em:function em(){},
hp:function hp(a){this.$ti=a},
cB:function cB(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cb:function cb(){},
cQ:function cQ(){},
eo:function eo(){},
bj:function bj(){}},A={k0:function k0(){},
kY(a){return new A.cV("Field '"+a+"' has been assigned during initialization.")},
mE(a){return new A.cV("Field '"+a+"' has not been initialized.")},
a_(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
f0(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
bX(a,b,c){return a},
kA(a){var s,r
for(s=$.ay.length,r=0;r<s;++r)if(a===$.ay[r])return!0
return!1},
ii(a,b,c,d){A.i_(b,"start")
if(c!=null){A.i_(c,"end")
if(b>c)A.k(A.aY(b,0,c,"start",null))}return new A.dj(a,b,c,d.h("dj<0>"))},
el(){return new A.ck("No element")},
kT(){return new A.ck("Too many elements")},
cn:function cn(){},
cE:function cE(a,b){this.a=a
this.$ti=b},
dr:function dr(){},
cF:function cF(a,b){this.a=a
this.$ti=b},
cV:function cV(a){this.a=a},
ih:function ih(){},
aD:function aD(){},
R:function R(){},
dj:function dj(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ai:function ai(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
d_:function d_(a,b,c){this.a=a
this.b=b
this.$ti=c},
d0:function d0(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
aj:function aj(a,b,c){this.a=a
this.b=b
this.$ti=c},
a1:function a1(a,b,c){this.a=a
this.b=b
this.$ti=c},
F:function F(a,b,c){this.a=a
this.b=b
this.$ti=c},
ah:function ah(){},
df:function df(a,b){this.a=a
this.$ti=b},
dP:function dP(){},
kQ(a,b,c){var s,r,q,p,o,n,m,l=A.u(a),k=A.er(new A.b5(a,l.h("b5<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.A)(k),++i,p=o){r=k[i]
c.a(a.q(0,r))
o=p+1
q[r]=p}n=A.er(new A.aL(a,l.h("aL<2>")),!0,c)
m=new A.P(q,n,b.h("@<0>").O(c).h("P<1,2>"))
m.$keys=k
return m}return new A.cJ(A.mG(a,b,c),b.h("@<0>").O(c).h("cJ<1,2>"))},
mo(){throw A.b(A.bN("Cannot modify constant Set"))},
m2(a){var s=A.m1(a)
if(s!=null)return s
return"minified:"+a},
oX(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
o(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.c2(a)
return s},
eK(a){var s,r=$.l9
if(r==null)r=$.l9=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
mY(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.h(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
eL(a){var s,r,q,p
if(a instanceof A.w)return A.ax(A.c_(a),null)
s=J.bY(a)
if(s===B.bP||s===B.bR||t.ak.b(a)){r=B.ap(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ax(A.c_(a),null)},
la(a){var s,r,q
if(a==null||typeof a=="number"||A.kp(a))return J.c2(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bh)return a.i(0)
if(a instanceof A.aQ)return a.c5(!0)
s=$.mf()
for(r=0;r<1;++r){q=s[r].ej(a)
if(q!=null)return q}return"Instance of '"+A.eL(a)+"'"},
ce(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mX(a){var s=A.ce(a).getUTCFullYear()+0
return s},
mV(a){var s=A.ce(a).getUTCMonth()+1
return s},
mR(a){var s=A.ce(a).getUTCDate()+0
return s},
mS(a){var s=A.ce(a).getUTCHours()+0
return s},
mU(a){var s=A.ce(a).getUTCMinutes()+0
return s},
mW(a){var s=A.ce(a).getUTCSeconds()+0
return s},
mT(a){var s=A.ce(a).getUTCMilliseconds()+0
return s},
mQ(a){var s=a.$thrownJsError
if(s==null)return null
return A.cz(s)},
lb(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.V(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
bZ(a){throw A.b(A.lU(a))},
h(a,b){if(a==null)J.by(a)
throw A.b(A.ju(a,b))},
ju(a,b){var s,r="index"
if(!A.lL(b))return new A.aT(!0,b,r,null)
s=A.a(J.by(a))
if(b<0||b>=s)return A.ho(b,s,a,r)
return new A.da(null,null,!0,b,r,"Value not in range")},
lU(a){return new A.aT(!0,a,null,null)},
dT(a){return a},
b(a){return A.V(a,new Error())},
V(a,b){var s
if(a==null)a=new A.ba()
b.dartException=a
s=A.p9
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
p9(){return J.c2(this.dartException)},
k(a,b){throw A.V(a,b==null?new Error():b)},
bx(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.k(A.o_(a,b,c),s)},
o_(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.dn("'"+s+"': Cannot "+o+" "+l+k+n)},
A(a){throw A.b(A.aC(a))},
bb(a){var s,r,q,p,o,n
a=A.p2(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.d([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.io(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
ip(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
lg(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
k1(a,b){var s=b==null,r=s?null:b.method
return new A.ep(a,r,s?null:b.receiver)},
c1(a){var s
if(a==null)return new A.hE(a)
if(a instanceof A.cN){s=a.a
return A.bw(a,s==null?A.dQ(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bw(a,a.dartException)
return A.oA(a)},
bw(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
oA(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.d.de(r,16)&8191)===10)switch(q){case 438:return A.bw(a,A.k1(A.o(s)+" (Error "+q+")",null))
case 445:case 5007:A.o(s)
return A.bw(a,new A.d7())}}if(a instanceof TypeError){p=$.m5()
o=$.m6()
n=$.m7()
m=$.m8()
l=$.mb()
k=$.mc()
j=$.ma()
$.m9()
i=$.me()
h=$.md()
g=p.a4(s)
if(g!=null)return A.bw(a,A.k1(A.ae(s),g))
else{g=o.a4(s)
if(g!=null){g.method="call"
return A.bw(a,A.k1(A.ae(s),g))}else if(n.a4(s)!=null||m.a4(s)!=null||l.a4(s)!=null||k.a4(s)!=null||j.a4(s)!=null||m.a4(s)!=null||i.a4(s)!=null||h.a4(s)!=null){A.ae(s)
return A.bw(a,new A.d7())}}return A.bw(a,new A.f4(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.di()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bw(a,new A.aT(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.di()
return a},
cz(a){var s
if(a instanceof A.cN)return a.b
if(a==null)return new A.dE(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.dE(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
fO(a){if(a==null)return J.N(a)
if(typeof a=="object")return A.eK(a)
return J.N(a)},
oN(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.A(0,a[s],a[r])}return b},
oO(a,b){var s,r=a.length
for(s=0;s<r;++s)b.j(0,a[s])
return b},
oc(a,b,c,d,e,f){t.Z.a(a)
switch(A.a(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.iD("Unsupported number of arguments for wrapped closure"))},
cw(a,b){var s=a.$identity
if(!!s)return s
s=A.oH(a,b)
a.$identity=s
return s},
oH(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.oc)},
mn(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.eZ().constructor.prototype):Object.create(new A.c4(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.kP(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.mj(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.kP(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
mj(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.mh)}throw A.b("Error in functionType of tearoff")},
mk(a,b,c,d){var s=A.kO
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
kP(a,b,c,d){if(c)return A.mm(a,b,d)
return A.mk(b.length,d,a,b)},
ml(a,b,c,d){var s=A.kO,r=A.mi
switch(b?-1:a){case 0:throw A.b(new A.eQ("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
mm(a,b,c){var s,r
if($.kM==null)$.kM=A.kL("interceptor")
if($.kN==null)$.kN=A.kL("receiver")
s=b.length
r=A.ml(s,c,a,b)
return r},
kv(a){return A.mn(a)},
mh(a,b){return A.dJ(v.typeUniverse,A.c_(a.a),b)},
kO(a){return a.a},
mi(a){return a.b},
kL(a){var s,r,q,p=new A.c4("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.j("Field name "+a+" not found.",null))},
jx(a){return v.getIsolateTag(a)},
m0(){return v.G},
oZ(a){var s,r,q,p,o,n=A.ae($.lY.$1(a)),m=$.jv[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jB[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bU($.lT.$2(a,n))
if(q!=null){m=$.jv[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jB[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jK(s)
$.jv[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.jB[n]=s
return s}if(p==="-"){o=A.jK(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.lZ(a,s)
if(p==="*")throw A.b(A.lh(n))
if(v.leafTags[n]===true){o=A.jK(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.lZ(a,s)},
lZ(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.kB(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jK(a){return J.kB(a,!1,null,!!a.$iaq)},
p0(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jK(s)
else return J.kB(s,c,null,null)},
oT(){if(!0===$.kz)return
$.kz=!0
A.oU()},
oU(){var s,r,q,p,o,n,m,l
$.jv=Object.create(null)
$.jB=Object.create(null)
A.oS()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.m_.$1(o)
if(n!=null){m=A.p0(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
oS(){var s,r,q,p,o,n,m=B.bc()
m=A.cv(B.bd,A.cv(B.be,A.cv(B.aq,A.cv(B.aq,A.cv(B.bf,A.cv(B.bg,A.cv(B.bh(B.ap),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.lY=new A.jy(p)
$.lT=new A.jz(o)
$.m_=new A.jA(n)},
cv(a,b){return a(b)||b},
oI(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
p7(a,b,c){var s=a.indexOf(b,c)
return s>=0},
p2(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
al:function al(a,b){this.a=a
this.b=b},
dA:function dA(a,b){this.a=a
this.b=b},
dB:function dB(a,b){this.a=a
this.b=b},
bT:function bT(a,b,c){this.a=a
this.b=b
this.c=c},
cJ:function cJ(a,b){this.a=a
this.$ti=b},
cI:function cI(){},
P:function P(a,b,c){this.a=a
this.b=b
this.$ti=c},
bP:function bP(a,b){this.a=a
this.$ti=b},
bQ:function bQ(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cK:function cK(){},
aU:function aU(a,b,c){this.a=a
this.b=b
this.$ti=c},
dg:function dg(){},
io:function io(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
d7:function d7(){},
ep:function ep(a,b,c){this.a=a
this.b=b
this.c=c},
f4:function f4(a){this.a=a},
hE:function hE(a){this.a=a},
cN:function cN(a,b){this.a=a
this.b=b},
dE:function dE(a){this.a=a
this.b=null},
bh:function bh(){},
e0:function e0(){},
e1:function e1(){},
f1:function f1(){},
eZ:function eZ(){},
c4:function c4(a,b){this.a=a
this.b=b},
eQ:function eQ(a){this.a=a},
b3:function b3(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hr:function hr(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
b5:function b5(a,b){this.a=a
this.$ti=b},
cX:function cX(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aL:function aL(a,b){this.a=a
this.$ti=b},
b6:function b6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b4:function b4(a,b){this.a=a
this.$ti=b},
cW:function cW(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
jy:function jy(a){this.a=a},
jz:function jz(a){this.a=a},
jA:function jA(a){this.a=a},
aQ:function aQ(){},
br:function br(){},
cr:function cr(){},
r(a){return a},
eE(a){return new Uint8Array(A.r(a))},
bV(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.ju(b,a))},
cd:function cd(){},
d5:function d5(){},
ew:function ew(){},
a6:function a6(){},
d3:function d3(){},
d4:function d4(){},
d2:function d2(){},
ex:function ex(){},
ey:function ey(){},
ez:function ez(){},
eA:function eA(){},
eB:function eB(){},
eC:function eC(){},
d6:function d6(){},
eD:function eD(){},
dw:function dw(){},
dx:function dx(){},
dy:function dy(){},
dz:function dz(){},
k7(a,b){var s=b.c
return s==null?b.c=A.dH(a,"bC",[b.x]):s},
lc(a){var s=a.w
if(s===6||s===7)return A.lc(a.x)
return s===11||s===12},
nc(a){return a.as},
bv(a){return A.iZ(v.typeUniverse,a,!1)},
bW(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bW(a1,s,a3,a4)
if(r===s)return a2
return A.lz(a1,r,!0)
case 7:s=a2.x
r=A.bW(a1,s,a3,a4)
if(r===s)return a2
return A.ly(a1,r,!0)
case 8:q=a2.y
p=A.cu(a1,q,a3,a4)
if(p===q)return a2
return A.dH(a1,a2.x,p)
case 9:o=a2.x
n=A.bW(a1,o,a3,a4)
m=a2.y
l=A.cu(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.ki(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.cu(a1,j,a3,a4)
if(i===j)return a2
return A.lA(a1,k,i)
case 11:h=a2.x
g=A.bW(a1,h,a3,a4)
f=a2.y
e=A.ox(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.lx(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.cu(a1,d,a3,a4)
o=a2.x
n=A.bW(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.kj(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.dX("Attempted to substitute unexpected RTI kind "+a0))}},
cu(a,b,c,d){var s,r,q,p,o=b.length,n=A.j_(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bW(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
oy(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.j_(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bW(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
ox(a,b,c,d){var s,r=b.a,q=A.cu(a,r,c,d),p=b.b,o=A.cu(a,p,c,d),n=b.c,m=A.oy(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.fo()
s.a=q
s.b=o
s.c=m
return s},
d(a,b){a[v.arrayRti]=b
return a},
kw(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.oR(s)
return a.$S()}return null},
oV(a,b){var s
if(A.lc(b))if(a instanceof A.bh){s=A.kw(a)
if(s!=null)return s}return A.c_(a)},
c_(a){if(a instanceof A.w)return A.u(a)
if(Array.isArray(a))return A.G(a)
return A.ko(J.bY(a))},
G(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
u(a){var s=a.$ti
return s!=null?s:A.ko(a)},
ko(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.o8(a,s)},
o8(a,b){var s=a instanceof A.bh?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.nQ(v.typeUniverse,s.name)
b.$ccache=r
return r},
oR(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iZ(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
ky(a){return A.b0(A.u(a))},
kt(a){var s
if(a instanceof A.aQ)return a.bS()
s=a instanceof A.bh?A.kw(a):null
if(s!=null)return s
if(t.dm.b(a))return J.dV(a).a
if(Array.isArray(a))return A.G(a)
return A.c_(a)},
b0(a){var s=a.r
return s==null?a.r=new A.iY(a):s},
oM(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.h(q,0)
s=A.dJ(v.typeUniverse,A.kt(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.h(q,r)
s=A.lC(v.typeUniverse,s,A.kt(q[r]))}return A.dJ(v.typeUniverse,s,a)},
aH(a){return A.b0(A.iZ(v.typeUniverse,a,!1))},
o7(a){var s=this
s.b=A.ov(s)
return s.b(a)},
ov(a){var s,r,q,p,o
if(a===t.K)return A.oi
if(A.c0(a))return A.om
s=a.w
if(s===6)return A.o5
if(s===1)return A.lN
if(s===7)return A.od
r=A.ou(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.c0)){a.f="$i"+q
if(q==="y")return A.og
if(a===t.m)return A.of
return A.ol}}else if(s===10){p=A.oI(a.x,a.y)
o=p==null?A.lN:p
return o==null?A.dQ(o):o}return A.o3},
ou(a){if(a.w===8){if(a===t.S)return A.lL
if(a===t.i||a===t.p)return A.oh
if(a===t.N)return A.ok
if(a===t.y)return A.kp}return null},
o6(a){var s=this,r=A.o2
if(A.c0(s))r=A.nW
else if(s===t.K)r=A.dQ
else if(A.cA(s)){r=A.o4
if(s===t.h6)r=A.nV
else if(s===t.dk)r=A.bU
else if(s===t.fQ)r=A.nT
else if(s===t.cg)r=A.lF
else if(s===t.cD)r=A.nU
else if(s===t.bX)r=A.J}else if(s===t.S)r=A.a
else if(s===t.N)r=A.ae
else if(s===t.y)r=A.j1
else if(s===t.p)r=A.aR
else if(s===t.i)r=A.fM
else if(s===t.m)r=A.p
s.a=r
return s.a(a)},
o3(a){var s=this
if(a==null)return A.cA(s)
return A.oY(v.typeUniverse,A.oV(a,s),s)},
o5(a){if(a==null)return!0
return this.x.b(a)},
ol(a){var s,r=this
if(a==null)return A.cA(r)
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bY(a)[s]},
og(a){var s,r=this
if(a==null)return A.cA(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bY(a)[s]},
of(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.w)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
lM(a){if(typeof a=="object"){if(a instanceof A.w)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
o2(a){var s=this
if(a==null){if(A.cA(s))return a}else if(s.b(a))return a
throw A.V(A.lG(a,s),new Error())},
o4(a){var s=this
if(a==null||s.b(a))return a
throw A.V(A.lG(a,s),new Error())},
lG(a,b){return new A.dF("TypeError: "+A.ls(a,A.ax(b,null)))},
ls(a,b){return A.h5(a)+": type '"+A.ax(A.kt(a),null)+"' is not a subtype of type '"+b+"'"},
aG(a,b){return new A.dF("TypeError: "+A.ls(a,b))},
od(a){var s=this
return s.x.b(a)||A.k7(v.typeUniverse,s).b(a)},
oi(a){return a!=null},
dQ(a){if(a!=null)return a
throw A.V(A.aG(a,"Object"),new Error())},
om(a){return!0},
nW(a){return a},
lN(a){return!1},
kp(a){return!0===a||!1===a},
j1(a){if(!0===a)return!0
if(!1===a)return!1
throw A.V(A.aG(a,"bool"),new Error())},
nT(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.V(A.aG(a,"bool?"),new Error())},
fM(a){if(typeof a=="number")return a
throw A.V(A.aG(a,"double"),new Error())},
nU(a){if(typeof a=="number")return a
if(a==null)return a
throw A.V(A.aG(a,"double?"),new Error())},
lL(a){return typeof a=="number"&&Math.floor(a)===a},
a(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.V(A.aG(a,"int"),new Error())},
nV(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.V(A.aG(a,"int?"),new Error())},
oh(a){return typeof a=="number"},
aR(a){if(typeof a=="number")return a
throw A.V(A.aG(a,"num"),new Error())},
lF(a){if(typeof a=="number")return a
if(a==null)return a
throw A.V(A.aG(a,"num?"),new Error())},
ok(a){return typeof a=="string"},
ae(a){if(typeof a=="string")return a
throw A.V(A.aG(a,"String"),new Error())},
bU(a){if(typeof a=="string")return a
if(a==null)return a
throw A.V(A.aG(a,"String?"),new Error())},
p(a){if(A.lM(a))return a
throw A.V(A.aG(a,"JSObject"),new Error())},
J(a){if(a==null)return a
if(A.lM(a))return a
throw A.V(A.aG(a,"JSObject?"),new Error())},
lQ(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ax(a[q],b)
return s},
op(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.lQ(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ax(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
lI(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.d([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.j(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.h(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.ax(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.ax(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.ax(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.ax(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.ax(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
ax(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.ax(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.ax(a.x,b)+">"
if(l===8){p=A.oz(a.x)
o=a.y
return o.length>0?p+("<"+A.lQ(o,b)+">"):p}if(l===10)return A.op(a,b)
if(l===11)return A.lI(a,b,null)
if(l===12)return A.lI(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.h(b,n)
return b[n]}return"?"},
oz(a){var s=A.m1(a)
if(s!=null)return s
return"minified:"+a},
nR(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
nQ(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iZ(a,b,!1)
else if(typeof m=="number"){s=m
r=A.dI(a,5,"#")
q=A.j_(s)
for(p=0;p<s;++p)q[p]=r
o=A.dH(a,b,q)
n[b]=o
return o}else return m},
nP(a,b){return A.lD(a.tR,b)},
nO(a,b){return A.lD(a.eT,b)},
iZ(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.lB(a,null,b,!1)
r.set(b,s)
return s},
dJ(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.lB(a,b,c,!0)
q.set(c,r)
return r},
lC(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.ki(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
lB(a,b,c,d){return A.nG(A.nA(a,b,c,d))},
bu(a,b){b.a=A.o6
b.b=A.o7
return b},
dI(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aN(null,null)
s.w=b
s.as=c
r=A.bu(a,s)
a.eC.set(c,r)
return r},
lz(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.nM(a,b,r,c)
a.eC.set(r,s)
return s},
nM(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.c0(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.cA(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.aN(null,null)
q.w=6
q.x=b
q.as=c
return A.bu(a,q)},
ly(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.nK(a,b,r,c)
a.eC.set(r,s)
return s},
nK(a,b,c,d){var s,r
if(d){s=b.w
if(A.c0(b)||b===t.K)return b
else if(s===1)return A.dH(a,"bC",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.aN(null,null)
r.w=7
r.x=b
r.as=c
return A.bu(a,r)},
nN(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aN(null,null)
s.w=13
s.x=b
s.as=q
r=A.bu(a,s)
a.eC.set(q,r)
return r},
dG(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
nJ(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
dH(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.dG(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.aN(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bu(a,r)
a.eC.set(p,q)
return q},
ki(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.dG(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.aN(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bu(a,o)
a.eC.set(q,n)
return n},
lA(a,b,c){var s,r,q="+"+(b+"("+A.dG(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aN(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bu(a,s)
a.eC.set(q,r)
return r},
lx(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.dG(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.dG(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.nJ(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aN(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bu(a,p)
a.eC.set(r,o)
return o},
kj(a,b,c,d){var s,r=b.as+("<"+A.dG(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.nL(a,b,c,r,d)
a.eC.set(r,s)
return s},
nL(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.j_(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bW(a,b,r,0)
m=A.cu(a,c,r,0)
return A.kj(a,n,m,c!==m)}}l=new A.aN(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bu(a,l)},
nA(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
nG(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.nC(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.lu(a,r,l,k,!1)
else if(q===46)r=A.lu(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bS(a.u,a.e,k.pop()))
break
case 94:k.push(A.nN(a.u,k.pop()))
break
case 35:k.push(A.dI(a.u,5,"#"))
break
case 64:k.push(A.dI(a.u,2,"@"))
break
case 126:k.push(A.dI(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.nE(a,k)
break
case 38:A.nD(a,k)
break
case 63:p=a.u
k.push(A.lz(p,A.bS(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.ly(p,A.bS(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.nB(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.lv(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.nH(a.u,a.e,o)
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
return A.bS(a.u,a.e,m)},
nC(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
lu(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.nR(s,o.x)[p]
if(n==null)A.k('No "'+p+'" in "'+A.nc(o)+'"')
d.push(A.dJ(s,o,n))}else d.push(p)
return m},
nE(a,b){var s,r=a.u,q=A.lt(a,b),p=b.pop()
if(typeof p=="string")b.push(A.dH(r,p,q))
else{s=A.bS(r,a.e,p)
switch(s.w){case 11:b.push(A.kj(r,s,q,a.n))
break
default:b.push(A.ki(r,s,q))
break}}},
nB(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.lt(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bS(p,a.e,o)
q=new A.fo()
q.a=s
q.b=n
q.c=m
b.push(A.lx(p,r,q))
return
case-4:b.push(A.lA(p,b.pop(),s))
return
default:throw A.b(A.dX("Unexpected state under `()`: "+A.o(o)))}},
nD(a,b){var s=b.pop()
if(0===s){b.push(A.dI(a.u,1,"0&"))
return}if(1===s){b.push(A.dI(a.u,4,"1&"))
return}throw A.b(A.dX("Unexpected extended operation "+A.o(s)))},
lt(a,b){var s=b.splice(a.p)
A.lv(a.u,a.e,s)
a.p=b.pop()
return s},
bS(a,b,c){if(typeof c=="string")return A.dH(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.nF(a,b,c)}else return c},
lv(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bS(a,b,c[s])},
nH(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bS(a,b,c[s])},
nF(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.b(A.dX("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.dX("Bad index "+c+" for "+b.i(0)))},
oY(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.X(a,b,null,c,null)
r.set(c,s)}return s},
X(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.c0(d))return!0
s=b.w
if(s===4)return!0
if(A.c0(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.X(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.X(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.X(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.X(a,b.x,c,d,e))return!1
return A.X(a,A.k7(a,b),c,d,e)}if(s===6)return A.X(a,p,c,d,e)&&A.X(a,b.x,c,d,e)
if(q===7){if(A.X(a,b,c,d.x,e))return!0
return A.X(a,b,c,A.k7(a,d),e)}if(q===6)return A.X(a,b,c,p,e)||A.X(a,b,c,d.x,e)
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
if(!A.X(a,j,c,i,e)||!A.X(a,i,e,j,c))return!1}return A.lK(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.lK(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.oe(a,b,c,d,e)}if(o&&q===10)return A.oj(a,b,c,d,e)
return!1},
lK(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.X(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.X(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.X(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.X(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.X(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
oe(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.dJ(a,b,r[o])
return A.lE(a,p,null,c,d.y,e)}return A.lE(a,b.y,null,c,d.y,e)},
lE(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.X(a,b[s],d,e[s],f))return!1
return!0},
oj(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.X(a,r[s],c,q[s],e))return!1
return!0},
cA(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.c0(a))if(s!==6)r=s===7&&A.cA(a.x)
return r},
c0(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
lD(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
j_(a){return a>0?new Array(a):v.typeUniverse.sEA},
aN:function aN(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
fo:function fo(){this.c=this.b=this.a=null},
iY:function iY(a){this.a=a},
fm:function fm(){},
dF:function dF(a){this.a=a},
nv(){var s,r,q
if(self.scheduleImmediate!=null)return A.oB()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.cw(new A.iz(s),1)).observe(r,{childList:true})
return new A.iy(s,r,q)}else if(self.setImmediate!=null)return A.oC()
return A.oD()},
nw(a){self.scheduleImmediate(A.cw(new A.iA(t.M.a(a)),0))},
nx(a){self.setImmediate(A.cw(new A.iB(t.M.a(a)),0))},
ny(a){t.M.a(a)
A.nI(0,a)},
nI(a,b){var s=new A.iW()
s.cF(a,b)
return s},
kr(a){return new A.fc(new A.U($.M,a.h("U<0>")),a.h("fc<0>"))},
kn(a,b){a.$2(0,null)
b.b=!0
return b.a},
kk(a,b){A.nX(a,b)},
km(a,b){b.b7(a)},
kl(a,b){b.b8(A.c1(a),A.cz(a))},
nX(a,b){var s,r,q=new A.j2(b),p=new A.j3(b)
if(a instanceof A.U)a.c2(q,p,t.A)
else{s=t.A
if(a instanceof A.U)a.cm(q,p,s)
else{r=new A.U($.M,t.d)
r.a=8
r.c=a
r.c2(q,p,s)}}},
ku(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.M.ck(new A.jo(s),t.H,t.S,t.A)},
lw(a,b,c){return 0},
jX(a){var s
if(t.Q.b(a)){s=a.gaF()
if(s!=null)return s}return B.J},
o9(a,b){if($.M===B.q)return null
return null},
oa(a,b){if($.M!==B.q)A.o9(a,b)
if(b==null)if(t.Q.b(a)){b=a.gaF()
if(b==null){A.lb(a,B.J)
b=B.J}}else b=B.J
else if(t.Q.b(a))A.lb(a,b)
return new A.aB(a,b)},
kc(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.d;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.ne()
b.aU(new A.aB(new A.aT(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bV(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aI()
b.aG(o.a)
A.co(b,p)
return}b.a^=2
A.fN(null,null,b.b,t.M.a(new A.iJ(o,b)))},
co(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.ks(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.co(d.a,c)
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
A.ks(j.a,j.b)
return}g=$.M
if(g!==h)$.M=h
else g=null
c=c.c
if((c&15)===8)new A.iN(q,d,n).$0()
else if(o){if((c&1)!==0)new A.iM(q,j).$0()}else if((c&2)!==0)new A.iL(d,q).$0()
if(g!=null)$.M=g
c=q.c
if(c instanceof A.U){p=q.a.$ti
p=p.h("bC<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aJ(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.kc(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aJ(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
oq(a,b){var s
if(t.e.b(a))return b.ck(a,t.A,t.K,t.l)
s=t.x
if(s.b(a))return s.a(a)
throw A.b(A.aI(a,"onError",u.c))},
oo(){var s,r
for(s=$.ct;s!=null;s=$.ct){$.dS=null
r=s.b
$.ct=r
if(r==null)$.dR=null
s.a.$0()}},
ow(){$.kq=!0
try{A.oo()}finally{$.dS=null
$.kq=!1
if($.ct!=null)$.kJ().$1(A.lV())}},
lR(a){var s=new A.fd(a),r=$.dR
if(r==null){$.ct=$.dR=s
if(!$.kq)$.kJ().$1(A.lV())}else $.dR=r.b=s},
ot(a){var s,r,q,p=$.ct
if(p==null){A.lR(a)
$.dS=$.dR
return}s=new A.fd(a)
r=$.dS
if(r==null){s.b=p
$.ct=$.dS=s}else{q=r.b
s.b=q
$.dS=r.b=s
if(q==null)$.dR=s}},
pm(a,b){A.bX(a,"stream",t.K)
return new A.fC(b.h("fC<0>"))},
ks(a,b){A.ot(new A.jn(a,b))},
lP(a,b,c,d,e){var s,r=$.M
if(r===c)return d.$0()
$.M=c
s=r
try{r=d.$0()
return r}finally{$.M=s}},
os(a,b,c,d,e,f,g){var s,r=$.M
if(r===c)return d.$1(e)
$.M=c
s=r
try{r=d.$1(e)
return r}finally{$.M=s}},
or(a,b,c,d,e,f,g,h,i){var s,r=$.M
if(r===c)return d.$2(e,f)
$.M=c
s=r
try{r=d.$2(e,f)
return r}finally{$.M=s}},
fN(a,b,c,d){t.M.a(d)
if(B.q!==c){d=c.dr(d)
d=d}A.lR(d)},
iz:function iz(a){this.a=a},
iy:function iy(a,b,c){this.a=a
this.b=b
this.c=c},
iA:function iA(a){this.a=a},
iB:function iB(a){this.a=a},
iW:function iW(){},
iX:function iX(a,b){this.a=a
this.b=b},
fc:function fc(a,b){this.a=a
this.b=!1
this.$ti=b},
j2:function j2(a){this.a=a},
j3:function j3(a){this.a=a},
jo:function jo(a){this.a=a},
bf:function bf(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
bt:function bt(a,b){this.a=a
this.$ti=b},
aB:function aB(a,b){this.a=a
this.b=b},
fh:function fh(){},
dq:function dq(a,b){this.a=a
this.$ti=b},
bO:function bO(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
U:function U(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
iG:function iG(a,b){this.a=a
this.b=b},
iK:function iK(a,b){this.a=a
this.b=b},
iJ:function iJ(a,b){this.a=a
this.b=b},
iI:function iI(a,b){this.a=a
this.b=b},
iH:function iH(a,b){this.a=a
this.b=b},
iN:function iN(a,b,c){this.a=a
this.b=b
this.c=c},
iO:function iO(a,b){this.a=a
this.b=b},
iP:function iP(a){this.a=a},
iM:function iM(a,b){this.a=a
this.b=b},
iL:function iL(a,b){this.a=a
this.b=b},
fd:function fd(a){this.a=a
this.b=null},
fC:function fC(a){this.$ti=a},
dO:function dO(){},
fw:function fw(){},
iU:function iU(a,b){this.a=a
this.b=b},
jn:function jn(a,b){this.a=a
this.b=b},
kd(a,b){var s=a[b]
return s===a?null:s},
kf(a,b,c){if(c==null)a[b]=a
else a[b]=c},
ke(){var s=Object.create(null)
A.kf(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
mF(a,b){return new A.b3(a.h("@<0>").O(b).h("b3<1,2>"))},
l_(a,b,c){return b.h("@<0>").O(c).h("kZ<1,2>").a(A.oN(a,new A.b3(b.h("@<0>").O(c).h("b3<1,2>"))))},
aM(a,b){return new A.b3(a.h("@<0>").O(b).h("b3<1,2>"))},
k2(a){return new A.aP(a.h("aP<0>"))},
an(a){return new A.aP(a.h("aP<0>"))},
cY(a,b){return b.h("l0<0>").a(A.oO(a,new A.aP(b.h("aP<0>"))))},
kh(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
kg(a,b,c){var s=new A.bR(a,b,c.h("bR<0>"))
s.c=a.e
return s},
mG(a,b,c){var s=A.mF(b,c)
a.aA(0,new A.hs(s,b,c))
return s},
mH(a,b){var s,r,q=A.k2(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r)q.j(0,b.a(a[r]))
return q},
k3(a,b){var s=A.k2(b)
s.D(0,a)
return s},
ht(a){var s,r
if(A.kA(a))return"{...}"
s=new A.f_("")
try{r={}
B.a.j($.ay,a)
s.a+="{"
r.a=!0
a.aA(0,new A.hu(r,s))
s.a+="}"}finally{if(0>=$.ay.length)return A.h($.ay,-1)
$.ay.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
nS(){throw A.b(A.bN("Cannot change an unmodifiable set"))},
ds:function ds(){},
dv:function dv(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
dt:function dt(a,b){this.a=a
this.$ti=b},
du:function du(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aP:function aP(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fq:function fq(a){this.a=a
this.c=this.b=null},
bR:function bR(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
hs:function hs(a,b,c){this.a=a
this.b=b
this.c=c},
D:function D(){},
bF:function bF(){},
hu:function hu(a,b){this.a=a
this.b=b},
dK:function dK(){},
cc:function cc(){},
dl:function dl(){},
b9:function b9(){},
dC:function dC(){},
fF:function fF(){},
dm:function dm(a,b){this.a=a
this.$ti=b},
cs:function cs(){},
dL:function dL(){},
oW(a){var s=A.mY(a,null)
if(s!=null)return s
throw A.b(new A.hc(a))},
ms(a,b){a=A.V(a,new Error())
if(a==null)a=A.dQ(a)
a.stack=b.i(0)
throw a},
eq(a,b,c,d){var s,r=c?J.kV(a,d):J.kU(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
er(a,b,c){var s,r=A.d([],c.h("t<0>"))
for(s=J.a3(a);s.k();)B.a.j(r,c.a(s.gl()))
if(b)return r
r.$flags=1
return r},
ar(a,b){var s,r
if(Array.isArray(a))return A.d(a.slice(0),b.h("t<0>"))
s=A.d([],b.h("t<0>"))
for(r=J.a3(a);r.k();)B.a.j(s,r.gl())
return s},
cZ(a,b){var s=A.er(a,!1,b)
s.$flags=3
return s},
le(a,b,c){var s=J.a3(b)
if(!s.k())return a
if(c.length===0){do a+=A.o(s.gl())
while(s.k())}else{a+=A.o(s.gl())
while(s.k())a=a+c+A.o(s.gl())}return a},
ne(){return A.cz(new Error())},
mp(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
kS(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
e3(a){if(a>=10)return""+a
return"0"+a},
h5(a){if(typeof a=="number"||A.kp(a)||a==null)return J.c2(a)
if(typeof a=="string")return JSON.stringify(a)
return A.la(a)},
mt(a,b){A.bX(a,"error",t.K)
A.bX(b,"stackTrace",t.l)
A.ms(a,b)},
dX(a){return new A.dW(a)},
j(a,b){return new A.aT(!1,null,b,a)},
aI(a,b,c){return new A.aT(!0,a,b,c)},
aY(a,b,c,d,e){return new A.da(b,c,!0,a,d,"Invalid value")},
n5(a,b,c){if(0>a||a>c)throw A.b(A.aY(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.aY(b,a,c,"end",null))
return b}return c},
i_(a,b){if(a<0)throw A.b(A.aY(a,0,null,b,null))
return a},
ho(a,b,c,d){return new A.ej(b,!0,a,d,"Index out of range")},
bN(a){return new A.dn(a)},
lh(a){return new A.f3(a)},
l(a){return new A.ck(a)},
aC(a){return new A.e2(a)},
mA(a,b,c){var s,r
if(A.kA(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.d([],t.s)
B.a.j($.ay,a)
try{A.on(a,s)}finally{if(0>=$.ay.length)return A.h($.ay,-1)
$.ay.pop()}r=A.le(b,t.hf.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jZ(a,b,c){var s,r
if(A.kA(a))return b+"..."+c
s=new A.f_(b)
B.a.j($.ay,a)
try{r=s
r.a=A.le(r.a,a,", ")}finally{if(0>=$.ay.length)return A.h($.ay,-1)
$.ay.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
on(a,b){var s,r,q,p,o,n,m,l=a.gu(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.o(l.gl())
B.a.j(b,s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
if(0>=b.length)return A.h(b,-1)
r=b.pop()
if(0>=b.length)return A.h(b,-1)
q=b.pop()}else{p=l.gl();++j
if(!l.k()){if(j<=4){B.a.j(b,A.o(p))
return}r=A.o(p)
if(0>=b.length)return A.h(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gl();++j
for(;l.k();p=o,o=n){n=l.gl();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.h(b,-1)
k-=b.pop().length+2;--j}B.a.j(b,"...")
return}}q=A.o(p)
r=A.o(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.h(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.j(b,m)
B.a.j(b,q)
B.a.j(b,r)},
bH(a,b,c,d,e,f){var s
if(B.j===c){s=J.N(a)
b=J.N(b)
return A.f0(A.a_(A.a_($.dU(),s),b))}if(B.j===d){s=J.N(a)
b=J.N(b)
c=J.N(c)
return A.f0(A.a_(A.a_(A.a_($.dU(),s),b),c))}if(B.j===e){s=J.N(a)
b=J.N(b)
c=J.N(c)
d=J.N(d)
return A.f0(A.a_(A.a_(A.a_(A.a_($.dU(),s),b),c),d))}if(B.j===f){s=J.N(a)
b=J.N(b)
c=J.N(c)
d=J.N(d)
e=J.N(e)
return A.f0(A.a_(A.a_(A.a_(A.a_(A.a_($.dU(),s),b),c),d),e))}s=J.N(a)
b=J.N(b)
c=J.N(c)
d=J.N(d)
e=J.N(e)
f=J.N(f)
f=A.f0(A.a_(A.a_(A.a_(A.a_(A.a_(A.a_($.dU(),s),b),c),d),e),f))
return f},
bz:function bz(a,b,c){this.a=a
this.b=b
this.c=c},
iC:function iC(){},
L:function L(){},
dW:function dW(a){this.a=a},
ba:function ba(){},
aT:function aT(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
da:function da(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
ej:function ej(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
dn:function dn(a){this.a=a},
f3:function f3(a){this.a=a},
ck:function ck(a){this.a=a},
e2:function e2(a){this.a=a},
di:function di(){},
iD:function iD(a){this.a=a},
hc:function hc(a){this.a=a},
m:function m(){},
aa:function aa(a,b,c){this.a=a
this.b=b
this.$ti=c},
Y:function Y(){},
w:function w(){},
fD:function fD(){},
f_:function f_(a){this.a=a},
hD:function hD(a){this.a=a},
a2(a){var s
if(typeof a=="function")throw A.b(A.j("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.nY,a)
s[$.kD()]=a
return s},
nY(a,b,c){t.Z.a(a)
if(A.a(c)>=1)return a.$1(b)
return a.$0()},
lX(a,b,c){return c.a(a[b])},
lJ(a,b){return a[b]},
a8(a,b,c,d){return d.a(a[b].apply(a,c))},
p1(a,b){var s=new A.U($.M,b.h("U<0>")),r=new A.dq(s,b.h("dq<0>"))
a.then(A.cw(new A.jL(r,b),1),A.cw(new A.jM(r),1))
return s},
lO(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
cx(a){if(A.lO(a))return a
return new A.js(new A.dv(t.hg)).$1(a)},
jL:function jL(a,b){this.a=a
this.b=b},
jM:function jM(a){this.a=a},
js:function js(a){this.a=a},
iS:function iS(){this.b=this.a=0},
i2:function i2(a){this.z=a},
cg:function cg(a,b){this.a=a
this.b=b},
au:function au(a,b){this.a=a
this.b=b},
fZ:function fZ(a,b){this.a=a
this.b=b},
h_:function h_(){this.a=null
this.d=0},
eI(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){return new A.eH(f,b,l,d,a4,g,i,o,n,m,j,e,c,a,q,h,r,a3,a2,a1,s,a0,!1,p)},
l8(){return A.eI(0,0.3,0,0,0,1.15,0.08,8,0,1,!1,0.75,0,0,0,B.aj,0,0,0,0,0,0,0,0.22)},
cl:function cl(a,b){this.a=a
this.b=b},
eH:function eH(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){var _=this
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
fX(a,b,c,d,e,f,g){var s,r,q,p
if(!d.gL(0)||d.ga3()<1e-12)throw A.b(A.j("CameraView.look requires a finite, nonzero forward: "+d.i(0),null))
if(!isFinite(e)||e<=0||e>=3.141592653589793)throw A.b(A.j("CameraView.look requires 0 < fovYRadians < pi: "+e,null))
s=d.gE()
if(g.a6(s).ga3()<1e-12)throw A.b(A.j("CameraView.look requires up ("+g.i(0)+") not parallel to forward ("+d.i(0)+")",null))
r=A.l2(b,s,g)
q=A.l3(a,c,e,f)
p=new A.cD(r,q,q.t(0,r),b,s,f,c,a)
p.B()
return p},
cD:function cD(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.z=_.y=_.x=$},
eW:function eW(){},
ea:function ea(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2){var _=this
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
he:function he(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=f},
hf:function hf(){this.b=this.a=0},
bi(a,b){return new A.hn(a,b)},
b8:function b8(){},
at:function at(a,b,c){this.a=a
this.b=b
this.c=c},
av:function av(a,b,c){this.a=a
this.b=b
this.c=c},
aX:function aX(a,b,c){this.a=a
this.b=b
this.c=c},
eF:function eF(a,b,c){this.a=a
this.b=b
this.c=c},
b2:function b2(a,b,c){this.a=a
this.b=b
this.c=c},
ca:function ca(a,b){this.a=a
this.b=b},
hn:function hn(a,b){this.a=a
this.b=b},
jp(a,b,c,d){return A.oF(a,b,c,d)},
oF(a,b,a0,a1){var s=0,r=A.kr(t.fW),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c
var $async$jp=A.ku(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:d=b.length
if(d===0)throw A.b(A.j("bootstrapRenderer requires a non-empty profile ladder",null))
a1.B()
n=A.d([],t.eT)
m=0
i=d-1
h=t.eD
case 3:g=m
if(typeof g!=="number"){q=g.cs()
s=1
break}if(!(g<d)){s=4
break}l=B.a.q(b,m)
k=a.$1(l)
if(k.a!==l)throw A.b(A.j("configurationFor("+l.a.b+") returned a configuration for "+k.a.a.b+". The mapping must be total and faithful, or the renderer runs a graph the host did not choose.",null))
p=6
s=9
return A.kk(a0.dK(k,a1),$async$jp)
case 9:J.fQ(n,new A.cf(l,null))
f=A.er(n,!1,h)
f.$flags=3
g=new A.dZ()
q=g
s=1
break
p=2
s=8
break
case 6:p=5
c=o.pop()
j=A.c1(c)
J.fQ(n,new A.cf(l,j))
if(J.aA(m,i))throw c
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
case 4:throw A.b(A.l("bootstrapRenderer exhausted its ladder without a result"))
case 1:return A.km(q,r)
case 2:return A.kl(o.at(-1),r)}})
return A.kn($async$jp,r)},
oL(a){var s,r,q=B.a.bk(B.a2,new A.jt(a))
if(q>=0)return A.cZ(B.a.cz(B.a2,q),t.W)
s=t.W
r=A.cY([a],s)
r.D(0,B.a2)
return A.cZ(r,s)},
cf:function cf(a,b){this.a=a
this.b=b},
dZ:function dZ(){},
jt:function jt(a){this.a=a},
p3(a,b,c,d){var s,r,q,p,o,n,m=A.d([],t.cw)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.a.j(m,new A.dA(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.a.ad(m,new A.jN())
s=A.d([],t.w)
for(r=A.ii(m,0,A.bX(b,"count",t.S),t.fk),q=r.$ti,r=new A.ai(r,r.gp(0),q.h("ai<R.E>")),q=q.h("R.E");r.k();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
K:function K(a,b,c){this.a=a
this.b=b
this.c=c},
e6:function e6(){},
bo:function bo(a,b,c,d){var _=this
_.b=a
_.c=b
_.d=c
_.e=d},
ap:function ap(){},
jN:function jN(){},
aW(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return new A.bG(d,a,l,k,j,g,f,h,i,e,c,b,m,n)},
k4(a,b,c){return A.aW(null,0.2,0.3,b,0,1,null,null,c,a.c,a.b,a.a,1,1)},
l4(a,b,c,d){return A.aW(null,0.08,a,c,0,1,null,null,d,b.c,b.b,b.a,1,1)},
et(a,b){if(!isFinite(b)||b<0||b>1)throw A.b(A.j("MaterialDefinition."+a+" must be in [0, 1]: "+A.o(b),null))},
fR:function fR(a,b){this.a=a
this.b=b},
eu:function eu(a,b){this.a=a
this.b=b},
bG:function bG(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var _=this
_.a=a
_.b=b
_.d=c
_.e=d
_.f=e
_.x=f
_.z=g
_.Q=h
_.at=i
_.ax=j
_.ch=k
_.CW=l
_.db=m
_.dx=n},
mJ(a){A:{break A}return a},
bd:function bd(a,b){this.a=a
this.b=b},
ac:function ac(a,b,c){this.a=a
this.b=b
this.c=c},
ir:function ir(){},
is:function is(){},
bm:function bm(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hx:function hx(){},
hy:function hy(){},
hz:function hz(){},
h3:function h3(){},
hG(a){var s,r,q="volumetric",p=t.N,o=A.cY(["sceneColor","present"],p),n=a.a.b
if(n.n(0,"shadows"))o.D(0,A.cY(["shadowMap","sceneDepth"],p))
if(n.n(0,q)){o.j(0,"volumetricLight")
o.j(0,"sceneColor#"+(a.d>1?2:1))}if(n.n(0,"ssao"))o.D(0,A.cY(["ssaoRaw","ssaoBlurred"],p))
if(n.n(0,"bloom")){if(a.d>1)s=n.n(0,q)?3:2
else s=n.n(0,q)?2:1
o.D(0,A.cY(["bloomBlurH","bloomBlurV","sceneColor#"+s],p))}if(a.d>1)o.j(0,"sceneColor#1")
if(n.n(0,"dof"))o.D(0,A.cY(["dofBlurH","dofBlurV","dofOutput"],p))
if(n.n(0,"grade"))o.j(0,"gradeOutput")
if(n.n(0,"ps1"))o.j(0,"ps1Output")
r=n.n(0,"vhs")
if(r)o.j(0,"vhsOutput")
return new A.hF(new A.dm(A.k3(o,p),t.am),r)},
hF:function hF(a,b){this.a=a
this.b=b},
hH:function hH(){},
hW:function hW(a){this.b=a},
eP:function eP(){this.a=null
this.c=0
this.d=!1},
cM:function cM(a,b){this.a=a
this.b=b},
fW:function fW(a,b){this.a=a
this.b=b},
bK:function bK(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=i},
lf(a,b,c,d,e){var s,r
if(!isFinite(c)||c<=0)throw A.b(A.j("SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: "+A.o(c),null))
if(!isFinite(d)||d<=0)throw A.b(A.j("SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: "+A.o(d),null))
s=c>d?d:c
r=new A.ij(b,a,B.c.Z(b*s),B.c.Z(a*s),s,!0)
r.B()
return r},
ij:function ij(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fY:function fY(a,b){this.a=a
this.b=b},
dc:function dc(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
ch:function ch(a,b){this.a=a
this.b=b},
T:function T(a,b,c){this.a=a
this.b=b
this.d=c},
hg:function hg(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f},
mI(){return new A.ev(new A.aZ(new A.hw(),A.d([],t.ha),A.d([],t.t),t.ex))},
ev:function ev(a){this.a=a},
hw:function hw(){},
lS(a){var s=4
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
case 3:s=A.k(A.bN("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
nZ(a,b,c){var s,r,q
for(s=0,r=0;r<7;++r){q=B.C[r]
if(A.lS(q.a)===b)s+=q.c}return s},
mK(a){return new A.hA(a,new A.aZ(new A.hB(),A.d([],t.c9),A.d([],t.t),t.cE),A.aM(t.S,t.bw))},
l5(a){var s
A:{s=a.byteLength
break A}return s},
f5:function f5(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hA:function hA(a,b,c){this.a=a
this.b=b
this.c=c},
hB:function hB(){},
hC:function hC(){},
nf(a){var s=new A.f2(a,new A.aZ(new A.ik(),A.d([],t.fq),A.d([],t.t),t.g2),A.aM(t.S,t.j))
s.d=s.a1($.kI())
s.e=s.a1($.kF())
s.f=s.a1($.kG())
s.r=s.a1($.kE())
s.w=s.a1($.kH())
return s},
b_:function b_(a,b,c){this.a=a
this.b=b
this.c=c},
f2:function f2(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
ik:function ik(){},
im:function im(){},
il:function il(){},
p4(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b.gL(0)
if(!i)throw A.b(A.j("invalid volumetric source selection inputs",null))
s=A.an(t.N)
r=A.d([],t.gg)
for(q=0;!1;++q){p=c[q]
p.B()
if(!s.j(0,p.gC()))throw A.b(A.j("duplicate volumetric source id: "+A.o(p.gC()),null))
o=p.gep().a7(0,b).length
i=p.geq()
n=A.nj(p.gen(),o,i)
i=p.gcb().ges()
m=p.gcb().geu()
l=p.gcb().gev()
l=Math.max(A.dT(m),A.dT(l))
k=Math.max(A.dT(i),l)
B.a.j(r,new A.dB(p.geo().t(0,k).t(0,n),p))}B.a.ad(r,new A.jO())
i=A.d([],t.E)
for(m=A.ii(r,0,A.bX(a,"count",t.S),t.eS),l=m.$ti,m=new A.ai(m,m.gp(0),l.h("ai<R.E>")),l=l.h("R.E");m.k();){j=m.d
i.push((j==null?l.a(j):j).b)}return i},
nj(a,b,c){var s,r,q,p,o,n
for(s=[new A.al("distance",b),new A.al("referenceDistance",c),new A.al("cutoffDistance",a)],r=0;r<3;++r){q=s[r]
p=q.b
if(!isFinite(p))A.k(A.j(q.a+" must be finite: "+A.o(p),null))}if(b.cs(0,0)||c.cr(0,0)||a.cr(0,0))throw A.b(A.j("invalid inverse-square attenuation inputs",null))
if(b.cq(0,a))return 0
s=c.t(0,c)
q=c.t(0,c)
o=b.t(0,b)
n=s.cp(0,Math.max(A.dT(q),A.dT(o)))
o=b.cp(0,a)
A.dT(o)
return n.t(0,1-Math.pow(o,4)).I(0,0,1).er(0)},
jO:function jO(){},
bA:function bA(a,b,c,d){var _=this
_.a=a
_.c=_.b=0
_.d=b
_.y=c
_.z=d},
l6(a,b){return new A.bn(b,a,a,b)},
bn:function bn(a,b,c,d){var _=this
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
oE(a){var s,r,q,p,o=A.d([],t.gk)
for(s=a.length,r=t.r,q=0;q<a.length;a.length===s||(0,A.A)(a),++q){p=a[q]
p.gm()
B.a.j(o,new A.bD(p,A.d([p],r)))
continue}return o},
bD:function bD(a,b){this.a=a
this.b=b},
e8:function e8(a){this.a=a},
h8:function h8(){},
h9:function h9(a){this.a=a},
h6:function h6(a){this.a=a},
h7:function h7(a){this.a=a},
e9:function e9(a,b){this.a=a
this.b=b},
c8:function c8(a,b){this.a=a
this.b=b},
eb:function eb(a,b){this.a=a
this.b=b
this.c=0},
nz(){return new A.cq()},
hd:function hd(a){this.a=a
this.b=null},
cq:function cq(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
k5(){return!0},
E:function E(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
hI:function hI(){},
hJ:function hJ(){},
aK:function aK(a,b){this.a=a
this.b=b},
a9:function a9(a,b,c){this.a=a
this.b=b
this.c=c},
eN:function eN(a,b){this.a=a
this.b=b},
b1:function b1(a,b){this.a=a
this.b=b},
O:function O(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
de:function de(a,b){this.a=a
this.b=b},
n:function n(a,b){this.a=a
this.b=b},
cH:function cH(a){this.b=a},
hZ:function hZ(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=_.d=0},
a4:function a4(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
i3:function i3(){},
Z:function Z(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.r=f},
i5:function i5(a,b){this.a=a
this.b=b},
ia:function ia(){},
i9:function i9(){},
i8:function i8(){},
i7:function i7(a){this.a=a},
i6:function i6(a,b,c){this.a=a
this.b=b
this.c=c},
i4:function i4(a,b){this.a=a
this.b=b},
na(a){return new A.db(a,new A.aZ(new A.ib(),A.d([],t.aO),A.d([],t.t),t.b0),A.aM(t.gL,t.cm))},
cp:function cp(a,b,c){this.a=a
this.b=b
this.c=c},
db:function db(a,b,c){this.a=a
this.b=b
this.c=c},
ib:function ib(){},
lH(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.o0(a,r,s,a.x.gl().a.b.a).b},
o0(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.jj(a),j=new A.jk(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.n(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.oG(b,h,B.W,i,s.ge0(),new A.j4(j),new A.j5(j),new A.j6(a),new A.jb(a),new A.jc(a),new A.jd(j),new A.je(j),s.ge2(),new A.jf(a),s.ge6(),r.ge4(),k,s.ge8(),s.gea(),new A.jg(j,c),new A.jh(j),new A.ji(j),new A.j7(j),new A.j8(j),new A.j9(a),new A.ja(j),e,f,g,512)}else{p=new A.O(l,B.m,g,f,e,0)
o=new A.O(l,B.m,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.d1(h,p,o):null
k=A.d([new A.fb(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nout vec4 oColor;\nvoid main(){\n  vec3 n=normalize(vNormal);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+\n    vec3(ndotl)*uDirectLightScale,0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.q)
if(n!=null)k.push(n)
k.push(new A.d9(b,u.l,u.b,h,i,B.W))
q=new A.e8(k)}a.r.toString
m=q.dt(B.a9,new A.i3(),!1,new A.ft())
k=m.a.b
if(k.length!==0)throw A.b(A.l("safe renderer graph is invalid: "+A.o(k)))
return new A.iV(q,m)},
o1(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.b(A.l("renderer graph is not initialized"))
s=b7.c
s=A.ar(new A.aL(s,A.u(s).h("aL<2>")),t.Y)
for(r=0;r<b9.length;++r){q=b9[r]
p=b6.w.a.b
o=p.$ti
n=o.c.a(q.a)
p.ar(n)
p=p.b
n=n.a
if(!(n>=0&&n<p.length))return A.h(p,n)
n=p[n].c
p=(n==null?o.y[1].a(n):n).d
o=q.c.ab()
p=p.gba()
n=A.G(p)
B.a.j(s,new A.fE(new A.b2((r|1073741824)>>>0,0,"transient"),q,A.jW(new A.aj(p,n.h("f(1)").a(o.gbx()),n.h("aj<1,f>")))))}p=b8.a
m=A.oJ(A.mv(p.c),s,b8.d)
for(o=s.length,l=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gm().a
j=b6.w.a
i=n.a
h=j.c.q(0,i)
if(h==null)A.k(A.bi(B.P,n))
j=j.b
g=j.$ti
j.ar(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.h(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
l+=B.d.S(n>0?n:h.e,3)}for(s=m.a,o=s.length,f=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gm().a
j=b6.w.a
i=n.a
h=j.c.q(0,i)
if(h==null)A.k(A.bi(B.P,n))
j=j.b
g=j.$ti
j.ar(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.h(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
f+=B.d.S(n>0?n:h.e,3)}o=t.N
n=A.aM(o,t.a8)
e=new A.hd(n)
e.dq("cull")
j=l-f
d=e.b
if(d==null)A.k(A.l("cull recorded outside an active frame"))
if(j<0)A.k(A.j("cull totals must be non-negative",null))
c=n.q(0,d)
c.c+=j
c.e+=m.b.b
b=A.d([],t.c1)
a=A.d([],t.aM)
for(i=s.length,g=t.k,a0=p.a,a1=t.c,k=0;k<s.length;s.length===i||(0,A.A)(s),++k){a2=s[k]
if(a2.gm().e===B.X)B.a.j(a,new A.W(new A.am(a0.aQ(a2.gm().c.a).c,a2.gC().a),a2,a1))
else B.a.j(b,new A.W(new A.ao(B.cZ,a2.gm().b,a2.gm().a,a2.gC().a),a2,g))}a3=new A.fn(A.oE(A.p6(b)),A.p5(a),p,b8.b,b8.c)
a4=new A.e5(b6.a,e)
for(s=b4.b,p=s.length,i=t.do,k=0;k<s.length;s.length===p||(0,A.A)(s),++k){a5=s[k]
g=a5.gm().a
if(g.length===0)A.k(A.aI(g,"passId",null))
e.b=g
n.br(g,A.lW())
a6=A.aM(o,i)
for(g=a5.gm().c,a0=g.length,a7=0;a7<g.length;g.length===a0||(0,A.A)(g),++a7){a8=g[a7].a
a9=b5.c
if(a9==null)A.k(A.l("GPU resource adapter is not initialized"))
a1=a8.f
b0=a8.a
b1=a1===0?b0:b0+"#"+a1
b2=a9.b.q(0,b1)
if(b2==null)A.k(A.l("resource is not in candidate: "+b1))
b3=new A.c5(b2)
a6.A(0,b0+"#"+a1,b3)
a6.br(b0,new A.jl(b3))}a5.P(new A.e_(a6,a4,new A.jm(b8,b6).$0(),a3))}return new A.iE(e,m,j)},
eO:function eO(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.w=f
_.x=!1},
iE:function iE(a,b,c){this.a=a
this.b=b
this.c=c},
fE:function fE(a,b,c){this.a=a
this.b=b
this.c=c},
jj:function jj(a){this.a=a},
jk:function jk(a,b){this.a=a
this.b=b},
ji:function ji(a){this.a=a},
jb:function jb(a){this.a=a},
jc:function jc(a){this.a=a},
jh:function jh(a){this.a=a},
j6:function j6(a){this.a=a},
j8:function j8(a){this.a=a},
j7:function j7(a){this.a=a},
jg:function jg(a,b){this.a=a
this.b=b},
j4:function j4(a){this.a=a},
j5:function j5(a){this.a=a},
jd:function jd(a){this.a=a},
je:function je(a){this.a=a},
jf:function jf(a){this.a=a},
ja:function ja(a){this.a=a},
j9:function j9(a){this.a=a},
jl:function jl(a){this.a=a},
jm:function jm(a,b){this.a=a
this.b=b},
iV:function iV(a,b){this.a=a
this.b=b},
ft:function ft(){},
fn:function fn(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
eR:function eR(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.ax=_.at=_.as=_.Q=_.y=_.x=_.w=_.r=null
_.a$=f
_.b$=g},
id:function id(){},
ie:function ie(){},
ig:function ig(){},
fs:function fs(a){this.b=a},
iQ:function iQ(){},
fx:function fx(){},
eT:function eT(a,b){this.a=a
this.b=b},
p6(a){var s,r,q=A.ar(a,t.k)
B.a.ad(q,new A.jS())
s=A.G(q)
r=s.h("aj<1,aE>")
s=A.ar(new A.aj(q,s.h("aE(1)").a(new A.jT()),r),r.h("R.E"))
s.$flags=1
return s},
p5(a){var s,r,q=A.ar(a,t.c)
B.a.ad(q,new A.jQ())
s=A.G(q)
r=s.h("aj<1,aE>")
s=A.ar(new A.aj(q,s.h("aE(1)").a(new A.jR()),r),r.h("R.E"))
s.$flags=1
return s},
ao:function ao(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
am:function am(a,b){this.a=a
this.b=b},
W:function W(a,b,c){this.a=a
this.b=b
this.$ti=c},
jS:function jS(){},
jT:function jT(){},
jQ:function jQ(){},
jR:function jR(){},
oJ(a,b,c){var s,r,q,p,o,n,m,l=A.d([],t.r)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.A)(b),++p){o=b[p];++r
if((o.gm().d&c)>>>0===0){++q
continue}n=o.gbz()
m=n.a
if(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)){n=n.b
n=isFinite(n.a)&&isFinite(n.b)&&isFinite(n.c)}else n=!1
if(!n)throw A.b(A.j("cullItems: non-finite world bounds for instance "+o.gC().i(0),null))
if(a.ef(o.gbz())===B.at){++q
continue}B.a.j(l,o)}return new A.h1(l,new A.h2(q))},
h2:function h2(a){this.b=a},
h1:function h1(a,b){this.a=a
this.b=b},
mO(a){var s,r,q,p
if(a<=0)throw A.b(A.aI(a,"size","must be > 0"))
s=a*0.5
r=new A.be(A.d([],t.n),A.d([],t.t))
q=new A.hX(r,1)
p=-s
q.$6(new A.f(p,p,s),new A.f(s,p,s),new A.f(s,s,s),new A.f(p,s,s),B.b0,B.z)
q.$6(new A.f(s,p,p),new A.f(p,p,p),new A.f(p,s,p),new A.f(s,s,p),B.b1,B.A)
q.$6(new A.f(p,s,s),new A.f(s,s,s),new A.f(s,s,p),new A.f(p,s,p),B.k,B.z)
q.$6(new A.f(p,p,p),new A.f(s,p,p),new A.f(s,p,s),new A.f(p,p,s),B.p,B.A)
q.$6(new A.f(s,p,s),new A.f(s,p,p),new A.f(s,s,p),new A.f(s,s,s),B.z,B.b1)
q.$6(new A.f(p,p,p),new A.f(p,p,s),new A.f(p,s,s),new A.f(p,s,p),B.A,B.b0)
return r.af(new A.aS(new A.f(p,p,p),new A.f(s,s,s)))},
mZ(a,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a2<=0||a<=0)throw A.b(A.j("dimensions must be > 0",null))
if(a0<1||a1<1)throw A.b(A.j("subdivisions must be >= 1",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.be(s,q)
o=a2*0.5
n=a*0.5
for(s=-o,m=-n,l=0;l<=a1;++l){k=l/a1
j=m+k*a
for(i=0;i<=a0;++i){h=i/a0
p.M(new A.f(s+h*a2,0,j),B.k,B.z,new A.S(h,k))}}g=a0+1
for(l=0;l<a1;)for(f=l*g,++l,e=l*g,i=0;i<a0;++i){d=f+i
c=e+i
b=c+1
B.a.D(q,A.d([d,c,b,d,b,d+1],r))}return p.af(new A.aS(new A.f(s,0,m),new A.f(o,0,n)))},
n_(a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(a6<=0)throw A.b(A.aI(a6,"radius","must be > 0"))
if(a7<2||a8<3)throw A.b(A.j("invalid ring or sector count",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.be(s,q)
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
a=0}p.M(new A.f(e*a6,s,d*a6),new A.f(e,k,d),new A.f(c,0,a),new A.S(i,n))}}a0=a8+1
for(o=0;o<a7;)for(s=o*a0,++o,a1=o*a0,j=0;j<a8;++j){a2=s+j
a3=a1+j
a4=a3+1
B.a.D(q,A.d([a2,a2+1,a4,a2,a4,a3],r))}a5=new A.f(a6,a6,a6)
return p.af(new A.aS(a5.t(0,-1),a5))},
mP(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a1<=0||a<=0)throw A.b(A.j("radius and height must be > 0",null))
if(a0<3)throw A.b(A.j("radialSegments must be >= 3",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.be(s,q)
o=a*0.5
for(n=-o,m=0;m<=a0;++m){l=m/a0
k=l*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
h=new A.f(j,0,i)
g=new A.f(-i,0,j)
f=j*a1
e=i*a1
p.M(new A.f(f,n,e),h,g,new A.S(l,0))
p.M(new A.f(f,o,e),h,g,new A.S(l,1))}for(m=0;m<a0;++m){d=m*2
f=d+3
B.a.D(q,A.d([d,d+2,f,d,f,d+1],r))}c=s.length/18|0
p.M(new A.f(0,o,0),B.k,B.z,B.an)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.M(new A.f(j*a1,o,i*a1),B.k,B.z,new A.S(j*0.5+0.5,i*0.5+0.5))}for(f=c+1,e=c+2,m=0;m<a0;++m)B.a.D(q,A.d([c,f+m,e+m],r))
b=s.length/18|0
p.M(new A.f(0,n,0),B.p,B.A,B.an)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.M(new A.f(j*a1,n,i*a1),B.p,B.A,new A.S(j*0.5+0.5,i*0.5+0.5))}for(s=b+2,f=b+1,m=0;m<a0;++m)B.a.D(q,A.d([b,s+m,f+m],r))
s=-a1
return p.af(new A.aS(new A.f(s,n,s),new A.f(a1,o,a1)))},
mN(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a6<=0||a4<=0)throw A.b(A.j("radius and height must be > 0",null))
if(a5<3)throw A.b(A.j("radialSegments must be >= 3",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.be(s,q)
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
d=new A.f(Math.cos(e)*k,l,Math.sin(e)*k)
c=new A.f(-Math.sin(e),0,Math.cos(e))
b=s.length/18|0
p.M(new A.f(0,o,0),d,c,new A.S((i+h)*0.5,1))
p.M(new A.f(Math.cos(g)*a6,m,Math.sin(g)*a6),d,c,new A.S(i,0))
p.M(new A.f(Math.cos(f)*a6,m,Math.sin(f)*a6),d,c,new A.S(h,0))
B.a.D(q,A.d([b,b+1,b+2],r))}a=s.length/18|0
p.M(new A.f(0,m,0),B.p,B.A,B.an)
for(j=0;j<=a5;++j){a0=j/a5*2*3.141592653589793
a1=Math.cos(a0)
a2=Math.sin(a0)
p.M(new A.f(a1*a6,m,a2*a6),B.p,B.A,new A.S(a1*0.5+0.5,a2*0.5+0.5))}for(s=a+2,a3=a+1,j=0;j<a5;++j)B.a.D(q,A.d([a,s+j,a3+j],r))
s=-a6
return p.af(new A.aS(new A.f(s,m,s),new A.f(a6,o,a6)))},
n0(a0,a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a1<=0||a2<=0)throw A.b(A.j("radii must be > 0",null))
if(a0<3||a3<3)throw A.b(A.j("segments must be >= 3",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.be(s,q)
for(o=0;o<=a0;++o){s=o/a0
n=s*2*3.141592653589793
m=Math.cos(n)
l=Math.sin(n)
for(k=a1+a2*m,j=a2*l,i=0;i<=a3;++i){h=i/a3
g=h*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
p.M(new A.f(k*f,j,k*e),new A.f(m*f,l,m*e),new A.f(-e,0,f),new A.S(h,s))}}d=a3+1
for(o=0;o<a0;)for(s=o*d,++o,k=o*d,i=0;i<a3;++i){c=s+i
h=k+i
b=h+1
B.a.D(q,A.d([c,c+1,b,c,b,h],r))}a=a1+a2
s=-a
return p.af(new A.aS(new A.f(s,-a2,s),new A.f(a,a2,a)))},
mM(a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a6<=0||a5<=0)throw A.b(A.j("radius and height must be > 0",null))
if(a7<2||a8<3)throw A.b(A.j("invalid ring or sector count",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.be(s,q)
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
p.M(new A.f(d*a6,j,c*a6),new A.f(d,l,c),new A.f(-e,0,f),new A.S(h,s))}}for(s=-o,n=0;n<=a7;++n){j=n/a7
m=j*1.5707963267948966
l=Math.sin(m)
k=Math.cos(m)
for(b=-l,h=s+b*a6,j=0.5-0.5*j,i=0;i<=a8;++i){a=i/a8
g=a*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
d=k*f
c=k*e
p.M(new A.f(d*a6,h,c*a6),new A.f(d,b,c),new A.f(-e,0,f),new A.S(a,j))}}a0=a8+1
for(n=0;n<a7;)for(s=n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1
B.a.D(q,A.d([a1,h,a,a1,a,a1+1],r))}a2=(a7+1)*a0
for(n=0;n<a7;)for(s=a2+n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1+a2
B.a.D(q,A.d([a1,a1+1,a,a1,a,h+a2],r))}for(i=0;i<a8;i=a3){a3=i+1
s=a2+i
j=s+1
B.a.D(q,A.d([i,a3,j,i,j,s],r))}a4=o+a6
s=-a6
return p.af(new A.aS(new A.f(s,-a4,s),new A.f(a6,a4,a6)))},
hX:function hX(a,b){this.a=a
this.b=b},
be:function be(a,b){this.a=a
this.b=b},
n2(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l=a1*c*4,k=new Uint8Array(l),j=B.c.Z(B.c.I(d.a,0,1)*255),i=B.c.Z(B.c.I(d.b,0,1)*255),h=B.c.Z(B.c.I(d.c,0,1)*255),g=B.c.Z(B.c.I(a.a,0,1)*255),f=B.c.Z(B.c.I(a.b,0,1)*255),e=B.c.Z(B.c.I(a.c,0,1)*255)
for(s=0,r=0;r<c;++r)for(q=B.d.a0(r,b)>=a0,p=0;p<a1;++p){o=!q||B.d.a0(p,b)<a0
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
n3(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a6*a4*4,a1=new Uint8Array(a0),a2=new A.hY(a6,a4,a3)
for(s=0,r=0;r<a4;r=p)for(q=r-1,p=r+1,o=0;o<a6;o=n){n=o+1
m=a2.$2(n,q)
l=a2.$2(n,r)
if(typeof l!=="number")return A.bZ(l)
if(typeof m!=="number")return m.H()
k=a2.$2(n,p)
if(typeof k!=="number")return A.bZ(k)
j=o-1
i=a2.$2(j,q)
h=a2.$2(j,r)
if(typeof h!=="number")return A.bZ(h)
if(typeof i!=="number")return i.H()
g=a2.$2(j,p)
if(typeof g!=="number")return A.bZ(g)
f=a2.$2(j,p)
e=a2.$2(o,p)
if(typeof e!=="number")return A.bZ(e)
if(typeof f!=="number")return f.H()
d=a2.$2(n,p)
if(typeof d!=="number")return A.bZ(d)
j=a2.$2(j,q)
c=a2.$2(o,q)
if(typeof c!=="number")return A.bZ(c)
if(typeof j!=="number")return j.H()
b=a2.$2(n,q)
if(typeof b!=="number")return A.bZ(b)
a=new A.f(-(m+2*l+k-(i+2*h+g))*a5,-(f+2*e+d-(j+2*c+b))*a5,1).gE()
b=B.d.I(B.c.Z((a.a*0.5+0.5)*255),0,255)
if(!(s>=0&&s<a0))return A.h(a1,s)
a1[s]=b
b=s+1
c=B.d.I(B.c.Z((a.b*0.5+0.5)*255),0,255)
if(!(b<a0))return A.h(a1,b)
a1[b]=c
c=s+2
b=B.d.I(B.c.Z((a.c*0.5+0.5)*255),0,255)
if(!(c<a0))return A.h(a1,c)
a1[c]=b
b=s+3
if(!(b<a0))return A.h(a1,b)
a1[b]=255
s+=4}return a1},
n1(a,b,c,d){var s,r,q,p,o,n,m,l,k,j=d*b*4,i=new Uint8Array(j),h=new A.iS()
h.cE(1337)
s=new Float32Array(b)
for(r=0;r<b;++r){q=h.dV()
if(!(r<b))return A.h(s,r)
s[r]=(q*2-1)*0.18}p=B.c.Z(B.c.I(c,0,1)*255)
for(o=0,n=0;n<b;++n)for(m=0;m<d;++m){l=B.c.I(a+s[n],0.04,1)
if(!(o>=0&&o<j))return A.h(i,o)
i[o]=255
q=o+1
k=B.c.Z(l*255)
if(!(q<j))return A.h(i,q)
i[q]=k
k=o+2
if(!(k<j))return A.h(i,k)
i[k]=p
k=o+3
if(!(k<j))return A.h(i,k)
i[k]=255
o+=4}return i},
hY:function hY(a,b,c){this.a=a
this.b=b
this.c=c},
jW(a){var s,r,q,p,o,n,m,l,k,j
for(s=a.$ti,r=new A.ai(a,a.gp(0),s.h("ai<R.E>")),s=s.h("R.E"),q=B.dR,p=B.dU,o=!1;r.k();o=!0){n=r.d
if(n==null)n=s.a(n)
m=n.a
l=Math.min(q.a,m)
k=n.b
j=Math.min(q.b,k)
n=n.c
q=new A.f(l,j,Math.min(q.c,n))
p=new A.f(Math.max(p.a,m),Math.max(p.b,k),Math.max(p.c,n))}if(!o)throw A.b(A.j("Aabb.fromPoints requires at least one point",null))
return new A.aS(q,p)},
aS:function aS(a,b){this.a=a
this.b=b},
kR(a){var s
A.fM(a)
if(a<0.5)return 4*a*a*a
s=2*a-2
return 0.5*s*s*s+1},
iF:function iF(a){this.a=a},
mv(a){var s,r,q,p,o,n,m=a.a,l=new A.hi(),k=m.length
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
return new A.hh(A.d([l.$4(s+r,q+p,o+n,m[15]+m[12]),l.$4(m[3]-m[0],m[7]-m[4],m[11]-m[8],m[15]-m[12]),l.$4(m[3]+m[1],m[7]+m[5],m[11]+m[9],m[15]+m[13]),l.$4(m[3]-m[1],m[7]-m[5],m[11]-m[9],m[15]-m[13]),l.$4(m[3]+m[2],m[7]+m[6],m[11]+m[10],m[15]+m[14]),l.$4(m[3]-m[2],m[7]-m[6],m[11]-m[10],m[15]-m[14])],t.dV))},
bI:function bI(a,b){this.a=a
this.b=b},
cO:function cO(a,b){this.a=a
this.b=b},
hh:function hh(a){this.a=a},
hi:function hi(){},
l1(a){if(a.length!==16)throw A.b(A.j("Mat4.fromColumnMajor requires 16 values",null))
return new A.b7(new Float32Array(A.r(a)))},
l3(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.b7(q)},
l2(a,b,c){var s=b.gE(),r=c.a6(s).gE(),q=s.a6(r),p=new Float32Array(16)
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
p[12]=-r.bd(a)
p[13]=-q.bd(a)
p[14]=s.bd(a)
p[15]=1
return new A.b7(p)},
b7:function b7(a){this.a=a},
hv:function hv(){},
n4(a,b){var s=a.gE(),r=b/2,q=Math.sin(r)
return new A.bJ(s.a*q,s.b*q,s.c*q,Math.cos(r))},
bJ:function bJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
i0:function i0(a,b){this.a=a
this.b=b},
i1:function i1(a,b,c){this.a=a
this.b=b
this.d=c},
aw:function aw(a,b,c){this.a=a
this.b=b
this.c=c},
S:function S(a,b){this.a=a
this.b=b},
f:function f(a,b,c){this.a=a
this.b=b
this.c=c},
fe:function fe(a,b){this.a=a
this.b=b},
cC:function cC(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
ff:function ff(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dY:function dY(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fg:function fg(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
e4:function e4(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
fi:function fi(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fj:function fj(a,b){this.a=a
this.b=b},
cL:function cL(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
fk:function fk(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
e7:function e7(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
fl:function fl(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
ei:function ei(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f
_.w=g},
fp:function fp(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
d1:function d1(a,b,c){this.a=a
this.b=b
this.c=c},
fr:function fr(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
c5:function c5(a){this.b=a},
e_:function e_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
a7(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.O(a.a,a.b,b,c,s,r)},
k6:function k6(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var _=this
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
mL(a){var s
switch(a.a){case 0:s=0
break
case 1:s=1
break
case 2:s=2.5
break
case 3:s=3.5
break
default:s=null}return s},
d9:function d9(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
fu:function fu(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eM:function eM(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fv:function fv(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ld(a){var s=A.l2(B.k,B.p,Math.abs(0)<0.99?B.z:B.k)
return new A.bL(A.l3(1,1,B.d.I(1,0.1,3),0.05).t(0,s))},
bL:function bL(a){this.a=a},
eU:function eU(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
oG(c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3=u.l,b4="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[5]=float[5](0.227027,0.1945946,0.1216216,0.054054,0.016216);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<5;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b5="bloomBlurH",b6="bloomBlurV",b7="dofBlurH",b8="dofBlurV",b9={},c0=c4.b
if(!c0.n(0,"shadows"))throw A.b(A.aI(c4,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=c0.n(0,"ssao")
r=c0.n(0,"bloom")
q=c0.n(0,"dof")
p=c0.n(0,"grade")
o=c0.n(0,"ps1")
n=c0.n(0,"vhs")
m=c0.n(0,"volumetric")
c0=B.d.S(e9+1,2)
l=B.d.S(e8+1,2)
k=A.a7(B.a8,e9,e8,e7,b2)
j=A.a7(B.a8.ci(),e9,e8,b2,b2)
i=e7>1
h=A.a7(B.da,e9,e8,b2,i?2:1)
g=A.a7(B.d9,c0,l,b2,b2)
A.a7(B.di,e9,e8,b2,b2)
f=A.a7(B.df,e9,e8,b2,b2)
e=A.a7(B.d8,f0,f0,b2,b2)
d=A.a7(B.db,c0,l,b2,b2)
c=A.a7(B.dc,c0,l,b2,b2)
b=A.a7(B.dg,c0,l,b2,b2)
a=A.a7(B.dh,c0,l,b2,b2)
a0=$.m3()
a1=i?1:0
a2=A.a7(a0,e9,e8,b2,a1+(m?1:0)+1)
a0=A.a7(B.d5,c0,l,b2,b2)
a1=A.a7(B.d6,c0,l,b2,b2)
a3=A.a7(B.d7,e9,e8,b2,b2)
a4=A.a7(B.dd,e9,e8,b2,b2)
a5=A.a7(B.dj,e9,e8,b2,b2)
a6=A.a7(B.de,e9,e8,b2,b2)
a7=i?new A.d1(c2,k,j):b2
b9.a=null
a8=A.ld(B.bj)
if(m){a9=i?j:k
b0=new A.f8(c1,b3,"#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\n\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform mat4 uViewProjection;\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform float uShaftIntensity;\nuniform float uFogDensity;\nuniform float uAnisotropy;\nuniform mat4 uView;\nuniform mat4 uInverseProjection;\nuniform vec3 uVolumetricAlbedo;\nuniform float uVolumetricHeightFalloff;\nuniform float uVolumetricDustDensity;\nuniform float uVolumetricJitter;\nuniform float uVolumetricIntensity;\nuniform float uVolumetricSampleCount;\nuniform float uVolumetricSourceCount;\n\nuniform vec3 uSourcePosition0;\nuniform vec3 uSourceColor0;\nuniform float uSourceIntensity0;\nuniform float uSourceReferenceDistance0;\nuniform float uSourceCutoffDistance0;\nuniform vec3 uSourcePosition1;\nuniform vec3 uSourceColor1;\nuniform float uSourceIntensity1;\nuniform float uSourceReferenceDistance1;\nuniform float uSourceCutoffDistance1;\nuniform vec3 uSourcePosition2;\nuniform vec3 uSourceColor2;\nuniform float uSourceIntensity2;\nuniform float uSourceReferenceDistance2;\nuniform float uSourceCutoffDistance2;\nuniform vec3 uSourcePosition3;\nuniform vec3 uSourceColor3;\nuniform float uSourceIntensity3;\nuniform float uSourceReferenceDistance3;\nuniform float uSourceCutoffDistance3;\n\nfloat linearDepth(float depth) {\n  float z = depth * 2.0 - 1.0;\n  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);\n}\n\nfloat phaseHenyeyGreenstein(float cosTheta, float anisotropy) {\n  float g = clamp(anisotropy, -0.85, 0.85);\n  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;\n  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));\n}\n\nvec3 sourceContribution(\n  vec3 position,\n  vec3 color,\n  float intensity,\n  float referenceDistance,\n  float cutoffDistance,\n  vec3 viewRay,\n  float rayLength\n) {\n  vec4 clip = uViewProjection * vec4(position, 1.0);\n  if (clip.w <= 0.0) return vec3(0.0);\n  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;\n  float sourceDistance = length(sourceView);\n  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);\n  vec3 sampleToSource = sourceView - viewRay * tClosest;\n  float distanceToSource = max(length(sampleToSource), 1e-3);\n  float cutoff = 1.0 - smoothstep(\n    cutoffDistance * 0.65, cutoffDistance, sourceDistance);\n  float inverseSquare = intensity * referenceDistance * referenceDistance /\n      max(distanceToSource * distanceToSource,\n          referenceDistance * referenceDistance);\n  // The incoming direction is source -> sample and the outgoing direction is\n  // sample -> camera. This is the same phase convention as the directional\n  // medium path, but now evaluated against the located source.\n  float phase = phaseHenyeyGreenstein(\n    dot(normalize(sampleToSource), viewRay), uAnisotropy);\n  // Located practicals and lightning must also acquire visible body in a\n  // dust-filled room. Use the same broad haze plus particulate density as the\n  // directional march; otherwise a clear-air fog toggle would accidentally\n  // erase dust-lit source rays while the directional shafts still showed it.\n  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);\n  float mediumWeight = 1.0 - exp(-max(\n    mediumDensity * min(rayLength, cutoffDistance), 0.0));\n  float pathWeight = clamp(\n    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);\n  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *\n    uVolumetricIntensity * 0.35;\n}\n\nvoid main() {\n  float depth = texture(uSceneDepth, vUv).r;\n  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);\n  viewPoint /= max(abs(viewPoint.w), 1e-5);\n  vec3 viewRay = normalize(viewPoint.xyz);\n  // linearDepth is camera-space Z; convert it to distance along the actual\n  // reconstructed ray so wide and tall projections integrate equally.\n  float cameraDepth = linearDepth(depth);\n  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);\n  float density = max(uFogDensity, 0.0);\n\n  // A fixed, bounded integral keeps the pass deterministic and makes its\n  // cost predictable on weak adapters. The depth buffer stops integration at\n  // the first opaque surface, so shafts do not leak through geometry.\n  const int maxSampleCount = 24;\n  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));\n  vec3 scatter = vec3(0.0);\n  float transmittance = 1.0;\n  float stepLength = rayLength / float(sampleCount);\n  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);\n  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);\n  for (int i = 0; i < maxSampleCount; i++) {\n    if (i >= sampleCount) break;\n    float distanceAlongRay = clamp(\n      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);\n    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));\n    // Dust is a separate, host-resolved particulate phase. It is denser near\n    // the occupied room volume than the broad atmospheric haze, so shafts gain\n    // visible body without turning the far horizon opaque. At zero density the\n    // extra term is exactly zero and the established fog path is unchanged.\n    float dustWeight = exp(-max(distanceAlongRay *\n      uVolumetricHeightFalloff * 0.45, 0.0));\n    float opticalDensity = density +\n      max(uVolumetricDustDensity, 0.0) * dustWeight;\n    float opticalDepth = opticalDensity * stepLength * heightWeight;\n    float sampleTransmittance = exp(-opticalDepth);\n    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);\n    scatter += transmittance * (uLightColor * uVolumetricAlbedo *\n      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;\n    transmittance *= sampleTransmittance;\n  }\n\n  if (uVolumetricSourceCount > 0.5) {\n    scatter += sourceContribution(\n      uSourcePosition0, uSourceColor0, uSourceIntensity0,\n      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 1.5) {\n    scatter += sourceContribution(\n      uSourcePosition1, uSourceColor1, uSourceIntensity1,\n      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 2.5) {\n    scatter += sourceContribution(\n      uSourcePosition2, uSourceColor2, uSourceIntensity2,\n      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 3.5) {\n    scatter += sourceContribution(\n      uSourcePosition3, uSourceColor3, uSourceIntensity3,\n      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);\n  }\n\n  // Fade the final sample at the far plane and keep the additive output\n  // bounded so a storm flash cannot blow out the entire frame.\n  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);\n  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);\n}\n","#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\nuniform sampler2D uVolumetric;\nuniform float uVolumetricStrength;\n\nvoid main() {\n  vec3 light = texture(uVolumetric, vUv).rgb;\n  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);\n}\n",c2,e1,c8,g,f,a9,h,A.d([],t.J))}else b0=b2
g=t.q
b1=A.d([],g)
if(!m)h=i?j:k
if(r){B.a.D(b1,A.d([new A.cC(c1,b3,b4,c2,b5,b5,B.b6,!0,h,b,e0,c0,l),new A.cC(c1,b3,b4,c2,b6,b6,B.e6,!1,b,a,c6,c0,l),new A.dY(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",c2,c7,a,h,a2)],g))
h=a2}if(q){B.a.D(b1,A.d([new A.cL(c1,b3,b4,c2,b7,b7,B.b7,h,a0,e0,c0,l),new A.cL(c1,b3,b4,c2,b8,b8,B.e7,a0,a1,d1,c0,l),new A.e7(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// Circle-of-confusion is a simple linear ramp from the focus distance\n// outward (front and back treated the same \u2014 no separate near/far falloff\n// curve), clamped to [0,1] and scaled by uStrength so\n// PostProcessState.depthOfFieldStrength == 0 is a true no-op (coc == 0\n// everywhere, oColor == the sharp source exactly).\nvoid main(){\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n  float coc=clamp(abs(depth-uFocusDistance)/max(uFocusRange,0.0001),0.0,1.0)*uStrength;\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  vec3 blurred=texture(uBlurred,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,coc),1.0);\n}\n",c2,e0,d2,e1,c8,h,f,a1,a3)],g))
h=a3}if(p){B.a.j(b1,new A.ei(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",c2,d4,h,a4))
h=a4}if(o){B.a.j(b1,new A.eM(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",c2,h,a5))
h=a5}if(n){B.a.j(b1,new A.f7(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',c2,e6,e5,h,a6))
h=a6}j=A.d([new A.e4(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d7,d6,c5,f)],g)
if(s)j.push(new A.eY(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=8;\nconst vec3 KERNEL[8]=vec3[8](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    // NDC [-1,1] -> UV [0,1] requires the constant 0.5, not vUv (the\n    // *current* fragment's own UV) \u2014 adding vUv here was a real bug: it\n    // conflated \"this sample's own absolute reprojected screen position\"\n    // with \"an offset relative to the current fragment,\" producing an\n    // error of (vUv-0.5) per axis that grows with distance from screen\n    // center. That's exactly what produced a huge, blobby, non-local dark\n    // region instead of contact occlusion \u2014 every sample tested a wildly\n    // wrong depth location except right at screen center, where the error\n    // happened to be near zero.\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    occlusion+=(occluderView.z>=samplePos.z+0.02?1.0:0.0)*rangeCheck;\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",c2,e1,c8,d))
if(s)j.push(new A.eX(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float centerDepth=linearDepth(texture(uSceneDepth,vUv).r);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleDepth=linearDepth(texture(uSceneDepth,sampleUv).r);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*4.0);\n      sum+=texture(uSsaoRaw,sampleUv).r*depthWeight;\n      weightSum+=depthWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',c2,e4,e1,c8,c0,l,d,c))
j.push(new A.eU(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d7,d6,c5,c9,b2,b2,new A.jq(b9),e))
j.push(new A.eV(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nuniform vec3 uReflectionColor;\nuniform float uReflectionIntensity;\nuniform float uReflectionConfidence;\nuniform vec2 uShadowMapTexelSize;\nuniform float uShadowFilterRadius;\nuniform float uShadowBias;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uSpecularScale;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nuniform float uSurfaceSnowCoverage;\nuniform float uSurfaceDissolution;\nuniform float uThermalSourceCount;\nuniform vec3 uThermalSourcePosition0;\nuniform float uThermalSourceRadius0;\nuniform float uThermalSourceDissolution0;\nuniform vec3 uThermalSourcePosition1;\nuniform float uThermalSourceRadius1;\nuniform float uThermalSourceDissolution1;\nuniform vec3 uThermalSourcePosition2;\nuniform float uThermalSourceRadius2;\nuniform float uThermalSourceDissolution2;\nuniform vec3 uThermalSourcePosition3;\nuniform float uThermalSourceRadius3;\nuniform float uThermalSourceDissolution3;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return lightColor*lightIntensity*ndotl*coneFalloff*\n    distanceFalloff*enabled;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0);\n  float ndotl=max(dot(normal,lightDir),0.0);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlick(hdotv,f0);\n  float distribution=distributionGgx(ndoth,roughness);\n  float geometry=geometrySmith(ndotv,ndotl,roughness);\n  vec3 numerator=distribution*geometry*fresnel;\n  float denominator=max(4.0*ndotv*ndotl,0.001);\n  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog keeps the smooth distance ramp for authored horizon control, but\n// the participating-medium term is an analytic optical depth along the actual\n// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the\n// integral has a stable constant-height limit and therefore does not shimmer\n// when a surface is nearly level with the camera. Zero density remains an\n// exact no-op; the host can still use the distance ramp independently.\nfloat heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){\n  float segmentLength=length(rayEnd-rayStart);\n  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;\n  float falloff=max(uFogHeightFalloff,0.);\n  float h0=max(rayStart.y,0.);\n  float h1=max(rayEnd.y,0.);\n  float integral;\n  if(falloff<=0.||abs(h1-h0)<=0.0001){\n    integral=segmentLength*exp(-falloff*h0);\n  }else{\n    float denominator=falloff*(h1-h0);\n    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;\n  }\n  return max(uFogDensity*integral,0.);\n}\n\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);\n  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);\n  float mediumFactor=1.-exp(-opticalDepth);\n  return clamp(max(distFactor,mediumFactor),0.,1.);\n}\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);\n  // Fixed low-discrepancy offsets avoid the directional shimmer of a regular\n  // square lattice while remaining deterministic and free of per-frame noise.\n  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);\n  float sum=0.;\n  sum+=sampleShadow(projCoord+vec3(vec2(-.942,-.399)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.945,-.768)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.094,.886)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.344,.294)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.716,.642)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.688,-.089)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.287,-.885)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.052,.008)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.831,.486)*t,0.),bias);\n  return sum/9.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // \xa76.2's alpha-masked route. Deliberately the first thing after the\n  // fetch it depends on, and ahead of all the lighting below: a discarded\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  direct*=uDirectLightScale;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  float upward=clamp(n.y*0.5+0.5,0.0,1.0);\n  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao*mix(0.85,1.15,upward);\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Weather changes the material before direct and environment response.\n  // Thawing therefore affects the same specular lobe the viewer sees,\n  // instead of changing only diffuse color after the highlight is computed.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);\n  // A steady spherical conductive field decays approximately as 1/r. The\n  // host keeps the slow latent material memory in uSurfaceDissolution; this\n  // local term therefore models the spatial heat field without making warm\n  // surfaces snap back or disappear at an arbitrary exponential radius.\n  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/\n      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));\n  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/\n      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));\n  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/\n      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));\n  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/\n      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));\n  thermalDissolution=clamp(thermalDissolution,0.0,1.0);\n  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*\n    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);\n  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);\n  float dissolution=thermalDissolution;\n  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);\n  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  // A continuous water film forms a second dielectric lobe. It smooths the\n  // authored surface only as coverage rises, so damp cloth stays diffuse\n  // while puddled stone gains a tight grazing reflection.\n  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);\n  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  specular*=uDirectLightScale*uSpecularScale;\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*(1.0-0.25*rough));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);\n  float coat=coatStrength*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*\n    uDirectLightScale*uSpecularScale;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  // Environment fallback reflections are deliberately bounded and weighted\n  // by wetness/grazing angle. A real probe/history hit can raise confidence;\n  // the current host fallback remains visible but never masquerades as SSR.\n  float reflectionNdotV=max(dot(n,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metal);\n  vec3 envFresnel=f0+(max(vec3(1.0-specRough),f0)-f0)*pow(clamp(1.0-reflectionNdotV,0.0,1.0),5.0);\n  float envGloss=(1.0-specRough)*(1.0-specRough);\n  float reflectionSurface=clamp(metal*0.85+(1.0-metal)*(wetness+0.18*dissolution+envGloss*0.25),0.0,1.0);\n  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);\n  float reflectionWeight=clamp(\n    uReflectionIntensity*reflectionSurface*\n      (1.0-0.72*rough)*reflectionConfidence,\n    0.0,1.0);\n  lit+=uReflectionColor*envFresnel*reflectionWeight*ao;\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  oGlow=vec4(emissive,1.);\n}\n",d7,d6,c5,d8,d9,d3,d5,e2,new A.jr(b9,a8),c9,d0,e3,s,e9,e8,f0,f0,e,c,k))
if(a7!=null)j.push(a7)
if(b0!=null)j.push(b0)
B.a.D(j,b1)
j.push(new A.d9(c1,b3,u.b,c2,h,c3))
return new A.e8(j)},
jq:function jq(a){this.a=a},
jr:function jr(a,b){this.a=a
this.b=b},
eV:function eV(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
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
fz:function fz(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
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
eY:function eY(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
fB:function fB(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eX:function eX(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fA:function fA(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
f7:function f7(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fG:function fG(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
f8:function f8(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
fI:function fI(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fH:function fH(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dd:function dd(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fb:function fb(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fL:function fL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
li(a,b){var s=t.b,r=A.er(a,!0,s)
B.a.ad(r,new A.hq(t.fP))
s=A.cZ(r,s)
if(s.length===0)A.k(A.j("KeyframeTrack requires at least one keyframe",null))
return new A.f6(b,s)},
es:function es(a,b){this.a=a
this.b=b},
aV:function aV(a,b,c){this.a=a
this.b=b
this.$ti=c},
bE:function bE(){},
hq:function hq(a){this.a=a},
iq:function iq(a,b){this.a=a
this.b=b},
f6:function f6(a,b){this.a=a
this.b=b},
fS:function fS(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cm:function cm(a,b){this.a=a
this.b=0
this.c=b},
fT:function fT(a){this.a=a},
fU:function fU(a){this.a=a},
k8(a,b,c,d,e,f,g,h,i,j,k,l,m){var s=new A.ci(i,l,B.ak,A.d([],t.D),g,f,b,h,m,d,a,!0,!0,k,e)
s.y=h==null?null:h.d
return s},
ci:function ci(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
ic:function ic(a,b){this.a=a
this.b=b},
eS(a,b){return new A.dh(a,b)},
hj:function hj(a,b){this.a=a
this.b=b},
ed:function ed(a,b){this.a=a
this.b=b},
eg:function eg(a,b){this.a=a
this.b=b},
eh:function eh(a,b){this.a=a
this.b=b},
ec:function ec(a,b,c){this.a=a
this.b=b
this.c=c},
ef:function ef(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
c9:function c9(a,b){this.a=a
this.b=b},
cP:function cP(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ee:function ee(a,b){this.a=a
this.b=b},
cj:function cj(a,b){this.a=a
this.b=b},
dh:function dh(a,b){this.a=a
this.b=b},
bc:function bc(a,b){this.a=a
this.b=b},
e:function e(a,b){this.a=a
this.b=b},
cG:function cG(a,b){this.a=a
this.b=b},
e5:function e5(a,b){this.a=a
this.b=b},
hU(a,b,c,d){var s=0,r=A.kr(t.ac),q,p,o,n,m,l,k,j,i
var $async$hU=A.ku(function(e,f){if(e===1)return A.kl(f,r)
for(;;)switch(s){case 0:j=B.bl.dz(a)
i=j==null?null:new A.eR(j.a,new A.fZ(new A.h_(),new A.eP()),new A.eb(A.d([],t.c4),B.br),A.d([],t.cR),B.a5,A.d([],t.cL),null)
if(i==null){q=null
s=1
break}p=A.a(a.clientWidth)>0?A.a(a.clientWidth):A.a(a.width)
o=A.a(a.clientHeight)>0?A.a(a.clientHeight):A.a(a.height)
n=A.lf(o,p,A.aR(A.p(v.G.window).devicePixelRatio),2,!0)
a.width=n.c
a.height=n.d
m=A.oL(c)
s=3
return A.kk(A.jp(new A.hV(n),m,i,n),$async$hU)
case 3:i.aH()
l=A.na(i.w.a.b)
B.a.j(i.d,l)
m=t.N
k=new A.d8(a,i,l,new A.hf(),A.k8(B.U,null,!0,B.M,null,null,null,null,"root",!0,0,B.ak,-1),B.bp,B.d_,n,A.an(m),new A.fT(A.aM(m,t.f)))
k.y=A.l6(5,B.y)
k.w=!0
k.d5()
q=k
s=1
break
case 1:return A.km(q,r)}})
return A.kn($async$hU,r)},
c7:function c7(a,b){this.a=a
this.b=b},
d8:function d8(a,b,c,d,e,f,g,h,i,j){var _=this
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
_.Q=j
_.as=null
_.at=!1
_.ax=0
_.CW=_.ay=!1
_.db=_.cy=_.cx=0
_.dx=null
_.fx=_.fr=_.dy=0},
hV:function hV(a){this.a=a},
hK:function hK(a){this.a=a},
hL:function hL(a){this.a=a},
hM:function hM(a){this.a=a},
hN:function hN(){},
hO:function hO(a){this.a=a},
hP:function hP(a){this.a=a},
hQ:function hQ(a){this.a=a},
hR:function hR(a){this.a=a},
hS:function hS(a){this.a=a},
hT:function hT(a){this.a=a},
eJ:function eJ(a,b){this.a=a
this.b=b},
hk:function hk(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
hl:function hl(){},
hm:function hm(){},
dD:function dD(a,b){this.a=a
this.b=b},
bs:function bs(a,b){var _=this
_.a=0
_.b=a
_.f=_.c=null
_.$ti=b},
aZ:function aZ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=0
_.$ti=d},
mr(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.c6(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
fV:function fV(a,b){this.a=a
this.b=b},
c3:function c3(a,b){this.a=a
this.b=b},
h0:function h0(a,b){this.a=a
this.b=b},
h4:function h4(a,b){this.a=a
this.b=b},
c6:function c6(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
ab:function ab(a,b){this.a=a
this.b=b},
ix:function ix(){this.a=null},
nk(a){var s=new A.f9(a,B.f,new A.ix(),A.nu(a))
s.cD(a)
return s},
nu(a){var s,r,q=t.du.a(a.getSupportedExtensions())
if(q==null)return A.an(t.N)
s=A.an(t.N)
r=J.a3(t.dy.b(q)?q:new A.cF(q,A.G(q).h("cF<1,v>")))
while(r.k())s.j(0,r.gl())
return s},
ad(a,b){var s,r
if(a.b!==B.f)A.k(A.l(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.a(s.drawingBufferWidth),A.a(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
lk(a,b){var s
if(a.b!==B.f)A.k(A.l(u.k))
switch(b){case 1:a.a.drawBuffers(A.d([A.a(v.G.WebGL2RenderingContext.COLOR_ATTACHMENT0)],t.n))
break
case 2:s=v.G
a.a.drawBuffers(A.d([A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
break
default:throw A.b(A.j("WebGl2Device.setColorAttachmentCount: count must be 1 or 2, got "+b,null))}},
np(a,b,c){var s,r,q,p
if(a.b!==B.f)A.k(A.l(u.k))
s=t.V.a(c.a)
r=a.a
q=v.G
r.activeTexture(A.a(q.WebGL2RenderingContext.TEXTURE0)+b)
p=s.f
if(p!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),p)
return}throw A.b(A.l("WebGl2Device.bindGlowTexture: target has no glow attachment \u2014 create it with GpuTargetAttachment.colorAndGlow/colorDepthGlow, and resolve a multisampled source before sampling (single-sample only)"))},
no(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.a(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
nn(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
lj(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.ZERO)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.ONE)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.SRC_ALPHA)
break
case 3:s=A.a(v.G.WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA)
break
case 4:s=A.a(v.G.WebGL2RenderingContext.DST_ALPHA)
break
case 5:s=A.a(v.G.WebGL2RenderingContext.ONE_MINUS_DST_ALPHA)
break
default:s=null}return s},
nl(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
a0(a,b){var s,r,q,p
if(a.b!==B.f)A.k(A.l(u.k))
s=a.f
r=s.dB(b)
if(r.a===0)return
if(r.n(0,B.aa)){q=v.G
p=a.a
if(b.a)p.enable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.n(0,B.ab))a.a.depthFunc(A.no(a,b.b))
if(r.n(0,B.ac))a.a.depthMask(b.c)
if(r.n(0,B.ag)){q=v.G
p=a.a
if(b.w)p.enable(A.a(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.a(q.WebGL2RenderingContext.CULL_FACE))}if(r.n(0,B.ah))a.a.cullFace(A.nn(a,b.x))
if(r.n(0,B.aW)){q=v.G.WebGL2RenderingContext
q=A.a(q.CCW)
a.a.frontFace(q)}if(r.n(0,B.ad)){q=v.G
p=a.a
if(b.d)p.enable(A.a(q.WebGL2RenderingContext.BLEND))
else p.disable(A.a(q.WebGL2RenderingContext.BLEND))}if(r.n(0,B.ae))a.a.blendFunc(A.lj(a,b.e),A.lj(a,b.f))
if(r.n(0,B.af))a.a.blendEquation(A.nl(a,b.r))
if(r.n(0,B.aU))a.a.colorMask(!0,!0,!0,!0)
if(r.n(0,B.aV)){q=v.G.WebGL2RenderingContext
a.a.disable(A.a(q.SCISSOR_TEST))}s.a=b},
nm(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.a(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.a(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.a(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
aO(a,b,c,d,e,f){var s
if(a.b!==B.f)A.k(A.l(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.nm(a,b))},
ak(a,b){var s
if(a.b!==B.f)A.k(A.l(u.k))
s=A.p(b.a)
a.a.useProgram(s)
a.e=s},
c(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.f)A.k(A.l(u.k))
s=a.e
if(s==null)throw A.b(A.l("WebGl2Device.setUniform called with no bound program"))
r=a.a
q=A.J(r.getUniformLocation(s,b))
if(q==null)return
switch(c.a.a){case 0:r.uniform1f(q,A.fM(c.b))
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
A.a8(r,"uniform4f",[q,n,m,l,p[3]],t.H)
break
case 4:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 5:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 6:r.uniform1i(q,A.a(c.b))
break}},
a5(a,b){if(a.b!==B.f)A.k(A.l(u.k))
a.a.bindVertexArray(A.p(b.a))},
I(a,b,c){var s,r,q,p,o,n
if(a.b!==B.f)A.k(A.l(u.k))
s=c.a
r=a.a
q=v.G
r.activeTexture(A.a(q.WebGL2RenderingContext.TEXTURE0)+b)
if(s instanceof A.dN){p=s.d>1?A.a(q.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(q.WebGL2RenderingContext.TEXTURE_2D)
r.bindTexture(p,s.a)
return}if(s instanceof A.dM){o=s.b
if(o!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),o)
return}n=s.e
if(n!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),n)
return}throw A.b(A.l("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.b(A.l("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
nq(a,b,c){var s,r,q,p
if(a.b!==B.f)A.k(A.l(u.k))
s=A.p(b.a)
r=a.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),s)
A:{p=q.WebGL2RenderingContext
r.bufferData(A.a(p.ELEMENT_ARRAY_BUFFER),c,A.a(q.WebGL2RenderingContext.STATIC_DRAW))
break A}},
nr(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
ln(a,b){var s,r,q,p
if(a.b!==B.f)A.k(A.l(u.k))
s=a.a
r=A.J(s.createBuffer())
if(r==null)throw A.b(A.l("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.au?A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.a(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.nr(a,b.b))
return new A.bg(r)},
ll(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
lm(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
ns(a,b,c){var s=b>c?b:c,r=1
for(;s>1;s=(s+1)/2|0)++r
return r},
k9(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(a.b!==B.f)A.k(A.l(u.k))
s=a.a
r=A.J(s.createTexture())
if(r==null)throw A.b(A.l("WebGl2Device: gl.createTexture() returned null"))
q=b.c
p=q>1
o=v.G
n=p?A.a(o.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(o.WebGL2RenderingContext.TEXTURE_2D)
s.bindTexture(n,r)
m=b.d
l=m?A.ns(a,b.a,b.b):1
k=t.H
j=b.a
i=b.b
if(p)A.a8(s,"texStorage3D",[n,l,A.a(o.WebGL2RenderingContext.RGBA8),j,i,q],k)
else A.a8(s,"texStorage2D",[n,l,A.a(o.WebGL2RenderingContext.RGBA8),j,i],k)
s.texParameteri(n,A.a(o.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.ll(a,b.e))
s.texParameteri(n,A.a(o.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.ll(a,b.f))
p=b.r
s.texParameteri(n,A.a(o.WebGL2RenderingContext.TEXTURE_WRAP_S),A.lm(a,p))
s.texParameteri(n,A.a(o.WebGL2RenderingContext.TEXTURE_WRAP_T),A.lm(a,p))
h=a.r.n(0,"EXT_texture_filter_anisotropic")
g=h?a.bU(34047):1
f=b.w
if(!isFinite(f)||f<1||f>16)A.k(A.aI(f,"requested","anisotropy must be finite and in [1, 16]"))
if(h&&isFinite(g)&&g>=1)e=g>16?16:g
else e=1
f=f<e?f:e
if(f>1)s.texParameterf(n,34046,f)
return new A.bg(new A.dN(r,j,i,q,m))},
ka(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.f)A.k(A.l(u.k))
s=t.R.a(b.a)
r=s.d
if(c>=r)throw A.b(A.j("WebGl2Device.uploadTextureLayer: layer "+c+" out of range for "+r+"-layer texture",null))
q=s.b
p=s.c
o=q*p*4
n=d.length
if(n!==o)throw A.b(A.j("WebGl2Device.uploadTextureLayer: expected "+o+" RGBA8 bytes for "+q+"x"+p+", got "+n,null))
r=r>1
n=v.G
m=r?A.a(n.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(n.WebGL2RenderingContext.TEXTURE_2D)
l=a.a
l.bindTexture(m,s.a)
k=t.H
if(r)A.a8(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.a8(l,"texSubImage2D",[m,0,0,0,q,p,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
lo(a,b){var s,r,q
if(a.b!==B.f)A.k(A.l(u.k))
s=t.R.a(b.a)
if(!s.e)return
r=v.G
q=s.d>1?A.a(r.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(r.WebGL2RenderingContext.TEXTURE_2D)
r=a.a
r.bindTexture(q,s.a)
r.generateMipmap(q)},
fa(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
lq(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.f)A.k(A.l(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.b(A.j("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.J(r.createFramebuffer())
if(q==null)throw A.b(A.l("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.Y
if(n&&!a1.e)throw A.b(A.j("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.aw||o===B.by
l=d
k=d
j=d
i=d
if(n){r.drawBuffers(A.d([A.a(p.WebGL2RenderingContext.NONE)],t.n))
r.readBuffer(A.a(p.WebGL2RenderingContext.NONE))}else{o=a1.c
h=t.H
g=a1.b
if(o>1){k=A.J(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.J(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.d([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.J(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.a8(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.a8(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.J(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),j)
A.a8(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.a8(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.TEXTURE_2D),j,0],h)
r.drawBuffers(A.d([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}}f=d
e=d
if(a1.e){o=a1.c
h=t.H
g=a1.b
if(o>1){f=A.J(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.J(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.a8(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
A.a8(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.a(r.checkFramebufferStatus(A.a(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.a(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.kb(a0,q,l,k,f,e,j,i)
throw A.b(A.l("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.bg(new A.dM(q,l,k,f,e,j,i,s,a1.b,a1.c))},
kb(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
aF(a){var s
if(a.b!==B.f)A.k(A.l(u.k))
s=A.J(a.a.createVertexArray())
if(s==null)throw A.b(A.l("WebGl2Device: gl.createVertexArray() returned null"))
return new A.bg(s)},
lp(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.J(p.createShader(b))
if(o==null)throw A.b(A.eS(b===A.lX(A.lJ(A.m0(),r),q,t.S)?B.aQ:B.aR,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.aA(A.cx(p.getShaderParameter(o,A.a(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bU(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.b(A.eS(b===A.lX(A.lJ(A.m0(),r),q,t.S)?B.aQ:B.aR,s))}return o},
nt(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.f)A.k(A.l(u.k))
q=v.G
s=A.lp(a,A.a(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.lp(a,A.a(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.J(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.b(B.dq)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.aA(A.cx(o.getProgramParameter(n,A.a(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bU(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.eS(B.aS,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.A)(c),++l){k=c[l]
if(A.a(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.eS(B.aT,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.J(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.eS(B.aT,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.bg(n)},
bg:function bg(a){this.a=a},
dN:function dN(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dM:function dM(a,b,c,d,e,f,g,h,i,j){var _=this
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
fK:function fK(a){this.a=a
this.b=!1},
f9:function f9(a,b,c,d){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=c
_.r=d
_.w=!1},
iu:function iu(a){this.a=a},
iv:function iv(a){this.a=a},
j0:function j0(){},
fJ:function fJ(){},
it:function it(a){this.a=a},
iw:function iw(){},
jC(){return A.p_()},
p_(){var s=0,r=A.kr(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3
var $async$jC=A.ku(function(d4,d5){if(d4===1)return A.kl(d5,r)
for(;;)A:switch(s){case 0:d0={}
d1=v.G
d2=A.J(A.p(d1.document).querySelector("#showcase-canvas"))
d3=t.m
if(!d3.b(d2)){s=1
break}s=3
return A.kk(A.hU(d2,!0,B.aO,!0),$async$jC)
case 3:p=d5
if(p==null){s=1
break}o=p.y
o=o instanceof A.bn?o:null
if(o!=null){o.b=8.5
o.d=0.45
o.a=B.R
o.as=!0
o.at=0.18}n=p.f.dv(B.bi)
p.f=n
p.f=n.dw(B.c_,1,B.aD,B.bb,B.c8,0.85,1.2)
p.r=A.l8()
m=A.J(A.p(d1.document).querySelector("#tone-map-select"))
if(d3.b(m))m.addEventListener("change",A.a2(new A.jD(m,p)))
l=A.J(A.p(d1.document).querySelector("#post-preset-select"))
if(d3.b(l))l.addEventListener("change",A.a2(new A.jE(l,p,m)))
k=A.J(A.p(d1.document).querySelector("#turntable-toggle"))
j=A.J(A.p(d1.document).querySelector("#turntable-group"))
if(d3.b(k)){k.checked=!0
k.addEventListener("change",A.a2(new A.jF(p,k)))}i=A.J(A.p(d1.document).querySelector("#camera-mode-select"))
if(d3.b(i))i.addEventListener("change",A.a2(new A.jG(i,p,j,k)))
h=A.mZ(30,4,4,30)
n=p.b
g=n.gF().ah(h,"ground")
f=A.n_(1,40,40)
e=n.gF().ah(f,"center_sphere")
d=A.n0(20,1.8,0.08,48)
c=n.gF().ah(d,"orbit_torus")
b=A.mM(0.6,0.3,12,24)
a=A.mP(0.9,24,0.35)
a0=A.mN(0.9,24,0.4)
a1=A.mO(0.65)
a2=[b,a,a0,a1]
a3=[n.gF().ah(b,"satellite_capsule"),n.gF().ah(a,"satellite_cylinder"),n.gF().ah(a0,"satellite_cone"),n.gF().ah(a1,"satellite_cube")]
a4=p.bc(A.n2(B.bV,32,256,B.bX,2,256),"ground_grid_albedo",256,256)
a5=new Uint8Array(65536)
for(a6=0;a6<256;++a6)for(a7=a6*256,a8=B.d.a0(a6,32)>=2,a9=0;a9<256;++a9){b0=!a8||B.d.a0(a9,32)<2
b1=a7+a9
b2=b0?220:50
if(!(b1<65536)){q=A.h(a5,b1)
s=1
break A}a5[b1]=b2}b3=p.bc(A.n3(a5,256,3,256),"ground_grid_normal",256,256)
b4=p.bc(A.n1(0.22,256,0.95,256),"brushed_metal_orm",256,256)
a7=A.aW(a4,0.2,0,"ground_pbr",0.1,1.5,b3,null,0.5,1,1,1,8,8)
b5=n.gF().Y(a7)
a7=A.aW(null,0.1,0.5,"hero_gold",1,1,null,null,0.12,0.35,0.78,1,1,1)
a7=n.gF().Y(a7)
a8=A.aW(null,0.2,0,"hero_chrome",0.98,1,null,null,0.05,0.98,0.95,0.95,1,1)
a8=n.gF().Y(a8)
b1=A.aW(null,0.2,0,"hero_copper",1,1,null,null,0.15,0.54,0.64,0.95,1,1)
b1=n.gF().Y(b1)
b2=A.aW(null,0.2,0,"hero_silver",1,1,null,null,0.08,0.91,0.96,0.97,1,1)
b2=n.gF().Y(b2)
b6=A.l4(0.9,B.bY,"hero_ceramic",0.18)
b6=n.gF().Y(b6)
b7=A.k4(B.c1,"hero_plastic",0.22)
b7=n.gF().Y(b7)
b8=A.aW(null,0.2,0,"hero_iron",0.85,1,null,null,0.28,0.58,0.57,0.56,1,1)
b8=n.gF().Y(b8)
b9=A.aW(null,0.2,0,"hero_brushed",0.95,1,null,b4,0.22,1,0.95,0.95,1,1)
c0=A.l_(["gold",a7,"chrome",a8,"copper",b1,"silver",b2,"ceramic",b6,"plastic",b7,"iron",b8,"brushed",n.gF().Y(b9)],t.N,t.eL)
b9=A.aW(null,0.2,0,"torus_chrome",0.98,1,null,null,0.06,0.98,0.95,0.95,1,1)
c1=n.gF().Y(b9)
b9=A.k4(B.c7,"sat_emerald",0.22)
b9=n.gF().Y(b9)
b8=A.l4(0.8,B.c5,"sat_ruby",0.18)
b8=n.gF().Y(b8)
b7=A.k4(B.c2,"sat_sapphire",0.2)
b7=n.gF().Y(b7)
b6=A.aW(null,0.2,0,"sat_copper",1,1,null,null,0.2,0.54,0.64,0.95,1,1)
c2=[b9,b8,b7,n.gF().Y(b6)]
b6=p.e
b6.aL(0,b5,g,h,"ground_node",new A.aw(B.p,B.D,1))
n=c0.q(0,"gold")
n.toString
c3=b6.aL(0,n,e,f,"center_sphere_node",new A.aw(B.R,B.D,1))
c4=A.J(A.p(d1.document).querySelector("#material-select"))
if(d3.b(c4))c4.addEventListener("change",A.a2(new A.jH(c0,c4,c3)))
c5=b6.aL(0,c1,c,d,"torus_ring_node",new A.aw(B.R,B.D,1))
c6=A.k8(B.U,null,!0,B.M,null,null,null,null,"orbit_ring",!0,0,B.ak,-1)
c3.ca(c6)
c7=A.d([],t.D)
for(c8=0;c8<4;++c8){c9=c8*1.5707963267948966
d3=a3[c8]
n=a2[c8]
B.a.j(c7,c6.aL(0,c2[c8],d3,n,"satellite_"+c8,new A.aw(new A.f(Math.cos(c9)*3.2,0,Math.sin(c9)*3.2),B.D,1)))}d0.a=null
d0.b=0
d2.addEventListener("click",A.a2(new A.jI(d0,p,A.J(A.p(d1.document).querySelector("#picking-status")))))
d1=A.cZ(A.d([A.li(B.aE,c3),A.li(B.aE,c5)],t.e9),t.a3)
p.Q.a.A(0,"hero_bob",new A.cm(new A.fS("hero_bob",4,B.ct,d1),1))
p.sdW(new A.jJ(d0,c3,c5,c6,c7,p))
p.cw()
case 1:return A.km(q,r)}})
return A.kn($async$jC,r)},
jD:function jD(a,b){this.a=a
this.b=b},
jE:function jE(a,b,c){this.a=a
this.b=b
this.c=c},
jF:function jF(a,b){this.a=a
this.b=b},
jG:function jG(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jH:function jH(a,b,c){this.a=a
this.b=b
this.c=c},
jI:function jI(a,b,c){this.a=a
this.b=b
this.c=c},
jJ:function jJ(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
m1(a){return v.mangledGlobalNames[a]},
p8(a){throw A.V(A.kY(a),new Error())},
az(){throw A.V(A.mE(""),new Error())},
kC(){throw A.V(A.kY(""),new Error())},
jP(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.b(A.aI(b.gdL(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].gm().c.ab()
o=q*16
n=o+16
B.a3.bB(s,o,n,p.a)
if(l)B.a3.bB(r,o,n,p.bq().a)}m=a.a
A.c(m,"uInstanceModels",new A.e(B.aY,s))
if(l)A.c(m,"uInstanceNormalMatrices",new A.e(B.aY,r))
A.c(m,"uUseInstances",B.aZ)}},B={}
var w=[A,J,B]
var $={}
A.k0.prototype={}
J.ek.prototype={
a_(a,b){return a===b},
gK(a){return A.eK(a)},
i(a){return"Instance of '"+A.eL(a)+"'"},
gG(a){return A.b0(A.ko(this))}}
J.en.prototype={
i(a){return String(a)},
gK(a){return a?519018:218159},
gG(a){return A.b0(t.y)},
$iC:1,
$ix:1}
J.cR.prototype={
a_(a,b){return null==b},
i(a){return"null"},
gK(a){return 0},
$iC:1}
J.cT.prototype={$iH:1}
J.bl.prototype={
gK(a){return 0},
gG(a){return B.dC},
i(a){return String(a)}}
J.eG.prototype={}
J.bM.prototype={}
J.bk.prototype={
i(a){var s=a[$.m4()]
if(s==null)s=a[$.kD()]
if(s==null)return this.cC(a)
return"JavaScript function for "+J.c2(s)},
$ibB:1}
J.cS.prototype={
gK(a){return 0},
i(a){return String(a)}}
J.cU.prototype={
gK(a){return 0},
i(a){return String(a)}}
J.t.prototype={
j(a,b){A.G(a).c.a(b)
a.$flags&1&&A.bx(a,29)
a.push(b)},
a5(a,b){var s
a.$flags&1&&A.bx(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aA(a[s],b)){a.splice(s,1)
return!0}return!1},
D(a,b){var s
A.G(a).h("m<1>").a(b)
a.$flags&1&&A.bx(a,"addAll",2)
if(Array.isArray(b)){this.cH(a,b)
return}for(s=J.a3(b);s.k();)a.push(s.gl())},
cH(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.aC(a))
for(r=0;r<s;++r)a.push(b[r])},
a2(a){a.$flags&1&&A.bx(a,"clear","clear")
a.length=0},
X(a,b){if(!(b>=0&&b<a.length))return A.h(a,b)
return a[b]},
cz(a,b){var s
if(b<0||b>a.length)throw A.b(A.aY(b,0,a.length,"start",null))
s=a.length
if(b===s)return A.d([],A.G(a))
return A.d(a.slice(b,s),A.G(a))},
gbi(a){if(a.length>0)return a[0]
throw A.b(A.el())},
gbp(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.el())},
gaq(a){var s=a.length
if(s===1){if(0>=s)return A.h(a,0)
return a[0]}if(s===0)throw A.b(A.el())
throw A.b(A.kT())},
aN(a,b){var s,r
A.G(a).h("x(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.b(A.aC(a))}return!0},
ad(a,b){var s,r,q,p,o,n=A.G(a)
n.h("i(1,1)?").a(b)
a.$flags&2&&A.bx(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.ob()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.el()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.cw(b,2))
if(p>0)this.d9(a,p)},
cv(a){return this.ad(a,null)},
d9(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
dJ(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.h(a,s)
if(J.aA(a[s],b))return s}return-1},
n(a,b){var s
for(s=0;s<a.length;++s)if(J.aA(a[s],b))return!0
return!1},
i(a){return A.jZ(a,"[","]")},
gu(a){return new J.cB(a,a.length,A.G(a).h("cB<1>"))},
gK(a){return A.eK(a)},
gp(a){return a.length},
q(a,b){if(!(b>=0&&b<a.length))throw A.b(A.ju(a,b))
return a[b]},
A(a,b,c){A.G(a).c.a(c)
a.$flags&2&&A.bx(a)
if(!(b>=0&&b<a.length))throw A.b(A.ju(a,b))
a[b]=c},
bk(a,b){var s
A.G(a).h("x(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gG(a){return A.b0(A.G(a))},
$im:1,
$iy:1}
J.em.prototype={
ej(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.eL(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.hp.prototype={}
J.cB.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.A(q)
throw A.b(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iQ:1}
J.cb.prototype={
J(a,b){var s
A.aR(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaB(b)
if(this.gaB(a)===s)return 0
if(this.gaB(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaB(a){return a===0?1/a<0:a<0},
bw(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.b(A.bN(""+a+".toInt()"))},
dH(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.b(A.bN(""+a+".floor()"))},
Z(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.bN(""+a+".round()"))},
I(a,b,c){if(this.J(b,c)>0)throw A.b(A.lU(b))
if(this.J(a,b)<0)return b
if(this.J(a,c)>0)return c
return a},
ac(a,b){var s
if(b>20)throw A.b(A.aY(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaB(a))return"-"+s
return s},
eh(a,b){var s
if(b>20)throw A.b(A.aY(b,0,20,"fractionDigits",null))
s=a.toExponential(b)
if(a===0&&this.gaB(a))return"-"+s
return s},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gK(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
a0(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
S(a,b){return(a|0)===a?a/b|0:this.dg(a,b)},
dg(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.bN("Result of truncating division is "+A.o(s)+": "+A.o(a)+" ~/ "+b))},
de(a,b){var s
if(a>0)s=this.dd(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
dd(a,b){return b>31?0:a>>>b},
gG(a){return A.b0(t.p)},
$iag:1,
$iq:1,
$iaf:1}
J.cQ.prototype={
gG(a){return A.b0(t.S)},
$iC:1,
$ii:1}
J.eo.prototype={
gG(a){return A.b0(t.i)},
$iC:1}
J.bj.prototype={
ae(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
cB(a,b,c){return a.substring(b,A.n5(b,c,a.length))},
cA(a,b){return this.cB(a,b,null)},
ei(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.h(p,0)
if(p.charCodeAt(0)===133){s=J.mC(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.h(p,r)
q=p.charCodeAt(r)===133?J.mD(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
J(a,b){var s
A.ae(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
i(a){return a},
gK(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gG(a){return A.b0(t.N)},
gp(a){return a.length},
$iC:1,
$iag:1,
$il7:1,
$iv:1}
A.cn.prototype={
gu(a){return new A.cE(J.a3(this.gaK()),A.u(this).h("cE<1,2>"))},
gp(a){return J.by(this.gaK())},
X(a,b){return A.u(this).y[1].a(J.jV(this.gaK(),b))},
i(a){return J.c2(this.gaK())}}
A.cE.prototype={
k(){return this.a.k()},
gl(){return this.$ti.y[1].a(this.a.gl())},
$iQ:1}
A.dr.prototype={
q(a,b){return this.$ti.y[1].a(J.jU(this.a,b))},
$iy:1}
A.cF.prototype={
gaK(){return this.a}}
A.cV.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.ih.prototype={}
A.aD.prototype={}
A.R.prototype={
gu(a){var s=this
return new A.ai(s,s.gp(s),A.u(s).h("ai<R.E>"))},
an(a){var s,r=this,q=A.k2(A.u(r).h("R.E"))
for(s=0;s<r.gp(r);++s)q.j(0,r.X(0,s))
return q}}
A.dj.prototype={
gd0(){var s=J.by(this.a),r=this.c
if(r==null||r>s)return s
return r},
gdf(){var s=J.by(this.a),r=this.b
if(r>s)return s
return r},
gp(a){var s,r=J.by(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
X(a,b){var s=this,r=s.gdf()+b
if(b<0||r>=s.gd0())throw A.b(A.ho(b,s.gp(0),s,"index"))
return J.jV(s.a,r)},
cn(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.jw(n),l=m.gp(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.kV(0,n):J.kU(0,n)}r=A.eq(s,m.X(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.a.A(r,q,m.X(n,o+q))
if(m.gp(n)<l)throw A.b(A.aC(p))}return r},
eg(a){return this.cn(0,!0)}}
A.ai.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.jw(q),o=p.gp(q)
if(r.b!==o)throw A.b(A.aC(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.X(q,s);++r.c
return!0},
$iQ:1}
A.d_.prototype={
gu(a){var s=this.a
return new A.d0(s.gu(s),this.b,A.u(this).h("d0<1,2>"))},
gp(a){var s=this.a
return s.gp(s)},
X(a,b){var s=this.a
return this.b.$1(s.X(s,b))}}
A.d0.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gl())
return!0}s.a=null
return!1},
gl(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iQ:1}
A.aj.prototype={
gp(a){return J.by(this.a)},
X(a,b){return this.b.$1(J.jV(this.a,b))}}
A.a1.prototype={
gu(a){return new A.F(J.a3(this.a),this.b,this.$ti.h("F<1>"))}}
A.F.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gl()))return!0
return!1},
gl(){return this.a.gl()},
$iQ:1}
A.ah.prototype={}
A.df.prototype={
gp(a){return J.by(this.a)},
X(a,b){var s=this.a,r=J.jw(s)
return r.X(s,r.gp(s)-1-b)}}
A.dP.prototype={}
A.al.prototype={$r:"+(1,2)",$s:1}
A.dA.prototype={$r:"+influence,light(1,2)",$s:2}
A.dB.prototype={$r:"+influence,source(1,2)",$s:3}
A.bT.prototype={$r:"+(1,2,3)",$s:4}
A.cJ.prototype={}
A.cI.prototype={
i(a){return A.ht(this)},
gaz(){return new A.bt(this.dD(),A.u(this).h("bt<aa<1,2>>"))},
dD(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gaz(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gaa(),o=o.gu(o),n=A.u(s),m=n.y[1],n=n.h("aa<1,2>")
case 2:if(!o.k()){r=3
break}l=o.gl()
k=s.q(0,l)
r=4
return a.b=new A.aa(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ias:1}
A.P.prototype={
gp(a){return this.b.length},
gbT(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
aw(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
q(a,b){if(!this.aw(b))return null
return this.b[this.a[b]]},
aA(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbT()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gaa(){return new A.bP(this.gbT(),this.$ti.h("bP<1>"))},
gco(){return new A.bP(this.b,this.$ti.h("bP<2>"))}}
A.bP.prototype={
gp(a){return this.a.length},
gu(a){var s=this.a
return new A.bQ(s,s.length,this.$ti.h("bQ<1>"))}}
A.bQ.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iQ:1}
A.cK.prototype={
j(a,b){A.u(this).c.a(b)
A.mo()}}
A.aU.prototype={
gp(a){return this.b},
gcg(a){return this.b!==0},
gu(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.bQ(s,s.length,r.$ti.h("bQ<1>"))},
n(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
an(a){return A.k3(this,this.$ti.c)}}
A.dg.prototype={}
A.io.prototype={
a4(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.d7.prototype={
i(a){return"Null check operator used on a null value"}}
A.ep.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.f4.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hE.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.cN.prototype={}
A.dE.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibq:1}
A.bh.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.m2(r==null?"unknown":r)+"'"},
gG(a){var s=A.kw(this)
return A.b0(s==null?A.c_(this):s)},
$ibB:1,
gek(){return this},
$C:"$1",
$R:1,
$D:null}
A.e0.prototype={$C:"$0",$R:0}
A.e1.prototype={$C:"$2",$R:2}
A.f1.prototype={}
A.eZ.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.m2(s)+"'"}}
A.c4.prototype={
a_(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.c4))return!1
return this.$_target===b.$_target&&this.a===b.a},
gK(a){return(A.fO(this.a)^A.eK(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.eL(this.a)+"'")}}
A.eQ.prototype={
i(a){return"RuntimeError: "+this.a}}
A.b3.prototype={
gp(a){return this.a},
gaa(){return new A.b5(this,A.u(this).h("b5<1>"))},
aw(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dM(a)},
dM(a){var s=this.d
if(s==null)return!1
return this.aO(this.bR(s,a),a)>=0},
q(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dN(b)},
dN(a){var s,r,q=this.d
if(q==null)return null
s=this.bR(q,a)
r=this.aO(s,a)
if(r<0)return null
return s[r].b},
A(a,b,c){var s,r,q=this,p=A.u(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bG(s==null?q.b=q.b3():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bG(r==null?q.c=q.b3():r,b,c)}else q.dP(b,c)},
dP(a,b){var s,r,q,p,o=this,n=A.u(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.b3()
r=o.bl(a)
q=s[r]
if(q==null)s[r]=[o.b4(a,b)]
else{p=o.aO(q,a)
if(p>=0)q[p].b=b
else q.push(o.b4(a,b))}},
br(a,b){var s,r,q=this,p=A.u(q)
p.c.a(a)
p.h("2()").a(b)
if(q.aw(a)){s=q.q(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.A(0,a,r)
return r},
a5(a,b){var s=this
if(typeof b=="string")return s.bD(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.bD(s.c,b)
else return s.dO(b)},
dO(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.bl(a)
r=n[s]
q=o.aO(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.bE(p)
if(r.length===0)delete n[s]
return p.b},
a2(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.b2()}},
aA(a,b){var s,r,q=this
A.u(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.aC(q))
s=s.c}},
bG(a,b,c){var s,r=A.u(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.b4(b,c)
else s.b=c},
bD(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.bE(s)
delete a[b]
return s.b},
b2(){this.r=this.r+1&1073741823},
b4(a,b){var s=this,r=A.u(s),q=new A.hr(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.b2()
return q},
bE(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.b2()},
bl(a){return J.N(a)&1073741823},
bR(a,b){return a[this.bl(b)]},
aO(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aA(a[r].a,b))return r
return-1},
i(a){return A.ht(this)},
b3(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ikZ:1}
A.hr.prototype={}
A.b5.prototype={
gp(a){return this.a.a},
gu(a){var s=this.a
return new A.cX(s,s.r,s.e,this.$ti.h("cX<1>"))}}
A.cX.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.aC(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iQ:1}
A.aL.prototype={
gp(a){return this.a.a},
gu(a){var s=this.a
return new A.b6(s,s.r,s.e,this.$ti.h("b6<1>"))}}
A.b6.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.aC(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iQ:1}
A.b4.prototype={
gp(a){return this.a.a},
gu(a){var s=this.a
return new A.cW(s,s.r,s.e,this.$ti.h("cW<1,2>"))}}
A.cW.prototype={
gl(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.aC(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.aa(s.a,s.b,r.$ti.h("aa<1,2>"))
r.c=s.c
return!0}},
$iQ:1}
A.jy.prototype={
$1(a){return this.a(a)},
$S:23}
A.jz.prototype={
$2(a,b){return this.a(a,b)},
$S:16}
A.jA.prototype={
$1(a){return this.a(A.ae(a))},
$S:36}
A.aQ.prototype={
gG(a){return A.b0(this.bS())},
bS(){return A.oM(this.$r,this.b1())},
i(a){return this.c5(!1)},
c5(a){var s,r,q,p,o,n=this.d1(),m=this.b1(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.h(m,q)
o=m[q]
l=a?l+A.la(o):l+A.o(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
d1(){var s,r=this.$s
while($.iT.length<=r)B.a.j($.iT,null)
s=$.iT[r]
if(s==null){s=this.cT()
B.a.A($.iT,r,s)}return s},
cT(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.k_(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.A(j,q,r[s])}}return A.cZ(j,k)}}
A.br.prototype={
b1(){return[this.a,this.b]},
a_(a,b){if(b==null)return!1
return b instanceof A.br&&this.$s===b.$s&&J.aA(this.a,b.a)&&J.aA(this.b,b.b)},
gK(a){return A.bH(this.$s,this.a,this.b,B.j,B.j,B.j)}}
A.cr.prototype={
b1(){return[this.a,this.b,this.c]},
a_(a,b){var s=this
if(b==null)return!1
return b instanceof A.cr&&s.$s===b.$s&&J.aA(s.a,b.a)&&J.aA(s.b,b.b)&&J.aA(s.c,b.c)},
gK(a){var s=this
return A.bH(s.$s,s.a,s.b,s.c,B.j,B.j)}}
A.cd.prototype={
gG(a){return B.dv},
$iC:1}
A.d5.prototype={
d6(a,b,c,d){var s=A.aY(b,0,c,d,null)
throw A.b(s)},
bI(a,b,c,d){if(b>>>0!==b||b>c)this.d6(a,b,c,d)}}
A.ew.prototype={
gG(a){return B.dw},
$iC:1}
A.a6.prototype={
gp(a){return a.length},
$iaq:1}
A.d3.prototype={
q(a,b){A.bV(b,a,a.length)
return a[b]},
bB(a,b,c,d){var s,r,q,p
t.bM.a(d)
a.$flags&2&&A.bx(a,5)
s=a.length
this.bI(a,b,s,"start")
this.bI(a,c,s,"end")
if(b>c)A.k(A.aY(b,0,c,null,null))
r=c-b
q=d.length
if(q<r)A.k(A.l("Not enough elements"))
p=q!==r?d.subarray(0,r):d
a.set(p,b)
return},
$im:1,
$iy:1}
A.d4.prototype={$im:1,$iy:1}
A.d2.prototype={
gG(a){return B.dx},
$iC:1,
$iha:1}
A.ex.prototype={
gG(a){return B.dy},
$iC:1,
$ihb:1}
A.ey.prototype={
gG(a){return B.dz},
q(a,b){A.bV(b,a,a.length)
return a[b]},
$iC:1}
A.ez.prototype={
gG(a){return B.dA},
q(a,b){A.bV(b,a,a.length)
return a[b]},
$iC:1}
A.eA.prototype={
gG(a){return B.dB},
q(a,b){A.bV(b,a,a.length)
return a[b]},
$iC:1}
A.eB.prototype={
gG(a){return B.dE},
q(a,b){A.bV(b,a,a.length)
return a[b]},
$iC:1}
A.eC.prototype={
gG(a){return B.dF},
q(a,b){A.bV(b,a,a.length)
return a[b]},
$iC:1}
A.d6.prototype={
gG(a){return B.dG},
gp(a){return a.length},
q(a,b){A.bV(b,a,a.length)
return a[b]},
$iC:1}
A.eD.prototype={
gG(a){return B.dH},
gp(a){return a.length},
q(a,b){A.bV(b,a,a.length)
return a[b]},
$iC:1,
$idk:1}
A.dw.prototype={}
A.dx.prototype={}
A.dy.prototype={}
A.dz.prototype={}
A.aN.prototype={
h(a){return A.dJ(v.typeUniverse,this,a)},
O(a){return A.lC(v.typeUniverse,this,a)}}
A.fo.prototype={}
A.iY.prototype={
i(a){return A.ax(this.a,null)}}
A.fm.prototype={
i(a){return this.a}}
A.dF.prototype={$iba:1}
A.iz.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:10}
A.iy.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:17}
A.iA.prototype={
$0(){this.a.$0()},
$S:11}
A.iB.prototype={
$0(){this.a.$0()},
$S:11}
A.iW.prototype={
cF(a,b){if(self.setTimeout!=null)self.setTimeout(A.cw(new A.iX(this,b),0),a)
else throw A.b(A.bN("`setTimeout()` not found."))}}
A.iX.prototype={
$0(){this.b.$0()},
$S:1}
A.fc.prototype={
b7(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.aT(a)
else{s=r.a
if(q.h("bC<1>").b(a))s.bH(a)
else s.bM(a)}},
b8(a,b){var s=this.a
if(this.b)s.aX(new A.aB(a,b))
else s.aU(new A.aB(a,b))}}
A.j2.prototype={
$1(a){return this.a.$2(0,a)},
$S:6}
A.j3.prototype={
$2(a,b){this.a.$2(1,new A.cN(a,t.l.a(b)))},
$S:18}
A.jo.prototype={
$2(a,b){this.a(A.a(a),b)},
$S:30}
A.bf.prototype={
gl(){var s=this.b
return s==null?this.$ti.c.a(s):s},
da(a,b){var s,r,q
a=A.a(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
k(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.k()){o.b=s.gl()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.da(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.lw
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
o.a=A.lw
throw n
return!1}if(0>=p.length)return A.h(p,-1)
o.a=p.pop()
m=1
continue}throw A.b(A.l("sync*"))}return!1},
em(a){var s,r,q=this
if(a instanceof A.bt){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.j(r,q.a)
q.a=s
return 2}else{q.d=J.a3(a)
return 2}},
$iQ:1}
A.bt.prototype={
gu(a){return new A.bf(this.a(),this.$ti.h("bf<1>"))}}
A.aB.prototype={
i(a){return A.o(this.a)},
$iL:1,
gaF(){return this.b}}
A.fh.prototype={
b8(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.l("Future already completed"))
s.aU(A.oa(a,b))},
cc(a){return this.b8(a,null)}}
A.dq.prototype={
b7(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.b(A.l("Future already completed"))
s.aT(r.h("1/").a(a))}}
A.bO.prototype={
dU(a){if((this.c&15)!==6)return!0
return this.b.b.bu(t.al.a(this.d),a.a,t.y,t.K)},
dI(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.e.b(q))p=l.ed(q,m,a.b,o,n,t.l)
else p=l.bu(t.x.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.c1(s))){if((r.c&1)!==0)throw A.b(A.j("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.j("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.U.prototype={
cm(a,b,c){var s,r,q=this.$ti
q.O(c).h("1/(2)").a(a)
s=$.M
if(s===B.q){if(!t.e.b(b)&&!t.x.b(b))throw A.b(A.aI(b,"onError",u.c))}else{c.h("@<0/>").O(q.c).h("1(2)").a(a)
b=A.oq(b,s)}r=new A.U(s,c.h("U<0>"))
this.aS(new A.bO(r,3,a,b,q.h("@<1>").O(c).h("bO<1,2>")))
return r},
c2(a,b,c){var s,r=this.$ti
r.O(c).h("1/(2)").a(a)
s=new A.U($.M,c.h("U<0>"))
this.aS(new A.bO(s,19,a,b,r.h("@<1>").O(c).h("bO<1,2>")))
return s},
dc(a){this.a=this.a&1|16
this.c=a},
aG(a){this.a=a.a&30|this.a&1
this.c=a.c},
aS(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.d.a(r.c)
if((s.a&24)===0){s.aS(a)
return}r.aG(s)}A.fN(null,null,r.b,t.M.a(new A.iG(r,a)))}},
bV(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.d.a(m.c)
if((n.a&24)===0){n.bV(a)
return}m.aG(n)}l.a=m.aJ(a)
A.fN(null,null,m.b,t.M.a(new A.iK(l,m)))}},
aI(){var s=t.F.a(this.c)
this.c=null
return this.aJ(s)},
aJ(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bM(a){var s,r=this
r.$ti.c.a(a)
s=r.aI()
r.a=8
r.c=a
A.co(r,s)},
cS(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aI()
q.aG(a)
A.co(q,r)},
aX(a){var s=this.aI()
this.dc(a)
A.co(this,s)},
aT(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bC<1>").b(a)){this.bH(a)
return}this.cI(a)},
cI(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.fN(null,null,s.b,t.M.a(new A.iI(s,a)))},
bH(a){A.kc(this.$ti.h("bC<1>").a(a),this,!1)
return},
aU(a){this.a^=2
A.fN(null,null,this.b,t.M.a(new A.iH(this,a)))},
$ibC:1}
A.iG.prototype={
$0(){A.co(this.a,this.b)},
$S:1}
A.iK.prototype={
$0(){A.co(this.b,this.a.a)},
$S:1}
A.iJ.prototype={
$0(){A.kc(this.a.a,this.b,!0)},
$S:1}
A.iI.prototype={
$0(){this.a.bM(this.b)},
$S:1}
A.iH.prototype={
$0(){this.a.aX(this.b)},
$S:1}
A.iN.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.ec(t.fO.a(q.d),t.A)}catch(p){s=A.c1(p)
r=A.cz(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jX(q)
n=k.a
n.c=new A.aB(q,o)
q=n}q.b=!0
return}if(j instanceof A.U&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.U){m=k.b.a
l=new A.U(m.b,m.$ti)
j.cm(new A.iO(l,m),new A.iP(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:1}
A.iO.prototype={
$1(a){this.a.cS(this.b)},
$S:10}
A.iP.prototype={
$2(a,b){A.dQ(a)
t.l.a(b)
this.a.aX(new A.aB(a,b))},
$S:31}
A.iM.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bu(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.c1(l)
r=A.cz(l)
q=s
p=r
if(p==null)p=A.jX(q)
o=this.a
o.c=new A.aB(q,p)
o.b=!0}},
$S:1}
A.iL.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.dU(s)&&p.a.e!=null){p.c=p.a.dI(s)
p.b=!1}}catch(o){r=A.c1(o)
q=A.cz(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jX(p)
m=l.b
m.c=new A.aB(p,n)
p=m}p.b=!0}},
$S:1}
A.fd.prototype={}
A.fC.prototype={}
A.dO.prototype={$ilr:1}
A.fw.prototype={
ee(a){var s,r,q
t.M.a(a)
try{if(B.q===$.M){a.$0()
return}A.lP(null,null,this,a,t.H)}catch(q){s=A.c1(q)
r=A.cz(q)
A.ks(A.dQ(s),t.l.a(r))}},
dr(a){return new A.iU(this,t.M.a(a))},
ec(a,b){b.h("0()").a(a)
if($.M===B.q)return a.$0()
return A.lP(null,null,this,a,b)},
bu(a,b,c,d){c.h("@<0>").O(d).h("1(2)").a(a)
d.a(b)
if($.M===B.q)return a.$1(b)
return A.os(null,null,this,a,b,c,d)},
ed(a,b,c,d,e,f){d.h("@<0>").O(e).O(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.M===B.q)return a.$2(b,c)
return A.or(null,null,this,a,b,c,d,e,f)},
ck(a,b,c,d){return b.h("@<0>").O(c).O(d).h("1(2,3)").a(a)}}
A.iU.prototype={
$0(){return this.a.ee(this.b)},
$S:1}
A.jn.prototype={
$0(){A.mt(this.a,this.b)},
$S:1}
A.ds.prototype={
gp(a){return this.a},
gaa(){return new A.dt(this,this.$ti.h("dt<1>"))},
aw(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.cV(a)},
cV(a){var s=this.d
if(s==null)return!1
return this.a8(this.bL(s,a),a)>=0},
q(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.kd(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.kd(q,b)
return r}else return this.d4(b)},
d4(a){var s,r,q=this.d
if(q==null)return null
s=this.bL(q,a)
r=this.a8(s,a)
return r<0?null:s[r+1]},
A(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.bK(s==null?m.b=A.ke():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.bK(r==null?m.c=A.ke():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.ke()
p=A.fO(b)&1073741823
o=q[p]
if(o==null){A.kf(q,p,[b,c]);++m.a
m.e=null}else{n=m.a8(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
a5(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.av(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.av(s.c,b)
else return s.b5(b)},
b5(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.fO(a)&1073741823
r=n[s]
q=o.a8(r,a)
if(q<0)return null;--o.a
o.e=null
p=r.splice(q,2)[1]
if(0===r.length)delete n[s]
return p},
aA(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.bN()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.q(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.aC(m))}},
bN(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.eq(i.a,null,!1,t.A)
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
bK(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.kf(a,b,c)},
av(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.kd(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
bL(a,b){return a[A.fO(b)&1073741823]}}
A.dv.prototype={
a8(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.dt.prototype={
gp(a){return this.a.a},
gu(a){var s=this.a
return new A.du(s,s.bN(),this.$ti.h("du<1>"))}}
A.du.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.aC(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iQ:1}
A.aP.prototype={
d7(){return new A.aP(A.u(this).h("aP<1>"))},
gu(a){var s=this,r=new A.bR(s,s.r,A.u(s).h("bR<1>"))
r.c=s.e
return r},
gp(a){return this.a},
n(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cU(b)},
cU(a){var s=this.d
if(s==null)return!1
return this.a8(s[this.aY(a)],a)>=0},
j(a,b){var s,r,q=this
A.u(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bJ(s==null?q.b=A.kh():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bJ(r==null?q.c=A.kh():r,b)}else return q.cG(b)},
cG(a){var s,r,q,p=this
A.u(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.kh()
r=p.aY(a)
q=s[r]
if(q==null)s[r]=[p.aW(a)]
else{if(p.a8(q,a)>=0)return!1
q.push(p.aW(a))}return!0},
a5(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.av(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.av(s.c,b)
else return s.b5(b)},
b5(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.aY(a)
r=n[s]
q=o.a8(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.c6(p)
return!0},
a2(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aV()}},
bJ(a,b){A.u(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aW(b)
return!0},
av(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.c6(s)
delete a[b]
return!0},
aV(){this.r=this.r+1&1073741823},
aW(a){var s,r=this,q=new A.fq(A.u(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aV()
return q},
c6(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aV()},
aY(a){return J.N(a)&1073741823},
a8(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aA(a[r].a,b))return r
return-1},
$il0:1}
A.fq.prototype={}
A.bR.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.aC(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iQ:1}
A.hs.prototype={
$2(a,b){this.a.A(0,this.b.a(a),this.c.a(b))},
$S:14}
A.D.prototype={
gu(a){return new A.ai(a,this.gp(a),A.c_(a).h("ai<D.E>"))},
X(a,b){return this.q(a,b)},
aN(a,b){var s,r
A.c_(a).h("x(D.E)").a(b)
s=this.gp(a)
for(r=0;r<s;++r){if(!b.$1(this.q(a,r)))return!1
if(s!==this.gp(a))throw A.b(A.aC(a))}return!0},
i(a){return A.jZ(a,"[","]")}}
A.bF.prototype={
aA(a,b){var s,r,q,p=A.u(this)
p.h("~(1,2)").a(b)
for(s=this.gaa(),s=s.gu(s),p=p.y[1];s.k();){r=s.gl()
q=this.q(0,r)
b.$2(r,q==null?p.a(q):q)}},
dZ(a,b){var s,r,q,p,o,n=this,m=A.u(n)
m.h("x(1,2)").a(b)
s=A.d([],m.h("t<1>"))
for(r=n.gaa(),r=r.gu(r),m=m.y[1];r.k();){q=r.gl()
p=n.q(0,q)
if(b.$2(q,p==null?m.a(p):p))B.a.j(s,q)}for(m=s.length,o=0;o<s.length;s.length===m||(0,A.A)(s),++o)n.a5(0,s[o])},
gp(a){var s=this.gaa()
return s.gp(s)},
i(a){return A.ht(this)},
$ias:1}
A.hu.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.o(a)
r.a=(r.a+=s)+": "
s=A.o(b)
r.a+=s},
$S:61}
A.dK.prototype={}
A.cc.prototype={
q(a,b){return this.a.q(0,b)},
gp(a){return this.a.a},
gaa(){var s=this.a
return new A.b5(s,A.u(s).h("b5<1>"))},
i(a){return A.ht(this.a)},
gco(){var s=this.a
return new A.aL(s,A.u(s).h("aL<2>"))},
gaz(){var s=this.a
return new A.b4(s,A.u(s).h("b4<1,2>"))},
$ias:1}
A.dl.prototype={}
A.b9.prototype={
gcg(a){return this.gp(this)!==0},
D(a,b){var s
for(s=J.a3(A.u(this).h("m<1>").a(b));s.k();)this.j(0,s.gl())},
cd(a){var s,r,q=this.an(0)
for(s=this.gu(this);s.k();){r=s.gl()
if(a.n(0,r))q.a5(0,r)}return q},
i(a){return A.jZ(this,"{","}")},
dS(a,b){var s,r,q=this.gu(this)
if(!q.k())return""
s=J.c2(q.gl())
if(!q.k())return s
if(b.length===0){r=s
do r+=A.o(q.gl())
while(q.k())}else{r=s
do r=r+b+A.o(q.gl())
while(q.k())}return r.charCodeAt(0)==0?r:r},
dl(a,b){var s
A.u(this).h("x(1)").a(b)
for(s=this.gu(this);s.k();)if(b.$1(s.gl()))return!0
return!1},
X(a,b){var s,r
A.i_(b,"index")
s=this.gu(this)
for(r=b;s.k();){if(r===0)return s.gl();--r}throw A.b(A.ho(b,b-r,this,"index"))},
$im:1,
$ibp:1}
A.dC.prototype={
an(a){var s=this.d7()
s.D(0,this)
return s}}
A.fF.prototype={
j(a,b){this.$ti.c.a(b)
return A.nS()}}
A.dm.prototype={
gp(a){return this.a.a},
gu(a){var s=this.a
return A.kg(s,s.r,A.u(s).c)},
an(a){return this.a.an(0)}}
A.cs.prototype={}
A.dL.prototype={}
A.bz.prototype={
a_(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bz)if(this.a===b.a)s=this.b===b.b
return s},
gK(a){return A.bH(this.a,this.b,B.j,B.j,B.j,B.j)},
J(a,b){var s
t.df.a(b)
s=B.d.J(this.a,b.a)
if(s!==0)return s
return B.d.J(this.b,b.b)},
i(a){var s=this,r=A.mp(A.mX(s)),q=A.e3(A.mV(s)),p=A.e3(A.mR(s)),o=A.e3(A.mS(s)),n=A.e3(A.mU(s)),m=A.e3(A.mW(s)),l=A.kS(A.mT(s)),k=s.b,j=k===0?"":A.kS(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iag:1}
A.iC.prototype={
i(a){return this.v()}}
A.L.prototype={
gaF(){return A.mQ(this)}}
A.dW.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.h5(s)
return"Assertion failed"}}
A.ba.prototype={}
A.aT.prototype={
gb0(){return"Invalid argument"+(!this.a?"(s)":"")},
gb_(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.o(p),n=s.gb0()+q+o
if(!s.a)return n
return n+s.gb_()+": "+A.h5(s.gbm())},
gbm(){return this.b}}
A.da.prototype={
gbm(){return A.lF(this.b)},
gb0(){return"RangeError"},
gb_(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.o(q):""
else if(q==null)s=": Not greater than or equal to "+A.o(r)
else if(q>r)s=": Not in inclusive range "+A.o(r)+".."+A.o(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.o(r)
return s}}
A.ej.prototype={
gbm(){return A.a(this.b)},
gb0(){return"RangeError"},
gb_(){if(A.a(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gp(a){return this.f}}
A.dn.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.f3.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.ck.prototype={
i(a){return"Bad state: "+this.a}}
A.e2.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.h5(s)+"."}}
A.di.prototype={
i(a){return"Stack Overflow"},
gaF(){return null},
$iL:1}
A.iD.prototype={
i(a){return"Exception: "+this.a}}
A.hc.prototype={
i(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.m.prototype={
bj(a,b,c,d){var s,r
d.a(b)
A.u(this).O(d).h("1(1,m.E)").a(c)
for(s=this.gu(this),r=b;s.k();)r=c.$2(r,s.gl())
return r},
gp(a){var s,r=this.gu(this)
for(s=0;r.k();)++s
return s},
gaq(a){var s,r=this.gu(this)
if(!r.k())throw A.b(A.el())
s=r.gl()
if(r.k())throw A.b(A.kT())
return s},
dG(a,b){var s,r
A.u(this).h("x(m.E)").a(b)
for(s=this.gu(this);s.k();){r=s.gl()
if(b.$1(r))return r}throw A.b(A.el())},
X(a,b){var s,r
A.i_(b,"index")
s=this.gu(this)
for(r=b;s.k();){if(r===0)return s.gl();--r}throw A.b(A.ho(b,b-r,this,"index"))},
i(a){return A.mA(this,"(",")")}}
A.aa.prototype={
i(a){return"MapEntry("+A.o(this.a)+": "+A.o(this.b)+")"}}
A.Y.prototype={
gK(a){return A.w.prototype.gK.call(this,0)},
i(a){return"null"}}
A.w.prototype={$iw:1,
a_(a,b){return this===b},
gK(a){return A.eK(this)},
i(a){return"Instance of '"+A.eL(this)+"'"},
gG(a){return A.ky(this)},
toString(){return this.i(this)}}
A.fD.prototype={
i(a){return""},
$ibq:1}
A.f_.prototype={
gp(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.hD.prototype={
i(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.jL.prototype={
$1(a){return this.a.b7(this.b.h("0/?").a(a))},
$S:6}
A.jM.prototype={
$1(a){if(a==null)return this.a.cc(new A.hD(a===undefined))
return this.a.cc(a)},
$S:6}
A.js.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.lO(a))return a
s=this.a
a.toString
if(s.aw(a))return s.q(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.k(A.aY(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.bX(!0,"isUtc",t.y)
return new A.bz(r,0,!0)}if(a instanceof RegExp)throw A.b(A.j("structured clone of RegExp",null))
if(a instanceof Promise)return A.p1(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.aM(p,p)
s.A(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.cy(n),p=s.gu(n);p.k();)m.push(A.cx(p.gl()))
for(l=0;l<s.gp(n);++l){k=s.q(n,l)
if(!(l<m.length))return A.h(m,l)
j=m[l]
if(k!=null)o.A(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.A(0,a,o)
h=A.a(a.length)
for(s=J.cy(i),l=0;l<h;++l)o.push(this.$1(s.q(i,l)))
return o}return a},
$S:62}
A.iS.prototype={
cE(a){var s,r,q,p,o,n,m,l=this,k=4294967296
do{s=a>>>0
a=B.d.S(a-s,k)
r=a>>>0
a=B.d.S(a-r,k)
q=(~s>>>0)+(s<<21>>>0)
p=q>>>0
r=(~r>>>0)+((r<<21|s>>>11)>>>0)+B.d.S(q-p,k)>>>0
q=((p^(p>>>24|r<<8))>>>0)*265
s=q>>>0
r=((r^r>>>24)>>>0)*265+B.d.S(q-s,k)>>>0
q=((s^(s>>>14|r<<18))>>>0)*21
s=q>>>0
r=((r^r>>>14)>>>0)*21+B.d.S(q-s,k)>>>0
s=(s^(s>>>28|r<<4))>>>0
r=(r^r>>>28)>>>0
q=(s<<31>>>0)+s
p=q>>>0
o=B.d.S(q-p,k)
q=l.a*1037
n=l.a=q>>>0
m=l.b*1037+B.d.S(q-n,k)>>>0
l.b=m
n=(n^p)>>>0
l.a=n
o=(m^r+((r<<31|s>>>1)>>>0)+o>>>0)>>>0
l.b=o}while(a!==0)
if(o===0&&n===0)l.a=23063
l.ai()
l.ai()
l.ai()
l.ai()},
ai(){var s=this,r=s.a,q=4294901760*r,p=q>>>0,o=55905*r,n=o>>>0,m=n+p+s.b
r=m>>>0
s.a=r
s.b=B.d.S(o-n+(q-p)+(m-r),4294967296)>>>0},
dV(){var s,r=this
r.ai()
s=r.a
r.ai()
return((s&67108863)*134217728+(r.a&134217727))/9007199254740992}}
A.i2.prototype={}
A.cg.prototype={
v(){return"QualityProfileKind."+this.b}}
A.au.prototype={}
A.fZ.prototype={}
A.h_.prototype={}
A.cl.prototype={
v(){return"ToneMappingMode."+this.b}}
A.eH.prototype={
B(){var s,r,q,p,o,n,m,l,k,j=this,i=null
for(s=j.r,r=j.w,q=j.x,p=j.y,o=j.z,n=A.l_(["exposure",j.a,"bloomStrength",j.b,"ssaoStrength",j.c,"depthOfFieldStrength",j.d,"vignette",j.e,"grain",j.f,"rainIntensity",s,"surfaceWetness",r,"surfaceSnowCoverage",q,"surfaceDissolution",p,"rainWindowVisibility",o,"ditherStrength",j.Q,"colorGradeStrength",j.as,"affineWarpStrength",j.at,"vertexSnapGrid",j.ax,"vhsChromaWeight",j.ch,"vhsTrackingWeight",j.CW,"vhsNoiseWeight",j.cx,"vhsHeadSwitchWeight",j.cy,"vhsDropoutWeight",j.db,"vhsGhostWeight",j.dx],t.N,t.i),n=new A.b4(n,A.u(n).h("b4<1,2>")).gu(0);n.k();){m=n.d
l=m.a
k=m.b
if(!isFinite(k)||k<0)throw A.b(A.j("PostProcessState."+l+" must be >= 0: "+A.o(k),i))}n=j.ay
if(n<1||n>8)throw A.b(A.j("PostProcessState.quantizationBits must be in [1, 8]: "+n,i))
if(s>1)throw A.b(A.j("PostProcessState.rainIntensity must be in [0, 1]: "+s,i))
if(r>1)throw A.b(A.j("PostProcessState.surfaceWetness must be in [0, 1]: "+r,i))
if(q>1)throw A.b(A.j("PostProcessState.surfaceSnowCoverage must be in [0, 1]: "+q,i))
if(p>1)throw A.b(A.j("PostProcessState.surfaceDissolution must be in [0, 1]: "+p,i))
if(o>1)throw A.b(A.j("PostProcessState.rainWindowVisibility must be in [0, 1]: "+o,i))}}
A.cD.prototype={
gcf(){var s,r=this,q=r.x
if(q===$){s=r.b.bo()
r.x!==$&&A.kC()
r.x=s
q=s}return q},
gdR(){var s,r=this,q=r.z
if(q===$){s=r.c.bo()
r.z!==$&&A.kC()
r.z=s
q=s}return q},
B(){var s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=i.d
if(!g.gL(0))throw A.b(A.j("CameraView.eye must be finite: "+g.i(0),h))
g=i.e
if(!g.gL(0)||g.ga3()<1e-12)throw A.b(A.j("CameraView.forward must be finite and nonzero: "+g.i(0),h))
g=i.f
if(isFinite(g)){s=i.r
s=!isFinite(s)||g<=0||s<=g}else s=!0
if(s)throw A.b(A.j("CameraView requires 0 < near < far, got "+A.o(g)+"/"+i.r,h))
g=i.w
if(!isFinite(g)||g<=0)throw A.b(A.j("CameraView.aspect must be finite and > 0: "+A.o(g),h))
g=i.a
if(!g.gL(0)||!i.b.gL(0)||!i.c.gL(0))throw A.b(A.j("CameraView matrices must be finite",h))
for(s=i.c.a,r=s.length,g=i.b.t(0,g).a,q=g.length,p=0,o=-1,n=0;n<16;++n){if(!(n<r))return A.h(s,n)
m=s[n]
if(!(n<q))return A.h(g,n)
l=g[n]
k=Math.abs(m-l)/(1+Math.abs(l))
if(k>p){o=n
p=k}}if(p>0.0001){m=B.c.eh(p,2)
l=B.d.S(o,4)
j=B.d.a0(o,4)
if(!(o>=0&&o<r))return A.h(s,o)
s=s[o]
if(!(o<q))return A.h(g,o)
throw A.b(A.j("CameraView.viewProjection must equal projection * view. Worst relative mismatch "+m+" at column "+l+" row "+j+" (got "+A.o(s)+", expected "+A.o(g[o])+"). Prefer CameraView.look/lookAt/fromMatrices, which derive it.",h))}}}
A.eW.prototype={}
A.ea.prototype={
B(){var s,r,q,p,o,n,m,l,k,j=this,i=null
if(!j.a.gL(0)||!j.b.gL(0)||!j.fx.gL(0)||!j.r.gL(0)||!j.dx.gL(0))throw A.b(A.j("FrameEnvironment colors must be finite",i))
if(j.k4!=null){s=!0
if(B.t.ei("showcase_sky").length!==0)if(B.aC.gL(0))if(B.c6.gL(0))if(B.aD.gL(0))if(isFinite(0.12))if(isFinite(0.005))if(isFinite(0))if(isFinite(1))if(isFinite(0.32))if(isFinite(0.4))if(isFinite(650))if(isFinite(350))if(isFinite(0.0012))if(Math.abs(0)<=1000)if(isFinite(0.55))s=!isFinite(0.25)
if(s)A.k(A.j("SkyboxDeclaration contains invalid values",i))}s=j.c
if(isFinite(s)){r=j.d
r=!isFinite(r)||r<s}else r=!0
if(r)throw A.b(A.j("FrameEnvironment requires fogEnd >= fogStart, got "+s+"/"+j.d,i))
s=j.fy
if(!isFinite(s))throw A.b(A.j("FrameEnvironment.ambientIntensity must be >= 0: "+s,i))
if(j.go!=null){if(!B.G.gL(0)||B.G.ga3()<1e-12)A.k(A.j("DirectionalLight.direction must be finite and nonzero: "+B.G.i(0),i))
if(!isFinite(2.4))A.k(A.j("DirectionalLight.intensity must be >= 0: 2.4",i))}for(s=j.id,r=s.length,q=0;q<r;++q){p=s[q]
o=p.b
if(!(isFinite(o.a)&&isFinite(o.b)&&isFinite(o.c)))A.k(A.j("PointLight.position must be finite: "+o.i(0),i))
o=p.d
if(!isFinite(o)||o<0)A.k(A.j("PointLight.intensity must be >= 0: "+A.o(o),i))
o=p.e
if(!isFinite(o)||o<=0)A.k(A.j("PointLight.radius must be > 0: "+o,i))}for(s=isFinite(0),r=isFinite(1),o=isFinite(-1),q=0;!1;++q){if(s)n=r
else n=!1
if(!n)A.k(A.j("SpotLight.position must be finite: "+B.k.i(0),i))
if(s)n=o
else n=!1
if(!n)A.k(A.j("SpotLight.direction must be finite and nonzero: "+B.p.i(0),i))}s=t.N
m=A.an(s)
for(r=j.k2,q=0;!1;++q){l=r[q]
l.B()
if(!m.j(0,l.gC()))throw A.b(A.j("FrameEnvironment.volumetricSources contains duplicate id: "+A.o(l.gC()),i))}r=j.w
o=!0
if(!(r<0))if(isFinite(r)){r=j.x
if(!(r>0.5))if(isFinite(r)){r=j.y
if(!(r<=-0.999))if(!(r>=0.999))if(isFinite(r)){r=j.z
if(!(r<0))if(!(r>0.5))if(isFinite(r)){r=j.Q
if(r<=8)if(isFinite(r)){r=j.as
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
else r=o}else r=o
else r=o
else r=o}else r=o
else r=o
else r=o}else r=o
else r=o}else r=o
else r=o
if(r)throw A.b(A.j("invalid volumetric medium controls",i))
k=A.an(s)
for(s=j.k3,q=0;!1;++q){l=s[q]
l.B()
if(!k.j(0,l.gC()))throw A.b(A.j("FrameEnvironment.thermalSources contains duplicate id: "+A.o(l.gC()),i))}},
b9(a,b,c,d,e,f,g,h,i){var s,r,q,p,o,n,m,l,k,j=this
t.c3.a(e)
s=c==null?j.a:c
r=f==null?j.dx:f
q=h==null?j.dy:h
p=g==null?j.fr:g
o=a==null?j.fx:a
n=b==null?j.fy:b
m=d===B.B?j.go:t.eB.a(d)
l=e==null?j.id:e
k=i===B.B?j.k4:t.bG.a(i)
return new A.ea(s,j.b,j.c,j.d,j.e,j.f,j.r,j.w,j.x,j.y,j.z,j.Q,j.as,j.at,j.ax,j.ay,j.ch,j.CW,j.cx,j.cy,j.db,r,q,p,o,n,m,l,j.k1,j.k2,j.k3,k)},
dv(a){var s=null
return this.b9(s,s,s,B.B,s,s,s,s,a)},
dw(a,b,c,d,e,f,g){return this.b9(a,b,c,d,null,e,f,g,B.B)},
du(a){var s=null
return this.b9(s,s,s,B.B,a,s,s,s,B.B)}}
A.he.prototype={}
A.hf.prototype={
bn(a){++this.b}}
A.b8.prototype={
a_(a,b){if(b==null)return!1
return J.dV(b)===A.ky(this)&&b instanceof A.b8&&this.a===b.a&&this.b===b.b},
gK(a){return A.bH(A.ky(this),this.a,this.b,B.j,B.j,B.j)}}
A.at.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MeshHandle(#"+this.a+"."+this.b+s+")"}}
A.av.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"TextureHandle(#"+this.a+"."+this.b+s+")"}}
A.aX.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MaterialHandle(#"+this.a+"."+this.b+s+")"}}
A.eF.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"PipelineHandle(#"+this.a+"."+this.b+s+")"}}
A.b2.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.ca.prototype={
v(){return"HandleRejection."+this.b}}
A.hn.prototype={
i(a){return"HandleException("+this.a.b+", "+this.b.i(0)+")"}}
A.cf.prototype={
i(a){var s=this.b,r=this.a.a
return s==null?r.b+": ok":r.b+": "+A.o(s)}}
A.dZ.prototype={}
A.jt.prototype={
$1(a){return t.W.a(a)===this.a},
$S:65}
A.K.prototype={
gL(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
a_(a,b){if(b==null)return!1
return b instanceof A.K&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gK(a){return A.bH(this.a,this.b,this.c,B.j,B.j,B.j)},
i(a){return"LinearColor("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.e6.prototype={}
A.bo.prototype={}
A.ap.prototype={}
A.jN.prototype={
$2(a,b){var s,r=t.fk
r.a(a)
s=B.c.J(r.a(b).a,a.a)
return s===0?0:s},
$S:15}
A.fR.prototype={
v(){return"AlphaMode."+this.b}}
A.eu.prototype={
v(){return"MaterialMapColorSpace."+this.b}}
A.bG.prototype={
B(){var s,r,q,p,o,n,m,l=this,k=null
if(l.a.length===0)throw A.b(A.j("MaterialDefinition.key must not be empty",k))
if(!isFinite(0))throw A.b(A.j("MaterialDefinition.emissiveStrength must be >= 0: 0",k))
s=l.z
if(!isFinite(s)||s<0)throw A.b(A.j("MaterialDefinition.normalStrength must be >= 0: "+A.o(s),k))
A.et("roughness",l.at)
A.et("metallic",l.ax)
A.et("occlusionStrength",1)
A.et("clearcoatStrength",l.ch)
A.et("clearcoatRoughness",l.CW)
for(s=l.db,r=l.dx,q=[new A.al("uvScaleU",s),new A.al("uvScaleV",r),new A.al("uvOffsetU",0),new A.al("uvOffsetV",0),new A.al("tintR",l.d),new A.al("tintG",l.e),new A.al("tintB",l.f)],p=0;p<7;++p){o=q[p]
n=o.a
m=o.b
if(!isFinite(m))throw A.b(A.j("MaterialDefinition."+n+" must be finite: "+A.o(m),k))}if(s===0||r===0)throw A.b(A.j("MaterialDefinition uv scale must not be zero",k))
if(!isFinite(0.5))throw A.b(A.j("MaterialDefinition.alphaCutoff must be in (0, 1]: 0.5",k))}}
A.bd.prototype={
v(){return"VertexAttributeKind."+this.b}}
A.ac.prototype={}
A.ir.prototype={
B(){var s,r,q,p,o='VertexLayoutDescriptor "surfaceV2": attribute '
for(s=0;s<7;++s){r=B.C[s]
q=r.c
if(q<=0)throw A.b(A.j(o+r.a.i(0)+" must have a positive floatCount",null))
p=r.b
q=p+q
if(q>18)throw A.b(A.j(o+r.a.i(0)+" range ["+p+", "+q+") exceeds stride 18",null))}q=t.fg.a(new A.is())
for(p=B.a.gu(B.C),q=new A.F(p,q,t.an);q.k();)if(p.gl().c!==4)throw A.b(A.j('VertexLayoutDescriptor "surfaceV2": tangent4 must contain 4 floats',null))}}
A.is.prototype={
$1(a){return t.G.a(a).a===B.ao},
$S:7}
A.bm.prototype={
B(){var s,r,q,p,o,n=this
n.a.B()
s=n.b.length
if(B.d.a0(s,18)!==0)throw A.b(A.j("MeshData.vertices length "+s+" is not a multiple of stride 18",null))
n.dk()
r=s/18|0
for(s=A.mJ(n.c),q=s.length,p=0;p<q;++p){o=s[p]
if(o>=r)throw A.b(A.j("MeshData index "+o+" out of range for "+r+" vertices",null))}s=n.d
q=s.a
if(q.gL(0)&&s.b.gL(0)){s=s.b
s=q.a<=s.a&&q.b<=s.b&&q.c<=s.c}else s=!1
if(!s)throw A.b(A.j("MeshData.localBounds must be a valid AABB",null))},
dk(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=null,a2=t.fg,a3=t.fl,a4=new A.a1(B.C,a2.a(new A.hx()),a3)
if(!a4.gu(0).k())return
s=new A.a1(B.C,a2.a(new A.hy()),a3)
if(s.gp(0)!==1)throw A.b(A.j("surface-v2 tangent data requires one normal slot",a1))
r=a4.gaq(0)
for(a2=this.b,a3=a2.length,q=a3/18|0,p=t.n,o=s.gaq(0).b,n=r.b,m=0;m<q;++m){l=m*18
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
if(!B.a.aN(A.d([j,h,g,f,e,d,c],p),new A.hz()))throw A.b(A.j("surface-v2 tangent basis must be finite",a1))
if(b<1e-8||a<1e-8)throw A.b(A.j("surface-v2 tangent basis must be non-zero",a1))
a0=(j*f+h*e+g*d)/Math.sqrt(b*a)
if(Math.abs(a0)>0.05)throw A.b(A.j("surface-v2 tangent must be orthogonal to its normal: "+A.o(a0),a1))
if(Math.abs(Math.abs(c)-1)>0.05)throw A.b(A.j("surface-v2 tangent handedness must be -1 or +1: "+A.o(c),a1))}}}
A.hx.prototype={
$1(a){return t.G.a(a).a===B.ao},
$S:7}
A.hy.prototype={
$1(a){return t.G.a(a).a===B.b5},
$S:7}
A.hz.prototype={
$1(a){return isFinite(A.fM(a))},
$S:12}
A.h3.prototype={}
A.hF.prototype={
B(){var s=this.a,r=s.a
if(!r.n(0,"sceneColor")||!r.n(0,"present"))throw A.b(A.j("resource plan must contain sceneColor and present",null))
if(s.dl(0,new A.hH()))throw A.b(A.j("resource plan contains an empty resource ID",null))
if(this.b!==r.n(0,"vhsOutput"))throw A.b(A.j("resource history does not match vhsOutput ownership",null))}}
A.hH.prototype={
$1(a){return A.ae(a).length===0},
$S:8}
A.hW.prototype={}
A.eP.prototype={
ce(a){var s=this
if(s.d)A.k(A.l("resource assembler is disposed"))
if(s.a!=null)throw A.b(A.l("resource assembler is initialized"))
a.B()
s.a=a
s.c=1},
ag(){if(this.d)return
this.d=!0
this.a=null}}
A.cM.prototype={
v(){return"DrawMode."+this.b}}
A.fW.prototype={
v(){return"BlendMode."+this.b}}
A.bK.prototype={}
A.ij.prototype={
i(a){var s=this
return"SurfaceMetrics(css "+s.a+"x"+s.b+", pixels "+s.c+"x"+s.d+", dpr "+A.o(s.e)+", visible: true)"},
B(){var s,r=this
if(r.a<0||r.b<0)throw A.b(A.j("SurfaceMetrics css size must be >= 0",null))
if(r.c<0||r.d<0)throw A.b(A.j("SurfaceMetrics pixel size must be >= 0",null))
s=r.e
if(!isFinite(s)||s<=0)throw A.b(A.j("SurfaceMetrics.devicePixelRatio must be finite and > 0: "+A.o(s),null))}}
A.fY.prototype={
v(){return"ColorEncoding."+this.b}}
A.dc.prototype={
B(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.cd(B.dl)
if(o.a!==0)A.k(A.aI(o,r,"contains unknown pipeline features"))
if(q.a===B.aM&&p.gcg(p))A.k(A.aI(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.b(A.j("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.b(A.j("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.ch.prototype={
v(){return"RendererState."+this.b}}
A.T.prototype={}
A.hg.prototype={
i(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.b+" tris="+s.c+" culled="+s.d+" gpu="+s.r+"B)"}}
A.ev.prototype={
e5(a){return this.a.ak(a)}}
A.hw.prototype={
$3(a,b,c){return new A.aX(A.a(a),A.a(b),A.bU(c))},
$S:20}
A.f5.prototype={}
A.hA.prototype={
c8(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.b,d=A.ln(f,new A.ec(e.byteLength,B.av,B.bw))
if(f.b!==B.f)A.k(A.l(g))
s=A.p(d.a)
r=f.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.aF(f)
A.a5(f,p)
if(f.b!==B.f)A.k(A.l(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=A.an(t.S)
for(n=a.a,m=0;m<7;++m){l=B.C[m]
k=A.lS(l.a)
if(!o.j(0,k))continue
j=A.nZ(n,k,l)
if(f.b!==B.f)A.k(A.l(g))
r.vertexAttribPointer.apply(r,[k,j,A.a(q.WebGL2RenderingContext.FLOAT),!1,72,l.b*4])
if(f.b!==B.f)A.k(A.l(g))
r.enableVertexAttribArray(k)}i=a.c
h=A.ln(f,new A.ec(A.l5(i),B.av,B.au))
if(f.b!==B.f)A.k(A.l(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),A.p(h.a))
A.nq(f,h,t.bW.a(i))
f=i.length
return new A.f5(d,h,p,f,e.length/18|0,!1)},
e_(a){var s=this.c.q(0,a.a)
if(s==null)throw A.b(A.bi(B.P,a))
this.b.ak(a)
return s},
bs(){var s,r,q,p
for(s=this.b.aC(),r=s.$ti,s=new A.bf(s.a(),r.h("bf<1>")),q=this.c,r=r.c;s.k();){p=s.b
if(p==null)p=r.a(p)
q.A(0,p.a.a,this.c8(p.b))}},
gaD(){return this.b.aC().bj(0,0,new A.hC(),t.S)}}
A.hB.prototype={
$3(a,b,c){return new A.at(A.a(a),A.a(b),A.bU(c))},
$S:21}
A.hC.prototype={
$2(a,b){var s,r
A.a(a)
s=t.ai.a(b).b
r=s.b.byteLength
s=A.l5(s.c)
return a+r+s},
$S:22}
A.b_.prototype={}
A.f2.prototype={
a1(a){var s=this.a,r=A.k9(s,B.bz)
A.ka(s,r,0,a)
return r},
dF(a){var s,r=this.b,q=r.ak(a),p=q.a
if(!p.d)return
s=this.c.q(0,a.a)
if(s==null)throw A.b(A.l("TextureStore.finalizeMips: no pixels uploaded yet for "+a.i(0)))
A.lo(this.a,s)
r.by(a,new A.b_(p,q.b,!0))},
b6(a,b){var s
this.b.ak(a)
s=this.c.q(0,a.a)
return s==null?b:s},
e1(a){var s
if(a==null){s=this.d
s===$&&A.az()
return s}s=this.d
s===$&&A.az()
return this.b6(a,s)},
e9(a){var s
if(a==null){s=this.e
s===$&&A.az()
return s}s=this.e
s===$&&A.az()
return this.b6(a,s)},
eb(a){var s
if(a==null){s=this.f
s===$&&A.az()
return s}s=this.f
s===$&&A.az()
return this.b6(a,s)},
e3(a){var s=this.r
s===$&&A.az()
return s},
e7(a){var s=this.w
s===$&&A.az()
return s},
ag(){var s,r,q,p,o,n=this
for(s=n.c,r=new A.b6(s,s.r,s.e,A.u(s).h("b6<2>")),q=n.a,p=q.a,o=t.R;r.k();)p.deleteTexture(o.a(r.d.a).a)
s.a2(0)
s=n.d
s===$&&A.az()
A.fa(q,s)
s=n.e
s===$&&A.az()
A.fa(q,s)
s=n.f
s===$&&A.az()
A.fa(q,s)
s=n.r
s===$&&A.az()
A.fa(q,s)
s=n.w
s===$&&A.az()
A.fa(q,s)},
bs(){var s,r,q,p,o,n,m,l,k,j,i=this
i.d=i.a1($.kI())
i.e=i.a1($.kF())
i.f=i.a1($.kG())
i.r=i.a1($.kE())
i.w=i.a1($.kH())
for(s=i.b.aC(),r=s.$ti,s=new A.bf(s.a(),r.h("bf<1>")),q=i.c,p=i.a,r=r.c;s.k();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
o=m.b
if(B.a.aN(o,new A.im()))continue
l=A.k9(p,m.a)
for(k=0;k<o.length;++k){j=o[k]
if(j!=null)A.ka(p,l,k,j)}if(m.c)A.lo(p,l)
q.A(0,n.a,l)}},
gaD(){return this.b.aC().bj(0,0,new A.il(),t.S)}}
A.ik.prototype={
$3(a,b,c){return new A.av(A.a(a),A.a(b),A.bU(c))},
$S:24}
A.im.prototype={
$1(a){return t.aD.a(a)==null},
$S:25}
A.il.prototype={
$2(a,b){var s
A.a(a)
s=t.dU.a(b).b.a
return a+s.a*s.b*s.c*4},
$S:26}
A.jO.prototype={
$2(a,b){var s,r=t.eS
r.a(a)
s=J.kK(r.a(b).a,a.a)
return s},
$S:27}
A.bA.prototype={
gal(){var s=this,r=Math.cos(s.c),q=Math.sin(s.c)
return new A.f(Math.sin(s.b)*r,q,-Math.cos(s.b)*r).gE()},
ao(a){var s,r,q,p,o,n,m=this
if(a<=0)return
s=10*a
if(m.z.ga3()>0.000001){r=new A.f(m.gal().a,0,m.gal().c).gE()
q=new A.f(m.gal().a6(B.k).gE().a,0,m.gal().a6(B.k).gE().c).gE()
p=m.z
o=r.t(0,p.c).H(0,q.t(0,p.a)).H(0,B.k.t(0,p.b)).gE().t(0,m.d)
n=B.c.I(s,0,1)
s=m.y.t(0,1-n).H(0,o.t(0,n))
m.y=s
m.a=m.a.H(0,s.t(0,a))}else{n=B.c.I(s,0,1)
s=m.y=m.y.t(0,1-n)
if(s.ga3()>0.000001)m.a=m.a.H(0,s.t(0,a))}},
bv(a){return A.fX(a,this.a,200,this.gal(),1,0.1,B.k)},
$ijY:1}
A.bn.prototype={
gbh(){var s=this,r=Math.cos(s.d),q=Math.sin(s.d),p=Math.sin(s.c),o=Math.cos(s.c),n=s.a,m=s.b
return n.H(0,new A.f(r*p*m,q*m,r*o*m))},
gcl(){return this.a.a7(0,this.gbh()).gE().a6(B.k).gE()},
ao(a){var s,r,q,p=this
if(a<=0)return
if(p.as)p.ax=p.ax+p.at*a
s=B.c.I(1-Math.exp(-10*a),0,1)
r=p.c
p.c=r+(p.ax-r)*s
r=p.d
p.d=r+(p.ay-r)*s
r=p.b
p.b=r+(p.ch-r)*s
r=p.CW
q=p.a
p.a=q.H(0,r.a7(0,q).t(0,s))},
bv(a){var s=this.gbh(),r=this.a,q=r.a7(0,s)
if(q.ga3()<1e-12)A.k(A.j("CameraView.lookAt requires target ("+r.i(0)+") distinct from eye ("+s.i(0)+")",null))
return A.fX(a,s,200,q,1,0.1,B.k)},
$ijY:1}
A.bD.prototype={
gdL(){return this.b.length}}
A.e8.prototype={
dt(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h
t.U.a(a)
s=new A.i5(A.d([],t.cU),A.an(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p)r[p].U(s,b)
o=s.ds(a,!1)
if(o.b.length!==0)return new A.e9(o,B.ch)
q=o.a
n=A.G(q)
m=new A.aj(q,n.h("v(1)").a(new A.h8()),n.h("aj<1,v>")).an(0)
l=A.d([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p){k=r[p]
for(n=k.T(d),j=n.length,i=0;i<n.length;n.length===j||(0,A.A)(n),++i){h=n[i]
if(!m.n(0,h.gm().a))throw A.b(A.l('RenderFeature "'+k.gC()+'" created a pass "'+h.gm().a+'" that it never declared into the graph'))
B.a.j(l,h)}}B.a.ad(l,new A.h9(o))
return new A.e9(o,l)}}
A.h8.prototype={
$1(a){return t.z.a(a).a},
$S:28}
A.h9.prototype={
$2(a,b){var s=t.fA
s.a(a)
s.a(b)
s=this.a.a
return B.d.J(B.a.bk(s,new A.h6(a)),B.a.bk(s,new A.h7(b)))},
$S:29}
A.h6.prototype={
$1(a){return t.z.a(a).a===this.a.gm().a},
$S:4}
A.h7.prototype={
$1(a){return t.z.a(a).a===this.a.gm().a},
$S:4}
A.e9.prototype={}
A.c8.prototype={
v(){return"FrameQueueState."+this.b}}
A.eb.prototype={$in6:1}
A.hd.prototype={
dq(a){if(a.length===0)throw A.b(A.aI(a,"passId",null))
this.b=a
this.a.br(a,A.lW())},
cu(){var s,r,q,p,o=t.A
o=A.aM(o,o)
for(s=this.a,s=new A.b4(s,A.u(s).h("b4<1,2>")).gu(0);s.k();){r=s.d
q=r.a
p=r.b
o.A(0,q,new A.T(p.a,p.b,p.d))}return A.kQ(o,t.N,t.o)},
aj(a,b){var s,r=this.b
if(r==null)throw A.b(A.l("draw recorded outside an active render pass"))
if(b<1)throw A.b(A.j("draw count and instance count must be positive",null))
s=this.a.q(0,r);++s.a
s.d+=b
s.b=s.b+B.d.S(a,3)*b}}
A.cq.prototype={}
A.E.prototype={
gam(){var s=this.c,r=A.G(s)
return new A.a1(s,r.h("x(1)").a(new A.hI()),r.h("a1<1>"))},
gaE(){var s=this.c,r=A.G(s)
return new A.a1(s,r.h("x(1)").a(new A.hJ()),r.h("a1<1>"))},
i(a){return"PassDeclaration("+this.a+" @ "+this.b.i(0)+")"}}
A.hI.prototype={
$1(a){var s=t.L.a(a).b
return s===B.e||s===B.u},
$S:9}
A.hJ.prototype={
$1(a){return t.L.a(a).b===B.h},
$S:9}
A.aK.prototype={
v(){return"GraphValidationFailureKind."+this.b}}
A.a9.prototype={
i(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.eN.prototype={
v(){return"ResourceFormat."+this.b}}
A.b1.prototype={
v(){return"GraphStage."+this.b}}
A.O.prototype={
ci(){var s=this
return new A.O(s.a,s.b,s.c,s.d,s.e,s.f+1)},
a_(a,b){var s=this
if(b==null)return!1
return b instanceof A.O&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gK(a){var s=this
return A.bH(s.a,s.b,s.c,s.d,s.e,s.f)},
i(a){var s=this,r=s.b.i(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.de.prototype={
v(){return"ResourceAccess."+this.b}}
A.n.prototype={}
A.cH.prototype={}
A.hZ.prototype={
V(a){var s,r,q,p,o,n,m=this
a.B()
s=null
try{r=a.d.gaa()
r=A.ar(r,A.u(r).h("m.E"))
q=t.dy
s=A.nt(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.c1(p) instanceof A.dh){++m.e
throw p}else throw p}o=new A.cH(s)
r=m.b
q=a.a
n=r.q(0,q)
r.A(0,q,o);++m.d
if(n!=null)m.a.a.deleteProgram(A.p(n.b.a))
return o},
cX(a){var s,r
t.cr.a(a)
for(s=a.a,s=new A.b6(s,s.r,s.e,a.$ti.h("b6<1>")),r=this.a.a;s.k();)r.deleteProgram(A.p(s.d.b.a))}}
A.a4.prototype={
B(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.b(A.j("ProgramSource.id must not be empty",m))
s=t.S
r=A.an(s)
for(q=this.d.gaz(),q=q.gu(q);q.k();){p=q.gl()
o=p.b
if(o<0)throw A.b(A.j('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.j(0,o))throw A.b(A.j('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.an(s)
for(s=this.e.gaz(),s=s.gu(s);s.k();){q=s.gl()
p=q.b
if(p<0)throw A.b(A.j('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.j(0,p))throw A.b(A.j('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.i3.prototype={}
A.Z.prototype={
N(){var s=this
return A.mr(B.b8,s.f,B.I,B.H,!0,!0,!0,!0,s.r,B.K,B.L,s.d,s.e,!0,!1,!1)}}
A.i5.prototype={
ds(a,b){var s=this.dj(t.U.a(a),!1),r=this.a,q=A.G(r)
return new A.i4(A.cZ(new A.a1(r,q.h("x(1)").a(new A.ia()),q.h("a1<1>")),t.z),s)},
dj(a,b){var s,r,q,p,o,n,m=this
t.U.a(a)
s=A.d([],t.b7)
r=m.a
q=A.G(r)
p=q.h("a1<1>")
o=A.ar(new A.a1(r,q.h("x(1)").a(new A.i9()),p),p.h("m.E"))
m.cJ(o,a,s)
m.cN(o,s)
m.cP(o,s)
m.cM(o,!1,s)
n=m.cR(o,s)
m.cO(o,n,s)
m.cQ(o,s)
m.cL(o,n,s)
m.cK(o,s)
return s},
cJ(a,b,c){var s,r,q,p
t.O.a(a)
t.U.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
p=B.a9.cd(b)
if(p.a!==0)B.a.j(c,new A.a9(B.bN,q.a,"missing capabilities: "+p.dS(0,", ")))}},
cN(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gam(),o=J.a3(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gl().a
if(m.e>1)B.a.j(b,new A.a9(B.bI,n,"reads multisampled resource "+m.i(0)+" directly; resolve before sampling"))}}},
cP(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.G(a),r=s.h("x(1)").a(new A.i8()),q=B.a.gu(a),s=new A.F(q,r,s.h("F<1>"));s.k();){r=q.gl()
p=r.gam()
o=A.ar(p,p.$ti.h("m.E"))
p=r.gaE()
n=A.ar(p,p.$ti.h("m.E"))
if(o.length!==1||n.length!==1){B.a.j(b,new A.a9(B.a0,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.a.gaq(o).a
l=B.a.gaq(n).a
if(m.e<=1||l.e>1)B.a.j(b,new A.a9(B.a0,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.a.j(b,new A.a9(B.a0,r.a,"resolve source and destination must match format and extent"))}},
cM(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.A)(p),++m){l=p[m]
if(l.b===B.u)B.a.j(c,new A.a9(B.bL,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
cR(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.aM(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.A)(a),++q){p=a[q]
for(o=p.gaE(),n=J.a3(o.a),o=new A.F(n,o.b,o.$ti.h("F<1>")),m=p.a;o.k();){l=n.gl().a
k=l.a+"#"+l.f
j=s.q(0,k)
if(j!=null){B.a.j(b,new A.a9(B.bH,m,l.i(0)+" already written by "+j.a))
continue}s.A(0,k,p)}}return s},
cO(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gam(),p=J.a3(q.a),q=new A.F(p,q.b,q.$ti.h("F<1>")),o=r.a;q.k();){n=p.gl()
if(n.b===B.u)continue
n=n.a
m=b.q(0,n.a+"#"+n.f)
if(m==null){B.a.j(c,new A.a9(B.ay,o,"reads "+n.i(0)+" but no pass writes that version"))
continue}if(B.a.dJ(a,m)>s)B.a.j(c,new A.a9(B.ay,o,"reads "+n.i(0)+" before writer "+m.a+" runs"))}}},
cQ(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gam(),o=J.a3(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gl()
if(m.b===B.u)continue
for(l=q.gaE(),k=J.a3(l.a),l=new A.F(k,l.b,l.$ti.h("F<1>")),m=m.a,j=m.a,i=m.f;l.k();){h=k.gl().a
if(j===h.a&&i===h.f)B.a.j(b,new A.a9(B.bK,n,"reads and writes "+m.i(0)+" at the same version; declare a ping-pong version bump"))}}}},
cL(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gam(),o=J.a3(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gl()
if(m.b===B.u)continue
l=m.a
k=b.q(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gaE().dG(0,new A.i7(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.a.j(c,new A.a9(B.bJ,n,"reads "+l.i(0)+" but writer "+k.a+" produced "+j.i(0)))}}},
cK(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.aM(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gaE(),o=J.a3(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>"));p.k();){n=o.gl().a
r.A(0,n.a+"#"+n.f,q)}m=J.k_(p,t.cJ)
for(l=0;l<p;++l)m[l]=A.an(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gam(),p=J.a3(s.a),s=new A.F(p,s.b,s.$ti.h("F<1>"));s.k();){o=p.gl()
if(o.b===B.u)continue
o=o.a
k=r.q(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.h(m,k)
m[k].j(0,q)}}p=t.y
j=A.eq(s,!1,!1,p)
s=a.length
i=A.eq(s,!1,!1,p)
h=new A.i6(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.h(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.h(a,q)
B.a.j(b,new A.a9(B.bM,a[q].a,"participates in a resource dependency cycle"))}}}}
A.ia.prototype={
$1(a){t.z.a(a)
return A.k5()},
$S:4}
A.i9.prototype={
$1(a){t.z.a(a)
return A.k5()},
$S:4}
A.i8.prototype={
$1(a){return t.z.a(a).f},
$S:4}
A.i7.prototype={
$1(a){var s=t.L.a(a).a,r=this.a.a
return s.a===r.a&&s.f===r.f},
$S:9}
A.i6.prototype={
$1(a){var s,r,q,p,o=this,n=o.a
if(!(a>=0&&a<n.length))return A.h(n,a)
if(n[a])return!0
s=o.b
if(!(a<s.length))return A.h(s,a)
if(s[a])return!1
B.a.A(n,a,!0)
r=o.c
if(!(a<r.length))return A.h(r,a)
r=r[a]
r=A.kg(r,r.r,A.u(r).c)
q=r.$ti.c
while(r.k()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.a.A(n,a,!1)
B.a.A(s,a,!0)
return!1},
$S:32}
A.i4.prototype={}
A.cp.prototype={$iaE:1,
gC(){return this.a},
gm(){return this.b},
gbz(){return this.c}}
A.db.prototype={
c9(a){var s,r,q=a.c,p=q.a
if(!p.gL(0))A.k(A.j("Transform.translation must be finite: "+p.i(0),null))
p=q.b
if(!(isFinite(p.a)&&isFinite(p.b)&&isFinite(p.c)&&isFinite(p.d)))A.k(A.j("Transform.rotation must be finite: "+p.i(0),null))
p=q.c
if(!isFinite(p)||p<=0)A.k(A.j("Transform.scale must be finite and positive: "+A.o(p),null))
s=this.a.ak(a.a)
q=q.ab()
p=s.d.gba()
r=A.G(p)
return A.jW(new A.aj(p,r.h("f(1)").a(q.gbx()),r.h("aj<1,f>")))},
$in9:1}
A.ib.prototype={
$3(a,b,c){return new A.b2(A.a(a),A.a(b),A.bU(c))},
$S:33}
A.eO.prototype={
ah(a,b){var s,r
if(this.x)A.k(A.l("resource library is disposed"))
s=this.a
a.B()
r=s.b.aM(a,b)
s.c.A(0,r.a,s.c8(a))
this.f.j(0,r)
return r},
Y(a){var s
if(this.x)A.k(A.l("resource library is disposed"))
a.B()
s=this.b.a.aM(a,null)
this.r.j(0,s)
return s},
ag(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
if(e.x)return
s=e.w
r=A.ar(s,A.u(s).c)
q=r.length
p=e.c
o=p.c
n=p.a.a
m=t.R
l=0
for(;l<r.length;r.length===q||(0,A.A)(r),++l){k=r[l]
j=o.a5(0,k.a)
if(j!=null)n.deleteTexture(m.a(j.a).a)
p.b.aP(k)}r=e.r
q=A.ar(r,A.u(r).c)
o=q.length
n=e.b.a
l=0
for(;l<q.length;q.length===o||(0,A.A)(q),++l)n.aP(q[l])
q=e.f
o=A.ar(q,A.u(q).c)
n=o.length
m=e.a
i=m.c
h=m.a.a
l=0
for(;l<o.length;o.length===n||(0,A.A)(o),++l){k=o[l]
g=i.a5(0,k.a)
if(g!=null){h.deleteVertexArray(A.p(g.c.a))
h.deleteBuffer(A.p(g.a.a))
f=g.b
if(f!=null)h.deleteBuffer(A.p(f.a))}m.b.aP(k)}s.a2(0)
r.a2(0)
q.a2(0)
p.ag()
e.x=!0},
$inb:1}
A.iE.prototype={}
A.fE.prototype={$iaE:1,
gC(){return this.a},
gm(){return this.b},
gbz(){return this.c}}
A.jj.prototype={
$1(a){var s=this.a.w.a.e_(a),r=s.b!=null,q=r?s.d:s.e
return new A.dd(s.c,r,q,s.f)},
$S:34}
A.jk.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.n(0,a))return this.b.x.gl().cj(a)
if(b!=null&&s.n(0,b))return this.b.x.gl().cj(b)
throw A.b(A.l("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:35}
A.ji.prototype={
$0(){return this.a.$1("shadowMap")},
$S:2}
A.jb.prototype={
$0(){return null},
$S:37}
A.jc.prototype={
$0(){var s,r=this.a.at
if(r==null)return B.a1
s=r.b
return A.p3(s.k1,3,r.a.d,null)},
$S:38}
A.jh.prototype={
$0(){return this.a.$1("sceneDepth")},
$S:2}
A.j6.prototype={
$0(){return this.a.at.a},
$S:39}
A.j8.prototype={
$0(){return this.a.$2$fallback("ssaoRaw","sceneColor")},
$S:2}
A.j7.prototype={
$0(){return this.a.$2$fallback("ssaoBlurred","sceneColor")},
$S:2}
A.jg.prototype={
$0(){var s=this.b.d>1?"sceneColor#1":"sceneColor"
return this.a.$1(s)},
$S:2}
A.j4.prototype={
$0(){return this.a.$2$fallback("bloomBlurH","sceneColor")},
$S:2}
A.j5.prototype={
$0(){return this.a.$2$fallback("bloomBlurV","sceneColor")},
$S:2}
A.jd.prototype={
$0(){return this.a.$2$fallback("dofBlurH","sceneColor")},
$S:2}
A.je.prototype={
$0(){return this.a.$2$fallback("dofBlurV","sceneColor")},
$S:2}
A.jf.prototype={
$0(){var s=this.a.w.c.d
s===$&&A.az()
return s},
$S:2}
A.ja.prototype={
$0(){return this.a.$2$fallback("vhsOutput","sceneColor")},
$S:2}
A.j9.prototype={
$0(){return this.a.at.w},
$S:40}
A.jl.prototype={
$0(){return this.a},
$S:41}
A.jm.prototype={
$0(){return null},
$S:42}
A.iV.prototype={}
A.ft.prototype={$in8:1}
A.fn.prototype={$imu:1}
A.eR.prototype={
gF(){var s=this.w
return s==null?A.k(A.l("renderer is not initialized")):s},
dK(a,b){var s,r,q,p,o,n,m,l=this
if(l.e!==B.a5)throw A.b(A.l("renderer can only be initialized once"))
a.B()
b.B()
s=l.a
if(s.b===B.O)throw A.b(A.l("renderer device is context lost"))
l.e=B.d4
try{r=v.G
s.au(A.a(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.au(A.a(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.au(A.a(r.WebGL2RenderingContext.MAX_SAMPLES))
s.au(A.a(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.au(A.a(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
q=s.r
if(q.n(0,"EXT_texture_filter_anisotropic"))s.bU(34047)
p=q.n(0,"EXT_disjoint_timer_query_webgl2")
s.w=p
q.n(0,"EXT_color_buffer_float")
q.n(0,"EXT_color_buffer_half_float")
q.n(0,"WEBGL_lose_context")
q=s.a
A.cx(q.getParameter(A.a(r.WebGL2RenderingContext.RENDERER)))
A.cx(q.getParameter(A.a(r.WebGL2RenderingContext.VENDOR)))
l.r=new A.i2(p)
r=l.b
o=A.hG(a)
q=r.a
if(q.a!=null)A.k(A.l("configuration state is already initialized"))
a.B()
q.a=a
A.hG(a)
q.d=1
r.b.ce(o)
r=A.mI()
l.w=new A.eO(A.mK(s),r,A.nf(s),A.an(t.cA),A.an(t.eL),A.an(t.aj))
r=new A.eP()
q=new A.hk(s,r)
o=A.hG(a)
n=q.bO(o,a)
r.ce(o)
q.c=new A.eJ(new A.hW(o),n)
l.x=q
l.y=new A.hZ(s,A.aM(t.N,t.dN))
l.as=a
A.lH(l)
l.e=B.a6}catch(m){s=l.y
if(s!=null){r=s.b
s.cX(new A.aL(r,A.u(r).h("aL<2>")))
r.a2(0)}s=l.x
if(s!=null)s.ag()
s=l.w
if(s!=null)s.ag()
l.w=null
l.e=B.a5
throw m}s=new A.U($.M,t.cd)
s.aT(null)
return s},
dm(a,b){var s,r,q,p,o=this
o.d8()
o.aH()
r=B.a.n(o.d,a)
if(!r)throw A.b(A.j("world was not created by this renderer",null))
if(o.at!=null)throw A.b(A.l("renderer.beginFrame called twice without end/abort"))
b.a.B()
b.b.B()
b.c.B()
r=b.w
if(!isFinite(r))A.k(A.j("FrameInput.timeSeconds must be finite: "+A.o(r),null))
o.at=b
o.ax=a
q=o.c
if(q.b===B.N)A.k(A.l("FrameQueue.beginFrame called twice without end/abort"))
q.b=B.N
q.c=0
B.a.a2(q.a)
s=q
try{r=o.r
if((r==null?A.k(A.l("renderer is not initialized")):r).z)o.b$=o.a.dn()
return s}catch(p){if(q.b!==B.N)A.k(A.l("FrameQueue.abortFrame called without an active frame"))
q.c=0
q.b=B.bt
o.bF()
o.ax=o.at=null
throw p}},
dC(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
d.aH()
s=d.at
r=d.ax
if(s==null||r==null)throw A.b(A.l("renderer.endFrame called without an active frame"))
m=d.c
if(m.b!==B.N)A.k(A.l("FrameQueue.endFrame called without an active frame"))
l=m.a
k=A.ii(l,0,A.bX(m.c,"count",t.S),A.G(l).c).cn(0,!1)
m.b=B.bs
q=k
try{p=A.o1(d,r,s,q)
o=p.a.cu()
m=o.gaz()
l=A.u(m)
n=new A.d_(new A.a1(m,l.h("x(m.E)").a(new A.id()),l.h("a1<m.E>")),l.h("T(m.E)").a(new A.ie()),l.h("d_<m.E,T>")).bj(0,B.bq,new A.ig(),t.o)
l=s.e
m=n.a
j=n.b
i=p.c
h=n.d
p.toString
g=d.w
f=g.a.gaD()
g=g.c.gaD()
e=d.w
e.a.gaD()
e.c.gaD()
d.w.toString
return new A.hg(l,m,j,i,h,f+g)}finally{d.d3(s.e)
d.ax=d.at=null}},
d8(){var s,r,q,p=this
if(p.e!==B.a7)return
if(p.a.b===B.O)throw A.b(A.l("renderer context remains lost"))
s=p.w
if(s.x)A.k(A.l("resource library is disposed"))
s.a.bs()
s.c.bs()
s=p.x
s.toString
r=p.as
r.toString
if(s.e)A.k(A.l("GPU resource adapter is disposed"))
q=s.c
if(q==null)A.k(A.l("GPU resource adapter is not initialized"))
s.c=new A.eJ(q.a,s.bO(A.hG(r),r))
s=p.y
s.c=null
s.b.a2(0)
A.lH(p)
p.e=B.a6},
aH(){var s=this,r=s.e
if(r!==B.a6)throw A.b(A.l("renderer is not ready: "+r.b))
if(s.a.b===B.O){s.cZ()
s.e=B.a7
throw A.b(A.l("renderer context lost"))}},
$ind:1}
A.id.prototype={
$1(a){t.ao.a(a)
return A.p7(a.a.toLowerCase(),"world",0)},
$S:43}
A.ie.prototype={
$1(a){return t.ao.a(a).b},
$S:44}
A.ig.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return new A.T(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:68}
A.fs.prototype={}
A.iQ.prototype={
d3(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.f)A.k(A.l(u.k))
r=s.c4(o)
if(r.b)A.k(A.l("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.a.j(p.a$,new A.fs(o))}catch(q){p.aZ(o)}},
bF(){var s=this.b$
this.b$=null
if(s!=null)this.aZ(s)},
cZ(){var s,r,q
this.bF()
s=this.a$
r=J.kW(s.slice(0),A.G(s).c)
B.a.a2(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.A)(r),++q)this.aZ(r[q].b)},
aZ(a){var s,r
try{s=this.a
s.a.deleteQuery(s.c4(a).a)}catch(r){}}}
A.fx.prototype={}
A.eT.prototype={
v(){return"ShadowCasterLod."+this.b}}
A.ao.prototype={
J(a,b){var s,r=this
t.fy.a(b)
s=B.d.J(r.a.a,b.a.a)
if(s!==0)return s
s=B.d.J(r.b.a,b.b.a)
if(s!==0)return s
s=B.d.J(r.c.a,b.c.a)
if(s!==0)return s
return B.d.J(r.d,b.d)},
$iag:1}
A.am.prototype={
J(a,b){var s
t.g0.a(b)
s=B.c.J(b.a,this.a)
if(s!==0)return s
return B.d.J(this.b,b.b)},
$iag:1}
A.W.prototype={}
A.jS.prototype={
$2(a,b){var s=t.k
return s.a(a).a.J(0,s.a(b).a)},
$S:46}
A.jT.prototype={
$1(a){return t.k.a(a).b},
$S:47}
A.jQ.prototype={
$2(a,b){var s=t.c
return s.a(a).a.J(0,s.a(b).a)},
$S:48}
A.jR.prototype={
$1(a){return t.c.a(a).b},
$S:49}
A.h2.prototype={}
A.h1.prototype={}
A.hX.prototype={
$6(a,b,c,d,e,f){var s=this.a,r=s.a.length/18|0,q=this.b
s.M(a,e,f,new A.S(0,0).t(0,q))
s.M(b,e,f,new A.S(1,0).t(0,q))
s.M(c,e,f,new A.S(1,1).t(0,q))
s.M(d,e,f,new A.S(0,1).t(0,q))
q=r+2
B.a.D(s.b,A.d([r,r+1,q,r,q,r+3],t.t))},
$S:50}
A.be.prototype={
M(a,b,c,d){B.a.D(this.a,A.d([a.a,a.b,a.c,b.a,b.b,b.c,c.a,c.b,c.c,1,1,1,1,0,1,d.a,d.b,0],t.n))},
af(a){var s=new A.bm(B.bk,new Float32Array(A.r(this.a)),new Uint16Array(A.r(this.b)),a)
s.B()
return s}}
A.hY.prototype={
$2(a,b){var s=this.a,r=B.d.a0(a+s,s),q=this.b,p=this.c
s=B.d.a0(b+q,q)*s+r
if(!(s>=0&&s<65536))return A.h(p,s)
return p[s]/255},
$S:51}
A.aS.prototype={
gba(){var s,r,q,p=this.a,o=p.a,n=p.b
p=p.c
s=this.b
r=s.a
q=s.b
s=s.c
return A.d([new A.f(o,n,p),new A.f(r,n,p),new A.f(o,q,p),new A.f(r,q,p),new A.f(o,n,s),new A.f(r,n,s),new A.f(o,q,s),new A.f(r,q,s)],t.gi)},
i(a){return"Aabb("+this.a.i(0)+", "+this.b.i(0)+")"}}
A.iF.prototype={}
A.bI.prototype={}
A.cO.prototype={
v(){return"FrustumTest."+this.b}}
A.hh.prototype={
ef(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
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
if(h*f+e*c+i*a+a0<0)return B.at
g=g?o:r
f=d?m:p
d=b?n:q
if(h*g+e*f+i*d+a0<0)l=!0}return l?B.bu:B.bv}}
A.hi.prototype={
$4(a,b,c,d){var s=new A.f(a,b,c),r=new A.bI(s,d),q=Math.sqrt(s.ga3())
return q<1e-9?r:new A.bI(s.t(0,1/q),d/q)},
$S:52}
A.b7.prototype={
t(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=new Float32Array(16)
for(s=this.a,r=s.length,q=b.a,p=q.length,o=0;o<4;++o)for(n=o*4,m=0;m<4;++m){for(l=0,k=0;k<4;++k){j=k*4+m
if(!(j<r))return A.h(s,j)
j=s[j]
i=n+k
if(!(i<p))return A.h(q,i)
l+=j*q[i]}j=n+m
if(!(j<16))return A.h(h,j)
h[j]=l}return new A.b7(h)},
aQ(a){var s,r,q,p,o,n,m,l,k,j,i,h
t.fP.a(a)
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
return h===0||h===1?new A.f(k,j,i):new A.f(k/h,j/h,i/h)},
bq(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this.a,d=e.length
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
if(!isFinite(k)||Math.abs(k)<1e-12)A.k(A.l("Mat4.inverse3x3: singular upper-left 3x3 (det="+A.o(k)+")"))
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
return new A.b7(h)},
bo(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=J.k_(4,t.gN)
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
a1[p]=new Float64Array(A.r(A.d([o,n,m,l,k,j,i,p===3?1:0],s)))}for(h=0;h<4;h=p){s=a1[h]
if(!(h<s.length))return A.h(s,h)
g=Math.abs(s[h])
for(p=h+1,f=p,e=h;f<4;++f){r=a1[f]
if(!(h<r.length))return A.h(r,h)
d=Math.abs(r[h])
if(d>g){g=d
e=f}}if(!isFinite(g)||g<1e-12)throw A.b(A.l("Mat4.inverse: singular matrix"))
if(e!==h){if(!(e>=0&&e<4))return A.h(a1,e)
a1[h]=a1[e]
a1[e]=s}s=a1[h]
if(!(h<s.length))return A.h(s,h)
c=s[h]
for(b=0;b<8;++b){if(!(b<s.length))return A.h(s,b)
r=s[b]
s.$flags&2&&A.bx(s)
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
s.$flags&2&&A.bx(s)
s[b]=r-a*q}}}a0=new Float32Array(16)
for(p=0;p<4;++p)for(h=0;h<4;++h){s=h*4+p
r=a1[p]
q=4+h
if(!(q<r.length))return A.h(r,q)
q=r[q]
if(!(s<16))return A.h(a0,s)
a0[s]=q}return new A.b7(a0)},
gL(a){return B.a3.aN(this.a,new A.hv())},
i(a){return"Mat4("+A.o(this.a)+")"}}
A.hv.prototype={
$1(a){return isFinite(A.fM(a))},
$S:12}
A.bJ.prototype={
t(a,b){var s=this,r=s.d,q=b.a,p=s.a,o=b.d,n=s.b,m=b.c,l=s.c,k=b.b
return new A.bJ(r*q+p*o+n*m-l*k,r*k-p*m+n*o+l*q,r*m+p*k-n*q+l*o,r*o-p*q-n*k-l*m)},
i(a){var s=this
return"Quat("+A.o(s.a)+", "+A.o(s.b)+", "+A.o(s.c)+", "+A.o(s.d)+")"}}
A.i0.prototype={
dQ(a){var s,r,q,p,o,n,m,l,k=null,j=this.b,i=j.a
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
A.i1.prototype={
i(a){return'RaycastHit(node: "'+this.a.a+'", distance: '+B.c.ac(this.d,2)+", point: "+this.b.i(0)+")"}}
A.aw.prototype={
ab(){var s,r,q,p,o,n,m,l,k,j,i,h=this.b,g=h.a,f=g*g,e=h.b,d=e*e,c=h.c,b=c*c,a=g*e,a0=g*c,a1=e*c
h=h.d
s=h*g
r=h*e
q=h*c
c=t.n
h=A.l1(A.d([1-2*(d+b),2*(a+q),2*(a0-r),0,2*(a-q),1-2*(f+b),2*(a1+s),0,2*(a0+r),2*(a1-s),1-2*(f+d),0,0,0,0,1],c)).a
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
return A.l1(A.d([g*p,o*p,n*p,0,m*p,l*p,k*p,0,j*p,i*p,h[10]*p,0,e.a,e.b,e.c,1],c))},
i(a){return"Transform("+this.a.i(0)+", "+this.b.i(0)+", scale="+A.o(this.c)+")"}}
A.S.prototype={
t(a,b){return new A.S(this.a*b,this.b*b)},
gp(a){var s=this.a,r=this.b
return Math.sqrt(s*s+r*r)},
a_(a,b){if(b==null)return!1
return b instanceof A.S&&this.a===b.a&&this.b===b.b},
gK(a){return A.bH(this.a,this.b,B.j,B.j,B.j,B.j)},
i(a){return"Vec2("+A.o(this.a)+", "+A.o(this.b)+")"}}
A.f.prototype={
H(a,b){return new A.f(this.a+b.a,this.b+b.b,this.c+b.c)},
a7(a,b){return new A.f(this.a-b.a,this.b-b.b,this.c-b.c)},
t(a,b){return new A.f(this.a*b,this.b*b,this.c*b)},
bd(a){return this.a*a.a+this.b*a.b+this.c*a.c},
a6(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.f(s*r-q*p,q*o-n*r,n*p-s*o)},
ga3(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gp(a){return Math.sqrt(this.ga3())},
gL(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gE(){var s=this,r=Math.sqrt(s.ga3())
return r<1e-9?B.y:new A.f(s.a/r,s.b/r,s.c/r)},
a_(a,b){if(b==null)return!1
return b instanceof A.f&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gK(a){return A.bH(this.a,this.b,this.c,B.j,B.j,B.j)},
i(a){return"Vec3("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.fe.prototype={
v(){return"_BloomBlurAxis."+this.b}}
A.cC.prototype={
gC(){return this.f},
U(a,b){B.a.j(a.a,new A.E(this.f,B.r,A.d([new A.n(this.x,B.e),new A.n(this.y,B.h)],t.C),!1))},
T(a){var s=this,r=s.a.V(new A.a4(s.e,s.b,s.c,B.o,B.aI,B.aF)),q=A.aF(s.d),p=t.n,o=s.r===B.b6?new Float32Array(A.r(A.d([1/s.Q,0],p))):new Float32Array(A.r(A.d([0,1/s.as],p)))
p=s.y
return A.d([new A.ff(new A.Z(s.f,A.d([new A.n(s.x,B.e),new A.n(p,B.h)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iB:1}
A.ff.prototype={
P(a){var s,r,q,p,o=this
if(a.d.f.b<=0)return
s=a.b
r=s.a
A.ad(r,a.R(o.r).b)
A.a0(r,o.a.N())
A.aO(r,B.v,1,0,0,0)
A.ak(r,o.b.b)
q=t.j
p=o.d
if(o.e)A.np(r,0,q.a(p.$0()))
else A.I(r,0,q.a(p.$0()))
A.c(r,"uSource",B.n)
A.c(r,"uTexelStep",new A.e(B.E,o.f))
A.a5(r,o.c)
s.W(3,0)},
$iz:1,
gm(){return this.a}}
A.dY.prototype={
gC(){return"bloomComposite"},
U(a,b){B.a.j(a.a,new A.E("bloomComposite",B.r,A.d([new A.n(this.f,B.e),new A.n(this.r,B.e),new A.n(this.w,B.h)],t.C),!1))},
T(a){var s=this,r="bloomComposite",q=s.a.V(new A.a4(r,s.b,s.c,B.o,B.cA,B.co)),p=A.aF(s.d),o=s.w,n=A.d([new A.n(s.f,B.e),new A.n(s.r,B.e),new A.n(o,B.h)],t.C)
return A.d([new A.fg(new A.Z(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iB:1}
A.fg.prototype={
P(a){var s,r,q=this,p=a.d.f.b
if(p<=0)return
s=a.b
r=s.a
A.ad(r,a.ap(q.f).b)
A.lk(r,1)
A.a0(r,B.as)
A.ak(r,q.b.b)
A.I(r,0,t.j.a(q.d.$0()))
A.c(r,"uBloom",B.n)
A.c(r,"uBloomStrength",new A.e(B.b,p))
A.a5(r,q.c)
s.W(3,0)},
$iz:1,
gm(){return this.a}}
A.e4.prototype={
gC(){return"depthPrepass"},
U(a,b){B.a.j(a.a,new A.E("depthPrepass",B.bE,A.d([new A.n(this.w,B.h)],t.C),!1))},
T(a){var s=this,r="depthPrepass",q=s.a.V(new A.a4(r,s.b,s.c,B.aH,B.aG,B.cf))
return A.d([new A.fi(new A.Z(r,A.d([new A.n(s.w,B.h)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iB:1}
A.fi.prototype={
P(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=u.k,b=a2.b,a=a2.d,a0=a.f,a1=b.a
A.ad(a1,a2.R("sceneDepth").b)
A.a0(a1,d.a.N())
A.aO(a1,B.V,1,0,0,0)
A.ak(a1,d.b.b)
A.c(a1,"uVertexSnapGrid",new A.e(B.b,a0.ax))
A.c(a1,"uAlbedo",B.n)
for(s=a.a,r=s.length,a=a.c.c.a,q=d.c,p=a0.at,o=v.G,n=b.b,m=a1.a,l=0;l<s.length;s.length===r||(0,A.A)(s),++l){k=s[l]
j=k.a
i=j.gm()
A.c(a1,"uViewProjection",new A.e(B.l,new Float32Array(A.r(a))))
A.c(a1,"uModel",new A.e(B.l,new Float32Array(A.r(i.c.ab().a))))
A.jP(b,k,!1)
d.cY(b,j.gm().b,p)
h=q.$1(j.gm().a)
i=h.a
if(a1.b!==B.f)A.k(A.l(c))
m.bindVertexArray(A.p(i.a))
i=h.b
g=h.c
f=k.b.length
if(i){i=h.d
if(a1.b!==B.f)A.k(A.l(c))
e=A.a(o.WebGL2RenderingContext.TRIANGLES)
m.drawElementsInstanced.apply(m,[e,g,i?A.a(o.WebGL2RenderingContext.UNSIGNED_INT):A.a(o.WebGL2RenderingContext.UNSIGNED_SHORT),0,f])
n.aj(g,f)}else{if(a1.b!==B.f)A.k(A.l(c))
m.drawArraysInstanced(A.a(o.WebGL2RenderingContext.TRIANGLES),0,g,f)
n.aj(g,f)}}},
cY(a,b,c){var s,r=a.a
A.I(r,0,t.j.a(this.e.$1(this.d.$1(b).b)))
A.c(r,"uAlphaCutoff",new A.e(B.b,0))
A.c(r,"uAffineWarpStrength",new A.e(B.b,0))
s=this.a.N()
A.a0(r,s)},
$iz:1,
gm(){return this.a}}
A.fj.prototype={
v(){return"_DofBlurAxis."+this.b}}
A.cL.prototype={
gC(){return this.f},
U(a,b){B.a.j(a.a,new A.E(this.f,B.r,A.d([new A.n(this.w,B.e),new A.n(this.x,B.h)],t.C),!1))},
T(a){var s=this,r=s.a.V(new A.a4(s.e,s.b,s.c,B.o,B.aI,B.aF)),q=A.aF(s.d),p=t.n,o=s.r===B.b7?new Float32Array(A.r(A.d([1/s.z,0],p))):new Float32Array(A.r(A.d([0,1/s.Q],p)))
p=s.x
return A.d([new A.fk(new A.Z(s.f,A.d([new A.n(s.w,B.e),new A.n(p,B.h)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iB:1}
A.fk.prototype={
P(a){var s,r,q=this
if(a.d.f.d<=0)return
s=a.b
r=s.a
A.ad(r,a.R(q.f).b)
A.a0(r,q.a.N())
A.aO(r,B.v,1,0,0,0)
A.ak(r,q.b.b)
A.I(r,0,t.j.a(q.d.$0()))
A.c(r,"uSource",B.n)
A.c(r,"uTexelStep",new A.e(B.E,q.e))
A.a5(r,q.c)
s.W(3,0)},
$iz:1,
gm(){return this.a}}
A.e7.prototype={
gC(){return"dofComposite"},
U(a,b){var s=this
B.a.j(a.a,new A.E("dofComposite",B.r,A.d([new A.n(s.z,B.e),new A.n(s.Q,B.e),new A.n(s.as,B.e),new A.n(s.at,B.h)],t.C),!1))},
T(a){var s=this,r="dofComposite",q=s.a.V(new A.a4(r,s.b,s.c,B.o,B.cy,B.ce)),p=A.aF(s.d)
return A.d([new A.fl(new A.Z(r,A.d([new A.n(s.z,B.e),new A.n(s.Q,B.e),new A.n(s.as,B.e),new A.n(s.at,B.h)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iB:1}
A.fl.prototype={
P(a){var s,r=this,q=a.R("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.ad(n,q.b)
A.a0(n,r.a.N())
A.ak(n,r.b.b)
s=t.j
A.I(n,0,s.a(r.d.$0()))
A.c(n,"uSharp",B.n)
A.I(n,1,s.a(r.e.$0()))
A.c(n,"uBlurred",B.F)
A.I(n,2,s.a(r.f.$0()))
A.c(n,"uSceneDepth",B.b_)
A.c(n,"uNear",new A.e(B.b,o.f))
A.c(n,"uFar",new A.e(B.b,o.r))
A.c(n,"uFocusDistance",new A.e(B.b,r.w))
A.c(n,"uFocusRange",new A.e(B.b,r.x))
A.c(n,"uStrength",new A.e(B.b,a.d.f.d))
A.a5(n,r.c)
p.W(3,0)},
$iz:1,
gm(){return this.a}}
A.ei.prototype={
gC(){return"grade"},
U(a,b){B.a.j(a.a,new A.E("grade",B.r,A.d([new A.n(this.r,B.e),new A.n(this.w,B.h)],t.C),!1))},
T(a){var s=this,r=s.a.V(new A.a4("grade",s.b,s.c,B.o,B.cw,B.cp)),q=A.aF(s.d),p=s.r,o=s.w
return A.d([new A.fp(new A.Z("grade",A.d([new A.n(p,B.e),new A.n(o,B.h)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iB:1}
A.fp.prototype={
P(a){var s=this,r=a.R(s.f.a),q=a.b,p=q.a
A.ad(p,a.R(s.r.a).b)
A.a0(p,s.a.N())
A.ak(p,s.b.b)
A.I(p,0,r.b)
A.c(p,"uScene",B.n)
A.I(p,1,t.j.a(s.d.$0()))
A.c(p,"uLut",B.F)
A.c(p,"uLutSize",new A.e(B.b,s.e))
A.c(p,"uStrength",new A.e(B.b,a.d.f.as))
A.a5(p,s.c)
q.W(3,0)},
$iz:1,
gm(){return this.a}}
A.d1.prototype={
gC(){return"msaaResolve"},
U(a,b){B.a.j(a.a,new A.E("msaaResolve",B.bF,A.d([new A.n(this.b,B.e),new A.n(this.c,B.h)],t.C),!0))},
T(a){var s=this.b,r=this.c
return A.d([new A.fr(new A.Z("msaaResolve",A.d([new A.n(s,B.e),new A.n(r,B.h)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iB:1}
A.fr.prototype={
P(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.ap(this.c),j=a.ap(this.d),i=this.b
if(i.b!==B.f)A.k(A.l(u.k))
s=t.V
r=s.a(k.b.a)
q=s.a(j.b.a)
s=r.y
if(s<=1)A.k(A.j("WebGl2Device.resolveTarget: source must be multisampled (samples > 1), got "+s,null))
s=q.y
if(s>1)A.k(A.j("WebGl2Device.resolveTarget: destination must be single-sample, got samples="+s,null))
s=r.w
p=q.w
if(s!==p||r.x!==q.x)A.k(A.j("WebGl2Device.resolveTarget: source ("+s+"x"+r.x+") and destination ("+p+"x"+q.x+") must match",null))
o=r.r!=null||r.f!=null
n=q.r!=null||q.f!=null
i=i.a
m=v.G
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.READ_FRAMEBUFFER),r.a)
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),q.a)
if(r.c!=null||r.b!=null){if(o){i.readBuffer(A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0))
i.drawBuffers(A.d([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.NONE)],t.n))}A.a8(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(o&&n){i.readBuffer(A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1))
i.drawBuffers(A.d([A.a(m.WebGL2RenderingContext.NONE),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
A.a8(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(r.d!=null||r.e!=null)A.a8(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.DEPTH_BUFFER_BIT),A.a(m.WebGL2RenderingContext.NEAREST)],t.H)
if(n)i.drawBuffers(A.d([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.READ_FRAMEBUFFER),null)
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),null)},
$iz:1,
gm(){return this.a}}
A.c5.prototype={}
A.e_.prototype={
R(a){var s=this.a.q(0,a)
if(s==null)throw A.b(A.l('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
ap(a){var s=a.a,r=this.a.q(0,s+"#"+a.f)
if(r!=null)return r
return this.R(s)},
$in7:1}
A.k6.prototype={}
A.d9.prototype={
gC(){return"present"},
U(a,b){B.a.j(a.a,new A.E("present",B.bG,A.d([new A.n(this.f,B.e)],t.C),!1))},
T(a){var s=this,r=s.a.V(new A.a4("present",s.b,s.c,B.o,B.cz,B.cl)),q=A.aF(s.d),p=s.f
return A.d([new A.fu(new A.Z("present",A.d([new A.n(p,B.e)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iB:1}
A.fu.prototype={
P(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=null,a0=a3.ap(b.d),a1=a3.b,a2=a1.a
A.ad(a2,a)
A.a0(a2,b.a.N())
A.ak(a2,b.b.b)
A.a5(a2,b.c)
A.I(a2,0,a0.b)
s=a3.c
r=s!=null
if(r)A.I(a2,1,s)
q=a3.d
p=q.f
o=q.d
n=q.c
A.c(a2,"uExposure",new A.e(B.b,p.a))
A.c(a2,"uVignette",new A.e(B.b,p.e))
A.c(a2,"uGrain",new A.e(B.b,p.f))
A.c(a2,"uOutputEncoding",new A.e(B.b,b.e===B.W?1:0))
A.c(a2,"uToneMap",new A.e(B.b,A.mL(p.fr)))
m=o.a
q=o.k4==null
l=q?a:B.aC
if(l==null)l=o.fx
k=q?a:0.03
if(k==null)k=m.a*0.72+l.a*0.28
j=q?a:0.06
if(j==null)j=m.b*0.72+l.b*0.28
i=q?a:0.14
if(i==null)i=m.c*0.72+l.c*0.28
h=q?a:0.015
if(h==null)h=m.a*0.9
g=q?a:0.02
if(g==null)g=m.b*0.9
f=q?a:0.03
if(f==null)f=m.c*0.9
e=t.n
A.c(a2,"uClearColor",new A.e(B.i,new Float32Array(A.r(A.d([m.a,m.b,m.c],e)))))
A.c(a2,"uSkyHorizon",new A.e(B.i,new Float32Array(A.r(A.d([l.a,l.b,l.c],e)))))
A.c(a2,"uSkyZenith",new A.e(B.i,new Float32Array(A.r(A.d([k,j,i],e)))))
A.c(a2,"uSkyGround",new A.e(B.i,new Float32Array(A.r(A.d([h,g,f],e)))))
A.c(a2,"uSkyEnabled",new A.e(B.b,q?0:1))
k=q?a:0.12
A.c(a2,"uSkyHorizonGlow",new A.e(B.b,k==null?0:k))
k=q?a:0.005
A.c(a2,"uSkyStarDensity",new A.e(B.b,k==null?0:k))
A.c(a2,"uSkyTexture",B.F)
A.c(a2,"uSkyTextureEnabled",new A.e(B.b,!q&&r?1:0))
r=q?a:0
A.c(a2,"uSkyRotation",new A.e(B.b,r==null?0:r))
r=q?a:1
A.c(a2,"uSkyExposure",new A.e(B.b,r==null?1:r))
A.c(a2,"uSkyTextureSrgb",new A.e(B.b,(!q||a)===!0?1:0))
A.c(a2,"uInverseProjection",new A.e(B.l,new Float32Array(A.r(n.gcf().a))))
d=n.y
if(d===$){c=n.a.bo()
n.y!==$&&A.kC()
n.y=c
d=c}A.c(a2,"uInverseView",new A.e(B.l,new Float32Array(A.r(d.a))))
r=n.d
A.c(a2,"uCameraPosition",new A.e(B.i,new Float32Array(A.r(A.d([r.a,r.b,r.c],e)))))
r=q?a:0.32
A.c(a2,"uCloudCoverage",new A.e(B.b,r==null?0:r))
r=q?a:0.4
A.c(a2,"uCloudDensity",new A.e(B.b,r==null?0:r))
r=q?a:650
A.c(a2,"uCloudBaseHeight",new A.e(B.b,r==null?650:r))
r=q?a:350
A.c(a2,"uCloudThickness",new A.e(B.b,r==null?350:r))
r=q?a:0.0012
A.c(a2,"uCloudScale",new A.e(B.b,r==null?0:r))
r=q?a:0
if(r==null)r=0
k=q?a:0
A.c(a2,"uCloudWind",new A.e(B.E,new Float32Array(A.r(A.d([r,k==null?0:k],e)))))
r=q?a:0
A.c(a2,"uCloudPhase",new A.e(B.b,r==null?0:r))
r=q?a:0.55
A.c(a2,"uCloudDetail",new A.e(B.b,r==null?0:r))
r=q?a:0.25
A.c(a2,"uCloudSilverLining",new A.e(B.b,r==null?0:r))
r=q?a:12
A.c(a2,"uCloudSampleCount",new A.e(B.b,r==null?4:r))
r=o.go==null
q=r?a:0.6
if(q==null)q=0
k=r?a:-1
if(k==null)k=1
j=r?a:0.4
A.c(a2,"uCloudLightDirection",new A.e(B.i,new Float32Array(A.r(A.d([q,k,j==null?0:j],e)))))
q=r?a:1
if(q==null)q=1
k=r?a:0.95
if(k==null)k=1
j=r?a:0.88
A.c(a2,"uCloudLightColor",new A.e(B.i,new Float32Array(A.r(A.d([q,k,j==null?1:j],e)))))
r=r?a:2.4
A.c(a2,"uCloudLightIntensity",new A.e(B.b,r==null?0:r))
a1.W(3,0)},
$iz:1,
gm(){return this.a}}
A.eM.prototype={
gC(){return"ps1Quantize"},
U(a,b){B.a.j(a.a,new A.E("ps1Quantize",B.r,A.d([new A.n(this.e,B.e),new A.n(this.f,B.h)],t.C),!1))},
T(a){var s=this,r="ps1Quantize",q=s.a.V(new A.a4(r,s.b,s.c,B.o,B.cB,B.cb)),p=A.aF(s.d),o=s.e,n=s.f
return A.d([new A.fv(new A.Z(r,A.d([new A.n(o,B.e),new A.n(n,B.h)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iB:1}
A.fv.prototype={
P(a){var s=this,r=a.R(s.d.a),q=a.b,p=a.d.f,o=q.a
A.ad(o,a.R(s.e.a).b)
A.a0(o,s.a.N())
A.ak(o,s.b.b)
A.I(o,0,r.b)
A.c(o,"uScene",B.n)
A.c(o,"uQuantizationBits",new A.e(B.b,p.ay))
A.c(o,"uDitherStrength",new A.e(B.b,p.Q))
A.a5(o,s.c)
q.W(3,0)},
$iz:1,
gm(){return this.a}}
A.bL.prototype={}
A.eU.prototype={
gC(){return"shadow"},
U(a,b){B.a.j(a.a,new A.E("shadowCaster",B.bD,A.d([new A.n(this.z,B.h)],t.C),!1))},
T(a){var s=this,r="shadowCaster",q=s.a.V(new A.a4(r,s.b,s.c,B.aH,B.aG,B.cn))
return A.d([new A.fy(new A.Z(r,A.d([new A.n(s.z,B.h)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iB:1}
A.fy.prototype={
P(a){var s,r,q,p,o=this,n=a.R("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.ad(s,n.b)
A.a0(s,o.a.N())
A.aO(s,B.V,1,0,0,0)
return}r=A.ld(l)
o.x.$1(r)
s=m.a
A.ad(s,n.b)
A.a0(s,o.a.N())
A.aO(s,B.V,1,0,0,0)
A.ak(s,o.b.b)
A.c(s,"uAlbedo",B.n)
for(s=a.d.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.A)(s),++p)o.d_(m,s[p],l,r)},
c_(a,b){var s,r=a.a
A.I(r,0,t.j.a(this.e.$1(this.d.$1(b).b)))
A.c(r,"uAlphaCutoff",new A.e(B.b,0))
s=this.a.N()
A.a0(r,s)},
d_(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){b.gm()
s=a.a
A.c(s,"uUseInstances",B.al)
n.bX(a,b.gm().c,d)
n.c_(a,b.gm().b)
r=b.gm()
q=n.c.$1(r.a)
A.a5(s,q.a)
s=q.b
r=q.c
if(s)a.bf(r,q.d,0)
else a.W(r,0)}else if(b instanceof A.bD){p=b.a
p.gm()
if(n.di(b,c)===B.ds)return
n.bX(a,p.gm().c,d)
A.jP(a,b,!1)
n.c_(a,p.gm().b)
s=p.gm()
q=n.c.$1(s.a)
A.a5(a.a,q.a)
s=q.b
r=q.c
o=b.b.length
if(s)a.bg(r,q.d,o,0)
else a.be(r,0,o)}else throw A.b(A.j("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dV(b).i(0),null))},
di(a,b){return B.dr},
bX(a,b,c){var s=a.a
A.c(s,"uModel",new A.e(B.l,new Float32Array(A.r(b.ab().a))))
A.c(s,"uLightViewProjection",new A.e(B.l,new Float32Array(A.r(c.a.a))))},
$iz:1,
gm(){return this.a}}
A.jq.prototype={
$1(a){return this.a.a=a},
$S:54}
A.jr.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:55}
A.eV.prototype={
gC(){return"shadowedWorld"},
U(a,b){var s=this,r=A.d([new A.n(s.db,B.e)],t.C)
if(s.ay)r.push(new A.n(s.dx,B.e))
r.push(new A.n(s.dy,B.h))
B.a.j(a.a,new A.E("shadowedWorld",B.ax,r,!1))},
T(a){var s=this,r="shadowedWorld",q=s.a.V(new A.a4(r,s.b,s.c,B.cC,B.cx,B.ca)),p=A.d([new A.n(s.db,B.e)],t.C)
if(s.ay)p.push(new A.n(s.dx,B.e))
p.push(new A.n(s.dy,B.h))
return A.d([new A.fz(new A.Z(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iB:1}
A.fz.prototype={
P(b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3=null,a4=b2.R("sceneColor"),a5=b2.b,a6=b2.d,a7=a6.c,a8=a6.d,a9=a6.f,b0=a2.z.$0(),b1=a5.a
A.ad(b1,a4.b)
A.a0(b1,a2.a.N())
s=a8.a
A.aO(b1,B.ar,1,s.c,s.b,s.a)
A.ak(b1,a2.b.b)
A.c(b1,"uAlbedo",B.n)
A.c(b1,"uNormalMap",B.dJ)
A.c(b1,"uOrmMap",B.dK)
A.c(b1,"uEmissiveMap",B.dL)
A.c(b1,"uLightmap",B.dM)
s=t.j
A.I(b1,1,s.a(a2.y.$0()))
A.c(b1,"uShadowMap",B.F)
r=a7.d
q=t.n
A.c(b1,"uCameraPosition",new A.e(B.i,new Float32Array(A.r(A.d([r.a,r.b,r.c],q)))))
A.c(b1,"uShadowMapTexelSize",new A.e(B.E,new Float32Array(A.r(A.d([1/a2.ch,1/a2.CW],q)))))
A.c(b1,"uShadowFilterRadius",new A.e(B.b,a8.at))
A.c(b1,"uShadowBias",new A.e(B.b,a8.db))
A.I(b1,2,s.a(a2.at.$0()))
A.c(b1,"uSsao",B.b_)
A.c(b1,"uVertexSnapGrid",new A.e(B.b,a9.ax))
A.c(b1,"uSceneColorSize",new A.e(B.E,new Float32Array(A.r(A.d([a2.ax,a2.ay],q)))))
A.c(b1,"uViewProjection",new A.e(B.l,new Float32Array(A.r(a7.c.a))))
A.c(b1,"uView",new A.e(B.l,new Float32Array(A.r(a7.a.a))))
A.c(b1,"uLightViewProjection",new A.e(B.l,new Float32Array(A.r(b0.a.a))))
s=a8.b
A.c(b1,"uFogColor",new A.e(B.i,new Float32Array(A.r(A.d([s.a,s.b,s.c],q)))))
A.c(b1,"uFogStart",new A.e(B.b,a8.c))
A.c(b1,"uFogEnd",new A.e(B.b,a8.d))
A.c(b1,"uFogHeightFalloff",new A.e(B.b,0))
A.c(b1,"uFogDensity",new A.e(B.b,0))
p=a2.Q.$0()
s=A.d([],t.w)
r=a2.as.$0()
r=J.a3(r==null?B.a1:r)
o=p==null
while(r.k()){n=r.gl()
if(-1!==(o?a3:-1))s.push(n)}m=o?a3:B.k
if(m==null)m=B.k
l=o?a3:B.p
if(l==null)l=B.p
A.c(b1,"uLightPosition",new A.e(B.i,new Float32Array(A.r(A.d([m.a,m.b,m.c],q)))))
A.c(b1,"uLightDirection",new A.e(B.i,new Float32Array(A.r(A.d([l.a,l.b,l.c],q)))))
k=o?a3:B.Q
if(k==null)k=B.w
A.c(b1,"uLightColor",new A.e(B.i,new Float32Array(A.r(A.d([k.a,k.b,k.c],q)))))
r=o?a3:1
A.c(b1,"uLightIntensity",new A.e(B.b,r==null?0:r))
A.c(b1,"uSpotEnabled",new A.e(B.b,!o?1:0))
r=a8.go==null
j=r?a3:B.G
if(j==null)j=B.k
i=r?a3:B.aB
if(i==null)i=B.w
A.c(b1,"uDirectionalDirection",new A.e(B.i,new Float32Array(A.r(A.d([j.a,j.b,j.c],q)))))
A.c(b1,"uDirectionalColor",new A.e(B.i,new Float32Array(A.r(A.d([i.a,i.b,i.c],q)))))
r=r?a3:2.4
A.c(b1,"uDirectionalIntensity",new A.e(B.b,r==null?0:r))
for(r=a8.id,h=0;h<4;++h){n=r.length
if(h<n){if(!(h<n))return A.h(r,h)
g=r[h]}else g=a3
n=g==null
f=n?a3:g.b
if(f==null)f=B.y
e=n?a3:g.c
if(e==null)e=B.w
d=""+h
A.c(b1,"uPointPosition"+d,new A.e(B.i,new Float32Array(A.r(A.d([f.a,f.b,f.c],q)))))
A.c(b1,"uPointColor"+d,new A.e(B.i,new Float32Array(A.r(A.d([e.a,e.b,e.c],q)))))
c=n?a3:g.d
if(c==null)c=0
A.c(b1,"uPointIntensity"+d,new A.e(B.b,c))
n=n?a3:g.e
if(n==null)n=1
A.c(b1,"uPointRadius"+d,new A.e(B.b,n))}for(h=0;h<3;++h){r=s.length
if(h<r){if(!(h<r))return A.h(s,h)
g=s[h]}else g=a3
r=g==null
f=r?a3:B.k
if(f==null)f=B.y
b=r?a3:B.p
if(b==null)b=B.p
e=r?a3:B.Q
if(e==null)e=B.w
n=""+h
A.c(b1,"uDirectSpotPosition"+n,new A.e(B.i,new Float32Array(A.r(A.d([f.a,f.b,f.c],q)))))
A.c(b1,"uDirectSpotDirection"+n,new A.e(B.i,new Float32Array(A.r(A.d([b.a,b.b,b.c],q)))))
A.c(b1,"uDirectSpotColor"+n,new A.e(B.i,new Float32Array(A.r(A.d([e.a,e.b,e.c],q)))))
d=r?a3:1
if(d==null)d=0
A.c(b1,"uDirectSpotIntensity"+n,new A.e(B.b,d))
d=r?a3:1
if(d==null)d=1
A.c(b1,"uDirectSpotRange"+n,new A.e(B.b,d))
d=r?a3:0.3
if(d==null)d=0.3
A.c(b1,"uDirectSpotInnerCos"+n,new A.e(B.b,Math.cos(d)))
d=r?a3:0.5
if(d==null)d=0.5
A.c(b1,"uDirectSpotOuterCos"+n,new A.e(B.b,Math.cos(d)))
r=r?0:1
A.c(b1,"uDirectSpotEnabled"+n,new A.e(B.b,r))}s=o?a3:1
A.c(b1,"uLightRange",new A.e(B.b,s==null?1:s))
s=o?a3:0.3
if(s==null)s=0.3
A.c(b1,"uLightInnerCos",new A.e(B.b,Math.cos(s)))
s=o?a3:0.5
if(s==null)s=0.5
A.c(b1,"uLightOuterCos",new A.e(B.b,Math.cos(s)))
a=a8.fx
A.c(b1,"uAmbientColor",new A.e(B.i,new Float32Array(A.r(A.d([a.a,a.b,a.c],q)))))
A.c(b1,"uAmbientIntensity",new A.e(B.b,a8.fy))
A.c(b1,"uAmbientLightScale",new A.e(B.b,a8.ax))
A.c(b1,"uDirectLightScale",new A.e(B.b,a8.ay))
s=a8.dx
A.c(b1,"uReflectionColor",new A.e(B.i,new Float32Array(A.r(A.d([s.a,s.b,s.c],q)))))
A.c(b1,"uReflectionIntensity",new A.e(B.b,a8.dy))
A.c(b1,"uReflectionConfidence",new A.e(B.b,a8.fr))
A.c(b1,"uRainWetness",new A.e(B.b,a9.w))
A.c(b1,"uSurfaceSnowCoverage",new A.e(B.b,a9.x))
A.c(b1,"uSurfaceDissolution",new A.e(B.b,a9.y))
s=a8.k3
a0=A.ii(s,0,A.bX(4,"count",t.S),A.G(s).c).eg(0)
A.c(b1,"uThermalSourceCount",new A.e(B.b,a0.length))
for(h=0;h<4;++h){s=a0.length
if(h<s)if(!(h<s))return A.h(a0,h)
s=""+h
A.c(b1,"uThermalSourcePosition"+s,new A.e(B.i,new Float32Array(A.r(A.d([0,0,0],q)))))
A.c(b1,"uThermalSourceRadius"+s,new A.e(B.b,1))
A.c(b1,"uThermalSourceDissolution"+s,new A.e(B.b,0))}for(b1=a6.a,s=b1.length,r=a9.at,a1=0;a1<b1.length;b1.length===s||(0,A.A)(b1),++a1)a2.c0(a5,b1[a1],r,a8)
for(a6=a6.b,b1=a6.length,a1=0;a1<a6.length;a6.length===b1||(0,A.A)(a6),++a1)a2.c0(a5,a6[a1],r,a8)},
c0(a,b,c,d){var s,r,q,p,o,n,m=this
if(t.Y.b(b)){s=a.a
A.c(s,"uUseInstances",B.al)
m.c1(a,b.gm().c)
r=b.gm()
q=b.gm()
p=b.gm()
b.gm()
m.bY(a,r.b,q.e,p.f,c,!0,d)
o=m.c.$1(b.gm().a)
A.a5(s,o.a)
s=o.b
r=o.c
if(s)a.bf(r,o.d,0)
else a.W(r,0)}else if(b instanceof A.bD){n=b.a
m.c1(a,n.gm().c)
A.jP(a,b,!0)
s=n.gm()
r=n.gm()
q=n.gm()
n.gm()
m.bY(a,s.b,r.e,q.f,c,!0,d)
o=m.c.$1(n.gm().a)
A.a5(a.a,o.a)
s=o.b
r=o.c
q=b.b.length
if(s)a.bg(r,o.d,q,0)
else a.be(r,0,q)}else throw A.b(A.j("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dV(b).i(0),null))},
bY(a,b,c,d,e,f,g){var s=this,r=s.d.$1(b),q=t.j,p=a.a
A.I(p,0,q.a(s.e.$1(r.b)))
A.I(p,3,q.a(s.f.$1(r.x)))
A.I(p,4,q.a(s.r.$1(r.Q)))
A.I(p,5,q.a(s.w.$1(null)))
A.I(p,6,q.a(s.x.$1(null)))
A.c(p,"uAlphaCutoff",new A.e(B.b,0))
A.c(p,"uOpaqueCoverage",new A.e(B.b,c===B.X?0:1))
A.c(p,"uAffineWarpStrength",new A.e(B.b,0))
q=t.n
A.c(p,"uMaterialTint",new A.e(B.i,new Float32Array(A.r(A.d([r.d,r.e,r.f],q)))))
A.c(p,"uEmissiveStrength",new A.e(B.b,0))
A.c(p,"uUvScaleOffset",new A.e(B.dI,new Float32Array(A.r(A.d([r.db,r.dx,0,0],q)))))
A.c(p,"uNormalStrength",new A.e(B.b,r.z*g.ch))
A.c(p,"uRoughness",new A.e(B.b,r.at*g.CW))
A.c(p,"uMetallic",new A.e(B.b,r.ax*g.cx))
A.c(p,"uSpecularScale",new A.e(B.b,g.cy))
A.c(p,"uClearcoatStrength",new A.e(B.b,r.ch))
A.c(p,"uClearcoatRoughness",new A.e(B.b,r.CW))
A.c(p,"uOcclusionStrength",new A.e(B.b,1))
A.c(p,"uLightmapIntensity",new A.e(B.b,0))
A.c(p,"uReceivesShadow",new A.e(B.b,1))
A:{q=null
if(B.X===c){switch(d.a){case 0:q=B.bo
break
case 1:q=B.bn
break}break A}if(B.M===c||B.bm===c){q=s.a.N()
break A}}A.a0(p,q)},
c1(a,b){var s=b.ab(),r=a.a
A.c(r,"uModel",new A.e(B.l,new Float32Array(A.r(s.a))))
A.c(r,"uNormalMatrix",new A.e(B.l,new Float32Array(A.r(s.bq().a))))},
$iz:1,
gm(){return this.a}}
A.eY.prototype={
gC(){return"ssaoOcclusion"},
U(a,b){B.a.j(a.a,new A.E("ssaoOcclusion",B.a_,A.d([new A.n(this.w,B.h)],t.C),!1))},
T(a){var s=this,r="ssaoOcclusion",q=s.a.V(new A.a4(r,s.b,s.c,B.o,B.aJ,B.c9)),p=A.aF(s.d)
return A.d([new A.fB(new A.Z(r,A.d([new A.n(s.w,B.h)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iB:1}
A.fB.prototype={
P(a){var s,r,q,p=this,o=a.b,n=a.d.f.c,m=o.a
A.ad(m,a.R("ssaoRaw").b)
A.a0(m,p.a.N())
if(n<=0){A.aO(m,B.v,1,1,1,1)
return}A.aO(m,B.v,1,0,0,0)
s=p.e.$0()
A.ak(m,p.b.b)
A.I(m,0,t.j.a(p.d.$0()))
A.c(m,"uSceneDepth",B.n)
A.c(m,"uNear",new A.e(B.b,s.f))
A.c(m,"uFar",new A.e(B.b,s.r))
r=s.b.a
q=r.length
if(0>=q)return A.h(r,0)
A.c(m,"uProjScaleX",new A.e(B.b,r[0]))
if(5>=q)return A.h(r,5)
A.c(m,"uProjScaleY",new A.e(B.b,r[5]))
A.c(m,"uRadius",new A.e(B.b,p.f))
A.c(m,"uStrength",new A.e(B.b,n))
A.a5(m,p.c)
o.W(3,0)},
$iz:1,
gm(){return this.a}}
A.eX.prototype={
gC(){return"ssaoBlur"},
U(a,b){B.a.j(a.a,new A.E("ssaoBlur",B.a_,A.d([new A.n(this.y,B.e),new A.n(this.z,B.h)],t.C),!1))},
T(a){var s=this,r="ssaoBlur",q=s.a.V(new A.a4(r,s.b,s.c,B.o,B.cu,B.cq)),p=A.aF(s.d)
return A.d([new A.fA(new A.Z(r,A.d([new A.n(s.y,B.e),new A.n(s.z,B.h)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iB:1}
A.fA.prototype={
P(a){var s,r,q=this,p=a.b,o=p.a
A.ad(o,a.R("ssaoBlurred").b)
A.a0(o,q.a.N())
if(a.d.f.c<=0){A.aO(o,B.v,1,1,1,1)
return}A.aO(o,B.v,1,0,0,0)
s=q.f.$0()
A.ak(o,q.b.b)
r=t.j
A.I(o,0,r.a(q.d.$0()))
A.c(o,"uSsaoRaw",B.n)
A.I(o,1,r.a(q.e.$0()))
A.c(o,"uSceneDepth",B.F)
A.c(o,"uTexelSize",new A.e(B.E,new Float32Array(A.r(A.d([1/q.r,1/q.w],t.n)))))
A.c(o,"uNear",new A.e(B.b,s.f))
A.c(o,"uFar",new A.e(B.b,s.r))
A.a5(o,q.c)
p.W(3,0)},
$iz:1,
gm(){return this.a}}
A.f7.prototype={
gC(){return"vhs"},
U(a,b){var s=this.w
a.b.j(0,s.a)
B.a.j(a.a,new A.E("vhs",B.r,A.d([new A.n(this.r,B.e),new A.n(s,B.u),new A.n(s,B.h)],t.C),!1))},
T(a){var s=this,r=s.a.V(new A.a4("vhs",s.b,s.c,B.o,B.cv,B.cc)),q=A.aF(s.d),p=s.r,o=s.w
return A.d([new A.fG(new A.Z("vhs",A.d([new A.n(p,B.e),new A.n(o,B.u),new A.n(o,B.h)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iB:1}
A.fG.prototype={
P(a){var s=this,r=a.R(s.f.a),q=a.R(s.r.a),p=a.b,o=a.d.f,n=p.a
A.ad(n,q.b)
A.a0(n,s.a.N())
A.ak(n,s.b.b)
A.I(n,0,r.b)
A.c(n,"uScene",B.n)
A.I(n,1,t.j.a(s.d.$0()))
A.c(n,"uHistory",B.F)
A.c(n,"uTime",new A.e(B.b,s.e.$0()))
A.c(n,"uChromaWeight",new A.e(B.b,o.ch))
A.c(n,"uTrackingWeight",new A.e(B.b,o.CW))
A.c(n,"uNoiseWeight",new A.e(B.b,o.cx))
A.c(n,"uHeadSwitchWeight",new A.e(B.b,o.cy))
A.c(n,"uDropoutWeight",new A.e(B.b,o.db))
A.c(n,"uGhostWeight",new A.e(B.b,o.dx))
A.a5(n,s.c)
p.W(3,0)},
$iz:1,
gm(){return this.a}}
A.f8.prototype={
gC(){return"volumetricLight"},
U(a,b){var s=this,r=s.w,q=t.C,p=a.a
B.a.j(p,new A.E("volumetricLight",B.a_,A.d([new A.n(s.x,B.e),new A.n(r,B.h)],q),!1))
B.a.j(p,new A.E("volumetricComposite",B.r,A.d([new A.n(r,B.e),new A.n(s.y,B.e),new A.n(s.z,B.h)],q),!1))},
T(a){var s,r,q,p,o,n,m=this,l="volumetricLight",k="volumetricComposite",j=m.a,i=m.b,h=j.V(new A.a4(l,i,m.c,B.o,B.aJ,B.cd)),g=m.e,f=A.aF(g),e=m.Q
B.a.j(e,f)
s=m.w
r=t.C
q=A.d([new A.fI(new A.Z(l,A.d([new A.n(m.x,B.e),new A.n(s,B.h)],r),!1,!1,!1,!1),h,f,s.a,m.f,m.r)],t.u)
p=m.z
o=j.V(new A.a4(k,i,m.d,B.o,B.cD,B.cr))
n=A.aF(g)
B.a.j(e,n)
B.a.j(q,new A.fH(new A.Z(k,A.d([new A.n(s,B.e),new A.n(m.y,B.e),new A.n(p,B.h)],r),!1,!1,!0,!1),o,n,s,p))
return q},
$iB:1}
A.fI.prototype={
P(a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this,a1=a6.R(a0.d),a2=a6.b,a3=a0.f.$0(),a4=a6.d.d,a5=a2.a
A.ad(a5,a1.b)
A.a0(a5,a0.a.N())
A.aO(a5,B.v,1,0,0,0)
A.ak(a5,a0.b.b)
A.I(a5,0,t.j.a(a0.e.$0()))
A.c(a5,"uSceneDepth",B.n)
A.c(a5,"uNear",new A.e(B.b,a3.f))
A.c(a5,"uFar",new A.e(B.b,a3.r))
A.c(a5,"uViewProjection",new A.e(B.l,new Float32Array(A.r(a3.c.a))))
s=a3.a.a
A.c(a5,"uView",new A.e(B.l,new Float32Array(A.r(s))))
A.c(a5,"uInverseProjection",new A.e(B.l,new Float32Array(A.r(a3.gcf().a))))
r=a4.go==null
A.c(a5,"uShaftIntensity",new A.e(B.b,r?0:0.36))
A.c(a5,"uFogDensity",new A.e(B.b,0))
A.c(a5,"uAnisotropy",new A.e(B.b,a4.y))
q=a4.r
p=t.n
A.c(a5,"uVolumetricAlbedo",new A.e(B.i,new Float32Array(A.r(A.d([q.a,q.b,q.c],p)))))
A.c(a5,"uVolumetricHeightFalloff",new A.e(B.b,a4.w))
A.c(a5,"uVolumetricDustDensity",new A.e(B.b,a4.x))
A.c(a5,"uVolumetricJitter",new A.e(B.b,a4.z))
A.c(a5,"uVolumetricIntensity",new A.e(B.b,a4.Q))
A.c(a5,"uVolumetricSampleCount",new A.e(B.b,a4.as))
if(r)o=B.k
else{q=B.G.gE()
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
o=new A.f(n*l+k*j+q*i,n*h+k*g+q*f,n*e+k*d+q*s[10]).gE()}c=r?null:B.aB
if(c==null)c=B.w
A.c(a5,"uLightDir",new A.e(B.i,new Float32Array(A.r(A.d([o.a,o.b,o.c],p)))))
A.c(a5,"uLightColor",new A.e(B.i,new Float32Array(A.r(A.d([c.a,c.b,c.c],p)))))
b=A.p4(4,a3.d,a4.k2)
A.c(a5,"uVolumetricSourceCount",new A.e(B.b,b.length))
for(a=0;a<4;++a){s=b.length
if(a<s)if(!(a<s))return A.h(b,a)
s=""+a
A.c(a5,"uSourcePosition"+s,new A.e(B.i,new Float32Array(A.r(A.d([0,0,0],p)))))
A.c(a5,"uSourceColor"+s,new A.e(B.i,new Float32Array(A.r(A.d([0,0,0],p)))))
A.c(a5,"uSourceIntensity"+s,new A.e(B.b,0))
A.c(a5,"uSourceReferenceDistance"+s,new A.e(B.b,1))
A.c(a5,"uSourceCutoffDistance"+s,new A.e(B.b,1))}A.a5(a5,a0.c)
a2.W(3,0)},
$iz:1,
gm(){return this.a}}
A.fH.prototype={
P(a){var s=this,r=a.ap(s.e),q=a.ap(s.d),p=a.b,o=p.a
A.ad(o,r.b)
A.lk(o,1)
A.a0(o,B.as)
A.ak(o,s.b.b)
A.I(o,0,q.b)
A.c(o,"uVolumetric",B.n)
A.c(o,"uVolumetricStrength",B.aZ)
A.a5(o,s.c)
p.W(3,0)},
$iz:1,
gm(){return this.a}}
A.dd.prototype={}
A.fb.prototype={
gC(){return"world"},
U(a,b){B.a.j(a.a,new A.E("worldOpaqueTransparent",B.ax,A.d([new A.n(this.e,B.h)],t.C),!1))},
T(a){var s=this,r=s.a.V(new A.a4("safeWorld",s.b,s.c,B.cE,B.o,B.cg)),q=s.e
return A.d([new A.fL(new A.Z("worldOpaqueTransparent",A.d([new A.n(q,B.h)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iB:1}
A.fL.prototype={
P(a){var s,r,q,p,o=this,n=a.b,m=a.d,l=m.d,k=n.a
A.ad(k,a.R(o.d).b)
A.a0(k,o.a.N())
s=l.a
A.aO(k,B.ar,1,s.c,s.b,s.a)
A.ak(k,o.b.b)
A.c(k,"uViewProjection",new A.e(B.l,new Float32Array(A.r(m.c.c.a))))
r=l.go==null?null:B.G
if(r==null)r=B.k
s=t.n
A.c(k,"uLightDir",new A.e(B.i,new Float32Array(A.r(A.d([r.a,r.b,r.c],s)))))
q=l.fx
A.c(k,"uAmbientColor",new A.e(B.i,new Float32Array(A.r(A.d([q.a,q.b,q.c],s)))))
A.c(k,"uAmbientIntensity",new A.e(B.b,l.fy))
A.c(k,"uAmbientLightScale",new A.e(B.b,l.ax))
A.c(k,"uDirectLightScale",new A.e(B.b,l.ay))
for(k=m.a,s=k.length,p=0;p<k.length;k.length===s||(0,A.A)(k),++p)o.bQ(n,k[p])
for(m=m.b,k=m.length,p=0;p<m.length;m.length===k||(0,A.A)(m),++p)o.bQ(n,m[p])},
bQ(a,b){var s,r,q,p,o,n=this
if(b instanceof A.bD){s=b.a
n.bZ(a,s.gm().c)
A.jP(a,b,!0)
r=n.c.$1(s.gm().a)
A.a5(a.a,r.a)
q=r.b
p=r.c
o=b.b.length
if(q)a.bg(p,r.d,o,0)
else a.be(p,0,o)}else if(t.Y.b(b)){q=a.a
A.c(q,"uUseInstances",B.al)
n.bZ(a,b.gm().c)
r=n.c.$1(b.gm().a)
A.a5(q,r.a)
q=r.b
p=r.c
if(q)a.bf(p,r.d,0)
else a.W(p,0)}else throw A.b(A.j("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dV(b).i(0),null))},
bZ(a,b){var s=b.ab(),r=a.a
A.c(r,"uModel",new A.e(B.l,new Float32Array(A.r(s.a))))
A.c(r,"uNormalMatrix",new A.e(B.l,new Float32Array(A.r(s.bq().a))))},
$iz:1,
gm(){return this.a}}
A.es.prototype={
v(){return"LoopMode."+this.b}}
A.aV.prototype={}
A.bE.prototype={
d2(a){var s,r,q,p,o,n,m,l=this.b
if(a<=B.a.gbi(l).a)return new A.bT(B.a.gbi(l),B.a.gbi(l),0)
if(a>=B.a.gbp(l).a)return new A.bT(B.a.gbp(l),B.a.gbp(l),1)
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
return new A.bT(p,o,A.kR(B.c.I(m,0,1)))}}
A.hq.prototype={
$2(a,b){var s=this.a.h("aV<0>")
return B.d.J(s.a(a).a,s.a(b).a)},
$S(){return this.a.h("i(aV<0>,aV<0>)")}}
A.iq.prototype={
v(){return"Vector3Property."+this.b}}
A.f6.prototype={
dE(a){var s,r=this.d2(a),q=r.a.b,p=q.H(0,r.b.b.a7(0,q).t(0,r.c))
switch(0){case 0:q=this.a
s=q.b
q.b=new A.aw(p,s.b,s.c)
q.a9()
break}}}
A.fS.prototype={
ct(a){var s,r,q,p,o,n,m,l=this
switch(l.c.a){case 0:s=B.c.I(a,0,l.b)
break
case 1:r=l.b
s=B.c.a0(a,r)
if(s<0)s+=r
break
case 2:r=l.b
q=B.c.dH(a/r)
p=B.c.a0(a,r)
o=p<0?p+r:p
s=(q&1)===0?o:r-o
break
default:s=a}for(r=l.d,n=r.length,m=0;m<n;++m)r[m].dE(s)}}
A.cm.prototype={
ao(a){var s,r=this,q=r.b+a*r.c
r.b=q
s=r.a
s.ct(q)
if(s.c===B.cs&&r.b>=s.b)return!1
return!0}}
A.fT.prototype={
ao(a){this.a.dZ(0,new A.fU(a))}}
A.fU.prototype={
$2(a,b){A.ae(a)
return!t.f.a(b).ao(this.a)},
$S:56}
A.ci.prototype={
sbA(a){var s=this.b
this.b=new A.aw(s.a,s.b,a)
this.a9()},
bt(a,b){var s=a.gE(),r=b/2,q=Math.sin(r),p=Math.cos(r),o=this.b
this.b=new A.aw(o.a,o.b.t(0,new A.bJ(s.a*q,s.b*q,s.c*q,p)),o.c)
this.a9()},
gaR(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this
if(g.d){s=g.f
if(s!=null){r=s.gaR()
q=g.b
p=r.b
o=r.c
n=q.a.t(0,o)
m=new A.f(p.a,p.b,p.c)
l=m.a6(n)
k=m.a6(l)
n=r.a.H(0,n.H(0,l.t(0,2*p.d)).H(0,k.t(0,2)))
p=p.t(0,q.b)
r=p.a
j=p.b
i=p.c
p=p.d
h=Math.sqrt(r*r+j*j+i*i+p*p)
r=h<1e-9?B.D:new A.bJ(r/h,j/h,i/h,p/h)
q=new A.aw(n,r,o*q.c)
r=q}else r=g.b
g.c=r
g.d=!1}return g.c},
a9(){var s,r,q,p=this
if(p.d)return
p.e=p.d=!0
for(s=p.r,r=s.length,q=0;q<s.length;s.length===r||(0,A.A)(s),++q)s[q].a9()},
ca(a){var s=a.f
if(s===this)return
if(s!=null)if(B.a.a5(s.r,a)){a.f=null
a.a9()}a.f=this
a.a9()
B.a.j(this.r,a)},
aL(a,b,c,d,e,f){var s=A.k8(B.U,null,!0,B.M,null,b,c,d,e,!0,0,f,-1)
this.ca(s)
return s},
dY(a){var s={}
s.a=null
new A.ic(s,a).$1(this)
return s.a},
bC(a){var s,r,q,p,o,n,m,l=this,k=l.w,j=l.x
if(k!=null&&j!=null){s=l.cx
if(s==null){r=new A.bK(k,j,l.gaR(),l.Q,l.as,l.at,!0,!0,l.CW)
q=a.c9(r)
p=a.b.dA(r)
a.c.A(0,p,new A.cp(p,r,q))
l.cx=p
l.e=!1}else if(l.e||l.d){r=new A.bK(k,j,l.gaR(),l.Q,l.as,l.at,!0,!0,l.CW)
q=a.c9(r)
a.b.by(s,r)
a.c.A(0,s,new A.cp(s,r,q))
l.e=!1}}else{o=l.cx
if(o!=null){a.b.aP(o)
a.c.a5(0,o)
l.cx=null
l.e=!0}}for(o=l.r,n=o.length,m=0;m<o.length;o.length===n||(0,A.A)(o),++m)o[m].bC(a)}}
A.ic.prototype={
$1(a){var s,r,q,p,o,n,m=a.y
if(m==null)s=null
else{r=a.gaR().ab()
m=m.gba()
q=A.G(m)
s=A.jW(new A.aj(m,q.h("f(1)").a(r.gbx()),q.h("aj<1,f>")))}if(s!=null){m=this.b
p=m.dQ(s)
if(p!=null){r=this.a
q=r.a
if(q==null||p<q.d){o=m.a.H(0,m.b.t(0,p))
o.a7(0,s.a.H(0,s.b).t(0,0.5)).gE()
r.a=new A.i1(a,o,p)}}}for(m=a.r,r=m.length,n=0;n<m.length;m.length===r||(0,A.A)(m),++n)this.$1(m[n])},
$S:57}
A.hj.prototype={
v(){return"GpuBufferUsage."+this.b}}
A.ed.prototype={
v(){return"GpuBufferKind."+this.b}}
A.eg.prototype={
v(){return"GpuTextureFilter."+this.b}}
A.eh.prototype={
v(){return"GpuTextureWrap."+this.b}}
A.ec.prototype={}
A.ef.prototype={}
A.c9.prototype={
v(){return"GpuTargetAttachment."+this.b}}
A.cP.prototype={}
A.ee.prototype={
v(){return"GpuDeviceStatus."+this.b}}
A.cj.prototype={
v(){return"ShaderCompileStage."+this.b}}
A.dh.prototype={
i(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.bc.prototype={
v(){return"UniformType."+this.b}}
A.e.prototype={}
A.cG.prototype={
v(){return"ClearMask."+this.b}}
A.e5.prototype={
W(a,b){var s=this.a
if(s.b!==B.f)A.k(A.l(u.k))
s.a.drawArrays(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.aj(a,1)},
be(a,b,c){var s=this.a
if(s.b!==B.f)A.k(A.l(u.k))
s.a.drawArraysInstanced(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.aj(a,c)},
bf(a,b,c){var s,r,q=this.a
if(q.b!==B.f)A.k(A.l(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.aj(a,1)},
bg(a,b,c,d){var s,r,q=this.a
if(q.b!==B.f)A.k(A.l(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.a8(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.aj(a,c)},
$imq:1}
A.c7.prototype={}
A.d8.prototype={
bc(a,b,c,d){var s,r,q,p,o,n,m,l,k="resource library is disposed",j=this.b,i=j.gF()
if(i.x)A.k(A.l(k))
s=i.c
if(d>0)r=c<=0
else r=!0
if(r)A.k(A.j("TextureStore.declare dimensions/layers must be > 0",null))
if(!isFinite(16))A.k(A.j("TextureStore.declare anisotropy must be in [1, 16]: 16",null))
r=s.b
q=t.aD
p=r.aM(new A.b_(new A.ef(d,c,1,!0,B.bA,B.Z,B.bC,16),A.eq(1,null,!1,q),!1),b)
o=r.ak(p)
n=A.ar(o.b,q)
B.a.A(n,0,a)
q=o.a
r.by(p,new A.b_(q,n,o.c))
r=s.c
m=p.a
l=r.q(0,m)
if(l==null){l=A.k9(s.a,q)
r.A(0,m,l)}A.ka(s.a,l,0,a)
i.w.j(0,p)
j=j.gF()
if(j.x)A.k(A.l(k))
j.c.dF(p)
return p},
dX(a,b){var s,r,q,p,o,n,m,l,k=this,j=A.p(k.a.getBoundingClientRect()),i=a-A.aR(j.left),h=b-A.aR(j.top)
if(i<0||i>A.aR(j.width)||h<0||h>A.aR(j.height))return null
s=k.y
r=k.x
q=r.c/r.d
p=s!=null?s.bv(q):A.fX(q,B.b2,200,B.b3,1,0.1,B.k)
r=B.c.bw(A.aR(j.width))
o=B.c.bw(A.aR(j.height))
if(r<=0||o<=0)A.k(A.j("Viewport dimensions must be > 0",null))
n=i/r*2-1
m=1-h/o*2
r=p.gdR()
l=r.aQ(new A.f(n,m,-1))
return k.e.dY(new A.i0(p.d,r.aQ(new A.f(n,m,1)).a7(0,l).gE()))},
d5(){var s,r=this,q=v.G
A.p(q.window).addEventListener("resize",A.a2(new A.hK(r)))
s=r.a
s.addEventListener("webglcontextlost",A.a2(new A.hL(r)))
s.addEventListener("webglcontextrestored",A.a2(new A.hM(r)))
s.addEventListener("contextmenu",A.a2(new A.hN()))
s.addEventListener("mousedown",A.a2(new A.hO(r)))
A.p(q.window).addEventListener("mousemove",A.a2(new A.hP(r)))
A.p(q.window).addEventListener("mouseup",A.a2(new A.hQ(r)))
s.addEventListener("wheel",A.a2(new A.hR(r)))
A.p(q.window).addEventListener("keydown",A.a2(new A.hS(r)))
A.p(q.window).addEventListener("keyup",A.a2(new A.hT(r)))},
c7(){var s,r,q,p,o=this.y
if(o instanceof A.bA){s=this.z
r=s.n(0,"keyw")||s.n(0,"arrowup")?1:0
if(s.n(0,"keys")||s.n(0,"arrowdown"))--r
q=s.n(0,"keya")||s.n(0,"arrowleft")?-1:0
if(s.n(0,"keyd")||s.n(0,"arrowright"))++q
p=s.n(0,"space")||s.n(0,"keye")?1:0
o.z=new A.f(q,s.n(0,"shiftleft")||s.n(0,"keyq")?p-1:p,r)}},
bW(){var s,r=this,q=r.a,p=A.a(q.clientWidth)>0?A.a(q.clientWidth):A.a(q.width),o=A.a(q.clientHeight)>0?A.a(q.clientHeight):A.a(q.height),n=r.x
if(p===n.a&&o===n.b)return
n=n.e
n=A.lf(o,p,n,n,!0)
r.x=n
q.width=n.c
q.height=r.x.d
try{q=r.x
r.b.aH()
q.B()
r.d.bn("surface resized")}catch(s){}},
cw(){var s=this
if(s.at)return
s.at=!0
s.ax=0
A.a(A.p(v.G.window).requestAnimationFrame(A.a2(s.gc3())))},
dh(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
A.aR(a)
if(!e.at)return
s=a/1000
r=e.ax
q=r>0?s-r:0.016666666666666666
e.ax=s
e.bW()
if(!e.ay&&e.b.e!==B.a7){e.Q.ao(q)
r=e.c
e.e.bC(r)
p=e.y
o=p!=null
if(o)p.ao(q)
n=e.x
m=n.c/n.d
l=o?p.bv(m):A.fX(m,B.b2,200,B.b3,1,0.1,B.k)
o=e.d
n=e.f
k=e.r
j=o.a
o.a=j+1
o=e.b
o.dm(r,new A.he(l,n,k,-1,j,s))
o.gF()
j=e.as
if(j!=null)j.$1(new A.c7(s,q))
i=o.dC()
if(e.w){r=e.dy+=q
o=++e.fr
if(r>=0.5){e.fx=o/r
e.fr=e.dy=0
h=e.dx
if(h==null){r=v.G
h=A.p(A.p(r.document).createElement("div"))
A.p(h.style).position="absolute"
A.p(h.style).left="12px"
A.p(h.style).top="12px"
A.p(h.style).padding="8px 12px"
A.p(h.style).backgroundColor="rgba(10, 12, 16, 0.85)"
A.p(h.style).color="#00ffaa"
A.p(h.style).fontFamily="monospace"
A.p(h.style).fontSize="12px"
A.p(h.style).lineHeight="1.4"
A.p(h.style).borderRadius="4px"
A.p(h.style).pointerEvents="none"
A.p(h.style).zIndex="9999"
g=A.J(e.a.parentElement)
if(g==null)g=A.J(A.p(r.document).body)
if(g!=null)A.p(g.appendChild(h))
e.dx=h}f=B.c.ac(q*1000,1)
h.innerText="FPS: "+B.c.ac(e.fx,0)+" ("+f+" ms)\nDraws: "+i.b+" | Tris: "+i.c+"\nInstances: "+i.e+" | VRAM: "+B.c.ac(i.r/1024,0)+" KB"}}}A.a(A.p(v.G.window).requestAnimationFrame(A.a2(e.gc3())))},
sdW(a){this.as=t.a4.a(a)}}
A.hV.prototype={
$1(a){var s=this.a,r=a.a===B.a4?2:1,q=a===B.aN?0:1
return new A.dc(a,s.c,s.d,r,q)},
$S:59}
A.hK.prototype={
$1(a){A.p(a)
return this.a.bW()},
$S:60}
A.hL.prototype={
$1(a){var s
A.p(a)
s=this.a
s.ay=!0
s.d.bn("gl context lost")},
$S:0}
A.hM.prototype={
$1(a){var s
A.p(a)
s=this.a
s.ay=!1
s.d.bn("gl context restored")},
$S:0}
A.hN.prototype={
$1(a){A.p(a).preventDefault()},
$S:0}
A.hO.prototype={
$1(a){var s
A.p(a)
s=this.a
s.CW=!0
s.cx=A.a(a.button)
s.cy=A.a(a.clientX)
s.db=A.a(a.clientY)},
$S:0}
A.hP.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
A.p(a)
s=this.a
if(s.CW)r=s.y!=null
else r=!1
if(r){q=A.a(a.clientX)
p=A.a(a.clientY)
o=q-s.cy
n=p-s.db
s.cy=q
s.db=p
m=s.y
if(m instanceof A.bn)if(s.cx===0&&!A.j1(a.shiftKey)){m.ax+=o*0.006
m.ay=B.c.I(m.ay+n*0.006,-1.5079644737231006,1.5079644737231006)}else{s=m.b
l=m.gcl()
k=m.gcl().a6(m.a.a7(0,m.gbh()).gE()).gE()
j=l.t(0,-o*0.003*s).H(0,k.t(0,n*0.003*s))
m.CW=m.CW.H(0,j)}else if(m instanceof A.bA){m.b+=o*0.003
m.c=B.c.I(m.c-n*0.003,-1.5393804002589986,1.5393804002589986)}}},
$S:0}
A.hQ.prototype={
$1(a){A.p(a)
this.a.CW=!1},
$S:0}
A.hR.prototype={
$1(a){var s,r,q
A.p(a)
s=this.a
r=s.y
if(r!=null){a.preventDefault()
q=s.y
if(q instanceof A.bn){s=A.aR(a.deltaY)
q.ch=B.c.I(q.ch+s*0.003,0.5,100)}else if(q instanceof A.bA){s=A.aR(a.deltaY)
q.a=q.a.H(0,q.gal().t(0,q.d*(-s*0.002)))}}},
$S:0}
A.hS.prototype={
$1(a){var s=this.a
s.z.j(0,A.ae(A.p(a).code).toLowerCase())
s.c7()},
$S:0}
A.hT.prototype={
$1(a){var s=this.a
s.z.a5(0,A.ae(A.p(a).code).toLowerCase())
s.c7()},
$S:0}
A.eJ.prototype={
cj(a){var s=this.b.q(0,a)
if(s==null)throw A.b(A.l("resource is not in candidate: "+a))
return s}}
A.hk.prototype={
gl(){var s=this.c
if(s==null)throw A.b(A.l("GPU resource adapter is not initialized"))
return s},
ag(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.cW(s.b)
r.b.ag()
r.c=null
r.e=!0},
bO(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.aM(a0,a1),a3=A.d([],t.J)
try{k=a4.a
j=k.$ti
i=j.h("x(1)")
j=j.h("a1<1>")
s=new A.a1(k,i.a(new A.hl()),j)
for(h=s,g=J.a3(h.a),h=new A.F(g,h.b,h.$ti.h("F<1>")),f=a.a;h.k();){r=g.gl()
q=A.lq(f,a.bP(r,a5))
J.fQ(a3,q)
J.fP(a2,r,q)}e=A.ar(new A.a1(k,i.a(new A.hm()),j),j.h("m.E"))
B.a.cv(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.A)(k),++d){o=k[d]
n=A.oW(J.mg(o,11))
if(i){h=J.jU(a2,"sceneColor")
h.toString
J.fP(a2,o,h)}else{h=n
if(typeof h!=="number")return h.cq()
if(h>=2){h=J.jU(a2,"sceneColor#1")
h.toString
J.fP(a2,o,h)}else{m=A.lq(f,a.bP(o,a5))
J.fQ(a3,m)
J.fP(a2,o,m)}}}a0=A.kQ(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.G(a0).h("df<1>"),a0=new A.df(a0,k),a0=new A.ai(a0,a0.gp(0),k.h("ai<R.E>")),j=a.a,i=t.V,k=k.h("R.E");a0.k();){h=a0.d
l=h==null?k.a(h):h
b=i.a(a1.a(l).a)
A.kb(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}throw c}},
bP(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.cP(512,512,1,B.Y,!0)
if(a==="sceneDepth")return new A.cP(n,m,1,B.Y,!0)
s=B.t.ae(a,"ssao")||B.t.ae(a,"bloomBlur")||B.t.ae(a,"dofBlur")||B.t.ae(a,"volumetricLight")
r=s?B.d.S(n+1,2):n
q=s?B.d.S(m+1,2):m
p=a==="sceneColor"
o=p||B.t.ae(a,"sceneColor#")
p=p?b.d:1
return new A.cP(r,q,p,o?B.aw:B.bx,o)},
cW(a){var s,r,q,p,o,n=A.k3(t.bS.a(a).gco(),t.j)
for(n=A.kg(n,n.r,A.u(n).c),s=this.a,r=t.V,q=n.$ti.c;n.k();){p=n.d
o=r.a((p==null?q.a(p):p).a)
A.kb(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}
A.hl.prototype={
$1(a){return!B.t.ae(A.ae(a),"sceneColor#")},
$S:8}
A.hm.prototype={
$1(a){return B.t.ae(A.ae(a),"sceneColor#")},
$S:8}
A.dD.prototype={
v(){return"_SlotState."+this.b}}
A.bs.prototype={
sbb(a){this.c=this.$ti.h("1?").a(a)}}
A.aZ.prototype={
aM(a,b){var s,r,q,p,o=this,n=o.$ti
n.y[1].a(a)
s=o.c
r=s.length
if(r!==0){if(0>=r)return A.h(s,-1)
q=s.pop()}else{s=o.b
B.a.j(s,new A.bs(B.S,n.h("bs<2>")))
q=s.length-1}n=o.b
if(!(q>=0&&q<n.length))return A.h(n,q)
p=n[q];++p.a
p.b=B.e8
p.sbb(a)
p.f=b;++o.d
return o.a.$3(q,p.a,b)},
dA(a){return this.aM(a,null)},
ar(a){var s,r,q
this.$ti.c.a(a)
s=a.a
if(s<0||s>=this.b.length)throw A.b(A.bi(B.az,a))
r=this.b
if(!(s>=0&&s<r.length))return A.h(r,s)
q=r[s]
if(q.a!==a.b)throw A.b(A.bi(B.aA,a))
s=q.b
if(s===B.T||s===B.S)throw A.b(A.bi(B.P,a))},
ak(a){var s,r,q=this.$ti
q.c.a(a)
this.ar(a)
s=this.b
r=a.a
if(!(r>=0&&r<s.length))return A.h(s,r)
r=s[r].c
return r==null?q.y[1].a(r):r},
by(a,b){var s,r=this.$ti
r.c.a(a)
r.y[1].a(b)
this.ar(a)
r=this.b
s=a.a
if(!(s>=0&&s<r.length))return A.h(r,s)
r[s].sbb(b)},
aP(a){var s,r,q,p=this
p.$ti.c.a(a)
s=a.a
if(s<0||s>=p.b.length)throw A.b(A.bi(B.az,a))
r=p.b
if(!(s>=0&&s<r.length))return A.h(r,s)
q=r[s]
if(q.a!==a.b)throw A.b(A.bi(B.aA,a))
r=q.b
if(r===B.T||r===B.S)throw A.b(A.bi(B.bO,a))
q.b=B.T
q.sbb(null)
B.a.j(p.c,s);++p.e},
aC(){return new A.bt(this.dT(),this.$ti.h("bt<+(1,2)>"))},
dT(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k,j,i
return function $async$aC(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b,n=s.a,m=s.$ti.y[1],l=0
case 2:if(!(l<o.length)){r=4
break}k=o[l]
j=k.b
if(j===B.T||j===B.S){r=3
break}j=n.$3(l,k.a,k.f)
i=k.c
r=5
return a.b=new A.al(j,i==null?m.a(i):i),1
case 5:case 3:++l
r=2
break
case 4:return 0
case 1:return a.c=p.at(-1),3}}}}}
A.fV.prototype={
v(){return"BlendEquation."+this.b}}
A.c3.prototype={
v(){return"BlendFactor."+this.b}}
A.h0.prototype={
v(){return"CullFace."+this.b}}
A.h4.prototype={
v(){return"DepthFunc."+this.b}}
A.c6.prototype={}
A.ab.prototype={
v(){return"StateField."+this.b}}
A.ix.prototype={
dB(a){var s,r=this.a
if(r==null)return A.mH(B.cm,t.d5)
s=A.an(t.d5)
if(r.a!==a.a)s.j(0,B.aa)
if(r.b!==a.b)s.j(0,B.ab)
if(r.c!==a.c)s.j(0,B.ac)
if(r.d!==a.d)s.j(0,B.ad)
if(r.e!==a.e||r.f!==a.f)s.j(0,B.ae)
if(r.r!==a.r)s.j(0,B.af)
if(r.w!==a.w)s.j(0,B.ag)
if(r.x!==a.x)s.j(0,B.ah)
return s}}
A.bg.prototype={$iaJ:1}
A.dN.prototype={}
A.dM.prototype={}
A.fK.prototype={}
A.f9.prototype={
cD(a){var s=this,r=A.p(s.a.canvas)
s.c=A.a2(new A.iu(s))
s.d=A.a2(new A.iv(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
au(a){var s=A.cx(this.a.getParameter(a))
return typeof s=="number"?B.c.bw(s):0},
bU(a){var s=A.cx(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
$imw:1}
A.iu.prototype={
$1(a){A.p(a).preventDefault()
this.a.b=B.O},
$S:13}
A.iv.prototype={
$1(a){this.a.b=B.f},
$S:13}
A.j0.prototype={
dn(){var s,r=this
if(r.b!==B.f)A.k(A.l(u.k))
s=r.w?A.J(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.bg(new A.fK(s))},
c4(a){var s=a.a
if(!(s instanceof A.fK))throw A.b(A.aI(a,"query","is not a GPU timer query"))
return s}}
A.fJ.prototype={}
A.it.prototype={}
A.iw.prototype={
dz(a){var s=A.J(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.it(A.nk(s))}}
A.jD.prototype={
$1(a){var s,r,q,p
A.p(a)
s=A.ae(this.a.value)
A:{if("aces"===s){r=B.du
break A}if("reinhard"===s){r=B.ai
break A}if("off"===s){r=B.aX
break A}r=B.aj
break A}q=this.b
p=q.r
q.r=A.eI(p.at,p.b,p.as,p.d,p.Q,p.a,p.f,p.ay,p.r,p.z,!1,p.c,p.y,p.x,p.w,r,p.ax,p.ch,p.db,p.dx,p.cy,p.cx,p.CW,p.e)},
$S:0}
A.jE.prototype={
$1(a){var s,r,q
A.p(a)
s=A.ae(this.a.value)
A:{if("clean"===s){r=A.eI(0,0,0,0,0,1,0,8,0,1,!1,0,0,0,0,B.aj,0,0,0,0,0,0,0,0)
break A}if("ps1"===s){r=A.eI(0.35,0,0,0,0.65,1,0,5,0,1,!1,0,0,0,0,B.aX,0,0,0,0,0,0,0,0)
break A}if("vhs"===s){r=A.eI(0,0,0,0,0,1,0,8,0,1,!1,0,0,0,0,B.ai,0,0.45,0,0,0,0.25,0.4,0.3)
break A}r=A.l8()
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
A.jF.prototype={
$1(a){var s
A.p(a)
s=this.a.y
s=s instanceof A.bn?s:null
if(s!=null)s.as=A.j1(this.b.checked)},
$S:0}
A.jG.prototype={
$1(a){var s,r,q,p=this
A.p(a)
s=p.b
if(A.ae(p.a.value)==="fly"){s.y=new A.bA(B.dO,6,B.y,B.y)
s=p.c
if(t.m.b(s))A.p(s.style).display="none"}else{r=s.y=A.l6(8.5,B.R)
r.d=0.45
s=p.d
q=t.m
if(q.b(s)){r.as=A.j1(s.checked)
r.at=0.18}s=p.c
if(q.b(s))A.p(s.style).display="flex"}},
$S:0}
A.jH.prototype={
$1(a){var s
A.p(a)
s=this.a.q(0,A.ae(this.b.value))
if(s!=null)this.c.x=s},
$S:0}
A.jI.prototype={
$1(a){var s,r,q,p,o,n,m,l,k=this
A.p(a)
s=k.b.dX(A.a(a.clientX),A.a(a.clientY))
r=k.a
if(s!=null){q=s.a
r.a=q
r.b=1
p=B.c.ac(s.d,2)
o=s.b
r=B.c.ac(o.a,1)
n=B.c.ac(o.b,1)
m=B.c.ac(o.c,1)
l=k.c
if(l!=null)l.textContent="Selected: "+q.a+" | Dist: "+p+" | Pt: "+("("+r+", "+n+", "+m+")")}else{r.a=null
r=k.c
if(r!=null)r.textContent="Click any 3D object to inspect"}},
$S:0}
A.jJ.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=a.a,e=a.b,d=g.a,c=d.b
if(c>0)c=d.b=Math.max(0,c-e*2.5)
s=g.b
s.sbA(d.a===s?1+Math.sin(c*3.141592653589793)*0.2:1)
c=g.c
c.sbA(d.a===c?1+Math.sin(d.b*3.141592653589793)*0.18:1)
s.bt(B.k,0.35*e)
c.bt(B.dS.gE(),0.7*e)
g.d.bt(B.k,0.65*e)
for(c=g.e,r=0;r<c.length;++r){q=c[r]
p=q===d.a?1+Math.sin(d.b*3.141592653589793)*0.25:1
s=q.b
q.b=new A.aw(s.a,s.b,p)
q.a9()
o=B.d.a0(r,3)
A:{if(0===o){s=B.dQ.gE()
break A}if(1===o){s=B.dN.gE()
break A}s=B.dP.gE()
break A}n=A.n4(s,(2.2+r*1.2)*e)
s=q.b
q.b=new A.aw(s.a,s.b.t(0,n),s.c)
q.a9()}d=f*1.2
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
h=g.f
h.f=h.f.du(A.d([new A.bo(new A.f(c*4.2,1.5+s*0.6,d*4.2),B.bW,4,9),new A.bo(new A.f(l*4.5,1.8,m*4.5),B.bZ,4,9),new A.bo(new A.f(j*3.8,1.2,k*3.8),B.c3,3.5,8),new A.bo(new A.f(0,3.8+i*0.9,0),B.c4,4.5,10)],t.h))},
$S:63};(function aliases(){var s=J.bl.prototype
s.cC=s.i})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"ob","mB",64)
r(A,"oB","nw",5)
r(A,"oC","nx",5)
r(A,"oD","ny",5)
q(A,"lV","ow",1)
p(A.ev.prototype,"ge4","e5",19)
var o
p(o=A.f2.prototype,"ge0","e1",3)
p(o,"ge8","e9",3)
p(o,"gea","eb",3)
p(o,"ge2","e3",3)
p(o,"ge6","e7",3)
q(A,"lW","nz",66)
q(A,"pB","k5",67)
r(A,"oK","kR",45)
p(A.b7.prototype,"gbx","aQ",53)
p(A.d8.prototype,"gc3","dh",58)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.w,null)
q(A.w,[A.k0,J.ek,A.dg,J.cB,A.m,A.cE,A.L,A.ih,A.ai,A.d0,A.F,A.ah,A.aQ,A.cc,A.cI,A.bQ,A.b9,A.io,A.hE,A.cN,A.dE,A.bh,A.bF,A.hr,A.cX,A.b6,A.cW,A.aN,A.fo,A.iY,A.iW,A.fc,A.bf,A.aB,A.fh,A.bO,A.U,A.fd,A.fC,A.dO,A.du,A.fq,A.bR,A.D,A.dK,A.fF,A.bz,A.iC,A.di,A.iD,A.hc,A.aa,A.Y,A.fD,A.f_,A.hD,A.iS,A.i2,A.au,A.fZ,A.h_,A.eH,A.cD,A.eW,A.ea,A.he,A.hf,A.b8,A.hn,A.cf,A.dZ,A.K,A.e6,A.bo,A.ap,A.bG,A.ac,A.ir,A.bm,A.h3,A.hF,A.hW,A.eP,A.bK,A.ij,A.dc,A.T,A.hg,A.ev,A.f5,A.hA,A.b_,A.f2,A.bA,A.bn,A.bD,A.e8,A.e9,A.eb,A.hd,A.cq,A.E,A.a9,A.O,A.n,A.cH,A.hZ,A.a4,A.i3,A.Z,A.i5,A.i4,A.cp,A.db,A.eO,A.iE,A.fE,A.iV,A.ft,A.fn,A.fx,A.fs,A.iQ,A.ao,A.am,A.W,A.h2,A.h1,A.be,A.aS,A.iF,A.bI,A.hh,A.b7,A.bJ,A.i0,A.i1,A.aw,A.S,A.f,A.cC,A.ff,A.dY,A.fg,A.e4,A.fi,A.cL,A.fk,A.e7,A.fl,A.ei,A.fp,A.d1,A.fr,A.c5,A.e_,A.k6,A.d9,A.fu,A.eM,A.fv,A.bL,A.eU,A.fy,A.eV,A.fz,A.eY,A.fB,A.eX,A.fA,A.f7,A.fG,A.f8,A.fI,A.fH,A.dd,A.fb,A.fL,A.aV,A.bE,A.fS,A.cm,A.fT,A.ci,A.ec,A.ef,A.cP,A.dh,A.e,A.e5,A.c7,A.d8,A.eJ,A.hk,A.bs,A.aZ,A.c6,A.ix,A.bg,A.dN,A.dM,A.fK,A.fJ,A.j0,A.it,A.iw])
q(J.ek,[J.en,J.cR,J.cT,J.cS,J.cU,J.cb,J.bj])
q(J.cT,[J.bl,J.t,A.cd,A.d5])
q(J.bl,[J.eG,J.bM,J.bk])
r(J.em,A.dg)
r(J.hp,J.t)
q(J.cb,[J.cQ,J.eo])
q(A.m,[A.cn,A.aD,A.d_,A.a1,A.bP,A.bt])
r(A.dP,A.cn)
r(A.dr,A.dP)
r(A.cF,A.dr)
q(A.L,[A.cV,A.ba,A.ep,A.f4,A.eQ,A.fm,A.dW,A.aT,A.dn,A.f3,A.ck,A.e2])
q(A.aD,[A.R,A.b5,A.aL,A.b4,A.dt])
q(A.R,[A.dj,A.aj,A.df])
q(A.aQ,[A.br,A.cr])
q(A.br,[A.al,A.dA,A.dB])
r(A.bT,A.cr)
r(A.cs,A.cc)
r(A.dl,A.cs)
r(A.cJ,A.dl)
r(A.P,A.cI)
q(A.b9,[A.cK,A.dC,A.dL])
r(A.aU,A.cK)
r(A.d7,A.ba)
q(A.bh,[A.e0,A.e1,A.f1,A.jy,A.jA,A.iz,A.iy,A.j2,A.iO,A.jL,A.jM,A.js,A.jt,A.is,A.hx,A.hy,A.hz,A.hH,A.hw,A.hB,A.ik,A.im,A.h8,A.h6,A.h7,A.hI,A.hJ,A.ia,A.i9,A.i8,A.i7,A.i6,A.ib,A.jj,A.jk,A.id,A.ie,A.jT,A.jR,A.hX,A.hi,A.hv,A.jq,A.ic,A.hV,A.hK,A.hL,A.hM,A.hN,A.hO,A.hP,A.hQ,A.hR,A.hS,A.hT,A.hl,A.hm,A.iu,A.iv,A.jD,A.jE,A.jF,A.jG,A.jH,A.jI,A.jJ])
q(A.f1,[A.eZ,A.c4])
q(A.bF,[A.b3,A.ds])
q(A.e1,[A.jz,A.j3,A.jo,A.iP,A.hs,A.hu,A.jN,A.hC,A.il,A.jO,A.h9,A.ig,A.jS,A.jQ,A.hY,A.hq,A.fU])
q(A.d5,[A.ew,A.a6])
q(A.a6,[A.dw,A.dy])
r(A.dx,A.dw)
r(A.d3,A.dx)
r(A.dz,A.dy)
r(A.d4,A.dz)
q(A.d3,[A.d2,A.ex])
q(A.d4,[A.ey,A.ez,A.eA,A.eB,A.eC,A.d6,A.eD])
r(A.dF,A.fm)
q(A.e0,[A.iA,A.iB,A.iX,A.iG,A.iK,A.iJ,A.iI,A.iH,A.iN,A.iM,A.iL,A.iU,A.jn,A.ji,A.jb,A.jc,A.jh,A.j6,A.j8,A.j7,A.jg,A.j4,A.j5,A.jd,A.je,A.jf,A.ja,A.j9,A.jl,A.jm,A.jr])
r(A.dq,A.fh)
r(A.fw,A.dO)
r(A.dv,A.ds)
r(A.aP,A.dC)
r(A.dm,A.dL)
q(A.aT,[A.da,A.ej])
q(A.iC,[A.cg,A.cl,A.ca,A.fR,A.eu,A.bd,A.cM,A.fW,A.fY,A.ch,A.c8,A.aK,A.eN,A.b1,A.de,A.eT,A.cO,A.fe,A.fj,A.es,A.iq,A.hj,A.ed,A.eg,A.eh,A.c9,A.ee,A.cj,A.bc,A.cG,A.dD,A.fV,A.c3,A.h0,A.h4,A.ab])
q(A.b8,[A.at,A.av,A.aX,A.eF,A.b2])
r(A.eR,A.fx)
r(A.f6,A.bE)
r(A.f9,A.fJ)
s(A.dP,A.D)
s(A.dw,A.D)
s(A.dx,A.ah)
s(A.dy,A.D)
s(A.dz,A.ah)
s(A.cs,A.dK)
s(A.dL,A.fF)
s(A.fx,A.iQ)
s(A.fJ,A.j0)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{i:"int",q:"double",af:"num",v:"String",x:"bool",Y:"Null",y:"List",w:"Object",as:"Map",H:"JSObject"},mangledNames:{},types:["Y(H)","~()","aJ()","aJ(av?)","x(E)","~(~())","~(@)","x(ac)","x(v)","x(n)","Y(@)","Y()","x(q)","Y(w?)","~(@,@)","i(+influence,light(q,ap),+influence,light(q,ap))","@(@,v)","Y(~())","Y(@,bq)","bG(aX)","aX(i,i,v?)","at(i,i,v?)","i(i,+(at,bm))","@(@)","av(i,i,v?)","x(dk?)","i(i,+(av,b_))","i(+influence,source(q,dp),+influence,source(q,dp))","v(E)","i(z,z)","~(i,@)","Y(w,bq)","x(i)","b2(i,i,v?)","dd(at)","aJ(v{fallback:v?})","@(v)","ap?()","y<ap>()","cD()","q()","c5()","aJ?()","x(aa<v,T>)","T(aa<v,T>)","q(q)","i(W<ao>,W<ao>)","aE(W<ao>)","i(W<am>,W<am>)","aE(W<am>)","~(f,f,f,f,f,f)","q(i,i)","bI(q,q,q,q)","f(f)","~(bL)","bL()","x(v,cm)","~(ci)","~(af)","dc(au)","~(H)","~(w?,w?)","w?(w?)","~(c7)","i(@,@)","x(au)","cq()","x()","T(T,T)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.al&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.dA&&a.b(c.a)&&b.b(c.b),"2;influence,source":(a,b)=>c=>c instanceof A.dB&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.bT&&a.b(d.a)&&b.b(d.b)&&c.b(d.c)}}
A.nP(v.typeUniverse,JSON.parse('{"eG":"bl","bM":"bl","bk":"bl","pk":"cd","t":{"y":["1"],"H":[],"m":["1"]},"en":{"x":[],"C":[]},"cR":{"C":[]},"cT":{"H":[]},"bl":{"H":[]},"em":{"dg":[]},"hp":{"t":["1"],"y":["1"],"H":[],"m":["1"]},"cB":{"Q":["1"]},"cb":{"q":[],"af":[],"ag":["af"]},"cQ":{"q":[],"i":[],"af":[],"ag":["af"],"C":[]},"eo":{"q":[],"af":[],"ag":["af"],"C":[]},"bj":{"v":[],"ag":["v"],"l7":[],"C":[]},"cn":{"m":["2"]},"cE":{"Q":["2"]},"dr":{"D":["2"],"y":["2"],"cn":["1","2"],"m":["2"]},"cF":{"dr":["1","2"],"D":["2"],"y":["2"],"cn":["1","2"],"m":["2"],"D.E":"2","m.E":"2"},"cV":{"L":[]},"aD":{"m":["1"]},"R":{"aD":["1"],"m":["1"]},"dj":{"R":["1"],"aD":["1"],"m":["1"],"R.E":"1","m.E":"1"},"ai":{"Q":["1"]},"d_":{"m":["2"],"m.E":"2"},"d0":{"Q":["2"]},"aj":{"R":["2"],"aD":["2"],"m":["2"],"R.E":"2","m.E":"2"},"a1":{"m":["1"],"m.E":"1"},"F":{"Q":["1"]},"df":{"R":["1"],"aD":["1"],"m":["1"],"R.E":"1","m.E":"1"},"al":{"br":[],"aQ":[]},"dA":{"br":[],"aQ":[]},"dB":{"br":[],"aQ":[]},"bT":{"cr":[],"aQ":[]},"cJ":{"dl":["1","2"],"cs":["1","2"],"cc":["1","2"],"dK":["1","2"],"as":["1","2"]},"cI":{"as":["1","2"]},"P":{"cI":["1","2"],"as":["1","2"]},"bP":{"m":["1"],"m.E":"1"},"bQ":{"Q":["1"]},"cK":{"b9":["1"],"bp":["1"],"m":["1"]},"aU":{"cK":["1"],"b9":["1"],"bp":["1"],"m":["1"]},"d7":{"ba":[],"L":[]},"ep":{"L":[]},"f4":{"L":[]},"dE":{"bq":[]},"bh":{"bB":[]},"e0":{"bB":[]},"e1":{"bB":[]},"f1":{"bB":[]},"eZ":{"bB":[]},"c4":{"bB":[]},"eQ":{"L":[]},"b3":{"bF":["1","2"],"kZ":["1","2"],"as":["1","2"]},"b5":{"aD":["1"],"m":["1"],"m.E":"1"},"cX":{"Q":["1"]},"aL":{"aD":["1"],"m":["1"],"m.E":"1"},"b6":{"Q":["1"]},"b4":{"aD":["aa<1,2>"],"m":["aa<1,2>"],"m.E":"aa<1,2>"},"cW":{"Q":["aa<1,2>"]},"br":{"aQ":[]},"cr":{"aQ":[]},"cd":{"H":[],"C":[]},"d5":{"H":[]},"ew":{"H":[],"C":[]},"a6":{"aq":["1"],"H":[]},"d3":{"D":["q"],"a6":["q"],"y":["q"],"aq":["q"],"H":[],"m":["q"],"ah":["q"]},"d4":{"D":["i"],"a6":["i"],"y":["i"],"aq":["i"],"H":[],"m":["i"],"ah":["i"]},"d2":{"ha":[],"D":["q"],"a6":["q"],"y":["q"],"aq":["q"],"H":[],"m":["q"],"ah":["q"],"C":[],"D.E":"q"},"ex":{"hb":[],"D":["q"],"a6":["q"],"y":["q"],"aq":["q"],"H":[],"m":["q"],"ah":["q"],"C":[],"D.E":"q"},"ey":{"D":["i"],"a6":["i"],"y":["i"],"aq":["i"],"H":[],"m":["i"],"ah":["i"],"C":[],"D.E":"i"},"ez":{"D":["i"],"a6":["i"],"y":["i"],"aq":["i"],"H":[],"m":["i"],"ah":["i"],"C":[],"D.E":"i"},"eA":{"D":["i"],"a6":["i"],"y":["i"],"aq":["i"],"H":[],"m":["i"],"ah":["i"],"C":[],"D.E":"i"},"eB":{"D":["i"],"a6":["i"],"y":["i"],"aq":["i"],"H":[],"m":["i"],"ah":["i"],"C":[],"D.E":"i"},"eC":{"D":["i"],"a6":["i"],"y":["i"],"aq":["i"],"H":[],"m":["i"],"ah":["i"],"C":[],"D.E":"i"},"d6":{"D":["i"],"a6":["i"],"y":["i"],"aq":["i"],"H":[],"m":["i"],"ah":["i"],"C":[],"D.E":"i"},"eD":{"dk":[],"D":["i"],"a6":["i"],"y":["i"],"aq":["i"],"H":[],"m":["i"],"ah":["i"],"C":[],"D.E":"i"},"fm":{"L":[]},"dF":{"ba":[],"L":[]},"bf":{"Q":["1"]},"bt":{"m":["1"],"m.E":"1"},"aB":{"L":[]},"dq":{"fh":["1"]},"U":{"bC":["1"]},"dO":{"lr":[]},"fw":{"dO":[],"lr":[]},"ds":{"bF":["1","2"],"as":["1","2"]},"dv":{"ds":["1","2"],"bF":["1","2"],"as":["1","2"]},"dt":{"aD":["1"],"m":["1"],"m.E":"1"},"du":{"Q":["1"]},"aP":{"b9":["1"],"l0":["1"],"bp":["1"],"m":["1"]},"bR":{"Q":["1"]},"bF":{"as":["1","2"]},"cc":{"as":["1","2"]},"dl":{"cs":["1","2"],"cc":["1","2"],"dK":["1","2"],"as":["1","2"]},"b9":{"bp":["1"],"m":["1"]},"dC":{"b9":["1"],"bp":["1"],"m":["1"]},"dm":{"b9":["1"],"fF":["1"],"bp":["1"],"m":["1"]},"bz":{"ag":["bz"]},"q":{"af":[],"ag":["af"]},"i":{"af":[],"ag":["af"]},"y":{"m":["1"]},"af":{"ag":["af"]},"bp":{"m":["1"]},"v":{"ag":["v"],"l7":[]},"dW":{"L":[]},"ba":{"L":[]},"aT":{"L":[]},"da":{"L":[]},"ej":{"L":[]},"dn":{"L":[]},"f3":{"L":[]},"ck":{"L":[]},"e2":{"L":[]},"di":{"L":[]},"fD":{"bq":[]},"at":{"b8":[]},"av":{"b8":[]},"aX":{"b8":[]},"b2":{"b8":[]},"eF":{"b8":[]},"bA":{"jY":[]},"bn":{"jY":[]},"eb":{"n6":[]},"cp":{"aE":[]},"db":{"n9":[]},"eO":{"nb":[]},"fE":{"aE":[]},"ft":{"n8":[]},"fn":{"mu":[]},"eR":{"nd":[]},"ao":{"ag":["ao"]},"am":{"ag":["am"]},"cC":{"B":[]},"ff":{"z":[]},"dY":{"B":[]},"fg":{"z":[]},"e4":{"B":[]},"fi":{"z":[]},"cL":{"B":[]},"fk":{"z":[]},"e7":{"B":[]},"fl":{"z":[]},"ei":{"B":[]},"fp":{"z":[]},"d1":{"B":[]},"fr":{"z":[]},"e_":{"n7":[]},"d9":{"B":[]},"fu":{"z":[]},"eM":{"B":[]},"fv":{"z":[]},"eU":{"B":[]},"fy":{"z":[]},"eV":{"B":[]},"fz":{"z":[]},"eY":{"B":[]},"fB":{"z":[]},"eX":{"B":[]},"fA":{"z":[]},"f7":{"B":[]},"fG":{"z":[]},"f8":{"B":[]},"fI":{"z":[]},"fH":{"z":[]},"fb":{"B":[]},"fL":{"z":[]},"f6":{"bE":["f"],"bE.T":"f"},"e5":{"mq":[]},"bg":{"aJ":[]},"f9":{"mw":[]},"mz":{"y":["i"],"m":["i"]},"dk":{"y":["i"],"m":["i"]},"ni":{"y":["i"],"m":["i"]},"mx":{"y":["i"],"m":["i"]},"ng":{"y":["i"],"m":["i"]},"my":{"y":["i"],"m":["i"]},"nh":{"y":["i"],"m":["i"]},"ha":{"y":["q"],"m":["q"]},"hb":{"y":["q"],"m":["q"]}}'))
A.nO(v.typeUniverse,JSON.parse('{"dP":2,"a6":1,"dC":1,"dL":1}'))
var u={l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",b:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nuniform vec3 uClearColor;\nuniform vec3 uSkyHorizon;\nuniform vec3 uSkyZenith;\nuniform vec3 uSkyGround;\nuniform float uSkyEnabled;\nuniform float uSkyHorizonGlow;\nuniform float uSkyStarDensity;\nuniform sampler2D uSkyTexture;\nuniform float uSkyTextureEnabled;\nuniform float uSkyRotation;\nuniform float uSkyExposure;\nuniform float uSkyTextureSrgb;\nuniform mat4 uInverseProjection;\nuniform mat4 uInverseView;\nuniform vec3 uCameraPosition;\nuniform float uCloudCoverage;\nuniform float uCloudDensity;\nuniform float uCloudBaseHeight;\nuniform float uCloudThickness;\nuniform float uCloudScale;\nuniform vec2 uCloudWind;\nuniform float uCloudPhase;\nuniform float uCloudDetail;\nuniform float uCloudSilverLining;\nuniform float uCloudSampleCount;\nuniform vec3 uCloudLightDirection;\nuniform vec3 uCloudLightColor;\nuniform float uCloudLightIntensity;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 acesToneMap(vec3 color){\n  return clamp((color*(2.51*color+0.03))/(color*(2.43*color+0.59)+0.14),0.0,1.0);\n}\n\nvec3 agxToneMap(vec3 color){\n  const mat3 agxMat=mat3(\n    0.842479062253094,0.0423282422610123,0.0423756549057051,\n    0.0784335999999992,0.878468636469772,0.0784336,\n    0.0792237451477643,0.0791661274605434,0.879142973793104\n  );\n  const mat3 agxMatInv=mat3(\n    1.19687902425764,-0.0528968517032958,-0.0529716355080549,\n    -0.0980208811401368,1.15190312990417,-0.0980434501171241,\n    -0.0990297440797205,-0.0989611768448433,1.15107367264185\n  );\n  vec3 val=agxMat*color;\n  val=clamp(log2(max(val,vec3(1e-10)))*0.0625+0.625,0.0,1.0);\n  val=val*val*val*(val*(val*6.0-15.0)+10.0);\n  val=agxMatInv*val;\n  return max(val,vec3(0.0));\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nvec3 skyBackground(vec2 uv){\n  // A deliberately cheap, high-quality fallback sky: three atmospheric bands\n  // provide depth at every camera angle, while the tiny deterministic star\n  // field and horizon glow keep the clear background from reading as a flat\n  // color. It is an environment layer, not a game/weather simulation.\n  float lower=smoothstep(0.0,0.48,uv.y);\n  float upper=smoothstep(0.42,1.0,uv.y);\n  vec3 color=mix(uSkyGround,uSkyHorizon,lower);\n  color=mix(color,uSkyZenith,upper);\n  float horizonGlow=exp(-pow((uv.y-0.48)*7.0,2.0));\n  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);\n  float starMask=smoothstep(0.62,0.92,uv.y);\n  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),hash(floor(uv*vec2(180.0,100.0))))*starMask;\n  color+=vec3(0.16,0.19,0.24)*stars;\n  return max(color,vec3(0.0));\n}\n\nfloat hash3(vec3 p){\n  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);\n}\n\nfloat valueNoise(vec3 p){\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  f=f*f*(3.0-2.0*f);\n  float n000=hash3(i+vec3(0,0,0));\n  float n100=hash3(i+vec3(1,0,0));\n  float n010=hash3(i+vec3(0,1,0));\n  float n110=hash3(i+vec3(1,1,0));\n  float n001=hash3(i+vec3(0,0,1));\n  float n101=hash3(i+vec3(1,0,1));\n  float n011=hash3(i+vec3(0,1,1));\n  float n111=hash3(i+vec3(1,1,1));\n  float x00=mix(n000,n100,f.x);\n  float x10=mix(n010,n110,f.x);\n  float x01=mix(n001,n101,f.x);\n  float x11=mix(n011,n111,f.x);\n  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);\n}\n\nfloat cloudNoise(vec3 p){\n  float value=0.0;\n  float amplitude=0.5;\n  for(int octave=0;octave<4;octave++){\n    value+=valueNoise(p)*amplitude;\n    p=p*2.03+vec3(17.3,11.7,7.1);\n    amplitude*=0.5;\n  }\n  return value;\n}\n\nfloat cloudDensityAt(vec3 position){\n  float height01=clamp(\n    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),\n    0.0,1.0\n  );\n  float vertical=smoothstep(0.0,0.12,height01)*\n    (1.0-smoothstep(0.72,1.0,height01));\n  vec3 q=position*max(uCloudScale,0.00001)+\n    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);\n  float macro=cloudNoise(q*0.82);\n  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));\n  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));\n  float threshold=1.0-clamp(uCloudCoverage,0.,1.);\n  float body=smoothstep(threshold,threshold+0.26,shape);\n  return body*vertical*clamp(uCloudDensity,0.,1.);\n}\n\nvec4 volumetricClouds(vec3 worldDirection){\n  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){\n    return vec4(0.0);\n  }\n  float directionY=max(worldDirection.y,0.001);\n  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;\n  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;\n  startT=max(startT,0.0);\n  endT=max(endT,0.0);\n  if(endT<=startT) return vec4(0.0);\n  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));\n  float stepLength=(endT-startT)/float(sampleCount);\n  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;\n  vec3 sunDirection=normalize(-uCloudLightDirection);\n  float transmittance=1.0;\n  vec3 inScatter=vec3(0.0);\n  for(int i=0;i<24;i++){\n    if(i>=sampleCount) break;\n    float t=startT+(float(i)+0.5)*stepLength+jitter;\n    vec3 position=uCameraPosition+worldDirection*t;\n    float density=cloudDensityAt(position);\n    float opticalDepth=density*stepLength*0.0035;\n    float segmentAlpha=1.0-exp(-opticalDepth);\n    float towardLight=cloudDensityAt(position+sunDirection*90.0);\n    float lightTransmittance=exp(-towardLight*0.025);\n    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);\n    vec3 ambient=uSkyHorizon*0.32;\n    vec3 direct=uCloudLightColor*\n      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;\n    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;\n    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);\n    inScatter+=transmittance*segmentAlpha*sampleLight;\n    transmittance*=1.0-segmentAlpha;\n    if(transmittance<0.01) break;\n  }\n  return vec4(inScatter,1.0-transmittance);\n}\n\nvec3 srgbToLinear(vec3 color){\n  vec3 low=color/12.92;\n  vec3 high=pow((color+0.055)/1.055,vec3(2.4));\n  return mix(low,high,step(vec3(0.04045),color));\n}\n\nvec3 worldDirectionForUv(vec2 uv){\n  vec2 ndc=uv*2.0-1.0;\n  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);\n  return normalize(viewPoint.xyz/viewPoint.w);\n}\n\nvec3 equirectangularSky(vec2 uv){\n  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);\n  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;\n  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));\n  vec2 sampleUv=vec2(\n    fract(longitude/(2.0*3.14159265359)+0.5),\n    0.5-latitude/3.14159265359\n  );\n  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));\n  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));\n  return linear*max(uSkyExposure,0.0);\n}\n\nvoid main(){\n  vec4 source=texture(uTex,vUv);\n  // The world pass clears untouched pixels to uClearColor. Replace only that\n  // exact background, so the sky is always active without covering geometry.\n  if(uSkyEnabled>0.5 && distance(source.rgb,uClearColor)<0.004){\n    vec3 viewDirection=worldDirectionForUv(vUv);\n    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);\n    source.rgb=uSkyTextureEnabled>0.5\n      ? equirectangularSky(vUv)\n      : skyBackground(vUv);\n    vec4 clouds=volumetricClouds(worldDirection);\n    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;\n  }\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  vec3 mapped=uToneMap>3.0\n    ?agxToneMap(color)\n    :(uToneMap>1.5?acesToneMap(color):reinhardToneMap(color));\n  float toneMix=uToneMap>3.0\n    ?clamp(uToneMap-3.0,0.,1.)\n    :(uToneMap>1.5?clamp(uToneMap-1.5,0.,1.):clamp(uToneMap,0.,1.));\n  color=mix(color,mapped,toneMix);\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  // Atmospheric precipitation is submitted as depth-tested world geometry;\n  // the present pass must never paint weather over unrelated surfaces.\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",k:"WebGl2Device: operation attempted while context is not ready"}
var t=(function rtii(){var s=A.bv
return{v:s("aB"),g0:s("am"),fW:s("dZ"),do:s("c5"),e8:s("ag<@>"),dN:s("cH"),I:s("P<v,i>"),P:s("aU<v>"),df:s("bz"),Q:s("L"),B:s("ha"),gN:s("hb"),o:s("T"),Z:s("bB"),j:s("aJ"),gL:s("b2"),cr:s("m<cH>"),bM:s("m<q>"),hf:s("m<@>"),J:s("t<aJ>"),b7:s("t<a9>"),gk:s("t<bD>"),e9:s("t<bE<@>>"),cU:s("t<E>"),dV:s("t<bI>"),h:s("t<bo>"),eT:s("t<cf>"),cw:s("t<+influence,light(q,ap)>"),gg:s("t<+influence,source(q,dp)>"),q:s("t<B>"),u:s("t<z>"),cR:s("t<db>"),C:s("t<n>"),c4:s("t<bK>"),r:s("t<aE>"),D:s("t<ci>"),aM:s("t<W<am>>"),c1:s("t<W<ao>>"),w:s("t<ap>"),s:s("t<v>"),gi:s("t<f>"),E:s("t<dp>"),cL:s("t<fs>"),ha:s("t<bs<bG>>"),c9:s("t<bs<bm>>"),aO:s("t<bs<bK>>"),fq:s("t<bs<b_>>"),n:s("t<q>"),gn:s("t<@>"),t:s("t<i>"),T:s("cR"),m:s("H"),cj:s("bk"),aU:s("aq<@>"),a3:s("bE<@>"),b:s("aV<f>"),_:s("y<a9>"),O:s("y<E>"),dy:s("y<v>"),aH:s("y<@>"),bW:s("y<i>"),ao:s("aa<v,T>"),bS:s("as<v,aJ>"),a1:s("as<v,E>"),eL:s("aX"),cA:s("at"),a:s("Y"),K:s("w"),fy:s("ao"),z:s("E"),eD:s("cf"),W:s("au"),gT:s("pl"),bQ:s("+()"),ai:s("+(at,bm)"),dU:s("+(av,b_)"),fk:s("+influence,light(q,ap)"),eS:s("+influence,source(q,dp)"),fA:s("z"),b0:s("aZ<b2,bK>"),ex:s("aZ<aX,bG>"),cE:s("aZ<at,bm>"),g2:s("aZ<av,b_>"),L:s("n"),Y:s("aE"),U:s("bp<v>"),cJ:s("bp<i>"),c:s("W<am>"),k:s("W<ao>"),l:s("bq"),d5:s("ab"),N:s("v"),aj:s("av"),dm:s("C"),eK:s("ba"),ak:s("bM"),am:s("dm<v>"),bw:s("f5"),fP:s("f"),G:s("ac"),fl:s("a1<ac>"),an:s("F<ac>"),f:s("cm"),d:s("U<@>"),cd:s("U<~>"),hg:s("dv<w?,w?>"),cm:s("cp"),a8:s("cq"),V:s("dM"),R:s("dN"),y:s("x"),al:s("x(w)"),fg:s("x(ac)"),i:s("q"),A:s("@"),fO:s("@()"),x:s("@(w)"),e:s("@(w,bq)"),S:s("i"),eB:s("e6?"),eH:s("bC<Y>?"),du:s("t<w?>?"),bX:s("H?"),c3:s("y<bo>?"),X:s("w?"),ac:s("d8?"),bG:s("eW?"),dk:s("v?"),aD:s("dk?"),F:s("bO<@,@>?"),g:s("fq?"),fQ:s("x?"),cD:s("q?"),h6:s("i?"),cg:s("af?"),a4:s("~(c7)?"),p:s("af"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.bP=J.ek.prototype
B.a=J.t.prototype
B.d=J.cQ.prototype
B.c=J.cb.prototype
B.t=J.bj.prototype
B.bQ=J.bk.prototype
B.bR=J.cT.prototype
B.a3=A.d2.prototype
B.aL=J.eG.prototype
B.am=J.bM.prototype
B.e9=new A.fR(0,"opaque")
B.I=new A.fV(0,"add")
B.b8=new A.c3(0,"zero")
B.H=new A.c3(1,"one")
B.U=new A.fW(0,"alpha")
B.ea=new A.h3()
B.G=new A.f(0.6,-1,0.4)
B.aB=new A.K(1,0.95,0.88)
B.bb=new A.e6()
B.ap=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.bc=function() {
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
B.bh=function(getTagFallback) {
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
B.bd=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.bg=function(hooks) {
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
B.bf=function(hooks) {
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
B.be=function(hooks) {
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
B.aq=function(hooks) { return hooks; }

B.B=new A.w()
B.j=new A.ih()
B.aC=new A.K(0.12,0.16,0.24)
B.c6=new A.K(0.03,0.06,0.14)
B.aD=new A.K(0.015,0.02,0.03)
B.bi=new A.eW()
B.k=new A.f(0,1,0)
B.p=new A.f(0,-1,0)
B.Q=new A.K(1,1,1)
B.bj=new A.ap()
B.dV=new A.bd(0,"position")
B.e_=new A.ac(B.dV,0,3)
B.b5=new A.bd(1,"normal")
B.e0=new A.ac(B.b5,3,3)
B.ao=new A.bd(6,"tangent4")
B.e4=new A.ac(B.ao,6,4)
B.dW=new A.bd(2,"color")
B.e1=new A.ac(B.dW,10,4)
B.dX=new A.bd(4,"alpha")
B.e2=new A.ac(B.dX,14,1)
B.dY=new A.bd(5,"uv0")
B.e3=new A.ac(B.dY,15,2)
B.dZ=new A.bd(8,"legacyMaterialEffect")
B.e5=new A.ac(B.dZ,17,1)
B.C=s([B.e_,B.e0,B.e4,B.e1,B.e2,B.e3,B.e5],A.bv("t<ac>"))
B.bk=new A.ir()
B.bl=new A.iw()
B.q=new A.fw()
B.J=new A.fD()
B.v=new A.cG(0,"colorOnly")
B.ar=new A.cG(1,"colorAndDepth")
B.V=new A.cG(2,"depthOnly")
B.W=new A.fY(1,"srgb")
B.K=new A.h0(1,"back")
B.L=new A.h4(0,"less")
B.M=new A.cM(0,"opaque")
B.bm=new A.cM(1,"masked")
B.X=new A.cM(2,"blended")
B.as=new A.c6(!1,B.L,!1,!0,B.H,B.H,B.I,!1,B.K,!0,!1,!0,!0,!0,!0,!1)
B.bn=new A.c6(!0,B.L,!1,!0,B.H,B.H,B.I,!0,B.K,!0,!1,!0,!0,!0,!0,!1)
B.b9=new A.c3(2,"srcAlpha")
B.ba=new A.c3(3,"oneMinusSrcAlpha")
B.bo=new A.c6(!0,B.L,!1,!0,B.b9,B.ba,B.I,!0,B.K,!0,!1,!0,!0,!0,!0,!1)
B.c0=new A.K(0.03,0.03,0.04)
B.w=new A.K(0,0,0)
B.ci=s([],t.h)
B.a1=s([],t.w)
B.cj=s([],t.E)
B.ck=s([],A.bv("t<pn>"))
B.bp=new A.ea(B.c0,B.w,0,1,null,null,B.Q,0.02,0,0.7,0.35,1,12,1,1,1,1,1,1,1,0.003,B.w,0,0,B.Q,0,null,B.ci,B.a1,B.cj,B.ck,null)
B.bq=new A.T(0,0,0)
B.br=new A.c8(0,"idle")
B.N=new A.c8(1,"active")
B.bs=new A.c8(2,"ended")
B.bt=new A.c8(3,"aborted")
B.at=new A.cO(0,"outside")
B.bu=new A.cO(1,"intersects")
B.bv=new A.cO(2,"inside")
B.bw=new A.ed(0,"vertex")
B.au=new A.ed(1,"indices")
B.av=new A.hj(0,"staticDraw")
B.f=new A.ee(0,"ready")
B.O=new A.ee(1,"lost")
B.bx=new A.c9(0,"color")
B.aw=new A.c9(1,"colorAndGlow")
B.by=new A.c9(2,"colorDepthGlow")
B.Y=new A.c9(3,"depthOnly")
B.Z=new A.eg(1,"linear")
B.bB=new A.eh(0,"clampToEdge")
B.bz=new A.ef(1,1,1,!1,B.Z,B.Z,B.bB,1)
B.bA=new A.eg(2,"linearMipmapLinear")
B.bC=new A.eh(1,"repeat")
B.bD=new A.b1(0,"beforeShadow")
B.bE=new A.b1(2,"beforeDepth")
B.a_=new A.b1(3,"afterDepth")
B.ax=new A.b1(4,"beforeWorld")
B.bF=new A.b1(5,"afterWorld")
B.r=new A.b1(6,"afterResolve")
B.bG=new A.b1(9,"beforePresent")
B.ay=new A.aK(0,"readBeforeWrite")
B.bH=new A.aK(1,"duplicateWriter")
B.bI=new A.aK(2,"sampledMultisampledAttachment")
B.a0=new A.aK(3,"invalidResolve")
B.bJ=new A.aK(4,"formatOrSizeMismatch")
B.bK=new A.aK(5,"unversionedReadWrite")
B.bL=new A.aK(6,"invalidHistoryRead")
B.bM=new A.aK(7,"dependencyCycle")
B.bN=new A.aK(8,"missingCapability")
B.az=new A.ca(0,"wrongKind")
B.aA=new A.ca(1,"staleGeneration")
B.bO=new A.ca(2,"doubleRelease")
B.P=new A.ca(3,"releasedResource")
B.eb=new A.K(0.25,0.55,1)
B.bV=new A.K(0.06,0.08,0.12)
B.bW=new A.K(1,0.25,0.25)
B.ec=new A.K(0.06,0.08,0.11)
B.bX=new A.K(0.22,0.48,0.95)
B.bY=new A.K(0.95,0.12,0.22)
B.bZ=new A.K(0.25,0.5,1)
B.c_=new A.K(0.04,0.05,0.07)
B.c1=new A.K(0.1,0.85,0.45)
B.c2=new A.K(0.18,0.42,0.98)
B.c3=new A.K(0.2,1,0.45)
B.c4=new A.K(1,0.85,0.35)
B.c5=new A.K(0.98,0.12,0.22)
B.c7=new A.K(0.1,0.88,0.42)
B.c8=new A.K(0.7,0.8,1)
B.c9=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.ca=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale","uShadowMapTexelSize","uShadowFilterRadius","uShadowBias","uReflectionColor","uReflectionIntensity","uReflectionConfidence","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uSpecularScale","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness","uSurfaceSnowCoverage","uSurfaceDissolution","uThermalSourceCount","uThermalSourcePosition0","uThermalSourceRadius0","uThermalSourceDissolution0","uThermalSourcePosition1","uThermalSourceRadius1","uThermalSourceDissolution1","uThermalSourcePosition2","uThermalSourceRadius2","uThermalSourceDissolution2","uThermalSourcePosition3","uThermalSourceRadius3","uThermalSourceDissolution3"],t.s)
B.cb=s(["uQuantizationBits","uDitherStrength"],t.s)
B.cc=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.cd=s(["uNear","uFar","uLightDir","uLightColor","uShaftIntensity","uFogDensity","uAnisotropy","uViewProjection","uView","uInverseProjection","uVolumetricAlbedo","uVolumetricHeightFalloff","uVolumetricDustDensity","uVolumetricJitter","uVolumetricIntensity","uVolumetricSampleCount"],t.s)
B.ce=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.cf=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.b4=new A.f(0,0.35,0)
B.eh=new A.iF(A.oK())
B.bU=new A.aV(0,B.b4,t.b)
B.dT=new A.f(0,0.65,0)
B.bT=new A.aV(2,B.dT,t.b)
B.bS=new A.aV(4,B.b4,t.b)
B.aE=s([B.bU,B.bT,B.bS],A.bv("t<aV<f>>"))
B.cg=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale"],t.s)
B.ch=s([],t.u)
B.a4=new A.cg(2,"high")
B.cN={shadows:0,ssao:1,bloom:2,dof:3,grade:4,volumetric:5}
B.dn=new A.aU(B.cN,6,t.P)
B.d3=new A.au(B.a4,B.dn)
B.cG={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.dk=new A.aU(B.cG,5,t.P)
B.aO=new A.au(B.a4,B.dk)
B.d0=new A.cg(1,"standard")
B.cO={shadows:0}
B.dp=new A.aU(B.cO,1,t.P)
B.d2=new A.au(B.d0,B.dp)
B.aM=new A.cg(0,"safe")
B.aK={}
B.a9=new A.aU(B.aK,0,t.P)
B.aN=new A.au(B.aM,B.a9)
B.a2=s([B.d3,B.aO,B.d2,B.aN],A.bv("t<au>"))
B.cl=s(["uExposure","uVignette","uGrain","uOutputEncoding","uToneMap","uClearColor","uSkyHorizon","uSkyZenith","uSkyGround","uSkyEnabled","uSkyHorizonGlow","uSkyStarDensity","uSkyTexture","uSkyTextureEnabled","uSkyRotation","uSkyExposure","uSkyTextureSrgb","uInverseProjection","uInverseView","uCameraPosition","uCloudCoverage","uCloudDensity","uCloudBaseHeight","uCloudThickness","uCloudScale","uCloudWind","uCloudPhase","uCloudDetail","uCloudSilverLining","uCloudSampleCount","uCloudLightDirection","uCloudLightColor","uCloudLightIntensity"],t.s)
B.aa=new A.ab(0,"depthTest")
B.ab=new A.ab(1,"depthFunc")
B.ac=new A.ab(2,"depthWrite")
B.ad=new A.ab(3,"blendEnable")
B.ae=new A.ab(4,"blendFunc")
B.af=new A.ab(5,"blendEquation")
B.ag=new A.ab(6,"cullEnable")
B.ah=new A.ab(7,"cullFace")
B.aW=new A.ab(8,"frontFace")
B.dt=new A.ab(9,"stencilEnable")
B.aU=new A.ab(10,"colorMask")
B.aV=new A.ab(11,"scissorEnable")
B.cm=s([B.aa,B.ab,B.ac,B.ad,B.ae,B.af,B.ag,B.ah,B.aW,B.dt,B.aU,B.aV],A.bv("t<ab>"))
B.cn=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.co=s(["uBloomStrength"],t.s)
B.cp=s(["uLutSize","uStrength"],t.s)
B.cq=s(["uTexelSize","uNear","uFar"],t.s)
B.aF=s(["uTexelStep"],t.s)
B.cr=s(["uVolumetricStrength"],t.s)
B.cs=new A.es(0,"once")
B.ct=new A.es(1,"loop")
B.cP={uAlbedo:0}
B.aG=new A.P(B.cP,[0],t.I)
B.cW={uSsaoRaw:0,uSceneDepth:1}
B.cu=new A.P(B.cW,[0,1],t.I)
B.cT={uScene:0,uHistory:1}
B.cv=new A.P(B.cT,[0,1],t.I)
B.cK={aPosition:0,aUvMat:1}
B.aH=new A.P(B.cK,[0,4],t.I)
B.cU={uScene:0,uLut:1}
B.cw=new A.P(B.cU,[0,1],t.I)
B.cV={uSource:0}
B.aI=new A.P(B.cV,[0],t.I)
B.cM={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.cx=new A.P(B.cM,[0,1,2,3,4,5,6],t.I)
B.cI={uSharp:0,uBlurred:1,uSceneDepth:2}
B.cy=new A.P(B.cI,[0,1,2],t.I)
B.cX={uTex:0,uSkyTexture:1}
B.cz=new A.P(B.cX,[0,1],t.I)
B.cQ={uBloom:0}
B.cA=new A.P(B.cQ,[0],t.I)
B.cR={uSceneDepth:0}
B.aJ=new A.P(B.cR,[0],t.I)
B.cS={uScene:0}
B.cB=new A.P(B.cS,[0],t.I)
B.o=new A.P(B.aK,[],t.I)
B.cF={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.cC=new A.P(B.cF,[0,1,2,3,4,5,6],t.I)
B.cY={uVolumetric:0}
B.cD=new A.P(B.cY,[0],t.I)
B.cL={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.cE=new A.P(B.cL,[0,1,2,3],t.I)
B.ed=new A.eu(0,"srgb")
B.ee=new A.eu(1,"linear")
B.cZ=new A.eF(0,1,null)
B.ai=new A.cl(1,"reinhard")
B.d_=new A.eH(1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,8,0,0,0,0,0,0,!1,B.ai)
B.d1=new A.cg(4,"shipping")
B.cH={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.dm=new A.aU(B.cH,7,t.P)
B.ef=new A.au(B.d1,B.dm)
B.D=new A.bJ(0,0,0,1)
B.a5=new A.ch(0,"constructed")
B.d4=new A.ch(1,"initializing")
B.a6=new A.ch(2,"ready")
B.a7=new A.ch(3,"contextLost")
B.e=new A.de(0,"read")
B.h=new A.de(1,"write")
B.u=new A.de(2,"historyRead")
B.m=new A.eN(0,"rgba8")
B.d5=new A.O("dofBlurH",B.m,192,108,1,0)
B.d6=new A.O("dofBlurV",B.m,192,108,1,0)
B.d7=new A.O("dofOutput",B.m,384,216,1,0)
B.aP=new A.eN(2,"depth24")
B.d8=new A.O("shadowMap",B.aP,512,512,1,0)
B.d9=new A.O("volumetricLight",B.m,192,108,1,0)
B.da=new A.O("sceneColor",B.m,384,216,1,1)
B.db=new A.O("ssaoRaw",B.m,192,108,1,0)
B.dc=new A.O("ssaoBlurred",B.m,192,108,1,0)
B.dd=new A.O("gradeOutput",B.m,384,216,1,0)
B.de=new A.O("vhsOutput",B.m,384,216,1,0)
B.df=new A.O("sceneDepth",B.aP,384,216,1,0)
B.dg=new A.O("bloomBlurH",B.m,192,108,1,0)
B.dh=new A.O("bloomBlurV",B.m,192,108,1,0)
B.di=new A.O("present",B.m,384,216,1,0)
B.a8=new A.O("sceneColor",B.m,384,216,1,0)
B.dj=new A.O("ps1Output",B.m,384,216,1,0)
B.cJ={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8,volumetric:9}
B.dl=new A.aU(B.cJ,10,t.P)
B.aS=new A.cj(2,"link")
B.dq=new A.dh(B.aS,"gl.createProgram() returned null")
B.aQ=new A.cj(0,"vertex")
B.aR=new A.cj(1,"fragment")
B.aT=new A.cj(3,"validation")
B.dr=new A.eT(0,"full")
B.ds=new A.eT(2,"culled")
B.aX=new A.cl(0,"off")
B.du=new A.cl(2,"aces")
B.aj=new A.cl(3,"agx")
B.y=new A.f(0,0,0)
B.ak=new A.aw(B.y,B.D,1)
B.dv=A.aH("pb")
B.dw=A.aH("pc")
B.dx=A.aH("ha")
B.dy=A.aH("hb")
B.dz=A.aH("mx")
B.dA=A.aH("my")
B.dB=A.aH("mz")
B.dC=A.aH("H")
B.dD=A.aH("w")
B.dE=A.aH("ng")
B.dF=A.aH("nh")
B.dG=A.aH("ni")
B.dH=A.aH("dk")
B.b=new A.bc(0,"float1")
B.E=new A.bc(1,"float2")
B.i=new A.bc(2,"float3")
B.dI=new A.bc(3,"float4")
B.l=new A.bc(4,"mat4")
B.aY=new A.bc(5,"mat4Array")
B.al=new A.e(B.b,0)
B.aZ=new A.e(B.b,1)
B.x=new A.bc(6,"sampler")
B.n=new A.e(B.x,0)
B.F=new A.e(B.x,1)
B.b_=new A.e(B.x,2)
B.dJ=new A.e(B.x,3)
B.dK=new A.e(B.x,4)
B.dL=new A.e(B.x,5)
B.dM=new A.e(B.x,6)
B.an=new A.S(0.5,0.5)
B.b0=new A.f(0,0,1)
B.b1=new A.f(0,0,-1)
B.dN=new A.f(0,1,1)
B.b2=new A.f(0,2,5)
B.dO=new A.f(0,2,7)
B.z=new A.f(1,0,0)
B.dP=new A.f(1,0,1)
B.dQ=new A.f(1,1,0)
B.dR=new A.f(1/0,1/0,1/0)
B.dS=new A.f(1,0.3,0.2)
B.R=new A.f(0,0.5,0)
B.b3=new A.f(0,-0.2,-1)
B.A=new A.f(-1,0,0)
B.dU=new A.f(-1/0,-1/0,-1/0)
B.eg=new A.iq(0,"position")
B.b6=new A.fe(0,"horizontal")
B.e6=new A.fe(1,"vertical")
B.b7=new A.fj(0,"horizontal")
B.e7=new A.fj(1,"vertical")
B.S=new A.dD(0,"empty")
B.e8=new A.dD(1,"cpuReady")
B.T=new A.dD(4,"released")})();(function staticFields(){$.iR=null
$.ay=A.d([],A.bv("t<w>"))
$.l9=null
$.kN=null
$.kM=null
$.lY=null
$.lT=null
$.m_=null
$.jv=null
$.jB=null
$.kz=null
$.iT=A.d([],A.bv("t<y<w>?>"))
$.ct=null
$.dR=null
$.dS=null
$.kq=!1
$.M=B.q})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"pe","m4",()=>A.jx("_$dart_dartClosure"))
s($,"pd","kD",()=>A.jx("_$dart_dartClosure_dartJSInterop"))
s($,"pA","mf",()=>A.d([new J.em()],A.bv("t<dg>")))
s($,"po","m5",()=>A.bb(A.ip({
toString:function(){return"$receiver$"}})))
s($,"pp","m6",()=>A.bb(A.ip({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"pq","m7",()=>A.bb(A.ip(null)))
s($,"pr","m8",()=>A.bb(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"pu","mb",()=>A.bb(A.ip(void 0)))
s($,"pv","mc",()=>A.bb(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"pt","ma",()=>A.bb(A.lg(null)))
s($,"ps","m9",()=>A.bb(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"px","me",()=>A.bb(A.lg(void 0)))
s($,"pw","md",()=>A.bb(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"py","kJ",()=>A.nv())
s($,"pz","dU",()=>A.fO(B.dD))
s($,"pa","m3",()=>B.a8.ci())
s($,"pj","kI",()=>A.eE(A.d([255,255,255,255],t.t)))
s($,"pg","kF",()=>A.eE(A.d([128,128,255,255],t.t)))
s($,"pf","kE",()=>A.eE(A.d([0,0,0,255],t.t)))
s($,"ph","kG",()=>A.eE(A.d([255,255,0,255],t.t)))
s($,"pi","kH",()=>A.eE(A.d([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.cd,SharedArrayBuffer:A.cd,ArrayBufferView:A.d5,DataView:A.ew,Float32Array:A.d2,Float64Array:A.ex,Int16Array:A.ey,Int32Array:A.ez,Int8Array:A.eA,Uint16Array:A.eB,Uint32Array:A.eC,Uint8ClampedArray:A.d6,CanvasPixelArray:A.d6,Uint8Array:A.eD})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.a6.$nativeSuperclassTag="ArrayBufferView"
A.dw.$nativeSuperclassTag="ArrayBufferView"
A.dx.$nativeSuperclassTag="ArrayBufferView"
A.d3.$nativeSuperclassTag="ArrayBufferView"
A.dy.$nativeSuperclassTag="ArrayBufferView"
A.dz.$nativeSuperclassTag="ArrayBufferView"
A.d4.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$6=function(a,b,c,d,e,f){return this(a,b,c,d,e,f)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.jC
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
