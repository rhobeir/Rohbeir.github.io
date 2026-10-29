const menu=document.querySelector(".menu");const panel=document.querySelector(".menu-panel");
menu.addEventListener("click",()=>panel.classList.toggle("open"));
document.querySelectorAll(".menu-panel a").forEach(a=>a.addEventListener("click",()=>panel.classList.remove("open")));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("seen");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".work-card,.manifesto,.about-content").forEach(el=>{el.classList.add("reveal");observer.observe(el)});


// Flowers are driven by scroll progress, not a timer: slow scroll = slow bloom-to-bud movement.
(() => {
  const section = document.querySelector("#bloom-scroll");
  if (!section) return;
  const flowers = [...section.querySelectorAll(".flower")];
  let scheduled = false;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const smooth = (n) => n * n * (3 - 2 * n);

  function paint() {
    scheduled = false;
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / travel, 0, 1);

    flowers.forEach((flower, i) => {
      const offset = i * 0.105;
      const p = clamp((progress - offset) / (1 - offset), 0, 1);
      const close = smooth(clamp((p - 0.06) / 0.66, 0, 1));
      const exit = smooth(clamp((p - 0.58) / 0.42, 0, 1));
      const direction = i % 2 === 0 ? 1 : -1;
      const waveX = (Math.sin(progress * Math.PI * 2.4 + i * 1.25) - Math.sin(i * 1.25)) * window.innerWidth * 0.12;
      const waveY = (Math.sin(progress * Math.PI * 2.1 + i * 0.9) - Math.sin(i * 0.9)) * window.innerHeight * 0.10;
      const x = direction * (progress * (window.innerWidth * (0.15 + i * 0.025)) + waveX + exit * window.innerWidth * 0.78);
      const y = progress * (window.innerHeight * (0.05 + i * 0.035)) + waveY + exit * window.innerHeight * (i % 2 ? 0.55 : -0.6);
      const rotate = direction * (progress * 130 + Math.sin(progress * Math.PI * 2) * 28 + exit * 200);
      const scale = 1 - exit * 0.6;

      flower.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      const head = flower.querySelector(".flower-head");
      const petals = flower.querySelector(".petals");
      if (head) {
        head.style.transformBox = "view-box";
        head.style.transformOrigin = "110px 111px";
        head.style.transform = `rotate(${direction * close * 28}deg) scale(${1 - close * 0.16}, ${1 - close * 0.42})`;
      }
      if (petals) {
        petals.style.transformBox = "view-box";
        petals.style.transformOrigin = "110px 111px";
        petals.style.transform = `scale(${1 - close * 0.78}, ${1 - close * 0.9}) rotate(${direction * close * 35}deg)`;
      }
      flower.style.opacity = String(1 - exit * 0.96);
    });

    const title = section.querySelector(".bloom-title");
    if (title) {
      title.style.transform = `translate3d(0, ${progress * -window.innerHeight * 0.12}px, 0)`;
      title.style.opacity = String(1 - smooth(clamp((progress - 0.5) / 0.4, 0, 1)) * 0.55);
    }
  }

  function requestPaint() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(paint);
    }
  }

  window.addEventListener("scroll", requestPaint, { passive: true });
  window.addEventListener("resize", requestPaint);
  paint();
})();
