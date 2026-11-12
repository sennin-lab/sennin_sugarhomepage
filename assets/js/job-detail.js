(async()=>{
 const root=document.getElementById("jobDetail");
 const s=window.sugar;
 const id=new URLSearchParams(location.search).get("id");
 try{
  const r=await fetch("data/jobs.json");
  if(!r.ok)throw new Error("jobs.json");
  const list=await r.json();
  const j=list.find(x=>x.id===id&&x.published!==false);
  if(!j){root.innerHTML='<div class="empty-state">指定された求人が見つかりません。</div>';return}
  document.title=`${j.title} | sennin_sugar`;
  const reqs=Array.isArray(j.requirements)?j.requirements.filter(Boolean):[];
  const subject=encodeURIComponent(`【応募】${j.title}`);
  root.innerHTML=`<div class="job-tags">${s.jobTags(j)}</div>
<h1 class="detail-title" style="margin-top:22px">${s.esc(j.title)}</h1>
${j.summary?`<p class="detail-lead">${s.esc(j.summary)}</p>`:""}
${j.body?`<div class="detail-body">${s.renderParagraphs(j.body)}</div>`:""}
${reqs.length?`<h2 class="detail-sub">応募条件</h2><ul class="requirements">${reqs.map(x=>`<li>${s.esc(x)}</li>`).join("")}</ul>`:""}
<div class="apply-box"><a class="contact-mail magnetic" href="mailto:xianrensugar@ganil.com?subject=${subject}">この求人に応募する <span>↗</span></a></div>
<a class="back-link" href="jobs.html">← Jobs一覧へ戻る</a>`;
  s.initReveal(root);
  s.initMagnetic();
 }catch(e){
  root.innerHTML='<div class="empty-state">求人情報を読み込めませんでした。</div>';
 }
})();
