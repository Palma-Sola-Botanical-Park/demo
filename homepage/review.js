(function(){
 'use strict';
 const slides=[...document.querySelectorAll('.hero-slide')], control=document.getElementById('pausePhotos');
 let current=0,paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const update=()=>{if(control){control.textContent=paused?'Play photos':'Pause photos';control.setAttribute('aria-pressed',String(paused));}};
 update();
 if(control)control.addEventListener('click',()=>{paused=!paused;update();});
 window.setInterval(()=>{if(paused||document.hidden||slides.length<2)return;slides[current].classList.remove('on');current=(current+1)%slides.length;slides[current].classList.add('on');},document.body.classList.contains('current')?5000:12000);
 const stories=document.querySelector('.review-stories');
 if(stories){
  const cards=[...stories.children];
  if(document.body.classList.contains('discover')){
   const featured=cards.find(c=>c.querySelector('h3')?.textContent==='Northern Cardinal');
   if(featured)stories.prepend(featured);
  }
  const ordered=[...stories.children];
  if(ordered.length>3){
   let expanded=false;const b=document.createElement('button');b.type='button';b.className='story-toggle';b.setAttribute('aria-controls','rightNowStrip');
   const refresh=()=>{ordered.forEach((c,i)=>{c.hidden=!expanded&&i>2;});b.textContent=expanded?'Show the first three stories':`See all ${ordered.length} park stories`;b.setAttribute('aria-expanded',String(expanded));};
   b.addEventListener('click',()=>{expanded=!expanded;refresh();});stories.after(b);refresh();
  }
 }
 const toggle=document.getElementById('navHamburger'),menu=document.getElementById('navMobile');
 if(toggle&&menu){toggle.setAttribute('aria-expanded','false');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));menu.style.display=open?'block':'none';});}
})();
