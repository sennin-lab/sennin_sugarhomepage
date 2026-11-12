async function loadHomeNews(){
 const box=document.getElementById("homeNews");if(!box)return;
 try{const response=await fetch("data/news.json");if(!response.ok)throw new Error("news.json could not be loaded");
 const items=await response.json();const latest=items.filter(x=>x.published!==false).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
 if(!latest.length){box.innerHTML='<div class="empty-state">現在お知らせはありません。</div>';return}
 box.innerHTML=latest.map(item=>`<a class="news-item" href="news-detail.html?id=${encodeURIComponent(item.id)}"><span class="news-date">${escapeHTML(item.date.replaceAll("-","."))}</span><div class="news-content"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary||"")}</p></div><span class="news-arrow">↗</span></a>`).join("");
 }catch(error){box.innerHTML='<div class="empty-state">Newsを読み込めませんでした。</div>'}
}
function escapeHTML(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
loadHomeNews();
