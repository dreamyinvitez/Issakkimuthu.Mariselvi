(() => {
  const wedding = new Date('2026-12-10T09:00:00+05:30');
  const parts = ['days','hours','minutes','seconds'];
  function updateCountdown(){
    let diff = Math.max(0, wedding.getTime() - Date.now());
    const vals=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
    parts.forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=String(vals[i]).padStart(2,'0')});
    if(diff===0){const note=document.querySelector('.countdown-note');if(note)note.textContent='The celebration day is here — let the blessings begin!'}
  }
  updateCountdown();setInterval(updateCountdown,1000);
  document.getElementById('openInvitation').addEventListener('click',()=>{
    startMusic();const cover=document.getElementById('cover');cover.classList.add('opened');cover.setAttribute('aria-label','Invitation opened');
    setTimeout(()=>{cover.style.display='none';document.getElementById('welcome').scrollIntoView({behavior:'smooth',block:'start'})},1000);
  });
  const music=document.getElementById('bgMusic'), toggle=document.getElementById('musicToggle');
  let startRequested=false;
  function setMusicState(isPlaying){
    toggle.classList.toggle('playing',isPlaying);
    toggle.setAttribute('aria-label',isPlaying?'Pause wedding music':'Play wedding music');
    toggle.title=isPlaying?'Pause wedding music':'Tap to play wedding music';
  }
  async function startMusic(){
    if(startRequested&&!music.paused)return;
    startRequested=true;
    try{await music.play();setMusicState(true)}catch(e){startRequested=false;setMusicState(false)}
  }
  function toggleMusic(){if(music.paused){startMusic()}else{music.pause();startRequested=false;setMusicState(false)}}
  toggle.addEventListener('click',toggleMusic);
  music.addEventListener('ended',()=>{startRequested=false;setMusicState(false)});
  music.addEventListener('error',()=>{startRequested=false;setMusicState(false);toggle.title='Audio could not be played; try reloading the page'});
  setMusicState(false);
  startMusic();
  document.addEventListener('pointerdown',event=>{if(!event.target.closest('#musicToggle'))startMusic()},{once:true});  const sections=document.querySelectorAll('.section');sections.forEach(s=>s.classList.add('reveal'));
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});sections.forEach(s=>observer.observe(s));
  const field=document.querySelector('.petal-field');function petal(){if(document.hidden)return;const el=document.createElement('i');el.className='petal';el.style.left=Math.random()*100+'vw';el.style.animationDuration=(7+Math.random()*7)+'s';el.style.setProperty('--drift',(Math.random()*140-70)+'px');el.style.background=['#e8b4a3','#f1d079','#fff0d4'][Math.floor(Math.random()*3)];field.appendChild(el);setTimeout(()=>el.remove(),14500)}setInterval(petal,1100);
})();
