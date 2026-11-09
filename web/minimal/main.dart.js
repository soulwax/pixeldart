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
if(a[b]!==s){A.pb(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.e(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.k0(b)
return new s(c,this)}:function(){if(s===null)s=A.k0(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.k0(a).prototype
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
k6(a,b,c,d){return{i:a,p:b,e:c,x:d}},
k2(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.k4==null){A.oW()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.c(A.kI("Return interceptor for "+A.p(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.ii
if(o==null)o=$.ii=A.j2(n)
p=q[o]}if(p!=null)return p
p=A.p0(a)
if(p!=null)return p
if(typeof a=="function")return B.bn
s=Object.getPrototypeOf(a)
if(s==null)return B.ax
if(s===Object.prototype)return B.ax
if(typeof q=="function"){o=$.ii
if(o==null)o=$.ii=A.j2(n)
Object.defineProperty(q,o,{value:B.a6,enumerable:false,writable:true,configurable:true})
return B.a6}return B.a6},
kn(a,b){if(a<0||a>4294967295)throw A.c(A.am(a,0,4294967295,"length",null))
return J.jA(new Array(a),b)},
ko(a,b){if(a<0)throw A.c(A.o("Length must be a non-negative integer: "+a,null))
return A.e(new Array(a),b.h("u<0>"))},
jz(a,b){if(a<0)throw A.c(A.o("Length must be a non-negative integer: "+a,null))
return A.e(new Array(a),b.h("u<0>"))},
jA(a,b){var s=A.e(a,b.h("u<0>"))
s.$flags=1
return s},
mo(a,b){var s=t.gb
return J.ju(s.a(a),s.a(b))},
bP(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cA.prototype
return J.ed.prototype}if(typeof a=="string")return J.bf.prototype
if(a==null)return J.cB.prototype
if(typeof a=="boolean")return J.ec.prototype
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bg.prototype
if(typeof a=="symbol")return J.cE.prototype
if(typeof a=="bigint")return J.cC.prototype
return a}if(a instanceof A.w)return a
return J.k2(a)},
ci(a){if(typeof a=="string")return J.bf.prototype
if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bg.prototype
if(typeof a=="symbol")return J.cE.prototype
if(typeof a=="bigint")return J.cC.prototype
return a}if(a instanceof A.w)return a
return J.k2(a)},
fy(a){if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bg.prototype
if(typeof a=="symbol")return J.cE.prototype
if(typeof a=="bigint")return J.cC.prototype
return a}if(a instanceof A.w)return a
return J.k2(a)},
oR(a){if(typeof a=="number")return J.bX.prototype
if(typeof a=="string")return J.bf.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bD.prototype
return a},
oS(a){if(typeof a=="string")return J.bf.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bD.prototype
return a},
b9(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bP(a).T(a,b)},
jt(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.oZ(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.ci(a).m(a,b)},
dJ(a,b,c){return J.fy(a).p(a,b,c)},
fz(a,b){return J.fy(a).i(a,b)},
ju(a,b){return J.oR(a).N(a,b)},
jv(a,b){return J.fy(a).O(a,b)},
L(a){return J.bP(a).gB(a)},
a_(a){return J.fy(a).gu(a)},
ba(a){return J.ci(a).gn(a)},
dK(a){return J.bP(a).gE(a)},
m2(a,b){return J.oS(a).aD(a,b)},
aR(a){return J.bP(a).j(a)},
ea:function ea(){},
ec:function ec(){},
cB:function cB(){},
cD:function cD(){},
bh:function bh(){},
eq:function eq(){},
bD:function bD(){},
bg:function bg(){},
cC:function cC(){},
cE:function cE(){},
u:function u(a){this.$ti=a},
eb:function eb(){},
h8:function h8(a){this.$ti=a},
cl:function cl(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bX:function bX(){},
cA:function cA(){},
ed:function ed(){},
bf:function bf(){}},A={jB:function jB(){},
kp(a){return new A.cF("Field '"+a+"' has been assigned during initialization.")},
mp(a){return new A.cF("Field '"+a+"' has not been initialized.")},
j3(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
X(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
eI(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
bp(a,b,c){return a},
k5(a){var s,r
for(s=$.ar.length,r=0;r<s;++r)if(a===$.ar[r])return!0
return!1},
eH(a,b,c,d){A.ev(b,"start")
if(c!=null){A.ev(c,"end")
if(b>c)A.l(A.am(b,0,c,"start",null))}return new A.d5(a,b,c,d.h("d5<0>"))},
ks(a,b,c,d){if(t.gw.b(a))return new A.cv(a,b,c.h("@<0>").G(d).h("cv<1,2>"))
return new A.aC(a,b,c.h("@<0>").G(d).h("aC<1,2>"))},
jx(){return new A.c5("No element")},
mm(){return new A.c5("Too many elements")},
c7:function c7(){},
cn:function cn(a,b){this.a=a
this.$ti=b},
db:function db(){},
co:function co(a,b){this.a=a
this.$ti=b},
cF:function cF(a){this.a=a},
dU:function dU(a){this.a=a},
hJ:function hJ(){},
q:function q(){},
N:function N(){},
d5:function d5(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ad:function ad(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aC:function aC(a,b,c){this.a=a
this.b=b
this.$ti=c},
cv:function cv(a,b,c){this.a=a
this.b=b
this.$ti=c},
cK:function cK(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
aY:function aY(a,b,c){this.a=a
this.b=b
this.$ti=c},
a2:function a2(a,b,c){this.a=a
this.b=b
this.$ti=c},
G:function G(a,b,c){this.a=a
this.b=b
this.$ti=c},
aa:function aa(){},
bE:function bE(){},
c6:function c6(){},
d1:function d1(a,b){this.a=a
this.$ti=b},
dC:function dC(){},
kk(a,b,c){var s,r,q,p,o,n,m,l=A.t(a),k=A.hb(new A.by(a,l.h("by<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.A)(k),++i,p=o){r=k[i]
c.a(a.m(0,r))
o=p+1
q[r]=p}n=A.hb(new A.aB(a,l.h("aB<2>")),!0,c)
m=new A.I(q,n,b.h("@<0>").G(c).h("I<1,2>"))
m.$keys=k
return m}return new A.cs(A.ms(a,b,c),b.h("@<0>").G(c).h("cs<1,2>"))},
ma(){throw A.c(A.aM("Cannot modify unmodifiable Map"))},
mb(){throw A.c(A.aM("Cannot modify constant Set"))},
lL(a){var s=A.lK(a)
if(s!=null)return s
return"minified:"+a},
oZ(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
p(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.aR(a)
return s},
es(a){var s,r=$.kx
if(r==null)r=$.kx=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
ky(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.h(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
et(a){var s,r,q,p
if(a instanceof A.w)return A.aq(A.bs(a),null)
s=J.bP(a)
if(s===B.bm||s===B.bo||t.ak.b(a)){r=B.a9(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aq(A.bs(a),null)},
kz(a){var s,r,q
if(a==null||typeof a=="number"||A.jW(a))return J.aR(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bc)return a.j(0)
if(a instanceof A.b4)return a.c6(!0)
s=$.m1()
for(r=0;r<1;++r){q=s[r].es(a)
if(q!=null)return q}return"Instance of '"+A.et(a)+"'"},
mz(){if(!!self.location)return self.location.href
return null},
mI(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
bB(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.i.b8(s,10)|55296)>>>0,s&1023|56320)}}throw A.c(A.am(a,0,1114111,null,null))},
c1(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mH(a){var s=A.c1(a).getUTCFullYear()+0
return s},
mF(a){var s=A.c1(a).getUTCMonth()+1
return s},
mB(a){var s=A.c1(a).getUTCDate()+0
return s},
mC(a){var s=A.c1(a).getUTCHours()+0
return s},
mE(a){var s=A.c1(a).getUTCMinutes()+0
return s},
mG(a){var s=A.c1(a).getUTCSeconds()+0
return s},
mD(a){var s=A.c1(a).getUTCMilliseconds()+0
return s},
mA(a){var s=a.$thrownJsError
if(s==null)return null
return A.cj(s)},
kA(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.Q(a,s)
a.$thrownJsError=s
s.stack=b.j(0)}},
oU(a){throw A.c(A.k_(a))},
h(a,b){if(a==null)J.ba(a)
throw A.c(A.j0(a,b))},
j0(a,b){var s,r="index"
if(!A.lq(b))return new A.aH(!0,b,r,null)
s=A.a(J.ba(a))
if(b<0||b>=s)return A.h7(b,s,a,r)
return new A.cW(null,null,!0,b,r,"Value not in range")},
k_(a){return new A.aH(!0,a,null,null)},
bq(a){return a},
c(a){return A.Q(a,new Error())},
Q(a,b){var s
if(a==null)a=new A.b1()
b.dartException=a
s=A.pc
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
pc(){return J.aR(this.dartException)},
l(a,b){throw A.Q(a,b==null?new Error():b)},
aG(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.l(A.o2(a,b,c),s)},
o2(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.d8("'"+s+"': Cannot "+o+" "+l+k+n)},
A(a){throw A.c(A.at(a))},
b2(a){var s,r,q,p,o,n
a=A.p4(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.e([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.hO(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
hP(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
kH(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jC(a,b){var s=b==null,r=s?null:b.method
return new A.ee(a,r,s?null:b.receiver)},
b8(a){var s
if(a==null)return new A.hm(a)
if(a instanceof A.cw){s=a.a
return A.bt(a,s==null?A.dE(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bt(a,a.dartException)
return A.oD(a)},
bt(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
oD(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.i.b8(r,16)&8191)===10)switch(q){case 438:return A.bt(a,A.jC(A.p(s)+" (Error "+q+")",null))
case 445:case 5007:A.p(s)
return A.bt(a,new A.cS())}}if(a instanceof TypeError){p=$.lO()
o=$.lP()
n=$.lQ()
m=$.lR()
l=$.lU()
k=$.lV()
j=$.lT()
$.lS()
i=$.lX()
h=$.lW()
g=p.a1(s)
if(g!=null)return A.bt(a,A.jC(A.aO(s),g))
else{g=o.a1(s)
if(g!=null){g.method="call"
return A.bt(a,A.jC(A.aO(s),g))}else if(n.a1(s)!=null||m.a1(s)!=null||l.a1(s)!=null||k.a1(s)!=null||j.a1(s)!=null||m.a1(s)!=null||i.a1(s)!=null||h.a1(s)!=null){A.aO(s)
return A.bt(a,new A.cS())}}return A.bt(a,new A.eN(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.d4()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bt(a,new A.aH(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.d4()
return a},
cj(a){var s
if(a instanceof A.cw)return a.b
if(a==null)return new A.dn(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.dn(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
jh(a){if(a==null)return J.L(a)
if(typeof a=="object")return A.es(a)
return J.L(a)},
oP(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.p(0,a[s],a[r])}return b},
oQ(a,b){var s,r=a.length
for(s=0;s<r;++s)b.i(0,a[s])
return b},
of(a,b,c,d,e,f){t.Z.a(a)
switch(A.a(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.c(new A.i3("Unsupported number of arguments for wrapped closure"))},
ch(a,b){var s=a.$identity
if(!!s)return s
s=A.oK(a,b)
a.$identity=s
return s},
oK(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.of)},
m9(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.eG().constructor.prototype):Object.create(new A.bR(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.kj(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.m5(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.kj(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
m5(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.c("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.m3)}throw A.c("Error in functionType of tearoff")},
m6(a,b,c,d){var s=A.ki
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
kj(a,b,c,d){if(c)return A.m8(a,b,d)
return A.m6(b.length,d,a,b)},
m7(a,b,c,d){var s=A.ki,r=A.m4
switch(b?-1:a){case 0:throw A.c(new A.ey("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
m8(a,b,c){var s,r
if($.kg==null)$.kg=A.kf("interceptor")
if($.kh==null)$.kh=A.kf("receiver")
s=b.length
r=A.m7(s,c,a,b)
return r},
k0(a){return A.m9(a)},
m3(a,b){return A.du(v.typeUniverse,A.bs(a.a),b)},
ki(a){return a.a},
m4(a){return a.b},
kf(a){var s,r,q,p=new A.bR("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.c(A.o("Field name "+a+" not found.",null))},
j2(a){return v.getIsolateTag(a)},
lJ(){return v.G},
p0(a){var s,r,q,p,o,n=A.aO($.lF.$1(a)),m=$.j1[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.j7[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bM($.lB.$2(a,n))
if(q!=null){m=$.j1[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.j7[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jg(s)
$.j1[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.j7[n]=s
return s}if(p==="-"){o=A.jg(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.lH(a,s)
if(p==="*")throw A.c(A.kI(n))
if(v.leafTags[n]===true){o=A.jg(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.lH(a,s)},
lH(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.k6(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jg(a){return J.k6(a,!1,null,!!a.$iaj)},
p2(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jg(s)
else return J.k6(s,c,null,null)},
oW(){if(!0===$.k4)return
$.k4=!0
A.oX()},
oX(){var s,r,q,p,o,n,m,l
$.j1=Object.create(null)
$.j7=Object.create(null)
A.oV()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.lI.$1(o)
if(n!=null){m=A.p2(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
oV(){var s,r,q,p,o,n,m=B.aR()
m=A.cg(B.aS,A.cg(B.aT,A.cg(B.aa,A.cg(B.aa,A.cg(B.aU,A.cg(B.aV,A.cg(B.aW(B.a9),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.lF=new A.j4(p)
$.lB=new A.j5(o)
$.lI=new A.j6(n)},
cg(a,b){return a(b)||b},
oL(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
pa(a,b,c){var s=a.indexOf(b,c)
return s>=0},
p4(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bm:function bm(a,b){this.a=a
this.b=b},
ca:function ca(a,b){this.a=a
this.b=b},
dl:function dl(a,b){this.a=a
this.b=b},
cs:function cs(a,b){this.a=a
this.$ti=b},
cr:function cr(){},
I:function I(a,b,c){this.a=a
this.b=b
this.$ti=c},
bI:function bI(a,b){this.a=a
this.$ti=b},
bJ:function bJ(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ct:function ct(){},
aI:function aI(a,b,c){this.a=a
this.b=b
this.$ti=c},
d2:function d2(){},
hO:function hO(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cS:function cS(){},
ee:function ee(a,b,c){this.a=a
this.b=b
this.c=c},
eN:function eN(a){this.a=a},
hm:function hm(a){this.a=a},
cw:function cw(a,b){this.a=a
this.b=b},
dn:function dn(a){this.a=a
this.b=null},
bc:function bc(){},
dS:function dS(){},
dT:function dT(){},
eJ:function eJ(){},
eG:function eG(){},
bR:function bR(a,b){this.a=a
this.b=b},
ey:function ey(a){this.a=a},
aV:function aV(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h9:function h9(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
by:function by(a,b){this.a=a
this.$ti=b},
cH:function cH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aB:function aB(a,b){this.a=a
this.$ti=b},
aX:function aX(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aW:function aW(a,b){this.a=a
this.$ti=b},
cG:function cG(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
j4:function j4(a){this.a=a},
j5:function j5(a){this.a=a},
j6:function j6(a){this.a=a},
b4:function b4(){},
bl:function bl(){},
r(a){return a},
mw(a){return new Int8Array(a)},
mx(a){return new Uint8Array(a)},
en(a){return new Uint8Array(A.r(a))},
b7(a,b,c){if(a>>>0!==a||a>=c)throw A.c(A.j0(b,a))},
c0:function c0(){},
cP:function cP(){},
eg:function eg(){},
a3:function a3(){},
cN:function cN(){},
cO:function cO(){},
cM:function cM(){},
eh:function eh(){},
ei:function ei(){},
ej:function ej(){},
ek:function ek(){},
el:function el(){},
em:function em(){},
cQ:function cQ(){},
cR:function cR(){},
dh:function dh(){},
di:function di(){},
dj:function dj(){},
dk:function dk(){},
jJ(a,b){var s=b.c
return s==null?b.c=A.ds(a,"bx",[b.x]):s},
kC(a){var s=a.w
if(s===6||s===7)return A.kC(a.x)
return s===11||s===12},
mN(a){return a.as},
bO(a){return A.is(v.typeUniverse,a,!1)},
bN(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bN(a1,s,a3,a4)
if(r===s)return a2
return A.l3(a1,r,!0)
case 7:s=a2.x
r=A.bN(a1,s,a3,a4)
if(r===s)return a2
return A.l2(a1,r,!0)
case 8:q=a2.y
p=A.cf(a1,q,a3,a4)
if(p===q)return a2
return A.ds(a1,a2.x,p)
case 9:o=a2.x
n=A.bN(a1,o,a3,a4)
m=a2.y
l=A.cf(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jQ(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.cf(a1,j,a3,a4)
if(i===j)return a2
return A.l4(a1,k,i)
case 11:h=a2.x
g=A.bN(a1,h,a3,a4)
f=a2.y
e=A.oA(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.l1(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.cf(a1,d,a3,a4)
o=a2.x
n=A.bN(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jR(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.c(A.dM("Attempted to substitute unexpected RTI kind "+a0))}},
cf(a,b,c,d){var s,r,q,p,o=b.length,n=A.iw(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bN(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
oB(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iw(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bN(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
oA(a,b,c,d){var s,r=b.a,q=A.cf(a,r,c,d),p=b.b,o=A.cf(a,p,c,d),n=b.c,m=A.oB(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.f9()
s.a=q
s.b=o
s.c=m
return s},
e(a,b){a[v.arrayRti]=b
return a},
k1(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.oT(s)
return a.$S()}return null},
oY(a,b){var s
if(A.kC(b))if(a instanceof A.bc){s=A.k1(a)
if(s!=null)return s}return A.bs(a)},
bs(a){if(a instanceof A.w)return A.t(a)
if(Array.isArray(a))return A.H(a)
return A.jV(J.bP(a))},
H(a){var s=a[v.arrayRti],r=t.E
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
t(a){var s=a.$ti
return s!=null?s:A.jV(a)},
jV(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.ob(a,s)},
ob(a,b){var s=a instanceof A.bc?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.nA(v.typeUniverse,s.name)
b.$ccache=r
return r},
oT(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.is(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
k3(a){return A.aP(A.t(a))},
jZ(a){var s
if(a instanceof A.b4)return a.bQ()
s=a instanceof A.bc?A.k1(a):null
if(s!=null)return s
if(t.dm.b(a))return J.dK(a).a
if(Array.isArray(a))return A.H(a)
return A.bs(a)},
aP(a){var s=a.r
return s==null?a.r=new A.ir(a):s},
oO(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.h(q,0)
s=A.du(v.typeUniverse,A.jZ(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.h(q,r)
s=A.l6(v.typeUniverse,s,A.jZ(q[r]))}return A.du(v.typeUniverse,s,a)},
ay(a){return A.aP(A.is(v.typeUniverse,a,!1))},
oa(a){var s=this
s.b=A.oy(s)
return s.b(a)},
oy(a){var s,r,q,p,o
if(a===t.K)return A.ol
if(A.bQ(a))return A.op
s=a.w
if(s===6)return A.o8
if(s===1)return A.ls
if(s===7)return A.og
r=A.ox(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bQ)){a.f="$i"+q
if(q==="v")return A.oj
if(a===t.m)return A.oi
return A.oo}}else if(s===10){p=A.oL(a.x,a.y)
o=p==null?A.ls:p
return o==null?A.dE(o):o}return A.o6},
ox(a){if(a.w===8){if(a===t.S)return A.lq
if(a===t.i||a===t.o)return A.ok
if(a===t.N)return A.on
if(a===t.y)return A.jW}return null},
o9(a){var s=this,r=A.o5
if(A.bQ(s))r=A.nZ
else if(s===t.K)r=A.dE
else if(A.ck(s)){r=A.o7
if(s===t.h6)r=A.nY
else if(s===t.dk)r=A.bM
else if(s===t.fQ)r=A.nW
else if(s===t.cg)r=A.lg
else if(s===t.cD)r=A.nX
else if(s===t.an)r=A.Z}else if(s===t.S)r=A.a
else if(s===t.N)r=A.aO
else if(s===t.y)r=A.nV
else if(s===t.o)r=A.dD
else if(s===t.i)r=A.iy
else if(s===t.m)r=A.Y
s.a=r
return s.a(a)},
o6(a){var s=this
if(a==null)return A.ck(s)
return A.p_(v.typeUniverse,A.oY(a,s),s)},
o8(a){if(a==null)return!0
return this.x.b(a)},
oo(a){var s,r=this
if(a==null)return A.ck(r)
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bP(a)[s]},
oj(a){var s,r=this
if(a==null)return A.ck(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bP(a)[s]},
oi(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.w)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
lr(a){if(typeof a=="object"){if(a instanceof A.w)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
o5(a){var s=this
if(a==null){if(A.ck(s))return a}else if(s.b(a))return a
throw A.Q(A.ll(a,s),new Error())},
o7(a){var s=this
if(a==null||s.b(a))return a
throw A.Q(A.ll(a,s),new Error())},
ll(a,b){return new A.dq("TypeError: "+A.kW(a,A.aq(b,null)))},
kW(a,b){return A.fK(a)+": type '"+A.aq(A.jZ(a),null)+"' is not a subtype of type '"+b+"'"},
ax(a,b){return new A.dq("TypeError: "+A.kW(a,b))},
og(a){var s=this
return s.x.b(a)||A.jJ(v.typeUniverse,s).b(a)},
ol(a){return a!=null},
dE(a){if(a!=null)return a
throw A.Q(A.ax(a,"Object"),new Error())},
op(a){return!0},
nZ(a){return a},
ls(a){return!1},
jW(a){return!0===a||!1===a},
nV(a){if(!0===a)return!0
if(!1===a)return!1
throw A.Q(A.ax(a,"bool"),new Error())},
nW(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.Q(A.ax(a,"bool?"),new Error())},
iy(a){if(typeof a=="number")return a
throw A.Q(A.ax(a,"double"),new Error())},
nX(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Q(A.ax(a,"double?"),new Error())},
lq(a){return typeof a=="number"&&Math.floor(a)===a},
a(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.Q(A.ax(a,"int"),new Error())},
nY(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.Q(A.ax(a,"int?"),new Error())},
ok(a){return typeof a=="number"},
dD(a){if(typeof a=="number")return a
throw A.Q(A.ax(a,"num"),new Error())},
lg(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Q(A.ax(a,"num?"),new Error())},
on(a){return typeof a=="string"},
aO(a){if(typeof a=="string")return a
throw A.Q(A.ax(a,"String"),new Error())},
bM(a){if(typeof a=="string")return a
if(a==null)return a
throw A.Q(A.ax(a,"String?"),new Error())},
Y(a){if(A.lr(a))return a
throw A.Q(A.ax(a,"JSObject"),new Error())},
Z(a){if(a==null)return a
if(A.lr(a))return a
throw A.Q(A.ax(a,"JSObject?"),new Error())},
lw(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aq(a[q],b)
return s},
os(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.lw(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aq(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
ln(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.e([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.i(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.h(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aq(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aq(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aq(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aq(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aq(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aq(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aq(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aq(a.x,b)+">"
if(l===8){p=A.oC(a.x)
o=a.y
return o.length>0?p+("<"+A.lw(o,b)+">"):p}if(l===10)return A.os(a,b)
if(l===11)return A.ln(a,b,null)
if(l===12)return A.ln(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.h(b,n)
return b[n]}return"?"},
oC(a){var s=A.lK(a)
if(s!=null)return s
return"minified:"+a},
nB(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
nA(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.is(a,b,!1)
else if(typeof m=="number"){s=m
r=A.dt(a,5,"#")
q=A.iw(s)
for(p=0;p<s;++p)q[p]=r
o=A.ds(a,b,q)
n[b]=o
return o}else return m},
nz(a,b){return A.le(a.tR,b)},
ny(a,b){return A.le(a.eT,b)},
is(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.l5(a,null,b,!1)
r.set(b,s)
return s},
du(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.l5(a,b,c,!0)
q.set(c,r)
return r},
l6(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jQ(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
l5(a,b,c,d){return A.np(A.nj(a,b,c,d))},
bo(a,b){b.a=A.o9
b.b=A.oa
return b},
dt(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aD(null,null)
s.w=b
s.as=c
r=A.bo(a,s)
a.eC.set(c,r)
return r},
l3(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.nw(a,b,r,c)
a.eC.set(r,s)
return s},
nw(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bQ(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.ck(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.aD(null,null)
q.w=6
q.x=b
q.as=c
return A.bo(a,q)},
l2(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.nu(a,b,r,c)
a.eC.set(r,s)
return s},
nu(a,b,c,d){var s,r
if(d){s=b.w
if(A.bQ(b)||b===t.K)return b
else if(s===1)return A.ds(a,"bx",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.aD(null,null)
r.w=7
r.x=b
r.as=c
return A.bo(a,r)},
nx(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aD(null,null)
s.w=13
s.x=b
s.as=q
r=A.bo(a,s)
a.eC.set(q,r)
return r},
dr(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
nt(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
ds(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.dr(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.aD(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bo(a,r)
a.eC.set(p,q)
return q},
jQ(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.dr(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.aD(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bo(a,o)
a.eC.set(q,n)
return n},
l4(a,b,c){var s,r,q="+"+(b+"("+A.dr(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aD(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bo(a,s)
a.eC.set(q,r)
return r},
l1(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.dr(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.dr(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.nt(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aD(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bo(a,p)
a.eC.set(r,o)
return o},
jR(a,b,c,d){var s,r=b.as+("<"+A.dr(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.nv(a,b,c,r,d)
a.eC.set(r,s)
return s},
nv(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iw(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bN(a,b,r,0)
m=A.cf(a,c,r,0)
return A.jR(a,n,m,c!==m)}}l=new A.aD(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bo(a,l)},
nj(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
np(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.nl(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kZ(a,r,l,k,!1)
else if(q===46)r=A.kZ(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bL(a.u,a.e,k.pop()))
break
case 94:k.push(A.nx(a.u,k.pop()))
break
case 35:k.push(A.dt(a.u,5,"#"))
break
case 64:k.push(A.dt(a.u,2,"@"))
break
case 126:k.push(A.dt(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.nn(a,k)
break
case 38:A.nm(a,k)
break
case 63:p=a.u
k.push(A.l3(p,A.bL(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.l2(p,A.bL(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.nk(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.l_(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.nq(a.u,a.e,o)
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
return A.bL(a.u,a.e,m)},
nl(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kZ(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.nB(s,o.x)[p]
if(n==null)A.l('No "'+p+'" in "'+A.mN(o)+'"')
d.push(A.du(s,o,n))}else d.push(p)
return m},
nn(a,b){var s,r=a.u,q=A.kY(a,b),p=b.pop()
if(typeof p=="string")b.push(A.ds(r,p,q))
else{s=A.bL(r,a.e,p)
switch(s.w){case 11:b.push(A.jR(r,s,q,a.n))
break
default:b.push(A.jQ(r,s,q))
break}}},
nk(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kY(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bL(p,a.e,o)
q=new A.f9()
q.a=s
q.b=n
q.c=m
b.push(A.l1(p,r,q))
return
case-4:b.push(A.l4(p,b.pop(),s))
return
default:throw A.c(A.dM("Unexpected state under `()`: "+A.p(o)))}},
nm(a,b){var s=b.pop()
if(0===s){b.push(A.dt(a.u,1,"0&"))
return}if(1===s){b.push(A.dt(a.u,4,"1&"))
return}throw A.c(A.dM("Unexpected extended operation "+A.p(s)))},
kY(a,b){var s=b.splice(a.p)
A.l_(a.u,a.e,s)
a.p=b.pop()
return s},
bL(a,b,c){if(typeof c=="string")return A.ds(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.no(a,b,c)}else return c},
l_(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bL(a,b,c[s])},
nq(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bL(a,b,c[s])},
no(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.c(A.dM("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.c(A.dM("Bad index "+c+" for "+b.j(0)))},
p_(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.T(a,b,null,c,null)
r.set(c,s)}return s},
T(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bQ(d))return!0
s=b.w
if(s===4)return!0
if(A.bQ(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.T(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.T(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.T(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.T(a,b.x,c,d,e))return!1
return A.T(a,A.jJ(a,b),c,d,e)}if(s===6)return A.T(a,p,c,d,e)&&A.T(a,b.x,c,d,e)
if(q===7){if(A.T(a,b,c,d.x,e))return!0
return A.T(a,b,c,A.jJ(a,d),e)}if(q===6)return A.T(a,b,c,p,e)||A.T(a,b,c,d.x,e)
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
if(!A.T(a,j,c,i,e)||!A.T(a,i,e,j,c))return!1}return A.lp(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.lp(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.oh(a,b,c,d,e)}if(o&&q===10)return A.om(a,b,c,d,e)
return!1},
lp(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.T(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.T(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.T(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.T(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.T(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
oh(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.du(a,b,r[o])
return A.lf(a,p,null,c,d.y,e)}return A.lf(a,b.y,null,c,d.y,e)},
lf(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.T(a,b[s],d,e[s],f))return!1
return!0},
om(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.T(a,r[s],c,q[s],e))return!1
return!0},
ck(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.bQ(a))if(s!==6)r=s===7&&A.ck(a.x)
return r},
bQ(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
le(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iw(a){return a>0?new Array(a):v.typeUniverse.sEA},
aD:function aD(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
f9:function f9(){this.c=this.b=this.a=null},
ir:function ir(a){this.a=a},
f7:function f7(){},
dq:function dq(a){this.a=a},
nd(){var s,r,q
if(self.scheduleImmediate!=null)return A.oE()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.ch(new A.i_(s),1)).observe(r,{childList:true})
return new A.hZ(s,r,q)}else if(self.setImmediate!=null)return A.oF()
return A.oG()},
ne(a){self.scheduleImmediate(A.ch(new A.i0(t.M.a(a)),0))},
nf(a){self.setImmediate(A.ch(new A.i1(t.M.a(a)),0))},
ng(a){t.M.a(a)
A.nr(0,a)},
nr(a,b){var s=new A.ip()
s.cT(a,b)
return s},
lt(a){return new A.eX(new A.P($.K,a.h("P<0>")),a.h("eX<0>"))},
lk(a,b){a.$2(0,null)
b.b=!0
return b.a},
lh(a,b){A.o_(a,b)},
lj(a,b){b.ba(a)},
li(a,b){b.bb(A.b8(a),A.cj(a))},
o_(a,b){var s,r,q=new A.iz(b),p=new A.iA(b)
if(a instanceof A.P)a.c4(q,p,t.A)
else{s=t.A
if(a instanceof A.P)a.cG(q,p,s)
else{r=new A.P($.K,t.c)
r.a=8
r.c=a
r.c4(q,p,s)}}},
lA(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.K.cE(new A.iV(s),t.H,t.S,t.A)},
l0(a,b,c){return 0},
jw(a){var s
if(t.Q.b(a)){s=a.gai()
if(s!=null)return s}return B.A},
oc(a,b){if($.K===B.n)return null
return null},
od(a,b){if($.K!==B.n)A.oc(a,b)
if(b==null)if(t.Q.b(a)){b=a.gai()
if(b==null){A.kA(a,B.A)
b=B.A}}else b=B.A
else if(t.Q.b(a))A.kA(a,b)
return new A.as(a,b)},
jL(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.mP()
b.aW(new A.as(new A.aH(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bT(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aG()
b.aE(o.a)
A.c8(b,p)
return}b.a^=2
A.fx(null,null,b.b,t.M.a(new A.i8(o,b)))},
c8(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jY(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.c8(d.a,c)
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
A.jY(j.a,j.b)
return}g=$.K
if(g!==h)$.K=h
else g=null
c=c.c
if((c&15)===8)new A.ic(q,d,n).$0()
else if(o){if((c&1)!==0)new A.ib(q,j).$0()}else if((c&2)!==0)new A.ia(d,q).$0()
if(g!=null)$.K=g
c=q.c
if(c instanceof A.P){p=q.a.$ti
p=p.h("bx<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aH(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.jL(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aH(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
ot(a,b){var s
if(t.Y.b(a))return b.cE(a,t.A,t.K,t.l)
s=t.D
if(s.b(a))return s.a(a)
throw A.c(A.aS(a,"onError",u.c))},
or(){var s,r
for(s=$.ce;s!=null;s=$.ce){$.dH=null
r=s.b
$.ce=r
if(r==null)$.dG=null
s.a.$0()}},
oz(){$.jX=!0
try{A.or()}finally{$.dH=null
$.jX=!1
if($.ce!=null)$.kd().$1(A.lC())}},
ly(a){var s=new A.eY(a),r=$.dG
if(r==null){$.ce=$.dG=s
if(!$.jX)$.kd().$1(A.lC())}else $.dG=r.b=s},
ow(a){var s,r,q,p=$.ce
if(p==null){A.ly(a)
$.dH=$.dG
return}s=new A.eY(a)
r=$.dH
if(r==null){s.b=p
$.ce=$.dH=s}else{q=r.b
s.b=q
$.dH=r.b=s
if(q==null)$.dG=s}},
pq(a,b){A.bp(a,"stream",t.K)
return new A.fo(b.h("fo<0>"))},
jY(a,b){A.ow(new A.iU(a,b))},
lv(a,b,c,d,e){var s,r=$.K
if(r===c)return d.$0()
$.K=c
s=r
try{r=d.$0()
return r}finally{$.K=s}},
ov(a,b,c,d,e,f,g){var s,r=$.K
if(r===c)return d.$1(e)
$.K=c
s=r
try{r=d.$1(e)
return r}finally{$.K=s}},
ou(a,b,c,d,e,f,g,h,i){var s,r=$.K
if(r===c)return d.$2(e,f)
$.K=c
s=r
try{r=d.$2(e,f)
return r}finally{$.K=s}},
fx(a,b,c,d){t.M.a(d)
if(B.n!==c){d=c.dG(d)
d=d}A.ly(d)},
i_:function i_(a){this.a=a},
hZ:function hZ(a,b,c){this.a=a
this.b=b
this.c=c},
i0:function i0(a){this.a=a},
i1:function i1(a){this.a=a},
ip:function ip(){},
iq:function iq(a,b){this.a=a
this.b=b},
eX:function eX(a,b){this.a=a
this.b=!1
this.$ti=b},
iz:function iz(a){this.a=a},
iA:function iA(a){this.a=a},
iV:function iV(a){this.a=a},
b5:function b5(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
bn:function bn(a,b){this.a=a
this.$ti=b},
as:function as(a,b){this.a=a
this.b=b},
f1:function f1(){},
da:function da(a,b){this.a=a
this.$ti=b},
bG:function bG(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
P:function P(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
i5:function i5(a,b){this.a=a
this.b=b},
i9:function i9(a,b){this.a=a
this.b=b},
i8:function i8(a,b){this.a=a
this.b=b},
i7:function i7(a,b){this.a=a
this.b=b},
i6:function i6(a,b){this.a=a
this.b=b},
ic:function ic(a,b,c){this.a=a
this.b=b
this.c=c},
id:function id(a,b){this.a=a
this.b=b},
ie:function ie(a){this.a=a},
ib:function ib(a,b){this.a=a
this.b=b},
ia:function ia(a,b){this.a=a
this.b=b},
eY:function eY(a){this.a=a
this.b=null},
fo:function fo(a){this.$ti=a},
dB:function dB(){},
fh:function fh(){},
il:function il(a,b){this.a=a
this.b=b},
iU:function iU(a,b){this.a=a
this.b=b},
kX(a,b){var s=a[b]
return s===a?null:s},
jN(a,b,c){if(c==null)a[b]=a
else a[b]=c},
jM(){var s=Object.create(null)
A.jN(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
mq(a,b){return new A.aV(a.h("@<0>").G(b).h("aV<1,2>"))},
mr(a,b,c){return b.h("@<0>").G(c).h("kq<1,2>").a(A.oP(a,new A.aV(b.h("@<0>").G(c).h("aV<1,2>"))))},
ag(a,b){return new A.aV(a.h("@<0>").G(b).h("aV<1,2>"))},
jD(a){return new A.aF(a.h("aF<0>"))},
ac(a){return new A.aF(a.h("aF<0>"))},
cI(a,b){return b.h("kr<0>").a(A.oQ(a,new A.aF(b.h("aF<0>"))))},
jO(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
ij(a,b,c){var s=new A.bK(a,b,c.h("bK<0>"))
s.c=a.e
return s},
ms(a,b,c){var s=A.mq(b,c)
a.ao(0,new A.ha(s,b,c))
return s},
mt(a,b){var s,r,q=A.jD(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r)q.i(0,b.a(a[r]))
return q},
jE(a,b){var s=A.jD(b)
s.V(0,a)
return s},
jF(a){var s,r
if(A.k5(a))return"{...}"
s=new A.ae("")
try{r={}
B.a.i($.ar,a)
s.a+="{"
r.a=!0
a.ao(0,new A.he(r,s))
s.a+="}"}finally{if(0>=$.ar.length)return A.h($.ar,-1)
$.ar.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
nC(){throw A.c(A.aM("Cannot change an unmodifiable set"))},
dc:function dc(){},
ih:function ih(a){this.a=a},
de:function de(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
bH:function bH(a,b){this.a=a
this.$ti=b},
dd:function dd(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aF:function aF(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fb:function fb(a){this.a=a
this.c=this.b=null},
bK:function bK(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
ha:function ha(a,b,c){this.a=a
this.b=b
this.c=c},
y:function y(){},
bz:function bz(){},
hd:function hd(a){this.a=a},
he:function he(a,b){this.a=a
this.b=b},
df:function df(a,b){this.a=a
this.$ti=b},
dg:function dg(a,b,c){var _=this
_.a=a
_.b=b
_.c=null
_.$ti=c},
dv:function dv(){},
bZ:function bZ(){},
bk:function bk(a,b){this.a=a
this.$ti=b},
b0:function b0(){},
dm:function dm(){},
fq:function fq(){},
d7:function d7(a,b){this.a=a
this.$ti=b},
cc:function cc(){},
dw:function dw(){},
nT(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.m0()
else s=new Uint8Array(o)
for(r=J.ci(a),q=0;q<o;++q){p=r.m(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
nS(a,b,c,d){var s=a?$.m_():$.lZ()
if(s==null)return null
if(0===c&&d===b.length)return A.ld(s,b)
return A.ld(s,b.subarray(c,d))},
ld(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
ke(a,b,c,d,e,f){if(B.i.aC(f,4)!==0)throw A.c(A.ab("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.c(A.ab("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.c(A.ab("Invalid base64 padding, more than two '=' characters",a,b))},
nU(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
iv:function iv(){},
iu:function iu(){},
dN:function dN(){},
fA:function fA(){},
bT:function bT(){},
dY:function dY(){},
e3:function e3(){},
eR:function eR(){},
hT:function hT(a){this.a=a},
it:function it(a){this.a=a
this.b=16
this.c=0},
lG(a){var s=A.ky(a,null)
if(s!=null)return s
throw A.c(A.ab(a,null,null))},
me(a,b){a=A.Q(a,new Error())
if(a==null)a=A.dE(a)
a.stack=b.j(0)
throw a},
cJ(a,b,c,d){var s,r=c?J.ko(a,d):J.kn(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
hb(a,b,c){var s,r=A.e([],c.h("u<0>"))
for(s=J.a_(a);s.k();)B.a.i(r,c.a(s.gl()))
if(b)return r
r.$flags=1
return r},
au(a,b){var s,r
if(Array.isArray(a))return A.e(a.slice(0),b.h("u<0>"))
s=A.e([],b.h("u<0>"))
for(r=J.a_(a);r.k();)B.a.i(s,r.gl())
return s},
hc(a,b){var s=A.hb(a,!1,b)
s.$flags=3
return s},
kF(a,b,c){var s,r
A.ev(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.c(A.am(c,b,null,"end",null))
if(s===0)return""}r=A.mR(a,b,c)
return r},
mR(a,b,c){var s=a.length
if(b>=s)return""
return A.mI(a,b,c==null||c>s?s:c)},
kE(a,b,c){var s=J.a_(b)
if(!s.k())return a
if(c.length===0){do a+=A.p(s.gl())
while(s.k())}else{a+=A.p(s.gl())
while(s.k())a=a+c+A.p(s.gl())}return a},
n_(){var s,r,q=A.mz()
if(q==null)throw A.c(A.aM("'Uri.base' is not supported"))
s=$.kL
if(s!=null&&q===$.kK)return s
r=A.n0(q)
$.kL=r
$.kK=q
return r},
mP(){return A.cj(new Error())},
mc(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
kl(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
dZ(a){if(a>=10)return""+a
return"0"+a},
fK(a){if(typeof a=="number"||A.jW(a)||a==null)return J.aR(a)
if(typeof a=="string")return JSON.stringify(a)
return A.kz(a)},
mf(a,b){A.bp(a,"error",t.K)
A.bp(b,"stackTrace",t.l)
A.me(a,b)},
dM(a){return new A.dL(a)},
o(a,b){return new A.aH(!1,null,b,a)},
aS(a,b,c){return new A.aH(!0,a,b,c)},
am(a,b,c,d,e){return new A.cW(b,c,!0,a,d,"Invalid value")},
ew(a,b,c){if(0>a||a>c)throw A.c(A.am(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.c(A.am(b,a,c,"end",null))
return b}return c},
ev(a,b){if(a<0)throw A.c(A.am(a,0,null,b,null))
return a},
h7(a,b,c,d){return new A.e9(b,!0,a,d,"Index out of range")},
aM(a){return new A.d8(a)},
kI(a){return new A.eM(a)},
k(a){return new A.c5(a)},
at(a){return new A.dV(a)},
ab(a,b,c){return new A.aT(a,b,c)},
mn(a,b,c){var s,r
if(A.k5(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.e([],t.s)
B.a.i($.ar,a)
try{A.oq(a,s)}finally{if(0>=$.ar.length)return A.h($.ar,-1)
$.ar.pop()}r=A.kE(b,t.hf.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jy(a,b,c){var s,r
if(A.k5(a))return b+"..."+c
s=new A.ae(b)
B.a.i($.ar,a)
try{r=s
r.a=A.kE(r.a,a,", ")}finally{if(0>=$.ar.length)return A.h($.ar,-1)
$.ar.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
oq(a,b){var s,r,q,p,o,n,m,l=a.gu(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.p(l.gl())
B.a.i(b,s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
if(0>=b.length)return A.h(b,-1)
r=b.pop()
if(0>=b.length)return A.h(b,-1)
q=b.pop()}else{p=l.gl();++j
if(!l.k()){if(j<=4){B.a.i(b,A.p(p))
return}r=A.p(p)
if(0>=b.length)return A.h(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gl();++j
for(;l.k();p=o,o=n){n=l.gl();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.h(b,-1)
k-=b.pop().length+2;--j}B.a.i(b,"...")
return}}q=A.p(p)
r=A.p(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.h(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.i(b,m)
B.a.i(b,q)
B.a.i(b,r)},
cT(a,b,c,d,e,f){var s
if(B.j===c){s=J.L(a)
b=J.L(b)
return A.eI(A.X(A.X($.dI(),s),b))}if(B.j===d){s=J.L(a)
b=J.L(b)
c=J.L(c)
return A.eI(A.X(A.X(A.X($.dI(),s),b),c))}if(B.j===e){s=J.L(a)
b=J.L(b)
c=J.L(c)
d=J.L(d)
return A.eI(A.X(A.X(A.X(A.X($.dI(),s),b),c),d))}if(B.j===f){s=J.L(a)
b=J.L(b)
c=J.L(c)
d=J.L(d)
e=J.L(e)
return A.eI(A.X(A.X(A.X(A.X(A.X($.dI(),s),b),c),d),e))}s=J.L(a)
b=J.L(b)
c=J.L(c)
d=J.L(d)
e=J.L(e)
f=J.L(f)
f=A.eI(A.X(A.X(A.X(A.X(A.X(A.X($.dI(),s),b),c),d),e),f))
return f},
n0(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.h(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.kJ(a4<a4?B.c.t(a5,0,a4):a5,5,a3).gcI()
else if(s===32)return A.kJ(B.c.t(a5,5,a4),0,a3).gcI()}r=A.cJ(8,0,!1,t.S)
B.a.p(r,0,0)
B.a.p(r,1,-1)
B.a.p(r,2,-1)
B.a.p(r,7,-1)
B.a.p(r,3,0)
B.a.p(r,4,0)
B.a.p(r,5,a4)
B.a.p(r,6,a4)
if(A.lx(a5,0,a4,0,r)>=14)B.a.p(r,7,a4)
q=r[1]
if(q>=0)if(A.lx(a5,0,q,20,r)===20)r[7]=q
p=r[2]+1
o=r[3]
n=r[4]
m=r[5]
l=r[6]
if(l<m)m=l
if(n<p)n=m
else if(n<=q)n=q+1
if(o<p)o=n
k=r[7]<0
j=a3
if(k){k=!1
if(!(p>q+3)){i=o>0
if(!(i&&o+1===n)){if(!B.c.J(a5,"\\",n))if(p>0)h=B.c.J(a5,"\\",p-1)||B.c.J(a5,"\\",p-2)
else h=!1
else h=!0
if(!h){if(!(m<a4&&m===n+2&&B.c.J(a5,"..",n)))h=m>n+2&&B.c.J(a5,"/..",m-3)
else h=!0
if(!h)if(q===4){if(B.c.J(a5,"file",0)){if(p<=0){if(!B.c.J(a5,"/",n)){g="file:///"
s=3}else{g="file://"
s=2}a5=g+B.c.t(a5,n,a4)
m+=s
l+=s
a4=a5.length
p=7
o=7
n=7}else if(n===m){++l
f=m+1
a5=B.c.af(a5,n,m,"/");++a4
m=f}j="file"}else if(B.c.J(a5,"http",0)){if(i&&o+3===n&&B.c.J(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.c.af(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.c.J(a5,"https",0)){if(i&&o+4===n&&B.c.J(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.c.af(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.fl(a4<a5.length?B.c.t(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.nM(a5,0,q)
else{if(q===0)A.cd(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.nN(a5,c,p-1):""
a=A.nI(a5,p,o,!1)
i=o+1
if(i<n){a0=A.ky(B.c.t(a5,i,n),a3)
d=A.nK(a0==null?A.l(A.ab("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.nJ(a5,n,m,a3,j,a!=null)
a2=m<l?A.nL(a5,m+1,l,a3):a3
return A.nD(j,b,a,d,a1,a2,l<a4?A.nH(a5,l+1,a4):a3)},
kN(a){var s=t.N
return B.a.an(A.e(a.split("&"),t.s),A.ag(s,s),new A.hS(B.ac),t.f)},
eQ(a,b,c){throw A.c(A.ab("Illegal IPv4 address, "+a,b,c))},
mX(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.h(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.eQ("each part must be in the range 0..255",a,r)}A.eQ("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.eQ(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.aG(d)
if(!(k<16))return A.h(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.eQ(j,a,q)
p=l}A.eQ("IPv4 address should contain exactly 4 parts",a,q)},
mY(a,b,c){var s
if(b===c)throw A.c(A.ab("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.h(a,b)
if(a.charCodeAt(b)===118){s=A.mZ(a,b,c)
if(s!=null)throw A.c(s)
return!1}A.kM(a,b,c)
return!0},
mZ(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.h(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.aT(n,a,q)
r=q
break}return new A.aT("Unexpected character",a,q-1)}if(r-1===b)return new A.aT(n,a,r)
return new A.aT("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.aT("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.h(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.h(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.aT("Invalid IPvFuture address character",a,r)}},
kM(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.hR(a3)
if(a5-a4<2)a2.$2("address is too short",null)
s=new Uint8Array(16)
r=a3.length
if(!(a4>=0&&a4<r))return A.h(a3,a4)
q=-1
p=0
if(a3.charCodeAt(a4)===58){o=a4+1
if(!(o<r))return A.h(a3,o)
if(a3.charCodeAt(o)===58){n=a4+2
m=n
q=0
p=1}else{a2.$2("invalid start colon",a4)
n=a4
m=n}}else{n=a4
m=n}for(l=0,k=!0;;){if(n>=a5)j=0
else{if(!(n<r))return A.h(a3,n)
j=a3.charCodeAt(n)}A:{i=j^48
h=!1
if(i<=9)g=i
else{f=j|32
if(f>=97&&f<=102)g=f-87
else break A
k=h}if(n<m+4){l=l*16+g;++n
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.mX(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.i.b8(l,8)
if(!(o<16))return A.h(s,o)
s[o]=e;++o
if(!(o<16))return A.h(s,o)
s[o]=l&255;++p
if(j===58){if(p<8){++n
m=n
l=0
k=!0
continue}a2.$2(a1,n)}break}if(j===58){if(q<0){d=p+1;++n
q=p
p=d
m=n
continue}a2.$2("only one wildcard `::` is allowed",n)}if(q!==p-1)a2.$2("missing part",n)
break}if(n<a5)a2.$2("invalid character",n)
if(p<8){if(q<0)a2.$2("an address without a wildcard must contain exactly 8 parts",a5)
c=q+1
b=p-c
if(b>0){a=c*2
a0=16-b*2
B.aw.cN(s,a0,16,s,a)
B.aw.dT(s,a,a0,0)}}return s},
nD(a,b,c,d,e,f,g){return new A.dx(a,b,c,d,e,f,g)},
l7(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
cd(a,b,c){throw A.c(A.ab(c,a,b))},
nK(a,b){var s=A.l7(b)
if(a===s)return null
return a},
nI(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.h(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.h(a,r)
if(a.charCodeAt(r)!==93)A.cd(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.h(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.nF(a,q,r)
if(o<r){n=o+1
p=A.lc(a,B.c.J(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.mY(a,q,o)
l=B.c.t(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.h(a,k)
if(a.charCodeAt(k)===58){o=B.c.aK(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.lc(a,B.c.J(a,"25",n)?o+3:n,c,"%25")}else p=""
A.kM(a,b,o)
return"["+B.c.t(a,b,o)+p+"]"}}return A.nP(a,b,c)},
nF(a,b,c){var s=B.c.aK(a,"%",b)
return s>=b&&s<c?s:c},
lc(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.ae(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.h(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.jT(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.ae("")
l=h.a+=B.c.t(a,q,r)
if(m)n=B.c.t(a,r,r+3)
else if(n==="%")A.cd(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.f.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.ae("")
if(q<r){h.a+=B.c.t(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.h(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.c.t(a,q,r)
if(h==null){h=new A.ae("")
m=h}else m=h
m.a+=i
l=A.jS(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.c.t(a,b,c)
if(q<c){i=B.c.t(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
nP(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.h(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.jT(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.ae("")
k=B.c.t(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.c.t(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.ae("")
if(q<r){p.a+=B.c.t(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.cd(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.h(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.c.t(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.ae("")
l=p}else l=p
l.a+=k
j=A.jS(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.c.t(a,b,c)
if(q<c){k=B.c.t(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
nM(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.h(a,b)
if(!A.l9(a.charCodeAt(b)))A.cd(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.h(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.cd(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.c.t(a,b,c)
return A.nE(q?a.toLowerCase():a)},
nE(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
nN(a,b,c){return A.dy(a,b,c,16,!1,!1)},
nJ(a,b,c,d,e,f){var s=e==="file",r=s||f,q=A.dy(a,b,c,128,!0,!0)
if(q.length===0){if(s)return"/"}else if(r&&!B.c.H(q,"/"))q="/"+q
return A.nO(q,e,f)},
nO(a,b,c){var s=b.length===0
if(s&&!c&&!B.c.H(a,"/")&&!B.c.H(a,"\\"))return A.nQ(a,!s||c)
return A.nR(a)},
nL(a,b,c,d){return A.dy(a,b,c,256,!0,!1)},
nH(a,b,c){return A.dy(a,b,c,256,!0,!1)},
jT(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.h(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.h(a,l)
q=a.charCodeAt(l)
p=A.j3(r)
o=A.j3(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.h(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.bB(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.c.t(a,b,b+3).toUpperCase()
return null},
jS(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
if(a<=127){s=new Uint8Array(3)
s[0]=37
r=a>>>4
if(!(r<16))return A.h(k,r)
s[1]=k.charCodeAt(r)
s[2]=k.charCodeAt(a&15)}else{if(a>2047)if(a>65535){q=240
p=4}else{q=224
p=3}else{q=192
p=2}r=3*p
s=new Uint8Array(r)
for(o=0;--p,p>=0;q=128){n=B.i.dt(a,6*p)&63|q
if(!(o<r))return A.h(s,o)
s[o]=37
m=o+1
l=n>>>4
if(!(l<16))return A.h(k,l)
if(!(m<r))return A.h(s,m)
s[m]=k.charCodeAt(l)
l=o+2
if(!(l<r))return A.h(s,l)
s[l]=k.charCodeAt(n&15)
o+=3}}return A.kF(s,0,null)},
dy(a,b,c,d,e,f){var s=A.lb(a,b,c,d,e,f)
return s==null?B.c.t(a,b,c):s},
lb(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.h(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.jT(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.cd(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.h(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.jS(n)}if(o==null){o=new A.ae("")
k=o}else k=o
k.a=(k.a+=B.c.t(a,p,q))+l
if(typeof m!=="number")return A.oU(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.c.t(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
la(a){if(B.c.H(a,"."))return!0
return B.c.aJ(a,"/.")!==-1},
nR(a){var s,r,q,p,o,n,m
if(!A.la(a))return a
s=A.e([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.h(s,-1)
s.pop()
if(s.length===0)B.a.i(s,"")}p=!0}else{p="."===n
if(!p)B.a.i(s,n)}}if(p)B.a.i(s,"")
return B.a.ac(s,"/")},
nQ(a,b){var s,r,q,p,o,n
if(!A.la(a))return!b?A.l8(a):a
s=A.e([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.a.gcr(s)!==".."){if(0>=s.length)return A.h(s,-1)
s.pop()}else B.a.i(s,"..")
p=!0}else{p="."===n
if(!p)B.a.i(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.a.i(s,"")
if(!b){if(0>=s.length)return A.h(s,0)
B.a.p(s,0,A.l8(s[0]))}return B.a.ac(s,"/")},
l8(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.l9(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.c.t(a,0,s)+"%3A"+B.c.aD(a,s+1)
if(r<=127){if(!(r<128))return A.h(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
nG(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.h(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.c(A.o("Invalid URL encoding",null))}}return r},
jU(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.h(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.ac===d)return B.c.t(a,b,c)
else p=new A.dU(B.c.t(a,b,c))
else{p=A.e([],t.t)
for(n=b;n<c;++n){if(!(n<o))return A.h(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.c(A.o("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.c(A.o("Truncated URI",null))
B.a.i(p,A.nG(a,n+1))
n+=2}else if(r===43)B.a.i(p,32)
else B.a.i(p,r)}}t.L.a(p)
return B.cX.dL(p)},
l9(a){var s=a|32
return 97<=s&&s<=122},
kJ(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.e([b-1],t.t)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.c(A.ab(k,a,r))}}if(q<0&&r>b)throw A.c(A.ab(k,a,r))
while(p!==44){B.a.i(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.h(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.a.i(j,o)
else{n=B.a.gcr(j)
if(p!==44||r!==n+7||!B.c.J(a,"base64",n+1))throw A.c(A.ab("Expecting '='",a,r))
break}}B.a.i(j,r)
m=r+1
if((j.length&1)===1)a=B.aP.e5(a,m,s)
else{l=A.lb(a,m,s,256,!0,!1)
if(l!=null)a=B.c.af(a,m,s,l)}return new A.hQ(a,j,c)},
lx(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.h(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.h(n,p)
o=n.charCodeAt(p)
d=o&31
B.a.p(e,o>>>5,r)}return d},
bv:function bv(a,b,c){this.a=a
this.b=b
this.c=c},
i2:function i2(){},
E:function E(){},
dL:function dL(a){this.a=a},
b1:function b1(){},
aH:function aH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cW:function cW(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
e9:function e9(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
d8:function d8(a){this.a=a},
eM:function eM(a){this.a=a},
c5:function c5(a){this.a=a},
dV:function dV(a){this.a=a},
eo:function eo(){},
d4:function d4(){},
i3:function i3(a){this.a=a},
aT:function aT(a,b,c){this.a=a
this.b=b
this.c=c},
i:function i(){},
R:function R(a,b,c){this.a=a
this.b=b
this.$ti=c},
U:function U(){},
w:function w(){},
fp:function fp(){},
ae:function ae(a){this.a=a},
hS:function hS(a){this.a=a},
hR:function hR(a){this.a=a},
dx:function dx(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
hQ:function hQ(a,b,c){this.a=a
this.b=b
this.c=c},
fl:function fl(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
f2:function f2(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
hl:function hl(a){this.a=a},
dF(a){var s
if(typeof a=="function")throw A.c(A.o("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.o0,a)
s[$.k7()]=a
return s},
o0(a,b,c){t.Z.a(a)
if(A.a(c)>=1)return a.$1(b)
return a.$0()},
lE(a,b,c){return c.a(a[b])},
lo(a,b){return a[b]},
a8(a,b,c,d){return d.a(a[b].apply(a,c))},
p3(a,b){var s=new A.P($.K,b.h("P<0>")),r=new A.da(s,b.h("da<0>"))
a.then(A.ch(new A.ji(r,b),1),A.ch(new A.jj(r),1))
return s},
lu(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
br(a){if(A.lu(a))return a
return new A.iZ(new A.de(t.hg)).$1(a)},
ji:function ji(a,b){this.a=a
this.b=b},
jj:function jj(a){this.a=a},
iZ:function iZ(a){this.a=a},
hv:function hv(a){this.z=a},
c2:function c2(a,b){this.a=a
this.b=b},
al:function al(a,b){this.a=a
this.b=b},
dW:function dW(a,b){this.a=a
this.b=b
this.d=!1},
dX:function dX(){this.a=null
this.d=0
this.e=!1},
hN:function hN(a,b){this.a=a
this.b=b},
hs:function hs(){},
bu:function bu(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=_.x=$},
fS:function fS(){},
fT:function fT(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=f},
fV:function fV(){this.b=this.a=0},
bW(a,b){return new A.h6(a,b)},
aZ:function aZ(){},
ak:function ak(a,b,c){this.a=a
this.b=b
this.c=c},
an:function an(a,b,c){this.a=a
this.b=b
this.c=c},
aJ:function aJ(a,b,c){this.a=a
this.b=b
this.c=c},
ep:function ep(a,b,c){this.a=a
this.b=b
this.c=c},
be:function be(a,b,c){this.a=a
this.b=b
this.c=c},
cz:function cz(a,b){this.a=a
this.b=b},
h6:function h6(a,b){this.a=a
this.b=b},
iW(a,b,c,d){return A.oI(a,b,c,d)},
oI(a,b,a0,a1){var s=0,r=A.lt(t.fW),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c
var $async$iW=A.lA(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:d=b.length
if(d===0)throw A.c(A.o("bootstrapRenderer requires a non-empty profile ladder",null))
a1.F()
n=A.e([],t.eT)
m=0
i=d-1
h=t.x
case 3:g=m
if(typeof g!=="number"){q=g.aB()
s=1
break}if(!(g<d)){s=4
break}l=B.a.m(b,m)
k=a.$1(l)
if(k.a!==l)throw A.c(A.o("configurationFor("+l.a.b+") returned a configuration for "+k.a.a.b+". The mapping must be total and faithful, or the renderer runs a graph the host did not choose.",null))
p=6
s=9
return A.lh(a0.dX(k,a1),$async$iW)
case 9:J.fz(n,new A.aK(l,null))
f=A.hb(n,!1,h)
f.$flags=3
g=new A.dQ(f)
q=g
s=1
break
p=2
s=8
break
case 6:p=5
c=o.pop()
j=A.b8(c)
J.fz(n,new A.aK(l,j))
if(J.b9(m,i))throw c
s=8
break
case 5:s=2
break
case 8:g=m
if(typeof g!=="number"){q=g.a4()
s=1
break}m=g+1
s=3
break
case 4:throw A.c(A.k("bootstrapRenderer exhausted its ladder without a result"))
case 1:return A.lj(q,r)
case 2:return A.li(o.at(-1),r)}})
return A.lk($async$iW,r)},
oN(a){var s,r,q=B.a.bi(B.P,new A.j_(a))
if(q>=0)return A.hc(B.a.cQ(B.P,q),t.W)
s=t.W
r=A.cI([a],s)
r.V(0,B.P)
return A.hc(r,s)},
aK:function aK(a,b){this.a=a
this.b=b},
dQ:function dQ(a){this.d=a},
fC:function fC(){},
fD:function fD(){},
j_:function j_(a){this.a=a},
p6(a,b,c,d){var s,r,q,p,o,n,m=A.e([],t.cw)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.a.i(m,new A.ca(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.a.a5(m,new A.jl())
s=A.e([],t.w)
for(r=A.eH(m,0,A.bp(b,"count",t.S),t.fk),q=r.$ti,r=new A.ad(r,r.gn(0),q.h("ad<N.E>")),q=q.h("N.E");r.k();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
p5(a,b){var s,r,q,p,o,n,m,l,k,j,i=J.jA(a.slice(0),A.H(a).c)
if(i.length<=4)return i
s=A.e([],t.eu)
for(r=i.length,q=0;q<i.length;i.length===r||(0,A.A)(i),++q){p=i[q]
o=p.ge6().by(0,b).ga8()
n=p.gal().geW()
m=p.gal().gew()
l=p.gal().gez()
l=Math.max(A.bq(m),A.bq(l))
k=Math.max(A.bq(n),l)
B.a.i(s,new A.ca(p.geK().C(0,p.ge7()).C(0,p.ge7()).C(0,Math.max(k,0.000001)).bt(0,B.i.a4(1,o)),p))}B.a.a5(s,new A.jk())
r=A.e([],t.p)
for(n=A.eH(s,0,A.bp(4,"count",t.S),t.e8),m=n.$ti,n=new A.ad(n,n.gn(0),m.h("ad<N.E>")),m=m.h("N.E");n.k();){j=n.d
r.push((j==null?m.a(j):j).b)}return r},
bY:function bY(a,b,c){this.a=a
this.b=b
this.c=c},
ai:function ai(){},
jl:function jl(){},
jk:function jk(){},
aE:function aE(a,b){this.a=a
this.b=b},
fI:function fI(){},
ho(a){var s,r,q="volumetric",p=t.N,o=A.cI(["sceneColor","present"],p),n=a.a.b
if(n.q(0,"shadows"))o.V(0,A.cI(["shadowMap","sceneDepth"],p))
if(n.q(0,q)){o.i(0,"volumetricLight")
o.i(0,"sceneColor#"+(a.d>1?2:1))}if(n.q(0,"ssao"))o.V(0,A.cI(["ssaoRaw","ssaoBlurred"],p))
if(n.q(0,"bloom")){if(a.d>1)s=n.q(0,q)?3:2
else s=n.q(0,q)?2:1
o.V(0,A.cI(["bloomBlurH","bloomBlurV","sceneColor#"+s],p))}if(a.d>1)o.i(0,"sceneColor#1")
if(n.q(0,"dof"))o.V(0,A.cI(["dofBlurH","dofBlurV","dofOutput"],p))
if(n.q(0,"grade"))o.i(0,"gradeOutput")
if(n.q(0,"ps1"))o.i(0,"ps1Output")
r=n.q(0,"vhs")
if(r)o.i(0,"vhsOutput")
return new A.hn(new A.d7(A.jE(o,p),t.am),r)},
hn:function hn(a,b){this.a=a
this.b=b},
hp:function hp(){},
ht:function ht(a){this.b=a},
d0:function d0(){this.a=null
this.c=0
this.d=!1},
kG(a,b,c,d,e){var s,r
if(!isFinite(c)||c<=0)throw A.c(A.o("SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: "+A.p(c),null))
if(!isFinite(d)||d<=0)throw A.c(A.o("SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: "+A.p(d),null))
s=c>d?d:c
r=new A.d6(b,a,B.w.cF(b*s),B.w.cF(a*s),s,!0)
r.F()
return r},
d6:function d6(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fE:function fE(a,b){this.a=a
this.b=b},
cY:function cY(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
c3:function c3(a,b){this.a=a
this.b=b},
O:function O(a,b,c){this.a=a
this.b=b
this.d=c},
fW:function fW(a,b,c,d,e){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.w=e},
mu(){return new A.ef(new A.aL(new A.hg(),A.e([],t.ha),A.e([],t.t),t.ex))},
ef:function ef(a){this.a=a},
hg:function hg(){},
lz(a){var s=4
switch(a){case B.cZ:s=0
break
case B.d_:s=1
break
case B.d0:s=2
break
case B.d2:s=3
break
case B.d3:break
case B.d4:s=5
break
case B.d5:s=6
break
case B.d6:break
case B.d1:s=A.l(A.aM("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
o1(a,b,c){var s,r,q,p,o
for(s=a.gdD(),r=s.length,q=0,p=0;p<r;++p){o=s[p]
if(A.lz(o.ge2())===b)q=B.i.a4(q,o.geG())}return q},
mv(a){return new A.hi(a,new A.aL(new A.hj(),A.e([],t.c9),A.e([],t.t),t.cE),A.ag(t.S,t.bw))},
kv(a){var s
A:{s=a.gcu(a)
break A}return s},
eO:function eO(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hi:function hi(a,b,c){this.a=a
this.b=b
this.c=c},
hj:function hj(){},
hk:function hk(){},
mS(a){var s=new A.eK(a,new A.aL(new A.hK(),A.e([],t.fq),A.e([],t.t),t.g2),A.ag(t.S,t.j))
s.d=s.Z($.kc())
s.e=s.Z($.k8())
s.f=s.Z($.k9())
s.r=s.Z($.ka())
s.w=s.Z($.kb())
return s},
eK:function eK(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
hK:function hK(){},
hM:function hM(){},
hL:function hL(){},
p7(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b.gP(0)
if(!i)throw A.c(A.o("invalid volumetric source selection inputs",null))
s=A.ac(t.N)
r=A.e([],t.gg)
for(q=0;!1;++q){p=c[q]
p.F()
if(!s.i(0,p.gD()))throw A.c(A.o("duplicate volumetric source id: "+A.p(p.gD()),null))
o=p.ge6().by(0,b).length
i=p.geX()
n=A.n1(p.geC(),o,i)
i=p.gal().gaO()
m=p.gal().gaP()
l=p.gal().gaQ()
l=Math.max(A.bq(m),A.bq(l))
k=Math.max(A.bq(i),l)
B.a.i(r,new A.dl(p.geP().C(0,k).C(0,n),p))}B.a.a5(r,new A.jm())
i=A.e([],t.r)
for(m=A.eH(r,0,A.bp(a,"count",t.S),t.eS),l=m.$ti,m=new A.ad(m,m.gn(0),l.h("ad<N.E>")),l=l.h("N.E");m.k();){j=m.d
i.push((j==null?l.a(j):j).b)}return i},
n1(a,b,c){var s,r,q,p,o,n
for(s=[new A.bm("distance",b),new A.bm("referenceDistance",c),new A.bm("cutoffDistance",a)],r=0;r<3;++r){q=s[r]
p=q.b
if(!isFinite(p))A.l(A.o(q.a+" must be finite: "+A.p(p),null))}if(b.aB(0,0)||c.cM(0,0)||a.cM(0,0))throw A.c(A.o("invalid inverse-square attenuation inputs",null))
if(b.bu(0,a))return 0
s=c.C(0,c)
q=c.C(0,c)
o=b.C(0,b)
n=s.bt(0,Math.max(A.bq(q),A.bq(o)))
o=b.bt(0,a)
A.bq(o)
return n.C(0,1-Math.pow(o,4)).b9(0,0,1).f1(0)},
jm:function jm(){},
oH(a){var s,r,q,p,o,n,m,l,k,j=A.e([],t.gk),i=A.ag(t.N,t.S)
for(s=a.length,r=t.G,q=0;q<a.length;a.length===s||(0,A.A)(a),++q){p=a[q]
o=p.b
n=o.geJ()
m=A.p(o.gX().gY())+":"+A.p(o.gad().gY())+":"+A.p(n)
l=i.m(0,m)
if(l==null){i.p(0,m,j.length)
B.a.i(j,new A.bd(p,A.e([p],r)))}else{o=j.length
if(l>>>0!==l||l>=o)return A.h(j,l)
k=j[l].b
if(k.length>=16){i.p(0,m,o)
B.a.i(j,new A.bd(p,A.e([p],r)))}else B.a.i(k,p)}}return j},
bd:function bd(a,b){this.a=a
this.b=b},
e4:function e4(a){this.a=a},
fN:function fN(){},
fO:function fO(a){this.a=a},
fL:function fL(a){this.a=a},
fM:function fM(a){this.a=a},
e5:function e5(a,b){this.a=a
this.b=b},
bU:function bU(a,b){this.a=a
this.b=b},
fU:function fU(a,b){this.a=a
this.b=b
this.c=0},
ni(){return new A.c9()},
fR:function fR(a){this.a=a
this.b=null},
c9:function c9(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
jH(){return!0},
D:function D(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
hq:function hq(){},
hr:function hr(){},
aA:function aA(a,b){this.a=a
this.b=b},
a5:function a5(a,b,c){this.a=a
this.b=b
this.c=c},
ex:function ex(a,b){this.a=a
this.b=b},
aU:function aU(a,b){this.a=a
this.b=b},
M:function M(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
d_:function d_(a,b){this.a=a
this.b=b},
j:function j(a,b){this.a=a
this.b=b},
cq:function cq(a){this.b=a},
hu:function hu(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=_.d=0},
a1:function a1(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hw:function hw(){},
V:function V(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.r=f},
hy:function hy(a,b){this.a=a
this.b=b},
hD:function hD(){},
hC:function hC(){},
hB:function hB(){},
hA:function hA(a){this.a=a},
hz:function hz(a,b,c){this.a=a
this.b=b
this.c=c},
hx:function hx(a,b){this.a=a
this.b=b},
mM(a){return new A.cX(new A.aL(new A.hE(),A.e([],t.aO),A.e([],t.t),t.b0),A.ag(t.gL,t.cm))},
cX:function cX(a,b){this.b=a
this.c=b},
hE:function hE(){},
lm(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.o3(a,r,s,a.x.gl().a.b.a).b},
o3(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.iQ(a),j=new A.iR(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.q(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.oJ(b,h,B.J,i,s.ge9(),new A.iB(j),new A.iC(j),new A.iD(a),new A.iI(a),new A.iJ(a),new A.iK(j),new A.iL(j),s.geb(),new A.iM(a),s.gef(),r.ged(),k,s.geh(),s.gej(),new A.iN(j,c),new A.iO(j),new A.iP(j),new A.iE(j),new A.iF(j),new A.iG(a),new A.iH(j),e,f,g,512)}else{p=new A.M(l,B.l,g,f,e,0)
o=new A.M(l,B.l,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.cL(h,p,o):null
k=A.e([new A.eW(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nout vec4 oColor;\nvoid main(){\n  vec3 n=normalize(vNormal);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+\n    vec3(ndotl)*uDirectLightScale,0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.q)
if(n!=null)k.push(n)
k.push(new A.cV(b,u.l,u.m,h,i,B.J))
q=new A.e4(k)}a.r.toString
m=q.dJ(B.W,new A.hw(),!1,new A.fe())
k=m.a.b
if(k.length!==0)throw A.c(A.k("safe renderer graph is invalid: "+A.p(k)))
return new A.im(q,m)},
o4(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3=null,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.c(A.k("renderer graph is not initialized"))
s=b7.c
s=A.au(new A.aB(s,A.t(s).h("aB<2>")),t.at)
for(r=0;r<b9.length;++r){q=b9[r]
b6.w.a.b.ab(q.gX()).geO().f2(q.ga3().aw())}p=b8.a
o=A.oM(A.mh(p.c),s,b8.d)
for(n=s.length,m=0,l=0;l<s.length;s.length===n||(0,A.A)(s),++l){k=s[l].b.gX()
j=b6.w.a
if(j.c.m(0,k.gY())==null)A.l(A.bW(B.N,k))
j.b.ab(k)
m=B.i.a4(m,b3)}for(s=o.a,n=s.length,i=0,l=0;l<s.length;s.length===n||(0,A.A)(s),++l){k=s[l].b.gX()
j=b6.w.a
if(j.c.m(0,k.gY())==null)A.l(A.bW(B.N,k))
j.b.ab(k)
i=B.i.a4(i,b3)}n=t.N
k=A.ag(n,t.a8)
h=new A.fR(k)
h.dF("cull")
j=m-i
g=h.b
if(g==null)A.l(A.k("cull recorded outside an active frame"))
if(j<0)A.l(A.o("cull totals must be non-negative",b3))
f=k.m(0,g)
f.c+=j
f.e+=o.b.b
e=A.e([],t.c1)
d=A.e([],t.aM)
for(c=s.length,b=t.k,l=0;l<s.length;s.length===c||(0,A.A)(s),++l){a=s[l]
a0=a.b
a0.gcf()
B.a.i(e,new A.W(new A.ah(B.cb,a0.gad(),a0.gX(),a.a.a),a,b))}a1=new A.f8(A.oH(A.p9(e)),A.p8(d),p,b8.b,b8.c)
a2=new A.e0(b6.a,h)
for(s=b4.b,p=s.length,c=t.do,l=0;l<s.length;s.length===p||(0,A.A)(s),++l){a3=s[l]
b=a3.gA().a
if(b.length===0)A.l(A.aS(b,"passId",b3))
h.b=b
k.aN(b,A.lD())
a4=A.ag(n,c)
for(b=a3.gA().c,a0=b.length,a5=0;a5<b.length;b.length===a0||(0,A.A)(b),++a5){a6=b[a5].a
a7=b5.c
if(a7==null)A.l(A.k("GPU resource adapter is not initialized"))
a8=a6.f
a9=a6.a
b0=a8===0?a9:a9+"#"+a8
b1=a7.b.m(0,b0)
if(b1==null)A.l(A.k("resource is not in candidate: "+b0))
b2=new A.bS(b1)
a4.p(0,a9+"#"+a8,b2)
a4.aN(a9,new A.iS(b2))}a3.I(new A.dR(a4,a2,new A.iT(b8,b6).$0(),a1))}return new A.i4(h,o,j)},
hF:function hF(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.w=f
_.x=!1},
i4:function i4(a,b,c){this.a=a
this.b=b
this.c=c},
dp:function dp(){},
iQ:function iQ(a){this.a=a},
iR:function iR(a,b){this.a=a
this.b=b},
iP:function iP(a){this.a=a},
iI:function iI(a){this.a=a},
iJ:function iJ(a){this.a=a},
iO:function iO(a){this.a=a},
iD:function iD(a){this.a=a},
iF:function iF(a){this.a=a},
iE:function iE(a){this.a=a},
iN:function iN(a,b){this.a=a
this.b=b},
iB:function iB(a){this.a=a},
iC:function iC(a){this.a=a},
iK:function iK(a){this.a=a},
iL:function iL(a){this.a=a},
iM:function iM(a){this.a=a},
iH:function iH(a){this.a=a},
iG:function iG(a){this.a=a},
iS:function iS(a){this.a=a},
iT:function iT(a,b){this.a=a
this.b=b},
im:function im(a,b){this.a=a
this.b=b},
fe:function fe(){},
f8:function f8(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
ez:function ez(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.ay=_.ax=_.at=_.as=_.Q=_.y=_.x=_.w=_.r=null
_.a$=f
_.b$=g},
hG:function hG(){},
hH:function hH(){},
hI:function hI(){},
fd:function fd(a){this.b=a},
ig:function ig(){},
fi:function fi(){},
eB:function eB(a,b){this.a=a
this.b=b},
p9(a){var s,r,q=A.au(a,t.k)
B.a.a5(q,new A.jq())
s=A.H(q)
r=s.h("aY<1,b_>")
s=A.au(new A.aY(q,s.h("b_(1)").a(new A.jr()),r),r.h("N.E"))
s.$flags=1
return s},
p8(a){var s,r,q=A.au(a,t.d)
B.a.a5(q,new A.jo())
s=A.H(q)
r=s.h("aY<1,b_>")
s=A.au(new A.aY(q,s.h("b_(1)").a(new A.jp()),r),r.h("N.E"))
s.$flags=1
return s},
ah:function ah(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
W:function W(a,b,c){this.a=a
this.b=b
this.$ti=c},
jq:function jq(){},
jr:function jr(){},
jo:function jo(){},
jp:function jp(){},
oM(a,b,c){var s,r,q,p,o,n,m=A.e([],t.G)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.A)(b),++p){o=b[p];++r
o.b.gf8().eu(0,c)
n=o.c
if(!n.gP(n))throw A.c(A.o("cullItems: non-finite world bounds for instance "+o.a.j(0),null))
if(a.eo(n)===B.ag){++q
continue}B.a.i(m,o)}return new A.fG(m,new A.fH(q))},
fH:function fH(a){this.b=a},
fG:function fG(a,b){this.a=a
this.b=b},
mh(a){var s=a.a,r=new A.fY()
return new A.fX(A.e([r.$4(s[3]+s[0],s[7]+s[4],s[11]+s[8],s[15]+s[12]),r.$4(s[3]-s[0],s[7]-s[4],s[11]-s[8],s[15]-s[12]),r.$4(s[3]+s[1],s[7]+s[5],s[11]+s[9],s[15]+s[13]),r.$4(s[3]-s[1],s[7]-s[5],s[11]-s[9],s[15]-s[13]),r.$4(s[3]+s[2],s[7]+s[6],s[11]+s[10],s[15]+s[14]),r.$4(s[3]-s[2],s[7]-s[6],s[11]-s[10],s[15]-s[14])],t.dV))},
bA:function bA(a,b){this.a=a
this.b=b},
cx:function cx(a,b){this.a=a
this.b=b},
fX:function fX(a){this.a=a},
fY:function fY(){},
ku(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.c_(q)},
kt(a,b,c){var s=b.gbm(),r=s.bc(c).gbm(),q=r.bc(s),p=new Float32Array(16)
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
return new A.c_(p)},
c_:function c_(a){this.a=a},
hf:function hf(){},
av:function av(a,b,c){this.a=a
this.b=b
this.c=c},
eZ:function eZ(a,b){this.a=a
this.b=b},
cm:function cm(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
f_:function f_(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dP:function dP(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
f0:function f0(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
e_:function e_(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
f3:function f3(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
f4:function f4(a,b){this.a=a
this.b=b},
cu:function cu(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
f5:function f5(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
e1:function e1(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
f6:function f6(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
e8:function e8(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f
_.w=g},
fa:function fa(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
cL:function cL(a,b,c){this.a=a
this.b=b
this.c=c},
fc:function fc(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bS:function bS(a){this.b=a},
dR:function dR(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
a4(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.M(a.a,a.b,b,c,s,r)},
jI:function jI(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var _=this
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
my(a){var s
switch(a.a){case 0:s=0
break
case 1:s=1
break
case 2:s=2.5
break
case 3:s=3.5
break
default:s=null}return s},
cV:function cV(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
ff:function ff(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eu:function eu(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fg:function fg(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
kD(a){var s=A.kt(B.p,B.u,Math.abs(0)<0.99?B.cY:B.p)
return new A.bC(A.ku(1,1,B.i.b9(1,0.1,3),0.05).C(0,s))},
bC:function bC(a){this.a=a},
eC:function eC(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fj:function fj(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
oJ(c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3=u.l,b4="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[7]=float[7](\n  0.167465,0.153582,0.118331,0.076665,0.041582,0.018907,0.007203\n);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<7;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b5="bloomBlurH",b6="bloomBlurV",b7="dofBlurH",b8="dofBlurV",b9={},c0=c4.b
if(!c0.q(0,"shadows"))throw A.c(A.aS(c4,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=c0.q(0,"ssao")
r=c0.q(0,"bloom")
q=c0.q(0,"dof")
p=c0.q(0,"grade")
o=c0.q(0,"ps1")
n=c0.q(0,"vhs")
m=c0.q(0,"volumetric")
c0=(e9+1)/2|0
l=(e8+1)/2|0
k=A.a4(B.V,e9,e8,e7,b2)
j=A.a4(B.V.cw(),e9,e8,b2,b2)
i=e7>1
h=A.a4(B.cl,e9,e8,b2,i?2:1)
g=A.a4(B.ck,c0,l,b2,b2)
A.a4(B.ct,e9,e8,b2,b2)
f=A.a4(B.cq,e9,e8,b2,b2)
e=A.a4(B.cj,f0,f0,b2,b2)
d=A.a4(B.cm,c0,l,b2,b2)
c=A.a4(B.cn,c0,l,b2,b2)
b=A.a4(B.cr,c0,l,b2,b2)
a=A.a4(B.cs,c0,l,b2,b2)
a0=$.lM()
a1=i?1:0
a2=A.a4(a0,e9,e8,b2,a1+(m?1:0)+1)
a0=A.a4(B.cg,c0,l,b2,b2)
a1=A.a4(B.ch,c0,l,b2,b2)
a3=A.a4(B.ci,e9,e8,b2,b2)
a4=A.a4(B.co,e9,e8,b2,b2)
a5=A.a4(B.cu,e9,e8,b2,b2)
a6=A.a4(B.cp,e9,e8,b2,b2)
a7=i?new A.cL(c2,k,j):b2
b9.a=null
a8=A.kD(B.aY)
if(m){a9=i?j:k
b0=new A.eT(c1,b3,"#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\n\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform mat4 uViewProjection;\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform float uShaftIntensity;\nuniform float uFogDensity;\nuniform float uAnisotropy;\nuniform mat4 uView;\nuniform mat4 uInverseProjection;\nuniform vec3 uVolumetricAlbedo;\nuniform float uVolumetricHeightFalloff;\nuniform float uVolumetricDustDensity;\nuniform float uVolumetricJitter;\nuniform float uVolumetricIntensity;\nuniform float uVolumetricSampleCount;\nuniform float uVolumetricSourceCount;\n\nuniform vec3 uSourcePosition0;\nuniform vec3 uSourceColor0;\nuniform float uSourceIntensity0;\nuniform float uSourceReferenceDistance0;\nuniform float uSourceCutoffDistance0;\nuniform vec3 uSourcePosition1;\nuniform vec3 uSourceColor1;\nuniform float uSourceIntensity1;\nuniform float uSourceReferenceDistance1;\nuniform float uSourceCutoffDistance1;\nuniform vec3 uSourcePosition2;\nuniform vec3 uSourceColor2;\nuniform float uSourceIntensity2;\nuniform float uSourceReferenceDistance2;\nuniform float uSourceCutoffDistance2;\nuniform vec3 uSourcePosition3;\nuniform vec3 uSourceColor3;\nuniform float uSourceIntensity3;\nuniform float uSourceReferenceDistance3;\nuniform float uSourceCutoffDistance3;\n\nfloat linearDepth(float depth) {\n  float z = depth * 2.0 - 1.0;\n  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);\n}\n\nfloat phaseHenyeyGreenstein(float cosTheta, float anisotropy) {\n  float g = clamp(anisotropy, -0.85, 0.85);\n  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;\n  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));\n}\n\nvec3 sourceContribution(\n  vec3 position,\n  vec3 color,\n  float intensity,\n  float referenceDistance,\n  float cutoffDistance,\n  vec3 viewRay,\n  float rayLength\n) {\n  vec4 clip = uViewProjection * vec4(position, 1.0);\n  if (clip.w <= 0.0) return vec3(0.0);\n  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;\n  float sourceDistance = length(sourceView);\n  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);\n  vec3 sampleToSource = sourceView - viewRay * tClosest;\n  float distanceToSource = max(length(sampleToSource), 1e-3);\n  float cutoff = 1.0 - smoothstep(\n    cutoffDistance * 0.65, cutoffDistance, sourceDistance);\n  float inverseSquare = intensity * referenceDistance * referenceDistance /\n      max(distanceToSource * distanceToSource,\n          referenceDistance * referenceDistance);\n  // The incoming direction is source -> sample and the outgoing direction is\n  // sample -> camera. This is the same phase convention as the directional\n  // medium path, but now evaluated against the located source.\n  float phase = phaseHenyeyGreenstein(\n    dot(normalize(sampleToSource), viewRay), uAnisotropy);\n  // Located practicals and lightning must also acquire visible body in a\n  // dust-filled room. Use the same broad haze plus particulate density as the\n  // directional march; otherwise a clear-air fog toggle would accidentally\n  // erase dust-lit source rays while the directional shafts still showed it.\n  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);\n  float mediumWeight = 1.0 - exp(-max(\n    mediumDensity * min(rayLength, cutoffDistance), 0.0));\n  float pathWeight = clamp(\n    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);\n  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *\n    uVolumetricIntensity * 0.35;\n}\n\nvoid main() {\n  float depth = texture(uSceneDepth, vUv).r;\n  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);\n  viewPoint /= max(abs(viewPoint.w), 1e-5);\n  vec3 viewRay = normalize(viewPoint.xyz);\n  // linearDepth is camera-space Z; convert it to distance along the actual\n  // reconstructed ray so wide and tall projections integrate equally.\n  float cameraDepth = linearDepth(depth);\n  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);\n  float density = max(uFogDensity, 0.0);\n\n  // A fixed, bounded integral keeps the pass deterministic and makes its\n  // cost predictable on weak adapters. The depth buffer stops integration at\n  // the first opaque surface, so shafts do not leak through geometry.\n  const int maxSampleCount = 24;\n  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));\n  vec3 scatter = vec3(0.0);\n  float transmittance = 1.0;\n  float stepLength = rayLength / float(sampleCount);\n  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);\n  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);\n  for (int i = 0; i < maxSampleCount; i++) {\n    if (i >= sampleCount) break;\n    float distanceAlongRay = clamp(\n      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);\n    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));\n    // Dust is a separate, host-resolved particulate phase. It is denser near\n    // the occupied room volume than the broad atmospheric haze, so shafts gain\n    // visible body without turning the far horizon opaque. At zero density the\n    // extra term is exactly zero and the established fog path is unchanged.\n    float dustWeight = exp(-max(distanceAlongRay *\n      uVolumetricHeightFalloff * 0.45, 0.0));\n    float opticalDensity = density +\n      max(uVolumetricDustDensity, 0.0) * dustWeight;\n    float opticalDepth = opticalDensity * stepLength * heightWeight;\n    float sampleTransmittance = exp(-opticalDepth);\n    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);\n    scatter += transmittance * (uLightColor * uVolumetricAlbedo *\n      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;\n    transmittance *= sampleTransmittance;\n  }\n\n  if (uVolumetricSourceCount > 0.5) {\n    scatter += sourceContribution(\n      uSourcePosition0, uSourceColor0, uSourceIntensity0,\n      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 1.5) {\n    scatter += sourceContribution(\n      uSourcePosition1, uSourceColor1, uSourceIntensity1,\n      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 2.5) {\n    scatter += sourceContribution(\n      uSourcePosition2, uSourceColor2, uSourceIntensity2,\n      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 3.5) {\n    scatter += sourceContribution(\n      uSourcePosition3, uSourceColor3, uSourceIntensity3,\n      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);\n  }\n\n  // Fade the final sample at the far plane and keep the additive output\n  // bounded so a storm flash cannot blow out the entire frame.\n  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);\n  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);\n}\n","#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\nuniform sampler2D uVolumetric;\nuniform float uVolumetricStrength;\n\nvoid main() {\n  vec3 light = texture(uVolumetric, vUv).rgb;\n  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);\n}\n",c2,e1,c8,g,f,a9,h,A.e([],t.e))}else b0=b2
g=t.q
b1=A.e([],g)
if(!m)h=i?j:k
if(r){B.a.V(b1,A.e([new A.cm(c1,b3,b4,c2,b5,b5,B.aM,!0,h,b,e0,c0,l),new A.cm(c1,b3,b4,c2,b6,b6,B.d7,!1,b,a,c6,c0,l),new A.dP(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",c2,c7,a,h,a2)],g))
h=a2}if(q){B.a.V(b1,A.e([new A.cu(c1,b3,b4,c2,b7,b7,B.aN,h,a0,e0,c0,l),new A.cu(c1,b3,b4,c2,b8,b8,B.d8,a0,a1,d1,c0,l),new A.e1(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvoid main(){\n  if(uStrength<=0.0001){\n    oColor=vec4(texture(uSharp,vUv).rgb,1.0);\n    return;\n  }\n\n  vec2 texelSize=1.0/vec2(textureSize(uSharp,0));\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n\n  // Signed disparity relative to physical focal plane:\n  // Foreground (signedDisparity < 0) exhibits optical hyper-focal expansion,\n  // blurring at a steeper rate than background (signedDisparity > 0).\n  float signedDisparity=depth-uFocusDistance;\n  float normRange=max(uFocusRange,0.0001);\n  float signedCoc=(signedDisparity<0.0)\n    ?(signedDisparity/(normRange*0.75))\n    :(signedDisparity/(normRange*1.25));\n  float rawCoc=clamp(abs(signedCoc),0.0,1.0)*clamp(uStrength,0.0,1.0);\n\n  // Depth-aware disparity weighting to prevent out-of-focus foreground halos\n  // from bleeding over sharp in-focus background edges.\n  float depthN=linearDepth(texture(uSceneDepth,vUv+vec2(0.0,texelSize.y*2.0)).r);\n  float depthS=linearDepth(texture(uSceneDepth,vUv-vec2(0.0,texelSize.y*2.0)).r);\n  float depthE=linearDepth(texture(uSceneDepth,vUv+vec2(texelSize.x*2.0,0.0)).r);\n  float depthW=linearDepth(texture(uSceneDepth,vUv-vec2(texelSize.x*2.0,0.0)).r);\n  float minNeighborDepth=min(min(depthN,depthS),min(depthE,depthW));\n\n  // If this pixel is in-focus background but neighbors are close foreground,\n  // suppress foreground halo bleeding onto this sharp pixel.\n  float coc=rawCoc;\n  if(depth>uFocusDistance && minNeighborDepth<uFocusDistance){\n    float bleedProtection=clamp((depth-minNeighborDepth)/(normRange*2.0),0.0,1.0);\n    coc=mix(rawCoc,rawCoc*0.25,bleedProtection);\n  }\n\n  // Smooth cubic hermite curve for cinematic optical circle of confusion\n  float smoothCoc=coc*coc*(3.0-2.0*coc);\n\n  // Longitudinal (axial) chromatic aberration inside the optical bokeh circle:\n  // Out-of-focus highlights separate into subtle complementary chromatic fringes.\n  vec2 radialDir=vUv-vec2(0.5);\n  float radialDist=length(radialDir);\n  vec2 chromaDir=(radialDist>0.001)?(radialDir/radialDist):vec2(0.0,1.0);\n  vec2 chromaOffset=chromaDir*(smoothCoc*texelSize*2.8*sign(signedDisparity));\n\n  vec3 blurred=vec3(\n    texture(uBlurred,vUv-chromaOffset).r,\n    texture(uBlurred,vUv).g,\n    texture(uBlurred,vUv+chromaOffset).b\n  );\n\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,smoothCoc),1.0);\n}\n",c2,e0,d2,e1,c8,h,f,a1,a3)],g))
h=a3}if(p){B.a.i(b1,new A.e8(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",c2,d4,h,a4))
h=a4}if(o){B.a.i(b1,new A.eu(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",c2,h,a5))
h=a5}if(n){B.a.i(b1,new A.eS(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',c2,e6,e5,h,a6))
h=a6}j=A.e([new A.e_(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d7,d6,c5,f)],g)
if(s)j.push(new A.eF(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=16;\nconst vec3 KERNEL[16]=vec3[16](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48),\n  vec3( 0.22, 0.14, 0.72),\n  vec3(-0.18,-0.25, 0.65),\n  vec3( 0.42,-0.28, 0.35),\n  vec3(-0.36, 0.32, 0.52),\n  vec3( 0.15, 0.58, 0.25),\n  vec3(-0.48, 0.12, 0.39),\n  vec3( 0.28,-0.52, 0.22),\n  vec3(-0.24,-0.42, 0.58)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  float rawDepth=texture(uSceneDepth,vUv).r;\n  if(rawDepth>=0.9999){\n    oColor=vec4(1.0);\n    return;\n  }\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    vec3 toOccluder=occluderView-originView;\n    float angleWeight=max(dot(normalView,normalize(toOccluder)),0.0);\n    float bias=max(0.015,abs(originView.z)*0.001);\n    occlusion+=(occluderView.z>=samplePos.z+bias?1.0:0.0)*rangeCheck*(0.35+0.65*angleWeight);\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",c2,e1,c8,d))
if(s)j.push(new A.eE(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float rawCenter=texture(uSceneDepth,vUv).r;\n  if(rawCenter>=0.9999){\n    oColor=vec4(1.0);\n    return;\n  }\n  float centerDepth=linearDepth(rawCenter);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleRaw=texture(uSceneDepth,sampleUv).r;\n      if(sampleRaw>=0.9999) continue;\n      float sampleDepth=linearDepth(sampleRaw);\n      float spatialDistSq=float(x*x+y*y);\n      float spatialWeight=exp(-spatialDistSq*0.22);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*6.0);\n      float totalWeight=spatialWeight*depthWeight;\n      sum+=texture(uSsaoRaw,sampleUv).r*totalWeight;\n      weightSum+=totalWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',c2,e4,e1,c8,c0,l,d,c))
j.push(new A.eC(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d7,d6,c5,c9,b2,b2,new A.iX(b9),e))
j.push(new A.eD(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nuniform vec3 uReflectionColor;\nuniform float uReflectionIntensity;\nuniform float uReflectionConfidence;\nuniform vec2 uShadowMapTexelSize;\nuniform float uShadowFilterRadius;\nuniform float uShadowBias;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uSpecularScale;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nuniform float uSurfaceSnowCoverage;\nuniform float uSurfaceDissolution;\nuniform float uThermalSourceCount;\nuniform vec3 uThermalSourcePosition0;\nuniform float uThermalSourceRadius0;\nuniform float uThermalSourceDissolution0;\nuniform vec3 uThermalSourcePosition1;\nuniform float uThermalSourceRadius1;\nuniform float uThermalSourceDissolution1;\nuniform vec3 uThermalSourcePosition2;\nuniform float uThermalSourceRadius2;\nuniform float uThermalSourceDissolution2;\nuniform vec3 uThermalSourcePosition3;\nuniform float uThermalSourceRadius3;\nuniform float uThermalSourceDissolution3;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nfloat directSpotAttenuation(vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,float lightRange,float innerCos,float outerCos,float enabled){\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return coneFalloff*distanceFalloff*enabled;\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  float atten=directSpotAttenuation(worldPos,lightPosition,lightDirection,\n    lightRange,innerCos,outerCos,enabled);\n  return lightColor*lightIntensity*ndotl*atten;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\n// Disney/Burley energy-conserving diffuse retro-reflection model\nfloat diffuseBurley(float ndotl,float ndotv,float lndoth,float roughness){\n  float fd90=0.5+2.0*roughness*lndoth*lndoth;\n  float lightScatter=1.0+(fd90-1.0)*pow(clamp(1.0-ndotl,0.0,1.0),5.0);\n  float viewScatter=1.0+(fd90-1.0)*pow(clamp(1.0-ndotv,0.0,1.0),5.0);\n  return lightScatter*viewScatter;\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 fresnelSchlickRoughness(float cosTheta,vec3 f0,float roughness){\n  return f0+(max(vec3(1.0-roughness),f0)-f0)*pow(clamp(1.0-cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0);\n  float ndotl=max(dot(normal,lightDir),0.0);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlickRoughness(hdotv,f0,roughness);\n  float distribution=distributionGgx(ndoth,roughness);\n  float geometry=geometrySmith(ndotv,ndotl,roughness);\n  vec3 numerator=distribution*geometry*fresnel;\n  float denominator=max(4.0*ndotv*ndotl,0.001);\n  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog keeps the smooth distance ramp for authored horizon control, but\n// the participating-medium term is an analytic optical depth along the actual\n// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the\n// integral has a stable constant-height limit and therefore does not shimmer\n// when a surface is nearly level with the camera. Zero density remains an\n// exact no-op; the host can still use the distance ramp independently.\nfloat heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){\n  float segmentLength=length(rayEnd-rayStart);\n  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;\n  float falloff=max(uFogHeightFalloff,0.);\n  float h0=max(rayStart.y,0.);\n  float h1=max(rayEnd.y,0.);\n  float integral;\n  if(falloff<=0.||abs(h1-h0)<=0.0001){\n    integral=segmentLength*exp(-falloff*h0);\n  }else{\n    float denominator=falloff*(h1-h0);\n    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;\n  }\n  return max(uFogDensity*integral,0.);\n}\n\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=(uFogEnd>uFogStart&&uFogEnd>1.0)?smoothstep(uFogStart,uFogEnd,viewDepth):0.0;\n  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);\n  float mediumFactor=1.-exp(-opticalDepth);\n  return clamp(max(distFactor,mediumFactor),0.,1.);\n}\n\nconst vec2 VOGEL_16[16]=vec2[16](\n  vec2( 0.1768,  0.0000),\n  vec2(-0.2263,  0.2064),\n  vec2( 0.0346, -0.3938),\n  vec2( 0.2809,  0.3739),\n  vec2(-0.5186, -0.1111),\n  vec2( 0.4907, -0.3224),\n  vec2(-0.1724,  0.6137),\n  vec2(-0.2642, -0.6316),\n  vec2( 0.6186,  0.3860),\n  vec2(-0.6698,  0.3824),\n  vec2( 0.3479, -0.7314),\n  vec2( 0.1770,  0.8291),\n  vec2(-0.6558, -0.5927),\n  vec2( 0.8719,  0.2891),\n  vec2(-0.7099,  0.6348),\n  vec2( 0.1983, -0.9641)\n);\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);\n  // 16-tap Vogel spiral with golden ratio rotation produces silky smooth\n  // penumbras free of regular lattice banding or directional noise.\n  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);\n  // Adaptive contact-hardening: estimate blocker proximity to sharpen contact shadows\n  float blockerSum=0.0;\n  float blockerCount=0.0;\n  for(int b=0;b<4;b++){\n    float depthSample=texture(uShadowMap,projCoord.xy+VOGEL_16[b*4]*t*1.5).r;\n    if(depthSample<projCoord.z-bias){\n      blockerSum+=depthSample;\n      blockerCount+=1.0;\n    }\n  }\n  float penumbraScale=1.0;\n  if(blockerCount>0.0){\n    float avgBlockerDepth=blockerSum/blockerCount;\n    float penumbraRatio=clamp((projCoord.z-avgBlockerDepth)/max(projCoord.z,0.0001),0.0,1.0);\n    penumbraScale=mix(0.38,1.0,smoothstep(0.0002,0.012,penumbraRatio));\n  }\n  vec2 filterRadius=t*penumbraScale;\n  float sum=0.;\n  for(int i=0;i<16;i++){\n    sum+=sampleShadow(projCoord+vec3(VOGEL_16[i]*filterRadius,0.),bias);\n  }\n  return sum/16.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  direct*=uDirectLightScale;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  float upward=clamp(n.y*0.5+0.5,0.0,1.0);\n  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao*mix(0.85,1.15,upward);\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Weather changes the material before direct and environment response.\n  // Thawing therefore affects the same specular lobe the viewer sees,\n  // instead of changing only diffuse color after the highlight is computed.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);\n  // A steady spherical conductive field decays approximately as 1/r. The\n  // host keeps the slow latent material memory in uSurfaceDissolution; this\n  // local term therefore models the spatial heat field without making warm\n  // surfaces snap back or disappear at an arbitrary exponential radius.\n  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/\n      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));\n  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/\n      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));\n  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/\n      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));\n  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/\n      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));\n  thermalDissolution=clamp(thermalDissolution,0.0,1.0);\n  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*\n    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);\n  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);\n  float dissolution=thermalDissolution;\n  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);\n  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  // A continuous water film forms a second dielectric lobe. It smooths the\n  // authored surface only as coverage rises, so damp cloth stays diffuse\n  // while puddled stone gains a tight grazing reflection.\n  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);\n  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  float spotAtten0=directSpotAttenuation(vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  if(spotAtten0>0.001){\n    specular+=specularContribution(n,viewDir,normalize(uDirectSpotPosition0-vWorldPos),\n      uDirectSpotColor0,uDirectSpotIntensity0,spotAtten0,baseColor,specRough,metal);\n  }\n  float spotAtten1=directSpotAttenuation(vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  if(spotAtten1>0.001){\n    specular+=specularContribution(n,viewDir,normalize(uDirectSpotPosition1-vWorldPos),\n      uDirectSpotColor1,uDirectSpotIntensity1,spotAtten1,baseColor,specRough,metal);\n  }\n  float spotAtten2=directSpotAttenuation(vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  if(spotAtten2>0.001){\n    specular+=specularContribution(n,viewDir,normalize(uDirectSpotPosition2-vWorldPos),\n      uDirectSpotColor2,uDirectSpotIntensity2,spotAtten2,baseColor,specRough,metal);\n  }\n  specular*=uDirectLightScale*uSpecularScale;\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*(1.0-0.25*rough));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);\n  float coat=coatStrength*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*\n    uDirectLightScale*uSpecularScale;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  // Environment fallback reflections are deliberately bounded and weighted\n  // by wetness/grazing angle. A real probe/history hit can raise confidence;\n  // the current host fallback remains visible but never masquerades as SSR.\n  float reflectionNdotV=max(dot(n,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metal);\n  vec3 envFresnel=f0+(max(vec3(1.0-specRough),f0)-f0)*pow(clamp(1.0-reflectionNdotV,0.0,1.0),5.0);\n  float envGloss=(1.0-specRough)*(1.0-specRough);\n  float reflectionSurface=clamp(metal*0.85+(1.0-metal)*(wetness+0.18*dissolution+envGloss*0.25),0.0,1.0);\n  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);\n  float reflectionWeight=clamp(\n    uReflectionIntensity*reflectionSurface*\n      (1.0-0.72*rough)*reflectionConfidence,\n    0.0,1.0);\n  vec3 reflectDir=reflect(-viewDir,n);\n  float refUp=clamp(reflectDir.y*0.5+0.5,0.0,1.0);\n  // Ambient radiance is colour \xd7 intensity, as in the diffuse term above;\n  // the raw colour made dark scenes (night) reflect a bright sky.\n  vec3 envAmbient=uAmbientColor*uAmbientIntensity*uAmbientLightScale;\n  vec3 envRadiance=mix(envAmbient*0.35,mix(envAmbient,uReflectionColor,refUp),refUp);\n  vec3 sunReflectDir=normalize(uDirectionalDirection);\n  float sunRdotL=max(dot(reflectDir,sunReflectDir),0.0);\n  envRadiance+=uDirectionalColor*pow(sunRdotL,mix(32.0,4.0,specRough))*(1.0-specRough)*0.4;\n  lit+=envRadiance*envFresnel*reflectionWeight*ao;\n  float backScatter=max(dot(-viewDir,normalize(uDirectionalDirection)),0.0);\n  vec3 subsurface=baseColor*uDirectionalColor*(pow(backScatter,4.0)*(1.0-metal)*0.12*uDirectionalIntensity);\n  lit+=subsurface;\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  // Glow carries the same coverage as colour: opaque draws write alpha 1 as\n  // before, while blended and additive draws (both blend with srcAlpha)\n  // fade their glow with the sprite instead of blooming the whole quad.\n  oGlow=vec4(emissive,outAlpha);\n}\n",d7,d6,c5,d8,d9,d3,d5,e2,new A.iY(b9,a8),c9,d0,e3,s,e9,e8,f0,f0,e,c,k))
if(a7!=null)j.push(a7)
if(b0!=null)j.push(b0)
B.a.V(j,b1)
j.push(new A.cV(c1,b3,u.m,c2,h,c3))
return new A.e4(j)},
iX:function iX(a){this.a=a},
iY:function iY(a,b){this.a=a
this.b=b},
eD:function eD(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
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
fk:function fk(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
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
eF:function eF(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
fn:function fn(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eE:function eE(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fm:function fm(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
eS:function eS(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fr:function fr(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
eT:function eT(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
ft:function ft(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fs:function fs(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
cZ:function cZ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eW:function eW(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fw:function fw(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eA(a,b){return new A.d3(a,b)},
h_:function h_(a,b){this.a=a
this.b=b},
e6:function e6(a,b){this.a=a
this.b=b},
h4:function h4(a,b){this.a=a
this.b=b},
h5:function h5(a,b){this.a=a
this.b=b},
fZ:function fZ(a,b,c){this.a=a
this.b=b
this.c=c},
h3:function h3(){},
bV:function bV(a,b){this.a=a
this.b=b},
cy:function cy(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
e7:function e7(a,b){this.a=a
this.b=b},
c4:function c4(a,b){this.a=a
this.b=b},
d3:function d3(a,b){this.a=a
this.b=b},
b3:function b3(a,b){this.a=a
this.b=b},
d:function d(a,b){this.a=a
this.b=b},
cp:function cp(a,b){this.a=a
this.b=b},
e0:function e0(a,b){this.a=a
this.b=b},
er:function er(a,b){this.a=a
this.b=b},
h0:function h0(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
h1:function h1(){},
h2:function h2(){},
aL:function aL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.e=0
_.$ti=d},
km(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.e2(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
fB:function fB(a,b){this.a=a
this.b=b},
dO:function dO(a,b){this.a=a
this.b=b},
fF:function fF(a,b){this.a=a
this.b=b},
fJ:function fJ(a,b){this.a=a
this.b=b},
e2:function e2(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
a6:function a6(a,b){this.a=a
this.b=b},
hY:function hY(){this.a=null},
ns(){var s=t.N
return new A.cb(A.ag(s,t.m),A.ac(s))},
n2(a){var s=new A.eU(a,B.f,new A.hY(),A.nc(a),A.ac(t.N),A.ag(t.m,t.ce))
s.cS(a)
return s},
nc(a){var s,r,q=t.du.a(a.getSupportedExtensions())
if(q==null)return A.ac(t.N)
s=A.ac(t.N)
r=J.a_(t.dy.b(q)?q:new A.co(q,A.H(q).h("co<1,m>")))
while(r.k())s.i(0,r.gl())
return s},
ao(a,b){var s,r
if(a.b!==B.f)A.l(A.k(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.a(s.drawingBufferWidth),A.a(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
n7(a,b){var s
if(a.b!==B.f)A.l(A.k(u.k))
switch(b){case 1:a.a.drawBuffers(A.e([A.a(v.G.WebGL2RenderingContext.COLOR_ATTACHMENT0)],t.n))
break
case 2:s=v.G
a.a.drawBuffers(A.e([A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
break
default:throw A.c(A.o("WebGl2Device.setColorAttachmentCount: count must be 1 or 2, got "+b,null))}},
n6(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.a(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
n5(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
kO(a,b){var s
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
n3(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
a7(a,b){var s,r,q,p
if(a.b!==B.f)A.l(A.k(u.k))
s=a.f
r=s.dQ(b)
if(r.a===0)return
if(r.q(0,B.X)){q=v.G
p=a.a
if(b.a)p.enable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.q(0,B.Y))a.a.depthFunc(A.n6(a,b.b))
if(r.q(0,B.Z))a.a.depthMask(b.c)
if(r.q(0,B.a2)){q=v.G
p=a.a
if(b.w)p.enable(A.a(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.a(q.WebGL2RenderingContext.CULL_FACE))}if(r.q(0,B.a3))a.a.cullFace(A.n5(a,b.x))
if(r.q(0,B.aI)){q=v.G.WebGL2RenderingContext
q=A.a(q.CCW)
a.a.frontFace(q)}if(r.q(0,B.a_)){q=v.G
p=a.a
if(b.d)p.enable(A.a(q.WebGL2RenderingContext.BLEND))
else p.disable(A.a(q.WebGL2RenderingContext.BLEND))}if(r.q(0,B.a0))a.a.blendFunc(A.kO(a,b.e),A.kO(a,b.f))
if(r.q(0,B.a1))a.a.blendEquation(A.n3(a,b.r))
if(r.q(0,B.aG))a.a.colorMask(!0,!0,!0,!0)
if(r.q(0,B.aH)){q=v.G.WebGL2RenderingContext
a.a.disable(A.a(q.SCISSOR_TEST))}s.a=b},
n4(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.a(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.a(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.a(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
bF(a,b,c,d,e,f){var s
if(a.b!==B.f)A.l(A.k(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.n4(a,b))},
aN(a,b){var s
if(a.b!==B.f)A.l(A.k(u.k))
s=A.Y(b.a)
a.a.useProgram(s)
a.aS(s)},
b(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.f)A.l(A.k(u.k))
s=a.e
if(s==null)throw A.c(A.k("WebGl2Device.setUniform called with no bound program"))
r=a.x
q=r.a
p=q.m(0,b)
if(p==null){o=r.b
if(o.q(0,b))return
p=A.Z(a.a.getUniformLocation(s,b))
if(p==null){o.i(0,b)
return}q.p(0,b,p)}switch(c.a.a){case 0:a.a.uniform1f(p,A.iy(c.b))
break
case 1:n=t.B.a(c.b)
q=n.length
if(0>=q)return A.h(n,0)
o=n[0]
if(1>=q)return A.h(n,1)
a.a.uniform2f(p,o,n[1])
break
case 2:n=t.B.a(c.b)
q=n.length
if(0>=q)return A.h(n,0)
o=n[0]
if(1>=q)return A.h(n,1)
m=n[1]
if(2>=q)return A.h(n,2)
a.a.uniform3f(p,o,m,n[2])
break
case 3:n=t.B.a(c.b)
q=n.length
if(0>=q)return A.h(n,0)
o=n[0]
if(1>=q)return A.h(n,1)
m=n[1]
if(2>=q)return A.h(n,2)
l=n[2]
if(3>=q)return A.h(n,3)
A.a8(a.a,"uniform4f",[p,o,m,l,n[3]],t.H)
break
case 4:a.a.uniformMatrix4fv(p,!1,t.B.a(c.b))
break
case 5:a.a.uniformMatrix4fv(p,!1,t.B.a(c.b))
break
case 6:a.a.uniform1i(p,A.a(c.b))
break}},
ap(a,b){if(a.b!==B.f)A.l(A.k(u.k))
a.a.bindVertexArray(A.Y(b.a))},
S(a,b,c){var s,r,q,p,o,n
if(a.b!==B.f)A.l(A.k(u.k))
s=c.a
r=a.a
q=v.G
r.activeTexture(A.a(q.WebGL2RenderingContext.TEXTURE0)+b)
if(s instanceof A.dA){p=s.d>1?A.a(q.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(q.WebGL2RenderingContext.TEXTURE_2D)
r.bindTexture(p,s.a)
return}if(s instanceof A.dz){o=s.b
if(o!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),o)
return}n=s.e
if(n!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),n)
return}throw A.c(A.k("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.c(A.k("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
n8(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
n9(a,b){var s,r,q,p
if(a.b!==B.f)A.l(A.k(u.k))
s=a.a
r=A.Z(s.createBuffer())
if(r==null)throw A.c(A.k("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.b7?A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.a(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.n8(a,b.b))
return new A.b6(r,a.Q)},
kP(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
kQ(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
kR(a,b){var s,r,q,p,o,n,m,l,k
if(a.b!==B.f)A.l(A.k(u.k))
s=a.a
r=A.Z(s.createTexture())
if(r==null)throw A.c(A.k("WebGl2Device: gl.createTexture() returned null"))
q=v.G
p=q.WebGL2RenderingContext
o=A.a(p.TEXTURE_2D)
s.bindTexture(o,r)
p=q.WebGL2RenderingContext
A.a8(s,"texStorage2D",[o,1,A.a(p.RGBA8),1,1],t.H)
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.kP(a,B.ai))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.kP(a,B.ai))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_S),A.kQ(a,B.aj))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_T),A.kQ(a,B.aj))
n=a.a7("EXT_texture_filter_anisotropic")
m=n?a.bS(34047):1
if(!isFinite(1))A.l(A.aS(1,"requested","anisotropy must be finite and in [1, 16]"))
if(n&&isFinite(m)&&m>=1)l=m>16?16:m
else l=1
k=1<l?1:l
if(k>1)s.texParameterf(o,34046,k)
return new A.b6(new A.dA(r,1,1,1,!1),a.Q)},
kS(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.f)A.l(A.k(u.k))
s=t.R.a(b.a)
r=s.d
if(c>=r)throw A.c(A.o("WebGl2Device.uploadTextureLayer: layer "+c+" out of range for "+r+"-layer texture",null))
q=s.b
p=s.c
o=q*p*4
n=d.length
if(n!==o)throw A.c(A.o("WebGl2Device.uploadTextureLayer: expected "+o+" RGBA8 bytes for "+q+"x"+p+", got "+n,null))
r=r>1
n=v.G
m=r?A.a(n.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(n.WebGL2RenderingContext.TEXTURE_2D)
l=a.a
l.bindTexture(m,s.a)
k=t.H
if(r)A.a8(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.a8(l,"texSubImage2D",[m,0,0,0,q,p,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
na(a,b){if(a.b!==B.f)A.l(A.k(u.k))
t.R.a(b.a)
return},
eV(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
kU(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.f)A.l(A.k(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.c(A.o("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.Z(r.createFramebuffer())
if(q==null)throw A.c(A.k("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.K
if(n&&!a1.e)throw A.c(A.o("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.ah||o===B.ba
l=d
k=d
j=d
i=d
if(n){r.drawBuffers(A.e([A.a(p.WebGL2RenderingContext.NONE)],t.n))
r.readBuffer(A.a(p.WebGL2RenderingContext.NONE))}else{o=a1.c
h=t.H
g=a1.b
if(o>1){k=A.Z(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.Z(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.e([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.Z(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.a8(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.a8(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.Z(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),j)
A.a8(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.a8(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.TEXTURE_2D),j,0],h)
r.drawBuffers(A.e([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}}f=d
e=d
if(a1.e){o=a1.c
h=t.H
g=a1.b
if(o>1){f=A.Z(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.Z(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.a8(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
A.a8(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.a(r.checkFramebufferStatus(A.a(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.a(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.jK(a0,q,l,k,f,e,j,i)
throw A.c(A.k("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.b6(new A.dz(q,l,k,f,e,j,i,s,a1.b,a1.c),a0.Q)},
jK(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
aw(a){var s
if(a.b!==B.f)A.l(A.k(u.k))
s=A.Z(a.a.createVertexArray())
if(s==null)throw A.c(A.k("WebGl2Device: gl.createVertexArray() returned null"))
return new A.b6(s,a.Q)},
kT(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.Z(p.createShader(b))
if(o==null)throw A.c(A.eA(b===A.lE(A.lo(A.lJ(),r),q,t.S)?B.aC:B.aD,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.b9(A.br(p.getShaderParameter(o,A.a(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bM(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.c(A.eA(b===A.lE(A.lo(A.lJ(),r),q,t.S)?B.aC:B.aD,s))}return o},
nb(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.f)A.l(A.k(u.k))
q=v.G
s=A.kT(a,A.a(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.kT(a,A.a(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.Z(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.c(B.cA)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.b9(A.br(o.getProgramParameter(n,A.a(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bM(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.eA(B.aE,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.A)(c),++l){k=c[l]
if(A.a(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.eA(B.aF,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.Z(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.eA(B.aF,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.b6(n,a.Q)},
cb:function cb(a,b){this.a=a
this.b=b},
b6:function b6(a,b){this.a=a
this.b=b},
dA:function dA(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dz:function dz(a,b,c,d,e,f,g,h,i,j){var _=this
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
fv:function fv(a){this.a=a
this.b=!1},
eU:function eU(a,b,c,d,e,f){var _=this
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
hV:function hV(a){this.a=a},
hW:function hW(a){this.a=a},
ix:function ix(){},
fu:function fu(){},
hU:function hU(a){this.a=a},
hX:function hX(){},
j8(){return A.p1()},
p1(){var s=0,r=A.lt(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$j8=A.lA(function(a,b){if(a===1)return A.li(b,r)
for(;;)switch(s){case 0:f={}
e=v.G
d=A.Z(A.Y(e.document).querySelector("#minimal-canvas"))
if(!t.m.b(d)){s=1
break}p=B.aZ.dN(d)
o=p==null?null:new A.ez(p.a,new A.dW(new A.dX(),new A.d0()),new A.fU(A.e([],t.c4),B.b1),A.e([],t.cR),B.U,A.e([],t.cL),null)
if(o==null){d.setAttribute("data-renderer-state","renderer-unavailable")
d.setAttribute("data-renderer-backend","pixeldart")
d.setAttribute("data-renderer-fallback","false")
d.setAttribute("data-renderer-failure-reason","webgl2 unavailable")
s=1
break}n=A.n_().gcC().m(0,"profile")
if(n==null)n="safe"
A:{if("standard"===n){m=B.az
break A}if("high"===n){m=B.aA
break A}m=B.T
break A}f.a=A.dD(A.Y(e.window).devicePixelRatio)
l=A.a(d.clientWidth)>0?A.a(d.clientWidth):A.a(d.width)
k=A.a(d.clientHeight)>0?A.a(d.clientHeight):A.a(d.height)
j=f.b=A.kG(k,l,A.dD(A.Y(e.window).devicePixelRatio),2,!0)
d.width=j.c
d.height=j.d
s=3
return A.lh(A.iW(new A.ja(),A.oN(m),o,j),$async$j8)
case 3:i=b
o.aF()
h=A.mM(o.w.a.b)
B.a.i(o.d,h)
g=new A.fV()
m=new A.j9()
l=new A.jd(f,d,o,n,i,g)
o.ca(h,g.cv(m.$1(j),B.a8,B.ab,0))
o.cg()
d.setAttribute("data-renderer-first-frame","true")
l.$0()
f.c=!1
k=new A.je(f,d,o,g)
A.Y(e.window).addEventListener("resize",A.dF(new A.jb(k)))
d.addEventListener("webglcontextrestored",A.dF(new A.jc(f,g)))
A.a(A.Y(e.window).requestAnimationFrame(A.dF(new A.jf(f,k,o,h,g,m,d,l))))
case 1:return A.lj(q,r)}})
return A.lk($async$j8,r)},
ja:function ja(){},
j9:function j9(){},
jd:function jd(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
je:function je(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jb:function jb(a){this.a=a},
jc:function jc(a,b){this.a=a
this.b=b},
jf:function jf(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
lK(a){return v.mangledGlobalNames[a]},
pb(a){throw A.Q(A.kp(a),new Error())},
aQ(){throw A.Q(A.mp(""),new Error())},
js(){throw A.Q(A.kp(""),new Error())},
jn(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.c(A.aS(b.gdY(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].b.ga3().aw()
o=q*16
n=o+16
B.Q.bw(s,o,n,p.ga9())
if(l)B.Q.bw(r,o,n,p.cz().ga9())}m=a.a
A.b(m,"uInstanceModels",new A.d(B.aJ,s))
if(l)A.b(m,"uInstanceNormalMatrices",new A.d(B.aJ,r))
A.b(m,"uUseInstances",B.aK)}},B={}
var w=[A,J,B]
var $={}
A.jB.prototype={}
J.ea.prototype={
T(a,b){return a===b},
gB(a){return A.es(a)},
j(a){return"Instance of '"+A.et(a)+"'"},
gE(a){return A.aP(A.jV(this))}}
J.ec.prototype={
j(a){return String(a)},
gB(a){return a?519018:218159},
gE(a){return A.aP(t.y)},
$iC:1,
$iz:1}
J.cB.prototype={
T(a,b){return null==b},
j(a){return"null"},
gB(a){return 0},
$iC:1}
J.cD.prototype={$iF:1}
J.bh.prototype={
gB(a){return 0},
gE(a){return B.cM},
j(a){return String(a)}}
J.eq.prototype={}
J.bD.prototype={}
J.bg.prototype={
j(a){var s=a[$.lN()]
if(s==null)s=a[$.k7()]
if(s==null)return this.cR(a)
return"JavaScript function for "+J.aR(s)},
$ibw:1}
J.cC.prototype={
gB(a){return 0},
j(a){return String(a)}}
J.cE.prototype={
gB(a){return 0},
j(a){return String(a)}}
J.u.prototype={
i(a,b){A.H(a).c.a(b)
a.$flags&1&&A.aG(a,29)
a.push(b)},
V(a,b){var s
A.H(a).h("i<1>").a(b)
a.$flags&1&&A.aG(a,"addAll",2)
if(Array.isArray(b)){this.cV(a,b)
return}for(s=J.a_(b);s.k();)a.push(s.gl())},
cV(a,b){var s,r
t.E.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.c(A.at(a))
for(r=0;r<s;++r)a.push(b[r])},
W(a){a.$flags&1&&A.aG(a,"clear","clear")
a.length=0},
ac(a,b){var s,r=A.cJ(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.p(r,s,A.p(a[s]))
return r.join(b)},
an(a,b,c,d){var s,r,q
d.a(b)
A.H(a).G(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.c(A.at(a))}return r},
O(a,b){if(!(b>=0&&b<a.length))return A.h(a,b)
return a[b]},
cQ(a,b){var s
if(b<0||b>a.length)throw A.c(A.am(b,0,a.length,"start",null))
s=a.length
if(b===s)return A.e([],A.H(a))
return A.e(a.slice(b,s),A.H(a))},
gcr(a){var s=a.length
if(s>0)return a[s-1]
throw A.c(A.jx())},
gbx(a){var s=a.length
if(s===1){if(0>=s)return A.h(a,0)
return a[0]}if(s===0)throw A.c(A.jx())
throw A.c(A.mm())},
a5(a,b){var s,r,q,p,o,n=A.H(a)
n.h("f(1,1)?").a(b)
a.$flags&2&&A.aG(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.oe()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.cL()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.ch(b,2))
if(p>0)this.dq(a,p)},
cP(a){return this.a5(a,null)},
dq(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
aJ(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.h(a,s)
if(J.b9(a[s],b))return s}return-1},
q(a,b){var s
for(s=0;s<a.length;++s)if(J.b9(a[s],b))return!0
return!1},
j(a){return A.jy(a,"[","]")},
gu(a){return new J.cl(a,a.length,A.H(a).h("cl<1>"))},
gB(a){return A.es(a)},
gn(a){return a.length},
m(a,b){if(!(b>=0&&b<a.length))throw A.c(A.j0(a,b))
return a[b]},
p(a,b,c){A.H(a).c.a(c)
a.$flags&2&&A.aG(a)
if(!(b>=0&&b<a.length))throw A.c(A.j0(a,b))
a[b]=c},
bi(a,b){var s
A.H(a).h("z(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gE(a){return A.aP(A.H(a))},
$iq:1,
$ii:1,
$iv:1}
J.eb.prototype={
es(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.et(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.h8.prototype={}
J.cl.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.A(q)
throw A.c(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iJ:1}
J.bX.prototype={
N(a,b){var s
A.dD(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaM(b)
if(this.gaM(a)===s)return 0
if(this.gaM(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaM(a){return a===0?1/a<0:a<0},
ep(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.c(A.aM(""+a+".toInt()"))},
cF(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.c(A.aM(""+a+".round()"))},
b9(a,b,c){if(this.N(b,c)>0)throw A.c(A.k_(b))
if(this.N(a,b)<0)return b
if(this.N(a,c)>0)return c
return a},
er(a,b){var s
if(b>20)throw A.c(A.am(b,0,20,"fractionDigits",null))
s=a.toExponential(b)
if(a===0&&this.gaM(a))return"-"+s
return s},
j(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
a4(a,b){return a+b},
aC(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
c2(a,b){return(a|0)===a?a/b|0:this.dv(a,b)},
dv(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.c(A.aM("Result of truncating division is "+A.p(s)+": "+A.p(a)+" ~/ "+b))},
b8(a,b){var s
if(a>0)s=this.c1(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
dt(a,b){if(0>b)throw A.c(A.k_(b))
return this.c1(a,b)},
c1(a,b){return b>31?0:a>>>b},
aB(a,b){return a<b},
gE(a){return A.aP(t.o)},
$iaf:1,
$in:1,
$ia9:1}
J.cA.prototype={
gE(a){return A.aP(t.S)},
$iC:1,
$if:1}
J.ed.prototype={
gE(a){return A.aP(t.i)},
$iC:1}
J.bf.prototype={
af(a,b,c,d){var s=A.ew(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
J(a,b,c){var s
if(c<0||c>a.length)throw A.c(A.am(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
H(a,b){return this.J(a,b,0)},
t(a,b,c){return a.substring(b,A.ew(b,c,a.length))},
aD(a,b){return this.t(a,b,null)},
C(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.c(B.aX)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
aK(a,b,c){var s
if(c<0||c>a.length)throw A.c(A.am(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
aJ(a,b){return this.aK(a,b,0)},
q(a,b){return A.pa(a,b,0)},
N(a,b){var s
A.aO(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
j(a){return a},
gB(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gE(a){return A.aP(t.N)},
gn(a){return a.length},
$iC:1,
$iaf:1,
$ikw:1,
$im:1}
A.c7.prototype={
gu(a){return new A.cn(J.a_(this.gaI()),A.t(this).h("cn<1,2>"))},
gn(a){return J.ba(this.gaI())},
O(a,b){return A.t(this).y[1].a(J.jv(this.gaI(),b))},
j(a){return J.aR(this.gaI())}}
A.cn.prototype={
k(){return this.a.k()},
gl(){return this.$ti.y[1].a(this.a.gl())},
$iJ:1}
A.db.prototype={
m(a,b){return this.$ti.y[1].a(J.jt(this.a,b))},
p(a,b,c){var s=this.$ti
J.dJ(this.a,b,s.c.a(s.y[1].a(c)))},
$iq:1,
$iv:1}
A.co.prototype={
gaI(){return this.a}}
A.cF.prototype={
j(a){return"LateInitializationError: "+this.a}}
A.dU.prototype={
gn(a){return this.a.length},
m(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.h(s,b)
return s.charCodeAt(b)}}
A.hJ.prototype={}
A.q.prototype={}
A.N.prototype={
gu(a){var s=this
return new A.ad(s,s.gn(s),A.t(s).h("ad<N.E>"))},
ag(a){var s,r=this,q=A.jD(A.t(r).h("N.E"))
for(s=0;s<r.gn(r);++s)q.i(0,r.O(0,s))
return q}}
A.d5.prototype={
gdg(){var s=J.ba(this.a),r=this.c
if(r==null||r>s)return s
return r},
gdu(){var s=J.ba(this.a),r=this.b
if(r>s)return s
return r},
gn(a){var s,r=J.ba(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
O(a,b){var s=this,r=s.gdu()+b
if(b<0||r>=s.gdg())throw A.c(A.h7(b,s.gn(0),s,"index"))
return J.jv(s.a,r)},
cH(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.ci(n),l=m.gn(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.ko(0,n):J.kn(0,n)}r=A.cJ(s,m.O(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.a.p(r,q,m.O(n,o+q))
if(m.gn(n)<l)throw A.c(A.at(p))}return r},
eq(a){return this.cH(0,!0)}}
A.ad.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.ci(q),o=p.gn(q)
if(r.b!==o)throw A.c(A.at(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.O(q,s);++r.c
return!0},
$iJ:1}
A.aC.prototype={
gu(a){var s=this.a
return new A.cK(s.gu(s),this.b,A.t(this).h("cK<1,2>"))},
gn(a){var s=this.a
return s.gn(s)},
O(a,b){var s=this.a
return this.b.$1(s.O(s,b))}}
A.cv.prototype={$iq:1}
A.cK.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gl())
return!0}s.a=null
return!1},
gl(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iJ:1}
A.aY.prototype={
gn(a){return J.ba(this.a)},
O(a,b){return this.b.$1(J.jv(this.a,b))}}
A.a2.prototype={
gu(a){return new A.G(J.a_(this.a),this.b,this.$ti.h("G<1>"))}}
A.G.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gl()))return!0
return!1},
gl(){return this.a.gl()},
$iJ:1}
A.aa.prototype={}
A.bE.prototype={
p(a,b,c){A.t(this).h("bE.E").a(c)
throw A.c(A.aM("Cannot modify an unmodifiable list"))}}
A.c6.prototype={}
A.d1.prototype={
gn(a){return J.ba(this.a)},
O(a,b){var s=this.a,r=J.ci(s)
return r.O(s,r.gn(s)-1-b)}}
A.dC.prototype={}
A.bm.prototype={$r:"+(1,2)",$s:1}
A.ca.prototype={$r:"+influence,light(1,2)",$s:2}
A.dl.prototype={$r:"+influence,source(1,2)",$s:3}
A.cs.prototype={}
A.cr.prototype={
j(a){return A.jF(this)},
p(a,b,c){var s=A.t(this)
s.c.a(b)
s.y[1].a(c)
A.ma()},
ga2(){return new A.bn(this.dR(),A.t(this).h("bn<R<1,2>>"))},
dR(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$ga2(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga0(),o=o.gu(o),n=A.t(s),m=n.y[1],n=n.h("R<1,2>")
case 2:if(!o.k()){r=3
break}l=o.gl()
k=s.m(0,l)
r=4
return a.b=new A.R(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ia0:1}
A.I.prototype={
gn(a){return this.b.length},
gbR(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
am(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
m(a,b){if(!this.am(b))return null
return this.b[this.a[b]]},
ao(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbR()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga0(){return new A.bI(this.gbR(),this.$ti.h("bI<1>"))},
gah(){return new A.bI(this.b,this.$ti.h("bI<2>"))}}
A.bI.prototype={
gn(a){return this.a.length},
gu(a){var s=this.a
return new A.bJ(s,s.length,this.$ti.h("bJ<1>"))}}
A.bJ.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iJ:1}
A.ct.prototype={
i(a,b){A.t(this).c.a(b)
A.mb()}}
A.aI.prototype={
gn(a){return this.b},
gcq(a){return this.b!==0},
gu(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.bJ(s,s.length,r.$ti.h("bJ<1>"))},
q(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
ag(a){return A.jE(this,this.$ti.c)}}
A.d2.prototype={}
A.hO.prototype={
a1(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.cS.prototype={
j(a){return"Null check operator used on a null value"}}
A.ee.prototype={
j(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.eN.prototype={
j(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hm.prototype={
j(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.cw.prototype={}
A.dn.prototype={
j(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibj:1}
A.bc.prototype={
j(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.lL(r==null?"unknown":r)+"'"},
gE(a){var s=A.k1(this)
return A.aP(s==null?A.bs(this):s)},
$ibw:1,
gev(){return this},
$C:"$1",
$R:1,
$D:null}
A.dS.prototype={$C:"$0",$R:0}
A.dT.prototype={$C:"$2",$R:2}
A.eJ.prototype={}
A.eG.prototype={
j(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.lL(s)+"'"}}
A.bR.prototype={
T(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bR))return!1
return this.$_target===b.$_target&&this.a===b.a},
gB(a){return(A.jh(this.a)^A.es(this.$_target))>>>0},
j(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.et(this.a)+"'")}}
A.ey.prototype={
j(a){return"RuntimeError: "+this.a}}
A.aV.prototype={
gn(a){return this.a},
ga0(){return new A.by(this,A.t(this).h("by<1>"))},
gah(){return new A.aB(this,A.t(this).h("aB<2>"))},
ga2(){return new A.aW(this,A.t(this).h("aW<1,2>"))},
am(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dZ(a)},
dZ(a){var s=this.d
if(s==null)return!1
return this.aL(this.bO(s,a),a)>=0},
m(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.e_(b)},
e_(a){var s,r,q=this.d
if(q==null)return null
s=this.bO(q,a)
r=this.aL(s,a)
if(r<0)return null
return s[r].b},
p(a,b,c){var s,r,q=this,p=A.t(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bA(s==null?q.b=q.b6():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bA(r==null?q.c=q.b6():r,b,c)}else q.e1(b,c)},
e1(a,b){var s,r,q,p,o=this,n=A.t(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.b6()
r=o.bj(a)
q=s[r]
if(q==null)s[r]=[o.b7(a,b)]
else{p=o.aL(q,a)
if(p>=0)q[p].b=b
else q.push(o.b7(a,b))}},
aN(a,b){var s,r,q=this,p=A.t(q)
p.c.a(a)
p.h("2()").a(b)
if(q.am(a)){s=q.m(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.p(0,a,r)
return r},
av(a,b){var s=this
if(typeof b=="string")return s.bU(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.bU(s.c,b)
else return s.e0(b)},
e0(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.bj(a)
r=n[s]
q=o.aL(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.c7(p)
if(r.length===0)delete n[s]
return p.b},
W(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.b5()}},
ao(a,b){var s,r,q=this
A.t(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.c(A.at(q))
s=s.c}},
bA(a,b,c){var s,r=A.t(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.b7(b,c)
else s.b=c},
bU(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.c7(s)
delete a[b]
return s.b},
b5(){this.r=this.r+1&1073741823},
b7(a,b){var s=this,r=A.t(s),q=new A.h9(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.b5()
return q},
c7(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.b5()},
bj(a){return J.L(a)&1073741823},
bO(a,b){return a[this.bj(b)]},
aL(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.b9(a[r].a,b))return r
return-1},
j(a){return A.jF(this)},
b6(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ikq:1}
A.h9.prototype={}
A.by.prototype={
gn(a){return this.a.a},
gu(a){var s=this.a
return new A.cH(s,s.r,s.e,this.$ti.h("cH<1>"))}}
A.cH.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.at(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iJ:1}
A.aB.prototype={
gn(a){return this.a.a},
gu(a){var s=this.a
return new A.aX(s,s.r,s.e,this.$ti.h("aX<1>"))}}
A.aX.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.at(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iJ:1}
A.aW.prototype={
gn(a){return this.a.a},
gu(a){var s=this.a
return new A.cG(s,s.r,s.e,this.$ti.h("cG<1,2>"))}}
A.cG.prototype={
gl(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.at(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.R(s.a,s.b,r.$ti.h("R<1,2>"))
r.c=s.c
return!0}},
$iJ:1}
A.j4.prototype={
$1(a){return this.a(a)},
$S:23}
A.j5.prototype={
$2(a,b){return this.a(a,b)},
$S:13}
A.j6.prototype={
$1(a){return this.a(A.aO(a))},
$S:58}
A.b4.prototype={
gE(a){return A.aP(this.bQ())},
bQ(){return A.oO(this.$r,this.bP())},
j(a){return this.c6(!1)},
c6(a){var s,r,q,p,o,n=this.dh(),m=this.bP(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.h(m,q)
o=m[q]
l=a?l+A.kz(o):l+A.p(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
dh(){var s,r=this.$s
while($.ik.length<=r)B.a.i($.ik,null)
s=$.ik[r]
if(s==null){s=this.d6()
B.a.p($.ik,r,s)}return s},
d6(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.jz(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.p(j,q,r[s])}}return A.hc(j,k)}}
A.bl.prototype={
bP(){return[this.a,this.b]},
T(a,b){if(b==null)return!1
return b instanceof A.bl&&this.$s===b.$s&&J.b9(this.a,b.a)&&J.b9(this.b,b.b)},
gB(a){return A.cT(this.$s,this.a,this.b,B.j,B.j,B.j)}}
A.c0.prototype={
gE(a){return B.cF},
$iC:1}
A.cP.prototype={
dk(a,b,c,d){var s=A.am(b,0,c,d,null)
throw A.c(s)},
bC(a,b,c,d){if(b>>>0!==b||b>c)this.dk(a,b,c,d)}}
A.eg.prototype={
gE(a){return B.cG},
$iC:1}
A.a3.prototype={
gn(a){return a.length},
bY(a,b,c,d,e){var s,r=a.length
this.bC(a,b,r,"start")
this.bC(a,c,r,"end")
if(b>c)throw A.c(A.am(b,0,c,null,null))
s=c-b
if(e<0)throw A.c(A.o(e,null))
if(16-e<s)throw A.c(A.k("Not enough elements"))
if(e!==0||16!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iaj:1}
A.cN.prototype={
m(a,b){A.b7(b,a,a.length)
return a[b]},
p(a,b,c){A.iy(c)
a.$flags&2&&A.aG(a)
A.b7(b,a,a.length)
a[b]=c},
bw(a,b,c,d){t.bM.a(d)
a.$flags&2&&A.aG(a,5)
this.bY(a,b,c,d,0)
return},
$iq:1,
$ii:1,
$iv:1}
A.cO.prototype={
p(a,b,c){A.a(c)
a.$flags&2&&A.aG(a)
A.b7(b,a,a.length)
a[b]=c},
cN(a,b,c,d,e){t.hb.a(d)
a.$flags&2&&A.aG(a,5)
this.bY(a,b,c,d,e)
return},
$iq:1,
$ii:1,
$iv:1}
A.cM.prototype={
gE(a){return B.cH},
$iC:1,
$ifP:1}
A.eh.prototype={
gE(a){return B.cI},
$iC:1,
$ifQ:1}
A.ei.prototype={
gE(a){return B.cJ},
m(a,b){A.b7(b,a,a.length)
return a[b]},
$iC:1}
A.ej.prototype={
gE(a){return B.cK},
m(a,b){A.b7(b,a,a.length)
return a[b]},
$iC:1}
A.ek.prototype={
gE(a){return B.cL},
m(a,b){A.b7(b,a,a.length)
return a[b]},
$iC:1}
A.el.prototype={
gE(a){return B.cO},
m(a,b){A.b7(b,a,a.length)
return a[b]},
$iC:1}
A.em.prototype={
gE(a){return B.cP},
m(a,b){A.b7(b,a,a.length)
return a[b]},
$iC:1}
A.cQ.prototype={
gE(a){return B.cQ},
gn(a){return a.length},
m(a,b){A.b7(b,a,a.length)
return a[b]},
$iC:1}
A.cR.prototype={
gE(a){return B.cR},
gn(a){return a.length},
m(a,b){A.b7(b,a,a.length)
return a[b]},
$iC:1,
$ieL:1}
A.dh.prototype={}
A.di.prototype={}
A.dj.prototype={}
A.dk.prototype={}
A.aD.prototype={
h(a){return A.du(v.typeUniverse,this,a)},
G(a){return A.l6(v.typeUniverse,this,a)}}
A.f9.prototype={}
A.ir.prototype={
j(a){return A.aq(this.a,null)}}
A.f7.prototype={
j(a){return this.a}}
A.dq.prototype={$ib1:1}
A.i_.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:8}
A.hZ.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:22}
A.i0.prototype={
$0(){this.a.$0()},
$S:9}
A.i1.prototype={
$0(){this.a.$0()},
$S:9}
A.ip.prototype={
cT(a,b){if(self.setTimeout!=null)self.setTimeout(A.ch(new A.iq(this,b),0),a)
else throw A.c(A.aM("`setTimeout()` not found."))}}
A.iq.prototype={
$0(){this.b.$0()},
$S:0}
A.eX.prototype={
ba(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.aV(a)
else{s=r.a
if(q.h("bx<1>").b(a))s.bB(a)
else s.bI(a)}},
bb(a,b){var s=this.a
if(this.b)s.aZ(new A.as(a,b))
else s.aW(new A.as(a,b))}}
A.iz.prototype={
$1(a){return this.a.$2(0,a)},
$S:5}
A.iA.prototype={
$2(a,b){this.a.$2(1,new A.cw(a,t.l.a(b)))},
$S:27}
A.iV.prototype={
$2(a,b){this.a(A.a(a),b)},
$S:35}
A.b5.prototype={
gl(){var s=this.b
return s==null?this.$ti.c.a(s):s},
dr(a,b){var s,r,q
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
o.d=null}q=o.dr(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.l0
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
o.a=A.l0
throw n
return!1}if(0>=p.length)return A.h(p,-1)
o.a=p.pop()
m=1
continue}throw A.c(A.k("sync*"))}return!1},
ey(a){var s,r,q=this
if(a instanceof A.bn){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.i(r,q.a)
q.a=s
return 2}else{q.d=J.a_(a)
return 2}},
$iJ:1}
A.bn.prototype={
gu(a){return new A.b5(this.a(),this.$ti.h("b5<1>"))}}
A.as.prototype={
j(a){return A.p(this.a)},
$iE:1,
gai(){return this.b}}
A.f1.prototype={
bb(a,b){var s=this.a
if((s.a&30)!==0)throw A.c(A.k("Future already completed"))
s.aW(A.od(a,b))},
cb(a){return this.bb(a,null)}}
A.da.prototype={
ba(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.c(A.k("Future already completed"))
s.aV(r.h("1/").a(a))}}
A.bG.prototype={
e4(a){if((this.c&15)!==6)return!0
return this.b.b.br(t.al.a(this.d),a.a,t.y,t.K)},
dV(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.Y.b(q))p=l.em(q,m,a.b,o,n,t.l)
else p=l.br(t.D.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.b8(s))){if((r.c&1)!==0)throw A.c(A.o("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.c(A.o("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.P.prototype={
cG(a,b,c){var s,r,q=this.$ti
q.G(c).h("1/(2)").a(a)
s=$.K
if(s===B.n){if(!t.Y.b(b)&&!t.D.b(b))throw A.c(A.aS(b,"onError",u.c))}else{c.h("@<0/>").G(q.c).h("1(2)").a(a)
b=A.ot(b,s)}r=new A.P(s,c.h("P<0>"))
this.aU(new A.bG(r,3,a,b,q.h("@<1>").G(c).h("bG<1,2>")))
return r},
c4(a,b,c){var s,r=this.$ti
r.G(c).h("1/(2)").a(a)
s=new A.P($.K,c.h("P<0>"))
this.aU(new A.bG(s,19,a,b,r.h("@<1>").G(c).h("bG<1,2>")))
return s},
ds(a){this.a=this.a&1|16
this.c=a},
aE(a){this.a=a.a&30|this.a&1
this.c=a.c},
aU(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aU(a)
return}r.aE(s)}A.fx(null,null,r.b,t.M.a(new A.i5(r,a)))}},
bT(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bT(a)
return}m.aE(n)}l.a=m.aH(a)
A.fx(null,null,m.b,t.M.a(new A.i9(l,m)))}},
aG(){var s=t.F.a(this.c)
this.c=null
return this.aH(s)},
aH(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bI(a){var s,r=this
r.$ti.c.a(a)
s=r.aG()
r.a=8
r.c=a
A.c8(r,s)},
d5(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aG()
q.aE(a)
A.c8(q,r)},
aZ(a){var s=this.aG()
this.ds(a)
A.c8(this,s)},
aV(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bx<1>").b(a)){this.bB(a)
return}this.cW(a)},
cW(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.fx(null,null,s.b,t.M.a(new A.i7(s,a)))},
bB(a){A.jL(this.$ti.h("bx<1>").a(a),this,!1)
return},
aW(a){this.a^=2
A.fx(null,null,this.b,t.M.a(new A.i6(this,a)))},
$ibx:1}
A.i5.prototype={
$0(){A.c8(this.a,this.b)},
$S:0}
A.i9.prototype={
$0(){A.c8(this.b,this.a.a)},
$S:0}
A.i8.prototype={
$0(){A.jL(this.a.a,this.b,!0)},
$S:0}
A.i7.prototype={
$0(){this.a.bI(this.b)},
$S:0}
A.i6.prototype={
$0(){this.a.aZ(this.b)},
$S:0}
A.ic.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.el(t.fO.a(q.d),t.A)}catch(p){s=A.b8(p)
r=A.cj(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jw(q)
n=k.a
n.c=new A.as(q,o)
q=n}q.b=!0
return}if(j instanceof A.P&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.P){m=k.b.a
l=new A.P(m.b,m.$ti)
j.cG(new A.id(l,m),new A.ie(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.id.prototype={
$1(a){this.a.d5(this.b)},
$S:8}
A.ie.prototype={
$2(a,b){A.dE(a)
t.l.a(b)
this.a.aZ(new A.as(a,b))},
$S:40}
A.ib.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.br(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.b8(l)
r=A.cj(l)
q=s
p=r
if(p==null)p=A.jw(q)
o=this.a
o.c=new A.as(q,p)
o.b=!0}},
$S:0}
A.ia.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.e4(s)&&p.a.e!=null){p.c=p.a.dV(s)
p.b=!1}}catch(o){r=A.b8(o)
q=A.cj(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jw(p)
m=l.b
m.c=new A.as(p,n)
p=m}p.b=!0}},
$S:0}
A.eY.prototype={}
A.fo.prototype={}
A.dB.prototype={$ikV:1}
A.fh.prototype={
en(a){var s,r,q
t.M.a(a)
try{if(B.n===$.K){a.$0()
return}A.lv(null,null,this,a,t.H)}catch(q){s=A.b8(q)
r=A.cj(q)
A.jY(A.dE(s),t.l.a(r))}},
dG(a){return new A.il(this,t.M.a(a))},
el(a,b){b.h("0()").a(a)
if($.K===B.n)return a.$0()
return A.lv(null,null,this,a,b)},
br(a,b,c,d){c.h("@<0>").G(d).h("1(2)").a(a)
d.a(b)
if($.K===B.n)return a.$1(b)
return A.ov(null,null,this,a,b,c,d)},
em(a,b,c,d,e,f){d.h("@<0>").G(e).G(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.K===B.n)return a.$2(b,c)
return A.ou(null,null,this,a,b,c,d,e,f)},
cE(a,b,c,d){return b.h("@<0>").G(c).G(d).h("1(2,3)").a(a)}}
A.il.prototype={
$0(){return this.a.en(this.b)},
$S:0}
A.iU.prototype={
$0(){A.mf(this.a,this.b)},
$S:0}
A.dc.prototype={
gn(a){return this.a},
ga0(){return new A.bH(this,this.$ti.h("bH<1>"))},
gah(){var s=this.$ti
return A.ks(new A.bH(this,s.h("bH<1>")),new A.ih(this),s.c,s.y[1])},
am(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.d9(a)},
d9(a){var s=this.d
if(s==null)return!1
return this.a6(this.bF(s,a),a)>=0},
m(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.kX(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.kX(q,b)
return r}else return this.dj(b)},
dj(a){var s,r,q=this.d
if(q==null)return null
s=this.bF(q,a)
r=this.a6(s,a)
return r<0?null:s[r+1]},
p(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.bE(s==null?m.b=A.jM():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.bE(r==null?m.c=A.jM():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.jM()
p=A.jh(b)&1073741823
o=q[p]
if(o==null){A.jN(q,p,[b,c]);++m.a
m.e=null}else{n=m.a6(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
ao(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.bJ()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.m(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.c(A.at(m))}},
bJ(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.cJ(i.a,null,!1,t.A)
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
bE(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.jN(a,b,c)},
bF(a,b){return a[A.jh(b)&1073741823]}}
A.ih.prototype={
$1(a){var s=this.a,r=s.$ti
s=s.m(0,r.c.a(a))
return s==null?r.y[1].a(s):s},
$S(){return this.a.$ti.h("2(1)")}}
A.de.prototype={
a6(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.bH.prototype={
gn(a){return this.a.a},
gu(a){var s=this.a
return new A.dd(s,s.bJ(),this.$ti.h("dd<1>"))}}
A.dd.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.c(A.at(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iJ:1}
A.aF.prototype={
dl(){return new A.aF(A.t(this).h("aF<1>"))},
gu(a){var s=this,r=new A.bK(s,s.r,A.t(s).h("bK<1>"))
r.c=s.e
return r},
gn(a){return this.a},
q(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.d8(b)},
d8(a){var s=this.d
if(s==null)return!1
return this.a6(s[this.b_(a)],a)>=0},
i(a,b){var s,r,q=this
A.t(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bD(s==null?q.b=A.jO():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bD(r==null?q.c=A.jO():r,b)}else return q.cU(b)},
cU(a){var s,r,q,p=this
A.t(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jO()
r=p.b_(a)
q=s[r]
if(q==null)s[r]=[p.aY(a)]
else{if(p.a6(q,a)>=0)return!1
q.push(p.aY(a))}return!0},
av(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bG(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bG(s.c,b)
else return s.dn(b)},
dn(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.b_(a)
r=n[s]
q=o.a6(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bH(p)
return!0},
W(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aX()}},
bD(a,b){A.t(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aY(b)
return!0},
bG(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bH(s)
delete a[b]
return!0},
aX(){this.r=this.r+1&1073741823},
aY(a){var s,r=this,q=new A.fb(A.t(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aX()
return q},
bH(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aX()},
b_(a){return J.L(a)&1073741823},
a6(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.b9(a[r].a,b))return r
return-1},
$ikr:1}
A.fb.prototype={}
A.bK.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.c(A.at(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iJ:1}
A.ha.prototype={
$2(a,b){this.a.p(0,this.b.a(a),this.c.a(b))},
$S:34}
A.y.prototype={
gu(a){return new A.ad(a,this.gn(a),A.bs(a).h("ad<y.E>"))},
O(a,b){return this.m(a,b)},
ci(a,b){var s,r
A.bs(a).h("z(y.E)").a(b)
s=this.gn(a)
for(r=0;r<s;++r){if(!b.$1(this.m(a,r)))return!1
if(s!==this.gn(a))throw A.c(A.at(a))}return!0},
dT(a,b,c,d){var s
A.bs(a).h("y.E?").a(d)
A.ew(b,c,this.gn(a))
for(s=b;s<c;++s)this.p(a,s,d)},
j(a){return A.jy(a,"[","]")},
$iq:1,
$ii:1,
$iv:1}
A.bz.prototype={
ao(a,b){var s,r,q,p=A.t(this)
p.h("~(1,2)").a(b)
for(s=this.ga0(),s=s.gu(s),p=p.y[1];s.k();){r=s.gl()
q=this.m(0,r)
b.$2(r,q==null?p.a(q):q)}},
ga2(){var s=this.ga0(),r=A.t(this).h("R<1,2>"),q=A.t(s)
return A.ks(s,q.G(r).h("1(i.E)").a(new A.hd(this)),q.h("i.E"),r)},
gn(a){var s=this.ga0()
return s.gn(s)},
gah(){return new A.df(this,A.t(this).h("df<1,2>"))},
j(a){return A.jF(this)},
$ia0:1}
A.hd.prototype={
$1(a){var s=this.a,r=A.t(s)
r.c.a(a)
s=s.m(0,a)
if(s==null)s=r.y[1].a(s)
return new A.R(a,s,r.h("R<1,2>"))},
$S(){return A.t(this.a).h("R<1,2>(1)")}}
A.he.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.p(a)
r.a=(r.a+=s)+": "
s=A.p(b)
r.a+=s},
$S:65}
A.df.prototype={
gn(a){var s=this.a
return s.gn(s)},
gu(a){var s=this.a,r=s.ga0()
return new A.dg(r.gu(r),s,this.$ti.h("dg<1,2>"))}}
A.dg.prototype={
k(){var s=this,r=s.a
if(r.k()){s.c=s.b.m(0,r.gl())
return!0}s.c=null
return!1},
gl(){var s=this.c
return s==null?this.$ti.y[1].a(s):s},
$iJ:1}
A.dv.prototype={
p(a,b,c){var s=A.t(this)
s.c.a(b)
s.y[1].a(c)
throw A.c(A.aM("Cannot modify unmodifiable map"))}}
A.bZ.prototype={
m(a,b){return this.a.m(0,b)},
p(a,b,c){var s=A.t(this)
this.a.p(0,s.c.a(b),s.y[1].a(c))},
gn(a){var s=this.a
return s.gn(s)},
ga0(){return this.a.ga0()},
j(a){return this.a.j(0)},
gah(){return this.a.gah()},
ga2(){return this.a.ga2()},
$ia0:1}
A.bk.prototype={}
A.b0.prototype={
gcq(a){return this.gn(this)!==0},
V(a,b){var s
for(s=J.a_(A.t(this).h("i<1>").a(b));s.k();)this.i(0,s.gl())},
cd(a){var s,r,q=this.ag(0)
for(s=this.gu(this);s.k();){r=s.gl()
if(a.q(0,r))q.av(0,r)}return q},
j(a){return A.jy(this,"{","}")},
ac(a,b){var s,r,q=this.gu(this)
if(!q.k())return""
s=J.aR(q.gl())
if(!q.k())return s
if(b.length===0){r=s
do r+=A.p(q.gl())
while(q.k())}else{r=s
do r=r+b+A.p(q.gl())
while(q.k())}return r.charCodeAt(0)==0?r:r},
dC(a,b){var s
A.t(this).h("z(1)").a(b)
for(s=this.gu(this);s.k();)if(b.$1(s.gl()))return!0
return!1},
O(a,b){var s,r
A.ev(b,"index")
s=this.gu(this)
for(r=b;s.k();){if(r===0)return s.gl();--r}throw A.c(A.h7(b,b-r,this,"index"))},
$iq:1,
$ii:1,
$ibi:1}
A.dm.prototype={
ag(a){var s=this.dl()
s.V(0,this)
return s}}
A.fq.prototype={
i(a,b){this.$ti.c.a(b)
return A.nC()}}
A.d7.prototype={
gn(a){return this.a.a},
gu(a){var s=this.a
return A.ij(s,s.r,A.t(s).c)},
ag(a){return this.a.ag(0)}}
A.cc.prototype={}
A.dw.prototype={}
A.iv.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:10}
A.iu.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:10}
A.dN.prototype={
e5(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a3.length
a5=A.ew(a4,a5,a2)
s=$.lY()
for(r=s.length,q=a4,p=q,o=null,n=-1,m=-1,l=0;q<a5;q=k){k=q+1
if(!(q<a2))return A.h(a3,q)
j=a3.charCodeAt(q)
if(j===37){i=k+2
if(i<=a5){if(!(k<a2))return A.h(a3,k)
h=A.j3(a3.charCodeAt(k))
g=k+1
if(!(g<a2))return A.h(a3,g)
f=A.j3(a3.charCodeAt(g))
e=h*16+f-(f&256)
if(e===37)e=-1
k=i}else e=-1}else e=j
if(0<=e&&e<=127){if(!(e>=0&&e<r))return A.h(s,e)
d=s[e]
if(d>=0){if(!(d<64))return A.h(a0,d)
e=a0.charCodeAt(d)
if(e===j)continue
j=e}else{if(d===-1){if(n<0){g=o==null?null:o.a.length
if(g==null)g=0
n=g+(q-p)
m=q}++l
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.ae("")
g=o}else g=o
g.a+=B.c.t(a3,p,q)
c=A.bB(j)
g.a+=c
p=k
continue}}throw A.c(A.ab("Invalid base64 data",a3,q))}if(o!=null){a2=B.c.t(a3,p,a5)
a2=o.a+=a2
r=a2.length
if(n>=0)A.ke(a3,m,a5,n,l,r)
else{b=B.i.aC(r-1,4)+1
if(b===1)throw A.c(A.ab(a1,a3,a5))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.c.af(a3,a4,a5,a2.charCodeAt(0)==0?a2:a2)}a=a5-a4
if(n>=0)A.ke(a3,m,a5,n,l,a)
else{b=B.i.aC(a,4)
if(b===1)throw A.c(A.ab(a1,a3,a5))
if(b>1)a3=B.c.af(a3,a5,a5,b===2?"==":"=")}return a3}}
A.fA.prototype={}
A.bT.prototype={}
A.dY.prototype={}
A.e3.prototype={}
A.eR.prototype={}
A.hT.prototype={
dL(a){return new A.it(this.a).da(t.L.a(a),0,null,!0)}}
A.it.prototype={
da(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.ew(b,c,J.ba(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.nT(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.nS(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.b0(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.nU(o)
l.b=0
throw A.c(A.ab(m,a,p+l.c))}return n},
b0(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.i.c2(b+c,2)
r=q.b0(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.b0(a,s,c,d)}return q.dO(a,b,c,d)},
dO(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.ae(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.h(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.h(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.h(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.bB(f)
e.a+=p
if(d===a0)break A
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.bB(h)
e.a+=p
break
case 65:p=A.bB(h)
e.a+=p;--d
break
default:p=A.bB(h)
e.a=(e.a+=p)+p
break}else{k.b=g
k.c=d-1
return""}g=0}if(d===a0)break A
o=d+1
if(!(d>=0&&d<c))return A.h(a,d)
s=a[d]}o=d+1
if(!(d>=0&&d<c))return A.h(a,d)
s=a[d]
if(s<128){for(;;){if(!(o<a0)){n=a0
break}m=o+1
if(!(o>=0&&o<c))return A.h(a,o)
s=a[o]
if(s>=128){n=m-1
o=m
break}o=m}if(n-d<20)for(l=d;l<n;++l){if(!(l<c))return A.h(a,l)
p=A.bB(a[l])
e.a+=p}else{p=A.kF(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.bB(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.bv.prototype={
T(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bv)if(this.a===b.a)s=this.b===b.b
return s},
gB(a){return A.cT(this.a,this.b,B.j,B.j,B.j,B.j)},
N(a,b){var s
t.df.a(b)
s=B.i.N(this.a,b.a)
if(s!==0)return s
return B.i.N(this.b,b.b)},
j(a){var s=this,r=A.mc(A.mH(s)),q=A.dZ(A.mF(s)),p=A.dZ(A.mB(s)),o=A.dZ(A.mC(s)),n=A.dZ(A.mE(s)),m=A.dZ(A.mG(s)),l=A.kl(A.mD(s)),k=s.b,j=k===0?"":A.kl(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iaf:1}
A.i2.prototype={
j(a){return this.v()}}
A.E.prototype={
gai(){return A.mA(this)}}
A.dL.prototype={
j(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.fK(s)
return"Assertion failed"}}
A.b1.prototype={}
A.aH.prototype={
gb4(){return"Invalid argument"+(!this.a?"(s)":"")},
gb3(){return""},
j(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.p(p),n=s.gb4()+q+o
if(!s.a)return n
return n+s.gb3()+": "+A.fK(s.gbk())},
gbk(){return this.b}}
A.cW.prototype={
gbk(){return A.lg(this.b)},
gb4(){return"RangeError"},
gb3(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.p(q):""
else if(q==null)s=": Not greater than or equal to "+A.p(r)
else if(q>r)s=": Not in inclusive range "+A.p(r)+".."+A.p(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.p(r)
return s}}
A.e9.prototype={
gbk(){return A.a(this.b)},
gb4(){return"RangeError"},
gb3(){if(A.a(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gn(a){return this.f}}
A.d8.prototype={
j(a){return"Unsupported operation: "+this.a}}
A.eM.prototype={
j(a){return"UnimplementedError: "+this.a}}
A.c5.prototype={
j(a){return"Bad state: "+this.a}}
A.dV.prototype={
j(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.fK(s)+"."}}
A.eo.prototype={
j(a){return"Out of Memory"},
gai(){return null},
$iE:1}
A.d4.prototype={
j(a){return"Stack Overflow"},
gai(){return null},
$iE:1}
A.i3.prototype={
j(a){return"Exception: "+this.a}}
A.aT.prototype={
j(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.c.t(e,0,75)+"..."
return g+"\n"+e}for(r=e.length,q=1,p=0,o=!1,n=0;n<f;++n){if(!(n<r))return A.h(e,n)
m=e.charCodeAt(n)
if(m===10){if(p!==n||!o)++q
p=n+1
o=!1}else if(m===13){++q
p=n+1
o=!0}}g=q>1?g+(" (at line "+q+", character "+(f-p+1)+")\n"):g+(" (at character "+(f+1)+")\n")
for(n=f;n<r;++n){if(!(n>=0))return A.h(e,n)
m=e.charCodeAt(n)
if(m===10||m===13){r=n
break}}l=""
if(r-p>78){k="..."
if(f-p<75){j=p+75
i=p}else{if(r-f<75){i=r-75
j=r
k=""}else{i=f-36
j=f+36}l="..."}}else{j=r
i=p
k=""}return g+l+B.c.t(e,i,j)+k+"\n"+B.c.C(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.p(f)+")"):g}}
A.i.prototype={
an(a,b,c,d){var s,r
d.a(b)
A.t(this).G(d).h("1(1,i.E)").a(c)
for(s=this.gu(this),r=b;s.k();)r=c.$2(r,s.gl())
return r},
ac(a,b){var s,r,q=this.gu(this)
if(!q.k())return""
s=J.aR(q.gl())
if(!q.k())return s
if(b.length===0){r=s
do r+=J.aR(q.gl())
while(q.k())}else{r=s
do r=r+b+J.aR(q.gl())
while(q.k())}return r.charCodeAt(0)==0?r:r},
gn(a){var s,r=this.gu(this)
for(s=0;r.k();)++s
return s},
dU(a,b){var s,r
A.t(this).h("z(i.E)").a(b)
for(s=this.gu(this);s.k();){r=s.gl()
if(b.$1(r))return r}throw A.c(A.jx())},
O(a,b){var s,r
A.ev(b,"index")
s=this.gu(this)
for(r=b;s.k();){if(r===0)return s.gl();--r}throw A.c(A.h7(b,b-r,this,"index"))},
j(a){return A.mn(this,"(",")")}}
A.R.prototype={
j(a){return"MapEntry("+A.p(this.a)+": "+A.p(this.b)+")"}}
A.U.prototype={
gB(a){return A.w.prototype.gB.call(this,0)},
j(a){return"null"}}
A.w.prototype={$iw:1,
T(a,b){return this===b},
gB(a){return A.es(this)},
j(a){return"Instance of '"+A.et(this)+"'"},
gE(a){return A.k3(this)},
toString(){return this.j(this)}}
A.fp.prototype={
j(a){return""},
$ibj:1}
A.ae.prototype={
gn(a){return this.a.length},
j(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$imQ:1}
A.hS.prototype={
$2(a,b){var s,r,q,p
t.f.a(a)
A.aO(b)
s=B.c.aJ(b,"=")
if(s===-1){if(b!=="")a.p(0,A.jU(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.c.t(b,0,s)
q=B.c.aD(b,s+1)
p=this.a
a.p(0,A.jU(r,0,r.length,p,!0),A.jU(q,0,q.length,p,!0))}return a},
$S:14}
A.hR.prototype={
$2(a,b){throw A.c(A.ab("Illegal IPv6 address, "+a,this.a,b))},
$S:15}
A.dx.prototype={
gc3(){var s,r,q,p,o=this,n=o.w
if(n===$){s=o.a
r=s.length!==0?s+":":""
q=o.c
p=q==null
if(!p||s==="file"){s=r+"//"
r=o.b
if(r.length!==0)s=s+r+"@"
if(!p)s+=q
r=o.d
if(r!=null)s=s+":"+A.p(r)}else s=r
s+=o.e
r=o.f
if(r!=null)s=s+"?"+r
r=o.r
if(r!=null)s=s+"#"+r
n=o.w=s.charCodeAt(0)==0?s:s}return n},
gB(a){var s,r=this,q=r.y
if(q===$){s=B.c.gB(r.gc3())
r.y!==$&&A.js()
r.y=s
q=s}return q},
gcC(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.kN(s==null?"":s)
r.z!==$&&A.js()
q=r.z=new A.bk(s,t.h)}return q},
gcJ(){return this.b},
gbh(){var s=this.c
if(s==null)return""
if(B.c.H(s,"[")&&!B.c.J(s,"v",1))return B.c.t(s,1,s.length-1)
return s},
gbn(){var s=this.d
return s==null?A.l7(this.a):s},
gbo(){var s=this.f
return s==null?"":s},
gcj(){var s=this.r
return s==null?"":s},
gck(){return this.c!=null},
gcm(){return this.f!=null},
gcl(){return this.r!=null},
j(a){return this.gc3()},
T(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.dD.b(b))if(p.a===b.gbv())if(p.c!=null===b.gck())if(p.b===b.gcJ())if(p.gbh()===b.gbh())if(p.gbn()===b.gbn())if(p.e===b.gcB()){r=p.f
q=r==null
if(!q===b.gcm()){if(q)r=""
if(r===b.gbo()){r=p.r
q=r==null
if(!q===b.gcl()){s=q?"":r
s=s===b.gcj()}}}}return s},
$ieP:1,
gbv(){return this.a},
gcB(){return this.e}}
A.hQ.prototype={
gcI(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.h(m,0)
s=o.a
m=m[0]+1
r=B.c.aK(s,"?",m)
q=s.length
if(r>=0){p=A.dy(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.f2("data","",n,n,A.dy(s,m,q,128,!1,!1),p,n)}return m},
j(a){var s,r=this.b
if(0>=r.length)return A.h(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.fl.prototype={
gck(){return this.c>0},
gcm(){return this.f<this.r},
gcl(){return this.r<this.a.length},
gbv(){var s=this.w
return s==null?this.w=this.d7():s},
d7(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.c.H(r.a,"http"))return"http"
if(q===5&&B.c.H(r.a,"https"))return"https"
if(s&&B.c.H(r.a,"file"))return"file"
if(q===7&&B.c.H(r.a,"package"))return"package"
return B.c.t(r.a,0,q)},
gcJ(){var s=this.c,r=this.b+3
return s>r?B.c.t(this.a,r,s-1):""},
gbh(){var s=this.c
return s>0?B.c.t(this.a,s,this.d):""},
gbn(){var s,r=this
if(r.c>0&&r.d+1<r.e)return A.lG(B.c.t(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.c.H(r.a,"http"))return 80
if(s===5&&B.c.H(r.a,"https"))return 443
return 0},
gcB(){return B.c.t(this.a,this.e,this.f)},
gbo(){var s=this.f,r=this.r
return s<r?B.c.t(this.a,s+1,r):""},
gcj(){var s=this.r,r=this.a
return s<r.length?B.c.aD(r,s+1):""},
gcC(){if(this.f>=this.r)return B.bO
return new A.bk(A.kN(this.gbo()),t.h)},
gB(a){var s=this.x
return s==null?this.x=B.c.gB(this.a):s},
T(a,b){if(b==null)return!1
if(this===b)return!0
return t.dD.b(b)&&this.a===b.j(0)},
j(a){return this.a},
$ieP:1}
A.f2.prototype={}
A.hl.prototype={
j(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.ji.prototype={
$1(a){return this.a.ba(this.b.h("0/?").a(a))},
$S:5}
A.jj.prototype={
$1(a){if(a==null)return this.a.cb(new A.hl(a===undefined))
return this.a.cb(a)},
$S:5}
A.iZ.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.lu(a))return a
s=this.a
a.toString
if(s.am(a))return s.m(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.l(A.am(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.bp(!0,"isUtc",t.y)
return new A.bv(r,0,!0)}if(a instanceof RegExp)throw A.c(A.o("structured clone of RegExp",null))
if(a instanceof Promise)return A.p3(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.ag(p,p)
s.p(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.fy(n),p=s.gu(n);p.k();)m.push(A.br(p.gl()))
for(l=0;l<s.gn(n);++l){k=s.m(n,l)
if(!(l<m.length))return A.h(m,l)
j=m[l]
if(k!=null)o.p(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.p(0,a,o)
h=A.a(a.length)
for(s=J.ci(i),l=0;l<h;++l)o.push(this.$1(s.m(i,l)))
return o}return a},
$S:16}
A.hv.prototype={}
A.c2.prototype={
v(){return"QualityProfileKind."+this.b}}
A.al.prototype={}
A.dW.prototype={
U(){var s=this
if(s.d)return
s.a.U()
s.b.U()
s.d=!0}}
A.dX.prototype={
U(){if(this.e)return
this.e=!0
this.a=null}}
A.hN.prototype={
v(){return"ToneMappingMode."+this.b}}
A.hs.prototype={
F(){var s,r,q,p
for(s=A.mr(["exposure",1,"bloomStrength",0,"ssaoStrength",0,"depthOfFieldStrength",0,"vignette",0,"grain",0,"rainIntensity",0,"surfaceWetness",0,"surfaceSnowCoverage",0,"surfaceDissolution",0,"rainWindowVisibility",1,"ditherStrength",0,"colorGradeStrength",0,"affineWarpStrength",0,"vertexSnapGrid",0,"vhsChromaWeight",0,"vhsTrackingWeight",0,"vhsNoiseWeight",0,"vhsHeadSwitchWeight",0,"vhsDropoutWeight",0,"vhsGhostWeight",0],t.N,t.i),s=new A.aW(s,A.t(s).h("aW<1,2>")).gu(0);s.k();){r=s.d
q=r.a
p=r.b
if(!isFinite(p)||p<0)throw A.c(A.o("PostProcessState."+q+" must be >= 0: "+A.p(p),null))}}}
A.bu.prototype={
gcp(){var s,r=this,q=r.x
if(q===$){s=r.b.co()
r.x!==$&&A.js()
r.x=s
q=s}return q},
F(){var s,r,q,p,o,n,m,l,k=this,j=null,i=k.d
if(!i.gP(0))throw A.c(A.o("CameraView.eye must be finite: "+i.j(0),j))
i=k.e
if(!i.gP(0)||i.ga8()<1e-12)throw A.c(A.o("CameraView.forward must be finite and nonzero: "+i.j(0),j))
i=k.f
if(isFinite(i)){s=k.r
s=!isFinite(s)||i<=0||s<=i}else s=!0
if(s)throw A.c(A.o("CameraView requires 0 < near < far, got "+A.p(i)+"/"+k.r,j))
i=k.w
if(!isFinite(i)||i<=0)throw A.c(A.o("CameraView.aspect must be finite and > 0: "+A.p(i),j))
i=k.a
if(!i.gP(0)||!k.b.gP(0)||!k.c.gP(0))throw A.c(A.o("CameraView matrices must be finite",j))
for(s=k.c.a,i=k.b.C(0,i).a,r=0,q=-1,p=0;p<16;++p){o=s[p]
n=i[p]
m=Math.abs(o-n)/(1+Math.abs(n))
if(m>r){q=p
r=m}}if(r>0.0001){o=B.w.er(r,2)
n=B.i.c2(q,4)
l=B.i.aC(q,4)
if(!(q>=0&&q<16))return A.h(s,q)
throw A.c(A.o("CameraView.viewProjection must equal projection * view. Worst relative mismatch "+o+" at column "+n+" row "+l+" (got "+A.p(s[q])+", expected "+A.p(i[q])+"). Prefer CameraView.look/lookAt/fromMatrices, which derive it.",j))}}}
A.fS.prototype={
F(){var s,r,q,p,o,n,m,l=null
if(!B.bp.gP(0)||!B.C.gP(0)||!B.D.gP(0)||!B.D.gP(0)||!B.C.gP(0))throw A.c(A.o("FrameEnvironment colors must be finite",l))
s=isFinite(0)
if(s)r=!isFinite(1)
else r=!0
if(r)throw A.c(A.o("FrameEnvironment requires fogEnd >= fogStart, got 0/1",l))
if(!s)throw A.c(A.o("FrameEnvironment.ambientIntensity must be >= 0: 0",l))
for(q=0;!1;++q)B.ao[q].F()
for(s=isFinite(1),r=isFinite(-1),q=0;!1;++q){if(!s)A.l(A.o("SpotLight.position must be finite: "+B.p.j(0),l))
if(!r)A.l(A.o("SpotLight.direction must be finite and nonzero: "+B.u.j(0),l))}r=t.N
p=A.ac(r)
for(q=0;!1;++q){o=B.ap[q]
o.F()
if(!p.i(0,o.gD()))throw A.c(A.o("FrameEnvironment.volumetricSources contains duplicate id: "+A.p(o.gD()),l))}n=!0
if(isFinite(0.02))if(isFinite(0.7))if(isFinite(0.35))if(s)s=!isFinite(0.003)
else s=n
else s=n
else s=n
else s=n
if(s)throw A.c(A.o("invalid volumetric medium controls",l))
m=A.ac(r)
for(q=0;!1;++q){o=B.aq[q]
o.F()
if(!m.i(0,o.gD()))throw A.c(A.o("FrameEnvironment.thermalSources contains duplicate id: "+A.p(o.gD()),l))}}}
A.fT.prototype={}
A.fV.prototype={
bl(a){++this.b},
cv(a,b,c,d){var s=this.a
this.a=s+1
return new A.fT(a,b,c,-1,s,d)}}
A.aZ.prototype={
T(a,b){if(b==null)return!1
return J.dK(b)===A.k3(this)&&b instanceof A.aZ&&this.a===b.a&&this.b===b.b},
gB(a){return A.cT(A.k3(this),this.a,this.b,B.j,B.j,B.j)}}
A.ak.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MeshHandle(#"+this.a+"."+this.b+s+")"}}
A.an.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"TextureHandle(#"+this.a+"."+this.b+s+")"}}
A.aJ.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MaterialHandle(#"+this.a+"."+this.b+s+")"}}
A.ep.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"PipelineHandle(#"+this.a+"."+this.b+s+")"}}
A.be.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.cz.prototype={
v(){return"HandleRejection."+this.b}}
A.h6.prototype={
j(a){return"HandleException("+this.a.b+", "+this.b.j(0)+")"}}
A.aK.prototype={
j(a){var s=this.b,r=this.a.a
return s==null?r.b+": ok":r.b+": "+A.p(s)}}
A.dQ.prototype={
gdS(){var s,r=this.d
if(r.length<=1)return null
s=A.H(r)
return new A.aC(new A.a2(r,s.h("z(1)").a(new A.fC()),s.h("a2<1>")),s.h("m(1)").a(new A.fD()),s.h("aC<1,m>")).ac(0,"; ")}}
A.fC.prototype={
$1(a){return t.x.a(a).b!=null},
$S:17}
A.fD.prototype={
$1(a){t.x.a(a)
return a.a.a.b+" failed: "+A.p(a.b)},
$S:18}
A.j_.prototype={
$1(a){return t.W.a(a)===this.a},
$S:19}
A.bY.prototype={
gP(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
T(a,b){if(b==null)return!1
return b instanceof A.bY&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gB(a){return A.cT(this.a,this.b,this.c,B.j,B.j,B.j)},
j(a){return"LinearColor("+A.p(this.a)+", "+A.p(this.b)+", "+A.p(this.c)+")"}}
A.ai.prototype={}
A.jl.prototype={
$2(a,b){var s,r=t.fk
r.a(a)
s=B.w.N(r.a(b).a,a.a)
return s===0?0:s},
$S:20}
A.jk.prototype={
$2(a,b){var s,r=t.e8
r.a(a)
s=J.ju(r.a(b).a,a.a)
return s},
$S:21}
A.aE.prototype={
v(){return"VertexAttributeKind."+this.b}}
A.fI.prototype={}
A.hn.prototype={
F(){var s=this.a,r=s.a
if(!r.q(0,"sceneColor")||!r.q(0,"present"))throw A.c(A.o("resource plan must contain sceneColor and present",null))
if(s.dC(0,new A.hp()))throw A.c(A.o("resource plan contains an empty resource ID",null))
if(this.b!==r.q(0,"vhsOutput"))throw A.c(A.o("resource history does not match vhsOutput ownership",null))}}
A.hp.prototype={
$1(a){return A.aO(a).length===0},
$S:6}
A.ht.prototype={}
A.d0.prototype={
cn(a){var s=this
if(s.d)A.l(A.k("resource assembler is disposed"))
if(s.a!=null)throw A.c(A.k("resource assembler is initialized"))
a.F()
s.a=a
s.c=1},
U(){if(this.d)return
this.d=!0
this.a=null}}
A.d6.prototype={
j(a){var s=this
return"SurfaceMetrics(css "+s.a+"x"+s.b+", pixels "+s.c+"x"+s.d+", dpr "+A.p(s.e)+", visible: true)"},
F(){var s,r=this
if(r.a<0||r.b<0)throw A.c(A.o("SurfaceMetrics css size must be >= 0",null))
if(r.c<0||r.d<0)throw A.c(A.o("SurfaceMetrics pixel size must be >= 0",null))
s=r.e
if(!isFinite(s)||s<=0)throw A.c(A.o("SurfaceMetrics.devicePixelRatio must be finite and > 0: "+A.p(s),null))}}
A.fE.prototype={
v(){return"ColorEncoding."+this.b}}
A.cY.prototype={
F(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.cd(B.cw)
if(o.a!==0)A.l(A.aS(o,r,"contains unknown pipeline features"))
if(q.a===B.ay&&p.gcq(p))A.l(A.aS(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.c(A.o("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.c(A.o("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.c3.prototype={
v(){return"RendererState."+this.b}}
A.O.prototype={}
A.fW.prototype={
j(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.c+" tris="+s.d+" culled="+s.e+" gpu="+s.w+"B)"}}
A.ef.prototype={
ee(a){return this.a.ab(a)}}
A.hg.prototype={
$3(a,b,c){return new A.aJ(A.a(a),A.a(b),A.bM(c))},
$S:24}
A.eO.prototype={}
A.hi.prototype={
dz(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.gcK(),d=A.n9(f,new A.fZ(e.gcu(e),B.b8,B.b6))
e=a.gcK()
if(f.b!==B.f)A.l(A.k(g))
s=A.Y(d.a)
r=f.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.aw(f)
A.ap(f,p)
if(f.b!==B.f)A.l(A.k(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=a.gct().gex().C(0,4)
n=A.ac(t.S)
for(e=a.gct().gdD(),m=e.length,l=0;l<m;++l){k=e[l]
j=A.lz(k.ge2())
if(!n.i(0,j))continue
i=A.o1(a.gct(),j,k)
h=k.geH().C(0,4)
if(f.b!==B.f)A.l(A.k(g))
r.vertexAttribPointer.apply(r,[j,i,A.a(q.WebGL2RenderingContext.FLOAT),!1,o,h])
if(f.b!==B.f)A.l(A.k(g))
r.enableVertexAttribArray(j)}A.kv(a.gdW())
return new A.eO(d,void 1,p,0,a.gf7(),!0)},
e8(a){if(this.c.m(0,a.gY())==null)throw A.c(A.bW(B.N,a))
this.b.ab(a)},
bp(){var s,r,q,p,o,n
for(s=this.b.ap(),r=s.$ti,s=new A.b5(s.a(),r.h("b5<1>")),q=this.c,r=r.c;s.k();){p=s.b
if(p==null)p=r.a(p)
o=p.a
n=p.b
q.p(0,o.a,this.dz(n))}},
gaq(){return this.b.ap().an(0,0,new A.hk(),t.S)}}
A.hj.prototype={
$3(a,b,c){return new A.ak(A.a(a),A.a(b),A.bM(c))},
$S:25}
A.hk.prototype={
$2(a,b){var s,r
A.a(a)
s=t.ai.a(b).b
r=s.gcK()
r=B.i.a4(a,r.gcu(r))
s=A.kv(s.gdW())
return r+s},
$S:26}
A.eK.prototype={
Z(a){var s=this.a,r=A.kR(s,B.aQ)
A.kS(s,r,0,a)
return r},
ak(a,b){this.b.ab(a)},
ea(a){var s=this.d
s===$&&A.aQ()
return this.ak(a,s)},
ei(a){var s=this.e
s===$&&A.aQ()
return this.ak(a,s)},
ek(a){var s=this.f
s===$&&A.aQ()
return this.ak(a,s)},
ec(a){var s=this.r
s===$&&A.aQ()
return this.ak(a,s)},
eg(a){var s=this.w
s===$&&A.aQ()
return this.ak(a,s)},
U(){var s,r,q,p,o,n,m=this
for(s=m.c,r=new A.aX(s,s.r,s.e,A.t(s).h("aX<2>")),q=m.a,p=q.a,o=t.R;r.k();){n=r.d
if(n.b===q.Q)p.deleteTexture(o.a(n.a).a)}s.W(0)
s=m.d
s===$&&A.aQ()
if(s.b===q.Q)A.eV(q,s)
s=m.e
s===$&&A.aQ()
if(s.b===q.Q)A.eV(q,s)
s=m.f
s===$&&A.aQ()
if(s.b===q.Q)A.eV(q,s)
s=m.r
s===$&&A.aQ()
if(s.b===q.Q)A.eV(q,s)
s=m.w
s===$&&A.aQ()
if(s.b===q.Q)A.eV(q,s)},
bp(){var s,r,q,p,o,n,m,l,k,j=this
j.d=j.Z($.kc())
j.e=j.Z($.k8())
j.f=j.Z($.k9())
j.r=j.Z($.ka())
j.w=j.Z($.kb())
for(s=j.b.ap(),r=s.$ti,s=new A.b5(s.a(),r.h("b5<1>")),q=j.c,p=j.a,r=r.c;s.k();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
if(m.gcs().ci(0,new A.hM()))continue
l=A.kR(p,m.gA())
for(k=0;B.i.aB(k,m.gcs().length);++k){o=m.gcs()
if(!(k<o.length))return A.h(o,k)
A.kS(p,l,k,o[k])}if(m.geR())A.na(p,l)
q.p(0,n.a,l)}},
gaq(){return this.b.ap().an(0,0,new A.hL(),t.S)}}
A.hK.prototype={
$3(a,b,c){return new A.an(A.a(a),A.a(b),A.bM(c))},
$S:28}
A.hM.prototype={
$1(a){return!1},
$S:29}
A.hL.prototype={
$2(a,b){var s
A.a(a)
s=t.dU.a(b).b.gA()
return B.i.a4(a,s.gf9().C(0,s.geI()).C(0,s.geL()).C(0,4))},
$S:30}
A.jm.prototype={
$2(a,b){var s,r=t.eS
r.a(a)
s=J.ju(r.a(b).a,a.a)
return s},
$S:31}
A.bd.prototype={
gdY(){return this.b.length}}
A.e4.prototype={
dJ(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h
t.U.a(a)
s=new A.hy(A.e([],t.cU),A.ac(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p)r[p].L(s,b)
o=s.dI(a,!1)
if(o.b.length!==0)return new A.e5(o,B.by)
q=o.a
n=A.H(q)
m=new A.aY(q,n.h("m(1)").a(new A.fN()),n.h("aY<1,m>")).ag(0)
l=A.e([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p){k=r[p]
for(n=k.K(d),j=n.length,i=0;i<n.length;n.length===j||(0,A.A)(n),++i){h=n[i]
if(!m.q(0,h.gA().a))throw A.c(A.k('RenderFeature "'+k.gD()+'" created a pass "'+h.gA().a+'" that it never declared into the graph'))
B.a.i(l,h)}}B.a.a5(l,new A.fO(o))
return new A.e5(o,l)}}
A.fN.prototype={
$1(a){return t.z.a(a).a},
$S:32}
A.fO.prototype={
$2(a,b){var s=t.fA
s.a(a)
s.a(b)
s=this.a.a
return B.i.N(B.a.bi(s,new A.fL(a)),B.a.bi(s,new A.fM(b)))},
$S:33}
A.fL.prototype={
$1(a){return t.z.a(a).a===this.a.gA().a},
$S:2}
A.fM.prototype={
$1(a){return t.z.a(a).a===this.a.gA().a},
$S:2}
A.e5.prototype={}
A.bU.prototype={
v(){return"FrameQueueState."+this.b}}
A.fU.prototype={}
A.fR.prototype={
dF(a){if(a.length===0)throw A.c(A.aS(a,"passId",null))
this.b=a
this.a.aN(a,A.lD())},
cO(){var s,r,q,p,o=t.A
o=A.ag(o,o)
for(s=this.a,s=new A.aW(s,A.t(s).h("aW<1,2>")).gu(0);s.k();){r=s.d
q=r.a
p=r.b
o.p(0,q,new A.O(p.a,p.b,p.d))}return A.kk(o,t.N,t.b)},
aa(a,b){var s,r=this.b
if(r==null)throw A.c(A.k("draw recorded outside an active render pass"))
if(b<1)throw A.c(A.o("draw count and instance count must be positive",null))
s=this.a.m(0,r);++s.a
s.d+=b
s.b=s.b+(a/3|0)*b}}
A.c9.prototype={}
A.D.prototype={
gae(){var s=this.c,r=A.H(s)
return new A.a2(s,r.h("z(1)").a(new A.hq()),r.h("a2<1>"))},
gaA(){var s=this.c,r=A.H(s)
return new A.a2(s,r.h("z(1)").a(new A.hr()),r.h("a2<1>"))},
j(a){return"PassDeclaration("+this.a+" @ "+this.b.j(0)+")"}}
A.hq.prototype={
$1(a){var s=t.J.a(a).b
return s===B.d||s===B.r},
$S:7}
A.hr.prototype={
$1(a){return t.J.a(a).b===B.e},
$S:7}
A.aA.prototype={
v(){return"GraphValidationFailureKind."+this.b}}
A.a5.prototype={
j(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.ex.prototype={
v(){return"ResourceFormat."+this.b}}
A.aU.prototype={
v(){return"GraphStage."+this.b}}
A.M.prototype={
cw(){var s=this
return new A.M(s.a,s.b,s.c,s.d,s.e,s.f+1)},
T(a,b){var s=this
if(b==null)return!1
return b instanceof A.M&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gB(a){var s=this
return A.cT(s.a,s.b,s.c,s.d,s.e,s.f)},
j(a){var s=this,r=s.b.j(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.d_.prototype={
v(){return"ResourceAccess."+this.b}}
A.j.prototype={}
A.cq.prototype={}
A.hu.prototype={
M(a){var s,r,q,p,o,n,m=this
a.F()
s=null
try{r=a.d.ga0()
r=A.au(r,A.t(r).h("i.E"))
q=t.dy
s=A.nb(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.b8(p) instanceof A.d3){++m.e
throw p}else throw p}o=new A.cq(s)
r=m.b
q=a.a
n=r.m(0,q)
r.p(0,q,o);++m.d
if(n!=null)m.a.cc(n.b)
return o},
dd(a){var s,r
t.cr.a(a)
for(s=a.a,s=new A.aX(s,s.r,s.e,a.$ti.h("aX<1>")),r=this.a;s.k();)r.cc(s.d.b)}}
A.a1.prototype={
F(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.c(A.o("ProgramSource.id must not be empty",m))
s=t.S
r=A.ac(s)
for(q=this.d.ga2(),q=q.gu(q);q.k();){p=q.gl()
o=p.b
if(o<0)throw A.c(A.o('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.i(0,o))throw A.c(A.o('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.ac(s)
for(s=this.e.ga2(),s=s.gu(s);s.k();){q=s.gl()
p=q.b
if(p<0)throw A.c(A.o('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.i(0,p))throw A.c(A.o('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.hw.prototype={}
A.V.prototype={
R(){var s=this
return A.km(B.aO,s.f,B.a7,B.G,!0,!0,!0,!0,s.r,B.ae,B.af,s.d,s.e,!0,!1,!1)}}
A.hy.prototype={
dI(a,b){var s=this.dA(t.U.a(a),!1),r=this.a,q=A.H(r)
return new A.hx(A.hc(new A.a2(r,q.h("z(1)").a(new A.hD()),q.h("a2<1>")),t.z),s)},
dA(a,b){var s,r,q,p,o,n,m=this
t.U.a(a)
s=A.e([],t.b7)
r=m.a
q=A.H(r)
p=q.h("a2<1>")
o=A.au(new A.a2(r,q.h("z(1)").a(new A.hC()),p),p.h("i.E"))
m.cX(o,a,s)
m.d0(o,s)
m.d2(o,s)
m.d_(o,!1,s)
n=m.d4(o,s)
m.d1(o,n,s)
m.d3(o,s)
m.cZ(o,n,s)
m.cY(o,s)
return s},
cX(a,b,c){var s,r,q,p
t.O.a(a)
t.U.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
p=B.W.cd(b)
if(p.a!==0)B.a.i(c,new A.a5(B.bl,q.a,"missing capabilities: "+p.ac(0,", ")))}},
d0(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gae(),o=J.a_(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gl().a
if(m.e>1)B.a.i(b,new A.a5(B.bg,n,"reads multisampled resource "+m.j(0)+" directly; resolve before sampling"))}}},
d2(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.H(a),r=s.h("z(1)").a(new A.hB()),q=B.a.gu(a),s=new A.G(q,r,s.h("G<1>"));s.k();){r=q.gl()
p=r.gae()
o=A.au(p,p.$ti.h("i.E"))
p=r.gaA()
n=A.au(p,p.$ti.h("i.E"))
if(o.length!==1||n.length!==1){B.a.i(b,new A.a5(B.M,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.a.gbx(o).a
l=B.a.gbx(n).a
if(m.e<=1||l.e>1)B.a.i(b,new A.a5(B.M,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.a.i(b,new A.a5(B.M,r.a,"resolve source and destination must match format and extent"))}},
d_(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.A)(p),++m){l=p[m]
if(l.b===B.r)B.a.i(c,new A.a5(B.bj,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
d4(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.ag(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.A)(a),++q){p=a[q]
for(o=p.gaA(),n=J.a_(o.a),o=new A.G(n,o.b,o.$ti.h("G<1>")),m=p.a;o.k();){l=n.gl().a
k=l.a+"#"+l.f
j=s.m(0,k)
if(j!=null){B.a.i(b,new A.a5(B.bf,m,l.j(0)+" already written by "+j.a))
continue}s.p(0,k,p)}}return s},
d1(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gae(),p=J.a_(q.a),q=new A.G(p,q.b,q.$ti.h("G<1>")),o=r.a;q.k();){n=p.gl()
if(n.b===B.r)continue
n=n.a
m=b.m(0,n.a+"#"+n.f)
if(m==null){B.a.i(c,new A.a5(B.al,o,"reads "+n.j(0)+" but no pass writes that version"))
continue}if(B.a.aJ(a,m)>s)B.a.i(c,new A.a5(B.al,o,"reads "+n.j(0)+" before writer "+m.a+" runs"))}}},
d3(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gae(),o=J.a_(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gl()
if(m.b===B.r)continue
for(l=q.gaA(),k=J.a_(l.a),l=new A.G(k,l.b,l.$ti.h("G<1>")),m=m.a,j=m.a,i=m.f;l.k();){h=k.gl().a
if(j===h.a&&i===h.f)B.a.i(b,new A.a5(B.bi,n,"reads and writes "+m.j(0)+" at the same version; declare a ping-pong version bump"))}}}},
cZ(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gae(),o=J.a_(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gl()
if(m.b===B.r)continue
l=m.a
k=b.m(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gaA().dU(0,new A.hA(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.a.i(c,new A.a5(B.bh,n,"reads "+l.j(0)+" but writer "+k.a+" produced "+j.j(0)))}}},
cY(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.ag(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gaA(),o=J.a_(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>"));p.k();){n=o.gl().a
r.p(0,n.a+"#"+n.f,q)}m=J.jz(p,t.cJ)
for(l=0;l<p;++l)m[l]=A.ac(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gae(),p=J.a_(s.a),s=new A.G(p,s.b,s.$ti.h("G<1>"));s.k();){o=p.gl()
if(o.b===B.r)continue
o=o.a
k=r.m(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.h(m,k)
m[k].i(0,q)}}p=t.y
j=A.cJ(s,!1,!1,p)
s=a.length
i=A.cJ(s,!1,!1,p)
h=new A.hz(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.h(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.h(a,q)
B.a.i(b,new A.a5(B.bk,a[q].a,"participates in a resource dependency cycle"))}}}}
A.hD.prototype={
$1(a){t.z.a(a)
return A.jH()},
$S:2}
A.hC.prototype={
$1(a){t.z.a(a)
return A.jH()},
$S:2}
A.hB.prototype={
$1(a){return t.z.a(a).f},
$S:2}
A.hA.prototype={
$1(a){var s=t.J.a(a).a,r=this.a.a
return s.a===r.a&&s.f===r.f},
$S:7}
A.hz.prototype={
$1(a){var s,r,q,p,o=this,n=o.a
if(!(a>=0&&a<n.length))return A.h(n,a)
if(n[a])return!0
s=o.b
if(!(a<s.length))return A.h(s,a)
if(s[a])return!1
B.a.p(n,a,!0)
r=o.c
if(!(a<r.length))return A.h(r,a)
r=r[a]
r=A.ij(r,r.r,A.t(r).c)
q=r.$ti.c
while(r.k()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.a.p(n,a,!1)
B.a.p(s,a,!0)
return!1},
$S:36}
A.hx.prototype={}
A.cX.prototype={$imL:1}
A.hE.prototype={
$3(a,b,c){return new A.be(A.a(a),A.a(b),A.bM(c))},
$S:37}
A.hF.prototype={
U(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this
if(c.x)return
s=c.w
r=A.au(s,A.t(s).c)
q=r.length
p=c.c
o=p.c
n=p.a
m=n.a
l=t.R
k=0
for(;k<r.length;r.length===q||(0,A.A)(r),++k){j=r[k]
i=o.av(0,j.a)
if(i!=null)if(i.b===n.Q)m.deleteTexture(l.a(i.a).a)
p.b.bq(j)}r=c.r
q=A.au(r,A.t(r).c)
o=q.length
n=c.b.a
k=0
for(;k<q.length;q.length===o||(0,A.A)(q),++k)n.bq(q[k])
q=c.f
o=A.au(q,A.t(q).c)
n=o.length
m=c.a
l=m.c
h=m.a
g=h.a
k=0
for(;k<o.length;o.length===n||(0,A.A)(o),++k){j=o[k]
f=l.av(0,j.a)
if(f!=null){e=f.c
if(e.b===h.Q)g.deleteVertexArray(A.Y(e.a))
e=f.a
if(e.b===h.Q)g.deleteBuffer(A.Y(e.a))
d=f.b
if(d!=null)if(d.b===h.Q)g.deleteBuffer(A.Y(d.a))}m.b.bq(j)}s.W(0)
r.W(0)
q.W(0)
p.U()
c.x=!0}}
A.i4.prototype={}
A.dp.prototype={}
A.iQ.prototype={
$1(a){var s=this.a.w.a.e8(a),r=s.b!=null,q=r?s.d:s.e
return new A.cZ(s.c,r,q,s.f)},
$S:38}
A.iR.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.q(0,a))return this.b.x.gl().cA(a)
if(b!=null&&s.q(0,b))return this.b.x.gl().cA(b)
throw A.c(A.k("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:39}
A.iP.prototype={
$0(){return this.a.$1("shadowMap")},
$S:1}
A.iI.prototype={
$0(){return null},
$S:41}
A.iJ.prototype={
$0(){var s=this.a.at
if(s==null)return B.O
return A.p6(B.O,3,s.a.d,null)},
$S:42}
A.iO.prototype={
$0(){return this.a.$1("sceneDepth")},
$S:1}
A.iD.prototype={
$0(){return this.a.at.a},
$S:43}
A.iF.prototype={
$0(){return this.a.$2$fallback("ssaoRaw","sceneColor")},
$S:1}
A.iE.prototype={
$0(){return this.a.$2$fallback("ssaoBlurred","sceneColor")},
$S:1}
A.iN.prototype={
$0(){var s=this.b.d>1?"sceneColor#1":"sceneColor"
return this.a.$1(s)},
$S:1}
A.iB.prototype={
$0(){return this.a.$2$fallback("bloomBlurH","sceneColor")},
$S:1}
A.iC.prototype={
$0(){return this.a.$2$fallback("bloomBlurV","sceneColor")},
$S:1}
A.iK.prototype={
$0(){return this.a.$2$fallback("dofBlurH","sceneColor")},
$S:1}
A.iL.prototype={
$0(){return this.a.$2$fallback("dofBlurV","sceneColor")},
$S:1}
A.iM.prototype={
$0(){var s=this.a.w.c.d
s===$&&A.aQ()
return s},
$S:1}
A.iH.prototype={
$0(){return this.a.$2$fallback("vhsOutput","sceneColor")},
$S:1}
A.iG.prototype={
$0(){return this.a.at.w},
$S:44}
A.iS.prototype={
$0(){return this.a},
$S:68}
A.iT.prototype={
$0(){return null},
$S:46}
A.im.prototype={}
A.fe.prototype={$imK:1}
A.f8.prototype={$img:1}
A.ez.prototype={
dX(a,b){var s,r,q,p,o,n,m,l,k=this
if(k.e!==B.U)throw A.c(A.k("renderer can only be initialized once"))
a.F()
b.F()
s=k.a
if(s.b===B.v)throw A.c(A.k("renderer device is context lost"))
k.e=B.cf
try{r=v.G
s.aj(A.a(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.aj(A.a(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.aj(A.a(r.WebGL2RenderingContext.MAX_SAMPLES))
s.aj(A.a(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.aj(A.a(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
if(s.a7("EXT_texture_filter_anisotropic"))s.bS(34047)
q=s.a7("EXT_disjoint_timer_query_webgl2")
s.w=q
s.a7("EXT_color_buffer_float")
s.a7("EXT_color_buffer_half_float")
s.a7("WEBGL_lose_context")
p=s.a7("WEBGL_debug_renderer_info")
o=s.a
if(p)A.br(o.getParameter(37446))
else A.br(o.getParameter(A.a(r.WebGL2RenderingContext.RENDERER)))
if(p)A.br(o.getParameter(37445))
else A.br(o.getParameter(A.a(r.WebGL2RenderingContext.VENDOR)))
k.r=new A.hv(q)
r=k.b
if(r.d)A.l(A.k("configuration coordinator is disposed"))
n=A.ho(a)
q=r.a
if(q.e)A.l(A.k("configuration state is disposed"))
if(q.a!=null)A.l(A.k("configuration state is already initialized"))
a.F()
q.a=a
A.ho(a)
q.d=1
r.b.cn(n)
r=A.mu()
k.w=new A.hF(A.mv(s),r,A.mS(s),A.ac(t.cA),A.ac(t.eL),A.ac(t.aj))
r=new A.d0()
q=new A.h0(s,r)
n=A.ho(a)
m=q.bK(n,a)
r.cn(n)
q.c=new A.er(new A.ht(n),m)
k.x=q
k.y=new A.hu(s,A.ag(t.N,t.dN))
k.as=a
A.lm(k)
k.e=B.E
k.ay=k.gb2()}catch(l){s=k.y
if(s!=null){r=s.b
s.dd(new A.aB(r,A.t(r).h("aB<2>")))
r.W(0)}s=k.x
if(s!=null)s.U()
s=k.w
if(s!=null)s.U()
k.w=null
k.b.U()
k.b=new A.dW(new A.dX(),new A.d0())
k.e=B.U
throw l}s=new A.P($.K,t.cd)
s.aV(null)
return s},
ca(a,b){var s,r,q,p,o=this
o.dm()
o.aF()
r=B.a.q(o.d,a)
if(!r)throw A.c(A.o("world was not created by this renderer",null))
if(o.at!=null)throw A.c(A.k("renderer.beginFrame called twice without end/abort"))
b.a.F()
b.b.F()
b.c.F()
r=b.w
if(!isFinite(r))A.l(A.o("FrameInput.timeSeconds must be finite: "+A.p(r),null))
o.at=b
o.ax=a
q=o.c
if(q.b===B.B)A.l(A.k("FrameQueue.beginFrame called twice without end/abort"))
q.b=B.B
q.c=0
B.a.W(q.a)
s=q
try{r=o.r
if((r==null?A.l(A.k("renderer is not initialized")):r).z)o.b$=o.a.dE()
return s}catch(p){if(q.b!==B.B)A.l(A.k("FrameQueue.abortFrame called without an active frame"))
q.c=0
q.b=B.b3
o.bz()
o.ax=o.at=null
throw p}},
cg(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
d.aF()
s=d.at
r=d.ax
if(s==null||r==null)throw A.c(A.k("renderer.endFrame called without an active frame"))
l=d.c
if(l.b!==B.B)A.l(A.k("FrameQueue.endFrame called without an active frame"))
k=l.a
j=A.eH(k,0,A.bp(l.c,"count",t.S),A.H(k).c).cH(0,!1)
l.b=B.b2
q=j
try{p=A.o4(d,r,s,q)
o=p.a.cO()
l=o.ga2()
k=A.t(l)
n=new A.aC(new A.a2(l,k.h("z(i.E)").a(new A.hG()),k.h("a2<i.E>")),k.h("O(i.E)").a(new A.hH()),k.h("aC<i.E,O>")).an(0,B.b0,new A.hI(),t.b)
m=0
k=s.e
l=m
if(typeof l!=="number")return l.cL()
if(l>4){l=m
if(typeof l!=="number")return l.by()}l=n.a
i=n.b
h=p.c
n.toString
p.toString
g=d.w
f=g.a.gaq()
g=g.c.gaq()
e=d.w
e.a.gaq()
e.c.gaq()
d.w.toString
return new A.fW(k,l,i,h,f+g)}finally{d.di(s.e)
d.ax=d.at=null}},
gb2(){A:{var s=this.a.Q
break A}return s},
dm(){var s,r=this,q=r.ay,p=r.gb2(),o=r.e
if(o===B.E&&q!=null&&p!=null&&p!==q&&r.a.b!==B.v){r.bM()
o=r.e=B.x}if(o!==B.x)return
if(r.a.b===B.v)throw A.c(A.k("renderer context remains lost"))
o=r.w
if(o.x)A.l(A.k("resource library is disposed"))
o.a.bp()
o.c.bp()
o=r.x
o.toString
s=r.as
s.toString
if(o.e)A.l(A.k("GPU resource adapter is disposed"))
p=o.c
if(p==null)A.l(A.k("GPU resource adapter is not initialized"))
o.c=new A.er(p.a,o.bK(A.ho(s),s))
o=r.y
o.c=null
o.b.W(0)
A.lm(r)
r.e=B.E
r.ay=r.gb2()},
aF(){var s=this,r=s.e
if(r!==B.E)throw A.c(A.k("renderer is not ready: "+r.b))
if(s.a.b===B.v){s.bM()
s.e=B.x
throw A.c(A.k("renderer context lost"))}},
$imO:1}
A.hG.prototype={
$1(a){return B.c.q(t.ao.a(a).a.toLowerCase(),"world")},
$S:47}
A.hH.prototype={
$1(a){return t.ao.a(a).b},
$S:48}
A.hI.prototype={
$2(a,b){var s=t.b
s.a(a)
s.a(b)
return new A.O(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:49}
A.fd.prototype={}
A.ig.prototype={
di(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.f)A.l(A.k(u.k))
r=s.c5(o)
if(r.b)A.l(A.k("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.a.i(p.a$,new A.fd(o))}catch(q){p.b1(o)}},
bz(){var s=this.b$
this.b$=null
if(s!=null)this.b1(s)},
bM(){var s,r,q
this.bz()
s=this.a$
r=J.jA(s.slice(0),A.H(s).c)
B.a.W(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.A)(r),++q)this.b1(r[q].b)},
b1(a){var s
try{this.a.dP(a)}catch(s){}}}
A.fi.prototype={}
A.eB.prototype={
v(){return"ShadowCasterLod."+this.b}}
A.ah.prototype={
N(a,b){var s
t.fy.a(b)
s=B.i.N(this.a.a,b.a.a)
if(s!==0)return s
s=this.b.gY().N(0,b.b.gY())
return s},
$iaf:1}
A.W.prototype={}
A.jq.prototype={
$2(a,b){var s=t.k
return s.a(a).a.N(0,s.a(b).a)},
$S:50}
A.jr.prototype={
$1(a){return t.k.a(a).b},
$S:51}
A.jo.prototype={
$2(a,b){var s=t.d
return s.a(a).a.N(0,s.a(b).a)},
$S:52}
A.jp.prototype={
$1(a){return t.d.a(a).b},
$S:53}
A.fH.prototype={}
A.fG.prototype={}
A.bA.prototype={}
A.cx.prototype={
v(){return"FrustumTest."+this.b}}
A.fX.prototype={
eo(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
for(s=this.a,r=!1,q=0;q<6;++q){p=s[q]
o=p.a
n=o.a
m=n>=0
l=m?a.gar().gaO():a.gau().gaO()
k=o.b
j=k>=0
i=j?a.gar().gaP():a.gau().gaP()
o=o.c
h=o>=0
g=h?a.gar().gaQ():a.gau().gaQ()
f=p.b
if(n*l+k*i+o*g+f<0)return B.ag
m=m?a.gau().gaO():a.gar().gaO()
l=j?a.gau().gaP():a.gar().gaP()
j=h?a.gau().gaQ():a.gar().gaQ()
if(n*m+k*l+o*j+f<0)r=!0}return r?B.b4:B.b5}}
A.fY.prototype={
$4(a,b,c,d){var s=new A.av(a,b,c),r=new A.bA(s,d),q=Math.sqrt(s.ga8())
if(q<1e-9)s=r
else{s=1/q
s=new A.bA(new A.av(a*s,b*s,c*s),d/q)}return s},
$S:54}
A.c_.prototype={
C(a,b){var s,r,q,p,o,n,m,l,k,j=new Float32Array(16)
for(s=this.a,r=b.a,q=0;q<4;++q)for(p=q*4,o=0;o<4;++o){for(n=0,m=0;m<4;++m){l=m*4+o
if(!(l<16))return A.h(s,l)
l=s[l]
k=p+m
if(!(k<16))return A.h(r,k)
n+=l*r[k]}l=p+o
if(!(l<16))return A.h(j,l)
j[l]=n}return new A.c_(j)},
co(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=J.jz(4,t.gN)
for(s=t.n,r=this.a,q=0;q<4;++q){p=r[q]
o=r[4+q]
n=r[8+q]
m=r[12+q]
l=q===0?1:0
k=q===1?1:0
j=q===2?1:0
a0[q]=new Float64Array(A.r(A.e([p,o,n,m,l,k,j,q===3?1:0],s)))}for(i=0;i<4;i=q){s=a0[i]
if(!(i<s.length))return A.h(s,i)
h=Math.abs(s[i])
for(q=i+1,g=q,f=i;g<4;++g){r=a0[g]
if(!(i<r.length))return A.h(r,i)
e=Math.abs(r[i])
if(e>h){h=e
f=g}}if(!isFinite(h)||h<1e-12)throw A.c(A.k("Mat4.inverse: singular matrix"))
if(f!==i){if(!(f>=0&&f<4))return A.h(a0,f)
a0[i]=a0[f]
a0[f]=s}s=a0[i]
if(!(i<s.length))return A.h(s,i)
d=s[i]
for(c=0;c<8;++c){if(!(c<s.length))return A.h(s,c)
r=s[c]
s.$flags&2&&A.aG(s)
s[c]=r/d}for(g=0;g<4;++g){if(g===i)continue
s=a0[g]
if(!(i<s.length))return A.h(s,i)
b=s[i]
if(b===0)continue
for(c=0;c<8;++c){if(!(c<s.length))return A.h(s,c)
r=s[c]
p=a0[i]
if(!(c<p.length))return A.h(p,c)
p=p[c]
s.$flags&2&&A.aG(s)
s[c]=r-b*p}}}a=new Float32Array(16)
for(q=0;q<4;++q)for(i=0;i<4;++i){s=i*4+q
r=a0[q]
p=4+i
if(!(p<r.length))return A.h(r,p)
p=r[p]
if(!(s<16))return A.h(a,s)
a[s]=p}return new A.c_(a)},
gP(a){return B.Q.ci(this.a,new A.hf())},
j(a){return"Mat4("+A.p(this.a)+")"}}
A.hf.prototype={
$1(a){return isFinite(A.iy(a))},
$S:55}
A.av.prototype={
bd(a){return this.a*a.a+this.b*a.b+this.c*a.c},
bc(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.av(s*r-q*p,q*o-n*r,n*p-s*o)},
ga8(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gn(a){return Math.sqrt(this.ga8())},
gP(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gbm(){var s=this,r=Math.sqrt(s.ga8())
return r<1e-9?B.F:new A.av(s.a/r,s.b/r,s.c/r)},
T(a,b){if(b==null)return!1
return b instanceof A.av&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gB(a){return A.cT(this.a,this.b,this.c,B.j,B.j,B.j)},
j(a){return"Vec3("+A.p(this.a)+", "+A.p(this.b)+", "+A.p(this.c)+")"}}
A.eZ.prototype={
v(){return"_BloomBlurAxis."+this.b}}
A.cm.prototype={
gD(){return this.f},
L(a,b){B.a.i(a.a,new A.D(this.f,B.q,A.e([new A.j(this.x,B.d),new A.j(this.y,B.e)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a1(s.e,s.b,s.c,B.m,B.au,B.ar)),q=A.aw(s.d),p=t.n,o=s.r===B.aM?new Float32Array(A.r(A.e([1/s.Q,0],p))):new Float32Array(A.r(A.e([0,1/s.as],p)))
p=s.y
return A.e([new A.f_(new A.V(s.f,A.e([new A.j(s.x,B.d),new A.j(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iB:1}
A.f_.prototype={
I(a){return},
$ix:1,
gA(){return this.a}}
A.dP.prototype={
gD(){return"bloomComposite"},
L(a,b){B.a.i(a.a,new A.D("bloomComposite",B.q,A.e([new A.j(this.f,B.d),new A.j(this.r,B.d),new A.j(this.w,B.e)],t.C),!1))},
K(a){var s=this,r="bloomComposite",q=s.a.M(new A.a1(r,s.b,s.c,B.m,B.bM,B.bC)),p=A.aw(s.d),o=s.w,n=A.e([new A.j(s.f,B.d),new A.j(s.r,B.d),new A.j(o,B.e)],t.C)
return A.e([new A.f0(new A.V(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iB:1}
A.f0.prototype={
I(a){return},
$ix:1,
gA(){return this.a}}
A.e_.prototype={
gD(){return"depthPrepass"},
L(a,b){B.a.i(a.a,new A.D("depthPrepass",B.bc,A.e([new A.j(this.w,B.e)],t.C),!1))},
K(a){var s=this,r="depthPrepass",q=s.a.M(new A.a1(r,s.b,s.c,B.at,B.as,B.bw))
return A.e([new A.f3(new A.V(r,A.e([new A.j(s.w,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iB:1}
A.f3.prototype={
I(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this,e=u.k,d=a.b,c=a.d,b=d.a
A.ao(b,a.S("sceneDepth").b)
A.a7(b,f.a.R())
A.bF(b,B.I,1,0,0,0)
A.aN(b,f.b.b)
A.b(b,"uVertexSnapGrid",new A.d(B.b,0))
A.b(b,"uAlbedo",B.o)
for(s=c.a,r=s.length,c=c.c.c.a,q=f.c,p=v.G,o=d.b,n=b.a,m=0;m<s.length;s.length===r||(0,A.A)(s),++m){l=s[m]
k=l.a.b
j=k.ga3()
A.b(b,"uViewProjection",new A.d(B.k,new Float32Array(A.r(c))))
A.b(b,"uModel",new A.d(B.k,new Float32Array(A.r(j.aw().ga9()))))
A.jn(d,l,!1)
f.de(d,k.gad(),0)
i=q.$1(k.gX())
k=i.a
if(b.b!==B.f)A.l(A.k(e))
n.bindVertexArray(A.Y(k.a))
k=i.b
j=i.c
h=l.b.length
if(k){k=i.d
if(b.b!==B.f)A.l(A.k(e))
g=A.a(p.WebGL2RenderingContext.TRIANGLES)
n.drawElementsInstanced.apply(n,[g,j,k?A.a(p.WebGL2RenderingContext.UNSIGNED_INT):A.a(p.WebGL2RenderingContext.UNSIGNED_SHORT),0,h])
o.aa(j,h)}else{if(b.b!==B.f)A.l(A.k(e))
n.drawArraysInstanced(A.a(p.WebGL2RenderingContext.TRIANGLES),0,j,h)
o.aa(j,h)}}},
de(a,b,c){var s,r=this.d.$1(b),q=a.a
A.S(q,0,t.j.a(this.e.$1(r.gc8())))
r.gc9()
A.b(q,"uAlphaCutoff",new A.d(B.b,0))
A.b(q,"uAffineWarpStrength",new A.d(B.b,r.gdB()?c:0))
s=this.a.R()
A.a7(q,r.gce()?s.bs(!1):s)},
$ix:1,
gA(){return this.a}}
A.f4.prototype={
v(){return"_DofBlurAxis."+this.b}}
A.cu.prototype={
gD(){return this.f},
L(a,b){B.a.i(a.a,new A.D(this.f,B.q,A.e([new A.j(this.w,B.d),new A.j(this.x,B.e)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a1(s.e,s.b,s.c,B.m,B.au,B.ar)),q=A.aw(s.d),p=t.n,o=s.r===B.aN?new Float32Array(A.r(A.e([1/s.z,0],p))):new Float32Array(A.r(A.e([0,1/s.Q],p)))
p=s.x
return A.e([new A.f5(new A.V(s.f,A.e([new A.j(s.w,B.d),new A.j(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iB:1}
A.f5.prototype={
I(a){return},
$ix:1,
gA(){return this.a}}
A.e1.prototype={
gD(){return"dofComposite"},
L(a,b){var s=this
B.a.i(a.a,new A.D("dofComposite",B.q,A.e([new A.j(s.z,B.d),new A.j(s.Q,B.d),new A.j(s.as,B.d),new A.j(s.at,B.e)],t.C),!1))},
K(a){var s=this,r="dofComposite",q=s.a.M(new A.a1(r,s.b,s.c,B.m,B.bK,B.bv)),p=A.aw(s.d)
return A.e([new A.f6(new A.V(r,A.e([new A.j(s.z,B.d),new A.j(s.Q,B.d),new A.j(s.as,B.d),new A.j(s.at,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iB:1}
A.f6.prototype={
I(a){var s,r=this,q=a.S("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.ao(n,q.b)
A.a7(n,r.a.R())
A.aN(n,r.b.b)
s=t.j
A.S(n,0,s.a(r.d.$0()))
A.b(n,"uSharp",B.o)
A.S(n,1,s.a(r.e.$0()))
A.b(n,"uBlurred",B.y)
A.S(n,2,s.a(r.f.$0()))
A.b(n,"uSceneDepth",B.aL)
A.b(n,"uNear",new A.d(B.b,o.f))
A.b(n,"uFar",new A.d(B.b,o.r))
A.b(n,"uFocusDistance",new A.d(B.b,r.w))
A.b(n,"uFocusRange",new A.d(B.b,r.x))
A.b(n,"uStrength",new A.d(B.b,0))
A.ap(n,r.c)
p.a_(3,0)},
$ix:1,
gA(){return this.a}}
A.e8.prototype={
gD(){return"grade"},
L(a,b){B.a.i(a.a,new A.D("grade",B.q,A.e([new A.j(this.r,B.d),new A.j(this.w,B.e)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a1("grade",s.b,s.c,B.m,B.bI,B.bD)),q=A.aw(s.d),p=s.r,o=s.w
return A.e([new A.fa(new A.V("grade",A.e([new A.j(p,B.d),new A.j(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iB:1}
A.fa.prototype={
I(a){var s=this,r=a.S(s.f.a),q=a.b,p=q.a
A.ao(p,a.S(s.r.a).b)
A.a7(p,s.a.R())
A.aN(p,s.b.b)
A.S(p,0,r.b)
A.b(p,"uScene",B.o)
A.S(p,1,t.j.a(s.d.$0()))
A.b(p,"uLut",B.y)
A.b(p,"uLutSize",new A.d(B.b,s.e))
A.b(p,"uStrength",new A.d(B.b,0))
A.ap(p,s.c)
q.a_(3,0)},
$ix:1,
gA(){return this.a}}
A.cL.prototype={
gD(){return"msaaResolve"},
L(a,b){B.a.i(a.a,new A.D("msaaResolve",B.bd,A.e([new A.j(this.b,B.d),new A.j(this.c,B.e)],t.C),!0))},
K(a){var s=this.b,r=this.c
return A.e([new A.fc(new A.V("msaaResolve",A.e([new A.j(s,B.d),new A.j(r,B.e)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iB:1}
A.fc.prototype={
I(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.az(this.c),j=a.az(this.d),i=this.b
if(i.b!==B.f)A.l(A.k(u.k))
s=t.V
r=s.a(k.b.a)
q=s.a(j.b.a)
s=r.y
if(s<=1)A.l(A.o("WebGl2Device.resolveTarget: source must be multisampled (samples > 1), got "+s,null))
s=q.y
if(s>1)A.l(A.o("WebGl2Device.resolveTarget: destination must be single-sample, got samples="+s,null))
s=r.w
p=q.w
if(s!==p||r.x!==q.x)A.l(A.o("WebGl2Device.resolveTarget: source ("+s+"x"+r.x+") and destination ("+p+"x"+q.x+") must match",null))
o=r.r!=null||r.f!=null
n=q.r!=null||q.f!=null
i=i.a
m=v.G
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.READ_FRAMEBUFFER),r.a)
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),q.a)
if(r.c!=null||r.b!=null){if(o){i.readBuffer(A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0))
i.drawBuffers(A.e([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.NONE)],t.n))}A.a8(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(o&&n){i.readBuffer(A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1))
i.drawBuffers(A.e([A.a(m.WebGL2RenderingContext.NONE),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
A.a8(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(r.d!=null||r.e!=null)A.a8(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.DEPTH_BUFFER_BIT),A.a(m.WebGL2RenderingContext.NEAREST)],t.H)
if(n)i.drawBuffers(A.e([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.READ_FRAMEBUFFER),null)
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),null)},
$ix:1,
gA(){return this.a}}
A.bS.prototype={}
A.dR.prototype={
S(a){var s=this.a.m(0,a)
if(s==null)throw A.c(A.k('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
az(a){var s=a.a,r=this.a.m(0,s+"#"+a.f)
if(r!=null)return r
return this.S(s)},
$imJ:1}
A.jI.prototype={}
A.cV.prototype={
gD(){return"present"},
L(a,b){B.a.i(a.a,new A.D("present",B.be,A.e([new A.j(this.f,B.d)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a1("present",s.b,s.c,B.m,B.bL,B.bz)),q=A.aw(s.d),p=s.f
return A.e([new A.ff(new A.V("present",A.e([new A.j(p,B.d)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iB:1}
A.ff.prototype={
I(a){var s,r,q,p,o,n,m=this,l=a.az(m.d),k=a.b,j=k.a
A.ao(j,null)
A.a7(j,m.a.R())
A.aN(j,m.b.b)
A.ap(j,m.c)
A.S(j,0,l.b)
s=a.c
if(s!=null)A.S(j,1,s)
r=a.d.c
A.b(j,"uExposure",new A.d(B.b,1))
A.b(j,"uVignette",new A.d(B.b,0))
A.b(j,"uGrain",new A.d(B.b,0))
A.b(j,"uOutputEncoding",new A.d(B.b,m.e===B.J?1:0))
A.b(j,"uToneMap",new A.d(B.b,A.my(B.cE)))
q=t.n
A.b(j,"uClearColor",new A.d(B.h,new Float32Array(A.r(A.e([0.03,0.03,0.04],q)))))
A.b(j,"uSkyHorizon",new A.d(B.h,new Float32Array(A.r(A.e([1,1,1],q)))))
A.b(j,"uSkyZenith",new A.d(B.h,new Float32Array(A.r(A.e([0.30160000000000003,0.30160000000000003,0.3088],q)))))
A.b(j,"uSkyGround",new A.d(B.h,new Float32Array(A.r(A.e([0.027,0.027,0.036000000000000004],q)))))
A.b(j,"uSkyEnabled",new A.d(B.b,0))
A.b(j,"uSkyHorizonGlow",new A.d(B.b,0))
A.b(j,"uSkyStarDensity",new A.d(B.b,0))
A.b(j,"uSkyTexture",B.y)
A.b(j,"uSkyTextureEnabled",new A.d(B.b,0))
A.b(j,"uSkyRotation",new A.d(B.b,0))
A.b(j,"uSkyExposure",new A.d(B.b,1))
A.b(j,"uSkyTextureSrgb",new A.d(B.b,0))
A.b(j,"uInverseProjection",new A.d(B.k,new Float32Array(A.r(r.gcp().a))))
p=r.y
if(p===$){o=r.a.co()
r.y!==$&&A.js()
r.y=o
p=o}A.b(j,"uInverseView",new A.d(B.k,new Float32Array(A.r(p.a))))
n=r.d
A.b(j,"uCameraPosition",new A.d(B.h,new Float32Array(A.r(A.e([n.a,n.b,n.c],q)))))
A.b(j,"uCloudCoverage",new A.d(B.b,0))
A.b(j,"uCloudDensity",new A.d(B.b,0))
A.b(j,"uCloudBaseHeight",new A.d(B.b,650))
A.b(j,"uCloudThickness",new A.d(B.b,350))
A.b(j,"uCloudScale",new A.d(B.b,0))
A.b(j,"uCloudWind",new A.d(B.a4,new Float32Array(A.r(A.e([0,0],q)))))
A.b(j,"uCloudPhase",new A.d(B.b,0))
A.b(j,"uCloudDetail",new A.d(B.b,0))
A.b(j,"uCloudSilverLining",new A.d(B.b,0))
A.b(j,"uCloudSampleCount",new A.d(B.b,B.i.b9(4,4,24)))
A.b(j,"uCloudLightDirection",new A.d(B.h,new Float32Array(A.r(A.e([0,1,0],q)))))
A.b(j,"uCloudLightColor",new A.d(B.h,new Float32Array(A.r(A.e([1,1,1],q)))))
A.b(j,"uCloudLightIntensity",new A.d(B.b,0))
k.a_(3,0)},
$ix:1,
gA(){return this.a}}
A.eu.prototype={
gD(){return"ps1Quantize"},
L(a,b){B.a.i(a.a,new A.D("ps1Quantize",B.q,A.e([new A.j(this.e,B.d),new A.j(this.f,B.e)],t.C),!1))},
K(a){var s=this,r="ps1Quantize",q=s.a.M(new A.a1(r,s.b,s.c,B.m,B.bN,B.bs)),p=A.aw(s.d),o=s.e,n=s.f
return A.e([new A.fg(new A.V(r,A.e([new A.j(o,B.d),new A.j(n,B.e)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iB:1}
A.fg.prototype={
I(a){var s=this,r=a.S(s.d.a),q=a.b,p=q.a
A.ao(p,a.S(s.e.a).b)
A.a7(p,s.a.R())
A.aN(p,s.b.b)
A.S(p,0,r.b)
A.b(p,"uScene",B.o)
A.b(p,"uQuantizationBits",new A.d(B.b,8))
A.b(p,"uDitherStrength",new A.d(B.b,0))
A.ap(p,s.c)
q.a_(3,0)},
$ix:1,
gA(){return this.a}}
A.bC.prototype={}
A.eC.prototype={
gD(){return"shadow"},
L(a,b){B.a.i(a.a,new A.D("shadowCaster",B.bb,A.e([new A.j(this.z,B.e)],t.C),!1))},
K(a){var s=this,r="shadowCaster",q=s.a.M(new A.a1(r,s.b,s.c,B.at,B.as,B.bB))
return A.e([new A.fj(new A.V(r,A.e([new A.j(s.z,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iB:1}
A.fj.prototype={
I(a){var s,r,q,p,o=this,n=a.S("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.ao(s,n.b)
A.a7(s,o.a.R())
A.bF(s,B.I,1,0,0,0)
return}r=A.kD(l)
o.x.$1(r)
s=m.a
A.ao(s,n.b)
A.a7(s,o.a.R())
A.bF(s,B.I,1,0,0,0)
A.aN(s,o.b.b)
A.b(s,"uAlbedo",B.o)
for(s=a.d.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.A)(s),++p)o.df(m,s[p],l,r)},
bZ(a,b){var s,r=this.d.$1(b),q=a.a
A.S(q,0,t.j.a(this.e.$1(r.gc8())))
r.gc9()
A.b(q,"uAlphaCutoff",new A.d(B.b,0))
s=this.a.R()
A.a7(q,r.gce()?s.bs(!1):s)},
df(a,b,c,d){var s,r,q,p,o,n=this
if(b instanceof A.dp){s=b.b
if(!s.gdK())return
r=a.a
A.b(r,"uUseInstances",B.a5)
n.bV(a,s.ga3(),d)
n.bZ(a,s.gad())
q=s.gX()
p=n.c.$1(q)
A.ap(r,p.a)
s=p.b
r=p.c
if(s)a.bf(r,p.d,0)
else a.a_(r,0)}else if(b instanceof A.bd){s=b.a.b
if(!s.gdK())return
if(n.dw(b,c)===B.cC)return
n.bV(a,s.ga3(),d)
A.jn(a,b,!1)
n.bZ(a,s.gad())
q=s.gX()
p=n.c.$1(q)
A.ap(a.a,p.a)
s=p.b
r=p.c
o=b.b.length
if(s)a.bg(r,p.d,o,0)
else a.be(r,0,o)}else throw A.c(A.o("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dK(b).j(0),null))},
dw(a,b){return B.cB},
bV(a,b,c){var s=a.a
A.b(s,"uModel",new A.d(B.k,new Float32Array(A.r(b.aw().ga9()))))
A.b(s,"uLightViewProjection",new A.d(B.k,new Float32Array(A.r(c.a.a))))},
$ix:1,
gA(){return this.a}}
A.iX.prototype={
$1(a){return this.a.a=a},
$S:56}
A.iY.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:57}
A.eD.prototype={
gD(){return"shadowedWorld"},
L(a,b){var s=this,r=A.e([new A.j(s.db,B.d)],t.C)
if(s.ay)r.push(new A.j(s.dx,B.d))
r.push(new A.j(s.dy,B.e))
B.a.i(a.a,new A.D("shadowedWorld",B.ak,r,!1))},
K(a){var s=this,r="shadowedWorld",q=s.a.M(new A.a1(r,s.b,s.c,B.bP,B.bJ,B.br)),p=A.e([new A.j(s.db,B.d)],t.C)
if(s.ay)p.push(new A.j(s.dx,B.d))
p.push(new A.j(s.dy,B.e))
return A.e([new A.fk(new A.V(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iB:1}
A.fk.prototype={
I(a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=null,a1=a8.S("sceneColor"),a2=a8.b,a3=a8.d,a4=a3.c,a5=a3.d,a6=a.z.$0(),a7=a2.a
A.ao(a7,a1.b)
A.a7(a7,a.a.R())
A.bF(a7,B.ad,1,0.04,0.03,0.03)
A.aN(a7,a.b.b)
A.b(a7,"uAlbedo",B.o)
A.b(a7,"uNormalMap",B.cT)
A.b(a7,"uOrmMap",B.cU)
A.b(a7,"uEmissiveMap",B.cV)
A.b(a7,"uLightmap",B.cW)
s=t.j
A.S(a7,1,s.a(a.y.$0()))
A.b(a7,"uShadowMap",B.y)
r=a4.d
q=t.n
A.b(a7,"uCameraPosition",new A.d(B.h,new Float32Array(A.r(A.e([r.a,r.b,r.c],q)))))
A.b(a7,"uShadowMapTexelSize",new A.d(B.a4,new Float32Array(A.r(A.e([1/a.ch,1/a.CW],q)))))
A.b(a7,"uShadowFilterRadius",new A.d(B.b,1))
A.b(a7,"uShadowBias",new A.d(B.b,0.003))
A.S(a7,2,s.a(a.at.$0()))
A.b(a7,"uSsao",B.aL)
A.b(a7,"uVertexSnapGrid",new A.d(B.b,0))
A.b(a7,"uSceneColorSize",new A.d(B.a4,new Float32Array(A.r(A.e([a.ax,a.ay],q)))))
A.b(a7,"uViewProjection",new A.d(B.k,new Float32Array(A.r(a4.c.a))))
A.b(a7,"uView",new A.d(B.k,new Float32Array(A.r(a4.a.a))))
A.b(a7,"uLightViewProjection",new A.d(B.k,new Float32Array(A.r(a6.a.a))))
A.b(a7,"uFogColor",new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a7,"uFogStart",new A.d(B.b,0))
A.b(a7,"uFogEnd",new A.d(B.b,1))
A.b(a7,"uFogHeightFalloff",new A.d(B.b,0))
A.b(a7,"uFogDensity",new A.d(B.b,0))
p=a.Q.$0()
s=A.e([],t.w)
o=a.as.$0()
o=J.a_(o==null?B.O:o)
n=p==null
while(o.k()){m=o.gl()
if(-1!==(n?a0:-1))s.push(m)}l=n?a0:B.p
if(l==null)l=B.p
k=n?a0:B.u
if(k==null)k=B.u
A.b(a7,"uLightPosition",new A.d(B.h,new Float32Array(A.r(A.e([l.a,l.b,l.c],q)))))
A.b(a7,"uLightDirection",new A.d(B.h,new Float32Array(A.r(A.e([k.a,k.b,k.c],q)))))
j=n?a0:B.D
if(j==null)j=B.C
A.b(a7,"uLightColor",new A.d(B.h,new Float32Array(A.r(A.e([j.a,j.b,j.c],q)))))
o=n?a0:1
A.b(a7,"uLightIntensity",new A.d(B.b,o==null?0:o))
A.b(a7,"uSpotEnabled",new A.d(B.b,!n?1:0))
A.b(a7,"uDirectionalDirection",new A.d(B.h,new Float32Array(A.r(A.e([0,1,0],q)))))
A.b(a7,"uDirectionalColor",new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a7,"uDirectionalIntensity",new A.d(B.b,0))
i=A.p5(B.ao,r)
for(h=0;h<4;++h){r=i.length
if(h<r)if(!(h<r))return A.h(i,h)
r=""+h
A.b(a7,"uPointPosition"+r,new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a7,"uPointColor"+r,new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a7,"uPointIntensity"+r,new A.d(B.b,0))
A.b(a7,"uPointRadius"+r,new A.d(B.b,1))}for(h=0;h<3;++h){r=s.length
if(h<r){if(!(h<r))return A.h(s,h)
g=s[h]}else g=a0
r=g==null
f=r?a0:B.p
if(f==null)f=B.F
e=r?a0:B.u
if(e==null)e=B.u
d=r?a0:B.D
if(d==null)d=B.C
o=""+h
A.b(a7,"uDirectSpotPosition"+o,new A.d(B.h,new Float32Array(A.r(A.e([f.a,f.b,f.c],q)))))
A.b(a7,"uDirectSpotDirection"+o,new A.d(B.h,new Float32Array(A.r(A.e([e.a,e.b,e.c],q)))))
A.b(a7,"uDirectSpotColor"+o,new A.d(B.h,new Float32Array(A.r(A.e([d.a,d.b,d.c],q)))))
m=r?a0:1
if(m==null)m=0
A.b(a7,"uDirectSpotIntensity"+o,new A.d(B.b,m))
m=r?a0:1
if(m==null)m=1
A.b(a7,"uDirectSpotRange"+o,new A.d(B.b,m))
m=r?a0:0.3
if(m==null)m=0.3
A.b(a7,"uDirectSpotInnerCos"+o,new A.d(B.b,Math.cos(m)))
m=r?a0:0.5
if(m==null)m=0.5
A.b(a7,"uDirectSpotOuterCos"+o,new A.d(B.b,Math.cos(m)))
r=r?0:1
A.b(a7,"uDirectSpotEnabled"+o,new A.d(B.b,r))}s=n?a0:1
A.b(a7,"uLightRange",new A.d(B.b,s==null?1:s))
s=n?a0:0.3
if(s==null)s=0.3
A.b(a7,"uLightInnerCos",new A.d(B.b,Math.cos(s)))
s=n?a0:0.5
if(s==null)s=0.5
A.b(a7,"uLightOuterCos",new A.d(B.b,Math.cos(s)))
A.b(a7,"uAmbientColor",new A.d(B.h,new Float32Array(A.r(A.e([1,1,1],q)))))
A.b(a7,"uAmbientIntensity",new A.d(B.b,0))
A.b(a7,"uAmbientLightScale",new A.d(B.b,1))
A.b(a7,"uDirectLightScale",new A.d(B.b,1))
A.b(a7,"uReflectionColor",new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a7,"uReflectionIntensity",new A.d(B.b,0))
A.b(a7,"uReflectionConfidence",new A.d(B.b,0))
A.b(a7,"uRainWetness",new A.d(B.b,0))
A.b(a7,"uSurfaceSnowCoverage",new A.d(B.b,0))
A.b(a7,"uSurfaceDissolution",new A.d(B.b,0))
c=A.eH(B.aq,0,A.bp(4,"count",t.S),t.aX).eq(0)
A.b(a7,"uThermalSourceCount",new A.d(B.b,c.length))
for(h=0;h<4;++h){s=c.length
if(h<s)if(!(h<s))return A.h(c,h)
s=""+h
A.b(a7,"uThermalSourcePosition"+s,new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a7,"uThermalSourceRadius"+s,new A.d(B.b,1))
A.b(a7,"uThermalSourceDissolution"+s,new A.d(B.b,0))}for(a7=a3.a,s=a7.length,b=0;b<a7.length;a7.length===s||(0,A.A)(a7),++b)a.c_(a2,a7[b],0,a5)
for(a3=a3.b,a7=a3.length,b=0;b<a3.length;a3.length===a7||(0,A.A)(a3),++b)a.c_(a2,a3[b],0,a5)},
c_(a,b,c,d){var s,r,q,p,o=this
if(b instanceof A.dp){s=a.a
A.b(s,"uUseInstances",B.a5)
r=b.b
o.c0(a,r.ga3())
o.bW(a,r.gad(),r.gcf(),r.gdH(),c,r.gcD(),d)
q=o.c.$1(r.gX())
A.ap(s,q.a)
s=q.b
r=q.c
if(s)a.bf(r,q.d,0)
else a.a_(r,0)}else if(b instanceof A.bd){s=b.a.b
o.c0(a,s.ga3())
A.jn(a,b,!0)
o.bW(a,s.gad(),s.gcf(),s.gdH(),c,s.gcD(),d)
q=o.c.$1(s.gX())
A.ap(a.a,q.a)
s=q.b
r=q.c
p=b.b.length
if(s)a.bg(r,q.d,p,0)
else a.be(r,0,p)}else throw A.c(A.o("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dK(b).j(0),null))},
bW(a,b,c,d,e,f,g){var s=this,r=s.d.$1(b),q=t.j,p=a.a
A.S(p,0,q.a(s.e.$1(r.gc8())))
A.S(p,3,q.a(s.f.$1(r.geT())))
A.S(p,4,q.a(s.r.$1(r.geV())))
A.S(p,5,q.a(s.w.$1(r.geF())))
A.S(p,6,q.a(s.x.$1(r.geN())))
r.gc9()
A.b(p,"uAlphaCutoff",new A.d(B.b,0))
A.b(p,"uOpaqueCoverage",new A.d(B.b,1))
A.b(p,"uAffineWarpStrength",new A.d(B.b,r.gdB()?e:0))
q=t.n
A.b(p,"uMaterialTint",new A.d(B.h,new Float32Array(A.r(A.e([r.gf0(),r.gf_(),r.geZ()],q)))))
A.b(p,"uEmissiveStrength",new A.d(B.b,r.geE()))
A.b(p,"uUvScaleOffset",new A.d(B.cS,new Float32Array(A.r(A.e([r.gf5(),r.gf6(),r.gf3(),r.gf4()],q)))))
A.b(p,"uNormalStrength",new A.d(B.b,r.geS().C(0,1)))
A.b(p,"uRoughness",new A.d(B.b,r.geY().C(0,1)))
A.b(p,"uMetallic",new A.d(B.b,r.geQ().C(0,1)))
A.b(p,"uSpecularScale",new A.d(B.b,1))
A.b(p,"uClearcoatStrength",new A.d(B.b,r.geB()))
A.b(p,"uClearcoatRoughness",new A.d(B.b,r.geA()))
A.b(p,"uOcclusionStrength",new A.d(B.b,r.geU()))
A.b(p,"uLightmapIntensity",new A.d(B.b,r.geM()))
A.b(p,"uReceivesShadow",new A.d(B.b,r.gcD()&&f?1:0))
A.a7(p,r.gce()?null.bs(!1):null)},
c0(a,b){var s=b.aw(),r=a.a
A.b(r,"uModel",new A.d(B.k,new Float32Array(A.r(s.ga9()))))
A.b(r,"uNormalMatrix",new A.d(B.k,new Float32Array(A.r(s.cz().ga9()))))},
$ix:1,
gA(){return this.a}}
A.eF.prototype={
gD(){return"ssaoOcclusion"},
L(a,b){B.a.i(a.a,new A.D("ssaoOcclusion",B.L,A.e([new A.j(this.w,B.e)],t.C),!1))},
K(a){var s=this,r="ssaoOcclusion",q=s.a.M(new A.a1(r,s.b,s.c,B.m,B.av,B.bq)),p=A.aw(s.d)
return A.e([new A.fn(new A.V(r,A.e([new A.j(s.w,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iB:1}
A.fn.prototype={
I(a){var s=a.b.a
A.ao(s,a.S("ssaoRaw").b)
A.a7(s,this.a.R())
A.bF(s,B.H,1,1,1,1)
return},
$ix:1,
gA(){return this.a}}
A.eE.prototype={
gD(){return"ssaoBlur"},
L(a,b){B.a.i(a.a,new A.D("ssaoBlur",B.L,A.e([new A.j(this.y,B.d),new A.j(this.z,B.e)],t.C),!1))},
K(a){var s=this,r="ssaoBlur",q=s.a.M(new A.a1(r,s.b,s.c,B.m,B.bG,B.bE)),p=A.aw(s.d)
return A.e([new A.fm(new A.V(r,A.e([new A.j(s.y,B.d),new A.j(s.z,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iB:1}
A.fm.prototype={
I(a){var s=a.b.a
A.ao(s,a.S("ssaoBlurred").b)
A.a7(s,this.a.R())
A.bF(s,B.H,1,1,1,1)
return},
$ix:1,
gA(){return this.a}}
A.eS.prototype={
gD(){return"vhs"},
L(a,b){var s=this.w
a.b.i(0,s.a)
B.a.i(a.a,new A.D("vhs",B.q,A.e([new A.j(this.r,B.d),new A.j(s,B.r),new A.j(s,B.e)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a1("vhs",s.b,s.c,B.m,B.bH,B.bt)),q=A.aw(s.d),p=s.r,o=s.w
return A.e([new A.fr(new A.V("vhs",A.e([new A.j(p,B.d),new A.j(o,B.r),new A.j(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iB:1}
A.fr.prototype={
I(a){var s=this,r=a.S(s.f.a),q=a.S(s.r.a),p=a.b,o=p.a
A.ao(o,q.b)
A.a7(o,s.a.R())
A.aN(o,s.b.b)
A.S(o,0,r.b)
A.b(o,"uScene",B.o)
A.S(o,1,t.j.a(s.d.$0()))
A.b(o,"uHistory",B.y)
A.b(o,"uTime",new A.d(B.b,s.e.$0()))
A.b(o,"uChromaWeight",new A.d(B.b,0))
A.b(o,"uTrackingWeight",new A.d(B.b,0))
A.b(o,"uNoiseWeight",new A.d(B.b,0))
A.b(o,"uHeadSwitchWeight",new A.d(B.b,0))
A.b(o,"uDropoutWeight",new A.d(B.b,0))
A.b(o,"uGhostWeight",new A.d(B.b,0))
A.ap(o,s.c)
p.a_(3,0)},
$ix:1,
gA(){return this.a}}
A.eT.prototype={
gD(){return"volumetricLight"},
L(a,b){var s=this,r=s.w,q=t.C,p=a.a
B.a.i(p,new A.D("volumetricLight",B.L,A.e([new A.j(s.x,B.d),new A.j(r,B.e)],q),!1))
B.a.i(p,new A.D("volumetricComposite",B.q,A.e([new A.j(r,B.d),new A.j(s.y,B.d),new A.j(s.z,B.e)],q),!1))},
K(a){var s,r,q,p,o,n,m=this,l="volumetricLight",k="volumetricComposite",j=m.a,i=m.b,h=j.M(new A.a1(l,i,m.c,B.m,B.av,B.bu)),g=m.e,f=A.aw(g),e=m.Q
B.a.i(e,f)
s=m.w
r=t.C
q=A.e([new A.ft(new A.V(l,A.e([new A.j(m.x,B.d),new A.j(s,B.e)],r),!1,!1,!1,!1),h,f,s.a,m.f,m.r)],t.u)
p=m.z
o=j.M(new A.a1(k,i,m.d,B.m,B.bQ,B.bF))
n=A.aw(g)
B.a.i(e,n)
B.a.i(q,new A.fs(new A.V(k,A.e([new A.j(s,B.d),new A.j(m.y,B.d),new A.j(p,B.e)],r),!1,!1,!0,!1),o,n,s,p))
return q},
$iB:1}
A.ft.prototype={
I(a){var s,r,q,p,o=this,n=a.S(o.d),m=a.b,l=o.f.$0(),k=m.a
A.ao(k,n.b)
A.a7(k,o.a.R())
A.bF(k,B.H,1,0,0,0)
A.aN(k,o.b.b)
A.S(k,0,t.j.a(o.e.$0()))
A.b(k,"uSceneDepth",B.o)
A.b(k,"uNear",new A.d(B.b,l.f))
A.b(k,"uFar",new A.d(B.b,l.r))
A.b(k,"uViewProjection",new A.d(B.k,new Float32Array(A.r(l.c.a))))
A.b(k,"uView",new A.d(B.k,new Float32Array(A.r(l.a.a))))
A.b(k,"uInverseProjection",new A.d(B.k,new Float32Array(A.r(l.gcp().a))))
A.b(k,"uShaftIntensity",new A.d(B.b,0))
A.b(k,"uFogDensity",new A.d(B.b,0))
A.b(k,"uAnisotropy",new A.d(B.b,0.7))
s=t.n
A.b(k,"uVolumetricAlbedo",new A.d(B.h,new Float32Array(A.r(A.e([1,1,1],s)))))
A.b(k,"uVolumetricHeightFalloff",new A.d(B.b,0.02))
A.b(k,"uVolumetricDustDensity",new A.d(B.b,0))
A.b(k,"uVolumetricJitter",new A.d(B.b,0.35))
A.b(k,"uVolumetricIntensity",new A.d(B.b,1))
A.b(k,"uVolumetricSampleCount",new A.d(B.b,12))
A.b(k,"uLightDir",new A.d(B.h,new Float32Array(A.r(A.e([0,1,0],s)))))
A.b(k,"uLightColor",new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],s)))))
r=A.p7(4,l.d,B.ap)
A.b(k,"uVolumetricSourceCount",new A.d(B.b,r.length))
for(q=0;q<4;++q){p=r.length
if(q<p)if(!(q<p))return A.h(r,q)
p=""+q
A.b(k,"uSourcePosition"+p,new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],s)))))
A.b(k,"uSourceColor"+p,new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],s)))))
A.b(k,"uSourceIntensity"+p,new A.d(B.b,0))
A.b(k,"uSourceReferenceDistance"+p,new A.d(B.b,1))
A.b(k,"uSourceCutoffDistance"+p,new A.d(B.b,1))}A.ap(k,o.c)
m.a_(3,0)},
$ix:1,
gA(){return this.a}}
A.fs.prototype={
I(a){var s=this,r=a.az(s.e),q=a.az(s.d),p=a.b,o=p.a
A.ao(o,r.b)
A.n7(o,1)
A.a7(o,B.b_)
A.aN(o,s.b.b)
A.S(o,0,q.b)
A.b(o,"uVolumetric",B.o)
A.b(o,"uVolumetricStrength",B.aK)
A.ap(o,s.c)
p.a_(3,0)},
$ix:1,
gA(){return this.a}}
A.cZ.prototype={}
A.eW.prototype={
gD(){return"world"},
L(a,b){B.a.i(a.a,new A.D("worldOpaqueTransparent",B.ak,A.e([new A.j(this.e,B.e)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a1("safeWorld",s.b,s.c,B.bR,B.m,B.bx)),q=s.e
return A.e([new A.fw(new A.V("worldOpaqueTransparent",A.e([new A.j(q,B.e)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iB:1}
A.fw.prototype={
I(a){var s,r,q=this,p=a.b,o=a.d,n=p.a
A.ao(n,a.S(q.d).b)
A.a7(n,q.a.R())
A.bF(n,B.ad,1,0.04,0.03,0.03)
A.aN(n,q.b.b)
A.b(n,"uViewProjection",new A.d(B.k,new Float32Array(A.r(o.c.c.a))))
s=t.n
A.b(n,"uLightDir",new A.d(B.h,new Float32Array(A.r(A.e([0,1,0],s)))))
A.b(n,"uAmbientColor",new A.d(B.h,new Float32Array(A.r(A.e([1,1,1],s)))))
A.b(n,"uAmbientIntensity",new A.d(B.b,0))
A.b(n,"uAmbientLightScale",new A.d(B.b,1))
A.b(n,"uDirectLightScale",new A.d(B.b,1))
for(n=o.a,s=n.length,r=0;r<n.length;n.length===s||(0,A.A)(n),++r)q.bN(p,n[r])
for(o=o.b,n=o.length,r=0;r<o.length;o.length===n||(0,A.A)(o),++r)q.bN(p,o[r])},
bN(a,b){var s,r,q,p,o=this
if(b instanceof A.bd){s=b.a.b
o.bX(a,s.ga3())
A.jn(a,b,!0)
r=o.c.$1(s.gX())
A.ap(a.a,r.a)
s=r.b
q=r.c
p=b.b.length
if(s)a.bg(q,r.d,p,0)
else a.be(q,0,p)}else if(b instanceof A.dp){s=a.a
A.b(s,"uUseInstances",B.a5)
q=b.b
o.bX(a,q.ga3())
r=o.c.$1(q.gX())
A.ap(s,r.a)
s=r.b
q=r.c
if(s)a.bf(q,r.d,0)
else a.a_(q,0)}else throw A.c(A.o("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dK(b).j(0),null))},
bX(a,b){var s=b.aw(),r=a.a
A.b(r,"uModel",new A.d(B.k,new Float32Array(A.r(s.ga9()))))
A.b(r,"uNormalMatrix",new A.d(B.k,new Float32Array(A.r(s.cz().ga9()))))},
$ix:1,
gA(){return this.a}}
A.h_.prototype={
v(){return"GpuBufferUsage."+this.b}}
A.e6.prototype={
v(){return"GpuBufferKind."+this.b}}
A.h4.prototype={
v(){return"GpuTextureFilter."+this.b}}
A.h5.prototype={
v(){return"GpuTextureWrap."+this.b}}
A.fZ.prototype={}
A.h3.prototype={}
A.bV.prototype={
v(){return"GpuTargetAttachment."+this.b}}
A.cy.prototype={}
A.e7.prototype={
v(){return"GpuDeviceStatus."+this.b}}
A.c4.prototype={
v(){return"ShaderCompileStage."+this.b}}
A.d3.prototype={
j(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.b3.prototype={
v(){return"UniformType."+this.b}}
A.d.prototype={}
A.cp.prototype={
v(){return"ClearMask."+this.b}}
A.e0.prototype={
a_(a,b){var s=this.a
if(s.b!==B.f)A.l(A.k(u.k))
s.a.drawArrays(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.aa(a,1)},
be(a,b,c){var s=this.a
if(s.b!==B.f)A.l(A.k(u.k))
s.a.drawArraysInstanced(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.aa(a,c)},
bf(a,b,c){var s,r,q=this.a
if(q.b!==B.f)A.l(A.k(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.aa(a,1)},
bg(a,b,c,d){var s,r,q=this.a
if(q.b!==B.f)A.l(A.k(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.a8(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.aa(a,c)},
$imd:1}
A.er.prototype={
cA(a){var s=this.b.m(0,a)
if(s==null)throw A.c(A.k("resource is not in candidate: "+a))
return s}}
A.h0.prototype={
gl(){var s=this.c
if(s==null)throw A.c(A.k("GPU resource adapter is not initialized"))
return s},
U(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.dc(s.b)
r.b.U()
r.c=null
r.e=!0},
bK(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.ag(a0,a1),a3=A.e([],t.e)
try{k=a4.a
j=k.$ti
i=j.h("z(1)")
j=j.h("a2<1>")
s=new A.a2(k,i.a(new A.h1()),j)
for(h=s,g=J.a_(h.a),h=new A.G(g,h.b,h.$ti.h("G<1>")),f=a.a;h.k();){r=g.gl()
q=A.kU(f,a.bL(r,a5))
J.fz(a3,q)
J.dJ(a2,r,q)}e=A.au(new A.a2(k,i.a(new A.h2()),j),j.h("i.E"))
B.a.cP(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.A)(k),++d){o=k[d]
n=A.lG(J.m2(o,11))
if(i){h=J.jt(a2,"sceneColor")
h.toString
J.dJ(a2,o,h)}else{h=n
if(typeof h!=="number")return h.bu()
if(h>=2){h=J.jt(a2,"sceneColor#1")
h.toString
J.dJ(a2,o,h)}else{m=A.kU(f,a.bL(o,a5))
J.fz(a3,m)
J.dJ(a2,o,m)}}}a0=A.kk(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.H(a0).h("d1<1>"),a0=new A.d1(a0,k),a0=new A.ad(a0,a0.gn(0),k.h("ad<N.E>")),j=a.a,k=k.h("N.E"),i=t.V;a0.k();){h=a0.d
l=h==null?k.a(h):h
h=a1.a(l)
if(h.b===j.Q){b=i.a(h.a)
A.jK(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}}throw c}},
bL(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.cy(512,512,1,B.K,!0)
if(a==="sceneDepth")return new A.cy(n,m,1,B.K,!0)
s=B.c.H(a,"ssao")||B.c.H(a,"bloomBlur")||B.c.H(a,"dofBlur")||B.c.H(a,"volumetricLight")
r=s?(n+1)/2|0:n
q=s?(m+1)/2|0:m
p=a==="sceneColor"
o=p||B.c.H(a,"sceneColor#")
p=p?b.d:1
return new A.cy(r,q,p,o?B.ah:B.b9,o)},
dc(a){var s,r,q,p,o,n=A.jE(t.bS.a(a).gah(),t.j)
for(n=A.ij(n,n.r,A.t(n).c),s=this.a,r=n.$ti.c,q=t.V;n.k();){p=n.d
if(p==null)p=r.a(p)
if(p.b===s.Q){o=q.a(p.a)
A.jK(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}}
A.h1.prototype={
$1(a){return!B.c.H(A.aO(a),"sceneColor#")},
$S:6}
A.h2.prototype={
$1(a){return B.c.H(A.aO(a),"sceneColor#")},
$S:6}
A.aL.prototype={
ab(a){var s,r
this.$ti.c.a(a)
if(a.gY().aB(0,0)||a.gY().bu(0,0))A.l(A.bW(B.am,a))
s=this.b
r=B.a.m(s,a.gY())
r.gaR()
a.gaR()
A.l(A.bW(B.an,a))
r.gaT()
r.gaT()
s=B.a.m(s,a.gY()).gdM()
return s},
bq(a){var s,r
this.$ti.c.a(a)
s=a.a
if(s<0||s>=0)throw A.c(A.bW(B.am,a))
r=this.b
if(!(s>=0&&s<0))return A.h(r,s)
r[s].gaR()
s=A.bW(B.an,a)
throw A.c(s)},
ap(){return new A.bn(this.e3(),this.$ti.h("bn<+(1,2)>"))},
e3(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j
return function $async$ap(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.a,n=s.b,m=0
case 3:if(!!1){r=5
break}if(!(m<0)){A.h(n,m)
r=1
break}l=n[m]
l.gaT()
l.gaT()
k=o.$3(m,l.gaR(),l.geD())
j=l.gdM()
r=6
return a.b=new A.bm(k,j),1
case 6:case 4:++m
r=3
break
case 5:case 1:return 0
case 2:return a.c=p.at(-1),3}}}}}
A.fB.prototype={
v(){return"BlendEquation."+this.b}}
A.dO.prototype={
v(){return"BlendFactor."+this.b}}
A.fF.prototype={
v(){return"CullFace."+this.b}}
A.fJ.prototype={
v(){return"DepthFunc."+this.b}}
A.e2.prototype={
bs(a){var s=this
return A.km(s.f,s.d,s.r,s.e,!0,!0,!0,!0,!1,s.x,s.b,s.a,s.c,!0,!1,!1)}}
A.a6.prototype={
v(){return"StateField."+this.b}}
A.hY.prototype={
dQ(a){var s,r=this.a
if(r==null)return A.mt(B.bA,t.d5)
s=A.ac(t.d5)
if(r.a!==a.a)s.i(0,B.X)
if(r.b!==a.b)s.i(0,B.Y)
if(r.c!==a.c)s.i(0,B.Z)
if(r.d!==a.d)s.i(0,B.a_)
if(r.e!==a.e||r.f!==a.f)s.i(0,B.a0)
if(r.r!==a.r)s.i(0,B.a1)
if(r.w!==a.w)s.i(0,B.a2)
if(r.x!==a.x)s.i(0,B.a3)
return s}}
A.cb.prototype={}
A.b6.prototype={$iaz:1}
A.dA.prototype={}
A.dz.prototype={}
A.fv.prototype={}
A.eU.prototype={
aS(a){this.e=a
this.x=a==null?null:this.z.aN(a,A.pd())},
cS(a){var s=this,r=A.Y(s.a.canvas)
s.c=A.dF(new A.hV(s))
s.d=A.dF(new A.hW(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
a7(a){var s
if(!this.r.q(0,a))return!1
s=A.Z(this.a.getExtension(a))!=null
if(s)this.y.i(0,a)
return s},
aj(a){var s=A.br(this.a.getParameter(a))
return typeof s=="number"?B.w.ep(s):0},
bS(a){var s=A.br(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
cc(a){var s=this,r=a.a
s.z.av(0,r)
if(r===s.e)s.aS(null)
if(a.b===s.Q)s.a.deleteProgram(A.Y(r))},
$imi:1}
A.hV.prototype={
$1(a){A.Y(a).preventDefault()
this.a.b=B.v},
$S:11}
A.hW.prototype={
$1(a){var s,r,q,p=this.a
p.b=B.f;++p.Q
p.z.W(0)
p.aS(null)
for(s=p.y,s=A.ij(s,s.r,A.t(s).c),p=p.a,r=s.$ti.c;s.k();){q=s.d
if(q==null)q=r.a(q)
A.Z(p.getExtension(q))}},
$S:11}
A.ix.prototype={
dE(){var s,r=this
if(r.b!==B.f)A.l(A.k(u.k))
s=r.w?A.Z(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.b6(new A.fv(s),r.Q)},
dP(a){if(a.b!==this.Q)return
this.a.deleteQuery(this.c5(a).a)},
c5(a){var s=a.a
if(!(s instanceof A.fv))throw A.c(A.aS(a,"query","is not a GPU timer query"))
return s}}
A.fu.prototype={}
A.hU.prototype={}
A.hX.prototype={
dN(a){var s=A.Z(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.hU(A.n2(s))}}
A.ja.prototype={
$1(a){var s=a.a===B.S?2:1
return new A.cY(a,384,216,s,a===B.T?0:1)},
$S:59}
A.j9.prototype={
$1(a){var s,r,q,p=a.c/a.d
if(!B.z.gP(0)||B.z.ga8()<1e-12)A.l(A.o("CameraView.look requires a finite, nonzero forward: "+B.z.j(0),null))
if(!isFinite(1))A.l(A.o("CameraView.look requires 0 < fovYRadians < pi: 1",null))
s=B.z.gbm()
if(B.p.bc(s).ga8()<1e-12)A.l(A.o("CameraView.look requires up ("+B.p.j(0)+") not parallel to forward ("+B.z.j(0)+")",null))
r=A.kt(B.F,s,B.p)
q=A.ku(p,100,1,0.1)
p=new A.bu(r,q,q.C(0,r),B.F,s,0.1,100,p)
p.F()
return p},
$S:60}
A.jd.prototype={
$0(){var s=this,r=s.b,q=s.c
r.setAttribute("data-renderer-state",q.e.b)
r.setAttribute("data-renderer-backend","pixeldart")
r.setAttribute("data-renderer-requested-profile",s.d)
q=q.as
r.setAttribute("data-renderer-effective-profile",(q==null?A.l(A.k("renderer is not initialized")):q).a.a.b)
q=s.e.gdS()
if(q==null)q="false"
r.setAttribute("data-renderer-profile-fallback",q)
q=s.f
r.setAttribute("data-renderer-frames",""+q.a)
r.setAttribute("data-renderer-history-epoch",""+q.b)
q=s.a.b
r.setAttribute("data-renderer-surface",""+q.c+"x"+q.d)},
$S:0}
A.je.prototype={
$0(){var s,r,q,p=this,o=p.b,n=A.a(o.clientWidth)>0?A.a(o.clientWidth):A.a(o.width),m=A.a(o.clientHeight)>0?A.a(o.clientHeight):A.a(o.height),l=A.dD(A.Y(v.G.window).devicePixelRatio),k=p.a,j=k.b
if(n===j.a&&m===j.b&&l===k.a)return
k.a=l
r=A.kG(m,n,l,2,!0)
k.b=r
o.width=r.c
o.height=k.b.d
try{k=k.b
p.c.aF()
k.F()
p.d.bl("surface resized")
o.removeAttribute("data-renderer-resize-error")}catch(q){s=A.b8(q)
o.setAttribute("data-renderer-resize-error",A.p(s))}},
$S:0}
A.jb.prototype={
$1(a){A.Y(a)
return this.a.$0()},
$S:61}
A.jc.prototype={
$1(a){A.Y(a)
this.a.c=!0
this.b.bl("gl context restored")},
$S:62}
A.jf.prototype={
$1(a){var s,r,q,p,o=this
A.dD(a)
o.b.$0()
r=o.c
if(r.e!==B.x||o.a.c)try{q=o.a
r.ca(o.d,o.e.cv(o.f.$1(q.b),B.a8,B.ab,a/1000))
r.cg()
q.c=!1
o.r.removeAttribute("data-renderer-frame-error")}catch(p){s=A.b8(p)
o.r.setAttribute("data-renderer-frame-error",A.p(s))
if(r.e===B.x)o.e.bl("gl context lost")}o.w.$0()
A.a(A.Y(v.G.window).requestAnimationFrame(A.dF(o)))},
$S:63};(function aliases(){var s=J.bh.prototype
s.cR=s.j})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"oe","mo",64)
r(A,"oE","ne",4)
r(A,"oF","nf",4)
r(A,"oG","ng",4)
q(A,"lC","oz",0)
p(A.ef.prototype,"ged","ee",12)
var o
p(o=A.eK.prototype,"ge9","ea",3)
p(o,"geh","ei",3)
p(o,"gej","ek",3)
p(o,"geb","ec",3)
p(o,"gef","eg",3)
q(A,"lD","ni",66)
q(A,"pI","jH",67)
q(A,"pd","ns",45)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.w,null)
q(A.w,[A.jB,J.ea,A.d2,J.cl,A.i,A.cn,A.E,A.y,A.hJ,A.ad,A.cK,A.G,A.aa,A.bE,A.b4,A.bZ,A.cr,A.bJ,A.b0,A.hO,A.hm,A.cw,A.dn,A.bc,A.bz,A.h9,A.cH,A.aX,A.cG,A.aD,A.f9,A.ir,A.ip,A.eX,A.b5,A.as,A.f1,A.bG,A.P,A.eY,A.fo,A.dB,A.dd,A.fb,A.bK,A.dg,A.dv,A.fq,A.bT,A.dY,A.it,A.bv,A.i2,A.eo,A.d4,A.i3,A.aT,A.R,A.U,A.fp,A.ae,A.dx,A.hQ,A.fl,A.hl,A.hv,A.al,A.dW,A.dX,A.hs,A.bu,A.fS,A.fT,A.fV,A.aZ,A.h6,A.aK,A.dQ,A.bY,A.ai,A.fI,A.hn,A.ht,A.d0,A.d6,A.cY,A.O,A.fW,A.ef,A.eO,A.hi,A.eK,A.bd,A.e4,A.e5,A.fU,A.fR,A.c9,A.D,A.a5,A.M,A.j,A.cq,A.hu,A.a1,A.hw,A.V,A.hy,A.hx,A.cX,A.hF,A.i4,A.dp,A.im,A.fe,A.f8,A.fi,A.fd,A.ig,A.ah,A.W,A.fH,A.fG,A.bA,A.fX,A.c_,A.av,A.cm,A.f_,A.dP,A.f0,A.e_,A.f3,A.cu,A.f5,A.e1,A.f6,A.e8,A.fa,A.cL,A.fc,A.bS,A.dR,A.jI,A.cV,A.ff,A.eu,A.fg,A.bC,A.eC,A.fj,A.eD,A.fk,A.eF,A.fn,A.eE,A.fm,A.eS,A.fr,A.eT,A.ft,A.fs,A.cZ,A.eW,A.fw,A.fZ,A.h3,A.cy,A.d3,A.d,A.e0,A.er,A.h0,A.aL,A.e2,A.hY,A.cb,A.b6,A.dA,A.dz,A.fv,A.fu,A.ix,A.hU,A.hX])
q(J.ea,[J.ec,J.cB,J.cD,J.cC,J.cE,J.bX,J.bf])
q(J.cD,[J.bh,J.u,A.c0,A.cP])
q(J.bh,[J.eq,J.bD,J.bg])
r(J.eb,A.d2)
r(J.h8,J.u)
q(J.bX,[J.cA,J.ed])
q(A.i,[A.c7,A.q,A.aC,A.a2,A.bI,A.bn])
r(A.dC,A.c7)
r(A.db,A.dC)
r(A.co,A.db)
q(A.E,[A.cF,A.b1,A.ee,A.eN,A.ey,A.f7,A.dL,A.aH,A.d8,A.eM,A.c5,A.dV])
r(A.c6,A.y)
r(A.dU,A.c6)
q(A.q,[A.N,A.by,A.aB,A.aW,A.bH,A.df])
q(A.N,[A.d5,A.aY,A.d1])
r(A.cv,A.aC)
r(A.bl,A.b4)
q(A.bl,[A.bm,A.ca,A.dl])
r(A.cc,A.bZ)
r(A.bk,A.cc)
r(A.cs,A.bk)
r(A.I,A.cr)
q(A.b0,[A.ct,A.dm,A.dw])
r(A.aI,A.ct)
r(A.cS,A.b1)
q(A.bc,[A.dS,A.dT,A.eJ,A.j4,A.j6,A.i_,A.hZ,A.iz,A.id,A.ih,A.hd,A.ji,A.jj,A.iZ,A.fC,A.fD,A.j_,A.hp,A.hg,A.hj,A.hK,A.hM,A.fN,A.fL,A.fM,A.hq,A.hr,A.hD,A.hC,A.hB,A.hA,A.hz,A.hE,A.iQ,A.iR,A.hG,A.hH,A.jr,A.jp,A.fY,A.hf,A.iX,A.h1,A.h2,A.hV,A.hW,A.ja,A.j9,A.jb,A.jc,A.jf])
q(A.eJ,[A.eG,A.bR])
q(A.bz,[A.aV,A.dc])
q(A.dT,[A.j5,A.iA,A.iV,A.ie,A.ha,A.he,A.hS,A.hR,A.jl,A.jk,A.hk,A.hL,A.jm,A.fO,A.hI,A.jq,A.jo])
q(A.cP,[A.eg,A.a3])
q(A.a3,[A.dh,A.dj])
r(A.di,A.dh)
r(A.cN,A.di)
r(A.dk,A.dj)
r(A.cO,A.dk)
q(A.cN,[A.cM,A.eh])
q(A.cO,[A.ei,A.ej,A.ek,A.el,A.em,A.cQ,A.cR])
r(A.dq,A.f7)
q(A.dS,[A.i0,A.i1,A.iq,A.i5,A.i9,A.i8,A.i7,A.i6,A.ic,A.ib,A.ia,A.il,A.iU,A.iv,A.iu,A.iP,A.iI,A.iJ,A.iO,A.iD,A.iF,A.iE,A.iN,A.iB,A.iC,A.iK,A.iL,A.iM,A.iH,A.iG,A.iS,A.iT,A.iY,A.jd,A.je])
r(A.da,A.f1)
r(A.fh,A.dB)
r(A.de,A.dc)
r(A.aF,A.dm)
r(A.d7,A.dw)
q(A.bT,[A.dN,A.e3])
q(A.dY,[A.fA,A.hT])
r(A.eR,A.e3)
q(A.aH,[A.cW,A.e9])
r(A.f2,A.dx)
q(A.i2,[A.c2,A.hN,A.cz,A.aE,A.fE,A.c3,A.bU,A.aA,A.ex,A.aU,A.d_,A.eB,A.cx,A.eZ,A.f4,A.h_,A.e6,A.h4,A.h5,A.bV,A.e7,A.c4,A.b3,A.cp,A.fB,A.dO,A.fF,A.fJ,A.a6])
q(A.aZ,[A.ak,A.an,A.aJ,A.ep,A.be])
r(A.ez,A.fi)
r(A.eU,A.fu)
s(A.c6,A.bE)
s(A.dC,A.y)
s(A.dh,A.y)
s(A.di,A.aa)
s(A.dj,A.y)
s(A.dk,A.aa)
s(A.cc,A.dv)
s(A.dw,A.fq)
s(A.fi,A.ig)
s(A.fu,A.ix)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{f:"int",n:"double",a9:"num",m:"String",z:"bool",U:"Null",v:"List",w:"Object",a0:"Map",F:"JSObject"},mangledNames:{},types:["~()","az()","z(D)","az(an?)","~(~())","~(@)","z(m)","z(j)","U(@)","U()","@()","U(w?)","jG(aJ)","@(@,m)","a0<m,m>(a0<m,m>,m)","0&(m,f?)","w?(w?)","z(aK)","m(aK)","z(al)","f(+influence,light(n,ai),+influence,light(n,ai))","f(+influence,light(n,cU),+influence,light(n,cU))","U(~())","@(@)","aJ(f,f,m?)","ak(f,f,m?)","f(f,+(ak,hh))","U(@,bj)","an(f,f,m?)","z(eL?)","f(f,+(an,io))","f(+influence,source(n,d9),+influence,source(n,d9))","m(D)","f(x,x)","~(@,@)","~(f,@)","z(f)","be(f,f,m?)","cZ(ak)","az(m{fallback:m?})","U(w,bj)","ai?()","v<ai>()","bu()","n()","cb()","az?()","z(R<m,O>)","O(R<m,O>)","O(O,O)","f(W<ah>,W<ah>)","b_(W<ah>)","f(W<bb>,W<bb>)","b_(W<bb>)","bA(n,n,n,n)","z(n)","~(bC)","bC()","@(m)","cY(al)","bu(d6)","~(F)","U(F)","~(a9)","f(@,@)","~(w?,w?)","c9()","z()","bS()"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.bm&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.ca&&a.b(c.a)&&b.b(c.b),"2;influence,source":(a,b)=>c=>c instanceof A.dl&&a.b(c.a)&&b.b(c.b)}}
A.nz(v.typeUniverse,JSON.parse('{"eq":"bh","bD":"bh","bg":"bh","po":"c0","u":{"v":["1"],"q":["1"],"F":[],"i":["1"]},"ec":{"z":[],"C":[]},"cB":{"C":[]},"cD":{"F":[]},"bh":{"F":[]},"eb":{"d2":[]},"h8":{"u":["1"],"v":["1"],"q":["1"],"F":[],"i":["1"]},"cl":{"J":["1"]},"bX":{"n":[],"a9":[],"af":["a9"]},"cA":{"n":[],"f":[],"a9":[],"af":["a9"],"C":[]},"ed":{"n":[],"a9":[],"af":["a9"],"C":[]},"bf":{"m":[],"af":["m"],"kw":[],"C":[]},"c7":{"i":["2"]},"cn":{"J":["2"]},"db":{"y":["2"],"v":["2"],"c7":["1","2"],"q":["2"],"i":["2"]},"co":{"db":["1","2"],"y":["2"],"v":["2"],"c7":["1","2"],"q":["2"],"i":["2"],"y.E":"2","i.E":"2"},"cF":{"E":[]},"dU":{"y":["f"],"bE":["f"],"v":["f"],"q":["f"],"i":["f"],"y.E":"f","bE.E":"f"},"q":{"i":["1"]},"N":{"q":["1"],"i":["1"]},"d5":{"N":["1"],"q":["1"],"i":["1"],"i.E":"1","N.E":"1"},"ad":{"J":["1"]},"aC":{"i":["2"],"i.E":"2"},"cv":{"aC":["1","2"],"q":["2"],"i":["2"],"i.E":"2"},"cK":{"J":["2"]},"aY":{"N":["2"],"q":["2"],"i":["2"],"i.E":"2","N.E":"2"},"a2":{"i":["1"],"i.E":"1"},"G":{"J":["1"]},"c6":{"y":["1"],"bE":["1"],"v":["1"],"q":["1"],"i":["1"]},"d1":{"N":["1"],"q":["1"],"i":["1"],"i.E":"1","N.E":"1"},"bm":{"bl":[],"b4":[]},"ca":{"bl":[],"b4":[]},"dl":{"bl":[],"b4":[]},"cs":{"bk":["1","2"],"cc":["1","2"],"bZ":["1","2"],"dv":["1","2"],"a0":["1","2"]},"cr":{"a0":["1","2"]},"I":{"cr":["1","2"],"a0":["1","2"]},"bI":{"i":["1"],"i.E":"1"},"bJ":{"J":["1"]},"ct":{"b0":["1"],"bi":["1"],"q":["1"],"i":["1"]},"aI":{"ct":["1"],"b0":["1"],"bi":["1"],"q":["1"],"i":["1"]},"cS":{"b1":[],"E":[]},"ee":{"E":[]},"eN":{"E":[]},"dn":{"bj":[]},"bc":{"bw":[]},"dS":{"bw":[]},"dT":{"bw":[]},"eJ":{"bw":[]},"eG":{"bw":[]},"bR":{"bw":[]},"ey":{"E":[]},"aV":{"bz":["1","2"],"kq":["1","2"],"a0":["1","2"]},"by":{"q":["1"],"i":["1"],"i.E":"1"},"cH":{"J":["1"]},"aB":{"q":["1"],"i":["1"],"i.E":"1"},"aX":{"J":["1"]},"aW":{"q":["R<1,2>"],"i":["R<1,2>"],"i.E":"R<1,2>"},"cG":{"J":["R<1,2>"]},"bl":{"b4":[]},"c0":{"F":[],"C":[]},"cP":{"F":[]},"eg":{"F":[],"C":[]},"a3":{"aj":["1"],"F":[]},"cN":{"y":["n"],"a3":["n"],"v":["n"],"aj":["n"],"q":["n"],"F":[],"i":["n"],"aa":["n"]},"cO":{"y":["f"],"a3":["f"],"v":["f"],"aj":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"]},"cM":{"fP":[],"y":["n"],"a3":["n"],"v":["n"],"aj":["n"],"q":["n"],"F":[],"i":["n"],"aa":["n"],"C":[],"y.E":"n"},"eh":{"fQ":[],"y":["n"],"a3":["n"],"v":["n"],"aj":["n"],"q":["n"],"F":[],"i":["n"],"aa":["n"],"C":[],"y.E":"n"},"ei":{"y":["f"],"a3":["f"],"v":["f"],"aj":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"C":[],"y.E":"f"},"ej":{"y":["f"],"a3":["f"],"v":["f"],"aj":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"C":[],"y.E":"f"},"ek":{"y":["f"],"a3":["f"],"v":["f"],"aj":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"C":[],"y.E":"f"},"el":{"y":["f"],"a3":["f"],"v":["f"],"aj":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"C":[],"y.E":"f"},"em":{"y":["f"],"a3":["f"],"v":["f"],"aj":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"C":[],"y.E":"f"},"cQ":{"y":["f"],"a3":["f"],"v":["f"],"aj":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"C":[],"y.E":"f"},"cR":{"eL":[],"y":["f"],"a3":["f"],"v":["f"],"aj":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"C":[],"y.E":"f"},"f7":{"E":[]},"dq":{"b1":[],"E":[]},"b5":{"J":["1"]},"bn":{"i":["1"],"i.E":"1"},"as":{"E":[]},"da":{"f1":["1"]},"P":{"bx":["1"]},"dB":{"kV":[]},"fh":{"dB":[],"kV":[]},"dc":{"bz":["1","2"],"a0":["1","2"]},"de":{"dc":["1","2"],"bz":["1","2"],"a0":["1","2"]},"bH":{"q":["1"],"i":["1"],"i.E":"1"},"dd":{"J":["1"]},"aF":{"b0":["1"],"kr":["1"],"bi":["1"],"q":["1"],"i":["1"]},"bK":{"J":["1"]},"y":{"v":["1"],"q":["1"],"i":["1"]},"bz":{"a0":["1","2"]},"df":{"q":["2"],"i":["2"],"i.E":"2"},"dg":{"J":["2"]},"bZ":{"a0":["1","2"]},"bk":{"cc":["1","2"],"bZ":["1","2"],"dv":["1","2"],"a0":["1","2"]},"b0":{"bi":["1"],"q":["1"],"i":["1"]},"dm":{"b0":["1"],"bi":["1"],"q":["1"],"i":["1"]},"d7":{"b0":["1"],"fq":["1"],"bi":["1"],"q":["1"],"i":["1"]},"dN":{"bT":["v<f>","m"]},"e3":{"bT":["m","v<f>"]},"eR":{"bT":["m","v<f>"]},"bv":{"af":["bv"]},"n":{"a9":[],"af":["a9"]},"f":{"a9":[],"af":["a9"]},"v":{"q":["1"],"i":["1"]},"a9":{"af":["a9"]},"bi":{"q":["1"],"i":["1"]},"m":{"af":["m"],"kw":[]},"dL":{"E":[]},"b1":{"E":[]},"aH":{"E":[]},"cW":{"E":[]},"e9":{"E":[]},"d8":{"E":[]},"eM":{"E":[]},"c5":{"E":[]},"dV":{"E":[]},"eo":{"E":[]},"d4":{"E":[]},"fp":{"bj":[]},"ae":{"mQ":[]},"dx":{"eP":[]},"fl":{"eP":[]},"f2":{"eP":[]},"ak":{"aZ":[]},"an":{"aZ":[]},"aJ":{"aZ":[]},"be":{"aZ":[]},"ep":{"aZ":[]},"nh":{"b_":[]},"cX":{"mL":[]},"fe":{"mK":[]},"f8":{"mg":[]},"ez":{"mO":[]},"ah":{"af":["ah"]},"bb":{"af":["bb"]},"cm":{"B":[]},"f_":{"x":[]},"dP":{"B":[]},"f0":{"x":[]},"e_":{"B":[]},"f3":{"x":[]},"cu":{"B":[]},"f5":{"x":[]},"e1":{"B":[]},"f6":{"x":[]},"e8":{"B":[]},"fa":{"x":[]},"cL":{"B":[]},"fc":{"x":[]},"dR":{"mJ":[]},"cV":{"B":[]},"ff":{"x":[]},"eu":{"B":[]},"fg":{"x":[]},"eC":{"B":[]},"fj":{"x":[]},"eD":{"B":[]},"fk":{"x":[]},"eF":{"B":[]},"fn":{"x":[]},"eE":{"B":[]},"fm":{"x":[]},"eS":{"B":[]},"fr":{"x":[]},"eT":{"B":[]},"ft":{"x":[]},"fs":{"x":[]},"eW":{"B":[]},"fw":{"x":[]},"e0":{"md":[]},"b6":{"az":[]},"eU":{"mi":[]},"ml":{"v":["f"],"q":["f"],"i":["f"]},"eL":{"v":["f"],"q":["f"],"i":["f"]},"mW":{"v":["f"],"q":["f"],"i":["f"]},"mj":{"v":["f"],"q":["f"],"i":["f"]},"mU":{"v":["f"],"q":["f"],"i":["f"]},"mk":{"v":["f"],"q":["f"],"i":["f"]},"mV":{"v":["f"],"q":["f"],"i":["f"]},"fP":{"v":["n"],"q":["n"],"i":["n"]},"fQ":{"v":["n"],"q":["n"],"i":["n"]}}'))
A.ny(v.typeUniverse,JSON.parse('{"c6":1,"dC":2,"a3":1,"dm":1,"dw":1,"dY":2}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",m:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nuniform vec3 uClearColor;\nuniform vec3 uSkyHorizon;\nuniform vec3 uSkyZenith;\nuniform vec3 uSkyGround;\nuniform float uSkyEnabled;\nuniform float uSkyHorizonGlow;\nuniform float uSkyStarDensity;\nuniform sampler2D uSkyTexture;\nuniform float uSkyTextureEnabled;\nuniform float uSkyRotation;\nuniform float uSkyExposure;\nuniform float uSkyTextureSrgb;\nuniform mat4 uInverseProjection;\nuniform mat4 uInverseView;\nuniform vec3 uCameraPosition;\nuniform float uCloudCoverage;\nuniform float uCloudDensity;\nuniform float uCloudBaseHeight;\nuniform float uCloudThickness;\nuniform float uCloudScale;\nuniform vec2 uCloudWind;\nuniform float uCloudPhase;\nuniform float uCloudDetail;\nuniform float uCloudSilverLining;\nuniform float uCloudSampleCount;\nuniform vec3 uCloudLightDirection;\nuniform vec3 uCloudLightColor;\nuniform float uCloudLightIntensity;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 acesToneMap(vec3 color){\n  return clamp((color*(2.51*color+0.03))/(color*(2.43*color+0.59)+0.14),0.0,1.0);\n}\n\nvec3 agxToneMap(vec3 color){\n  const mat3 agxMat=mat3(\n    0.842479062253094,0.0423282422610123,0.0423756549057051,\n    0.0784335999999992,0.878468636469772,0.0784336,\n    0.0792237451477643,0.0791661274605434,0.879142973793104\n  );\n  const mat3 agxMatInv=mat3(\n    1.19687902425764,-0.0528968517032958,-0.0529716355080549,\n    -0.0980208811401368,1.15190312990417,-0.0980434501171241,\n    -0.0990297440797205,-0.0989611768448433,1.15107367264185\n  );\n  vec3 val=agxMat*color;\n  val=clamp(log2(max(val,vec3(1e-10)))*0.0625+0.625,0.0,1.0);\n  val=val*val*val*(val*(val*6.0-15.0)+10.0);\n  val=agxMatInv*val;\n  return pow(max(val,vec3(0.0)),vec3(2.2));\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nvec3 skyBackground(vec3 direction){\n  // A deliberately cheap, high-quality fallback sky: three atmospheric bands\n  // provide depth at every camera angle, while the tiny deterministic star\n  // field and horizon glow keep the clear background from reading as a flat\n  // color. It is an environment layer, not a game/weather simulation.\n  //\n  // The bands follow the real horizon (the view direction), not the screen.\n  // Below the horizon is ground, which a matched horizon makes equal to the\n  // fog, so fully fogged geometry and the sky beside it meet without a seam;\n  // a screen-space gradient painted zenith colour wherever a downward camera\n  // saw past the fog.\n  float elevation=clamp(direction.y,-1.,1.);\n  vec3 color=mix(uSkyHorizon,uSkyGround,smoothstep(0.0,-0.2,elevation));\n  color=mix(color,uSkyZenith,smoothstep(0.0,0.6,elevation));\n  float horizonGlow=exp(-pow(elevation*9.0,2.0));\n  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);\n  // Stars sit on a sky-fixed grid (about two cells per degree), so they stay\n  // put as the camera turns. Each lit cell holds one small round star at a\n  // jittered spot with its own brightness.\n  float starMask=smoothstep(0.04,0.3,elevation);\n  vec2 cell=vec2(atan(direction.z,direction.x),asin(elevation))*(360.0/3.14159265359);\n  vec2 id=floor(cell);\n  float seed=hash(id);\n  vec2 offset=vec2(hash(id+vec2(17.0,3.0)),hash(id+vec2(5.0,29.0)))*0.5+0.25;\n  float point=1.0-smoothstep(0.08,0.22,length(fract(cell)-offset));\n  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),seed)*point*starMask;\n  color+=vec3(0.16,0.19,0.24)*stars*(0.6+0.9*hash(id+vec2(41.0,11.0)));\n  return max(color,vec3(0.0));\n}\n\nfloat hash3(vec3 p){\n  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);\n}\n\nfloat valueNoise(vec3 p){\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  f=f*f*(3.0-2.0*f);\n  float n000=hash3(i+vec3(0,0,0));\n  float n100=hash3(i+vec3(1,0,0));\n  float n010=hash3(i+vec3(0,1,0));\n  float n110=hash3(i+vec3(1,1,0));\n  float n001=hash3(i+vec3(0,0,1));\n  float n101=hash3(i+vec3(1,0,1));\n  float n011=hash3(i+vec3(0,1,1));\n  float n111=hash3(i+vec3(1,1,1));\n  float x00=mix(n000,n100,f.x);\n  float x10=mix(n010,n110,f.x);\n  float x01=mix(n001,n101,f.x);\n  float x11=mix(n011,n111,f.x);\n  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);\n}\n\nfloat cloudNoise(vec3 p){\n  float value=0.0;\n  float amplitude=0.5;\n  for(int octave=0;octave<4;octave++){\n    value+=valueNoise(p)*amplitude;\n    p=p*2.03+vec3(17.3,11.7,7.1);\n    amplitude*=0.5;\n  }\n  return value;\n}\n\nfloat cloudDensityAt(vec3 position){\n  float height01=clamp(\n    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),\n    0.0,1.0\n  );\n  float vertical=smoothstep(0.0,0.12,height01)*\n    (1.0-smoothstep(0.72,1.0,height01));\n  vec3 q=position*max(uCloudScale,0.00001)+\n    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);\n  float macro=cloudNoise(q*0.82);\n  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));\n  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));\n  float threshold=1.0-clamp(uCloudCoverage,0.,1.);\n  float body=smoothstep(threshold,threshold+0.26,shape);\n  return body*vertical*clamp(uCloudDensity,0.,1.);\n}\n\nvec4 volumetricClouds(vec3 worldDirection){\n  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){\n    return vec4(0.0);\n  }\n  float directionY=max(worldDirection.y,0.001);\n  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;\n  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;\n  startT=max(startT,0.0);\n  endT=max(endT,0.0);\n  if(endT<=startT) return vec4(0.0);\n  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));\n  float stepLength=(endT-startT)/float(sampleCount);\n  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;\n  vec3 sunDirection=normalize(-uCloudLightDirection);\n  float transmittance=1.0;\n  vec3 inScatter=vec3(0.0);\n  for(int i=0;i<24;i++){\n    if(i>=sampleCount) break;\n    float t=startT+(float(i)+0.5)*stepLength+jitter;\n    vec3 position=uCameraPosition+worldDirection*t;\n    float density=cloudDensityAt(position);\n    float opticalDepth=density*stepLength*0.0035;\n    float segmentAlpha=1.0-exp(-opticalDepth);\n    float towardLight=cloudDensityAt(position+sunDirection*90.0);\n    float lightTransmittance=exp(-towardLight*0.025);\n    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);\n    vec3 ambient=uSkyHorizon*0.32;\n    vec3 direct=uCloudLightColor*\n      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;\n    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;\n    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);\n    inScatter+=transmittance*segmentAlpha*sampleLight;\n    transmittance*=1.0-segmentAlpha;\n    if(transmittance<0.01) break;\n  }\n  return vec4(inScatter,1.0-transmittance);\n}\n\nvec3 srgbToLinear(vec3 color){\n  vec3 low=color/12.92;\n  vec3 high=pow((color+0.055)/1.055,vec3(2.4));\n  return mix(low,high,step(vec3(0.04045),color));\n}\n\nvec3 worldDirectionForUv(vec2 uv){\n  vec2 ndc=uv*2.0-1.0;\n  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);\n  return normalize(viewPoint.xyz/viewPoint.w);\n}\n\nvec3 equirectangularSky(vec2 uv){\n  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);\n  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;\n  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));\n  vec2 sampleUv=vec2(\n    fract(longitude/(2.0*3.14159265359)+0.5),\n    0.5-latitude/3.14159265359\n  );\n  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));\n  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));\n  return linear*max(uSkyExposure,0.0);\n}\n\nvec4 applyFxaa(sampler2D tex, vec2 uv){\n  vec2 texelSize=1.0/vec2(textureSize(tex,0));\n  vec3 rgbM=texture(tex,uv).rgb;\n  vec3 rgbNW=texture(tex,uv+vec2(-texelSize.x,-texelSize.y)).rgb;\n  vec3 rgbNE=texture(tex,uv+vec2( texelSize.x,-texelSize.y)).rgb;\n  vec3 rgbSW=texture(tex,uv+vec2(-texelSize.x, texelSize.y)).rgb;\n  vec3 rgbSE=texture(tex,uv+vec2( texelSize.x, texelSize.y)).rgb;\n\n  const vec3 luma=vec3(0.299,0.587,0.114);\n  float lumaM =dot(rgbM, luma);\n  float lumaNW=dot(rgbNW,luma);\n  float lumaNE=dot(rgbNE,luma);\n  float lumaSW=dot(rgbSW,luma);\n  float lumaSE=dot(rgbSE,luma);\n\n  float lumaMin=min(lumaM,min(min(lumaNW,lumaNE),min(lumaSW,lumaSE)));\n  float lumaMax=max(lumaM,max(max(lumaNW,lumaNE),max(lumaSW,lumaSE)));\n\n  float range=lumaMax-lumaMin;\n  if(range<max(0.04,lumaMax*0.125)){\n    return vec4(rgbM,1.0);\n  }\n\n  vec2 dir=vec2(\n    -((lumaNW+lumaNE)-(lumaSW+lumaSE)),\n    ((lumaNW+lumaSW)-(lumaNE+lumaSE))\n  );\n  float dirReduce=max((lumaNW+lumaNE+lumaSW+lumaSE)*0.03125,0.0078125);\n  float rcpDirMin=1.0/(min(abs(dir.x),abs(dir.y))+dirReduce);\n  dir=min(vec2(8.0),max(vec2(-8.0),dir*rcpDirMin))*texelSize;\n\n  vec3 rgbA=0.5*(\n    texture(tex,uv+dir*(1.0/3.0-0.5)).rgb+\n    texture(tex,uv+dir*(2.0/3.0-0.5)).rgb\n  );\n  vec3 rgbB=rgbA*0.5+0.25*(\n    texture(tex,uv+dir*-0.5).rgb+\n    texture(tex,uv+dir* 0.5).rgb\n  );\n  float lumaB=dot(rgbB,luma);\n  if((lumaB<lumaMin)||(lumaB>lumaMax)){\n    return vec4(rgbA,1.0);\n  }\n  return vec4(rgbB,1.0);\n}\n\nvoid main(){\n  vec4 rawSource=texture(uTex,vUv);\n  bool isBackground=uSkyEnabled>0.5 && distance(rawSource.rgb,uClearColor)<0.004;\n  vec4 source=isBackground?rawSource:applyFxaa(uTex,vUv);\n  // Lens spectral dispersion (radial chromatic aberration towards viewport edges)\n  if(!isBackground){\n    vec2 centerOffset=vUv-vec2(0.5);\n    float distSq=dot(centerOffset,centerOffset);\n    if(distSq>0.04){\n      vec2 chromaOffset=centerOffset*distSq*0.010;\n      source.r=applyFxaa(uTex,vUv-chromaOffset).r;\n      source.b=applyFxaa(uTex,vUv+chromaOffset).b;\n    }\n  }\n  // The world pass clears untouched pixels to uClearColor. Replace only that\n  // exact background, so the sky is always active without covering geometry.\n  if(isBackground){\n    vec3 viewDirection=worldDirectionForUv(vUv);\n    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);\n    source.rgb=uSkyTextureEnabled>0.5\n      ? equirectangularSky(vUv)\n      : skyBackground(worldDirection);\n    vec4 clouds=volumetricClouds(worldDirection);\n    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;\n  }\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  vec3 mapped=uToneMap>3.0\n    ?agxToneMap(color)\n    :(uToneMap>1.5?acesToneMap(color):reinhardToneMap(color));\n  float toneMix=uToneMap>3.0\n    ?clamp((uToneMap-3.0)*2.0,0.,1.)\n    :(uToneMap>1.5?clamp(uToneMap-1.5,0.,1.):clamp(uToneMap,0.,1.));\n  color=mix(color,mapped,toneMix);\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  // Atmospheric precipitation is submitted as depth-tested world geometry;\n  // the present pass must never paint weather over unrelated surfaces.\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",k:"WebGl2Device: operation attempted while context is not ready"}
var t=(function rtii(){var s=A.bO
return{v:s("as"),fW:s("dQ"),do:s("bS"),gb:s("af<@>"),dN:s("cq"),I:s("I<m,f>"),P:s("aI<m>"),df:s("bv"),gw:s("q<@>"),Q:s("E"),B:s("fP"),gN:s("fQ"),b:s("O"),Z:s("bw"),j:s("az"),gL:s("be"),cr:s("i<cq>"),bM:s("i<n>"),hf:s("i<@>"),hb:s("i<f>"),e:s("u<az>"),b7:s("u<a5>"),gk:s("u<bd>"),cU:s("u<D>"),dV:s("u<bA>"),p:s("u<cU>"),eT:s("u<aK>"),eu:s("u<+influence,light(n,cU)>"),cw:s("u<+influence,light(n,ai)>"),gg:s("u<+influence,source(n,d9)>"),q:s("u<B>"),u:s("u<x>"),cR:s("u<cX>"),C:s("u<j>"),c4:s("u<kB>"),G:s("u<b_>"),aM:s("u<W<bb>>"),c1:s("u<W<ah>>"),w:s("u<ai>"),s:s("u<m>"),r:s("u<d9>"),cL:s("u<fd>"),ha:s("u<jP<jG>>"),c9:s("u<jP<hh>>"),aO:s("u<jP<kB>>"),fq:s("u<jP<io>>"),n:s("u<n>"),E:s("u<@>"),t:s("u<f>"),T:s("cB"),m:s("F"),cj:s("bg"),aU:s("aj<@>"),_:s("v<a5>"),O:s("v<D>"),dy:s("v<m>"),aH:s("v<@>"),L:s("v<f>"),ao:s("R<m,O>"),bS:s("a0<m,az>"),a1:s("a0<m,D>"),f:s("a0<m,m>"),eL:s("aJ"),cA:s("ak"),a:s("U"),K:s("w"),fy:s("ah"),z:s("D"),x:s("aK"),W:s("al"),gT:s("pp"),bQ:s("+()"),ai:s("+(ak,hh)"),dU:s("+(an,io)"),e8:s("+influence,light(n,cU)"),fk:s("+influence,light(n,ai)"),eS:s("+influence,source(n,d9)"),fA:s("x"),b0:s("aL<be,kB>"),ex:s("aL<aJ,jG>"),cE:s("aL<ak,hh>"),g2:s("aL<an,io>"),J:s("j"),at:s("b_"),U:s("bi<m>"),cJ:s("bi<f>"),d:s("W<bb>"),k:s("W<ah>"),l:s("bj"),d5:s("a6"),N:s("m"),aj:s("an"),aX:s("mT"),dm:s("C"),eK:s("b1"),ak:s("bD"),h:s("bk<m,m>"),am:s("d7<m>"),bw:s("eO"),dD:s("eP"),c:s("P<@>"),cd:s("P<~>"),hg:s("de<w?,w?>"),cm:s("nh"),a8:s("c9"),ce:s("cb"),V:s("dz"),R:s("dA"),y:s("z"),al:s("z(w)"),i:s("n"),A:s("@"),fO:s("@()"),D:s("@(w)"),Y:s("@(w,bj)"),S:s("f"),eH:s("bx<U>?"),du:s("u<w?>?"),an:s("F?"),X:s("w?"),dk:s("m?"),F:s("bG<@,@>?"),g:s("fb?"),fQ:s("z?"),cD:s("n?"),h6:s("f?"),cg:s("a9?"),o:s("a9"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.bm=J.ea.prototype
B.a=J.u.prototype
B.i=J.cA.prototype
B.w=J.bX.prototype
B.c=J.bf.prototype
B.bn=J.bg.prototype
B.bo=J.cD.prototype
B.Q=A.cM.prototype
B.aw=A.cR.prototype
B.ax=J.eq.prototype
B.a6=J.bD.prototype
B.a7=new A.fB(0,"add")
B.aO=new A.dO(0,"zero")
B.G=new A.dO(1,"one")
B.d9=new A.fA()
B.aP=new A.dN()
B.da=new A.fI()
B.bp=new A.bY(0.03,0.03,0.04)
B.C=new A.bY(0,0,0)
B.D=new A.bY(1,1,1)
B.ao=s([],t.p)
B.O=s([],t.w)
B.ap=s([],t.r)
B.aq=s([],A.bO("u<mT>"))
B.a8=new A.fS()
B.ai=new A.h4(1,"linear")
B.aj=new A.h5(0,"clampToEdge")
B.aQ=new A.h3()
B.a9=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.aR=function() {
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
B.aW=function(getTagFallback) {
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
B.aS=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.aV=function(hooks) {
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
B.aU=function(hooks) {
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
B.aT=function(hooks) {
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
B.aa=function(hooks) { return hooks; }

B.aX=new A.eo()
B.cE=new A.hN(1,"reinhard")
B.ab=new A.hs()
B.j=new A.hJ()
B.p=new A.av(0,1,0)
B.u=new A.av(0,-1,0)
B.aY=new A.ai()
B.ac=new A.eR()
B.aZ=new A.hX()
B.n=new A.fh()
B.A=new A.fp()
B.H=new A.cp(0,"colorOnly")
B.ad=new A.cp(1,"colorAndDepth")
B.I=new A.cp(2,"depthOnly")
B.J=new A.fE(1,"srgb")
B.ae=new A.fF(1,"back")
B.af=new A.fJ(0,"less")
B.b_=new A.e2(!1,B.af,!1,!0,B.G,B.G,B.a7,!1,B.ae,!0,!1,!0,!0,!0,!0,!1)
B.b0=new A.O(0,0,0)
B.b1=new A.bU(0,"idle")
B.B=new A.bU(1,"active")
B.b2=new A.bU(2,"ended")
B.b3=new A.bU(3,"aborted")
B.ag=new A.cx(0,"outside")
B.b4=new A.cx(1,"intersects")
B.b5=new A.cx(2,"inside")
B.b6=new A.e6(0,"vertex")
B.b7=new A.e6(1,"indices")
B.b8=new A.h_(0,"staticDraw")
B.f=new A.e7(0,"ready")
B.v=new A.e7(1,"lost")
B.b9=new A.bV(0,"color")
B.ah=new A.bV(1,"colorAndGlow")
B.ba=new A.bV(2,"colorDepthGlow")
B.K=new A.bV(3,"depthOnly")
B.bb=new A.aU(0,"beforeShadow")
B.bc=new A.aU(2,"beforeDepth")
B.L=new A.aU(3,"afterDepth")
B.ak=new A.aU(4,"beforeWorld")
B.bd=new A.aU(5,"afterWorld")
B.q=new A.aU(6,"afterResolve")
B.be=new A.aU(9,"beforePresent")
B.al=new A.aA(0,"readBeforeWrite")
B.bf=new A.aA(1,"duplicateWriter")
B.bg=new A.aA(2,"sampledMultisampledAttachment")
B.M=new A.aA(3,"invalidResolve")
B.bh=new A.aA(4,"formatOrSizeMismatch")
B.bi=new A.aA(5,"unversionedReadWrite")
B.bj=new A.aA(6,"invalidHistoryRead")
B.bk=new A.aA(7,"dependencyCycle")
B.bl=new A.aA(8,"missingCapability")
B.am=new A.cz(0,"wrongKind")
B.an=new A.cz(1,"staleGeneration")
B.N=new A.cz(3,"releasedResource")
B.bq=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.br=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale","uShadowMapTexelSize","uShadowFilterRadius","uShadowBias","uReflectionColor","uReflectionIntensity","uReflectionConfidence","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uSpecularScale","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness","uSurfaceSnowCoverage","uSurfaceDissolution","uThermalSourceCount","uThermalSourcePosition0","uThermalSourceRadius0","uThermalSourceDissolution0","uThermalSourcePosition1","uThermalSourceRadius1","uThermalSourceDissolution1","uThermalSourcePosition2","uThermalSourceRadius2","uThermalSourceDissolution2","uThermalSourcePosition3","uThermalSourceRadius3","uThermalSourceDissolution3"],t.s)
B.bs=s(["uQuantizationBits","uDitherStrength"],t.s)
B.bt=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.bu=s(["uNear","uFar","uLightDir","uLightColor","uShaftIntensity","uFogDensity","uAnisotropy","uViewProjection","uView","uInverseProjection","uVolumetricAlbedo","uVolumetricHeightFalloff","uVolumetricDustDensity","uVolumetricJitter","uVolumetricIntensity","uVolumetricSampleCount"],t.s)
B.bv=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.bw=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.bx=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale"],t.s)
B.by=s([],t.u)
B.S=new A.c2(2,"high")
B.c_={shadows:0,ssao:1,bloom:2,dof:3,grade:4,volumetric:5}
B.cy=new A.aI(B.c_,6,t.P)
B.ce=new A.al(B.S,B.cy)
B.bT={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.cv=new A.aI(B.bT,5,t.P)
B.aA=new A.al(B.S,B.cv)
B.cc=new A.c2(1,"standard")
B.c0={shadows:0}
B.cz=new A.aI(B.c0,1,t.P)
B.az=new A.al(B.cc,B.cz)
B.ay=new A.c2(0,"safe")
B.R={}
B.W=new A.aI(B.R,0,t.P)
B.T=new A.al(B.ay,B.W)
B.P=s([B.ce,B.aA,B.az,B.T],A.bO("u<al>"))
B.bz=s(["uExposure","uVignette","uGrain","uOutputEncoding","uToneMap","uClearColor","uSkyHorizon","uSkyZenith","uSkyGround","uSkyEnabled","uSkyHorizonGlow","uSkyStarDensity","uSkyTexture","uSkyTextureEnabled","uSkyRotation","uSkyExposure","uSkyTextureSrgb","uInverseProjection","uInverseView","uCameraPosition","uCloudCoverage","uCloudDensity","uCloudBaseHeight","uCloudThickness","uCloudScale","uCloudWind","uCloudPhase","uCloudDetail","uCloudSilverLining","uCloudSampleCount","uCloudLightDirection","uCloudLightColor","uCloudLightIntensity"],t.s)
B.X=new A.a6(0,"depthTest")
B.Y=new A.a6(1,"depthFunc")
B.Z=new A.a6(2,"depthWrite")
B.a_=new A.a6(3,"blendEnable")
B.a0=new A.a6(4,"blendFunc")
B.a1=new A.a6(5,"blendEquation")
B.a2=new A.a6(6,"cullEnable")
B.a3=new A.a6(7,"cullFace")
B.aI=new A.a6(8,"frontFace")
B.cD=new A.a6(9,"stencilEnable")
B.aG=new A.a6(10,"colorMask")
B.aH=new A.a6(11,"scissorEnable")
B.bA=s([B.X,B.Y,B.Z,B.a_,B.a0,B.a1,B.a2,B.a3,B.aI,B.cD,B.aG,B.aH],A.bO("u<a6>"))
B.bB=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.bC=s(["uBloomStrength"],t.s)
B.bD=s(["uLutSize","uStrength"],t.s)
B.bE=s(["uTexelSize","uNear","uFar"],t.s)
B.ar=s(["uTexelStep"],t.s)
B.bF=s(["uVolumetricStrength"],t.s)
B.c1={uAlbedo:0}
B.as=new A.I(B.c1,[0],t.I)
B.c8={uSsaoRaw:0,uSceneDepth:1}
B.bG=new A.I(B.c8,[0,1],t.I)
B.c5={uScene:0,uHistory:1}
B.bH=new A.I(B.c5,[0,1],t.I)
B.bX={aPosition:0,aUvMat:1}
B.at=new A.I(B.bX,[0,4],t.I)
B.c6={uScene:0,uLut:1}
B.bI=new A.I(B.c6,[0,1],t.I)
B.c7={uSource:0}
B.au=new A.I(B.c7,[0],t.I)
B.bZ={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.bJ=new A.I(B.bZ,[0,1,2,3,4,5,6],t.I)
B.bV={uSharp:0,uBlurred:1,uSceneDepth:2}
B.bK=new A.I(B.bV,[0,1,2],t.I)
B.c9={uTex:0,uSkyTexture:1}
B.bL=new A.I(B.c9,[0,1],t.I)
B.c2={uBloom:0}
B.bM=new A.I(B.c2,[0],t.I)
B.c3={uSceneDepth:0}
B.av=new A.I(B.c3,[0],t.I)
B.c4={uScene:0}
B.bN=new A.I(B.c4,[0],t.I)
B.bO=new A.I(B.R,[],A.bO("I<m,m>"))
B.m=new A.I(B.R,[],t.I)
B.bS={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.bP=new A.I(B.bS,[0,1,2,3,4,5,6],t.I)
B.ca={uVolumetric:0}
B.bQ=new A.I(B.ca,[0],t.I)
B.bY={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.bR=new A.I(B.bY,[0,1,2,3],t.I)
B.cb=new A.ep(0,1,null)
B.cd=new A.c2(4,"shipping")
B.bU={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.cx=new A.aI(B.bU,7,t.P)
B.db=new A.al(B.cd,B.cx)
B.U=new A.c3(0,"constructed")
B.cf=new A.c3(1,"initializing")
B.E=new A.c3(2,"ready")
B.x=new A.c3(3,"contextLost")
B.d=new A.d_(0,"read")
B.e=new A.d_(1,"write")
B.r=new A.d_(2,"historyRead")
B.l=new A.ex(0,"rgba8")
B.cg=new A.M("dofBlurH",B.l,192,108,1,0)
B.ch=new A.M("dofBlurV",B.l,192,108,1,0)
B.ci=new A.M("dofOutput",B.l,384,216,1,0)
B.aB=new A.ex(2,"depth24")
B.cj=new A.M("shadowMap",B.aB,512,512,1,0)
B.ck=new A.M("volumetricLight",B.l,192,108,1,0)
B.cl=new A.M("sceneColor",B.l,384,216,1,1)
B.cm=new A.M("ssaoRaw",B.l,192,108,1,0)
B.cn=new A.M("ssaoBlurred",B.l,192,108,1,0)
B.co=new A.M("gradeOutput",B.l,384,216,1,0)
B.cp=new A.M("vhsOutput",B.l,384,216,1,0)
B.cq=new A.M("sceneDepth",B.aB,384,216,1,0)
B.cr=new A.M("bloomBlurH",B.l,192,108,1,0)
B.cs=new A.M("bloomBlurV",B.l,192,108,1,0)
B.ct=new A.M("present",B.l,384,216,1,0)
B.V=new A.M("sceneColor",B.l,384,216,1,0)
B.cu=new A.M("ps1Output",B.l,384,216,1,0)
B.bW={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8,volumetric:9}
B.cw=new A.aI(B.bW,10,t.P)
B.aE=new A.c4(2,"link")
B.cA=new A.d3(B.aE,"gl.createProgram() returned null")
B.aC=new A.c4(0,"vertex")
B.aD=new A.c4(1,"fragment")
B.aF=new A.c4(3,"validation")
B.cB=new A.eB(0,"full")
B.cC=new A.eB(2,"culled")
B.cF=A.ay("pf")
B.cG=A.ay("pg")
B.cH=A.ay("fP")
B.cI=A.ay("fQ")
B.cJ=A.ay("mj")
B.cK=A.ay("mk")
B.cL=A.ay("ml")
B.cM=A.ay("F")
B.cN=A.ay("w")
B.cO=A.ay("mU")
B.cP=A.ay("mV")
B.cQ=A.ay("mW")
B.cR=A.ay("eL")
B.b=new A.b3(0,"float1")
B.a4=new A.b3(1,"float2")
B.h=new A.b3(2,"float3")
B.cS=new A.b3(3,"float4")
B.k=new A.b3(4,"mat4")
B.aJ=new A.b3(5,"mat4Array")
B.a5=new A.d(B.b,0)
B.aK=new A.d(B.b,1)
B.t=new A.b3(6,"sampler")
B.o=new A.d(B.t,0)
B.y=new A.d(B.t,1)
B.aL=new A.d(B.t,2)
B.cT=new A.d(B.t,3)
B.cU=new A.d(B.t,4)
B.cV=new A.d(B.t,5)
B.cW=new A.d(B.t,6)
B.cX=new A.hT(!1)
B.F=new A.av(0,0,0)
B.z=new A.av(0,0,1)
B.cY=new A.av(1,0,0)
B.cZ=new A.aE(0,"position")
B.d_=new A.aE(1,"normal")
B.d0=new A.aE(2,"color")
B.d1=new A.aE(3,"emissive")
B.d2=new A.aE(4,"alpha")
B.d3=new A.aE(5,"uv0")
B.d4=new A.aE(6,"tangent4")
B.d5=new A.aE(7,"uv1")
B.d6=new A.aE(8,"legacyMaterialEffect")
B.aM=new A.eZ(0,"horizontal")
B.d7=new A.eZ(1,"vertical")
B.aN=new A.f4(0,"horizontal")
B.d8=new A.f4(1,"vertical")})();(function staticFields(){$.ii=null
$.ar=A.e([],A.bO("u<w>"))
$.kx=null
$.kh=null
$.kg=null
$.lF=null
$.lB=null
$.lI=null
$.j1=null
$.j7=null
$.k4=null
$.ik=A.e([],A.bO("u<v<w>?>"))
$.ce=null
$.dG=null
$.dH=null
$.jX=!1
$.K=B.n
$.kK=""
$.kL=null})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"pi","lN",()=>A.j2("_$dart_dartClosure"))
s($,"ph","k7",()=>A.j2("_$dart_dartClosure_dartJSInterop"))
s($,"pH","m1",()=>A.e([new J.eb()],A.bO("u<d2>")))
s($,"pr","lO",()=>A.b2(A.hP({
toString:function(){return"$receiver$"}})))
s($,"ps","lP",()=>A.b2(A.hP({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"pt","lQ",()=>A.b2(A.hP(null)))
s($,"pu","lR",()=>A.b2(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"px","lU",()=>A.b2(A.hP(void 0)))
s($,"py","lV",()=>A.b2(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"pw","lT",()=>A.b2(A.kH(null)))
s($,"pv","lS",()=>A.b2(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"pA","lX",()=>A.b2(A.kH(void 0)))
s($,"pz","lW",()=>A.b2(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"pB","kd",()=>A.nd())
s($,"pF","m0",()=>A.mx(4096))
s($,"pD","lZ",()=>new A.iv().$0())
s($,"pE","m_",()=>new A.iu().$0())
s($,"pC","lY",()=>A.mw(A.r(A.e([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.t))))
s($,"pG","dI",()=>A.jh(B.cN))
s($,"pe","lM",()=>B.V.cw())
s($,"pn","kc",()=>A.en(A.e([255,255,255,255],t.t)))
s($,"pj","k8",()=>A.en(A.e([128,128,255,255],t.t)))
s($,"pl","ka",()=>A.en(A.e([255,255,255,255],t.t)))
s($,"pk","k9",()=>A.en(A.e([255,255,255,255],t.t)))
s($,"pm","kb",()=>A.en(A.e([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.c0,SharedArrayBuffer:A.c0,ArrayBufferView:A.cP,DataView:A.eg,Float32Array:A.cM,Float64Array:A.eh,Int16Array:A.ei,Int32Array:A.ej,Int8Array:A.ek,Uint16Array:A.el,Uint32Array:A.em,Uint8ClampedArray:A.cQ,CanvasPixelArray:A.cQ,Uint8Array:A.cR})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.a3.$nativeSuperclassTag="ArrayBufferView"
A.dh.$nativeSuperclassTag="ArrayBufferView"
A.di.$nativeSuperclassTag="ArrayBufferView"
A.cN.$nativeSuperclassTag="ArrayBufferView"
A.dj.$nativeSuperclassTag="ArrayBufferView"
A.dk.$nativeSuperclassTag="ArrayBufferView"
A.cO.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.j8
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()