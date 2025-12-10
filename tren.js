// ================================================
// TREN — NAVEGACIÓN SINCRONIZADA FINAL
// ================================================

document.addEventListener("DOMContentLoaded", () => {
    const stations = Array.from(document.querySelectorAll(".station"));
    const train = document.getElementById("train-icon");
    const sections = stations.map(btn => document.getElementById(btn.dataset.target));
    const rail = document.querySelector(".pc-line");

    if (!stations.length || !train || !rail) return;

    const setActive = (btn) => {
        stations.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        const idx = stations.indexOf(btn);
        const total = stations.length - 1;
        const width = rail.offsetWidth;
        const x = total > 0 ? (idx / total) * width : 0;
        train.style.transform = `translateX(${x}px)`;
    };

    // Click en estación
    stations.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = document.getElementById(btn.dataset.target);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setActive(btn);
        });
    });

    // Scroll: detectar sección dominante en pantalla
    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;

            const secId = visible.target.id;
            const btn = stations.find(b => b.dataset.target === secId);
            if (btn) setActive(btn);
        },
        { threshold: 0.35 }
    );

    sections.forEach(sec => {
        if (sec) observer.observe(sec);
    });

    // Estado inicial
    setActive(stations[0]);
});
