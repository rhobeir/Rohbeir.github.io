const menu=document.querySelector(".menu");const panel=document.querySelector(".menu-panel");
menu.addEventListener("click",()=>panel.classList.toggle("open"));
document.querySelectorAll(".menu-panel a").forEach(a=>a.addEventListener("click",()=>panel.classList.remove("open")));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("seen");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".work-card,.manifesto,.about-content").forEach(el=>{el.classList.add("reveal");observer.observe(el)});


// ROHBEIR — scroll-scrubbed garden prologue.
// Full approved artwork is displayed pixel-for-pixel at the start.
// After the title exits, individual illustrated petals fold toward their buds,
// then the vines pull those buds out of frame to reveal the real homepage.
(() => {
  const section = document.querySelector('#garden-intro');
  const canvas = document.querySelector('#garden-canvas');
  if (!section || !canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  const wordmark = document.querySelector('#garden-wordmark');
  const stage = document.querySelector('#garden-screen');
  const darkness = document.querySelector('.garden-darkness');
  const cue = document.querySelector('.garden-scrollcue');
  const edition = document.querySelector('.garden-edition');
  const img = new Image();
  img.src = 'images/tattoo-flower-wall.png';
  const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
  const ease = t => { t = clamp(t); return t * t * (3 - 2 * t); };
  const phase = (p, a, b) => ease((p - a) / (b - a));
  const lerp = (a,b,t) => a + (b-a)*t;
  let w = 1, h = 1, dpr = 1, pending = false, current = 0;
  let cover = {x:0,y:0,s:1};
  const BASE_W = 1536, BASE_H = 1024;
  // Multiple sizes and angles: bouquet centers follow the actual illustrated flower wall.
  // Individual petals are separate canvas paths, and each is independently transformed.
  const data = [
    [.03,.14,188,7, 11], [.26,.04,186,9,23], [.52,.07,210,8,37], [.80,.08,195,8,43],
    [.97,.26,169,7,58], [.11,.37,200,8,71], [.37,.38,180,9,87], [.67,.36,213,8,99],
    [.89,.51,198,9,113], [.03,.67,211,8,127], [.28,.69,180,8,139], [.55,.72,206,9,151],
    [.78,.78,191,8,163], [.98,.80,188,7,179], [.17,.98,205,9,191], [.46,1.01,181,8,211], [.72,1.02,206,8,223]
  ];
  // Stable procedural variations: no time-based jitter; reverse scrolling is exact.
  const flowers = data.map(([x,y,r,count,seed],i) => ({x:x*BASE_W,y:y*BASE_H,r,count,seed,i,
    petals:Array.from({length:count},(_,j)=>({
      theta:(j/count)*Math.PI*2 + ((seed*j)%7-3)*.045,
      len:.84 + ((seed+7*j)%11)/47,
      width:.70 + ((seed+3*j)%9)/31,
      stagger:((j*5+i*3)%count)/count,
      twist:(j%2?-1:1)*(0.32+(j%4)*.13)
    }))
  }));
  function resize(){
    w = window.innerWidth; h = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    canvas.width = Math.max(1, Math.round(w*dpr));
    canvas.height = Math.max(1, Math.round(h*dpr));
    canvas.style.width = w+'px';canvas.style.height=h+'px';
    const sw=img.naturalWidth || BASE_W, sh=img.naturalHeight || BASE_H;
    const s = Math.max(w/sw,h/sh);
    cover = {s,x:(w-sw*s)/2,y:(h-sh*s)/2};
    schedule();
  }
  // In the reference-image coordinate space, transformed to match object-fit: cover.
  function gardenVine(f,pull,show){
    if(show<=0)return;
    const {x,y,r,i}=f;
    const dir = i%2===0?-1:1;
    const sway = Math.sin(i*1.91)*72;
    // The bud remains connected to its vine while it is pulled up/out of frame.
    const dx = dir * (120 + i%4*55) * pull + sway * pull;
    const dy = - (1150 + i%3*115) * pull;
    const bx=x+dx, by=y+dy;
    const ox=x + dir*(110+i%5*24), oy=BASE_H+260;
    ctx.lineCap='round'; ctx.lineJoin='round';
    ctx.save();ctx.globalAlpha=show*(1-phase(pull,.88,1)*.28);
    ctx.strokeStyle='#fff3e9';ctx.lineWidth=1.25;
    ctx.beginPath();ctx.moveTo(ox,oy);
    ctx.bezierCurveTo(ox-dir*85, y+r*1.05, bx+dir*(135+45*pull),by+135,bx,by+9);
    ctx.stroke();
    // Thin secondary vein following the principal stem.
    ctx.globalAlpha*=.45;ctx.lineWidth=.52;
    ctx.beginPath();ctx.moveTo(ox+4,oy);ctx.bezierCurveTo(ox-dir*80,y+r*1.05,bx+dir*(142+45*pull),by+135,bx+3,by+8);ctx.stroke();
    ctx.restore();
    // Leaves are individually articulated and become visible as the bloom contracts.
    for(let k=0;k<2;k++){
      const t=.38+k*.21;
      const leafX=lerp(ox,bx,t)+dir*23;
      const leafY=lerp(oy,by,t);
      const sgn=(i+k)%2?1:-1;
      ctx.save();ctx.translate(leafX,leafY);
      ctx.rotate(sgn*(-.26+.20*pull));ctx.globalAlpha=show*.79;
      ctx.strokeStyle='#fff1e5';ctx.lineWidth=.9;
      ctx.fillStyle='#d54b0b';
      ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(sgn*27,-41,sgn*61,-50,sgn*79,-61);
      ctx.bezierCurveTo(sgn*69,-16,sgn*23,-8,0,0);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(sgn*48,-37,sgn*79,-61);ctx.stroke();ctx.restore();
    }
  }
  function petalPath(radius,wide){
    const len=radius,wd=radius*.42*wide;
    ctx.beginPath();ctx.moveTo(0,0);
    ctx.bezierCurveTo(len*.19,-wd*.71,len*.56,-wd*1.17,len*.78,-wd*.66);
    ctx.bezierCurveTo(len*.95,-wd*.36,len*1.015,-wd*.1,len*.97,wd*.10);
    ctx.bezierCurveTo(len*.91,wd*.65,len*.61,wd*1.10,len*.40,wd*.80);
    ctx.bezierCurveTo(len*.15,wd*.47,len*.08,wd*.20,0,0);
    ctx.closePath();
  }
  function drawPetal(f,pt,j,fold,opacity){
    const R=f.r*pt.len;
    const t=clamp((fold-.05*pt.stagger)/(1-.05*pt.stagger));
    const scaleX=lerp(1,.105,ease(t));
    const scaleY=lerp(1,.27,ease(t));
    ctx.save();ctx.globalAlpha=opacity;
    ctx.translate(f.x,f.y);
    ctx.rotate(pt.theta + pt.twist*t + Math.sin(t*Math.PI)*(.15+j*.017));
    ctx.scale(scaleX,scaleY);
    petalPath(R,pt.width);
    ctx.fillStyle=(j%4===1)?'#d94808':(j%4===3?'#e85a10':'#dd4d0a');
    ctx.fill();ctx.strokeStyle='#fff0df';ctx.lineWidth=1.18;ctx.stroke();
    // Etched fine-line veins, laid inside the actual petal (not a flat sprite).
    ctx.save();ctx.clip();
    ctx.strokeStyle='#fbece0'; ctx.globalAlpha=.82*opacity;
    for(let k=-8;k<=8;k++){
      const yy=k*R*.024;
      ctx.lineWidth=(k%4===0?.54:.33);
      ctx.beginPath();ctx.moveTo(R*.025,yy*.12);
      ctx.bezierCurveTo(R*.29,yy*.53,R*.60,yy*.96,R*.99,yy*1.64);
      ctx.stroke();
    }
    for(let k=1;k<=5;k++){
      ctx.lineWidth=.32;ctx.beginPath();
      const x=R*(.16+k*.115);
      ctx.moveTo(x,-R*.025);ctx.quadraticCurveTo(x+R*.06,R*.07,x+R*.12,R*.16);ctx.stroke();
      ctx.beginPath();ctx.moveTo(x,-R*.025);ctx.quadraticCurveTo(x+R*.05,-R*.09,x+R*.14,-R*.17);ctx.stroke();
    }
    ctx.restore();ctx.restore();
  }
  function bud(f,fold,pull,opacity){
    if(fold<.07)return;
    const t=phase(fold,.16,.95);
    const x=f.x, y=f.y;
    ctx.save();ctx.translate(x,y);ctx.globalAlpha=opacity*t;
    ctx.strokeStyle='#fff1e8';ctx.lineWidth=1.2;
    ctx.fillStyle='#d54d0b';
    ctx.beginPath();ctx.moveTo(0,12);ctx.bezierCurveTo(-14,-2,-16,-22,-9,-34);
    ctx.bezierCurveTo(-3,-43,4,-47,10,-34);ctx.bezierCurveTo(18,-17,11,2,0,12);
    ctx.closePath();ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.moveTo(0,12);ctx.quadraticCurveTo(-5,-14,8,-34);ctx.stroke();
    ctx.beginPath();ctx.moveTo(-9,6);ctx.quadraticCurveTo(-24,-7,-17,-21);ctx.quadraticCurveTo(-7,-12,0,10);
    ctx.moveTo(7,7);ctx.quadraticCurveTo(25,-9,17,-20);ctx.quadraticCurveTo(10,-13,0,10);
    ctx.stroke();ctx.restore();
  }
  function paint(){
    pending=false;
    if(!img.complete||!img.naturalWidth)return;
    const rect=section.getBoundingClientRect();
    const total=Math.max(1,section.offsetHeight-h);
    const p=current=clamp(-rect.top/total);
    // Stage I: wordmark leaves first; no petal motion until it's gone.
    const title=phase(p,.015,.205);
    wordmark.style.transform=`translate(-50%,calc(-50% - ${title*92}vh))`;
    wordmark.style.opacity=String(1-phase(p,.105,.202));
    cue.style.opacity=String(1-phase(p,.016,.125));
    edition.style.opacity=String(1-phase(p,.13,.28));
    // Stage II: independent individual petal articulation into buds.
    const change=phase(p,.215,.345);
    const contract=phase(p,.292,.72);
    // Stage III: pull the buds by their stems, sweeping off-screen.
    const yank=phase(p,.725,.975);
    const reveal=phase(p,.84,.985);
    darkness.style.opacity=String(1-reveal);
    stage.style.visibility=p>.997?'hidden':'visible';
    const cw=canvas.width,ch=canvas.height;
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
    const {s,x,y}=cover;
    // Entire approved reference is absolutely unchanged during the title exit.
    if(change<1){ctx.save();ctx.globalAlpha=1-change;ctx.drawImage(img,x,y,img.width*s,img.height*s);ctx.restore();}
    if(change<.003)return;
    ctx.save();ctx.translate(x,y);ctx.scale(s,s);
    // Vines are drawn under every single petal, revealed as petals fold.
    flowers.forEach(f=>{
      const pull=phase(yank,Math.max(0,f.i*.012),.90+f.i*.006);
      gardenVine(f,pull,change*(1-reveal));
    });
    flowers.forEach(f=>{
      const delay=(f.i%5)*.025;
      const fold=phase(contract,delay,.94+delay);
      const pull=phase(yank,f.i*.010,.88+f.i*.009);
      const direction=f.i%2?-1:1;
      ctx.save();ctx.translate(direction*(120+f.i%4*55)*pull+Math.sin(f.i*1.91)*72*pull,-(1150+f.i%3*115)*pull);
      f.petals.forEach((pt,j)=>{
        const local=phase(fold,pt.stagger*.18,.86+pt.stagger*.13);
        drawPetal(f,pt,j,local,change*(1-reveal));
      });
      bud(f,fold,pull,change*(1-reveal));
      ctx.restore();
    });
    ctx.restore();
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(paint);}}
  img.onload=resize;
  img.onerror=()=>{darkness.style.background='#d94e0c';};
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',resize);
  window.addEventListener('load',schedule);
  resize();
})();
