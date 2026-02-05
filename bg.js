// ==========================
// Coesse 动态背景 vUltimate
// 自动季节 + 2K风景 + 滚动视差 + 粒子动效 + 多图循环 + 滚动浮动元素
// ==========================

const keywordsMap = {
  spring: ["spring nature", "spring city", "flowers city"],
  summer: ["summer beach", "summer city skyline", "sunny city"],
  autumn: ["autumn forest", "autumn park", "autumn city"],
  winter: ["winter snow", "winter city skyline", "winter nature"]
};

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

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function preloadImage(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
  });
}

async function setDynamicBackground() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const month = new Date().getMonth() + 1;
    const latitude = data.latitude || 0;

    const season = getSeason(month, latitude);
    const keywordArray = keywordsMap[season];

    // 随机选择 4 张图片循环使用
    const selectedKeywords = [];
    for (let i = 0; i < 4; i++) selectedKeywords.push(randomChoice(keywordArray));

    const imageUrls = selectedKeywords.map(
      k => `https://source.unsplash.com/2560x1440/?${encodeURIComponent(k)}`
    );

    await Promise.all(imageUrls.map(url => preloadImage(url)));

    let index = 0;
    const setBackground = () => {
      document.body.style.transition = "background-image 1.5s ease-in-out";
      document.body.style.backgroundImage = `url(${imageUrls[index]})`;
      index = (index + 1) % imageUrls.length;
    };

    setBackground();
    setInterval(setBackground, 20000);

    initParticles();
    initScrollEffects();
    console.log("Dynamic background loaded with cycle:", imageUrls);
  } catch (err) {
    console.error("Failed to load dynamic background:", err);
  }
}

// ==========================
// 粒子 + 滚动视差
// ==========================
function initParticles() {
  const canvas = document.createElement("canvas");
  canvas.id = "bgParticles";
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 0;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particleCount = Math.min(120, Math.floor(width / 12));
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      speedY: Math.random() * 0.4 + 0.1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    particles.forEach(p => {
      p.y += p.speedY;
      if (p.y > height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // 滚动视差
  window.addEventListener("scroll", () => {
    canvas.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  });
}

// ==========================
// 页面滚动浮动动画
// ==========================
function initScrollEffects() {
  const sections = document.querySelectorAll(".section, .hero");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    sections.forEach((sec, i) => {
      sec.style.transform = `translateY(${scrollY * 0.03 * (i+1)}px)`;
    });
  });
}

// ==========================
// 调用
// ==========================
setDynamicBackground();
