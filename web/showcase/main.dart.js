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
if(a[b]!==s){A.oM(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.d(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.kc(b)
return new s(c,this)}:function(){if(s===null)s=A.kc(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.kc(a).prototype
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
ki(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ke(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.kg==null){A.ow()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.c(A.kY("Return interceptor for "+A.o(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iz
if(o==null)o=$.iz=A.jg(n)
p=q[o]}if(p!=null)return p
p=A.oC(a)
if(p!=null)return p
if(typeof a=="function")return B.bM
s=Object.getPrototypeOf(a)
if(s==null)return B.aL
if(s===Object.prototype)return B.aL
if(typeof q=="function"){o=$.iz
if(o==null)o=$.iz=A.jg(n)
Object.defineProperty(q,o,{value:B.al,enumerable:false,writable:true,configurable:true})
return B.al}return B.al},
kA(a,b){if(a<0||a>4294967295)throw A.c(A.aS(a,0,4294967295,"length",null))
return J.kC(new Array(a),b)},
kB(a,b){if(a<0)throw A.c(A.j("Length must be a non-negative integer: "+a,null))
return A.d(new Array(a),b.h("t<0>"))},
jK(a,b){if(a<0)throw A.c(A.j("Length must be a non-negative integer: "+a,null))
return A.d(new Array(a),b.h("t<0>"))},
kC(a,b){var s=A.d(a,b.h("t<0>"))
s.$flags=1
return s},
mh(a,b){var s=t.e8
return J.kr(s.a(a),s.a(b))},
kD(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
mi(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.kD(r))break;++b}return b},
mj(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.i(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.kD(q))break}return b},
bR(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cI.prototype
return J.ea.prototype}if(typeof a=="string")return J.bi.prototype
if(a==null)return J.cJ.prototype
if(typeof a=="boolean")return J.e9.prototype
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bj.prototype
if(typeof a=="symbol")return J.cM.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.w)return a
return J.ke(a)},
jf(a){if(typeof a=="string")return J.bi.prototype
if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bj.prototype
if(typeof a=="symbol")return J.cM.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.w)return a
return J.ke(a)},
cq(a){if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bj.prototype
if(typeof a=="symbol")return J.cM.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.w)return a
return J.ke(a)},
os(a){if(typeof a=="number")return J.c3.prototype
if(typeof a=="string")return J.bi.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bG.prototype
return a},
ot(a){if(typeof a=="string")return J.bi.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bG.prototype
return a},
aX(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bR(a).X(a,b)},
jE(a,b){if(typeof b==="number")if(Array.isArray(a)||A.oA(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.cq(a).q(a,b)},
fx(a,b,c){return J.cq(a).D(a,b,c)},
fy(a,b){return J.cq(a).j(a,b)},
kr(a,b){return J.os(a).J(a,b)},
jF(a,b){return J.cq(a).V(a,b)},
M(a){return J.bR(a).gK(a)},
a3(a){return J.cq(a).gu(a)},
bv(a){return J.jf(a).gp(a)},
dL(a){return J.bR(a).gG(a)},
lX(a,b){return J.ot(a).cs(a,b)},
bV(a){return J.bR(a).i(a)},
e7:function e7(){},
e9:function e9(){},
cJ:function cJ(){},
cL:function cL(){},
bk:function bk(){},
ep:function ep(){},
bG:function bG(){},
bj:function bj(){},
cK:function cK(){},
cM:function cM(){},
t:function t(a){this.$ti=a},
e8:function e8(){},
h8:function h8(a){this.$ti=a},
ct:function ct(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
c3:function c3(){},
cI:function cI(){},
ea:function ea(){},
bi:function bi(){}},A={jL:function jL(){},
kE(a){return new A.cN("Field '"+a+"' has been assigned during initialization.")},
mk(a){return new A.cN("Field '"+a+"' has not been initialized.")},
a_(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
eK(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
bP(a,b,c){return a},
kh(a){var s,r
for(s=$.ay.length,r=0;r<s;++r)if(a===$.ay[r])return!0
return!1},
i1(a,b,c,d){A.hK(b,"start")
if(c!=null){A.hK(c,"end")
if(b>c)A.l(A.aS(b,0,c,"start",null))}return new A.da(a,b,c,d.h("da<0>"))},
jI(){return new A.ce("No element")},
kz(){return new A.ce("Too many elements")},
ch:function ch(){},
cw:function cw(a,b){this.a=a
this.$ti=b},
dg:function dg(){},
cx:function cx(a,b){this.a=a
this.$ti=b},
cN:function cN(a){this.a=a},
i0:function i0(){},
aB:function aB(){},
Q:function Q(){},
da:function da(a,b,c,d){var _=this
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
cR:function cR(a,b,c){this.a=a
this.b=b
this.$ti=c},
cS:function cS(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a6:function a6(a,b,c){this.a=a
this.b=b
this.$ti=c},
a1:function a1(a,b,c){this.a=a
this.b=b
this.$ti=c},
G:function G(a,b,c){this.a=a
this.b=b
this.$ti=c},
ah:function ah(){},
d6:function d6(a,b){this.a=a
this.$ti=b},
dF:function dF(){},
kx(a,b,c){var s,r,q,p,o,n,m,l=A.u(a),k=A.hc(new A.b0(a,l.h("b0<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.A)(k),++i,p=o){r=k[i]
c.a(a.q(0,r))
o=p+1
q[r]=p}n=A.hc(new A.b2(a,l.h("b2<2>")),!0,c)
m=new A.O(q,n,b.h("@<0>").N(c).h("O<1,2>"))
m.$keys=k
return m}return new A.cB(A.mm(a,b,c),b.h("@<0>").N(c).h("cB<1,2>"))},
m4(){throw A.c(A.cg("Cannot modify constant Set"))},
lJ(a){var s=A.lI(a)
if(s!=null)return s
return"minified:"+a},
oA(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
o(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bV(a)
return s},
et(a){var s,r=$.kQ
if(r==null)r=$.kQ=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
mE(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.i(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
eu(a){var s,r,q,p
if(a instanceof A.w)return A.ax(A.bS(a),null)
s=J.bR(a)
if(s===B.bL||s===B.bN||t.ak.b(a)){r=B.ao(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ax(A.bS(a),null)},
kR(a){var s,r,q
if(a==null||typeof a=="number"||A.k6(a))return J.bV(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bf)return a.i(0)
if(a instanceof A.bd)return a.bY(!0)
s=$.lW()
for(r=0;r<1;++r){q=s[r].e9(a)
if(q!=null)return q}return"Instance of '"+A.eu(a)+"'"},
c7(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mD(a){var s=A.c7(a).getUTCFullYear()+0
return s},
mB(a){var s=A.c7(a).getUTCMonth()+1
return s},
mx(a){var s=A.c7(a).getUTCDate()+0
return s},
my(a){var s=A.c7(a).getUTCHours()+0
return s},
mA(a){var s=A.c7(a).getUTCMinutes()+0
return s},
mC(a){var s=A.c7(a).getUTCSeconds()+0
return s},
mz(a){var s=A.c7(a).getUTCMilliseconds()+0
return s},
mw(a){var s=a.$thrownJsError
if(s==null)return null
return A.cr(s)},
kS(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.V(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
i(a,b){if(a==null)J.bv(a)
throw A.c(A.jd(a,b))},
jd(a,b){var s,r="index"
if(!A.ls(b))return new A.aP(!0,b,r,null)
s=A.a(J.bv(a))
if(b<0||b>=s)return A.h7(b,s,a,r)
return new A.d1(null,null,!0,b,r,"Value not in range")},
oe(a){return new A.aP(!0,a,null,null)},
dJ(a){return a},
c(a){return A.V(a,new Error())},
V(a,b){var s
if(a==null)a=new A.b8()
b.dartException=a
s=A.oN
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
oN(){return J.bV(this.dartException)},
l(a,b){throw A.V(a,b==null?new Error():b)},
bu(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.l(A.nD(a,b,c),s)},
nD(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.dd("'"+s+"': Cannot "+o+" "+l+k+n)},
A(a){throw A.c(A.aA(a))},
b9(a){var s,r,q,p,o,n
a=A.oG(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.d([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.i6(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
i7(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
kX(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jM(a,b){var s=b==null,r=s?null:b.method
return new A.eb(a,r,s?null:b.receiver)},
bU(a){var s
if(a==null)return new A.hp(a)
if(a instanceof A.cF){s=a.a
return A.bt(a,s==null?A.dG(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bt(a,a.dartException)
return A.od(a)},
bt(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
od(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.i.d7(r,16)&8191)===10)switch(q){case 438:return A.bt(a,A.jM(A.o(s)+" (Error "+q+")",null))
case 445:case 5007:A.o(s)
return A.bt(a,new A.cZ())}}if(a instanceof TypeError){p=$.lM()
o=$.lN()
n=$.lO()
m=$.lP()
l=$.lS()
k=$.lT()
j=$.lR()
$.lQ()
i=$.lV()
h=$.lU()
g=p.a0(s)
if(g!=null)return A.bt(a,A.jM(A.al(s),g))
else{g=o.a0(s)
if(g!=null){g.method="call"
return A.bt(a,A.jM(A.al(s),g))}else if(n.a0(s)!=null||m.a0(s)!=null||l.a0(s)!=null||k.a0(s)!=null||j.a0(s)!=null||m.a0(s)!=null||i.a0(s)!=null||h.a0(s)!=null){A.al(s)
return A.bt(a,new A.cZ())}}return A.bt(a,new A.eP(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.d9()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bt(a,new A.aP(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.d9()
return a},
cr(a){var s
if(a instanceof A.cF)return a.b
if(a==null)return new A.du(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.du(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
ju(a){if(a==null)return J.M(a)
if(typeof a=="object")return A.et(a)
return J.M(a)},
oq(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.D(0,a[s],a[r])}return b},
or(a,b){var s,r=a.length
for(s=0;s<r;++s)b.j(0,a[s])
return b},
nQ(a,b,c,d,e,f){t.Z.a(a)
switch(A.a(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.c(new A.il("Unsupported number of arguments for wrapped closure"))},
co(a,b){var s=a.$identity
if(!!s)return s
s=A.ol(a,b)
a.$identity=s
return s},
ol(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.nQ)},
m3(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.eI().constructor.prototype):Object.create(new A.bX(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.kw(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.m_(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.kw(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
m_(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.c("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.lY)}throw A.c("Error in functionType of tearoff")},
m0(a,b,c,d){var s=A.kv
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
kw(a,b,c,d){if(c)return A.m2(a,b,d)
return A.m0(b.length,d,a,b)},
m1(a,b,c,d){var s=A.kv,r=A.lZ
switch(b?-1:a){case 0:throw A.c(new A.ez("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
m2(a,b,c){var s,r
if($.kt==null)$.kt=A.ks("interceptor")
if($.ku==null)$.ku=A.ks("receiver")
s=b.length
r=A.m1(s,c,a,b)
return r},
kc(a){return A.m3(a)},
lY(a,b){return A.dz(v.typeUniverse,A.bS(a.a),b)},
kv(a){return a.a},
lZ(a){return a.b},
ks(a){var s,r,q,p=new A.bX("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.c(A.j("Field name "+a+" not found.",null))},
jg(a){return v.getIsolateTag(a)},
lH(){return v.G},
oC(a){var s,r,q,p,o,n=A.al($.lE.$1(a)),m=$.je[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jk[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bM($.lA.$2(a,n))
if(q!=null){m=$.je[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jk[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jt(s)
$.je[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.jk[n]=s
return s}if(p==="-"){o=A.jt(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.lF(a,s)
if(p==="*")throw A.c(A.kY(n))
if(v.leafTags[n]===true){o=A.jt(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.lF(a,s)},
lF(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.ki(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jt(a){return J.ki(a,!1,null,!!a.$iaq)},
oE(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jt(s)
else return J.ki(s,c,null,null)},
ow(){if(!0===$.kg)return
$.kg=!0
A.ox()},
ox(){var s,r,q,p,o,n,m,l
$.je=Object.create(null)
$.jk=Object.create(null)
A.ov()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.lG.$1(o)
if(n!=null){m=A.oE(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
ov(){var s,r,q,p,o,n,m=B.bc()
m=A.cn(B.bd,A.cn(B.be,A.cn(B.ap,A.cn(B.ap,A.cn(B.bf,A.cn(B.bg,A.cn(B.bh(B.ao),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.lE=new A.jh(p)
$.lA=new A.ji(o)
$.lG=new A.jj(n)},
cn(a,b){return a(b)||b},
om(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
oL(a,b,c){var s=a.indexOf(b,c)
return s>=0},
oG(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
ak:function ak(a,b){this.a=a
this.b=b},
dq:function dq(a,b){this.a=a
this.b=b},
dr:function dr(a,b){this.a=a
this.b=b},
cB:function cB(a,b){this.a=a
this.$ti=b},
cA:function cA(){},
O:function O(a,b,c){this.a=a
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
cC:function cC(){},
aQ:function aQ(a,b,c){this.a=a
this.b=b
this.$ti=c},
d7:function d7(){},
i6:function i6(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cZ:function cZ(){},
eb:function eb(a,b,c){this.a=a
this.b=b
this.c=c},
eP:function eP(a){this.a=a},
hp:function hp(a){this.a=a},
cF:function cF(a,b){this.a=a
this.b=b},
du:function du(a){this.a=a
this.b=null},
bf:function bf(){},
dR:function dR(){},
dS:function dS(){},
eL:function eL(){},
eI:function eI(){},
bX:function bX(a,b){this.a=a
this.b=b},
ez:function ez(a){this.a=a},
aZ:function aZ(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h9:function h9(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
b0:function b0(a,b){this.a=a
this.$ti=b},
cP:function cP(a,b,c,d){var _=this
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
cO:function cO(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
jh:function jh(a){this.a=a},
ji:function ji(a){this.a=a},
jj:function jj(a){this.a=a},
bd:function bd(){},
bq:function bq(){},
q(a){return a},
en(a){return new Uint8Array(A.q(a))},
bN(a,b,c){if(a>>>0!==a||a>=c)throw A.c(A.jd(b,a))},
c5:function c5(){},
cX:function cX(){},
ef:function ef(){},
a7:function a7(){},
cV:function cV(){},
cW:function cW(){},
cU:function cU(){},
eg:function eg(){},
eh:function eh(){},
ei:function ei(){},
ej:function ej(){},
ek:function ek(){},
el:function el(){},
cY:function cY(){},
em:function em(){},
dl:function dl(){},
dm:function dm(){},
dn:function dn(){},
dp:function dp(){},
jS(a,b){var s=b.c
return s==null?b.c=A.dx(a,"bz",[b.x]):s},
kT(a){var s=a.w
if(s===6||s===7)return A.kT(a.x)
return s===11||s===12},
mQ(a){return a.as},
bQ(a){return A.iH(v.typeUniverse,a,!1)},
bO(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bO(a1,s,a3,a4)
if(r===s)return a2
return A.lg(a1,r,!0)
case 7:s=a2.x
r=A.bO(a1,s,a3,a4)
if(r===s)return a2
return A.lf(a1,r,!0)
case 8:q=a2.y
p=A.cm(a1,q,a3,a4)
if(p===q)return a2
return A.dx(a1,a2.x,p)
case 9:o=a2.x
n=A.bO(a1,o,a3,a4)
m=a2.y
l=A.cm(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.k_(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.cm(a1,j,a3,a4)
if(i===j)return a2
return A.lh(a1,k,i)
case 11:h=a2.x
g=A.bO(a1,h,a3,a4)
f=a2.y
e=A.oa(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.le(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.cm(a1,d,a3,a4)
o=a2.x
n=A.bO(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.k0(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.c(A.dN("Attempted to substitute unexpected RTI kind "+a0))}},
cm(a,b,c,d){var s,r,q,p,o=b.length,n=A.iI(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bO(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
ob(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iI(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bO(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
oa(a,b,c,d){var s,r=b.a,q=A.cm(a,r,c,d),p=b.b,o=A.cm(a,p,c,d),n=b.c,m=A.ob(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.f7()
s.a=q
s.b=o
s.c=m
return s},
d(a,b){a[v.arrayRti]=b
return a},
kd(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.ou(s)
return a.$S()}return null},
oy(a,b){var s
if(A.kT(b))if(a instanceof A.bf){s=A.kd(a)
if(s!=null)return s}return A.bS(a)},
bS(a){if(a instanceof A.w)return A.u(a)
if(Array.isArray(a))return A.E(a)
return A.k5(J.bR(a))},
E(a){var s=a[v.arrayRti],r=t.r
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
u(a){var s=a.$ti
return s!=null?s:A.k5(a)},
k5(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.nM(a,s)},
nM(a,b){var s=a instanceof A.bf?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.nt(v.typeUniverse,s.name)
b.$ccache=r
return r},
ou(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iH(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
kf(a){return A.aV(A.u(a))},
ka(a){var s
if(a instanceof A.bd)return a.bJ()
s=a instanceof A.bf?A.kd(a):null
if(s!=null)return s
if(t.dm.b(a))return J.dL(a).a
if(Array.isArray(a))return A.E(a)
return A.bS(a)},
aV(a){var s=a.r
return s==null?a.r=new A.iG(a):s},
op(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.i(q,0)
s=A.dz(v.typeUniverse,A.ka(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.i(q,r)
s=A.lj(v.typeUniverse,s,A.ka(q[r]))}return A.dz(v.typeUniverse,s,a)},
aF(a){return A.aV(A.iH(v.typeUniverse,a,!1))},
nL(a){var s=this
s.b=A.o8(s)
return s.b(a)},
o8(a){var s,r,q,p,o
if(a===t.K)return A.nW
if(A.bT(a))return A.o_
s=a.w
if(s===6)return A.nJ
if(s===1)return A.lu
if(s===7)return A.nR
r=A.o7(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bT)){a.f="$i"+q
if(q==="x")return A.nU
if(a===t.m)return A.nT
return A.nZ}}else if(s===10){p=A.om(a.x,a.y)
o=p==null?A.lu:p
return o==null?A.dG(o):o}return A.nH},
o7(a){if(a.w===8){if(a===t.S)return A.ls
if(a===t.i||a===t.p)return A.nV
if(a===t.N)return A.nY
if(a===t.y)return A.k6}return null},
nK(a){var s=this,r=A.nG
if(A.bT(s))r=A.nz
else if(s===t.K)r=A.dG
else if(A.cs(s)){r=A.nI
if(s===t.h6)r=A.ny
else if(s===t.dk)r=A.bM
else if(s===t.fQ)r=A.nw
else if(s===t.cg)r=A.lm
else if(s===t.cD)r=A.nx
else if(s===t.bX)r=A.J}else if(s===t.S)r=A.a
else if(s===t.N)r=A.al
else if(s===t.y)r=A.iK
else if(s===t.p)r=A.aN
else if(s===t.i)r=A.iL
else if(s===t.m)r=A.p
s.a=r
return s.a(a)},
nH(a){var s=this
if(a==null)return A.cs(s)
return A.oB(v.typeUniverse,A.oy(a,s),s)},
nJ(a){if(a==null)return!0
return this.x.b(a)},
nZ(a){var s,r=this
if(a==null)return A.cs(r)
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bR(a)[s]},
nU(a){var s,r=this
if(a==null)return A.cs(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bR(a)[s]},
nT(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.w)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
lt(a){if(typeof a=="object"){if(a instanceof A.w)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
nG(a){var s=this
if(a==null){if(A.cs(s))return a}else if(s.b(a))return a
throw A.V(A.ln(a,s),new Error())},
nI(a){var s=this
if(a==null||s.b(a))return a
throw A.V(A.ln(a,s),new Error())},
ln(a,b){return new A.dv("TypeError: "+A.l8(a,A.ax(b,null)))},
l8(a,b){return A.fM(a)+": type '"+A.ax(A.ka(a),null)+"' is not a subtype of type '"+b+"'"},
aE(a,b){return new A.dv("TypeError: "+A.l8(a,b))},
nR(a){var s=this
return s.x.b(a)||A.jS(v.typeUniverse,s).b(a)},
nW(a){return a!=null},
dG(a){if(a!=null)return a
throw A.V(A.aE(a,"Object"),new Error())},
o_(a){return!0},
nz(a){return a},
lu(a){return!1},
k6(a){return!0===a||!1===a},
iK(a){if(!0===a)return!0
if(!1===a)return!1
throw A.V(A.aE(a,"bool"),new Error())},
nw(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.V(A.aE(a,"bool?"),new Error())},
iL(a){if(typeof a=="number")return a
throw A.V(A.aE(a,"double"),new Error())},
nx(a){if(typeof a=="number")return a
if(a==null)return a
throw A.V(A.aE(a,"double?"),new Error())},
ls(a){return typeof a=="number"&&Math.floor(a)===a},
a(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.V(A.aE(a,"int"),new Error())},
ny(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.V(A.aE(a,"int?"),new Error())},
nV(a){return typeof a=="number"},
aN(a){if(typeof a=="number")return a
throw A.V(A.aE(a,"num"),new Error())},
lm(a){if(typeof a=="number")return a
if(a==null)return a
throw A.V(A.aE(a,"num?"),new Error())},
nY(a){return typeof a=="string"},
al(a){if(typeof a=="string")return a
throw A.V(A.aE(a,"String"),new Error())},
bM(a){if(typeof a=="string")return a
if(a==null)return a
throw A.V(A.aE(a,"String?"),new Error())},
p(a){if(A.lt(a))return a
throw A.V(A.aE(a,"JSObject"),new Error())},
J(a){if(a==null)return a
if(A.lt(a))return a
throw A.V(A.aE(a,"JSObject?"),new Error())},
lx(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ax(a[q],b)
return s},
o2(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.lx(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ax(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
lp(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.d([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.b.j(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.i(a4,l)
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
if(l===8){p=A.oc(a.x)
o=a.y
return o.length>0?p+("<"+A.lx(o,b)+">"):p}if(l===10)return A.o2(a,b)
if(l===11)return A.lp(a,b,null)
if(l===12)return A.lp(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.i(b,n)
return b[n]}return"?"},
oc(a){var s=A.lI(a)
if(s!=null)return s
return"minified:"+a},
nu(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
nt(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iH(a,b,!1)
else if(typeof m=="number"){s=m
r=A.dy(a,5,"#")
q=A.iI(s)
for(p=0;p<s;++p)q[p]=r
o=A.dx(a,b,q)
n[b]=o
return o}else return m},
ns(a,b){return A.lk(a.tR,b)},
nr(a,b){return A.lk(a.eT,b)},
iH(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.li(a,null,b,!1)
r.set(b,s)
return s},
dz(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.li(a,b,c,!0)
q.set(c,r)
return r},
lj(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.k_(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
li(a,b,c,d){return A.nj(A.nd(a,b,c,d))},
bs(a,b){b.a=A.nK
b.b=A.nL
return b},
dy(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aJ(null,null)
s.w=b
s.as=c
r=A.bs(a,s)
a.eC.set(c,r)
return r},
lg(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.np(a,b,r,c)
a.eC.set(r,s)
return s},
np(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bT(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.cs(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.aJ(null,null)
q.w=6
q.x=b
q.as=c
return A.bs(a,q)},
lf(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.nn(a,b,r,c)
a.eC.set(r,s)
return s},
nn(a,b,c,d){var s,r
if(d){s=b.w
if(A.bT(b)||b===t.K)return b
else if(s===1)return A.dx(a,"bz",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.aJ(null,null)
r.w=7
r.x=b
r.as=c
return A.bs(a,r)},
nq(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aJ(null,null)
s.w=13
s.x=b
s.as=q
r=A.bs(a,s)
a.eC.set(q,r)
return r},
dw(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
nm(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
dx(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.dw(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.aJ(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bs(a,r)
a.eC.set(p,q)
return q},
k_(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.dw(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.aJ(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bs(a,o)
a.eC.set(q,n)
return n},
lh(a,b,c){var s,r,q="+"+(b+"("+A.dw(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aJ(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bs(a,s)
a.eC.set(q,r)
return r},
le(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.dw(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.dw(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.nm(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aJ(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bs(a,p)
a.eC.set(r,o)
return o},
k0(a,b,c,d){var s,r=b.as+("<"+A.dw(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.no(a,b,c,r,d)
a.eC.set(r,s)
return s},
no(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iI(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bO(a,b,r,0)
m=A.cm(a,c,r,0)
return A.k0(a,n,m,c!==m)}}l=new A.aJ(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bs(a,l)},
nd(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
nj(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.nf(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.lb(a,r,l,k,!1)
else if(q===46)r=A.lb(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bL(a.u,a.e,k.pop()))
break
case 94:k.push(A.nq(a.u,k.pop()))
break
case 35:k.push(A.dy(a.u,5,"#"))
break
case 64:k.push(A.dy(a.u,2,"@"))
break
case 126:k.push(A.dy(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.nh(a,k)
break
case 38:A.ng(a,k)
break
case 63:p=a.u
k.push(A.lg(p,A.bL(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.lf(p,A.bL(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.ne(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.lc(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.nk(a.u,a.e,o)
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
nf(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
lb(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.nu(s,o.x)[p]
if(n==null)A.l('No "'+p+'" in "'+A.mQ(o)+'"')
d.push(A.dz(s,o,n))}else d.push(p)
return m},
nh(a,b){var s,r=a.u,q=A.la(a,b),p=b.pop()
if(typeof p=="string")b.push(A.dx(r,p,q))
else{s=A.bL(r,a.e,p)
switch(s.w){case 11:b.push(A.k0(r,s,q,a.n))
break
default:b.push(A.k_(r,s,q))
break}}},
ne(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.la(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bL(p,a.e,o)
q=new A.f7()
q.a=s
q.b=n
q.c=m
b.push(A.le(p,r,q))
return
case-4:b.push(A.lh(p,b.pop(),s))
return
default:throw A.c(A.dN("Unexpected state under `()`: "+A.o(o)))}},
ng(a,b){var s=b.pop()
if(0===s){b.push(A.dy(a.u,1,"0&"))
return}if(1===s){b.push(A.dy(a.u,4,"1&"))
return}throw A.c(A.dN("Unexpected extended operation "+A.o(s)))},
la(a,b){var s=b.splice(a.p)
A.lc(a.u,a.e,s)
a.p=b.pop()
return s},
bL(a,b,c){if(typeof c=="string")return A.dx(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.ni(a,b,c)}else return c},
lc(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bL(a,b,c[s])},
nk(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bL(a,b,c[s])},
ni(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.c(A.dN("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.c(A.dN("Bad index "+c+" for "+b.i(0)))},
oB(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.X(a,b,null,c,null)
r.set(c,s)}return s},
X(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bT(d))return!0
s=b.w
if(s===4)return!0
if(A.bT(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.X(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.X(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.X(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.X(a,b.x,c,d,e))return!1
return A.X(a,A.jS(a,b),c,d,e)}if(s===6)return A.X(a,p,c,d,e)&&A.X(a,b.x,c,d,e)
if(q===7){if(A.X(a,b,c,d.x,e))return!0
return A.X(a,b,c,A.jS(a,d),e)}if(q===6)return A.X(a,b,c,p,e)||A.X(a,b,c,d.x,e)
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
if(!A.X(a,j,c,i,e)||!A.X(a,i,e,j,c))return!1}return A.lr(a,b.x,c,d.x,e)}if(q===11){if(b===t.E)return!0
if(p)return!1
return A.lr(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.nS(a,b,c,d,e)}if(o&&q===10)return A.nX(a,b,c,d,e)
return!1},
lr(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
nS(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.dz(a,b,r[o])
return A.ll(a,p,null,c,d.y,e)}return A.ll(a,b.y,null,c,d.y,e)},
ll(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.X(a,b[s],d,e[s],f))return!1
return!0},
nX(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.X(a,r[s],c,q[s],e))return!1
return!0},
cs(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.bT(a))if(s!==6)r=s===7&&A.cs(a.x)
return r},
bT(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
lk(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iI(a){return a>0?new Array(a):v.typeUniverse.sEA},
aJ:function aJ(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
f7:function f7(){this.c=this.b=this.a=null},
iG:function iG(a){this.a=a},
f5:function f5(){},
dv:function dv(a){this.a=a},
n8(){var s,r,q
if(self.scheduleImmediate!=null)return A.of()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.co(new A.ih(s),1)).observe(r,{childList:true})
return new A.ig(s,r,q)}else if(self.setImmediate!=null)return A.og()
return A.oh()},
n9(a){self.scheduleImmediate(A.co(new A.ii(t.M.a(a)),0))},
na(a){self.setImmediate(A.co(new A.ij(t.M.a(a)),0))},
nb(a){t.M.a(a)
A.nl(0,a)},
nl(a,b){var s=new A.iE()
s.cw(a,b)
return s},
k8(a){return new A.eW(new A.U($.L,a.h("U<0>")),a.h("eW<0>"))},
k4(a,b){a.$2(0,null)
b.b=!0
return b.a},
k1(a,b){A.nA(a,b)},
k3(a,b){b.b0(a)},
k2(a,b){b.b1(A.bU(a),A.cr(a))},
nA(a,b){var s,r,q=new A.iM(b),p=new A.iN(b)
if(a instanceof A.U)a.bV(q,p,t.A)
else{s=t.A
if(a instanceof A.U)a.cg(q,p,s)
else{r=new A.U($.L,t.c)
r.a=8
r.c=a
r.bV(q,p,s)}}},
kb(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.L.cd(new A.j7(s),t.H,t.S,t.A)},
ld(a,b,c){return 0},
jG(a){var s
if(t.Q.b(a)){s=a.gaz()
if(s!=null)return s}return B.J},
nN(a,b){if($.L===B.q)return null
return null},
nO(a,b){if($.L!==B.q)A.nN(a,b)
if(b==null)if(t.Q.b(a)){b=a.gaz()
if(b==null){A.kS(a,B.J)
b=B.J}}else b=B.J
else if(t.Q.b(a))A.kS(a,b)
return new A.az(a,b)},
jV(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.mS()
b.aQ(new A.az(new A.aP(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bM(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aC()
b.aA(o.a)
A.ci(b,p)
return}b.a^=2
A.fw(null,null,b.b,t.M.a(new A.ir(o,b)))},
ci(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.k9(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.ci(d.a,c)
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
A.k9(j.a,j.b)
return}g=$.L
if(g!==h)$.L=h
else g=null
c=c.c
if((c&15)===8)new A.iv(q,d,n).$0()
else if(o){if((c&1)!==0)new A.iu(q,j).$0()}else if((c&2)!==0)new A.it(d,q).$0()
if(g!=null)$.L=g
c=q.c
if(c instanceof A.U){p=q.a.$ti
p=p.h("bz<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aD(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.jV(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aD(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
o3(a,b){var s
if(t.d.b(a))return b.cd(a,t.A,t.K,t.l)
s=t.x
if(s.b(a))return s.a(a)
throw A.c(A.aG(a,"onError",u.c))},
o1(){var s,r
for(s=$.cl;s!=null;s=$.cl){$.dI=null
r=s.b
$.cl=r
if(r==null)$.dH=null
s.a.$0()}},
o9(){$.k7=!0
try{A.o1()}finally{$.dI=null
$.k7=!1
if($.cl!=null)$.kq().$1(A.lB())}},
ly(a){var s=new A.eX(a),r=$.dH
if(r==null){$.cl=$.dH=s
if(!$.k7)$.kq().$1(A.lB())}else $.dH=r.b=s},
o6(a){var s,r,q,p=$.cl
if(p==null){A.ly(a)
$.dI=$.dH
return}s=new A.eX(a)
r=$.dI
if(r==null){s.b=p
$.cl=$.dI=s}else{q=r.b
s.b=q
$.dI=r.b=s
if(q==null)$.dH=s}},
p_(a,b){A.bP(a,"stream",t.K)
return new A.fm(b.h("fm<0>"))},
k9(a,b){A.o6(new A.j6(a,b))},
lw(a,b,c,d,e){var s,r=$.L
if(r===c)return d.$0()
$.L=c
s=r
try{r=d.$0()
return r}finally{$.L=s}},
o5(a,b,c,d,e,f,g){var s,r=$.L
if(r===c)return d.$1(e)
$.L=c
s=r
try{r=d.$1(e)
return r}finally{$.L=s}},
o4(a,b,c,d,e,f,g,h,i){var s,r=$.L
if(r===c)return d.$2(e,f)
$.L=c
s=r
try{r=d.$2(e,f)
return r}finally{$.L=s}},
fw(a,b,c,d){t.M.a(d)
if(B.q!==c){d=c.dj(d)
d=d}A.ly(d)},
ih:function ih(a){this.a=a},
ig:function ig(a,b,c){this.a=a
this.b=b
this.c=c},
ii:function ii(a){this.a=a},
ij:function ij(a){this.a=a},
iE:function iE(){},
iF:function iF(a,b){this.a=a
this.b=b},
eW:function eW(a,b){this.a=a
this.b=!1
this.$ti=b},
iM:function iM(a){this.a=a},
iN:function iN(a){this.a=a},
j7:function j7(a){this.a=a},
aM:function aM(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aU:function aU(a,b){this.a=a
this.$ti=b},
az:function az(a,b){this.a=a
this.b=b},
f0:function f0(){},
df:function df(a,b){this.a=a
this.$ti=b},
bH:function bH(a,b,c,d,e){var _=this
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
io:function io(a,b){this.a=a
this.b=b},
is:function is(a,b){this.a=a
this.b=b},
ir:function ir(a,b){this.a=a
this.b=b},
iq:function iq(a,b){this.a=a
this.b=b},
ip:function ip(a,b){this.a=a
this.b=b},
iv:function iv(a,b,c){this.a=a
this.b=b
this.c=c},
iw:function iw(a,b){this.a=a
this.b=b},
ix:function ix(a){this.a=a},
iu:function iu(a,b){this.a=a
this.b=b},
it:function it(a,b){this.a=a
this.b=b},
eX:function eX(a){this.a=a
this.b=null},
fm:function fm(a){this.$ti=a},
dE:function dE(){},
fg:function fg(){},
iB:function iB(a,b){this.a=a
this.b=b},
j6:function j6(a,b){this.a=a
this.b=b},
l9(a,b){var s=a[b]
return s===a?null:s},
jX(a,b,c){if(c==null)a[b]=a
else a[b]=c},
jW(){var s=Object.create(null)
A.jX(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
ml(a,b){return new A.aZ(a.h("@<0>").N(b).h("aZ<1,2>"))},
kG(a,b,c){return b.h("@<0>").N(c).h("kF<1,2>").a(A.oq(a,new A.aZ(b.h("@<0>").N(c).h("aZ<1,2>"))))},
b3(a,b){return new A.aZ(a.h("@<0>").N(b).h("aZ<1,2>"))},
jN(a){return new A.aL(a.h("aL<0>"))},
an(a){return new A.aL(a.h("aL<0>"))},
cQ(a,b){return b.h("kH<0>").a(A.or(a,new A.aL(b.h("aL<0>"))))},
jZ(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
jY(a,b,c){var s=new A.bK(a,b,c.h("bK<0>"))
s.c=a.e
return s},
mm(a,b,c){var s=A.ml(b,c)
a.ar(0,new A.ha(s,b,c))
return s},
mn(a,b){var s,r,q=A.jN(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r)q.j(0,b.a(a[r]))
return q},
jO(a,b){var s=A.jN(b)
s.C(0,a)
return s},
he(a){var s,r
if(A.kh(a))return"{...}"
s=new A.eJ("")
try{r={}
B.b.j($.ay,a)
s.a+="{"
r.a=!0
a.ar(0,new A.hf(r,s))
s.a+="}"}finally{if(0>=$.ay.length)return A.i($.ay,-1)
$.ay.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
nv(){throw A.c(A.cg("Cannot change an unmodifiable set"))},
dh:function dh(){},
dk:function dk(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
di:function di(a,b){this.a=a
this.$ti=b},
dj:function dj(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aL:function aL(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fa:function fa(a){this.a=a
this.c=this.b=null},
bK:function bK(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
ha:function ha(a,b,c){this.a=a
this.b=b
this.c=c},
D:function D(){},
bB:function bB(){},
hf:function hf(a,b){this.a=a
this.b=b},
dA:function dA(){},
c4:function c4(){},
db:function db(){},
b7:function b7(){},
ds:function ds(){},
fp:function fp(){},
dc:function dc(a,b){this.a=a
this.$ti=b},
ck:function ck(){},
dB:function dB(){},
oz(a){var s=A.mE(a,null)
if(s!=null)return s
throw A.c(new A.fT(a))},
m8(a,b){a=A.V(a,new Error())
if(a==null)a=A.dG(a)
a.stack=b.i(0)
throw a},
hb(a,b,c,d){var s,r=c?J.kB(a,d):J.kA(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
hc(a,b,c){var s,r=A.d([],c.h("t<0>"))
for(s=J.a3(a);s.k();)B.b.j(r,c.a(s.gm()))
if(b)return r
r.$flags=1
return r},
aC(a,b){var s,r
if(Array.isArray(a))return A.d(a.slice(0),b.h("t<0>"))
s=A.d([],b.h("t<0>"))
for(r=J.a3(a);r.k();)B.b.j(s,r.gm())
return s},
hd(a,b){var s=A.hc(a,!1,b)
s.$flags=3
return s},
kV(a,b,c){var s=J.a3(b)
if(!s.k())return a
if(c.length===0){do a+=A.o(s.gm())
while(s.k())}else{a+=A.o(s.gm())
while(s.k())a=a+c+A.o(s.gm())}return a},
mS(){return A.cr(new Error())},
m5(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
ky(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
dU(a){if(a>=10)return""+a
return"0"+a},
fM(a){if(typeof a=="number"||A.k6(a)||a==null)return J.bV(a)
if(typeof a=="string")return JSON.stringify(a)
return A.kR(a)},
m9(a,b){A.bP(a,"error",t.K)
A.bP(b,"stackTrace",t.l)
A.m8(a,b)},
dN(a){return new A.dM(a)},
j(a,b){return new A.aP(!1,null,b,a)},
aG(a,b,c){return new A.aP(!0,a,b,c)},
aS(a,b,c,d,e){return new A.d1(b,c,!0,a,d,"Invalid value")},
mJ(a,b,c){if(0>a||a>c)throw A.c(A.aS(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.c(A.aS(b,a,c,"end",null))
return b}return c},
hK(a,b){if(a<0)throw A.c(A.aS(a,0,null,b,null))
return a},
h7(a,b,c,d){return new A.e6(b,!0,a,d,"Index out of range")},
cg(a){return new A.dd(a)},
kY(a){return new A.eO(a)},
m(a){return new A.ce(a)},
aA(a){return new A.dT(a)},
mg(a,b,c){var s,r
if(A.kh(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.d([],t.s)
B.b.j($.ay,a)
try{A.o0(a,s)}finally{if(0>=$.ay.length)return A.i($.ay,-1)
$.ay.pop()}r=A.kV(b,t.hf.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jJ(a,b,c){var s,r
if(A.kh(a))return b+"..."+c
s=new A.eJ(b)
B.b.j($.ay,a)
try{r=s
r.a=A.kV(r.a,a,", ")}finally{if(0>=$.ay.length)return A.i($.ay,-1)
$.ay.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
o0(a,b){var s,r,q,p,o,n,m,l=a.gu(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.o(l.gm())
B.b.j(b,s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
if(0>=b.length)return A.i(b,-1)
r=b.pop()
if(0>=b.length)return A.i(b,-1)
q=b.pop()}else{p=l.gm();++j
if(!l.k()){if(j<=4){B.b.j(b,A.o(p))
return}r=A.o(p)
if(0>=b.length)return A.i(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gm();++j
for(;l.k();p=o,o=n){n=l.gm();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.i(b,-1)
k-=b.pop().length+2;--j}B.b.j(b,"...")
return}}q=A.o(p)
r=A.o(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.i(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.j(b,m)
B.b.j(b,q)
B.b.j(b,r)},
c6(a,b,c,d,e,f){var s
if(B.h===c){s=J.M(a)
b=J.M(b)
return A.eK(A.a_(A.a_($.dK(),s),b))}if(B.h===d){s=J.M(a)
b=J.M(b)
c=J.M(c)
return A.eK(A.a_(A.a_(A.a_($.dK(),s),b),c))}if(B.h===e){s=J.M(a)
b=J.M(b)
c=J.M(c)
d=J.M(d)
return A.eK(A.a_(A.a_(A.a_(A.a_($.dK(),s),b),c),d))}if(B.h===f){s=J.M(a)
b=J.M(b)
c=J.M(c)
d=J.M(d)
e=J.M(e)
return A.eK(A.a_(A.a_(A.a_(A.a_(A.a_($.dK(),s),b),c),d),e))}s=J.M(a)
b=J.M(b)
c=J.M(c)
d=J.M(d)
e=J.M(e)
f=J.M(f)
f=A.eK(A.a_(A.a_(A.a_(A.a_(A.a_(A.a_($.dK(),s),b),c),d),e),f))
return f},
bw:function bw(a,b,c){this.a=a
this.b=b
this.c=c},
ik:function ik(){},
K:function K(){},
dM:function dM(a){this.a=a},
b8:function b8(){},
aP:function aP(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
d1:function d1(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
e6:function e6(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
dd:function dd(a){this.a=a},
eO:function eO(a){this.a=a},
ce:function ce(a){this.a=a},
dT:function dT(a){this.a=a},
d9:function d9(){},
il:function il(a){this.a=a},
fT:function fT(a){this.a=a},
k:function k(){},
aa:function aa(a,b,c){this.a=a
this.b=b
this.$ti=c},
Y:function Y(){},
w:function w(){},
fn:function fn(){},
eJ:function eJ(a){this.a=a},
ho:function ho(a){this.a=a},
a2(a){var s
if(typeof a=="function")throw A.c(A.j("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.nB,a)
s[$.kk()]=a
return s},
nB(a,b,c){t.Z.a(a)
if(A.a(c)>=1)return a.$1(b)
return a.$0()},
lD(a,b,c){return c.a(a[b])},
lq(a,b){return a[b]},
ae(a,b,c,d){return d.a(a[b].apply(a,c))},
oF(a,b){var s=new A.U($.L,b.h("U<0>")),r=new A.df(s,b.h("df<0>"))
a.then(A.co(new A.jv(r,b),1),A.co(new A.jw(r),1))
return s},
lv(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
cp(a){if(A.lv(a))return a
return new A.jb(new A.dk(t.hg)).$1(a)},
jv:function jv(a,b){this.a=a
this.b=b},
jw:function jw(a){this.a=a},
jb:function jb(a){this.a=a},
hN:function hN(a){this.z=a},
c9:function c9(a,b){this.a=a
this.b=b},
at:function at(a,b){this.a=a
this.b=b},
fF:function fF(a,b){this.a=a
this.b=b},
fG:function fG(){this.a=null
this.d=0},
er(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){return new A.eq(f,b,l,d,a4,g,i,o,n,m,j,e,c,a,q,h,r,a3,a2,a1,s,a0,!1,p)},
kP(){return A.er(0,0.3,0,0,0,1.15,0.08,8,0,1,!1,0.75,0,0,0,B.ai,0,0,0,0,0,0,0,0.22)},
cf:function cf(a,b){this.a=a
this.b=b},
eq:function eq(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){var _=this
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
fD(a,b,c,d,e,f,g){var s,r,q,p
if(!d.gF(0)||d.ga_()<1e-12)throw A.c(A.j("CameraView.look requires a finite, nonzero forward: "+d.i(0),null))
if(!isFinite(e)||e<=0||e>=3.141592653589793)throw A.c(A.j("CameraView.look requires 0 < fovYRadians < pi: "+e,null))
s=d.gE()
if(g.a1(s).ga_()<1e-12)throw A.c(A.j("CameraView.look requires up ("+g.i(0)+") not parallel to forward ("+d.i(0)+")",null))
r=A.kJ(b,s,g)
q=A.kK(a,c,e,f)
p=new A.cv(r,q,q.t(0,r),b,s,f,c,a)
p.A()
return p},
cv:function cv(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.z=_.y=_.x=$},
eF:function eF(){},
e0:function e0(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2){var _=this
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
fV:function fV(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=f},
fW:function fW(){this.b=this.a=0},
bg(a,b){return new A.h6(a,b)},
b6:function b6(){},
as:function as(a,b,c){this.a=a
this.b=b
this.c=c},
av:function av(a,b,c){this.a=a
this.b=b
this.c=c},
aR:function aR(a,b,c){this.a=a
this.b=b
this.c=c},
eo:function eo(a,b,c){this.a=a
this.b=b
this.c=c},
bh:function bh(a,b,c){this.a=a
this.b=b
this.c=c},
c2:function c2(a,b){this.a=a
this.b=b},
h6:function h6(a,b){this.a=a
this.b=b},
j8(a,b,c,d){return A.oj(a,b,c,d)},
oj(a,b,a0,a1){var s=0,r=A.k8(t.fW),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c
var $async$j8=A.kb(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:d=b.length
if(d===0)throw A.c(A.j("bootstrapRenderer requires a non-empty profile ladder",null))
a1.A()
n=A.d([],t.eT)
m=0
i=d-1
h=t.eD
case 3:g=m
if(typeof g!=="number"){q=g.aM()
s=1
break}if(!(g<d)){s=4
break}l=B.b.q(b,m)
k=a.$1(l)
if(k.a!==l)throw A.c(A.j("configurationFor("+l.a.b+") returned a configuration for "+k.a.a.b+". The mapping must be total and faithful, or the renderer runs a graph the host did not choose.",null))
p=6
s=9
return A.k1(a0.dB(k,a1),$async$j8)
case 9:J.fy(n,new A.c8(l,null))
f=A.hc(n,!1,h)
f.$flags=3
g=new A.dP()
q=g
s=1
break
p=2
s=8
break
case 6:p=5
c=o.pop()
j=A.bU(c)
J.fy(n,new A.c8(l,j))
if(J.aX(m,i))throw c
s=8
break
case 5:s=2
break
case 8:g=m
if(typeof g!=="number"){q=g.L()
s=1
break}m=g+1
s=3
break
case 4:throw A.c(A.m("bootstrapRenderer exhausted its ladder without a result"))
case 1:return A.k3(q,r)
case 2:return A.k2(o.at(-1),r)}})
return A.k4($async$j8,r)},
oo(a){var s,r,q=B.b.bc(B.a1,new A.jc(a))
if(q>=0)return A.hd(B.b.cr(B.a1,q),t.W)
s=t.W
r=A.cQ([a],s)
r.C(0,B.a1)
return A.hd(r,s)},
c8:function c8(a,b){this.a=a
this.b=b},
dP:function dP(){},
jc:function jc(a){this.a=a},
oH(a,b,c,d){var s,r,q,p,o,n,m=A.d([],t.cw)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.b.j(m,new A.dq(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.b.af(m,new A.jx())
s=A.d([],t.w)
for(r=A.i1(m,0,A.bP(b,"count",t.S),t.fk),q=r.$ti,r=new A.ai(r,r.gp(0),q.h("ai<Q.E>")),q=q.h("Q.E");r.k();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
T:function T(a,b,c){this.a=a
this.b=b
this.c=c},
dX:function dX(){},
bn:function bn(a,b,c,d){var _=this
_.b=a
_.c=b
_.d=c
_.e=d},
ap:function ap(){},
jx:function jx(){},
b5(a,b,c,d,e,f,g,h){return new A.bC(c,h,g,f,e,d,b,a)},
jP(a,b,c){return A.b5(0.2,0.3,b,0,c,a.c,a.b,a.a)},
kL(a,b,c,d){return A.b5(0.08,a,c,0,d,b.c,b.b,b.a)},
ec(a,b){if(!isFinite(b)||b<0||b>1)throw A.c(A.j("MaterialDefinition."+a+" must be in [0, 1]: "+A.o(b),null))},
fA:function fA(a,b){this.a=a
this.b=b},
ed:function ed(a,b){this.a=a
this.b=b},
bC:function bC(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.d=b
_.e=c
_.f=d
_.at=e
_.ax=f
_.ch=g
_.CW=h},
mp(a){A:{break A}return a},
bb:function bb(a,b){this.a=a
this.b=b},
ac:function ac(a,b,c){this.a=a
this.b=b
this.c=c},
i8:function i8(){},
i9:function i9(){},
bl:function bl(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hi:function hi(){},
hj:function hj(){},
hk:function hk(){},
fK:function fK(){},
hr(a){var s,r,q="volumetric",p=t.N,o=A.cQ(["sceneColor","present"],p),n=a.a.b
if(n.n(0,"shadows"))o.C(0,A.cQ(["shadowMap","sceneDepth"],p))
if(n.n(0,q)){o.j(0,"volumetricLight")
o.j(0,"sceneColor#"+(a.d>1?2:1))}if(n.n(0,"ssao"))o.C(0,A.cQ(["ssaoRaw","ssaoBlurred"],p))
if(n.n(0,"bloom")){if(a.d>1)s=n.n(0,q)?3:2
else s=n.n(0,q)?2:1
o.C(0,A.cQ(["bloomBlurH","bloomBlurV","sceneColor#"+s],p))}if(a.d>1)o.j(0,"sceneColor#1")
if(n.n(0,"dof"))o.C(0,A.cQ(["dofBlurH","dofBlurV","dofOutput"],p))
if(n.n(0,"grade"))o.j(0,"gradeOutput")
if(n.n(0,"ps1"))o.j(0,"ps1Output")
r=n.n(0,"vhs")
if(r)o.j(0,"vhsOutput")
return new A.hq(new A.dc(A.jO(o,p),t.am),r)},
hq:function hq(a,b){this.a=a
this.b=b},
hs:function hs(){},
hH:function hH(a){this.b=a},
ey:function ey(){this.a=null
this.c=0
this.d=!1},
cE:function cE(a,b){this.a=a
this.b=b},
fC:function fC(a,b){this.a=a
this.b=b},
cb:function cb(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=i},
kW(a,b,c,d,e){var s,r
if(!isFinite(c)||c<=0)throw A.c(A.j("SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: "+A.o(c),null))
if(!isFinite(d)||d<=0)throw A.c(A.j("SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: "+A.o(d),null))
s=c>d?d:c
r=new A.i2(b,a,B.k.cf(b*s),B.k.cf(a*s),s,!0)
r.A()
return r},
i2:function i2(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fE:function fE(a,b){this.a=a
this.b=b},
d3:function d3(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
ca:function ca(a,b){this.a=a
this.b=b},
S:function S(a,b,c){this.a=a
this.b=b
this.d=c},
fX:function fX(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f},
mo(){return new A.ee(new A.aT(new A.hh(),A.d([],t.ha),A.d([],t.t),t.ex))},
ee:function ee(a){this.a=a},
hh:function hh(){},
lz(a){var s=4
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
case 3:s=A.l(A.cg("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
nC(a,b,c){var s,r,q
for(s=0,r=0;r<7;++r){q=B.C[r]
if(A.lz(q.a)===b)s+=q.c}return s},
mq(a){return new A.hl(a,new A.aT(new A.hm(),A.d([],t.c9),A.d([],t.t),t.cE),A.b3(t.S,t.bw))},
kM(a){var s
A:{s=a.byteLength
break A}return s},
eQ:function eQ(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hl:function hl(a,b,c){this.a=a
this.b=b
this.c=c},
hm:function hm(){},
hn:function hn(){},
mT(a){var s=new A.eM(a,new A.aT(new A.i3(),A.d([],t.fq),A.d([],t.t),t.g2),A.b3(t.S,t.j))
s.d=s.Y($.kp())
s.e=s.Y($.km())
s.f=s.Y($.kn())
s.r=s.Y($.kl())
s.w=s.Y($.ko())
return s},
eM:function eM(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
i3:function i3(){},
i5:function i5(){},
i4:function i4(){},
oI(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b.gF(0)
if(!i)throw A.c(A.j("invalid volumetric source selection inputs",null))
s=A.an(t.N)
r=A.d([],t.gg)
for(q=0;!1;++q){p=c[q]
p.A()
if(!s.j(0,p.gB()))throw A.c(A.j("duplicate volumetric source id: "+A.o(p.gB()),null))
o=p.gbi().a8(0,b).length
i=p.gei()
n=A.mX(p.ged(),o,i)
i=p.gc3().gel()
m=p.gc3().gem()
l=p.gc3().gen()
l=Math.max(A.dJ(m),A.dJ(l))
k=Math.max(A.dJ(i),l)
B.b.j(r,new A.dr(p.geg().t(0,k).t(0,n),p))}B.b.af(r,new A.jy())
i=A.d([],t.q)
for(m=A.i1(r,0,A.bP(a,"count",t.S),t.eS),l=m.$ti,m=new A.ai(m,m.gp(0),l.h("ai<Q.E>")),l=l.h("Q.E");m.k();){j=m.d
i.push((j==null?l.a(j):j).b)}return i},
mX(a,b,c){var s,r,q,p,o,n
for(s=[new A.ak("distance",b),new A.ak("referenceDistance",c),new A.ak("cutoffDistance",a)],r=0;r<3;++r){q=s[r]
p=q.b
if(!isFinite(p))A.l(A.j(q.a+" must be finite: "+A.o(p),null))}if(b.aM(0,0)||c.cn(0,0)||a.cn(0,0))throw A.c(A.j("invalid inverse-square attenuation inputs",null))
if(b.cm(0,a))return 0
s=c.t(0,c)
q=c.t(0,c)
o=b.t(0,b)
n=s.cl(0,Math.max(A.dJ(q),A.dJ(o)))
o=b.cl(0,a)
A.dJ(o)
return n.t(0,1-Math.pow(o,4)).a5(0,0,1).ej(0)},
jy:function jy(){},
bx:function bx(a,b,c,d){var _=this
_.a=a
_.c=_.b=0
_.d=b
_.y=c
_.z=d},
kN(a,b){return new A.bm(b,a,a,b)},
bm:function bm(a,b,c,d){var _=this
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
oi(a){var s,r,q,p,o=A.d([],t.gk)
for(s=a.length,r=t.h,q=0;q<a.length;a.length===s||(0,A.A)(a),++q){p=a[q]
p.gl()
B.b.j(o,new A.bA(p,A.d([p],r)))
continue}return o},
bA:function bA(a,b){this.a=a
this.b=b},
dZ:function dZ(a){this.a=a},
fP:function fP(){},
fQ:function fQ(a){this.a=a},
fN:function fN(a){this.a=a},
fO:function fO(a){this.a=a},
e_:function e_(a,b){this.a=a
this.b=b},
c0:function c0(a,b){this.a=a
this.b=b},
e1:function e1(a,b){this.a=a
this.b=b
this.c=0},
nc(){return new A.cj()},
fU:function fU(a){this.a=a
this.b=null},
cj:function cj(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
jQ(){return!0},
F:function F(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
ht:function ht(){},
hu:function hu(){},
aI:function aI(a,b){this.a=a
this.b=b},
a9:function a9(a,b,c){this.a=a
this.b=b
this.c=c},
ew:function ew(a,b){this.a=a
this.b=b},
aY:function aY(a,b){this.a=a
this.b=b},
N:function N(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
d5:function d5(a,b){this.a=a
this.b=b},
n:function n(a,b){this.a=a
this.b=b},
cz:function cz(a){this.b=a},
hJ:function hJ(a,b){var _=this
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
hO:function hO(){},
Z:function Z(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.r=f},
hQ:function hQ(a,b){this.a=a
this.b=b},
hV:function hV(){},
hU:function hU(){},
hT:function hT(){},
hS:function hS(a){this.a=a},
hR:function hR(a,b,c){this.a=a
this.b=b
this.c=c},
hP:function hP(a,b){this.a=a
this.b=b},
mO(a){return new A.d2(a,new A.aT(new A.hW(),A.d([],t.aO),A.d([],t.t),t.b0))},
f9:function f9(a,b,c){this.a=a
this.b=b
this.c=c},
d2:function d2(a,b){this.a=a
this.b=b},
hW:function hW(){},
lo(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.nE(a,r,s,a.x.gm().a.b.a).b},
nE(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.j2(a),j=new A.j3(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.n(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.ok(b,h,B.W,i,s.gdR(),new A.iO(j),new A.iP(j),new A.iQ(a),new A.iV(a),new A.iW(a),new A.iX(j),new A.iY(j),s.gdT(),new A.iZ(a),s.gdX(),r.gdV(),k,s.gdZ(),s.ge0(),new A.j_(j,c),new A.j0(j),new A.j1(j),new A.iR(j),new A.iS(j),new A.iT(a),new A.iU(j),e,f,g,512)}else{p=new A.N(l,B.m,g,f,e,0)
o=new A.N(l,B.m,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.cT(h,p,o):null
k=A.d([new A.eV(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nout vec4 oColor;\nvoid main(){\n  vec3 n=normalize(vNormal);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+\n    vec3(ndotl)*uDirectLightScale,0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.f)
if(n!=null)k.push(n)
k.push(new A.d0(b,u.l,u.b,h,i,B.W))
q=new A.dZ(k)}a.r.toString
m=q.dl(B.a8,new A.hO(),!1,new A.fd())
k=m.a.b
if(k.length!==0)throw A.c(A.m("safe renderer graph is invalid: "+A.o(k)))
return new A.iC(q,m)},
nF(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.c(A.m("renderer graph is not initialized"))
s=A.aC(b7.gc9(),t.Y)
for(r=0;r<b9.length;++r){q=b9[r]
p=b6.w.a.b
o=p.$ti
n=o.c.a(q.a)
p.ag(n)
p=p.b
n=n.a
if(!(n>=0&&n<p.length))return A.i(p,n)
n=p[n].c
p=(n==null?o.y[1].a(n):n).d
o=q.c.a2()
p=p.gaG()
n=A.E(p)
B.b.j(s,new A.fo(new A.bh((r|1073741824)>>>0,0,"transient"),q,A.fz(new A.a6(p,n.h("f(1)").a(o.gaK()),n.h("a6<1,f>")))))}p=b8.a
m=A.on(A.mb(p.c),s,b8.d)
for(o=s.length,l=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gl().a
j=b6.w.a
i=n.a
h=j.c.q(0,i)
if(h==null)A.l(A.bg(B.P,n))
j=j.b
g=j.$ti
j.ag(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.i(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
l+=B.i.a4(n>0?n:h.e,3)}for(s=m.a,o=s.length,f=0,k=0;k<s.length;s.length===o||(0,A.A)(s),++k){n=s[k].gl().a
j=b6.w.a
i=n.a
h=j.c.q(0,i)
if(h==null)A.l(A.bg(B.P,n))
j=j.b
g=j.$ti
j.ag(g.c.a(n))
j=j.b
if(!(i>=0&&i<j.length))return A.i(j,i)
i=j[i].c
if(i==null)g.y[1].a(i)
n=h.d
f+=B.i.a4(n>0?n:h.e,3)}o=t.N
n=A.b3(o,t.a8)
e=new A.fU(n)
e.di("cull")
j=l-f
d=e.b
if(d==null)A.l(A.m("cull recorded outside an active frame"))
if(j<0)A.l(A.j("cull totals must be non-negative",null))
c=n.q(0,d)
c.c+=j
c.e+=m.b.b
b=A.d([],t.c1)
a=A.d([],t.aM)
for(i=s.length,g=t.k,a0=p.a,a1=t.b,k=0;k<s.length;s.length===i||(0,A.A)(s),++k){a2=s[k]
if(a2.gl().e===B.X)B.b.j(a,new A.W(new A.am(a0.aL(a2.gl().c.a).c,a2.gB().a),a2,a1))
else B.b.j(b,new A.W(new A.ao(B.cO,a2.gl().b,a2.gl().a,a2.gB().a),a2,g))}a3=new A.f6(A.oi(A.oK(b)),A.oJ(a),p,b8.b,b8.c)
a4=new A.dW(b6.a,e)
for(s=b4.b,p=s.length,i=t.do,k=0;k<s.length;s.length===p||(0,A.A)(s),++k){a5=s[k]
g=a5.gl().a
if(g.length===0)A.l(A.aG(g,"passId",null))
e.b=g
n.bj(g,A.lC())
a6=A.b3(o,i)
for(g=a5.gl().c,a0=g.length,a7=0;a7<g.length;g.length===a0||(0,A.A)(g),++a7){a8=g[a7].a
a9=b5.c
if(a9==null)A.l(A.m("GPU resource adapter is not initialized"))
a1=a8.f
b0=a8.a
b1=a1===0?b0:b0+"#"+a1
b2=a9.b.q(0,b1)
if(b2==null)A.l(A.m("resource is not in candidate: "+b1))
b3=new A.bY(b2)
a6.D(0,b0+"#"+a1,b3)
a6.bj(b0,new A.j4(b3))}a5.O(new A.dQ(a6,a4,new A.j5(b8,b6).$0(),a3))}return new A.im(e,m,j)},
ex:function ex(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.w=f
_.x=!1},
im:function im(a,b,c){this.a=a
this.b=b
this.c=c},
fo:function fo(a,b,c){this.a=a
this.b=b
this.c=c},
j2:function j2(a){this.a=a},
j3:function j3(a,b){this.a=a
this.b=b},
j1:function j1(a){this.a=a},
iV:function iV(a){this.a=a},
iW:function iW(a){this.a=a},
j0:function j0(a){this.a=a},
iQ:function iQ(a){this.a=a},
iS:function iS(a){this.a=a},
iR:function iR(a){this.a=a},
j_:function j_(a,b){this.a=a
this.b=b},
iO:function iO(a){this.a=a},
iP:function iP(a){this.a=a},
iX:function iX(a){this.a=a},
iY:function iY(a){this.a=a},
iZ:function iZ(a){this.a=a},
iU:function iU(a){this.a=a},
iT:function iT(a){this.a=a},
j4:function j4(a){this.a=a},
j5:function j5(a,b){this.a=a
this.b=b},
iC:function iC(a,b){this.a=a
this.b=b},
fd:function fd(){},
f6:function f6(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
eA:function eA(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.ax=_.at=_.as=_.Q=_.y=_.x=_.w=_.r=null
_.a$=f
_.b$=g},
hY:function hY(){},
hZ:function hZ(){},
i_:function i_(){},
fc:function fc(a){this.b=a},
iy:function iy(){},
fh:function fh(){},
eC:function eC(a,b){this.a=a
this.b=b},
oK(a){var s,r,q=A.aC(a,t.k)
B.b.af(q,new A.jC())
s=A.E(q)
r=s.h("a6<1,au>")
s=A.aC(new A.a6(q,s.h("au(1)").a(new A.jD()),r),r.h("Q.E"))
s.$flags=1
return s},
oJ(a){var s,r,q=A.aC(a,t.b)
B.b.af(q,new A.jA())
s=A.E(q)
r=s.h("a6<1,au>")
s=A.aC(new A.a6(q,s.h("au(1)").a(new A.jB()),r),r.h("Q.E"))
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
jC:function jC(){},
jD:function jD(){},
jA:function jA(){},
jB:function jB(){},
on(a,b,c){var s,r,q,p,o,n,m,l=A.d([],t.h)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.A)(b),++p){o=b[p];++r
if((o.gl().d&c)>>>0===0){++q
continue}n=o.gbp()
m=n.a
if(isFinite(m.a)&&isFinite(m.b)&&isFinite(m.c)){n=n.b
n=isFinite(n.a)&&isFinite(n.b)&&isFinite(n.c)}else n=!1
if(!n)throw A.c(A.j("cullItems: non-finite world bounds for instance "+o.gB().i(0),null))
if(a.e5(o.gbp())===B.as){++q
continue}B.b.j(l,o)}return new A.fI(l,new A.fJ(q))},
fJ:function fJ(a){this.b=a},
fI:function fI(a,b){this.a=a
this.b=b},
mu(a){var s,r,q,p
if(a<=0)throw A.c(A.aG(a,"size","must be > 0"))
s=a*0.5
r=new A.bc(A.d([],t.n),A.d([],t.t))
q=new A.hI(r,1)
p=-s
q.$6(new A.f(p,p,s),new A.f(s,p,s),new A.f(s,s,s),new A.f(p,s,s),B.b0,B.z)
q.$6(new A.f(s,p,p),new A.f(p,p,p),new A.f(p,s,p),new A.f(s,s,p),B.b1,B.A)
q.$6(new A.f(p,s,s),new A.f(s,s,s),new A.f(s,s,p),new A.f(p,s,p),B.j,B.z)
q.$6(new A.f(p,p,p),new A.f(s,p,p),new A.f(s,p,s),new A.f(p,p,s),B.p,B.A)
q.$6(new A.f(s,p,s),new A.f(s,p,p),new A.f(s,s,p),new A.f(s,s,s),B.z,B.b1)
q.$6(new A.f(p,p,p),new A.f(p,p,s),new A.f(p,s,s),new A.f(p,s,p),B.A,B.b0)
return r.aa(new A.aO(new A.f(p,p,p),new A.f(s,s,s)))},
mF(a,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a2<=0||a<=0)throw A.c(A.j("dimensions must be > 0",null))
if(a0<1||a1<1)throw A.c(A.j("subdivisions must be >= 1",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.bc(s,q)
o=a2*0.5
n=a*0.5
for(s=-o,m=-n,l=0;l<=a1;++l){k=l/a1
j=m+k*a
for(i=0;i<=a0;++i){h=i/a0
p.I(new A.f(s+h*a2,0,j),B.j,B.z,new A.R(h,k))}}g=a0+1
for(l=0;l<a1;)for(f=l*g,++l,e=l*g,i=0;i<a0;++i){d=f+i
c=e+i
b=c+1
B.b.C(q,A.d([d,c,b,d,b,d+1],r))}return p.aa(new A.aO(new A.f(s,0,m),new A.f(o,0,n)))},
mG(a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(a6<=0)throw A.c(A.aG(a6,"radius","must be > 0"))
if(a7<2||a8<3)throw A.c(A.j("invalid ring or sector count",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.bc(s,q)
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
a=0}p.I(new A.f(e*a6,s,d*a6),new A.f(e,k,d),new A.f(c,0,a),new A.R(i,n))}}a0=a8+1
for(o=0;o<a7;)for(s=o*a0,++o,a1=o*a0,j=0;j<a8;++j){a2=s+j
a3=a1+j
a4=a3+1
B.b.C(q,A.d([a2,a2+1,a4,a2,a4,a3],r))}a5=new A.f(a6,a6,a6)
return p.aa(new A.aO(a5.t(0,-1),a5))},
mv(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(a1<=0||a<=0)throw A.c(A.j("radius and height must be > 0",null))
if(a0<3)throw A.c(A.j("radialSegments must be >= 3",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.bc(s,q)
o=a*0.5
for(n=-o,m=0;m<=a0;++m){l=m/a0
k=l*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
h=new A.f(j,0,i)
g=new A.f(-i,0,j)
f=j*a1
e=i*a1
p.I(new A.f(f,n,e),h,g,new A.R(l,0))
p.I(new A.f(f,o,e),h,g,new A.R(l,1))}for(m=0;m<a0;++m){d=m*2
f=d+3
B.b.C(q,A.d([d,d+2,f,d,f,d+1],r))}c=s.length/18|0
p.I(new A.f(0,o,0),B.j,B.z,B.am)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.I(new A.f(j*a1,o,i*a1),B.j,B.z,new A.R(j*0.5+0.5,i*0.5+0.5))}for(f=c+1,e=c+2,m=0;m<a0;++m)B.b.C(q,A.d([c,f+m,e+m],r))
b=s.length/18|0
p.I(new A.f(0,n,0),B.p,B.A,B.am)
for(m=0;m<=a0;++m){k=m/a0*2*3.141592653589793
j=Math.cos(k)
i=Math.sin(k)
p.I(new A.f(j*a1,n,i*a1),B.p,B.A,new A.R(j*0.5+0.5,i*0.5+0.5))}for(s=b+2,f=b+1,m=0;m<a0;++m)B.b.C(q,A.d([b,s+m,f+m],r))
s=-a1
return p.aa(new A.aO(new A.f(s,n,s),new A.f(a1,o,a1)))},
mt(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a6<=0||a4<=0)throw A.c(A.j("radius and height must be > 0",null))
if(a5<3)throw A.c(A.j("radialSegments must be >= 3",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.bc(s,q)
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
p.I(new A.f(0,o,0),d,c,new A.R((i+h)*0.5,1))
p.I(new A.f(Math.cos(g)*a6,m,Math.sin(g)*a6),d,c,new A.R(i,0))
p.I(new A.f(Math.cos(f)*a6,m,Math.sin(f)*a6),d,c,new A.R(h,0))
B.b.C(q,A.d([b,b+1,b+2],r))}a=s.length/18|0
p.I(new A.f(0,m,0),B.p,B.A,B.am)
for(j=0;j<=a5;++j){a0=j/a5*2*3.141592653589793
a1=Math.cos(a0)
a2=Math.sin(a0)
p.I(new A.f(a1*a6,m,a2*a6),B.p,B.A,new A.R(a1*0.5+0.5,a2*0.5+0.5))}for(s=a+2,a3=a+1,j=0;j<a5;++j)B.b.C(q,A.d([a,s+j,a3+j],r))
s=-a6
return p.aa(new A.aO(new A.f(s,m,s),new A.f(a6,o,a6)))},
mH(a0,a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a1<=0||a2<=0)throw A.c(A.j("radii must be > 0",null))
if(a0<3||a3<3)throw A.c(A.j("segments must be >= 3",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.bc(s,q)
for(o=0;o<=a0;++o){s=o/a0
n=s*2*3.141592653589793
m=Math.cos(n)
l=Math.sin(n)
for(k=a1+a2*m,j=a2*l,i=0;i<=a3;++i){h=i/a3
g=h*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
p.I(new A.f(k*f,j,k*e),new A.f(m*f,l,m*e),new A.f(-e,0,f),new A.R(h,s))}}d=a3+1
for(o=0;o<a0;)for(s=o*d,++o,k=o*d,i=0;i<a3;++i){c=s+i
h=k+i
b=h+1
B.b.C(q,A.d([c,c+1,b,c,b,h],r))}a=a1+a2
s=-a
return p.aa(new A.aO(new A.f(s,-a2,s),new A.f(a,a2,a)))},
ms(a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a6<=0||a5<=0)throw A.c(A.j("radius and height must be > 0",null))
if(a7<2||a8<3)throw A.c(A.j("invalid ring or sector count",null))
s=A.d([],t.n)
r=t.t
q=A.d([],r)
p=new A.bc(s,q)
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
p.I(new A.f(d*a6,j,c*a6),new A.f(d,l,c),new A.f(-e,0,f),new A.R(h,s))}}for(s=-o,n=0;n<=a7;++n){j=n/a7
m=j*1.5707963267948966
l=Math.sin(m)
k=Math.cos(m)
for(b=-l,h=s+b*a6,j=0.5-0.5*j,i=0;i<=a8;++i){a=i/a8
g=a*2*3.141592653589793
f=Math.cos(g)
e=Math.sin(g)
d=k*f
c=k*e
p.I(new A.f(d*a6,h,c*a6),new A.f(d,b,c),new A.f(-e,0,f),new A.R(a,j))}}a0=a8+1
for(n=0;n<a7;)for(s=n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1
B.b.C(q,A.d([a1,h,a,a1,a,a1+1],r))}a2=(a7+1)*a0
for(n=0;n<a7;)for(s=a2+n*a0,++n,j=n*a0,i=0;i<a8;++i){a1=s+i
h=j+i
a=h+1+a2
B.b.C(q,A.d([a1,a1+1,a,a1,a,h+a2],r))}for(i=0;i<a8;i=a3){a3=i+1
s=a2+i
j=s+1
B.b.C(q,A.d([i,a3,j,i,j,s],r))}a4=o+a6
s=-a6
return p.aa(new A.aO(new A.f(s,-a4,s),new A.f(a6,a4,a6)))},
hI:function hI(a,b){this.a=a
this.b=b},
bc:function bc(a,b){this.a=a
this.b=b},
fz(a){var s,r,q,p,o,n,m,l,k,j
for(s=a.$ti,r=new A.ai(a,a.gp(0),s.h("ai<Q.E>")),s=s.h("Q.E"),q=B.dG,p=B.dI,o=!1;r.k();o=!0){n=r.d
if(n==null)n=s.a(n)
m=n.a
l=Math.min(q.a,m)
k=n.b
j=Math.min(q.b,k)
n=n.c
q=new A.f(l,j,Math.min(q.c,n))
p=new A.f(Math.max(p.a,m),Math.max(p.b,k),Math.max(p.c,n))}if(!o)throw A.c(A.j("Aabb.fromPoints requires at least one point",null))
return new A.aO(q,p)},
aO:function aO(a,b){this.a=a
this.b=b},
mb(a){var s,r,q,p,o,n,m=a.a,l=new A.fZ(),k=m.length
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
return new A.fY(A.d([l.$4(s+r,q+p,o+n,m[15]+m[12]),l.$4(m[3]-m[0],m[7]-m[4],m[11]-m[8],m[15]-m[12]),l.$4(m[3]+m[1],m[7]+m[5],m[11]+m[9],m[15]+m[13]),l.$4(m[3]-m[1],m[7]-m[5],m[11]-m[9],m[15]-m[13]),l.$4(m[3]+m[2],m[7]+m[6],m[11]+m[10],m[15]+m[14]),l.$4(m[3]-m[2],m[7]-m[6],m[11]-m[10],m[15]-m[14])],t.dV))},
bD:function bD(a,b){this.a=a
this.b=b},
cG:function cG(a,b){this.a=a
this.b=b},
fY:function fY(a){this.a=a},
fZ:function fZ(){},
kI(a){if(a.length!==16)throw A.c(A.j("Mat4.fromColumnMajor requires 16 values",null))
return new A.b4(new Float32Array(A.q(a)))},
kK(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.b4(q)},
kJ(a,b,c){var s=b.gE(),r=c.a1(s).gE(),q=s.a1(r),p=new Float32Array(16)
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
p[12]=-r.b6(a)
p[13]=-q.b6(a)
p[14]=s.b6(a)
p[15]=1
return new A.b4(p)},
b4:function b4(a){this.a=a},
hg:function hg(){},
mI(a,b){var s=a.gE(),r=b/2,q=Math.sin(r)
return new A.bE(s.a*q,s.b*q,s.c*q,Math.cos(r))},
bE:function bE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hL:function hL(a,b){this.a=a
this.b=b},
hM:function hM(a,b,c){this.a=a
this.b=b
this.d=c},
aw:function aw(a,b,c){this.a=a
this.b=b
this.c=c},
R:function R(a,b){this.a=a
this.b=b},
f:function f(a,b,c){this.a=a
this.b=b
this.c=c},
eY:function eY(a,b){this.a=a
this.b=b},
cu:function cu(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
eZ:function eZ(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dO:function dO(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
f_:function f_(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
dV:function dV(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
f1:function f1(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
f2:function f2(a,b){this.a=a
this.b=b},
cD:function cD(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
f3:function f3(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dY:function dY(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
f4:function f4(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
e5:function e5(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f
_.w=g},
f8:function f8(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
cT:function cT(a,b,c){this.a=a
this.b=b
this.c=c},
fb:function fb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bY:function bY(a){this.b=a},
dQ:function dQ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
a8(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.N(a.a,a.b,b,c,s,r)},
jR:function jR(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var _=this
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
mr(a){var s
switch(a.a){case 0:s=0
break
case 1:s=1
break
case 2:s=2.5
break
case 3:s=3.5
break
default:s=null}return s},
d0:function d0(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
fe:function fe(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ev:function ev(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ff:function ff(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
kU(a){var s=A.kJ(B.j,B.p,Math.abs(0)<0.99?B.z:B.j)
return new A.bF(A.kK(1,1,B.i.a5(1,0.1,3),0.05).t(0,s))},
bF:function bF(a){this.a=a},
eD:function eD(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fi:function fi(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
ok(c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3=u.l,b4="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[5]=float[5](0.227027,0.1945946,0.1216216,0.054054,0.016216);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<5;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b5="bloomBlurH",b6="bloomBlurV",b7="dofBlurH",b8="dofBlurV",b9={},c0=c4.b
if(!c0.n(0,"shadows"))throw A.c(A.aG(c4,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=c0.n(0,"ssao")
r=c0.n(0,"bloom")
q=c0.n(0,"dof")
p=c0.n(0,"grade")
o=c0.n(0,"ps1")
n=c0.n(0,"vhs")
m=c0.n(0,"volumetric")
c0=B.i.a4(e9+1,2)
l=B.i.a4(e8+1,2)
k=A.a8(B.a7,e9,e8,e7,b2)
j=A.a8(B.a7.cb(),e9,e8,b2,b2)
i=e7>1
h=A.a8(B.d_,e9,e8,b2,i?2:1)
g=A.a8(B.cZ,c0,l,b2,b2)
A.a8(B.d7,e9,e8,b2,b2)
f=A.a8(B.d4,e9,e8,b2,b2)
e=A.a8(B.cY,f0,f0,b2,b2)
d=A.a8(B.d0,c0,l,b2,b2)
c=A.a8(B.d1,c0,l,b2,b2)
b=A.a8(B.d5,c0,l,b2,b2)
a=A.a8(B.d6,c0,l,b2,b2)
a0=$.lK()
a1=i?1:0
a2=A.a8(a0,e9,e8,b2,a1+(m?1:0)+1)
a0=A.a8(B.cV,c0,l,b2,b2)
a1=A.a8(B.cW,c0,l,b2,b2)
a3=A.a8(B.cX,e9,e8,b2,b2)
a4=A.a8(B.d2,e9,e8,b2,b2)
a5=A.a8(B.d8,e9,e8,b2,b2)
a6=A.a8(B.d3,e9,e8,b2,b2)
a7=i?new A.cT(c2,k,j):b2
b9.a=null
a8=A.kU(B.bj)
if(m){a9=i?j:k
b0=new A.eS(c1,b3,"#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\n\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform mat4 uViewProjection;\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform float uShaftIntensity;\nuniform float uFogDensity;\nuniform float uAnisotropy;\nuniform mat4 uView;\nuniform mat4 uInverseProjection;\nuniform vec3 uVolumetricAlbedo;\nuniform float uVolumetricHeightFalloff;\nuniform float uVolumetricDustDensity;\nuniform float uVolumetricJitter;\nuniform float uVolumetricIntensity;\nuniform float uVolumetricSampleCount;\nuniform float uVolumetricSourceCount;\n\nuniform vec3 uSourcePosition0;\nuniform vec3 uSourceColor0;\nuniform float uSourceIntensity0;\nuniform float uSourceReferenceDistance0;\nuniform float uSourceCutoffDistance0;\nuniform vec3 uSourcePosition1;\nuniform vec3 uSourceColor1;\nuniform float uSourceIntensity1;\nuniform float uSourceReferenceDistance1;\nuniform float uSourceCutoffDistance1;\nuniform vec3 uSourcePosition2;\nuniform vec3 uSourceColor2;\nuniform float uSourceIntensity2;\nuniform float uSourceReferenceDistance2;\nuniform float uSourceCutoffDistance2;\nuniform vec3 uSourcePosition3;\nuniform vec3 uSourceColor3;\nuniform float uSourceIntensity3;\nuniform float uSourceReferenceDistance3;\nuniform float uSourceCutoffDistance3;\n\nfloat linearDepth(float depth) {\n  float z = depth * 2.0 - 1.0;\n  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);\n}\n\nfloat phaseHenyeyGreenstein(float cosTheta, float anisotropy) {\n  float g = clamp(anisotropy, -0.85, 0.85);\n  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;\n  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));\n}\n\nvec3 sourceContribution(\n  vec3 position,\n  vec3 color,\n  float intensity,\n  float referenceDistance,\n  float cutoffDistance,\n  vec3 viewRay,\n  float rayLength\n) {\n  vec4 clip = uViewProjection * vec4(position, 1.0);\n  if (clip.w <= 0.0) return vec3(0.0);\n  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;\n  float sourceDistance = length(sourceView);\n  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);\n  vec3 sampleToSource = sourceView - viewRay * tClosest;\n  float distanceToSource = max(length(sampleToSource), 1e-3);\n  float cutoff = 1.0 - smoothstep(\n    cutoffDistance * 0.65, cutoffDistance, sourceDistance);\n  float inverseSquare = intensity * referenceDistance * referenceDistance /\n      max(distanceToSource * distanceToSource,\n          referenceDistance * referenceDistance);\n  // The incoming direction is source -> sample and the outgoing direction is\n  // sample -> camera. This is the same phase convention as the directional\n  // medium path, but now evaluated against the located source.\n  float phase = phaseHenyeyGreenstein(\n    dot(normalize(sampleToSource), viewRay), uAnisotropy);\n  // Located practicals and lightning must also acquire visible body in a\n  // dust-filled room. Use the same broad haze plus particulate density as the\n  // directional march; otherwise a clear-air fog toggle would accidentally\n  // erase dust-lit source rays while the directional shafts still showed it.\n  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);\n  float mediumWeight = 1.0 - exp(-max(\n    mediumDensity * min(rayLength, cutoffDistance), 0.0));\n  float pathWeight = clamp(\n    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);\n  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *\n    uVolumetricIntensity * 0.35;\n}\n\nvoid main() {\n  float depth = texture(uSceneDepth, vUv).r;\n  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);\n  viewPoint /= max(abs(viewPoint.w), 1e-5);\n  vec3 viewRay = normalize(viewPoint.xyz);\n  // linearDepth is camera-space Z; convert it to distance along the actual\n  // reconstructed ray so wide and tall projections integrate equally.\n  float cameraDepth = linearDepth(depth);\n  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);\n  float density = max(uFogDensity, 0.0);\n\n  // A fixed, bounded integral keeps the pass deterministic and makes its\n  // cost predictable on weak adapters. The depth buffer stops integration at\n  // the first opaque surface, so shafts do not leak through geometry.\n  const int maxSampleCount = 24;\n  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));\n  vec3 scatter = vec3(0.0);\n  float transmittance = 1.0;\n  float stepLength = rayLength / float(sampleCount);\n  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);\n  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);\n  for (int i = 0; i < maxSampleCount; i++) {\n    if (i >= sampleCount) break;\n    float distanceAlongRay = clamp(\n      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);\n    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));\n    // Dust is a separate, host-resolved particulate phase. It is denser near\n    // the occupied room volume than the broad atmospheric haze, so shafts gain\n    // visible body without turning the far horizon opaque. At zero density the\n    // extra term is exactly zero and the established fog path is unchanged.\n    float dustWeight = exp(-max(distanceAlongRay *\n      uVolumetricHeightFalloff * 0.45, 0.0));\n    float opticalDensity = density +\n      max(uVolumetricDustDensity, 0.0) * dustWeight;\n    float opticalDepth = opticalDensity * stepLength * heightWeight;\n    float sampleTransmittance = exp(-opticalDepth);\n    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);\n    scatter += transmittance * (uLightColor * uVolumetricAlbedo *\n      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;\n    transmittance *= sampleTransmittance;\n  }\n\n  if (uVolumetricSourceCount > 0.5) {\n    scatter += sourceContribution(\n      uSourcePosition0, uSourceColor0, uSourceIntensity0,\n      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 1.5) {\n    scatter += sourceContribution(\n      uSourcePosition1, uSourceColor1, uSourceIntensity1,\n      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 2.5) {\n    scatter += sourceContribution(\n      uSourcePosition2, uSourceColor2, uSourceIntensity2,\n      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 3.5) {\n    scatter += sourceContribution(\n      uSourcePosition3, uSourceColor3, uSourceIntensity3,\n      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);\n  }\n\n  // Fade the final sample at the far plane and keep the additive output\n  // bounded so a storm flash cannot blow out the entire frame.\n  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);\n  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);\n}\n","#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\nuniform sampler2D uVolumetric;\nuniform float uVolumetricStrength;\n\nvoid main() {\n  vec3 light = texture(uVolumetric, vUv).rgb;\n  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);\n}\n",c2,e1,c8,g,f,a9,h,A.d([],t.J))}else b0=b2
g=t.f
b1=A.d([],g)
if(!m)h=i?j:k
if(r){B.b.C(b1,A.d([new A.cu(c1,b3,b4,c2,b5,b5,B.b5,!0,h,b,e0,c0,l),new A.cu(c1,b3,b4,c2,b6,b6,B.dV,!1,b,a,c6,c0,l),new A.dO(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",c2,c7,a,h,a2)],g))
h=a2}if(q){B.b.C(b1,A.d([new A.cD(c1,b3,b4,c2,b7,b7,B.b6,h,a0,e0,c0,l),new A.cD(c1,b3,b4,c2,b8,b8,B.dW,a0,a1,d1,c0,l),new A.dY(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// Circle-of-confusion is a simple linear ramp from the focus distance\n// outward (front and back treated the same \u2014 no separate near/far falloff\n// curve), clamped to [0,1] and scaled by uStrength so\n// PostProcessState.depthOfFieldStrength == 0 is a true no-op (coc == 0\n// everywhere, oColor == the sharp source exactly).\nvoid main(){\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n  float coc=clamp(abs(depth-uFocusDistance)/max(uFocusRange,0.0001),0.0,1.0)*uStrength;\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  vec3 blurred=texture(uBlurred,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,coc),1.0);\n}\n",c2,e0,d2,e1,c8,h,f,a1,a3)],g))
h=a3}if(p){B.b.j(b1,new A.e5(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",c2,d4,h,a4))
h=a4}if(o){B.b.j(b1,new A.ev(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",c2,h,a5))
h=a5}if(n){B.b.j(b1,new A.eR(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',c2,e6,e5,h,a6))
h=a6}j=A.d([new A.dV(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d7,d6,c5,f)],g)
if(s)j.push(new A.eH(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=8;\nconst vec3 KERNEL[8]=vec3[8](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    // NDC [-1,1] -> UV [0,1] requires the constant 0.5, not vUv (the\n    // *current* fragment's own UV) \u2014 adding vUv here was a real bug: it\n    // conflated \"this sample's own absolute reprojected screen position\"\n    // with \"an offset relative to the current fragment,\" producing an\n    // error of (vUv-0.5) per axis that grows with distance from screen\n    // center. That's exactly what produced a huge, blobby, non-local dark\n    // region instead of contact occlusion \u2014 every sample tested a wildly\n    // wrong depth location except right at screen center, where the error\n    // happened to be near zero.\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    occlusion+=(occluderView.z>=samplePos.z+0.02?1.0:0.0)*rangeCheck;\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",c2,e1,c8,d))
if(s)j.push(new A.eG(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float centerDepth=linearDepth(texture(uSceneDepth,vUv).r);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleDepth=linearDepth(texture(uSceneDepth,sampleUv).r);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*4.0);\n      sum+=texture(uSsaoRaw,sampleUv).r*depthWeight;\n      weightSum+=depthWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',c2,e4,e1,c8,c0,l,d,c))
j.push(new A.eD(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d7,d6,c5,c9,b2,b2,new A.j9(b9),e))
j.push(new A.eE(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nuniform vec3 uReflectionColor;\nuniform float uReflectionIntensity;\nuniform float uReflectionConfidence;\nuniform vec2 uShadowMapTexelSize;\nuniform float uShadowFilterRadius;\nuniform float uShadowBias;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uSpecularScale;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nuniform float uSurfaceSnowCoverage;\nuniform float uSurfaceDissolution;\nuniform float uThermalSourceCount;\nuniform vec3 uThermalSourcePosition0;\nuniform float uThermalSourceRadius0;\nuniform float uThermalSourceDissolution0;\nuniform vec3 uThermalSourcePosition1;\nuniform float uThermalSourceRadius1;\nuniform float uThermalSourceDissolution1;\nuniform vec3 uThermalSourcePosition2;\nuniform float uThermalSourceRadius2;\nuniform float uThermalSourceDissolution2;\nuniform vec3 uThermalSourcePosition3;\nuniform float uThermalSourceRadius3;\nuniform float uThermalSourceDissolution3;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return lightColor*lightIntensity*ndotl*coneFalloff*\n    distanceFalloff*enabled;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0);\n  float ndotl=max(dot(normal,lightDir),0.0);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlick(hdotv,f0);\n  float distribution=distributionGgx(ndoth,roughness);\n  float geometry=geometrySmith(ndotv,ndotl,roughness);\n  vec3 numerator=distribution*geometry*fresnel;\n  float denominator=max(4.0*ndotv*ndotl,0.001);\n  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog keeps the smooth distance ramp for authored horizon control, but\n// the participating-medium term is an analytic optical depth along the actual\n// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the\n// integral has a stable constant-height limit and therefore does not shimmer\n// when a surface is nearly level with the camera. Zero density remains an\n// exact no-op; the host can still use the distance ramp independently.\nfloat heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){\n  float segmentLength=length(rayEnd-rayStart);\n  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;\n  float falloff=max(uFogHeightFalloff,0.);\n  float h0=max(rayStart.y,0.);\n  float h1=max(rayEnd.y,0.);\n  float integral;\n  if(falloff<=0.||abs(h1-h0)<=0.0001){\n    integral=segmentLength*exp(-falloff*h0);\n  }else{\n    float denominator=falloff*(h1-h0);\n    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;\n  }\n  return max(uFogDensity*integral,0.);\n}\n\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);\n  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);\n  float mediumFactor=1.-exp(-opticalDepth);\n  return clamp(max(distFactor,mediumFactor),0.,1.);\n}\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);\n  // Fixed low-discrepancy offsets avoid the directional shimmer of a regular\n  // square lattice while remaining deterministic and free of per-frame noise.\n  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);\n  float sum=0.;\n  sum+=sampleShadow(projCoord+vec3(vec2(-.942,-.399)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.945,-.768)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.094,.886)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.344,.294)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.716,.642)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.688,-.089)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.287,-.885)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.052,.008)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.831,.486)*t,0.),bias);\n  return sum/9.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // \xa76.2's alpha-masked route. Deliberately the first thing after the\n  // fetch it depends on, and ahead of all the lighting below: a discarded\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  direct*=uDirectLightScale;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  float upward=clamp(n.y*0.5+0.5,0.0,1.0);\n  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao*mix(0.85,1.15,upward);\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Weather changes the material before direct and environment response.\n  // Thawing therefore affects the same specular lobe the viewer sees,\n  // instead of changing only diffuse color after the highlight is computed.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);\n  // A steady spherical conductive field decays approximately as 1/r. The\n  // host keeps the slow latent material memory in uSurfaceDissolution; this\n  // local term therefore models the spatial heat field without making warm\n  // surfaces snap back or disappear at an arbitrary exponential radius.\n  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/\n      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));\n  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/\n      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));\n  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/\n      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));\n  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/\n      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));\n  thermalDissolution=clamp(thermalDissolution,0.0,1.0);\n  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*\n    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);\n  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);\n  float dissolution=thermalDissolution;\n  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);\n  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  // A continuous water film forms a second dielectric lobe. It smooths the\n  // authored surface only as coverage rises, so damp cloth stays diffuse\n  // while puddled stone gains a tight grazing reflection.\n  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);\n  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  specular*=uDirectLightScale*uSpecularScale;\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*(1.0-0.25*rough));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);\n  float coat=coatStrength*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*\n    uDirectLightScale*uSpecularScale;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  // Environment fallback reflections are deliberately bounded and weighted\n  // by wetness/grazing angle. A real probe/history hit can raise confidence;\n  // the current host fallback remains visible but never masquerades as SSR.\n  float reflectionNdotV=max(dot(n,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metal);\n  vec3 envFresnel=f0+(max(vec3(1.0-specRough),f0)-f0)*pow(clamp(1.0-reflectionNdotV,0.0,1.0),5.0);\n  float envGloss=(1.0-specRough)*(1.0-specRough);\n  float reflectionSurface=clamp(metal*0.85+(1.0-metal)*(wetness+0.18*dissolution+envGloss*0.25),0.0,1.0);\n  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);\n  float reflectionWeight=clamp(\n    uReflectionIntensity*reflectionSurface*\n      (1.0-0.72*rough)*reflectionConfidence,\n    0.0,1.0);\n  lit+=uReflectionColor*envFresnel*reflectionWeight*ao;\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  oGlow=vec4(emissive,1.);\n}\n",d7,d6,c5,d8,d9,d3,d5,e2,new A.ja(b9,a8),c9,d0,e3,s,e9,e8,f0,f0,e,c,k))
if(a7!=null)j.push(a7)
if(b0!=null)j.push(b0)
B.b.C(j,b1)
j.push(new A.d0(c1,b3,u.b,c2,h,c3))
return new A.dZ(j)},
j9:function j9(a){this.a=a},
ja:function ja(a,b){this.a=a
this.b=b},
eE:function eE(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
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
fj:function fj(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
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
eH:function eH(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
fl:function fl(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eG:function eG(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
fk:function fk(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
eR:function eR(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fq:function fq(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
eS:function eS(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
fs:function fs(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fr:function fr(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
d4:function d4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eV:function eV(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fv:function fv(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jT(a,b,c,d,e,f,g,h,i,j,k,l,m){var s=new A.cc(i,l,B.aj,A.d([],t.D),g,f,b,h,m,d,a,!0,!0,k,e)
s.x=h==null?null:h.d
return s},
cc:function cc(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
_.a=a
_.b=b
_.c=c
_.d=!0
_.e=null
_.f=d
_.r=e
_.w=f
_.x=g
_.y=h
_.z=i
_.Q=j
_.as=k
_.at=l
_.ax=m
_.ay=n
_.ch=o
_.CW=null},
hX:function hX(a,b){this.a=a
this.b=b},
eB(a,b){return new A.d8(a,b)},
h_:function h_(a,b){this.a=a
this.b=b},
e3:function e3(a,b){this.a=a
this.b=b},
h4:function h4(a,b){this.a=a
this.b=b},
h5:function h5(a,b){this.a=a
this.b=b},
e2:function e2(a,b,c){this.a=a
this.b=b
this.c=c},
h3:function h3(){},
c1:function c1(a,b){this.a=a
this.b=b},
cH:function cH(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
e4:function e4(a,b){this.a=a
this.b=b},
cd:function cd(a,b){this.a=a
this.b=b},
d8:function d8(a,b){this.a=a
this.b=b},
ba:function ba(a,b){this.a=a
this.b=b},
e:function e(a,b){this.a=a
this.b=b},
cy:function cy(a,b){this.a=a
this.b=b},
dW:function dW(a,b){this.a=a
this.b=b},
hF(a,b,c,d){var s=0,r=A.k8(t.ac),q,p,o,n,m,l,k,j,i
var $async$hF=A.kb(function(e,f){if(e===1)return A.k2(f,r)
for(;;)switch(s){case 0:j=B.bl.dr(a)
i=j==null?null:new A.eA(j.a,new A.fF(new A.fG(),new A.ey()),new A.e1(A.d([],t.c4),B.br),A.d([],t.cR),B.a4,A.d([],t.cL),null)
if(i==null){q=null
s=1
break}p=A.a(a.clientWidth)>0?A.a(a.clientWidth):A.a(a.width)
o=A.a(a.clientHeight)>0?A.a(a.clientHeight):A.a(a.height)
n=A.kW(o,p,A.aN(A.p(v.G.window).devicePixelRatio),2,!0)
a.width=n.c
a.height=n.d
m=A.oo(c)
s=3
return A.k1(A.j8(new A.hG(n),m,i,n),$async$hF)
case 3:i.aB()
l=A.mO(i.w.a.b)
B.b.j(i.d,l)
k=new A.d_(a,i,l,new A.fW(),A.jT(B.U,null,!0,B.M,null,null,null,null,"root",!0,0,B.aj,-1),B.bp,B.cP,n,A.an(t.N))
k.y=A.kN(5,B.y)
k.w=!0
k.cZ()
q=k
s=1
break
case 1:return A.k3(q,r)}})
return A.k4($async$hF,r)},
c_:function c_(a,b){this.a=a
this.b=b},
d_:function d_(a,b,c,d,e,f,g,h,i){var _=this
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
_.Q=null
_.as=!1
_.at=0
_.ch=_.ax=!1
_.cy=_.cx=_.CW=0
_.db=null
_.fr=_.dy=_.dx=0},
hG:function hG(a){this.a=a},
hv:function hv(a){this.a=a},
hw:function hw(a){this.a=a},
hx:function hx(a){this.a=a},
hy:function hy(){},
hz:function hz(a){this.a=a},
hA:function hA(a){this.a=a},
hB:function hB(a){this.a=a},
hC:function hC(a){this.a=a},
hD:function hD(a){this.a=a},
hE:function hE(a){this.a=a},
es:function es(a,b){this.a=a
this.b=b},
h0:function h0(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
h1:function h1(){},
h2:function h2(){},
dt:function dt(a,b){this.a=a
this.b=b},
br:function br(a,b){var _=this
_.a=0
_.b=a
_.f=_.c=null
_.$ti=b},
aT:function aT(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=0
_.$ti=d},
m7(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.bZ(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
fB:function fB(a,b){this.a=a
this.b=b},
bW:function bW(a,b){this.a=a
this.b=b},
fH:function fH(a,b){this.a=a
this.b=b},
fL:function fL(a,b){this.a=a
this.b=b},
bZ:function bZ(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
ie:function ie(){this.a=null},
mY(a){var s=new A.eT(a,B.d,new A.ie(),A.n7(a))
s.cv(a)
return s},
n7(a){var s,r,q=t.du.a(a.getSupportedExtensions())
if(q==null)return A.an(t.N)
s=A.an(t.N)
r=J.a3(t.dy.b(q)?q:new A.cx(q,A.E(q).h("cx<1,v>")))
while(r.k())s.j(0,r.gm())
return s},
ad(a,b){var s,r
if(a.b!==B.d)A.l(A.m(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.a(s.drawingBufferWidth),A.a(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
l_(a,b){var s
if(a.b!==B.d)A.l(A.m(u.k))
switch(b){case 1:a.a.drawBuffers(A.d([A.a(v.G.WebGL2RenderingContext.COLOR_ATTACHMENT0)],t.n))
break
case 2:s=v.G
a.a.drawBuffers(A.d([A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
break
default:throw A.c(A.j("WebGl2Device.setColorAttachmentCount: count must be 1 or 2, got "+b,null))}},
n2(a,b,c){var s,r,q,p
if(a.b!==B.d)A.l(A.m(u.k))
s=t.V.a(c.a)
r=a.a
q=v.G
r.activeTexture(A.a(q.WebGL2RenderingContext.TEXTURE0)+b)
p=s.f
if(p!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),p)
return}throw A.c(A.m("WebGl2Device.bindGlowTexture: target has no glow attachment \u2014 create it with GpuTargetAttachment.colorAndGlow/colorDepthGlow, and resolve a multisampled source before sampling (single-sample only)"))},
n1(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.a(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
n0(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
kZ(a,b){var s
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
mZ(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
a0(a,b){var s,r,q,p
if(a.b!==B.d)A.l(A.m(u.k))
s=a.f
r=s.dt(b)
if(r.a===0)return
if(r.n(0,B.a9)){q=v.G
p=a.a
if(b.a)p.enable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.n(0,B.aa))a.a.depthFunc(A.n1(a,b.b))
if(r.n(0,B.ab))a.a.depthMask(b.c)
if(r.n(0,B.af)){q=v.G
p=a.a
if(b.w)p.enable(A.a(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.a(q.WebGL2RenderingContext.CULL_FACE))}if(r.n(0,B.ag))a.a.cullFace(A.n0(a,b.x))
if(r.n(0,B.aW)){q=v.G.WebGL2RenderingContext
q=A.a(q.CCW)
a.a.frontFace(q)}if(r.n(0,B.ac)){q=v.G
p=a.a
if(b.d)p.enable(A.a(q.WebGL2RenderingContext.BLEND))
else p.disable(A.a(q.WebGL2RenderingContext.BLEND))}if(r.n(0,B.ad))a.a.blendFunc(A.kZ(a,b.e),A.kZ(a,b.f))
if(r.n(0,B.ae))a.a.blendEquation(A.mZ(a,b.r))
if(r.n(0,B.aU))a.a.colorMask(!0,!0,!0,!0)
if(r.n(0,B.aV)){q=v.G.WebGL2RenderingContext
a.a.disable(A.a(q.SCISSOR_TEST))}s.a=b},
n_(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.a(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.a(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.a(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
aK(a,b,c,d,e,f){var s
if(a.b!==B.d)A.l(A.m(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.n_(a,b))},
aj(a,b){var s
if(a.b!==B.d)A.l(A.m(u.k))
s=A.p(b.a)
a.a.useProgram(s)
a.e=s},
b(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.d)A.l(A.m(u.k))
s=a.e
if(s==null)throw A.c(A.m("WebGl2Device.setUniform called with no bound program"))
r=a.a
q=A.J(r.getUniformLocation(s,b))
if(q==null)return
switch(c.a.a){case 0:r.uniform1f(q,A.iL(c.b))
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
A.ae(r,"uniform4f",[q,n,m,l,p[3]],t.H)
break
case 4:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 5:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 6:r.uniform1i(q,A.a(c.b))
break}},
a5(a,b){if(a.b!==B.d)A.l(A.m(u.k))
a.a.bindVertexArray(A.p(b.a))},
I(a,b,c){var s,r,q,p,o,n
if(a.b!==B.d)A.l(A.m(u.k))
s=c.a
r=a.a
q=v.G
r.activeTexture(A.a(q.WebGL2RenderingContext.TEXTURE0)+b)
if(s instanceof A.dD){p=s.d>1?A.a(q.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(q.WebGL2RenderingContext.TEXTURE_2D)
r.bindTexture(p,s.a)
return}if(s instanceof A.dC){o=s.b
if(o!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),o)
return}n=s.e
if(n!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),n)
return}throw A.c(A.m("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.c(A.m("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
n3(a,b,c){var s,r,q,p
if(a.b!==B.d)A.l(A.m(u.k))
s=A.p(b.a)
r=a.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),s)
A:{p=q.WebGL2RenderingContext
r.bufferData(A.a(p.ELEMENT_ARRAY_BUFFER),c,A.a(q.WebGL2RenderingContext.STATIC_DRAW))
break A}},
n4(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
l2(a,b){var s,r,q,p
if(a.b!==B.d)A.l(A.m(u.k))
s=a.a
r=A.J(s.createBuffer())
if(r==null)throw A.c(A.m("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.at?A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.a(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.n4(a,b.b))
return new A.be(r)},
l0(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
l1(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
l3(a,b){var s,r,q,p,o,n,m,l,k
if(a.b!==B.d)A.l(A.m(u.k))
s=a.a
r=A.J(s.createTexture())
if(r==null)throw A.c(A.m("WebGl2Device: gl.createTexture() returned null"))
q=v.G
p=q.WebGL2RenderingContext
o=A.a(p.TEXTURE_2D)
s.bindTexture(o,r)
p=q.WebGL2RenderingContext
A.ae(s,"texStorage2D",[o,1,A.a(p.RGBA8),1,1],t.H)
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.l0(a,B.aw))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.l0(a,B.aw))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_S),A.l1(a,B.ax))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_T),A.l1(a,B.ax))
n=a.r.n(0,"EXT_texture_filter_anisotropic")
m=n?a.bL(34047):1
if(!isFinite(1))A.l(A.aG(1,"requested","anisotropy must be finite and in [1, 16]"))
if(n&&isFinite(m)&&m>=1)l=m>16?16:m
else l=1
k=1<l?1:l
if(k>1)s.texParameterf(o,34046,k)
return new A.be(new A.dD(r,1,1,1,!1))},
l4(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.d)A.l(A.m(u.k))
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
if(r)A.ae(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.ae(l,"texSubImage2D",[m,0,0,0,q,p,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
n5(a,b){if(a.b!==B.d)A.l(A.m(u.k))
t.R.a(b.a)
return},
eU(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
l6(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.d)A.l(A.m(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.c(A.j("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.J(r.createFramebuffer())
if(q==null)throw A.c(A.m("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.Y
if(n&&!a1.e)throw A.c(A.j("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.av||o===B.by
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
A.ae(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.J(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.ae(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.d([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.J(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.ae(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.ae(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.J(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),j)
A.ae(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.ae(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.TEXTURE_2D),j,0],h)
r.drawBuffers(A.d([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}}f=d
e=d
if(a1.e){o=a1.c
h=t.H
g=a1.b
if(o>1){f=A.J(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.ae(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.J(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.ae(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
A.ae(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.a(r.checkFramebufferStatus(A.a(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.a(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.jU(a0,q,l,k,f,e,j,i)
throw A.c(A.m("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.be(new A.dC(q,l,k,f,e,j,i,s,a1.b,a1.c))},
jU(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
aD(a){var s
if(a.b!==B.d)A.l(A.m(u.k))
s=A.J(a.a.createVertexArray())
if(s==null)throw A.c(A.m("WebGl2Device: gl.createVertexArray() returned null"))
return new A.be(s)},
l5(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.J(p.createShader(b))
if(o==null)throw A.c(A.eB(b===A.lD(A.lq(A.lH(),r),q,t.S)?B.aQ:B.aR,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.aX(A.cp(p.getShaderParameter(o,A.a(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bM(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.c(A.eB(b===A.lD(A.lq(A.lH(),r),q,t.S)?B.aQ:B.aR,s))}return o},
n6(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.d)A.l(A.m(u.k))
q=v.G
s=A.l5(a,A.a(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.l5(a,A.a(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.J(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.c(B.de)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.aX(A.cp(o.getProgramParameter(n,A.a(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bM(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.eB(B.aS,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.A)(c),++l){k=c[l]
if(A.a(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.eB(B.aT,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.J(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.eB(B.aT,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.be(n)},
be:function be(a){this.a=a},
dD:function dD(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dC:function dC(a,b,c,d,e,f,g,h,i,j){var _=this
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
fu:function fu(a){this.a=a
this.b=!1},
eT:function eT(a,b,c,d){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=c
_.r=d
_.w=!1},
ib:function ib(a){this.a=a},
ic:function ic(a){this.a=a},
iJ:function iJ(){},
ft:function ft(){},
ia:function ia(a){this.a=a},
id:function id(){},
jl(){return A.oD()},
oD(){var s=0,r=A.k8(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5
var $async$jl=A.kb(function(c6,c7){if(c6===1)return A.k2(c7,r)
for(;;)switch(s){case 0:c2={}
c3=v.G
c4=A.J(A.p(c3.document).querySelector("#showcase-canvas"))
c5=t.m
if(!c5.b(c4)){s=1
break}s=3
return A.k1(A.hF(c4,!0,B.aO,!0),$async$jl)
case 3:p=c7
if(p==null){s=1
break}o=p.y
o=o instanceof A.bm?o:null
if(o!=null){o.b=8.5
o.d=0.45
o.a=B.R
o.as=!0
o.at=0.18}n=p.f.dn(B.bi)
p.f=n
p.f=n.dq(B.bR,1,B.aE,B.ba,B.c_,0.85,1.2)
p.r=A.kP()
m=A.J(A.p(c3.document).querySelector("#tone-map-select"))
if(c5.b(m))m.addEventListener("change",A.a2(new A.jm(m,p)))
l=A.J(A.p(c3.document).querySelector("#post-preset-select"))
if(c5.b(l))l.addEventListener("change",A.a2(new A.jn(l,p,m)))
k=A.J(A.p(c3.document).querySelector("#turntable-toggle"))
j=A.J(A.p(c3.document).querySelector("#turntable-group"))
if(c5.b(k)){k.checked=!0
k.addEventListener("change",A.a2(new A.jo(p,k)))}i=A.J(A.p(c3.document).querySelector("#camera-mode-select"))
if(c5.b(i))i.addEventListener("change",A.a2(new A.jp(i,p,j,k)))
h=A.mF(30,4,4,30)
n=p.b
g=n.gH().ad(h,"ground")
f=A.mG(1,40,40)
e=n.gH().ad(f,"center_sphere")
d=A.mH(20,1.8,0.08,48)
c=n.gH().ad(d,"orbit_torus")
b=A.ms(0.6,0.3,12,24)
a=A.mv(0.9,24,0.35)
a0=A.mt(0.9,24,0.4)
a1=A.mu(0.65)
a2=[b,a,a0,a1]
a3=[n.gH().ad(b,"satellite_capsule"),n.gH().ad(a,"satellite_cylinder"),n.gH().ad(a0,"satellite_cone"),n.gH().ad(a1,"satellite_cube")]
a4=A.b5(0.2,0,"ground",0,0.7,0.16,0.12,0.1)
a5=n.gH().W(a4)
a4=A.b5(0.1,0.5,"hero_gold",1,0.12,0.35,0.78,1)
a4=n.gH().W(a4)
a6=A.b5(0.2,0,"hero_chrome",0.98,0.05,0.98,0.95,0.95)
a6=n.gH().W(a6)
a7=A.b5(0.2,0,"hero_copper",1,0.15,0.54,0.64,0.95)
a7=n.gH().W(a7)
a8=A.b5(0.2,0,"hero_silver",1,0.08,0.91,0.96,0.97)
a8=n.gH().W(a8)
a9=A.kL(0.9,B.bP,"hero_ceramic",0.18)
a9=n.gH().W(a9)
b0=A.jP(B.bT,"hero_plastic",0.22)
b0=n.gH().W(b0)
b1=A.b5(0.2,0,"hero_iron",0.85,0.28,0.58,0.57,0.56)
b2=A.kG(["gold",a4,"chrome",a6,"copper",a7,"silver",a8,"ceramic",a9,"plastic",b0,"iron",n.gH().W(b1)],t.N,t.eL)
b1=A.b5(0.2,0,"torus_chrome",0.98,0.06,0.98,0.95,0.95)
b3=n.gH().W(b1)
b1=A.jP(B.bZ,"sat_emerald",0.22)
b1=n.gH().W(b1)
b0=A.kL(0.8,B.bX,"sat_ruby",0.18)
b0=n.gH().W(b0)
a9=A.jP(B.bU,"sat_sapphire",0.2)
a9=n.gH().W(a9)
a8=A.b5(0.2,0,"sat_copper",1,0.2,0.54,0.64,0.95)
b4=[b1,b0,a9,n.gH().W(a8)]
a8=p.e
a8.aF(0,a5,g,h,"ground_node",new A.aw(B.p,B.D,1))
n=b2.q(0,"gold")
n.toString
b5=a8.aF(0,n,e,f,"center_sphere_node",new A.aw(B.R,B.D,1))
b6=A.J(A.p(c3.document).querySelector("#material-select"))
if(c5.b(b6))b6.addEventListener("change",A.a2(new A.jq(b2,b6,b5)))
b7=a8.aF(0,b3,c,d,"torus_ring_node",new A.aw(B.R,B.D,1))
b8=A.jT(B.U,null,!0,B.M,null,null,null,null,"orbit_ring",!0,0,B.aj,-1)
b5.c2(b8)
b9=A.d([],t.D)
for(c0=0;c0<4;++c0){c1=c0*1.5707963267948966
c5=a3[c0]
n=a2[c0]
B.b.j(b9,b8.aF(0,b4[c0],c5,n,"satellite_"+c0,new A.aw(new A.f(Math.cos(c1)*3.2,0,Math.sin(c1)*3.2),B.D,1)))}c2.a=null
c2.b=0
c4.addEventListener("click",A.a2(new A.jr(c2,p,A.J(A.p(c3.document).querySelector("#picking-status")))))
p.sdN(new A.js(c2,b5,b7,b8,b9,p))
p.cq()
case 1:return A.k3(q,r)}})
return A.k4($async$jl,r)},
jm:function jm(a,b){this.a=a
this.b=b},
jn:function jn(a,b,c){this.a=a
this.b=b
this.c=c},
jo:function jo(a,b){this.a=a
this.b=b},
jp:function jp(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jq:function jq(a,b,c){this.a=a
this.b=b
this.c=c},
jr:function jr(a,b,c){this.a=a
this.b=b
this.c=c},
js:function js(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
lI(a){return v.mangledGlobalNames[a]},
oM(a){throw A.V(A.kE(a),new Error())},
aW(){throw A.V(A.mk(""),new Error())},
kj(){throw A.V(A.kE(""),new Error())},
jz(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.c(A.aG(b.gdC(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].gl().c.a2()
o=q*16
n=o+16
B.a2.bs(s,o,n,p.a)
if(l)B.a2.bs(r,o,n,p.bh().a)}m=a.a
A.b(m,"uInstanceModels",new A.e(B.aY,s))
if(l)A.b(m,"uInstanceNormalMatrices",new A.e(B.aY,r))
A.b(m,"uUseInstances",B.aZ)}},B={}
var w=[A,J,B]
var $={}
A.jL.prototype={}
J.e7.prototype={
X(a,b){return a===b},
gK(a){return A.et(a)},
i(a){return"Instance of '"+A.eu(a)+"'"},
gG(a){return A.aV(A.k5(this))}}
J.e9.prototype={
i(a){return String(a)},
gK(a){return a?519018:218159},
gG(a){return A.aV(t.y)},
$iC:1,
$iz:1}
J.cJ.prototype={
X(a,b){return null==b},
i(a){return"null"},
gK(a){return 0},
$iC:1}
J.cL.prototype={$iH:1}
J.bk.prototype={
gK(a){return 0},
gG(a){return B.dr},
i(a){return String(a)}}
J.ep.prototype={}
J.bG.prototype={}
J.bj.prototype={
i(a){var s=a[$.lL()]
if(s==null)s=a[$.kk()]
if(s==null)return this.cu(a)
return"JavaScript function for "+J.bV(s)},
$iby:1}
J.cK.prototype={
gK(a){return 0},
i(a){return String(a)}}
J.cM.prototype={
gK(a){return 0},
i(a){return String(a)}}
J.t.prototype={
j(a,b){A.E(a).c.a(b)
a.$flags&1&&A.bu(a,29)
a.push(b)},
ae(a,b){var s
a.$flags&1&&A.bu(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aX(a[s],b)){a.splice(s,1)
return!0}return!1},
C(a,b){var s
A.E(a).h("k<1>").a(b)
a.$flags&1&&A.bu(a,"addAll",2)
if(Array.isArray(b)){this.cB(a,b)
return}for(s=J.a3(b);s.k();)a.push(s.gm())},
cB(a,b){var s,r
t.r.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.c(A.aA(a))
for(r=0;r<s;++r)a.push(b[r])},
Z(a){a.$flags&1&&A.bu(a,"clear","clear")
a.length=0},
V(a,b){if(!(b>=0&&b<a.length))return A.i(a,b)
return a[b]},
cr(a,b){var s
if(b<0||b>a.length)throw A.c(A.aS(b,0,a.length,"start",null))
s=a.length
if(b===s)return A.d([],A.E(a))
return A.d(a.slice(b,s),A.E(a))},
gan(a){var s=a.length
if(s===1){if(0>=s)return A.i(a,0)
return a[0]}if(s===0)throw A.c(A.jI())
throw A.c(A.kz())},
aH(a,b){var s,r
A.E(a).h("z(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.c(A.aA(a))}return!0},
af(a,b){var s,r,q,p,o,n=A.E(a)
n.h("h(1,1)?").a(b)
a.$flags&2&&A.bu(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.nP()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.eb()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.co(b,2))
if(p>0)this.d3(a,p)},
cp(a){return this.af(a,null)},
d3(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
dA(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.i(a,s)
if(J.aX(a[s],b))return s}return-1},
n(a,b){var s
for(s=0;s<a.length;++s)if(J.aX(a[s],b))return!0
return!1},
i(a){return A.jJ(a,"[","]")},
gu(a){return new J.ct(a,a.length,A.E(a).h("ct<1>"))},
gK(a){return A.et(a)},
gp(a){return a.length},
q(a,b){if(!(b>=0&&b<a.length))throw A.c(A.jd(a,b))
return a[b]},
D(a,b,c){A.E(a).c.a(c)
a.$flags&2&&A.bu(a)
if(!(b>=0&&b<a.length))throw A.c(A.jd(a,b))
a[b]=c},
bc(a,b){var s
A.E(a).h("z(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gG(a){return A.aV(A.E(a))},
$ik:1,
$ix:1}
J.e8.prototype={
e9(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.eu(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.h8.prototype={}
J.ct.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.A(q)
throw A.c(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iP:1}
J.c3.prototype={
J(a,b){var s
A.aN(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gau(b)
if(this.gau(a)===s)return 0
if(this.gau(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gau(a){return a===0?1/a<0:a<0},
bo(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.c(A.cg(""+a+".toInt()"))},
cf(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.c(A.cg(""+a+".round()"))},
a5(a,b,c){if(this.J(b,c)>0)throw A.c(A.oe(b))
if(this.J(a,b)<0)return b
if(this.J(a,c)>0)return c
return a},
a6(a,b){var s
if(b>20)throw A.c(A.aS(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gau(a))return"-"+s
return s},
e7(a,b){var s
if(b>20)throw A.c(A.aS(b,0,20,"fractionDigits",null))
s=a.toExponential(b)
if(a===0&&this.gau(a))return"-"+s
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
L(a,b){return a+b},
aN(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
a4(a,b){return(a|0)===a?a/b|0:this.d9(a,b)},
d9(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.c(A.cg("Result of truncating division is "+A.o(s)+": "+A.o(a)+" ~/ "+b))},
d7(a,b){var s
if(a>0)s=this.d6(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
d6(a,b){return b>31?0:a>>>b},
aM(a,b){return a<b},
gG(a){return A.aV(t.p)},
$iag:1,
$ir:1,
$iaf:1}
J.cI.prototype={
gG(a){return A.aV(t.S)},
$iC:1,
$ih:1}
J.ea.prototype={
gG(a){return A.aV(t.i)},
$iC:1}
J.bi.prototype={
a7(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
ct(a,b,c){return a.substring(b,A.mJ(b,c,a.length))},
cs(a,b){return this.ct(a,b,null)},
e8(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.i(p,0)
if(p.charCodeAt(0)===133){s=J.mi(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.i(p,r)
q=p.charCodeAt(r)===133?J.mj(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
J(a,b){var s
A.al(b)
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
gG(a){return A.aV(t.N)},
gp(a){return a.length},
$iC:1,
$iag:1,
$ikO:1,
$iv:1}
A.ch.prototype={
gu(a){return new A.cw(J.a3(this.gaE()),A.u(this).h("cw<1,2>"))},
gp(a){return J.bv(this.gaE())},
V(a,b){return A.u(this).y[1].a(J.jF(this.gaE(),b))},
i(a){return J.bV(this.gaE())}}
A.cw.prototype={
k(){return this.a.k()},
gm(){return this.$ti.y[1].a(this.a.gm())},
$iP:1}
A.dg.prototype={
q(a,b){return this.$ti.y[1].a(J.jE(this.a,b))},
$ix:1}
A.cx.prototype={
gaE(){return this.a}}
A.cN.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.i0.prototype={}
A.aB.prototype={}
A.Q.prototype={
gu(a){var s=this
return new A.ai(s,s.gp(s),A.u(s).h("ai<Q.E>"))},
al(a){var s,r=this,q=A.jN(A.u(r).h("Q.E"))
for(s=0;s<r.gp(r);++s)q.j(0,r.V(0,s))
return q}}
A.da.prototype={
gcV(){var s=J.bv(this.a),r=this.c
if(r==null||r>s)return s
return r},
gd8(){var s=J.bv(this.a),r=this.b
if(r>s)return s
return r},
gp(a){var s,r=J.bv(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
V(a,b){var s=this,r=s.gd8()+b
if(b<0||r>=s.gcV())throw A.c(A.h7(b,s.gp(0),s,"index"))
return J.jF(s.a,r)},
ci(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.jf(n),l=m.gp(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.kB(0,n):J.kA(0,n)}r=A.hb(s,m.V(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.D(r,q,m.V(n,o+q))
if(m.gp(n)<l)throw A.c(A.aA(p))}return r},
e6(a){return this.ci(0,!0)}}
A.ai.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.jf(q),o=p.gp(q)
if(r.b!==o)throw A.c(A.aA(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.V(q,s);++r.c
return!0},
$iP:1}
A.cR.prototype={
gu(a){var s=this.a
return new A.cS(s.gu(s),this.b,A.u(this).h("cS<1,2>"))},
gp(a){var s=this.a
return s.gp(s)},
V(a,b){var s=this.a
return this.b.$1(s.V(s,b))}}
A.cS.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gm())
return!0}s.a=null
return!1},
gm(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iP:1}
A.a6.prototype={
gp(a){return J.bv(this.a)},
V(a,b){return this.b.$1(J.jF(this.a,b))}}
A.a1.prototype={
gu(a){return new A.G(J.a3(this.a),this.b,this.$ti.h("G<1>"))}}
A.G.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gm()))return!0
return!1},
gm(){return this.a.gm()},
$iP:1}
A.ah.prototype={}
A.d6.prototype={
gp(a){return J.bv(this.a)},
V(a,b){var s=this.a,r=J.jf(s)
return r.V(s,r.gp(s)-1-b)}}
A.dF.prototype={}
A.ak.prototype={$r:"+(1,2)",$s:1}
A.dq.prototype={$r:"+influence,light(1,2)",$s:2}
A.dr.prototype={$r:"+influence,source(1,2)",$s:3}
A.cB.prototype={}
A.cA.prototype={
i(a){return A.he(this)},
gaq(){return new A.aU(this.dv(),A.u(this).h("aU<aa<1,2>>"))},
dv(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gaq(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gac(),o=o.gu(o),n=A.u(s),m=n.y[1],n=n.h("aa<1,2>")
case 2:if(!o.k()){r=3
break}l=o.gm()
k=s.q(0,l)
r=4
return a.b=new A.aa(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iar:1}
A.O.prototype={
gp(a){return this.b.length},
gbK(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
ap(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
q(a,b){if(!this.ap(b))return null
return this.b[this.a[b]]},
ar(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbK()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gac(){return new A.bI(this.gbK(),this.$ti.h("bI<1>"))},
gck(){return new A.bI(this.b,this.$ti.h("bI<2>"))}}
A.bI.prototype={
gp(a){return this.a.length},
gu(a){var s=this.a
return new A.bJ(s,s.length,this.$ti.h("bJ<1>"))}}
A.bJ.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iP:1}
A.cC.prototype={
j(a,b){A.u(this).c.a(b)
A.m4()}}
A.aQ.prototype={
gp(a){return this.b},
gc8(a){return this.b!==0},
gu(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.bJ(s,s.length,r.$ti.h("bJ<1>"))},
n(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
al(a){return A.jO(this,this.$ti.c)}}
A.d7.prototype={}
A.i6.prototype={
a0(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.cZ.prototype={
i(a){return"Null check operator used on a null value"}}
A.eb.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.eP.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hp.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.cF.prototype={}
A.du.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibp:1}
A.bf.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.lJ(r==null?"unknown":r)+"'"},
gG(a){var s=A.kd(this)
return A.aV(s==null?A.bS(this):s)},
$iby:1,
gea(){return this},
$C:"$1",
$R:1,
$D:null}
A.dR.prototype={$C:"$0",$R:0}
A.dS.prototype={$C:"$2",$R:2}
A.eL.prototype={}
A.eI.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.lJ(s)+"'"}}
A.bX.prototype={
X(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bX))return!1
return this.$_target===b.$_target&&this.a===b.a},
gK(a){return(A.ju(this.a)^A.et(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.eu(this.a)+"'")}}
A.ez.prototype={
i(a){return"RuntimeError: "+this.a}}
A.aZ.prototype={
gp(a){return this.a},
gac(){return new A.b0(this,A.u(this).h("b0<1>"))},
ap(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dD(a)},
dD(a){var s=this.d
if(s==null)return!1
return this.aI(this.bH(s,a),a)>=0},
q(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dE(b)},
dE(a){var s,r,q=this.d
if(q==null)return null
s=this.bH(q,a)
r=this.aI(s,a)
if(r<0)return null
return s[r].b},
D(a,b,c){var s,r,q=this,p=A.u(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bw(s==null?q.b=q.aZ():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bw(r==null?q.c=q.aZ():r,b,c)}else q.dG(b,c)},
dG(a,b){var s,r,q,p,o=this,n=A.u(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.aZ()
r=o.bd(a)
q=s[r]
if(q==null)s[r]=[o.b_(a,b)]
else{p=o.aI(q,a)
if(p>=0)q[p].b=b
else q.push(o.b_(a,b))}},
bj(a,b){var s,r,q=this,p=A.u(q)
p.c.a(a)
p.h("2()").a(b)
if(q.ap(a)){s=q.q(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.D(0,a,r)
return r},
ae(a,b){if((b&0x3fffffff)===b)return this.cz(this.c,b)
else return this.dF(b)},
dF(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.bd(a)
r=n[s]
q=o.aI(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.bu(p)
if(r.length===0)delete n[s]
return p.b},
Z(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aY()}},
ar(a,b){var s,r,q=this
A.u(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.c(A.aA(q))
s=s.c}},
bw(a,b,c){var s,r=A.u(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.b_(b,c)
else s.b=c},
cz(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.bu(s)
delete a[b]
return s.b},
aY(){this.r=this.r+1&1073741823},
b_(a,b){var s=this,r=A.u(s),q=new A.h9(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.aY()
return q},
bu(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.aY()},
bd(a){return J.M(a)&1073741823},
bH(a,b){return a[this.bd(b)]},
aI(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aX(a[r].a,b))return r
return-1},
i(a){return A.he(this)},
aZ(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ikF:1}
A.h9.prototype={}
A.b0.prototype={
gp(a){return this.a.a},
gu(a){var s=this.a
return new A.cP(s,s.r,s.e,this.$ti.h("cP<1>"))}}
A.cP.prototype={
gm(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.aA(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iP:1}
A.b2.prototype={
gp(a){return this.a.a},
gu(a){var s=this.a
return new A.b1(s,s.r,s.e,this.$ti.h("b1<1>"))}}
A.b1.prototype={
gm(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.aA(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iP:1}
A.b_.prototype={
gp(a){return this.a.a},
gu(a){var s=this.a
return new A.cO(s,s.r,s.e,this.$ti.h("cO<1,2>"))}}
A.cO.prototype={
gm(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.aA(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.aa(s.a,s.b,r.$ti.h("aa<1,2>"))
r.c=s.c
return!0}},
$iP:1}
A.jh.prototype={
$1(a){return this.a(a)},
$S:21}
A.ji.prototype={
$2(a,b){return this.a(a,b)},
$S:17}
A.jj.prototype={
$1(a){return this.a(A.al(a))},
$S:16}
A.bd.prototype={
gG(a){return A.aV(this.bJ())},
bJ(){return A.op(this.$r,this.bI())},
i(a){return this.bY(!1)},
bY(a){var s,r,q,p,o,n=this.cW(),m=this.bI(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.i(m,q)
o=m[q]
l=a?l+A.kR(o):l+A.o(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cW(){var s,r=this.$s
while($.iA.length<=r)B.b.j($.iA,null)
s=$.iA[r]
if(s==null){s=this.cN()
B.b.D($.iA,r,s)}return s},
cN(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.jK(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.b.D(j,q,r[s])}}return A.hd(j,k)}}
A.bq.prototype={
bI(){return[this.a,this.b]},
X(a,b){if(b==null)return!1
return b instanceof A.bq&&this.$s===b.$s&&J.aX(this.a,b.a)&&J.aX(this.b,b.b)},
gK(a){return A.c6(this.$s,this.a,this.b,B.h,B.h,B.h)}}
A.c5.prototype={
gG(a){return B.dj},
$iC:1}
A.cX.prototype={
d_(a,b,c,d){var s=A.aS(b,0,c,d,null)
throw A.c(s)},
by(a,b,c,d){if(b>>>0!==b||b>c)this.d_(a,b,c,d)}}
A.ef.prototype={
gG(a){return B.dk},
$iC:1}
A.a7.prototype={
gp(a){return a.length},
$iaq:1}
A.cV.prototype={
q(a,b){A.bN(b,a,a.length)
return a[b]},
bs(a,b,c,d){var s,r,q,p
t.bM.a(d)
a.$flags&2&&A.bu(a,5)
s=a.length
this.by(a,b,s,"start")
this.by(a,c,s,"end")
if(b>c)A.l(A.aS(b,0,c,null,null))
r=c-b
q=d.length
if(q<r)A.l(A.m("Not enough elements"))
p=q!==r?d.subarray(0,r):d
a.set(p,b)
return},
$ik:1,
$ix:1}
A.cW.prototype={$ik:1,$ix:1}
A.cU.prototype={
gG(a){return B.dl},
$iC:1,
$ifR:1}
A.eg.prototype={
gG(a){return B.dm},
$iC:1,
$ifS:1}
A.eh.prototype={
gG(a){return B.dn},
q(a,b){A.bN(b,a,a.length)
return a[b]},
$iC:1}
A.ei.prototype={
gG(a){return B.dp},
q(a,b){A.bN(b,a,a.length)
return a[b]},
$iC:1}
A.ej.prototype={
gG(a){return B.dq},
q(a,b){A.bN(b,a,a.length)
return a[b]},
$iC:1}
A.ek.prototype={
gG(a){return B.dt},
q(a,b){A.bN(b,a,a.length)
return a[b]},
$iC:1}
A.el.prototype={
gG(a){return B.du},
q(a,b){A.bN(b,a,a.length)
return a[b]},
$iC:1}
A.cY.prototype={
gG(a){return B.dv},
gp(a){return a.length},
q(a,b){A.bN(b,a,a.length)
return a[b]},
$iC:1}
A.em.prototype={
gG(a){return B.dw},
gp(a){return a.length},
q(a,b){A.bN(b,a,a.length)
return a[b]},
$iC:1,
$ieN:1}
A.dl.prototype={}
A.dm.prototype={}
A.dn.prototype={}
A.dp.prototype={}
A.aJ.prototype={
h(a){return A.dz(v.typeUniverse,this,a)},
N(a){return A.lj(v.typeUniverse,this,a)}}
A.f7.prototype={}
A.iG.prototype={
i(a){return A.ax(this.a,null)}}
A.f5.prototype={
i(a){return this.a}}
A.dv.prototype={$ib8:1}
A.ih.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:10}
A.ig.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:18}
A.ii.prototype={
$0(){this.a.$0()},
$S:11}
A.ij.prototype={
$0(){this.a.$0()},
$S:11}
A.iE.prototype={
cw(a,b){if(self.setTimeout!=null)self.setTimeout(A.co(new A.iF(this,b),0),a)
else throw A.c(A.cg("`setTimeout()` not found."))}}
A.iF.prototype={
$0(){this.b.$0()},
$S:1}
A.eW.prototype={
b0(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.aP(a)
else{s=r.a
if(q.h("bz<1>").b(a))s.bx(a)
else s.bC(a)}},
b1(a,b){var s=this.a
if(this.b)s.aT(new A.az(a,b))
else s.aQ(new A.az(a,b))}}
A.iM.prototype={
$1(a){return this.a.$2(0,a)},
$S:6}
A.iN.prototype={
$2(a,b){this.a.$2(1,new A.cF(a,t.l.a(b)))},
$S:23}
A.j7.prototype={
$2(a,b){this.a(A.a(a),b)},
$S:30}
A.aM.prototype={
gm(){var s=this.b
return s==null?this.$ti.c.a(s):s},
d4(a,b){var s,r,q
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
o.d=null}q=o.d4(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.ld
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
o.a=A.ld
throw n
return!1}if(0>=p.length)return A.i(p,-1)
o.a=p.pop()
m=1
continue}throw A.c(A.m("sync*"))}return!1},
ec(a){var s,r,q=this
if(a instanceof A.aU){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.j(r,q.a)
q.a=s
return 2}else{q.d=J.a3(a)
return 2}},
$iP:1}
A.aU.prototype={
gu(a){return new A.aM(this.a(),this.$ti.h("aM<1>"))}}
A.az.prototype={
i(a){return A.o(this.a)},
$iK:1,
gaz(){return this.b}}
A.f0.prototype={
b1(a,b){var s=this.a
if((s.a&30)!==0)throw A.c(A.m("Future already completed"))
s.aQ(A.nO(a,b))},
c4(a){return this.b1(a,null)}}
A.df.prototype={
b0(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.c(A.m("Future already completed"))
s.aP(r.h("1/").a(a))}}
A.bH.prototype={
dM(a){if((this.c&15)!==6)return!0
return this.b.b.bm(t.al.a(this.d),a.a,t.y,t.K)},
dz(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.d.b(q))p=l.e3(q,m,a.b,o,n,t.l)
else p=l.bm(t.x.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.bU(s))){if((r.c&1)!==0)throw A.c(A.j("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.c(A.j("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.U.prototype={
cg(a,b,c){var s,r,q=this.$ti
q.N(c).h("1/(2)").a(a)
s=$.L
if(s===B.q){if(!t.d.b(b)&&!t.x.b(b))throw A.c(A.aG(b,"onError",u.c))}else{c.h("@<0/>").N(q.c).h("1(2)").a(a)
b=A.o3(b,s)}r=new A.U(s,c.h("U<0>"))
this.aO(new A.bH(r,3,a,b,q.h("@<1>").N(c).h("bH<1,2>")))
return r},
bV(a,b,c){var s,r=this.$ti
r.N(c).h("1/(2)").a(a)
s=new A.U($.L,c.h("U<0>"))
this.aO(new A.bH(s,19,a,b,r.h("@<1>").N(c).h("bH<1,2>")))
return s},
d5(a){this.a=this.a&1|16
this.c=a},
aA(a){this.a=a.a&30|this.a&1
this.c=a.c},
aO(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aO(a)
return}r.aA(s)}A.fw(null,null,r.b,t.M.a(new A.io(r,a)))}},
bM(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bM(a)
return}m.aA(n)}l.a=m.aD(a)
A.fw(null,null,m.b,t.M.a(new A.is(l,m)))}},
aC(){var s=t.F.a(this.c)
this.c=null
return this.aD(s)},
aD(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bC(a){var s,r=this
r.$ti.c.a(a)
s=r.aC()
r.a=8
r.c=a
A.ci(r,s)},
cM(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aC()
q.aA(a)
A.ci(q,r)},
aT(a){var s=this.aC()
this.d5(a)
A.ci(this,s)},
aP(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bz<1>").b(a)){this.bx(a)
return}this.cC(a)},
cC(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.fw(null,null,s.b,t.M.a(new A.iq(s,a)))},
bx(a){A.jV(this.$ti.h("bz<1>").a(a),this,!1)
return},
aQ(a){this.a^=2
A.fw(null,null,this.b,t.M.a(new A.ip(this,a)))},
$ibz:1}
A.io.prototype={
$0(){A.ci(this.a,this.b)},
$S:1}
A.is.prototype={
$0(){A.ci(this.b,this.a.a)},
$S:1}
A.ir.prototype={
$0(){A.jV(this.a.a,this.b,!0)},
$S:1}
A.iq.prototype={
$0(){this.a.bC(this.b)},
$S:1}
A.ip.prototype={
$0(){this.a.aT(this.b)},
$S:1}
A.iv.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.e2(t.fO.a(q.d),t.A)}catch(p){s=A.bU(p)
r=A.cr(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jG(q)
n=k.a
n.c=new A.az(q,o)
q=n}q.b=!0
return}if(j instanceof A.U&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.U){m=k.b.a
l=new A.U(m.b,m.$ti)
j.cg(new A.iw(l,m),new A.ix(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:1}
A.iw.prototype={
$1(a){this.a.cM(this.b)},
$S:10}
A.ix.prototype={
$2(a,b){A.dG(a)
t.l.a(b)
this.a.aT(new A.az(a,b))},
$S:31}
A.iu.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bm(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.bU(l)
r=A.cr(l)
q=s
p=r
if(p==null)p=A.jG(q)
o=this.a
o.c=new A.az(q,p)
o.b=!0}},
$S:1}
A.it.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.dM(s)&&p.a.e!=null){p.c=p.a.dz(s)
p.b=!1}}catch(o){r=A.bU(o)
q=A.cr(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jG(p)
m=l.b
m.c=new A.az(p,n)
p=m}p.b=!0}},
$S:1}
A.eX.prototype={}
A.fm.prototype={}
A.dE.prototype={$il7:1}
A.fg.prototype={
e4(a){var s,r,q
t.M.a(a)
try{if(B.q===$.L){a.$0()
return}A.lw(null,null,this,a,t.H)}catch(q){s=A.bU(q)
r=A.cr(q)
A.k9(A.dG(s),t.l.a(r))}},
dj(a){return new A.iB(this,t.M.a(a))},
e2(a,b){b.h("0()").a(a)
if($.L===B.q)return a.$0()
return A.lw(null,null,this,a,b)},
bm(a,b,c,d){c.h("@<0>").N(d).h("1(2)").a(a)
d.a(b)
if($.L===B.q)return a.$1(b)
return A.o5(null,null,this,a,b,c,d)},
e3(a,b,c,d,e,f){d.h("@<0>").N(e).N(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.L===B.q)return a.$2(b,c)
return A.o4(null,null,this,a,b,c,d,e,f)},
cd(a,b,c,d){return b.h("@<0>").N(c).N(d).h("1(2,3)").a(a)}}
A.iB.prototype={
$0(){return this.a.e4(this.b)},
$S:1}
A.j6.prototype={
$0(){A.m9(this.a,this.b)},
$S:1}
A.dh.prototype={
gp(a){return this.a},
gac(){return new A.di(this,this.$ti.h("di<1>"))},
ap(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.cP(a)},
cP(a){var s=this.d
if(s==null)return!1
return this.a9(this.bB(s,a),a)>=0},
q(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.l9(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.l9(q,b)
return r}else return this.cY(b)},
cY(a){var s,r,q=this.d
if(q==null)return null
s=this.bB(q,a)
r=this.a9(s,a)
return r<0?null:s[r+1]},
D(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.bA(s==null?m.b=A.jW():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.bA(r==null?m.c=A.jW():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.jW()
p=A.ju(b)&1073741823
o=q[p]
if(o==null){A.jX(q,p,[b,c]);++m.a
m.e=null}else{n=m.a9(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
ar(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.bD()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.q(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.c(A.aA(m))}},
bD(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.hb(i.a,null,!1,t.A)
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
bA(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.jX(a,b,c)},
bB(a,b){return a[A.ju(b)&1073741823]}}
A.dk.prototype={
a9(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.di.prototype={
gp(a){return this.a.a},
gu(a){var s=this.a
return new A.dj(s,s.bD(),this.$ti.h("dj<1>"))}}
A.dj.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.c(A.aA(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iP:1}
A.aL.prototype={
d0(){return new A.aL(A.u(this).h("aL<1>"))},
gu(a){var s=this,r=new A.bK(s,s.r,A.u(s).h("bK<1>"))
r.c=s.e
return r},
gp(a){return this.a},
n(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cO(b)},
cO(a){var s=this.d
if(s==null)return!1
return this.a9(s[this.aU(a)],a)>=0},
j(a,b){var s,r,q=this
A.u(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bz(s==null?q.b=A.jZ():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bz(r==null?q.c=A.jZ():r,b)}else return q.cA(b)},
cA(a){var s,r,q,p=this
A.u(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jZ()
r=p.aU(a)
q=s[r]
if(q==null)s[r]=[p.aS(a)]
else{if(p.a9(q,a)>=0)return!1
q.push(p.aS(a))}return!0},
ae(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bN(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bN(s.c,b)
else return s.d2(b)},
d2(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.aU(a)
r=n[s]
q=o.a9(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bZ(p)
return!0},
Z(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aR()}},
bz(a,b){A.u(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aS(b)
return!0},
bN(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bZ(s)
delete a[b]
return!0},
aR(){this.r=this.r+1&1073741823},
aS(a){var s,r=this,q=new A.fa(A.u(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aR()
return q},
bZ(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aR()},
aU(a){return J.M(a)&1073741823},
a9(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aX(a[r].a,b))return r
return-1},
$ikH:1}
A.fa.prototype={}
A.bK.prototype={
gm(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.c(A.aA(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iP:1}
A.ha.prototype={
$2(a,b){this.a.D(0,this.b.a(a),this.c.a(b))},
$S:36}
A.D.prototype={
gu(a){return new A.ai(a,this.gp(a),A.bS(a).h("ai<D.E>"))},
V(a,b){return this.q(a,b)},
aH(a,b){var s,r
A.bS(a).h("z(D.E)").a(b)
s=this.gp(a)
for(r=0;r<s;++r){if(!b.$1(this.q(a,r)))return!1
if(s!==this.gp(a))throw A.c(A.aA(a))}return!0},
i(a){return A.jJ(a,"[","]")}}
A.bB.prototype={
ar(a,b){var s,r,q,p=A.u(this)
p.h("~(1,2)").a(b)
for(s=this.gac(),s=s.gu(s),p=p.y[1];s.k();){r=s.gm()
q=this.q(0,r)
b.$2(r,q==null?p.a(q):q)}},
gp(a){var s=this.gac()
return s.gp(s)},
i(a){return A.he(this)},
$iar:1}
A.hf.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.o(a)
r.a=(r.a+=s)+": "
s=A.o(b)
r.a+=s},
$S:59}
A.dA.prototype={}
A.c4.prototype={
q(a,b){return this.a.q(0,b)},
gp(a){return this.a.a},
gac(){var s=this.a
return new A.b0(s,A.u(s).h("b0<1>"))},
i(a){return A.he(this.a)},
gck(){var s=this.a
return new A.b2(s,A.u(s).h("b2<2>"))},
gaq(){var s=this.a
return new A.b_(s,A.u(s).h("b_<1,2>"))},
$iar:1}
A.db.prototype={}
A.b7.prototype={
gc8(a){return this.gp(this)!==0},
C(a,b){var s
for(s=J.a3(A.u(this).h("k<1>").a(b));s.k();)this.j(0,s.gm())},
c5(a){var s,r,q=this.al(0)
for(s=this.gu(this);s.k();){r=s.gm()
if(a.n(0,r))q.ae(0,r)}return q},
i(a){return A.jJ(this,"{","}")},
dK(a,b){var s,r,q=this.gu(this)
if(!q.k())return""
s=J.bV(q.gm())
if(!q.k())return s
if(b.length===0){r=s
do r+=A.o(q.gm())
while(q.k())}else{r=s
do r=r+b+A.o(q.gm())
while(q.k())}return r.charCodeAt(0)==0?r:r},
df(a,b){var s
A.u(this).h("z(1)").a(b)
for(s=this.gu(this);s.k();)if(b.$1(s.gm()))return!0
return!1},
V(a,b){var s,r
A.hK(b,"index")
s=this.gu(this)
for(r=b;s.k();){if(r===0)return s.gm();--r}throw A.c(A.h7(b,b-r,this,"index"))},
$ik:1,
$ibo:1}
A.ds.prototype={
al(a){var s=this.d0()
s.C(0,this)
return s}}
A.fp.prototype={
j(a,b){this.$ti.c.a(b)
return A.nv()}}
A.dc.prototype={
gp(a){return this.a.a},
gu(a){var s=this.a
return A.jY(s,s.r,A.u(s).c)},
al(a){return this.a.al(0)}}
A.ck.prototype={}
A.dB.prototype={}
A.bw.prototype={
X(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bw)if(this.a===b.a)s=this.b===b.b
return s},
gK(a){return A.c6(this.a,this.b,B.h,B.h,B.h,B.h)},
J(a,b){var s
t.df.a(b)
s=B.i.J(this.a,b.a)
if(s!==0)return s
return B.i.J(this.b,b.b)},
i(a){var s=this,r=A.m5(A.mD(s)),q=A.dU(A.mB(s)),p=A.dU(A.mx(s)),o=A.dU(A.my(s)),n=A.dU(A.mA(s)),m=A.dU(A.mC(s)),l=A.ky(A.mz(s)),k=s.b,j=k===0?"":A.ky(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iag:1}
A.ik.prototype={
i(a){return this.v()}}
A.K.prototype={
gaz(){return A.mw(this)}}
A.dM.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.fM(s)
return"Assertion failed"}}
A.b8.prototype={}
A.aP.prototype={
gaX(){return"Invalid argument"+(!this.a?"(s)":"")},
gaW(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.o(p),n=s.gaX()+q+o
if(!s.a)return n
return n+s.gaW()+": "+A.fM(s.gbe())},
gbe(){return this.b}}
A.d1.prototype={
gbe(){return A.lm(this.b)},
gaX(){return"RangeError"},
gaW(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.o(q):""
else if(q==null)s=": Not greater than or equal to "+A.o(r)
else if(q>r)s=": Not in inclusive range "+A.o(r)+".."+A.o(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.o(r)
return s}}
A.e6.prototype={
gbe(){return A.a(this.b)},
gaX(){return"RangeError"},
gaW(){if(A.a(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gp(a){return this.f}}
A.dd.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.eO.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.ce.prototype={
i(a){return"Bad state: "+this.a}}
A.dT.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.fM(s)+"."}}
A.d9.prototype={
i(a){return"Stack Overflow"},
gaz(){return null},
$iK:1}
A.il.prototype={
i(a){return"Exception: "+this.a}}
A.fT.prototype={
i(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.k.prototype={
bb(a,b,c,d){var s,r
d.a(b)
A.u(this).N(d).h("1(1,k.E)").a(c)
for(s=this.gu(this),r=b;s.k();)r=c.$2(r,s.gm())
return r},
gp(a){var s,r=this.gu(this)
for(s=0;r.k();)++s
return s},
gan(a){var s,r=this.gu(this)
if(!r.k())throw A.c(A.jI())
s=r.gm()
if(r.k())throw A.c(A.kz())
return s},
dw(a,b){var s,r
A.u(this).h("z(k.E)").a(b)
for(s=this.gu(this);s.k();){r=s.gm()
if(b.$1(r))return r}throw A.c(A.jI())},
V(a,b){var s,r
A.hK(b,"index")
s=this.gu(this)
for(r=b;s.k();){if(r===0)return s.gm();--r}throw A.c(A.h7(b,b-r,this,"index"))},
i(a){return A.mg(this,"(",")")}}
A.aa.prototype={
i(a){return"MapEntry("+A.o(this.a)+": "+A.o(this.b)+")"}}
A.Y.prototype={
gK(a){return A.w.prototype.gK.call(this,0)},
i(a){return"null"}}
A.w.prototype={$iw:1,
X(a,b){return this===b},
gK(a){return A.et(this)},
i(a){return"Instance of '"+A.eu(this)+"'"},
gG(a){return A.kf(this)},
toString(){return this.i(this)}}
A.fn.prototype={
i(a){return""},
$ibp:1}
A.eJ.prototype={
gp(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.ho.prototype={
i(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.jv.prototype={
$1(a){return this.a.b0(this.b.h("0/?").a(a))},
$S:6}
A.jw.prototype={
$1(a){if(a==null)return this.a.c4(new A.ho(a===undefined))
return this.a.c4(a)},
$S:6}
A.jb.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.lv(a))return a
s=this.a
a.toString
if(s.ap(a))return s.q(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.l(A.aS(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.bP(!0,"isUtc",t.y)
return new A.bw(r,0,!0)}if(a instanceof RegExp)throw A.c(A.j("structured clone of RegExp",null))
if(a instanceof Promise)return A.oF(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.b3(p,p)
s.D(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.cq(n),p=s.gu(n);p.k();)m.push(A.cp(p.gm()))
for(l=0;l<s.gp(n);++l){k=s.q(n,l)
if(!(l<m.length))return A.i(m,l)
j=m[l]
if(k!=null)o.D(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.D(0,a,o)
h=A.a(a.length)
for(s=J.cq(i),l=0;l<h;++l)o.push(this.$1(s.q(i,l)))
return o}return a},
$S:60}
A.hN.prototype={}
A.c9.prototype={
v(){return"QualityProfileKind."+this.b}}
A.at.prototype={}
A.fF.prototype={}
A.fG.prototype={}
A.cf.prototype={
v(){return"ToneMappingMode."+this.b}}
A.eq.prototype={
A(){var s,r,q,p,o,n,m,l,k,j=this,i=null
for(s=j.r,r=j.w,q=j.x,p=j.y,o=j.z,n=A.kG(["exposure",j.a,"bloomStrength",j.b,"ssaoStrength",j.c,"depthOfFieldStrength",j.d,"vignette",j.e,"grain",j.f,"rainIntensity",s,"surfaceWetness",r,"surfaceSnowCoverage",q,"surfaceDissolution",p,"rainWindowVisibility",o,"ditherStrength",j.Q,"colorGradeStrength",j.as,"affineWarpStrength",j.at,"vertexSnapGrid",j.ax,"vhsChromaWeight",j.ch,"vhsTrackingWeight",j.CW,"vhsNoiseWeight",j.cx,"vhsHeadSwitchWeight",j.cy,"vhsDropoutWeight",j.db,"vhsGhostWeight",j.dx],t.N,t.i),n=new A.b_(n,A.u(n).h("b_<1,2>")).gu(0);n.k();){m=n.d
l=m.a
k=m.b
if(!isFinite(k)||k<0)throw A.c(A.j("PostProcessState."+l+" must be >= 0: "+A.o(k),i))}n=j.ay
if(n<1||n>8)throw A.c(A.j("PostProcessState.quantizationBits must be in [1, 8]: "+n,i))
if(s>1)throw A.c(A.j("PostProcessState.rainIntensity must be in [0, 1]: "+s,i))
if(r>1)throw A.c(A.j("PostProcessState.surfaceWetness must be in [0, 1]: "+r,i))
if(q>1)throw A.c(A.j("PostProcessState.surfaceSnowCoverage must be in [0, 1]: "+q,i))
if(p>1)throw A.c(A.j("PostProcessState.surfaceDissolution must be in [0, 1]: "+p,i))
if(o>1)throw A.c(A.j("PostProcessState.rainWindowVisibility must be in [0, 1]: "+o,i))}}
A.cv.prototype={
gc7(){var s,r=this,q=r.x
if(q===$){s=r.b.bg()
r.x!==$&&A.kj()
r.x=s
q=s}return q},
gdI(){var s,r=this,q=r.z
if(q===$){s=r.c.bg()
r.z!==$&&A.kj()
r.z=s
q=s}return q},
A(){var s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=i.d
if(!g.gF(0))throw A.c(A.j("CameraView.eye must be finite: "+g.i(0),h))
g=i.e
if(!g.gF(0)||g.ga_()<1e-12)throw A.c(A.j("CameraView.forward must be finite and nonzero: "+g.i(0),h))
g=i.f
if(isFinite(g)){s=i.r
s=!isFinite(s)||g<=0||s<=g}else s=!0
if(s)throw A.c(A.j("CameraView requires 0 < near < far, got "+A.o(g)+"/"+i.r,h))
g=i.w
if(!isFinite(g)||g<=0)throw A.c(A.j("CameraView.aspect must be finite and > 0: "+A.o(g),h))
g=i.a
if(!g.gF(0)||!i.b.gF(0)||!i.c.gF(0))throw A.c(A.j("CameraView matrices must be finite",h))
for(s=i.c.a,r=s.length,g=i.b.t(0,g).a,q=g.length,p=0,o=-1,n=0;n<16;++n){if(!(n<r))return A.i(s,n)
m=s[n]
if(!(n<q))return A.i(g,n)
l=g[n]
k=Math.abs(m-l)/(1+Math.abs(l))
if(k>p){o=n
p=k}}if(p>0.0001){m=B.k.e7(p,2)
l=B.i.a4(o,4)
j=B.i.aN(o,4)
if(!(o>=0&&o<r))return A.i(s,o)
s=s[o]
if(!(o<q))return A.i(g,o)
throw A.c(A.j("CameraView.viewProjection must equal projection * view. Worst relative mismatch "+m+" at column "+l+" row "+j+" (got "+A.o(s)+", expected "+A.o(g[o])+"). Prefer CameraView.look/lookAt/fromMatrices, which derive it.",h))}}}
A.eF.prototype={}
A.e0.prototype={
A(){var s,r,q,p,o,n,m,l,k,j=this,i=null
if(!j.a.gF(0)||!j.b.gF(0)||!j.fx.gF(0)||!j.r.gF(0)||!j.dx.gF(0))throw A.c(A.j("FrameEnvironment colors must be finite",i))
if(j.k4!=null){s=!0
if(B.t.e8("showcase_sky").length!==0)if(B.aD.gF(0))if(B.bY.gF(0))if(B.aE.gF(0))if(isFinite(0.12))if(isFinite(0.005))if(isFinite(0))if(isFinite(1))if(isFinite(0.32))if(isFinite(0.4))if(isFinite(650))if(isFinite(350))if(isFinite(0.0012))if(Math.abs(0)<=1000)if(isFinite(0.55))s=!isFinite(0.25)
if(s)A.l(A.j("SkyboxDeclaration contains invalid values",i))}s=j.c
if(isFinite(s)){r=j.d
r=!isFinite(r)||r<s}else r=!0
if(r)throw A.c(A.j("FrameEnvironment requires fogEnd >= fogStart, got "+s+"/"+j.d,i))
s=j.fy
if(!isFinite(s))throw A.c(A.j("FrameEnvironment.ambientIntensity must be >= 0: "+s,i))
if(j.go!=null){if(!B.G.gF(0)||B.G.ga_()<1e-12)A.l(A.j("DirectionalLight.direction must be finite and nonzero: "+B.G.i(0),i))
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
if(!n)A.l(A.j("SpotLight.direction must be finite and nonzero: "+B.p.i(0),i))}s=t.N
m=A.an(s)
for(r=j.k2,q=0;!1;++q){l=r[q]
l.A()
if(!m.j(0,l.gB()))throw A.c(A.j("FrameEnvironment.volumetricSources contains duplicate id: "+A.o(l.gB()),i))}r=j.w
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
if(r)throw A.c(A.j("invalid volumetric medium controls",i))
k=A.an(s)
for(s=j.k3,q=0;!1;++q){l=s[q]
l.A()
if(!k.j(0,l.gB()))throw A.c(A.j("FrameEnvironment.thermalSources contains duplicate id: "+A.o(l.gB()),i))}},
b2(a,b,c,d,e,f,g,h,i){var s,r,q,p,o,n,m,l,k,j=this
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
return new A.e0(s,j.b,j.c,j.d,j.e,j.f,j.r,j.w,j.x,j.y,j.z,j.Q,j.as,j.at,j.ax,j.ay,j.ch,j.CW,j.cx,j.cy,j.db,r,q,p,o,n,m,l,j.k1,j.k2,j.k3,k)},
dn(a){var s=null
return this.b2(s,s,s,B.B,s,s,s,s,a)},
dq(a,b,c,d,e,f,g){return this.b2(a,b,c,d,null,e,f,g,B.B)},
dm(a){var s=null
return this.b2(s,s,s,B.B,a,s,s,s,B.B)}}
A.fV.prototype={}
A.fW.prototype={
bf(a){++this.b}}
A.b6.prototype={
X(a,b){if(b==null)return!1
return J.dL(b)===A.kf(this)&&b instanceof A.b6&&this.a===b.a&&this.b===b.b},
gK(a){return A.c6(A.kf(this),this.a,this.b,B.h,B.h,B.h)}}
A.as.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MeshHandle(#"+this.a+"."+this.b+s+")"}}
A.av.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"TextureHandle(#"+this.a+"."+this.b+s+")"}}
A.aR.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MaterialHandle(#"+this.a+"."+this.b+s+")"}}
A.eo.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"PipelineHandle(#"+this.a+"."+this.b+s+")"}}
A.bh.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.c2.prototype={
v(){return"HandleRejection."+this.b}}
A.h6.prototype={
i(a){return"HandleException("+this.a.b+", "+this.b.i(0)+")"}}
A.c8.prototype={
i(a){var s=this.b,r=this.a.a
return s==null?r.b+": ok":r.b+": "+A.o(s)}}
A.dP.prototype={}
A.jc.prototype={
$1(a){return t.W.a(a)===this.a},
$S:63}
A.T.prototype={
gF(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
X(a,b){if(b==null)return!1
return b instanceof A.T&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gK(a){return A.c6(this.a,this.b,this.c,B.h,B.h,B.h)},
i(a){return"LinearColor("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.dX.prototype={}
A.bn.prototype={}
A.ap.prototype={}
A.jx.prototype={
$2(a,b){var s,r=t.fk
r.a(a)
s=B.k.J(r.a(b).a,a.a)
return s===0?0:s},
$S:15}
A.fA.prototype={
v(){return"AlphaMode."+this.b}}
A.ed.prototype={
v(){return"MaterialMapColorSpace."+this.b}}
A.bC.prototype={
A(){var s,r,q,p,o,n=this,m=null
if(n.a.length===0)throw A.c(A.j("MaterialDefinition.key must not be empty",m))
if(!isFinite(0))throw A.c(A.j("MaterialDefinition.emissiveStrength must be >= 0: 0",m))
if(!isFinite(1))throw A.c(A.j("MaterialDefinition.normalStrength must be >= 0: 1",m))
A.ec("roughness",n.at)
A.ec("metallic",n.ax)
A.ec("occlusionStrength",1)
A.ec("clearcoatStrength",n.ch)
A.ec("clearcoatRoughness",n.CW)
for(s=[new A.ak("uvScaleU",1),new A.ak("uvScaleV",1),new A.ak("uvOffsetU",0),new A.ak("uvOffsetV",0),new A.ak("tintR",n.d),new A.ak("tintG",n.e),new A.ak("tintB",n.f)],r=0;r<7;++r){q=s[r]
p=q.a
o=q.b
if(!isFinite(o))throw A.c(A.j("MaterialDefinition."+p+" must be finite: "+A.o(o),m))}if(!isFinite(0.5))throw A.c(A.j("MaterialDefinition.alphaCutoff must be in (0, 1]: 0.5",m))}}
A.bb.prototype={
v(){return"VertexAttributeKind."+this.b}}
A.ac.prototype={}
A.i8.prototype={
A(){var s,r,q,p,o='VertexLayoutDescriptor "surfaceV2": attribute '
for(s=0;s<7;++s){r=B.C[s]
q=r.c
if(q<=0)throw A.c(A.j(o+r.a.i(0)+" must have a positive floatCount",null))
p=r.b
q=p+q
if(q>18)throw A.c(A.j(o+r.a.i(0)+" range ["+p+", "+q+") exceeds stride 18",null))}q=t.fg.a(new A.i9())
for(p=B.b.gu(B.C),q=new A.G(p,q,t.an);q.k();)if(p.gm().c!==4)throw A.c(A.j('VertexLayoutDescriptor "surfaceV2": tangent4 must contain 4 floats',null))}}
A.i9.prototype={
$1(a){return t.G.a(a).a===B.an},
$S:7}
A.bl.prototype={
A(){var s,r,q,p,o,n=this
n.a.A()
s=n.b.length
if(B.i.aN(s,18)!==0)throw A.c(A.j("MeshData.vertices length "+s+" is not a multiple of stride 18",null))
n.de()
r=s/18|0
for(s=A.mp(n.c),q=s.length,p=0;p<q;++p){o=s[p]
if(o>=r)throw A.c(A.j("MeshData index "+o+" out of range for "+r+" vertices",null))}s=n.d
q=s.a
if(q.gF(0)&&s.b.gF(0)){s=s.b
s=q.a<=s.a&&q.b<=s.b&&q.c<=s.c}else s=!1
if(!s)throw A.c(A.j("MeshData.localBounds must be a valid AABB",null))},
de(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=null,a2=t.fg,a3=t.fl,a4=new A.a1(B.C,a2.a(new A.hi()),a3)
if(!a4.gu(0).k())return
s=new A.a1(B.C,a2.a(new A.hj()),a3)
if(s.gp(0)!==1)throw A.c(A.j("surface-v2 tangent data requires one normal slot",a1))
r=a4.gan(0)
for(a2=this.b,a3=a2.length,q=a3/18|0,p=t.n,o=s.gan(0).b,n=r.b,m=0;m<q;++m){l=m*18
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
if(!B.b.aH(A.d([j,h,g,f,e,d,c],p),new A.hk()))throw A.c(A.j("surface-v2 tangent basis must be finite",a1))
if(b<1e-8||a<1e-8)throw A.c(A.j("surface-v2 tangent basis must be non-zero",a1))
a0=(j*f+h*e+g*d)/Math.sqrt(b*a)
if(Math.abs(a0)>0.05)throw A.c(A.j("surface-v2 tangent must be orthogonal to its normal: "+A.o(a0),a1))
if(Math.abs(Math.abs(c)-1)>0.05)throw A.c(A.j("surface-v2 tangent handedness must be -1 or +1: "+A.o(c),a1))}}}
A.hi.prototype={
$1(a){return t.G.a(a).a===B.an},
$S:7}
A.hj.prototype={
$1(a){return t.G.a(a).a===B.b4},
$S:7}
A.hk.prototype={
$1(a){return isFinite(A.iL(a))},
$S:12}
A.fK.prototype={}
A.hq.prototype={
A(){var s=this.a,r=s.a
if(!r.n(0,"sceneColor")||!r.n(0,"present"))throw A.c(A.j("resource plan must contain sceneColor and present",null))
if(s.df(0,new A.hs()))throw A.c(A.j("resource plan contains an empty resource ID",null))
if(this.b!==r.n(0,"vhsOutput"))throw A.c(A.j("resource history does not match vhsOutput ownership",null))}}
A.hs.prototype={
$1(a){return A.al(a).length===0},
$S:8}
A.hH.prototype={}
A.ey.prototype={
c6(a){var s=this
if(s.d)A.l(A.m("resource assembler is disposed"))
if(s.a!=null)throw A.c(A.m("resource assembler is initialized"))
a.A()
s.a=a
s.c=1},
ab(){if(this.d)return
this.d=!0
this.a=null}}
A.cE.prototype={
v(){return"DrawMode."+this.b}}
A.fC.prototype={
v(){return"BlendMode."+this.b}}
A.cb.prototype={}
A.i2.prototype={
i(a){var s=this
return"SurfaceMetrics(css "+s.a+"x"+s.b+", pixels "+s.c+"x"+s.d+", dpr "+A.o(s.e)+", visible: true)"},
A(){var s,r=this
if(r.a<0||r.b<0)throw A.c(A.j("SurfaceMetrics css size must be >= 0",null))
if(r.c<0||r.d<0)throw A.c(A.j("SurfaceMetrics pixel size must be >= 0",null))
s=r.e
if(!isFinite(s)||s<=0)throw A.c(A.j("SurfaceMetrics.devicePixelRatio must be finite and > 0: "+A.o(s),null))}}
A.fE.prototype={
v(){return"ColorEncoding."+this.b}}
A.d3.prototype={
A(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.c5(B.da)
if(o.a!==0)A.l(A.aG(o,r,"contains unknown pipeline features"))
if(q.a===B.aM&&p.gc8(p))A.l(A.aG(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.c(A.j("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.c(A.j("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.ca.prototype={
v(){return"RendererState."+this.b}}
A.S.prototype={}
A.fX.prototype={
i(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.b+" tris="+s.c+" culled="+s.d+" gpu="+s.r+"B)"}}
A.ee.prototype={
dW(a){return this.a.b5(a)}}
A.hh.prototype={
$3(a,b,c){return new A.aR(A.a(a),A.a(b),A.bM(c))},
$S:20}
A.eQ.prototype={}
A.hl.prototype={
c0(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.b,d=A.l2(f,new A.e2(e.byteLength,B.au,B.bw))
if(f.b!==B.d)A.l(A.m(g))
s=A.p(d.a)
r=f.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.aD(f)
A.a5(f,p)
if(f.b!==B.d)A.l(A.m(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=A.an(t.S)
for(n=a.a,m=0;m<7;++m){l=B.C[m]
k=A.lz(l.a)
if(!o.j(0,k))continue
j=A.nC(n,k,l)
if(f.b!==B.d)A.l(A.m(g))
r.vertexAttribPointer.apply(r,[k,j,A.a(q.WebGL2RenderingContext.FLOAT),!1,72,l.b*4])
if(f.b!==B.d)A.l(A.m(g))
r.enableVertexAttribArray(k)}i=a.c
h=A.l2(f,new A.e2(A.kM(i),B.au,B.at))
if(f.b!==B.d)A.l(A.m(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER),A.p(h.a))
A.n3(f,h,t.bW.a(i))
f=i.length
return new A.eQ(d,h,p,f,e.length/18|0,!1)},
dQ(a){var s=this.c.q(0,a.a)
if(s==null)throw A.c(A.bg(B.P,a))
this.b.b5(a)
return s},
bk(){var s,r,q,p
for(s=this.b.aj(),r=s.$ti,s=new A.aM(s.a(),r.h("aM<1>")),q=this.c,r=r.c;s.k();){p=s.b
if(p==null)p=r.a(p)
q.D(0,p.a.a,this.c0(p.b))}},
gav(){return this.b.aj().bb(0,0,new A.hn(),t.S)}}
A.hm.prototype={
$3(a,b,c){return new A.as(A.a(a),A.a(b),A.bM(c))},
$S:14}
A.hn.prototype={
$2(a,b){var s,r
A.a(a)
s=t.ai.a(b).b
r=s.b.byteLength
s=A.kM(s.c)
return a+r+s},
$S:22}
A.eM.prototype={
Y(a){var s=this.a,r=A.l3(s,B.bb)
A.l4(s,r,0,a)
return r},
dS(a){var s=this.d
s===$&&A.aW()
return s},
e_(a){var s=this.e
s===$&&A.aW()
return s},
e1(a){var s=this.f
s===$&&A.aW()
return s},
dU(a){var s=this.r
s===$&&A.aW()
return s},
dY(a){var s=this.w
s===$&&A.aW()
return s},
ab(){var s,r,q,p,o,n=this
for(s=n.c,r=new A.b1(s,s.r,s.e,A.u(s).h("b1<2>")),q=n.a,p=q.a,o=t.R;r.k();)p.deleteTexture(o.a(r.d.a).a)
s.Z(0)
s=n.d
s===$&&A.aW()
A.eU(q,s)
s=n.e
s===$&&A.aW()
A.eU(q,s)
s=n.f
s===$&&A.aW()
A.eU(q,s)
s=n.r
s===$&&A.aW()
A.eU(q,s)
s=n.w
s===$&&A.aW()
A.eU(q,s)},
bk(){var s,r,q,p,o,n,m,l,k,j=this
j.d=j.Y($.kp())
j.e=j.Y($.km())
j.f=j.Y($.kn())
j.r=j.Y($.kl())
j.w=j.Y($.ko())
for(s=j.b.aj(),r=s.$ti,s=new A.aM(s.a(),r.h("aM<1>")),q=j.c,p=j.a,r=r.c;s.k();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
if(m.gca().aH(0,new A.i5()))continue
l=A.l3(p,m.gl())
for(k=0;B.i.aM(k,m.gca().length);++k){o=m.gca()
if(!(k<o.length))return A.i(o,k)
A.l4(p,l,k,o[k])}if(m.geh())A.n5(p,l)
q.D(0,n.a,l)}},
gav(){return this.b.aj().bb(0,0,new A.i4(),t.S)}}
A.i3.prototype={
$3(a,b,c){return new A.av(A.a(a),A.a(b),A.bM(c))},
$S:24}
A.i5.prototype={
$1(a){return!1},
$S:25}
A.i4.prototype={
$2(a,b){var s
A.a(a)
s=t.dU.a(b).b.gl()
return B.i.L(a,s.gek().t(0,s.gee()).t(0,s.gef()).t(0,4))},
$S:26}
A.jy.prototype={
$2(a,b){var s,r=t.eS
r.a(a)
s=J.kr(r.a(b).a,a.a)
return s},
$S:27}
A.bx.prototype={
gai(){var s=this,r=Math.cos(s.c),q=Math.sin(s.c)
return new A.f(Math.sin(s.b)*r,q,-Math.cos(s.b)*r).gE()},
cj(a){var s,r,q,p,o,n,m=this
if(a<=0)return
s=10*a
if(m.z.ga_()>0.000001){r=new A.f(m.gai().a,0,m.gai().c).gE()
q=new A.f(m.gai().a1(B.j).gE().a,0,m.gai().a1(B.j).gE().c).gE()
p=m.z
o=r.t(0,p.c).L(0,q.t(0,p.a)).L(0,B.j.t(0,p.b)).gE().t(0,m.d)
n=B.k.a5(s,0,1)
s=m.y.t(0,1-n).L(0,o.t(0,n))
m.y=s
m.a=m.a.L(0,s.t(0,a))}else{n=B.k.a5(s,0,1)
s=m.y=m.y.t(0,1-n)
if(s.ga_()>0.000001)m.a=m.a.L(0,s.t(0,a))}},
bn(a){return A.fD(a,this.a,200,this.gai(),1,0.1,B.j)},
$ijH:1}
A.bm.prototype={
gba(){var s=this,r=Math.cos(s.d),q=Math.sin(s.d),p=Math.sin(s.c),o=Math.cos(s.c),n=s.a,m=s.b
return n.L(0,new A.f(r*p*m,q*m,r*o*m))},
gce(){return this.a.a8(0,this.gba()).gE().a1(B.j).gE()},
cj(a){var s,r,q,p=this
if(a<=0)return
if(p.as)p.ax=p.ax+p.at*a
s=B.k.a5(1-Math.exp(-10*a),0,1)
r=p.c
p.c=r+(p.ax-r)*s
r=p.d
p.d=r+(p.ay-r)*s
r=p.b
p.b=r+(p.ch-r)*s
r=p.CW
q=p.a
p.a=q.L(0,r.a8(0,q).t(0,s))},
bn(a){var s=this.gba(),r=this.a,q=r.a8(0,s)
if(q.ga_()<1e-12)A.l(A.j("CameraView.lookAt requires target ("+r.i(0)+") distinct from eye ("+s.i(0)+")",null))
return A.fD(a,s,200,q,1,0.1,B.j)},
$ijH:1}
A.bA.prototype={
gdC(){return this.b.length}}
A.dZ.prototype={
dl(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h
t.U.a(a)
s=new A.hQ(A.d([],t.cU),A.an(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p)r[p].S(s,b)
o=s.dk(a,!1)
if(o.b.length!==0)return new A.e_(o,B.c8)
q=o.a
n=A.E(q)
m=new A.a6(q,n.h("v(1)").a(new A.fP()),n.h("a6<1,v>")).al(0)
l=A.d([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.A)(r),++p){k=r[p]
for(n=k.R(d),j=n.length,i=0;i<n.length;n.length===j||(0,A.A)(n),++i){h=n[i]
if(!m.n(0,h.gl().a))throw A.c(A.m('RenderFeature "'+k.gB()+'" created a pass "'+h.gl().a+'" that it never declared into the graph'))
B.b.j(l,h)}}B.b.af(l,new A.fQ(o))
return new A.e_(o,l)}}
A.fP.prototype={
$1(a){return t.z.a(a).a},
$S:28}
A.fQ.prototype={
$2(a,b){var s=t.fA
s.a(a)
s.a(b)
s=this.a.a
return B.i.J(B.b.bc(s,new A.fN(a)),B.b.bc(s,new A.fO(b)))},
$S:29}
A.fN.prototype={
$1(a){return t.z.a(a).a===this.a.gl().a},
$S:4}
A.fO.prototype={
$1(a){return t.z.a(a).a===this.a.gl().a},
$S:4}
A.e_.prototype={}
A.c0.prototype={
v(){return"FrameQueueState."+this.b}}
A.e1.prototype={$imK:1}
A.fU.prototype={
di(a){if(a.length===0)throw A.c(A.aG(a,"passId",null))
this.b=a
this.a.bj(a,A.lC())},
co(){var s,r,q,p,o=t.A
o=A.b3(o,o)
for(s=this.a,s=new A.b_(s,A.u(s).h("b_<1,2>")).gu(0);s.k();){r=s.d
q=r.a
p=r.b
o.D(0,q,new A.S(p.a,p.b,p.d))}return A.kx(o,t.N,t.o)},
ah(a,b){var s,r=this.b
if(r==null)throw A.c(A.m("draw recorded outside an active render pass"))
if(b<1)throw A.c(A.j("draw count and instance count must be positive",null))
s=this.a.q(0,r);++s.a
s.d+=b
s.b=s.b+B.i.a4(a,3)*b}}
A.cj.prototype={}
A.F.prototype={
gak(){var s=this.c,r=A.E(s)
return new A.a1(s,r.h("z(1)").a(new A.ht()),r.h("a1<1>"))},
gaw(){var s=this.c,r=A.E(s)
return new A.a1(s,r.h("z(1)").a(new A.hu()),r.h("a1<1>"))},
i(a){return"PassDeclaration("+this.a+" @ "+this.b.i(0)+")"}}
A.ht.prototype={
$1(a){var s=t.L.a(a).b
return s===B.c||s===B.u},
$S:9}
A.hu.prototype={
$1(a){return t.L.a(a).b===B.e},
$S:9}
A.aI.prototype={
v(){return"GraphValidationFailureKind."+this.b}}
A.a9.prototype={
i(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.ew.prototype={
v(){return"ResourceFormat."+this.b}}
A.aY.prototype={
v(){return"GraphStage."+this.b}}
A.N.prototype={
cb(){var s=this
return new A.N(s.a,s.b,s.c,s.d,s.e,s.f+1)},
X(a,b){var s=this
if(b==null)return!1
return b instanceof A.N&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gK(a){var s=this
return A.c6(s.a,s.b,s.c,s.d,s.e,s.f)},
i(a){var s=this,r=s.b.i(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.d5.prototype={
v(){return"ResourceAccess."+this.b}}
A.n.prototype={}
A.cz.prototype={}
A.hJ.prototype={
T(a){var s,r,q,p,o,n,m=this
a.A()
s=null
try{r=a.d.gac()
r=A.aC(r,A.u(r).h("k.E"))
q=t.dy
s=A.n6(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.bU(p) instanceof A.d8){++m.e
throw p}else throw p}o=new A.cz(s)
r=m.b
q=a.a
n=r.q(0,q)
r.D(0,q,o);++m.d
if(n!=null)m.a.a.deleteProgram(A.p(n.b.a))
return o},
cR(a){var s,r
t.cr.a(a)
for(s=a.a,s=new A.b1(s,s.r,s.e,a.$ti.h("b1<1>")),r=this.a.a;s.k();)r.deleteProgram(A.p(s.d.b.a))}}
A.a4.prototype={
A(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.c(A.j("ProgramSource.id must not be empty",m))
s=t.S
r=A.an(s)
for(q=this.d.gaq(),q=q.gu(q);q.k();){p=q.gm()
o=p.b
if(o<0)throw A.c(A.j('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.j(0,o))throw A.c(A.j('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.an(s)
for(s=this.e.gaq(),s=s.gu(s);s.k();){q=s.gm()
p=q.b
if(p<0)throw A.c(A.j('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.j(0,p))throw A.c(A.j('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.hO.prototype={}
A.Z.prototype={
M(){var s=this
return A.m7(B.b7,s.f,B.I,B.H,!0,!0,!0,!0,s.r,B.K,B.L,s.d,s.e,!0,!1,!1)}}
A.hQ.prototype={
dk(a,b){var s=this.dd(t.U.a(a),!1),r=this.a,q=A.E(r)
return new A.hP(A.hd(new A.a1(r,q.h("z(1)").a(new A.hV()),q.h("a1<1>")),t.z),s)},
dd(a,b){var s,r,q,p,o,n,m=this
t.U.a(a)
s=A.d([],t.b7)
r=m.a
q=A.E(r)
p=q.h("a1<1>")
o=A.aC(new A.a1(r,q.h("z(1)").a(new A.hU()),p),p.h("k.E"))
m.cD(o,a,s)
m.cH(o,s)
m.cJ(o,s)
m.cG(o,!1,s)
n=m.cL(o,s)
m.cI(o,n,s)
m.cK(o,s)
m.cF(o,n,s)
m.cE(o,s)
return s},
cD(a,b,c){var s,r,q,p
t.O.a(a)
t.U.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
p=B.a8.c5(b)
if(p.a!==0)B.b.j(c,new A.a9(B.bJ,q.a,"missing capabilities: "+p.dK(0,", ")))}},
cH(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gak(),o=J.a3(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gm().a
if(m.e>1)B.b.j(b,new A.a9(B.bE,n,"reads multisampled resource "+m.i(0)+" directly; resolve before sampling"))}}},
cJ(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.E(a),r=s.h("z(1)").a(new A.hT()),q=B.b.gu(a),s=new A.G(q,r,s.h("G<1>"));s.k();){r=q.gm()
p=r.gak()
o=A.aC(p,p.$ti.h("k.E"))
p=r.gaw()
n=A.aC(p,p.$ti.h("k.E"))
if(o.length!==1||n.length!==1){B.b.j(b,new A.a9(B.a_,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.b.gan(o).a
l=B.b.gan(n).a
if(m.e<=1||l.e>1)B.b.j(b,new A.a9(B.a_,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.b.j(b,new A.a9(B.a_,r.a,"resolve source and destination must match format and extent"))}},
cG(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.A)(p),++m){l=p[m]
if(l.b===B.u)B.b.j(c,new A.a9(B.bH,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
cL(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.b3(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.A)(a),++q){p=a[q]
for(o=p.gaw(),n=J.a3(o.a),o=new A.G(n,o.b,o.$ti.h("G<1>")),m=p.a;o.k();){l=n.gm().a
k=l.a+"#"+l.f
j=s.q(0,k)
if(j!=null){B.b.j(b,new A.a9(B.bD,m,l.i(0)+" already written by "+j.a))
continue}s.D(0,k,p)}}return s},
cI(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gak(),p=J.a3(q.a),q=new A.G(p,q.b,q.$ti.h("G<1>")),o=r.a;q.k();){n=p.gm()
if(n.b===B.u)continue
n=n.a
m=b.q(0,n.a+"#"+n.f)
if(m==null){B.b.j(c,new A.a9(B.az,o,"reads "+n.i(0)+" but no pass writes that version"))
continue}if(B.b.dA(a,m)>s)B.b.j(c,new A.a9(B.az,o,"reads "+n.i(0)+" before writer "+m.a+" runs"))}}},
cK(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gak(),o=J.a3(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gm()
if(m.b===B.u)continue
for(l=q.gaw(),k=J.a3(l.a),l=new A.G(k,l.b,l.$ti.h("G<1>")),m=m.a,j=m.a,i=m.f;l.k();){h=k.gm().a
if(j===h.a&&i===h.f)B.b.j(b,new A.a9(B.bG,n,"reads and writes "+m.i(0)+" at the same version; declare a ping-pong version bump"))}}}},
cF(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.A)(a),++r){q=a[r]
for(p=q.gak(),o=J.a3(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gm()
if(m.b===B.u)continue
l=m.a
k=b.q(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gaw().dw(0,new A.hS(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.b.j(c,new A.a9(B.bF,n,"reads "+l.i(0)+" but writer "+k.a+" produced "+j.i(0)))}}},
cE(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.b3(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gaw(),o=J.a3(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>"));p.k();){n=o.gm().a
r.D(0,n.a+"#"+n.f,q)}m=J.jK(p,t.cJ)
for(l=0;l<p;++l)m[l]=A.an(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gak(),p=J.a3(s.a),s=new A.G(p,s.b,s.$ti.h("G<1>"));s.k();){o=p.gm()
if(o.b===B.u)continue
o=o.a
k=r.q(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.i(m,k)
m[k].j(0,q)}}p=t.y
j=A.hb(s,!1,!1,p)
s=a.length
i=A.hb(s,!1,!1,p)
h=new A.hR(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.i(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.i(a,q)
B.b.j(b,new A.a9(B.bI,a[q].a,"participates in a resource dependency cycle"))}}}}
A.hV.prototype={
$1(a){t.z.a(a)
return A.jQ()},
$S:4}
A.hU.prototype={
$1(a){t.z.a(a)
return A.jQ()},
$S:4}
A.hT.prototype={
$1(a){return t.z.a(a).f},
$S:4}
A.hS.prototype={
$1(a){var s=t.L.a(a).a,r=this.a.a
return s.a===r.a&&s.f===r.f},
$S:9}
A.hR.prototype={
$1(a){var s,r,q,p,o=this,n=o.a
if(!(a>=0&&a<n.length))return A.i(n,a)
if(n[a])return!0
s=o.b
if(!(a<s.length))return A.i(s,a)
if(s[a])return!1
B.b.D(n,a,!0)
r=o.c
if(!(a<r.length))return A.i(r,a)
r=r[a]
r=A.jY(r,r.r,A.u(r).c)
q=r.$ti.c
while(r.k()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.b.D(n,a,!1)
B.b.D(s,a,!0)
return!1},
$S:32}
A.hP.prototype={}
A.f9.prototype={$iau:1,
gB(){return this.a},
gl(){return this.b},
gbp(){return this.c}}
A.d2.prototype={
c1(a){var s,r,q=a.c,p=q.a
if(!p.gF(0))A.l(A.j("Transform.translation must be finite: "+p.i(0),null))
p=q.b
if(!(isFinite(p.a)&&isFinite(p.b)&&isFinite(p.c)&&isFinite(p.d)))A.l(A.j("Transform.rotation must be finite: "+p.i(0),null))
p=q.c
if(!isFinite(p)||p<=0)A.l(A.j(u.f+A.o(p),null))
s=this.a.b5(a.a)
q=q.a2()
p=s.d.gaG()
r=A.E(p)
return A.fz(new A.a6(p,r.h("f(1)").a(q.gaK()),r.h("a6<1,f>")))},
gc9(){return new A.aU(this.dJ(),t.eM)},
dJ(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d
return function $async$gc9(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b.aj(),n=o.$ti,o=new A.aM(o.a(),n.h("aM<1>")),m=s.a,l=m.$ti,k=l.c,j=m.b,n=n.c,l=l.y[1]
case 3:if(!o.k()){r=4
break}i=o.b
if(i==null)i=n.a(i)
h=i.a
g=i.b
i=g.c
i.A()
f=k.a(g.a)
m.ag(f)
f=f.a
if(!(f>=0&&f<j.length)){A.i(j,f)
r=1
break}e=j[f].c
f=(e==null?l.a(e):e).d
i=i.a2()
f=f.gaG()
d=A.E(f)
r=5
return a.b=new A.f9(h,g,A.fz(new A.a6(f,d.h("f(1)").a(i.gaK()),d.h("a6<1,f>")))),1
case 5:r=3
break
case 4:case 1:return 0
case 2:return a.c=p.at(-1),3}}}},
$imN:1}
A.hW.prototype={
$3(a,b,c){return new A.bh(A.a(a),A.a(b),A.bM(c))},
$S:33}
A.ex.prototype={
ad(a,b){var s,r
if(this.x)A.l(A.m("resource library is disposed"))
s=this.a
a.A()
r=s.b.b4(a,b)
s.c.D(0,r.a,s.c0(a))
this.f.j(0,r)
return r},
W(a){var s
if(this.x)A.l(A.m("resource library is disposed"))
a.A()
s=this.b.a.b4(a,null)
this.r.j(0,s)
return s},
ab(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
if(e.x)return
s=e.w
r=A.aC(s,A.u(s).c)
q=r.length
p=e.c
o=p.c
n=p.a.a
m=t.R
l=0
for(;l<r.length;r.length===q||(0,A.A)(r),++l){k=r[l]
j=o.ae(0,k.a)
if(j!=null)n.deleteTexture(m.a(j.a).a)
p.b.aJ(k)}r=e.r
q=A.aC(r,A.u(r).c)
o=q.length
n=e.b.a
l=0
for(;l<q.length;q.length===o||(0,A.A)(q),++l)n.aJ(q[l])
q=e.f
o=A.aC(q,A.u(q).c)
n=o.length
m=e.a
i=m.c
h=m.a.a
l=0
for(;l<o.length;o.length===n||(0,A.A)(o),++l){k=o[l]
g=i.ae(0,k.a)
if(g!=null){h.deleteVertexArray(A.p(g.c.a))
h.deleteBuffer(A.p(g.a.a))
f=g.b
if(f!=null)h.deleteBuffer(A.p(f.a))}m.b.aJ(k)}s.Z(0)
r.Z(0)
q.Z(0)
p.ab()
e.x=!0},
$imP:1}
A.im.prototype={}
A.fo.prototype={$iau:1,
gB(){return this.a},
gl(){return this.b},
gbp(){return this.c}}
A.j2.prototype={
$1(a){var s=this.a.w.a.dQ(a),r=s.b!=null,q=r?s.d:s.e
return new A.d4(s.c,r,q,s.f)},
$S:34}
A.j3.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.n(0,a))return this.b.x.gm().cc(a)
if(b!=null&&s.n(0,b))return this.b.x.gm().cc(b)
throw A.c(A.m("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:35}
A.j1.prototype={
$0(){return this.a.$1("shadowMap")},
$S:2}
A.iV.prototype={
$0(){return null},
$S:37}
A.iW.prototype={
$0(){var s,r=this.a.at
if(r==null)return B.a0
s=r.b
return A.oH(s.k1,3,r.a.d,null)},
$S:38}
A.j0.prototype={
$0(){return this.a.$1("sceneDepth")},
$S:2}
A.iQ.prototype={
$0(){return this.a.at.a},
$S:39}
A.iS.prototype={
$0(){return this.a.$2$fallback("ssaoRaw","sceneColor")},
$S:2}
A.iR.prototype={
$0(){return this.a.$2$fallback("ssaoBlurred","sceneColor")},
$S:2}
A.j_.prototype={
$0(){var s=this.b.d>1?"sceneColor#1":"sceneColor"
return this.a.$1(s)},
$S:2}
A.iO.prototype={
$0(){return this.a.$2$fallback("bloomBlurH","sceneColor")},
$S:2}
A.iP.prototype={
$0(){return this.a.$2$fallback("bloomBlurV","sceneColor")},
$S:2}
A.iX.prototype={
$0(){return this.a.$2$fallback("dofBlurH","sceneColor")},
$S:2}
A.iY.prototype={
$0(){return this.a.$2$fallback("dofBlurV","sceneColor")},
$S:2}
A.iZ.prototype={
$0(){var s=this.a.w.c.d
s===$&&A.aW()
return s},
$S:2}
A.iU.prototype={
$0(){return this.a.$2$fallback("vhsOutput","sceneColor")},
$S:2}
A.iT.prototype={
$0(){return this.a.at.w},
$S:40}
A.j4.prototype={
$0(){return this.a},
$S:41}
A.j5.prototype={
$0(){return null},
$S:42}
A.iC.prototype={}
A.fd.prototype={$imM:1}
A.f6.prototype={$ima:1}
A.eA.prototype={
gH(){var s=this.w
return s==null?A.l(A.m("renderer is not initialized")):s},
dB(a,b){var s,r,q,p,o,n,m,l=this
if(l.e!==B.a4)throw A.c(A.m("renderer can only be initialized once"))
a.A()
b.A()
s=l.a
if(s.b===B.O)throw A.c(A.m("renderer device is context lost"))
l.e=B.cU
try{r=v.G
s.ao(A.a(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.ao(A.a(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.ao(A.a(r.WebGL2RenderingContext.MAX_SAMPLES))
s.ao(A.a(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.ao(A.a(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
q=s.r
if(q.n(0,"EXT_texture_filter_anisotropic"))s.bL(34047)
p=q.n(0,"EXT_disjoint_timer_query_webgl2")
s.w=p
q.n(0,"EXT_color_buffer_float")
q.n(0,"EXT_color_buffer_half_float")
q.n(0,"WEBGL_lose_context")
q=s.a
A.cp(q.getParameter(A.a(r.WebGL2RenderingContext.RENDERER)))
A.cp(q.getParameter(A.a(r.WebGL2RenderingContext.VENDOR)))
l.r=new A.hN(p)
r=l.b
o=A.hr(a)
q=r.a
if(q.a!=null)A.l(A.m("configuration state is already initialized"))
a.A()
q.a=a
A.hr(a)
q.d=1
r.b.c6(o)
r=A.mo()
l.w=new A.ex(A.mq(s),r,A.mT(s),A.an(t.cA),A.an(t.eL),A.an(t.aj))
r=new A.ey()
q=new A.h0(s,r)
o=A.hr(a)
n=q.bE(o,a)
r.c6(o)
q.c=new A.es(new A.hH(o),n)
l.x=q
l.y=new A.hJ(s,A.b3(t.N,t.dN))
l.as=a
A.lo(l)
l.e=B.a5}catch(m){s=l.y
if(s!=null){r=s.b
s.cR(new A.b2(r,A.u(r).h("b2<2>")))
r.Z(0)}s=l.x
if(s!=null)s.ab()
s=l.w
if(s!=null)s.ab()
l.w=null
l.e=B.a4
throw m}s=new A.U($.L,t.cd)
s.aP(null)
return s},
dg(a,b){var s,r,q,p,o=this
o.d1()
o.aB()
r=B.b.n(o.d,a)
if(!r)throw A.c(A.j("world was not created by this renderer",null))
if(o.at!=null)throw A.c(A.m("renderer.beginFrame called twice without end/abort"))
b.a.A()
b.b.A()
b.c.A()
r=b.w
if(!isFinite(r))A.l(A.j("FrameInput.timeSeconds must be finite: "+A.o(r),null))
o.at=b
o.ax=a
q=o.c
if(q.b===B.N)A.l(A.m("FrameQueue.beginFrame called twice without end/abort"))
q.b=B.N
q.c=0
B.b.Z(q.a)
s=q
try{r=o.r
if((r==null?A.l(A.m("renderer is not initialized")):r).z)o.b$=o.a.dh()
return s}catch(p){if(q.b!==B.N)A.l(A.m("FrameQueue.abortFrame called without an active frame"))
q.c=0
q.b=B.bt
o.bv()
o.ax=o.at=null
throw p}},
du(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
d.aB()
s=d.at
r=d.ax
if(s==null||r==null)throw A.c(A.m("renderer.endFrame called without an active frame"))
m=d.c
if(m.b!==B.N)A.l(A.m("FrameQueue.endFrame called without an active frame"))
l=m.a
k=A.i1(l,0,A.bP(m.c,"count",t.S),A.E(l).c).ci(0,!1)
m.b=B.bs
q=k
try{p=A.nF(d,r,s,q)
o=p.a.co()
m=o.gaq()
l=A.u(m)
n=new A.cR(new A.a1(m,l.h("z(k.E)").a(new A.hY()),l.h("a1<k.E>")),l.h("S(k.E)").a(new A.hZ()),l.h("cR<k.E,S>")).bb(0,B.bq,new A.i_(),t.o)
l=s.e
m=n.a
j=n.b
i=p.c
h=n.d
p.toString
g=d.w
f=g.a.gav()
g=g.c.gav()
e=d.w
e.a.gav()
e.c.gav()
d.w.toString
return new A.fX(l,m,j,i,h,f+g)}finally{d.cX(s.e)
d.ax=d.at=null}},
d1(){var s,r,q,p=this
if(p.e!==B.a6)return
if(p.a.b===B.O)throw A.c(A.m("renderer context remains lost"))
s=p.w
if(s.x)A.l(A.m("resource library is disposed"))
s.a.bk()
s.c.bk()
s=p.x
s.toString
r=p.as
r.toString
if(s.e)A.l(A.m("GPU resource adapter is disposed"))
q=s.c
if(q==null)A.l(A.m("GPU resource adapter is not initialized"))
s.c=new A.es(q.a,s.bE(A.hr(r),r))
s=p.y
s.c=null
s.b.Z(0)
A.lo(p)
p.e=B.a5},
aB(){var s=this,r=s.e
if(r!==B.a5)throw A.c(A.m("renderer is not ready: "+r.b))
if(s.a.b===B.O){s.cT()
s.e=B.a6
throw A.c(A.m("renderer context lost"))}},
$imR:1}
A.hY.prototype={
$1(a){t.ao.a(a)
return A.oL(a.a.toLowerCase(),"world",0)},
$S:65}
A.hZ.prototype={
$1(a){return t.ao.a(a).b},
$S:44}
A.i_.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return new A.S(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:45}
A.fc.prototype={}
A.iy.prototype={
cX(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.d)A.l(A.m(u.k))
r=s.bX(o)
if(r.b)A.l(A.m("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.b.j(p.a$,new A.fc(o))}catch(q){p.aV(o)}},
bv(){var s=this.b$
this.b$=null
if(s!=null)this.aV(s)},
cT(){var s,r,q
this.bv()
s=this.a$
r=J.kC(s.slice(0),A.E(s).c)
B.b.Z(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.A)(r),++q)this.aV(r[q].b)},
aV(a){var s,r
try{s=this.a
s.a.deleteQuery(s.bX(a).a)}catch(r){}}}
A.fh.prototype={}
A.eC.prototype={
v(){return"ShadowCasterLod."+this.b}}
A.ao.prototype={
J(a,b){var s,r=this
t.fy.a(b)
s=B.i.J(r.a.a,b.a.a)
if(s!==0)return s
s=B.i.J(r.b.a,b.b.a)
if(s!==0)return s
s=B.i.J(r.c.a,b.c.a)
if(s!==0)return s
return B.i.J(r.d,b.d)},
$iag:1}
A.am.prototype={
J(a,b){var s
t.g0.a(b)
s=B.k.J(b.a,this.a)
if(s!==0)return s
return B.i.J(this.b,b.b)},
$iag:1}
A.W.prototype={}
A.jC.prototype={
$2(a,b){var s=t.k
return s.a(a).a.J(0,s.a(b).a)},
$S:46}
A.jD.prototype={
$1(a){return t.k.a(a).b},
$S:47}
A.jA.prototype={
$2(a,b){var s=t.b
return s.a(a).a.J(0,s.a(b).a)},
$S:48}
A.jB.prototype={
$1(a){return t.b.a(a).b},
$S:49}
A.fJ.prototype={}
A.fI.prototype={}
A.hI.prototype={
$6(a,b,c,d,e,f){var s=this.a,r=s.a.length/18|0,q=this.b
s.I(a,e,f,new A.R(0,0).t(0,q))
s.I(b,e,f,new A.R(1,0).t(0,q))
s.I(c,e,f,new A.R(1,1).t(0,q))
s.I(d,e,f,new A.R(0,1).t(0,q))
q=r+2
B.b.C(s.b,A.d([r,r+1,q,r,q,r+3],t.t))},
$S:50}
A.bc.prototype={
I(a,b,c,d){B.b.C(this.a,A.d([a.a,a.b,a.c,b.a,b.b,b.c,c.a,c.b,c.c,1,1,1,1,0,1,d.a,d.b,0],t.n))},
aa(a){var s=new A.bl(B.bk,new Float32Array(A.q(this.a)),new Uint16Array(A.q(this.b)),a)
s.A()
return s}}
A.aO.prototype={
gaG(){var s,r,q,p=this.a,o=p.a,n=p.b
p=p.c
s=this.b
r=s.a
q=s.b
s=s.c
return A.d([new A.f(o,n,p),new A.f(r,n,p),new A.f(o,q,p),new A.f(r,q,p),new A.f(o,n,s),new A.f(r,n,s),new A.f(o,q,s),new A.f(r,q,s)],t.gi)},
i(a){return"Aabb("+this.a.i(0)+", "+this.b.i(0)+")"}}
A.bD.prototype={}
A.cG.prototype={
v(){return"FrustumTest."+this.b}}
A.fY.prototype={
e5(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
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
if(h*f+e*c+i*a+a0<0)return B.as
g=g?o:r
f=d?m:p
d=b?n:q
if(h*g+e*f+i*d+a0<0)l=!0}return l?B.bu:B.bv}}
A.fZ.prototype={
$4(a,b,c,d){var s=new A.f(a,b,c),r=new A.bD(s,d),q=Math.sqrt(s.ga_())
return q<1e-9?r:new A.bD(s.t(0,1/q),d/q)},
$S:51}
A.b4.prototype={
t(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=new Float32Array(16)
for(s=this.a,r=s.length,q=b.a,p=q.length,o=0;o<4;++o)for(n=o*4,m=0;m<4;++m){for(l=0,k=0;k<4;++k){j=k*4+m
if(!(j<r))return A.i(s,j)
j=s[j]
i=n+k
if(!(i<p))return A.i(q,i)
l+=j*q[i]}j=n+m
if(!(j<16))return A.i(h,j)
h[j]=l}return new A.b4(h)},
aL(a){var s,r,q,p,o,n,m,l,k,j,i,h
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
bh(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this.a,d=e.length
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
return new A.b4(h)},
bg(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=J.jK(4,t.gN)
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
a1[p]=new Float64Array(A.q(A.d([o,n,m,l,k,j,i,p===3?1:0],s)))}for(h=0;h<4;h=p){s=a1[h]
if(!(h<s.length))return A.i(s,h)
g=Math.abs(s[h])
for(p=h+1,f=p,e=h;f<4;++f){r=a1[f]
if(!(h<r.length))return A.i(r,h)
d=Math.abs(r[h])
if(d>g){g=d
e=f}}if(!isFinite(g)||g<1e-12)throw A.c(A.m("Mat4.inverse: singular matrix"))
if(e!==h){if(!(e>=0&&e<4))return A.i(a1,e)
a1[h]=a1[e]
a1[e]=s}s=a1[h]
if(!(h<s.length))return A.i(s,h)
c=s[h]
for(b=0;b<8;++b){if(!(b<s.length))return A.i(s,b)
r=s[b]
s.$flags&2&&A.bu(s)
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
s.$flags&2&&A.bu(s)
s[b]=r-a*q}}}a0=new Float32Array(16)
for(p=0;p<4;++p)for(h=0;h<4;++h){s=h*4+p
r=a1[p]
q=4+h
if(!(q<r.length))return A.i(r,q)
q=r[q]
if(!(s<16))return A.i(a0,s)
a0[s]=q}return new A.b4(a0)},
gF(a){return B.a2.aH(this.a,new A.hg())},
i(a){return"Mat4("+A.o(this.a)+")"}}
A.hg.prototype={
$1(a){return isFinite(A.iL(a))},
$S:12}
A.bE.prototype={
t(a,b){var s=this,r=s.d,q=b.a,p=s.a,o=b.d,n=s.b,m=b.c,l=s.c,k=b.b
return new A.bE(r*q+p*o+n*m-l*k,r*k-p*m+n*o+l*q,r*m+p*k-n*q+l*o,r*o-p*q-n*k-l*m)},
i(a){var s=this
return"Quat("+A.o(s.a)+", "+A.o(s.b)+", "+A.o(s.c)+", "+A.o(s.d)+")"}}
A.hL.prototype={
dH(a){var s,r,q,p,o,n,m,l,k=null,j=this.b,i=j.a
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
A.hM.prototype={
i(a){return'RaycastHit(node: "'+this.a.a+'", distance: '+B.k.a6(this.d,2)+", point: "+this.b.i(0)+")"}}
A.aw.prototype={
A(){var s=this.a
if(!s.gF(0))throw A.c(A.j("Transform.translation must be finite: "+s.i(0),null))
s=this.b
if(!(isFinite(s.a)&&isFinite(s.b)&&isFinite(s.c)&&isFinite(s.d)))throw A.c(A.j("Transform.rotation must be finite: "+s.i(0),null))
s=this.c
if(!isFinite(s)||s<=0)throw A.c(A.j(u.f+A.o(s),null))},
a2(){var s,r,q,p,o,n,m,l,k,j,i,h=this.b,g=h.a,f=g*g,e=h.b,d=e*e,c=h.c,b=c*c,a=g*e,a0=g*c,a1=e*c
h=h.d
s=h*g
r=h*e
q=h*c
c=t.n
h=A.kI(A.d([1-2*(d+b),2*(a+q),2*(a0-r),0,2*(a-q),1-2*(f+b),2*(a1+s),0,2*(a0+r),2*(a1-s),1-2*(f+d),0,0,0,0,1],c)).a
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
return A.kI(A.d([g*p,o*p,n*p,0,m*p,l*p,k*p,0,j*p,i*p,h[10]*p,0,e.a,e.b,e.c,1],c))},
i(a){return"Transform("+this.a.i(0)+", "+this.b.i(0)+", scale="+A.o(this.c)+")"}}
A.R.prototype={
t(a,b){return new A.R(this.a*b,this.b*b)},
gp(a){var s=this.a,r=this.b
return Math.sqrt(s*s+r*r)},
X(a,b){if(b==null)return!1
return b instanceof A.R&&this.a===b.a&&this.b===b.b},
gK(a){return A.c6(this.a,this.b,B.h,B.h,B.h,B.h)},
i(a){return"Vec2("+A.o(this.a)+", "+A.o(this.b)+")"}}
A.f.prototype={
L(a,b){return new A.f(this.a+b.a,this.b+b.b,this.c+b.c)},
a8(a,b){return new A.f(this.a-b.a,this.b-b.b,this.c-b.c)},
t(a,b){return new A.f(this.a*b,this.b*b,this.c*b)},
b6(a){return this.a*a.a+this.b*a.b+this.c*a.c},
a1(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.f(s*r-q*p,q*o-n*r,n*p-s*o)},
ga_(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gp(a){return Math.sqrt(this.ga_())},
gF(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gE(){var s=this,r=Math.sqrt(s.ga_())
return r<1e-9?B.y:new A.f(s.a/r,s.b/r,s.c/r)},
X(a,b){if(b==null)return!1
return b instanceof A.f&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gK(a){return A.c6(this.a,this.b,this.c,B.h,B.h,B.h)},
i(a){return"Vec3("+A.o(this.a)+", "+A.o(this.b)+", "+A.o(this.c)+")"}}
A.eY.prototype={
v(){return"_BloomBlurAxis."+this.b}}
A.cu.prototype={
gB(){return this.f},
S(a,b){B.b.j(a.a,new A.F(this.f,B.r,A.d([new A.n(this.x,B.c),new A.n(this.y,B.e)],t.C),!1))},
R(a){var s=this,r=s.a.T(new A.a4(s.e,s.b,s.c,B.o,B.aI,B.aF)),q=A.aD(s.d),p=t.n,o=s.r===B.b5?new Float32Array(A.q(A.d([1/s.Q,0],p))):new Float32Array(A.q(A.d([0,1/s.as],p)))
p=s.y
return A.d([new A.eZ(new A.Z(s.f,A.d([new A.n(s.x,B.c),new A.n(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iB:1}
A.eZ.prototype={
O(a){var s,r,q,p,o=this
if(a.d.f.b<=0)return
s=a.b
r=s.a
A.ad(r,a.P(o.r).b)
A.a0(r,o.a.M())
A.aK(r,B.v,1,0,0,0)
A.aj(r,o.b.b)
q=t.j
p=o.d
if(o.e)A.n2(r,0,q.a(p.$0()))
else A.I(r,0,q.a(p.$0()))
A.b(r,"uSource",B.n)
A.b(r,"uTexelStep",new A.e(B.E,o.f))
A.a5(r,o.c)
s.U(3,0)},
$iy:1,
gl(){return this.a}}
A.dO.prototype={
gB(){return"bloomComposite"},
S(a,b){B.b.j(a.a,new A.F("bloomComposite",B.r,A.d([new A.n(this.f,B.c),new A.n(this.r,B.c),new A.n(this.w,B.e)],t.C),!1))},
R(a){var s=this,r="bloomComposite",q=s.a.T(new A.a4(r,s.b,s.c,B.o,B.cp,B.cf)),p=A.aD(s.d),o=s.w,n=A.d([new A.n(s.f,B.c),new A.n(s.r,B.c),new A.n(o,B.e)],t.C)
return A.d([new A.f_(new A.Z(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iB:1}
A.f_.prototype={
O(a){var s,r,q=this,p=a.d.f.b
if(p<=0)return
s=a.b
r=s.a
A.ad(r,a.am(q.f).b)
A.l_(r,1)
A.a0(r,B.ar)
A.aj(r,q.b.b)
A.I(r,0,t.j.a(q.d.$0()))
A.b(r,"uBloom",B.n)
A.b(r,"uBloomStrength",new A.e(B.a,p))
A.a5(r,q.c)
s.U(3,0)},
$iy:1,
gl(){return this.a}}
A.dV.prototype={
gB(){return"depthPrepass"},
S(a,b){B.b.j(a.a,new A.F("depthPrepass",B.bA,A.d([new A.n(this.w,B.e)],t.C),!1))},
R(a){var s=this,r="depthPrepass",q=s.a.T(new A.a4(r,s.b,s.c,B.aH,B.aG,B.c6))
return A.d([new A.f1(new A.Z(r,A.d([new A.n(s.w,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iB:1}
A.f1.prototype={
O(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=u.k,b=a2.b,a=a2.d,a0=a.f,a1=b.a
A.ad(a1,a2.P("sceneDepth").b)
A.a0(a1,d.a.M())
A.aK(a1,B.V,1,0,0,0)
A.aj(a1,d.b.b)
A.b(a1,"uVertexSnapGrid",new A.e(B.a,a0.ax))
A.b(a1,"uAlbedo",B.n)
for(s=a.a,r=s.length,a=a.c.c.a,q=d.c,p=a0.at,o=v.G,n=b.b,m=a1.a,l=0;l<s.length;s.length===r||(0,A.A)(s),++l){k=s[l]
j=k.a
i=j.gl()
A.b(a1,"uViewProjection",new A.e(B.l,new Float32Array(A.q(a))))
A.b(a1,"uModel",new A.e(B.l,new Float32Array(A.q(i.c.a2().a))))
A.jz(b,k,!1)
d.cS(b,j.gl().b,p)
h=q.$1(j.gl().a)
i=h.a
if(a1.b!==B.d)A.l(A.m(c))
m.bindVertexArray(A.p(i.a))
i=h.b
g=h.c
f=k.b.length
if(i){i=h.d
if(a1.b!==B.d)A.l(A.m(c))
e=A.a(o.WebGL2RenderingContext.TRIANGLES)
m.drawElementsInstanced.apply(m,[e,g,i?A.a(o.WebGL2RenderingContext.UNSIGNED_INT):A.a(o.WebGL2RenderingContext.UNSIGNED_SHORT),0,f])
n.ah(g,f)}else{if(a1.b!==B.d)A.l(A.m(c))
m.drawArraysInstanced(A.a(o.WebGL2RenderingContext.TRIANGLES),0,g,f)
n.ah(g,f)}}},
cS(a,b,c){var s,r
this.d.$1(b)
s=a.a
A.I(s,0,t.j.a(this.e.$1(null)))
A.b(s,"uAlphaCutoff",new A.e(B.a,0))
A.b(s,"uAffineWarpStrength",new A.e(B.a,0))
r=this.a.M()
A.a0(s,r)},
$iy:1,
gl(){return this.a}}
A.f2.prototype={
v(){return"_DofBlurAxis."+this.b}}
A.cD.prototype={
gB(){return this.f},
S(a,b){B.b.j(a.a,new A.F(this.f,B.r,A.d([new A.n(this.w,B.c),new A.n(this.x,B.e)],t.C),!1))},
R(a){var s=this,r=s.a.T(new A.a4(s.e,s.b,s.c,B.o,B.aI,B.aF)),q=A.aD(s.d),p=t.n,o=s.r===B.b6?new Float32Array(A.q(A.d([1/s.z,0],p))):new Float32Array(A.q(A.d([0,1/s.Q],p)))
p=s.x
return A.d([new A.f3(new A.Z(s.f,A.d([new A.n(s.w,B.c),new A.n(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iB:1}
A.f3.prototype={
O(a){var s,r,q=this
if(a.d.f.d<=0)return
s=a.b
r=s.a
A.ad(r,a.P(q.f).b)
A.a0(r,q.a.M())
A.aK(r,B.v,1,0,0,0)
A.aj(r,q.b.b)
A.I(r,0,t.j.a(q.d.$0()))
A.b(r,"uSource",B.n)
A.b(r,"uTexelStep",new A.e(B.E,q.e))
A.a5(r,q.c)
s.U(3,0)},
$iy:1,
gl(){return this.a}}
A.dY.prototype={
gB(){return"dofComposite"},
S(a,b){var s=this
B.b.j(a.a,new A.F("dofComposite",B.r,A.d([new A.n(s.z,B.c),new A.n(s.Q,B.c),new A.n(s.as,B.c),new A.n(s.at,B.e)],t.C),!1))},
R(a){var s=this,r="dofComposite",q=s.a.T(new A.a4(r,s.b,s.c,B.o,B.cn,B.c5)),p=A.aD(s.d)
return A.d([new A.f4(new A.Z(r,A.d([new A.n(s.z,B.c),new A.n(s.Q,B.c),new A.n(s.as,B.c),new A.n(s.at,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iB:1}
A.f4.prototype={
O(a){var s,r=this,q=a.P("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.ad(n,q.b)
A.a0(n,r.a.M())
A.aj(n,r.b.b)
s=t.j
A.I(n,0,s.a(r.d.$0()))
A.b(n,"uSharp",B.n)
A.I(n,1,s.a(r.e.$0()))
A.b(n,"uBlurred",B.F)
A.I(n,2,s.a(r.f.$0()))
A.b(n,"uSceneDepth",B.b_)
A.b(n,"uNear",new A.e(B.a,o.f))
A.b(n,"uFar",new A.e(B.a,o.r))
A.b(n,"uFocusDistance",new A.e(B.a,r.w))
A.b(n,"uFocusRange",new A.e(B.a,r.x))
A.b(n,"uStrength",new A.e(B.a,a.d.f.d))
A.a5(n,r.c)
p.U(3,0)},
$iy:1,
gl(){return this.a}}
A.e5.prototype={
gB(){return"grade"},
S(a,b){B.b.j(a.a,new A.F("grade",B.r,A.d([new A.n(this.r,B.c),new A.n(this.w,B.e)],t.C),!1))},
R(a){var s=this,r=s.a.T(new A.a4("grade",s.b,s.c,B.o,B.cl,B.cg)),q=A.aD(s.d),p=s.r,o=s.w
return A.d([new A.f8(new A.Z("grade",A.d([new A.n(p,B.c),new A.n(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iB:1}
A.f8.prototype={
O(a){var s=this,r=a.P(s.f.a),q=a.b,p=q.a
A.ad(p,a.P(s.r.a).b)
A.a0(p,s.a.M())
A.aj(p,s.b.b)
A.I(p,0,r.b)
A.b(p,"uScene",B.n)
A.I(p,1,t.j.a(s.d.$0()))
A.b(p,"uLut",B.F)
A.b(p,"uLutSize",new A.e(B.a,s.e))
A.b(p,"uStrength",new A.e(B.a,a.d.f.as))
A.a5(p,s.c)
q.U(3,0)},
$iy:1,
gl(){return this.a}}
A.cT.prototype={
gB(){return"msaaResolve"},
S(a,b){B.b.j(a.a,new A.F("msaaResolve",B.bB,A.d([new A.n(this.b,B.c),new A.n(this.c,B.e)],t.C),!0))},
R(a){var s=this.b,r=this.c
return A.d([new A.fb(new A.Z("msaaResolve",A.d([new A.n(s,B.c),new A.n(r,B.e)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iB:1}
A.fb.prototype={
O(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.am(this.c),j=a.am(this.d),i=this.b
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
i.drawBuffers(A.d([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.NONE)],t.n))}A.ae(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(o&&n){i.readBuffer(A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1))
i.drawBuffers(A.d([A.a(m.WebGL2RenderingContext.NONE),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
A.ae(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(r.d!=null||r.e!=null)A.ae(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.DEPTH_BUFFER_BIT),A.a(m.WebGL2RenderingContext.NEAREST)],t.H)
if(n)i.drawBuffers(A.d([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.READ_FRAMEBUFFER),null)
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),null)},
$iy:1,
gl(){return this.a}}
A.bY.prototype={}
A.dQ.prototype={
P(a){var s=this.a.q(0,a)
if(s==null)throw A.c(A.m('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
am(a){var s=a.a,r=this.a.q(0,s+"#"+a.f)
if(r!=null)return r
return this.P(s)},
$imL:1}
A.jR.prototype={}
A.d0.prototype={
gB(){return"present"},
S(a,b){B.b.j(a.a,new A.F("present",B.bC,A.d([new A.n(this.f,B.c)],t.C),!1))},
R(a){var s=this,r=s.a.T(new A.a4("present",s.b,s.c,B.o,B.co,B.cc)),q=A.aD(s.d),p=s.f
return A.d([new A.fe(new A.Z("present",A.d([new A.n(p,B.c)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iB:1}
A.fe.prototype={
O(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=null,a0=a3.am(b.d),a1=a3.b,a2=a1.a
A.ad(a2,a)
A.a0(a2,b.a.M())
A.aj(a2,b.b.b)
A.a5(a2,b.c)
A.I(a2,0,a0.b)
s=a3.c
r=s!=null
if(r)A.I(a2,1,s)
q=a3.d
p=q.f
o=q.d
n=q.c
A.b(a2,"uExposure",new A.e(B.a,p.a))
A.b(a2,"uVignette",new A.e(B.a,p.e))
A.b(a2,"uGrain",new A.e(B.a,p.f))
A.b(a2,"uOutputEncoding",new A.e(B.a,b.e===B.W?1:0))
A.b(a2,"uToneMap",new A.e(B.a,A.mr(p.fr)))
m=o.a
q=o.k4==null
l=q?a:B.aD
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
A.b(a2,"uClearColor",new A.e(B.f,new Float32Array(A.q(A.d([m.a,m.b,m.c],e)))))
A.b(a2,"uSkyHorizon",new A.e(B.f,new Float32Array(A.q(A.d([l.a,l.b,l.c],e)))))
A.b(a2,"uSkyZenith",new A.e(B.f,new Float32Array(A.q(A.d([k,j,i],e)))))
A.b(a2,"uSkyGround",new A.e(B.f,new Float32Array(A.q(A.d([h,g,f],e)))))
A.b(a2,"uSkyEnabled",new A.e(B.a,q?0:1))
k=q?a:0.12
A.b(a2,"uSkyHorizonGlow",new A.e(B.a,k==null?0:k))
k=q?a:0.005
A.b(a2,"uSkyStarDensity",new A.e(B.a,k==null?0:k))
A.b(a2,"uSkyTexture",B.F)
A.b(a2,"uSkyTextureEnabled",new A.e(B.a,!q&&r?1:0))
r=q?a:0
A.b(a2,"uSkyRotation",new A.e(B.a,r==null?0:r))
r=q?a:1
A.b(a2,"uSkyExposure",new A.e(B.a,r==null?1:r))
A.b(a2,"uSkyTextureSrgb",new A.e(B.a,(!q||a)===!0?1:0))
A.b(a2,"uInverseProjection",new A.e(B.l,new Float32Array(A.q(n.gc7().a))))
d=n.y
if(d===$){c=n.a.bg()
n.y!==$&&A.kj()
n.y=c
d=c}A.b(a2,"uInverseView",new A.e(B.l,new Float32Array(A.q(d.a))))
r=n.d
A.b(a2,"uCameraPosition",new A.e(B.f,new Float32Array(A.q(A.d([r.a,r.b,r.c],e)))))
r=q?a:0.32
A.b(a2,"uCloudCoverage",new A.e(B.a,r==null?0:r))
r=q?a:0.4
A.b(a2,"uCloudDensity",new A.e(B.a,r==null?0:r))
r=q?a:650
A.b(a2,"uCloudBaseHeight",new A.e(B.a,r==null?650:r))
r=q?a:350
A.b(a2,"uCloudThickness",new A.e(B.a,r==null?350:r))
r=q?a:0.0012
A.b(a2,"uCloudScale",new A.e(B.a,r==null?0:r))
r=q?a:0
if(r==null)r=0
k=q?a:0
A.b(a2,"uCloudWind",new A.e(B.E,new Float32Array(A.q(A.d([r,k==null?0:k],e)))))
r=q?a:0
A.b(a2,"uCloudPhase",new A.e(B.a,r==null?0:r))
r=q?a:0.55
A.b(a2,"uCloudDetail",new A.e(B.a,r==null?0:r))
r=q?a:0.25
A.b(a2,"uCloudSilverLining",new A.e(B.a,r==null?0:r))
r=q?a:12
A.b(a2,"uCloudSampleCount",new A.e(B.a,r==null?4:r))
r=o.go==null
q=r?a:0.6
if(q==null)q=0
k=r?a:-1
if(k==null)k=1
j=r?a:0.4
A.b(a2,"uCloudLightDirection",new A.e(B.f,new Float32Array(A.q(A.d([q,k,j==null?0:j],e)))))
q=r?a:1
if(q==null)q=1
k=r?a:0.95
if(k==null)k=1
j=r?a:0.88
A.b(a2,"uCloudLightColor",new A.e(B.f,new Float32Array(A.q(A.d([q,k,j==null?1:j],e)))))
r=r?a:2.4
A.b(a2,"uCloudLightIntensity",new A.e(B.a,r==null?0:r))
a1.U(3,0)},
$iy:1,
gl(){return this.a}}
A.ev.prototype={
gB(){return"ps1Quantize"},
S(a,b){B.b.j(a.a,new A.F("ps1Quantize",B.r,A.d([new A.n(this.e,B.c),new A.n(this.f,B.e)],t.C),!1))},
R(a){var s=this,r="ps1Quantize",q=s.a.T(new A.a4(r,s.b,s.c,B.o,B.cq,B.c2)),p=A.aD(s.d),o=s.e,n=s.f
return A.d([new A.ff(new A.Z(r,A.d([new A.n(o,B.c),new A.n(n,B.e)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iB:1}
A.ff.prototype={
O(a){var s=this,r=a.P(s.d.a),q=a.b,p=a.d.f,o=q.a
A.ad(o,a.P(s.e.a).b)
A.a0(o,s.a.M())
A.aj(o,s.b.b)
A.I(o,0,r.b)
A.b(o,"uScene",B.n)
A.b(o,"uQuantizationBits",new A.e(B.a,p.ay))
A.b(o,"uDitherStrength",new A.e(B.a,p.Q))
A.a5(o,s.c)
q.U(3,0)},
$iy:1,
gl(){return this.a}}
A.bF.prototype={}
A.eD.prototype={
gB(){return"shadow"},
S(a,b){B.b.j(a.a,new A.F("shadowCaster",B.bz,A.d([new A.n(this.z,B.e)],t.C),!1))},
R(a){var s=this,r="shadowCaster",q=s.a.T(new A.a4(r,s.b,s.c,B.aH,B.aG,B.ce))
return A.d([new A.fi(new A.Z(r,A.d([new A.n(s.z,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iB:1}
A.fi.prototype={
O(a){var s,r,q,p,o=this,n=a.P("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.ad(s,n.b)
A.a0(s,o.a.M())
A.aK(s,B.V,1,0,0,0)
return}r=A.kU(l)
o.x.$1(r)
s=m.a
A.ad(s,n.b)
A.a0(s,o.a.M())
A.aK(s,B.V,1,0,0,0)
A.aj(s,o.b.b)
A.b(s,"uAlbedo",B.n)
for(s=a.d.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.A)(s),++p)o.cU(m,s[p],l,r)},
bS(a,b){var s,r
this.d.$1(b)
s=a.a
A.I(s,0,t.j.a(this.e.$1(null)))
A.b(s,"uAlphaCutoff",new A.e(B.a,0))
r=this.a.M()
A.a0(s,r)},
cU(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){b.gl()
s=a.a
A.b(s,"uUseInstances",B.ak)
n.bP(a,b.gl().c,d)
n.bS(a,b.gl().b)
r=b.gl()
q=n.c.$1(r.a)
A.a5(s,q.a)
s=q.b
r=q.c
if(s)a.b8(r,q.d,0)
else a.U(r,0)}else if(b instanceof A.bA){p=b.a
p.gl()
if(n.dc(b,c)===B.dg)return
n.bP(a,p.gl().c,d)
A.jz(a,b,!1)
n.bS(a,p.gl().b)
s=p.gl()
q=n.c.$1(s.a)
A.a5(a.a,q.a)
s=q.b
r=q.c
o=b.b.length
if(s)a.b9(r,q.d,o,0)
else a.b7(r,0,o)}else throw A.c(A.j("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dL(b).i(0),null))},
dc(a,b){return B.df},
bP(a,b,c){var s=a.a
A.b(s,"uModel",new A.e(B.l,new Float32Array(A.q(b.a2().a))))
A.b(s,"uLightViewProjection",new A.e(B.l,new Float32Array(A.q(c.a.a))))},
$iy:1,
gl(){return this.a}}
A.j9.prototype={
$1(a){return this.a.a=a},
$S:53}
A.ja.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:54}
A.eE.prototype={
gB(){return"shadowedWorld"},
S(a,b){var s=this,r=A.d([new A.n(s.db,B.c)],t.C)
if(s.ay)r.push(new A.n(s.dx,B.c))
r.push(new A.n(s.dy,B.e))
B.b.j(a.a,new A.F("shadowedWorld",B.ay,r,!1))},
R(a){var s=this,r="shadowedWorld",q=s.a.T(new A.a4(r,s.b,s.c,B.cr,B.cm,B.c1)),p=A.d([new A.n(s.db,B.c)],t.C)
if(s.ay)p.push(new A.n(s.dx,B.c))
p.push(new A.n(s.dy,B.e))
return A.d([new A.fj(new A.Z(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iB:1}
A.fj.prototype={
O(b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3=null,a4=b2.P("sceneColor"),a5=b2.b,a6=b2.d,a7=a6.c,a8=a6.d,a9=a6.f,b0=a2.z.$0(),b1=a5.a
A.ad(b1,a4.b)
A.a0(b1,a2.a.M())
s=a8.a
A.aK(b1,B.aq,1,s.c,s.b,s.a)
A.aj(b1,a2.b.b)
A.b(b1,"uAlbedo",B.n)
A.b(b1,"uNormalMap",B.dy)
A.b(b1,"uOrmMap",B.dz)
A.b(b1,"uEmissiveMap",B.dA)
A.b(b1,"uLightmap",B.dB)
s=t.j
A.I(b1,1,s.a(a2.y.$0()))
A.b(b1,"uShadowMap",B.F)
r=a7.d
q=t.n
A.b(b1,"uCameraPosition",new A.e(B.f,new Float32Array(A.q(A.d([r.a,r.b,r.c],q)))))
A.b(b1,"uShadowMapTexelSize",new A.e(B.E,new Float32Array(A.q(A.d([1/a2.ch,1/a2.CW],q)))))
A.b(b1,"uShadowFilterRadius",new A.e(B.a,a8.at))
A.b(b1,"uShadowBias",new A.e(B.a,a8.db))
A.I(b1,2,s.a(a2.at.$0()))
A.b(b1,"uSsao",B.b_)
A.b(b1,"uVertexSnapGrid",new A.e(B.a,a9.ax))
A.b(b1,"uSceneColorSize",new A.e(B.E,new Float32Array(A.q(A.d([a2.ax,a2.ay],q)))))
A.b(b1,"uViewProjection",new A.e(B.l,new Float32Array(A.q(a7.c.a))))
A.b(b1,"uView",new A.e(B.l,new Float32Array(A.q(a7.a.a))))
A.b(b1,"uLightViewProjection",new A.e(B.l,new Float32Array(A.q(b0.a.a))))
s=a8.b
A.b(b1,"uFogColor",new A.e(B.f,new Float32Array(A.q(A.d([s.a,s.b,s.c],q)))))
A.b(b1,"uFogStart",new A.e(B.a,a8.c))
A.b(b1,"uFogEnd",new A.e(B.a,a8.d))
A.b(b1,"uFogHeightFalloff",new A.e(B.a,0))
A.b(b1,"uFogDensity",new A.e(B.a,0))
p=a2.Q.$0()
s=A.d([],t.w)
r=a2.as.$0()
r=J.a3(r==null?B.a0:r)
o=p==null
while(r.k()){n=r.gm()
if(-1!==(o?a3:-1))s.push(n)}m=o?a3:B.j
if(m==null)m=B.j
l=o?a3:B.p
if(l==null)l=B.p
A.b(b1,"uLightPosition",new A.e(B.f,new Float32Array(A.q(A.d([m.a,m.b,m.c],q)))))
A.b(b1,"uLightDirection",new A.e(B.f,new Float32Array(A.q(A.d([l.a,l.b,l.c],q)))))
k=o?a3:B.Q
if(k==null)k=B.w
A.b(b1,"uLightColor",new A.e(B.f,new Float32Array(A.q(A.d([k.a,k.b,k.c],q)))))
r=o?a3:1
A.b(b1,"uLightIntensity",new A.e(B.a,r==null?0:r))
A.b(b1,"uSpotEnabled",new A.e(B.a,!o?1:0))
r=a8.go==null
j=r?a3:B.G
if(j==null)j=B.j
i=r?a3:B.aC
if(i==null)i=B.w
A.b(b1,"uDirectionalDirection",new A.e(B.f,new Float32Array(A.q(A.d([j.a,j.b,j.c],q)))))
A.b(b1,"uDirectionalColor",new A.e(B.f,new Float32Array(A.q(A.d([i.a,i.b,i.c],q)))))
r=r?a3:2.4
A.b(b1,"uDirectionalIntensity",new A.e(B.a,r==null?0:r))
for(r=a8.id,h=0;h<4;++h){n=r.length
if(h<n){if(!(h<n))return A.i(r,h)
g=r[h]}else g=a3
n=g==null
f=n?a3:g.b
if(f==null)f=B.y
e=n?a3:g.c
if(e==null)e=B.w
d=""+h
A.b(b1,"uPointPosition"+d,new A.e(B.f,new Float32Array(A.q(A.d([f.a,f.b,f.c],q)))))
A.b(b1,"uPointColor"+d,new A.e(B.f,new Float32Array(A.q(A.d([e.a,e.b,e.c],q)))))
c=n?a3:g.d
if(c==null)c=0
A.b(b1,"uPointIntensity"+d,new A.e(B.a,c))
n=n?a3:g.e
if(n==null)n=1
A.b(b1,"uPointRadius"+d,new A.e(B.a,n))}for(h=0;h<3;++h){r=s.length
if(h<r){if(!(h<r))return A.i(s,h)
g=s[h]}else g=a3
r=g==null
f=r?a3:B.j
if(f==null)f=B.y
b=r?a3:B.p
if(b==null)b=B.p
e=r?a3:B.Q
if(e==null)e=B.w
n=""+h
A.b(b1,"uDirectSpotPosition"+n,new A.e(B.f,new Float32Array(A.q(A.d([f.a,f.b,f.c],q)))))
A.b(b1,"uDirectSpotDirection"+n,new A.e(B.f,new Float32Array(A.q(A.d([b.a,b.b,b.c],q)))))
A.b(b1,"uDirectSpotColor"+n,new A.e(B.f,new Float32Array(A.q(A.d([e.a,e.b,e.c],q)))))
d=r?a3:1
if(d==null)d=0
A.b(b1,"uDirectSpotIntensity"+n,new A.e(B.a,d))
d=r?a3:1
if(d==null)d=1
A.b(b1,"uDirectSpotRange"+n,new A.e(B.a,d))
d=r?a3:0.3
if(d==null)d=0.3
A.b(b1,"uDirectSpotInnerCos"+n,new A.e(B.a,Math.cos(d)))
d=r?a3:0.5
if(d==null)d=0.5
A.b(b1,"uDirectSpotOuterCos"+n,new A.e(B.a,Math.cos(d)))
r=r?0:1
A.b(b1,"uDirectSpotEnabled"+n,new A.e(B.a,r))}s=o?a3:1
A.b(b1,"uLightRange",new A.e(B.a,s==null?1:s))
s=o?a3:0.3
if(s==null)s=0.3
A.b(b1,"uLightInnerCos",new A.e(B.a,Math.cos(s)))
s=o?a3:0.5
if(s==null)s=0.5
A.b(b1,"uLightOuterCos",new A.e(B.a,Math.cos(s)))
a=a8.fx
A.b(b1,"uAmbientColor",new A.e(B.f,new Float32Array(A.q(A.d([a.a,a.b,a.c],q)))))
A.b(b1,"uAmbientIntensity",new A.e(B.a,a8.fy))
A.b(b1,"uAmbientLightScale",new A.e(B.a,a8.ax))
A.b(b1,"uDirectLightScale",new A.e(B.a,a8.ay))
s=a8.dx
A.b(b1,"uReflectionColor",new A.e(B.f,new Float32Array(A.q(A.d([s.a,s.b,s.c],q)))))
A.b(b1,"uReflectionIntensity",new A.e(B.a,a8.dy))
A.b(b1,"uReflectionConfidence",new A.e(B.a,a8.fr))
A.b(b1,"uRainWetness",new A.e(B.a,a9.w))
A.b(b1,"uSurfaceSnowCoverage",new A.e(B.a,a9.x))
A.b(b1,"uSurfaceDissolution",new A.e(B.a,a9.y))
s=a8.k3
a0=A.i1(s,0,A.bP(4,"count",t.S),A.E(s).c).e6(0)
A.b(b1,"uThermalSourceCount",new A.e(B.a,a0.length))
for(h=0;h<4;++h){s=a0.length
if(h<s)if(!(h<s))return A.i(a0,h)
s=""+h
A.b(b1,"uThermalSourcePosition"+s,new A.e(B.f,new Float32Array(A.q(A.d([0,0,0],q)))))
A.b(b1,"uThermalSourceRadius"+s,new A.e(B.a,1))
A.b(b1,"uThermalSourceDissolution"+s,new A.e(B.a,0))}for(b1=a6.a,s=b1.length,r=a9.at,a1=0;a1<b1.length;b1.length===s||(0,A.A)(b1),++a1)a2.bT(a5,b1[a1],r,a8)
for(a6=a6.b,b1=a6.length,a1=0;a1<a6.length;a6.length===b1||(0,A.A)(a6),++a1)a2.bT(a5,a6[a1],r,a8)},
bT(a,b,c,d){var s,r,q,p,o,n,m=this
if(t.Y.b(b)){s=a.a
A.b(s,"uUseInstances",B.ak)
m.bU(a,b.gl().c)
r=b.gl()
q=b.gl()
p=b.gl()
b.gl()
m.bQ(a,r.b,q.e,p.f,c,!0,d)
o=m.c.$1(b.gl().a)
A.a5(s,o.a)
s=o.b
r=o.c
if(s)a.b8(r,o.d,0)
else a.U(r,0)}else if(b instanceof A.bA){n=b.a
m.bU(a,n.gl().c)
A.jz(a,b,!0)
s=n.gl()
r=n.gl()
q=n.gl()
n.gl()
m.bQ(a,s.b,r.e,q.f,c,!0,d)
o=m.c.$1(n.gl().a)
A.a5(a.a,o.a)
s=o.b
r=o.c
q=b.b.length
if(s)a.b9(r,o.d,q,0)
else a.b7(r,0,q)}else throw A.c(A.j("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dL(b).i(0),null))},
bQ(a,b,c,d,e,f,g){var s=this,r=null,q=s.d.$1(b),p=t.j,o=a.a
A.I(o,0,p.a(s.e.$1(r)))
A.I(o,3,p.a(s.f.$1(r)))
A.I(o,4,p.a(s.r.$1(r)))
A.I(o,5,p.a(s.w.$1(r)))
A.I(o,6,p.a(s.x.$1(r)))
A.b(o,"uAlphaCutoff",new A.e(B.a,0))
A.b(o,"uOpaqueCoverage",new A.e(B.a,c===B.X?0:1))
A.b(o,"uAffineWarpStrength",new A.e(B.a,0))
p=t.n
A.b(o,"uMaterialTint",new A.e(B.f,new Float32Array(A.q(A.d([q.d,q.e,q.f],p)))))
A.b(o,"uEmissiveStrength",new A.e(B.a,0))
A.b(o,"uUvScaleOffset",new A.e(B.dx,new Float32Array(A.q(A.d([1,1,0,0],p)))))
A.b(o,"uNormalStrength",new A.e(B.a,g.ch))
A.b(o,"uRoughness",new A.e(B.a,q.at*g.CW))
A.b(o,"uMetallic",new A.e(B.a,q.ax*g.cx))
A.b(o,"uSpecularScale",new A.e(B.a,g.cy))
A.b(o,"uClearcoatStrength",new A.e(B.a,q.ch))
A.b(o,"uClearcoatRoughness",new A.e(B.a,q.CW))
A.b(o,"uOcclusionStrength",new A.e(B.a,1))
A.b(o,"uLightmapIntensity",new A.e(B.a,0))
A.b(o,"uReceivesShadow",new A.e(B.a,1))
A:{p=r
if(B.X===c){switch(d.a){case 0:p=B.bo
break
case 1:p=B.bn
break}break A}if(B.M===c||B.bm===c){p=s.a.M()
break A}}A.a0(o,p)},
bU(a,b){var s=b.a2(),r=a.a
A.b(r,"uModel",new A.e(B.l,new Float32Array(A.q(s.a))))
A.b(r,"uNormalMatrix",new A.e(B.l,new Float32Array(A.q(s.bh().a))))},
$iy:1,
gl(){return this.a}}
A.eH.prototype={
gB(){return"ssaoOcclusion"},
S(a,b){B.b.j(a.a,new A.F("ssaoOcclusion",B.Z,A.d([new A.n(this.w,B.e)],t.C),!1))},
R(a){var s=this,r="ssaoOcclusion",q=s.a.T(new A.a4(r,s.b,s.c,B.o,B.aJ,B.c0)),p=A.aD(s.d)
return A.d([new A.fl(new A.Z(r,A.d([new A.n(s.w,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iB:1}
A.fl.prototype={
O(a){var s,r,q,p=this,o=a.b,n=a.d.f.c,m=o.a
A.ad(m,a.P("ssaoRaw").b)
A.a0(m,p.a.M())
if(n<=0){A.aK(m,B.v,1,1,1,1)
return}A.aK(m,B.v,1,0,0,0)
s=p.e.$0()
A.aj(m,p.b.b)
A.I(m,0,t.j.a(p.d.$0()))
A.b(m,"uSceneDepth",B.n)
A.b(m,"uNear",new A.e(B.a,s.f))
A.b(m,"uFar",new A.e(B.a,s.r))
r=s.b.a
q=r.length
if(0>=q)return A.i(r,0)
A.b(m,"uProjScaleX",new A.e(B.a,r[0]))
if(5>=q)return A.i(r,5)
A.b(m,"uProjScaleY",new A.e(B.a,r[5]))
A.b(m,"uRadius",new A.e(B.a,p.f))
A.b(m,"uStrength",new A.e(B.a,n))
A.a5(m,p.c)
o.U(3,0)},
$iy:1,
gl(){return this.a}}
A.eG.prototype={
gB(){return"ssaoBlur"},
S(a,b){B.b.j(a.a,new A.F("ssaoBlur",B.Z,A.d([new A.n(this.y,B.c),new A.n(this.z,B.e)],t.C),!1))},
R(a){var s=this,r="ssaoBlur",q=s.a.T(new A.a4(r,s.b,s.c,B.o,B.cj,B.ch)),p=A.aD(s.d)
return A.d([new A.fk(new A.Z(r,A.d([new A.n(s.y,B.c),new A.n(s.z,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iB:1}
A.fk.prototype={
O(a){var s,r,q=this,p=a.b,o=p.a
A.ad(o,a.P("ssaoBlurred").b)
A.a0(o,q.a.M())
if(a.d.f.c<=0){A.aK(o,B.v,1,1,1,1)
return}A.aK(o,B.v,1,0,0,0)
s=q.f.$0()
A.aj(o,q.b.b)
r=t.j
A.I(o,0,r.a(q.d.$0()))
A.b(o,"uSsaoRaw",B.n)
A.I(o,1,r.a(q.e.$0()))
A.b(o,"uSceneDepth",B.F)
A.b(o,"uTexelSize",new A.e(B.E,new Float32Array(A.q(A.d([1/q.r,1/q.w],t.n)))))
A.b(o,"uNear",new A.e(B.a,s.f))
A.b(o,"uFar",new A.e(B.a,s.r))
A.a5(o,q.c)
p.U(3,0)},
$iy:1,
gl(){return this.a}}
A.eR.prototype={
gB(){return"vhs"},
S(a,b){var s=this.w
a.b.j(0,s.a)
B.b.j(a.a,new A.F("vhs",B.r,A.d([new A.n(this.r,B.c),new A.n(s,B.u),new A.n(s,B.e)],t.C),!1))},
R(a){var s=this,r=s.a.T(new A.a4("vhs",s.b,s.c,B.o,B.ck,B.c3)),q=A.aD(s.d),p=s.r,o=s.w
return A.d([new A.fq(new A.Z("vhs",A.d([new A.n(p,B.c),new A.n(o,B.u),new A.n(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iB:1}
A.fq.prototype={
O(a){var s=this,r=a.P(s.f.a),q=a.P(s.r.a),p=a.b,o=a.d.f,n=p.a
A.ad(n,q.b)
A.a0(n,s.a.M())
A.aj(n,s.b.b)
A.I(n,0,r.b)
A.b(n,"uScene",B.n)
A.I(n,1,t.j.a(s.d.$0()))
A.b(n,"uHistory",B.F)
A.b(n,"uTime",new A.e(B.a,s.e.$0()))
A.b(n,"uChromaWeight",new A.e(B.a,o.ch))
A.b(n,"uTrackingWeight",new A.e(B.a,o.CW))
A.b(n,"uNoiseWeight",new A.e(B.a,o.cx))
A.b(n,"uHeadSwitchWeight",new A.e(B.a,o.cy))
A.b(n,"uDropoutWeight",new A.e(B.a,o.db))
A.b(n,"uGhostWeight",new A.e(B.a,o.dx))
A.a5(n,s.c)
p.U(3,0)},
$iy:1,
gl(){return this.a}}
A.eS.prototype={
gB(){return"volumetricLight"},
S(a,b){var s=this,r=s.w,q=t.C,p=a.a
B.b.j(p,new A.F("volumetricLight",B.Z,A.d([new A.n(s.x,B.c),new A.n(r,B.e)],q),!1))
B.b.j(p,new A.F("volumetricComposite",B.r,A.d([new A.n(r,B.c),new A.n(s.y,B.c),new A.n(s.z,B.e)],q),!1))},
R(a){var s,r,q,p,o,n,m=this,l="volumetricLight",k="volumetricComposite",j=m.a,i=m.b,h=j.T(new A.a4(l,i,m.c,B.o,B.aJ,B.c4)),g=m.e,f=A.aD(g),e=m.Q
B.b.j(e,f)
s=m.w
r=t.C
q=A.d([new A.fs(new A.Z(l,A.d([new A.n(m.x,B.c),new A.n(s,B.e)],r),!1,!1,!1,!1),h,f,s.a,m.f,m.r)],t.u)
p=m.z
o=j.T(new A.a4(k,i,m.d,B.o,B.cs,B.ci))
n=A.aD(g)
B.b.j(e,n)
B.b.j(q,new A.fr(new A.Z(k,A.d([new A.n(s,B.c),new A.n(m.y,B.c),new A.n(p,B.e)],r),!1,!1,!0,!1),o,n,s,p))
return q},
$iB:1}
A.fs.prototype={
O(a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this,a1=a6.P(a0.d),a2=a6.b,a3=a0.f.$0(),a4=a6.d.d,a5=a2.a
A.ad(a5,a1.b)
A.a0(a5,a0.a.M())
A.aK(a5,B.v,1,0,0,0)
A.aj(a5,a0.b.b)
A.I(a5,0,t.j.a(a0.e.$0()))
A.b(a5,"uSceneDepth",B.n)
A.b(a5,"uNear",new A.e(B.a,a3.f))
A.b(a5,"uFar",new A.e(B.a,a3.r))
A.b(a5,"uViewProjection",new A.e(B.l,new Float32Array(A.q(a3.c.a))))
s=a3.a.a
A.b(a5,"uView",new A.e(B.l,new Float32Array(A.q(s))))
A.b(a5,"uInverseProjection",new A.e(B.l,new Float32Array(A.q(a3.gc7().a))))
r=a4.go==null
A.b(a5,"uShaftIntensity",new A.e(B.a,r?0:0.36))
A.b(a5,"uFogDensity",new A.e(B.a,0))
A.b(a5,"uAnisotropy",new A.e(B.a,a4.y))
q=a4.r
p=t.n
A.b(a5,"uVolumetricAlbedo",new A.e(B.f,new Float32Array(A.q(A.d([q.a,q.b,q.c],p)))))
A.b(a5,"uVolumetricHeightFalloff",new A.e(B.a,a4.w))
A.b(a5,"uVolumetricDustDensity",new A.e(B.a,a4.x))
A.b(a5,"uVolumetricJitter",new A.e(B.a,a4.z))
A.b(a5,"uVolumetricIntensity",new A.e(B.a,a4.Q))
A.b(a5,"uVolumetricSampleCount",new A.e(B.a,a4.as))
if(r)o=B.j
else{q=B.G.gE()
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
o=new A.f(n*l+k*j+q*i,n*h+k*g+q*f,n*e+k*d+q*s[10]).gE()}c=r?null:B.aC
if(c==null)c=B.w
A.b(a5,"uLightDir",new A.e(B.f,new Float32Array(A.q(A.d([o.a,o.b,o.c],p)))))
A.b(a5,"uLightColor",new A.e(B.f,new Float32Array(A.q(A.d([c.a,c.b,c.c],p)))))
b=A.oI(4,a3.d,a4.k2)
A.b(a5,"uVolumetricSourceCount",new A.e(B.a,b.length))
for(a=0;a<4;++a){s=b.length
if(a<s)if(!(a<s))return A.i(b,a)
s=""+a
A.b(a5,"uSourcePosition"+s,new A.e(B.f,new Float32Array(A.q(A.d([0,0,0],p)))))
A.b(a5,"uSourceColor"+s,new A.e(B.f,new Float32Array(A.q(A.d([0,0,0],p)))))
A.b(a5,"uSourceIntensity"+s,new A.e(B.a,0))
A.b(a5,"uSourceReferenceDistance"+s,new A.e(B.a,1))
A.b(a5,"uSourceCutoffDistance"+s,new A.e(B.a,1))}A.a5(a5,a0.c)
a2.U(3,0)},
$iy:1,
gl(){return this.a}}
A.fr.prototype={
O(a){var s=this,r=a.am(s.e),q=a.am(s.d),p=a.b,o=p.a
A.ad(o,r.b)
A.l_(o,1)
A.a0(o,B.ar)
A.aj(o,s.b.b)
A.I(o,0,q.b)
A.b(o,"uVolumetric",B.n)
A.b(o,"uVolumetricStrength",B.aZ)
A.a5(o,s.c)
p.U(3,0)},
$iy:1,
gl(){return this.a}}
A.d4.prototype={}
A.eV.prototype={
gB(){return"world"},
S(a,b){B.b.j(a.a,new A.F("worldOpaqueTransparent",B.ay,A.d([new A.n(this.e,B.e)],t.C),!1))},
R(a){var s=this,r=s.a.T(new A.a4("safeWorld",s.b,s.c,B.ct,B.o,B.c7)),q=s.e
return A.d([new A.fv(new A.Z("worldOpaqueTransparent",A.d([new A.n(q,B.e)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iB:1}
A.fv.prototype={
O(a){var s,r,q,p,o=this,n=a.b,m=a.d,l=m.d,k=n.a
A.ad(k,a.P(o.d).b)
A.a0(k,o.a.M())
s=l.a
A.aK(k,B.aq,1,s.c,s.b,s.a)
A.aj(k,o.b.b)
A.b(k,"uViewProjection",new A.e(B.l,new Float32Array(A.q(m.c.c.a))))
r=l.go==null?null:B.G
if(r==null)r=B.j
s=t.n
A.b(k,"uLightDir",new A.e(B.f,new Float32Array(A.q(A.d([r.a,r.b,r.c],s)))))
q=l.fx
A.b(k,"uAmbientColor",new A.e(B.f,new Float32Array(A.q(A.d([q.a,q.b,q.c],s)))))
A.b(k,"uAmbientIntensity",new A.e(B.a,l.fy))
A.b(k,"uAmbientLightScale",new A.e(B.a,l.ax))
A.b(k,"uDirectLightScale",new A.e(B.a,l.ay))
for(k=m.a,s=k.length,p=0;p<k.length;k.length===s||(0,A.A)(k),++p)o.bG(n,k[p])
for(m=m.b,k=m.length,p=0;p<m.length;m.length===k||(0,A.A)(m),++p)o.bG(n,m[p])},
bG(a,b){var s,r,q,p,o,n=this
if(b instanceof A.bA){s=b.a
n.bR(a,s.gl().c)
A.jz(a,b,!0)
r=n.c.$1(s.gl().a)
A.a5(a.a,r.a)
q=r.b
p=r.c
o=b.b.length
if(q)a.b9(p,r.d,o,0)
else a.b7(p,0,o)}else if(t.Y.b(b)){q=a.a
A.b(q,"uUseInstances",B.ak)
n.bR(a,b.gl().c)
r=n.c.$1(b.gl().a)
A.a5(q,r.a)
q=r.b
p=r.c
if(q)a.b8(p,r.d,0)
else a.U(p,0)}else throw A.c(A.j("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dL(b).i(0),null))},
bR(a,b){var s=b.a2(),r=a.a
A.b(r,"uModel",new A.e(B.l,new Float32Array(A.q(s.a))))
A.b(r,"uNormalMatrix",new A.e(B.l,new Float32Array(A.q(s.bh().a))))},
$iy:1,
gl(){return this.a}}
A.cc.prototype={
sbi(a){var s=this.b
this.b=new A.aw(a,s.b,s.c)
this.a3()},
sbr(a){var s=this.b
this.b=new A.aw(s.a,s.b,a)
this.a3()},
bl(a,b){var s=a.gE(),r=b/2,q=Math.sin(r),p=Math.cos(r),o=this.b
this.b=new A.aw(o.a,o.b.t(0,new A.bE(s.a*q,s.b*q,s.c*q,p)),o.c)
this.a3()},
gbq(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this
if(g.d){s=g.e
if(s!=null){r=s.gbq()
q=g.b
p=r.b
o=r.c
n=q.a.t(0,o)
m=new A.f(p.a,p.b,p.c)
l=m.a1(n)
k=m.a1(l)
n=r.a.L(0,n.L(0,l.t(0,2*p.d)).L(0,k.t(0,2)))
p=p.t(0,q.b)
r=p.a
j=p.b
i=p.c
p=p.d
h=Math.sqrt(r*r+j*j+i*i+p*p)
r=h<1e-9?B.D:new A.bE(r/h,j/h,i/h,p/h)
q=new A.aw(n,r,o*q.c)
r=q}else r=g.b
g.c=r
g.d=!1}return g.c},
a3(){var s,r,q
if(this.d)return
this.d=!0
for(s=this.f,r=s.length,q=0;q<s.length;s.length===r||(0,A.A)(s),++q)s[q].a3()},
c2(a){var s=a.e
if(s===this)return
if(s!=null)if(B.b.ae(s.f,a)){a.e=null
a.a3()}a.e=this
a.a3()
B.b.j(this.f,a)},
aF(a,b,c,d,e,f){var s=A.jT(B.U,null,!0,B.M,null,b,c,d,e,!0,0,f,-1)
this.c2(s)
return s},
dP(a){var s={}
s.a=null
new A.hX(s,a).$1(this)
return s.a},
bt(a){var s,r,q,p,o,n=this,m=n.r,l=n.w
if(m!=null&&l!=null){s=new A.cb(m,l,n.gbq(),n.z,n.Q,n.as,!0,!0,n.ch)
r=n.CW
q=a.b
if(r==null){a.c1(s)
n.CW=q.ds(s)}else{a.c1(s)
p=q.$ti
p.c.a(r)
p.y[1].a(s)
q.ag(r)
q=q.b
p=r.a
if(!(p>=0&&p<q.length))return A.i(q,p)
q[p].sb3(s)}}else{q=n.CW
if(q!=null){a.b.aJ(q)
n.CW=null}}for(q=n.f,p=q.length,o=0;o<q.length;q.length===p||(0,A.A)(q),++o)q[o].bt(a)}}
A.hX.prototype={
$1(a){var s,r,q,p,o,n,m=a.x
if(m==null)s=null
else{r=a.gbq().a2()
m=m.gaG()
q=A.E(m)
s=A.fz(new A.a6(m,q.h("f(1)").a(r.gaK()),q.h("a6<1,f>")))}if(s!=null){m=this.b
p=m.dH(s)
if(p!=null){r=this.a
q=r.a
if(q==null||p<q.d){o=m.a.L(0,m.b.t(0,p))
o.a8(0,s.a.L(0,s.b).t(0,0.5)).gE()
r.a=new A.hM(a,o,p)}}}for(m=a.f,r=m.length,n=0;n<m.length;m.length===r||(0,A.A)(m),++n)this.$1(m[n])},
$S:55}
A.h_.prototype={
v(){return"GpuBufferUsage."+this.b}}
A.e3.prototype={
v(){return"GpuBufferKind."+this.b}}
A.h4.prototype={
v(){return"GpuTextureFilter."+this.b}}
A.h5.prototype={
v(){return"GpuTextureWrap."+this.b}}
A.e2.prototype={}
A.h3.prototype={}
A.c1.prototype={
v(){return"GpuTargetAttachment."+this.b}}
A.cH.prototype={}
A.e4.prototype={
v(){return"GpuDeviceStatus."+this.b}}
A.cd.prototype={
v(){return"ShaderCompileStage."+this.b}}
A.d8.prototype={
i(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.ba.prototype={
v(){return"UniformType."+this.b}}
A.e.prototype={}
A.cy.prototype={
v(){return"ClearMask."+this.b}}
A.dW.prototype={
U(a,b){var s=this.a
if(s.b!==B.d)A.l(A.m(u.k))
s.a.drawArrays(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.ah(a,1)},
b7(a,b,c){var s=this.a
if(s.b!==B.d)A.l(A.m(u.k))
s.a.drawArraysInstanced(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.ah(a,c)},
b8(a,b,c){var s,r,q=this.a
if(q.b!==B.d)A.l(A.m(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.ah(a,1)},
b9(a,b,c,d){var s,r,q=this.a
if(q.b!==B.d)A.l(A.m(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.ae(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.ah(a,c)},
$im6:1}
A.c_.prototype={}
A.d_.prototype={
dO(a,b){var s,r,q,p,o,n,m,l,k=this,j=A.p(k.a.getBoundingClientRect()),i=a-A.aN(j.left),h=b-A.aN(j.top)
if(i<0||i>A.aN(j.width)||h<0||h>A.aN(j.height))return null
s=k.y
r=k.x
q=r.c/r.d
p=s!=null?s.bn(q):A.fD(q,B.b2,200,B.b3,1,0.1,B.j)
r=B.k.bo(A.aN(j.width))
o=B.k.bo(A.aN(j.height))
if(r<=0||o<=0)A.l(A.j("Viewport dimensions must be > 0",null))
n=i/r*2-1
m=1-h/o*2
r=p.gdI()
l=r.aL(new A.f(n,m,-1))
return k.e.dP(new A.hL(p.d,r.aL(new A.f(n,m,1)).a8(0,l).gE()))},
cZ(){var s,r=this,q=v.G
A.p(q.window).addEventListener("resize",A.a2(new A.hv(r)))
s=r.a
s.addEventListener("webglcontextlost",A.a2(new A.hw(r)))
s.addEventListener("webglcontextrestored",A.a2(new A.hx(r)))
s.addEventListener("contextmenu",A.a2(new A.hy()))
s.addEventListener("mousedown",A.a2(new A.hz(r)))
A.p(q.window).addEventListener("mousemove",A.a2(new A.hA(r)))
A.p(q.window).addEventListener("mouseup",A.a2(new A.hB(r)))
s.addEventListener("wheel",A.a2(new A.hC(r)))
A.p(q.window).addEventListener("keydown",A.a2(new A.hD(r)))
A.p(q.window).addEventListener("keyup",A.a2(new A.hE(r)))},
c_(){var s,r,q,p,o=this.y
if(o instanceof A.bx){s=this.z
r=s.n(0,"keyw")||s.n(0,"arrowup")?1:0
if(s.n(0,"keys")||s.n(0,"arrowdown"))--r
q=s.n(0,"keya")||s.n(0,"arrowleft")?-1:0
if(s.n(0,"keyd")||s.n(0,"arrowright"))++q
p=s.n(0,"space")||s.n(0,"keye")?1:0
o.z=new A.f(q,s.n(0,"shiftleft")||s.n(0,"keyq")?p-1:p,r)}},
bO(){var s,r=this,q=r.a,p=A.a(q.clientWidth)>0?A.a(q.clientWidth):A.a(q.width),o=A.a(q.clientHeight)>0?A.a(q.clientHeight):A.a(q.height),n=r.x
if(p===n.a&&o===n.b)return
n=n.e
n=A.kW(o,p,n,n,!0)
r.x=n
q.width=n.c
q.height=r.x.d
try{q=r.x
r.b.aB()
q.A()
r.d.bf("surface resized")}catch(s){}},
cq(){var s=this
if(s.as)return
s.as=!0
s.at=0
A.a(A.p(v.G.window).requestAnimationFrame(A.a2(s.gbW())))},
da(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
A.aN(a)
if(!e.as)return
s=a/1000
r=e.at
q=r>0?s-r:0.016666666666666666
e.at=s
e.bO()
if(!e.ax&&e.b.e!==B.a6){r=e.c
e.e.bt(r)
p=e.y
o=p!=null
if(o)p.cj(q)
n=e.x
m=n.c/n.d
l=o?p.bn(m):A.fD(m,B.b2,200,B.b3,1,0.1,B.j)
o=e.d
n=e.f
k=e.r
j=o.a
o.a=j+1
o=e.b
o.dg(r,new A.fV(l,n,k,-1,j,s))
o.gH()
j=e.Q
if(j!=null)j.$1(new A.c_(s,q))
i=o.du()
if(e.w){r=e.dx+=q
o=++e.dy
if(r>=0.5){e.fr=o/r
e.dy=e.dx=0
h=e.db
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
e.db=h}f=B.k.a6(q*1000,1)
h.innerText="FPS: "+B.k.a6(e.fr,0)+" ("+f+" ms)\nDraws: "+i.b+" | Tris: "+i.c+"\nInstances: "+i.e+" | VRAM: "+B.k.a6(i.r/1024,0)+" KB"}}}A.a(A.p(v.G.window).requestAnimationFrame(A.a2(e.gbW())))},
sdN(a){this.Q=t.a4.a(a)}}
A.hG.prototype={
$1(a){var s=this.a,r=a.a===B.a3?2:1,q=a===B.aN?0:1
return new A.d3(a,s.c,s.d,r,q)},
$S:57}
A.hv.prototype={
$1(a){A.p(a)
return this.a.bO()},
$S:58}
A.hw.prototype={
$1(a){var s
A.p(a)
s=this.a
s.ax=!0
s.d.bf("gl context lost")},
$S:0}
A.hx.prototype={
$1(a){var s
A.p(a)
s=this.a
s.ax=!1
s.d.bf("gl context restored")},
$S:0}
A.hy.prototype={
$1(a){A.p(a).preventDefault()},
$S:0}
A.hz.prototype={
$1(a){var s
A.p(a)
s=this.a
s.ch=!0
s.CW=A.a(a.button)
s.cx=A.a(a.clientX)
s.cy=A.a(a.clientY)},
$S:0}
A.hA.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
A.p(a)
s=this.a
if(s.ch)r=s.y!=null
else r=!1
if(r){q=A.a(a.clientX)
p=A.a(a.clientY)
o=q-s.cx
n=p-s.cy
s.cx=q
s.cy=p
m=s.y
if(m instanceof A.bm)if(s.CW===0&&!A.iK(a.shiftKey)){m.ax+=o*0.006
m.ay=B.k.a5(m.ay+n*0.006,-1.5079644737231006,1.5079644737231006)}else{s=m.b
l=m.gce()
k=m.gce().a1(m.a.a8(0,m.gba()).gE()).gE()
j=l.t(0,-o*0.003*s).L(0,k.t(0,n*0.003*s))
m.CW=m.CW.L(0,j)}else if(m instanceof A.bx){m.b+=o*0.003
m.c=B.k.a5(m.c-n*0.003,-1.5393804002589986,1.5393804002589986)}}},
$S:0}
A.hB.prototype={
$1(a){A.p(a)
this.a.ch=!1},
$S:0}
A.hC.prototype={
$1(a){var s,r,q
A.p(a)
s=this.a
r=s.y
if(r!=null){a.preventDefault()
q=s.y
if(q instanceof A.bm){s=A.aN(a.deltaY)
q.ch=B.k.a5(q.ch+s*0.003,0.5,100)}else if(q instanceof A.bx){s=A.aN(a.deltaY)
q.a=q.a.L(0,q.gai().t(0,q.d*(-s*0.002)))}}},
$S:0}
A.hD.prototype={
$1(a){var s=this.a
s.z.j(0,A.al(A.p(a).code).toLowerCase())
s.c_()},
$S:0}
A.hE.prototype={
$1(a){var s=this.a
s.z.ae(0,A.al(A.p(a).code).toLowerCase())
s.c_()},
$S:0}
A.es.prototype={
cc(a){var s=this.b.q(0,a)
if(s==null)throw A.c(A.m("resource is not in candidate: "+a))
return s}}
A.h0.prototype={
gm(){var s=this.c
if(s==null)throw A.c(A.m("GPU resource adapter is not initialized"))
return s},
ab(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.cQ(s.b)
r.b.ab()
r.c=null
r.e=!0},
bE(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.b3(a0,a1),a3=A.d([],t.J)
try{k=a4.a
j=k.$ti
i=j.h("z(1)")
j=j.h("a1<1>")
s=new A.a1(k,i.a(new A.h1()),j)
for(h=s,g=J.a3(h.a),h=new A.G(g,h.b,h.$ti.h("G<1>")),f=a.a;h.k();){r=g.gm()
q=A.l6(f,a.bF(r,a5))
J.fy(a3,q)
J.fx(a2,r,q)}e=A.aC(new A.a1(k,i.a(new A.h2()),j),j.h("k.E"))
B.b.cp(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.A)(k),++d){o=k[d]
n=A.oz(J.lX(o,11))
if(i){h=J.jE(a2,"sceneColor")
h.toString
J.fx(a2,o,h)}else{h=n
if(typeof h!=="number")return h.cm()
if(h>=2){h=J.jE(a2,"sceneColor#1")
h.toString
J.fx(a2,o,h)}else{m=A.l6(f,a.bF(o,a5))
J.fy(a3,m)
J.fx(a2,o,m)}}}a0=A.kx(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.E(a0).h("d6<1>"),a0=new A.d6(a0,k),a0=new A.ai(a0,a0.gp(0),k.h("ai<Q.E>")),j=a.a,i=t.V,k=k.h("Q.E");a0.k();){h=a0.d
l=h==null?k.a(h):h
b=i.a(a1.a(l).a)
A.jU(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}throw c}},
bF(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.cH(512,512,1,B.Y,!0)
if(a==="sceneDepth")return new A.cH(n,m,1,B.Y,!0)
s=B.t.a7(a,"ssao")||B.t.a7(a,"bloomBlur")||B.t.a7(a,"dofBlur")||B.t.a7(a,"volumetricLight")
r=s?B.i.a4(n+1,2):n
q=s?B.i.a4(m+1,2):m
p=a==="sceneColor"
o=p||B.t.a7(a,"sceneColor#")
p=p?b.d:1
return new A.cH(r,q,p,o?B.av:B.bx,o)},
cQ(a){var s,r,q,p,o,n=A.jO(t.bS.a(a).gck(),t.j)
for(n=A.jY(n,n.r,A.u(n).c),s=this.a,r=t.V,q=n.$ti.c;n.k();){p=n.d
o=r.a((p==null?q.a(p):p).a)
A.jU(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}
A.h1.prototype={
$1(a){return!B.t.a7(A.al(a),"sceneColor#")},
$S:8}
A.h2.prototype={
$1(a){return B.t.a7(A.al(a),"sceneColor#")},
$S:8}
A.dt.prototype={
v(){return"_SlotState."+this.b}}
A.br.prototype={
sb3(a){this.c=this.$ti.h("1?").a(a)}}
A.aT.prototype={
b4(a,b){var s,r,q,p,o=this,n=o.$ti
n.y[1].a(a)
s=o.c
r=s.length
if(r!==0){if(0>=r)return A.i(s,-1)
q=s.pop()}else{s=o.b
B.b.j(s,new A.br(B.S,n.h("br<2>")))
q=s.length-1}n=o.b
if(!(q>=0&&q<n.length))return A.i(n,q)
p=n[q];++p.a
p.b=B.dX
p.sb3(a)
p.f=b;++o.d
return o.a.$3(q,p.a,b)},
ds(a){return this.b4(a,null)},
ag(a){var s,r,q
this.$ti.c.a(a)
s=a.a
if(s<0||s>=this.b.length)throw A.c(A.bg(B.aA,a))
r=this.b
if(!(s>=0&&s<r.length))return A.i(r,s)
q=r[s]
if(q.a!==a.b)throw A.c(A.bg(B.aB,a))
s=q.b
if(s===B.T||s===B.S)throw A.c(A.bg(B.P,a))},
b5(a){var s,r,q=this.$ti
q.c.a(a)
this.ag(a)
s=this.b
r=a.a
if(!(r>=0&&r<s.length))return A.i(s,r)
r=s[r].c
return r==null?q.y[1].a(r):r},
aJ(a){var s,r,q,p=this
p.$ti.c.a(a)
s=a.a
if(s<0||s>=p.b.length)throw A.c(A.bg(B.aA,a))
r=p.b
if(!(s>=0&&s<r.length))return A.i(r,s)
q=r[s]
if(q.a!==a.b)throw A.c(A.bg(B.aB,a))
r=q.b
if(r===B.T||r===B.S)throw A.c(A.bg(B.bK,a))
q.b=B.T
q.sb3(null)
B.b.j(p.c,s);++p.e},
aj(){return new A.aU(this.dL(),this.$ti.h("aU<+(1,2)>"))},
dL(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k,j,i
return function $async$aj(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b,n=s.a,m=s.$ti.y[1],l=0
case 2:if(!(l<o.length)){r=4
break}k=o[l]
j=k.b
if(j===B.T||j===B.S){r=3
break}j=n.$3(l,k.a,k.f)
i=k.c
r=5
return a.b=new A.ak(j,i==null?m.a(i):i),1
case 5:case 3:++l
r=2
break
case 4:return 0
case 1:return a.c=p.at(-1),3}}}}}
A.fB.prototype={
v(){return"BlendEquation."+this.b}}
A.bW.prototype={
v(){return"BlendFactor."+this.b}}
A.fH.prototype={
v(){return"CullFace."+this.b}}
A.fL.prototype={
v(){return"DepthFunc."+this.b}}
A.bZ.prototype={}
A.ab.prototype={
v(){return"StateField."+this.b}}
A.ie.prototype={
dt(a){var s,r=this.a
if(r==null)return A.mn(B.cd,t.d5)
s=A.an(t.d5)
if(r.a!==a.a)s.j(0,B.a9)
if(r.b!==a.b)s.j(0,B.aa)
if(r.c!==a.c)s.j(0,B.ab)
if(r.d!==a.d)s.j(0,B.ac)
if(r.e!==a.e||r.f!==a.f)s.j(0,B.ad)
if(r.r!==a.r)s.j(0,B.ae)
if(r.w!==a.w)s.j(0,B.af)
if(r.x!==a.x)s.j(0,B.ag)
return s}}
A.be.prototype={$iaH:1}
A.dD.prototype={}
A.dC.prototype={}
A.fu.prototype={}
A.eT.prototype={
cv(a){var s=this,r=A.p(s.a.canvas)
s.c=A.a2(new A.ib(s))
s.d=A.a2(new A.ic(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
ao(a){var s=A.cp(this.a.getParameter(a))
return typeof s=="number"?B.k.bo(s):0},
bL(a){var s=A.cp(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
$imc:1}
A.ib.prototype={
$1(a){A.p(a).preventDefault()
this.a.b=B.O},
$S:13}
A.ic.prototype={
$1(a){this.a.b=B.d},
$S:13}
A.iJ.prototype={
dh(){var s,r=this
if(r.b!==B.d)A.l(A.m(u.k))
s=r.w?A.J(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.be(new A.fu(s))},
bX(a){var s=a.a
if(!(s instanceof A.fu))throw A.c(A.aG(a,"query","is not a GPU timer query"))
return s}}
A.ft.prototype={}
A.ia.prototype={}
A.id.prototype={
dr(a){var s=A.J(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.ia(A.mY(s))}}
A.jm.prototype={
$1(a){var s,r,q,p
A.p(a)
s=A.al(this.a.value)
A:{if("aces"===s){r=B.di
break A}if("reinhard"===s){r=B.ah
break A}if("off"===s){r=B.aX
break A}r=B.ai
break A}q=this.b
p=q.r
q.r=A.er(p.at,p.b,p.as,p.d,p.Q,p.a,p.f,p.ay,p.r,p.z,!1,p.c,p.y,p.x,p.w,r,p.ax,p.ch,p.db,p.dx,p.cy,p.cx,p.CW,p.e)},
$S:0}
A.jn.prototype={
$1(a){var s,r,q
A.p(a)
s=A.al(this.a.value)
A:{if("clean"===s){r=A.er(0,0,0,0,0,1,0,8,0,1,!1,0,0,0,0,B.ai,0,0,0,0,0,0,0,0)
break A}if("ps1"===s){r=A.er(0.35,0,0,0,0.65,1,0,5,0,1,!1,0,0,0,0,B.aX,0,0,0,0,0,0,0,0)
break A}if("vhs"===s){r=A.er(0,0,0,0,0,1,0,8,0,1,!1,0,0,0,0,B.ah,0,0.45,0,0,0,0.25,0.4,0.3)
break A}r=A.kP()
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
A.jo.prototype={
$1(a){var s
A.p(a)
s=this.a.y
s=s instanceof A.bm?s:null
if(s!=null)s.as=A.iK(this.b.checked)},
$S:0}
A.jp.prototype={
$1(a){var s,r,q,p=this
A.p(a)
s=p.b
if(A.al(p.a.value)==="fly"){s.y=new A.bx(B.dD,6,B.y,B.y)
s=p.c
if(t.m.b(s))A.p(s.style).display="none"}else{r=s.y=A.kN(8.5,B.R)
r.d=0.45
s=p.d
q=t.m
if(q.b(s)){r.as=A.iK(s.checked)
r.at=0.18}s=p.c
if(q.b(s))A.p(s.style).display="flex"}},
$S:0}
A.jq.prototype={
$1(a){var s
A.p(a)
s=this.a.q(0,A.al(this.b.value))
if(s!=null)this.c.w=s},
$S:0}
A.jr.prototype={
$1(a){var s,r,q,p,o,n,m,l,k=this
A.p(a)
s=k.b.dO(A.a(a.clientX),A.a(a.clientY))
r=k.a
if(s!=null){q=s.a
r.a=q
r.b=1
p=B.k.a6(s.d,2)
o=s.b
r=B.k.a6(o.a,1)
n=B.k.a6(o.b,1)
m=B.k.a6(o.c,1)
l=k.c
if(l!=null)l.textContent="Selected: "+q.a+" | Dist: "+p+" | Pt: "+("("+r+", "+n+", "+m+")")}else{r.a=null
r=k.c
if(r!=null)r.textContent="Click any 3D object to inspect"}},
$S:0}
A.js.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=a.a,e=a.b,d=g.a,c=d.b
if(c>0)c=d.b=Math.max(0,c-e*2.5)
s=g.b
s.sbr(d.a===s?1+Math.sin(c*3.141592653589793)*0.2:1)
c=g.c
c.sbr(d.a===c?1+Math.sin(d.b*3.141592653589793)*0.18:1)
r=f*1.4
s.sbi(new A.f(0,0.5+Math.sin(r)*0.15,0))
s.bl(B.j,0.35*e)
c.sbi(new A.f(0,0.5+Math.sin(r)*0.15,0))
c.bl(B.dH.gE(),0.7*e)
g.d.bl(B.j,0.65*e)
for(c=g.e,q=0;q<c.length;++q){p=c[q]
o=p===d.a?1+Math.sin(d.b*3.141592653589793)*0.25:1
s=p.b
p.b=new A.aw(s.a,s.b,o)
p.a3()
n=B.i.aN(q,3)
A:{if(0===n){s=B.dF.gE()
break A}if(1===n){s=B.dC.gE()
break A}s=B.dE.gE()
break A}m=A.mI(s,(2.2+q*1.2)*e)
s=p.b
p.b=new A.aw(s.a,s.b.t(0,m),s.c)
p.a3()}d=f*1.2
c=Math.cos(d)
s=Math.sin(f*2)
d=Math.sin(d)
r=f+2
l=Math.cos(r)
r=Math.sin(r)
k=f*0.8+4
j=Math.cos(k)
k=Math.sin(k)
i=Math.sin(f*2.2)
h=g.f
h.f=h.f.dm(A.d([new A.bn(new A.f(c*4.2,1.5+s*0.6,d*4.2),B.bO,4,9),new A.bn(new A.f(l*4.5,1.8,r*4.5),B.bQ,4,9),new A.bn(new A.f(j*3.8,1.2,k*3.8),B.bV,3.5,8),new A.bn(new A.f(0,3.8+i*0.9,0),B.bW,4.5,10)],t.e))},
$S:61};(function aliases(){var s=J.bk.prototype
s.cu=s.i})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"nP","mh",62)
r(A,"of","n9",5)
r(A,"og","na",5)
r(A,"oh","nb",5)
q(A,"lB","o9",1)
p(A.ee.prototype,"gdV","dW",19)
var o
p(o=A.eM.prototype,"gdR","dS",3)
p(o,"gdZ","e_",3)
p(o,"ge0","e1",3)
p(o,"gdT","dU",3)
p(o,"gdX","dY",3)
q(A,"lC","nc",64)
q(A,"pe","jQ",43)
p(A.b4.prototype,"gaK","aL",52)
p(A.d_.prototype,"gbW","da",56)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.w,null)
q(A.w,[A.jL,J.e7,A.d7,J.ct,A.k,A.cw,A.K,A.i0,A.ai,A.cS,A.G,A.ah,A.bd,A.c4,A.cA,A.bJ,A.b7,A.i6,A.hp,A.cF,A.du,A.bf,A.bB,A.h9,A.cP,A.b1,A.cO,A.aJ,A.f7,A.iG,A.iE,A.eW,A.aM,A.az,A.f0,A.bH,A.U,A.eX,A.fm,A.dE,A.dj,A.fa,A.bK,A.D,A.dA,A.fp,A.bw,A.ik,A.d9,A.il,A.fT,A.aa,A.Y,A.fn,A.eJ,A.ho,A.hN,A.at,A.fF,A.fG,A.eq,A.cv,A.eF,A.e0,A.fV,A.fW,A.b6,A.h6,A.c8,A.dP,A.T,A.dX,A.bn,A.ap,A.bC,A.ac,A.i8,A.bl,A.fK,A.hq,A.hH,A.ey,A.cb,A.i2,A.d3,A.S,A.fX,A.ee,A.eQ,A.hl,A.eM,A.bx,A.bm,A.bA,A.dZ,A.e_,A.e1,A.fU,A.cj,A.F,A.a9,A.N,A.n,A.cz,A.hJ,A.a4,A.hO,A.Z,A.hQ,A.hP,A.f9,A.d2,A.ex,A.im,A.fo,A.iC,A.fd,A.f6,A.fh,A.fc,A.iy,A.ao,A.am,A.W,A.fJ,A.fI,A.bc,A.aO,A.bD,A.fY,A.b4,A.bE,A.hL,A.hM,A.aw,A.R,A.f,A.cu,A.eZ,A.dO,A.f_,A.dV,A.f1,A.cD,A.f3,A.dY,A.f4,A.e5,A.f8,A.cT,A.fb,A.bY,A.dQ,A.jR,A.d0,A.fe,A.ev,A.ff,A.bF,A.eD,A.fi,A.eE,A.fj,A.eH,A.fl,A.eG,A.fk,A.eR,A.fq,A.eS,A.fs,A.fr,A.d4,A.eV,A.fv,A.cc,A.e2,A.h3,A.cH,A.d8,A.e,A.dW,A.c_,A.d_,A.es,A.h0,A.br,A.aT,A.bZ,A.ie,A.be,A.dD,A.dC,A.fu,A.ft,A.iJ,A.ia,A.id])
q(J.e7,[J.e9,J.cJ,J.cL,J.cK,J.cM,J.c3,J.bi])
q(J.cL,[J.bk,J.t,A.c5,A.cX])
q(J.bk,[J.ep,J.bG,J.bj])
r(J.e8,A.d7)
r(J.h8,J.t)
q(J.c3,[J.cI,J.ea])
q(A.k,[A.ch,A.aB,A.cR,A.a1,A.bI,A.aU])
r(A.dF,A.ch)
r(A.dg,A.dF)
r(A.cx,A.dg)
q(A.K,[A.cN,A.b8,A.eb,A.eP,A.ez,A.f5,A.dM,A.aP,A.dd,A.eO,A.ce,A.dT])
q(A.aB,[A.Q,A.b0,A.b2,A.b_,A.di])
q(A.Q,[A.da,A.a6,A.d6])
r(A.bq,A.bd)
q(A.bq,[A.ak,A.dq,A.dr])
r(A.ck,A.c4)
r(A.db,A.ck)
r(A.cB,A.db)
r(A.O,A.cA)
q(A.b7,[A.cC,A.ds,A.dB])
r(A.aQ,A.cC)
r(A.cZ,A.b8)
q(A.bf,[A.dR,A.dS,A.eL,A.jh,A.jj,A.ih,A.ig,A.iM,A.iw,A.jv,A.jw,A.jb,A.jc,A.i9,A.hi,A.hj,A.hk,A.hs,A.hh,A.hm,A.i3,A.i5,A.fP,A.fN,A.fO,A.ht,A.hu,A.hV,A.hU,A.hT,A.hS,A.hR,A.hW,A.j2,A.j3,A.hY,A.hZ,A.jD,A.jB,A.hI,A.fZ,A.hg,A.j9,A.hX,A.hG,A.hv,A.hw,A.hx,A.hy,A.hz,A.hA,A.hB,A.hC,A.hD,A.hE,A.h1,A.h2,A.ib,A.ic,A.jm,A.jn,A.jo,A.jp,A.jq,A.jr,A.js])
q(A.eL,[A.eI,A.bX])
q(A.bB,[A.aZ,A.dh])
q(A.dS,[A.ji,A.iN,A.j7,A.ix,A.ha,A.hf,A.jx,A.hn,A.i4,A.jy,A.fQ,A.i_,A.jC,A.jA])
q(A.cX,[A.ef,A.a7])
q(A.a7,[A.dl,A.dn])
r(A.dm,A.dl)
r(A.cV,A.dm)
r(A.dp,A.dn)
r(A.cW,A.dp)
q(A.cV,[A.cU,A.eg])
q(A.cW,[A.eh,A.ei,A.ej,A.ek,A.el,A.cY,A.em])
r(A.dv,A.f5)
q(A.dR,[A.ii,A.ij,A.iF,A.io,A.is,A.ir,A.iq,A.ip,A.iv,A.iu,A.it,A.iB,A.j6,A.j1,A.iV,A.iW,A.j0,A.iQ,A.iS,A.iR,A.j_,A.iO,A.iP,A.iX,A.iY,A.iZ,A.iU,A.iT,A.j4,A.j5,A.ja])
r(A.df,A.f0)
r(A.fg,A.dE)
r(A.dk,A.dh)
r(A.aL,A.ds)
r(A.dc,A.dB)
q(A.aP,[A.d1,A.e6])
q(A.ik,[A.c9,A.cf,A.c2,A.fA,A.ed,A.bb,A.cE,A.fC,A.fE,A.ca,A.c0,A.aI,A.ew,A.aY,A.d5,A.eC,A.cG,A.eY,A.f2,A.h_,A.e3,A.h4,A.h5,A.c1,A.e4,A.cd,A.ba,A.cy,A.dt,A.fB,A.bW,A.fH,A.fL,A.ab])
q(A.b6,[A.as,A.av,A.aR,A.eo,A.bh])
r(A.eA,A.fh)
r(A.eT,A.ft)
s(A.dF,A.D)
s(A.dl,A.D)
s(A.dm,A.ah)
s(A.dn,A.D)
s(A.dp,A.ah)
s(A.ck,A.dA)
s(A.dB,A.fp)
s(A.fh,A.iy)
s(A.ft,A.iJ)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{h:"int",r:"double",af:"num",v:"String",z:"bool",Y:"Null",x:"List",w:"Object",ar:"Map",H:"JSObject"},mangledNames:{},types:["Y(H)","~()","aH()","aH(av?)","z(F)","~(~())","~(@)","z(ac)","z(v)","z(n)","Y(@)","Y()","z(r)","Y(w?)","as(h,h,v?)","h(+influence,light(r,ap),+influence,light(r,ap))","@(v)","@(@,v)","Y(~())","bC(aR)","aR(h,h,v?)","@(@)","h(h,+(as,bl))","Y(@,bp)","av(h,h,v?)","z(eN?)","h(h,+(av,iD))","h(+influence,source(r,de),+influence,source(r,de))","v(F)","h(y,y)","~(h,@)","Y(w,bp)","z(h)","bh(h,h,v?)","d4(as)","aH(v{fallback:v?})","~(@,@)","ap?()","x<ap>()","cv()","r()","bY()","aH?()","z()","S(aa<v,S>)","S(S,S)","h(W<ao>,W<ao>)","au(W<ao>)","h(W<am>,W<am>)","au(W<am>)","~(f,f,f,f,f,f)","bD(r,r,r,r)","f(f)","~(bF)","bF()","~(cc)","~(af)","d3(at)","~(H)","~(w?,w?)","w?(w?)","~(c_)","h(@,@)","z(at)","cj()","z(aa<v,S>)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.ak&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.dq&&a.b(c.a)&&b.b(c.b),"2;influence,source":(a,b)=>c=>c instanceof A.dr&&a.b(c.a)&&b.b(c.b)}}
A.ns(v.typeUniverse,JSON.parse('{"ep":"bk","bG":"bk","bj":"bk","oY":"c5","t":{"x":["1"],"H":[],"k":["1"]},"e9":{"z":[],"C":[]},"cJ":{"C":[]},"cL":{"H":[]},"bk":{"H":[]},"e8":{"d7":[]},"h8":{"t":["1"],"x":["1"],"H":[],"k":["1"]},"ct":{"P":["1"]},"c3":{"r":[],"af":[],"ag":["af"]},"cI":{"r":[],"h":[],"af":[],"ag":["af"],"C":[]},"ea":{"r":[],"af":[],"ag":["af"],"C":[]},"bi":{"v":[],"ag":["v"],"kO":[],"C":[]},"ch":{"k":["2"]},"cw":{"P":["2"]},"dg":{"D":["2"],"x":["2"],"ch":["1","2"],"k":["2"]},"cx":{"dg":["1","2"],"D":["2"],"x":["2"],"ch":["1","2"],"k":["2"],"D.E":"2","k.E":"2"},"cN":{"K":[]},"aB":{"k":["1"]},"Q":{"aB":["1"],"k":["1"]},"da":{"Q":["1"],"aB":["1"],"k":["1"],"Q.E":"1","k.E":"1"},"ai":{"P":["1"]},"cR":{"k":["2"],"k.E":"2"},"cS":{"P":["2"]},"a6":{"Q":["2"],"aB":["2"],"k":["2"],"Q.E":"2","k.E":"2"},"a1":{"k":["1"],"k.E":"1"},"G":{"P":["1"]},"d6":{"Q":["1"],"aB":["1"],"k":["1"],"Q.E":"1","k.E":"1"},"ak":{"bq":[],"bd":[]},"dq":{"bq":[],"bd":[]},"dr":{"bq":[],"bd":[]},"cB":{"db":["1","2"],"ck":["1","2"],"c4":["1","2"],"dA":["1","2"],"ar":["1","2"]},"cA":{"ar":["1","2"]},"O":{"cA":["1","2"],"ar":["1","2"]},"bI":{"k":["1"],"k.E":"1"},"bJ":{"P":["1"]},"cC":{"b7":["1"],"bo":["1"],"k":["1"]},"aQ":{"cC":["1"],"b7":["1"],"bo":["1"],"k":["1"]},"cZ":{"b8":[],"K":[]},"eb":{"K":[]},"eP":{"K":[]},"du":{"bp":[]},"bf":{"by":[]},"dR":{"by":[]},"dS":{"by":[]},"eL":{"by":[]},"eI":{"by":[]},"bX":{"by":[]},"ez":{"K":[]},"aZ":{"bB":["1","2"],"kF":["1","2"],"ar":["1","2"]},"b0":{"aB":["1"],"k":["1"],"k.E":"1"},"cP":{"P":["1"]},"b2":{"aB":["1"],"k":["1"],"k.E":"1"},"b1":{"P":["1"]},"b_":{"aB":["aa<1,2>"],"k":["aa<1,2>"],"k.E":"aa<1,2>"},"cO":{"P":["aa<1,2>"]},"bq":{"bd":[]},"c5":{"H":[],"C":[]},"cX":{"H":[]},"ef":{"H":[],"C":[]},"a7":{"aq":["1"],"H":[]},"cV":{"D":["r"],"a7":["r"],"x":["r"],"aq":["r"],"H":[],"k":["r"],"ah":["r"]},"cW":{"D":["h"],"a7":["h"],"x":["h"],"aq":["h"],"H":[],"k":["h"],"ah":["h"]},"cU":{"fR":[],"D":["r"],"a7":["r"],"x":["r"],"aq":["r"],"H":[],"k":["r"],"ah":["r"],"C":[],"D.E":"r"},"eg":{"fS":[],"D":["r"],"a7":["r"],"x":["r"],"aq":["r"],"H":[],"k":["r"],"ah":["r"],"C":[],"D.E":"r"},"eh":{"D":["h"],"a7":["h"],"x":["h"],"aq":["h"],"H":[],"k":["h"],"ah":["h"],"C":[],"D.E":"h"},"ei":{"D":["h"],"a7":["h"],"x":["h"],"aq":["h"],"H":[],"k":["h"],"ah":["h"],"C":[],"D.E":"h"},"ej":{"D":["h"],"a7":["h"],"x":["h"],"aq":["h"],"H":[],"k":["h"],"ah":["h"],"C":[],"D.E":"h"},"ek":{"D":["h"],"a7":["h"],"x":["h"],"aq":["h"],"H":[],"k":["h"],"ah":["h"],"C":[],"D.E":"h"},"el":{"D":["h"],"a7":["h"],"x":["h"],"aq":["h"],"H":[],"k":["h"],"ah":["h"],"C":[],"D.E":"h"},"cY":{"D":["h"],"a7":["h"],"x":["h"],"aq":["h"],"H":[],"k":["h"],"ah":["h"],"C":[],"D.E":"h"},"em":{"eN":[],"D":["h"],"a7":["h"],"x":["h"],"aq":["h"],"H":[],"k":["h"],"ah":["h"],"C":[],"D.E":"h"},"f5":{"K":[]},"dv":{"b8":[],"K":[]},"aM":{"P":["1"]},"aU":{"k":["1"],"k.E":"1"},"az":{"K":[]},"df":{"f0":["1"]},"U":{"bz":["1"]},"dE":{"l7":[]},"fg":{"dE":[],"l7":[]},"dh":{"bB":["1","2"],"ar":["1","2"]},"dk":{"dh":["1","2"],"bB":["1","2"],"ar":["1","2"]},"di":{"aB":["1"],"k":["1"],"k.E":"1"},"dj":{"P":["1"]},"aL":{"b7":["1"],"kH":["1"],"bo":["1"],"k":["1"]},"bK":{"P":["1"]},"bB":{"ar":["1","2"]},"c4":{"ar":["1","2"]},"db":{"ck":["1","2"],"c4":["1","2"],"dA":["1","2"],"ar":["1","2"]},"b7":{"bo":["1"],"k":["1"]},"ds":{"b7":["1"],"bo":["1"],"k":["1"]},"dc":{"b7":["1"],"fp":["1"],"bo":["1"],"k":["1"]},"bw":{"ag":["bw"]},"r":{"af":[],"ag":["af"]},"h":{"af":[],"ag":["af"]},"x":{"k":["1"]},"af":{"ag":["af"]},"bo":{"k":["1"]},"v":{"ag":["v"],"kO":[]},"dM":{"K":[]},"b8":{"K":[]},"aP":{"K":[]},"d1":{"K":[]},"e6":{"K":[]},"dd":{"K":[]},"eO":{"K":[]},"ce":{"K":[]},"dT":{"K":[]},"d9":{"K":[]},"fn":{"bp":[]},"as":{"b6":[]},"av":{"b6":[]},"aR":{"b6":[]},"bh":{"b6":[]},"eo":{"b6":[]},"bx":{"jH":[]},"bm":{"jH":[]},"e1":{"mK":[]},"d2":{"mN":[]},"f9":{"au":[]},"ex":{"mP":[]},"fo":{"au":[]},"fd":{"mM":[]},"f6":{"ma":[]},"eA":{"mR":[]},"ao":{"ag":["ao"]},"am":{"ag":["am"]},"cu":{"B":[]},"eZ":{"y":[]},"dO":{"B":[]},"f_":{"y":[]},"dV":{"B":[]},"f1":{"y":[]},"cD":{"B":[]},"f3":{"y":[]},"dY":{"B":[]},"f4":{"y":[]},"e5":{"B":[]},"f8":{"y":[]},"cT":{"B":[]},"fb":{"y":[]},"dQ":{"mL":[]},"d0":{"B":[]},"fe":{"y":[]},"ev":{"B":[]},"ff":{"y":[]},"eD":{"B":[]},"fi":{"y":[]},"eE":{"B":[]},"fj":{"y":[]},"eH":{"B":[]},"fl":{"y":[]},"eG":{"B":[]},"fk":{"y":[]},"eR":{"B":[]},"fq":{"y":[]},"eS":{"B":[]},"fs":{"y":[]},"fr":{"y":[]},"eV":{"B":[]},"fv":{"y":[]},"dW":{"m6":[]},"be":{"aH":[]},"eT":{"mc":[]},"mf":{"x":["h"],"k":["h"]},"eN":{"x":["h"],"k":["h"]},"mW":{"x":["h"],"k":["h"]},"md":{"x":["h"],"k":["h"]},"mU":{"x":["h"],"k":["h"]},"me":{"x":["h"],"k":["h"]},"mV":{"x":["h"],"k":["h"]},"fR":{"x":["r"],"k":["r"]},"fS":{"x":["r"],"k":["r"]}}'))
A.nr(v.typeUniverse,JSON.parse('{"dF":2,"a7":1,"ds":1,"dB":1}'))
var u={l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",b:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nuniform vec3 uClearColor;\nuniform vec3 uSkyHorizon;\nuniform vec3 uSkyZenith;\nuniform vec3 uSkyGround;\nuniform float uSkyEnabled;\nuniform float uSkyHorizonGlow;\nuniform float uSkyStarDensity;\nuniform sampler2D uSkyTexture;\nuniform float uSkyTextureEnabled;\nuniform float uSkyRotation;\nuniform float uSkyExposure;\nuniform float uSkyTextureSrgb;\nuniform mat4 uInverseProjection;\nuniform mat4 uInverseView;\nuniform vec3 uCameraPosition;\nuniform float uCloudCoverage;\nuniform float uCloudDensity;\nuniform float uCloudBaseHeight;\nuniform float uCloudThickness;\nuniform float uCloudScale;\nuniform vec2 uCloudWind;\nuniform float uCloudPhase;\nuniform float uCloudDetail;\nuniform float uCloudSilverLining;\nuniform float uCloudSampleCount;\nuniform vec3 uCloudLightDirection;\nuniform vec3 uCloudLightColor;\nuniform float uCloudLightIntensity;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 acesToneMap(vec3 color){\n  return clamp((color*(2.51*color+0.03))/(color*(2.43*color+0.59)+0.14),0.0,1.0);\n}\n\nvec3 agxToneMap(vec3 color){\n  const mat3 agxMat=mat3(\n    0.842479062253094,0.0423282422610123,0.0423756549057051,\n    0.0784335999999992,0.878468636469772,0.0784336,\n    0.0792237451477643,0.0791661274605434,0.879142973793104\n  );\n  const mat3 agxMatInv=mat3(\n    1.19687902425764,-0.0528968517032958,-0.0529716355080549,\n    -0.0980208811401368,1.15190312990417,-0.0980434501171241,\n    -0.0990297440797205,-0.0989611768448433,1.15107367264185\n  );\n  vec3 val=agxMat*color;\n  val=clamp(log2(max(val,vec3(1e-10)))*0.0625+0.625,0.0,1.0);\n  val=val*val*val*(val*(val*6.0-15.0)+10.0);\n  val=agxMatInv*val;\n  return max(val,vec3(0.0));\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nvec3 skyBackground(vec2 uv){\n  // A deliberately cheap, high-quality fallback sky: three atmospheric bands\n  // provide depth at every camera angle, while the tiny deterministic star\n  // field and horizon glow keep the clear background from reading as a flat\n  // color. It is an environment layer, not a game/weather simulation.\n  float lower=smoothstep(0.0,0.48,uv.y);\n  float upper=smoothstep(0.42,1.0,uv.y);\n  vec3 color=mix(uSkyGround,uSkyHorizon,lower);\n  color=mix(color,uSkyZenith,upper);\n  float horizonGlow=exp(-pow((uv.y-0.48)*7.0,2.0));\n  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);\n  float starMask=smoothstep(0.62,0.92,uv.y);\n  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),hash(floor(uv*vec2(180.0,100.0))))*starMask;\n  color+=vec3(0.16,0.19,0.24)*stars;\n  return max(color,vec3(0.0));\n}\n\nfloat hash3(vec3 p){\n  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);\n}\n\nfloat valueNoise(vec3 p){\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  f=f*f*(3.0-2.0*f);\n  float n000=hash3(i+vec3(0,0,0));\n  float n100=hash3(i+vec3(1,0,0));\n  float n010=hash3(i+vec3(0,1,0));\n  float n110=hash3(i+vec3(1,1,0));\n  float n001=hash3(i+vec3(0,0,1));\n  float n101=hash3(i+vec3(1,0,1));\n  float n011=hash3(i+vec3(0,1,1));\n  float n111=hash3(i+vec3(1,1,1));\n  float x00=mix(n000,n100,f.x);\n  float x10=mix(n010,n110,f.x);\n  float x01=mix(n001,n101,f.x);\n  float x11=mix(n011,n111,f.x);\n  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);\n}\n\nfloat cloudNoise(vec3 p){\n  float value=0.0;\n  float amplitude=0.5;\n  for(int octave=0;octave<4;octave++){\n    value+=valueNoise(p)*amplitude;\n    p=p*2.03+vec3(17.3,11.7,7.1);\n    amplitude*=0.5;\n  }\n  return value;\n}\n\nfloat cloudDensityAt(vec3 position){\n  float height01=clamp(\n    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),\n    0.0,1.0\n  );\n  float vertical=smoothstep(0.0,0.12,height01)*\n    (1.0-smoothstep(0.72,1.0,height01));\n  vec3 q=position*max(uCloudScale,0.00001)+\n    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);\n  float macro=cloudNoise(q*0.82);\n  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));\n  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));\n  float threshold=1.0-clamp(uCloudCoverage,0.,1.);\n  float body=smoothstep(threshold,threshold+0.26,shape);\n  return body*vertical*clamp(uCloudDensity,0.,1.);\n}\n\nvec4 volumetricClouds(vec3 worldDirection){\n  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){\n    return vec4(0.0);\n  }\n  float directionY=max(worldDirection.y,0.001);\n  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;\n  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;\n  startT=max(startT,0.0);\n  endT=max(endT,0.0);\n  if(endT<=startT) return vec4(0.0);\n  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));\n  float stepLength=(endT-startT)/float(sampleCount);\n  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;\n  vec3 sunDirection=normalize(-uCloudLightDirection);\n  float transmittance=1.0;\n  vec3 inScatter=vec3(0.0);\n  for(int i=0;i<24;i++){\n    if(i>=sampleCount) break;\n    float t=startT+(float(i)+0.5)*stepLength+jitter;\n    vec3 position=uCameraPosition+worldDirection*t;\n    float density=cloudDensityAt(position);\n    float opticalDepth=density*stepLength*0.0035;\n    float segmentAlpha=1.0-exp(-opticalDepth);\n    float towardLight=cloudDensityAt(position+sunDirection*90.0);\n    float lightTransmittance=exp(-towardLight*0.025);\n    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);\n    vec3 ambient=uSkyHorizon*0.32;\n    vec3 direct=uCloudLightColor*\n      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;\n    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;\n    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);\n    inScatter+=transmittance*segmentAlpha*sampleLight;\n    transmittance*=1.0-segmentAlpha;\n    if(transmittance<0.01) break;\n  }\n  return vec4(inScatter,1.0-transmittance);\n}\n\nvec3 srgbToLinear(vec3 color){\n  vec3 low=color/12.92;\n  vec3 high=pow((color+0.055)/1.055,vec3(2.4));\n  return mix(low,high,step(vec3(0.04045),color));\n}\n\nvec3 worldDirectionForUv(vec2 uv){\n  vec2 ndc=uv*2.0-1.0;\n  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);\n  return normalize(viewPoint.xyz/viewPoint.w);\n}\n\nvec3 equirectangularSky(vec2 uv){\n  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);\n  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;\n  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));\n  vec2 sampleUv=vec2(\n    fract(longitude/(2.0*3.14159265359)+0.5),\n    0.5-latitude/3.14159265359\n  );\n  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));\n  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));\n  return linear*max(uSkyExposure,0.0);\n}\n\nvoid main(){\n  vec4 source=texture(uTex,vUv);\n  // The world pass clears untouched pixels to uClearColor. Replace only that\n  // exact background, so the sky is always active without covering geometry.\n  if(uSkyEnabled>0.5 && distance(source.rgb,uClearColor)<0.004){\n    vec3 viewDirection=worldDirectionForUv(vUv);\n    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);\n    source.rgb=uSkyTextureEnabled>0.5\n      ? equirectangularSky(vUv)\n      : skyBackground(vUv);\n    vec4 clouds=volumetricClouds(worldDirection);\n    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;\n  }\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  vec3 mapped=uToneMap>3.0\n    ?agxToneMap(color)\n    :(uToneMap>1.5?acesToneMap(color):reinhardToneMap(color));\n  float toneMix=uToneMap>3.0\n    ?clamp(uToneMap-3.0,0.,1.)\n    :(uToneMap>1.5?clamp(uToneMap-1.5,0.,1.):clamp(uToneMap,0.,1.));\n  color=mix(color,mapped,toneMix);\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  // Atmospheric precipitation is submitted as depth-tested world geometry;\n  // the present pass must never paint weather over unrelated surfaces.\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",f:"Transform.scale must be finite and positive: ",k:"WebGl2Device: operation attempted while context is not ready"}
var t=(function rtii(){var s=A.bQ
return{v:s("az"),g0:s("am"),fW:s("dP"),do:s("bY"),e8:s("ag<@>"),dN:s("cz"),I:s("O<v,h>"),P:s("aQ<v>"),df:s("bw"),Q:s("K"),B:s("fR"),gN:s("fS"),o:s("S"),Z:s("by"),j:s("aH"),cr:s("k<cz>"),bM:s("k<r>"),hf:s("k<@>"),J:s("t<aH>"),b7:s("t<a9>"),gk:s("t<bA>"),cU:s("t<F>"),dV:s("t<bD>"),e:s("t<bn>"),eT:s("t<c8>"),cw:s("t<+influence,light(r,ap)>"),gg:s("t<+influence,source(r,de)>"),f:s("t<B>"),u:s("t<y>"),cR:s("t<d2>"),C:s("t<n>"),c4:s("t<cb>"),h:s("t<au>"),D:s("t<cc>"),aM:s("t<W<am>>"),c1:s("t<W<ao>>"),w:s("t<ap>"),s:s("t<v>"),gi:s("t<f>"),q:s("t<de>"),cL:s("t<fc>"),ha:s("t<br<bC>>"),c9:s("t<br<bl>>"),aO:s("t<br<cb>>"),fq:s("t<br<iD>>"),n:s("t<r>"),r:s("t<@>"),t:s("t<h>"),T:s("cJ"),m:s("H"),E:s("bj"),aU:s("aq<@>"),_:s("x<a9>"),O:s("x<F>"),dy:s("x<v>"),aH:s("x<@>"),bW:s("x<h>"),ao:s("aa<v,S>"),bS:s("ar<v,aH>"),a1:s("ar<v,F>"),eL:s("aR"),cA:s("as"),a:s("Y"),K:s("w"),fy:s("ao"),z:s("F"),eD:s("c8"),W:s("at"),gT:s("oZ"),bQ:s("+()"),ai:s("+(as,bl)"),dU:s("+(av,iD)"),fk:s("+influence,light(r,ap)"),eS:s("+influence,source(r,de)"),fA:s("y"),b0:s("aT<bh,cb>"),ex:s("aT<aR,bC>"),cE:s("aT<as,bl>"),g2:s("aT<av,iD>"),L:s("n"),Y:s("au"),U:s("bo<v>"),cJ:s("bo<h>"),b:s("W<am>"),k:s("W<ao>"),l:s("bp"),d5:s("ab"),N:s("v"),aj:s("av"),dm:s("C"),eK:s("b8"),ak:s("bG"),am:s("dc<v>"),bw:s("eQ"),fP:s("f"),G:s("ac"),fl:s("a1<ac>"),an:s("G<ac>"),c:s("U<@>"),cd:s("U<~>"),hg:s("dk<w?,w?>"),a8:s("cj"),eM:s("aU<au>"),V:s("dC"),R:s("dD"),y:s("z"),al:s("z(w)"),fg:s("z(ac)"),i:s("r"),A:s("@"),fO:s("@()"),x:s("@(w)"),d:s("@(w,bp)"),S:s("h"),eB:s("dX?"),eH:s("bz<Y>?"),du:s("t<w?>?"),bX:s("H?"),c3:s("x<bn>?"),X:s("w?"),ac:s("d_?"),bG:s("eF?"),dk:s("v?"),F:s("bH<@,@>?"),g:s("fa?"),fQ:s("z?"),cD:s("r?"),h6:s("h?"),cg:s("af?"),a4:s("~(c_)?"),p:s("af"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.bL=J.e7.prototype
B.b=J.t.prototype
B.i=J.cI.prototype
B.k=J.c3.prototype
B.t=J.bi.prototype
B.bM=J.bj.prototype
B.bN=J.cL.prototype
B.a2=A.cU.prototype
B.aL=J.ep.prototype
B.al=J.bG.prototype
B.dY=new A.fA(0,"opaque")
B.I=new A.fB(0,"add")
B.b7=new A.bW(0,"zero")
B.H=new A.bW(1,"one")
B.U=new A.fC(0,"alpha")
B.dZ=new A.fK()
B.G=new A.f(0.6,-1,0.4)
B.aC=new A.T(1,0.95,0.88)
B.ba=new A.dX()
B.aw=new A.h4(1,"linear")
B.ax=new A.h5(0,"clampToEdge")
B.bb=new A.h3()
B.ao=function getTagFallback(o) {
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
B.ap=function(hooks) { return hooks; }

B.B=new A.w()
B.h=new A.i0()
B.aD=new A.T(0.12,0.16,0.24)
B.bY=new A.T(0.03,0.06,0.14)
B.aE=new A.T(0.015,0.02,0.03)
B.bi=new A.eF()
B.j=new A.f(0,1,0)
B.p=new A.f(0,-1,0)
B.Q=new A.T(1,1,1)
B.bj=new A.ap()
B.dJ=new A.bb(0,"position")
B.dO=new A.ac(B.dJ,0,3)
B.b4=new A.bb(1,"normal")
B.dP=new A.ac(B.b4,3,3)
B.an=new A.bb(6,"tangent4")
B.dT=new A.ac(B.an,6,4)
B.dK=new A.bb(2,"color")
B.dQ=new A.ac(B.dK,10,4)
B.dL=new A.bb(4,"alpha")
B.dR=new A.ac(B.dL,14,1)
B.dM=new A.bb(5,"uv0")
B.dS=new A.ac(B.dM,15,2)
B.dN=new A.bb(8,"legacyMaterialEffect")
B.dU=new A.ac(B.dN,17,1)
B.C=s([B.dO,B.dP,B.dT,B.dQ,B.dR,B.dS,B.dU],A.bQ("t<ac>"))
B.bk=new A.i8()
B.bl=new A.id()
B.q=new A.fg()
B.J=new A.fn()
B.v=new A.cy(0,"colorOnly")
B.aq=new A.cy(1,"colorAndDepth")
B.V=new A.cy(2,"depthOnly")
B.W=new A.fE(1,"srgb")
B.K=new A.fH(1,"back")
B.L=new A.fL(0,"less")
B.M=new A.cE(0,"opaque")
B.bm=new A.cE(1,"masked")
B.X=new A.cE(2,"blended")
B.ar=new A.bZ(!1,B.L,!1,!0,B.H,B.H,B.I,!1,B.K,!0,!1,!0,!0,!0,!0,!1)
B.bn=new A.bZ(!0,B.L,!1,!0,B.H,B.H,B.I,!0,B.K,!0,!1,!0,!0,!0,!0,!1)
B.b8=new A.bW(2,"srcAlpha")
B.b9=new A.bW(3,"oneMinusSrcAlpha")
B.bo=new A.bZ(!0,B.L,!1,!0,B.b8,B.b9,B.I,!0,B.K,!0,!1,!0,!0,!0,!0,!1)
B.bS=new A.T(0.03,0.03,0.04)
B.w=new A.T(0,0,0)
B.c9=s([],t.e)
B.a0=s([],t.w)
B.ca=s([],t.q)
B.cb=s([],A.bQ("t<p0>"))
B.bp=new A.e0(B.bS,B.w,0,1,null,null,B.Q,0.02,0,0.7,0.35,1,12,1,1,1,1,1,1,1,0.003,B.w,0,0,B.Q,0,null,B.c9,B.a0,B.ca,B.cb,null)
B.bq=new A.S(0,0,0)
B.br=new A.c0(0,"idle")
B.N=new A.c0(1,"active")
B.bs=new A.c0(2,"ended")
B.bt=new A.c0(3,"aborted")
B.as=new A.cG(0,"outside")
B.bu=new A.cG(1,"intersects")
B.bv=new A.cG(2,"inside")
B.bw=new A.e3(0,"vertex")
B.at=new A.e3(1,"indices")
B.au=new A.h_(0,"staticDraw")
B.d=new A.e4(0,"ready")
B.O=new A.e4(1,"lost")
B.bx=new A.c1(0,"color")
B.av=new A.c1(1,"colorAndGlow")
B.by=new A.c1(2,"colorDepthGlow")
B.Y=new A.c1(3,"depthOnly")
B.bz=new A.aY(0,"beforeShadow")
B.bA=new A.aY(2,"beforeDepth")
B.Z=new A.aY(3,"afterDepth")
B.ay=new A.aY(4,"beforeWorld")
B.bB=new A.aY(5,"afterWorld")
B.r=new A.aY(6,"afterResolve")
B.bC=new A.aY(9,"beforePresent")
B.az=new A.aI(0,"readBeforeWrite")
B.bD=new A.aI(1,"duplicateWriter")
B.bE=new A.aI(2,"sampledMultisampledAttachment")
B.a_=new A.aI(3,"invalidResolve")
B.bF=new A.aI(4,"formatOrSizeMismatch")
B.bG=new A.aI(5,"unversionedReadWrite")
B.bH=new A.aI(6,"invalidHistoryRead")
B.bI=new A.aI(7,"dependencyCycle")
B.bJ=new A.aI(8,"missingCapability")
B.aA=new A.c2(0,"wrongKind")
B.aB=new A.c2(1,"staleGeneration")
B.bK=new A.c2(2,"doubleRelease")
B.P=new A.c2(3,"releasedResource")
B.bO=new A.T(1,0.25,0.25)
B.bP=new A.T(0.95,0.12,0.22)
B.bQ=new A.T(0.25,0.5,1)
B.bR=new A.T(0.04,0.05,0.07)
B.bT=new A.T(0.1,0.85,0.45)
B.bU=new A.T(0.18,0.42,0.98)
B.bV=new A.T(0.2,1,0.45)
B.bW=new A.T(1,0.85,0.35)
B.bX=new A.T(0.98,0.12,0.22)
B.bZ=new A.T(0.1,0.88,0.42)
B.c_=new A.T(0.7,0.8,1)
B.c0=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.c1=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale","uShadowMapTexelSize","uShadowFilterRadius","uShadowBias","uReflectionColor","uReflectionIntensity","uReflectionConfidence","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uSpecularScale","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness","uSurfaceSnowCoverage","uSurfaceDissolution","uThermalSourceCount","uThermalSourcePosition0","uThermalSourceRadius0","uThermalSourceDissolution0","uThermalSourcePosition1","uThermalSourceRadius1","uThermalSourceDissolution1","uThermalSourcePosition2","uThermalSourceRadius2","uThermalSourceDissolution2","uThermalSourcePosition3","uThermalSourceRadius3","uThermalSourceDissolution3"],t.s)
B.c2=s(["uQuantizationBits","uDitherStrength"],t.s)
B.c3=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.c4=s(["uNear","uFar","uLightDir","uLightColor","uShaftIntensity","uFogDensity","uAnisotropy","uViewProjection","uView","uInverseProjection","uVolumetricAlbedo","uVolumetricHeightFalloff","uVolumetricDustDensity","uVolumetricJitter","uVolumetricIntensity","uVolumetricSampleCount"],t.s)
B.c5=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.c6=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.c7=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale"],t.s)
B.c8=s([],t.u)
B.a3=new A.c9(2,"high")
B.cC={shadows:0,ssao:1,bloom:2,dof:3,grade:4,volumetric:5}
B.dc=new A.aQ(B.cC,6,t.P)
B.cT=new A.at(B.a3,B.dc)
B.cv={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.d9=new A.aQ(B.cv,5,t.P)
B.aO=new A.at(B.a3,B.d9)
B.cQ=new A.c9(1,"standard")
B.cD={shadows:0}
B.dd=new A.aQ(B.cD,1,t.P)
B.cS=new A.at(B.cQ,B.dd)
B.aM=new A.c9(0,"safe")
B.aK={}
B.a8=new A.aQ(B.aK,0,t.P)
B.aN=new A.at(B.aM,B.a8)
B.a1=s([B.cT,B.aO,B.cS,B.aN],A.bQ("t<at>"))
B.cc=s(["uExposure","uVignette","uGrain","uOutputEncoding","uToneMap","uClearColor","uSkyHorizon","uSkyZenith","uSkyGround","uSkyEnabled","uSkyHorizonGlow","uSkyStarDensity","uSkyTexture","uSkyTextureEnabled","uSkyRotation","uSkyExposure","uSkyTextureSrgb","uInverseProjection","uInverseView","uCameraPosition","uCloudCoverage","uCloudDensity","uCloudBaseHeight","uCloudThickness","uCloudScale","uCloudWind","uCloudPhase","uCloudDetail","uCloudSilverLining","uCloudSampleCount","uCloudLightDirection","uCloudLightColor","uCloudLightIntensity"],t.s)
B.a9=new A.ab(0,"depthTest")
B.aa=new A.ab(1,"depthFunc")
B.ab=new A.ab(2,"depthWrite")
B.ac=new A.ab(3,"blendEnable")
B.ad=new A.ab(4,"blendFunc")
B.ae=new A.ab(5,"blendEquation")
B.af=new A.ab(6,"cullEnable")
B.ag=new A.ab(7,"cullFace")
B.aW=new A.ab(8,"frontFace")
B.dh=new A.ab(9,"stencilEnable")
B.aU=new A.ab(10,"colorMask")
B.aV=new A.ab(11,"scissorEnable")
B.cd=s([B.a9,B.aa,B.ab,B.ac,B.ad,B.ae,B.af,B.ag,B.aW,B.dh,B.aU,B.aV],A.bQ("t<ab>"))
B.ce=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.cf=s(["uBloomStrength"],t.s)
B.cg=s(["uLutSize","uStrength"],t.s)
B.ch=s(["uTexelSize","uNear","uFar"],t.s)
B.aF=s(["uTexelStep"],t.s)
B.ci=s(["uVolumetricStrength"],t.s)
B.cE={uAlbedo:0}
B.aG=new A.O(B.cE,[0],t.I)
B.cL={uSsaoRaw:0,uSceneDepth:1}
B.cj=new A.O(B.cL,[0,1],t.I)
B.cI={uScene:0,uHistory:1}
B.ck=new A.O(B.cI,[0,1],t.I)
B.cz={aPosition:0,aUvMat:1}
B.aH=new A.O(B.cz,[0,4],t.I)
B.cJ={uScene:0,uLut:1}
B.cl=new A.O(B.cJ,[0,1],t.I)
B.cK={uSource:0}
B.aI=new A.O(B.cK,[0],t.I)
B.cB={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.cm=new A.O(B.cB,[0,1,2,3,4,5,6],t.I)
B.cx={uSharp:0,uBlurred:1,uSceneDepth:2}
B.cn=new A.O(B.cx,[0,1,2],t.I)
B.cM={uTex:0,uSkyTexture:1}
B.co=new A.O(B.cM,[0,1],t.I)
B.cF={uBloom:0}
B.cp=new A.O(B.cF,[0],t.I)
B.cG={uSceneDepth:0}
B.aJ=new A.O(B.cG,[0],t.I)
B.cH={uScene:0}
B.cq=new A.O(B.cH,[0],t.I)
B.o=new A.O(B.aK,[],t.I)
B.cu={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.cr=new A.O(B.cu,[0,1,2,3,4,5,6],t.I)
B.cN={uVolumetric:0}
B.cs=new A.O(B.cN,[0],t.I)
B.cA={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.ct=new A.O(B.cA,[0,1,2,3],t.I)
B.e_=new A.ed(0,"srgb")
B.e0=new A.ed(1,"linear")
B.cO=new A.eo(0,1,null)
B.ah=new A.cf(1,"reinhard")
B.cP=new A.eq(1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,8,0,0,0,0,0,0,!1,B.ah)
B.cR=new A.c9(4,"shipping")
B.cw={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.db=new A.aQ(B.cw,7,t.P)
B.e1=new A.at(B.cR,B.db)
B.D=new A.bE(0,0,0,1)
B.a4=new A.ca(0,"constructed")
B.cU=new A.ca(1,"initializing")
B.a5=new A.ca(2,"ready")
B.a6=new A.ca(3,"contextLost")
B.c=new A.d5(0,"read")
B.e=new A.d5(1,"write")
B.u=new A.d5(2,"historyRead")
B.m=new A.ew(0,"rgba8")
B.cV=new A.N("dofBlurH",B.m,192,108,1,0)
B.cW=new A.N("dofBlurV",B.m,192,108,1,0)
B.cX=new A.N("dofOutput",B.m,384,216,1,0)
B.aP=new A.ew(2,"depth24")
B.cY=new A.N("shadowMap",B.aP,512,512,1,0)
B.cZ=new A.N("volumetricLight",B.m,192,108,1,0)
B.d_=new A.N("sceneColor",B.m,384,216,1,1)
B.d0=new A.N("ssaoRaw",B.m,192,108,1,0)
B.d1=new A.N("ssaoBlurred",B.m,192,108,1,0)
B.d2=new A.N("gradeOutput",B.m,384,216,1,0)
B.d3=new A.N("vhsOutput",B.m,384,216,1,0)
B.d4=new A.N("sceneDepth",B.aP,384,216,1,0)
B.d5=new A.N("bloomBlurH",B.m,192,108,1,0)
B.d6=new A.N("bloomBlurV",B.m,192,108,1,0)
B.d7=new A.N("present",B.m,384,216,1,0)
B.a7=new A.N("sceneColor",B.m,384,216,1,0)
B.d8=new A.N("ps1Output",B.m,384,216,1,0)
B.cy={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8,volumetric:9}
B.da=new A.aQ(B.cy,10,t.P)
B.aS=new A.cd(2,"link")
B.de=new A.d8(B.aS,"gl.createProgram() returned null")
B.aQ=new A.cd(0,"vertex")
B.aR=new A.cd(1,"fragment")
B.aT=new A.cd(3,"validation")
B.df=new A.eC(0,"full")
B.dg=new A.eC(2,"culled")
B.aX=new A.cf(0,"off")
B.di=new A.cf(2,"aces")
B.ai=new A.cf(3,"agx")
B.y=new A.f(0,0,0)
B.aj=new A.aw(B.y,B.D,1)
B.dj=A.aF("oP")
B.dk=A.aF("oQ")
B.dl=A.aF("fR")
B.dm=A.aF("fS")
B.dn=A.aF("md")
B.dp=A.aF("me")
B.dq=A.aF("mf")
B.dr=A.aF("H")
B.ds=A.aF("w")
B.dt=A.aF("mU")
B.du=A.aF("mV")
B.dv=A.aF("mW")
B.dw=A.aF("eN")
B.a=new A.ba(0,"float1")
B.E=new A.ba(1,"float2")
B.f=new A.ba(2,"float3")
B.dx=new A.ba(3,"float4")
B.l=new A.ba(4,"mat4")
B.aY=new A.ba(5,"mat4Array")
B.ak=new A.e(B.a,0)
B.aZ=new A.e(B.a,1)
B.x=new A.ba(6,"sampler")
B.n=new A.e(B.x,0)
B.F=new A.e(B.x,1)
B.b_=new A.e(B.x,2)
B.dy=new A.e(B.x,3)
B.dz=new A.e(B.x,4)
B.dA=new A.e(B.x,5)
B.dB=new A.e(B.x,6)
B.am=new A.R(0.5,0.5)
B.b0=new A.f(0,0,1)
B.b1=new A.f(0,0,-1)
B.dC=new A.f(0,1,1)
B.b2=new A.f(0,2,5)
B.dD=new A.f(0,2,7)
B.z=new A.f(1,0,0)
B.dE=new A.f(1,0,1)
B.dF=new A.f(1,1,0)
B.dG=new A.f(1/0,1/0,1/0)
B.dH=new A.f(1,0.3,0.2)
B.R=new A.f(0,0.5,0)
B.b3=new A.f(0,-0.2,-1)
B.A=new A.f(-1,0,0)
B.dI=new A.f(-1/0,-1/0,-1/0)
B.b5=new A.eY(0,"horizontal")
B.dV=new A.eY(1,"vertical")
B.b6=new A.f2(0,"horizontal")
B.dW=new A.f2(1,"vertical")
B.S=new A.dt(0,"empty")
B.dX=new A.dt(1,"cpuReady")
B.T=new A.dt(4,"released")})();(function staticFields(){$.iz=null
$.ay=A.d([],A.bQ("t<w>"))
$.kQ=null
$.ku=null
$.kt=null
$.lE=null
$.lA=null
$.lG=null
$.je=null
$.jk=null
$.kg=null
$.iA=A.d([],A.bQ("t<x<w>?>"))
$.cl=null
$.dH=null
$.dI=null
$.k7=!1
$.L=B.q})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"oS","lL",()=>A.jg("_$dart_dartClosure"))
s($,"oR","kk",()=>A.jg("_$dart_dartClosure_dartJSInterop"))
s($,"pd","lW",()=>A.d([new J.e8()],A.bQ("t<d7>")))
s($,"p1","lM",()=>A.b9(A.i7({
toString:function(){return"$receiver$"}})))
s($,"p2","lN",()=>A.b9(A.i7({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"p3","lO",()=>A.b9(A.i7(null)))
s($,"p4","lP",()=>A.b9(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"p7","lS",()=>A.b9(A.i7(void 0)))
s($,"p8","lT",()=>A.b9(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"p6","lR",()=>A.b9(A.kX(null)))
s($,"p5","lQ",()=>A.b9(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"pa","lV",()=>A.b9(A.kX(void 0)))
s($,"p9","lU",()=>A.b9(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"pb","kq",()=>A.n8())
s($,"pc","dK",()=>A.ju(B.ds))
s($,"oO","lK",()=>B.a7.cb())
s($,"oX","kp",()=>A.en(A.d([255,255,255,255],t.t)))
s($,"oU","km",()=>A.en(A.d([128,128,255,255],t.t)))
s($,"oT","kl",()=>A.en(A.d([0,0,0,255],t.t)))
s($,"oV","kn",()=>A.en(A.d([255,255,0,255],t.t)))
s($,"oW","ko",()=>A.en(A.d([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.c5,SharedArrayBuffer:A.c5,ArrayBufferView:A.cX,DataView:A.ef,Float32Array:A.cU,Float64Array:A.eg,Int16Array:A.eh,Int32Array:A.ei,Int8Array:A.ej,Uint16Array:A.ek,Uint32Array:A.el,Uint8ClampedArray:A.cY,CanvasPixelArray:A.cY,Uint8Array:A.em})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.a7.$nativeSuperclassTag="ArrayBufferView"
A.dl.$nativeSuperclassTag="ArrayBufferView"
A.dm.$nativeSuperclassTag="ArrayBufferView"
A.cV.$nativeSuperclassTag="ArrayBufferView"
A.dn.$nativeSuperclassTag="ArrayBufferView"
A.dp.$nativeSuperclassTag="ArrayBufferView"
A.cW.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.jl
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
