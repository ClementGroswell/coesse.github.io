<script>
const seasonMap = month => {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
};

const getSeason = () => seasonMap(new Date().getMonth() + 1);

const keywords = {
  spring: "spring nature city skyline",
  summer: "summer ocean city sunset",
  autumn: "autumn forest urban park",
  winter: "winter snow city night"
};

async function setDynamicBackground() {
  const season = getSeason();
  const url = `https://source.unsplash.com/2400x1600/?${keywords[season]}`;
  document.body.style.background = `url(${url}) center/cover fixed no-repeat`;
}

setDynamicBackground();
</script>
