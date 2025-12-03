// ============================================================
//   CONTROL DEL TREN POR CLICK Y SCROLL + CAMBIO DE COLORES
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    const tren = document.getElementById("train-icon");
    const estaciones = document.querySelectorAll(".station");
    const riel = document.querySelector(".pc-line");

    const secciones = [
        { id: "inicio", color: "#F5F1E6" },        // beige
        { id: "san-bernardo", color: "#1E3A68" },  // acero
        { id: "senializacion", color: "#E5EAF1" }, // gris
        { id: "territorio", color: "#ffffff" },    // blanco
        { id: "patrones", color: "#F5F1E6" },      // beige
        { id: "metodologia", color: "#ffffff" },   // blanco
        { id: "equipo", color: "#E5EAF1" }         // gris
    ];

    // --------------------------------------------------------
    // MOVER TREN AL HACER CLIC
    // --------------------------------------------------------
    estaciones.forEach(btn => {
        btn.addEventListener("click", () => {

            // Quitar selección
            estaciones.forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");

            // Mover tren
            const step = parseInt(btn.dataset.step);
            moverTren(step);

            // Ir a sección
            document.getElementById(btn.dataset.target)
                .scrollIntoView({ behavior: "smooth" });
        });
    });

    // --------------------------------------------------------
    // FUNCIÓN PARA MOVER TREN Y CAMBIAR COLORES
    // --------------------------------------------------------
    function moverTren(index) {
        const porcentaje = (index / (secciones.length - 1)) * 100;
        tren.style.left = porcentaje + "%";

        // Cambiar colores dinámicamente
        const color = secciones[index].color;
        tren.style.color = color;
        riel.style.backgroundColor = color;
    }

    // --------------------------------------------------------
    // CONTROL POR SCROLL
    // --------------------------------------------------------
    window.addEventListener("scroll", () => {
        let index = 0;

        for (let i = 0; i < secciones.length; i++) {
            const sec = document.getElementById(secciones[i].id);
            const top = sec.getBoundingClientRect().top;

            if (top < window.innerHeight * 0.35) {
                index = i;
            }
        }

        moverTren(index);

        // actualizar estaciones activas
        estaciones.forEach(b => b.classList.remove("is-active"));
        document.querySelector(`.station[data-step="${index}"]`)
            .classList.add("is-active");
    });
});

