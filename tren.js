const sections = [
    "inicio","sanb","senial","territorio","patrones","metodologia","equipo"
];

const train = document.getElementById("train");
const stations = document.querySelectorAll(".station");
const rail = document.querySelector(".rail-line");

/* Mover tren por clic */
stations.forEach(btn=>{
    btn.addEventListener("click",()=>{
        const step = parseInt(btn.dataset.step);
        const width = rail.offsetWidth;
        const x = (step/(sections.length-1))*width;

        train.style.transform = `translateX(${x}px)`;

        stations.forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");

        document.getElementById(btn.dataset.target).scrollIntoView({
            behavior:"smooth"
        });
    });
});

/* Mover tren por scroll */
window.addEventListener("scroll",()=>{
    let active = 0;

    sections.forEach((id,i)=>{
        const secTop = document.getElementById(id).offsetTop;
        if(window.scrollY >= secTop - window.innerHeight*0.35){
            active = i;
        }
    });

    const width = rail.offsetWidth;
    const x = (active/(sections.length-1))*width;
    train.style.transform = `translateX(${x}px)`;

    stations.forEach(b=>{
        b.classList.remove("active");
        if(parseInt(b.dataset.step)===active){
            b.classList.add("active");
        }
    });
});
