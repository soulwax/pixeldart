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
if(a[b]!==s){A.oq(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jX(b)
return new s(c,this)}:function(){if(s===null)s=A.jX(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jX(a).prototype
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
k2(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jZ(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.k0==null){A.ob()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.b(A.kD("Return interceptor for "+A.o(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iq
if(o==null)o=$.iq=A.j6(n)
p=q[o]}if(p!=null)return p
p=A.oh(a)
if(p!=null)return p
if(typeof a=="function")return B.bL
s=Object.getPrototypeOf(a)
if(s==null)return B.aJ
if(s===Object.prototype)return B.aJ
if(typeof q=="function"){o=$.iq
if(o==null)o=$.iq=A.j6(n)
Object.defineProperty(q,o,{value:B.ag,enumerable:false,writable:true,configurable:true})
return B.ag}return B.ag},
kk(a,b){if(a<0||a>4294967295)throw A.b(A.aP(a,0,4294967295,"length",null))
return J.km(new Array(a),b)},
kl(a,b){if(a<0)throw A.b(A.j("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("r<0>"))},
jv(a,b){if(a<0)throw A.b(A.j("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("r<0>"))},
km(a,b){var s=A.c(a,b.h("r<0>"))
s.$flags=1
return s},
lY(a,b){var s=t.e8
return J.ka(s.a(a),s.a(b))},
bN(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cE.prototype
return J.e7.prototype}if(typeof a=="string")return J.bh.prototype
if(a==null)return J.cF.prototype
if(typeof a=="boolean")return J.e6.prototype
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bi.prototype
if(typeof a=="symbol")return J.cI.prototype
if(typeof a=="bigint")return J.cG.prototype
return a}if(a instanceof A.w)return a
return J.jZ(a)},
j5(a){if(typeof a=="string")return J.bh.prototype
if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bi.prototype
if(typeof a=="symbol")return J.cI.prototype
if(typeof a=="bigint")return J.cG.prototype
return a}if(a instanceof A.w)return a
return J.jZ(a)},
cl(a){if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bi.prototype
if(typeof a=="symbol")return J.cI.prototype
if(typeof a=="bigint")return J.cG.prototype
return a}if(a instanceof A.w)return a
return J.jZ(a)},
o7(a){if(typeof a=="number")return J.c_.prototype
if(typeof a=="string")return J.bh.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bB.prototype
return a},
o8(a){if(typeof a=="string")return J.bh.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bB.prototype
return a},
aX(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bN(a).U(a,b)},
jp(a,b){if(typeof b==="number")if(Array.isArray(a)||A.of(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.cl(a).q(a,b)},
ft(a,b,c){return J.cl(a).D(a,b,c)},
fu(a,b){return J.cl(a).j(a,b)},
ka(a,b){return J.o7(a).G(a,b)},
jq(a,b){return J.cl(a).P(a,b)},
K(a){return J.bN(a).gH(a)},
a0(a){return J.cl(a).gt(a)},
bs(a){return J.j5(a).gn(a)},
dJ(a){return J.bN(a).gE(a)},
lD(a,b){return J.o8(a).cj(a,b)},
bR(a){return J.bN(a).i(a)},
e4:function e4(){},
e6:function e6(){},
cF:function cF(){},
cH:function cH(){},
bj:function bj(){},
em:function em(){},
bB:function bB(){},
bi:function bi(){},
cG:function cG(){},
cI:function cI(){},
r:function r(a){this.$ti=a},
e5:function e5(){},
h2:function h2(a){this.$ti=a},
co:function co(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
c_:function c_(){},
cE:function cE(){},
e7:function e7(){},
bh:function bh(){}},A={jw:function jw(){},
kn(a){return new A.cJ("Field '"+a+"' has been assigned during initialization.")},
lZ(a){return new A.cJ("Field '"+a+"' has not been initialized.")},
Z(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
eF(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
bL(a,b,c){return a},
k1(a){var s,r
for(s=$.av.length,r=0;r<s;++r)if(a===$.av[r])return!0
return!1},
hT(a,b,c,d){A.hE(b,"start")
if(c!=null){A.hE(c,"end")
if(b>c)A.m(A.aP(b,0,c,"start",null))}return new A.d8(a,b,c,d.h("d8<0>"))},
jt(){return new A.c9("No element")},
kj(){return new A.c9("Too many elements")},
cc:function cc(){},
cr:function cr(a,b){this.a=a
this.$ti=b},
de:function de(){},
cs:function cs(a,b){this.a=a
this.$ti=b},
cJ:function cJ(a){this.a=a},
hS:function hS(){},
ay:function ay(){},
O:function O(){},
d8:function d8(a,b,c,d){var _=this
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
a_:function a_(a,b,c){this.a=a
this.b=b
this.$ti=c},
F:function F(a,b,c){this.a=a
this.b=b
this.$ti=c},
ac:function ac(){},
d4:function d4(a,b){this.a=a
this.$ti=b},
dD:function dD(){},
kh(a,b,c){var s,r,q,p,o,n,m,l=A.u(a),k=A.h6(new A.b0(a,l.h("b0<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.A)(k),++i,p=o){r=k[i]
c.a(a.q(0,r))
o=p+1
q[r]=p}n=A.h6(new A.b2(a,l.h("b2<2>")),!0,c)
m=new A.M(q,n,b.h("@<0>").J(c).h("M<1,2>"))
m.$keys=k
return m}return new A.cw(A.m1(a,b,c),b.h("@<0>").J(c).h("cw<1,2>"))},
lL(){throw A.b(A.cb("Cannot modify constant Set"))},
lp(a){var s=A.lo(a)
if(s!=null)return s
return"minified:"+a},
of(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
o(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bR(a)
return s},
eo(a){var s,r=$.kv
if(r==null)r=$.kv=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
mj(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.i(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
ep(a){var s,r,q,p
if(a instanceof A.w)return A.au(A.bO(a),null)
s=J.bN(a)
if(s===B.bK||s===B.bM||t.ak.b(a)){r=B.ak(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.au(A.bO(a),null)},
kw(a){var s,r,q
if(a==null||typeof a=="number"||A.jR(a))return J.bR(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.be)return a.i(0)
if(a instanceof A.aS)return a.bO(!0)
s=$.lC()
for(r=0;r<1;++r){q=s[r].dU(a)
if(q!=null)return q}return"Instance of '"+A.ep(a)+"'"},
c3(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mi(a){var s=A.c3(a).getUTCFullYear()+0
return s},
mg(a){var s=A.c3(a).getUTCMonth()+1
return s},
mc(a){var s=A.c3(a).getUTCDate()+0
return s},
md(a){var s=A.c3(a).getUTCHours()+0
return s},
mf(a){var s=A.c3(a).getUTCMinutes()+0
return s},
mh(a){var s=A.c3(a).getUTCSeconds()+0
return s},
me(a){var s=A.c3(a).getUTCMilliseconds()+0
return s},
mb(a){var s=a.$thrownJsError
if(s==null)return null
return A.cm(s)},
kx(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.S(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
i(a,b){if(a==null)J.bs(a)
throw A.b(A.j3(a,b))},
j3(a,b){var s,r="index"
if(!A.l7(b))return new A.aM(!0,b,r,null)
s=A.a(J.bs(a))
if(b<0||b>=s)return A.h1(b,s,a,r)
return new A.d_(null,null,!0,b,r,"Value not in range")},
nU(a){return new A.aM(!0,a,null,null)},
dH(a){return a},
b(a){return A.S(a,new Error())},
S(a,b){var s
if(a==null)a=new A.b7()
b.dartException=a
s=A.or
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
or(){return J.bR(this.dartException)},
m(a,b){throw A.S(a,b==null?new Error():b)},
br(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.m(A.ni(a,b,c),s)},
ni(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.db("'"+s+"': Cannot "+o+" "+l+k+n)},
A(a){throw A.b(A.ax(a))},
b8(a){var s,r,q,p,o,n
a=A.ok(a.replace(String({}),"$receiver$"))
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
kC(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jx(a,b){var s=b==null,r=s?null:b.method
return new A.e8(a,r,s?null:b.receiver)},
bQ(a){var s
if(a==null)return new A.hj(a)
if(a instanceof A.cA){s=a.a
return A.bq(a,s==null?A.dE(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bq(a,a.dartException)
return A.nT(a)},
bq(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
nT(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.i.cZ(r,16)&8191)===10)switch(q){case 438:return A.bq(a,A.jx(A.o(s)+" (Error "+q+")",null))
case 445:case 5007:A.o(s)
return A.bq(a,new A.cV())}}if(a instanceof TypeError){p=$.ls()
o=$.lt()
n=$.lu()
m=$.lv()
l=$.ly()
k=$.lz()
j=$.lx()
$.lw()
i=$.lB()
h=$.lA()
g=p.Z(s)
if(g!=null)return A.bq(a,A.jx(A.aU(s),g))
else{g=o.Z(s)
if(g!=null){g.method="call"
return A.bq(a,A.jx(A.aU(s),g))}else if(n.Z(s)!=null||m.Z(s)!=null||l.Z(s)!=null||k.Z(s)!=null||j.Z(s)!=null||m.Z(s)!=null||i.Z(s)!=null||h.Z(s)!=null){A.aU(s)
return A.bq(a,new A.cV())}}return A.bq(a,new A.eK(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.d7()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bq(a,new A.aM(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.d7()
return a},
cm(a){var s
if(a instanceof A.cA)return a.b
if(a==null)return new A.ds(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.ds(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
jf(a){if(a==null)return J.K(a)
if(typeof a=="object")return A.eo(a)
return J.K(a)},
o5(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.D(0,a[s],a[r])}return b},
o6(a,b){var s,r=a.length
for(s=0;s<r;++s)b.j(0,a[s])
return b},
nv(a,b,c,d,e,f){t.Z.a(a)
switch(A.a(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.ib("Unsupported number of arguments for wrapped closure"))},
cj(a,b){var s=a.$identity
if(!!s)return s
s=A.o0(a,b)
a.$identity=s
return s},
o0(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.nv)},
lK(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.eD().constructor.prototype):Object.create(new A.bT(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.kg(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.lG(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.kg(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
lG(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.lE)}throw A.b("Error in functionType of tearoff")},
lH(a,b,c,d){var s=A.ke
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
kg(a,b,c,d){if(c)return A.lJ(a,b,d)
return A.lH(b.length,d,a,b)},
lI(a,b,c,d){var s=A.ke,r=A.lF
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
lJ(a,b,c){var s,r
if($.kc==null)$.kc=A.kb("interceptor")
if($.kd==null)$.kd=A.kb("receiver")
s=b.length
r=A.lI(s,c,a,b)
return r},
jX(a){return A.lK(a)},
lE(a,b){return A.dx(v.typeUniverse,A.bO(a.a),b)},
ke(a){return a.a},
lF(a){return a.b},
kb(a){var s,r,q,p=new A.bT("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.j("Field name "+a+" not found.",null))},
j6(a){return v.getIsolateTag(a)},
lm(){return v.G},
oh(a){var s,r,q,p,o,n=A.aU($.lj.$1(a)),m=$.j4[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ja[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bI($.lf.$2(a,n))
if(q!=null){m=$.j4[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ja[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.je(s)
$.j4[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.ja[n]=s
return s}if(p==="-"){o=A.je(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.lk(a,s)
if(p==="*")throw A.b(A.kD(n))
if(v.leafTags[n]===true){o=A.je(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.lk(a,s)},
lk(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.k2(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
je(a){return J.k2(a,!1,null,!!a.$iak)},
oi(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.je(s)
else return J.k2(s,c,null,null)},
ob(){if(!0===$.k0)return
$.k0=!0
A.oc()},
oc(){var s,r,q,p,o,n,m,l
$.j4=Object.create(null)
$.ja=Object.create(null)
A.oa()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.ll.$1(o)
if(n!=null){m=A.oi(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
oa(){var s,r,q,p,o,n,m=B.b8()
m=A.ci(B.b9,A.ci(B.ba,A.ci(B.al,A.ci(B.al,A.ci(B.bb,A.ci(B.bc,A.ci(B.bd(B.ak),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.lj=new A.j7(p)
$.lf=new A.j8(o)
$.ll=new A.j9(n)},
ci(a,b){return a(b)||b},
o1(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
op(a,b,c){var s=a.indexOf(b,c)
return s>=0},
ok(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
ag:function ag(a,b){this.a=a
this.b=b},
dn:function dn(a,b){this.a=a
this.b=b},
dp:function dp(a,b){this.a=a
this.b=b},
bn:function bn(a,b){this.a=a
this.b=b},
cw:function cw(a,b){this.a=a
this.$ti=b},
cv:function cv(){},
M:function M(a,b,c){this.a=a
this.b=b
this.$ti=c},
bE:function bE(a,b){this.a=a
this.$ti=b},
bF:function bF(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cx:function cx(){},
aN:function aN(a,b,c){this.a=a
this.b=b
this.$ti=c},
d5:function d5(){},
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
eK:function eK(a){this.a=a},
hj:function hj(a){this.a=a},
cA:function cA(a,b){this.a=a
this.b=b},
ds:function ds(a){this.a=a
this.b=null},
be:function be(){},
dP:function dP(){},
dQ:function dQ(){},
eG:function eG(){},
eD:function eD(){},
bT:function bT(a,b){this.a=a
this.b=b},
eu:function eu(a){this.a=a},
aZ:function aZ(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h3:function h3(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
b0:function b0(a,b){this.a=a
this.$ti=b},
cL:function cL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b2:function b2(a,b){this.a=a
this.$ti=b},
b1:function b1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b_:function b_(a,b){this.a=a
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
aS:function aS(){},
bc:function bc(){},
p(a){return a},
ek(a){return new Uint8Array(A.p(a))},
bJ(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.j3(b,a))},
c1:function c1(){},
cT:function cT(){},
ec:function ec(){},
a2:function a2(){},
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
dj:function dj(){},
dk:function dk(){},
dl:function dl(){},
dm:function dm(){},
jC(a,b){var s=b.c
return s==null?b.c=A.dv(a,"bv",[b.x]):s},
ky(a){var s=a.w
if(s===6||s===7)return A.ky(a.x)
return s===11||s===12},
mu(a){return a.as},
bM(a){return A.iy(v.typeUniverse,a,!1)},
bK(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bK(a1,s,a3,a4)
if(r===s)return a2
return A.kV(a1,r,!0)
case 7:s=a2.x
r=A.bK(a1,s,a3,a4)
if(r===s)return a2
return A.kU(a1,r,!0)
case 8:q=a2.y
p=A.ch(a1,q,a3,a4)
if(p===q)return a2
return A.dv(a1,a2.x,p)
case 9:o=a2.x
n=A.bK(a1,o,a3,a4)
m=a2.y
l=A.ch(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jK(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.ch(a1,j,a3,a4)
if(i===j)return a2
return A.kW(a1,k,i)
case 11:h=a2.x
g=A.bK(a1,h,a3,a4)
f=a2.y
e=A.nQ(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.kT(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.ch(a1,d,a3,a4)
o=a2.x
n=A.bK(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jL(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.dL("Attempted to substitute unexpected RTI kind "+a0))}},
ch(a,b,c,d){var s,r,q,p,o=b.length,n=A.iz(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bK(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
nR(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iz(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bK(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
nQ(a,b,c,d){var s,r=b.a,q=A.ch(a,r,c,d),p=b.b,o=A.ch(a,p,c,d),n=b.c,m=A.nR(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.f2()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
jY(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.o9(s)
return a.$S()}return null},
od(a,b){var s
if(A.ky(b))if(a instanceof A.be){s=A.jY(a)
if(s!=null)return s}return A.bO(a)},
bO(a){if(a instanceof A.w)return A.u(a)
if(Array.isArray(a))return A.H(a)
return A.jQ(J.bN(a))},
H(a){var s=a[v.arrayRti],r=t.r
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
u(a){var s=a.$ti
return s!=null?s:A.jQ(a)},
jQ(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.nr(a,s)},
nr(a,b){var s=a instanceof A.be?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.n8(v.typeUniverse,s.name)
b.$ccache=r
return r},
o9(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iy(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
k_(a){return A.aV(A.u(a))},
jV(a){var s
if(a instanceof A.aS)return a.bz()
s=a instanceof A.be?A.jY(a):null
if(s!=null)return s
if(t.dm.b(a))return J.dJ(a).a
if(Array.isArray(a))return A.H(a)
return A.bO(a)},
aV(a){var s=a.r
return s==null?a.r=new A.ix(a):s},
o4(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.i(q,0)
s=A.dx(v.typeUniverse,A.jV(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.i(q,r)
s=A.kY(v.typeUniverse,s,A.jV(q[r]))}return A.dx(v.typeUniverse,s,a)},
aE(a){return A.aV(A.iy(v.typeUniverse,a,!1))},
nq(a){var s=this
s.b=A.nO(s)
return s.b(a)},
nO(a){var s,r,q,p,o
if(a===t.K)return A.nB
if(A.bP(a))return A.nF
s=a.w
if(s===6)return A.no
if(s===1)return A.l9
if(s===7)return A.nw
r=A.nN(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bP)){a.f="$i"+q
if(q==="y")return A.nz
if(a===t.m)return A.ny
return A.nE}}else if(s===10){p=A.o1(a.x,a.y)
o=p==null?A.l9:p
return o==null?A.dE(o):o}return A.nm},
nN(a){if(a.w===8){if(a===t.S)return A.l7
if(a===t.i||a===t.p)return A.nA
if(a===t.N)return A.nD
if(a===t.y)return A.jR}return null},
np(a){var s=this,r=A.nl
if(A.bP(s))r=A.ne
else if(s===t.K)r=A.dE
else if(A.cn(s)){r=A.nn
if(s===t.h6)r=A.nd
else if(s===t.dk)r=A.bI
else if(s===t.fQ)r=A.nb
else if(s===t.cg)r=A.l1
else if(s===t.cD)r=A.nc
else if(s===t.bX)r=A.V}else if(s===t.S)r=A.a
else if(s===t.N)r=A.aU
else if(s===t.y)r=A.l0
else if(s===t.p)r=A.fr
else if(s===t.i)r=A.iB
else if(s===t.m)r=A.t
s.a=r
return s.a(a)},
nm(a){var s=this
if(a==null)return A.cn(s)
return A.og(v.typeUniverse,A.od(a,s),s)},
no(a){if(a==null)return!0
return this.x.b(a)},
nE(a){var s,r=this
if(a==null)return A.cn(r)
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bN(a)[s]},
nz(a){var s,r=this
if(a==null)return A.cn(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bN(a)[s]},
ny(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.w)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
l8(a){if(typeof a=="object"){if(a instanceof A.w)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
nl(a){var s=this
if(a==null){if(A.cn(s))return a}else if(s.b(a))return a
throw A.S(A.l2(a,s),new Error())},
nn(a){var s=this
if(a==null||s.b(a))return a
throw A.S(A.l2(a,s),new Error())},
l2(a,b){return new A.dt("TypeError: "+A.kN(a,A.au(b,null)))},
kN(a,b){return A.fG(a)+": type '"+A.au(A.jV(a),null)+"' is not a subtype of type '"+b+"'"},
aC(a,b){return new A.dt("TypeError: "+A.kN(a,b))},
nw(a){var s=this
return s.x.b(a)||A.jC(v.typeUniverse,s).b(a)},
nB(a){return a!=null},
dE(a){if(a!=null)return a
throw A.S(A.aC(a,"Object"),new Error())},
nF(a){return!0},
ne(a){return a},
l9(a){return!1},
jR(a){return!0===a||!1===a},
l0(a){if(!0===a)return!0
if(!1===a)return!1
throw A.S(A.aC(a,"bool"),new Error())},
nb(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.S(A.aC(a,"bool?"),new Error())},
iB(a){if(typeof a=="number")return a
throw A.S(A.aC(a,"double"),new Error())},
nc(a){if(typeof a=="number")return a
if(a==null)return a
throw A.S(A.aC(a,"double?"),new Error())},
l7(a){return typeof a=="number"&&Math.floor(a)===a},
a(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.S(A.aC(a,"int"),new Error())},
nd(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.S(A.aC(a,"int?"),new Error())},
nA(a){return typeof a=="number"},
fr(a){if(typeof a=="number")return a
throw A.S(A.aC(a,"num"),new Error())},
l1(a){if(typeof a=="number")return a
if(a==null)return a
throw A.S(A.aC(a,"num?"),new Error())},
nD(a){return typeof a=="string"},
aU(a){if(typeof a=="string")return a
throw A.S(A.aC(a,"String"),new Error())},
bI(a){if(typeof a=="string")return a
if(a==null)return a
throw A.S(A.aC(a,"String?"),new Error())},
t(a){if(A.l8(a))return a
throw A.S(A.aC(a,"JSObject"),new Error())},
V(a){if(a==null)return a
if(A.l8(a))return a
throw A.S(A.aC(a,"JSObject?"),new Error())},
lc(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.au(a[q],b)
return s},
nI(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.lc(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.au(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
l4(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
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
if(l===8){p=A.nS(a.x)
o=a.y
return o.length>0?p+("<"+A.lc(o,b)+">"):p}if(l===10)return A.nI(a,b)
if(l===11)return A.l4(a,b,null)
if(l===12)return A.l4(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.i(b,n)
return b[n]}return"?"},
nS(a){var s=A.lo(a)
if(s!=null)return s
return"minified:"+a},
n9(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
n8(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iy(a,b,!1)
else if(typeof m=="number"){s=m
r=A.dw(a,5,"#")
q=A.iz(s)
for(p=0;p<s;++p)q[p]=r
o=A.dv(a,b,q)
n[b]=o
return o}else return m},
n7(a,b){return A.kZ(a.tR,b)},
n6(a,b){return A.kZ(a.eT,b)},
iy(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.kX(a,null,b,!1)
r.set(b,s)
return s},
dx(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.kX(a,b,c,!0)
q.set(c,r)
return r},
kY(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jK(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
kX(a,b,c,d){return A.mZ(A.mT(a,b,c,d))},
bp(a,b){b.a=A.np
b.b=A.nq
return b},
dw(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aI(null,null)
s.w=b
s.as=c
r=A.bp(a,s)
a.eC.set(c,r)
return r},
kV(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.n4(a,b,r,c)
a.eC.set(r,s)
return s},
n4(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bP(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.cn(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.aI(null,null)
q.w=6
q.x=b
q.as=c
return A.bp(a,q)},
kU(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.n2(a,b,r,c)
a.eC.set(r,s)
return s},
n2(a,b,c,d){var s,r
if(d){s=b.w
if(A.bP(b)||b===t.K)return b
else if(s===1)return A.dv(a,"bv",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.aI(null,null)
r.w=7
r.x=b
r.as=c
return A.bp(a,r)},
n5(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aI(null,null)
s.w=13
s.x=b
s.as=q
r=A.bp(a,s)
a.eC.set(q,r)
return r},
du(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
n1(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
dv(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.du(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.aI(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bp(a,r)
a.eC.set(p,q)
return q},
jK(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.du(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.aI(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bp(a,o)
a.eC.set(q,n)
return n},
kW(a,b,c){var s,r,q="+"+(b+"("+A.du(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aI(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bp(a,s)
a.eC.set(q,r)
return r},
kT(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.du(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.du(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.n1(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aI(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bp(a,p)
a.eC.set(r,o)
return o},
jL(a,b,c,d){var s,r=b.as+("<"+A.du(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.n3(a,b,c,r,d)
a.eC.set(r,s)
return s},
n3(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iz(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bK(a,b,r,0)
m=A.ch(a,c,r,0)
return A.jL(a,n,m,c!==m)}}l=new A.aI(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bp(a,l)},
mT(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
mZ(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.mV(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kQ(a,r,l,k,!1)
else if(q===46)r=A.kQ(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bH(a.u,a.e,k.pop()))
break
case 94:k.push(A.n5(a.u,k.pop()))
break
case 35:k.push(A.dw(a.u,5,"#"))
break
case 64:k.push(A.dw(a.u,2,"@"))
break
case 126:k.push(A.dw(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.mX(a,k)
break
case 38:A.mW(a,k)
break
case 63:p=a.u
k.push(A.kV(p,A.bH(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.kU(p,A.bH(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.mU(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.kR(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.n_(a.u,a.e,o)
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
return A.bH(a.u,a.e,m)},
mV(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kQ(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.n9(s,o.x)[p]
if(n==null)A.m('No "'+p+'" in "'+A.mu(o)+'"')
d.push(A.dx(s,o,n))}else d.push(p)
return m},
mX(a,b){var s,r=a.u,q=A.kP(a,b),p=b.pop()
if(typeof p=="string")b.push(A.dv(r,p,q))
else{s=A.bH(r,a.e,p)
switch(s.w){case 11:b.push(A.jL(r,s,q,a.n))
break
default:b.push(A.jK(r,s,q))
break}}},
mU(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kP(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bH(p,a.e,o)
q=new A.f2()
q.a=s
q.b=n
q.c=m
b.push(A.kT(p,r,q))
return
case-4:b.push(A.kW(p,b.pop(),s))
return
default:throw A.b(A.dL("Unexpected state under `()`: "+A.o(o)))}},
mW(a,b){var s=b.pop()
if(0===s){b.push(A.dw(a.u,1,"0&"))
return}if(1===s){b.push(A.dw(a.u,4,"1&"))
return}throw A.b(A.dL("Unexpected extended operation "+A.o(s)))},
kP(a,b){var s=b.splice(a.p)
A.kR(a.u,a.e,s)
a.p=b.pop()
return s},
bH(a,b,c){if(typeof c=="string")return A.dv(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.mY(a,b,c)}else return c},
kR(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bH(a,b,c[s])},
n_(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bH(a,b,c[s])},
mY(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.b(A.dL("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.dL("Bad index "+c+" for "+b.i(0)))},
og(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.W(a,b,null,c,null)
r.set(c,s)}return s},
W(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bP(d))return!0
s=b.w
if(s===4)return!0
if(A.bP(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.W(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.W(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.W(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.W(a,b.x,c,d,e))return!1
return A.W(a,A.jC(a,b),c,d,e)}if(s===6)return A.W(a,p,c,d,e)&&A.W(a,b.x,c,d,e)
if(q===7){if(A.W(a,b,c,d.x,e))return!0
return A.W(a,b,c,A.jC(a,d),e)}if(q===6)return A.W(a,b,c,p,e)||A.W(a,b,c,d.x,e)
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
if(!A.W(a,j,c,i,e)||!A.W(a,i,e,j,c))return!1}return A.l6(a,b.x,c,d.x,e)}if(q===11){if(b===t.E)return!0
if(p)return!1
return A.l6(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.nx(a,b,c,d,e)}if(o&&q===10)return A.nC(a,b,c,d,e)
return!1},
l6(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.W(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.W(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.W(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.W(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.W(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
nx(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.dx(a,b,r[o])
return A.l_(a,p,null,c,d.y,e)}return A.l_(a,b.y,null,c,d.y,e)},
l_(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.W(a,b[s],d,e[s],f))return!1
return!0},
nC(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.W(a,r[s],c,q[s],e))return!1
return!0},
cn(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.bP(a))if(s!==6)r=s===7&&A.cn(a.x)
return r},
bP(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kZ(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iz(a){return a>0?new Array(a):v.typeUniverse.sEA},
aI:function aI(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
f2:function f2(){this.c=this.b=this.a=null},
ix:function ix(a){this.a=a},
f0:function f0(){},
dt:function dt(a){this.a=a},
mO(){var s,r,q
if(self.scheduleImmediate!=null)return A.nV()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.cj(new A.i7(s),1)).observe(r,{childList:true})
return new A.i6(s,r,q)}else if(self.setImmediate!=null)return A.nW()
return A.nX()},
mP(a){self.scheduleImmediate(A.cj(new A.i8(t.M.a(a)),0))},
mQ(a){self.setImmediate(A.cj(new A.i9(t.M.a(a)),0))},
mR(a){t.M.a(a)
A.n0(0,a)},
n0(a,b){var s=new A.iv()
s.cn(a,b)
return s},
jT(a){return new A.eR(new A.R($.J,a.h("R<0>")),a.h("eR<0>"))},
jP(a,b){a.$2(0,null)
b.b=!0
return b.a},
jM(a,b){A.nf(a,b)},
jO(a,b){b.aW(a)},
jN(a,b){b.aX(A.bQ(a),A.cm(a))},
nf(a,b){var s,r,q=new A.iC(b),p=new A.iD(b)
if(a instanceof A.R)a.bL(q,p,t.A)
else{s=t.A
if(a instanceof A.R)a.c6(q,p,s)
else{r=new A.R($.J,t.c)
r.a=8
r.c=a
r.bL(q,p,s)}}},
jW(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.J.c3(new A.iY(s),t.H,t.S,t.A)},
kS(a,b,c){return 0},
js(a){var s
if(t.Q.b(a)){s=a.gav()
if(s!=null)return s}return B.F},
ns(a,b){if($.J===B.p)return null
return null},
nt(a,b){if($.J!==B.p)A.ns(a,b)
if(b==null)if(t.Q.b(a)){b=a.gav()
if(b==null){A.kx(a,B.F)
b=B.F}}else b=B.F
else if(t.Q.b(a))A.kx(a,b)
return new A.aw(a,b)},
jF(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.mw()
b.aN(new A.aw(new A.aM(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bC(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aA()
b.aw(o.a)
A.cd(b,p)
return}b.a^=2
A.fs(null,null,b.b,t.M.a(new A.ih(o,b)))},
cd(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jU(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.cd(d.a,c)
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
A.jU(j.a,j.b)
return}g=$.J
if(g!==h)$.J=h
else g=null
c=c.c
if((c&15)===8)new A.il(q,d,n).$0()
else if(o){if((c&1)!==0)new A.ik(q,j).$0()}else if((c&2)!==0)new A.ij(d,q).$0()
if(g!=null)$.J=g
c=q.c
if(c instanceof A.R){p=q.a.$ti
p=p.h("bv<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aB(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.jF(c,f,!0)
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
nJ(a,b){var s
if(t.d.b(a))return b.c3(a,t.A,t.K,t.l)
s=t.x
if(s.b(a))return s.a(a)
throw A.b(A.aF(a,"onError",u.c))},
nH(){var s,r
for(s=$.cg;s!=null;s=$.cg){$.dG=null
r=s.b
$.cg=r
if(r==null)$.dF=null
s.a.$0()}},
nP(){$.jS=!0
try{A.nH()}finally{$.dG=null
$.jS=!1
if($.cg!=null)$.k9().$1(A.lg())}},
ld(a){var s=new A.eS(a),r=$.dF
if(r==null){$.cg=$.dF=s
if(!$.jS)$.k9().$1(A.lg())}else $.dF=r.b=s},
nM(a){var s,r,q,p=$.cg
if(p==null){A.ld(a)
$.dG=$.dF
return}s=new A.eS(a)
r=$.dG
if(r==null){s.b=p
$.cg=$.dG=s}else{q=r.b
s.b=q
$.dG=r.b=s
if(q==null)$.dF=s}},
oE(a,b){A.bL(a,"stream",t.K)
return new A.fh(b.h("fh<0>"))},
jU(a,b){A.nM(new A.iX(a,b))},
lb(a,b,c,d,e){var s,r=$.J
if(r===c)return d.$0()
$.J=c
s=r
try{r=d.$0()
return r}finally{$.J=s}},
nL(a,b,c,d,e,f,g){var s,r=$.J
if(r===c)return d.$1(e)
$.J=c
s=r
try{r=d.$1(e)
return r}finally{$.J=s}},
nK(a,b,c,d,e,f,g,h,i){var s,r=$.J
if(r===c)return d.$2(e,f)
$.J=c
s=r
try{r=d.$2(e,f)
return r}finally{$.J=s}},
fs(a,b,c,d){t.M.a(d)
if(B.p!==c){d=c.d9(d)
d=d}A.ld(d)},
i7:function i7(a){this.a=a},
i6:function i6(a,b,c){this.a=a
this.b=b
this.c=c},
i8:function i8(a){this.a=a},
i9:function i9(a){this.a=a},
iv:function iv(){},
iw:function iw(a,b){this.a=a
this.b=b},
eR:function eR(a,b){this.a=a
this.b=!1
this.$ti=b},
iC:function iC(a){this.a=a},
iD:function iD(a){this.a=a},
iY:function iY(a){this.a=a},
aK:function aK(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aT:function aT(a,b){this.a=a
this.$ti=b},
aw:function aw(a,b){this.a=a
this.b=b},
eW:function eW(){},
dd:function dd(a,b){this.a=a
this.$ti=b},
bD:function bD(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
R:function R(a,b){var _=this
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
eS:function eS(a){this.a=a
this.b=null},
fh:function fh(a){this.$ti=a},
dC:function dC(){},
fb:function fb(){},
is:function is(a,b){this.a=a
this.b=b},
iX:function iX(a,b){this.a=a
this.b=b},
kO(a,b){var s=a[b]
return s===a?null:s},
jH(a,b,c){if(c==null)a[b]=a
else a[b]=c},
jG(){var s=Object.create(null)
A.jH(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
m_(a,b){return new A.aZ(a.h("@<0>").J(b).h("aZ<1,2>"))},
m0(a,b,c){return b.h("@<0>").J(c).h("ko<1,2>").a(A.o5(a,new A.aZ(b.h("@<0>").J(c).h("aZ<1,2>"))))},
b3(a,b){return new A.aZ(a.h("@<0>").J(b).h("aZ<1,2>"))},
jy(a){return new A.aJ(a.h("aJ<0>"))},
al(a){return new A.aJ(a.h("aJ<0>"))},
cM(a,b){return b.h("kp<0>").a(A.o6(a,new A.aJ(b.h("aJ<0>"))))},
jJ(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
jI(a,b,c){var s=new A.bG(a,b,c.h("bG<0>"))
s.c=a.e
return s},
m1(a,b,c){var s=A.m_(b,c)
a.ao(0,new A.h4(s,b,c))
return s},
m2(a,b){var s,r,q=A.jy(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r)q.j(0,b.a(a[r]))
return q},
jz(a,b){var s=A.jy(b)
s.C(0,a)
return s},
h8(a){var s,r
if(A.k1(a))return"{...}"
s=new A.eE("")
try{r={}
B.a.j($.av,a)
s.a+="{"
r.a=!0
a.ao(0,new A.h9(r,s))
s.a+="}"}finally{if(0>=$.av.length)return A.i($.av,-1)
$.av.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
na(){throw A.b(A.cb("Cannot change an unmodifiable set"))},
df:function df(){},
di:function di(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
dg:function dg(a,b){this.a=a
this.$ti=b},
dh:function dh(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aJ:function aJ(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
f5:function f5(a){this.a=a
this.c=this.b=null},
bG:function bG(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
h4:function h4(a,b,c){this.a=a
this.b=b
this.c=c},
D:function D(){},
bx:function bx(){},
h9:function h9(a,b){this.a=a
this.b=b},
dy:function dy(){},
c0:function c0(){},
d9:function d9(){},
b6:function b6(){},
dq:function dq(){},
fk:function fk(){},
da:function da(a,b){this.a=a
this.$ti=b},
cf:function cf(){},
dz:function dz(){},
oe(a){var s=A.mj(a,null)
if(s!=null)return s
throw A.b(new A.fN(a))},
lP(a,b){a=A.S(a,new Error())
if(a==null)a=A.dE(a)
a.stack=b.i(0)
throw a},
h5(a,b,c,d){var s,r=c?J.kl(a,d):J.kk(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
h6(a,b,c){var s,r=A.c([],c.h("r<0>"))
for(s=J.a0(a);s.k();)B.a.j(r,c.a(s.gm()))
if(b)return r
r.$flags=1
return r},
az(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("r<0>"))
s=A.c([],b.h("r<0>"))
for(r=J.a0(a);r.k();)B.a.j(s,r.gm())
return s},
h7(a,b){var s=A.h6(a,!1,b)
s.$flags=3
return s},
kA(a,b,c){var s=J.a0(b)
if(!s.k())return a
if(c.length===0){do a+=A.o(s.gm())
while(s.k())}else{a+=A.o(s.gm())
while(s.k())a=a+c+A.o(s.gm())}return a},
mw(){return A.cm(new Error())},
lM(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
ki(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
dS(a){if(a>=10)return""+a
return"0"+a},
fG(a){if(typeof a=="number"||A.jR(a)||a==null)return J.bR(a)
if(typeof a=="string")return JSON.stringify(a)
return A.kw(a)},
lQ(a,b){A.bL(a,"error",t.K)
A.bL(b,"stackTrace",t.l)
A.lP(a,b)},
dL(a){return new A.dK(a)},
j(a,b){return new A.aM(!1,null,b,a)},
aF(a,b,c){return new A.aM(!0,a,b,c)},
aP(a,b,c,d,e){return new A.d_(b,c,!0,a,d,"Invalid value")},
mn(a,b,c){if(0>a||a>c)throw A.b(A.aP(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.aP(b,a,c,"end",null))
return b}return c},
hE(a,b){if(a<0)throw A.b(A.aP(a,0,null,b,null))
return a},
h1(a,b,c,d){return new A.e3(b,!0,a,d,"Index out of range")},
cb(a){return new A.db(a)},
kD(a){return new A.eJ(a)},
l(a){return new A.c9(a)},
ax(a){return new A.dR(a)},
lX(a,b,c){var s,r
if(A.k1(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.j($.av,a)
try{A.nG(a,s)}finally{if(0>=$.av.length)return A.i($.av,-1)
$.av.pop()}r=A.kA(b,t.hf.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
ju(a,b,c){var s,r
if(A.k1(a))return b+"..."+c
s=new A.eE(b)
B.a.j($.av,a)
try{r=s
r.a=A.kA(r.a,a,", ")}finally{if(0>=$.av.length)return A.i($.av,-1)
$.av.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
nG(a,b){var s,r,q,p,o,n,m,l=a.gt(a),k=0,j=0
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
c2(a,b,c,d,e,f){var s
if(B.h===c){s=J.K(a)
b=J.K(b)
return A.eF(A.Z(A.Z($.dI(),s),b))}if(B.h===d){s=J.K(a)
b=J.K(b)
c=J.K(c)
return A.eF(A.Z(A.Z(A.Z($.dI(),s),b),c))}if(B.h===e){s=J.K(a)
b=J.K(b)
c=J.K(c)
d=J.K(d)
return A.eF(A.Z(A.Z(A.Z(A.Z($.dI(),s),b),c),d))}if(B.h===f){s=J.K(a)
b=J.K(b)
c=J.K(c)
d=J.K(d)
e=J.K(e)
return A.eF(A.Z(A.Z(A.Z(A.Z(A.Z($.dI(),s),b),c),d),e))}s=J.K(a)
b=J.K(b)
c=J.K(c)
d=J.K(d)
e=J.K(e)
f=J.K(f)
f=A.eF(A.Z(A.Z(A.Z(A.Z(A.Z(A.Z($.dI(),s),b),c),d),e),f))
return f},
bt:function bt(a,b,c){this.a=a
this.b=b
this.c=c},
ia:function ia(){},
I:function I(){},
dK:function dK(a){this.a=a},
b7:function b7(){},
aM:function aM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
d_:function d_(a,b,c,d,e,f){var _=this
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
db:function db(a){this.a=a},
eJ:function eJ(a){this.a=a},
c9:function c9(a){this.a=a},
dR:function dR(a){this.a=a},
d7:function d7(){},
ib:function ib(a){this.a=a},
fN:function fN(a){this.a=a},
k:function k(){},
a5:function a5(a,b,c){this.a=a
this.b=b
this.$ti=c},
X:function X(){},
w:function w(){},
fi:function fi(){},
eE:function eE(a){this.a=a},
hi:function hi(a){this.a=a},
aD(a){var s
if(typeof a=="function")throw A.b(A.j("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.ng,a)
s[$.k3()]=a
return s},
ng(a,b,c){t.Z.a(a)
if(A.a(c)>=1)return a.$1(b)
return a.$0()},
li(a,b,c){return c.a(a[b])},
l5(a,b){return a[b]},
a9(a,b,c,d){return d.a(a[b].apply(a,c))},
oj(a,b){var s=new A.R($.J,b.h("R<0>")),r=new A.dd(s,b.h("dd<0>"))
a.then(A.cj(new A.jg(r,b),1),A.cj(new A.jh(r),1))
return s},
la(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
ck(a){if(A.la(a))return a
return new A.j1(new A.di(t.hg)).$1(a)},
jg:function jg(a,b){this.a=a
this.b=b},
jh:function jh(a){this.a=a},
j1:function j1(a){this.a=a},
hF:function hF(a){this.z=a},
c5:function c5(a,b){this.a=a
this.b=b},
ap:function ap(a,b){this.a=a
this.b=b},
fz:function fz(a,b){this.a=a
this.b=b},
fA:function fA(){this.a=null
this.d=0},
ca:function ca(a,b){this.a=a
this.b=b},
cX:function cX(a,b,c,d){var _=this
_.a=a
_.e=b
_.f=c
_.fr=d},
kf(a,b,c,d,e,f,g){var s,r,q,p
if(!d.gI(0)||d.ga0()<1e-12)throw A.b(A.j("CameraView.look requires a finite, nonzero forward: "+d.i(0),null))
if(!isFinite(e)||e<=0||e>=3.141592653589793)throw A.b(A.j("CameraView.look requires 0 < fovYRadians < pi: "+e,null))
s=d.gT()
if(g.a6(s).ga0()<1e-12)throw A.b(A.j("CameraView.look requires up ("+g.i(0)+") not parallel to forward ("+d.i(0)+")",null))
r=A.kr(b,s,g)
q=A.ks(a,c,e,f)
p=new A.cq(r,q,q.B(0,r),b,s,f,c,a)
p.v()
return p},
cq:function cq(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=_.x=$},
cB:function cB(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.dx=b
_.dy=c
_.fr=d
_.fx=e
_.fy=f
_.go=g
_.id=h},
fP:function fP(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=f},
fQ:function fQ(){this.b=this.a=0},
bf(a,b){return new A.h0(a,b)},
b5:function b5(){},
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
bg:function bg(a,b,c){this.a=a
this.b=b
this.c=c},
bZ:function bZ(a,b){this.a=a
this.b=b},
h0:function h0(a,b){this.a=a
this.b=b},
iZ(a,b,c,d){return A.nZ(a,b,c,d)},
nZ(a,b,a0,a1){var s=0,r=A.jT(t.fW),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c
var $async$iZ=A.jW(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:d=b.length
if(d===0)throw A.b(A.j("bootstrapRenderer requires a non-empty profile ladder",null))
a1.v()
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
return A.jM(a0.dl(k,a1),$async$iZ)
case 9:J.fu(n,new A.c4(l,null))
f=A.h6(n,!1,h)
f.$flags=3
g=new A.dN()
q=g
s=1
break
p=2
s=8
break
case 6:p=5
c=o.pop()
j=A.bQ(c)
J.fu(n,new A.c4(l,j))
if(J.aX(m,i))throw c
s=8
break
case 5:s=2
break
case 8:g=m
if(typeof g!=="number"){q=g.V()
s=1
break}m=g+1
s=3
break
case 4:throw A.b(A.l("bootstrapRenderer exhausted its ladder without a result"))
case 1:return A.jO(q,r)
case 2:return A.jN(o.at(-1),r)}})
return A.jP($async$iZ,r)},
o3(a){var s,r,q=B.a.b7(B.Y,new A.j2(a))
if(q>=0)return A.h7(B.a.ci(B.Y,q),t.W)
s=t.W
r=A.cM([a],s)
r.C(0,B.Y)
return A.h7(r,s)},
c4:function c4(a,b){this.a=a
this.b=b},
dN:function dN(){},
j2:function j2(a){this.a=a},
ol(a,b,c,d){var s,r,q,p,o,n,m=A.c([],t.cw)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.a.j(m,new A.dn(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.a.ab(m,new A.ji())
s=A.c([],t.w)
for(r=A.hT(m,0,A.bL(b,"count",t.S),t.fk),q=r.$ti,r=new A.ae(r,r.gn(0),q.h("ae<O.E>")),q=q.h("O.E");r.k();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
ad:function ad(a,b,c){this.a=a
this.b=b
this.c=c},
dV:function dV(a,b,c){this.a=a
this.b=b
this.c=c},
bz:function bz(a,b,c,d){var _=this
_.b=a
_.c=b
_.d=c
_.e=d},
aj:function aj(){},
ji:function ji(){},
e9(a,b){if(!isFinite(b)||b<0||b>1)throw A.b(A.j("MaterialDefinition."+a+" must be in [0, 1]: "+A.o(b),null))},
fv:function fv(a,b){this.a=a
this.b=b},
ea:function ea(a,b){this.a=a
this.b=b},
an:function an(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.d=b
_.e=c
_.f=d
_.at=e
_.ax=f
_.ch=g
_.CW=h},
m4(a){A:{break A}return a},
ba:function ba(a,b){this.a=a
this.b=b},
a7:function a7(a,b,c){this.a=a
this.b=b
this.c=c},
i_:function i_(){},
i0:function i0(){},
bk:function bk(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hc:function hc(){},
hd:function hd(){},
he:function he(){},
fE:function fE(){},
hm(a){var s,r,q="volumetric",p=t.N,o=A.cM(["sceneColor","present"],p),n=a.a.b
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
return new A.hl(new A.da(A.jz(o,p),t.am),r)},
hl:function hl(a,b){this.a=a
this.b=b},
hn:function hn(){},
hA:function hA(a){this.b=a},
et:function et(){this.a=null
this.c=0
this.d=!1},
cz:function cz(a,b){this.a=a
this.b=b},
fx:function fx(a,b){this.a=a
this.b=b},
c7:function c7(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=i},
kB(a,b,c,d,e){var s,r
if(!isFinite(c)||c<=0)throw A.b(A.j("SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: "+A.o(c),null))
if(!isFinite(d)||d<=0)throw A.b(A.j("SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: "+A.o(d),null))
s=c>d?d:c
r=new A.hU(b,a,B.n.c5(b*s),B.n.c5(a*s),s,!0)
r.v()
return r},
hU:function hU(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fy:function fy(a,b){this.a=a
this.b=b},
d1:function d1(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
c6:function c6(a,b){this.a=a
this.b=b},
Q:function Q(a,b,c){this.a=a
this.b=b
this.d=c},
fR:function fR(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f},
m3(){return new A.eb(new A.aQ(new A.hb(),A.c([],t.ha),A.c([],t.t),t.ex))},
eb:function eb(a){this.a=a},
hb:function hb(){},
le(a){var s=4
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
case 3:s=A.m(A.cb("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
nh(a,b,c){var s,r,q
for(s=0,r=0;r<7;++r){q=B.A[r]
if(A.le(q.a)===b)s+=q.c}return s},
m5(a){return new A.hf(a,new A.aQ(new A.hg(),A.c([],t.c9),A.c([],t.t),t.cE),A.b3(t.S,t.bw))},
kt(a){var s
A:{s=a.byteLength
break A}return s},
eL:function eL(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hf:function hf(a,b,c){this.a=a
this.b=b
this.c=c},
hg:function hg(){},
hh:function hh(){},
mx(a){var s=new A.eH(a,new A.aQ(new A.hV(),A.c([],t.fq),A.c([],t.t),t.g2),A.b3(t.S,t.j))
s.d=s.W($.k8())
s.e=s.W($.k5())
s.f=s.W($.k6())
s.r=s.W($.k4())
s.w=s.W($.k7())
return s},
eH:function eH(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
hV:function hV(){},
hX:function hX(){},
hW:function hW(){},
om(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b.gI(0)
if(!i)throw A.b(A.j("invalid volumetric source selection inputs",null))
s=A.al(t.N)
r=A.c([],t.gg)
for(q=0;!1;++q){p=c[q]
p.v()
if(!s.j(0,p.gA()))throw A.b(A.j("duplicate volumetric source id: "+A.o(p.gA()),null))
o=p.ge3().aj(0,b).length
i=p.ge4()
n=A.mC(p.gdZ(),o,i)
i=p.gbT().ge7()
m=p.gbT().ge8()
l=p.gbT().ge9()
l=Math.max(A.dH(m),A.dH(l))
k=Math.max(A.dH(i),l)
B.a.j(r,new A.dp(p.ge1().B(0,k).B(0,n),p))}B.a.ab(r,new A.jj())
i=A.c([],t.q)
for(m=A.hT(r,0,A.bL(a,"count",t.S),t.eS),l=m.$ti,m=new A.ae(m,m.gn(0),l.h("ae<O.E>")),l=l.h("O.E");m.k();){j=m.d
i.push((j==null?l.a(j):j).b)}return i},
mC(a,b,c){var s,r,q,p,o,n
for(s=[new A.ag("distance",b),new A.ag("referenceDistance",c),new A.ag("cutoffDistance",a)],r=0;r<3;++r){q=s[r]
p=q.b
if(!isFinite(p))A.m(A.j(q.a+" must be finite: "+A.o(p),null))}if(b.aH(0,0)||c.cd(0,0)||a.cd(0,0))throw A.b(A.j("invalid inverse-square attenuation inputs",null))
if(b.cc(0,a))return 0
s=c.B(0,c)
q=c.B(0,c)
o=b.B(0,b)
n=s.cb(0,Math.max(A.dH(q),A.dH(o)))
o=b.cb(0,a)
A.dH(o)
return n.B(0,1-Math.pow(o,4)).al(0,0,1).e5(0)},
jj:function jj(){},
hk:function hk(a,b){var _=this
_.a=a
_.b=5
_.c=0
_.d=0.3
_.as=0
_.at=0.3
_.ax=5
_.ay=b},
nY(a){var s,r,q,p,o=A.c([],t.gk)
for(s=a.length,r=t.h,q=0;q<a.length;a.length===s||(0,A.A)(a),++q){p=a[q]
p.gl()
B.a.j(o,new A.bw(p,A.c([p],r)))
continue}return o},
bw:function bw(a,b){this.a=a
this.b=b},
dX:function dX(a){this.a=a},
fJ:function fJ(){},
fK:function fK(a){this.a=a},
fH:function fH(a){this.a=a},
fI:function fI(a){this.a=a},
dY:function dY(a,b){this.a=a
this.b=b},
bX:function bX(a,b){this.a=a
this.b=b},
dZ:function dZ(a,b){this.a=a
this.b=b
this.c=0},
mS(){return new A.ce()},
fO:function fO(a){this.a=a
this.b=null},
ce:function ce(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
jA(){return!0},
E:function E(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
ho:function ho(){},
hp:function hp(){},
aH:function aH(a,b){this.a=a
this.b=b},
a4:function a4(a,b,c){this.a=a
this.b=b
this.c=c},
er:function er(a,b){this.a=a
this.b=b},
aY:function aY(a,b){this.a=a
this.b=b},
L:function L(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
d3:function d3(a,b){this.a=a
this.b=b},
n:function n(a,b){this.a=a
this.b=b},
cu:function cu(a){this.b=a},
hC:function hC(a,b){var _=this
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
hG:function hG(){},
Y:function Y(a,b,c,d,e,f){var _=this
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
ms(a){return new A.d0(a,new A.aQ(new A.hO(),A.c([],t.aO),A.c([],t.t),t.b0))},
f4:function f4(a,b,c){this.a=a
this.b=b
this.c=c},
d0:function d0(a,b){this.a=a
this.b=b},
hO:function hO(){},
l3(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.nj(a,r,s,a.x.gm().a.b.a).b},
nj(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.iT(a),j=new A.iU(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.p(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.o_(b,h,B.S,i,s.gdB(),new A.iE(j),new A.iF(j),new A.iG(a),new A.iL(a),new A.iM(a),new A.iN(j),new A.iO(j),s.gdD(),new A.iP(a),s.gdH(),r.gdF(),k,s.gdJ(),s.gdL(),new A.iQ(j,c),new A.iR(j),new A.iS(j),new A.iH(j),new A.iI(j),new A.iJ(a),new A.iK(j),e,f,g,512)}else{p=new A.L(l,B.l,g,f,e,0)
o=new A.L(l,B.l,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.cP(h,p,o):null
k=A.c([new A.eQ(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nout vec4 oColor;\nvoid main(){\n  vec3 n=normalize(vNormal);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+\n    vec3(ndotl)*uDirectLightScale,0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.f)
if(n!=null)k.push(n)
k.push(new A.cY(b,u.l,u.b,h,i,B.S))
q=new A.dX(k)}a.r.toString
m=q.dc(B.a4,new A.hG(),!1,new A.f8())
k=m.a.b
if(k.length!==0)throw A.b(A.l("safe renderer graph is invalid: "+A.o(k)))
return new A.it(q,m)},
nk(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.b(A.l("renderer graph is not initialized"))
s=A.az(b7.gc_(),t.Y)
for(r=0;r<b9.length;++r){q=b9[r]
p=b6.w.a.b
o=p.$ti
n=o.c.a(q.a)
p.ac(n)
p=p.b
n=n.a
if(!(n>=0&&n<p.length))return A.i(p,n)
n=p[n].c
p=(n==null?o.y[1].a(n):n).d
o=q.c.a1()
p=p.gaY()
n=A.H(p)
B.a.j(s,new A.fj(new A.bg((r|1073741824)>>>0,0,"transient"),q,A.jr(new A.af(p,n.h("f(1)").a(o.gbg()),n.h("af<1,f>")))))}p=b8.a
m=A.o2(A.lS(p.c),s,b8.d)
for(o=s.length,l=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gl().a
j=b6.w.a
i=n.a
h=j.c.q(0,i)
if(h==null)A.m(A.bf(B.L,n))
j=j.b
g=j.$ti
j.ac(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.i(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
l+=B.i.a_(n>0?n:h.e,3)}for(s=m.a,o=s.length,f=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gl().a
j=b6.w.a
i=n.a
h=j.c.q(0,i)
if(h==null)A.m(A.bf(B.L,n))
j=j.b
g=j.$ti
j.ac(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.i(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
f+=B.i.a_(n>0?n:h.e,3)}o=t.N
n=A.b3(o,t.a8)
e=new A.fO(n)
e.d8("cull")
j=l-f
d=e.b
if(d==null)A.m(A.l("cull recorded outside an active frame"))
if(j<0)A.m(A.j("cull totals must be non-negative",null))
c=n.q(0,d)
c.c+=j
c.e+=m.b.b
b=A.c([],t.c1)
a=A.c([],t.aM)
for(i=s.length,g=t.k,a0=p.a,a1=t.b,k=0;k<s.length;s.length===i||(0,A.A)(s),++k){a2=s[k]
if(a2.gl().e===B.T)B.a.j(a,new A.T(new A.ah(a0.c8(a2.gl().c.a).c,a2.gA().a),a2,a1))
else B.a.j(b,new A.T(new A.ai(B.cL,a2.gl().b,a2.gl().a,a2.gA().a),a2,g))}a3=new A.f1(A.nY(A.oo(b)),A.on(a),p,b8.b,b8.c)
a4=new A.dU(b6.a,e)
for(s=b4.b,p=s.length,i=t.do,k=0;k<s.length;s.length===p||(0,A.A)(s),++k){a5=s[k]
g=a5.gl().a
if(g.length===0)A.m(A.aF(g,"passId",null))
e.b=g
n.bc(g,A.lh())
a6=A.b3(o,i)
for(g=a5.gl().c,a0=g.length,a7=0;a7<g.length;g.length===a0||(0,A.A)(g),++a7){a8=g[a7].a
a9=b5.c
if(a9==null)A.m(A.l("GPU resource adapter is not initialized"))
a1=a8.f
b0=a8.a
b1=a1===0?b0:b0+"#"+a1
b2=a9.b.q(0,b1)
if(b2==null)A.m(A.l("resource is not in candidate: "+b1))
b3=new A.bU(b2)
a6.D(0,b0+"#"+a1,b3)
a6.bc(b0,new A.iV(b3))}a5.K(new A.dO(a6,a4,new A.iW(b8,b6).$0(),a3))}return new A.ic(e,m,j)},
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
fj:function fj(a,b,c){this.a=a
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
f8:function f8(){},
f1:function f1(a,b,c,d,e){var _=this
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
f7:function f7(a){this.b=a},
ip:function ip(){},
fc:function fc(){},
ey:function ey(a,b){this.a=a
this.b=b},
oo(a){var s,r,q=A.az(a,t.k)
B.a.ab(q,new A.jn())
s=A.H(q)
r=s.h("af<1,aq>")
s=A.az(new A.af(q,s.h("aq(1)").a(new A.jo()),r),r.h("O.E"))
s.$flags=1
return s},
on(a){var s,r,q=A.az(a,t.b)
B.a.ab(q,new A.jl())
s=A.H(q)
r=s.h("af<1,aq>")
s=A.az(new A.af(q,s.h("aq(1)").a(new A.jm()),r),r.h("O.E"))
s.$flags=1
return s},
ai:function ai(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ah:function ah(a,b){this.a=a
this.b=b},
T:function T(a,b,c){this.a=a
this.b=b
this.$ti=c},
jn:function jn(){},
jo:function jo(){},
jl:function jl(){},
jm:function jm(){},
o2(a,b,c){var s,r,q,p,o,n,m,l=A.c([],t.h)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.A)(b),++p){o=b[p];++r
if((o.gl().d&c)>>>0===0){++q
continue}n=o.gbh()
m=n.a
if(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)){n=n.b
n=isFinite(n.a)&&isFinite(n.b)&&isFinite(n.c)}else n=!1
if(!n)throw A.b(A.j("cullItems: non-finite world bounds for instance "+o.gA().i(0),null))
if(a.dQ(o.gbh())===B.an){++q
continue}B.a.j(l,o)}return new A.fC(l,new A.fD(q))},
fD:function fD(a){this.b=a},
fC:function fC(a,b){this.a=a
this.b=b},
m9(a){var s,r,q,p
if(a<=0)throw A.b(A.aF(a,"size","must be > 0"))
s=a*0.5
r=new A.bb(A.c([],t.n),A.c([],t.t))
q=new A.hB(r,1)
p=-s
q.$6(new A.f(p,p,s),new A.f(s,p,s),new A.f(s,s,s),new A.f(p,s,s),B.b_,B.y)
q.$6(new A.f(s,p,p),new A.f(p,p,p),new A.f(p,s,p),new A.f(s,s,p),B.b0,B.z)
q.$6(new A.f(p,s,s),new A.f(s,s,s),new A.f(s,s,p),new A.f(p,s,p),B.j,B.y)
q.$6(new A.f(p,p,p),new A.f(s,p,p),new A.f(s,p,s),new A.f(p,p,s),B.o,B.z)
q.$6(new A.f(s,p,s),new A.f(s,p,p),new A.f(s,s,p),new A.f(s,s,s),B.y,B.b0)
q.$6(new A.f(p,p,p),new A.f(p,p,s),new A.f(p,s,s),new A.f(p,s,p),B.z,B.b_)
return r.a5(new A.aL(new A.f(p,p,p),new A.f(s,s,s)))},
mk(a,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a2<=0||a<=0)throw A.b(A.j("dimensions must be > 0",null))
if(a0<1||a1<1)throw A.b(A.j("subdivisions must be >= 1",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.bb(s,q)
o=a2*0.5
n=a*0.5
for(s=-o,m=-n,l=0;l<=a1;++l){k=l/a1
j=m+k*a
for(i=0;i<=a0;++i){h=i/a0
p.F(new A.f(s+h*a2,0,j),B.j,B.y,new A.P(h,k))}}g=a0+1
for(l=0;l<a1;)for(f=l*g,++l,e=l*g,i=0;i<a0;++i){d=f+i
c=e+i
b=c+1
B.a.C(q,A.c([d,c,b,d,b,d+1],r))}return p.a5(new A.aL(new A.f(s,0,m),new A.f(o,0,n)))},
ml(a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(a6<=0)throw A.b(A.aF(a6,"radius","must be > 0"))
if(a7<2||a8<3)throw A.b(A.j("invalid ring or sector count",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.bb(s,q)
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
a=0}p.F(new A.f(e*a6,s,d*a6),new A.f(e,k,d),new A.f(c,0,a),new A.P(i,n))}}a0=a8+1
for(o=0;o<a7;)for(s=o*a0,++o,a1=o*a0,j=0;j<a8;++j){a2=s+j
a3=a1+j
a4=a3+1
B.a.C(q,A.c([a2,a2+1,a4,a2,a4,a3],r))}a5=new A.f(a6,a6,a6)
return p.a5(new A.aL(a5.B(0,-1),a5))},
ma(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a1<=0||a<=0)throw A.b(A.j("radius and height must be > 0",null))
if(a0<3)throw A.b(A.j("radialSegments must be >= 3",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.bb(s,q)
o=a*0.5
for(n=-o,m=0;m<=a0;++m){l=m/a0
k=l*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
h=new A.f(j,0,i)
g=new A.f(-i,0,j)
f=j*a1
e=i*a1
p.F(new A.f(f,n,e),h,g,new A.P(l,0))
p.F(new A.f(f,o,e),h,g,new A.P(l,1))}for(m=0;m<a0;++m){d=m*2
f=d+3
B.a.C(q,A.c([d,d+2,f,d,f,d+1],r))}c=s.length/18|0
p.F(new A.f(0,o,0),B.j,B.y,B.ah)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.F(new A.f(j*a1,o,i*a1),B.j,B.y,new A.P(j*0.5+0.5,i*0.5+0.5))}for(f=c+1,e=c+2,m=0;m<a0;++m)B.a.C(q,A.c([c,f+m,e+m],r))
b=s.length/18|0
p.F(new A.f(0,n,0),B.o,B.z,B.ah)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.F(new A.f(j*a1,n,i*a1),B.o,B.z,new A.P(j*0.5+0.5,i*0.5+0.5))}for(s=b+2,f=b+1,m=0;m<a0;++m)B.a.C(q,A.c([b,s+m,f+m],r))
s=-a1
return p.a5(new A.aL(new A.f(s,n,s),new A.f(a1,o,a1)))},
m8(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a6<=0||a4<=0)throw A.b(A.j("radius and height must be > 0",null))
if(a5<3)throw A.b(A.j("radialSegments must be >= 3",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.bb(s,q)
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
p.F(new A.f(0,o,0),d,c,new A.P((i+h)*0.5,1))
p.F(new A.f(Math.cos(g)*a6,m,Math.sin(g)*a6),d,c,new A.P(i,0))
p.F(new A.f(Math.cos(f)*a6,m,Math.sin(f)*a6),d,c,new A.P(h,0))
B.a.C(q,A.c([b,b+1,b+2],r))}a=s.length/18|0
p.F(new A.f(0,m,0),B.o,B.z,B.ah)
for(j=0;j<=a5;++j){a0=j/a5*2*3.141592653589793
a1=Math.cos(a0)
a2=Math.sin(a0)
p.F(new A.f(a1*a6,m,a2*a6),B.o,B.z,new A.P(a1*0.5+0.5,a2*0.5+0.5))}for(s=a+2,a3=a+1,j=0;j<a5;++j)B.a.C(q,A.c([a,s+j,a3+j],r))
s=-a6
return p.a5(new A.aL(new A.f(s,m,s),new A.f(a6,o,a6)))},
mm(a0,a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a1<=0||a2<=0)throw A.b(A.j("radii must be > 0",null))
if(a0<3||a3<3)throw A.b(A.j("segments must be >= 3",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.bb(s,q)
for(o=0;o<=a0;++o){s=o/a0
n=s*2*3.141592653589793
m=Math.cos(n)
l=Math.sin(n)
for(k=a1+a2*m,j=a2*l,i=0;i<=a3;++i){h=i/a3
g=h*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
p.F(new A.f(k*f,j,k*e),new A.f(m*f,l,m*e),new A.f(-e,0,f),new A.P(h,s))}}d=a3+1
for(o=0;o<a0;)for(s=o*d,++o,k=o*d,i=0;i<a3;++i){c=s+i
h=k+i
b=h+1
B.a.C(q,A.c([c,c+1,b,c,b,h],r))}a=a1+a2
s=-a
return p.a5(new A.aL(new A.f(s,-a2,s),new A.f(a,a2,a)))},
m7(a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a6<=0||a5<=0)throw A.b(A.j("radius and height must be > 0",null))
if(a7<2||a8<3)throw A.b(A.j("invalid ring or sector count",null))
s=A.c([],t.n)
r=t.t
q=A.c([],r)
p=new A.bb(s,q)
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
p.F(new A.f(d*a6,j,c*a6),new A.f(d,l,c),new A.f(-e,0,f),new A.P(h,s))}}for(s=-o,n=0;n<=a7;++n){j=n/a7
m=j*1.5707963267948966
l=Math.sin(m)
k=Math.cos(m)
for(b=-l,h=s+b*a6,j=0.5-0.5*j,i=0;i<=a8;++i){a=i/a8
g=a*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
d=k*f
c=k*e
p.F(new A.f(d*a6,h,c*a6),new A.f(d,b,c),new A.f(-e,0,f),new A.P(a,j))}}a0=a8+1
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
hB:function hB(a,b){this.a=a
this.b=b},
bb:function bb(a,b){this.a=a
this.b=b},
jr(a){var s,r,q,p,o,n,m,l,k,j
for(s=a.$ti,r=new A.ae(a,a.gn(0),s.h("ae<O.E>")),s=s.h("O.E"),q=B.dF,p=B.dK,o=!1;r.k();o=!0){n=r.d
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
lS(a){var s,r,q,p,o,n,m=a.a,l=new A.fT(),k=m.length
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
return new A.fS(A.c([l.$4(s+r,q+p,o+n,m[15]+m[12]),l.$4(m[3]-m[0],m[7]-m[4],m[11]-m[8],m[15]-m[12]),l.$4(m[3]+m[1],m[7]+m[5],m[11]+m[9],m[15]+m[13]),l.$4(m[3]-m[1],m[7]-m[5],m[11]-m[9],m[15]-m[13]),l.$4(m[3]+m[2],m[7]+m[6],m[11]+m[10],m[15]+m[14]),l.$4(m[3]-m[2],m[7]-m[6],m[11]-m[10],m[15]-m[14])],t.dV))},
by:function by(a,b){this.a=a
this.b=b},
cC:function cC(a,b){this.a=a
this.b=b},
fS:function fS(a){this.a=a},
fT:function fT(){},
kq(a){if(a.length!==16)throw A.b(A.j("Mat4.fromColumnMajor requires 16 values",null))
return new A.b4(new Float32Array(A.p(a)))},
ks(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.b4(q)},
kr(a,b,c){var s=b.gT(),r=c.a6(s).gT(),q=s.a6(r),p=new Float32Array(16)
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
p[12]=-r.b1(a)
p[13]=-q.b1(a)
p[14]=s.b1(a)
p[15]=1
return new A.b4(p)},
b4:function b4(a){this.a=a},
ha:function ha(){},
hD(a,b){var s=a.gT(),r=b/2,q=Math.sin(r)
return new A.cZ(s.a*q,s.b*q,s.c*q,Math.cos(r))},
cZ:function cZ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aA:function aA(a,b,c){this.a=a
this.b=b
this.c=c},
P:function P(a,b){this.a=a
this.b=b},
f:function f(a,b,c){this.a=a
this.b=b
this.c=c},
eT:function eT(a,b){this.a=a
this.b=b},
cp:function cp(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
eU:function eU(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dM:function dM(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
eV:function eV(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
dT:function dT(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
eX:function eX(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eY:function eY(a,b){this.a=a
this.b=b},
cy:function cy(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
eZ:function eZ(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dW:function dW(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
f_:function f_(a,b,c,d,e,f,g,h,i){var _=this
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
f3:function f3(a,b,c,d,e,f,g){var _=this
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
f6:function f6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bU:function bU(a){this.b=a},
dO:function dO(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
a3(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.L(a.a,a.b,b,c,s,r)},
jB:function jB(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var _=this
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
m6(a){var s
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
f9:function f9(a,b,c,d,e){var _=this
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
fa:function fa(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
kz(a){var s=A.kr(B.j,B.o,Math.abs(0)<0.99?B.y:B.j)
return new A.bA(A.ks(1,1,B.i.al(1,0.1,3),0.05).B(0,s))},
bA:function bA(a){this.a=a},
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
fd:function fd(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
o_(c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3=u.l,b4="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[5]=float[5](0.227027,0.1945946,0.1216216,0.054054,0.016216);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<5;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b5="bloomBlurH",b6="bloomBlurV",b7="dofBlurH",b8="dofBlurV",b9={},c0=c4.b
if(!c0.p(0,"shadows"))throw A.b(A.aF(c4,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=c0.p(0,"ssao")
r=c0.p(0,"bloom")
q=c0.p(0,"dof")
p=c0.p(0,"grade")
o=c0.p(0,"ps1")
n=c0.p(0,"vhs")
m=c0.p(0,"volumetric")
c0=B.i.a_(e9+1,2)
l=B.i.a_(e8+1,2)
k=A.a3(B.a3,e9,e8,e7,b2)
j=A.a3(B.a3.c1(),e9,e8,b2,b2)
i=e7>1
h=A.a3(B.cY,e9,e8,b2,i?2:1)
g=A.a3(B.cX,c0,l,b2,b2)
A.a3(B.d5,e9,e8,b2,b2)
f=A.a3(B.d2,e9,e8,b2,b2)
e=A.a3(B.cW,f0,f0,b2,b2)
d=A.a3(B.cZ,c0,l,b2,b2)
c=A.a3(B.d_,c0,l,b2,b2)
b=A.a3(B.d3,c0,l,b2,b2)
a=A.a3(B.d4,c0,l,b2,b2)
a0=$.lq()
a1=i?1:0
a2=A.a3(a0,e9,e8,b2,a1+(m?1:0)+1)
a0=A.a3(B.cT,c0,l,b2,b2)
a1=A.a3(B.cU,c0,l,b2,b2)
a3=A.a3(B.cV,e9,e8,b2,b2)
a4=A.a3(B.d0,e9,e8,b2,b2)
a5=A.a3(B.d6,e9,e8,b2,b2)
a6=A.a3(B.d1,e9,e8,b2,b2)
a7=i?new A.cP(c2,k,j):b2
b9.a=null
a8=A.kz(B.be)
if(m){a9=i?j:k
b0=new A.eN(c1,b3,"#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\n\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform mat4 uViewProjection;\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform float uShaftIntensity;\nuniform float uFogDensity;\nuniform float uAnisotropy;\nuniform mat4 uView;\nuniform mat4 uInverseProjection;\nuniform vec3 uVolumetricAlbedo;\nuniform float uVolumetricHeightFalloff;\nuniform float uVolumetricDustDensity;\nuniform float uVolumetricJitter;\nuniform float uVolumetricIntensity;\nuniform float uVolumetricSampleCount;\nuniform float uVolumetricSourceCount;\n\nuniform vec3 uSourcePosition0;\nuniform vec3 uSourceColor0;\nuniform float uSourceIntensity0;\nuniform float uSourceReferenceDistance0;\nuniform float uSourceCutoffDistance0;\nuniform vec3 uSourcePosition1;\nuniform vec3 uSourceColor1;\nuniform float uSourceIntensity1;\nuniform float uSourceReferenceDistance1;\nuniform float uSourceCutoffDistance1;\nuniform vec3 uSourcePosition2;\nuniform vec3 uSourceColor2;\nuniform float uSourceIntensity2;\nuniform float uSourceReferenceDistance2;\nuniform float uSourceCutoffDistance2;\nuniform vec3 uSourcePosition3;\nuniform vec3 uSourceColor3;\nuniform float uSourceIntensity3;\nuniform float uSourceReferenceDistance3;\nuniform float uSourceCutoffDistance3;\n\nfloat linearDepth(float depth) {\n  float z = depth * 2.0 - 1.0;\n  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);\n}\n\nfloat phaseHenyeyGreenstein(float cosTheta, float anisotropy) {\n  float g = clamp(anisotropy, -0.85, 0.85);\n  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;\n  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));\n}\n\nvec3 sourceContribution(\n  vec3 position,\n  vec3 color,\n  float intensity,\n  float referenceDistance,\n  float cutoffDistance,\n  vec3 viewRay,\n  float rayLength\n) {\n  vec4 clip = uViewProjection * vec4(position, 1.0);\n  if (clip.w <= 0.0) return vec3(0.0);\n  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;\n  float sourceDistance = length(sourceView);\n  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);\n  vec3 sampleToSource = sourceView - viewRay * tClosest;\n  float distanceToSource = max(length(sampleToSource), 1e-3);\n  float cutoff = 1.0 - smoothstep(\n    cutoffDistance * 0.65, cutoffDistance, sourceDistance);\n  float inverseSquare = intensity * referenceDistance * referenceDistance /\n      max(distanceToSource * distanceToSource,\n          referenceDistance * referenceDistance);\n  // The incoming direction is source -> sample and the outgoing direction is\n  // sample -> camera. This is the same phase convention as the directional\n  // medium path, but now evaluated against the located source.\n  float phase = phaseHenyeyGreenstein(\n    dot(normalize(sampleToSource), viewRay), uAnisotropy);\n  // Located practicals and lightning must also acquire visible body in a\n  // dust-filled room. Use the same broad haze plus particulate density as the\n  // directional march; otherwise a clear-air fog toggle would accidentally\n  // erase dust-lit source rays while the directional shafts still showed it.\n  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);\n  float mediumWeight = 1.0 - exp(-max(\n    mediumDensity * min(rayLength, cutoffDistance), 0.0));\n  float pathWeight = clamp(\n    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);\n  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *\n    uVolumetricIntensity * 0.35;\n}\n\nvoid main() {\n  float depth = texture(uSceneDepth, vUv).r;\n  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);\n  viewPoint /= max(abs(viewPoint.w), 1e-5);\n  vec3 viewRay = normalize(viewPoint.xyz);\n  // linearDepth is camera-space Z; convert it to distance along the actual\n  // reconstructed ray so wide and tall projections integrate equally.\n  float cameraDepth = linearDepth(depth);\n  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);\n  float density = max(uFogDensity, 0.0);\n\n  // A fixed, bounded integral keeps the pass deterministic and makes its\n  // cost predictable on weak adapters. The depth buffer stops integration at\n  // the first opaque surface, so shafts do not leak through geometry.\n  const int maxSampleCount = 24;\n  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));\n  vec3 scatter = vec3(0.0);\n  float transmittance = 1.0;\n  float stepLength = rayLength / float(sampleCount);\n  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);\n  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);\n  for (int i = 0; i < maxSampleCount; i++) {\n    if (i >= sampleCount) break;\n    float distanceAlongRay = clamp(\n      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);\n    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));\n    // Dust is a separate, host-resolved particulate phase. It is denser near\n    // the occupied room volume than the broad atmospheric haze, so shafts gain\n    // visible body without turning the far horizon opaque. At zero density the\n    // extra term is exactly zero and the established fog path is unchanged.\n    float dustWeight = exp(-max(distanceAlongRay *\n      uVolumetricHeightFalloff * 0.45, 0.0));\n    float opticalDensity = density +\n      max(uVolumetricDustDensity, 0.0) * dustWeight;\n    float opticalDepth = opticalDensity * stepLength * heightWeight;\n    float sampleTransmittance = exp(-opticalDepth);\n    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);\n    scatter += transmittance * (uLightColor * uVolumetricAlbedo *\n      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;\n    transmittance *= sampleTransmittance;\n  }\n\n  if (uVolumetricSourceCount > 0.5) {\n    scatter += sourceContribution(\n      uSourcePosition0, uSourceColor0, uSourceIntensity0,\n      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 1.5) {\n    scatter += sourceContribution(\n      uSourcePosition1, uSourceColor1, uSourceIntensity1,\n      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 2.5) {\n    scatter += sourceContribution(\n      uSourcePosition2, uSourceColor2, uSourceIntensity2,\n      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 3.5) {\n    scatter += sourceContribution(\n      uSourcePosition3, uSourceColor3, uSourceIntensity3,\n      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);\n  }\n\n  // Fade the final sample at the far plane and keep the additive output\n  // bounded so a storm flash cannot blow out the entire frame.\n  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);\n  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);\n}\n","#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\nuniform sampler2D uVolumetric;\nuniform float uVolumetricStrength;\n\nvoid main() {\n  vec3 light = texture(uVolumetric, vUv).rgb;\n  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);\n}\n",c2,e1,c8,g,f,a9,h,A.c([],t.J))}else b0=b2
g=t.f
b1=A.c([],g)
if(!m)h=i?j:k
if(r){B.a.C(b1,A.c([new A.cp(c1,b3,b4,c2,b5,b5,B.b2,!0,h,b,e0,c0,l),new A.cp(c1,b3,b4,c2,b6,b6,B.dX,!1,b,a,c6,c0,l),new A.dM(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",c2,c7,a,h,a2)],g))
h=a2}if(q){B.a.C(b1,A.c([new A.cy(c1,b3,b4,c2,b7,b7,B.b3,h,a0,e0,c0,l),new A.cy(c1,b3,b4,c2,b8,b8,B.dY,a0,a1,d1,c0,l),new A.dW(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// Circle-of-confusion is a simple linear ramp from the focus distance\n// outward (front and back treated the same \u2014 no separate near/far falloff\n// curve), clamped to [0,1] and scaled by uStrength so\n// PostProcessState.depthOfFieldStrength == 0 is a true no-op (coc == 0\n// everywhere, oColor == the sharp source exactly).\nvoid main(){\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n  float coc=clamp(abs(depth-uFocusDistance)/max(uFocusRange,0.0001),0.0,1.0)*uStrength;\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  vec3 blurred=texture(uBlurred,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,coc),1.0);\n}\n",c2,e0,d2,e1,c8,h,f,a1,a3)],g))
h=a3}if(p){B.a.j(b1,new A.e2(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",c2,d4,h,a4))
h=a4}if(o){B.a.j(b1,new A.eq(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",c2,h,a5))
h=a5}if(n){B.a.j(b1,new A.eM(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',c2,e6,e5,h,a6))
h=a6}j=A.c([new A.dT(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d7,d6,c5,f)],g)
if(s)j.push(new A.eC(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=8;\nconst vec3 KERNEL[8]=vec3[8](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    // NDC [-1,1] -> UV [0,1] requires the constant 0.5, not vUv (the\n    // *current* fragment's own UV) \u2014 adding vUv here was a real bug: it\n    // conflated \"this sample's own absolute reprojected screen position\"\n    // with \"an offset relative to the current fragment,\" producing an\n    // error of (vUv-0.5) per axis that grows with distance from screen\n    // center. That's exactly what produced a huge, blobby, non-local dark\n    // region instead of contact occlusion \u2014 every sample tested a wildly\n    // wrong depth location except right at screen center, where the error\n    // happened to be near zero.\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    occlusion+=(occluderView.z>=samplePos.z+0.02?1.0:0.0)*rangeCheck;\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",c2,e1,c8,d))
if(s)j.push(new A.eB(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float centerDepth=linearDepth(texture(uSceneDepth,vUv).r);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleDepth=linearDepth(texture(uSceneDepth,sampleUv).r);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*4.0);\n      sum+=texture(uSsaoRaw,sampleUv).r*depthWeight;\n      weightSum+=depthWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',c2,e4,e1,c8,c0,l,d,c))
j.push(new A.ez(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d7,d6,c5,c9,b2,b2,new A.j_(b9),e))
j.push(new A.eA(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nuniform vec3 uReflectionColor;\nuniform float uReflectionIntensity;\nuniform float uReflectionConfidence;\nuniform vec2 uShadowMapTexelSize;\nuniform float uShadowFilterRadius;\nuniform float uShadowBias;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uSpecularScale;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nuniform float uSurfaceSnowCoverage;\nuniform float uSurfaceDissolution;\nuniform float uThermalSourceCount;\nuniform vec3 uThermalSourcePosition0;\nuniform float uThermalSourceRadius0;\nuniform float uThermalSourceDissolution0;\nuniform vec3 uThermalSourcePosition1;\nuniform float uThermalSourceRadius1;\nuniform float uThermalSourceDissolution1;\nuniform vec3 uThermalSourcePosition2;\nuniform float uThermalSourceRadius2;\nuniform float uThermalSourceDissolution2;\nuniform vec3 uThermalSourcePosition3;\nuniform float uThermalSourceRadius3;\nuniform float uThermalSourceDissolution3;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return lightColor*lightIntensity*ndotl*coneFalloff*\n    distanceFalloff*enabled;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0);\n  float ndotl=max(dot(normal,lightDir),0.0);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlick(hdotv,f0);\n  float distribution=distributionGgx(ndoth,roughness);\n  float geometry=geometrySmith(ndotv,ndotl,roughness);\n  vec3 numerator=distribution*geometry*fresnel;\n  float denominator=max(4.0*ndotv*ndotl,0.001);\n  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog keeps the smooth distance ramp for authored horizon control, but\n// the participating-medium term is an analytic optical depth along the actual\n// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the\n// integral has a stable constant-height limit and therefore does not shimmer\n// when a surface is nearly level with the camera. Zero density remains an\n// exact no-op; the host can still use the distance ramp independently.\nfloat heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){\n  float segmentLength=length(rayEnd-rayStart);\n  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;\n  float falloff=max(uFogHeightFalloff,0.);\n  float h0=max(rayStart.y,0.);\n  float h1=max(rayEnd.y,0.);\n  float integral;\n  if(falloff<=0.||abs(h1-h0)<=0.0001){\n    integral=segmentLength*exp(-falloff*h0);\n  }else{\n    float denominator=falloff*(h1-h0);\n    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;\n  }\n  return max(uFogDensity*integral,0.);\n}\n\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);\n  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);\n  float mediumFactor=1.-exp(-opticalDepth);\n  return clamp(max(distFactor,mediumFactor),0.,1.);\n}\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);\n  // Fixed low-discrepancy offsets avoid the directional shimmer of a regular\n  // square lattice while remaining deterministic and free of per-frame noise.\n  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);\n  float sum=0.;\n  sum+=sampleShadow(projCoord+vec3(vec2(-.942,-.399)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.945,-.768)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.094,.886)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.344,.294)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.716,.642)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.688,-.089)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.287,-.885)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.052,.008)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.831,.486)*t,0.),bias);\n  return sum/9.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // \xa76.2's alpha-masked route. Deliberately the first thing after the\n  // fetch it depends on, and ahead of all the lighting below: a discarded\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  direct*=uDirectLightScale;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  float upward=clamp(n.y*0.5+0.5,0.0,1.0);\n  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao*mix(0.85,1.15,upward);\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Weather changes the material before direct and environment response.\n  // Thawing therefore affects the same specular lobe the viewer sees,\n  // instead of changing only diffuse color after the highlight is computed.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);\n  // A steady spherical conductive field decays approximately as 1/r. The\n  // host keeps the slow latent material memory in uSurfaceDissolution; this\n  // local term therefore models the spatial heat field without making warm\n  // surfaces snap back or disappear at an arbitrary exponential radius.\n  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/\n      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));\n  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/\n      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));\n  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/\n      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));\n  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/\n      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));\n  thermalDissolution=clamp(thermalDissolution,0.0,1.0);\n  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*\n    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);\n  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);\n  float dissolution=thermalDissolution;\n  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);\n  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  // A continuous water film forms a second dielectric lobe. It smooths the\n  // authored surface only as coverage rises, so damp cloth stays diffuse\n  // while puddled stone gains a tight grazing reflection.\n  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);\n  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  specular*=uDirectLightScale*uSpecularScale;\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*(1.0-0.25*rough));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);\n  float coat=coatStrength*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*\n    uDirectLightScale*uSpecularScale;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  // Environment fallback reflections are deliberately bounded and weighted\n  // by wetness/grazing angle. A real probe/history hit can raise confidence;\n  // the current host fallback remains visible but never masquerades as SSR.\n  float reflectionNdotV=max(dot(n,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metal);\n  vec3 envFresnel=f0+(max(vec3(1.0-specRough),f0)-f0)*pow(clamp(1.0-reflectionNdotV,0.0,1.0),5.0);\n  float envGloss=(1.0-specRough)*(1.0-specRough);\n  float reflectionSurface=clamp(metal*0.85+(1.0-metal)*(wetness+0.18*dissolution+envGloss*0.25),0.0,1.0);\n  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);\n  float reflectionWeight=clamp(\n    uReflectionIntensity*reflectionSurface*\n      (1.0-0.72*rough)*reflectionConfidence,\n    0.0,1.0);\n  lit+=uReflectionColor*envFresnel*reflectionWeight*ao;\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  oGlow=vec4(emissive,1.);\n}\n",d7,d6,c5,d8,d9,d3,d5,e2,new A.j0(b9,a8),c9,d0,e3,s,e9,e8,f0,f0,e,c,k))
if(a7!=null)j.push(a7)
if(b0!=null)j.push(b0)
B.a.C(j,b1)
j.push(new A.cY(c1,b3,u.b,c2,h,c3))
return new A.dX(j)},
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
fe:function fe(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
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
eC:function eC(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
fg:function fg(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eB:function eB(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
ff:function ff(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
eM:function eM(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fl:function fl(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
eN:function eN(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
fn:function fn(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fm:function fm(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
d2:function d2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eQ:function eQ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fq:function fq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jD(a,b,c,d,e,f,g,h,i,j,k){return new A.ev(j,B.ad,A.c([],t.D),f,e,k,c,a,!0,!0,i,d)},
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
ex(a,b){return new A.d6(a,b)},
fU:function fU(a,b){this.a=a
this.b=b},
e0:function e0(a,b){this.a=a
this.b=b},
fZ:function fZ(a,b){this.a=a
this.b=b},
h_:function h_(a,b){this.a=a
this.b=b},
e_:function e_(a,b,c){this.a=a
this.b=b
this.c=c},
fY:function fY(){},
bY:function bY(a,b){this.a=a
this.b=b},
cD:function cD(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
e1:function e1(a,b){this.a=a
this.b=b},
c8:function c8(a,b){this.a=a
this.b=b},
d6:function d6(a,b){this.a=a
this.b=b},
b9:function b9(a,b){this.a=a
this.b=b},
e:function e(a,b){this.a=a
this.b=b},
ct:function ct(a,b){this.a=a
this.b=b},
dU:function dU(a,b){this.a=a
this.b=b},
hy(a,b,c,d){var s=0,r=A.jT(t.ac),q,p,o,n,m,l,k,j,i
var $async$hy=A.jW(function(e,f){if(e===1)return A.jN(f,r)
for(;;)switch(s){case 0:j=B.bg.dd(a)
i=j==null?null:new A.ew(j.a,new A.fz(new A.fA(),new A.et()),new A.dZ(A.c([],t.c4),B.bq),A.c([],t.cR),B.a0,A.c([],t.cL),null)
if(i==null){q=null
s=1
break}p=A.a(a.clientWidth)>0?A.a(a.clientWidth):A.a(a.width)
o=A.a(a.clientHeight)>0?A.a(a.clientHeight):A.a(a.height)
n=A.kB(o,p,A.fr(A.t(v.G.window).devicePixelRatio),2,!0)
a.width=n.c
a.height=n.d
m=A.o3(c)
s=3
return A.jM(A.iZ(new A.hz(n),m,i,n),$async$hy)
case 3:i.az()
l=A.ms(i.w.a.b)
B.a.j(i.d,l)
k=new A.cW(a,i,l,new A.fQ(),A.jD(B.P,!0,B.I,null,null,null,"root",!0,0,B.ad,-1),B.bn,B.cN,n)
k.y=new A.hk(B.x,B.x)
k.w=!0
k.cQ()
q=k
s=1
break
case 1:return A.jO(q,r)}})
return A.jP($async$hy,r)},
bW:function bW(a){this.a=a},
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
hz:function hz(a){this.a=a},
hq:function hq(a){this.a=a},
hr:function hr(a){this.a=a},
hs:function hs(a){this.a=a},
ht:function ht(){},
hu:function hu(a){this.a=a},
hv:function hv(a){this.a=a},
hw:function hw(a){this.a=a},
hx:function hx(a){this.a=a},
en:function en(a,b){this.a=a
this.b=b},
fV:function fV(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
fW:function fW(){},
fX:function fX(){},
dr:function dr(a,b){this.a=a
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
lO(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.bV(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
fw:function fw(a,b){this.a=a
this.b=b},
bS:function bS(a,b){this.a=a
this.b=b},
fB:function fB(a,b){this.a=a
this.b=b},
fF:function fF(a,b){this.a=a
this.b=b},
bV:function bV(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
i5:function i5(){this.a=null},
mD(a){var s=new A.eO(a,B.d,new A.i5(),A.mN(a))
s.cm(a)
return s},
mN(a){var s,r,q=t.du.a(a.getSupportedExtensions())
if(q==null)return A.al(t.N)
s=A.al(t.N)
r=J.a0(t.dy.b(q)?q:new A.cs(q,A.H(q).h("cs<1,v>")))
while(r.k())s.j(0,r.gm())
return s},
as(a,b){var s,r
if(a.b!==B.d)A.m(A.l(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.a(s.drawingBufferWidth),A.a(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
mI(a,b){var s
if(a.b!==B.d)A.m(A.l(u.k))
switch(b){case 1:a.a.drawBuffers(A.c([A.a(v.G.WebGL2RenderingContext.COLOR_ATTACHMENT0)],t.n))
break
case 2:s=v.G
a.a.drawBuffers(A.c([A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
break
default:throw A.b(A.j("WebGl2Device.setColorAttachmentCount: count must be 1 or 2, got "+b,null))}},
mH(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.a(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
mG(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
kE(a,b){var s
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
mE(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
a8(a,b){var s,r,q,p
if(a.b!==B.d)A.m(A.l(u.k))
s=a.f
r=s.df(b)
if(r.a===0)return
if(r.p(0,B.a5)){q=v.G
p=a.a
if(b.a)p.enable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.p(0,B.a6))a.a.depthFunc(A.mH(a,b.b))
if(r.p(0,B.a7))a.a.depthMask(b.c)
if(r.p(0,B.ab)){q=v.G
p=a.a
if(b.w)p.enable(A.a(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.a(q.WebGL2RenderingContext.CULL_FACE))}if(r.p(0,B.ac))a.a.cullFace(A.mG(a,b.x))
if(r.p(0,B.aU)){q=v.G.WebGL2RenderingContext
q=A.a(q.CCW)
a.a.frontFace(q)}if(r.p(0,B.a8)){q=v.G
p=a.a
if(b.d)p.enable(A.a(q.WebGL2RenderingContext.BLEND))
else p.disable(A.a(q.WebGL2RenderingContext.BLEND))}if(r.p(0,B.a9))a.a.blendFunc(A.kE(a,b.e),A.kE(a,b.f))
if(r.p(0,B.aa))a.a.blendEquation(A.mE(a,b.r))
if(r.p(0,B.aS))a.a.colorMask(!0,!0,!0,!0)
if(r.p(0,B.aT)){q=v.G.WebGL2RenderingContext
a.a.disable(A.a(q.SCISSOR_TEST))}s.a=b},
mF(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.a(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.a(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.a(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
bC(a,b,c,d,e,f){var s
if(a.b!==B.d)A.m(A.l(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.mF(a,b))},
aR(a,b){var s
if(a.b!==B.d)A.m(A.l(u.k))
s=A.t(b.a)
a.a.useProgram(s)
a.e=s},
d(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.d)A.m(A.l(u.k))
s=a.e
if(s==null)throw A.b(A.l("WebGl2Device.setUniform called with no bound program"))
r=a.a
q=A.V(r.getUniformLocation(s,b))
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
A.a9(r,"uniform4f",[q,n,m,l,p[3]],t.H)
break
case 4:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 5:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 6:r.uniform1i(q,A.a(c.b))
break}},
at(a,b){if(a.b!==B.d)A.m(A.l(u.k))
a.a.bindVertexArray(A.t(b.a))},
U(a,b,c){var s,r,q,p,o,n
if(a.b!==B.d)A.m(A.l(u.k))
s=c.a
r=a.a
q=v.G
r.activeTexture(A.a(q.WebGL2RenderingContext.TEXTURE0)+b)
if(s instanceof A.dB){p=s.d>1?A.a(q.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(q.WebGL2RenderingContext.TEXTURE_2D)
r.bindTexture(p,s.a)
return}if(s instanceof A.dA){o=s.b
if(o!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),o)
return}n=s.e
if(n!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),n)
return}throw A.b(A.l("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.b(A.l("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
mJ(a,b,c){var s,r,q,p
if(a.b!==B.d)A.m(A.l(u.k))
s=A.t(b.a)
r=a.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),s)
A:{p=q.WebGL2RenderingContext
r.bufferData(A.a(p.ELEMENT_ARRAY_BUFFER),c,A.a(q.WebGL2RenderingContext.STATIC_DRAW))
break A}},
mK(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
kH(a,b){var s,r,q,p
if(a.b!==B.d)A.m(A.l(u.k))
s=a.a
r=A.V(s.createBuffer())
if(r==null)throw A.b(A.l("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.ao?A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.a(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.mK(a,b.b))
return new A.bd(r)},
kF(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
kG(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
kI(a,b){var s,r,q,p,o,n,m,l,k
if(a.b!==B.d)A.m(A.l(u.k))
s=a.a
r=A.V(s.createTexture())
if(r==null)throw A.b(A.l("WebGl2Device: gl.createTexture() returned null"))
q=v.G
p=q.WebGL2RenderingContext
o=A.a(p.TEXTURE_2D)
s.bindTexture(o,r)
p=q.WebGL2RenderingContext
A.a9(s,"texStorage2D",[o,1,A.a(p.RGBA8),1,1],t.H)
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.kF(a,B.ar))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.kF(a,B.ar))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_S),A.kG(a,B.as))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_T),A.kG(a,B.as))
n=a.r.p(0,"EXT_texture_filter_anisotropic")
m=n?a.bB(34047):1
if(!isFinite(1))A.m(A.aF(1,"requested","anisotropy must be finite and in [1, 16]"))
if(n&&isFinite(m)&&m>=1)l=m>16?16:m
else l=1
k=1<l?1:l
if(k>1)s.texParameterf(o,34046,k)
return new A.bd(new A.dB(r,1,1,1,!1))},
kJ(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.d)A.m(A.l(u.k))
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
if(r)A.a9(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.a9(l,"texSubImage2D",[m,0,0,0,q,p,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
mL(a,b){if(a.b!==B.d)A.m(A.l(u.k))
t.R.a(b.a)
return},
eP(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
kL(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.d)A.m(A.l(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.b(A.j("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.V(r.createFramebuffer())
if(q==null)throw A.b(A.l("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.U
if(n&&!a1.e)throw A.b(A.j("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.aq||o===B.bx
l=d
k=d
j=d
i=d
if(n){r.drawBuffers(A.c([A.a(p.WebGL2RenderingContext.NONE)],t.n))
r.readBuffer(A.a(p.WebGL2RenderingContext.NONE))}else{o=a1.c
h=t.H
g=a1.b
if(o>1){k=A.V(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
A.a9(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.V(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.a9(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.c([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.V(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.a9(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.a9(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.V(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),j)
A.a9(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.a9(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.TEXTURE_2D),j,0],h)
r.drawBuffers(A.c([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}}f=d
e=d
if(a1.e){o=a1.c
h=t.H
g=a1.b
if(o>1){f=A.V(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.a9(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.V(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.a9(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
A.a9(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.a(r.checkFramebufferStatus(A.a(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.a(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.jE(a0,q,l,k,f,e,j,i)
throw A.b(A.l("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.bd(new A.dA(q,l,k,f,e,j,i,s,a1.b,a1.c))},
jE(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
aB(a){var s
if(a.b!==B.d)A.m(A.l(u.k))
s=A.V(a.a.createVertexArray())
if(s==null)throw A.b(A.l("WebGl2Device: gl.createVertexArray() returned null"))
return new A.bd(s)},
kK(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.V(p.createShader(b))
if(o==null)throw A.b(A.ex(b===A.li(A.l5(A.lm(),r),q,t.S)?B.aO:B.aP,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.aX(A.ck(p.getShaderParameter(o,A.a(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bI(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.b(A.ex(b===A.li(A.l5(A.lm(),r),q,t.S)?B.aO:B.aP,s))}return o},
mM(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.d)A.m(A.l(u.k))
q=v.G
s=A.kK(a,A.a(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.kK(a,A.a(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.V(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.b(B.dc)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.aX(A.ck(o.getProgramParameter(n,A.a(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bI(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.ex(B.aQ,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.A)(c),++l){k=c[l]
if(A.a(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.ex(B.aR,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.V(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.ex(B.aR,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.bd(n)},
bd:function bd(a){this.a=a},
dB:function dB(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dA:function dA(a,b,c,d,e,f,g,h,i,j){var _=this
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
fp:function fp(a){this.a=a
this.b=!1},
eO:function eO(a,b,c,d){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=c
_.r=d
_.w=!1},
i2:function i2(a){this.a=a},
i3:function i3(a){this.a=a},
iA:function iA(){},
fo:function fo(){},
i1:function i1(a){this.a=a},
i4:function i4(){},
jb(){var s=0,r=A.jT(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1
var $async$jb=A.jW(function(b2,b3){if(b2===1)return A.jN(b3,r)
for(;;)switch(s){case 0:a9=v.G
b0=A.V(A.t(a9.document).querySelector("#showcase-canvas"))
b1=t.m
if(!b1.b(b0)){s=1
break}s=3
return A.jM(A.hy(b0,!0,B.aM,!0),$async$jb)
case 3:p=b3
if(p==null){s=1
break}o=p.y
n=o==null
if(!n)o.b=8.5
if(!n)o.d=0.45
if(!n)o.a=B.ai
p.f=B.bo
p.r=B.cM
m=A.V(A.t(a9.document).querySelector("#tone-map-select"))
if(b1.b(m))m.addEventListener("change",A.aD(new A.jc(m,p)))
a9=A.mk(30,4,4,30)
b1=p.b
l=b1.gR().aa(a9,"ground")
a9=A.ml(1,40,40)
k=b1.gR().aa(a9,"center_sphere")
a9=A.mm(20,1.8,0.08,48)
j=b1.gR().aa(a9,"orbit_torus")
a9=A.m7(0.6,0.3,12,24)
i=b1.gR().aa(a9,"satellite_capsule")
a9=A.ma(0.9,24,0.35)
h=b1.gR().aa(a9,"satellite_cylinder")
a9=A.m8(0.9,24,0.4)
g=b1.gR().aa(a9,"satellite_cone")
a9=A.m9(0.65)
f=b1.gR().aa(a9,"satellite_cube")
e=b1.gR().a9(B.cm)
d=b1.gR().a9(B.co)
c=b1.gR().a9(B.cq)
b=b1.gR().a9(B.ck)
a=b1.gR().a9(B.cn)
a0=b1.gR().a9(B.cl)
a1=b1.gR().a9(B.cp)
b1=p.e
b1.aD(0,e,l,"ground_node",new A.aA(B.o,B.B,1))
a2=b1.aD(0,d,k,"center_sphere_node",new A.aA(B.ai,B.B,1))
a3=b1.aD(0,c,j,"torus_ring_node",new A.aA(B.ai,B.B,1))
a4=A.jD(B.P,!0,B.I,null,null,null,"orbit_ring",!0,0,B.ad,-1)
a2.bS(a4)
a5=[new A.bn(b,i),new A.bn(a,h),new A.bn(a0,g),new A.bn(a1,f)]
a6=A.c([],t.D)
for(a7=0;a7<4;++a7){a8=a7*1.5707963267948966
a9=a5[a7]
B.a.j(a6,a4.aD(0,a9.a,a9.b,"satellite_"+a7,new A.aA(new A.f(Math.cos(a8)*3.2,0,Math.sin(a8)*3.2),B.B,1)))}p.sdz(new A.jd(a2,a3,a4,a6,p))
p.cg()
case 1:return A.jO(q,r)}})
return A.jP($async$jb,r)},
jc:function jc(a,b){this.a=a
this.b=b},
jd:function jd(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
lo(a){return v.mangledGlobalNames[a]},
oq(a){throw A.S(A.kn(a),new Error())},
aW(){throw A.S(A.lZ(""),new Error())},
ln(){throw A.S(A.kn(""),new Error())},
jk(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.b(A.aF(b.gdm(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].gl().c.a1()
o=q*16
n=o+16
B.Z.bi(s,o,n,p.a)
if(l)B.Z.bi(r,o,n,p.bb().a)}m=a.a
A.d(m,"uInstanceModels",new A.e(B.aX,s))
if(l)A.d(m,"uInstanceNormalMatrices",new A.e(B.aX,r))
A.d(m,"uUseInstances",B.aY)}},B={}
var w=[A,J,B]
var $={}
A.jw.prototype={}
J.e4.prototype={
U(a,b){return a===b},
gH(a){return A.eo(a)},
i(a){return"Instance of '"+A.ep(a)+"'"},
gE(a){return A.aV(A.jQ(this))}}
J.e6.prototype={
i(a){return String(a)},
gH(a){return a?519018:218159},
gE(a){return A.aV(t.y)},
$iC:1,
$iz:1}
J.cF.prototype={
U(a,b){return null==b},
i(a){return"null"},
gH(a){return 0},
$iC:1}
J.cH.prototype={$iG:1}
J.bj.prototype={
gH(a){return 0},
gE(a){return B.dq},
i(a){return String(a)}}
J.em.prototype={}
J.bB.prototype={}
J.bi.prototype={
i(a){var s=a[$.lr()]
if(s==null)s=a[$.k3()]
if(s==null)return this.cl(a)
return"JavaScript function for "+J.bR(s)},
$ibu:1}
J.cG.prototype={
gH(a){return 0},
i(a){return String(a)}}
J.cI.prototype={
gH(a){return 0},
i(a){return String(a)}}
J.r.prototype={
j(a,b){A.H(a).c.a(b)
a.$flags&1&&A.br(a,29)
a.push(b)},
ag(a,b){var s
a.$flags&1&&A.br(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aX(a[s],b)){a.splice(s,1)
return!0}return!1},
C(a,b){var s
A.H(a).h("k<1>").a(b)
a.$flags&1&&A.br(a,"addAll",2)
if(Array.isArray(b)){this.cq(a,b)
return}for(s=J.a0(b);s.k();)a.push(s.gm())},
cq(a,b){var s,r
t.r.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.ax(a))
for(r=0;r<s;++r)a.push(b[r])},
X(a){a.$flags&1&&A.br(a,"clear","clear")
a.length=0},
P(a,b){if(!(b>=0&&b<a.length))return A.i(a,b)
return a[b]},
ci(a,b){var s
if(b<0||b>a.length)throw A.b(A.aP(b,0,a.length,"start",null))
s=a.length
if(b===s)return A.c([],A.H(a))
return A.c(a.slice(b,s),A.H(a))},
gai(a){var s=a.length
if(s===1){if(0>=s)return A.i(a,0)
return a[0]}if(s===0)throw A.b(A.jt())
throw A.b(A.kj())},
aE(a,b){var s,r
A.H(a).h("z(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.b(A.ax(a))}return!0},
ab(a,b){var s,r,q,p,o,n=A.H(a)
n.h("h(1,1)?").a(b)
a.$flags&2&&A.br(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.nu()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dX()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.cj(b,2))
if(p>0)this.cV(a,p)},
cf(a){return this.ab(a,null)},
cV(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
dk(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.i(a,s)
if(J.aX(a[s],b))return s}return-1},
p(a,b){var s
for(s=0;s<a.length;++s)if(J.aX(a[s],b))return!0
return!1},
i(a){return A.ju(a,"[","]")},
gt(a){return new J.co(a,a.length,A.H(a).h("co<1>"))},
gH(a){return A.eo(a)},
gn(a){return a.length},
q(a,b){if(!(b>=0&&b<a.length))throw A.b(A.j3(a,b))
return a[b]},
D(a,b,c){A.H(a).c.a(c)
a.$flags&2&&A.br(a)
if(!(b>=0&&b<a.length))throw A.b(A.j3(a,b))
a[b]=c},
b7(a,b){var s
A.H(a).h("z(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gE(a){return A.aV(A.H(a))},
$ik:1,
$iy:1}
J.e5.prototype={
dU(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.ep(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.h2.prototype={}
J.co.prototype={
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
J.c_.prototype={
G(a,b){var s
A.fr(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gap(b)
if(this.gap(a)===s)return 0
if(this.gap(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gap(a){return a===0?1/a<0:a<0},
dR(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.b(A.cb(""+a+".toInt()"))},
c5(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.cb(""+a+".round()"))},
al(a,b,c){if(this.G(b,c)>0)throw A.b(A.nU(b))
if(this.G(a,b)<0)return b
if(this.G(a,c)>0)return c
return a},
bf(a,b){var s
if(b>20)throw A.b(A.aP(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gap(a))return"-"+s
return s},
dT(a,b){var s
if(b>20)throw A.b(A.aP(b,0,20,"fractionDigits",null))
s=a.toExponential(b)
if(a===0&&this.gap(a))return"-"+s
return s},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gH(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
V(a,b){return a+b},
aI(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
a_(a,b){return(a|0)===a?a/b|0:this.d0(a,b)},
d0(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.cb("Result of truncating division is "+A.o(s)+": "+A.o(a)+" ~/ "+b))},
cZ(a,b){var s
if(a>0)s=this.cY(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cY(a,b){return b>31?0:a>>>b},
aH(a,b){return a<b},
gE(a){return A.aV(t.p)},
$iab:1,
$iq:1,
$iaa:1}
J.cE.prototype={
gE(a){return A.aV(t.S)},
$iC:1,
$ih:1}
J.e7.prototype={
gE(a){return A.aV(t.i)},
$iC:1}
J.bh.prototype={
a2(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
ck(a,b,c){return a.substring(b,A.mn(b,c,a.length))},
cj(a,b){return this.ck(a,b,null)},
G(a,b){var s
A.aU(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
i(a){return a},
gH(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gE(a){return A.aV(t.N)},
gn(a){return a.length},
$iC:1,
$iab:1,
$iku:1,
$iv:1}
A.cc.prototype={
gt(a){return new A.cr(J.a0(this.gaC()),A.u(this).h("cr<1,2>"))},
gn(a){return J.bs(this.gaC())},
P(a,b){return A.u(this).y[1].a(J.jq(this.gaC(),b))},
i(a){return J.bR(this.gaC())}}
A.cr.prototype={
k(){return this.a.k()},
gm(){return this.$ti.y[1].a(this.a.gm())},
$iN:1}
A.de.prototype={
q(a,b){return this.$ti.y[1].a(J.jp(this.a,b))},
$iy:1}
A.cs.prototype={
gaC(){return this.a}}
A.cJ.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.hS.prototype={}
A.ay.prototype={}
A.O.prototype={
gt(a){var s=this
return new A.ae(s,s.gn(s),A.u(s).h("ae<O.E>"))},
ah(a){var s,r=this,q=A.jy(A.u(r).h("O.E"))
for(s=0;s<r.gn(r);++s)q.j(0,r.P(0,s))
return q}}
A.d8.prototype={
gcM(){var s=J.bs(this.a),r=this.c
if(r==null||r>s)return s
return r},
gd_(){var s=J.bs(this.a),r=this.b
if(r>s)return s
return r},
gn(a){var s,r=J.bs(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
P(a,b){var s=this,r=s.gd_()+b
if(b<0||r>=s.gcM())throw A.b(A.h1(b,s.gn(0),s,"index"))
return J.jq(s.a,r)},
c7(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.j5(n),l=m.gn(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.kl(0,n):J.kk(0,n)}r=A.h5(s,m.P(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.a.D(r,q,m.P(n,o+q))
if(m.gn(n)<l)throw A.b(A.ax(p))}return r},
dS(a){return this.c7(0,!0)}}
A.ae.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.j5(q),o=p.gn(q)
if(r.b!==o)throw A.b(A.ax(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.P(q,s);++r.c
return!0},
$iN:1}
A.cN.prototype={
gt(a){var s=this.a
return new A.cO(s.gt(s),this.b,A.u(this).h("cO<1,2>"))},
gn(a){var s=this.a
return s.gn(s)},
P(a,b){var s=this.a
return this.b.$1(s.P(s,b))}}
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
P(a,b){return this.b.$1(J.jq(this.a,b))}}
A.a_.prototype={
gt(a){return new A.F(J.a0(this.a),this.b,this.$ti.h("F<1>"))}}
A.F.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gm()))return!0
return!1},
gm(){return this.a.gm()},
$iN:1}
A.ac.prototype={}
A.d4.prototype={
gn(a){return J.bs(this.a)},
P(a,b){var s=this.a,r=J.j5(s)
return r.P(s,r.gn(s)-1-b)}}
A.dD.prototype={}
A.ag.prototype={$r:"+(1,2)",$s:1}
A.dn.prototype={$r:"+influence,light(1,2)",$s:2}
A.dp.prototype={$r:"+influence,source(1,2)",$s:3}
A.bn.prototype={$r:"+mat,mesh(1,2)",$s:4}
A.cw.prototype={}
A.cv.prototype={
i(a){return A.h8(this)},
gan(){return new A.aT(this.dh(),A.u(this).h("aT<a5<1,2>>"))},
dh(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gan(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga8(),o=o.gt(o),n=A.u(s),m=n.y[1],n=n.h("a5<1,2>")
case 2:if(!o.k()){r=3
break}l=o.gm()
k=s.q(0,l)
r=4
return a.b=new A.a5(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iam:1}
A.M.prototype={
gn(a){return this.b.length},
gbA(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
am(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
q(a,b){if(!this.am(b))return null
return this.b[this.a[b]]},
ao(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbA()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga8(){return new A.bE(this.gbA(),this.$ti.h("bE<1>"))},
gc9(){return new A.bE(this.b,this.$ti.h("bE<2>"))}}
A.bE.prototype={
gn(a){return this.a.length},
gt(a){var s=this.a
return new A.bF(s,s.length,this.$ti.h("bF<1>"))}}
A.bF.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iN:1}
A.cx.prototype={
j(a,b){A.u(this).c.a(b)
A.lL()}}
A.aN.prototype={
gn(a){return this.b},
gbZ(a){return this.b!==0},
gt(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.bF(s,s.length,r.$ti.h("bF<1>"))},
p(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
ah(a){return A.jz(this,this.$ti.c)}}
A.d5.prototype={}
A.hY.prototype={
Z(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.eK.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hj.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.cA.prototype={}
A.ds.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibm:1}
A.be.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.lp(r==null?"unknown":r)+"'"},
gE(a){var s=A.jY(this)
return A.aV(s==null?A.bO(this):s)},
$ibu:1,
gdW(){return this},
$C:"$1",
$R:1,
$D:null}
A.dP.prototype={$C:"$0",$R:0}
A.dQ.prototype={$C:"$2",$R:2}
A.eG.prototype={}
A.eD.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.lp(s)+"'"}}
A.bT.prototype={
U(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bT))return!1
return this.$_target===b.$_target&&this.a===b.a},
gH(a){return(A.jf(this.a)^A.eo(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.ep(this.a)+"'")}}
A.eu.prototype={
i(a){return"RuntimeError: "+this.a}}
A.aZ.prototype={
gn(a){return this.a},
ga8(){return new A.b0(this,A.u(this).h("b0<1>"))},
am(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dn(a)},
dn(a){var s=this.d
if(s==null)return!1
return this.aF(this.bx(s,a),a)>=0},
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
r=this.aF(s,a)
if(r<0)return null
return s[r].b},
D(a,b,c){var s,r,q=this,p=A.u(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bk(s==null?q.b=q.aU():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bk(r==null?q.c=q.aU():r,b,c)}else q.ds(b,c)},
ds(a,b){var s,r,q,p,o=this,n=A.u(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.aU()
r=o.b8(a)
q=s[r]
if(q==null)s[r]=[o.aK(a,b)]
else{p=o.aF(q,a)
if(p>=0)q[p].b=b
else q.push(o.aK(a,b))}},
bc(a,b){var s,r,q=this,p=A.u(q)
p.c.a(a)
p.h("2()").a(b)
if(q.am(a)){s=q.q(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.D(0,a,r)
return r},
ag(a,b){if((b&0x3fffffff)===b)return this.co(this.c,b)
else return this.dr(b)},
dr(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.b8(a)
r=n[s]
q=o.aF(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.bl(p)
if(r.length===0)delete n[s]
return p.b},
X(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aJ()}},
ao(a,b){var s,r,q=this
A.u(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.ax(q))
s=s.c}},
bk(a,b,c){var s,r=A.u(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.aK(b,c)
else s.b=c},
co(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.bl(s)
delete a[b]
return s.b},
aJ(){this.r=this.r+1&1073741823},
aK(a,b){var s=this,r=A.u(s),q=new A.h3(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.aJ()
return q},
bl(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.aJ()},
b8(a){return J.K(a)&1073741823},
bx(a,b){return a[this.b8(b)]},
aF(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aX(a[r].a,b))return r
return-1},
i(a){return A.h8(this)},
aU(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$iko:1}
A.h3.prototype={}
A.b0.prototype={
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
A.b2.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return new A.b1(s,s.r,s.e,this.$ti.h("b1<1>"))}}
A.b1.prototype={
gm(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.ax(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iN:1}
A.b_.prototype={
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
return!1}else{r.d=new A.a5(s.a,s.b,r.$ti.h("a5<1,2>"))
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
$1(a){return this.a(A.aU(a))},
$S:16}
A.aS.prototype={
gE(a){return A.aV(this.bz())},
bz(){return A.o4(this.$r,this.by())},
i(a){return this.bO(!1)},
bO(a){var s,r,q,p,o,n=this.cN(),m=this.by(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.i(m,q)
o=m[q]
l=a?l+A.kw(o):l+A.o(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cN(){var s,r=this.$s
while($.ir.length<=r)B.a.j($.ir,null)
s=$.ir[r]
if(s==null){s=this.cE()
B.a.D($.ir,r,s)}return s},
cE(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.jv(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.D(j,q,r[s])}}return A.h7(j,k)}}
A.bc.prototype={
by(){return[this.a,this.b]},
U(a,b){if(b==null)return!1
return b instanceof A.bc&&this.$s===b.$s&&J.aX(this.a,b.a)&&J.aX(this.b,b.b)},
gH(a){return A.c2(this.$s,this.a,this.b,B.h,B.h,B.h)}}
A.c1.prototype={
gE(a){return B.di},
$iC:1}
A.cT.prototype={
cR(a,b,c,d){var s=A.aP(b,0,c,d,null)
throw A.b(s)},
bq(a,b,c,d){if(b>>>0!==b||b>c)this.cR(a,b,c,d)}}
A.ec.prototype={
gE(a){return B.dj},
$iC:1}
A.a2.prototype={
gn(a){return a.length},
$iak:1}
A.cR.prototype={
q(a,b){A.bJ(b,a,a.length)
return a[b]},
bi(a,b,c,d){var s,r,q,p
t.bM.a(d)
a.$flags&2&&A.br(a,5)
s=a.length
this.bq(a,b,s,"start")
this.bq(a,c,s,"end")
if(b>c)A.m(A.aP(b,0,c,null,null))
r=c-b
q=d.length
if(q<r)A.m(A.l("Not enough elements"))
p=q!==r?d.subarray(0,r):d
a.set(p,b)
return},
$ik:1,
$iy:1}
A.cS.prototype={$ik:1,$iy:1}
A.cQ.prototype={
gE(a){return B.dk},
$iC:1,
$ifL:1}
A.ed.prototype={
gE(a){return B.dl},
$iC:1,
$ifM:1}
A.ee.prototype={
gE(a){return B.dm},
q(a,b){A.bJ(b,a,a.length)
return a[b]},
$iC:1}
A.ef.prototype={
gE(a){return B.dn},
q(a,b){A.bJ(b,a,a.length)
return a[b]},
$iC:1}
A.eg.prototype={
gE(a){return B.dp},
q(a,b){A.bJ(b,a,a.length)
return a[b]},
$iC:1}
A.eh.prototype={
gE(a){return B.ds},
q(a,b){A.bJ(b,a,a.length)
return a[b]},
$iC:1}
A.ei.prototype={
gE(a){return B.dt},
q(a,b){A.bJ(b,a,a.length)
return a[b]},
$iC:1}
A.cU.prototype={
gE(a){return B.du},
gn(a){return a.length},
q(a,b){A.bJ(b,a,a.length)
return a[b]},
$iC:1}
A.ej.prototype={
gE(a){return B.dv},
gn(a){return a.length},
q(a,b){A.bJ(b,a,a.length)
return a[b]},
$iC:1,
$ieI:1}
A.dj.prototype={}
A.dk.prototype={}
A.dl.prototype={}
A.dm.prototype={}
A.aI.prototype={
h(a){return A.dx(v.typeUniverse,this,a)},
J(a){return A.kY(v.typeUniverse,this,a)}}
A.f2.prototype={}
A.ix.prototype={
i(a){return A.au(this.a,null)}}
A.f0.prototype={
i(a){return this.a}}
A.dt.prototype={$ib7:1}
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
cn(a,b){if(self.setTimeout!=null)self.setTimeout(A.cj(new A.iw(this,b),0),a)
else throw A.b(A.cb("`setTimeout()` not found."))}}
A.iw.prototype={
$0(){this.b.$0()},
$S:0}
A.eR.prototype={
aW(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.aM(a)
else{s=r.a
if(q.h("bv<1>").b(a))s.bp(a)
else s.bs(a)}},
aX(a,b){var s=this.a
if(this.b)s.aO(new A.aw(a,b))
else s.aN(new A.aw(a,b))}}
A.iC.prototype={
$1(a){return this.a.$2(0,a)},
$S:6}
A.iD.prototype={
$2(a,b){this.a.$2(1,new A.cA(a,t.l.a(b)))},
$S:23}
A.iY.prototype={
$2(a,b){this.a(A.a(a),b)},
$S:30}
A.aK.prototype={
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
if(p==null||p.length===0){o.a=A.kS
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
o.a=A.kS
throw n
return!1}if(0>=p.length)return A.i(p,-1)
o.a=p.pop()
m=1
continue}throw A.b(A.l("sync*"))}return!1},
dY(a){var s,r,q=this
if(a instanceof A.aT){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.j(r,q.a)
q.a=s
return 2}else{q.d=J.a0(a)
return 2}},
$iN:1}
A.aT.prototype={
gt(a){return new A.aK(this.a(),this.$ti.h("aK<1>"))}}
A.aw.prototype={
i(a){return A.o(this.a)},
$iI:1,
gav(){return this.b}}
A.eW.prototype={
aX(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.l("Future already completed"))
s.aN(A.nt(a,b))},
bU(a){return this.aX(a,null)}}
A.dd.prototype={
aW(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.b(A.l("Future already completed"))
s.aM(r.h("1/").a(a))}}
A.bD.prototype={
dw(a){if((this.c&15)!==6)return!0
return this.b.b.be(t.al.a(this.d),a.a,t.y,t.K)},
dj(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.d.b(q))p=l.dO(q,m,a.b,o,n,t.l)
else p=l.be(t.x.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.bQ(s))){if((r.c&1)!==0)throw A.b(A.j("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.j("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.R.prototype={
c6(a,b,c){var s,r,q=this.$ti
q.J(c).h("1/(2)").a(a)
s=$.J
if(s===B.p){if(!t.d.b(b)&&!t.x.b(b))throw A.b(A.aF(b,"onError",u.c))}else{c.h("@<0/>").J(q.c).h("1(2)").a(a)
b=A.nJ(b,s)}r=new A.R(s,c.h("R<0>"))
this.aL(new A.bD(r,3,a,b,q.h("@<1>").J(c).h("bD<1,2>")))
return r},
bL(a,b,c){var s,r=this.$ti
r.J(c).h("1/(2)").a(a)
s=new A.R($.J,c.h("R<0>"))
this.aL(new A.bD(s,19,a,b,r.h("@<1>").J(c).h("bD<1,2>")))
return s},
cX(a){this.a=this.a&1|16
this.c=a},
aw(a){this.a=a.a&30|this.a&1
this.c=a.c},
aL(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aL(a)
return}r.aw(s)}A.fs(null,null,r.b,t.M.a(new A.id(r,a)))}},
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
return}m.aw(n)}l.a=m.aB(a)
A.fs(null,null,m.b,t.M.a(new A.ii(l,m)))}},
aA(){var s=t.F.a(this.c)
this.c=null
return this.aB(s)},
aB(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bs(a){var s,r=this
r.$ti.c.a(a)
s=r.aA()
r.a=8
r.c=a
A.cd(r,s)},
cD(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aA()
q.aw(a)
A.cd(q,r)},
aO(a){var s=this.aA()
this.cX(a)
A.cd(this,s)},
aM(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bv<1>").b(a)){this.bp(a)
return}this.cr(a)},
cr(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.fs(null,null,s.b,t.M.a(new A.ig(s,a)))},
bp(a){A.jF(this.$ti.h("bv<1>").a(a),this,!1)
return},
aN(a){this.a^=2
A.fs(null,null,this.b,t.M.a(new A.ie(this,a)))},
$ibv:1}
A.id.prototype={
$0(){A.cd(this.a,this.b)},
$S:0}
A.ii.prototype={
$0(){A.cd(this.b,this.a.a)},
$S:0}
A.ih.prototype={
$0(){A.jF(this.a.a,this.b,!0)},
$S:0}
A.ig.prototype={
$0(){this.a.bs(this.b)},
$S:0}
A.ie.prototype={
$0(){this.a.aO(this.b)},
$S:0}
A.il.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dN(t.fO.a(q.d),t.A)}catch(p){s=A.bQ(p)
r=A.cm(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.js(q)
n=k.a
n.c=new A.aw(q,o)
q=n}q.b=!0
return}if(j instanceof A.R&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.R){m=k.b.a
l=new A.R(m.b,m.$ti)
j.c6(new A.im(l,m),new A.io(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.im.prototype={
$1(a){this.a.cD(this.b)},
$S:10}
A.io.prototype={
$2(a,b){A.dE(a)
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
q.c=p.b.b.be(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.bQ(l)
r=A.cm(l)
q=s
p=r
if(p==null)p=A.js(q)
o=this.a
o.c=new A.aw(q,p)
o.b=!0}},
$S:0}
A.ij.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.dw(s)&&p.a.e!=null){p.c=p.a.dj(s)
p.b=!1}}catch(o){r=A.bQ(o)
q=A.cm(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.js(p)
m=l.b
m.c=new A.aw(p,n)
p=m}p.b=!0}},
$S:0}
A.eS.prototype={}
A.fh.prototype={}
A.dC.prototype={$ikM:1}
A.fb.prototype={
dP(a){var s,r,q
t.M.a(a)
try{if(B.p===$.J){a.$0()
return}A.lb(null,null,this,a,t.H)}catch(q){s=A.bQ(q)
r=A.cm(q)
A.jU(A.dE(s),t.l.a(r))}},
d9(a){return new A.is(this,t.M.a(a))},
dN(a,b){b.h("0()").a(a)
if($.J===B.p)return a.$0()
return A.lb(null,null,this,a,b)},
be(a,b,c,d){c.h("@<0>").J(d).h("1(2)").a(a)
d.a(b)
if($.J===B.p)return a.$1(b)
return A.nL(null,null,this,a,b,c,d)},
dO(a,b,c,d,e,f){d.h("@<0>").J(e).J(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.J===B.p)return a.$2(b,c)
return A.nK(null,null,this,a,b,c,d,e,f)},
c3(a,b,c,d){return b.h("@<0>").J(c).J(d).h("1(2,3)").a(a)}}
A.is.prototype={
$0(){return this.a.dP(this.b)},
$S:0}
A.iX.prototype={
$0(){A.lQ(this.a,this.b)},
$S:0}
A.df.prototype={
gn(a){return this.a},
ga8(){return new A.dg(this,this.$ti.h("dg<1>"))},
am(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.cG(a)},
cG(a){var s=this.d
if(s==null)return!1
return this.a3(this.br(s,a),a)>=0},
q(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.kO(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.kO(q,b)
return r}else return this.cP(b)},
cP(a){var s,r,q=this.d
if(q==null)return null
s=this.br(q,a)
r=this.a3(s,a)
return r<0?null:s[r+1]},
D(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.bo(s==null?m.b=A.jG():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.bo(r==null?m.c=A.jG():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.jG()
p=A.jf(b)&1073741823
o=q[p]
if(o==null){A.jH(q,p,[b,c]);++m.a
m.e=null}else{n=m.a3(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
ao(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.bt()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.q(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.ax(m))}},
bt(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.h5(i.a,null,!1,t.A)
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
this.e=null}A.jH(a,b,c)},
br(a,b){return a[A.jf(b)&1073741823]}}
A.di.prototype={
a3(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.dg.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return new A.dh(s,s.bt(),this.$ti.h("dh<1>"))}}
A.dh.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.ax(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iN:1}
A.aJ.prototype={
cS(){return new A.aJ(A.u(this).h("aJ<1>"))},
gt(a){var s=this,r=new A.bG(s,s.r,A.u(s).h("bG<1>"))
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
return this.a3(s[this.aP(a)],a)>=0},
j(a,b){var s,r,q=this
A.u(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bn(s==null?q.b=A.jJ():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bn(r==null?q.c=A.jJ():r,b)}else return q.cp(b)},
cp(a){var s,r,q,p=this
A.u(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jJ()
r=p.aP(a)
q=s[r]
if(q==null)s[r]=[p.aV(a)]
else{if(p.a3(q,a)>=0)return!1
q.push(p.aV(a))}return!0},
ag(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bD(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bD(s.c,b)
else return s.cU(b)},
cU(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.aP(a)
r=n[s]
q=o.a3(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bP(p)
return!0},
X(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aT()}},
bn(a,b){A.u(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aV(b)
return!0},
bD(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bP(s)
delete a[b]
return!0},
aT(){this.r=this.r+1&1073741823},
aV(a){var s,r=this,q=new A.f5(A.u(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aT()
return q},
bP(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aT()},
aP(a){return J.K(a)&1073741823},
a3(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aX(a[r].a,b))return r
return-1},
$ikp:1}
A.f5.prototype={}
A.bG.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.ax(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iN:1}
A.h4.prototype={
$2(a,b){this.a.D(0,this.b.a(a),this.c.a(b))},
$S:36}
A.D.prototype={
gt(a){return new A.ae(a,this.gn(a),A.bO(a).h("ae<D.E>"))},
P(a,b){return this.q(a,b)},
aE(a,b){var s,r
A.bO(a).h("z(D.E)").a(b)
s=this.gn(a)
for(r=0;r<s;++r){if(!b.$1(this.q(a,r)))return!1
if(s!==this.gn(a))throw A.b(A.ax(a))}return!0},
i(a){return A.ju(a,"[","]")}}
A.bx.prototype={
ao(a,b){var s,r,q,p=A.u(this)
p.h("~(1,2)").a(b)
for(s=this.ga8(),s=s.gt(s),p=p.y[1];s.k();){r=s.gm()
q=this.q(0,r)
b.$2(r,q==null?p.a(q):q)}},
gn(a){var s=this.ga8()
return s.gn(s)},
i(a){return A.h8(this)},
$iam:1}
A.h9.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.o(a)
r.a=(r.a+=s)+": "
s=A.o(b)
r.a+=s},
$S:58}
A.dy.prototype={}
A.c0.prototype={
q(a,b){return this.a.q(0,b)},
gn(a){return this.a.a},
ga8(){var s=this.a
return new A.b0(s,A.u(s).h("b0<1>"))},
i(a){return A.h8(this.a)},
gc9(){var s=this.a
return new A.b2(s,A.u(s).h("b2<2>"))},
gan(){var s=this.a
return new A.b_(s,A.u(s).h("b_<1,2>"))},
$iam:1}
A.d9.prototype={}
A.b6.prototype={
gbZ(a){return this.gn(this)!==0},
C(a,b){var s
for(s=J.a0(A.u(this).h("k<1>").a(b));s.k();)this.j(0,s.gm())},
bV(a){var s,r,q=this.ah(0)
for(s=this.gt(this);s.k();){r=s.gm()
if(a.p(0,r))q.ag(0,r)}return q},
i(a){return A.ju(this,"{","}")},
du(a,b){var s,r,q=this.gt(this)
if(!q.k())return""
s=J.bR(q.gm())
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
P(a,b){var s,r
A.hE(b,"index")
s=this.gt(this)
for(r=b;s.k();){if(r===0)return s.gm();--r}throw A.b(A.h1(b,b-r,this,"index"))},
$ik:1,
$ibl:1}
A.dq.prototype={
ah(a){var s=this.cS()
s.C(0,this)
return s}}
A.fk.prototype={
j(a,b){this.$ti.c.a(b)
return A.na()}}
A.da.prototype={
gn(a){return this.a.a},
gt(a){var s=this.a
return A.jI(s,s.r,A.u(s).c)},
ah(a){return this.a.ah(0)}}
A.cf.prototype={}
A.dz.prototype={}
A.bt.prototype={
U(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bt)if(this.a===b.a)s=this.b===b.b
return s},
gH(a){return A.c2(this.a,this.b,B.h,B.h,B.h,B.h)},
G(a,b){var s
t.df.a(b)
s=B.i.G(this.a,b.a)
if(s!==0)return s
return B.i.G(this.b,b.b)},
i(a){var s=this,r=A.lM(A.mi(s)),q=A.dS(A.mg(s)),p=A.dS(A.mc(s)),o=A.dS(A.md(s)),n=A.dS(A.mf(s)),m=A.dS(A.mh(s)),l=A.ki(A.me(s)),k=s.b,j=k===0?"":A.ki(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iab:1}
A.ia.prototype={
i(a){return this.u()}}
A.I.prototype={
gav(){return A.mb(this)}}
A.dK.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.fG(s)
return"Assertion failed"}}
A.b7.prototype={}
A.aM.prototype={
gaS(){return"Invalid argument"+(!this.a?"(s)":"")},
gaR(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.o(p),n=s.gaS()+q+o
if(!s.a)return n
return n+s.gaR()+": "+A.fG(s.gb9())},
gb9(){return this.b}}
A.d_.prototype={
gb9(){return A.l1(this.b)},
gaS(){return"RangeError"},
gaR(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.o(q):""
else if(q==null)s=": Not greater than or equal to "+A.o(r)
else if(q>r)s=": Not in inclusive range "+A.o(r)+".."+A.o(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.o(r)
return s}}
A.e3.prototype={
gb9(){return A.a(this.b)},
gaS(){return"RangeError"},
gaR(){if(A.a(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gn(a){return this.f}}
A.db.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.eJ.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.c9.prototype={
i(a){return"Bad state: "+this.a}}
A.dR.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.fG(s)+"."}}
A.d7.prototype={
i(a){return"Stack Overflow"},
gav(){return null},
$iI:1}
A.ib.prototype={
i(a){return"Exception: "+this.a}}
A.fN.prototype={
i(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.k.prototype={
b6(a,b,c,d){var s,r
d.a(b)
A.u(this).J(d).h("1(1,k.E)").a(c)
for(s=this.gt(this),r=b;s.k();)r=c.$2(r,s.gm())
return r},
gn(a){var s,r=this.gt(this)
for(s=0;r.k();)++s
return s},
gai(a){var s,r=this.gt(this)
if(!r.k())throw A.b(A.jt())
s=r.gm()
if(r.k())throw A.b(A.kj())
return s},
di(a,b){var s,r
A.u(this).h("z(k.E)").a(b)
for(s=this.gt(this);s.k();){r=s.gm()
if(b.$1(r))return r}throw A.b(A.jt())},
P(a,b){var s,r
A.hE(b,"index")
s=this.gt(this)
for(r=b;s.k();){if(r===0)return s.gm();--r}throw A.b(A.h1(b,b-r,this,"index"))},
i(a){return A.lX(this,"(",")")}}
A.a5.prototype={
i(a){return"MapEntry("+A.o(this.a)+": "+A.o(this.b)+")"}}
A.X.prototype={
gH(a){return A.w.prototype.gH.call(this,0)},
i(a){return"null"}}
A.w.prototype={$iw:1,
U(a,b){return this===b},
gH(a){return A.eo(this)},
i(a){return"Instance of '"+A.ep(this)+"'"},
gE(a){return A.k_(this)},
toString(){return this.i(this)}}
A.fi.prototype={
i(a){return""},
$ibm:1}
A.eE.prototype={
gn(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.hi.prototype={
i(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.jg.prototype={
$1(a){return this.a.aW(this.b.h("0/?").a(a))},
$S:6}
A.jh.prototype={
$1(a){if(a==null)return this.a.bU(new A.hi(a===undefined))
return this.a.bU(a)},
$S:6}
A.j1.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.la(a))return a
s=this.a
a.toString
if(s.am(a))return s.q(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.m(A.aP(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.bL(!0,"isUtc",t.y)
return new A.bt(r,0,!0)}if(a instanceof RegExp)throw A.b(A.j("structured clone of RegExp",null))
if(a instanceof Promise)return A.oj(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.b3(p,p)
s.D(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.cl(n),p=s.gt(n);p.k();)m.push(A.ck(p.gm()))
for(l=0;l<s.gn(n);++l){k=s.q(n,l)
if(!(l<m.length))return A.i(m,l)
j=m[l]
if(k!=null)o.D(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.D(0,a,o)
h=A.a(a.length)
for(s=J.cl(i),l=0;l<h;++l)o.push(this.$1(s.q(i,l)))
return o}return a},
$S:59}
A.hF.prototype={}
A.c5.prototype={
u(){return"QualityProfileKind."+this.b}}
A.ap.prototype={}
A.fz.prototype={}
A.fA.prototype={}
A.ca.prototype={
u(){return"ToneMappingMode."+this.b}}
A.cX.prototype={
v(){var s,r,q,p
for(s=A.m0(["exposure",this.a,"bloomStrength",0,"ssaoStrength",0,"depthOfFieldStrength",0,"vignette",this.e,"grain",this.f,"rainIntensity",0,"surfaceWetness",0,"surfaceSnowCoverage",0,"surfaceDissolution",0,"rainWindowVisibility",1,"ditherStrength",0,"colorGradeStrength",0,"affineWarpStrength",0,"vertexSnapGrid",0,"vhsChromaWeight",0,"vhsTrackingWeight",0,"vhsNoiseWeight",0,"vhsHeadSwitchWeight",0,"vhsDropoutWeight",0,"vhsGhostWeight",0],t.N,t.i),s=new A.b_(s,A.u(s).h("b_<1,2>")).gt(0);s.k();){r=s.d
q=r.a
p=r.b
if(!isFinite(p)||p<0)throw A.b(A.j("PostProcessState."+q+" must be >= 0: "+A.o(p),null))}}}
A.cq.prototype={
gbY(){var s,r=this,q=r.x
if(q===$){s=r.b.bX()
r.x!==$&&A.ln()
r.x=s
q=s}return q},
v(){var s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=i.d
if(!g.gI(0))throw A.b(A.j("CameraView.eye must be finite: "+g.i(0),h))
g=i.e
if(!g.gI(0)||g.ga0()<1e-12)throw A.b(A.j("CameraView.forward must be finite and nonzero: "+g.i(0),h))
g=i.f
if(isFinite(g)){s=i.r
s=!isFinite(s)||g<=0||s<=g}else s=!0
if(s)throw A.b(A.j("CameraView requires 0 < near < far, got "+A.o(g)+"/"+i.r,h))
g=i.w
if(!isFinite(g)||g<=0)throw A.b(A.j("CameraView.aspect must be finite and > 0: "+A.o(g),h))
g=i.a
if(!g.gI(0)||!i.b.gI(0)||!i.c.gI(0))throw A.b(A.j("CameraView matrices must be finite",h))
for(s=i.c.a,r=s.length,g=i.b.B(0,g).a,q=g.length,p=0,o=-1,n=0;n<16;++n){if(!(n<r))return A.i(s,n)
m=s[n]
if(!(n<q))return A.i(g,n)
l=g[n]
k=Math.abs(m-l)/(1+Math.abs(l))
if(k>p){o=n
p=k}}if(p>0.0001){m=B.n.dT(p,2)
l=B.i.a_(o,4)
j=B.i.aI(o,4)
if(!(o>=0&&o<r))return A.i(s,o)
s=s[o]
if(!(o<q))return A.i(g,o)
throw A.b(A.j("CameraView.viewProjection must equal projection * view. Worst relative mismatch "+m+" at column "+l+" row "+j+" (got "+A.o(s)+", expected "+A.o(g[o])+"). Prefer CameraView.look/lookAt/fromMatrices, which derive it.",h))}}}
A.cB.prototype={
v(){var s,r,q,p,o,n,m,l,k,j=this,i=null
if(!j.a.gI(0)||!B.v.gI(0)||!j.fx.gI(0)||!B.M.gI(0)||!j.dx.gI(0))throw A.b(A.j("FrameEnvironment colors must be finite",i))
s=isFinite(0)
if(s)r=!isFinite(1)
else r=!0
if(r)throw A.b(A.j("FrameEnvironment requires fogEnd >= fogStart, got 0/1",i))
r=j.fy
if(!isFinite(r))throw A.b(A.j("FrameEnvironment.ambientIntensity must be >= 0: "+r,i))
r=j.go
if(r!=null){q=r.a
if(!q.gI(0)||q.ga0()<1e-12)A.m(A.j("DirectionalLight.direction must be finite and nonzero: "+q.i(0),i))
r=r.c
if(!isFinite(r)||r<0)A.m(A.j("DirectionalLight.intensity must be >= 0: "+A.o(r),i))}for(r=j.id,q=r.length,p=0;p<q;++p){o=r[p]
n=o.b
if(!(isFinite(n.a)&&isFinite(n.b)&&isFinite(n.c)))A.m(A.j("PointLight.position must be finite: "+n.i(0),i))
n=o.d
if(!isFinite(n)||n<0)A.m(A.j("PointLight.intensity must be >= 0: "+A.o(n),i))
n=o.e
if(!isFinite(n)||n<=0)A.m(A.j("PointLight.radius must be > 0: "+n,i))}for(r=isFinite(1),q=isFinite(-1),p=0;!1;++p){if(s)n=r
else n=!1
if(!n)A.m(A.j("SpotLight.position must be finite: "+B.j.i(0),i))
if(s)n=q
else n=!1
if(!n)A.m(A.j("SpotLight.direction must be finite and nonzero: "+B.o.i(0),i))}q=t.N
m=A.al(q)
for(p=0;!1;++p){l=B.aA[p]
l.v()
if(!m.j(0,l.gA()))throw A.b(A.j("FrameEnvironment.volumetricSources contains duplicate id: "+A.o(l.gA()),i))}n=!0
if(isFinite(0.02))if(s)if(isFinite(0.7))if(isFinite(0.35))if(r)if(isFinite(0.003)){s=j.dy
if(!(s<0))if(!(s>4))if(isFinite(s)){s=j.fr
s=s<0||s>1||!isFinite(s)}else s=n
else s=n
else s=n}else s=n
else s=n
else s=n
else s=n
else s=n
else s=n
if(s)throw A.b(A.j("invalid volumetric medium controls",i))
k=A.al(q)
for(p=0;!1;++p){l=B.aB[p]
l.v()
if(!k.j(0,l.gA()))throw A.b(A.j("FrameEnvironment.thermalSources contains duplicate id: "+A.o(l.gA()),i))}}}
A.fP.prototype={}
A.fQ.prototype={
ba(a){++this.b}}
A.b5.prototype={
U(a,b){if(b==null)return!1
return J.dJ(b)===A.k_(this)&&b instanceof A.b5&&this.a===b.a&&this.b===b.b},
gH(a){return A.c2(A.k_(this),this.a,this.b,B.h,B.h,B.h)}}
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
A.bg.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.bZ.prototype={
u(){return"HandleRejection."+this.b}}
A.h0.prototype={
i(a){return"HandleException("+this.a.b+", "+this.b.i(0)+")"}}
A.c4.prototype={
i(a){var s=this.b,r=this.a.a
return s==null?r.b+": ok":r.b+": "+A.o(s)}}
A.dN.prototype={}
A.j2.prototype={
$1(a){return t.W.a(a)===this.a},
$S:62}
A.ad.prototype={
gI(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
U(a,b){if(b==null)return!1
return b instanceof A.ad&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gH(a){return A.c2(this.a,this.b,this.c,B.h,B.h,B.h)},
i(a){return"LinearColor("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.dV.prototype={}
A.bz.prototype={}
A.aj.prototype={}
A.ji.prototype={
$2(a,b){var s,r=t.fk
r.a(a)
s=B.n.G(r.a(b).a,a.a)
return s===0?0:s},
$S:15}
A.fv.prototype={
u(){return"AlphaMode."+this.b}}
A.ea.prototype={
u(){return"MaterialMapColorSpace."+this.b}}
A.an.prototype={
v(){var s,r,q,p,o,n=this,m=null
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
A.ba.prototype={
u(){return"VertexAttributeKind."+this.b}}
A.a7.prototype={}
A.i_.prototype={
v(){var s,r,q,p,o='VertexLayoutDescriptor "surfaceV2": attribute '
for(s=0;s<7;++s){r=B.A[s]
q=r.c
if(q<=0)throw A.b(A.j(o+r.a.i(0)+" must have a positive floatCount",null))
p=r.b
q=p+q
if(q>18)throw A.b(A.j(o+r.a.i(0)+" range ["+p+", "+q+") exceeds stride 18",null))}q=t.fg.a(new A.i0())
for(p=B.a.gt(B.A),q=new A.F(p,q,t.an);q.k();)if(p.gm().c!==4)throw A.b(A.j('VertexLayoutDescriptor "surfaceV2": tangent4 must contain 4 floats',null))}}
A.i0.prototype={
$1(a){return t.G.a(a).a===B.aj},
$S:7}
A.bk.prototype={
v(){var s,r,q,p,o,n=this
n.a.v()
s=n.b.length
if(B.i.aI(s,18)!==0)throw A.b(A.j("MeshData.vertices length "+s+" is not a multiple of stride 18",null))
n.d4()
r=s/18|0
for(s=A.m4(n.c),q=s.length,p=0;p<q;++p){o=s[p]
if(o>=r)throw A.b(A.j("MeshData index "+o+" out of range for "+r+" vertices",null))}s=n.d
q=s.a
if(q.gI(0)&&s.b.gI(0)){s=s.b
s=q.a<=s.a&&q.b<=s.b&&q.c<=s.c}else s=!1
if(!s)throw A.b(A.j("MeshData.localBounds must be a valid AABB",null))},
d4(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=null,a2=t.fg,a3=t.fl,a4=new A.a_(B.A,a2.a(new A.hc()),a3)
if(!a4.gt(0).k())return
s=new A.a_(B.A,a2.a(new A.hd()),a3)
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
if(!B.a.aE(A.c([j,h,g,f,e,d,c],p),new A.he()))throw A.b(A.j("surface-v2 tangent basis must be finite",a1))
if(b<1e-8||a<1e-8)throw A.b(A.j("surface-v2 tangent basis must be non-zero",a1))
a0=(j*f+h*e+g*d)/Math.sqrt(b*a)
if(Math.abs(a0)>0.05)throw A.b(A.j("surface-v2 tangent must be orthogonal to its normal: "+A.o(a0),a1))
if(Math.abs(Math.abs(c)-1)>0.05)throw A.b(A.j("surface-v2 tangent handedness must be -1 or +1: "+A.o(c),a1))}}}
A.hc.prototype={
$1(a){return t.G.a(a).a===B.aj},
$S:7}
A.hd.prototype={
$1(a){return t.G.a(a).a===B.b1},
$S:7}
A.he.prototype={
$1(a){return isFinite(A.iB(a))},
$S:12}
A.fE.prototype={}
A.hl.prototype={
v(){var s=this.a,r=s.a
if(!r.p(0,"sceneColor")||!r.p(0,"present"))throw A.b(A.j("resource plan must contain sceneColor and present",null))
if(s.d5(0,new A.hn()))throw A.b(A.j("resource plan contains an empty resource ID",null))
if(this.b!==r.p(0,"vhsOutput"))throw A.b(A.j("resource history does not match vhsOutput ownership",null))}}
A.hn.prototype={
$1(a){return A.aU(a).length===0},
$S:8}
A.hA.prototype={}
A.et.prototype={
bW(a){var s=this
if(s.d)A.m(A.l("resource assembler is disposed"))
if(s.a!=null)throw A.b(A.l("resource assembler is initialized"))
a.v()
s.a=a
s.c=1},
a7(){if(this.d)return
this.d=!0
this.a=null}}
A.cz.prototype={
u(){return"DrawMode."+this.b}}
A.fx.prototype={
u(){return"BlendMode."+this.b}}
A.c7.prototype={}
A.hU.prototype={
i(a){var s=this
return"SurfaceMetrics(css "+s.a+"x"+s.b+", pixels "+s.c+"x"+s.d+", dpr "+A.o(s.e)+", visible: true)"},
v(){var s,r=this
if(r.a<0||r.b<0)throw A.b(A.j("SurfaceMetrics css size must be >= 0",null))
if(r.c<0||r.d<0)throw A.b(A.j("SurfaceMetrics pixel size must be >= 0",null))
s=r.e
if(!isFinite(s)||s<=0)throw A.b(A.j("SurfaceMetrics.devicePixelRatio must be finite and > 0: "+A.o(s),null))}}
A.fy.prototype={
u(){return"ColorEncoding."+this.b}}
A.d1.prototype={
v(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.bV(B.d8)
if(o.a!==0)A.m(A.aF(o,r,"contains unknown pipeline features"))
if(q.a===B.aK&&p.gbZ(p))A.m(A.aF(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.b(A.j("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.b(A.j("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.c6.prototype={
u(){return"RendererState."+this.b}}
A.Q.prototype={}
A.fR.prototype={
i(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.b+" tris="+s.c+" culled="+s.d+" gpu="+s.r+"B)"}}
A.eb.prototype={
dG(a){return this.a.b0(a)}}
A.hb.prototype={
$3(a,b,c){return new A.aO(A.a(a),A.a(b),A.bI(c))},
$S:20}
A.eL.prototype={}
A.hf.prototype={
bQ(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.b,d=A.kH(f,new A.e_(e.byteLength,B.ap,B.bv))
if(f.b!==B.d)A.m(A.l(g))
s=A.t(d.a)
r=f.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.aB(f)
A.at(f,p)
if(f.b!==B.d)A.m(A.l(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=A.al(t.S)
for(n=a.a,m=0;m<7;++m){l=B.A[m]
k=A.le(l.a)
if(!o.j(0,k))continue
j=A.nh(n,k,l)
if(f.b!==B.d)A.m(A.l(g))
r.vertexAttribPointer.apply(r,[k,j,A.a(q.WebGL2RenderingContext.FLOAT),!1,72,l.b*4])
if(f.b!==B.d)A.m(A.l(g))
r.enableVertexAttribArray(k)}i=a.c
h=A.kH(f,new A.e_(A.kt(i),B.ap,B.ao))
if(f.b!==B.d)A.m(A.l(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),A.t(h.a))
A.mJ(f,h,t.bW.a(i))
f=i.length
return new A.eL(d,h,p,f,e.length/18|0,!1)},
dA(a){var s=this.c.q(0,a.a)
if(s==null)throw A.b(A.bf(B.L,a))
this.b.b0(a)
return s},
bd(){var s,r,q,p
for(s=this.b.ae(),r=s.$ti,s=new A.aK(s.a(),r.h("aK<1>")),q=this.c,r=r.c;s.k();){p=s.b
if(p==null)p=r.a(p)
q.D(0,p.a.a,this.bQ(p.b))}},
gaq(){return this.b.ae().b6(0,0,new A.hh(),t.S)}}
A.hg.prototype={
$3(a,b,c){return new A.ao(A.a(a),A.a(b),A.bI(c))},
$S:21}
A.hh.prototype={
$2(a,b){var s,r
A.a(a)
s=t.ai.a(b).b
r=s.b.byteLength
s=A.kt(s.c)
return a+r+s},
$S:14}
A.eH.prototype={
W(a){var s=this.a,r=A.kI(s,B.b7)
A.kJ(s,r,0,a)
return r},
dC(a){var s=this.d
s===$&&A.aW()
return s},
dK(a){var s=this.e
s===$&&A.aW()
return s},
dM(a){var s=this.f
s===$&&A.aW()
return s},
dE(a){var s=this.r
s===$&&A.aW()
return s},
dI(a){var s=this.w
s===$&&A.aW()
return s},
a7(){var s,r,q,p,o,n=this
for(s=n.c,r=new A.b1(s,s.r,s.e,A.u(s).h("b1<2>")),q=n.a,p=q.a,o=t.R;r.k();)p.deleteTexture(o.a(r.d.a).a)
s.X(0)
s=n.d
s===$&&A.aW()
A.eP(q,s)
s=n.e
s===$&&A.aW()
A.eP(q,s)
s=n.f
s===$&&A.aW()
A.eP(q,s)
s=n.r
s===$&&A.aW()
A.eP(q,s)
s=n.w
s===$&&A.aW()
A.eP(q,s)},
bd(){var s,r,q,p,o,n,m,l,k,j=this
j.d=j.W($.k8())
j.e=j.W($.k5())
j.f=j.W($.k6())
j.r=j.W($.k4())
j.w=j.W($.k7())
for(s=j.b.ae(),r=s.$ti,s=new A.aK(s.a(),r.h("aK<1>")),q=j.c,p=j.a,r=r.c;s.k();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
if(m.gc0().aE(0,new A.hX()))continue
l=A.kI(p,m.gl())
for(k=0;B.i.aH(k,m.gc0().length);++k){o=m.gc0()
if(!(k<o.length))return A.i(o,k)
A.kJ(p,l,k,o[k])}if(m.ge2())A.mL(p,l)
q.D(0,n.a,l)}},
gaq(){return this.b.ae().b6(0,0,new A.hW(),t.S)}}
A.hV.prototype={
$3(a,b,c){return new A.ar(A.a(a),A.a(b),A.bI(c))},
$S:24}
A.hX.prototype={
$1(a){return!1},
$S:25}
A.hW.prototype={
$2(a,b){var s
A.a(a)
s=t.dU.a(b).b.gl()
return B.i.V(a,s.ge6().B(0,s.ge_()).B(0,s.ge0()).B(0,4))},
$S:26}
A.jj.prototype={
$2(a,b){var s,r=t.eS
r.a(a)
s=J.ka(r.a(b).a,a.a)
return s},
$S:27}
A.hk.prototype={
gb5(){var s=this,r=Math.cos(s.d),q=Math.sin(s.d),p=Math.sin(s.c),o=Math.cos(s.c),n=s.a,m=s.b
return n.V(0,new A.f(r*p*m,q*m,r*o*m))},
gc4(){return this.a.aj(0,this.gb5()).gT().a6(B.j).gT()},
dV(a){var s,r,q,p=this
if(a<=0)return
s=B.n.al(1-Math.exp(-10*a),0,1)
r=p.c
p.c=r+(p.as-r)*s
r=p.d
p.d=r+(p.at-r)*s
r=p.b
p.b=r+(p.ax-r)*s
r=p.ay
q=p.a
p.a=q.V(0,r.aj(0,q).B(0,s))}}
A.bw.prototype={
gdm(){return this.b.length}}
A.dX.prototype={
dc(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h
t.U.a(a)
s=new A.hI(A.c([],t.cU),A.al(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p)r[p].M(s,b)
o=s.da(a,!1)
if(o.b.length!==0)return new A.dY(o,B.c1)
q=o.a
n=A.H(q)
m=new A.af(q,n.h("v(1)").a(new A.fJ()),n.h("af<1,v>")).ah(0)
l=A.c([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p){k=r[p]
for(n=k.L(d),j=n.length,i=0;i<n.length;n.length===j||(0,A.A)(n),++i){h=n[i]
if(!m.p(0,h.gl().a))throw A.b(A.l('RenderFeature "'+k.gA()+'" created a pass "'+h.gl().a+'" that it never declared into the graph'))
B.a.j(l,h)}}B.a.ab(l,new A.fK(o))
return new A.dY(o,l)}}
A.fJ.prototype={
$1(a){return t.z.a(a).a},
$S:28}
A.fK.prototype={
$2(a,b){var s=t.fA
s.a(a)
s.a(b)
s=this.a.a
return B.i.G(B.a.b7(s,new A.fH(a)),B.a.b7(s,new A.fI(b)))},
$S:29}
A.fH.prototype={
$1(a){return t.z.a(a).a===this.a.gl().a},
$S:4}
A.fI.prototype={
$1(a){return t.z.a(a).a===this.a.gl().a},
$S:4}
A.dY.prototype={}
A.bX.prototype={
u(){return"FrameQueueState."+this.b}}
A.dZ.prototype={$imo:1}
A.fO.prototype={
d8(a){if(a.length===0)throw A.b(A.aF(a,"passId",null))
this.b=a
this.a.bc(a,A.lh())},
ce(){var s,r,q,p,o=t.A
o=A.b3(o,o)
for(s=this.a,s=new A.b_(s,A.u(s).h("b_<1,2>")).gt(0);s.k();){r=s.d
q=r.a
p=r.b
o.D(0,q,new A.Q(p.a,p.b,p.d))}return A.kh(o,t.N,t.o)},
ad(a,b){var s,r=this.b
if(r==null)throw A.b(A.l("draw recorded outside an active render pass"))
if(b<1)throw A.b(A.j("draw count and instance count must be positive",null))
s=this.a.q(0,r);++s.a
s.d+=b
s.b=s.b+B.i.a_(a,3)*b}}
A.ce.prototype={}
A.E.prototype={
gaf(){var s=this.c,r=A.H(s)
return new A.a_(s,r.h("z(1)").a(new A.ho()),r.h("a_<1>"))},
gau(){var s=this.c,r=A.H(s)
return new A.a_(s,r.h("z(1)").a(new A.hp()),r.h("a_<1>"))},
i(a){return"PassDeclaration("+this.a+" @ "+this.b.i(0)+")"}}
A.ho.prototype={
$1(a){var s=t.L.a(a).b
return s===B.c||s===B.t},
$S:9}
A.hp.prototype={
$1(a){return t.L.a(a).b===B.e},
$S:9}
A.aH.prototype={
u(){return"GraphValidationFailureKind."+this.b}}
A.a4.prototype={
i(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.er.prototype={
u(){return"ResourceFormat."+this.b}}
A.aY.prototype={
u(){return"GraphStage."+this.b}}
A.L.prototype={
c1(){var s=this
return new A.L(s.a,s.b,s.c,s.d,s.e,s.f+1)},
U(a,b){var s=this
if(b==null)return!1
return b instanceof A.L&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gH(a){var s=this
return A.c2(s.a,s.b,s.c,s.d,s.e,s.f)},
i(a){var s=this,r=s.b.i(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.d3.prototype={
u(){return"ResourceAccess."+this.b}}
A.n.prototype={}
A.cu.prototype={}
A.hC.prototype={
N(a){var s,r,q,p,o,n,m=this
a.v()
s=null
try{r=a.d.ga8()
r=A.az(r,A.u(r).h("k.E"))
q=t.dy
s=A.mM(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.bQ(p) instanceof A.d6){++m.e
throw p}else throw p}o=new A.cu(s)
r=m.b
q=a.a
n=r.q(0,q)
r.D(0,q,o);++m.d
if(n!=null)m.a.a.deleteProgram(A.t(n.b.a))
return o},
cI(a){var s,r
t.cr.a(a)
for(s=a.a,s=new A.b1(s,s.r,s.e,a.$ti.h("b1<1>")),r=this.a.a;s.k();)r.deleteProgram(A.t(s.d.b.a))}}
A.a1.prototype={
v(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.b(A.j("ProgramSource.id must not be empty",m))
s=t.S
r=A.al(s)
for(q=this.d.gan(),q=q.gt(q);q.k();){p=q.gm()
o=p.b
if(o<0)throw A.b(A.j('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.j(0,o))throw A.b(A.j('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.al(s)
for(s=this.e.gan(),s=s.gt(s);s.k();){q=s.gm()
p=q.b
if(p<0)throw A.b(A.j('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.j(0,p))throw A.b(A.j('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.hG.prototype={}
A.Y.prototype={
O(){var s=this
return A.lO(B.b4,s.f,B.E,B.C,!0,!0,!0,!0,s.r,B.G,B.H,s.d,s.e,!0,!1,!1)}}
A.hI.prototype={
da(a,b){var s=this.d3(t.U.a(a),!1),r=this.a,q=A.H(r)
return new A.hH(A.h7(new A.a_(r,q.h("z(1)").a(new A.hN()),q.h("a_<1>")),t.z),s)},
d3(a,b){var s,r,q,p,o,n,m=this
t.U.a(a)
s=A.c([],t.b7)
r=m.a
q=A.H(r)
p=q.h("a_<1>")
o=A.az(new A.a_(r,q.h("z(1)").a(new A.hM()),p),p.h("k.E"))
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
p=B.a4.bV(b)
if(p.a!==0)B.a.j(c,new A.a4(B.bI,q.a,"missing capabilities: "+p.du(0,", ")))}},
cw(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gaf(),o=J.a0(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gm().a
if(m.e>1)B.a.j(b,new A.a4(B.bD,n,"reads multisampled resource "+m.i(0)+" directly; resolve before sampling"))}}},
cA(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.H(a),r=s.h("z(1)").a(new A.hL()),q=B.a.gt(a),s=new A.F(q,r,s.h("F<1>"));s.k();){r=q.gm()
p=r.gaf()
o=A.az(p,p.$ti.h("k.E"))
p=r.gau()
n=A.az(p,p.$ti.h("k.E"))
if(o.length!==1||n.length!==1){B.a.j(b,new A.a4(B.W,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.a.gai(o).a
l=B.a.gai(n).a
if(m.e<=1||l.e>1)B.a.j(b,new A.a4(B.W,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.a.j(b,new A.a4(B.W,r.a,"resolve source and destination must match format and extent"))}},
cv(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.A)(p),++m){l=p[m]
if(l.b===B.t)B.a.j(c,new A.a4(B.bG,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
cC(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.b3(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.A)(a),++q){p=a[q]
for(o=p.gau(),n=J.a0(o.a),o=new A.F(n,o.b,o.$ti.h("F<1>")),m=p.a;o.k();){l=n.gm().a
k=l.a+"#"+l.f
j=s.q(0,k)
if(j!=null){B.a.j(b,new A.a4(B.bC,m,l.i(0)+" already written by "+j.a))
continue}s.D(0,k,p)}}return s},
cz(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gaf(),p=J.a0(q.a),q=new A.F(p,q.b,q.$ti.h("F<1>")),o=r.a;q.k();){n=p.gm()
if(n.b===B.t)continue
n=n.a
m=b.q(0,n.a+"#"+n.f)
if(m==null){B.a.j(c,new A.a4(B.au,o,"reads "+n.i(0)+" but no pass writes that version"))
continue}if(B.a.dk(a,m)>s)B.a.j(c,new A.a4(B.au,o,"reads "+n.i(0)+" before writer "+m.a+" runs"))}}},
cB(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gaf(),o=J.a0(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gm()
if(m.b===B.t)continue
for(l=q.gau(),k=J.a0(l.a),l=new A.F(k,l.b,l.$ti.h("F<1>")),m=m.a,j=m.a,i=m.f;l.k();){h=k.gm().a
if(j===h.a&&i===h.f)B.a.j(b,new A.a4(B.bF,n,"reads and writes "+m.i(0)+" at the same version; declare a ping-pong version bump"))}}}},
cu(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gaf(),o=J.a0(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>")),n=q.a;p.k();){m=o.gm()
if(m.b===B.t)continue
l=m.a
k=b.q(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gau().di(0,new A.hK(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.a.j(c,new A.a4(B.bE,n,"reads "+l.i(0)+" but writer "+k.a+" produced "+j.i(0)))}}},
ct(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.b3(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gau(),o=J.a0(p.a),p=new A.F(o,p.b,p.$ti.h("F<1>"));p.k();){n=o.gm().a
r.D(0,n.a+"#"+n.f,q)}m=J.jv(p,t.cJ)
for(l=0;l<p;++l)m[l]=A.al(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gaf(),p=J.a0(s.a),s=new A.F(p,s.b,s.$ti.h("F<1>"));s.k();){o=p.gm()
if(o.b===B.t)continue
o=o.a
k=r.q(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.i(m,k)
m[k].j(0,q)}}p=t.y
j=A.h5(s,!1,!1,p)
s=a.length
i=A.h5(s,!1,!1,p)
h=new A.hJ(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.i(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.i(a,q)
B.a.j(b,new A.a4(B.bH,a[q].a,"participates in a resource dependency cycle"))}}}}
A.hN.prototype={
$1(a){t.z.a(a)
return A.jA()},
$S:4}
A.hM.prototype={
$1(a){t.z.a(a)
return A.jA()},
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
r=A.jI(r,r.r,A.u(r).c)
q=r.$ti.c
while(r.k()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.a.D(n,a,!1)
B.a.D(s,a,!0)
return!1},
$S:32}
A.hH.prototype={}
A.f4.prototype={$iaq:1,
gA(){return this.a},
gl(){return this.b},
gbh(){return this.c}}
A.d0.prototype={
bR(a){var s,r,q=a.c,p=q.a
if(!p.gI(0))A.m(A.j("Transform.translation must be finite: "+p.i(0),null))
p=q.b
if(!(isFinite(p.a)&&isFinite(p.b)&&isFinite(p.c)&&isFinite(p.d)))A.m(A.j("Transform.rotation must be finite: "+p.i(0),null))
p=q.c
if(!isFinite(p)||p<=0)A.m(A.j(u.f+p,null))
s=this.a.b0(a.a)
q=q.a1()
p=s.d.gaY()
r=A.H(p)
return A.jr(new A.af(p,r.h("f(1)").a(q.gbg()),r.h("af<1,f>")))},
gc_(){return new A.aT(this.dt(),t.eM)},
dt(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d
return function $async$gc_(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b.ae(),n=o.$ti,o=new A.aK(o.a(),n.h("aK<1>")),m=s.a,l=m.$ti,k=l.c,j=m.b,n=n.c,l=l.y[1]
case 3:if(!o.k()){r=4
break}i=o.b
if(i==null)i=n.a(i)
h=i.a
g=i.b
i=g.c
i.v()
f=k.a(g.a)
m.ac(f)
f=f.a
if(!(f>=0&&f<j.length)){A.i(j,f)
r=1
break}e=j[f].c
f=(e==null?l.a(e):e).d
i=i.a1()
f=f.gaY()
d=A.H(f)
r=5
return a.b=new A.f4(h,g,A.jr(new A.af(f,d.h("f(1)").a(i.gbg()),d.h("af<1,f>")))),1
case 5:r=3
break
case 4:case 1:return 0
case 2:return a.c=p.at(-1),3}}}},
$imr:1}
A.hO.prototype={
$3(a,b,c){return new A.bg(A.a(a),A.a(b),A.bI(c))},
$S:33}
A.es.prototype={
aa(a,b){var s,r
if(this.x)A.m(A.l("resource library is disposed"))
s=this.a
a.v()
r=s.b.b_(a,b)
s.c.D(0,r.a,s.bQ(a))
this.f.j(0,r)
return r},
a9(a){var s
if(this.x)A.m(A.l("resource library is disposed"))
a.v()
s=this.b.a.b_(a,null)
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
if(f!=null)h.deleteBuffer(A.t(f.a))}m.b.aG(k)}s.X(0)
r.X(0)
q.X(0)
p.a7()
e.x=!0},
$imt:1}
A.ic.prototype={}
A.fj.prototype={$iaq:1,
gA(){return this.a},
gl(){return this.b},
gbh(){return this.c}}
A.iT.prototype={
$1(a){var s=this.a.w.a.dA(a),r=s.b!=null,q=r?s.d:s.e
return new A.d2(s.c,r,q,s.f)},
$S:34}
A.iU.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.p(0,a))return this.b.x.gm().c2(a)
if(b!=null&&s.p(0,b))return this.b.x.gm().c2(b)
throw A.b(A.l("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:35}
A.iS.prototype={
$0(){return this.a.$1("shadowMap")},
$S:1}
A.iL.prototype={
$0(){return null},
$S:37}
A.iM.prototype={
$0(){var s=this.a.at
if(s==null)return B.X
return A.ol(B.X,3,s.a.d,null)},
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
s===$&&A.aW()
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
A.f8.prototype={$imq:1}
A.f1.prototype={$ilR:1}
A.ew.prototype={
gR(){var s=this.w
return s==null?A.m(A.l("renderer is not initialized")):s},
dl(a,b){var s,r,q,p,o,n,m,l=this
if(l.e!==B.a0)throw A.b(A.l("renderer can only be initialized once"))
a.v()
b.v()
s=l.a
if(s.b===B.K)throw A.b(A.l("renderer device is context lost"))
l.e=B.cS
try{r=v.G
s.ak(A.a(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.ak(A.a(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.ak(A.a(r.WebGL2RenderingContext.MAX_SAMPLES))
s.ak(A.a(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.ak(A.a(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
q=s.r
if(q.p(0,"EXT_texture_filter_anisotropic"))s.bB(34047)
p=q.p(0,"EXT_disjoint_timer_query_webgl2")
s.w=p
q.p(0,"EXT_color_buffer_float")
q.p(0,"EXT_color_buffer_half_float")
q.p(0,"WEBGL_lose_context")
q=s.a
A.ck(q.getParameter(A.a(r.WebGL2RenderingContext.RENDERER)))
A.ck(q.getParameter(A.a(r.WebGL2RenderingContext.VENDOR)))
l.r=new A.hF(p)
r=l.b
o=A.hm(a)
q=r.a
if(q.a!=null)A.m(A.l("configuration state is already initialized"))
a.v()
q.a=a
A.hm(a)
q.d=1
r.b.bW(o)
r=A.m3()
l.w=new A.es(A.m5(s),r,A.mx(s),A.al(t.cA),A.al(t.eL),A.al(t.aj))
r=new A.et()
q=new A.fV(s,r)
o=A.hm(a)
n=q.bu(o,a)
r.bW(o)
q.c=new A.en(new A.hA(o),n)
l.x=q
l.y=new A.hC(s,A.b3(t.N,t.dN))
l.as=a
A.l3(l)
l.e=B.a1}catch(m){s=l.y
if(s!=null){r=s.b
s.cI(new A.b2(r,A.u(r).h("b2<2>")))
r.X(0)}s=l.x
if(s!=null)s.a7()
s=l.w
if(s!=null)s.a7()
l.w=null
l.e=B.a0
throw m}s=new A.R($.J,t.cd)
s.aM(null)
return s},
d6(a,b){var s,r,q,p,o=this
o.cT()
o.az()
r=B.a.p(o.d,a)
if(!r)throw A.b(A.j("world was not created by this renderer",null))
if(o.at!=null)throw A.b(A.l("renderer.beginFrame called twice without end/abort"))
b.a.v()
b.b.v()
b.c.v()
r=b.w
if(!isFinite(r))A.m(A.j("FrameInput.timeSeconds must be finite: "+A.o(r),null))
o.at=b
o.ax=a
q=o.c
if(q.b===B.J)A.m(A.l("FrameQueue.beginFrame called twice without end/abort"))
q.b=B.J
q.c=0
B.a.X(q.a)
s=q
try{r=o.r
if((r==null?A.m(A.l("renderer is not initialized")):r).z)o.b$=o.a.d7()
return s}catch(p){if(q.b!==B.J)A.m(A.l("FrameQueue.abortFrame called without an active frame"))
q.c=0
q.b=B.bs
o.bm()
o.ax=o.at=null
throw p}},
dg(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
d.az()
s=d.at
r=d.ax
if(s==null||r==null)throw A.b(A.l("renderer.endFrame called without an active frame"))
m=d.c
if(m.b!==B.J)A.m(A.l("FrameQueue.endFrame called without an active frame"))
l=m.a
k=A.hT(l,0,A.bL(m.c,"count",t.S),A.H(l).c).c7(0,!1)
m.b=B.br
q=k
try{p=A.nk(d,r,s,q)
o=p.a.ce()
m=o.gan()
l=A.u(m)
n=new A.cN(new A.a_(m,l.h("z(k.E)").a(new A.hP()),l.h("a_<k.E>")),l.h("Q(k.E)").a(new A.hQ()),l.h("cN<k.E,Q>")).b6(0,B.bp,new A.hR(),t.o)
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
return new A.fR(l,m,j,i,h,f+g)}finally{d.cO(s.e)
d.ax=d.at=null}},
cT(){var s,r,q,p=this
if(p.e!==B.a2)return
if(p.a.b===B.K)throw A.b(A.l("renderer context remains lost"))
s=p.w
if(s.x)A.m(A.l("resource library is disposed"))
s.a.bd()
s.c.bd()
s=p.x
s.toString
r=p.as
r.toString
if(s.e)A.m(A.l("GPU resource adapter is disposed"))
q=s.c
if(q==null)A.m(A.l("GPU resource adapter is not initialized"))
s.c=new A.en(q.a,s.bu(A.hm(r),r))
s=p.y
s.c=null
s.b.X(0)
A.l3(p)
p.e=B.a1},
az(){var s=this,r=s.e
if(r!==B.a1)throw A.b(A.l("renderer is not ready: "+r.b))
if(s.a.b===B.K){s.cK()
s.e=B.a2
throw A.b(A.l("renderer context lost"))}},
$imv:1}
A.hP.prototype={
$1(a){t.ao.a(a)
return A.op(a.a.toLowerCase(),"world",0)},
$S:43}
A.hQ.prototype={
$1(a){return t.ao.a(a).b},
$S:44}
A.hR.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return new A.Q(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:45}
A.f7.prototype={}
A.ip.prototype={
cO(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.d)A.m(A.l(u.k))
r=s.bN(o)
if(r.b)A.m(A.l("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.a.j(p.a$,new A.f7(o))}catch(q){p.aQ(o)}},
bm(){var s=this.b$
this.b$=null
if(s!=null)this.aQ(s)},
cK(){var s,r,q
this.bm()
s=this.a$
r=J.km(s.slice(0),A.H(s).c)
B.a.X(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.A)(r),++q)this.aQ(r[q].b)},
aQ(a){var s,r
try{s=this.a
s.a.deleteQuery(s.bN(a).a)}catch(r){}}}
A.fc.prototype={}
A.ey.prototype={
u(){return"ShadowCasterLod."+this.b}}
A.ai.prototype={
G(a,b){var s,r=this
t.fy.a(b)
s=B.i.G(r.a.a,b.a.a)
if(s!==0)return s
s=B.i.G(r.b.a,b.b.a)
if(s!==0)return s
s=B.i.G(r.c.a,b.c.a)
if(s!==0)return s
return B.i.G(r.d,b.d)},
$iab:1}
A.ah.prototype={
G(a,b){var s
t.g0.a(b)
s=B.n.G(b.a,this.a)
if(s!==0)return s
return B.i.G(this.b,b.b)},
$iab:1}
A.T.prototype={}
A.jn.prototype={
$2(a,b){var s=t.k
return s.a(a).a.G(0,s.a(b).a)},
$S:46}
A.jo.prototype={
$1(a){return t.k.a(a).b},
$S:47}
A.jl.prototype={
$2(a,b){var s=t.b
return s.a(a).a.G(0,s.a(b).a)},
$S:48}
A.jm.prototype={
$1(a){return t.b.a(a).b},
$S:49}
A.fD.prototype={}
A.fC.prototype={}
A.hB.prototype={
$6(a,b,c,d,e,f){var s=this.a,r=s.a.length/18|0,q=this.b
s.F(a,e,f,new A.P(0,0).B(0,q))
s.F(b,e,f,new A.P(1,0).B(0,q))
s.F(c,e,f,new A.P(1,1).B(0,q))
s.F(d,e,f,new A.P(0,1).B(0,q))
q=r+2
B.a.C(s.b,A.c([r,r+1,q,r,q,r+3],t.t))},
$S:50}
A.bb.prototype={
F(a,b,c,d){B.a.C(this.a,A.c([a.a,a.b,a.c,b.a,b.b,b.c,c.a,c.b,c.c,1,1,1,1,0,1,d.a,d.b,0],t.n))},
a5(a){var s=new A.bk(B.bf,new Float32Array(A.p(this.a)),new Uint16Array(A.p(this.b)),a)
s.v()
return s}}
A.aL.prototype={
gaY(){var s,r,q,p=this.a,o=p.a,n=p.b
p=p.c
s=this.b
r=s.a
q=s.b
s=s.c
return A.c([new A.f(o,n,p),new A.f(r,n,p),new A.f(o,q,p),new A.f(r,q,p),new A.f(o,n,s),new A.f(r,n,s),new A.f(o,q,s),new A.f(r,q,s)],t.gi)},
i(a){return"Aabb("+this.a.i(0)+", "+this.b.i(0)+")"}}
A.by.prototype={}
A.cC.prototype={
u(){return"FrustumTest."+this.b}}
A.fS.prototype={
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
if(h*f+e*c+i*a+a0<0)return B.an
g=g?o:r
f=d?m:p
d=b?n:q
if(h*g+e*f+i*d+a0<0)l=!0}return l?B.bt:B.bu}}
A.fT.prototype={
$4(a,b,c,d){var s=new A.f(a,b,c),r=new A.by(s,d),q=Math.sqrt(s.ga0())
return q<1e-9?r:new A.by(s.B(0,1/q),d/q)},
$S:51}
A.b4.prototype={
B(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=new Float32Array(16)
for(s=this.a,r=s.length,q=b.a,p=q.length,o=0;o<4;++o)for(n=o*4,m=0;m<4;++m){for(l=0,k=0;k<4;++k){j=k*4+m
if(!(j<r))return A.i(s,j)
j=s[j]
i=n+k
if(!(i<p))return A.i(q,i)
l+=j*q[i]}j=n+m
if(!(j<16))return A.i(h,j)
h[j]=l}return new A.b4(h)},
c8(a){var s,r,q,p,o,n,m,l,k,j,i,h
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
bb(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this.a,d=e.length
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
if(!(s<16))return A.i(i,s)
s=i[s]
if(!(d<16))return A.i(h,d)
h[d]=s}if(15>=16)return A.i(h,15)
h[15]=1
return new A.b4(h)},
bX(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=J.jv(4,t.gN)
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
e=f}}if(!isFinite(g)||g<1e-12)throw A.b(A.l("Mat4.inverse: singular matrix"))
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
a0[s]=q}return new A.b4(a0)},
gI(a){return B.Z.aE(this.a,new A.ha())},
i(a){return"Mat4("+A.o(this.a)+")"}}
A.ha.prototype={
$1(a){return isFinite(A.iB(a))},
$S:12}
A.cZ.prototype={
i(a){var s=this
return"Quat("+A.o(s.a)+", "+A.o(s.b)+", "+A.o(s.c)+", "+A.o(s.d)+")"}}
A.aA.prototype={
v(){var s=this.a
if(!s.gI(0))throw A.b(A.j("Transform.translation must be finite: "+s.i(0),null))
s=this.b
if(!(isFinite(s.a)&&isFinite(s.b)&&isFinite(s.c)&&isFinite(s.d)))throw A.b(A.j("Transform.rotation must be finite: "+s.i(0),null))
s=this.c
if(!isFinite(s)||s<=0)throw A.b(A.j(u.f+s,null))},
a1(){var s,r,q,p,o,n,m,l,k,j,i,h=this.b,g=h.a,f=g*g,e=h.b,d=e*e,c=h.c,b=c*c,a=g*e,a0=g*c,a1=e*c
h=h.d
s=h*g
r=h*e
q=h*c
c=t.n
h=A.kq(A.c([1-2*(d+b),2*(a+q),2*(a0-r),0,2*(a-q),1-2*(f+b),2*(a1+s),0,2*(a0+r),2*(a1-s),1-2*(f+d),0,0,0,0,1],c)).a
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
return A.kq(A.c([g*p,o*p,n*p,0,m*p,l*p,k*p,0,j*p,i*p,h[10]*p,0,e.a,e.b,e.c,1],c))},
i(a){return"Transform("+this.a.i(0)+", "+this.b.i(0)+", scale="+this.c+")"}}
A.P.prototype={
B(a,b){return new A.P(this.a*b,this.b*b)},
gn(a){var s=this.a,r=this.b
return Math.sqrt(s*s+r*r)},
U(a,b){if(b==null)return!1
return b instanceof A.P&&this.a===b.a&&this.b===b.b},
gH(a){return A.c2(this.a,this.b,B.h,B.h,B.h,B.h)},
i(a){return"Vec2("+A.o(this.a)+", "+A.o(this.b)+")"}}
A.f.prototype={
V(a,b){return new A.f(this.a+b.a,this.b+b.b,this.c+b.c)},
aj(a,b){return new A.f(this.a-b.a,this.b-b.b,this.c-b.c)},
B(a,b){return new A.f(this.a*b,this.b*b,this.c*b)},
b1(a){return this.a*a.a+this.b*a.b+this.c*a.c},
a6(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.f(s*r-q*p,q*o-n*r,n*p-s*o)},
ga0(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gn(a){return Math.sqrt(this.ga0())},
gI(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gT(){var s=this,r=Math.sqrt(s.ga0())
return r<1e-9?B.x:new A.f(s.a/r,s.b/r,s.c/r)},
U(a,b){if(b==null)return!1
return b instanceof A.f&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gH(a){return A.c2(this.a,this.b,this.c,B.h,B.h,B.h)},
i(a){return"Vec3("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.eT.prototype={
u(){return"_BloomBlurAxis."+this.b}}
A.cp.prototype={
gA(){return this.f},
M(a,b){B.a.j(a.a,new A.E(this.f,B.r,A.c([new A.n(this.x,B.c),new A.n(this.y,B.e)],t.C),!1))},
L(a){var s=this,r=s.a.N(new A.a1(s.e,s.b,s.c,B.m,B.aG,B.aD)),q=A.aB(s.d),p=t.n,o=s.r===B.b2?new Float32Array(A.p(A.c([1/s.Q,0],p))):new Float32Array(A.p(A.c([0,1/s.as],p)))
p=s.y
return A.c([new A.eU(new A.Y(s.f,A.c([new A.n(s.x,B.c),new A.n(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iB:1}
A.eU.prototype={
K(a){return},
$ix:1,
gl(){return this.a}}
A.dM.prototype={
gA(){return"bloomComposite"},
M(a,b){B.a.j(a.a,new A.E("bloomComposite",B.r,A.c([new A.n(this.f,B.c),new A.n(this.r,B.c),new A.n(this.w,B.e)],t.C),!1))},
L(a){var s=this,r="bloomComposite",q=s.a.N(new A.a1(r,s.b,s.c,B.m,B.cf,B.c5)),p=A.aB(s.d),o=s.w,n=A.c([new A.n(s.f,B.c),new A.n(s.r,B.c),new A.n(o,B.e)],t.C)
return A.c([new A.eV(new A.Y(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iB:1}
A.eV.prototype={
K(a){return},
$ix:1,
gl(){return this.a}}
A.dT.prototype={
gA(){return"depthPrepass"},
M(a,b){B.a.j(a.a,new A.E("depthPrepass",B.bz,A.c([new A.n(this.w,B.e)],t.C),!1))},
L(a){var s=this,r="depthPrepass",q=s.a.N(new A.a1(r,s.b,s.c,B.aF,B.aE,B.c_))
return A.c([new A.eX(new A.Y(r,A.c([new A.n(s.w,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iB:1}
A.eX.prototype={
K(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=u.k,c=a0.b,b=a0.d,a=c.a
A.as(a,a0.S("sceneDepth").b)
A.a8(a,e.a.O())
A.bC(a,B.R,1,0,0,0)
A.aR(a,e.b.b)
A.d(a,"uVertexSnapGrid",new A.e(B.b,0))
A.d(a,"uAlbedo",B.q)
for(s=b.a,r=s.length,b=b.c.c.a,q=e.c,p=v.G,o=c.b,n=a.a,m=0;m<s.length;s.length===r||(0,A.A)(s),++m){l=s[m]
k=l.a
j=k.gl()
A.d(a,"uViewProjection",new A.e(B.k,new Float32Array(A.p(b))))
A.d(a,"uModel",new A.e(B.k,new Float32Array(A.p(j.c.a1().a))))
A.jk(c,l,!1)
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
o.ad(h,g)}else{if(a.b!==B.d)A.m(A.l(d))
n.drawArraysInstanced(A.a(p.WebGL2RenderingContext.TRIANGLES),0,h,g)
o.ad(h,g)}}},
cJ(a,b,c){var s,r
this.d.$1(b)
s=a.a
A.U(s,0,t.j.a(this.e.$1(null)))
A.d(s,"uAlphaCutoff",new A.e(B.b,0))
A.d(s,"uAffineWarpStrength",new A.e(B.b,0))
r=this.a.O()
A.a8(s,r)},
$ix:1,
gl(){return this.a}}
A.eY.prototype={
u(){return"_DofBlurAxis."+this.b}}
A.cy.prototype={
gA(){return this.f},
M(a,b){B.a.j(a.a,new A.E(this.f,B.r,A.c([new A.n(this.w,B.c),new A.n(this.x,B.e)],t.C),!1))},
L(a){var s=this,r=s.a.N(new A.a1(s.e,s.b,s.c,B.m,B.aG,B.aD)),q=A.aB(s.d),p=t.n,o=s.r===B.b3?new Float32Array(A.p(A.c([1/s.z,0],p))):new Float32Array(A.p(A.c([0,1/s.Q],p)))
p=s.x
return A.c([new A.eZ(new A.Y(s.f,A.c([new A.n(s.w,B.c),new A.n(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iB:1}
A.eZ.prototype={
K(a){return},
$ix:1,
gl(){return this.a}}
A.dW.prototype={
gA(){return"dofComposite"},
M(a,b){var s=this
B.a.j(a.a,new A.E("dofComposite",B.r,A.c([new A.n(s.z,B.c),new A.n(s.Q,B.c),new A.n(s.as,B.c),new A.n(s.at,B.e)],t.C),!1))},
L(a){var s=this,r="dofComposite",q=s.a.N(new A.a1(r,s.b,s.c,B.m,B.cd,B.bZ)),p=A.aB(s.d)
return A.c([new A.f_(new A.Y(r,A.c([new A.n(s.z,B.c),new A.n(s.Q,B.c),new A.n(s.as,B.c),new A.n(s.at,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iB:1}
A.f_.prototype={
K(a){var s,r=this,q=a.S("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.as(n,q.b)
A.a8(n,r.a.O())
A.aR(n,r.b.b)
s=t.j
A.U(n,0,s.a(r.d.$0()))
A.d(n,"uSharp",B.q)
A.U(n,1,s.a(r.e.$0()))
A.d(n,"uBlurred",B.D)
A.U(n,2,s.a(r.f.$0()))
A.d(n,"uSceneDepth",B.aZ)
A.d(n,"uNear",new A.e(B.b,o.f))
A.d(n,"uFar",new A.e(B.b,o.r))
A.d(n,"uFocusDistance",new A.e(B.b,r.w))
A.d(n,"uFocusRange",new A.e(B.b,r.x))
A.d(n,"uStrength",new A.e(B.b,0))
A.at(n,r.c)
p.Y(3,0)},
$ix:1,
gl(){return this.a}}
A.e2.prototype={
gA(){return"grade"},
M(a,b){B.a.j(a.a,new A.E("grade",B.r,A.c([new A.n(this.r,B.c),new A.n(this.w,B.e)],t.C),!1))},
L(a){var s=this,r=s.a.N(new A.a1("grade",s.b,s.c,B.m,B.cb,B.c6)),q=A.aB(s.d),p=s.r,o=s.w
return A.c([new A.f3(new A.Y("grade",A.c([new A.n(p,B.c),new A.n(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iB:1}
A.f3.prototype={
K(a){var s=this,r=a.S(s.f.a),q=a.b,p=q.a
A.as(p,a.S(s.r.a).b)
A.a8(p,s.a.O())
A.aR(p,s.b.b)
A.U(p,0,r.b)
A.d(p,"uScene",B.q)
A.U(p,1,t.j.a(s.d.$0()))
A.d(p,"uLut",B.D)
A.d(p,"uLutSize",new A.e(B.b,s.e))
A.d(p,"uStrength",new A.e(B.b,0))
A.at(p,s.c)
q.Y(3,0)},
$ix:1,
gl(){return this.a}}
A.cP.prototype={
gA(){return"msaaResolve"},
M(a,b){B.a.j(a.a,new A.E("msaaResolve",B.bA,A.c([new A.n(this.b,B.c),new A.n(this.c,B.e)],t.C),!0))},
L(a){var s=this.b,r=this.c
return A.c([new A.f6(new A.Y("msaaResolve",A.c([new A.n(s,B.c),new A.n(r,B.e)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iB:1}
A.f6.prototype={
K(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.ar(this.c),j=a.ar(this.d),i=this.b
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
i.drawBuffers(A.c([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.NONE)],t.n))}A.a9(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(o&&n){i.readBuffer(A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1))
i.drawBuffers(A.c([A.a(m.WebGL2RenderingContext.NONE),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
A.a9(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(r.d!=null||r.e!=null)A.a9(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.DEPTH_BUFFER_BIT),A.a(m.WebGL2RenderingContext.NEAREST)],t.H)
if(n)i.drawBuffers(A.c([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.READ_FRAMEBUFFER),null)
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),null)},
$ix:1,
gl(){return this.a}}
A.bU.prototype={}
A.dO.prototype={
S(a){var s=this.a.q(0,a)
if(s==null)throw A.b(A.l('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
ar(a){var s=a.a,r=this.a.q(0,s+"#"+a.f)
if(r!=null)return r
return this.S(s)},
$imp:1}
A.jB.prototype={}
A.cY.prototype={
gA(){return"present"},
M(a,b){B.a.j(a.a,new A.E("present",B.bB,A.c([new A.n(this.f,B.c)],t.C),!1))},
L(a){var s=this,r=s.a.N(new A.a1("present",s.b,s.c,B.m,B.ce,B.c2)),q=A.aB(s.d),p=s.f
return A.c([new A.f9(new A.Y("present",A.c([new A.n(p,B.c)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iB:1}
A.f9.prototype={
K(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=null,b=a1.ar(d.d),a=a1.b,a0=a.a
A.as(a0,c)
A.a8(a0,d.a.O())
A.aR(a0,d.b.b)
A.at(a0,d.c)
A.U(a0,0,b.b)
s=a1.c
if(s!=null)A.U(a0,1,s)
r=a1.d
q=r.f
p=r.d
o=r.c
A.d(a0,"uExposure",new A.e(B.b,q.a))
A.d(a0,"uVignette",new A.e(B.b,q.e))
A.d(a0,"uGrain",new A.e(B.b,q.f))
A.d(a0,"uOutputEncoding",new A.e(B.b,d.e===B.S?1:0))
A.d(a0,"uToneMap",new A.e(B.b,A.m6(q.fr)))
n=p.a
m=p.fx
r=n.a
l=m.a
k=n.b
j=m.b
i=n.c
h=m.c
g=t.n
A.d(a0,"uClearColor",new A.e(B.f,new Float32Array(A.p(A.c([r,k,i],g)))))
A.d(a0,"uSkyHorizon",new A.e(B.f,new Float32Array(A.p(A.c([l,j,h],g)))))
A.d(a0,"uSkyZenith",new A.e(B.f,new Float32Array(A.p(A.c([r*0.72+l*0.28,k*0.72+j*0.28,i*0.72+h*0.28],g)))))
A.d(a0,"uSkyGround",new A.e(B.f,new Float32Array(A.p(A.c([r*0.9,k*0.9,i*0.9],g)))))
A.d(a0,"uSkyEnabled",new A.e(B.b,0))
A.d(a0,"uSkyHorizonGlow",new A.e(B.b,0))
A.d(a0,"uSkyStarDensity",new A.e(B.b,0))
A.d(a0,"uSkyTexture",B.D)
A.d(a0,"uSkyTextureEnabled",new A.e(B.b,0))
A.d(a0,"uSkyRotation",new A.e(B.b,0))
A.d(a0,"uSkyExposure",new A.e(B.b,1))
A.d(a0,"uSkyTextureSrgb",new A.e(B.b,0))
A.d(a0,"uInverseProjection",new A.e(B.k,new Float32Array(A.p(o.gbY().a))))
f=o.y
if(f===$){e=o.a.bX()
o.y!==$&&A.ln()
o.y=e
f=e}A.d(a0,"uInverseView",new A.e(B.k,new Float32Array(A.p(f.a))))
r=o.d
A.d(a0,"uCameraPosition",new A.e(B.f,new Float32Array(A.p(A.c([r.a,r.b,r.c],g)))))
A.d(a0,"uCloudCoverage",new A.e(B.b,0))
A.d(a0,"uCloudDensity",new A.e(B.b,0))
A.d(a0,"uCloudBaseHeight",new A.e(B.b,650))
A.d(a0,"uCloudThickness",new A.e(B.b,350))
A.d(a0,"uCloudScale",new A.e(B.b,0))
A.d(a0,"uCloudWind",new A.e(B.ae,new Float32Array(A.p(A.c([0,0],g)))))
A.d(a0,"uCloudPhase",new A.e(B.b,0))
A.d(a0,"uCloudDetail",new A.e(B.b,0))
A.d(a0,"uCloudSilverLining",new A.e(B.b,0))
A.d(a0,"uCloudSampleCount",new A.e(B.b,4))
r=p.go
l=r==null
k=l?c:r.a.a
if(k==null)k=0
j=l?c:r.a.b
if(j==null)j=1
i=l?c:r.a.c
A.d(a0,"uCloudLightDirection",new A.e(B.f,new Float32Array(A.p(A.c([k,j,i==null?0:i],g)))))
k=l?c:r.b.a
if(k==null)k=1
j=l?c:r.b.b
if(j==null)j=1
i=l?c:r.b.c
A.d(a0,"uCloudLightColor",new A.e(B.f,new Float32Array(A.p(A.c([k,j,i==null?1:i],g)))))
r=l?c:r.c
A.d(a0,"uCloudLightIntensity",new A.e(B.b,r==null?0:r))
a.Y(3,0)},
$ix:1,
gl(){return this.a}}
A.eq.prototype={
gA(){return"ps1Quantize"},
M(a,b){B.a.j(a.a,new A.E("ps1Quantize",B.r,A.c([new A.n(this.e,B.c),new A.n(this.f,B.e)],t.C),!1))},
L(a){var s=this,r="ps1Quantize",q=s.a.N(new A.a1(r,s.b,s.c,B.m,B.cg,B.bW)),p=A.aB(s.d),o=s.e,n=s.f
return A.c([new A.fa(new A.Y(r,A.c([new A.n(o,B.c),new A.n(n,B.e)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iB:1}
A.fa.prototype={
K(a){var s=this,r=a.S(s.d.a),q=a.b,p=q.a
A.as(p,a.S(s.e.a).b)
A.a8(p,s.a.O())
A.aR(p,s.b.b)
A.U(p,0,r.b)
A.d(p,"uScene",B.q)
A.d(p,"uQuantizationBits",new A.e(B.b,8))
A.d(p,"uDitherStrength",new A.e(B.b,0))
A.at(p,s.c)
q.Y(3,0)},
$ix:1,
gl(){return this.a}}
A.bA.prototype={}
A.ez.prototype={
gA(){return"shadow"},
M(a,b){B.a.j(a.a,new A.E("shadowCaster",B.by,A.c([new A.n(this.z,B.e)],t.C),!1))},
L(a){var s=this,r="shadowCaster",q=s.a.N(new A.a1(r,s.b,s.c,B.aF,B.aE,B.c4))
return A.c([new A.fd(new A.Y(r,A.c([new A.n(s.z,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iB:1}
A.fd.prototype={
K(a){var s,r,q,p,o=this,n=a.S("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.as(s,n.b)
A.a8(s,o.a.O())
A.bC(s,B.R,1,0,0,0)
return}r=A.kz(l)
o.x.$1(r)
s=m.a
A.as(s,n.b)
A.a8(s,o.a.O())
A.bC(s,B.R,1,0,0,0)
A.aR(s,o.b.b)
A.d(s,"uAlbedo",B.q)
for(s=a.d.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.A)(s),++p)o.cL(m,s[p],l,r)},
bI(a,b){var s,r
this.d.$1(b)
s=a.a
A.U(s,0,t.j.a(this.e.$1(null)))
A.d(s,"uAlphaCutoff",new A.e(B.b,0))
r=this.a.O()
A.a8(s,r)},
cL(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){b.gl()
s=a.a
A.d(s,"uUseInstances",B.af)
n.bF(a,b.gl().c,d)
n.bI(a,b.gl().b)
r=b.gl()
q=n.c.$1(r.a)
A.at(s,q.a)
s=q.b
r=q.c
if(s)a.b3(r,q.d,0)
else a.Y(r,0)}else if(b instanceof A.bw){p=b.a
p.gl()
if(n.d2(b,c)===B.de)return
n.bF(a,p.gl().c,d)
A.jk(a,b,!1)
n.bI(a,p.gl().b)
s=p.gl()
q=n.c.$1(s.a)
A.at(a.a,q.a)
s=q.b
r=q.c
o=b.b.length
if(s)a.b4(r,q.d,o,0)
else a.b2(r,0,o)}else throw A.b(A.j("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dJ(b).i(0),null))},
d2(a,b){return B.dd},
bF(a,b,c){var s=a.a
A.d(s,"uModel",new A.e(B.k,new Float32Array(A.p(b.a1().a))))
A.d(s,"uLightViewProjection",new A.e(B.k,new Float32Array(A.p(c.a.a))))},
$ix:1,
gl(){return this.a}}
A.j_.prototype={
$1(a){return this.a.a=a},
$S:53}
A.j0.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:54}
A.eA.prototype={
gA(){return"shadowedWorld"},
M(a,b){var s=this,r=A.c([new A.n(s.db,B.c)],t.C)
if(s.ay)r.push(new A.n(s.dx,B.c))
r.push(new A.n(s.dy,B.e))
B.a.j(a.a,new A.E("shadowedWorld",B.at,r,!1))},
L(a){var s=this,r="shadowedWorld",q=s.a.N(new A.a1(r,s.b,s.c,B.ch,B.cc,B.bV)),p=A.c([new A.n(s.db,B.c)],t.C)
if(s.ay)p.push(new A.n(s.dx,B.c))
p.push(new A.n(s.dy,B.e))
return A.c([new A.fe(new A.Y(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iB:1}
A.fe.prototype={
K(b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=null,a5=b2.S("sceneColor"),a6=b2.b,a7=b2.d,a8=a7.c,a9=a7.d,b0=a3.z.$0(),b1=a6.a
A.as(b1,a5.b)
A.a8(b1,a3.a.O())
s=a9.a
A.bC(b1,B.am,1,s.c,s.b,s.a)
A.aR(b1,a3.b.b)
A.d(b1,"uAlbedo",B.q)
A.d(b1,"uNormalMap",B.dx)
A.d(b1,"uOrmMap",B.dy)
A.d(b1,"uEmissiveMap",B.dz)
A.d(b1,"uLightmap",B.dA)
s=t.j
A.U(b1,1,s.a(a3.y.$0()))
A.d(b1,"uShadowMap",B.D)
r=a8.d
q=t.n
A.d(b1,"uCameraPosition",new A.e(B.f,new Float32Array(A.p(A.c([r.a,r.b,r.c],q)))))
A.d(b1,"uShadowMapTexelSize",new A.e(B.ae,new Float32Array(A.p(A.c([1/a3.ch,1/a3.CW],q)))))
A.d(b1,"uShadowFilterRadius",new A.e(B.b,1))
A.d(b1,"uShadowBias",new A.e(B.b,0.003))
A.U(b1,2,s.a(a3.at.$0()))
A.d(b1,"uSsao",B.aZ)
A.d(b1,"uVertexSnapGrid",new A.e(B.b,0))
A.d(b1,"uSceneColorSize",new A.e(B.ae,new Float32Array(A.p(A.c([a3.ax,a3.ay],q)))))
A.d(b1,"uViewProjection",new A.e(B.k,new Float32Array(A.p(a8.c.a))))
A.d(b1,"uView",new A.e(B.k,new Float32Array(A.p(a8.a.a))))
A.d(b1,"uLightViewProjection",new A.e(B.k,new Float32Array(A.p(b0.a.a))))
A.d(b1,"uFogColor",new A.e(B.f,new Float32Array(A.p(A.c([0,0,0],q)))))
A.d(b1,"uFogStart",new A.e(B.b,0))
A.d(b1,"uFogEnd",new A.e(B.b,1))
A.d(b1,"uFogHeightFalloff",new A.e(B.b,0))
A.d(b1,"uFogDensity",new A.e(B.b,0))
p=a3.Q.$0()
s=A.c([],t.w)
r=a3.as.$0()
r=J.a0(r==null?B.X:r)
o=p==null
while(r.k()){n=r.gm()
if(-1!==(o?a4:-1))s.push(n)}m=o?a4:B.j
if(m==null)m=B.j
l=o?a4:B.o
if(l==null)l=B.o
A.d(b1,"uLightPosition",new A.e(B.f,new Float32Array(A.p(A.c([m.a,m.b,m.c],q)))))
A.d(b1,"uLightDirection",new A.e(B.f,new Float32Array(A.p(A.c([l.a,l.b,l.c],q)))))
k=o?a4:B.M
if(k==null)k=B.v
A.d(b1,"uLightColor",new A.e(B.f,new Float32Array(A.p(A.c([k.a,k.b,k.c],q)))))
r=o?a4:1
A.d(b1,"uLightIntensity",new A.e(B.b,r==null?0:r))
A.d(b1,"uSpotEnabled",new A.e(B.b,!o?1:0))
j=a9.go
r=j==null
i=r?a4:j.a
if(i==null)i=B.j
h=r?a4:j.b
if(h==null)h=B.v
A.d(b1,"uDirectionalDirection",new A.e(B.f,new Float32Array(A.p(A.c([i.a,i.b,i.c],q)))))
A.d(b1,"uDirectionalColor",new A.e(B.f,new Float32Array(A.p(A.c([h.a,h.b,h.c],q)))))
r=r?a4:j.c
A.d(b1,"uDirectionalIntensity",new A.e(B.b,r==null?0:r))
for(r=a9.id,g=0;g<4;++g){n=r.length
if(g<n){if(!(g<n))return A.i(r,g)
f=r[g]}else f=a4
n=f==null
e=n?a4:f.b
if(e==null)e=B.x
d=n?a4:f.c
if(d==null)d=B.v
c=""+g
A.d(b1,"uPointPosition"+c,new A.e(B.f,new Float32Array(A.p(A.c([e.a,e.b,e.c],q)))))
A.d(b1,"uPointColor"+c,new A.e(B.f,new Float32Array(A.p(A.c([d.a,d.b,d.c],q)))))
b=n?a4:f.d
if(b==null)b=0
A.d(b1,"uPointIntensity"+c,new A.e(B.b,b))
n=n?a4:f.e
if(n==null)n=1
A.d(b1,"uPointRadius"+c,new A.e(B.b,n))}for(g=0;g<3;++g){r=s.length
if(g<r){if(!(g<r))return A.i(s,g)
f=s[g]}else f=a4
r=f==null
e=r?a4:B.j
if(e==null)e=B.x
a=r?a4:B.o
if(a==null)a=B.o
d=r?a4:B.M
if(d==null)d=B.v
n=""+g
A.d(b1,"uDirectSpotPosition"+n,new A.e(B.f,new Float32Array(A.p(A.c([e.a,e.b,e.c],q)))))
A.d(b1,"uDirectSpotDirection"+n,new A.e(B.f,new Float32Array(A.p(A.c([a.a,a.b,a.c],q)))))
A.d(b1,"uDirectSpotColor"+n,new A.e(B.f,new Float32Array(A.p(A.c([d.a,d.b,d.c],q)))))
c=r?a4:1
if(c==null)c=0
A.d(b1,"uDirectSpotIntensity"+n,new A.e(B.b,c))
c=r?a4:1
if(c==null)c=1
A.d(b1,"uDirectSpotRange"+n,new A.e(B.b,c))
c=r?a4:0.3
if(c==null)c=0.3
A.d(b1,"uDirectSpotInnerCos"+n,new A.e(B.b,Math.cos(c)))
c=r?a4:0.5
if(c==null)c=0.5
A.d(b1,"uDirectSpotOuterCos"+n,new A.e(B.b,Math.cos(c)))
r=r?0:1
A.d(b1,"uDirectSpotEnabled"+n,new A.e(B.b,r))}s=o?a4:1
A.d(b1,"uLightRange",new A.e(B.b,s==null?1:s))
s=o?a4:0.3
if(s==null)s=0.3
A.d(b1,"uLightInnerCos",new A.e(B.b,Math.cos(s)))
s=o?a4:0.5
if(s==null)s=0.5
A.d(b1,"uLightOuterCos",new A.e(B.b,Math.cos(s)))
a0=a9.fx
A.d(b1,"uAmbientColor",new A.e(B.f,new Float32Array(A.p(A.c([a0.a,a0.b,a0.c],q)))))
A.d(b1,"uAmbientIntensity",new A.e(B.b,a9.fy))
A.d(b1,"uAmbientLightScale",new A.e(B.b,1))
A.d(b1,"uDirectLightScale",new A.e(B.b,1))
s=a9.dx
A.d(b1,"uReflectionColor",new A.e(B.f,new Float32Array(A.p(A.c([s.a,s.b,s.c],q)))))
A.d(b1,"uReflectionIntensity",new A.e(B.b,a9.dy))
A.d(b1,"uReflectionConfidence",new A.e(B.b,a9.fr))
A.d(b1,"uRainWetness",new A.e(B.b,0))
A.d(b1,"uSurfaceSnowCoverage",new A.e(B.b,0))
A.d(b1,"uSurfaceDissolution",new A.e(B.b,0))
a1=A.hT(B.aB,0,A.bL(4,"count",t.S),t.aX).dS(0)
A.d(b1,"uThermalSourceCount",new A.e(B.b,a1.length))
for(g=0;g<4;++g){s=a1.length
if(g<s)if(!(g<s))return A.i(a1,g)
s=""+g
A.d(b1,"uThermalSourcePosition"+s,new A.e(B.f,new Float32Array(A.p(A.c([0,0,0],q)))))
A.d(b1,"uThermalSourceRadius"+s,new A.e(B.b,1))
A.d(b1,"uThermalSourceDissolution"+s,new A.e(B.b,0))}for(b1=a7.a,s=b1.length,a2=0;a2<b1.length;b1.length===s||(0,A.A)(b1),++a2)a3.bJ(a6,b1[a2],0,a9)
for(a7=a7.b,b1=a7.length,a2=0;a2<a7.length;a7.length===b1||(0,A.A)(a7),++a2)a3.bJ(a6,a7[a2],0,a9)},
bJ(a,b,c,d){var s,r,q,p,o,n,m=this
if(t.Y.b(b)){s=a.a
A.d(s,"uUseInstances",B.af)
m.bK(a,b.gl().c)
r=b.gl()
q=b.gl()
p=b.gl()
b.gl()
m.bG(a,r.b,q.e,p.f,c,!0,d)
o=m.c.$1(b.gl().a)
A.at(s,o.a)
s=o.b
r=o.c
if(s)a.b3(r,o.d,0)
else a.Y(r,0)}else if(b instanceof A.bw){n=b.a
m.bK(a,n.gl().c)
A.jk(a,b,!0)
s=n.gl()
r=n.gl()
q=n.gl()
n.gl()
m.bG(a,s.b,r.e,q.f,c,!0,d)
o=m.c.$1(n.gl().a)
A.at(a.a,o.a)
s=o.b
r=o.c
q=b.b.length
if(s)a.b4(r,o.d,q,0)
else a.b2(r,0,q)}else throw A.b(A.j("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dJ(b).i(0),null))},
bG(a,b,c,d,e,f,g){var s=this,r=null,q=s.d.$1(b),p=t.j,o=a.a
A.U(o,0,p.a(s.e.$1(r)))
A.U(o,3,p.a(s.f.$1(r)))
A.U(o,4,p.a(s.r.$1(r)))
A.U(o,5,p.a(s.w.$1(r)))
A.U(o,6,p.a(s.x.$1(r)))
A.d(o,"uAlphaCutoff",new A.e(B.b,0))
A.d(o,"uOpaqueCoverage",new A.e(B.b,c===B.T?0:1))
A.d(o,"uAffineWarpStrength",new A.e(B.b,0))
p=t.n
A.d(o,"uMaterialTint",new A.e(B.f,new Float32Array(A.p(A.c([q.d,q.e,q.f],p)))))
A.d(o,"uEmissiveStrength",new A.e(B.b,0))
A.d(o,"uUvScaleOffset",new A.e(B.dw,new Float32Array(A.p(A.c([1,1,0,0],p)))))
A.d(o,"uNormalStrength",new A.e(B.b,1))
A.d(o,"uRoughness",new A.e(B.b,q.at))
A.d(o,"uMetallic",new A.e(B.b,q.ax))
A.d(o,"uSpecularScale",new A.e(B.b,1))
A.d(o,"uClearcoatStrength",new A.e(B.b,q.ch))
A.d(o,"uClearcoatRoughness",new A.e(B.b,q.CW))
A.d(o,"uOcclusionStrength",new A.e(B.b,1))
A.d(o,"uLightmapIntensity",new A.e(B.b,0))
A.d(o,"uReceivesShadow",new A.e(B.b,1))
A:{p=r
if(B.T===c){switch(d.a){case 0:p=B.bm
break
case 1:p=B.bl
break}break A}if(B.I===c||B.bj===c){p=s.a.O()
break A}}A.a8(o,p)},
bK(a,b){var s=b.a1(),r=a.a
A.d(r,"uModel",new A.e(B.k,new Float32Array(A.p(s.a))))
A.d(r,"uNormalMatrix",new A.e(B.k,new Float32Array(A.p(s.bb().a))))},
$ix:1,
gl(){return this.a}}
A.eC.prototype={
gA(){return"ssaoOcclusion"},
M(a,b){B.a.j(a.a,new A.E("ssaoOcclusion",B.V,A.c([new A.n(this.w,B.e)],t.C),!1))},
L(a){var s=this,r="ssaoOcclusion",q=s.a.N(new A.a1(r,s.b,s.c,B.m,B.aH,B.bU)),p=A.aB(s.d)
return A.c([new A.fg(new A.Y(r,A.c([new A.n(s.w,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iB:1}
A.fg.prototype={
K(a){var s=a.b.a
A.as(s,a.S("ssaoRaw").b)
A.a8(s,this.a.O())
A.bC(s,B.Q,1,1,1,1)
return},
$ix:1,
gl(){return this.a}}
A.eB.prototype={
gA(){return"ssaoBlur"},
M(a,b){B.a.j(a.a,new A.E("ssaoBlur",B.V,A.c([new A.n(this.y,B.c),new A.n(this.z,B.e)],t.C),!1))},
L(a){var s=this,r="ssaoBlur",q=s.a.N(new A.a1(r,s.b,s.c,B.m,B.c9,B.c7)),p=A.aB(s.d)
return A.c([new A.ff(new A.Y(r,A.c([new A.n(s.y,B.c),new A.n(s.z,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iB:1}
A.ff.prototype={
K(a){var s=a.b.a
A.as(s,a.S("ssaoBlurred").b)
A.a8(s,this.a.O())
A.bC(s,B.Q,1,1,1,1)
return},
$ix:1,
gl(){return this.a}}
A.eM.prototype={
gA(){return"vhs"},
M(a,b){var s=this.w
a.b.j(0,s.a)
B.a.j(a.a,new A.E("vhs",B.r,A.c([new A.n(this.r,B.c),new A.n(s,B.t),new A.n(s,B.e)],t.C),!1))},
L(a){var s=this,r=s.a.N(new A.a1("vhs",s.b,s.c,B.m,B.ca,B.bX)),q=A.aB(s.d),p=s.r,o=s.w
return A.c([new A.fl(new A.Y("vhs",A.c([new A.n(p,B.c),new A.n(o,B.t),new A.n(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iB:1}
A.fl.prototype={
K(a){var s=this,r=a.S(s.f.a),q=a.S(s.r.a),p=a.b,o=p.a
A.as(o,q.b)
A.a8(o,s.a.O())
A.aR(o,s.b.b)
A.U(o,0,r.b)
A.d(o,"uScene",B.q)
A.U(o,1,t.j.a(s.d.$0()))
A.d(o,"uHistory",B.D)
A.d(o,"uTime",new A.e(B.b,s.e.$0()))
A.d(o,"uChromaWeight",new A.e(B.b,0))
A.d(o,"uTrackingWeight",new A.e(B.b,0))
A.d(o,"uNoiseWeight",new A.e(B.b,0))
A.d(o,"uHeadSwitchWeight",new A.e(B.b,0))
A.d(o,"uDropoutWeight",new A.e(B.b,0))
A.d(o,"uGhostWeight",new A.e(B.b,0))
A.at(o,s.c)
p.Y(3,0)},
$ix:1,
gl(){return this.a}}
A.eN.prototype={
gA(){return"volumetricLight"},
M(a,b){var s=this,r=s.w,q=t.C,p=a.a
B.a.j(p,new A.E("volumetricLight",B.V,A.c([new A.n(s.x,B.c),new A.n(r,B.e)],q),!1))
B.a.j(p,new A.E("volumetricComposite",B.r,A.c([new A.n(r,B.c),new A.n(s.y,B.c),new A.n(s.z,B.e)],q),!1))},
L(a){var s,r,q,p,o,n,m=this,l="volumetricLight",k="volumetricComposite",j=m.a,i=m.b,h=j.N(new A.a1(l,i,m.c,B.m,B.aH,B.bY)),g=m.e,f=A.aB(g),e=m.Q
B.a.j(e,f)
s=m.w
r=t.C
q=A.c([new A.fn(new A.Y(l,A.c([new A.n(m.x,B.c),new A.n(s,B.e)],r),!1,!1,!1,!1),h,f,s.a,m.f,m.r)],t.u)
p=m.z
o=j.N(new A.a1(k,i,m.d,B.m,B.ci,B.c8))
n=A.aB(g)
B.a.j(e,n)
B.a.j(q,new A.fm(new A.Y(k,A.c([new A.n(s,B.c),new A.n(m.y,B.c),new A.n(p,B.e)],r),!1,!1,!0,!1),o,n,s,p))
return q},
$iB:1}
A.fn.prototype={
K(a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this,a1=a6.S(a0.d),a2=a6.b,a3=a0.f.$0(),a4=a6.d.d.go,a5=a2.a
A.as(a5,a1.b)
A.a8(a5,a0.a.O())
A.bC(a5,B.Q,1,0,0,0)
A.aR(a5,a0.b.b)
A.U(a5,0,t.j.a(a0.e.$0()))
A.d(a5,"uSceneDepth",B.q)
A.d(a5,"uNear",new A.e(B.b,a3.f))
A.d(a5,"uFar",new A.e(B.b,a3.r))
A.d(a5,"uViewProjection",new A.e(B.k,new Float32Array(A.p(a3.c.a))))
s=a3.a.a
A.d(a5,"uView",new A.e(B.k,new Float32Array(A.p(s))))
A.d(a5,"uInverseProjection",new A.e(B.k,new Float32Array(A.p(a3.gbY().a))))
r=a4==null
A.d(a5,"uShaftIntensity",new A.e(B.b,r?0:a4.c*0.15))
A.d(a5,"uFogDensity",new A.e(B.b,0))
A.d(a5,"uAnisotropy",new A.e(B.b,0.7))
q=t.n
A.d(a5,"uVolumetricAlbedo",new A.e(B.f,new Float32Array(A.p(A.c([1,1,1],q)))))
A.d(a5,"uVolumetricHeightFalloff",new A.e(B.b,0.02))
A.d(a5,"uVolumetricDustDensity",new A.e(B.b,0))
A.d(a5,"uVolumetricJitter",new A.e(B.b,0.35))
A.d(a5,"uVolumetricIntensity",new A.e(B.b,1))
A.d(a5,"uVolumetricSampleCount",new A.e(B.b,12))
if(r)p=B.j
else{o=a4.a.gT()
n=o.a
m=s.length
if(0>=m)return A.i(s,0)
l=s[0]
k=o.b
if(4>=m)return A.i(s,4)
j=s[4]
o=o.c
if(8>=m)return A.i(s,8)
i=s[8]
h=s[1]
g=s[5]
if(9>=m)return A.i(s,9)
f=s[9]
e=s[2]
d=s[6]
if(10>=m)return A.i(s,10)
p=new A.f(n*l+k*j+o*i,n*h+k*g+o*f,n*e+k*d+o*s[10]).gT()}c=r?null:a4.b
if(c==null)c=B.v
A.d(a5,"uLightDir",new A.e(B.f,new Float32Array(A.p(A.c([p.a,p.b,p.c],q)))))
A.d(a5,"uLightColor",new A.e(B.f,new Float32Array(A.p(A.c([c.a,c.b,c.c],q)))))
b=A.om(4,a3.d,B.aA)
A.d(a5,"uVolumetricSourceCount",new A.e(B.b,b.length))
for(a=0;a<4;++a){s=b.length
if(a<s)if(!(a<s))return A.i(b,a)
s=""+a
A.d(a5,"uSourcePosition"+s,new A.e(B.f,new Float32Array(A.p(A.c([0,0,0],q)))))
A.d(a5,"uSourceColor"+s,new A.e(B.f,new Float32Array(A.p(A.c([0,0,0],q)))))
A.d(a5,"uSourceIntensity"+s,new A.e(B.b,0))
A.d(a5,"uSourceReferenceDistance"+s,new A.e(B.b,1))
A.d(a5,"uSourceCutoffDistance"+s,new A.e(B.b,1))}A.at(a5,a0.c)
a2.Y(3,0)},
$ix:1,
gl(){return this.a}}
A.fm.prototype={
K(a){var s=this,r=a.ar(s.e),q=a.ar(s.d),p=a.b,o=p.a
A.as(o,r.b)
A.mI(o,1)
A.a8(o,B.bk)
A.aR(o,s.b.b)
A.U(o,0,q.b)
A.d(o,"uVolumetric",B.q)
A.d(o,"uVolumetricStrength",B.aY)
A.at(o,s.c)
p.Y(3,0)},
$ix:1,
gl(){return this.a}}
A.d2.prototype={}
A.eQ.prototype={
gA(){return"world"},
M(a,b){B.a.j(a.a,new A.E("worldOpaqueTransparent",B.at,A.c([new A.n(this.e,B.e)],t.C),!1))},
L(a){var s=this,r=s.a.N(new A.a1("safeWorld",s.b,s.c,B.cj,B.m,B.c0)),q=s.e
return A.c([new A.fq(new A.Y("worldOpaqueTransparent",A.c([new A.n(q,B.e)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iB:1}
A.fq.prototype={
K(a){var s,r,q,p,o,n=this,m=a.b,l=a.d,k=l.d,j=m.a
A.as(j,a.S(n.d).b)
A.a8(j,n.a.O())
s=k.a
A.bC(j,B.am,1,s.c,s.b,s.a)
A.aR(j,n.b.b)
A.d(j,"uViewProjection",new A.e(B.k,new Float32Array(A.p(l.c.c.a))))
r=k.go
q=r==null?null:r.a
if(q==null)q=B.j
s=t.n
A.d(j,"uLightDir",new A.e(B.f,new Float32Array(A.p(A.c([q.a,q.b,q.c],s)))))
p=k.fx
A.d(j,"uAmbientColor",new A.e(B.f,new Float32Array(A.p(A.c([p.a,p.b,p.c],s)))))
A.d(j,"uAmbientIntensity",new A.e(B.b,k.fy))
A.d(j,"uAmbientLightScale",new A.e(B.b,1))
A.d(j,"uDirectLightScale",new A.e(B.b,1))
for(j=l.a,s=j.length,o=0;o<j.length;j.length===s||(0,A.A)(j),++o)n.bw(m,j[o])
for(l=l.b,j=l.length,o=0;o<l.length;l.length===j||(0,A.A)(l),++o)n.bw(m,l[o])},
bw(a,b){var s,r,q,p,o,n=this
if(b instanceof A.bw){s=b.a
n.bH(a,s.gl().c)
A.jk(a,b,!0)
r=n.c.$1(s.gl().a)
A.at(a.a,r.a)
q=r.b
p=r.c
o=b.b.length
if(q)a.b4(p,r.d,o,0)
else a.b2(p,0,o)}else if(t.Y.b(b)){q=a.a
A.d(q,"uUseInstances",B.af)
n.bH(a,b.gl().c)
r=n.c.$1(b.gl().a)
A.at(q,r.a)
q=r.b
p=r.c
if(q)a.b3(p,r.d,0)
else a.Y(p,0)}else throw A.b(A.j("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dJ(b).i(0),null))},
bH(a,b){var s=b.a1(),r=a.a
A.d(r,"uModel",new A.e(B.k,new Float32Array(A.p(s.a))))
A.d(r,"uNormalMatrix",new A.e(B.k,new Float32Array(A.p(s.bb().a))))},
$ix:1,
gl(){return this.a}}
A.ev.prototype={
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
j=new A.f(m,l,k)
i=j.a6(n)
h=j.a6(i)
p=p.d
n=r.a.V(0,n.V(0,i.B(0,2*p)).V(0,h.B(0,2)))
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
r=a<1e-9?B.B:new A.cZ(d/a,c/a,b/a,e/a)
q=new A.aA(n,r,o*q.c)
r=q}else r=a0.b
a0.c=r
a0.d=!1}return a0.c},
a4(){var s,r,q
if(this.d)return
this.d=!0
for(s=this.f,r=s.length,q=0;q<s.length;s.length===r||(0,A.A)(s),++q)s[q].a4()},
bS(a){var s=a.e
if(s===this)return
if(s!=null)if(B.a.ag(s.f,a)){a.e=null
a.a4()}a.e=this
a.a4()
B.a.j(this.f,a)},
aD(a,b,c,d,e){var s=A.jD(B.P,!0,B.I,null,b,c,d,!0,0,e,-1)
this.bS(s)
return s},
bj(a){var s,r,q,p,o,n=this,m=n.r,l=n.w
if(m!=null&&l!=null){s=new A.c7(m,l,n.gca(),n.x,n.y,n.z,!0,!0,n.ax)
r=n.ay
q=a.b
if(r==null){a.bR(s)
n.ay=q.de(s)}else{a.bR(s)
p=q.$ti
p.c.a(r)
p.y[1].a(s)
q.ac(r)
q=q.b
p=r.a
if(!(p>=0&&p<q.length))return A.i(q,p)
q[p].saZ(s)}}else{q=n.ay
if(q!=null){a.b.aG(q)
n.ay=null}}for(q=n.f,p=q.length,o=0;o<q.length;q.length===p||(0,A.A)(q),++o)q[o].bj(a)}}
A.fU.prototype={
u(){return"GpuBufferUsage."+this.b}}
A.e0.prototype={
u(){return"GpuBufferKind."+this.b}}
A.fZ.prototype={
u(){return"GpuTextureFilter."+this.b}}
A.h_.prototype={
u(){return"GpuTextureWrap."+this.b}}
A.e_.prototype={}
A.fY.prototype={}
A.bY.prototype={
u(){return"GpuTargetAttachment."+this.b}}
A.cD.prototype={}
A.e1.prototype={
u(){return"GpuDeviceStatus."+this.b}}
A.c8.prototype={
u(){return"ShaderCompileStage."+this.b}}
A.d6.prototype={
i(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.b9.prototype={
u(){return"UniformType."+this.b}}
A.e.prototype={}
A.ct.prototype={
u(){return"ClearMask."+this.b}}
A.dU.prototype={
Y(a,b){var s=this.a
if(s.b!==B.d)A.m(A.l(u.k))
s.a.drawArrays(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.ad(a,1)},
b2(a,b,c){var s=this.a
if(s.b!==B.d)A.m(A.l(u.k))
s.a.drawArraysInstanced(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.ad(a,c)},
b3(a,b,c){var s,r,q=this.a
if(q.b!==B.d)A.m(A.l(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.ad(a,1)},
b4(a,b,c,d){var s,r,q=this.a
if(q.b!==B.d)A.m(A.l(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.a9(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.ad(a,c)},
$ilN:1}
A.bW.prototype={}
A.cW.prototype={
cQ(){var s,r=this,q=v.G
A.t(q.window).addEventListener("resize",A.aD(new A.hq(r)))
s=r.a
s.addEventListener("webglcontextlost",A.aD(new A.hr(r)))
s.addEventListener("webglcontextrestored",A.aD(new A.hs(r)))
s.addEventListener("contextmenu",A.aD(new A.ht()))
s.addEventListener("mousedown",A.aD(new A.hu(r)))
A.t(q.window).addEventListener("mousemove",A.aD(new A.hv(r)))
A.t(q.window).addEventListener("mouseup",A.aD(new A.hw(r)))
s.addEventListener("wheel",A.aD(new A.hx(r)))},
bE(){var s,r=this,q=r.a,p=A.a(q.clientWidth)>0?A.a(q.clientWidth):A.a(q.width),o=A.a(q.clientHeight)>0?A.a(q.clientHeight):A.a(q.height),n=r.x
if(p===n.a&&o===n.b)return
n=n.e
n=A.kB(o,p,n,n,!0)
r.x=n
q.width=n.c
q.height=r.x.d
try{q=r.x
r.b.az()
q.v()
r.d.ba("surface resized")}catch(s){}},
cg(){var s=this
if(s.Q)return
s.Q=!0
s.as=0
A.a(A.t(v.G.window).requestAnimationFrame(A.aD(s.gbM())))},
d1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
A.fr(a)
if(!d.Q)return
s=a/1000
r=d.as
q=r>0?s-r:0.016666666666666666
d.as=s
d.bE()
if(!d.at&&d.b.e!==B.a2){r=d.c
d.e.bj(r)
p=d.y
o=p!=null
if(o)p.dV(q)
n=d.x
m=n.c/n.d
if(o){o=p.gb5()
n=p.a
l=n.aj(0,o)
if(l.ga0()<1e-12)A.m(A.j("CameraView.lookAt requires target ("+n.i(0)+") distinct from eye ("+o.i(0)+")",null))
k=A.kf(m,o,200,l,1,0.1,B.j)}else k=A.kf(m,B.dC,200,B.dI,1,0.1,B.j)
o=d.d
n=d.f
j=d.r
i=o.a
o.a=i+1
o=d.b
o.d6(r,new A.fP(k,n,j,-1,i,s))
o.gR()
i=d.z
if(i!=null)i.$1(new A.bW(s))
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
f=A.V(d.a.parentElement)
if(f==null)f=A.V(A.t(r.document).body)
if(f!=null)A.t(f.appendChild(g))
d.cy=g}e=B.n.bf(q*1000,1)
g.innerText="FPS: "+B.n.bf(d.dy,0)+" ("+e+" ms)\nDraws: "+h.b+" | Tris: "+h.c+"\nInstances: "+h.e+" | VRAM: "+B.n.bf(h.r/1024,0)+" KB"}}}A.a(A.t(v.G.window).requestAnimationFrame(A.aD(d.gbM())))},
sdz(a){this.z=t.a4.a(a)}}
A.hz.prototype={
$1(a){var s=this.a,r=a.a===B.a_?2:1,q=a===B.aL?0:1
return new A.d1(a,s.c,s.d,r,q)},
$S:56}
A.hq.prototype={
$1(a){A.t(a)
return this.a.bE()},
$S:57}
A.hr.prototype={
$1(a){var s
A.t(a)
s=this.a
s.at=!0
s.d.ba("gl context lost")},
$S:2}
A.hs.prototype={
$1(a){var s
A.t(a)
s=this.a
s.at=!1
s.d.ba("gl context restored")},
$S:2}
A.ht.prototype={
$1(a){A.t(a).preventDefault()},
$S:2}
A.hu.prototype={
$1(a){var s
A.t(a)
s=this.a
s.ay=!0
s.ch=A.a(a.button)
s.CW=A.a(a.clientX)
s.cx=A.a(a.clientY)},
$S:2}
A.hv.prototype={
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
r=s.ch===0&&!A.l0(a.shiftKey)
s=s.y
if(r){s.as+=o*0.006
s.at=B.n.al(s.at+n*0.006,-1.5079644737231006,1.5079644737231006)}else{r=s.b
m=s.gc4()
l=s.gc4().a6(s.a.aj(0,s.gb5()).gT()).gT()
k=m.B(0,-o*0.003*r).V(0,l.B(0,n*0.003*r))
s.ay=s.ay.V(0,k)}}},
$S:2}
A.hw.prototype={
$1(a){A.t(a)
this.a.ay=!1},
$S:2}
A.hx.prototype={
$1(a){var s,r
A.t(a)
s=this.a
r=s.y
if(r!=null){a.preventDefault()
s=s.y
s.toString
r=A.fr(a.deltaY)
s.ax=B.n.al(s.ax+r*0.003,0.5,100)}},
$S:2}
A.en.prototype={
c2(a){var s=this.b.q(0,a)
if(s==null)throw A.b(A.l("resource is not in candidate: "+a))
return s}}
A.fV.prototype={
gm(){var s=this.c
if(s==null)throw A.b(A.l("GPU resource adapter is not initialized"))
return s},
a7(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.cH(s.b)
r.b.a7()
r.c=null
r.e=!0},
bu(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.b3(a0,a1),a3=A.c([],t.J)
try{k=a4.a
j=k.$ti
i=j.h("z(1)")
j=j.h("a_<1>")
s=new A.a_(k,i.a(new A.fW()),j)
for(h=s,g=J.a0(h.a),h=new A.F(g,h.b,h.$ti.h("F<1>")),f=a.a;h.k();){r=g.gm()
q=A.kL(f,a.bv(r,a5))
J.fu(a3,q)
J.ft(a2,r,q)}e=A.az(new A.a_(k,i.a(new A.fX()),j),j.h("k.E"))
B.a.cf(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.A)(k),++d){o=k[d]
n=A.oe(J.lD(o,11))
if(i){h=J.jp(a2,"sceneColor")
h.toString
J.ft(a2,o,h)}else{h=n
if(typeof h!=="number")return h.cc()
if(h>=2){h=J.jp(a2,"sceneColor#1")
h.toString
J.ft(a2,o,h)}else{m=A.kL(f,a.bv(o,a5))
J.fu(a3,m)
J.ft(a2,o,m)}}}a0=A.kh(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.H(a0).h("d4<1>"),a0=new A.d4(a0,k),a0=new A.ae(a0,a0.gn(0),k.h("ae<O.E>")),j=a.a,i=t.V,k=k.h("O.E");a0.k();){h=a0.d
l=h==null?k.a(h):h
b=i.a(a1.a(l).a)
A.jE(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}throw c}},
bv(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.cD(512,512,1,B.U,!0)
if(a==="sceneDepth")return new A.cD(n,m,1,B.U,!0)
s=B.u.a2(a,"ssao")||B.u.a2(a,"bloomBlur")||B.u.a2(a,"dofBlur")||B.u.a2(a,"volumetricLight")
r=s?B.i.a_(n+1,2):n
q=s?B.i.a_(m+1,2):m
p=a==="sceneColor"
o=p||B.u.a2(a,"sceneColor#")
p=p?b.d:1
return new A.cD(r,q,p,o?B.aq:B.bw,o)},
cH(a){var s,r,q,p,o,n=A.jz(t.bS.a(a).gc9(),t.j)
for(n=A.jI(n,n.r,A.u(n).c),s=this.a,r=t.V,q=n.$ti.c;n.k();){p=n.d
o=r.a((p==null?q.a(p):p).a)
A.jE(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}
A.fW.prototype={
$1(a){return!B.u.a2(A.aU(a),"sceneColor#")},
$S:8}
A.fX.prototype={
$1(a){return B.u.a2(A.aU(a),"sceneColor#")},
$S:8}
A.dr.prototype={
u(){return"_SlotState."+this.b}}
A.bo.prototype={
saZ(a){this.c=this.$ti.h("1?").a(a)}}
A.aQ.prototype={
b_(a,b){var s,r,q,p,o=this,n=o.$ti
n.y[1].a(a)
s=o.c
r=s.length
if(r!==0){if(0>=r)return A.i(s,-1)
q=s.pop()}else{s=o.b
B.a.j(s,new A.bo(B.N,n.h("bo<2>")))
q=s.length-1}n=o.b
if(!(q>=0&&q<n.length))return A.i(n,q)
p=n[q];++p.a
p.b=B.dZ
p.saZ(a)
p.f=b;++o.d
return o.a.$3(q,p.a,b)},
de(a){return this.b_(a,null)},
ac(a){var s,r,q
this.$ti.c.a(a)
s=a.a
if(s<0||s>=this.b.length)throw A.b(A.bf(B.av,a))
r=this.b
if(!(s>=0&&s<r.length))return A.i(r,s)
q=r[s]
if(q.a!==a.b)throw A.b(A.bf(B.aw,a))
s=q.b
if(s===B.O||s===B.N)throw A.b(A.bf(B.L,a))},
b0(a){var s,r,q=this.$ti
q.c.a(a)
this.ac(a)
s=this.b
r=a.a
if(!(r>=0&&r<s.length))return A.i(s,r)
r=s[r].c
return r==null?q.y[1].a(r):r},
aG(a){var s,r,q,p=this
p.$ti.c.a(a)
s=a.a
if(s<0||s>=p.b.length)throw A.b(A.bf(B.av,a))
r=p.b
if(!(s>=0&&s<r.length))return A.i(r,s)
q=r[s]
if(q.a!==a.b)throw A.b(A.bf(B.aw,a))
r=q.b
if(r===B.O||r===B.N)throw A.b(A.bf(B.bJ,a))
q.b=B.O
q.saZ(null)
B.a.j(p.c,s);++p.e},
ae(){return new A.aT(this.dv(),this.$ti.h("aT<+(1,2)>"))},
dv(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k,j,i
return function $async$ae(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b,n=s.a,m=s.$ti.y[1],l=0
case 2:if(!(l<o.length)){r=4
break}k=o[l]
j=k.b
if(j===B.O||j===B.N){r=3
break}j=n.$3(l,k.a,k.f)
i=k.c
r=5
return a.b=new A.ag(j,i==null?m.a(i):i),1
case 5:case 3:++l
r=2
break
case 4:return 0
case 1:return a.c=p.at(-1),3}}}}}
A.fw.prototype={
u(){return"BlendEquation."+this.b}}
A.bS.prototype={
u(){return"BlendFactor."+this.b}}
A.fB.prototype={
u(){return"CullFace."+this.b}}
A.fF.prototype={
u(){return"DepthFunc."+this.b}}
A.bV.prototype={}
A.a6.prototype={
u(){return"StateField."+this.b}}
A.i5.prototype={
df(a){var s,r=this.a
if(r==null)return A.m2(B.c3,t.d5)
s=A.al(t.d5)
if(r.a!==a.a)s.j(0,B.a5)
if(r.b!==a.b)s.j(0,B.a6)
if(r.c!==a.c)s.j(0,B.a7)
if(r.d!==a.d)s.j(0,B.a8)
if(r.e!==a.e||r.f!==a.f)s.j(0,B.a9)
if(r.r!==a.r)s.j(0,B.aa)
if(r.w!==a.w)s.j(0,B.ab)
if(r.x!==a.x)s.j(0,B.ac)
return s}}
A.bd.prototype={$iaG:1}
A.dB.prototype={}
A.dA.prototype={}
A.fp.prototype={}
A.eO.prototype={
cm(a){var s=this,r=A.t(s.a.canvas)
s.c=A.aD(new A.i2(s))
s.d=A.aD(new A.i3(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
ak(a){var s=A.ck(this.a.getParameter(a))
return typeof s=="number"?B.n.dR(s):0},
bB(a){var s=A.ck(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
$ilT:1}
A.i2.prototype={
$1(a){A.t(a).preventDefault()
this.a.b=B.K},
$S:13}
A.i3.prototype={
$1(a){this.a.b=B.d},
$S:13}
A.iA.prototype={
d7(){var s,r=this
if(r.b!==B.d)A.m(A.l(u.k))
s=r.w?A.V(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.bd(new A.fp(s))},
bN(a){var s=a.a
if(!(s instanceof A.fp))throw A.b(A.aF(a,"query","is not a GPU timer query"))
return s}}
A.fo.prototype={}
A.i1.prototype={}
A.i4.prototype={
dd(a){var s=A.V(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.i1(A.mD(s))}}
A.jc.prototype={
$1(a){var s,r,q,p
A.t(a)
s=A.aU(this.a.value)
A:{if("aces"===s){r=B.dh
break A}if("reinhard"===s){r=B.aV
break A}if("off"===s){r=B.dg
break A}r=B.aW
break A}q=this.b
p=q.r
q.r=new A.cX(p.a,p.e,p.f,r)},
$S:2}
A.jd.prototype={
$1(a){var s,r,q,p,o=this,n=a.a,m=o.a,l=n*1.4
m.b=new A.aA(new A.f(0,0.5+Math.sin(l)*0.15,0),A.hD(B.j,n*0.35),1)
m.a4()
m=o.b
m.b=new A.aA(new A.f(0,0.5+Math.sin(l)*0.15,0),A.hD(B.dG.gT(),n*0.7),1)
m.a4()
m=o.c
m.b=new A.aA(B.x,A.hD(B.j,n*0.65),1)
m.a4()
for(m=o.d,l=n*2.2,s=0;s<m.length;++s){r=B.i.aI(s,3)
A:{if(0===r){q=B.dE.gT()
break A}if(1===r){q=B.dB.gT()
break A}q=B.dD.gT()
break A}if(!(s<m.length))return A.i(m,s)
p=m[s]
p.b=new A.aA(p.b.a,A.hD(q,l+s*1.2),1)
p.a4()}m=n*1.2
q=n+2
p=n*0.8+4
o.e.f=new A.cB(B.ay,B.az,1.2,0.85,B.ax,1,B.bh,A.c([new A.bz(new A.f(Math.cos(m)*4.2,1.5+Math.sin(n*2)*0.6,Math.sin(m)*4.2),B.bN,4,9),new A.bz(new A.f(Math.cos(q)*4.5,1.8,Math.sin(q)*4.5),B.bP,4,9),new A.bz(new A.f(Math.cos(p)*3.8,1.2,Math.sin(p)*3.8),B.bS,3.5,8),new A.bz(new A.f(0,3.8+Math.sin(l)*0.9,0),B.bT,4.5,10)],t.e))},
$S:60};(function aliases(){var s=J.bj.prototype
s.cl=s.i})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"nu","lY",61)
r(A,"nV","mP",5)
r(A,"nW","mQ",5)
r(A,"nX","mR",5)
q(A,"lg","nP",0)
p(A.eb.prototype,"gdF","dG",19)
var o
p(o=A.eH.prototype,"gdB","dC",3)
p(o,"gdJ","dK",3)
p(o,"gdL","dM",3)
p(o,"gdD","dE",3)
p(o,"gdH","dI",3)
q(A,"lh","mS",63)
q(A,"oS","jA",42)
p(A.b4.prototype,"gbg","c8",52)
p(A.cW.prototype,"gbM","d1",55)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.w,null)
q(A.w,[A.jw,J.e4,A.d5,J.co,A.k,A.cr,A.I,A.hS,A.ae,A.cO,A.F,A.ac,A.aS,A.c0,A.cv,A.bF,A.b6,A.hY,A.hj,A.cA,A.ds,A.be,A.bx,A.h3,A.cL,A.b1,A.cK,A.aI,A.f2,A.ix,A.iv,A.eR,A.aK,A.aw,A.eW,A.bD,A.R,A.eS,A.fh,A.dC,A.dh,A.f5,A.bG,A.D,A.dy,A.fk,A.bt,A.ia,A.d7,A.ib,A.fN,A.a5,A.X,A.fi,A.eE,A.hi,A.hF,A.ap,A.fz,A.fA,A.cX,A.cq,A.cB,A.fP,A.fQ,A.b5,A.h0,A.c4,A.dN,A.ad,A.dV,A.bz,A.aj,A.an,A.a7,A.i_,A.bk,A.fE,A.hl,A.hA,A.et,A.c7,A.hU,A.d1,A.Q,A.fR,A.eb,A.eL,A.hf,A.eH,A.hk,A.bw,A.dX,A.dY,A.dZ,A.fO,A.ce,A.E,A.a4,A.L,A.n,A.cu,A.hC,A.a1,A.hG,A.Y,A.hI,A.hH,A.f4,A.d0,A.es,A.ic,A.fj,A.it,A.f8,A.f1,A.fc,A.f7,A.ip,A.ai,A.ah,A.T,A.fD,A.fC,A.bb,A.aL,A.by,A.fS,A.b4,A.cZ,A.aA,A.P,A.f,A.cp,A.eU,A.dM,A.eV,A.dT,A.eX,A.cy,A.eZ,A.dW,A.f_,A.e2,A.f3,A.cP,A.f6,A.bU,A.dO,A.jB,A.cY,A.f9,A.eq,A.fa,A.bA,A.ez,A.fd,A.eA,A.fe,A.eC,A.fg,A.eB,A.ff,A.eM,A.fl,A.eN,A.fn,A.fm,A.d2,A.eQ,A.fq,A.ev,A.e_,A.fY,A.cD,A.d6,A.e,A.dU,A.bW,A.cW,A.en,A.fV,A.bo,A.aQ,A.bV,A.i5,A.bd,A.dB,A.dA,A.fp,A.fo,A.iA,A.i1,A.i4])
q(J.e4,[J.e6,J.cF,J.cH,J.cG,J.cI,J.c_,J.bh])
q(J.cH,[J.bj,J.r,A.c1,A.cT])
q(J.bj,[J.em,J.bB,J.bi])
r(J.e5,A.d5)
r(J.h2,J.r)
q(J.c_,[J.cE,J.e7])
q(A.k,[A.cc,A.ay,A.cN,A.a_,A.bE,A.aT])
r(A.dD,A.cc)
r(A.de,A.dD)
r(A.cs,A.de)
q(A.I,[A.cJ,A.b7,A.e8,A.eK,A.eu,A.f0,A.dK,A.aM,A.db,A.eJ,A.c9,A.dR])
q(A.ay,[A.O,A.b0,A.b2,A.b_,A.dg])
q(A.O,[A.d8,A.af,A.d4])
r(A.bc,A.aS)
q(A.bc,[A.ag,A.dn,A.dp,A.bn])
r(A.cf,A.c0)
r(A.d9,A.cf)
r(A.cw,A.d9)
r(A.M,A.cv)
q(A.b6,[A.cx,A.dq,A.dz])
r(A.aN,A.cx)
r(A.cV,A.b7)
q(A.be,[A.dP,A.dQ,A.eG,A.j7,A.j9,A.i7,A.i6,A.iC,A.im,A.jg,A.jh,A.j1,A.j2,A.i0,A.hc,A.hd,A.he,A.hn,A.hb,A.hg,A.hV,A.hX,A.fJ,A.fH,A.fI,A.ho,A.hp,A.hN,A.hM,A.hL,A.hK,A.hJ,A.hO,A.iT,A.iU,A.hP,A.hQ,A.jo,A.jm,A.hB,A.fT,A.ha,A.j_,A.hz,A.hq,A.hr,A.hs,A.ht,A.hu,A.hv,A.hw,A.hx,A.fW,A.fX,A.i2,A.i3,A.jc,A.jd])
q(A.eG,[A.eD,A.bT])
q(A.bx,[A.aZ,A.df])
q(A.dQ,[A.j8,A.iD,A.iY,A.io,A.h4,A.h9,A.ji,A.hh,A.hW,A.jj,A.fK,A.hR,A.jn,A.jl])
q(A.cT,[A.ec,A.a2])
q(A.a2,[A.dj,A.dl])
r(A.dk,A.dj)
r(A.cR,A.dk)
r(A.dm,A.dl)
r(A.cS,A.dm)
q(A.cR,[A.cQ,A.ed])
q(A.cS,[A.ee,A.ef,A.eg,A.eh,A.ei,A.cU,A.ej])
r(A.dt,A.f0)
q(A.dP,[A.i8,A.i9,A.iw,A.id,A.ii,A.ih,A.ig,A.ie,A.il,A.ik,A.ij,A.is,A.iX,A.iS,A.iL,A.iM,A.iR,A.iG,A.iI,A.iH,A.iQ,A.iE,A.iF,A.iN,A.iO,A.iP,A.iK,A.iJ,A.iV,A.iW,A.j0])
r(A.dd,A.eW)
r(A.fb,A.dC)
r(A.di,A.df)
r(A.aJ,A.dq)
r(A.da,A.dz)
q(A.aM,[A.d_,A.e3])
q(A.ia,[A.c5,A.ca,A.bZ,A.fv,A.ea,A.ba,A.cz,A.fx,A.fy,A.c6,A.bX,A.aH,A.er,A.aY,A.d3,A.ey,A.cC,A.eT,A.eY,A.fU,A.e0,A.fZ,A.h_,A.bY,A.e1,A.c8,A.b9,A.ct,A.dr,A.fw,A.bS,A.fB,A.fF,A.a6])
q(A.b5,[A.ao,A.ar,A.aO,A.el,A.bg])
r(A.ew,A.fc)
r(A.eO,A.fo)
s(A.dD,A.D)
s(A.dj,A.D)
s(A.dk,A.ac)
s(A.dl,A.D)
s(A.dm,A.ac)
s(A.cf,A.dy)
s(A.dz,A.fk)
s(A.fc,A.ip)
s(A.fo,A.iA)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{h:"int",q:"double",aa:"num",v:"String",z:"bool",X:"Null",y:"List",w:"Object",am:"Map",G:"JSObject"},mangledNames:{},types:["~()","aG()","X(G)","aG(ar?)","z(E)","~(~())","~(@)","z(a7)","z(v)","z(n)","X(@)","X()","z(q)","X(w?)","h(h,+(ao,bk))","h(+influence,light(q,aj),+influence,light(q,aj))","@(v)","@(@,v)","X(~())","an(aO)","aO(h,h,v?)","ao(h,h,v?)","@(@)","X(@,bm)","ar(h,h,v?)","z(eI?)","h(h,+(ar,iu))","h(+influence,source(q,dc),+influence,source(q,dc))","v(E)","h(x,x)","~(h,@)","X(w,bm)","z(h)","bg(h,h,v?)","d2(ao)","aG(v{fallback:v?})","~(@,@)","aj?()","y<aj>()","cq()","q()","bU()","z()","z(a5<v,Q>)","Q(a5<v,Q>)","Q(Q,Q)","h(T<ai>,T<ai>)","aq(T<ai>)","h(T<ah>,T<ah>)","aq(T<ah>)","~(f,f,f,f,f,f)","by(q,q,q,q)","f(f)","~(bA)","bA()","~(aa)","d1(ap)","~(G)","~(w?,w?)","w?(w?)","~(bW)","h(@,@)","z(ap)","ce()","aG?()"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.ag&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.dn&&a.b(c.a)&&b.b(c.b),"2;influence,source":(a,b)=>c=>c instanceof A.dp&&a.b(c.a)&&b.b(c.b),"2;mat,mesh":(a,b)=>c=>c instanceof A.bn&&a.b(c.a)&&b.b(c.b)}}
A.n7(v.typeUniverse,JSON.parse('{"em":"bj","bB":"bj","bi":"bj","oC":"c1","r":{"y":["1"],"G":[],"k":["1"]},"e6":{"z":[],"C":[]},"cF":{"C":[]},"cH":{"G":[]},"bj":{"G":[]},"e5":{"d5":[]},"h2":{"r":["1"],"y":["1"],"G":[],"k":["1"]},"co":{"N":["1"]},"c_":{"q":[],"aa":[],"ab":["aa"]},"cE":{"q":[],"h":[],"aa":[],"ab":["aa"],"C":[]},"e7":{"q":[],"aa":[],"ab":["aa"],"C":[]},"bh":{"v":[],"ab":["v"],"ku":[],"C":[]},"cc":{"k":["2"]},"cr":{"N":["2"]},"de":{"D":["2"],"y":["2"],"cc":["1","2"],"k":["2"]},"cs":{"de":["1","2"],"D":["2"],"y":["2"],"cc":["1","2"],"k":["2"],"D.E":"2","k.E":"2"},"cJ":{"I":[]},"ay":{"k":["1"]},"O":{"ay":["1"],"k":["1"]},"d8":{"O":["1"],"ay":["1"],"k":["1"],"k.E":"1","O.E":"1"},"ae":{"N":["1"]},"cN":{"k":["2"],"k.E":"2"},"cO":{"N":["2"]},"af":{"O":["2"],"ay":["2"],"k":["2"],"k.E":"2","O.E":"2"},"a_":{"k":["1"],"k.E":"1"},"F":{"N":["1"]},"d4":{"O":["1"],"ay":["1"],"k":["1"],"k.E":"1","O.E":"1"},"ag":{"bc":[],"aS":[]},"dn":{"bc":[],"aS":[]},"dp":{"bc":[],"aS":[]},"bn":{"bc":[],"aS":[]},"cw":{"d9":["1","2"],"cf":["1","2"],"c0":["1","2"],"dy":["1","2"],"am":["1","2"]},"cv":{"am":["1","2"]},"M":{"cv":["1","2"],"am":["1","2"]},"bE":{"k":["1"],"k.E":"1"},"bF":{"N":["1"]},"cx":{"b6":["1"],"bl":["1"],"k":["1"]},"aN":{"cx":["1"],"b6":["1"],"bl":["1"],"k":["1"]},"cV":{"b7":[],"I":[]},"e8":{"I":[]},"eK":{"I":[]},"ds":{"bm":[]},"be":{"bu":[]},"dP":{"bu":[]},"dQ":{"bu":[]},"eG":{"bu":[]},"eD":{"bu":[]},"bT":{"bu":[]},"eu":{"I":[]},"aZ":{"bx":["1","2"],"ko":["1","2"],"am":["1","2"]},"b0":{"ay":["1"],"k":["1"],"k.E":"1"},"cL":{"N":["1"]},"b2":{"ay":["1"],"k":["1"],"k.E":"1"},"b1":{"N":["1"]},"b_":{"ay":["a5<1,2>"],"k":["a5<1,2>"],"k.E":"a5<1,2>"},"cK":{"N":["a5<1,2>"]},"bc":{"aS":[]},"c1":{"G":[],"C":[]},"cT":{"G":[]},"ec":{"G":[],"C":[]},"a2":{"ak":["1"],"G":[]},"cR":{"D":["q"],"a2":["q"],"y":["q"],"ak":["q"],"G":[],"k":["q"],"ac":["q"]},"cS":{"D":["h"],"a2":["h"],"y":["h"],"ak":["h"],"G":[],"k":["h"],"ac":["h"]},"cQ":{"fL":[],"D":["q"],"a2":["q"],"y":["q"],"ak":["q"],"G":[],"k":["q"],"ac":["q"],"C":[],"D.E":"q"},"ed":{"fM":[],"D":["q"],"a2":["q"],"y":["q"],"ak":["q"],"G":[],"k":["q"],"ac":["q"],"C":[],"D.E":"q"},"ee":{"D":["h"],"a2":["h"],"y":["h"],"ak":["h"],"G":[],"k":["h"],"ac":["h"],"C":[],"D.E":"h"},"ef":{"D":["h"],"a2":["h"],"y":["h"],"ak":["h"],"G":[],"k":["h"],"ac":["h"],"C":[],"D.E":"h"},"eg":{"D":["h"],"a2":["h"],"y":["h"],"ak":["h"],"G":[],"k":["h"],"ac":["h"],"C":[],"D.E":"h"},"eh":{"D":["h"],"a2":["h"],"y":["h"],"ak":["h"],"G":[],"k":["h"],"ac":["h"],"C":[],"D.E":"h"},"ei":{"D":["h"],"a2":["h"],"y":["h"],"ak":["h"],"G":[],"k":["h"],"ac":["h"],"C":[],"D.E":"h"},"cU":{"D":["h"],"a2":["h"],"y":["h"],"ak":["h"],"G":[],"k":["h"],"ac":["h"],"C":[],"D.E":"h"},"ej":{"eI":[],"D":["h"],"a2":["h"],"y":["h"],"ak":["h"],"G":[],"k":["h"],"ac":["h"],"C":[],"D.E":"h"},"f0":{"I":[]},"dt":{"b7":[],"I":[]},"aK":{"N":["1"]},"aT":{"k":["1"],"k.E":"1"},"aw":{"I":[]},"dd":{"eW":["1"]},"R":{"bv":["1"]},"dC":{"kM":[]},"fb":{"dC":[],"kM":[]},"df":{"bx":["1","2"],"am":["1","2"]},"di":{"df":["1","2"],"bx":["1","2"],"am":["1","2"]},"dg":{"ay":["1"],"k":["1"],"k.E":"1"},"dh":{"N":["1"]},"aJ":{"b6":["1"],"kp":["1"],"bl":["1"],"k":["1"]},"bG":{"N":["1"]},"bx":{"am":["1","2"]},"c0":{"am":["1","2"]},"d9":{"cf":["1","2"],"c0":["1","2"],"dy":["1","2"],"am":["1","2"]},"b6":{"bl":["1"],"k":["1"]},"dq":{"b6":["1"],"bl":["1"],"k":["1"]},"da":{"b6":["1"],"fk":["1"],"bl":["1"],"k":["1"]},"bt":{"ab":["bt"]},"q":{"aa":[],"ab":["aa"]},"h":{"aa":[],"ab":["aa"]},"y":{"k":["1"]},"aa":{"ab":["aa"]},"bl":{"k":["1"]},"v":{"ab":["v"],"ku":[]},"dK":{"I":[]},"b7":{"I":[]},"aM":{"I":[]},"d_":{"I":[]},"e3":{"I":[]},"db":{"I":[]},"eJ":{"I":[]},"c9":{"I":[]},"dR":{"I":[]},"d7":{"I":[]},"fi":{"bm":[]},"ao":{"b5":[]},"ar":{"b5":[]},"aO":{"b5":[]},"bg":{"b5":[]},"el":{"b5":[]},"dZ":{"mo":[]},"d0":{"mr":[]},"f4":{"aq":[]},"es":{"mt":[]},"fj":{"aq":[]},"f8":{"mq":[]},"f1":{"lR":[]},"ew":{"mv":[]},"ai":{"ab":["ai"]},"ah":{"ab":["ah"]},"cp":{"B":[]},"eU":{"x":[]},"dM":{"B":[]},"eV":{"x":[]},"dT":{"B":[]},"eX":{"x":[]},"cy":{"B":[]},"eZ":{"x":[]},"dW":{"B":[]},"f_":{"x":[]},"e2":{"B":[]},"f3":{"x":[]},"cP":{"B":[]},"f6":{"x":[]},"dO":{"mp":[]},"cY":{"B":[]},"f9":{"x":[]},"eq":{"B":[]},"fa":{"x":[]},"ez":{"B":[]},"fd":{"x":[]},"eA":{"B":[]},"fe":{"x":[]},"eC":{"B":[]},"fg":{"x":[]},"eB":{"B":[]},"ff":{"x":[]},"eM":{"B":[]},"fl":{"x":[]},"eN":{"B":[]},"fn":{"x":[]},"fm":{"x":[]},"eQ":{"B":[]},"fq":{"x":[]},"dU":{"lN":[]},"bd":{"aG":[]},"eO":{"lT":[]},"lW":{"y":["h"],"k":["h"]},"eI":{"y":["h"],"k":["h"]},"mB":{"y":["h"],"k":["h"]},"lU":{"y":["h"],"k":["h"]},"mz":{"y":["h"],"k":["h"]},"lV":{"y":["h"],"k":["h"]},"mA":{"y":["h"],"k":["h"]},"fL":{"y":["q"],"k":["q"]},"fM":{"y":["q"],"k":["q"]}}'))
A.n6(v.typeUniverse,JSON.parse('{"dD":2,"a2":1,"dq":1,"dz":1}'))
var u={l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",b:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nuniform vec3 uClearColor;\nuniform vec3 uSkyHorizon;\nuniform vec3 uSkyZenith;\nuniform vec3 uSkyGround;\nuniform float uSkyEnabled;\nuniform float uSkyHorizonGlow;\nuniform float uSkyStarDensity;\nuniform sampler2D uSkyTexture;\nuniform float uSkyTextureEnabled;\nuniform float uSkyRotation;\nuniform float uSkyExposure;\nuniform float uSkyTextureSrgb;\nuniform mat4 uInverseProjection;\nuniform mat4 uInverseView;\nuniform vec3 uCameraPosition;\nuniform float uCloudCoverage;\nuniform float uCloudDensity;\nuniform float uCloudBaseHeight;\nuniform float uCloudThickness;\nuniform float uCloudScale;\nuniform vec2 uCloudWind;\nuniform float uCloudPhase;\nuniform float uCloudDetail;\nuniform float uCloudSilverLining;\nuniform float uCloudSampleCount;\nuniform vec3 uCloudLightDirection;\nuniform vec3 uCloudLightColor;\nuniform float uCloudLightIntensity;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 acesToneMap(vec3 color){\n  return clamp((color*(2.51*color+0.03))/(color*(2.43*color+0.59)+0.14),0.0,1.0);\n}\n\nvec3 agxToneMap(vec3 color){\n  const mat3 agxMat=mat3(\n    0.842479062253094,0.0423282422610123,0.0423756549057051,\n    0.0784335999999992,0.878468636469772,0.0784336,\n    0.0792237451477643,0.0791661274605434,0.879142973793104\n  );\n  const mat3 agxMatInv=mat3(\n    1.19687902425764,-0.0528968517032958,-0.0529716355080549,\n    -0.0980208811401368,1.15190312990417,-0.0980434501171241,\n    -0.0990297440797205,-0.0989611768448433,1.15107367264185\n  );\n  vec3 val=agxMat*color;\n  val=clamp(log2(max(val,vec3(1e-10)))*0.0625+0.625,0.0,1.0);\n  val=val*val*val*(val*(val*6.0-15.0)+10.0);\n  val=agxMatInv*val;\n  return max(val,vec3(0.0));\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nvec3 skyBackground(vec2 uv){\n  // A deliberately cheap, high-quality fallback sky: three atmospheric bands\n  // provide depth at every camera angle, while the tiny deterministic star\n  // field and horizon glow keep the clear background from reading as a flat\n  // color. It is an environment layer, not a game/weather simulation.\n  float lower=smoothstep(0.0,0.48,uv.y);\n  float upper=smoothstep(0.42,1.0,uv.y);\n  vec3 color=mix(uSkyGround,uSkyHorizon,lower);\n  color=mix(color,uSkyZenith,upper);\n  float horizonGlow=exp(-pow((uv.y-0.48)*7.0,2.0));\n  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);\n  float starMask=smoothstep(0.62,0.92,uv.y);\n  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),hash(floor(uv*vec2(180.0,100.0))))*starMask;\n  color+=vec3(0.16,0.19,0.24)*stars;\n  return max(color,vec3(0.0));\n}\n\nfloat hash3(vec3 p){\n  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);\n}\n\nfloat valueNoise(vec3 p){\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  f=f*f*(3.0-2.0*f);\n  float n000=hash3(i+vec3(0,0,0));\n  float n100=hash3(i+vec3(1,0,0));\n  float n010=hash3(i+vec3(0,1,0));\n  float n110=hash3(i+vec3(1,1,0));\n  float n001=hash3(i+vec3(0,0,1));\n  float n101=hash3(i+vec3(1,0,1));\n  float n011=hash3(i+vec3(0,1,1));\n  float n111=hash3(i+vec3(1,1,1));\n  float x00=mix(n000,n100,f.x);\n  float x10=mix(n010,n110,f.x);\n  float x01=mix(n001,n101,f.x);\n  float x11=mix(n011,n111,f.x);\n  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);\n}\n\nfloat cloudNoise(vec3 p){\n  float value=0.0;\n  float amplitude=0.5;\n  for(int octave=0;octave<4;octave++){\n    value+=valueNoise(p)*amplitude;\n    p=p*2.03+vec3(17.3,11.7,7.1);\n    amplitude*=0.5;\n  }\n  return value;\n}\n\nfloat cloudDensityAt(vec3 position){\n  float height01=clamp(\n    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),\n    0.0,1.0\n  );\n  float vertical=smoothstep(0.0,0.12,height01)*\n    (1.0-smoothstep(0.72,1.0,height01));\n  vec3 q=position*max(uCloudScale,0.00001)+\n    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);\n  float macro=cloudNoise(q*0.82);\n  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));\n  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));\n  float threshold=1.0-clamp(uCloudCoverage,0.,1.);\n  float body=smoothstep(threshold,threshold+0.26,shape);\n  return body*vertical*clamp(uCloudDensity,0.,1.);\n}\n\nvec4 volumetricClouds(vec3 worldDirection){\n  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){\n    return vec4(0.0);\n  }\n  float directionY=max(worldDirection.y,0.001);\n  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;\n  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;\n  startT=max(startT,0.0);\n  endT=max(endT,0.0);\n  if(endT<=startT) return vec4(0.0);\n  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));\n  float stepLength=(endT-startT)/float(sampleCount);\n  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;\n  vec3 sunDirection=normalize(-uCloudLightDirection);\n  float transmittance=1.0;\n  vec3 inScatter=vec3(0.0);\n  for(int i=0;i<24;i++){\n    if(i>=sampleCount) break;\n    float t=startT+(float(i)+0.5)*stepLength+jitter;\n    vec3 position=uCameraPosition+worldDirection*t;\n    float density=cloudDensityAt(position);\n    float opticalDepth=density*stepLength*0.0035;\n    float segmentAlpha=1.0-exp(-opticalDepth);\n    float towardLight=cloudDensityAt(position+sunDirection*90.0);\n    float lightTransmittance=exp(-towardLight*0.025);\n    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);\n    vec3 ambient=uSkyHorizon*0.32;\n    vec3 direct=uCloudLightColor*\n      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;\n    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;\n    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);\n    inScatter+=transmittance*segmentAlpha*sampleLight;\n    transmittance*=1.0-segmentAlpha;\n    if(transmittance<0.01) break;\n  }\n  return vec4(inScatter,1.0-transmittance);\n}\n\nvec3 srgbToLinear(vec3 color){\n  vec3 low=color/12.92;\n  vec3 high=pow((color+0.055)/1.055,vec3(2.4));\n  return mix(low,high,step(vec3(0.04045),color));\n}\n\nvec3 worldDirectionForUv(vec2 uv){\n  vec2 ndc=uv*2.0-1.0;\n  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);\n  return normalize(viewPoint.xyz/viewPoint.w);\n}\n\nvec3 equirectangularSky(vec2 uv){\n  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);\n  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;\n  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));\n  vec2 sampleUv=vec2(\n    fract(longitude/(2.0*3.14159265359)+0.5),\n    0.5-latitude/3.14159265359\n  );\n  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));\n  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));\n  return linear*max(uSkyExposure,0.0);\n}\n\nvoid main(){\n  vec4 source=texture(uTex,vUv);\n  // The world pass clears untouched pixels to uClearColor. Replace only that\n  // exact background, so the sky is always active without covering geometry.\n  if(uSkyEnabled>0.5 && distance(source.rgb,uClearColor)<0.004){\n    vec3 viewDirection=worldDirectionForUv(vUv);\n    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);\n    source.rgb=uSkyTextureEnabled>0.5\n      ? equirectangularSky(vUv)\n      : skyBackground(vUv);\n    vec4 clouds=volumetricClouds(worldDirection);\n    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;\n  }\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  vec3 mapped=uToneMap>3.0\n    ?agxToneMap(color)\n    :(uToneMap>1.5?acesToneMap(color):reinhardToneMap(color));\n  float toneMix=uToneMap>3.0\n    ?clamp(uToneMap-3.0,0.,1.)\n    :(uToneMap>1.5?clamp(uToneMap-1.5,0.,1.):clamp(uToneMap,0.,1.));\n  color=mix(color,mapped,toneMix);\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  // Atmospheric precipitation is submitted as depth-tested world geometry;\n  // the present pass must never paint weather over unrelated surfaces.\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",f:"Transform.scale must be finite and positive: ",k:"WebGl2Device: operation attempted while context is not ready"}
var t=(function rtii(){var s=A.bM
return{v:s("aw"),g0:s("ah"),fW:s("dN"),do:s("bU"),e8:s("ab<@>"),dN:s("cu"),I:s("M<v,h>"),P:s("aN<v>"),df:s("bt"),Q:s("I"),B:s("fL"),gN:s("fM"),o:s("Q"),Z:s("bu"),j:s("aG"),cr:s("k<cu>"),bM:s("k<q>"),hf:s("k<@>"),J:s("r<aG>"),b7:s("r<a4>"),gk:s("r<bw>"),cU:s("r<E>"),dV:s("r<by>"),e:s("r<bz>"),eT:s("r<c4>"),cw:s("r<+influence,light(q,aj)>"),gg:s("r<+influence,source(q,dc)>"),f:s("r<B>"),u:s("r<x>"),cR:s("r<d0>"),C:s("r<n>"),c4:s("r<c7>"),h:s("r<aq>"),D:s("r<ev>"),aM:s("r<T<ah>>"),c1:s("r<T<ai>>"),w:s("r<aj>"),s:s("r<v>"),gi:s("r<f>"),q:s("r<dc>"),cL:s("r<f7>"),ha:s("r<bo<an>>"),c9:s("r<bo<bk>>"),aO:s("r<bo<c7>>"),fq:s("r<bo<iu>>"),n:s("r<q>"),r:s("r<@>"),t:s("r<h>"),T:s("cF"),m:s("G"),E:s("bi"),aU:s("ak<@>"),_:s("y<a4>"),O:s("y<E>"),dy:s("y<v>"),aH:s("y<@>"),bW:s("y<h>"),ao:s("a5<v,Q>"),bS:s("am<v,aG>"),a1:s("am<v,E>"),eL:s("aO"),cA:s("ao"),a:s("X"),K:s("w"),fy:s("ai"),z:s("E"),eD:s("c4"),W:s("ap"),gT:s("oD"),bQ:s("+()"),ai:s("+(ao,bk)"),dU:s("+(ar,iu)"),fk:s("+influence,light(q,aj)"),eS:s("+influence,source(q,dc)"),fA:s("x"),b0:s("aQ<bg,c7>"),ex:s("aQ<aO,an>"),cE:s("aQ<ao,bk>"),g2:s("aQ<ar,iu>"),L:s("n"),Y:s("aq"),U:s("bl<v>"),cJ:s("bl<h>"),b:s("T<ah>"),k:s("T<ai>"),l:s("bm"),d5:s("a6"),N:s("v"),aj:s("ar"),aX:s("my"),dm:s("C"),eK:s("b7"),ak:s("bB"),am:s("da<v>"),bw:s("eL"),fP:s("f"),G:s("a7"),fl:s("a_<a7>"),an:s("F<a7>"),c:s("R<@>"),cd:s("R<~>"),hg:s("di<w?,w?>"),a8:s("ce"),eM:s("aT<aq>"),V:s("dA"),R:s("dB"),y:s("z"),al:s("z(w)"),fg:s("z(a7)"),i:s("q"),A:s("@"),fO:s("@()"),x:s("@(w)"),d:s("@(w,bm)"),S:s("h"),eH:s("bv<X>?"),du:s("r<w?>?"),bX:s("G?"),X:s("w?"),ac:s("cW?"),dk:s("v?"),F:s("bD<@,@>?"),g:s("f5?"),fQ:s("z?"),cD:s("q?"),h6:s("h?"),cg:s("aa?"),a4:s("~(bW)?"),p:s("aa"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.bK=J.e4.prototype
B.a=J.r.prototype
B.i=J.cE.prototype
B.n=J.c_.prototype
B.u=J.bh.prototype
B.bL=J.bi.prototype
B.bM=J.cH.prototype
B.Z=A.cQ.prototype
B.aJ=J.em.prototype
B.ag=J.bB.prototype
B.e_=new A.fv(0,"opaque")
B.E=new A.fw(0,"add")
B.b4=new A.bS(0,"zero")
B.C=new A.bS(1,"one")
B.P=new A.fx(0,"alpha")
B.e0=new A.fE()
B.ar=new A.fZ(1,"linear")
B.as=new A.h_(0,"clampToEdge")
B.b7=new A.fY()
B.ak=function getTagFallback(o) {
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
B.al=function(hooks) { return hooks; }

B.h=new A.hS()
B.j=new A.f(0,1,0)
B.o=new A.f(0,-1,0)
B.M=new A.ad(1,1,1)
B.be=new A.aj()
B.dL=new A.ba(0,"position")
B.dQ=new A.a7(B.dL,0,3)
B.b1=new A.ba(1,"normal")
B.dR=new A.a7(B.b1,3,3)
B.aj=new A.ba(6,"tangent4")
B.dV=new A.a7(B.aj,6,4)
B.dM=new A.ba(2,"color")
B.dS=new A.a7(B.dM,10,4)
B.dN=new A.ba(4,"alpha")
B.dT=new A.a7(B.dN,14,1)
B.dO=new A.ba(5,"uv0")
B.dU=new A.a7(B.dO,15,2)
B.dP=new A.ba(8,"legacyMaterialEffect")
B.dW=new A.a7(B.dP,17,1)
B.A=s([B.dQ,B.dR,B.dV,B.dS,B.dT,B.dU,B.dW],A.bM("r<a7>"))
B.bf=new A.i_()
B.bg=new A.i4()
B.p=new A.fb()
B.F=new A.fi()
B.Q=new A.ct(0,"colorOnly")
B.am=new A.ct(1,"colorAndDepth")
B.R=new A.ct(2,"depthOnly")
B.S=new A.fy(1,"srgb")
B.G=new A.fB(1,"back")
B.H=new A.fF(0,"less")
B.dJ=new A.f(0.5,-1,0.3)
B.bQ=new A.ad(1,0.95,0.85)
B.bh=new A.dV(B.dJ,B.bQ,2.2)
B.I=new A.cz(0,"opaque")
B.bj=new A.cz(1,"masked")
B.T=new A.cz(2,"blended")
B.bk=new A.bV(!1,B.H,!1,!0,B.C,B.C,B.E,!1,B.G,!0,!1,!0,!0,!0,!0,!1)
B.bl=new A.bV(!0,B.H,!1,!0,B.C,B.C,B.E,!0,B.G,!0,!1,!0,!0,!0,!0,!1)
B.b5=new A.bS(2,"srcAlpha")
B.b6=new A.bS(3,"oneMinusSrcAlpha")
B.bm=new A.bV(!0,B.H,!1,!0,B.b5,B.b6,B.E,!0,B.G,!0,!1,!0,!0,!0,!0,!1)
B.bR=new A.ad(0.03,0.03,0.04)
B.v=new A.ad(0,0,0)
B.aC=s([],t.e)
B.X=s([],t.w)
B.aA=s([],t.q)
B.aB=s([],A.bM("r<my>"))
B.bn=new A.cB(B.bR,B.v,0,0,B.M,0,null,B.aC)
B.ay=new A.ad(0.015,0.02,0.03)
B.az=new A.ad(0.7,0.8,1)
B.ax=new A.ad(0.04,0.05,0.07)
B.dH=new A.f(0.6,-1,0.4)
B.bO=new A.ad(1,0.95,0.88)
B.bi=new A.dV(B.dH,B.bO,2.4)
B.bo=new A.cB(B.ay,B.az,1.2,0.85,B.ax,1,B.bi,B.aC)
B.bp=new A.Q(0,0,0)
B.bq=new A.bX(0,"idle")
B.J=new A.bX(1,"active")
B.br=new A.bX(2,"ended")
B.bs=new A.bX(3,"aborted")
B.an=new A.cC(0,"outside")
B.bt=new A.cC(1,"intersects")
B.bu=new A.cC(2,"inside")
B.bv=new A.e0(0,"vertex")
B.ao=new A.e0(1,"indices")
B.ap=new A.fU(0,"staticDraw")
B.d=new A.e1(0,"ready")
B.K=new A.e1(1,"lost")
B.bw=new A.bY(0,"color")
B.aq=new A.bY(1,"colorAndGlow")
B.bx=new A.bY(2,"colorDepthGlow")
B.U=new A.bY(3,"depthOnly")
B.by=new A.aY(0,"beforeShadow")
B.bz=new A.aY(2,"beforeDepth")
B.V=new A.aY(3,"afterDepth")
B.at=new A.aY(4,"beforeWorld")
B.bA=new A.aY(5,"afterWorld")
B.r=new A.aY(6,"afterResolve")
B.bB=new A.aY(9,"beforePresent")
B.au=new A.aH(0,"readBeforeWrite")
B.bC=new A.aH(1,"duplicateWriter")
B.bD=new A.aH(2,"sampledMultisampledAttachment")
B.W=new A.aH(3,"invalidResolve")
B.bE=new A.aH(4,"formatOrSizeMismatch")
B.bF=new A.aH(5,"unversionedReadWrite")
B.bG=new A.aH(6,"invalidHistoryRead")
B.bH=new A.aH(7,"dependencyCycle")
B.bI=new A.aH(8,"missingCapability")
B.av=new A.bZ(0,"wrongKind")
B.aw=new A.bZ(1,"staleGeneration")
B.bJ=new A.bZ(2,"doubleRelease")
B.L=new A.bZ(3,"releasedResource")
B.bN=new A.ad(1,0.25,0.25)
B.bP=new A.ad(0.25,0.5,1)
B.bS=new A.ad(0.2,1,0.45)
B.bT=new A.ad(1,0.85,0.35)
B.bU=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.bV=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale","uShadowMapTexelSize","uShadowFilterRadius","uShadowBias","uReflectionColor","uReflectionIntensity","uReflectionConfidence","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uSpecularScale","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness","uSurfaceSnowCoverage","uSurfaceDissolution","uThermalSourceCount","uThermalSourcePosition0","uThermalSourceRadius0","uThermalSourceDissolution0","uThermalSourcePosition1","uThermalSourceRadius1","uThermalSourceDissolution1","uThermalSourcePosition2","uThermalSourceRadius2","uThermalSourceDissolution2","uThermalSourcePosition3","uThermalSourceRadius3","uThermalSourceDissolution3"],t.s)
B.bW=s(["uQuantizationBits","uDitherStrength"],t.s)
B.bX=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.bY=s(["uNear","uFar","uLightDir","uLightColor","uShaftIntensity","uFogDensity","uAnisotropy","uViewProjection","uView","uInverseProjection","uVolumetricAlbedo","uVolumetricHeightFalloff","uVolumetricDustDensity","uVolumetricJitter","uVolumetricIntensity","uVolumetricSampleCount"],t.s)
B.bZ=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.c_=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.c0=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale"],t.s)
B.c1=s([],t.u)
B.a_=new A.c5(2,"high")
B.cz={shadows:0,ssao:1,bloom:2,dof:3,grade:4,volumetric:5}
B.da=new A.aN(B.cz,6,t.P)
B.cR=new A.ap(B.a_,B.da)
B.cs={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.d7=new A.aN(B.cs,5,t.P)
B.aM=new A.ap(B.a_,B.d7)
B.cO=new A.c5(1,"standard")
B.cA={shadows:0}
B.db=new A.aN(B.cA,1,t.P)
B.cQ=new A.ap(B.cO,B.db)
B.aK=new A.c5(0,"safe")
B.aI={}
B.a4=new A.aN(B.aI,0,t.P)
B.aL=new A.ap(B.aK,B.a4)
B.Y=s([B.cR,B.aM,B.cQ,B.aL],A.bM("r<ap>"))
B.c2=s(["uExposure","uVignette","uGrain","uOutputEncoding","uToneMap","uClearColor","uSkyHorizon","uSkyZenith","uSkyGround","uSkyEnabled","uSkyHorizonGlow","uSkyStarDensity","uSkyTexture","uSkyTextureEnabled","uSkyRotation","uSkyExposure","uSkyTextureSrgb","uInverseProjection","uInverseView","uCameraPosition","uCloudCoverage","uCloudDensity","uCloudBaseHeight","uCloudThickness","uCloudScale","uCloudWind","uCloudPhase","uCloudDetail","uCloudSilverLining","uCloudSampleCount","uCloudLightDirection","uCloudLightColor","uCloudLightIntensity"],t.s)
B.a5=new A.a6(0,"depthTest")
B.a6=new A.a6(1,"depthFunc")
B.a7=new A.a6(2,"depthWrite")
B.a8=new A.a6(3,"blendEnable")
B.a9=new A.a6(4,"blendFunc")
B.aa=new A.a6(5,"blendEquation")
B.ab=new A.a6(6,"cullEnable")
B.ac=new A.a6(7,"cullFace")
B.aU=new A.a6(8,"frontFace")
B.df=new A.a6(9,"stencilEnable")
B.aS=new A.a6(10,"colorMask")
B.aT=new A.a6(11,"scissorEnable")
B.c3=s([B.a5,B.a6,B.a7,B.a8,B.a9,B.aa,B.ab,B.ac,B.aU,B.df,B.aS,B.aT],A.bM("r<a6>"))
B.c4=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.c5=s(["uBloomStrength"],t.s)
B.c6=s(["uLutSize","uStrength"],t.s)
B.c7=s(["uTexelSize","uNear","uFar"],t.s)
B.aD=s(["uTexelStep"],t.s)
B.c8=s(["uVolumetricStrength"],t.s)
B.cB={uAlbedo:0}
B.aE=new A.M(B.cB,[0],t.I)
B.cI={uSsaoRaw:0,uSceneDepth:1}
B.c9=new A.M(B.cI,[0,1],t.I)
B.cF={uScene:0,uHistory:1}
B.ca=new A.M(B.cF,[0,1],t.I)
B.cw={aPosition:0,aUvMat:1}
B.aF=new A.M(B.cw,[0,4],t.I)
B.cG={uScene:0,uLut:1}
B.cb=new A.M(B.cG,[0,1],t.I)
B.cH={uSource:0}
B.aG=new A.M(B.cH,[0],t.I)
B.cy={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.cc=new A.M(B.cy,[0,1,2,3,4,5,6],t.I)
B.cu={uSharp:0,uBlurred:1,uSceneDepth:2}
B.cd=new A.M(B.cu,[0,1,2],t.I)
B.cJ={uTex:0,uSkyTexture:1}
B.ce=new A.M(B.cJ,[0,1],t.I)
B.cC={uBloom:0}
B.cf=new A.M(B.cC,[0],t.I)
B.cD={uSceneDepth:0}
B.aH=new A.M(B.cD,[0],t.I)
B.cE={uScene:0}
B.cg=new A.M(B.cE,[0],t.I)
B.m=new A.M(B.aI,[],t.I)
B.cr={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.ch=new A.M(B.cr,[0,1,2,3,4,5,6],t.I)
B.cK={uVolumetric:0}
B.ci=new A.M(B.cK,[0],t.I)
B.cx={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.cj=new A.M(B.cx,[0,1,2,3],t.I)
B.e1=new A.ea(0,"srgb")
B.e2=new A.ea(1,"linear")
B.ck=new A.an("emerald",0.1,0.88,0.42,0.25,0.4,0.6,0.2)
B.cl=new A.an("sapphire",0.18,0.42,0.98,0.22,0.45,0.6,0.2)
B.cm=new A.an("ground",0.1,0.12,0.16,0.65,0.2,0,0.2)
B.cn=new A.an("ruby",0.98,0.12,0.22,0.2,0.5,0.7,0.2)
B.co=new A.an("gold_sphere",1,0.78,0.35,0.12,0.95,0.85,0.08)
B.cp=new A.an("amethyst",0.72,0.25,0.95,0.3,0.35,0,0.2)
B.cq=new A.an("chrome_torus",0.92,0.94,0.98,0.06,0.98,0,0.2)
B.cL=new A.el(0,1,null)
B.aW=new A.ca(3,"agx")
B.cM=new A.cX(1.15,0.22,0.12,B.aW)
B.aV=new A.ca(1,"reinhard")
B.cN=new A.cX(1,0,0,B.aV)
B.cP=new A.c5(4,"shipping")
B.ct={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.d9=new A.aN(B.ct,7,t.P)
B.e3=new A.ap(B.cP,B.d9)
B.B=new A.cZ(0,0,0,1)
B.a0=new A.c6(0,"constructed")
B.cS=new A.c6(1,"initializing")
B.a1=new A.c6(2,"ready")
B.a2=new A.c6(3,"contextLost")
B.c=new A.d3(0,"read")
B.e=new A.d3(1,"write")
B.t=new A.d3(2,"historyRead")
B.l=new A.er(0,"rgba8")
B.cT=new A.L("dofBlurH",B.l,192,108,1,0)
B.cU=new A.L("dofBlurV",B.l,192,108,1,0)
B.cV=new A.L("dofOutput",B.l,384,216,1,0)
B.aN=new A.er(2,"depth24")
B.cW=new A.L("shadowMap",B.aN,512,512,1,0)
B.cX=new A.L("volumetricLight",B.l,192,108,1,0)
B.cY=new A.L("sceneColor",B.l,384,216,1,1)
B.cZ=new A.L("ssaoRaw",B.l,192,108,1,0)
B.d_=new A.L("ssaoBlurred",B.l,192,108,1,0)
B.d0=new A.L("gradeOutput",B.l,384,216,1,0)
B.d1=new A.L("vhsOutput",B.l,384,216,1,0)
B.d2=new A.L("sceneDepth",B.aN,384,216,1,0)
B.d3=new A.L("bloomBlurH",B.l,192,108,1,0)
B.d4=new A.L("bloomBlurV",B.l,192,108,1,0)
B.d5=new A.L("present",B.l,384,216,1,0)
B.a3=new A.L("sceneColor",B.l,384,216,1,0)
B.d6=new A.L("ps1Output",B.l,384,216,1,0)
B.cv={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8,volumetric:9}
B.d8=new A.aN(B.cv,10,t.P)
B.aQ=new A.c8(2,"link")
B.dc=new A.d6(B.aQ,"gl.createProgram() returned null")
B.aO=new A.c8(0,"vertex")
B.aP=new A.c8(1,"fragment")
B.aR=new A.c8(3,"validation")
B.dd=new A.ey(0,"full")
B.de=new A.ey(2,"culled")
B.dg=new A.ca(0,"off")
B.dh=new A.ca(2,"aces")
B.x=new A.f(0,0,0)
B.ad=new A.aA(B.x,B.B,1)
B.di=A.aE("ot")
B.dj=A.aE("ou")
B.dk=A.aE("fL")
B.dl=A.aE("fM")
B.dm=A.aE("lU")
B.dn=A.aE("lV")
B.dp=A.aE("lW")
B.dq=A.aE("G")
B.dr=A.aE("w")
B.ds=A.aE("mz")
B.dt=A.aE("mA")
B.du=A.aE("mB")
B.dv=A.aE("eI")
B.b=new A.b9(0,"float1")
B.ae=new A.b9(1,"float2")
B.f=new A.b9(2,"float3")
B.dw=new A.b9(3,"float4")
B.k=new A.b9(4,"mat4")
B.aX=new A.b9(5,"mat4Array")
B.af=new A.e(B.b,0)
B.aY=new A.e(B.b,1)
B.w=new A.b9(6,"sampler")
B.q=new A.e(B.w,0)
B.D=new A.e(B.w,1)
B.aZ=new A.e(B.w,2)
B.dx=new A.e(B.w,3)
B.dy=new A.e(B.w,4)
B.dz=new A.e(B.w,5)
B.dA=new A.e(B.w,6)
B.ah=new A.P(0.5,0.5)
B.b_=new A.f(0,0,1)
B.b0=new A.f(0,0,-1)
B.dB=new A.f(0,1,1)
B.dC=new A.f(0,2,5)
B.y=new A.f(1,0,0)
B.dD=new A.f(1,0,1)
B.dE=new A.f(1,1,0)
B.dF=new A.f(1/0,1/0,1/0)
B.dG=new A.f(1,0.3,0.2)
B.ai=new A.f(0,0.5,0)
B.dI=new A.f(0,-0.2,-1)
B.z=new A.f(-1,0,0)
B.dK=new A.f(-1/0,-1/0,-1/0)
B.b2=new A.eT(0,"horizontal")
B.dX=new A.eT(1,"vertical")
B.b3=new A.eY(0,"horizontal")
B.dY=new A.eY(1,"vertical")
B.N=new A.dr(0,"empty")
B.dZ=new A.dr(1,"cpuReady")
B.O=new A.dr(4,"released")})();(function staticFields(){$.iq=null
$.av=A.c([],A.bM("r<w>"))
$.kv=null
$.kd=null
$.kc=null
$.lj=null
$.lf=null
$.ll=null
$.j4=null
$.ja=null
$.k0=null
$.ir=A.c([],A.bM("r<y<w>?>"))
$.cg=null
$.dF=null
$.dG=null
$.jS=!1
$.J=B.p})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"ow","lr",()=>A.j6("_$dart_dartClosure"))
s($,"ov","k3",()=>A.j6("_$dart_dartClosure_dartJSInterop"))
s($,"oR","lC",()=>A.c([new J.e5()],A.bM("r<d5>")))
s($,"oF","ls",()=>A.b8(A.hZ({
toString:function(){return"$receiver$"}})))
s($,"oG","lt",()=>A.b8(A.hZ({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"oH","lu",()=>A.b8(A.hZ(null)))
s($,"oI","lv",()=>A.b8(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"oL","ly",()=>A.b8(A.hZ(void 0)))
s($,"oM","lz",()=>A.b8(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"oK","lx",()=>A.b8(A.kC(null)))
s($,"oJ","lw",()=>A.b8(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"oO","lB",()=>A.b8(A.kC(void 0)))
s($,"oN","lA",()=>A.b8(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"oP","k9",()=>A.mO())
s($,"oQ","dI",()=>A.jf(B.dr))
s($,"os","lq",()=>B.a3.c1())
s($,"oB","k8",()=>A.ek(A.c([255,255,255,255],t.t)))
s($,"oy","k5",()=>A.ek(A.c([128,128,255,255],t.t)))
s($,"ox","k4",()=>A.ek(A.c([0,0,0,255],t.t)))
s($,"oz","k6",()=>A.ek(A.c([255,255,0,255],t.t)))
s($,"oA","k7",()=>A.ek(A.c([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.c1,SharedArrayBuffer:A.c1,ArrayBufferView:A.cT,DataView:A.ec,Float32Array:A.cQ,Float64Array:A.ed,Int16Array:A.ee,Int32Array:A.ef,Int8Array:A.eg,Uint16Array:A.eh,Uint32Array:A.ei,Uint8ClampedArray:A.cU,CanvasPixelArray:A.cU,Uint8Array:A.ej})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.a2.$nativeSuperclassTag="ArrayBufferView"
A.dj.$nativeSuperclassTag="ArrayBufferView"
A.dk.$nativeSuperclassTag="ArrayBufferView"
A.cR.$nativeSuperclassTag="ArrayBufferView"
A.dl.$nativeSuperclassTag="ArrayBufferView"
A.dm.$nativeSuperclassTag="ArrayBufferView"
A.cS.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.jb
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
