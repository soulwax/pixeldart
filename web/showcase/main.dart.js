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
if(a[b]!==s){A.ol(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.e(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jW(b)
return new s(c,this)}:function(){if(s===null)s=A.jW(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jW(a).prototype
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
k1(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jY(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.k_==null){A.o6()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.c(A.kC("Return interceptor for "+A.o(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.io
if(o==null)o=$.io=A.j4(n)
p=q[o]}if(p!=null)return p
p=A.oc(a)
if(p!=null)return p
if(typeof a=="function")return B.bI
s=Object.getPrototypeOf(a)
if(s==null)return B.aF
if(s===Object.prototype)return B.aF
if(typeof q=="function"){o=$.io
if(o==null)o=$.io=A.j4(n)
Object.defineProperty(q,o,{value:B.af,enumerable:false,writable:true,configurable:true})
return B.af}return B.af},
kj(a,b){if(a<0||a>4294967295)throw A.c(A.aM(a,0,4294967295,"length",null))
return J.kl(new Array(a),b)},
kk(a,b){if(a<0)throw A.c(A.j("Length must be a non-negative integer: "+a,null))
return A.e(new Array(a),b.h("r<0>"))},
jt(a,b){if(a<0)throw A.c(A.j("Length must be a non-negative integer: "+a,null))
return A.e(new Array(a),b.h("r<0>"))},
kl(a,b){var s=A.e(a,b.h("r<0>"))
s.$flags=1
return s},
lX(a,b){var s=t.e8
return J.k9(s.a(a),s.a(b))},
bK(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cC.prototype
return J.e6.prototype}if(typeof a=="string")return J.be.prototype
if(a==null)return J.cD.prototype
if(typeof a=="boolean")return J.e5.prototype
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bf.prototype
if(typeof a=="symbol")return J.cG.prototype
if(typeof a=="bigint")return J.cE.prototype
return a}if(a instanceof A.w)return a
return J.jY(a)},
j3(a){if(typeof a=="string")return J.be.prototype
if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bf.prototype
if(typeof a=="symbol")return J.cG.prototype
if(typeof a=="bigint")return J.cE.prototype
return a}if(a instanceof A.w)return a
return J.jY(a)},
cj(a){if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bf.prototype
if(typeof a=="symbol")return J.cG.prototype
if(typeof a=="bigint")return J.cE.prototype
return a}if(a instanceof A.w)return a
return J.jY(a)},
o2(a){if(typeof a=="number")return J.bY.prototype
if(typeof a=="string")return J.be.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.by.prototype
return a},
o3(a){if(typeof a=="string")return J.be.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.by.prototype
return a},
aV(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bK(a).R(a,b)},
jn(a,b){if(typeof b==="number")if(Array.isArray(a)||A.oa(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.cj(a).q(a,b)},
fs(a,b,c){return J.cj(a).C(a,b,c)},
ft(a,b){return J.cj(a).j(a,b)},
k9(a,b){return J.o2(a).E(a,b)},
jo(a,b){return J.cj(a).O(a,b)},
K(a){return J.bK(a).gF(a)},
a_(a){return J.cj(a).gt(a)},
bp(a){return J.j3(a).gn(a)},
dI(a){return J.bK(a).gD(a)},
lC(a,b){return J.o3(a).cj(a,b)},
bO(a){return J.bK(a).i(a)},
e3:function e3(){},
e5:function e5(){},
cD:function cD(){},
cF:function cF(){},
bg:function bg(){},
el:function el(){},
by:function by(){},
bf:function bf(){},
cE:function cE(){},
cG:function cG(){},
r:function r(a){this.$ti=a},
e4:function e4(){},
h1:function h1(a){this.$ti=a},
cm:function cm(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bY:function bY(){},
cC:function cC(){},
e6:function e6(){},
be:function be(){}},A={ju:function ju(){},
km(a){return new A.cH("Field '"+a+"' has been assigned during initialization.")},
lY(a){return new A.cH("Field '"+a+"' has not been initialized.")},
Y(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
eE(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
bI(a,b,c){return a},
k0(a){var s,r
for(s=$.at.length,r=0;r<s;++r)if(a===$.at[r])return!0
return!1},
hR(a,b,c,d){A.hC(b,"start")
if(c!=null){A.hC(c,"end")
if(b>c)A.m(A.aM(b,0,c,"start",null))}return new A.d6(a,b,c,d.h("d6<0>"))},
jr(){return new A.c7("No element")},
ki(){return new A.c7("Too many elements")},
ca:function ca(){},
cp:function cp(a,b){this.a=a
this.$ti=b},
dc:function dc(){},
cq:function cq(a,b){this.a=a
this.$ti=b},
cH:function cH(a){this.a=a},
hQ:function hQ(){},
aw:function aw(){},
O:function O(){},
d6:function d6(a,b,c,d){var _=this
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
cL:function cL(a,b,c){this.a=a
this.b=b
this.$ti=c},
cM:function cM(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
ae:function ae(a,b,c){this.a=a
this.b=b
this.$ti=c},
Z:function Z(a,b,c){this.a=a
this.b=b
this.$ti=c},
F:function F(a,b,c){this.a=a
this.b=b
this.$ti=c},
ab:function ab(){},
d2:function d2(a,b){this.a=a
this.$ti=b},
dC:function dC(){},
kg(a,b,c){var s,r,q,p,o,n,m,l=A.u(a),k=A.h5(new A.aZ(a,l.h("aZ<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.A)(k),++i,p=o){r=k[i]
c.a(a.q(0,r))
o=p+1
q[r]=p}n=A.h5(new A.b0(a,l.h("b0<2>")),!0,c)
m=new A.M(q,n,b.h("@<0>").H(c).h("M<1,2>"))
m.$keys=k
return m}return new A.cu(A.m0(a,b,c),b.h("@<0>").H(c).h("cu<1,2>"))},
lK(){throw A.c(A.c9("Cannot modify constant Set"))},
lo(a){var s=A.ln(a)
if(s!=null)return s
return"minified:"+a},
oa(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
o(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bO(a)
return s},
en(a){var s,r=$.ku
if(r==null)r=$.ku=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
mf(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.h(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
eo(a){var s,r,q,p
if(a instanceof A.w)return A.as(A.bL(a),null)
s=J.bK(a)
if(s===B.bH||s===B.bJ||t.ak.b(a)){r=B.ai(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.as(A.bL(a),null)},
kv(a){var s,r,q
if(a==null||typeof a=="number"||A.jQ(a))return J.bO(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bb)return a.i(0)
if(a instanceof A.b9)return a.bO(!0)
s=$.lB()
for(r=0;r<1;++r){q=s[r].dU(a)
if(q!=null)return q}return"Instance of '"+A.eo(a)+"'"},
c1(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
me(a){var s=A.c1(a).getUTCFullYear()+0
return s},
mc(a){var s=A.c1(a).getUTCMonth()+1
return s},
m8(a){var s=A.c1(a).getUTCDate()+0
return s},
m9(a){var s=A.c1(a).getUTCHours()+0
return s},
mb(a){var s=A.c1(a).getUTCMinutes()+0
return s},
md(a){var s=A.c1(a).getUTCSeconds()+0
return s},
ma(a){var s=A.c1(a).getUTCMilliseconds()+0
return s},
m7(a){var s=a.$thrownJsError
if(s==null)return null
return A.ck(s)},
kw(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.R(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
h(a,b){if(a==null)J.bp(a)
throw A.c(A.j1(a,b))},
j1(a,b){var s,r="index"
if(!A.l6(b))return new A.aJ(!0,b,r,null)
s=A.a(J.bp(a))
if(b<0||b>=s)return A.h0(b,s,a,r)
return new A.cY(null,null,!0,b,r,"Value not in range")},
nP(a){return new A.aJ(!0,a,null,null)},
dG(a){return a},
c(a){return A.R(a,new Error())},
R(a,b){var s
if(a==null)a=new A.b5()
b.dartException=a
s=A.om
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
om(){return J.bO(this.dartException)},
m(a,b){throw A.R(a,b==null?new Error():b)},
bo(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.m(A.nd(a,b,c),s)},
nd(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.d9("'"+s+"': Cannot "+o+" "+l+k+n)},
A(a){throw A.c(A.av(a))},
b6(a){var s,r,q,p,o,n
a=A.of(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.e([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.hW(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
hX(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
kB(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jv(a,b){var s=b==null,r=s?null:b.method
return new A.e7(a,r,s?null:b.receiver)},
bN(a){var s
if(a==null)return new A.hi(a)
if(a instanceof A.cy){s=a.a
return A.bn(a,s==null?A.dD(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bn(a,a.dartException)
return A.nO(a)},
bn(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
nO(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.i.cZ(r,16)&8191)===10)switch(q){case 438:return A.bn(a,A.jv(A.o(s)+" (Error "+q+")",null))
case 445:case 5007:A.o(s)
return A.bn(a,new A.cT())}}if(a instanceof TypeError){p=$.lr()
o=$.ls()
n=$.lt()
m=$.lu()
l=$.lx()
k=$.ly()
j=$.lw()
$.lv()
i=$.lA()
h=$.lz()
g=p.X(s)
if(g!=null)return A.bn(a,A.jv(A.aS(s),g))
else{g=o.X(s)
if(g!=null){g.method="call"
return A.bn(a,A.jv(A.aS(s),g))}else if(n.X(s)!=null||m.X(s)!=null||l.X(s)!=null||k.X(s)!=null||j.X(s)!=null||m.X(s)!=null||i.X(s)!=null||h.X(s)!=null){A.aS(s)
return A.bn(a,new A.cT())}}return A.bn(a,new A.eJ(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.d5()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bn(a,new A.aJ(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.d5()
return a},
ck(a){var s
if(a instanceof A.cy)return a.b
if(a==null)return new A.dr(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.dr(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
jd(a){if(a==null)return J.K(a)
if(typeof a=="object")return A.en(a)
return J.K(a)},
o0(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.C(0,a[s],a[r])}return b},
o1(a,b){var s,r=a.length
for(s=0;s<r;++s)b.j(0,a[s])
return b},
nq(a,b,c,d,e,f){t.Z.a(a)
switch(A.a(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.c(new A.i9("Unsupported number of arguments for wrapped closure"))},
ch(a,b){var s=a.$identity
if(!!s)return s
s=A.nW(a,b)
a.$identity=s
return s},
nW(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.nq)},
lJ(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.eC().constructor.prototype):Object.create(new A.bR(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.kf(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.lF(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.kf(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
lF(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.c("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.lD)}throw A.c("Error in functionType of tearoff")},
lG(a,b,c,d){var s=A.kd
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
kf(a,b,c,d){if(c)return A.lI(a,b,d)
return A.lG(b.length,d,a,b)},
lH(a,b,c,d){var s=A.kd,r=A.lE
switch(b?-1:a){case 0:throw A.c(new A.et("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
lI(a,b,c){var s,r
if($.kb==null)$.kb=A.ka("interceptor")
if($.kc==null)$.kc=A.ka("receiver")
s=b.length
r=A.lH(s,c,a,b)
return r},
jW(a){return A.lJ(a)},
lD(a,b){return A.dw(v.typeUniverse,A.bL(a.a),b)},
kd(a){return a.a},
lE(a){return a.b},
ka(a){var s,r,q,p=new A.bR("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.c(A.j("Field name "+a+" not found.",null))},
j4(a){return v.getIsolateTag(a)},
ll(){return v.G},
oc(a){var s,r,q,p,o,n=A.aS($.li.$1(a)),m=$.j2[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.j8[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bF($.le.$2(a,n))
if(q!=null){m=$.j2[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.j8[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jc(s)
$.j2[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.j8[n]=s
return s}if(p==="-"){o=A.jc(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.lj(a,s)
if(p==="*")throw A.c(A.kC(n))
if(v.leafTags[n]===true){o=A.jc(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.lj(a,s)},
lj(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.k1(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jc(a){return J.k1(a,!1,null,!!a.$iaj)},
od(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jc(s)
else return J.k1(s,c,null,null)},
o6(){if(!0===$.k_)return
$.k_=!0
A.o7()},
o7(){var s,r,q,p,o,n,m,l
$.j2=Object.create(null)
$.j8=Object.create(null)
A.o5()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.lk.$1(o)
if(n!=null){m=A.od(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
o5(){var s,r,q,p,o,n,m=B.b5()
m=A.cg(B.b6,A.cg(B.b7,A.cg(B.aj,A.cg(B.aj,A.cg(B.b8,A.cg(B.b9,A.cg(B.ba(B.ai),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.li=new A.j5(p)
$.le=new A.j6(o)
$.lk=new A.j7(n)},
cg(a,b){return a(b)||b},
nX(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
ok(a,b,c){var s=a.indexOf(b,c)
return s>=0},
of(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
af:function af(a,b){this.a=a
this.b=b},
dm:function dm(a,b){this.a=a
this.b=b},
dn:function dn(a,b){this.a=a
this.b=b},
cu:function cu(a,b){this.a=a
this.$ti=b},
ct:function ct(){},
M:function M(a,b,c){this.a=a
this.b=b
this.$ti=c},
bB:function bB(a,b){this.a=a
this.$ti=b},
bC:function bC(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cv:function cv(){},
aK:function aK(a,b,c){this.a=a
this.b=b
this.$ti=c},
d3:function d3(){},
hW:function hW(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cT:function cT(){},
e7:function e7(a,b,c){this.a=a
this.b=b
this.c=c},
eJ:function eJ(a){this.a=a},
hi:function hi(a){this.a=a},
cy:function cy(a,b){this.a=a
this.b=b},
dr:function dr(a){this.a=a
this.b=null},
bb:function bb(){},
dO:function dO(){},
dP:function dP(){},
eF:function eF(){},
eC:function eC(){},
bR:function bR(a,b){this.a=a
this.b=b},
et:function et(a){this.a=a},
aX:function aX(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h2:function h2(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
aZ:function aZ(a,b){this.a=a
this.$ti=b},
cJ:function cJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b0:function b0(a,b){this.a=a
this.$ti=b},
b_:function b_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aY:function aY(a,b){this.a=a
this.$ti=b},
cI:function cI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
j5:function j5(a){this.a=a},
j6:function j6(a){this.a=a},
j7:function j7(a){this.a=a},
b9:function b9(){},
bk:function bk(){},
p(a){return a},
ej(a){return new Uint8Array(A.p(a))},
bG(a,b,c){if(a>>>0!==a||a>=c)throw A.c(A.j1(b,a))},
c_:function c_(){},
cR:function cR(){},
eb:function eb(){},
a1:function a1(){},
cP:function cP(){},
cQ:function cQ(){},
cO:function cO(){},
ec:function ec(){},
ed:function ed(){},
ee:function ee(){},
ef:function ef(){},
eg:function eg(){},
eh:function eh(){},
cS:function cS(){},
ei:function ei(){},
dh:function dh(){},
di:function di(){},
dj:function dj(){},
dk:function dk(){},
jB(a,b){var s=b.c
return s==null?b.c=A.du(a,"bs",[b.x]):s},
kx(a){var s=a.w
if(s===6||s===7)return A.kx(a.x)
return s===11||s===12},
mp(a){return a.as},
bJ(a){return A.iw(v.typeUniverse,a,!1)},
bH(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bH(a1,s,a3,a4)
if(r===s)return a2
return A.kU(a1,r,!0)
case 7:s=a2.x
r=A.bH(a1,s,a3,a4)
if(r===s)return a2
return A.kT(a1,r,!0)
case 8:q=a2.y
p=A.cf(a1,q,a3,a4)
if(p===q)return a2
return A.du(a1,a2.x,p)
case 9:o=a2.x
n=A.bH(a1,o,a3,a4)
m=a2.y
l=A.cf(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jJ(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.cf(a1,j,a3,a4)
if(i===j)return a2
return A.kV(a1,k,i)
case 11:h=a2.x
g=A.bH(a1,h,a3,a4)
f=a2.y
e=A.nL(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.kS(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.cf(a1,d,a3,a4)
o=a2.x
n=A.bH(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jK(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.c(A.dK("Attempted to substitute unexpected RTI kind "+a0))}},
cf(a,b,c,d){var s,r,q,p,o=b.length,n=A.ix(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bH(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
nM(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.ix(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bH(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
nL(a,b,c,d){var s,r=b.a,q=A.cf(a,r,c,d),p=b.b,o=A.cf(a,p,c,d),n=b.c,m=A.nM(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.f1()
s.a=q
s.b=o
s.c=m
return s},
e(a,b){a[v.arrayRti]=b
return a},
jX(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.o4(s)
return a.$S()}return null},
o8(a,b){var s
if(A.kx(b))if(a instanceof A.bb){s=A.jX(a)
if(s!=null)return s}return A.bL(a)},
bL(a){if(a instanceof A.w)return A.u(a)
if(Array.isArray(a))return A.H(a)
return A.jP(J.bK(a))},
H(a){var s=a[v.arrayRti],r=t.r
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
u(a){var s=a.$ti
return s!=null?s:A.jP(a)},
jP(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.nm(a,s)},
nm(a,b){var s=a instanceof A.bb?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.n3(v.typeUniverse,s.name)
b.$ccache=r
return r},
o4(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iw(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
jZ(a){return A.aT(A.u(a))},
jU(a){var s
if(a instanceof A.b9)return a.bz()
s=a instanceof A.bb?A.jX(a):null
if(s!=null)return s
if(t.dm.b(a))return J.dI(a).a
if(Array.isArray(a))return A.H(a)
return A.bL(a)},
aT(a){var s=a.r
return s==null?a.r=new A.iv(a):s},
o_(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.h(q,0)
s=A.dw(v.typeUniverse,A.jU(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.h(q,r)
s=A.kX(v.typeUniverse,s,A.jU(q[r]))}return A.dw(v.typeUniverse,s,a)},
aB(a){return A.aT(A.iw(v.typeUniverse,a,!1))},
nl(a){var s=this
s.b=A.nJ(s)
return s.b(a)},
nJ(a){var s,r,q,p,o
if(a===t.K)return A.nw
if(A.bM(a))return A.nA
s=a.w
if(s===6)return A.nj
if(s===1)return A.l8
if(s===7)return A.nr
r=A.nI(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bM)){a.f="$i"+q
if(q==="y")return A.nu
if(a===t.m)return A.nt
return A.nz}}else if(s===10){p=A.nX(a.x,a.y)
o=p==null?A.l8:p
return o==null?A.dD(o):o}return A.nh},
nI(a){if(a.w===8){if(a===t.S)return A.l6
if(a===t.i||a===t.p)return A.nv
if(a===t.N)return A.ny
if(a===t.y)return A.jQ}return null},
nk(a){var s=this,r=A.ng
if(A.bM(s))r=A.n9
else if(s===t.K)r=A.dD
else if(A.cl(s)){r=A.ni
if(s===t.h6)r=A.n8
else if(s===t.dk)r=A.bF
else if(s===t.fQ)r=A.n6
else if(s===t.cg)r=A.l0
else if(s===t.cD)r=A.n7
else if(s===t.bX)r=A.U}else if(s===t.S)r=A.a
else if(s===t.N)r=A.aS
else if(s===t.y)r=A.l_
else if(s===t.p)r=A.fq
else if(s===t.i)r=A.iz
else if(s===t.m)r=A.t
s.a=r
return s.a(a)},
nh(a){var s=this
if(a==null)return A.cl(s)
return A.ob(v.typeUniverse,A.o8(a,s),s)},
nj(a){if(a==null)return!0
return this.x.b(a)},
nz(a){var s,r=this
if(a==null)return A.cl(r)
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bK(a)[s]},
nu(a){var s,r=this
if(a==null)return A.cl(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bK(a)[s]},
nt(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.w)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
l7(a){if(typeof a=="object"){if(a instanceof A.w)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
ng(a){var s=this
if(a==null){if(A.cl(s))return a}else if(s.b(a))return a
throw A.R(A.l1(a,s),new Error())},
ni(a){var s=this
if(a==null||s.b(a))return a
throw A.R(A.l1(a,s),new Error())},
l1(a,b){return new A.ds("TypeError: "+A.kM(a,A.as(b,null)))},
kM(a,b){return A.fF(a)+": type '"+A.as(A.jU(a),null)+"' is not a subtype of type '"+b+"'"},
az(a,b){return new A.ds("TypeError: "+A.kM(a,b))},
nr(a){var s=this
return s.x.b(a)||A.jB(v.typeUniverse,s).b(a)},
nw(a){return a!=null},
dD(a){if(a!=null)return a
throw A.R(A.az(a,"Object"),new Error())},
nA(a){return!0},
n9(a){return a},
l8(a){return!1},
jQ(a){return!0===a||!1===a},
l_(a){if(!0===a)return!0
if(!1===a)return!1
throw A.R(A.az(a,"bool"),new Error())},
n6(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.R(A.az(a,"bool?"),new Error())},
iz(a){if(typeof a=="number")return a
throw A.R(A.az(a,"double"),new Error())},
n7(a){if(typeof a=="number")return a
if(a==null)return a
throw A.R(A.az(a,"double?"),new Error())},
l6(a){return typeof a=="number"&&Math.floor(a)===a},
a(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.R(A.az(a,"int"),new Error())},
n8(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.R(A.az(a,"int?"),new Error())},
nv(a){return typeof a=="number"},
fq(a){if(typeof a=="number")return a
throw A.R(A.az(a,"num"),new Error())},
l0(a){if(typeof a=="number")return a
if(a==null)return a
throw A.R(A.az(a,"num?"),new Error())},
ny(a){return typeof a=="string"},
aS(a){if(typeof a=="string")return a
throw A.R(A.az(a,"String"),new Error())},
bF(a){if(typeof a=="string")return a
if(a==null)return a
throw A.R(A.az(a,"String?"),new Error())},
t(a){if(A.l7(a))return a
throw A.R(A.az(a,"JSObject"),new Error())},
U(a){if(a==null)return a
if(A.l7(a))return a
throw A.R(A.az(a,"JSObject?"),new Error())},
lb(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.as(a[q],b)
return s},
nD(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.lb(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.as(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
l3(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.e([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.b.j(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.h(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.as(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.as(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.as(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.as(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.as(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
as(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.as(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.as(a.x,b)+">"
if(l===8){p=A.nN(a.x)
o=a.y
return o.length>0?p+("<"+A.lb(o,b)+">"):p}if(l===10)return A.nD(a,b)
if(l===11)return A.l3(a,b,null)
if(l===12)return A.l3(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.h(b,n)
return b[n]}return"?"},
nN(a){var s=A.ln(a)
if(s!=null)return s
return"minified:"+a},
n4(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
n3(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iw(a,b,!1)
else if(typeof m=="number"){s=m
r=A.dv(a,5,"#")
q=A.ix(s)
for(p=0;p<s;++p)q[p]=r
o=A.du(a,b,q)
n[b]=o
return o}else return m},
n2(a,b){return A.kY(a.tR,b)},
n1(a,b){return A.kY(a.eT,b)},
iw(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.kW(a,null,b,!1)
r.set(b,s)
return s},
dw(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.kW(a,b,c,!0)
q.set(c,r)
return r},
kX(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jJ(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
kW(a,b,c,d){return A.mU(A.mO(a,b,c,d))},
bm(a,b){b.a=A.nk
b.b=A.nl
return b},
dv(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aG(null,null)
s.w=b
s.as=c
r=A.bm(a,s)
a.eC.set(c,r)
return r},
kU(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.n_(a,b,r,c)
a.eC.set(r,s)
return s},
n_(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bM(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.cl(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.aG(null,null)
q.w=6
q.x=b
q.as=c
return A.bm(a,q)},
kT(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.mY(a,b,r,c)
a.eC.set(r,s)
return s},
mY(a,b,c,d){var s,r
if(d){s=b.w
if(A.bM(b)||b===t.K)return b
else if(s===1)return A.du(a,"bs",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.aG(null,null)
r.w=7
r.x=b
r.as=c
return A.bm(a,r)},
n0(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aG(null,null)
s.w=13
s.x=b
s.as=q
r=A.bm(a,s)
a.eC.set(q,r)
return r},
dt(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
mX(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
du(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.dt(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.aG(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bm(a,r)
a.eC.set(p,q)
return q},
jJ(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.dt(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.aG(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bm(a,o)
a.eC.set(q,n)
return n},
kV(a,b,c){var s,r,q="+"+(b+"("+A.dt(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aG(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bm(a,s)
a.eC.set(q,r)
return r},
kS(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.dt(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.dt(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.mX(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aG(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bm(a,p)
a.eC.set(r,o)
return o},
jK(a,b,c,d){var s,r=b.as+("<"+A.dt(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.mZ(a,b,c,r,d)
a.eC.set(r,s)
return s},
mZ(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.ix(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bH(a,b,r,0)
m=A.cf(a,c,r,0)
return A.jK(a,n,m,c!==m)}}l=new A.aG(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bm(a,l)},
mO(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
mU(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.mQ(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kP(a,r,l,k,!1)
else if(q===46)r=A.kP(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bE(a.u,a.e,k.pop()))
break
case 94:k.push(A.n0(a.u,k.pop()))
break
case 35:k.push(A.dv(a.u,5,"#"))
break
case 64:k.push(A.dv(a.u,2,"@"))
break
case 126:k.push(A.dv(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.mS(a,k)
break
case 38:A.mR(a,k)
break
case 63:p=a.u
k.push(A.kU(p,A.bE(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.kT(p,A.bE(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.mP(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.kQ(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.mV(a.u,a.e,o)
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
return A.bE(a.u,a.e,m)},
mQ(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kP(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.n4(s,o.x)[p]
if(n==null)A.m('No "'+p+'" in "'+A.mp(o)+'"')
d.push(A.dw(s,o,n))}else d.push(p)
return m},
mS(a,b){var s,r=a.u,q=A.kO(a,b),p=b.pop()
if(typeof p=="string")b.push(A.du(r,p,q))
else{s=A.bE(r,a.e,p)
switch(s.w){case 11:b.push(A.jK(r,s,q,a.n))
break
default:b.push(A.jJ(r,s,q))
break}}},
mP(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kO(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bE(p,a.e,o)
q=new A.f1()
q.a=s
q.b=n
q.c=m
b.push(A.kS(p,r,q))
return
case-4:b.push(A.kV(p,b.pop(),s))
return
default:throw A.c(A.dK("Unexpected state under `()`: "+A.o(o)))}},
mR(a,b){var s=b.pop()
if(0===s){b.push(A.dv(a.u,1,"0&"))
return}if(1===s){b.push(A.dv(a.u,4,"1&"))
return}throw A.c(A.dK("Unexpected extended operation "+A.o(s)))},
kO(a,b){var s=b.splice(a.p)
A.kQ(a.u,a.e,s)
a.p=b.pop()
return s},
bE(a,b,c){if(typeof c=="string")return A.du(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.mT(a,b,c)}else return c},
kQ(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bE(a,b,c[s])},
mV(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bE(a,b,c[s])},
mT(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.c(A.dK("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.c(A.dK("Bad index "+c+" for "+b.i(0)))},
ob(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.V(a,b,null,c,null)
r.set(c,s)}return s},
V(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bM(d))return!0
s=b.w
if(s===4)return!0
if(A.bM(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.V(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.V(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.V(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.V(a,b.x,c,d,e))return!1
return A.V(a,A.jB(a,b),c,d,e)}if(s===6)return A.V(a,p,c,d,e)&&A.V(a,b.x,c,d,e)
if(q===7){if(A.V(a,b,c,d.x,e))return!0
return A.V(a,b,c,A.jB(a,d),e)}if(q===6)return A.V(a,b,c,p,e)||A.V(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.gT)return!0
if(q===12){if(b===t.E)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.V(a,j,c,i,e)||!A.V(a,i,e,j,c))return!1}return A.l5(a,b.x,c,d.x,e)}if(q===11){if(b===t.E)return!0
if(p)return!1
return A.l5(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.ns(a,b,c,d,e)}if(o&&q===10)return A.nx(a,b,c,d,e)
return!1},
l5(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.V(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.V(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.V(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.V(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.V(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
ns(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.dw(a,b,r[o])
return A.kZ(a,p,null,c,d.y,e)}return A.kZ(a,b.y,null,c,d.y,e)},
kZ(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.V(a,b[s],d,e[s],f))return!1
return!0},
nx(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.V(a,r[s],c,q[s],e))return!1
return!0},
cl(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.bM(a))if(s!==6)r=s===7&&A.cl(a.x)
return r},
bM(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kY(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
ix(a){return a>0?new Array(a):v.typeUniverse.sEA},
aG:function aG(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
f1:function f1(){this.c=this.b=this.a=null},
iv:function iv(a){this.a=a},
f_:function f_(){},
ds:function ds(a){this.a=a},
mJ(){var s,r,q
if(self.scheduleImmediate!=null)return A.nQ()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.ch(new A.i5(s),1)).observe(r,{childList:true})
return new A.i4(s,r,q)}else if(self.setImmediate!=null)return A.nR()
return A.nS()},
mK(a){self.scheduleImmediate(A.ch(new A.i6(t.M.a(a)),0))},
mL(a){self.setImmediate(A.ch(new A.i7(t.M.a(a)),0))},
mM(a){t.M.a(a)
A.mW(0,a)},
mW(a,b){var s=new A.it()
s.cn(a,b)
return s},
jS(a){return new A.eQ(new A.Q($.J,a.h("Q<0>")),a.h("eQ<0>"))},
jO(a,b){a.$2(0,null)
b.b=!0
return b.a},
jL(a,b){A.na(a,b)},
jN(a,b){b.aU(a)},
jM(a,b){b.aV(A.bN(a),A.ck(a))},
na(a,b){var s,r,q=new A.iA(b),p=new A.iB(b)
if(a instanceof A.Q)a.bL(q,p,t.A)
else{s=t.A
if(a instanceof A.Q)a.c6(q,p,s)
else{r=new A.Q($.J,t.c)
r.a=8
r.c=a
r.bL(q,p,s)}}},
jV(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.J.c3(new A.iW(s),t.H,t.S,t.A)},
kR(a,b,c){return 0},
jq(a){var s
if(t.Q.b(a)){s=a.gar()
if(s!=null)return s}return B.E},
nn(a,b){if($.J===B.o)return null
return null},
no(a,b){if($.J!==B.o)A.nn(a,b)
if(b==null)if(t.Q.b(a)){b=a.gar()
if(b==null){A.kw(a,B.E)
b=B.E}}else b=B.E
else if(t.Q.b(a))A.kw(a,b)
return new A.au(a,b)},
jE(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.mr()
b.aJ(new A.au(new A.aJ(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bC(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aw()
b.au(o.a)
A.cb(b,p)
return}b.a^=2
A.fr(null,null,b.b,t.M.a(new A.ie(o,b)))},
cb(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jT(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.cb(d.a,c)
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
A.jT(j.a,j.b)
return}g=$.J
if(g!==h)$.J=h
else g=null
c=c.c
if((c&15)===8)new A.ij(q,d,n).$0()
else if(o){if((c&1)!==0)new A.ii(q,j).$0()}else if((c&2)!==0)new A.ih(d,q).$0()
if(g!=null)$.J=g
c=q.c
if(c instanceof A.Q){p=q.a.$ti
p=p.h("bs<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.az(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.jE(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.az(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
nE(a,b){var s
if(t.d.b(a))return b.c3(a,t.A,t.K,t.l)
s=t.x
if(s.b(a))return s.a(a)
throw A.c(A.aC(a,"onError",u.c))},
nC(){var s,r
for(s=$.ce;s!=null;s=$.ce){$.dF=null
r=s.b
$.ce=r
if(r==null)$.dE=null
s.a.$0()}},
nK(){$.jR=!0
try{A.nC()}finally{$.dF=null
$.jR=!1
if($.ce!=null)$.k8().$1(A.lf())}},
lc(a){var s=new A.eR(a),r=$.dE
if(r==null){$.ce=$.dE=s
if(!$.jR)$.k8().$1(A.lf())}else $.dE=r.b=s},
nH(a){var s,r,q,p=$.ce
if(p==null){A.lc(a)
$.dF=$.dE
return}s=new A.eR(a)
r=$.dF
if(r==null){s.b=p
$.ce=$.dF=s}else{q=r.b
s.b=q
$.dF=r.b=s
if(q==null)$.dE=s}},
oz(a,b){A.bI(a,"stream",t.K)
return new A.fg(b.h("fg<0>"))},
jT(a,b){A.nH(new A.iV(a,b))},
la(a,b,c,d,e){var s,r=$.J
if(r===c)return d.$0()
$.J=c
s=r
try{r=d.$0()
return r}finally{$.J=s}},
nG(a,b,c,d,e,f,g){var s,r=$.J
if(r===c)return d.$1(e)
$.J=c
s=r
try{r=d.$1(e)
return r}finally{$.J=s}},
nF(a,b,c,d,e,f,g,h,i){var s,r=$.J
if(r===c)return d.$2(e,f)
$.J=c
s=r
try{r=d.$2(e,f)
return r}finally{$.J=s}},
fr(a,b,c,d){t.M.a(d)
if(B.o!==c){d=c.d9(d)
d=d}A.lc(d)},
i5:function i5(a){this.a=a},
i4:function i4(a,b,c){this.a=a
this.b=b
this.c=c},
i6:function i6(a){this.a=a},
i7:function i7(a){this.a=a},
it:function it(){},
iu:function iu(a,b){this.a=a
this.b=b},
eQ:function eQ(a,b){this.a=a
this.b=!1
this.$ti=b},
iA:function iA(a){this.a=a},
iB:function iB(a){this.a=a},
iW:function iW(a){this.a=a},
aI:function aI(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aR:function aR(a,b){this.a=a
this.$ti=b},
au:function au(a,b){this.a=a
this.b=b},
eV:function eV(){},
db:function db(a,b){this.a=a
this.$ti=b},
bA:function bA(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
Q:function Q(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
ib:function ib(a,b){this.a=a
this.b=b},
ig:function ig(a,b){this.a=a
this.b=b},
ie:function ie(a,b){this.a=a
this.b=b},
id:function id(a,b){this.a=a
this.b=b},
ic:function ic(a,b){this.a=a
this.b=b},
ij:function ij(a,b,c){this.a=a
this.b=b
this.c=c},
ik:function ik(a,b){this.a=a
this.b=b},
il:function il(a){this.a=a},
ii:function ii(a,b){this.a=a
this.b=b},
ih:function ih(a,b){this.a=a
this.b=b},
eR:function eR(a){this.a=a
this.b=null},
fg:function fg(a){this.$ti=a},
dB:function dB(){},
fa:function fa(){},
iq:function iq(a,b){this.a=a
this.b=b},
iV:function iV(a,b){this.a=a
this.b=b},
kN(a,b){var s=a[b]
return s===a?null:s},
jG(a,b,c){if(c==null)a[b]=a
else a[b]=c},
jF(){var s=Object.create(null)
A.jG(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
lZ(a,b){return new A.aX(a.h("@<0>").H(b).h("aX<1,2>"))},
m_(a,b,c){return b.h("@<0>").H(c).h("kn<1,2>").a(A.o0(a,new A.aX(b.h("@<0>").H(c).h("aX<1,2>"))))},
b1(a,b){return new A.aX(a.h("@<0>").H(b).h("aX<1,2>"))},
jw(a){return new A.aH(a.h("aH<0>"))},
ak(a){return new A.aH(a.h("aH<0>"))},
cK(a,b){return b.h("ko<0>").a(A.o1(a,new A.aH(b.h("aH<0>"))))},
jI(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
jH(a,b,c){var s=new A.bD(a,b,c.h("bD<0>"))
s.c=a.e
return s},
m0(a,b,c){var s=A.lZ(b,c)
a.al(0,new A.h3(s,b,c))
return s},
m1(a,b){var s,r,q=A.jw(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r)q.j(0,b.a(a[r]))
return q},
jx(a,b){var s=A.jw(b)
s.N(0,a)
return s},
h7(a){var s,r
if(A.k0(a))return"{...}"
s=new A.eD("")
try{r={}
B.b.j($.at,a)
s.a+="{"
r.a=!0
a.al(0,new A.h8(r,s))
s.a+="}"}finally{if(0>=$.at.length)return A.h($.at,-1)
$.at.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
n5(){throw A.c(A.c9("Cannot change an unmodifiable set"))},
dd:function dd(){},
dg:function dg(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
de:function de(a,b){this.a=a
this.$ti=b},
df:function df(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aH:function aH(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
f4:function f4(a){this.a=a
this.c=this.b=null},
bD:function bD(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
h3:function h3(a,b,c){this.a=a
this.b=b
this.c=c},
D:function D(){},
bu:function bu(){},
h8:function h8(a,b){this.a=a
this.b=b},
dx:function dx(){},
bZ:function bZ(){},
d7:function d7(){},
b4:function b4(){},
dp:function dp(){},
fj:function fj(){},
d8:function d8(a,b){this.a=a
this.$ti=b},
cd:function cd(){},
dy:function dy(){},
o9(a){var s=A.mf(a,null)
if(s!=null)return s
throw A.c(new A.fM(a))},
lO(a,b){a=A.R(a,new Error())
if(a==null)a=A.dD(a)
a.stack=b.i(0)
throw a},
h4(a,b,c,d){var s,r=c?J.kk(a,d):J.kj(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
h5(a,b,c){var s,r=A.e([],c.h("r<0>"))
for(s=J.a_(a);s.k();)B.b.j(r,c.a(s.gm()))
if(b)return r
r.$flags=1
return r},
ax(a,b){var s,r
if(Array.isArray(a))return A.e(a.slice(0),b.h("r<0>"))
s=A.e([],b.h("r<0>"))
for(r=J.a_(a);r.k();)B.b.j(s,r.gm())
return s},
h6(a,b){var s=A.h5(a,!1,b)
s.$flags=3
return s},
kz(a,b,c){var s=J.a_(b)
if(!s.k())return a
if(c.length===0){do a+=A.o(s.gm())
while(s.k())}else{a+=A.o(s.gm())
while(s.k())a=a+c+A.o(s.gm())}return a},
mr(){return A.ck(new Error())},
lL(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
kh(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
dR(a){if(a>=10)return""+a
return"0"+a},
fF(a){if(typeof a=="number"||A.jQ(a)||a==null)return J.bO(a)
if(typeof a=="string")return JSON.stringify(a)
return A.kv(a)},
lP(a,b){A.bI(a,"error",t.K)
A.bI(b,"stackTrace",t.l)
A.lO(a,b)},
dK(a){return new A.dJ(a)},
j(a,b){return new A.aJ(!1,null,b,a)},
aC(a,b,c){return new A.aJ(!0,a,b,c)},
aM(a,b,c,d,e){return new A.cY(b,c,!0,a,d,"Invalid value")},
mi(a,b,c){if(0>a||a>c)throw A.c(A.aM(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.c(A.aM(b,a,c,"end",null))
return b}return c},
hC(a,b){if(a<0)throw A.c(A.aM(a,0,null,b,null))
return a},
h0(a,b,c,d){return new A.e2(b,!0,a,d,"Index out of range")},
c9(a){return new A.d9(a)},
kC(a){return new A.eI(a)},
l(a){return new A.c7(a)},
av(a){return new A.dQ(a)},
lW(a,b,c){var s,r
if(A.k0(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.e([],t.s)
B.b.j($.at,a)
try{A.nB(a,s)}finally{if(0>=$.at.length)return A.h($.at,-1)
$.at.pop()}r=A.kz(b,t.hf.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
js(a,b,c){var s,r
if(A.k0(a))return b+"..."+c
s=new A.eD(b)
B.b.j($.at,a)
try{r=s
r.a=A.kz(r.a,a,", ")}finally{if(0>=$.at.length)return A.h($.at,-1)
$.at.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
nB(a,b){var s,r,q,p,o,n,m,l=a.gt(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.o(l.gm())
B.b.j(b,s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
if(0>=b.length)return A.h(b,-1)
r=b.pop()
if(0>=b.length)return A.h(b,-1)
q=b.pop()}else{p=l.gm();++j
if(!l.k()){if(j<=4){B.b.j(b,A.o(p))
return}r=A.o(p)
if(0>=b.length)return A.h(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gm();++j
for(;l.k();p=o,o=n){n=l.gm();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.h(b,-1)
k-=b.pop().length+2;--j}B.b.j(b,"...")
return}}q=A.o(p)
r=A.o(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.h(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.j(b,m)
B.b.j(b,q)
B.b.j(b,r)},
c0(a,b,c,d,e,f){var s
if(B.h===c){s=J.K(a)
b=J.K(b)
return A.eE(A.Y(A.Y($.dH(),s),b))}if(B.h===d){s=J.K(a)
b=J.K(b)
c=J.K(c)
return A.eE(A.Y(A.Y(A.Y($.dH(),s),b),c))}if(B.h===e){s=J.K(a)
b=J.K(b)
c=J.K(c)
d=J.K(d)
return A.eE(A.Y(A.Y(A.Y(A.Y($.dH(),s),b),c),d))}if(B.h===f){s=J.K(a)
b=J.K(b)
c=J.K(c)
d=J.K(d)
e=J.K(e)
return A.eE(A.Y(A.Y(A.Y(A.Y(A.Y($.dH(),s),b),c),d),e))}s=J.K(a)
b=J.K(b)
c=J.K(c)
d=J.K(d)
e=J.K(e)
f=J.K(f)
f=A.eE(A.Y(A.Y(A.Y(A.Y(A.Y(A.Y($.dH(),s),b),c),d),e),f))
return f},
bq:function bq(a,b,c){this.a=a
this.b=b
this.c=c},
i8:function i8(){},
I:function I(){},
dJ:function dJ(a){this.a=a},
b5:function b5(){},
aJ:function aJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cY:function cY(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
e2:function e2(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
d9:function d9(a){this.a=a},
eI:function eI(a){this.a=a},
c7:function c7(a){this.a=a},
dQ:function dQ(a){this.a=a},
d5:function d5(){},
i9:function i9(a){this.a=a},
fM:function fM(a){this.a=a},
k:function k(){},
a4:function a4(a,b,c){this.a=a
this.b=b
this.$ti=c},
W:function W(){},
w:function w(){},
fh:function fh(){},
eD:function eD(a){this.a=a},
hh:function hh(a){this.a=a},
aA(a){var s
if(typeof a=="function")throw A.c(A.j("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.nb,a)
s[$.k2()]=a
return s},
nb(a,b,c){t.Z.a(a)
if(A.a(c)>=1)return a.$1(b)
return a.$0()},
lh(a,b,c){return c.a(a[b])},
l4(a,b){return a[b]},
a8(a,b,c,d){return d.a(a[b].apply(a,c))},
oe(a,b){var s=new A.Q($.J,b.h("Q<0>")),r=new A.db(s,b.h("db<0>"))
a.then(A.ch(new A.je(r,b),1),A.ch(new A.jf(r),1))
return s},
l9(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
ci(a){if(A.l9(a))return a
return new A.j_(new A.dg(t.hg)).$1(a)},
je:function je(a,b){this.a=a
this.b=b},
jf:function jf(a){this.a=a},
j_:function j_(a){this.a=a},
hD:function hD(a){this.z=a},
c3:function c3(a,b){this.a=a
this.b=b},
an:function an(a,b){this.a=a
this.b=b},
fy:function fy(a,b){this.a=a
this.b=b},
fz:function fz(){this.a=null
this.d=0},
c8:function c8(a,b){this.a=a
this.b=b},
cV:function cV(a,b,c,d){var _=this
_.a=a
_.e=b
_.f=c
_.fr=d},
ke(a,b,c,d,e,f,g){var s,r,q,p
if(!d.gG(0)||d.ga_()<1e-12)throw A.c(A.j("CameraView.look requires a finite, nonzero forward: "+d.i(0),null))
if(!isFinite(e)||e<=0||e>=3.141592653589793)throw A.c(A.j("CameraView.look requires 0 < fovYRadians < pi: "+e,null))
s=d.gS()
if(g.a3(s).ga_()<1e-12)throw A.c(A.j("CameraView.look requires up ("+g.i(0)+") not parallel to forward ("+d.i(0)+")",null))
r=A.kq(b,s,g)
q=A.kr(a,c,e,f)
p=new A.co(r,q,q.B(0,r),b,s,f,c,a)
p.v()
return p},
co:function co(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=_.x=$},
cz:function cz(a,b,c,d,e){var _=this
_.a=a
_.fx=b
_.fy=c
_.go=d
_.id=e},
fO:function fO(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=f},
fP:function fP(){this.b=this.a=0},
bc(a,b){return new A.h_(a,b)},
b3:function b3(){},
am:function am(a,b,c){this.a=a
this.b=b
this.c=c},
ap:function ap(a,b,c){this.a=a
this.b=b
this.c=c},
aL:function aL(a,b,c){this.a=a
this.b=b
this.c=c},
ek:function ek(a,b,c){this.a=a
this.b=b
this.c=c},
bd:function bd(a,b,c){this.a=a
this.b=b
this.c=c},
bX:function bX(a,b){this.a=a
this.b=b},
h_:function h_(a,b){this.a=a
this.b=b},
iX(a,b,c,d){return A.nU(a,b,c,d)},
nU(a,b,a0,a1){var s=0,r=A.jS(t.fW),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c
var $async$iX=A.jV(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:d=b.length
if(d===0)throw A.c(A.j("bootstrapRenderer requires a non-empty profile ladder",null))
a1.v()
n=A.e([],t.eT)
m=0
i=d-1
h=t.eD
case 3:g=m
if(typeof g!=="number"){q=g.aE()
s=1
break}if(!(g<d)){s=4
break}l=B.b.q(b,m)
k=a.$1(l)
if(k.a!==l)throw A.c(A.j("configurationFor("+l.a.b+") returned a configuration for "+k.a.a.b+". The mapping must be total and faithful, or the renderer runs a graph the host did not choose.",null))
p=6
s=9
return A.jL(a0.dl(k,a1),$async$iX)
case 9:J.ft(n,new A.c2(l,null))
f=A.h5(n,!1,h)
f.$flags=3
g=new A.dM()
q=g
s=1
break
p=2
s=8
break
case 6:p=5
c=o.pop()
j=A.bN(c)
J.ft(n,new A.c2(l,j))
if(J.aV(m,i))throw c
s=8
break
case 5:s=2
break
case 8:g=m
if(typeof g!=="number"){q=g.T()
s=1
break}m=g+1
s=3
break
case 4:throw A.c(A.l("bootstrapRenderer exhausted its ladder without a result"))
case 1:return A.jN(q,r)
case 2:return A.jM(o.at(-1),r)}})
return A.jO($async$iX,r)},
nZ(a){var s,r,q=B.b.b5(B.X,new A.j0(a))
if(q>=0)return A.h6(B.b.ci(B.X,q),t.W)
s=t.W
r=A.cK([a],s)
r.N(0,B.X)
return A.h6(r,s)},
c2:function c2(a,b){this.a=a
this.b=b},
dM:function dM(){},
j0:function j0(a){this.a=a},
og(a,b,c,d){var s,r,q,p,o,n,m=A.e([],t.cw)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.b.j(m,new A.dm(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.b.a6(m,new A.jg())
s=A.e([],t.w)
for(r=A.hR(m,0,A.bI(b,"count",t.S),t.fk),q=r.$ti,r=new A.ad(r,r.gn(0),q.h("ad<O.E>")),q=q.h("O.E");r.k();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
ac:function ac(a,b,c){this.a=a
this.b=b
this.c=c},
dU:function dU(a,b,c){this.a=a
this.b=b
this.c=c},
bw:function bw(a,b,c,d){var _=this
_.b=a
_.c=b
_.d=c
_.e=d},
ai:function ai(){},
jg:function jg(){},
e8(a,b){if(!isFinite(b)||b<0||b>1)throw A.c(A.j("MaterialDefinition."+a+" must be in [0, 1]: "+A.o(b),null))},
fu:function fu(a,b){this.a=a
this.b=b},
e9:function e9(a,b){this.a=a
this.b=b},
aF:function aF(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.d=b
_.e=c
_.f=d
_.at=e
_.ax=f
_.ch=g
_.CW=h},
m3(a){A:{break A}return a},
b8:function b8(a,b){this.a=a
this.b=b},
a6:function a6(a,b,c){this.a=a
this.b=b
this.c=c},
hY:function hY(){},
hZ:function hZ(){},
bh:function bh(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hb:function hb(){},
hc:function hc(){},
hd:function hd(){},
fD:function fD(){},
hl(a){var s,r,q="volumetric",p=t.N,o=A.cK(["sceneColor","present"],p),n=a.a.b
if(n.p(0,"shadows"))o.N(0,A.cK(["shadowMap","sceneDepth"],p))
if(n.p(0,q)){o.j(0,"volumetricLight")
o.j(0,"sceneColor#"+(a.d>1?2:1))}if(n.p(0,"ssao"))o.N(0,A.cK(["ssaoRaw","ssaoBlurred"],p))
if(n.p(0,"bloom")){if(a.d>1)s=n.p(0,q)?3:2
else s=n.p(0,q)?2:1
o.N(0,A.cK(["bloomBlurH","bloomBlurV","sceneColor#"+s],p))}if(a.d>1)o.j(0,"sceneColor#1")
if(n.p(0,"dof"))o.N(0,A.cK(["dofBlurH","dofBlurV","dofOutput"],p))
if(n.p(0,"grade"))o.j(0,"gradeOutput")
if(n.p(0,"ps1"))o.j(0,"ps1Output")
r=n.p(0,"vhs")
if(r)o.j(0,"vhsOutput")
return new A.hk(new A.d8(A.jx(o,p),t.am),r)},
hk:function hk(a,b){this.a=a
this.b=b},
hm:function hm(){},
hz:function hz(a){this.b=a},
es:function es(){this.a=null
this.c=0
this.d=!1},
cx:function cx(a,b){this.a=a
this.b=b},
fw:function fw(a,b){this.a=a
this.b=b},
c5:function c5(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=i},
kA(a,b,c,d,e){var s,r
if(!isFinite(c)||c<=0)throw A.c(A.j("SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: "+A.o(c),null))
if(!isFinite(d)||d<=0)throw A.c(A.j("SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: "+A.o(d),null))
s=c>d?d:c
r=new A.hS(b,a,B.n.c5(b*s),B.n.c5(a*s),s,!0)
r.v()
return r},
hS:function hS(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fx:function fx(a,b){this.a=a
this.b=b},
d_:function d_(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
c4:function c4(a,b){this.a=a
this.b=b},
P:function P(a,b,c){this.a=a
this.b=b
this.d=c},
fQ:function fQ(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f},
m2(){return new A.ea(new A.aN(new A.ha(),A.e([],t.ha),A.e([],t.t),t.ex))},
ea:function ea(a){this.a=a},
ha:function ha(){},
ld(a){var s=4
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
case 3:s=A.m(A.c9("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
nc(a,b,c){var s,r,q
for(s=0,r=0;r<7;++r){q=B.y[r]
if(A.ld(q.a)===b)s+=q.c}return s},
m4(a){return new A.he(a,new A.aN(new A.hf(),A.e([],t.c9),A.e([],t.t),t.cE),A.b1(t.S,t.bw))},
ks(a){var s
A:{s=a.byteLength
break A}return s},
eK:function eK(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
he:function he(a,b,c){this.a=a
this.b=b
this.c=c},
hf:function hf(){},
hg:function hg(){},
ms(a){var s=new A.eG(a,new A.aN(new A.hT(),A.e([],t.fq),A.e([],t.t),t.g2),A.b1(t.S,t.j))
s.d=s.U($.k7())
s.e=s.U($.k4())
s.f=s.U($.k5())
s.r=s.U($.k3())
s.w=s.U($.k6())
return s},
eG:function eG(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
hT:function hT(){},
hV:function hV(){},
hU:function hU(){},
oh(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b.gG(0)
if(!i)throw A.c(A.j("invalid volumetric source selection inputs",null))
s=A.ak(t.N)
r=A.e([],t.gg)
for(q=0;!1;++q){p=c[q]
p.v()
if(!s.j(0,p.gA()))throw A.c(A.j("duplicate volumetric source id: "+A.o(p.gA()),null))
o=p.ge3().ag(0,b).length
i=p.ge4()
n=A.mx(p.gdZ(),o,i)
i=p.gbT().ge7()
m=p.gbT().ge8()
l=p.gbT().ge9()
l=Math.max(A.dG(m),A.dG(l))
k=Math.max(A.dG(i),l)
B.b.j(r,new A.dn(p.ge1().B(0,k).B(0,n),p))}B.b.a6(r,new A.jh())
i=A.e([],t.q)
for(m=A.hR(r,0,A.bI(a,"count",t.S),t.eS),l=m.$ti,m=new A.ad(m,m.gn(0),l.h("ad<O.E>")),l=l.h("O.E");m.k();){j=m.d
i.push((j==null?l.a(j):j).b)}return i},
mx(a,b,c){var s,r,q,p,o,n
for(s=[new A.af("distance",b),new A.af("referenceDistance",c),new A.af("cutoffDistance",a)],r=0;r<3;++r){q=s[r]
p=q.b
if(!isFinite(p))A.m(A.j(q.a+" must be finite: "+A.o(p),null))}if(b.aE(0,0)||c.cd(0,0)||a.cd(0,0))throw A.c(A.j("invalid inverse-square attenuation inputs",null))
if(b.cc(0,a))return 0
s=c.B(0,c)
q=c.B(0,c)
o=b.B(0,b)
n=s.cb(0,Math.max(A.dG(q),A.dG(o)))
o=b.cb(0,a)
A.dG(o)
return n.B(0,1-Math.pow(o,4)).ai(0,0,1).e5(0)},
jh:function jh(){},
hj:function hj(a,b){var _=this
_.a=a
_.b=5
_.c=0
_.d=0.3
_.as=0
_.at=0.3
_.ax=5
_.ay=b},
nT(a){var s,r,q,p,o=A.e([],t.gk)
for(s=a.length,r=t.h,q=0;q<a.length;a.length===s||(0,A.A)(a),++q){p=a[q]
p.gl()
B.b.j(o,new A.bt(p,A.e([p],r)))
continue}return o},
bt:function bt(a,b){this.a=a
this.b=b},
dW:function dW(a){this.a=a},
fI:function fI(){},
fJ:function fJ(a){this.a=a},
fG:function fG(a){this.a=a},
fH:function fH(a){this.a=a},
dX:function dX(a,b){this.a=a
this.b=b},
bV:function bV(a,b){this.a=a
this.b=b},
dY:function dY(a,b){this.a=a
this.b=b
this.c=0},
mN(){return new A.cc()},
fN:function fN(a){this.a=a
this.b=null},
cc:function cc(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
jy(){return!0},
E:function E(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
hn:function hn(){},
ho:function ho(){},
aE:function aE(a,b){this.a=a
this.b=b},
a3:function a3(a,b,c){this.a=a
this.b=b
this.c=c},
eq:function eq(a,b){this.a=a
this.b=b},
aW:function aW(a,b){this.a=a
this.b=b},
L:function L(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
d1:function d1(a,b){this.a=a
this.b=b},
n:function n(a,b){this.a=a
this.b=b},
cs:function cs(a){this.b=a},
hB:function hB(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=_.d=0},
a0:function a0(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hE:function hE(){},
X:function X(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.r=f},
hG:function hG(a,b){this.a=a
this.b=b},
hL:function hL(){},
hK:function hK(){},
hJ:function hJ(){},
hI:function hI(a){this.a=a},
hH:function hH(a,b,c){this.a=a
this.b=b
this.c=c},
hF:function hF(a,b){this.a=a
this.b=b},
mn(a){return new A.cZ(a,new A.aN(new A.hM(),A.e([],t.aO),A.e([],t.t),t.b0))},
f3:function f3(a,b,c){this.a=a
this.b=b
this.c=c},
cZ:function cZ(a,b){this.a=a
this.b=b},
hM:function hM(){},
l2(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.ne(a,r,s,a.x.gm().a.b.a).b},
ne(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.iR(a),j=new A.iS(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.p(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.nV(b,h,B.R,i,s.gdB(),new A.iC(j),new A.iD(j),new A.iE(a),new A.iJ(a),new A.iK(a),new A.iL(j),new A.iM(j),s.gdD(),new A.iN(a),s.gdH(),r.gdF(),k,s.gdJ(),s.gdL(),new A.iO(j,c),new A.iP(j),new A.iQ(j),new A.iF(j),new A.iG(j),new A.iH(a),new A.iI(j),e,f,g,512)}else{p=new A.L(l,B.k,g,f,e,0)
o=new A.L(l,B.k,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.cN(h,p,o):null
k=A.e([new A.eP(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nout vec4 oColor;\nvoid main(){\n  vec3 n=normalize(vNormal);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+\n    vec3(ndotl)*uDirectLightScale,0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.f)
if(n!=null)k.push(n)
k.push(new A.cW(b,u.l,u.b,h,i,B.R))
q=new A.dW(k)}a.r.toString
m=q.dc(B.a3,new A.hE(),!1,new A.f7())
k=m.a.b
if(k.length!==0)throw A.c(A.l("safe renderer graph is invalid: "+A.o(k)))
return new A.ir(q,m)},
nf(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.c(A.l("renderer graph is not initialized"))
s=A.ax(b7.gc_(),t.Y)
for(r=0;r<b9.length;++r){q=b9[r]
p=b6.w.a.b
o=p.$ti
n=o.c.a(q.a)
p.a7(n)
p=p.b
n=n.a
if(!(n>=0&&n<p.length))return A.h(p,n)
n=p[n].c
p=(n==null?o.y[1].a(n):n).d
o=q.c.a0()
p=p.gaW()
n=A.H(p)
B.b.j(s,new A.fi(new A.bd((r|1073741824)>>>0,0,"transient"),q,A.jp(new A.ae(p,n.h("i(1)").a(o.gbf()),n.h("ae<1,i>")))))}p=b8.a
m=A.nY(A.lR(p.c),s,b8.d)
for(o=s.length,l=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gl().a
j=b6.w.a
i=n.a
h=j.c.q(0,i)
if(h==null)A.m(A.bc(B.K,n))
j=j.b
g=j.$ti
j.a7(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.h(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
l+=B.i.Z(n>0?n:h.e,3)}for(s=m.a,o=s.length,f=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gl().a
j=b6.w.a
i=n.a
h=j.c.q(0,i)
if(h==null)A.m(A.bc(B.K,n))
j=j.b
g=j.$ti
j.a7(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.h(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
f+=B.i.Z(n>0?n:h.e,3)}o=t.N
n=A.b1(o,t.a8)
e=new A.fN(n)
e.d8("cull")
j=l-f
d=e.b
if(d==null)A.m(A.l("cull recorded outside an active frame"))
if(j<0)A.m(A.j("cull totals must be non-negative",null))
c=n.q(0,d)
c.c+=j
c.e+=m.b.b
b=A.e([],t.c1)
a=A.e([],t.aM)
for(i=s.length,g=t.k,a0=p.a,a1=t.b,k=0;k<s.length;s.length===i||(0,A.A)(s),++k){a2=s[k]
if(a2.gl().e===B.S)B.b.j(a,new A.S(new A.ag(a0.c8(a2.gl().c.a).c,a2.gA().a),a2,a1))
else B.b.j(b,new A.S(new A.ah(B.cI,a2.gl().b,a2.gl().a,a2.gA().a),a2,g))}a3=new A.f0(A.nT(A.oj(b)),A.oi(a),p,b8.b,b8.c)
a4=new A.dT(b6.a,e)
for(s=b4.b,p=s.length,i=t.do,k=0;k<s.length;s.length===p||(0,A.A)(s),++k){a5=s[k]
g=a5.gl().a
if(g.length===0)A.m(A.aC(g,"passId",null))
e.b=g
n.ba(g,A.lg())
a6=A.b1(o,i)
for(g=a5.gl().c,a0=g.length,a7=0;a7<g.length;g.length===a0||(0,A.A)(g),++a7){a8=g[a7].a
a9=b5.c
if(a9==null)A.m(A.l("GPU resource adapter is not initialized"))
a1=a8.f
b0=a8.a
b1=a1===0?b0:b0+"#"+a1
b2=a9.b.q(0,b1)
if(b2==null)A.m(A.l("resource is not in candidate: "+b1))
b3=new A.bS(b2)
a6.C(0,b0+"#"+a1,b3)
a6.ba(b0,new A.iT(b3))}a5.I(new A.dN(a6,a4,new A.iU(b8,b6).$0(),a3))}return new A.ia(e,m,j)},
er:function er(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.w=f
_.x=!1},
ia:function ia(a,b,c){this.a=a
this.b=b
this.c=c},
fi:function fi(a,b,c){this.a=a
this.b=b
this.c=c},
iR:function iR(a){this.a=a},
iS:function iS(a,b){this.a=a
this.b=b},
iQ:function iQ(a){this.a=a},
iJ:function iJ(a){this.a=a},
iK:function iK(a){this.a=a},
iP:function iP(a){this.a=a},
iE:function iE(a){this.a=a},
iG:function iG(a){this.a=a},
iF:function iF(a){this.a=a},
iO:function iO(a,b){this.a=a
this.b=b},
iC:function iC(a){this.a=a},
iD:function iD(a){this.a=a},
iL:function iL(a){this.a=a},
iM:function iM(a){this.a=a},
iN:function iN(a){this.a=a},
iI:function iI(a){this.a=a},
iH:function iH(a){this.a=a},
iT:function iT(a){this.a=a},
iU:function iU(a,b){this.a=a
this.b=b},
ir:function ir(a,b){this.a=a
this.b=b},
f7:function f7(){},
f0:function f0(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
ev:function ev(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.ax=_.at=_.as=_.Q=_.y=_.x=_.w=_.r=null
_.a$=f
_.b$=g},
hN:function hN(){},
hO:function hO(){},
hP:function hP(){},
f6:function f6(a){this.b=a},
im:function im(){},
fb:function fb(){},
ex:function ex(a,b){this.a=a
this.b=b},
oj(a){var s,r,q=A.ax(a,t.k)
B.b.a6(q,new A.jl())
s=A.H(q)
r=s.h("ae<1,ao>")
s=A.ax(new A.ae(q,s.h("ao(1)").a(new A.jm()),r),r.h("O.E"))
s.$flags=1
return s},
oi(a){var s,r,q=A.ax(a,t.b)
B.b.a6(q,new A.jj())
s=A.H(q)
r=s.h("ae<1,ao>")
s=A.ax(new A.ae(q,s.h("ao(1)").a(new A.jk()),r),r.h("O.E"))
s.$flags=1
return s},
ah:function ah(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ag:function ag(a,b){this.a=a
this.b=b},
S:function S(a,b,c){this.a=a
this.b=b
this.$ti=c},
jl:function jl(){},
jm:function jm(){},
jj:function jj(){},
jk:function jk(){},
nY(a,b,c){var s,r,q,p,o,n,m,l=A.e([],t.h)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.A)(b),++p){o=b[p];++r
if((o.gl().d&c)>>>0===0){++q
continue}n=o.gbg()
m=n.a
if(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)){n=n.b
n=isFinite(n.a)&&isFinite(n.b)&&isFinite(n.c)}else n=!1
if(!n)throw A.c(A.j("cullItems: non-finite world bounds for instance "+o.gA().i(0),null))
if(a.dQ(o.gbg())===B.al){++q
continue}B.b.j(l,o)}return new A.fB(l,new A.fC(q))},
fC:function fC(a){this.b=a},
fB:function fB(a,b){this.a=a
this.b=b},
m6(a){var s,r,q,p
if(a<=0)throw A.c(A.aC(a,"size","must be > 0"))
s=a*0.5
r=new A.dl(A.e([],t.n),A.e([],t.t))
q=new A.hA(r,1)
p=-s
q.$6(new A.i(p,p,s),new A.i(s,p,s),new A.i(s,s,s),new A.i(p,s,s),B.aW,B.C)
q.$6(new A.i(s,p,p),new A.i(p,p,p),new A.i(p,s,p),new A.i(s,s,p),B.aX,B.ag)
q.$6(new A.i(p,s,s),new A.i(s,s,s),new A.i(s,s,p),new A.i(p,s,p),B.l,B.C)
q.$6(new A.i(p,p,p),new A.i(s,p,p),new A.i(s,p,s),new A.i(p,p,s),B.t,B.ag)
q.$6(new A.i(s,p,s),new A.i(s,p,p),new A.i(s,s,p),new A.i(s,s,s),B.C,B.aX)
q.$6(new A.i(p,p,p),new A.i(p,p,s),new A.i(p,s,s),new A.i(p,s,p),B.ag,B.aW)
return r.aT(new A.bP(new A.i(p,p,p),new A.i(s,s,s)))},
mg(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
if(b<=0||a<=0)throw A.c(A.j("dimensions must be > 0",null))
s=A.e([],t.n)
r=t.t
q=A.e([],r)
p=new A.dl(s,q)
o=b*0.5
n=a*0.5
for(s=-o,m=-n,l=0;l<=1;++l){k=l/1
j=m+k*a
for(i=0;i<=1;++i){h=i/1
p.aa(new A.i(s+h*b,0,j),B.l,B.C,new A.aP(h,k))}}for(l=0;l<1;)for(g=l*2,++l,f=l*2,i=0;i<1;++i){e=g+i
d=f+i
c=d+1
B.b.N(q,A.e([e,d,c,e,c,e+1],r))}return p.aT(new A.bP(new A.i(s,0,m),new A.i(o,0,n)))},
mh(a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(a6<=0)throw A.c(A.aC(a6,"radius","must be > 0"))
if(a7<2||a8<3)throw A.c(A.j("invalid ring or sector count",null))
s=A.e([],t.n)
r=t.t
q=A.e([],r)
p=new A.dl(s,q)
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
a=0}p.aa(new A.i(e*a6,s,d*a6),new A.i(e,k,d),new A.i(c,0,a),new A.aP(i,n))}}a0=a8+1
for(o=0;o<a7;)for(s=o*a0,++o,a1=o*a0,j=0;j<a8;++j){a2=s+j
a3=a1+j
a4=a3+1
B.b.N(q,A.e([a2,a2+1,a4,a2,a4,a3],r))}a5=new A.i(a6,a6,a6)
return p.aT(new A.bP(a5.B(0,-1),a5))},
hA:function hA(a,b){this.a=a
this.b=b},
dl:function dl(a,b){this.a=a
this.b=b},
jp(a){var s,r,q,p,o,n,m,l,k,j
for(s=a.$ti,r=new A.ad(a,a.gn(0),s.h("ad<O.E>")),s=s.h("O.E"),q=B.dA,p=B.dE,o=!1;r.k();o=!0){n=r.d
if(n==null)n=s.a(n)
m=n.a
l=Math.min(q.a,m)
k=n.b
j=Math.min(q.b,k)
n=n.c
q=new A.i(l,j,Math.min(q.c,n))
p=new A.i(Math.max(p.a,m),Math.max(p.b,k),Math.max(p.c,n))}if(!o)throw A.c(A.j("Aabb.fromPoints requires at least one point",null))
return new A.bP(q,p)},
bP:function bP(a,b){this.a=a
this.b=b},
lR(a){var s,r,q,p,o,n,m=a.a,l=new A.fS(),k=m.length
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
return new A.fR(A.e([l.$4(s+r,q+p,o+n,m[15]+m[12]),l.$4(m[3]-m[0],m[7]-m[4],m[11]-m[8],m[15]-m[12]),l.$4(m[3]+m[1],m[7]+m[5],m[11]+m[9],m[15]+m[13]),l.$4(m[3]-m[1],m[7]-m[5],m[11]-m[9],m[15]-m[13]),l.$4(m[3]+m[2],m[7]+m[6],m[11]+m[10],m[15]+m[14]),l.$4(m[3]-m[2],m[7]-m[6],m[11]-m[10],m[15]-m[14])],t.dV))},
bv:function bv(a,b){this.a=a
this.b=b},
cA:function cA(a,b){this.a=a
this.b=b},
fR:function fR(a){this.a=a},
fS:function fS(){},
kp(a){if(a.length!==16)throw A.c(A.j("Mat4.fromColumnMajor requires 16 values",null))
return new A.b2(new Float32Array(A.p(a)))},
kr(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.b2(q)},
kq(a,b,c){var s=b.gS(),r=c.a3(s).gS(),q=s.a3(r),p=new Float32Array(16)
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
p[12]=-r.b_(a)
p[13]=-q.b_(a)
p[14]=s.b_(a)
p[15]=1
return new A.b2(p)},
b2:function b2(a){this.a=a},
h9:function h9(){},
jA(a,b){var s=a.gS(),r=b/2,q=Math.sin(r)
return new A.cX(s.a*q,s.b*q,s.c*q,Math.cos(r))},
cX:function cX(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aO:function aO(a,b,c){this.a=a
this.b=b
this.c=c},
aP:function aP(a,b){this.a=a
this.b=b},
i:function i(a,b,c){this.a=a
this.b=b
this.c=c},
eS:function eS(a,b){this.a=a
this.b=b},
cn:function cn(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
eT:function eT(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dL:function dL(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
eU:function eU(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
dS:function dS(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
eW:function eW(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eX:function eX(a,b){this.a=a
this.b=b},
cw:function cw(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
eY:function eY(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dV:function dV(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
eZ:function eZ(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
e1:function e1(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f
_.w=g},
f2:function f2(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
cN:function cN(a,b,c){this.a=a
this.b=b
this.c=c},
f5:function f5(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bS:function bS(a){this.b=a},
dN:function dN(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
a2(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.L(a.a,a.b,b,c,s,r)},
jz:function jz(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var _=this
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
m5(a){var s
switch(a.a){case 0:s=0
break
case 1:s=1
break
case 2:s=2.5
break
case 3:s=3.5
break
default:s=null}return s},
cW:function cW(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
f8:function f8(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ep:function ep(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
f9:function f9(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ky(a){var s=A.kq(B.l,B.t,Math.abs(0)<0.99?B.C:B.l)
return new A.bx(A.kr(1,1,B.i.ai(1,0.1,3),0.05).B(0,s))},
bx:function bx(a){this.a=a},
ey:function ey(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fc:function fc(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
nV(c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3=u.l,b4="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[5]=float[5](0.227027,0.1945946,0.1216216,0.054054,0.016216);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<5;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b5="bloomBlurH",b6="bloomBlurV",b7="dofBlurH",b8="dofBlurV",b9={},c0=c4.b
if(!c0.p(0,"shadows"))throw A.c(A.aC(c4,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=c0.p(0,"ssao")
r=c0.p(0,"bloom")
q=c0.p(0,"dof")
p=c0.p(0,"grade")
o=c0.p(0,"ps1")
n=c0.p(0,"vhs")
m=c0.p(0,"volumetric")
c0=B.i.Z(e9+1,2)
l=B.i.Z(e8+1,2)
k=A.a2(B.a2,e9,e8,e7,b2)
j=A.a2(B.a2.c1(),e9,e8,b2,b2)
i=e7>1
h=A.a2(B.cV,e9,e8,b2,i?2:1)
g=A.a2(B.cU,c0,l,b2,b2)
A.a2(B.d2,e9,e8,b2,b2)
f=A.a2(B.d_,e9,e8,b2,b2)
e=A.a2(B.cT,f0,f0,b2,b2)
d=A.a2(B.cW,c0,l,b2,b2)
c=A.a2(B.cX,c0,l,b2,b2)
b=A.a2(B.d0,c0,l,b2,b2)
a=A.a2(B.d1,c0,l,b2,b2)
a0=$.lp()
a1=i?1:0
a2=A.a2(a0,e9,e8,b2,a1+(m?1:0)+1)
a0=A.a2(B.cQ,c0,l,b2,b2)
a1=A.a2(B.cR,c0,l,b2,b2)
a3=A.a2(B.cS,e9,e8,b2,b2)
a4=A.a2(B.cY,e9,e8,b2,b2)
a5=A.a2(B.d3,e9,e8,b2,b2)
a6=A.a2(B.cZ,e9,e8,b2,b2)
a7=i?new A.cN(c2,k,j):b2
b9.a=null
a8=A.ky(B.bb)
if(m){a9=i?j:k
b0=new A.eM(c1,b3,"#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\n\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform mat4 uViewProjection;\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform float uShaftIntensity;\nuniform float uFogDensity;\nuniform float uAnisotropy;\nuniform mat4 uView;\nuniform mat4 uInverseProjection;\nuniform vec3 uVolumetricAlbedo;\nuniform float uVolumetricHeightFalloff;\nuniform float uVolumetricDustDensity;\nuniform float uVolumetricJitter;\nuniform float uVolumetricIntensity;\nuniform float uVolumetricSampleCount;\nuniform float uVolumetricSourceCount;\n\nuniform vec3 uSourcePosition0;\nuniform vec3 uSourceColor0;\nuniform float uSourceIntensity0;\nuniform float uSourceReferenceDistance0;\nuniform float uSourceCutoffDistance0;\nuniform vec3 uSourcePosition1;\nuniform vec3 uSourceColor1;\nuniform float uSourceIntensity1;\nuniform float uSourceReferenceDistance1;\nuniform float uSourceCutoffDistance1;\nuniform vec3 uSourcePosition2;\nuniform vec3 uSourceColor2;\nuniform float uSourceIntensity2;\nuniform float uSourceReferenceDistance2;\nuniform float uSourceCutoffDistance2;\nuniform vec3 uSourcePosition3;\nuniform vec3 uSourceColor3;\nuniform float uSourceIntensity3;\nuniform float uSourceReferenceDistance3;\nuniform float uSourceCutoffDistance3;\n\nfloat linearDepth(float depth) {\n  float z = depth * 2.0 - 1.0;\n  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);\n}\n\nfloat phaseHenyeyGreenstein(float cosTheta, float anisotropy) {\n  float g = clamp(anisotropy, -0.85, 0.85);\n  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;\n  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));\n}\n\nvec3 sourceContribution(\n  vec3 position,\n  vec3 color,\n  float intensity,\n  float referenceDistance,\n  float cutoffDistance,\n  vec3 viewRay,\n  float rayLength\n) {\n  vec4 clip = uViewProjection * vec4(position, 1.0);\n  if (clip.w <= 0.0) return vec3(0.0);\n  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;\n  float sourceDistance = length(sourceView);\n  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);\n  vec3 sampleToSource = sourceView - viewRay * tClosest;\n  float distanceToSource = max(length(sampleToSource), 1e-3);\n  float cutoff = 1.0 - smoothstep(\n    cutoffDistance * 0.65, cutoffDistance, sourceDistance);\n  float inverseSquare = intensity * referenceDistance * referenceDistance /\n      max(distanceToSource * distanceToSource,\n          referenceDistance * referenceDistance);\n  // The incoming direction is source -> sample and the outgoing direction is\n  // sample -> camera. This is the same phase convention as the directional\n  // medium path, but now evaluated against the located source.\n  float phase = phaseHenyeyGreenstein(\n    dot(normalize(sampleToSource), viewRay), uAnisotropy);\n  // Located practicals and lightning must also acquire visible body in a\n  // dust-filled room. Use the same broad haze plus particulate density as the\n  // directional march; otherwise a clear-air fog toggle would accidentally\n  // erase dust-lit source rays while the directional shafts still showed it.\n  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);\n  float mediumWeight = 1.0 - exp(-max(\n    mediumDensity * min(rayLength, cutoffDistance), 0.0));\n  float pathWeight = clamp(\n    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);\n  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *\n    uVolumetricIntensity * 0.35;\n}\n\nvoid main() {\n  float depth = texture(uSceneDepth, vUv).r;\n  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);\n  viewPoint /= max(abs(viewPoint.w), 1e-5);\n  vec3 viewRay = normalize(viewPoint.xyz);\n  // linearDepth is camera-space Z; convert it to distance along the actual\n  // reconstructed ray so wide and tall projections integrate equally.\n  float cameraDepth = linearDepth(depth);\n  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);\n  float density = max(uFogDensity, 0.0);\n\n  // A fixed, bounded integral keeps the pass deterministic and makes its\n  // cost predictable on weak adapters. The depth buffer stops integration at\n  // the first opaque surface, so shafts do not leak through geometry.\n  const int maxSampleCount = 24;\n  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));\n  vec3 scatter = vec3(0.0);\n  float transmittance = 1.0;\n  float stepLength = rayLength / float(sampleCount);\n  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);\n  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);\n  for (int i = 0; i < maxSampleCount; i++) {\n    if (i >= sampleCount) break;\n    float distanceAlongRay = clamp(\n      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);\n    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));\n    // Dust is a separate, host-resolved particulate phase. It is denser near\n    // the occupied room volume than the broad atmospheric haze, so shafts gain\n    // visible body without turning the far horizon opaque. At zero density the\n    // extra term is exactly zero and the established fog path is unchanged.\n    float dustWeight = exp(-max(distanceAlongRay *\n      uVolumetricHeightFalloff * 0.45, 0.0));\n    float opticalDensity = density +\n      max(uVolumetricDustDensity, 0.0) * dustWeight;\n    float opticalDepth = opticalDensity * stepLength * heightWeight;\n    float sampleTransmittance = exp(-opticalDepth);\n    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);\n    scatter += transmittance * (uLightColor * uVolumetricAlbedo *\n      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;\n    transmittance *= sampleTransmittance;\n  }\n\n  if (uVolumetricSourceCount > 0.5) {\n    scatter += sourceContribution(\n      uSourcePosition0, uSourceColor0, uSourceIntensity0,\n      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 1.5) {\n    scatter += sourceContribution(\n      uSourcePosition1, uSourceColor1, uSourceIntensity1,\n      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 2.5) {\n    scatter += sourceContribution(\n      uSourcePosition2, uSourceColor2, uSourceIntensity2,\n      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 3.5) {\n    scatter += sourceContribution(\n      uSourcePosition3, uSourceColor3, uSourceIntensity3,\n      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);\n  }\n\n  // Fade the final sample at the far plane and keep the additive output\n  // bounded so a storm flash cannot blow out the entire frame.\n  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);\n  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);\n}\n","#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\nuniform sampler2D uVolumetric;\nuniform float uVolumetricStrength;\n\nvoid main() {\n  vec3 light = texture(uVolumetric, vUv).rgb;\n  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);\n}\n",c2,e1,c8,g,f,a9,h,A.e([],t.J))}else b0=b2
g=t.f
b1=A.e([],g)
if(!m)h=i?j:k
if(r){B.b.N(b1,A.e([new A.cn(c1,b3,b4,c2,b5,b5,B.b_,!0,h,b,e0,c0,l),new A.cn(c1,b3,b4,c2,b6,b6,B.dR,!1,b,a,c6,c0,l),new A.dL(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",c2,c7,a,h,a2)],g))
h=a2}if(q){B.b.N(b1,A.e([new A.cw(c1,b3,b4,c2,b7,b7,B.b0,h,a0,e0,c0,l),new A.cw(c1,b3,b4,c2,b8,b8,B.dS,a0,a1,d1,c0,l),new A.dV(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// Circle-of-confusion is a simple linear ramp from the focus distance\n// outward (front and back treated the same \u2014 no separate near/far falloff\n// curve), clamped to [0,1] and scaled by uStrength so\n// PostProcessState.depthOfFieldStrength == 0 is a true no-op (coc == 0\n// everywhere, oColor == the sharp source exactly).\nvoid main(){\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n  float coc=clamp(abs(depth-uFocusDistance)/max(uFocusRange,0.0001),0.0,1.0)*uStrength;\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  vec3 blurred=texture(uBlurred,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,coc),1.0);\n}\n",c2,e0,d2,e1,c8,h,f,a1,a3)],g))
h=a3}if(p){B.b.j(b1,new A.e1(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",c2,d4,h,a4))
h=a4}if(o){B.b.j(b1,new A.ep(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",c2,h,a5))
h=a5}if(n){B.b.j(b1,new A.eL(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',c2,e6,e5,h,a6))
h=a6}j=A.e([new A.dS(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d7,d6,c5,f)],g)
if(s)j.push(new A.eB(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=8;\nconst vec3 KERNEL[8]=vec3[8](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    // NDC [-1,1] -> UV [0,1] requires the constant 0.5, not vUv (the\n    // *current* fragment's own UV) \u2014 adding vUv here was a real bug: it\n    // conflated \"this sample's own absolute reprojected screen position\"\n    // with \"an offset relative to the current fragment,\" producing an\n    // error of (vUv-0.5) per axis that grows with distance from screen\n    // center. That's exactly what produced a huge, blobby, non-local dark\n    // region instead of contact occlusion \u2014 every sample tested a wildly\n    // wrong depth location except right at screen center, where the error\n    // happened to be near zero.\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    occlusion+=(occluderView.z>=samplePos.z+0.02?1.0:0.0)*rangeCheck;\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",c2,e1,c8,d))
if(s)j.push(new A.eA(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float centerDepth=linearDepth(texture(uSceneDepth,vUv).r);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleDepth=linearDepth(texture(uSceneDepth,sampleUv).r);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*4.0);\n      sum+=texture(uSsaoRaw,sampleUv).r*depthWeight;\n      weightSum+=depthWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',c2,e4,e1,c8,c0,l,d,c))
j.push(new A.ey(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d7,d6,c5,c9,b2,b2,new A.iY(b9),e))
j.push(new A.ez(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nuniform vec3 uReflectionColor;\nuniform float uReflectionIntensity;\nuniform float uReflectionConfidence;\nuniform vec2 uShadowMapTexelSize;\nuniform float uShadowFilterRadius;\nuniform float uShadowBias;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uSpecularScale;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nuniform float uSurfaceSnowCoverage;\nuniform float uSurfaceDissolution;\nuniform float uThermalSourceCount;\nuniform vec3 uThermalSourcePosition0;\nuniform float uThermalSourceRadius0;\nuniform float uThermalSourceDissolution0;\nuniform vec3 uThermalSourcePosition1;\nuniform float uThermalSourceRadius1;\nuniform float uThermalSourceDissolution1;\nuniform vec3 uThermalSourcePosition2;\nuniform float uThermalSourceRadius2;\nuniform float uThermalSourceDissolution2;\nuniform vec3 uThermalSourcePosition3;\nuniform float uThermalSourceRadius3;\nuniform float uThermalSourceDissolution3;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return lightColor*lightIntensity*ndotl*coneFalloff*\n    distanceFalloff*enabled;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0);\n  float ndotl=max(dot(normal,lightDir),0.0);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlick(hdotv,f0);\n  float distribution=distributionGgx(ndoth,roughness);\n  float geometry=geometrySmith(ndotv,ndotl,roughness);\n  vec3 numerator=distribution*geometry*fresnel;\n  float denominator=max(4.0*ndotv*ndotl,0.001);\n  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog keeps the smooth distance ramp for authored horizon control, but\n// the participating-medium term is an analytic optical depth along the actual\n// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the\n// integral has a stable constant-height limit and therefore does not shimmer\n// when a surface is nearly level with the camera. Zero density remains an\n// exact no-op; the host can still use the distance ramp independently.\nfloat heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){\n  float segmentLength=length(rayEnd-rayStart);\n  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;\n  float falloff=max(uFogHeightFalloff,0.);\n  float h0=max(rayStart.y,0.);\n  float h1=max(rayEnd.y,0.);\n  float integral;\n  if(falloff<=0.||abs(h1-h0)<=0.0001){\n    integral=segmentLength*exp(-falloff*h0);\n  }else{\n    float denominator=falloff*(h1-h0);\n    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;\n  }\n  return max(uFogDensity*integral,0.);\n}\n\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);\n  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);\n  float mediumFactor=1.-exp(-opticalDepth);\n  return clamp(max(distFactor,mediumFactor),0.,1.);\n}\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);\n  // Fixed low-discrepancy offsets avoid the directional shimmer of a regular\n  // square lattice while remaining deterministic and free of per-frame noise.\n  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);\n  float sum=0.;\n  sum+=sampleShadow(projCoord+vec3(vec2(-.942,-.399)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.945,-.768)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.094,.886)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.344,.294)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.716,.642)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.688,-.089)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.287,-.885)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.052,.008)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.831,.486)*t,0.),bias);\n  return sum/9.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // \xa76.2's alpha-masked route. Deliberately the first thing after the\n  // fetch it depends on, and ahead of all the lighting below: a discarded\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  direct*=uDirectLightScale;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao;\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Weather changes the material before direct and environment response.\n  // Thawing therefore affects the same specular lobe the viewer sees,\n  // instead of changing only diffuse color after the highlight is computed.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  float upward=clamp(n.y*0.5+0.5,0.0,1.0);\n  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);\n  // A steady spherical conductive field decays approximately as 1/r. The\n  // host keeps the slow latent material memory in uSurfaceDissolution; this\n  // local term therefore models the spatial heat field without making warm\n  // surfaces snap back or disappear at an arbitrary exponential radius.\n  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/\n      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));\n  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/\n      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));\n  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/\n      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));\n  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/\n      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));\n  thermalDissolution=clamp(thermalDissolution,0.0,1.0);\n  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*\n    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);\n  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);\n  float dissolution=thermalDissolution;\n  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);\n  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  // A continuous water film forms a second dielectric lobe. It smooths the\n  // authored surface only as coverage rises, so damp cloth stays diffuse\n  // while puddled stone gains a tight grazing reflection.\n  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);\n  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  specular*=uDirectLightScale*uSpecularScale;\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*(1.0-0.25*rough));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);\n  float coat=coatStrength*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*\n    uDirectLightScale*uSpecularScale;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  // Environment fallback reflections are deliberately bounded and weighted\n  // by wetness/grazing angle. A real probe/history hit can raise confidence;\n  // the current host fallback remains visible but never masquerades as SSR.\n  float reflectionNdotV=max(dot(n,viewDir),0.0);\n  float reflectionFresnel=0.04+0.96*pow(1.0-reflectionNdotV,5.0);\n  float reflectionSurface=clamp(wetness+0.18*dissolution,0.0,1.0);\n  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);\n  float reflectionWeight=clamp(\n    uReflectionIntensity*reflectionSurface*reflectionFresnel*\n      (1.0-0.72*rough)*reflectionConfidence,\n    0.0,1.0);\n  lit+=uReflectionColor*reflectionWeight;\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  oGlow=vec4(emissive,1.);\n}\n",d7,d6,c5,d8,d9,d3,d5,e2,new A.iZ(b9,a8),c9,d0,e3,s,e9,e8,f0,f0,e,c,k))
if(a7!=null)j.push(a7)
if(b0!=null)j.push(b0)
B.b.N(j,b1)
j.push(new A.cW(c1,b3,u.b,c2,h,c3))
return new A.dW(j)},
iY:function iY(a){this.a=a},
iZ:function iZ(a,b){this.a=a
this.b=b},
ez:function ez(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
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
fd:function fd(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
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
eB:function eB(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
ff:function ff(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eA:function eA(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fe:function fe(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
eL:function eL(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fk:function fk(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
eM:function eM(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
fm:function fm(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fl:function fl(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
d0:function d0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eP:function eP(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fp:function fp(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jC(a,b,c,d,e,f,g,h,i,j,k){return new A.eu(j,B.ac,A.e([],t.D),f,e,k,c,a,!0,!0,i,d)},
eu:function eu(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
_.b=a
_.c=b
_.d=!0
_.e=null
_.f=c
_.r=d
_.w=e
_.x=f
_.y=g
_.z=h
_.Q=i
_.as=j
_.at=k
_.ax=l
_.ay=null},
ew(a,b){return new A.d4(a,b)},
fT:function fT(a,b){this.a=a
this.b=b},
e_:function e_(a,b){this.a=a
this.b=b},
fY:function fY(a,b){this.a=a
this.b=b},
fZ:function fZ(a,b){this.a=a
this.b=b},
dZ:function dZ(a,b,c){this.a=a
this.b=b
this.c=c},
fX:function fX(){},
bW:function bW(a,b){this.a=a
this.b=b},
cB:function cB(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
e0:function e0(a,b){this.a=a
this.b=b},
c6:function c6(a,b){this.a=a
this.b=b},
d4:function d4(a,b){this.a=a
this.b=b},
b7:function b7(a,b){this.a=a
this.b=b},
d:function d(a,b){this.a=a
this.b=b},
cr:function cr(a,b){this.a=a
this.b=b},
dT:function dT(a,b){this.a=a
this.b=b},
hx(a,b,c,d){var s=0,r=A.jS(t.ac),q,p,o,n,m,l,k,j,i
var $async$hx=A.jV(function(e,f){if(e===1)return A.jM(f,r)
for(;;)switch(s){case 0:j=B.bd.dd(a)
i=j==null?null:new A.ev(j.a,new A.fy(new A.fz(),new A.es()),new A.dY(A.e([],t.c4),B.bn),A.e([],t.cR),B.a_,A.e([],t.cL),null)
if(i==null){q=null
s=1
break}p=A.a(a.clientWidth)>0?A.a(a.clientWidth):A.a(a.width)
o=A.a(a.clientHeight)>0?A.a(a.clientHeight):A.a(a.height)
n=A.kA(o,p,A.fq(A.t(v.G.window).devicePixelRatio),2,!0)
a.width=n.c
a.height=n.d
m=A.nZ(c)
s=3
return A.jL(A.iX(new A.hy(n),m,i,n),$async$hx)
case 3:i.av()
l=A.mn(i.w.a.b)
B.b.j(i.d,l)
k=new A.cU(a,i,l,new A.fP(),A.jC(B.O,!0,B.H,null,null,null,"root",!0,0,B.ac,-1),B.bk,B.cK,n)
k.y=new A.hj(B.x,B.x)
k.w=!0
k.cQ()
q=k
s=1
break
case 1:return A.jN(q,r)}})
return A.jO($async$hx,r)},
bU:function bU(a){this.a=a},
cU:function cU(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=!1
_.x=h
_.z=_.y=null
_.Q=!1
_.as=0
_.ay=_.at=!1
_.cx=_.CW=_.ch=0
_.cy=null
_.dy=_.dx=_.db=0},
hy:function hy(a){this.a=a},
hp:function hp(a){this.a=a},
hq:function hq(a){this.a=a},
hr:function hr(a){this.a=a},
hs:function hs(){},
ht:function ht(a){this.a=a},
hu:function hu(a){this.a=a},
hv:function hv(a){this.a=a},
hw:function hw(a){this.a=a},
em:function em(a,b){this.a=a
this.b=b},
fU:function fU(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
fV:function fV(){},
fW:function fW(){},
dq:function dq(a,b){this.a=a
this.b=b},
bl:function bl(a,b){var _=this
_.a=0
_.b=a
_.f=_.c=null
_.$ti=b},
aN:function aN(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=0
_.$ti=d},
lN(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.bT(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
fv:function fv(a,b){this.a=a
this.b=b},
bQ:function bQ(a,b){this.a=a
this.b=b},
fA:function fA(a,b){this.a=a
this.b=b},
fE:function fE(a,b){this.a=a
this.b=b},
bT:function bT(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
a5:function a5(a,b){this.a=a
this.b=b},
i3:function i3(){this.a=null},
my(a){var s=new A.eN(a,B.d,new A.i3(),A.mI(a))
s.cm(a)
return s},
mI(a){var s,r,q=t.du.a(a.getSupportedExtensions())
if(q==null)return A.ak(t.N)
s=A.ak(t.N)
r=J.a_(t.dy.b(q)?q:new A.cq(q,A.H(q).h("cq<1,v>")))
while(r.k())s.j(0,r.gm())
return s},
aq(a,b){var s,r
if(a.b!==B.d)A.m(A.l(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.a(s.drawingBufferWidth),A.a(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
mD(a,b){var s
if(a.b!==B.d)A.m(A.l(u.k))
switch(b){case 1:a.a.drawBuffers(A.e([A.a(v.G.WebGL2RenderingContext.COLOR_ATTACHMENT0)],t.n))
break
case 2:s=v.G
a.a.drawBuffers(A.e([A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
break
default:throw A.c(A.j("WebGl2Device.setColorAttachmentCount: count must be 1 or 2, got "+b,null))}},
mC(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.a(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
mB(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
kD(a,b){var s
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
mz(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
a7(a,b){var s,r,q,p
if(a.b!==B.d)A.m(A.l(u.k))
s=a.f
r=s.df(b)
if(r.a===0)return
if(r.p(0,B.a4)){q=v.G
p=a.a
if(b.a)p.enable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.p(0,B.a5))a.a.depthFunc(A.mC(a,b.b))
if(r.p(0,B.a6))a.a.depthMask(b.c)
if(r.p(0,B.aa)){q=v.G
p=a.a
if(b.w)p.enable(A.a(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.a(q.WebGL2RenderingContext.CULL_FACE))}if(r.p(0,B.ab))a.a.cullFace(A.mB(a,b.x))
if(r.p(0,B.aQ)){q=v.G.WebGL2RenderingContext
q=A.a(q.CCW)
a.a.frontFace(q)}if(r.p(0,B.a7)){q=v.G
p=a.a
if(b.d)p.enable(A.a(q.WebGL2RenderingContext.BLEND))
else p.disable(A.a(q.WebGL2RenderingContext.BLEND))}if(r.p(0,B.a8))a.a.blendFunc(A.kD(a,b.e),A.kD(a,b.f))
if(r.p(0,B.a9))a.a.blendEquation(A.mz(a,b.r))
if(r.p(0,B.aO))a.a.colorMask(!0,!0,!0,!0)
if(r.p(0,B.aP)){q=v.G.WebGL2RenderingContext
a.a.disable(A.a(q.SCISSOR_TEST))}s.a=b},
mA(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.a(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.a(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.a(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
bz(a,b,c,d,e,f){var s
if(a.b!==B.d)A.m(A.l(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.mA(a,b))},
aQ(a,b){var s
if(a.b!==B.d)A.m(A.l(u.k))
s=A.t(b.a)
a.a.useProgram(s)
a.e=s},
b(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.d)A.m(A.l(u.k))
s=a.e
if(s==null)throw A.c(A.l("WebGl2Device.setUniform called with no bound program"))
r=a.a
q=A.U(r.getUniformLocation(s,b))
if(q==null)return
switch(c.a.a){case 0:r.uniform1f(q,A.iz(c.b))
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
ar(a,b){if(a.b!==B.d)A.m(A.l(u.k))
a.a.bindVertexArray(A.t(b.a))},
T(a,b,c){var s,r,q,p,o,n
if(a.b!==B.d)A.m(A.l(u.k))
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
return}throw A.c(A.l("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.c(A.l("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
mE(a,b,c){var s,r,q,p
if(a.b!==B.d)A.m(A.l(u.k))
s=A.t(b.a)
r=a.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),s)
A:{p=q.WebGL2RenderingContext
r.bufferData(A.a(p.ELEMENT_ARRAY_BUFFER),c,A.a(q.WebGL2RenderingContext.STATIC_DRAW))
break A}},
mF(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
kG(a,b){var s,r,q,p
if(a.b!==B.d)A.m(A.l(u.k))
s=a.a
r=A.U(s.createBuffer())
if(r==null)throw A.c(A.l("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.am?A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.a(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.mF(a,b.b))
return new A.ba(r)},
kE(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
kF(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
kH(a,b){var s,r,q,p,o,n,m,l,k
if(a.b!==B.d)A.m(A.l(u.k))
s=a.a
r=A.U(s.createTexture())
if(r==null)throw A.c(A.l("WebGl2Device: gl.createTexture() returned null"))
q=v.G
p=q.WebGL2RenderingContext
o=A.a(p.TEXTURE_2D)
s.bindTexture(o,r)
p=q.WebGL2RenderingContext
A.a8(s,"texStorage2D",[o,1,A.a(p.RGBA8),1,1],t.H)
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.kE(a,B.ap))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.kE(a,B.ap))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_S),A.kF(a,B.aq))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_T),A.kF(a,B.aq))
n=a.r.p(0,"EXT_texture_filter_anisotropic")
m=n?a.bB(34047):1
if(!isFinite(1))A.m(A.aC(1,"requested","anisotropy must be finite and in [1, 16]"))
if(n&&isFinite(m)&&m>=1)l=m>16?16:m
else l=1
k=1<l?1:l
if(k>1)s.texParameterf(o,34046,k)
return new A.ba(new A.dA(r,1,1,1,!1))},
kI(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.d)A.m(A.l(u.k))
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
m=r?A.a(n.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(n.WebGL2RenderingContext.TEXTURE_2D)
l=a.a
l.bindTexture(m,s.a)
k=t.H
if(r)A.a8(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.a8(l,"texSubImage2D",[m,0,0,0,q,p,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
mG(a,b){if(a.b!==B.d)A.m(A.l(u.k))
t.R.a(b.a)
return},
eO(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
kK(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.d)A.m(A.l(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.c(A.j("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.U(r.createFramebuffer())
if(q==null)throw A.c(A.l("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.T
if(n&&!a1.e)throw A.c(A.j("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.ao||o===B.bu
l=d
k=d
j=d
i=d
if(n){r.drawBuffers(A.e([A.a(p.WebGL2RenderingContext.NONE)],t.n))
r.readBuffer(A.a(p.WebGL2RenderingContext.NONE))}else{o=a1.c
h=t.H
g=a1.b
if(o>1){k=A.U(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.U(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.e([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.U(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.a8(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.a8(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.U(r.createTexture())
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
if(o>1){f=A.U(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.U(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.a8(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
A.a8(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.a(r.checkFramebufferStatus(A.a(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.a(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.jD(a0,q,l,k,f,e,j,i)
throw A.c(A.l("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.ba(new A.dz(q,l,k,f,e,j,i,s,a1.b,a1.c))},
jD(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
ay(a){var s
if(a.b!==B.d)A.m(A.l(u.k))
s=A.U(a.a.createVertexArray())
if(s==null)throw A.c(A.l("WebGl2Device: gl.createVertexArray() returned null"))
return new A.ba(s)},
kJ(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.U(p.createShader(b))
if(o==null)throw A.c(A.ew(b===A.lh(A.l4(A.ll(),r),q,t.S)?B.aK:B.aL,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.aV(A.ci(p.getShaderParameter(o,A.a(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bF(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.c(A.ew(b===A.lh(A.l4(A.ll(),r),q,t.S)?B.aK:B.aL,s))}return o},
mH(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.d)A.m(A.l(u.k))
q=v.G
s=A.kJ(a,A.a(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.kJ(a,A.a(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.U(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.c(B.d9)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.aV(A.ci(o.getProgramParameter(n,A.a(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bF(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.ew(B.aM,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.A)(c),++l){k=c[l]
if(A.a(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.ew(B.aN,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.U(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.ew(B.aN,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.ba(n)},
ba:function ba(a){this.a=a},
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
fo:function fo(a){this.a=a
this.b=!1},
eN:function eN(a,b,c,d){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=c
_.r=d
_.w=!1},
i0:function i0(a){this.a=a},
i1:function i1(a){this.a=a},
iy:function iy(){},
fn:function fn(){},
i_:function i_(a){this.a=a},
i2:function i2(){},
j9(){var s=0,r=A.jS(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
var $async$j9=A.jV(function(a5,a6){if(a5===1)return A.jM(a6,r)
for(;;)switch(s){case 0:a2=v.G
a3=A.U(A.t(a2.document).querySelector("#showcase-canvas"))
a4=t.m
if(!a4.b(a3)){s=1
break}s=3
return A.jL(A.hx(a3,!0,B.aI,!0),$async$j9)
case 3:p=a6
if(p==null){s=1
break}o=p.y
n=o==null
if(!n)o.b=7
if(!n)o.d=0.4
if(!n)o.a=B.aY
p.f=B.bl
p.r=B.cJ
m=A.U(A.t(a2.document).querySelector("#tone-map-select"))
if(a4.b(m))m.addEventListener("change",A.aA(new A.ja(m,p)))
a2=A.mg(24,24)
a4=p.b
l=a4.gY().bb(a2,"ground")
a2=A.mh(1,40,40)
k=a4.gY().bb(a2,"center_sphere")
a2=A.m6(0.75)
j=a4.gY().bb(a2,"satellite_cube")
i=a4.gY().ao(B.cm)
h=a4.gY().ao(B.cn)
g=a4.gY().ao(B.cj)
f=a4.gY().ao(B.cl)
e=a4.gY().ao(B.ck)
a4=p.e
a4.aS(0,i,l,"ground_node",new A.aO(B.t,B.A,1))
d=a4.aS(0,h,k,"center_sphere_node",new A.aO(B.aY,B.A,1))
c=A.jC(B.O,!0,B.H,null,null,null,"orbit_ring",!0,0,B.ac,-1)
d.bS(c)
b=[g,f,e]
a=A.e([],t.D)
for(a0=0;a0<3;++a0){a1=a0*2.0943951023931953
B.b.j(a,c.aS(0,b[a0],j,"satellite_"+a0,new A.aO(new A.i(Math.cos(a1)*2.5,0,Math.sin(a1)*2.5),B.A,1)))}p.sdz(new A.jb(d,c,a,p))
p.cg()
case 1:return A.jN(q,r)}})
return A.jO($async$j9,r)},
ja:function ja(a,b){this.a=a
this.b=b},
jb:function jb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ln(a){return v.mangledGlobalNames[a]},
ol(a){throw A.R(A.km(a),new Error())},
aU(){throw A.R(A.lY(""),new Error())},
lm(){throw A.R(A.km(""),new Error())},
ji(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.c(A.aC(b.gdm(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].gl().c.a0()
o=q*16
n=o+16
B.Y.bi(s,o,n,p.a)
if(l)B.Y.bi(r,o,n,p.b9().a)}m=a.a
A.b(m,"uInstanceModels",new A.d(B.aT,s))
if(l)A.b(m,"uInstanceNormalMatrices",new A.d(B.aT,r))
A.b(m,"uUseInstances",B.aU)}},B={}
var w=[A,J,B]
var $={}
A.ju.prototype={}
J.e3.prototype={
R(a,b){return a===b},
gF(a){return A.en(a)},
i(a){return"Instance of '"+A.eo(a)+"'"},
gD(a){return A.aT(A.jP(this))}}
J.e5.prototype={
i(a){return String(a)},
gF(a){return a?519018:218159},
gD(a){return A.aT(t.y)},
$iC:1,
$iz:1}
J.cD.prototype={
R(a,b){return null==b},
i(a){return"null"},
gF(a){return 0},
$iC:1}
J.cF.prototype={$iG:1}
J.bg.prototype={
gF(a){return 0},
gD(a){return B.dm},
i(a){return String(a)}}
J.el.prototype={}
J.by.prototype={}
J.bf.prototype={
i(a){var s=a[$.lq()]
if(s==null)s=a[$.k2()]
if(s==null)return this.cl(a)
return"JavaScript function for "+J.bO(s)},
$ibr:1}
J.cE.prototype={
gF(a){return 0},
i(a){return String(a)}}
J.cG.prototype={
gF(a){return 0},
i(a){return String(a)}}
J.r.prototype={
j(a,b){A.H(a).c.a(b)
a.$flags&1&&A.bo(a,29)
a.push(b)},
ad(a,b){var s
a.$flags&1&&A.bo(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aV(a[s],b)){a.splice(s,1)
return!0}return!1},
N(a,b){var s
A.H(a).h("k<1>").a(b)
a.$flags&1&&A.bo(a,"addAll",2)
if(Array.isArray(b)){this.cq(a,b)
return}for(s=J.a_(b);s.k();)a.push(s.gm())},
cq(a,b){var s,r
t.r.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.c(A.av(a))
for(r=0;r<s;++r)a.push(b[r])},
V(a){a.$flags&1&&A.bo(a,"clear","clear")
a.length=0},
O(a,b){if(!(b>=0&&b<a.length))return A.h(a,b)
return a[b]},
ci(a,b){var s
if(b<0||b>a.length)throw A.c(A.aM(b,0,a.length,"start",null))
s=a.length
if(b===s)return A.e([],A.H(a))
return A.e(a.slice(b,s),A.H(a))},
gaf(a){var s=a.length
if(s===1){if(0>=s)return A.h(a,0)
return a[0]}if(s===0)throw A.c(A.jr())
throw A.c(A.ki())},
aB(a,b){var s,r
A.H(a).h("z(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.c(A.av(a))}return!0},
a6(a,b){var s,r,q,p,o,n=A.H(a)
n.h("f(1,1)?").a(b)
a.$flags&2&&A.bo(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.np()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dX()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.ch(b,2))
if(p>0)this.cV(a,p)},
cf(a){return this.a6(a,null)},
cV(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
dk(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.h(a,s)
if(J.aV(a[s],b))return s}return-1},
p(a,b){var s
for(s=0;s<a.length;++s)if(J.aV(a[s],b))return!0
return!1},
i(a){return A.js(a,"[","]")},
gt(a){return new J.cm(a,a.length,A.H(a).h("cm<1>"))},
gF(a){return A.en(a)},
gn(a){return a.length},
q(a,b){if(!(b>=0&&b<a.length))throw A.c(A.j1(a,b))
return a[b]},
C(a,b,c){A.H(a).c.a(c)
a.$flags&2&&A.bo(a)
if(!(b>=0&&b<a.length))throw A.c(A.j1(a,b))
a[b]=c},
b5(a,b){var s
A.H(a).h("z(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gD(a){return A.aT(A.H(a))},
$ik:1,
$iy:1}
J.e4.prototype={
dU(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.eo(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.h1.prototype={}
J.cm.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.A(q)
throw A.c(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iN:1}
J.bY.prototype={
E(a,b){var s
A.fq(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gam(b)
if(this.gam(a)===s)return 0
if(this.gam(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gam(a){return a===0?1/a<0:a<0},
dR(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.c(A.c9(""+a+".toInt()"))},
c5(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.c(A.c9(""+a+".round()"))},
ai(a,b,c){if(this.E(b,c)>0)throw A.c(A.nP(b))
if(this.E(a,b)<0)return b
if(this.E(a,c)>0)return c
return a},
be(a,b){var s
if(b>20)throw A.c(A.aM(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gam(a))return"-"+s
return s},
dT(a,b){var s
if(b>20)throw A.c(A.aM(b,0,20,"fractionDigits",null))
s=a.toExponential(b)
if(a===0&&this.gam(a))return"-"+s
return s},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gF(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
T(a,b){return a+b},
bh(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
Z(a,b){return(a|0)===a?a/b|0:this.d0(a,b)},
d0(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.c(A.c9("Result of truncating division is "+A.o(s)+": "+A.o(a)+" ~/ "+b))},
cZ(a,b){var s
if(a>0)s=this.cY(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cY(a,b){return b>31?0:a>>>b},
aE(a,b){return a<b},
gD(a){return A.aT(t.p)},
$iaa:1,
$iq:1,
$ia9:1}
J.cC.prototype={
gD(a){return A.aT(t.S)},
$iC:1,
$if:1}
J.e6.prototype={
gD(a){return A.aT(t.i)},
$iC:1}
J.be.prototype={
a1(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
ck(a,b,c){return a.substring(b,A.mi(b,c,a.length))},
cj(a,b){return this.ck(a,b,null)},
E(a,b){var s
A.aS(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
i(a){return a},
gF(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gD(a){return A.aT(t.N)},
gn(a){return a.length},
$iC:1,
$iaa:1,
$ikt:1,
$iv:1}
A.ca.prototype={
gt(a){return new A.cp(J.a_(this.gaA()),A.u(this).h("cp<1,2>"))},
gn(a){return J.bp(this.gaA())},
O(a,b){return A.u(this).y[1].a(J.jo(this.gaA(),b))},
i(a){return J.bO(this.gaA())}}
A.cp.prototype={
k(){return this.a.k()},
gm(){return this.$ti.y[1].a(this.a.gm())},
$iN:1}
A.dc.prototype={
q(a,b){return this.$ti.y[1].a(J.jn(this.a,b))},
$iy:1}
A.cq.prototype={
gaA(){return this.a}}
A.cH.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.hQ.prototype={}
A.aw.prototype={}
A.O.prototype={
gt(a){var s=this
return new A.ad(s,s.gn(s),A.u(s).h("ad<O.E>"))},
ae(a){var s,r=this,q=A.jw(A.u(r).h("O.E"))
for(s=0;s<r.gn(r);++s)q.j(0,r.O(0,s))
return q}}
A.d6.prototype={
gcM(){var s=J.bp(this.a),r=this.c
if(r==null||r>s)return s
return r},
gd_(){var s=J.bp(this.a),r=this.b
if(r>s)return s
return r},
gn(a){var s,r=J.bp(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
O(a,b){var s=this,r=s.gd_()+b
if(b<0||r>=s.gcM())throw A.c(A.h0(b,s.gn(0),s,"index"))
return J.jo(s.a,r)},
c7(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.j3(n),l=m.gn(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.kk(0,n):J.kj(0,n)}r=A.h4(s,m.O(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.C(r,q,m.O(n,o+q))
if(m.gn(n)<l)throw A.c(A.av(p))}return r},
dS(a){return this.c7(0,!0)}}
A.ad.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.j3(q),o=p.gn(q)
if(r.b!==o)throw A.c(A.av(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.O(q,s);++r.c
return!0},
$iN:1}
A.cL.prototype={
gt(a){var s=this.a
return new A.cM(s.gt(s),this.b,A.u(this).h("cM<1,2>"))},
gn(a){var s=this.a
return s.gn(s)},
O(a,b){var s=this.a
return this.b.$1(s.O(s,b))}}
A.cM.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gm())
return!0}s.a=null
return!1},
gm(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iN:1}
A.ae.prototype={
gn(a){return J.bp(this.a)},
O(a,b){return this.b.$1(J.jo(this.a,b))}}
A.Z.prototype={
gt(a){return new A.F(J.a_(this.a),this.b,this.$ti.h("F<1>"))}}
A.F.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gm()))return!0
return!1},
gm(){return this.a.gm()},
$iN:1}
A.ab.prototype={}
A.d2.prototype={
gn(a){return J.bp(this.a)},
O(a,b){var s=this.a,r=J.j3(s)
return r.O(s,r.gn(s)-1-b)}}
A.dC.prototype={}
A.af.prototype={$r:"+(1,2)",$s:1}
A.dm.prototype={$r:"+influence,light(1,2)",$s:2}
A.dn.prototype={$r:"+influence,source(1,2)",$s:3}
A.cu.prototype={}
A.ct.prototype={
i(a){return A.h7(this)},
gak(){return new A.aR(this.dh(),A.u(this).h("aR<a4<1,2>>"))},
dh(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gak(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga5(),o=o.gt(o),n=A.u(s),m=n.y[1],n=n.h("a4<1,2>")
case 2:if(!o.k()){r=3
break}l=o.gm()
k=s.q(0,l)
r=4
return a.b=new A.a4(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ial:1}
A.M.prototype={
gn(a){return this.b.length},
gbA(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
aj(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
q(a,b){if(!this.aj(b))return null
return this.b[this.a[b]]},
al(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbA()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga5(){return new A.bB(this.gbA(),this.$ti.h("bB<1>"))},
gc9(){return new A.bB(this.b,this.$ti.h("bB<2>"))}}
A.bB.prototype={
gn(a){return this.a.length},
gt(a){var s=this.a
return new A.bC(s,s.length,this.$ti.h("bC<1>"))}}
A.bC.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iN:1}
A.cv.prototype={
j(a,b){A.u(this).c.a(b)
A.lK()}}
A.aK.prototype={
gn(a){return this.b},
gbZ(a){return this.b!==0},
gt(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.bC(s,s.length,r.$ti.h("bC<1>"))},
p(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
ae(a){return A.jx(this,this.$ti.c)}}
A.d3.prototype={}
A.hW.prototype={
X(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.cT.prototype={
i(a){return"Null check operator used on a null value"}}
A.e7.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.eJ.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hi.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.cy.prototype={}
A.dr.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibj:1}
A.bb.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.lo(r==null?"unknown":r)+"'"},
gD(a){var s=A.jX(this)
return A.aT(s==null?A.bL(this):s)},
$ibr:1,
gdW(){return this},
$C:"$1",
$R:1,
$D:null}
A.dO.prototype={$C:"$0",$R:0}
A.dP.prototype={$C:"$2",$R:2}
A.eF.prototype={}
A.eC.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.lo(s)+"'"}}
A.bR.prototype={
R(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bR))return!1
return this.$_target===b.$_target&&this.a===b.a},
gF(a){return(A.jd(this.a)^A.en(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.eo(this.a)+"'")}}
A.et.prototype={
i(a){return"RuntimeError: "+this.a}}
A.aX.prototype={
gn(a){return this.a},
ga5(){return new A.aZ(this,A.u(this).h("aZ<1>"))},
aj(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dn(a)},
dn(a){var s=this.d
if(s==null)return!1
return this.aC(this.bx(s,a),a)>=0},
q(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dq(b)},
dq(a){var s,r,q=this.d
if(q==null)return null
s=this.bx(q,a)
r=this.aC(s,a)
if(r<0)return null
return s[r].b},
C(a,b,c){var s,r,q=this,p=A.u(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bk(s==null?q.b=q.aQ():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bk(r==null?q.c=q.aQ():r,b,c)}else q.ds(b,c)},
ds(a,b){var s,r,q,p,o=this,n=A.u(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.aQ()
r=o.b6(a)
q=s[r]
if(q==null)s[r]=[o.aG(a,b)]
else{p=o.aC(q,a)
if(p>=0)q[p].b=b
else q.push(o.aG(a,b))}},
ba(a,b){var s,r,q=this,p=A.u(q)
p.c.a(a)
p.h("2()").a(b)
if(q.aj(a)){s=q.q(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.C(0,a,r)
return r},
ad(a,b){if((b&0x3fffffff)===b)return this.co(this.c,b)
else return this.dr(b)},
dr(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.b6(a)
r=n[s]
q=o.aC(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.bl(p)
if(r.length===0)delete n[s]
return p.b},
V(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aF()}},
al(a,b){var s,r,q=this
A.u(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.c(A.av(q))
s=s.c}},
bk(a,b,c){var s,r=A.u(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.aG(b,c)
else s.b=c},
co(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.bl(s)
delete a[b]
return s.b},
aF(){this.r=this.r+1&1073741823},
aG(a,b){var s=this,r=A.u(s),q=new A.h2(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.aF()
return q},
bl(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.aF()},
b6(a){return J.K(a)&1073741823},
bx(a,b){return a[this.b6(b)]},
aC(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aV(a[r].a,b))return r
return-1},
i(a){return A.h7(this)},
aQ(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ikn:1}
A.h2.prototype={}
A.aZ.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return new A.cJ(s,s.r,s.e,this.$ti.h("cJ<1>"))}}
A.cJ.prototype={
gm(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.av(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iN:1}
A.b0.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return new A.b_(s,s.r,s.e,this.$ti.h("b_<1>"))}}
A.b_.prototype={
gm(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.av(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iN:1}
A.aY.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return new A.cI(s,s.r,s.e,this.$ti.h("cI<1,2>"))}}
A.cI.prototype={
gm(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.av(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.a4(s.a,s.b,r.$ti.h("a4<1,2>"))
r.c=s.c
return!0}},
$iN:1}
A.j5.prototype={
$1(a){return this.a(a)},
$S:22}
A.j6.prototype={
$2(a,b){return this.a(a,b)},
$S:17}
A.j7.prototype={
$1(a){return this.a(A.aS(a))},
$S:16}
A.b9.prototype={
gD(a){return A.aT(this.bz())},
bz(){return A.o_(this.$r,this.by())},
i(a){return this.bO(!1)},
bO(a){var s,r,q,p,o,n=this.cN(),m=this.by(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.h(m,q)
o=m[q]
l=a?l+A.kv(o):l+A.o(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cN(){var s,r=this.$s
while($.ip.length<=r)B.b.j($.ip,null)
s=$.ip[r]
if(s==null){s=this.cE()
B.b.C($.ip,r,s)}return s},
cE(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.jt(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.b.C(j,q,r[s])}}return A.h6(j,k)}}
A.bk.prototype={
by(){return[this.a,this.b]},
R(a,b){if(b==null)return!1
return b instanceof A.bk&&this.$s===b.$s&&J.aV(this.a,b.a)&&J.aV(this.b,b.b)},
gF(a){return A.c0(this.$s,this.a,this.b,B.h,B.h,B.h)}}
A.c_.prototype={
gD(a){return B.df},
$iC:1}
A.cR.prototype={
cR(a,b,c,d){var s=A.aM(b,0,c,d,null)
throw A.c(s)},
bq(a,b,c,d){if(b>>>0!==b||b>c)this.cR(a,b,c,d)}}
A.eb.prototype={
gD(a){return B.dg},
$iC:1}
A.a1.prototype={
gn(a){return a.length},
$iaj:1}
A.cP.prototype={
q(a,b){A.bG(b,a,a.length)
return a[b]},
bi(a,b,c,d){var s,r,q,p
t.bM.a(d)
a.$flags&2&&A.bo(a,5)
s=a.length
this.bq(a,b,s,"start")
this.bq(a,c,s,"end")
if(b>c)A.m(A.aM(b,0,c,null,null))
r=c-b
q=d.length
if(q<r)A.m(A.l("Not enough elements"))
p=q!==r?d.subarray(0,r):d
a.set(p,b)
return},
$ik:1,
$iy:1}
A.cQ.prototype={$ik:1,$iy:1}
A.cO.prototype={
gD(a){return B.dh},
$iC:1,
$ifK:1}
A.ec.prototype={
gD(a){return B.di},
$iC:1,
$ifL:1}
A.ed.prototype={
gD(a){return B.dj},
q(a,b){A.bG(b,a,a.length)
return a[b]},
$iC:1}
A.ee.prototype={
gD(a){return B.dk},
q(a,b){A.bG(b,a,a.length)
return a[b]},
$iC:1}
A.ef.prototype={
gD(a){return B.dl},
q(a,b){A.bG(b,a,a.length)
return a[b]},
$iC:1}
A.eg.prototype={
gD(a){return B.dp},
q(a,b){A.bG(b,a,a.length)
return a[b]},
$iC:1}
A.eh.prototype={
gD(a){return B.dq},
q(a,b){A.bG(b,a,a.length)
return a[b]},
$iC:1}
A.cS.prototype={
gD(a){return B.dr},
gn(a){return a.length},
q(a,b){A.bG(b,a,a.length)
return a[b]},
$iC:1}
A.ei.prototype={
gD(a){return B.ds},
gn(a){return a.length},
q(a,b){A.bG(b,a,a.length)
return a[b]},
$iC:1,
$ieH:1}
A.dh.prototype={}
A.di.prototype={}
A.dj.prototype={}
A.dk.prototype={}
A.aG.prototype={
h(a){return A.dw(v.typeUniverse,this,a)},
H(a){return A.kX(v.typeUniverse,this,a)}}
A.f1.prototype={}
A.iv.prototype={
i(a){return A.as(this.a,null)}}
A.f_.prototype={
i(a){return this.a}}
A.ds.prototype={$ib5:1}
A.i5.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:10}
A.i4.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:18}
A.i6.prototype={
$0(){this.a.$0()},
$S:11}
A.i7.prototype={
$0(){this.a.$0()},
$S:11}
A.it.prototype={
cn(a,b){if(self.setTimeout!=null)self.setTimeout(A.ch(new A.iu(this,b),0),a)
else throw A.c(A.c9("`setTimeout()` not found."))}}
A.iu.prototype={
$0(){this.b.$0()},
$S:0}
A.eQ.prototype={
aU(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.aI(a)
else{s=r.a
if(q.h("bs<1>").b(a))s.bp(a)
else s.bs(a)}},
aV(a,b){var s=this.a
if(this.b)s.aK(new A.au(a,b))
else s.aJ(new A.au(a,b))}}
A.iA.prototype={
$1(a){return this.a.$2(0,a)},
$S:6}
A.iB.prototype={
$2(a,b){this.a.$2(1,new A.cy(a,t.l.a(b)))},
$S:23}
A.iW.prototype={
$2(a,b){this.a(A.a(a),b)},
$S:30}
A.aI.prototype={
gm(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cW(a,b){var s,r,q
a=A.a(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
k(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.k()){o.b=s.gm()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.cW(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.kR
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
o.a=A.kR
throw n
return!1}if(0>=p.length)return A.h(p,-1)
o.a=p.pop()
m=1
continue}throw A.c(A.l("sync*"))}return!1},
dY(a){var s,r,q=this
if(a instanceof A.aR){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.j(r,q.a)
q.a=s
return 2}else{q.d=J.a_(a)
return 2}},
$iN:1}
A.aR.prototype={
gt(a){return new A.aI(this.a(),this.$ti.h("aI<1>"))}}
A.au.prototype={
i(a){return A.o(this.a)},
$iI:1,
gar(){return this.b}}
A.eV.prototype={
aV(a,b){var s=this.a
if((s.a&30)!==0)throw A.c(A.l("Future already completed"))
s.aJ(A.no(a,b))},
bU(a){return this.aV(a,null)}}
A.db.prototype={
aU(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.c(A.l("Future already completed"))
s.aI(r.h("1/").a(a))}}
A.bA.prototype={
dw(a){if((this.c&15)!==6)return!0
return this.b.b.bd(t.al.a(this.d),a.a,t.y,t.K)},
dj(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.d.b(q))p=l.dO(q,m,a.b,o,n,t.l)
else p=l.bd(t.x.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.bN(s))){if((r.c&1)!==0)throw A.c(A.j("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.c(A.j("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.Q.prototype={
c6(a,b,c){var s,r,q=this.$ti
q.H(c).h("1/(2)").a(a)
s=$.J
if(s===B.o){if(!t.d.b(b)&&!t.x.b(b))throw A.c(A.aC(b,"onError",u.c))}else{c.h("@<0/>").H(q.c).h("1(2)").a(a)
b=A.nE(b,s)}r=new A.Q(s,c.h("Q<0>"))
this.aH(new A.bA(r,3,a,b,q.h("@<1>").H(c).h("bA<1,2>")))
return r},
bL(a,b,c){var s,r=this.$ti
r.H(c).h("1/(2)").a(a)
s=new A.Q($.J,c.h("Q<0>"))
this.aH(new A.bA(s,19,a,b,r.h("@<1>").H(c).h("bA<1,2>")))
return s},
cX(a){this.a=this.a&1|16
this.c=a},
au(a){this.a=a.a&30|this.a&1
this.c=a.c},
aH(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aH(a)
return}r.au(s)}A.fr(null,null,r.b,t.M.a(new A.ib(r,a)))}},
bC(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bC(a)
return}m.au(n)}l.a=m.az(a)
A.fr(null,null,m.b,t.M.a(new A.ig(l,m)))}},
aw(){var s=t.F.a(this.c)
this.c=null
return this.az(s)},
az(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bs(a){var s,r=this
r.$ti.c.a(a)
s=r.aw()
r.a=8
r.c=a
A.cb(r,s)},
cD(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aw()
q.au(a)
A.cb(q,r)},
aK(a){var s=this.aw()
this.cX(a)
A.cb(this,s)},
aI(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bs<1>").b(a)){this.bp(a)
return}this.cr(a)},
cr(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.fr(null,null,s.b,t.M.a(new A.id(s,a)))},
bp(a){A.jE(this.$ti.h("bs<1>").a(a),this,!1)
return},
aJ(a){this.a^=2
A.fr(null,null,this.b,t.M.a(new A.ic(this,a)))},
$ibs:1}
A.ib.prototype={
$0(){A.cb(this.a,this.b)},
$S:0}
A.ig.prototype={
$0(){A.cb(this.b,this.a.a)},
$S:0}
A.ie.prototype={
$0(){A.jE(this.a.a,this.b,!0)},
$S:0}
A.id.prototype={
$0(){this.a.bs(this.b)},
$S:0}
A.ic.prototype={
$0(){this.a.aK(this.b)},
$S:0}
A.ij.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dN(t.fO.a(q.d),t.A)}catch(p){s=A.bN(p)
r=A.ck(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jq(q)
n=k.a
n.c=new A.au(q,o)
q=n}q.b=!0
return}if(j instanceof A.Q&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.Q){m=k.b.a
l=new A.Q(m.b,m.$ti)
j.c6(new A.ik(l,m),new A.il(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.ik.prototype={
$1(a){this.a.cD(this.b)},
$S:10}
A.il.prototype={
$2(a,b){A.dD(a)
t.l.a(b)
this.a.aK(new A.au(a,b))},
$S:31}
A.ii.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bd(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.bN(l)
r=A.ck(l)
q=s
p=r
if(p==null)p=A.jq(q)
o=this.a
o.c=new A.au(q,p)
o.b=!0}},
$S:0}
A.ih.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.dw(s)&&p.a.e!=null){p.c=p.a.dj(s)
p.b=!1}}catch(o){r=A.bN(o)
q=A.ck(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jq(p)
m=l.b
m.c=new A.au(p,n)
p=m}p.b=!0}},
$S:0}
A.eR.prototype={}
A.fg.prototype={}
A.dB.prototype={$ikL:1}
A.fa.prototype={
dP(a){var s,r,q
t.M.a(a)
try{if(B.o===$.J){a.$0()
return}A.la(null,null,this,a,t.H)}catch(q){s=A.bN(q)
r=A.ck(q)
A.jT(A.dD(s),t.l.a(r))}},
d9(a){return new A.iq(this,t.M.a(a))},
dN(a,b){b.h("0()").a(a)
if($.J===B.o)return a.$0()
return A.la(null,null,this,a,b)},
bd(a,b,c,d){c.h("@<0>").H(d).h("1(2)").a(a)
d.a(b)
if($.J===B.o)return a.$1(b)
return A.nG(null,null,this,a,b,c,d)},
dO(a,b,c,d,e,f){d.h("@<0>").H(e).H(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.J===B.o)return a.$2(b,c)
return A.nF(null,null,this,a,b,c,d,e,f)},
c3(a,b,c,d){return b.h("@<0>").H(c).H(d).h("1(2,3)").a(a)}}
A.iq.prototype={
$0(){return this.a.dP(this.b)},
$S:0}
A.iV.prototype={
$0(){A.lP(this.a,this.b)},
$S:0}
A.dd.prototype={
gn(a){return this.a},
ga5(){return new A.de(this,this.$ti.h("de<1>"))},
aj(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.cG(a)},
cG(a){var s=this.d
if(s==null)return!1
return this.a2(this.br(s,a),a)>=0},
q(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.kN(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.kN(q,b)
return r}else return this.cP(b)},
cP(a){var s,r,q=this.d
if(q==null)return null
s=this.br(q,a)
r=this.a2(s,a)
return r<0?null:s[r+1]},
C(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.bo(s==null?m.b=A.jF():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.bo(r==null?m.c=A.jF():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.jF()
p=A.jd(b)&1073741823
o=q[p]
if(o==null){A.jG(q,p,[b,c]);++m.a
m.e=null}else{n=m.a2(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
al(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.bt()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.q(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.c(A.av(m))}},
bt(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.h4(i.a,null,!1,t.A)
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
bo(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.jG(a,b,c)},
br(a,b){return a[A.jd(b)&1073741823]}}
A.dg.prototype={
a2(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.de.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return new A.df(s,s.bt(),this.$ti.h("df<1>"))}}
A.df.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.c(A.av(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iN:1}
A.aH.prototype={
cS(){return new A.aH(A.u(this).h("aH<1>"))},
gt(a){var s=this,r=new A.bD(s,s.r,A.u(s).h("bD<1>"))
r.c=s.e
return r},
gn(a){return this.a},
p(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cF(b)},
cF(a){var s=this.d
if(s==null)return!1
return this.a2(s[this.aL(a)],a)>=0},
j(a,b){var s,r,q=this
A.u(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bn(s==null?q.b=A.jI():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bn(r==null?q.c=A.jI():r,b)}else return q.cp(b)},
cp(a){var s,r,q,p=this
A.u(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jI()
r=p.aL(a)
q=s[r]
if(q==null)s[r]=[p.aR(a)]
else{if(p.a2(q,a)>=0)return!1
q.push(p.aR(a))}return!0},
ad(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bD(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bD(s.c,b)
else return s.cU(b)},
cU(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.aL(a)
r=n[s]
q=o.a2(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bP(p)
return!0},
V(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aP()}},
bn(a,b){A.u(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aR(b)
return!0},
bD(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bP(s)
delete a[b]
return!0},
aP(){this.r=this.r+1&1073741823},
aR(a){var s,r=this,q=new A.f4(A.u(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aP()
return q},
bP(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aP()},
aL(a){return J.K(a)&1073741823},
a2(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aV(a[r].a,b))return r
return-1},
$iko:1}
A.f4.prototype={}
A.bD.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.c(A.av(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iN:1}
A.h3.prototype={
$2(a,b){this.a.C(0,this.b.a(a),this.c.a(b))},
$S:36}
A.D.prototype={
gt(a){return new A.ad(a,this.gn(a),A.bL(a).h("ad<D.E>"))},
O(a,b){return this.q(a,b)},
aB(a,b){var s,r
A.bL(a).h("z(D.E)").a(b)
s=this.gn(a)
for(r=0;r<s;++r){if(!b.$1(this.q(a,r)))return!1
if(s!==this.gn(a))throw A.c(A.av(a))}return!0},
i(a){return A.js(a,"[","]")}}
A.bu.prototype={
al(a,b){var s,r,q,p=A.u(this)
p.h("~(1,2)").a(b)
for(s=this.ga5(),s=s.gt(s),p=p.y[1];s.k();){r=s.gm()
q=this.q(0,r)
b.$2(r,q==null?p.a(q):q)}},
gn(a){var s=this.ga5()
return s.gn(s)},
i(a){return A.h7(this)},
$ial:1}
A.h8.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.o(a)
r.a=(r.a+=s)+": "
s=A.o(b)
r.a+=s},
$S:58}
A.dx.prototype={}
A.bZ.prototype={
q(a,b){return this.a.q(0,b)},
gn(a){return this.a.a},
ga5(){var s=this.a
return new A.aZ(s,A.u(s).h("aZ<1>"))},
i(a){return A.h7(this.a)},
gc9(){var s=this.a
return new A.b0(s,A.u(s).h("b0<2>"))},
gak(){var s=this.a
return new A.aY(s,A.u(s).h("aY<1,2>"))},
$ial:1}
A.d7.prototype={}
A.b4.prototype={
gbZ(a){return this.gn(this)!==0},
N(a,b){var s
for(s=J.a_(A.u(this).h("k<1>").a(b));s.k();)this.j(0,s.gm())},
bV(a){var s,r,q=this.ae(0)
for(s=this.gt(this);s.k();){r=s.gm()
if(a.p(0,r))q.ad(0,r)}return q},
i(a){return A.js(this,"{","}")},
du(a,b){var s,r,q=this.gt(this)
if(!q.k())return""
s=J.bO(q.gm())
if(!q.k())return s
if(b.length===0){r=s
do r+=A.o(q.gm())
while(q.k())}else{r=s
do r=r+b+A.o(q.gm())
while(q.k())}return r.charCodeAt(0)==0?r:r},
d5(a,b){var s
A.u(this).h("z(1)").a(b)
for(s=this.gt(this);s.k();)if(b.$1(s.gm()))return!0
return!1},
O(a,b){var s,r
A.hC(b,"index")
s=this.gt(this)
for(r=b;s.k();){if(r===0)return s.gm();--r}throw A.c(A.h0(b,b-r,this,"index"))},
$ik:1,
$ibi:1}
A.dp.prototype={
ae(a){var s=this.cS()
s.N(0,this)
return s}}
A.fj.prototype={
j(a,b){this.$ti.c.a(b)
return A.n5()}}
A.d8.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return A.jH(s,s.r,A.u(s).c)},
ae(a){return this.a.ae(0)}}
A.cd.prototype={}
A.dy.prototype={}
A.bq.prototype={
R(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bq)if(this.a===b.a)s=this.b===b.b
return s},
gF(a){return A.c0(this.a,this.b,B.h,B.h,B.h,B.h)},
E(a,b){var s
t.df.a(b)
s=B.i.E(this.a,b.a)
if(s!==0)return s
return B.i.E(this.b,b.b)},
i(a){var s=this,r=A.lL(A.me(s)),q=A.dR(A.mc(s)),p=A.dR(A.m8(s)),o=A.dR(A.m9(s)),n=A.dR(A.mb(s)),m=A.dR(A.md(s)),l=A.kh(A.ma(s)),k=s.b,j=k===0?"":A.kh(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iaa:1}
A.i8.prototype={
i(a){return this.u()}}
A.I.prototype={
gar(){return A.m7(this)}}
A.dJ.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.fF(s)
return"Assertion failed"}}
A.b5.prototype={}
A.aJ.prototype={
gaO(){return"Invalid argument"+(!this.a?"(s)":"")},
gaN(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.o(p),n=s.gaO()+q+o
if(!s.a)return n
return n+s.gaN()+": "+A.fF(s.gb7())},
gb7(){return this.b}}
A.cY.prototype={
gb7(){return A.l0(this.b)},
gaO(){return"RangeError"},
gaN(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.o(q):""
else if(q==null)s=": Not greater than or equal to "+A.o(r)
else if(q>r)s=": Not in inclusive range "+A.o(r)+".."+A.o(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.o(r)
return s}}
A.e2.prototype={
gb7(){return A.a(this.b)},
gaO(){return"RangeError"},
gaN(){if(A.a(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gn(a){return this.f}}
A.d9.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.eI.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.c7.prototype={
i(a){return"Bad state: "+this.a}}
A.dQ.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.fF(s)+"."}}
A.d5.prototype={
i(a){return"Stack Overflow"},
gar(){return null},
$iI:1}
A.i9.prototype={
i(a){return"Exception: "+this.a}}
A.fM.prototype={
i(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.k.prototype={
b4(a,b,c,d){var s,r
d.a(b)
A.u(this).H(d).h("1(1,k.E)").a(c)
for(s=this.gt(this),r=b;s.k();)r=c.$2(r,s.gm())
return r},
gn(a){var s,r=this.gt(this)
for(s=0;r.k();)++s
return s},
gaf(a){var s,r=this.gt(this)
if(!r.k())throw A.c(A.jr())
s=r.gm()
if(r.k())throw A.c(A.ki())
return s},
di(a,b){var s,r
A.u(this).h("z(k.E)").a(b)
for(s=this.gt(this);s.k();){r=s.gm()
if(b.$1(r))return r}throw A.c(A.jr())},
O(a,b){var s,r
A.hC(b,"index")
s=this.gt(this)
for(r=b;s.k();){if(r===0)return s.gm();--r}throw A.c(A.h0(b,b-r,this,"index"))},
i(a){return A.lW(this,"(",")")}}
A.a4.prototype={
i(a){return"MapEntry("+A.o(this.a)+": "+A.o(this.b)+")"}}
A.W.prototype={
gF(a){return A.w.prototype.gF.call(this,0)},
i(a){return"null"}}
A.w.prototype={$iw:1,
R(a,b){return this===b},
gF(a){return A.en(this)},
i(a){return"Instance of '"+A.eo(this)+"'"},
gD(a){return A.jZ(this)},
toString(){return this.i(this)}}
A.fh.prototype={
i(a){return""},
$ibj:1}
A.eD.prototype={
gn(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.hh.prototype={
i(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.je.prototype={
$1(a){return this.a.aU(this.b.h("0/?").a(a))},
$S:6}
A.jf.prototype={
$1(a){if(a==null)return this.a.bU(new A.hh(a===undefined))
return this.a.bU(a)},
$S:6}
A.j_.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.l9(a))return a
s=this.a
a.toString
if(s.aj(a))return s.q(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.m(A.aM(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.bI(!0,"isUtc",t.y)
return new A.bq(r,0,!0)}if(a instanceof RegExp)throw A.c(A.j("structured clone of RegExp",null))
if(a instanceof Promise)return A.oe(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.b1(p,p)
s.C(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.cj(n),p=s.gt(n);p.k();)m.push(A.ci(p.gm()))
for(l=0;l<s.gn(n);++l){k=s.q(n,l)
if(!(l<m.length))return A.h(m,l)
j=m[l]
if(k!=null)o.C(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.C(0,a,o)
h=A.a(a.length)
for(s=J.cj(i),l=0;l<h;++l)o.push(this.$1(s.q(i,l)))
return o}return a},
$S:59}
A.hD.prototype={}
A.c3.prototype={
u(){return"QualityProfileKind."+this.b}}
A.an.prototype={}
A.fy.prototype={}
A.fz.prototype={}
A.c8.prototype={
u(){return"ToneMappingMode."+this.b}}
A.cV.prototype={
v(){var s,r,q,p
for(s=A.m_(["exposure",this.a,"bloomStrength",0,"ssaoStrength",0,"depthOfFieldStrength",0,"vignette",this.e,"grain",this.f,"rainIntensity",0,"surfaceWetness",0,"surfaceSnowCoverage",0,"surfaceDissolution",0,"rainWindowVisibility",1,"ditherStrength",0,"colorGradeStrength",0,"affineWarpStrength",0,"vertexSnapGrid",0,"vhsChromaWeight",0,"vhsTrackingWeight",0,"vhsNoiseWeight",0,"vhsHeadSwitchWeight",0,"vhsDropoutWeight",0,"vhsGhostWeight",0],t.N,t.i),s=new A.aY(s,A.u(s).h("aY<1,2>")).gt(0);s.k();){r=s.d
q=r.a
p=r.b
if(!isFinite(p)||p<0)throw A.c(A.j("PostProcessState."+q+" must be >= 0: "+A.o(p),null))}}}
A.co.prototype={
gbY(){var s,r=this,q=r.x
if(q===$){s=r.b.bX()
r.x!==$&&A.lm()
r.x=s
q=s}return q},
v(){var s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=i.d
if(!g.gG(0))throw A.c(A.j("CameraView.eye must be finite: "+g.i(0),h))
g=i.e
if(!g.gG(0)||g.ga_()<1e-12)throw A.c(A.j("CameraView.forward must be finite and nonzero: "+g.i(0),h))
g=i.f
if(isFinite(g)){s=i.r
s=!isFinite(s)||g<=0||s<=g}else s=!0
if(s)throw A.c(A.j("CameraView requires 0 < near < far, got "+A.o(g)+"/"+i.r,h))
g=i.w
if(!isFinite(g)||g<=0)throw A.c(A.j("CameraView.aspect must be finite and > 0: "+A.o(g),h))
g=i.a
if(!g.gG(0)||!i.b.gG(0)||!i.c.gG(0))throw A.c(A.j("CameraView matrices must be finite",h))
for(s=i.c.a,r=s.length,g=i.b.B(0,g).a,q=g.length,p=0,o=-1,n=0;n<16;++n){if(!(n<r))return A.h(s,n)
m=s[n]
if(!(n<q))return A.h(g,n)
l=g[n]
k=Math.abs(m-l)/(1+Math.abs(l))
if(k>p){o=n
p=k}}if(p>0.0001){m=B.n.dT(p,2)
l=B.i.Z(o,4)
j=B.i.bh(o,4)
if(!(o>=0&&o<r))return A.h(s,o)
s=s[o]
if(!(o<q))return A.h(g,o)
throw A.c(A.j("CameraView.viewProjection must equal projection * view. Worst relative mismatch "+m+" at column "+l+" row "+j+" (got "+A.o(s)+", expected "+A.o(g[o])+"). Prefer CameraView.look/lookAt/fromMatrices, which derive it.",h))}}}
A.cz.prototype={
v(){var s,r,q,p,o,n,m,l,k,j=this,i=null
if(!j.a.gG(0)||!B.v.gG(0)||!j.fx.gG(0)||!B.L.gG(0)||!B.v.gG(0))throw A.c(A.j("FrameEnvironment colors must be finite",i))
s=isFinite(0)
if(s)r=!isFinite(1)
else r=!0
if(r)throw A.c(A.j("FrameEnvironment requires fogEnd >= fogStart, got 0/1",i))
r=j.fy
if(!isFinite(r))throw A.c(A.j("FrameEnvironment.ambientIntensity must be >= 0: "+r,i))
r=j.go
if(r!=null){q=r.a
if(!q.gG(0)||q.ga_()<1e-12)A.m(A.j("DirectionalLight.direction must be finite and nonzero: "+q.i(0),i))
r=r.c
if(!isFinite(r)||r<0)A.m(A.j("DirectionalLight.intensity must be >= 0: "+A.o(r),i))}for(r=j.id,q=r.length,p=0;p<q;++p){o=r[p]
n=o.b
if(!(isFinite(n.a)&&isFinite(n.b)&&isFinite(n.c)))A.m(A.j("PointLight.position must be finite: "+n.i(0),i))
n=o.d
if(!isFinite(n)||n<0)A.m(A.j("PointLight.intensity must be >= 0: "+A.o(n),i))
n=o.e
if(!isFinite(n)||n<=0)A.m(A.j("PointLight.radius must be > 0: "+n,i))}for(r=isFinite(1),q=isFinite(-1),p=0;!1;++p){if(s)n=r
else n=!1
if(!n)A.m(A.j("SpotLight.position must be finite: "+B.l.i(0),i))
if(s)n=q
else n=!1
if(!n)A.m(A.j("SpotLight.direction must be finite and nonzero: "+B.t.i(0),i))}q=t.N
m=A.ak(q)
for(p=0;!1;++p){l=B.aw[p]
l.v()
if(!m.j(0,l.gA()))throw A.c(A.j("FrameEnvironment.volumetricSources contains duplicate id: "+A.o(l.gA()),i))}n=!0
if(isFinite(0.02))if(s)if(isFinite(0.7))if(isFinite(0.35))if(r)s=!isFinite(0.003)
else s=n
else s=n
else s=n
else s=n
else s=n
if(s)throw A.c(A.j("invalid volumetric medium controls",i))
k=A.ak(q)
for(p=0;!1;++p){l=B.ax[p]
l.v()
if(!k.j(0,l.gA()))throw A.c(A.j("FrameEnvironment.thermalSources contains duplicate id: "+A.o(l.gA()),i))}}}
A.fO.prototype={}
A.fP.prototype={
b8(a){++this.b}}
A.b3.prototype={
R(a,b){if(b==null)return!1
return J.dI(b)===A.jZ(this)&&b instanceof A.b3&&this.a===b.a&&this.b===b.b},
gF(a){return A.c0(A.jZ(this),this.a,this.b,B.h,B.h,B.h)}}
A.am.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MeshHandle(#"+this.a+"."+this.b+s+")"}}
A.ap.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"TextureHandle(#"+this.a+"."+this.b+s+")"}}
A.aL.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MaterialHandle(#"+this.a+"."+this.b+s+")"}}
A.ek.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"PipelineHandle(#"+this.a+"."+this.b+s+")"}}
A.bd.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.bX.prototype={
u(){return"HandleRejection."+this.b}}
A.h_.prototype={
i(a){return"HandleException("+this.a.b+", "+this.b.i(0)+")"}}
A.c2.prototype={
i(a){var s=this.b,r=this.a.a
return s==null?r.b+": ok":r.b+": "+A.o(s)}}
A.dM.prototype={}
A.j0.prototype={
$1(a){return t.W.a(a)===this.a},
$S:62}
A.ac.prototype={
gG(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
R(a,b){if(b==null)return!1
return b instanceof A.ac&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gF(a){return A.c0(this.a,this.b,this.c,B.h,B.h,B.h)},
i(a){return"LinearColor("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.dU.prototype={}
A.bw.prototype={}
A.ai.prototype={}
A.jg.prototype={
$2(a,b){var s,r=t.fk
r.a(a)
s=B.n.E(r.a(b).a,a.a)
return s===0?0:s},
$S:15}
A.fu.prototype={
u(){return"AlphaMode."+this.b}}
A.e9.prototype={
u(){return"MaterialMapColorSpace."+this.b}}
A.aF.prototype={
v(){var s,r,q,p,o,n=this,m=null
if(n.a.length===0)throw A.c(A.j("MaterialDefinition.key must not be empty",m))
if(!isFinite(0))throw A.c(A.j("MaterialDefinition.emissiveStrength must be >= 0: 0",m))
if(!isFinite(1))throw A.c(A.j("MaterialDefinition.normalStrength must be >= 0: 1",m))
A.e8("roughness",n.at)
A.e8("metallic",n.ax)
A.e8("occlusionStrength",1)
A.e8("clearcoatStrength",n.ch)
A.e8("clearcoatRoughness",n.CW)
for(s=[new A.af("uvScaleU",1),new A.af("uvScaleV",1),new A.af("uvOffsetU",0),new A.af("uvOffsetV",0),new A.af("tintR",n.d),new A.af("tintG",n.e),new A.af("tintB",n.f)],r=0;r<7;++r){q=s[r]
p=q.a
o=q.b
if(!isFinite(o))throw A.c(A.j("MaterialDefinition."+p+" must be finite: "+A.o(o),m))}if(!isFinite(0.5))throw A.c(A.j("MaterialDefinition.alphaCutoff must be in (0, 1]: 0.5",m))}}
A.b8.prototype={
u(){return"VertexAttributeKind."+this.b}}
A.a6.prototype={}
A.hY.prototype={
v(){var s,r,q,p,o='VertexLayoutDescriptor "surfaceV2": attribute '
for(s=0;s<7;++s){r=B.y[s]
q=r.c
if(q<=0)throw A.c(A.j(o+r.a.i(0)+" must have a positive floatCount",null))
p=r.b
q=p+q
if(q>18)throw A.c(A.j(o+r.a.i(0)+" range ["+p+", "+q+") exceeds stride 18",null))}q=t.fg.a(new A.hZ())
for(p=B.b.gt(B.y),q=new A.F(p,q,t.an);q.k();)if(p.gm().c!==4)throw A.c(A.j('VertexLayoutDescriptor "surfaceV2": tangent4 must contain 4 floats',null))}}
A.hZ.prototype={
$1(a){return t.G.a(a).a===B.ah},
$S:7}
A.bh.prototype={
v(){var s,r,q,p,o,n=this
n.a.v()
s=n.b.length
if(B.i.bh(s,18)!==0)throw A.c(A.j("MeshData.vertices length "+s+" is not a multiple of stride 18",null))
n.d4()
r=s/18|0
for(s=A.m3(n.c),q=s.length,p=0;p<q;++p){o=s[p]
if(o>=r)throw A.c(A.j("MeshData index "+o+" out of range for "+r+" vertices",null))}s=n.d
q=s.a
if(q.gG(0)&&s.b.gG(0)){s=s.b
s=q.a<=s.a&&q.b<=s.b&&q.c<=s.c}else s=!1
if(!s)throw A.c(A.j("MeshData.localBounds must be a valid AABB",null))},
d4(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=null,a2=t.fg,a3=t.fl,a4=new A.Z(B.y,a2.a(new A.hb()),a3)
if(!a4.gt(0).k())return
s=new A.Z(B.y,a2.a(new A.hc()),a3)
if(s.gn(0)!==1)throw A.c(A.j("surface-v2 tangent data requires one normal slot",a1))
r=a4.gaf(0)
for(a2=this.b,a3=a2.length,q=a3/18|0,p=t.n,o=s.gaf(0).b,n=r.b,m=0;m<q;++m){l=m*18
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
if(!B.b.aB(A.e([j,h,g,f,e,d,c],p),new A.hd()))throw A.c(A.j("surface-v2 tangent basis must be finite",a1))
if(b<1e-8||a<1e-8)throw A.c(A.j("surface-v2 tangent basis must be non-zero",a1))
a0=(j*f+h*e+g*d)/Math.sqrt(b*a)
if(Math.abs(a0)>0.05)throw A.c(A.j("surface-v2 tangent must be orthogonal to its normal: "+A.o(a0),a1))
if(Math.abs(Math.abs(c)-1)>0.05)throw A.c(A.j("surface-v2 tangent handedness must be -1 or +1: "+A.o(c),a1))}}}
A.hb.prototype={
$1(a){return t.G.a(a).a===B.ah},
$S:7}
A.hc.prototype={
$1(a){return t.G.a(a).a===B.aZ},
$S:7}
A.hd.prototype={
$1(a){return isFinite(A.iz(a))},
$S:12}
A.fD.prototype={}
A.hk.prototype={
v(){var s=this.a,r=s.a
if(!r.p(0,"sceneColor")||!r.p(0,"present"))throw A.c(A.j("resource plan must contain sceneColor and present",null))
if(s.d5(0,new A.hm()))throw A.c(A.j("resource plan contains an empty resource ID",null))
if(this.b!==r.p(0,"vhsOutput"))throw A.c(A.j("resource history does not match vhsOutput ownership",null))}}
A.hm.prototype={
$1(a){return A.aS(a).length===0},
$S:8}
A.hz.prototype={}
A.es.prototype={
bW(a){var s=this
if(s.d)A.m(A.l("resource assembler is disposed"))
if(s.a!=null)throw A.c(A.l("resource assembler is initialized"))
a.v()
s.a=a
s.c=1},
a4(){if(this.d)return
this.d=!0
this.a=null}}
A.cx.prototype={
u(){return"DrawMode."+this.b}}
A.fw.prototype={
u(){return"BlendMode."+this.b}}
A.c5.prototype={}
A.hS.prototype={
i(a){var s=this
return"SurfaceMetrics(css "+s.a+"x"+s.b+", pixels "+s.c+"x"+s.d+", dpr "+A.o(s.e)+", visible: true)"},
v(){var s,r=this
if(r.a<0||r.b<0)throw A.c(A.j("SurfaceMetrics css size must be >= 0",null))
if(r.c<0||r.d<0)throw A.c(A.j("SurfaceMetrics pixel size must be >= 0",null))
s=r.e
if(!isFinite(s)||s<=0)throw A.c(A.j("SurfaceMetrics.devicePixelRatio must be finite and > 0: "+A.o(s),null))}}
A.fx.prototype={
u(){return"ColorEncoding."+this.b}}
A.d_.prototype={
v(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.bV(B.d5)
if(o.a!==0)A.m(A.aC(o,r,"contains unknown pipeline features"))
if(q.a===B.aG&&p.gbZ(p))A.m(A.aC(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.c(A.j("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.c(A.j("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.c4.prototype={
u(){return"RendererState."+this.b}}
A.P.prototype={}
A.fQ.prototype={
i(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.b+" tris="+s.c+" culled="+s.d+" gpu="+s.r+"B)"}}
A.ea.prototype={
dG(a){return this.a.aZ(a)}}
A.ha.prototype={
$3(a,b,c){return new A.aL(A.a(a),A.a(b),A.bF(c))},
$S:20}
A.eK.prototype={}
A.he.prototype={
bQ(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.b,d=A.kG(f,new A.dZ(e.byteLength,B.an,B.bs))
if(f.b!==B.d)A.m(A.l(g))
s=A.t(d.a)
r=f.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.ay(f)
A.ar(f,p)
if(f.b!==B.d)A.m(A.l(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=A.ak(t.S)
for(n=a.a,m=0;m<7;++m){l=B.y[m]
k=A.ld(l.a)
if(!o.j(0,k))continue
j=A.nc(n,k,l)
if(f.b!==B.d)A.m(A.l(g))
r.vertexAttribPointer.apply(r,[k,j,A.a(q.WebGL2RenderingContext.FLOAT),!1,72,l.b*4])
if(f.b!==B.d)A.m(A.l(g))
r.enableVertexAttribArray(k)}i=a.c
h=A.kG(f,new A.dZ(A.ks(i),B.an,B.am))
if(f.b!==B.d)A.m(A.l(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),A.t(h.a))
A.mE(f,h,t.bW.a(i))
f=i.length
return new A.eK(d,h,p,f,e.length/18|0,!1)},
dA(a){var s=this.c.q(0,a.a)
if(s==null)throw A.c(A.bc(B.K,a))
this.b.aZ(a)
return s},
bc(){var s,r,q,p
for(s=this.b.ab(),r=s.$ti,s=new A.aI(s.a(),r.h("aI<1>")),q=this.c,r=r.c;s.k();){p=s.b
if(p==null)p=r.a(p)
q.C(0,p.a.a,this.bQ(p.b))}},
gan(){return this.b.ab().b4(0,0,new A.hg(),t.S)}}
A.hf.prototype={
$3(a,b,c){return new A.am(A.a(a),A.a(b),A.bF(c))},
$S:21}
A.hg.prototype={
$2(a,b){var s,r
A.a(a)
s=t.ai.a(b).b
r=s.b.byteLength
s=A.ks(s.c)
return a+r+s},
$S:14}
A.eG.prototype={
U(a){var s=this.a,r=A.kH(s,B.b4)
A.kI(s,r,0,a)
return r},
dC(a){var s=this.d
s===$&&A.aU()
return s},
dK(a){var s=this.e
s===$&&A.aU()
return s},
dM(a){var s=this.f
s===$&&A.aU()
return s},
dE(a){var s=this.r
s===$&&A.aU()
return s},
dI(a){var s=this.w
s===$&&A.aU()
return s},
a4(){var s,r,q,p,o,n=this
for(s=n.c,r=new A.b_(s,s.r,s.e,A.u(s).h("b_<2>")),q=n.a,p=q.a,o=t.R;r.k();)p.deleteTexture(o.a(r.d.a).a)
s.V(0)
s=n.d
s===$&&A.aU()
A.eO(q,s)
s=n.e
s===$&&A.aU()
A.eO(q,s)
s=n.f
s===$&&A.aU()
A.eO(q,s)
s=n.r
s===$&&A.aU()
A.eO(q,s)
s=n.w
s===$&&A.aU()
A.eO(q,s)},
bc(){var s,r,q,p,o,n,m,l,k,j=this
j.d=j.U($.k7())
j.e=j.U($.k4())
j.f=j.U($.k5())
j.r=j.U($.k3())
j.w=j.U($.k6())
for(s=j.b.ab(),r=s.$ti,s=new A.aI(s.a(),r.h("aI<1>")),q=j.c,p=j.a,r=r.c;s.k();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
if(m.gc0().aB(0,new A.hV()))continue
l=A.kH(p,m.gl())
for(k=0;B.i.aE(k,m.gc0().length);++k){o=m.gc0()
if(!(k<o.length))return A.h(o,k)
A.kI(p,l,k,o[k])}if(m.ge2())A.mG(p,l)
q.C(0,n.a,l)}},
gan(){return this.b.ab().b4(0,0,new A.hU(),t.S)}}
A.hT.prototype={
$3(a,b,c){return new A.ap(A.a(a),A.a(b),A.bF(c))},
$S:24}
A.hV.prototype={
$1(a){return!1},
$S:25}
A.hU.prototype={
$2(a,b){var s
A.a(a)
s=t.dU.a(b).b.gl()
return B.i.T(a,s.ge6().B(0,s.ge_()).B(0,s.ge0()).B(0,4))},
$S:26}
A.jh.prototype={
$2(a,b){var s,r=t.eS
r.a(a)
s=J.k9(r.a(b).a,a.a)
return s},
$S:27}
A.hj.prototype={
gb3(){var s=this,r=Math.cos(s.d),q=Math.sin(s.d),p=Math.sin(s.c),o=Math.cos(s.c),n=s.a,m=s.b
return n.T(0,new A.i(r*p*m,q*m,r*o*m))},
gc4(){return this.a.ag(0,this.gb3()).gS().a3(B.l).gS()},
dV(a){var s,r,q,p=this
if(a<=0)return
s=B.n.ai(1-Math.exp(-10*a),0,1)
r=p.c
p.c=r+(p.as-r)*s
r=p.d
p.d=r+(p.at-r)*s
r=p.b
p.b=r+(p.ax-r)*s
r=p.ay
q=p.a
p.a=q.T(0,r.ag(0,q).B(0,s))}}
A.bt.prototype={
gdm(){return this.b.length}}
A.dW.prototype={
dc(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h
t.U.a(a)
s=new A.hG(A.e([],t.cU),A.ak(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p)r[p].K(s,b)
o=s.da(a,!1)
if(o.b.length!==0)return new A.dX(o,B.c0)
q=o.a
n=A.H(q)
m=new A.ae(q,n.h("v(1)").a(new A.fI()),n.h("ae<1,v>")).ae(0)
l=A.e([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p){k=r[p]
for(n=k.J(d),j=n.length,i=0;i<n.length;n.length===j||(0,A.A)(n),++i){h=n[i]
if(!m.p(0,h.gl().a))throw A.c(A.l('RenderFeature "'+k.gA()+'" created a pass "'+h.gl().a+'" that it never declared into the graph'))
B.b.j(l,h)}}B.b.a6(l,new A.fJ(o))
return new A.dX(o,l)}}
A.fI.prototype={
$1(a){return t.z.a(a).a},
$S:28}
A.fJ.prototype={
$2(a,b){var s=t.fA
s.a(a)
s.a(b)
s=this.a.a
return B.i.E(B.b.b5(s,new A.fG(a)),B.b.b5(s,new A.fH(b)))},
$S:29}
A.fG.prototype={
$1(a){return t.z.a(a).a===this.a.gl().a},
$S:4}
A.fH.prototype={
$1(a){return t.z.a(a).a===this.a.gl().a},
$S:4}
A.dX.prototype={}
A.bV.prototype={
u(){return"FrameQueueState."+this.b}}
A.dY.prototype={$imj:1}
A.fN.prototype={
d8(a){if(a.length===0)throw A.c(A.aC(a,"passId",null))
this.b=a
this.a.ba(a,A.lg())},
ce(){var s,r,q,p,o=t.A
o=A.b1(o,o)
for(s=this.a,s=new A.aY(s,A.u(s).h("aY<1,2>")).gt(0);s.k();){r=s.d
q=r.a
p=r.b
o.C(0,q,new A.P(p.a,p.b,p.d))}return A.kg(o,t.N,t.o)},
a9(a,b){var s,r=this.b
if(r==null)throw A.c(A.l("draw recorded outside an active render pass"))
if(b<1)throw A.c(A.j("draw count and instance count must be positive",null))
s=this.a.q(0,r);++s.a
s.d+=b
s.b=s.b+B.i.Z(a,3)*b}}
A.cc.prototype={}
A.E.prototype={
gac(){var s=this.c,r=A.H(s)
return new A.Z(s,r.h("z(1)").a(new A.hn()),r.h("Z<1>"))},
gaq(){var s=this.c,r=A.H(s)
return new A.Z(s,r.h("z(1)").a(new A.ho()),r.h("Z<1>"))},
i(a){return"PassDeclaration("+this.a+" @ "+this.b.i(0)+")"}}
A.hn.prototype={
$1(a){var s=t.L.a(a).b
return s===B.c||s===B.r},
$S:9}
A.ho.prototype={
$1(a){return t.L.a(a).b===B.e},
$S:9}
A.aE.prototype={
u(){return"GraphValidationFailureKind."+this.b}}
A.a3.prototype={
i(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.eq.prototype={
u(){return"ResourceFormat."+this.b}}
A.aW.prototype={
u(){return"GraphStage."+this.b}}
A.L.prototype={
c1(){var s=this
return new A.L(s.a,s.b,s.c,s.d,s.e,s.f+1)},
R(a,b){var s=this
if(b==null)return!1
return b instanceof A.L&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gF(a){var s=this
return A.c0(s.a,s.b,s.c,s.d,s.e,s.f)},
i(a){var s=this,r=s.b.i(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.d1.prototype={
u(){return"ResourceAccess."+this.b}}
A.n.prototype={}
A.cs.prototype={}
A.hB.prototype={
L(a){var s,r,q,p,o,n,m=this
a.v()
s=null
try{r=a.d.ga5()
r=A.ax(r,A.u(r).h("k.E"))
q=t.dy
s=A.mH(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.bN(p) instanceof A.d4){++m.e
throw p}else throw p}o=new A.cs(s)
r=m.b
q=a.a
n=r.q(0,q)
r.C(0,q,o);++m.d
if(n!=null)m.a.a.deleteProgram(A.t(n.b.a))
return o},
cI(a){var s,r
t.cr.a(a)
for(s=a.a,s=new A.b_(s,s.r,s.e,a.$ti.h("b_<1>")),r=this.a.a;s.k();)r.deleteProgram(A.t(s.d.b.a))}}
A.a0.prototype={
v(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.c(A.j("ProgramSource.id must not be empty",m))
s=t.S
r=A.ak(s)
for(q=this.d.gak(),q=q.gt(q);q.k();){p=q.gm()
o=p.b
if(o<0)throw A.c(A.j('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.j(0,o))throw A.c(A.j('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.ak(s)
for(s=this.e.gak(),s=s.gt(s);s.k();){q=s.gm()
p=q.b
if(p<0)throw A.c(A.j('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.j(0,p))throw A.c(A.j('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.hE.prototype={}
A.X.prototype={
M(){var s=this
return A.lN(B.b1,s.f,B.D,B.z,!0,!0,!0,!0,s.r,B.F,B.G,s.d,s.e,!0,!1,!1)}}
A.hG.prototype={
da(a,b){var s=this.d3(t.U.a(a),!1),r=this.a,q=A.H(r)
return new A.hF(A.h6(new A.Z(r,q.h("z(1)").a(new A.hL()),q.h("Z<1>")),t.z),s)},
d3(a,b){var s,r,q,p,o,n,m=this
t.U.a(a)
s=A.e([],t.b7)
r=m.a
q=A.H(r)
p=q.h("Z<1>")
o=A.ax(new A.Z(r,q.h("z(1)").a(new A.hK()),p),p.h("k.E"))
m.cs(o,a,s)
m.cw(o,s)
m.cA(o,s)
m.cv(o,!1,s)
n=m.cC(o,s)
m.cz(o,n,s)
m.cB(o,s)
m.cu(o,n,s)
m.ct(o,s)
return s},
cs(a,b,c){var s,r,q,p
t.O.a(a)
t.U.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
p=B.a3.bV(b)
if(p.a!==0)B.b.j(c,new A.a3(B.bF,q.a,"missing capabilities: "+p.du(0,", ")))}},
cw(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gac(),o=J.a_(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gm().a
if(m.e>1)B.b.j(b,new A.a3(B.bA,n,"reads multisampled resource "+m.i(0)+" directly; resolve before sampling"))}}},
cA(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.H(a),r=s.h("z(1)").a(new A.hJ()),q=B.b.gt(a),s=new A.F(q,r,s.h("F<1>"));s.k();){r=q.gm()
p=r.gac()
o=A.ax(p,p.$ti.h("k.E"))
p=r.gaq()
n=A.ax(p,p.$ti.h("k.E"))
if(o.length!==1||n.length!==1){B.b.j(b,new A.a3(B.V,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.b.gaf(o).a
l=B.b.gaf(n).a
if(m.e<=1||l.e>1)B.b.j(b,new A.a3(B.V,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.b.j(b,new A.a3(B.V,r.a,"resolve source and destination must match format and extent"))}},
cv(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.A)(p),++m){l=p[m]
if(l.b===B.r)B.b.j(c,new A.a3(B.bD,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
cC(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.b1(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.A)(a),++q){p=a[q]
for(o=p.gaq(),n=J.a_(o.a),o=new A.F(n,o.b,o.$ti.h("F<1>")),m=p.a;o.k();){l=n.gm().a
k=l.a+"#"+l.f
j=s.q(0,k)
if(j!=null){B.b.j(b,new A.a3(B.bz,m,l.i(0)+" already written by "+j.a))
continue}s.C(0,k,p)}}return s},
cz(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gac(),p=J.a_(q.a),q=new A.F(p,q.b,q.$ti.h("F<1>")),o=r.a;q.k();){n=p.gm()
if(n.b===B.r)continue
n=n.a
m=b.q(0,n.a+"#"+n.f)
if(m==null){B.b.j(c,new A.a3(B.as,o,"reads "+n.i(0)+" but no pass writes that version"))
continue}if(B.b.dk(a,m)>s)B.b.j(c,new A.a3(B.as,o,"reads "+n.i(0)+" before writer "+m.a+" runs"))}}},
cB(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gac(),o=J.a_(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gm()
if(m.b===B.r)continue
for(l=q.gaq(),k=J.a_(l.a),l=new A.F(k,l.b,l.$ti.h("F<1>")),m=m.a,j=m.a,i=m.f;l.k();){h=k.gm().a
if(j===h.a&&i===h.f)B.b.j(b,new A.a3(B.bC,n,"reads and writes "+m.i(0)+" at the same version; declare a ping-pong version bump"))}}}},
cu(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gac(),o=J.a_(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gm()
if(m.b===B.r)continue
l=m.a
k=b.q(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gaq().di(0,new A.hI(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.b.j(c,new A.a3(B.bB,n,"reads "+l.i(0)+" but writer "+k.a+" produced "+j.i(0)))}}},
ct(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.b1(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gaq(),o=J.a_(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>"));p.k();){n=o.gm().a
r.C(0,n.a+"#"+n.f,q)}m=J.jt(p,t.cJ)
for(l=0;l<p;++l)m[l]=A.ak(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gac(),p=J.a_(s.a),s=new A.F(p,s.b,s.$ti.h("F<1>"));s.k();){o=p.gm()
if(o.b===B.r)continue
o=o.a
k=r.q(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.h(m,k)
m[k].j(0,q)}}p=t.y
j=A.h4(s,!1,!1,p)
s=a.length
i=A.h4(s,!1,!1,p)
h=new A.hH(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.h(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.h(a,q)
B.b.j(b,new A.a3(B.bE,a[q].a,"participates in a resource dependency cycle"))}}}}
A.hL.prototype={
$1(a){t.z.a(a)
return A.jy()},
$S:4}
A.hK.prototype={
$1(a){t.z.a(a)
return A.jy()},
$S:4}
A.hJ.prototype={
$1(a){return t.z.a(a).f},
$S:4}
A.hI.prototype={
$1(a){var s=t.L.a(a).a,r=this.a.a
return s.a===r.a&&s.f===r.f},
$S:9}
A.hH.prototype={
$1(a){var s,r,q,p,o=this,n=o.a
if(!(a>=0&&a<n.length))return A.h(n,a)
if(n[a])return!0
s=o.b
if(!(a<s.length))return A.h(s,a)
if(s[a])return!1
B.b.C(n,a,!0)
r=o.c
if(!(a<r.length))return A.h(r,a)
r=r[a]
r=A.jH(r,r.r,A.u(r).c)
q=r.$ti.c
while(r.k()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.b.C(n,a,!1)
B.b.C(s,a,!0)
return!1},
$S:32}
A.hF.prototype={}
A.f3.prototype={$iao:1,
gA(){return this.a},
gl(){return this.b},
gbg(){return this.c}}
A.cZ.prototype={
bR(a){var s,r,q=a.c,p=q.a
if(!p.gG(0))A.m(A.j("Transform.translation must be finite: "+p.i(0),null))
p=q.b
if(!(isFinite(p.a)&&isFinite(p.b)&&isFinite(p.c)&&isFinite(p.d)))A.m(A.j("Transform.rotation must be finite: "+p.i(0),null))
p=q.c
if(!isFinite(p)||p<=0)A.m(A.j(u.f+p,null))
s=this.a.aZ(a.a)
q=q.a0()
p=s.d.gaW()
r=A.H(p)
return A.jp(new A.ae(p,r.h("i(1)").a(q.gbf()),r.h("ae<1,i>")))},
gc_(){return new A.aR(this.dt(),t.eM)},
dt(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d
return function $async$gc_(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b.ab(),n=o.$ti,o=new A.aI(o.a(),n.h("aI<1>")),m=s.a,l=m.$ti,k=l.c,j=m.b,n=n.c,l=l.y[1]
case 3:if(!o.k()){r=4
break}i=o.b
if(i==null)i=n.a(i)
h=i.a
g=i.b
i=g.c
i.v()
f=k.a(g.a)
m.a7(f)
f=f.a
if(!(f>=0&&f<j.length)){A.h(j,f)
r=1
break}e=j[f].c
f=(e==null?l.a(e):e).d
i=i.a0()
f=f.gaW()
d=A.H(f)
r=5
return a.b=new A.f3(h,g,A.jp(new A.ae(f,d.h("i(1)").a(i.gbf()),d.h("ae<1,i>")))),1
case 5:r=3
break
case 4:case 1:return 0
case 2:return a.c=p.at(-1),3}}}},
$imm:1}
A.hM.prototype={
$3(a,b,c){return new A.bd(A.a(a),A.a(b),A.bF(c))},
$S:33}
A.er.prototype={
bb(a,b){var s,r
if(this.x)A.m(A.l("resource library is disposed"))
s=this.a
a.v()
r=s.b.aY(a,b)
s.c.C(0,r.a,s.bQ(a))
this.f.j(0,r)
return r},
ao(a){var s
if(this.x)A.m(A.l("resource library is disposed"))
a.v()
s=this.b.a.aY(a,null)
this.r.j(0,s)
return s},
a4(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
if(e.x)return
s=e.w
r=A.ax(s,A.u(s).c)
q=r.length
p=e.c
o=p.c
n=p.a.a
m=t.R
l=0
for(;l<r.length;r.length===q||(0,A.A)(r),++l){k=r[l]
j=o.ad(0,k.a)
if(j!=null)n.deleteTexture(m.a(j.a).a)
p.b.aD(k)}r=e.r
q=A.ax(r,A.u(r).c)
o=q.length
n=e.b.a
l=0
for(;l<q.length;q.length===o||(0,A.A)(q),++l)n.aD(q[l])
q=e.f
o=A.ax(q,A.u(q).c)
n=o.length
m=e.a
i=m.c
h=m.a.a
l=0
for(;l<o.length;o.length===n||(0,A.A)(o),++l){k=o[l]
g=i.ad(0,k.a)
if(g!=null){h.deleteVertexArray(A.t(g.c.a))
h.deleteBuffer(A.t(g.a.a))
f=g.b
if(f!=null)h.deleteBuffer(A.t(f.a))}m.b.aD(k)}s.V(0)
r.V(0)
q.V(0)
p.a4()
e.x=!0},
$imo:1}
A.ia.prototype={}
A.fi.prototype={$iao:1,
gA(){return this.a},
gl(){return this.b},
gbg(){return this.c}}
A.iR.prototype={
$1(a){var s=this.a.w.a.dA(a),r=s.b!=null,q=r?s.d:s.e
return new A.d0(s.c,r,q,s.f)},
$S:34}
A.iS.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.p(0,a))return this.b.x.gm().c2(a)
if(b!=null&&s.p(0,b))return this.b.x.gm().c2(b)
throw A.c(A.l("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:35}
A.iQ.prototype={
$0(){return this.a.$1("shadowMap")},
$S:1}
A.iJ.prototype={
$0(){return null},
$S:37}
A.iK.prototype={
$0(){var s=this.a.at
if(s==null)return B.W
return A.og(B.W,3,s.a.d,null)},
$S:38}
A.iP.prototype={
$0(){return this.a.$1("sceneDepth")},
$S:1}
A.iE.prototype={
$0(){return this.a.at.a},
$S:39}
A.iG.prototype={
$0(){return this.a.$2$fallback("ssaoRaw","sceneColor")},
$S:1}
A.iF.prototype={
$0(){return this.a.$2$fallback("ssaoBlurred","sceneColor")},
$S:1}
A.iO.prototype={
$0(){var s=this.b.d>1?"sceneColor#1":"sceneColor"
return this.a.$1(s)},
$S:1}
A.iC.prototype={
$0(){return this.a.$2$fallback("bloomBlurH","sceneColor")},
$S:1}
A.iD.prototype={
$0(){return this.a.$2$fallback("bloomBlurV","sceneColor")},
$S:1}
A.iL.prototype={
$0(){return this.a.$2$fallback("dofBlurH","sceneColor")},
$S:1}
A.iM.prototype={
$0(){return this.a.$2$fallback("dofBlurV","sceneColor")},
$S:1}
A.iN.prototype={
$0(){var s=this.a.w.c.d
s===$&&A.aU()
return s},
$S:1}
A.iI.prototype={
$0(){return this.a.$2$fallback("vhsOutput","sceneColor")},
$S:1}
A.iH.prototype={
$0(){return this.a.at.w},
$S:40}
A.iT.prototype={
$0(){return this.a},
$S:41}
A.iU.prototype={
$0(){return null},
$S:64}
A.ir.prototype={}
A.f7.prototype={$iml:1}
A.f0.prototype={$ilQ:1}
A.ev.prototype={
gY(){var s=this.w
return s==null?A.m(A.l("renderer is not initialized")):s},
dl(a,b){var s,r,q,p,o,n,m,l=this
if(l.e!==B.a_)throw A.c(A.l("renderer can only be initialized once"))
a.v()
b.v()
s=l.a
if(s.b===B.J)throw A.c(A.l("renderer device is context lost"))
l.e=B.cP
try{r=v.G
s.ah(A.a(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.ah(A.a(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.ah(A.a(r.WebGL2RenderingContext.MAX_SAMPLES))
s.ah(A.a(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.ah(A.a(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
q=s.r
if(q.p(0,"EXT_texture_filter_anisotropic"))s.bB(34047)
p=q.p(0,"EXT_disjoint_timer_query_webgl2")
s.w=p
q.p(0,"EXT_color_buffer_float")
q.p(0,"EXT_color_buffer_half_float")
q.p(0,"WEBGL_lose_context")
q=s.a
A.ci(q.getParameter(A.a(r.WebGL2RenderingContext.RENDERER)))
A.ci(q.getParameter(A.a(r.WebGL2RenderingContext.VENDOR)))
l.r=new A.hD(p)
r=l.b
o=A.hl(a)
q=r.a
if(q.a!=null)A.m(A.l("configuration state is already initialized"))
a.v()
q.a=a
A.hl(a)
q.d=1
r.b.bW(o)
r=A.m2()
l.w=new A.er(A.m4(s),r,A.ms(s),A.ak(t.cA),A.ak(t.eL),A.ak(t.aj))
r=new A.es()
q=new A.fU(s,r)
o=A.hl(a)
n=q.bu(o,a)
r.bW(o)
q.c=new A.em(new A.hz(o),n)
l.x=q
l.y=new A.hB(s,A.b1(t.N,t.dN))
l.as=a
A.l2(l)
l.e=B.a0}catch(m){s=l.y
if(s!=null){r=s.b
s.cI(new A.b0(r,A.u(r).h("b0<2>")))
r.V(0)}s=l.x
if(s!=null)s.a4()
s=l.w
if(s!=null)s.a4()
l.w=null
l.e=B.a_
throw m}s=new A.Q($.J,t.cd)
s.aI(null)
return s},
d6(a,b){var s,r,q,p,o=this
o.cT()
o.av()
r=B.b.p(o.d,a)
if(!r)throw A.c(A.j("world was not created by this renderer",null))
if(o.at!=null)throw A.c(A.l("renderer.beginFrame called twice without end/abort"))
b.a.v()
b.b.v()
b.c.v()
r=b.w
if(!isFinite(r))A.m(A.j("FrameInput.timeSeconds must be finite: "+A.o(r),null))
o.at=b
o.ax=a
q=o.c
if(q.b===B.I)A.m(A.l("FrameQueue.beginFrame called twice without end/abort"))
q.b=B.I
q.c=0
B.b.V(q.a)
s=q
try{r=o.r
if((r==null?A.m(A.l("renderer is not initialized")):r).z)o.b$=o.a.d7()
return s}catch(p){if(q.b!==B.I)A.m(A.l("FrameQueue.abortFrame called without an active frame"))
q.c=0
q.b=B.bp
o.bm()
o.ax=o.at=null
throw p}},
dg(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
d.av()
s=d.at
r=d.ax
if(s==null||r==null)throw A.c(A.l("renderer.endFrame called without an active frame"))
m=d.c
if(m.b!==B.I)A.m(A.l("FrameQueue.endFrame called without an active frame"))
l=m.a
k=A.hR(l,0,A.bI(m.c,"count",t.S),A.H(l).c).c7(0,!1)
m.b=B.bo
q=k
try{p=A.nf(d,r,s,q)
o=p.a.ce()
m=o.gak()
l=A.u(m)
n=new A.cL(new A.Z(m,l.h("z(k.E)").a(new A.hN()),l.h("Z<k.E>")),l.h("P(k.E)").a(new A.hO()),l.h("cL<k.E,P>")).b4(0,B.bm,new A.hP(),t.o)
l=s.e
m=n.a
j=n.b
i=p.c
h=n.d
p.toString
g=d.w
f=g.a.gan()
g=g.c.gan()
e=d.w
e.a.gan()
e.c.gan()
d.w.toString
return new A.fQ(l,m,j,i,h,f+g)}finally{d.cO(s.e)
d.ax=d.at=null}},
cT(){var s,r,q,p=this
if(p.e!==B.a1)return
if(p.a.b===B.J)throw A.c(A.l("renderer context remains lost"))
s=p.w
if(s.x)A.m(A.l("resource library is disposed"))
s.a.bc()
s.c.bc()
s=p.x
s.toString
r=p.as
r.toString
if(s.e)A.m(A.l("GPU resource adapter is disposed"))
q=s.c
if(q==null)A.m(A.l("GPU resource adapter is not initialized"))
s.c=new A.em(q.a,s.bu(A.hl(r),r))
s=p.y
s.c=null
s.b.V(0)
A.l2(p)
p.e=B.a0},
av(){var s=this,r=s.e
if(r!==B.a0)throw A.c(A.l("renderer is not ready: "+r.b))
if(s.a.b===B.J){s.cK()
s.e=B.a1
throw A.c(A.l("renderer context lost"))}},
$imq:1}
A.hN.prototype={
$1(a){t.ao.a(a)
return A.ok(a.a.toLowerCase(),"world",0)},
$S:43}
A.hO.prototype={
$1(a){return t.ao.a(a).b},
$S:44}
A.hP.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return new A.P(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:45}
A.f6.prototype={}
A.im.prototype={
cO(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.d)A.m(A.l(u.k))
r=s.bN(o)
if(r.b)A.m(A.l("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.b.j(p.a$,new A.f6(o))}catch(q){p.aM(o)}},
bm(){var s=this.b$
this.b$=null
if(s!=null)this.aM(s)},
cK(){var s,r,q
this.bm()
s=this.a$
r=J.kl(s.slice(0),A.H(s).c)
B.b.V(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.A)(r),++q)this.aM(r[q].b)},
aM(a){var s,r
try{s=this.a
s.a.deleteQuery(s.bN(a).a)}catch(r){}}}
A.fb.prototype={}
A.ex.prototype={
u(){return"ShadowCasterLod."+this.b}}
A.ah.prototype={
E(a,b){var s,r=this
t.fy.a(b)
s=B.i.E(r.a.a,b.a.a)
if(s!==0)return s
s=B.i.E(r.b.a,b.b.a)
if(s!==0)return s
s=B.i.E(r.c.a,b.c.a)
if(s!==0)return s
return B.i.E(r.d,b.d)},
$iaa:1}
A.ag.prototype={
E(a,b){var s
t.g0.a(b)
s=B.n.E(b.a,this.a)
if(s!==0)return s
return B.i.E(this.b,b.b)},
$iaa:1}
A.S.prototype={}
A.jl.prototype={
$2(a,b){var s=t.k
return s.a(a).a.E(0,s.a(b).a)},
$S:46}
A.jm.prototype={
$1(a){return t.k.a(a).b},
$S:47}
A.jj.prototype={
$2(a,b){var s=t.b
return s.a(a).a.E(0,s.a(b).a)},
$S:48}
A.jk.prototype={
$1(a){return t.b.a(a).b},
$S:49}
A.fC.prototype={}
A.fB.prototype={}
A.hA.prototype={
$6(a,b,c,d,e,f){var s=this.a,r=s.a.length/18|0,q=this.b
s.aa(a,e,f,new A.aP(0,0).B(0,q))
s.aa(b,e,f,new A.aP(1,0).B(0,q))
s.aa(c,e,f,new A.aP(1,1).B(0,q))
s.aa(d,e,f,new A.aP(0,1).B(0,q))
q=r+2
B.b.N(s.b,A.e([r,r+1,q,r,q,r+3],t.t))},
$S:50}
A.dl.prototype={
aa(a,b,c,d){B.b.N(this.a,A.e([a.a,a.b,a.c,b.a,b.b,b.c,c.a,c.b,c.c,1,1,1,1,0,1,d.a,d.b,0],t.n))},
aT(a){var s=new A.bh(B.bc,new Float32Array(A.p(this.a)),new Uint16Array(A.p(this.b)),a)
s.v()
return s}}
A.bP.prototype={
gaW(){var s,r,q,p=this.a,o=p.a,n=p.b
p=p.c
s=this.b
r=s.a
q=s.b
s=s.c
return A.e([new A.i(o,n,p),new A.i(r,n,p),new A.i(o,q,p),new A.i(r,q,p),new A.i(o,n,s),new A.i(r,n,s),new A.i(o,q,s),new A.i(r,q,s)],t.gi)},
i(a){return"Aabb("+this.a.i(0)+", "+this.b.i(0)+")"}}
A.bv.prototype={}
A.cA.prototype={
u(){return"FrustumTest."+this.b}}
A.fR.prototype={
dQ(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
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
if(h*g+e*f+i*d+a0<0)l=!0}return l?B.bq:B.br}}
A.fS.prototype={
$4(a,b,c,d){var s=new A.i(a,b,c),r=new A.bv(s,d),q=Math.sqrt(s.ga_())
return q<1e-9?r:new A.bv(s.B(0,1/q),d/q)},
$S:51}
A.b2.prototype={
B(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=new Float32Array(16)
for(s=this.a,r=s.length,q=b.a,p=q.length,o=0;o<4;++o)for(n=o*4,m=0;m<4;++m){for(l=0,k=0;k<4;++k){j=k*4+m
if(!(j<r))return A.h(s,j)
j=s[j]
i=n+k
if(!(i<p))return A.h(q,i)
l+=j*q[i]}j=n+m
if(!(j<16))return A.h(h,j)
h[j]=l}return new A.b2(h)},
c8(a){var s,r,q,p,o,n,m,l,k,j,i,h
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
return h===0||h===1?new A.i(k,j,i):new A.i(k/h,j/h,i/h)},
b9(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this.a,d=e.length
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
if(!isFinite(k)||Math.abs(k)<1e-12)A.m(A.l("Mat4.inverse3x3: singular upper-left 3x3 (det="+A.o(k)+")"))
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
return new A.b2(h)},
bX(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=J.jt(4,t.gN)
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
a1[p]=new Float64Array(A.p(A.e([o,n,m,l,k,j,i,p===3?1:0],s)))}for(h=0;h<4;h=p){s=a1[h]
if(!(h<s.length))return A.h(s,h)
g=Math.abs(s[h])
for(p=h+1,f=p,e=h;f<4;++f){r=a1[f]
if(!(h<r.length))return A.h(r,h)
d=Math.abs(r[h])
if(d>g){g=d
e=f}}if(!isFinite(g)||g<1e-12)throw A.c(A.l("Mat4.inverse: singular matrix"))
if(e!==h){if(!(e>=0&&e<4))return A.h(a1,e)
a1[h]=a1[e]
a1[e]=s}s=a1[h]
if(!(h<s.length))return A.h(s,h)
c=s[h]
for(b=0;b<8;++b){if(!(b<s.length))return A.h(s,b)
r=s[b]
s.$flags&2&&A.bo(s)
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
s.$flags&2&&A.bo(s)
s[b]=r-a*q}}}a0=new Float32Array(16)
for(p=0;p<4;++p)for(h=0;h<4;++h){s=h*4+p
r=a1[p]
q=4+h
if(!(q<r.length))return A.h(r,q)
q=r[q]
if(!(s<16))return A.h(a0,s)
a0[s]=q}return new A.b2(a0)},
gG(a){return B.Y.aB(this.a,new A.h9())},
i(a){return"Mat4("+A.o(this.a)+")"}}
A.h9.prototype={
$1(a){return isFinite(A.iz(a))},
$S:12}
A.cX.prototype={
i(a){var s=this
return"Quat("+A.o(s.a)+", "+A.o(s.b)+", "+A.o(s.c)+", "+A.o(s.d)+")"}}
A.aO.prototype={
v(){var s=this.a
if(!s.gG(0))throw A.c(A.j("Transform.translation must be finite: "+s.i(0),null))
s=this.b
if(!(isFinite(s.a)&&isFinite(s.b)&&isFinite(s.c)&&isFinite(s.d)))throw A.c(A.j("Transform.rotation must be finite: "+s.i(0),null))
s=this.c
if(!isFinite(s)||s<=0)throw A.c(A.j(u.f+s,null))},
a0(){var s,r,q,p,o,n,m,l,k,j,i,h=this.b,g=h.a,f=g*g,e=h.b,d=e*e,c=h.c,b=c*c,a=g*e,a0=g*c,a1=e*c
h=h.d
s=h*g
r=h*e
q=h*c
c=t.n
h=A.kp(A.e([1-2*(d+b),2*(a+q),2*(a0-r),0,2*(a-q),1-2*(f+b),2*(a1+s),0,2*(a0+r),2*(a1-s),1-2*(f+d),0,0,0,0,1],c)).a
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
return A.kp(A.e([g*p,o*p,n*p,0,m*p,l*p,k*p,0,j*p,i*p,h[10]*p,0,e.a,e.b,e.c,1],c))},
i(a){return"Transform("+this.a.i(0)+", "+this.b.i(0)+", scale="+this.c+")"}}
A.aP.prototype={
B(a,b){return new A.aP(this.a*b,this.b*b)},
gn(a){var s=this.a,r=this.b
return Math.sqrt(s*s+r*r)},
R(a,b){if(b==null)return!1
return b instanceof A.aP&&this.a===b.a&&this.b===b.b},
gF(a){return A.c0(this.a,this.b,B.h,B.h,B.h,B.h)},
i(a){return"Vec2("+A.o(this.a)+", "+A.o(this.b)+")"}}
A.i.prototype={
T(a,b){return new A.i(this.a+b.a,this.b+b.b,this.c+b.c)},
ag(a,b){return new A.i(this.a-b.a,this.b-b.b,this.c-b.c)},
B(a,b){return new A.i(this.a*b,this.b*b,this.c*b)},
b_(a){return this.a*a.a+this.b*a.b+this.c*a.c},
a3(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.i(s*r-q*p,q*o-n*r,n*p-s*o)},
ga_(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gn(a){return Math.sqrt(this.ga_())},
gG(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gS(){var s=this,r=Math.sqrt(s.ga_())
return r<1e-9?B.x:new A.i(s.a/r,s.b/r,s.c/r)},
R(a,b){if(b==null)return!1
return b instanceof A.i&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gF(a){return A.c0(this.a,this.b,this.c,B.h,B.h,B.h)},
i(a){return"Vec3("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.eS.prototype={
u(){return"_BloomBlurAxis."+this.b}}
A.cn.prototype={
gA(){return this.f},
K(a,b){B.b.j(a.a,new A.E(this.f,B.q,A.e([new A.n(this.x,B.c),new A.n(this.y,B.e)],t.C),!1))},
J(a){var s=this,r=s.a.L(new A.a0(s.e,s.b,s.c,B.m,B.aC,B.az)),q=A.ay(s.d),p=t.n,o=s.r===B.b_?new Float32Array(A.p(A.e([1/s.Q,0],p))):new Float32Array(A.p(A.e([0,1/s.as],p)))
p=s.y
return A.e([new A.eT(new A.X(s.f,A.e([new A.n(s.x,B.c),new A.n(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iB:1}
A.eT.prototype={
I(a){return},
$ix:1,
gl(){return this.a}}
A.dL.prototype={
gA(){return"bloomComposite"},
K(a,b){B.b.j(a.a,new A.E("bloomComposite",B.q,A.e([new A.n(this.f,B.c),new A.n(this.r,B.c),new A.n(this.w,B.e)],t.C),!1))},
J(a){var s=this,r="bloomComposite",q=s.a.L(new A.a0(r,s.b,s.c,B.m,B.ce,B.c4)),p=A.ay(s.d),o=s.w,n=A.e([new A.n(s.f,B.c),new A.n(s.r,B.c),new A.n(o,B.e)],t.C)
return A.e([new A.eU(new A.X(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iB:1}
A.eU.prototype={
I(a){return},
$ix:1,
gl(){return this.a}}
A.dS.prototype={
gA(){return"depthPrepass"},
K(a,b){B.b.j(a.a,new A.E("depthPrepass",B.bw,A.e([new A.n(this.w,B.e)],t.C),!1))},
J(a){var s=this,r="depthPrepass",q=s.a.L(new A.a0(r,s.b,s.c,B.aB,B.aA,B.bZ))
return A.e([new A.eW(new A.X(r,A.e([new A.n(s.w,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iB:1}
A.eW.prototype={
I(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=u.k,c=a0.b,b=a0.d,a=c.a
A.aq(a,a0.P("sceneDepth").b)
A.a7(a,e.a.M())
A.bz(a,B.Q,1,0,0,0)
A.aQ(a,e.b.b)
A.b(a,"uVertexSnapGrid",new A.d(B.a,0))
A.b(a,"uAlbedo",B.p)
for(s=b.a,r=s.length,b=b.c.c.a,q=e.c,p=v.G,o=c.b,n=a.a,m=0;m<s.length;s.length===r||(0,A.A)(s),++m){l=s[m]
k=l.a
j=k.gl()
A.b(a,"uViewProjection",new A.d(B.j,new Float32Array(A.p(b))))
A.b(a,"uModel",new A.d(B.j,new Float32Array(A.p(j.c.a0().a))))
A.ji(c,l,!1)
e.cJ(c,k.gl().b,0)
i=q.$1(k.gl().a)
j=i.a
if(a.b!==B.d)A.m(A.l(d))
n.bindVertexArray(A.t(j.a))
j=i.b
h=i.c
g=l.b.length
if(j){j=i.d
if(a.b!==B.d)A.m(A.l(d))
f=A.a(p.WebGL2RenderingContext.TRIANGLES)
n.drawElementsInstanced.apply(n,[f,h,j?A.a(p.WebGL2RenderingContext.UNSIGNED_INT):A.a(p.WebGL2RenderingContext.UNSIGNED_SHORT),0,g])
o.a9(h,g)}else{if(a.b!==B.d)A.m(A.l(d))
n.drawArraysInstanced(A.a(p.WebGL2RenderingContext.TRIANGLES),0,h,g)
o.a9(h,g)}}},
cJ(a,b,c){var s,r
this.d.$1(b)
s=a.a
A.T(s,0,t.j.a(this.e.$1(null)))
A.b(s,"uAlphaCutoff",new A.d(B.a,0))
A.b(s,"uAffineWarpStrength",new A.d(B.a,0))
r=this.a.M()
A.a7(s,r)},
$ix:1,
gl(){return this.a}}
A.eX.prototype={
u(){return"_DofBlurAxis."+this.b}}
A.cw.prototype={
gA(){return this.f},
K(a,b){B.b.j(a.a,new A.E(this.f,B.q,A.e([new A.n(this.w,B.c),new A.n(this.x,B.e)],t.C),!1))},
J(a){var s=this,r=s.a.L(new A.a0(s.e,s.b,s.c,B.m,B.aC,B.az)),q=A.ay(s.d),p=t.n,o=s.r===B.b0?new Float32Array(A.p(A.e([1/s.z,0],p))):new Float32Array(A.p(A.e([0,1/s.Q],p)))
p=s.x
return A.e([new A.eY(new A.X(s.f,A.e([new A.n(s.w,B.c),new A.n(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iB:1}
A.eY.prototype={
I(a){return},
$ix:1,
gl(){return this.a}}
A.dV.prototype={
gA(){return"dofComposite"},
K(a,b){var s=this
B.b.j(a.a,new A.E("dofComposite",B.q,A.e([new A.n(s.z,B.c),new A.n(s.Q,B.c),new A.n(s.as,B.c),new A.n(s.at,B.e)],t.C),!1))},
J(a){var s=this,r="dofComposite",q=s.a.L(new A.a0(r,s.b,s.c,B.m,B.cc,B.bY)),p=A.ay(s.d)
return A.e([new A.eZ(new A.X(r,A.e([new A.n(s.z,B.c),new A.n(s.Q,B.c),new A.n(s.as,B.c),new A.n(s.at,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iB:1}
A.eZ.prototype={
I(a){var s,r=this,q=a.P("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.aq(n,q.b)
A.a7(n,r.a.M())
A.aQ(n,r.b.b)
s=t.j
A.T(n,0,s.a(r.d.$0()))
A.b(n,"uSharp",B.p)
A.T(n,1,s.a(r.e.$0()))
A.b(n,"uBlurred",B.B)
A.T(n,2,s.a(r.f.$0()))
A.b(n,"uSceneDepth",B.aV)
A.b(n,"uNear",new A.d(B.a,o.f))
A.b(n,"uFar",new A.d(B.a,o.r))
A.b(n,"uFocusDistance",new A.d(B.a,r.w))
A.b(n,"uFocusRange",new A.d(B.a,r.x))
A.b(n,"uStrength",new A.d(B.a,0))
A.ar(n,r.c)
p.W(3,0)},
$ix:1,
gl(){return this.a}}
A.e1.prototype={
gA(){return"grade"},
K(a,b){B.b.j(a.a,new A.E("grade",B.q,A.e([new A.n(this.r,B.c),new A.n(this.w,B.e)],t.C),!1))},
J(a){var s=this,r=s.a.L(new A.a0("grade",s.b,s.c,B.m,B.ca,B.c5)),q=A.ay(s.d),p=s.r,o=s.w
return A.e([new A.f2(new A.X("grade",A.e([new A.n(p,B.c),new A.n(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iB:1}
A.f2.prototype={
I(a){var s=this,r=a.P(s.f.a),q=a.b,p=q.a
A.aq(p,a.P(s.r.a).b)
A.a7(p,s.a.M())
A.aQ(p,s.b.b)
A.T(p,0,r.b)
A.b(p,"uScene",B.p)
A.T(p,1,t.j.a(s.d.$0()))
A.b(p,"uLut",B.B)
A.b(p,"uLutSize",new A.d(B.a,s.e))
A.b(p,"uStrength",new A.d(B.a,0))
A.ar(p,s.c)
q.W(3,0)},
$ix:1,
gl(){return this.a}}
A.cN.prototype={
gA(){return"msaaResolve"},
K(a,b){B.b.j(a.a,new A.E("msaaResolve",B.bx,A.e([new A.n(this.b,B.c),new A.n(this.c,B.e)],t.C),!0))},
J(a){var s=this.b,r=this.c
return A.e([new A.f5(new A.X("msaaResolve",A.e([new A.n(s,B.c),new A.n(r,B.e)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iB:1}
A.f5.prototype={
I(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.ap(this.c),j=a.ap(this.d),i=this.b
if(i.b!==B.d)A.m(A.l(u.k))
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
gl(){return this.a}}
A.bS.prototype={}
A.dN.prototype={
P(a){var s=this.a.q(0,a)
if(s==null)throw A.c(A.l('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
ap(a){var s=a.a,r=this.a.q(0,s+"#"+a.f)
if(r!=null)return r
return this.P(s)},
$imk:1}
A.jz.prototype={}
A.cW.prototype={
gA(){return"present"},
K(a,b){B.b.j(a.a,new A.E("present",B.by,A.e([new A.n(this.f,B.c)],t.C),!1))},
J(a){var s=this,r=s.a.L(new A.a0("present",s.b,s.c,B.m,B.cd,B.c1)),q=A.ay(s.d),p=s.f
return A.e([new A.f8(new A.X("present",A.e([new A.n(p,B.c)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iB:1}
A.f8.prototype={
I(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=null,b=a1.ap(d.d),a=a1.b,a0=a.a
A.aq(a0,c)
A.a7(a0,d.a.M())
A.aQ(a0,d.b.b)
A.ar(a0,d.c)
A.T(a0,0,b.b)
s=a1.c
if(s!=null)A.T(a0,1,s)
r=a1.d
q=r.f
p=r.d
o=r.c
A.b(a0,"uExposure",new A.d(B.a,q.a))
A.b(a0,"uVignette",new A.d(B.a,q.e))
A.b(a0,"uGrain",new A.d(B.a,q.f))
A.b(a0,"uOutputEncoding",new A.d(B.a,d.e===B.R?1:0))
A.b(a0,"uToneMap",new A.d(B.a,A.m5(q.fr)))
n=p.a
m=p.fx
r=n.a
l=m.a
k=n.b
j=m.b
i=n.c
h=m.c
g=t.n
A.b(a0,"uClearColor",new A.d(B.f,new Float32Array(A.p(A.e([r,k,i],g)))))
A.b(a0,"uSkyHorizon",new A.d(B.f,new Float32Array(A.p(A.e([l,j,h],g)))))
A.b(a0,"uSkyZenith",new A.d(B.f,new Float32Array(A.p(A.e([r*0.72+l*0.28,k*0.72+j*0.28,i*0.72+h*0.28],g)))))
A.b(a0,"uSkyGround",new A.d(B.f,new Float32Array(A.p(A.e([r*0.9,k*0.9,i*0.9],g)))))
A.b(a0,"uSkyEnabled",new A.d(B.a,0))
A.b(a0,"uSkyHorizonGlow",new A.d(B.a,0))
A.b(a0,"uSkyStarDensity",new A.d(B.a,0))
A.b(a0,"uSkyTexture",B.B)
A.b(a0,"uSkyTextureEnabled",new A.d(B.a,0))
A.b(a0,"uSkyRotation",new A.d(B.a,0))
A.b(a0,"uSkyExposure",new A.d(B.a,1))
A.b(a0,"uSkyTextureSrgb",new A.d(B.a,0))
A.b(a0,"uInverseProjection",new A.d(B.j,new Float32Array(A.p(o.gbY().a))))
f=o.y
if(f===$){e=o.a.bX()
o.y!==$&&A.lm()
o.y=e
f=e}A.b(a0,"uInverseView",new A.d(B.j,new Float32Array(A.p(f.a))))
r=o.d
A.b(a0,"uCameraPosition",new A.d(B.f,new Float32Array(A.p(A.e([r.a,r.b,r.c],g)))))
A.b(a0,"uCloudCoverage",new A.d(B.a,0))
A.b(a0,"uCloudDensity",new A.d(B.a,0))
A.b(a0,"uCloudBaseHeight",new A.d(B.a,650))
A.b(a0,"uCloudThickness",new A.d(B.a,350))
A.b(a0,"uCloudScale",new A.d(B.a,0))
A.b(a0,"uCloudWind",new A.d(B.ad,new Float32Array(A.p(A.e([0,0],g)))))
A.b(a0,"uCloudPhase",new A.d(B.a,0))
A.b(a0,"uCloudDetail",new A.d(B.a,0))
A.b(a0,"uCloudSilverLining",new A.d(B.a,0))
A.b(a0,"uCloudSampleCount",new A.d(B.a,4))
r=p.go
l=r==null
k=l?c:r.a.a
if(k==null)k=0
j=l?c:r.a.b
if(j==null)j=1
i=l?c:r.a.c
A.b(a0,"uCloudLightDirection",new A.d(B.f,new Float32Array(A.p(A.e([k,j,i==null?0:i],g)))))
k=l?c:r.b.a
if(k==null)k=1
j=l?c:r.b.b
if(j==null)j=1
i=l?c:r.b.c
A.b(a0,"uCloudLightColor",new A.d(B.f,new Float32Array(A.p(A.e([k,j,i==null?1:i],g)))))
r=l?c:r.c
A.b(a0,"uCloudLightIntensity",new A.d(B.a,r==null?0:r))
a.W(3,0)},
$ix:1,
gl(){return this.a}}
A.ep.prototype={
gA(){return"ps1Quantize"},
K(a,b){B.b.j(a.a,new A.E("ps1Quantize",B.q,A.e([new A.n(this.e,B.c),new A.n(this.f,B.e)],t.C),!1))},
J(a){var s=this,r="ps1Quantize",q=s.a.L(new A.a0(r,s.b,s.c,B.m,B.cf,B.bV)),p=A.ay(s.d),o=s.e,n=s.f
return A.e([new A.f9(new A.X(r,A.e([new A.n(o,B.c),new A.n(n,B.e)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iB:1}
A.f9.prototype={
I(a){var s=this,r=a.P(s.d.a),q=a.b,p=q.a
A.aq(p,a.P(s.e.a).b)
A.a7(p,s.a.M())
A.aQ(p,s.b.b)
A.T(p,0,r.b)
A.b(p,"uScene",B.p)
A.b(p,"uQuantizationBits",new A.d(B.a,8))
A.b(p,"uDitherStrength",new A.d(B.a,0))
A.ar(p,s.c)
q.W(3,0)},
$ix:1,
gl(){return this.a}}
A.bx.prototype={}
A.ey.prototype={
gA(){return"shadow"},
K(a,b){B.b.j(a.a,new A.E("shadowCaster",B.bv,A.e([new A.n(this.z,B.e)],t.C),!1))},
J(a){var s=this,r="shadowCaster",q=s.a.L(new A.a0(r,s.b,s.c,B.aB,B.aA,B.c3))
return A.e([new A.fc(new A.X(r,A.e([new A.n(s.z,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iB:1}
A.fc.prototype={
I(a){var s,r,q,p,o=this,n=a.P("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.aq(s,n.b)
A.a7(s,o.a.M())
A.bz(s,B.Q,1,0,0,0)
return}r=A.ky(l)
o.x.$1(r)
s=m.a
A.aq(s,n.b)
A.a7(s,o.a.M())
A.bz(s,B.Q,1,0,0,0)
A.aQ(s,o.b.b)
A.b(s,"uAlbedo",B.p)
for(s=a.d.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.A)(s),++p)o.cL(m,s[p],l,r)},
bI(a,b){var s,r
this.d.$1(b)
s=a.a
A.T(s,0,t.j.a(this.e.$1(null)))
A.b(s,"uAlphaCutoff",new A.d(B.a,0))
r=this.a.M()
A.a7(s,r)},
cL(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){b.gl()
s=a.a
A.b(s,"uUseInstances",B.ae)
n.bF(a,b.gl().c,d)
n.bI(a,b.gl().b)
r=b.gl()
q=n.c.$1(r.a)
A.ar(s,q.a)
s=q.b
r=q.c
if(s)a.b1(r,q.d,0)
else a.W(r,0)}else if(b instanceof A.bt){p=b.a
p.gl()
if(n.d2(b,c)===B.db)return
n.bF(a,p.gl().c,d)
A.ji(a,b,!1)
n.bI(a,p.gl().b)
s=p.gl()
q=n.c.$1(s.a)
A.ar(a.a,q.a)
s=q.b
r=q.c
o=b.b.length
if(s)a.b2(r,q.d,o,0)
else a.b0(r,0,o)}else throw A.c(A.j("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dI(b).i(0),null))},
d2(a,b){return B.da},
bF(a,b,c){var s=a.a
A.b(s,"uModel",new A.d(B.j,new Float32Array(A.p(b.a0().a))))
A.b(s,"uLightViewProjection",new A.d(B.j,new Float32Array(A.p(c.a.a))))},
$ix:1,
gl(){return this.a}}
A.iY.prototype={
$1(a){return this.a.a=a},
$S:53}
A.iZ.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:54}
A.ez.prototype={
gA(){return"shadowedWorld"},
K(a,b){var s=this,r=A.e([new A.n(s.db,B.c)],t.C)
if(s.ay)r.push(new A.n(s.dx,B.c))
r.push(new A.n(s.dy,B.e))
B.b.j(a.a,new A.E("shadowedWorld",B.ar,r,!1))},
J(a){var s=this,r="shadowedWorld",q=s.a.L(new A.a0(r,s.b,s.c,B.cg,B.cb,B.bU)),p=A.e([new A.n(s.db,B.c)],t.C)
if(s.ay)p.push(new A.n(s.dx,B.c))
p.push(new A.n(s.dy,B.e))
return A.e([new A.fd(new A.X(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iB:1}
A.fd.prototype={
I(b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=null,a5=b2.P("sceneColor"),a6=b2.b,a7=b2.d,a8=a7.c,a9=a7.d,b0=a3.z.$0(),b1=a6.a
A.aq(b1,a5.b)
A.a7(b1,a3.a.M())
s=a9.a
A.bz(b1,B.ak,1,s.c,s.b,s.a)
A.aQ(b1,a3.b.b)
A.b(b1,"uAlbedo",B.p)
A.b(b1,"uNormalMap",B.du)
A.b(b1,"uOrmMap",B.dv)
A.b(b1,"uEmissiveMap",B.dw)
A.b(b1,"uLightmap",B.dx)
s=t.j
A.T(b1,1,s.a(a3.y.$0()))
A.b(b1,"uShadowMap",B.B)
r=a8.d
q=t.n
A.b(b1,"uCameraPosition",new A.d(B.f,new Float32Array(A.p(A.e([r.a,r.b,r.c],q)))))
A.b(b1,"uShadowMapTexelSize",new A.d(B.ad,new Float32Array(A.p(A.e([1/a3.ch,1/a3.CW],q)))))
A.b(b1,"uShadowFilterRadius",new A.d(B.a,1))
A.b(b1,"uShadowBias",new A.d(B.a,0.003))
A.T(b1,2,s.a(a3.at.$0()))
A.b(b1,"uSsao",B.aV)
A.b(b1,"uVertexSnapGrid",new A.d(B.a,0))
A.b(b1,"uSceneColorSize",new A.d(B.ad,new Float32Array(A.p(A.e([a3.ax,a3.ay],q)))))
A.b(b1,"uViewProjection",new A.d(B.j,new Float32Array(A.p(a8.c.a))))
A.b(b1,"uView",new A.d(B.j,new Float32Array(A.p(a8.a.a))))
A.b(b1,"uLightViewProjection",new A.d(B.j,new Float32Array(A.p(b0.a.a))))
A.b(b1,"uFogColor",new A.d(B.f,new Float32Array(A.p(A.e([0,0,0],q)))))
A.b(b1,"uFogStart",new A.d(B.a,0))
A.b(b1,"uFogEnd",new A.d(B.a,1))
A.b(b1,"uFogHeightFalloff",new A.d(B.a,0))
A.b(b1,"uFogDensity",new A.d(B.a,0))
p=a3.Q.$0()
s=A.e([],t.w)
r=a3.as.$0()
r=J.a_(r==null?B.W:r)
o=p==null
while(r.k()){n=r.gm()
if(-1!==(o?a4:-1))s.push(n)}m=o?a4:B.l
if(m==null)m=B.l
l=o?a4:B.t
if(l==null)l=B.t
A.b(b1,"uLightPosition",new A.d(B.f,new Float32Array(A.p(A.e([m.a,m.b,m.c],q)))))
A.b(b1,"uLightDirection",new A.d(B.f,new Float32Array(A.p(A.e([l.a,l.b,l.c],q)))))
k=o?a4:B.L
if(k==null)k=B.v
A.b(b1,"uLightColor",new A.d(B.f,new Float32Array(A.p(A.e([k.a,k.b,k.c],q)))))
r=o?a4:1
A.b(b1,"uLightIntensity",new A.d(B.a,r==null?0:r))
A.b(b1,"uSpotEnabled",new A.d(B.a,!o?1:0))
j=a9.go
r=j==null
i=r?a4:j.a
if(i==null)i=B.l
h=r?a4:j.b
if(h==null)h=B.v
A.b(b1,"uDirectionalDirection",new A.d(B.f,new Float32Array(A.p(A.e([i.a,i.b,i.c],q)))))
A.b(b1,"uDirectionalColor",new A.d(B.f,new Float32Array(A.p(A.e([h.a,h.b,h.c],q)))))
r=r?a4:j.c
A.b(b1,"uDirectionalIntensity",new A.d(B.a,r==null?0:r))
for(r=a9.id,g=0;g<4;++g){n=r.length
if(g<n){if(!(g<n))return A.h(r,g)
f=r[g]}else f=a4
n=f==null
e=n?a4:f.b
if(e==null)e=B.x
d=n?a4:f.c
if(d==null)d=B.v
c=""+g
A.b(b1,"uPointPosition"+c,new A.d(B.f,new Float32Array(A.p(A.e([e.a,e.b,e.c],q)))))
A.b(b1,"uPointColor"+c,new A.d(B.f,new Float32Array(A.p(A.e([d.a,d.b,d.c],q)))))
b=n?a4:f.d
if(b==null)b=0
A.b(b1,"uPointIntensity"+c,new A.d(B.a,b))
n=n?a4:f.e
if(n==null)n=1
A.b(b1,"uPointRadius"+c,new A.d(B.a,n))}for(g=0;g<3;++g){r=s.length
if(g<r){if(!(g<r))return A.h(s,g)
f=s[g]}else f=a4
r=f==null
e=r?a4:B.l
if(e==null)e=B.x
a=r?a4:B.t
if(a==null)a=B.t
d=r?a4:B.L
if(d==null)d=B.v
n=""+g
A.b(b1,"uDirectSpotPosition"+n,new A.d(B.f,new Float32Array(A.p(A.e([e.a,e.b,e.c],q)))))
A.b(b1,"uDirectSpotDirection"+n,new A.d(B.f,new Float32Array(A.p(A.e([a.a,a.b,a.c],q)))))
A.b(b1,"uDirectSpotColor"+n,new A.d(B.f,new Float32Array(A.p(A.e([d.a,d.b,d.c],q)))))
c=r?a4:1
if(c==null)c=0
A.b(b1,"uDirectSpotIntensity"+n,new A.d(B.a,c))
c=r?a4:1
if(c==null)c=1
A.b(b1,"uDirectSpotRange"+n,new A.d(B.a,c))
c=r?a4:0.3
if(c==null)c=0.3
A.b(b1,"uDirectSpotInnerCos"+n,new A.d(B.a,Math.cos(c)))
c=r?a4:0.5
if(c==null)c=0.5
A.b(b1,"uDirectSpotOuterCos"+n,new A.d(B.a,Math.cos(c)))
r=r?0:1
A.b(b1,"uDirectSpotEnabled"+n,new A.d(B.a,r))}s=o?a4:1
A.b(b1,"uLightRange",new A.d(B.a,s==null?1:s))
s=o?a4:0.3
if(s==null)s=0.3
A.b(b1,"uLightInnerCos",new A.d(B.a,Math.cos(s)))
s=o?a4:0.5
if(s==null)s=0.5
A.b(b1,"uLightOuterCos",new A.d(B.a,Math.cos(s)))
a0=a9.fx
A.b(b1,"uAmbientColor",new A.d(B.f,new Float32Array(A.p(A.e([a0.a,a0.b,a0.c],q)))))
A.b(b1,"uAmbientIntensity",new A.d(B.a,a9.fy))
A.b(b1,"uAmbientLightScale",new A.d(B.a,1))
A.b(b1,"uDirectLightScale",new A.d(B.a,1))
A.b(b1,"uReflectionColor",new A.d(B.f,new Float32Array(A.p(A.e([0,0,0],q)))))
A.b(b1,"uReflectionIntensity",new A.d(B.a,0))
A.b(b1,"uReflectionConfidence",new A.d(B.a,0))
A.b(b1,"uRainWetness",new A.d(B.a,0))
A.b(b1,"uSurfaceSnowCoverage",new A.d(B.a,0))
A.b(b1,"uSurfaceDissolution",new A.d(B.a,0))
a1=A.hR(B.ax,0,A.bI(4,"count",t.S),t.aX).dS(0)
A.b(b1,"uThermalSourceCount",new A.d(B.a,a1.length))
for(g=0;g<4;++g){s=a1.length
if(g<s)if(!(g<s))return A.h(a1,g)
s=""+g
A.b(b1,"uThermalSourcePosition"+s,new A.d(B.f,new Float32Array(A.p(A.e([0,0,0],q)))))
A.b(b1,"uThermalSourceRadius"+s,new A.d(B.a,1))
A.b(b1,"uThermalSourceDissolution"+s,new A.d(B.a,0))}for(b1=a7.a,s=b1.length,a2=0;a2<b1.length;b1.length===s||(0,A.A)(b1),++a2)a3.bJ(a6,b1[a2],0,a9)
for(a7=a7.b,b1=a7.length,a2=0;a2<a7.length;a7.length===b1||(0,A.A)(a7),++a2)a3.bJ(a6,a7[a2],0,a9)},
bJ(a,b,c,d){var s,r,q,p,o,n,m=this
if(t.Y.b(b)){s=a.a
A.b(s,"uUseInstances",B.ae)
m.bK(a,b.gl().c)
r=b.gl()
q=b.gl()
p=b.gl()
b.gl()
m.bG(a,r.b,q.e,p.f,c,!0,d)
o=m.c.$1(b.gl().a)
A.ar(s,o.a)
s=o.b
r=o.c
if(s)a.b1(r,o.d,0)
else a.W(r,0)}else if(b instanceof A.bt){n=b.a
m.bK(a,n.gl().c)
A.ji(a,b,!0)
s=n.gl()
r=n.gl()
q=n.gl()
n.gl()
m.bG(a,s.b,r.e,q.f,c,!0,d)
o=m.c.$1(n.gl().a)
A.ar(a.a,o.a)
s=o.b
r=o.c
q=b.b.length
if(s)a.b2(r,o.d,q,0)
else a.b0(r,0,q)}else throw A.c(A.j("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dI(b).i(0),null))},
bG(a,b,c,d,e,f,g){var s=this,r=null,q=s.d.$1(b),p=t.j,o=a.a
A.T(o,0,p.a(s.e.$1(r)))
A.T(o,3,p.a(s.f.$1(r)))
A.T(o,4,p.a(s.r.$1(r)))
A.T(o,5,p.a(s.w.$1(r)))
A.T(o,6,p.a(s.x.$1(r)))
A.b(o,"uAlphaCutoff",new A.d(B.a,0))
A.b(o,"uOpaqueCoverage",new A.d(B.a,c===B.S?0:1))
A.b(o,"uAffineWarpStrength",new A.d(B.a,0))
p=t.n
A.b(o,"uMaterialTint",new A.d(B.f,new Float32Array(A.p(A.e([q.d,q.e,q.f],p)))))
A.b(o,"uEmissiveStrength",new A.d(B.a,0))
A.b(o,"uUvScaleOffset",new A.d(B.dt,new Float32Array(A.p(A.e([1,1,0,0],p)))))
A.b(o,"uNormalStrength",new A.d(B.a,1))
A.b(o,"uRoughness",new A.d(B.a,q.at))
A.b(o,"uMetallic",new A.d(B.a,q.ax))
A.b(o,"uSpecularScale",new A.d(B.a,1))
A.b(o,"uClearcoatStrength",new A.d(B.a,q.ch))
A.b(o,"uClearcoatRoughness",new A.d(B.a,q.CW))
A.b(o,"uOcclusionStrength",new A.d(B.a,1))
A.b(o,"uLightmapIntensity",new A.d(B.a,0))
A.b(o,"uReceivesShadow",new A.d(B.a,1))
A:{p=r
if(B.S===c){switch(d.a){case 0:p=B.bj
break
case 1:p=B.bi
break}break A}if(B.H===c||B.bg===c){p=s.a.M()
break A}}A.a7(o,p)},
bK(a,b){var s=b.a0(),r=a.a
A.b(r,"uModel",new A.d(B.j,new Float32Array(A.p(s.a))))
A.b(r,"uNormalMatrix",new A.d(B.j,new Float32Array(A.p(s.b9().a))))},
$ix:1,
gl(){return this.a}}
A.eB.prototype={
gA(){return"ssaoOcclusion"},
K(a,b){B.b.j(a.a,new A.E("ssaoOcclusion",B.U,A.e([new A.n(this.w,B.e)],t.C),!1))},
J(a){var s=this,r="ssaoOcclusion",q=s.a.L(new A.a0(r,s.b,s.c,B.m,B.aD,B.bT)),p=A.ay(s.d)
return A.e([new A.ff(new A.X(r,A.e([new A.n(s.w,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iB:1}
A.ff.prototype={
I(a){var s=a.b.a
A.aq(s,a.P("ssaoRaw").b)
A.a7(s,this.a.M())
A.bz(s,B.P,1,1,1,1)
return},
$ix:1,
gl(){return this.a}}
A.eA.prototype={
gA(){return"ssaoBlur"},
K(a,b){B.b.j(a.a,new A.E("ssaoBlur",B.U,A.e([new A.n(this.y,B.c),new A.n(this.z,B.e)],t.C),!1))},
J(a){var s=this,r="ssaoBlur",q=s.a.L(new A.a0(r,s.b,s.c,B.m,B.c8,B.c6)),p=A.ay(s.d)
return A.e([new A.fe(new A.X(r,A.e([new A.n(s.y,B.c),new A.n(s.z,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iB:1}
A.fe.prototype={
I(a){var s=a.b.a
A.aq(s,a.P("ssaoBlurred").b)
A.a7(s,this.a.M())
A.bz(s,B.P,1,1,1,1)
return},
$ix:1,
gl(){return this.a}}
A.eL.prototype={
gA(){return"vhs"},
K(a,b){var s=this.w
a.b.j(0,s.a)
B.b.j(a.a,new A.E("vhs",B.q,A.e([new A.n(this.r,B.c),new A.n(s,B.r),new A.n(s,B.e)],t.C),!1))},
J(a){var s=this,r=s.a.L(new A.a0("vhs",s.b,s.c,B.m,B.c9,B.bW)),q=A.ay(s.d),p=s.r,o=s.w
return A.e([new A.fk(new A.X("vhs",A.e([new A.n(p,B.c),new A.n(o,B.r),new A.n(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iB:1}
A.fk.prototype={
I(a){var s=this,r=a.P(s.f.a),q=a.P(s.r.a),p=a.b,o=p.a
A.aq(o,q.b)
A.a7(o,s.a.M())
A.aQ(o,s.b.b)
A.T(o,0,r.b)
A.b(o,"uScene",B.p)
A.T(o,1,t.j.a(s.d.$0()))
A.b(o,"uHistory",B.B)
A.b(o,"uTime",new A.d(B.a,s.e.$0()))
A.b(o,"uChromaWeight",new A.d(B.a,0))
A.b(o,"uTrackingWeight",new A.d(B.a,0))
A.b(o,"uNoiseWeight",new A.d(B.a,0))
A.b(o,"uHeadSwitchWeight",new A.d(B.a,0))
A.b(o,"uDropoutWeight",new A.d(B.a,0))
A.b(o,"uGhostWeight",new A.d(B.a,0))
A.ar(o,s.c)
p.W(3,0)},
$ix:1,
gl(){return this.a}}
A.eM.prototype={
gA(){return"volumetricLight"},
K(a,b){var s=this,r=s.w,q=t.C,p=a.a
B.b.j(p,new A.E("volumetricLight",B.U,A.e([new A.n(s.x,B.c),new A.n(r,B.e)],q),!1))
B.b.j(p,new A.E("volumetricComposite",B.q,A.e([new A.n(r,B.c),new A.n(s.y,B.c),new A.n(s.z,B.e)],q),!1))},
J(a){var s,r,q,p,o,n,m=this,l="volumetricLight",k="volumetricComposite",j=m.a,i=m.b,h=j.L(new A.a0(l,i,m.c,B.m,B.aD,B.bX)),g=m.e,f=A.ay(g),e=m.Q
B.b.j(e,f)
s=m.w
r=t.C
q=A.e([new A.fm(new A.X(l,A.e([new A.n(m.x,B.c),new A.n(s,B.e)],r),!1,!1,!1,!1),h,f,s.a,m.f,m.r)],t.u)
p=m.z
o=j.L(new A.a0(k,i,m.d,B.m,B.ch,B.c7))
n=A.ay(g)
B.b.j(e,n)
B.b.j(q,new A.fl(new A.X(k,A.e([new A.n(s,B.c),new A.n(m.y,B.c),new A.n(p,B.e)],r),!1,!1,!0,!1),o,n,s,p))
return q},
$iB:1}
A.fm.prototype={
I(a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this,a1=a6.P(a0.d),a2=a6.b,a3=a0.f.$0(),a4=a6.d.d.go,a5=a2.a
A.aq(a5,a1.b)
A.a7(a5,a0.a.M())
A.bz(a5,B.P,1,0,0,0)
A.aQ(a5,a0.b.b)
A.T(a5,0,t.j.a(a0.e.$0()))
A.b(a5,"uSceneDepth",B.p)
A.b(a5,"uNear",new A.d(B.a,a3.f))
A.b(a5,"uFar",new A.d(B.a,a3.r))
A.b(a5,"uViewProjection",new A.d(B.j,new Float32Array(A.p(a3.c.a))))
s=a3.a.a
A.b(a5,"uView",new A.d(B.j,new Float32Array(A.p(s))))
A.b(a5,"uInverseProjection",new A.d(B.j,new Float32Array(A.p(a3.gbY().a))))
r=a4==null
A.b(a5,"uShaftIntensity",new A.d(B.a,r?0:a4.c*0.15))
A.b(a5,"uFogDensity",new A.d(B.a,0))
A.b(a5,"uAnisotropy",new A.d(B.a,0.7))
q=t.n
A.b(a5,"uVolumetricAlbedo",new A.d(B.f,new Float32Array(A.p(A.e([1,1,1],q)))))
A.b(a5,"uVolumetricHeightFalloff",new A.d(B.a,0.02))
A.b(a5,"uVolumetricDustDensity",new A.d(B.a,0))
A.b(a5,"uVolumetricJitter",new A.d(B.a,0.35))
A.b(a5,"uVolumetricIntensity",new A.d(B.a,1))
A.b(a5,"uVolumetricSampleCount",new A.d(B.a,12))
if(r)p=B.l
else{o=a4.a.gS()
n=o.a
m=s.length
if(0>=m)return A.h(s,0)
l=s[0]
k=o.b
if(4>=m)return A.h(s,4)
j=s[4]
o=o.c
if(8>=m)return A.h(s,8)
i=s[8]
h=s[1]
g=s[5]
if(9>=m)return A.h(s,9)
f=s[9]
e=s[2]
d=s[6]
if(10>=m)return A.h(s,10)
p=new A.i(n*l+k*j+o*i,n*h+k*g+o*f,n*e+k*d+o*s[10]).gS()}c=r?null:a4.b
if(c==null)c=B.v
A.b(a5,"uLightDir",new A.d(B.f,new Float32Array(A.p(A.e([p.a,p.b,p.c],q)))))
A.b(a5,"uLightColor",new A.d(B.f,new Float32Array(A.p(A.e([c.a,c.b,c.c],q)))))
b=A.oh(4,a3.d,B.aw)
A.b(a5,"uVolumetricSourceCount",new A.d(B.a,b.length))
for(a=0;a<4;++a){s=b.length
if(a<s)if(!(a<s))return A.h(b,a)
s=""+a
A.b(a5,"uSourcePosition"+s,new A.d(B.f,new Float32Array(A.p(A.e([0,0,0],q)))))
A.b(a5,"uSourceColor"+s,new A.d(B.f,new Float32Array(A.p(A.e([0,0,0],q)))))
A.b(a5,"uSourceIntensity"+s,new A.d(B.a,0))
A.b(a5,"uSourceReferenceDistance"+s,new A.d(B.a,1))
A.b(a5,"uSourceCutoffDistance"+s,new A.d(B.a,1))}A.ar(a5,a0.c)
a2.W(3,0)},
$ix:1,
gl(){return this.a}}
A.fl.prototype={
I(a){var s=this,r=a.ap(s.e),q=a.ap(s.d),p=a.b,o=p.a
A.aq(o,r.b)
A.mD(o,1)
A.a7(o,B.bh)
A.aQ(o,s.b.b)
A.T(o,0,q.b)
A.b(o,"uVolumetric",B.p)
A.b(o,"uVolumetricStrength",B.aU)
A.ar(o,s.c)
p.W(3,0)},
$ix:1,
gl(){return this.a}}
A.d0.prototype={}
A.eP.prototype={
gA(){return"world"},
K(a,b){B.b.j(a.a,new A.E("worldOpaqueTransparent",B.ar,A.e([new A.n(this.e,B.e)],t.C),!1))},
J(a){var s=this,r=s.a.L(new A.a0("safeWorld",s.b,s.c,B.ci,B.m,B.c_)),q=s.e
return A.e([new A.fp(new A.X("worldOpaqueTransparent",A.e([new A.n(q,B.e)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iB:1}
A.fp.prototype={
I(a){var s,r,q,p,o,n=this,m=a.b,l=a.d,k=l.d,j=m.a
A.aq(j,a.P(n.d).b)
A.a7(j,n.a.M())
s=k.a
A.bz(j,B.ak,1,s.c,s.b,s.a)
A.aQ(j,n.b.b)
A.b(j,"uViewProjection",new A.d(B.j,new Float32Array(A.p(l.c.c.a))))
r=k.go
q=r==null?null:r.a
if(q==null)q=B.l
s=t.n
A.b(j,"uLightDir",new A.d(B.f,new Float32Array(A.p(A.e([q.a,q.b,q.c],s)))))
p=k.fx
A.b(j,"uAmbientColor",new A.d(B.f,new Float32Array(A.p(A.e([p.a,p.b,p.c],s)))))
A.b(j,"uAmbientIntensity",new A.d(B.a,k.fy))
A.b(j,"uAmbientLightScale",new A.d(B.a,1))
A.b(j,"uDirectLightScale",new A.d(B.a,1))
for(j=l.a,s=j.length,o=0;o<j.length;j.length===s||(0,A.A)(j),++o)n.bw(m,j[o])
for(l=l.b,j=l.length,o=0;o<l.length;l.length===j||(0,A.A)(l),++o)n.bw(m,l[o])},
bw(a,b){var s,r,q,p,o,n=this
if(b instanceof A.bt){s=b.a
n.bH(a,s.gl().c)
A.ji(a,b,!0)
r=n.c.$1(s.gl().a)
A.ar(a.a,r.a)
q=r.b
p=r.c
o=b.b.length
if(q)a.b2(p,r.d,o,0)
else a.b0(p,0,o)}else if(t.Y.b(b)){q=a.a
A.b(q,"uUseInstances",B.ae)
n.bH(a,b.gl().c)
r=n.c.$1(b.gl().a)
A.ar(q,r.a)
q=r.b
p=r.c
if(q)a.b1(p,r.d,0)
else a.W(p,0)}else throw A.c(A.j("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dI(b).i(0),null))},
bH(a,b){var s=b.a0(),r=a.a
A.b(r,"uModel",new A.d(B.j,new Float32Array(A.p(s.a))))
A.b(r,"uNormalMatrix",new A.d(B.j,new Float32Array(A.p(s.b9().a))))},
$ix:1,
gl(){return this.a}}
A.eu.prototype={
gca(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this
if(a0.d){s=a0.e
if(s!=null){r=s.gca()
q=a0.b
p=r.b
o=r.c
n=q.a.B(0,o)
m=p.a
l=p.b
k=p.c
j=new A.i(m,l,k)
i=j.a3(n)
h=j.a3(i)
p=p.d
n=r.a.T(0,n.T(0,i.B(0,2*p)).T(0,h.B(0,2)))
r=q.b
g=r.a
f=r.d
e=r.c
r=r.b
d=p*g+m*f+l*e-k*r
c=p*r-m*e+l*f+k*g
b=p*e+m*r-l*g+k*f
e=p*f-m*g-l*r-k*e
a=Math.sqrt(d*d+c*c+b*b+e*e)
r=a<1e-9?B.A:new A.cX(d/a,c/a,b/a,e/a)
q=new A.aO(n,r,o*q.c)
r=q}else r=a0.b
a0.c=r
a0.d=!1}return a0.c},
a8(){var s,r,q
if(this.d)return
this.d=!0
for(s=this.f,r=s.length,q=0;q<s.length;s.length===r||(0,A.A)(s),++q)s[q].a8()},
bS(a){var s=a.e
if(s===this)return
if(s!=null)if(B.b.ad(s.f,a)){a.e=null
a.a8()}a.e=this
a.a8()
B.b.j(this.f,a)},
aS(a,b,c,d,e){var s=A.jC(B.O,!0,B.H,null,b,c,d,!0,0,e,-1)
this.bS(s)
return s},
bj(a){var s,r,q,p,o,n=this,m=n.r,l=n.w
if(m!=null&&l!=null){s=new A.c5(m,l,n.gca(),n.x,n.y,n.z,!0,!0,n.ax)
r=n.ay
q=a.b
if(r==null){a.bR(s)
n.ay=q.de(s)}else{a.bR(s)
p=q.$ti
p.c.a(r)
p.y[1].a(s)
q.a7(r)
q=q.b
p=r.a
if(!(p>=0&&p<q.length))return A.h(q,p)
q[p].saX(s)}}else{q=n.ay
if(q!=null){a.b.aD(q)
n.ay=null}}for(q=n.f,p=q.length,o=0;o<q.length;q.length===p||(0,A.A)(q),++o)q[o].bj(a)}}
A.fT.prototype={
u(){return"GpuBufferUsage."+this.b}}
A.e_.prototype={
u(){return"GpuBufferKind."+this.b}}
A.fY.prototype={
u(){return"GpuTextureFilter."+this.b}}
A.fZ.prototype={
u(){return"GpuTextureWrap."+this.b}}
A.dZ.prototype={}
A.fX.prototype={}
A.bW.prototype={
u(){return"GpuTargetAttachment."+this.b}}
A.cB.prototype={}
A.e0.prototype={
u(){return"GpuDeviceStatus."+this.b}}
A.c6.prototype={
u(){return"ShaderCompileStage."+this.b}}
A.d4.prototype={
i(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.b7.prototype={
u(){return"UniformType."+this.b}}
A.d.prototype={}
A.cr.prototype={
u(){return"ClearMask."+this.b}}
A.dT.prototype={
W(a,b){var s=this.a
if(s.b!==B.d)A.m(A.l(u.k))
s.a.drawArrays(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.a9(a,1)},
b0(a,b,c){var s=this.a
if(s.b!==B.d)A.m(A.l(u.k))
s.a.drawArraysInstanced(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.a9(a,c)},
b1(a,b,c){var s,r,q=this.a
if(q.b!==B.d)A.m(A.l(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.a9(a,1)},
b2(a,b,c,d){var s,r,q=this.a
if(q.b!==B.d)A.m(A.l(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.a8(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.a9(a,c)},
$ilM:1}
A.bU.prototype={}
A.cU.prototype={
cQ(){var s,r=this,q=v.G
A.t(q.window).addEventListener("resize",A.aA(new A.hp(r)))
s=r.a
s.addEventListener("webglcontextlost",A.aA(new A.hq(r)))
s.addEventListener("webglcontextrestored",A.aA(new A.hr(r)))
s.addEventListener("contextmenu",A.aA(new A.hs()))
s.addEventListener("mousedown",A.aA(new A.ht(r)))
A.t(q.window).addEventListener("mousemove",A.aA(new A.hu(r)))
A.t(q.window).addEventListener("mouseup",A.aA(new A.hv(r)))
s.addEventListener("wheel",A.aA(new A.hw(r)))},
bE(){var s,r=this,q=r.a,p=A.a(q.clientWidth)>0?A.a(q.clientWidth):A.a(q.width),o=A.a(q.clientHeight)>0?A.a(q.clientHeight):A.a(q.height),n=r.x
if(p===n.a&&o===n.b)return
n=n.e
n=A.kA(o,p,n,n,!0)
r.x=n
q.width=n.c
q.height=r.x.d
try{q=r.x
r.b.av()
q.v()
r.d.b8("surface resized")}catch(s){}},
cg(){var s=this
if(s.Q)return
s.Q=!0
s.as=0
A.a(A.t(v.G.window).requestAnimationFrame(A.aA(s.gbM())))},
d1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
A.fq(a)
if(!d.Q)return
s=a/1000
r=d.as
q=r>0?s-r:0.016666666666666666
d.as=s
d.bE()
if(!d.at&&d.b.e!==B.a1){r=d.c
d.e.bj(r)
p=d.y
o=p!=null
if(o)p.dV(q)
n=d.x
m=n.c/n.d
if(o){o=p.gb3()
n=p.a
l=n.ag(0,o)
if(l.ga_()<1e-12)A.m(A.j("CameraView.lookAt requires target ("+n.i(0)+") distinct from eye ("+o.i(0)+")",null))
k=A.ke(m,o,200,l,1,0.1,B.l)}else k=A.ke(m,B.dy,200,B.dC,1,0.1,B.l)
o=d.d
n=d.f
j=d.r
i=o.a
o.a=i+1
o=d.b
o.d6(r,new A.fO(k,n,j,-1,i,s))
o.gY()
i=d.z
if(i!=null)i.$1(new A.bU(s))
h=o.dg()
if(d.w){r=d.db+=q
o=++d.dx
if(r>=0.5){d.dy=o/r
d.dx=d.db=0
g=d.cy
if(g==null){r=v.G
g=A.t(A.t(r.document).createElement("div"))
A.t(g.style).position="absolute"
A.t(g.style).left="12px"
A.t(g.style).top="12px"
A.t(g.style).padding="8px 12px"
A.t(g.style).backgroundColor="rgba(10, 12, 16, 0.85)"
A.t(g.style).color="#00ffaa"
A.t(g.style).fontFamily="monospace"
A.t(g.style).fontSize="12px"
A.t(g.style).lineHeight="1.4"
A.t(g.style).borderRadius="4px"
A.t(g.style).pointerEvents="none"
A.t(g.style).zIndex="9999"
f=A.U(d.a.parentElement)
if(f==null)f=A.U(A.t(r.document).body)
if(f!=null)A.t(f.appendChild(g))
d.cy=g}e=B.n.be(q*1000,1)
g.innerText="FPS: "+B.n.be(d.dy,0)+" ("+e+" ms)\nDraws: "+h.b+" | Tris: "+h.c+"\nInstances: "+h.e+" | VRAM: "+B.n.be(h.r/1024,0)+" KB"}}}A.a(A.t(v.G.window).requestAnimationFrame(A.aA(d.gbM())))},
sdz(a){this.z=t.a4.a(a)}}
A.hy.prototype={
$1(a){var s=this.a,r=a.a===B.Z?2:1,q=a===B.aH?0:1
return new A.d_(a,s.c,s.d,r,q)},
$S:56}
A.hp.prototype={
$1(a){A.t(a)
return this.a.bE()},
$S:57}
A.hq.prototype={
$1(a){var s
A.t(a)
s=this.a
s.at=!0
s.d.b8("gl context lost")},
$S:2}
A.hr.prototype={
$1(a){var s
A.t(a)
s=this.a
s.at=!1
s.d.b8("gl context restored")},
$S:2}
A.hs.prototype={
$1(a){A.t(a).preventDefault()},
$S:2}
A.ht.prototype={
$1(a){var s
A.t(a)
s=this.a
s.ay=!0
s.ch=A.a(a.button)
s.CW=A.a(a.clientX)
s.cx=A.a(a.clientY)},
$S:2}
A.hu.prototype={
$1(a){var s,r,q,p,o,n,m,l,k
A.t(a)
s=this.a
if(s.ay)r=s.y!=null
else r=!1
if(r){q=A.a(a.clientX)
p=A.a(a.clientY)
o=q-s.CW
n=p-s.cx
s.CW=q
s.cx=p
r=s.ch===0&&!A.l_(a.shiftKey)
s=s.y
if(r){s.as+=o*0.006
s.at=B.n.ai(s.at+n*0.006,-1.5079644737231006,1.5079644737231006)}else{r=s.b
m=s.gc4()
l=s.gc4().a3(s.a.ag(0,s.gb3()).gS()).gS()
k=m.B(0,-o*0.003*r).T(0,l.B(0,n*0.003*r))
s.ay=s.ay.T(0,k)}}},
$S:2}
A.hv.prototype={
$1(a){A.t(a)
this.a.ay=!1},
$S:2}
A.hw.prototype={
$1(a){var s,r
A.t(a)
s=this.a
r=s.y
if(r!=null){a.preventDefault()
s=s.y
s.toString
r=A.fq(a.deltaY)
s.ax=B.n.ai(s.ax+r*0.003,0.5,100)}},
$S:2}
A.em.prototype={
c2(a){var s=this.b.q(0,a)
if(s==null)throw A.c(A.l("resource is not in candidate: "+a))
return s}}
A.fU.prototype={
gm(){var s=this.c
if(s==null)throw A.c(A.l("GPU resource adapter is not initialized"))
return s},
a4(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.cH(s.b)
r.b.a4()
r.c=null
r.e=!0},
bu(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.b1(a0,a1),a3=A.e([],t.J)
try{k=a4.a
j=k.$ti
i=j.h("z(1)")
j=j.h("Z<1>")
s=new A.Z(k,i.a(new A.fV()),j)
for(h=s,g=J.a_(h.a),h=new A.F(g,h.b,h.$ti.h("F<1>")),f=a.a;h.k();){r=g.gm()
q=A.kK(f,a.bv(r,a5))
J.ft(a3,q)
J.fs(a2,r,q)}e=A.ax(new A.Z(k,i.a(new A.fW()),j),j.h("k.E"))
B.b.cf(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.A)(k),++d){o=k[d]
n=A.o9(J.lC(o,11))
if(i){h=J.jn(a2,"sceneColor")
h.toString
J.fs(a2,o,h)}else{h=n
if(typeof h!=="number")return h.cc()
if(h>=2){h=J.jn(a2,"sceneColor#1")
h.toString
J.fs(a2,o,h)}else{m=A.kK(f,a.bv(o,a5))
J.ft(a3,m)
J.fs(a2,o,m)}}}a0=A.kg(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.H(a0).h("d2<1>"),a0=new A.d2(a0,k),a0=new A.ad(a0,a0.gn(0),k.h("ad<O.E>")),j=a.a,i=t.V,k=k.h("O.E");a0.k();){h=a0.d
l=h==null?k.a(h):h
b=i.a(a1.a(l).a)
A.jD(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}throw c}},
bv(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.cB(512,512,1,B.T,!0)
if(a==="sceneDepth")return new A.cB(n,m,1,B.T,!0)
s=B.u.a1(a,"ssao")||B.u.a1(a,"bloomBlur")||B.u.a1(a,"dofBlur")||B.u.a1(a,"volumetricLight")
r=s?B.i.Z(n+1,2):n
q=s?B.i.Z(m+1,2):m
p=a==="sceneColor"
o=p||B.u.a1(a,"sceneColor#")
p=p?b.d:1
return new A.cB(r,q,p,o?B.ao:B.bt,o)},
cH(a){var s,r,q,p,o,n=A.jx(t.bS.a(a).gc9(),t.j)
for(n=A.jH(n,n.r,A.u(n).c),s=this.a,r=t.V,q=n.$ti.c;n.k();){p=n.d
o=r.a((p==null?q.a(p):p).a)
A.jD(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}
A.fV.prototype={
$1(a){return!B.u.a1(A.aS(a),"sceneColor#")},
$S:8}
A.fW.prototype={
$1(a){return B.u.a1(A.aS(a),"sceneColor#")},
$S:8}
A.dq.prototype={
u(){return"_SlotState."+this.b}}
A.bl.prototype={
saX(a){this.c=this.$ti.h("1?").a(a)}}
A.aN.prototype={
aY(a,b){var s,r,q,p,o=this,n=o.$ti
n.y[1].a(a)
s=o.c
r=s.length
if(r!==0){if(0>=r)return A.h(s,-1)
q=s.pop()}else{s=o.b
B.b.j(s,new A.bl(B.M,n.h("bl<2>")))
q=s.length-1}n=o.b
if(!(q>=0&&q<n.length))return A.h(n,q)
p=n[q];++p.a
p.b=B.dT
p.saX(a)
p.f=b;++o.d
return o.a.$3(q,p.a,b)},
de(a){return this.aY(a,null)},
a7(a){var s,r,q
this.$ti.c.a(a)
s=a.a
if(s<0||s>=this.b.length)throw A.c(A.bc(B.at,a))
r=this.b
if(!(s>=0&&s<r.length))return A.h(r,s)
q=r[s]
if(q.a!==a.b)throw A.c(A.bc(B.au,a))
s=q.b
if(s===B.N||s===B.M)throw A.c(A.bc(B.K,a))},
aZ(a){var s,r,q=this.$ti
q.c.a(a)
this.a7(a)
s=this.b
r=a.a
if(!(r>=0&&r<s.length))return A.h(s,r)
r=s[r].c
return r==null?q.y[1].a(r):r},
aD(a){var s,r,q,p=this
p.$ti.c.a(a)
s=a.a
if(s<0||s>=p.b.length)throw A.c(A.bc(B.at,a))
r=p.b
if(!(s>=0&&s<r.length))return A.h(r,s)
q=r[s]
if(q.a!==a.b)throw A.c(A.bc(B.au,a))
r=q.b
if(r===B.N||r===B.M)throw A.c(A.bc(B.bG,a))
q.b=B.N
q.saX(null)
B.b.j(p.c,s);++p.e},
ab(){return new A.aR(this.dv(),this.$ti.h("aR<+(1,2)>"))},
dv(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k,j,i
return function $async$ab(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b,n=s.a,m=s.$ti.y[1],l=0
case 2:if(!(l<o.length)){r=4
break}k=o[l]
j=k.b
if(j===B.N||j===B.M){r=3
break}j=n.$3(l,k.a,k.f)
i=k.c
r=5
return a.b=new A.af(j,i==null?m.a(i):i),1
case 5:case 3:++l
r=2
break
case 4:return 0
case 1:return a.c=p.at(-1),3}}}}}
A.fv.prototype={
u(){return"BlendEquation."+this.b}}
A.bQ.prototype={
u(){return"BlendFactor."+this.b}}
A.fA.prototype={
u(){return"CullFace."+this.b}}
A.fE.prototype={
u(){return"DepthFunc."+this.b}}
A.bT.prototype={}
A.a5.prototype={
u(){return"StateField."+this.b}}
A.i3.prototype={
df(a){var s,r=this.a
if(r==null)return A.m1(B.c2,t.d5)
s=A.ak(t.d5)
if(r.a!==a.a)s.j(0,B.a4)
if(r.b!==a.b)s.j(0,B.a5)
if(r.c!==a.c)s.j(0,B.a6)
if(r.d!==a.d)s.j(0,B.a7)
if(r.e!==a.e||r.f!==a.f)s.j(0,B.a8)
if(r.r!==a.r)s.j(0,B.a9)
if(r.w!==a.w)s.j(0,B.aa)
if(r.x!==a.x)s.j(0,B.ab)
return s}}
A.ba.prototype={$iaD:1}
A.dA.prototype={}
A.dz.prototype={}
A.fo.prototype={}
A.eN.prototype={
cm(a){var s=this,r=A.t(s.a.canvas)
s.c=A.aA(new A.i0(s))
s.d=A.aA(new A.i1(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
ah(a){var s=A.ci(this.a.getParameter(a))
return typeof s=="number"?B.n.dR(s):0},
bB(a){var s=A.ci(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
$ilS:1}
A.i0.prototype={
$1(a){A.t(a).preventDefault()
this.a.b=B.J},
$S:13}
A.i1.prototype={
$1(a){this.a.b=B.d},
$S:13}
A.iy.prototype={
d7(){var s,r=this
if(r.b!==B.d)A.m(A.l(u.k))
s=r.w?A.U(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.ba(new A.fo(s))},
bN(a){var s=a.a
if(!(s instanceof A.fo))throw A.c(A.aC(a,"query","is not a GPU timer query"))
return s}}
A.fn.prototype={}
A.i_.prototype={}
A.i2.prototype={
dd(a){var s=A.U(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.i_(A.my(s))}}
A.ja.prototype={
$1(a){var s,r,q,p
A.t(a)
s=A.aS(this.a.value)
A:{if("aces"===s){r=B.de
break A}if("reinhard"===s){r=B.aR
break A}if("off"===s){r=B.dd
break A}r=B.aS
break A}q=this.b
p=q.r
q.r=new A.cV(p.a,p.e,p.f,r)},
$S:2}
A.jb.prototype={
$1(a){var s,r,q,p,o=this,n=a.a,m=o.a
m.b=new A.aO(new A.i(0,0.5+Math.sin(n*1.5)*0.15,0),A.jA(B.l,n*0.4),1)
m.a8()
m=o.b
s=n*0.8
m.b=new A.aO(B.x,A.jA(B.l,s),1)
m.a8()
for(m=o.c,r=n*2,q=0;q<m.length;++q){p=m[q]
p.b=new A.aO(p.b.a,A.jA(B.dz.gS(),r+q),1)
p.a8()}m=n*1.2
p=n+2
s+=4
o.d.f=new A.cz(B.av,B.bR,1,B.bf,A.e([new A.bw(new A.i(Math.cos(m)*3.5,1.2+Math.sin(r)*0.5,Math.sin(m)*3.5),B.bL,3.5,8),new A.bw(new A.i(Math.cos(p)*4,1.5,Math.sin(p)*4),B.bQ,3.5,8),new A.bw(new A.i(Math.cos(s)*3,1,Math.sin(s)*3),B.bP,3,7),new A.bw(new A.i(0,3.5+Math.sin(n*2.5)*0.8,0),B.bS,4,9)],t.e))},
$S:60};(function aliases(){var s=J.bg.prototype
s.cl=s.i})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"np","lX",61)
r(A,"nQ","mK",5)
r(A,"nR","mL",5)
r(A,"nS","mM",5)
q(A,"lf","nK",0)
p(A.ea.prototype,"gdF","dG",19)
var o
p(o=A.eG.prototype,"gdB","dC",3)
p(o,"gdJ","dK",3)
p(o,"gdL","dM",3)
p(o,"gdD","dE",3)
p(o,"gdH","dI",3)
q(A,"lg","mN",63)
q(A,"oN","jy",42)
p(A.b2.prototype,"gbf","c8",52)
p(A.cU.prototype,"gbM","d1",55)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.w,null)
q(A.w,[A.ju,J.e3,A.d3,J.cm,A.k,A.cp,A.I,A.hQ,A.ad,A.cM,A.F,A.ab,A.b9,A.bZ,A.ct,A.bC,A.b4,A.hW,A.hi,A.cy,A.dr,A.bb,A.bu,A.h2,A.cJ,A.b_,A.cI,A.aG,A.f1,A.iv,A.it,A.eQ,A.aI,A.au,A.eV,A.bA,A.Q,A.eR,A.fg,A.dB,A.df,A.f4,A.bD,A.D,A.dx,A.fj,A.bq,A.i8,A.d5,A.i9,A.fM,A.a4,A.W,A.fh,A.eD,A.hh,A.hD,A.an,A.fy,A.fz,A.cV,A.co,A.cz,A.fO,A.fP,A.b3,A.h_,A.c2,A.dM,A.ac,A.dU,A.bw,A.ai,A.aF,A.a6,A.hY,A.bh,A.fD,A.hk,A.hz,A.es,A.c5,A.hS,A.d_,A.P,A.fQ,A.ea,A.eK,A.he,A.eG,A.hj,A.bt,A.dW,A.dX,A.dY,A.fN,A.cc,A.E,A.a3,A.L,A.n,A.cs,A.hB,A.a0,A.hE,A.X,A.hG,A.hF,A.f3,A.cZ,A.er,A.ia,A.fi,A.ir,A.f7,A.f0,A.fb,A.f6,A.im,A.ah,A.ag,A.S,A.fC,A.fB,A.dl,A.bP,A.bv,A.fR,A.b2,A.cX,A.aO,A.aP,A.i,A.cn,A.eT,A.dL,A.eU,A.dS,A.eW,A.cw,A.eY,A.dV,A.eZ,A.e1,A.f2,A.cN,A.f5,A.bS,A.dN,A.jz,A.cW,A.f8,A.ep,A.f9,A.bx,A.ey,A.fc,A.ez,A.fd,A.eB,A.ff,A.eA,A.fe,A.eL,A.fk,A.eM,A.fm,A.fl,A.d0,A.eP,A.fp,A.eu,A.dZ,A.fX,A.cB,A.d4,A.d,A.dT,A.bU,A.cU,A.em,A.fU,A.bl,A.aN,A.bT,A.i3,A.ba,A.dA,A.dz,A.fo,A.fn,A.iy,A.i_,A.i2])
q(J.e3,[J.e5,J.cD,J.cF,J.cE,J.cG,J.bY,J.be])
q(J.cF,[J.bg,J.r,A.c_,A.cR])
q(J.bg,[J.el,J.by,J.bf])
r(J.e4,A.d3)
r(J.h1,J.r)
q(J.bY,[J.cC,J.e6])
q(A.k,[A.ca,A.aw,A.cL,A.Z,A.bB,A.aR])
r(A.dC,A.ca)
r(A.dc,A.dC)
r(A.cq,A.dc)
q(A.I,[A.cH,A.b5,A.e7,A.eJ,A.et,A.f_,A.dJ,A.aJ,A.d9,A.eI,A.c7,A.dQ])
q(A.aw,[A.O,A.aZ,A.b0,A.aY,A.de])
q(A.O,[A.d6,A.ae,A.d2])
r(A.bk,A.b9)
q(A.bk,[A.af,A.dm,A.dn])
r(A.cd,A.bZ)
r(A.d7,A.cd)
r(A.cu,A.d7)
r(A.M,A.ct)
q(A.b4,[A.cv,A.dp,A.dy])
r(A.aK,A.cv)
r(A.cT,A.b5)
q(A.bb,[A.dO,A.dP,A.eF,A.j5,A.j7,A.i5,A.i4,A.iA,A.ik,A.je,A.jf,A.j_,A.j0,A.hZ,A.hb,A.hc,A.hd,A.hm,A.ha,A.hf,A.hT,A.hV,A.fI,A.fG,A.fH,A.hn,A.ho,A.hL,A.hK,A.hJ,A.hI,A.hH,A.hM,A.iR,A.iS,A.hN,A.hO,A.jm,A.jk,A.hA,A.fS,A.h9,A.iY,A.hy,A.hp,A.hq,A.hr,A.hs,A.ht,A.hu,A.hv,A.hw,A.fV,A.fW,A.i0,A.i1,A.ja,A.jb])
q(A.eF,[A.eC,A.bR])
q(A.bu,[A.aX,A.dd])
q(A.dP,[A.j6,A.iB,A.iW,A.il,A.h3,A.h8,A.jg,A.hg,A.hU,A.jh,A.fJ,A.hP,A.jl,A.jj])
q(A.cR,[A.eb,A.a1])
q(A.a1,[A.dh,A.dj])
r(A.di,A.dh)
r(A.cP,A.di)
r(A.dk,A.dj)
r(A.cQ,A.dk)
q(A.cP,[A.cO,A.ec])
q(A.cQ,[A.ed,A.ee,A.ef,A.eg,A.eh,A.cS,A.ei])
r(A.ds,A.f_)
q(A.dO,[A.i6,A.i7,A.iu,A.ib,A.ig,A.ie,A.id,A.ic,A.ij,A.ii,A.ih,A.iq,A.iV,A.iQ,A.iJ,A.iK,A.iP,A.iE,A.iG,A.iF,A.iO,A.iC,A.iD,A.iL,A.iM,A.iN,A.iI,A.iH,A.iT,A.iU,A.iZ])
r(A.db,A.eV)
r(A.fa,A.dB)
r(A.dg,A.dd)
r(A.aH,A.dp)
r(A.d8,A.dy)
q(A.aJ,[A.cY,A.e2])
q(A.i8,[A.c3,A.c8,A.bX,A.fu,A.e9,A.b8,A.cx,A.fw,A.fx,A.c4,A.bV,A.aE,A.eq,A.aW,A.d1,A.ex,A.cA,A.eS,A.eX,A.fT,A.e_,A.fY,A.fZ,A.bW,A.e0,A.c6,A.b7,A.cr,A.dq,A.fv,A.bQ,A.fA,A.fE,A.a5])
q(A.b3,[A.am,A.ap,A.aL,A.ek,A.bd])
r(A.ev,A.fb)
r(A.eN,A.fn)
s(A.dC,A.D)
s(A.dh,A.D)
s(A.di,A.ab)
s(A.dj,A.D)
s(A.dk,A.ab)
s(A.cd,A.dx)
s(A.dy,A.fj)
s(A.fb,A.im)
s(A.fn,A.iy)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{f:"int",q:"double",a9:"num",v:"String",z:"bool",W:"Null",y:"List",w:"Object",al:"Map",G:"JSObject"},mangledNames:{},types:["~()","aD()","W(G)","aD(ap?)","z(E)","~(~())","~(@)","z(a6)","z(v)","z(n)","W(@)","W()","z(q)","W(w?)","f(f,+(am,bh))","f(+influence,light(q,ai),+influence,light(q,ai))","@(v)","@(@,v)","W(~())","aF(aL)","aL(f,f,v?)","am(f,f,v?)","@(@)","W(@,bj)","ap(f,f,v?)","z(eH?)","f(f,+(ap,is))","f(+influence,source(q,da),+influence,source(q,da))","v(E)","f(x,x)","~(f,@)","W(w,bj)","z(f)","bd(f,f,v?)","d0(am)","aD(v{fallback:v?})","~(@,@)","ai?()","y<ai>()","co()","q()","bS()","z()","z(a4<v,P>)","P(a4<v,P>)","P(P,P)","f(S<ah>,S<ah>)","ao(S<ah>)","f(S<ag>,S<ag>)","ao(S<ag>)","~(i,i,i,i,i,i)","bv(q,q,q,q)","i(i)","~(bx)","bx()","~(a9)","d_(an)","~(G)","~(w?,w?)","w?(w?)","~(bU)","f(@,@)","z(an)","cc()","aD?()"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.af&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.dm&&a.b(c.a)&&b.b(c.b),"2;influence,source":(a,b)=>c=>c instanceof A.dn&&a.b(c.a)&&b.b(c.b)}}
A.n2(v.typeUniverse,JSON.parse('{"el":"bg","by":"bg","bf":"bg","ox":"c_","r":{"y":["1"],"G":[],"k":["1"]},"e5":{"z":[],"C":[]},"cD":{"C":[]},"cF":{"G":[]},"bg":{"G":[]},"e4":{"d3":[]},"h1":{"r":["1"],"y":["1"],"G":[],"k":["1"]},"cm":{"N":["1"]},"bY":{"q":[],"a9":[],"aa":["a9"]},"cC":{"q":[],"f":[],"a9":[],"aa":["a9"],"C":[]},"e6":{"q":[],"a9":[],"aa":["a9"],"C":[]},"be":{"v":[],"aa":["v"],"kt":[],"C":[]},"ca":{"k":["2"]},"cp":{"N":["2"]},"dc":{"D":["2"],"y":["2"],"ca":["1","2"],"k":["2"]},"cq":{"dc":["1","2"],"D":["2"],"y":["2"],"ca":["1","2"],"k":["2"],"D.E":"2","k.E":"2"},"cH":{"I":[]},"aw":{"k":["1"]},"O":{"aw":["1"],"k":["1"]},"d6":{"O":["1"],"aw":["1"],"k":["1"],"k.E":"1","O.E":"1"},"ad":{"N":["1"]},"cL":{"k":["2"],"k.E":"2"},"cM":{"N":["2"]},"ae":{"O":["2"],"aw":["2"],"k":["2"],"k.E":"2","O.E":"2"},"Z":{"k":["1"],"k.E":"1"},"F":{"N":["1"]},"d2":{"O":["1"],"aw":["1"],"k":["1"],"k.E":"1","O.E":"1"},"af":{"bk":[],"b9":[]},"dm":{"bk":[],"b9":[]},"dn":{"bk":[],"b9":[]},"cu":{"d7":["1","2"],"cd":["1","2"],"bZ":["1","2"],"dx":["1","2"],"al":["1","2"]},"ct":{"al":["1","2"]},"M":{"ct":["1","2"],"al":["1","2"]},"bB":{"k":["1"],"k.E":"1"},"bC":{"N":["1"]},"cv":{"b4":["1"],"bi":["1"],"k":["1"]},"aK":{"cv":["1"],"b4":["1"],"bi":["1"],"k":["1"]},"cT":{"b5":[],"I":[]},"e7":{"I":[]},"eJ":{"I":[]},"dr":{"bj":[]},"bb":{"br":[]},"dO":{"br":[]},"dP":{"br":[]},"eF":{"br":[]},"eC":{"br":[]},"bR":{"br":[]},"et":{"I":[]},"aX":{"bu":["1","2"],"kn":["1","2"],"al":["1","2"]},"aZ":{"aw":["1"],"k":["1"],"k.E":"1"},"cJ":{"N":["1"]},"b0":{"aw":["1"],"k":["1"],"k.E":"1"},"b_":{"N":["1"]},"aY":{"aw":["a4<1,2>"],"k":["a4<1,2>"],"k.E":"a4<1,2>"},"cI":{"N":["a4<1,2>"]},"bk":{"b9":[]},"c_":{"G":[],"C":[]},"cR":{"G":[]},"eb":{"G":[],"C":[]},"a1":{"aj":["1"],"G":[]},"cP":{"D":["q"],"a1":["q"],"y":["q"],"aj":["q"],"G":[],"k":["q"],"ab":["q"]},"cQ":{"D":["f"],"a1":["f"],"y":["f"],"aj":["f"],"G":[],"k":["f"],"ab":["f"]},"cO":{"fK":[],"D":["q"],"a1":["q"],"y":["q"],"aj":["q"],"G":[],"k":["q"],"ab":["q"],"C":[],"D.E":"q"},"ec":{"fL":[],"D":["q"],"a1":["q"],"y":["q"],"aj":["q"],"G":[],"k":["q"],"ab":["q"],"C":[],"D.E":"q"},"ed":{"D":["f"],"a1":["f"],"y":["f"],"aj":["f"],"G":[],"k":["f"],"ab":["f"],"C":[],"D.E":"f"},"ee":{"D":["f"],"a1":["f"],"y":["f"],"aj":["f"],"G":[],"k":["f"],"ab":["f"],"C":[],"D.E":"f"},"ef":{"D":["f"],"a1":["f"],"y":["f"],"aj":["f"],"G":[],"k":["f"],"ab":["f"],"C":[],"D.E":"f"},"eg":{"D":["f"],"a1":["f"],"y":["f"],"aj":["f"],"G":[],"k":["f"],"ab":["f"],"C":[],"D.E":"f"},"eh":{"D":["f"],"a1":["f"],"y":["f"],"aj":["f"],"G":[],"k":["f"],"ab":["f"],"C":[],"D.E":"f"},"cS":{"D":["f"],"a1":["f"],"y":["f"],"aj":["f"],"G":[],"k":["f"],"ab":["f"],"C":[],"D.E":"f"},"ei":{"eH":[],"D":["f"],"a1":["f"],"y":["f"],"aj":["f"],"G":[],"k":["f"],"ab":["f"],"C":[],"D.E":"f"},"f_":{"I":[]},"ds":{"b5":[],"I":[]},"aI":{"N":["1"]},"aR":{"k":["1"],"k.E":"1"},"au":{"I":[]},"db":{"eV":["1"]},"Q":{"bs":["1"]},"dB":{"kL":[]},"fa":{"dB":[],"kL":[]},"dd":{"bu":["1","2"],"al":["1","2"]},"dg":{"dd":["1","2"],"bu":["1","2"],"al":["1","2"]},"de":{"aw":["1"],"k":["1"],"k.E":"1"},"df":{"N":["1"]},"aH":{"b4":["1"],"ko":["1"],"bi":["1"],"k":["1"]},"bD":{"N":["1"]},"bu":{"al":["1","2"]},"bZ":{"al":["1","2"]},"d7":{"cd":["1","2"],"bZ":["1","2"],"dx":["1","2"],"al":["1","2"]},"b4":{"bi":["1"],"k":["1"]},"dp":{"b4":["1"],"bi":["1"],"k":["1"]},"d8":{"b4":["1"],"fj":["1"],"bi":["1"],"k":["1"]},"bq":{"aa":["bq"]},"q":{"a9":[],"aa":["a9"]},"f":{"a9":[],"aa":["a9"]},"y":{"k":["1"]},"a9":{"aa":["a9"]},"bi":{"k":["1"]},"v":{"aa":["v"],"kt":[]},"dJ":{"I":[]},"b5":{"I":[]},"aJ":{"I":[]},"cY":{"I":[]},"e2":{"I":[]},"d9":{"I":[]},"eI":{"I":[]},"c7":{"I":[]},"dQ":{"I":[]},"d5":{"I":[]},"fh":{"bj":[]},"am":{"b3":[]},"ap":{"b3":[]},"aL":{"b3":[]},"bd":{"b3":[]},"ek":{"b3":[]},"dY":{"mj":[]},"cZ":{"mm":[]},"f3":{"ao":[]},"er":{"mo":[]},"fi":{"ao":[]},"f7":{"ml":[]},"f0":{"lQ":[]},"ev":{"mq":[]},"ah":{"aa":["ah"]},"ag":{"aa":["ag"]},"cn":{"B":[]},"eT":{"x":[]},"dL":{"B":[]},"eU":{"x":[]},"dS":{"B":[]},"eW":{"x":[]},"cw":{"B":[]},"eY":{"x":[]},"dV":{"B":[]},"eZ":{"x":[]},"e1":{"B":[]},"f2":{"x":[]},"cN":{"B":[]},"f5":{"x":[]},"dN":{"mk":[]},"cW":{"B":[]},"f8":{"x":[]},"ep":{"B":[]},"f9":{"x":[]},"ey":{"B":[]},"fc":{"x":[]},"ez":{"B":[]},"fd":{"x":[]},"eB":{"B":[]},"ff":{"x":[]},"eA":{"B":[]},"fe":{"x":[]},"eL":{"B":[]},"fk":{"x":[]},"eM":{"B":[]},"fm":{"x":[]},"fl":{"x":[]},"eP":{"B":[]},"fp":{"x":[]},"dT":{"lM":[]},"ba":{"aD":[]},"eN":{"lS":[]},"lV":{"y":["f"],"k":["f"]},"eH":{"y":["f"],"k":["f"]},"mw":{"y":["f"],"k":["f"]},"lT":{"y":["f"],"k":["f"]},"mu":{"y":["f"],"k":["f"]},"lU":{"y":["f"],"k":["f"]},"mv":{"y":["f"],"k":["f"]},"fK":{"y":["q"],"k":["q"]},"fL":{"y":["q"],"k":["q"]}}'))
A.n1(v.typeUniverse,JSON.parse('{"dC":2,"a1":1,"dp":1,"dy":1}'))
var u={l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",b:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nuniform vec3 uClearColor;\nuniform vec3 uSkyHorizon;\nuniform vec3 uSkyZenith;\nuniform vec3 uSkyGround;\nuniform float uSkyEnabled;\nuniform float uSkyHorizonGlow;\nuniform float uSkyStarDensity;\nuniform sampler2D uSkyTexture;\nuniform float uSkyTextureEnabled;\nuniform float uSkyRotation;\nuniform float uSkyExposure;\nuniform float uSkyTextureSrgb;\nuniform mat4 uInverseProjection;\nuniform mat4 uInverseView;\nuniform vec3 uCameraPosition;\nuniform float uCloudCoverage;\nuniform float uCloudDensity;\nuniform float uCloudBaseHeight;\nuniform float uCloudThickness;\nuniform float uCloudScale;\nuniform vec2 uCloudWind;\nuniform float uCloudPhase;\nuniform float uCloudDetail;\nuniform float uCloudSilverLining;\nuniform float uCloudSampleCount;\nuniform vec3 uCloudLightDirection;\nuniform vec3 uCloudLightColor;\nuniform float uCloudLightIntensity;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 acesToneMap(vec3 color){\n  return clamp((color*(2.51*color+0.03))/(color*(2.43*color+0.59)+0.14),0.0,1.0);\n}\n\nvec3 agxToneMap(vec3 color){\n  const mat3 agxMat=mat3(\n    0.842479062253094,0.0423282422610123,0.0423756549057051,\n    0.0784335999999992,0.878468636469772,0.0784336,\n    0.0792237451477643,0.0791661274605434,0.879142973793104\n  );\n  const mat3 agxMatInv=mat3(\n    1.19687902425764,-0.0528968517032958,-0.0529716355080549,\n    -0.0980208811401368,1.15190312990417,-0.0980434501171241,\n    -0.0990297440797205,-0.0989611768448433,1.15107367264185\n  );\n  vec3 val=agxMat*color;\n  val=clamp(log2(max(val,vec3(1e-10)))*0.0625+0.625,0.0,1.0);\n  val=val*val*val*(val*(val*6.0-15.0)+10.0);\n  val=agxMatInv*val;\n  return max(val,vec3(0.0));\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nvec3 skyBackground(vec2 uv){\n  // A deliberately cheap, high-quality fallback sky: three atmospheric bands\n  // provide depth at every camera angle, while the tiny deterministic star\n  // field and horizon glow keep the clear background from reading as a flat\n  // color. It is an environment layer, not a game/weather simulation.\n  float lower=smoothstep(0.0,0.48,uv.y);\n  float upper=smoothstep(0.42,1.0,uv.y);\n  vec3 color=mix(uSkyGround,uSkyHorizon,lower);\n  color=mix(color,uSkyZenith,upper);\n  float horizonGlow=exp(-pow((uv.y-0.48)*7.0,2.0));\n  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);\n  float starMask=smoothstep(0.62,0.92,uv.y);\n  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),hash(floor(uv*vec2(180.0,100.0))))*starMask;\n  color+=vec3(0.16,0.19,0.24)*stars;\n  return max(color,vec3(0.0));\n}\n\nfloat hash3(vec3 p){\n  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);\n}\n\nfloat valueNoise(vec3 p){\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  f=f*f*(3.0-2.0*f);\n  float n000=hash3(i+vec3(0,0,0));\n  float n100=hash3(i+vec3(1,0,0));\n  float n010=hash3(i+vec3(0,1,0));\n  float n110=hash3(i+vec3(1,1,0));\n  float n001=hash3(i+vec3(0,0,1));\n  float n101=hash3(i+vec3(1,0,1));\n  float n011=hash3(i+vec3(0,1,1));\n  float n111=hash3(i+vec3(1,1,1));\n  float x00=mix(n000,n100,f.x);\n  float x10=mix(n010,n110,f.x);\n  float x01=mix(n001,n101,f.x);\n  float x11=mix(n011,n111,f.x);\n  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);\n}\n\nfloat cloudNoise(vec3 p){\n  float value=0.0;\n  float amplitude=0.5;\n  for(int octave=0;octave<4;octave++){\n    value+=valueNoise(p)*amplitude;\n    p=p*2.03+vec3(17.3,11.7,7.1);\n    amplitude*=0.5;\n  }\n  return value;\n}\n\nfloat cloudDensityAt(vec3 position){\n  float height01=clamp(\n    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),\n    0.0,1.0\n  );\n  float vertical=smoothstep(0.0,0.12,height01)*\n    (1.0-smoothstep(0.72,1.0,height01));\n  vec3 q=position*max(uCloudScale,0.00001)+\n    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);\n  float macro=cloudNoise(q*0.82);\n  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));\n  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));\n  float threshold=1.0-clamp(uCloudCoverage,0.,1.);\n  float body=smoothstep(threshold,threshold+0.26,shape);\n  return body*vertical*clamp(uCloudDensity,0.,1.);\n}\n\nvec4 volumetricClouds(vec3 worldDirection){\n  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){\n    return vec4(0.0);\n  }\n  float directionY=max(worldDirection.y,0.001);\n  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;\n  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;\n  startT=max(startT,0.0);\n  endT=max(endT,0.0);\n  if(endT<=startT) return vec4(0.0);\n  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));\n  float stepLength=(endT-startT)/float(sampleCount);\n  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;\n  vec3 sunDirection=normalize(-uCloudLightDirection);\n  float transmittance=1.0;\n  vec3 inScatter=vec3(0.0);\n  for(int i=0;i<24;i++){\n    if(i>=sampleCount) break;\n    float t=startT+(float(i)+0.5)*stepLength+jitter;\n    vec3 position=uCameraPosition+worldDirection*t;\n    float density=cloudDensityAt(position);\n    float opticalDepth=density*stepLength*0.0035;\n    float segmentAlpha=1.0-exp(-opticalDepth);\n    float towardLight=cloudDensityAt(position+sunDirection*90.0);\n    float lightTransmittance=exp(-towardLight*0.025);\n    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);\n    vec3 ambient=uSkyHorizon*0.32;\n    vec3 direct=uCloudLightColor*\n      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;\n    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;\n    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);\n    inScatter+=transmittance*segmentAlpha*sampleLight;\n    transmittance*=1.0-segmentAlpha;\n    if(transmittance<0.01) break;\n  }\n  return vec4(inScatter,1.0-transmittance);\n}\n\nvec3 srgbToLinear(vec3 color){\n  vec3 low=color/12.92;\n  vec3 high=pow((color+0.055)/1.055,vec3(2.4));\n  return mix(low,high,step(vec3(0.04045),color));\n}\n\nvec3 worldDirectionForUv(vec2 uv){\n  vec2 ndc=uv*2.0-1.0;\n  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);\n  return normalize(viewPoint.xyz/viewPoint.w);\n}\n\nvec3 equirectangularSky(vec2 uv){\n  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);\n  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;\n  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));\n  vec2 sampleUv=vec2(\n    fract(longitude/(2.0*3.14159265359)+0.5),\n    0.5-latitude/3.14159265359\n  );\n  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));\n  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));\n  return linear*max(uSkyExposure,0.0);\n}\n\nvoid main(){\n  vec4 source=texture(uTex,vUv);\n  // The world pass clears untouched pixels to uClearColor. Replace only that\n  // exact background, so the sky is always active without covering geometry.\n  if(uSkyEnabled>0.5 && distance(source.rgb,uClearColor)<0.004){\n    vec3 viewDirection=worldDirectionForUv(vUv);\n    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);\n    source.rgb=uSkyTextureEnabled>0.5\n      ? equirectangularSky(vUv)\n      : skyBackground(vUv);\n    vec4 clouds=volumetricClouds(worldDirection);\n    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;\n  }\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  vec3 mapped=uToneMap>3.0\n    ?agxToneMap(color)\n    :(uToneMap>1.5?acesToneMap(color):reinhardToneMap(color));\n  float toneMix=uToneMap>3.0\n    ?clamp(uToneMap-3.0,0.,1.)\n    :(uToneMap>1.5?clamp(uToneMap-1.5,0.,1.):clamp(uToneMap,0.,1.));\n  color=mix(color,mapped,toneMix);\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  // Atmospheric precipitation is submitted as depth-tested world geometry;\n  // the present pass must never paint weather over unrelated surfaces.\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",f:"Transform.scale must be finite and positive: ",k:"WebGl2Device: operation attempted while context is not ready"}
var t=(function rtii(){var s=A.bJ
return{v:s("au"),g0:s("ag"),fW:s("dM"),do:s("bS"),e8:s("aa<@>"),dN:s("cs"),I:s("M<v,f>"),P:s("aK<v>"),df:s("bq"),Q:s("I"),B:s("fK"),gN:s("fL"),o:s("P"),Z:s("br"),j:s("aD"),cr:s("k<cs>"),bM:s("k<q>"),hf:s("k<@>"),J:s("r<aD>"),b7:s("r<a3>"),gk:s("r<bt>"),cU:s("r<E>"),dV:s("r<bv>"),e:s("r<bw>"),eT:s("r<c2>"),cw:s("r<+influence,light(q,ai)>"),gg:s("r<+influence,source(q,da)>"),f:s("r<B>"),u:s("r<x>"),cR:s("r<cZ>"),C:s("r<n>"),c4:s("r<c5>"),h:s("r<ao>"),D:s("r<eu>"),aM:s("r<S<ag>>"),c1:s("r<S<ah>>"),w:s("r<ai>"),s:s("r<v>"),gi:s("r<i>"),q:s("r<da>"),cL:s("r<f6>"),ha:s("r<bl<aF>>"),c9:s("r<bl<bh>>"),aO:s("r<bl<c5>>"),fq:s("r<bl<is>>"),n:s("r<q>"),r:s("r<@>"),t:s("r<f>"),T:s("cD"),m:s("G"),E:s("bf"),aU:s("aj<@>"),_:s("y<a3>"),O:s("y<E>"),dy:s("y<v>"),aH:s("y<@>"),bW:s("y<f>"),ao:s("a4<v,P>"),bS:s("al<v,aD>"),a1:s("al<v,E>"),eL:s("aL"),cA:s("am"),a:s("W"),K:s("w"),fy:s("ah"),z:s("E"),eD:s("c2"),W:s("an"),gT:s("oy"),bQ:s("+()"),ai:s("+(am,bh)"),dU:s("+(ap,is)"),fk:s("+influence,light(q,ai)"),eS:s("+influence,source(q,da)"),fA:s("x"),b0:s("aN<bd,c5>"),ex:s("aN<aL,aF>"),cE:s("aN<am,bh>"),g2:s("aN<ap,is>"),L:s("n"),Y:s("ao"),U:s("bi<v>"),cJ:s("bi<f>"),b:s("S<ag>"),k:s("S<ah>"),l:s("bj"),d5:s("a5"),N:s("v"),aj:s("ap"),aX:s("mt"),dm:s("C"),eK:s("b5"),ak:s("by"),am:s("d8<v>"),bw:s("eK"),fP:s("i"),G:s("a6"),fl:s("Z<a6>"),an:s("F<a6>"),c:s("Q<@>"),cd:s("Q<~>"),hg:s("dg<w?,w?>"),a8:s("cc"),eM:s("aR<ao>"),V:s("dz"),R:s("dA"),y:s("z"),al:s("z(w)"),fg:s("z(a6)"),i:s("q"),A:s("@"),fO:s("@()"),x:s("@(w)"),d:s("@(w,bj)"),S:s("f"),eH:s("bs<W>?"),du:s("r<w?>?"),bX:s("G?"),X:s("w?"),ac:s("cU?"),dk:s("v?"),F:s("bA<@,@>?"),g:s("f4?"),fQ:s("z?"),cD:s("q?"),h6:s("f?"),cg:s("a9?"),a4:s("~(bU)?"),p:s("a9"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.bH=J.e3.prototype
B.b=J.r.prototype
B.i=J.cC.prototype
B.n=J.bY.prototype
B.u=J.be.prototype
B.bI=J.bf.prototype
B.bJ=J.cF.prototype
B.Y=A.cO.prototype
B.aF=J.el.prototype
B.af=J.by.prototype
B.dU=new A.fu(0,"opaque")
B.D=new A.fv(0,"add")
B.b1=new A.bQ(0,"zero")
B.z=new A.bQ(1,"one")
B.O=new A.fw(0,"alpha")
B.dV=new A.fD()
B.ap=new A.fY(1,"linear")
B.aq=new A.fZ(0,"clampToEdge")
B.b4=new A.fX()
B.ai=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.b5=function() {
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
B.ba=function(getTagFallback) {
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
B.b6=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.b9=function(hooks) {
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
B.b8=function(hooks) {
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
B.b7=function(hooks) {
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
B.aj=function(hooks) { return hooks; }

B.h=new A.hQ()
B.l=new A.i(0,1,0)
B.t=new A.i(0,-1,0)
B.L=new A.ac(1,1,1)
B.bb=new A.ai()
B.dF=new A.b8(0,"position")
B.dK=new A.a6(B.dF,0,3)
B.aZ=new A.b8(1,"normal")
B.dL=new A.a6(B.aZ,3,3)
B.ah=new A.b8(6,"tangent4")
B.dP=new A.a6(B.ah,6,4)
B.dG=new A.b8(2,"color")
B.dM=new A.a6(B.dG,10,4)
B.dH=new A.b8(4,"alpha")
B.dN=new A.a6(B.dH,14,1)
B.dI=new A.b8(5,"uv0")
B.dO=new A.a6(B.dI,15,2)
B.dJ=new A.b8(8,"legacyMaterialEffect")
B.dQ=new A.a6(B.dJ,17,1)
B.y=s([B.dK,B.dL,B.dP,B.dM,B.dN,B.dO,B.dQ],A.bJ("r<a6>"))
B.bc=new A.hY()
B.bd=new A.i2()
B.o=new A.fa()
B.E=new A.fh()
B.P=new A.cr(0,"colorOnly")
B.ak=new A.cr(1,"colorAndDepth")
B.Q=new A.cr(2,"depthOnly")
B.R=new A.fx(1,"srgb")
B.F=new A.fA(1,"back")
B.G=new A.fE(0,"less")
B.dD=new A.i(0.5,-1,0.3)
B.bN=new A.ac(1,0.95,0.85)
B.bf=new A.dU(B.dD,B.bN,2)
B.H=new A.cx(0,"opaque")
B.bg=new A.cx(1,"masked")
B.S=new A.cx(2,"blended")
B.bh=new A.bT(!1,B.G,!1,!0,B.z,B.z,B.D,!1,B.F,!0,!1,!0,!0,!0,!0,!1)
B.bi=new A.bT(!0,B.G,!1,!0,B.z,B.z,B.D,!0,B.F,!0,!1,!0,!0,!0,!0,!1)
B.b2=new A.bQ(2,"srcAlpha")
B.b3=new A.bQ(3,"oneMinusSrcAlpha")
B.bj=new A.bT(!0,B.G,!1,!0,B.b2,B.b3,B.D,!0,B.F,!0,!1,!0,!0,!0,!0,!1)
B.bO=new A.ac(0.03,0.03,0.04)
B.v=new A.ac(0,0,0)
B.ay=s([],t.e)
B.W=s([],t.w)
B.aw=s([],t.q)
B.ax=s([],A.bJ("r<mt>"))
B.bk=new A.cz(B.bO,B.L,0,null,B.ay)
B.av=new A.ac(0.02,0.025,0.035)
B.bM=new A.ac(0.04,0.05,0.07)
B.dB=new A.i(0.6,-1,0.4)
B.bK=new A.ac(1,0.95,0.88)
B.be=new A.dU(B.dB,B.bK,2.2)
B.bl=new A.cz(B.av,B.bM,1,B.be,B.ay)
B.bm=new A.P(0,0,0)
B.bn=new A.bV(0,"idle")
B.I=new A.bV(1,"active")
B.bo=new A.bV(2,"ended")
B.bp=new A.bV(3,"aborted")
B.al=new A.cA(0,"outside")
B.bq=new A.cA(1,"intersects")
B.br=new A.cA(2,"inside")
B.bs=new A.e_(0,"vertex")
B.am=new A.e_(1,"indices")
B.an=new A.fT(0,"staticDraw")
B.d=new A.e0(0,"ready")
B.J=new A.e0(1,"lost")
B.bt=new A.bW(0,"color")
B.ao=new A.bW(1,"colorAndGlow")
B.bu=new A.bW(2,"colorDepthGlow")
B.T=new A.bW(3,"depthOnly")
B.bv=new A.aW(0,"beforeShadow")
B.bw=new A.aW(2,"beforeDepth")
B.U=new A.aW(3,"afterDepth")
B.ar=new A.aW(4,"beforeWorld")
B.bx=new A.aW(5,"afterWorld")
B.q=new A.aW(6,"afterResolve")
B.by=new A.aW(9,"beforePresent")
B.as=new A.aE(0,"readBeforeWrite")
B.bz=new A.aE(1,"duplicateWriter")
B.bA=new A.aE(2,"sampledMultisampledAttachment")
B.V=new A.aE(3,"invalidResolve")
B.bB=new A.aE(4,"formatOrSizeMismatch")
B.bC=new A.aE(5,"unversionedReadWrite")
B.bD=new A.aE(6,"invalidHistoryRead")
B.bE=new A.aE(7,"dependencyCycle")
B.bF=new A.aE(8,"missingCapability")
B.at=new A.bX(0,"wrongKind")
B.au=new A.bX(1,"staleGeneration")
B.bG=new A.bX(2,"doubleRelease")
B.K=new A.bX(3,"releasedResource")
B.bL=new A.ac(1,0.2,0.2)
B.bP=new A.ac(0.2,1,0.4)
B.bQ=new A.ac(0.2,0.4,1)
B.bR=new A.ac(0.03,0.04,0.06)
B.bS=new A.ac(1,0.8,0.3)
B.bT=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.bU=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale","uShadowMapTexelSize","uShadowFilterRadius","uShadowBias","uReflectionColor","uReflectionIntensity","uReflectionConfidence","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uSpecularScale","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness","uSurfaceSnowCoverage","uSurfaceDissolution","uThermalSourceCount","uThermalSourcePosition0","uThermalSourceRadius0","uThermalSourceDissolution0","uThermalSourcePosition1","uThermalSourceRadius1","uThermalSourceDissolution1","uThermalSourcePosition2","uThermalSourceRadius2","uThermalSourceDissolution2","uThermalSourcePosition3","uThermalSourceRadius3","uThermalSourceDissolution3"],t.s)
B.bV=s(["uQuantizationBits","uDitherStrength"],t.s)
B.bW=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.bX=s(["uNear","uFar","uLightDir","uLightColor","uShaftIntensity","uFogDensity","uAnisotropy","uViewProjection","uView","uInverseProjection","uVolumetricAlbedo","uVolumetricHeightFalloff","uVolumetricDustDensity","uVolumetricJitter","uVolumetricIntensity","uVolumetricSampleCount"],t.s)
B.bY=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.bZ=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.c_=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale"],t.s)
B.c0=s([],t.u)
B.Z=new A.c3(2,"high")
B.cw={shadows:0,ssao:1,bloom:2,dof:3,grade:4,volumetric:5}
B.d7=new A.aK(B.cw,6,t.P)
B.cO=new A.an(B.Z,B.d7)
B.cp={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.d4=new A.aK(B.cp,5,t.P)
B.aI=new A.an(B.Z,B.d4)
B.cL=new A.c3(1,"standard")
B.cx={shadows:0}
B.d8=new A.aK(B.cx,1,t.P)
B.cN=new A.an(B.cL,B.d8)
B.aG=new A.c3(0,"safe")
B.aE={}
B.a3=new A.aK(B.aE,0,t.P)
B.aH=new A.an(B.aG,B.a3)
B.X=s([B.cO,B.aI,B.cN,B.aH],A.bJ("r<an>"))
B.c1=s(["uExposure","uVignette","uGrain","uOutputEncoding","uToneMap","uClearColor","uSkyHorizon","uSkyZenith","uSkyGround","uSkyEnabled","uSkyHorizonGlow","uSkyStarDensity","uSkyTexture","uSkyTextureEnabled","uSkyRotation","uSkyExposure","uSkyTextureSrgb","uInverseProjection","uInverseView","uCameraPosition","uCloudCoverage","uCloudDensity","uCloudBaseHeight","uCloudThickness","uCloudScale","uCloudWind","uCloudPhase","uCloudDetail","uCloudSilverLining","uCloudSampleCount","uCloudLightDirection","uCloudLightColor","uCloudLightIntensity"],t.s)
B.a4=new A.a5(0,"depthTest")
B.a5=new A.a5(1,"depthFunc")
B.a6=new A.a5(2,"depthWrite")
B.a7=new A.a5(3,"blendEnable")
B.a8=new A.a5(4,"blendFunc")
B.a9=new A.a5(5,"blendEquation")
B.aa=new A.a5(6,"cullEnable")
B.ab=new A.a5(7,"cullFace")
B.aQ=new A.a5(8,"frontFace")
B.dc=new A.a5(9,"stencilEnable")
B.aO=new A.a5(10,"colorMask")
B.aP=new A.a5(11,"scissorEnable")
B.c2=s([B.a4,B.a5,B.a6,B.a7,B.a8,B.a9,B.aa,B.ab,B.aQ,B.dc,B.aO,B.aP],A.bJ("r<a5>"))
B.c3=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.c4=s(["uBloomStrength"],t.s)
B.c5=s(["uLutSize","uStrength"],t.s)
B.c6=s(["uTexelSize","uNear","uFar"],t.s)
B.az=s(["uTexelStep"],t.s)
B.c7=s(["uVolumetricStrength"],t.s)
B.cy={uAlbedo:0}
B.aA=new A.M(B.cy,[0],t.I)
B.cF={uSsaoRaw:0,uSceneDepth:1}
B.c8=new A.M(B.cF,[0,1],t.I)
B.cC={uScene:0,uHistory:1}
B.c9=new A.M(B.cC,[0,1],t.I)
B.ct={aPosition:0,aUvMat:1}
B.aB=new A.M(B.ct,[0,4],t.I)
B.cD={uScene:0,uLut:1}
B.ca=new A.M(B.cD,[0,1],t.I)
B.cE={uSource:0}
B.aC=new A.M(B.cE,[0],t.I)
B.cv={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.cb=new A.M(B.cv,[0,1,2,3,4,5,6],t.I)
B.cr={uSharp:0,uBlurred:1,uSceneDepth:2}
B.cc=new A.M(B.cr,[0,1,2],t.I)
B.cG={uTex:0,uSkyTexture:1}
B.cd=new A.M(B.cG,[0,1],t.I)
B.cz={uBloom:0}
B.ce=new A.M(B.cz,[0],t.I)
B.cA={uSceneDepth:0}
B.aD=new A.M(B.cA,[0],t.I)
B.cB={uScene:0}
B.cf=new A.M(B.cB,[0],t.I)
B.m=new A.M(B.aE,[],t.I)
B.co={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.cg=new A.M(B.co,[0,1,2,3,4,5,6],t.I)
B.cH={uVolumetric:0}
B.ch=new A.M(B.cH,[0],t.I)
B.cu={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.ci=new A.M(B.cu,[0,1,2,3],t.I)
B.dW=new A.e9(0,"srgb")
B.dX=new A.e9(1,"linear")
B.cj=new A.aF("emerald",0.15,0.85,0.45,0.35,0.3,0,0.2)
B.ck=new A.aF("sapphire",0.2,0.45,0.95,0.3,0.4,0,0.2)
B.cl=new A.aF("ruby",0.95,0.15,0.25,0.25,0.5,0,0.2)
B.cm=new A.aF("ground",0.12,0.14,0.18,0.7,0.1,0,0.2)
B.cn=new A.aF("gold_sphere",1,0.76,0.33,0.15,0.95,0.8,0.1)
B.cI=new A.ek(0,1,null)
B.aS=new A.c8(3,"agx")
B.cJ=new A.cV(1.1,0.25,0.15,B.aS)
B.aR=new A.c8(1,"reinhard")
B.cK=new A.cV(1,0,0,B.aR)
B.cM=new A.c3(4,"shipping")
B.cq={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.d6=new A.aK(B.cq,7,t.P)
B.dY=new A.an(B.cM,B.d6)
B.A=new A.cX(0,0,0,1)
B.a_=new A.c4(0,"constructed")
B.cP=new A.c4(1,"initializing")
B.a0=new A.c4(2,"ready")
B.a1=new A.c4(3,"contextLost")
B.c=new A.d1(0,"read")
B.e=new A.d1(1,"write")
B.r=new A.d1(2,"historyRead")
B.k=new A.eq(0,"rgba8")
B.cQ=new A.L("dofBlurH",B.k,192,108,1,0)
B.cR=new A.L("dofBlurV",B.k,192,108,1,0)
B.cS=new A.L("dofOutput",B.k,384,216,1,0)
B.aJ=new A.eq(2,"depth24")
B.cT=new A.L("shadowMap",B.aJ,512,512,1,0)
B.cU=new A.L("volumetricLight",B.k,192,108,1,0)
B.cV=new A.L("sceneColor",B.k,384,216,1,1)
B.cW=new A.L("ssaoRaw",B.k,192,108,1,0)
B.cX=new A.L("ssaoBlurred",B.k,192,108,1,0)
B.cY=new A.L("gradeOutput",B.k,384,216,1,0)
B.cZ=new A.L("vhsOutput",B.k,384,216,1,0)
B.d_=new A.L("sceneDepth",B.aJ,384,216,1,0)
B.d0=new A.L("bloomBlurH",B.k,192,108,1,0)
B.d1=new A.L("bloomBlurV",B.k,192,108,1,0)
B.d2=new A.L("present",B.k,384,216,1,0)
B.a2=new A.L("sceneColor",B.k,384,216,1,0)
B.d3=new A.L("ps1Output",B.k,384,216,1,0)
B.cs={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8,volumetric:9}
B.d5=new A.aK(B.cs,10,t.P)
B.aM=new A.c6(2,"link")
B.d9=new A.d4(B.aM,"gl.createProgram() returned null")
B.aK=new A.c6(0,"vertex")
B.aL=new A.c6(1,"fragment")
B.aN=new A.c6(3,"validation")
B.da=new A.ex(0,"full")
B.db=new A.ex(2,"culled")
B.dd=new A.c8(0,"off")
B.de=new A.c8(2,"aces")
B.x=new A.i(0,0,0)
B.ac=new A.aO(B.x,B.A,1)
B.df=A.aB("oo")
B.dg=A.aB("op")
B.dh=A.aB("fK")
B.di=A.aB("fL")
B.dj=A.aB("lT")
B.dk=A.aB("lU")
B.dl=A.aB("lV")
B.dm=A.aB("G")
B.dn=A.aB("w")
B.dp=A.aB("mu")
B.dq=A.aB("mv")
B.dr=A.aB("mw")
B.ds=A.aB("eH")
B.a=new A.b7(0,"float1")
B.ad=new A.b7(1,"float2")
B.f=new A.b7(2,"float3")
B.dt=new A.b7(3,"float4")
B.j=new A.b7(4,"mat4")
B.aT=new A.b7(5,"mat4Array")
B.ae=new A.d(B.a,0)
B.aU=new A.d(B.a,1)
B.w=new A.b7(6,"sampler")
B.p=new A.d(B.w,0)
B.B=new A.d(B.w,1)
B.aV=new A.d(B.w,2)
B.du=new A.d(B.w,3)
B.dv=new A.d(B.w,4)
B.dw=new A.d(B.w,5)
B.dx=new A.d(B.w,6)
B.aW=new A.i(0,0,1)
B.aX=new A.i(0,0,-1)
B.dy=new A.i(0,2,5)
B.C=new A.i(1,0,0)
B.dz=new A.i(1,1,0)
B.dA=new A.i(1/0,1/0,1/0)
B.aY=new A.i(0,0.5,0)
B.dC=new A.i(0,-0.2,-1)
B.ag=new A.i(-1,0,0)
B.dE=new A.i(-1/0,-1/0,-1/0)
B.b_=new A.eS(0,"horizontal")
B.dR=new A.eS(1,"vertical")
B.b0=new A.eX(0,"horizontal")
B.dS=new A.eX(1,"vertical")
B.M=new A.dq(0,"empty")
B.dT=new A.dq(1,"cpuReady")
B.N=new A.dq(4,"released")})();(function staticFields(){$.io=null
$.at=A.e([],A.bJ("r<w>"))
$.ku=null
$.kc=null
$.kb=null
$.li=null
$.le=null
$.lk=null
$.j2=null
$.j8=null
$.k_=null
$.ip=A.e([],A.bJ("r<y<w>?>"))
$.ce=null
$.dE=null
$.dF=null
$.jR=!1
$.J=B.o})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"or","lq",()=>A.j4("_$dart_dartClosure"))
s($,"oq","k2",()=>A.j4("_$dart_dartClosure_dartJSInterop"))
s($,"oM","lB",()=>A.e([new J.e4()],A.bJ("r<d3>")))
s($,"oA","lr",()=>A.b6(A.hX({
toString:function(){return"$receiver$"}})))
s($,"oB","ls",()=>A.b6(A.hX({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"oC","lt",()=>A.b6(A.hX(null)))
s($,"oD","lu",()=>A.b6(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"oG","lx",()=>A.b6(A.hX(void 0)))
s($,"oH","ly",()=>A.b6(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"oF","lw",()=>A.b6(A.kB(null)))
s($,"oE","lv",()=>A.b6(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"oJ","lA",()=>A.b6(A.kB(void 0)))
s($,"oI","lz",()=>A.b6(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"oK","k8",()=>A.mJ())
s($,"oL","dH",()=>A.jd(B.dn))
s($,"on","lp",()=>B.a2.c1())
s($,"ow","k7",()=>A.ej(A.e([255,255,255,255],t.t)))
s($,"ot","k4",()=>A.ej(A.e([128,128,255,255],t.t)))
s($,"os","k3",()=>A.ej(A.e([0,0,0,255],t.t)))
s($,"ou","k5",()=>A.ej(A.e([255,255,0,255],t.t)))
s($,"ov","k6",()=>A.ej(A.e([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.c_,SharedArrayBuffer:A.c_,ArrayBufferView:A.cR,DataView:A.eb,Float32Array:A.cO,Float64Array:A.ec,Int16Array:A.ed,Int32Array:A.ee,Int8Array:A.ef,Uint16Array:A.eg,Uint32Array:A.eh,Uint8ClampedArray:A.cS,CanvasPixelArray:A.cS,Uint8Array:A.ei})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.a1.$nativeSuperclassTag="ArrayBufferView"
A.dh.$nativeSuperclassTag="ArrayBufferView"
A.di.$nativeSuperclassTag="ArrayBufferView"
A.cP.$nativeSuperclassTag="ArrayBufferView"
A.dj.$nativeSuperclassTag="ArrayBufferView"
A.dk.$nativeSuperclassTag="ArrayBufferView"
A.cQ.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$6=function(a,b,c,d,e,f){return this(a,b,c,d,e,f)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.j9
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
