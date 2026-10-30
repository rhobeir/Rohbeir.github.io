// ROHBEIR V9 — independently animated botanical engraving.
// Each flower is a constructed SVG system: individual hand-contoured petals, veins,
// a bud and an attached vine. Exit vectors are exclusively UP, LEFT or RIGHT.
(() => {
  'use strict';
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const intro=document.querySelector('#garden-intro');
  const svg=document.querySelector('#garden-svg');
  const layer=document.querySelector('#garden-flower-systems');
  const word=document.querySelector('#garden-wordmark');
  const surface=document.querySelector('#garden-surface');
  const cue=document.querySelector('#garden-scrollcue');
  const edition=document.querySelector('.garden-edition');
  const progress=document.querySelector('#garden-progress-fill');
  if(!intro || !svg || !layer) return;
  const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
  const smooth=t=>{t=clamp(t);return t*t*(3-2*t)};
  const phase=(p,a,b)=>smooth((p-a)/(b-a));
  const mix=(a,b,t)=>a+(b-a)*t;
  const rad=Math.PI/180;
  const create=(tag,attrs={},parent)=>{
    const node=document.createElementNS(SVG_NS,tag);
    for(const [k,v] of Object.entries(attrs))node.setAttribute(k,String(v));
    if(parent) parent.appendChild(node);
    return node;
  };
  // Seeded randomness keeps the collage stable when resized and scrolled backward.
  let seed=8643201;
  const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296};
  const between=(a,b)=>a+(b-a)*random();
  const centers=[];
  // Deliberate art direction: flowers overlap their neighbours and bleed past the frame.
  for(let row=0;row<5;row++){
    for(let col=0;col<6;col++){
      const x=-110+col*290+(row%2)*127+between(-36,36);
      const y=-115+row*267+between(-42,42);
      const scale=between(.91,1.30)*(row===2?1.05:1);
      const exitType= ((row*11+col*7)%5===0)?'up':((col+row)%2===0?'left':'right');
      centers.push({x,y,scale,exitType,id:centers.length,offset:between(.0,.07),rotation:between(-20,20)});
    }
  }
  // Variation in the flowers' petal contours is integral to avoiding cartoon symmetry.
  function petalPath(i,n,variation){
    const width=variation.width, length=variation.length;
    const d=variation.notch;
    return [
      'M -11 -5',
      `C ${-26-width*.12} ${-36} ${-width*.90} ${-72} ${-width*.86} ${-length*.65}`,
      `C ${-width*1.16} ${-length*.83} ${-width*.82} ${-length*1.02} ${-width*.40} ${-length*.98}`,
      `C ${-width*.16} ${-length*1.07} ${-width*.05} ${-length*(.98-d)} 0 ${-length}`,
      `C ${width*.26} ${-length*1.055} ${width*.58} ${-length*.99} ${width*.84} ${-length*.93}`,
      `C ${width*1.15} ${-length*.77} ${width*.75} ${-length*.40} 11 -5 Z`
    ].join(' ');
  }
  const flowers=[];
  centers.forEach((item,fi)=>{
    const outer=create('g',{class:'flower-system','data-flower':fi},layer);
    const vineG=create('g',{class:'vine-group'},outer);
    // Vines extend from the flower toward the edge that will pull it away.
    const direction=item.exitType==='left'?-1:item.exitType==='right'?1:0;
    const rise=item.exitType==='up'?-1:0;
    const vx=direction*between(450,680),vy=rise*between(550,790)-(direction?between(40,125):0);
    const vinePath=`M 0 0 C ${vx*.13+between(-40,40)} ${vy*.22+between(35,100)} ${vx*.65} ${vy*.62} ${vx} ${vy}`;
    create('path',{d:vinePath,class:'vine-stroke'},vineG);
    create('path',{d:`M 2 2 C ${vx*.16+8} ${vy*.22+31} ${vx*.65+10} ${vy*.62+11} ${vx+9} ${vy+5}`,class:'vine-echo'},vineG);
    for(let leaf=0;leaf<3;leaf++){
      const t=.25+leaf*.19;
      const lx=vx*t,ly=vy*t;
      const a=(direction? (direction===1?45:-45) : -90)+(leaf%2?58:-56);
      const lg=create('g',{transform:`translate(${lx} ${ly}) rotate(${a})`},vineG);
      create('path',{d:'M 0 0 C 11 -18 34 -31 73 -31 C 65 4 27 17 0 0 Z',fill:'#c94e10',stroke:'#ffe8ce','stroke-width':'1.25'},lg);
      create('path',{d:'M 1 0 Q 39 -11 72 -31',class:'vine-echo'},lg);
      for(let v=0;v<4;v++)create('path',{d:`M ${11+v*11} ${-3-v*3} l ${10+v*3} ${-9}`,class:'vine-echo'},lg);
    }
    const petalLayer=create('g',{class:'flower-petals'},outer);
    const budLayer=create('g',{class:'flower-bud'},outer);
    const petals=[];
    const count=fi%4===0?10:fi%3===0?9:8;
    const angles=Array.from({length:count},(_,i)=>i*360/count);
    // Back petals first, then the foreground radial layers; each one its own transform.
    for(let j=0;j<count;j++){
      const angle=angles[j]+between(-12,12)+item.rotation;
      const variation={width:between(68,96),length:between(180,248),notch:between(.005,.05)};
      const path=petalPath(j,count,variation);
      const group=create('g',{class:'petal'},petalLayer);
      const angleG=create('g',{transform:`rotate(${angle})`},group);
      const petalId=`petal-clip-${fi}-${j}`;
      const clip=create('clipPath',{id:petalId},document.querySelector('#garden-definitions'));
      create('path',{d:path},clip);
      create('path',{d:path,fill:(j+fi)%3===0?'url(#petal-ink-2)':'url(#petal-ink)',class:'petal-outline'},angleG);
      const engrave=create('g',{'clip-path':`url(#${petalId})`},angleG);
      // Fine curved veins, engraving lines, and secondary feathering all follow a petal.
      for(let line=0;line<21;line++){
        const k=(line-10)/10;
        const y0=-between(9,24);
        const tip=-variation.length*between(.76,.97);
        const xTip=k*variation.width*.83;
        const d=`M ${k*3} ${y0} C ${k*21} ${-variation.length*.28} ${xTip*.86-k*9} ${-variation.length*.60} ${xTip} ${tip}`;
        create('path',{d,class:line%3===0?'petal-engraving':'petal-micro'},engrave);
      }
      for(let v=0;v<12;v++){
        const x=between(-variation.width*.75,variation.width*.75);
        const y=-between(variation.length*.49,variation.length*.92);
        create('path',{d:`M ${x.toFixed(1)} ${y.toFixed(1)} q ${between(-7,7).toFixed(1)} -${between(9,19).toFixed(1)} ${between(-10,10).toFixed(1)} -${between(14,31).toFixed(1)}`,class:'petal-micro'},engrave);
      }
      create('path',{d:`M -12 -9 Q ${-between(10,30)} ${-variation.length*.54} ${-variation.width*.22} ${-variation.length*.93}`,class:'petal-engraving'},engrave);
      create('path',{d:`M 10 -9 Q ${between(10,29)} ${-variation.length*.54} ${variation.width*.24} ${-variation.length*.94}`,class:'petal-engraving'},engrave);
      petals.push({group,angle,lag:between(0,.20),twist:between(-24,24),sc:between(.025,.085)});
    }
    // Bud is never a cartoon circle: sepals, tapered body, and engraved ridge marks.
    create('path',{d:'M -25 11 C -36 -2 -29 -34 -15 -50 Q -5 -61 0 -68 Q 12 -57 22 -42 C 39 -18 29 9 18 14 Q 0 22 -25 11 Z',fill:'#bb420c',stroke:'#fff0d6','stroke-width':'1.6'},budLayer);
    create('path',{d:'M -22 8 C -22 -21 -8 -47 0 -67 C 3 -33 2 -9 -2 15',class:'bud-mark'},budLayer);
    create('path',{d:'M 19 11 Q 10 -25 0 -67 M -10 16 Q -1 -20 0 -67',class:'bud-mark'},budLayer);
    for(let q=-2;q<=2;q++)create('path',{d:`M ${q*6} -5 Q ${q*4} -25 0 -64`,class:'bud-mark',opacity:'.48'},budLayer);
    create('path',{d:'M -14 11 Q -1 28 15 13 M -7 14 L -19 28 M 9 15 L 22 27',fill:'none',stroke:'#ffeed9','stroke-width':'1.4'},budLayer);
    // The center is present even before contraction, but revealed more as petals close.
    flowers.push({outer,petals,vineG,budLayer,...item});
  });
  let requested=false;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  function render(){
    requested=false;
    if(reduce.matches){
      word.style.opacity='1';
      svg.style.opacity='1';
      return;
    }
    const range=Math.max(1,intro.offsetHeight-innerHeight);
    const p=clamp(-intro.getBoundingClientRect().top/range);
    // Wordmark leaves first, while the complete garden remains still.
    const title=phase(p,.08,.25);
    word.style.transform=`translate(-50%,calc(-50% - ${title*125}vh))`;
    word.style.opacity=(1-phase(p,.15,.27)).toFixed(3);
    cue.style.opacity=(1-phase(p,.02,.16)).toFixed(3);
    edition.style.opacity=(1-phase(p,.12,.31)).toFixed(3);
    progress.style.transform=`scaleX(${p})`;
    const retreat=phase(p,.29,.68);
    const disappear=phase(p,.63,.96);
    for(const f of flowers){
      const localFold=phase(retreat, f.offset*.48, .82+f.offset*.6);
      const localExit=phase(disappear,.06+f.offset*.30,.83+f.offset*.2);
      // Garden rotates just enough to suggest a vine tug. No positive Y ever used.
      const pullX=f.exitType==='left'?-2200:f.exitType==='right'?2200:0;
      const pullY=f.exitType==='up'?-1700:-betweenStatic(f.id,32,115);
      const dx=pullX*localExit,dy=pullY*localExit;
      const tug=(f.exitType==='left'?-7:f.exitType==='right'?7:0)*localExit;
      f.outer.setAttribute('transform',`translate(${(f.x+dx).toFixed(1)} ${(f.y+dy).toFixed(1)}) rotate(${tug.toFixed(2)}) scale(${f.scale.toFixed(3)})`);
      f.vineG.setAttribute('opacity',`${(.01+.99*phase(localFold,.17,.76))*(1-localExit*.13)}`);
      for(const pe of f.petals){
        const fold=phase(localFold,pe.lag,.85+pe.lag*.18);
        // Shrink length into bud while petals wrap inward at slightly different rates.
        const sy=mix(1,pe.sc,fold),sx=mix(1,.12,fold);
        const counter=pe.twist*fold;
        pe.group.setAttribute('transform',`rotate(${counter.toFixed(2)}) translate(0 ${(-17*fold).toFixed(1)}) scale(${sx.toFixed(3)} ${sy.toFixed(3)})`);
        pe.group.setAttribute('opacity',`${1-phase(fold,.82,1)*.98}`);
      }
      f.budLayer.setAttribute('opacity',String(.64+.36*localFold));
    }
    // Expose the paper-coloured portfolio underneath only after flowers withdraw.
    const finish=phase(p,.85,1);
    svg.style.opacity=String(1-finish);
    surface.style.opacity=String(1-finish);
  }
  function betweenStatic(i,min,max){return min+((i*13)%11)/10*(max-min)}
  function request(){if(!requested){requested=true;requestAnimationFrame(render)}}
  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',request,{passive:true});
  reduce.addEventListener?.('change',request);
  render();
})();
// Existing site's menu and scroll reveals.
(() => {
 const menu=document.querySelector('.menu'),panel=document.querySelector('.menu-panel');
 if(menu && panel){
  menu.addEventListener('click',()=>{const active=panel.classList.toggle('open');menu.setAttribute('aria-expanded',String(active));menu.setAttribute('aria-label',active?'Close menu':'Open menu')});
  panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>panel.classList.remove('open')));
 }
 const observer=('IntersectionObserver' in window)?new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');observer.unobserve(e.target)}}),{threshold:.06}):null;
 if(observer){document.querySelectorAll('.work-card,.work-head,.about-grid,.contact h2').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}
})();
