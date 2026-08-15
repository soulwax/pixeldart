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
if(a[b]!==s){A.oy(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.d(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jv(b)
return new s(c,this)}:function(){if(s===null)s=A.jv(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jv(a).prototype
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
jB(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jx(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.jz==null){A.ok()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.b(A.ke("Return interceptor for "+A.p(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.hY
if(o==null)o=$.hY=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.op(a)
if(p!=null)return p
if(typeof a=="function")return B.be
s=Object.getPrototypeOf(a)
if(s==null)return B.am
if(s===Object.prototype)return B.am
if(typeof q=="function"){o=$.hY
if(o==null)o=$.hY=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.Z,enumerable:false,writable:true,configurable:true})
return B.Z}return B.Z},
jU(a,b){if(a<0||a>4294967295)throw A.b(A.au(a,0,4294967295,"length",null))
return J.jV(new Array(a),b)},
jT(a,b){if(a<0)throw A.b(A.r("Length must be a non-negative integer: "+a,null))
return A.d(new Array(a),b.h("t<0>"))},
jV(a,b){var s=A.d(a,b.h("t<0>"))
s.$flags=1
return s},
lU(a,b){var s=t.e8
return J.lw(s.a(a),s.a(b))},
bF(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cu.prototype
return J.dZ.prototype}if(typeof a=="string")return J.ba.prototype
if(a==null)return J.cv.prototype
if(typeof a=="boolean")return J.dY.prototype
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bb.prototype
if(typeof a=="symbol")return J.cy.prototype
if(typeof a=="bigint")return J.cw.prototype
return a}if(a instanceof A.v)return a
return J.jx(a)},
cb(a){if(typeof a=="string")return J.ba.prototype
if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bb.prototype
if(typeof a=="symbol")return J.cy.prototype
if(typeof a=="bigint")return J.cw.prototype
return a}if(a instanceof A.v)return a
return J.jx(a)},
fi(a){if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bb.prototype
if(typeof a=="symbol")return J.cy.prototype
if(typeof a=="bigint")return J.cw.prototype
return a}if(a instanceof A.v)return a
return J.jx(a)},
of(a){if(typeof a=="number")return J.bO.prototype
if(typeof a=="string")return J.ba.prototype
if(a==null)return a
if(!(a instanceof A.v))return J.bu.prototype
return a},
og(a){if(typeof a=="string")return J.ba.prototype
if(a==null)return a
if(!(a instanceof A.v))return J.bu.prototype
return a},
aK(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bF(a).R(a,b)},
iY(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.on(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.cb(a).n(a,b)},
dx(a,b,c){return J.fi(a).q(a,b,c)},
jJ(a,b){return J.fi(a).j(a,b)},
lw(a,b){return J.of(a).H(a,b)},
iZ(a,b){return J.fi(a).K(a,b)},
J(a){return J.bF(a).gB(a)},
X(a){return J.fi(a).gv(a)},
b6(a){return J.cb(a).gp(a)},
dy(a){return J.bF(a).gC(a)},
lx(a,b){return J.og(a).ar(a,b)},
bH(a){return J.bF(a).i(a)},
dW:function dW(){},
dY:function dY(){},
cv:function cv(){},
cx:function cx(){},
bc:function bc(){},
ec:function ec(){},
bu:function bu(){},
bb:function bb(){},
cw:function cw(){},
cy:function cy(){},
t:function t(a){this.$ti=a},
dX:function dX(){},
fS:function fS(a){this.$ti=a},
ce:function ce(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bO:function bO(){},
cu:function cu(){},
dZ:function dZ(){},
ba:function ba(){}},A={j2:function j2(){},
jW(a){return new A.cz("Field '"+a+"' has been assigned during initialization.")},
lV(a){return new A.cz("Field '"+a+"' has not been initialized.")},
iF(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
U(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
ev(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
dv(a,b,c){return a},
jA(a){var s,r
for(s=$.ak.length,r=0;r<s;++r)if(a===$.ak[r])return!0
return!1},
kc(a,b,c,d){A.eh(b,"start")
if(c!=null){A.eh(c,"end")
if(b>c)A.k(A.au(b,0,c,"start",null))}return new A.cW(a,b,c,d.h("cW<0>"))},
k_(a,b,c,d){if(t.gw.b(a))return new A.cp(a,b,c.h("@<0>").D(d).h("cp<1,2>"))
return new A.aU(a,b,c.h("@<0>").D(d).h("aU<1,2>"))},
j0(){return new A.bY("No element")},
lS(){return new A.bY("Too many elements")},
c0:function c0(){},
ch:function ch(a,b){this.a=a
this.$ti=b},
d_:function d_(){},
ci:function ci(a,b){this.a=a
this.$ti=b},
cz:function cz(a){this.a=a},
dH:function dH(a){this.a=a},
hr:function hr(){},
n:function n(){},
V:function V(){},
cW:function cW(a,b,c,d){var _=this
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
aU:function aU(a,b,c){this.a=a
this.b=b
this.$ti=c},
cp:function cp(a,b,c){this.a=a
this.b=b
this.$ti=c},
cD:function cD(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
aV:function aV(a,b,c){this.a=a
this.b=b
this.$ti=c},
a5:function a5(a,b,c){this.a=a
this.b=b
this.$ti=c},
G:function G(a,b,c){this.a=a
this.b=b
this.$ti=c},
a8:function a8(){},
bv:function bv(){},
bZ:function bZ(){},
cS:function cS(a,b){this.a=a
this.$ti=b},
dq:function dq(){},
jQ(a,b,c){var s,r,q,p,o,n,m,l=A.q(a),k=A.j6(new A.bp(a,l.h("bp<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.B)(k),++i,p=o){r=k[i]
c.a(a.n(0,r))
o=p+1
q[r]=p}n=A.j6(new A.aT(a,l.h("aT<2>")),!0,c)
m=new A.K(q,n,b.h("@<0>").D(c).h("K<1,2>"))
m.$keys=k
return m}return new A.cm(A.lY(a,b,c),b.h("@<0>").D(c).h("cm<1,2>"))},
lF(){throw A.b(A.b1("Cannot modify unmodifiable Map"))},
lG(){throw A.b(A.b1("Cannot modify constant Set"))},
le(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
on(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
p(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bH(a)
return s},
ee(a){var s,r=$.k3
if(r==null)r=$.k3=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
k4(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.h(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
ef(a){var s,r,q,p
if(a instanceof A.v)return A.aj(A.bj(a),null)
s=J.bF(a)
if(s===B.bd||s===B.bf||t.ak.b(a)){r=B.a1(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aj(A.bj(a),null)},
k5(a){var s,r,q
if(a==null||typeof a=="number"||A.jq(a))return J.bH(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.b8)return a.i(0)
if(a instanceof A.bh)return a.bR(!0)
s=$.lv()
for(r=0;r<1;++r){q=s[r].e9(a)
if(q!=null)return q}return"Instance of '"+A.ef(a)+"'"},
m2(){if(!!self.location)return self.location.href
return null},
mb(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
bs(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.i.aZ(s,10)|55296)>>>0,s&1023|56320)}}throw A.b(A.au(a,0,1114111,null,null))},
bT(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
ma(a){var s=A.bT(a).getUTCFullYear()+0
return s},
m8(a){var s=A.bT(a).getUTCMonth()+1
return s},
m4(a){var s=A.bT(a).getUTCDate()+0
return s},
m5(a){var s=A.bT(a).getUTCHours()+0
return s},
m7(a){var s=A.bT(a).getUTCMinutes()+0
return s},
m9(a){var s=A.bT(a).getUTCSeconds()+0
return s},
m6(a){var s=A.bT(a).getUTCMilliseconds()+0
return s},
m3(a){var s=a.$thrownJsError
if(s==null)return null
return A.cc(s)},
k6(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.P(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
oi(a){throw A.b(A.ju(a))},
h(a,b){if(a==null)J.b6(a)
throw A.b(A.iD(a,b))},
iD(a,b){var s,r="index"
if(!A.kV(b))return new A.aB(!0,b,r,null)
s=A.a(J.b6(a))
if(b<0||b>=s)return A.fR(b,s,a,r)
return new A.cO(null,null,!0,b,r,"Value not in range")},
ju(a){return new A.aB(!0,a,null,null)},
b(a){return A.P(a,new Error())},
P(a,b){var s
if(a==null)a=new A.aZ()
b.dartException=a
s=A.oz
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
oz(){return J.bH(this.dartException)},
k(a,b){throw A.P(a,b==null?new Error():b)},
b4(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.k(A.nr(a,b,c),s)},
nr(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.cY("'"+s+"': Cannot "+o+" "+l+k+n)},
B(a){throw A.b(A.am(a))},
b_(a){var s,r,q,p,o,n
a=A.ot(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.d([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.hv(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
hw(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
kd(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
j3(a,b){var s=b==null,r=s?null:b.method
return new A.e_(a,r,s?null:b.receiver)},
b5(a){var s
if(a==null)return new A.h3(a)
if(a instanceof A.cq){s=a.a
return A.bk(a,s==null?A.dr(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bk(a,a.dartException)
return A.o2(a)},
bk(a,b){if(t.U.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
o2(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.i.aZ(r,16)&8191)===10)switch(q){case 438:return A.bk(a,A.j3(A.p(s)+" (Error "+q+")",null))
case 445:case 5007:A.p(s)
return A.bk(a,new A.cL())}}if(a instanceof TypeError){p=$.lh()
o=$.li()
n=$.lj()
m=$.lk()
l=$.ln()
k=$.lo()
j=$.lm()
$.ll()
i=$.lq()
h=$.lp()
g=p.Z(s)
if(g!=null)return A.bk(a,A.j3(A.aH(s),g))
else{g=o.Z(s)
if(g!=null){g.method="call"
return A.bk(a,A.j3(A.aH(s),g))}else if(n.Z(s)!=null||m.Z(s)!=null||l.Z(s)!=null||k.Z(s)!=null||j.Z(s)!=null||m.Z(s)!=null||i.Z(s)!=null||h.Z(s)!=null){A.aH(s)
return A.bk(a,new A.cL())}}return A.bk(a,new A.eA(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.cV()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bk(a,new A.aB(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.cV()
return a},
cc(a){var s
if(a instanceof A.cq)return a.b
if(a==null)return new A.dc(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.dc(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
iP(a){if(a==null)return J.J(a)
if(typeof a=="object")return A.ee(a)
return J.J(a)},
od(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.q(0,a[s],a[r])}return b},
oe(a,b){var s,r=a.length
for(s=0;s<r;++s)b.j(0,a[s])
return b},
nE(a,b,c,d,e,f){t.Z.a(a)
switch(A.a(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.hK("Unsupported number of arguments for wrapped closure"))},
c8(a,b){var s=a.$identity
if(!!s)return s
s=A.o9(a,b)
a.$identity=s
return s},
o9(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.nE)},
lE(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.et().constructor.prototype):Object.create(new A.bI(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.jP(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.lA(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.jP(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
lA(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.ly)}throw A.b("Error in functionType of tearoff")},
lB(a,b,c,d){var s=A.jO
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
jP(a,b,c,d){if(c)return A.lD(a,b,d)
return A.lB(b.length,d,a,b)},
lC(a,b,c,d){var s=A.jO,r=A.lz
switch(b?-1:a){case 0:throw A.b(new A.em("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
lD(a,b,c){var s,r
if($.jM==null)$.jM=A.jL("interceptor")
if($.jN==null)$.jN=A.jL("receiver")
s=b.length
r=A.lC(s,c,a,b)
return r},
jv(a){return A.lE(a)},
ly(a,b){return A.dh(v.typeUniverse,A.bj(a.a),b)},
jO(a){return a.a},
lz(a){return a.b},
jL(a){var s,r,q,p=new A.bI("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.r("Field name "+a+" not found.",null))},
l6(a){return v.getIsolateTag(a)},
lc(){return v.G},
op(a){var s,r,q,p,o,n=A.aH($.l8.$1(a)),m=$.iE[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.iJ[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bD($.l3.$2(a,n))
if(q!=null){m=$.iE[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.iJ[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.iO(s)
$.iE[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.iJ[n]=s
return s}if(p==="-"){o=A.iO(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.la(a,s)
if(p==="*")throw A.b(A.ke(n))
if(v.leafTags[n]===true){o=A.iO(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.la(a,s)},
la(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.jB(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
iO(a){return J.jB(a,!1,null,!!a.$iag)},
or(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.iO(s)
else return J.jB(s,c,null,null)},
ok(){if(!0===$.jz)return
$.jz=!0
A.ol()},
ol(){var s,r,q,p,o,n,m,l
$.iE=Object.create(null)
$.iJ=Object.create(null)
A.oj()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.lb.$1(o)
if(n!=null){m=A.or(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
oj(){var s,r,q,p,o,n,m=B.aH()
m=A.c7(B.aI,A.c7(B.aJ,A.c7(B.a2,A.c7(B.a2,A.c7(B.aK,A.c7(B.aL,A.c7(B.aM(B.a1),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.l8=new A.iG(p)
$.l3=new A.iH(o)
$.lb=new A.iI(n)},
c7(a,b){return a(b)||b},
oa(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
ox(a,b,c){var s=a.indexOf(b,c)
return s>=0},
ot(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
d9:function d9(a,b){this.a=a
this.b=b},
da:function da(a,b){this.a=a
this.b=b},
cm:function cm(a,b){this.a=a
this.$ti=b},
cl:function cl(){},
K:function K(a,b,c){this.a=a
this.b=b
this.$ti=c},
by:function by(a,b){this.a=a
this.$ti=b},
bz:function bz(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cn:function cn(){},
aM:function aM(a,b,c){this.a=a
this.b=b
this.$ti=c},
cT:function cT(){},
hv:function hv(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cL:function cL(){},
e_:function e_(a,b,c){this.a=a
this.b=b
this.c=c},
eA:function eA(a){this.a=a},
h3:function h3(a){this.a=a},
cq:function cq(a,b){this.a=a
this.b=b},
dc:function dc(a){this.a=a
this.b=null},
b8:function b8(){},
dF:function dF(){},
dG:function dG(){},
ew:function ew(){},
et:function et(){},
bI:function bI(a,b){this.a=a
this.b=b},
em:function em(a){this.a=a},
aQ:function aQ(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fT:function fT(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
bp:function bp(a,b){this.a=a
this.$ti=b},
cB:function cB(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aT:function aT(a,b){this.a=a
this.$ti=b},
aS:function aS(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aR:function aR(a,b){this.a=a
this.$ti=b},
cA:function cA(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
iG:function iG(a){this.a=a},
iH:function iH(a){this.a=a},
iI:function iI(a){this.a=a},
bh:function bh(){},
bC:function bC(){},
x(a){return a},
m1(a){return new Uint8Array(a)},
e9(a){return new Uint8Array(A.x(a))},
b3(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.iD(b,a))},
bS:function bS(){},
cI:function cI(){},
e2:function e2(){},
Y:function Y(){},
cG:function cG(){},
cH:function cH(){},
cF:function cF(){},
e3:function e3(){},
e4:function e4(){},
e5:function e5(){},
e6:function e6(){},
e7:function e7(){},
e8:function e8(){},
cJ:function cJ(){},
cK:function cK(){},
d5:function d5(){},
d6:function d6(){},
d7:function d7(){},
d8:function d8(){},
jb(a,b){var s=b.c
return s==null?b.c=A.df(a,"bn",[b.x]):s},
k8(a){var s=a.w
if(s===6||s===7)return A.k8(a.x)
return s===11||s===12},
mg(a){return a.as},
ca(a){return A.i5(v.typeUniverse,a,!1)},
bE(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bE(a1,s,a3,a4)
if(r===s)return a2
return A.kC(a1,r,!0)
case 7:s=a2.x
r=A.bE(a1,s,a3,a4)
if(r===s)return a2
return A.kB(a1,r,!0)
case 8:q=a2.y
p=A.c6(a1,q,a3,a4)
if(p===q)return a2
return A.df(a1,a2.x,p)
case 9:o=a2.x
n=A.bE(a1,o,a3,a4)
m=a2.y
l=A.c6(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jj(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.c6(a1,j,a3,a4)
if(i===j)return a2
return A.kD(a1,k,i)
case 11:h=a2.x
g=A.bE(a1,h,a3,a4)
f=a2.y
e=A.o_(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.kA(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.c6(a1,d,a3,a4)
o=a2.x
n=A.bE(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jk(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.dA("Attempted to substitute unexpected RTI kind "+a0))}},
c6(a,b,c,d){var s,r,q,p,o=b.length,n=A.i9(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bE(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
o0(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.i9(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bE(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
o_(a,b,c,d){var s,r=b.a,q=A.c6(a,r,c,d),p=b.b,o=A.c6(a,p,c,d),n=b.c,m=A.o0(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.eW()
s.a=q
s.b=o
s.c=m
return s},
d(a,b){a[v.arrayRti]=b
return a},
jw(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.oh(s)
return a.$S()}return null},
om(a,b){var s
if(A.k8(b))if(a instanceof A.b8){s=A.jw(a)
if(s!=null)return s}return A.bj(a)},
bj(a){if(a instanceof A.v)return A.q(a)
if(Array.isArray(a))return A.O(a)
return A.jp(J.bF(a))},
O(a){var s=a[v.arrayRti],r=t.p
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
q(a){var s=a.$ti
return s!=null?s:A.jp(a)},
jp(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.nA(a,s)},
nA(a,b){var s=a instanceof A.b8?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.mW(v.typeUniverse,s.name)
b.$ccache=r
return r},
oh(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.i5(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
jy(a){return A.aI(A.q(a))},
jt(a){var s
if(a instanceof A.bh)return a.bB()
s=a instanceof A.b8?A.jw(a):null
if(s!=null)return s
if(t.dm.b(a))return J.dy(a).a
if(Array.isArray(a))return A.O(a)
return A.bj(a)},
aI(a){var s=a.r
return s==null?a.r=new A.i4(a):s},
oc(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.h(q,0)
s=A.dh(v.typeUniverse,A.jt(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.h(q,r)
s=A.kE(v.typeUniverse,s,A.jt(q[r]))}return A.dh(v.typeUniverse,s,a)},
aq(a){return A.aI(A.i5(v.typeUniverse,a,!1))},
nz(a){var s=this
s.b=A.nY(s)
return s.b(a)},
nY(a){var s,r,q,p,o
if(a===t.K)return A.nK
if(A.bG(a))return A.nO
s=a.w
if(s===6)return A.nx
if(s===1)return A.kX
if(s===7)return A.nF
r=A.nX(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bG)){a.f="$i"+q
if(q==="u")return A.nI
if(a===t.m)return A.nH
return A.nN}}else if(s===10){p=A.oa(a.x,a.y)
o=p==null?A.kX:p
return o==null?A.dr(o):o}return A.nv},
nX(a){if(a.w===8){if(a===t.S)return A.kV
if(a===t.i||a===t.o)return A.nJ
if(a===t.N)return A.nM
if(a===t.y)return A.jq}return null},
ny(a){var s=this,r=A.nu
if(A.bG(s))r=A.nk
else if(s===t.K)r=A.dr
else if(A.cd(s)){r=A.nw
if(s===t.h6)r=A.nj
else if(s===t.dk)r=A.bD
else if(s===t.fQ)r=A.nh
else if(s===t.cg)r=A.kO
else if(s===t.cD)r=A.ni
else if(s===t.an)r=A.a1}else if(s===t.S)r=A.a
else if(s===t.N)r=A.aH
else if(s===t.y)r=A.ng
else if(s===t.o)r=A.jo
else if(s===t.i)r=A.ib
else if(s===t.m)r=A.a0
s.a=r
return s.a(a)},
nv(a){var s=this
if(a==null)return A.cd(s)
return A.oo(v.typeUniverse,A.om(a,s),s)},
nx(a){if(a==null)return!0
return this.x.b(a)},
nN(a){var s,r=this
if(a==null)return A.cd(r)
s=r.f
if(a instanceof A.v)return!!a[s]
return!!J.bF(a)[s]},
nI(a){var s,r=this
if(a==null)return A.cd(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.v)return!!a[s]
return!!J.bF(a)[s]},
nH(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.v)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
kW(a){if(typeof a=="object"){if(a instanceof A.v)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
nu(a){var s=this
if(a==null){if(A.cd(s))return a}else if(s.b(a))return a
throw A.P(A.kQ(a,s),new Error())},
nw(a){var s=this
if(a==null||s.b(a))return a
throw A.P(A.kQ(a,s),new Error())},
kQ(a,b){return new A.dd("TypeError: "+A.ks(a,A.aj(b,null)))},
ks(a,b){return A.fw(a)+": type '"+A.aj(A.jt(a),null)+"' is not a subtype of type '"+b+"'"},
ap(a,b){return new A.dd("TypeError: "+A.ks(a,b))},
nF(a){var s=this
return s.x.b(a)||A.jb(v.typeUniverse,s).b(a)},
nK(a){return a!=null},
dr(a){if(a!=null)return a
throw A.P(A.ap(a,"Object"),new Error())},
nO(a){return!0},
nk(a){return a},
kX(a){return!1},
jq(a){return!0===a||!1===a},
ng(a){if(!0===a)return!0
if(!1===a)return!1
throw A.P(A.ap(a,"bool"),new Error())},
nh(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.P(A.ap(a,"bool?"),new Error())},
ib(a){if(typeof a=="number")return a
throw A.P(A.ap(a,"double"),new Error())},
ni(a){if(typeof a=="number")return a
if(a==null)return a
throw A.P(A.ap(a,"double?"),new Error())},
kV(a){return typeof a=="number"&&Math.floor(a)===a},
a(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.P(A.ap(a,"int"),new Error())},
nj(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.P(A.ap(a,"int?"),new Error())},
nJ(a){return typeof a=="number"},
jo(a){if(typeof a=="number")return a
throw A.P(A.ap(a,"num"),new Error())},
kO(a){if(typeof a=="number")return a
if(a==null)return a
throw A.P(A.ap(a,"num?"),new Error())},
nM(a){return typeof a=="string"},
aH(a){if(typeof a=="string")return a
throw A.P(A.ap(a,"String"),new Error())},
bD(a){if(typeof a=="string")return a
if(a==null)return a
throw A.P(A.ap(a,"String?"),new Error())},
a0(a){if(A.kW(a))return a
throw A.P(A.ap(a,"JSObject"),new Error())},
a1(a){if(a==null)return a
if(A.kW(a))return a
throw A.P(A.ap(a,"JSObject?"),new Error())},
l_(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aj(a[q],b)
return s},
nS(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.l_(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aj(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
kS(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
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
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aj(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aj(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aj(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aj(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aj(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aj(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aj(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aj(a.x,b)+">"
if(l===8){p=A.o1(a.x)
o=a.y
return o.length>0?p+("<"+A.l_(o,b)+">"):p}if(l===10)return A.nS(a,b)
if(l===11)return A.kS(a,b,null)
if(l===12)return A.kS(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.h(b,n)
return b[n]}return"?"},
o1(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
mX(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
mW(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.i5(a,b,!1)
else if(typeof m=="number"){s=m
r=A.dg(a,5,"#")
q=A.i9(s)
for(p=0;p<s;++p)q[p]=r
o=A.df(a,b,q)
n[b]=o
return o}else return m},
mV(a,b){return A.kM(a.tR,b)},
mU(a,b){return A.kM(a.eT,b)},
i5(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.kx(A.kv(a,null,b,!1))
r.set(b,s)
return s},
dh(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.kx(A.kv(a,b,c,!0))
q.set(c,r)
return r},
kE(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jj(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
bi(a,b){b.a=A.ny
b.b=A.nz
return b},
dg(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.av(null,null)
s.w=b
s.as=c
r=A.bi(a,s)
a.eC.set(c,r)
return r},
kC(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.mS(a,b,r,c)
a.eC.set(r,s)
return s},
mS(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bG(b))if(!(b===t.P||b===t.T))if(s!==6)r=s===7&&A.cd(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.av(null,null)
q.w=6
q.x=b
q.as=c
return A.bi(a,q)},
kB(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.mQ(a,b,r,c)
a.eC.set(r,s)
return s},
mQ(a,b,c,d){var s,r
if(d){s=b.w
if(A.bG(b)||b===t.K)return b
else if(s===1)return A.df(a,"bn",[b])
else if(b===t.P||b===t.T)return t.eH}r=new A.av(null,null)
r.w=7
r.x=b
r.as=c
return A.bi(a,r)},
mT(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.av(null,null)
s.w=13
s.x=b
s.as=q
r=A.bi(a,s)
a.eC.set(q,r)
return r},
de(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
mP(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
df(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.de(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.av(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bi(a,r)
a.eC.set(p,q)
return q},
jj(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.de(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.av(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bi(a,o)
a.eC.set(q,n)
return n},
kD(a,b,c){var s,r,q="+"+(b+"("+A.de(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.av(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bi(a,s)
a.eC.set(q,r)
return r},
kA(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.de(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.de(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.mP(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.av(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bi(a,p)
a.eC.set(r,o)
return o},
jk(a,b,c,d){var s,r=b.as+("<"+A.de(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.mR(a,b,c,r,d)
a.eC.set(r,s)
return s},
mR(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.i9(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bE(a,b,r,0)
m=A.c6(a,c,r,0)
return A.jk(a,n,m,c!==m)}}l=new A.av(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bi(a,l)},
kv(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
kx(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.mJ(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kw(a,r,l,k,!1)
else if(q===46)r=A.kw(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bB(a.u,a.e,k.pop()))
break
case 94:k.push(A.mT(a.u,k.pop()))
break
case 35:k.push(A.dg(a.u,5,"#"))
break
case 64:k.push(A.dg(a.u,2,"@"))
break
case 126:k.push(A.dg(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.mL(a,k)
break
case 38:A.mK(a,k)
break
case 63:p=a.u
k.push(A.kC(p,A.bB(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.kB(p,A.bB(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.mI(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.ky(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.mN(a.u,a.e,o)
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
return A.bB(a.u,a.e,m)},
mJ(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kw(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.mX(s,o.x)[p]
if(n==null)A.k('No "'+p+'" in "'+A.mg(o)+'"')
d.push(A.dh(s,o,n))}else d.push(p)
return m},
mL(a,b){var s,r=a.u,q=A.ku(a,b),p=b.pop()
if(typeof p=="string")b.push(A.df(r,p,q))
else{s=A.bB(r,a.e,p)
switch(s.w){case 11:b.push(A.jk(r,s,q,a.n))
break
default:b.push(A.jj(r,s,q))
break}}},
mI(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.ku(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bB(p,a.e,o)
q=new A.eW()
q.a=s
q.b=n
q.c=m
b.push(A.kA(p,r,q))
return
case-4:b.push(A.kD(p,b.pop(),s))
return
default:throw A.b(A.dA("Unexpected state under `()`: "+A.p(o)))}},
mK(a,b){var s=b.pop()
if(0===s){b.push(A.dg(a.u,1,"0&"))
return}if(1===s){b.push(A.dg(a.u,4,"1&"))
return}throw A.b(A.dA("Unexpected extended operation "+A.p(s)))},
ku(a,b){var s=b.splice(a.p)
A.ky(a.u,a.e,s)
a.p=b.pop()
return s},
bB(a,b,c){if(typeof c=="string")return A.df(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.mM(a,b,c)}else return c},
ky(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bB(a,b,c[s])},
mN(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bB(a,b,c[s])},
mM(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.b(A.dA("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.dA("Bad index "+c+" for "+b.i(0)))},
oo(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.R(a,b,null,c,null)
r.set(c,s)}return s},
R(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bG(d))return!0
s=b.w
if(s===4)return!0
if(A.bG(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.R(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.T){if(q===7)return A.R(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.R(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.R(a,b.x,c,d,e))return!1
return A.R(a,A.jb(a,b),c,d,e)}if(s===6)return A.R(a,p,c,d,e)&&A.R(a,b.x,c,d,e)
if(q===7){if(A.R(a,b,c,d.x,e))return!0
return A.R(a,b,c,A.jb(a,d),e)}if(q===6)return A.R(a,b,c,p,e)||A.R(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.gT)return!0
if(q===12){if(b===t.q)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.R(a,j,c,i,e)||!A.R(a,i,e,j,c))return!1}return A.kU(a,b.x,c,d.x,e)}if(q===11){if(b===t.q)return!0
if(p)return!1
return A.kU(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.nG(a,b,c,d,e)}if(o&&q===10)return A.nL(a,b,c,d,e)
return!1},
kU(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.R(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.R(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.R(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.R(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.R(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
nG(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.dh(a,b,r[o])
return A.kN(a,p,null,c,d.y,e)}return A.kN(a,b.y,null,c,d.y,e)},
kN(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.R(a,b[s],d,e[s],f))return!1
return!0},
nL(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.R(a,r[s],c,q[s],e))return!1
return!0},
cd(a){var s=a.w,r=!0
if(!(a===t.P||a===t.T))if(!A.bG(a))if(s!==6)r=s===7&&A.cd(a.x)
return r},
bG(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kM(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
i9(a){return a>0?new Array(a):v.typeUniverse.sEA},
av:function av(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
eW:function eW(){this.c=this.b=this.a=null},
i4:function i4(a){this.a=a},
eU:function eU(){},
dd:function dd(a){this.a=a},
mD(){var s,r,q
if(self.scheduleImmediate!=null)return A.o4()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.c8(new A.hG(s),1)).observe(r,{childList:true})
return new A.hF(s,r,q)}else if(self.setImmediate!=null)return A.o5()
return A.o6()},
mE(a){self.scheduleImmediate(A.c8(new A.hH(t.M.a(a)),0))},
mF(a){self.setImmediate(A.c8(new A.hI(t.M.a(a)),0))},
mG(a){t.M.a(a)
A.mO(0,a)},
mO(a,b){var s=new A.i2()
s.cA(a,b)
return s},
nQ(a){return new A.eJ(new A.N($.I,a.h("N<0>")),a.h("eJ<0>"))},
nn(a,b){a.$2(0,null)
b.b=!0
return b.a},
kP(a,b){A.no(a,b)},
nm(a,b){b.b_(a)},
nl(a,b){b.b0(A.b5(a),A.cc(a))},
no(a,b){var s,r,q=new A.ic(b),p=new A.id(b)
if(a instanceof A.N)a.bP(q,p,t.A)
else{s=t.A
if(a instanceof A.N)a.co(q,p,s)
else{r=new A.N($.I,t.c)
r.a=8
r.c=a
r.bP(q,p,s)}}},
o3(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.I.cn(new A.iz(s),t.H,t.S,t.A)},
kz(a,b,c){return 0},
j_(a){var s
if(t.U.b(a)){s=a.gag()
if(s!=null)return s}return B.v},
nB(a,b){if($.I===B.n)return null
return null},
nC(a,b){if($.I!==B.n)A.nB(a,b)
if(b==null)if(t.U.b(a)){b=a.gag()
if(b==null){A.k6(a,B.v)
b=B.v}}else b=B.v
else if(t.U.b(a))A.k6(a,b)
return new A.al(a,b)},
jd(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.mh()
b.aN(new A.al(new A.aB(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bE(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aw()
b.au(o.a)
A.c1(b,p)
return}b.a^=2
A.fh(null,null,b.b,t.M.a(new A.hP(o,b)))},
c1(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.v,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.js(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.c1(d.a,c)
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
A.js(j.a,j.b)
return}g=$.I
if(g!==h)$.I=h
else g=null
c=c.c
if((c&15)===8)new A.hT(q,d,n).$0()
else if(o){if((c&1)!==0)new A.hS(q,j).$0()}else if((c&2)!==0)new A.hR(d,q).$0()
if(g!=null)$.I=g
c=q.c
if(c instanceof A.N){p=q.a.$ti
p=p.h("bn<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.az(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.jd(c,f,!0)
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
nT(a,b){var s
if(t.d.b(a))return b.cn(a,t.A,t.K,t.l)
s=t.x
if(s.b(a))return s.a(a)
throw A.b(A.aL(a,"onError",u.c))},
nR(){var s,r
for(s=$.c5;s!=null;s=$.c5){$.du=null
r=s.b
$.c5=r
if(r==null)$.dt=null
s.a.$0()}},
nZ(){$.jr=!0
try{A.nR()}finally{$.du=null
$.jr=!1
if($.c5!=null)$.jI().$1(A.l4())}},
l1(a){var s=new A.eK(a),r=$.dt
if(r==null){$.c5=$.dt=s
if(!$.jr)$.jI().$1(A.l4())}else $.dt=r.b=s},
nW(a){var s,r,q,p=$.c5
if(p==null){A.l1(a)
$.du=$.dt
return}s=new A.eK(a)
r=$.du
if(r==null){s.b=p
$.c5=$.du=s}else{q=r.b
s.b=q
$.du=r.b=s
if(q==null)$.dt=s}},
oN(a,b){A.dv(a,"stream",t.K)
return new A.fa(b.h("fa<0>"))},
js(a,b){A.nW(new A.iy(a,b))},
kZ(a,b,c,d,e){var s,r=$.I
if(r===c)return d.$0()
$.I=c
s=r
try{r=d.$0()
return r}finally{$.I=s}},
nV(a,b,c,d,e,f,g){var s,r=$.I
if(r===c)return d.$1(e)
$.I=c
s=r
try{r=d.$1(e)
return r}finally{$.I=s}},
nU(a,b,c,d,e,f,g,h,i){var s,r=$.I
if(r===c)return d.$2(e,f)
$.I=c
s=r
try{r=d.$2(e,f)
return r}finally{$.I=s}},
fh(a,b,c,d){t.M.a(d)
if(B.n!==c){d=c.dn(d)
d=d}A.l1(d)},
hG:function hG(a){this.a=a},
hF:function hF(a,b,c){this.a=a
this.b=b
this.c=c},
hH:function hH(a){this.a=a},
hI:function hI(a){this.a=a},
i2:function i2(){},
i3:function i3(a,b){this.a=a
this.b=b},
eJ:function eJ(a,b){this.a=a
this.b=!1
this.$ti=b},
ic:function ic(a){this.a=a},
id:function id(a){this.a=a},
iz:function iz(a){this.a=a},
aA:function aA(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aG:function aG(a,b){this.a=a
this.$ti=b},
al:function al(a,b){this.a=a
this.b=b},
eO:function eO(){},
cZ:function cZ(a,b){this.a=a
this.$ti=b},
bw:function bw(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
N:function N(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
hM:function hM(a,b){this.a=a
this.b=b},
hQ:function hQ(a,b){this.a=a
this.b=b},
hP:function hP(a,b){this.a=a
this.b=b},
hO:function hO(a,b){this.a=a
this.b=b},
hN:function hN(a,b){this.a=a
this.b=b},
hT:function hT(a,b,c){this.a=a
this.b=b
this.c=c},
hU:function hU(a,b){this.a=a
this.b=b},
hV:function hV(a){this.a=a},
hS:function hS(a,b){this.a=a
this.b=b},
hR:function hR(a,b){this.a=a
this.b=b},
eK:function eK(a){this.a=a
this.b=null},
fa:function fa(a){this.$ti=a},
dp:function dp(){},
f3:function f3(){},
i_:function i_(a,b){this.a=a
this.b=b},
iy:function iy(a,b){this.a=a
this.b=b},
kt(a,b){var s=a[b]
return s===a?null:s},
jf(a,b,c){if(c==null)a[b]=a
else a[b]=c},
je(){var s=Object.create(null)
A.jf(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
lW(a,b){return new A.aQ(a.h("@<0>").D(b).h("aQ<1,2>"))},
lX(a,b,c){return b.h("@<0>").D(c).h("jX<1,2>").a(A.od(a,new A.aQ(b.h("@<0>").D(c).h("aQ<1,2>"))))},
as(a,b){return new A.aQ(a.h("@<0>").D(b).h("aQ<1,2>"))},
j4(a){return new A.az(a.h("az<0>"))},
aC(a){return new A.az(a.h("az<0>"))},
e0(a,b){return b.h("jY<0>").a(A.oe(a,new A.az(b.h("az<0>"))))},
jh(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
jg(a,b,c){var s=new A.bA(a,b,c.h("bA<0>"))
s.c=a.e
return s},
lY(a,b,c){var s=A.lW(b,c)
a.al(0,new A.fU(s,b,c))
return s},
lZ(a,b){var s,r,q=A.j4(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.B)(a),++r)q.j(0,b.a(a[r]))
return q},
j5(a,b){var s=A.j4(b)
s.W(0,a)
return s},
j7(a){var s,r
if(A.jA(a))return"{...}"
s=new A.ab("")
try{r={}
B.a.j($.ak,a)
s.a+="{"
r.a=!0
a.al(0,new A.fW(r,s))
s.a+="}"}finally{if(0>=$.ak.length)return A.h($.ak,-1)
$.ak.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
mY(){throw A.b(A.b1("Cannot change an unmodifiable set"))},
d0:function d0(){},
hX:function hX(a){this.a=a},
d2:function d2(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
bx:function bx(a,b){this.a=a
this.$ti=b},
d1:function d1(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
az:function az(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
eY:function eY(a){this.a=a
this.c=this.b=null},
bA:function bA(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
fU:function fU(a,b,c){this.a=a
this.b=b
this.c=c},
w:function w(){},
bq:function bq(){},
fV:function fV(a){this.a=a},
fW:function fW(a,b){this.a=a
this.b=b},
d3:function d3(a,b){this.a=a
this.$ti=b},
d4:function d4(a,b,c){var _=this
_.a=a
_.b=b
_.c=null
_.$ti=c},
di:function di(){},
bQ:function bQ(){},
bf:function bf(a,b){this.a=a
this.$ti=b},
aY:function aY(){},
db:function db(){},
fc:function fc(){},
cX:function cX(a,b){this.a=a
this.$ti=b},
c3:function c3(){},
dj:function dj(){},
ne(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.lu()
else s=new Uint8Array(o)
for(r=J.cb(a),q=0;q<o;++q){p=r.n(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
nd(a,b,c,d){var s=a?$.lt():$.ls()
if(s==null)return null
if(0===c&&d===b.length)return A.kL(s,b)
return A.kL(s,b.subarray(c,d))},
kL(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
jK(a,b,c,d,e,f){if(B.i.aJ(f,4)!==0)throw A.b(A.a9("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.b(A.a9("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.b(A.a9("Invalid base64 padding, more than two '=' characters",a,b))},
nf(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
i8:function i8(){},
i7:function i7(){},
dB:function dB(){},
fk:function fk(){},
bK:function bK(){},
dJ:function dJ(){},
dO:function dO(){},
eE:function eE(){},
hA:function hA(a){this.a=a},
i6:function i6(a){this.a=a
this.b=16
this.c=0},
l9(a){var s=A.k4(a,null)
if(s!=null)return s
throw A.b(A.a9(a,null,null))},
lJ(a,b){a=A.P(a,new Error())
if(a==null)a=A.dr(a)
a.stack=b.i(0)
throw a},
cC(a,b,c,d){var s,r=J.jU(a,d)
if(a!==0&&b!=null)for(s=0;s<a;++s)r[s]=b
return r},
j6(a,b,c){var s,r=A.d([],c.h("t<0>"))
for(s=J.X(a);s.k();)B.a.j(r,c.a(s.gl()))
if(b)return r
r.$flags=1
return r},
an(a,b){var s,r
if(Array.isArray(a))return A.d(a.slice(0),b.h("t<0>"))
s=A.d([],b.h("t<0>"))
for(r=J.X(a);r.k();)B.a.j(s,r.gl())
return s},
jZ(a,b){var s=A.j6(a,!1,b)
s.$flags=3
return s},
kb(a,b,c){var s,r
A.eh(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.b(A.au(c,b,null,"end",null))
if(s===0)return""}r=A.mj(a,b,c)
return r},
mj(a,b,c){var s=a.length
if(b>=s)return""
return A.mb(a,b,c==null||c>s?s:c)},
ka(a,b,c){var s=J.X(b)
if(!s.k())return a
if(c.length===0){do a+=A.p(s.gl())
while(s.k())}else{a+=A.p(s.gl())
while(s.k())a=a+c+A.p(s.gl())}return a},
mr(){var s,r,q=A.m2()
if(q==null)throw A.b(A.b1("'Uri.base' is not supported"))
s=$.kh
if(s!=null&&q===$.kg)return s
r=A.ms(q)
$.kh=r
$.kg=q
return r},
mh(){return A.cc(new Error())},
lH(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
jR(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
dK(a){if(a>=10)return""+a
return"0"+a},
fw(a){if(typeof a=="number"||A.jq(a)||a==null)return J.bH(a)
if(typeof a=="string")return JSON.stringify(a)
return A.k5(a)},
lK(a,b){A.dv(a,"error",t.K)
A.dv(b,"stackTrace",t.l)
A.lJ(a,b)},
dA(a){return new A.dz(a)},
r(a,b){return new A.aB(!1,null,b,a)},
aL(a,b,c){return new A.aB(!0,a,b,c)},
au(a,b,c,d,e){return new A.cO(b,c,!0,a,d,"Invalid value")},
ei(a,b,c){if(0>a||a>c)throw A.b(A.au(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.au(b,a,c,"end",null))
return b}return c},
eh(a,b){if(a<0)throw A.b(A.au(a,0,null,b,null))
return a},
fR(a,b,c,d){return new A.dV(b,!0,a,d,"Index out of range")},
b1(a){return new A.cY(a)},
ke(a){return new A.ez(a)},
j(a){return new A.bY(a)},
am(a){return new A.dI(a)},
a9(a,b,c){return new A.aN(a,b,c)},
lT(a,b,c){var s,r
if(A.jA(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.d([],t.s)
B.a.j($.ak,a)
try{A.nP(a,s)}finally{if(0>=$.ak.length)return A.h($.ak,-1)
$.ak.pop()}r=A.ka(b,t.hf.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
j1(a,b,c){var s,r
if(A.jA(a))return b+"..."+c
s=new A.ab(b)
B.a.j($.ak,a)
try{r=s
r.a=A.ka(r.a,a,", ")}finally{if(0>=$.ak.length)return A.h($.ak,-1)
$.ak.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
nP(a,b){var s,r,q,p,o,n,m,l=a.gv(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.p(l.gl())
B.a.j(b,s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
if(0>=b.length)return A.h(b,-1)
r=b.pop()
if(0>=b.length)return A.h(b,-1)
q=b.pop()}else{p=l.gl();++j
if(!l.k()){if(j<=4){B.a.j(b,A.p(p))
return}r=A.p(p)
if(0>=b.length)return A.h(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gl();++j
for(;l.k();p=o,o=n){n=l.gl();++j
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
cM(a,b,c,d,e,f){var s
if(B.h===c){s=J.J(a)
b=J.J(b)
return A.ev(A.U(A.U($.dw(),s),b))}if(B.h===d){s=J.J(a)
b=J.J(b)
c=J.J(c)
return A.ev(A.U(A.U(A.U($.dw(),s),b),c))}if(B.h===e){s=J.J(a)
b=J.J(b)
c=J.J(c)
d=J.J(d)
return A.ev(A.U(A.U(A.U(A.U($.dw(),s),b),c),d))}if(B.h===f){s=J.J(a)
b=J.J(b)
c=J.J(c)
d=J.J(d)
e=J.J(e)
return A.ev(A.U(A.U(A.U(A.U(A.U($.dw(),s),b),c),d),e))}s=J.J(a)
b=J.J(b)
c=J.J(c)
d=J.J(d)
e=J.J(e)
f=J.J(f)
f=A.ev(A.U(A.U(A.U(A.U(A.U(A.U($.dw(),s),b),c),d),e),f))
return f},
ms(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.h(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.kf(a4<a4?B.b.u(a5,0,a4):a5,5,a3).gcp()
else if(s===32)return A.kf(B.b.u(a5,5,a4),0,a3).gcp()}r=A.cC(8,0,!1,t.S)
B.a.q(r,0,0)
B.a.q(r,1,-1)
B.a.q(r,2,-1)
B.a.q(r,7,-1)
B.a.q(r,3,0)
B.a.q(r,4,0)
B.a.q(r,5,a4)
B.a.q(r,6,a4)
if(A.l0(a5,0,a4,0,r)>=14)B.a.q(r,7,a4)
q=r[1]
if(q>=0)if(A.l0(a5,0,q,20,r)===20)r[7]=q
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
if(!(i&&o+1===n)){if(!B.b.G(a5,"\\",n))if(p>0)h=B.b.G(a5,"\\",p-1)||B.b.G(a5,"\\",p-2)
else h=!1
else h=!0
if(!h){if(!(m<a4&&m===n+2&&B.b.G(a5,"..",n)))h=m>n+2&&B.b.G(a5,"/..",m-3)
else h=!0
if(!h)if(q===4){if(B.b.G(a5,"file",0)){if(p<=0){if(!B.b.G(a5,"/",n)){g="file:///"
s=3}else{g="file://"
s=2}a5=g+B.b.u(a5,n,a4)
m+=s
l+=s
a4=a5.length
p=7
o=7
n=7}else if(n===m){++l
f=m+1
a5=B.b.ab(a5,n,m,"/");++a4
m=f}j="file"}else if(B.b.G(a5,"http",0)){if(i&&o+3===n&&B.b.G(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.b.ab(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.b.G(a5,"https",0)){if(i&&o+4===n&&B.b.G(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.b.ab(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.f7(a4<a5.length?B.b.u(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.n7(a5,0,q)
else{if(q===0)A.c4(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.n8(a5,c,p-1):""
a=A.n3(a5,p,o,!1)
i=o+1
if(i<n){a0=A.k4(B.b.u(a5,i,n),a3)
d=A.n5(a0==null?A.k(A.a9("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.n4(a5,n,m,a3,j,a!=null)
a2=m<l?A.n6(a5,m+1,l,a3):a3
return A.mZ(j,b,a,d,a1,a2,l<a4?A.n2(a5,l+1,a4):a3)},
kj(a){var s=t.N
return B.a.ak(A.d(a.split("&"),t.s),A.as(s,s),new A.hz(B.a4),t.f)},
eD(a,b,c){throw A.b(A.a9("Illegal IPv4 address, "+a,b,c))},
mo(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.h(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.eD("each part must be in the range 0..255",a,r)}A.eD("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.eD(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.b4(d)
if(!(k<16))return A.h(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.eD(j,a,q)
p=l}A.eD("IPv4 address should contain exactly 4 parts",a,q)},
mp(a,b,c){var s
if(b===c)throw A.b(A.a9("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.h(a,b)
if(a.charCodeAt(b)===118){s=A.mq(a,b,c)
if(s!=null)throw A.b(s)
return!1}A.ki(a,b,c)
return!0},
mq(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.h(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.aN(n,a,q)
r=q
break}return new A.aN("Unexpected character",a,q-1)}if(r-1===b)return new A.aN(n,a,r)
return new A.aN("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.aN("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.h(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.h(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.aN("Invalid IPvFuture address character",a,r)}},
ki(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.hy(a3)
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
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.mo(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.i.aZ(l,8)
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
B.al.ct(s,a0,16,s,a)
B.al.dD(s,a,a0,0)}}return s},
mZ(a,b,c,d,e,f,g){return new A.dk(a,b,c,d,e,f,g)},
kF(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
c4(a,b,c){throw A.b(A.a9(c,a,b))},
n5(a,b){var s=A.kF(b)
if(a===s)return null
return a},
n3(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.h(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.h(a,r)
if(a.charCodeAt(r)!==93)A.c4(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.h(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.n0(a,q,r)
if(o<r){n=o+1
p=A.kK(a,B.b.G(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.mp(a,q,o)
l=B.b.u(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.h(a,k)
if(a.charCodeAt(k)===58){o=B.b.aC(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.kK(a,B.b.G(a,"25",n)?o+3:n,c,"%25")}else p=""
A.ki(a,b,o)
return"["+B.b.u(a,b,o)+p+"]"}}return A.na(a,b,c)},
n0(a,b,c){var s=B.b.aC(a,"%",b)
return s>=b&&s<c?s:c},
kK(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.ab(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.h(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.jm(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.ab("")
l=h.a+=B.b.u(a,q,r)
if(m)n=B.b.u(a,r,r+3)
else if(n==="%")A.c4(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.f.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.ab("")
if(q<r){h.a+=B.b.u(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.h(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.b.u(a,q,r)
if(h==null){h=new A.ab("")
m=h}else m=h
m.a+=i
l=A.jl(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.b.u(a,b,c)
if(q<c){i=B.b.u(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
na(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.h(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.jm(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.ab("")
k=B.b.u(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.b.u(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.ab("")
if(q<r){p.a+=B.b.u(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.c4(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.h(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.b.u(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.ab("")
l=p}else l=p
l.a+=k
j=A.jl(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.b.u(a,b,c)
if(q<c){k=B.b.u(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
n7(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.h(a,b)
if(!A.kH(a.charCodeAt(b)))A.c4(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.h(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.c4(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.b.u(a,b,c)
return A.n_(q?a.toLowerCase():a)},
n_(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
n8(a,b,c){return A.dl(a,b,c,16,!1,!1)},
n4(a,b,c,d,e,f){var s=e==="file",r=s||f,q=A.dl(a,b,c,128,!0,!0)
if(q.length===0){if(s)return"/"}else if(r&&!B.b.E(q,"/"))q="/"+q
return A.n9(q,e,f)},
n9(a,b,c){var s=b.length===0
if(s&&!c&&!B.b.E(a,"/")&&!B.b.E(a,"\\"))return A.nb(a,!s||c)
return A.nc(a)},
n6(a,b,c,d){return A.dl(a,b,c,256,!0,!1)},
n2(a,b,c){return A.dl(a,b,c,256,!0,!1)},
jm(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.h(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.h(a,l)
q=a.charCodeAt(l)
p=A.iF(r)
o=A.iF(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.h(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.bs(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.b.u(a,b,b+3).toUpperCase()
return null},
jl(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
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
for(o=0;--p,p>=0;q=128){n=B.i.d9(a,6*p)&63|q
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
o+=3}}return A.kb(s,0,null)},
dl(a,b,c,d,e,f){var s=A.kJ(a,b,c,d,e,f)
return s==null?B.b.u(a,b,c):s},
kJ(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.h(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.jm(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.c4(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.h(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.jl(n)}if(o==null){o=new A.ab("")
k=o}else k=o
k.a=(k.a+=B.b.u(a,p,q))+l
if(typeof m!=="number")return A.oi(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.b.u(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
kI(a){if(B.b.E(a,"."))return!0
return B.b.aB(a,"/.")!==-1},
nc(a){var s,r,q,p,o,n,m
if(!A.kI(a))return a
s=A.d([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.h(s,-1)
s.pop()
if(s.length===0)B.a.j(s,"")}p=!0}else{p="."===n
if(!p)B.a.j(s,n)}}if(p)B.a.j(s,"")
return B.a.aF(s,"/")},
nb(a,b){var s,r,q,p,o,n
if(!A.kI(a))return!b?A.kG(a):a
s=A.d([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.a.gcb(s)!==".."){if(0>=s.length)return A.h(s,-1)
s.pop()}else B.a.j(s,"..")
p=!0}else{p="."===n
if(!p)B.a.j(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.a.j(s,"")
if(!b){if(0>=s.length)return A.h(s,0)
B.a.q(s,0,A.kG(s[0]))}return B.a.aF(s,"/")},
kG(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.kH(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.b.u(a,0,s)+"%3A"+B.b.ar(a,s+1)
if(r<=127){if(!(r<128))return A.h(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
n1(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.h(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.b(A.r("Invalid URL encoding",null))}}return r},
jn(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.h(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.a4===d)return B.b.u(a,b,c)
else p=new A.dH(B.b.u(a,b,c))
else{p=A.d([],t.t)
for(n=b;n<c;++n){if(!(n<o))return A.h(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.b(A.r("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.b(A.r("Truncated URI",null))
B.a.j(p,A.n1(a,n+1))
n+=2}else if(r===43)B.a.j(p,32)
else B.a.j(p,r)}}t.L.a(p)
return B.cJ.dv(p)},
kH(a){var s=a|32
return 97<=s&&s<=122},
kf(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.d([b-1],t.t)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.b(A.a9(k,a,r))}}if(q<0&&r>b)throw A.b(A.a9(k,a,r))
while(p!==44){B.a.j(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.h(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.a.j(j,o)
else{n=B.a.gcb(j)
if(p!==44||r!==n+7||!B.b.G(a,"base64",n+1))throw A.b(A.a9("Expecting '='",a,r))
break}}B.a.j(j,r)
m=r+1
if((j.length&1)===1)a=B.aF.dQ(a,m,s)
else{l=A.kJ(a,m,s,256,!0,!1)
if(l!=null)a=B.b.ab(a,m,s,l)}return new A.hx(a,j,c)},
l0(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.h(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.h(n,p)
o=n.charCodeAt(p)
d=o&31
B.a.q(e,o>>>5,r)}return d},
bl:function bl(a,b,c){this.a=a
this.b=b
this.c=c},
hJ:function hJ(){},
D:function D(){},
dz:function dz(a){this.a=a},
aZ:function aZ(){},
aB:function aB(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cO:function cO(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
dV:function dV(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
cY:function cY(a){this.a=a},
ez:function ez(a){this.a=a},
bY:function bY(a){this.a=a},
dI:function dI(a){this.a=a},
ea:function ea(){},
cV:function cV(){},
hK:function hK(a){this.a=a},
aN:function aN(a,b,c){this.a=a
this.b=b
this.c=c},
i:function i(){},
Q:function Q(a,b,c){this.a=a
this.b=b
this.$ti=c},
S:function S(){},
v:function v(){},
fb:function fb(){},
ab:function ab(a){this.a=a},
hz:function hz(a){this.a=a},
hy:function hy(a){this.a=a},
dk:function dk(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
hx:function hx(a,b,c){this.a=a
this.b=b
this.c=c},
f7:function f7(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
eP:function eP(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
h2:function h2(a){this.a=a},
ds(a){var s
if(typeof a=="function")throw A.b(A.r("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.np,a)
s[$.jC()]=a
return s},
np(a,b,c){t.Z.a(a)
if(A.a(c)>=1)return a.$1(b)
return a.$0()},
l7(a,b,c){return c.a(a[b])},
kT(a,b){return a[b]},
a6(a,b,c,d){return d.a(a[b].apply(a,c))},
os(a,b){var s=new A.N($.I,b.h("N<0>")),r=new A.cZ(s,b.h("cZ<0>"))
a.then(A.c8(new A.iQ(r,b),1),A.c8(new A.iR(r),1))
return s},
kY(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
c9(a){if(A.kY(a))return a
return new A.iC(new A.d2(t.hg)).$1(a)},
iQ:function iQ(a,b){this.a=a
this.b=b},
iR:function iR(a){this.a=a},
iC:function iC(a){this.a=a},
hc:function hc(a){this.z=a},
bV:function bV(a,b){this.a=a
this.b=b},
bU:function bU(a,b){this.a=a
this.b=b},
fn:function fn(a,b){this.a=a
this.b=b},
fo:function fo(){this.a=null
this.d=0},
h9:function h9(){},
cg:function cg(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fD:function fD(){},
dR:function dR(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.e=d
_.w=e},
bN(a,b){return new A.fQ(a,b)},
aW:function aW(){},
ah:function ah(a,b,c){this.a=a
this.b=b
this.c=c},
ai:function ai(a,b,c){this.a=a
this.b=b
this.c=c},
aD:function aD(a,b,c){this.a=a
this.b=b
this.c=c},
eb:function eb(a,b,c){this.a=a
this.b=b
this.c=c},
bo:function bo(a,b,c){this.a=a
this.b=b
this.c=c},
ct:function ct(a,b){this.a=a
this.b=b},
fQ:function fQ(a,b){this.a=a
this.b=b},
ou(a,b,c,d){var s,r,q,p,o,n,m=A.d([],t.cw)
for(s=0-c.a,r=1-c.b,q=0-c.c,q=1+(s*s+r*r+q*q),p=0;!1;++p){o=a[p]
B.a.j(m,new A.da(Math.max(Math.max(1,Math.max(1,1)),0.000001)/q,o))}B.a.af(m,new A.iS())
s=A.d([],t.w)
for(r=A.kc(m,0,A.dv(b,"count",t.S),t.fk),q=r.$ti,r=new A.at(r,r.gp(0),q.h("at<V.E>")),q=q.h("V.E");r.k();){n=r.d
s.push((n==null?q.a(n):n).b)}return s},
bP:function bP(a,b,c){this.a=a
this.b=b
this.c=c},
ae:function ae(){},
iS:function iS(){},
aw:function aw(a,b){this.a=a
this.b=b},
fs:function fs(){},
h5(a){var s,r=t.N,q=A.e0(["sceneColor","present"],r),p=a.a.b
if(p.t(0,"shadows"))q.W(0,A.e0(["shadowMap","sceneDepth"],r))
if(p.t(0,"ssao"))q.W(0,A.e0(["ssaoRaw","ssaoBlurred"],r))
if(p.t(0,"bloom"))q.W(0,A.e0(["bloomBlurH","bloomBlurV","sceneColor#"+(a.d>1?2:1)],r))
if(a.d>1)q.j(0,"sceneColor#1")
if(p.t(0,"dof"))q.W(0,A.e0(["dofBlurH","dofBlurV","dofOutput"],r))
if(p.t(0,"grade"))q.j(0,"gradeOutput")
if(p.t(0,"ps1"))q.j(0,"ps1Output")
s=p.t(0,"vhs")
if(s)q.j(0,"vhsOutput")
return new A.h4(new A.cX(A.j5(q,r),t.am),s)},
h4:function h4(a,b){this.a=a
this.b=b},
h6:function h6(){},
ha:function ha(a){this.b=a},
el:function el(){this.a=null
this.c=0
this.d=!1},
eu:function eu(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fm:function fm(a,b){this.a=a
this.b=b},
fu:function fu(a,b){this.a=a
this.b=b},
ej:function ej(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
bW:function bW(a,b){this.a=a
this.b=b},
L:function L(a,b,c){this.a=a
this.b=b
this.d=c},
fF:function fF(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=e},
m_(){return new A.e1(new A.aE(new A.fY(),A.d([],t.ha),A.d([],t.t),t.ex))},
e1:function e1(a){this.a=a},
fY:function fY(){},
l2(a){var s=4
switch(a){case B.cM:s=0
break
case B.cN:s=1
break
case B.cO:s=2
break
case B.cQ:s=3
break
case B.cR:break
case B.cS:s=5
break
case B.cT:s=6
break
case B.cU:break
case B.cP:s=A.k(A.b1("MeshStore: no shader location reserved for VertexAttributeKind.emissive yet \u2014 safe_world.vert has no emissive input"))
break
default:s=null}return s},
nq(a,b,c){var s,r,q,p,o
for(s=a.gdk(),r=s.length,q=0,p=0;p<r;++p){o=s[p]
if(A.l2(o.gdN())===b)q=B.i.ae(q,o.gel())}return q},
m0(a){return new A.h_(a,new A.aE(new A.h0(),A.d([],t.c9),A.d([],t.t),t.cE),A.as(t.S,t.bw))},
k1(a){var s
A:{s=a.gce(a)
break A}return s},
eB:function eB(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
h_:function h_(a,b,c){this.a=a
this.b=b
this.c=c},
h0:function h0(){},
h1:function h1(){},
mk(a){var s=new A.ex(a,new A.aE(new A.hs(),A.d([],t.fq),A.d([],t.t),t.g2),A.as(t.S,t.j))
s.d=s.V($.jH())
s.e=s.V($.jE())
s.f=s.V($.jF())
s.r=s.V($.jD())
s.w=s.V($.jG())
return s},
ex:function ex(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.w=_.r=_.f=_.e=_.d=$},
hs:function hs(){},
hu:function hu(){},
ht:function ht(){},
o7(a){var s,r,q,p,o,n,m,l,k,j=A.d([],t.gk),i=A.as(t.N,t.S)
for(s=a.length,r=t.G,q=0;q<a.length;a.length===s||(0,A.B)(a),++q){p=a[q]
o=p.gm().geo()
n=A.p(p.gm().gS().gU())+":"+A.p(p.gm().ga9().gU())+":"+A.p(o)
m=i.n(0,n)
if(m==null){i.q(0,n,j.length)
B.a.j(j,new A.b9(p,A.d([p],r)))}else{l=j.length
if(m>>>0!==m||m>=l)return A.h(j,m)
k=j[m].b
if(k.length>=16){i.q(0,n,l)
B.a.j(j,new A.b9(p,A.d([p],r)))}else B.a.j(k,p)}}return j},
b9:function b9(a,b){this.a=a
this.b=b},
dP:function dP(a){this.a=a},
fz:function fz(){},
fA:function fA(a){this.a=a},
fx:function fx(a){this.a=a},
fy:function fy(a){this.a=a},
dQ:function dQ(a,b){this.a=a
this.b=b},
bL:function bL(a,b){this.a=a
this.b=b},
fE:function fE(a,b){this.a=a
this.b=b
this.c=0},
mH(){return new A.c2()},
fC:function fC(a){this.a=a
this.b=null},
c2:function c2(){var _=this
_.e=_.d=_.c=_.b=_.a=0},
j9(){return!0},
F:function F(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
h7:function h7(){},
h8:function h8(){},
ar:function ar(a,b){this.a=a
this.b=b},
a2:function a2(a,b,c){this.a=a
this.b=b
this.c=c},
ek:function ek(a,b){this.a=a
this.b=b},
aP:function aP(a,b){this.a=a
this.b=b},
M:function M(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cR:function cR(a,b){this.a=a
this.b=b},
l:function l(a,b){this.a=a
this.b=b},
ck:function ck(a){this.b=a},
hb:function hb(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=_.d=0},
a3:function a3(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hd:function hd(){},
Z:function Z(a,b,c,d,e,f){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e
_.r=f},
hf:function hf(a,b){this.a=a
this.b=b},
hk:function hk(){},
hj:function hj(){},
hi:function hi(){},
hh:function hh(a){this.a=a},
hg:function hg(a,b,c){this.a=a
this.b=b
this.c=c},
he:function he(a,b){this.a=a
this.b=b},
mf(a){return new A.cP(a,new A.aE(new A.hl(),A.d([],t.aO),A.d([],t.t),t.b0))},
cP:function cP(a,b){this.a=a
this.b=b},
hl:function hl(){},
kR(a){var s,r=a.y
r.toString
s=a.as
s.toString
a.Q=A.ns(a,r,s,a.x.gl().a.b.a).b},
ns(a,b,c,d){var s,r,q,p,o,n,m,l="sceneColor",k=new A.iv(a),j=new A.iw(d,a),i=c.a,h=a.a,g=c.b,f=c.c,e=c.d
if(i.b.t(0,"shadows")){s=a.w
r=s.b
s=s.c
q=A.o8(b,h,B.C,i,s.gdS(),new A.ie(j),new A.ig(j),new A.ih(a),new A.im(a),new A.io(a),new A.ip(j),new A.iq(j),s.gdU(),new A.ir(a),s.gdY(),r.gdW(),k,s.ge_(),s.ge1(),new A.is(j,c),new A.it(j),new A.iu(j),new A.ii(j),new A.ij(j),new A.ik(a),new A.il(j),e,f,g,512)}else{p=new A.M(l,B.k,g,f,e,0)
o=new A.M(l,B.k,g,f,1,1)
j=e>1
i=j?o:p
n=j?new A.cE(h,p,o):null
k=A.d([new A.eI(b,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nout vec4 vColor;\nout vec3 vNormal;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  gl_Position=uViewProjection*model*vec4(aPosition,1.0);\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nuniform vec3 uLightDir;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nout vec4 oColor;\nvoid main(){\n  vec3 n=normalize(vNormal);\n  float ndotl=max(dot(n,normalize(uLightDir)),0.0);\n  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity+vec3(ndotl),0.0,1.0);\n  oColor=vec4(lit,vColor.a);\n}\n",k,p)],t.e)
if(n!=null)k.push(n)
k.push(new A.cN(b,u.l,u.o,h,i,B.C))
q=new A.dP(k)}a.r.toString
m=q.ds(B.P,new A.hd(),!1,new A.f0())
k=m.a.b
if(k.length!==0)throw A.b(A.j("safe renderer graph is invalid: "+A.p(k)))
return new A.i0(q,m)},
nt(b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3=null,b4=b6.Q,b5=b6.x
if(b4==null||b5==null)throw A.b(A.j("renderer graph is not initialized"))
s=A.an(b7.gca(),t.Y)
for(r=0;r<b9.length;++r){q=b9[r]
b6.w.a.b.a4(q.gS()).ges().eE(q.ga2().ap())}p=b8.a
o=A.ob(A.lN(p.c),s,-1)
for(n=s.length,m=0,l=0;l<s.length;s.length===n||(0,A.B)(s),++l){k=s[l].gm().gS()
j=b6.w.a
if(j.c.n(0,k.gU())==null)A.k(A.bN(B.F,k))
j.b.a4(k)
m=B.i.ae(m,b3)}for(s=o.a,n=s.length,i=0,l=0;l<s.length;s.length===n||(0,A.B)(s),++l){k=s[l].gm().gS()
j=b6.w.a
if(j.c.n(0,k.gU())==null)A.k(A.bN(B.F,k))
j.b.a4(k)
i=B.i.ae(i,b3)}n=t.N
k=A.as(n,t.a8)
h=new A.fC(k)
h.dm("cull")
j=m-i
g=h.b
if(g==null)A.k(A.j("cull recorded outside an active frame"))
if(j<0)A.k(A.r("cull totals must be non-negative",b3))
f=k.n(0,g)
f.c+=j
f.e+=o.b.b
e=A.d([],t.c1)
d=A.d([],t.aM)
for(c=s.length,b=t.k,l=0;l<s.length;s.length===c||(0,A.B)(s),++l){a=s[l]
a.gm().gc_()
B.a.j(e,new A.T(new A.ad(B.c_,a.gm().ga9(),a.gm().gS(),a.gF().a),a,b))}a0=new A.eV(A.o7(A.ow(e)),A.ov(d),p,b8.b,b8.c)
a1=new A.dM(b6.a,h)
for(s=b4.b,p=s.length,c=t.do,l=0;l<s.length;s.length===p||(0,A.B)(s),++l){a2=s[l]
b=a2.gm().a
if(b.length===0)A.k(A.aL(b,"passId",b3))
h.b=b
k.b9(b,A.l5())
a3=A.as(n,c)
for(b=a2.gm().c,a4=b.length,a5=0;a5<b.length;b.length===a4||(0,A.B)(b),++a5){a6=b[a5].a
a7=b5.c
if(a7==null)A.k(A.j("GPU resource adapter is not initialized"))
a8=a6.f
a9=a6.a
b0=a8===0?a9:a9+"#"+a8
b1=a7.b.n(0,b0)
if(b1==null)A.k(A.j("resource is not in candidate: "+b0))
b2=new A.bJ(b1)
a3.q(0,a9+"#"+a8,b2)
a3.b9(a9,new A.ix(b2))}a2.L(new A.dE(a3,a1,a0))}return new A.hL(h,o,j)},
hm:function hm(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.f=d
_.r=e
_.w=f
_.x=!1},
hL:function hL(a,b,c){this.a=a
this.b=b
this.c=c},
iv:function iv(a){this.a=a},
iw:function iw(a,b){this.a=a
this.b=b},
iu:function iu(a){this.a=a},
im:function im(a){this.a=a},
io:function io(a){this.a=a},
it:function it(a){this.a=a},
ih:function ih(a){this.a=a},
ij:function ij(a){this.a=a},
ii:function ii(a){this.a=a},
is:function is(a,b){this.a=a
this.b=b},
ie:function ie(a){this.a=a},
ig:function ig(a){this.a=a},
ip:function ip(a){this.a=a},
iq:function iq(a){this.a=a},
ir:function ir(a){this.a=a},
il:function il(a){this.a=a},
ik:function ik(a){this.a=a},
ix:function ix(a){this.a=a},
i0:function i0(a,b){this.a=a
this.b=b},
f0:function f0(){},
eV:function eV(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hn:function hn(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.ax=_.at=_.as=_.Q=_.y=_.x=_.w=_.r=null
_.a$=f
_.b$=g},
ho:function ho(){},
hp:function hp(){},
hq:function hq(){},
f_:function f_(a){this.b=a},
hW:function hW(){},
f4:function f4(){},
eo:function eo(a,b){this.a=a
this.b=b},
ow(a){var s,r,q=A.an(a,t.k)
B.a.af(q,new A.iW())
s=A.O(q)
r=s.h("aV<1,aX>")
s=A.an(new A.aV(q,s.h("aX(1)").a(new A.iX()),r),r.h("V.E"))
s.$flags=1
return s},
ov(a){var s,r,q=A.an(a,t.a)
B.a.af(q,new A.iU())
s=A.O(q)
r=s.h("aV<1,aX>")
s=A.an(new A.aV(q,s.h("aX(1)").a(new A.iV()),r),r.h("V.E"))
s.$flags=1
return s},
ad:function ad(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
T:function T(a,b,c){this.a=a
this.b=b
this.$ti=c},
iW:function iW(){},
iX:function iX(){},
iU:function iU(){},
iV:function iV(){},
ob(a,b,c){var s,r,q,p,o,n,m=A.d([],t.G)
for(s=b.length,r=0,q=0,p=0;p<b.length;b.length===s||(0,A.B)(b),++p){o=b[p];++r
o.gm().geK().eb(0,c)
n=o.gea()
if(!n.gT(n))throw A.b(A.r("cullItems: non-finite world bounds for instance "+o.gF().i(0),null))
if(a.e6(o.gea())===B.a7){++q
continue}B.a.j(m,o)}return new A.fq(m,new A.fr(q))},
fr:function fr(a){this.b=a},
fq:function fq(a,b){this.a=a
this.b=b},
lN(a){var s=a.a,r=new A.fH()
return new A.fG(A.d([r.$4(s[3]+s[0],s[7]+s[4],s[11]+s[8],s[15]+s[12]),r.$4(s[3]-s[0],s[7]-s[4],s[11]-s[8],s[15]-s[12]),r.$4(s[3]+s[1],s[7]+s[5],s[11]+s[9],s[15]+s[13]),r.$4(s[3]-s[1],s[7]-s[5],s[11]-s[9],s[15]-s[13]),r.$4(s[3]+s[2],s[7]+s[6],s[11]+s[10],s[15]+s[14]),r.$4(s[3]-s[2],s[7]-s[6],s[11]-s[10],s[15]-s[14])],t.dV))},
br:function br(a,b){this.a=a
this.b=b},
cr:function cr(a,b){this.a=a
this.b=b},
fG:function fG(a){this.a=a},
fH:function fH(){},
k0(a,b,c,d){var s=1/Math.tan(c/2),r=1/(d-b),q=new Float32Array(16)
q[0]=s/a
q[5]=s
q[10]=(b+d)*r
q[11]=-1
q[14]=2*b*d*r
return new A.bR(q)},
bR:function bR(a){this.a=a},
fX:function fX(){},
ao:function ao(a,b,c){this.a=a
this.b=b
this.c=c},
eL:function eL(a,b){this.a=a
this.b=b},
cf:function cf(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
eM:function eM(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dD:function dD(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
eN:function eN(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e},
dL:function dL(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
eQ:function eQ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eR:function eR(a,b){this.a=a
this.b=b},
co:function co(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
eS:function eS(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dN:function dN(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
eT:function eT(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
dU:function dU(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=f
_.w=g},
eX:function eX(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
cE:function cE(a,b,c){this.a=a
this.b=b
this.c=c},
eZ:function eZ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bJ:function bJ(a){this.b=a},
dE:function dE(a,b,c){this.a=a
this.b=b
this.c=c},
aa(a,b,c,d,e){var s=d==null?a.e:d,r=e==null?a.f:e
return new A.M(a.a,a.b,b,c,s,r)},
ja:function ja(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var _=this
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
_.dx=q},
cN:function cN(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
f1:function f1(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eg:function eg(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
f2:function f2(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
k9(a){var s=Math.abs(0)<0.99?B.cL:B.p,r=B.u.gci(),q=s.bX(r).gci(),p=r.bX(q)
s=new Float32Array(16)
s[0]=q.a
s[1]=p.a
s[2]=-r.a
s[3]=0
s[4]=q.b
s[5]=p.b
s[6]=-r.b
s[7]=0
s[8]=q.c
s[9]=p.c
s[10]=-r.c
s[11]=0
s[12]=-q.b1(B.p)
s[13]=-p.b1(B.p)
s[14]=r.b1(B.p)
s[15]=1
return new A.bt(A.k0(1,1,B.i.du(1,0.1,3),0.05).a_(0,new A.bR(s)))},
bt:function bt(a){this.a=a},
ep:function ep(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
f5:function f5(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
o8(b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=null,a9=u.l,b0="#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexelStep;\nout vec4 oColor;\n\nconst float WEIGHTS[5]=float[5](0.227027,0.1945946,0.1216216,0.054054,0.016216);\n\nvoid main(){\n  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];\n  for(int i=1;i<5;i++){\n    vec2 offset=uTexelStep*float(i);\n    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];\n    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];\n  }\n  oColor=vec4(sum,1.0);\n}\n",b1="bloomBlurH",b2="bloomBlurV",b3="dofBlurH",b4="dofBlurV",b5={},b6=c0.b
if(!b6.t(0,"shadows"))throw A.b(A.aL(c0,"profile","buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile"))
s=b6.t(0,"ssao")
r=b6.t(0,"bloom")
q=b6.t(0,"dof")
p=b6.t(0,"grade")
o=b6.t(0,"ps1")
n=b6.t(0,"vhs")
b6=(e5+1)/2|0
m=(e4+1)/2|0
l=A.aa(B.O,e5,e4,e3,a8)
k=A.aa(B.O.cf(),e5,e4,a8,a8)
A.aa(B.ch,e5,e4,a8,a8)
j=A.aa(B.ce,e5,e4,a8,a8)
i=A.aa(B.c9,e6,e6,a8,a8)
h=A.aa(B.ca,b6,m,a8,a8)
g=A.aa(B.cb,b6,m,a8,a8)
f=A.aa(B.cf,b6,m,a8,a8)
e=A.aa(B.cg,b6,m,a8,a8)
d=$.lf()
c=e3>1
b=A.aa(d,e5,e4,a8,c?2:1)
d=A.aa(B.c6,b6,m,a8,a8)
a=A.aa(B.c7,b6,m,a8,a8)
a0=A.aa(B.c8,e5,e4,a8,a8)
a1=A.aa(B.cc,e5,e4,a8,a8)
a2=A.aa(B.ci,e5,e4,a8,a8)
a3=A.aa(B.cd,e5,e4,a8,a8)
a4=c?new A.cE(b8,l,k):a8
b5.a=null
a5=A.k9(B.aO)
a6=t.e
a7=A.d([],a6)
k=c?k:l
if(r){B.a.W(a7,A.d([new A.cf(b7,a9,b0,b8,b1,b1,B.aA,!0,k,f,d6,b6,m),new A.cf(b7,a9,b0,b8,b2,b2,B.cV,!1,f,e,c2,b6,m),new A.dD(b7,a9,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uBloom;\nuniform float uBloomStrength;\nout vec4 oColor;\n\nvoid main(){\n  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);\n}\n",b8,c3,e,k,b)],a6))
k=b}if(q){B.a.W(a7,A.d([new A.co(b7,a9,b0,b8,b3,b3,B.aB,k,d,d6,b6,m),new A.co(b7,a9,b0,b8,b4,b4,B.cW,d,a,c7,b6,m),new A.dN(b7,a9,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSharp;\nuniform sampler2D uBlurred;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uFocusDistance;\nuniform float uFocusRange;\nuniform float uStrength;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// Circle-of-confusion is a simple linear ramp from the focus distance\n// outward (front and back treated the same \u2014 no separate near/far falloff\n// curve), clamped to [0,1] and scaled by uStrength so\n// PostProcessState.depthOfFieldStrength == 0 is a true no-op (coc == 0\n// everywhere, oColor == the sharp source exactly).\nvoid main(){\n  float depth=linearDepth(texture(uSceneDepth,vUv).r);\n  float coc=clamp(abs(depth-uFocusDistance)/max(uFocusRange,0.0001),0.0,1.0)*uStrength;\n  vec3 sharp=texture(uSharp,vUv).rgb;\n  vec3 blurred=texture(uBlurred,vUv).rgb;\n  oColor=vec4(mix(sharp,blurred,coc),1.0);\n}\n",b8,d6,c8,d7,c4,k,j,a,a0)],a6))
k=a0}if(p){B.a.j(a7,new A.dU(b7,a9,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uLut;\nuniform float uLutSize;\nuniform float uStrength;\nout vec4 oColor;\n\n// \xa75.3's \"identity LUT\" baseline resource and this shader's actual grade LUT\n// are both just textures in this same unwrapped-3D-LUT layout (width =\n// size*size, height = size, blue index selects a size*size horizontal\n// slice) \u2014 there is nothing identity-specific about the sampling path\n// itself, only about what a given LUT texture's texels happen to encode.\nvec3 sampleLut(vec3 color){\n  float size=uLutSize;\n  float maxIndex=size-1.0;\n  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;\n  float bLow=floor(scaled.b);\n  float bHigh=min(bLow+1.0,maxIndex);\n  float bFrac=scaled.b-bLow;\n  vec2 texel=vec2(1.0/(size*size),1.0/size);\n  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);\n  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);\n  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);\n  vec3 colorLow=texture(uLut,uvLow).rgb;\n  vec3 colorHigh=texture(uLut,uvHigh).rgb;\n  return mix(colorLow,colorHigh,bFrac);\n}\n\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  vec3 graded=sampleLut(scene);\n  oColor=vec4(mix(scene,graded,uStrength),1.0);\n}\n",b8,d0,k,a1))
k=a1}if(o){B.a.j(a7,new A.eg(b7,a9,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform float uQuantizationBits;\nuniform float uDitherStrength;\nout vec4 oColor;\n\nconst float BAYER4X4[16]=float[16](\n  0.0,8.0,2.0,10.0,\n  12.0,4.0,14.0,6.0,\n  3.0,11.0,1.0,9.0,\n  15.0,7.0,13.0,5.0\n);\n\nfloat bayerValue(vec2 fragCoord){\n  int x=int(mod(fragCoord.x,4.0));\n  int y=int(mod(fragCoord.y,4.0));\n  return BAYER4X4[y*4+x]/16.0;\n}\n\n// \xa76.2's \"quantization/dither is an explicit composite after LUT grade\":\n// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is\n// added before rounding to uQuantizationBits levels per channel \u2014 this is\n// what breaks a hard quantization boundary into a dithered gradient instead\n// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)\n// with uDitherStrength==0 round-trips the source exactly: no dither offset\n// is added, and floor(x*255+0.5)/255 returns an already-8-bit value\n// unchanged.\nvoid main(){\n  vec3 scene=texture(uScene,vUv).rgb;\n  float levels=pow(2.0,uQuantizationBits)-1.0;\n  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;\n  vec3 dithered=clamp(scene+dither,0.0,1.0);\n  vec3 quantized=floor(dithered*levels+0.5)/levels;\n  oColor=vec4(quantized,1.0);\n}\n",b8,k,a2))
k=a2}if(n){B.a.j(a7,new A.eF(b7,a9,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uHistory;\nuniform float uTime;\nuniform float uChromaWeight;\nuniform float uTrackingWeight;\nuniform float uNoiseWeight;\nuniform float uHeadSwitchWeight;\nuniform float uDropoutWeight;\nuniform float uGhostWeight;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);\n}\n\n// \xa78.10: "sample the jittered/tracking UV before YIQ/chroma work so later\n// sampling does not overwrite earlier effects" \u2014 tracking jitter is\n// computed and applied to the UV exactly once, up front; every later\n// effect either operates on the resulting single sample or samples a\n// further offset FROM that same jittered UV, never re-reading uScene at\n// the original vUv.\nvoid main(){\n  float scanline=vUv.y;\n\n  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times\n  // a second (not per-frame) so it reads as tape wobble rather than\n  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at\n  // this bootstrap\'s 384-wide internal resolution) is the max displacement\n  // regardless of weight \u2014 a weight of 1.0 must read as "visibly glitchy,"\n  // never as "the image is unreadable."\n  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;\n  float jitter=trackingNoise*0.02*uTrackingWeight;\n  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);\n  vec3 raw=texture(uScene,uv).rgb;\n\n  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for\n  // the chroma (I/Q) channels only \u2014 luma (what reads as "sharp" to the\n  // eye) stays exactly where tracking already put it; only color smears.\n  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);\n  vec3 rawChroma=texture(uScene,chromaUv).rgb;\n  float y=dot(raw,vec3(0.299,0.587,0.114));\n  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));\n  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));\n  vec3 yiqColor=vec3(\n    y+0.956*i+0.621*q,\n    y-0.272*i-0.647*q,\n    y-1.106*i+1.703*q\n  );\n  vec3 color=mix(raw,yiqColor,uChromaWeight);\n\n  // Static/snow: modeled in YIQ (luma + chroma), the same conversion\n  // chroma bleed already uses above, not independent RGB \u2014 real analog\n  // colour noise comes from the chroma subcarrier, so its hues are\n  // correlated/limited rather than arbitrary per-channel static. Noise\n  // cells are quantized coarser along x than y, giving each speckle a\n  // short horizontal dash instead of an isolated dot \u2014 a "vague line\n  // shape," matching how scanline-based static actually streaks. A\n  // sparser, stronger sparkle layer and a rare single-sample micro-\n  // distortion (an actual tiny position offset, not just colour) are both\n  // gated by a high-threshold mask so only occasional pixels carry the\n  // effect \u2014 small magnitude on top of that sparsity, for a sprinkle, not\n  // a wash.\n  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;\n  float noiseY=(hash(noiseCell)-0.5)*0.05;\n  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;\n  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;\n  vec3 noiseYiq=vec3(\n    noiseY+0.956*noiseI+0.621*noiseQ,\n    noiseY-0.272*noiseI-0.647*noiseQ,\n    noiseY-1.106*noiseI+1.703*noiseQ\n  );\n  color+=noiseYiq*uNoiseWeight;\n  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));\n  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;\n  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;\n  vec3 sparkleYiq=0.5+0.5*vec3(\n    0.956*sparkleI+0.621*sparkleQ,\n    -0.272*sparkleI-0.647*sparkleQ,\n    -1.106*sparkleI+1.703*sparkleQ\n  );\n  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;\n  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));\n  vec2 distortOffset=\n    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;\n  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;\n  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);\n\n  // Head-switch band: a thin strip near the bottom of frame (where a real\n  // VCR\'s playback head crosses the tape edge) gets a stronger tear,\n  // fading smoothly over the band\'s height rather than a hard cutoff.\n  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));\n  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;\n  vec2 headSwitchUv=vec2(\n    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),\n    uv.y\n  );\n  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;\n  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);\n\n  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.\n  // Real dropout is neither a flat full-width bar nor a fixed brightness \u2014\n  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each\n  // streak\'s width and edges vary along its length, and a per-streak\n  // random intensity keeps consecutive dropouts from looking identical. A\n  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep\n  // this an occasional glitch rather than a strobe \u2014 subtle enough not to\n  // distract during continuous play, even at uDropoutWeight\'s full value.\n  float dropoutCell=floor(uTime*6.0);\n  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));\n  float dropoutActive=step(0.994,dropoutRoll);\n  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;\n  float dropoutMask=hash(\n    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)\n  );\n  float dropoutStripe=\n    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);\n  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);\n\n  // Ghosting: blends in last frame\'s own VHS *output* (uHistory, never\n  // uScene), horizontally offset, for a trailing double-image echo \u2014\n  // reading the previous frame\'s already-composited result is what makes\n  // this a genuine feedback trail rather than a static double-exposure.\n  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);\n  vec3 ghostColor=texture(uHistory,ghostUv).rgb;\n  color=mix(color,ghostColor,uGhostWeight*0.5);\n\n  oColor=vec4(clamp(color,0.0,1.0),1.0);\n}\n',b8,e2,e1,k,a3))
k=a3}j=A.d([new A.dL(b7,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout highp vec2 vUv;\nout highp float vUvW;\n// This prepass must land geometry on exactly the same pixels shadowedWorld\n// will, because its depth is what SSAO occludes against and what\n// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there\n// and not here would mean the AO texel a fragment reads was computed for a\n// slightly different surface than the one being shaded, and the error grows\n// with the grid. The snap math below is deliberately identical to\n// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.\n// The same reasoning now covers UVs: an alpha-masked surface's holes must\n// land on the same pixels in both passes, and affine sampling moves where a\n// given texel lands, so the w-premultiply below is the same expression\n// shadowed_world.vert uses and is driven from the same per-material weight.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n}\n","#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nin highp float vUvW;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\nuniform float uAffineWarpStrength;\n// \xa76.2: \"includes opaque + alpha-masked depth.\" A masked surface's holes\n// must not write depth, or SSAO occludes against geometry the world pass\n// discarded and DOF's CoC defocuses against a surface nothing shaded. The\n// compare is bit-identical to shadowed_world.frag's \u2014 same uv recovery,\n// same threshold, same direction \u2014 because any divergence reintroduces\n// exactly the class of bug the vertex-snap parity fix (bug 17) closed.\n// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw\n// costs no texture fetch at all here, only the interpolation the varyings\n// were already going to do.\nvoid main(){\n  if(uAlphaCutoff>0.){\n    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;\n  }\n}\n",d3,d2,c1,j)],a6)
if(s)j.push(new A.es(b7,a9,"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSceneDepth;\nuniform float uNear;\nuniform float uFar;\nuniform float uProjScaleX;\nuniform float uProjScaleY;\nuniform float uRadius;\nuniform float uStrength;\nout vec4 oColor;\n\nconst int KERNEL_SIZE=8;\nconst vec3 KERNEL[8]=vec3[8](\n  vec3( 0.35, 0.23, 0.45),\n  vec3(-0.28, 0.41, 0.32),\n  vec3( 0.18,-0.36, 0.55),\n  vec3(-0.42,-0.19, 0.28),\n  vec3( 0.51, 0.08, 0.18),\n  vec3(-0.11, 0.53, 0.16),\n  vec3( 0.07,-0.48, 0.38),\n  vec3(-0.33,-0.31, 0.48)\n);\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\nvec3 viewPosAt(vec2 uv){\n  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);\n  vec2 ndc=uv*2.0-1.0;\n  float viewX=ndc.x*(-viewZ)/uProjScaleX;\n  float viewY=ndc.y*(-viewZ)/uProjScaleY;\n  return vec3(viewX,viewY,viewZ);\n}\n\n// Pinned per-pixel kernel rotation \u2014 a deterministic hash of screen\n// position, not per-frame randomness, matching \xa78.5's \"rotates a small\n// kernel from pinned blue noise\" without the extra machinery of an actual\n// noise texture: the rotation angle is stable across frames for a given\n// pixel, which is what \"pinned\" requires (temporal stability), while still\n// varying spatially enough to break up banding between neighboring samples.\nfloat pinnedRotation(vec2 fragCoord){\n  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;\n}\n\nvoid main(){\n  vec3 originView=viewPosAt(vUv);\n  // Screen-space derivatives reconstruct a per-fragment normal from\n  // neighboring depth samples alone \u2014 no G-buffer normal attachment exists\n  // (deferred; see depth_prepass.dart's doc comment), which is sufficient\n  // for a chunky/stylized AO term rather than a precision-critical one.\n  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));\n\n  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before\n  // it's transformed into view space by tbn below \u2014 this is what actually\n  // varies the kernel per pixel; rotating the already-reprojected screen UV\n  // afterward would rotate around the wrong origin and misalign every\n  // sample from the surface it's meant to test.\n  float angle=pinnedRotation(gl_FragCoord.xy);\n  float ca=cos(angle);\n  float sa=sin(angle);\n  mat2 rot=mat2(ca,sa,-sa,ca);\n\n  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);\n  vec3 tangent=normalize(cross(up,normalView));\n  vec3 bitangent=cross(normalView,tangent);\n  mat3 tbn=mat3(tangent,bitangent,normalView);\n\n  float occlusion=0.0;\n  for(int i=0;i<KERNEL_SIZE;i++){\n    vec3 kernelSample=KERNEL[i];\n    kernelSample.xy=rot*kernelSample.xy;\n    vec3 samplePos=originView+tbn*kernelSample*uRadius;\n    // Project the sample's view-space position back to screen UV using the\n    // same scale factors used to reconstruct it, inverted.\n    vec2 sampleUv=vec2(\n      samplePos.x*uProjScaleX/(-samplePos.z),\n      samplePos.y*uProjScaleY/(-samplePos.z)\n    );\n    // NDC [-1,1] -> UV [0,1] requires the constant 0.5, not vUv (the\n    // *current* fragment's own UV) \u2014 adding vUv here was a real bug: it\n    // conflated \"this sample's own absolute reprojected screen position\"\n    // with \"an offset relative to the current fragment,\" producing an\n    // error of (vUv-0.5) per axis that grows with distance from screen\n    // center. That's exactly what produced a huge, blobby, non-local dark\n    // region instead of contact occlusion \u2014 every sample tested a wildly\n    // wrong depth location except right at screen center, where the error\n    // happened to be near zero.\n    sampleUv=sampleUv*0.5+0.5;\n    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){\n      continue;\n    }\n    vec3 occluderView=viewPosAt(sampleUv);\n    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));\n    occlusion+=(occluderView.z>=samplePos.z+0.02?1.0:0.0)*rangeCheck;\n  }\n  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);\n  oColor=vec4(vec3(ao),1.0);\n}\n",b8,d7,c4,h))
if(s)j.push(new A.er(b7,a9,'#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uSsaoRaw;\nuniform sampler2D uSceneDepth;\nuniform vec2 uTexelSize;\nuniform float uNear;\nuniform float uFar;\nout vec4 oColor;\n\nfloat linearDepth(float raw){\n  float ndc=raw*2.0-1.0;\n  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));\n}\n\n// \xa78.5: "uses a depth-aware bilateral blur rather than smearing across\n// silhouettes" \u2014 a plain box blur would bleed occlusion from a near object\n// onto a far background behind it (or vice versa) whenever they share\n// screen-space pixels near a silhouette edge; weighting each tap by how\n// close its depth is to the center tap\'s depth is what keeps the blur\n// confined to one surface at a time.\nvoid main(){\n  float centerDepth=linearDepth(texture(uSceneDepth,vUv).r);\n  float sum=0.0;\n  float weightSum=0.0;\n  for(int y=-2;y<=2;y++){\n    for(int x=-2;x<=2;x++){\n      vec2 offset=vec2(float(x),float(y))*uTexelSize;\n      vec2 sampleUv=vUv+offset;\n      float sampleDepth=linearDepth(texture(uSceneDepth,sampleUv).r);\n      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*4.0);\n      sum+=texture(uSsaoRaw,sampleUv).r*depthWeight;\n      weightSum+=depthWeight;\n    }\n  }\n  float blurred=sum/max(weightSum,0.0001);\n  oColor=vec4(vec3(blurred),1.0);\n}\n',b8,e0,d7,c4,b6,m,h,g))
j.push(new A.ep(b7,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=4) in vec3 aUvMat;\nuniform mat4 uLightViewProjection;\nuniform mat4 uModel;\nuniform mat4 uInstanceModels[16];\nuniform float uUseInstances;\nout highp vec2 vUv;\n// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is\n// an artifact of *this camera's* screen-space rasterization; the shadow map\n// rasterizes the same triangle from the light, where the equivalent warp\n// would be a different, unrelated distortion. A masked surface therefore\n// cuts its shadow from the perspective-correct UVs \u2014 the geometrically\n// right holes \u2014 while the camera passes cut theirs from whatever the PS1\n// profile asked for. That divergence is deliberate: the two rasterizations\n// have no shared screen space to agree in.\nvoid main(){\n  mat4 model=uModel;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];}\n  vUv=aUvMat.xy;\n  gl_Position=uLightViewProjection*model*vec4(aPosition,1.0);\n}\n",'#version 300 es\nprecision highp float;\nin highp vec2 vUv;\nuniform sampler2D uAlbedo;\nuniform float uAlphaCutoff;\n// \xa76.2: "alpha-masked geometry participates in shadow, prepass, and opaque\n// depth-writing routes." Without this discard a lattice, a leaf or a grille\n// casts the solid shadow of its bounding quad \u2014 the single most obvious way\n// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so\n// every opaque caster costs exactly what it did before this existed.\nvoid main(){\n  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;\n}\n',d3,d2,c1,c5,a8,a8,new A.iA(b5),i))
j.push(new A.eq(b7,"#version 300 es\nlayout(location=0) in vec3 aPosition;\nlayout(location=1) in vec3 aNormal;\nlayout(location=2) in vec4 aColor;\nlayout(location=3) in float aAlpha;\nlayout(location=4) in vec3 aUvMat;\nlayout(location=5) in vec4 aTangent;\nlayout(location=6) in vec2 aUv1;\nuniform mat4 uViewProjection;\nuniform mat4 uView;\nuniform mat4 uModel;\nuniform mat4 uNormalMatrix;\nuniform mat4 uInstanceModels[16];\nuniform mat4 uInstanceNormalMatrices[16];\nuniform float uUseInstances;\nuniform mat4 uLightViewProjection;\nuniform float uVertexSnapGrid;\nuniform float uAffineWarpStrength;\nout vec4 vColor;\nout vec3 vNormal;\nout highp vec2 vUv;\nout highp float vUvW;\nout highp vec2 vUv1;\nout vec4 vLightSpacePos;\nout vec3 vWorldPos;\nout vec4 vTangent;\nout float vViewDepth;\nvoid main(){\n  mat4 model=uModel;\n  mat4 normalMatrix=uNormalMatrix;\n  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}\n  vColor=vec4(aColor.rgb,aAlpha);\n  vNormal=mat3(normalMatrix)*aNormal;\n  vec4 worldPos=model*vec4(aPosition,1.0);\n  vWorldPos=worldPos.xyz;\n  vTangent=vec4(mat3(normalMatrix)*aTangent.xyz,aTangent.w);\n  vLightSpacePos=uLightViewProjection*worldPos;\n  // RV-09 rung 5's fog: the same \"linear view depth\" convention SSAO/DOF\n  // already reconstruct from a depth texture, computed directly here\n  // instead \u2014 this pass rasterizes the actual geometry, so there is a true\n  // view-space Z per-vertex already, with no texture round-trip needed.\n  vViewDepth=-(uView*worldPos).z;\n  vec4 clip=uViewProjection*worldPos;\n  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before\n  // the perspective divide, emulating the fixed-point vertex transform\n  // precision loss that gives PS1 geometry its characteristic wobble as it\n  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/\n  // safe path is bit-for-bit unchanged from before this rung.\n  if(uVertexSnapGrid>0.0){\n    vec2 ndc=clip.xy/clip.w;\n    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;\n    clip.xy=ndc*clip.w;\n  }\n  gl_Position=clip;\n  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no\n  // `noperspective` qualifier, so the divide the rasterizer already performs\n  // is cancelled instead of disabled: hardware hands the fragment\n  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that\n  // expression collapse to interp(v) \u2014 screen-space linear, which *is*\n  // affine. Both varyings are scaled by the same factor so the fragment's\n  // vUv/vUvW recovers exactly that, and the intermediate blend between the\n  // two regimes stays continuous rather than popping at any strength.\n  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to\n  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on\n  // the same uniform, so the perspective-correct path is untouched rather\n  // than merely round-tripped. Snapping above only rewrites clip.xy, never\n  // clip.w, so the two PS1 halves are independent.\n  float affineW=mix(1.0,clip.w,uAffineWarpStrength);\n  vUv=aUvMat.xy*affineW;\n  vUvW=affineW;\n  vUv1=aUv1;\n}\n","#version 300 es\nprecision highp float;\nin vec4 vColor;\nin vec3 vNormal;\nin highp vec2 vUv;\nin highp float vUvW;\nin highp vec2 vUv1;\nin vec4 vLightSpacePos;\nin vec3 vWorldPos;\nin vec4 vTangent;\nin float vViewDepth;\nuniform sampler2D uAlbedo;\nuniform sampler2D uNormalMap;\nuniform sampler2D uOrmMap;\nuniform sampler2D uEmissiveMap;\nuniform sampler2D uLightmap;\nuniform sampler2D uShadowMap;\nuniform vec3 uCameraPosition;\nuniform vec3 uLightPosition;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform float uLightIntensity;\nuniform float uLightRange;\nuniform float uLightInnerCos;\nuniform float uLightOuterCos;\nuniform float uSpotEnabled;\nuniform vec3 uDirectionalDirection;\nuniform vec3 uDirectionalColor;\nuniform float uDirectionalIntensity;\nuniform vec3 uPointPosition0;\nuniform vec3 uPointColor0;\nuniform float uPointIntensity0;\nuniform float uPointRadius0;\nuniform vec3 uPointPosition1;\nuniform vec3 uPointColor1;\nuniform float uPointIntensity1;\nuniform float uPointRadius1;\nuniform vec3 uPointPosition2;\nuniform vec3 uPointColor2;\nuniform float uPointIntensity2;\nuniform float uPointRadius2;\nuniform vec3 uPointPosition3;\nuniform vec3 uPointColor3;\nuniform float uPointIntensity3;\nuniform float uPointRadius3;\nuniform vec3 uDirectSpotPosition0;\nuniform vec3 uDirectSpotDirection0;\nuniform vec3 uDirectSpotColor0;\nuniform float uDirectSpotIntensity0;\nuniform float uDirectSpotRange0;\nuniform float uDirectSpotInnerCos0;\nuniform float uDirectSpotOuterCos0;\nuniform float uDirectSpotEnabled0;\nuniform vec3 uDirectSpotPosition1;\nuniform vec3 uDirectSpotDirection1;\nuniform vec3 uDirectSpotColor1;\nuniform float uDirectSpotIntensity1;\nuniform float uDirectSpotRange1;\nuniform float uDirectSpotInnerCos1;\nuniform float uDirectSpotOuterCos1;\nuniform float uDirectSpotEnabled1;\nuniform vec3 uDirectSpotPosition2;\nuniform vec3 uDirectSpotDirection2;\nuniform vec3 uDirectSpotColor2;\nuniform float uDirectSpotIntensity2;\nuniform float uDirectSpotRange2;\nuniform float uDirectSpotInnerCos2;\nuniform float uDirectSpotOuterCos2;\nuniform float uDirectSpotEnabled2;\nuniform vec3 uAmbientColor;\nuniform float uAmbientIntensity;\nuniform vec2 uShadowMapTexelSize;\nuniform vec3 uMaterialTint;\nuniform vec4 uUvScaleOffset;\nuniform sampler2D uSsao;\nuniform vec2 uSceneColorSize;\nuniform float uEmissiveStrength;\nuniform float uNormalStrength;\nuniform float uRoughness;\nuniform float uMetallic;\nuniform float uOcclusionStrength;\nuniform float uClearcoatStrength;\nuniform float uClearcoatRoughness;\nuniform float uLightmapIntensity;\nuniform float uAffineWarpStrength;\nuniform float uAlphaCutoff;\nuniform float uOpaqueCoverage;\nuniform vec3 uFogColor;\nuniform float uFogStart;\nuniform float uFogEnd;\nuniform float uFogHeightFalloff;\nuniform float uFogDensity;\nuniform float uReceivesShadow;\nuniform float uRainWetness;\nlayout(location=0)out vec4 oColor;\nlayout(location=1)out vec4 oGlow;\n\n// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range\n// rather than an unbounded inverse-square that never reaches zero) times\n// cone-edge falloff (smoothstep between the outer and inner cone angles,\n  // SpotLight.outerConeRadians/innerConeRadians \u2014 both fields existed on the\n  // API already but nothing read them before this, so the light previously\n  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of\n// a graduated pool of light).\nfloat rangeAttenuation(float dist,float range){\n  float normalized=clamp(dist/max(range,.001),0.,1.);\n  // Smooth quartic cutoff avoids a visible ring at the authored range while\n  // retaining an inverse-square response inside the light's influence.\n  float cutoff=1.-normalized*normalized*normalized*normalized;\n  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));\n  return cutoff*cutoff*inverseSquare;\n}\n\nfloat lightAttenuation(vec3 worldPos){\n  vec3 toFrag=worldPos-uLightPosition;\n  float dist=length(toFrag);\n  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));\n  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);\n  return rangeAttenuation(dist,uLightRange)*coneFalloff;\n}\n\nfloat pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){\n  float dist=length(lightPosition-worldPos);\n  return rangeAttenuation(dist,lightRadius);\n}\n\nvec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightColor,float lightIntensity,float lightRadius){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  return lightColor*lightIntensity*ndotl*\n    pointAttenuation(worldPos,lightPosition,lightRadius);\n}\n\nvec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,\n  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,\n  float innerCos,float outerCos,float enabled){\n  vec3 toLight=lightPosition-worldPos;\n  float ndotl=max(dot(normal,normalize(toLight)),0.);\n  vec3 toFrag=worldPos-lightPosition;\n  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));\n  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);\n  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);\n  return lightColor*lightIntensity*ndotl*coneFalloff*\n    distanceFalloff*enabled;\n}\n\n// Compact Cook-Torrance response for the clean/high path. The bounded\n// per-light evaluation makes roughness and metallic maps visibly useful\n// without introducing a deferred light buffer.\nfloat distributionGgx(float ndoth,float roughness){\n  float a=roughness*roughness;\n  float a2=a*a;\n  float denom=ndoth*ndoth*(a2-1.0)+1.0;\n  return a2/(3.14159265*denom*denom);\n}\n\nfloat geometrySchlick(float ndotv,float roughness){\n  float k=(roughness+1.0)*(roughness+1.0)/8.0;\n  return ndotv/(ndotv*(1.0-k)+k);\n}\n\nfloat geometrySmith(float ndotv,float ndotl,float roughness){\n  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);\n}\n\nvec3 fresnelSchlick(float cosTheta,vec3 f0){\n  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);\n}\n\nvec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,\n  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,\n  float roughness,float metallic){\n  vec3 halfDir=normalize(viewDir+lightDir);\n  float ndotv=max(dot(normal,viewDir),0.0);\n  float ndotl=max(dot(normal,lightDir),0.0);\n  float ndoth=max(dot(normal,halfDir),0.0);\n  float hdotv=max(dot(halfDir,viewDir),0.0);\n  vec3 f0=mix(vec3(0.04),baseColor,metallic);\n  vec3 fresnel=fresnelSchlick(hdotv,f0);\n  float distribution=distributionGgx(ndoth,roughness);\n  float geometry=geometrySmith(ndotv,ndotl,roughness);\n  vec3 numerator=distribution*geometry*fresnel;\n  float denominator=max(4.0*ndotv*ndotl,0.001);\n  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;\n}\n\nfloat sampleShadow(vec3 projCoord,float bias){\n  float shadowDepth=texture(uShadowMap,projCoord.xy).r;\n  return projCoord.z-bias>shadowDepth?0.:1.;\n}\n\n// \xa78.5's fog: \"distance plus restrained height/damp modulation\" \u2014 the base\n// term is a smoothstepped distance ramp (uFogStart..uFogEnd), not a plain\n// linear one: a linear ramp's density right at uFogStart is already\n// visibly nonzero, which reads as a hard onset band across a large\n// continuous surface like the ground plane. smoothstep's derivative is\n// zero at both ends, so density stays low just past uFogStart and eases\n// in gradually instead. Height falloff and density are each optional in\n// FrameEnvironment (nullable there, 0.0 here) and each written so 0.0 is\n// an exact no-op, rather than needing a separate enabled flag per term:\n//   - height: exp(-0*y) == 1, an identity multiply, when no falloff is set;\n//   - density: 1-exp(-0*depth) == 0, so max(distance, 0) leaves the plain\n//     distance term untouched when no density is set. Density can only\n//     ever push fog stronger than the base distance ramp, never weaker \u2014\n//     \"restrained\" in the sense that it augments, never overrides.\nfloat fogFactor(float viewDepth,float worldY){\n  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);\n  float densityFactor=1.-exp(-uFogDensity*viewDepth);\n  float factor=max(distFactor,densityFactor);\n  float heightFactor=exp(-uFogHeightFalloff*max(worldY,0.));\n  return clamp(factor*heightFactor,0.,1.);\n}\n\nfloat shadowFactor(float ndotl){\n  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;\n  projCoord=projCoord*.5+.5;\n  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){\n    return 1.;\n  }\n  // Receiver-plane style slope bias keeps grazing surfaces from acne while\n  // avoiding the detached-shadow look of a large constant offset.\n  float bias=max(.003*(1.-ndotl),.0008);\n  // Fixed low-discrepancy offsets avoid the directional shimmer of a regular\n  // square lattice while remaining deterministic and free of per-frame noise.\n  vec2 t=uShadowMapTexelSize;\n  float sum=0.;\n  sum+=sampleShadow(projCoord+vec3(vec2(-.942,-.399)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.945,-.768)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.094,.886)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.344,.294)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.716,.642)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.688,-.089)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(-.287,-.885)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.052,.008)*t,0.),bias);\n  sum+=sampleShadow(projCoord+vec3(vec2(.831,.486)*t,0.),bias);\n  return sum/9.;\n}\n\nvoid main(){\n  // The divide that undoes the rasterizer's own perspective correction (see\n  // shadowed_world.vert). Branched on the uniform rather than always\n  // dividing, so a zero-strength draw samples the untouched vUv and is\n  // bit-identical to the pre-affine path \u2014 the divisor is 1.0 there, but\n  // only after an interpolate/divide round-trip that need not return\n  // exactly 1.0. The branch is uniform across the whole draw, so it costs\n  // no divergence.\n  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;\n  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;\n  vec4 tex=texture(uAlbedo,uv);\n  // \xa76.2's alpha-masked route. Deliberately the first thing after the\n  // fetch it depends on, and ahead of all the lighting below: a discarded\n  // fragment must not pay for four shadow-map taps and two normalizes it\n  // will never use. uAlphaCutoff==0 is the pass's \"this material has no\n  // cutout\" sentinel (MaterialDefinition.validate forbids a real zero), so\n  // opaque and blended draws take a path containing no alpha compare at\n  // all rather than one comparing against an unreachable threshold. The\n  // same test, against the same uv, runs in depth_prepass.frag and\n  // shadow_caster.frag \u2014 three passes must agree on which fragments exist\n  // or SSAO, DOF and shadowing all occlude against holes this pass shaded\n  // through.\n  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;\n  vec3 n=normalize(vNormal);\n  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.\n  // Compatibility14 meshes leave the attribute at its default zero and use\n  // the derivative frame below, so old content and authored tangents share\n  // one shader contract.\n  if(uNormalStrength>0.0){\n    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);\n    vec2 duv1=dFdx(uv),duv2=dFdy(uv);\n    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);\n    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);\n    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));\n    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;\n    vec3 t=hasAuthoredT?authoredT:derivativeT;\n    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;\n    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;\n    map.xy*=uNormalStrength;\n    n=normalize(mat3(t,b,n)*normalize(map));\n  }\n  vec3 orm=texture(uOrmMap,uv).rgb;\n  float normalVariance=0.0;\n  if(uNormalStrength>0.0){\n    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high\n    // resolution map is minified. It preserves authored relief at distance\n    // while converting unresolved detail into a stable roughness increase.\n    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;\n    vec3 normalDx=dFdx(normalSample);\n    vec3 normalDy=dFdy(normalSample);\n    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);\n  }\n  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;\n  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));\n  vec3 direct=vec3(0.);\n  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);\n  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;\n  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,\n    uPointIntensity0,uPointRadius0);\n  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,\n    uPointIntensity1,uPointRadius1);\n  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,\n    uPointIntensity2,uPointRadius2);\n  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,\n    uPointIntensity3,uPointRadius3);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,\n    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,\n    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,\n    uDirectSpotEnabled0);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,\n    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,\n    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,\n    uDirectSpotEnabled1);\n  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,\n    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,\n    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,\n    uDirectSpotEnabled2);\n  vec3 toSpot=normalize(uLightPosition-vWorldPos);\n  float spotNdotL=max(dot(n,toSpot),0.);\n  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;\n  float attenuation=lightAttenuation(vWorldPos);\n  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;\n  // \xa78.5: \"modulates ambient only\" \u2014 SSAO must never darken the direct\n  // (N.L * shadow * attenuation) term, only the ambient fill, or it would\n  // double up with real shadowing and read as an incorrect global darkening\n  // rather than contact occlusion specifically.\n  vec3 ambient=uAmbientColor*uAmbientIntensity*ao;\n  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;\n  // Metallic surfaces contribute less diffuse energy; roughness keeps a\n  // small, stable broadening factor until the surface-v2 camera/specular\n  // block lands. Both channels therefore affect the live output rather than\n  // being metadata-only fields.\n  float metal=clamp(uMetallic*orm.b,0.0,1.0);\n  float rough=clamp(uRoughness*orm.g,0.0,1.0);\n  // Avoid singular highlights while retaining a visibly sharp porcelain\n  // response at the authored low end of the roughness range.\n  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));\n  vec3 viewDir=normalize(uCameraPosition-vWorldPos);\n  vec3 specular=vec3(0.0);\n  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),\n    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,\n    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,\n    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,\n    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,\n    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,\n    specRough,metal);\n  specular+=specularContribution(n,viewDir,\n    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,\n    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);\n  // Rain response stays in the world pass so it follows geometry depth rather\n  // than painting streaks over the whole screen. Near surfaces receive a\n  // restrained cool darkening and a broad wet highlight; distant surfaces\n  // fade back to their authored material before the fog composite.\n  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));\n  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;\n  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);\n  // Keep reflected energy available to the specular lobe. The previous\n  // diffuse-first clamp clipped bright ceramic response before tone mapping,\n  // producing the broad plastic patches visible in low-roughness samples.\n  // This split is bounded by the material metalness and lets the final\n  // composite perform the intentional HDR compression once.\n  vec3 diffuseEnergy=baseColor*(1.0-metal)*\n    (ambient+direct*(1.0-0.25*rough));\n  vec3 lit=diffuseEnergy+specular;\n  // A restrained dielectric clearcoat is intentionally separate from the\n  // base roughness/metalness response. It gives porcelain a broad, stable\n  // grazing highlight without turning the surface into a mirror.\n  vec3 coatLight=normalize(uDirectionalDirection);\n  vec3 coatHalf=normalize(viewDir+coatLight);\n  float coatNdotV=max(dot(n,viewDir),0.);\n  float coatNdotH=max(dot(n,coatHalf),0.);\n  float coatNdotL=max(dot(n,coatLight),0.);\n  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));\n  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);\n  float coat=clamp(uClearcoatStrength,0.0,1.0)*coatFresnel*\n    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity;\n  lit+=uDirectionalColor*coat;\n  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));\n  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;\n  lit+=emissive;\n  if(uLightmapIntensity>0.0){\n    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;\n  }\n  // Fog blends the surface's own lit color toward uFogColor only \u2014 never\n  // oGlow below, which stays a declared emissive quantity independent of\n  // how much atmosphere sits between the surface and the camera, matching\n  // \xa78.7's \"does not infer glow from final luma\" scoping: fog is a\n  // property of oColor's reflected/lit light, not of emission.\n  float fog=fogFactor(vViewDepth,vWorldPos.y);\n  vec3 foggedLit=mix(lit,uFogColor,fog);\n  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the\n  // wrong one for everything else. present.frag copies this channel\n  // straight through to a canvas created with the default alpha:true, so an\n  // opaque or masked surface that emitted a texel's own alpha would show\n  // the *page* through solid geometry. Coverage, not transparency, is what\n  // an opaque or masked fragment writes: whatever survived the discard\n  // above is fully covering, and an opaque draw always was. uOpaqueCoverage\n  // is exactly 0 or 1, so the mix is exact in both directions and the\n  // blended path keeps its pre-existing expression bit-for-bit.\n  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);\n  oColor=vec4(foggedLit,outAlpha);\n  // \xa78.7: bloom reads this declared attachment directly, never inferring\n  // glow from oColor's final luma \u2014 a bright-but-non-emissive lit surface\n  // (e.g. the checkerboard floor under strong light) must never bloom, only\n  // a material with real emissiveStrength does, independent of how the\n  // surface happens to be lit this frame.\n  oGlow=vec4(emissive,1.);\n}\n",d3,d2,c1,d4,d5,c9,d1,d8,new A.iB(b5,a5),c5,c6,d9,s,e5,e4,e6,e6,i,g,l))
if(a4!=null)j.push(a4)
B.a.W(j,a7)
j.push(new A.cN(b7,a9,u.o,b8,k,b9))
return new A.dP(j)},
iA:function iA(a){this.a=a},
iB:function iB(a,b){this.a=a
this.b=b},
eq:function eq(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
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
f6:function f6(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
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
es:function es(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g},
f9:function f9(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
er:function er(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
f8:function f8(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
eF:function eF(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
fd:function fd(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
cQ:function cQ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eI:function eI(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fg:function fg(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
en(a,b){return new A.cU(a,b)},
fJ:function fJ(a,b){this.a=a
this.b=b},
dS:function dS(a,b){this.a=a
this.b=b},
fO:function fO(a,b){this.a=a
this.b=b},
fP:function fP(a,b){this.a=a
this.b=b},
fI:function fI(a,b,c){this.a=a
this.b=b
this.c=c},
fN:function fN(){},
bM:function bM(a,b){this.a=a
this.b=b},
cs:function cs(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dT:function dT(a,b){this.a=a
this.b=b},
bX:function bX(a,b){this.a=a
this.b=b},
cU:function cU(a,b){this.a=a
this.b=b},
b0:function b0(a,b){this.a=a
this.b=b},
f:function f(a,b){this.a=a
this.b=b},
cj:function cj(a,b){this.a=a
this.b=b},
dM:function dM(a,b){this.a=a
this.b=b},
ed:function ed(a,b){this.a=a
this.b=b},
fK:function fK(a,b){var _=this
_.a=a
_.b=b
_.c=null
_.e=!1},
fL:function fL(){},
fM:function fM(){},
aE:function aE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.e=0
_.$ti=d},
jS(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new A.fv(l,k,m,b,d,a,c,i,j,!0,!1,!0,!0,!0,!0,!1)},
fl:function fl(a,b){this.a=a
this.b=b},
dC:function dC(a,b){this.a=a
this.b=b},
fp:function fp(a,b){this.a=a
this.b=b},
ft:function ft(a,b){this.a=a
this.b=b},
fv:function fv(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
a4:function a4(a,b){this.a=a
this.b=b},
hE:function hE(){this.a=null},
mt(a){var s=new A.eG(a,B.e,new A.hE(),A.mC(a))
s.cz(a)
return s},
mC(a){var s,r,q=t.du.a(a.getSupportedExtensions())
if(q==null)return A.aC(t.N)
s=A.aC(t.N)
r=J.X(t.r.b(q)?q:new A.ci(q,A.O(q).h("ci<1,m>")))
while(r.k())s.j(0,r.gl())
return s},
ax(a,b){var s,r
if(a.b!==B.e)A.k(A.j(u.k))
if(b==null){s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),null)
s.viewport(0,0,A.a(s.drawingBufferWidth),A.a(s.drawingBufferHeight))
return}r=t.V.a(b.a)
s=a.a
s.bindFramebuffer(A.a(v.G.WebGL2RenderingContext.FRAMEBUFFER),r.a)
s.viewport(0,0,r.w,r.x)},
mx(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.LESS)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LEQUAL)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.ALWAYS)
break
case 3:s=A.a(v.G.WebGL2RenderingContext.NEVER)
break
default:s=null}return s},
mw(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FRONT)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.BACK)
break
default:s=null}return s},
kk(a,b){var s
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
mu(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.FUNC_ADD)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.FUNC_SUBTRACT)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.FUNC_REVERSE_SUBTRACT)
break
default:s=null}return s},
af(a,b){var s,r,q,p
if(a.b!==B.e)A.k(A.j(u.k))
s=a.f
r=s.dB(b)
if(r.a===0)return
if(r.t(0,B.Q)){q=v.G
p=a.a
if(b.a)p.enable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))
else p.disable(A.a(q.WebGL2RenderingContext.DEPTH_TEST))}if(r.t(0,B.R))a.a.depthFunc(A.mx(a,b.b))
if(r.t(0,B.S))a.a.depthMask(b.c)
if(r.t(0,B.W)){q=v.G
p=a.a
if(b.w)p.enable(A.a(q.WebGL2RenderingContext.CULL_FACE))
else p.disable(A.a(q.WebGL2RenderingContext.CULL_FACE))}if(r.t(0,B.X))a.a.cullFace(A.mw(a,b.x))
if(r.t(0,B.av)){q=v.G.WebGL2RenderingContext
q=A.a(q.CCW)
a.a.frontFace(q)}if(r.t(0,B.T)){q=v.G
p=a.a
if(b.d)p.enable(A.a(q.WebGL2RenderingContext.BLEND))
else p.disable(A.a(q.WebGL2RenderingContext.BLEND))}if(r.t(0,B.U))a.a.blendFunc(A.kk(a,b.e),A.kk(a,b.f))
if(r.t(0,B.V))a.a.blendEquation(A.mu(a,b.r))
if(r.t(0,B.at))a.a.colorMask(!0,!0,!0,!0)
if(r.t(0,B.au)){q=v.G.WebGL2RenderingContext
a.a.disable(A.a(q.SCISSOR_TEST))}s.a=b},
mv(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.COLOR_BUFFER_BIT)
break
case 1:s=v.G
s=(A.a(s.WebGL2RenderingContext.COLOR_BUFFER_BIT)|A.a(s.WebGL2RenderingContext.DEPTH_BUFFER_BIT))>>>0
break
case 2:s=A.a(v.G.WebGL2RenderingContext.DEPTH_BUFFER_BIT)
break
default:s=null}return s},
c_(a,b,c,d,e,f){var s
if(a.b!==B.e)A.k(A.j(u.k))
s=a.a
s.clearColor(f,e,d,c)
s.clear(A.mv(a,b))},
bg(a,b){var s
if(a.b!==B.e)A.k(A.j(u.k))
s=A.a0(b.a)
a.a.useProgram(s)
a.e=s},
e(a,b,c){var s,r,q,p,o,n,m,l
if(a.b!==B.e)A.k(A.j(u.k))
s=a.e
if(s==null)throw A.b(A.j("WebGl2Device.setUniform called with no bound program"))
r=a.a
q=A.a1(r.getUniformLocation(s,b))
if(q==null)return
switch(c.a.a){case 0:r.uniform1f(q,A.ib(c.b))
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
A.a6(r,"uniform4f",[q,n,m,l,p[3]],t.H)
break
case 4:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 5:r.uniformMatrix4fv(q,!1,t.B.a(c.b))
break
case 6:r.uniform1i(q,A.a(c.b))
break}},
ay(a,b){if(a.b!==B.e)A.k(A.j(u.k))
a.a.bindVertexArray(A.a0(b.a))},
a_(a,b,c){var s,r,q,p,o,n
if(a.b!==B.e)A.k(A.j(u.k))
s=c.a
r=a.a
q=v.G
r.activeTexture(A.a(q.WebGL2RenderingContext.TEXTURE0)+b)
if(s instanceof A.dn){p=s.d>1?A.a(q.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(q.WebGL2RenderingContext.TEXTURE_2D)
r.bindTexture(p,s.a)
return}if(s instanceof A.dm){o=s.b
if(o!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),o)
return}n=s.e
if(n!=null){r.bindTexture(A.a(q.WebGL2RenderingContext.TEXTURE_2D),n)
return}throw A.b(A.j("WebGl2Device.bindTexture: target has no sampleable color or depth texture (multisampled targets must be resolved to a single-sample target before sampling)"))}throw A.b(A.j("WebGl2Device.bindTexture: unrecognized GpuObject handle type"))},
my(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.STATIC_DRAW)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.DYNAMIC_DRAW)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.STREAM_DRAW)
break
default:s=null}return s},
mz(a,b){var s,r,q,p
if(a.b!==B.e)A.k(A.j(u.k))
s=a.a
r=A.a1(s.createBuffer())
if(r==null)throw A.b(A.j("WebGl2Device: gl.createBuffer() returned null"))
q=v.G
p=b.c===B.aZ?A.a(q.WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER):A.a(q.WebGL2RenderingContext.ARRAY_BUFFER)
s.bindBuffer(p,r)
s.bufferData(p,b.a,A.my(a,b.b))
return new A.b2(r)},
kl(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.NEAREST)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.LINEAR)
break
case 2:s=A.a(v.G.WebGL2RenderingContext.LINEAR_MIPMAP_LINEAR)
break
default:s=null}return s},
km(a,b){var s
switch(b.a){case 0:s=A.a(v.G.WebGL2RenderingContext.CLAMP_TO_EDGE)
break
case 1:s=A.a(v.G.WebGL2RenderingContext.REPEAT)
break
default:s=null}return s},
kn(a,b){var s,r,q,p,o,n,m,l,k
if(a.b!==B.e)A.k(A.j(u.k))
s=a.a
r=A.a1(s.createTexture())
if(r==null)throw A.b(A.j("WebGl2Device: gl.createTexture() returned null"))
q=v.G
p=q.WebGL2RenderingContext
o=A.a(p.TEXTURE_2D)
s.bindTexture(o,r)
p=q.WebGL2RenderingContext
A.a6(s,"texStorage2D",[o,1,A.a(p.RGBA8),1,1],t.H)
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.kl(a,B.a9))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.kl(a,B.a9))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_S),A.km(a,B.aa))
s.texParameteri(o,A.a(q.WebGL2RenderingContext.TEXTURE_WRAP_T),A.km(a,B.aa))
n=a.r.t(0,"EXT_texture_filter_anisotropic")
m=n?a.bD(34047):1
if(!isFinite(1))A.k(A.aL(1,"requested","anisotropy must be finite and in [1, 16]"))
if(n&&isFinite(m)&&m>=1)l=m>16?16:m
else l=1
k=1<l?1:l
if(k>1)s.texParameterf(o,34046,k)
return new A.b2(new A.dn(r,1,1,1,!1))},
ko(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a.b!==B.e)A.k(A.j(u.k))
s=t.R.a(b.a)
r=s.d
if(c>=r)throw A.b(A.r("WebGl2Device.uploadTextureLayer: layer "+c+" out of range for "+r+"-layer texture",null))
q=s.b
p=s.c
o=q*p*4
n=d.length
if(n!==o)throw A.b(A.r("WebGl2Device.uploadTextureLayer: expected "+o+" RGBA8 bytes for "+q+"x"+p+", got "+n,null))
r=r>1
n=v.G
m=r?A.a(n.WebGL2RenderingContext.TEXTURE_2D_ARRAY):A.a(n.WebGL2RenderingContext.TEXTURE_2D)
l=a.a
l.bindTexture(m,s.a)
k=t.H
if(r)A.a6(l,"texSubImage3D",[m,0,0,0,c,q,p,1,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)
else A.a6(l,"texSubImage2D",[m,0,0,0,q,p,A.a(n.WebGL2RenderingContext.RGBA),A.a(n.WebGL2RenderingContext.UNSIGNED_BYTE),d],k)},
mA(a,b){if(a.b!==B.e)A.k(A.j(u.k))
t.R.a(b.a)
return},
eH(a,b){a.a.deleteTexture(t.R.a(b.a).a)},
kq(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c="renderbufferStorageMultisample",b="texStorage2D",a="framebufferTexture2D"
if(a0.b!==B.e)A.k(A.j(u.k))
s=a1.a
if(s<=0||a1.b<=0)throw A.b(A.r("WebGl2Device.createTarget requires positive dimensions, got "+s+"x"+a1.b,d))
r=a0.a
q=A.a1(r.createFramebuffer())
if(q==null)throw A.b(A.j("WebGl2Device: gl.createFramebuffer() returned null"))
p=v.G
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),q)
o=a1.d
n=o===B.D
if(n&&!a1.e)throw A.b(A.r("WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires hasDepth: true \u2014 a depth-only target with no depth attachment has nothing to render into",d))
m=o===B.a8||o===B.b1
l=d
k=d
j=d
i=d
if(n){r.drawBuffers(A.d([A.a(p.WebGL2RenderingContext.NONE)],t.n))
r.readBuffer(A.a(p.WebGL2RenderingContext.NONE))}else{o=a1.c
h=t.H
g=a1.b
if(o>1){k=A.a1(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
A.a6(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.RENDERBUFFER),k)
if(m){i=A.a1(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
A.a6(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.RENDERBUFFER),i)
r.drawBuffers(A.d([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}else{l=A.a1(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),l)
A.a6(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.a6(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.TEXTURE_2D),l,0],h)
if(m){j=A.a1(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),j)
A.a6(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.RGBA8),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.LINEAR))
A.a6(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1),A.a(p.WebGL2RenderingContext.TEXTURE_2D),j,0],h)
r.drawBuffers(A.d([A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(p.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))}}}f=d
e=d
if(a1.e){o=a1.c
h=t.H
g=a1.b
if(o>1){f=A.a1(r.createRenderbuffer())
r.bindRenderbuffer(A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)
A.a6(r,c,[A.a(p.WebGL2RenderingContext.RENDERBUFFER),o,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.framebufferRenderbuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.RENDERBUFFER),f)}else{e=A.a1(r.createTexture())
r.bindTexture(A.a(p.WebGL2RenderingContext.TEXTURE_2D),e)
A.a6(r,b,[A.a(p.WebGL2RenderingContext.TEXTURE_2D),1,A.a(p.WebGL2RenderingContext.DEPTH_COMPONENT24),s,g],h)
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MIN_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
r.texParameteri(A.a(p.WebGL2RenderingContext.TEXTURE_2D),A.a(p.WebGL2RenderingContext.TEXTURE_MAG_FILTER),A.a(p.WebGL2RenderingContext.NEAREST))
A.a6(r,a,[A.a(p.WebGL2RenderingContext.FRAMEBUFFER),A.a(p.WebGL2RenderingContext.DEPTH_ATTACHMENT),A.a(p.WebGL2RenderingContext.TEXTURE_2D),e,0],h)}}o=A.a(r.checkFramebufferStatus(A.a(p.WebGL2RenderingContext.FRAMEBUFFER)))
h=A.a(p.WebGL2RenderingContext.FRAMEBUFFER_COMPLETE)
r.bindFramebuffer(A.a(p.WebGL2RenderingContext.FRAMEBUFFER),null)
if(o!==h){A.jc(a0,q,l,k,f,e,j,i)
throw A.b(A.j("WebGl2Device.createTarget: framebuffer incomplete"))}return new A.b2(new A.dm(q,l,k,f,e,j,i,s,a1.b,a1.c))},
jc(a,b,c,d,e,f,g,h){var s=a.a
s.deleteFramebuffer(b)
if(c!=null)s.deleteTexture(c)
if(d!=null)s.deleteRenderbuffer(d)
if(e!=null)s.deleteRenderbuffer(e)
if(f!=null)s.deleteTexture(f)
if(g!=null)s.deleteTexture(g)
if(h!=null)s.deleteRenderbuffer(h)},
aF(a){var s
if(a.b!==B.e)A.k(A.j(u.k))
s=A.a1(a.a.createVertexArray())
if(s==null)throw A.b(A.j("WebGl2Device: gl.createVertexArray() returned null"))
return new A.b2(s)},
kp(a,b,c){var s,r="WebGL2RenderingContext",q="VERTEX_SHADER",p=a.a,o=A.a1(p.createShader(b))
if(o==null)throw A.b(A.en(b===A.l7(A.kT(A.lc(),r),q,t.S)?B.ap:B.aq,"gl.createShader() returned null"))
p.shaderSource(o,c)
p.compileShader(o)
if(!J.aK(A.c9(p.getShaderParameter(o,A.a(v.G.WebGL2RenderingContext.COMPILE_STATUS))),!0)){s=A.bD(p.getShaderInfoLog(o))
if(s==null)s="(no info log)"
p.deleteShader(o)
throw A.b(A.en(b===A.l7(A.kT(A.lc(),r),q,t.S)?B.ap:B.aq,s))}return o},
mB(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(a.b!==B.e)A.k(A.j(u.k))
q=v.G
s=A.kp(a,A.a(q.WebGL2RenderingContext.VERTEX_SHADER),e)
r=null
try{r=A.kp(a,A.a(q.WebGL2RenderingContext.FRAGMENT_SHADER),b)}catch(p){a.a.deleteShader(s)
throw p}o=a.a
n=A.a1(o.createProgram())
if(n==null){o.deleteShader(s)
o.deleteShader(r)
throw A.b(B.cn)}o.attachShader(n,s)
o.attachShader(n,r)
o.linkProgram(n)
if(!J.aK(A.c9(o.getProgramParameter(n,A.a(q.WebGL2RenderingContext.LINK_STATUS))),!0)){m=A.bD(o.getProgramInfoLog(n))
if(m==null)m="(no info log)"
o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.en(B.ar,m))}for(q=c.length,l=0;l<c.length;c.length===q||(0,A.B)(c),++l){k=c[l]
if(A.a(o.getAttribLocation(n,k))<0){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.en(B.as,"missing required attribute: "+k))}}for(q=d.length,l=0;l<q;++l){j=d[l]
if(A.a1(o.getUniformLocation(n,j))==null){o.deleteProgram(n)
o.deleteShader(s)
o.deleteShader(r)
throw A.b(A.en(B.as,"missing required uniform: "+j))}}o.deleteShader(s)
o.deleteShader(r)
return new A.b2(n)},
b2:function b2(a){this.a=a},
dn:function dn(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dm:function dm(a,b,c,d,e,f,g,h,i,j){var _=this
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
ff:function ff(a){this.a=a
this.b=!1},
eG:function eG(a,b,c,d){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=c
_.r=d
_.w=!1},
hB:function hB(a){this.a=a},
hC:function hC(a){this.a=a},
ia:function ia(){},
fe:function fe(){},
hD:function hD(){},
fj(){return A.oq()},
oq(){var s=0,r=A.nQ(t.H),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$fj=A.o3(function(a3,a4){if(a3===1){o.push(a4)
s=p}for(;;)switch(s){case 0:a={}
a0=v.G
a1=A.a1(A.a0(a0.document).querySelector("#minimal-canvas"))
if(!t.m.b(a1)){s=1
break}a1.width=A.a(a1.clientWidth)
a1.height=A.a(a1.clientHeight)
n=B.aP.dz(a1)
if(n==null){a1.setAttribute("data-renderer-state","no-webgl2")
a1.setAttribute("data-renderer-backend","legacy")
a1.setAttribute("data-renderer-fallback","true")
a1.setAttribute("data-renderer-fallback-reason","webgl2 unavailable")
s=1
break}h=A.mr().gcl().n(0,"profile")
if(h==null)h="safe"
A:{if("standard"===h){g=B.c2
break A}if("high"===h){g=B.c3
break A}g=B.y
break A}m=g
if(m.a===B.L)g=1
else g=m.a===B.an?2:1
f=m===B.y?0:1
l=new A.ej(m,384,216,g,f)
k=new A.eu(A.a(a1.width),A.a(a1.height),A.a(a1.width),A.a(a1.height))
j=null
p=4
s=7
return A.kP(n.c8(l,k),$async$fj)
case 7:p=2
s=6
break
case 4:p=3
a2=o.pop()
i=A.b5(a2)
if(m===B.y)throw a2
j=m.a.b+" profile failed: "+A.p(i)
s=8
return A.kP(n.c8(B.c4,k),$async$fj)
case 8:s=6
break
case 3:s=2
break
case 6:g=n
g.av()
d=A.mf(g.w.a.b)
B.a.j(g.d,d)
c=A.k0(A.a(a1.width)/A.a(a1.height),100,1,0.1)
g=new Float32Array(16)
g[0]=1
g[5]=1
g[10]=1
g[15]=1
b=new A.cg(new A.bR(g),c,c,B.a_,B.cK,0.1,100,A.a(a1.width)/A.a(a1.height))
n.bV(d,new A.dR(b,B.a0,B.a3,0,0))
n.c0()
a1.setAttribute("data-renderer-state",n.e.b)
a1.setAttribute("data-renderer-first-frame","true")
a1.setAttribute("data-renderer-backend","pixeldart")
a1.setAttribute("data-renderer-requested-profile",h)
g=n.as
a1.setAttribute("data-renderer-effective-profile",(g==null?A.k(A.j("renderer is not initialized")):g).a.a.b)
g=j
if(g==null)g="false"
a1.setAttribute("data-renderer-profile-fallback",g)
a1.setAttribute("data-renderer-frames","1")
a1.setAttribute("data-renderer-surface",""+A.a(a1.width)+"x"+A.a(a1.height))
a.a=1
a.b=0
a.c=!1
g=new A.iM(a1,n)
A.a0(a0.window).addEventListener("resize",A.ds(new A.iK(g)))
a1.addEventListener("webglcontextrestored",A.ds(new A.iL(a)))
A.a(A.a0(a0.window).requestAnimationFrame(A.ds(new A.iN(a,g,n,b,d,a1))))
case 1:return A.nm(q,r)
case 2:return A.nl(o.at(-1),r)}})
return A.nn($async$fj,r)},
iM:function iM(a,b){this.a=a
this.b=b},
iK:function iK(a){this.a=a},
iL:function iL(a){this.a=a},
iN:function iN(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
oy(a){throw A.P(A.jW(a),new Error())},
aJ(){throw A.P(A.lV(""),new Error())},
ld(){throw A.P(A.jW(""),new Error())},
iT(a,b,c){var s,r,q,p,o,n,m=b.b,l=m.length
if(l>16)throw A.b(A.aL(b.gdH(),"batch.instanceCount","exceeds the WebGL2-safe instance uniform bound of 16"))
l*=16
s=new Float32Array(l)
if(c)r=new Float32Array(l)
else r=null
for(l=r!=null,q=0;q<m.length;++q){p=m[q].gm().ga2().ap()
o=q*16
n=o+16
B.J.bl(s,o,n,p.ga6())
if(l)B.J.bl(r,o,n,p.cg().ga6())}m=a.a
A.e(m,"uInstanceModels",new A.f(B.ax,s))
if(l)A.e(m,"uInstanceNormalMatrices",new A.f(B.ax,r))
A.e(m,"uUseInstances",B.ay)}},B={}
var w=[A,J,B]
var $={}
A.j2.prototype={}
J.dW.prototype={
R(a,b){return a===b},
gB(a){return A.ee(a)},
i(a){return"Instance of '"+A.ef(a)+"'"},
gC(a){return A.aI(A.jp(this))}}
J.dY.prototype={
i(a){return String(a)},
gB(a){return a?519018:218159},
gC(a){return A.aI(t.y)},
$iz:1,
$iA:1}
J.cv.prototype={
R(a,b){return null==b},
i(a){return"null"},
gB(a){return 0},
$iz:1}
J.cx.prototype={$iE:1}
J.bc.prototype={
gB(a){return 0},
gC(a){return B.cy},
i(a){return String(a)}}
J.ec.prototype={}
J.bu.prototype={}
J.bb.prototype={
i(a){var s=a[$.lg()]
if(s==null)s=a[$.jC()]
if(s==null)return this.cw(a)
return"JavaScript function for "+J.bH(s)},
$ibm:1}
J.cw.prototype={
gB(a){return 0},
i(a){return String(a)}}
J.cy.prototype={
gB(a){return 0},
i(a){return String(a)}}
J.t.prototype={
j(a,b){A.O(a).c.a(b)
a.$flags&1&&A.b4(a,29)
a.push(b)},
W(a,b){var s
A.O(a).h("i<1>").a(b)
a.$flags&1&&A.b4(a,"addAll",2)
if(Array.isArray(b)){this.cD(a,b)
return}for(s=J.X(b);s.k();)a.push(s.gl())},
cD(a,b){var s,r
t.p.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.am(a))
for(r=0;r<s;++r)a.push(b[r])},
X(a){a.$flags&1&&A.b4(a,"clear","clear")
a.length=0},
aF(a,b){var s,r=A.cC(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.q(r,s,A.p(a[s]))
return r.join(b)},
ak(a,b,c,d){var s,r,q
d.a(b)
A.O(a).D(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.b(A.am(a))}return r},
K(a,b){if(!(b>=0&&b<a.length))return A.h(a,b)
return a[b]},
gcb(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.j0())},
gbm(a){var s=a.length
if(s===1){if(0>=s)return A.h(a,0)
return a[0]}if(s===0)throw A.b(A.j0())
throw A.b(A.lS())},
af(a,b){var s,r,q,p,o,n=A.O(a)
n.h("c(1,1)?").a(b)
a.$flags&2&&A.b4(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.nD()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.ed()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.c8(b,2))
if(p>0)this.d6(a,p)},
cv(a){return this.af(a,null)},
d6(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
aB(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.h(a,s)
if(J.aK(a[s],b))return s}return-1},
t(a,b){var s
for(s=0;s<a.length;++s)if(J.aK(a[s],b))return!0
return!1},
i(a){return A.j1(a,"[","]")},
gv(a){return new J.ce(a,a.length,A.O(a).h("ce<1>"))},
gB(a){return A.ee(a)},
gp(a){return a.length},
n(a,b){if(!(b>=0&&b<a.length))throw A.b(A.iD(a,b))
return a[b]},
q(a,b,c){A.O(a).c.a(c)
a.$flags&2&&A.b4(a)
if(!(b>=0&&b<a.length))throw A.b(A.iD(a,b))
a[b]=c},
c6(a,b){var s
A.O(a).h("A(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gC(a){return A.aI(A.O(a))},
$in:1,
$ii:1,
$iu:1}
J.dX.prototype={
e9(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.ef(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.fS.prototype={}
J.ce.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.B(q)
throw A.b(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iH:1}
J.bO.prototype={
H(a,b){var s
A.jo(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gb7(b)
if(this.gb7(a)===s)return 0
if(this.gb7(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gb7(a){return a===0?1/a<0:a<0},
e7(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.b(A.b1(""+a+".toInt()"))},
du(a,b,c){if(this.H(b,c)>0)throw A.b(A.ju(b))
if(this.H(a,b)<0)return b
if(this.H(a,c)>0)return c
return a},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
ae(a,b){return a+b},
aJ(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
dc(a,b){return(a|0)===a?a/b|0:this.dd(a,b)},
dd(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.b1("Result of truncating division is "+A.p(s)+": "+A.p(a)+" ~/ "+b))},
aZ(a,b){var s
if(a>0)s=this.bN(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
d9(a,b){if(0>b)throw A.b(A.ju(b))
return this.bN(a,b)},
bN(a,b){return b>31?0:a>>>b},
bj(a,b){return a<b},
gC(a){return A.aI(t.o)},
$iac:1,
$io:1,
$ia7:1}
J.cu.prototype={
gC(a){return A.aI(t.S)},
$iz:1,
$ic:1}
J.dZ.prototype={
gC(a){return A.aI(t.i)},
$iz:1}
J.ba.prototype={
ab(a,b,c,d){var s=A.ei(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
G(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.au(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
E(a,b){return this.G(a,b,0)},
u(a,b,c){return a.substring(b,A.ei(b,c,a.length))},
ar(a,b){return this.u(a,b,null)},
a_(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.b(B.aN)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
aC(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.au(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
aB(a,b){return this.aC(a,b,0)},
t(a,b){return A.ox(a,b,0)},
H(a,b){var s
A.aH(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
i(a){return a},
gB(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gC(a){return A.aI(t.N)},
gp(a){return a.length},
$iz:1,
$iac:1,
$ik2:1,
$im:1}
A.c0.prototype={
gv(a){return new A.ch(J.X(this.gaA()),A.q(this).h("ch<1,2>"))},
gp(a){return J.b6(this.gaA())},
K(a,b){return A.q(this).y[1].a(J.iZ(this.gaA(),b))},
i(a){return J.bH(this.gaA())}}
A.ch.prototype={
k(){return this.a.k()},
gl(){return this.$ti.y[1].a(this.a.gl())},
$iH:1}
A.d_.prototype={
n(a,b){return this.$ti.y[1].a(J.iY(this.a,b))},
q(a,b,c){var s=this.$ti
J.dx(this.a,b,s.c.a(s.y[1].a(c)))},
$in:1,
$iu:1}
A.ci.prototype={
gaA(){return this.a}}
A.cz.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.dH.prototype={
gp(a){return this.a.length},
n(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.h(s,b)
return s.charCodeAt(b)}}
A.hr.prototype={}
A.n.prototype={}
A.V.prototype={
gv(a){var s=this
return new A.at(s,s.gp(s),A.q(s).h("at<V.E>"))},
ac(a){var s,r=this,q=A.j4(A.q(r).h("V.E"))
for(s=0;s<r.gp(r);++s)q.j(0,r.K(0,s))
return q}}
A.cW.prototype={
gcZ(){var s=J.b6(this.a),r=this.c
if(r==null||r>s)return s
return r},
gda(){var s=J.b6(this.a),r=this.b
if(r>s)return s
return r},
gp(a){var s,r=J.b6(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
K(a,b){var s=this,r=s.gda()+b
if(b<0||r>=s.gcZ())throw A.b(A.fR(b,s.gp(0),s,"index"))
return J.iZ(s.a,r)},
e8(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.cb(n),l=m.gp(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.jU(0,p.$ti.c)
return n}r=A.cC(s,m.K(n,o),!1,p.$ti.c)
for(q=1;q<s;++q){B.a.q(r,q,m.K(n,o+q))
if(m.gp(n)<l)throw A.b(A.am(p))}return r}}
A.at.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.cb(q),o=p.gp(q)
if(r.b!==o)throw A.b(A.am(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.K(q,s);++r.c
return!0},
$iH:1}
A.aU.prototype={
gv(a){var s=this.a
return new A.cD(s.gv(s),this.b,A.q(this).h("cD<1,2>"))},
gp(a){var s=this.a
return s.gp(s)},
K(a,b){var s=this.a
return this.b.$1(s.K(s,b))}}
A.cp.prototype={$in:1}
A.cD.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gl())
return!0}s.a=null
return!1},
gl(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iH:1}
A.aV.prototype={
gp(a){return J.b6(this.a)},
K(a,b){return this.b.$1(J.iZ(this.a,b))}}
A.a5.prototype={
gv(a){return new A.G(J.X(this.a),this.b,this.$ti.h("G<1>"))}}
A.G.prototype={
k(){var s,r
for(s=this.a,r=this.b;s.k();)if(r.$1(s.gl()))return!0
return!1},
gl(){return this.a.gl()},
$iH:1}
A.a8.prototype={}
A.bv.prototype={
q(a,b,c){A.q(this).h("bv.E").a(c)
throw A.b(A.b1("Cannot modify an unmodifiable list"))}}
A.bZ.prototype={}
A.cS.prototype={
gp(a){return J.b6(this.a)},
K(a,b){var s=this.a,r=J.cb(s)
return r.K(s,r.gp(s)-1-b)}}
A.dq.prototype={}
A.d9.prototype={$r:"+(1,2)",$s:1}
A.da.prototype={$r:"+influence,light(1,2)",$s:2}
A.cm.prototype={}
A.cl.prototype={
i(a){return A.j7(this)},
q(a,b,c){var s=A.q(this)
s.c.a(b)
s.y[1].a(c)
A.lF()},
ga1(){return new A.aG(this.dC(),A.q(this).h("aG<Q<1,2>>"))},
dC(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$ga1(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gY(),o=o.gv(o),n=A.q(s),m=n.y[1],n=n.h("Q<1,2>")
case 2:if(!o.k()){r=3
break}l=o.gl()
k=s.n(0,l)
r=4
return a.b=new A.Q(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iW:1}
A.K.prototype={
gp(a){return this.b.length},
gbC(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
aj(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
n(a,b){if(!this.aj(b))return null
return this.b[this.a[b]]},
al(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbC()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gY(){return new A.by(this.gbC(),this.$ti.h("by<1>"))},
gad(){return new A.by(this.b,this.$ti.h("by<2>"))}}
A.by.prototype={
gp(a){return this.a.length},
gv(a){var s=this.a
return new A.bz(s,s.length,this.$ti.h("bz<1>"))}}
A.bz.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iH:1}
A.cn.prototype={
j(a,b){A.q(this).c.a(b)
A.lG()}}
A.aM.prototype={
gp(a){return this.b},
gc9(a){return this.b!==0},
gv(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.bz(s,s.length,r.$ti.h("bz<1>"))},
t(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
ac(a){return A.j5(this,this.$ti.c)}}
A.cT.prototype={}
A.hv.prototype={
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
A.cL.prototype={
i(a){return"Null check operator used on a null value"}}
A.e_.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.eA.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.h3.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.cq.prototype={}
A.dc.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibe:1}
A.b8.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.le(r==null?"unknown":r)+"'"},
gC(a){var s=A.jw(this)
return A.aI(s==null?A.bj(this):s)},
$ibm:1,
gec(){return this},
$C:"$1",
$R:1,
$D:null}
A.dF.prototype={$C:"$0",$R:0}
A.dG.prototype={$C:"$2",$R:2}
A.ew.prototype={}
A.et.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.le(s)+"'"}}
A.bI.prototype={
R(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bI))return!1
return this.$_target===b.$_target&&this.a===b.a},
gB(a){return(A.iP(this.a)^A.ee(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.ef(this.a)+"'")}}
A.em.prototype={
i(a){return"RuntimeError: "+this.a}}
A.aQ.prototype={
gp(a){return this.a},
gY(){return new A.bp(this,A.q(this).h("bp<1>"))},
gad(){return new A.aT(this,A.q(this).h("aT<2>"))},
ga1(){return new A.aR(this,A.q(this).h("aR<1,2>"))},
aj(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dI(a)},
dI(a){var s=this.d
if(s==null)return!1
return this.aE(s[this.aD(a)],a)>=0},
n(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dJ(b)},
dJ(a){var s,r,q=this.d
if(q==null)return null
s=q[this.aD(a)]
r=this.aE(s,a)
if(r<0)return null
return s[r].b},
q(a,b,c){var s,r,q=this,p=A.q(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bp(s==null?q.b=q.aX():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bp(r==null?q.c=q.aX():r,b,c)}else q.dL(b,c)},
dL(a,b){var s,r,q,p,o=this,n=A.q(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.aX()
r=o.aD(a)
q=s[r]
if(q==null)s[r]=[o.aY(a,b)]
else{p=o.aE(q,a)
if(p>=0)q[p].b=b
else q.push(o.aY(a,b))}},
b9(a,b){var s,r,q=this,p=A.q(q)
p.c.a(a)
p.h("2()").a(b)
if(q.aj(a)){s=q.n(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.q(0,a,r)
return r},
aH(a,b){if((b&0x3fffffff)===b)return this.cB(this.c,b)
else return this.dK(b)},
dK(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.aD(a)
r=n[s]
q=o.aE(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.bn(p)
if(r.length===0)delete n[s]
return p.b},
X(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aW()}},
al(a,b){var s,r,q=this
A.q(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.am(q))
s=s.c}},
bp(a,b,c){var s,r=A.q(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.aY(b,c)
else s.b=c},
cB(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.bn(s)
delete a[b]
return s.b},
aW(){this.r=this.r+1&1073741823},
aY(a,b){var s=this,r=A.q(s),q=new A.fT(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.aW()
return q},
bn(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.aW()},
aD(a){return J.J(a)&1073741823},
aE(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aK(a[r].a,b))return r
return-1},
i(a){return A.j7(this)},
aX(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ijX:1}
A.fT.prototype={}
A.bp.prototype={
gp(a){return this.a.a},
gv(a){var s=this.a
return new A.cB(s,s.r,s.e,this.$ti.h("cB<1>"))}}
A.cB.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.am(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iH:1}
A.aT.prototype={
gp(a){return this.a.a},
gv(a){var s=this.a
return new A.aS(s,s.r,s.e,this.$ti.h("aS<1>"))}}
A.aS.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.am(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iH:1}
A.aR.prototype={
gp(a){return this.a.a},
gv(a){var s=this.a
return new A.cA(s,s.r,s.e,this.$ti.h("cA<1,2>"))}}
A.cA.prototype={
gl(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.am(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.Q(s.a,s.b,r.$ti.h("Q<1,2>"))
r.c=s.c
return!0}},
$iH:1}
A.iG.prototype={
$1(a){return this.a(a)},
$S:19}
A.iH.prototype={
$2(a,b){return this.a(a,b)},
$S:13}
A.iI.prototype={
$1(a){return this.a(A.aH(a))},
$S:35}
A.bh.prototype={
gC(a){return A.aI(this.bB())},
bB(){return A.oc(this.$r,this.bA())},
i(a){return this.bR(!1)},
bR(a){var s,r,q,p,o,n=this.d_(),m=this.bA(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.h(m,q)
o=m[q]
l=a?l+A.k5(o):l+A.p(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
d_(){var s,r=this.$s
while($.hZ.length<=r)B.a.j($.hZ,null)
s=$.hZ[r]
if(s==null){s=this.cP()
B.a.q($.hZ,r,s)}return s},
cP(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.jT(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.q(j,q,r[s])}}return A.jZ(j,k)}}
A.bC.prototype={
bA(){return[this.a,this.b]},
R(a,b){if(b==null)return!1
return b instanceof A.bC&&this.$s===b.$s&&J.aK(this.a,b.a)&&J.aK(this.b,b.b)},
gB(a){return A.cM(this.$s,this.a,this.b,B.h,B.h,B.h)}}
A.bS.prototype={
gC(a){return B.cr},
$iz:1}
A.cI.prototype={
d2(a,b,c,d){var s=A.au(b,0,c,d,null)
throw A.b(s)},
br(a,b,c,d){if(b>>>0!==b||b>c)this.d2(a,b,c,d)}}
A.e2.prototype={
gC(a){return B.cs},
$iz:1}
A.Y.prototype={
gp(a){return a.length},
bJ(a,b,c,d,e){var s,r=a.length
this.br(a,b,r,"start")
this.br(a,c,r,"end")
if(b>c)throw A.b(A.au(b,0,c,null,null))
s=c-b
if(e<0)throw A.b(A.r(e,null))
if(16-e<s)throw A.b(A.j("Not enough elements"))
if(e!==0||16!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iag:1}
A.cG.prototype={
n(a,b){A.b3(b,a,a.length)
return a[b]},
q(a,b,c){A.ib(c)
a.$flags&2&&A.b4(a)
A.b3(b,a,a.length)
a[b]=c},
bl(a,b,c,d){t.bM.a(d)
a.$flags&2&&A.b4(a,5)
this.bJ(a,b,c,d,0)
return},
$in:1,
$ii:1,
$iu:1}
A.cH.prototype={
q(a,b,c){A.a(c)
a.$flags&2&&A.b4(a)
A.b3(b,a,a.length)
a[b]=c},
ct(a,b,c,d,e){t.hb.a(d)
a.$flags&2&&A.b4(a,5)
this.bJ(a,b,c,d,e)
return},
$in:1,
$ii:1,
$iu:1}
A.cF.prototype={
gC(a){return B.ct},
$iz:1,
$ifB:1}
A.e3.prototype={
gC(a){return B.cu},
$iz:1}
A.e4.prototype={
gC(a){return B.cv},
n(a,b){A.b3(b,a,a.length)
return a[b]},
$iz:1}
A.e5.prototype={
gC(a){return B.cw},
n(a,b){A.b3(b,a,a.length)
return a[b]},
$iz:1}
A.e6.prototype={
gC(a){return B.cx},
n(a,b){A.b3(b,a,a.length)
return a[b]},
$iz:1}
A.e7.prototype={
gC(a){return B.cA},
n(a,b){A.b3(b,a,a.length)
return a[b]},
$iz:1}
A.e8.prototype={
gC(a){return B.cB},
n(a,b){A.b3(b,a,a.length)
return a[b]},
$iz:1}
A.cJ.prototype={
gC(a){return B.cC},
gp(a){return a.length},
n(a,b){A.b3(b,a,a.length)
return a[b]},
$iz:1}
A.cK.prototype={
gC(a){return B.cD},
gp(a){return a.length},
n(a,b){A.b3(b,a,a.length)
return a[b]},
$iz:1,
$iey:1}
A.d5.prototype={}
A.d6.prototype={}
A.d7.prototype={}
A.d8.prototype={}
A.av.prototype={
h(a){return A.dh(v.typeUniverse,this,a)},
D(a){return A.kE(v.typeUniverse,this,a)}}
A.eW.prototype={}
A.i4.prototype={
i(a){return A.aj(this.a,null)}}
A.eU.prototype={
i(a){return this.a}}
A.dd.prototype={$iaZ:1}
A.hG.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:8}
A.hF.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:18}
A.hH.prototype={
$0(){this.a.$0()},
$S:9}
A.hI.prototype={
$0(){this.a.$0()},
$S:9}
A.i2.prototype={
cA(a,b){if(self.setTimeout!=null)self.setTimeout(A.c8(new A.i3(this,b),0),a)
else throw A.b(A.b1("`setTimeout()` not found."))}}
A.i3.prototype={
$0(){this.b.$0()},
$S:0}
A.eJ.prototype={
b_(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.aM(a)
else{s=r.a
if(q.h("bn<1>").b(a))s.bq(a)
else s.bu(a)}},
b0(a,b){var s=this.a
if(this.b)s.aQ(new A.al(a,b))
else s.aN(new A.al(a,b))}}
A.ic.prototype={
$1(a){return this.a.$2(0,a)},
$S:5}
A.id.prototype={
$2(a,b){this.a.$2(1,new A.cq(a,t.l.a(b)))},
$S:23}
A.iz.prototype={
$2(a,b){this.a(A.a(a),b)},
$S:30}
A.aA.prototype={
gl(){var s=this.b
return s==null?this.$ti.c.a(s):s},
d7(a,b){var s,r,q
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
o.d=null}q=o.d7(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.kz
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
o.a=A.kz
throw n
return!1}if(0>=p.length)return A.h(p,-1)
o.a=p.pop()
m=1
continue}throw A.b(A.j("sync*"))}return!1},
ef(a){var s,r,q=this
if(a instanceof A.aG){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.j(r,q.a)
q.a=s
return 2}else{q.d=J.X(a)
return 2}},
$iH:1}
A.aG.prototype={
gv(a){return new A.aA(this.a(),this.$ti.h("aA<1>"))}}
A.al.prototype={
i(a){return A.p(this.a)},
$iD:1,
gag(){return this.b}}
A.eO.prototype={
b0(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.j("Future already completed"))
s.aN(A.nC(a,b))},
bW(a){return this.b0(a,null)}}
A.cZ.prototype={
b_(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.b(A.j("Future already completed"))
s.aM(r.h("1/").a(a))}}
A.bw.prototype={
dP(a){if((this.c&15)!==6)return!0
return this.b.b.bd(t.al.a(this.d),a.a,t.y,t.K)},
dF(a){var s,r=this,q=r.e,p=null,o=t.A,n=t.K,m=a.a,l=r.b.b
if(t.d.b(q))p=l.e4(q,m,a.b,o,n,t.l)
else p=l.bd(t.x.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.b5(s))){if((r.c&1)!==0)throw A.b(A.r("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.r("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.N.prototype={
co(a,b,c){var s,r,q=this.$ti
q.D(c).h("1/(2)").a(a)
s=$.I
if(s===B.n){if(!t.d.b(b)&&!t.x.b(b))throw A.b(A.aL(b,"onError",u.c))}else{c.h("@<0/>").D(q.c).h("1(2)").a(a)
b=A.nT(b,s)}r=new A.N(s,c.h("N<0>"))
this.aL(new A.bw(r,3,a,b,q.h("@<1>").D(c).h("bw<1,2>")))
return r},
bP(a,b,c){var s,r=this.$ti
r.D(c).h("1/(2)").a(a)
s=new A.N($.I,c.h("N<0>"))
this.aL(new A.bw(s,19,a,b,r.h("@<1>").D(c).h("bw<1,2>")))
return s},
d8(a){this.a=this.a&1|16
this.c=a},
au(a){this.a=a.a&30|this.a&1
this.c=a.c},
aL(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aL(a)
return}r.au(s)}A.fh(null,null,r.b,t.M.a(new A.hM(r,a)))}},
bE(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bE(a)
return}m.au(n)}l.a=m.az(a)
A.fh(null,null,m.b,t.M.a(new A.hQ(l,m)))}},
aw(){var s=t.F.a(this.c)
this.c=null
return this.az(s)},
az(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bu(a){var s,r=this
r.$ti.c.a(a)
s=r.aw()
r.a=8
r.c=a
A.c1(r,s)},
cO(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aw()
q.au(a)
A.c1(q,r)},
aQ(a){var s=this.aw()
this.d8(a)
A.c1(this,s)},
aM(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bn<1>").b(a)){this.bq(a)
return}this.cE(a)},
cE(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.fh(null,null,s.b,t.M.a(new A.hO(s,a)))},
bq(a){A.jd(this.$ti.h("bn<1>").a(a),this,!1)
return},
aN(a){this.a^=2
A.fh(null,null,this.b,t.M.a(new A.hN(this,a)))},
$ibn:1}
A.hM.prototype={
$0(){A.c1(this.a,this.b)},
$S:0}
A.hQ.prototype={
$0(){A.c1(this.b,this.a.a)},
$S:0}
A.hP.prototype={
$0(){A.jd(this.a.a,this.b,!0)},
$S:0}
A.hO.prototype={
$0(){this.a.bu(this.b)},
$S:0}
A.hN.prototype={
$0(){this.a.aQ(this.b)},
$S:0}
A.hT.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.e3(t.fO.a(q.d),t.A)}catch(p){s=A.b5(p)
r=A.cc(p)
if(k.c&&t.v.a(k.b.a.c).a===s){q=k.a
q.c=t.v.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.j_(q)
n=k.a
n.c=new A.al(q,o)
q=n}q.b=!0
return}if(j instanceof A.N&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.v.a(j.c)
q.b=!0}return}if(j instanceof A.N){m=k.b.a
l=new A.N(m.b,m.$ti)
j.co(new A.hU(l,m),new A.hV(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.hU.prototype={
$1(a){this.a.cO(this.b)},
$S:8}
A.hV.prototype={
$2(a,b){A.dr(a)
t.l.a(b)
this.a.aQ(new A.al(a,b))},
$S:29}
A.hS.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bd(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.b5(l)
r=A.cc(l)
q=s
p=r
if(p==null)p=A.j_(q)
o=this.a
o.c=new A.al(q,p)
o.b=!0}},
$S:0}
A.hR.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.v.a(l.a.a.c)
p=l.b
if(p.a.dP(s)&&p.a.e!=null){p.c=p.a.dF(s)
p.b=!1}}catch(o){r=A.b5(o)
q=A.cc(o)
p=t.v.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.j_(p)
m=l.b
m.c=new A.al(p,n)
p=m}p.b=!0}},
$S:0}
A.eK.prototype={}
A.fa.prototype={}
A.dp.prototype={$ikr:1}
A.f3.prototype={
e5(a){var s,r,q
t.M.a(a)
try{if(B.n===$.I){a.$0()
return}A.kZ(null,null,this,a,t.H)}catch(q){s=A.b5(q)
r=A.cc(q)
A.js(A.dr(s),t.l.a(r))}},
dn(a){return new A.i_(this,t.M.a(a))},
e3(a,b){b.h("0()").a(a)
if($.I===B.n)return a.$0()
return A.kZ(null,null,this,a,b)},
bd(a,b,c,d){c.h("@<0>").D(d).h("1(2)").a(a)
d.a(b)
if($.I===B.n)return a.$1(b)
return A.nV(null,null,this,a,b,c,d)},
e4(a,b,c,d,e,f){d.h("@<0>").D(e).D(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.I===B.n)return a.$2(b,c)
return A.nU(null,null,this,a,b,c,d,e,f)},
cn(a,b,c,d){return b.h("@<0>").D(c).D(d).h("1(2,3)").a(a)}}
A.i_.prototype={
$0(){return this.a.e5(this.b)},
$S:0}
A.iy.prototype={
$0(){A.lK(this.a,this.b)},
$S:0}
A.d0.prototype={
gp(a){return this.a},
gY(){return new A.bx(this,this.$ti.h("bx<1>"))},
gad(){var s=this.$ti
return A.k_(new A.bx(this,s.h("bx<1>")),new A.hX(this),s.c,s.y[1])},
aj(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.cS(a)},
cS(a){var s=this.d
if(s==null)return!1
return this.a3(this.bz(s,a),a)>=0},
n(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.kt(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.kt(q,b)
return r}else return this.d1(b)},
d1(a){var s,r,q=this.d
if(q==null)return null
s=this.bz(q,a)
r=this.a3(s,a)
return r<0?null:s[r+1]},
q(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.bt(s==null?m.b=A.je():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.bt(r==null?m.c=A.je():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.je()
p=A.iP(b)&1073741823
o=q[p]
if(o==null){A.jf(q,p,[b,c]);++m.a
m.e=null}else{n=m.a3(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
al(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.bv()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.n(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.am(m))}},
bv(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.cC(i.a,null,!1,t.A)
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
this.e=null}A.jf(a,b,c)},
bz(a,b){return a[A.iP(b)&1073741823]}}
A.hX.prototype={
$1(a){var s=this.a,r=s.$ti
s=s.n(0,r.c.a(a))
return s==null?r.y[1].a(s):s},
$S(){return this.a.$ti.h("2(1)")}}
A.d2.prototype={
a3(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.bx.prototype={
gp(a){return this.a.a},
gv(a){var s=this.a
return new A.d1(s,s.bv(),this.$ti.h("d1<1>"))}}
A.d1.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.am(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iH:1}
A.az.prototype={
d3(){return new A.az(A.q(this).h("az<1>"))},
gv(a){var s=this,r=new A.bA(s,s.r,A.q(s).h("bA<1>"))
r.c=s.e
return r},
gp(a){return this.a},
t(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cR(b)},
cR(a){var s=this.d
if(s==null)return!1
return this.a3(s[this.aR(a)],a)>=0},
j(a,b){var s,r,q=this
A.q(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bs(s==null?q.b=A.jh():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bs(r==null?q.c=A.jh():r,b)}else return q.cC(b)},
cC(a){var s,r,q,p=this
A.q(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jh()
r=p.aR(a)
q=s[r]
if(q==null)s[r]=[p.aP(a)]
else{if(p.a3(q,a)>=0)return!1
q.push(p.aP(a))}return!0},
aH(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bF(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bF(s.c,b)
else return s.d5(b)},
d5(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.aR(a)
r=n[s]
q=o.a3(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bS(p)
return!0},
X(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aO()}},
bs(a,b){A.q(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aP(b)
return!0},
bF(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bS(s)
delete a[b]
return!0},
aO(){this.r=this.r+1&1073741823},
aP(a){var s,r=this,q=new A.eY(A.q(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aO()
return q},
bS(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aO()},
aR(a){return J.J(a)&1073741823},
a3(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aK(a[r].a,b))return r
return-1},
$ijY:1}
A.eY.prototype={}
A.bA.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.am(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iH:1}
A.fU.prototype={
$2(a,b){this.a.q(0,this.b.a(a),this.c.a(b))},
$S:52}
A.w.prototype={
gv(a){return new A.at(a,this.gp(a),A.bj(a).h("at<w.E>"))},
K(a,b){return this.n(a,b)},
c1(a,b){var s,r
A.bj(a).h("A(w.E)").a(b)
s=this.gp(a)
for(r=0;r<s;++r){if(!b.$1(this.n(a,r)))return!1
if(s!==this.gp(a))throw A.b(A.am(a))}return!0},
dD(a,b,c,d){var s
A.bj(a).h("w.E?").a(d)
A.ei(b,c,this.gp(a))
for(s=b;s<c;++s)this.q(a,s,d)},
i(a){return A.j1(a,"[","]")},
$in:1,
$ii:1,
$iu:1}
A.bq.prototype={
al(a,b){var s,r,q,p=A.q(this)
p.h("~(1,2)").a(b)
for(s=this.gY(),s=s.gv(s),p=p.y[1];s.k();){r=s.gl()
q=this.n(0,r)
b.$2(r,q==null?p.a(q):q)}},
ga1(){var s=this.gY(),r=A.q(this).h("Q<1,2>"),q=A.q(s)
return A.k_(s,q.D(r).h("1(i.E)").a(new A.fV(this)),q.h("i.E"),r)},
gp(a){var s=this.gY()
return s.gp(s)},
gad(){return new A.d3(this,A.q(this).h("d3<1,2>"))},
i(a){return A.j7(this)},
$iW:1}
A.fV.prototype={
$1(a){var s=this.a,r=A.q(s)
r.c.a(a)
s=s.n(0,a)
if(s==null)s=r.y[1].a(s)
return new A.Q(a,s,r.h("Q<1,2>"))},
$S(){return A.q(this.a).h("Q<1,2>(1)")}}
A.fW.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.p(a)
r.a=(r.a+=s)+": "
s=A.p(b)
r.a+=s},
$S:57}
A.d3.prototype={
gp(a){var s=this.a
return s.gp(s)},
gv(a){var s=this.a,r=s.gY()
return new A.d4(r.gv(r),s,this.$ti.h("d4<1,2>"))}}
A.d4.prototype={
k(){var s=this,r=s.a
if(r.k()){s.c=s.b.n(0,r.gl())
return!0}s.c=null
return!1},
gl(){var s=this.c
return s==null?this.$ti.y[1].a(s):s},
$iH:1}
A.di.prototype={
q(a,b,c){var s=A.q(this)
s.c.a(b)
s.y[1].a(c)
throw A.b(A.b1("Cannot modify unmodifiable map"))}}
A.bQ.prototype={
n(a,b){return this.a.n(0,b)},
q(a,b,c){var s=A.q(this)
this.a.q(0,s.c.a(b),s.y[1].a(c))},
gp(a){var s=this.a
return s.gp(s)},
gY(){return this.a.gY()},
i(a){return this.a.i(0)},
gad(){return this.a.gad()},
ga1(){return this.a.ga1()},
$iW:1}
A.bf.prototype={}
A.aY.prototype={
gc9(a){return this.gp(this)!==0},
W(a,b){var s
A.q(this).h("i<1>").a(b)
for(s=b.gv(b);s.k();)this.j(0,s.gl())},
bY(a){var s,r,q=this.ac(0)
for(s=this.gv(this);s.k();){r=s.gl()
if(a.t(0,r))q.aH(0,r)}return q},
i(a){return A.j1(this,"{","}")},
aF(a,b){var s,r,q=this.gv(this)
if(!q.k())return""
s=J.bH(q.gl())
if(!q.k())return s
if(b.length===0){r=s
do r+=A.p(q.gl())
while(q.k())}else{r=s
do r=r+b+A.p(q.gl())
while(q.k())}return r.charCodeAt(0)==0?r:r},
dj(a,b){var s
A.q(this).h("A(1)").a(b)
for(s=this.gv(this);s.k();)if(b.$1(s.gl()))return!0
return!1},
K(a,b){var s,r
A.eh(b,"index")
s=this.gv(this)
for(r=b;s.k();){if(r===0)return s.gl();--r}throw A.b(A.fR(b,b-r,this,"index"))},
$in:1,
$ii:1,
$ibd:1}
A.db.prototype={
ac(a){var s=this.d3()
s.W(0,this)
return s}}
A.fc.prototype={
j(a,b){this.$ti.c.a(b)
return A.mY()}}
A.cX.prototype={
gp(a){return this.a.a},
gv(a){var s=this.a
return A.jg(s,s.r,A.q(s).c)},
ac(a){return this.a.ac(0)}}
A.c3.prototype={}
A.dj.prototype={}
A.i8.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:10}
A.i7.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:10}
A.dB.prototype={
dQ(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a3.length
a5=A.ei(a4,a5,a2)
s=$.lr()
for(r=s.length,q=a4,p=q,o=null,n=-1,m=-1,l=0;q<a5;q=k){k=q+1
if(!(q<a2))return A.h(a3,q)
j=a3.charCodeAt(q)
if(j===37){i=k+2
if(i<=a5){if(!(k<a2))return A.h(a3,k)
h=A.iF(a3.charCodeAt(k))
g=k+1
if(!(g<a2))return A.h(a3,g)
f=A.iF(a3.charCodeAt(g))
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
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.ab("")
g=o}else g=o
g.a+=B.b.u(a3,p,q)
c=A.bs(j)
g.a+=c
p=k
continue}}throw A.b(A.a9("Invalid base64 data",a3,q))}if(o!=null){a2=B.b.u(a3,p,a5)
a2=o.a+=a2
r=a2.length
if(n>=0)A.jK(a3,m,a5,n,l,r)
else{b=B.i.aJ(r-1,4)+1
if(b===1)throw A.b(A.a9(a1,a3,a5))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.b.ab(a3,a4,a5,a2.charCodeAt(0)==0?a2:a2)}a=a5-a4
if(n>=0)A.jK(a3,m,a5,n,l,a)
else{b=B.i.aJ(a,4)
if(b===1)throw A.b(A.a9(a1,a3,a5))
if(b>1)a3=B.b.ab(a3,a5,a5,b===2?"==":"=")}return a3}}
A.fk.prototype={}
A.bK.prototype={}
A.dJ.prototype={}
A.dO.prototype={}
A.eE.prototype={}
A.hA.prototype={
dv(a){return new A.i6(this.a).cT(t.L.a(a),0,null,!0)}}
A.i6.prototype={
cT(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.ei(b,c,J.b6(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.ne(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.nd(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.aS(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.nf(o)
l.b=0
throw A.b(A.a9(m,a,p+l.c))}return n},
aS(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.i.dc(b+c,2)
r=q.aS(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.aS(a,s,c,d)}return q.dA(a,b,c,d)},
dA(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.ab(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.h(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.h(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.h(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.bs(f)
e.a+=p
if(d===a0)break A
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.bs(h)
e.a+=p
break
case 65:p=A.bs(h)
e.a+=p;--d
break
default:p=A.bs(h)
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
p=A.bs(a[l])
e.a+=p}else{p=A.kb(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.bs(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.bl.prototype={
R(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.bl)if(this.a===b.a)s=this.b===b.b
return s},
gB(a){return A.cM(this.a,this.b,B.h,B.h,B.h,B.h)},
H(a,b){var s
t.dy.a(b)
s=B.i.H(this.a,b.a)
if(s!==0)return s
return B.i.H(this.b,b.b)},
i(a){var s=this,r=A.lH(A.ma(s)),q=A.dK(A.m8(s)),p=A.dK(A.m4(s)),o=A.dK(A.m5(s)),n=A.dK(A.m7(s)),m=A.dK(A.m9(s)),l=A.jR(A.m6(s)),k=s.b,j=k===0?"":A.jR(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iac:1}
A.hJ.prototype={
i(a){return this.A()}}
A.D.prototype={
gag(){return A.m3(this)}}
A.dz.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.fw(s)
return"Assertion failed"}}
A.aZ.prototype={}
A.aB.prototype={
gaV(){return"Invalid argument"+(!this.a?"(s)":"")},
gaU(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.p(p),n=s.gaV()+q+o
if(!s.a)return n
return n+s.gaU()+": "+A.fw(s.gb6())},
gb6(){return this.b}}
A.cO.prototype={
gb6(){return A.kO(this.b)},
gaV(){return"RangeError"},
gaU(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.p(q):""
else if(q==null)s=": Not greater than or equal to "+A.p(r)
else if(q>r)s=": Not in inclusive range "+A.p(r)+".."+A.p(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.p(r)
return s}}
A.dV.prototype={
gb6(){return A.a(this.b)},
gaV(){return"RangeError"},
gaU(){if(A.a(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gp(a){return this.f}}
A.cY.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.ez.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.bY.prototype={
i(a){return"Bad state: "+this.a}}
A.dI.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.fw(s)+"."}}
A.ea.prototype={
i(a){return"Out of Memory"},
gag(){return null},
$iD:1}
A.cV.prototype={
i(a){return"Stack Overflow"},
gag(){return null},
$iD:1}
A.hK.prototype={
i(a){return"Exception: "+this.a}}
A.aN.prototype={
i(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.b.u(e,0,75)+"..."
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
k=""}return g+l+B.b.u(e,i,j)+k+"\n"+B.b.a_(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.p(f)+")"):g}}
A.i.prototype={
ak(a,b,c,d){var s,r
d.a(b)
A.q(this).D(d).h("1(1,i.E)").a(c)
for(s=this.gv(this),r=b;s.k();)r=c.$2(r,s.gl())
return r},
gp(a){var s,r=this.gv(this)
for(s=0;r.k();)++s
return s},
dE(a,b){var s,r
A.q(this).h("A(i.E)").a(b)
for(s=this.gv(this);s.k();){r=s.gl()
if(b.$1(r))return r}throw A.b(A.j0())},
K(a,b){var s,r
A.eh(b,"index")
s=this.gv(this)
for(r=b;s.k();){if(r===0)return s.gl();--r}throw A.b(A.fR(b,b-r,this,"index"))},
i(a){return A.lT(this,"(",")")}}
A.Q.prototype={
i(a){return"MapEntry("+A.p(this.a)+": "+A.p(this.b)+")"}}
A.S.prototype={
gB(a){return A.v.prototype.gB.call(this,0)},
i(a){return"null"}}
A.v.prototype={$iv:1,
R(a,b){return this===b},
gB(a){return A.ee(this)},
i(a){return"Instance of '"+A.ef(this)+"'"},
gC(a){return A.jy(this)},
toString(){return this.i(this)}}
A.fb.prototype={
i(a){return""},
$ibe:1}
A.ab.prototype={
gp(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$imi:1}
A.hz.prototype={
$2(a,b){var s,r,q,p
t.f.a(a)
A.aH(b)
s=B.b.aB(b,"=")
if(s===-1){if(b!=="")a.q(0,A.jn(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.b.u(b,0,s)
q=B.b.ar(b,s+1)
p=this.a
a.q(0,A.jn(r,0,r.length,p,!0),A.jn(q,0,q.length,p,!0))}return a},
$S:14}
A.hy.prototype={
$2(a,b){throw A.b(A.a9("Illegal IPv6 address, "+a,this.a,b))},
$S:15}
A.dk.prototype={
gbO(){var s,r,q,p,o=this,n=o.w
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
if(q===$){s=B.b.gB(r.gbO())
r.y!==$&&A.ld()
r.y=s
q=s}return q},
gcl(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.kj(s==null?"":s)
r.z!==$&&A.ld()
q=r.z=new A.bf(s,t.h)}return q},
gcq(){return this.b},
gb5(){var s=this.c
if(s==null)return""
if(B.b.E(s,"[")&&!B.b.G(s,"v",1))return B.b.u(s,1,s.length-1)
return s},
gb8(){var s=this.d
return s==null?A.kF(this.a):s},
gba(){var s=this.f
return s==null?"":s},
gc2(){var s=this.r
return s==null?"":s},
gc3(){return this.c!=null},
gc5(){return this.f!=null},
gc4(){return this.r!=null},
i(a){return this.gbO()},
R(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.dD.b(b))if(p.a===b.gbk())if(p.c!=null===b.gc3())if(p.b===b.gcq())if(p.gb5()===b.gb5())if(p.gb8()===b.gb8())if(p.e===b.gck()){r=p.f
q=r==null
if(!q===b.gc5()){if(q)r=""
if(r===b.gba()){r=p.r
q=r==null
if(!q===b.gc4()){s=q?"":r
s=s===b.gc2()}}}}return s},
$ieC:1,
gbk(){return this.a},
gck(){return this.e}}
A.hx.prototype={
gcp(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.h(m,0)
s=o.a
m=m[0]+1
r=B.b.aC(s,"?",m)
q=s.length
if(r>=0){p=A.dl(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.eP("data","",n,n,A.dl(s,m,q,128,!1,!1),p,n)}return m},
i(a){var s,r=this.b
if(0>=r.length)return A.h(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.f7.prototype={
gc3(){return this.c>0},
gc5(){return this.f<this.r},
gc4(){return this.r<this.a.length},
gbk(){var s=this.w
return s==null?this.w=this.cQ():s},
cQ(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.b.E(r.a,"http"))return"http"
if(q===5&&B.b.E(r.a,"https"))return"https"
if(s&&B.b.E(r.a,"file"))return"file"
if(q===7&&B.b.E(r.a,"package"))return"package"
return B.b.u(r.a,0,q)},
gcq(){var s=this.c,r=this.b+3
return s>r?B.b.u(this.a,r,s-1):""},
gb5(){var s=this.c
return s>0?B.b.u(this.a,s,this.d):""},
gb8(){var s,r=this
if(r.c>0&&r.d+1<r.e)return A.l9(B.b.u(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.b.E(r.a,"http"))return 80
if(s===5&&B.b.E(r.a,"https"))return 443
return 0},
gck(){return B.b.u(this.a,this.e,this.f)},
gba(){var s=this.f,r=this.r
return s<r?B.b.u(this.a,s+1,r):""},
gc2(){var s=this.r,r=this.a
return s<r.length?B.b.ar(r,s+1):""},
gcl(){if(this.f>=this.r)return B.bE
return new A.bf(A.kj(this.gba()),t.h)},
gB(a){var s=this.x
return s==null?this.x=B.b.gB(this.a):s},
R(a,b){if(b==null)return!1
if(this===b)return!0
return t.dD.b(b)&&this.a===b.i(0)},
i(a){return this.a},
$ieC:1}
A.eP.prototype={}
A.h2.prototype={
i(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.iQ.prototype={
$1(a){return this.a.b_(this.b.h("0/?").a(a))},
$S:5}
A.iR.prototype={
$1(a){if(a==null)return this.a.bW(new A.h2(a===undefined))
return this.a.bW(a)},
$S:5}
A.iC.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.kY(a))return a
s=this.a
a.toString
if(s.aj(a))return s.n(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.k(A.au(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.dv(!0,"isUtc",t.y)
return new A.bl(r,0,!0)}if(a instanceof RegExp)throw A.b(A.r("structured clone of RegExp",null))
if(a instanceof Promise)return A.os(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.as(p,p)
s.q(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.fi(n),p=s.gv(n);p.k();)m.push(A.c9(p.gl()))
for(l=0;l<s.gp(n);++l){k=s.n(n,l)
if(!(l<m.length))return A.h(m,l)
j=m[l]
if(k!=null)o.q(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.q(0,a,o)
h=A.a(a.length)
for(s=J.cb(i),l=0;l<h;++l)o.push(this.$1(s.n(i,l)))
return o}return a},
$S:16}
A.hc.prototype={}
A.bV.prototype={
A(){return"QualityProfileKind."+this.b}}
A.bU.prototype={}
A.fn.prototype={}
A.fo.prototype={}
A.h9.prototype={
M(){var s,r,q,p
for(s=A.lX(["exposure",1,"bloomStrength",0,"ssaoStrength",0,"depthOfFieldStrength",0,"vignette",0,"grain",0,"rainIntensity",0,"rainWindowVisibility",1,"ditherStrength",0,"colorGradeStrength",0,"affineWarpStrength",0,"vertexSnapGrid",0,"vhsChromaWeight",0,"vhsTrackingWeight",0,"vhsNoiseWeight",0,"vhsHeadSwitchWeight",0,"vhsDropoutWeight",0,"vhsGhostWeight",0],t.N,t.i),s=new A.aR(s,A.q(s).h("aR<1,2>")).gv(0);s.k();){r=s.d
q=r.a
p=r.b
if(!isFinite(p)||p<0)throw A.b(A.r("PostProcessState."+q+" must be >= 0: "+A.p(p),null))}}}
A.cg.prototype={}
A.fD.prototype={
M(){var s,r,q,p=null
if(!B.bg.gT(0)||!B.G.gT(0)||!B.H.gT(0))throw A.b(A.r("FrameEnvironment colors must be finite",p))
s=isFinite(0)
if(s)r=!isFinite(1)
else r=!0
if(r)throw A.b(A.r("FrameEnvironment requires fogEnd >= fogStart, got 0/1",p))
if(!s)throw A.b(A.r("FrameEnvironment.ambientIntensity must be >= 0: 0",p))
for(q=0;!1;++q)B.bp[q].M()
for(s=isFinite(1),r=isFinite(-1),q=0;!1;++q){if(!s)A.k(A.r("SpotLight.position must be finite: "+B.p.i(0),p))
if(!r)A.k(A.r("SpotLight.direction must be finite and nonzero: "+B.u.i(0),p))}}}
A.dR.prototype={}
A.aW.prototype={
R(a,b){if(b==null)return!1
return J.dy(b)===A.jy(this)&&b instanceof A.aW&&this.a===b.a&&this.b===b.b},
gB(a){return A.cM(A.jy(this),this.a,this.b,B.h,B.h,B.h)}}
A.ah.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MeshHandle(#"+this.a+"."+this.b+s+")"}}
A.ai.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"TextureHandle(#"+this.a+"."+this.b+s+")"}}
A.aD.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"MaterialHandle(#"+this.a+"."+this.b+s+")"}}
A.eb.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"PipelineHandle(#"+this.a+"."+this.b+s+")"}}
A.bo.prototype={
i(a){var s=this.c
s=s==null?"":' "'+s+'"'
return"InstanceId(#"+this.a+"."+this.b+s+")"}}
A.ct.prototype={
A(){return"HandleRejection."+this.b}}
A.fQ.prototype={
i(a){return"HandleException("+this.a.b+", "+this.b.i(0)+")"}}
A.bP.prototype={
gT(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
R(a,b){if(b==null)return!1
return b instanceof A.bP&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gB(a){return A.cM(this.a,this.b,this.c,B.h,B.h,B.h)},
i(a){return"LinearColor("+A.p(this.a)+", "+A.p(this.b)+", "+A.p(this.c)+")"}}
A.ae.prototype={}
A.iS.prototype={
$2(a,b){var s,r=t.fk
r.a(a)
s=B.ag.H(r.a(b).a,a.a)
return s===0?0:s},
$S:17}
A.aw.prototype={
A(){return"VertexAttributeKind."+this.b}}
A.fs.prototype={}
A.h4.prototype={
M(){var s=this.a,r=s.a
if(!r.t(0,"sceneColor")||!r.t(0,"present"))throw A.b(A.r("resource plan must contain sceneColor and present",null))
if(s.dj(0,new A.h6()))throw A.b(A.r("resource plan contains an empty resource ID",null))
if(this.b!==r.t(0,"vhsOutput"))throw A.b(A.r("resource history does not match vhsOutput ownership",null))}}
A.h6.prototype={
$1(a){return A.aH(a).length===0},
$S:6}
A.ha.prototype={}
A.el.prototype={
c7(a){var s=this
if(s.d)A.k(A.j("resource assembler is disposed"))
if(s.a!=null)throw A.b(A.j("resource assembler is initialized"))
a.M()
s.a=a
s.c=1},
a5(){if(this.d)return
this.d=!0
this.a=null}}
A.eu.prototype={
M(){var s=this
if(s.a<0||s.b<0)throw A.b(A.r("SurfaceMetrics css size must be >= 0",null))
if(s.c<0||s.d<0)throw A.b(A.r("SurfaceMetrics pixel size must be >= 0",null))
if(!isFinite(1))throw A.b(A.r("SurfaceMetrics.devicePixelRatio must be finite and > 0: 1",null))}}
A.fm.prototype={
A(){return"ColorEncoding."+this.b}}
A.fu.prototype={
A(){return"DiagnosticLevel."+this.b}}
A.ej.prototype={
M(){var s=this,r="installedFeatures",q=s.a,p=q.b,o=p.bY(B.cl)
if(o.a!==0)A.k(A.aL(o,r,"contains unknown pipeline features"))
if(q.a===B.L&&p.gc9(p))A.k(A.aL(p,r,"safe profiles cannot install optional features"))
q=s.b
if(q<=0||s.c<=0)throw A.b(A.r("RendererConfiguration internal resolution must be > 0: "+q+"x"+s.c,null))
q=s.d
if(q<=0)throw A.b(A.r("RendererConfiguration.sampleCount must be > 0: "+q,null))}}
A.bW.prototype={
A(){return"RendererState."+this.b}}
A.L.prototype={}
A.fF.prototype={
i(a){var s=this
return"FrameStats(#"+s.a+" draws="+s.b+" tris="+s.c+" culled="+s.d+" gpu="+s.r+"B)"}}
A.e1.prototype={
dX(a){return this.a.a4(a)}}
A.fY.prototype={
$3(a,b,c){return new A.aD(A.a(a),A.a(b),A.bD(c))},
$S:20}
A.eB.prototype={}
A.h_.prototype={
df(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.k,f=this.a,e=a.gcr(),d=A.mz(f,new A.fI(e.gce(e),B.b_,B.aY))
e=a.gcr()
if(f.b!==B.e)A.k(A.j(g))
s=A.a0(d.a)
r=f.a
q=v.G
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
r.bufferSubData(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),0,e)
p=A.aF(f)
A.ay(f,p)
if(f.b!==B.e)A.k(A.j(g))
r.bindBuffer(A.a(q.WebGL2RenderingContext.ARRAY_BUFFER),s)
o=a.gcd().gee().a_(0,4)
n=A.aC(t.S)
for(e=a.gcd().gdk(),m=e.length,l=0;l<m;++l){k=e[l]
j=A.l2(k.gdN())
if(!n.j(0,j))continue
i=A.nq(a.gcd(),j,k)
h=k.gem().a_(0,4)
if(f.b!==B.e)A.k(A.j(g))
r.vertexAttribPointer.apply(r,[j,i,A.a(q.WebGL2RenderingContext.FLOAT),!1,o,h])
if(f.b!==B.e)A.k(A.j(g))
r.enableVertexAttribArray(j)}A.k1(a.gdG())
return new A.eB(d,void 1,p,0,a.geJ(),!0)},
dR(a){if(this.c.n(0,a.gU())==null)throw A.b(A.bN(B.F,a))
this.b.a4(a)},
bb(){var s,r,q,p,o,n
for(s=this.b.a8(),r=s.$ti,s=new A.aA(s.a(),r.h("aA<1>")),q=this.c,r=r.c;s.k();){p=s.b
if(p==null)p=r.a(p)
o=p.a
n=p.b
q.q(0,o.a,this.df(n))}},
gam(){return this.b.a8().ak(0,0,new A.h1(),t.S)}}
A.h0.prototype={
$3(a,b,c){return new A.ah(A.a(a),A.a(b),A.bD(c))},
$S:21}
A.h1.prototype={
$2(a,b){var s,r
A.a(a)
s=t.ai.a(b).b
r=s.gcr()
r=B.i.ae(a,r.gce(r))
s=A.k1(s.gdG())
return r+s},
$S:22}
A.ex.prototype={
V(a){var s=this.a,r=A.kn(s,B.aG)
A.ko(s,r,0,a)
return r},
ai(a,b){this.b.a4(a)},
dT(a){var s=this.d
s===$&&A.aJ()
return this.ai(a,s)},
e0(a){var s=this.e
s===$&&A.aJ()
return this.ai(a,s)},
e2(a){var s=this.f
s===$&&A.aJ()
return this.ai(a,s)},
dV(a){var s=this.r
s===$&&A.aJ()
return this.ai(a,s)},
dZ(a){var s=this.w
s===$&&A.aJ()
return this.ai(a,s)},
a5(){var s,r,q,p,o,n=this
for(s=n.c,r=new A.aS(s,s.r,s.e,A.q(s).h("aS<2>")),q=n.a,p=q.a,o=t.R;r.k();)p.deleteTexture(o.a(r.d.a).a)
s.X(0)
s=n.d
s===$&&A.aJ()
A.eH(q,s)
s=n.e
s===$&&A.aJ()
A.eH(q,s)
s=n.f
s===$&&A.aJ()
A.eH(q,s)
s=n.r
s===$&&A.aJ()
A.eH(q,s)
s=n.w
s===$&&A.aJ()
A.eH(q,s)},
bb(){var s,r,q,p,o,n,m,l,k,j=this
j.d=j.V($.jH())
j.e=j.V($.jE())
j.f=j.V($.jF())
j.r=j.V($.jD())
j.w=j.V($.jG())
for(s=j.b.a8(),r=s.$ti,s=new A.aA(s.a(),r.h("aA<1>")),q=j.c,p=j.a,r=r.c;s.k();){o=s.b
if(o==null)o=r.a(o)
n=o.a
m=o.b
if(m.gcc().c1(0,new A.hu()))continue
l=A.kn(p,m.gm())
for(k=0;B.i.bj(k,m.gcc().length);++k){o=m.gcc()
if(!(k<o.length))return A.h(o,k)
A.ko(p,l,k,o[k])}if(m.gev())A.mA(p,l)
q.q(0,n.a,l)}},
gam(){return this.b.a8().ak(0,0,new A.ht(),t.S)}}
A.hs.prototype={
$3(a,b,c){return new A.ai(A.a(a),A.a(b),A.bD(c))},
$S:24}
A.hu.prototype={
$1(a){return!1},
$S:25}
A.ht.prototype={
$2(a,b){var s
A.a(a)
s=t.dU.a(b).b.gm()
return B.i.ae(a,s.geL().a_(0,s.gen()).a_(0,s.gep()).a_(0,4))},
$S:26}
A.b9.prototype={
gdH(){return this.b.length}}
A.dP.prototype={
ds(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i
t.W.a(a)
s=new A.hf(A.d([],t.cU),A.aC(t.N))
for(r=this.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.B)(r),++p)r[p].J(s,b)
o=s.dr(a,!1)
if(o.b.length!==0)return new A.dQ(o,B.bq)
q=o.a
n=A.O(q)
m=new A.aV(q,n.h("m(1)").a(new A.fz()),n.h("aV<1,m>")).ac(0)
l=A.d([],t.u)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.B)(r),++p){k=r[p]
for(n=k.I(d),j=0;j<1;++j){i=n[j]
if(!m.t(0,i.gm().a))throw A.b(A.j('RenderFeature "'+k.gF()+'" created a pass "'+i.gm().a+'" that it never declared into the graph'))
B.a.j(l,i)}}B.a.af(l,new A.fA(o))
return new A.dQ(o,l)}}
A.fz.prototype={
$1(a){return t.z.a(a).a},
$S:27}
A.fA.prototype={
$2(a,b){var s=t.fA
s.a(a)
s.a(b)
s=this.a.a
return B.i.H(B.a.c6(s,new A.fx(a)),B.a.c6(s,new A.fy(b)))},
$S:28}
A.fx.prototype={
$1(a){return t.z.a(a).a===this.a.gm().a},
$S:2}
A.fy.prototype={
$1(a){return t.z.a(a).a===this.a.gm().a},
$S:2}
A.dQ.prototype={}
A.bL.prototype={
A(){return"FrameQueueState."+this.b}}
A.fE.prototype={}
A.fC.prototype={
dm(a){if(a.length===0)throw A.b(A.aL(a,"passId",null))
this.b=a
this.a.b9(a,A.l5())},
cu(){var s,r,q,p,o=t.A
o=A.as(o,o)
for(s=this.a,s=new A.aR(s,A.q(s).h("aR<1,2>")).gv(0);s.k();){r=s.d
q=r.a
p=r.b
o.q(0,q,new A.L(p.a,p.b,p.d))}return A.jQ(o,t.N,t.b)},
a7(a,b){var s,r=this.b
if(r==null)throw A.b(A.j("draw recorded outside an active render pass"))
if(b<1)throw A.b(A.r("draw count and instance count must be positive",null))
s=this.a.n(0,r);++s.a
s.d+=b
s.b=s.b+(a/3|0)*b}}
A.c2.prototype={}
A.F.prototype={
gaa(){var s=this.c,r=A.O(s)
return new A.a5(s,r.h("A(1)").a(new A.h7()),r.h("a5<1>"))},
gaq(){var s=this.c,r=A.O(s)
return new A.a5(s,r.h("A(1)").a(new A.h8()),r.h("a5<1>"))},
i(a){return"PassDeclaration("+this.a+" @ "+this.b.i(0)+")"}}
A.h7.prototype={
$1(a){var s=t.J.a(a).b
return s===B.d||s===B.o},
$S:7}
A.h8.prototype={
$1(a){return t.J.a(a).b===B.f},
$S:7}
A.ar.prototype={
A(){return"GraphValidationFailureKind."+this.b}}
A.a2.prototype={
i(a){return"GraphValidationFailure("+this.a.b+" in "+this.b+": "+this.c+")"}}
A.ek.prototype={
A(){return"ResourceFormat."+this.b}}
A.aP.prototype={
A(){return"GraphStage."+this.b}}
A.M.prototype={
cf(){var s=this
return new A.M(s.a,s.b,s.c,s.d,s.e,s.f+1)},
R(a,b){var s=this
if(b==null)return!1
return b instanceof A.M&&s.a===b.a&&s.b===b.b&&s.c===b.c&&s.d===b.d&&s.e===b.e&&s.f===b.f},
gB(a){var s=this
return A.cM(s.a,s.b,s.c,s.d,s.e,s.f)},
i(a){var s=this,r=s.b.i(0),q=s.e
q=q>1?" x"+q:""
return"ResourceRef("+s.a+"#"+s.f+", "+r+", "+s.c+"x"+s.d+q+")"}}
A.cR.prototype={
A(){return"ResourceAccess."+this.b}}
A.l.prototype={}
A.ck.prototype={}
A.hb.prototype={
N(a){var s,r,q,p,o,n,m=this
a.M()
s=null
try{r=a.d.gY()
r=A.an(r,A.q(r).h("i.E"))
q=t.r
s=A.mB(m.a,a.c,q.a(r),q.a(a.f),a.b)}catch(p){if(A.b5(p) instanceof A.cU){++m.e
throw p}else throw p}o=new A.ck(s)
r=m.b
q=a.a
n=r.n(0,q)
r.q(0,q,o);++m.d
if(n!=null)m.a.a.deleteProgram(A.a0(n.b.a))
return o},
cV(a){var s,r
t.cr.a(a)
for(s=a.a,s=new A.aS(s,s.r,s.e,a.$ti.h("aS<1>")),r=this.a.a;s.k();)r.deleteProgram(A.a0(s.d.b.a))}}
A.a3.prototype={
M(){var s,r,q,p,o,n,m=null,l=this.a
if(l.length===0)throw A.b(A.r("ProgramSource.id must not be empty",m))
s=t.S
r=A.aC(s)
for(q=this.d.ga1(),q=q.gv(q);q.k();){p=q.gl()
o=p.b
if(o<0)throw A.b(A.r('ProgramSource "'+l+'": attribute "'+p.a+'" has a negative location',m))
if(!r.j(0,o))throw A.b(A.r('ProgramSource "'+l+'": duplicate attribute location '+o,m))}n=A.aC(s)
for(s=this.e.ga1(),s=s.gv(s);s.k();){q=s.gl()
p=q.b
if(p<0)throw A.b(A.r('ProgramSource "'+l+'": sampler "'+q.a+'" has a negative unit',m))
if(!n.j(0,p))throw A.b(A.r('ProgramSource "'+l+'": duplicate sampler unit '+p,m))}}}
A.hd.prototype={}
A.Z.prototype={
O(){var s=this
return A.jS(B.aD,s.f,B.aC,B.aE,!0,!0,!0,!0,s.r,B.aQ,B.aR,s.d,s.e,!0,!1,!1)}}
A.hf.prototype={
dr(a,b){var s=this.dg(t.W.a(a),!1),r=this.a,q=A.O(r)
return new A.he(A.jZ(new A.a5(r,q.h("A(1)").a(new A.hk()),q.h("a5<1>")),t.z),s)},
dg(a,b){var s,r,q,p,o,n,m=this
t.W.a(a)
s=A.d([],t.b7)
r=m.a
q=A.O(r)
p=q.h("a5<1>")
o=A.an(new A.a5(r,q.h("A(1)").a(new A.hj()),p),p.h("i.E"))
m.cF(o,a,s)
m.cJ(o,s)
m.cL(o,s)
m.cI(o,!1,s)
n=m.cN(o,s)
m.cK(o,n,s)
m.cM(o,s)
m.cH(o,n,s)
m.cG(o,s)
return s},
cF(a,b,c){var s,r,q,p
t.O.a(a)
t.W.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.B)(a),++r){q=a[r]
p=B.P.bY(b)
if(p.a!==0)B.a.j(c,new A.a2(B.bc,q.a,"missing capabilities: "+p.aF(0,", ")))}},
cJ(a,b){var s,r,q,p,o,n,m
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.B)(a),++r){q=a[r]
if(q.f)continue
for(p=q.gaa(),o=J.X(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gl().a
if(m.e>1)B.a.j(b,new A.a2(B.b7,n,"reads multisampled resource "+m.i(0)+" directly; resolve before sampling"))}}},
cL(a,b){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(b)
for(s=A.O(a),r=s.h("A(1)").a(new A.hi()),q=B.a.gv(a),s=new A.G(q,r,s.h("G<1>"));s.k();){r=q.gl()
p=r.gaa()
o=A.an(p,p.$ti.h("i.E"))
p=r.gaq()
n=A.an(p,p.$ti.h("i.E"))
if(o.length!==1||n.length!==1){B.a.j(b,new A.a2(B.E,r.a,"a resolve must read exactly one source and write exactly one destination"))
continue}m=B.a.gbm(o).a
l=B.a.gbm(n).a
if(m.e<=1||l.e>1)B.a.j(b,new A.a2(B.E,r.a,"resolve requires a multisampled source and single-sample destination"))
if(m.b!==l.b||m.c!==l.c||m.d!==l.d)B.a.j(b,new A.a2(B.E,r.a,"resolve source and destination must match format and extent"))}},
cI(a,b,c){var s,r,q,p,o,n,m,l
t.O.a(a)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.B)(a),++r){q=a[r]
for(p=q.c,o=p.length,n=q.a,m=0;m<p.length;p.length===o||(0,A.B)(p),++m){l=p[m]
if(l.b===B.o)B.a.j(c,new A.a2(B.ba,n,"history read of "+l.a.a+" with no valid previous frame"))}}},
cN(a,b){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t._.a(b)
s=A.as(t.N,t.z)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.B)(a),++q){p=a[q]
for(o=p.gaq(),n=J.X(o.a),o=new A.G(n,o.b,o.$ti.h("G<1>")),m=p.a;o.k();){l=n.gl().a
k=l.a+"#"+l.f
j=s.n(0,k)
if(j!=null){B.a.j(b,new A.a2(B.b6,m,l.i(0)+" already written by "+j.a))
continue}s.q(0,k,p)}}return s},
cK(a,b,c){var s,r,q,p,o,n,m
t.O.a(a)
t.E.a(b)
t._.a(c)
for(s=0;s<a.length;++s){r=a[s]
for(q=r.gaa(),p=J.X(q.a),q=new A.G(p,q.b,q.$ti.h("G<1>")),o=r.a;q.k();){n=p.gl()
if(n.b===B.o)continue
n=n.a
m=b.n(0,n.a+"#"+n.f)
if(m==null){B.a.j(c,new A.a2(B.ad,o,"reads "+n.i(0)+" but no pass writes that version"))
continue}if(B.a.aB(a,m)>s)B.a.j(c,new A.a2(B.ad,o,"reads "+n.i(0)+" before writer "+m.a+" runs"))}}},
cM(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.B)(a),++r){q=a[r]
for(p=q.gaa(),o=J.X(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gl()
if(m.b===B.o)continue
for(l=q.gaq(),k=J.X(l.a),l=new A.G(k,l.b,l.$ti.h("G<1>")),m=m.a,j=m.a,i=m.f;l.k();){h=k.gl().a
if(j===h.a&&i===h.f)B.a.j(b,new A.a2(B.b9,n,"reads and writes "+m.i(0)+" at the same version; declare a ping-pong version bump"))}}}},
cH(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.O.a(a)
t.E.a(b)
t._.a(c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.B)(a),++r){q=a[r]
for(p=q.gaa(),o=J.X(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>")),n=q.a;p.k();){m=o.gl()
if(m.b===B.o)continue
l=m.a
k=b.n(0,l.a+"#"+l.f)
if(k==null)continue
j=k.gaq().dE(0,new A.hh(m)).a
if(!(j.b===l.b&&j.c===l.c&&j.d===l.d&&j.e===l.e))B.a.j(c,new A.a2(B.b8,n,"reads "+l.i(0)+" but writer "+k.a+" produced "+j.i(0)))}}},
cG(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
t.O.a(a)
t._.a(b)
s=t.S
r=A.as(t.N,s)
for(q=0;p=a.length,q<p;++q)for(p=a[q].gaq(),o=J.X(p.a),p=new A.G(o,p.b,p.$ti.h("G<1>"));p.k();){n=o.gl().a
r.q(0,n.a+"#"+n.f,q)}m=J.jT(p,t.cJ)
for(l=0;l<p;++l)m[l]=A.aC(s)
for(q=0;s=a.length,q<s;++q)for(s=a[q].gaa(),p=J.X(s.a),s=new A.G(p,s.b,s.$ti.h("G<1>"));s.k();){o=p.gl()
if(o.b===B.o)continue
o=o.a
k=r.n(0,o.a+"#"+o.f)
if(k!=null&&k!==q){if(k>>>0!==k||k>=m.length)return A.h(m,k)
m[k].j(0,q)}}p=t.y
j=A.cC(s,!1,!1,p)
s=a.length
i=A.cC(s,!1,!1,p)
h=new A.hg(j,i,m)
for(q=0;q<a.length;++q){if(!(q<s))return A.h(i,q)
if(!i[q]&&h.$1(q)){if(!(q<a.length))return A.h(a,q)
B.a.j(b,new A.a2(B.bb,a[q].a,"participates in a resource dependency cycle"))}}}}
A.hk.prototype={
$1(a){t.z.a(a)
return A.j9()},
$S:2}
A.hj.prototype={
$1(a){t.z.a(a)
return A.j9()},
$S:2}
A.hi.prototype={
$1(a){return t.z.a(a).f},
$S:2}
A.hh.prototype={
$1(a){var s=t.J.a(a).a,r=this.a.a
return s.a===r.a&&s.f===r.f},
$S:7}
A.hg.prototype={
$1(a){var s,r,q,p,o=this,n=o.a
if(!(a>=0&&a<n.length))return A.h(n,a)
if(n[a])return!0
s=o.b
if(!(a<s.length))return A.h(s,a)
if(s[a])return!1
B.a.q(n,a,!0)
r=o.c
if(!(a<r.length))return A.h(r,a)
r=r[a]
r=A.jg(r,r.r,A.q(r).c)
q=r.$ti.c
while(r.k()){p=r.d
if(o.$1(p==null?q.a(p):p))return!0}B.a.q(n,a,!1)
B.a.q(s,a,!0)
return!1},
$S:31}
A.he.prototype={}
A.cP.prototype={
dh(a){a.M()
this.a.a4(a.gS())},
gca(){return new A.aG(this.dM(),t.eM)},
dM(){var s=this
return function(){var r=0,q=1,p=[],o,n,m
return function $async$gca(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.b.a8(),n=o.$ti,o=new A.aA(o.a(),n.h("aA<1>")),n=n.c
case 2:if(!o.k()){r=3
break}m=o.b
if(m==null)m=n.a(m)
m.a
s.dh(m.b)
r=4
return a.b=void 1,1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ime:1}
A.hl.prototype={
$3(a,b,c){return new A.bo(A.a(a),A.a(b),A.bD(c))},
$S:32}
A.hm.prototype={
a5(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
if(e.x)return
s=e.w
r=A.an(s,A.q(s).c)
q=r.length
p=e.c
o=p.c
n=p.a.a
m=t.R
l=0
for(;l<r.length;r.length===q||(0,A.B)(r),++l){k=r[l]
j=o.aH(0,k.a)
if(j!=null)n.deleteTexture(m.a(j.a).a)
p.b.bc(k)}r=e.r
q=A.an(r,A.q(r).c)
o=q.length
n=e.b.a
l=0
for(;l<q.length;q.length===o||(0,A.B)(q),++l)n.bc(q[l])
q=e.f
o=A.an(q,A.q(q).c)
n=o.length
m=e.a
i=m.c
h=m.a.a
l=0
for(;l<o.length;o.length===n||(0,A.B)(o),++l){k=o[l]
g=i.aH(0,k.a)
if(g!=null){h.deleteVertexArray(A.a0(g.c.a))
h.deleteBuffer(A.a0(g.a.a))
f=g.b
if(f!=null)h.deleteBuffer(A.a0(f.a))}m.b.bc(k)}s.X(0)
r.X(0)
q.X(0)
p.a5()
e.x=!0}}
A.hL.prototype={}
A.iv.prototype={
$1(a){var s=this.a.w.a.dR(a),r=s.b!=null,q=r?s.d:s.e
return new A.cQ(s.c,r,q,s.f)},
$S:33}
A.iw.prototype={
$2$fallback(a,b){var s=this.a.a
if(s.t(0,a))return this.b.x.gl().cj(a)
if(b!=null&&s.t(0,b))return this.b.x.gl().cj(b)
throw A.b(A.j("resource is not in configured graph: "+a))},
$1(a){return this.$2$fallback(a,null)},
$S:34}
A.iu.prototype={
$0(){return this.a.$1("shadowMap")},
$S:1}
A.im.prototype={
$0(){return null},
$S:36}
A.io.prototype={
$0(){var s=this.a.at
if(s==null)return B.I
return A.ou(B.I,3,s.a.d,null)},
$S:37}
A.it.prototype={
$0(){return this.a.$1("sceneDepth")},
$S:1}
A.ih.prototype={
$0(){return this.a.at.a},
$S:38}
A.ij.prototype={
$0(){return this.a.$2$fallback("ssaoRaw","sceneColor")},
$S:1}
A.ii.prototype={
$0(){return this.a.$2$fallback("ssaoBlurred","sceneColor")},
$S:1}
A.is.prototype={
$0(){var s=this.b.d>1?"sceneColor#1":"sceneColor"
return this.a.$1(s)},
$S:1}
A.ie.prototype={
$0(){return this.a.$2$fallback("bloomBlurH","sceneColor")},
$S:1}
A.ig.prototype={
$0(){return this.a.$2$fallback("bloomBlurV","sceneColor")},
$S:1}
A.ip.prototype={
$0(){return this.a.$2$fallback("dofBlurH","sceneColor")},
$S:1}
A.iq.prototype={
$0(){return this.a.$2$fallback("dofBlurV","sceneColor")},
$S:1}
A.ir.prototype={
$0(){var s=this.a.w.c.d
s===$&&A.aJ()
return s},
$S:1}
A.il.prototype={
$0(){return this.a.$2$fallback("vhsOutput","sceneColor")},
$S:1}
A.ik.prototype={
$0(){return this.a.at.w},
$S:59}
A.ix.prototype={
$0(){return this.a},
$S:40}
A.i0.prototype={}
A.f0.prototype={$imd:1}
A.eV.prototype={$ilM:1}
A.hn.prototype={
c8(a,b){var s,r,q,p,o,n,m,l=this
if(l.e!==B.M)throw A.b(A.j("renderer can only be initialized once"))
a.M()
b.M()
s=l.a
if(s.b===B.x)throw A.b(A.j("renderer device is context lost"))
l.e=B.c5
try{r=v.G
s.ah(A.a(r.WebGL2RenderingContext.MAX_TEXTURE_SIZE))
s.ah(A.a(r.WebGL2RenderingContext.MAX_ARRAY_TEXTURE_LAYERS))
s.ah(A.a(r.WebGL2RenderingContext.MAX_SAMPLES))
s.ah(A.a(r.WebGL2RenderingContext.MAX_VERTEX_ATTRIBS))
s.ah(A.a(r.WebGL2RenderingContext.MAX_COLOR_ATTACHMENTS))
q=s.r
if(q.t(0,"EXT_texture_filter_anisotropic"))s.bD(34047)
p=q.t(0,"EXT_disjoint_timer_query_webgl2")
s.w=p
q.t(0,"EXT_color_buffer_float")
q.t(0,"EXT_color_buffer_half_float")
q.t(0,"WEBGL_lose_context")
q=s.a
A.c9(q.getParameter(A.a(r.WebGL2RenderingContext.RENDERER)))
A.c9(q.getParameter(A.a(r.WebGL2RenderingContext.VENDOR)))
l.r=new A.hc(p)
r=l.b
o=A.h5(a)
q=r.a
if(q.a!=null)A.k(A.j("configuration state is already initialized"))
a.M()
q.a=a
A.h5(a)
q.d=1
r.b.c7(o)
r=A.m_()
l.w=new A.hm(A.m0(s),r,A.mk(s),A.aC(t.cA),A.aC(t.eL),A.aC(t.aj))
r=new A.el()
q=new A.fK(s,r)
o=A.h5(a)
n=q.bw(o,a)
r.c7(o)
q.c=new A.ed(new A.ha(o),n)
l.x=q
l.y=new A.hb(s,A.as(t.N,t.dN))
l.as=a
A.kR(l)
l.e=B.N}catch(m){s=l.y
if(s!=null){r=s.b
s.cV(new A.aT(r,A.q(r).h("aT<2>")))
r.X(0)}s=l.x
if(s!=null)s.a5()
s=l.w
if(s!=null)s.a5()
l.w=null
l.e=B.M
throw m}s=new A.N($.I,t.cd)
s.aM(null)
return s},
bV(a,b){var s,r,q,p,o,n,m=this,l=null
m.d4()
m.av()
r=B.a.t(m.d,a)
if(!r)throw A.b(A.r("world was not created by this renderer",l))
if(m.at!=null)throw A.b(A.j("renderer.beginFrame called twice without end/abort"))
r=b.a
q=r.d
if(!q.gT(0))A.k(A.r("CameraView.eye must be finite: "+q.i(0),l))
q=r.e
if(!q.gT(0)||q.gaG()<1e-12)A.k(A.r("CameraView.forward must be finite and nonzero: "+q.i(0),l))
q=r.f
if(isFinite(q)){p=r.r
p=!isFinite(p)||q<=0||p<=q}else p=!0
if(p)A.k(A.r("CameraView requires 0 < near < far, got "+A.p(q)+"/"+r.r,l))
q=r.w
if(!isFinite(q)||q<=0)A.k(A.r("CameraView.aspect must be finite and > 0: "+A.p(q),l))
if(!r.a.gT(0)||!r.b.gT(0)||!r.c.gT(0))A.k(A.r("CameraView matrices must be finite",l))
b.b.M()
b.c.M()
r=b.w
if(!isFinite(r))A.k(A.r("FrameInput.timeSeconds must be finite: "+A.p(r),l))
m.at=b
m.ax=a
o=m.c
if(o.b===B.w)A.k(A.j("FrameQueue.beginFrame called twice without end/abort"))
o.b=B.w
o.c=0
B.a.X(o.a)
s=o
try{r=m.r
if((r==null?A.k(A.j("renderer is not initialized")):r).z)m.b$=m.a.dl()
return s}catch(n){if(o.b!==B.w)A.k(A.j("FrameQueue.abortFrame called without an active frame"))
o.c=0
o.b=B.aV
m.bo()
m.ax=m.at=null
throw n}},
c0(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
e.av()
s=e.at
r=e.ax
if(s==null||r==null)throw A.b(A.j("renderer.endFrame called without an active frame"))
m=e.c
if(m.b!==B.w)A.k(A.j("FrameQueue.endFrame called without an active frame"))
l=m.a
k=A.kc(l,0,A.dv(m.c,"count",t.S),A.O(l).c).e8(0,!1)
m.b=B.aU
q=k
try{p=A.nt(e,r,s,q)
o=p.a.cu()
m=o.ga1()
l=A.q(m)
n=new A.aU(new A.a5(m,l.h("A(i.E)").a(new A.ho()),l.h("a5<i.E>")),l.h("L(i.E)").a(new A.hp()),l.h("aU<i.E,L>")).ak(0,B.aS,new A.hq(),t.b)
l=s.e
m=n.a
j=n.b
i=p.c
n.toString
p.toString
h=e.w
g=h.a.gam()
h=h.c.gam()
f=e.w
f.a.gam()
f.c.gam()
e.w.toString
return new A.fF(l,m,j,i,g+h)}finally{e.d0(s.e)
e.ax=e.at=null}},
d4(){var s,r,q,p=this
if(p.e!==B.z)return
if(p.a.b===B.x)throw A.b(A.j("renderer context remains lost"))
s=p.w
if(s.x)A.k(A.j("resource library is disposed"))
s.a.bb()
s.c.bb()
s=p.x
s.toString
r=p.as
r.toString
if(s.e)A.k(A.j("GPU resource adapter is disposed"))
q=s.c
if(q==null)A.k(A.j("GPU resource adapter is not initialized"))
s.c=new A.ed(q.a,s.bw(A.h5(r),r))
s=p.y
s.c=null
s.b.X(0)
A.kR(p)
p.e=B.N},
av(){var s=this,r=s.e
if(r!==B.N)throw A.b(A.j("renderer is not ready: "+r.b))
if(s.a.b===B.x){s.cX()
s.e=B.z
throw A.b(A.j("renderer context lost"))}}}
A.ho.prototype={
$1(a){return B.b.t(t.D.a(a).a.toLowerCase(),"world")},
$S:41}
A.hp.prototype={
$1(a){return t.D.a(a).b},
$S:42}
A.hq.prototype={
$2(a,b){var s=t.b
s.a(a)
s.a(b)
return new A.L(a.a+b.a,a.b+b.b,a.d+b.d)},
$S:43}
A.f_.prototype={}
A.hW.prototype={
d0(a){var s,r,q,p=this,o=p.b$
p.b$=null
if(o==null)return
try{s=p.a
if(s.b!==B.e)A.k(A.j(u.k))
r=s.bQ(o)
if(r.b)A.k(A.j("WebGl2Device: timer already ended"))
s.a.endQuery(35007)
r.b=!0
B.a.j(p.a$,new A.f_(o))}catch(q){p.aT(o)}},
bo(){var s=this.b$
this.b$=null
if(s!=null)this.aT(s)},
cX(){var s,r,q
this.bo()
s=this.a$
r=J.jV(s.slice(0),A.O(s).c)
B.a.X(s)
for(s=r.length,q=0;q<r.length;r.length===s||(0,A.B)(r),++q)this.aT(r[q].b)},
aT(a){var s,r
try{s=this.a
s.a.deleteQuery(s.bQ(a).a)}catch(r){}}}
A.f4.prototype={}
A.eo.prototype={
A(){return"ShadowCasterLod."+this.b}}
A.ad.prototype={
H(a,b){var s
t.fy.a(b)
s=B.i.H(this.a.a,b.a.a)
if(s!==0)return s
s=this.b.gU().H(0,b.b.gU())
return s},
$iac:1}
A.T.prototype={}
A.iW.prototype={
$2(a,b){var s=t.k
return s.a(a).a.H(0,s.a(b).a)},
$S:44}
A.iX.prototype={
$1(a){return t.k.a(a).b},
$S:45}
A.iU.prototype={
$2(a,b){var s=t.a
return s.a(a).a.H(0,s.a(b).a)},
$S:46}
A.iV.prototype={
$1(a){return t.a.a(a).b},
$S:47}
A.fr.prototype={}
A.fq.prototype={}
A.br.prototype={}
A.cr.prototype={
A(){return"FrustumTest."+this.b}}
A.fG.prototype={
e6(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
for(s=this.a,r=!1,q=0;q<6;++q){p=s[q]
o=p.a
n=o.a
m=n>=0
l=m?a.gan().gbg():a.gao().gbg()
k=o.b
j=k>=0
i=j?a.gan().gbh():a.gao().gbh()
o=o.c
h=o>=0
g=h?a.gan().gbi():a.gao().gbi()
f=p.b
if(n*l+k*i+o*g+f<0)return B.a7
m=m?a.gao().gbg():a.gan().gbg()
l=j?a.gao().gbh():a.gan().gbh()
j=h?a.gao().gbi():a.gan().gbi()
if(n*m+k*l+o*j+f<0)r=!0}return r?B.aW:B.aX}}
A.fH.prototype={
$4(a,b,c,d){var s=new A.ao(a,b,c),r=new A.br(s,d),q=Math.sqrt(s.gaG())
if(q<1e-9)s=r
else{s=1/q
s=new A.br(new A.ao(a*s,b*s,c*s),d/q)}return s},
$S:48}
A.bR.prototype={
a_(a,b){var s,r,q,p,o,n,m,l,k,j=new Float32Array(16)
for(s=this.a,r=b.a,q=0;q<4;++q)for(p=q*4,o=0;o<4;++o){for(n=0,m=0;m<4;++m){l=m*4+o
if(!(l<16))return A.h(s,l)
l=s[l]
k=p+m
if(!(k<16))return A.h(r,k)
n+=l*r[k]}l=p+o
if(!(l<16))return A.h(j,l)
j[l]=n}return new A.bR(j)},
gT(a){return B.J.c1(this.a,new A.fX())},
i(a){return"Mat4("+A.p(this.a)+")"}}
A.fX.prototype={
$1(a){return isFinite(A.ib(a))},
$S:49}
A.ao.prototype={
b1(a){return this.a*a.a+this.b*a.b+this.c*a.c},
bX(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.ao(s*r-q*p,q*o-n*r,n*p-s*o)},
gaG(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
gp(a){return Math.sqrt(this.gaG())},
gT(a){return isFinite(this.a)&&isFinite(this.b)&&isFinite(this.c)},
gci(){var s=this,r=Math.sqrt(s.gaG())
return r<1e-9?B.a_:new A.ao(s.a/r,s.b/r,s.c/r)},
R(a,b){if(b==null)return!1
return b instanceof A.ao&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gB(a){return A.cM(this.a,this.b,this.c,B.h,B.h,B.h)},
i(a){return"Vec3("+A.p(this.a)+", "+A.p(this.b)+", "+A.p(this.c)+")"}}
A.eL.prototype={
A(){return"_BloomBlurAxis."+this.b}}
A.cf.prototype={
gF(){return this.f},
J(a,b){B.a.j(a.a,new A.F(this.f,B.q,A.d([new A.l(this.x,B.d),new A.l(this.y,B.f)],t.C),!1))},
I(a){var s=this,r=s.a.N(new A.a3(s.e,s.b,s.c,B.m,B.ak,B.ah)),q=A.aF(s.d),p=t.n,o=s.r===B.aA?new Float32Array(A.x(A.d([1/s.Q,0],p))):new Float32Array(A.x(A.d([0,1/s.as],p)))
p=s.y
return A.d([new A.eM(new A.Z(s.f,A.d([new A.l(s.x,B.d),new A.l(p,B.f)],t.C),!1,!1,!1,!1),r,q,s.z,s.w,o,p.a)],t.u)},
$iC:1}
A.eM.prototype={
L(a){return},
$iy:1,
gm(){return this.a}}
A.dD.prototype={
gF(){return"bloomComposite"},
J(a,b){B.a.j(a.a,new A.F("bloomComposite",B.q,A.d([new A.l(this.f,B.d),new A.l(this.r,B.d),new A.l(this.w,B.f)],t.C),!1))},
I(a){var s=this,r="bloomComposite",q=s.a.N(new A.a3(r,s.b,s.c,B.m,B.bB,B.bt)),p=A.aF(s.d),o=s.w,n=A.d([new A.l(s.f,B.d),new A.l(s.r,B.d),new A.l(o,B.f)],t.C)
return A.d([new A.eN(new A.Z(r,n,!1,!1,!0,!1),q,p,s.e,o)],t.u)},
$iC:1}
A.eN.prototype={
L(a){return},
$iy:1,
gm(){return this.a}}
A.dL.prototype={
gF(){return"depthPrepass"},
J(a,b){B.a.j(a.a,new A.F("depthPrepass",B.b3,A.d([new A.l(this.w,B.f)],t.C),!1))},
I(a){var s=this,r="depthPrepass",q=s.a.N(new A.a3(r,s.b,s.c,B.aj,B.ai,B.bn))
return A.d([new A.eQ(new A.Z(r,A.d([new A.l(s.w,B.f)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f)],t.u)},
$iC:1}
A.eQ.prototype={
L(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=u.k,c=a0.b,b=a0.c,a=c.a
A.ax(a,a0.P("sceneDepth").b)
A.af(a,e.a.O())
A.c_(a,B.B,1,0,0,0)
A.bg(a,e.b.b)
A.e(a,"uVertexSnapGrid",new A.f(B.c,0))
A.e(a,"uAlbedo",B.t)
for(s=b.a,r=s.length,b=b.c.c.a,q=e.c,p=v.G,o=c.b,n=a.a,m=0;m<s.length;s.length===r||(0,A.B)(s),++m){l=s[m]
k=l.a
j=k.gm().ga2()
A.e(a,"uViewProjection",new A.f(B.l,new Float32Array(A.x(b))))
A.e(a,"uModel",new A.f(B.l,new Float32Array(A.x(j.ap().ga6()))))
A.iT(c,l,!1)
e.cW(c,k.gm().ga9(),0)
i=q.$1(k.gm().gS())
j=i.a
if(a.b!==B.e)A.k(A.j(d))
n.bindVertexArray(A.a0(j.a))
j=i.b
h=i.c
g=l.b.length
if(j){j=i.d
if(a.b!==B.e)A.k(A.j(d))
f=A.a(p.WebGL2RenderingContext.TRIANGLES)
n.drawElementsInstanced.apply(n,[f,h,j?A.a(p.WebGL2RenderingContext.UNSIGNED_INT):A.a(p.WebGL2RenderingContext.UNSIGNED_SHORT),0,g])
o.a7(h,g)}else{if(a.b!==B.e)A.k(A.j(d))
n.drawArraysInstanced(A.a(p.WebGL2RenderingContext.TRIANGLES),0,h,g)
o.a7(h,g)}}},
cW(a,b,c){var s,r=this.d.$1(b),q=a.a
A.a_(q,0,t.j.a(this.e.$1(r.gbT())))
r.gbU()
A.e(q,"uAlphaCutoff",new A.f(B.c,0))
A.e(q,"uAffineWarpStrength",new A.f(B.c,r.gdi()?c:0))
s=this.a.O()
A.af(q,r.gbZ()?s.bf(!1):s)},
$iy:1,
gm(){return this.a}}
A.eR.prototype={
A(){return"_DofBlurAxis."+this.b}}
A.co.prototype={
gF(){return this.f},
J(a,b){B.a.j(a.a,new A.F(this.f,B.q,A.d([new A.l(this.w,B.d),new A.l(this.x,B.f)],t.C),!1))},
I(a){var s=this,r=s.a.N(new A.a3(s.e,s.b,s.c,B.m,B.ak,B.ah)),q=A.aF(s.d),p=t.n,o=s.r===B.aB?new Float32Array(A.x(A.d([1/s.z,0],p))):new Float32Array(A.x(A.d([0,1/s.Q],p)))
p=s.x
return A.d([new A.eS(new A.Z(s.f,A.d([new A.l(s.w,B.d),new A.l(p,B.f)],t.C),!1,!1,!1,!1),r,q,s.y,o,p.a)],t.u)},
$iC:1}
A.eS.prototype={
L(a){return},
$iy:1,
gm(){return this.a}}
A.dN.prototype={
gF(){return"dofComposite"},
J(a,b){var s=this
B.a.j(a.a,new A.F("dofComposite",B.q,A.d([new A.l(s.z,B.d),new A.l(s.Q,B.d),new A.l(s.as,B.d),new A.l(s.at,B.f)],t.C),!1))},
I(a){var s=this,r="dofComposite",q=s.a.N(new A.a3(r,s.b,s.c,B.m,B.bA,B.bm)),p=A.aF(s.d)
return A.d([new A.eT(new A.Z(r,A.d([new A.l(s.z,B.d),new A.l(s.Q,B.d),new A.l(s.as,B.d),new A.l(s.at,B.f)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,5,2.8)],t.u)},
$iC:1}
A.eT.prototype={
L(a){var s,r=this,q=a.P("dofOutput"),p=a.b,o=r.r.$0(),n=p.a
A.ax(n,q.b)
A.af(n,r.a.O())
A.bg(n,r.b.b)
s=t.j
A.a_(n,0,s.a(r.d.$0()))
A.e(n,"uSharp",B.t)
A.a_(n,1,s.a(r.e.$0()))
A.e(n,"uBlurred",B.A)
A.a_(n,2,s.a(r.f.$0()))
A.e(n,"uSceneDepth",B.az)
A.e(n,"uNear",new A.f(B.c,o.f))
A.e(n,"uFar",new A.f(B.c,o.r))
A.e(n,"uFocusDistance",new A.f(B.c,r.w))
A.e(n,"uFocusRange",new A.f(B.c,r.x))
A.e(n,"uStrength",new A.f(B.c,0))
A.ay(n,r.c)
p.a0(3,0)},
$iy:1,
gm(){return this.a}}
A.dU.prototype={
gF(){return"grade"},
J(a,b){B.a.j(a.a,new A.F("grade",B.q,A.d([new A.l(this.r,B.d),new A.l(this.w,B.f)],t.C),!1))},
I(a){var s=this,r=s.a.N(new A.a3("grade",s.b,s.c,B.m,B.by,B.bu)),q=A.aF(s.d),p=s.r,o=s.w
return A.d([new A.eX(new A.Z("grade",A.d([new A.l(p,B.d),new A.l(o,B.f)],t.C),!1,!1,!1,!1),r,q,s.e,16,p,o)],t.u)},
$iC:1}
A.eX.prototype={
L(a){var s=this,r=a.P(s.f.a),q=a.b,p=q.a
A.ax(p,a.P(s.r.a).b)
A.af(p,s.a.O())
A.bg(p,s.b.b)
A.a_(p,0,r.b)
A.e(p,"uScene",B.t)
A.a_(p,1,t.j.a(s.d.$0()))
A.e(p,"uLut",B.A)
A.e(p,"uLutSize",new A.f(B.c,s.e))
A.e(p,"uStrength",new A.f(B.c,0))
A.ay(p,s.c)
q.a0(3,0)},
$iy:1,
gm(){return this.a}}
A.cE.prototype={
gF(){return"msaaResolve"},
J(a,b){B.a.j(a.a,new A.F("msaaResolve",B.b4,A.d([new A.l(this.b,B.d),new A.l(this.c,B.f)],t.C),!0))},
I(a){var s=this.b,r=this.c
return A.d([new A.eZ(new A.Z("msaaResolve",A.d([new A.l(s,B.d),new A.l(r,B.f)],t.C),!1,!1,!1,!1),this.a,s,r)],t.u)},
$iC:1}
A.eZ.prototype={
L(a){var s,r,q,p,o,n,m,l="blitFramebuffer",k=a.be(this.c),j=a.be(this.d),i=this.b
if(i.b!==B.e)A.k(A.j(u.k))
s=t.V
r=s.a(k.b.a)
q=s.a(j.b.a)
s=r.y
if(s<=1)A.k(A.r("WebGl2Device.resolveTarget: source must be multisampled (samples > 1), got "+s,null))
s=q.y
if(s>1)A.k(A.r("WebGl2Device.resolveTarget: destination must be single-sample, got samples="+s,null))
s=r.w
p=q.w
if(s!==p||r.x!==q.x)A.k(A.r("WebGl2Device.resolveTarget: source ("+s+"x"+r.x+") and destination ("+p+"x"+q.x+") must match",null))
o=r.r!=null||r.f!=null
n=q.r!=null||q.f!=null
i=i.a
m=v.G
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.READ_FRAMEBUFFER),r.a)
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),q.a)
if(r.c!=null||r.b!=null){if(o){i.readBuffer(A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0))
i.drawBuffers(A.d([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.NONE)],t.n))}A.a6(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(o&&n){i.readBuffer(A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1))
i.drawBuffers(A.d([A.a(m.WebGL2RenderingContext.NONE),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
A.a6(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.COLOR_BUFFER_BIT),A.a(m.WebGL2RenderingContext.LINEAR)],t.H)}if(r.d!=null||r.e!=null)A.a6(i,l,[0,0,s,r.x,0,0,p,q.x,A.a(m.WebGL2RenderingContext.DEPTH_BUFFER_BIT),A.a(m.WebGL2RenderingContext.NEAREST)],t.H)
if(n)i.drawBuffers(A.d([A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT0),A.a(m.WebGL2RenderingContext.COLOR_ATTACHMENT1)],t.n))
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.READ_FRAMEBUFFER),null)
i.bindFramebuffer(A.a(m.WebGL2RenderingContext.DRAW_FRAMEBUFFER),null)},
$iy:1,
gm(){return this.a}}
A.bJ.prototype={}
A.dE.prototype={
P(a){var s=this.a.n(0,a)
if(s==null)throw A.b(A.j('BoundPassContext: no view declared for "'+a+'" \u2014 a pass may only access resources it named in its own PassDescriptor.uses'))
return s},
be(a){var s=a.a,r=this.a.n(0,s+"#"+a.f)
if(r!=null)return r
return this.P(s)},
$imc:1}
A.ja.prototype={}
A.cN.prototype={
gF(){return"present"},
J(a,b){B.a.j(a.a,new A.F("present",B.b5,A.d([new A.l(this.f,B.d)],t.C),!1))},
I(a){var s=this,r=s.a.N(new A.a3("present",s.b,s.c,B.m,B.bH,B.bo)),q=A.aF(s.d),p=s.f
return A.d([new A.f1(new A.Z("present",A.d([new A.l(p,B.d)],t.C),!1,!1,!1,!1),r,q,p,s.r)],t.u)},
$iC:1}
A.f1.prototype={
L(a){var s=this,r=a.be(s.d),q=a.b,p=q.a
A.ax(p,null)
A.af(p,s.a.O())
A.bg(p,s.b.b)
A.ay(p,s.c)
A.a_(p,0,r.b)
A.e(p,"uExposure",new A.f(B.c,1))
A.e(p,"uVignette",new A.f(B.c,0))
A.e(p,"uGrain",new A.f(B.c,0))
A.e(p,"uRainIntensity",new A.f(B.c,0))
A.e(p,"uRainWindowVisibility",new A.f(B.c,1))
A.e(p,"uOutputEncoding",new A.f(B.c,s.e===B.C?1:0))
A.e(p,"uToneMap",B.ay)
q.a0(3,0)},
$iy:1,
gm(){return this.a}}
A.eg.prototype={
gF(){return"ps1Quantize"},
J(a,b){B.a.j(a.a,new A.F("ps1Quantize",B.q,A.d([new A.l(this.e,B.d),new A.l(this.f,B.f)],t.C),!1))},
I(a){var s=this,r="ps1Quantize",q=s.a.N(new A.a3(r,s.b,s.c,B.m,B.bD,B.bk)),p=A.aF(s.d),o=s.e,n=s.f
return A.d([new A.f2(new A.Z(r,A.d([new A.l(o,B.d),new A.l(n,B.f)],t.C),!1,!1,!1,!1),q,p,o,n)],t.u)},
$iC:1}
A.f2.prototype={
L(a){var s=this,r=a.P(s.d.a),q=a.b,p=q.a
A.ax(p,a.P(s.e.a).b)
A.af(p,s.a.O())
A.bg(p,s.b.b)
A.a_(p,0,r.b)
A.e(p,"uScene",B.t)
A.e(p,"uQuantizationBits",new A.f(B.c,8))
A.e(p,"uDitherStrength",new A.f(B.c,0))
A.ay(p,s.c)
q.a0(3,0)},
$iy:1,
gm(){return this.a}}
A.bt.prototype={}
A.ep.prototype={
gF(){return"shadow"},
J(a,b){B.a.j(a.a,new A.F("shadowCaster",B.b2,A.d([new A.l(this.z,B.f)],t.C),!1))},
I(a){var s=this,r="shadowCaster",q=s.a.N(new A.a3(r,s.b,s.c,B.aj,B.ai,B.bs))
return A.d([new A.f5(new A.Z(r,A.d([new A.l(s.z,B.f)],t.C),!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y)],t.u)},
$iC:1}
A.f5.prototype={
L(a){var s,r,q,p,o=this,n=a.P("shadowMap"),m=a.b,l=o.f.$0()
if(l==null){s=m.a
A.ax(s,n.b)
A.af(s,o.a.O())
A.c_(s,B.B,1,0,0,0)
return}r=A.k9(l)
o.x.$1(r)
s=m.a
A.ax(s,n.b)
A.af(s,o.a.O())
A.c_(s,B.B,1,0,0,0)
A.bg(s,o.b.b)
A.e(s,"uAlbedo",B.t)
for(s=a.c.a,q=s.length,p=0;p<s.length;s.length===q||(0,A.B)(s),++p)o.cY(m,s[p],l,r)},
bK(a,b){var s,r=this.d.$1(b),q=a.a
A.a_(q,0,t.j.a(this.e.$1(r.gbT())))
r.gbU()
A.e(q,"uAlphaCutoff",new A.f(B.c,0))
s=this.a.O()
A.af(q,r.gbZ()?s.bf(!1):s)},
cY(a,b,c,d){var s,r,q,p,o,n,m=this
if(t.Y.b(b)){if(!b.gm().gdt())return
s=a.a
A.e(s,"uUseInstances",B.Y)
m.bG(a,b.gm().ga2(),d)
m.bK(a,b.gm().ga9())
r=b.gm().gS()
q=m.c.$1(r)
A.ay(s,q.a)
s=q.b
p=q.c
if(s)a.b3(p,q.d,0)
else a.a0(p,0)}else if(b instanceof A.b9){o=b.a
if(!o.gm().gdt())return
if(m.de(b,c)===B.cp)return
m.bG(a,o.gm().ga2(),d)
A.iT(a,b,!1)
m.bK(a,o.gm().ga9())
r=o.gm().gS()
q=m.c.$1(r)
A.ay(a.a,q.a)
s=q.b
p=q.c
n=b.b.length
if(s)a.b4(p,q.d,n,0)
else a.b2(p,0,n)}else throw A.b(A.r("ShadowFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dy(b).i(0),null))},
de(a,b){return B.co},
bG(a,b,c){var s=a.a
A.e(s,"uModel",new A.f(B.l,new Float32Array(A.x(b.ap().ga6()))))
A.e(s,"uLightViewProjection",new A.f(B.l,new Float32Array(A.x(c.a.a))))},
$iy:1,
gm(){return this.a}}
A.iA.prototype={
$1(a){return this.a.a=a},
$S:50}
A.iB.prototype={
$0(){var s=this.a.a
return s==null?this.b:s},
$S:51}
A.eq.prototype={
gF(){return"shadowedWorld"},
J(a,b){var s=this,r=A.d([new A.l(s.db,B.d)],t.C)
if(s.ay)r.push(new A.l(s.dx,B.d))
r.push(new A.l(s.dy,B.f))
B.a.j(a.a,new A.F("shadowedWorld",B.ac,r,!1))},
I(a){var s=this,r="shadowedWorld",q=s.a.N(new A.a3(r,s.b,s.c,B.bF,B.bz,B.bi)),p=A.d([new A.l(s.db,B.d)],t.C)
if(s.ay)p.push(new A.l(s.dx,B.d))
p.push(new A.l(s.dy,B.f))
return A.d([new A.f6(new A.Z(r,p,!0,!0,!1,!0),q,s.d,s.e,s.f,s.r,s.w,s.x,s.y,s.z,s.Q,s.as,s.at,s.ax,s.ch,s.CW,s.cx,s.cy)],t.u)},
$iC:1}
A.f6.prototype={
L(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b=null,a=a5.P("sceneColor"),a0=a5.b,a1=a5.c,a2=a1.c,a3=c.z.$0(),a4=a0.a
A.ax(a4,a.b)
A.af(a4,c.a.O())
A.c_(a4,B.a6,1,0.04,0.03,0.03)
A.bg(a4,c.b.b)
A.e(a4,"uAlbedo",B.t)
A.e(a4,"uNormalMap",B.cF)
A.e(a4,"uOrmMap",B.cG)
A.e(a4,"uEmissiveMap",B.cH)
A.e(a4,"uLightmap",B.cI)
s=t.j
A.a_(a4,1,s.a(c.y.$0()))
A.e(a4,"uShadowMap",B.A)
r=a2.d
q=t.n
A.e(a4,"uCameraPosition",new A.f(B.j,new Float32Array(A.x(A.d([r.a,r.b,r.c],q)))))
A.e(a4,"uShadowMapTexelSize",new A.f(B.aw,new Float32Array(A.x(A.d([1/c.ch,1/c.CW],q)))))
A.a_(a4,2,s.a(c.at.$0()))
A.e(a4,"uSsao",B.az)
A.e(a4,"uVertexSnapGrid",new A.f(B.c,0))
A.e(a4,"uSceneColorSize",new A.f(B.aw,new Float32Array(A.x(A.d([c.ax,c.ay],q)))))
A.e(a4,"uViewProjection",new A.f(B.l,new Float32Array(A.x(a2.c.a))))
A.e(a4,"uView",new A.f(B.l,new Float32Array(A.x(a2.a.a))))
A.e(a4,"uLightViewProjection",new A.f(B.l,new Float32Array(A.x(a3.a.a))))
A.e(a4,"uFogColor",new A.f(B.j,new Float32Array(A.x(A.d([0,0,0],q)))))
A.e(a4,"uFogStart",new A.f(B.c,0))
A.e(a4,"uFogEnd",new A.f(B.c,1))
A.e(a4,"uFogHeightFalloff",new A.f(B.c,0))
A.e(a4,"uFogDensity",new A.f(B.c,0))
p=c.Q.$0()
s=A.d([],t.w)
r=c.as.$0()
r=J.X(r==null?B.I:r)
o=p==null
while(r.k()){n=r.gl()
if(-1!==(o?b:-1))s.push(n)}m=o?b:B.p
if(m==null)m=B.p
l=o?b:B.u
if(l==null)l=B.u
A.e(a4,"uLightPosition",new A.f(B.j,new Float32Array(A.x(A.d([m.a,m.b,m.c],q)))))
A.e(a4,"uLightDirection",new A.f(B.j,new Float32Array(A.x(A.d([l.a,l.b,l.c],q)))))
k=o?b:B.H
if(k==null)k=B.G
A.e(a4,"uLightColor",new A.f(B.j,new Float32Array(A.x(A.d([k.a,k.b,k.c],q)))))
r=o?b:1
A.e(a4,"uLightIntensity",new A.f(B.c,r==null?0:r))
A.e(a4,"uSpotEnabled",new A.f(B.c,!o?1:0))
A.e(a4,"uDirectionalDirection",new A.f(B.j,new Float32Array(A.x(A.d([0,1,0],q)))))
A.e(a4,"uDirectionalColor",new A.f(B.j,new Float32Array(A.x(A.d([0,0,0],q)))))
A.e(a4,"uDirectionalIntensity",new A.f(B.c,0))
for(j=0;j<4;++j){r=""+j
A.e(a4,"uPointPosition"+r,new A.f(B.j,new Float32Array(A.x(A.d([0,0,0],q)))))
A.e(a4,"uPointColor"+r,new A.f(B.j,new Float32Array(A.x(A.d([0,0,0],q)))))
A.e(a4,"uPointIntensity"+r,new A.f(B.c,0))
A.e(a4,"uPointRadius"+r,new A.f(B.c,1))}for(j=0;j<3;++j){r=s.length
if(j<r){if(!(j<r))return A.h(s,j)
i=s[j]}else i=b
r=i==null
h=r?b:B.p
if(h==null)h=B.a_
g=r?b:B.u
if(g==null)g=B.u
f=r?b:B.H
if(f==null)f=B.G
n=""+j
A.e(a4,"uDirectSpotPosition"+n,new A.f(B.j,new Float32Array(A.x(A.d([h.a,h.b,h.c],q)))))
A.e(a4,"uDirectSpotDirection"+n,new A.f(B.j,new Float32Array(A.x(A.d([g.a,g.b,g.c],q)))))
A.e(a4,"uDirectSpotColor"+n,new A.f(B.j,new Float32Array(A.x(A.d([f.a,f.b,f.c],q)))))
e=r?b:1
if(e==null)e=0
A.e(a4,"uDirectSpotIntensity"+n,new A.f(B.c,e))
e=r?b:1
if(e==null)e=1
A.e(a4,"uDirectSpotRange"+n,new A.f(B.c,e))
e=r?b:0.3
if(e==null)e=0.3
A.e(a4,"uDirectSpotInnerCos"+n,new A.f(B.c,Math.cos(e)))
e=r?b:0.5
if(e==null)e=0.5
A.e(a4,"uDirectSpotOuterCos"+n,new A.f(B.c,Math.cos(e)))
r=r?0:1
A.e(a4,"uDirectSpotEnabled"+n,new A.f(B.c,r))}s=o?b:1
A.e(a4,"uLightRange",new A.f(B.c,s==null?1:s))
s=o?b:0.3
if(s==null)s=0.3
A.e(a4,"uLightInnerCos",new A.f(B.c,Math.cos(s)))
s=o?b:0.5
if(s==null)s=0.5
A.e(a4,"uLightOuterCos",new A.f(B.c,Math.cos(s)))
A.e(a4,"uAmbientColor",new A.f(B.j,new Float32Array(A.x(A.d([1,1,1],q)))))
A.e(a4,"uAmbientIntensity",new A.f(B.c,0))
A.e(a4,"uRainWetness",new A.f(B.c,0))
for(a4=a1.a,s=a4.length,d=0;d<a4.length;a4.length===s||(0,A.B)(a4),++d)c.bL(a0,a4[d],0)
for(a1=a1.b,a4=a1.length,d=0;d<a1.length;a1.length===a4||(0,A.B)(a1),++d)c.bL(a0,a1[d],0)},
bL(a,b,c){var s,r,q,p,o,n=this
if(t.Y.b(b)){s=a.a
A.e(s,"uUseInstances",B.Y)
n.bM(a,b.gm().ga2())
n.bH(a,b.gm().ga9(),b.gm().gc_(),b.gm().gdq(),c,b.gm().gcm())
r=n.c.$1(b.gm().gS())
A.ay(s,r.a)
s=r.b
q=r.c
if(s)a.b3(q,r.d,0)
else a.a0(q,0)}else if(b instanceof A.b9){p=b.a
n.bM(a,p.gm().ga2())
A.iT(a,b,!0)
n.bH(a,p.gm().ga9(),p.gm().gc_(),p.gm().gdq(),c,p.gm().gcm())
r=n.c.$1(p.gm().gS())
A.ay(a.a,r.a)
s=r.b
q=r.c
o=b.b.length
if(s)a.b4(q,r.d,o,0)
else a.b2(q,0,o)}else throw A.b(A.r("ShadowedWorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dy(b).i(0),null))},
bH(a,b,c,d,e,f){var s=this,r=s.d.$1(b),q=t.j,p=a.a
A.a_(p,0,q.a(s.e.$1(r.gbT())))
A.a_(p,3,q.a(s.f.$1(r.gex())))
A.a_(p,4,q.a(s.r.$1(r.gez())))
A.a_(p,5,q.a(s.w.$1(r.gek())))
A.a_(p,6,q.a(s.x.$1(r.ger())))
r.gbU()
A.e(p,"uAlphaCutoff",new A.f(B.c,0))
A.e(p,"uOpaqueCoverage",new A.f(B.c,1))
A.e(p,"uAffineWarpStrength",new A.f(B.c,r.gdi()?e:0))
q=t.n
A.e(p,"uMaterialTint",new A.f(B.j,new Float32Array(A.x(A.d([r.geD(),r.geC(),r.geB()],q)))))
A.e(p,"uEmissiveStrength",new A.f(B.c,r.gej()))
A.e(p,"uUvScaleOffset",new A.f(B.cE,new Float32Array(A.x(A.d([r.geH(),r.geI(),r.geF(),r.geG()],q)))))
A.e(p,"uNormalStrength",new A.f(B.c,r.gew()))
A.e(p,"uRoughness",new A.f(B.c,r.geA()))
A.e(p,"uMetallic",new A.f(B.c,r.geu()))
A.e(p,"uClearcoatStrength",new A.f(B.c,r.geh()))
A.e(p,"uClearcoatRoughness",new A.f(B.c,r.geg()))
A.e(p,"uOcclusionStrength",new A.f(B.c,r.gey()))
A.e(p,"uLightmapIntensity",new A.f(B.c,r.geq()))
A.e(p,"uReceivesShadow",new A.f(B.c,r.gcm()&&f?1:0))
A.af(p,r.gbZ()?null.bf(!1):null)},
bM(a,b){var s=b.ap(),r=a.a
A.e(r,"uModel",new A.f(B.l,new Float32Array(A.x(s.ga6()))))
A.e(r,"uNormalMatrix",new A.f(B.l,new Float32Array(A.x(s.cg().ga6()))))},
$iy:1,
gm(){return this.a}}
A.es.prototype={
gF(){return"ssaoOcclusion"},
J(a,b){B.a.j(a.a,new A.F("ssaoOcclusion",B.ab,A.d([new A.l(this.w,B.f)],t.C),!1))},
I(a){var s=this,r="ssaoOcclusion",q=s.a.N(new A.a3(r,s.b,s.c,B.m,B.bC,B.bj)),p=A.aF(s.d)
return A.d([new A.f9(new A.Z(r,A.d([new A.l(s.w,B.f)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,0.4)],t.u)},
$iC:1}
A.f9.prototype={
L(a){var s=a.b.a
A.ax(s,a.P("ssaoRaw").b)
A.af(s,this.a.O())
A.c_(s,B.a5,1,1,1,1)
return},
$iy:1,
gm(){return this.a}}
A.er.prototype={
gF(){return"ssaoBlur"},
J(a,b){B.a.j(a.a,new A.F("ssaoBlur",B.ab,A.d([new A.l(this.y,B.d),new A.l(this.z,B.f)],t.C),!1))},
I(a){var s=this,r="ssaoBlur",q=s.a.N(new A.a3(r,s.b,s.c,B.m,B.bw,B.bv)),p=A.aF(s.d)
return A.d([new A.f8(new A.Z(r,A.d([new A.l(s.y,B.d),new A.l(s.z,B.f)],t.C),!1,!1,!1,!1),q,p,s.e,s.f,s.r,s.w,s.x)],t.u)},
$iC:1}
A.f8.prototype={
L(a){var s=a.b.a
A.ax(s,a.P("ssaoBlurred").b)
A.af(s,this.a.O())
A.c_(s,B.a5,1,1,1,1)
return},
$iy:1,
gm(){return this.a}}
A.eF.prototype={
gF(){return"vhs"},
J(a,b){var s=this.w
a.b.j(0,s.a)
B.a.j(a.a,new A.F("vhs",B.q,A.d([new A.l(this.r,B.d),new A.l(s,B.o),new A.l(s,B.f)],t.C),!1))},
I(a){var s=this,r=s.a.N(new A.a3("vhs",s.b,s.c,B.m,B.bx,B.bl)),q=A.aF(s.d),p=s.r,o=s.w
return A.d([new A.fd(new A.Z("vhs",A.d([new A.l(p,B.d),new A.l(o,B.o),new A.l(o,B.f)],t.C),!1,!1,!1,!1),r,q,s.e,s.f,p,o)],t.u)},
$iC:1}
A.fd.prototype={
L(a){var s=this,r=a.P(s.f.a),q=a.P(s.r.a),p=a.b,o=p.a
A.ax(o,q.b)
A.af(o,s.a.O())
A.bg(o,s.b.b)
A.a_(o,0,r.b)
A.e(o,"uScene",B.t)
A.a_(o,1,t.j.a(s.d.$0()))
A.e(o,"uHistory",B.A)
A.e(o,"uTime",new A.f(B.c,s.e.$0()))
A.e(o,"uChromaWeight",new A.f(B.c,0))
A.e(o,"uTrackingWeight",new A.f(B.c,0))
A.e(o,"uNoiseWeight",new A.f(B.c,0))
A.e(o,"uHeadSwitchWeight",new A.f(B.c,0))
A.e(o,"uDropoutWeight",new A.f(B.c,0))
A.e(o,"uGhostWeight",new A.f(B.c,0))
A.ay(o,s.c)
p.a0(3,0)},
$iy:1,
gm(){return this.a}}
A.cQ.prototype={}
A.eI.prototype={
gF(){return"world"},
J(a,b){B.a.j(a.a,new A.F("worldOpaqueTransparent",B.ac,A.d([new A.l(this.e,B.f)],t.C),!1))},
I(a){var s=this,r=s.a.N(new A.a3("safeWorld",s.b,s.c,B.bG,B.m,B.bh)),q=s.e
return A.d([new A.fg(new A.Z("worldOpaqueTransparent",A.d([new A.l(q,B.f)],t.C),!0,!0,!1,!0),r,s.d,q.a)],t.u)},
$iC:1}
A.fg.prototype={
L(a){var s,r,q=this,p=a.b,o=a.c,n=p.a
A.ax(n,a.P(q.d).b)
A.af(n,q.a.O())
A.c_(n,B.a6,1,0.04,0.03,0.03)
A.bg(n,q.b.b)
A.e(n,"uViewProjection",new A.f(B.l,new Float32Array(A.x(o.c.c.a))))
s=t.n
A.e(n,"uLightDir",new A.f(B.j,new Float32Array(A.x(A.d([0,1,0],s)))))
A.e(n,"uAmbientColor",new A.f(B.j,new Float32Array(A.x(A.d([1,1,1],s)))))
A.e(n,"uAmbientIntensity",new A.f(B.c,0))
for(n=o.a,s=n.length,r=0;r<n.length;n.length===s||(0,A.B)(n),++r)q.by(p,n[r])
for(o=o.b,n=o.length,r=0;r<o.length;o.length===n||(0,A.B)(o),++r)q.by(p,o[r])},
by(a,b){var s,r,q,p,o,n=this
if(b instanceof A.b9){s=b.a
n.bI(a,s.gm().ga2())
A.iT(a,b,!0)
r=n.c.$1(s.gm().gS())
A.ay(a.a,r.a)
q=r.b
p=r.c
o=b.b.length
if(q)a.b4(p,r.d,o,0)
else a.b2(p,0,o)}else if(t.Y.b(b)){q=a.a
A.e(q,"uUseInstances",B.Y)
n.bI(a,b.gm().ga2())
r=n.c.$1(b.gm().gS())
A.ay(q,r.a)
q=r.b
p=r.c
if(q)a.b3(p,r.d,0)
else a.a0(p,0)}else throw A.b(A.r("WorldFeature: frameScene entries must be InstanceBatch or RetainedItemView, got "+J.dy(b).i(0),null))},
bI(a,b){var s=b.ap(),r=a.a
A.e(r,"uModel",new A.f(B.l,new Float32Array(A.x(s.ga6()))))
A.e(r,"uNormalMatrix",new A.f(B.l,new Float32Array(A.x(s.cg().ga6()))))},
$iy:1,
gm(){return this.a}}
A.fJ.prototype={
A(){return"GpuBufferUsage."+this.b}}
A.dS.prototype={
A(){return"GpuBufferKind."+this.b}}
A.fO.prototype={
A(){return"GpuTextureFilter."+this.b}}
A.fP.prototype={
A(){return"GpuTextureWrap."+this.b}}
A.fI.prototype={}
A.fN.prototype={}
A.bM.prototype={
A(){return"GpuTargetAttachment."+this.b}}
A.cs.prototype={}
A.dT.prototype={
A(){return"GpuDeviceStatus."+this.b}}
A.bX.prototype={
A(){return"ShaderCompileStage."+this.b}}
A.cU.prototype={
i(a){return"ShaderCompileException("+this.a.b+": "+this.b+")"}}
A.b0.prototype={
A(){return"UniformType."+this.b}}
A.f.prototype={}
A.cj.prototype={
A(){return"ClearMask."+this.b}}
A.dM.prototype={
a0(a,b){var s=this.a
if(s.b!==B.e)A.k(A.j(u.k))
s.a.drawArrays(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a)
this.b.a7(a,1)},
b2(a,b,c){var s=this.a
if(s.b!==B.e)A.k(A.j(u.k))
s.a.drawArraysInstanced(A.a(v.G.WebGL2RenderingContext.TRIANGLES),b,a,c)
this.b.a7(a,c)},
b3(a,b,c){var s,r,q=this.a
if(q.b!==B.e)A.k(A.j(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
q.a.drawElements(r,a,s,c)
this.b.a7(a,1)},
b4(a,b,c,d){var s,r,q=this.a
if(q.b!==B.e)A.k(A.j(u.k))
s=v.G
r=A.a(s.WebGL2RenderingContext.TRIANGLES)
s=b?A.a(s.WebGL2RenderingContext.UNSIGNED_INT):A.a(s.WebGL2RenderingContext.UNSIGNED_SHORT)
A.a6(q.a,"drawElementsInstanced",[r,a,s,d,c],t.H)
this.b.a7(a,c)},
$ilI:1}
A.ed.prototype={
cj(a){var s=this.b.n(0,a)
if(s==null)throw A.b(A.j("resource is not in candidate: "+a))
return s}}
A.fK.prototype={
gl(){var s=this.c
if(s==null)throw A.b(A.j("GPU resource adapter is not initialized"))
return s},
a5(){var s,r=this
if(r.e)return
s=r.c
if(s!=null)r.cU(s.b)
r.b.a5()
r.c=null
r.e=!0},
bw(a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=t.N,a1=t.j,a2=A.as(a0,a1),a3=A.d([],t.a4)
try{k=a4.a
j=k.$ti
i=j.h("A(1)")
j=j.h("a5<1>")
s=new A.a5(k,i.a(new A.fL()),j)
for(h=s,g=J.X(h.a),h=new A.G(g,h.b,h.$ti.h("G<1>")),f=a.a;h.k();){r=g.gl()
q=A.kq(f,a.bx(r,a5))
J.jJ(a3,q)
J.dx(a2,r,q)}e=A.an(new A.a5(k,i.a(new A.fM()),j),j.h("i.E"))
B.a.cv(e)
p=e
for(k=p,j=k.length,i=a5.d===1,d=0;d<k.length;k.length===j||(0,A.B)(k),++d){o=k[d]
n=A.l9(J.lx(o,11))
if(i){h=J.iY(a2,"sceneColor")
h.toString
J.dx(a2,o,h)}else{h=n
if(typeof h!=="number")return h.cs()
if(h>=2){h=J.iY(a2,"sceneColor#1")
h.toString
J.dx(a2,o,h)}else{m=A.kq(f,a.bx(o,a5))
J.jJ(a3,m)
J.dx(a2,o,m)}}}a0=A.jQ(a2,a0,a1)
return a0}catch(c){for(a0=a3,k=A.O(a0).h("cS<1>"),a0=new A.cS(a0,k),a0=new A.at(a0,a0.gp(0),k.h("at<V.E>")),j=a.a,i=t.V,k=k.h("V.E");a0.k();){h=a0.d
l=h==null?k.a(h):h
b=i.a(a1.a(l).a)
A.jc(j,b.a,b.b,b.c,b.d,b.e,b.f,b.r)}throw c}},
bx(a,b){var s,r,q,p,o,n=b.b,m=b.c
if(a==="shadowMap")return new A.cs(512,512,1,B.D,!0)
if(a==="sceneDepth")return new A.cs(n,m,1,B.D,!0)
s=B.b.E(a,"ssao")||B.b.E(a,"bloomBlur")||B.b.E(a,"dofBlur")
r=s?(n+1)/2|0:n
q=s?(m+1)/2|0:m
p=a==="sceneColor"
o=p||B.b.E(a,"sceneColor#")
p=p?b.d:1
return new A.cs(r,q,p,o?B.a8:B.b0,o)},
cU(a){var s,r,q,p,o,n=A.j5(t.bS.a(a).gad(),t.j)
for(n=A.jg(n,n.r,A.q(n).c),s=this.a,r=t.V,q=n.$ti.c;n.k();){p=n.d
o=r.a((p==null?q.a(p):p).a)
A.jc(s,o.a,o.b,o.c,o.d,o.e,o.f,o.r)}}}
A.fL.prototype={
$1(a){return!B.b.E(A.aH(a),"sceneColor#")},
$S:6}
A.fM.prototype={
$1(a){return B.b.E(A.aH(a),"sceneColor#")},
$S:6}
A.aE.prototype={
a4(a){var s,r
this.$ti.c.a(a)
if(a.gU().bj(0,0)||a.gU().cs(0,0))A.k(A.bN(B.ae,a))
s=this.b
r=B.a.n(s,a.gU())
r.gaI()
a.gaI()
A.k(A.bN(B.af,a))
r.gaK()
r.gaK()
s=B.a.n(s,a.gU()).gdw()
return s},
bc(a){var s,r
this.$ti.c.a(a)
s=a.a
if(s<0||s>=0)throw A.b(A.bN(B.ae,a))
r=this.b
if(!(s>=0&&s<0))return A.h(r,s)
r[s].gaI()
s=A.bN(B.af,a)
throw A.b(s)},
a8(){return new A.aG(this.dO(),this.$ti.h("aG<+(1,2)>"))},
dO(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j
return function $async$a8(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.a,n=s.b,m=0
case 3:if(!!1){r=5
break}if(!(m<0)){A.h(n,m)
r=1
break}l=n[m]
l.gaK()
l.gaK()
k=o.$3(m,l.gaI(),l.gei())
j=l.gdw()
r=6
return a.b=new A.d9(k,j),1
case 6:case 4:++m
r=3
break
case 5:case 1:return 0
case 2:return a.c=p.at(-1),3}}}}}
A.fl.prototype={
A(){return"BlendEquation."+this.b}}
A.dC.prototype={
A(){return"BlendFactor."+this.b}}
A.fp.prototype={
A(){return"CullFace."+this.b}}
A.ft.prototype={
A(){return"DepthFunc."+this.b}}
A.fv.prototype={
bf(a){var s=this
return A.jS(s.f,s.d,s.r,s.e,!0,!0,!0,!0,!1,s.x,s.b,s.a,s.c,!0,!1,!1)}}
A.a4.prototype={
A(){return"StateField."+this.b}}
A.hE.prototype={
dB(a){var s,r=this.a
if(r==null)return A.lZ(B.br,t.d5)
s=A.aC(t.d5)
if(r.a!==a.a)s.j(0,B.Q)
if(r.b!==a.b)s.j(0,B.R)
if(r.c!==a.c)s.j(0,B.S)
if(r.d!==a.d)s.j(0,B.T)
if(r.e!==a.e||r.f!==a.f)s.j(0,B.U)
if(r.r!==a.r)s.j(0,B.V)
if(r.w!==a.w)s.j(0,B.W)
if(r.x!==a.x)s.j(0,B.X)
return s}}
A.b2.prototype={$iaO:1}
A.dn.prototype={}
A.dm.prototype={}
A.ff.prototype={}
A.eG.prototype={
cz(a){var s=this,r=A.a0(s.a.canvas)
s.c=A.ds(new A.hB(s))
s.d=A.ds(new A.hC(s))
r.addEventListener("webglcontextlost",s.c)
r.addEventListener("webglcontextrestored",s.d)},
ah(a){var s=A.c9(this.a.getParameter(a))
return typeof s=="number"?B.ag.e7(s):0},
bD(a){var s=A.c9(this.a.getParameter(a))
return typeof s=="number"?s:0/0},
$ilO:1}
A.hB.prototype={
$1(a){A.a0(a).preventDefault()
this.a.b=B.x},
$S:11}
A.hC.prototype={
$1(a){this.a.b=B.e},
$S:11}
A.ia.prototype={
dl(){var s,r=this
if(r.b!==B.e)A.k(A.j(u.k))
s=r.w?A.a1(r.a.createQuery()):null
if(s==null)return null
r.a.beginQuery(35007,s)
return new A.b2(new A.ff(s))},
bQ(a){var s=a.a
if(!(s instanceof A.ff))throw A.b(A.aL(a,"query","is not a GPU timer query"))
return s}}
A.fe.prototype={}
A.hD.prototype={
dz(a){var s=A.a1(a.getContext("webgl2"))
if(!t.m.b(s))return null
return new A.hn(A.mt(s),new A.fn(new A.fo(),new A.el()),new A.fE(A.d([],t.c4),B.aT),A.d([],t.cR),B.M,A.d([],t.cL),null)}}
A.iM.prototype={
$0(){var s,r,q=this.a,p=A.a(q.clientWidth)>0?A.a(q.clientWidth):A.a(q.width),o=A.a(q.clientHeight)>0?A.a(q.clientHeight):A.a(q.height)
if(J.aK(p,A.a(q.width))&&J.aK(o,A.a(q.height)))return
q.width=p
q.height=o
try{this.b.av()
new A.eu(p,o,p,o).M()
q.setAttribute("data-renderer-surface",A.p(p)+"x"+A.p(o))}catch(r){s=A.b5(r)
q.setAttribute("data-renderer-resize-error",A.p(s))}},
$S:0}
A.iK.prototype={
$1(a){A.a0(a)
return this.a.$0()},
$S:53}
A.iL.prototype={
$1(a){var s
A.a0(a)
s=this.a
s.c=!0;++s.b},
$S:54}
A.iN.prototype={
$1(a){var s,r,q,p,o,n=this
A.jo(a)
n.b.$0()
q=n.c
if(q.e!==B.z||n.a.c)try{p=n.a
s=new A.dR(n.d,B.a0,B.a3,++p.a,a/1000)
q.bV(n.e,s)
q.c0()
p.c=!1
n.f.removeAttribute("data-renderer-frame-error")}catch(o){r=A.b5(o)
n.f.setAttribute("data-renderer-frame-error",A.p(r))
if(q.e===B.z)++n.a.b}p=n.f
p.setAttribute("data-renderer-state",q.e.b)
p.setAttribute("data-renderer-frames",""+n.a.a)
A.a(A.a0(v.G.window).requestAnimationFrame(A.ds(n)))},
$S:55};(function aliases(){var s=J.bc.prototype
s.cw=s.i})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"nD","lU",56)
r(A,"o4","mE",4)
r(A,"o5","mF",4)
r(A,"o6","mG",4)
q(A,"l4","nZ",0)
p(A.e1.prototype,"gdW","dX",12)
var o
p(o=A.ex.prototype,"gdS","dT",3)
p(o,"ge_","e0",3)
p(o,"ge1","e2",3)
p(o,"gdU","dV",3)
p(o,"gdY","dZ",3)
q(A,"l5","mH",58)
q(A,"p4","j9",39)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.v,null)
q(A.v,[A.j2,J.dW,A.cT,J.ce,A.i,A.ch,A.D,A.w,A.hr,A.at,A.cD,A.G,A.a8,A.bv,A.bh,A.bQ,A.cl,A.bz,A.aY,A.hv,A.h3,A.cq,A.dc,A.b8,A.bq,A.fT,A.cB,A.aS,A.cA,A.av,A.eW,A.i4,A.i2,A.eJ,A.aA,A.al,A.eO,A.bw,A.N,A.eK,A.fa,A.dp,A.d1,A.eY,A.bA,A.d4,A.di,A.fc,A.bK,A.dJ,A.i6,A.bl,A.hJ,A.ea,A.cV,A.hK,A.aN,A.Q,A.S,A.fb,A.ab,A.dk,A.hx,A.f7,A.h2,A.hc,A.bU,A.fn,A.fo,A.h9,A.cg,A.fD,A.dR,A.aW,A.fQ,A.bP,A.ae,A.fs,A.h4,A.ha,A.el,A.eu,A.ej,A.L,A.fF,A.e1,A.eB,A.h_,A.ex,A.b9,A.dP,A.dQ,A.fE,A.fC,A.c2,A.F,A.a2,A.M,A.l,A.ck,A.hb,A.a3,A.hd,A.Z,A.hf,A.he,A.cP,A.hm,A.hL,A.i0,A.f0,A.eV,A.f4,A.f_,A.hW,A.ad,A.T,A.fr,A.fq,A.br,A.fG,A.bR,A.ao,A.cf,A.eM,A.dD,A.eN,A.dL,A.eQ,A.co,A.eS,A.dN,A.eT,A.dU,A.eX,A.cE,A.eZ,A.bJ,A.dE,A.ja,A.cN,A.f1,A.eg,A.f2,A.bt,A.ep,A.f5,A.eq,A.f6,A.es,A.f9,A.er,A.f8,A.eF,A.fd,A.cQ,A.eI,A.fg,A.fI,A.fN,A.cs,A.cU,A.f,A.dM,A.ed,A.fK,A.aE,A.fv,A.hE,A.b2,A.dn,A.dm,A.ff,A.fe,A.ia,A.hD])
q(J.dW,[J.dY,J.cv,J.cx,J.cw,J.cy,J.bO,J.ba])
q(J.cx,[J.bc,J.t,A.bS,A.cI])
q(J.bc,[J.ec,J.bu,J.bb])
r(J.dX,A.cT)
r(J.fS,J.t)
q(J.bO,[J.cu,J.dZ])
q(A.i,[A.c0,A.n,A.aU,A.a5,A.by,A.aG])
r(A.dq,A.c0)
r(A.d_,A.dq)
r(A.ci,A.d_)
q(A.D,[A.cz,A.aZ,A.e_,A.eA,A.em,A.eU,A.dz,A.aB,A.cY,A.ez,A.bY,A.dI])
r(A.bZ,A.w)
r(A.dH,A.bZ)
q(A.n,[A.V,A.bp,A.aT,A.aR,A.bx,A.d3])
q(A.V,[A.cW,A.aV,A.cS])
r(A.cp,A.aU)
r(A.bC,A.bh)
q(A.bC,[A.d9,A.da])
r(A.c3,A.bQ)
r(A.bf,A.c3)
r(A.cm,A.bf)
r(A.K,A.cl)
q(A.aY,[A.cn,A.db,A.dj])
r(A.aM,A.cn)
r(A.cL,A.aZ)
q(A.b8,[A.dF,A.dG,A.ew,A.iG,A.iI,A.hG,A.hF,A.ic,A.hU,A.hX,A.fV,A.iQ,A.iR,A.iC,A.h6,A.fY,A.h0,A.hs,A.hu,A.fz,A.fx,A.fy,A.h7,A.h8,A.hk,A.hj,A.hi,A.hh,A.hg,A.hl,A.iv,A.iw,A.ho,A.hp,A.iX,A.iV,A.fH,A.fX,A.iA,A.fL,A.fM,A.hB,A.hC,A.iK,A.iL,A.iN])
q(A.ew,[A.et,A.bI])
q(A.bq,[A.aQ,A.d0])
q(A.dG,[A.iH,A.id,A.iz,A.hV,A.fU,A.fW,A.hz,A.hy,A.iS,A.h1,A.ht,A.fA,A.hq,A.iW,A.iU])
q(A.cI,[A.e2,A.Y])
q(A.Y,[A.d5,A.d7])
r(A.d6,A.d5)
r(A.cG,A.d6)
r(A.d8,A.d7)
r(A.cH,A.d8)
q(A.cG,[A.cF,A.e3])
q(A.cH,[A.e4,A.e5,A.e6,A.e7,A.e8,A.cJ,A.cK])
r(A.dd,A.eU)
q(A.dF,[A.hH,A.hI,A.i3,A.hM,A.hQ,A.hP,A.hO,A.hN,A.hT,A.hS,A.hR,A.i_,A.iy,A.i8,A.i7,A.iu,A.im,A.io,A.it,A.ih,A.ij,A.ii,A.is,A.ie,A.ig,A.ip,A.iq,A.ir,A.il,A.ik,A.ix,A.iB,A.iM])
r(A.cZ,A.eO)
r(A.f3,A.dp)
r(A.d2,A.d0)
r(A.az,A.db)
r(A.cX,A.dj)
q(A.bK,[A.dB,A.dO])
q(A.dJ,[A.fk,A.hA])
r(A.eE,A.dO)
q(A.aB,[A.cO,A.dV])
r(A.eP,A.dk)
q(A.hJ,[A.bV,A.ct,A.aw,A.fm,A.fu,A.bW,A.bL,A.ar,A.ek,A.aP,A.cR,A.eo,A.cr,A.eL,A.eR,A.fJ,A.dS,A.fO,A.fP,A.bM,A.dT,A.bX,A.b0,A.cj,A.fl,A.dC,A.fp,A.ft,A.a4])
q(A.aW,[A.ah,A.ai,A.aD,A.eb,A.bo])
r(A.hn,A.f4)
r(A.eG,A.fe)
s(A.bZ,A.bv)
s(A.dq,A.w)
s(A.d5,A.w)
s(A.d6,A.a8)
s(A.d7,A.w)
s(A.d8,A.a8)
s(A.c3,A.di)
s(A.dj,A.fc)
s(A.f4,A.hW)
s(A.fe,A.ia)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{c:"int",o:"double",a7:"num",m:"String",A:"bool",S:"Null",u:"List",v:"Object",W:"Map",E:"JSObject"},mangledNames:{},types:["~()","aO()","A(F)","aO(ai?)","~(~())","~(@)","A(m)","A(l)","S(@)","S()","@()","S(v?)","j8(aD)","@(@,m)","W<m,m>(W<m,m>,m)","0&(m,c?)","v?(v?)","c(+influence,light(o,ae),+influence,light(o,ae))","S(~())","@(@)","aD(c,c,m?)","ah(c,c,m?)","c(c,+(ah,fZ))","S(@,be)","ai(c,c,m?)","A(ey?)","c(c,+(ai,i1))","m(F)","c(y,y)","S(v,be)","~(c,@)","A(c)","bo(c,c,m?)","cQ(ah)","aO(m{fallback:m?})","@(m)","ae?()","u<ae>()","cg()","A()","bJ()","A(Q<m,L>)","L(Q<m,L>)","L(L,L)","c(T<ad>,T<ad>)","aX(T<ad>)","c(T<b7>,T<b7>)","aX(T<b7>)","br(o,o,o,o)","A(o)","~(bt)","bt()","~(@,@)","~(E)","S(E)","~(a7)","c(@,@)","~(v?,v?)","c2()","o()"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.d9&&a.b(c.a)&&b.b(c.b),"2;influence,light":(a,b)=>c=>c instanceof A.da&&a.b(c.a)&&b.b(c.b)}}
A.mV(v.typeUniverse,JSON.parse('{"ec":"bc","bu":"bc","bb":"bc","oK":"bS","t":{"u":["1"],"n":["1"],"E":[],"i":["1"]},"dY":{"A":[],"z":[]},"cv":{"z":[]},"cx":{"E":[]},"bc":{"E":[]},"dX":{"cT":[]},"fS":{"t":["1"],"u":["1"],"n":["1"],"E":[],"i":["1"]},"ce":{"H":["1"]},"bO":{"o":[],"a7":[],"ac":["a7"]},"cu":{"o":[],"c":[],"a7":[],"ac":["a7"],"z":[]},"dZ":{"o":[],"a7":[],"ac":["a7"],"z":[]},"ba":{"m":[],"ac":["m"],"k2":[],"z":[]},"c0":{"i":["2"]},"ch":{"H":["2"]},"d_":{"w":["2"],"u":["2"],"c0":["1","2"],"n":["2"],"i":["2"]},"ci":{"d_":["1","2"],"w":["2"],"u":["2"],"c0":["1","2"],"n":["2"],"i":["2"],"w.E":"2","i.E":"2"},"cz":{"D":[]},"dH":{"w":["c"],"bv":["c"],"u":["c"],"n":["c"],"i":["c"],"w.E":"c","bv.E":"c"},"n":{"i":["1"]},"V":{"n":["1"],"i":["1"]},"cW":{"V":["1"],"n":["1"],"i":["1"],"i.E":"1","V.E":"1"},"at":{"H":["1"]},"aU":{"i":["2"],"i.E":"2"},"cp":{"aU":["1","2"],"n":["2"],"i":["2"],"i.E":"2"},"cD":{"H":["2"]},"aV":{"V":["2"],"n":["2"],"i":["2"],"i.E":"2","V.E":"2"},"a5":{"i":["1"],"i.E":"1"},"G":{"H":["1"]},"bZ":{"w":["1"],"bv":["1"],"u":["1"],"n":["1"],"i":["1"]},"cS":{"V":["1"],"n":["1"],"i":["1"],"i.E":"1","V.E":"1"},"d9":{"bC":[],"bh":[]},"da":{"bC":[],"bh":[]},"cm":{"bf":["1","2"],"c3":["1","2"],"bQ":["1","2"],"di":["1","2"],"W":["1","2"]},"cl":{"W":["1","2"]},"K":{"cl":["1","2"],"W":["1","2"]},"by":{"i":["1"],"i.E":"1"},"bz":{"H":["1"]},"cn":{"aY":["1"],"bd":["1"],"n":["1"],"i":["1"]},"aM":{"cn":["1"],"aY":["1"],"bd":["1"],"n":["1"],"i":["1"]},"cL":{"aZ":[],"D":[]},"e_":{"D":[]},"eA":{"D":[]},"dc":{"be":[]},"b8":{"bm":[]},"dF":{"bm":[]},"dG":{"bm":[]},"ew":{"bm":[]},"et":{"bm":[]},"bI":{"bm":[]},"em":{"D":[]},"aQ":{"bq":["1","2"],"jX":["1","2"],"W":["1","2"]},"bp":{"n":["1"],"i":["1"],"i.E":"1"},"cB":{"H":["1"]},"aT":{"n":["1"],"i":["1"],"i.E":"1"},"aS":{"H":["1"]},"aR":{"n":["Q<1,2>"],"i":["Q<1,2>"],"i.E":"Q<1,2>"},"cA":{"H":["Q<1,2>"]},"bC":{"bh":[]},"bS":{"E":[],"z":[]},"cI":{"E":[]},"e2":{"E":[],"z":[]},"Y":{"ag":["1"],"E":[]},"cG":{"w":["o"],"Y":["o"],"u":["o"],"ag":["o"],"n":["o"],"E":[],"i":["o"],"a8":["o"]},"cH":{"w":["c"],"Y":["c"],"u":["c"],"ag":["c"],"n":["c"],"E":[],"i":["c"],"a8":["c"]},"cF":{"fB":[],"w":["o"],"Y":["o"],"u":["o"],"ag":["o"],"n":["o"],"E":[],"i":["o"],"a8":["o"],"z":[],"w.E":"o"},"e3":{"w":["o"],"Y":["o"],"u":["o"],"ag":["o"],"n":["o"],"E":[],"i":["o"],"a8":["o"],"z":[],"w.E":"o"},"e4":{"w":["c"],"Y":["c"],"u":["c"],"ag":["c"],"n":["c"],"E":[],"i":["c"],"a8":["c"],"z":[],"w.E":"c"},"e5":{"w":["c"],"Y":["c"],"u":["c"],"ag":["c"],"n":["c"],"E":[],"i":["c"],"a8":["c"],"z":[],"w.E":"c"},"e6":{"w":["c"],"Y":["c"],"u":["c"],"ag":["c"],"n":["c"],"E":[],"i":["c"],"a8":["c"],"z":[],"w.E":"c"},"e7":{"w":["c"],"Y":["c"],"u":["c"],"ag":["c"],"n":["c"],"E":[],"i":["c"],"a8":["c"],"z":[],"w.E":"c"},"e8":{"w":["c"],"Y":["c"],"u":["c"],"ag":["c"],"n":["c"],"E":[],"i":["c"],"a8":["c"],"z":[],"w.E":"c"},"cJ":{"w":["c"],"Y":["c"],"u":["c"],"ag":["c"],"n":["c"],"E":[],"i":["c"],"a8":["c"],"z":[],"w.E":"c"},"cK":{"ey":[],"w":["c"],"Y":["c"],"u":["c"],"ag":["c"],"n":["c"],"E":[],"i":["c"],"a8":["c"],"z":[],"w.E":"c"},"eU":{"D":[]},"dd":{"aZ":[],"D":[]},"aA":{"H":["1"]},"aG":{"i":["1"],"i.E":"1"},"al":{"D":[]},"cZ":{"eO":["1"]},"N":{"bn":["1"]},"dp":{"kr":[]},"f3":{"dp":[],"kr":[]},"d0":{"bq":["1","2"],"W":["1","2"]},"d2":{"d0":["1","2"],"bq":["1","2"],"W":["1","2"]},"bx":{"n":["1"],"i":["1"],"i.E":"1"},"d1":{"H":["1"]},"az":{"aY":["1"],"jY":["1"],"bd":["1"],"n":["1"],"i":["1"]},"bA":{"H":["1"]},"w":{"u":["1"],"n":["1"],"i":["1"]},"bq":{"W":["1","2"]},"d3":{"n":["2"],"i":["2"],"i.E":"2"},"d4":{"H":["2"]},"bQ":{"W":["1","2"]},"bf":{"c3":["1","2"],"bQ":["1","2"],"di":["1","2"],"W":["1","2"]},"aY":{"bd":["1"],"n":["1"],"i":["1"]},"db":{"aY":["1"],"bd":["1"],"n":["1"],"i":["1"]},"cX":{"aY":["1"],"fc":["1"],"bd":["1"],"n":["1"],"i":["1"]},"dB":{"bK":["u<c>","m"]},"dO":{"bK":["m","u<c>"]},"eE":{"bK":["m","u<c>"]},"bl":{"ac":["bl"]},"o":{"a7":[],"ac":["a7"]},"c":{"a7":[],"ac":["a7"]},"u":{"n":["1"],"i":["1"]},"a7":{"ac":["a7"]},"bd":{"n":["1"],"i":["1"]},"m":{"ac":["m"],"k2":[]},"dz":{"D":[]},"aZ":{"D":[]},"aB":{"D":[]},"cO":{"D":[]},"dV":{"D":[]},"cY":{"D":[]},"ez":{"D":[]},"bY":{"D":[]},"dI":{"D":[]},"ea":{"D":[]},"cV":{"D":[]},"fb":{"be":[]},"ab":{"mi":[]},"dk":{"eC":[]},"f7":{"eC":[]},"eP":{"eC":[]},"ah":{"aW":[]},"ai":{"aW":[]},"aD":{"aW":[]},"bo":{"aW":[]},"eb":{"aW":[]},"cP":{"me":[]},"f0":{"md":[]},"eV":{"lM":[]},"ad":{"ac":["ad"]},"b7":{"ac":["b7"]},"cf":{"C":[]},"eM":{"y":[]},"dD":{"C":[]},"eN":{"y":[]},"dL":{"C":[]},"eQ":{"y":[]},"co":{"C":[]},"eS":{"y":[]},"dN":{"C":[]},"eT":{"y":[]},"dU":{"C":[]},"eX":{"y":[]},"cE":{"C":[]},"eZ":{"y":[]},"dE":{"mc":[]},"cN":{"C":[]},"f1":{"y":[]},"eg":{"C":[]},"f2":{"y":[]},"ep":{"C":[]},"f5":{"y":[]},"eq":{"C":[]},"f6":{"y":[]},"es":{"C":[]},"f9":{"y":[]},"er":{"C":[]},"f8":{"y":[]},"eF":{"C":[]},"fd":{"y":[]},"eI":{"C":[]},"fg":{"y":[]},"dM":{"lI":[]},"b2":{"aO":[]},"eG":{"lO":[]},"lR":{"u":["c"],"n":["c"],"i":["c"]},"ey":{"u":["c"],"n":["c"],"i":["c"]},"mn":{"u":["c"],"n":["c"],"i":["c"]},"lP":{"u":["c"],"n":["c"],"i":["c"]},"ml":{"u":["c"],"n":["c"],"i":["c"]},"lQ":{"u":["c"],"n":["c"],"i":["c"]},"mm":{"u":["c"],"n":["c"],"i":["c"]},"fB":{"u":["o"],"n":["o"],"i":["o"]},"lL":{"u":["o"],"n":["o"],"i":["o"]}}'))
A.mU(v.typeUniverse,JSON.parse('{"bZ":1,"dq":2,"Y":1,"db":1,"dj":1,"dJ":2}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",l:"#version 300 es\nout vec2 vUv;\nvoid main(){\n  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));\n  vUv=p;\n  gl_Position=vec4(p*2.0-1.0,0.0,1.0);\n}\n",o:"#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform float uExposure;\nuniform float uVignette;\nuniform float uGrain;\nuniform float uRainIntensity;\nuniform float uRainWindowVisibility;\nuniform float uOutputEncoding;\nuniform float uToneMap;\nout vec4 oColor;\n\nfloat hash(vec2 p){\n  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);\n}\n\nvec3 reinhardToneMap(vec3 color){\n  return color/(vec3(1.)+color);\n}\n\nvec3 linearToSrgb(vec3 color){\n  vec3 cutoff=step(vec3(.0031308),color);\n  vec3 low=color*12.92;\n  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;\n  return mix(low,high,cutoff);\n}\n\nfloat rainStreak(vec2 uv){\n  // Stable diagonal streaks: no time or allocation dependency, and no work\n  // when uRainIntensity is zero. The small hash offset avoids a tiled comb.\n  vec2 cell=vec2(floor(uv.x*96.0),floor(uv.y*18.0));\n  float phase=fract(uv.x*96.0+uv.y*18.0+hash(cell));\n  float width=smoothstep(.08,.0,abs(phase-.5));\n  float sparse=step(.72,hash(cell+vec2(19.0,7.0)));\n  return width*sparse;\n}\n\nvoid main(){\n  vec4 source=texture(uTex,vUv);\n  // Exposure operates in scene-linear space; tone mapping prevents HDR\n  // highlights from clipping before the selected output transfer function.\n  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);\n  color=mix(color,reinhardToneMap(color),clamp(uToneMap,0.,1.));\n  float edge=distance(vUv,vec2(.5));\n  float vignette=smoothstep(.35,.78,edge);\n  color*=1.-clamp(uVignette,0.,1.)*vignette;\n  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));\n  float rain=clamp(uRainIntensity,0.,1.)*\n    clamp(uRainWindowVisibility,0.,1.);\n  color=mix(color,vec3(.56,.67,.76),rain*rainStreak(vUv)*.16);\n  // A stable screen-space grain keeps captures reproducible for a fixed\n  // viewport while still giving the dark gothic presentation a fine film\n  // texture. It is deliberately tiny and never changes alpha.\n  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);\n  oColor=vec4(clamp(color,0.,1.),source.a);\n}\n",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",k:"WebGl2Device: operation attempted while context is not ready"}
var t=(function rtii(){var s=A.ca
return{v:s("al"),do:s("bJ"),e8:s("ac<@>"),dN:s("ck"),I:s("K<m,c>"),Q:s("aM<m>"),dy:s("bl"),gw:s("n<@>"),U:s("D"),B:s("fB"),b:s("L"),Z:s("bm"),j:s("aO"),cr:s("i<ck>"),bM:s("i<o>"),hf:s("i<@>"),hb:s("i<c>"),a4:s("t<aO>"),b7:s("t<a2>"),gk:s("t<b9>"),cU:s("t<F>"),dV:s("t<br>"),cw:s("t<+influence,light(o,ae)>"),e:s("t<C>"),u:s("t<y>"),cR:s("t<cP>"),C:s("t<l>"),c4:s("t<k7>"),G:s("t<aX>"),aM:s("t<T<b7>>"),c1:s("t<T<ad>>"),w:s("t<ae>"),s:s("t<m>"),cL:s("t<f_>"),ha:s("t<ji<j8>>"),c9:s("t<ji<fZ>>"),aO:s("t<ji<k7>>"),fq:s("t<ji<i1>>"),n:s("t<o>"),p:s("t<@>"),t:s("t<c>"),T:s("cv"),m:s("E"),q:s("bb"),aU:s("ag<@>"),_:s("u<a2>"),O:s("u<F>"),r:s("u<m>"),aH:s("u<@>"),L:s("u<c>"),D:s("Q<m,L>"),bS:s("W<m,aO>"),E:s("W<m,F>"),f:s("W<m,m>"),eL:s("aD"),cA:s("ah"),P:s("S"),K:s("v"),fy:s("ad"),z:s("F"),gT:s("oM"),bQ:s("+()"),ai:s("+(ah,fZ)"),dU:s("+(ai,i1)"),fk:s("+influence,light(o,ae)"),fA:s("y"),b0:s("aE<bo,k7>"),ex:s("aE<aD,j8>"),cE:s("aE<ah,fZ>"),g2:s("aE<ai,i1>"),J:s("l"),Y:s("aX"),W:s("bd<m>"),cJ:s("bd<c>"),a:s("T<b7>"),k:s("T<ad>"),l:s("be"),d5:s("a4"),N:s("m"),aj:s("ai"),dm:s("z"),eK:s("aZ"),ak:s("bu"),h:s("bf<m,m>"),am:s("cX<m>"),bw:s("eB"),dD:s("eC"),c:s("N<@>"),cd:s("N<~>"),hg:s("d2<v?,v?>"),a8:s("c2"),eM:s("aG<aX>"),V:s("dm"),R:s("dn"),y:s("A"),al:s("A(v)"),i:s("o"),A:s("@"),fO:s("@()"),x:s("@(v)"),d:s("@(v,be)"),S:s("c"),eH:s("bn<S>?"),du:s("t<v?>?"),an:s("E?"),X:s("v?"),dk:s("m?"),F:s("bw<@,@>?"),g:s("eY?"),fQ:s("A?"),cD:s("o?"),h6:s("c?"),cg:s("a7?"),o:s("a7"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.bd=J.dW.prototype
B.a=J.t.prototype
B.i=J.cu.prototype
B.ag=J.bO.prototype
B.b=J.ba.prototype
B.be=J.bb.prototype
B.bf=J.cx.prototype
B.J=A.cF.prototype
B.al=A.cK.prototype
B.am=J.ec.prototype
B.Z=J.bu.prototype
B.aC=new A.fl(0,"add")
B.aD=new A.dC(0,"zero")
B.aE=new A.dC(1,"one")
B.cX=new A.fk()
B.aF=new A.dB()
B.cY=new A.fs()
B.bg=new A.bP(0.03,0.03,0.04)
B.G=new A.bP(0,0,0)
B.H=new A.bP(1,1,1)
B.bp=s([],A.ca("t<oL>"))
B.I=s([],t.w)
B.a0=new A.fD()
B.a9=new A.fO(1,"linear")
B.aa=new A.fP(0,"clampToEdge")
B.aG=new A.fN()
B.a1=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.aH=function() {
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
B.aM=function(getTagFallback) {
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
B.aI=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.aL=function(hooks) {
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
B.aK=function(hooks) {
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
B.aJ=function(hooks) {
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
B.a2=function(hooks) { return hooks; }

B.aN=new A.ea()
B.a3=new A.h9()
B.h=new A.hr()
B.p=new A.ao(0,1,0)
B.u=new A.ao(0,-1,0)
B.aO=new A.ae()
B.a4=new A.eE()
B.aP=new A.hD()
B.n=new A.f3()
B.v=new A.fb()
B.a5=new A.cj(0,"colorOnly")
B.a6=new A.cj(1,"colorAndDepth")
B.B=new A.cj(2,"depthOnly")
B.C=new A.fm(1,"srgb")
B.aQ=new A.fp(1,"back")
B.aR=new A.ft(0,"less")
B.aS=new A.L(0,0,0)
B.aT=new A.bL(0,"idle")
B.w=new A.bL(1,"active")
B.aU=new A.bL(2,"ended")
B.aV=new A.bL(3,"aborted")
B.a7=new A.cr(0,"outside")
B.aW=new A.cr(1,"intersects")
B.aX=new A.cr(2,"inside")
B.aY=new A.dS(0,"vertex")
B.aZ=new A.dS(1,"indices")
B.b_=new A.fJ(0,"staticDraw")
B.e=new A.dT(0,"ready")
B.x=new A.dT(1,"lost")
B.b0=new A.bM(0,"color")
B.a8=new A.bM(1,"colorAndGlow")
B.b1=new A.bM(2,"colorDepthGlow")
B.D=new A.bM(3,"depthOnly")
B.b2=new A.aP(0,"beforeShadow")
B.b3=new A.aP(2,"beforeDepth")
B.ab=new A.aP(3,"afterDepth")
B.ac=new A.aP(4,"beforeWorld")
B.b4=new A.aP(5,"afterWorld")
B.q=new A.aP(6,"afterResolve")
B.b5=new A.aP(9,"beforePresent")
B.ad=new A.ar(0,"readBeforeWrite")
B.b6=new A.ar(1,"duplicateWriter")
B.b7=new A.ar(2,"sampledMultisampledAttachment")
B.E=new A.ar(3,"invalidResolve")
B.b8=new A.ar(4,"formatOrSizeMismatch")
B.b9=new A.ar(5,"unversionedReadWrite")
B.ba=new A.ar(6,"invalidHistoryRead")
B.bb=new A.ar(7,"dependencyCycle")
B.bc=new A.ar(8,"missingCapability")
B.ae=new A.ct(0,"wrongKind")
B.af=new A.ct(1,"staleGeneration")
B.F=new A.ct(3,"releasedResource")
B.bh=s(["uViewProjection","uModel","uNormalMatrix","uLightDir","uAmbientColor","uAmbientIntensity"],t.s)
B.bi=s(["uViewProjection","uView","uModel","uNormalMatrix","uLightViewProjection","uLightPosition","uLightDirection","uLightColor","uLightIntensity","uLightRange","uLightInnerCos","uLightOuterCos","uSpotEnabled","uDirectionalDirection","uDirectionalColor","uDirectionalIntensity","uPointPosition0","uPointColor0","uPointIntensity0","uPointRadius0","uPointPosition1","uPointColor1","uPointIntensity1","uPointRadius1","uPointPosition2","uPointColor2","uPointIntensity2","uPointRadius2","uPointPosition3","uPointColor3","uPointIntensity3","uPointRadius3","uDirectSpotPosition0","uDirectSpotDirection0","uDirectSpotColor0","uDirectSpotIntensity0","uDirectSpotRange0","uDirectSpotInnerCos0","uDirectSpotOuterCos0","uDirectSpotEnabled0","uDirectSpotPosition1","uDirectSpotDirection1","uDirectSpotColor1","uDirectSpotIntensity1","uDirectSpotRange1","uDirectSpotInnerCos1","uDirectSpotOuterCos1","uDirectSpotEnabled1","uDirectSpotPosition2","uDirectSpotDirection2","uDirectSpotColor2","uDirectSpotIntensity2","uDirectSpotRange2","uDirectSpotInnerCos2","uDirectSpotOuterCos2","uDirectSpotEnabled2","uAmbientColor","uAmbientIntensity","uShadowMapTexelSize","uSceneColorSize","uEmissiveStrength","uUvScaleOffset","uNormalStrength","uRoughness","uMetallic","uOcclusionStrength","uClearcoatStrength","uClearcoatRoughness","uLightmapIntensity","uCameraPosition","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff","uOpaqueCoverage","uFogColor","uFogStart","uFogEnd","uFogHeightFalloff","uFogDensity","uReceivesShadow","uRainWetness"],t.s)
B.bj=s(["uNear","uFar","uProjScaleX","uProjScaleY","uRadius","uStrength"],t.s)
B.bk=s(["uQuantizationBits","uDitherStrength"],t.s)
B.bl=s(["uTime","uChromaWeight","uTrackingWeight","uNoiseWeight","uHeadSwitchWeight","uDropoutWeight","uGhostWeight"],t.s)
B.bm=s(["uNear","uFar","uFocusDistance","uFocusRange","uStrength"],t.s)
B.bn=s(["uViewProjection","uModel","uVertexSnapGrid","uAffineWarpStrength","uAlphaCutoff"],t.s)
B.bo=s(["uExposure","uVignette","uGrain","uRainIntensity","uRainWindowVisibility","uOutputEncoding","uToneMap"],t.s)
B.bq=s([],t.u)
B.Q=new A.a4(0,"depthTest")
B.R=new A.a4(1,"depthFunc")
B.S=new A.a4(2,"depthWrite")
B.T=new A.a4(3,"blendEnable")
B.U=new A.a4(4,"blendFunc")
B.V=new A.a4(5,"blendEquation")
B.W=new A.a4(6,"cullEnable")
B.X=new A.a4(7,"cullFace")
B.av=new A.a4(8,"frontFace")
B.cq=new A.a4(9,"stencilEnable")
B.at=new A.a4(10,"colorMask")
B.au=new A.a4(11,"scissorEnable")
B.br=s([B.Q,B.R,B.S,B.T,B.U,B.V,B.W,B.X,B.av,B.cq,B.at,B.au],A.ca("t<a4>"))
B.bs=s(["uLightViewProjection","uModel","uAlphaCutoff"],t.s)
B.bt=s(["uBloomStrength"],t.s)
B.bu=s(["uLutSize","uStrength"],t.s)
B.bv=s(["uTexelSize","uNear","uFar"],t.s)
B.ah=s(["uTexelStep"],t.s)
B.bR={uAlbedo:0}
B.ai=new A.K(B.bR,[0],t.I)
B.bY={uSsaoRaw:0,uSceneDepth:1}
B.bw=new A.K(B.bY,[0,1],t.I)
B.bV={uScene:0,uHistory:1}
B.bx=new A.K(B.bV,[0,1],t.I)
B.bN={aPosition:0,aUvMat:1}
B.aj=new A.K(B.bN,[0,4],t.I)
B.bW={uScene:0,uLut:1}
B.by=new A.K(B.bW,[0,1],t.I)
B.bX={uSource:0}
B.ak=new A.K(B.bX,[0],t.I)
B.bP={uAlbedo:0,uShadowMap:1,uSsao:2,uNormalMap:3,uOrmMap:4,uEmissiveMap:5,uLightmap:6}
B.bz=new A.K(B.bP,[0,1,2,3,4,5,6],t.I)
B.bM={uSharp:0,uBlurred:1,uSceneDepth:2}
B.bA=new A.K(B.bM,[0,1,2],t.I)
B.bS={uBloom:0}
B.bB=new A.K(B.bS,[0],t.I)
B.bT={uSceneDepth:0}
B.bC=new A.K(B.bT,[0],t.I)
B.bU={uScene:0}
B.bD=new A.K(B.bU,[0],t.I)
B.K={}
B.bE=new A.K(B.K,[],A.ca("K<m,m>"))
B.m=new A.K(B.K,[],t.I)
B.bJ={aPosition:0,aNormal:1,aColor:2,aAlpha:3,aUvMat:4,aTangent:5,aUv1:6}
B.bF=new A.K(B.bJ,[0,1,2,3,4,5,6],t.I)
B.bO={aPosition:0,aNormal:1,aColor:2,aAlpha:3}
B.bG=new A.K(B.bO,[0,1,2,3],t.I)
B.bZ={uTex:0}
B.bH=new A.K(B.bZ,[0],t.I)
B.c_=new A.eb(0,1,null)
B.L=new A.bV(0,"safe")
B.an=new A.bV(2,"high")
B.P=new A.aM(B.K,0,t.Q)
B.y=new A.bU(B.L,B.P)
B.c0=new A.bV(1,"standard")
B.bQ={shadows:0}
B.cm=new A.aM(B.bQ,1,t.Q)
B.c2=new A.bU(B.c0,B.cm)
B.bK={shadows:0,ssao:1,bloom:2,dof:3,grade:4}
B.cj=new A.aM(B.bK,5,t.Q)
B.c3=new A.bU(B.an,B.cj)
B.c1=new A.bV(4,"shipping")
B.bL={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6}
B.ck=new A.aM(B.bL,7,t.Q)
B.d_=new A.bU(B.c1,B.ck)
B.cZ=new A.fu(1,"errorsOnly")
B.c4=new A.ej(B.y,384,216,1,0)
B.M=new A.bW(0,"constructed")
B.c5=new A.bW(1,"initializing")
B.N=new A.bW(2,"ready")
B.z=new A.bW(3,"contextLost")
B.d=new A.cR(0,"read")
B.f=new A.cR(1,"write")
B.o=new A.cR(2,"historyRead")
B.k=new A.ek(0,"rgba8")
B.c6=new A.M("dofBlurH",B.k,192,108,1,0)
B.c7=new A.M("dofBlurV",B.k,192,108,1,0)
B.c8=new A.M("dofOutput",B.k,384,216,1,0)
B.ao=new A.ek(2,"depth24")
B.c9=new A.M("shadowMap",B.ao,512,512,1,0)
B.ca=new A.M("ssaoRaw",B.k,192,108,1,0)
B.cb=new A.M("ssaoBlurred",B.k,192,108,1,0)
B.cc=new A.M("gradeOutput",B.k,384,216,1,0)
B.cd=new A.M("vhsOutput",B.k,384,216,1,0)
B.ce=new A.M("sceneDepth",B.ao,384,216,1,0)
B.cf=new A.M("bloomBlurH",B.k,192,108,1,0)
B.cg=new A.M("bloomBlurV",B.k,192,108,1,0)
B.ch=new A.M("present",B.k,384,216,1,0)
B.O=new A.M("sceneColor",B.k,384,216,1,0)
B.ci=new A.M("ps1Output",B.k,384,216,1,0)
B.bI={shadows:0,ssao:1,bloom:2,dof:3,grade:4,ps1:5,vhs:6,msaa:7,"material-array":8}
B.cl=new A.aM(B.bI,9,t.Q)
B.ar=new A.bX(2,"link")
B.cn=new A.cU(B.ar,"gl.createProgram() returned null")
B.ap=new A.bX(0,"vertex")
B.aq=new A.bX(1,"fragment")
B.as=new A.bX(3,"validation")
B.co=new A.eo(0,"full")
B.cp=new A.eo(2,"culled")
B.cr=A.aq("oB")
B.cs=A.aq("oC")
B.ct=A.aq("fB")
B.cu=A.aq("lL")
B.cv=A.aq("lP")
B.cw=A.aq("lQ")
B.cx=A.aq("lR")
B.cy=A.aq("E")
B.cz=A.aq("v")
B.cA=A.aq("ml")
B.cB=A.aq("mm")
B.cC=A.aq("mn")
B.cD=A.aq("ey")
B.c=new A.b0(0,"float1")
B.aw=new A.b0(1,"float2")
B.j=new A.b0(2,"float3")
B.cE=new A.b0(3,"float4")
B.l=new A.b0(4,"mat4")
B.ax=new A.b0(5,"mat4Array")
B.Y=new A.f(B.c,0)
B.ay=new A.f(B.c,1)
B.r=new A.b0(6,"sampler")
B.t=new A.f(B.r,0)
B.A=new A.f(B.r,1)
B.az=new A.f(B.r,2)
B.cF=new A.f(B.r,3)
B.cG=new A.f(B.r,4)
B.cH=new A.f(B.r,5)
B.cI=new A.f(B.r,6)
B.cJ=new A.hA(!1)
B.a_=new A.ao(0,0,0)
B.cK=new A.ao(0,0,1)
B.cL=new A.ao(1,0,0)
B.cM=new A.aw(0,"position")
B.cN=new A.aw(1,"normal")
B.cO=new A.aw(2,"color")
B.cP=new A.aw(3,"emissive")
B.cQ=new A.aw(4,"alpha")
B.cR=new A.aw(5,"uv0")
B.cS=new A.aw(6,"tangent4")
B.cT=new A.aw(7,"uv1")
B.cU=new A.aw(8,"legacyMaterialEffect")
B.aA=new A.eL(0,"horizontal")
B.cV=new A.eL(1,"vertical")
B.aB=new A.eR(0,"horizontal")
B.cW=new A.eR(1,"vertical")})();(function staticFields(){$.hY=null
$.ak=A.d([],A.ca("t<v>"))
$.k3=null
$.jN=null
$.jM=null
$.l8=null
$.l3=null
$.lb=null
$.iE=null
$.iJ=null
$.jz=null
$.hZ=A.d([],A.ca("t<u<v>?>"))
$.c5=null
$.dt=null
$.du=null
$.jr=!1
$.I=B.n
$.kg=""
$.kh=null})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"oE","lg",()=>A.l6("_$dart_dartClosure"))
s($,"oD","jC",()=>A.l6("_$dart_dartClosure_dartJSInterop"))
s($,"p3","lv",()=>A.d([new J.dX()],A.ca("t<cT>")))
s($,"oO","lh",()=>A.b_(A.hw({
toString:function(){return"$receiver$"}})))
s($,"oP","li",()=>A.b_(A.hw({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"oQ","lj",()=>A.b_(A.hw(null)))
s($,"oR","lk",()=>A.b_(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"oU","ln",()=>A.b_(A.hw(void 0)))
s($,"oV","lo",()=>A.b_(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"oT","lm",()=>A.b_(A.kd(null)))
s($,"oS","ll",()=>A.b_(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"oX","lq",()=>A.b_(A.kd(void 0)))
s($,"oW","lp",()=>A.b_(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"oY","jI",()=>A.mD())
s($,"p1","lu",()=>A.m1(4096))
s($,"p_","ls",()=>new A.i8().$0())
s($,"p0","lt",()=>new A.i7().$0())
s($,"oZ","lr",()=>new Int8Array(A.x(A.d([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.t))))
s($,"p2","dw",()=>A.iP(B.cz))
s($,"oA","lf",()=>B.O.cf())
s($,"oJ","jH",()=>A.e9(A.d([255,255,255,255],t.t)))
s($,"oG","jE",()=>A.e9(A.d([128,128,255,255],t.t)))
s($,"oF","jD",()=>A.e9(A.d([0,0,0,255],t.t)))
s($,"oH","jF",()=>A.e9(A.d([255,255,0,255],t.t)))
s($,"oI","jG",()=>A.e9(A.d([255,255,255,255],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bS,SharedArrayBuffer:A.bS,ArrayBufferView:A.cI,DataView:A.e2,Float32Array:A.cF,Float64Array:A.e3,Int16Array:A.e4,Int32Array:A.e5,Int8Array:A.e6,Uint16Array:A.e7,Uint32Array:A.e8,Uint8ClampedArray:A.cJ,CanvasPixelArray:A.cJ,Uint8Array:A.cK})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.Y.$nativeSuperclassTag="ArrayBufferView"
A.d5.$nativeSuperclassTag="ArrayBufferView"
A.d6.$nativeSuperclassTag="ArrayBufferView"
A.cG.$nativeSuperclassTag="ArrayBufferView"
A.d7.$nativeSuperclassTag="ArrayBufferView"
A.d8.$nativeSuperclassTag="ArrayBufferView"
A.cH.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.fj
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
