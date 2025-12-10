document.addEventListener("DOMContentLoaded", () => {
    const stations = Array.from(document.querySelectorAll(".station"));
    const train = document.getElementById("train-icon");

    if (!stations.length || !train) return;

    const sectionsById = {};
    stations.forEach(btn => {
        const id = btn.dataset.target;
        const sec = document.getElementById(id);
        if (sec) sectionsById[id] = sec;
    });

    const moveTrainToStep = (stepIndex) => {
        const total = stations.length - 1;
        const pct = total > 0 ? (stepIndex / total) * 100 : 0;
        train.style.left = `${pct}%`;
    };

    const setActiveStation = (btn) => {
        stations.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const step = parseInt(btn.dataset.step || "0", 10);
        moveTrainToStep(step);
    };

    stations.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.target;
            const section = document.getElementById(targetId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setActiveStation(btn);
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;
            const id = visible.target.id;
            const btn = stations.find(b => b.dataset.target === id);
            if (btn) setActiveStation(btn);
        },
        { threshold: 0.35 }
    );

    Object.values(sectionsById).forEach(sec => observer.observe(sec));

    // Estado inicial
    setActiveStation(stations[0]);
});
