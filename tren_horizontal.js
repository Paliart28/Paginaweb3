document.addEventListener("DOMContentLoaded", function () {
  const sectionIds = [
    "inicio",
    "san-bernardo",
    "senializacion",
    "territorio",
    "patrones",
    "metodologia",
    "equipo"
  ];

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const stations = Array.from(document.querySelectorAll(".station"));
  const train = document.getElementById("train-sprite");
  const track = document.querySelector(".train-track");

  if (!train || !track || stations.length === 0 || sections.length === 0) return;

  // Scroll suave al hacer clic en estaciones
  stations.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const targetId = sectionIds[idx];
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  function getActiveIndex() {
    let active = 0;
    const viewportThreshold = window.innerHeight * 0.3;

    sections.forEach((sec, index) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= viewportThreshold) {
        active = index;
      }
    });

    return active;
  }

  function updateTrain() {
    const activeIndex = getActiveIndex();

    stations.forEach((btn, idx) => {
      btn.classList.toggle("is-active", idx === activeIndex);
    });

    // Posición del tren: entre el primer y último botón
    const first = stations[0];
    const last = stations[stations.length - 1];

    const firstCenter = first.offsetLeft + first.offsetWidth / 2;
    const lastCenter = last.offsetLeft + last.offsetWidth / 2;

    const t = stations.length > 1 ? activeIndex / (stations.length - 1) : 0;
    const posX = firstCenter + (lastCenter - firstCenter) * t;

    train.style.transform = `translateX(${posX}px)`;
  }

  window.addEventListener("scroll", updateTrain);
  window.addEventListener("resize", updateTrain);

  // Primera posición
  setTimeout(updateTrain, 150);
});
