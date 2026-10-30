// ROHBEIR V11 — more dimensional flowers and continuous one-pass scroll timing.
(() => {
  'use strict';
  const SVG_NS='http://www.w3.org/2000/svg';
  const intro=document.querySelector('#garden-intro');
  const svg=document.querySelector('#garden-svg');
  const defs=document.querySelector('#garden-definitions');
  const layer=document.querySelector('#garden-flower-systems');
  const word=document.querySelector('#garden-wordmark');
  const surface=document.querySelector('#garden-surface');
  const cue=document.querySelector('#garden-scrollcue');
  const edition=document.querySelector('.garden-edition');
  const progress=document.querySelector('#garden-progress-fill');
  if(!intro || !svg || !defs || !layer) return;

  const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
  const smooth=t=>{t=clamp(t);return t*t*(3-2*t)};
  const phase=(p,a,b)=>smooth((p-a)/(b-a));
  const mix=(a,b,t)=>a+(b-a)*t;
  const create=(tag,attrs={},parent)=>{ const el=document.createElementNS(SVG_NS,tag); for(const [k,v] of Object.entries(attrs)) el.setAttribute(k,String(v)); if(parent) parent.appendChild(el); return el; };
  let seed=11820931;
  const rnd=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
  const rand=(a,b)=>a+(b-a)*rnd();
  const pick=(arr)=>arr[Math.floor(rnd()*arr.length)];

  // Filters and gradients for more dimensional petals.
  create('linearGradient',{id:'petal-fill-a',x1:'0.15',y1:'1',x2:'0.85',y2:'0.05'},defs).innerHTML='<stop offset="0" stop-color="#b73e09"/><stop offset=".44" stop-color="#d04d0d"/><stop offset=".76" stop-color="#eb6c18"/><stop offset="1" stop-color="#ff9b55"/>';
  create('linearGradient',{id:'petal-fill-b',x1:'0',y1:'1',x2:'0.55',y2:'0'},defs).innerHTML='<stop offset="0" stop-color="#a93606"/><stop offset=".48" stop-color="#cb470c"/><stop offset=".78" stop-color="#e86d1a"/><stop offset="1" stop-color="#f9a168"/>';
  create('linearGradient',{id:'petal-fill-c',x1:'0',y1:'0.9',x2:'1',y2:'0.12'},defs).innerHTML='<stop offset="0" stop-color="#c6460d"/><stop offset=".45" stop-color="#df5a15"/><stop offset=".76" stop-color="#ee7a2c"/><stop offset="1" stop-color="#ffb07a"/>';
  create('radialGradient',{id:'bud-fill',cx:'45%',cy:'28%',r:'78%'},defs).innerHTML='<stop offset="0" stop-color="#ff9b58" stop-opacity=".95"/><stop offset=".38" stop-color="#d75a17"/><stop offset="1" stop-color="#a93606"/>';
  const pf=create('filter',{id:'petal-shadow-filter',x:'-30%',y:'-30%',width:'160%',height:'180%'},defs); create('feDropShadow',{dx:'0',dy:'7',stdDeviation:'6',floodColor:'#903004','flood-opacity':'.18'},pf);
  const bf=create('filter',{id:'bud-shadow-filter',x:'-30%',y:'-30%',width:'160%',height:'180%'},defs); create('feDropShadow',{dx:'0',dy:'5',stdDeviation:'5',floodColor:'#822c05','flood-opacity':'.22'},bf);

  const archetypes=[
    {name:'crown-wide', angles:[-112,-74,-39,-8,26,63,103,146,183], widths:[84,88,92,95,90,84,77,72,64], lengths:[198,220,236,244,232,213,205,196,188], tilt:-8},
    {name:'cup-left', angles:[-160,-124,-92,-52,-14,24,62,104], widths:[72,81,94,102,98,86,70,62], lengths:[170,194,224,242,230,208,182,165], tilt:-28},
    {name:'cup-right', angles:[-28,8,44,82,124,160,198,232], widths:[64,75,89,101,97,83,72,63], lengths:[167,181,212,241,226,203,179,160], tilt:22},
    {name:'windblown-up', angles:[-136,-96,-60,-18,22,66,111,158], widths:[64,78,88,100,96,87,75,62], lengths:[202,214,234,254,228,210,197,180], tilt:-6},
    {name:'anemone-side', angles:[-176,-142,-107,-70,-36,3,48,91,130], widths:[62,72,84,93,100,95,82,69,58], lengths:[180,191,205,221,232,220,200,182,168], tilt:37},
    {name:'ruffled-open', angles:[-154,-118,-82,-43,-2,36,75,118,160,201], widths:[76,79,84,94,105,98,92,81,72,62], lengths:[190,198,208,224,238,229,221,205,190,178], tilt:10},
    {name:'small-burst', angles:[-126,-84,-42,0,43,87,136], widths:[58,63,71,80,72,64,56], lengths:[150,162,176,186,172,161,148], tilt:-18}
  ];
  const placements=[
    {x:-130,y:-80,s:1.28,t:'ruffled-open',rot:7,exit:'left'},{x:130,y:-60,s:1.18,t:'cup-left',rot:-22,exit:'up-left'},{x:406,y:-90,s:1.31,t:'windblown-up',rot:10,exit:'up-right'},{x:690,y:-78,s:1.22,t:'crown-wide',rot:-4,exit:'up'},{x:980,y:-68,s:1.18,t:'cup-right',rot:16,exit:'right'},{x:1270,y:-84,s:1.24,t:'anemone-side',rot:26,exit:'up-right'},{x:1490,y:-30,s:1.08,t:'small-burst',rot:-20,exit:'right'},
    {x:-180,y:188,s:1.22,t:'windblown-up',rot:-16,exit:'left'},{x:85,y:210,s:1.02,t:'small-burst',rot:18,exit:'up-left'},{x:312,y:172,s:1.26,t:'ruffled-open',rot:-12,exit:'up'},{x:602,y:214,s:1.08,t:'anemone-side',rot:28,exit:'up-right'},{x:850,y:166,s:1.2,t:'crown-wide',rot:8,exit:'right'},{x:1108,y:208,s:1.15,t:'cup-right',rot:-15,exit:'up'},{x:1382,y:196,s:1.3,t:'ruffled-open',rot:12,exit:'right'},
    {x:-96,y:436,s:1.1,t:'small-burst',rot:-8,exit:'left'},{x:206,y:418,s:1.24,t:'crown-wide',rot:2,exit:'up-left'},{x:468,y:398,s:1.14,t:'cup-left',rot:-30,exit:'up'},{x:738,y:442,s:1.3,t:'ruffled-open',rot:6,exit:'up-right'},{x:1020,y:386,s:1.17,t:'windblown-up',rot:-8,exit:'right'},{x:1288,y:434,s:1.15,t:'anemone-side',rot:18,exit:'up-right'},
    {x:40,y:690,s:1.22,t:'cup-right',rot:12,exit:'left'},{x:358,y:650,s:1.09,t:'small-burst',rot:-12,exit:'up-left'},{x:618,y:724,s:1.26,t:'crown-wide',rot:0,exit:'up'},{x:934,y:662,s:1.12,t:'cup-left',rot:-18,exit:'up-right'},{x:1226,y:724,s:1.28,t:'ruffled-open',rot:15,exit:'right'},{x:1498,y:676,s:1.05,t:'small-burst',rot:-10,exit:'right'}
  ];

  function petalPath(w,l,ruffle,tipPull){
    return [
      'M 0 0',
      `C ${(-w*0.12).toFixed(1)} ${(-l*0.08).toFixed(1)} ${(-w*0.86).toFixed(1)} ${(-l*0.28).toFixed(1)} ${(-w*0.92).toFixed(1)} ${(-l*0.58).toFixed(1)}`,
      `C ${(-w*1.02).toFixed(1)} ${(-l*0.79).toFixed(1)} ${(-w*0.70).toFixed(1)} ${(-l*(1.0+ruffle*0.12)).toFixed(1)} ${(-w*0.20).toFixed(1)} ${(-l*(0.98+tipPull)).toFixed(1)}`,
      `C ${(-w*0.02).toFixed(1)} ${(-l*(1.06+tipPull*0.2)).toFixed(1)} ${(w*0.14).toFixed(1)} ${(-l*(1.03-tipPull*0.1)).toFixed(1)} ${(w*0.28).toFixed(1)} ${(-l*(0.97+ruffle*0.06)).toFixed(1)}`,
      `C ${(w*0.78).toFixed(1)} ${(-l*(0.92+ruffle*0.05)).toFixed(1)} ${(w*0.92).toFixed(1)} ${(-l*0.58).toFixed(1)} ${(w*0.72).toFixed(1)} ${(-l*0.31).toFixed(1)}`,
      `C ${(w*0.50).toFixed(1)} ${(-l*0.08).toFixed(1)} ${(w*0.14).toFixed(1)} ${(-l*0.01).toFixed(1)} 0 0 Z`
    ].join(' ');
  }

  function buildFlowerSystem(spec,index){
    const arch=archetypes.find(a=>a.name===spec.t) || archetypes[0];
    const root=create('g',{class:'flower-system','data-flower':index},layer);
    const vineG=create('g',{class:'vine-group'},root);
    const budG=create('g',{class:'bud-group'},root);
    const petalsG=create('g',{class:'petal-group'},root);

    let exitDx=0, exitDy=0;
    if(spec.exit==='left'){ exitDx=-rand(1380,1820); exitDy=-rand(80,540); }
    else if(spec.exit==='right'){ exitDx=rand(1380,1820); exitDy=-rand(80,540); }
    else if(spec.exit==='up'){ exitDx=rand(-220,220); exitDy=-rand(1320,1760); }
    else if(spec.exit==='up-left'){ exitDx=-rand(820,1320); exitDy=-rand(760,1380); }
    else if(spec.exit==='up-right'){ exitDx=rand(820,1320); exitDy=-rand(760,1380); }

    const cp1x=exitDx*rand(0.18,0.28)+rand(-110,110), cp1y=exitDy*rand(0.16,0.22)+rand(-80,40), cp2x=exitDx*rand(0.52,0.70)+rand(-170,170), cp2y=exitDy*rand(0.55,0.76)+rand(-110,60);
    const pathData=`M 0 0 C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${exitDx.toFixed(1)} ${exitDy.toFixed(1)}`;
    create('path',{d:pathData,class:'vine-stroke'},vineG);
    create('path',{d:`M 0 0 C ${(cp1x+18).toFixed(1)} ${(cp1y+12).toFixed(1)} ${(cp2x+9).toFixed(1)} ${(cp2y+8).toFixed(1)} ${(exitDx+5).toFixed(1)} ${(exitDy+3).toFixed(1)}`,class:'vine-echo'},vineG);
    for(let b=0;b<4;b++){
      const t=0.18+b*0.18+rand(-0.03,0.03), px=mix(0,exitDx,t), py=mix(0,exitDy,t);
      const sign=(b%2===0?1:-1)*(spec.exit.includes('left')?-1:1);
      const angle=spec.exit==='up' ? rand(-135,-55) : rand(-95,-20)*sign;
      const lg=create('g',{transform:`translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${rand(0.88,1.18).toFixed(3)})`},vineG);
      create('path',{d:'M 0 0 C 12 -19 38 -31 76 -28 C 63 7 29 17 0 0 Z',fill:pick(['#c84a0d','#cf5310','#d75c15']),stroke:'#ffedd5','stroke-width':'1.1'},lg);
      create('path',{d:'M 3 -1 Q 38 -8 73 -28',class:'vine-echo'},lg);
    }

    create('path',{d:'M -23 14 C -35 1 -31 -22 -19 -42 C -11 -55 -4 -63 0 -70 C 11 -61 21 -49 29 -32 C 39 -11 33 8 22 18 C 10 28 -8 28 -23 14 Z',fill:'url(#bud-fill)',stroke:'#fff0da','stroke-width':'1.6',class:'bud-core'},budG);
    create('path',{d:'M -11 16 C -6 -7 -3 -39 0 -67 C 4 -41 5 -12 10 15',class:'bud-mark'},budG);
    create('path',{d:'M -20 13 Q -2 31 19 16 M -10 16 L -20 29 M 7 16 L 20 29',class:'bud-mark'},budG);
    create('path',{d:'M -16 8 Q -9 -16 0 -62 M 16 8 Q 8 -19 0 -62',class:'bud-mark',opacity:'.6'},budG);
    create('path',{d:'M -6 -44 Q 2 -56 14 -32',class:'petal-highlight',opacity:'.55'},budG);

    const petalData=[];
    arch.angles.forEach((baseAngle,i)=>{
      const w=(arch.widths[i % arch.widths.length] || rand(70,100))*rand(0.94,1.08);
      const l=(arch.lengths[i % arch.lengths.length] || rand(185,240))*rand(0.95,1.06);
      const ruffle=rand(-0.18,0.34), tipPull=rand(-0.05,0.06);
      const path=petalPath(w,l,ruffle,tipPull);
      const ang=baseAngle + arch.tilt + spec.rot + rand(-6,6);
      const spin=create('g',{class:'petal-spin',transform:`rotate(${ang.toFixed(2)})`},petalsG);
      const motion=create('g',{class:'petal-motion'},spin);
      const fill=pick(['url(#petal-fill-a)','url(#petal-fill-b)','url(#petal-fill-c)']);
      create('path',{d:path,fill:'rgba(114,32,6,.18)',transform:'translate(0 10) scale(1 .98)',class:'petal-shadow'},motion);
      create('path',{d:path,fill, class:'petal-fill'},motion);
      create('path',{d:`M ${(-w*0.62).toFixed(1)} ${(-l*0.34).toFixed(1)} Q ${(-w*0.20).toFixed(1)} ${(-l*0.78).toFixed(1)} ${(w*0.08).toFixed(1)} ${(-l*0.96).toFixed(1)}`,class:'petal-highlight'},motion);
      create('path',{d:`M ${(w*0.16).toFixed(1)} ${(-l*0.16).toFixed(1)} Q ${(w*0.36).toFixed(1)} ${(-l*0.52).toFixed(1)} ${(w*0.52).toFixed(1)} ${(-l*0.82).toFixed(1)}`,class:'petal-rim'},motion);
      for(let line=0; line<18; line++){
        const k=(line-8.5)/8.5, x0=k*3, tipX=k*w*0.72 + rand(-3,3);
        const d=`M ${x0.toFixed(1)} ${(-8-rand(0,10)).toFixed(1)} C ${(k*20).toFixed(1)} ${(-l*0.26).toFixed(1)} ${(tipX*0.82).toFixed(1)} ${(-l*0.58).toFixed(1)} ${tipX.toFixed(1)} ${(-l*rand(0.80,0.98)).toFixed(1)}`;
        create('path',{d,class:line%2===0?'petal-engraving':'petal-micro'},motion);
      }
      for(let t=0;t<9;t++){
        const x=rand(-w*0.6,w*0.6), y=-rand(l*0.38,l*0.88);
        create('path',{d:`M ${x.toFixed(1)} ${y.toFixed(1)} q ${rand(-8,8).toFixed(1)} -${rand(8,18).toFixed(1)} ${rand(-11,11).toFixed(1)} -${rand(15,30).toFixed(1)}`,class:'petal-micro'},motion);
      }
      petalData.push({motion, lag:rand(0,0.11), sx:rand(0.07,0.18), sy:rand(0.03,0.11), twist:rand(-36,36), shiftY:rand(-28,-9), shiftX:rand(-10,10), fadeLag:rand(0.72,0.88), curl:rand(-10,10)});
    });

    return {root,vineG,budG,petals:petalData,x:spec.x+rand(-26,26),y:spec.y+rand(-24,24),scale:spec.s*rand(0.96,1.04),rot:spec.rot+rand(-4,4),exitDx,exitDy,offset:rand(0,0.05),sway:rand(-6,6),exitSwing:rand(-13,13)};
  }

  const flowers=placements.map((p,i)=>buildFlowerSystem(p,i));
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let ticking=false;
  function render(){
    ticking=false;
    if(reduce.matches){ word.style.opacity='1'; svg.style.opacity='1'; surface.style.opacity='1'; return; }
    const range=Math.max(1, intro.offsetHeight-window.innerHeight);
    const p=clamp(-intro.getBoundingClientRect().top/range);
    // No dead zones: every phase overlaps the next.
    const wordOut=phase(p,0.00,0.18);
    const retract=phase(p,0.10,0.56);
    const pull=phase(p,0.42,0.88);
    const reveal=phase(p,0.74,0.98);

    word.style.transform=`translate(-50%, calc(-50% - ${wordOut*118}vh))`;
    word.style.opacity=String(1 - phase(p,0.05,0.18));
    cue.style.opacity=String(1 - phase(p,0.00,0.12));
    edition.style.opacity=String(1 - phase(p,0.02,0.18));
    progress.style.transform=`scaleX(${p.toFixed(4)})`;

    flowers.forEach((f,idx)=>{
      const localRetract=phase(retract, f.offset*0.65, 0.98-f.offset*0.25);
      const localPull=phase(pull, f.offset*0.35, 0.96-f.offset*0.15);
      const dx=f.exitDx*localPull, dy=f.exitDy*localPull;
      const sway=Math.sin((p+idx*0.07)*Math.PI*2)*f.sway*(1-localPull)*0.10;
      const rot=f.rot+sway+f.exitSwing*localPull;
      f.root.setAttribute('transform',`translate(${(f.x+dx).toFixed(1)} ${(f.y+dy).toFixed(1)}) rotate(${rot.toFixed(2)}) scale(${f.scale.toFixed(3)})`);
      f.vineG.setAttribute('opacity',String(0.22+0.78*phase(localRetract,0.04,0.58)));
      f.budG.setAttribute('opacity',String(0.52+0.48*phase(localRetract,0.06,0.58)));
      f.budG.setAttribute('transform',`translate(${(3*localRetract).toFixed(1)} ${(-8*localRetract).toFixed(1)}) rotate(${(6*localRetract).toFixed(2)}) scale(${mix(1,0.94,localPull).toFixed(3)})`);
      f.petals.forEach((pe,j)=>{
        const fold=phase(localRetract, pe.lag, 0.94);
        const sx=mix(1,pe.sx,fold), sy=mix(1,pe.sy,fold);
        const ty=pe.shiftY*fold, tx=(Math.sin((j+1)*1.17)*9 + pe.shiftX)*fold;
        const rt=pe.twist*fold;
        const skew=pe.curl*fold;
        pe.motion.setAttribute('transform',`translate(${tx.toFixed(1)} ${ty.toFixed(1)}) rotate(${rt.toFixed(2)}) skewX(${skew.toFixed(2)}) scale(${sx.toFixed(3)} ${sy.toFixed(3)})`);
        pe.motion.setAttribute('opacity',String(1 - phase(fold, pe.fadeLag, 1)*0.995));
      });
    });

    svg.style.opacity=String(1-reveal);
    surface.style.opacity=String(1-reveal);
  }
  function request(){ if(!ticking){ ticking=true; requestAnimationFrame(render); } }
  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',request,{passive:true});
  reduce.addEventListener?.('change',request);
  render();
})();

(() => {
  const menu=document.querySelector('.menu'), panel=document.querySelector('.menu-panel');
  if(menu && panel){
    menu.addEventListener('click',()=>{const active=panel.classList.toggle('open');menu.setAttribute('aria-expanded',String(active));menu.setAttribute('aria-label',active?'Close menu':'Open menu');});
    panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>panel.classList.remove('open')));
  }
  const observer=('IntersectionObserver' in window)?new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');observer.unobserve(e.target)}}),{threshold:.06}):null;
  if(observer){document.querySelectorAll('.work-card,.work-head,.about-grid,.contact h2').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}
})();
