(()=>{
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* ---------- 共通ユーティリティ（他のページのJSからも使う） ---------- */
function esc(v=""){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toParagraphs(text){return String(text||"").replace(/\\n/g,"\n").split(/\r?\n\s*\r?\n/).map(s=>s.trim()).filter(Boolean)}
function renderParagraphs(text){return toParagraphs(text).map(t=>`<p>${esc(t).replace(/\n/g,"<br>")}</p>`).join("")}
function jobTags(j){return [
 j.employment&&`<span class="job-tag">${esc(j.employment)}</span>`,
 j.location&&`<span class="job-tag">${esc(j.location)}</span>`,
 j.status&&`<span class="job-tag${j.status==="募集中"?" open":""}">${esc(j.status)}</span>`
].filter(Boolean).join("")}

/* ---------- 背景・進捗バー ---------- */
document.body.insertAdjacentHTML("afterbegin",'<div class="ambient" aria-hidden="true"><span></span><span></span><span></span></div><div class="progress" id="progress" aria-hidden="true"></div>');

/* ---------- カーソル（PCのみ） ---------- */
const dot=$("#cursorDot");
if(dot&&fine&&!reduce){
 let mx=innerWidth/2,my=innerHeight/2,x=mx,y=my;
 addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY},{passive:true});
 (function loop(){x+=(mx-x)*.2;y+=(my-y)*.2;dot.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;requestAnimationFrame(loop)})();
 document.addEventListener("pointerover",e=>{if(e.target.closest("a,button,.developer-card,.job-card"))dot.classList.add("hovering")});
 document.addEventListener("pointerout",e=>{if(e.target.closest("a,button,.developer-card,.job-card"))dot.classList.remove("hovering")});
}

/* ---------- ヘッダー・進捗・パララックス（スクロール連動） ---------- */
const header=$("#header"),progress=$("#progress"),parallaxEls=$$("[data-parallax]");
let ticking=false;
function onScroll(){
 if(ticking)return;ticking=true;
 requestAnimationFrame(()=>{
  ticking=false;
  const y=scrollY;
  if(header)header.classList.toggle("scrolled",y>30);
  const max=document.documentElement.scrollHeight-innerHeight;
  if(progress)progress.style.transform=`scaleX(${max>0?(y/max).toFixed(4):0})`;
  if(!reduce)parallaxEls.forEach(el=>{
   const box=el.parentElement.getBoundingClientRect();
   if(box.bottom<0||box.top>innerHeight)return;
   const offset=(box.top+box.height/2-innerHeight/2)*-.03;
   el.style.transform=`translate3d(0,${offset.toFixed(1)}px,0) scale(1.2)`;
  });
 });
}
addEventListener("scroll",onScroll,{passive:true});
addEventListener("resize",onScroll);
onScroll();

/* ---------- メニュー（スマホ） ---------- */
const menuBtn=$("#menuBtn"),nav=$("#nav");
function closeMenu(){if(!nav||!menuBtn)return;nav.classList.remove("open");menuBtn.classList.remove("active");menuBtn.setAttribute("aria-expanded","false");menuBtn.setAttribute("aria-label","メニューを開く");document.body.classList.remove("menu-open")}
function openMenu(){if(!nav||!menuBtn)return;nav.classList.add("open");menuBtn.classList.add("active");menuBtn.setAttribute("aria-expanded","true");menuBtn.setAttribute("aria-label","メニューを閉じる");document.body.classList.add("menu-open")}
if(menuBtn&&nav){
 menuBtn.addEventListener("click",()=>nav.classList.contains("open")?closeMenu():openMenu());
 nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
 addEventListener("resize",()=>{if(innerWidth>850)closeMenu()});
}

/* ---------- 現在のページをナビで強調 ---------- */
const pageMap={"news-detail.html":"news.html","job-detail.html":"jobs.html","project-detail.html":"projects.html"};
const currentPage=pageMap[location.pathname.split("/").pop()]||location.pathname.split("/").pop()||"index.html";
$$(".nav a").forEach(a=>{if(a.getAttribute("href")===currentPage)a.setAttribute("aria-current","page")});

/* ---------- ヒーローのスライドショー ---------- */
const slides=$$(".hero-slide"),dots=$$(".hero-dot");let currentSlide=0,slideTimer;
function changeSlide(index){slides.forEach((s,i)=>s.classList.toggle("active",i===index));dots.forEach((d,i)=>d.classList.toggle("active",i===index));currentSlide=index}
function startSlideshow(){clearInterval(slideTimer);if(slides.length>1&&!reduce)slideTimer=setInterval(()=>changeSlide((currentSlide+1)%slides.length),6500)}
dots.forEach((d,i)=>d.addEventListener("click",()=>{changeSlide(i);startSlideshow()}));
startSlideshow();

/* ---------- スクロール表示（動的に追加した要素にも使える） ---------- */
function initReveal(root=document){
 const els=$$(".reveal:not(.visible)",root);
 if(!els.length)return;
 if(!("IntersectionObserver" in window)||reduce){els.forEach(e=>e.classList.add("visible"));return}
 const io=new IntersectionObserver((entries,obs)=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add("visible");obs.unobserve(en.target)}}),{threshold:.12,rootMargin:"0px 0px -40px 0px"});
 els.forEach(e=>io.observe(e));
}

/* ---------- カードの3Dチルト（PCのみ） ---------- */
function initTilt(root=document){
 if(!fine||reduce)return;
 $$(".developer-card,.job-card",root).forEach(el=>{
  if(el.dataset.tiltReady)return;
  el.dataset.tiltReady="1";
  el.addEventListener("pointermove",e=>{
   const r=el.getBoundingClientRect();
   const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
   el.style.transform=`perspective(1000px) rotateX(${((.5-py)*5).toFixed(2)}deg) rotateY(${((px-.5)*7).toFixed(2)}deg) translateY(-3px)`;
   el.style.setProperty("--mx",`${(px*100).toFixed(1)}%`);
   el.style.setProperty("--my",`${(py*100).toFixed(1)}%`);
  });
  el.addEventListener("pointerleave",()=>{el.style.transform=""});
 });
}

/* ---------- 磁石のように寄るボタン（PCのみ） ---------- */
function initMagnetic(){
 if(!fine||reduce)return;
 $$(".header-contact,.hero-link,.contact-mail").forEach(el=>{
  el.addEventListener("pointermove",e=>{
   const r=el.getBoundingClientRect();
   const x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);
   el.style.transform=`translate(${(x*.2).toFixed(1)}px,${(y*.3).toFixed(1)}px)`;
  });
  el.addEventListener("pointerleave",()=>{el.style.transform=""});
 });
}

/* ---------- ページ切り替えのフェード ---------- */
document.addEventListener("click",e=>{
 const a=e.target.closest("a[href]");
 if(!a||reduce||a.target||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const href=a.getAttribute("href");
 if(!href||href.startsWith("#")||a.origin!==location.origin)return;
 if(a.pathname===location.pathname&&a.search===location.search)return;
 e.preventDefault();
 document.body.classList.add("is-leaving");
 setTimeout(()=>{location.href=a.href},320);
});
addEventListener("pageshow",()=>document.body.classList.remove("is-leaving"));

/* ---------- 画像の読み込み失敗時は隠す ---------- */
$$("img").forEach(img=>img.addEventListener("error",()=>{img.style.visibility="hidden"}));

/* ---------- 同一ページ内リンクはなめらかに移動 ---------- */
$$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
 const id=a.getAttribute("href");
 if(!id||id==="#")return;
 const target=$(id);
 if(!target)return;
 e.preventDefault();
 target.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
}));

const motionPreference=matchMedia("(prefers-reduced-motion:reduce)");
motionPreference.addEventListener?.("change",()=>motionPreference.matches?clearInterval(slideTimer):startSlideshow());

initReveal();
initTilt();
initMagnetic();

window.sugar={esc,toParagraphs,renderParagraphs,jobTags,initReveal,initTilt,initMagnetic};
})();
