const menu=document.querySelector(".menu");const panel=document.querySelector(".menu-panel");
menu.addEventListener("click",()=>panel.classList.toggle("open"));
document.querySelectorAll(".menu-panel a").forEach(a=>a.addEventListener("click",()=>panel.classList.remove("open")));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("seen");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".work-card,.manifesto,.about-content").forEach(el=>{el.classList.add("reveal");observer.observe(el)});


// The exact approved botanical image is frame zero. All movement is scroll-scrubbed.
(() => {
 const section=document.querySelector('#bloom-scroll'), canvas=document.querySelector('#tattoo-canvas');
 if(!section||!canvas)return;
 const ctx=canvas.getContext('2d'), stems=document.querySelector('#stem-art');
 const image=new Image(); image.src='images/tattoo-flower-wall.png';
 const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
 const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
 const flowers=[
 [.10,.18,.16], [.36,.10,.20], [.68,.14,.18], [.92,.12,.17],
 [.21,.42,.20], [.52,.39,.21], [.84,.40,.20],
 [.08,.71,.20], [.38,.72,.20], [.70,.73,.21], [.96,.75,.19],
 [.18,.97,.18], [.55,.97,.20], [.87,.99,.19]
 ];
 let W=0,H=0,dpr=1,queued=false;
 function resize(){W=window.innerWidth;H=window.innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);canvas.style.width=W+'px';canvas.style.height=H+'px';drawStems();paint()}
 function drawStems(){
  const paths=flowers.map(([x,y,r],i)=>{
   const cx=x*1440,cy=y*900, ex=cx+(i%2?-1:1)*(60+i%4*19), ey=950;
   const d=`M ${cx} ${cy} C ${cx-60} ${cy+160}, ${ex+90} ${cy+310}, ${ex} ${ey}`;
   const leaves=[.36,.58,.77].map((t,k)=>{const yy=cy+(ey-cy)*t, xx=cx+(ex-cx)*t;const side=(i+k)%2?-1:1;return `<path d="M ${xx} ${yy} q ${side*85} -95 ${side*122} -35 q ${-side*85} 58 ${-side*122} 35 M ${xx} ${yy} q ${side*66} -42 ${side*122} -35" fill="none" stroke="#f2e9d8" stroke-width="1.25" opacity=".7"/>`}).join('');
   return `<path d="${d}" fill="none" stroke="#f2e9d8" stroke-width="1.5" opacity=".88"/>${leaves}<ellipse cx="${cx}" cy="${cy}" rx="8" ry="14" fill="#d9550a" stroke="#f2e9d8" stroke-width="1.4"/>`;
  }).join('');stems.innerHTML=paths;
 }
 function paint(){queued=false;if(!image.complete||!image.naturalWidth)return;
  const rect=section.getBoundingClientRect(), travel=Math.max(1,section.offsetHeight-H);
  const p=clamp(-rect.top/travel), close=ease((p-.035)/.70), depart=ease((p-.72)/.28);
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  // Cover-fit: no cropping or re-rendering at the opening frame beyond viewport cover.
  const scale=Math.max(W/image.width,H/image.height), iw=image.width*scale,ih=image.height*scale, ox=(W-iw)/2,oy=(H-ih)/2;
  // The full image remains pixel-identical until the first movement starts.
  if(close===0){ctx.drawImage(image,ox,oy,iw,ih);return}
  // A continuous underlying image fades while individual overlapping flower-head cutouts
  // spiral toward their own centers, progressively exposing the engraved stems.
  ctx.globalAlpha=Math.pow(1-close,2.8);
  ctx.drawImage(image,ox,oy,iw,ih);ctx.globalAlpha=1;
  flowers.forEach(([fx,fy,fr],i)=>{
   const cx=fx*W,cy=fy*H,r=fr*Math.max(W,H)*.82;
   const delay=i*.015, t=ease((close-delay)/(1-delay));
   const spin=t*Math.PI*(1.35+(i%4)*.28)*(i%2?-1:1);
   const shrink=1-t*.91;
   const dx=Math.sin(t*Math.PI*2+i*2.1)*t*22+depart*(i%2?1:-1)*W*.12;
   const dy=depart*H*.18;
   ctx.save();ctx.translate(cx+dx,cy+dy);ctx.rotate(spin);ctx.scale(shrink,shrink);
   ctx.beginPath();ctx.ellipse(0,0,r,r*.82,0,0,Math.PI*2);ctx.clip();
   ctx.drawImage(image,ox-cx,oy-cy,iw,ih);
   ctx.restore();
  });
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(paint)}}
 image.onload=()=>{resize()};window.addEventListener('resize',resize);window.addEventListener('scroll',schedule,{passive:true});resize();
})();
