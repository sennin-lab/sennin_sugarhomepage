const cursorDot=document.getElementById("cursorDot");
if(cursorDot&&window.matchMedia("(hover:hover) and (pointer:fine)").matches){
 let mouseX=0,mouseY=0,dotX=0,dotY=0;
 window.addEventListener("mousemove",e=>{mouseX=e.clientX;mouseY=e.clientY},{passive:true});
 function animateCursor(){dotX+=(mouseX-dotX)*.2;dotY+=(mouseY-dotY)*.2;cursorDot.style.left=`${dotX}px`;cursorDot.style.top=`${dotY}px`;requestAnimationFrame(animateCursor)}
 animateCursor();
 document.querySelectorAll("a,button").forEach(el=>{el.addEventListener("mouseenter",()=>cursorDot.classList.add("hovering"));el.addEventListener("mouseleave",()=>cursorDot.classList.remove("hovering"))});
}
const header=document.getElementById("header");
function updateHeader(){if(header)header.classList.toggle("scrolled",window.scrollY>30)}
window.addEventListener("scroll",updateHeader,{passive:true});updateHeader();
const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("nav");
function closeMenu(){if(!nav||!menuBtn)return;nav.classList.remove("open");menuBtn.classList.remove("active");menuBtn.setAttribute("aria-expanded","false");menuBtn.setAttribute("aria-label","メニューを開く");document.body.classList.remove("menu-open")}
function openMenu(){if(!nav||!menuBtn)return;nav.classList.add("open");menuBtn.classList.add("active");menuBtn.setAttribute("aria-expanded","true");menuBtn.setAttribute("aria-label","メニューを閉じる");document.body.classList.add("menu-open")}
if(menuBtn&&nav){menuBtn.addEventListener("click",()=>nav.classList.contains("open")?closeMenu():openMenu());nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});window.addEventListener("resize",()=>{if(innerWidth>850)closeMenu()})}
document.querySelectorAll('a[href="#contact"]').forEach(a=>a.addEventListener("click",closeMenu));
const slides=[...document.querySelectorAll(".hero-slide")],dots=[...document.querySelectorAll(".hero-dot")];let currentSlide=0,slideTimer;
function changeSlide(index){slides.forEach((s,i)=>s.classList.toggle("active",i===index));dots.forEach((d,i)=>d.classList.toggle("active",i===index));currentSlide=index}
function startSlideshow(){clearInterval(slideTimer);if(slides.length>1&&!matchMedia("(prefers-reduced-motion:reduce)").matches)slideTimer=setInterval(()=>changeSlide((currentSlide+1)%slides.length),6500)}
dots.forEach((d,i)=>d.addEventListener("click",()=>{changeSlide(i);startSlideshow()}));startSlideshow();
const revealElements=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -25px 0px"});revealElements.forEach(el=>observer.observe(el))}
else revealElements.forEach(el=>el.classList.add("visible"));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const id=a.getAttribute("href");if(!id||id==="#")return;const target=document.querySelector(id);if(!target)return;e.preventDefault();target.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth",block:"start"})}));
document.querySelectorAll("img").forEach(img=>img.addEventListener("error",()=>{img.style.visibility="hidden"}));
const motionPreference=matchMedia("(prefers-reduced-motion:reduce)");motionPreference.addEventListener?.("change",()=>motionPreference.matches?clearInterval(slideTimer):startSlideshow());
