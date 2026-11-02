(() => {
  const grid=document.getElementById('archive-grid');
  const cards=[...document.querySelectorAll('.archive-card')];
  const tabs=[...document.querySelectorAll('[data-filter]')];
  const count=document.getElementById('archive-count');
  const empty=document.getElementById('archive-empty');
  const dialog=document.getElementById('photo-dialog');
  const image=document.getElementById('dialog-image');
  const title=document.getElementById('dialog-title');
  const category=document.getElementById('dialog-category');
  const tally=document.getElementById('dialog-count');
  let filtered=cards;
  let selected=0;
  let lastFocus=null;
  function filter(value){
    filtered=[];
    cards.forEach(card=>{
      const show=value==='All'||card.dataset.category===value;
      card.hidden=!show;
      if(show) filtered.push(card);
    });
    count.textContent=`${filtered.length} IMAGE${filtered.length===1?'':'S'}`;
    empty.hidden=filtered.length!==0;
    tabs.forEach(tab=>{
      const active=tab.dataset.filter===value;
      tab.classList.toggle('active',active);tab.setAttribute('aria-pressed',String(active));
    });
  }
  tabs.forEach(tab=>tab.addEventListener('click',()=>filter(tab.dataset.filter)));
  function show(index){
    if(!filtered.length)return;
    selected=(index+filtered.length)%filtered.length;
    const card=filtered[selected]; const img=card.querySelector('img');
    image.src=img.currentSrc||img.src;
    image.alt=img.alt;
    title.textContent=card.querySelector('.archive-card-title').textContent;
    category.textContent=card.dataset.category.toUpperCase();
    tally.textContent=`FRAME ${String(selected+1).padStart(2,'0')} / ${String(filtered.length).padStart(2,'0')}`;
  }
  cards.forEach(card=>card.addEventListener('click',()=>{
    lastFocus=card;show(filtered.indexOf(card));
    if(typeof dialog.showModal==='function')dialog.showModal();
  }));
  document.getElementById('dialog-close').addEventListener('click',()=>dialog.close());
  document.getElementById('dialog-prev').addEventListener('click',()=>show(selected-1));
  document.getElementById('dialog-next').addEventListener('click',()=>show(selected+1));
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{ image.removeAttribute('src');lastFocus?.focus();});
  document.addEventListener('keydown',e=>{
    if(!dialog.open)return;
    if(e.key==='ArrowLeft'){e.preventDefault();show(selected-1);}
    if(e.key==='ArrowRight'){e.preventDefault();show(selected+1);}
  });
  filter('All');
})();
