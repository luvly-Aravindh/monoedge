export function run(){
var LEAD_WEBHOOK_URL='submit.php';
var LANDING_URL='landing.html?v=1781847973';
var modal=document.getElementById('m');
function openM(){modal.classList.add('on');document.body.style.overflow='hidden';setTimeout(function(){var e=document.getElementById('fname');if(e)e.focus();},120);}
function closeM(){modal.classList.remove('on');document.body.style.overflow='';}
document.querySelectorAll('[data-open]').forEach(function(b){b.addEventListener('click',openM);});
document.getElementById('mx').addEventListener('click',closeM);
modal.addEventListener('click',function(e){if(e.target===modal)closeM();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('on'))closeM();});
function isEmail(v){return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);}
document.getElementById('send').addEventListener('click',function(){
  var nm=document.getElementById('fname').value.trim();
  var em=document.getElementById('email').value.trim();
  var err=document.getElementById('err');err.textContent='';
  if(nm.length<2){err.textContent='Please enter your full name.';return;}
  if(!isEmail(em)){err.textContent='Please enter a valid work email.';return;}
  var btn=this;btn.disabled=true;btn.classList.add('sent');btn.textContent='Sending it to your inbox...';
  var payload={name:nm,email:em,lead_magnet:'7 Ways a Manufacturing Plant Dies',source:'optin',ts:new Date().toISOString()};
  try{fetch(LEAD_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),keepalive:true});}catch(e){}
  setTimeout(function(){location.href=LANDING_URL+'&from=guide&name='+encodeURIComponent(nm)+'&email='+encodeURIComponent(em);},1100);
});
;
(function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});})();
;
(function(){var el=document.getElementById('ticker');if(!el)return;var TK=[{nm:'Vikram Iyer',c:'Pune, MH',a:'Just downloaded the guide',t:'2 min ago'},{nm:'Anjali Reddy',c:'Coimbatore, TN',a:'Just requested a demo',t:'14 min ago'},{nm:'Deepak Agarwal',c:'Rajkot, GJ',a:'Just downloaded the guide',t:'1 hour ago'},{nm:'Karthik Menon',c:'Hyderabad, TS',a:'Just booked a demo',t:'3 hours ago'},{nm:'Nikhil Shah',c:'Ahmedabad, GJ',a:'Just downloaded the guide',t:'yesterday'},{nm:'Sandeep Patil',c:'Nagpur, MH',a:'Just requested a demo',t:'2 days ago'}];var i=0;function show(){var e=TK[i%TK.length];i++;document.getElementById('tkName').textContent=e.nm;document.getElementById('tkCity').textContent=e.c;document.getElementById('tkAct').textContent=e.a;document.getElementById('tkTime').textContent=e.t;el.classList.add('on');setTimeout(function(){el.classList.remove('on');},6000);}setTimeout(function(){show();setInterval(show,11000);},4200);})();
}
