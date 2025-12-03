// ============================================================
//   CONTROL DEL TREN EN LA BARRA DE NAVEGACIÓN
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    const tren = document.getElementById("train-icon");
    const estaciones = document.querySelectorAll(".station");

    estaciones.forEach(btn => {
        btn.addEventListener("click", () => {

            // Marcar estación activa
            estaciones.forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");

            // Mover tren
            const step = parseInt(btn.dataset.step);
            const porcentaje = (step / (estaciones.length - 1)) * 100;
            tren.style.left = porcentaje + "%";

            // Scroll suave
            const target = btn.dataset.target;
            document.getElementById(target).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

});

