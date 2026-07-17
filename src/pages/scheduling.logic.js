export function run(){
var P=new URLSearchParams(location.search);
var nm=(P.get('name')||'').trim(),em=(P.get('email')||'').trim(),co=(P.get('company')||'').trim();
if(nm){document.getElementById('r_name').textContent=nm;document.getElementById('greet').textContent='You are one step away, '+nm.split(' ')[0]+'.';}
else{document.getElementById('row_name').style.display='none';}
if(em){document.getElementById('r_email').textContent=em;}else{document.getElementById('row_email').style.display='none';}
if(co){document.getElementById('r_co').textContent=co;}else{document.getElementById('row_co').style.display='none';}
var q='hide_gdpr_banner=1&primary_color=5e0ed7';
if(nm)q+='&name='+encodeURIComponent(nm);
if(em)q+='&email='+encodeURIComponent(em);
var calUrl='https://calendly.com/krishna-monoedge/new-meeting?'+q;
document.getElementById('callink').href=calUrl;
function initCal(){
  if(window.Calendly){
    document.getElementById('cal').innerHTML='';
    Calendly.initInlineWidget({url:calUrl,parentElement:document.getElementById('cal'),prefill:{name:nm,email:em}});
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
