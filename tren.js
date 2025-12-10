// ================================================
// TREN — NAVEGACIÓN SINCRONIZADA FINAL
// ================================================

document.addEventListener("DOMContentLoaded", () => {
    const stations = Array.from(document.querySelectorAll(".station"));
    const train = document.getElementById("train-icon");
    const sections = stations.map(btn => document.getElementById(btn.dataset.target));

    if (!stations.length || !train) return;

    const moveTrain = (btn) => {
        const step = parseInt(btn.dataset.step || "0", 10);
        const maxStep = stations.length - 1;
        const pct = maxStep > 0 ? (step / maxStep) * 100 : 0;
        train.style.left = pct + "%";
    };

    const setActive = (btn) => {
        stations.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        moveTrain(btn);
    };

    // Click en estación: scroll suave y mover tren
    stations.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = document.getElementById(btn.dataset.target);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setActive(btn);
        });
    });

    // Scroll: detectar qué sección domina en pantalla
    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;

            const secId = visible.target.id;
            const btn = stations.find(b => b.dataset.target === secId);
            if (btn) {
                setActive(btn);
            }
        },
        { threshold: 0.35 }
    );

    sections.forEach(sec => {
        if (sec) observer.observe(sec);
    });

    // Estado inicial
    setActive(stations[0]);
});
