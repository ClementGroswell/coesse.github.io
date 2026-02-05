const keywordsMap = {
  spring: ["spring nature","spring city","flowers city"],
  summer: ["summer beach","summer city skyline","sunny city"],
  autumn: ["autumn forest","autumn park","autumn city"],
  winter: ["winter snow","winter city skyline","winter nature"]
};

// 获取用户位置，如果失败使用默认
async function getUserLatitude() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.latitude || 40; // 默认北半球
  } catch {
    return 40;
  }
}

function getSeason(month, latitude) {
  if (latitude >= 0) {
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
  } else {
    if (month >= 3 && month <= 5) return "autumn";
    if (month >= 6 && month <= 8) return "winter";
    if (month >= 9 && month <= 11) return "spring";
    return "summer";
  }
}

function randomChoice(arr){return arr[Math.floor(Math.random()*arr.length)];}
function preloadImage(url){return new Promise(r=>{const i=new Image();i.src=url;i.onload=r;});}

async function setDynamicBackground() {
  const latitude = await getUserLatitude();
  const month = new Date().getMonth()+1;
  const season = getSeason(month, latitude);
  const keywordArray = keywordsMap[season];

  const imageUrls = [];
  for(let i=0;i<3;i++) imageUrls.push(`https://source.unsplash.com/2560x1440/?${encodeURIComponent(randomChoice(keywordArray))}`);
  await Promise.all(imageUrls.map(preloadImage));

  let index=0;
  const setBG=()=>{document.body.style.backgroundImage=`url(${imageUrls[index]})`; index=(index+1)%imageUrls.length;}
  setBG();
  setInterval(setBG,20000);

  initParticles();
  initScrollEffects();
}

// 粒子
function initParticles(){
  const canvas=document.createElement("canvas");canvas.id="bgParticles";canvas.style.position="fixed";
  canvas.style.top=0;canvas.style.left=0;canvas.style.width="100%";canvas.style.height="100%";
  canvas.style.pointerEvents="none";canvas.style.zIndex=0;document.body.appendChild(canvas);
  const ctx=canvas.getContext("2d");let width=canvas.width=window.innerWidth,height=canvas.height=window.innerHeight;
  const particles=[];const particleCount=Math.min(80,Math.floor(width/12));
  for(let i=0;i<particleCount;i++) particles.push({x:Math.random()*width,y:Math.random()*height,radius:Math.random()*2+0.5,speedY:Math.random()*0.3+0.1});
  function animate(){ctx.clearRect(0,0,width,height);ctx.fillStyle="rgba(255,255,255,0.25)";particles.forEach(p=>{p.y+=p.speedY;if(p.y>height)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);ctx.fill();});requestAnimationFrame(animate);}
  animate();
  window.addEventListener("resize",()=>{width=canvas.width=window.innerWidth;height=canvas.height=window.innerHeight;});
  window.addEventListener("scroll",()=>{canvas.style.transform=`translateY(${window.scrollY*0.2}px)`;});
}

// 页面滚动浮动
function initScrollEffects(){
  const sections=document.querySelectorAll(".section,.hero");
  window.addEventListener("scroll",()=>{const scrollY=window.scrollY;sections.forEach((s,i)=>{s.style.transform=`translateY(${scrollY*0.03*(i+1)}px)`;});});
}

setDynamicBackground();
