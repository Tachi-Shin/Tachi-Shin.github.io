// Minimal particles background without external libs
window.initParticles = function(canvasId){
  const c = document.getElementById(canvasId);
  if(!c) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const ctx = c.getContext("2d");
  let W=0,H=0, nodes=[];
  function resize(){
    const r = c.getBoundingClientRect();
    W = c.width = Math.floor(r.width * dpr);
    H = c.height = Math.floor(r.height * dpr);
    nodes = Array.from({length: Math.max(32, Math.floor(W*H/100000))}, ()=> ({
      x: Math.random()*W, y: Math.random()*H,
      vx:(Math.random()-.5)*.3*dpr, vy:(Math.random()-.5)*.3*dpr
    }));
  }
  function step(){
    ctx.clearRect(0,0,W,H);
    for(const p of nodes){
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
    }
    // draw
    ctx.globalAlpha = 0.8;
    for(const p of nodes){
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5*dpr, 0, Math.PI*2);
      ctx.fillStyle = "#7aa3ff";
      ctx.fill();
    }
    // lines
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<i+30 && j<nodes.length;j++){
        const a=nodes[i], b=nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y; const dist = Math.hypot(dx,dy);
        if(dist<90*dpr){
          ctx.globalAlpha = (1 - dist/(90*dpr)) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = "#7aa3ff";
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  resize();
  step();
  new ResizeObserver(resize).observe(c);
};
