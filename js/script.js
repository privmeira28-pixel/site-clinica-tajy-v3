(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // comparador antes/depois
  var ba=document.getElementById('ba');
  if(ba){
    var r=ba.querySelector('input'), touched=false;
    function set(v){ba.style.setProperty('--pos',v+'%');}
    r.addEventListener('input',function(){touched=true;set(r.value)});
    set(r.value);
    // mostra uma vez que dá para arrastar
    if(!reduce){
      var t0=null;
      setTimeout(function(){requestAnimationFrame(function step(t){
        if(touched) return;
        if(t0===null) t0=t;
        var p=Math.min((t-t0)/1800,1);
        var v=50+Math.sin(p*Math.PI*2)*22*(1-p);
        r.value=v; set(v);
        if(p<1) requestAnimationFrame(step);
      })},700);
    }
  }

  // elementos aparecem ao rolar
  var els=document.querySelectorAll('.reveal');
  if(reduce||!('IntersectionObserver' in window)){
    els.forEach(function(e){e.classList.add('in')});
  }else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
    },{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(e){io.observe(e)});
  }

  // FAQ: abre uma pergunta por vez
  var ds=document.querySelectorAll('.faq details');
  ds.forEach(function(d){d.addEventListener('toggle',function(){
    if(d.open) ds.forEach(function(o){if(o!==d) o.open=false});
  })});
})();
