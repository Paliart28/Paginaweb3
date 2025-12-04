<script>
const secciones = [
    "inicio",
    "san-bernardo",
    "senializacion",
    "territorio",
    "patrones",
    "metodologia",
    "equipo"
];

const tren = document.getElementById("train-sprite");
const line = document.querySelector(".pc-line");
const estaciones = document.querySelectorAll(".station");

// MOVER TREN POR CLIC
estaciones.forEach(btn => {
    btn.addEventListener("click", () => {

        const step = parseInt(btn.dataset.step);
        const ancho = line.offsetWidth;

        const x = (step / (secciones.length - 1)) * ancho;

        tren.style.transform = `translateX(${x}px)`;

        estaciones.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        document.getElementById(btn.dataset.target).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// MOVER TREN POR SCROLL
window.addEventListener("scroll", () => {
    let indexActivo = 0;

    secciones.forEach((id, i) => {
        const top = document.getElementById(id).offsetTop;
        if (window.scrollY >= top - window.innerHeight * 0.3) {
            indexActivo = i;
        }
    });

    const ancho = line.offsetWidth;
    const x = (indexActivo / (secciones.length - 1)) * ancho;
    tren.style.transform = `translateX(${x}px)`;

    estaciones.forEach(b => {
        b.classList.remove("is-active");
        if (b.dataset.step == indexActivo) {
            b.classList.add("is-active");
        }
    });
});
</script>
