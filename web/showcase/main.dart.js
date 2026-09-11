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
if(a[b]!==s){A.ox(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
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
if(m==null)if($.k4==null){A.oi()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.b(A.kK("Return interceptor for "+A.o(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iq
if(o==null)o=$.iq=A.j6(n)
p=q[o]}if(p!=null)return p
p=A.oo(a)
if(p!=null)return p
if(typeof a=="function")return B.bJ
s=Object.getPrototypeOf(a)
if(s==null)return B.aI
if(s===Object.prototype)return B.aI
if(typeof q=="function"){o=$.iq
if(o==null)o=$.iq=A.j6(n)
Object.defineProperty(q,o,{value:B.ai,enumerable:false,writable:true,configurable:true})
return B.ai}return B.ai},
ko(a,b){if(a<0||a>4294967295)throw A.b(A.aP(a,0,4294967295,"length",null))
return J.kq(new Array(a),b)},
kp(a,b){if(a<0)throw A.b(A.j("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("r<0>"))},
jx(a,b){if(a<0)throw A.b(A.j("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("r<0>"))},
kq(a,b){var s=A.c(a,b.h("r<0>"))
s.$flags=1
return s},
m3(a,b){var s=t.e8
return J.ke(s.a(a),s.a(b))},
kr(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
m4(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.kr(r))break;++b}return b},
m5(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.i(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.kr(q))break}return b},
bO(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cE.prototype
return J.e7.prototype}if(typeof a=="string")return J.bg.prototype
if(a==null)return J.cF.prototype
if(typeof a=="boolean")return J.e6.prototype
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bh.prototype
if(typeof a=="symbol")return J.cI.prototype
if(typeof a=="bigint")return J.cG.prototype
return a}if(a instanceof A.w)return a
return J.k2(a)},
j5(a){if(typeof a=="string")return J.bg.prototype
if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bh.prototype
if(typeof a=="symbol")return J.cI.prototype
if(typeof a=="bigint")return J.cG.prototype
return a}if(a instanceof A.w)return a
return J.k2(a)},
cm(a){if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bh.prototype
if(typeof a=="symbol")return J.cI.prototype
if(typeof a=="bigint")return J.cG.prototype
return a}if(a instanceof A.w)return a
return J.k2(a)},
oe(a){if(typeof a=="number")return J.c0.prototype
if(typeof a=="string")return J.bg.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bC.prototype
return a},
of(a){if(typeof a=="string")return J.bg.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bC.prototype
return a},
aV(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bO(a).V(a,b)},
jr(a,b){if(typeof b==="number")if(Array.isArray(a)||A.om(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.cm(a).q(a,b)},
fu(a,b,c){return J.cm(a).D(a,b,c)},
fv(a,b){return J.cm(a).j(a,b)},
ke(a,b){return J.oe(a).I(a,b)},
js(a,b){return J.cm(a).R(a,b)},
K(a){return J.bO(a).gJ(a)},
a1(a){return J.cm(a).gt(a)},
bs(a){return J.j5(a).gn(a)},
dI(a){return J.bO(a).gF(a)},
lJ(a,b){return J.of(a).cm(a,b)},
bS(a){return J.bO(a).i(a)},
e4:function e4(){},
e6:function e6(){},
cF:function cF(){},
cH:function cH(){},
bi:function bi(){},
em:function em(){},
bC:function bC(){},
bh:function bh(){},
cG:function cG(){},
cI:function cI(){},
r:function r(a){this.$ti=a},
e5:function e5(){},
h3:function h3(a){this.$ti=a},
cp:function cp(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
c0:function c0(){},
cE:function cE(){},
e7:function e7(){},
bg:function bg(){}},A={jy:function jy(){},
ks(a){return new A.cJ("Field '"+a+"' has been assigned during initialization.")},
m6(a){return new A.cJ("Field '"+a+"' has not been initialized.")},
a_(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
eG(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
bM(a,b,c){return a},
k5(a){var s,r
for(s=$.av.length,r=0;r<s;++r)if(a===$.av[r])return!0
return!1},
hT(a,b,c,d){A.hE(b,"start")
if(c!=null){A.hE(c,"end")
if(b>c)A.l(A.aP(b,0,c,"start",null))}return new A.d7(a,b,c,d.h("d7<0>"))},
jv(){return new A.ca("No element")},
kn(){return new A.ca("Too many elements")},
cd:function cd(){},
cs:function cs(a,b){this.a=a
this.$ti=b},
dd:function dd(){},
ct:function ct(a,b){this.a=a
this.$ti=b},
cJ:function cJ(a){this.a=a},
hS:function hS(){},
ay:function ay(){},
O:function O(){},
d7:function d7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ae:function ae(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cN:function cN(a,b,c){this.a=a
this.b=b
this.$ti=c},
cO:function cO(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
af:function af(a,b,c){this.a=a
this.b=b
this.$ti=c},
a0:function a0(a,b,c){this.a=a
this.b=b
this.$ti=c},
F:function F(a,b,c){this.a=a
this.b=b
this.$ti=c},
ad:function ad(){},
d3:function d3(a,b){this.a=a
this.$ti=b},
dC:function dC(){},
kl(a,b,c){var s,r,q,p,o,n,m,l=A.u(a),k=A.h7(new A.aZ(a,l.h("aZ<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.A)(k),++i,p=o){r=k[i]
c.a(a.q(0,r))
o=p+1
q[r]=p}n=A.h7(new A.b0(a,l.h("b0<2>")),!0,c)
m=new A.M(q,n,b.h("@<0>").K(c).h("M<1,2>"))
m.$keys=k
return m}return new A.cx(A.m8(a,b,c),b.h("@<0>").K(c).h("cx<1,2>"))},
lR(){throw A.b(A.cc("Cannot modify constant Set"))},
lv(a){var s=A.lu(a)
if(s!=null)return s
return"minified:"+a},
om(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
o(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bS(a)
return s},
eo(a){var s,r=$.kC
if(r==null)r=$.kC=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
mq(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.i(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
ep(a){var s,r,q,p
if(a instanceof A.w)return A.au(A.bP(a),null)
s=J.bO(a)
if(s===B.bI||s===B.bK||t.ak.b(a)){r=B.am(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.au(A.bP(a),null)},
kD(a){var s,r,q
if(a==null||typeof a=="number"||A.jV(a))return J.bS(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bd)return a.i(0)
if(a instanceof A.bb)return a.bR(!0)
s=$.lI()
for(r=0;r<1;++r){q=s[r].e0(a)
if(q!=null)return q}return"Instance of '"+A.ep(a)+"'"},
c4(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mp(a){var s=A.c4(a).getUTCFullYear()+0
return s},
mn(a){var s=A.c4(a).getUTCMonth()+1
return s},
mj(a){var s=A.c4(a).getUTCDate()+0
return s},
mk(a){var s=A.c4(a).getUTCHours()+0
return s},
mm(a){var s=A.c4(a).getUTCMinutes()+0
return s},
mo(a){var s=A.c4(a).getUTCSeconds()+0
return s},
ml(a){var s=A.c4(a).getUTCMilliseconds()+0
return s},
mi(a){var s=a.$thrownJsError
if(s==null)return null
return A.cn(s)},
kE(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.U(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
i(a,b){if(a==null)J.bs(a)
throw A.b(A.j3(a,b))},
j3(a,b){var s,r="index"
if(!A.ld(b))return new A.aM(!0,b,r,null)
s=A.a(J.bs(a))
if(b<0||b>=s)return A.h2(b,s,a,r)
return new A.cZ(null,null,!0,b,r,"Value not in range")},
o0(a){return new A.aM(!0,a,null,null)},
dG(a){return a},
b(a){return A.U(a,new Error())},
U(a,b){var s
if(a==null)a=new A.b6()
b.dartException=a
s=A.oy
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
oy(){return J.bS(this.dartException)},
l(a,b){throw A.U(a,b==null?new Error():b)},
br(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.l(A.np(a,b,c),s)},
np(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.da("'"+s+"': Cannot "+o+" "+l+k+n)},
A(a){throw A.b(A.ax(a))},
b7(a){var s,r,q,p,o,n
a=A.or(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.c([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.hY(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
hZ(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
kJ(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jz(a,b){var s=b==null,r=s?null:b.method
return new A.e8(a,r,s?null:b.receiver)},
bR(a){var s
if(a==null)return new A.hk(a)
if(a instanceof A.cB){s=a.a
return A.bq(a,s==null?A.dD(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bq(a,a.dartException)
return A.o_(a)},
bq(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
o_(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.i.d1(r,16)&8191)===10)switch(q){case 438:return A.bq(a,A.jz(A.o(s)+" (Error "+q+")",null))
case 445:case 5007:A.o(s)
return A.bq(a,new A.cV())}}if(a instanceof TypeError){p=$.ly()
o=$.lz()
n=$.lA()
m=$.lB()
l=$.lE()
k=$.lF()
j=$.lD()
$.lC()
i=$.lH()
h=$.lG()
g=p.a_(s)
if(g!=null)return A.bq(a,A.jz(A.aK(s),g))
else{g=o.a_(s)
if(g!=null){g.method="call"
return A.bq(a,A.jz(A.aK(s),g))}else if(n.a_(s)!=null||m.a_(s)!=null||l.a_(s)!=null||k.a_(s)!=null||j.a_(s)!=null||m.a_(s)!=null||i.a_(s)!=null||h.a_(s)!=null){A.aK(s)
return A.bq(a,new A.cV())}}return A.bq(a,new A.eL(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.d6()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bq(a,new A.aM(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.d6()
return a},
cn(a){var s
if(a instanceof A.cB)return a.b
if(a==null)return new A.dr(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.dr(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
jh(a){if(a==null)return J.K(a)
if(typeof a=="object")return A.eo(a)
return J.K(a)},
oc(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.D(0,a[s],a[r])}return b},
od(a,b){var s,r=a.length
for(s=0;s<r;++s)b.j(0,a[s])
return b},
nC(a,b,c,d,e,f){t.Z.a(a)
switch(A.a(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.ib("Unsupported number of arguments for wrapped closure"))},
ck(a,b){var s=a.$identity
if(!!s)return s
s=A.o7(a,b)
a.$identity=s
return s},
o7(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.nC)},
lQ(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.eE().constructor.prototype):Object.create(new A.bU(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.kk(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.lM(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.kk(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
lM(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.lK)}throw A.b("Error in functionType of tearoff")},
lN(a,b,c,d){var s=A.ki
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
kk(a,b,c,d){if(c)return A.lP(a,b,d)
return A.lN(b.length,d,a,b)},
lO(a,b,c,d){var s=A.ki,r=A.lL
switch(b?-1:a){case 0:throw A.b(new A.eu("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
lP(a,b,c){var s,r
if($.kg==null)$.kg=A.kf("interceptor")
if($.kh==null)$.kh=A.kf("receiver")
s=b.length
r=A.lO(s,c,a,b)
return r},
k0(a){return A.lQ(a)},
lK(a,b){return A.dw(v.typeUniverse,A.bP(a.a),b)},
ki(a){return a.a},
lL(a){return a.b},
kf(a){var s,r,q,p=new A.bU("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.j("Field name "+a+" not found.",null))},
j6(a){return v.getIsolateTag(a)},
ls(){return v.G},
oo(a){var s,r,q,p,o,n=A.aK($.lp.$1(a)),m=$.j4[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ja[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bJ($.ll.$2(a,n))
if(q!=null){m=$.j4[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ja[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jg(s)
$.j4[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.ja[n]=s
return s}if(p==="-"){o=A.jg(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.lq(a,s)
if(p==="*")throw A.b(A.kK(n))
if(v.leafTags[n]===true){o=A.jg(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.lq(a,s)},
lq(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.k6(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jg(a){return J.k6(a,!1,null,!!a.$ial)},
op(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jg(s)
else return J.k6(s,c,null,null)},
oi(){if(!0===$.k4)return
$.k4=!0
A.oj()},
oj(){var s,r,q,p,o,n,m,l
$.j4=Object.create(null)
$.ja=Object.create(null)
A.oh()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.lr.$1(o)
if(n!=null){m=A.op(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
oh(){var s,r,q,p,o,n,m=B.b8()
m=A.cj(B.b9,A.cj(B.ba,A.cj(B.an,A.cj(B.an,A.cj(B.bb,A.cj(B.bc,A.cj(B.bd(B.am),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.lp=new A.j7(p)
$.ll=new A.j8(o)
$.lr=new A.j9(n)},
cj(a,b){return a(b)||b},
o8(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
ow(a,b,c){var s=a.indexOf(b,c)
return s>=0},
or(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
ag:function ag(a,b){this.a=a
this.b=b},
dm:function dm(a,b){this.a=a
this.b=b},
dn:function dn(a,b){this.a=a
this.b=b},
cx:function cx(a,b){this.a=a
this.$ti=b},
cw:function cw(){},
M:function M(a,b,c){this.a=a
this.b=b
this.$ti=c},
bF:function bF(a,b){this.a=a
this.$ti=b},
bG:function bG(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cy:function cy(){},
aN:function aN(a,b,c){this.a=a
this.b=b
this.$ti=c},
d4:function d4(){},
hY:function hY(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cV:function cV(){},
e8:function e8(a,b,c){this.a=a
this.b=b
this.c=c},
eL:function eL(a){this.a=a},
hk:function hk(a){this.a=a},
cB:function cB(a,b){this.a=a
this.b=b},
dr:function dr(a){this.a=a
this.b=null},
bd:function bd(){},
dO:function dO(){},
dP:function dP(){},
eH:function eH(){},
eE:function eE(){},
bU:function bU(a,b){this.a=a
this.b=b},
eu:function eu(a){this.a=a},
aX:function aX(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h4:function h4(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
aZ:function aZ(a,b){this.a=a
this.$ti=b},
cL:function cL(a,b,c,d){var _=this
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
cK:function cK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
j7:function j7(a){this.a=a},
j8:function j8(a){this.a=a},
j9:function j9(a){this.a=a},
bb:function bb(){},
bn:function bn(){},
p(a){return a},
ek(a){return new Uint8Array(A.p(a))},
bK(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.j3(b,a))},
c2:function c2(){},
cT:function cT(){},
ec:function ec(){},
a3:function a3(){},
cR:function cR(){},
cS:function cS(){},
cQ:function cQ(){},
ed:function ed(){},
ee:function ee(){},
ef:function ef(){},
eg:function eg(){},
eh:function eh(){},
ei:function ei(){},
cU:function cU(){},
ej:function ej(){},
di:function di(){},
dj:function dj(){},
dk:function dk(){},
dl:function dl(){},
jF(a,b){var s=b.c
return s==null?b.c=A.du(a,"bv",[b.x]):s},
kF(a){var s=a.w
if(s===6||s===7)return A.kF(a.x)
return s===11||s===12},
mC(a){return a.as},
bN(a){return A.iy(v.typeUniverse,a,!1)},
bL(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bL(a1,s,a3,a4)
if(r===s)return a2
return A.l1(a1,r,!0)
case 7:s=a2.x
r=A.bL(a1,s,a3,a4)
if(r===s)return a2
return A.l0(a1,r,!0)
case 8:q=a2.y
p=A.ci(a1,q,a3,a4)
if(p===q)return a2
return A.du(a1,a2.x,p)
case 9:o=a2.x
n=A.bL(a1,o,a3,a4)
m=a2.y
l=A.ci(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jN(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.ci(a1,j,a3,a4)
if(i===j)return a2
return A.l2(a1,k,i)
case 11:h=a2.x
g=A.bL(a1,h,a3,a4)
f=a2.y
e=A.nX(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.l_(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.ci(a1,d,a3,a4)
o=a2.x
n=A.bL(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jO(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.dK("Attempted to substitute unexpected RTI kind "+a0))}},
ci(a,b,c,d){var s,r,q,p,o=b.length,n=A.iz(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bL(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
nY(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iz(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bL(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
nX(a,b,c,d){var s,r=b.a,q=A.ci(a,r,c,d),p=b.b,o=A.ci(a,p,c,d),n=b.c,m=A.nY(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.f3()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
k1(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.og(s)
return a.$S()}return null},
ok(a,b){var s
if(A.kF(b))if(a instanceof A.bd){s=A.k1(a)
if(s!=null)return s}return A.bP(a)},
bP(a){if(a instanceof A.w)return A.u(a)
if(Array.isArray(a))return A.G(a)
return A.jU(J.bO(a))},
G(a){var s=a[v.arrayRti],r=t.r
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
u(a){var s=a.$ti
return s!=null?s:A.jU(a)},
jU(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.ny(a,s)},
ny(a,b){var s=a instanceof A.bd?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.nf(v.typeUniverse,s.name)
b.$ccache=r
return r},
og(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iy(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
k3(a){return A.aT(A.u(a))},
jZ(a){var s
if(a instanceof A.bb)return a.bC()
s=a instanceof A.bd?A.k1(a):null
if(s!=null)return s
if(t.dm.b(a))return J.dI(a).a
if(Array.isArray(a))return A.G(a)
return A.bP(a)},
aT(a){var s=a.r
return s==null?a.r=new A.ix(a):s},
ob(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.i(q,0)
s=A.dw(v.typeUniverse,A.jZ(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.i(q,r)
s=A.l4(v.typeUniverse,s,A.jZ(q[r]))}return A.dw(v.typeUniverse,s,a)},
aC(a){return A.aT(A.iy(v.typeUniverse,a,!1))},
nx(a){var s=this
s.b=A.nV(s)
return s.b(a)},
nV(a){var s,r,q,p,o
if(a===t.K)return A.nI
if(A.bQ(a))return A.nM
s=a.w
if(s===6)return A.nv
if(s===1)return A.lf
if(s===7)return A.nD
r=A.nU(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bQ)){a.f="$i"+q
if(q==="x")return A.nG
if(a===t.m)return A.nF
return A.nL}}else if(s===10){p=A.o8(a.x,a.y)
o=p==null?A.lf:p
return o==null?A.dD(o):o}return A.nt},
nU(a){if(a.w===8){if(a===t.S)return A.ld
if(a===t.i||a===t.p)return A.nH
if(a===t.N)return A.nK
if(a===t.y)return A.jV}return null},
nw(a){var s=this,r=A.ns
if(A.bQ(s))r=A.nl
else if(s===t.K)r=A.dD
else if(A.co(s)){r=A.nu
if(s===t.h6)r=A.nk
else if(s===t.dk)r=A.bJ
else if(s===t.fQ)r=A.ni
else if(s===t.cg)r=A.l7
else if(s===t.cD)r=A.nj
else if(s===t.bX)r=A.Q}else if(s===t.S)r=A.a
else if(s===t.N)r=A.aK
else if(s===t.y)r=A.jP
else if(s===t.p)r=A.fs
else if(s===t.i)r=A.iB
else if(s===t.m)r=A.t
s.a=r
return s.a(a)},
nt(a){var s=this
if(a==null)return A.co(s)
return A.on(v.typeUniverse,A.ok(a,s),s)},
nv(a){if(a==null)return!0
return this.x.b(a)},
nL(a){var s,r=this
if(a==null)return A.co(r)
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bO(a)[s]},
nG(a){var s,r=this
if(a==null)return A.co(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bO(a)[s]},
nF(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.w)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
le(a){if(typeof a=="object"){if(a instanceof A.w)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
ns(a){var s=this
if(a==null){if(A.co(s))return a}else if(s.b(a))return a
throw A.U(A.l8(a,s),new Error())},
nu(a){var s=this
if(a==null||s.b(a))return a
throw A.U(A.l8(a,s),new Error())},
l8(a,b){return new A.ds("TypeError: "+A.kU(a,A.au(b,null)))},
kU(a,b){return A.fH(a)+": type '"+A.au(A.jZ(a),null)+"' is not a subtype of type '"+b+"'"},
aB(a,b){return new A.ds("TypeError: "+A.kU(a,b))},
nD(a){var s=this
return s.x.b(a)||A.jF(v.typeUniverse,s).b(a)},
nI(a){return a!=null},
dD(a){if(a!=null)return a
throw A.U(A.aB(a,"Object"),new Error())},
nM(a){return!0},
nl(a){return a},
lf(a){return!1},
jV(a){return!0===a||!1===a},
jP(a){if(!0===a)return!0
if(!1===a)return!1
throw A.U(A.aB(a,"bool"),new Error())},
ni(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.U(A.aB(a,"bool?"),new Error())},
iB(a){if(typeof a=="number")return a
throw A.U(A.aB(a,"double"),new Error())},
nj(a){if(typeof a=="number")return a
if(a==null)return a
throw A.U(A.aB(a,"double?"),new Error())},
ld(a){return typeof a=="number"&&Math.floor(a)===a},
a(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.U(A.aB(a,"int"),new Error())},
nk(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.U(A.aB(a,"int?"),new Error())},
nH(a){return typeof a=="number"},
fs(a){if(typeof a=="number")return a
throw A.U(A.aB(a,"num"),new Error())},
l7(a){if(typeof a=="number")return a
if(a==null)return a
throw A.U(A.aB(a,"num?"),new Error())},
nK(a){return typeof a=="string"},
aK(a){if(typeof a=="string")return a
throw A.U(A.aB(a,"String"),new Error())},
bJ(a){if(typeof a=="string")return a
if(a==null)return a
throw A.U(A.aB(a,"String?"),new Error())},
t(a){if(A.le(a))return a
throw A.U(A.aB(a,"JSObject"),new Error())},
Q(a){if(a==null)return a
if(A.le(a))return a
throw A.U(A.aB(a,"JSObject?"),new Error())},
li(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.au(a[q],b)
return s},
nP(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.li(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.au(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
la(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.c([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.j(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.i(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.au(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.au(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.au(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.au(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.au(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
au(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.au(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.au(a.x,b)+">"
if(l===8){p=A.nZ(a.x)
o=a.y
return o.length>0?p+("<"+A.li(o,b)+">"):p}if(l===10)return A.nP(a,b)
if(l===11)return A.la(a,b,null)
if(l===12)return A.la(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.i(b,n)
return b[n]}return"?"},
nZ(a){var s=A.lu(a)
if(s!=null)return s
return"minified:"+a},
ng(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
nf(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iy(a,b,!1)
else if(typeof m=="number"){s=m
r=A.dv(a,5,"#")
q=A.iz(s)
for(p=0;p<s;++p)q[p]=r
o=A.du(a,b,q)
n[b]=o
return o}else return m},
ne(a,b){return A.l5(a.tR,b)},
nd(a,b){return A.l5(a.eT,b)},
iy(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.l3(a,null,b,!1)
r.set(b,s)
return s},
dw(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.l3(a,b,c,!0)
q.set(c,r)
return r},
l4(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jN(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
l3(a,b,c,d){return A.n5(A.n_(a,b,c,d))},
bp(a,b){b.a=A.nw
b.b=A.nx
return b},
dv(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aG(null,null)
s.w=b
s.as=c
r=A.bp(a,s)
a.eC.set(c,r)
return r},
l1(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.nb(a,b,r,c)
a.eC.set(r,s)
return s},
nb(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bQ(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.co(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.aG(null,null)
q.w=6
q.x=b
q.as=c
return A.bp(a,q)},
l0(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.n9(a,b,r,c)
a.eC.set(r,s)
return s},
n9(a,b,c,d){var s,r
if(d){s=b.w
if(A.bQ(b)||b===t.K)return b
else if(s===1)return A.du(a,"bv",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.aG(null,null)
r.w=7
r.x=b
r.as=c
return A.bp(a,r)},
nc(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aG(null,null)
s.w=13
s.x=b
s.as=q
r=A.bp(a,s)
a.eC.set(q,r)
return r},
dt(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
n8(a){var s,r,q,p,o,n=a.length
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
q=A.bp(a,r)
a.eC.set(p,q)
return q},
jN(a,b,c){var s,r,q,p,o,n
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
n=A.bp(a,o)
a.eC.set(q,n)
return n},
l2(a,b,c){var s,r,q="+"+(b+"("+A.dt(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aG(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bp(a,s)
a.eC.set(q,r)
return r},
l_(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.dt(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.dt(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.n8(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aG(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bp(a,p)
a.eC.set(r,o)
return o},
jO(a,b,c,d){var s,r=b.as+("<"+A.dt(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.na(a,b,c,r,d)
a.eC.set(r,s)
return s},
na(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iz(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bL(a,b,r,0)
m=A.ci(a,c,r,0)
return A.jO(a,n,m,c!==m)}}l=new A.aG(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bp(a,l)},
n_(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
n5(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.n1(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kX(a,r,l,k,!1)
else if(q===46)r=A.kX(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bI(a.u,a.e,k.pop()))
break
case 94:k.push(A.nc(a.u,k.pop()))
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
case 62:A.n3(a,k)
break
case 38:A.n2(a,k)
break
case 63:p=a.u
k.push(A.l1(p,A.bI(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.l0(p,A.bI(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.n0(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.kY(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.n6(a.u,a.e,o)
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
return A.bI(a.u,a.e,m)},
n1(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kX(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.ng(s,o.x)[p]
if(n==null)A.l('No "'+p+'" in "'+A.mC(o)+'"')
d.push(A.dw(s,o,n))}else d.push(p)
return m},
n3(a,b){var s,r=a.u,q=A.kW(a,b),p=b.pop()
if(typeof p=="string")b.push(A.du(r,p,q))
else{s=A.bI(r,a.e,p)
switch(s.w){case 11:b.push(A.jO(r,s,q,a.n))
break
default:b.push(A.jN(r,s,q))
break}}},
n0(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kW(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bI(p,a.e,o)
q=new A.f3()
q.a=s
q.b=n
q.c=m
b.push(A.l_(p,r,q))
return
case-4:b.push(A.l2(p,b.pop(),s))
return
default:throw A.b(A.dK("Unexpected state under `()`: "+A.o(o)))}},
n2(a,b){var s=b.pop()
if(0===s){b.push(A.dv(a.u,1,"0&"))
return}if(1===s){b.push(A.dv(a.u,4,"1&"))
return}throw A.b(A.dK("Unexpected extended operation "+A.o(s)))},
kW(a,b){var s=b.splice(a.p)
A.kY(a.u,a.e,s)
a.p=b.pop()
return s},
bI(a,b,c){if(typeof c=="string")return A.du(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.n4(a,b,c)}else return c},
kY(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bI(a,b,c[s])},
n6(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bI(a,b,c[s])},
n4(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.b(A.dK("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.dK("Bad index "+c+" for "+b.i(0)))},
on(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.X(a,b,null,c,null)
r.set(c,s)}return s},
X(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bQ(d))return!0
s=b.w
if(s===4)return!0
if(A.bQ(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.X(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.X(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.X(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.X(a,b.x,c,d,e))return!1
return A.X(a,A.jF(a,b),c,d,e)}if(s===6)return A.X(a,p,c,d,e)&&A.X(a,b.x,c,d,e)
if(q===7){if(A.X(a,b,c,d.x,e))return!0
return A.X(a,b,c,A.jF(a,d),e)}if(q===6)return A.X(a,b,c,p,e)||A.X(a,b,c,d.x,e)
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
if(!A.X(a,j,c,i,e)||!A.X(a,i,e,j,c))return!1}return A.lc(a,b.x,c,d.x,e)}if(q===11){if(b===t.E)return!0
if(p)return!1
return A.lc(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.nE(a,b,c,d,e)}if(o&&q===10)return A.nJ(a,b,c,d,e)
return!1},
lc(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
nE(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.dw(a,b,r[o])
return A.l6(a,p,null,c,d.y,e)}return A.l6(a,b.y,null,c,d.y,e)},
l6(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.X(a,b[s],d,e[s],f))return!1
return!0},
nJ(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.X(a,r[s],c,q[s],e))return!1
return!0},
co(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.bQ(a))if(s!==6)r=s===7&&A.co(a.x)
return r},
bQ(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
l5(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iz(a){return a>0?new Array(a):v.typeUniverse.sEA},
aG:function aG(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
f3:function f3(){this.c=this.b=this.a=null},
ix:function ix(a){this.a=a},
f1:function f1(){},
ds:function ds(a){this.a=a},
mV(){var s,r,q
if(self.scheduleImmediate!=null)return A.o1()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.ck(new A.i7(s),1)).observe(r,{childList:true})
return new A.i6(s,r,q)}else if(self.setImmediate!=null)return A.o2()
return A.o3()},
mW(a){self.scheduleImmediate(A.ck(new A.i8(t.M.a(a)),0))},
mX(a){self.setImmediate(A.ck(new A.i9(t.M.a(a)),0))},
mY(a){t.M.a(a)
A.n7(0,a)},
n7(a,b){var s=new A.iv()
s.cq(a,b)
return s},
jX(a){return new A.eS(new A.T($.J,a.h("T<0>")),a.h("eS<0>"))},
jT(a,b){a.$2(0,null)
b.b=!0
return b.a},
jQ(a,b){A.nm(a,b)},
jS(a,b){b.aW(a)},
jR(a,b){b.aX(A.bR(a),A.cn(a))},
nm(a,b){var s,r,q=new A.iC(b),p=new A.iD(b)
if(a instanceof A.T)a.bO(q,p,t.A)
else{s=t.A
if(a instanceof A.T)a.c9(q,p,s)
else{r=new A.T($.J,t.c)
r.a=8
r.c=a
r.bO(q,p,s)}}},
k_(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.J.c6(new A.iY(s),t.H,t.S,t.A)},
kZ(a,b,c){return 0},
ju(a){var s
if(t.Q.b(a)){s=a.gav()
if(s!=null)return s}return B.H},
nz(a,b){if($.J===B.p)return null
return null},
nA(a,b){if($.J!==B.p)A.nz(a,b)
if(b==null)if(t.Q.b(a)){b=a.gav()
if(b==null){A.kE(a,B.H)
b=B.H}}else b=B.H
else if(t.Q.b(a))A.kE(a,b)
return new A.aw(a,b)},
jI(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.mE()
b.aL(new A.aw(new A.aM(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bF(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aA()
b.aw(o.a)
A.ce(b,p)
return}b.a^=2
A.ft(null,null,b.b,t.M.a(new A.ih(o,b)))},
ce(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jY(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.ce(d.a,c)
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
return}g=$.J
if(g!==h)$.J=h
else g=null
c=c.c
if((c&15)===8)new A.il(q,d,n).$0()
else if(o){if((c&1)!==0)new A.ik(q,j).$0()}else if((c&2)!==0)new A.ij(d,q).$0()
if(g!=null)$.J=g
c=q.c
if(c instanceof A.T){p=q.a.$ti
p=p.h("bv<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aB(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.jI(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aB(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
nQ(a,b){var s
if(t.d.b(a))return b.c6(a,t.A,t.K,t.l)
s=t.x
if(s.b(a))return s.a(a)
throw A.b(A.aD(a,"onError",u.c))},
nO(){var s,r
for(s=$.ch;s!=null;s=$.ch){$.dF=null
r=s.b
$.ch=r
if(r==null)$.dE=null
s.a.$0()}},
nW(){$.jW=!0
try{A.nO()}finally{$.dF=null
$.jW=!1
if($.ch!=null)$.kd().$1(A.lm())}},
lj(a){var s=new A.eT(a),r=$.dE
if(r==null){$.ch=$.dE=s
if(!$.jW)$.kd().$1(A.lm())}else $.dE=r.b=s},
nT(a){var s,r,q,p=$.ch
if(p==null){A.lj(a)
$.dF=$.dE
return}s=new A.eT(a)
r=$.dF
if(r==null){s.b=p
$.ch=$.dF=s}else{q=r.b
s.b=q
$.dF=r.b=s
if(q==null)$.dE=s}},
oL(a,b){A.bM(a,"stream",t.K)
return new A.fi(b.h("fi<0>"))},
jY(a,b){A.nT(new A.iX(a,b))},
lh(a,b,c,d,e){var s,r=$.J
if(r===c)return d.$0()
$.J=c
s=r
try{r=d.$0()
return r}finally{$.J=s}},
nS(a,b,c,d,e,f,g){var s,r=$.J
if(r===c)return d.$1(e)
$.J=c
s=r
try{r=d.$1(e)
return r}finally{$.J=s}},
nR(a,b,c,d,e,f,g,h,i){var s,r=$.J
if(r===c)return d.$2(e,f)
$.J=c
s=r
try{r=d.$2(e,f)
return r}finally{$.J=s}},
ft(a,b,c,d){t.M.a(d)
if(B.p!==c){d=c.dd(d)
d=d}A.lj(d)},
i7:function i7(a){this.a=a},
i6:function i6(a,b,c){this.a=a
this.b=b
this.c=c},
i8:function i8(a){this.a=a},
i9:function i9(a){this.a=a},
iv:function iv(){},
iw:function iw(a,b){this.a=a
this.b=b},
eS:function eS(a,b){this.a=a
this.b=!1
this.$ti=b},
iC:function iC(a){this.a=a},
iD:function iD(a){this.a=a},
iY:function iY(a){this.a=a},
aJ:function aJ(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aS:function aS(a,b){this.a=a
this.$ti=b},
aw:function aw(a,b){this.a=a
this.b=b},
eX:function eX(){},
dc:function dc(a,b){this.a=a
this.$ti=b},
bE:function bE(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
T:function T(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
id:function id(a,b){this.a=a
this.b=b},
ii:function ii(a,b){this.a=a
this.b=b},
ih:function ih(a,b){this.a=a
this.b=b},
ig:function ig(a,b){this.a=a
this.b=b},
ie:function ie(a,b){this.a=a
this.b=b},
il:function il(a,b,c){this.a=a
this.b=b
this.c=c},
im:function im(a,b){this.a=a
this.b=b},
io:function io(a){this.a=a},
ik:function ik(a,b){this.a=a
this.b=b},
ij:function ij(a,b){this.a=a
this.b=b},
eT:function eT(a){this.a=a
this.b=null},
fi:function fi(a){this.$ti=a},
dB:function dB(){},
fc:function fc(){},
is:function is(a,b){this.a=a
this.b=b},
iX:function iX(a,b){this.a=a
this.b=b},
kV(a,b){var s=a[b]
return s===a?null:s},
jK(a,b,c){if(c==null)a[b]=a
else a[b]=c},
jJ(){var s=Object.create(null)
A.jK(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
m7(a,b){return new A.aX(a.h("@<0>").K(b).h("aX<1,2>"))},
ku(a,b,c){return b.h("@<0>").K(c).h("kt<1,2>").a(A.oc(a,new A.aX(b.h("@<0>").K(c).h("aX<1,2>"))))},
b1(a,b){return new A.aX(a.h("@<0>").K(b).h("aX<1,2>"))},
jA(a){return new A.aI(a.h("aI<0>"))},
am(a){return new A.aI(a.h("aI<0>"))},
cM(a,b){return b.h("kv<0>").a(A.od(a,new A.aI(b.h("aI<0>"))))},
jM(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
jL(a,b,c){var s=new A.bH(a,b,c.h("bH<0>"))
s.c=a.e
return s},
m8(a,b,c){var s=A.m7(b,c)
a.ao(0,new A.h5(s,b,c))
return s},
m9(a,b){var s,r,q=A.jA(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r)q.j(0,b.a(a[r]))
return q},
jB(a,b){var s=A.jA(b)
s.C(0,a)
return s},
h9(a){var s,r
if(A.k5(a))return"{...}"
s=new A.eF("")
try{r={}
B.a.j($.av,a)
s.a+="{"
r.a=!0
a.ao(0,new A.ha(r,s))
s.a+="}"}finally{if(0>=$.av.length)return A.i($.av,-1)
$.av.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
nh(){throw A.b(A.cc("Cannot change an unmodifiable set"))},
de:function de(){},
dh:function dh(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
df:function df(a,b){this.a=a
this.$ti=b},
dg:function dg(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aI:function aI(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
f6:function f6(a){this.a=a
this.c=this.b=null},
bH:function bH(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
h5:function h5(a,b,c){this.a=a
this.b=b
this.c=c},
D:function D(){},
bx:function bx(){},
ha:function ha(a,b){this.a=a
this.b=b},
dx:function dx(){},
c1:function c1(){},
d8:function d8(){},
b5:function b5(){},
dp:function dp(){},
fl:function fl(){},
d9:function d9(a,b){this.a=a
this.$ti=b},
cg:function cg(){},
dy:function dy(){},
ol(a){var s=A.mq(a,null)
if(s!=null)return s
throw A.b(new A.fO(a))},
lV(a,b){a=A.U(a,new Error())
if(a==null)a=A.dD(a)
a.stack=b.i(0)
throw a},
h6(a,b,c,d){var s,r=c?J.kp(a,d):J.ko(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
h7(a,b,c){var s,r=A.c([],c.h("r<0>"))
for(s=J.a1(a);s.k();)B.a.j(r,c.a(s.gm()))
if(b)return r
r.$flags=1
return r},
az(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("r<0>"))
s=A.c([],b.h("r<0>"))
for(r=J.a1(a);r.k();)B.a.j(s,r.gm())
return s},
h8(a,b){var s=A.h7(a,!1,b)
s.$flags=3
return s},
kH(a,b,c){var s=J.a1(b)
if(!s.k())return a
if(c.length===0){do a+=A.o(s.gm())
while(s.k())}else{a+=A.o(s.gm())
while(s.k())a=a+c+A.o(s.gm())}return a},
mE(){return A.cn(new Error())},
lS(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
km(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
dR(a){if(a>=10)return""+a
return"0"+a},
fH(a){if(typeof a=="number"||A.jV(a)||a==null)return J.bS(a)
if(typeof a=="string")return JSON.stringify(a)
return A.kD(a)},
lW(a,b){A.bM(a,"error",t.K)
A.bM(b,"stackTrace",t.l)
A.lV(a,b)},
dK(a){return new A.dJ(a)},
j(a,b){return new A.aM(!1,null,b,a)},
aD(a,b,c){return new A.aM(!0,a,b,c)},
aP(a,b,c,d,e){return new A.cZ(b,c,!0,a,d,"Invalid value")},
mv(a,b,c){if(0>a||a>c)throw A.b(A.aP(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.aP(b,a,c,"end",null))
return b}return c},
hE(a,b){if(a<0)throw A.b(A.aP(a,0,null,b,null))
return a},
h2(a,b,c,d){return new A.e3(b,!0,a,d,"Index out of range")},
cc(a){return new A.da(a)},
kK(a){return new A.eK(a)},
m(a){return new A.ca(a)},
ax(a){return new A.dQ(a)},
m2(a,b,c){var s,r
if(A.k5(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.j($.av,a)
try{A.nN(a,s)}finally{if(0>=$.av.length)return A.i($.av,-1)
$.av.pop()}r=A.kH(b,t.hf.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jw(a,b,c){var s,r
if(A.k5(a))return b+"..."+c
s=new A.eF(b)
B.a.j($.av,a)
try{r=s
r.a=A.kH(r.a,a,", ")}finally{if(0>=$.av.length)return A.i($.av,-1)
$.av.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
nN(a,b){var s,r,q,p,o,n,m,l=a.gt(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.o(l.gm())
B.a.j(b,s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
if(0>=b.length)return A.i(b,-1)
r=b.pop()
if(0>=b.length)return A.i(b,-1)
q=b.pop()}else{p=l.gm();++j
if(!l.k()){if(j<=4){B.a.j(b,A.o(p))
return}r=A.o(p)
if(0>=b.length)return A.i(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gm();++j
for(;l.k();p=o,o=n){n=l.gm();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.i(b,-1)
k-=b.pop().length+2;--j}B.a.j(b,"...")
return}}q=A.o(p)
r=A.o(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.i(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.j(b,m)
B.a.j(b,q)
B.a.j(b,r)},
c3(a,b,c,d,e,f){var s
if(B.h===c){s=J.K(a)
b=J.K(b)
return A.eG(A.a_(A.a_($.dH(),s),b))}if(B.h===d){s=J.K(a)
b=J.K(b)
c=J.K(c)
return A.eG(A.a_(A.a_(A.a_($.dH(),s),b),c))}if(B.h===e){s=J.K(a)
b=J.K(b)
c=J.K(c)
d=J.K(d)
return A.eG(A.a_(A.a_(A.a_(A.a_($.dH(),s),b),c),d))}if(B.h===f){s=J.K(a)
b=J.K(b)
c=J.K(c)
d=J.K(d)
e=J.K(e)
return A.eG(A.a_(A.a_(A.a_(A.a_(A.a_($.dH(),s),b),c),d),e))}s=J.K(a)
b=J.K(b)
c=J.K(c)
d=J.K(d)
e=J.K(e)
f=J.K(f)
f=A.eG(A.a_(A.a_(A.a_(A.a_(A.a_(A.a_($.dH(),s),b),c),d),e),f))
return f},
bt:function bt(a,b,c){this.a=a
this.b=b
this.c=c},
ia:function ia(){},
I:function I(){},
dJ:function dJ(a){this.a=a},
b6:function b6(){},
aM:function aM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cZ:function cZ(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
e3:function e3(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
da:function da(a){this.a=a},
eK:function eK(a){this.a=a},
ca:function ca(a){this.a=a},
dQ:function dQ(a){this.a=a},
d6:function d6(){},
ib:function ib(a){this.a=a},
fO:function fO(a){this.a=a},
k:function k(){},
a6:function a6(a,b,c){this.a=a
this.b=b
this.$ti=c},
Y:function Y(){},
w:function w(){},
fj:function fj(){},
eF:function eF(a){this.a=a},
hj:function hj(a){this.a=a},
ak(a){var s
if(typeof a=="function")throw A.b(A.j("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.nn,a)
s[$.k7()]=a
return s},
nn(a,b,c){t.Z.a(a)
if(A.a(c)>=1)return a.$1(b)
return a.$0()},
lo(a,b,c){return c.a(a[b])},
lb(a,b){return a[b]},
aa(a,b,c,d){return d.a(a[b].apply(a,c))},
oq(a,b){var s=new A.T($.J,b.h("T<0>")),r=new A.dc(s,b.h("dc<0>"))
a.then(A.ck(new A.ji(r,b),1),A.ck(new A.jj(r),1))
return s},
lg(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
cl(a){if(A.lg(a))return a
return new A.j1(new A.dh(t.hg)).$1(a)},
ji:function ji(a,b){this.a=a
this.b=b},
jj:function jj(a){this.a=a},
j1:function j1(a){this.a=a},
hF:function hF(a){this.z=a},
c6:function c6(a,b){this.a=a
this.b=b},
ap:function ap(a,b){this.a=a
this.b=b},
fA:function fA(a,b){this.a=a
this.b=b},
fB:function fB(){this.a=null
this.d=0},
cb:function cb(a,b){this.a=a
this.b=b},
cX:function cX(a,b,c,d){var _=this
_.a=a
_.e=b
_.f=c
_.fr=d},
kj(a,b,c,d,e,f,g){var s,r,q,p
if(!d.gE(0)||d.ga1()<1e-12)throw A.b(A.j("CameraView.look requires a finite, nonzero forward: "+d.i(0),null))
if(!isFinite(e)||e<=0||e>=3.141592653589793)throw A.b(A.j("CameraView.look requires 0 < fovYRadians < pi: "+e,null))
s=d.gS()
if(g.a6(s).ga1()<1e-12)throw A.b(A.j("CameraView.look requires up ("+g.i(0)+") not parallel to forward ("+d.i(0)+")",null))
r=A.kx(b,s,g)
q=A.ky(a,c,e,f)
p=new A.cr(r,q,q.v(0,r),b,s,f,c,a)
p.A()
return p},
cr:function cr(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=_.x=$},
eB:function eB(){},
dY:function dY(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2){var _=this
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
fQ:function fQ(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=f},
fR:function fR(){this.b=this.a=0},
be(a,b){return new A.h1(a,b)},
b4:function b4(){},
ao:function ao(a,b,c){this.a=a
this.b=b
this.c=c},
ar:function ar(a,b,c){this.a=a
this.b=b
this.c=c},
aO:function aO(a,b,c){this.a=a
this.b=b
this.c=c},
el:function el(a,b,c){this.a=a
this.b=b
this.c=c},
bf:function bf(a,b,c){this.a=a
this.b=b
this.c=c},
c_:function c_(a,b){this.a=a
this.b=b},
h1:function h1(a,b){this.a=a
this.b=b},
iZ(a,b,c,d){return A.o5(a,b,c,d)},
o5(a,b,a0,a1){var s=0,r=A.jX(t.fW),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c
var $async$iZ=A.k_(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:d=b.length
if(d===0)throw A.b(A.j("bootstrapRenderer requires a non-empty profile ladder",null))
a1.A()
n=A.c([],t.eT)
m=0
i=d-1
h=t.eD
case 3:g=m
if(typeof g!=="number"){q=g.aH()
s=1
break}if(!(g<d)){s=4
break}l=B.a.q(b,m)
k=a.$1(l)
if(k.a!==l)throw A.b(A.j("configurationFor("+l.a.b+") returned a configuration for "+k.a.a.b+". The mapping must be total and faithful, or the renderer runs a graph the host did not choose.",null))
p=6
s=9
return A.jQ(a0.dt(k,a1),$async$iZ)
case 9:J.fv(n,new A.c5(l,null))
f=A.h7(n,!1,h)
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
j=A.bR(c)
J.fv(n,new A.c5(l,j))
if(J.aV(m,i))throw c
s=8
break
case 5:s=2
break
case 8:g=m
if(typeof g!=="number"){q=g.W()
s=1
break}m=g+1
s=3
break
case 4:throw A.b(A.m("bootstrapRenderer exhausted its ladder without a result"))
case 1:return A.jS(q,r)
case 2:return A.jR(o.at(-1),r)}})
return A.jT($async$iZ,r)},
oa(a){var s,r,q=B.a.b8(B.a_,new A.j2(a))
if(q>=0)return A.h8(B.a.cl(B.a_,q),t.W)
s=t.W
r=A.cM([a],s)
r.C(0,B.a_)
return A.h8(r,s)},
c5:function c5(a,b){this.a=a
this.b=b},
dM:function dM(){},
j2:function j2(a){this.a=a},
os(a,b,c,d){var s,r,q,p,o,n,m=A.c([],t.cw)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.a.j(m,new A.dm(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.a.aa(m,new A.jk())
s=A.c([],t.w)
for(r=A.hT(m,0,A.bM(b,"count",t.S),t.fk),q=r.$ti,r=new A.ae(r,r.gn(0),q.h("ae<O.E>")),q=q.h("O.E");r.k();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
S:function S(a,b,c){this.a=a
this.b=b
this.c=c},
dU:function dU(){},
bk:function bk(a,b,c,d){var _=this
_.b=a
_.c=b
_.d=c
_.e=d},
aj:function aj(){},
jk:function jk(){},
b3(a,b,c,d,e,f,g,h){return new A.by(c,h,g,f,e,d,b,a)},
jC(a,b,c){return A.b3(0.2,0.3,b,0,c,a.c,a.b,a.a)},
kz(a,b,c,d){return A.b3(0.08,a,c,0,d,b.c,b.b,b.a)},
e9(a,b){if(!isFinite(b)||b<0||b>1)throw A.b(A.j("MaterialDefinition."+a+" must be in [0, 1]: "+A.o(b),null))},
fw:function fw(a,b){this.a=a
this.b=b},
ea:function ea(a,b){this.a=a
this.b=b},
by:function by(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.d=b
_.e=c
_.f=d
_.at=e
_.ax=f
_.ch=g
_.CW=h},
mb(a){A:{break A}return a},
b9:function b9(a,b){this.a=a
this.b=b},
a8:function a8(a,b,c){this.a=a
this.b=b
this.c=c},
i_:function i_(){},
i0:function i0(){},
bj:function bj(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hd:function hd(){},
he:function he(){},
hf:function hf(){},
fF:function fF(){},
hn(a){var s,r,q="volumetric",p=t.N,o=A.cM(["sceneColor","present"],p),n=a.a.b
if(n.p(0,"shadows"))o.C(0,A.cM(["shadowMap","sceneDepth"],p))
if(n.p(0,q)){o.j(0,"volumetricLight")
o.j(0,"sceneColor#"+(a.d>1?2:1))}if(n.p(0,"ssao"))o.C(0,A.cM(["ssaoRaw","ssaoBlurred"],p))
if(n.p(0,"bloom")){if(a.d>1)s=n.p(0,q)?3:2
else s=n.p(0,q)?2:1
o.C(0,A.cM(["bloomBlurH","bloomBlurV","sceneColor#"+s],p))}if(a.d>1)o.j(0,"sceneColor#1")
if(n.p(0,"dof"))o.C(0,A.cM(["dofBlurH","dofBlurV","dofOutput"],p))
if(n.p(0,"grade"))o.j(0,"gradeOutput")
if(n.p(0,"ps1"))o.j(0,"ps1Output")
r=n.p(0,"vhs")
if(r)o.j(0,"vhsOutput")
return new A.hm(new A.d9(A.jB(o,p),t.am),r)},
hm:function hm(a,b){this.a=a
this.b=b},
ho:function ho(){},
hB:function hB(a){this.b=a},
et:function et(){this.a=null
this.c=0
this.d=!1},
cA:function cA(a,b){this.a=a
this.b=b},
fy:function fy(a,b){this.a=a
this.b=b},
c8:function c8(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=i},
kI(a,b,c,d,e){var s,r
if(!isFinite(c)||c<=0)throw A.b(A.j("SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: "+A.o(c),null))
if(!isFinite(d)||d<=0)throw A.b(A.j("SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: "+A.o(d),null))
s=c>d?d:c
r=new A.hU(b,a,B.n.c8(b*s),B.n.c8(a*s),s,!0)
r.A()
return r},
hU:function hU(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fz:function fz(a,b){this.a=a
this.b=b},
d0:function d0(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
c7:function c7(a,b){this.a=a
this.b=b},
R:function R(a,b,c){this.a=a
this.b=b
this.d=c},
fS:function fS(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f},
ma(){return new A.eb(new A.aQ(new A.hc(),A.c([],t.ha),A.c([],t.t),t.ex))},
eb:function eb(a){this.a=a},
hc:function hc(){},
lk(a){var s=4
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
case 3:s=A.l(A.cc("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
no(a,b,c){var s,r,q
for(s=0,r=0;r<7;++r){q=B.A[r]
if(A.lk(q.a)===b)s+=q.c}return s},
mc(a){return new A.hg(a,new A.aQ(new A.hh(),A.c([],t.c9),A.c([],t.t),t.cE),A.b1(t.S,t.bw))},
kA(a){var s
A:{s=a.byteLength
break A}return s},
eM:function eM(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hg:function hg(a,b,c){this.a=a
this.b=b
this.c=c},
hh:function hh(){},
hi:function hi(){},
mF(a){var s=new A.eI(a,new A.aQ(new A.hV(),A.c([],t.fq),A.c([],t.t),t.g2),A.b1(t.S,t.j))
s.d=s.X($.kc())
s.e=s.X($.k9())
s.f=s.X($.ka())
s.r=s.X($.k8())
s.w=s.X($.kb())
return s},
eI:function eI(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
hV:function hV(){},
hX:function hX(){},
hW:function hW(){},
ot(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b.gE(0)
if(!i)throw A.b(A.j("invalid volumetric source selection inputs",null))
s=A.am(t.N)
r=A.c([],t.gg)
for(q=0;!1;++q){p=c[q]
p.A()
if(!s.j(0,p.gB()))throw A.b(A.j("duplicate volumetric source id: "+A.o(p.gB()),null))
o=p.gbd().aj(0,b).length
i=p.gea()
n=A.mJ(p.ge5(),o,i)
i=p.gbW().ged()
m=p.gbW().gee()
l=p.gbW().gef()
l=Math.max(A.dG(m),A.dG(l))
k=Math.max(A.dG(i),l)
B.a.j(r,new A.dn(p.ge8().v(0,k).v(0,n),p))}B.a.aa(r,new A.jl())
i=A.c([],t.q)
for(m=A.hT(r,0,A.bM(a,"count",t.S),t.eS),l=m.$ti,m=new A.ae(m,m.gn(0),l.h("ae<O.E>")),l=l.h("O.E");m.k();){j=m.d
i.push((j==null?l.a(j):j).b)}return i},
mJ(a,b,c){var s,r,q,p,o,n
for(s=[new A.ag("distance",b),new A.ag("referenceDistance",c),new A.ag("cutoffDistance",a)],r=0;r<3;++r){q=s[r]
p=q.b
if(!isFinite(p))A.l(A.j(q.a+" must be finite: "+A.o(p),null))}if(b.aH(0,0)||c.cg(0,0)||a.cg(0,0))throw A.b(A.j("invalid inverse-square attenuation inputs",null))
if(b.cf(0,a))return 0
s=c.v(0,c)
q=c.v(0,c)
o=b.v(0,b)
n=s.ce(0,Math.max(A.dG(q),A.dG(o)))
o=b.ce(0,a)
A.dG(o)
return n.v(0,1-Math.pow(o,4)).al(0,0,1).eb(0)},
jl:function jl(){},
hl:function hl(a,b){var _=this
_.a=a
_.b=5
_.c=0
_.d=0.3
_.as=!1
_.at=0.5
_.ax=0
_.ay=0.3
_.ch=5
_.CW=b},
o4(a){var s,r,q,p,o=A.c([],t.gk)
for(s=a.length,r=t.h,q=0;q<a.length;a.length===s||(0,A.A)(a),++q){p=a[q]
p.gl()
B.a.j(o,new A.bw(p,A.c([p],r)))
continue}return o},
bw:function bw(a,b){this.a=a
this.b=b},
dW:function dW(a){this.a=a},
fK:function fK(){},
fL:function fL(a){this.a=a},
fI:function fI(a){this.a=a},
fJ:function fJ(a){this.a=a},
dX:function dX(a,b){this.a=a
this.b=b},
bY:function bY(a,b){this.a=a
this.b=b},
dZ:function dZ(a,b){this.a=a
this.b=b
this.c=0},
mZ(){return new A.cf()},
fP:function fP(a){this.a=a
this.b=null},
cf:function cf(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
jD(){return!0},
E:function E(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
hp:function hp(){},
hq:function hq(){},
aF:function aF(a,b){this.a=a
this.b=b},
a5:function a5(a,b,c){this.a=a
this.b=b
this.c=c},
er:function er(a,b){this.a=a
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
d2:function d2(a,b){this.a=a
this.b=b},
n:function n(a,b){this.a=a
this.b=b},
cv:function cv(a){this.b=a},
hD:function hD(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=_.d=0},
a2:function a2(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hG:function hG(){},
Z:function Z(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.r=f},
hI:function hI(a,b){this.a=a
this.b=b},
hN:function hN(){},
hM:function hM(){},
hL:function hL(){},
hK:function hK(a){this.a=a},
hJ:function hJ(a,b,c){this.a=a
this.b=b
this.c=c},
hH:function hH(a,b){this.a=a
this.b=b},
mA(a){return new A.d_(a,new A.aQ(new A.hO(),A.c([],t.aO),A.c([],t.t),t.b0))},
f5:function f5(a,b,c){this.a=a
this.b=b
this.c=c},
d_:function d_(a,b){this.a=a
this.b=b},
hO:function hO(){},
l9(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.nq(a,r,s,a.x.gm().a.b.a).b},
nq(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.iT(a),j=new A.iU(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.p(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.o6(b,h,B.U,i,s.gdH(),new A.iE(j),new A.iF(j),new A.iG(a),new A.iL(a),new A.iM(a),new A.iN(j),new A.iO(j),s.gdJ(),new A.iP(a),s.gdN(),r.gdL(),k,s.gdP(),s.gdR(),new A.iQ(j,c),new A.iR(j),new A.iS(j),new A.iH(j),new A.iI(j),new A.iJ(a),new A.iK(j),e,f,g,512)}else{p=new A.L(l,B.l,g,f,e,0)
o=new A.L(l,B.l,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.cP(h,p,o):null
k=A.c([new A.eR(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nout vec4 oColor;\nvoid main(){\n  vec3 n=normalize(vNormal);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+\n    vec3(ndotl)*uDirectLightScale,0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.f)
if(n!=null)k.push(n)
k.push(new A.cY(b,u.l,u.b,h,i,B.U))
q=new A.dW(k)}a.r.toString
m=q.df(B.a6,new A.hG(),!1,new A.f9())
k=m.a.b
if(k.length!==0)throw A.b(A.m("safe renderer graph is invalid: "+A.o(k)))
return new A.it(q,m)},
nr(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.b(A.m("renderer graph is not initialized"))
s=A.az(b7.gc2(),t.Y)
for(r=0;r<b9.length;++r){q=b9[r]
p=b6.w.a.b
o=p.$ti
n=o.c.a(q.a)
p.ab(n)
p=p.b
n=n.a
if(!(n>=0&&n<p.length))return A.i(p,n)
n=p[n].c
p=(n==null?o.y[1].a(n):n).d
o=q.c.a2()
p=p.gaZ()
n=A.G(p)
B.a.j(s,new A.fk(new A.bf((r|1073741824)>>>0,0,"transient"),q,A.jt(new A.af(p,n.h("f(1)").a(o.gbj()),n.h("af<1,f>")))))}p=b8.a
m=A.o9(A.lY(p.c),s,b8.d)
for(o=s.length,l=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gl().a
j=b6.w.a
i=n.a
h=j.c.q(0,i)
if(h==null)A.l(A.be(B.N,n))
j=j.b
g=j.$ti
j.ab(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.i(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
l+=B.i.a0(n>0?n:h.e,3)}for(s=m.a,o=s.length,f=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gl().a
j=b6.w.a
i=n.a
h=j.c.q(0,i)
if(h==null)A.l(A.be(B.N,n))
j=j.b
g=j.$ti
j.ab(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.i(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
f+=B.i.a0(n>0?n:h.e,3)}o=t.N
n=A.b1(o,t.a8)
e=new A.fP(n)
e.dc("cull")
j=l-f
d=e.b
if(d==null)A.l(A.m("cull recorded outside an active frame"))
if(j<0)A.l(A.j("cull totals must be non-negative",null))
c=n.q(0,d)
c.c+=j
c.e+=m.b.b
b=A.c([],t.c1)
a=A.c([],t.aM)
for(i=s.length,g=t.k,a0=p.a,a1=t.b,k=0;k<s.length;s.length===i||(0,A.A)(s),++k){a2=s[k]
if(a2.gl().e===B.V)B.a.j(a,new A.V(new A.ah(a0.cb(a2.gl().c.a).c,a2.gB().a),a2,a1))
else B.a.j(b,new A.V(new A.ai(B.cL,a2.gl().b,a2.gl().a,a2.gB().a),a2,g))}a3=new A.f2(A.o4(A.ov(b)),A.ou(a),p,b8.b,b8.c)
a4=new A.dT(b6.a,e)
for(s=b4.b,p=s.length,i=t.do,k=0;k<s.length;s.length===p||(0,A.A)(s),++k){a5=s[k]
g=a5.gl().a
if(g.length===0)A.l(A.aD(g,"passId",null))
e.b=g
n.be(g,A.ln())
a6=A.b1(o,i)
for(g=a5.gl().c,a0=g.length,a7=0;a7<g.length;g.length===a0||(0,A.A)(g),++a7){a8=g[a7].a
a9=b5.c
if(a9==null)A.l(A.m("GPU resource adapter is not initialized"))
a1=a8.f
b0=a8.a
b1=a1===0?b0:b0+"#"+a1
b2=a9.b.q(0,b1)
if(b2==null)A.l(A.m("resource is not in candidate: "+b1))
b3=new A.bV(b2)
a6.D(0,b0+"#"+a1,b3)
a6.be(b0,new A.iV(b3))}a5.L(new A.dN(a6,a4,new A.iW(b8,b6).$0(),a3))}return new A.ic(e,m,j)},
es:function es(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.w=f
_.x=!1},
ic:function ic(a,b,c){this.a=a
this.b=b
this.c=c},
fk:function fk(a,b,c){this.a=a
this.b=b
this.c=c},
iT:function iT(a){this.a=a},
iU:function iU(a,b){this.a=a
this.b=b},
iS:function iS(a){this.a=a},
iL:function iL(a){this.a=a},
iM:function iM(a){this.a=a},
iR:function iR(a){this.a=a},
iG:function iG(a){this.a=a},
iI:function iI(a){this.a=a},
iH:function iH(a){this.a=a},
iQ:function iQ(a,b){this.a=a
this.b=b},
iE:function iE(a){this.a=a},
iF:function iF(a){this.a=a},
iN:function iN(a){this.a=a},
iO:function iO(a){this.a=a},
iP:function iP(a){this.a=a},
iK:function iK(a){this.a=a},
iJ:function iJ(a){this.a=a},
iV:function iV(a){this.a=a},
iW:function iW(a,b){this.a=a
this.b=b},
it:function it(a,b){this.a=a
this.b=b},
f9:function f9(){},
f2:function f2(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
ew:function ew(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.ax=_.at=_.as=_.Q=_.y=_.x=_.w=_.r=null
_.a$=f
_.b$=g},
hP:function hP(){},
hQ:function hQ(){},
hR:function hR(){},
f8:function f8(a){this.b=a},
ip:function ip(){},
fd:function fd(){},
ey:function ey(a,b){this.a=a
this.b=b},
ov(a){var s,r,q=A.az(a,t.k)
B.a.aa(q,new A.jp())
s=A.G(q)
r=s.h("af<1,aq>")
s=A.az(new A.af(q,s.h("aq(1)").a(new A.jq()),r),r.h("O.E"))
s.$flags=1
return s},
ou(a){var s,r,q=A.az(a,t.b)
B.a.aa(q,new A.jn())
s=A.G(q)
r=s.h("af<1,aq>")
s=A.az(new A.af(q,s.h("aq(1)").a(new A.jo()),r),r.h("O.E"))
s.$flags=1
return s},
ai:function ai(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ah:function ah(a,b){this.a=a
this.b=b},
V:function V(a,b,c){this.a=a
this.b=b
this.$ti=c},
jp:function jp(){},
jq:function jq(){},
jn:function jn(){},
jo:function jo(){},
o9(a,b,c){var s,r,q,p,o,n,m,l=A.c([],t.h)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.A)(b),++p){o=b[p];++r
if((o.gl().d&c)>>>0===0){++q
continue}n=o.gbk()
m=n.a
if(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)){n=n.b
n=isFinite(n.a)&&isFinite(n.b)&&isFinite(n.c)}else n=!1
if(!n)throw A.b(A.j("cullItems: non-finite world bounds for instance "+o.gB().i(0),null))
if(a.dW(o.gbk())===B.ap){++q
continue}B.a.j(l,o)}return new A.fD(l,new A.fE(q))},
fE:function fE(a){this.b=a},
fD:function fD(a,b){this.a=a
this.b=b},
mg(a){var s,r,q,p
if(a<=0)throw A.b(A.aD(a,"size","must be > 0"))
s=a*0.5
r=new A.ba(A.c([],t.n),A.c([],t.t))
q=new A.hC(r,1)
p=-s
q.$6(new A.f(p,p,s),new A.f(s,p,s),new A.f(s,s,s),new A.f(p,s,s),B.aZ,B.x)
q.$6(new A.f(s,p,p),new A.f(p,p,p),new A.f(p,s,p),new A.f(s,s,p),B.b_,B.y)
q.$6(new A.f(p,s,s),new A.f(s,s,s),new A.f(s,s,p),new A.f(p,s,p),B.j,B.x)
q.$6(new A.f(p,p,p),new A.f(s,p,p),new A.f(s,p,s),new A.f(p,p,s),B.o,B.y)
q.$6(new A.f(s,p,s),new A.f(s,p,p),new A.f(s,s,p),new A.f(s,s,s),B.x,B.b_)
q.$6(new A.f(p,p,p),new A.f(p,p,s),new A.f(p,s,s),new A.f(p,s,p),B.y,B.aZ)
return r.a5(new A.aL(new A.f(p,p,p),new A.f(s,s,s)))},
mr(a,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a2<=0||a<=0)throw A.b(A.j("dimensions must be > 0",null))
if(a0<1||a1<1)throw A.b(A.j("subdivisions must be >= 1",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.ba(s,q)
o=a2*0.5
n=a*0.5
for(s=-o,m=-n,l=0;l<=a1;++l){k=l/a1
j=m+k*a
for(i=0;i<=a0;++i){h=i/a0
p.H(new A.f(s+h*a2,0,j),B.j,B.x,new A.P(h,k))}}g=a0+1
for(l=0;l<a1;)for(f=l*g,++l,e=l*g,i=0;i<a0;++i){d=f+i
c=e+i
b=c+1
B.a.C(q,A.c([d,c,b,d,b,d+1],r))}return p.a5(new A.aL(new A.f(s,0,m),new A.f(o,0,n)))},
ms(a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(a6<=0)throw A.b(A.aD(a6,"radius","must be > 0"))
if(a7<2||a8<3)throw A.b(A.j("invalid ring or sector count",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.ba(s,q)
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
a=0}p.H(new A.f(e*a6,s,d*a6),new A.f(e,k,d),new A.f(c,0,a),new A.P(i,n))}}a0=a8+1
for(o=0;o<a7;)for(s=o*a0,++o,a1=o*a0,j=0;j<a8;++j){a2=s+j
a3=a1+j
a4=a3+1
B.a.C(q,A.c([a2,a2+1,a4,a2,a4,a3],r))}a5=new A.f(a6,a6,a6)
return p.a5(new A.aL(a5.v(0,-1),a5))},
mh(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a1<=0||a<=0)throw A.b(A.j("radius and height must be > 0",null))
if(a0<3)throw A.b(A.j("radialSegments must be >= 3",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.ba(s,q)
o=a*0.5
for(n=-o,m=0;m<=a0;++m){l=m/a0
k=l*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
h=new A.f(j,0,i)
g=new A.f(-i,0,j)
f=j*a1
e=i*a1
p.H(new A.f(f,n,e),h,g,new A.P(l,0))
p.H(new A.f(f,o,e),h,g,new A.P(l,1))}for(m=0;m<a0;++m){d=m*2
f=d+3
B.a.C(q,A.c([d,d+2,f,d,f,d+1],r))}c=s.length/18|0
p.H(new A.f(0,o,0),B.j,B.x,B.aj)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.H(new A.f(j*a1,o,i*a1),B.j,B.x,new A.P(j*0.5+0.5,i*0.5+0.5))}for(f=c+1,e=c+2,m=0;m<a0;++m)B.a.C(q,A.c([c,f+m,e+m],r))
b=s.length/18|0
p.H(new A.f(0,n,0),B.o,B.y,B.aj)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.H(new A.f(j*a1,n,i*a1),B.o,B.y,new A.P(j*0.5+0.5,i*0.5+0.5))}for(s=b+2,f=b+1,m=0;m<a0;++m)B.a.C(q,A.c([b,s+m,f+m],r))
s=-a1
return p.a5(new A.aL(new A.f(s,n,s),new A.f(a1,o,a1)))},
mf(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a6<=0||a4<=0)throw A.b(A.j("radius and height must be > 0",null))
if(a5<3)throw A.b(A.j("radialSegments must be >= 3",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.ba(s,q)
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
p.H(new A.f(0,o,0),d,c,new A.P((i+h)*0.5,1))
p.H(new A.f(Math.cos(g)*a6,m,Math.sin(g)*a6),d,c,new A.P(i,0))
p.H(new A.f(Math.cos(f)*a6,m,Math.sin(f)*a6),d,c,new A.P(h,0))
B.a.C(q,A.c([b,b+1,b+2],r))}a=s.length/18|0
p.H(new A.f(0,m,0),B.o,B.y,B.aj)
for(j=0;j<=a5;++j){a0=j/a5*2*3.141592653589793
a1=Math.cos(a0)
a2=Math.sin(a0)
p.H(new A.f(a1*a6,m,a2*a6),B.o,B.y,new A.P(a1*0.5+0.5,a2*0.5+0.5))}for(s=a+2,a3=a+1,j=0;j<a5;++j)B.a.C(q,A.c([a,s+j,a3+j],r))
s=-a6
return p.a5(new A.aL(new A.f(s,m,s),new A.f(a6,o,a6)))},
mt(a0,a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a1<=0||a2<=0)throw A.b(A.j("radii must be > 0",null))
if(a0<3||a3<3)throw A.b(A.j("segments must be >= 3",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.ba(s,q)
for(o=0;o<=a0;++o){s=o/a0
n=s*2*3.141592653589793
m=Math.cos(n)
l=Math.sin(n)
for(k=a1+a2*m,j=a2*l,i=0;i<=a3;++i){h=i/a3
g=h*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
p.H(new A.f(k*f,j,k*e),new A.f(m*f,l,m*e),new A.f(-e,0,f),new A.P(h,s))}}d=a3+1
for(o=0;o<a0;)for(s=o*d,++o,k=o*d,i=0;i<a3;++i){c=s+i
h=k+i
b=h+1
B.a.C(q,A.c([c,c+1,b,c,b,h],r))}a=a1+a2
s=-a
return p.a5(new A.aL(new A.f(s,-a2,s),new A.f(a,a2,a)))},
me(a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a6<=0||a5<=0)throw A.b(A.j("radius and height must be > 0",null))
if(a7<2||a8<3)throw A.b(A.j("invalid ring or sector count",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.ba(s,q)
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
p.H(new A.f(d*a6,j,c*a6),new A.f(d,l,c),new A.f(-e,0,f),new A.P(h,s))}}for(s=-o,n=0;n<=a7;++n){j=n/a7
m=j*1.5707963267948966
l=Math.sin(m)
k=Math.cos(m)
for(b=-l,h=s+b*a6,j=0.5-0.5*j,i=0;i<=a8;++i){a=i/a8
g=a*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
d=k*f
c=k*e
p.H(new A.f(d*a6,h,c*a6),new A.f(d,b,c),new A.f(-e,0,f),new A.P(a,j))}}a0=a8+1
for(n=0;n<a7;)for(s=n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1
B.a.C(q,A.c([a1,h,a,a1,a,a1+1],r))}a2=(a7+1)*a0
for(n=0;n<a7;)for(s=a2+n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1+a2
B.a.C(q,A.c([a1,a1+1,a,a1,a,h+a2],r))}for(i=0;i<a8;i=a3){a3=i+1
s=a2+i
j=s+1
B.a.C(q,A.c([i,a3,j,i,j,s],r))}a4=o+a6
s=-a6
return p.a5(new A.aL(new A.f(s,-a4,s),new A.f(a6,a4,a6)))},
hC:function hC(a,b){this.a=a
this.b=b},
ba:function ba(a,b){this.a=a
this.b=b},
jt(a){var s,r,q,p,o,n,m,l,k,j
for(s=a.$ti,r=new A.ae(a,a.gn(0),s.h("ae<O.E>")),s=s.h("O.E"),q=B.dF,p=B.dI,o=!1;r.k();o=!0){n=r.d
if(n==null)n=s.a(n)
m=n.a
l=Math.min(q.a,m)
k=n.b
j=Math.min(q.b,k)
n=n.c
q=new A.f(l,j,Math.min(q.c,n))
p=new A.f(Math.max(p.a,m),Math.max(p.b,k),Math.max(p.c,n))}if(!o)throw A.b(A.j("Aabb.fromPoints requires at least one point",null))
return new A.aL(q,p)},
aL:function aL(a,b){this.a=a
this.b=b},
lY(a){var s,r,q,p,o,n,m=a.a,l=new A.fU(),k=m.length
if(3>=k)return A.i(m,3)
s=m[3]
r=m[0]
if(7>=k)return A.i(m,7)
q=m[7]
p=m[4]
if(11>=k)return A.i(m,11)
o=m[11]
n=m[8]
if(15>=k)return A.i(m,15)
return new A.fT(A.c([l.$4(s+r,q+p,o+n,m[15]+m[12]),l.$4(m[3]-m[0],m[7]-m[4],m[11]-m[8],m[15]-m[12]),l.$4(m[3]+m[1],m[7]+m[5],m[11]+m[9],m[15]+m[13]),l.$4(m[3]-m[1],m[7]-m[5],m[11]-m[9],m[15]-m[13]),l.$4(m[3]+m[2],m[7]+m[6],m[11]+m[10],m[15]+m[14]),l.$4(m[3]-m[2],m[7]-m[6],m[11]-m[10],m[15]-m[14])],t.dV))},
bz:function bz(a,b){this.a=a
this.b=b},
cC:function cC(a,b){this.a=a
this.b=b},
fT:function fT(a){this.a=a},
fU:function fU(){},
kw(a){if(a.length!==16)throw A.b(A.j("Mat4.fromColumnMajor requires 16 values",null))
return new A.b2(new Float32Array(A.p(a)))},
ky(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.b2(q)},
kx(a,b,c){var s=b.gS(),r=c.a6(s).gS(),q=s.a6(r),p=new Float32Array(16)
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
p[12]=-r.b2(a)
p[13]=-q.b2(a)
p[14]=s.b2(a)
p[15]=1
return new A.b2(p)},
b2:function b2(a){this.a=a},
hb:function hb(){},
mu(a,b){var s=a.gS(),r=b/2,q=Math.sin(r)
return new A.bA(s.a*q,s.b*q,s.c*q,Math.cos(r))},
bA:function bA(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aH:function aH(a,b,c){this.a=a
this.b=b
this.c=c},
P:function P(a,b){this.a=a
this.b=b},
f:function f(a,b,c){this.a=a
this.b=b
this.c=c},
eU:function eU(a,b){this.a=a
this.b=b},
cq:function cq(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
eV:function eV(a,b,c,d,e,f,g){var _=this
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
eW:function eW(a,b,c,d,e){var _=this
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
eY:function eY(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eZ:function eZ(a,b){this.a=a
this.b=b},
cz:function cz(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
f_:function f_(a,b,c,d,e,f){var _=this
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
f0:function f0(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
e2:function e2(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f
_.w=g},
f4:function f4(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
cP:function cP(a,b,c){this.a=a
this.b=b
this.c=c},
f7:function f7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bV:function bV(a){this.b=a},
dN:function dN(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
a4(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.L(a.a,a.b,b,c,s,r)},
jE:function jE(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var _=this
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
md(a){var s
switch(a.a){case 0:s=0
break
case 1:s=1
break
case 2:s=2.5
break
case 3:s=3.5
break
default:s=null}return s},
cY:function cY(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
fa:function fa(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eq:function eq(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fb:function fb(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
kG(a){var s=A.kx(B.j,B.o,Math.abs(0)<0.99?B.x:B.j)
return new A.bB(A.ky(1,1,B.i.al(1,0.1,3),0.05).v(0,s))},
bB:function bB(a){this.a=a},
ez:function ez(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fe:function fe(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
o6(c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3=u.l,b4="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[5]=float[5](0.227027,0.1945946,0.1216216,0.054054,0.016216);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<5;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b5="bloomBlurH",b6="bloomBlurV",b7="dofBlurH",b8="dofBlurV",b9={},c0=c4.b
if(!c0.p(0,"shadows"))throw A.b(A.aD(c4,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=c0.p(0,"ssao")
r=c0.p(0,"bloom")
q=c0.p(0,"dof")
p=c0.p(0,"grade")
o=c0.p(0,"ps1")
n=c0.p(0,"vhs")
m=c0.p(0,"volumetric")
c0=B.i.a0(e9+1,2)
l=B.i.a0(e8+1,2)
k=A.a4(B.a5,e9,e8,e7,b2)
j=A.a4(B.a5.c4(),e9,e8,b2,b2)
i=e7>1
h=A.a4(B.cY,e9,e8,b2,i?2:1)
g=A.a4(B.cX,c0,l,b2,b2)
A.a4(B.d5,e9,e8,b2,b2)
f=A.a4(B.d2,e9,e8,b2,b2)
e=A.a4(B.cW,f0,f0,b2,b2)
d=A.a4(B.cZ,c0,l,b2,b2)
c=A.a4(B.d_,c0,l,b2,b2)
b=A.a4(B.d3,c0,l,b2,b2)
a=A.a4(B.d4,c0,l,b2,b2)
a0=$.lw()
a1=i?1:0
a2=A.a4(a0,e9,e8,b2,a1+(m?1:0)+1)
a0=A.a4(B.cT,c0,l,b2,b2)
a1=A.a4(B.cU,c0,l,b2,b2)
a3=A.a4(B.cV,e9,e8,b2,b2)
a4=A.a4(B.d0,e9,e8,b2,b2)
a5=A.a4(B.d6,e9,e8,b2,b2)
a6=A.a4(B.d1,e9,e8,b2,b2)
a7=i?new A.cP(c2,k,j):b2
b9.a=null
a8=A.kG(B.bf)
if(m){a9=i?j:k
b0=new A.eO(c1,b3,"#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\n\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform mat4 uViewProjection;\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform float uShaftIntensity;\nuniform float uFogDensity;\nuniform float uAnisotropy;\nuniform mat4 uView;\nuniform mat4 uInverseProjection;\nuniform vec3 uVolumetricAlbedo;\nuniform float uVolumetricHeightFalloff;\nuniform float uVolumetricDustDensity;\nuniform float uVolumetricJitter;\nuniform float uVolumetricIntensity;\nuniform float uVolumetricSampleCount;\nuniform float uVolumetricSourceCount;\n\nuniform vec3 uSourcePosition0;\nuniform vec3 uSourceColor0;\nuniform float uSourceIntensity0;\nuniform float uSourceReferenceDistance0;\nuniform float uSourceCutoffDistance0;\nuniform vec3 uSourcePosition1;\nuniform vec3 uSourceColor1;\nuniform float uSourceIntensity1;\nuniform float uSourceReferenceDistance1;\nuniform float uSourceCutoffDistance1;\nuniform vec3 uSourcePosition2;\nuniform vec3 uSourceColor2;\nuniform float uSourceIntensity2;\nuniform float uSourceReferenceDistance2;\nuniform float uSourceCutoffDistance2;\nuniform vec3 uSourcePosition3;\nuniform vec3 uSourceColor3;\nuniform float uSourceIntensity3;\nuniform float uSourceReferenceDistance3;\nuniform float uSourceCutoffDistance3;\n\nfloat linearDepth(float depth) {\n  float z = depth * 2.0 - 1.0;\n  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);\n}\n\nfloat phaseHenyeyGreenstein(float cosTheta, float anisotropy) {\n  float g = clamp(anisotropy, -0.85, 0.85);\n  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;\n  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));\n}\n\nvec3 sourceContribution(\n  vec3 position,\n  vec3 color,\n  float intensity,\n  float referenceDistance,\n  float cutoffDistance,\n  vec3 viewRay,\n  float rayLength\n) {\n  vec4 clip = uViewProjection * vec4(position, 1.0);\n  if (clip.w <= 0.0) return vec3(0.0);\n  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;\n  float sourceDistance = length(sourceView);\n  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);\n  vec3 sampleToSource = sourceView - viewRay * tClosest;\n  float distanceToSource = max(length(sampleToSource), 1e-3);\n  float cutoff = 1.0 - smoothstep(\n    cutoffDistance * 0.65, cutoffDistance, sourceDistance);\n  float inverseSquare = intensity * referenceDistance * referenceDistance /\n      max(distanceToSource * distanceToSource,\n          referenceDistance * referenceDistance);\n  // The incoming direction is source -> sample and the outgoing direction is\n  // sample -> camera. This is the same phase convention as the directional\n  // medium path, but now evaluated against the located source.\n  float phase = phaseHenyeyGreenstein(\n    dot(normalize(sampleToSource), viewRay), uAnisotropy);\n  // Located practicals and lightning must also acquire visible body in a\n  // dust-filled room. Use the same broad haze plus particulate density as the\n  // directional march; otherwise a clear-air fog toggle would accidentally\n  // erase dust-lit source rays while the directional shafts still showed it.\n  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);\n  float mediumWeight = 1.0 - exp(-max(\n    mediumDensity * min(rayLength, cutoffDistance), 0.0));\n  float pathWeight = clamp(\n    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);\n  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *\n    uVolumetricIntensity * 0.35;\n}\n\nvoid main() {\n  float depth = texture(uSceneDepth, vUv).r;\n  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);\n  viewPoint /= max(abs(viewPoint.w), 1e-5);\n  vec3 viewRay = normalize(viewPoint.xyz);\n  // linearDepth is camera-space Z; convert it to distance along the actual\n  // reconstructed ray so wide and tall projections integrate equally.\n  float cameraDepth = linearDepth(depth);\n  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);\n  float density = max(uFogDensity, 0.0);\n\n  // A fixed, bounded integral keeps the pass deterministic and makes its\n  // cost predictable on weak adapters. The depth buffer stops integration at\n  // the first opaque surface, so shafts do not leak through geometry.\n  const int maxSampleCount = 24;\n  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));\n  vec3 scatter = vec3(0.0);\n  float transmittance = 1.0;\n  float stepLength = rayLength / float(sampleCount);\n  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);\n  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);\n  for (int i = 0; i < maxSampleCount; i++) {\n    if (i >= sampleCount) break;\n    float distanceAlongRay = clamp(\n      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);\n    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));\n    // Dust is a separate, host-resolved particulate phase. It is denser near\n    // the occupied room volume than the broad atmospheric haze, so shafts gain\n    // visible body without turning the far horizon opaque. At zero density the\n    // extra term is exactly zero and the established fog path is unchanged.\n    float dustWeight = exp(-max(distanceAlongRay *\n      uVolumetricHeightFalloff * 0.45, 0.0));\n    float opticalDensity = density +\n      max(uVolumetricDustDensity, 0.0) * dustWeight;\n    float opticalDepth = opticalDensity * stepLength * heightWeight;\n    float sampleTransmittance = exp(-opticalDepth);\n    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);\n    scatter += transmittance * (uLightColor * uVolumetricAlbedo *\n      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;\n    transmittance *= sampleTransmittance;\n  }\n\n  if (uVolumetricSourceCount > 0.5) {\n    scatter += sourceContribution(\n      uSourcePosition0, uSourceColor0, uSourceIntensity0,\n      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 1.5) {\n    scatter += sourceContribution(\n      uSourcePosition1, uSourceColor1, uSourceIntensity1,\n      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 2.5) {\n    scatter += sourceContribution(\n      uSourcePosition2, uSourceColor2, uSourceIntensity2,\n      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 3.5) {\n    scatter += sourceContribution(\n      uSourcePosition3, uSourceColor3, uSourceIntensity3,\n      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);\n  }\n\n  // Fade the final sample at the far plane and keep the additive output\n  // bounded so a storm flash cannot blow out the entire frame.\n  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);\n  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);\n}\n","#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\nuniform sampler2D uVolumetric;\nuniform float uVolumetricStrength;\n\nvoid main() {\n  vec3 light = texture(uVolumetric, vUv).rgb;\n  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);\n}\n",c2,e1,c8,g,f,a9,h,A.c([],t.J))}else b0=b2
g=t.f
b1=A.c([],g)
if(!m)h=i?j:k
if(r){B.a.C(b1,A.c([new A.cq(c1,b3,b4,c2,b5,b5,B.b1,!0,h,b,e0,c0,l),new A.cq(c1,b3,b4,c2,b6,b6,B.dV,!1,b,a,c6,c0,l),new A.dL(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",c2,c7,a,h,a2)],g))
h=a2}if(q){B.a.C(b1,A.c([new A.cz(c1,b3,b4,c2,b7,b7,B.b2,h,a0,e0,c0,l),new A.cz(c1,b3,b4,c2,b8,b8,B.dW,a0,a1,d1,c0,l),new A.dV(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// Circle-of-confusion is a simple linear ramp from the focus distance\n// outward (front and back treated the same \u2014 no separate near/far falloff\n// curve), clamped to [0,1] and scaled by uStrength so\n// PostProcessState.depthOfFieldStrength == 0 is a true no-op (coc == 0\n// everywhere, oColor == the sharp source exactly).\nvoid main(){\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n  float coc=clamp(abs(depth-uFocusDistance)/max(uFocusRange,0.0001),0.0,1.0)*uStrength;\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  vec3 blurred=texture(uBlurred,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,coc),1.0);\n}\n",c2,e0,d2,e1,c8,h,f,a1,a3)],g))
h=a3}if(p){B.a.j(b1,new A.e2(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",c2,d4,h,a4))
h=a4}if(o){B.a.j(b1,new A.eq(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",c2,h,a5))
h=a5}if(n){B.a.j(b1,new A.eN(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',c2,e6,e5,h,a6))
h=a6}j=A.c([new A.dS(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d7,d6,c5,f)],g)
if(s)j.push(new A.eD(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=8;\nconst vec3 KERNEL[8]=vec3[8](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    // NDC [-1,1] -> UV [0,1] requires the constant 0.5, not vUv (the\n    // *current* fragment's own UV) \u2014 adding vUv here was a real bug: it\n    // conflated \"this sample's own absolute reprojected screen position\"\n    // with \"an offset relative to the current fragment,\" producing an\n    // error of (vUv-0.5) per axis that grows with distance from screen\n    // center. That's exactly what produced a huge, blobby, non-local dark\n    // region instead of contact occlusion \u2014 every sample tested a wildly\n    // wrong depth location except right at screen center, where the error\n    // happened to be near zero.\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    occlusion+=(occluderView.z>=samplePos.z+0.02?1.0:0.0)*rangeCheck;\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",c2,e1,c8,d))
if(s)j.push(new A.eC(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float centerDepth=linearDepth(texture(uSceneDepth,vUv).r);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleDepth=linearDepth(texture(uSceneDepth,sampleUv).r);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*4.0);\n      sum+=texture(uSsaoRaw,sampleUv).r*depthWeight;\n      weightSum+=depthWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',c2,e4,e1,c8,c0,l,d,c))
j.push(new A.ez(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d7,d6,c5,c9,b2,b2,new A.j_(b9),e))
j.push(new A.eA(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nuniform vec3 uReflectionColor;\nuniform float uReflectionIntensity;\nuniform float uReflectionConfidence;\nuniform vec2 uShadowMapTexelSize;\nuniform float uShadowFilterRadius;\nuniform float uShadowBias;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uSpecularScale;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nuniform float uSurfaceSnowCoverage;\nuniform float uSurfaceDissolution;\nuniform float uThermalSourceCount;\nuniform vec3 uThermalSourcePosition0;\nuniform float uThermalSourceRadius0;\nuniform float uThermalSourceDissolution0;\nuniform vec3 uThermalSourcePosition1;\nuniform float uThermalSourceRadius1;\nuniform float uThermalSourceDissolution1;\nuniform vec3 uThermalSourcePosition2;\nuniform float uThermalSourceRadius2;\nuniform float uThermalSourceDissolution2;\nuniform vec3 uThermalSourcePosition3;\nuniform float uThermalSourceRadius3;\nuniform float uThermalSourceDissolution3;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return lightColor*lightIntensity*ndotl*coneFalloff*\n    distanceFalloff*enabled;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0);\n  float ndotl=max(dot(normal,lightDir),0.0);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlick(hdotv,f0);\n  float distribution=distributionGgx(ndoth,roughness);\n  float geometry=geometrySmith(ndotv,ndotl,roughness);\n  vec3 numerator=distribution*geometry*fresnel;\n  float denominator=max(4.0*ndotv*ndotl,0.001);\n  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog keeps the smooth distance ramp for authored horizon control, but\n// the participating-medium term is an analytic optical depth along the actual\n// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the\n// integral has a stable constant-height limit and therefore does not shimmer\n// when a surface is nearly level with the camera. Zero density remains an\n// exact no-op; the host can still use the distance ramp independently.\nfloat heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){\n  float segmentLength=length(rayEnd-rayStart);\n  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;\n  float falloff=max(uFogHeightFalloff,0.);\n  float h0=max(rayStart.y,0.);\n  float h1=max(rayEnd.y,0.);\n  float integral;\n  if(falloff<=0.||abs(h1-h0)<=0.0001){\n    integral=segmentLength*exp(-falloff*h0);\n  }else{\n    float denominator=falloff*(h1-h0);\n    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;\n  }\n  return max(uFogDensity*integral,0.);\n}\n\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);\n  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);\n  float mediumFactor=1.-exp(-opticalDepth);\n  return clamp(max(distFactor,mediumFactor),0.,1.);\n}\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);\n  // Fixed low-discrepancy offsets avoid the directional shimmer of a regular\n  // square lattice while remaining deterministic and free of per-frame noise.\n  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);\n  float sum=0.;\n  sum+=sampleShadow(projCoord+vec3(vec2(-.942,-.399)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.945,-.768)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.094,.886)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.344,.294)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.716,.642)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.688,-.089)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.287,-.885)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.052,.008)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.831,.486)*t,0.),bias);\n  return sum/9.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // \xa76.2's alpha-masked route. Deliberately the first thing after the\n  // fetch it depends on, and ahead of all the lighting below: a discarded\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  direct*=uDirectLightScale;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  float upward=clamp(n.y*0.5+0.5,0.0,1.0);\n  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao*mix(0.85,1.15,upward);\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Weather changes the material before direct and environment response.\n  // Thawing therefore affects the same specular lobe the viewer sees,\n  // instead of changing only diffuse color after the highlight is computed.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);\n  // A steady spherical conductive field decays approximately as 1/r. The\n  // host keeps the slow latent material memory in uSurfaceDissolution; this\n  // local term therefore models the spatial heat field without making warm\n  // surfaces snap back or disappear at an arbitrary exponential radius.\n  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/\n      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));\n  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/\n      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));\n  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/\n      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));\n  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/\n      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));\n  thermalDissolution=clamp(thermalDissolution,0.0,1.0);\n  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*\n    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);\n  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);\n  float dissolution=thermalDissolution;\n  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);\n  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  // A continuous water film forms a second dielectric lobe. It smooths the\n  // authored surface only as coverage rises, so damp cloth stays diffuse\n  // while puddled stone gains a tight grazing reflection.\n  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);\n  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  specular*=uDirectLightScale*uSpecularScale;\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*(1.0-0.25*rough));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);\n  float coat=coatStrength*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*\n    uDirectLightScale*uSpecularScale;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  // Environment fallback reflections are deliberately bounded and weighted\n  // by wetness/grazing angle. A real probe/history hit can raise confidence;\n  // the current host fallback remains visible but never masquerades as SSR.\n  float reflectionNdotV=max(dot(n,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metal);\n  vec3 envFresnel=f0+(max(vec3(1.0-specRough),f0)-f0)*pow(clamp(1.0-reflectionNdotV,0.0,1.0),5.0);\n  float envGloss=(1.0-specRough)*(1.0-specRough);\n  float reflectionSurface=clamp(metal*0.85+(1.0-metal)*(wetness+0.18*dissolution+envGloss*0.25),0.0,1.0);\n  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);\n  float reflectionWeight=clamp(\n    uReflectionIntensity*reflectionSurface*\n      (1.0-0.72*rough)*reflectionConfidence,\n    0.0,1.0);\n  lit+=uReflectionColor*envFresnel*reflectionWeight*ao;\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  oGlow=vec4(emissive,1.);\n}\n",d7,d6,c5,d8,d9,d3,d5,e2,new A.j0(b9,a8),c9,d0,e3,s,e9,e8,f0,f0,e,c,k))
if(a7!=null)j.push(a7)
if(b0!=null)j.push(b0)
B.a.C(j,b1)
j.push(new A.cY(c1,b3,u.b,c2,h,c3))
return new A.dW(j)},
j_:function j_(a){this.a=a},
j0:function j0(a,b){this.a=a
this.b=b},
eA:function eA(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
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
ff:function ff(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
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
eD:function eD(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
fh:function fh(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
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
fg:function fg(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
eN:function eN(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fm:function fm(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
eO:function eO(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
fo:function fo(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fn:function fn(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
d1:function d1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eR:function eR(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fr:function fr(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jG(a,b,c,d,e,f,g,h,i,j,k){return new A.ev(j,B.af,A.c([],t.D),f,e,k,c,a,!0,!0,i,d)},
ev:function ev(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
ex(a,b){return new A.d5(a,b)},
fV:function fV(a,b){this.a=a
this.b=b},
e0:function e0(a,b){this.a=a
this.b=b},
h_:function h_(a,b){this.a=a
this.b=b},
h0:function h0(a,b){this.a=a
this.b=b},
e_:function e_(a,b,c){this.a=a
this.b=b
this.c=c},
fZ:function fZ(){},
bZ:function bZ(a,b){this.a=a
this.b=b},
cD:function cD(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
e1:function e1(a,b){this.a=a
this.b=b},
c9:function c9(a,b){this.a=a
this.b=b},
d5:function d5(a,b){this.a=a
this.b=b},
b8:function b8(a,b){this.a=a
this.b=b},
e:function e(a,b){this.a=a
this.b=b},
cu:function cu(a,b){this.a=a
this.b=b},
dT:function dT(a,b){this.a=a
this.b=b},
hz(a,b,c,d){var s=0,r=A.jX(t.ac),q,p,o,n,m,l,k,j,i
var $async$hz=A.k_(function(e,f){if(e===1)return A.jR(f,r)
for(;;)switch(s){case 0:j=B.bh.dj(a)
i=j==null?null:new A.ew(j.a,new A.fA(new A.fB(),new A.et()),new A.dZ(A.c([],t.c4),B.bo),A.c([],t.cR),B.a2,A.c([],t.cL),null)
if(i==null){q=null
s=1
break}p=A.a(a.clientWidth)>0?A.a(a.clientWidth):A.a(a.width)
o=A.a(a.clientHeight)>0?A.a(a.clientHeight):A.a(a.height)
n=A.kI(o,p,A.fs(A.t(v.G.window).devicePixelRatio),2,!0)
a.width=n.c
a.height=n.d
m=A.oa(c)
s=3
return A.jQ(A.iZ(new A.hA(n),m,i,n),$async$hz)
case 3:i.az()
l=A.mA(i.w.a.b)
B.a.j(i.d,l)
k=new A.cW(a,i,l,new A.fR(),A.jG(B.R,!0,B.K,null,null,null,"root",!0,0,B.af,-1),B.bm,B.cN,n)
k.y=new A.hl(B.C,B.C)
k.w=!0
k.cT()
q=k
s=1
break
case 1:return A.jS(q,r)}})
return A.jT($async$hz,r)},
bX:function bX(a,b){this.a=a
this.b=b},
cW:function cW(a,b,c,d,e,f,g,h){var _=this
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
hA:function hA(a){this.a=a},
hr:function hr(a){this.a=a},
hs:function hs(a){this.a=a},
ht:function ht(a){this.a=a},
hu:function hu(){},
hv:function hv(a){this.a=a},
hw:function hw(a){this.a=a},
hx:function hx(a){this.a=a},
hy:function hy(a){this.a=a},
en:function en(a,b){this.a=a
this.b=b},
fW:function fW(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
fX:function fX(){},
fY:function fY(){},
dq:function dq(a,b){this.a=a
this.b=b},
bo:function bo(a,b){var _=this
_.a=0
_.b=a
_.f=_.c=null
_.$ti=b},
aQ:function aQ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=0
_.$ti=d},
lU(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.bW(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
fx:function fx(a,b){this.a=a
this.b=b},
bT:function bT(a,b){this.a=a
this.b=b},
fC:function fC(a,b){this.a=a
this.b=b},
fG:function fG(a,b){this.a=a
this.b=b},
bW:function bW(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
a7:function a7(a,b){this.a=a
this.b=b},
i5:function i5(){this.a=null},
mK(a){var s=new A.eP(a,B.d,new A.i5(),A.mU(a))
s.cp(a)
return s},
mU(a){var s,r,q=t.du.a(a.getSupportedExtensions())
if(q==null)return A.am(t.N)
s=A.am(t.N)
r=J.a1(t.dy.b(q)?q:new A.ct(q,A.G(q).h("ct<1,v>")))
while(r.k())s.j(0,r.gm())
return s},
as(a,b){var s,r
if(a.b!==B.d)A.l(A.m(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.a(s.drawingBufferWidth),A.a(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
mP(a,b){var s
if(a.b!==B.d)A.l(A.m(u.k))
switch(b){case 1:a.a.drawBuffers(A.c([A.a(v.G.WebGL2RenderingContext.COLOR_ATTACHMENT0)],t.n))
break
case 2:s=v.G
a.a.drawBuffers(A.c([A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
break
default:throw A.b(A.j("WebGl2Device.setColorAttachmentCount: count must be 1 or 2, got "+b,null))}},
mO(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.a(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
mN(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
kL(a,b){var s
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
mL(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
a9(a,b){var s,r,q,p
if(a.b!==B.d)A.l(A.m(u.k))
s=a.f
r=s.dl(b)
if(r.a===0)return
if(r.p(0,B.a7)){q=v.G
p=a.a
if(b.a)p.enable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.p(0,B.a8))a.a.depthFunc(A.mO(a,b.b))
if(r.p(0,B.a9))a.a.depthMask(b.c)
if(r.p(0,B.ad)){q=v.G
p=a.a
if(b.w)p.enable(A.a(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.a(q.WebGL2RenderingContext.CULL_FACE))}if(r.p(0,B.ae))a.a.cullFace(A.mN(a,b.x))
if(r.p(0,B.aT)){q=v.G.WebGL2RenderingContext
q=A.a(q.CCW)
a.a.frontFace(q)}if(r.p(0,B.aa)){q=v.G
p=a.a
if(b.d)p.enable(A.a(q.WebGL2RenderingContext.BLEND))
else p.disable(A.a(q.WebGL2RenderingContext.BLEND))}if(r.p(0,B.ab))a.a.blendFunc(A.kL(a,b.e),A.kL(a,b.f))
if(r.p(0,B.ac))a.a.blendEquation(A.mL(a,b.r))
if(r.p(0,B.aR))a.a.colorMask(!0,!0,!0,!0)
if(r.p(0,B.aS)){q=v.G.WebGL2RenderingContext
a.a.disable(A.a(q.SCISSOR_TEST))}s.a=b},
mM(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.a(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.a(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.a(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
bD(a,b,c,d,e,f){var s
if(a.b!==B.d)A.l(A.m(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.mM(a,b))},
aR(a,b){var s
if(a.b!==B.d)A.l(A.m(u.k))
s=A.t(b.a)
a.a.useProgram(s)
a.e=s},
d(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.d)A.l(A.m(u.k))
s=a.e
if(s==null)throw A.b(A.m("WebGl2Device.setUniform called with no bound program"))
r=a.a
q=A.Q(r.getUniformLocation(s,b))
if(q==null)return
switch(c.a.a){case 0:r.uniform1f(q,A.iB(c.b))
break
case 1:p=t.B.a(c.b)
o=p.length
if(0>=o)return A.i(p,0)
n=p[0]
if(1>=o)return A.i(p,1)
r.uniform2f(q,n,p[1])
break
case 2:p=t.B.a(c.b)
o=p.length
if(0>=o)return A.i(p,0)
n=p[0]
if(1>=o)return A.i(p,1)
m=p[1]
if(2>=o)return A.i(p,2)
r.uniform3f(q,n,m,p[2])
break
case 3:p=t.B.a(c.b)
o=p.length
if(0>=o)return A.i(p,0)
n=p[0]
if(1>=o)return A.i(p,1)
m=p[1]
if(2>=o)return A.i(p,2)
l=p[2]
if(3>=o)return A.i(p,3)
A.aa(r,"uniform4f",[q,n,m,l,p[3]],t.H)
break
case 4:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 5:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 6:r.uniform1i(q,A.a(c.b))
break}},
at(a,b){if(a.b!==B.d)A.l(A.m(u.k))
a.a.bindVertexArray(A.t(b.a))},
W(a,b,c){var s,r,q,p,o,n
if(a.b!==B.d)A.l(A.m(u.k))
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
return}throw A.b(A.m("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.b(A.m("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
mQ(a,b,c){var s,r,q,p
if(a.b!==B.d)A.l(A.m(u.k))
s=A.t(b.a)
r=a.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),s)
A:{p=q.WebGL2RenderingContext
r.bufferData(A.a(p.ELEMENT_ARRAY_BUFFER),c,A.a(q.WebGL2RenderingContext.STATIC_DRAW))
break A}},
mR(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
kO(a,b){var s,r,q,p
if(a.b!==B.d)A.l(A.m(u.k))
s=a.a
r=A.Q(s.createBuffer())
if(r==null)throw A.b(A.m("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.aq?A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.a(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.mR(a,b.b))
return new A.bc(r)},
kM(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
kN(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
kP(a,b){var s,r,q,p,o,n,m,l,k
if(a.b!==B.d)A.l(A.m(u.k))
s=a.a
r=A.Q(s.createTexture())
if(r==null)throw A.b(A.m("WebGl2Device: gl.createTexture() returned null"))
q=v.G
p=q.WebGL2RenderingContext
o=A.a(p.TEXTURE_2D)
s.bindTexture(o,r)
p=q.WebGL2RenderingContext
A.aa(s,"texStorage2D",[o,1,A.a(p.RGBA8),1,1],t.H)
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.kM(a,B.at))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.kM(a,B.at))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_S),A.kN(a,B.au))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_T),A.kN(a,B.au))
n=a.r.p(0,"EXT_texture_filter_anisotropic")
m=n?a.bE(34047):1
if(!isFinite(1))A.l(A.aD(1,"requested","anisotropy must be finite and in [1, 16]"))
if(n&&isFinite(m)&&m>=1)l=m>16?16:m
else l=1
k=1<l?1:l
if(k>1)s.texParameterf(o,34046,k)
return new A.bc(new A.dA(r,1,1,1,!1))},
kQ(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.d)A.l(A.m(u.k))
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
if(r)A.aa(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.aa(l,"texSubImage2D",[m,0,0,0,q,p,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
mS(a,b){if(a.b!==B.d)A.l(A.m(u.k))
t.R.a(b.a)
return},
eQ(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
kS(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.d)A.l(A.m(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.b(A.j("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.Q(r.createFramebuffer())
if(q==null)throw A.b(A.m("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.W
if(n&&!a1.e)throw A.b(A.j("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.as||o===B.bv
l=d
k=d
j=d
i=d
if(n){r.drawBuffers(A.c([A.a(p.WebGL2RenderingContext.NONE)],t.n))
r.readBuffer(A.a(p.WebGL2RenderingContext.NONE))}else{o=a1.c
h=t.H
g=a1.b
if(o>1){k=A.Q(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
A.aa(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.Q(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.aa(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.c([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.Q(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.aa(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.aa(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.Q(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),j)
A.aa(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.aa(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.TEXTURE_2D),j,0],h)
r.drawBuffers(A.c([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}}f=d
e=d
if(a1.e){o=a1.c
h=t.H
g=a1.b
if(o>1){f=A.Q(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.aa(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.Q(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.aa(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
A.aa(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.a(r.checkFramebufferStatus(A.a(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.a(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.jH(a0,q,l,k,f,e,j,i)
throw A.b(A.m("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.bc(new A.dz(q,l,k,f,e,j,i,s,a1.b,a1.c))},
jH(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
aA(a){var s
if(a.b!==B.d)A.l(A.m(u.k))
s=A.Q(a.a.createVertexArray())
if(s==null)throw A.b(A.m("WebGl2Device: gl.createVertexArray() returned null"))
return new A.bc(s)},
kR(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.Q(p.createShader(b))
if(o==null)throw A.b(A.ex(b===A.lo(A.lb(A.ls(),r),q,t.S)?B.aN:B.aO,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.aV(A.cl(p.getShaderParameter(o,A.a(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bJ(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.b(A.ex(b===A.lo(A.lb(A.ls(),r),q,t.S)?B.aN:B.aO,s))}return o},
mT(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.d)A.l(A.m(u.k))
q=v.G
s=A.kR(a,A.a(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.kR(a,A.a(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.Q(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.b(B.dc)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.aV(A.cl(o.getProgramParameter(n,A.a(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bJ(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.ex(B.aP,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.A)(c),++l){k=c[l]
if(A.a(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.ex(B.aQ,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.Q(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.ex(B.aQ,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.bc(n)},
bc:function bc(a){this.a=a},
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
fq:function fq(a){this.a=a
this.b=!1},
eP:function eP(a,b,c,d){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=c
_.r=d
_.w=!1},
i2:function i2(a){this.a=a},
i3:function i3(a){this.a=a},
iA:function iA(){},
fp:function fp(){},
i1:function i1(a){this.a=a},
i4:function i4(){},
jb(){var s=0,r=A.jX(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6
var $async$jb=A.k_(function(b7,b8){if(b7===1)return A.jR(b8,r)
for(;;)switch(s){case 0:b4=v.G
b5=A.Q(A.t(b4.document).querySelector("#showcase-canvas"))
b6=t.m
if(!b6.b(b5)){s=1
break}s=3
return A.jQ(A.hz(b5,!0,B.aL,!0),$async$jb)
case 3:p=b8
if(p==null){s=1
break}o=p.y
n=o==null
if(!n)o.b=8.5
if(!n)o.d=0.45
if(!n)o.a=B.ak
if(!n)o.as=!0
if(!n)o.at=0.18
o=p.f.dh(B.be)
p.f=o
p.f=o.di(B.bO,1,B.aB,B.b6,B.bX,0.85,1.2)
p.r=B.cM
m=A.Q(A.t(b4.document).querySelector("#tone-map-select"))
if(b6.b(m))m.addEventListener("change",A.ak(new A.jc(m,p)))
l=A.Q(A.t(b4.document).querySelector("#turntable-toggle"))
if(b6.b(l)){l.checked=!0
l.addEventListener("change",A.ak(new A.jd(p,l)))}o=A.mr(30,4,4,30)
n=p.b
k=n.gG().a9(o,"ground")
o=A.ms(1,40,40)
j=n.gG().a9(o,"center_sphere")
o=A.mt(20,1.8,0.08,48)
i=n.gG().a9(o,"orbit_torus")
o=A.me(0.6,0.3,12,24)
h=n.gG().a9(o,"satellite_capsule")
o=A.mh(0.9,24,0.35)
g=n.gG().a9(o,"satellite_cylinder")
o=A.mf(0.9,24,0.4)
f=n.gG().a9(o,"satellite_cone")
o=A.mg(0.65)
e=n.gG().a9(o,"satellite_cube")
o=A.b3(0.2,0,"ground",0,0.7,0.16,0.12,0.1)
d=n.gG().U(o)
o=A.b3(0.1,0.5,"hero_gold",1,0.12,0.35,0.78,1)
o=n.gG().U(o)
c=A.b3(0.2,0,"hero_chrome",0.98,0.05,0.98,0.95,0.95)
c=n.gG().U(c)
b=A.b3(0.2,0,"hero_copper",1,0.15,0.54,0.64,0.95)
b=n.gG().U(b)
a=A.b3(0.2,0,"hero_silver",1,0.08,0.91,0.96,0.97)
a=n.gG().U(a)
a0=A.kz(0.9,B.bM,"hero_ceramic",0.18)
a0=n.gG().U(a0)
a1=A.jC(B.bQ,"hero_plastic",0.22)
a1=n.gG().U(a1)
a2=A.b3(0.2,0,"hero_iron",0.85,0.28,0.58,0.57,0.56)
a3=A.ku(["gold",o,"chrome",c,"copper",b,"silver",a,"ceramic",a0,"plastic",a1,"iron",n.gG().U(a2)],t.N,t.eL)
a2=A.b3(0.2,0,"torus_chrome",0.98,0.06,0.98,0.95,0.95)
a4=n.gG().U(a2)
a2=A.jC(B.bW,"sat_emerald",0.22)
a2=n.gG().U(a2)
a1=A.kz(0.8,B.bU,"sat_ruby",0.18)
a1=n.gG().U(a1)
a0=A.jC(B.bR,"sat_sapphire",0.2)
a0=n.gG().U(a0)
a=A.b3(0.2,0,"sat_copper",1,0.2,0.54,0.64,0.95)
a5=[a2,a1,a0,n.gG().U(a)]
a=p.e
a.aD(0,d,k,"ground_node",new A.aH(B.o,B.B,1))
n=a3.q(0,"gold")
n.toString
a6=a.aD(0,n,j,"center_sphere_node",new A.aH(B.ak,B.B,1))
a7=A.Q(A.t(b4.document).querySelector("#material-select"))
if(b6.b(a7))a7.addEventListener("change",A.ak(new A.je(a3,a7,a6)))
a8=a.aD(0,a4,i,"torus_ring_node",new A.aH(B.ak,B.B,1))
a9=A.jG(B.R,!0,B.K,null,null,null,"orbit_ring",!0,0,B.af,-1)
a6.bV(a9)
b0=[h,g,f,e]
b1=A.c([],t.D)
for(b2=0;b2<4;++b2){b3=b2*1.5707963267948966
b4=b0[b2]
B.a.j(b1,a9.aD(0,a5[b2],b4,"satellite_"+b2,new A.aH(new A.f(Math.cos(b3)*3.2,0,Math.sin(b3)*3.2),B.B,1)))}p.sdF(new A.jf(a6,a8,a9,b1,p))
p.ck()
case 1:return A.jS(q,r)}})
return A.jT($async$jb,r)},
jc:function jc(a,b){this.a=a
this.b=b},
jd:function jd(a,b){this.a=a
this.b=b},
je:function je(a,b,c){this.a=a
this.b=b
this.c=c},
jf:function jf(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
lu(a){return v.mangledGlobalNames[a]},
ox(a){throw A.U(A.ks(a),new Error())},
aU(){throw A.U(A.m6(""),new Error())},
lt(){throw A.U(A.ks(""),new Error())},
jm(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.b(A.aD(b.gdu(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].gl().c.a2()
o=q*16
n=o+16
B.a0.bl(s,o,n,p.a)
if(l)B.a0.bl(r,o,n,p.bc().a)}m=a.a
A.d(m,"uInstanceModels",new A.e(B.aW,s))
if(l)A.d(m,"uInstanceNormalMatrices",new A.e(B.aW,r))
A.d(m,"uUseInstances",B.aX)}},B={}
var w=[A,J,B]
var $={}
A.jy.prototype={}
J.e4.prototype={
V(a,b){return a===b},
gJ(a){return A.eo(a)},
i(a){return"Instance of '"+A.ep(a)+"'"},
gF(a){return A.aT(A.jU(this))}}
J.e6.prototype={
i(a){return String(a)},
gJ(a){return a?519018:218159},
gF(a){return A.aT(t.y)},
$iC:1,
$iz:1}
J.cF.prototype={
V(a,b){return null==b},
i(a){return"null"},
gJ(a){return 0},
$iC:1}
J.cH.prototype={$iH:1}
J.bi.prototype={
gJ(a){return 0},
gF(a){return B.dq},
i(a){return String(a)}}
J.em.prototype={}
J.bC.prototype={}
J.bh.prototype={
i(a){var s=a[$.lx()]
if(s==null)s=a[$.k7()]
if(s==null)return this.co(a)
return"JavaScript function for "+J.bS(s)},
$ibu:1}
J.cG.prototype={
gJ(a){return 0},
i(a){return String(a)}}
J.cI.prototype={
gJ(a){return 0},
i(a){return String(a)}}
J.r.prototype={
j(a,b){A.G(a).c.a(b)
a.$flags&1&&A.br(a,29)
a.push(b)},
ag(a,b){var s
a.$flags&1&&A.br(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aV(a[s],b)){a.splice(s,1)
return!0}return!1},
C(a,b){var s
A.G(a).h("k<1>").a(b)
a.$flags&1&&A.br(a,"addAll",2)
if(Array.isArray(b)){this.ct(a,b)
return}for(s=J.a1(b);s.k();)a.push(s.gm())},
ct(a,b){var s,r
t.r.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.ax(a))
for(r=0;r<s;++r)a.push(b[r])},
Y(a){a.$flags&1&&A.br(a,"clear","clear")
a.length=0},
R(a,b){if(!(b>=0&&b<a.length))return A.i(a,b)
return a[b]},
cl(a,b){var s
if(b<0||b>a.length)throw A.b(A.aP(b,0,a.length,"start",null))
s=a.length
if(b===s)return A.c([],A.G(a))
return A.c(a.slice(b,s),A.G(a))},
gai(a){var s=a.length
if(s===1){if(0>=s)return A.i(a,0)
return a[0]}if(s===0)throw A.b(A.jv())
throw A.b(A.kn())},
aE(a,b){var s,r
A.G(a).h("z(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.b(A.ax(a))}return!0},
aa(a,b){var s,r,q,p,o,n=A.G(a)
n.h("h(1,1)?").a(b)
a.$flags&2&&A.br(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.nB()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.e3()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.ck(b,2))
if(p>0)this.cY(a,p)},
cj(a){return this.aa(a,null)},
cY(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
ds(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.i(a,s)
if(J.aV(a[s],b))return s}return-1},
p(a,b){var s
for(s=0;s<a.length;++s)if(J.aV(a[s],b))return!0
return!1},
i(a){return A.jw(a,"[","]")},
gt(a){return new J.cp(a,a.length,A.G(a).h("cp<1>"))},
gJ(a){return A.eo(a)},
gn(a){return a.length},
q(a,b){if(!(b>=0&&b<a.length))throw A.b(A.j3(a,b))
return a[b]},
D(a,b,c){A.G(a).c.a(c)
a.$flags&2&&A.br(a)
if(!(b>=0&&b<a.length))throw A.b(A.j3(a,b))
a[b]=c},
b8(a,b){var s
A.G(a).h("z(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gF(a){return A.aT(A.G(a))},
$ik:1,
$ix:1}
J.e5.prototype={
e0(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.ep(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.h3.prototype={}
J.cp.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.A(q)
throw A.b(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iN:1}
J.c0.prototype={
I(a,b){var s
A.fs(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gap(b)
if(this.gap(a)===s)return 0
if(this.gap(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gap(a){return a===0?1/a<0:a<0},
dX(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.b(A.cc(""+a+".toInt()"))},
c8(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.cc(""+a+".round()"))},
al(a,b,c){if(this.I(b,c)>0)throw A.b(A.o0(b))
if(this.I(a,b)<0)return b
if(this.I(a,c)>0)return c
return a},
bi(a,b){var s
if(b>20)throw A.b(A.aP(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gap(a))return"-"+s
return s},
dZ(a,b){var s
if(b>20)throw A.b(A.aP(b,0,20,"fractionDigits",null))
s=a.toExponential(b)
if(a===0&&this.gap(a))return"-"+s
return s},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gJ(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
W(a,b){return a+b},
aI(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
a0(a,b){return(a|0)===a?a/b|0:this.d3(a,b)},
d3(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.cc("Result of truncating division is "+A.o(s)+": "+A.o(a)+" ~/ "+b))},
d1(a,b){var s
if(a>0)s=this.d0(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
d0(a,b){return b>31?0:a>>>b},
aH(a,b){return a<b},
gF(a){return A.aT(t.p)},
$iac:1,
$iq:1,
$iab:1}
J.cE.prototype={
gF(a){return A.aT(t.S)},
$iC:1,
$ih:1}
J.e7.prototype={
gF(a){return A.aT(t.i)},
$iC:1}
J.bg.prototype={
a3(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
cn(a,b,c){return a.substring(b,A.mv(b,c,a.length))},
cm(a,b){return this.cn(a,b,null)},
e_(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.i(p,0)
if(p.charCodeAt(0)===133){s=J.m4(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.i(p,r)
q=p.charCodeAt(r)===133?J.m5(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
I(a,b){var s
A.aK(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
i(a){return a},
gJ(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gF(a){return A.aT(t.N)},
gn(a){return a.length},
$iC:1,
$iac:1,
$ikB:1,
$iv:1}
A.cd.prototype={
gt(a){return new A.cs(J.a1(this.gaC()),A.u(this).h("cs<1,2>"))},
gn(a){return J.bs(this.gaC())},
R(a,b){return A.u(this).y[1].a(J.js(this.gaC(),b))},
i(a){return J.bS(this.gaC())}}
A.cs.prototype={
k(){return this.a.k()},
gm(){return this.$ti.y[1].a(this.a.gm())},
$iN:1}
A.dd.prototype={
q(a,b){return this.$ti.y[1].a(J.jr(this.a,b))},
$ix:1}
A.ct.prototype={
gaC(){return this.a}}
A.cJ.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.hS.prototype={}
A.ay.prototype={}
A.O.prototype={
gt(a){var s=this
return new A.ae(s,s.gn(s),A.u(s).h("ae<O.E>"))},
ah(a){var s,r=this,q=A.jA(A.u(r).h("O.E"))
for(s=0;s<r.gn(r);++s)q.j(0,r.R(0,s))
return q}}
A.d7.prototype={
gcP(){var s=J.bs(this.a),r=this.c
if(r==null||r>s)return s
return r},
gd2(){var s=J.bs(this.a),r=this.b
if(r>s)return s
return r},
gn(a){var s,r=J.bs(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
R(a,b){var s=this,r=s.gd2()+b
if(b<0||r>=s.gcP())throw A.b(A.h2(b,s.gn(0),s,"index"))
return J.js(s.a,r)},
ca(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.j5(n),l=m.gn(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.kp(0,n):J.ko(0,n)}r=A.h6(s,m.R(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.a.D(r,q,m.R(n,o+q))
if(m.gn(n)<l)throw A.b(A.ax(p))}return r},
dY(a){return this.ca(0,!0)}}
A.ae.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.j5(q),o=p.gn(q)
if(r.b!==o)throw A.b(A.ax(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.R(q,s);++r.c
return!0},
$iN:1}
A.cN.prototype={
gt(a){var s=this.a
return new A.cO(s.gt(s),this.b,A.u(this).h("cO<1,2>"))},
gn(a){var s=this.a
return s.gn(s)},
R(a,b){var s=this.a
return this.b.$1(s.R(s,b))}}
A.cO.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gm())
return!0}s.a=null
return!1},
gm(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iN:1}
A.af.prototype={
gn(a){return J.bs(this.a)},
R(a,b){return this.b.$1(J.js(this.a,b))}}
A.a0.prototype={
gt(a){return new A.F(J.a1(this.a),this.b,this.$ti.h("F<1>"))}}
A.F.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gm()))return!0
return!1},
gm(){return this.a.gm()},
$iN:1}
A.ad.prototype={}
A.d3.prototype={
gn(a){return J.bs(this.a)},
R(a,b){var s=this.a,r=J.j5(s)
return r.R(s,r.gn(s)-1-b)}}
A.dC.prototype={}
A.ag.prototype={$r:"+(1,2)",$s:1}
A.dm.prototype={$r:"+influence,light(1,2)",$s:2}
A.dn.prototype={$r:"+influence,source(1,2)",$s:3}
A.cx.prototype={}
A.cw.prototype={
i(a){return A.h9(this)},
gan(){return new A.aS(this.dn(),A.u(this).h("aS<a6<1,2>>"))},
dn(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gan(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga8(),o=o.gt(o),n=A.u(s),m=n.y[1],n=n.h("a6<1,2>")
case 2:if(!o.k()){r=3
break}l=o.gm()
k=s.q(0,l)
r=4
return a.b=new A.a6(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ian:1}
A.M.prototype={
gn(a){return this.b.length},
gbD(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
am(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
q(a,b){if(!this.am(b))return null
return this.b[this.a[b]]},
ao(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbD()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga8(){return new A.bF(this.gbD(),this.$ti.h("bF<1>"))},
gcc(){return new A.bF(this.b,this.$ti.h("bF<2>"))}}
A.bF.prototype={
gn(a){return this.a.length},
gt(a){var s=this.a
return new A.bG(s,s.length,this.$ti.h("bG<1>"))}}
A.bG.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iN:1}
A.cy.prototype={
j(a,b){A.u(this).c.a(b)
A.lR()}}
A.aN.prototype={
gn(a){return this.b},
gc1(a){return this.b!==0},
gt(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.bG(s,s.length,r.$ti.h("bG<1>"))},
p(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
ah(a){return A.jB(this,this.$ti.c)}}
A.d4.prototype={}
A.hY.prototype={
a_(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.cV.prototype={
i(a){return"Null check operator used on a null value"}}
A.e8.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.eL.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hk.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.cB.prototype={}
A.dr.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibm:1}
A.bd.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.lv(r==null?"unknown":r)+"'"},
gF(a){var s=A.k1(this)
return A.aT(s==null?A.bP(this):s)},
$ibu:1,
ge2(){return this},
$C:"$1",
$R:1,
$D:null}
A.dO.prototype={$C:"$0",$R:0}
A.dP.prototype={$C:"$2",$R:2}
A.eH.prototype={}
A.eE.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.lv(s)+"'"}}
A.bU.prototype={
V(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bU))return!1
return this.$_target===b.$_target&&this.a===b.a},
gJ(a){return(A.jh(this.a)^A.eo(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.ep(this.a)+"'")}}
A.eu.prototype={
i(a){return"RuntimeError: "+this.a}}
A.aX.prototype={
gn(a){return this.a},
ga8(){return new A.aZ(this,A.u(this).h("aZ<1>"))},
am(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dv(a)},
dv(a){var s=this.d
if(s==null)return!1
return this.aF(this.bA(s,a),a)>=0},
q(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dw(b)},
dw(a){var s,r,q=this.d
if(q==null)return null
s=this.bA(q,a)
r=this.aF(s,a)
if(r<0)return null
return s[r].b},
D(a,b,c){var s,r,q=this,p=A.u(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bp(s==null?q.b=q.aU():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bp(r==null?q.c=q.aU():r,b,c)}else q.dA(b,c)},
dA(a,b){var s,r,q,p,o=this,n=A.u(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.aU()
r=o.b9(a)
q=s[r]
if(q==null)s[r]=[o.aV(a,b)]
else{p=o.aF(q,a)
if(p>=0)q[p].b=b
else q.push(o.aV(a,b))}},
be(a,b){var s,r,q=this,p=A.u(q)
p.c.a(a)
p.h("2()").a(b)
if(q.am(a)){s=q.q(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.D(0,a,r)
return r},
ag(a,b){if((b&0x3fffffff)===b)return this.cr(this.c,b)
else return this.dz(b)},
dz(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.b9(a)
r=n[s]
q=o.aF(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.bn(p)
if(r.length===0)delete n[s]
return p.b},
Y(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aT()}},
ao(a,b){var s,r,q=this
A.u(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.ax(q))
s=s.c}},
bp(a,b,c){var s,r=A.u(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.aV(b,c)
else s.b=c},
cr(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.bn(s)
delete a[b]
return s.b},
aT(){this.r=this.r+1&1073741823},
aV(a,b){var s=this,r=A.u(s),q=new A.h4(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.aT()
return q},
bn(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.aT()},
b9(a){return J.K(a)&1073741823},
bA(a,b){return a[this.b9(b)]},
aF(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aV(a[r].a,b))return r
return-1},
i(a){return A.h9(this)},
aU(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ikt:1}
A.h4.prototype={}
A.aZ.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return new A.cL(s,s.r,s.e,this.$ti.h("cL<1>"))}}
A.cL.prototype={
gm(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.ax(q))
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
if(r.b!==q.r)throw A.b(A.ax(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iN:1}
A.aY.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return new A.cK(s,s.r,s.e,this.$ti.h("cK<1,2>"))}}
A.cK.prototype={
gm(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.ax(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.a6(s.a,s.b,r.$ti.h("a6<1,2>"))
r.c=s.c
return!0}},
$iN:1}
A.j7.prototype={
$1(a){return this.a(a)},
$S:22}
A.j8.prototype={
$2(a,b){return this.a(a,b)},
$S:17}
A.j9.prototype={
$1(a){return this.a(A.aK(a))},
$S:16}
A.bb.prototype={
gF(a){return A.aT(this.bC())},
bC(){return A.ob(this.$r,this.bB())},
i(a){return this.bR(!1)},
bR(a){var s,r,q,p,o,n=this.cQ(),m=this.bB(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.i(m,q)
o=m[q]
l=a?l+A.kD(o):l+A.o(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cQ(){var s,r=this.$s
while($.ir.length<=r)B.a.j($.ir,null)
s=$.ir[r]
if(s==null){s=this.cH()
B.a.D($.ir,r,s)}return s},
cH(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.jx(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.D(j,q,r[s])}}return A.h8(j,k)}}
A.bn.prototype={
bB(){return[this.a,this.b]},
V(a,b){if(b==null)return!1
return b instanceof A.bn&&this.$s===b.$s&&J.aV(this.a,b.a)&&J.aV(this.b,b.b)},
gJ(a){return A.c3(this.$s,this.a,this.b,B.h,B.h,B.h)}}
A.c2.prototype={
gF(a){return B.di},
$iC:1}
A.cT.prototype={
cU(a,b,c,d){var s=A.aP(b,0,c,d,null)
throw A.b(s)},
br(a,b,c,d){if(b>>>0!==b||b>c)this.cU(a,b,c,d)}}
A.ec.prototype={
gF(a){return B.dj},
$iC:1}
A.a3.prototype={
gn(a){return a.length},
$ial:1}
A.cR.prototype={
q(a,b){A.bK(b,a,a.length)
return a[b]},
bl(a,b,c,d){var s,r,q,p
t.bM.a(d)
a.$flags&2&&A.br(a,5)
s=a.length
this.br(a,b,s,"start")
this.br(a,c,s,"end")
if(b>c)A.l(A.aP(b,0,c,null,null))
r=c-b
q=d.length
if(q<r)A.l(A.m("Not enough elements"))
p=q!==r?d.subarray(0,r):d
a.set(p,b)
return},
$ik:1,
$ix:1}
A.cS.prototype={$ik:1,$ix:1}
A.cQ.prototype={
gF(a){return B.dk},
$iC:1,
$ifM:1}
A.ed.prototype={
gF(a){return B.dl},
$iC:1,
$ifN:1}
A.ee.prototype={
gF(a){return B.dm},
q(a,b){A.bK(b,a,a.length)
return a[b]},
$iC:1}
A.ef.prototype={
gF(a){return B.dn},
q(a,b){A.bK(b,a,a.length)
return a[b]},
$iC:1}
A.eg.prototype={
gF(a){return B.dp},
q(a,b){A.bK(b,a,a.length)
return a[b]},
$iC:1}
A.eh.prototype={
gF(a){return B.ds},
q(a,b){A.bK(b,a,a.length)
return a[b]},
$iC:1}
A.ei.prototype={
gF(a){return B.dt},
q(a,b){A.bK(b,a,a.length)
return a[b]},
$iC:1}
A.cU.prototype={
gF(a){return B.du},
gn(a){return a.length},
q(a,b){A.bK(b,a,a.length)
return a[b]},
$iC:1}
A.ej.prototype={
gF(a){return B.dv},
gn(a){return a.length},
q(a,b){A.bK(b,a,a.length)
return a[b]},
$iC:1,
$ieJ:1}
A.di.prototype={}
A.dj.prototype={}
A.dk.prototype={}
A.dl.prototype={}
A.aG.prototype={
h(a){return A.dw(v.typeUniverse,this,a)},
K(a){return A.l4(v.typeUniverse,this,a)}}
A.f3.prototype={}
A.ix.prototype={
i(a){return A.au(this.a,null)}}
A.f1.prototype={
i(a){return this.a}}
A.ds.prototype={$ib6:1}
A.i7.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:10}
A.i6.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:18}
A.i8.prototype={
$0(){this.a.$0()},
$S:11}
A.i9.prototype={
$0(){this.a.$0()},
$S:11}
A.iv.prototype={
cq(a,b){if(self.setTimeout!=null)self.setTimeout(A.ck(new A.iw(this,b),0),a)
else throw A.b(A.cc("`setTimeout()` not found."))}}
A.iw.prototype={
$0(){this.b.$0()},
$S:0}
A.eS.prototype={
aW(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.aK(a)
else{s=r.a
if(q.h("bv<1>").b(a))s.bq(a)
else s.bv(a)}},
aX(a,b){var s=this.a
if(this.b)s.aO(new A.aw(a,b))
else s.aL(new A.aw(a,b))}}
A.iC.prototype={
$1(a){return this.a.$2(0,a)},
$S:6}
A.iD.prototype={
$2(a,b){this.a.$2(1,new A.cB(a,t.l.a(b)))},
$S:23}
A.iY.prototype={
$2(a,b){this.a(A.a(a),b)},
$S:30}
A.aJ.prototype={
gm(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cZ(a,b){var s,r,q
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
o.d=null}q=o.cZ(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.kZ
return!1}if(0>=p.length)return A.i(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.kZ
throw n
return!1}if(0>=p.length)return A.i(p,-1)
o.a=p.pop()
m=1
continue}throw A.b(A.m("sync*"))}return!1},
e4(a){var s,r,q=this
if(a instanceof A.aS){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.j(r,q.a)
q.a=s
return 2}else{q.d=J.a1(a)
return 2}},
$iN:1}
A.aS.prototype={
gt(a){return new A.aJ(this.a(),this.$ti.h("aJ<1>"))}}
A.aw.prototype={
i(a){return A.o(this.a)},
$iI:1,
gav(){return this.b}}
A.eX.prototype={
aX(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.m("Future already completed"))
s.aL(A.nA(a,b))},
bX(a){return this.aX(a,null)}}
A.dc.prototype={
aW(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.b(A.m("Future already completed"))
s.aK(r.h("1/").a(a))}}
A.bE.prototype={
dE(a){if((this.c&15)!==6)return!0
return this.b.b.bh(t.al.a(this.d),a.a,t.y,t.K)},
dr(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.d.b(q))p=l.dU(q,m,a.b,o,n,t.l)
else p=l.bh(t.x.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.bR(s))){if((r.c&1)!==0)throw A.b(A.j("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.j("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.T.prototype={
c9(a,b,c){var s,r,q=this.$ti
q.K(c).h("1/(2)").a(a)
s=$.J
if(s===B.p){if(!t.d.b(b)&&!t.x.b(b))throw A.b(A.aD(b,"onError",u.c))}else{c.h("@<0/>").K(q.c).h("1(2)").a(a)
b=A.nQ(b,s)}r=new A.T(s,c.h("T<0>"))
this.aJ(new A.bE(r,3,a,b,q.h("@<1>").K(c).h("bE<1,2>")))
return r},
bO(a,b,c){var s,r=this.$ti
r.K(c).h("1/(2)").a(a)
s=new A.T($.J,c.h("T<0>"))
this.aJ(new A.bE(s,19,a,b,r.h("@<1>").K(c).h("bE<1,2>")))
return s},
d_(a){this.a=this.a&1|16
this.c=a},
aw(a){this.a=a.a&30|this.a&1
this.c=a.c},
aJ(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aJ(a)
return}r.aw(s)}A.ft(null,null,r.b,t.M.a(new A.id(r,a)))}},
bF(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bF(a)
return}m.aw(n)}l.a=m.aB(a)
A.ft(null,null,m.b,t.M.a(new A.ii(l,m)))}},
aA(){var s=t.F.a(this.c)
this.c=null
return this.aB(s)},
aB(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bv(a){var s,r=this
r.$ti.c.a(a)
s=r.aA()
r.a=8
r.c=a
A.ce(r,s)},
cG(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aA()
q.aw(a)
A.ce(q,r)},
aO(a){var s=this.aA()
this.d_(a)
A.ce(this,s)},
aK(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bv<1>").b(a)){this.bq(a)
return}this.cu(a)},
cu(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.ft(null,null,s.b,t.M.a(new A.ig(s,a)))},
bq(a){A.jI(this.$ti.h("bv<1>").a(a),this,!1)
return},
aL(a){this.a^=2
A.ft(null,null,this.b,t.M.a(new A.ie(this,a)))},
$ibv:1}
A.id.prototype={
$0(){A.ce(this.a,this.b)},
$S:0}
A.ii.prototype={
$0(){A.ce(this.b,this.a.a)},
$S:0}
A.ih.prototype={
$0(){A.jI(this.a.a,this.b,!0)},
$S:0}
A.ig.prototype={
$0(){this.a.bv(this.b)},
$S:0}
A.ie.prototype={
$0(){this.a.aO(this.b)},
$S:0}
A.il.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dT(t.fO.a(q.d),t.A)}catch(p){s=A.bR(p)
r=A.cn(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.ju(q)
n=k.a
n.c=new A.aw(q,o)
q=n}q.b=!0
return}if(j instanceof A.T&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.T){m=k.b.a
l=new A.T(m.b,m.$ti)
j.c9(new A.im(l,m),new A.io(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.im.prototype={
$1(a){this.a.cG(this.b)},
$S:10}
A.io.prototype={
$2(a,b){A.dD(a)
t.l.a(b)
this.a.aO(new A.aw(a,b))},
$S:31}
A.ik.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bh(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.bR(l)
r=A.cn(l)
q=s
p=r
if(p==null)p=A.ju(q)
o=this.a
o.c=new A.aw(q,p)
o.b=!0}},
$S:0}
A.ij.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.dE(s)&&p.a.e!=null){p.c=p.a.dr(s)
p.b=!1}}catch(o){r=A.bR(o)
q=A.cn(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.ju(p)
m=l.b
m.c=new A.aw(p,n)
p=m}p.b=!0}},
$S:0}
A.eT.prototype={}
A.fi.prototype={}
A.dB.prototype={$ikT:1}
A.fc.prototype={
dV(a){var s,r,q
t.M.a(a)
try{if(B.p===$.J){a.$0()
return}A.lh(null,null,this,a,t.H)}catch(q){s=A.bR(q)
r=A.cn(q)
A.jY(A.dD(s),t.l.a(r))}},
dd(a){return new A.is(this,t.M.a(a))},
dT(a,b){b.h("0()").a(a)
if($.J===B.p)return a.$0()
return A.lh(null,null,this,a,b)},
bh(a,b,c,d){c.h("@<0>").K(d).h("1(2)").a(a)
d.a(b)
if($.J===B.p)return a.$1(b)
return A.nS(null,null,this,a,b,c,d)},
dU(a,b,c,d,e,f){d.h("@<0>").K(e).K(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.J===B.p)return a.$2(b,c)
return A.nR(null,null,this,a,b,c,d,e,f)},
c6(a,b,c,d){return b.h("@<0>").K(c).K(d).h("1(2,3)").a(a)}}
A.is.prototype={
$0(){return this.a.dV(this.b)},
$S:0}
A.iX.prototype={
$0(){A.lW(this.a,this.b)},
$S:0}
A.de.prototype={
gn(a){return this.a},
ga8(){return new A.df(this,this.$ti.h("df<1>"))},
am(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.cJ(a)},
cJ(a){var s=this.d
if(s==null)return!1
return this.a4(this.bu(s,a),a)>=0},
q(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.kV(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.kV(q,b)
return r}else return this.cS(b)},
cS(a){var s,r,q=this.d
if(q==null)return null
s=this.bu(q,a)
r=this.a4(s,a)
return r<0?null:s[r+1]},
D(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.bt(s==null?m.b=A.jJ():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.bt(r==null?m.c=A.jJ():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.jJ()
p=A.jh(b)&1073741823
o=q[p]
if(o==null){A.jK(q,p,[b,c]);++m.a
m.e=null}else{n=m.a4(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
ao(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.bw()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.q(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.ax(m))}},
bw(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.h6(i.a,null,!1,t.A)
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
bt(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.jK(a,b,c)},
bu(a,b){return a[A.jh(b)&1073741823]}}
A.dh.prototype={
a4(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.df.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return new A.dg(s,s.bw(),this.$ti.h("dg<1>"))}}
A.dg.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.ax(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iN:1}
A.aI.prototype={
cV(){return new A.aI(A.u(this).h("aI<1>"))},
gt(a){var s=this,r=new A.bH(s,s.r,A.u(s).h("bH<1>"))
r.c=s.e
return r},
gn(a){return this.a},
p(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cI(b)},
cI(a){var s=this.d
if(s==null)return!1
return this.a4(s[this.aP(a)],a)>=0},
j(a,b){var s,r,q=this
A.u(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bs(s==null?q.b=A.jM():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bs(r==null?q.c=A.jM():r,b)}else return q.cs(b)},
cs(a){var s,r,q,p=this
A.u(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jM()
r=p.aP(a)
q=s[r]
if(q==null)s[r]=[p.aN(a)]
else{if(p.a4(q,a)>=0)return!1
q.push(p.aN(a))}return!0},
ag(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bG(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bG(s.c,b)
else return s.cX(b)},
cX(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.aP(a)
r=n[s]
q=o.a4(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bS(p)
return!0},
Y(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aM()}},
bs(a,b){A.u(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aN(b)
return!0},
bG(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bS(s)
delete a[b]
return!0},
aM(){this.r=this.r+1&1073741823},
aN(a){var s,r=this,q=new A.f6(A.u(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aM()
return q},
bS(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aM()},
aP(a){return J.K(a)&1073741823},
a4(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aV(a[r].a,b))return r
return-1},
$ikv:1}
A.f6.prototype={}
A.bH.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.ax(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iN:1}
A.h5.prototype={
$2(a,b){this.a.D(0,this.b.a(a),this.c.a(b))},
$S:36}
A.D.prototype={
gt(a){return new A.ae(a,this.gn(a),A.bP(a).h("ae<D.E>"))},
R(a,b){return this.q(a,b)},
aE(a,b){var s,r
A.bP(a).h("z(D.E)").a(b)
s=this.gn(a)
for(r=0;r<s;++r){if(!b.$1(this.q(a,r)))return!1
if(s!==this.gn(a))throw A.b(A.ax(a))}return!0},
i(a){return A.jw(a,"[","]")}}
A.bx.prototype={
ao(a,b){var s,r,q,p=A.u(this)
p.h("~(1,2)").a(b)
for(s=this.ga8(),s=s.gt(s),p=p.y[1];s.k();){r=s.gm()
q=this.q(0,r)
b.$2(r,q==null?p.a(q):q)}},
gn(a){var s=this.ga8()
return s.gn(s)},
i(a){return A.h9(this)},
$ian:1}
A.ha.prototype={
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
A.c1.prototype={
q(a,b){return this.a.q(0,b)},
gn(a){return this.a.a},
ga8(){var s=this.a
return new A.aZ(s,A.u(s).h("aZ<1>"))},
i(a){return A.h9(this.a)},
gcc(){var s=this.a
return new A.b0(s,A.u(s).h("b0<2>"))},
gan(){var s=this.a
return new A.aY(s,A.u(s).h("aY<1,2>"))},
$ian:1}
A.d8.prototype={}
A.b5.prototype={
gc1(a){return this.gn(this)!==0},
C(a,b){var s
for(s=J.a1(A.u(this).h("k<1>").a(b));s.k();)this.j(0,s.gm())},
bY(a){var s,r,q=this.ah(0)
for(s=this.gt(this);s.k();){r=s.gm()
if(a.p(0,r))q.ag(0,r)}return q},
i(a){return A.jw(this,"{","}")},
dC(a,b){var s,r,q=this.gt(this)
if(!q.k())return""
s=J.bS(q.gm())
if(!q.k())return s
if(b.length===0){r=s
do r+=A.o(q.gm())
while(q.k())}else{r=s
do r=r+b+A.o(q.gm())
while(q.k())}return r.charCodeAt(0)==0?r:r},
d8(a,b){var s
A.u(this).h("z(1)").a(b)
for(s=this.gt(this);s.k();)if(b.$1(s.gm()))return!0
return!1},
R(a,b){var s,r
A.hE(b,"index")
s=this.gt(this)
for(r=b;s.k();){if(r===0)return s.gm();--r}throw A.b(A.h2(b,b-r,this,"index"))},
$ik:1,
$ibl:1}
A.dp.prototype={
ah(a){var s=this.cV()
s.C(0,this)
return s}}
A.fl.prototype={
j(a,b){this.$ti.c.a(b)
return A.nh()}}
A.d9.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return A.jL(s,s.r,A.u(s).c)},
ah(a){return this.a.ah(0)}}
A.cg.prototype={}
A.dy.prototype={}
A.bt.prototype={
V(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bt)if(this.a===b.a)s=this.b===b.b
return s},
gJ(a){return A.c3(this.a,this.b,B.h,B.h,B.h,B.h)},
I(a,b){var s
t.df.a(b)
s=B.i.I(this.a,b.a)
if(s!==0)return s
return B.i.I(this.b,b.b)},
i(a){var s=this,r=A.lS(A.mp(s)),q=A.dR(A.mn(s)),p=A.dR(A.mj(s)),o=A.dR(A.mk(s)),n=A.dR(A.mm(s)),m=A.dR(A.mo(s)),l=A.km(A.ml(s)),k=s.b,j=k===0?"":A.km(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iac:1}
A.ia.prototype={
i(a){return this.u()}}
A.I.prototype={
gav(){return A.mi(this)}}
A.dJ.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.fH(s)
return"Assertion failed"}}
A.b6.prototype={}
A.aM.prototype={
gaS(){return"Invalid argument"+(!this.a?"(s)":"")},
gaR(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.o(p),n=s.gaS()+q+o
if(!s.a)return n
return n+s.gaR()+": "+A.fH(s.gba())},
gba(){return this.b}}
A.cZ.prototype={
gba(){return A.l7(this.b)},
gaS(){return"RangeError"},
gaR(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.o(q):""
else if(q==null)s=": Not greater than or equal to "+A.o(r)
else if(q>r)s=": Not in inclusive range "+A.o(r)+".."+A.o(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.o(r)
return s}}
A.e3.prototype={
gba(){return A.a(this.b)},
gaS(){return"RangeError"},
gaR(){if(A.a(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gn(a){return this.f}}
A.da.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.eK.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.ca.prototype={
i(a){return"Bad state: "+this.a}}
A.dQ.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.fH(s)+"."}}
A.d6.prototype={
i(a){return"Stack Overflow"},
gav(){return null},
$iI:1}
A.ib.prototype={
i(a){return"Exception: "+this.a}}
A.fO.prototype={
i(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.k.prototype={
b7(a,b,c,d){var s,r
d.a(b)
A.u(this).K(d).h("1(1,k.E)").a(c)
for(s=this.gt(this),r=b;s.k();)r=c.$2(r,s.gm())
return r},
gn(a){var s,r=this.gt(this)
for(s=0;r.k();)++s
return s},
gai(a){var s,r=this.gt(this)
if(!r.k())throw A.b(A.jv())
s=r.gm()
if(r.k())throw A.b(A.kn())
return s},
dq(a,b){var s,r
A.u(this).h("z(k.E)").a(b)
for(s=this.gt(this);s.k();){r=s.gm()
if(b.$1(r))return r}throw A.b(A.jv())},
R(a,b){var s,r
A.hE(b,"index")
s=this.gt(this)
for(r=b;s.k();){if(r===0)return s.gm();--r}throw A.b(A.h2(b,b-r,this,"index"))},
i(a){return A.m2(this,"(",")")}}
A.a6.prototype={
i(a){return"MapEntry("+A.o(this.a)+": "+A.o(this.b)+")"}}
A.Y.prototype={
gJ(a){return A.w.prototype.gJ.call(this,0)},
i(a){return"null"}}
A.w.prototype={$iw:1,
V(a,b){return this===b},
gJ(a){return A.eo(this)},
i(a){return"Instance of '"+A.ep(this)+"'"},
gF(a){return A.k3(this)},
toString(){return this.i(this)}}
A.fj.prototype={
i(a){return""},
$ibm:1}
A.eF.prototype={
gn(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.hj.prototype={
i(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.ji.prototype={
$1(a){return this.a.aW(this.b.h("0/?").a(a))},
$S:6}
A.jj.prototype={
$1(a){if(a==null)return this.a.bX(new A.hj(a===undefined))
return this.a.bX(a)},
$S:6}
A.j1.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.lg(a))return a
s=this.a
a.toString
if(s.am(a))return s.q(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.l(A.aP(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.bM(!0,"isUtc",t.y)
return new A.bt(r,0,!0)}if(a instanceof RegExp)throw A.b(A.j("structured clone of RegExp",null))
if(a instanceof Promise)return A.oq(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.b1(p,p)
s.D(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.cm(n),p=s.gt(n);p.k();)m.push(A.cl(p.gm()))
for(l=0;l<s.gn(n);++l){k=s.q(n,l)
if(!(l<m.length))return A.i(m,l)
j=m[l]
if(k!=null)o.D(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.D(0,a,o)
h=A.a(a.length)
for(s=J.cm(i),l=0;l<h;++l)o.push(this.$1(s.q(i,l)))
return o}return a},
$S:59}
A.hF.prototype={}
A.c6.prototype={
u(){return"QualityProfileKind."+this.b}}
A.ap.prototype={}
A.fA.prototype={}
A.fB.prototype={}
A.cb.prototype={
u(){return"ToneMappingMode."+this.b}}
A.cX.prototype={
A(){var s,r,q,p
for(s=A.ku(["exposure",this.a,"bloomStrength",0,"ssaoStrength",0,"depthOfFieldStrength",0,"vignette",this.e,"grain",this.f,"rainIntensity",0,"surfaceWetness",0,"surfaceSnowCoverage",0,"surfaceDissolution",0,"rainWindowVisibility",1,"ditherStrength",0,"colorGradeStrength",0,"affineWarpStrength",0,"vertexSnapGrid",0,"vhsChromaWeight",0,"vhsTrackingWeight",0,"vhsNoiseWeight",0,"vhsHeadSwitchWeight",0,"vhsDropoutWeight",0,"vhsGhostWeight",0],t.N,t.i),s=new A.aY(s,A.u(s).h("aY<1,2>")).gt(0);s.k();){r=s.d
q=r.a
p=r.b
if(!isFinite(p)||p<0)throw A.b(A.j("PostProcessState."+q+" must be >= 0: "+A.o(p),null))}}}
A.cr.prototype={
gc0(){var s,r=this,q=r.x
if(q===$){s=r.b.c_()
r.x!==$&&A.lt()
r.x=s
q=s}return q},
A(){var s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=i.d
if(!g.gE(0))throw A.b(A.j("CameraView.eye must be finite: "+g.i(0),h))
g=i.e
if(!g.gE(0)||g.ga1()<1e-12)throw A.b(A.j("CameraView.forward must be finite and nonzero: "+g.i(0),h))
g=i.f
if(isFinite(g)){s=i.r
s=!isFinite(s)||g<=0||s<=g}else s=!0
if(s)throw A.b(A.j("CameraView requires 0 < near < far, got "+A.o(g)+"/"+i.r,h))
g=i.w
if(!isFinite(g)||g<=0)throw A.b(A.j("CameraView.aspect must be finite and > 0: "+A.o(g),h))
g=i.a
if(!g.gE(0)||!i.b.gE(0)||!i.c.gE(0))throw A.b(A.j("CameraView matrices must be finite",h))
for(s=i.c.a,r=s.length,g=i.b.v(0,g).a,q=g.length,p=0,o=-1,n=0;n<16;++n){if(!(n<r))return A.i(s,n)
m=s[n]
if(!(n<q))return A.i(g,n)
l=g[n]
k=Math.abs(m-l)/(1+Math.abs(l))
if(k>p){o=n
p=k}}if(p>0.0001){m=B.n.dZ(p,2)
l=B.i.a0(o,4)
j=B.i.aI(o,4)
if(!(o>=0&&o<r))return A.i(s,o)
s=s[o]
if(!(o<q))return A.i(g,o)
throw A.b(A.j("CameraView.viewProjection must equal projection * view. Worst relative mismatch "+m+" at column "+l+" row "+j+" (got "+A.o(s)+", expected "+A.o(g[o])+"). Prefer CameraView.look/lookAt/fromMatrices, which derive it.",h))}}}
A.eB.prototype={}
A.dY.prototype={
A(){var s,r,q,p,o,n,m,l,k,j=this,i=null
if(!j.a.gE(0)||!j.b.gE(0)||!j.fx.gE(0)||!j.r.gE(0)||!j.dx.gE(0))throw A.b(A.j("FrameEnvironment colors must be finite",i))
if(j.k4!=null){s=!0
if(B.t.e_("showcase_sky").length!==0)if(B.aA.gE(0))if(B.bV.gE(0))if(B.aB.gE(0))if(isFinite(0.12))if(isFinite(0.005))if(isFinite(0))if(isFinite(1))if(isFinite(0.32))if(isFinite(0.4))if(isFinite(650))if(isFinite(350))if(isFinite(0.0012))if(Math.abs(0)<=1000)if(isFinite(0.55))s=!isFinite(0.25)
if(s)A.l(A.j("SkyboxDeclaration contains invalid values",i))}s=j.c
if(isFinite(s)){r=j.d
r=!isFinite(r)||r<s}else r=!0
if(r)throw A.b(A.j("FrameEnvironment requires fogEnd >= fogStart, got "+s+"/"+j.d,i))
s=j.fy
if(!isFinite(s))throw A.b(A.j("FrameEnvironment.ambientIntensity must be >= 0: "+s,i))
if(j.go!=null){if(!B.D.gE(0)||B.D.ga1()<1e-12)A.l(A.j("DirectionalLight.direction must be finite and nonzero: "+B.D.i(0),i))
if(!isFinite(2.4))A.l(A.j("DirectionalLight.intensity must be >= 0: 2.4",i))}for(s=j.id,r=s.length,q=0;q<r;++q){p=s[q]
o=p.b
if(!(isFinite(o.a)&&isFinite(o.b)&&isFinite(o.c)))A.l(A.j("PointLight.position must be finite: "+o.i(0),i))
o=p.d
if(!isFinite(o)||o<0)A.l(A.j("PointLight.intensity must be >= 0: "+A.o(o),i))
o=p.e
if(!isFinite(o)||o<=0)A.l(A.j("PointLight.radius must be > 0: "+o,i))}for(s=isFinite(0),r=isFinite(1),o=isFinite(-1),q=0;!1;++q){if(s)n=r
else n=!1
if(!n)A.l(A.j("SpotLight.position must be finite: "+B.j.i(0),i))
if(s)n=o
else n=!1
if(!n)A.l(A.j("SpotLight.direction must be finite and nonzero: "+B.o.i(0),i))}s=t.N
m=A.am(s)
for(r=j.k2,q=0;!1;++q){l=r[q]
l.A()
if(!m.j(0,l.gB()))throw A.b(A.j("FrameEnvironment.volumetricSources contains duplicate id: "+A.o(l.gB()),i))}r=j.w
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
k=A.am(s)
for(s=j.k3,q=0;!1;++q){l=s[q]
l.A()
if(!k.j(0,l.gB()))throw A.b(A.j("FrameEnvironment.thermalSources contains duplicate id: "+A.o(l.gB()),i))}},
aY(a,b,c,d,e,f,g,h,i){var s,r,q,p,o,n,m,l,k,j=this
t.c3.a(e)
s=c==null?j.a:c
r=f==null?j.dx:f
q=h==null?j.dy:h
p=g==null?j.fr:g
o=a==null?j.fx:a
n=b==null?j.fy:b
m=d===B.z?j.go:t.eB.a(d)
l=e==null?j.id:e
k=i===B.z?j.k4:t.bG.a(i)
return new A.dY(s,j.b,j.c,j.d,j.e,j.f,j.r,j.w,j.x,j.y,j.z,j.Q,j.as,j.at,j.ax,j.ay,j.ch,j.CW,j.cx,j.cy,j.db,r,q,p,o,n,m,l,j.k1,j.k2,j.k3,k)},
dh(a){var s=null
return this.aY(s,s,s,B.z,s,s,s,s,a)},
di(a,b,c,d,e,f,g){return this.aY(a,b,c,d,null,e,f,g,B.z)},
dg(a){var s=null
return this.aY(s,s,s,B.z,a,s,s,s,B.z)}}
A.fQ.prototype={}
A.fR.prototype={
bb(a){++this.b}}
A.b4.prototype={
V(a,b){if(b==null)return!1
return J.dI(b)===A.k3(this)&&b instanceof A.b4&&this.a===b.a&&this.b===b.b},
gJ(a){return A.c3(A.k3(this),this.a,this.b,B.h,B.h,B.h)}}
A.ao.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MeshHandle(#"+this.a+"."+this.b+s+")"}}
A.ar.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"TextureHandle(#"+this.a+"."+this.b+s+")"}}
A.aO.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MaterialHandle(#"+this.a+"."+this.b+s+")"}}
A.el.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"PipelineHandle(#"+this.a+"."+this.b+s+")"}}
A.bf.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.c_.prototype={
u(){return"HandleRejection."+this.b}}
A.h1.prototype={
i(a){return"HandleException("+this.a.b+", "+this.b.i(0)+")"}}
A.c5.prototype={
i(a){var s=this.b,r=this.a.a
return s==null?r.b+": ok":r.b+": "+A.o(s)}}
A.dM.prototype={}
A.j2.prototype={
$1(a){return t.W.a(a)===this.a},
$S:62}
A.S.prototype={
gE(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
V(a,b){if(b==null)return!1
return b instanceof A.S&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gJ(a){return A.c3(this.a,this.b,this.c,B.h,B.h,B.h)},
i(a){return"LinearColor("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.dU.prototype={}
A.bk.prototype={}
A.aj.prototype={}
A.jk.prototype={
$2(a,b){var s,r=t.fk
r.a(a)
s=B.n.I(r.a(b).a,a.a)
return s===0?0:s},
$S:15}
A.fw.prototype={
u(){return"AlphaMode."+this.b}}
A.ea.prototype={
u(){return"MaterialMapColorSpace."+this.b}}
A.by.prototype={
A(){var s,r,q,p,o,n=this,m=null
if(n.a.length===0)throw A.b(A.j("MaterialDefinition.key must not be empty",m))
if(!isFinite(0))throw A.b(A.j("MaterialDefinition.emissiveStrength must be >= 0: 0",m))
if(!isFinite(1))throw A.b(A.j("MaterialDefinition.normalStrength must be >= 0: 1",m))
A.e9("roughness",n.at)
A.e9("metallic",n.ax)
A.e9("occlusionStrength",1)
A.e9("clearcoatStrength",n.ch)
A.e9("clearcoatRoughness",n.CW)
for(s=[new A.ag("uvScaleU",1),new A.ag("uvScaleV",1),new A.ag("uvOffsetU",0),new A.ag("uvOffsetV",0),new A.ag("tintR",n.d),new A.ag("tintG",n.e),new A.ag("tintB",n.f)],r=0;r<7;++r){q=s[r]
p=q.a
o=q.b
if(!isFinite(o))throw A.b(A.j("MaterialDefinition."+p+" must be finite: "+A.o(o),m))}if(!isFinite(0.5))throw A.b(A.j("MaterialDefinition.alphaCutoff must be in (0, 1]: 0.5",m))}}
A.b9.prototype={
u(){return"VertexAttributeKind."+this.b}}
A.a8.prototype={}
A.i_.prototype={
A(){var s,r,q,p,o='VertexLayoutDescriptor "surfaceV2": attribute '
for(s=0;s<7;++s){r=B.A[s]
q=r.c
if(q<=0)throw A.b(A.j(o+r.a.i(0)+" must have a positive floatCount",null))
p=r.b
q=p+q
if(q>18)throw A.b(A.j(o+r.a.i(0)+" range ["+p+", "+q+") exceeds stride 18",null))}q=t.fg.a(new A.i0())
for(p=B.a.gt(B.A),q=new A.F(p,q,t.an);q.k();)if(p.gm().c!==4)throw A.b(A.j('VertexLayoutDescriptor "surfaceV2": tangent4 must contain 4 floats',null))}}
A.i0.prototype={
$1(a){return t.G.a(a).a===B.al},
$S:7}
A.bj.prototype={
A(){var s,r,q,p,o,n=this
n.a.A()
s=n.b.length
if(B.i.aI(s,18)!==0)throw A.b(A.j("MeshData.vertices length "+s+" is not a multiple of stride 18",null))
n.d7()
r=s/18|0
for(s=A.mb(n.c),q=s.length,p=0;p<q;++p){o=s[p]
if(o>=r)throw A.b(A.j("MeshData index "+o+" out of range for "+r+" vertices",null))}s=n.d
q=s.a
if(q.gE(0)&&s.b.gE(0)){s=s.b
s=q.a<=s.a&&q.b<=s.b&&q.c<=s.c}else s=!1
if(!s)throw A.b(A.j("MeshData.localBounds must be a valid AABB",null))},
d7(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=null,a2=t.fg,a3=t.fl,a4=new A.a0(B.A,a2.a(new A.hd()),a3)
if(!a4.gt(0).k())return
s=new A.a0(B.A,a2.a(new A.he()),a3)
if(s.gn(0)!==1)throw A.b(A.j("surface-v2 tangent data requires one normal slot",a1))
r=a4.gai(0)
for(a2=this.b,a3=a2.length,q=a3/18|0,p=t.n,o=s.gai(0).b,n=r.b,m=0;m<q;++m){l=m*18
k=l+o
if(!(k<a3))return A.i(a2,k)
j=a2[k]
i=k+1
if(!(i<a3))return A.i(a2,i)
h=a2[i]
k+=2
if(!(k<a3))return A.i(a2,k)
g=a2[k]
k=l+n
if(!(k<a3))return A.i(a2,k)
f=a2[k]
i=k+1
if(!(i<a3))return A.i(a2,i)
e=a2[i]
i=k+2
if(!(i<a3))return A.i(a2,i)
d=a2[i]
k+=3
if(!(k<a3))return A.i(a2,k)
c=a2[k]
b=j*j+h*h+g*g
a=f*f+e*e+d*d
if(!B.a.aE(A.c([j,h,g,f,e,d,c],p),new A.hf()))throw A.b(A.j("surface-v2 tangent basis must be finite",a1))
if(b<1e-8||a<1e-8)throw A.b(A.j("surface-v2 tangent basis must be non-zero",a1))
a0=(j*f+h*e+g*d)/Math.sqrt(b*a)
if(Math.abs(a0)>0.05)throw A.b(A.j("surface-v2 tangent must be orthogonal to its normal: "+A.o(a0),a1))
if(Math.abs(Math.abs(c)-1)>0.05)throw A.b(A.j("surface-v2 tangent handedness must be -1 or +1: "+A.o(c),a1))}}}
A.hd.prototype={
$1(a){return t.G.a(a).a===B.al},
$S:7}
A.he.prototype={
$1(a){return t.G.a(a).a===B.b0},
$S:7}
A.hf.prototype={
$1(a){return isFinite(A.iB(a))},
$S:12}
A.fF.prototype={}
A.hm.prototype={
A(){var s=this.a,r=s.a
if(!r.p(0,"sceneColor")||!r.p(0,"present"))throw A.b(A.j("resource plan must contain sceneColor and present",null))
if(s.d8(0,new A.ho()))throw A.b(A.j("resource plan contains an empty resource ID",null))
if(this.b!==r.p(0,"vhsOutput"))throw A.b(A.j("resource history does not match vhsOutput ownership",null))}}
A.ho.prototype={
$1(a){return A.aK(a).length===0},
$S:8}
A.hB.prototype={}
A.et.prototype={
bZ(a){var s=this
if(s.d)A.l(A.m("resource assembler is disposed"))
if(s.a!=null)throw A.b(A.m("resource assembler is initialized"))
a.A()
s.a=a
s.c=1},
a7(){if(this.d)return
this.d=!0
this.a=null}}
A.cA.prototype={
u(){return"DrawMode."+this.b}}
A.fy.prototype={
u(){return"BlendMode."+this.b}}
A.c8.prototype={}
A.hU.prototype={
i(a){var s=this
return"SurfaceMetrics(css "+s.a+"x"+s.b+", pixels "+s.c+"x"+s.d+", dpr "+A.o(s.e)+", visible: true)"},
A(){var s,r=this
if(r.a<0||r.b<0)throw A.b(A.j("SurfaceMetrics css size must be >= 0",null))
if(r.c<0||r.d<0)throw A.b(A.j("SurfaceMetrics pixel size must be >= 0",null))
s=r.e
if(!isFinite(s)||s<=0)throw A.b(A.j("SurfaceMetrics.devicePixelRatio must be finite and > 0: "+A.o(s),null))}}
A.fz.prototype={
u(){return"ColorEncoding."+this.b}}
A.d0.prototype={
A(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.bY(B.d8)
if(o.a!==0)A.l(A.aD(o,r,"contains unknown pipeline features"))
if(q.a===B.aJ&&p.gc1(p))A.l(A.aD(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.b(A.j("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.b(A.j("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.c7.prototype={
u(){return"RendererState."+this.b}}
A.R.prototype={}
A.fS.prototype={
i(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.b+" tris="+s.c+" culled="+s.d+" gpu="+s.r+"B)"}}
A.eb.prototype={
dM(a){return this.a.b1(a)}}
A.hc.prototype={
$3(a,b,c){return new A.aO(A.a(a),A.a(b),A.bJ(c))},
$S:20}
A.eM.prototype={}
A.hg.prototype={
bT(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.b,d=A.kO(f,new A.e_(e.byteLength,B.ar,B.bt))
if(f.b!==B.d)A.l(A.m(g))
s=A.t(d.a)
r=f.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.aA(f)
A.at(f,p)
if(f.b!==B.d)A.l(A.m(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=A.am(t.S)
for(n=a.a,m=0;m<7;++m){l=B.A[m]
k=A.lk(l.a)
if(!o.j(0,k))continue
j=A.no(n,k,l)
if(f.b!==B.d)A.l(A.m(g))
r.vertexAttribPointer.apply(r,[k,j,A.a(q.WebGL2RenderingContext.FLOAT),!1,72,l.b*4])
if(f.b!==B.d)A.l(A.m(g))
r.enableVertexAttribArray(k)}i=a.c
h=A.kO(f,new A.e_(A.kA(i),B.ar,B.aq))
if(f.b!==B.d)A.l(A.m(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),A.t(h.a))
A.mQ(f,h,t.bW.a(i))
f=i.length
return new A.eM(d,h,p,f,e.length/18|0,!1)},
dG(a){var s=this.c.q(0,a.a)
if(s==null)throw A.b(A.be(B.N,a))
this.b.b1(a)
return s},
bf(){var s,r,q,p
for(s=this.b.ae(),r=s.$ti,s=new A.aJ(s.a(),r.h("aJ<1>")),q=this.c,r=r.c;s.k();){p=s.b
if(p==null)p=r.a(p)
q.D(0,p.a.a,this.bT(p.b))}},
gaq(){return this.b.ae().b7(0,0,new A.hi(),t.S)}}
A.hh.prototype={
$3(a,b,c){return new A.ao(A.a(a),A.a(b),A.bJ(c))},
$S:21}
A.hi.prototype={
$2(a,b){var s,r
A.a(a)
s=t.ai.a(b).b
r=s.b.byteLength
s=A.kA(s.c)
return a+r+s},
$S:14}
A.eI.prototype={
X(a){var s=this.a,r=A.kP(s,B.b7)
A.kQ(s,r,0,a)
return r},
dI(a){var s=this.d
s===$&&A.aU()
return s},
dQ(a){var s=this.e
s===$&&A.aU()
return s},
dS(a){var s=this.f
s===$&&A.aU()
return s},
dK(a){var s=this.r
s===$&&A.aU()
return s},
dO(a){var s=this.w
s===$&&A.aU()
return s},
a7(){var s,r,q,p,o,n=this
for(s=n.c,r=new A.b_(s,s.r,s.e,A.u(s).h("b_<2>")),q=n.a,p=q.a,o=t.R;r.k();)p.deleteTexture(o.a(r.d.a).a)
s.Y(0)
s=n.d
s===$&&A.aU()
A.eQ(q,s)
s=n.e
s===$&&A.aU()
A.eQ(q,s)
s=n.f
s===$&&A.aU()
A.eQ(q,s)
s=n.r
s===$&&A.aU()
A.eQ(q,s)
s=n.w
s===$&&A.aU()
A.eQ(q,s)},
bf(){var s,r,q,p,o,n,m,l,k,j=this
j.d=j.X($.kc())
j.e=j.X($.k9())
j.f=j.X($.ka())
j.r=j.X($.k8())
j.w=j.X($.kb())
for(s=j.b.ae(),r=s.$ti,s=new A.aJ(s.a(),r.h("aJ<1>")),q=j.c,p=j.a,r=r.c;s.k();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
if(m.gc3().aE(0,new A.hX()))continue
l=A.kP(p,m.gl())
for(k=0;B.i.aH(k,m.gc3().length);++k){o=m.gc3()
if(!(k<o.length))return A.i(o,k)
A.kQ(p,l,k,o[k])}if(m.ge9())A.mS(p,l)
q.D(0,n.a,l)}},
gaq(){return this.b.ae().b7(0,0,new A.hW(),t.S)}}
A.hV.prototype={
$3(a,b,c){return new A.ar(A.a(a),A.a(b),A.bJ(c))},
$S:24}
A.hX.prototype={
$1(a){return!1},
$S:25}
A.hW.prototype={
$2(a,b){var s
A.a(a)
s=t.dU.a(b).b.gl()
return B.i.W(a,s.gec().v(0,s.ge6()).v(0,s.ge7()).v(0,4))},
$S:26}
A.jl.prototype={
$2(a,b){var s,r=t.eS
r.a(a)
s=J.ke(r.a(b).a,a.a)
return s},
$S:27}
A.hl.prototype={
gb6(){var s=this,r=Math.cos(s.d),q=Math.sin(s.d),p=Math.sin(s.c),o=Math.cos(s.c),n=s.a,m=s.b
return n.W(0,new A.f(r*p*m,q*m,r*o*m))},
gc7(){return this.a.aj(0,this.gb6()).gS().a6(B.j).gS()},
e1(a){var s,r,q,p=this
if(a<=0)return
if(p.as)p.ax=p.ax+p.at*a
s=B.n.al(1-Math.exp(-10*a),0,1)
r=p.c
p.c=r+(p.ax-r)*s
r=p.d
p.d=r+(p.ay-r)*s
r=p.b
p.b=r+(p.ch-r)*s
r=p.CW
q=p.a
p.a=q.W(0,r.aj(0,q).v(0,s))}}
A.bw.prototype={
gdu(){return this.b.length}}
A.dW.prototype={
df(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h
t.U.a(a)
s=new A.hI(A.c([],t.cU),A.am(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p)r[p].N(s,b)
o=s.de(a,!1)
if(o.b.length!==0)return new A.dX(o,B.c5)
q=o.a
n=A.G(q)
m=new A.af(q,n.h("v(1)").a(new A.fK()),n.h("af<1,v>")).ah(0)
l=A.c([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p){k=r[p]
for(n=k.M(d),j=n.length,i=0;i<n.length;n.length===j||(0,A.A)(n),++i){h=n[i]
if(!m.p(0,h.gl().a))throw A.b(A.m('RenderFeature "'+k.gB()+'" created a pass "'+h.gl().a+'" that it never declared into the graph'))
B.a.j(l,h)}}B.a.aa(l,new A.fL(o))
return new A.dX(o,l)}}
A.fK.prototype={
$1(a){return t.z.a(a).a},
$S:28}
A.fL.prototype={
$2(a,b){var s=t.fA
s.a(a)
s.a(b)
s=this.a.a
return B.i.I(B.a.b8(s,new A.fI(a)),B.a.b8(s,new A.fJ(b)))},
$S:29}
A.fI.prototype={
$1(a){return t.z.a(a).a===this.a.gl().a},
$S:4}
A.fJ.prototype={
$1(a){return t.z.a(a).a===this.a.gl().a},
$S:4}
A.dX.prototype={}
A.bY.prototype={
u(){return"FrameQueueState."+this.b}}
A.dZ.prototype={$imw:1}
A.fP.prototype={
dc(a){if(a.length===0)throw A.b(A.aD(a,"passId",null))
this.b=a
this.a.be(a,A.ln())},
ci(){var s,r,q,p,o=t.A
o=A.b1(o,o)
for(s=this.a,s=new A.aY(s,A.u(s).h("aY<1,2>")).gt(0);s.k();){r=s.d
q=r.a
p=r.b
o.D(0,q,new A.R(p.a,p.b,p.d))}return A.kl(o,t.N,t.o)},
ad(a,b){var s,r=this.b
if(r==null)throw A.b(A.m("draw recorded outside an active render pass"))
if(b<1)throw A.b(A.j("draw count and instance count must be positive",null))
s=this.a.q(0,r);++s.a
s.d+=b
s.b=s.b+B.i.a0(a,3)*b}}
A.cf.prototype={}
A.E.prototype={
gaf(){var s=this.c,r=A.G(s)
return new A.a0(s,r.h("z(1)").a(new A.hp()),r.h("a0<1>"))},
gau(){var s=this.c,r=A.G(s)
return new A.a0(s,r.h("z(1)").a(new A.hq()),r.h("a0<1>"))},
i(a){return"PassDeclaration("+this.a+" @ "+this.b.i(0)+")"}}
A.hp.prototype={
$1(a){var s=t.L.a(a).b
return s===B.c||s===B.u},
$S:9}
A.hq.prototype={
$1(a){return t.L.a(a).b===B.e},
$S:9}
A.aF.prototype={
u(){return"GraphValidationFailureKind."+this.b}}
A.a5.prototype={
i(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.er.prototype={
u(){return"ResourceFormat."+this.b}}
A.aW.prototype={
u(){return"GraphStage."+this.b}}
A.L.prototype={
c4(){var s=this
return new A.L(s.a,s.b,s.c,s.d,s.e,s.f+1)},
V(a,b){var s=this
if(b==null)return!1
return b instanceof A.L&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gJ(a){var s=this
return A.c3(s.a,s.b,s.c,s.d,s.e,s.f)},
i(a){var s=this,r=s.b.i(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.d2.prototype={
u(){return"ResourceAccess."+this.b}}
A.n.prototype={}
A.cv.prototype={}
A.hD.prototype={
O(a){var s,r,q,p,o,n,m=this
a.A()
s=null
try{r=a.d.ga8()
r=A.az(r,A.u(r).h("k.E"))
q=t.dy
s=A.mT(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.bR(p) instanceof A.d5){++m.e
throw p}else throw p}o=new A.cv(s)
r=m.b
q=a.a
n=r.q(0,q)
r.D(0,q,o);++m.d
if(n!=null)m.a.a.deleteProgram(A.t(n.b.a))
return o},
cL(a){var s,r
t.cr.a(a)
for(s=a.a,s=new A.b_(s,s.r,s.e,a.$ti.h("b_<1>")),r=this.a.a;s.k();)r.deleteProgram(A.t(s.d.b.a))}}
A.a2.prototype={
A(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.b(A.j("ProgramSource.id must not be empty",m))
s=t.S
r=A.am(s)
for(q=this.d.gan(),q=q.gt(q);q.k();){p=q.gm()
o=p.b
if(o<0)throw A.b(A.j('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.j(0,o))throw A.b(A.j('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.am(s)
for(s=this.e.gan(),s=s.gt(s);s.k();){q=s.gm()
p=q.b
if(p<0)throw A.b(A.j('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.j(0,p))throw A.b(A.j('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.hG.prototype={}
A.Z.prototype={
P(){var s=this
return A.lU(B.b3,s.f,B.G,B.E,!0,!0,!0,!0,s.r,B.I,B.J,s.d,s.e,!0,!1,!1)}}
A.hI.prototype={
de(a,b){var s=this.d6(t.U.a(a),!1),r=this.a,q=A.G(r)
return new A.hH(A.h8(new A.a0(r,q.h("z(1)").a(new A.hN()),q.h("a0<1>")),t.z),s)},
d6(a,b){var s,r,q,p,o,n,m=this
t.U.a(a)
s=A.c([],t.b7)
r=m.a
q=A.G(r)
p=q.h("a0<1>")
o=A.az(new A.a0(r,q.h("z(1)").a(new A.hM()),p),p.h("k.E"))
m.cv(o,a,s)
m.cB(o,s)
m.cD(o,s)
m.cA(o,!1,s)
n=m.cF(o,s)
m.cC(o,n,s)
m.cE(o,s)
m.cz(o,n,s)
m.cw(o,s)
return s},
cv(a,b,c){var s,r,q,p
t.O.a(a)
t.U.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
p=B.a6.bY(b)
if(p.a!==0)B.a.j(c,new A.a5(B.bG,q.a,"missing capabilities: "+p.dC(0,", ")))}},
cB(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gaf(),o=J.a1(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gm().a
if(m.e>1)B.a.j(b,new A.a5(B.bB,n,"reads multisampled resource "+m.i(0)+" directly; resolve before sampling"))}}},
cD(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.G(a),r=s.h("z(1)").a(new A.hL()),q=B.a.gt(a),s=new A.F(q,r,s.h("F<1>"));s.k();){r=q.gm()
p=r.gaf()
o=A.az(p,p.$ti.h("k.E"))
p=r.gau()
n=A.az(p,p.$ti.h("k.E"))
if(o.length!==1||n.length!==1){B.a.j(b,new A.a5(B.Y,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.a.gai(o).a
l=B.a.gai(n).a
if(m.e<=1||l.e>1)B.a.j(b,new A.a5(B.Y,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.a.j(b,new A.a5(B.Y,r.a,"resolve source and destination must match format and extent"))}},
cA(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.A)(p),++m){l=p[m]
if(l.b===B.u)B.a.j(c,new A.a5(B.bE,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
cF(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.b1(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.A)(a),++q){p=a[q]
for(o=p.gau(),n=J.a1(o.a),o=new A.F(n,o.b,o.$ti.h("F<1>")),m=p.a;o.k();){l=n.gm().a
k=l.a+"#"+l.f
j=s.q(0,k)
if(j!=null){B.a.j(b,new A.a5(B.bA,m,l.i(0)+" already written by "+j.a))
continue}s.D(0,k,p)}}return s},
cC(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gaf(),p=J.a1(q.a),q=new A.F(p,q.b,q.$ti.h("F<1>")),o=r.a;q.k();){n=p.gm()
if(n.b===B.u)continue
n=n.a
m=b.q(0,n.a+"#"+n.f)
if(m==null){B.a.j(c,new A.a5(B.aw,o,"reads "+n.i(0)+" but no pass writes that version"))
continue}if(B.a.ds(a,m)>s)B.a.j(c,new A.a5(B.aw,o,"reads "+n.i(0)+" before writer "+m.a+" runs"))}}},
cE(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gaf(),o=J.a1(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gm()
if(m.b===B.u)continue
for(l=q.gau(),k=J.a1(l.a),l=new A.F(k,l.b,l.$ti.h("F<1>")),m=m.a,j=m.a,i=m.f;l.k();){h=k.gm().a
if(j===h.a&&i===h.f)B.a.j(b,new A.a5(B.bD,n,"reads and writes "+m.i(0)+" at the same version; declare a ping-pong version bump"))}}}},
cz(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gaf(),o=J.a1(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gm()
if(m.b===B.u)continue
l=m.a
k=b.q(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gau().dq(0,new A.hK(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.a.j(c,new A.a5(B.bC,n,"reads "+l.i(0)+" but writer "+k.a+" produced "+j.i(0)))}}},
cw(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.b1(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gau(),o=J.a1(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>"));p.k();){n=o.gm().a
r.D(0,n.a+"#"+n.f,q)}m=J.jx(p,t.cJ)
for(l=0;l<p;++l)m[l]=A.am(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gaf(),p=J.a1(s.a),s=new A.F(p,s.b,s.$ti.h("F<1>"));s.k();){o=p.gm()
if(o.b===B.u)continue
o=o.a
k=r.q(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.i(m,k)
m[k].j(0,q)}}p=t.y
j=A.h6(s,!1,!1,p)
s=a.length
i=A.h6(s,!1,!1,p)
h=new A.hJ(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.i(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.i(a,q)
B.a.j(b,new A.a5(B.bF,a[q].a,"participates in a resource dependency cycle"))}}}}
A.hN.prototype={
$1(a){t.z.a(a)
return A.jD()},
$S:4}
A.hM.prototype={
$1(a){t.z.a(a)
return A.jD()},
$S:4}
A.hL.prototype={
$1(a){return t.z.a(a).f},
$S:4}
A.hK.prototype={
$1(a){var s=t.L.a(a).a,r=this.a.a
return s.a===r.a&&s.f===r.f},
$S:9}
A.hJ.prototype={
$1(a){var s,r,q,p,o=this,n=o.a
if(!(a>=0&&a<n.length))return A.i(n,a)
if(n[a])return!0
s=o.b
if(!(a<s.length))return A.i(s,a)
if(s[a])return!1
B.a.D(n,a,!0)
r=o.c
if(!(a<r.length))return A.i(r,a)
r=r[a]
r=A.jL(r,r.r,A.u(r).c)
q=r.$ti.c
while(r.k()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.a.D(n,a,!1)
B.a.D(s,a,!0)
return!1},
$S:32}
A.hH.prototype={}
A.f5.prototype={$iaq:1,
gB(){return this.a},
gl(){return this.b},
gbk(){return this.c}}
A.d_.prototype={
bU(a){var s,r,q=a.c,p=q.a
if(!p.gE(0))A.l(A.j("Transform.translation must be finite: "+p.i(0),null))
p=q.b
if(!(isFinite(p.a)&&isFinite(p.b)&&isFinite(p.c)&&isFinite(p.d)))A.l(A.j("Transform.rotation must be finite: "+p.i(0),null))
p=q.c
if(!isFinite(p)||p<=0)A.l(A.j(u.f+p,null))
s=this.a.b1(a.a)
q=q.a2()
p=s.d.gaZ()
r=A.G(p)
return A.jt(new A.af(p,r.h("f(1)").a(q.gbj()),r.h("af<1,f>")))},
gc2(){return new A.aS(this.dB(),t.eM)},
dB(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d
return function $async$gc2(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b.ae(),n=o.$ti,o=new A.aJ(o.a(),n.h("aJ<1>")),m=s.a,l=m.$ti,k=l.c,j=m.b,n=n.c,l=l.y[1]
case 3:if(!o.k()){r=4
break}i=o.b
if(i==null)i=n.a(i)
h=i.a
g=i.b
i=g.c
i.A()
f=k.a(g.a)
m.ab(f)
f=f.a
if(!(f>=0&&f<j.length)){A.i(j,f)
r=1
break}e=j[f].c
f=(e==null?l.a(e):e).d
i=i.a2()
f=f.gaZ()
d=A.G(f)
r=5
return a.b=new A.f5(h,g,A.jt(new A.af(f,d.h("f(1)").a(i.gbj()),d.h("af<1,f>")))),1
case 5:r=3
break
case 4:case 1:return 0
case 2:return a.c=p.at(-1),3}}}},
$imz:1}
A.hO.prototype={
$3(a,b,c){return new A.bf(A.a(a),A.a(b),A.bJ(c))},
$S:33}
A.es.prototype={
a9(a,b){var s,r
if(this.x)A.l(A.m("resource library is disposed"))
s=this.a
a.A()
r=s.b.b0(a,b)
s.c.D(0,r.a,s.bT(a))
this.f.j(0,r)
return r},
U(a){var s
if(this.x)A.l(A.m("resource library is disposed"))
a.A()
s=this.b.a.b0(a,null)
this.r.j(0,s)
return s},
a7(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
if(e.x)return
s=e.w
r=A.az(s,A.u(s).c)
q=r.length
p=e.c
o=p.c
n=p.a.a
m=t.R
l=0
for(;l<r.length;r.length===q||(0,A.A)(r),++l){k=r[l]
j=o.ag(0,k.a)
if(j!=null)n.deleteTexture(m.a(j.a).a)
p.b.aG(k)}r=e.r
q=A.az(r,A.u(r).c)
o=q.length
n=e.b.a
l=0
for(;l<q.length;q.length===o||(0,A.A)(q),++l)n.aG(q[l])
q=e.f
o=A.az(q,A.u(q).c)
n=o.length
m=e.a
i=m.c
h=m.a.a
l=0
for(;l<o.length;o.length===n||(0,A.A)(o),++l){k=o[l]
g=i.ag(0,k.a)
if(g!=null){h.deleteVertexArray(A.t(g.c.a))
h.deleteBuffer(A.t(g.a.a))
f=g.b
if(f!=null)h.deleteBuffer(A.t(f.a))}m.b.aG(k)}s.Y(0)
r.Y(0)
q.Y(0)
p.a7()
e.x=!0},
$imB:1}
A.ic.prototype={}
A.fk.prototype={$iaq:1,
gB(){return this.a},
gl(){return this.b},
gbk(){return this.c}}
A.iT.prototype={
$1(a){var s=this.a.w.a.dG(a),r=s.b!=null,q=r?s.d:s.e
return new A.d1(s.c,r,q,s.f)},
$S:34}
A.iU.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.p(0,a))return this.b.x.gm().c5(a)
if(b!=null&&s.p(0,b))return this.b.x.gm().c5(b)
throw A.b(A.m("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:35}
A.iS.prototype={
$0(){return this.a.$1("shadowMap")},
$S:1}
A.iL.prototype={
$0(){return null},
$S:37}
A.iM.prototype={
$0(){var s,r=this.a.at
if(r==null)return B.Z
s=r.b
return A.os(s.k1,3,r.a.d,null)},
$S:38}
A.iR.prototype={
$0(){return this.a.$1("sceneDepth")},
$S:1}
A.iG.prototype={
$0(){return this.a.at.a},
$S:39}
A.iI.prototype={
$0(){return this.a.$2$fallback("ssaoRaw","sceneColor")},
$S:1}
A.iH.prototype={
$0(){return this.a.$2$fallback("ssaoBlurred","sceneColor")},
$S:1}
A.iQ.prototype={
$0(){var s=this.b.d>1?"sceneColor#1":"sceneColor"
return this.a.$1(s)},
$S:1}
A.iE.prototype={
$0(){return this.a.$2$fallback("bloomBlurH","sceneColor")},
$S:1}
A.iF.prototype={
$0(){return this.a.$2$fallback("bloomBlurV","sceneColor")},
$S:1}
A.iN.prototype={
$0(){return this.a.$2$fallback("dofBlurH","sceneColor")},
$S:1}
A.iO.prototype={
$0(){return this.a.$2$fallback("dofBlurV","sceneColor")},
$S:1}
A.iP.prototype={
$0(){var s=this.a.w.c.d
s===$&&A.aU()
return s},
$S:1}
A.iK.prototype={
$0(){return this.a.$2$fallback("vhsOutput","sceneColor")},
$S:1}
A.iJ.prototype={
$0(){return this.a.at.w},
$S:40}
A.iV.prototype={
$0(){return this.a},
$S:41}
A.iW.prototype={
$0(){return null},
$S:64}
A.it.prototype={}
A.f9.prototype={$imy:1}
A.f2.prototype={$ilX:1}
A.ew.prototype={
gG(){var s=this.w
return s==null?A.l(A.m("renderer is not initialized")):s},
dt(a,b){var s,r,q,p,o,n,m,l=this
if(l.e!==B.a2)throw A.b(A.m("renderer can only be initialized once"))
a.A()
b.A()
s=l.a
if(s.b===B.M)throw A.b(A.m("renderer device is context lost"))
l.e=B.cS
try{r=v.G
s.ak(A.a(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.ak(A.a(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.ak(A.a(r.WebGL2RenderingContext.MAX_SAMPLES))
s.ak(A.a(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.ak(A.a(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
q=s.r
if(q.p(0,"EXT_texture_filter_anisotropic"))s.bE(34047)
p=q.p(0,"EXT_disjoint_timer_query_webgl2")
s.w=p
q.p(0,"EXT_color_buffer_float")
q.p(0,"EXT_color_buffer_half_float")
q.p(0,"WEBGL_lose_context")
q=s.a
A.cl(q.getParameter(A.a(r.WebGL2RenderingContext.RENDERER)))
A.cl(q.getParameter(A.a(r.WebGL2RenderingContext.VENDOR)))
l.r=new A.hF(p)
r=l.b
o=A.hn(a)
q=r.a
if(q.a!=null)A.l(A.m("configuration state is already initialized"))
a.A()
q.a=a
A.hn(a)
q.d=1
r.b.bZ(o)
r=A.ma()
l.w=new A.es(A.mc(s),r,A.mF(s),A.am(t.cA),A.am(t.eL),A.am(t.aj))
r=new A.et()
q=new A.fW(s,r)
o=A.hn(a)
n=q.bx(o,a)
r.bZ(o)
q.c=new A.en(new A.hB(o),n)
l.x=q
l.y=new A.hD(s,A.b1(t.N,t.dN))
l.as=a
A.l9(l)
l.e=B.a3}catch(m){s=l.y
if(s!=null){r=s.b
s.cL(new A.b0(r,A.u(r).h("b0<2>")))
r.Y(0)}s=l.x
if(s!=null)s.a7()
s=l.w
if(s!=null)s.a7()
l.w=null
l.e=B.a2
throw m}s=new A.T($.J,t.cd)
s.aK(null)
return s},
d9(a,b){var s,r,q,p,o=this
o.cW()
o.az()
r=B.a.p(o.d,a)
if(!r)throw A.b(A.j("world was not created by this renderer",null))
if(o.at!=null)throw A.b(A.m("renderer.beginFrame called twice without end/abort"))
b.a.A()
b.b.A()
b.c.A()
r=b.w
if(!isFinite(r))A.l(A.j("FrameInput.timeSeconds must be finite: "+A.o(r),null))
o.at=b
o.ax=a
q=o.c
if(q.b===B.L)A.l(A.m("FrameQueue.beginFrame called twice without end/abort"))
q.b=B.L
q.c=0
B.a.Y(q.a)
s=q
try{r=o.r
if((r==null?A.l(A.m("renderer is not initialized")):r).z)o.b$=o.a.da()
return s}catch(p){if(q.b!==B.L)A.l(A.m("FrameQueue.abortFrame called without an active frame"))
q.c=0
q.b=B.bq
o.bo()
o.ax=o.at=null
throw p}},
dm(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
d.az()
s=d.at
r=d.ax
if(s==null||r==null)throw A.b(A.m("renderer.endFrame called without an active frame"))
m=d.c
if(m.b!==B.L)A.l(A.m("FrameQueue.endFrame called without an active frame"))
l=m.a
k=A.hT(l,0,A.bM(m.c,"count",t.S),A.G(l).c).ca(0,!1)
m.b=B.bp
q=k
try{p=A.nr(d,r,s,q)
o=p.a.ci()
m=o.gan()
l=A.u(m)
n=new A.cN(new A.a0(m,l.h("z(k.E)").a(new A.hP()),l.h("a0<k.E>")),l.h("R(k.E)").a(new A.hQ()),l.h("cN<k.E,R>")).b7(0,B.bn,new A.hR(),t.o)
l=s.e
m=n.a
j=n.b
i=p.c
h=n.d
p.toString
g=d.w
f=g.a.gaq()
g=g.c.gaq()
e=d.w
e.a.gaq()
e.c.gaq()
d.w.toString
return new A.fS(l,m,j,i,h,f+g)}finally{d.cR(s.e)
d.ax=d.at=null}},
cW(){var s,r,q,p=this
if(p.e!==B.a4)return
if(p.a.b===B.M)throw A.b(A.m("renderer context remains lost"))
s=p.w
if(s.x)A.l(A.m("resource library is disposed"))
s.a.bf()
s.c.bf()
s=p.x
s.toString
r=p.as
r.toString
if(s.e)A.l(A.m("GPU resource adapter is disposed"))
q=s.c
if(q==null)A.l(A.m("GPU resource adapter is not initialized"))
s.c=new A.en(q.a,s.bx(A.hn(r),r))
s=p.y
s.c=null
s.b.Y(0)
A.l9(p)
p.e=B.a3},
az(){var s=this,r=s.e
if(r!==B.a3)throw A.b(A.m("renderer is not ready: "+r.b))
if(s.a.b===B.M){s.cN()
s.e=B.a4
throw A.b(A.m("renderer context lost"))}},
$imD:1}
A.hP.prototype={
$1(a){t.ao.a(a)
return A.ow(a.a.toLowerCase(),"world",0)},
$S:43}
A.hQ.prototype={
$1(a){return t.ao.a(a).b},
$S:44}
A.hR.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return new A.R(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:45}
A.f8.prototype={}
A.ip.prototype={
cR(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.d)A.l(A.m(u.k))
r=s.bQ(o)
if(r.b)A.l(A.m("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.a.j(p.a$,new A.f8(o))}catch(q){p.aQ(o)}},
bo(){var s=this.b$
this.b$=null
if(s!=null)this.aQ(s)},
cN(){var s,r,q
this.bo()
s=this.a$
r=J.kq(s.slice(0),A.G(s).c)
B.a.Y(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.A)(r),++q)this.aQ(r[q].b)},
aQ(a){var s,r
try{s=this.a
s.a.deleteQuery(s.bQ(a).a)}catch(r){}}}
A.fd.prototype={}
A.ey.prototype={
u(){return"ShadowCasterLod."+this.b}}
A.ai.prototype={
I(a,b){var s,r=this
t.fy.a(b)
s=B.i.I(r.a.a,b.a.a)
if(s!==0)return s
s=B.i.I(r.b.a,b.b.a)
if(s!==0)return s
s=B.i.I(r.c.a,b.c.a)
if(s!==0)return s
return B.i.I(r.d,b.d)},
$iac:1}
A.ah.prototype={
I(a,b){var s
t.g0.a(b)
s=B.n.I(b.a,this.a)
if(s!==0)return s
return B.i.I(this.b,b.b)},
$iac:1}
A.V.prototype={}
A.jp.prototype={
$2(a,b){var s=t.k
return s.a(a).a.I(0,s.a(b).a)},
$S:46}
A.jq.prototype={
$1(a){return t.k.a(a).b},
$S:47}
A.jn.prototype={
$2(a,b){var s=t.b
return s.a(a).a.I(0,s.a(b).a)},
$S:48}
A.jo.prototype={
$1(a){return t.b.a(a).b},
$S:49}
A.fE.prototype={}
A.fD.prototype={}
A.hC.prototype={
$6(a,b,c,d,e,f){var s=this.a,r=s.a.length/18|0,q=this.b
s.H(a,e,f,new A.P(0,0).v(0,q))
s.H(b,e,f,new A.P(1,0).v(0,q))
s.H(c,e,f,new A.P(1,1).v(0,q))
s.H(d,e,f,new A.P(0,1).v(0,q))
q=r+2
B.a.C(s.b,A.c([r,r+1,q,r,q,r+3],t.t))},
$S:50}
A.ba.prototype={
H(a,b,c,d){B.a.C(this.a,A.c([a.a,a.b,a.c,b.a,b.b,b.c,c.a,c.b,c.c,1,1,1,1,0,1,d.a,d.b,0],t.n))},
a5(a){var s=new A.bj(B.bg,new Float32Array(A.p(this.a)),new Uint16Array(A.p(this.b)),a)
s.A()
return s}}
A.aL.prototype={
gaZ(){var s,r,q,p=this.a,o=p.a,n=p.b
p=p.c
s=this.b
r=s.a
q=s.b
s=s.c
return A.c([new A.f(o,n,p),new A.f(r,n,p),new A.f(o,q,p),new A.f(r,q,p),new A.f(o,n,s),new A.f(r,n,s),new A.f(o,q,s),new A.f(r,q,s)],t.gi)},
i(a){return"Aabb("+this.a.i(0)+", "+this.b.i(0)+")"}}
A.bz.prototype={}
A.cC.prototype={
u(){return"FrustumTest."+this.b}}
A.fT.prototype={
dW(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
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
if(h*f+e*c+i*a+a0<0)return B.ap
g=g?o:r
f=d?m:p
d=b?n:q
if(h*g+e*f+i*d+a0<0)l=!0}return l?B.br:B.bs}}
A.fU.prototype={
$4(a,b,c,d){var s=new A.f(a,b,c),r=new A.bz(s,d),q=Math.sqrt(s.ga1())
return q<1e-9?r:new A.bz(s.v(0,1/q),d/q)},
$S:51}
A.b2.prototype={
v(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=new Float32Array(16)
for(s=this.a,r=s.length,q=b.a,p=q.length,o=0;o<4;++o)for(n=o*4,m=0;m<4;++m){for(l=0,k=0;k<4;++k){j=k*4+m
if(!(j<r))return A.i(s,j)
j=s[j]
i=n+k
if(!(i<p))return A.i(q,i)
l+=j*q[i]}j=n+m
if(!(j<16))return A.i(h,j)
h[j]=l}return new A.b2(h)},
cb(a){var s,r,q,p,o,n,m,l,k,j,i,h
t.fP.a(a)
s=a.a
r=this.a
q=r.length
if(0>=q)return A.i(r,0)
p=r[0]
o=a.b
if(4>=q)return A.i(r,4)
n=r[4]
m=a.c
if(8>=q)return A.i(r,8)
l=r[8]
if(12>=q)return A.i(r,12)
k=s*p+o*n+m*l+r[12]
l=r[1]
n=r[5]
p=r[9]
if(13>=q)return A.i(r,13)
j=s*l+o*n+m*p+r[13]
p=r[2]
n=r[6]
l=r[10]
if(14>=q)return A.i(r,14)
i=s*p+o*n+m*l+r[14]
l=r[3]
n=r[7]
p=r[11]
if(15>=q)return A.i(r,15)
h=s*l+o*n+m*p+r[15]
return h===0||h===1?new A.f(k,j,i):new A.f(k/h,j/h,i/h)},
bc(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this.a,d=e.length
if(0>=d)return A.i(e,0)
s=e[0]
if(5>=d)return A.i(e,5)
r=e[5]
if(10>=d)return A.i(e,10)
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
if(!(s<16))return A.i(i,s)
s=i[s]
if(!(d<16))return A.i(h,d)
h[d]=s}if(15>=16)return A.i(h,15)
h[15]=1
return new A.b2(h)},
c_(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=J.jx(4,t.gN)
for(s=t.n,r=this.a,q=r.length,p=0;p<4;++p){if(!(p<q))return A.i(r,p)
o=r[p]
n=4+p
if(!(n<q))return A.i(r,n)
n=r[n]
m=8+p
if(!(m<q))return A.i(r,m)
m=r[m]
l=12+p
if(!(l<q))return A.i(r,l)
l=r[l]
k=p===0?1:0
j=p===1?1:0
i=p===2?1:0
a1[p]=new Float64Array(A.p(A.c([o,n,m,l,k,j,i,p===3?1:0],s)))}for(h=0;h<4;h=p){s=a1[h]
if(!(h<s.length))return A.i(s,h)
g=Math.abs(s[h])
for(p=h+1,f=p,e=h;f<4;++f){r=a1[f]
if(!(h<r.length))return A.i(r,h)
d=Math.abs(r[h])
if(d>g){g=d
e=f}}if(!isFinite(g)||g<1e-12)throw A.b(A.m("Mat4.inverse: singular matrix"))
if(e!==h){if(!(e>=0&&e<4))return A.i(a1,e)
a1[h]=a1[e]
a1[e]=s}s=a1[h]
if(!(h<s.length))return A.i(s,h)
c=s[h]
for(b=0;b<8;++b){if(!(b<s.length))return A.i(s,b)
r=s[b]
s.$flags&2&&A.br(s)
s[b]=r/c}for(f=0;f<4;++f){if(f===h)continue
s=a1[f]
if(!(h<s.length))return A.i(s,h)
a=s[h]
if(a===0)continue
for(b=0;b<8;++b){if(!(b<s.length))return A.i(s,b)
r=s[b]
q=a1[h]
if(!(b<q.length))return A.i(q,b)
q=q[b]
s.$flags&2&&A.br(s)
s[b]=r-a*q}}}a0=new Float32Array(16)
for(p=0;p<4;++p)for(h=0;h<4;++h){s=h*4+p
r=a1[p]
q=4+h
if(!(q<r.length))return A.i(r,q)
q=r[q]
if(!(s<16))return A.i(a0,s)
a0[s]=q}return new A.b2(a0)},
gE(a){return B.a0.aE(this.a,new A.hb())},
i(a){return"Mat4("+A.o(this.a)+")"}}
A.hb.prototype={
$1(a){return isFinite(A.iB(a))},
$S:12}
A.bA.prototype={
v(a,b){var s=this,r=s.d,q=b.a,p=s.a,o=b.d,n=s.b,m=b.c,l=s.c,k=b.b
return new A.bA(r*q+p*o+n*m-l*k,r*k-p*m+n*o+l*q,r*m+p*k-n*q+l*o,r*o-p*q-n*k-l*m)},
i(a){var s=this
return"Quat("+A.o(s.a)+", "+A.o(s.b)+", "+A.o(s.c)+", "+A.o(s.d)+")"}}
A.aH.prototype={
A(){var s=this.a
if(!s.gE(0))throw A.b(A.j("Transform.translation must be finite: "+s.i(0),null))
s=this.b
if(!(isFinite(s.a)&&isFinite(s.b)&&isFinite(s.c)&&isFinite(s.d)))throw A.b(A.j("Transform.rotation must be finite: "+s.i(0),null))
s=this.c
if(!isFinite(s)||s<=0)throw A.b(A.j(u.f+s,null))},
a2(){var s,r,q,p,o,n,m,l,k,j,i,h=this.b,g=h.a,f=g*g,e=h.b,d=e*e,c=h.c,b=c*c,a=g*e,a0=g*c,a1=e*c
h=h.d
s=h*g
r=h*e
q=h*c
c=t.n
h=A.kw(A.c([1-2*(d+b),2*(a+q),2*(a0-r),0,2*(a-q),1-2*(f+b),2*(a1+s),0,2*(a0+r),2*(a1-s),1-2*(f+d),0,0,0,0,1],c)).a
e=h.length
if(0>=e)return A.i(h,0)
g=h[0]
p=this.c
if(1>=e)return A.i(h,1)
o=h[1]
if(2>=e)return A.i(h,2)
n=h[2]
if(4>=e)return A.i(h,4)
m=h[4]
if(5>=e)return A.i(h,5)
l=h[5]
if(6>=e)return A.i(h,6)
k=h[6]
if(8>=e)return A.i(h,8)
j=h[8]
if(9>=e)return A.i(h,9)
i=h[9]
if(10>=e)return A.i(h,10)
e=this.a
return A.kw(A.c([g*p,o*p,n*p,0,m*p,l*p,k*p,0,j*p,i*p,h[10]*p,0,e.a,e.b,e.c,1],c))},
i(a){return"Transform("+this.a.i(0)+", "+this.b.i(0)+", scale="+this.c+")"}}
A.P.prototype={
v(a,b){return new A.P(this.a*b,this.b*b)},
gn(a){var s=this.a,r=this.b
return Math.sqrt(s*s+r*r)},
V(a,b){if(b==null)return!1
return b instanceof A.P&&this.a===b.a&&this.b===b.b},
gJ(a){return A.c3(this.a,this.b,B.h,B.h,B.h,B.h)},
i(a){return"Vec2("+A.o(this.a)+", "+A.o(this.b)+")"}}
A.f.prototype={
W(a,b){return new A.f(this.a+b.a,this.b+b.b,this.c+b.c)},
aj(a,b){return new A.f(this.a-b.a,this.b-b.b,this.c-b.c)},
v(a,b){return new A.f(this.a*b,this.b*b,this.c*b)},
b2(a){return this.a*a.a+this.b*a.b+this.c*a.c},
a6(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.f(s*r-q*p,q*o-n*r,n*p-s*o)},
ga1(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gn(a){return Math.sqrt(this.ga1())},
gE(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gS(){var s=this,r=Math.sqrt(s.ga1())
return r<1e-9?B.C:new A.f(s.a/r,s.b/r,s.c/r)},
V(a,b){if(b==null)return!1
return b instanceof A.f&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gJ(a){return A.c3(this.a,this.b,this.c,B.h,B.h,B.h)},
i(a){return"Vec3("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.eU.prototype={
u(){return"_BloomBlurAxis."+this.b}}
A.cq.prototype={
gB(){return this.f},
N(a,b){B.a.j(a.a,new A.E(this.f,B.r,A.c([new A.n(this.x,B.c),new A.n(this.y,B.e)],t.C),!1))},
M(a){var s=this,r=s.a.O(new A.a2(s.e,s.b,s.c,B.m,B.aF,B.aC)),q=A.aA(s.d),p=t.n,o=s.r===B.b1?new Float32Array(A.p(A.c([1/s.Q,0],p))):new Float32Array(A.p(A.c([0,1/s.as],p)))
p=s.y
return A.c([new A.eV(new A.Z(s.f,A.c([new A.n(s.x,B.c),new A.n(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iB:1}
A.eV.prototype={
L(a){return},
$iy:1,
gl(){return this.a}}
A.dL.prototype={
gB(){return"bloomComposite"},
N(a,b){B.a.j(a.a,new A.E("bloomComposite",B.r,A.c([new A.n(this.f,B.c),new A.n(this.r,B.c),new A.n(this.w,B.e)],t.C),!1))},
M(a){var s=this,r="bloomComposite",q=s.a.O(new A.a2(r,s.b,s.c,B.m,B.cm,B.cc)),p=A.aA(s.d),o=s.w,n=A.c([new A.n(s.f,B.c),new A.n(s.r,B.c),new A.n(o,B.e)],t.C)
return A.c([new A.eW(new A.Z(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iB:1}
A.eW.prototype={
L(a){return},
$iy:1,
gl(){return this.a}}
A.dS.prototype={
gB(){return"depthPrepass"},
N(a,b){B.a.j(a.a,new A.E("depthPrepass",B.bx,A.c([new A.n(this.w,B.e)],t.C),!1))},
M(a){var s=this,r="depthPrepass",q=s.a.O(new A.a2(r,s.b,s.c,B.aE,B.aD,B.c3))
return A.c([new A.eY(new A.Z(r,A.c([new A.n(s.w,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iB:1}
A.eY.prototype={
L(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=u.k,c=a0.b,b=a0.d,a=c.a
A.as(a,a0.T("sceneDepth").b)
A.a9(a,e.a.P())
A.bD(a,B.T,1,0,0,0)
A.aR(a,e.b.b)
A.d(a,"uVertexSnapGrid",new A.e(B.b,0))
A.d(a,"uAlbedo",B.q)
for(s=b.a,r=s.length,b=b.c.c.a,q=e.c,p=v.G,o=c.b,n=a.a,m=0;m<s.length;s.length===r||(0,A.A)(s),++m){l=s[m]
k=l.a
j=k.gl()
A.d(a,"uViewProjection",new A.e(B.k,new Float32Array(A.p(b))))
A.d(a,"uModel",new A.e(B.k,new Float32Array(A.p(j.c.a2().a))))
A.jm(c,l,!1)
e.cM(c,k.gl().b,0)
i=q.$1(k.gl().a)
j=i.a
if(a.b!==B.d)A.l(A.m(d))
n.bindVertexArray(A.t(j.a))
j=i.b
h=i.c
g=l.b.length
if(j){j=i.d
if(a.b!==B.d)A.l(A.m(d))
f=A.a(p.WebGL2RenderingContext.TRIANGLES)
n.drawElementsInstanced.apply(n,[f,h,j?A.a(p.WebGL2RenderingContext.UNSIGNED_INT):A.a(p.WebGL2RenderingContext.UNSIGNED_SHORT),0,g])
o.ad(h,g)}else{if(a.b!==B.d)A.l(A.m(d))
n.drawArraysInstanced(A.a(p.WebGL2RenderingContext.TRIANGLES),0,h,g)
o.ad(h,g)}}},
cM(a,b,c){var s,r
this.d.$1(b)
s=a.a
A.W(s,0,t.j.a(this.e.$1(null)))
A.d(s,"uAlphaCutoff",new A.e(B.b,0))
A.d(s,"uAffineWarpStrength",new A.e(B.b,0))
r=this.a.P()
A.a9(s,r)},
$iy:1,
gl(){return this.a}}
A.eZ.prototype={
u(){return"_DofBlurAxis."+this.b}}
A.cz.prototype={
gB(){return this.f},
N(a,b){B.a.j(a.a,new A.E(this.f,B.r,A.c([new A.n(this.w,B.c),new A.n(this.x,B.e)],t.C),!1))},
M(a){var s=this,r=s.a.O(new A.a2(s.e,s.b,s.c,B.m,B.aF,B.aC)),q=A.aA(s.d),p=t.n,o=s.r===B.b2?new Float32Array(A.p(A.c([1/s.z,0],p))):new Float32Array(A.p(A.c([0,1/s.Q],p)))
p=s.x
return A.c([new A.f_(new A.Z(s.f,A.c([new A.n(s.w,B.c),new A.n(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iB:1}
A.f_.prototype={
L(a){return},
$iy:1,
gl(){return this.a}}
A.dV.prototype={
gB(){return"dofComposite"},
N(a,b){var s=this
B.a.j(a.a,new A.E("dofComposite",B.r,A.c([new A.n(s.z,B.c),new A.n(s.Q,B.c),new A.n(s.as,B.c),new A.n(s.at,B.e)],t.C),!1))},
M(a){var s=this,r="dofComposite",q=s.a.O(new A.a2(r,s.b,s.c,B.m,B.ck,B.c2)),p=A.aA(s.d)
return A.c([new A.f0(new A.Z(r,A.c([new A.n(s.z,B.c),new A.n(s.Q,B.c),new A.n(s.as,B.c),new A.n(s.at,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iB:1}
A.f0.prototype={
L(a){var s,r=this,q=a.T("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.as(n,q.b)
A.a9(n,r.a.P())
A.aR(n,r.b.b)
s=t.j
A.W(n,0,s.a(r.d.$0()))
A.d(n,"uSharp",B.q)
A.W(n,1,s.a(r.e.$0()))
A.d(n,"uBlurred",B.F)
A.W(n,2,s.a(r.f.$0()))
A.d(n,"uSceneDepth",B.aY)
A.d(n,"uNear",new A.e(B.b,o.f))
A.d(n,"uFar",new A.e(B.b,o.r))
A.d(n,"uFocusDistance",new A.e(B.b,r.w))
A.d(n,"uFocusRange",new A.e(B.b,r.x))
A.d(n,"uStrength",new A.e(B.b,0))
A.at(n,r.c)
p.Z(3,0)},
$iy:1,
gl(){return this.a}}
A.e2.prototype={
gB(){return"grade"},
N(a,b){B.a.j(a.a,new A.E("grade",B.r,A.c([new A.n(this.r,B.c),new A.n(this.w,B.e)],t.C),!1))},
M(a){var s=this,r=s.a.O(new A.a2("grade",s.b,s.c,B.m,B.ci,B.cd)),q=A.aA(s.d),p=s.r,o=s.w
return A.c([new A.f4(new A.Z("grade",A.c([new A.n(p,B.c),new A.n(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iB:1}
A.f4.prototype={
L(a){var s=this,r=a.T(s.f.a),q=a.b,p=q.a
A.as(p,a.T(s.r.a).b)
A.a9(p,s.a.P())
A.aR(p,s.b.b)
A.W(p,0,r.b)
A.d(p,"uScene",B.q)
A.W(p,1,t.j.a(s.d.$0()))
A.d(p,"uLut",B.F)
A.d(p,"uLutSize",new A.e(B.b,s.e))
A.d(p,"uStrength",new A.e(B.b,0))
A.at(p,s.c)
q.Z(3,0)},
$iy:1,
gl(){return this.a}}
A.cP.prototype={
gB(){return"msaaResolve"},
N(a,b){B.a.j(a.a,new A.E("msaaResolve",B.by,A.c([new A.n(this.b,B.c),new A.n(this.c,B.e)],t.C),!0))},
M(a){var s=this.b,r=this.c
return A.c([new A.f7(new A.Z("msaaResolve",A.c([new A.n(s,B.c),new A.n(r,B.e)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iB:1}
A.f7.prototype={
L(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.ar(this.c),j=a.ar(this.d),i=this.b
if(i.b!==B.d)A.l(A.m(u.k))
s=t.V
r=s.a(k.b.a)
q=s.a(j.b.a)
s=r.y
if(s<=1)A.l(A.j("WebGl2Device.resolveTarget: source must be multisampled (samples > 1), got "+s,null))
s=q.y
if(s>1)A.l(A.j("WebGl2Device.resolveTarget: destination must be single-sample, got samples="+s,null))
s=r.w
p=q.w
if(s!==p||r.x!==q.x)A.l(A.j("WebGl2Device.resolveTarget: source ("+s+"x"+r.x+") and destination ("+p+"x"+q.x+") must match",null))
o=r.r!=null||r.f!=null
n=q.r!=null||q.f!=null
i=i.a
m=v.G
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.READ_FRAMEBUFFER),r.a)
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),q.a)
if(r.c!=null||r.b!=null){if(o){i.readBuffer(A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0))
i.drawBuffers(A.c([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.NONE)],t.n))}A.aa(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(o&&n){i.readBuffer(A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1))
i.drawBuffers(A.c([A.a(m.WebGL2RenderingContext.NONE),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
A.aa(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(r.d!=null||r.e!=null)A.aa(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.DEPTH_BUFFER_BIT),A.a(m.WebGL2RenderingContext.NEAREST)],t.H)
if(n)i.drawBuffers(A.c([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.READ_FRAMEBUFFER),null)
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),null)},
$iy:1,
gl(){return this.a}}
A.bV.prototype={}
A.dN.prototype={
T(a){var s=this.a.q(0,a)
if(s==null)throw A.b(A.m('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
ar(a){var s=a.a,r=this.a.q(0,s+"#"+a.f)
if(r!=null)return r
return this.T(s)},
$imx:1}
A.jE.prototype={}
A.cY.prototype={
gB(){return"present"},
N(a,b){B.a.j(a.a,new A.E("present",B.bz,A.c([new A.n(this.f,B.c)],t.C),!1))},
M(a){var s=this,r=s.a.O(new A.a2("present",s.b,s.c,B.m,B.cl,B.c9)),q=A.aA(s.d),p=s.f
return A.c([new A.fa(new A.Z("present",A.c([new A.n(p,B.c)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iB:1}
A.fa.prototype={
L(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=null,a0=a3.ar(b.d),a1=a3.b,a2=a1.a
A.as(a2,a)
A.a9(a2,b.a.P())
A.aR(a2,b.b.b)
A.at(a2,b.c)
A.W(a2,0,a0.b)
s=a3.c
r=s!=null
if(r)A.W(a2,1,s)
q=a3.d
p=q.f
o=q.d
n=q.c
A.d(a2,"uExposure",new A.e(B.b,p.a))
A.d(a2,"uVignette",new A.e(B.b,p.e))
A.d(a2,"uGrain",new A.e(B.b,p.f))
A.d(a2,"uOutputEncoding",new A.e(B.b,b.e===B.U?1:0))
A.d(a2,"uToneMap",new A.e(B.b,A.md(p.fr)))
m=o.a
q=o.k4==null
l=q?a:B.aA
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
A.d(a2,"uClearColor",new A.e(B.f,new Float32Array(A.p(A.c([m.a,m.b,m.c],e)))))
A.d(a2,"uSkyHorizon",new A.e(B.f,new Float32Array(A.p(A.c([l.a,l.b,l.c],e)))))
A.d(a2,"uSkyZenith",new A.e(B.f,new Float32Array(A.p(A.c([k,j,i],e)))))
A.d(a2,"uSkyGround",new A.e(B.f,new Float32Array(A.p(A.c([h,g,f],e)))))
A.d(a2,"uSkyEnabled",new A.e(B.b,q?0:1))
k=q?a:0.12
A.d(a2,"uSkyHorizonGlow",new A.e(B.b,k==null?0:k))
k=q?a:0.005
A.d(a2,"uSkyStarDensity",new A.e(B.b,k==null?0:k))
A.d(a2,"uSkyTexture",B.F)
A.d(a2,"uSkyTextureEnabled",new A.e(B.b,!q&&r?1:0))
r=q?a:0
A.d(a2,"uSkyRotation",new A.e(B.b,r==null?0:r))
r=q?a:1
A.d(a2,"uSkyExposure",new A.e(B.b,r==null?1:r))
A.d(a2,"uSkyTextureSrgb",new A.e(B.b,(!q||a)===!0?1:0))
A.d(a2,"uInverseProjection",new A.e(B.k,new Float32Array(A.p(n.gc0().a))))
d=n.y
if(d===$){c=n.a.c_()
n.y!==$&&A.lt()
n.y=c
d=c}A.d(a2,"uInverseView",new A.e(B.k,new Float32Array(A.p(d.a))))
r=n.d
A.d(a2,"uCameraPosition",new A.e(B.f,new Float32Array(A.p(A.c([r.a,r.b,r.c],e)))))
r=q?a:0.32
A.d(a2,"uCloudCoverage",new A.e(B.b,r==null?0:r))
r=q?a:0.4
A.d(a2,"uCloudDensity",new A.e(B.b,r==null?0:r))
r=q?a:650
A.d(a2,"uCloudBaseHeight",new A.e(B.b,r==null?650:r))
r=q?a:350
A.d(a2,"uCloudThickness",new A.e(B.b,r==null?350:r))
r=q?a:0.0012
A.d(a2,"uCloudScale",new A.e(B.b,r==null?0:r))
r=q?a:0
if(r==null)r=0
k=q?a:0
A.d(a2,"uCloudWind",new A.e(B.ag,new Float32Array(A.p(A.c([r,k==null?0:k],e)))))
r=q?a:0
A.d(a2,"uCloudPhase",new A.e(B.b,r==null?0:r))
r=q?a:0.55
A.d(a2,"uCloudDetail",new A.e(B.b,r==null?0:r))
r=q?a:0.25
A.d(a2,"uCloudSilverLining",new A.e(B.b,r==null?0:r))
r=q?a:12
A.d(a2,"uCloudSampleCount",new A.e(B.b,r==null?4:r))
r=o.go==null
q=r?a:0.6
if(q==null)q=0
k=r?a:-1
if(k==null)k=1
j=r?a:0.4
A.d(a2,"uCloudLightDirection",new A.e(B.f,new Float32Array(A.p(A.c([q,k,j==null?0:j],e)))))
q=r?a:1
if(q==null)q=1
k=r?a:0.95
if(k==null)k=1
j=r?a:0.88
A.d(a2,"uCloudLightColor",new A.e(B.f,new Float32Array(A.p(A.c([q,k,j==null?1:j],e)))))
r=r?a:2.4
A.d(a2,"uCloudLightIntensity",new A.e(B.b,r==null?0:r))
a1.Z(3,0)},
$iy:1,
gl(){return this.a}}
A.eq.prototype={
gB(){return"ps1Quantize"},
N(a,b){B.a.j(a.a,new A.E("ps1Quantize",B.r,A.c([new A.n(this.e,B.c),new A.n(this.f,B.e)],t.C),!1))},
M(a){var s=this,r="ps1Quantize",q=s.a.O(new A.a2(r,s.b,s.c,B.m,B.cn,B.c_)),p=A.aA(s.d),o=s.e,n=s.f
return A.c([new A.fb(new A.Z(r,A.c([new A.n(o,B.c),new A.n(n,B.e)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iB:1}
A.fb.prototype={
L(a){var s=this,r=a.T(s.d.a),q=a.b,p=q.a
A.as(p,a.T(s.e.a).b)
A.a9(p,s.a.P())
A.aR(p,s.b.b)
A.W(p,0,r.b)
A.d(p,"uScene",B.q)
A.d(p,"uQuantizationBits",new A.e(B.b,8))
A.d(p,"uDitherStrength",new A.e(B.b,0))
A.at(p,s.c)
q.Z(3,0)},
$iy:1,
gl(){return this.a}}
A.bB.prototype={}
A.ez.prototype={
gB(){return"shadow"},
N(a,b){B.a.j(a.a,new A.E("shadowCaster",B.bw,A.c([new A.n(this.z,B.e)],t.C),!1))},
M(a){var s=this,r="shadowCaster",q=s.a.O(new A.a2(r,s.b,s.c,B.aE,B.aD,B.cb))
return A.c([new A.fe(new A.Z(r,A.c([new A.n(s.z,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iB:1}
A.fe.prototype={
L(a){var s,r,q,p,o=this,n=a.T("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.as(s,n.b)
A.a9(s,o.a.P())
A.bD(s,B.T,1,0,0,0)
return}r=A.kG(l)
o.x.$1(r)
s=m.a
A.as(s,n.b)
A.a9(s,o.a.P())
A.bD(s,B.T,1,0,0,0)
A.aR(s,o.b.b)
A.d(s,"uAlbedo",B.q)
for(s=a.d.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.A)(s),++p)o.cO(m,s[p],l,r)},
bL(a,b){var s,r
this.d.$1(b)
s=a.a
A.W(s,0,t.j.a(this.e.$1(null)))
A.d(s,"uAlphaCutoff",new A.e(B.b,0))
r=this.a.P()
A.a9(s,r)},
cO(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){b.gl()
s=a.a
A.d(s,"uUseInstances",B.ah)
n.bI(a,b.gl().c,d)
n.bL(a,b.gl().b)
r=b.gl()
q=n.c.$1(r.a)
A.at(s,q.a)
s=q.b
r=q.c
if(s)a.b4(r,q.d,0)
else a.Z(r,0)}else if(b instanceof A.bw){p=b.a
p.gl()
if(n.d5(b,c)===B.de)return
n.bI(a,p.gl().c,d)
A.jm(a,b,!1)
n.bL(a,p.gl().b)
s=p.gl()
q=n.c.$1(s.a)
A.at(a.a,q.a)
s=q.b
r=q.c
o=b.b.length
if(s)a.b5(r,q.d,o,0)
else a.b3(r,0,o)}else throw A.b(A.j("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dI(b).i(0),null))},
d5(a,b){return B.dd},
bI(a,b,c){var s=a.a
A.d(s,"uModel",new A.e(B.k,new Float32Array(A.p(b.a2().a))))
A.d(s,"uLightViewProjection",new A.e(B.k,new Float32Array(A.p(c.a.a))))},
$iy:1,
gl(){return this.a}}
A.j_.prototype={
$1(a){return this.a.a=a},
$S:53}
A.j0.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:54}
A.eA.prototype={
gB(){return"shadowedWorld"},
N(a,b){var s=this,r=A.c([new A.n(s.db,B.c)],t.C)
if(s.ay)r.push(new A.n(s.dx,B.c))
r.push(new A.n(s.dy,B.e))
B.a.j(a.a,new A.E("shadowedWorld",B.av,r,!1))},
M(a){var s=this,r="shadowedWorld",q=s.a.O(new A.a2(r,s.b,s.c,B.co,B.cj,B.bZ)),p=A.c([new A.n(s.db,B.c)],t.C)
if(s.ay)p.push(new A.n(s.dx,B.c))
p.push(new A.n(s.dy,B.e))
return A.c([new A.ff(new A.Z(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iB:1}
A.ff.prototype={
L(b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3=null,a4=b1.T("sceneColor"),a5=b1.b,a6=b1.d,a7=a6.c,a8=a6.d,a9=a2.z.$0(),b0=a5.a
A.as(b0,a4.b)
A.a9(b0,a2.a.P())
s=a8.a
A.bD(b0,B.ao,1,s.c,s.b,s.a)
A.aR(b0,a2.b.b)
A.d(b0,"uAlbedo",B.q)
A.d(b0,"uNormalMap",B.dx)
A.d(b0,"uOrmMap",B.dy)
A.d(b0,"uEmissiveMap",B.dz)
A.d(b0,"uLightmap",B.dA)
s=t.j
A.W(b0,1,s.a(a2.y.$0()))
A.d(b0,"uShadowMap",B.F)
r=a7.d
q=t.n
A.d(b0,"uCameraPosition",new A.e(B.f,new Float32Array(A.p(A.c([r.a,r.b,r.c],q)))))
A.d(b0,"uShadowMapTexelSize",new A.e(B.ag,new Float32Array(A.p(A.c([1/a2.ch,1/a2.CW],q)))))
A.d(b0,"uShadowFilterRadius",new A.e(B.b,a8.at))
A.d(b0,"uShadowBias",new A.e(B.b,a8.db))
A.W(b0,2,s.a(a2.at.$0()))
A.d(b0,"uSsao",B.aY)
A.d(b0,"uVertexSnapGrid",new A.e(B.b,0))
A.d(b0,"uSceneColorSize",new A.e(B.ag,new Float32Array(A.p(A.c([a2.ax,a2.ay],q)))))
A.d(b0,"uViewProjection",new A.e(B.k,new Float32Array(A.p(a7.c.a))))
A.d(b0,"uView",new A.e(B.k,new Float32Array(A.p(a7.a.a))))
A.d(b0,"uLightViewProjection",new A.e(B.k,new Float32Array(A.p(a9.a.a))))
s=a8.b
A.d(b0,"uFogColor",new A.e(B.f,new Float32Array(A.p(A.c([s.a,s.b,s.c],q)))))
A.d(b0,"uFogStart",new A.e(B.b,a8.c))
A.d(b0,"uFogEnd",new A.e(B.b,a8.d))
A.d(b0,"uFogHeightFalloff",new A.e(B.b,0))
A.d(b0,"uFogDensity",new A.e(B.b,0))
p=a2.Q.$0()
s=A.c([],t.w)
r=a2.as.$0()
r=J.a1(r==null?B.Z:r)
o=p==null
while(r.k()){n=r.gm()
if(-1!==(o?a3:-1))s.push(n)}m=o?a3:B.j
if(m==null)m=B.j
l=o?a3:B.o
if(l==null)l=B.o
A.d(b0,"uLightPosition",new A.e(B.f,new Float32Array(A.p(A.c([m.a,m.b,m.c],q)))))
A.d(b0,"uLightDirection",new A.e(B.f,new Float32Array(A.p(A.c([l.a,l.b,l.c],q)))))
k=o?a3:B.O
if(k==null)k=B.v
A.d(b0,"uLightColor",new A.e(B.f,new Float32Array(A.p(A.c([k.a,k.b,k.c],q)))))
r=o?a3:1
A.d(b0,"uLightIntensity",new A.e(B.b,r==null?0:r))
A.d(b0,"uSpotEnabled",new A.e(B.b,!o?1:0))
r=a8.go==null
j=r?a3:B.D
if(j==null)j=B.j
i=r?a3:B.az
if(i==null)i=B.v
A.d(b0,"uDirectionalDirection",new A.e(B.f,new Float32Array(A.p(A.c([j.a,j.b,j.c],q)))))
A.d(b0,"uDirectionalColor",new A.e(B.f,new Float32Array(A.p(A.c([i.a,i.b,i.c],q)))))
r=r?a3:2.4
A.d(b0,"uDirectionalIntensity",new A.e(B.b,r==null?0:r))
for(r=a8.id,h=0;h<4;++h){n=r.length
if(h<n){if(!(h<n))return A.i(r,h)
g=r[h]}else g=a3
n=g==null
f=n?a3:g.b
if(f==null)f=B.C
e=n?a3:g.c
if(e==null)e=B.v
d=""+h
A.d(b0,"uPointPosition"+d,new A.e(B.f,new Float32Array(A.p(A.c([f.a,f.b,f.c],q)))))
A.d(b0,"uPointColor"+d,new A.e(B.f,new Float32Array(A.p(A.c([e.a,e.b,e.c],q)))))
c=n?a3:g.d
if(c==null)c=0
A.d(b0,"uPointIntensity"+d,new A.e(B.b,c))
n=n?a3:g.e
if(n==null)n=1
A.d(b0,"uPointRadius"+d,new A.e(B.b,n))}for(h=0;h<3;++h){r=s.length
if(h<r){if(!(h<r))return A.i(s,h)
g=s[h]}else g=a3
r=g==null
f=r?a3:B.j
if(f==null)f=B.C
b=r?a3:B.o
if(b==null)b=B.o
e=r?a3:B.O
if(e==null)e=B.v
n=""+h
A.d(b0,"uDirectSpotPosition"+n,new A.e(B.f,new Float32Array(A.p(A.c([f.a,f.b,f.c],q)))))
A.d(b0,"uDirectSpotDirection"+n,new A.e(B.f,new Float32Array(A.p(A.c([b.a,b.b,b.c],q)))))
A.d(b0,"uDirectSpotColor"+n,new A.e(B.f,new Float32Array(A.p(A.c([e.a,e.b,e.c],q)))))
d=r?a3:1
if(d==null)d=0
A.d(b0,"uDirectSpotIntensity"+n,new A.e(B.b,d))
d=r?a3:1
if(d==null)d=1
A.d(b0,"uDirectSpotRange"+n,new A.e(B.b,d))
d=r?a3:0.3
if(d==null)d=0.3
A.d(b0,"uDirectSpotInnerCos"+n,new A.e(B.b,Math.cos(d)))
d=r?a3:0.5
if(d==null)d=0.5
A.d(b0,"uDirectSpotOuterCos"+n,new A.e(B.b,Math.cos(d)))
r=r?0:1
A.d(b0,"uDirectSpotEnabled"+n,new A.e(B.b,r))}s=o?a3:1
A.d(b0,"uLightRange",new A.e(B.b,s==null?1:s))
s=o?a3:0.3
if(s==null)s=0.3
A.d(b0,"uLightInnerCos",new A.e(B.b,Math.cos(s)))
s=o?a3:0.5
if(s==null)s=0.5
A.d(b0,"uLightOuterCos",new A.e(B.b,Math.cos(s)))
a=a8.fx
A.d(b0,"uAmbientColor",new A.e(B.f,new Float32Array(A.p(A.c([a.a,a.b,a.c],q)))))
A.d(b0,"uAmbientIntensity",new A.e(B.b,a8.fy))
A.d(b0,"uAmbientLightScale",new A.e(B.b,a8.ax))
A.d(b0,"uDirectLightScale",new A.e(B.b,a8.ay))
s=a8.dx
A.d(b0,"uReflectionColor",new A.e(B.f,new Float32Array(A.p(A.c([s.a,s.b,s.c],q)))))
A.d(b0,"uReflectionIntensity",new A.e(B.b,a8.dy))
A.d(b0,"uReflectionConfidence",new A.e(B.b,a8.fr))
A.d(b0,"uRainWetness",new A.e(B.b,0))
A.d(b0,"uSurfaceSnowCoverage",new A.e(B.b,0))
A.d(b0,"uSurfaceDissolution",new A.e(B.b,0))
s=a8.k3
a0=A.hT(s,0,A.bM(4,"count",t.S),A.G(s).c).dY(0)
A.d(b0,"uThermalSourceCount",new A.e(B.b,a0.length))
for(h=0;h<4;++h){s=a0.length
if(h<s)if(!(h<s))return A.i(a0,h)
s=""+h
A.d(b0,"uThermalSourcePosition"+s,new A.e(B.f,new Float32Array(A.p(A.c([0,0,0],q)))))
A.d(b0,"uThermalSourceRadius"+s,new A.e(B.b,1))
A.d(b0,"uThermalSourceDissolution"+s,new A.e(B.b,0))}for(b0=a6.a,s=b0.length,a1=0;a1<b0.length;b0.length===s||(0,A.A)(b0),++a1)a2.bM(a5,b0[a1],0,a8)
for(a6=a6.b,b0=a6.length,a1=0;a1<a6.length;a6.length===b0||(0,A.A)(a6),++a1)a2.bM(a5,a6[a1],0,a8)},
bM(a,b,c,d){var s,r,q,p,o,n,m=this
if(t.Y.b(b)){s=a.a
A.d(s,"uUseInstances",B.ah)
m.bN(a,b.gl().c)
r=b.gl()
q=b.gl()
p=b.gl()
b.gl()
m.bJ(a,r.b,q.e,p.f,c,!0,d)
o=m.c.$1(b.gl().a)
A.at(s,o.a)
s=o.b
r=o.c
if(s)a.b4(r,o.d,0)
else a.Z(r,0)}else if(b instanceof A.bw){n=b.a
m.bN(a,n.gl().c)
A.jm(a,b,!0)
s=n.gl()
r=n.gl()
q=n.gl()
n.gl()
m.bJ(a,s.b,r.e,q.f,c,!0,d)
o=m.c.$1(n.gl().a)
A.at(a.a,o.a)
s=o.b
r=o.c
q=b.b.length
if(s)a.b5(r,o.d,q,0)
else a.b3(r,0,q)}else throw A.b(A.j("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dI(b).i(0),null))},
bJ(a,b,c,d,e,f,g){var s=this,r=null,q=s.d.$1(b),p=t.j,o=a.a
A.W(o,0,p.a(s.e.$1(r)))
A.W(o,3,p.a(s.f.$1(r)))
A.W(o,4,p.a(s.r.$1(r)))
A.W(o,5,p.a(s.w.$1(r)))
A.W(o,6,p.a(s.x.$1(r)))
A.d(o,"uAlphaCutoff",new A.e(B.b,0))
A.d(o,"uOpaqueCoverage",new A.e(B.b,c===B.V?0:1))
A.d(o,"uAffineWarpStrength",new A.e(B.b,0))
p=t.n
A.d(o,"uMaterialTint",new A.e(B.f,new Float32Array(A.p(A.c([q.d,q.e,q.f],p)))))
A.d(o,"uEmissiveStrength",new A.e(B.b,0))
A.d(o,"uUvScaleOffset",new A.e(B.dw,new Float32Array(A.p(A.c([1,1,0,0],p)))))
A.d(o,"uNormalStrength",new A.e(B.b,g.ch))
A.d(o,"uRoughness",new A.e(B.b,q.at*g.CW))
A.d(o,"uMetallic",new A.e(B.b,q.ax*g.cx))
A.d(o,"uSpecularScale",new A.e(B.b,g.cy))
A.d(o,"uClearcoatStrength",new A.e(B.b,q.ch))
A.d(o,"uClearcoatRoughness",new A.e(B.b,q.CW))
A.d(o,"uOcclusionStrength",new A.e(B.b,1))
A.d(o,"uLightmapIntensity",new A.e(B.b,0))
A.d(o,"uReceivesShadow",new A.e(B.b,1))
A:{p=r
if(B.V===c){switch(d.a){case 0:p=B.bl
break
case 1:p=B.bk
break}break A}if(B.K===c||B.bi===c){p=s.a.P()
break A}}A.a9(o,p)},
bN(a,b){var s=b.a2(),r=a.a
A.d(r,"uModel",new A.e(B.k,new Float32Array(A.p(s.a))))
A.d(r,"uNormalMatrix",new A.e(B.k,new Float32Array(A.p(s.bc().a))))},
$iy:1,
gl(){return this.a}}
A.eD.prototype={
gB(){return"ssaoOcclusion"},
N(a,b){B.a.j(a.a,new A.E("ssaoOcclusion",B.X,A.c([new A.n(this.w,B.e)],t.C),!1))},
M(a){var s=this,r="ssaoOcclusion",q=s.a.O(new A.a2(r,s.b,s.c,B.m,B.aG,B.bY)),p=A.aA(s.d)
return A.c([new A.fh(new A.Z(r,A.c([new A.n(s.w,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iB:1}
A.fh.prototype={
L(a){var s=a.b.a
A.as(s,a.T("ssaoRaw").b)
A.a9(s,this.a.P())
A.bD(s,B.S,1,1,1,1)
return},
$iy:1,
gl(){return this.a}}
A.eC.prototype={
gB(){return"ssaoBlur"},
N(a,b){B.a.j(a.a,new A.E("ssaoBlur",B.X,A.c([new A.n(this.y,B.c),new A.n(this.z,B.e)],t.C),!1))},
M(a){var s=this,r="ssaoBlur",q=s.a.O(new A.a2(r,s.b,s.c,B.m,B.cg,B.ce)),p=A.aA(s.d)
return A.c([new A.fg(new A.Z(r,A.c([new A.n(s.y,B.c),new A.n(s.z,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iB:1}
A.fg.prototype={
L(a){var s=a.b.a
A.as(s,a.T("ssaoBlurred").b)
A.a9(s,this.a.P())
A.bD(s,B.S,1,1,1,1)
return},
$iy:1,
gl(){return this.a}}
A.eN.prototype={
gB(){return"vhs"},
N(a,b){var s=this.w
a.b.j(0,s.a)
B.a.j(a.a,new A.E("vhs",B.r,A.c([new A.n(this.r,B.c),new A.n(s,B.u),new A.n(s,B.e)],t.C),!1))},
M(a){var s=this,r=s.a.O(new A.a2("vhs",s.b,s.c,B.m,B.ch,B.c0)),q=A.aA(s.d),p=s.r,o=s.w
return A.c([new A.fm(new A.Z("vhs",A.c([new A.n(p,B.c),new A.n(o,B.u),new A.n(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iB:1}
A.fm.prototype={
L(a){var s=this,r=a.T(s.f.a),q=a.T(s.r.a),p=a.b,o=p.a
A.as(o,q.b)
A.a9(o,s.a.P())
A.aR(o,s.b.b)
A.W(o,0,r.b)
A.d(o,"uScene",B.q)
A.W(o,1,t.j.a(s.d.$0()))
A.d(o,"uHistory",B.F)
A.d(o,"uTime",new A.e(B.b,s.e.$0()))
A.d(o,"uChromaWeight",new A.e(B.b,0))
A.d(o,"uTrackingWeight",new A.e(B.b,0))
A.d(o,"uNoiseWeight",new A.e(B.b,0))
A.d(o,"uHeadSwitchWeight",new A.e(B.b,0))
A.d(o,"uDropoutWeight",new A.e(B.b,0))
A.d(o,"uGhostWeight",new A.e(B.b,0))
A.at(o,s.c)
p.Z(3,0)},
$iy:1,
gl(){return this.a}}
A.eO.prototype={
gB(){return"volumetricLight"},
N(a,b){var s=this,r=s.w,q=t.C,p=a.a
B.a.j(p,new A.E("volumetricLight",B.X,A.c([new A.n(s.x,B.c),new A.n(r,B.e)],q),!1))
B.a.j(p,new A.E("volumetricComposite",B.r,A.c([new A.n(r,B.c),new A.n(s.y,B.c),new A.n(s.z,B.e)],q),!1))},
M(a){var s,r,q,p,o,n,m=this,l="volumetricLight",k="volumetricComposite",j=m.a,i=m.b,h=j.O(new A.a2(l,i,m.c,B.m,B.aG,B.c1)),g=m.e,f=A.aA(g),e=m.Q
B.a.j(e,f)
s=m.w
r=t.C
q=A.c([new A.fo(new A.Z(l,A.c([new A.n(m.x,B.c),new A.n(s,B.e)],r),!1,!1,!1,!1),h,f,s.a,m.f,m.r)],t.u)
p=m.z
o=j.O(new A.a2(k,i,m.d,B.m,B.cp,B.cf))
n=A.aA(g)
B.a.j(e,n)
B.a.j(q,new A.fn(new A.Z(k,A.c([new A.n(s,B.c),new A.n(m.y,B.c),new A.n(p,B.e)],r),!1,!1,!0,!1),o,n,s,p))
return q},
$iB:1}
A.fo.prototype={
L(a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this,a1=a6.T(a0.d),a2=a6.b,a3=a0.f.$0(),a4=a6.d.d,a5=a2.a
A.as(a5,a1.b)
A.a9(a5,a0.a.P())
A.bD(a5,B.S,1,0,0,0)
A.aR(a5,a0.b.b)
A.W(a5,0,t.j.a(a0.e.$0()))
A.d(a5,"uSceneDepth",B.q)
A.d(a5,"uNear",new A.e(B.b,a3.f))
A.d(a5,"uFar",new A.e(B.b,a3.r))
A.d(a5,"uViewProjection",new A.e(B.k,new Float32Array(A.p(a3.c.a))))
s=a3.a.a
A.d(a5,"uView",new A.e(B.k,new Float32Array(A.p(s))))
A.d(a5,"uInverseProjection",new A.e(B.k,new Float32Array(A.p(a3.gc0().a))))
r=a4.go==null
A.d(a5,"uShaftIntensity",new A.e(B.b,r?0:0.36))
A.d(a5,"uFogDensity",new A.e(B.b,0))
A.d(a5,"uAnisotropy",new A.e(B.b,a4.y))
q=a4.r
p=t.n
A.d(a5,"uVolumetricAlbedo",new A.e(B.f,new Float32Array(A.p(A.c([q.a,q.b,q.c],p)))))
A.d(a5,"uVolumetricHeightFalloff",new A.e(B.b,a4.w))
A.d(a5,"uVolumetricDustDensity",new A.e(B.b,a4.x))
A.d(a5,"uVolumetricJitter",new A.e(B.b,a4.z))
A.d(a5,"uVolumetricIntensity",new A.e(B.b,a4.Q))
A.d(a5,"uVolumetricSampleCount",new A.e(B.b,a4.as))
if(r)o=B.j
else{q=B.D.gS()
n=q.a
m=s.length
if(0>=m)return A.i(s,0)
l=s[0]
k=q.b
if(4>=m)return A.i(s,4)
j=s[4]
q=q.c
if(8>=m)return A.i(s,8)
i=s[8]
h=s[1]
g=s[5]
if(9>=m)return A.i(s,9)
f=s[9]
e=s[2]
d=s[6]
if(10>=m)return A.i(s,10)
o=new A.f(n*l+k*j+q*i,n*h+k*g+q*f,n*e+k*d+q*s[10]).gS()}c=r?null:B.az
if(c==null)c=B.v
A.d(a5,"uLightDir",new A.e(B.f,new Float32Array(A.p(A.c([o.a,o.b,o.c],p)))))
A.d(a5,"uLightColor",new A.e(B.f,new Float32Array(A.p(A.c([c.a,c.b,c.c],p)))))
b=A.ot(4,a3.d,a4.k2)
A.d(a5,"uVolumetricSourceCount",new A.e(B.b,b.length))
for(a=0;a<4;++a){s=b.length
if(a<s)if(!(a<s))return A.i(b,a)
s=""+a
A.d(a5,"uSourcePosition"+s,new A.e(B.f,new Float32Array(A.p(A.c([0,0,0],p)))))
A.d(a5,"uSourceColor"+s,new A.e(B.f,new Float32Array(A.p(A.c([0,0,0],p)))))
A.d(a5,"uSourceIntensity"+s,new A.e(B.b,0))
A.d(a5,"uSourceReferenceDistance"+s,new A.e(B.b,1))
A.d(a5,"uSourceCutoffDistance"+s,new A.e(B.b,1))}A.at(a5,a0.c)
a2.Z(3,0)},
$iy:1,
gl(){return this.a}}
A.fn.prototype={
L(a){var s=this,r=a.ar(s.e),q=a.ar(s.d),p=a.b,o=p.a
A.as(o,r.b)
A.mP(o,1)
A.a9(o,B.bj)
A.aR(o,s.b.b)
A.W(o,0,q.b)
A.d(o,"uVolumetric",B.q)
A.d(o,"uVolumetricStrength",B.aX)
A.at(o,s.c)
p.Z(3,0)},
$iy:1,
gl(){return this.a}}
A.d1.prototype={}
A.eR.prototype={
gB(){return"world"},
N(a,b){B.a.j(a.a,new A.E("worldOpaqueTransparent",B.av,A.c([new A.n(this.e,B.e)],t.C),!1))},
M(a){var s=this,r=s.a.O(new A.a2("safeWorld",s.b,s.c,B.cq,B.m,B.c4)),q=s.e
return A.c([new A.fr(new A.Z("worldOpaqueTransparent",A.c([new A.n(q,B.e)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iB:1}
A.fr.prototype={
L(a){var s,r,q,p,o=this,n=a.b,m=a.d,l=m.d,k=n.a
A.as(k,a.T(o.d).b)
A.a9(k,o.a.P())
s=l.a
A.bD(k,B.ao,1,s.c,s.b,s.a)
A.aR(k,o.b.b)
A.d(k,"uViewProjection",new A.e(B.k,new Float32Array(A.p(m.c.c.a))))
r=l.go==null?null:B.D
if(r==null)r=B.j
s=t.n
A.d(k,"uLightDir",new A.e(B.f,new Float32Array(A.p(A.c([r.a,r.b,r.c],s)))))
q=l.fx
A.d(k,"uAmbientColor",new A.e(B.f,new Float32Array(A.p(A.c([q.a,q.b,q.c],s)))))
A.d(k,"uAmbientIntensity",new A.e(B.b,l.fy))
A.d(k,"uAmbientLightScale",new A.e(B.b,l.ax))
A.d(k,"uDirectLightScale",new A.e(B.b,l.ay))
for(k=m.a,s=k.length,p=0;p<k.length;k.length===s||(0,A.A)(k),++p)o.bz(n,k[p])
for(m=m.b,k=m.length,p=0;p<m.length;m.length===k||(0,A.A)(m),++p)o.bz(n,m[p])},
bz(a,b){var s,r,q,p,o,n=this
if(b instanceof A.bw){s=b.a
n.bK(a,s.gl().c)
A.jm(a,b,!0)
r=n.c.$1(s.gl().a)
A.at(a.a,r.a)
q=r.b
p=r.c
o=b.b.length
if(q)a.b5(p,r.d,o,0)
else a.b3(p,0,o)}else if(t.Y.b(b)){q=a.a
A.d(q,"uUseInstances",B.ah)
n.bK(a,b.gl().c)
r=n.c.$1(b.gl().a)
A.at(q,r.a)
q=r.b
p=r.c
if(q)a.b4(p,r.d,0)
else a.Z(p,0)}else throw A.b(A.j("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dI(b).i(0),null))},
bK(a,b){var s=b.a2(),r=a.a
A.d(r,"uModel",new A.e(B.k,new Float32Array(A.p(s.a))))
A.d(r,"uNormalMatrix",new A.e(B.k,new Float32Array(A.p(s.bc().a))))},
$iy:1,
gl(){return this.a}}
A.ev.prototype={
sbd(a){var s=this.b
this.b=new A.aH(a,s.b,s.c)
this.ac()},
bg(a,b){var s=a.gS(),r=b/2,q=Math.sin(r),p=Math.cos(r),o=this.b
this.b=new A.aH(o.a,o.b.v(0,new A.bA(s.a*q,s.b*q,s.c*q,p)),o.c)
this.ac()},
gcd(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this
if(g.d){s=g.e
if(s!=null){r=s.gcd()
q=g.b
p=r.b
o=r.c
n=q.a.v(0,o)
m=new A.f(p.a,p.b,p.c)
l=m.a6(n)
k=m.a6(l)
n=r.a.W(0,n.W(0,l.v(0,2*p.d)).W(0,k.v(0,2)))
p=p.v(0,q.b)
r=p.a
j=p.b
i=p.c
p=p.d
h=Math.sqrt(r*r+j*j+i*i+p*p)
r=h<1e-9?B.B:new A.bA(r/h,j/h,i/h,p/h)
q=new A.aH(n,r,o*q.c)
r=q}else r=g.b
g.c=r
g.d=!1}return g.c},
ac(){var s,r,q
if(this.d)return
this.d=!0
for(s=this.f,r=s.length,q=0;q<s.length;s.length===r||(0,A.A)(s),++q)s[q].ac()},
bV(a){var s=a.e
if(s===this)return
if(s!=null)if(B.a.ag(s.f,a)){a.e=null
a.ac()}a.e=this
a.ac()
B.a.j(this.f,a)},
aD(a,b,c,d,e){var s=A.jG(B.R,!0,B.K,null,b,c,d,!0,0,e,-1)
this.bV(s)
return s},
bm(a){var s,r,q,p,o,n=this,m=n.r,l=n.w
if(m!=null&&l!=null){s=new A.c8(m,l,n.gcd(),n.x,n.y,n.z,!0,!0,n.ax)
r=n.ay
q=a.b
if(r==null){a.bU(s)
n.ay=q.dk(s)}else{a.bU(s)
p=q.$ti
p.c.a(r)
p.y[1].a(s)
q.ab(r)
q=q.b
p=r.a
if(!(p>=0&&p<q.length))return A.i(q,p)
q[p].sb_(s)}}else{q=n.ay
if(q!=null){a.b.aG(q)
n.ay=null}}for(q=n.f,p=q.length,o=0;o<q.length;q.length===p||(0,A.A)(q),++o)q[o].bm(a)}}
A.fV.prototype={
u(){return"GpuBufferUsage."+this.b}}
A.e0.prototype={
u(){return"GpuBufferKind."+this.b}}
A.h_.prototype={
u(){return"GpuTextureFilter."+this.b}}
A.h0.prototype={
u(){return"GpuTextureWrap."+this.b}}
A.e_.prototype={}
A.fZ.prototype={}
A.bZ.prototype={
u(){return"GpuTargetAttachment."+this.b}}
A.cD.prototype={}
A.e1.prototype={
u(){return"GpuDeviceStatus."+this.b}}
A.c9.prototype={
u(){return"ShaderCompileStage."+this.b}}
A.d5.prototype={
i(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.b8.prototype={
u(){return"UniformType."+this.b}}
A.e.prototype={}
A.cu.prototype={
u(){return"ClearMask."+this.b}}
A.dT.prototype={
Z(a,b){var s=this.a
if(s.b!==B.d)A.l(A.m(u.k))
s.a.drawArrays(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.ad(a,1)},
b3(a,b,c){var s=this.a
if(s.b!==B.d)A.l(A.m(u.k))
s.a.drawArraysInstanced(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.ad(a,c)},
b4(a,b,c){var s,r,q=this.a
if(q.b!==B.d)A.l(A.m(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.ad(a,1)},
b5(a,b,c,d){var s,r,q=this.a
if(q.b!==B.d)A.l(A.m(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.aa(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.ad(a,c)},
$ilT:1}
A.bX.prototype={}
A.cW.prototype={
cT(){var s,r=this,q=v.G
A.t(q.window).addEventListener("resize",A.ak(new A.hr(r)))
s=r.a
s.addEventListener("webglcontextlost",A.ak(new A.hs(r)))
s.addEventListener("webglcontextrestored",A.ak(new A.ht(r)))
s.addEventListener("contextmenu",A.ak(new A.hu()))
s.addEventListener("mousedown",A.ak(new A.hv(r)))
A.t(q.window).addEventListener("mousemove",A.ak(new A.hw(r)))
A.t(q.window).addEventListener("mouseup",A.ak(new A.hx(r)))
s.addEventListener("wheel",A.ak(new A.hy(r)))},
bH(){var s,r=this,q=r.a,p=A.a(q.clientWidth)>0?A.a(q.clientWidth):A.a(q.width),o=A.a(q.clientHeight)>0?A.a(q.clientHeight):A.a(q.height),n=r.x
if(p===n.a&&o===n.b)return
n=n.e
n=A.kI(o,p,n,n,!0)
r.x=n
q.width=n.c
q.height=r.x.d
try{q=r.x
r.b.az()
q.A()
r.d.bb("surface resized")}catch(s){}},
ck(){var s=this
if(s.Q)return
s.Q=!0
s.as=0
A.a(A.t(v.G.window).requestAnimationFrame(A.ak(s.gbP())))},
d4(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
A.fs(a)
if(!d.Q)return
s=a/1000
r=d.as
q=r>0?s-r:0.016666666666666666
d.as=s
d.bH()
if(!d.at&&d.b.e!==B.a4){r=d.c
d.e.bm(r)
p=d.y
o=p!=null
if(o)p.e1(q)
n=d.x
m=n.c/n.d
if(o){o=p.gb6()
n=p.a
l=n.aj(0,o)
if(l.ga1()<1e-12)A.l(A.j("CameraView.lookAt requires target ("+n.i(0)+") distinct from eye ("+o.i(0)+")",null))
k=A.kj(m,o,200,l,1,0.1,B.j)}else k=A.kj(m,B.dC,200,B.dH,1,0.1,B.j)
o=d.d
n=d.f
j=d.r
i=o.a
o.a=i+1
o=d.b
o.d9(r,new A.fQ(k,n,j,-1,i,s))
o.gG()
i=d.z
if(i!=null)i.$1(new A.bX(s,q))
h=o.dm()
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
f=A.Q(d.a.parentElement)
if(f==null)f=A.Q(A.t(r.document).body)
if(f!=null)A.t(f.appendChild(g))
d.cy=g}e=B.n.bi(q*1000,1)
g.innerText="FPS: "+B.n.bi(d.dy,0)+" ("+e+" ms)\nDraws: "+h.b+" | Tris: "+h.c+"\nInstances: "+h.e+" | VRAM: "+B.n.bi(h.r/1024,0)+" KB"}}}A.a(A.t(v.G.window).requestAnimationFrame(A.ak(d.gbP())))},
sdF(a){this.z=t.a4.a(a)}}
A.hA.prototype={
$1(a){var s=this.a,r=a.a===B.a1?2:1,q=a===B.aK?0:1
return new A.d0(a,s.c,s.d,r,q)},
$S:56}
A.hr.prototype={
$1(a){A.t(a)
return this.a.bH()},
$S:57}
A.hs.prototype={
$1(a){var s
A.t(a)
s=this.a
s.at=!0
s.d.bb("gl context lost")},
$S:2}
A.ht.prototype={
$1(a){var s
A.t(a)
s=this.a
s.at=!1
s.d.bb("gl context restored")},
$S:2}
A.hu.prototype={
$1(a){A.t(a).preventDefault()},
$S:2}
A.hv.prototype={
$1(a){var s
A.t(a)
s=this.a
s.ay=!0
s.ch=A.a(a.button)
s.CW=A.a(a.clientX)
s.cx=A.a(a.clientY)},
$S:2}
A.hw.prototype={
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
r=s.ch===0&&!A.jP(a.shiftKey)
s=s.y
if(r){s.ax+=o*0.006
s.ay=B.n.al(s.ay+n*0.006,-1.5079644737231006,1.5079644737231006)}else{r=s.b
m=s.gc7()
l=s.gc7().a6(s.a.aj(0,s.gb6()).gS()).gS()
k=m.v(0,-o*0.003*r).W(0,l.v(0,n*0.003*r))
s.CW=s.CW.W(0,k)}}},
$S:2}
A.hx.prototype={
$1(a){A.t(a)
this.a.ay=!1},
$S:2}
A.hy.prototype={
$1(a){var s,r
A.t(a)
s=this.a
r=s.y
if(r!=null){a.preventDefault()
s=s.y
s.toString
r=A.fs(a.deltaY)
s.ch=B.n.al(s.ch+r*0.003,0.5,100)}},
$S:2}
A.en.prototype={
c5(a){var s=this.b.q(0,a)
if(s==null)throw A.b(A.m("resource is not in candidate: "+a))
return s}}
A.fW.prototype={
gm(){var s=this.c
if(s==null)throw A.b(A.m("GPU resource adapter is not initialized"))
return s},
a7(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.cK(s.b)
r.b.a7()
r.c=null
r.e=!0},
bx(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.b1(a0,a1),a3=A.c([],t.J)
try{k=a4.a
j=k.$ti
i=j.h("z(1)")
j=j.h("a0<1>")
s=new A.a0(k,i.a(new A.fX()),j)
for(h=s,g=J.a1(h.a),h=new A.F(g,h.b,h.$ti.h("F<1>")),f=a.a;h.k();){r=g.gm()
q=A.kS(f,a.by(r,a5))
J.fv(a3,q)
J.fu(a2,r,q)}e=A.az(new A.a0(k,i.a(new A.fY()),j),j.h("k.E"))
B.a.cj(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.A)(k),++d){o=k[d]
n=A.ol(J.lJ(o,11))
if(i){h=J.jr(a2,"sceneColor")
h.toString
J.fu(a2,o,h)}else{h=n
if(typeof h!=="number")return h.cf()
if(h>=2){h=J.jr(a2,"sceneColor#1")
h.toString
J.fu(a2,o,h)}else{m=A.kS(f,a.by(o,a5))
J.fv(a3,m)
J.fu(a2,o,m)}}}a0=A.kl(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.G(a0).h("d3<1>"),a0=new A.d3(a0,k),a0=new A.ae(a0,a0.gn(0),k.h("ae<O.E>")),j=a.a,i=t.V,k=k.h("O.E");a0.k();){h=a0.d
l=h==null?k.a(h):h
b=i.a(a1.a(l).a)
A.jH(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}throw c}},
by(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.cD(512,512,1,B.W,!0)
if(a==="sceneDepth")return new A.cD(n,m,1,B.W,!0)
s=B.t.a3(a,"ssao")||B.t.a3(a,"bloomBlur")||B.t.a3(a,"dofBlur")||B.t.a3(a,"volumetricLight")
r=s?B.i.a0(n+1,2):n
q=s?B.i.a0(m+1,2):m
p=a==="sceneColor"
o=p||B.t.a3(a,"sceneColor#")
p=p?b.d:1
return new A.cD(r,q,p,o?B.as:B.bu,o)},
cK(a){var s,r,q,p,o,n=A.jB(t.bS.a(a).gcc(),t.j)
for(n=A.jL(n,n.r,A.u(n).c),s=this.a,r=t.V,q=n.$ti.c;n.k();){p=n.d
o=r.a((p==null?q.a(p):p).a)
A.jH(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}
A.fX.prototype={
$1(a){return!B.t.a3(A.aK(a),"sceneColor#")},
$S:8}
A.fY.prototype={
$1(a){return B.t.a3(A.aK(a),"sceneColor#")},
$S:8}
A.dq.prototype={
u(){return"_SlotState."+this.b}}
A.bo.prototype={
sb_(a){this.c=this.$ti.h("1?").a(a)}}
A.aQ.prototype={
b0(a,b){var s,r,q,p,o=this,n=o.$ti
n.y[1].a(a)
s=o.c
r=s.length
if(r!==0){if(0>=r)return A.i(s,-1)
q=s.pop()}else{s=o.b
B.a.j(s,new A.bo(B.P,n.h("bo<2>")))
q=s.length-1}n=o.b
if(!(q>=0&&q<n.length))return A.i(n,q)
p=n[q];++p.a
p.b=B.dX
p.sb_(a)
p.f=b;++o.d
return o.a.$3(q,p.a,b)},
dk(a){return this.b0(a,null)},
ab(a){var s,r,q
this.$ti.c.a(a)
s=a.a
if(s<0||s>=this.b.length)throw A.b(A.be(B.ax,a))
r=this.b
if(!(s>=0&&s<r.length))return A.i(r,s)
q=r[s]
if(q.a!==a.b)throw A.b(A.be(B.ay,a))
s=q.b
if(s===B.Q||s===B.P)throw A.b(A.be(B.N,a))},
b1(a){var s,r,q=this.$ti
q.c.a(a)
this.ab(a)
s=this.b
r=a.a
if(!(r>=0&&r<s.length))return A.i(s,r)
r=s[r].c
return r==null?q.y[1].a(r):r},
aG(a){var s,r,q,p=this
p.$ti.c.a(a)
s=a.a
if(s<0||s>=p.b.length)throw A.b(A.be(B.ax,a))
r=p.b
if(!(s>=0&&s<r.length))return A.i(r,s)
q=r[s]
if(q.a!==a.b)throw A.b(A.be(B.ay,a))
r=q.b
if(r===B.Q||r===B.P)throw A.b(A.be(B.bH,a))
q.b=B.Q
q.sb_(null)
B.a.j(p.c,s);++p.e},
ae(){return new A.aS(this.dD(),this.$ti.h("aS<+(1,2)>"))},
dD(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k,j,i
return function $async$ae(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b,n=s.a,m=s.$ti.y[1],l=0
case 2:if(!(l<o.length)){r=4
break}k=o[l]
j=k.b
if(j===B.Q||j===B.P){r=3
break}j=n.$3(l,k.a,k.f)
i=k.c
r=5
return a.b=new A.ag(j,i==null?m.a(i):i),1
case 5:case 3:++l
r=2
break
case 4:return 0
case 1:return a.c=p.at(-1),3}}}}}
A.fx.prototype={
u(){return"BlendEquation."+this.b}}
A.bT.prototype={
u(){return"BlendFactor."+this.b}}
A.fC.prototype={
u(){return"CullFace."+this.b}}
A.fG.prototype={
u(){return"DepthFunc."+this.b}}
A.bW.prototype={}
A.a7.prototype={
u(){return"StateField."+this.b}}
A.i5.prototype={
dl(a){var s,r=this.a
if(r==null)return A.m9(B.ca,t.d5)
s=A.am(t.d5)
if(r.a!==a.a)s.j(0,B.a7)
if(r.b!==a.b)s.j(0,B.a8)
if(r.c!==a.c)s.j(0,B.a9)
if(r.d!==a.d)s.j(0,B.aa)
if(r.e!==a.e||r.f!==a.f)s.j(0,B.ab)
if(r.r!==a.r)s.j(0,B.ac)
if(r.w!==a.w)s.j(0,B.ad)
if(r.x!==a.x)s.j(0,B.ae)
return s}}
A.bc.prototype={$iaE:1}
A.dA.prototype={}
A.dz.prototype={}
A.fq.prototype={}
A.eP.prototype={
cp(a){var s=this,r=A.t(s.a.canvas)
s.c=A.ak(new A.i2(s))
s.d=A.ak(new A.i3(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
ak(a){var s=A.cl(this.a.getParameter(a))
return typeof s=="number"?B.n.dX(s):0},
bE(a){var s=A.cl(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
$ilZ:1}
A.i2.prototype={
$1(a){A.t(a).preventDefault()
this.a.b=B.M},
$S:13}
A.i3.prototype={
$1(a){this.a.b=B.d},
$S:13}
A.iA.prototype={
da(){var s,r=this
if(r.b!==B.d)A.l(A.m(u.k))
s=r.w?A.Q(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.bc(new A.fq(s))},
bQ(a){var s=a.a
if(!(s instanceof A.fq))throw A.b(A.aD(a,"query","is not a GPU timer query"))
return s}}
A.fp.prototype={}
A.i1.prototype={}
A.i4.prototype={
dj(a){var s=A.Q(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.i1(A.mK(s))}}
A.jc.prototype={
$1(a){var s,r,q,p
A.t(a)
s=A.aK(this.a.value)
A:{if("aces"===s){r=B.dh
break A}if("reinhard"===s){r=B.aU
break A}if("off"===s){r=B.dg
break A}r=B.aV
break A}q=this.b
p=q.r
q.r=new A.cX(p.a,p.e,p.f,r)},
$S:2}
A.jd.prototype={
$1(a){var s
A.t(a)
s=this.a.y
if(s!=null)s.as=A.jP(this.b.checked)},
$S:2}
A.je.prototype={
$1(a){var s
A.t(a)
s=this.a.q(0,A.aK(this.b.value))
if(s!=null)this.c.w=s},
$S:2}
A.jf.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i=this,h=a.a,g=a.b,f=i.a,e=h*1.4
f.sbd(new A.f(0,0.5+Math.sin(e)*0.15,0))
f.bg(B.j,0.35*g)
f=i.b
f.sbd(new A.f(0,0.5+Math.sin(e)*0.15,0))
f.bg(B.dG.gS(),0.7*g)
i.c.bg(B.j,0.65*g)
for(f=i.d,s=0;s<f.length;++s){r=B.i.aI(s,3)
A:{if(0===r){e=B.dE.gS()
break A}if(1===r){e=B.dB.gS()
break A}e=B.dD.gS()
break A}if(!(s<f.length))return A.i(f,s)
q=f[s]
p=A.mu(e,(2.2+s*1.2)*g)
e=q.b
q.b=new A.aH(e.a,e.b.v(0,p),e.c)
q.ac()}f=h*1.2
e=Math.cos(f)
q=Math.sin(h*2)
f=Math.sin(f)
o=h+2
n=Math.cos(o)
o=Math.sin(o)
m=h*0.8+4
l=Math.cos(m)
m=Math.sin(m)
k=Math.sin(h*2.2)
j=i.e
j.f=j.f.dg(A.c([new A.bk(new A.f(e*4.2,1.5+q*0.6,f*4.2),B.bL,4,9),new A.bk(new A.f(n*4.5,1.8,o*4.5),B.bN,4,9),new A.bk(new A.f(l*3.8,1.2,m*3.8),B.bS,3.5,8),new A.bk(new A.f(0,3.8+k*0.9,0),B.bT,4.5,10)],t.e))},
$S:60};(function aliases(){var s=J.bi.prototype
s.co=s.i})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"nB","m3",61)
r(A,"o1","mW",5)
r(A,"o2","mX",5)
r(A,"o3","mY",5)
q(A,"lm","nW",0)
p(A.eb.prototype,"gdL","dM",19)
var o
p(o=A.eI.prototype,"gdH","dI",3)
p(o,"gdP","dQ",3)
p(o,"gdR","dS",3)
p(o,"gdJ","dK",3)
p(o,"gdN","dO",3)
q(A,"ln","mZ",63)
q(A,"p_","jD",42)
p(A.b2.prototype,"gbj","cb",52)
p(A.cW.prototype,"gbP","d4",55)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.w,null)
q(A.w,[A.jy,J.e4,A.d4,J.cp,A.k,A.cs,A.I,A.hS,A.ae,A.cO,A.F,A.ad,A.bb,A.c1,A.cw,A.bG,A.b5,A.hY,A.hk,A.cB,A.dr,A.bd,A.bx,A.h4,A.cL,A.b_,A.cK,A.aG,A.f3,A.ix,A.iv,A.eS,A.aJ,A.aw,A.eX,A.bE,A.T,A.eT,A.fi,A.dB,A.dg,A.f6,A.bH,A.D,A.dx,A.fl,A.bt,A.ia,A.d6,A.ib,A.fO,A.a6,A.Y,A.fj,A.eF,A.hj,A.hF,A.ap,A.fA,A.fB,A.cX,A.cr,A.eB,A.dY,A.fQ,A.fR,A.b4,A.h1,A.c5,A.dM,A.S,A.dU,A.bk,A.aj,A.by,A.a8,A.i_,A.bj,A.fF,A.hm,A.hB,A.et,A.c8,A.hU,A.d0,A.R,A.fS,A.eb,A.eM,A.hg,A.eI,A.hl,A.bw,A.dW,A.dX,A.dZ,A.fP,A.cf,A.E,A.a5,A.L,A.n,A.cv,A.hD,A.a2,A.hG,A.Z,A.hI,A.hH,A.f5,A.d_,A.es,A.ic,A.fk,A.it,A.f9,A.f2,A.fd,A.f8,A.ip,A.ai,A.ah,A.V,A.fE,A.fD,A.ba,A.aL,A.bz,A.fT,A.b2,A.bA,A.aH,A.P,A.f,A.cq,A.eV,A.dL,A.eW,A.dS,A.eY,A.cz,A.f_,A.dV,A.f0,A.e2,A.f4,A.cP,A.f7,A.bV,A.dN,A.jE,A.cY,A.fa,A.eq,A.fb,A.bB,A.ez,A.fe,A.eA,A.ff,A.eD,A.fh,A.eC,A.fg,A.eN,A.fm,A.eO,A.fo,A.fn,A.d1,A.eR,A.fr,A.ev,A.e_,A.fZ,A.cD,A.d5,A.e,A.dT,A.bX,A.cW,A.en,A.fW,A.bo,A.aQ,A.bW,A.i5,A.bc,A.dA,A.dz,A.fq,A.fp,A.iA,A.i1,A.i4])
q(J.e4,[J.e6,J.cF,J.cH,J.cG,J.cI,J.c0,J.bg])
q(J.cH,[J.bi,J.r,A.c2,A.cT])
q(J.bi,[J.em,J.bC,J.bh])
r(J.e5,A.d4)
r(J.h3,J.r)
q(J.c0,[J.cE,J.e7])
q(A.k,[A.cd,A.ay,A.cN,A.a0,A.bF,A.aS])
r(A.dC,A.cd)
r(A.dd,A.dC)
r(A.ct,A.dd)
q(A.I,[A.cJ,A.b6,A.e8,A.eL,A.eu,A.f1,A.dJ,A.aM,A.da,A.eK,A.ca,A.dQ])
q(A.ay,[A.O,A.aZ,A.b0,A.aY,A.df])
q(A.O,[A.d7,A.af,A.d3])
r(A.bn,A.bb)
q(A.bn,[A.ag,A.dm,A.dn])
r(A.cg,A.c1)
r(A.d8,A.cg)
r(A.cx,A.d8)
r(A.M,A.cw)
q(A.b5,[A.cy,A.dp,A.dy])
r(A.aN,A.cy)
r(A.cV,A.b6)
q(A.bd,[A.dO,A.dP,A.eH,A.j7,A.j9,A.i7,A.i6,A.iC,A.im,A.ji,A.jj,A.j1,A.j2,A.i0,A.hd,A.he,A.hf,A.ho,A.hc,A.hh,A.hV,A.hX,A.fK,A.fI,A.fJ,A.hp,A.hq,A.hN,A.hM,A.hL,A.hK,A.hJ,A.hO,A.iT,A.iU,A.hP,A.hQ,A.jq,A.jo,A.hC,A.fU,A.hb,A.j_,A.hA,A.hr,A.hs,A.ht,A.hu,A.hv,A.hw,A.hx,A.hy,A.fX,A.fY,A.i2,A.i3,A.jc,A.jd,A.je,A.jf])
q(A.eH,[A.eE,A.bU])
q(A.bx,[A.aX,A.de])
q(A.dP,[A.j8,A.iD,A.iY,A.io,A.h5,A.ha,A.jk,A.hi,A.hW,A.jl,A.fL,A.hR,A.jp,A.jn])
q(A.cT,[A.ec,A.a3])
q(A.a3,[A.di,A.dk])
r(A.dj,A.di)
r(A.cR,A.dj)
r(A.dl,A.dk)
r(A.cS,A.dl)
q(A.cR,[A.cQ,A.ed])
q(A.cS,[A.ee,A.ef,A.eg,A.eh,A.ei,A.cU,A.ej])
r(A.ds,A.f1)
q(A.dO,[A.i8,A.i9,A.iw,A.id,A.ii,A.ih,A.ig,A.ie,A.il,A.ik,A.ij,A.is,A.iX,A.iS,A.iL,A.iM,A.iR,A.iG,A.iI,A.iH,A.iQ,A.iE,A.iF,A.iN,A.iO,A.iP,A.iK,A.iJ,A.iV,A.iW,A.j0])
r(A.dc,A.eX)
r(A.fc,A.dB)
r(A.dh,A.de)
r(A.aI,A.dp)
r(A.d9,A.dy)
q(A.aM,[A.cZ,A.e3])
q(A.ia,[A.c6,A.cb,A.c_,A.fw,A.ea,A.b9,A.cA,A.fy,A.fz,A.c7,A.bY,A.aF,A.er,A.aW,A.d2,A.ey,A.cC,A.eU,A.eZ,A.fV,A.e0,A.h_,A.h0,A.bZ,A.e1,A.c9,A.b8,A.cu,A.dq,A.fx,A.bT,A.fC,A.fG,A.a7])
q(A.b4,[A.ao,A.ar,A.aO,A.el,A.bf])
r(A.ew,A.fd)
r(A.eP,A.fp)
s(A.dC,A.D)
s(A.di,A.D)
s(A.dj,A.ad)
s(A.dk,A.D)
s(A.dl,A.ad)
s(A.cg,A.dx)
s(A.dy,A.fl)
s(A.fd,A.ip)
s(A.fp,A.iA)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{h:"int",q:"double",ab:"num",v:"String",z:"bool",Y:"Null",x:"List",w:"Object",an:"Map",H:"JSObject"},mangledNames:{},types:["~()","aE()","Y(H)","aE(ar?)","z(E)","~(~())","~(@)","z(a8)","z(v)","z(n)","Y(@)","Y()","z(q)","Y(w?)","h(h,+(ao,bj))","h(+influence,light(q,aj),+influence,light(q,aj))","@(v)","@(@,v)","Y(~())","by(aO)","aO(h,h,v?)","ao(h,h,v?)","@(@)","Y(@,bm)","ar(h,h,v?)","z(eJ?)","h(h,+(ar,iu))","h(+influence,source(q,db),+influence,source(q,db))","v(E)","h(y,y)","~(h,@)","Y(w,bm)","z(h)","bf(h,h,v?)","d1(ao)","aE(v{fallback:v?})","~(@,@)","aj?()","x<aj>()","cr()","q()","bV()","z()","z(a6<v,R>)","R(a6<v,R>)","R(R,R)","h(V<ai>,V<ai>)","aq(V<ai>)","h(V<ah>,V<ah>)","aq(V<ah>)","~(f,f,f,f,f,f)","bz(q,q,q,q)","f(f)","~(bB)","bB()","~(ab)","d0(ap)","~(H)","~(w?,w?)","w?(w?)","~(bX)","h(@,@)","z(ap)","cf()","aE?()"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.ag&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.dm&&a.b(c.a)&&b.b(c.b),"2;influence,source":(a,b)=>c=>c instanceof A.dn&&a.b(c.a)&&b.b(c.b)}}
A.ne(v.typeUniverse,JSON.parse('{"em":"bi","bC":"bi","bh":"bi","oJ":"c2","r":{"x":["1"],"H":[],"k":["1"]},"e6":{"z":[],"C":[]},"cF":{"C":[]},"cH":{"H":[]},"bi":{"H":[]},"e5":{"d4":[]},"h3":{"r":["1"],"x":["1"],"H":[],"k":["1"]},"cp":{"N":["1"]},"c0":{"q":[],"ab":[],"ac":["ab"]},"cE":{"q":[],"h":[],"ab":[],"ac":["ab"],"C":[]},"e7":{"q":[],"ab":[],"ac":["ab"],"C":[]},"bg":{"v":[],"ac":["v"],"kB":[],"C":[]},"cd":{"k":["2"]},"cs":{"N":["2"]},"dd":{"D":["2"],"x":["2"],"cd":["1","2"],"k":["2"]},"ct":{"dd":["1","2"],"D":["2"],"x":["2"],"cd":["1","2"],"k":["2"],"D.E":"2","k.E":"2"},"cJ":{"I":[]},"ay":{"k":["1"]},"O":{"ay":["1"],"k":["1"]},"d7":{"O":["1"],"ay":["1"],"k":["1"],"k.E":"1","O.E":"1"},"ae":{"N":["1"]},"cN":{"k":["2"],"k.E":"2"},"cO":{"N":["2"]},"af":{"O":["2"],"ay":["2"],"k":["2"],"k.E":"2","O.E":"2"},"a0":{"k":["1"],"k.E":"1"},"F":{"N":["1"]},"d3":{"O":["1"],"ay":["1"],"k":["1"],"k.E":"1","O.E":"1"},"ag":{"bn":[],"bb":[]},"dm":{"bn":[],"bb":[]},"dn":{"bn":[],"bb":[]},"cx":{"d8":["1","2"],"cg":["1","2"],"c1":["1","2"],"dx":["1","2"],"an":["1","2"]},"cw":{"an":["1","2"]},"M":{"cw":["1","2"],"an":["1","2"]},"bF":{"k":["1"],"k.E":"1"},"bG":{"N":["1"]},"cy":{"b5":["1"],"bl":["1"],"k":["1"]},"aN":{"cy":["1"],"b5":["1"],"bl":["1"],"k":["1"]},"cV":{"b6":[],"I":[]},"e8":{"I":[]},"eL":{"I":[]},"dr":{"bm":[]},"bd":{"bu":[]},"dO":{"bu":[]},"dP":{"bu":[]},"eH":{"bu":[]},"eE":{"bu":[]},"bU":{"bu":[]},"eu":{"I":[]},"aX":{"bx":["1","2"],"kt":["1","2"],"an":["1","2"]},"aZ":{"ay":["1"],"k":["1"],"k.E":"1"},"cL":{"N":["1"]},"b0":{"ay":["1"],"k":["1"],"k.E":"1"},"b_":{"N":["1"]},"aY":{"ay":["a6<1,2>"],"k":["a6<1,2>"],"k.E":"a6<1,2>"},"cK":{"N":["a6<1,2>"]},"bn":{"bb":[]},"c2":{"H":[],"C":[]},"cT":{"H":[]},"ec":{"H":[],"C":[]},"a3":{"al":["1"],"H":[]},"cR":{"D":["q"],"a3":["q"],"x":["q"],"al":["q"],"H":[],"k":["q"],"ad":["q"]},"cS":{"D":["h"],"a3":["h"],"x":["h"],"al":["h"],"H":[],"k":["h"],"ad":["h"]},"cQ":{"fM":[],"D":["q"],"a3":["q"],"x":["q"],"al":["q"],"H":[],"k":["q"],"ad":["q"],"C":[],"D.E":"q"},"ed":{"fN":[],"D":["q"],"a3":["q"],"x":["q"],"al":["q"],"H":[],"k":["q"],"ad":["q"],"C":[],"D.E":"q"},"ee":{"D":["h"],"a3":["h"],"x":["h"],"al":["h"],"H":[],"k":["h"],"ad":["h"],"C":[],"D.E":"h"},"ef":{"D":["h"],"a3":["h"],"x":["h"],"al":["h"],"H":[],"k":["h"],"ad":["h"],"C":[],"D.E":"h"},"eg":{"D":["h"],"a3":["h"],"x":["h"],"al":["h"],"H":[],"k":["h"],"ad":["h"],"C":[],"D.E":"h"},"eh":{"D":["h"],"a3":["h"],"x":["h"],"al":["h"],"H":[],"k":["h"],"ad":["h"],"C":[],"D.E":"h"},"ei":{"D":["h"],"a3":["h"],"x":["h"],"al":["h"],"H":[],"k":["h"],"ad":["h"],"C":[],"D.E":"h"},"cU":{"D":["h"],"a3":["h"],"x":["h"],"al":["h"],"H":[],"k":["h"],"ad":["h"],"C":[],"D.E":"h"},"ej":{"eJ":[],"D":["h"],"a3":["h"],"x":["h"],"al":["h"],"H":[],"k":["h"],"ad":["h"],"C":[],"D.E":"h"},"f1":{"I":[]},"ds":{"b6":[],"I":[]},"aJ":{"N":["1"]},"aS":{"k":["1"],"k.E":"1"},"aw":{"I":[]},"dc":{"eX":["1"]},"T":{"bv":["1"]},"dB":{"kT":[]},"fc":{"dB":[],"kT":[]},"de":{"bx":["1","2"],"an":["1","2"]},"dh":{"de":["1","2"],"bx":["1","2"],"an":["1","2"]},"df":{"ay":["1"],"k":["1"],"k.E":"1"},"dg":{"N":["1"]},"aI":{"b5":["1"],"kv":["1"],"bl":["1"],"k":["1"]},"bH":{"N":["1"]},"bx":{"an":["1","2"]},"c1":{"an":["1","2"]},"d8":{"cg":["1","2"],"c1":["1","2"],"dx":["1","2"],"an":["1","2"]},"b5":{"bl":["1"],"k":["1"]},"dp":{"b5":["1"],"bl":["1"],"k":["1"]},"d9":{"b5":["1"],"fl":["1"],"bl":["1"],"k":["1"]},"bt":{"ac":["bt"]},"q":{"ab":[],"ac":["ab"]},"h":{"ab":[],"ac":["ab"]},"x":{"k":["1"]},"ab":{"ac":["ab"]},"bl":{"k":["1"]},"v":{"ac":["v"],"kB":[]},"dJ":{"I":[]},"b6":{"I":[]},"aM":{"I":[]},"cZ":{"I":[]},"e3":{"I":[]},"da":{"I":[]},"eK":{"I":[]},"ca":{"I":[]},"dQ":{"I":[]},"d6":{"I":[]},"fj":{"bm":[]},"ao":{"b4":[]},"ar":{"b4":[]},"aO":{"b4":[]},"bf":{"b4":[]},"el":{"b4":[]},"dZ":{"mw":[]},"d_":{"mz":[]},"f5":{"aq":[]},"es":{"mB":[]},"fk":{"aq":[]},"f9":{"my":[]},"f2":{"lX":[]},"ew":{"mD":[]},"ai":{"ac":["ai"]},"ah":{"ac":["ah"]},"cq":{"B":[]},"eV":{"y":[]},"dL":{"B":[]},"eW":{"y":[]},"dS":{"B":[]},"eY":{"y":[]},"cz":{"B":[]},"f_":{"y":[]},"dV":{"B":[]},"f0":{"y":[]},"e2":{"B":[]},"f4":{"y":[]},"cP":{"B":[]},"f7":{"y":[]},"dN":{"mx":[]},"cY":{"B":[]},"fa":{"y":[]},"eq":{"B":[]},"fb":{"y":[]},"ez":{"B":[]},"fe":{"y":[]},"eA":{"B":[]},"ff":{"y":[]},"eD":{"B":[]},"fh":{"y":[]},"eC":{"B":[]},"fg":{"y":[]},"eN":{"B":[]},"fm":{"y":[]},"eO":{"B":[]},"fo":{"y":[]},"fn":{"y":[]},"eR":{"B":[]},"fr":{"y":[]},"dT":{"lT":[]},"bc":{"aE":[]},"eP":{"lZ":[]},"m1":{"x":["h"],"k":["h"]},"eJ":{"x":["h"],"k":["h"]},"mI":{"x":["h"],"k":["h"]},"m_":{"x":["h"],"k":["h"]},"mG":{"x":["h"],"k":["h"]},"m0":{"x":["h"],"k":["h"]},"mH":{"x":["h"],"k":["h"]},"fM":{"x":["q"],"k":["q"]},"fN":{"x":["q"],"k":["q"]}}'))
A.nd(v.typeUniverse,JSON.parse('{"dC":2,"a3":1,"dp":1,"dy":1}'))
var u={l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",b:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nuniform vec3 uClearColor;\nuniform vec3 uSkyHorizon;\nuniform vec3 uSkyZenith;\nuniform vec3 uSkyGround;\nuniform float uSkyEnabled;\nuniform float uSkyHorizonGlow;\nuniform float uSkyStarDensity;\nuniform sampler2D uSkyTexture;\nuniform float uSkyTextureEnabled;\nuniform float uSkyRotation;\nuniform float uSkyExposure;\nuniform float uSkyTextureSrgb;\nuniform mat4 uInverseProjection;\nuniform mat4 uInverseView;\nuniform vec3 uCameraPosition;\nuniform float uCloudCoverage;\nuniform float uCloudDensity;\nuniform float uCloudBaseHeight;\nuniform float uCloudThickness;\nuniform float uCloudScale;\nuniform vec2 uCloudWind;\nuniform float uCloudPhase;\nuniform float uCloudDetail;\nuniform float uCloudSilverLining;\nuniform float uCloudSampleCount;\nuniform vec3 uCloudLightDirection;\nuniform vec3 uCloudLightColor;\nuniform float uCloudLightIntensity;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 acesToneMap(vec3 color){\n  return clamp((color*(2.51*color+0.03))/(color*(2.43*color+0.59)+0.14),0.0,1.0);\n}\n\nvec3 agxToneMap(vec3 color){\n  const mat3 agxMat=mat3(\n    0.842479062253094,0.0423282422610123,0.0423756549057051,\n    0.0784335999999992,0.878468636469772,0.0784336,\n    0.0792237451477643,0.0791661274605434,0.879142973793104\n  );\n  const mat3 agxMatInv=mat3(\n    1.19687902425764,-0.0528968517032958,-0.0529716355080549,\n    -0.0980208811401368,1.15190312990417,-0.0980434501171241,\n    -0.0990297440797205,-0.0989611768448433,1.15107367264185\n  );\n  vec3 val=agxMat*color;\n  val=clamp(log2(max(val,vec3(1e-10)))*0.0625+0.625,0.0,1.0);\n  val=val*val*val*(val*(val*6.0-15.0)+10.0);\n  val=agxMatInv*val;\n  return max(val,vec3(0.0));\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nvec3 skyBackground(vec2 uv){\n  // A deliberately cheap, high-quality fallback sky: three atmospheric bands\n  // provide depth at every camera angle, while the tiny deterministic star\n  // field and horizon glow keep the clear background from reading as a flat\n  // color. It is an environment layer, not a game/weather simulation.\n  float lower=smoothstep(0.0,0.48,uv.y);\n  float upper=smoothstep(0.42,1.0,uv.y);\n  vec3 color=mix(uSkyGround,uSkyHorizon,lower);\n  color=mix(color,uSkyZenith,upper);\n  float horizonGlow=exp(-pow((uv.y-0.48)*7.0,2.0));\n  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);\n  float starMask=smoothstep(0.62,0.92,uv.y);\n  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),hash(floor(uv*vec2(180.0,100.0))))*starMask;\n  color+=vec3(0.16,0.19,0.24)*stars;\n  return max(color,vec3(0.0));\n}\n\nfloat hash3(vec3 p){\n  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);\n}\n\nfloat valueNoise(vec3 p){\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  f=f*f*(3.0-2.0*f);\n  float n000=hash3(i+vec3(0,0,0));\n  float n100=hash3(i+vec3(1,0,0));\n  float n010=hash3(i+vec3(0,1,0));\n  float n110=hash3(i+vec3(1,1,0));\n  float n001=hash3(i+vec3(0,0,1));\n  float n101=hash3(i+vec3(1,0,1));\n  float n011=hash3(i+vec3(0,1,1));\n  float n111=hash3(i+vec3(1,1,1));\n  float x00=mix(n000,n100,f.x);\n  float x10=mix(n010,n110,f.x);\n  float x01=mix(n001,n101,f.x);\n  float x11=mix(n011,n111,f.x);\n  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);\n}\n\nfloat cloudNoise(vec3 p){\n  float value=0.0;\n  float amplitude=0.5;\n  for(int octave=0;octave<4;octave++){\n    value+=valueNoise(p)*amplitude;\n    p=p*2.03+vec3(17.3,11.7,7.1);\n    amplitude*=0.5;\n  }\n  return value;\n}\n\nfloat cloudDensityAt(vec3 position){\n  float height01=clamp(\n    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),\n    0.0,1.0\n  );\n  float vertical=smoothstep(0.0,0.12,height01)*\n    (1.0-smoothstep(0.72,1.0,height01));\n  vec3 q=position*max(uCloudScale,0.00001)+\n    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);\n  float macro=cloudNoise(q*0.82);\n  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));\n  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));\n  float threshold=1.0-clamp(uCloudCoverage,0.,1.);\n  float body=smoothstep(threshold,threshold+0.26,shape);\n  return body*vertical*clamp(uCloudDensity,0.,1.);\n}\n\nvec4 volumetricClouds(vec3 worldDirection){\n  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){\n    return vec4(0.0);\n  }\n  float directionY=max(worldDirection.y,0.001);\n  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;\n  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;\n  startT=max(startT,0.0);\n  endT=max(endT,0.0);\n  if(endT<=startT) return vec4(0.0);\n  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));\n  float stepLength=(endT-startT)/float(sampleCount);\n  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;\n  vec3 sunDirection=normalize(-uCloudLightDirection);\n  float transmittance=1.0;\n  vec3 inScatter=vec3(0.0);\n  for(int i=0;i<24;i++){\n    if(i>=sampleCount) break;\n    float t=startT+(float(i)+0.5)*stepLength+jitter;\n    vec3 position=uCameraPosition+worldDirection*t;\n    float density=cloudDensityAt(position);\n    float opticalDepth=density*stepLength*0.0035;\n    float segmentAlpha=1.0-exp(-opticalDepth);\n    float towardLight=cloudDensityAt(position+sunDirection*90.0);\n    float lightTransmittance=exp(-towardLight*0.025);\n    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);\n    vec3 ambient=uSkyHorizon*0.32;\n    vec3 direct=uCloudLightColor*\n      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;\n    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;\n    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);\n    inScatter+=transmittance*segmentAlpha*sampleLight;\n    transmittance*=1.0-segmentAlpha;\n    if(transmittance<0.01) break;\n  }\n  return vec4(inScatter,1.0-transmittance);\n}\n\nvec3 srgbToLinear(vec3 color){\n  vec3 low=color/12.92;\n  vec3 high=pow((color+0.055)/1.055,vec3(2.4));\n  return mix(low,high,step(vec3(0.04045),color));\n}\n\nvec3 worldDirectionForUv(vec2 uv){\n  vec2 ndc=uv*2.0-1.0;\n  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);\n  return normalize(viewPoint.xyz/viewPoint.w);\n}\n\nvec3 equirectangularSky(vec2 uv){\n  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);\n  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;\n  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));\n  vec2 sampleUv=vec2(\n    fract(longitude/(2.0*3.14159265359)+0.5),\n    0.5-latitude/3.14159265359\n  );\n  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));\n  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));\n  return linear*max(uSkyExposure,0.0);\n}\n\nvoid main(){\n  vec4 source=texture(uTex,vUv);\n  // The world pass clears untouched pixels to uClearColor. Replace only that\n  // exact background, so the sky is always active without covering geometry.\n  if(uSkyEnabled>0.5 && distance(source.rgb,uClearColor)<0.004){\n    vec3 viewDirection=worldDirectionForUv(vUv);\n    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);\n    source.rgb=uSkyTextureEnabled>0.5\n      ? equirectangularSky(vUv)\n      : skyBackground(vUv);\n    vec4 clouds=volumetricClouds(worldDirection);\n    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;\n  }\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  vec3 mapped=uToneMap>3.0\n    ?agxToneMap(color)\n    :(uToneMap>1.5?acesToneMap(color):reinhardToneMap(color));\n  float toneMix=uToneMap>3.0\n    ?clamp(uToneMap-3.0,0.,1.)\n    :(uToneMap>1.5?clamp(uToneMap-1.5,0.,1.):clamp(uToneMap,0.,1.));\n  color=mix(color,mapped,toneMix);\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  // Atmospheric precipitation is submitted as depth-tested world geometry;\n  // the present pass must never paint weather over unrelated surfaces.\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",f:"Transform.scale must be finite and positive: ",k:"WebGl2Device: operation attempted while context is not ready"}
var t=(function rtii(){var s=A.bN
return{v:s("aw"),g0:s("ah"),fW:s("dM"),do:s("bV"),e8:s("ac<@>"),dN:s("cv"),I:s("M<v,h>"),P:s("aN<v>"),df:s("bt"),Q:s("I"),B:s("fM"),gN:s("fN"),o:s("R"),Z:s("bu"),j:s("aE"),cr:s("k<cv>"),bM:s("k<q>"),hf:s("k<@>"),J:s("r<aE>"),b7:s("r<a5>"),gk:s("r<bw>"),cU:s("r<E>"),dV:s("r<bz>"),e:s("r<bk>"),eT:s("r<c5>"),cw:s("r<+influence,light(q,aj)>"),gg:s("r<+influence,source(q,db)>"),f:s("r<B>"),u:s("r<y>"),cR:s("r<d_>"),C:s("r<n>"),c4:s("r<c8>"),h:s("r<aq>"),D:s("r<ev>"),aM:s("r<V<ah>>"),c1:s("r<V<ai>>"),w:s("r<aj>"),s:s("r<v>"),gi:s("r<f>"),q:s("r<db>"),cL:s("r<f8>"),ha:s("r<bo<by>>"),c9:s("r<bo<bj>>"),aO:s("r<bo<c8>>"),fq:s("r<bo<iu>>"),n:s("r<q>"),r:s("r<@>"),t:s("r<h>"),T:s("cF"),m:s("H"),E:s("bh"),aU:s("al<@>"),_:s("x<a5>"),O:s("x<E>"),dy:s("x<v>"),aH:s("x<@>"),bW:s("x<h>"),ao:s("a6<v,R>"),bS:s("an<v,aE>"),a1:s("an<v,E>"),eL:s("aO"),cA:s("ao"),a:s("Y"),K:s("w"),fy:s("ai"),z:s("E"),eD:s("c5"),W:s("ap"),gT:s("oK"),bQ:s("+()"),ai:s("+(ao,bj)"),dU:s("+(ar,iu)"),fk:s("+influence,light(q,aj)"),eS:s("+influence,source(q,db)"),fA:s("y"),b0:s("aQ<bf,c8>"),ex:s("aQ<aO,by>"),cE:s("aQ<ao,bj>"),g2:s("aQ<ar,iu>"),L:s("n"),Y:s("aq"),U:s("bl<v>"),cJ:s("bl<h>"),b:s("V<ah>"),k:s("V<ai>"),l:s("bm"),d5:s("a7"),N:s("v"),aj:s("ar"),dm:s("C"),eK:s("b6"),ak:s("bC"),am:s("d9<v>"),bw:s("eM"),fP:s("f"),G:s("a8"),fl:s("a0<a8>"),an:s("F<a8>"),c:s("T<@>"),cd:s("T<~>"),hg:s("dh<w?,w?>"),a8:s("cf"),eM:s("aS<aq>"),V:s("dz"),R:s("dA"),y:s("z"),al:s("z(w)"),fg:s("z(a8)"),i:s("q"),A:s("@"),fO:s("@()"),x:s("@(w)"),d:s("@(w,bm)"),S:s("h"),eB:s("dU?"),eH:s("bv<Y>?"),du:s("r<w?>?"),bX:s("H?"),c3:s("x<bk>?"),X:s("w?"),ac:s("cW?"),bG:s("eB?"),dk:s("v?"),F:s("bE<@,@>?"),g:s("f6?"),fQ:s("z?"),cD:s("q?"),h6:s("h?"),cg:s("ab?"),a4:s("~(bX)?"),p:s("ab"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.bI=J.e4.prototype
B.a=J.r.prototype
B.i=J.cE.prototype
B.n=J.c0.prototype
B.t=J.bg.prototype
B.bJ=J.bh.prototype
B.bK=J.cH.prototype
B.a0=A.cQ.prototype
B.aI=J.em.prototype
B.ai=J.bC.prototype
B.dY=new A.fw(0,"opaque")
B.G=new A.fx(0,"add")
B.b3=new A.bT(0,"zero")
B.E=new A.bT(1,"one")
B.R=new A.fy(0,"alpha")
B.dZ=new A.fF()
B.D=new A.f(0.6,-1,0.4)
B.az=new A.S(1,0.95,0.88)
B.b6=new A.dU()
B.at=new A.h_(1,"linear")
B.au=new A.h0(0,"clampToEdge")
B.b7=new A.fZ()
B.am=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.b8=function() {
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
B.bd=function(getTagFallback) {
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
B.b9=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.bc=function(hooks) {
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
B.bb=function(hooks) {
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
B.ba=function(hooks) {
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
B.an=function(hooks) { return hooks; }

B.z=new A.w()
B.h=new A.hS()
B.aA=new A.S(0.12,0.16,0.24)
B.bV=new A.S(0.03,0.06,0.14)
B.aB=new A.S(0.015,0.02,0.03)
B.be=new A.eB()
B.j=new A.f(0,1,0)
B.o=new A.f(0,-1,0)
B.O=new A.S(1,1,1)
B.bf=new A.aj()
B.dJ=new A.b9(0,"position")
B.dO=new A.a8(B.dJ,0,3)
B.b0=new A.b9(1,"normal")
B.dP=new A.a8(B.b0,3,3)
B.al=new A.b9(6,"tangent4")
B.dT=new A.a8(B.al,6,4)
B.dK=new A.b9(2,"color")
B.dQ=new A.a8(B.dK,10,4)
B.dL=new A.b9(4,"alpha")
B.dR=new A.a8(B.dL,14,1)
B.dM=new A.b9(5,"uv0")
B.dS=new A.a8(B.dM,15,2)
B.dN=new A.b9(8,"legacyMaterialEffect")
B.dU=new A.a8(B.dN,17,1)
B.A=s([B.dO,B.dP,B.dT,B.dQ,B.dR,B.dS,B.dU],A.bN("r<a8>"))
B.bg=new A.i_()
B.bh=new A.i4()
B.p=new A.fc()
B.H=new A.fj()
B.S=new A.cu(0,"colorOnly")
B.ao=new A.cu(1,"colorAndDepth")
B.T=new A.cu(2,"depthOnly")
B.U=new A.fz(1,"srgb")
B.I=new A.fC(1,"back")
B.J=new A.fG(0,"less")
B.K=new A.cA(0,"opaque")
B.bi=new A.cA(1,"masked")
B.V=new A.cA(2,"blended")
B.bj=new A.bW(!1,B.J,!1,!0,B.E,B.E,B.G,!1,B.I,!0,!1,!0,!0,!0,!0,!1)
B.bk=new A.bW(!0,B.J,!1,!0,B.E,B.E,B.G,!0,B.I,!0,!1,!0,!0,!0,!0,!1)
B.b4=new A.bT(2,"srcAlpha")
B.b5=new A.bT(3,"oneMinusSrcAlpha")
B.bl=new A.bW(!0,B.J,!1,!0,B.b4,B.b5,B.G,!0,B.I,!0,!1,!0,!0,!0,!0,!1)
B.bP=new A.S(0.03,0.03,0.04)
B.v=new A.S(0,0,0)
B.c6=s([],t.e)
B.Z=s([],t.w)
B.c7=s([],t.q)
B.c8=s([],A.bN("r<oM>"))
B.bm=new A.dY(B.bP,B.v,0,1,null,null,B.O,0.02,0,0.7,0.35,1,12,1,1,1,1,1,1,1,0.003,B.v,0,0,B.O,0,null,B.c6,B.Z,B.c7,B.c8,null)
B.bn=new A.R(0,0,0)
B.bo=new A.bY(0,"idle")
B.L=new A.bY(1,"active")
B.bp=new A.bY(2,"ended")
B.bq=new A.bY(3,"aborted")
B.ap=new A.cC(0,"outside")
B.br=new A.cC(1,"intersects")
B.bs=new A.cC(2,"inside")
B.bt=new A.e0(0,"vertex")
B.aq=new A.e0(1,"indices")
B.ar=new A.fV(0,"staticDraw")
B.d=new A.e1(0,"ready")
B.M=new A.e1(1,"lost")
B.bu=new A.bZ(0,"color")
B.as=new A.bZ(1,"colorAndGlow")
B.bv=new A.bZ(2,"colorDepthGlow")
B.W=new A.bZ(3,"depthOnly")
B.bw=new A.aW(0,"beforeShadow")
B.bx=new A.aW(2,"beforeDepth")
B.X=new A.aW(3,"afterDepth")
B.av=new A.aW(4,"beforeWorld")
B.by=new A.aW(5,"afterWorld")
B.r=new A.aW(6,"afterResolve")
B.bz=new A.aW(9,"beforePresent")
B.aw=new A.aF(0,"readBeforeWrite")
B.bA=new A.aF(1,"duplicateWriter")
B.bB=new A.aF(2,"sampledMultisampledAttachment")
B.Y=new A.aF(3,"invalidResolve")
B.bC=new A.aF(4,"formatOrSizeMismatch")
B.bD=new A.aF(5,"unversionedReadWrite")
B.bE=new A.aF(6,"invalidHistoryRead")
B.bF=new A.aF(7,"dependencyCycle")
B.bG=new A.aF(8,"missingCapability")
B.ax=new A.c_(0,"wrongKind")
B.ay=new A.c_(1,"staleGeneration")
B.bH=new A.c_(2,"doubleRelease")
B.N=new A.c_(3,"releasedResource")
B.bL=new A.S(1,0.25,0.25)
B.bM=new A.S(0.95,0.12,0.22)
B.bN=new A.S(0.25,0.5,1)
B.bO=new A.S(0.04,0.05,0.07)
B.bQ=new A.S(0.1,0.85,0.45)
B.bR=new A.S(0.18,0.42,0.98)
B.bS=new A.S(0.2,1,0.45)
B.bT=new A.S(1,0.85,0.35)
B.bU=new A.S(0.98,0.12,0.22)
B.bW=new A.S(0.1,0.88,0.42)
B.bX=new A.S(0.7,0.8,1)
B.bY=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.bZ=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale","uShadowMapTexelSize","uShadowFilterRadius","uShadowBias","uReflectionColor","uReflectionIntensity","uReflectionConfidence","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uSpecularScale","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness","uSurfaceSnowCoverage","uSurfaceDissolution","uThermalSourceCount","uThermalSourcePosition0","uThermalSourceRadius0","uThermalSourceDissolution0","uThermalSourcePosition1","uThermalSourceRadius1","uThermalSourceDissolution1","uThermalSourcePosition2","uThermalSourceRadius2","uThermalSourceDissolution2","uThermalSourcePosition3","uThermalSourceRadius3","uThermalSourceDissolution3"],t.s)
B.c_=s(["uQuantizationBits","uDitherStrength"],t.s)
B.c0=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.c1=s(["uNear","uFar","uLightDir","uLightColor","uShaftIntensity","uFogDensity","uAnisotropy","uViewProjection","uView","uInverseProjection","uVolumetricAlbedo","uVolumetricHeightFalloff","uVolumetricDustDensity","uVolumetricJitter","uVolumetricIntensity","uVolumetricSampleCount"],t.s)
B.c2=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.c3=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.c4=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale"],t.s)
B.c5=s([],t.u)
B.a1=new A.c6(2,"high")
B.cz={shadows:0,ssao:1,bloom:2,dof:3,grade:4,volumetric:5}
B.da=new A.aN(B.cz,6,t.P)
B.cR=new A.ap(B.a1,B.da)
B.cs={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.d7=new A.aN(B.cs,5,t.P)
B.aL=new A.ap(B.a1,B.d7)
B.cO=new A.c6(1,"standard")
B.cA={shadows:0}
B.db=new A.aN(B.cA,1,t.P)
B.cQ=new A.ap(B.cO,B.db)
B.aJ=new A.c6(0,"safe")
B.aH={}
B.a6=new A.aN(B.aH,0,t.P)
B.aK=new A.ap(B.aJ,B.a6)
B.a_=s([B.cR,B.aL,B.cQ,B.aK],A.bN("r<ap>"))
B.c9=s(["uExposure","uVignette","uGrain","uOutputEncoding","uToneMap","uClearColor","uSkyHorizon","uSkyZenith","uSkyGround","uSkyEnabled","uSkyHorizonGlow","uSkyStarDensity","uSkyTexture","uSkyTextureEnabled","uSkyRotation","uSkyExposure","uSkyTextureSrgb","uInverseProjection","uInverseView","uCameraPosition","uCloudCoverage","uCloudDensity","uCloudBaseHeight","uCloudThickness","uCloudScale","uCloudWind","uCloudPhase","uCloudDetail","uCloudSilverLining","uCloudSampleCount","uCloudLightDirection","uCloudLightColor","uCloudLightIntensity"],t.s)
B.a7=new A.a7(0,"depthTest")
B.a8=new A.a7(1,"depthFunc")
B.a9=new A.a7(2,"depthWrite")
B.aa=new A.a7(3,"blendEnable")
B.ab=new A.a7(4,"blendFunc")
B.ac=new A.a7(5,"blendEquation")
B.ad=new A.a7(6,"cullEnable")
B.ae=new A.a7(7,"cullFace")
B.aT=new A.a7(8,"frontFace")
B.df=new A.a7(9,"stencilEnable")
B.aR=new A.a7(10,"colorMask")
B.aS=new A.a7(11,"scissorEnable")
B.ca=s([B.a7,B.a8,B.a9,B.aa,B.ab,B.ac,B.ad,B.ae,B.aT,B.df,B.aR,B.aS],A.bN("r<a7>"))
B.cb=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.cc=s(["uBloomStrength"],t.s)
B.cd=s(["uLutSize","uStrength"],t.s)
B.ce=s(["uTexelSize","uNear","uFar"],t.s)
B.aC=s(["uTexelStep"],t.s)
B.cf=s(["uVolumetricStrength"],t.s)
B.cB={uAlbedo:0}
B.aD=new A.M(B.cB,[0],t.I)
B.cI={uSsaoRaw:0,uSceneDepth:1}
B.cg=new A.M(B.cI,[0,1],t.I)
B.cF={uScene:0,uHistory:1}
B.ch=new A.M(B.cF,[0,1],t.I)
B.cw={aPosition:0,aUvMat:1}
B.aE=new A.M(B.cw,[0,4],t.I)
B.cG={uScene:0,uLut:1}
B.ci=new A.M(B.cG,[0,1],t.I)
B.cH={uSource:0}
B.aF=new A.M(B.cH,[0],t.I)
B.cy={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.cj=new A.M(B.cy,[0,1,2,3,4,5,6],t.I)
B.cu={uSharp:0,uBlurred:1,uSceneDepth:2}
B.ck=new A.M(B.cu,[0,1,2],t.I)
B.cJ={uTex:0,uSkyTexture:1}
B.cl=new A.M(B.cJ,[0,1],t.I)
B.cC={uBloom:0}
B.cm=new A.M(B.cC,[0],t.I)
B.cD={uSceneDepth:0}
B.aG=new A.M(B.cD,[0],t.I)
B.cE={uScene:0}
B.cn=new A.M(B.cE,[0],t.I)
B.m=new A.M(B.aH,[],t.I)
B.cr={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.co=new A.M(B.cr,[0,1,2,3,4,5,6],t.I)
B.cK={uVolumetric:0}
B.cp=new A.M(B.cK,[0],t.I)
B.cx={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.cq=new A.M(B.cx,[0,1,2,3],t.I)
B.e_=new A.ea(0,"srgb")
B.e0=new A.ea(1,"linear")
B.cL=new A.el(0,1,null)
B.aV=new A.cb(3,"agx")
B.cM=new A.cX(1.15,0.22,0.12,B.aV)
B.aU=new A.cb(1,"reinhard")
B.cN=new A.cX(1,0,0,B.aU)
B.cP=new A.c6(4,"shipping")
B.ct={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.d9=new A.aN(B.ct,7,t.P)
B.e1=new A.ap(B.cP,B.d9)
B.B=new A.bA(0,0,0,1)
B.a2=new A.c7(0,"constructed")
B.cS=new A.c7(1,"initializing")
B.a3=new A.c7(2,"ready")
B.a4=new A.c7(3,"contextLost")
B.c=new A.d2(0,"read")
B.e=new A.d2(1,"write")
B.u=new A.d2(2,"historyRead")
B.l=new A.er(0,"rgba8")
B.cT=new A.L("dofBlurH",B.l,192,108,1,0)
B.cU=new A.L("dofBlurV",B.l,192,108,1,0)
B.cV=new A.L("dofOutput",B.l,384,216,1,0)
B.aM=new A.er(2,"depth24")
B.cW=new A.L("shadowMap",B.aM,512,512,1,0)
B.cX=new A.L("volumetricLight",B.l,192,108,1,0)
B.cY=new A.L("sceneColor",B.l,384,216,1,1)
B.cZ=new A.L("ssaoRaw",B.l,192,108,1,0)
B.d_=new A.L("ssaoBlurred",B.l,192,108,1,0)
B.d0=new A.L("gradeOutput",B.l,384,216,1,0)
B.d1=new A.L("vhsOutput",B.l,384,216,1,0)
B.d2=new A.L("sceneDepth",B.aM,384,216,1,0)
B.d3=new A.L("bloomBlurH",B.l,192,108,1,0)
B.d4=new A.L("bloomBlurV",B.l,192,108,1,0)
B.d5=new A.L("present",B.l,384,216,1,0)
B.a5=new A.L("sceneColor",B.l,384,216,1,0)
B.d6=new A.L("ps1Output",B.l,384,216,1,0)
B.cv={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8,volumetric:9}
B.d8=new A.aN(B.cv,10,t.P)
B.aP=new A.c9(2,"link")
B.dc=new A.d5(B.aP,"gl.createProgram() returned null")
B.aN=new A.c9(0,"vertex")
B.aO=new A.c9(1,"fragment")
B.aQ=new A.c9(3,"validation")
B.dd=new A.ey(0,"full")
B.de=new A.ey(2,"culled")
B.dg=new A.cb(0,"off")
B.dh=new A.cb(2,"aces")
B.C=new A.f(0,0,0)
B.af=new A.aH(B.C,B.B,1)
B.di=A.aC("oA")
B.dj=A.aC("oB")
B.dk=A.aC("fM")
B.dl=A.aC("fN")
B.dm=A.aC("m_")
B.dn=A.aC("m0")
B.dp=A.aC("m1")
B.dq=A.aC("H")
B.dr=A.aC("w")
B.ds=A.aC("mG")
B.dt=A.aC("mH")
B.du=A.aC("mI")
B.dv=A.aC("eJ")
B.b=new A.b8(0,"float1")
B.ag=new A.b8(1,"float2")
B.f=new A.b8(2,"float3")
B.dw=new A.b8(3,"float4")
B.k=new A.b8(4,"mat4")
B.aW=new A.b8(5,"mat4Array")
B.ah=new A.e(B.b,0)
B.aX=new A.e(B.b,1)
B.w=new A.b8(6,"sampler")
B.q=new A.e(B.w,0)
B.F=new A.e(B.w,1)
B.aY=new A.e(B.w,2)
B.dx=new A.e(B.w,3)
B.dy=new A.e(B.w,4)
B.dz=new A.e(B.w,5)
B.dA=new A.e(B.w,6)
B.aj=new A.P(0.5,0.5)
B.aZ=new A.f(0,0,1)
B.b_=new A.f(0,0,-1)
B.dB=new A.f(0,1,1)
B.dC=new A.f(0,2,5)
B.x=new A.f(1,0,0)
B.dD=new A.f(1,0,1)
B.dE=new A.f(1,1,0)
B.dF=new A.f(1/0,1/0,1/0)
B.dG=new A.f(1,0.3,0.2)
B.ak=new A.f(0,0.5,0)
B.dH=new A.f(0,-0.2,-1)
B.y=new A.f(-1,0,0)
B.dI=new A.f(-1/0,-1/0,-1/0)
B.b1=new A.eU(0,"horizontal")
B.dV=new A.eU(1,"vertical")
B.b2=new A.eZ(0,"horizontal")
B.dW=new A.eZ(1,"vertical")
B.P=new A.dq(0,"empty")
B.dX=new A.dq(1,"cpuReady")
B.Q=new A.dq(4,"released")})();(function staticFields(){$.iq=null
$.av=A.c([],A.bN("r<w>"))
$.kC=null
$.kh=null
$.kg=null
$.lp=null
$.ll=null
$.lr=null
$.j4=null
$.ja=null
$.k4=null
$.ir=A.c([],A.bN("r<x<w>?>"))
$.ch=null
$.dE=null
$.dF=null
$.jW=!1
$.J=B.p})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"oD","lx",()=>A.j6("_$dart_dartClosure"))
s($,"oC","k7",()=>A.j6("_$dart_dartClosure_dartJSInterop"))
s($,"oZ","lI",()=>A.c([new J.e5()],A.bN("r<d4>")))
s($,"oN","ly",()=>A.b7(A.hZ({
toString:function(){return"$receiver$"}})))
s($,"oO","lz",()=>A.b7(A.hZ({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"oP","lA",()=>A.b7(A.hZ(null)))
s($,"oQ","lB",()=>A.b7(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"oT","lE",()=>A.b7(A.hZ(void 0)))
s($,"oU","lF",()=>A.b7(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"oS","lD",()=>A.b7(A.kJ(null)))
s($,"oR","lC",()=>A.b7(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"oW","lH",()=>A.b7(A.kJ(void 0)))
s($,"oV","lG",()=>A.b7(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"oX","kd",()=>A.mV())
s($,"oY","dH",()=>A.jh(B.dr))
s($,"oz","lw",()=>B.a5.c4())
s($,"oI","kc",()=>A.ek(A.c([255,255,255,255],t.t)))
s($,"oF","k9",()=>A.ek(A.c([128,128,255,255],t.t)))
s($,"oE","k8",()=>A.ek(A.c([0,0,0,255],t.t)))
s($,"oG","ka",()=>A.ek(A.c([255,255,0,255],t.t)))
s($,"oH","kb",()=>A.ek(A.c([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.c2,SharedArrayBuffer:A.c2,ArrayBufferView:A.cT,DataView:A.ec,Float32Array:A.cQ,Float64Array:A.ed,Int16Array:A.ee,Int32Array:A.ef,Int8Array:A.eg,Uint16Array:A.eh,Uint32Array:A.ei,Uint8ClampedArray:A.cU,CanvasPixelArray:A.cU,Uint8Array:A.ej})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.a3.$nativeSuperclassTag="ArrayBufferView"
A.di.$nativeSuperclassTag="ArrayBufferView"
A.dj.$nativeSuperclassTag="ArrayBufferView"
A.cR.$nativeSuperclassTag="ArrayBufferView"
A.dk.$nativeSuperclassTag="ArrayBufferView"
A.dl.$nativeSuperclassTag="ArrayBufferView"
A.cS.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$0=function(){return this()}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$6=function(a,b,c,d,e,f){return this(a,b,c,d,e,f)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.jb
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
