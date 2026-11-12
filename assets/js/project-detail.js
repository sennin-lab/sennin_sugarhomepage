(async()=>{
 const root=document.getElementById("projectDetail");
 const s=window.sugar;
 const id=new URLSearchParams(location.search).get("id");
 try{
  const r=await fetch("data/projects.json");
  if(!r.ok)throw new Error("projects.json");
  const list=await r.json();
  const p=list.find(x=>x.id===id&&x.published!==false);
  if(!p){root.innerHTML='<div class="empty-state">指定されたプロジェクトが見つかりません。</div>';return}
  document.title=`${p.title} | sennin_sugar`;
  root.innerHTML=`${p.image?`<img class="detail-image" src="${s.esc(p.image)}" alt="${s.esc(p.title)}">`:""}<p class="detail-meta">${s.esc(p.category||"PROJECT")}</p><h1 class="detail-title">${s.esc(p.title)}</h1><div class="detail-body">${s.renderParagraphs(p.body||p.summary||"")}</div>${p.url?`<a class="text-link" href="${s.esc(p.url)}" target="_blank" rel="noopener noreferrer">プロジェクトを見る <span>↗</span></a>`:""}<br><a class="back-link" href="projects.html">← Projects一覧へ戻る</a>`;
 }catch(e){
  root.innerHTML='<div class="empty-state">プロジェクトを読み込めませんでした。</div>';
 }
})();
