// ================================================
// TREN — NAVEGACIÓN SINCRONIZADA FINAL
// ================================================

document.addEventListener("DOMContentLoaded", () => {

    const stations = Array.from(document.querySelectorAll(".station"));
    const train = document.getElementById("train-icon");

    if (!stations.length || !train) return;

    const moveTrain = (step) => {
        const total = stations.length - 1;
        const pct = (step / total) * 100;
        train.style.left = `${pct}%`;
    };

    const setActive = (btn) => {
        stations.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        moveTrain(parseInt(btn.dataset.step));
    };

    stations.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = document.getElementById(btn.dataset.target);
            if (target) {
                target.scrollIntoView({ behavior:"smooth" });
            }
            setActive(btn);
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;

            const btn = stations.find(b => b.dataset.target === visible.target.id);
            if (btn) setActive(btn);
        },
        { threshold:0.35 }
    );

    stations.forEach(btn => {
        const sec = document.getElementById(btn.dataset.target);
        if (sec) observer.observe(sec);
    });

    setActive(stations[0]);
});
