(async()=>{
 const box=document.getElementById("jobList");
 if(!box)return;
 const s=window.sugar;
 try{
  const r=await fetch("data/jobs.json");
  if(!r.ok)throw new Error("jobs.json");
  const list=(await r.json())
   .filter(j=>j.published!==false)
   .sort((a,b)=>String(b.posted||"").localeCompare(String(a.posted||"")));
  if(!list.length){box.innerHTML='<div class="empty-state">現在募集中の求人はありません。</div>';return}
  box.innerHTML=list.map(j=>`<div class="reveal"><a class="job-card" href="job-detail.html?id=${encodeURIComponent(j.id)}"><div class="job-main"><div class="job-tags">${s.jobTags(j)}</div><h2>${s.esc(j.title)}</h2><p>${s.esc(j.summary||"")}</p></div><span class="job-arrow" aria-hidden="true">→</span></a></div>`).join("");
  s.initReveal(box);
  s.initTilt(box);
 }catch(e){
  box.innerHTML='<div class="empty-state">求人情報を読み込めませんでした。</div>';
 }
})();
