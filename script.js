// ROHBEIR | V8 | image-derived botanical motion study
// Each petal is a CLIPPED AND TRANSFORMED PIECE OF THE EXACT ORIGINAL image.
// There are no substitute flower drawings. Scrolling backward reverses everything.
(() => {
  'use strict';
  const intro = document.getElementById('garden-intro');
  const canvas = document.getElementById('garden-canvas');
  const wall = document.getElementById('garden-wall');
  const word = document.getElementById('garden-wordmark');
  const cue = document.querySelector('.garden-scrollcue');
  const edition = document.querySelector('.garden-edition');
  const film = document.querySelector('.garden-darkness');
  if (!intro || !canvas || !wall) return;
  const ctx=canvas.getContext('2d', {alpha:true});
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
  const phase=(p,a,b)=>smooth((p-a)/(b-a));
  const mix=(a,b,t)=>a+(b-a)*t;
  const PI=Math.PI,TAU=2*PI;
  const W=1536,H=1024;
  let width=1,height=1,dpr=1,cover={s:1,x:0,y:0};
  let needsFrame=false, ready=false, lastP=-1;
  const reduction=matchMedia('(prefers-reduced-motion: reduce)');

  // Seed centers have been placed against recognizable flower centers in the source.
  // Voronoi petals cover the source WITHOUT introducing replacement flower shapes.
  // [x,y,number of individually animated image slices, release direction]
  const seeds=[
    [110,98,10,-1],[420,25,9,0],[724,36,9,0],[1103,109,11,1],[1500,200,9,1],
    [94,340,11,-1],[416,441,10,-1],[762,396,11,0],[1048,500,12,1],[1428,505,10,1],
    [143,772,10,-1],[471,735,10,-1],[845,780,11,0],[1164,825,11,1],[1521,864,9,1],
    [200,1071,9,-1],[660,1090,9,0],[993,1110,9,1]
  ];
  const flowers=seeds.map(([x,y,n,side],index)=>({x,y,n,side,index,petals:[]}));

  // Clipping math: Voronoi regions + each flower's angular sectors.
  // At zero deformation, the pieces tile to EXACTLY the original image.
  function clip(poly,nx,ny,k){
    const o=[];
    for(let i=0;i<poly.length;i++){
      const a=poly[i],b=poly[(i+1)%poly.length];
      const da=nx*a[0]+ny*a[1]-k,db=nx*b[0]+ny*b[1]-k;
      if(da<=1e-5)o.push(a);
      if((da<0&&db>0)||(da>0&&db<0)){
        const t=da/(da-db);o.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);
      }
    }
    return o;
  }
  function createPetals(){
    const box=[[-2000,-2000],[3600,-2000],[3600,3000],[-2000,3000]];
    for(const f of flowers){
      let cell=box;
      for(const other of flowers){
        if(other===f)continue;
        const nx=other.x-f.x,ny=other.y-f.y;
        cell=clip(cell,nx,ny,(other.x*other.x+other.y*other.y-f.x*f.x-f.y*f.y)/2);
        if(!cell.length)break;
      }
      f.petals=[];
      for(let j=0;j<f.n;j++){
        const a=-PI+j*TAU/f.n,b=-PI+(j+1)*TAU/f.n;
        let poly=clip(cell,Math.sin(a),-Math.cos(a),Math.sin(a)*f.x-Math.cos(a)*f.y);
        poly=clip(poly,-Math.sin(b),Math.cos(b),-Math.sin(b)*f.x+Math.cos(b)*f.y);
        if(poly.length<3)continue;
        f.petals.push({poly,j,angle:(a+b)/2,lag:((j*7+f.index*3)%f.n)/f.n*.13,turn:(j%2?1:-1)*(.13+j%3*.06)});
      }
    }
  }
  createPetals();

  function outline(poly){
    ctx.beginPath();ctx.moveTo(poly[0][0],poly[0][1]);
    for(let i=1;i<poly.length;i++)ctx.lineTo(poly[i][0],poly[i][1]);
    ctx.closePath();
  }
  // Botanical vines stay extremely fine; no cartoon flower graphics are used.
  function vines(f,open,exit){
    if(open<=.001||exit>=1)return;
    const i=f.index,side=f.side||((i%2)?1:-1);
    const driftX=side*(W*.95+140)*exit;
    const driftY=(side===0?-(H+400):-(H*.15))*exit;
    const x=f.x+driftX,y=f.y+driftY;
    const bottom=H+550;
    ctx.save();ctx.strokeStyle='#fbe9d3';ctx.lineCap='round';ctx.lineJoin='round';
    ctx.globalAlpha=smooth(open)*(.88-.28*exit);
    ctx.lineWidth=1.45;
    ctx.beginPath();ctx.moveTo(x,y+4);
    ctx.bezierCurveTo(x+(-1)**i*60,y+190,x+(-1)**(i+1)*150,H*.8,x+(i%3-1)*150,bottom);
    ctx.stroke();
    ctx.lineWidth=.65;ctx.globalAlpha*=.55;
    ctx.beginPath();ctx.moveTo(x+2,y+12);ctx.bezierCurveTo(x+(-1)**i*50,y+190,x+(-1)**(i+1)*141,H*.8,x+(i%3-1)*143,bottom);ctx.stroke();
    // Lobed leaves etched with interior vein details.
    for(let k=0;k<2;k++){
      const t=k*.24+.42;
      const lx=mix(x,x+(i%3-1)*150,t)+Math.sin(i*7+k)*20;
      const ly=mix(y,bottom,t);
      const sg=(i+k)%2?1:-1;
      ctx.save();ctx.translate(lx,ly);ctx.rotate(sg*(.4+.12*exit));ctx.scale(sg,1);
      ctx.fillStyle='#c84710';ctx.strokeStyle='#fff0dc';ctx.lineWidth=1.15;ctx.globalAlpha=.85*open*(1-exit*.5);
      ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(11,-43,49,-68,73,-79);ctx.bezierCurveTo(63,-37,27,-9,0,0);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.strokeStyle='rgba(255,246,229,.82)';ctx.lineWidth=.75;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(38,-49,73,-79);ctx.stroke();ctx.restore();
    }
    // Bud scales are made from sampled orange texture of the source, not fake petal drawings.
    ctx.save();ctx.translate(x,y);ctx.fillStyle='#cd440d';ctx.strokeStyle='#fff0dd';ctx.lineWidth=1;
    ctx.globalAlpha=phase(open,.36,.8)*(1-exit*.1);
    ctx.beginPath();ctx.moveTo(-10,4);ctx.quadraticCurveTo(-14,-29,-2,-36);ctx.quadraticCurveTo(14,-26,11,4);ctx.quadraticCurveTo(0,12,-10,4);ctx.fill();ctx.stroke();ctx.restore();
    ctx.restore();
  }
  function petalsFor(f,close,exit){
    const {x,y,index,side}=f;
    const dx=(side===0?0:side*(W*.96+140))*exit;
    const dy=(side===0?-(H+350):-(H*.15))*exit;
    const shiftY=dy;
    for(const petal of f.petals){
      const fold=phase(close,petal.lag,1-petal.lag*.25);
      const length=1-.93*fold;
      const breadth=1-.78*fold;
      const curl=petal.turn*fold + (petal.j%2?-.25:.25)*Math.sin(fold*PI);
      ctx.save();
      ctx.translate(x+dx,y+shiftY);
      ctx.rotate(curl);
      // Image-derived radial sector collapses into the actual flower center.
      ctx.scale(length,breadth);
      ctx.translate(-x,-y);
      outline(petal.poly);ctx.clip();
      ctx.drawImage(wall,0,0,W,H);
      ctx.restore();
    }
  }
  function render(){
    needsFrame=false;
    if(!ready)return;
    const travel=intro.offsetHeight-height;
    const p=clamp(-intro.getBoundingClientRect().top / Math.max(1,travel));
    if(Math.abs(p-lastP)<.0001)return;
    lastP=p;
    const title=phase(p,.01,.19);
    const retract=phase(p,.20,.73);
    const trail=phase(p,.72,.965);
    const wallOpacity=1-phase(p,.205,.285);
    word.style.transform=`translate(-50%, calc(-50% - ${Math.round(115*title)}vh))`;
    word.style.opacity=String(1-phase(p,.09,.185));
    cue.style.opacity=String(1-phase(p,.01,.12));
    edition.style.opacity=String(1-phase(p,.09,.20));
    wall.style.opacity=String(wallOpacity);
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
    if(retract>.001){
      ctx.save();ctx.translate(cover.x,cover.y);ctx.scale(cover.s,cover.s);
      for(const f of flowers)vines(f,retract,trail);
      for(const f of flowers)petalsFor(f,retract,trail);
      ctx.restore();
    }
    const dissolve=phase(p,.94,1);
    canvas.style.opacity=String(1-dissolve);
    film.style.opacity=String(1-dissolve);
  }
  function request(){if(!needsFrame){needsFrame=true;requestAnimationFrame(render);}}
  function resize(){
    width=window.innerWidth;height=window.innerHeight;
    dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    const s=Math.max(width/W,height/H);
    cover={s,x:(width-W*s)/2,y:(height-H*s)/2};
    lastP=-1;request();
  }
  // Image must be fully decoded before canvas reads its pixels.
  function init(){ready=true;resize();}
  if(wall.complete && wall.naturalWidth)init();
  else wall.addEventListener('load',init,{once:true});
  wall.addEventListener('error',()=>{film.style.background='#d44a12';},{once:true});
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('resize',resize,{passive:true});
  if(reduction.matches){intro.style.height='100dvh';word.style.opacity='1';}
})();

// Existing archive functionality.
const menu=document.querySelector('.menu'), panel=document.querySelector('.menu-panel');
if(menu&&panel){menu.addEventListener('click',()=>panel.classList.toggle('open'));document.querySelectorAll('.menu-panel a').forEach(a=>a.addEventListener('click',()=>panel.classList.remove('open')));}
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');observer.unobserve(e.target);}}),{threshold:.12});document.querySelectorAll('.work-card,.manifesto,.about-content').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}
