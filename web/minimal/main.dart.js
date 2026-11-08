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
if(a[b]!==s){A.p4(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.e(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jV(b)
return new s(c,this)}:function(){if(s===null)s=A.jV(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jV(a).prototype
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
k0(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jX(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.jZ==null){A.oQ()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.c(A.kE("Return interceptor for "+A.p(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.id
if(o==null)o=$.id=A.iZ(n)
p=q[o]}if(p!=null)return p
p=A.oV(a)
if(p!=null)return p
if(typeof a=="function")return B.bm
s=Object.getPrototypeOf(a)
if(s==null)return B.aw
if(s===Object.prototype)return B.aw
if(typeof q=="function"){o=$.id
if(o==null)o=$.id=A.iZ(n)
Object.defineProperty(q,o,{value:B.a6,enumerable:false,writable:true,configurable:true})
return B.a6}return B.a6},
ki(a,b){if(a<0||a>4294967295)throw A.c(A.al(a,0,4294967295,"length",null))
return J.kk(new Array(a),b)},
kj(a,b){if(a<0)throw A.c(A.n("Length must be a non-negative integer: "+a,null))
return A.e(new Array(a),b.h("u<0>"))},
jt(a,b){if(a<0)throw A.c(A.n("Length must be a non-negative integer: "+a,null))
return A.e(new Array(a),b.h("u<0>"))},
kk(a,b){var s=A.e(a,b.h("u<0>"))
s.$flags=1
return s},
mk(a,b){var s=t.e8
return J.k8(s.a(a),s.a(b))},
bN(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cx.prototype
return J.e6.prototype}if(typeof a=="string")return J.bf.prototype
if(a==null)return J.cy.prototype
if(typeof a=="boolean")return J.e5.prototype
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bg.prototype
if(typeof a=="symbol")return J.cB.prototype
if(typeof a=="bigint")return J.cz.prototype
return a}if(a instanceof A.w)return a
return J.jX(a)},
cf(a){if(typeof a=="string")return J.bf.prototype
if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bg.prototype
if(typeof a=="symbol")return J.cB.prototype
if(typeof a=="bigint")return J.cz.prototype
return a}if(a instanceof A.w)return a
return J.jX(a)},
fr(a){if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bg.prototype
if(typeof a=="symbol")return J.cB.prototype
if(typeof a=="bigint")return J.cz.prototype
return a}if(a instanceof A.w)return a
return J.jX(a)},
oL(a){if(typeof a=="number")return J.bV.prototype
if(typeof a=="string")return J.bf.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bB.prototype
return a},
oM(a){if(typeof a=="string")return J.bf.prototype
if(a==null)return a
if(!(a instanceof A.w))return J.bB.prototype
return a},
ba(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bN(a).T(a,b)},
jo(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.oT(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.cf(a).n(a,b)},
dE(a,b,c){return J.fr(a).t(a,b,c)},
fs(a,b){return J.fr(a).i(a,b)},
k8(a,b){return J.oL(a).N(a,b)},
jp(a,b){return J.fr(a).O(a,b)},
L(a){return J.bN(a).gC(a)},
Y(a){return J.fr(a).gv(a)},
bb(a){return J.cf(a).gp(a)},
dF(a){return J.bN(a).gE(a)},
lZ(a,b){return J.oM(a).aA(a,b)},
aS(a){return J.bN(a).j(a)},
e3:function e3(){},
e5:function e5(){},
cy:function cy(){},
cA:function cA(){},
bh:function bh(){},
ej:function ej(){},
bB:function bB(){},
bg:function bg(){},
cz:function cz(){},
cB:function cB(){},
u:function u(a){this.$ti=a},
e4:function e4(){},
h3:function h3(a){this.$ti=a},
ci:function ci(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bV:function bV(){},
cx:function cx(){},
e6:function e6(){},
bf:function bf(){}},A={ju:function ju(){},
kl(a){return new A.cC("Field '"+a+"' has been assigned during initialization.")},
ml(a){return new A.cC("Field '"+a+"' has not been initialized.")},
j_(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
X(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
eB(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
bM(a,b,c){return a},
k_(a){var s,r
for(s=$.aq.length,r=0;r<s;++r)if(a===$.aq[r])return!0
return!1},
hF(a,b,c,d){A.eo(b,"start")
if(c!=null){A.eo(c,"end")
if(b>c)A.m(A.al(b,0,c,"start",null))}return new A.d0(a,b,c,d.h("d0<0>"))},
ko(a,b,c,d){if(t.gw.b(a))return new A.cs(a,b,c.h("@<0>").F(d).h("cs<1,2>"))
return new A.aB(a,b,c.h("@<0>").F(d).h("aB<1,2>"))},
jr(){return new A.c3("No element")},
mi(){return new A.c3("Too many elements")},
c5:function c5(){},
ck:function ck(a,b){this.a=a
this.$ti=b},
d6:function d6(){},
cl:function cl(a,b){this.a=a
this.$ti=b},
cC:function cC(a){this.a=a},
dP:function dP(a){this.a=a},
hE:function hE(){},
q:function q(){},
Q:function Q(){},
d0:function d0(a,b,c,d){var _=this
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
aB:function aB(a,b,c){this.a=a
this.b=b
this.$ti=c},
cs:function cs(a,b,c){this.a=a
this.b=b
this.$ti=c},
cH:function cH(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
b_:function b_(a,b,c){this.a=a
this.b=b
this.$ti=c},
a0:function a0(a,b,c){this.a=a
this.b=b
this.$ti=c},
G:function G(a,b,c){this.a=a
this.b=b
this.$ti=c},
aa:function aa(){},
bC:function bC(){},
c4:function c4(){},
cX:function cX(a,b){this.a=a
this.$ti=b},
dx:function dx(){},
kf(a,b,c){var s,r,q,p,o,n,m,l=A.t(a),k=A.h6(new A.bw(a,l.h("bw<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.C)(k),++i,p=o){r=k[i]
c.a(a.n(0,r))
o=p+1
q[r]=p}n=A.h6(new A.aZ(a,l.h("aZ<2>")),!0,c)
m=new A.H(q,n,b.h("@<0>").F(c).h("H<1,2>"))
m.$keys=k
return m}return new A.cp(A.mo(a,b,c),b.h("@<0>").F(c).h("cp<1,2>"))},
m6(){throw A.c(A.aM("Cannot modify unmodifiable Map"))},
m7(){throw A.c(A.aM("Cannot modify constant Set"))},
lH(a){var s=A.lG(a)
if(s!=null)return s
return"minified:"+a},
oT(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
p(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.aS(a)
return s},
el(a){var s,r=$.kt
if(r==null)r=$.kt=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
ku(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.h(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
em(a){var s,r,q,p
if(a instanceof A.w)return A.ap(A.bp(a),null)
s=J.bN(a)
if(s===B.bl||s===B.bn||t.ak.b(a)){r=B.a9(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ap(A.bp(a),null)},
kv(a){var s,r,q
if(a==null||typeof a=="number"||A.jQ(a))return J.aS(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bd)return a.j(0)
if(a instanceof A.b6)return a.bY(!0)
s=$.lY()
for(r=0;r<1;++r){q=s[r].em(a)
if(q!=null)return q}return"Instance of '"+A.em(a)+"'"},
mv(){if(!!self.location)return self.location.href
return null},
mE(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
bz(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.i.b3(s,10)|55296)>>>0,s&1023|56320)}}throw A.c(A.al(a,0,1114111,null,null))},
c_(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mD(a){var s=A.c_(a).getUTCFullYear()+0
return s},
mB(a){var s=A.c_(a).getUTCMonth()+1
return s},
mx(a){var s=A.c_(a).getUTCDate()+0
return s},
my(a){var s=A.c_(a).getUTCHours()+0
return s},
mA(a){var s=A.c_(a).getUTCMinutes()+0
return s},
mC(a){var s=A.c_(a).getUTCSeconds()+0
return s},
mz(a){var s=A.c_(a).getUTCMilliseconds()+0
return s},
mw(a){var s=a.$thrownJsError
if(s==null)return null
return A.cg(s)},
kw(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.P(a,s)
a.$thrownJsError=s
s.stack=b.j(0)}},
oO(a){throw A.c(A.jU(a))},
h(a,b){if(a==null)J.bb(a)
throw A.c(A.iX(a,b))},
iX(a,b){var s,r="index"
if(!A.lm(b))return new A.aH(!0,b,r,null)
s=A.a(J.bb(a))
if(b<0||b>=s)return A.h2(b,s,a,r)
return new A.cS(null,null,!0,b,r,"Value not in range")},
jU(a){return new A.aH(!0,a,null,null)},
dC(a){return a},
c(a){return A.P(a,new Error())},
P(a,b){var s
if(a==null)a=new A.b3()
b.dartException=a
s=A.p5
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
p5(){return J.aS(this.dartException)},
m(a,b){throw A.P(a,b==null?new Error():b)},
aG(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.m(A.nX(a,b,c),s)},
nX(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.d3("'"+s+"': Cannot "+o+" "+l+k+n)},
C(a){throw A.c(A.as(a))},
b4(a){var s,r,q,p,o,n
a=A.oZ(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.e([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.hK(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
hL(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
kD(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jv(a,b){var s=b==null,r=s?null:b.method
return new A.e7(a,r,s?null:b.receiver)},
b9(a){var s
if(a==null)return new A.hh(a)
if(a instanceof A.ct){s=a.a
return A.bq(a,s==null?A.dy(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bq(a,a.dartException)
return A.ox(a)},
bq(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
ox(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.i.b3(r,16)&8191)===10)switch(q){case 438:return A.bq(a,A.jv(A.p(s)+" (Error "+q+")",null))
case 445:case 5007:A.p(s)
return A.bq(a,new A.cP())}}if(a instanceof TypeError){p=$.lK()
o=$.lL()
n=$.lM()
m=$.lN()
l=$.lQ()
k=$.lR()
j=$.lP()
$.lO()
i=$.lT()
h=$.lS()
g=p.a0(s)
if(g!=null)return A.bq(a,A.jv(A.aP(s),g))
else{g=o.a0(s)
if(g!=null){g.method="call"
return A.bq(a,A.jv(A.aP(s),g))}else if(n.a0(s)!=null||m.a0(s)!=null||l.a0(s)!=null||k.a0(s)!=null||j.a0(s)!=null||m.a0(s)!=null||i.a0(s)!=null||h.a0(s)!=null){A.aP(s)
return A.bq(a,new A.cP())}}return A.bq(a,new A.eG(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.d_()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bq(a,new A.aH(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.d_()
return a},
cg(a){var s
if(a instanceof A.ct)return a.b
if(a==null)return new A.dj(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.dj(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
jd(a){if(a==null)return J.L(a)
if(typeof a=="object")return A.el(a)
return J.L(a)},
oJ(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.t(0,a[s],a[r])}return b},
oK(a,b){var s,r=a.length
for(s=0;s<r;++s)b.i(0,a[s])
return b},
o9(a,b,c,d,e,f){t.Z.a(a)
switch(A.a(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.c(new A.i_("Unsupported number of arguments for wrapped closure"))},
cd(a,b){var s=a.$identity
if(!!s)return s
s=A.oE(a,b)
a.$identity=s
return s},
oE(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.o9)},
m5(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.eA().constructor.prototype):Object.create(new A.bP(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.ke(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.m1(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.ke(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
m1(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.c("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.m_)}throw A.c("Error in functionType of tearoff")},
m2(a,b,c,d){var s=A.kd
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
ke(a,b,c,d){if(c)return A.m4(a,b,d)
return A.m2(b.length,d,a,b)},
m3(a,b,c,d){var s=A.kd,r=A.m0
switch(b?-1:a){case 0:throw A.c(new A.es("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
m4(a,b,c){var s,r
if($.kb==null)$.kb=A.ka("interceptor")
if($.kc==null)$.kc=A.ka("receiver")
s=b.length
r=A.m3(s,c,a,b)
return r},
jV(a){return A.m5(a)},
m_(a,b){return A.dp(v.typeUniverse,A.bp(a.a),b)},
kd(a){return a.a},
m0(a){return a.b},
ka(a){var s,r,q,p=new A.bP("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.c(A.n("Field name "+a+" not found.",null))},
iZ(a){return v.getIsolateTag(a)},
lF(){return v.G},
oV(a){var s,r,q,p,o,n=A.aP($.lB.$1(a)),m=$.iY[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.j3[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bK($.lx.$2(a,n))
if(q!=null){m=$.iY[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.j3[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jc(s)
$.iY[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.j3[n]=s
return s}if(p==="-"){o=A.jc(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.lD(a,s)
if(p==="*")throw A.c(A.kE(n))
if(v.leafTags[n]===true){o=A.jc(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.lD(a,s)},
lD(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.k0(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jc(a){return J.k0(a,!1,null,!!a.$iag)},
oX(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jc(s)
else return J.k0(s,c,null,null)},
oQ(){if(!0===$.jZ)return
$.jZ=!0
A.oR()},
oR(){var s,r,q,p,o,n,m,l
$.iY=Object.create(null)
$.j3=Object.create(null)
A.oP()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.lE.$1(o)
if(n!=null){m=A.oX(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
oP(){var s,r,q,p,o,n,m=B.aQ()
m=A.cc(B.aR,A.cc(B.aS,A.cc(B.aa,A.cc(B.aa,A.cc(B.aT,A.cc(B.aU,A.cc(B.aV(B.a9),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.lB=new A.j0(p)
$.lx=new A.j1(o)
$.lE=new A.j2(n)},
cc(a,b){return a(b)||b},
oF(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
p3(a,b,c){var s=a.indexOf(b,c)
return s>=0},
oZ(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bm:function bm(a,b){this.a=a
this.b=b},
dg:function dg(a,b){this.a=a
this.b=b},
dh:function dh(a,b){this.a=a
this.b=b},
cp:function cp(a,b){this.a=a
this.$ti=b},
co:function co(){},
H:function H(a,b,c){this.a=a
this.b=b
this.$ti=c},
bG:function bG(a,b){this.a=a
this.$ti=b},
bH:function bH(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cq:function cq(){},
aI:function aI(a,b,c){this.a=a
this.b=b
this.$ti=c},
cY:function cY(){},
hK:function hK(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cP:function cP(){},
e7:function e7(a,b,c){this.a=a
this.b=b
this.c=c},
eG:function eG(a){this.a=a},
hh:function hh(a){this.a=a},
ct:function ct(a,b){this.a=a
this.b=b},
dj:function dj(a){this.a=a
this.b=null},
bd:function bd(){},
dN:function dN(){},
dO:function dO(){},
eC:function eC(){},
eA:function eA(){},
bP:function bP(a,b){this.a=a
this.b=b},
es:function es(a){this.a=a},
aW:function aW(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h4:function h4(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
bw:function bw(a,b){this.a=a
this.$ti=b},
cE:function cE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aZ:function aZ(a,b){this.a=a
this.$ti=b},
aY:function aY(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aX:function aX(a,b){this.a=a
this.$ti=b},
cD:function cD(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
j0:function j0(a){this.a=a},
j1:function j1(a){this.a=a},
j2:function j2(a){this.a=a},
b6:function b6(){},
bl:function bl(){},
r(a){return a},
ms(a){return new Int8Array(a)},
mt(a){return new Uint8Array(a)},
eg(a){return new Uint8Array(A.r(a))},
b8(a,b,c){if(a>>>0!==a||a>=c)throw A.c(A.iX(b,a))},
bZ:function bZ(){},
cM:function cM(){},
e9:function e9(){},
a2:function a2(){},
cK:function cK(){},
cL:function cL(){},
cJ:function cJ(){},
ea:function ea(){},
eb:function eb(){},
ec:function ec(){},
ed:function ed(){},
ee:function ee(){},
ef:function ef(){},
cN:function cN(){},
cO:function cO(){},
dc:function dc(){},
dd:function dd(){},
de:function de(){},
df:function df(){},
jC(a,b){var s=b.c
return s==null?b.c=A.dm(a,"bu",[b.x]):s},
ky(a){var s=a.w
if(s===6||s===7)return A.ky(a.x)
return s===11||s===12},
mJ(a){return a.as},
bo(a){return A.im(v.typeUniverse,a,!1)},
bL(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bL(a1,s,a3,a4)
if(r===s)return a2
return A.l_(a1,r,!0)
case 7:s=a2.x
r=A.bL(a1,s,a3,a4)
if(r===s)return a2
return A.kZ(a1,r,!0)
case 8:q=a2.y
p=A.cb(a1,q,a3,a4)
if(p===q)return a2
return A.dm(a1,a2.x,p)
case 9:o=a2.x
n=A.bL(a1,o,a3,a4)
m=a2.y
l=A.cb(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jK(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.cb(a1,j,a3,a4)
if(i===j)return a2
return A.l0(a1,k,i)
case 11:h=a2.x
g=A.bL(a1,h,a3,a4)
f=a2.y
e=A.ou(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.kY(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.cb(a1,d,a3,a4)
o=a2.x
n=A.bL(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jL(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.c(A.dH("Attempted to substitute unexpected RTI kind "+a0))}},
cb(a,b,c,d){var s,r,q,p,o=b.length,n=A.ir(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bL(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
ov(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.ir(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bL(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
ou(a,b,c,d){var s,r=b.a,q=A.cb(a,r,c,d),p=b.b,o=A.cb(a,p,c,d),n=b.c,m=A.ov(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.f2()
s.a=q
s.b=o
s.c=m
return s},
e(a,b){a[v.arrayRti]=b
return a},
jW(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.oN(s)
return a.$S()}return null},
oS(a,b){var s
if(A.ky(b))if(a instanceof A.bd){s=A.jW(a)
if(s!=null)return s}return A.bp(a)},
bp(a){if(a instanceof A.w)return A.t(a)
if(Array.isArray(a))return A.K(a)
return A.jP(J.bN(a))},
K(a){var s=a[v.arrayRti],r=t.E
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
t(a){var s=a.$ti
return s!=null?s:A.jP(a)},
jP(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.o5(a,s)},
o5(a,b){var s=a instanceof A.bd?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.nu(v.typeUniverse,s.name)
b.$ccache=r
return r},
oN(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.im(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
jY(a){return A.aQ(A.t(a))},
jT(a){var s
if(a instanceof A.b6)return a.bH()
s=a instanceof A.bd?A.jW(a):null
if(s!=null)return s
if(t.dm.b(a))return J.dF(a).a
if(Array.isArray(a))return A.K(a)
return A.bp(a)},
aQ(a){var s=a.r
return s==null?a.r=new A.il(a):s},
oI(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.h(q,0)
s=A.dp(v.typeUniverse,A.jT(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.h(q,r)
s=A.l2(v.typeUniverse,s,A.jT(q[r]))}return A.dp(v.typeUniverse,s,a)},
ax(a){return A.aQ(A.im(v.typeUniverse,a,!1))},
o4(a){var s=this
s.b=A.os(s)
return s.b(a)},
os(a){var s,r,q,p,o
if(a===t.K)return A.of
if(A.bO(a))return A.oj
s=a.w
if(s===6)return A.o2
if(s===1)return A.lo
if(s===7)return A.oa
r=A.or(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bO)){a.f="$i"+q
if(q==="v")return A.od
if(a===t.m)return A.oc
return A.oi}}else if(s===10){p=A.oF(a.x,a.y)
o=p==null?A.lo:p
return o==null?A.dy(o):o}return A.o0},
or(a){if(a.w===8){if(a===t.S)return A.lm
if(a===t.i||a===t.o)return A.oe
if(a===t.N)return A.oh
if(a===t.y)return A.jQ}return null},
o3(a){var s=this,r=A.o_
if(A.bO(s))r=A.nT
else if(s===t.K)r=A.dy
else if(A.ch(s)){r=A.o1
if(s===t.h6)r=A.nS
else if(s===t.dk)r=A.bK
else if(s===t.fQ)r=A.nQ
else if(s===t.cg)r=A.lc
else if(s===t.cD)r=A.nR
else if(s===t.an)r=A.a4}else if(s===t.S)r=A.a
else if(s===t.N)r=A.aP
else if(s===t.y)r=A.nP
else if(s===t.o)r=A.iu
else if(s===t.i)r=A.it
else if(s===t.m)r=A.a1
s.a=r
return s.a(a)},
o0(a){var s=this
if(a==null)return A.ch(s)
return A.oU(v.typeUniverse,A.oS(a,s),s)},
o2(a){if(a==null)return!0
return this.x.b(a)},
oi(a){var s,r=this
if(a==null)return A.ch(r)
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bN(a)[s]},
od(a){var s,r=this
if(a==null)return A.ch(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.w)return!!a[s]
return!!J.bN(a)[s]},
oc(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.w)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
ln(a){if(typeof a=="object"){if(a instanceof A.w)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
o_(a){var s=this
if(a==null){if(A.ch(s))return a}else if(s.b(a))return a
throw A.P(A.lh(a,s),new Error())},
o1(a){var s=this
if(a==null||s.b(a))return a
throw A.P(A.lh(a,s),new Error())},
lh(a,b){return new A.dk("TypeError: "+A.kS(a,A.ap(b,null)))},
kS(a,b){return A.fF(a)+": type '"+A.ap(A.jT(a),null)+"' is not a subtype of type '"+b+"'"},
aw(a,b){return new A.dk("TypeError: "+A.kS(a,b))},
oa(a){var s=this
return s.x.b(a)||A.jC(v.typeUniverse,s).b(a)},
of(a){return a!=null},
dy(a){if(a!=null)return a
throw A.P(A.aw(a,"Object"),new Error())},
oj(a){return!0},
nT(a){return a},
lo(a){return!1},
jQ(a){return!0===a||!1===a},
nP(a){if(!0===a)return!0
if(!1===a)return!1
throw A.P(A.aw(a,"bool"),new Error())},
nQ(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.P(A.aw(a,"bool?"),new Error())},
it(a){if(typeof a=="number")return a
throw A.P(A.aw(a,"double"),new Error())},
nR(a){if(typeof a=="number")return a
if(a==null)return a
throw A.P(A.aw(a,"double?"),new Error())},
lm(a){return typeof a=="number"&&Math.floor(a)===a},
a(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.P(A.aw(a,"int"),new Error())},
nS(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.P(A.aw(a,"int?"),new Error())},
oe(a){return typeof a=="number"},
iu(a){if(typeof a=="number")return a
throw A.P(A.aw(a,"num"),new Error())},
lc(a){if(typeof a=="number")return a
if(a==null)return a
throw A.P(A.aw(a,"num?"),new Error())},
oh(a){return typeof a=="string"},
aP(a){if(typeof a=="string")return a
throw A.P(A.aw(a,"String"),new Error())},
bK(a){if(typeof a=="string")return a
if(a==null)return a
throw A.P(A.aw(a,"String?"),new Error())},
a1(a){if(A.ln(a))return a
throw A.P(A.aw(a,"JSObject"),new Error())},
a4(a){if(a==null)return a
if(A.ln(a))return a
throw A.P(A.aw(a,"JSObject?"),new Error())},
ls(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ap(a[q],b)
return s},
om(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.ls(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ap(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
lj(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
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
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.ap(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.ap(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.ap(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.ap(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.ap(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
ap(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.ap(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.ap(a.x,b)+">"
if(l===8){p=A.ow(a.x)
o=a.y
return o.length>0?p+("<"+A.ls(o,b)+">"):p}if(l===10)return A.om(a,b)
if(l===11)return A.lj(a,b,null)
if(l===12)return A.lj(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.h(b,n)
return b[n]}return"?"},
ow(a){var s=A.lG(a)
if(s!=null)return s
return"minified:"+a},
nv(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
nu(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.im(a,b,!1)
else if(typeof m=="number"){s=m
r=A.dn(a,5,"#")
q=A.ir(s)
for(p=0;p<s;++p)q[p]=r
o=A.dm(a,b,q)
n[b]=o
return o}else return m},
nt(a,b){return A.la(a.tR,b)},
ns(a,b){return A.la(a.eT,b)},
im(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.l1(a,null,b,!1)
r.set(b,s)
return s},
dp(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.l1(a,b,c,!0)
q.set(c,r)
return r},
l2(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jK(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
l1(a,b,c,d){return A.nk(A.ne(a,b,c,d))},
bn(a,b){b.a=A.o3
b.b=A.o4
return b},
dn(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aC(null,null)
s.w=b
s.as=c
r=A.bn(a,s)
a.eC.set(c,r)
return r},
l_(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.nq(a,b,r,c)
a.eC.set(r,s)
return s},
nq(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bO(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.ch(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.aC(null,null)
q.w=6
q.x=b
q.as=c
return A.bn(a,q)},
kZ(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.no(a,b,r,c)
a.eC.set(r,s)
return s},
no(a,b,c,d){var s,r
if(d){s=b.w
if(A.bO(b)||b===t.K)return b
else if(s===1)return A.dm(a,"bu",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.aC(null,null)
r.w=7
r.x=b
r.as=c
return A.bn(a,r)},
nr(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aC(null,null)
s.w=13
s.x=b
s.as=q
r=A.bn(a,s)
a.eC.set(q,r)
return r},
dl(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
nn(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
dm(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.dl(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.aC(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bn(a,r)
a.eC.set(p,q)
return q},
jK(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.dl(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.aC(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bn(a,o)
a.eC.set(q,n)
return n},
l0(a,b,c){var s,r,q="+"+(b+"("+A.dl(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aC(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bn(a,s)
a.eC.set(q,r)
return r},
kY(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.dl(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.dl(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.nn(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aC(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bn(a,p)
a.eC.set(r,o)
return o},
jL(a,b,c,d){var s,r=b.as+("<"+A.dl(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.np(a,b,c,r,d)
a.eC.set(r,s)
return s},
np(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.ir(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bL(a,b,r,0)
m=A.cb(a,c,r,0)
return A.jL(a,n,m,c!==m)}}l=new A.aC(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bn(a,l)},
ne(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
nk(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.ng(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kV(a,r,l,k,!1)
else if(q===46)r=A.kV(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bJ(a.u,a.e,k.pop()))
break
case 94:k.push(A.nr(a.u,k.pop()))
break
case 35:k.push(A.dn(a.u,5,"#"))
break
case 64:k.push(A.dn(a.u,2,"@"))
break
case 126:k.push(A.dn(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.ni(a,k)
break
case 38:A.nh(a,k)
break
case 63:p=a.u
k.push(A.l_(p,A.bJ(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.kZ(p,A.bJ(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.nf(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.kW(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.nl(a.u,a.e,o)
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
return A.bJ(a.u,a.e,m)},
ng(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kV(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.nv(s,o.x)[p]
if(n==null)A.m('No "'+p+'" in "'+A.mJ(o)+'"')
d.push(A.dp(s,o,n))}else d.push(p)
return m},
ni(a,b){var s,r=a.u,q=A.kU(a,b),p=b.pop()
if(typeof p=="string")b.push(A.dm(r,p,q))
else{s=A.bJ(r,a.e,p)
switch(s.w){case 11:b.push(A.jL(r,s,q,a.n))
break
default:b.push(A.jK(r,s,q))
break}}},
nf(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kU(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bJ(p,a.e,o)
q=new A.f2()
q.a=s
q.b=n
q.c=m
b.push(A.kY(p,r,q))
return
case-4:b.push(A.l0(p,b.pop(),s))
return
default:throw A.c(A.dH("Unexpected state under `()`: "+A.p(o)))}},
nh(a,b){var s=b.pop()
if(0===s){b.push(A.dn(a.u,1,"0&"))
return}if(1===s){b.push(A.dn(a.u,4,"1&"))
return}throw A.c(A.dH("Unexpected extended operation "+A.p(s)))},
kU(a,b){var s=b.splice(a.p)
A.kW(a.u,a.e,s)
a.p=b.pop()
return s},
bJ(a,b,c){if(typeof c=="string")return A.dm(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.nj(a,b,c)}else return c},
kW(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bJ(a,b,c[s])},
nl(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bJ(a,b,c[s])},
nj(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.c(A.dH("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.c(A.dH("Bad index "+c+" for "+b.j(0)))},
oU(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.T(a,b,null,c,null)
r.set(c,s)}return s},
T(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bO(d))return!0
s=b.w
if(s===4)return!0
if(A.bO(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.T(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.T(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.T(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.T(a,b.x,c,d,e))return!1
return A.T(a,A.jC(a,b),c,d,e)}if(s===6)return A.T(a,p,c,d,e)&&A.T(a,b.x,c,d,e)
if(q===7){if(A.T(a,b,c,d.x,e))return!0
return A.T(a,b,c,A.jC(a,d),e)}if(q===6)return A.T(a,b,c,p,e)||A.T(a,b,c,d.x,e)
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
if(!A.T(a,j,c,i,e)||!A.T(a,i,e,j,c))return!1}return A.ll(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.ll(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.ob(a,b,c,d,e)}if(o&&q===10)return A.og(a,b,c,d,e)
return!1},
ll(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
ob(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.dp(a,b,r[o])
return A.lb(a,p,null,c,d.y,e)}return A.lb(a,b.y,null,c,d.y,e)},
lb(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.T(a,b[s],d,e[s],f))return!1
return!0},
og(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.T(a,r[s],c,q[s],e))return!1
return!0},
ch(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.bO(a))if(s!==6)r=s===7&&A.ch(a.x)
return r},
bO(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
la(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
ir(a){return a>0?new Array(a):v.typeUniverse.sEA},
aC:function aC(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
f2:function f2(){this.c=this.b=this.a=null},
il:function il(a){this.a=a},
f0:function f0(){},
dk:function dk(a){this.a=a},
n9(){var s,r,q
if(self.scheduleImmediate!=null)return A.oy()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.cd(new A.hW(s),1)).observe(r,{childList:true})
return new A.hV(s,r,q)}else if(self.setImmediate!=null)return A.oz()
return A.oA()},
na(a){self.scheduleImmediate(A.cd(new A.hX(t.M.a(a)),0))},
nb(a){self.setImmediate(A.cd(new A.hY(t.M.a(a)),0))},
nc(a){t.M.a(a)
A.nm(0,a)},
nm(a,b){var s=new A.ij()
s.cM(a,b)
return s},
lp(a){return new A.eQ(new A.O($.J,a.h("O<0>")),a.h("eQ<0>"))},
lg(a,b){a.$2(0,null)
b.b=!0
return b.a},
ld(a,b){A.nU(a,b)},
lf(a,b){b.b4(a)},
le(a,b){b.b5(A.b9(a),A.cg(a))},
nU(a,b){var s,r,q=new A.iv(b),p=new A.iw(b)
if(a instanceof A.O)a.bW(q,p,t.A)
else{s=t.A
if(a instanceof A.O)a.cz(q,p,s)
else{r=new A.O($.J,t.c)
r.a=8
r.c=a
r.bW(q,p,s)}}},
lw(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.J.cv(new A.iR(s),t.H,t.S,t.A)},
kX(a,b,c){return 0},
jq(a){var s
if(t.Q.b(a)){s=a.gai()
if(s!=null)return s}return B.y},
o6(a,b){if($.J===B.n)return null
return null},
o7(a,b){if($.J!==B.n)A.o6(a,b)
if(b==null)if(t.Q.b(a)){b=a.gai()
if(b==null){A.kw(a,B.y)
b=B.y}}else b=B.y
else if(t.Q.b(a))A.kw(a,b)
return new A.ar(a,b)},
jE(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.mL()
b.aS(new A.ar(new A.aH(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bK(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aD()
b.aB(o.a)
A.c6(b,p)
return}b.a^=2
A.fq(null,null,b.b,t.M.a(new A.i4(o,b)))},
c6(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jS(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.c6(d.a,c)
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
A.jS(j.a,j.b)
return}g=$.J
if(g!==h)$.J=h
else g=null
c=c.c
if((c&15)===8)new A.i8(q,d,n).$0()
else if(o){if((c&1)!==0)new A.i7(q,j).$0()}else if((c&2)!==0)new A.i6(d,q).$0()
if(g!=null)$.J=g
c=q.c
if(c instanceof A.O){p=q.a.$ti
p=p.h("bu<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aE(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.jE(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aE(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
on(a,b){var s
if(t.e.b(a))return b.cv(a,t.A,t.K,t.l)
s=t.D
if(s.b(a))return s.a(a)
throw A.c(A.aT(a,"onError",u.c))},
ol(){var s,r
for(s=$.ca;s!=null;s=$.ca){$.dB=null
r=s.b
$.ca=r
if(r==null)$.dA=null
s.a.$0()}},
ot(){$.jR=!0
try{A.ol()}finally{$.dB=null
$.jR=!1
if($.ca!=null)$.k7().$1(A.ly())}},
lu(a){var s=new A.eR(a),r=$.dA
if(r==null){$.ca=$.dA=s
if(!$.jR)$.k7().$1(A.ly())}else $.dA=r.b=s},
oq(a){var s,r,q,p=$.ca
if(p==null){A.lu(a)
$.dB=$.dA
return}s=new A.eR(a)
r=$.dB
if(r==null){s.b=p
$.ca=$.dB=s}else{q=r.b
s.b=q
$.dB=r.b=s
if(q==null)$.dA=s}},
pj(a,b){A.bM(a,"stream",t.K)
return new A.fh(b.h("fh<0>"))},
jS(a,b){A.oq(new A.iQ(a,b))},
lr(a,b,c,d,e){var s,r=$.J
if(r===c)return d.$0()
$.J=c
s=r
try{r=d.$0()
return r}finally{$.J=s}},
op(a,b,c,d,e,f,g){var s,r=$.J
if(r===c)return d.$1(e)
$.J=c
s=r
try{r=d.$1(e)
return r}finally{$.J=s}},
oo(a,b,c,d,e,f,g,h,i){var s,r=$.J
if(r===c)return d.$2(e,f)
$.J=c
s=r
try{r=d.$2(e,f)
return r}finally{$.J=s}},
fq(a,b,c,d){t.M.a(d)
if(B.n!==c){d=c.dC(d)
d=d}A.lu(d)},
hW:function hW(a){this.a=a},
hV:function hV(a,b,c){this.a=a
this.b=b
this.c=c},
hX:function hX(a){this.a=a},
hY:function hY(a){this.a=a},
ij:function ij(){},
ik:function ik(a,b){this.a=a
this.b=b},
eQ:function eQ(a,b){this.a=a
this.b=!1
this.$ti=b},
iv:function iv(a){this.a=a},
iw:function iw(a){this.a=a},
iR:function iR(a){this.a=a},
aF:function aF(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aO:function aO(a,b){this.a=a
this.$ti=b},
ar:function ar(a,b){this.a=a
this.b=b},
eV:function eV(){},
d5:function d5(a,b){this.a=a
this.$ti=b},
bE:function bE(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
O:function O(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
i1:function i1(a,b){this.a=a
this.b=b},
i5:function i5(a,b){this.a=a
this.b=b},
i4:function i4(a,b){this.a=a
this.b=b},
i3:function i3(a,b){this.a=a
this.b=b},
i2:function i2(a,b){this.a=a
this.b=b},
i8:function i8(a,b,c){this.a=a
this.b=b
this.c=c},
i9:function i9(a,b){this.a=a
this.b=b},
ia:function ia(a){this.a=a},
i7:function i7(a,b){this.a=a
this.b=b},
i6:function i6(a,b){this.a=a
this.b=b},
eR:function eR(a){this.a=a
this.b=null},
fh:function fh(a){this.$ti=a},
dw:function dw(){},
fa:function fa(){},
ig:function ig(a,b){this.a=a
this.b=b},
iQ:function iQ(a,b){this.a=a
this.b=b},
kT(a,b){var s=a[b]
return s===a?null:s},
jG(a,b,c){if(c==null)a[b]=a
else a[b]=c},
jF(){var s=Object.create(null)
A.jG(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
mm(a,b){return new A.aW(a.h("@<0>").F(b).h("aW<1,2>"))},
mn(a,b,c){return b.h("@<0>").F(c).h("km<1,2>").a(A.oJ(a,new A.aW(b.h("@<0>").F(c).h("aW<1,2>"))))},
aA(a,b){return new A.aW(a.h("@<0>").F(b).h("aW<1,2>"))},
jw(a){return new A.aE(a.h("aE<0>"))},
ah(a){return new A.aE(a.h("aE<0>"))},
cF(a,b){return b.h("kn<0>").a(A.oK(a,new A.aE(b.h("aE<0>"))))},
jI(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
jH(a,b,c){var s=new A.bI(a,b,c.h("bI<0>"))
s.c=a.e
return s},
mo(a,b,c){var s=A.mm(b,c)
a.an(0,new A.h5(s,b,c))
return s},
mp(a,b){var s,r,q=A.jw(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r)q.i(0,b.a(a[r]))
return q},
jx(a,b){var s=A.jw(b)
s.V(0,a)
return s},
jy(a){var s,r
if(A.k_(a))return"{...}"
s=new A.ac("")
try{r={}
B.a.i($.aq,a)
s.a+="{"
r.a=!0
a.an(0,new A.h9(r,s))
s.a+="}"}finally{if(0>=$.aq.length)return A.h($.aq,-1)
$.aq.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
nw(){throw A.c(A.aM("Cannot change an unmodifiable set"))},
d7:function d7(){},
ic:function ic(a){this.a=a},
d9:function d9(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
bF:function bF(a,b){this.a=a
this.$ti=b},
d8:function d8(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aE:function aE(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
f4:function f4(a){this.a=a
this.c=this.b=null},
bI:function bI(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
h5:function h5(a,b,c){this.a=a
this.b=b
this.c=c},
y:function y(){},
bx:function bx(){},
h8:function h8(a){this.a=a},
h9:function h9(a,b){this.a=a
this.b=b},
da:function da(a,b){this.a=a
this.$ti=b},
db:function db(a,b,c){var _=this
_.a=a
_.b=b
_.c=null
_.$ti=c},
dq:function dq(){},
bX:function bX(){},
bk:function bk(a,b){this.a=a
this.$ti=b},
b2:function b2(){},
di:function di(){},
fj:function fj(){},
d2:function d2(a,b){this.a=a
this.$ti=b},
c8:function c8(){},
dr:function dr(){},
nN(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.lX()
else s=new Uint8Array(o)
for(r=J.cf(a),q=0;q<o;++q){p=r.n(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
nM(a,b,c,d){var s=a?$.lW():$.lV()
if(s==null)return null
if(0===c&&d===b.length)return A.l9(s,b)
return A.l9(s,b.subarray(c,d))},
l9(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
k9(a,b,c,d,e,f){if(B.i.az(f,4)!==0)throw A.c(A.ab("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.c(A.ab("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.c(A.ab("Invalid base64 padding, more than two '=' characters",a,b))},
nO(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
iq:function iq(){},
ip:function ip(){},
dI:function dI(){},
ft:function ft(){},
bR:function bR(){},
dR:function dR(){},
dX:function dX(){},
eK:function eK(){},
hP:function hP(a){this.a=a},
io:function io(a){this.a=a
this.b=16
this.c=0},
lC(a){var s=A.ku(a,null)
if(s!=null)return s
throw A.c(A.ab(a,null,null))},
ma(a,b){a=A.P(a,new Error())
if(a==null)a=A.dy(a)
a.stack=b.j(0)
throw a},
cG(a,b,c,d){var s,r=c?J.kj(a,d):J.ki(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
h6(a,b,c){var s,r=A.e([],c.h("u<0>"))
for(s=J.Y(a);s.k();)B.a.i(r,c.a(s.gl()))
if(b)return r
r.$flags=1
return r},
at(a,b){var s,r
if(Array.isArray(a))return A.e(a.slice(0),b.h("u<0>"))
s=A.e([],b.h("u<0>"))
for(r=J.Y(a);r.k();)B.a.i(s,r.gl())
return s},
h7(a,b){var s=A.h6(a,!1,b)
s.$flags=3
return s},
kB(a,b,c){var s,r
A.eo(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.c(A.al(c,b,null,"end",null))
if(s===0)return""}r=A.mN(a,b,c)
return r},
mN(a,b,c){var s=a.length
if(b>=s)return""
return A.mE(a,b,c==null||c>s?s:c)},
kA(a,b,c){var s=J.Y(b)
if(!s.k())return a
if(c.length===0){do a+=A.p(s.gl())
while(s.k())}else{a+=A.p(s.gl())
while(s.k())a=a+c+A.p(s.gl())}return a},
mW(){var s,r,q=A.mv()
if(q==null)throw A.c(A.aM("'Uri.base' is not supported"))
s=$.kH
if(s!=null&&q===$.kG)return s
r=A.mX(q)
$.kH=r
$.kG=q
return r},
mL(){return A.cg(new Error())},
m8(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
kg(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
dS(a){if(a>=10)return""+a
return"0"+a},
fF(a){if(typeof a=="number"||A.jQ(a)||a==null)return J.aS(a)
if(typeof a=="string")return JSON.stringify(a)
return A.kv(a)},
mb(a,b){A.bM(a,"error",t.K)
A.bM(b,"stackTrace",t.l)
A.ma(a,b)},
dH(a){return new A.dG(a)},
n(a,b){return new A.aH(!1,null,b,a)},
aT(a,b,c){return new A.aH(!0,a,b,c)},
al(a,b,c,d,e){return new A.cS(b,c,!0,a,d,"Invalid value")},
ep(a,b,c){if(0>a||a>c)throw A.c(A.al(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.c(A.al(b,a,c,"end",null))
return b}return c},
eo(a,b){if(a<0)throw A.c(A.al(a,0,null,b,null))
return a},
h2(a,b,c,d){return new A.e2(b,!0,a,d,"Index out of range")},
aM(a){return new A.d3(a)},
kE(a){return new A.eF(a)},
k(a){return new A.c3(a)},
as(a){return new A.dQ(a)},
ab(a,b,c){return new A.aU(a,b,c)},
mj(a,b,c){var s,r
if(A.k_(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.e([],t.s)
B.a.i($.aq,a)
try{A.ok(a,s)}finally{if(0>=$.aq.length)return A.h($.aq,-1)
$.aq.pop()}r=A.kA(b,t.hf.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
js(a,b,c){var s,r
if(A.k_(a))return b+"..."+c
s=new A.ac(b)
B.a.i($.aq,a)
try{r=s
r.a=A.kA(r.a,a,", ")}finally{if(0>=$.aq.length)return A.h($.aq,-1)
$.aq.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
ok(a,b){var s,r,q,p,o,n,m,l=a.gv(a),k=0,j=0
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
cQ(a,b,c,d,e,f){var s
if(B.j===c){s=J.L(a)
b=J.L(b)
return A.eB(A.X(A.X($.dD(),s),b))}if(B.j===d){s=J.L(a)
b=J.L(b)
c=J.L(c)
return A.eB(A.X(A.X(A.X($.dD(),s),b),c))}if(B.j===e){s=J.L(a)
b=J.L(b)
c=J.L(c)
d=J.L(d)
return A.eB(A.X(A.X(A.X(A.X($.dD(),s),b),c),d))}if(B.j===f){s=J.L(a)
b=J.L(b)
c=J.L(c)
d=J.L(d)
e=J.L(e)
return A.eB(A.X(A.X(A.X(A.X(A.X($.dD(),s),b),c),d),e))}s=J.L(a)
b=J.L(b)
c=J.L(c)
d=J.L(d)
e=J.L(e)
f=J.L(f)
f=A.eB(A.X(A.X(A.X(A.X(A.X(A.X($.dD(),s),b),c),d),e),f))
return f},
mX(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.h(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.kF(a4<a4?B.c.u(a5,0,a4):a5,5,a3).gcB()
else if(s===32)return A.kF(B.c.u(a5,5,a4),0,a3).gcB()}r=A.cG(8,0,!1,t.S)
B.a.t(r,0,0)
B.a.t(r,1,-1)
B.a.t(r,2,-1)
B.a.t(r,7,-1)
B.a.t(r,3,0)
B.a.t(r,4,0)
B.a.t(r,5,a4)
B.a.t(r,6,a4)
if(A.lt(a5,0,a4,0,r)>=14)B.a.t(r,7,a4)
q=r[1]
if(q>=0)if(A.lt(a5,0,q,20,r)===20)r[7]=q
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
s=2}a5=g+B.c.u(a5,n,a4)
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
n=e}j="https"}k=!h}}}}if(k)return new A.fe(a4<a5.length?B.c.u(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.nG(a5,0,q)
else{if(q===0)A.c9(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.nH(a5,c,p-1):""
a=A.nC(a5,p,o,!1)
i=o+1
if(i<n){a0=A.ku(B.c.u(a5,i,n),a3)
d=A.nE(a0==null?A.m(A.ab("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.nD(a5,n,m,a3,j,a!=null)
a2=m<l?A.nF(a5,m+1,l,a3):a3
return A.nx(j,b,a,d,a1,a2,l<a4?A.nB(a5,l+1,a4):a3)},
kJ(a){var s=t.N
return B.a.am(A.e(a.split("&"),t.s),A.aA(s,s),new A.hO(B.ac),t.f)},
eJ(a,b,c){throw A.c(A.ab("Illegal IPv4 address, "+a,b,c))},
mT(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.h(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.eJ("each part must be in the range 0..255",a,r)}A.eJ("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.eJ(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.aG(d)
if(!(k<16))return A.h(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.eJ(j,a,q)
p=l}A.eJ("IPv4 address should contain exactly 4 parts",a,q)},
mU(a,b,c){var s
if(b===c)throw A.c(A.ab("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.h(a,b)
if(a.charCodeAt(b)===118){s=A.mV(a,b,c)
if(s!=null)throw A.c(s)
return!1}A.kI(a,b,c)
return!0},
mV(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.h(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.aU(n,a,q)
r=q
break}return new A.aU("Unexpected character",a,q-1)}if(r-1===b)return new A.aU(n,a,r)
return new A.aU("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.aU("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.h(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.h(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.aU("Invalid IPvFuture address character",a,r)}},
kI(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.hN(a3)
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
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.mT(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.i.b3(l,8)
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
B.av.cG(s,a0,16,s,a)
B.av.dO(s,a,a0,0)}}return s},
nx(a,b,c,d,e,f,g){return new A.ds(a,b,c,d,e,f,g)},
l3(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
c9(a,b,c){throw A.c(A.ab(c,a,b))},
nE(a,b){var s=A.l3(b)
if(a===s)return null
return a},
nC(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.h(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.h(a,r)
if(a.charCodeAt(r)!==93)A.c9(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.h(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.nz(a,q,r)
if(o<r){n=o+1
p=A.l8(a,B.c.J(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.mU(a,q,o)
l=B.c.u(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.h(a,k)
if(a.charCodeAt(k)===58){o=B.c.aH(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.l8(a,B.c.J(a,"25",n)?o+3:n,c,"%25")}else p=""
A.kI(a,b,o)
return"["+B.c.u(a,b,o)+p+"]"}}return A.nJ(a,b,c)},
nz(a,b,c){var s=B.c.aH(a,"%",b)
return s>=b&&s<c?s:c},
l8(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.ac(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.h(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.jN(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.ac("")
l=h.a+=B.c.u(a,q,r)
if(m)n=B.c.u(a,r,r+3)
else if(n==="%")A.c9(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.f.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.ac("")
if(q<r){h.a+=B.c.u(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.h(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.c.u(a,q,r)
if(h==null){h=new A.ac("")
m=h}else m=h
m.a+=i
l=A.jM(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.c.u(a,b,c)
if(q<c){i=B.c.u(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
nJ(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.h(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.jN(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.ac("")
k=B.c.u(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.c.u(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.ac("")
if(q<r){p.a+=B.c.u(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.c9(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.h(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.c.u(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.ac("")
l=p}else l=p
l.a+=k
j=A.jM(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.c.u(a,b,c)
if(q<c){k=B.c.u(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
nG(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.h(a,b)
if(!A.l5(a.charCodeAt(b)))A.c9(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.h(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.c9(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.c.u(a,b,c)
return A.ny(q?a.toLowerCase():a)},
ny(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
nH(a,b,c){return A.dt(a,b,c,16,!1,!1)},
nD(a,b,c,d,e,f){var s=e==="file",r=s||f,q=A.dt(a,b,c,128,!0,!0)
if(q.length===0){if(s)return"/"}else if(r&&!B.c.H(q,"/"))q="/"+q
return A.nI(q,e,f)},
nI(a,b,c){var s=b.length===0
if(s&&!c&&!B.c.H(a,"/")&&!B.c.H(a,"\\"))return A.nK(a,!s||c)
return A.nL(a)},
nF(a,b,c,d){return A.dt(a,b,c,256,!0,!1)},
nB(a,b,c){return A.dt(a,b,c,256,!0,!1)},
jN(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.h(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.h(a,l)
q=a.charCodeAt(l)
p=A.j_(r)
o=A.j_(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.h(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.bz(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.c.u(a,b,b+3).toUpperCase()
return null},
jM(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
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
for(o=0;--p,p>=0;q=128){n=B.i.dm(a,6*p)&63|q
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
o+=3}}return A.kB(s,0,null)},
dt(a,b,c,d,e,f){var s=A.l7(a,b,c,d,e,f)
return s==null?B.c.u(a,b,c):s},
l7(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.h(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.jN(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.c9(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.h(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.jM(n)}if(o==null){o=new A.ac("")
k=o}else k=o
k.a=(k.a+=B.c.u(a,p,q))+l
if(typeof m!=="number")return A.oO(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.c.u(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
l6(a){if(B.c.H(a,"."))return!0
return B.c.aG(a,"/.")!==-1},
nL(a){var s,r,q,p,o,n,m
if(!A.l6(a))return a
s=A.e([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.h(s,-1)
s.pop()
if(s.length===0)B.a.i(s,"")}p=!0}else{p="."===n
if(!p)B.a.i(s,n)}}if(p)B.a.i(s,"")
return B.a.aa(s,"/")},
nK(a,b){var s,r,q,p,o,n
if(!A.l6(a))return!b?A.l4(a):a
s=A.e([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.a.gck(s)!==".."){if(0>=s.length)return A.h(s,-1)
s.pop()}else B.a.i(s,"..")
p=!0}else{p="."===n
if(!p)B.a.i(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.a.i(s,"")
if(!b){if(0>=s.length)return A.h(s,0)
B.a.t(s,0,A.l4(s[0]))}return B.a.aa(s,"/")},
l4(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.l5(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.c.u(a,0,s)+"%3A"+B.c.aA(a,s+1)
if(r<=127){if(!(r<128))return A.h(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
nA(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.h(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.c(A.n("Invalid URL encoding",null))}}return r},
jO(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.h(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.ac===d)return B.c.u(a,b,c)
else p=new A.dP(B.c.u(a,b,c))
else{p=A.e([],t.t)
for(n=b;n<c;++n){if(!(n<o))return A.h(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.c(A.n("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.c(A.n("Truncated URI",null))
B.a.i(p,A.nA(a,n+1))
n+=2}else if(r===43)B.a.i(p,32)
else B.a.i(p,r)}}t.L.a(p)
return B.cX.dH(p)},
l5(a){var s=a|32
return 97<=s&&s<=122},
kF(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.e([b-1],t.t)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.c(A.ab(k,a,r))}}if(q<0&&r>b)throw A.c(A.ab(k,a,r))
while(p!==44){B.a.i(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.h(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.a.i(j,o)
else{n=B.a.gck(j)
if(p!==44||r!==n+7||!B.c.J(a,"base64",n+1))throw A.c(A.ab("Expecting '='",a,r))
break}}B.a.i(j,r)
m=r+1
if((j.length&1)===1)a=B.aO.e1(a,m,s)
else{l=A.l7(a,m,s,256,!0,!1)
if(l!=null)a=B.c.af(a,m,s,l)}return new A.hM(a,j,c)},
lt(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.h(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.h(n,p)
o=n.charCodeAt(p)
d=o&31
B.a.t(e,o>>>5,r)}return d},
bs:function bs(a,b,c){this.a=a
this.b=b
this.c=c},
hZ:function hZ(){},
E:function E(){},
dG:function dG(a){this.a=a},
b3:function b3(){},
aH:function aH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cS:function cS(a,b,c,d,e,f){var _=this
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
d3:function d3(a){this.a=a},
eF:function eF(a){this.a=a},
c3:function c3(a){this.a=a},
dQ:function dQ(a){this.a=a},
eh:function eh(){},
d_:function d_(){},
i_:function i_(a){this.a=a},
aU:function aU(a,b,c){this.a=a
this.b=b
this.c=c},
i:function i(){},
R:function R(a,b,c){this.a=a
this.b=b
this.$ti=c},
U:function U(){},
w:function w(){},
fi:function fi(){},
ac:function ac(a){this.a=a},
hO:function hO(a){this.a=a},
hN:function hN(a){this.a=a},
ds:function ds(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
hM:function hM(a,b,c){this.a=a
this.b=b
this.c=c},
fe:function fe(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
eW:function eW(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
hg:function hg(a){this.a=a},
dz(a){var s
if(typeof a=="function")throw A.c(A.n("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.nV,a)
s[$.k1()]=a
return s},
nV(a,b,c){t.Z.a(a)
if(A.a(c)>=1)return a.$1(b)
return a.$0()},
lA(a,b,c){return c.a(a[b])},
lk(a,b){return a[b]},
a8(a,b,c,d){return d.a(a[b].apply(a,c))},
oY(a,b){var s=new A.O($.J,b.h("O<0>")),r=new A.d5(s,b.h("d5<0>"))
a.then(A.cd(new A.je(r,b),1),A.cd(new A.jf(r),1))
return s},
lq(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
ce(a){if(A.lq(a))return a
return new A.iV(new A.d9(t.hg)).$1(a)},
je:function je(a,b){this.a=a
this.b=b},
jf:function jf(a){this.a=a},
iV:function iV(a){this.a=a},
hq:function hq(a){this.z=a},
c0:function c0(a,b){this.a=a
this.b=b},
ak:function ak(a,b){this.a=a
this.b=b},
fy:function fy(a,b){this.a=a
this.b=b},
fz:function fz(){this.a=null
this.d=0},
hJ:function hJ(a,b){this.a=a
this.b=b},
hn:function hn(){},
br:function br(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.y=_.x=$},
fN:function fN(){},
fO:function fO(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=f},
fQ:function fQ(){this.b=this.a=0},
bU(a,b){return new A.h1(a,b)},
b0:function b0(){},
aj:function aj(a,b,c){this.a=a
this.b=b
this.c=c},
am:function am(a,b,c){this.a=a
this.b=b
this.c=c},
aJ:function aJ(a,b,c){this.a=a
this.b=b
this.c=c},
ei:function ei(a,b,c){this.a=a
this.b=b
this.c=c},
bv:function bv(a,b,c){this.a=a
this.b=b
this.c=c},
cw:function cw(a,b){this.a=a
this.b=b},
h1:function h1(a,b){this.a=a
this.b=b},
iS(a,b,c,d){return A.oC(a,b,c,d)},
oC(a,b,a0,a1){var s=0,r=A.lp(t.fW),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c
var $async$iS=A.lw(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:d=b.length
if(d===0)throw A.c(A.n("bootstrapRenderer requires a non-empty profile ladder",null))
a1.D()
n=A.e([],t.eT)
m=0
i=d-1
h=t.x
case 3:g=m
if(typeof g!=="number"){q=g.aw()
s=1
break}if(!(g<d)){s=4
break}l=B.a.n(b,m)
k=a.$1(l)
if(k.a!==l)throw A.c(A.n("configurationFor("+l.a.b+") returned a configuration for "+k.a.a.b+". The mapping must be total and faithful, or the renderer runs a graph the host did not choose.",null))
p=6
s=9
return A.ld(a0.dS(k,a1),$async$iS)
case 9:J.fs(n,new A.aK(l,null))
f=A.h6(n,!1,h)
f.$flags=3
g=new A.dL(f)
q=g
s=1
break
p=2
s=8
break
case 6:p=5
c=o.pop()
j=A.b9(c)
J.fs(n,new A.aK(l,j))
if(J.ba(m,i))throw c
s=8
break
case 5:s=2
break
case 8:g=m
if(typeof g!=="number"){q=g.a7()
s=1
break}m=g+1
s=3
break
case 4:throw A.c(A.k("bootstrapRenderer exhausted its ladder without a result"))
case 1:return A.lf(q,r)
case 2:return A.le(o.at(-1),r)}})
return A.lg($async$iS,r)},
oH(a){var s,r,q=B.a.bc(B.O,new A.iW(a))
if(q>=0)return A.h7(B.a.cJ(B.O,q),t.W)
s=t.W
r=A.cF([a],s)
r.V(0,B.O)
return A.h7(r,s)},
aK:function aK(a,b){this.a=a
this.b=b},
dL:function dL(a){this.d=a},
fv:function fv(){},
fw:function fw(){},
iW:function iW(a){this.a=a},
p_(a,b,c,d){var s,r,q,p,o,n,m=A.e([],t.cw)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.a.i(m,new A.dg(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.a.a8(m,new A.jg())
s=A.e([],t.w)
for(r=A.hF(m,0,A.bM(b,"count",t.S),t.fk),q=r.$ti,r=new A.ai(r,r.gp(0),q.h("ai<Q.E>")),q=q.h("Q.E");r.k();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
bW:function bW(a,b,c){this.a=a
this.b=b
this.c=c},
af:function af(){},
jg:function jg(){},
aD:function aD(a,b){this.a=a
this.b=b},
fD:function fD(){},
hj(a){var s,r,q="volumetric",p=t.N,o=A.cF(["sceneColor","present"],p),n=a.a.b
if(n.q(0,"shadows"))o.V(0,A.cF(["shadowMap","sceneDepth"],p))
if(n.q(0,q)){o.i(0,"volumetricLight")
o.i(0,"sceneColor#"+(a.d>1?2:1))}if(n.q(0,"ssao"))o.V(0,A.cF(["ssaoRaw","ssaoBlurred"],p))
if(n.q(0,"bloom")){if(a.d>1)s=n.q(0,q)?3:2
else s=n.q(0,q)?2:1
o.V(0,A.cF(["bloomBlurH","bloomBlurV","sceneColor#"+s],p))}if(a.d>1)o.i(0,"sceneColor#1")
if(n.q(0,"dof"))o.V(0,A.cF(["dofBlurH","dofBlurV","dofOutput"],p))
if(n.q(0,"grade"))o.i(0,"gradeOutput")
if(n.q(0,"ps1"))o.i(0,"ps1Output")
r=n.q(0,"vhs")
if(r)o.i(0,"vhsOutput")
return new A.hi(new A.d2(A.jx(o,p),t.am),r)},
hi:function hi(a,b){this.a=a
this.b=b},
hk:function hk(){},
ho:function ho(a){this.b=a},
er:function er(){this.a=null
this.c=0
this.d=!1},
kC(a,b,c,d,e){var s,r
if(!isFinite(c)||c<=0)throw A.c(A.n("SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: "+A.p(c),null))
if(!isFinite(d)||d<=0)throw A.c(A.n("SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: "+A.p(d),null))
s=c>d?d:c
r=new A.d1(b,a,B.v.cw(b*s),B.v.cw(a*s),s,!0)
r.D()
return r},
d1:function d1(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fx:function fx(a,b){this.a=a
this.b=b},
cU:function cU(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
c1:function c1(a,b){this.a=a
this.b=b},
N:function N(a,b,c){this.a=a
this.b=b
this.d=c},
fR:function fR(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=e},
mq(){return new A.e8(new A.aL(new A.hb(),A.e([],t.ha),A.e([],t.t),t.ex))},
e8:function e8(a){this.a=a},
hb:function hb(){},
lv(a){var s=4
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
case B.d1:s=A.m(A.aM("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
nW(a,b,c){var s,r,q,p,o
for(s=a.gdz(),r=s.length,q=0,p=0;p<r;++p){o=s[p]
if(A.lv(o.gdZ())===b)q=B.i.a7(q,o.geB())}return q},
mr(a){return new A.hd(a,new A.aL(new A.he(),A.e([],t.c9),A.e([],t.t),t.cE),A.aA(t.S,t.bw))},
kr(a){var s
A:{s=a.gcn(a)
break A}return s},
eH:function eH(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hd:function hd(a,b,c){this.a=a
this.b=b
this.c=c},
he:function he(){},
hf:function hf(){},
mO(a){var s=new A.eD(a,new A.aL(new A.hG(),A.e([],t.fq),A.e([],t.t),t.g2),A.aA(t.S,t.j))
s.d=s.X($.k6())
s.e=s.X($.k3())
s.f=s.X($.k4())
s.r=s.X($.k2())
s.w=s.X($.k5())
return s},
eD:function eD(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
hG:function hG(){},
hI:function hI(){},
hH:function hH(){},
p0(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b.gP(0)
if(!i)throw A.c(A.n("invalid volumetric source selection inputs",null))
s=A.ah(t.N)
r=A.e([],t.gg)
for(q=0;!1;++q){p=c[q]
p.D()
if(!s.i(0,p.gB()))throw A.c(A.n("duplicate volumetric source id: "+A.p(p.gB()),null))
o=p.geQ().es(0,b).length
i=p.geR()
n=A.mY(p.gex(),o,i)
i=p.gc3().gaL()
m=p.gc3().gaM()
l=p.gc3().gaN()
l=Math.max(A.dC(m),A.dC(l))
k=Math.max(A.dC(i),l)
B.a.i(r,new A.dh(p.geJ().G(0,k).G(0,n),p))}B.a.a8(r,new A.jh())
i=A.e([],t.r)
for(m=A.hF(r,0,A.bM(a,"count",t.S),t.eS),l=m.$ti,m=new A.ai(m,m.gp(0),l.h("ai<Q.E>")),l=l.h("Q.E");m.k();){j=m.d
i.push((j==null?l.a(j):j).b)}return i},
mY(a,b,c){var s,r,q,p,o,n
for(s=[new A.bm("distance",b),new A.bm("referenceDistance",c),new A.bm("cutoffDistance",a)],r=0;r<3;++r){q=s[r]
p=q.b
if(!isFinite(p))A.m(A.n(q.a+" must be finite: "+A.p(p),null))}if(b.aw(0,0)||c.cF(0,0)||a.cF(0,0))throw A.c(A.n("invalid inverse-square attenuation inputs",null))
if(b.bo(0,a))return 0
s=c.G(0,c)
q=c.G(0,c)
o=b.G(0,b)
n=s.cE(0,Math.max(A.dC(q),A.dC(o)))
o=b.cE(0,a)
A.dC(o)
return n.G(0,1-Math.pow(o,4)).c2(0,0,1).eW(0)},
jh:function jh(){},
oB(a){var s,r,q,p,o,n,m,l,k,j=A.e([],t.gk),i=A.aA(t.N,t.S)
for(s=a.length,r=t.G,q=0;q<a.length;a.length===s||(0,A.C)(a),++q){p=a[q]
o=p.gm().geE()
n=A.p(p.gm().gU().gW())+":"+A.p(p.gm().gad().gW())+":"+A.p(o)
m=i.n(0,n)
if(m==null){i.t(0,n,j.length)
B.a.i(j,new A.be(p,A.e([p],r)))}else{l=j.length
if(m>>>0!==m||m>=l)return A.h(j,m)
k=j[m].b
if(k.length>=16){i.t(0,n,l)
B.a.i(j,new A.be(p,A.e([p],r)))}else B.a.i(k,p)}}return j},
be:function be(a,b){this.a=a
this.b=b},
dY:function dY(a){this.a=a},
fI:function fI(){},
fJ:function fJ(a){this.a=a},
fG:function fG(a){this.a=a},
fH:function fH(a){this.a=a},
dZ:function dZ(a,b){this.a=a
this.b=b},
bS:function bS(a,b){this.a=a
this.b=b},
fP:function fP(a,b){this.a=a
this.b=b
this.c=0},
nd(){return new A.c7()},
fM:function fM(a){this.a=a
this.b=null},
c7:function c7(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
jA(){return!0},
D:function D(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
hl:function hl(){},
hm:function hm(){},
az:function az(a,b){this.a=a
this.b=b},
a5:function a5(a,b,c){this.a=a
this.b=b
this.c=c},
eq:function eq(a,b){this.a=a
this.b=b},
aV:function aV(a,b){this.a=a
this.b=b},
M:function M(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cW:function cW(a,b){this.a=a
this.b=b},
j:function j(a,b){this.a=a
this.b=b},
cn:function cn(a){this.b=a},
hp:function hp(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=_.d=0},
a_:function a_(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hr:function hr(){},
V:function V(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.r=f},
ht:function ht(a,b){this.a=a
this.b=b},
hy:function hy(){},
hx:function hx(){},
hw:function hw(){},
hv:function hv(a){this.a=a},
hu:function hu(a,b,c){this.a=a
this.b=b
this.c=c},
hs:function hs(a,b){this.a=a
this.b=b},
mI(a){return new A.cT(a,new A.aL(new A.hz(),A.e([],t.aO),A.e([],t.t),t.b0))},
cT:function cT(a,b){this.a=a
this.b=b},
hz:function hz(){},
li(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.nY(a,r,s,a.x.gl().a.b.a).b},
nY(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.iM(a),j=new A.iN(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.q(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.oD(b,h,B.I,i,s.ge3(),new A.ix(j),new A.iy(j),new A.iz(a),new A.iE(a),new A.iF(a),new A.iG(j),new A.iH(j),s.ge5(),new A.iI(a),s.ge9(),r.ge7(),k,s.geb(),s.ged(),new A.iJ(j,c),new A.iK(j),new A.iL(j),new A.iA(j),new A.iB(j),new A.iC(a),new A.iD(j),e,f,g,512)}else{p=new A.M(l,B.l,g,f,e,0)
o=new A.M(l,B.l,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.cI(h,p,o):null
k=A.e([new A.eP(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nout vec4 oColor;\nvoid main(){\n  vec3 n=normalize(vNormal);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+\n    vec3(ndotl)*uDirectLightScale,0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.q)
if(n!=null)k.push(n)
k.push(new A.cR(b,u.l,u.b,h,i,B.I))
q=new A.dY(k)}a.r.toString
m=q.dF(B.W,new A.hr(),!1,new A.f7())
k=m.a.b
if(k.length!==0)throw A.c(A.k("safe renderer graph is invalid: "+A.p(k)))
return new A.ih(q,m)},
nZ(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3=null,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.c(A.k("renderer graph is not initialized"))
s=A.at(b7.gcj(),t.Y)
for(r=0;r<b9.length;++r){q=b9[r]
b6.w.a.b.a4(q.gU()).geI().eX(q.ga2().ar())}p=b8.a
o=A.oG(A.md(p.c),s,b8.d)
for(n=s.length,m=0,l=0;l<s.length;s.length===n||(0,A.C)(s),++l){k=s[l].gm().gU()
j=b6.w.a
if(j.c.n(0,k.gW())==null)A.m(A.bU(B.M,k))
j.b.a4(k)
m=B.i.a7(m,b3)}for(s=o.a,n=s.length,i=0,l=0;l<s.length;s.length===n||(0,A.C)(s),++l){k=s[l].gm().gU()
j=b6.w.a
if(j.c.n(0,k.gW())==null)A.m(A.bU(B.M,k))
j.b.a4(k)
i=B.i.a7(i,b3)}n=t.N
k=A.aA(n,t.a8)
h=new A.fM(k)
h.dB("cull")
j=m-i
g=h.b
if(g==null)A.m(A.k("cull recorded outside an active frame"))
if(j<0)A.m(A.n("cull totals must be non-negative",b3))
f=k.n(0,g)
f.c+=j
f.e+=o.b.b
e=A.e([],t.c1)
d=A.e([],t.aM)
for(c=s.length,b=t.k,l=0;l<s.length;s.length===c||(0,A.C)(s),++l){a=s[l]
a.gm().gc7()
B.a.i(e,new A.W(new A.ae(B.cb,a.gm().gad(),a.gm().gU(),a.gB().a),a,b))}a0=new A.f1(A.oB(A.p2(e)),A.p1(d),p,b8.b,b8.c)
a1=new A.dU(b6.a,h)
for(s=b4.b,p=s.length,c=t.do,l=0;l<s.length;s.length===p||(0,A.C)(s),++l){a2=s[l]
b=a2.gm().a
if(b.length===0)A.m(A.aT(b,"passId",b3))
h.b=b
k.bi(b,A.lz())
a3=A.aA(n,c)
for(b=a2.gm().c,a4=b.length,a5=0;a5<b.length;b.length===a4||(0,A.C)(b),++a5){a6=b[a5].a
a7=b5.c
if(a7==null)A.m(A.k("GPU resource adapter is not initialized"))
a8=a6.f
a9=a6.a
b0=a8===0?a9:a9+"#"+a8
b1=a7.b.n(0,b0)
if(b1==null)A.m(A.k("resource is not in candidate: "+b0))
b2=new A.bQ(b1)
a3.t(0,a9+"#"+a8,b2)
a3.bi(a9,new A.iO(b2))}a2.I(new A.dM(a3,a1,new A.iP(b8,b6).$0(),a0))}return new A.i0(h,o,j)},
hA:function hA(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.w=f
_.x=!1},
i0:function i0(a,b,c){this.a=a
this.b=b
this.c=c},
iM:function iM(a){this.a=a},
iN:function iN(a,b){this.a=a
this.b=b},
iL:function iL(a){this.a=a},
iE:function iE(a){this.a=a},
iF:function iF(a){this.a=a},
iK:function iK(a){this.a=a},
iz:function iz(a){this.a=a},
iB:function iB(a){this.a=a},
iA:function iA(a){this.a=a},
iJ:function iJ(a,b){this.a=a
this.b=b},
ix:function ix(a){this.a=a},
iy:function iy(a){this.a=a},
iG:function iG(a){this.a=a},
iH:function iH(a){this.a=a},
iI:function iI(a){this.a=a},
iD:function iD(a){this.a=a},
iC:function iC(a){this.a=a},
iO:function iO(a){this.a=a},
iP:function iP(a,b){this.a=a
this.b=b},
ih:function ih(a,b){this.a=a
this.b=b},
f7:function f7(){},
f1:function f1(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
et:function et(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.ax=_.at=_.as=_.Q=_.y=_.x=_.w=_.r=null
_.a$=f
_.b$=g},
hB:function hB(){},
hC:function hC(){},
hD:function hD(){},
f6:function f6(a){this.b=a},
ib:function ib(){},
fb:function fb(){},
ev:function ev(a,b){this.a=a
this.b=b},
p2(a){var s,r,q=A.at(a,t.k)
B.a.a8(q,new A.jl())
s=A.K(q)
r=s.h("b_<1,b1>")
s=A.at(new A.b_(q,s.h("b1(1)").a(new A.jm()),r),r.h("Q.E"))
s.$flags=1
return s},
p1(a){var s,r,q=A.at(a,t.d)
B.a.a8(q,new A.jj())
s=A.K(q)
r=s.h("b_<1,b1>")
s=A.at(new A.b_(q,s.h("b1(1)").a(new A.jk()),r),r.h("Q.E"))
s.$flags=1
return s},
ae:function ae(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
W:function W(a,b,c){this.a=a
this.b=b
this.$ti=c},
jl:function jl(){},
jm:function jm(){},
jj:function jj(){},
jk:function jk(){},
oG(a,b,c){var s,r,q,p,o,n,m=A.e([],t.G)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.C)(b),++p){o=b[p];++r
o.gm().gf2().eo(0,c)
n=o.gen()
if(!n.gP(n))throw A.c(A.n("cullItems: non-finite world bounds for instance "+o.gB().j(0),null))
if(a.ei(o.gen())===B.ag){++q
continue}B.a.i(m,o)}return new A.fB(m,new A.fC(q))},
fC:function fC(a){this.b=a},
fB:function fB(a,b){this.a=a
this.b=b},
md(a){var s=a.a,r=new A.fT()
return new A.fS(A.e([r.$4(s[3]+s[0],s[7]+s[4],s[11]+s[8],s[15]+s[12]),r.$4(s[3]-s[0],s[7]-s[4],s[11]-s[8],s[15]-s[12]),r.$4(s[3]+s[1],s[7]+s[5],s[11]+s[9],s[15]+s[13]),r.$4(s[3]-s[1],s[7]-s[5],s[11]-s[9],s[15]-s[13]),r.$4(s[3]+s[2],s[7]+s[6],s[11]+s[10],s[15]+s[14]),r.$4(s[3]-s[2],s[7]-s[6],s[11]-s[10],s[15]-s[14])],t.dV))},
by:function by(a,b){this.a=a
this.b=b},
cu:function cu(a,b){this.a=a
this.b=b},
fS:function fS(a){this.a=a},
fT:function fT(){},
kq(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.bY(q)},
kp(a,b,c){var s=b.gbg(),r=c.b6(s).gbg(),q=s.b6(r),p=new Float32Array(16)
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
p[12]=-r.b7(a)
p[13]=-q.b7(a)
p[14]=s.b7(a)
p[15]=1
return new A.bY(p)},
bY:function bY(a){this.a=a},
ha:function ha(){},
au:function au(a,b,c){this.a=a
this.b=b
this.c=c},
eS:function eS(a,b){this.a=a
this.b=b},
cj:function cj(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
dK:function dK(a,b,c,d,e,f,g,h){var _=this
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
cr:function cr(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
e1:function e1(a,b,c,d,e,f,g){var _=this
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
cI:function cI(a,b,c){this.a=a
this.b=b
this.c=c},
f5:function f5(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bQ:function bQ(a){this.b=a},
dM:function dM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
a3(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.M(a.a,a.b,b,c,s,r)},
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
mu(a){var s
switch(a.a){case 0:s=0
break
case 1:s=1
break
case 2:s=2.5
break
case 3:s=3.5
break
default:s=null}return s},
cR:function cR(a,b,c,d,e,f){var _=this
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
en:function en(a,b,c,d,e,f){var _=this
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
kz(a){var s=A.kp(B.p,B.u,Math.abs(0)<0.99?B.cY:B.p)
return new A.bA(A.kq(1,1,B.i.c2(1,0.1,3),0.05).G(0,s))},
bA:function bA(a){this.a=a},
ew:function ew(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
oD(c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=null,b3=u.l,b4="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[5]=float[5](0.227027,0.1945946,0.1216216,0.054054,0.016216);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<5;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b5="bloomBlurH",b6="bloomBlurV",b7="dofBlurH",b8="dofBlurV",b9={},c0=c4.b
if(!c0.q(0,"shadows"))throw A.c(A.aT(c4,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=c0.q(0,"ssao")
r=c0.q(0,"bloom")
q=c0.q(0,"dof")
p=c0.q(0,"grade")
o=c0.q(0,"ps1")
n=c0.q(0,"vhs")
m=c0.q(0,"volumetric")
c0=(e9+1)/2|0
l=(e8+1)/2|0
k=A.a3(B.V,e9,e8,e7,b2)
j=A.a3(B.V.cp(),e9,e8,b2,b2)
i=e7>1
h=A.a3(B.cl,e9,e8,b2,i?2:1)
g=A.a3(B.ck,c0,l,b2,b2)
A.a3(B.ct,e9,e8,b2,b2)
f=A.a3(B.cq,e9,e8,b2,b2)
e=A.a3(B.cj,f0,f0,b2,b2)
d=A.a3(B.cm,c0,l,b2,b2)
c=A.a3(B.cn,c0,l,b2,b2)
b=A.a3(B.cr,c0,l,b2,b2)
a=A.a3(B.cs,c0,l,b2,b2)
a0=$.lI()
a1=i?1:0
a2=A.a3(a0,e9,e8,b2,a1+(m?1:0)+1)
a0=A.a3(B.cg,c0,l,b2,b2)
a1=A.a3(B.ch,c0,l,b2,b2)
a3=A.a3(B.ci,e9,e8,b2,b2)
a4=A.a3(B.co,e9,e8,b2,b2)
a5=A.a3(B.cu,e9,e8,b2,b2)
a6=A.a3(B.cp,e9,e8,b2,b2)
a7=i?new A.cI(c2,k,j):b2
b9.a=null
a8=A.kz(B.aX)
if(m){a9=i?j:k
b0=new A.eM(c1,b3,"#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\n\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform mat4 uViewProjection;\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform float uShaftIntensity;\nuniform float uFogDensity;\nuniform float uAnisotropy;\nuniform mat4 uView;\nuniform mat4 uInverseProjection;\nuniform vec3 uVolumetricAlbedo;\nuniform float uVolumetricHeightFalloff;\nuniform float uVolumetricDustDensity;\nuniform float uVolumetricJitter;\nuniform float uVolumetricIntensity;\nuniform float uVolumetricSampleCount;\nuniform float uVolumetricSourceCount;\n\nuniform vec3 uSourcePosition0;\nuniform vec3 uSourceColor0;\nuniform float uSourceIntensity0;\nuniform float uSourceReferenceDistance0;\nuniform float uSourceCutoffDistance0;\nuniform vec3 uSourcePosition1;\nuniform vec3 uSourceColor1;\nuniform float uSourceIntensity1;\nuniform float uSourceReferenceDistance1;\nuniform float uSourceCutoffDistance1;\nuniform vec3 uSourcePosition2;\nuniform vec3 uSourceColor2;\nuniform float uSourceIntensity2;\nuniform float uSourceReferenceDistance2;\nuniform float uSourceCutoffDistance2;\nuniform vec3 uSourcePosition3;\nuniform vec3 uSourceColor3;\nuniform float uSourceIntensity3;\nuniform float uSourceReferenceDistance3;\nuniform float uSourceCutoffDistance3;\n\nfloat linearDepth(float depth) {\n  float z = depth * 2.0 - 1.0;\n  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);\n}\n\nfloat phaseHenyeyGreenstein(float cosTheta, float anisotropy) {\n  float g = clamp(anisotropy, -0.85, 0.85);\n  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;\n  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));\n}\n\nvec3 sourceContribution(\n  vec3 position,\n  vec3 color,\n  float intensity,\n  float referenceDistance,\n  float cutoffDistance,\n  vec3 viewRay,\n  float rayLength\n) {\n  vec4 clip = uViewProjection * vec4(position, 1.0);\n  if (clip.w <= 0.0) return vec3(0.0);\n  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;\n  float sourceDistance = length(sourceView);\n  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);\n  vec3 sampleToSource = sourceView - viewRay * tClosest;\n  float distanceToSource = max(length(sampleToSource), 1e-3);\n  float cutoff = 1.0 - smoothstep(\n    cutoffDistance * 0.65, cutoffDistance, sourceDistance);\n  float inverseSquare = intensity * referenceDistance * referenceDistance /\n      max(distanceToSource * distanceToSource,\n          referenceDistance * referenceDistance);\n  // The incoming direction is source -> sample and the outgoing direction is\n  // sample -> camera. This is the same phase convention as the directional\n  // medium path, but now evaluated against the located source.\n  float phase = phaseHenyeyGreenstein(\n    dot(normalize(sampleToSource), viewRay), uAnisotropy);\n  // Located practicals and lightning must also acquire visible body in a\n  // dust-filled room. Use the same broad haze plus particulate density as the\n  // directional march; otherwise a clear-air fog toggle would accidentally\n  // erase dust-lit source rays while the directional shafts still showed it.\n  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);\n  float mediumWeight = 1.0 - exp(-max(\n    mediumDensity * min(rayLength, cutoffDistance), 0.0));\n  float pathWeight = clamp(\n    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);\n  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *\n    uVolumetricIntensity * 0.35;\n}\n\nvoid main() {\n  float depth = texture(uSceneDepth, vUv).r;\n  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);\n  viewPoint /= max(abs(viewPoint.w), 1e-5);\n  vec3 viewRay = normalize(viewPoint.xyz);\n  // linearDepth is camera-space Z; convert it to distance along the actual\n  // reconstructed ray so wide and tall projections integrate equally.\n  float cameraDepth = linearDepth(depth);\n  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);\n  float density = max(uFogDensity, 0.0);\n\n  // A fixed, bounded integral keeps the pass deterministic and makes its\n  // cost predictable on weak adapters. The depth buffer stops integration at\n  // the first opaque surface, so shafts do not leak through geometry.\n  const int maxSampleCount = 24;\n  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));\n  vec3 scatter = vec3(0.0);\n  float transmittance = 1.0;\n  float stepLength = rayLength / float(sampleCount);\n  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);\n  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);\n  for (int i = 0; i < maxSampleCount; i++) {\n    if (i >= sampleCount) break;\n    float distanceAlongRay = clamp(\n      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);\n    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));\n    // Dust is a separate, host-resolved particulate phase. It is denser near\n    // the occupied room volume than the broad atmospheric haze, so shafts gain\n    // visible body without turning the far horizon opaque. At zero density the\n    // extra term is exactly zero and the established fog path is unchanged.\n    float dustWeight = exp(-max(distanceAlongRay *\n      uVolumetricHeightFalloff * 0.45, 0.0));\n    float opticalDensity = density +\n      max(uVolumetricDustDensity, 0.0) * dustWeight;\n    float opticalDepth = opticalDensity * stepLength * heightWeight;\n    float sampleTransmittance = exp(-opticalDepth);\n    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);\n    scatter += transmittance * (uLightColor * uVolumetricAlbedo *\n      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;\n    transmittance *= sampleTransmittance;\n  }\n\n  if (uVolumetricSourceCount > 0.5) {\n    scatter += sourceContribution(\n      uSourcePosition0, uSourceColor0, uSourceIntensity0,\n      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 1.5) {\n    scatter += sourceContribution(\n      uSourcePosition1, uSourceColor1, uSourceIntensity1,\n      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 2.5) {\n    scatter += sourceContribution(\n      uSourcePosition2, uSourceColor2, uSourceIntensity2,\n      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);\n  }\n  if (uVolumetricSourceCount > 3.5) {\n    scatter += sourceContribution(\n      uSourcePosition3, uSourceColor3, uSourceIntensity3,\n      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);\n  }\n\n  // Fade the final sample at the far plane and keep the additive output\n  // bounded so a storm flash cannot blow out the entire frame.\n  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);\n  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);\n}\n","#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nlayout(location = 0) out vec4 oColor;\nuniform sampler2D uVolumetric;\nuniform float uVolumetricStrength;\n\nvoid main() {\n  vec3 light = texture(uVolumetric, vUv).rgb;\n  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);\n}\n",c2,e1,c8,g,f,a9,h,A.e([],t.p))}else b0=b2
g=t.q
b1=A.e([],g)
if(!m)h=i?j:k
if(r){B.a.V(b1,A.e([new A.cj(c1,b3,b4,c2,b5,b5,B.aL,!0,h,b,e0,c0,l),new A.cj(c1,b3,b4,c2,b6,b6,B.d7,!1,b,a,c6,c0,l),new A.dK(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",c2,c7,a,h,a2)],g))
h=a2}if(q){B.a.V(b1,A.e([new A.cr(c1,b3,b4,c2,b7,b7,B.aM,h,a0,e0,c0,l),new A.cr(c1,b3,b4,c2,b8,b8,B.d8,a0,a1,d1,c0,l),new A.dV(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// Circle-of-confusion is a simple linear ramp from the focus distance\n// outward (front and back treated the same \u2014 no separate near/far falloff\n// curve), clamped to [0,1] and scaled by uStrength so\n// PostProcessState.depthOfFieldStrength == 0 is a true no-op (coc == 0\n// everywhere, oColor == the sharp source exactly).\nvoid main(){\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n  float coc=clamp(abs(depth-uFocusDistance)/max(uFocusRange,0.0001),0.0,1.0)*uStrength;\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  vec3 blurred=texture(uBlurred,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,coc),1.0);\n}\n",c2,e0,d2,e1,c8,h,f,a1,a3)],g))
h=a3}if(p){B.a.i(b1,new A.e1(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",c2,d4,h,a4))
h=a4}if(o){B.a.i(b1,new A.en(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",c2,h,a5))
h=a5}if(n){B.a.i(b1,new A.eL(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',c2,e6,e5,h,a6))
h=a6}j=A.e([new A.dT(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d7,d6,c5,f)],g)
if(s)j.push(new A.ez(c1,b3,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=8;\nconst vec3 KERNEL[8]=vec3[8](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    // NDC [-1,1] -> UV [0,1] requires the constant 0.5, not vUv (the\n    // *current* fragment's own UV) \u2014 adding vUv here was a real bug: it\n    // conflated \"this sample's own absolute reprojected screen position\"\n    // with \"an offset relative to the current fragment,\" producing an\n    // error of (vUv-0.5) per axis that grows with distance from screen\n    // center. That's exactly what produced a huge, blobby, non-local dark\n    // region instead of contact occlusion \u2014 every sample tested a wildly\n    // wrong depth location except right at screen center, where the error\n    // happened to be near zero.\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    occlusion+=(occluderView.z>=samplePos.z+0.02?1.0:0.0)*rangeCheck;\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",c2,e1,c8,d))
if(s)j.push(new A.ey(c1,b3,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float centerDepth=linearDepth(texture(uSceneDepth,vUv).r);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleDepth=linearDepth(texture(uSceneDepth,sampleUv).r);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*4.0);\n      sum+=texture(uSsaoRaw,sampleUv).r*depthWeight;\n      weightSum+=depthWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',c2,e4,e1,c8,c0,l,d,c))
j.push(new A.ew(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d7,d6,c5,c9,b2,b2,new A.iT(b9),e))
j.push(new A.ex(c1,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform float uAmbientLightScale;\nuniform float uDirectLightScale;\nuniform vec3 uReflectionColor;\nuniform float uReflectionIntensity;\nuniform float uReflectionConfidence;\nuniform vec2 uShadowMapTexelSize;\nuniform float uShadowFilterRadius;\nuniform float uShadowBias;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uSpecularScale;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nuniform float uSurfaceSnowCoverage;\nuniform float uSurfaceDissolution;\nuniform float uThermalSourceCount;\nuniform vec3 uThermalSourcePosition0;\nuniform float uThermalSourceRadius0;\nuniform float uThermalSourceDissolution0;\nuniform vec3 uThermalSourcePosition1;\nuniform float uThermalSourceRadius1;\nuniform float uThermalSourceDissolution1;\nuniform vec3 uThermalSourcePosition2;\nuniform float uThermalSourceRadius2;\nuniform float uThermalSourceDissolution2;\nuniform vec3 uThermalSourcePosition3;\nuniform float uThermalSourceRadius3;\nuniform float uThermalSourceDissolution3;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return lightColor*lightIntensity*ndotl*coneFalloff*\n    distanceFalloff*enabled;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0);\n  float ndotl=max(dot(normal,lightDir),0.0);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlick(hdotv,f0);\n  float distribution=distributionGgx(ndoth,roughness);\n  float geometry=geometrySmith(ndotv,ndotl,roughness);\n  vec3 numerator=distribution*geometry*fresnel;\n  float denominator=max(4.0*ndotv*ndotl,0.001);\n  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog keeps the smooth distance ramp for authored horizon control, but\n// the participating-medium term is an analytic optical depth along the actual\n// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the\n// integral has a stable constant-height limit and therefore does not shimmer\n// when a surface is nearly level with the camera. Zero density remains an\n// exact no-op; the host can still use the distance ramp independently.\nfloat heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){\n  float segmentLength=length(rayEnd-rayStart);\n  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;\n  float falloff=max(uFogHeightFalloff,0.);\n  float h0=max(rayStart.y,0.);\n  float h1=max(rayEnd.y,0.);\n  float integral;\n  if(falloff<=0.||abs(h1-h0)<=0.0001){\n    integral=segmentLength*exp(-falloff*h0);\n  }else{\n    float denominator=falloff*(h1-h0);\n    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;\n  }\n  return max(uFogDensity*integral,0.);\n}\n\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);\n  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);\n  float mediumFactor=1.-exp(-opticalDepth);\n  return clamp(max(distFactor,mediumFactor),0.,1.);\n}\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);\n  // Fixed low-discrepancy offsets avoid the directional shimmer of a regular\n  // square lattice while remaining deterministic and free of per-frame noise.\n  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);\n  float sum=0.;\n  sum+=sampleShadow(projCoord+vec3(vec2(-.942,-.399)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.945,-.768)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.094,.886)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.344,.294)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.716,.642)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.688,-.089)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.287,-.885)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.052,.008)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.831,.486)*t,0.),bias);\n  return sum/9.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // \xa76.2's alpha-masked route. Deliberately the first thing after the\n  // fetch it depends on, and ahead of all the lighting below: a discarded\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  direct*=uDirectLightScale;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  float upward=clamp(n.y*0.5+0.5,0.0,1.0);\n  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao*mix(0.85,1.15,upward);\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Weather changes the material before direct and environment response.\n  // Thawing therefore affects the same specular lobe the viewer sees,\n  // instead of changing only diffuse color after the highlight is computed.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);\n  // A steady spherical conductive field decays approximately as 1/r. The\n  // host keeps the slow latent material memory in uSurfaceDissolution; this\n  // local term therefore models the spatial heat field without making warm\n  // surfaces snap back or disappear at an arbitrary exponential radius.\n  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/\n      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));\n  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/\n      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));\n  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/\n      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));\n  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,\n    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/\n      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));\n  thermalDissolution=clamp(thermalDissolution,0.0,1.0);\n  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*\n    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);\n  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);\n  float dissolution=thermalDissolution;\n  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);\n  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  // A continuous water film forms a second dielectric lobe. It smooths the\n  // authored surface only as coverage rises, so damp cloth stays diffuse\n  // while puddled stone gains a tight grazing reflection.\n  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);\n  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  specular*=uDirectLightScale*uSpecularScale;\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*(1.0-0.25*rough));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);\n  float coat=coatStrength*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*\n    uDirectLightScale*uSpecularScale;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  // Environment fallback reflections are deliberately bounded and weighted\n  // by wetness/grazing angle. A real probe/history hit can raise confidence;\n  // the current host fallback remains visible but never masquerades as SSR.\n  float reflectionNdotV=max(dot(n,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metal);\n  vec3 envFresnel=f0+(max(vec3(1.0-specRough),f0)-f0)*pow(clamp(1.0-reflectionNdotV,0.0,1.0),5.0);\n  float envGloss=(1.0-specRough)*(1.0-specRough);\n  float reflectionSurface=clamp(metal*0.85+(1.0-metal)*(wetness+0.18*dissolution+envGloss*0.25),0.0,1.0);\n  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);\n  float reflectionWeight=clamp(\n    uReflectionIntensity*reflectionSurface*\n      (1.0-0.72*rough)*reflectionConfidence,\n    0.0,1.0);\n  lit+=uReflectionColor*envFresnel*reflectionWeight*ao;\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  oGlow=vec4(emissive,1.);\n}\n",d7,d6,c5,d8,d9,d3,d5,e2,new A.iU(b9,a8),c9,d0,e3,s,e9,e8,f0,f0,e,c,k))
if(a7!=null)j.push(a7)
if(b0!=null)j.push(b0)
B.a.V(j,b1)
j.push(new A.cR(c1,b3,u.b,c2,h,c3))
return new A.dY(j)},
iT:function iT(a){this.a=a},
iU:function iU(a,b){this.a=a
this.b=b},
ex:function ex(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
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
ez:function ez(a,b,c,d,e,f,g){var _=this
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
ff:function ff(a,b,c,d,e,f,g,h){var _=this
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
cV:function cV(a,b,c,d){var _=this
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
eu(a,b){return new A.cZ(a,b)},
fV:function fV(a,b){this.a=a
this.b=b},
e_:function e_(a,b){this.a=a
this.b=b},
h_:function h_(a,b){this.a=a
this.b=b},
h0:function h0(a,b){this.a=a
this.b=b},
fU:function fU(a,b,c){this.a=a
this.b=b
this.c=c},
fZ:function fZ(){},
bT:function bT(a,b){this.a=a
this.b=b},
cv:function cv(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
e0:function e0(a,b){this.a=a
this.b=b},
c2:function c2(a,b){this.a=a
this.b=b},
cZ:function cZ(a,b){this.a=a
this.b=b},
b5:function b5(a,b){this.a=a
this.b=b},
d:function d(a,b){this.a=a
this.b=b},
cm:function cm(a,b){this.a=a
this.b=b},
dU:function dU(a,b){this.a=a
this.b=b},
ek:function ek(a,b){this.a=a
this.b=b},
fW:function fW(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
fX:function fX(){},
fY:function fY(){},
aL:function aL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.e=0
_.$ti=d},
kh(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.dW(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
fu:function fu(a,b){this.a=a
this.b=b},
dJ:function dJ(a,b){this.a=a
this.b=b},
fA:function fA(a,b){this.a=a
this.b=b},
fE:function fE(a,b){this.a=a
this.b=b},
dW:function dW(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
hU:function hU(){this.a=null},
mZ(a){var s=new A.eN(a,B.f,new A.hU(),A.n8(a))
s.cL(a)
return s},
n8(a){var s,r,q=t.du.a(a.getSupportedExtensions())
if(q==null)return A.ah(t.N)
s=A.ah(t.N)
r=J.Y(t.dy.b(q)?q:new A.cl(q,A.K(q).h("cl<1,l>")))
while(r.k())s.i(0,r.gl())
return s},
an(a,b){var s,r
if(a.b!==B.f)A.m(A.k(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.a(s.drawingBufferWidth),A.a(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
n3(a,b){var s
if(a.b!==B.f)A.m(A.k(u.k))
switch(b){case 1:a.a.drawBuffers(A.e([A.a(v.G.WebGL2RenderingContext.COLOR_ATTACHMENT0)],t.n))
break
case 2:s=v.G
a.a.drawBuffers(A.e([A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(s.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
break
default:throw A.c(A.n("WebGl2Device.setColorAttachmentCount: count must be 1 or 2, got "+b,null))}},
n2(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.a(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
n1(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
kK(a,b){var s
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
n_(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
a7(a,b){var s,r,q,p
if(a.b!==B.f)A.m(A.k(u.k))
s=a.f
r=s.dL(b)
if(r.a===0)return
if(r.q(0,B.X)){q=v.G
p=a.a
if(b.a)p.enable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.q(0,B.Y))a.a.depthFunc(A.n2(a,b.b))
if(r.q(0,B.Z))a.a.depthMask(b.c)
if(r.q(0,B.a2)){q=v.G
p=a.a
if(b.w)p.enable(A.a(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.a(q.WebGL2RenderingContext.CULL_FACE))}if(r.q(0,B.a3))a.a.cullFace(A.n1(a,b.x))
if(r.q(0,B.aH)){q=v.G.WebGL2RenderingContext
q=A.a(q.CCW)
a.a.frontFace(q)}if(r.q(0,B.a_)){q=v.G
p=a.a
if(b.d)p.enable(A.a(q.WebGL2RenderingContext.BLEND))
else p.disable(A.a(q.WebGL2RenderingContext.BLEND))}if(r.q(0,B.a0))a.a.blendFunc(A.kK(a,b.e),A.kK(a,b.f))
if(r.q(0,B.a1))a.a.blendEquation(A.n_(a,b.r))
if(r.q(0,B.aF))a.a.colorMask(!0,!0,!0,!0)
if(r.q(0,B.aG)){q=v.G.WebGL2RenderingContext
a.a.disable(A.a(q.SCISSOR_TEST))}s.a=b},
n0(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.a(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.a(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.a(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
bD(a,b,c,d,e,f){var s
if(a.b!==B.f)A.m(A.k(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.n0(a,b))},
aN(a,b){var s
if(a.b!==B.f)A.m(A.k(u.k))
s=A.a1(b.a)
a.a.useProgram(s)
a.e=s},
b(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.f)A.m(A.k(u.k))
s=a.e
if(s==null)throw A.c(A.k("WebGl2Device.setUniform called with no bound program"))
r=a.a
q=A.a4(r.getUniformLocation(s,b))
if(q==null)return
switch(c.a.a){case 0:r.uniform1f(q,A.it(c.b))
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
ao(a,b){if(a.b!==B.f)A.m(A.k(u.k))
a.a.bindVertexArray(A.a1(b.a))},
S(a,b,c){var s,r,q,p,o,n
if(a.b!==B.f)A.m(A.k(u.k))
s=c.a
r=a.a
q=v.G
r.activeTexture(A.a(q.WebGL2RenderingContext.TEXTURE0)+b)
if(s instanceof A.dv){p=s.d>1?A.a(q.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(q.WebGL2RenderingContext.TEXTURE_2D)
r.bindTexture(p,s.a)
return}if(s instanceof A.du){o=s.b
if(o!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),o)
return}n=s.e
if(n!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),n)
return}throw A.c(A.k("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.c(A.k("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
n4(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
n5(a,b){var s,r,q,p
if(a.b!==B.f)A.m(A.k(u.k))
s=a.a
r=A.a4(s.createBuffer())
if(r==null)throw A.c(A.k("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.b6?A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.a(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.n4(a,b.b))
return new A.b7(r)},
kL(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
kM(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
kN(a,b){var s,r,q,p,o,n,m,l,k
if(a.b!==B.f)A.m(A.k(u.k))
s=a.a
r=A.a4(s.createTexture())
if(r==null)throw A.c(A.k("WebGl2Device: gl.createTexture() returned null"))
q=v.G
p=q.WebGL2RenderingContext
o=A.a(p.TEXTURE_2D)
s.bindTexture(o,r)
p=q.WebGL2RenderingContext
A.a8(s,"texStorage2D",[o,1,A.a(p.RGBA8),1,1],t.H)
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.kL(a,B.ai))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.kL(a,B.ai))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_S),A.kM(a,B.aj))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_T),A.kM(a,B.aj))
n=a.r.q(0,"EXT_texture_filter_anisotropic")
m=n?a.bJ(34047):1
if(!isFinite(1))A.m(A.aT(1,"requested","anisotropy must be finite and in [1, 16]"))
if(n&&isFinite(m)&&m>=1)l=m>16?16:m
else l=1
k=1<l?1:l
if(k>1)s.texParameterf(o,34046,k)
return new A.b7(new A.dv(r,1,1,1,!1))},
kO(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.f)A.m(A.k(u.k))
s=t.R.a(b.a)
r=s.d
if(c>=r)throw A.c(A.n("WebGl2Device.uploadTextureLayer: layer "+c+" out of range for "+r+"-layer texture",null))
q=s.b
p=s.c
o=q*p*4
n=d.length
if(n!==o)throw A.c(A.n("WebGl2Device.uploadTextureLayer: expected "+o+" RGBA8 bytes for "+q+"x"+p+", got "+n,null))
r=r>1
n=v.G
m=r?A.a(n.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(n.WebGL2RenderingContext.TEXTURE_2D)
l=a.a
l.bindTexture(m,s.a)
k=t.H
if(r)A.a8(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.a8(l,"texSubImage2D",[m,0,0,0,q,p,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
n6(a,b){if(a.b!==B.f)A.m(A.k(u.k))
t.R.a(b.a)
return},
eO(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
kQ(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.f)A.m(A.k(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.c(A.n("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.a4(r.createFramebuffer())
if(q==null)throw A.c(A.k("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.J
if(n&&!a1.e)throw A.c(A.n("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.ah||o===B.b9
l=d
k=d
j=d
i=d
if(n){r.drawBuffers(A.e([A.a(p.WebGL2RenderingContext.NONE)],t.n))
r.readBuffer(A.a(p.WebGL2RenderingContext.NONE))}else{o=a1.c
h=t.H
g=a1.b
if(o>1){k=A.a4(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.a4(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.e([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.a4(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.a8(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.a8(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.a4(r.createTexture())
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
if(o>1){f=A.a4(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.a8(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.a4(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.a8(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
A.a8(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.a(r.checkFramebufferStatus(A.a(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.a(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.jD(a0,q,l,k,f,e,j,i)
throw A.c(A.k("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.b7(new A.du(q,l,k,f,e,j,i,s,a1.b,a1.c))},
jD(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
av(a){var s
if(a.b!==B.f)A.m(A.k(u.k))
s=A.a4(a.a.createVertexArray())
if(s==null)throw A.c(A.k("WebGl2Device: gl.createVertexArray() returned null"))
return new A.b7(s)},
kP(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.a4(p.createShader(b))
if(o==null)throw A.c(A.eu(b===A.lA(A.lk(A.lF(),r),q,t.S)?B.aB:B.aC,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.ba(A.ce(p.getShaderParameter(o,A.a(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bK(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.c(A.eu(b===A.lA(A.lk(A.lF(),r),q,t.S)?B.aB:B.aC,s))}return o},
n7(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.f)A.m(A.k(u.k))
q=v.G
s=A.kP(a,A.a(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.kP(a,A.a(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.a4(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.c(B.cA)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.ba(A.ce(o.getProgramParameter(n,A.a(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bK(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.eu(B.aD,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.C)(c),++l){k=c[l]
if(A.a(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.eu(B.aE,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.a4(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.c(A.eu(B.aE,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.b7(n)},
b7:function b7(a){this.a=a},
dv:function dv(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
du:function du(a,b,c,d,e,f,g,h,i,j){var _=this
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
hR:function hR(a){this.a=a},
hS:function hS(a){this.a=a},
is:function is(){},
fn:function fn(){},
hQ:function hQ(a){this.a=a},
hT:function hT(){},
j4(){return A.oW()},
oW(){var s=0,r=A.lp(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$j4=A.lw(function(a,b){if(a===1)return A.le(b,r)
for(;;)switch(s){case 0:f={}
e=v.G
d=A.a4(A.a1(e.document).querySelector("#minimal-canvas"))
if(!t.m.b(d)){s=1
break}p=B.aY.dJ(d)
o=p==null?null:new A.et(p.a,new A.fy(new A.fz(),new A.er()),new A.fP(A.e([],t.c4),B.b0),A.e([],t.cR),B.T,A.e([],t.cL),null)
if(o==null){d.setAttribute("data-renderer-state","renderer-unavailable")
d.setAttribute("data-renderer-backend","pixeldart")
d.setAttribute("data-renderer-fallback","false")
d.setAttribute("data-renderer-failure-reason","webgl2 unavailable")
s=1
break}n=A.mW().gct().n(0,"profile")
if(n==null)n="safe"
A:{if("standard"===n){m=B.ay
break A}if("high"===n){m=B.az
break A}m=B.S
break A}l=A.a(d.clientWidth)>0?A.a(d.clientWidth):A.a(d.width)
k=A.a(d.clientHeight)>0?A.a(d.clientHeight):A.a(d.height)
j=f.a=A.kC(k,l,A.iu(A.a1(e.window).devicePixelRatio),2,!0)
d.width=j.c
d.height=j.d
s=3
return A.ld(A.iS(new A.j6(),A.oH(m),o,j),$async$j4)
case 3:i=b
o.aC()
h=A.mI(o.w.a.b)
B.a.i(o.d,h)
g=new A.fQ()
m=new A.j5()
l=new A.j9(f,d,o,n,i,g)
o.c1(h,g.co(m.$1(j),B.a8,B.ab,0))
o.c8()
d.setAttribute("data-renderer-first-frame","true")
l.$0()
f.b=!1
k=new A.ja(f,d,o,g)
A.a1(e.window).addEventListener("resize",A.dz(new A.j7(k)))
d.addEventListener("webglcontextrestored",A.dz(new A.j8(f,g)))
A.a(A.a1(e.window).requestAnimationFrame(A.dz(new A.jb(f,k,o,h,g,m,d,l))))
case 1:return A.lf(q,r)}})
return A.lg($async$j4,r)},
j6:function j6(){},
j5:function j5(){},
j9:function j9(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ja:function ja(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
j7:function j7(a){this.a=a},
j8:function j8(a,b){this.a=a
this.b=b},
jb:function jb(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
lG(a){return v.mangledGlobalNames[a]},
p4(a){throw A.P(A.kl(a),new Error())},
aR(){throw A.P(A.ml(""),new Error())},
jn(){throw A.P(A.kl(""),new Error())},
ji(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.c(A.aT(b.gdT(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].gm().ga2().ar()
o=q*16
n=o+16
B.P.bq(s,o,n,p.ga6())
if(l)B.P.bq(r,o,n,p.cq().ga6())}m=a.a
A.b(m,"uInstanceModels",new A.d(B.aI,s))
if(l)A.b(m,"uInstanceNormalMatrices",new A.d(B.aI,r))
A.b(m,"uUseInstances",B.aJ)}},B={}
var w=[A,J,B]
var $={}
A.ju.prototype={}
J.e3.prototype={
T(a,b){return a===b},
gC(a){return A.el(a)},
j(a){return"Instance of '"+A.em(a)+"'"},
gE(a){return A.aQ(A.jP(this))}}
J.e5.prototype={
j(a){return String(a)},
gC(a){return a?519018:218159},
gE(a){return A.aQ(t.y)},
$iB:1,
$iz:1}
J.cy.prototype={
T(a,b){return null==b},
j(a){return"null"},
gC(a){return 0},
$iB:1}
J.cA.prototype={$iF:1}
J.bh.prototype={
gC(a){return 0},
gE(a){return B.cM},
j(a){return String(a)}}
J.ej.prototype={}
J.bB.prototype={}
J.bg.prototype={
j(a){var s=a[$.lJ()]
if(s==null)s=a[$.k1()]
if(s==null)return this.cK(a)
return"JavaScript function for "+J.aS(s)},
$ibt:1}
J.cz.prototype={
gC(a){return 0},
j(a){return String(a)}}
J.cB.prototype={
gC(a){return 0},
j(a){return String(a)}}
J.u.prototype={
i(a,b){A.K(a).c.a(b)
a.$flags&1&&A.aG(a,29)
a.push(b)},
V(a,b){var s
A.K(a).h("i<1>").a(b)
a.$flags&1&&A.aG(a,"addAll",2)
if(Array.isArray(b)){this.cP(a,b)
return}for(s=J.Y(b);s.k();)a.push(s.gl())},
cP(a,b){var s,r
t.E.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.c(A.as(a))
for(r=0;r<s;++r)a.push(b[r])},
Y(a){a.$flags&1&&A.aG(a,"clear","clear")
a.length=0},
aa(a,b){var s,r=A.cG(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.t(r,s,A.p(a[s]))
return r.join(b)},
am(a,b,c,d){var s,r,q
d.a(b)
A.K(a).F(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.c(A.as(a))}return r},
O(a,b){if(!(b>=0&&b<a.length))return A.h(a,b)
return a[b]},
cJ(a,b){var s
if(b<0||b>a.length)throw A.c(A.al(b,0,a.length,"start",null))
s=a.length
if(b===s)return A.e([],A.K(a))
return A.e(a.slice(b,s),A.K(a))},
gck(a){var s=a.length
if(s>0)return a[s-1]
throw A.c(A.jr())},
gbr(a){var s=a.length
if(s===1){if(0>=s)return A.h(a,0)
return a[0]}if(s===0)throw A.c(A.jr())
throw A.c(A.mi())},
a8(a,b){var s,r,q,p,o,n=A.K(a)
n.h("f(1,1)?").a(b)
a.$flags&2&&A.aG(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.o8()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.eq()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.cd(b,2))
if(p>0)this.dj(a,p)},
cI(a){return this.a8(a,null)},
dj(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
aG(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.h(a,s)
if(J.ba(a[s],b))return s}return-1},
q(a,b){var s
for(s=0;s<a.length;++s)if(J.ba(a[s],b))return!0
return!1},
j(a){return A.js(a,"[","]")},
gv(a){return new J.ci(a,a.length,A.K(a).h("ci<1>"))},
gC(a){return A.el(a)},
gp(a){return a.length},
n(a,b){if(!(b>=0&&b<a.length))throw A.c(A.iX(a,b))
return a[b]},
t(a,b,c){A.K(a).c.a(c)
a.$flags&2&&A.aG(a)
if(!(b>=0&&b<a.length))throw A.c(A.iX(a,b))
a[b]=c},
bc(a,b){var s
A.K(a).h("z(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gE(a){return A.aQ(A.K(a))},
$iq:1,
$ii:1,
$iv:1}
J.e4.prototype={
em(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.em(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.h3.prototype={}
J.ci.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.C(q)
throw A.c(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iI:1}
J.bV.prototype={
N(a,b){var s
A.iu(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaJ(b)
if(this.gaJ(a)===s)return 0
if(this.gaJ(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaJ(a){return a===0?1/a<0:a<0},
ej(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.c(A.aM(""+a+".toInt()"))},
cw(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.c(A.aM(""+a+".round()"))},
c2(a,b,c){if(this.N(b,c)>0)throw A.c(A.jU(b))
if(this.N(a,b)<0)return b
if(this.N(a,c)>0)return c
return a},
el(a,b){var s
if(b>20)throw A.c(A.al(b,0,20,"fractionDigits",null))
s=a.toExponential(b)
if(a===0&&this.gaJ(a))return"-"+s
return s},
j(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gC(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
a7(a,b){return a+b},
az(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
bU(a,b){return(a|0)===a?a/b|0:this.dq(a,b)},
dq(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.c(A.aM("Result of truncating division is "+A.p(s)+": "+A.p(a)+" ~/ "+b))},
b3(a,b){var s
if(a>0)s=this.bT(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
dm(a,b){if(0>b)throw A.c(A.jU(b))
return this.bT(a,b)},
bT(a,b){return b>31?0:a>>>b},
aw(a,b){return a<b},
gE(a){return A.aQ(t.o)},
$iad:1,
$io:1,
$ia9:1}
J.cx.prototype={
gE(a){return A.aQ(t.S)},
$iB:1,
$if:1}
J.e6.prototype={
gE(a){return A.aQ(t.i)},
$iB:1}
J.bf.prototype={
af(a,b,c,d){var s=A.ep(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
J(a,b,c){var s
if(c<0||c>a.length)throw A.c(A.al(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
H(a,b){return this.J(a,b,0)},
u(a,b,c){return a.substring(b,A.ep(b,c,a.length))},
aA(a,b){return this.u(a,b,null)},
G(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.c(B.aW)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
aH(a,b,c){var s
if(c<0||c>a.length)throw A.c(A.al(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
aG(a,b){return this.aH(a,b,0)},
q(a,b){return A.p3(a,b,0)},
N(a,b){var s
A.aP(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
j(a){return a},
gC(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gE(a){return A.aQ(t.N)},
gp(a){return a.length},
$iB:1,
$iad:1,
$iks:1,
$il:1}
A.c5.prototype={
gv(a){return new A.ck(J.Y(this.gaF()),A.t(this).h("ck<1,2>"))},
gp(a){return J.bb(this.gaF())},
O(a,b){return A.t(this).y[1].a(J.jp(this.gaF(),b))},
j(a){return J.aS(this.gaF())}}
A.ck.prototype={
k(){return this.a.k()},
gl(){return this.$ti.y[1].a(this.a.gl())},
$iI:1}
A.d6.prototype={
n(a,b){return this.$ti.y[1].a(J.jo(this.a,b))},
t(a,b,c){var s=this.$ti
J.dE(this.a,b,s.c.a(s.y[1].a(c)))},
$iq:1,
$iv:1}
A.cl.prototype={
gaF(){return this.a}}
A.cC.prototype={
j(a){return"LateInitializationError: "+this.a}}
A.dP.prototype={
gp(a){return this.a.length},
n(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.h(s,b)
return s.charCodeAt(b)}}
A.hE.prototype={}
A.q.prototype={}
A.Q.prototype={
gv(a){var s=this
return new A.ai(s,s.gp(s),A.t(s).h("ai<Q.E>"))},
ag(a){var s,r=this,q=A.jw(A.t(r).h("Q.E"))
for(s=0;s<r.gp(r);++s)q.i(0,r.O(0,s))
return q}}
A.d0.prototype={
gda(){var s=J.bb(this.a),r=this.c
if(r==null||r>s)return s
return r},
gdn(){var s=J.bb(this.a),r=this.b
if(r>s)return s
return r},
gp(a){var s,r=J.bb(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
O(a,b){var s=this,r=s.gdn()+b
if(b<0||r>=s.gda())throw A.c(A.h2(b,s.gp(0),s,"index"))
return J.jp(s.a,r)},
cA(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.cf(n),l=m.gp(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.kj(0,n):J.ki(0,n)}r=A.cG(s,m.O(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.a.t(r,q,m.O(n,o+q))
if(m.gp(n)<l)throw A.c(A.as(p))}return r},
ek(a){return this.cA(0,!0)}}
A.ai.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.cf(q),o=p.gp(q)
if(r.b!==o)throw A.c(A.as(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.O(q,s);++r.c
return!0},
$iI:1}
A.aB.prototype={
gv(a){var s=this.a
return new A.cH(s.gv(s),this.b,A.t(this).h("cH<1,2>"))},
gp(a){var s=this.a
return s.gp(s)},
O(a,b){var s=this.a
return this.b.$1(s.O(s,b))}}
A.cs.prototype={$iq:1}
A.cH.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gl())
return!0}s.a=null
return!1},
gl(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iI:1}
A.b_.prototype={
gp(a){return J.bb(this.a)},
O(a,b){return this.b.$1(J.jp(this.a,b))}}
A.a0.prototype={
gv(a){return new A.G(J.Y(this.a),this.b,this.$ti.h("G<1>"))}}
A.G.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gl()))return!0
return!1},
gl(){return this.a.gl()},
$iI:1}
A.aa.prototype={}
A.bC.prototype={
t(a,b,c){A.t(this).h("bC.E").a(c)
throw A.c(A.aM("Cannot modify an unmodifiable list"))}}
A.c4.prototype={}
A.cX.prototype={
gp(a){return J.bb(this.a)},
O(a,b){var s=this.a,r=J.cf(s)
return r.O(s,r.gp(s)-1-b)}}
A.dx.prototype={}
A.bm.prototype={$r:"+(1,2)",$s:1}
A.dg.prototype={$r:"+influence,light(1,2)",$s:2}
A.dh.prototype={$r:"+influence,source(1,2)",$s:3}
A.cp.prototype={}
A.co.prototype={
j(a){return A.jy(this)},
t(a,b,c){var s=A.t(this)
s.c.a(b)
s.y[1].a(c)
A.m6()},
ga1(){return new A.aO(this.dM(),A.t(this).h("aO<R<1,2>>"))},
dM(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$ga1(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga_(),o=o.gv(o),n=A.t(s),m=n.y[1],n=n.h("R<1,2>")
case 2:if(!o.k()){r=3
break}l=o.gl()
k=s.n(0,l)
r=4
return a.b=new A.R(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iZ:1}
A.H.prototype={
gp(a){return this.b.length},
gbI(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
al(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
n(a,b){if(!this.al(b))return null
return this.b[this.a[b]]},
an(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbI()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga_(){return new A.bG(this.gbI(),this.$ti.h("bG<1>"))},
gah(){return new A.bG(this.b,this.$ti.h("bG<2>"))}}
A.bG.prototype={
gp(a){return this.a.length},
gv(a){var s=this.a
return new A.bH(s,s.length,this.$ti.h("bH<1>"))}}
A.bH.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iI:1}
A.cq.prototype={
i(a,b){A.t(this).c.a(b)
A.m7()}}
A.aI.prototype={
gp(a){return this.b},
gci(a){return this.b!==0},
gv(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.bH(s,s.length,r.$ti.h("bH<1>"))},
q(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
ag(a){return A.jx(this,this.$ti.c)}}
A.cY.prototype={}
A.hK.prototype={
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
A.cP.prototype={
j(a){return"Null check operator used on a null value"}}
A.e7.prototype={
j(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.eG.prototype={
j(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hh.prototype={
j(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.ct.prototype={}
A.dj.prototype={
j(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibj:1}
A.bd.prototype={
j(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.lH(r==null?"unknown":r)+"'"},
gE(a){var s=A.jW(this)
return A.aQ(s==null?A.bp(this):s)},
$ibt:1,
gep(){return this},
$C:"$1",
$R:1,
$D:null}
A.dN.prototype={$C:"$0",$R:0}
A.dO.prototype={$C:"$2",$R:2}
A.eC.prototype={}
A.eA.prototype={
j(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.lH(s)+"'"}}
A.bP.prototype={
T(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bP))return!1
return this.$_target===b.$_target&&this.a===b.a},
gC(a){return(A.jd(this.a)^A.el(this.$_target))>>>0},
j(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.em(this.a)+"'")}}
A.es.prototype={
j(a){return"RuntimeError: "+this.a}}
A.aW.prototype={
gp(a){return this.a},
ga_(){return new A.bw(this,A.t(this).h("bw<1>"))},
gah(){return new A.aZ(this,A.t(this).h("aZ<2>"))},
ga1(){return new A.aX(this,A.t(this).h("aX<1,2>"))},
al(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dU(a)},
dU(a){var s=this.d
if(s==null)return!1
return this.aI(this.bF(s,a),a)>=0},
n(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dV(b)},
dV(a){var s,r,q=this.d
if(q==null)return null
s=this.bF(q,a)
r=this.aI(s,a)
if(r<0)return null
return s[r].b},
t(a,b,c){var s,r,q=this,p=A.t(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bu(s==null?q.b=q.b1():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bu(r==null?q.c=q.b1():r,b,c)}else q.dX(b,c)},
dX(a,b){var s,r,q,p,o=this,n=A.t(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.b1()
r=o.bd(a)
q=s[r]
if(q==null)s[r]=[o.b2(a,b)]
else{p=o.aI(q,a)
if(p>=0)q[p].b=b
else q.push(o.b2(a,b))}},
bi(a,b){var s,r,q=this,p=A.t(q)
p.c.a(a)
p.h("2()").a(b)
if(q.al(a)){s=q.n(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.t(0,a,r)
return r},
aK(a,b){if((b&0x3fffffff)===b)return this.cN(this.c,b)
else return this.dW(b)},
dW(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.bd(a)
r=n[s]
q=o.aI(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.bs(p)
if(r.length===0)delete n[s]
return p.b},
Y(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.b0()}},
an(a,b){var s,r,q=this
A.t(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.c(A.as(q))
s=s.c}},
bu(a,b,c){var s,r=A.t(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.b2(b,c)
else s.b=c},
cN(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.bs(s)
delete a[b]
return s.b},
b0(){this.r=this.r+1&1073741823},
b2(a,b){var s=this,r=A.t(s),q=new A.h4(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.b0()
return q},
bs(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.b0()},
bd(a){return J.L(a)&1073741823},
bF(a,b){return a[this.bd(b)]},
aI(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ba(a[r].a,b))return r
return-1},
j(a){return A.jy(this)},
b1(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ikm:1}
A.h4.prototype={}
A.bw.prototype={
gp(a){return this.a.a},
gv(a){var s=this.a
return new A.cE(s,s.r,s.e,this.$ti.h("cE<1>"))}}
A.cE.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.as(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iI:1}
A.aZ.prototype={
gp(a){return this.a.a},
gv(a){var s=this.a
return new A.aY(s,s.r,s.e,this.$ti.h("aY<1>"))}}
A.aY.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.as(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iI:1}
A.aX.prototype={
gp(a){return this.a.a},
gv(a){var s=this.a
return new A.cD(s,s.r,s.e,this.$ti.h("cD<1,2>"))}}
A.cD.prototype={
gl(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.as(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.R(s.a,s.b,r.$ti.h("R<1,2>"))
r.c=s.c
return!0}},
$iI:1}
A.j0.prototype={
$1(a){return this.a(a)},
$S:22}
A.j1.prototype={
$2(a,b){return this.a(a,b)},
$S:13}
A.j2.prototype={
$1(a){return this.a(A.aP(a))},
$S:57}
A.b6.prototype={
gE(a){return A.aQ(this.bH())},
bH(){return A.oI(this.$r,this.bG())},
j(a){return this.bY(!1)},
bY(a){var s,r,q,p,o,n=this.dc(),m=this.bG(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.h(m,q)
o=m[q]
l=a?l+A.kv(o):l+A.p(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
dc(){var s,r=this.$s
while($.ie.length<=r)B.a.i($.ie,null)
s=$.ie[r]
if(s==null){s=this.d0()
B.a.t($.ie,r,s)}return s},
d0(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.jt(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.t(j,q,r[s])}}return A.h7(j,k)}}
A.bl.prototype={
bG(){return[this.a,this.b]},
T(a,b){if(b==null)return!1
return b instanceof A.bl&&this.$s===b.$s&&J.ba(this.a,b.a)&&J.ba(this.b,b.b)},
gC(a){return A.cQ(this.$s,this.a,this.b,B.j,B.j,B.j)}}
A.bZ.prototype={
gE(a){return B.cF},
$iB:1}
A.cM.prototype={
df(a,b,c,d){var s=A.al(b,0,c,d,null)
throw A.c(s)},
bw(a,b,c,d){if(b>>>0!==b||b>c)this.df(a,b,c,d)}}
A.e9.prototype={
gE(a){return B.cG},
$iB:1}
A.a2.prototype={
gp(a){return a.length},
bP(a,b,c,d,e){var s,r=a.length
this.bw(a,b,r,"start")
this.bw(a,c,r,"end")
if(b>c)throw A.c(A.al(b,0,c,null,null))
s=c-b
if(e<0)throw A.c(A.n(e,null))
if(16-e<s)throw A.c(A.k("Not enough elements"))
if(e!==0||16!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iag:1}
A.cK.prototype={
n(a,b){A.b8(b,a,a.length)
return a[b]},
t(a,b,c){A.it(c)
a.$flags&2&&A.aG(a)
A.b8(b,a,a.length)
a[b]=c},
bq(a,b,c,d){t.bM.a(d)
a.$flags&2&&A.aG(a,5)
this.bP(a,b,c,d,0)
return},
$iq:1,
$ii:1,
$iv:1}
A.cL.prototype={
t(a,b,c){A.a(c)
a.$flags&2&&A.aG(a)
A.b8(b,a,a.length)
a[b]=c},
cG(a,b,c,d,e){t.hb.a(d)
a.$flags&2&&A.aG(a,5)
this.bP(a,b,c,d,e)
return},
$iq:1,
$ii:1,
$iv:1}
A.cJ.prototype={
gE(a){return B.cH},
$iB:1,
$ifK:1}
A.ea.prototype={
gE(a){return B.cI},
$iB:1,
$ifL:1}
A.eb.prototype={
gE(a){return B.cJ},
n(a,b){A.b8(b,a,a.length)
return a[b]},
$iB:1}
A.ec.prototype={
gE(a){return B.cK},
n(a,b){A.b8(b,a,a.length)
return a[b]},
$iB:1}
A.ed.prototype={
gE(a){return B.cL},
n(a,b){A.b8(b,a,a.length)
return a[b]},
$iB:1}
A.ee.prototype={
gE(a){return B.cO},
n(a,b){A.b8(b,a,a.length)
return a[b]},
$iB:1}
A.ef.prototype={
gE(a){return B.cP},
n(a,b){A.b8(b,a,a.length)
return a[b]},
$iB:1}
A.cN.prototype={
gE(a){return B.cQ},
gp(a){return a.length},
n(a,b){A.b8(b,a,a.length)
return a[b]},
$iB:1}
A.cO.prototype={
gE(a){return B.cR},
gp(a){return a.length},
n(a,b){A.b8(b,a,a.length)
return a[b]},
$iB:1,
$ieE:1}
A.dc.prototype={}
A.dd.prototype={}
A.de.prototype={}
A.df.prototype={}
A.aC.prototype={
h(a){return A.dp(v.typeUniverse,this,a)},
F(a){return A.l2(v.typeUniverse,this,a)}}
A.f2.prototype={}
A.il.prototype={
j(a){return A.ap(this.a,null)}}
A.f0.prototype={
j(a){return this.a}}
A.dk.prototype={$ib3:1}
A.hW.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:8}
A.hV.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:21}
A.hX.prototype={
$0(){this.a.$0()},
$S:9}
A.hY.prototype={
$0(){this.a.$0()},
$S:9}
A.ij.prototype={
cM(a,b){if(self.setTimeout!=null)self.setTimeout(A.cd(new A.ik(this,b),0),a)
else throw A.c(A.aM("`setTimeout()` not found."))}}
A.ik.prototype={
$0(){this.b.$0()},
$S:0}
A.eQ.prototype={
b4(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.aR(a)
else{s=r.a
if(q.h("bu<1>").b(a))s.bv(a)
else s.bA(a)}},
b5(a,b){var s=this.a
if(this.b)s.aV(new A.ar(a,b))
else s.aS(new A.ar(a,b))}}
A.iv.prototype={
$1(a){return this.a.$2(0,a)},
$S:5}
A.iw.prototype={
$2(a,b){this.a.$2(1,new A.ct(a,t.l.a(b)))},
$S:26}
A.iR.prototype={
$2(a,b){this.a(A.a(a),b)},
$S:34}
A.aF.prototype={
gl(){var s=this.b
return s==null?this.$ti.c.a(s):s},
dk(a,b){var s,r,q
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
o.d=null}q=o.dk(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.kX
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
o.a=A.kX
throw n
return!1}if(0>=p.length)return A.h(p,-1)
o.a=p.pop()
m=1
continue}throw A.c(A.k("sync*"))}return!1},
eu(a){var s,r,q=this
if(a instanceof A.aO){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.i(r,q.a)
q.a=s
return 2}else{q.d=J.Y(a)
return 2}},
$iI:1}
A.aO.prototype={
gv(a){return new A.aF(this.a(),this.$ti.h("aF<1>"))}}
A.ar.prototype={
j(a){return A.p(this.a)},
$iE:1,
gai(){return this.b}}
A.eV.prototype={
b5(a,b){var s=this.a
if((s.a&30)!==0)throw A.c(A.k("Future already completed"))
s.aS(A.o7(a,b))},
c4(a){return this.b5(a,null)}}
A.d5.prototype={
b4(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.c(A.k("Future already completed"))
s.aR(r.h("1/").a(a))}}
A.bE.prototype={
e0(a){if((this.c&15)!==6)return!0
return this.b.b.bm(t.al.a(this.d),a.a,t.y,t.K)},
dQ(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.e.b(q))p=l.eg(q,m,a.b,o,n,t.l)
else p=l.bm(t.D.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.b9(s))){if((r.c&1)!==0)throw A.c(A.n("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.c(A.n("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.O.prototype={
cz(a,b,c){var s,r,q=this.$ti
q.F(c).h("1/(2)").a(a)
s=$.J
if(s===B.n){if(!t.e.b(b)&&!t.D.b(b))throw A.c(A.aT(b,"onError",u.c))}else{c.h("@<0/>").F(q.c).h("1(2)").a(a)
b=A.on(b,s)}r=new A.O(s,c.h("O<0>"))
this.aQ(new A.bE(r,3,a,b,q.h("@<1>").F(c).h("bE<1,2>")))
return r},
bW(a,b,c){var s,r=this.$ti
r.F(c).h("1/(2)").a(a)
s=new A.O($.J,c.h("O<0>"))
this.aQ(new A.bE(s,19,a,b,r.h("@<1>").F(c).h("bE<1,2>")))
return s},
dl(a){this.a=this.a&1|16
this.c=a},
aB(a){this.a=a.a&30|this.a&1
this.c=a.c},
aQ(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aQ(a)
return}r.aB(s)}A.fq(null,null,r.b,t.M.a(new A.i1(r,a)))}},
bK(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bK(a)
return}m.aB(n)}l.a=m.aE(a)
A.fq(null,null,m.b,t.M.a(new A.i5(l,m)))}},
aD(){var s=t.F.a(this.c)
this.c=null
return this.aE(s)},
aE(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bA(a){var s,r=this
r.$ti.c.a(a)
s=r.aD()
r.a=8
r.c=a
A.c6(r,s)},
d_(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aD()
q.aB(a)
A.c6(q,r)},
aV(a){var s=this.aD()
this.dl(a)
A.c6(this,s)},
aR(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bu<1>").b(a)){this.bv(a)
return}this.cQ(a)},
cQ(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.fq(null,null,s.b,t.M.a(new A.i3(s,a)))},
bv(a){A.jE(this.$ti.h("bu<1>").a(a),this,!1)
return},
aS(a){this.a^=2
A.fq(null,null,this.b,t.M.a(new A.i2(this,a)))},
$ibu:1}
A.i1.prototype={
$0(){A.c6(this.a,this.b)},
$S:0}
A.i5.prototype={
$0(){A.c6(this.b,this.a.a)},
$S:0}
A.i4.prototype={
$0(){A.jE(this.a.a,this.b,!0)},
$S:0}
A.i3.prototype={
$0(){this.a.bA(this.b)},
$S:0}
A.i2.prototype={
$0(){this.a.aV(this.b)},
$S:0}
A.i8.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.ef(t.fO.a(q.d),t.A)}catch(p){s=A.b9(p)
r=A.cg(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jq(q)
n=k.a
n.c=new A.ar(q,o)
q=n}q.b=!0
return}if(j instanceof A.O&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.O){m=k.b.a
l=new A.O(m.b,m.$ti)
j.cz(new A.i9(l,m),new A.ia(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.i9.prototype={
$1(a){this.a.d_(this.b)},
$S:8}
A.ia.prototype={
$2(a,b){A.dy(a)
t.l.a(b)
this.a.aV(new A.ar(a,b))},
$S:39}
A.i7.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bm(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.b9(l)
r=A.cg(l)
q=s
p=r
if(p==null)p=A.jq(q)
o=this.a
o.c=new A.ar(q,p)
o.b=!0}},
$S:0}
A.i6.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.e0(s)&&p.a.e!=null){p.c=p.a.dQ(s)
p.b=!1}}catch(o){r=A.b9(o)
q=A.cg(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jq(p)
m=l.b
m.c=new A.ar(p,n)
p=m}p.b=!0}},
$S:0}
A.eR.prototype={}
A.fh.prototype={}
A.dw.prototype={$ikR:1}
A.fa.prototype={
eh(a){var s,r,q
t.M.a(a)
try{if(B.n===$.J){a.$0()
return}A.lr(null,null,this,a,t.H)}catch(q){s=A.b9(q)
r=A.cg(q)
A.jS(A.dy(s),t.l.a(r))}},
dC(a){return new A.ig(this,t.M.a(a))},
ef(a,b){b.h("0()").a(a)
if($.J===B.n)return a.$0()
return A.lr(null,null,this,a,b)},
bm(a,b,c,d){c.h("@<0>").F(d).h("1(2)").a(a)
d.a(b)
if($.J===B.n)return a.$1(b)
return A.op(null,null,this,a,b,c,d)},
eg(a,b,c,d,e,f){d.h("@<0>").F(e).F(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.J===B.n)return a.$2(b,c)
return A.oo(null,null,this,a,b,c,d,e,f)},
cv(a,b,c,d){return b.h("@<0>").F(c).F(d).h("1(2,3)").a(a)}}
A.ig.prototype={
$0(){return this.a.eh(this.b)},
$S:0}
A.iQ.prototype={
$0(){A.mb(this.a,this.b)},
$S:0}
A.d7.prototype={
gp(a){return this.a},
ga_(){return new A.bF(this,this.$ti.h("bF<1>"))},
gah(){var s=this.$ti
return A.ko(new A.bF(this,s.h("bF<1>")),new A.ic(this),s.c,s.y[1])},
al(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.d3(a)},
d3(a){var s=this.d
if(s==null)return!1
return this.a3(this.bz(s,a),a)>=0},
n(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.kT(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.kT(q,b)
return r}else return this.de(b)},
de(a){var s,r,q=this.d
if(q==null)return null
s=this.bz(q,a)
r=this.a3(s,a)
return r<0?null:s[r+1]},
t(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.by(s==null?m.b=A.jF():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.by(r==null?m.c=A.jF():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.jF()
p=A.jd(b)&1073741823
o=q[p]
if(o==null){A.jG(q,p,[b,c]);++m.a
m.e=null}else{n=m.a3(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
an(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.bB()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.n(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.c(A.as(m))}},
bB(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.cG(i.a,null,!1,t.A)
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
by(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.jG(a,b,c)},
bz(a,b){return a[A.jd(b)&1073741823]}}
A.ic.prototype={
$1(a){var s=this.a,r=s.$ti
s=s.n(0,r.c.a(a))
return s==null?r.y[1].a(s):s},
$S(){return this.a.$ti.h("2(1)")}}
A.d9.prototype={
a3(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.bF.prototype={
gp(a){return this.a.a},
gv(a){var s=this.a
return new A.d8(s,s.bB(),this.$ti.h("d8<1>"))}}
A.d8.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.c(A.as(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iI:1}
A.aE.prototype={
dg(){return new A.aE(A.t(this).h("aE<1>"))},
gv(a){var s=this,r=new A.bI(s,s.r,A.t(s).h("bI<1>"))
r.c=s.e
return r},
gp(a){return this.a},
q(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.d2(b)},
d2(a){var s=this.d
if(s==null)return!1
return this.a3(s[this.aW(a)],a)>=0},
i(a,b){var s,r,q=this
A.t(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bx(s==null?q.b=A.jI():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bx(r==null?q.c=A.jI():r,b)}else return q.cO(b)},
cO(a){var s,r,q,p=this
A.t(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jI()
r=p.aW(a)
q=s[r]
if(q==null)s[r]=[p.aU(a)]
else{if(p.a3(q,a)>=0)return!1
q.push(p.aU(a))}return!0},
aK(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bL(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bL(s.c,b)
else return s.di(b)},
di(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.aW(a)
r=n[s]
q=o.a3(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bZ(p)
return!0},
Y(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aT()}},
bx(a,b){A.t(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aU(b)
return!0},
bL(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bZ(s)
delete a[b]
return!0},
aT(){this.r=this.r+1&1073741823},
aU(a){var s,r=this,q=new A.f4(A.t(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aT()
return q},
bZ(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aT()},
aW(a){return J.L(a)&1073741823},
a3(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ba(a[r].a,b))return r
return-1},
$ikn:1}
A.f4.prototype={}
A.bI.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.c(A.as(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iI:1}
A.h5.prototype={
$2(a,b){this.a.t(0,this.b.a(a),this.c.a(b))},
$S:33}
A.y.prototype={
gv(a){return new A.ai(a,this.gp(a),A.bp(a).h("ai<y.E>"))},
O(a,b){return this.n(a,b)},
c9(a,b){var s,r
A.bp(a).h("z(y.E)").a(b)
s=this.gp(a)
for(r=0;r<s;++r){if(!b.$1(this.n(a,r)))return!1
if(s!==this.gp(a))throw A.c(A.as(a))}return!0},
dO(a,b,c,d){var s
A.bp(a).h("y.E?").a(d)
A.ep(b,c,this.gp(a))
for(s=b;s<c;++s)this.t(a,s,d)},
j(a){return A.js(a,"[","]")},
$iq:1,
$ii:1,
$iv:1}
A.bx.prototype={
an(a,b){var s,r,q,p=A.t(this)
p.h("~(1,2)").a(b)
for(s=this.ga_(),s=s.gv(s),p=p.y[1];s.k();){r=s.gl()
q=this.n(0,r)
b.$2(r,q==null?p.a(q):q)}},
ga1(){var s=this.ga_(),r=A.t(this).h("R<1,2>"),q=A.t(s)
return A.ko(s,q.F(r).h("1(i.E)").a(new A.h8(this)),q.h("i.E"),r)},
gp(a){var s=this.ga_()
return s.gp(s)},
gah(){return new A.da(this,A.t(this).h("da<1,2>"))},
j(a){return A.jy(this)},
$iZ:1}
A.h8.prototype={
$1(a){var s=this.a,r=A.t(s)
r.c.a(a)
s=s.n(0,a)
if(s==null)s=r.y[1].a(s)
return new A.R(a,s,r.h("R<1,2>"))},
$S(){return A.t(this.a).h("R<1,2>(1)")}}
A.h9.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.p(a)
r.a=(r.a+=s)+": "
s=A.p(b)
r.a+=s},
$S:64}
A.da.prototype={
gp(a){var s=this.a
return s.gp(s)},
gv(a){var s=this.a,r=s.ga_()
return new A.db(r.gv(r),s,this.$ti.h("db<1,2>"))}}
A.db.prototype={
k(){var s=this,r=s.a
if(r.k()){s.c=s.b.n(0,r.gl())
return!0}s.c=null
return!1},
gl(){var s=this.c
return s==null?this.$ti.y[1].a(s):s},
$iI:1}
A.dq.prototype={
t(a,b,c){var s=A.t(this)
s.c.a(b)
s.y[1].a(c)
throw A.c(A.aM("Cannot modify unmodifiable map"))}}
A.bX.prototype={
n(a,b){return this.a.n(0,b)},
t(a,b,c){var s=A.t(this)
this.a.t(0,s.c.a(b),s.y[1].a(c))},
gp(a){var s=this.a
return s.gp(s)},
ga_(){return this.a.ga_()},
j(a){return this.a.j(0)},
gah(){return this.a.gah()},
ga1(){return this.a.ga1()},
$iZ:1}
A.bk.prototype={}
A.b2.prototype={
gci(a){return this.gp(this)!==0},
V(a,b){var s
for(s=J.Y(A.t(this).h("i<1>").a(b));s.k();)this.i(0,s.gl())},
c5(a){var s,r,q=this.ag(0)
for(s=this.gv(this);s.k();){r=s.gl()
if(a.q(0,r))q.aK(0,r)}return q},
j(a){return A.js(this,"{","}")},
aa(a,b){var s,r,q=this.gv(this)
if(!q.k())return""
s=J.aS(q.gl())
if(!q.k())return s
if(b.length===0){r=s
do r+=A.p(q.gl())
while(q.k())}else{r=s
do r=r+b+A.p(q.gl())
while(q.k())}return r.charCodeAt(0)==0?r:r},
dw(a,b){var s
A.t(this).h("z(1)").a(b)
for(s=this.gv(this);s.k();)if(b.$1(s.gl()))return!0
return!1},
O(a,b){var s,r
A.eo(b,"index")
s=this.gv(this)
for(r=b;s.k();){if(r===0)return s.gl();--r}throw A.c(A.h2(b,b-r,this,"index"))},
$iq:1,
$ii:1,
$ibi:1}
A.di.prototype={
ag(a){var s=this.dg()
s.V(0,this)
return s}}
A.fj.prototype={
i(a,b){this.$ti.c.a(b)
return A.nw()}}
A.d2.prototype={
gp(a){return this.a.a},
gv(a){var s=this.a
return A.jH(s,s.r,A.t(s).c)},
ag(a){return this.a.ag(0)}}
A.c8.prototype={}
A.dr.prototype={}
A.iq.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:10}
A.ip.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:10}
A.dI.prototype={
e1(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a3.length
a5=A.ep(a4,a5,a2)
s=$.lU()
for(r=s.length,q=a4,p=q,o=null,n=-1,m=-1,l=0;q<a5;q=k){k=q+1
if(!(q<a2))return A.h(a3,q)
j=a3.charCodeAt(q)
if(j===37){i=k+2
if(i<=a5){if(!(k<a2))return A.h(a3,k)
h=A.j_(a3.charCodeAt(k))
g=k+1
if(!(g<a2))return A.h(a3,g)
f=A.j_(a3.charCodeAt(g))
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
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.ac("")
g=o}else g=o
g.a+=B.c.u(a3,p,q)
c=A.bz(j)
g.a+=c
p=k
continue}}throw A.c(A.ab("Invalid base64 data",a3,q))}if(o!=null){a2=B.c.u(a3,p,a5)
a2=o.a+=a2
r=a2.length
if(n>=0)A.k9(a3,m,a5,n,l,r)
else{b=B.i.az(r-1,4)+1
if(b===1)throw A.c(A.ab(a1,a3,a5))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.c.af(a3,a4,a5,a2.charCodeAt(0)==0?a2:a2)}a=a5-a4
if(n>=0)A.k9(a3,m,a5,n,l,a)
else{b=B.i.az(a,4)
if(b===1)throw A.c(A.ab(a1,a3,a5))
if(b>1)a3=B.c.af(a3,a5,a5,b===2?"==":"=")}return a3}}
A.ft.prototype={}
A.bR.prototype={}
A.dR.prototype={}
A.dX.prototype={}
A.eK.prototype={}
A.hP.prototype={
dH(a){return new A.io(this.a).d4(t.L.a(a),0,null,!0)}}
A.io.prototype={
d4(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.ep(b,c,J.bb(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.nN(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.nM(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.aX(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.nO(o)
l.b=0
throw A.c(A.ab(m,a,p+l.c))}return n},
aX(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.i.bU(b+c,2)
r=q.aX(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.aX(a,s,c,d)}return q.dK(a,b,c,d)},
dK(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.ac(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.h(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.h(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.h(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.bz(f)
e.a+=p
if(d===a0)break A
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.bz(h)
e.a+=p
break
case 65:p=A.bz(h)
e.a+=p;--d
break
default:p=A.bz(h)
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
p=A.bz(a[l])
e.a+=p}else{p=A.kB(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.bz(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.bs.prototype={
T(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bs)if(this.a===b.a)s=this.b===b.b
return s},
gC(a){return A.cQ(this.a,this.b,B.j,B.j,B.j,B.j)},
N(a,b){var s
t.df.a(b)
s=B.i.N(this.a,b.a)
if(s!==0)return s
return B.i.N(this.b,b.b)},
j(a){var s=this,r=A.m8(A.mD(s)),q=A.dS(A.mB(s)),p=A.dS(A.mx(s)),o=A.dS(A.my(s)),n=A.dS(A.mA(s)),m=A.dS(A.mC(s)),l=A.kg(A.mz(s)),k=s.b,j=k===0?"":A.kg(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iad:1}
A.hZ.prototype={
j(a){return this.A()}}
A.E.prototype={
gai(){return A.mw(this)}}
A.dG.prototype={
j(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.fF(s)
return"Assertion failed"}}
A.b3.prototype={}
A.aH.prototype={
gb_(){return"Invalid argument"+(!this.a?"(s)":"")},
gaZ(){return""},
j(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.p(p),n=s.gb_()+q+o
if(!s.a)return n
return n+s.gaZ()+": "+A.fF(s.gbe())},
gbe(){return this.b}}
A.cS.prototype={
gbe(){return A.lc(this.b)},
gb_(){return"RangeError"},
gaZ(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.p(q):""
else if(q==null)s=": Not greater than or equal to "+A.p(r)
else if(q>r)s=": Not in inclusive range "+A.p(r)+".."+A.p(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.p(r)
return s}}
A.e2.prototype={
gbe(){return A.a(this.b)},
gb_(){return"RangeError"},
gaZ(){if(A.a(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gp(a){return this.f}}
A.d3.prototype={
j(a){return"Unsupported operation: "+this.a}}
A.eF.prototype={
j(a){return"UnimplementedError: "+this.a}}
A.c3.prototype={
j(a){return"Bad state: "+this.a}}
A.dQ.prototype={
j(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.fF(s)+"."}}
A.eh.prototype={
j(a){return"Out of Memory"},
gai(){return null},
$iE:1}
A.d_.prototype={
j(a){return"Stack Overflow"},
gai(){return null},
$iE:1}
A.i_.prototype={
j(a){return"Exception: "+this.a}}
A.aU.prototype={
j(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.c.u(e,0,75)+"..."
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
k=""}return g+l+B.c.u(e,i,j)+k+"\n"+B.c.G(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.p(f)+")"):g}}
A.i.prototype={
am(a,b,c,d){var s,r
d.a(b)
A.t(this).F(d).h("1(1,i.E)").a(c)
for(s=this.gv(this),r=b;s.k();)r=c.$2(r,s.gl())
return r},
aa(a,b){var s,r,q=this.gv(this)
if(!q.k())return""
s=J.aS(q.gl())
if(!q.k())return s
if(b.length===0){r=s
do r+=J.aS(q.gl())
while(q.k())}else{r=s
do r=r+b+J.aS(q.gl())
while(q.k())}return r.charCodeAt(0)==0?r:r},
gp(a){var s,r=this.gv(this)
for(s=0;r.k();)++s
return s},
dP(a,b){var s,r
A.t(this).h("z(i.E)").a(b)
for(s=this.gv(this);s.k();){r=s.gl()
if(b.$1(r))return r}throw A.c(A.jr())},
O(a,b){var s,r
A.eo(b,"index")
s=this.gv(this)
for(r=b;s.k();){if(r===0)return s.gl();--r}throw A.c(A.h2(b,b-r,this,"index"))},
j(a){return A.mj(this,"(",")")}}
A.R.prototype={
j(a){return"MapEntry("+A.p(this.a)+": "+A.p(this.b)+")"}}
A.U.prototype={
gC(a){return A.w.prototype.gC.call(this,0)},
j(a){return"null"}}
A.w.prototype={$iw:1,
T(a,b){return this===b},
gC(a){return A.el(this)},
j(a){return"Instance of '"+A.em(this)+"'"},
gE(a){return A.jY(this)},
toString(){return this.j(this)}}
A.fi.prototype={
j(a){return""},
$ibj:1}
A.ac.prototype={
gp(a){return this.a.length},
j(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$imM:1}
A.hO.prototype={
$2(a,b){var s,r,q,p
t.f.a(a)
A.aP(b)
s=B.c.aG(b,"=")
if(s===-1){if(b!=="")a.t(0,A.jO(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.c.u(b,0,s)
q=B.c.aA(b,s+1)
p=this.a
a.t(0,A.jO(r,0,r.length,p,!0),A.jO(q,0,q.length,p,!0))}return a},
$S:14}
A.hN.prototype={
$2(a,b){throw A.c(A.ab("Illegal IPv6 address, "+a,this.a,b))},
$S:15}
A.ds.prototype={
gbV(){var s,r,q,p,o=this,n=o.w
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
gC(a){var s,r=this,q=r.y
if(q===$){s=B.c.gC(r.gbV())
r.y!==$&&A.jn()
r.y=s
q=s}return q},
gct(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.kJ(s==null?"":s)
r.z!==$&&A.jn()
q=r.z=new A.bk(s,t.h)}return q},
gcC(){return this.b},
gbb(){var s=this.c
if(s==null)return""
if(B.c.H(s,"[")&&!B.c.J(s,"v",1))return B.c.u(s,1,s.length-1)
return s},
gbh(){var s=this.d
return s==null?A.l3(this.a):s},
gbj(){var s=this.f
return s==null?"":s},
gca(){var s=this.r
return s==null?"":s},
gcb(){return this.c!=null},
gcd(){return this.f!=null},
gcc(){return this.r!=null},
j(a){return this.gbV()},
T(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.dD.b(b))if(p.a===b.gbp())if(p.c!=null===b.gcb())if(p.b===b.gcC())if(p.gbb()===b.gbb())if(p.gbh()===b.gbh())if(p.e===b.gcs()){r=p.f
q=r==null
if(!q===b.gcd()){if(q)r=""
if(r===b.gbj()){r=p.r
q=r==null
if(!q===b.gcc()){s=q?"":r
s=s===b.gca()}}}}return s},
$ieI:1,
gbp(){return this.a},
gcs(){return this.e}}
A.hM.prototype={
gcB(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.h(m,0)
s=o.a
m=m[0]+1
r=B.c.aH(s,"?",m)
q=s.length
if(r>=0){p=A.dt(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.eW("data","",n,n,A.dt(s,m,q,128,!1,!1),p,n)}return m},
j(a){var s,r=this.b
if(0>=r.length)return A.h(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.fe.prototype={
gcb(){return this.c>0},
gcd(){return this.f<this.r},
gcc(){return this.r<this.a.length},
gbp(){var s=this.w
return s==null?this.w=this.d1():s},
d1(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.c.H(r.a,"http"))return"http"
if(q===5&&B.c.H(r.a,"https"))return"https"
if(s&&B.c.H(r.a,"file"))return"file"
if(q===7&&B.c.H(r.a,"package"))return"package"
return B.c.u(r.a,0,q)},
gcC(){var s=this.c,r=this.b+3
return s>r?B.c.u(this.a,r,s-1):""},
gbb(){var s=this.c
return s>0?B.c.u(this.a,s,this.d):""},
gbh(){var s,r=this
if(r.c>0&&r.d+1<r.e)return A.lC(B.c.u(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.c.H(r.a,"http"))return 80
if(s===5&&B.c.H(r.a,"https"))return 443
return 0},
gcs(){return B.c.u(this.a,this.e,this.f)},
gbj(){var s=this.f,r=this.r
return s<r?B.c.u(this.a,s+1,r):""},
gca(){var s=this.r,r=this.a
return s<r.length?B.c.aA(r,s+1):""},
gct(){if(this.f>=this.r)return B.bO
return new A.bk(A.kJ(this.gbj()),t.h)},
gC(a){var s=this.x
return s==null?this.x=B.c.gC(this.a):s},
T(a,b){if(b==null)return!1
if(this===b)return!0
return t.dD.b(b)&&this.a===b.j(0)},
j(a){return this.a},
$ieI:1}
A.eW.prototype={}
A.hg.prototype={
j(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.je.prototype={
$1(a){return this.a.b4(this.b.h("0/?").a(a))},
$S:5}
A.jf.prototype={
$1(a){if(a==null)return this.a.c4(new A.hg(a===undefined))
return this.a.c4(a)},
$S:5}
A.iV.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.lq(a))return a
s=this.a
a.toString
if(s.al(a))return s.n(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.m(A.al(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.bM(!0,"isUtc",t.y)
return new A.bs(r,0,!0)}if(a instanceof RegExp)throw A.c(A.n("structured clone of RegExp",null))
if(a instanceof Promise)return A.oY(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.aA(p,p)
s.t(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.fr(n),p=s.gv(n);p.k();)m.push(A.ce(p.gl()))
for(l=0;l<s.gp(n);++l){k=s.n(n,l)
if(!(l<m.length))return A.h(m,l)
j=m[l]
if(k!=null)o.t(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.t(0,a,o)
h=A.a(a.length)
for(s=J.cf(i),l=0;l<h;++l)o.push(this.$1(s.n(i,l)))
return o}return a},
$S:16}
A.hq.prototype={}
A.c0.prototype={
A(){return"QualityProfileKind."+this.b}}
A.ak.prototype={}
A.fy.prototype={}
A.fz.prototype={}
A.hJ.prototype={
A(){return"ToneMappingMode."+this.b}}
A.hn.prototype={
D(){var s,r,q,p
for(s=A.mn(["exposure",1,"bloomStrength",0,"ssaoStrength",0,"depthOfFieldStrength",0,"vignette",0,"grain",0,"rainIntensity",0,"surfaceWetness",0,"surfaceSnowCoverage",0,"surfaceDissolution",0,"rainWindowVisibility",1,"ditherStrength",0,"colorGradeStrength",0,"affineWarpStrength",0,"vertexSnapGrid",0,"vhsChromaWeight",0,"vhsTrackingWeight",0,"vhsNoiseWeight",0,"vhsHeadSwitchWeight",0,"vhsDropoutWeight",0,"vhsGhostWeight",0],t.N,t.i),s=new A.aX(s,A.t(s).h("aX<1,2>")).gv(0);s.k();){r=s.d
q=r.a
p=r.b
if(!isFinite(p)||p<0)throw A.c(A.n("PostProcessState."+q+" must be >= 0: "+A.p(p),null))}}}
A.br.prototype={
gcg(){var s,r=this,q=r.x
if(q===$){s=r.b.cf()
r.x!==$&&A.jn()
r.x=s
q=s}return q},
D(){var s,r,q,p,o,n,m,l,k=this,j=null,i=k.d
if(!i.gP(0))throw A.c(A.n("CameraView.eye must be finite: "+i.j(0),j))
i=k.e
if(!i.gP(0)||i.gab()<1e-12)throw A.c(A.n("CameraView.forward must be finite and nonzero: "+i.j(0),j))
i=k.f
if(isFinite(i)){s=k.r
s=!isFinite(s)||i<=0||s<=i}else s=!0
if(s)throw A.c(A.n("CameraView requires 0 < near < far, got "+A.p(i)+"/"+k.r,j))
i=k.w
if(!isFinite(i)||i<=0)throw A.c(A.n("CameraView.aspect must be finite and > 0: "+A.p(i),j))
i=k.a
if(!i.gP(0)||!k.b.gP(0)||!k.c.gP(0))throw A.c(A.n("CameraView matrices must be finite",j))
for(s=k.c.a,i=k.b.G(0,i).a,r=0,q=-1,p=0;p<16;++p){o=s[p]
n=i[p]
m=Math.abs(o-n)/(1+Math.abs(n))
if(m>r){q=p
r=m}}if(r>0.0001){o=B.v.el(r,2)
n=B.i.bU(q,4)
l=B.i.az(q,4)
if(!(q>=0&&q<16))return A.h(s,q)
throw A.c(A.n("CameraView.viewProjection must equal projection * view. Worst relative mismatch "+o+" at column "+n+" row "+l+" (got "+A.p(s[q])+", expected "+A.p(i[q])+"). Prefer CameraView.look/lookAt/fromMatrices, which derive it.",j))}}}
A.fN.prototype={
D(){var s,r,q,p,o,n,m,l=null
if(!B.bo.gP(0)||!B.B.gP(0)||!B.C.gP(0)||!B.C.gP(0)||!B.B.gP(0))throw A.c(A.n("FrameEnvironment colors must be finite",l))
s=isFinite(0)
if(s)r=!isFinite(1)
else r=!0
if(r)throw A.c(A.n("FrameEnvironment requires fogEnd >= fogStart, got 0/1",l))
if(!s)throw A.c(A.n("FrameEnvironment.ambientIntensity must be >= 0: 0",l))
for(q=0;!1;++q)B.bx[q].D()
for(s=isFinite(1),r=isFinite(-1),q=0;!1;++q){if(!s)A.m(A.n("SpotLight.position must be finite: "+B.p.j(0),l))
if(!r)A.m(A.n("SpotLight.direction must be finite and nonzero: "+B.u.j(0),l))}r=t.N
p=A.ah(r)
for(q=0;!1;++q){o=B.ao[q]
o.D()
if(!p.i(0,o.gB()))throw A.c(A.n("FrameEnvironment.volumetricSources contains duplicate id: "+A.p(o.gB()),l))}n=!0
if(isFinite(0.02))if(isFinite(0.7))if(isFinite(0.35))if(s)s=!isFinite(0.003)
else s=n
else s=n
else s=n
else s=n
if(s)throw A.c(A.n("invalid volumetric medium controls",l))
m=A.ah(r)
for(q=0;!1;++q){o=B.ap[q]
o.D()
if(!m.i(0,o.gB()))throw A.c(A.n("FrameEnvironment.thermalSources contains duplicate id: "+A.p(o.gB()),l))}}}
A.fO.prototype={}
A.fQ.prototype={
bf(a){++this.b},
co(a,b,c,d){var s=this.a
this.a=s+1
return new A.fO(a,b,c,-1,s,d)}}
A.b0.prototype={
T(a,b){if(b==null)return!1
return J.dF(b)===A.jY(this)&&b instanceof A.b0&&this.a===b.a&&this.b===b.b},
gC(a){return A.cQ(A.jY(this),this.a,this.b,B.j,B.j,B.j)}}
A.aj.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MeshHandle(#"+this.a+"."+this.b+s+")"}}
A.am.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"TextureHandle(#"+this.a+"."+this.b+s+")"}}
A.aJ.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MaterialHandle(#"+this.a+"."+this.b+s+")"}}
A.ei.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"PipelineHandle(#"+this.a+"."+this.b+s+")"}}
A.bv.prototype={
j(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.cw.prototype={
A(){return"HandleRejection."+this.b}}
A.h1.prototype={
j(a){return"HandleException("+this.a.b+", "+this.b.j(0)+")"}}
A.aK.prototype={
j(a){var s=this.b,r=this.a.a
return s==null?r.b+": ok":r.b+": "+A.p(s)}}
A.dL.prototype={
gdN(){var s,r=this.d
if(r.length<=1)return null
s=A.K(r)
return new A.aB(new A.a0(r,s.h("z(1)").a(new A.fv()),s.h("a0<1>")),s.h("l(1)").a(new A.fw()),s.h("aB<1,l>")).aa(0,"; ")}}
A.fv.prototype={
$1(a){return t.x.a(a).b!=null},
$S:17}
A.fw.prototype={
$1(a){t.x.a(a)
return a.a.a.b+" failed: "+A.p(a.b)},
$S:18}
A.iW.prototype={
$1(a){return t.W.a(a)===this.a},
$S:19}
A.bW.prototype={
gP(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
T(a,b){if(b==null)return!1
return b instanceof A.bW&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gC(a){return A.cQ(this.a,this.b,this.c,B.j,B.j,B.j)},
j(a){return"LinearColor("+A.p(this.a)+", "+A.p(this.b)+", "+A.p(this.c)+")"}}
A.af.prototype={}
A.jg.prototype={
$2(a,b){var s,r=t.fk
r.a(a)
s=B.v.N(r.a(b).a,a.a)
return s===0?0:s},
$S:20}
A.aD.prototype={
A(){return"VertexAttributeKind."+this.b}}
A.fD.prototype={}
A.hi.prototype={
D(){var s=this.a,r=s.a
if(!r.q(0,"sceneColor")||!r.q(0,"present"))throw A.c(A.n("resource plan must contain sceneColor and present",null))
if(s.dw(0,new A.hk()))throw A.c(A.n("resource plan contains an empty resource ID",null))
if(this.b!==r.q(0,"vhsOutput"))throw A.c(A.n("resource history does not match vhsOutput ownership",null))}}
A.hk.prototype={
$1(a){return A.aP(a).length===0},
$S:6}
A.ho.prototype={}
A.er.prototype={
ce(a){var s=this
if(s.d)A.m(A.k("resource assembler is disposed"))
if(s.a!=null)throw A.c(A.k("resource assembler is initialized"))
a.D()
s.a=a
s.c=1},
a5(){if(this.d)return
this.d=!0
this.a=null}}
A.d1.prototype={
j(a){var s=this
return"SurfaceMetrics(css "+s.a+"x"+s.b+", pixels "+s.c+"x"+s.d+", dpr "+A.p(s.e)+", visible: true)"},
D(){var s,r=this
if(r.a<0||r.b<0)throw A.c(A.n("SurfaceMetrics css size must be >= 0",null))
if(r.c<0||r.d<0)throw A.c(A.n("SurfaceMetrics pixel size must be >= 0",null))
s=r.e
if(!isFinite(s)||s<=0)throw A.c(A.n("SurfaceMetrics.devicePixelRatio must be finite and > 0: "+A.p(s),null))}}
A.fx.prototype={
A(){return"ColorEncoding."+this.b}}
A.cU.prototype={
D(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.c5(B.cw)
if(o.a!==0)A.m(A.aT(o,r,"contains unknown pipeline features"))
if(q.a===B.ax&&p.gci(p))A.m(A.aT(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.c(A.n("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.c(A.n("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.c1.prototype={
A(){return"RendererState."+this.b}}
A.N.prototype={}
A.fR.prototype={
j(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.b+" tris="+s.c+" culled="+s.d+" gpu="+s.r+"B)"}}
A.e8.prototype={
e8(a){return this.a.a4(a)}}
A.hb.prototype={
$3(a,b,c){return new A.aJ(A.a(a),A.a(b),A.bK(c))},
$S:23}
A.eH.prototype={}
A.hd.prototype={
ds(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.gcD(),d=A.n5(f,new A.fU(e.gcn(e),B.b7,B.b5))
e=a.gcD()
if(f.b!==B.f)A.m(A.k(g))
s=A.a1(d.a)
r=f.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.av(f)
A.ao(f,p)
if(f.b!==B.f)A.m(A.k(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=a.gcm().ger().G(0,4)
n=A.ah(t.S)
for(e=a.gcm().gdz(),m=e.length,l=0;l<m;++l){k=e[l]
j=A.lv(k.gdZ())
if(!n.i(0,j))continue
i=A.nW(a.gcm(),j,k)
h=k.geC().G(0,4)
if(f.b!==B.f)A.m(A.k(g))
r.vertexAttribPointer.apply(r,[j,i,A.a(q.WebGL2RenderingContext.FLOAT),!1,o,h])
if(f.b!==B.f)A.m(A.k(g))
r.enableVertexAttribArray(j)}A.kr(a.gdR())
return new A.eH(d,void 1,p,0,a.gf1(),!0)},
e2(a){if(this.c.n(0,a.gW())==null)throw A.c(A.bU(B.M,a))
this.b.a4(a)},
bk(){var s,r,q,p,o,n
for(s=this.b.ac(),r=s.$ti,s=new A.aF(s.a(),r.h("aF<1>")),q=this.c,r=r.c;s.k();){p=s.b
if(p==null)p=r.a(p)
o=p.a
n=p.b
q.t(0,o.a,this.ds(n))}},
gao(){return this.b.ac().am(0,0,new A.hf(),t.S)}}
A.he.prototype={
$3(a,b,c){return new A.aj(A.a(a),A.a(b),A.bK(c))},
$S:24}
A.hf.prototype={
$2(a,b){var s,r
A.a(a)
s=t.ai.a(b).b
r=s.gcD()
r=B.i.a7(a,r.gcn(r))
s=A.kr(s.gdR())
return r+s},
$S:25}
A.eD.prototype={
X(a){var s=this.a,r=A.kN(s,B.aP)
A.kO(s,r,0,a)
return r},
ak(a,b){this.b.a4(a)},
e4(a){var s=this.d
s===$&&A.aR()
return this.ak(a,s)},
ec(a){var s=this.e
s===$&&A.aR()
return this.ak(a,s)},
ee(a){var s=this.f
s===$&&A.aR()
return this.ak(a,s)},
e6(a){var s=this.r
s===$&&A.aR()
return this.ak(a,s)},
ea(a){var s=this.w
s===$&&A.aR()
return this.ak(a,s)},
a5(){var s,r,q,p,o,n=this
for(s=n.c,r=new A.aY(s,s.r,s.e,A.t(s).h("aY<2>")),q=n.a,p=q.a,o=t.R;r.k();)p.deleteTexture(o.a(r.d.a).a)
s.Y(0)
s=n.d
s===$&&A.aR()
A.eO(q,s)
s=n.e
s===$&&A.aR()
A.eO(q,s)
s=n.f
s===$&&A.aR()
A.eO(q,s)
s=n.r
s===$&&A.aR()
A.eO(q,s)
s=n.w
s===$&&A.aR()
A.eO(q,s)},
bk(){var s,r,q,p,o,n,m,l,k,j=this
j.d=j.X($.k6())
j.e=j.X($.k3())
j.f=j.X($.k4())
j.r=j.X($.k2())
j.w=j.X($.k5())
for(s=j.b.ac(),r=s.$ti,s=new A.aF(s.a(),r.h("aF<1>")),q=j.c,p=j.a,r=r.c;s.k();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
if(m.gcl().c9(0,new A.hI()))continue
l=A.kN(p,m.gm())
for(k=0;B.i.aw(k,m.gcl().length);++k){o=m.gcl()
if(!(k<o.length))return A.h(o,k)
A.kO(p,l,k,o[k])}if(m.geL())A.n6(p,l)
q.t(0,n.a,l)}},
gao(){return this.b.ac().am(0,0,new A.hH(),t.S)}}
A.hG.prototype={
$3(a,b,c){return new A.am(A.a(a),A.a(b),A.bK(c))},
$S:27}
A.hI.prototype={
$1(a){return!1},
$S:28}
A.hH.prototype={
$2(a,b){var s
A.a(a)
s=t.dU.a(b).b.gm()
return B.i.a7(a,s.gf3().G(0,s.geD()).G(0,s.geF()).G(0,4))},
$S:29}
A.jh.prototype={
$2(a,b){var s,r=t.eS
r.a(a)
s=J.k8(r.a(b).a,a.a)
return s},
$S:30}
A.be.prototype={
gdT(){return this.b.length}}
A.dY.prototype={
dF(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h
t.U.a(a)
s=new A.ht(A.e([],t.cU),A.ah(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.C)(r),++p)r[p].L(s,b)
o=s.dE(a,!1)
if(o.b.length!==0)return new A.dZ(o,B.by)
q=o.a
n=A.K(q)
m=new A.b_(q,n.h("l(1)").a(new A.fI()),n.h("b_<1,l>")).ag(0)
l=A.e([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.C)(r),++p){k=r[p]
for(n=k.K(d),j=n.length,i=0;i<n.length;n.length===j||(0,A.C)(n),++i){h=n[i]
if(!m.q(0,h.gm().a))throw A.c(A.k('RenderFeature "'+k.gB()+'" created a pass "'+h.gm().a+'" that it never declared into the graph'))
B.a.i(l,h)}}B.a.a8(l,new A.fJ(o))
return new A.dZ(o,l)}}
A.fI.prototype={
$1(a){return t.z.a(a).a},
$S:31}
A.fJ.prototype={
$2(a,b){var s=t.fA
s.a(a)
s.a(b)
s=this.a.a
return B.i.N(B.a.bc(s,new A.fG(a)),B.a.bc(s,new A.fH(b)))},
$S:32}
A.fG.prototype={
$1(a){return t.z.a(a).a===this.a.gm().a},
$S:2}
A.fH.prototype={
$1(a){return t.z.a(a).a===this.a.gm().a},
$S:2}
A.dZ.prototype={}
A.bS.prototype={
A(){return"FrameQueueState."+this.b}}
A.fP.prototype={}
A.fM.prototype={
dB(a){if(a.length===0)throw A.c(A.aT(a,"passId",null))
this.b=a
this.a.bi(a,A.lz())},
cH(){var s,r,q,p,o=t.A
o=A.aA(o,o)
for(s=this.a,s=new A.aX(s,A.t(s).h("aX<1,2>")).gv(0);s.k();){r=s.d
q=r.a
p=r.b
o.t(0,q,new A.N(p.a,p.b,p.d))}return A.kf(o,t.N,t.b)},
a9(a,b){var s,r=this.b
if(r==null)throw A.c(A.k("draw recorded outside an active render pass"))
if(b<1)throw A.c(A.n("draw count and instance count must be positive",null))
s=this.a.n(0,r);++s.a
s.d+=b
s.b=s.b+(a/3|0)*b}}
A.c7.prototype={}
A.D.prototype={
gae(){var s=this.c,r=A.K(s)
return new A.a0(s,r.h("z(1)").a(new A.hl()),r.h("a0<1>"))},
gav(){var s=this.c,r=A.K(s)
return new A.a0(s,r.h("z(1)").a(new A.hm()),r.h("a0<1>"))},
j(a){return"PassDeclaration("+this.a+" @ "+this.b.j(0)+")"}}
A.hl.prototype={
$1(a){var s=t.J.a(a).b
return s===B.d||s===B.r},
$S:7}
A.hm.prototype={
$1(a){return t.J.a(a).b===B.e},
$S:7}
A.az.prototype={
A(){return"GraphValidationFailureKind."+this.b}}
A.a5.prototype={
j(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.eq.prototype={
A(){return"ResourceFormat."+this.b}}
A.aV.prototype={
A(){return"GraphStage."+this.b}}
A.M.prototype={
cp(){var s=this
return new A.M(s.a,s.b,s.c,s.d,s.e,s.f+1)},
T(a,b){var s=this
if(b==null)return!1
return b instanceof A.M&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gC(a){var s=this
return A.cQ(s.a,s.b,s.c,s.d,s.e,s.f)},
j(a){var s=this,r=s.b.j(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.cW.prototype={
A(){return"ResourceAccess."+this.b}}
A.j.prototype={}
A.cn.prototype={}
A.hp.prototype={
M(a){var s,r,q,p,o,n,m=this
a.D()
s=null
try{r=a.d.ga_()
r=A.at(r,A.t(r).h("i.E"))
q=t.dy
s=A.n7(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.b9(p) instanceof A.cZ){++m.e
throw p}else throw p}o=new A.cn(s)
r=m.b
q=a.a
n=r.n(0,q)
r.t(0,q,o);++m.d
if(n!=null)m.a.a.deleteProgram(A.a1(n.b.a))
return o},
d6(a){var s,r
t.cr.a(a)
for(s=a.a,s=new A.aY(s,s.r,s.e,a.$ti.h("aY<1>")),r=this.a.a;s.k();)r.deleteProgram(A.a1(s.d.b.a))}}
A.a_.prototype={
D(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.c(A.n("ProgramSource.id must not be empty",m))
s=t.S
r=A.ah(s)
for(q=this.d.ga1(),q=q.gv(q);q.k();){p=q.gl()
o=p.b
if(o<0)throw A.c(A.n('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.i(0,o))throw A.c(A.n('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.ah(s)
for(s=this.e.ga1(),s=s.gv(s);s.k();){q=s.gl()
p=q.b
if(p<0)throw A.c(A.n('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.i(0,p))throw A.c(A.n('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.hr.prototype={}
A.V.prototype={
R(){var s=this
return A.kh(B.aN,s.f,B.a7,B.F,!0,!0,!0,!0,s.r,B.ae,B.af,s.d,s.e,!0,!1,!1)}}
A.ht.prototype={
dE(a,b){var s=this.dt(t.U.a(a),!1),r=this.a,q=A.K(r)
return new A.hs(A.h7(new A.a0(r,q.h("z(1)").a(new A.hy()),q.h("a0<1>")),t.z),s)},
dt(a,b){var s,r,q,p,o,n,m=this
t.U.a(a)
s=A.e([],t.b7)
r=m.a
q=A.K(r)
p=q.h("a0<1>")
o=A.at(new A.a0(r,q.h("z(1)").a(new A.hx()),p),p.h("i.E"))
m.cR(o,a,s)
m.cV(o,s)
m.cX(o,s)
m.cU(o,!1,s)
n=m.cZ(o,s)
m.cW(o,n,s)
m.cY(o,s)
m.cT(o,n,s)
m.cS(o,s)
return s},
cR(a,b,c){var s,r,q,p
t.O.a(a)
t.U.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r){q=a[r]
p=B.W.c5(b)
if(p.a!==0)B.a.i(c,new A.a5(B.bk,q.a,"missing capabilities: "+p.aa(0,", ")))}},
cV(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gae(),o=J.Y(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gl().a
if(m.e>1)B.a.i(b,new A.a5(B.bf,n,"reads multisampled resource "+m.j(0)+" directly; resolve before sampling"))}}},
cX(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.K(a),r=s.h("z(1)").a(new A.hw()),q=B.a.gv(a),s=new A.G(q,r,s.h("G<1>"));s.k();){r=q.gl()
p=r.gae()
o=A.at(p,p.$ti.h("i.E"))
p=r.gav()
n=A.at(p,p.$ti.h("i.E"))
if(o.length!==1||n.length!==1){B.a.i(b,new A.a5(B.L,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.a.gbr(o).a
l=B.a.gbr(n).a
if(m.e<=1||l.e>1)B.a.i(b,new A.a5(B.L,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.a.i(b,new A.a5(B.L,r.a,"resolve source and destination must match format and extent"))}},
cU(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.C)(p),++m){l=p[m]
if(l.b===B.r)B.a.i(c,new A.a5(B.bi,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
cZ(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.aA(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.C)(a),++q){p=a[q]
for(o=p.gav(),n=J.Y(o.a),o=new A.G(n,o.b,o.$ti.h("G<1>")),m=p.a;o.k();){l=n.gl().a
k=l.a+"#"+l.f
j=s.n(0,k)
if(j!=null){B.a.i(b,new A.a5(B.be,m,l.j(0)+" already written by "+j.a))
continue}s.t(0,k,p)}}return s},
cW(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gae(),p=J.Y(q.a),q=new A.G(p,q.b,q.$ti.h("G<1>")),o=r.a;q.k();){n=p.gl()
if(n.b===B.r)continue
n=n.a
m=b.n(0,n.a+"#"+n.f)
if(m==null){B.a.i(c,new A.a5(B.al,o,"reads "+n.j(0)+" but no pass writes that version"))
continue}if(B.a.aG(a,m)>s)B.a.i(c,new A.a5(B.al,o,"reads "+n.j(0)+" before writer "+m.a+" runs"))}}},
cY(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r){q=a[r]
for(p=q.gae(),o=J.Y(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gl()
if(m.b===B.r)continue
for(l=q.gav(),k=J.Y(l.a),l=new A.G(k,l.b,l.$ti.h("G<1>")),m=m.a,j=m.a,i=m.f;l.k();){h=k.gl().a
if(j===h.a&&i===h.f)B.a.i(b,new A.a5(B.bh,n,"reads and writes "+m.j(0)+" at the same version; declare a ping-pong version bump"))}}}},
cT(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.a1.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.C)(a),++r){q=a[r]
for(p=q.gae(),o=J.Y(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gl()
if(m.b===B.r)continue
l=m.a
k=b.n(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gav().dP(0,new A.hv(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.a.i(c,new A.a5(B.bg,n,"reads "+l.j(0)+" but writer "+k.a+" produced "+j.j(0)))}}},
cS(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.aA(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gav(),o=J.Y(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>"));p.k();){n=o.gl().a
r.t(0,n.a+"#"+n.f,q)}m=J.jt(p,t.cJ)
for(l=0;l<p;++l)m[l]=A.ah(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gae(),p=J.Y(s.a),s=new A.G(p,s.b,s.$ti.h("G<1>"));s.k();){o=p.gl()
if(o.b===B.r)continue
o=o.a
k=r.n(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.h(m,k)
m[k].i(0,q)}}p=t.y
j=A.cG(s,!1,!1,p)
s=a.length
i=A.cG(s,!1,!1,p)
h=new A.hu(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.h(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.h(a,q)
B.a.i(b,new A.a5(B.bj,a[q].a,"participates in a resource dependency cycle"))}}}}
A.hy.prototype={
$1(a){t.z.a(a)
return A.jA()},
$S:2}
A.hx.prototype={
$1(a){t.z.a(a)
return A.jA()},
$S:2}
A.hw.prototype={
$1(a){return t.z.a(a).f},
$S:2}
A.hv.prototype={
$1(a){var s=t.J.a(a).a,r=this.a.a
return s.a===r.a&&s.f===r.f},
$S:7}
A.hu.prototype={
$1(a){var s,r,q,p,o=this,n=o.a
if(!(a>=0&&a<n.length))return A.h(n,a)
if(n[a])return!0
s=o.b
if(!(a<s.length))return A.h(s,a)
if(s[a])return!1
B.a.t(n,a,!0)
r=o.c
if(!(a<r.length))return A.h(r,a)
r=r[a]
r=A.jH(r,r.r,A.t(r).c)
q=r.$ti.c
while(r.k()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.a.t(n,a,!1)
B.a.t(s,a,!0)
return!1},
$S:35}
A.hs.prototype={}
A.cT.prototype={
du(a){a.D()
this.a.a4(a.gU())},
gcj(){return new A.aO(this.dY(),t.eM)},
dY(){var s=this
return function(){var r=0,q=1,p=[],o,n,m
return function $async$gcj(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b.ac(),n=o.$ti,o=new A.aF(o.a(),n.h("aF<1>")),n=n.c
case 2:if(!o.k()){r=3
break}m=o.b
if(m==null)m=n.a(m)
m.a
s.du(m.b)
r=4
return a.b=void 1,1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$imH:1}
A.hz.prototype={
$3(a,b,c){return new A.bv(A.a(a),A.a(b),A.bK(c))},
$S:36}
A.hA.prototype={
a5(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
if(e.x)return
s=e.w
r=A.at(s,A.t(s).c)
q=r.length
p=e.c
o=p.c
n=p.a.a
m=t.R
l=0
for(;l<r.length;r.length===q||(0,A.C)(r),++l){k=r[l]
j=o.aK(0,k.a)
if(j!=null)n.deleteTexture(m.a(j.a).a)
p.b.bl(k)}r=e.r
q=A.at(r,A.t(r).c)
o=q.length
n=e.b.a
l=0
for(;l<q.length;q.length===o||(0,A.C)(q),++l)n.bl(q[l])
q=e.f
o=A.at(q,A.t(q).c)
n=o.length
m=e.a
i=m.c
h=m.a.a
l=0
for(;l<o.length;o.length===n||(0,A.C)(o),++l){k=o[l]
g=i.aK(0,k.a)
if(g!=null){h.deleteVertexArray(A.a1(g.c.a))
h.deleteBuffer(A.a1(g.a.a))
f=g.b
if(f!=null)h.deleteBuffer(A.a1(f.a))}m.b.bl(k)}s.Y(0)
r.Y(0)
q.Y(0)
p.a5()
e.x=!0}}
A.i0.prototype={}
A.iM.prototype={
$1(a){var s=this.a.w.a.e2(a),r=s.b!=null,q=r?s.d:s.e
return new A.cV(s.c,r,q,s.f)},
$S:37}
A.iN.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.q(0,a))return this.b.x.gl().cr(a)
if(b!=null&&s.q(0,b))return this.b.x.gl().cr(b)
throw A.c(A.k("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:38}
A.iL.prototype={
$0(){return this.a.$1("shadowMap")},
$S:1}
A.iE.prototype={
$0(){return null},
$S:40}
A.iF.prototype={
$0(){var s=this.a.at
if(s==null)return B.N
return A.p_(B.N,3,s.a.d,null)},
$S:41}
A.iK.prototype={
$0(){return this.a.$1("sceneDepth")},
$S:1}
A.iz.prototype={
$0(){return this.a.at.a},
$S:42}
A.iB.prototype={
$0(){return this.a.$2$fallback("ssaoRaw","sceneColor")},
$S:1}
A.iA.prototype={
$0(){return this.a.$2$fallback("ssaoBlurred","sceneColor")},
$S:1}
A.iJ.prototype={
$0(){var s=this.b.d>1?"sceneColor#1":"sceneColor"
return this.a.$1(s)},
$S:1}
A.ix.prototype={
$0(){return this.a.$2$fallback("bloomBlurH","sceneColor")},
$S:1}
A.iy.prototype={
$0(){return this.a.$2$fallback("bloomBlurV","sceneColor")},
$S:1}
A.iG.prototype={
$0(){return this.a.$2$fallback("dofBlurH","sceneColor")},
$S:1}
A.iH.prototype={
$0(){return this.a.$2$fallback("dofBlurV","sceneColor")},
$S:1}
A.iI.prototype={
$0(){var s=this.a.w.c.d
s===$&&A.aR()
return s},
$S:1}
A.iD.prototype={
$0(){return this.a.$2$fallback("vhsOutput","sceneColor")},
$S:1}
A.iC.prototype={
$0(){return this.a.at.w},
$S:43}
A.iO.prototype={
$0(){return this.a},
$S:66}
A.iP.prototype={
$0(){return null},
$S:45}
A.ih.prototype={}
A.f7.prototype={$imG:1}
A.f1.prototype={$imc:1}
A.et.prototype={
dS(a,b){var s,r,q,p,o,n,m,l=this
if(l.e!==B.T)throw A.c(A.k("renderer can only be initialized once"))
a.D()
b.D()
s=l.a
if(s.b===B.A)throw A.c(A.k("renderer device is context lost"))
l.e=B.cf
try{r=v.G
s.aj(A.a(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.aj(A.a(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.aj(A.a(r.WebGL2RenderingContext.MAX_SAMPLES))
s.aj(A.a(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.aj(A.a(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
q=s.r
if(q.q(0,"EXT_texture_filter_anisotropic"))s.bJ(34047)
p=q.q(0,"EXT_disjoint_timer_query_webgl2")
s.w=p
q.q(0,"EXT_color_buffer_float")
q.q(0,"EXT_color_buffer_half_float")
q.q(0,"WEBGL_lose_context")
q=s.a
A.ce(q.getParameter(A.a(r.WebGL2RenderingContext.RENDERER)))
A.ce(q.getParameter(A.a(r.WebGL2RenderingContext.VENDOR)))
l.r=new A.hq(p)
r=l.b
o=A.hj(a)
q=r.a
if(q.a!=null)A.m(A.k("configuration state is already initialized"))
a.D()
q.a=a
A.hj(a)
q.d=1
r.b.ce(o)
r=A.mq()
l.w=new A.hA(A.mr(s),r,A.mO(s),A.ah(t.cA),A.ah(t.eL),A.ah(t.aj))
r=new A.er()
q=new A.fW(s,r)
o=A.hj(a)
n=q.bC(o,a)
r.ce(o)
q.c=new A.ek(new A.ho(o),n)
l.x=q
l.y=new A.hp(s,A.aA(t.N,t.dN))
l.as=a
A.li(l)
l.e=B.U}catch(m){s=l.y
if(s!=null){r=s.b
s.d6(new A.aZ(r,A.t(r).h("aZ<2>")))
r.Y(0)}s=l.x
if(s!=null)s.a5()
s=l.w
if(s!=null)s.a5()
l.w=null
l.e=B.T
throw m}s=new A.O($.J,t.cd)
s.aR(null)
return s},
c1(a,b){var s,r,q,p,o=this
o.dh()
o.aC()
r=B.a.q(o.d,a)
if(!r)throw A.c(A.n("world was not created by this renderer",null))
if(o.at!=null)throw A.c(A.k("renderer.beginFrame called twice without end/abort"))
b.a.D()
b.b.D()
b.c.D()
r=b.w
if(!isFinite(r))A.m(A.n("FrameInput.timeSeconds must be finite: "+A.p(r),null))
o.at=b
o.ax=a
q=o.c
if(q.b===B.z)A.m(A.k("FrameQueue.beginFrame called twice without end/abort"))
q.b=B.z
q.c=0
B.a.Y(q.a)
s=q
try{r=o.r
if((r==null?A.m(A.k("renderer is not initialized")):r).z)o.b$=o.a.dA()
return s}catch(p){if(q.b!==B.z)A.m(A.k("FrameQueue.abortFrame called without an active frame"))
q.c=0
q.b=B.b2
o.bt()
o.ax=o.at=null
throw p}},
c8(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
e.aC()
s=e.at
r=e.ax
if(s==null||r==null)throw A.c(A.k("renderer.endFrame called without an active frame"))
m=e.c
if(m.b!==B.z)A.m(A.k("FrameQueue.endFrame called without an active frame"))
l=m.a
k=A.hF(l,0,A.bM(m.c,"count",t.S),A.K(l).c).cA(0,!1)
m.b=B.b1
q=k
try{p=A.nZ(e,r,s,q)
o=p.a.cH()
m=o.ga1()
l=A.t(m)
n=new A.aB(new A.a0(m,l.h("z(i.E)").a(new A.hB()),l.h("a0<i.E>")),l.h("N(i.E)").a(new A.hC()),l.h("aB<i.E,N>")).am(0,B.b_,new A.hD(),t.b)
l=s.e
m=n.a
j=n.b
i=p.c
n.toString
p.toString
h=e.w
g=h.a.gao()
h=h.c.gao()
f=e.w
f.a.gao()
f.c.gao()
e.w.toString
return new A.fR(l,m,j,i,g+h)}finally{e.dd(s.e)
e.ax=e.at=null}},
dh(){var s,r,q,p=this
if(p.e!==B.D)return
if(p.a.b===B.A)throw A.c(A.k("renderer context remains lost"))
s=p.w
if(s.x)A.m(A.k("resource library is disposed"))
s.a.bk()
s.c.bk()
s=p.x
s.toString
r=p.as
r.toString
if(s.e)A.m(A.k("GPU resource adapter is disposed"))
q=s.c
if(q==null)A.m(A.k("GPU resource adapter is not initialized"))
s.c=new A.ek(q.a,s.bC(A.hj(r),r))
s=p.y
s.c=null
s.b.Y(0)
A.li(p)
p.e=B.U},
aC(){var s=this,r=s.e
if(r!==B.U)throw A.c(A.k("renderer is not ready: "+r.b))
if(s.a.b===B.A){s.d8()
s.e=B.D
throw A.c(A.k("renderer context lost"))}},
$imK:1}
A.hB.prototype={
$1(a){return B.c.q(t.ao.a(a).a.toLowerCase(),"world")},
$S:46}
A.hC.prototype={
$1(a){return t.ao.a(a).b},
$S:47}
A.hD.prototype={
$2(a,b){var s=t.b
s.a(a)
s.a(b)
return new A.N(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:48}
A.f6.prototype={}
A.ib.prototype={
dd(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.f)A.m(A.k(u.k))
r=s.bX(o)
if(r.b)A.m(A.k("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.a.i(p.a$,new A.f6(o))}catch(q){p.aY(o)}},
bt(){var s=this.b$
this.b$=null
if(s!=null)this.aY(s)},
d8(){var s,r,q
this.bt()
s=this.a$
r=J.kk(s.slice(0),A.K(s).c)
B.a.Y(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.C)(r),++q)this.aY(r[q].b)},
aY(a){var s,r
try{s=this.a
s.a.deleteQuery(s.bX(a).a)}catch(r){}}}
A.fb.prototype={}
A.ev.prototype={
A(){return"ShadowCasterLod."+this.b}}
A.ae.prototype={
N(a,b){var s
t.fy.a(b)
s=B.i.N(this.a.a,b.a.a)
if(s!==0)return s
s=this.b.gW().N(0,b.b.gW())
return s},
$iad:1}
A.W.prototype={}
A.jl.prototype={
$2(a,b){var s=t.k
return s.a(a).a.N(0,s.a(b).a)},
$S:49}
A.jm.prototype={
$1(a){return t.k.a(a).b},
$S:50}
A.jj.prototype={
$2(a,b){var s=t.d
return s.a(a).a.N(0,s.a(b).a)},
$S:51}
A.jk.prototype={
$1(a){return t.d.a(a).b},
$S:52}
A.fC.prototype={}
A.fB.prototype={}
A.by.prototype={}
A.cu.prototype={
A(){return"FrustumTest."+this.b}}
A.fS.prototype={
ei(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
for(s=this.a,r=!1,q=0;q<6;++q){p=s[q]
o=p.a
n=o.a
m=n>=0
l=m?a.gap().gaL():a.gaq().gaL()
k=o.b
j=k>=0
i=j?a.gap().gaM():a.gaq().gaM()
o=o.c
h=o>=0
g=h?a.gap().gaN():a.gaq().gaN()
f=p.b
if(n*l+k*i+o*g+f<0)return B.ag
m=m?a.gaq().gaL():a.gap().gaL()
l=j?a.gaq().gaM():a.gap().gaM()
j=h?a.gaq().gaN():a.gap().gaN()
if(n*m+k*l+o*j+f<0)r=!0}return r?B.b3:B.b4}}
A.fT.prototype={
$4(a,b,c,d){var s=new A.au(a,b,c),r=new A.by(s,d),q=Math.sqrt(s.gab())
if(q<1e-9)s=r
else{s=1/q
s=new A.by(new A.au(a*s,b*s,c*s),d/q)}return s},
$S:53}
A.bY.prototype={
G(a,b){var s,r,q,p,o,n,m,l,k,j=new Float32Array(16)
for(s=this.a,r=b.a,q=0;q<4;++q)for(p=q*4,o=0;o<4;++o){for(n=0,m=0;m<4;++m){l=m*4+o
if(!(l<16))return A.h(s,l)
l=s[l]
k=p+m
if(!(k<16))return A.h(r,k)
n+=l*r[k]}l=p+o
if(!(l<16))return A.h(j,l)
j[l]=n}return new A.bY(j)},
cf(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=J.jt(4,t.gN)
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
a[s]=p}return new A.bY(a)},
gP(a){return B.P.c9(this.a,new A.ha())},
j(a){return"Mat4("+A.p(this.a)+")"}}
A.ha.prototype={
$1(a){return isFinite(A.it(a))},
$S:54}
A.au.prototype={
b7(a){return this.a*a.a+this.b*a.b+this.c*a.c},
b6(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.au(s*r-q*p,q*o-n*r,n*p-s*o)},
gab(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gp(a){return Math.sqrt(this.gab())},
gP(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gbg(){var s=this,r=Math.sqrt(s.gab())
return r<1e-9?B.E:new A.au(s.a/r,s.b/r,s.c/r)},
T(a,b){if(b==null)return!1
return b instanceof A.au&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gC(a){return A.cQ(this.a,this.b,this.c,B.j,B.j,B.j)},
j(a){return"Vec3("+A.p(this.a)+", "+A.p(this.b)+", "+A.p(this.c)+")"}}
A.eS.prototype={
A(){return"_BloomBlurAxis."+this.b}}
A.cj.prototype={
gB(){return this.f},
L(a,b){B.a.i(a.a,new A.D(this.f,B.q,A.e([new A.j(this.x,B.d),new A.j(this.y,B.e)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a_(s.e,s.b,s.c,B.m,B.at,B.aq)),q=A.av(s.d),p=t.n,o=s.r===B.aL?new Float32Array(A.r(A.e([1/s.Q,0],p))):new Float32Array(A.r(A.e([0,1/s.as],p)))
p=s.y
return A.e([new A.eT(new A.V(s.f,A.e([new A.j(s.x,B.d),new A.j(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iA:1}
A.eT.prototype={
I(a){return},
$ix:1,
gm(){return this.a}}
A.dK.prototype={
gB(){return"bloomComposite"},
L(a,b){B.a.i(a.a,new A.D("bloomComposite",B.q,A.e([new A.j(this.f,B.d),new A.j(this.r,B.d),new A.j(this.w,B.e)],t.C),!1))},
K(a){var s=this,r="bloomComposite",q=s.a.M(new A.a_(r,s.b,s.c,B.m,B.bM,B.bC)),p=A.av(s.d),o=s.w,n=A.e([new A.j(s.f,B.d),new A.j(s.r,B.d),new A.j(o,B.e)],t.C)
return A.e([new A.eU(new A.V(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iA:1}
A.eU.prototype={
I(a){return},
$ix:1,
gm(){return this.a}}
A.dT.prototype={
gB(){return"depthPrepass"},
L(a,b){B.a.i(a.a,new A.D("depthPrepass",B.bb,A.e([new A.j(this.w,B.e)],t.C),!1))},
K(a){var s=this,r="depthPrepass",q=s.a.M(new A.a_(r,s.b,s.c,B.as,B.ar,B.bv))
return A.e([new A.eX(new A.V(r,A.e([new A.j(s.w,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iA:1}
A.eX.prototype={
I(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=u.k,c=a0.b,b=a0.d,a=c.a
A.an(a,a0.S("sceneDepth").b)
A.a7(a,e.a.R())
A.bD(a,B.H,1,0,0,0)
A.aN(a,e.b.b)
A.b(a,"uVertexSnapGrid",new A.d(B.b,0))
A.b(a,"uAlbedo",B.o)
for(s=b.a,r=s.length,b=b.c.c.a,q=e.c,p=v.G,o=c.b,n=a.a,m=0;m<s.length;s.length===r||(0,A.C)(s),++m){l=s[m]
k=l.a
j=k.gm().ga2()
A.b(a,"uViewProjection",new A.d(B.k,new Float32Array(A.r(b))))
A.b(a,"uModel",new A.d(B.k,new Float32Array(A.r(j.ar().ga6()))))
A.ji(c,l,!1)
e.d7(c,k.gm().gad(),0)
i=q.$1(k.gm().gU())
j=i.a
if(a.b!==B.f)A.m(A.k(d))
n.bindVertexArray(A.a1(j.a))
j=i.b
h=i.c
g=l.b.length
if(j){j=i.d
if(a.b!==B.f)A.m(A.k(d))
f=A.a(p.WebGL2RenderingContext.TRIANGLES)
n.drawElementsInstanced.apply(n,[f,h,j?A.a(p.WebGL2RenderingContext.UNSIGNED_INT):A.a(p.WebGL2RenderingContext.UNSIGNED_SHORT),0,g])
o.a9(h,g)}else{if(a.b!==B.f)A.m(A.k(d))
n.drawArraysInstanced(A.a(p.WebGL2RenderingContext.TRIANGLES),0,h,g)
o.a9(h,g)}}},
d7(a,b,c){var s,r=this.d.$1(b),q=a.a
A.S(q,0,t.j.a(this.e.$1(r.gc_())))
r.gc0()
A.b(q,"uAlphaCutoff",new A.d(B.b,0))
A.b(q,"uAffineWarpStrength",new A.d(B.b,r.gdv()?c:0))
s=this.a.R()
A.a7(q,r.gc6()?s.bn(!1):s)},
$ix:1,
gm(){return this.a}}
A.eY.prototype={
A(){return"_DofBlurAxis."+this.b}}
A.cr.prototype={
gB(){return this.f},
L(a,b){B.a.i(a.a,new A.D(this.f,B.q,A.e([new A.j(this.w,B.d),new A.j(this.x,B.e)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a_(s.e,s.b,s.c,B.m,B.at,B.aq)),q=A.av(s.d),p=t.n,o=s.r===B.aM?new Float32Array(A.r(A.e([1/s.z,0],p))):new Float32Array(A.r(A.e([0,1/s.Q],p)))
p=s.x
return A.e([new A.eZ(new A.V(s.f,A.e([new A.j(s.w,B.d),new A.j(p,B.e)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iA:1}
A.eZ.prototype={
I(a){return},
$ix:1,
gm(){return this.a}}
A.dV.prototype={
gB(){return"dofComposite"},
L(a,b){var s=this
B.a.i(a.a,new A.D("dofComposite",B.q,A.e([new A.j(s.z,B.d),new A.j(s.Q,B.d),new A.j(s.as,B.d),new A.j(s.at,B.e)],t.C),!1))},
K(a){var s=this,r="dofComposite",q=s.a.M(new A.a_(r,s.b,s.c,B.m,B.bK,B.bu)),p=A.av(s.d)
return A.e([new A.f_(new A.V(r,A.e([new A.j(s.z,B.d),new A.j(s.Q,B.d),new A.j(s.as,B.d),new A.j(s.at,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iA:1}
A.f_.prototype={
I(a){var s,r=this,q=a.S("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.an(n,q.b)
A.a7(n,r.a.R())
A.aN(n,r.b.b)
s=t.j
A.S(n,0,s.a(r.d.$0()))
A.b(n,"uSharp",B.o)
A.S(n,1,s.a(r.e.$0()))
A.b(n,"uBlurred",B.w)
A.S(n,2,s.a(r.f.$0()))
A.b(n,"uSceneDepth",B.aK)
A.b(n,"uNear",new A.d(B.b,o.f))
A.b(n,"uFar",new A.d(B.b,o.r))
A.b(n,"uFocusDistance",new A.d(B.b,r.w))
A.b(n,"uFocusRange",new A.d(B.b,r.x))
A.b(n,"uStrength",new A.d(B.b,0))
A.ao(n,r.c)
p.Z(3,0)},
$ix:1,
gm(){return this.a}}
A.e1.prototype={
gB(){return"grade"},
L(a,b){B.a.i(a.a,new A.D("grade",B.q,A.e([new A.j(this.r,B.d),new A.j(this.w,B.e)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a_("grade",s.b,s.c,B.m,B.bI,B.bD)),q=A.av(s.d),p=s.r,o=s.w
return A.e([new A.f3(new A.V("grade",A.e([new A.j(p,B.d),new A.j(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iA:1}
A.f3.prototype={
I(a){var s=this,r=a.S(s.f.a),q=a.b,p=q.a
A.an(p,a.S(s.r.a).b)
A.a7(p,s.a.R())
A.aN(p,s.b.b)
A.S(p,0,r.b)
A.b(p,"uScene",B.o)
A.S(p,1,t.j.a(s.d.$0()))
A.b(p,"uLut",B.w)
A.b(p,"uLutSize",new A.d(B.b,s.e))
A.b(p,"uStrength",new A.d(B.b,0))
A.ao(p,s.c)
q.Z(3,0)},
$ix:1,
gm(){return this.a}}
A.cI.prototype={
gB(){return"msaaResolve"},
L(a,b){B.a.i(a.a,new A.D("msaaResolve",B.bc,A.e([new A.j(this.b,B.d),new A.j(this.c,B.e)],t.C),!0))},
K(a){var s=this.b,r=this.c
return A.e([new A.f5(new A.V("msaaResolve",A.e([new A.j(s,B.d),new A.j(r,B.e)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iA:1}
A.f5.prototype={
I(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.au(this.c),j=a.au(this.d),i=this.b
if(i.b!==B.f)A.m(A.k(u.k))
s=t.V
r=s.a(k.b.a)
q=s.a(j.b.a)
s=r.y
if(s<=1)A.m(A.n("WebGl2Device.resolveTarget: source must be multisampled (samples > 1), got "+s,null))
s=q.y
if(s>1)A.m(A.n("WebGl2Device.resolveTarget: destination must be single-sample, got samples="+s,null))
s=r.w
p=q.w
if(s!==p||r.x!==q.x)A.m(A.n("WebGl2Device.resolveTarget: source ("+s+"x"+r.x+") and destination ("+p+"x"+q.x+") must match",null))
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
gm(){return this.a}}
A.bQ.prototype={}
A.dM.prototype={
S(a){var s=this.a.n(0,a)
if(s==null)throw A.c(A.k('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
au(a){var s=a.a,r=this.a.n(0,s+"#"+a.f)
if(r!=null)return r
return this.S(s)},
$imF:1}
A.jB.prototype={}
A.cR.prototype={
gB(){return"present"},
L(a,b){B.a.i(a.a,new A.D("present",B.bd,A.e([new A.j(this.f,B.d)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a_("present",s.b,s.c,B.m,B.bL,B.bz)),q=A.av(s.d),p=s.f
return A.e([new A.f8(new A.V("present",A.e([new A.j(p,B.d)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iA:1}
A.f8.prototype={
I(a){var s,r,q,p,o,n,m=this,l=a.au(m.d),k=a.b,j=k.a
A.an(j,null)
A.a7(j,m.a.R())
A.aN(j,m.b.b)
A.ao(j,m.c)
A.S(j,0,l.b)
s=a.c
if(s!=null)A.S(j,1,s)
r=a.d.c
A.b(j,"uExposure",new A.d(B.b,1))
A.b(j,"uVignette",new A.d(B.b,0))
A.b(j,"uGrain",new A.d(B.b,0))
A.b(j,"uOutputEncoding",new A.d(B.b,m.e===B.I?1:0))
A.b(j,"uToneMap",new A.d(B.b,A.mu(B.cE)))
q=t.n
A.b(j,"uClearColor",new A.d(B.h,new Float32Array(A.r(A.e([0.03,0.03,0.04],q)))))
A.b(j,"uSkyHorizon",new A.d(B.h,new Float32Array(A.r(A.e([1,1,1],q)))))
A.b(j,"uSkyZenith",new A.d(B.h,new Float32Array(A.r(A.e([0.30160000000000003,0.30160000000000003,0.3088],q)))))
A.b(j,"uSkyGround",new A.d(B.h,new Float32Array(A.r(A.e([0.027,0.027,0.036000000000000004],q)))))
A.b(j,"uSkyEnabled",new A.d(B.b,0))
A.b(j,"uSkyHorizonGlow",new A.d(B.b,0))
A.b(j,"uSkyStarDensity",new A.d(B.b,0))
A.b(j,"uSkyTexture",B.w)
A.b(j,"uSkyTextureEnabled",new A.d(B.b,0))
A.b(j,"uSkyRotation",new A.d(B.b,0))
A.b(j,"uSkyExposure",new A.d(B.b,1))
A.b(j,"uSkyTextureSrgb",new A.d(B.b,0))
A.b(j,"uInverseProjection",new A.d(B.k,new Float32Array(A.r(r.gcg().a))))
p=r.y
if(p===$){o=r.a.cf()
r.y!==$&&A.jn()
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
A.b(j,"uCloudSampleCount",new A.d(B.b,4))
A.b(j,"uCloudLightDirection",new A.d(B.h,new Float32Array(A.r(A.e([0,1,0],q)))))
A.b(j,"uCloudLightColor",new A.d(B.h,new Float32Array(A.r(A.e([1,1,1],q)))))
A.b(j,"uCloudLightIntensity",new A.d(B.b,0))
k.Z(3,0)},
$ix:1,
gm(){return this.a}}
A.en.prototype={
gB(){return"ps1Quantize"},
L(a,b){B.a.i(a.a,new A.D("ps1Quantize",B.q,A.e([new A.j(this.e,B.d),new A.j(this.f,B.e)],t.C),!1))},
K(a){var s=this,r="ps1Quantize",q=s.a.M(new A.a_(r,s.b,s.c,B.m,B.bN,B.br)),p=A.av(s.d),o=s.e,n=s.f
return A.e([new A.f9(new A.V(r,A.e([new A.j(o,B.d),new A.j(n,B.e)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iA:1}
A.f9.prototype={
I(a){var s=this,r=a.S(s.d.a),q=a.b,p=q.a
A.an(p,a.S(s.e.a).b)
A.a7(p,s.a.R())
A.aN(p,s.b.b)
A.S(p,0,r.b)
A.b(p,"uScene",B.o)
A.b(p,"uQuantizationBits",new A.d(B.b,8))
A.b(p,"uDitherStrength",new A.d(B.b,0))
A.ao(p,s.c)
q.Z(3,0)},
$ix:1,
gm(){return this.a}}
A.bA.prototype={}
A.ew.prototype={
gB(){return"shadow"},
L(a,b){B.a.i(a.a,new A.D("shadowCaster",B.ba,A.e([new A.j(this.z,B.e)],t.C),!1))},
K(a){var s=this,r="shadowCaster",q=s.a.M(new A.a_(r,s.b,s.c,B.as,B.ar,B.bB))
return A.e([new A.fc(new A.V(r,A.e([new A.j(s.z,B.e)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iA:1}
A.fc.prototype={
I(a){var s,r,q,p,o=this,n=a.S("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.an(s,n.b)
A.a7(s,o.a.R())
A.bD(s,B.H,1,0,0,0)
return}r=A.kz(l)
o.x.$1(r)
s=m.a
A.an(s,n.b)
A.a7(s,o.a.R())
A.bD(s,B.H,1,0,0,0)
A.aN(s,o.b.b)
A.b(s,"uAlbedo",B.o)
for(s=a.d.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.C)(s),++p)o.d9(m,s[p],l,r)},
bQ(a,b){var s,r=this.d.$1(b),q=a.a
A.S(q,0,t.j.a(this.e.$1(r.gc_())))
r.gc0()
A.b(q,"uAlphaCutoff",new A.d(B.b,0))
s=this.a.R()
A.a7(q,r.gc6()?s.bn(!1):s)},
d9(a,b,c,d){var s,r,q,p,o,n,m=this
if(t.Y.b(b)){if(!b.gm().gdG())return
s=a.a
A.b(s,"uUseInstances",B.a5)
m.bM(a,b.gm().ga2(),d)
m.bQ(a,b.gm().gad())
r=b.gm().gU()
q=m.c.$1(r)
A.ao(s,q.a)
s=q.b
p=q.c
if(s)a.b9(p,q.d,0)
else a.Z(p,0)}else if(b instanceof A.be){o=b.a
if(!o.gm().gdG())return
if(m.dr(b,c)===B.cC)return
m.bM(a,o.gm().ga2(),d)
A.ji(a,b,!1)
m.bQ(a,o.gm().gad())
r=o.gm().gU()
q=m.c.$1(r)
A.ao(a.a,q.a)
s=q.b
p=q.c
n=b.b.length
if(s)a.ba(p,q.d,n,0)
else a.b8(p,0,n)}else throw A.c(A.n("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dF(b).j(0),null))},
dr(a,b){return B.cB},
bM(a,b,c){var s=a.a
A.b(s,"uModel",new A.d(B.k,new Float32Array(A.r(b.ar().ga6()))))
A.b(s,"uLightViewProjection",new A.d(B.k,new Float32Array(A.r(c.a.a))))},
$ix:1,
gm(){return this.a}}
A.iT.prototype={
$1(a){return this.a.a=a},
$S:55}
A.iU.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:56}
A.ex.prototype={
gB(){return"shadowedWorld"},
L(a,b){var s=this,r=A.e([new A.j(s.db,B.d)],t.C)
if(s.ay)r.push(new A.j(s.dx,B.d))
r.push(new A.j(s.dy,B.e))
B.a.i(a.a,new A.D("shadowedWorld",B.ak,r,!1))},
K(a){var s=this,r="shadowedWorld",q=s.a.M(new A.a_(r,s.b,s.c,B.bP,B.bJ,B.bq)),p=A.e([new A.j(s.db,B.d)],t.C)
if(s.ay)p.push(new A.j(s.dx,B.d))
p.push(new A.j(s.dy,B.e))
return A.e([new A.fd(new A.V(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iA:1}
A.fd.prototype={
I(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=null,a0=a7.S("sceneColor"),a1=a7.b,a2=a7.d,a3=a2.c,a4=a2.d,a5=b.z.$0(),a6=a1.a
A.an(a6,a0.b)
A.a7(a6,b.a.R())
A.bD(a6,B.ad,1,0.04,0.03,0.03)
A.aN(a6,b.b.b)
A.b(a6,"uAlbedo",B.o)
A.b(a6,"uNormalMap",B.cT)
A.b(a6,"uOrmMap",B.cU)
A.b(a6,"uEmissiveMap",B.cV)
A.b(a6,"uLightmap",B.cW)
s=t.j
A.S(a6,1,s.a(b.y.$0()))
A.b(a6,"uShadowMap",B.w)
r=a3.d
q=t.n
A.b(a6,"uCameraPosition",new A.d(B.h,new Float32Array(A.r(A.e([r.a,r.b,r.c],q)))))
A.b(a6,"uShadowMapTexelSize",new A.d(B.a4,new Float32Array(A.r(A.e([1/b.ch,1/b.CW],q)))))
A.b(a6,"uShadowFilterRadius",new A.d(B.b,1))
A.b(a6,"uShadowBias",new A.d(B.b,0.003))
A.S(a6,2,s.a(b.at.$0()))
A.b(a6,"uSsao",B.aK)
A.b(a6,"uVertexSnapGrid",new A.d(B.b,0))
A.b(a6,"uSceneColorSize",new A.d(B.a4,new Float32Array(A.r(A.e([b.ax,b.ay],q)))))
A.b(a6,"uViewProjection",new A.d(B.k,new Float32Array(A.r(a3.c.a))))
A.b(a6,"uView",new A.d(B.k,new Float32Array(A.r(a3.a.a))))
A.b(a6,"uLightViewProjection",new A.d(B.k,new Float32Array(A.r(a5.a.a))))
A.b(a6,"uFogColor",new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a6,"uFogStart",new A.d(B.b,0))
A.b(a6,"uFogEnd",new A.d(B.b,1))
A.b(a6,"uFogHeightFalloff",new A.d(B.b,0))
A.b(a6,"uFogDensity",new A.d(B.b,0))
p=b.Q.$0()
s=A.e([],t.w)
r=b.as.$0()
r=J.Y(r==null?B.N:r)
o=p==null
while(r.k()){n=r.gl()
if(-1!==(o?a:-1))s.push(n)}m=o?a:B.p
if(m==null)m=B.p
l=o?a:B.u
if(l==null)l=B.u
A.b(a6,"uLightPosition",new A.d(B.h,new Float32Array(A.r(A.e([m.a,m.b,m.c],q)))))
A.b(a6,"uLightDirection",new A.d(B.h,new Float32Array(A.r(A.e([l.a,l.b,l.c],q)))))
k=o?a:B.C
if(k==null)k=B.B
A.b(a6,"uLightColor",new A.d(B.h,new Float32Array(A.r(A.e([k.a,k.b,k.c],q)))))
r=o?a:1
A.b(a6,"uLightIntensity",new A.d(B.b,r==null?0:r))
A.b(a6,"uSpotEnabled",new A.d(B.b,!o?1:0))
A.b(a6,"uDirectionalDirection",new A.d(B.h,new Float32Array(A.r(A.e([0,1,0],q)))))
A.b(a6,"uDirectionalColor",new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a6,"uDirectionalIntensity",new A.d(B.b,0))
for(j=0;j<4;++j){r=""+j
A.b(a6,"uPointPosition"+r,new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a6,"uPointColor"+r,new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a6,"uPointIntensity"+r,new A.d(B.b,0))
A.b(a6,"uPointRadius"+r,new A.d(B.b,1))}for(j=0;j<3;++j){r=s.length
if(j<r){if(!(j<r))return A.h(s,j)
i=s[j]}else i=a
r=i==null
h=r?a:B.p
if(h==null)h=B.E
g=r?a:B.u
if(g==null)g=B.u
f=r?a:B.C
if(f==null)f=B.B
n=""+j
A.b(a6,"uDirectSpotPosition"+n,new A.d(B.h,new Float32Array(A.r(A.e([h.a,h.b,h.c],q)))))
A.b(a6,"uDirectSpotDirection"+n,new A.d(B.h,new Float32Array(A.r(A.e([g.a,g.b,g.c],q)))))
A.b(a6,"uDirectSpotColor"+n,new A.d(B.h,new Float32Array(A.r(A.e([f.a,f.b,f.c],q)))))
e=r?a:1
if(e==null)e=0
A.b(a6,"uDirectSpotIntensity"+n,new A.d(B.b,e))
e=r?a:1
if(e==null)e=1
A.b(a6,"uDirectSpotRange"+n,new A.d(B.b,e))
e=r?a:0.3
if(e==null)e=0.3
A.b(a6,"uDirectSpotInnerCos"+n,new A.d(B.b,Math.cos(e)))
e=r?a:0.5
if(e==null)e=0.5
A.b(a6,"uDirectSpotOuterCos"+n,new A.d(B.b,Math.cos(e)))
r=r?0:1
A.b(a6,"uDirectSpotEnabled"+n,new A.d(B.b,r))}s=o?a:1
A.b(a6,"uLightRange",new A.d(B.b,s==null?1:s))
s=o?a:0.3
if(s==null)s=0.3
A.b(a6,"uLightInnerCos",new A.d(B.b,Math.cos(s)))
s=o?a:0.5
if(s==null)s=0.5
A.b(a6,"uLightOuterCos",new A.d(B.b,Math.cos(s)))
A.b(a6,"uAmbientColor",new A.d(B.h,new Float32Array(A.r(A.e([1,1,1],q)))))
A.b(a6,"uAmbientIntensity",new A.d(B.b,0))
A.b(a6,"uAmbientLightScale",new A.d(B.b,1))
A.b(a6,"uDirectLightScale",new A.d(B.b,1))
A.b(a6,"uReflectionColor",new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a6,"uReflectionIntensity",new A.d(B.b,0))
A.b(a6,"uReflectionConfidence",new A.d(B.b,0))
A.b(a6,"uRainWetness",new A.d(B.b,0))
A.b(a6,"uSurfaceSnowCoverage",new A.d(B.b,0))
A.b(a6,"uSurfaceDissolution",new A.d(B.b,0))
d=A.hF(B.ap,0,A.bM(4,"count",t.S),t.aX).ek(0)
A.b(a6,"uThermalSourceCount",new A.d(B.b,d.length))
for(j=0;j<4;++j){s=d.length
if(j<s)if(!(j<s))return A.h(d,j)
s=""+j
A.b(a6,"uThermalSourcePosition"+s,new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],q)))))
A.b(a6,"uThermalSourceRadius"+s,new A.d(B.b,1))
A.b(a6,"uThermalSourceDissolution"+s,new A.d(B.b,0))}for(a6=a2.a,s=a6.length,c=0;c<a6.length;a6.length===s||(0,A.C)(a6),++c)b.bR(a1,a6[c],0,a4)
for(a2=a2.b,a6=a2.length,c=0;c<a2.length;a2.length===a6||(0,A.C)(a2),++c)b.bR(a1,a2[c],0,a4)},
bR(a,b,c,d){var s,r,q,p,o,n=this
if(t.Y.b(b)){s=a.a
A.b(s,"uUseInstances",B.a5)
n.bS(a,b.gm().ga2())
n.bN(a,b.gm().gad(),b.gm().gc7(),b.gm().gdD(),c,b.gm().gcu(),d)
r=n.c.$1(b.gm().gU())
A.ao(s,r.a)
s=r.b
q=r.c
if(s)a.b9(q,r.d,0)
else a.Z(q,0)}else if(b instanceof A.be){p=b.a
n.bS(a,p.gm().ga2())
A.ji(a,b,!0)
n.bN(a,p.gm().gad(),p.gm().gc7(),p.gm().gdD(),c,p.gm().gcu(),d)
r=n.c.$1(p.gm().gU())
A.ao(a.a,r.a)
s=r.b
q=r.c
o=b.b.length
if(s)a.ba(q,r.d,o,0)
else a.b8(q,0,o)}else throw A.c(A.n("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dF(b).j(0),null))},
bN(a,b,c,d,e,f,g){var s=this,r=s.d.$1(b),q=t.j,p=a.a
A.S(p,0,q.a(s.e.$1(r.gc_())))
A.S(p,3,q.a(s.f.$1(r.geN())))
A.S(p,4,q.a(s.r.$1(r.geP())))
A.S(p,5,q.a(s.w.$1(r.geA())))
A.S(p,6,q.a(s.x.$1(r.geH())))
r.gc0()
A.b(p,"uAlphaCutoff",new A.d(B.b,0))
A.b(p,"uOpaqueCoverage",new A.d(B.b,1))
A.b(p,"uAffineWarpStrength",new A.d(B.b,r.gdv()?e:0))
q=t.n
A.b(p,"uMaterialTint",new A.d(B.h,new Float32Array(A.r(A.e([r.geV(),r.geU(),r.geT()],q)))))
A.b(p,"uEmissiveStrength",new A.d(B.b,r.gez()))
A.b(p,"uUvScaleOffset",new A.d(B.cS,new Float32Array(A.r(A.e([r.gf_(),r.gf0(),r.geY(),r.geZ()],q)))))
A.b(p,"uNormalStrength",new A.d(B.b,r.geM().G(0,1)))
A.b(p,"uRoughness",new A.d(B.b,r.geS().G(0,1)))
A.b(p,"uMetallic",new A.d(B.b,r.geK().G(0,1)))
A.b(p,"uSpecularScale",new A.d(B.b,1))
A.b(p,"uClearcoatStrength",new A.d(B.b,r.gew()))
A.b(p,"uClearcoatRoughness",new A.d(B.b,r.gev()))
A.b(p,"uOcclusionStrength",new A.d(B.b,r.geO()))
A.b(p,"uLightmapIntensity",new A.d(B.b,r.geG()))
A.b(p,"uReceivesShadow",new A.d(B.b,r.gcu()&&f?1:0))
A.a7(p,r.gc6()?null.bn(!1):null)},
bS(a,b){var s=b.ar(),r=a.a
A.b(r,"uModel",new A.d(B.k,new Float32Array(A.r(s.ga6()))))
A.b(r,"uNormalMatrix",new A.d(B.k,new Float32Array(A.r(s.cq().ga6()))))},
$ix:1,
gm(){return this.a}}
A.ez.prototype={
gB(){return"ssaoOcclusion"},
L(a,b){B.a.i(a.a,new A.D("ssaoOcclusion",B.K,A.e([new A.j(this.w,B.e)],t.C),!1))},
K(a){var s=this,r="ssaoOcclusion",q=s.a.M(new A.a_(r,s.b,s.c,B.m,B.au,B.bp)),p=A.av(s.d)
return A.e([new A.fg(new A.V(r,A.e([new A.j(s.w,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iA:1}
A.fg.prototype={
I(a){var s=a.b.a
A.an(s,a.S("ssaoRaw").b)
A.a7(s,this.a.R())
A.bD(s,B.G,1,1,1,1)
return},
$ix:1,
gm(){return this.a}}
A.ey.prototype={
gB(){return"ssaoBlur"},
L(a,b){B.a.i(a.a,new A.D("ssaoBlur",B.K,A.e([new A.j(this.y,B.d),new A.j(this.z,B.e)],t.C),!1))},
K(a){var s=this,r="ssaoBlur",q=s.a.M(new A.a_(r,s.b,s.c,B.m,B.bG,B.bE)),p=A.av(s.d)
return A.e([new A.ff(new A.V(r,A.e([new A.j(s.y,B.d),new A.j(s.z,B.e)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iA:1}
A.ff.prototype={
I(a){var s=a.b.a
A.an(s,a.S("ssaoBlurred").b)
A.a7(s,this.a.R())
A.bD(s,B.G,1,1,1,1)
return},
$ix:1,
gm(){return this.a}}
A.eL.prototype={
gB(){return"vhs"},
L(a,b){var s=this.w
a.b.i(0,s.a)
B.a.i(a.a,new A.D("vhs",B.q,A.e([new A.j(this.r,B.d),new A.j(s,B.r),new A.j(s,B.e)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a_("vhs",s.b,s.c,B.m,B.bH,B.bs)),q=A.av(s.d),p=s.r,o=s.w
return A.e([new A.fk(new A.V("vhs",A.e([new A.j(p,B.d),new A.j(o,B.r),new A.j(o,B.e)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iA:1}
A.fk.prototype={
I(a){var s=this,r=a.S(s.f.a),q=a.S(s.r.a),p=a.b,o=p.a
A.an(o,q.b)
A.a7(o,s.a.R())
A.aN(o,s.b.b)
A.S(o,0,r.b)
A.b(o,"uScene",B.o)
A.S(o,1,t.j.a(s.d.$0()))
A.b(o,"uHistory",B.w)
A.b(o,"uTime",new A.d(B.b,s.e.$0()))
A.b(o,"uChromaWeight",new A.d(B.b,0))
A.b(o,"uTrackingWeight",new A.d(B.b,0))
A.b(o,"uNoiseWeight",new A.d(B.b,0))
A.b(o,"uHeadSwitchWeight",new A.d(B.b,0))
A.b(o,"uDropoutWeight",new A.d(B.b,0))
A.b(o,"uGhostWeight",new A.d(B.b,0))
A.ao(o,s.c)
p.Z(3,0)},
$ix:1,
gm(){return this.a}}
A.eM.prototype={
gB(){return"volumetricLight"},
L(a,b){var s=this,r=s.w,q=t.C,p=a.a
B.a.i(p,new A.D("volumetricLight",B.K,A.e([new A.j(s.x,B.d),new A.j(r,B.e)],q),!1))
B.a.i(p,new A.D("volumetricComposite",B.q,A.e([new A.j(r,B.d),new A.j(s.y,B.d),new A.j(s.z,B.e)],q),!1))},
K(a){var s,r,q,p,o,n,m=this,l="volumetricLight",k="volumetricComposite",j=m.a,i=m.b,h=j.M(new A.a_(l,i,m.c,B.m,B.au,B.bt)),g=m.e,f=A.av(g),e=m.Q
B.a.i(e,f)
s=m.w
r=t.C
q=A.e([new A.fm(new A.V(l,A.e([new A.j(m.x,B.d),new A.j(s,B.e)],r),!1,!1,!1,!1),h,f,s.a,m.f,m.r)],t.u)
p=m.z
o=j.M(new A.a_(k,i,m.d,B.m,B.bQ,B.bF))
n=A.av(g)
B.a.i(e,n)
B.a.i(q,new A.fl(new A.V(k,A.e([new A.j(s,B.d),new A.j(m.y,B.d),new A.j(p,B.e)],r),!1,!1,!0,!1),o,n,s,p))
return q},
$iA:1}
A.fm.prototype={
I(a){var s,r,q,p,o=this,n=a.S(o.d),m=a.b,l=o.f.$0(),k=m.a
A.an(k,n.b)
A.a7(k,o.a.R())
A.bD(k,B.G,1,0,0,0)
A.aN(k,o.b.b)
A.S(k,0,t.j.a(o.e.$0()))
A.b(k,"uSceneDepth",B.o)
A.b(k,"uNear",new A.d(B.b,l.f))
A.b(k,"uFar",new A.d(B.b,l.r))
A.b(k,"uViewProjection",new A.d(B.k,new Float32Array(A.r(l.c.a))))
A.b(k,"uView",new A.d(B.k,new Float32Array(A.r(l.a.a))))
A.b(k,"uInverseProjection",new A.d(B.k,new Float32Array(A.r(l.gcg().a))))
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
r=A.p0(4,l.d,B.ao)
A.b(k,"uVolumetricSourceCount",new A.d(B.b,r.length))
for(q=0;q<4;++q){p=r.length
if(q<p)if(!(q<p))return A.h(r,q)
p=""+q
A.b(k,"uSourcePosition"+p,new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],s)))))
A.b(k,"uSourceColor"+p,new A.d(B.h,new Float32Array(A.r(A.e([0,0,0],s)))))
A.b(k,"uSourceIntensity"+p,new A.d(B.b,0))
A.b(k,"uSourceReferenceDistance"+p,new A.d(B.b,1))
A.b(k,"uSourceCutoffDistance"+p,new A.d(B.b,1))}A.ao(k,o.c)
m.Z(3,0)},
$ix:1,
gm(){return this.a}}
A.fl.prototype={
I(a){var s=this,r=a.au(s.e),q=a.au(s.d),p=a.b,o=p.a
A.an(o,r.b)
A.n3(o,1)
A.a7(o,B.aZ)
A.aN(o,s.b.b)
A.S(o,0,q.b)
A.b(o,"uVolumetric",B.o)
A.b(o,"uVolumetricStrength",B.aJ)
A.ao(o,s.c)
p.Z(3,0)},
$ix:1,
gm(){return this.a}}
A.cV.prototype={}
A.eP.prototype={
gB(){return"world"},
L(a,b){B.a.i(a.a,new A.D("worldOpaqueTransparent",B.ak,A.e([new A.j(this.e,B.e)],t.C),!1))},
K(a){var s=this,r=s.a.M(new A.a_("safeWorld",s.b,s.c,B.bR,B.m,B.bw)),q=s.e
return A.e([new A.fp(new A.V("worldOpaqueTransparent",A.e([new A.j(q,B.e)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iA:1}
A.fp.prototype={
I(a){var s,r,q=this,p=a.b,o=a.d,n=p.a
A.an(n,a.S(q.d).b)
A.a7(n,q.a.R())
A.bD(n,B.ad,1,0.04,0.03,0.03)
A.aN(n,q.b.b)
A.b(n,"uViewProjection",new A.d(B.k,new Float32Array(A.r(o.c.c.a))))
s=t.n
A.b(n,"uLightDir",new A.d(B.h,new Float32Array(A.r(A.e([0,1,0],s)))))
A.b(n,"uAmbientColor",new A.d(B.h,new Float32Array(A.r(A.e([1,1,1],s)))))
A.b(n,"uAmbientIntensity",new A.d(B.b,0))
A.b(n,"uAmbientLightScale",new A.d(B.b,1))
A.b(n,"uDirectLightScale",new A.d(B.b,1))
for(n=o.a,s=n.length,r=0;r<n.length;n.length===s||(0,A.C)(n),++r)q.bE(p,n[r])
for(o=o.b,n=o.length,r=0;r<o.length;o.length===n||(0,A.C)(o),++r)q.bE(p,o[r])},
bE(a,b){var s,r,q,p,o,n=this
if(b instanceof A.be){s=b.a
n.bO(a,s.gm().ga2())
A.ji(a,b,!0)
r=n.c.$1(s.gm().gU())
A.ao(a.a,r.a)
q=r.b
p=r.c
o=b.b.length
if(q)a.ba(p,r.d,o,0)
else a.b8(p,0,o)}else if(t.Y.b(b)){q=a.a
A.b(q,"uUseInstances",B.a5)
n.bO(a,b.gm().ga2())
r=n.c.$1(b.gm().gU())
A.ao(q,r.a)
q=r.b
p=r.c
if(q)a.b9(p,r.d,0)
else a.Z(p,0)}else throw A.c(A.n("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dF(b).j(0),null))},
bO(a,b){var s=b.ar(),r=a.a
A.b(r,"uModel",new A.d(B.k,new Float32Array(A.r(s.ga6()))))
A.b(r,"uNormalMatrix",new A.d(B.k,new Float32Array(A.r(s.cq().ga6()))))},
$ix:1,
gm(){return this.a}}
A.fV.prototype={
A(){return"GpuBufferUsage."+this.b}}
A.e_.prototype={
A(){return"GpuBufferKind."+this.b}}
A.h_.prototype={
A(){return"GpuTextureFilter."+this.b}}
A.h0.prototype={
A(){return"GpuTextureWrap."+this.b}}
A.fU.prototype={}
A.fZ.prototype={}
A.bT.prototype={
A(){return"GpuTargetAttachment."+this.b}}
A.cv.prototype={}
A.e0.prototype={
A(){return"GpuDeviceStatus."+this.b}}
A.c2.prototype={
A(){return"ShaderCompileStage."+this.b}}
A.cZ.prototype={
j(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.b5.prototype={
A(){return"UniformType."+this.b}}
A.d.prototype={}
A.cm.prototype={
A(){return"ClearMask."+this.b}}
A.dU.prototype={
Z(a,b){var s=this.a
if(s.b!==B.f)A.m(A.k(u.k))
s.a.drawArrays(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.a9(a,1)},
b8(a,b,c){var s=this.a
if(s.b!==B.f)A.m(A.k(u.k))
s.a.drawArraysInstanced(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.a9(a,c)},
b9(a,b,c){var s,r,q=this.a
if(q.b!==B.f)A.m(A.k(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.a9(a,1)},
ba(a,b,c,d){var s,r,q=this.a
if(q.b!==B.f)A.m(A.k(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.a8(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.a9(a,c)},
$im9:1}
A.ek.prototype={
cr(a){var s=this.b.n(0,a)
if(s==null)throw A.c(A.k("resource is not in candidate: "+a))
return s}}
A.fW.prototype={
gl(){var s=this.c
if(s==null)throw A.c(A.k("GPU resource adapter is not initialized"))
return s},
a5(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.d5(s.b)
r.b.a5()
r.c=null
r.e=!0},
bC(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.aA(a0,a1),a3=A.e([],t.p)
try{k=a4.a
j=k.$ti
i=j.h("z(1)")
j=j.h("a0<1>")
s=new A.a0(k,i.a(new A.fX()),j)
for(h=s,g=J.Y(h.a),h=new A.G(g,h.b,h.$ti.h("G<1>")),f=a.a;h.k();){r=g.gl()
q=A.kQ(f,a.bD(r,a5))
J.fs(a3,q)
J.dE(a2,r,q)}e=A.at(new A.a0(k,i.a(new A.fY()),j),j.h("i.E"))
B.a.cI(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.C)(k),++d){o=k[d]
n=A.lC(J.lZ(o,11))
if(i){h=J.jo(a2,"sceneColor")
h.toString
J.dE(a2,o,h)}else{h=n
if(typeof h!=="number")return h.bo()
if(h>=2){h=J.jo(a2,"sceneColor#1")
h.toString
J.dE(a2,o,h)}else{m=A.kQ(f,a.bD(o,a5))
J.fs(a3,m)
J.dE(a2,o,m)}}}a0=A.kf(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.K(a0).h("cX<1>"),a0=new A.cX(a0,k),a0=new A.ai(a0,a0.gp(0),k.h("ai<Q.E>")),j=a.a,i=t.V,k=k.h("Q.E");a0.k();){h=a0.d
l=h==null?k.a(h):h
b=i.a(a1.a(l).a)
A.jD(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}throw c}},
bD(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.cv(512,512,1,B.J,!0)
if(a==="sceneDepth")return new A.cv(n,m,1,B.J,!0)
s=B.c.H(a,"ssao")||B.c.H(a,"bloomBlur")||B.c.H(a,"dofBlur")||B.c.H(a,"volumetricLight")
r=s?(n+1)/2|0:n
q=s?(m+1)/2|0:m
p=a==="sceneColor"
o=p||B.c.H(a,"sceneColor#")
p=p?b.d:1
return new A.cv(r,q,p,o?B.ah:B.b8,o)},
d5(a){var s,r,q,p,o,n=A.jx(t.bS.a(a).gah(),t.j)
for(n=A.jH(n,n.r,A.t(n).c),s=this.a,r=t.V,q=n.$ti.c;n.k();){p=n.d
o=r.a((p==null?q.a(p):p).a)
A.jD(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}
A.fX.prototype={
$1(a){return!B.c.H(A.aP(a),"sceneColor#")},
$S:6}
A.fY.prototype={
$1(a){return B.c.H(A.aP(a),"sceneColor#")},
$S:6}
A.aL.prototype={
a4(a){var s,r
this.$ti.c.a(a)
if(a.gW().aw(0,0)||a.gW().bo(0,0))A.m(A.bU(B.am,a))
s=this.b
r=B.a.n(s,a.gW())
r.gaO()
a.gaO()
A.m(A.bU(B.an,a))
r.gaP()
r.gaP()
s=B.a.n(s,a.gW()).gdI()
return s},
bl(a){var s,r
this.$ti.c.a(a)
s=a.a
if(s<0||s>=0)throw A.c(A.bU(B.am,a))
r=this.b
if(!(s>=0&&s<0))return A.h(r,s)
r[s].gaO()
s=A.bU(B.an,a)
throw A.c(s)},
ac(){return new A.aO(this.e_(),this.$ti.h("aO<+(1,2)>"))},
e_(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j
return function $async$ac(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.a,n=s.b,m=0
case 3:if(!!1){r=5
break}if(!(m<0)){A.h(n,m)
r=1
break}l=n[m]
l.gaP()
l.gaP()
k=o.$3(m,l.gaO(),l.gey())
j=l.gdI()
r=6
return a.b=new A.bm(k,j),1
case 6:case 4:++m
r=3
break
case 5:case 1:return 0
case 2:return a.c=p.at(-1),3}}}}}
A.fu.prototype={
A(){return"BlendEquation."+this.b}}
A.dJ.prototype={
A(){return"BlendFactor."+this.b}}
A.fA.prototype={
A(){return"CullFace."+this.b}}
A.fE.prototype={
A(){return"DepthFunc."+this.b}}
A.dW.prototype={
bn(a){var s=this
return A.kh(s.f,s.d,s.r,s.e,!0,!0,!0,!0,!1,s.x,s.b,s.a,s.c,!0,!1,!1)}}
A.a6.prototype={
A(){return"StateField."+this.b}}
A.hU.prototype={
dL(a){var s,r=this.a
if(r==null)return A.mp(B.bA,t.d5)
s=A.ah(t.d5)
if(r.a!==a.a)s.i(0,B.X)
if(r.b!==a.b)s.i(0,B.Y)
if(r.c!==a.c)s.i(0,B.Z)
if(r.d!==a.d)s.i(0,B.a_)
if(r.e!==a.e||r.f!==a.f)s.i(0,B.a0)
if(r.r!==a.r)s.i(0,B.a1)
if(r.w!==a.w)s.i(0,B.a2)
if(r.x!==a.x)s.i(0,B.a3)
return s}}
A.b7.prototype={$iay:1}
A.dv.prototype={}
A.du.prototype={}
A.fo.prototype={}
A.eN.prototype={
cL(a){var s=this,r=A.a1(s.a.canvas)
s.c=A.dz(new A.hR(s))
s.d=A.dz(new A.hS(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
aj(a){var s=A.ce(this.a.getParameter(a))
return typeof s=="number"?B.v.ej(s):0},
bJ(a){var s=A.ce(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
$ime:1}
A.hR.prototype={
$1(a){A.a1(a).preventDefault()
this.a.b=B.A},
$S:11}
A.hS.prototype={
$1(a){this.a.b=B.f},
$S:11}
A.is.prototype={
dA(){var s,r=this
if(r.b!==B.f)A.m(A.k(u.k))
s=r.w?A.a4(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.b7(new A.fo(s))},
bX(a){var s=a.a
if(!(s instanceof A.fo))throw A.c(A.aT(a,"query","is not a GPU timer query"))
return s}}
A.fn.prototype={}
A.hQ.prototype={}
A.hT.prototype={
dJ(a){var s=A.a4(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.hQ(A.mZ(s))}}
A.j6.prototype={
$1(a){var s=a.a===B.R?2:1
return new A.cU(a,384,216,s,a===B.S?0:1)},
$S:58}
A.j5.prototype={
$1(a){var s,r,q,p=a.c/a.d
if(!B.x.gP(0)||B.x.gab()<1e-12)A.m(A.n("CameraView.look requires a finite, nonzero forward: "+B.x.j(0),null))
if(!isFinite(1))A.m(A.n("CameraView.look requires 0 < fovYRadians < pi: 1",null))
s=B.x.gbg()
if(B.p.b6(s).gab()<1e-12)A.m(A.n("CameraView.look requires up ("+B.p.j(0)+") not parallel to forward ("+B.x.j(0)+")",null))
r=A.kp(B.E,s,B.p)
q=A.kq(p,100,1,0.1)
p=new A.br(r,q,q.G(0,r),B.E,s,0.1,100,p)
p.D()
return p},
$S:59}
A.j9.prototype={
$0(){var s=this,r=s.b,q=s.c
r.setAttribute("data-renderer-state",q.e.b)
r.setAttribute("data-renderer-backend","pixeldart")
r.setAttribute("data-renderer-requested-profile",s.d)
q=q.as
r.setAttribute("data-renderer-effective-profile",(q==null?A.m(A.k("renderer is not initialized")):q).a.a.b)
q=s.e.gdN()
if(q==null)q="false"
r.setAttribute("data-renderer-profile-fallback",q)
q=s.f
r.setAttribute("data-renderer-frames",""+q.a)
r.setAttribute("data-renderer-history-epoch",""+q.b)
q=s.a.a
r.setAttribute("data-renderer-surface",""+q.c+"x"+q.d)},
$S:0}
A.ja.prototype={
$0(){var s,r,q,p=this,o=p.b,n=A.a(o.clientWidth)>0?A.a(o.clientWidth):A.a(o.width),m=A.a(o.clientHeight)>0?A.a(o.clientHeight):A.a(o.height),l=p.a,k=l.a
if(n===k.a&&m===k.b)return
k=k.e
r=A.kC(m,n,k,k,!0)
l.a=r
o.width=r.c
o.height=l.a.d
try{l=l.a
p.c.aC()
l.D()
p.d.bf("surface resized")
o.removeAttribute("data-renderer-resize-error")}catch(q){s=A.b9(q)
o.setAttribute("data-renderer-resize-error",A.p(s))}},
$S:0}
A.j7.prototype={
$1(a){A.a1(a)
return this.a.$0()},
$S:60}
A.j8.prototype={
$1(a){A.a1(a)
this.a.b=!0
this.b.bf("gl context restored")},
$S:61}
A.jb.prototype={
$1(a){var s,r,q,p,o=this
A.iu(a)
o.b.$0()
r=o.c
if(r.e!==B.D||o.a.b)try{q=o.a
r.c1(o.d,o.e.co(o.f.$1(q.a),B.a8,B.ab,a/1000))
r.c8()
q.b=!1
o.r.removeAttribute("data-renderer-frame-error")}catch(p){s=A.b9(p)
o.r.setAttribute("data-renderer-frame-error",A.p(s))
if(r.e===B.D)o.e.bf("gl context lost")}o.w.$0()
A.a(A.a1(v.G.window).requestAnimationFrame(A.dz(o)))},
$S:62};(function aliases(){var s=J.bh.prototype
s.cK=s.j})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"o8","mk",63)
r(A,"oy","na",4)
r(A,"oz","nb",4)
r(A,"oA","nc",4)
q(A,"ly","ot",0)
p(A.e8.prototype,"ge7","e8",12)
var o
p(o=A.eD.prototype,"ge3","e4",3)
p(o,"geb","ec",3)
p(o,"ged","ee",3)
p(o,"ge5","e6",3)
p(o,"ge9","ea",3)
q(A,"lz","nd",65)
q(A,"pB","jA",44)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.w,null)
q(A.w,[A.ju,J.e3,A.cY,J.ci,A.i,A.ck,A.E,A.y,A.hE,A.ai,A.cH,A.G,A.aa,A.bC,A.b6,A.bX,A.co,A.bH,A.b2,A.hK,A.hh,A.ct,A.dj,A.bd,A.bx,A.h4,A.cE,A.aY,A.cD,A.aC,A.f2,A.il,A.ij,A.eQ,A.aF,A.ar,A.eV,A.bE,A.O,A.eR,A.fh,A.dw,A.d8,A.f4,A.bI,A.db,A.dq,A.fj,A.bR,A.dR,A.io,A.bs,A.hZ,A.eh,A.d_,A.i_,A.aU,A.R,A.U,A.fi,A.ac,A.ds,A.hM,A.fe,A.hg,A.hq,A.ak,A.fy,A.fz,A.hn,A.br,A.fN,A.fO,A.fQ,A.b0,A.h1,A.aK,A.dL,A.bW,A.af,A.fD,A.hi,A.ho,A.er,A.d1,A.cU,A.N,A.fR,A.e8,A.eH,A.hd,A.eD,A.be,A.dY,A.dZ,A.fP,A.fM,A.c7,A.D,A.a5,A.M,A.j,A.cn,A.hp,A.a_,A.hr,A.V,A.ht,A.hs,A.cT,A.hA,A.i0,A.ih,A.f7,A.f1,A.fb,A.f6,A.ib,A.ae,A.W,A.fC,A.fB,A.by,A.fS,A.bY,A.au,A.cj,A.eT,A.dK,A.eU,A.dT,A.eX,A.cr,A.eZ,A.dV,A.f_,A.e1,A.f3,A.cI,A.f5,A.bQ,A.dM,A.jB,A.cR,A.f8,A.en,A.f9,A.bA,A.ew,A.fc,A.ex,A.fd,A.ez,A.fg,A.ey,A.ff,A.eL,A.fk,A.eM,A.fm,A.fl,A.cV,A.eP,A.fp,A.fU,A.fZ,A.cv,A.cZ,A.d,A.dU,A.ek,A.fW,A.aL,A.dW,A.hU,A.b7,A.dv,A.du,A.fo,A.fn,A.is,A.hQ,A.hT])
q(J.e3,[J.e5,J.cy,J.cA,J.cz,J.cB,J.bV,J.bf])
q(J.cA,[J.bh,J.u,A.bZ,A.cM])
q(J.bh,[J.ej,J.bB,J.bg])
r(J.e4,A.cY)
r(J.h3,J.u)
q(J.bV,[J.cx,J.e6])
q(A.i,[A.c5,A.q,A.aB,A.a0,A.bG,A.aO])
r(A.dx,A.c5)
r(A.d6,A.dx)
r(A.cl,A.d6)
q(A.E,[A.cC,A.b3,A.e7,A.eG,A.es,A.f0,A.dG,A.aH,A.d3,A.eF,A.c3,A.dQ])
r(A.c4,A.y)
r(A.dP,A.c4)
q(A.q,[A.Q,A.bw,A.aZ,A.aX,A.bF,A.da])
q(A.Q,[A.d0,A.b_,A.cX])
r(A.cs,A.aB)
r(A.bl,A.b6)
q(A.bl,[A.bm,A.dg,A.dh])
r(A.c8,A.bX)
r(A.bk,A.c8)
r(A.cp,A.bk)
r(A.H,A.co)
q(A.b2,[A.cq,A.di,A.dr])
r(A.aI,A.cq)
r(A.cP,A.b3)
q(A.bd,[A.dN,A.dO,A.eC,A.j0,A.j2,A.hW,A.hV,A.iv,A.i9,A.ic,A.h8,A.je,A.jf,A.iV,A.fv,A.fw,A.iW,A.hk,A.hb,A.he,A.hG,A.hI,A.fI,A.fG,A.fH,A.hl,A.hm,A.hy,A.hx,A.hw,A.hv,A.hu,A.hz,A.iM,A.iN,A.hB,A.hC,A.jm,A.jk,A.fT,A.ha,A.iT,A.fX,A.fY,A.hR,A.hS,A.j6,A.j5,A.j7,A.j8,A.jb])
q(A.eC,[A.eA,A.bP])
q(A.bx,[A.aW,A.d7])
q(A.dO,[A.j1,A.iw,A.iR,A.ia,A.h5,A.h9,A.hO,A.hN,A.jg,A.hf,A.hH,A.jh,A.fJ,A.hD,A.jl,A.jj])
q(A.cM,[A.e9,A.a2])
q(A.a2,[A.dc,A.de])
r(A.dd,A.dc)
r(A.cK,A.dd)
r(A.df,A.de)
r(A.cL,A.df)
q(A.cK,[A.cJ,A.ea])
q(A.cL,[A.eb,A.ec,A.ed,A.ee,A.ef,A.cN,A.cO])
r(A.dk,A.f0)
q(A.dN,[A.hX,A.hY,A.ik,A.i1,A.i5,A.i4,A.i3,A.i2,A.i8,A.i7,A.i6,A.ig,A.iQ,A.iq,A.ip,A.iL,A.iE,A.iF,A.iK,A.iz,A.iB,A.iA,A.iJ,A.ix,A.iy,A.iG,A.iH,A.iI,A.iD,A.iC,A.iO,A.iP,A.iU,A.j9,A.ja])
r(A.d5,A.eV)
r(A.fa,A.dw)
r(A.d9,A.d7)
r(A.aE,A.di)
r(A.d2,A.dr)
q(A.bR,[A.dI,A.dX])
q(A.dR,[A.ft,A.hP])
r(A.eK,A.dX)
q(A.aH,[A.cS,A.e2])
r(A.eW,A.ds)
q(A.hZ,[A.c0,A.hJ,A.cw,A.aD,A.fx,A.c1,A.bS,A.az,A.eq,A.aV,A.cW,A.ev,A.cu,A.eS,A.eY,A.fV,A.e_,A.h_,A.h0,A.bT,A.e0,A.c2,A.b5,A.cm,A.fu,A.dJ,A.fA,A.fE,A.a6])
q(A.b0,[A.aj,A.am,A.aJ,A.ei,A.bv])
r(A.et,A.fb)
r(A.eN,A.fn)
s(A.c4,A.bC)
s(A.dx,A.y)
s(A.dc,A.y)
s(A.dd,A.aa)
s(A.de,A.y)
s(A.df,A.aa)
s(A.c8,A.dq)
s(A.dr,A.fj)
s(A.fb,A.ib)
s(A.fn,A.is)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{f:"int",o:"double",a9:"num",l:"String",z:"bool",U:"Null",v:"List",w:"Object",Z:"Map",F:"JSObject"},mangledNames:{},types:["~()","ay()","z(D)","ay(am?)","~(~())","~(@)","z(l)","z(j)","U(@)","U()","@()","U(w?)","jz(aJ)","@(@,l)","Z<l,l>(Z<l,l>,l)","0&(l,f?)","w?(w?)","z(aK)","l(aK)","z(ak)","f(+influence,light(o,af),+influence,light(o,af))","U(~())","@(@)","aJ(f,f,l?)","aj(f,f,l?)","f(f,+(aj,hc))","U(@,bj)","am(f,f,l?)","z(eE?)","f(f,+(am,ii))","f(+influence,source(o,d4),+influence,source(o,d4))","l(D)","f(x,x)","~(@,@)","~(f,@)","z(f)","bv(f,f,l?)","cV(aj)","ay(l{fallback:l?})","U(w,bj)","af?()","v<af>()","br()","o()","z()","ay?()","z(R<l,N>)","N(R<l,N>)","N(N,N)","f(W<ae>,W<ae>)","b1(W<ae>)","f(W<bc>,W<bc>)","b1(W<bc>)","by(o,o,o,o)","z(o)","~(bA)","bA()","@(l)","cU(ak)","br(d1)","~(F)","U(F)","~(a9)","f(@,@)","~(w?,w?)","c7()","bQ()"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.bm&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.dg&&a.b(c.a)&&b.b(c.b),"2;influence,source":(a,b)=>c=>c instanceof A.dh&&a.b(c.a)&&b.b(c.b)}}
A.nt(v.typeUniverse,JSON.parse('{"ej":"bh","bB":"bh","bg":"bh","pg":"bZ","u":{"v":["1"],"q":["1"],"F":[],"i":["1"]},"e5":{"z":[],"B":[]},"cy":{"B":[]},"cA":{"F":[]},"bh":{"F":[]},"e4":{"cY":[]},"h3":{"u":["1"],"v":["1"],"q":["1"],"F":[],"i":["1"]},"ci":{"I":["1"]},"bV":{"o":[],"a9":[],"ad":["a9"]},"cx":{"o":[],"f":[],"a9":[],"ad":["a9"],"B":[]},"e6":{"o":[],"a9":[],"ad":["a9"],"B":[]},"bf":{"l":[],"ad":["l"],"ks":[],"B":[]},"c5":{"i":["2"]},"ck":{"I":["2"]},"d6":{"y":["2"],"v":["2"],"c5":["1","2"],"q":["2"],"i":["2"]},"cl":{"d6":["1","2"],"y":["2"],"v":["2"],"c5":["1","2"],"q":["2"],"i":["2"],"y.E":"2","i.E":"2"},"cC":{"E":[]},"dP":{"y":["f"],"bC":["f"],"v":["f"],"q":["f"],"i":["f"],"y.E":"f","bC.E":"f"},"q":{"i":["1"]},"Q":{"q":["1"],"i":["1"]},"d0":{"Q":["1"],"q":["1"],"i":["1"],"i.E":"1","Q.E":"1"},"ai":{"I":["1"]},"aB":{"i":["2"],"i.E":"2"},"cs":{"aB":["1","2"],"q":["2"],"i":["2"],"i.E":"2"},"cH":{"I":["2"]},"b_":{"Q":["2"],"q":["2"],"i":["2"],"i.E":"2","Q.E":"2"},"a0":{"i":["1"],"i.E":"1"},"G":{"I":["1"]},"c4":{"y":["1"],"bC":["1"],"v":["1"],"q":["1"],"i":["1"]},"cX":{"Q":["1"],"q":["1"],"i":["1"],"i.E":"1","Q.E":"1"},"bm":{"bl":[],"b6":[]},"dg":{"bl":[],"b6":[]},"dh":{"bl":[],"b6":[]},"cp":{"bk":["1","2"],"c8":["1","2"],"bX":["1","2"],"dq":["1","2"],"Z":["1","2"]},"co":{"Z":["1","2"]},"H":{"co":["1","2"],"Z":["1","2"]},"bG":{"i":["1"],"i.E":"1"},"bH":{"I":["1"]},"cq":{"b2":["1"],"bi":["1"],"q":["1"],"i":["1"]},"aI":{"cq":["1"],"b2":["1"],"bi":["1"],"q":["1"],"i":["1"]},"cP":{"b3":[],"E":[]},"e7":{"E":[]},"eG":{"E":[]},"dj":{"bj":[]},"bd":{"bt":[]},"dN":{"bt":[]},"dO":{"bt":[]},"eC":{"bt":[]},"eA":{"bt":[]},"bP":{"bt":[]},"es":{"E":[]},"aW":{"bx":["1","2"],"km":["1","2"],"Z":["1","2"]},"bw":{"q":["1"],"i":["1"],"i.E":"1"},"cE":{"I":["1"]},"aZ":{"q":["1"],"i":["1"],"i.E":"1"},"aY":{"I":["1"]},"aX":{"q":["R<1,2>"],"i":["R<1,2>"],"i.E":"R<1,2>"},"cD":{"I":["R<1,2>"]},"bl":{"b6":[]},"bZ":{"F":[],"B":[]},"cM":{"F":[]},"e9":{"F":[],"B":[]},"a2":{"ag":["1"],"F":[]},"cK":{"y":["o"],"a2":["o"],"v":["o"],"ag":["o"],"q":["o"],"F":[],"i":["o"],"aa":["o"]},"cL":{"y":["f"],"a2":["f"],"v":["f"],"ag":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"]},"cJ":{"fK":[],"y":["o"],"a2":["o"],"v":["o"],"ag":["o"],"q":["o"],"F":[],"i":["o"],"aa":["o"],"B":[],"y.E":"o"},"ea":{"fL":[],"y":["o"],"a2":["o"],"v":["o"],"ag":["o"],"q":["o"],"F":[],"i":["o"],"aa":["o"],"B":[],"y.E":"o"},"eb":{"y":["f"],"a2":["f"],"v":["f"],"ag":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"B":[],"y.E":"f"},"ec":{"y":["f"],"a2":["f"],"v":["f"],"ag":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"B":[],"y.E":"f"},"ed":{"y":["f"],"a2":["f"],"v":["f"],"ag":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"B":[],"y.E":"f"},"ee":{"y":["f"],"a2":["f"],"v":["f"],"ag":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"B":[],"y.E":"f"},"ef":{"y":["f"],"a2":["f"],"v":["f"],"ag":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"B":[],"y.E":"f"},"cN":{"y":["f"],"a2":["f"],"v":["f"],"ag":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"B":[],"y.E":"f"},"cO":{"eE":[],"y":["f"],"a2":["f"],"v":["f"],"ag":["f"],"q":["f"],"F":[],"i":["f"],"aa":["f"],"B":[],"y.E":"f"},"f0":{"E":[]},"dk":{"b3":[],"E":[]},"aF":{"I":["1"]},"aO":{"i":["1"],"i.E":"1"},"ar":{"E":[]},"d5":{"eV":["1"]},"O":{"bu":["1"]},"dw":{"kR":[]},"fa":{"dw":[],"kR":[]},"d7":{"bx":["1","2"],"Z":["1","2"]},"d9":{"d7":["1","2"],"bx":["1","2"],"Z":["1","2"]},"bF":{"q":["1"],"i":["1"],"i.E":"1"},"d8":{"I":["1"]},"aE":{"b2":["1"],"kn":["1"],"bi":["1"],"q":["1"],"i":["1"]},"bI":{"I":["1"]},"y":{"v":["1"],"q":["1"],"i":["1"]},"bx":{"Z":["1","2"]},"da":{"q":["2"],"i":["2"],"i.E":"2"},"db":{"I":["2"]},"bX":{"Z":["1","2"]},"bk":{"c8":["1","2"],"bX":["1","2"],"dq":["1","2"],"Z":["1","2"]},"b2":{"bi":["1"],"q":["1"],"i":["1"]},"di":{"b2":["1"],"bi":["1"],"q":["1"],"i":["1"]},"d2":{"b2":["1"],"fj":["1"],"bi":["1"],"q":["1"],"i":["1"]},"dI":{"bR":["v<f>","l"]},"dX":{"bR":["l","v<f>"]},"eK":{"bR":["l","v<f>"]},"bs":{"ad":["bs"]},"o":{"a9":[],"ad":["a9"]},"f":{"a9":[],"ad":["a9"]},"v":{"q":["1"],"i":["1"]},"a9":{"ad":["a9"]},"bi":{"q":["1"],"i":["1"]},"l":{"ad":["l"],"ks":[]},"dG":{"E":[]},"b3":{"E":[]},"aH":{"E":[]},"cS":{"E":[]},"e2":{"E":[]},"d3":{"E":[]},"eF":{"E":[]},"c3":{"E":[]},"dQ":{"E":[]},"eh":{"E":[]},"d_":{"E":[]},"fi":{"bj":[]},"ac":{"mM":[]},"ds":{"eI":[]},"fe":{"eI":[]},"eW":{"eI":[]},"aj":{"b0":[]},"am":{"b0":[]},"aJ":{"b0":[]},"bv":{"b0":[]},"ei":{"b0":[]},"cT":{"mH":[]},"f7":{"mG":[]},"f1":{"mc":[]},"et":{"mK":[]},"ae":{"ad":["ae"]},"bc":{"ad":["bc"]},"cj":{"A":[]},"eT":{"x":[]},"dK":{"A":[]},"eU":{"x":[]},"dT":{"A":[]},"eX":{"x":[]},"cr":{"A":[]},"eZ":{"x":[]},"dV":{"A":[]},"f_":{"x":[]},"e1":{"A":[]},"f3":{"x":[]},"cI":{"A":[]},"f5":{"x":[]},"dM":{"mF":[]},"cR":{"A":[]},"f8":{"x":[]},"en":{"A":[]},"f9":{"x":[]},"ew":{"A":[]},"fc":{"x":[]},"ex":{"A":[]},"fd":{"x":[]},"ez":{"A":[]},"fg":{"x":[]},"ey":{"A":[]},"ff":{"x":[]},"eL":{"A":[]},"fk":{"x":[]},"eM":{"A":[]},"fm":{"x":[]},"fl":{"x":[]},"eP":{"A":[]},"fp":{"x":[]},"dU":{"m9":[]},"b7":{"ay":[]},"eN":{"me":[]},"mh":{"v":["f"],"q":["f"],"i":["f"]},"eE":{"v":["f"],"q":["f"],"i":["f"]},"mS":{"v":["f"],"q":["f"],"i":["f"]},"mf":{"v":["f"],"q":["f"],"i":["f"]},"mQ":{"v":["f"],"q":["f"],"i":["f"]},"mg":{"v":["f"],"q":["f"],"i":["f"]},"mR":{"v":["f"],"q":["f"],"i":["f"]},"fK":{"v":["o"],"q":["o"],"i":["o"]},"fL":{"v":["o"],"q":["o"],"i":["o"]}}'))
A.ns(v.typeUniverse,JSON.parse('{"c4":1,"dx":2,"a2":1,"di":1,"dr":1,"dR":2}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",b:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nuniform vec3 uClearColor;\nuniform vec3 uSkyHorizon;\nuniform vec3 uSkyZenith;\nuniform vec3 uSkyGround;\nuniform float uSkyEnabled;\nuniform float uSkyHorizonGlow;\nuniform float uSkyStarDensity;\nuniform sampler2D uSkyTexture;\nuniform float uSkyTextureEnabled;\nuniform float uSkyRotation;\nuniform float uSkyExposure;\nuniform float uSkyTextureSrgb;\nuniform mat4 uInverseProjection;\nuniform mat4 uInverseView;\nuniform vec3 uCameraPosition;\nuniform float uCloudCoverage;\nuniform float uCloudDensity;\nuniform float uCloudBaseHeight;\nuniform float uCloudThickness;\nuniform float uCloudScale;\nuniform vec2 uCloudWind;\nuniform float uCloudPhase;\nuniform float uCloudDetail;\nuniform float uCloudSilverLining;\nuniform float uCloudSampleCount;\nuniform vec3 uCloudLightDirection;\nuniform vec3 uCloudLightColor;\nuniform float uCloudLightIntensity;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 acesToneMap(vec3 color){\n  return clamp((color*(2.51*color+0.03))/(color*(2.43*color+0.59)+0.14),0.0,1.0);\n}\n\nvec3 agxToneMap(vec3 color){\n  const mat3 agxMat=mat3(\n    0.842479062253094,0.0423282422610123,0.0423756549057051,\n    0.0784335999999992,0.878468636469772,0.0784336,\n    0.0792237451477643,0.0791661274605434,0.879142973793104\n  );\n  const mat3 agxMatInv=mat3(\n    1.19687902425764,-0.0528968517032958,-0.0529716355080549,\n    -0.0980208811401368,1.15190312990417,-0.0980434501171241,\n    -0.0990297440797205,-0.0989611768448433,1.15107367264185\n  );\n  vec3 val=agxMat*color;\n  val=clamp(log2(max(val,vec3(1e-10)))*0.0625+0.625,0.0,1.0);\n  val=val*val*val*(val*(val*6.0-15.0)+10.0);\n  val=agxMatInv*val;\n  return max(val,vec3(0.0));\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nvec3 skyBackground(vec2 uv){\n  // A deliberately cheap, high-quality fallback sky: three atmospheric bands\n  // provide depth at every camera angle, while the tiny deterministic star\n  // field and horizon glow keep the clear background from reading as a flat\n  // color. It is an environment layer, not a game/weather simulation.\n  float lower=smoothstep(0.0,0.48,uv.y);\n  float upper=smoothstep(0.42,1.0,uv.y);\n  vec3 color=mix(uSkyGround,uSkyHorizon,lower);\n  color=mix(color,uSkyZenith,upper);\n  float horizonGlow=exp(-pow((uv.y-0.48)*7.0,2.0));\n  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);\n  float starMask=smoothstep(0.62,0.92,uv.y);\n  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),hash(floor(uv*vec2(180.0,100.0))))*starMask;\n  color+=vec3(0.16,0.19,0.24)*stars;\n  return max(color,vec3(0.0));\n}\n\nfloat hash3(vec3 p){\n  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);\n}\n\nfloat valueNoise(vec3 p){\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  f=f*f*(3.0-2.0*f);\n  float n000=hash3(i+vec3(0,0,0));\n  float n100=hash3(i+vec3(1,0,0));\n  float n010=hash3(i+vec3(0,1,0));\n  float n110=hash3(i+vec3(1,1,0));\n  float n001=hash3(i+vec3(0,0,1));\n  float n101=hash3(i+vec3(1,0,1));\n  float n011=hash3(i+vec3(0,1,1));\n  float n111=hash3(i+vec3(1,1,1));\n  float x00=mix(n000,n100,f.x);\n  float x10=mix(n010,n110,f.x);\n  float x01=mix(n001,n101,f.x);\n  float x11=mix(n011,n111,f.x);\n  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);\n}\n\nfloat cloudNoise(vec3 p){\n  float value=0.0;\n  float amplitude=0.5;\n  for(int octave=0;octave<4;octave++){\n    value+=valueNoise(p)*amplitude;\n    p=p*2.03+vec3(17.3,11.7,7.1);\n    amplitude*=0.5;\n  }\n  return value;\n}\n\nfloat cloudDensityAt(vec3 position){\n  float height01=clamp(\n    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),\n    0.0,1.0\n  );\n  float vertical=smoothstep(0.0,0.12,height01)*\n    (1.0-smoothstep(0.72,1.0,height01));\n  vec3 q=position*max(uCloudScale,0.00001)+\n    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);\n  float macro=cloudNoise(q*0.82);\n  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));\n  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));\n  float threshold=1.0-clamp(uCloudCoverage,0.,1.);\n  float body=smoothstep(threshold,threshold+0.26,shape);\n  return body*vertical*clamp(uCloudDensity,0.,1.);\n}\n\nvec4 volumetricClouds(vec3 worldDirection){\n  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){\n    return vec4(0.0);\n  }\n  float directionY=max(worldDirection.y,0.001);\n  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;\n  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;\n  startT=max(startT,0.0);\n  endT=max(endT,0.0);\n  if(endT<=startT) return vec4(0.0);\n  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));\n  float stepLength=(endT-startT)/float(sampleCount);\n  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;\n  vec3 sunDirection=normalize(-uCloudLightDirection);\n  float transmittance=1.0;\n  vec3 inScatter=vec3(0.0);\n  for(int i=0;i<24;i++){\n    if(i>=sampleCount) break;\n    float t=startT+(float(i)+0.5)*stepLength+jitter;\n    vec3 position=uCameraPosition+worldDirection*t;\n    float density=cloudDensityAt(position);\n    float opticalDepth=density*stepLength*0.0035;\n    float segmentAlpha=1.0-exp(-opticalDepth);\n    float towardLight=cloudDensityAt(position+sunDirection*90.0);\n    float lightTransmittance=exp(-towardLight*0.025);\n    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);\n    vec3 ambient=uSkyHorizon*0.32;\n    vec3 direct=uCloudLightColor*\n      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;\n    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;\n    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);\n    inScatter+=transmittance*segmentAlpha*sampleLight;\n    transmittance*=1.0-segmentAlpha;\n    if(transmittance<0.01) break;\n  }\n  return vec4(inScatter,1.0-transmittance);\n}\n\nvec3 srgbToLinear(vec3 color){\n  vec3 low=color/12.92;\n  vec3 high=pow((color+0.055)/1.055,vec3(2.4));\n  return mix(low,high,step(vec3(0.04045),color));\n}\n\nvec3 worldDirectionForUv(vec2 uv){\n  vec2 ndc=uv*2.0-1.0;\n  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);\n  return normalize(viewPoint.xyz/viewPoint.w);\n}\n\nvec3 equirectangularSky(vec2 uv){\n  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);\n  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;\n  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));\n  vec2 sampleUv=vec2(\n    fract(longitude/(2.0*3.14159265359)+0.5),\n    0.5-latitude/3.14159265359\n  );\n  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));\n  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));\n  return linear*max(uSkyExposure,0.0);\n}\n\nvoid main(){\n  vec4 source=texture(uTex,vUv);\n  // The world pass clears untouched pixels to uClearColor. Replace only that\n  // exact background, so the sky is always active without covering geometry.\n  if(uSkyEnabled>0.5 && distance(source.rgb,uClearColor)<0.004){\n    vec3 viewDirection=worldDirectionForUv(vUv);\n    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);\n    source.rgb=uSkyTextureEnabled>0.5\n      ? equirectangularSky(vUv)\n      : skyBackground(vUv);\n    vec4 clouds=volumetricClouds(worldDirection);\n    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;\n  }\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  vec3 mapped=uToneMap>3.0\n    ?agxToneMap(color)\n    :(uToneMap>1.5?acesToneMap(color):reinhardToneMap(color));\n  float toneMix=uToneMap>3.0\n    ?clamp(uToneMap-3.0,0.,1.)\n    :(uToneMap>1.5?clamp(uToneMap-1.5,0.,1.):clamp(uToneMap,0.,1.));\n  color=mix(color,mapped,toneMix);\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  // Atmospheric precipitation is submitted as depth-tested world geometry;\n  // the present pass must never paint weather over unrelated surfaces.\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",k:"WebGl2Device: operation attempted while context is not ready"}
var t=(function rtii(){var s=A.bo
return{v:s("ar"),fW:s("dL"),do:s("bQ"),e8:s("ad<@>"),dN:s("cn"),I:s("H<l,f>"),P:s("aI<l>"),df:s("bs"),gw:s("q<@>"),Q:s("E"),B:s("fK"),gN:s("fL"),b:s("N"),Z:s("bt"),j:s("ay"),cr:s("i<cn>"),bM:s("i<o>"),hf:s("i<@>"),hb:s("i<f>"),p:s("u<ay>"),b7:s("u<a5>"),gk:s("u<be>"),cU:s("u<D>"),dV:s("u<by>"),eT:s("u<aK>"),cw:s("u<+influence,light(o,af)>"),gg:s("u<+influence,source(o,d4)>"),q:s("u<A>"),u:s("u<x>"),cR:s("u<cT>"),C:s("u<j>"),c4:s("u<kx>"),G:s("u<b1>"),aM:s("u<W<bc>>"),c1:s("u<W<ae>>"),w:s("u<af>"),s:s("u<l>"),r:s("u<d4>"),cL:s("u<f6>"),ha:s("u<jJ<jz>>"),c9:s("u<jJ<hc>>"),aO:s("u<jJ<kx>>"),fq:s("u<jJ<ii>>"),n:s("u<o>"),E:s("u<@>"),t:s("u<f>"),T:s("cy"),m:s("F"),cj:s("bg"),aU:s("ag<@>"),_:s("v<a5>"),O:s("v<D>"),dy:s("v<l>"),aH:s("v<@>"),L:s("v<f>"),ao:s("R<l,N>"),bS:s("Z<l,ay>"),a1:s("Z<l,D>"),f:s("Z<l,l>"),eL:s("aJ"),cA:s("aj"),a:s("U"),K:s("w"),fy:s("ae"),z:s("D"),x:s("aK"),W:s("ak"),gT:s("pi"),bQ:s("+()"),ai:s("+(aj,hc)"),dU:s("+(am,ii)"),fk:s("+influence,light(o,af)"),eS:s("+influence,source(o,d4)"),fA:s("x"),b0:s("aL<bv,kx>"),ex:s("aL<aJ,jz>"),cE:s("aL<aj,hc>"),g2:s("aL<am,ii>"),J:s("j"),Y:s("b1"),U:s("bi<l>"),cJ:s("bi<f>"),d:s("W<bc>"),k:s("W<ae>"),l:s("bj"),d5:s("a6"),N:s("l"),aj:s("am"),aX:s("mP"),dm:s("B"),eK:s("b3"),ak:s("bB"),h:s("bk<l,l>"),am:s("d2<l>"),bw:s("eH"),dD:s("eI"),c:s("O<@>"),cd:s("O<~>"),hg:s("d9<w?,w?>"),a8:s("c7"),eM:s("aO<b1>"),V:s("du"),R:s("dv"),y:s("z"),al:s("z(w)"),i:s("o"),A:s("@"),fO:s("@()"),D:s("@(w)"),e:s("@(w,bj)"),S:s("f"),eH:s("bu<U>?"),du:s("u<w?>?"),an:s("F?"),X:s("w?"),dk:s("l?"),F:s("bE<@,@>?"),g:s("f4?"),fQ:s("z?"),cD:s("o?"),h6:s("f?"),cg:s("a9?"),o:s("a9"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.bl=J.e3.prototype
B.a=J.u.prototype
B.i=J.cx.prototype
B.v=J.bV.prototype
B.c=J.bf.prototype
B.bm=J.bg.prototype
B.bn=J.cA.prototype
B.P=A.cJ.prototype
B.av=A.cO.prototype
B.aw=J.ej.prototype
B.a6=J.bB.prototype
B.a7=new A.fu(0,"add")
B.aN=new A.dJ(0,"zero")
B.F=new A.dJ(1,"one")
B.d9=new A.ft()
B.aO=new A.dI()
B.da=new A.fD()
B.bo=new A.bW(0.03,0.03,0.04)
B.B=new A.bW(0,0,0)
B.C=new A.bW(1,1,1)
B.bx=s([],A.bo("u<ph>"))
B.N=s([],t.w)
B.ao=s([],t.r)
B.ap=s([],A.bo("u<mP>"))
B.a8=new A.fN()
B.ai=new A.h_(1,"linear")
B.aj=new A.h0(0,"clampToEdge")
B.aP=new A.fZ()
B.a9=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.aQ=function() {
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
B.aV=function(getTagFallback) {
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
B.aR=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.aU=function(hooks) {
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
B.aT=function(hooks) {
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
B.aS=function(hooks) {
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

B.aW=new A.eh()
B.cE=new A.hJ(1,"reinhard")
B.ab=new A.hn()
B.j=new A.hE()
B.p=new A.au(0,1,0)
B.u=new A.au(0,-1,0)
B.aX=new A.af()
B.ac=new A.eK()
B.aY=new A.hT()
B.n=new A.fa()
B.y=new A.fi()
B.G=new A.cm(0,"colorOnly")
B.ad=new A.cm(1,"colorAndDepth")
B.H=new A.cm(2,"depthOnly")
B.I=new A.fx(1,"srgb")
B.ae=new A.fA(1,"back")
B.af=new A.fE(0,"less")
B.aZ=new A.dW(!1,B.af,!1,!0,B.F,B.F,B.a7,!1,B.ae,!0,!1,!0,!0,!0,!0,!1)
B.b_=new A.N(0,0,0)
B.b0=new A.bS(0,"idle")
B.z=new A.bS(1,"active")
B.b1=new A.bS(2,"ended")
B.b2=new A.bS(3,"aborted")
B.ag=new A.cu(0,"outside")
B.b3=new A.cu(1,"intersects")
B.b4=new A.cu(2,"inside")
B.b5=new A.e_(0,"vertex")
B.b6=new A.e_(1,"indices")
B.b7=new A.fV(0,"staticDraw")
B.f=new A.e0(0,"ready")
B.A=new A.e0(1,"lost")
B.b8=new A.bT(0,"color")
B.ah=new A.bT(1,"colorAndGlow")
B.b9=new A.bT(2,"colorDepthGlow")
B.J=new A.bT(3,"depthOnly")
B.ba=new A.aV(0,"beforeShadow")
B.bb=new A.aV(2,"beforeDepth")
B.K=new A.aV(3,"afterDepth")
B.ak=new A.aV(4,"beforeWorld")
B.bc=new A.aV(5,"afterWorld")
B.q=new A.aV(6,"afterResolve")
B.bd=new A.aV(9,"beforePresent")
B.al=new A.az(0,"readBeforeWrite")
B.be=new A.az(1,"duplicateWriter")
B.bf=new A.az(2,"sampledMultisampledAttachment")
B.L=new A.az(3,"invalidResolve")
B.bg=new A.az(4,"formatOrSizeMismatch")
B.bh=new A.az(5,"unversionedReadWrite")
B.bi=new A.az(6,"invalidHistoryRead")
B.bj=new A.az(7,"dependencyCycle")
B.bk=new A.az(8,"missingCapability")
B.am=new A.cw(0,"wrongKind")
B.an=new A.cw(1,"staleGeneration")
B.M=new A.cw(3,"releasedResource")
B.bp=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.bq=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale","uShadowMapTexelSize","uShadowFilterRadius","uShadowBias","uReflectionColor","uReflectionIntensity","uReflectionConfidence","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uSpecularScale","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness","uSurfaceSnowCoverage","uSurfaceDissolution","uThermalSourceCount","uThermalSourcePosition0","uThermalSourceRadius0","uThermalSourceDissolution0","uThermalSourcePosition1","uThermalSourceRadius1","uThermalSourceDissolution1","uThermalSourcePosition2","uThermalSourceRadius2","uThermalSourceDissolution2","uThermalSourcePosition3","uThermalSourceRadius3","uThermalSourceDissolution3"],t.s)
B.br=s(["uQuantizationBits","uDitherStrength"],t.s)
B.bs=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.bt=s(["uNear","uFar","uLightDir","uLightColor","uShaftIntensity","uFogDensity","uAnisotropy","uViewProjection","uView","uInverseProjection","uVolumetricAlbedo","uVolumetricHeightFalloff","uVolumetricDustDensity","uVolumetricJitter","uVolumetricIntensity","uVolumetricSampleCount"],t.s)
B.bu=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.bv=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.bw=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity","uAmbientLightScale","uDirectLightScale"],t.s)
B.by=s([],t.u)
B.R=new A.c0(2,"high")
B.c_={shadows:0,ssao:1,bloom:2,dof:3,grade:4,volumetric:5}
B.cy=new A.aI(B.c_,6,t.P)
B.ce=new A.ak(B.R,B.cy)
B.bT={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.cv=new A.aI(B.bT,5,t.P)
B.az=new A.ak(B.R,B.cv)
B.cc=new A.c0(1,"standard")
B.c0={shadows:0}
B.cz=new A.aI(B.c0,1,t.P)
B.ay=new A.ak(B.cc,B.cz)
B.ax=new A.c0(0,"safe")
B.Q={}
B.W=new A.aI(B.Q,0,t.P)
B.S=new A.ak(B.ax,B.W)
B.O=s([B.ce,B.az,B.ay,B.S],A.bo("u<ak>"))
B.bz=s(["uExposure","uVignette","uGrain","uOutputEncoding","uToneMap","uClearColor","uSkyHorizon","uSkyZenith","uSkyGround","uSkyEnabled","uSkyHorizonGlow","uSkyStarDensity","uSkyTexture","uSkyTextureEnabled","uSkyRotation","uSkyExposure","uSkyTextureSrgb","uInverseProjection","uInverseView","uCameraPosition","uCloudCoverage","uCloudDensity","uCloudBaseHeight","uCloudThickness","uCloudScale","uCloudWind","uCloudPhase","uCloudDetail","uCloudSilverLining","uCloudSampleCount","uCloudLightDirection","uCloudLightColor","uCloudLightIntensity"],t.s)
B.X=new A.a6(0,"depthTest")
B.Y=new A.a6(1,"depthFunc")
B.Z=new A.a6(2,"depthWrite")
B.a_=new A.a6(3,"blendEnable")
B.a0=new A.a6(4,"blendFunc")
B.a1=new A.a6(5,"blendEquation")
B.a2=new A.a6(6,"cullEnable")
B.a3=new A.a6(7,"cullFace")
B.aH=new A.a6(8,"frontFace")
B.cD=new A.a6(9,"stencilEnable")
B.aF=new A.a6(10,"colorMask")
B.aG=new A.a6(11,"scissorEnable")
B.bA=s([B.X,B.Y,B.Z,B.a_,B.a0,B.a1,B.a2,B.a3,B.aH,B.cD,B.aF,B.aG],A.bo("u<a6>"))
B.bB=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.bC=s(["uBloomStrength"],t.s)
B.bD=s(["uLutSize","uStrength"],t.s)
B.bE=s(["uTexelSize","uNear","uFar"],t.s)
B.aq=s(["uTexelStep"],t.s)
B.bF=s(["uVolumetricStrength"],t.s)
B.c1={uAlbedo:0}
B.ar=new A.H(B.c1,[0],t.I)
B.c8={uSsaoRaw:0,uSceneDepth:1}
B.bG=new A.H(B.c8,[0,1],t.I)
B.c5={uScene:0,uHistory:1}
B.bH=new A.H(B.c5,[0,1],t.I)
B.bX={aPosition:0,aUvMat:1}
B.as=new A.H(B.bX,[0,4],t.I)
B.c6={uScene:0,uLut:1}
B.bI=new A.H(B.c6,[0,1],t.I)
B.c7={uSource:0}
B.at=new A.H(B.c7,[0],t.I)
B.bZ={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.bJ=new A.H(B.bZ,[0,1,2,3,4,5,6],t.I)
B.bV={uSharp:0,uBlurred:1,uSceneDepth:2}
B.bK=new A.H(B.bV,[0,1,2],t.I)
B.c9={uTex:0,uSkyTexture:1}
B.bL=new A.H(B.c9,[0,1],t.I)
B.c2={uBloom:0}
B.bM=new A.H(B.c2,[0],t.I)
B.c3={uSceneDepth:0}
B.au=new A.H(B.c3,[0],t.I)
B.c4={uScene:0}
B.bN=new A.H(B.c4,[0],t.I)
B.bO=new A.H(B.Q,[],A.bo("H<l,l>"))
B.m=new A.H(B.Q,[],t.I)
B.bS={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.bP=new A.H(B.bS,[0,1,2,3,4,5,6],t.I)
B.ca={uVolumetric:0}
B.bQ=new A.H(B.ca,[0],t.I)
B.bY={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.bR=new A.H(B.bY,[0,1,2,3],t.I)
B.cb=new A.ei(0,1,null)
B.cd=new A.c0(4,"shipping")
B.bU={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.cx=new A.aI(B.bU,7,t.P)
B.db=new A.ak(B.cd,B.cx)
B.T=new A.c1(0,"constructed")
B.cf=new A.c1(1,"initializing")
B.U=new A.c1(2,"ready")
B.D=new A.c1(3,"contextLost")
B.d=new A.cW(0,"read")
B.e=new A.cW(1,"write")
B.r=new A.cW(2,"historyRead")
B.l=new A.eq(0,"rgba8")
B.cg=new A.M("dofBlurH",B.l,192,108,1,0)
B.ch=new A.M("dofBlurV",B.l,192,108,1,0)
B.ci=new A.M("dofOutput",B.l,384,216,1,0)
B.aA=new A.eq(2,"depth24")
B.cj=new A.M("shadowMap",B.aA,512,512,1,0)
B.ck=new A.M("volumetricLight",B.l,192,108,1,0)
B.cl=new A.M("sceneColor",B.l,384,216,1,1)
B.cm=new A.M("ssaoRaw",B.l,192,108,1,0)
B.cn=new A.M("ssaoBlurred",B.l,192,108,1,0)
B.co=new A.M("gradeOutput",B.l,384,216,1,0)
B.cp=new A.M("vhsOutput",B.l,384,216,1,0)
B.cq=new A.M("sceneDepth",B.aA,384,216,1,0)
B.cr=new A.M("bloomBlurH",B.l,192,108,1,0)
B.cs=new A.M("bloomBlurV",B.l,192,108,1,0)
B.ct=new A.M("present",B.l,384,216,1,0)
B.V=new A.M("sceneColor",B.l,384,216,1,0)
B.cu=new A.M("ps1Output",B.l,384,216,1,0)
B.bW={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8,volumetric:9}
B.cw=new A.aI(B.bW,10,t.P)
B.aD=new A.c2(2,"link")
B.cA=new A.cZ(B.aD,"gl.createProgram() returned null")
B.aB=new A.c2(0,"vertex")
B.aC=new A.c2(1,"fragment")
B.aE=new A.c2(3,"validation")
B.cB=new A.ev(0,"full")
B.cC=new A.ev(2,"culled")
B.cF=A.ax("p7")
B.cG=A.ax("p8")
B.cH=A.ax("fK")
B.cI=A.ax("fL")
B.cJ=A.ax("mf")
B.cK=A.ax("mg")
B.cL=A.ax("mh")
B.cM=A.ax("F")
B.cN=A.ax("w")
B.cO=A.ax("mQ")
B.cP=A.ax("mR")
B.cQ=A.ax("mS")
B.cR=A.ax("eE")
B.b=new A.b5(0,"float1")
B.a4=new A.b5(1,"float2")
B.h=new A.b5(2,"float3")
B.cS=new A.b5(3,"float4")
B.k=new A.b5(4,"mat4")
B.aI=new A.b5(5,"mat4Array")
B.a5=new A.d(B.b,0)
B.aJ=new A.d(B.b,1)
B.t=new A.b5(6,"sampler")
B.o=new A.d(B.t,0)
B.w=new A.d(B.t,1)
B.aK=new A.d(B.t,2)
B.cT=new A.d(B.t,3)
B.cU=new A.d(B.t,4)
B.cV=new A.d(B.t,5)
B.cW=new A.d(B.t,6)
B.cX=new A.hP(!1)
B.E=new A.au(0,0,0)
B.x=new A.au(0,0,1)
B.cY=new A.au(1,0,0)
B.cZ=new A.aD(0,"position")
B.d_=new A.aD(1,"normal")
B.d0=new A.aD(2,"color")
B.d1=new A.aD(3,"emissive")
B.d2=new A.aD(4,"alpha")
B.d3=new A.aD(5,"uv0")
B.d4=new A.aD(6,"tangent4")
B.d5=new A.aD(7,"uv1")
B.d6=new A.aD(8,"legacyMaterialEffect")
B.aL=new A.eS(0,"horizontal")
B.d7=new A.eS(1,"vertical")
B.aM=new A.eY(0,"horizontal")
B.d8=new A.eY(1,"vertical")})();(function staticFields(){$.id=null
$.aq=A.e([],A.bo("u<w>"))
$.kt=null
$.kc=null
$.kb=null
$.lB=null
$.lx=null
$.lE=null
$.iY=null
$.j3=null
$.jZ=null
$.ie=A.e([],A.bo("u<v<w>?>"))
$.ca=null
$.dA=null
$.dB=null
$.jR=!1
$.J=B.n
$.kG=""
$.kH=null})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"pa","lJ",()=>A.iZ("_$dart_dartClosure"))
s($,"p9","k1",()=>A.iZ("_$dart_dartClosure_dartJSInterop"))
s($,"pA","lY",()=>A.e([new J.e4()],A.bo("u<cY>")))
s($,"pk","lK",()=>A.b4(A.hL({
toString:function(){return"$receiver$"}})))
s($,"pl","lL",()=>A.b4(A.hL({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"pm","lM",()=>A.b4(A.hL(null)))
s($,"pn","lN",()=>A.b4(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"pq","lQ",()=>A.b4(A.hL(void 0)))
s($,"pr","lR",()=>A.b4(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"pp","lP",()=>A.b4(A.kD(null)))
s($,"po","lO",()=>A.b4(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"pt","lT",()=>A.b4(A.kD(void 0)))
s($,"ps","lS",()=>A.b4(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"pu","k7",()=>A.n9())
s($,"py","lX",()=>A.mt(4096))
s($,"pw","lV",()=>new A.iq().$0())
s($,"px","lW",()=>new A.ip().$0())
s($,"pv","lU",()=>A.ms(A.r(A.e([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.t))))
s($,"pz","dD",()=>A.jd(B.cN))
s($,"p6","lI",()=>B.V.cp())
s($,"pf","k6",()=>A.eg(A.e([255,255,255,255],t.t)))
s($,"pc","k3",()=>A.eg(A.e([128,128,255,255],t.t)))
s($,"pb","k2",()=>A.eg(A.e([0,0,0,255],t.t)))
s($,"pd","k4",()=>A.eg(A.e([255,255,0,255],t.t)))
s($,"pe","k5",()=>A.eg(A.e([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bZ,SharedArrayBuffer:A.bZ,ArrayBufferView:A.cM,DataView:A.e9,Float32Array:A.cJ,Float64Array:A.ea,Int16Array:A.eb,Int32Array:A.ec,Int8Array:A.ed,Uint16Array:A.ee,Uint32Array:A.ef,Uint8ClampedArray:A.cN,CanvasPixelArray:A.cN,Uint8Array:A.cO})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.a2.$nativeSuperclassTag="ArrayBufferView"
A.dc.$nativeSuperclassTag="ArrayBufferView"
A.dd.$nativeSuperclassTag="ArrayBufferView"
A.cK.$nativeSuperclassTag="ArrayBufferView"
A.de.$nativeSuperclassTag="ArrayBufferView"
A.df.$nativeSuperclassTag="ArrayBufferView"
A.cL.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.j4
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
