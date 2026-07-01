export function run(){
(function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});})();
;
(function(){
  var P=new URLSearchParams(location.search),nm=(P.get('name')||'').trim();
  if(nm){document.getElementById('h1').textContent="You're booked, "+nm.split(' ')[0]+'!';}
  var c=document.getElementById('cft'),x=c.getContext('2d'),W,H;
  function size(){W=c.width=innerWidth;H=c.height=innerHeight;}size();addEventListener('resize',size);
  var cols=['#5e0ed7','#7b34ec','#b9a6ff','#e0407a','#2c8457','#ffffff'],P2=[],N=150;
  for(var i=0;i<N;i++){P2.push({x:Math.random()*W,y:-20-Math.random()*H*0.5,r:5+Math.random()*7,
    c:cols[i%cols.length],vy:2+Math.random()*3.5,vx:-1.5+Math.random()*3,a:Math.random()*6.28,va:-0.2+Math.random()*0.4,t:Math.random()>0.5});}
  var start=Date.now(),DUR=3400;
  function frame(){var el=Date.now()-start;x.clearRect(0,0,W,H);var fade=el>DUR-700?Math.max(0,(DUR-el)/700):1;
    for(var i=0;i<P2.length;i++){var p=P2[i];p.y+=p.vy;p.x+=p.vx;p.a+=p.va;x.save();x.globalAlpha=fade;x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;
      if(p.t){x.fillRect(-p.r/2,-p.r/2,p.r,p.r*0.6);}else{x.beginPath();x.arc(0,0,p.r/2,0,6.28);x.fill();}x.restore();}
    if(el<DUR){requestAnimationFrame(frame);}else{x.clearRect(0,0,W,H);}}
  requestAnimationFrame(frame);
})();
}
