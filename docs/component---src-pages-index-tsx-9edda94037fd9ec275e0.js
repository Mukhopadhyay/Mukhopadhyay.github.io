"use strict";(self.webpackChunkPranesh_M_s_Portfolio=self.webpackChunkPranesh_M_s_Portfolio||[]).push([[691],{7214:function(e,t,r){r.r(t),r.d(t,{Head:function(){return d},default:function(){return u}});var n=r(7294);function a(e){let{className:t="",quantity:r=30,staticity:a=50,ease:c=50,refresh:s=!1}=e;const i=(0,n.useRef)(null),o=(0,n.useRef)(null),l=(0,n.useRef)(null),u=(0,n.useRef)([]),d=function(){const{0:e,1:t}=(0,n.useState)({x:0,y:0});return(0,n.useEffect)((()=>{const e=e=>{t({x:e.clientX,y:e.clientY})};return window.addEventListener("mousemove",e),()=>{window.removeEventListener("mousemove",e)}}),[]),e}(),h=(0,n.useRef)({x:0,y:0}),m=(0,n.useRef)({w:0,h:0}),f="undefined"!=typeof window?window.devicePixelRatio:1;(0,n.useEffect)((()=>(i.current&&(l.current=i.current.getContext("2d")),x(),b(),window.addEventListener("resize",x),()=>{window.removeEventListener("resize",x)})),[]),(0,n.useEffect)((()=>{w()}),[d.x,d.y]),(0,n.useEffect)((()=>{x()}),[s]);const x=()=>{p(),g()},w=()=>{if(i.current){const e=i.current.getBoundingClientRect(),{w:t,h:r}=m.current,n=d.x-e.left-t/2,a=d.y-e.top-r/2;n<t/2&&n>-t/2&&a<r/2&&a>-r/2&&(h.current.x=n,h.current.y=a)}},p=()=>{o.current&&i.current&&l.current&&(u.current.length=0,m.current.w=o.current.offsetWidth,m.current.h=o.current.offsetHeight,i.current.width=m.current.w*f,i.current.height=m.current.h*f,i.current.style.width=`${m.current.w}px`,i.current.style.height=`${m.current.h}px`,l.current.scale(f,f))},z=()=>({x:Math.floor(Math.random()*m.current.w),y:Math.floor(Math.random()*m.current.h),translateX:0,translateY:0,size:100,alpha:0,targetAlpha:parseFloat((.6*Math.random()+.1).toFixed(1)),dx:.2*(Math.random()-.5),dy:.2*(Math.random()-.5),magnetism:.1+4*Math.random()}),y=function(e,t){if(void 0===t&&(t=!1),l.current){const{x:r,y:n,translateX:a,translateY:c,size:s,alpha:i}=e;l.current.translate(a,c),l.current.beginPath(),l.current.arc(r,n,s,0,2*Math.PI),l.current.fillStyle=`rgba(255, 255, 255, ${i})`,l.current.fill(),l.current.setTransform(f,0,0,f,0,0),t||u.current.push(e)}},v=()=>{l.current&&l.current.clearRect(0,0,m.current.w,m.current.h)},g=()=>{v();const e=r;for(let t=0;t<e;t++){const e=z();y(e)}},b=()=>{v(),u.current.forEach(((e,t)=>{const r=[e.x+e.translateX-e.size,m.current.w-e.x-e.translateX-e.size,e.y+e.translateY-e.size,m.current.h-e.y-e.translateY-e.size].reduce(((e,t)=>Math.min(e,t))),n=parseFloat(((e,t,r,n,a)=>{const c=(e-t)*(a-n)/(r-t)+n;return c>0?c:0})(r,0,20,0,1).toFixed(2));if(n>1?(e.alpha+=.02,e.alpha>e.targetAlpha&&(e.alpha=e.targetAlpha)):e.alpha=e.targetAlpha*n,e.x+=e.dx,e.y+=e.dy,e.translateX+=(h.current.x/(a/e.magnetism)-e.translateX)/c,e.translateY+=(h.current.y/(a/e.magnetism)-e.translateY)/c,e.x<-e.size||e.x>m.current.w+e.size||e.y<-e.size||e.y>m.current.h+e.size){u.current.splice(t,1);const e=z();y(e)}else y({...e,x:e.x,y:e.y,translateX:e.translateX,translateY:e.translateY,alpha:e.alpha},!0)})),window.requestAnimationFrame(b)};return n.createElement("div",{className:t,ref:o,"aria-hidden":"true"},n.createElement("canvas",{ref:i}))}var c=r(4778),s=r(9162),i=r(6953),o=r.p+"static/Pranesh-Mukhopadhyay-resume-c5aff02ef883995882be90ed583bb651.pdf";const l=[{name:"Projects",href:"/projects"},{name:"Datasets",href:"/datasets"},{name:"Contact",href:"/contacts"}];var u=()=>n.createElement("div",{className:"flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"},n.createElement("nav",{className:"my-16"},n.createElement("ul",{className:"flex flex-wrap items-center justify-center gap-4"},l.map((e=>n.createElement("a",{key:e.href,href:e.href,className:"text-sm duration-500 text-zinc-500 hover:text-zinc-300"},e.name))))),n.createElement("div",{className:"hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"}),n.createElement(a,{className:"absolute inset-0 -z-10 animate-fade-in",quantity:100}),n.createElement("h1",{className:"z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text "},"@Mukhopadhyay"),n.createElement("div",{className:"hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"}),n.createElement("div",{className:"my-16 text-center animate-fade-in"},n.createElement("h2",{className:"text-sm text-zinc-500 mx-6"},"Hi, my name is Pranesh Mukhopadhyay, I'm a Data Scientist from Mumbai."),n.createElement("div",{className:"mt-10"},n.createElement("a",{href:o,className:"text-zinc-200 font-bold p-4 border-[1px] border-zinc-200 duration-1000 hover:text-white hover:border-white rounded-full",download:!0},"Resume"))),n.createElement("div",{className:"flex flex-row "},n.createElement("span",{className:"relative mx-5 z-[100] flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 hover:text-white hover:bg-zinc-900 border-zinc-500 bg-zinc-900 hover:border-zinc-200 drop-shadow-orange"},n.createElement(c.Z,{size:20})),n.createElement("span",{className:"relative mx-5 z-[100] flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 hover:text-white hover:bg-zinc-900 border-zinc-500 bg-zinc-900 hover:border-zinc-200 drop-shadow-orange"},n.createElement(s.Z,{size:20})),n.createElement("span",{className:"relative mx-5 z-[100] flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 hover:text-white hover:bg-zinc-900 border-zinc-500 bg-zinc-900 hover:border-zinc-200 drop-shadow-orange"},n.createElement(i.Z,{size:20}))));const d=()=>n.createElement("title",null,"Pranesh M.")},6472:function(e,t,r){r.d(t,{Z:function(){return c}});var n=r(7294),a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const c=(e,t)=>{const r=(0,n.forwardRef)((({color:r="currentColor",size:c=24,strokeWidth:s=2,absoluteStrokeWidth:i,children:o,...l},u)=>{return(0,n.createElement)("svg",{ref:u,...a,width:c,height:c,stroke:r,strokeWidth:i?24*Number(s)/Number(c):s,className:`lucide lucide-${d=e,d.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,...l},[...t.map((([e,t])=>(0,n.createElement)(e,t))),...(Array.isArray(o)?o:[o])||[]]);var d}));return r.displayName=`${e}`,r}},9162:function(e,t,r){r.d(t,{Z:function(){return n}});const n=(0,r(6472).Z)("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]])},6953:function(e,t,r){r.d(t,{Z:function(){return n}});const n=(0,r(6472).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},4778:function(e,t,r){r.d(t,{Z:function(){return n}});const n=(0,r(6472).Z)("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]])}}]);
//# sourceMappingURL=component---src-pages-index-tsx-9edda94037fd9ec275e0.js.map