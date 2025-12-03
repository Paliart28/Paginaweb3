document.addEventListener("DOMContentLoaded", () => {
  const ids = [
    "inicio",
    "san-bernardo",
    "senializacion",
    "territorio",
    "patrones",
    "metodologia",
    "equipo"
  ];

  const sections = ids.map(id => document.getElementById(id));
  const stations = [...document.querySelectorAll(".station")];
  const train = document.getElementById("train-sprite");

  function activeIndex() {
    let idx = 0;
    const threshold = window.innerHeight * 0.35;

    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= threshold) idx = i;
    });

    return idx;
  }

  function updateTrain() {
    const idx = activeIndex();

    stations.forEach((s, i) => {
      s.classList.toggle("is-active", i === idx);
    });

    const first = stations[0];
    const last = stations[stations.length - 1];

    const start = first.offsetLeft + first.offsetWidth / 2;
    const end = last.offsetLeft + last.offsetWidth / 2;

    const t = idx / (stations.length - 1);
    const x = start + (end - start) * t;

    train.style.transform = `translateX(${x}px)`;
  }

  stations.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      sections[i].scrollIntoView({ behavior: "smooth" });
    });
  });

  window.addEventListener("scroll", updateTrain);
  window.addEventListener("resize", updateTrain);

  setTimeout(updateTrain, 200);
});
function moverTren(index) {
    const total = estaciones.length - 1;
    const porcentaje = (index / total) * 100;
    document.querySelector(".train-icon").style.left = porcentaje + "%";
}
