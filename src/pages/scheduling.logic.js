export function run(){
var P=new URLSearchParams(location.search);
var nm=(P.get('name')||'').trim();
var em=(P.get('email')||'').trim();
var co=(P.get('company')||'').trim();
var ph=(P.get('phone')||'').trim();
// Normalize to +91XXXXXXXXXX for Calendly when only 10 digits were passed.
var phoneDigits=ph.replace(/[^0-9]/g,'');
if(phoneDigits.length===10)ph='+91'+phoneDigits;
else if(phoneDigits.length===12&&phoneDigits.indexOf('91')===0)ph='+'+phoneDigits;
else if(ph&&ph.charAt(0)!=='+'&&phoneDigits.length>0)ph='+'+phoneDigits;

if(nm){document.getElementById('r_name').textContent=nm;document.getElementById('greet').textContent='You are one step away, '+nm.split(' ')[0]+'.';}
else{document.getElementById('row_name').style.display='none';}
if(em){document.getElementById('r_email').textContent=em;}else{document.getElementById('row_email').style.display='none';}
if(co){document.getElementById('r_co').textContent=co;}else{document.getElementById('row_co').style.display='none';}

var q='hide_gdpr_banner=1&primary_color=5e0ed7';
if(nm)q+='&name='+encodeURIComponent(nm);
if(em)q+='&email='+encodeURIComponent(em);
// Phone prefill: location= works for phone-call events; a1= for invitee/custom phone questions.
if(ph){
  q+='&location='+encodeURIComponent(ph);
  q+='&a1='+encodeURIComponent(ph);
}
var calUrl='https://calendly.com/krishna-monoedge/new-meeting?'+q;
document.getElementById('callink').href=calUrl;

var prefill={name:nm,email:em};
if(ph){
  prefill.location=ph;
  prefill.customAnswers={a1:ph};
  // If company is also an invitee question (often a2), pass it too.
  if(co)prefill.customAnswers.a2=co;
}

function initCal(){
  if(window.Calendly){
    document.getElementById('cal').innerHTML='';
    Calendly.initInlineWidget({
      url:calUrl,
      parentElement:document.getElementById('cal'),
      prefill:prefill
    });
    return true;
  }
  return false;
}
if(!initCal()){var iv=setInterval(function(){if(initCal())clearInterval(iv);},150);window.addEventListener('load',initCal);
  setTimeout(function(){
    if(!window.Calendly){
      var fb=document.querySelector('.calfallback');
      if(fb){fb.querySelector('p').textContent='This is taking longer than usual.';var lk=document.getElementById('callink');if(lk){lk.classList.add('btn-xl');}}
    }
  },6000);
}
function isCal(e){return e.data&&typeof e.data==='object'&&e.data.event&&String(e.data.event).indexOf('calendly')===0;}
window.addEventListener('message',function(e){
  if(isCal(e)&&e.data.event==='calendly.event_scheduled'){
    var t='thankyou.html';var qp=[];
    if(nm)qp.push('name='+encodeURIComponent(nm));
    if(em)qp.push('email='+encodeURIComponent(em));
    setTimeout(function(){location.href=t+(qp.length?'?'+qp.join('&'):'');},700);
  }
});
;
(function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});})();
}
