(() => {
    "use strict";
    const $ = (s, r=document) => r.querySelector(s);
    const $$ = (s, r=document) => [...r.querySelectorAll(s)];

    const openButton = $("#openButton");
    const musicMiniButton = $("#musicMiniButton");
    const playButton = $("#playButton");
    const audio = $("#audio");
    const musicPlayer = $("#musicPlayer");
    const progressFill = $("#progressFill");
    const trackCurrent = $("#trackCurrent");
    const trackDuration = $("#trackDuration");
    const imageModal = $("#imageModal");
    const modalImage = $("#modalImage");
    const modalCaption = $("#modalCaption");
    const modalClose = $("#modalClose");
    const surpriseButton = $("#surpriseButton");
    const surpriseMessage = $("#surpriseMessage");
    const birdObject = $("#birdObject");

    openButton?.addEventListener("click", () => setTimeout(() => $("#music")?.scrollIntoView({behavior:"smooth"}), 120));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {threshold:.13});
    $$(".reveal").forEach(el => observer.observe(el));

    const leafLayer = $("#leafLayer"), particleLayer = $("#particleLayer");
    function spawnLeaf(){
        if(!leafLayer)return;
        const leaf=document.createElement("span"); leaf.className="leaf";
        leaf.style.left=`${Math.random()*100}vw`; leaf.style.top="-20px";
        leaf.style.animationDuration=`${7+Math.random()*7}s`;
        leaf.style.animationDelay=`${Math.random()*2}s`;
        leaf.style.transform=`rotate(${Math.random()*180}deg) scale(${.6+Math.random()*.9})`;
        leafLayer.appendChild(leaf); setTimeout(()=>leaf.remove(),16000);
    }
    function spawnParticle(){
        if(!particleLayer)return;
        const p=document.createElement("span"); p.className="float-particle";
        p.style.left=`${Math.random()*100}vw`; p.style.top=`${55+Math.random()*45}vh`;
        p.style.animationDuration=`${7+Math.random()*7}s`; p.style.animationDelay=`${Math.random()*3}s`;
        particleLayer.appendChild(p); setTimeout(()=>p.remove(),16000);
    }
    for(let i=0;i<7;i++)spawnLeaf(); for(let i=0;i<8;i++)spawnParticle();
    setInterval(spawnLeaf,2200); setInterval(spawnParticle,1800);

    function formatTime(s){if(!Number.isFinite(s))return"00:00";return `${Math.floor(s/60).toString().padStart(2,"0")}:${Math.floor(s%60).toString().padStart(2,"0")}`;}
    function setPlaying(playing){
        musicPlayer?.classList.toggle("playing",playing);
        if(playButton){playButton.setAttribute("aria-label",playing?"Пауза":"Воспроизвести"); $(".play-icon",playButton).textContent=playing?"Ⅱ":"▶";}
    }
    async function toggleAudio(){
        if(!audio)return;
        if(audio.paused){
            try{await audio.play();setPlaying(true)}catch(e){alert("Песня пока не найдена. Положи свой файл song.mp3 в папку static/music/");}
        }else{audio.pause();setPlaying(false)}
    }
    playButton?.addEventListener("click",toggleAudio); musicMiniButton?.addEventListener("click",toggleAudio);
    audio?.addEventListener("loadedmetadata",()=>trackDuration.textContent=formatTime(audio.duration));
    audio?.addEventListener("timeupdate",()=>{const p=audio.duration?(audio.currentTime/audio.duration)*100:0;progressFill.style.width=`${p}%`;trackCurrent.textContent=formatTime(audio.currentTime)});
    audio?.addEventListener("play",()=>setPlaying(true)); audio?.addEventListener("pause",()=>setPlaying(false));
    audio?.addEventListener("ended",()=>{setPlaying(false);progressFill.style.width="0%"});
    $(".progress")?.addEventListener("click",e=>{if(!audio?.duration)return;const r=e.currentTarget.getBoundingClientRect();audio.currentTime=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width))*audio.duration});

    $$(".gallery-card").forEach(card=>{
        const path=card.dataset.image?.trim();
        if(path){const ph=$(".photo-placeholder",card);ph.style.backgroundImage=`url("${path}")`;card.classList.add("has-image")}
        card.addEventListener("click",()=>{
            if(!path){card.animate([{transform:"scale(1)"},{transform:"scale(1.025)"},{transform:"scale(1)"}],{duration:420});return;}
            modalImage.src=path; modalImage.alt=card.dataset.caption||"Фотография"; modalCaption.textContent=card.dataset.caption||"";
            imageModal.classList.add("open"); imageModal.setAttribute("aria-hidden","false"); document.body.classList.add("locked");
        });
    });
    function closeModal(){imageModal?.classList.remove("open");imageModal?.setAttribute("aria-hidden","true");document.body.classList.remove("locked")}
    modalClose?.addEventListener("click",closeModal); imageModal?.addEventListener("click",e=>{if(e.target===imageModal)closeModal()});
    document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

    surpriseButton?.addEventListener("click",()=>{
        surpriseMessage.classList.toggle("show"); birdObject?.classList.toggle("fly");
        surpriseButton.textContent=surpriseMessage.classList.contains("show")?"Пусть у тебя будет своё красивое небо. 🕊️":"А если бы ты могла выбрать… 🕊️";
    });

    let finaleLaunched=false;
    const finaleObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(entry.isIntersecting&&!finaleLaunched){finaleLaunched=true;setTimeout(()=>createConfetti(55),900)}
    }),{threshold:.45});
    const finale=$("#finale"); if(finale)finaleObserver.observe(finale);
    function createConfetti(amount=40){
        const fragment=document.createDocumentFragment();
        const colors=["#c7a65c","#ead49a","#6f9c79","#3f745b","#d9e4d6"];
        for(let i=0;i<amount;i++){
            const piece=document.createElement("span"); piece.className="confetti"; piece.style.left=`${Math.random()*100}vw`;
            piece.style.setProperty("--drift",`${(Math.random()-.5)*260}px`); piece.style.animationDelay=`${Math.random()*1.4}s`;
            piece.style.background=colors[Math.floor(Math.random()*colors.length)]; fragment.appendChild(piece); setTimeout(()=>piece.remove(),5200);
        }
        document.body.appendChild(fragment);
    }

    if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
        let ticking=false;
        window.addEventListener("scroll",()=>{
            if(ticking)return; ticking=true;
            requestAnimationFrame(()=>{
                const y=window.scrollY;
                $$(".hero-mist").forEach((mist,i)=>mist.style.transform=`translateY(${y*(i?.035:-.025)}px) rotate(${i?12:-8}deg)`);
                const pavilion=$(".distant-pavilion"); if(pavilion)pavilion.style.transform=`translateY(${Math.min(y*.03,35)}px) scale(.98)`;
                ticking=false;
            });
        },{passive:true});
    }  // =========================
  // МУЗЫКА
  // =========================

  const musicButton = document.getElementById("musicMiniButton");

  if (musicButton) {
    const audio = new Audio("/static/music/song.mp3");

    audio.loop = true;
    audio.volume = 0.65;

    musicButton.addEventListener("click", async () => {
      try {
        if (audio.paused) {
          await audio.play();

          musicButton.classList.add("is-playing");
          musicButton.setAttribute("aria-label", "Поставить музыку на паузу");

          const label = musicButton.querySelector("span:last-child");
          if (label) label.textContent = "пауза";
        } else {
          audio.pause();

          musicButton.classList.remove("is-playing");
          musicButton.setAttribute("aria-label", "Включить музыку");

          const label = musicButton.querySelector("span:last-child");
          if (label) label.textContent = "музыка";
        }
      } catch (error) {
        console.error("Не удалось воспроизвести музыку:", error);
      }
    });

    audio.addEventListener("ended", () => {
      musicButton.classList.remove("is-playing");
    });
}

})();
