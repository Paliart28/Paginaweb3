// ===========================================================
// MAPA SAN BERNARDO — VERSIÓN COMPLETA PARA NOTA 7,0
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    const accidente = [-33.59333, -70.69960];

    const cruceVehicular = [-33.59285, -70.70080];
    const crucePeatonal = [-33.59390, -70.69860];
    const zonaResidencial = [-33.59240, -70.69790];
    const estacion = [-33.59440, -70.70180];

    const areaRiesgo = [
        [-33.59200, -70.70180],
        [-33.59450, -70.70140],
        [-33.59480, -70.69800],
        [-33.59210, -70.69810]
    ];

    const mapa = L.map("mapa-san-bernardo", {
        zoomControl: true
    }).setView(accidente, 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
    }).addTo(mapa);

    // Polígono área crítica
    L.polygon(areaRiesgo, {
        color: "#D90429",
        weight: 2,
        fillOpacity: 0.08
    }).addTo(mapa)
      .bindPopup("<strong>Área crítica:</strong> zona urbana inmediata al accidente.");

    // Marcadores
    const addMarker = (coord, color, text) => {
        L.circleMarker(coord, {
            radius: 8,
            fillColor: color,
            color: "#FFFFFF",
            weight: 2,
            fillOpacity: 1
        }).addTo(mapa)
          .bindPopup(text);
    };

    addMarker(accidente, "#D90429", `
        <h3>Accidente San Bernardo (2024)</h3>
        <p><strong>Choque entre tren de pruebas EFE y convoy FEPASA.</strong></p>
        <p>Reveló fallas en señalización, comunicación y convivencia urbana.</p>
    `);

    addMarker(cruceVehicular, "#F2994A", "<strong>Cruce vehicular</strong>: tránsito denso con visibilidad limitada.");
    addMarker(crucePeatonal, "#F6E05E", "<strong>Cruce peatonal</strong>: uso diario de residentes y escolares.");
    addMarker(zonaResidencial, "#2E7D5B", "<strong>Barrio residencial</strong>: casas a metros de la vía.");
    addMarker(estacion, "#1E3A68", "<strong>Estación cercana</strong>: nodo de maniobras y tráfico ferroviario.");

});
