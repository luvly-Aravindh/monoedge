export function run(){
var LANDING_URL='landing.html?v=1781847973';
var modal=document.getElementById('m');
function openM(){modal.classList.add('on');document.body.style.overflow='hidden';setTimeout(function(){var e=document.getElementById('fname');if(e)e.focus();},120);}
function closeM(){modal.classList.remove('on');document.body.style.overflow='';}
document.querySelectorAll('[data-open]').forEach(function(b){b.addEventListener('click',openM);});
document.getElementById('mx').addEventListener('click',closeM);
modal.addEventListener('click',function(e){if(e.target===modal)closeM();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('on'))closeM();});

(function(){
  function scrollField(el){
    if(!el||(el.tagName!=='INPUT'&&el.tagName!=='TEXTAREA'))return;
    var go=function(){el.scrollIntoView({block:'center',inline:'nearest',behavior:'smooth'});};
    setTimeout(go,50);setTimeout(go,320);
  }
  modal.addEventListener('focusin',function(e){scrollField(e.target);});
  function onResize(){
    var a=document.activeElement;
    if(!a||!modal.contains(a))return;
    if(a.tagName!=='INPUT'&&a.tagName!=='TEXTAREA')return;
    a.scrollIntoView({block:'center',inline:'nearest'});
  }
  if(window.visualViewport)window.visualViewport.addEventListener('resize',onResize);
  window.addEventListener('resize',onResize);
})();

function isEmail(v){return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);}

// Opt-in does NOT call Desk — one email only when they complete booking on landing.
document.getElementById('send').addEventListener('click',function(){
  var nm=document.getElementById('fname').value.trim();
  var em=document.getElementById('email').value.trim();
  var hpEl=document.getElementById('website');
  var hp=hpEl?hpEl.value:'';
  var err=document.getElementById('err');err.textContent='';
  if(hp){return;}
  if(nm.length<2){err.textContent='Please enter your full name.';return;}
  if(!isEmail(em)){err.textContent='Please enter a valid work email.';return;}

  var btn=this;
  btn.disabled=true;
  btn.classList.add('sent');
  btn.textContent='Sending it to your inbox...';

  location.href=LANDING_URL+'&from=guide&name='+encodeURIComponent(nm)+'&email='+encodeURIComponent(em);
});
;
(function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});})();
;
(function(){var el=document.getElementById('ticker');if(!el)return;var TK=[{nm:'Vikram Iyer',c:'Pune, MH',a:'Just downloaded the guide',t:'2 min ago'},{nm:'Anjali Reddy',c:'Coimbatore, TN',a:'Just requested a demo',t:'14 min ago'},{nm:'Deepak Agarwal',c:'Rajkot, GJ',a:'Just downloaded the guide',t:'1 hour ago'},{nm:'Karthik Menon',c:'Hyderabad, TS',a:'Just booked a demo',t:'3 hours ago'},{nm:'Nikhil Shah',c:'Ahmedabad, GJ',a:'Just downloaded the guide',t:'yesterday'},{nm:'Sandeep Patil',c:'Nagpur, MH',a:'Just requested a demo',t:'2 days ago'}];var i=0;function show(){var e=TK[i%TK.length];i++;document.getElementById('tkName').textContent=e.nm;document.getElementById('tkCity').textContent=e.c;document.getElementById('tkAct').textContent=e.a;document.getElementById('tkTime').textContent=e.t;el.classList.add('on');setTimeout(function(){el.classList.remove('on');},6000);}setTimeout(function(){show();setInterval(show,11000);},4200);})();
}
