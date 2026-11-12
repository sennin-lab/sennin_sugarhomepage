(async()=>{
 const root=document.getElementById("newsList");
 if(!root)return;
 const s=window.sugar;
 try{
  const r=await fetch("data/news.json");
  if(!r.ok)throw new Error("news.json");
  const list=(await r.json()).filter(n=>n.published!==false).sort((a,b)=>b.date.localeCompare(a.date));
  if(!list.length){root.innerHTML='<div class="empty-state">現在お知らせはありません。</div>';return}
  root.innerHTML=list.map(n=>`<a class="news-item reveal" href="news-detail.html?id=${encodeURIComponent(n.id)}"><span class="news-date">${s.esc(n.date.replaceAll("-","."))}</span><div class="news-content"><h3>${s.esc(n.title)}</h3><p>${s.esc(n.summary||"")}</p></div><span class="news-arrow" aria-hidden="true">↗</span></a>`).join("");
  s.initReveal(root);
 }catch(e){
  root.innerHTML='<div class="empty-state">Newsを読み込めませんでした。</div>';
 }
})();
