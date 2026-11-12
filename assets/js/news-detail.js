(async()=>{
 const root=document.getElementById("newsDetail");
 const s=window.sugar;
 const id=new URLSearchParams(location.search).get("id");
 try{
  const r=await fetch("data/news.json");
  if(!r.ok)throw new Error("news.json");
  const list=await r.json();
  const n=list.find(x=>x.id===id&&x.published!==false);
  if(!n){root.innerHTML='<div class="empty-state">指定されたお知らせが見つかりません。</div>';return}
  document.title=`${n.title} | sennin_sugar`;
  root.innerHTML=`${n.image?`<img class="detail-image" src="${s.esc(n.image)}" alt="">`:""}<p class="detail-meta">${s.esc(n.date.replaceAll("-","."))}</p><h1 class="detail-title">${s.esc(n.title)}</h1><div class="detail-body">${s.renderParagraphs(n.body||n.summary||"")}</div><a class="back-link" href="news.html">← お知らせ一覧へ</a>`;
 }catch(e){
  root.innerHTML='<div class="empty-state">Newsを読み込めませんでした。</div>';
 }
})();
