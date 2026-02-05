alert("bg.js running");
function seasonFromMonth(m) {
  if (m >= 3 && m <= 5) return "spring";
  if (m >= 6 && m <= 8) return "summer";
  if (m >= 9 && m <= 11) return "autumn";
  return "winter";
}

const season = seasonFromMonth(new Date().getMonth() + 1);

const keywords = {
  spring: "spring nature city skyline",
  summer: "summer ocean city sunset",
  autumn: "autumn forest urban park",
  winter: "winter snow city night"
};

const imgUrl = `https://source.unsplash.com/2400x1600/?${keywords[season]}`;

document.body.style.backgroundImage = `url(${imgUrl})`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundAttachment = "fixed";
