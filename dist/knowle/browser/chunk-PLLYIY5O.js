import{a as So}from"./chunk-H47W74KJ.js";import{V as Ht,_ as or,a as Me,b as Fe,c as Et,e as N,f as Pi,m as Gt}from"./chunk-K4FC24YL.js";var tn=Object.defineProperty,c0=Object.getOwnPropertyDescriptor,h0=Object.getOwnPropertyNames,f0=Object.prototype.hasOwnProperty,m0=(e=>typeof Et<"u"?Et:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof Et<"u"?Et:t)[r]}):e)(function(e){if(typeof Et<"u")return Et.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),U=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(i){throw r=[i],i}},Yt=(e,t)=>{for(var r in t)tn(e,r,{get:t[r],enumerable:!0})},g0=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of h0(t))!f0.call(e,a)&&a!==r&&tn(e,a,{get:()=>t[a],enumerable:!(i=c0(t,a))||i.enumerable});return e},xr=e=>g0(tn({},"__esModule",{value:!0}),e),ur,gt,Kt,To,pp,cp=U(()=>{"use strict";ur=new Map,gt=[],Kt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=ur.get(e);if(i===void 0)ur.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=gt.indexOf(e);a!==-1&&gt.splice(a,1);for(let n=0;n<gt.length;n++)if(ur.get(gt[n]).priority<=r){gt.splice(n,0,e);return}gt.push(e)}return}throw new TypeError("not a valid backend")},To=e=>N(null,null,function*(){let t=ur.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),yield t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}}),pp=e=>N(null,null,function*(){let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?gt:r,a,n=[],s=new Set;for(let l of i){let d=yield To(l);typeof d=="string"?n.push({name:l,err:d}):(a||(a=d),a===d&&s.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${n.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of n)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,d)=>d==="executionProviders"?u:Reflect.get(l,d)})]})}),y0=U(()=>{"use strict";cp()}),hp,b0=U(()=>{"use strict";hp="1.29.0"}),Ui,Be,fp=U(()=>{"use strict";b0(),Ui="warning",Be={wasm:{},webgl:{},webgpu:{},versions:{common:hp},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Ui=e}},get logLevel(){return Ui}},Object.defineProperty(Be,"logLevel",{enumerable:!0})}),be,_0=U(()=>{"use strict";fp(),be=Be}),mp,gp,w0=U(()=>{"use strict";mp=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[3]):(a=e.dims[3],n=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let h=n*a,c=0,m=h,b=h*2,y=-1;s==="RGBA"?(c=0,m=h,b=h*2,y=h*3):s==="RGB"?(c=0,m=h,b=h*2):s==="RBG"&&(c=0,b=h,m=h*2);for(let w=0;w<n;w++)for(let S=0;S<a;S++){let v=(e.data[c++]-d[0])*l[0],_=(e.data[m++]-d[1])*l[1],k=(e.data[b++]-d[2])*l[2],T=y===-1?255:(e.data[y++]-d[3])*l[3];i.fillStyle="rgba("+v+","+_+","+k+","+T+")",i.fillRect(S,w,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},gp=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[1],s=e.dims[3]):(a=e.dims[3],n=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,d,h;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?h=[0,0,0,0]:typeof l.bias=="number"?h=[l.bias,l.bias,l.bias,l.bias]:(h=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(h[3]=l.bias[3]));let c=n*a;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,b=0,y=1,w=2,S=3,v=0,_=c,k=c*2,T=-1;u==="RGBA"?(v=0,_=c,k=c*2,T=c*3):u==="RGB"?(v=0,_=c,k=c*2):u==="RBG"&&(v=0,k=c,_=c*2),i=r.createImageData(a,n);for(let I=0;I<n*a;b+=m,y+=m,w+=m,S+=m,I++)i.data[b]=(e.data[v++]-h[0])*d[0],i.data[y]=(e.data[_++]-h[1])*d[1],i.data[w]=(e.data[k++]-h[2])*d[2],i.data[S]=T===-1?255:(e.data[T++]-h[3])*d[3]}else throw new Error("Can not access image data");return i}}),qr,yp,bp,_p,wp,$p,$0=U(()=>{"use strict";rn(),qr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},n,s;typeof a.mean=="number"?n=[a.mean,a.mean,a.mean,a.mean]:n=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?s=[a.bias,a.bias,a.bias,a.bias]:s=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*i,h=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),c=4,m=0,b=1,y=2,w=3,S=0,v=d,_=d*2,k=-1;u==="RGB"&&(c=3,m=0,b=1,y=2,w=-1),l==="RGBA"?k=d*3:l==="RBG"?(S=0,_=d,v=d*2):l==="BGR"&&(_=0,v=d,S=d*2);for(let T=0;T<d;T++,m+=c,y+=c,b+=c,w+=c)h[S++]=(e[m]+s[0])/n[0],h[v++]=(e[b]+s[1])/n[1],h[_++]=(e[y]+s[2])/n[2],k!==-1&&w!==-1&&(h[k++]=(e[w]+s[3])/n[3]);return l==="RGBA"?new Ue("float32",h,[1,4,r,i]):new Ue("float32",h,[1,3,r,i])},yp=(e,t)=>N(null,null,function*(){let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,n=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=h=>typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||h instanceof OffscreenCanvas?h.getContext("2d"):null;if(r){let h=l();h.width=e.width,h.height=e.height;let c=d(h);if(c!=null){let m=e.height,b=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,b=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=m,u.width=b}else u.tensorFormat="RGBA",u.height=m,u.width=b;c.drawImage(e,0,0),s=c.getImageData(0,0,b,m).data}else throw new Error("Can not access image data")}else if(i){let h,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(h=t.resizedHeight,c=t.resizedWidth):(h=e.height,c=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=h,u.width=c,t!==void 0){let m=l();m.width=c,m.height=h;let b=d(m);if(b!=null)b.putImageData(e,0,0),s=b.getImageData(0,0,c,h).data;else throw new Error("Can not access image data")}else s=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let h=l();h.width=e.width,h.height=e.height;let c=d(h);if(c!=null){let m=e.height,b=e.width;return c.drawImage(e,0,0,b,m),s=c.getImageData(0,0,b,m).data,u.height=m,u.width=b,qr(s,u)}else throw new Error("Can not access image data")}else{if(n)return new Promise((h,c)=>{let m=l(),b=d(m);if(!e||!b)return c();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{m.width=y.width,m.height=y.height,b.drawImage(y,0,0,m.width,m.height);let w=b.getImageData(0,0,m.width,m.height);u.height=m.height,u.width=m.width,h(qr(w.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return qr(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")}),bp=(e,t)=>{let{width:r,height:i,download:a,dispose:n}=t,s=[1,i,r,4];return new Ue({location:"texture",type:"float32",texture:e,dims:s,download:a,dispose:n})},_p=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Ue({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:n})},wp=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Ue({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:n})},$p=(e,t,r)=>new Ue({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Bt,_r,Li,vp,v0=U(()=>{"use strict";Bt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),_r=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Li=!1,vp=()=>{if(!Li){Li=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Bt.set("int64",BigInt64Array),_r.set(BigInt64Array,"int64")),t&&(Bt.set("uint64",BigUint64Array),_r.set(BigUint64Array,"uint64")),i?(Bt.set("float16",r),_r.set(r,"float16")):Bt.set("float16",Uint16Array)}}}),xp,Sp,x0=U(()=>{"use strict";rn(),xp=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},Sp=(e,t)=>{switch(e.location){case"cpu":return new Ue(e.type,e.data,t);case"cpu-pinned":return new Ue({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ue({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ue({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ue({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ue,rn=U(()=>{"use strict";w0(),$0(),v0(),x0(),Ue=class{constructor(e,t,r){vp();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let s=Bt.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=Bt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",s=e;else if(l==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let l=_r.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");a=u,this.cpuData=s,this.dataLocation="cpu"}let n=xp(a);if(this.cpuData&&n!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(n/2)===this.cpuData.length))throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=n}static fromImage(e,t){return N(this,null,function*(){return yp(e,t)})}static fromTexture(e,t){return bp(e,t)}static fromGpuBuffer(e,t){return _p(e,t)}static fromMLTensor(e,t){return wp(e,t)}static fromPinnedBuffer(e,t,r){return $p(e,t,r)}toDataURL(e){return mp(this,e)}toImageData(e){return gp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}getData(e){return N(this,null,function*(){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=yield this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}})}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Sp(this,e)}}}),ze,Tp=U(()=>{"use strict";rn(),ze=Ue}),ii,qi,it,Ye,Dt,Nt,kp=U(()=>{"use strict";fp(),ii=(e,t)=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||console.timeStamp(`${e}::ORT::${t}`)},qi=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let n=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(n+=`::${t}`),ii("CPU",n);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},it=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||qi("BEGIN",e)},Ye=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||qi("END",e)},Dt=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||console.time(`ORT::${e}`)},Nt=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||console.timeEnd(`ORT::${e}`)}}),Ep,S0=U(()=>{"use strict";cp(),Tp(),kp(),Ep=class Ip{constructor(t){this.handler=t}run(t,r,i){return N(this,null,function*(){it(),Dt("InferenceSession.run");let a={},n={};if(typeof t!="object"||t===null||t instanceof ze||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof ze)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);a[d]=null}if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,h=Object.getOwnPropertyNames(r);for(let c of this.outputNames)if(h.indexOf(c)!==-1){let m=r[c];(m===null||m instanceof ze)&&(d=!0,s=!1,a[c]=m)}if(d){if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else n=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)a[d]=null;let u=yield this.handler.run(t,a,n),l={};for(let d in u)if(Object.hasOwnProperty.call(u,d)){let h=u[d];h instanceof ze?l[d]=h:l[d]=new ze(h.type,h.data,h.dims)}return Nt("InferenceSession.run"),Ye(),l})}release(){return N(this,null,function*(){return this.handler.dispose()})}static create(t,r,i,a){return N(this,null,function*(){it(),Dt("InferenceSession.create");let n,s={};if(typeof t=="string"){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let h=t,c=0,m=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(c=r,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=h.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${h.byteLength}).`);if(m=t.byteLength-c,typeof i=="number"){if(m=i,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||c+m>h.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${h.byteLength-c}].`);if(typeof a=="object"&&a!==null)s=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(h,c,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=yield pp(s),d=yield u.createInferenceSessionHandler(n,l);return Nt("InferenceSession.create"),Ye(),new Ip(d)})}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Tr,T0=U(()=>{"use strict";S0(),Tr=Ep}),k0=U(()=>{"use strict"}),E0=U(()=>{"use strict"}),I0=U(()=>{"use strict"}),z0=U(()=>{"use strict"}),C0={};Yt(C0,{InferenceSession:()=>Tr,TRACE:()=>ii,TRACE_EVENT_BEGIN:()=>Dt,TRACE_EVENT_END:()=>Nt,TRACE_FUNC_BEGIN:()=>it,TRACE_FUNC_END:()=>Ye,Tensor:()=>ze,env:()=>be,registerBackend:()=>Kt});var Ve=U(()=>{"use strict";y0(),_0(),T0(),Tp(),k0(),E0(),kp(),I0(),z0()}),an=U(()=>{"use strict"}),zp={};Yt(zp,{default:()=>Cp});var Fi,Wi,Cp,A0=U(()=>{"use strict";Uf(),qt(),nn(),Fi="ort-wasm-proxy-worker",Wi=globalThis.self?.name===Fi,Wi&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":sn(r.wasm).then(()=>{xn(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;Sn(a,i).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})});break}case"copy-from":{let{buffer:i}=r,a=di(i);postMessage({type:t,out:a});break}case"create":{let{model:i,options:a}=r;Tn(i,a).then(n=>{postMessage({type:t,out:n})},n=>{postMessage({type:t,err:n})});break}case"release":kn(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:a,inputs:n,outputIndices:s,options:u}=r;En(i,a,n,s,new Array(s.length).fill(null),u).then(l=>{l.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},zn([...n,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":In(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),Cp=Wi?null:e=>new Worker(e??Pe,{type:"module",name:Fi})}),Ap={};Yt(Ap,{default:()=>Op});function ko(){return N(this,arguments,function*(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,a=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(o,p)=>{o.startsWith("./")&&(o=o.substring(2)),(t.Yc||(t.Yc=new Map)).set(o,p)},t.unmountExternalData=()=>{delete t.Yc,delete t.Zd,delete t.Yd,delete t.$d},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let n=o=>(...p)=>N(null,null,function*(){try{if(t.Xc)throw Error("Session already started");let g=t.Xc={Kd:p[0],errors:[]},f=yield o(...p);if(t.Xc!==g)throw Error("Session mismatch");t.dd?.flush();let $=g.errors;if(0<$.length){let E=yield Promise.all($);if(E=E.filter(A=>A),0<E.length)throw Error(E.join(`
`))}return f}finally{t.Xc=null}});t.jsepInit=(o,p)=>{if(o==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=p;let g=t.dd;t.jsepRegisterBuffer=(f,$,E,A)=>g.registerBuffer(f,$,E,A),t.jsepGetBuffer=f=>g.getBuffer(f),t.jsepCreateDownloader=(f,$,E)=>g.createDownloader(f,$,E),t.jsepOnCreateSession=f=>{g.onCreateSession(f)},t.jsepOnReleaseSession=f=>{g.onReleaseSession(f)},t.jsepOnRunStart=f=>g.onRunStart(f),t.Id=(f,$)=>{g.upload(f,$)}}else if(o==="webnn"){let g=p[0];[t.Sd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=p.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=f=>g.onRunStart(f),t.webnnOnRunEnd=g.onRunEnd.bind(g),t.webnnOnReleaseSession=f=>{g.onReleaseSession(f)},t.webnnCreateMLTensorDownloader=(f,$)=>g.createMLTensorDownloader(f,$),t.webnnRegisterMLTensor=(f,$,E,A)=>g.registerMLTensor(f,$,E,A),t.webnnCreateMLContext=f=>g.createMLContext(f),t.webnnRegisterGraphInput=g.registerGraphInput.bind(g),t.webnnIsGraphInput=g.isGraphInput.bind(g),t.webnnRegisterGraphOutput=g.registerGraphOutput.bind(g),t.webnnIsGraphOutput=g.isGraphOutput.bind(g),t.webnnCreateTemporaryTensor=g.createTemporaryTensor.bind(g),t.webnnIsGraphInputOutputTypeSupported=g.isGraphInputOutputTypeSupported.bind(g)}};let s=()=>{let o=p=>(...g)=>{let f=et;return g=p(...g),et!=f?new Promise(($,E)=>{Ti={resolve:$,reject:E}}):g};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[p]=o(t[p])})(),n!==void 0&&(t._OrtRun=n(t._OrtRun),t._OrtRunWithBinding=n(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s?.()};var u,l,d=(o,p)=>{throw p},h=import.meta.url,c="";if(r||i){try{c=new URL(".",h).href}catch{}i&&(l=o=>{var p=new XMLHttpRequest;return p.open("GET",o,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),u=o=>N(null,null,function*(){if(C(o))return new Promise((g,f)=>{var $=new XMLHttpRequest;$.open("GET",o,!0),$.responseType="arraybuffer",$.onload=()=>{$.status==200||$.status==0&&$.response?g($.response):f($.status)},$.onerror=f,$.send(null)});var p=yield fetch(o,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)})}var m,b,y,w,S,v,_=console.log.bind(console),k=console.error.bind(console),T=_,I=k,z=!1,C=o=>o.startsWith("file://");function x(){ct.buffer!=K.buffer&&Z()}if(a){let o=function(p){try{var g=p.data,f=g.Sc;if(f==="load"){let $=[];self.onmessage=E=>$.push(E),v=()=>{postMessage({Sc:"loaded"});for(let E of $)o(E);self.onmessage=o};for(let E of g.xd)t[E]&&!t[E].proxy||(t[E]=(...A)=>{postMessage({Sc:"callHandler",vd:E,args:A})},E=="print"&&(T=t[E]),E=="printErr"&&(I=t[E]));ct=g.Od,Z(),b=g.Pd,xe(),Lr()}else if(f==="run"){(function($){var E=(x(),L)[$+52>>>2>>>0];$=(x(),L)[$+56>>>2>>>0],Bs(E,E-$),ue(E)})(g.Rc),Ci(g.Rc,0,0,1,0,0),Rn(),vi(g.Rc),F||(Es(),F=!0);try{rm(g.Md,g.bd)}catch($){if($!="unwind")throw $}}else g.target!=="setimmediate"&&(f==="checkMailbox"?F&&Br():f&&(I(`worker: received unknown command ${f}`),I(g)))}catch($){throw Is(),$}};var P=o,F=!1;self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=o}var K,V,W,oe,O,L,ee,re,X,ne,D,J=!1;function Z(){var o=ct.buffer;t.HEAP8=K=new Int8Array(o),W=new Int16Array(o),t.HEAPU8=V=new Uint8Array(o),oe=new Uint16Array(o),t.HEAP32=O=new Int32Array(o),t.HEAPU32=L=new Uint32Array(o),ee=new Float32Array(o),re=new Float64Array(o),X=new BigInt64Array(o),ne=new BigUint64Array(o)}function H(){J=!0,a?v():nt.sb()}function _e(o){throw I(o="Aborted("+o+")"),z=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),S?.(o),o}function Ie(){return{a:{ma:Eg,hb:kg,g:im,J:am,f:nm,o:sm,i:om,$:um,b:lm,S:dm,Ia:Ln,n:pm,aa:Vn,Ya:Gn,Ea:Hn,Ga:jn,Za:Kn,Wa:Zn,Pa:Qn,Va:Xn,ka:Yn,Fa:Jn,Ca:es,Xa:ts,Da:rs,cb:cm,fa:fm,xa:mm,va:ym,ea:_m,N:wm,H:$m,wa:vm,_:zm,ya:Cm,Sa:Am,Aa:Bm,Ja:Rm,ta:Mm,ga:Dm,Ra:vi,$a:Nm,Q:qm,r:Hm,c:wi,ib:jm,y:Km,M:Zm,D:Qm,l:Xm,s:ds,jb:Ym,I:Jm,R:eg,j:tg,u:rg,q:ig,k:ag,Ma:ng,Na:sg,Oa:og,Ka:fs,La:ms,ua:gs,eb:lg,bb:cg,v:hg,ba:fg,ha:mg,ab:dg,V:gg,_a:yg,Ba:bg,F:ug,T:_g,la:Pr,za:$g,gb:wg,fb:vg,Ta:ws,Ua:$s,Ha:mi,U:vs,ja:xs,Qa:Ss,ia:Ts,lb:l0,na:a0,mb:u0,oa:i0,G:jg,e:Ag,t:zg,w:Ig,B:qg,nb:e0,Z:Jg,x:Rg,pa:t0,X:n0,ca:Yg,ob:Xg,pb:Qg,O:Fg,qa:Zg,qb:Kg,L:Gg,Y:r0,d:Cg,A:Bg,m:Og,kb:d0,p:Dg,z:Ng,C:Mg,E:Pg,K:Wg,ra:Hg,P:s0,da:Vg,W:o0,rb:Lg,sa:Ug,h:Sg,a:ct,db:fi}}}function xe(){return N(this,null,function*(){function o(f,$){var E=nt=f.exports;f={};for(let[A,M]of Object.entries(E))typeof M=="function"?(E=Pm(M),f[A]=E):f[A]=M;return nt=f,nt=(function(){var A=nt,M=G=>se=>G(se)>>>0,q=G=>()=>G()>>>0;return(A=Object.assign({},A)).tb=M(A.tb),A.Xb=q(A.Xb),A.Zb=M(A.Zb),A.lc=M(A.lc),A.mc=q(A.mc),A.qc=M(A.qc),A})(),On.push(nt._b),ks=(f=nt).tb,Es=f.ub,t._OrtInit=f.vb,t._OrtGetLastError=f.wb,t._OrtCreateSessionOptions=f.xb,t._OrtAppendExecutionProvider=f.yb,t._OrtAddFreeDimensionOverride=f.zb,t._OrtAddSessionConfigEntry=f.Ab,t._OrtReleaseSessionOptions=f.Bb,t._OrtCreateSession=f.Cb,t._OrtReleaseSession=f.Db,t._OrtGetInputOutputCount=f.Eb,t._OrtGetInputOutputMetadata=f.Fb,t._OrtFree=f.Gb,t._OrtCreateTensor=f.Hb,t._OrtGetTensorData=f.Ib,t._OrtReleaseTensor=f.Jb,t._OrtCreateRunOptions=f.Kb,t._OrtAddRunConfigEntry=f.Lb,t._OrtReleaseRunOptions=f.Mb,t._OrtCreateBinding=f.Nb,t._OrtBindInput=f.Ob,t._OrtBindOutput=f.Pb,t._OrtClearBoundOutputs=f.Qb,t._OrtReleaseBinding=f.Rb,t._OrtRunWithBinding=f.Sb,t._OrtRun=f.Tb,t._OrtEndProfiling=f.Ub,t._JsepOutput=f.Vb,t._JsepGetNodeName=f.Wb,Ur=f.Xb,tt=t._free=f.Yb,nr=t._malloc=f.Zb,Ci=f.ac,Is=f.bc,zs=f.cc,Cs=f.dc,Ai=f.ec,As=f.fc,Os=f.gc,de=f.hc,sr=f.ic,Bs=f.jc,ue=f.kc,Oi=f.lc,le=f.mc,Rs=f.nc,Bi=f.oc,Ms=f.pc,Ds=f.qc,Ns=f.rc,Ri=f.sc,Ps=f.tc,Us=f.uc,Ls=f.vc,qs=f.wc,Fs=f.xc,Ws=f.yc,Vs=f.zc,Gs=f.Ac,Hs=f.Bc,js=f.Cc,Ks=f.Dc,Zs=f.Ec,Qs=f.Fc,Xs=f.Gc,Ys=f.Hc,Js=f.Ic,eo=f.Jc,to=f.Kc,ro=f.Lc,io=f.Mc,ao=f.Nc,no=f.Pc,so=f.Qc,oo=f.$c,uo=f.ad,lo=f.fd,po=f.kd,co=f.ld,ho=f.md,fo=f.nd,mo=f.od,go=f.pd,yo=f.qd,bo=f.rd,_o=f.wd,wo=f.Ud,$o=f.Vd,vo=f.Wd,xo=f.Xd,b=$,nt}var p,g=Ie();return t.instantiateWasm?new Promise(f=>{t.instantiateWasm(g,($,E)=>{f(o($,E))})}):a?o(new WebAssembly.Instance(b,Ie()),b):(D??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",c):c+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,p=yield(function(f){return N(this,null,function*(){var $=D;if(!m&&!C($))try{var E=fetch($,{credentials:"same-origin"});return yield WebAssembly.instantiateStreaming(E,f)}catch(A){I(`wasm streaming compile failed: ${A}`),I("falling back to ArrayBuffer instantiation")}return(function(A,M){return N(this,null,function*(){try{var q=yield(function(G){return N(this,null,function*(){if(!m)try{var se=yield u(G);return new Uint8Array(se)}catch{}if(G==D&&m)G=new Uint8Array(m);else{if(!l)throw"both async and sync fetching of the wasm failed";G=l(G)}return G})})(A);return yield WebAssembly.instantiate(q,M)}catch(G){I(`failed to asynchronously prepare wasm: ${G}`),_e(G)}})})($,f)})})(g),o(p.instance,p.module))})}class Oe{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var ge=o=>{o.terminate(),o.onmessage=()=>{}},Se=[],Ne=0,xt=null,Ir=o=>{pt.length==0&&(Dn(),Mn(pt[0]));var p=pt.pop();if(!p)return 6;ir.push(p),St[o.Rc]=p,p.Rc=o.Rc;var g={Sc:"run",Md:o.Ld,bd:o.bd,Rc:o.Rc};return p.postMessage(g,o.jd),0},dt=0,ve=(o,p,...g)=>{var f,$=16*g.length,E=le(),A=Oi($),M=A>>>3;for(f of g)typeof f=="bigint"?((x(),X)[M++>>>0]=1n,(x(),X)[M++>>>0]=f):((x(),X)[M++>>>0]=0n,(x(),re)[M++>>>0]=f);return o=zs(o,0,$,A,p),ue(E),o};function fi(o){if(a)return ve(0,1,o);if(y=o,!(0<dt)){for(var p of ir)ge(p);for(p of pt)ge(p);pt=[],ir=[],St={},z=!0}d(0,new Oe(o))}function An(o){if(a)return ve(1,0,o);mi(o)}var mi=o=>{if(y=o,a)throw An(o),"unwind";fi(o)},pt=[],ir=[],On=[],St={},Bn=o=>{var p=o.Rc;delete St[p],pt.push(o),ir.splice(ir.indexOf(o),1),o.Rc=0,Cs(p)};function Rn(){On.forEach(o=>o())}var Mn=o=>new Promise(p=>{o.onmessage=$=>{var E=$.data;if($=E.Sc,E.Zc&&E.Zc!=Ur()){var A=St[E.Zc];A?A.postMessage(E,E.jd):I(`Internal error! Worker sent a message "${$}" to target pthread ${E.Zc}, but that thread no longer exists!`)}else $==="checkMailbox"?Br():$==="spawnThread"?Ir(E):$==="cleanupThread"?Or(()=>{Bn(St[E.Nd])}):$==="loaded"?(o.loaded=!0,p(o)):E.target==="setimmediate"?o.postMessage(E):$==="uncaughtException"?o.onerror(E.error):$==="callHandler"?t[E.vd](...E.args):$&&I(`worker sent an unknown command ${$}`)},o.onerror=$=>{throw I(`worker sent an error! ${$.filename}:${$.lineno}: ${$.message}`),$};var g,f=[];for(g of[])t.propertyIsEnumerable(g)&&f.push(g);o.postMessage({Sc:"load",xd:f,Od:ct,Pd:b})});function Dn(){var o=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});pt.push(o)}var ct,rm=(o,p)=>{dt=0,o=Ri(o,p),0<dt?y=o:Ai(o)},zr=[],Cr=0;function im(o){var p=new gi(o>>>=0);return(x(),K)[p.Tc+12>>>0]==0&&(Nn(p,!0),Cr--),Pn(p,!1),zr.push(p),Ds(o)}var Wt=0,am=()=>{de(0,0);var o=zr.pop();Rs(o.cd),Wt=0};function Nn(o,p){p=p?1:0,(x(),K)[o.Tc+12>>>0]=p}function Pn(o,p){p=p?1:0,(x(),K)[o.Tc+13>>>0]=p}class gi{constructor(p){this.cd=p,this.Tc=p-24}}var yi=o=>{var p=Wt;if(!p)return sr(0),0;var g=new gi(p);(x(),L)[g.Tc+16>>>2>>>0]=p;var f=(x(),L)[g.Tc+4>>>2>>>0];if(!f)return sr(0),p;for(var $ of o){if($===0||$===f)break;if(Ms($,f,g.Tc+16))return sr($),p}return sr(f),p};function nm(){return yi([])}function sm(o){return yi([o>>>0])}function om(o,p,g,f){return yi([o>>>0,p>>>0,g>>>0,f>>>0])}var um=()=>{var o=zr.pop();o||_e("no exception to throw");var p=o.cd;throw(x(),K)[o.Tc+13>>>0]==0&&(zr.push(o),Pn(o,!0),Nn(o,!1),Cr++),Bi(p),Wt=p};function lm(o,p,g){var f=new gi(o>>>=0);throw p>>>=0,g>>>=0,(x(),L)[f.Tc+16>>>2>>>0]=0,(x(),L)[f.Tc+4>>>2>>>0]=p,(x(),L)[f.Tc+8>>>2>>>0]=g,Bi(o),Cr++,Wt=o}var dm=()=>Cr;function Un(o,p,g,f){return a?ve(2,1,o,p,g,f):Ln(o,p,g,f)}function Ln(o,p,g,f){if(o>>>=0,p>>>=0,g>>>=0,f>>>=0,!globalThis.SharedArrayBuffer)return 6;var $=[];return a&&$.length===0?Un(o,p,g,f):(o={Ld:g,Rc:o,bd:f,jd:$},a?(o.Sc="spawnThread",postMessage(o,$),0):Ir(o))}function pm(o){throw Wt||=o>>>0,Wt}var qn=globalThis.TextDecoder&&new TextDecoder,Fn=(o,p,g,f)=>{if(g=p+g,f)return g;for(;o[p]&&!(p>=g);)++p;return p},Wn=(o,p=0,g,f)=>{if(16<(g=Fn(o,p>>>=0,g,f))-p&&o.buffer&&qn)return qn.decode(o.buffer instanceof ArrayBuffer?o.subarray(p,g):o.slice(p,g));for(f="";p<g;){var $=o[p++];if(128&$){var E=63&o[p++];if((224&$)==192)f+=String.fromCharCode((31&$)<<6|E);else{var A=63&o[p++];65536>($=(240&$)==224?(15&$)<<12|E<<6|A:(7&$)<<18|E<<12|A<<6|63&o[p++])?f+=String.fromCharCode($):($-=65536,f+=String.fromCharCode(55296|$>>10,56320|1023&$))}}else f+=String.fromCharCode($)}return f},Ee=(o,p,g)=>(o>>>=0)?Wn((x(),V),o,p,g):"";function Vn(o,p,g){return a?ve(3,1,o,p,g):0}function Gn(o,p){if(a)return ve(4,1,o,p)}function Hn(o,p){if(a)return ve(5,1,o,p)}function jn(o,p,g){if(a)return ve(6,1,o,p,g)}function Kn(o,p,g){return a?ve(7,1,o,p,g):0}function Zn(o,p){if(a)return ve(8,1,o,p)}function Qn(o,p,g){if(a)return ve(9,1,o,p,g)}function Xn(o,p,g,f){if(a)return ve(10,1,o,p,g,f)}function Yn(o,p,g,f){if(a)return ve(11,1,o,p,g,f)}function Jn(o,p,g,f){if(a)return ve(12,1,o,p,g,f)}function es(o){if(a)return ve(13,1,o)}function ts(o,p){if(a)return ve(14,1,o,p)}function rs(o,p,g){if(a)return ve(15,1,o,p,g)}var cm=()=>_e(""),Je=o=>{o>>>=0;for(var p="";;){var g=(x(),V)[o++>>>0];if(!g)return p;p+=String.fromCharCode(g)}},bi={},_i={},hm={},Vt=class extends Error{constructor(o){super(o),this.name="BindingError"}};function at(o,p,g={}){return(function(f,$,E={}){var A=$.name;if(!f)throw new Vt(`type "${A}" must have a positive integer typeid pointer`);if(_i.hasOwnProperty(f)){if(E.yd)return;throw new Vt(`Cannot register type '${A}' twice`)}_i[f]=$,delete hm[f],bi.hasOwnProperty(f)&&($=bi[f],delete bi[f],$.forEach(M=>M()))})(o,p,g)}var is=(o,p,g)=>{switch(p){case 1:return g?f=>(x(),K)[f>>>0]:f=>(x(),V)[f>>>0];case 2:return g?f=>(x(),W)[f>>>1>>>0]:f=>(x(),oe)[f>>>1>>>0];case 4:return g?f=>(x(),O)[f>>>2>>>0]:f=>(x(),L)[f>>>2>>>0];case 8:return g?f=>(x(),X)[f>>>3>>>0]:f=>(x(),ne)[f>>>3>>>0];default:throw new TypeError(`invalid integer width (${p}): ${o}`)}};function fm(o,p,g,f,$){o>>>=0,g>>>=0,p=Je(p>>>0);let E=A=>A;if(f=f===0n){let A=8*g;E=M=>BigInt.asUintN(A,M),$=E($)}at(o,{name:p,Oc:E,Vc:(A,M)=>(typeof M=="number"&&(M=BigInt(M)),M),Uc:is(p,g,!f),Wc:null})}function mm(o,p,g,f){at(o>>>=0,{name:p=Je(p>>>0),Oc:function($){return!!$},Vc:function($,E){return E?g:f},Uc:function($){return this.Oc((x(),V)[$>>>0])},Wc:null})}var as=[],Tt=[0,1,,1,null,1,!0,1,!1,1];function wi(o){9<(o>>>=0)&&--Tt[o+1]===0&&(Tt[o]=void 0,as.push(o))}var qe=o=>{if(!o)throw new Vt(`Cannot use deleted val. handle = ${o}`);return Tt[o]},Ge=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=as.pop()||Tt.length;return Tt[p]=o,Tt[p+1]=1,p}};function $i(o){return this.Oc((x(),L)[o>>>2>>>0])}var gm={name:"emscripten::val",Oc:o=>{var p=qe(o);return wi(o),p},Vc:(o,p)=>Ge(p),Uc:$i,Wc:null};function ym(o){return at(o>>>0,gm)}var bm=(o,p)=>{switch(p){case 4:return function(g){return this.Oc((x(),ee)[g>>>2>>>0])};case 8:return function(g){return this.Oc((x(),re)[g>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${o}`)}};function _m(o,p,g){g>>>=0,at(o>>>=0,{name:p=Je(p>>>0),Oc:f=>f,Vc:(f,$)=>$,Uc:bm(p,g),Wc:null})}function wm(o,p,g,f,$){o>>>=0,g>>>=0,p=Je(p>>>0);let E=M=>M;if(f===0){var A=32-8*g;E=M=>M<<A>>>A,$=E($)}at(o,{name:p,Oc:E,Vc:(M,q)=>q,Uc:is(p,g,f!==0),Wc:null})}function $m(o,p,g){function f(E){var A=(x(),L)[E>>>2>>>0];return E=(x(),L)[E+4>>>2>>>0],new $((x(),K).buffer,E,A)}var $=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];at(o>>>=0,{name:g=Je(g>>>0),Oc:f,Uc:f},{yd:!0})}var ht=(o,p,g)=>{var f=(x(),V);if(p>>>=0,0<g){var $=p;g=p+g-1;for(var E=0;E<o.length;++E){var A=o.codePointAt(E);if(127>=A){if(p>=g)break;f[p++>>>0]=A}else if(2047>=A){if(p+1>=g)break;f[p++>>>0]=192|A>>6,f[p++>>>0]=128|63&A}else if(65535>=A){if(p+2>=g)break;f[p++>>>0]=224|A>>12,f[p++>>>0]=128|A>>6&63,f[p++>>>0]=128|63&A}else{if(p+3>=g)break;f[p++>>>0]=240|A>>18,f[p++>>>0]=128|A>>12&63,f[p++>>>0]=128|A>>6&63,f[p++>>>0]=128|63&A,E++}}f[p>>>0]=0,o=p-$}else o=0;return o},Ar=o=>{for(var p=0,g=0;g<o.length;++g){var f=o.charCodeAt(g);127>=f?p++:2047>=f?p+=2:55296<=f&&57343>=f?(p+=4,++g):p+=3}return p};function vm(o,p){at(o>>>=0,{name:p=Je(p>>>0),Oc(g){var f=(x(),L)[g>>>2>>>0];return f=Ee(g+4,f,!0),tt(g),f},Vc(g,f){f instanceof ArrayBuffer&&(f=new Uint8Array(f));var $=typeof f=="string";if(!($||ArrayBuffer.isView(f)&&f.BYTES_PER_ELEMENT==1))throw new Vt("Cannot pass non-string to std::string");var E=$?Ar(f):f.length,A=nr(4+E+1),M=A+4;return(x(),L)[A>>>2>>>0]=E,$?ht(f,M,E+1):(x(),V).set(f,M>>>0),g!==null&&g.push(tt,A),A},Uc:$i,Wc(g){tt(g)}})}var ns=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,xm=(o,p,g)=>{if(o>>>=1,16<(p=Fn((x(),oe),o,p/2,g))-o&&ns)return ns.decode((x(),oe).slice(o,p));for(g="";o<p;++o){var f=(x(),oe)[o>>>0];g+=String.fromCharCode(f)}return g},Sm=(o,p,g)=>{if(g??=2147483647,2>g)return 0;var f=p;g=(g-=2)<2*o.length?g/2:o.length;for(var $=0;$<g;++$){var E=o.charCodeAt($);(x(),W)[p>>>1>>>0]=E,p+=2}return(x(),W)[p>>>1>>>0]=0,p-f},Tm=o=>2*o.length,km=(o,p,g)=>{var f="";o>>>=2;for(var $=0;!($>=p/4);$++){var E=(x(),L)[o+$>>>0];if(!E&&!g)break;f+=String.fromCodePoint(E)}return f},Em=(o,p,g)=>{if(p>>>=0,g??=2147483647,4>g)return 0;var f=p;g=f+g-4;for(var $=0;$<o.length;++$){var E=o.codePointAt($);if(65535<E&&$++,(x(),O)[p>>>2>>>0]=E,(p+=4)+4>g)break}return(x(),O)[p>>>2>>>0]=0,p-f},Im=o=>{for(var p=0,g=0;g<o.length;++g)65535<o.codePointAt(g)&&g++,p+=4;return p};function zm(o,p,g){if(o>>>=0,p>>>=0,g=Je(g>>>=0),p===2)var f=xm,$=Sm,E=Tm;else f=km,$=Em,E=Im;at(o,{name:g,Oc:A=>{var M=(x(),L)[A>>>2>>>0];return M=f(A+4,M*p,!0),tt(A),M},Vc:(A,M)=>{if(typeof M!="string")throw new Vt(`Cannot pass non-string to C++ string type ${g}`);var q=E(M),G=nr(4+q+p);return(x(),L)[G>>>2>>>0]=q/p,$(M,G+4,q+p),A!==null&&A.push(tt,G),G},Uc:$i,Wc(A){tt(A)}})}function Cm(o,p){at(o>>>=0,{zd:!0,name:p=Je(p>>>0),Oc:()=>{},Vc:()=>{}})}function Am(o){Ci(o>>>0,!i,1,!r,131072,!1),Rn()}var Or=o=>{if(!z)try{if(o(),!(0<dt))try{a?Ur()&&Ai(y):mi(y)}catch(p){p instanceof Oe||p=="unwind"||d(0,p)}}catch(p){p instanceof Oe||p=="unwind"||d(0,p)}},Om=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function vi(o){o>>>=0,Om||(Atomics.waitAsync((x(),O),o>>>2,o).value.then(Br),o+=128,Atomics.store((x(),O),o>>>2,1))}var Br=()=>Or(()=>{var o=Ur();o&&(vi(o),Os())});function Bm(o,p){(o>>>=0)==p>>>0?setTimeout(Br):a?postMessage({Zc:o,Sc:"checkMailbox"}):(o=St[o])&&o.postMessage({Sc:"checkMailbox"})}var xi=[];function Rm(o,p,g,f,$){for(p>>>=0,$>>>=0,xi.length=0,g=$>>>3,f=$+f>>>3;g<f;){var E;E=(x(),X)[g++>>>0]?(x(),X)[g++>>>0]:(x(),re)[g++>>>0],xi.push(E)}return(p?Mi[p]:Tg[o])(...xi)}var Mm=()=>{dt=0};function Dm(o){o>>>=0,a?postMessage({Sc:"cleanupThread",Nd:o}):Bn(St[o])}function Nm(o){}var Rr=o=>{try{o()}catch(p){_e(p)}};function Pm(o){var p=(...g)=>{Mr.push(o);try{return o(...g)}finally{z||(Mr.pop(),et&&ft===1&&Mr.length===0&&(ft=0,dt+=1,Rr($o),typeof Fibers<"u"&&Fibers.be()))}};return us.set(o,p),p}var ft=0,et=null,ss=0,Mr=[],Si=new Map,os=new Map,us=new Map,Um=0,Ti=null,Lm=[],ls=o=>(function(p){if(!z){if(ft===0){var g=!1,f=!1;p(($=0)=>{if(!z&&(ss=$,g=!0,f)){ft=2,Rr(()=>vo(et)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),$=!1;try{var E=(function(){var q=(x(),O)[et+8>>>2>>>0];return q=os.get(q),q=us.get(q),--dt,q()})()}catch(q){E=q,$=!0}var A=!1;if(!et){var M=Ti;M&&(Ti=null,($?M.reject:M.resolve)(E),A=!0)}if($&&!A)throw E}}),f=!0,g||(ft=1,et=(function(){var $=nr(65548),E=$+12;if((x(),L)[$>>>2>>>0]=E,(x(),L)[$+4>>>2>>>0]=E+65536,E=Mr[0],!Si.has(E)){var A=Um++;Si.set(E,A),os.set(A,E)}return E=Si.get(E),(x(),O)[$+8>>>2>>>0]=E,$})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),Rr(()=>wo(et)))}else ft===2?(ft=0,Rr(xo),tt(et),et=null,Lm.forEach(Or)):_e(`invalid state: ${ft}`);return ss}})(p=>{o().then(p)});function qm(o){return o>>>=0,ls(()=>N(null,null,function*(){var p=yield qe(o);return Ge(p)}))}var ki=[],Fm=o=>{var p=ki.length;return ki.push(o),p},Wm=(o,p)=>{for(var g=Array(o),f=0;f<o;++f){var $=f,E=(x(),L)[p+4*f>>>2>>>0],A=_i[E];if(A===void 0)throw o=`parameter ${f}`,E=ks(E),p=Je(E),tt(E),new Vt(`${o} has unknown type ${p}`);g[$]=A}return g},Vm=(o,p,g)=>{var f=[];return o=o(f,g),f.length&&((x(),L)[p>>>2>>>0]=Ge(f)),o},Gm={},Dr=o=>{var p=Gm[o];return p===void 0?Je(o):p};function Hm(o,p,g){var[f,...$]=Wm(o,p>>>0);p=f.Vc.bind(f);var E=$.map(q=>q.Uc.bind(q));o--;var A={toValue:qe};switch(o=E.map((q,G)=>{var se=`argFromPtr${G}`;return A[se]=q,`${se}(args${G?"+"+8*G:""})`}),g){case 0:var M="toValue(handle)";break;case 2:M="new (toValue(handle))";break;case 3:M="";break;case 1:A.getStringOrSymbol=Dr,M="toValue(handle)[getStringOrSymbol(methodName)]"}return M+=`(${o})`,f.zd||(A.toReturnWire=p,A.emval_returnValue=Vm,M=`return emval_returnValue(toReturnWire, destructorsRef, ${M})`),M=`return function (handle, methodName, destructorsRef, args) {
  ${M}
  }`,g=new Function(Object.keys(A),M)(...Object.values(A)),M=`methodCaller<(${$.map(q=>q.name)}) => ${f.name}>`,Fm(Object.defineProperty(g,"name",{value:M}))}function jm(o,p){return p>>>=0,(o=qe(o>>>0))==qe(p)}function Km(o){return(o>>>=0)?(o=Dr(o),Ge(globalThis[o])):Ge(globalThis)}function Zm(o){return o=Dr(o>>>0),Ge(t[o])}function Qm(o,p){return p>>>=0,o=qe(o>>>0),p=qe(p),Ge(o[p])}function Xm(o){9<(o>>>=0)&&(Tt[o+1]+=1)}function ds(o,p,g,f,$){return ki[o>>>0](p>>>0,g>>>0,f>>>0,$>>>0)}function Ym(o,p,g,f,$){return ds(o>>>0,p>>>0,g>>>0,f>>>0,$>>>0)}function Jm(){return Ge([])}function eg(o){o=qe(o>>>0);for(var p=Array(o.length),g=0;g<o.length;g++)p[g]=o[g];return Ge(p)}function tg(o){return Ge(Dr(o>>>0))}function rg(){return Ge({})}function ig(o){for(var p=qe(o>>>=0);p.length;){var g=p.pop();p.pop()(g)}wi(o)}function ag(o,p,g){p>>>=0,g>>>=0,o=qe(o>>>0),p=qe(p),g=qe(g),o[p]=g}function ng(o,p){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),p>>>=0,o=new Date(1e3*o),(x(),O)[p>>>2>>>0]=o.getUTCSeconds(),(x(),O)[p+4>>>2>>>0]=o.getUTCMinutes(),(x(),O)[p+8>>>2>>>0]=o.getUTCHours(),(x(),O)[p+12>>>2>>>0]=o.getUTCDate(),(x(),O)[p+16>>>2>>>0]=o.getUTCMonth(),(x(),O)[p+20>>>2>>>0]=o.getUTCFullYear()-1900,(x(),O)[p+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(x(),O)[p+28>>>2>>>0]=o}var ps=o=>o%4==0&&(o%100!=0||o%400==0),cs=[0,31,60,91,121,152,182,213,244,274,305,335],hs=[0,31,59,90,120,151,181,212,243,273,304,334];function sg(o,p){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),p>>>=0,o=new Date(1e3*o),(x(),O)[p>>>2>>>0]=o.getSeconds(),(x(),O)[p+4>>>2>>>0]=o.getMinutes(),(x(),O)[p+8>>>2>>>0]=o.getHours(),(x(),O)[p+12>>>2>>>0]=o.getDate(),(x(),O)[p+16>>>2>>>0]=o.getMonth(),(x(),O)[p+20>>>2>>>0]=o.getFullYear()-1900,(x(),O)[p+24>>>2>>>0]=o.getDay();var g=(ps(o.getFullYear())?cs:hs)[o.getMonth()]+o.getDate()-1|0;(x(),O)[p+28>>>2>>>0]=g,(x(),O)[p+36>>>2>>>0]=-60*o.getTimezoneOffset(),g=new Date(o.getFullYear(),6,1).getTimezoneOffset();var f=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(g!=f&&o.getTimezoneOffset()==Math.min(f,g)),(x(),O)[p+32>>>2>>>0]=o}function og(o){o>>>=0;var p=new Date((x(),O)[o+20>>>2>>>0]+1900,(x(),O)[o+16>>>2>>>0],(x(),O)[o+12>>>2>>>0],(x(),O)[o+8>>>2>>>0],(x(),O)[o+4>>>2>>>0],(x(),O)[o>>>2>>>0],0),g=(x(),O)[o+32>>>2>>>0],f=p.getTimezoneOffset(),$=new Date(p.getFullYear(),6,1).getTimezoneOffset(),E=new Date(p.getFullYear(),0,1).getTimezoneOffset(),A=Math.min(E,$);return 0>g?(x(),O)[o+32>>>2>>>0]=+($!=E&&A==f):0<g!=(A==f)&&($=Math.max(E,$),p.setTime(p.getTime()+6e4*((0<g?A:$)-f))),(x(),O)[o+24>>>2>>>0]=p.getDay(),g=(ps(p.getFullYear())?cs:hs)[p.getMonth()]+p.getDate()-1|0,(x(),O)[o+28>>>2>>>0]=g,(x(),O)[o>>>2>>>0]=p.getSeconds(),(x(),O)[o+4>>>2>>>0]=p.getMinutes(),(x(),O)[o+8>>>2>>>0]=p.getHours(),(x(),O)[o+12>>>2>>>0]=p.getDate(),(x(),O)[o+16>>>2>>>0]=p.getMonth(),(x(),O)[o+20>>>2>>>0]=p.getYear(),o=p.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function fs(o,p,g,f,$,E,A){return a?ve(16,1,o,p,g,f,$,E,A):-52}function ms(o,p,g,f,$,E){if(a)return ve(17,1,o,p,g,f,$,E)}var ar={},ug=()=>performance.timeOrigin+performance.now();function gs(o,p){if(a)return ve(18,1,o,p);if(ar[o]&&(clearTimeout(ar[o].id),delete ar[o]),!p)return 0;var g=setTimeout(()=>{delete ar[o],Or(()=>As(o,performance.timeOrigin+performance.now()))},p);return ar[o]={id:g,ae:p},0}function lg(o,p,g,f){o>>>=0,p>>>=0,g>>>=0,f>>>=0;var $=new Date().getFullYear(),E=new Date($,0,1).getTimezoneOffset();$=new Date($,6,1).getTimezoneOffset();var A=Math.max(E,$);(x(),L)[o>>>2>>>0]=60*A,(x(),O)[p>>>2>>>0]=+(E!=$),o=(p=M=>{var q=Math.abs(M);return`UTC${0<=M?"-":"+"}${String(Math.floor(q/60)).padStart(2,"0")}${String(q%60).padStart(2,"0")}`})(E),p=p($),$<E?(ht(o,g,17),ht(p,f,17)):(ht(o,f,17),ht(p,g,17))}var dg=()=>Date.now(),pg=1;function cg(o,p,g){if(g>>>=0,!(0<=o&&3>=o))return 28;if(o===0)o=Date.now();else{if(!pg)return 52;o=performance.timeOrigin+performance.now()}return o=Math.round(1e6*o),(x(),X)[g>>>3>>>0]=BigInt(o),0}var Ei=[],ys=(o,p)=>{Ei.length=0;for(var g;g=(x(),V)[o++>>>0];){var f=g!=105;p+=(f&=g!=112)&&p%8?4:0,Ei.push(g==112?(x(),L)[p>>>2>>>0]:g==106?(x(),X)[p>>>3>>>0]:g==105?(x(),O)[p>>>2>>>0]:(x(),re)[p>>>3>>>0]),p+=f?8:4}return Ei};function hg(o,p,g){return o>>>=0,p=ys(p>>>0,g>>>0),Mi[o](...p)}function fg(o,p,g){return o>>>=0,p=ys(p>>>0,g>>>0),Mi[o](...p)}var mg=()=>{};function gg(o,p){return I(Ee(o>>>0,p>>>0))}var yg=()=>{throw dt+=1,"unwind"};function bg(){return 4294901760}var _g=()=>navigator.hardwareConcurrency,kt={},Nr=o=>{var p;return(p=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+p[1]:(p=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+p[1]:0},bs=o=>{for(var p of o)(o=Nr(p))&&(kt[o]=p)};function wg(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),bs(o),kt.gd=Nr(o[3]),kt.Jd=o,kt.gd}function Pr(o){if(!(o=kt[o>>>0]))return 0;var p;if(p=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=p[1];else if(p=/^\s+at (.*) \(.*\)$/.exec(o))o=p[1];else{if(!(p=/^(.+?)@/.exec(o)))return 0;o=p[1]}tt(Pr.hd??0),p=Ar(o)+1;var g=nr(p);return g&&ht(o,g,p),Pr.hd=g,Pr.hd}function $g(o){o>>>=0;var p=(x(),V).length;if(o<=p||4294901760<o)return!1;for(var g=1;4>=g;g*=2){var f=p*(1+.2/g);f=Math.min(f,o+100663296);e:{f=(Math.min(4294901760,65536*Math.ceil(Math.max(o,f)/65536))-ct.buffer.byteLength+65535)/65536|0;try{ct.grow(f),Z();var $=1;break e}catch{}$=void 0}if($)return!0}return!1}function vg(o,p,g){if(o>>>=0,p>>>=0,kt.gd==o)var f=kt.Jd;else(f=Error().stack.toString().split(`
`))[0]=="Error"&&f.shift(),bs(f);for(var $=3;f[$]&&Nr(f[$])!=o;)++$;for(o=0;o<g&&f[o+$];++o)(x(),O)[p+4*o>>>2>>>0]=Nr(f[o+$]);return o}var Ii,zi={},_s=()=>{if(!Ii){var o,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in zi)zi[o]===void 0?delete p[o]:p[o]=zi[o];var g=[];for(o in p)g.push(`${o}=${p[o]}`);Ii=g}return Ii};function ws(o,p){if(a)return ve(19,1,o,p);o>>>=0,p>>>=0;var g,f=0,$=0;for(g of _s()){var E=p+f;(x(),L)[o+$>>>2>>>0]=E,f+=ht(g,E,1/0)+1,$+=4}return 0}function $s(o,p){if(a)return ve(20,1,o,p);o>>>=0,p>>>=0;var g=_s();for(var f of((x(),L)[o>>>2>>>0]=g.length,o=0,g))o+=Ar(f)+1;return(x(),L)[p>>>2>>>0]=o,0}function vs(o){return a?ve(21,1,o):52}function xs(o,p,g,f){return a?ve(22,1,o,p,g,f):52}function Ss(o,p,g,f){return a?ve(23,1,o,p,g,f):70}var xg=[null,[],[]];function Ts(o,p,g,f){if(a)return ve(24,1,o,p,g,f);p>>>=0,g>>>=0,f>>>=0;for(var $=0,E=0;E<g;E++){var A=(x(),L)[p>>>2>>>0],M=(x(),L)[p+4>>>2>>>0];p+=8;for(var q=0;q<M;q++){var G=o,se=(x(),V)[A+q>>>0],ce=xg[G];se===0||se===10?((G===1?T:I)(Wn(ce)),ce.length=0):ce.push(se)}$+=M}return(x(),L)[f>>>2>>>0]=$,0}function Sg(o){return o>>>0}a||(function(){for(var o=t.numThreads-1;o--;)Dn();Se.push(()=>N(null,null,function*(){var p=(function(){return N(this,null,function*(){if(!a)return Promise.all(pt.map(Mn))})})();Ne++,yield p,--Ne==0&&xt&&(p=xt,xt=null,p())}))})(),a||(ct=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Z()),t.wasmBinary&&(m=t.wasmBinary),t.stackSave=()=>le(),t.stackRestore=o=>ue(o),t.stackAlloc=o=>Oi(o),t.setValue=function(o,p,g="i8"){switch(g.endsWith("*")&&(g="*"),g){case"i1":case"i8":(x(),K)[o>>>0]=p;break;case"i16":(x(),W)[o>>>1>>>0]=p;break;case"i32":(x(),O)[o>>>2>>>0]=p;break;case"i64":(x(),X)[o>>>3>>>0]=BigInt(p);break;case"float":(x(),ee)[o>>>2>>>0]=p;break;case"double":(x(),re)[o>>>3>>>0]=p;break;case"*":(x(),L)[o>>>2>>>0]=p;break;default:_e(`invalid type for setValue: ${g}`)}},t.getValue=function(o,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return(x(),K)[o>>>0];case"i16":return(x(),W)[o>>>1>>>0];case"i32":return(x(),O)[o>>>2>>>0];case"i64":return(x(),X)[o>>>3>>>0];case"float":return(x(),ee)[o>>>2>>>0];case"double":return(x(),re)[o>>>3>>>0];case"*":return(x(),L)[o>>>2>>>0];default:_e(`invalid type for getValue: ${p}`)}},t.UTF8ToString=Ee,t.stringToUTF8=ht,t.lengthBytesUTF8=Ar;var ks,Es,Ur,tt,nr,Ci,Is,zs,Cs,Ai,As,Os,de,sr,Bs,ue,Oi,le,Rs,Bi,Ms,Ds,Ns,Ri,Ps,Us,Ls,qs,Fs,Ws,Vs,Gs,Hs,js,Ks,Zs,Qs,Xs,Ys,Js,eo,to,ro,io,ao,no,so,oo,uo,lo,po,co,ho,fo,mo,go,yo,bo,_o,wo,$o,vo,xo,nt,Tg=[fi,An,Un,Vn,Gn,Hn,jn,Kn,Zn,Qn,Xn,Yn,Jn,es,ts,rs,fs,ms,gs,ws,$s,vs,xs,Ss,Ts],Mi={1055492:(o,p,g,f,$)=>{if(t===void 0||!t.Yc)return 1;if((o=Ee(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.Yc.get(o)))return 2;if(p=Number(p>>>0),g=Number(g>>>0),f=Number(f>>>0),p+g>o.byteLength)return 3;try{let E=o.subarray(p,p+g);switch($){case 0:(x(),V).set(E,f>>>0);break;case 1:t.Qd?t.Qd(f,E):t.Id(f,E);break;default:return 4}return 0}catch{return 4}},1056316:(o,p,g)=>{t.td(o,(x(),V).subarray(p>>>0,p+g>>>0))},1056380:()=>t.Sd(),1056422:o=>{t.sd(o)},1056459:()=>{t.Bd()},1056490:()=>{t.Cd()},1056519:()=>{t.Gd()},1056544:o=>t.Ad(o),1056577:o=>t.Ed(o),1056609:(o,p,g)=>{t.ed(Number(o),Number(p),Number(g),!0)},1056672:(o,p,g)=>{t.ed(Number(o),Number(p),Number(g))},1056729:()=>typeof wasmOffsetConverter<"u",1056786:o=>{t.$b("Abs",o,void 0)},1056837:o=>{t.$b("Neg",o,void 0)},1056888:o=>{t.$b("Floor",o,void 0)},1056941:o=>{t.$b("Ceil",o,void 0)},1056993:o=>{t.$b("Reciprocal",o,void 0)},1057051:o=>{t.$b("Sqrt",o,void 0)},1057103:o=>{t.$b("Exp",o,void 0)},1057154:o=>{t.$b("Erf",o,void 0)},1057205:o=>{t.$b("Sigmoid",o,void 0)},1057260:(o,p,g)=>{t.$b("HardSigmoid",o,{alpha:p,beta:g})},1057339:o=>{t.$b("HardSwish",o,void 0)},1057396:o=>{t.$b("Log",o,void 0)},1057447:o=>{t.$b("Sin",o,void 0)},1057498:o=>{t.$b("Cos",o,void 0)},1057549:o=>{t.$b("Tan",o,void 0)},1057600:o=>{t.$b("Asin",o,void 0)},1057652:o=>{t.$b("Acos",o,void 0)},1057704:o=>{t.$b("Atan",o,void 0)},1057756:o=>{t.$b("Sinh",o,void 0)},1057808:o=>{t.$b("Cosh",o,void 0)},1057860:o=>{t.$b("Asinh",o,void 0)},1057913:o=>{t.$b("Acosh",o,void 0)},1057966:o=>{t.$b("Atanh",o,void 0)},1058019:o=>{t.$b("Tanh",o,void 0)},1058071:o=>{t.$b("Not",o,void 0)},1058122:(o,p,g)=>{t.$b("Clip",o,{min:p,max:g})},1058191:o=>{t.$b("Clip",o,void 0)},1058243:(o,p)=>{t.$b("Elu",o,{alpha:p})},1058301:o=>{t.$b("Gelu",o,void 0)},1058353:o=>{t.$b("Relu",o,void 0)},1058405:(o,p)=>{t.$b("LeakyRelu",o,{alpha:p})},1058469:(o,p)=>{t.$b("ThresholdedRelu",o,{alpha:p})},1058539:(o,p)=>{t.$b("Cast",o,{to:p})},1058597:o=>{t.$b("Add",o,void 0)},1058648:o=>{t.$b("Sub",o,void 0)},1058699:o=>{t.$b("Mul",o,void 0)},1058750:o=>{t.$b("Div",o,void 0)},1058801:o=>{t.$b("Pow",o,void 0)},1058852:o=>{t.$b("Equal",o,void 0)},1058905:o=>{t.$b("Greater",o,void 0)},1058960:o=>{t.$b("GreaterOrEqual",o,void 0)},1059022:o=>{t.$b("Less",o,void 0)},1059074:o=>{t.$b("LessOrEqual",o,void 0)},1059133:(o,p,g,f,$)=>{t.$b("ReduceMean",o,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1059308:(o,p,g,f,$)=>{t.$b("ReduceMax",o,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1059482:(o,p,g,f,$)=>{t.$b("ReduceMin",o,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1059656:(o,p,g,f,$)=>{t.$b("ReduceProd",o,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1059831:(o,p,g,f,$)=>{t.$b("ReduceSum",o,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1060005:(o,p,g,f,$)=>{t.$b("ReduceL1",o,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1060178:(o,p,g,f,$)=>{t.$b("ReduceL2",o,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1060351:(o,p,g,f,$)=>{t.$b("ReduceLogSum",o,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1060528:(o,p,g,f,$)=>{t.$b("ReduceSumSquare",o,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1060708:(o,p,g,f,$)=>{t.$b("ReduceLogSumExp",o,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1060888:o=>{t.$b("Where",o,void 0)},1060941:(o,p,g)=>{t.$b("Transpose",o,{perm:p?Array.from((x(),O).subarray(Number(p)>>>0,Number(g)>>>0)):[]})},1061065:(o,p,g,f)=>{t.$b("DepthToSpace",o,{blocksize:p,mode:Ee(g),format:f?"NHWC":"NCHW"})},1061198:(o,p,g,f)=>{t.$b("DepthToSpace",o,{blocksize:p,mode:Ee(g),format:f?"NHWC":"NCHW"})},1061331:(o,p,g,f)=>{t.$b("DFT",o,{axis:p,inverse:g,onesided:f})},1061423:(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e,mt)=>{t.$b("ConvTranspose",o,{format:q?"NHWC":"NCHW",autoPad:p,dilations:[g],group:f,kernelShape:[$],pads:[E,A],strides:[M],wIsConst:()=>!!(x(),K)[G>>>0],outputPadding:se?Array.from((x(),O).subarray(Number(se)>>>0,Number(ce)>>>0)):[],outputShape:ye?Array.from((x(),O).subarray(Number(ye)>>>0,Number($e)>>>0)):[],activation:Ee(mt)})},1061856:(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e)=>{t.$b("ConvTranspose",o,{format:M?"NHWC":"NCHW",autoPad:p,dilations:Array.from((x(),O).subarray(Number(g)>>>0,(Number(g)>>>0)+2>>>0)),group:f,kernelShape:Array.from((x(),O).subarray(Number($)>>>0,(Number($)>>>0)+2>>>0)),pads:Array.from((x(),O).subarray(Number(E)>>>0,(Number(E)>>>0)+4>>>0)),strides:Array.from((x(),O).subarray(Number(A)>>>0,(Number(A)>>>0)+2>>>0)),wIsConst:()=>!!(x(),K)[q>>>0],outputPadding:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(se)>>>0)):[],outputShape:ce?Array.from((x(),O).subarray(Number(ce)>>>0,Number(ye)>>>0)):[],activation:Ee($e)})},1062517:(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e,mt)=>{t.$b("ConvTranspose",o,{format:q?"NHWC":"NCHW",autoPad:p,dilations:[g],group:f,kernelShape:[$],pads:[E,A],strides:[M],wIsConst:()=>!!(x(),K)[G>>>0],outputPadding:se?Array.from((x(),O).subarray(Number(se)>>>0,Number(ce)>>>0)):[],outputShape:ye?Array.from((x(),O).subarray(Number(ye)>>>0,Number($e)>>>0)):[],activation:Ee(mt)})},1062950:(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e)=>{t.$b("ConvTranspose",o,{format:M?"NHWC":"NCHW",autoPad:p,dilations:Array.from((x(),O).subarray(Number(g)>>>0,(Number(g)>>>0)+2>>>0)),group:f,kernelShape:Array.from((x(),O).subarray(Number($)>>>0,(Number($)>>>0)+2>>>0)),pads:Array.from((x(),O).subarray(Number(E)>>>0,(Number(E)>>>0)+4>>>0)),strides:Array.from((x(),O).subarray(Number(A)>>>0,(Number(A)>>>0)+2>>>0)),wIsConst:()=>!!(x(),K)[q>>>0],outputPadding:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(se)>>>0)):[],outputShape:ce?Array.from((x(),O).subarray(Number(ce)>>>0,Number(ye)>>>0)):[],activation:Ee($e)})},1063611:(o,p)=>{t.$b("GlobalAveragePool",o,{format:p?"NHWC":"NCHW"})},1063702:(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e)=>{t.$b("AveragePool",o,{format:$e?"NHWC":"NCHW",auto_pad:p,ceil_mode:g,count_include_pad:f,storage_order:$,dilations:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:M?Array.from((x(),O).subarray(Number(M)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(se)>>>0)):[],strides:ce?Array.from((x(),O).subarray(Number(ce)>>>0,Number(ye)>>>0)):[]})},1064181:(o,p)=>{t.$b("GlobalAveragePool",o,{format:p?"NHWC":"NCHW"})},1064272:(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e)=>{t.$b("AveragePool",o,{format:$e?"NHWC":"NCHW",auto_pad:p,ceil_mode:g,count_include_pad:f,storage_order:$,dilations:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:M?Array.from((x(),O).subarray(Number(M)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(se)>>>0)):[],strides:ce?Array.from((x(),O).subarray(Number(ce)>>>0,Number(ye)>>>0)):[]})},1064751:(o,p)=>{t.$b("GlobalMaxPool",o,{format:p?"NHWC":"NCHW"})},1064838:(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e)=>{t.$b("MaxPool",o,{format:$e?"NHWC":"NCHW",auto_pad:p,ceil_mode:g,count_include_pad:f,storage_order:$,dilations:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:M?Array.from((x(),O).subarray(Number(M)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(se)>>>0)):[],strides:ce?Array.from((x(),O).subarray(Number(ce)>>>0,Number(ye)>>>0)):[]})},1065313:(o,p)=>{t.$b("GlobalMaxPool",o,{format:p?"NHWC":"NCHW"})},1065400:(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e)=>{t.$b("MaxPool",o,{format:$e?"NHWC":"NCHW",auto_pad:p,ceil_mode:g,count_include_pad:f,storage_order:$,dilations:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:M?Array.from((x(),O).subarray(Number(M)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(se)>>>0)):[],strides:ce?Array.from((x(),O).subarray(Number(ce)>>>0,Number(ye)>>>0)):[]})},1065875:(o,p,g,f,$)=>{t.$b("Gemm",o,{alpha:p,beta:g,transA:f,transB:$})},1065979:o=>{t.$b("MatMul",o,void 0)},1066033:(o,p,g,f)=>{t.$b("ArgMax",o,{keepDims:!!p,selectLastIndex:!!g,axis:f})},1066141:(o,p,g,f)=>{t.$b("ArgMin",o,{keepDims:!!p,selectLastIndex:!!g,axis:f})},1066249:(o,p)=>{t.$b("Softmax",o,{axis:p})},1066312:(o,p)=>{t.$b("Concat",o,{axis:p})},1066372:(o,p,g,f,$)=>{t.$b("Split",o,{axis:p,numOutputs:g,splitSizes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1066528:o=>{t.$b("Expand",o,void 0)},1066582:(o,p)=>{t.$b("Gather",o,{axis:Number(p)})},1066653:(o,p)=>{t.$b("GatherElements",o,{axis:Number(p)})},1066732:(o,p)=>{t.$b("GatherND",o,{batch_dims:Number(p)})},1066811:(o,p,g,f,$,E,A,M,q,G,se)=>{t.$b("Resize",o,{antialias:p,axes:g?Array.from((x(),O).subarray(Number(g)>>>0,Number(f)>>>0)):[],coordinateTransformMode:Ee($),cubicCoeffA:E,excludeOutside:A,extrapolationValue:M,keepAspectRatioPolicy:Ee(q),mode:Ee(G),nearestMode:Ee(se)})},1067173:(o,p,g,f,$,E,A)=>{t.$b("Slice",o,{starts:p?Array.from((x(),O).subarray(Number(p)>>>0,Number(g)>>>0)):[],ends:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[],axes:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(A)>>>0)):[]})},1067437:o=>{t.$b("Tile",o,void 0)},1067489:(o,p,g)=>{t.$b("InstanceNormalization",o,{epsilon:p,format:g?"NHWC":"NCHW"})},1067603:(o,p,g)=>{t.$b("InstanceNormalization",o,{epsilon:p,format:g?"NHWC":"NCHW"})},1067717:o=>{t.$b("Range",o,void 0)},1067770:(o,p)=>{t.$b("Einsum",o,{equation:Ee(p)})},1067851:(o,p,g,f,$)=>{t.$b("Pad",o,{mode:p,value:g,pads:f?Array.from((x(),O).subarray(Number(f)>>>0,Number($)>>>0)):[]})},1067994:(o,p,g,f,$,E)=>{t.$b("BatchNormalization",o,{epsilon:p,momentum:g,spatial:!!$,trainingMode:!!f,format:E?"NHWC":"NCHW"})},1068163:(o,p,g,f,$,E)=>{t.$b("BatchNormalization",o,{epsilon:p,momentum:g,spatial:!!$,trainingMode:!!f,format:E?"NHWC":"NCHW"})},1068332:(o,p,g)=>{t.$b("CumSum",o,{exclusive:Number(p),reverse:Number(g)})},1068429:(o,p,g)=>{t.$b("DequantizeLinear",o,{axis:p,blockSize:g})},1068519:(o,p,g,f,$)=>{t.$b("GridSample",o,{align_corners:p,mode:Ee(g),padding_mode:Ee(f),format:$?"NHWC":"NCHW"})},1068689:(o,p,g,f,$)=>{t.$b("GridSample",o,{align_corners:p,mode:Ee(g),padding_mode:Ee(f),format:$?"NHWC":"NCHW"})},1068859:(o,p)=>{t.$b("ScatterND",o,{reduction:Ee(p)})},1068944:(o,p,g,f,$,E,A,M,q)=>{t.$b("Attention",o,{numHeads:p,isUnidirectional:g,maskFilterValue:f,scale:$,doRotary:E,qkvHiddenSizes:A?Array.from((x(),O).subarray(Number(M)>>>0,Number(M)+A>>>0)):[],pastPresentShareBuffer:!!q})},1069216:o=>{t.$b("BiasAdd",o,void 0)},1069271:o=>{t.$b("BiasSplitGelu",o,void 0)},1069332:o=>{t.$b("FastGelu",o,void 0)},1069388:(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e,mt,Di)=>{t.$b("Conv",o,{format:ce?"NHWC":"NCHW",auto_pad:p,dilations:g?Array.from((x(),O).subarray(Number(g)>>>0,Number(f)>>>0)):[],group:$,kernel_shape:E?Array.from((x(),O).subarray(Number(E)>>>0,Number(A)>>>0)):[],pads:M?Array.from((x(),O).subarray(Number(M)>>>0,Number(q)>>>0)):[],strides:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(se)>>>0)):[],w_is_const:()=>!!(x(),K)[Number(ye)>>>0],activation:Ee($e),activation_params:mt?Array.from((x(),ee).subarray(Number(mt)>>>0,Number(Di)>>>0)):[]})},1069972:o=>{t.$b("Gelu",o,void 0)},1070024:(o,p,g,f,$,E,A,M,q)=>{t.$b("GroupQueryAttention",o,{numHeads:p,kvNumHeads:g,scale:f,softcap:$,doRotary:E,rotaryInterleaved:A,smoothSoftmax:M,localWindowSize:q})},1070241:(o,p,g,f)=>{t.$b("LayerNormalization",o,{axis:p,epsilon:g,simplified:!!f})},1070352:(o,p,g,f)=>{t.$b("LayerNormalization",o,{axis:p,epsilon:g,simplified:!!f})},1070463:(o,p,g,f,$,E)=>{t.$b("MatMulNBits",o,{k:p,n:g,accuracyLevel:f,bits:$,blockSize:E})},1070590:(o,p,g,f,$,E)=>{t.$b("MultiHeadAttention",o,{numHeads:p,isUnidirectional:g,maskFilterValue:f,scale:$,doRotary:E})},1070749:(o,p)=>{t.$b("QuickGelu",o,{alpha:p})},1070813:(o,p,g,f,$)=>{t.$b("RotaryEmbedding",o,{interleaved:!!p,numHeads:g,rotaryEmbeddingDim:f,scale:$})},1070952:(o,p,g)=>{t.$b("SkipLayerNormalization",o,{epsilon:p,simplified:!!g})},1071054:(o,p,g)=>{t.$b("SkipLayerNormalization",o,{epsilon:p,simplified:!!g})},1071156:(o,p,g,f)=>{t.$b("GatherBlockQuantized",o,{gatherAxis:p,quantizeAxis:g,blockSize:f})},1071277:o=>{t.Fd(o)},1071311:(o,p)=>t.Hd(Number(o),Number(p),t.Xc.Kd,t.Xc.errors)};function kg(o,p,g){return ls(()=>N(null,null,function*(){yield t.Dd(Number(o),Number(p),Number(g))}))}function Eg(){return typeof wasmOffsetConverter<"u"}function Ig(o,p,g,f){var $=le();try{return Gs(o,p,g,f)}catch(E){if(ue($),E!==E+0)throw E;de(1,0)}}function zg(o,p,g){var f=le();try{return qs(o,p,g)}catch($){if(ue(f),$!==$+0)throw $;de(1,0)}}function Cg(o){var p=le();try{Ps(o)}catch(g){if(ue(p),g!==g+0)throw g;de(1,0)}}function Ag(o,p){var g=le();try{return Ri(o,p)}catch(f){if(ue(g),f!==f+0)throw f;de(1,0)}}function Og(o,p,g){var f=le();try{Ns(o,p,g)}catch($){if(ue(f),$!==$+0)throw $;de(1,0)}}function Bg(o,p){var g=le();try{Hs(o,p)}catch(f){if(ue(g),f!==f+0)throw f;de(1,0)}}function Rg(o,p,g,f,$,E,A){var M=le();try{return Ws(o,p,g,f,$,E,A)}catch(q){if(ue(M),q!==q+0)throw q;de(1,0)}}function Mg(o,p,g,f,$,E){var A=le();try{Us(o,p,g,f,$,E)}catch(M){if(ue(A),M!==M+0)throw M;de(1,0)}}function Dg(o,p,g,f){var $=le();try{Vs(o,p,g,f)}catch(E){if(ue($),E!==E+0)throw E;de(1,0)}}function Ng(o,p,g,f,$){var E=le();try{Ls(o,p,g,f,$)}catch(A){if(ue(E),A!==A+0)throw A;de(1,0)}}function Pg(o,p,g,f,$,E,A){var M=le();try{Ks(o,p,g,f,$,E,A)}catch(q){if(ue(M),q!==q+0)throw q;de(1,0)}}function Ug(o,p,g,f,$,E,A){var M=le();try{Zs(o,p,g,f,$,E,A)}catch(q){if(ue(M),q!==q+0)throw q;de(1,0)}}function Lg(o,p,g,f,$,E,A,M){var q=le();try{Js(o,p,g,f,$,E,A,M)}catch(G){if(ue(q),G!==G+0)throw G;de(1,0)}}function qg(o,p,g,f,$){var E=le();try{return js(o,p,g,f,$)}catch(A){if(ue(E),A!==A+0)throw A;de(1,0)}}function Fg(o,p,g){var f=le();try{return eo(o,p,g)}catch($){if(ue(f),$!==$+0)throw $;de(1,0)}}function Wg(o,p,g,f,$,E,A,M){var q=le();try{to(o,p,g,f,$,E,A,M)}catch(G){if(ue(q),G!==G+0)throw G;de(1,0)}}function Vg(o,p,g,f,$,E,A,M,q,G,se,ce){var ye=le();try{Qs(o,p,g,f,$,E,A,M,q,G,se,ce)}catch($e){if(ue(ye),$e!==$e+0)throw $e;de(1,0)}}function Gg(o,p,g){var f=le();try{return ro(o,p,g)}catch($){if(ue(f),$!==$+0)throw $;return de(1,0),0n}}function Hg(o,p,g,f,$,E,A,M,q){var G=le();try{Fs(o,p,g,f,$,E,A,M,q)}catch(se){if(ue(G),se!==se+0)throw se;de(1,0)}}function jg(o){var p=le();try{return io(o)}catch(g){if(ue(p),g!==g+0)throw g;de(1,0)}}function Kg(o,p){var g=le();try{return _o(o,p)}catch(f){if(ue(g),f!==f+0)throw f;return de(1,0),0n}}function Zg(o){var p=le();try{return ao(o)}catch(g){if(ue(p),g!==g+0)throw g;return de(1,0),0n}}function Qg(o,p,g,f){var $=le();try{return po(o,p,g,f)}catch(E){if(ue($),E!==E+0)throw E;de(1,0)}}function Xg(o,p,g,f,$){var E=le();try{return co(o,p,g,f,$)}catch(A){if(ue(E),A!==A+0)throw A;de(1,0)}}function Yg(o,p,g,f,$,E){var A=le();try{return ho(o,p,g,f,$,E)}catch(M){if(ue(A),M!==M+0)throw M;de(1,0)}}function Jg(o,p,g,f,$,E){var A=le();try{return Xs(o,p,g,f,$,E)}catch(M){if(ue(A),M!==M+0)throw M;de(1,0)}}function e0(o,p,g,f,$,E){var A=le();try{return fo(o,p,g,f,$,E)}catch(M){if(ue(A),M!==M+0)throw M;de(1,0)}}function t0(o,p,g,f,$,E,A,M){var q=le();try{return Ys(o,p,g,f,$,E,A,M)}catch(G){if(ue(q),G!==G+0)throw G;de(1,0)}}function r0(o,p,g,f,$){var E=le();try{return mo(o,p,g,f,$)}catch(A){if(ue(E),A!==A+0)throw A;return de(1,0),0n}}function i0(o,p,g,f){var $=le();try{return go(o,p,g,f)}catch(E){if(ue($),E!==E+0)throw E;de(1,0)}}function a0(o,p,g,f){var $=le();try{return yo(o,p,g,f)}catch(E){if(ue($),E!==E+0)throw E;de(1,0)}}function n0(o,p,g,f,$,E,A,M,q,G,se,ce){var ye=le();try{return bo(o,p,g,f,$,E,A,M,q,G,se,ce)}catch($e){if(ue(ye),$e!==$e+0)throw $e;de(1,0)}}function s0(o,p,g,f,$,E,A,M,q,G,se){var ce=le();try{uo(o,p,g,f,$,E,A,M,q,G,se)}catch(ye){if(ue(ce),ye!==ye+0)throw ye;de(1,0)}}function o0(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e,mt,Di){var p0=le();try{lo(o,p,g,f,$,E,A,M,q,G,se,ce,ye,$e,mt,Di)}catch(Ni){if(ue(p0),Ni!==Ni+0)throw Ni;de(1,0)}}function u0(o,p,g){var f=le();try{return no(o,p,g)}catch($){if(ue(f),$!==$+0)throw $;de(1,0)}}function l0(o,p,g){var f=le();try{return so(o,p,g)}catch($){if(ue(f),$!==$+0)throw $;de(1,0)}}function d0(o,p,g,f){var $=le();try{oo(o,p,g,f)}catch(E){if(ue($),E!==E+0)throw E;de(1,0)}}function Lr(){if(0<Ne)xt=Lr;else if(a)w?.(t),H();else{for(var o=Se;0<o.length;)o.shift()(t);0<Ne?xt=Lr:(t.calledRun=!0,z||(H(),w?.(t)))}}return a||(nt=yield xe(),Lr()),t.PTR_SIZE=4,J?t:new Promise((o,p)=>{w=o,S=p})})}var Op,Eo,O0=U(()=>{"use strict";Op=ko,Eo=globalThis.self?.name?.startsWith("em-pthread"),Eo&&ko()}),Vi,La,Io,Pe,Bp,Fr,zo,Co,Gi,Ao,Hi,Rp,ji,Mp,nn=U(()=>{"use strict";an(),Vi=typeof location>"u"?void 0:location.origin,La=import.meta.url>"file:"&&import.meta.url<"file;",Io=()=>{if(La){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Vi).href}return import.meta.url},Pe=Io(),Bp=()=>{if(Pe&&!Pe.startsWith("blob:"))return Pe.substring(0,Pe.lastIndexOf("/")+1)},Fr=(e,t)=>{try{let r=t??Pe;return(r?new URL(e,r):new URL(e)).origin===Vi}catch{return!1}},zo=(e,t)=>{let r=t??Pe;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Co=(e,t)=>`${t??"./"}${e}`,Gi=e=>N(null,null,function*(){let t=yield(yield fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)}),Ao=e=>N(null,null,function*(){return(yield import(e)).default}),Hi=(A0(),xr(zp)).default,Rp=()=>N(null,null,function*(){if(!Pe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Fr(Pe))return[void 0,Hi()];let e=yield Gi(Pe);return[e,Hi(e)]}),ji=(O0(),xr(Ap)).default,Mp=(e,t,r,i)=>N(null,null,function*(){let a=ji&&!(e||t);if(a)if(Pe)a=Fr(Pe)||i&&!r;else if(i&&!r)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,ji];{let n="ort-wasm-simd-threaded.jsep.mjs",s=e??zo(n,t),u=r&&s&&!Fr(s,t),l=u?yield Gi(s):s??Co(n,t);return[u?l:void 0,yield Ao(l)]}})}),Ki,Wr,lr,Zi,Oo,Bo,Ro,sn,we,qt=U(()=>{"use strict";nn(),Wr=!1,lr=!1,Zi=!1,Oo=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Bo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Ro=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},sn=e=>N(null,null,function*(){if(Wr)return Promise.resolve();if(lr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Zi)throw new Error("previous call to 'initializeWebAssembly()' failed.");lr=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Ro())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Bo())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Oo();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,n=typeof a=="string"?a:void 0,s=a?.mjs,u=s?.href??s,l=a?.wasm,d=l?.href??l,h=e.wasmBinary,[c,m]=yield Mp(u,n,r>1,!!h||!!d),b=!1,y=[];if(t>0&&y.push(new Promise(w=>{setTimeout(()=>{b=!0,w()},t)})),y.push(new Promise((w,S)=>{let v={numThreads:r};if(h)v.wasmBinary=h,v.locateFile=_=>_;else if(d||n)v.locateFile=_=>d??n+_;else if(u&&u.indexOf("blob:")!==0)v.locateFile=_=>new URL(_,u).href;else if(c){let _=Bp();_&&(v.locateFile=k=>_+k)}m(v).then(_=>{lr=!1,Wr=!0,Ki=_,w(),c&&URL.revokeObjectURL(c)},_=>{lr=!1,Zi=!0,S(_)})})),yield Promise.race(y),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)}),we=()=>{if(Wr&&Ki)return Ki;throw new Error("WebAssembly is not initialized yet.")}}),Xe,ai,me,on=U(()=>{"use strict";qt(),Xe=(e,t)=>{let r=we(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},ai=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,n])=>{let s=t?t+a:a;if(typeof n=="object")ai(n,s+".",r,i);else if(typeof n=="string"||typeof n=="number")i(s,n.toString());else if(typeof n=="boolean")i(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},me=e=>{let t=we(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let n=Number(t.getValue(a,i===4?"i32":"i64")),s=t.getValue(a+i,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),Dp,B0=U(()=>{"use strict";qt(),on(),Dp=e=>{let t=we(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let n=0;return e?.tag!==void 0&&(n=Xe(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,n),r===0&&me("Can't create run options."),e?.extra!==void 0&&ai(e.extra,"",new WeakSet,(s,u)=>{let l=Xe(s,i),d=Xe(u,i);t._OrtAddRunConfigEntry(r,l,d)!==0&&me(`Can't set a run config entry: ${s} - ${u}.`)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),n}}}),Mo,Do,No,It,Po,Np,R0=U(()=>{"use strict";qt(),on(),Mo=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Do=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},No=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},It=(e,t,r,i)=>{let a=Xe(t,i),n=Xe(r,i);we()._OrtAddSessionConfigEntry(e,a,n)!==0&&me(`Can't set a session config entry: ${t} - ${r}.`)},Po=(e,t,r)=>N(null,null,function*(){let i=t.executionProviders;for(let a of i){let n=typeof a=="string"?a:a.name,s=[];switch(n){case"webnn":if(n="WEBNN",It(e,"session.disable_quant_qdq","1",r),It(e,"session.disable_qdq_constant_folding","1",r),typeof a!="string"){let c=a?.deviceType;c&&It(e,"deviceType",c,r)}break;case"webgpu":if(n="JS",typeof a!="string"){let c=a;if(c?.preferredLayout){if(c.preferredLayout!=="NCHW"&&c.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);It(e,"preferredLayout",c.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let u=Xe(n,r),l=s.length,d=0,h=0;if(l>0){d=we()._malloc(l*we().PTR_SIZE),r.push(d),h=we()._malloc(l*we().PTR_SIZE),r.push(h);for(let c=0;c<l;c++)we().setValue(d+c*we().PTR_SIZE,s[c][0],"*"),we().setValue(h+c*we().PTR_SIZE,s[c][1],"*")}(yield we()._OrtAppendExecutionProvider(e,u,d,h,l))!==0&&me(`Can't append execution provider: ${n}.`)}}),Np=e=>N(null,null,function*(){let t=we(),r=0,i=[],a=e||{};No(a);try{let n=Mo(a.graphOptimizationLevel??"all"),s=Do(a.executionMode??"sequential"),u=typeof a.logId=="string"?Xe(a.logId,i):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let d=a.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let h=typeof a.optimizedModelFilePath=="string"?Xe(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(n,!!a.enableCpuMemArena,!!a.enableMemPattern,s,!!a.enableProfiling,0,u,l,d,h),r===0&&me("Can't create session options."),a.executionProviders&&(yield Po(r,a,i)),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);It(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[c,m]of Object.entries(a.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let b=Xe(c,i);t._OrtAddFreeDimensionOverride(r,b,m)!==0&&me(`Can't set a free dimension override: ${c} - ${m}.`)}return a.extra!==void 0&&ai(a.extra,"",new WeakSet,(c,m)=>{It(r,c,m,i)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&me("Can't release session options."),i.forEach(s=>t._free(s)),n}})}),Rt,ut,Mt,pi,ni,un,ln,qa,te=U(()=>{"use strict";Rt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ut=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Mt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,n)=>a*n,1);return r>0?Math.ceil(i*r):void 0},pi=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},ni=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},un=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",ln=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",qa=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),dn,Pp=U(()=>{"use strict";an(),dn=e=>N(null,null,function*(){if(typeof e=="string")if(0)try{}catch(n){if(n.code==="ERR_FS_FILE_TOO_LARGE")try{for(var t,r,i,a;r=!(i=yield t.next()).done;r=!1){let d=i.value;;}}catch(i){a=[i]}finally{try{r&&(i=t.return)&&(yield i.call(t))}finally{if(a)throw a[0]}}}else{let n=yield fetch(e);if(!n.ok)throw new Error(`failed to load external data file: ${e}`);let s=n.headers.get("Content-Length"),u=s?parseInt(s,10):0;if(u<1073741824)return new Uint8Array(yield n.arrayBuffer());{if(!n.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let l=n.body.getReader(),d;try{d=new ArrayBuffer(u)}catch(c){if(c instanceof RangeError){let m=Math.ceil(u/65536);d=new WebAssembly.Memory({initial:m,maximum:m}).buffer}else throw c}let h=0;for(;;){let{done:c,value:m}=yield l.read();if(c)break;let b=m.byteLength;new Uint8Array(d,h,b).set(m),h+=b}return new Uint8Array(d,0,u)}}else return e instanceof Blob?new Uint8Array(yield e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)})}),Uo,Lo,qo,Fo,pn,Wo,pe,lt=U(()=>{"use strict";te(),Uo=["V","I","W","E","F"],Lo=(e,t)=>{console.log(`[${Uo[e]},${new Date().toISOString()}]${t}`)},pn=(e,t)=>{qo=e,Fo=t},Wo=(e,t)=>{let r=ni(e),i=ni(qo);r>=i&&Lo(r,typeof t=="function"?t():t)},pe=(...e)=>{Fo&&Wo(...e)}}),Vo,Qt,B,si,Up,Lp,qp,ie=U(()=>{"use strict";Vo=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Qt=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let n=Math.max(e.length,t.length),s=new Array(n);if(r){if(i<2||a<2)return;let u=Vo.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(u===void 0)return;[s[n-2],s[n-1]]=u}for(let u=r?3:1;u<=n;u++){let l=i-u<0?1:e[i-u],d=a-u<0?1:t[a-u];if(l!==d&&l>1&&d>1)return;let h=Math.max(l,d);if(l&&d)s[n-u]=Math.max(l,d);else{if(h>1)return;s[n-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},B=class ti{static size(t){return ti.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),n=i-1;for(;n>=0;){if(t[n]%r===0){a[n]=t[n]/r;break}if(r%t[n]!==0)throw new Error("cannot convert shape");a[n]=1,r/=t[n],n--}for(n--;n>=0;n--)a[n]=t[n];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return ti.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return ti.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let n=r;n<i;n++){if(t[n]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[n])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,n)=>a+r[n]+r[n+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},si=class wt{static adjustPoolAttributes(t,r,i,a,n,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=i[u]||s[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,n,s,u){if(u){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)wt.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],i[l],a[l],n,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,a,n,s,u,l=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return wt.computeShapeHelper(t,r,d,i,a,n,s,u,l),d}static computeConvOutputShape(t,r,i,a,n,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return wt.computeShapeHelper(!1,t,l,i,a,n,s,u),l}static computeShapeHelper(t,r,i,a,n,s,u,l,d=0){if(t)for(let h=0;h<r.length-2;h++)i.push(1);else for(let h=0;h<r.length-2;h++)i.push(wt.adjustPadAndReturnShape(r[h+2],a[h],n[h],s[h],u,h,h+r.length-2,l,d))}static computeOutputSize(t,r,i,a,n){let s=Math.floor(t/r)+1;return n===1&&(s=Math.ceil(t/r)+1,(s-1)*r>=i+a&&(s-=1)),s}static adjustPadAndReturnShape(t,r,i,a,n,s,u,l,d=0){let h=i*(a-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return n[s]=0,n[u]=0,wt.computeOutputSize(t-h,r,t,0,d);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=(Math.floor((t+r-1)/r)-1)*r+a-t;return n[s]=Math.floor(l==="SAME_LOWER"?(c+1)/2:c/2),n[u]=c-n[s],wt.computeOutputSize(t+n[s]+n[u]-h,r,t,n[s],d)}default:throw new Error("Unsupported AutoPad type")}else return wt.computeOutputSize(t+n[s]+n[u]-h,r,t,n[s],d)}},Up=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let n,s,u;t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==s)throw new Error("dimension mismatch");if(n<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(a&&!Qt.isValidBroadcast(a,[n,u]))throw new Error("gemm: invalid bias shape for broadcast");return[n,u,s]}},Lp=-34028234663852886e22,qp=34028234663852886e22}),cn,Fp=U(()=>{"use strict";te(),cn=(e,t)=>new(pi(t))(e)}),Qi,Go,Xi,Ho,Yi,jo,Ji,ea,ta,Ko,Wp,M0=U(()=>{"use strict";te(),lt(),Qi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Go=(e,t)=>{if(t==="int32")return e;let r=Qi.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let a=e.byteLength/i,n=new(pi(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let s=new Int32Array(a);for(let u=0;u<a;u++){let l=n[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&n.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(n,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Xi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(i.some(n=>n<-128||n>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(i,Number);return new Uint8Array(a.buffer)}case"uint8":{if(i.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Ho=1,Yi=()=>Ho++,jo=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Ji=(e,t)=>{let r=Qi.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},ea=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:n,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=n,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Ji(this.dataType,this.tensorShape)}destroy(){pe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}read(e){return N(this,null,function*(){if(this.fallbackDataType){let t=yield this.mlContext.readTensor(this.mlTensor),r=Xi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return new Uint8Array(r).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)})}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsDataConverted(e){this.isDataConverted=e}},ta=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}ensureTensor(e,t,r,i){return N(this,null,function*(){let a=this.tensorManager.getMLContext(e),n=this.tensorManager.getMLOpSupportLimits(e),s;if(!n?.input.dataTypes.includes(t)){if(s=jo.get(t),!s||n?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);pe("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Ji(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(yield this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=yield this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor})}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Go(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else pe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}download(e){return N(this,null,function*(){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Xi(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()})}},Ko=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Yi();return this.tensorTrackersById.set(e,new ta(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}ensureTensor(e,t,r,i,a){return N(this,null,function*(){pe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.ensureTensor(e,r,i,a)})}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}download(e,t){return N(this,null,function*(){pe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)})}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),n=Yi(),s=new ea({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(n,new ta(this,s)),this.externalTensors.add(s),n}getCachedTensor(e,t,r,i,a,n,s){return N(this,null,function*(){let u=this.getMLContext(e);for(let[d,h]of this.freeTensors.entries())if(h.canReuseTensor(u,t,r)){pe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let c=this.freeTensors.splice(d,1)[0];return c.sessionId=e,c}pe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let l=yield u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:a,readable:n});return new ea({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:s})})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Wp=(...e)=>new Ko(...e)}),dr,Zo,Vp,D0=U(()=>{"use strict";te(),qt(),Fp(),M0(),lt(),dr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Zo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,n)=>a===i[n]&&e[a]===t[a])},Vp=class{constructor(e){this.tensorManager=Wp(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,pn(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){pe("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){pe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)pe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}createMLContext(e){return N(this,null,function*(){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=yield navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=yield navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Zo(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=yield navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}})}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){pe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}ensureTensor(e,t,r,i,a){return N(this,null,function*(){let n=dr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,n,i,a)})}createTemporaryTensor(e,t,r){return N(this,null,function*(){pe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=dr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();yield this.tensorManager.ensureTensor(e,a,i,r,!1);let n=this.temporarySessionTensorIds.get(e);return n?n.push(a):this.temporarySessionTensorIds.set(e,[a]),a})}uploadTensor(e,t){if(!we().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");pe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}downloadTensor(e,t){return N(this,null,function*(){return this.tensorManager.download(e,t)})}createMLTensorDownloader(e,t){return()=>N(this,null,function*(){let r=yield this.tensorManager.download(e);return cn(r,t)})}registerMLTensor(e,t,r,i){let a=dr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.registerTensor(e,t,a,i);return pe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${n}}`),n}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=dr.get(Rt(t)),a=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!a?.input.dataTypes.includes(i):!!a?.output.dataTypes.includes(i)}flush(){}}}),hn=U(()=>{"use strict"}),ra,Vr,Gr,Qo,Xo,ia,Fa,Yo,Gp,N0=U(()=>{"use strict";lt(),hn(),ra=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Vr=[],Gr=e=>Math.ceil(Number(e)/16)*16,Qo=e=>{for(let t=0;t<Vr.length;t++){let r=Vr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Xo=1,ia=()=>Xo++,Fa=(e,t,r,i)=>N(null,null,function*(){let a=Gr(r),n=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,a),e.flush(),yield n.mapAsync(GPUMapMode.READ);let u=n.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{n.destroy()}}),Yo=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of ra)Vr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,n=Gr(a),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);if(n===a&&i%4===0)this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,r,i,a);else{let u=new Uint8Array(n);u.set(t),this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,u,0,n)}pe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=Gr(r.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=ia();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),pe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Qo(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||n){let u=(a?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:ia(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),pe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return pe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}download(e,t){return N(this,null,function*(){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");yield Fa(this.backend,r.gpuData.buffer,r.originalSize,t)})}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=ra.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(pe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Gp=(...e)=>new Yo(...e)}),Jo,fe,ke=U(()=>{"use strict";Jo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},fe=e=>new Jo(e)}),Xt,Hr,Ae,Ce,Y,Te,Wa,Zt,$t,Q,pr,R,j,Hp,fn,eu,jp,ae=U(()=>{"use strict";te(),ie(),Xt=64,Hr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ae=(e,t=1)=>{let r=Hr(e,t);return typeof r=="string"?r:r[0]},Ce=(e,t=1)=>{let r=Hr(e,t);return typeof r=="string"?r:r[1]},Y=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:B.computeStrides(r)})}),t},Te=e=>e%4===0?4:e%2===0?2:1,Wa=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Zt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,$t=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,Q=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,pr=(e,t,r,i,a)=>{let n=typeof r=="number",s=n?r:r.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=Hr(t,a),h=typeof d=="string"?d:d[1],c=typeof d=="string"?d:d[0],m={indices:l,value:h,storage:c,tensor:t},b=D=>typeof D=="string"?D:`${D}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=n?"uniforms.":"",S=`${w}${e}_shape`,v=`${w}${e}_strides`,_="";for(let D=0;D<s-1;D++)_+=`
    let dim${D} = current / ${Q(v,D,s)};
    let rest${D} = current % ${Q(v,D,s)};
    indices[${D}] = dim${D};
    current = rest${D};
    `;_+=`indices[${s-1}] = current;`;let k=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${_}
    return indices;
  }`,T=D=>(y.offsetToIndices=!0,s<2?D:`o2i_${e}(${D})`),I=[];if(s>=2)for(let D=s-1;D>=0;D--)I.push(`${Q(v,D,s)} * (indices[${D}])`);let z=s<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${I.join("+")};
  }`,C=D=>(y.indicesToOffset=!0,s<2?D:`i2o_${e}(${D})`),x=(...D)=>s===0?"0u":`${m.indices}(${D.map(b).join(",")})`,P=(D,J)=>s<2?`${D}`:`${Q(D,J,s)}`,F=(D,J,Z)=>s<2?`${D}=${Z};`:`${Q(D,J,s)}=${Z};`,K={},V=(D,J)=>{y.broadcastedIndicesToOffset=!0;let Z=`${J.name}broadcastedIndicesTo${e}Offset`;if(Z in K)return`${Z}(${D})`;let H=[];for(let _e=s-1;_e>=0;_e--){let Ie=J.indicesGet("outputIndices",_e+J.rank-s);H.push(`${P(v,_e)} * (${Ie} % ${P(S,_e)})`)}return K[Z]=`fn ${Z}(outputIndices: ${J.type.indices}) -> u32 {
             return ${H.length>0?H.join("+"):"0u"};
           }`,`${Z}(${D})`},W=(D,J)=>(()=>{if(m.storage===m.value)return`${e}[${D}]=${J};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${D}]=vec2<u32>(u32(${J}), select(0u, 0xFFFFFFFFu, ${J} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${D}]=vec2<u32>(u32(${J}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${D}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${J}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),oe=D=>(()=>{if(m.storage===m.value)return`${e}[${D}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${D}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${D}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${D}] & 0xFFu), bool(${e}[${D}] & 0xFF00u), bool(${e}[${D}] & 0xFF0000u), bool(${e}[${D}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),O=s<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${h} {
    return ${oe(`i2o_${e}(indices)`)};
  }`,L=s<2?"":(()=>{let D=u.map(Z=>`d${Z}: u32`).join(", "),J=u.map(Z=>`d${Z}`).join(", ");return`
  fn get_${e}(${D}) -> ${h} {
    return get_${e}ByIndices(${x(J)});
  }`})(),ee=(...D)=>{if(D.length!==s)throw new Error(`indices length must be ${s}`);let J=D.map(b).join(",");return s===0?oe("0u"):s===1?oe(J[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${J})`)},re=D=>s<2?oe(D):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${D})`),X=s<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${h}) {
    ${W(`i2o_${e}(indices)`,"value")}
  }`,ne=s<2?"":(()=>{let D=u.map(Z=>`d${Z}: u32`).join(", "),J=u.map(Z=>`d${Z}`).join(", ");return`
  fn set_${e}(${D}, value: ${h}) {
    set_${e}ByIndices(${x(J)}, value);
  }`})();return{impl:()=>{let D=[],J=!1;return y.offsetToIndices&&(D.push(k),J=!0),y.indicesToOffset&&(D.push(z),J=!0),y.broadcastedIndicesToOffset&&(Object.values(K).forEach(Z=>D.push(Z)),J=!0),y.set&&(D.push(ne),J=!0),y.setByIndices&&(D.push(X),J=!0),y.get&&(D.push(L),J=!0),y.getByIndices&&(D.push(O),J=!0),!n&&J&&D.unshift(`const ${S} = ${m.indices}(${r.join(",")});`,`const ${v} = ${m.indices}(${B.computeStrides(r).join(",")});`),D.join(`
`)},type:m,offsetToIndices:T,indicesToOffset:C,broadcastedIndicesToOffset:V,indices:x,indicesGet:P,indicesSet:F,set:(...D)=>{if(D.length!==s+1)throw new Error(`indices length must be ${s}`);let J=D[s];if(typeof J!="string")throw new Error("value must be string");let Z=D.slice(0,s).map(b).join(",");return s===0?W("0u",J):s===1?W(Z[0],J):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${Z}, ${J})`)},setByOffset:W,setByIndices:(D,J)=>s<2?W(D,J):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${D}, ${J});`),get:ee,getByOffset:oe,getByIndices:re,usage:i,name:e,strides:v,shape:S,rank:s}},R=(e,t,r,i=1)=>pr(e,t,r,"input",i),j=(e,t,r,i=1)=>pr(e,t,r,"output",i),Hp=(e,t,r)=>pr(e,t,r,"atomicOutput",1),fn=(e,t,r,i=1)=>pr(e,t,r,"internal",i),eu=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Xt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,n=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},jp=(e,t)=>new eu(e,t)}),tu,aa,ru,iu,au,nu,Le,Kp,Zp,vt=U(()=>{"use strict";te(),ie(),ke(),ae(),tu=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},aa=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),ru=(e,t)=>B.sortBasedOnPerm(e,aa(e.length,t)),iu=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let n=0;n<t;++n)a+=`a[${e[n]}]=i[${n}];`;return a+="return a;}"},au=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},nu=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Le=(e,t)=>{let r=e.dataType,i=e.dims.length,a=aa(i,t),n=ru(e.dims,a),s=e.dims,u=n,l=i<2||nu(a,e.dims),d;if(l)return d=y=>{let w=R("input",r,s,4),S=j("output",r,u,4);return`
  ${y.registerUniform("output_size","u32").declareVariables(w,S)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=B.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(y/4)}]}},getShaderSource:d};let{newShape:h,newPerm:c}=au(e.dims,a),m=B.areEqual(c,[2,3,1]),b=B.areEqual(c,[3,1,2]);if(h.length===2||m||b){s=m?[h[0],h[1]*h[2]]:b?[h[0]*h[1],h[2]]:h,u=[s[1],s[0]];let y=16;return d=w=>{let S=R("a",r,s.length),v=j("output",r,u.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(S,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${y+1}>, ${y}>;
  ${w.mainStart([y,y,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${y} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${y}u + local_id.x;
    let input_row = workgroup_id_x * ${y}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${y}u + local_id.x;
    let output_row = workgroup_id_y * ${y}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=B.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/y),y:Math.ceil(u[0]/y)},programUniforms:[{type:12,data:w},...Y(s,u)]}},getShaderSource:d}}return d=y=>{let w=R("a",r,s.length),S=j("output",r,u.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(w,S)}

  ${iu(a,i,w,S)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=B.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Y(s,u)]}},getShaderSource:d}},Kp=(e,t)=>{tu(e.inputs,t.perm),e.compute(Le(e.inputs[0],t.perm))},Zp=e=>fe({perm:e.perm})}),su,ou,uu,lu,du,pu,cu,hu,fu,mu,He,Qp,Xp,Yp,Jp,ec,tc,rc,ic,ac,nc,P0=U(()=>{"use strict";te(),ie(),ae(),mn(),vt(),su={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},ou={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},uu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},lu={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},du=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},pu=(e,t)=>{let r=[],i=e.length;for(let n=0;n<i;n++)t.indexOf(n)===-1&&r.push(e[n]);let a=t.map(n=>e[n]);return[r,a]},cu=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let n=0;n<r;n++)t.indexOf(n)===-1?i.push(e[a++]):i.push(1);return i},hu=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},fu=(e,t)=>{let r=[];if(!hu(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},mu=(e,t,r,i,a,n,s)=>{let u=r[0].dims,l=B.size(n),d=B.size(s),h=R("_A",r[0].dataType,u),c=j("output",a,n),m=64;l===1&&(m=256);let b=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,y=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(h,c)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${uu[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${h.getByOffset("offset + k")});
           bestValue = ${su[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${ou[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${i==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${lu[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},He=(e,t,r,i)=>{let a=e.inputs.length===1?r:Va(e.inputs,r),n=a.axes;n.length===0&&!a.noopWithEmptyAxes&&(n=e.inputs[0].dims.map((b,y)=>y));let s=B.normalizeAxes(n,e.inputs[0].dims.length),u=s,l=e.inputs[0],d=fu(u,e.inputs[0].dims.length);d.length>0&&(l=e.compute(Le(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],u=du(u.length,l.dims.length));let[h,c]=pu(l.dims,u),m=h;a.keepDims&&(m=cu(h,s)),e.compute(mu(t,a.cacheKey,[l],i,e.inputs[0].dataType,m,c),{inputs:[l]})},Qp=(e,t)=>{He(e,"ReduceMeanShared",t,"mean")},Xp=(e,t)=>{He(e,"ReduceL1Shared",t,"l1")},Yp=(e,t)=>{He(e,"ReduceL2Shared",t,"l2")},Jp=(e,t)=>{He(e,"ReduceLogSumExpShared",t,"logSumExp")},ec=(e,t)=>{He(e,"ReduceMaxShared",t,"max")},tc=(e,t)=>{He(e,"ReduceMinShared",t,"min")},rc=(e,t)=>{He(e,"ReduceProdShared",t,"prod")},ic=(e,t)=>{He(e,"ReduceSumShared",t,"sum")},ac=(e,t)=>{He(e,"ReduceSumSquareShared",t,"sumSquare")},nc=(e,t)=>{He(e,"ReduceLogSumShared",t,"logSum")}}),je,gu,oi,Va,Ke,yu,bu,_u,wu,$u,vu,xu,Su,Tu,ku,Ze,sc,oc,uc,lc,dc,pc,cc,hc,fc,mc,mn=U(()=>{"use strict";te(),ie(),ke(),ae(),P0(),je=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},gu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],oi=(e,t,r,i,a,n,s=!1,u=!1)=>{let l=[],d=r[0].dims,h=d.length,c=B.normalizeAxes(a,h),m=!u&&c.length===0;d.forEach((w,S)=>{m||c.indexOf(S)>=0?s&&l.push(1):l.push(w)});let b=l.length,y=B.size(l);return{name:e,shaderCache:t,getShaderSource:w=>{let S=[],v=R("_A",r[0].dataType,h),_=j("output",n,b),k=i(v,_,c),T=k[2];for(let I=0,z=0;I<h;I++)m||c.indexOf(I)>=0?(s&&z++,T=`for(var j${I}: u32 = 0; j${I} < ${d[I]}; j${I}++) {
                  ${k[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${v.indicesSet("input_indices",I,`j${I}`)}
                  ${T}
                }`):(S.push(`${v.indicesSet("input_indices",I,_.indicesGet("output_indices",z))};`),z++);return`

        ${w.registerUniform("output_size","u32").declareVariables(v,_)}

        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${k[0]}       // init ops for reduce max/min
          ${k[1]}
          ${T}
          ${k[3]}
          ${k.length===4?_.setByOffset("global_idx","value"):k.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:n}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Y(d,l)]})}},Va=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),fe({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ke=(e,t,r,i)=>{let a=e.inputs,n=a.length===1?r:Va(a,r);e.compute(oi(t,{hint:n.cacheKey,inputDependencies:["rank"]},[a[0]],n.noopWithEmptyAxes&&n.axes.length===0?gu:i,n.axes,a[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},yu=(e,t)=>{je(e.inputs),Ke(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},bu=(e,t)=>{je(e.inputs),Ke(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},_u=(e,t)=>{je(e.inputs),Ke(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},wu=(e,t)=>{je(e.inputs),Ke(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},$u=(e,t)=>{je(e.inputs),Ke(e,"ReduceMax",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(r.indicesSet("input_indices",s,0));return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},vu=(e,t)=>{je(e.inputs),Ke(e,"ReduceMean",t,(r,i,a)=>{let n=1;for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&(n*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${n});`]})},xu=(e,t)=>{je(e.inputs),Ke(e,"ReduceMin",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(`input_indices[${s}] = 0;`);return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Su=(e,t)=>{je(e.inputs),Ke(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Tu=(e,t)=>{je(e.inputs),Ke(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},ku=(e,t)=>{je(e.inputs),Ke(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Ze=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?i*=e[n]:a*=e[n];return a<32&&i>1024},sc=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vu(e,t):Qp(e,t)},oc=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bu(e,t):Xp(e,t)},uc=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_u(e,t):Yp(e,t)},lc=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wu(e,t):Jp(e,t)},dc=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$u(e,t):ec(e,t)},pc=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xu(e,t):tc(e,t)},cc=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Su(e,t):rc(e,t)},hc=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tu(e,t):ic(e,t)},fc=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ku(e,t):ac(e,t)},mc=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yu(e,t):nc(e,t)}}),na,gc,yc,Ga,U0=U(()=>{"use strict";te(),ke(),mn(),na=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},gc=(e,t)=>{na(e.inputs);let r=(i,a,n)=>{let s=[];for(let u=0;u<i.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(oi("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},yc=(e,t)=>{na(e.inputs);let r=(i,a,n)=>{let s=[];for(let u=0;u<i.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(oi("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ga=e=>fe(e)}),Eu,jr,Iu,zu,Cu,Sr,Au,bc,gn=U(()=>{"use strict";te(),ie(),hn(),ae(),Eu=(e,t)=>{let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],d=r.dims[1],h=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==h)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=a.dims[0]/3,m=c,b=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let k of t.qkvHiddenSizes)if(k%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],b=t.qkvHiddenSizes[2]}let y=d;if(c!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==c+m+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(s){if(m!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=s.dims[3])}let S=y+w,v=-1,_=0;if(n)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==d||u.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:w,kvSequenceLength:y,totalSequenceLength:S,maxSequenceLength:v,inputHiddenSize:h,hiddenSize:c,vHiddenSize:b,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(b/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},jr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Iu=(e,t,r,i,a,n,s,u)=>{let l=Te(s?1:n),d=64,h=n/l;h<d&&(d=32);let c=Math.ceil(n/l/d),m=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:h},{type:12,data:c}],b=Ae(e.dataType,l),y=Ce(1,l),w=["type"];s&&w.push("type"),u&&w.push("type");let S=v=>{let _=j("x",e.dataType,e.dims,l),k=[_],T=s?R("seq_lens",s.dataType,s.dims):void 0;T&&k.push(T);let I=u?R("total_sequence_length_input",u.dataType,u.dims):void 0;I&&k.push(I);let z=Ce(e.dataType),C=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${v.registerUniforms(C).declareVariables(...k)}
  ${v.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${jr(T,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${_.type.value}(${z}(1.0) / ${z}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${_.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${_.type.value}(${z}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${b};${l}`,inputDependencies:w},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:m})}},zu=(e,t,r,i,a,n,s,u,l)=>{let d=s+n.kvSequenceLength,h=[n.batchSize,n.numHeads,n.sequenceLength,d],c=e>1&&i,m=n.kvNumHeads?n.kvNumHeads:n.numHeads,b=c?[n.batchSize,m,d,n.headSize]:void 0,y=n.nReps?n.nReps:1,w=n.scale===0?1/Math.sqrt(n.headSize):n.scale,S=Te(n.headSize),v=n.headSize/S,_=12,k={x:Math.ceil(d/_),y:Math.ceil(n.sequenceLength/_),z:n.batchSize*n.numHeads},T=[{type:12,data:n.sequenceLength},{type:12,data:v},{type:12,data:d},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:1,data:w},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:y}],I=c&&i&&B.size(i.dims)>0,z=["type","type"];I&&z.push("type"),a&&z.push("type"),u&&z.push("type"),l&&z.push("type");let C=[{dims:h,dataType:t.dataType,gpuDataType:0}];c&&C.push({dims:b,dataType:t.dataType,gpuDataType:0});let x=P=>{let F=R("q",t.dataType,t.dims,S),K=R("key",r.dataType,r.dims,S),V=[F,K];if(I){let X=R("past_key",i.dataType,i.dims,S);V.push(X)}a&&V.push(R("attention_bias",a.dataType,a.dims));let W=u?R("seq_lens",u.dataType,u.dims):void 0;W&&V.push(W);let oe=l?R("total_sequence_length_input",l.dataType,l.dims):void 0;oe&&V.push(oe);let O=j("output",t.dataType,h),L=[O];c&&L.push(j("present_key",t.dataType,b,S));let ee=Ce(1,S),re=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;

  var<workgroup> tileQ: array<${F.type.storage}, ${_*_}>;
  var<workgroup> tileK: array<${F.type.storage}, ${_*_}>;
  ${P.registerUniforms(re).declareVariables(...V,...L)}
  ${P.mainStart([_,_,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${jr(W,oe,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&c?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${c?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ee}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&c?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${c?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ee}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${O.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${a!==void 0};${i!==void 0};${e}`,inputDependencies:z},getRunData:()=>({outputs:C,dispatchGroup:k,programUniforms:T}),getShaderSource:x}},Cu=(e,t,r,i,a,n,s=void 0,u=void 0)=>{let l=n+a.kvSequenceLength,d=a.nReps?a.nReps:1,h=a.vHiddenSize*d,c=e>1&&i,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,b=c?[a.batchSize,m,l,a.headSize]:void 0,y=[a.batchSize,a.sequenceLength,h],w=12,S={x:Math.ceil(a.vHeadSize/w),y:Math.ceil(a.sequenceLength/w),z:a.batchSize*a.numHeads},v=[{type:12,data:a.sequenceLength},{type:12,data:l},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:h},{type:12,data:n},{type:12,data:a.kvSequenceLength},{type:12,data:d}],_=c&&i&&B.size(i.dims)>0,k=["type","type"];_&&k.push("type"),s&&k.push("type"),u&&k.push("type");let T=[{dims:y,dataType:t.dataType,gpuDataType:0}];c&&T.push({dims:b,dataType:t.dataType,gpuDataType:0});let I=z=>{let C=R("probs",t.dataType,t.dims),x=R("v",r.dataType,r.dims),P=[C,x];_&&P.push(R("past_value",i.dataType,i.dims));let F=s?R("seq_lens",s.dataType,s.dims):void 0;s&&P.push(F);let K=u?R("total_sequence_length_input",u.dataType,u.dims):void 0;u&&P.push(K);let V=[j("output",t.dataType,y)];c&&V.push(j("present_value",t.dataType,b));let W=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${C.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${C.type.value}, ${w*w}>;
  ${z.registerUniforms(W).declareVariables(...P,...V)}
  ${z.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${jr(F,K,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&c?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${C.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${_&&c?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${c?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:T,dispatchGroup:S,programUniforms:v}),getShaderSource:I}},Sr=(e,t,r,i,a,n,s,u,l,d,h=void 0,c=void 0)=>{let m=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),b=m>1?s:void 0,y=m>1?u:void 0,w=m>1?d.pastSequenceLength:0,S=w+d.kvSequenceLength,v=l&&B.size(l.dims)>0?l:void 0,_=[t,r];b&&B.size(b.dims)>0&&_.push(b),v&&_.push(v),h&&_.push(h),c&&_.push(c);let k=e.compute(zu(m,t,r,b,v,d,w,h,c),{inputs:_,outputs:m>1?[-1,1]:[-1]})[0];e.compute(Iu(k,d.batchSize,d.numHeads,w,d.sequenceLength,S,h,c),{inputs:h&&c?[k,h,c]:[k],outputs:[]});let T=[k,i];y&&B.size(y.dims)>0&&T.push(y),h&&T.push(h),c&&T.push(c),e.compute(Cu(m,k,i,y,d,w,h,c),{inputs:T,outputs:m>1?[0,2]:[0]})},Au=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,n=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:i},{type:12,data:a},{type:12,data:n},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],h=c=>{let m=j("output_q",l[0].dataType,r),b=j("output_k",l[0].dataType,r),y=j("output_v",l[0].dataType,r),w=R("input",l[0].dataType,l[0].dims),S=R("weight",l[1].dataType,l[1].dims),v=R("bias",l[2].dataType,l[2].dims),_=w.type.storage,k=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${_}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${_}, ${s*s}>;
  var<workgroup> tileWeightK: array<${_}, ${s*s}>;
  var<workgroup> tileWeightV: array<${_}, ${s*s}>;
  ${c.registerUniforms(k).declareVariables(w,S,v,m,b,y)}
  ${c.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${_}(0);
    var valueK = ${_}(0);
    var valueV = ${_}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:h},{inputs:l,outputs:[-1,-1,-1]})},bc=(e,t)=>{let r=Eu(e.inputs,t),[i,a,n]=Au(e,r);return Sr(e,i,a,n,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Ou,Bu,Ru,_c,L0=U(()=>{"use strict";Ve(),te(),ie(),ke(),ae(),Ou=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,n)=>{let s=a.length;if(s!==i.length)throw new Error(`${n}: num dimensions != ${s}`);a.forEach((u,l)=>{if(u!==i[l])throw new Error(`${n}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Bu=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,n=e[0].dims,s=i?Te(n[n.length-1]):1,u=a==="NHWC"&&n.length>1?s:1,l=B.size(n)/s,d=i,h=d?n.length:n,c=R("x",e[0].dataType,e[0].dims,s),m=R("scale",e[1].dataType,e[1].dims,u),b=R("bias",e[2].dataType,e[2].dims,u),y=R("inputMean",e[3].dataType,e[3].dims,u),w=R("inputVar",e[4].dataType,e[4].dims,u),S=j("y",e[0].dataType,h,s),v=()=>{let k="";if(i)k=`let cOffset = ${n.length===1?"0u":a==="NHWC"?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if(a==="NCHW")k=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{k=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let T=1;T<m.rank;T++)k+=`cIndices[${T}] = outputIndices[${T}];`;k+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return k},_=k=>`
  const epsilon = ${r};
  ${k.registerUniform("outputSize","u32").declareVariables(c,m,b,y,w,S)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${b.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...Y(n)]:[{type:12,data:l}]})}},Ru=e=>fe(e),_c=(e,t)=>{let{inputs:r,outputCount:i}=e,a=Ru(Fe(Me({},t),{outputCount:i}));if(be.webgpu.validateInputContent&&Ou(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Bu(r,a))}}),Mu,Du,wc,q0=U(()=>{"use strict";ie(),ae(),Mu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Du=e=>{let t=e[0].dims,r=e[0].dims[2],i=B.size(t)/4,a=e[0].dataType,n=R("input",a,t,4),s=R("bias",a,[r],4),u=R("residual",a,t,4),l=j("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(n,s,u,l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},wc=e=>{Mu(e.inputs),e.compute(Du(e.inputs))}}),Nu,he,$c,vc,xc,Sc,Tc,kc,Ec,Ic,zc,Pu,Cc,Ac,Oc,Bc,wr,Rc,ri,Mc,Dc,Nc,Pc,Uc,Lc,qc,Fc,Wc,Vc,Gc,Hc,jc,Kc,Zc,Qc,Xc,sa,Yc,Ha,ja,Jc,eh,th,Uu,Lu,rh,yn=U(()=>{"use strict";te(),ie(),ke(),ae(),Nu=(e,t,r,i,a,n,s)=>{let u=Math.ceil(t/4),l="";typeof a=="string"?l=`${a}(a)`:l=a("a");let d=R("inputData",r,[u],4),h=j("outputData",i,[u],4),c=[{name:"vec_size",type:"u32"}];return s&&c.push(...s),`
      ${e.registerUniforms(c).declareVariables(d,h)}

  ${n??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${h.setByOffset("global_idx",l)}
  }`},he=(e,t,r,i,a,n=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(B.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:d=>Nu(d,B.size(e.dims),e.dataType,n,r,i,u),getRunData:d=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(B.size(d[0].dims)/64/4)},programUniforms:l})}},$c=e=>{e.compute(he(e.inputs[0],"Abs","abs"))},vc=e=>{e.compute(he(e.inputs[0],"Acos","acos"))},xc=e=>{e.compute(he(e.inputs[0],"Acosh","acosh"))},Sc=e=>{e.compute(he(e.inputs[0],"Asin","asin"))},Tc=e=>{e.compute(he(e.inputs[0],"Asinh","asinh"))},kc=e=>{e.compute(he(e.inputs[0],"Atan","atan"))},Ec=e=>{e.compute(he(e.inputs[0],"Atanh","atanh"))},Ic=e=>fe(e),zc=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(he(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Pu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return fe({min:t,max:r})},Cc=(e,t)=>{let r=t||Pu(e.inputs),i=Ce(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Ac=e=>{e.compute(he(e.inputs[0],"Ceil","ceil"))},Oc=e=>{e.compute(he(e.inputs[0],"Cos","cos"))},Bc=e=>{e.compute(he(e.inputs[0],"Cosh","cosh"))},wr=e=>fe(e),Rc=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},ri=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Mc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,ri(t)))},Dc=e=>{e.compute(he(e.inputs[0],"Exp","exp"))},Nc=e=>{e.compute(he(e.inputs[0],"Floor","floor"))},Pc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,ri(t)))},Uc=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(he(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Lc=e=>{e.compute(he(e.inputs[0],"Not",t=>`!${t}`))},qc=e=>{e.compute(he(e.inputs[0],"Neg",t=>`-${t}`))},Fc=e=>{e.compute(he(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Wc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Vc=e=>{e.compute(he(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Gc=e=>fe(e),Hc=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(he(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},jc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(he(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},Kc=e=>{e.compute(he(e.inputs[0],"Sin","sin"))},Zc=e=>{e.compute(he(e.inputs[0],"Sinh","sinh"))},Qc=e=>{e.compute(he(e.inputs[0],"Sqrt","sqrt"))},Xc=e=>{e.compute(he(e.inputs[0],"Tan","tan"))},sa=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Yc=e=>{e.compute(he(e.inputs[0],"Tanh",sa))},Ha=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${sa("v")};
}
`,ja=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Jc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(he(e.inputs[0],"FastGelu",ja,Ha(t),void 0,e.inputs[0].dataType))},eh=(e,t)=>{let r=Ce(e.inputs[0].dataType);return e.compute(he(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},th=e=>{e.compute(he(e.inputs[0],"Log","log"))},Uu=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Lu=e=>`quick_gelu_impl(${e})`,rh=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(he(e.inputs[0],"QuickGelu",Lu,Uu(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),qu,Fu,ih,F0=U(()=>{"use strict";ie(),ae(),yn(),qu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Fu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=R("input",e[0].dataType,e[0].dims,4),i=R("bias",e[0].dataType,[e[0].dims[2]],4),a=j("output",e[0].dataType,t,4),n=B.size(t)/4,s=Ae(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,a)}

  ${ri(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},ih=e=>{qu(e.inputs),e.compute(Fu(e.inputs))}}),Wu,Vu,Qe,ah,nh,sh,oh,uh,lh,dh,ph,ch,hh,W0=U(()=>{"use strict";te(),ie(),ae(),Wu=(e,t,r,i,a,n,s,u,l,d,h,c)=>{let m,b;typeof u=="string"?m=b=(_,k)=>`${u}((${_}),(${k}))`:typeof u=="function"?m=b=u:(m=u.scalar,b=u.vector);let y=j("outputData",h,i.length,4),w=R("aData",l,t.length,4),S=R("bData",d,r.length,4),v;if(a)if(n){let _=B.size(t)===1,k=B.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;_||k?v=y.setByOffset("global_idx",b(_?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),k?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):v=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",b(s||T?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=y.setByOffset("global_idx",b(w.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!n)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let _=(k,T,I="")=>{let z=`aData[indexA${T}][componentA${T}]`,C=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${y.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${w.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let offsetB${T} = ${S.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${k}[${T}] = ${I}(${m(z,C)});
          `};h===9?v=`
            var data = vec4<u32>(0);
            ${_("data",0,"u32")}
            ${_("data",1,"u32")}
            ${_("data",2,"u32")}
            ${_("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${_("outputData[global_idx]",0)}
            ${_("outputData[global_idx]",1)}
            ${_("outputData[global_idx]",2)}
            ${_("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(w,S,y)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},Vu=(e,t,r,i,a,n,s=r.dataType)=>{let u=r.dims.map(Number),l=i.dims.map(Number),d=!B.areEqual(u,l),h=u,c=B.size(u),m=!1,b=!1,y=[d];if(d){let w=Qt.calcShape(u,l,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");h=w.slice(),c=B.size(h);let S=B.size(u)===1,v=B.size(l)===1,_=u.length>0&&u[u.length-1]%4===0,k=l.length>0&&l[l.length-1]%4===0;y.push(S),y.push(v),y.push(_),y.push(k);let T=1;for(let I=1;I<h.length;I++){let z=u[u.length-I],C=l[l.length-I];if(z===C)T*=z;else break}T%4===0?(b=!0,m=!0):(S||v||_||k)&&(m=!0)}else m=!0;return y.push(m),{name:e,shaderCache:{hint:t+y.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>Wu(w,u,l,h,m,d,b,a,r.dataType,i.dataType,s,n),getRunData:()=>({outputs:[{dims:h,dataType:s}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(B.size(h)/4)},...Y(u,l,h)]})}},Qe=(e,t,r,i,a,n)=>{e.compute(Vu(t,a??"",e.inputs[0],e.inputs[1],r,i,n))},ah=e=>{Qe(e,"Add",(t,r)=>`${t}+${r}`)},nh=e=>{Qe(e,"Div",(t,r)=>`${t}/${r}`)},sh=e=>{Qe(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},oh=e=>{Qe(e,"Mul",(t,r)=>`${t}*${r}`)},uh=e=>{let t=R("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Qe(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},lh=e=>{Qe(e,"Sub",(t,r)=>`${t}-${r}`)},dh=e=>{Qe(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},ph=e=>{Qe(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},ch=e=>{Qe(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},hh=e=>{Qe(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Gu,Hu,ju,Ku,fh,mh,V0=U(()=>{"use strict";te(),ie(),ke(),ae(),Gu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,n=i.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==a)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape");s.dims.forEach((l,d)=>{if(d!==t&&l!==i.dims[d])throw new Error("non concat dimensions must match")})}})},Hu=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,ju=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let n=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(n):a===0?i.push(`if (inputIndex == ${a}u) { ${n} }`):a===r-1?i.push(`else { ${n} }`):i.push(`else if (inputIndex == ${a}) { ${n} }`)}return i.join(`
`)},Ku=(e,t,r,i)=>{let a=B.size(r),n=new Array(e.length),s=new Array(e.length),u=0,l=[],d=[],h=[{type:12,data:a}];for(let w=0;w<e.length;++w)u+=e[w].dims[t],n[w]=u,d.push(e[w].dims.length),s[w]=R(`input${w}`,i,d[w]),l.push("rank"),h.push({type:12,data:n[w]});for(let w=0;w<e.length;++w)h.push(...Y(e[w].dims));h.push(...Y(r));let c=j("output",i,r.length),m=c.indicesGet("indices",t),b=Array.from(Array(n.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),y=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)w.registerUniform(`sizeInConcatAxis${S}`,"u32");return w.declareVariables(...s,c)})()}

  ${Hu(n.length,b)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${b});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${ju(s,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:h}),getShaderSource:y}},fh=(e,t)=>{let r=e.inputs,i=r[0].dims,a=B.normalizeAxis(t.axis,i.length);Gu(r,a);let n=i.slice();n[a]=r.reduce((u,l)=>u+(l.dims.length>a?l.dims[a]:0),0);let s=r.filter(u=>B.size(u.dims)>0);e.compute(Ku(s,a,n,r[0].dataType),{inputs:s})},mh=e=>fe({axis:e.axis})}),Pt,Ut,Lt,bn,Ft=U(()=>{"use strict";te(),ie(),Pt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Ut=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Lt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},bn=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Lp,qp];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Re,gh,_n=U(()=>{"use strict";Re=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},gh=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),yh,G0=U(()=>{"use strict";yh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),vr,wn,$n=U(()=>{"use strict";te(),ie(),ae(),Ft(),vr=(e,t,r,i,a)=>{let n=i-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${Q(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,Q(a,u+n,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},wn=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],d=u[u.length-1],h=s[s.length-1],c=Te(d),m=Te(h),b=Te(l),y=B.size(r)/c/b,w=e.length>2,S=i?i.slice(0,-2):r.slice(0,-2),v=[B.size(S),l,d],_=[{type:12,data:y},{type:12,data:l},{type:12,data:d},{type:12,data:h}];Ut(t,_),_.push(...Y(S,s,u)),w&&_.push(...Y(e[2].dims)),_.push(...Y(v));let k=T=>{let I=fn("batch_dims",e[0].dataType,S.length),z=R("a",e[0].dataType,s.length,m),C=R("b",e[1].dataType,u.length,c),x=j("output",e[0].dataType,v.length,c),P=Ae(x.type.tensor),F=Pt(t,x.type.value,P),K=[z,C],V="";if(w){let O=a?c:1;K.push(R("bias",e[2].dataType,e[2].dims.length,O)),V=`${a?`value += bias[col / ${O}];`:`value += ${x.type.value}(bias[row + i]);`}`}let W=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Lt(t,W);let oe=()=>{let O=`var a_data: ${z.type.value};`;for(let L=0;L<m;L++)O+=`
              let b_data${L} = b[(b_offset + (k + ${L}) * uniforms.N + col) / ${c}];`;for(let L=0;L<b;L++){O+=`a_data = a[(a_offset + (row + ${L}) * uniforms.K + k) / ${m}];`;for(let ee=0;ee<m;ee++)O+=`
            values[${L}] = fma(${C.type.value}(a_data${m===1?"":`[${ee}]`}), b_data${ee}, values[${L}]);
`}return O};return`
  ${T.registerUniforms(W).registerInternalVariables(I).declareVariables(...K,x)}
  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${z.type.indices};
    ${vr("a_indices",z,z.rank-2,I.rank,"batch_indices")}
    ${z.indicesSet("a_indices",z.rank-2,0)}
    ${z.indicesSet("a_indices",z.rank-1,0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${C.type.indices};
    ${vr("b_indices",C,C.rank-2,I.rank,"batch_indices")}
    ${C.indicesSet("b_indices",C.rank-2,0)}
    ${C.indicesSet("b_indices",C.rank-1,0)}
    let b_offset = ${C.indicesToOffset("b_indices")};
    var values: array<${x.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${oe()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${V}
      ${F}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${m};${b};${a}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:k}}}),Zu,Qu,Ka,oa,Xu,Za,Yu,ui,vn=U(()=>{"use strict";te(),ie(),ae(),Ft(),$n(),_n(),Zu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Qu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Ka=(e,t,r="f32",i,a=!1,n=32,s=!1,u=32)=>{let l=t[1]*e[1],d=t[0]*e[0],h=a?l:n,c=a?n:l,m=h/t[0],b=n/t[1];if(!((a&&m===4&&e[1]===4||!a&&(m===3||m===4))&&h%t[0]===0&&n%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${r}>, ${h/m}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${b};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Zu(a,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Qu(a,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},oa=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Xu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Za=(e,t,r="f32",i,a=!1,n=32,s=!1,u=32,l=!1)=>{let d=e[1]*t[1],h=e[0]*t[0],c=a?d:n,m=a?n:d;if(!(m%t[1]===0&&c%t[0]===0&&n%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let b=m/t[1],y=c/t[0],w=n/t[1],S=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${h};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${oa(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${b};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${oa(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Xu(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${c}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${h}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`},Yu=(e,t,r,i,a=!1)=>{let[n,s,u,l]=i,d=Ae(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Re(e,d)} {
      var value = ${Re(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${vr("aIndices",s,s.rank-2,n.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Re(e,d)} {
      var value = ${Re(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${vr("bIndices",u,u.rank-2,n.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Re(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${Re(e,d)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ui=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),d=u.slice(0,-2),h=i?i.slice(0,-2):r.slice(0,-2),c=B.size(h),m=s[s.length-2],b=s[s.length-1],y=u[u.length-1],w=b%4===0&&y%4===0,S=m<=8?[4,1,1]:[4,4,1],v=[8,8,1],_=[Math.ceil(y/v[0]/S[0]),Math.ceil(m/v[1]/S[1]),Math.ceil(c/v[2]/S[2])],k=w?4:1,T=[...l,m,b/k],I=T.length,z=[...d,b,y/k],C=z.length,x=[c,m,y/k],P=[{type:6,data:m},{type:6,data:y},{type:6,data:b}];Ut(t,P),P.push(...Y(h,T,z));let F=["rank","rank"],K=e.length>2;K&&(P.push(...Y(e[2].dims)),F.push("rank")),P.push(...Y(x));let V=W=>{let oe=h.length,O=fn("batchDims",e[0].dataType,oe,1),L=Ae(e[0].dataType),ee=R("a",e[0].dataType,I,k),re=R("b",e[1].dataType,C,k),X=j("result",e[0].dataType,x.length,k),ne=[ee,re];if(K){let _e=a?k:1;ne.push(R("bias",e[2].dataType,e[2].dims.length,_e))}let D=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Lt(t,D);let J=Ae(X.type.tensor),Z=Pt(t,X.type.value,J),H=Yu(k,K,Z,[O,ee,re,X],a);return`
  ${W.registerUniforms(D).registerInternalVariables(O).declareVariables(...ne,X)}
  ${H}
  ${w?Ka(S,v,L,O):Za(S,v,L,O)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${w};${a}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:P}),getShaderSource:V}}}),Ju,bh,H0=U(()=>{"use strict";te(),lt(),ae(),Ft(),_n(),G0(),vn(),Ju=(e,t,r,i,a=!1,n,s=4,u=4,l=4,d="f32")=>{let h=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},c=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,b=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",v=e?"col":"row",_=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Re(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${w}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${h(s)}
    }
    return resData;`,k=e?t&&i?`
    let col = colIn * ${s};
    ${_}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${Re(s,d)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${_}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${Re(s,d)}(0.0);`,T=e?i&&r?c(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${c(u)}
    }
    return ${Re(u,d)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${c(u)}
    }
    return ${Re(u,d)}(0.0);`,I=Re(l,d),z=Re(e?s:u,d),C=Re(e?u:s,d),x=Pt(n,I,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?k:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?T:k}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${b}
      ${gh(a)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},bh=(e,t,r,i,a,n,s,u,l)=>{let d=t.format==="NHWC",h=d?e[0].dims[3]:e[0].dims[1],c=r[0],m=d?r[2]:r[3],b=d?r[1]:r[2],y=d?r[3]:r[1],w=d&&(h%4===0||h%3===0)&&y%4===0,S=d?y:m*b,v=d?m*b:y,_=[8,8,1],k=i<=8?[4,1,1]:[4,4,1],T=[Math.ceil(S/_[0]/k[0]),Math.ceil(v/_[1]/k[1]),Math.ceil(c/_[2]/k[2])];pe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let I=w?d&&h%4!==0?3:4:1,z=_[1]*k[1],C=_[0]*k[0],x=Math.max(_[0]*I,_[1]),P=i%z===0,F=a%C===0,K=n%x===0,V=w?[I,4,4]:[1,1,1],W=[{type:6,data:i},{type:6,data:a},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ut(t,W),W.push(...Y(e[0].dims,e[1].dims));let oe=["rank","rank"];s&&(W.push(...Y(e[2].dims)),oe.push("rank")),W.push(...Y(r));let O=L=>{let ee=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Lt(t,ee);let re=w?4:1,X=Ae(e[0].dataType),ne=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${X}>`:X}) {
        result[flatIndex] = ${w?`vec4<${X}>`:X}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${X}>`:X}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,D=R("x",e[0].dataType,e[0].dims.length,I===3?1:I),J=R("w",e[1].dataType,e[1].dims.length,re),Z=[D,J],H=j("result",e[0].dataType,r.length,re);if(s){let _e=R("bias",e[2].dataType,e[2].dims.length,re);Z.push(_e),ne+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${X}>`:X} {
          return bias[coords.${d?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${yh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${L.registerUniforms(ee).declareVariables(...Z,H)}
        ${ne}
        ${Ju(d,P,F,K,s,t,V[0],V[1],V[2],X)}
        ${w?Ka(k,_,X,void 0,!d,x):Za(k,_,X,void 0,!d,x,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${w};${P};${F};${K};${z};${C};${x}`,inputDependencies:oe},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:W}),getShaderSource:O}}}),el,ua,cr,tl,la,rl,_h,wh,j0=U(()=>{"use strict";te(),lt(),ie(),ae(),Ft(),_n(),el=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},ua=e=>typeof e=="number"?[e,e,e]:e,cr=(e,t)=>t<=1?e:e+(e-1)*(t-1),tl=(e,t,r,i=1)=>{let a=cr(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},la=(e,t,r,i,a)=>{a==null&&(a=tl(e,t[0],i[0]));let n=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*a>=t[s]&&(n[s]=Math.trunc((e[s]-t[s]+2*a)/i[s]+1));return n},rl=(e,t,r,i,a,n,s,u,l,d)=>{let h,c,m,b;if(e==="VALID"&&(e=0),typeof e=="number"){h={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=la([t,r,i,1],[u,l,d],1,[a,n,s],e);c=y[0],m=y[1],b=y[2]}else if(Array.isArray(e)){if(!e.every((w,S,v)=>w===v[0]))throw Error(`Unsupported padding parameter: ${e}`);h={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=la([t,r,i,1],[u,l,d],1,[a,n,s],e[0]);c=y[0],m=y[1],b=y[2]}else if(e==="SAME_UPPER"){c=Math.ceil(t/a),m=Math.ceil(r/n),b=Math.ceil(i/s);let y=(c-1)*a+u-t,w=(m-1)*n+l-r,S=(b-1)*s+d-i,v=Math.floor(y/2),_=y-v,k=Math.floor(w/2),T=w-k,I=Math.floor(S/2),z=S-I;h={top:k,bottom:T,left:I,right:z,front:v,back:_}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:h,outDepth:c,outHeight:m,outWidth:b}},_h=(e,t,r,i,a,n=!1,s="channelsLast")=>{let u,l,d,h,c;if(s==="channelsLast")[u,l,d,h,c]=e;else if(s==="channelsFirst")[u,c,l,d,h]=e;else throw new Error(`Unknown dataFormat ${s}`);let[m,,b,y,w]=t,[S,v,_]=ua(r),[k,T,I]=ua(i),z=cr(b,k),C=cr(y,T),x=cr(w,I),{padInfo:P,outDepth:F,outHeight:K,outWidth:V}=rl(a,l,d,h,S,v,_,z,C,x),W=n?m*c:m,oe=[0,0,0,0,0];return s==="channelsFirst"?oe=[u,W,F,K,V]:s==="channelsLast"&&(oe=[u,F,K,V,W]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:d,inWidth:h,inChannels:c,outDepth:F,outHeight:K,outWidth:V,outChannels:W,padInfo:P,strideDepth:S,strideHeight:v,strideWidth:_,filterDepth:b,filterHeight:y,filterWidth:w,effectiveFilterDepth:z,effectiveFilterHeight:C,effectiveFilterWidth:x,dilationDepth:k,dilationHeight:T,dilationWidth:I,inShape:e,outShape:oe,filterShape:t}},wh=(e,t,r,i,a,n)=>{let s=n==="channelsLast",u=s?e[0].dims[3]:e[0].dims[1],l=!1,d=[64,1,1],h={x:r.map((_,k)=>k)},c=[Math.ceil(el(h.x.map(_=>r[_]))/d[0]),1,1];pe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let m=l?s&&u%4!==0?3:4:1,b=B.size(r),y=[{type:12,data:b},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Ut(t,y),y.push(...Y(e[0].dims,e[1].dims));let w=["rank","rank"],S=e.length===3;S&&(y.push(...Y(e[2].dims)),w.push("rank")),y.push(...Y(r));let v=_=>{let k=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Lt(t,k);let T=l?4:1,I=Ae(e[0].dataType),z=R("x",e[0].dataType,e[0].dims.length,m===3?1:m),C=R("W",e[1].dataType,e[1].dims.length,T),x=[z,C],P=j("result",e[0].dataType,r.length,T),F="";if(S){let W=R("bias",e[2].dataType,e[2].dims.length,T);x.push(W),F+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${I}>`:I} {
          return bias[${s?Q("coords",4,5):Q("coords",1,5)}${l?"/ 4":""}];
        }`}let K=Re(m,I),V=Pt(t,K,I);return`
            ${F}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${z.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
          ${_.registerUniforms(k).declareVariables(...x,P)}
          ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${P.offsetToIndices("global_idx")};
              let batch = ${Q("coords",0,z.rank)};
              let d2 = ${s?Q("coords",z.rank-1,z.rank):Q("coords",1,z.rank)};
              let xFRCCorner = vec3<u32>(${s?Q("coords",1,z.rank):Q("coords",2,z.rank)},
              ${s?Q("coords",2,z.rank):Q("coords",3,z.rank)},
              ${s?Q("coords",3,z.rank):Q("coords",4,z.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?Q("uniforms.x_shape",1,z.rank):Q("uniforms.x_shape",2,z.rank)};
              let xShapeZ = ${s?Q("uniforms.x_shape",2,z.rank):Q("uniforms.x_shape",3,z.rank)};
              let xShapeW = ${s?Q("uniforms.x_shape",3,z.rank):Q("uniforms.x_shape",4,z.rank)};
              let xShapeU = ${s?Q("uniforms.x_shape",4,z.rank):Q("uniforms.x_shape",1,z.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${V}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${m};${S}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:y}),getShaderSource:v}}}),$h,vh,K0=U(()=>{"use strict";te(),ie(),ae(),Ft(),$h=(e,t,r,i)=>{let a=e.length>2,n=a?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",d=l?r[3]:r[1],h=d/t.group,c=l&&h>=4?Te(d):1,m=B.size(r)/c,b=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:h}];Ut(t,b),b.push(...Y(s,[u[0],u[1],u[2],u[3]/c]));let y=a?["rank","rank","rank"]:["rank","rank"];b.push(...Y([r[0],r[1],r[2],r[3]/c]));let w=S=>{let v=j("output",e[0].dataType,r.length,c),_=Ae(v.type.tensor),k=Pt(t,v.type.value,_),T=R("x",e[0].dataType,s.length),I=R("w",e[1].dataType,u.length,c),z=[T,I];a&&z.push(R("b",e[2].dataType,e[2].dims,c));let C=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Lt(t,C);let x=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${T.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${T.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(C).declareVariables(...z,v)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${x}
    ${n}
    ${k}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${c}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:w}},vh=(e,t,r,i)=>{let a=e.length>2,n=Te(r[3]),s=Te(r[2]),u=B.size(r)/n/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/n],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/n],h=[r[0],r[1],r[2],r[3]/n],c=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ut(t,c),c.push(...Y(l,d,h));let m=(s-1)*t.strides[1]+d[1],b=y=>{let w=j("output",e[0].dataType,h.length,n),S=Ae(w.type.tensor),v=Pt(t,w.type.value,S),_=R("x",e[0].dataType,l.length,n),k=R("w",e[1].dataType,d.length,n),T=[_,k];a&&T.push(R("b",e[2].dataType,e[2].dims,n));let I=a?"value += b[output_channel];":"",z=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Lt(t,z),`
  ${y.registerUniforms(z).declareVariables(...T,w)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${_.type.value}, ${m}>;
    var values: array<${w.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${_.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${_.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${k.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${I}
      ${v}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${n};${s};${m};${d[0]};${d[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:b}}}),il,Kr,al,Zr,Qa,da,nl,sl,Xa,Z0=U(()=>{"use strict";ie(),H0(),j0(),vn(),K0(),Ft(),$n(),vt(),il=(e,t,r,i,a,n)=>{let s=e[0],u=e.slice(n?1:2,n?3:4),l=u.length,d=t[0],h=t.slice(2).map((m,b)=>m+(m-1)*(r[b]-1)),c=u.map((m,b)=>m+i[b]+i[b+l]).map((m,b)=>Math.floor((m-h[b]+a[b])/a[b]));return c.splice(0,0,s),c.splice(n?3:1,0,d),c},Kr=[2,3,1,0],al=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Zr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let n=2;n<t[1].dims.length;++n)r[n-2]===0&&(r[n-2]=t[1].dims[n]);let i=e.pads.slice();si.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},Qa=e=>{let t=bn(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,n=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,d=e.w_is_const();return Fe(Me({autoPad:i,format:r,dilations:a,group:n,kernelShape:s,pads:u,strides:l,wIsConst:d},t),{cacheKey:`${e.format};${t.activation};`})},da=(e,t,r,i)=>{let a=r.format==="NHWC",n=il(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let z=[t[0]];if(a){let C=e.kernelCustomData.wT??e.compute(Le(t[1],Kr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=C),z.push(C)}else z.push(t[1]);t.length===3&&z.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(vh(z,r,n,i),{inputs:z}):e.compute($h(z,r,n,i),{inputs:z});return}let s=t.length===3,u=t[0].dims[a?1:2],l=t[0].dims[a?2:3],d=t[0].dims[a?3:1],h=t[1].dims[2],c=t[1].dims[3],m=n[a?1:2],b=n[a?2:3],y=n[a?3:1],w=a&&h===u&&c===l&&r.pads[0]===0&&r.pads[1]===0;if(w||h===1&&c===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let z=n[0],C,x,P,F=[];if(a){let W=e.kernelCustomData.wT??e.compute(Le(t[1],Kr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=W),w){let oe=u*l*d;C=t[0].reshape([1,z,oe]),x=W.reshape([1,oe,y]),P=[1,z,y]}else C=t[0].reshape([z,u*l,d]),x=W.reshape([1,d,y]),P=[z,m*b,y];F.push(C),F.push(x)}else C=t[0].reshape([z,d,u*l]),x=t[1].reshape([1,y,d]),P=[z,y,m*b],F.push(x),F.push(C);s&&F.push(t[2]);let K=P[2],V=F[0].dims[F[0].dims.length-1];K<8&&V<8?e.compute(wn(F,r,n,P,a,i),{inputs:F}):e.compute(ui(F,r,n,P,a,i),{inputs:F});return}let S=!0,v=e.kernelCustomData.wT??e.compute(Le(t[1],Kr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let _=[t[0],v];s&&_.push(t[2]);let k=a?m*b:y,T=a?y:m*b,I=h*c*d;e.compute(bh(_,r,n,k,T,I,s,S,i),{inputs:_})},nl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],n=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=Zr(Fe(Me({},t),{pads:a,strides:n,dilations:s,kernelShape:u}),i);da(e,i,l,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},sl=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=Zr(r,t),n=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=_h(t[0].dims,t[1].dims,r.strides,r.dilations,n,!1,i);e.compute(wh(t,a,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},Xa=(e,t)=>{if(al(e.inputs,t),e.inputs[0].dims.length===3)nl(e,t);else if(e.inputs[0].dims.length===5)sl(e,e.inputs,t);else{let r=Zr(t,e.inputs);da(e,e.inputs,r)}}}),xh,Q0=U(()=>{"use strict";te(),lt(),ie(),ae(),xh=(e,t,r)=>{let i=e.length>2,a=t.outputShape,n=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,d=u[3],h=n?Te(l):1,c=n&&d===1&&l>=4,m=c?Math.floor(l/4)*4:Math.floor(l/h)*h,b=l-m,y=n?Te(d):1,w=n?d===1?h:y:1,S=B.size(a)/y,v=[Math.ceil(S/64),1,1];pe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let _=["rank","rank"],k=[t.strides[0],t.strides[1]],T=[t.kernelShape[n?1:2],t.kernelShape[n?2:3]],I=[t.dilations[0],t.dilations[1]],z=[T[0]+(t.dilations[0]<=1?0:(t.kernelShape[n?1:2]-1)*(t.dilations[0]-1)),T[1]+(t.dilations[1]<=1?0:(t.kernelShape[n?2:3]-1)*(t.dilations[1]-1))],C=[z[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),z[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],x=[{type:12,data:S},{type:12,data:k},{type:12,data:T},{type:12,data:I},{type:12,data:z},{type:6,data:C},{type:12,data:m},{type:12,data:l},{type:12,data:d},...Y(e[0].dims,e[1].dims)];i&&(x.push(...Y(e[2].dims)),_.push("rank")),x.push(...Y(a));let P=F=>{let K=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:k.length},{name:"filter_dims",type:"u32",length:T.length},{name:"dilations",type:"u32",length:T.length},{name:"effective_filter_dims",type:"u32",length:z.length},{name:"pads",type:"i32",length:C.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],V=Ae(e[0].dataType),W=n?1:2,oe=n?2:3,O=n?3:1,L=R("W",e[1].dataType,e[1].dims.length,w),ee=R("Dy",e[0].dataType,e[0].dims.length,h),re=[ee,L];i&&re.push(R("bias",e[2].dataType,[a[O]].length,y));let X=j("result",e[0].dataType,a.length,y),ne=()=>{let Z="";if(c)h===4?Z+=`
        let xValue = ${ee.getByOffset("x_offset")};
        let wValue = ${L.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:h===2?Z+=`
          dotProd = dotProd + dot(vec4<${V}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}), vec4<${V}>(${L.getByOffset("w_offset")}, ${L.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:h===1&&(Z+=`
          dotProd = dotProd + dot(vec4<${V}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}, ${ee.getByOffset("x_offset + 2u")}, ${ee.getByOffset("x_offset + 3u")}), vec4<${V}>(${L.getByOffset("w_offset")}, ${L.getByOffset("w_offset + 1u")}, ${L.getByOffset("w_offset + 2u")}, ${L.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(Z+=`
                  let xValue = ${n?ee.getByOffset(`${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h}`):ee.get("batch","inputChannel","idyR","idyC")};
        `,h===1)Z+=`
          let w_offset = ${L.indicesToOffset(`${L.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${L.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let H=0;H<h;H++)Z+=`
            let wValue${H} = ${L.getByOffset(`${L.indicesToOffset(`${L.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${H}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${H}] * wValue${H};`;return Z},D=()=>{if(b===0)return"";if(!c)throw new Error(`packInputAs4 ${c} is not true.`);let Z="";if(h===1){Z+="dotProd = dotProd";for(let H=0;H<b;H++)Z+=`
            + ${ee.getByOffset(`x_offset + ${H}`)} * ${L.getByOffset(`w_offset + ${H}`)}`;Z+=";"}else if(h===2){if(b!==2)throw new Error(`Invalid inputChannelsRemainder ${b}.`);Z+=`
          let xValue = ${ee.getByOffset("x_offset")};
          let wValue = ${L.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Z},J=`
            let outputIndices = ${X.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${X.indicesGet("outputIndices",0)};
            let d1 = ${X.indicesGet("outputIndices",O)};
            let r = ${X.indicesGet("outputIndices",W)};
            let c = ${X.indicesGet("outputIndices",oe)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${X.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${V}(dyRCorner) + ${V}(wR)) / ${V}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${V}(uniforms.Dy_shape[${W}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${V}(dyCCorner) + ${V}(wC)) / ${V}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${V}(uniforms.Dy_shape[${oe}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c?`
                var x_offset = ${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h};
                var w_offset = ${L.indicesToOffset(`${L.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${c?4:h}) {
                  ${ne()}
                  inputChannel = inputChannel + ${c?4:h};
                }
                ${D()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${y}]`:""};
            ${X.setByOffset("global_idx","value")};
          `;return`
    ${F.registerUniforms(K).declareVariables(...re,X)}
      ${F.mainStart()}
      ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${J}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${h}${w}${y}${c}${b}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:P}}}),ol,ul,ll,pa,Sh,dl,ca,pl,Th,X0=U(()=>{"use strict";Q0(),Ft(),vt(),ol=(e,t,r,i,a,n)=>(e-1)*t+r+(i-1)*a+1-n,ul=(e,t,r,i,a)=>{let n=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=n,r[a]=e-n):t==="SAME_LOWER"&&(r[i]=e-n,r[a]=n)},ll=(e,t,r,i,a,n,s,u,l,d)=>{let h=e.length-2,c=d.length===0;l.length<h&&l.push(...Array(h-l.length).fill(0));let m=e[0],b=t[u?3:1]*a;for(let y=0,w=e.length-h-(u?1:0);y<h;++y,++w){let S=e[w],v=c?S*s[y]:d[y],_=ol(S,s[y],n[y],t[w],r[y],v);ul(_,i,n,y,y+h),c&&d.push(s[y]*(S-1)+l[y]+(t[w]-1)*r[y]+1-n[y]-n[y+h])}d.splice(0,0,m),d.splice(u?3:1,0,b)},pa=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((c,m)=>c*m,1)===0){r.length=0;for(let c=2;c<t[1].dims.length;++c)r.push(t[1].dims[c])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((c,m)=>c+m,0)===0){let c=t[0].dims.length-2;l=new Array(c).fill(1)}let d=e.strides.slice();if(d.reduce((c,m)=>c+m,0)===0){let c=t[0].dims.length-2;d=new Array(c).fill(1)}ll(u,r,l,e.autoPad,e.group,a,d,i,s,n);let h=Object.assign({},e);return Object.assign(h,{kernelShape:r,pads:a,outputPadding:s,outputShape:n,dilations:l,strides:d}),h},Sh=e=>{let t=bn(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,n=e.group??1,s=e.kernelShape,u=e.pads,l=e.strides,d=e.wIsConst(),h=e.outputPadding,c=e.outputShape;return Fe(Me({autoPad:i,format:r,dilations:a,group:n,kernelShape:s,outputPadding:h,outputShape:c,pads:u,strides:l,wIsConst:d},t),{cacheKey:`${e.format};${t.activation};`})},dl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},ca=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(Le(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let n=[t[0],a];t.length===3&&n.push(t[2]),e.compute(xh(n,r,i),{inputs:n})},pl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let n=t.dilations;(n.length===0||n[0]===0)&&(n=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),n=[1].concat(n),a=[1].concat(a);let l=t.outputPadding;l=[0].concat(l);let d=pa(Fe(Me({},t),{pads:u,strides:s,dilations:n,kernelShape:a,outputPadding:l}),i);ca(e,i,d,h=>r?[h[0],h[2],h[3]]:[h[0],h[1],h[3]])},Th=(e,t)=>{if(dl(e.inputs,t),e.inputs[0].dims.length===3)pl(e,t);else{let r=pa(t,e.inputs);ca(e,e.inputs,r)}}}),cl,kh,Eh,Y0=U(()=>{"use strict";te(),ie(),ke(),ae(),cl=(e,t,r,i)=>{let a=B.size(t),n=t.length,s=R("input",e,n),u=j("output",e,n),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=B.normalizeAxis(l,n),h=c=>{let m=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,b=Q("uniforms.input_shape","uniforms.axis",n),y=i.reverse?m+(i.exclusive?" + 1":""):"0",w=i.reverse?b:m+(i.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:d},...Y(t,t)]}),getShaderSource:h}},kh=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(cl(i,r,a,t),{inputs:[0]})},Eh=e=>{let t=e.exclusive===1,r=e.reverse===1;return fe({exclusive:t,reverse:r})}}),hl,fl,ml,Ih,zh,J0=U(()=>{"use strict";te(),ie(),ke(),ae(),hl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},fl=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)a.push(r.indicesSet("a",e[n],`i[${n}]`));return a.push("return a;}"),a.join(`
`)},ml=(e,t)=>{let r,i,a,n,s,u,l=t.format==="NHWC",d=t.blocksize,h=t.mode==="DCR";l?([r,i,a,n]=e.dims,s=h?[r,i,a,d,d,n/d**2]:[r,i,a,n/d**2,d,d],u=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,n]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=h?[r,d,d,n/d**2,i,a]:[r,n/d**2,d,d,i,a],u=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(s),m=c.dims.length,b=e.dataType,y=R("a",b,m),w=j("output",b,m),S=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(y,w)}

  ${fl(u,m,y,w)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let _=l?[r,i*d,a*d,n/d**2]:[r,n/d**2,i*d,a*d],k=B.size(_),T=c.dims,I=B.sortBasedOnPerm(T,u);return{outputs:[{dims:_,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},...Y(T,I)]}},getShaderSource:S}},Ih=(e,t)=>{hl(e.inputs),e.compute(ml(e.inputs[0],t))},zh=e=>fe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),st,hr,Qr,ha,yt,gl,yl,bl,fa,ma,ga,_l,wl,ya,$l,Ch,Ah,ey=U(()=>{"use strict";te(),ie(),ke(),ae(),st=256,hr=512,Qr=2*Math.PI,ha=e=>{let t=[],r=e;for(let i of[4,2,3,5])for(;r%i===0;)t.push(i),r/=i;return r===1?t:void 0},yt=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},gl=(e,t,r,i,a)=>{let n=r/e,s=hr-i,u=d=>`smem[${s}u + base + ${d*t}u]`,l=`  for (var t = local_idx; t < ${n}u; t += ${st}u) {
`;l+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,l+=`    var leg: array<vec2<f32>, 5>;
`;for(let d=0;d<e;d++){let h=`${i}u + t + ${d*n}u`;if(d===0)l+=`    leg[0] = smem[${h}];
`;else{let c=a*Qr*d/(e*t);l+=`    { let a = ${yt(c)} * angleUnit; leg[${d}] = cmul(smem[${h}], vec2<f32>(cos(a), sin(a))); }
`}}if(l+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)l+=`    ${u(0)} = leg[0] + leg[1];
    ${u(1)} = leg[0] - leg[1];
`;else if(e===4){let d=a<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";l+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,l+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,l+=`    let oddRot = ${d};
`,l+=`    ${u(0)} = evenSum + oddSum;
    ${u(1)} = evenDiff + oddRot;
`,l+=`    ${u(2)} = evenSum - oddSum;
    ${u(3)} = evenDiff - oddRot;
`}else for(let d=0;d<e;d++){let h=["leg[0]"];for(let c=1;c<e;c++){let m=a*Qr*(c*d)/e,b=yt(Math.cos(m)),y=yt(Math.sin(m));h.push(`vec2<f32>(leg[${c}].x*${b} - leg[${c}].y*${y}, leg[${c}].x*${y} + leg[${c}].y*${b})`)}l+=`    ${u(d)} = ${h.join(" + ")};
`}return`${l}  }
  workgroupBarrier();
`},yl=(e,t,r)=>{let i="",a=1,n=0;for(let s of e)i+=gl(s,a,t,n,r),a*=s,n=hr-n;return{code:i,resultOffset:n}},bl=(e,t,r,i,a)=>{let n=e.dims,s=n.length,u=n[s-1],l=n[t],d=r&&i?(l-1)*2:l;a!==void 0&&(d=a);let h=r&&i?1:2,c=i&&!r?Math.floor(d/2)+1:d,m=n.slice();m[t]=c,m[s-1]=h;let b=1;for(let w=t+1;w<s-1;w++)b*=n[w];let y=B.size(n)/u/l;return{dataType:e.dataType,outputDims:m,length:d,signalLength:l,inner:b,batch:y,inputComponents:u,outputComponents:h,outputLength:c,inverse:r,onesided:i}},fa=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),ma=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],ga=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),_l=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:a,inverse:n,onesided:s}=e,u=Ce(t),l=n?1:-1,d=n?1/r:1,h=ha(r),c=m=>{let b=R("x",t,[1]),y=j("y",t,[1]),w=I=>{let z=`inBase + (${I}) * uniforms.inner * ${i}u`,C=`f32(${b.getByOffset(z)})`,x=i===2?`f32(${b.getByOffset(`${z} + 1u`)})`:"0.0";return`vec2<f32>(${C}, ${x})`},S;if(n&&s){let I=Math.floor(r/2)+1,z=r%2===0?`select(provided, provided - 1u, provided == ${I}u)`:"provided";S=`
    let provided = min(uniforms.signalLength, ${I}u);
    for (var i = local_idx; i < ${r}u; i += ${st}u) {
      if (i < provided) { smem[i] = ${w("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${z}; k += ${st}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else S=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${st}u) {
      if (i < loadCount) { smem[i] = ${w("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:v,resultOffset:_}=yl(h,r,l),k=d===1?`smem[${_}u + i]`:`smem[${_}u + i] * ${yt(d)}`,T=a===2?y.setByOffset("off + 1u",`${u}(v.y)`):"";return`
  ${ga(m,b,y)}
  var<workgroup> smem: array<vec2<f32>, ${2*hr}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${m.mainStart(st)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${a}u;
    ${S}
${v}    for (var i = local_idx; i < uniforms.outputLength; i += ${st}u) {
      let v = ${k};
      let off = outBase + i * uniforms.inner * ${a}u;
      ${y.setByOffset("off",`${u}(v.x)`)}
      ${T}
    }
  }`};return{name:"DFT",shaderCache:{hint:fa(e,"fft"),inputDependencies:["type"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:ma(e),dispatchGroup:{x:e.batch}})}},wl=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:a,inverse:n,onesided:s}=e,u=Ce(t),l=n?1:-1,d=n?1/r:1,h=c=>{let m=R("x",t,[1]),b=j("y",t,[1]),y=k=>{let T=`inBase + (${k}) * uniforms.inner * ${i}u`,I=`f32(${m.getByOffset(T)})`,z=i===2?`f32(${m.getByOffset(`${T} + 1u`)})`:"0.0";return`vec2<f32>(${I}, ${z})`},w=n&&s?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${y("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${y("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${y("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,S=`
      let angle = ${yt(l*Qr)} * f32(knMod) / ${yt(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,v=a===2?b.setByOffset("off + 1u",`${u}(v.y)`):"",_=d===1?"acc":`acc * ${yt(d)}`;return`
  ${ga(c,m,b)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${w}
  ${c.mainStart(st)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${a}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${st}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${S}
      }
      let v = ${_};
      let off = outBase + k * uniforms.inner * ${a}u;
      ${b.setByOffset("off",`${u}(v.x)`)}
      ${v}
    }
  }`};return{name:"DFT",shaderCache:{hint:fa(e,"direct"),inputDependencies:["type"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:ma(e),dispatchGroup:{x:e.batch}})}},ya=e=>{if(!e||e.dataType===0)return;if(B.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},$l=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},Ch=(e,t)=>{$l(e.inputs);let r=e.inputs[0],i=r.dims.length,a=t.inverse!==0,n=t.onesided!==0,s=ya(e.inputs[1]);if(s!==void 0&&s<=0)throw new Error("dft_length must be greater than zero.");let u=B.normalizeAxis(ya(e.inputs[2])??t.axis,i);if(u===i-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(a&&n&&r.dims[i-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let l=bl(r,u,a,n,s);if(l.length<=0)throw new Error(`Invalid DFT length: ${l.length}`);let d=l.length<=hr&&ha(l.length)!==void 0?_l(l):wl(l);e.compute(d,{inputs:[0]})},Ah=e=>fe({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Xr,fr,ba,vl,xl,Sl,Tl,_a,kl,Oh,Bh,ty=U(()=>{"use strict";te(),ie(),ke(),ae(),Xr="[a-zA-Z]|\\.\\.\\.",fr="("+Xr+")+",ba="^"+fr+"$",vl="("+fr+",)*"+fr,xl="^"+vl+"$",Sl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Tl=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(xl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,n)=>{let s=e[n].dims.slice();if(!a.match(RegExp(ba)))throw new Error("Invalid LHS term");let u=this.processTerm(a,!0,s,n);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,n])=>n.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(fr)))throw new Error("Invalid RHS");i.match(RegExp(Xr,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let n=this.symbolToInfo.get(a);if(n===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(n.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,n=!1,s=[],u=0;if(!e.match(RegExp(ba))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Xr,"g")),d=new Sl(i);return l?.forEach((h,c)=>{if(h==="..."){if(n)throw new Error("Only one ellipsis is allowed per input term");n=!0;let m=a-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<s.length;b++){let y=String.fromCharCode(48+b);d.addSymbol(y,c+b),this.addSymbol(y,r[u++],i)}}else d.addSymbol(h,c+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[u++],i)}),d}},_a=e=>e+"_max",kl=(e,t,r,i)=>{let a=e.map(d=>d.length).map((d,h)=>R(`input${h}`,t,d)),n=B.size(i),s=j("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),l=d=>{let h=[],c="var prod = 1.0;",m="var sum = 0.0;",b="sum += prod;",y=[],w=[],S=[],v=[],_=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((T,I)=>{if(r.rhs.symbolToIndices.has(I)){let z=r.rhs.symbolToIndices.get(I)?.[0];z!==void 0&&r.lhs.forEach((C,x)=>{if(T.inputIndices.includes(x)){let P=C.symbolToIndices.get(I);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(F=>{h.push(`${a[x].indicesSet(`input${x}Indices`,F,s.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,C)=>{if(T.inputIndices.includes(C)){let x=z.symbolToIndices.get(I);if(x===void 0)throw new Error("Invalid symbol error");x.forEach(P=>{y.push(`${a[C].indicesSet(`input${C}Indices`,P,`${I}`)}`)}),v.push(`prod *= ${a[C].getByIndices(`input${C}Indices`)};`)}}),w.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${_a(I)}; ${I}++) {`),S.push("}")});let k=_?[...h,`let sum = ${a.map((T,I)=>T.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...h,m,...w,...y,c,...v,b,...S];return`
            ${d.registerUniforms(u.map(T=>({name:`${_a(T)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((T,I)=>`var input${I}Indices: ${a[I].type.indices};`).join(`
`)}
            ${k.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=u.filter(c=>r.symbolToInfo.has(c)).map(c=>({type:12,data:r.symbolToInfo.get(c)?.dimValue||0}));d.push({type:12,data:n});let h=e.map((c,m)=>[...Y(c)]).reduce((c,m)=>c.concat(m),d);return h.push(...Y(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h}},getShaderSource:l}},Oh=(e,t)=>{let r=new Tl(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((n,s)=>n.dims);e.compute(kl(a,e.inputs[0].dataType,r,i))},Bh=e=>{let t=e.equation.replace(/\s+/g,"");return fe({equation:t})}}),El,wa,Il,zl,Rh,ry=U(()=>{"use strict";te(),ie(),ae(),El=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},wa=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},Il=(e,t)=>e.length>t.length?wa(e,t):wa(t,e),zl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=Il(t,r),a=e[0].dataType,n=a===9||B.size(t)===1,s=a===9||t.length>0&&t[t.length-1]%4===0?4:1,u=n||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(B.size(i)/u),d=c=>{let m=R("input",a,t.length,s),b=j("output",a,i.length,u),y;if(a===9){let w=(S,v,_="")=>`
          let outputIndices${v} = ${b.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${m.broadcastedIndicesToOffset(`outputIndices${v}`,b)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${S}[${v}] = ${_}(${m.getByOffset(`index${v}`)}[component${v}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${b.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${b.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",b)};
        let data = ${b.type.value}(${m.getByOffset(`inputOffset / ${s}`)});
        ${b.setByOffset("global_idx","data")}
      }`;return`
    ${c.registerUniform("vec_size","u32").declareVariables(m,b)}
    ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},h=[{type:12,data:l},...Y(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h})}},Rh=e=>{El(e.inputs),e.compute(zl(e.inputs),{inputs:[0]})}}),Cl,Mh,iy=U(()=>{"use strict";te(),ie(),ae(),yn(),Cl=e=>{let t=e[0].dataType,r=B.size(e[0].dims),i=B.size(e[1].dims),a=i%4===0,n=s=>{let u=R("x",t,[1],4),l=R("bias",t,[1],4),d=j("y",t,[1],4),h=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${l.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,m=a?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(h).declareVariables(u,l,d)}

    ${Ha(Ce(t))}

    ${s.mainStart(Xt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",ja("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:n,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Xt/4)}})}},Mh=e=>{e.inputs.length<2||B.size(e.inputs[1].dims)===0?Jc(e):e.compute(Cl(e.inputs))}}),Al,Ol,Dh,Nh,ay=U(()=>{"use strict";te(),ie(),ke(),ae(),Al=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Ol=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=B.normalizeAxis(t.axis,a),s=r.slice(0);s.splice(n,1,...i);let u=r[n],l=e[0].dataType===9?4:1,d=Math.ceil(B.size(s)/l),h=[{type:12,data:d},{type:6,data:u},{type:12,data:n},...Y(e[0].dims,e[1].dims,s)],c=m=>{let b=R("data",e[0].dataType,e[0].dims.length,l),y=R("inputIndices",e[1].dataType,e[1].dims.length),w=j("output",e[0].dataType,s.length,l),S=_=>{let k=i.length,T=`var indicesIndices${_}  = ${y.type.indices}(0);`;for(let I=0;I<k;I++)T+=`${k>1?`indicesIndices${_}[${I}]`:`indicesIndices${_}`} = ${s.length>1?`outputIndices${_}[uniforms.axis + ${I}]`:`outputIndices${_}`};`;T+=`
          var idx${_} = ${y.getByIndices(`indicesIndices${_}`)};
          if (idx${_} < 0) {
            idx${_} = idx${_} + uniforms.axisDimLimit;
          }
          var dataIndices${_} : ${b.type.indices};
        `;for(let I=0,z=0;I<a;I++)I===n?(T+=`${a>1?`dataIndices${_}[${I}]`:`dataIndices${_}`} = u32(idx${_});`,z+=k):(T+=`${a>1?`dataIndices${_}[${I}]`:`dataIndices${_}`} = ${s.length>1?`outputIndices${_}[${z}]`:`outputIndices${_}`};`,z++);return T},v;if(e[0].dataType===9){let _=(k,T,I="")=>`
          let outputIndices${T} = ${w.offsetToIndices(`outputOffset + ${T}u`)};
          ${S(T)};
          let offset${T} = ${b.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${k}[${T}] = ${I}(${b.getByOffset(`index${T}`)}[component${T}]);
        `;v=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${_("value",0,"u32")}
        ${_("value",1,"u32")}
        ${_("value",2,"u32")}
        ${_("value",3,"u32")}
        ${w.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${b.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,y,w)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:c}},Dh=e=>fe({axis:e.axis}),Nh=(e,t)=>{let r=e.inputs;Al(r),e.compute(Ol(e.inputs,t))}}),Bl,Ph,Uh,ny=U(()=>{"use strict";te(),ie(),ae(),Bl=(e,t,r,i,a,n,s,u,l)=>{let d=[{type:12,data:n},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:l}],h=[n];d.push(...Y(t.dims,h));let c=m=>{let b=R("indices_data",t.dataType,t.dims.length),y=j("input_slice_offsets_data",12,1,1),w=[b,y],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(S).declareVariables(...w)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:h,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:d}),getShaderSource:c},{inputs:[t],outputs:[-1]})[0]},Ph=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,n=r[1].dims,s=n[n.length-1],u=B.sizeToDimension(n,n.length-1),l=B.sizeFromDimension(i,t.batchDims+s),d=B.sizeToDimension(i,t.batchDims),h=B.sizeFromDimension(i,t.batchDims),c=u/d,m=new Array(s),b=l;for(let T=0;T<s;++T)m[s-1-T]=b,b*=i[t.batchDims+s-1-T];let y=Bl(e,r[1],m,t.batchDims,i,u,c,h,s),w=t.batchDims+s;if(w>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=n.slice(0,-1).concat(i.slice(w)),v=B.size(S),_=[{type:12,data:v},{type:12,data:l},...Y(r[0].dims,y.dims,S)],k=T=>{let I=R("data",r[0].dataType,r[0].dims.length),z=R("slice_offsets",12,y.dims.length),C=j("output",r[0].dataType,S.length);return`
          ${T.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,z,C)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:a}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:_}),getShaderSource:k},{inputs:[r[0],y]})},Uh=e=>({batchDims:e.batch_dims,cacheKey:""})}),Rl,Ml,Lh,qh,sy=U(()=>{"use strict";te(),ie(),ke(),ae(),Rl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=B.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],n=e[2],s=e.length===4?e[3]:void 0;if(n.dims.length!==a.dims.length||!a.dims.map((u,l)=>l===r?Math.ceil(u/i)===n.dims[l]:u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==n.dims.length||!s.dims.map((u,l)=>u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Ml=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=B.normalizeAxis(t.gatherAxis,a),s=B.normalizeAxis(t.quantizeAxis,a),u=r.slice(0);u.splice(n,1,...i);let l=B.size(u),d=e[2].dataType,h=e[0].dataType===22,c=[{type:12,data:l},{type:12,data:s},{type:12,data:n},{type:12,data:t.blockSize},...Y(...e.map((b,y)=>b.dims),u)],m=b=>{let y=R("data",e[0].dataType,e[0].dims.length),w=R("inputIndices",e[1].dataType,e[1].dims.length),S=R("scales",e[2].dataType,e[2].dims.length),v=e.length>3?R("zeroPoint",e[3].dataType,e[3].dims.length):void 0,_=j("output",d,u.length),k=[y,w,S];v&&k.push(v);let T=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(T).declareVariables(...k,_)}
        ${b.mainStart()}
        let output_indices = ${_.offsetToIndices("global_idx")};
        var indices_indices = ${w.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${_.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${w.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${_.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${_.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${w.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[n]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${_.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${y.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${y.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${y.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ce(d)}(quantized_data - zero_point) * scale;
        ${_.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((b,y)=>y!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(b,y)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:m}},Lh=(e,t)=>{let r=e.inputs;Rl(r,t),e.compute(Ml(e.inputs,t))},qh=e=>fe({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Dl,Nl,Fh,Wh,oy=U(()=>{"use strict";te(),ie(),ke(),ae(),Dl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Nl=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,n=e[1].dims,s=e[1].dataType,u=B.normalizeAxis(t.axis,a),l=r[u],d=n.slice(0),h=B.size(d),c=R("input",i,a),m=R("indicesInput",s,n.length),b=j("output",i,d.length),y=[{type:12,data:h},{type:6,data:l},{type:12,data:u}];return y.push(...Y(r,n,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:w=>`
      ${w.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,m,b)}
      ${w.mainStart()}
      ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${b.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${b.setByOffset("global_idx","value")};
  }`}},Fh=e=>fe({axis:e.axis}),Wh=(e,t)=>{let r=e.inputs;Dl(r),e.compute(Nl(e.inputs,t))}}),Pl,Ul,Vh,Gh,uy=U(()=>{"use strict";te(),ie(),ae(),Pl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Ul=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,n,s]=Up.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[a,n];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(n/l),h=Math.ceil(a/l),c=!0,m=B.size(u),b=[{type:12,data:c?d:m},{type:12,data:a},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(b.push(...Y(e[2].dims)),y.push("rank")),b.push(...Y(u));let w=v=>{let _="";t.transA&&t.transB?_="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?_="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?_="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(_="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let k=t.alpha===1?"":"value *= uniforms.alpha;",T=R("a",e[0].dataType,e[0].dims),I=R("b",e[1].dataType,e[1].dims),z=T.type.value,C=null,x=[T,I];e.length===3&&(C=R("c",e[2].dataType,e[2].dims.length),x.push(C));let P=j("output",e[0].dataType,u.length);x.push(P);let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(F).declareVariables(...x)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${z}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${_}
    }

    ${k}
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",P)}; value += ${z}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=v=>{let _=R("a",e[0].dataType,e[0].dims),k=R("b",e[1].dataType,e[1].dims),T=null,I=[_,k];e.length===3&&(T=R("c",e[2].dataType,e[2].dims.length),I.push(T));let z=j("output",e[0].dataType,u.length);I.push(z);let C=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],x="",P="";t.transA&&t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let F=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(C).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${_.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${k.type.storage}, ${l}>, ${l}>;
  ${v.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${z.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${P}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${x}
      }
      workgroupBarrier();
    }

    ${F}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",z)}; value += ${z.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return c?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:d*h},programUniforms:b}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:w}},Vh=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Gh=(e,t)=>{Pl(e.inputs),e.compute(Ul(e.inputs,t))}}),rt,ot,zt,Ct,Ll,ql,Fl,Wl,Vl,Gl,Hl,jl,Hh,jh,ly=U(()=>{"use strict";te(),ie(),ke(),ae(),[rt,ot,zt,Ct]=[0,1,2,3],Ll=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},ql=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Fl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Wl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Vl=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Gl=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${rt}] = batch;
     indices[${ot}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${zt}] = u32(r);
            indices[${Ct}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${zt}] = u32(clamp(r, 0, H - 1));
          indices[${Ct}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${zt}] = gs_reflect(r, border[1], border[3]);
          indices[${Ct}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Hl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${rt}], indices[${ot}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${rt}], indices[${ot}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${rt}], indices[${ot}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${rt}], indices[${ot}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${rt}], indices[${ot}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${rt}], indices[${ot}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,jl=(e,t)=>{let r=R("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=R("grid",e[1].dataType,i.length,2),n=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(n=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[rt,ot,zt,Ct]=[0,3,1,2]);let s=j("output",e[0].dataType,n.length),u=r.type.value,l=B.size(n),d=[{type:12,data:l},...Y(e[0].dims,i,n)],h=c=>`
  ${c.registerUniform("output_size","u32").declareVariables(r,a,s)}
  ${ql}
  ${Fl(u)}
  ${Wl(t)}
  ${Vl(t)}
  ${Gl(r,u,t)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${zt}]);
      let W_in = i32(uniforms.x_shape[${Ct}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${rt}], indices[${zt}], indices[${Ct}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Hl(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:c=>{let m=B.size(n);return{outputs:[{dims:n,dataType:c[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:d}},getShaderSource:h}},Hh=(e,t)=>{Ll(e.inputs),e.compute(jl(e.inputs,t))},jh=e=>fe({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),De,Kl,Kh,$a,Zl,$r,Zh,Qh=U(()=>{"use strict";te(),ie(),ke(),hn(),gn(),ae(),vt(),De=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Kl=(e,t)=>{let r=e[0],i=De(e,1),a=De(e,2),n=De(e,3),s=De(e,4),u=De(e,5),l=De(e,6),d=De(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=r.dims[0],c=r.dims[1],m=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],b=c,y=0,w=0,S=Math.floor(m/t.numHeads);if(l&&d&&B.size(l.dims)&&B.size(d.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==h||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==h||d.dims[1]!==t.numHeads||d.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=l.dims[2],w=l.dims[2]}else if(l&&B.size(l.dims)||d&&B.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(i&&B.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,b=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,b=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,b=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(n&&B.size(n.dims)>0){if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let _=y+b,k=0;if(s&&B.size(s.dims)>0){k=8;let C=s.dims;throw C.length===1?C[0]===h?k=1:C[0]===3*h+2&&(k=3):C.length===2&&C[0]===h&&C[1]===_&&(k=5),k===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,I=m;if(a&&B.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(b!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=a.dims[2]}else{if(b!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=a.dims[1]*a.dims[3],T=!0}}let z=!1;if(s&&B.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&B.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==h||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:h,sequenceLength:c,pastSequenceLength:y,kvSequenceLength:b,totalSequenceLength:_,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:m,vHiddenSize:I,headSize:S,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:k,scale:t.scale,broadcastResPosBias:z,passPastInKv:T,qkvFormat:v}},Kh=e=>fe(Me({},e)),$a=fe({perm:[0,2,1,3]}),Zl=(e,t,r,i,a,n,s)=>{let u=[i,a,n],l=B.size(u),d=[{type:12,data:l},{type:12,data:s},{type:12,data:n}],h=c=>{let m=j("qkv_with_bias",t.dataType,u),b=R("qkv",t.dataType,u),y=R("bias",r.dataType,u),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(w).declareVariables(b,y,m)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:h},{inputs:[t,r],outputs:[-1]})[0]},$r=(e,t,r,i,a,n,s,u)=>{let l=n;if(s&&B.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Zl(e,n,s,t,i,r*a,u),l=l.reshape([t,i,r,a]),r===1||i===1?l:e.compute(Le(l,$a.perm),{inputs:[l],outputs:[-1]})[0]}else return n.dims.length===3&&(l=n.reshape([t,i,r,a])),r===1||i===1?l:e.compute(Le(l,$a.perm),{inputs:[l],outputs:[-1]})[0]},Zh=(e,t)=>{let r=Kl(e.inputs,t),i=e.inputs[0],a=De(e.inputs,1),n=De(e.inputs,2),s=De(e.inputs,3),u=De(e.inputs,4),l=De(e.inputs,5),d=De(e.inputs,6),h=De(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let c=a&&n&&a.dims.length===4&&n.dims.length===4,m=$r(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(c)return Sr(e,m,a,n,u,void 0,d,h,l,r);if(!a||!n)throw new Error("key and value must be provided");let b=$r(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,s,r.hiddenSize),y=$r(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,n,s,2*r.hiddenSize);Sr(e,m,b,y,u,void 0,d,h,l,r)}}),Ql,Xl,Yl,Jl,Ya,Xh,Yh,Jh=U(()=>{"use strict";te(),ie(),ke(),ae(),Ql=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Xl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),fe({numOutputs:i,axis:t.axis,splitSizes:r})},Yl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Q("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Jl=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Ya=(e,t)=>{let r=e[0].dims,i=B.size(r),a=e[0].dataType,n=B.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=R("input",a,r.length),l=new Array(t.numOutputs),d=[],h=[],c=0,m=[{type:12,data:i}];for(let y=0;y<t.numOutputs;y++){c+=t.splitSizes[y],l[y]=c;let w=r.slice();w[n]=t.splitSizes[y],h.push(w),s[y]=j(`output${y}`,a,w.length),d.push({dims:h[y],dataType:e[0].dataType})}m.push({type:12,data:l},...Y(r,...h));let b=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${Yl(l.length)}
  ${Jl(s)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Q("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:m})}},Xh=(e,t)=>{Ql(e.inputs);let r=e.inputs.length===1?t:Xl(e.inputs,t);e.compute(Ya(e.inputs,r),{inputs:[0]})},Yh=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return fe({axis:t,numOutputs:i,splitSizes:r})}}),ed,li,ef,tf=U(()=>{"use strict";te(),ie(),ke(),ae(),ed=(e,t)=>{let[r,i,a,n]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!B.areEqual(i.dims,[])&&!B.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!B.areEqual(a.dims,n.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],d=r.dims[r.dims.length-2],h=a.dims[0],c=B.sizeFromDimension(r.dims,1)/d,m=u===0?a.dims[1]*2:c/s;if(u>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(d>h)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(m/2!==a.dims[1]&&u/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`)},li=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:n}=t,s=e[0].dims[0],u=B.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=u/l,h=e[2].dims[1],c=a===0?h*2:d/i,m=new Array(s,l,d/c,c-h),b=B.computeStrides(m),y=[{type:1,data:n},{type:12,data:m},{type:12,data:b},...e[0].dims.length===3?new Array({type:12,data:[u,d,c,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,c,l*c,1]}):[],...Y(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=S=>{let v=R("input",e[0].dataType,e[0].dims.length),_=R("position_ids",e[1].dataType,e[1].dims.length),k=R("cos_cache",e[2].dataType,e[2].dims.length),T=R("sin_cache",e[3].dataType,e[3].dims.length),I=j("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${S.declareVariables(v,_,k,T,I)}

        ${S.mainStart(Xt)}
          let half_rotary_emb_dim = uniforms.${k.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${_.broadcastedIndicesToOffset("bsnh.xy",j("",_.type.tensor,2))};
            let position_id =
                u32(${_.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:fe({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(m)/Xt)},programUniforms:y})}},ef=(e,t)=>{ed(e.inputs,t),e.compute(li(e.inputs,t))}}),td,rd,va,id,rf,dy=U(()=>{"use strict";ke(),te(),gn(),Qh(),Jh(),vt(),tf(),ae(),td=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],d=r.dims[1],h=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],c=d,m=0,b=!i||i.dims.length===0,y=Math.floor(b?h/(t.numHeads+2*t.kvNumHeads):h/t.numHeads);b&&(h=y*t.numHeads);let w=n&&n.dims.length!==0,S=s&&s.dims.length!==0;if(w&&n.dims.length===4&&n.dims[0]===l&&n.dims[1]!==t.kvNumHeads&&n.dims[2]===t.kvNumHeads&&n.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&S){if(n.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=n.dims[2]}else if(w||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');c=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');c=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let _=0,k=!1,T=t.kvNumHeads?y*t.kvNumHeads:h;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(c!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');T=a.dims[2]}else{if(c!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');T=a.dims[1]*a.dims[3],k=!0}}let I=e.length>4?e[5]:void 0;if(I){if(I.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let z=I.dims.reduce((C,x)=>C*x,1);if(z!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${z}.`);for(let C=0;C<I.dims.length;C++)if(I.dims[C]!==1&&I.dims[C]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${C}] = ${I.dims[C]}.`)}return{batchSize:l,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:c,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:h,vHiddenSize:T,headSize:y,vHeadSize:Math.floor(T/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:k,qkvFormat:v}},rd=fe({perm:[0,2,1,3]}),va=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(Le(i,rd.perm),{inputs:[i],outputs:[-1]})[0]),i},id=(e,t,r,i)=>{let a=7,n=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],d=h=>{let c=R("seq_lens",r.dataType,r.dims),m=R("total_seq_lens",i.dataType,i.dims),b=j("pos_ids",a,s),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${h.registerUniforms(y).declareVariables(c,m,b)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${c.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${b.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${b.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${b.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:n},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d}},rf=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=td(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,n=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,h=r.kvNumHeads?r.kvNumHeads:r.numHeads,c=fe({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,h*r.headSize,h*r.headSize]}),[m,b,y]=!a&&!n?e.compute(Ya([i],c),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,n],w,S;if(t.doRotary){let T=e.compute(id(r.batchSize,r.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],I=e.inputs[7],z=e.inputs[8],C=fe({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),x=[m,T,I,z],P=[-1];w=e.compute(li(x,C),{inputs:x,outputs:P})[0],x.splice(0,1,b);let F=fe({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});S=e.compute(li(x,F),{inputs:x,outputs:P})[0]}let v=$r(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?w:m,void 0,0),_=va(e,t.doRotary?S:b,r),k=va(e,y,r);Sr(e,v,_,k,void 0,void 0,s,u,void 0,r,l,d)}}),xa,ad,nd,af,py=U(()=>{"use strict";te(),ie(),vt(),ae(),xa=(e,t,r,i,a,n,s,u)=>{let l=Te(n),d=l===1?"f32":`vec${l}f`,h=l===1?"vec2f":`mat2x${l}f`,c=a*s,m=64;c===1&&(m=256);let b=[a,s,n/l],y=[a,s,2],w=["rank","type","type"],S=[];S.push(...Y(b,y));let v=_=>{let k=R("x",t.dataType,3,l),T=R("scale",r.dataType,r.dims),I=R("bias",i.dataType,i.dims),z=j("output",1,3,2),C=[k,T,I,z];return`
  var<workgroup> workgroup_shared : array<${h}, ${m}>;
  const workgroup_size = ${m}u;
  ${_.declareVariables(...C)}
  ${_.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${k.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${h}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${$t("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${$t("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${m}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:c},programUniforms:S}),getShaderSource:v},{inputs:[t,r,i],outputs:[-1]})[0]},ad=(e,t,r)=>{let i=t[0].dims,a=i,n=2,s=i[0],u=i[1],l=B.sizeFromDimension(i,n),d=Te(l),h=B.size(a)/d,c=xa(e,t[0],t[1],t[2],s,l,u,r.epsilon),m=[s,u,l/d],b=[s,u],y=["type","none"],w=S=>{let v=R("x",t[0].dataType,m.length,d),_=R("scale_shift",1,b.length,2),k=j("output",t[0].dataType,m.length,d),T=[v,_,k];return`
  ${S.registerUniform("output_size","u32").declareVariables(...T)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${k.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${_.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${k.type.value}(scale_shift.x) + ${k.type.value}(scale_shift.y);
      ${k.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...Y(m,b,m)]}),getShaderSource:w},{inputs:[t[0],c]})},nd=(e,t,r)=>{let i=t[0].dims,a=i,n=i[0],s=i[i.length-1],u=B.sizeFromDimension(i,1)/s,l=Te(s),d=B.size(a)/l,h=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],c=["type","type"],m=!1,b=[0,i.length-1];for(let v=0;v<i.length-2;v++)m=m||i[v+1]!==1,b.push(v+1);m=m&&i[i.length-1]!==1;let y=m?e.compute(Le(e.inputs[0],b),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(v,_)=>i[b[_]])),w=xa(e,y,t[1],t[2],n,u,s,r.epsilon),S=v=>{let _=Ae(t[0].dataType),k=l===1?"vec2f":`mat${l}x2f`,T=C=>{let x=C===0?"x":"y",P=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${_}(${P}(scale.${x}))`;case 2:return`vec2<${_}>(${P}(scale[0].${x}, scale[1].${x}))`;case 4:return`vec4<${_}>(${P}(scale[0].${x}, scale[1].${x}, scale[2].${x}, scale[3].${x}))`;default:throw new Error(`Not supported compoents ${l}`)}},I=R("input",t[0].dataType,t[0].dims,l),z=j("output",t[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${k}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${z.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:S},{inputs:[t[0],w]})},af=(e,t)=>{t.format==="NHWC"?nd(e,e.inputs,t):ad(e,e.inputs,t)}}),sd,od,nf,cy=U(()=>{"use strict";te(),ie(),ae(),sd=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},od=(e,t,r)=>{let i=t.simplified,a=e[0].dims,n=e[1],s=!i&&e[2],u=a,l=B.normalizeAxis(t.axis,a.length),d=B.sizeToDimension(a,l),h=B.sizeFromDimension(a,l),c=B.size(n.dims),m=s?B.size(s.dims):0;if(c!==h||s&&m!==h)throw new Error(`Size of X.shape()[axis:] == ${h}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${m}`);let b=[];for(let I=0;I<a.length;++I)I<l?b.push(a[I]):b.push(1);let y=Te(h),w=["type","type"],S=[{type:12,data:d},{type:1,data:h},{type:12,data:Math.floor(h/y)},{type:1,data:t.epsilon}];s&&w.push("type");let v=r>1,_=r>2,k=I=>{let z=Ae(e[0].dataType),C=[R("x",e[0].dataType,e[0].dims,y),R("scale",n.dataType,n.dims,y)];s&&C.push(R("bias",s.dataType,s.dims,y)),C.push(j("output",e[0].dataType,u,y)),v&&C.push(j("mean_data_output",1,b)),_&&C.push(j("inv_std_output",1,b));let x=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(x).declareVariables(...C)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Wa("f32",y)};
    var mean_square_vector = ${Wa("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Zt(z,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${$t("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${$t("mean_square_vector",y)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Zt(z,y,"x[j + offset]")};
      let f32scale = ${Zt(z,y,"scale[j]")};
      output[j + offset] = ${C[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Zt(z,y,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:u,dataType:e[0].dataType}];return v&&T.push({dims:b,dataType:1}),_&&T.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${i}`,inputDependencies:w},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:S}),getShaderSource:k}},nf=(e,t)=>{sd(e.inputs),e.compute(od(e.inputs,t,e.outputCount))}}),ud,sf,hy=U(()=>{"use strict";ie(),$n(),vn(),ud=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},sf=e=>{ud(e.inputs);let t=Qt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(wn(e.inputs,{activation:""},t));else{let a=t[t.length-2],n=B.size(e.inputs[0].dims.slice(0,-2)),s=B.size(e.inputs[1].dims.slice(0,-2));if(n!==1&&a===1&&s===1){let u=e.inputs[0].reshape([1,n,i]),l=e.inputs[1].reshape([1,i,r]),d=[1,n,r],h=[u,l];e.compute(ui(h,{activation:""},t,d),{inputs:h})}else e.compute(ui(e.inputs,{activation:""},t))}}}),ld,dd,pd,of,uf,fy=U(()=>{"use strict";te(),ie(),ke(),ae(),ld=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!B.areEqual(s.dims,[t.n,a,n]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(B.size(u)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,d=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(B.size(l)!==d)throw new Error("zeroPoints input size error.")}},dd=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,u=r.slice(0,i-2),l=B.size(u),d=e[1].dims[2]/4,h=e[0].dataType,c=Te(t.k),m=Te(d),b=Te(s),y=u.concat([a,s]),w=a>1&&s/b%2===0?2:1,S=B.size(y)/b/w,v=64,_=[],k=[l,a,n/c],T=B.convertShape(e[1].dims).slice();T.splice(-1,1,d/m),_.push(...Y(k)),_.push(...Y(T)),_.push(...Y(e[2].dims)),e.length===4&&_.push(...Y(B.convertShape(e[3].dims)));let I=[l,a,s/b];_.push(...Y(I));let z=C=>{let x=k.length,P=R("a",e[0].dataType,x,c),F=R("b",12,T.length,m),K=R("scales",e[2].dataType,e[2].dims.length),V=[P,F,K],W=e.length===4?R("zero_points",12,e[3].dims.length):void 0;W&&V.push(W);let oe=I.length,O=j("output",e[0].dataType,oe,b),L=Ae(e[0].dataType),ee=(()=>{switch(c){case 1:return`array<${L}, 8>`;case 2:return`mat4x2<${L}>`;case 4:return`mat2x4<${L}>`;default:throw new Error(`${c}-component is not supported.`)}})(),re=Math.floor(32/t.bits),X=Math.floor(re/8),ne=()=>{let Z="";for(let H=0;H<X;H++){let _e=H*t.bits*4,Ie=_e+t.bits;Z+=`
          // reuse a data (pass ${H})
            var input_offset${H>0?H:""} = ${H===0?P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${H>0?H:""}: ${ee};
            for (var j${H>0?H:""}: u32 = 0; j${H>0?H:""} < ${8/c}; j${H>0?H:""}++) {
              a_data${H>0?H:""}[j${H>0?H:""}] = ${P.getByOffset(`input_offset${H>0?H:""}`)};
              input_offset${H>0?H:""}++;
            }
          `;for(let xe=0;xe<b*w;xe++)Z+=`
            b_value = ${m===1?`b${xe}_data`:`b${xe}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${H*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${_e}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ie}u) & b_mask);`}
            b_quantized_values = ${ee}(${Array.from({length:4},(Oe,ge)=>`${L}(b_value_lower[${ge}]), ${L}(b_value_upper[${ge}])`).join(", ")});
            b_dequantized_values = ${c===1?`${ee}(${Array.from({length:8},(Oe,ge)=>`(b_quantized_values[${ge}] - ${W?`zero_point${xe}`:"zero_point"}) * scale${xe}`).join(", ")});`:`(b_quantized_values - ${ee}(${Array(8).fill(`${W?`zero_point${xe}`:"zero_point"}`).join(",")})) * scale${xe};`};
            workgroup_shared[local_id.x * ${w} + ${Math.floor(xe/b)}]${b>1?`[${xe%b}]`:""} += ${Array.from({length:8/c},(Oe,ge)=>`${c===1?`a_data${H>0?H:""}[${ge}] * b_dequantized_values[${ge}]`:`dot(a_data${H>0?H:""}[${ge}], b_dequantized_values[${ge}])`}`).join(" + ")};
          `}return Z},D=()=>{let Z=`
            var col_index = col * ${b};
            ${W?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${L}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let H=0;H<b*w;H++)Z+=`
            let scale${H} = ${K.getByOffset("col_index * nBlocksPerCol + block")};
            ${W?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${W.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${H} = ${L}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return Z},J=()=>{let Z=`col_index = col * ${b};`;for(let H=0;H<b*w;H++)Z+=`
            let b${H}_data = ${F.getByIndices(`${F.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Z+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ee};
            var b_dequantized_values: ${ee};`,Z};return`
        var<workgroup> workgroup_shared: array<${O.type.value}, ${w*v}>;
        ${C.declareVariables(...V,O)}
        ${C.mainStart([v,1,1])}
          let output_indices = ${O.offsetToIndices(`(global_idx / ${v}) * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/c};
            ${D()}
            for (var word: u32 = 0; word < ${d}; word += ${m}) {
              ${J()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${ne()}
                word_offset += ${re/c};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${w}) {
            var output_value: ${O.type.value} = ${O.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${w};
            }
            ${O.setByIndices(`${O.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${c};${m};${b};${w};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:h}],dispatchGroup:{x:S},programUniforms:_}),getShaderSource:z}},pd=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,u=r.slice(0,i-2),l=B.size(u),d=e[1].dims[2]/4,h=e[0].dataType,c=Te(t.k),m=Te(d),b=u.concat([a,s]),y=128,w=s%8===0?8:s%4===0?4:1,S=y/w,v=Math.floor(32/t.bits),_=S*m*v,k=_/c,T=_/t.blockSize,I=B.size(b)/w,z=[],C=[l,a,n/c],x=B.convertShape(e[1].dims).slice();x.splice(-1,1,d/m),z.push(...Y(C)),z.push(...Y(x)),z.push(...Y(e[2].dims)),e.length===4&&z.push(...Y(B.convertShape(e[3].dims)));let P=[l,a,s];z.push(...Y(P));let F=K=>{let V=C.length,W=R("a",e[0].dataType,V,c),oe=R("b",12,x.length,m),O=R("scales",e[2].dataType,e[2].dims.length),L=[W,oe,O],ee=e.length===4?R("zero_points",12,e[3].dims.length):void 0;ee&&L.push(ee);let re=P.length,X=j("output",e[0].dataType,re),ne=Ae(e[0].dataType),D=()=>{switch(c){case 1:return`
          let a_data0 = vec4<${ne}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ne}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ne}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ne}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${c}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${k}>;
        var<workgroup> inter_results: array<array<${X.type.value}, ${S}>, ${w}>;
        ${K.declareVariables(...L,X)}
        ${K.mainStart([S,w,1])}
          let output_indices = ${X.offsetToIndices(`workgroup_index * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${k};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${k}; a_offset += ${y})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${W.getByIndices(`${W.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${W.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${ee?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ne}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${ne}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${O.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${oe.getByIndices(`${oe.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/c};
            for (var i: u32 = 0; i < ${m}; i++) {
              let b_value = ${m===1?"b_data":"b_data[i]"};
              ${(()=>{let J=Math.floor(v/8),Z="";for(let H=0;H<J;H++){let _e=H*t.bits*4,Ie=_e+t.bits;Z+=`
              ${D()}
              {${t.bits===2?`
                let half_word = b_value >> ${H*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${_e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ie}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${ne}>(${Array.from({length:4},(xe,Oe)=>`${ne}(b_value_lower[${Oe}]), ${ne}(b_value_upper[${Oe}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${ne}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(xe,Oe)=>`${`dot(a_data${Oe}, b_dequantized_values[${Oe}])`}`).join(" + ")};
              }
              word_offset += ${8/c};`}return Z})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${w}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${X.setByIndices(`${X.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${c};${m};${S};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:h}],dispatchGroup:{x:I},programUniforms:z}),getShaderSource:F}},of=(e,t)=>{ld(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(pd(e.inputs,t)):e.compute(dd(e.inputs,t))},uf=e=>fe(e)}),cd,hd,fd,md,gd,yd,bd,_d,lf,my=U(()=>{"use strict";te(),ie(),ae(),cd=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},hd=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${Q("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Q("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${Q("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},fd=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Q("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Q("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Q("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Q("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},md=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Q("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Q("uniforms.x_shape",a,t)})) {
                  k = i32(${Q("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${Q("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},gd=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Q("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${Q("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${Q("uniforms.x_shape",a,t)})) {
                  k -= i32(${Q("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${Q("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},yd=(e,t,r)=>{switch(r.mode){case 0:return hd(e,t,r.pads.length);case 1:return fd(e,t,r.pads.length);case 2:return md(e,t,r.pads.length);case 3:return gd(e,t,r.pads.length);default:throw new Error("Invalid mode")}},bd=(e,t)=>{let r=B.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=B.size(r),n=[{type:12,data:a},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&n.push({type:s?e[2].dataType:1,data:t.value}),n.push(...Y(e[0].dims,r));let u=["rank"],l=d=>{let h=j("output",e[0].dataType,r.length),c=R("x",e[0].dataType,i.length),m=c.type.value,b=yd(h,i.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:s?m:"f32"}),`
            ${d.registerUniforms(y).declareVariables(c,h)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${h.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(r)/64)},programUniforms:n}),getShaderSource:l}},_d=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,n=new Int32Array(2*a).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)n[Number(u[l])]=Number(r[l]),n[Number(u[l])+a]=Number(r[l+u.length])}else r.forEach((u,l)=>n[Number(l)]=Number(u));let s=[];return n.forEach(u=>s.push(u)),{mode:t.mode,value:i,pads:s}}else return t},lf=(e,t)=>{cd(e.inputs);let r=_d(e.inputs,t);e.compute(bd(e.inputs,r),{inputs:[0]})}}),mr,Sa,Ta,ka,Ea,wd,$d,Ia,za,df,pf,Ca,cf,hf,Aa,ff,mf,gf,yf,gy=U(()=>{"use strict";Ve(),te(),ie(),ae(),mr=e=>{if(be.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Sa=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=n?t.dilations.slice():[],d=t.pads.slice();si.adjustPoolAttributes(r,a,s,u,l,d);let h=si.computePoolOutputShape(r,a,u,l,s,d,t.autoPad,t.ceilMode),c=Object.assign({},t);n?Object.assign(c,{kernelShape:s,strides:u,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:s,strides:u,pads:d,cacheKey:t.cacheKey});let m=h.slice();return m.push(m.splice(1,1)[0]),[c,i?m:h]},Ta=(e,t)=>{let r=t.format==="NHWC",i=B.size(e),a=B.size(t.kernelShape),n=[{type:12,data:i},{type:12,data:a}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],h=t.pads[t.pads.length-1],c=!!(d+h);n.push({type:12,data:u},{type:12,data:l},{type:12,data:d},{type:12,data:h}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let b=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];m=!!(w+S),n.push({type:12,data:b},{type:12,data:y},{type:12,data:w},{type:12,data:S}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,s,!0,c,m]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=B.computeStrides(t.kernelShape);n.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((d,h)=>d+h);return[n,s,!!l,!1,!1]}},ka=(e,t,r,i,a,n,s,u,l,d,h,c)=>{let m=a.format==="NHWC",b=t.type.value,y=j("output",t.type.tensor,i);if(a.kernelShape.length<=2){let w="",S="",v="",_=r-(m?2:1);if(h?w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,a.kernelShape.length===2){let k=r-(m?3:2);c?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${k}] < 0 || xIndices[${k}] >= uniforms.x_shape[${k}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${b}(${u});
              var pad = 0;
              ${S}
              ${w}
              ${v}
              ${s}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=a.kernelShape.length,S=a.pads.length,v="";return d?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${b}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w-1}u; j++) {
                  offsets[j] = offset / ${Q("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${Q("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${r-w}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Q("uniforms.strides",`j - ${r-w}u`,w)}
                    + offsets[j - ${r-w}u] - ${Q("uniforms.pads","j - 2u",S)};
                  ${v}
              }
              ${s}

              output[global_idx] = value;
            }`}},Ea=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,wd=e=>`${Ea(e)};${e.countIncludePad}`,$d=e=>`${Ea(e)};${e.storageOrder};${e.dilations}`,Ia=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),za=(e,t,r,i)=>{let[a,n]=Sa(t,i,r),s=R("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",d="";a.countIncludePad?d+=`value /= ${u}(uniforms.kernelSize);`:d+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[h,c,m,b,y]=Ta(n,a);h.push(...Y(t.dims,n));let w=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${m};${b};${y}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(n)/64)},programUniforms:h}),getShaderSource:S=>ka(S,s,t.dims.length,n.length,a,l,d,0,c,m,b,y)}},df=e=>{let t=e.count_include_pad!==0,r=Ia(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let i=Fe(Me({countIncludePad:t},r),{cacheKey:""});return Fe(Me({},i),{cacheKey:wd(i)})},pf=(e,t)=>{mr(e.inputs),e.compute(za("AveragePool",e.inputs[0],!1,t))},Ca={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},cf=e=>{let t=e.format;return Fe(Me({format:t},Ca),{cacheKey:t})},hf=(e,t)=>{mr(e.inputs),e.compute(za("GlobalAveragePool",e.inputs[0],!0,t))},Aa=(e,t,r,i)=>{let[a,n]=Sa(t,i,r),s=`
      value = max(x_val, value);
    `,u="",l=R("x",t.dataType,t.dims.length),d=["rank"],[h,c,m,b,y]=Ta(n,a);return h.push(...Y(t.dims,n)),{name:e,shaderCache:{hint:`${i.cacheKey};${m};${b};${y}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(n)/64)},programUniforms:h}),getShaderSource:w=>ka(w,l,t.dims.length,n.length,a,s,u,t.dataType===10?-65504:-1e5,c,m,b,y)}},ff=(e,t)=>{mr(e.inputs),e.compute(Aa("MaxPool",e.inputs[0],!1,t))},mf=e=>{let t=e.storage_order,r=e.dilations,i=Ia(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let a=Fe(Me({storageOrder:t,dilations:r},i),{cacheKey:""});return Fe(Me({},a),{cacheKey:$d(a)})},gf=e=>{let t=e.format;return Fe(Me({format:t},Ca),{cacheKey:t})},yf=(e,t)=>{mr(e.inputs),e.compute(Aa("GlobalMaxPool",e.inputs[0],!0,t))}}),vd,xd,bf,_f,yy=U(()=>{"use strict";te(),ie(),ke(),ae(),vd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,n)=>n===t.axis||a===e[0].dims[n]).reduce((a,n)=>a&&n,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},xd=(e,t)=>{let r=B.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,n=e[0].dims,s=e[1].dataType,u=B.size(n),l=i===3||i===2,d=l?[Math.ceil(B.size(e[0].dims)/4)]:e[0].dims,h=e[1].dims,c=e.length>2?e[2]:void 0,m=c?l?[Math.ceil(B.size(c.dims)/4)]:c.dims:void 0,b=h.length===0||h.length===1&&h[0]===1,y=b===!1&&h.length===1,w=Te(u),S=b&&(!l||w===4),v=S?w:1,_=S&&!l?w:1,k=R("input",l?12:i,d.length,_),T=R("scale",s,h.length),I=c?R("zero_point",l?12:i,m.length):void 0,z=j("output",s,n.length,v),C=[k,T];I&&C.push(I);let x=[d,h];c&&x.push(m);let P=[{type:12,data:u/v},{type:12,data:r},{type:12,data:t.blockSize},...Y(...x,n)],F=K=>{let V=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${K.registerUniforms(V).declareVariables(...C,z)}
      ${K.mainStart()}
          ${K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${z.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${k.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${k.getByOffset("global_idx")};`};

          // Set scale input
          ${b?`let scale_value= ${T.getByOffset("0")}`:y?`
            let scale_index = ${z.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?b?l?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:y?l?`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${l?a?"i32":"u32":k.type.value}(0);`};
      // Compute and write output
      ${z.setByOffset("global_idx",`${z.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:F,getRunData:()=>({outputs:[{dims:n,dataType:s}],dispatchGroup:{x:Math.ceil(u/v/64),y:1,z:1},programUniforms:P})}},bf=(e,t)=>{vd(e.inputs,t),e.compute(xd(e.inputs,t))},_f=e=>fe({axis:e.axis,blockSize:e.blockSize})}),Sd,Td,wf,by=U(()=>{"use strict";Ve(),te(),ae(),Sd=(e,t,r)=>{let i=e===t,a=e<t&&r<0,n=e>t&&r>0;if(i||a||n)throw new Error("Range these inputs' contents are invalid.")},Td=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),n=[a],s=a,u=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...Y(n)],l=d=>{let h=j("output",i,n.length),c=h.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${d.registerUniforms(m).declareVariables(h)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:n,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},wf=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),be.webgpu.validateInputContent&&Sd(t,r,i),e.compute(Td(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),kd,Ed,$f,vf,_y=U(()=>{"use strict";te(),ie(),ke(),ae(),kd=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${n}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${n}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${n}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${n}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Ed=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,n=1,s=Math.ceil(B.sizeToDimension(i,i.length-1)/n),u=i[i.length-1],l=B.sizeFromDimension(r,u),d=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...Y(e[1].dims,e[2].dims,a)],h=c=>{let m=R("indices",e[1].dataType,e[1].dims.length),b=R("updates",e[2].dataType,e[2].dims.length,n),y=t.reduction!=="none"&&t.reduction!==""?Hp("output",e[0].dataType,a.length):j("output",e[0].dataType,a.length,n);return`
      ${c.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,b,y)}
      ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${kd(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:h}},$f=e=>fe({reduction:e.reduction}),vf=(e,t)=>{e.compute(Ed(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Id,zd,Cd,Oa,Ad,Od,Bd,Rd,Md,Dd,Nd,Pd,Ba,Ud,Ld,qd,Fd,Wd,xf,Sf,wy=U(()=>{"use strict";te(),ie(),ke(),ae(),Id=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},zd=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,n)=>i[a]=e[n]),i},Cd=(e,t,r,i,a,n)=>{let[s,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(h=>n.push(h));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(h=>i.push(h)),i.length!==0&&i.length!==d&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Id(i,t),t.axes.length>0&&zd(i,t.axes,d).forEach((h,c)=>i[c]=h)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(h=>a.push(Number(h))),a.length!==0&&a.length!==d&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Oa=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Ad=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Oa("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Oa("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Od=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Bd=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((n,s)=>{i[n]=a[s],i[s+r]=a[t.length+s]}),i):a},Rd=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(n=>a.push(n)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((n,s)=>a[n]=r[s])}else r.forEach(n=>a.push(n));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((n,s)=>Math.round(n*t[s]))}return a},Md=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(n=>t[n]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(n=>t[n]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(n=>t[n]=i),r.axes.forEach(n=>a[n]=Math.round(e[n]*t[n]))):(t.fill(i,0,t.length),a.forEach((n,s)=>a[s]=Math.round(n*t[s]))),a},Dd=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${Q("uniforms.scales","i",i)};
        var roi_low = ${Q("uniforms.roi","i",a)};
        var roi_hi = ${Q("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Q("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Nd=(e,t,r,i,a,n,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Q("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Q("uniforms.roi","i",n)};
          var roi_hi = ${Q("uniforms.roi",`i + ${r.length}`,n)};
          var input_shape_i = ${Q("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Pd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Q("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Ba=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Ud=(e,t,r,i,a)=>{let[n,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${Ba(e,l,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Ld=(e,t,r,i,a,n,s,u,l,d)=>{let h=r.length===2,c=!0,[m,b]=h?[0,1]:c?[2,3]:[1,2],y=e.type.value,w=S=>{let v=S===m?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[S]},
        ${i[S]}, ${r[S]}, ${n[S]}, ${n[S]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[S]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${y} = originalIdx + ${y}(i);
          if (${v} < 0 || ${v} >= ${r[S]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${v} = max(0, min(${v}, ${r[S]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${v})`)};
          data[i + 1] = ${S===m?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(m)};
    ${w(b)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},qd=(e,t,r,i,a)=>{let[n,s,u,l,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${Ba(e,d,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${s}];
      var height:${h} = originalIndices[${u}];
      var width:${h} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${h} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${h} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${h} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${h} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${h} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${h} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${h} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${h} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${h} = abs(depth - ${h}(depth1));
      var dx2: ${h} = abs(${h}(depth2) - depth);
      var dy1: ${h} = abs(height - ${h}(height1));
      var dy2: ${h} = abs(${h}(height2) - height);
      var dz1: ${h} = abs(width - ${h}(width1));
      var dz2: ${h} = abs(${h}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Fd=(e,t,r,i,a,n)=>{let s=e.dims,u=Bd(n,t.axes,s.length),l=Rd(s,i,a,t.axes),d=i.slice();i.length===0&&(d=s.map((_,k)=>_===0?1:l[k]/_),t.keepAspectRatioPolicy!=="stretch"&&(l=Md(s,d,t)));let h=j("output",e.dataType,l.length),c=R("input",e.dataType,s.length),m=B.size(l),b=s.length===l.length&&s.every((_,k)=>_===l[k]),y=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,S=c.type.value,v=_=>`
      ${b?"":`
      ${Ad(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Pd(c,s)};
              ${Od(t.nearestMode,r,S)};
              ${Nd(c,h,s,l,d.length,u.length,y)};
              `;case"linear":return`
              ${Dd(h,s,l,d.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Ud(c,h,s,y,w)}`;if(s.length===3||s.length===5)return`${qd(c,h,s,y,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Ld(c,h,s,l,d,u,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${_.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",u.length).declareVariables(c,h)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${b?"output[global_idx] = input[global_idx];":`
        let output_indices = ${h.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${a.length>0?a:""}|${u.length>0?u:""}|${b}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:d},{type:1,data:u},...Y(s,l)]})}},Wd=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},xf=(e,t)=>{let r=[],i=[],a=[],n=Wd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Cd(e.inputs,t,n,r,i,a),e.compute(Fd(e.inputs[0],t,n,r,i,a),{inputs:[0]})},Sf=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,n=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return fe({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:d})}}),Vd,Gd,Tf,$y=U(()=>{"use strict";te(),ie(),ae(),Vd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==n)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Gd=(e,t,r,i)=>{let a=t.simplified,n=e[0].dims,s=B.size(n),u=n,l=s,d=n.slice(-1)[0],h=i?n.slice(0,-1).concat(1):[],c=!a&&e.length>3,m=e.length>4,b=i&&r>1,y=i&&r>2,w=r>3,S=64,v=Te(d),_=[{type:12,data:l},{type:12,data:v},{type:12,data:d},{type:1,data:t.epsilon}],k=I=>{let z=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],C=[R("x",e[0].dataType,e[0].dims,v),R("skip",e[1].dataType,e[1].dims,v),R("gamma",e[2].dataType,e[2].dims,v)];c&&C.push(R("beta",e[3].dataType,e[3].dims,v)),m&&C.push(R("bias",e[4].dataType,e[4].dims,v)),C.push(j("output",e[0].dataType,u,v)),b&&C.push(j("mean_output",1,h)),y&&C.push(j("inv_std_output",1,h)),w&&C.push(j("input_skip_bias_sum",e[0].dataType,u,v));let x=Ae(e[0].dataType),P=Ae(1,v);return`

      ${I.registerUniforms(z).declareVariables(...C)}
      var<workgroup> sum_shared : array<${P}, ${S}>;
      var<workgroup> sum_squared_shared : array<${P}, ${S}>;

      ${I.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":x+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Zt(x,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${$t("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${$t("square_sum",v)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${x}(mean)`}) *
            ${x}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:u,dataType:e[0].dataType}];return r>1&&T.push({dims:h,dataType:1}),r>2&&T.push({dims:h,dataType:1}),r>3&&T.push({dims:n,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${b};${y};${w}`,inputDependencies:e.map((I,z)=>"type")},getShaderSource:k,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:_})}},Tf=(e,t)=>{Vd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Gd(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Hd,gr,jd,Ra,Kd,Zd,kf,Ef,vy=U(()=>{"use strict";te(),ie(),ke(),ae(),Hd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},gr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},jd=(e,t)=>{if(e.length>1){let r=gr(e,1),i=gr(e,2),a=gr(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),fe({starts:r,ends:i,axes:a})}else return t},Ra=(e,t,r,i,a)=>{let n=e;return e<0&&(n+=r[i[t]]),a[t]<0?Math.max(0,Math.min(n,r[i[t]]-1)):Math.max(0,Math.min(n,r[i[t]]))},Kd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${Q("uniforms.input_shape","i",r.length)};
            let steps_i = ${Q("uniforms.steps","i",r.length)};
            let signs_i = ${Q("uniforms.signs","i",r.length)};
            let starts_i = ${Q("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Zd=(e,t)=>{let r=e[0].dims,i=B.size(r),a=t.axes.length>0?B.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],n=gr(e,4);n.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),n.length===0&&(n=Array(a.length).fill(1));let s=t.starts.map((v,_)=>Ra(v,_,r,a,n)),u=t.ends.map((v,_)=>Ra(v,_,r,a,n));if(a.length!==s.length||a.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let v=0;v<r.length;++v)a.includes(v)||(s.splice(v,0,0),u.splice(v,0,r[v]),n.splice(v,0,1));let l=n.map(v=>Math.sign(v));n.forEach((v,_,k)=>{if(v<0){let T=(u[_]-s[_])/v,I=s[_],z=I+T*n[_];s[_]=z,u[_]=I,k[_]=-v}});let d=r.slice(0);a.forEach((v,_)=>{d[v]=Math.ceil((u[v]-s[v])/n[v])});let h={dims:d,dataType:e[0].dataType},c=j("output",e[0].dataType,d.length),m=R("input",e[0].dataType,e[0].dims.length),b=B.size(d),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:n.length}],w=[{type:12,data:b},{type:12,data:s},{type:6,data:l},{type:12,data:n},...Y(e[0].dims,d)],S=v=>`
      ${v.registerUniforms(y).declareVariables(m,c)}
        ${Kd(m,c,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[h],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:w})}},kf=(e,t)=>{Hd(e.inputs,t);let r=jd(e.inputs,t);e.compute(Zd(e.inputs,r),{inputs:[0]})},Ef=e=>{let t=e.starts,r=e.ends,i=e.axes;return fe({starts:t,ends:r,axes:i})}}),Qd,Xd,If,zf,xy=U(()=>{"use strict";te(),ie(),ke(),vt(),ae(),Qd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Xd=(e,t)=>{let r=e.inputs[0],i=r.dims,a=B.size(i),n=i.length,s=B.normalizeAxis(t.axis,n),u=s<i.length-1,l,d=[];u?(d=Array.from({length:n},(C,x)=>x),d[s]=n-1,d[n-1]=s,l=e.compute(Le(r,d),{inputs:[r],outputs:[-1]})[0]):l=r;let h=l.dims,c=h[n-1],m=a/c,b=Te(c),y=c/b,w=64;m===1&&(w=256);let S=(C,x)=>x===4?`max(max(${C}.x, ${C}.y), max(${C}.z, ${C}.w))`:x===2?`max(${C}.x, ${C}.y)`:x===3?`max(max(${C}.x, ${C}.y), ${C}.z)`:C,v=R("x",l.dataType,l.dims,b),_=j("result",l.dataType,l.dims,b),k=v.type.value,T=Ae(l.dataType)==="f32"?`var threadMax = ${k}(-3.4028234663852886e+38f);`:`var threadMax = ${k}(-65504.0h);`,I=C=>`
      var<workgroup> rowMaxShared : ${k};
      var<workgroup> rowSumShared : ${k};
      var<workgroup> threadShared : array<${k}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${k} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${k}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${C.registerUniform("packedCols","i32").declareVariables(v,_)}
      ${C.mainStart(w)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${w};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${T}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${k}(${S("threadShared[0]",b)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${k}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${k}(${$t("threadShared[0]",b)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${k}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,z=e.compute({name:"Softmax",shaderCache:{hint:`${b};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:l.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:y}]}),getShaderSource:I},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Le(z,d),{inputs:[z]})},If=(e,t)=>{Qd(e.inputs),Xd(e,t)},zf=e=>fe({axis:e.axis})}),Ma,Yd,Jd,ep,Cf,Sy=U(()=>{"use strict";te(),ie(),ae(),Ma=e=>Array.from(e.getBigInt64Array(),Number),Yd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ma(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Jd=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},ep=(e,t)=>{let r=e[0].dims,i=t??Ma(e[1]),a=Jd(r,i),n=B.size(a),s=e[0].dataType,u=R("input",s,r.length),l=j("output",s,a.length),d=h=>`
      const inputShape = ${u.indices(...r)};
      ${h.registerUniform("output_size","u32").declareVariables(u,l)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...Y(e[0].dims,a)]}),getShaderSource:d}},Cf=e=>{Yd(e.inputs),e.compute(ep(e.inputs),{inputs:[0]})}}),tp,rp,Af,Ty=U(()=>{"use strict";te(),ie(),ae(),tp=(e,t,r,i,a)=>{let n=j("output_data",a,r.length,4),s=R("a_data",t[1].dataType,t[1].dims.length,4),u=R("b_data",t[2].dataType,t[2].dims.length,4),l=R("c_data",t[0].dataType,t[0].dims.length,4),d,h=(c,m,b)=>`select(${m}, ${c}, ${b})`;if(!i)d=n.setByOffset("global_idx",h(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let c=(m,b,y="")=>{let w=`a_data[index_a${b}][component_a${b}]`,S=`b_data[index_b${b}][component_b${b}]`,v=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
            let output_indices${b} = ${n.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offset_a${b} = ${s.broadcastedIndicesToOffset(`output_indices${b}`,n)};
            let offset_b${b} = ${u.broadcastedIndicesToOffset(`output_indices${b}`,n)};
            let offset_c${b} = ${l.broadcastedIndicesToOffset(`output_indices${b}`,n)};
            let index_a${b} = offset_a${b} / 4u;
            let index_b${b} = offset_b${b} / 4u;
            let index_c${b} = offset_c${b} / 4u;
            let component_a${b} = offset_a${b} % 4u;
            let component_b${b} = offset_b${b} % 4u;
            let component_c${b} = offset_c${b} % 4u;
            ${m}[${b}] = ${y}(${h(w,S,v)});
          `};a===9?d=`
            var data = vec4<u32>(0);
            ${c("data",0,"u32")}
            ${c("data",1,"u32")}
            ${c("data",2,"u32")}
            ${c("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${c("output_data[global_idx]",0)}
            ${c("output_data[global_idx]",1)}
            ${c("output_data[global_idx]",2)}
            ${c("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},rp=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,n=!(B.areEqual(t,r)&&B.areEqual(r,i)),s=t,u=B.size(t);if(n){let d=Qt.calcShape(Qt.calcShape(t,r,!1),i,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,u=B.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>tp(d,e,s,n,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...Y(i,t,r,s)]})}},Af=e=>{e.compute(rp(e.inputs))}}),Of,ky=U(()=>{"use strict";U0(),gn(),L0(),q0(),F0(),W0(),V0(),Z0(),X0(),Y0(),J0(),ey(),ty(),ry(),iy(),ay(),ny(),sy(),oy(),uy(),ly(),dy(),py(),cy(),hy(),fy(),Qh(),my(),gy(),yy(),by(),_y(),mn(),wy(),tf(),$y(),vy(),xy(),Jh(),Sy(),vt(),yn(),Ty(),Of=new Map([["Abs",[$c]],["Acos",[vc]],["Acosh",[xc]],["Add",[ah]],["ArgMax",[yc,Ga]],["ArgMin",[gc,Ga]],["Asin",[Sc]],["Asinh",[Tc]],["Atan",[kc]],["Atanh",[Ec]],["Attention",[bc]],["AveragePool",[pf,df]],["BatchNormalization",[_c]],["BiasAdd",[wc]],["BiasSplitGelu",[ih]],["Cast",[zc,Ic]],["Ceil",[Ac]],["Clip",[Cc]],["Concat",[fh,mh]],["Conv",[Xa,Qa]],["ConvTranspose",[Th,Sh]],["Cos",[Oc]],["Cosh",[Bc]],["CumSum",[kh,Eh]],["DepthToSpace",[Ih,zh]],["DequantizeLinear",[bf,_f]],["DFT",[Ch,Ah]],["Div",[nh]],["Einsum",[Oh,Bh]],["Elu",[Rc,wr]],["Equal",[sh]],["Erf",[Mc]],["Exp",[Dc]],["Expand",[Rh]],["FastGelu",[Mh]],["Floor",[Nc]],["FusedConv",[Xa,Qa]],["Gather",[Nh,Dh]],["GatherElements",[Wh,Fh]],["GatherBlockQuantized",[Lh,qh]],["GatherND",[Ph,Uh]],["Gelu",[Pc]],["Gemm",[Gh,Vh]],["GlobalAveragePool",[hf,cf]],["GlobalMaxPool",[yf,gf]],["Greater",[dh]],["GreaterOrEqual",[ch]],["GridSample",[Hh,jh]],["GroupQueryAttention",[rf]],["HardSigmoid",[Hc,Gc]],["HardSwish",[jc]],["InstanceNormalization",[af]],["LayerNormalization",[nf]],["LeakyRelu",[Uc,wr]],["Less",[ph]],["LessOrEqual",[hh]],["Log",[th]],["MatMul",[sf]],["MatMulNBits",[of,uf]],["MaxPool",[ff,mf]],["Mul",[oh]],["MultiHeadAttention",[Zh,Kh]],["Neg",[qc]],["Not",[Lc]],["Pad",[lf]],["Pow",[uh]],["QuickGelu",[rh,wr]],["Range",[wf]],["Reciprocal",[Fc]],["ReduceMin",[pc]],["ReduceMean",[sc]],["ReduceMax",[dc]],["ReduceSum",[hc]],["ReduceProd",[cc]],["ReduceL1",[oc]],["ReduceL2",[uc]],["ReduceLogSum",[mc]],["ReduceLogSumExp",[lc]],["ReduceSumSquare",[fc]],["Relu",[Wc]],["Resize",[xf,Sf]],["RotaryEmbedding",[ef]],["ScatterND",[vf,$f]],["Sigmoid",[Vc]],["Sin",[Kc]],["Sinh",[Zc]],["Slice",[kf,Ef]],["SkipLayerNormalization",[Tf]],["Split",[Xh,Yh]],["Sqrt",[Qc]],["Softmax",[If,zf]],["Sub",[lh]],["Tan",[Xc]],["Tanh",[Yc]],["ThresholdedRelu",[eh,wr]],["Tile",[Cf]],["Transpose",[Kp,Zp]],["Where",[Af]]])}),Bf,Ey=U(()=>{"use strict";Ve(),lt(),ae(),Bf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){it(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let d of t)u.push({binding:u.length,resource:{buffer:d.buffer}});for(let d of r)u.push({binding:u.length,resource:{buffer:d.buffer}});a&&u.push({binding:u.length,resource:a});let l=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ye(e.programInfo.name)}dispose(){}build(e,t){it(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{r.features.has(d.feature)&&i.push(`enable ${d.extension};`)});let a=jp(t,this.backend.device.limits),n=e.getShaderSource(a),s=`${i.join(`
`)}
${a.additionalImplementations}
${n}`,u=r.createShaderModule({code:s,label:e.name});pe("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Ye(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let n=t*r*i,s=Math.ceil(Math.sqrt(n));if(s>a){if(s=Math.ceil(Math.cbrt(n)),s>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Rf={};Yt(Rf,{WebGpuBackend:()=>Mf});var ip,ap,np,Mf,Iy=U(()=>{"use strict";Ve(),te(),lt(),Fp(),N0(),ky(),Ey(),ip=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let n=e[i].dims.length;r.push(`${a};${n}`);break}case"dims":{let n=e[i].dims.join(",");r.push(`${a};${n}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},ap=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${ip(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},np=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Mf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}initialize(e,t){return N(this,null,function*(){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=u=>t.features.has(u)&&r.push(u)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=yield t.requestDevice(i);let n=t,s=t.info??(typeof n.requestAdapterInfo=="function"?yield n.requestAdapterInfo():void 0);this.adapterInfo=new np(s),this.gpuDataManager=Gp(this),this.programManager=new Bf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,pn(e.logLevel,!!e.debug),this.device.onuncapturederror=u=>{u.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${u.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()})}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;it(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=r[i],n=a.kernelId,s=this.kernels.get(n),u=s.kernelType,l=s.kernelName,d=a.programName,h=a.inputTensorViews,c=a.outputTensorViews,m=t[i*2],b=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let y=Number(m-this.queryTimeBase),w=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(y)||!Number.isSafeInteger(w))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map(S=>({dims:S.dims,dataType:ut(S.dataType)})),outputsMetadata:c.map(S=>({dims:S.dims,dataType:ut(S.dataType)})),kernelId:n,kernelType:u,kernelName:l,programName:d,startTime:y,endTime:w});else{let S="";h.forEach((_,k)=>{S+=`input[${k}]: [${_.dims}] | ${ut(_.dataType)}, `});let v="";c.forEach((_,k)=>{v+=`output[${k}]: [${_.dims}] | ${ut(_.dataType)}, `}),console.log(`[profiling] kernel "${n}|${u}|${l}|${d}" ${S}${v}start time: ${y} ns, execution time: ${w-y} ns`)}ii("GPU",`${d}::${m}::${b}`)}e.unmap(),this.pendingQueries.delete(e)}),Ye()}run(e,t,r,i,a,n){it(e.name);let s=[];for(let _=0;_<t.length;++_){let k=t[_].data;if(k===0)continue;let T=this.gpuDataManager.get(k);if(!T)throw new Error(`no GPU data for input: ${k}`);s.push(T)}let{outputs:u,dispatchGroup:l,programUniforms:d}=e.getRunData(t),h=r.length===0?u.map((_,k)=>k):r;if(h.length!==u.length)throw new Error(`Output size ${h.length} must be equal to ${u.length}.`);let c=[],m=[];for(let _=0;_<u.length;++_){if(!Number.isInteger(h[_])||h[_]<-3||h[_]>=n)throw new Error(`Invalid output index: ${h[_]}`);if(h[_]===-3)continue;let k=h[_]===-1,T=h[_]===-2,I=k||T?a(u[_].dataType,u[_].dims):i(h[_],u[_].dataType,u[_].dims);if(c.push(I),I.data===0)continue;let z=this.gpuDataManager.get(I.data);if(!z)throw new Error(`no GPU data for output: ${I.data}`);if(k&&this.temporaryData.push(z),T){let C=this.kernelPersistentData.get(this.currentKernelId);C||(C=[],this.kernelPersistentData.set(this.currentKernelId,C)),C.push(z)}m.push(z)}if(s.length!==t.length||m.length!==c.length){if(m.length===0)return Ye(e.name),c;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(d){let _=0,k=[];d.forEach(C=>{let x=typeof C.data=="number"?[C.data]:C.data;if(x.length===0)return;let P=C.type===10?2:4,F,K;C.type===10?(K=x.length>4?16:x.length>2?8:x.length*P,F=x.length>4?16:P*x.length):(K=x.length<=2?x.length*P:16,F=16),_=Math.ceil(_/K)*K,k.push(_);let V=C.type===10?8:4;_+=x.length>4?Math.ceil(x.length/V)*F:x.length*P});let T=16;_=Math.ceil(_/T)*T;let I=new ArrayBuffer(_);d.forEach((C,x)=>{let P=k[x],F=typeof C.data=="number"?[C.data]:C.data;if(C.type===6)new Int32Array(I,P,F.length).set(F);else if(C.type===12)new Uint32Array(I,P,F.length).set(F);else if(C.type===10)new Uint16Array(I,P,F.length).set(F);else if(C.type===1)new Float32Array(I,P,F.length).set(F);else throw new Error(`Unsupported uniform type: ${ut(C.type)}`)});let z=this.gpuDataManager.create(_,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(z.buffer,0,I,0,_),this.gpuDataManager.release(z.id),b={offset:0,size:_,buffer:z.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),w=y[1]===1&&y[2]===1,S=ap(e,t,w),v=this.programManager.getArtifact(S);if(v||(v=this.programManager.build(e,y),this.programManager.setArtifact(S,v),pe("info",()=>`[artifact] key: ${S}, programName: ${e.name}`)),d&&v.uniformVariablesInfo){if(d.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${d.length} in program "${v.programInfo.name}".`);for(let _=0;_<d.length;_++){let k=d[_],T=k.type,I=typeof k.data=="number"?1:k.data.length,[z,C]=v.uniformVariablesInfo[_];if(T!==z||I!==C)throw new Error(`Uniform variable ${_} mismatch: expect type ${z} with size ${C}, got type ${T} with size ${I} in program "${v.programInfo.name}".`)}}if(pe("info",()=>`[ProgramManager] run "${e.name}" (key=${S}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let _={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:c};this.pendingKernels.push(_),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(_)}return this.programManager.run(v,s,m,y,b),Ye(e.name),c}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}download(e,t){return N(this,null,function*(){yield this.gpuDataManager.download(e,t)})}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=Of.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,n=i.kernelName,s=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),pe("info",()=>`[WebGPU] Start to run kernel "[${a}] ${n}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${d}`)),1}finally{l&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${a}] ${n}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let n=a.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,n);return a.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return()=>N(this,null,function*(){let i=yield Fa(this,e,t);return cn(i.buffer,r)})}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){pe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){pe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){pe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),n=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(n.computePipeline),a.setBindGroup(0,n.bindGroup),a.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Df={};Yt(Df,{init:()=>Nf});var Yr,sp,Nf,zy=U(()=>{"use strict";te(),lt(),ie(),D0(),Yr=class Pf{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(B.size(t)!==B.size(this.dims))throw new Error("Invalid new shape");return new Pf(this.module,this.dataType,this.data,t)}},sp=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,n=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,n));let s=Number(e.getValue(i*a++,n));this.outputCount=Number(e.getValue(i*a++,n)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,n));let u=[];for(let l=0;l<s;l++){let d=Number(e.getValue(i*a++,n)),h=Number(e.getValue(i*a++,"*")),c=Number(e.getValue(i*a++,n)),m=[];for(let b=0;b<c;b++)m.push(Number(e.getValue(i*a++,n)));u.push(new Yr(e,d,h,m))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],a=(s,u,l)=>new Yr(this.module,u,this.output(s,l),l),n=(s,u)=>{let l=Mt(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new Yr(this.module,s,d,u)};return this.backend.run(e,r,i,a,n,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",n=this.module.stackAlloc((1+t.length)*i);this.module.setValue(n,t.length,a);for(let s=0;s<t.length;s++)this.module.setValue(n+i*(s+1),t[s],a);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Nf=(e,t,r,i)=>N(null,null,function*(){let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let n=(Iy(),xr(Rf)).WebGpuBackend,s=new n;yield s.initialize(r,i),a("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,d,h=!1)=>{if(h)pe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(d)}`),s.memcpy(Number(u),Number(l));else{pe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let c=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(d));s.upload(Number(l),c)}},(u,l,d)=>N(null,null,function*(){pe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${d}`),yield s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))}),(u,l,d)=>s.createKernel(u,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,d,h)=>{pe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${u}, contextDataOffset=${l}`);let c=new sp(t,s,Number(l));return s.computeKernel(Number(u),c,h)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let n=new Vp(r);a("webnn",[n,()=>n.reserveTensorId(),s=>n.releaseTensorId(s),(s,u,l,d,h)=>N(null,null,function*(){return n.ensureTensor(s,u,l,d,h)}),(s,u)=>{n.uploadTensor(s,u)},(s,u)=>N(null,null,function*(){return n.downloadTensor(s,u)}),(s,u)=>n.registerMLContext(s,u),!!r.trace])}})}),op,xn,Sn,bt,up,Da,di,Tn,kn,Na,En,In,zn,Uf=U(()=>{"use strict";Ve(),B0(),R0(),te(),qt(),on(),Pp(),op=(e,t)=>{we()._OrtInit(e,t)!==0&&me("Can't initialize onnxruntime.")},xn=e=>N(null,null,function*(){op(e.wasm.numThreads,ni(e.logLevel))}),Sn=(e,t)=>N(null,null,function*(){we().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=yield navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(zy(),xr(Df)).init;t==="webgpu"&&(yield i("webgpu",we(),e,r)),t==="webnn"&&(yield i("webnn",we(),e))}}),bt=new Map,up=e=>{let t=we(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&me("Can't get session input/output count.");let n=i===4?"i32":"i64";return[Number(t.getValue(a,n)),Number(t.getValue(a+i,n))]}finally{t.stackRestore(r)}},Da=(e,t)=>{let r=we(),i=r.stackSave(),a=0;try{let n=r.PTR_SIZE,s=r.stackAlloc(2*n);r._OrtGetInputOutputMetadata(e,t,s,s+n)!==0&&me("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));a=Number(r.getValue(s+n,"*"));let l=r.HEAP32[a/4];if(l===0)return[u,0];let d=r.HEAPU32[a/4+1],h=[];for(let c=0;c<d;c++){let m=Number(r.getValue(a+8+c*n,"*"));h.push(m!==0?r.UTF8ToString(m):Number(r.getValue(a+8+(c+d)*n,"*")))}return[u,l,h]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},di=e=>{let t=we(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Tn=(e,t)=>N(null,null,function*(){let r,i,a=we();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=di(e);let n=0,s=0,u=0,l=[],d=[],h=[];try{if([s,l]=yield Np(t),t?.externalData&&a.mountExternalData){let T=[];for(let I of t.externalData){let z=typeof I=="string"?I:I.path,C=typeof I=="string"?I:I.data;T.push(dn(C).then(x=>{a.mountExternalData(z,x)}))}yield Promise.all(T)}for(let T of t?.executionProviders??[])if((typeof T=="string"?T:T.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof T!="string"){let I=T,z=I?.context,C=I?.gpuDevice,x=I?.deviceType,P=I?.powerPreference;z?a.currentContext=z:C?a.currentContext=yield a.webnnCreateMLContext(C):a.currentContext=yield a.webnnCreateMLContext({deviceType:x,powerPreference:P})}else a.currentContext=yield a.webnnCreateMLContext();break}n=yield a._OrtCreateSession(r,i,s),a.webgpuOnCreateSession?.(n),n===0&&me("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(n,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[c,m]=up(n),b=!!t?.enableGraphCapture,y=[],w=[],S=[],v=[],_=[];for(let T=0;T<c;T++){let[I,z,C]=Da(n,T);I===0&&me("Can't get an input name."),d.push(I);let x=a.UTF8ToString(I);y.push(x),S.push(z===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:ut(z),shape:C})}for(let T=0;T<m;T++){let[I,z,C]=Da(n,T+c);I===0&&me("Can't get an output name."),h.push(I);let x=a.UTF8ToString(I);w.push(x),v.push(z===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:ut(z),shape:C});{if(b&&t?.preferredOutputLocation===void 0){_.push("gpu-buffer");continue}let P=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[x]??"cpu",F=a.webnnIsGraphOutput;if(P==="cpu"&&F&&F(n,x)){_.push("ml-tensor-cpu-output");continue}if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer"&&P!=="ml-tensor")throw new Error(`Not supported preferred output location: ${P}.`);if(b&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(P)}}let k=null;return _.some(T=>T==="gpu-buffer"||T==="ml-tensor"||T==="ml-tensor-cpu-output")&&(u=a._OrtCreateBinding(n),u===0&&me("Can't create IO binding."),k={handle:u,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(T=>T==="ml-tensor-cpu-output"?"ml-tensor":T).map(T=>qa(T))}),bt.set(n,[n,d,h,k,b,!1]),[n,y,w,S,v]}catch(c){throw d.forEach(m=>a._OrtFree(m)),h.forEach(m=>a._OrtFree(m)),u!==0&&a._OrtReleaseBinding(u)!==0&&me("Can't release IO binding."),n!==0&&a._OrtReleaseSession(n)!==0&&me("Can't release session."),c}finally{a._free(r),s!==0&&a._OrtReleaseSessionOptions(s)!==0&&me("Can't release session options."),l.forEach(c=>a._free(c)),a.unmountExternalData?.()}}),kn=e=>{let t=we(),r=bt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,n,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&me("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&me("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(l=>t._OrtFree(l)),n.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&me("Can't release session."),bt.delete(e)},Na=(e,t,r,i,a,n,s=!1)=>N(null,null,function*(){if(!e){t.push(0);return}let u=we(),l=u.PTR_SIZE,d=e[0],h=e[1],c=e[3],m=c,b,y;if(d==="string"&&(c==="gpu-buffer"||c==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&c!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(c==="gpu-buffer"){let v=e[2].gpuBuffer;y=Mt(Rt(d),h);{let _=u.jsepRegisterBuffer;if(!_)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');b=_(i,n,v,y)}}else if(c==="ml-tensor"){let v=e[2].mlTensor;y=Mt(Rt(d),h);let _=u.webnnRegisterMLTensor;if(!_)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');b=_(i,v,Rt(d),h)}else{let v=e[2];if(Array.isArray(v)){y=l*v.length,b=u._malloc(y),r.push(b);for(let _=0;_<v.length;_++){if(typeof v[_]!="string")throw new TypeError(`tensor data at index ${_} is not a string`);u.setValue(b+_*l,Xe(v[_],r),"*")}}else{let _=u.webnnIsGraphInput,k=u.webnnIsGraphOutput;if(d!=="string"&&_&&k){let T=u.UTF8ToString(a);if(_(i,T)||k(i,T)){let I=Rt(d);y=Mt(I,h),m="ml-tensor";let z=u.webnnCreateTemporaryTensor,C=u.webnnUploadTensor;if(!z||!C)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let x=yield z(i,I,h);C(x,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),b=x}else y=v.byteLength,b=u._malloc(y),r.push(b),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),b)}else y=v.byteLength,b=u._malloc(y),r.push(b),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),b)}}let w=u.stackSave(),S=u.stackAlloc(4*h.length);try{h.forEach((_,k)=>u.setValue(S+k*l,_,l===4?"i32":"i64"));let v=u._OrtCreateTensor(Rt(d),b,y,S,h.length,qa(m));v===0&&me(`Can't create tensor for input/output. session=${i}, index=${n}.`),t.push(v)}finally{u.stackRestore(w)}}),En=(e,t,r,i,a,n)=>N(null,null,function*(){let s=we(),u=s.PTR_SIZE,l=bt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],h=l[1],c=l[2],m=l[3],b=l[4],y=l[5],w=t.length,S=i.length,v=0,_=[],k=[],T=[],I=[],z=[],C=s.stackSave(),x=s.stackAlloc(w*u),P=s.stackAlloc(w*u),F=s.stackAlloc(S*u),K=s.stackAlloc(S*u);try{[v,_]=Dp(n),Dt("wasm prepareInputOutputTensor");for(let O=0;O<w;O++)yield Na(r[O],k,I,e,h[t[O]],t[O],b);for(let O=0;O<S;O++)yield Na(a[O],T,I,e,c[i[O]],w+i[O],b);Nt("wasm prepareInputOutputTensor");for(let O=0;O<w;O++)s.setValue(x+O*u,k[O],"*"),s.setValue(P+O*u,h[t[O]],"*");for(let O=0;O<S;O++)s.setValue(F+O*u,T[O],"*"),s.setValue(K+O*u,c[i[O]],"*");if(m&&!y){let{handle:O,outputPreferredLocations:L,outputPreferredLocationsEncoded:ee}=m;if(h.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${h.length}).`);Dt("wasm bindInputsOutputs");for(let re=0;re<w;re++){let X=t[re];(yield s._OrtBindInput(O,h[X],k[re]))!==0&&me(`Can't bind input[${re}] for session=${e}.`)}for(let re=0;re<S;re++){let X=i[re];a[re]?.[3]?(z.push(T[re]),s._OrtBindOutput(O,c[X],T[re],0)!==0&&me(`Can't bind pre-allocated output[${re}] for session=${e}.`)):s._OrtBindOutput(O,c[X],0,ee[X])!==0&&me(`Can't bind output[${re}] to ${L[re]} for session=${e}.`)}Nt("wasm bindInputsOutputs"),bt.set(e,[d,h,c,m,b,!0])}s.jsepOnRunStart?.(d),s.webnnOnRunStart?.(d);let V;m?V=yield s._OrtRunWithBinding(d,m.handle,S,F,v):V=yield s._OrtRun(d,P,x,w,K,S,F,v),V!==0&&me("failed to call OrtRun().");let W=[],oe=[];Dt("wasm ProcessOutputTensor");for(let O=0;O<S;O++){let L=Number(s.getValue(F+O*u,"*"));if(L===T[O]||z.includes(T[O])){W.push(a[O]),L!==T[O]&&s._OrtReleaseTensor(L)!==0&&me("Can't release tensor.");continue}let ee=s.stackSave(),re=s.stackAlloc(4*u),X=!1,ne,D=0;try{s._OrtGetTensorData(L,re,re+u,re+2*u,re+3*u)!==0&&me(`Can't access output tensor data on index ${O}.`);let J=u===4?"i32":"i64",Z=Number(s.getValue(re,J));D=s.getValue(re+u,"*");let H=s.getValue(re+u*2,"*"),_e=Number(s.getValue(re+u*3,J)),Ie=[];for(let ge=0;ge<_e;ge++)Ie.push(Number(s.getValue(H+ge*u,J)));s._OrtFree(H)!==0&&me("Can't free memory for tensor dims.");let xe=Ie.reduce((ge,Se)=>ge*Se,1);ne=ut(Z);let Oe=m?.outputPreferredLocations[i[O]];if(ne==="string"){if(Oe==="gpu-buffer"||Oe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ge=[];for(let Se=0;Se<xe;Se++){let Ne=s.getValue(D+Se*u,"*"),xt=s.getValue(D+(Se+1)*u,"*"),Ir=Se===xe-1?void 0:xt-Ne;ge.push(s.UTF8ToString(Ne,Ir))}W.push([ne,Ie,ge,"cpu"])}else if(Oe==="gpu-buffer"&&xe>0){let ge=s.jsepGetBuffer;if(!ge)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Se=ge(D),Ne=Mt(Z,xe);if(Ne===void 0||!un(ne))throw new Error(`Unsupported data type: ${ne}`);X=!0,W.push([ne,Ie,{gpuBuffer:Se,download:s.jsepCreateDownloader(Se,Ne,ne),dispose:()=>{s._OrtReleaseTensor(L)!==0&&me("Can't release tensor.")}},"gpu-buffer"])}else if(Oe==="ml-tensor"&&xe>0){let ge=s.webnnEnsureTensor,Se=s.webnnIsGraphInputOutputTypeSupported;if(!ge||!Se)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Mt(Z,xe)===void 0||!ln(ne))throw new Error(`Unsupported data type: ${ne}`);if(!Se(e,ne,!1))throw new Error(`preferredLocation "ml-tensor" for ${ne} output is not supported by current WebNN Context.`);let Ne=yield ge(e,D,Z,Ie,!1);X=!0,W.push([ne,Ie,{mlTensor:Ne,download:s.webnnCreateMLTensorDownloader(D,ne),dispose:()=>{s.webnnReleaseTensorId(D),s._OrtReleaseTensor(L)}},"ml-tensor"])}else if(Oe==="ml-tensor-cpu-output"&&xe>0){let ge=s.webnnCreateMLTensorDownloader(D,ne)(),Se=W.length;X=!0,oe.push(N(null,null,function*(){let Ne=[Se,yield ge];return s.webnnReleaseTensorId(D),s._OrtReleaseTensor(L),Ne})),W.push([ne,Ie,[],"cpu"])}else{let ge=pi(ne),Se=new ge(xe);new Uint8Array(Se.buffer,Se.byteOffset,Se.byteLength).set(s.HEAPU8.subarray(D,D+Se.byteLength)),W.push([ne,Ie,Se,"cpu"])}}finally{s.stackRestore(ee),ne==="string"&&D&&s._free(D),X||s._OrtReleaseTensor(L)}}m&&!b&&(s._OrtClearBoundOutputs(m.handle)!==0&&me("Can't clear bound outputs."),bt.set(e,[d,h,c,m,b,!1]));for(let[O,L]of yield Promise.all(oe))W[O][2]=L;return Nt("wasm ProcessOutputTensor"),W}finally{s.webnnOnRunEnd?.(d),s.stackRestore(C),k.forEach(V=>s._OrtReleaseTensor(V)),T.forEach(V=>s._OrtReleaseTensor(V)),I.forEach(V=>s._free(V)),v!==0&&s._OrtReleaseRunOptions(v),_.forEach(V=>s._free(V))}}),In=e=>{let t=we(),r=bt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&me("Can't get an profile file name."),t._OrtFree(a)},zn=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),_t,We,jt,yr,br,Jr,Pa,ei,At,Ot,lp,Lf,qf,Ff,Wf,Vf,Gf,Hf,jf=U(()=>{"use strict";Ve(),Uf(),qt(),nn(),_t=()=>!!be.wasm.proxy&&typeof document<"u",jt=!1,yr=!1,br=!1,ei=new Map,At=(e,t)=>{let r=ei.get(e);r?r.push(t):ei.set(e,[t])},Ot=()=>{if(jt||!yr||br||!We)throw new Error("worker not ready")},lp=e=>{switch(e.data.type){case"init-wasm":jt=!1,e.data.err?(br=!0,Pa[1](e.data.err)):(yr=!0,Pa[0]()),Jr&&(URL.revokeObjectURL(Jr),Jr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=ei.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Lf=()=>N(null,null,function*(){if(!yr){if(jt)throw new Error("multiple calls to 'initWasm()' detected.");if(br)throw new Error("previous call to 'initWasm()' failed.");if(jt=!0,_t())return new Promise((e,t)=>{We?.terminate(),Rp().then(([r,i])=>{try{We=i,We.onerror=n=>t(n),We.onmessage=lp,Pa=[e,t];let a={type:"init-wasm",in:be};!a.in.wasm.wasmPaths&&(r||La)&&(a.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),We.postMessage(a),Jr=r}catch(a){t(a)}},t)});try{yield sn(be.wasm),yield xn(be),yr=!0}catch(e){throw br=!0,e}finally{jt=!1}}}),qf=e=>N(null,null,function*(){if(_t())return Ot(),new Promise((t,r)=>{At("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:be}};We.postMessage(i)});yield Sn(be,e)}),Ff=e=>N(null,null,function*(){return _t()?(Ot(),new Promise((t,r)=>{At("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};We.postMessage(i,[e.buffer])})):di(e)}),Wf=(e,t)=>N(null,null,function*(){if(_t()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ot(),new Promise((r,i)=>{At("create",[r,i]);let a={type:"create",in:{model:e,options:Me({},t)}},n=[];e instanceof Uint8Array&&n.push(e.buffer),We.postMessage(a,n)})}else return Tn(e,t)}),Vf=e=>N(null,null,function*(){if(_t())return Ot(),new Promise((t,r)=>{At("release",[t,r]);let i={type:"release",in:e};We.postMessage(i)});kn(e)}),Gf=(e,t,r,i,a,n)=>N(null,null,function*(){if(_t()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ot(),new Promise((s,u)=>{At("run",[s,u]);let l=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:n}};We.postMessage(d,zn(l))})}else return En(e,t,r,i,a,n)}),Hf=e=>N(null,null,function*(){if(_t())return Ot(),new Promise((t,r)=>{At("end-profiling",[t,r]);let i={type:"end-profiling",in:e};We.postMessage(i)});In(e)})}),Ua,dp,Kf,Cy=U(()=>{"use strict";Ve(),jf(),te(),an(),Pp(),Ua=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},dp=e=>{switch(e[3]){case"cpu":return new ze(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!un(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return ze.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!ln(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return ze.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},Kf=class{fetchModelAndCopyToWasmMemory(e){return N(this,null,function*(){return Ff(yield dn(e))})}loadModel(e,t){return N(this,null,function*(){it();let r;typeof e=="string"?r=yield this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=yield Wf(r,t),Ye()})}dispose(){return N(this,null,function*(){return Vf(this.sessionId)})}run(e,t,r){return N(this,null,function*(){it();let i=[],a=[];Object.entries(e).forEach(c=>{let m=c[0],b=c[1],y=this.inputNames.indexOf(m);if(y===-1)throw new Error(`invalid input '${m}'`);i.push(b),a.push(y)});let n=[],s=[];Object.entries(t).forEach(c=>{let m=c[0],b=c[1],y=this.outputNames.indexOf(m);if(y===-1)throw new Error(`invalid output '${m}'`);n.push(b),s.push(y)});let u=i.map((c,m)=>Ua(c,()=>`input "${this.inputNames[a[m]]}"`)),l=n.map((c,m)=>c?Ua(c,()=>`output "${this.outputNames[s[m]]}"`):null),d=yield Gf(this.sessionId,a,u,s,l,r),h={};for(let c=0;c<d.length;c++)h[this.outputNames[s[c]]]=n[c]??dp(d[c]);return Ye(),h})}startProfiling(){}endProfiling(){Hf(this.sessionId)}}}),Zf={};Yt(Zf,{OnnxruntimeWebAssemblyBackend:()=>en,initializeFlags:()=>Ja,wasmBackend:()=>Qf});var Ja,en,Qf,Ay=U(()=>{"use strict";Ve(),jf(),Cy(),Ja=()=>{(typeof be.wasm.initTimeout!="number"||be.wasm.initTimeout<0)&&(be.wasm.initTimeout=0);let e=be.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),be.wasm.simd=!1),typeof be.wasm.proxy!="boolean"&&(be.wasm.proxy=!1),typeof be.wasm.trace!="boolean"&&(be.wasm.trace=!1),typeof be.wasm.numThreads!="number"||!Number.isInteger(be.wasm.numThreads)||be.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)be.wasm.numThreads=1;else{let t=typeof navigator>"u"?m0("node:os").cpus().length:navigator.hardwareConcurrency;be.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},en=class{init(e){return N(this,null,function*(){Ja(),yield Lf(),yield qf(e)})}createInferenceSessionHandler(e,t){return N(this,null,function*(){let r=new Kf;return yield r.loadModel(e,t),r})}},Qf=new en});Ve();Ve();Ve();var Oy="1.29.0";{let e=(Ay(),xr(Zf)).wasmBackend;Kt("webgpu",e,5),Kt("webnn",e,5),Kt("cpu",e,10),Kt("wasm",e,10)}Object.defineProperty(be.versions,"web",{value:Oy,enumerable:!0});var Ry=["en","ko","ja","ar","bg","cs","da","de","el","es","et","fi","fr","hi","hr","hu","id","it","lt","lv","nl","pl","pt","ro","ru","sk","sl","sv","tr","uk","vi","na"];function My(e){return Ry.includes(e)}var kr=class{constructor(t){this.indexer=t}indexer;call(t,r){let i=t.map((l,d)=>this.preprocessText(l,r[d])),a=i.map(l=>l.length),n=Math.max(...a),s=i.map(l=>{let d=new Array(n).fill(0);for(let h=0;h<l.length;h++){let c=l.codePointAt(h);c!==void 0&&c<this.indexer.length?d[h]=this.indexer[c]:d[h]=-1}return d}),u=this.getTextMask(a);return{textIds:s,textMask:u}}preprocessText(t,r){t=t.normalize("NFKD");let i=/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]+/gu;t=t.replace(i,"");let a={"\u2013":"-","\u2011":"-","\u2014":"-",_:" ","\u201C":'"',"\u201D":'"',"\u2018":"'","\u2019":"'","\xB4":"'","`":"'","[":" ","]":" ","|":" ","/":" ","#":" ","\u2192":" ","\u2190":" "};for(let[u,l]of Object.entries(a))t=t.replaceAll(u,l);t=t.replace(/[♥☆♡©\\]/g,"");let n={"@":" at ","e.g.,":"for example, ","i.e.,":"that is, "};for(let[u,l]of Object.entries(n))t=t.replaceAll(u,l);for(t=t.replace(/ ,/g,","),t=t.replace(/ \./g,"."),t=t.replace(/ !/g,"!"),t=t.replace(/ \?/g,"?"),t=t.replace(/ ;/g,";"),t=t.replace(/ :/g,":"),t=t.replace(/ '/g,"'");t.includes('""');)t=t.replace('""','"');for(;t.includes("''");)t=t.replace("''","'");for(;t.includes("``");)t=t.replace("``","`");t=t.replace(/\s+/g," ").trim(),/[.!?;:,'"'\)\]}…。」』】〉》›»]$/.test(t)||(t+=".");let s=My(r)?r:"en";return`<${s}>${t}</${s}>`}getTextMask(t){let r=Math.max(...t);return this.lengthToMask(t,r)}lengthToMask(t,r=null){let i=r||Math.max(...t);return t.map(a=>{let n=new Array(i).fill(0);for(let s=0;s<Math.min(a,i);s++)n[s]=1;return[n]})}};function Xf(e,t){let n=t*1*2,s=2,u=e.length*2,l=new ArrayBuffer(44+u),d=new DataView(l),h=(m,b)=>{for(let y=0;y<b.length;y++)d.setUint8(m+y,b.charCodeAt(y))};h(0,"RIFF"),d.setUint32(4,36+u,!0),h(8,"WAVE"),h(12,"fmt "),d.setUint32(16,16,!0),d.setUint16(20,1,!0),d.setUint16(22,1,!0),d.setUint32(24,t,!0),d.setUint32(28,n,!0),d.setUint16(32,s,!0),d.setUint16(34,16,!0),h(36,"data"),d.setUint32(40,u,!0);let c=44;for(let m=0;m<e.length;m++){let b=e[m];(typeof b!="number"||!isFinite(b)||isNaN(b))&&(b=0),b=Math.max(-1,Math.min(1,b));let y=b<0?Math.round(b*32768):Math.round(b*32767);d.setInt16(c,y,!0),c+=2}return l}var Jt=class e{isSupported(){return typeof navigator<"u"&&"storage"in navigator&&typeof navigator.storage.getDirectory=="function"}getRoot(){return N(this,null,function*(){if(!this.isSupported())throw new Error("OPFS is not supported in this environment.");return yield navigator.storage.getDirectory()})}resolvePath(t,r=!1){return N(this,null,function*(){let i=yield this.getRoot(),n=t.replace(/^[/\\]+/,"").replace(/[/\\]+$/,"").split(/[/\\]+/);if(n.length===0||n.length===1&&!n[0])throw new Error(`Invalid file path: "${t}"`);let s=n.pop(),u=i;for(let l of n)u=yield u.getDirectoryHandle(l,{create:r});return{dirHandle:u,fileName:s}})}resolveDirectory(t,r=!1){return N(this,null,function*(){let i=yield this.getRoot(),a=t.replace(/^[/\\]+/,"").replace(/[/\\]+$/,"");if(!a)return i;let n=a.split(/[/\\]+/),s=i;for(let u of n)s=yield s.getDirectoryHandle(u,{create:r});return s})}fileExists(t){return N(this,null,function*(){if(!this.isSupported())return!1;try{let{dirHandle:r,fileName:i}=yield this.resolvePath(t,!1);return(yield(yield r.getFileHandle(i)).getFile()).size>0}catch{return!1}})}getFileSize(t){return N(this,null,function*(){if(!this.isSupported())return 0;try{let{dirHandle:r,fileName:i}=yield this.resolvePath(t,!1);return(yield(yield r.getFileHandle(i)).getFile()).size}catch{return 0}})}readFile(t){return N(this,null,function*(){let{dirHandle:r,fileName:i}=yield this.resolvePath(t,!1);return yield(yield(yield r.getFileHandle(i)).getFile()).arrayBuffer()})}readText(t){return N(this,null,function*(){let{dirHandle:r,fileName:i}=yield this.resolvePath(t,!1);return yield(yield(yield r.getFileHandle(i)).getFile()).text()})}writeFile(t,r){return N(this,null,function*(){let{dirHandle:i,fileName:a}=yield this.resolvePath(t,!0),s=yield(yield i.getFileHandle(a,{create:!0})).createWritable();try{typeof r=="string"||r instanceof Blob?yield s.write(r):r instanceof Uint8Array?yield s.write(r):r instanceof ArrayBuffer?yield s.write(r):yield s.write(r)}finally{yield s.close()}})}deleteFile(t){return N(this,null,function*(){if(!this.isSupported())return!1;try{let{dirHandle:r,fileName:i}=yield this.resolvePath(t,!1);return yield r.removeEntry(i),!0}catch{return!1}})}createDirectory(t){return N(this,null,function*(){yield this.resolveDirectory(t,!0)})}clearDirectory(t){return N(this,null,function*(){if(this.isSupported())try{let s=yield this.resolveDirectory(t,!1),u=[];try{for(var r=Pi(s.entries()),i,a,n;i=!(a=yield r.next()).done;i=!1){let[l]=a.value;u.push(l)}}catch(a){n=[a]}finally{try{i&&(a=r.return)&&(yield a.call(r))}finally{if(n)throw n[0]}}for(let l of u)yield s.removeEntry(l,{recursive:!0})}catch{}})}static \u0275fac=function(r){return new(r||e)};static \u0275prov=Ht({token:e,factory:e.\u0275fac,providedIn:"root"})};var Er="1.0.0",rr=["tts.json","unicode_indexer.json","duration_predictor.onnx","text_encoder.onnx","vector_estimator.onnx","vocoder.onnx"],Jf="supertonic",er=`${Jf}/models`,tr=`${Jf}/manifest.json`,Dy=420*1024*1024,ci=class e{opfsStorage=or(Jt);get storage(){return this.opfsStorage}isOpfsSupported(){return this.opfsStorage.isSupported()}requestPersistence(){return N(this,null,function*(){if(typeof navigator>"u"||!navigator.storage?.persist)return!1;try{return(yield navigator.storage.persisted())?!0:yield navigator.storage.persist()}catch{return!1}})}checkStorageQuota(){return N(this,arguments,function*(t=Dy){if(typeof navigator>"u"||!navigator.storage?.estimate)return!0;try{let{quota:r,usage:i}=yield navigator.storage.estimate();if(r!==void 0&&i!==void 0){let a=r-i;if(a<t)return console.warn(`[TTS] Insufficient storage quota. Required: ~${(t/1024/1024).toFixed(1)}MB, Available: ${(a/1024/1024).toFixed(1)}MB`),!1}return!0}catch{return!0}})}isCacheValid(){return N(this,null,function*(){if(!this.isOpfsSupported())return!1;console.log("[TTS] Checking OPFS model cache");try{if(!(yield this.opfsStorage.fileExists(tr)))return console.log("[TTS] Model cache missing"),!1;let r=yield this.opfsStorage.readText(tr),i=JSON.parse(r);if(!i||i.version!==Er)return console.log(`[TTS] Model cache version changed (found: ${i?.version??"none"}, expected: ${Er})`),!1;for(let a of rr){let n=`${er}/${a}`;if(!(yield this.opfsStorage.fileExists(n)))return console.log(`[TTS] Model cache missing required file: ${a}`),!1}return console.log("[TTS] Model cache found"),!0}catch(t){return console.warn("[TTS] Error checking OPFS cache validity:",t),!1}})}ensureModelsCached(t,r){return N(this,null,function*(){if(!this.isOpfsSupported())return console.log("[TTS] OPFS unavailable, using fallback"),!1;if(yield this.isCacheValid())return!0;yield this.requestPersistence(),yield this.checkStorageQuota(),yield this.opfsStorage.deleteFile(tr),yield this.opfsStorage.createDirectory(er);let a=rr.length,n=t.replace(/\/+$/,"");try{for(let u=0;u<a;u++){let l=rr[u],d=u+1,h=`${er}/${l}`;if(yield this.opfsStorage.fileExists(h)){r?.({step:d,total:a,message:`Verifying cached asset ${d}/${a}: ${l}...`});continue}console.log(`[TTS] Downloading model: ${l}`),r?.({step:d,total:a,message:`Downloading TTS model ${d}/${a}: ${l}...`});let m=`${n}/${l}`,b=yield fetch(m);if(!b.ok)throw new Error(`Failed to download model file ${l} (${b.status} ${b.statusText})`);let y=yield b.arrayBuffer();console.log(`[TTS] Saving model to OPFS: ${l}`),r?.({step:d,total:a,message:`Saving to persistent OPFS storage: ${l}...`}),yield this.opfsStorage.writeFile(h,y)}let s={version:Er,files:[...rr],createdAt:new Date().toISOString()};return yield this.opfsStorage.writeFile(tr,JSON.stringify(s,null,2)),console.log("[TTS] Model cache saved successfully to OPFS"),!0}catch(s){throw console.error("[TTS] Failed to cache models into OPFS:",s),yield this.opfsStorage.deleteFile(tr),s}})}loadModelAsArrayBuffer(t){return N(this,null,function*(){let r=`${er}/${t}`;return yield this.opfsStorage.readFile(r)})}loadModelAsJson(t){return N(this,null,function*(){let r=`${er}/${t}`,i=yield this.opfsStorage.readText(r);return JSON.parse(i)})}invalidateCache(){return N(this,null,function*(){this.isOpfsSupported()&&(yield this.opfsStorage.deleteFile(tr),yield this.opfsStorage.clearDirectory(er))})}static \u0275fac=function(r){return new(r||e)};static \u0275prov=Ht({token:e,factory:e.\u0275fac,providedIn:"root"})};var Cn=class{constructor(t,r){this.ttl=t;this.dp=r}ttl;dp},hi=class{dpSession=null;textEncSession=null;vectorEstSession=null;vocoderSession=null;textProcessor=null;cfgs=null;voiceStyles=new Map;activeProvider="wasm";initialized=!1;get isInitialized(){return this.initialized}get provider(){return this.activeProvider}get sampleRate(){return this.cfgs?.ae.sample_rate??44100}init(t,r){return N(this,null,function*(){let i=(h,c,m)=>{r?.({step:h,total:c,message:m})};i(1,6,"Configuring ONNX Web runtime..."),t.wasmBasePath&&(be.wasm.wasmPaths=t.wasmBasePath),be.wasm.numThreads=1,i(2,6,"Loading model configurations and tokenizer...");let a=new Jt,n=!1;if(a.isSupported())try{if(yield a.fileExists("supertonic/manifest.json")){let c=yield a.readText("supertonic/manifest.json"),m=JSON.parse(c);if(m&&m.version===Er){let b=!0;for(let y of rr)if(!(yield a.fileExists(`supertonic/models/${y}`))){b=!1;break}b&&(n=!0)}}}catch(h){console.warn("[TTS] Could not verify OPFS cache in engine:",h),n=!1}if(n){console.log("[TTS] Loading models from OPFS");let h=yield a.readText("supertonic/models/tts.json");this.cfgs=JSON.parse(h);let c=yield a.readText("supertonic/models/unicode_indexer.json"),m=JSON.parse(c);this.textProcessor=new kr(m)}else{console.log("[TTS] OPFS unavailable, using fallback");let[h,c]=yield Promise.all([fetch(`${t.modelBasePath}/tts.json`),fetch(`${t.modelBasePath}/unicode_indexer.json`)]);if(!h.ok||!c.ok)throw new Error("Failed to load Supertonic configuration or unicode indexer.");this.cfgs=yield h.json();let m=yield c.json();this.textProcessor=new kr(m)}let s=[{name:"Duration Predictor",file:"duration_predictor.onnx"},{name:"Text Encoder",file:"text_encoder.onnx"},{name:"Vector Estimator",file:"vector_estimator.onnx"},{name:"Vocoder",file:"vocoder.onnx"}],u="wasm",l=t.preferWebGpu?["webgpu","wasm"]:["wasm"],d=null;for(let h of l)try{i(3,6,`Initializing neural sessions via ${h.toUpperCase()}...`);let c={executionProviders:[h],graphOptimizationLevel:"all"},m=[];for(let b=0;b<s.length;b++){let y=s[b];i(3+b,6,`Loading ${y.name} (${h.toUpperCase()})...`);let w;if(n){let S=yield a.readFile(`supertonic/models/${y.file}`);w=yield Tr.create(new Uint8Array(S),c)}else w=yield Tr.create(`${t.modelBasePath}/${y.file}`,c);m.push(w)}d=m,u=h;break}catch(c){if(console.warn(`Failed to initialize models with ${h}:`,c),h==="webgpu"&&l.includes("wasm"))i(3,6,"WebGPU unavailable. Falling back to WebAssembly...");else throw c}if(!d||d.length<4)throw new Error("Failed to instantiate ONNX model sessions.");return this.dpSession=d[0],this.textEncSession=d[1],this.vectorEstSession=d[2],this.vocoderSession=d[3],this.activeProvider=u,i(6,6,`Loading voice preset (${t.defaultVoice})...`),yield this.loadVoiceStyle(t.defaultVoice,`${t.modelBasePath}/../voice_styles/${t.defaultVoice}.json`),this.initialized=!0,this.activeProvider})}loadVoiceStyle(t,r){return N(this,null,function*(){if(this.voiceStyles.has(t))return this.voiceStyles.get(t);let i=yield fetch(r);if(!i.ok)throw new Error(`Failed to fetch voice style from ${r}`);let a=yield i.json(),n=a.style_ttl.dims,s=a.style_dp.dims,u=n[1],l=n[2],d=s[1],h=s[2],c=a.style_ttl.data.flat(2),m=a.style_dp.data.flat(2),b=new Float32Array(c),y=new Float32Array(m),w=new ze("float32",b,[1,u,l]),S=new ze("float32",y,[1,d,h]),v=new Cn(w,S);return this.voiceStyles.set(t,v),v})}synthesize(t,r,i,a=1.05,n=4,s=.25,u){return N(this,null,function*(){if(!this.initialized||!this.dpSession||!this.textEncSession||!this.vectorEstSession||!this.vocoderSession||!this.textProcessor||!this.cfgs)throw new Error("Supertonic engine is not initialized.");let l=this.voiceStyles.get(i);if(!l&&(l=this.voiceStyles.get("F1")||this.voiceStyles.get("M1")||this.voiceStyles.values().next().value,!l))throw new Error(`Voice ${i} is not loaded.`);let d=r==="ko"||r==="ja"?120:300,h=this.chunkText(t,d);if(h.length===0)throw new Error("No text to synthesize.");let c=[],m=0;for(let y=0;y<h.length;y++){let w=h[y],S=y+1,v=h.length,{wav:_,duration:k}=yield this.inferSingle(w,r,l,n,a,(T,I)=>{u?.({step:T+(S-1)*I,total:v*I,message:`Synthesizing part ${S}/${v} (Step ${T}/${I})...`})});if(c.length===0)c=_,m=k;else{let T=Math.floor(s*this.sampleRate),I=new Array(T).fill(0);c=[...c,...I,..._],m+=k+s}}return{wavBuffer:Xf(c,this.sampleRate),duration:m,sampleRate:this.sampleRate}})}inferSingle(t,r,i,a,n,s){return N(this,null,function*(){let{textIds:l,textMask:d}=this.textProcessor.call([t],[r]),h=new BigInt64Array(l.flat().map(W=>BigInt(W))),c=new ze("int64",h,[1,l[0].length]),m=new Float32Array(d.flat(2)),b=new ze("float32",m,[1,1,d[0][0].length]),y=yield this.dpSession.run({text_ids:c,style_dp:i.dp,text_mask:b}),S=Array.from(y.duration.data)[0]/n,_=(yield this.textEncSession.run({text_ids:c,style_ttl:i.ttl,text_mask:b})).text_emb,{xt:k,latentMask:T}=this.sampleNoisyLatent([S],this.sampleRate,this.cfgs.ae.base_chunk_size,this.cfgs.ttl.chunk_compress_factor,this.cfgs.ttl.latent_dim),I=new Float32Array(T.flat(2)),z=new ze("float32",I,[1,1,T[0][0].length]),C=new ze("float32",new Float32Array([a]),[1]);for(let W=0;W<a;W++){s?.(W+1,a);let oe=new ze("float32",new Float32Array([W]),[1]),O=new Float32Array(k.flat(2)),L=new ze("float32",O,[1,k[0].length,k[0][0].length]),ee=yield this.vectorEstSession.run({noisy_latent:L,text_emb:_,style_ttl:i.ttl,latent_mask:z,text_mask:b,current_step:oe,total_step:C}),re=Array.from(ee.denoised_latent.data),X=k[0].length,ne=k[0][0].length;k=[];let D=0;for(let J=0;J<1;J++){let Z=[];for(let H=0;H<X;H++){let _e=[];for(let Ie=0;Ie<ne;Ie++)_e.push(re[D++]);Z.push(_e)}k.push(Z)}}let x=new Float32Array(k.flat(2)),P=new ze("float32",x,[1,k[0].length,k[0][0].length]),F=yield this.vocoderSession.run({latent:P}),K=Array.from(F.wav_tts.data),V=!1;for(let W=0;W<K.length;W++)(!isFinite(K[W])||isNaN(K[W]))&&(K[W]=0,V=!0);return V&&console.warn("Supertonic TTS: Detected NaN or non-finite audio samples in model output."),{wav:K,duration:S}})}sampleNoisyLatent(t,r,i,a,n){let s=t.length,u=Math.max(...t),l=Math.floor(u*r),d=t.map(S=>Math.floor(S*r)),h=i*a,c=Math.floor((l+h-1)/h),m=n*a,b=[];for(let S=0;S<s;S++){let v=[];for(let _=0;_<m;_++){let k=[];for(let T=0;T<c;T++){let I=Math.max(1e-4,Math.random()),z=Math.random(),C=Math.sqrt(-2*Math.log(I))*Math.cos(2*Math.PI*z);k.push(C)}v.push(k)}b.push(v)}let y=d.map(S=>Math.floor((S+h-1)/h)),w=this.lengthToMask(y,c);for(let S=0;S<s;S++)for(let v=0;v<m;v++)for(let _=0;_<c;_++)b[S][v][_]*=w[S][0][_];return{xt:b,latentMask:w}}lengthToMask(t,r=null){let i=r||Math.max(...t);return t.map(a=>{let n=new Array(i).fill(0);for(let s=0;s<Math.min(a,i);s++)n[s]=1;return[n]})}chunkText(t,r=300){if(typeof t!="string")return[];let i=t.trim().split(/\n\s*\n+/).filter(n=>n.trim()),a=[];for(let n of i){if(n=n.trim(),!n)continue;let s=n.split(new RegExp("(?<!Mr\\.|Mrs\\.|Ms\\.|Dr\\.|Prof\\.|Sr\\.|Jr\\.|Ph\\.D\\.|etc\\.|e\\.g\\.|i\\.e\\.|vs\\.|Inc\\.|Ltd\\.|Co\\.|Corp\\.|St\\.|Ave\\.|Blvd\\.)(?<!\\b[A-Z]\\.)(?<=[.!?])\\s+")),u="";for(let l of s)u.length+l.length+1<=r?u+=(u?" ":"")+l:(u&&a.push(u.trim()),u=l);u&&a.push(u.trim())}return a}};function Ny(){return typeof navigator>"u"?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent)}var em={modelBasePath:"/tts/onnx",wasmBasePath:"/tts/wasm/",defaultVoice:"F1",preferWebGpu:!Ny(),totalStep:4,speed:1.05},tm=class e{languageService=or(So);modelCache=or(ci);statusSubject=new Gt("uninitialized");progressSubject=new Gt(null);activeBackendSubject=new Gt(null);isSpeakingSubject=new Gt(!1);errorSubject=new Gt(null);status$=this.statusSubject.asObservable();progress$=this.progressSubject.asObservable();activeBackend$=this.activeBackendSubject.asObservable();isSpeaking$=this.isSpeakingSubject.asObservable();error$=this.errorSubject.asObservable();worker=null;fallbackEngine=null;config=em;initPromise=null;memoryCache=new Map;inFlightGenerations=new Map;idbPromise=null;audioCtx=null;currentAudioSource=null;currentAudioElement=null;currentBlobUrl=null;pendingRequests=new Map;constructor(){this.setupWorker(),this.initIndexedDb()}ngOnDestroy(){this.stop(),this.worker?.terminate(),this.audioCtx?.close().catch(()=>{})}get currentStatus(){return this.statusSubject.value}get isSpeaking(){return this.isSpeakingSubject.value}get activeBackend(){return this.activeBackendSubject.value}init(t){return N(this,null,function*(){if(!(this.statusSubject.value==="ready"||this.statusSubject.value==="speaking"||this.statusSubject.value==="generating"))return this.initPromise?this.initPromise:(this.config=Me(Me({},em),t),this.statusSubject.next("loading"),this.errorSubject.next(null),this.initPromise=N(this,null,function*(){try{if(this.modelCache.isOpfsSupported())try{yield this.modelCache.ensureModelsCached(this.config.modelBasePath,r=>{this.progressSubject.next(r)})}catch(r){console.warn("[TTS] OPFS model caching encountered an error, falling back to direct loading:",r)}if(this.worker){let r=yield this.sendWorkerRequest({id:this.generateRequestId(),type:"INIT",config:this.config});if(r.type==="INIT_SUCCESS")this.activeBackendSubject.next(r.provider),this.statusSubject.next("ready"),this.progressSubject.next(null);else throw new Error("Unexpected response during initialization")}else{this.fallbackEngine=new hi;let r=yield this.fallbackEngine.init(this.config,i=>{this.progressSubject.next(i)});this.activeBackendSubject.next(r),this.statusSubject.next("ready"),this.progressSubject.next(null)}}catch(r){let i=r instanceof Error?r.message:String(r);throw this.statusSubject.next("error"),this.errorSubject.next(i),this.initPromise=null,r}}),this.initPromise)})}loadVoice(t){return N(this,null,function*(){yield this.init();let r=`${this.config.modelBasePath}/../voice_styles/${t}.json`;this.worker?yield this.sendWorkerRequest({id:this.generateRequestId(),type:"LOAD_VOICE",voice:t,voicePath:r}):this.fallbackEngine&&(yield this.fallbackEngine.loadVoiceStyle(t,r))})}speak(t,r){return N(this,null,function*(){if(!t||!t.trim())return;this.stop();let i=yield this.generateWav(t,r);yield this.playAudioBlob(i)})}generateWav(t,r){return N(this,null,function*(){if(!t||!t.trim())throw new Error("Cannot synthesize empty text.");let i=r?.lang||this.languageService.getCurrentLanguage()||"ro",a=r?.voice||this.config.defaultVoice,n=r?.speed??this.config.speed,s=r?.steps??this.config.totalStep,u=r?.silenceDuration??.25,l=this.buildCacheKey(t,i,a,n,s);if(this.memoryCache.has(l))return this.memoryCache.get(l);let d=yield this.getFromIndexedDb(l);if(d)return this.memoryCache.set(l,d),d;if(this.inFlightGenerations.has(l))return this.inFlightGenerations.get(l);yield this.init(),this.statusSubject.next("generating");let h=N(this,null,function*(){try{let c;if(this.worker){let b=yield this.sendWorkerRequest({id:this.generateRequestId(),type:"SYNTHESIZE",text:t,lang:i,voice:a,speed:n,steps:s,silenceDuration:u});if(b.type==="SYNTHESIZE_SUCCESS")c=b.audioBuffer;else throw new Error("Failed to generate audio in worker.")}else if(this.fallbackEngine)c=(yield this.fallbackEngine.synthesize(t,i,a,n,s,u,y=>this.progressSubject.next(y))).wavBuffer;else throw new Error("TTS engine not available.");this.statusSubject.next("ready"),this.progressSubject.next(null);let m=new Blob([c],{type:"audio/wav"});return this.memoryCache.set(l,m),this.saveToIndexedDb(l,m),m}catch(c){let m=c instanceof Error?c.message:String(c);throw this.statusSubject.next("error"),this.errorSubject.next(m),c}finally{this.inFlightGenerations.delete(l)}});return this.inFlightGenerations.set(l,h),h})}preload(t,r){return N(this,null,function*(){for(let i of t)try{yield this.generateWav(i,r)}catch(a){console.warn("Failed to preload phrase:",i,a)}})}clearCache(){return N(this,null,function*(){if(this.memoryCache.clear(),!!this.idbPromise)try{let t=yield this.idbPromise;if(!t)return;t.transaction("audio_blobs","readwrite").objectStore("audio_blobs").clear()}catch(t){console.warn("Failed to clear IndexedDB cache:",t)}})}clearModelCache(){return N(this,null,function*(){yield this.modelCache.invalidateCache()})}buildCacheKey(t,r,i,a,n){return`${r}_${i}_${a.toFixed(2)}_${n}_${t.trim().toLowerCase()}`}initIndexedDb(){typeof indexedDB>"u"||(this.idbPromise=new Promise(t=>{try{let r=indexedDB.open("knowle-tts-cache",1);r.onupgradeneeded=()=>{let i=r.result;i.objectStoreNames.contains("audio_blobs")||i.createObjectStore("audio_blobs")},r.onsuccess=()=>t(r.result),r.onerror=()=>{console.warn("Could not open IndexedDB for TTS caching:",r.error),t(null)}}catch(r){console.warn("IndexedDB unavailable:",r),t(null)}}))}getFromIndexedDb(t){return N(this,null,function*(){if(!this.idbPromise)return null;try{let r=yield this.idbPromise;return r?new Promise(i=>{try{let s=r.transaction("audio_blobs","readonly").objectStore("audio_blobs").get(t);s.onsuccess=()=>i(s.result instanceof Blob?s.result:null),s.onerror=()=>i(null)}catch{i(null)}}):null}catch{return null}})}saveToIndexedDb(t,r){return N(this,null,function*(){if(this.idbPromise)try{let i=yield this.idbPromise;if(!i)return;i.transaction("audio_blobs","readwrite").objectStore("audio_blobs").put(r,t)}catch(i){console.warn("Failed to save audio to IndexedDB:",i)}})}stop(){if(this.currentAudioElement){try{this.currentAudioElement.pause(),this.currentAudioElement.removeAttribute("src"),this.currentAudioElement.load()}catch{}this.currentAudioElement=null}if(this.currentBlobUrl&&(URL.revokeObjectURL(this.currentBlobUrl),this.currentBlobUrl=null),this.currentAudioSource){try{this.currentAudioSource.stop(),this.currentAudioSource.disconnect()}catch{}this.currentAudioSource=null}this.isSpeakingSubject.next(!1),this.statusSubject.value==="speaking"&&this.statusSubject.next("ready")}pause(){this.currentAudioElement&&this.currentAudioElement.pause(),this.audioCtx&&this.audioCtx.state==="running"&&this.audioCtx.suspend()}resume(){this.currentAudioElement&&this.currentAudioElement.play().catch(()=>{}),this.audioCtx&&this.audioCtx.state==="suspended"&&this.audioCtx.resume()}playAudioBlob(t){return N(this,null,function*(){return this.stop(),new Promise((r,i)=>{try{let a=URL.createObjectURL(t);this.currentBlobUrl=a;let n=new Audio(a);this.currentAudioElement=n,n.onended=()=>{this.stop(),r()},n.onerror=()=>{console.warn("HTMLAudioElement error, falling back to AudioContext..."),this.playAudioContextFallback(t).then(r).catch(i)},this.isSpeakingSubject.next(!0),this.statusSubject.next("speaking"),n.play().catch(s=>{console.warn("Audio play() failed or blocked, falling back to AudioContext:",s),this.playAudioContextFallback(t).then(r).catch(i)})}catch{this.playAudioContextFallback(t).then(r).catch(i)}})})}playAudioContextFallback(t){return N(this,null,function*(){let r=this.getOrCreateAudioContext();r.state==="suspended"&&(yield r.resume());let i=yield t.arrayBuffer(),a=yield r.decodeAudioData(i);return new Promise(n=>{let s=r.createBufferSource();s.buffer=a,s.connect(r.destination),s.onended=()=>{this.currentAudioSource===s&&(this.currentAudioSource=null,this.isSpeakingSubject.next(!1),this.statusSubject.next("ready")),n()},this.currentAudioSource=s,this.isSpeakingSubject.next(!0),this.statusSubject.next("speaking"),s.start(0)})})}getOrCreateAudioContext(){if(!this.audioCtx){let t=window.AudioContext||window.webkitAudioContext;this.audioCtx=new t}return this.audioCtx}setupWorker(){if(typeof Worker<"u")try{this.worker=new Worker(new URL("worker-LUMLTTIO.js",import.meta.url),{type:"module"}),this.worker.onmessage=({data:t})=>{this.handleWorkerMessage(t)},this.worker.onerror=t=>{console.error("TTS Worker Error:",t),this.errorSubject.next("TTS Worker encountered an error.")}}catch(t){console.warn("Could not spawn TTS Web Worker, falling back to main-thread inference:",t),this.worker=null}}handleWorkerMessage(t){if(t.type==="PROGRESS"){this.progressSubject.next(t.progress);return}let r=this.pendingRequests.get(t.id);r&&(this.pendingRequests.delete(t.id),t.type==="ERROR"?r.reject(new Error(t.error)):r.resolve(t))}sendWorkerRequest(t){return new Promise((r,i)=>{if(!this.worker){i(new Error("Worker is not available"));return}this.pendingRequests.set(t.id,{resolve:r,reject:i}),this.worker.postMessage(t)})}generateRequestId(){return`req_${Date.now()}_${Math.random().toString(36).substring(2,9)}`}static \u0275fac=function(r){return new(r||e)};static \u0275prov=Ht({token:e,factory:e.\u0275fac,providedIn:"root"})};export{tm as a};
