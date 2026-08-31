export function run(){
var LANDING_URL='landing.html?from=guide&v=1781847973';
var modal=document.getElementById('m');
var sendBtn=document.getElementById('send');
if(!modal||!sendBtn)return;

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
function digits10(v){
  var d=String(v||'').replace(/[^0-9]/g,'');
  if(d.length===12&&d.indexOf('91')===0)return d.slice(2);
  if(d.length===11&&d.indexOf('0')===0)return d.slice(1);
  return d.slice(0,10);
}

var phoneInput=document.getElementById('phone');
if(phoneInput){
  phoneInput.addEventListener('input',function(){
    this.value=digits10(this.value);
    var pe=document.getElementById('phone_err');
    if(pe&&pe.textContent&&(this.value.length===10||this.value.length===0)){
      pe.textContent='';pe.hidden=true;this.classList.remove('input-err');
    }
  });
  phoneInput.addEventListener('blur',function(){
    var pe=document.getElementById('phone_err');
    if(this.value.length>0&&this.value.length!==10){
      if(pe){pe.textContent='Please enter a valid 10 digit mobile number.';pe.hidden=false;}
      this.classList.add('input-err');
    }
  });
}

var submitting=false;

function handleSubmit(){
  if(submitting)return;
  var nm=(document.getElementById('fname')||{}).value;
  nm=nm?nm.trim():'';
  var em=(document.getElementById('email')||{}).value;
  em=em?em.trim():'';
  var phoneEl=document.getElementById('phone');
  var ph=phoneEl?digits10(phoneEl.value):'';
  var hpEl=document.getElementById('bb_hp');
  var hp=hpEl?hpEl.value.trim():'';
  var err=document.getElementById('err');
  var phoneErr=document.getElementById('phone_err');
  if(err)err.textContent='';
  if(phoneErr){phoneErr.textContent='';phoneErr.hidden=true;}
  if(phoneEl)phoneEl.classList.remove('input-err');

  // Honeypot filled = bot; ignore silently.
  if(hp)return;

  if(nm.length<2){if(err)err.textContent='Please enter your full name.';return;}
  if(!isEmail(em)){if(err)err.textContent='Please enter a valid work email.';return;}
  if(ph.length!==10){
    if(phoneErr){phoneErr.textContent='Please enter a valid 10 digit mobile number.';phoneErr.hidden=false;}
    if(phoneEl){phoneEl.classList.add('input-err');phoneEl.focus();}
    return;
  }

  submitting=true;
  sendBtn.disabled=true;
  sendBtn.classList.add('sent');
  sendBtn.textContent='Sending it to your inbox...';

  var phoneE164='+91'+ph;
  location.href=
    LANDING_URL+
    '&name='+encodeURIComponent(nm)+
    '&email='+encodeURIComponent(em)+
    '&phone='+encodeURIComponent(phoneE164);
}

sendBtn.addEventListener('click',handleSubmit);
sendBtn.addEventListener('keydown',function(e){
  if(e.key==='Enter'||e.key===' '){e.preventDefault();handleSubmit();}
});
;
(function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});})();
;
(function(){var el=document.getElementById('ticker');if(!el)return;var TK=[{nm:'Vikram Iyer',c:'Pune, MH',a:'Just downloaded the guide',t:'2 min ago'},{nm:'Anjali Reddy',c:'Coimbatore, TN',a:'Just requested a demo',t:'14 min ago'},{nm:'Deepak Agarwal',c:'Rajkot, GJ',a:'Just downloaded the guide',t:'1 hour ago'},{nm:'Karthik Menon',c:'Hyderabad, TS',a:'Just booked a demo',t:'3 hours ago'},{nm:'Nikhil Shah',c:'Ahmedabad, GJ',a:'Just downloaded the guide',t:'yesterday'},{nm:'Sandeep Patil',c:'Nagpur, MH',a:'Just requested a demo',t:'2 days ago'}];var i=0;function show(){var e=TK[i%TK.length];i++;document.getElementById('tkName').textContent=e.nm;document.getElementById('tkCity').textContent=e.c;document.getElementById('tkAct').textContent=e.a;document.getElementById('tkTime').textContent=e.t;el.classList.add('on');setTimeout(function(){el.classList.remove('on');},6000);}setTimeout(function(){show();setInterval(show,11000);},4200);})();
}
