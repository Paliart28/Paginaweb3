document.addEventListener("DOMContentLoaded", () => {
  const headerHeight = 80; // altura del header fijo
  const stations = Array.from(document.querySelectorAll(".tren-station"));
  const trenIcon = document.querySelector(".tren-icon");

  if (!stations.length || !trenIcon) return;

  const sectionIds = stations.map(btn => btn.dataset.target);
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  // Posiciona el tren sobre la estación activa
  function updateTrainPosition(activeIndex) {
    const station = stations[activeIndex];
    const rect = station.getBoundingClientRect();
    const trackRect = station.parentElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relativeX = centerX - trackRect.left;
    trenIcon.style.left = `${relativeX}px`;
  }

  // Marca estación activa según el scroll
  function onScroll() {
    const scrollY = window.scrollY;
    let activeIndex = 0;

    sections.forEach((sec, idx) => {
      const top = sec.offsetTop - headerHeight - 120;
      if (scrollY >= top) {
        activeIndex = idx;
      }
    });

    stations.forEach((btn, idx) => {
      btn.classList.toggle("active", idx === activeIndex);
    });

    updateTrainPosition(activeIndex);
  }

  // Click en estaciones → scroll suave
  stations.forEach((btn, idx) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.dataset.target;
      const sec = document.getElementById(targetId);
      if (!sec) return;

      const top = sec.offsetTop - headerHeight - 40;
      window.scrollTo({
        top,
        behavior: "smooth"
      });
    });
  });

  // Inicial
  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", () => {
    // Recalcular posición al cambiar ancho
    onScroll();
  });

  // Primer ajuste después de pintar
  setTimeout(onScroll, 200);
});
