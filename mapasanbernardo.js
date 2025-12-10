// ===========================================================
// MAPA SAN BERNARDO — VERSIÓN PARA NOTA 7,0
// Contexto ampliado, marcadores múltiples y polígono analítico
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Coordenadas centrales del accidente
    const accidente = [-33.59333, -70.69960];

    // Coordenadas relevantes del entorno real
    const cruceVehicular = [-33.59285, -70.70080];
    const crucePeatonal = [-33.59390, -70.69860];
    const zonaResidencial = [-33.59240, -70.69790];
    const estacion = [-33.59440, -70.70180];

    // Área analítica (polígono)
    const areaRiesgo = [
        [-33.59200, -70.70180],
        [-33.59450, -70.70140],
        [-33.59480, -70.69800],
        [-33.59210, -70.69810]
    ];

    // Inicialización del mapa
    const mapa = L.map("mapa-san-bernardo", {
        zoomControl: false
    }).setView(accidente, 16);

    // Capa base limpia
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 10,
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
    }).addTo(mapa);

    // Polígono de área de riesgo
    L.polygon(areaRiesgo, {
        color: "#D90429",
        weight: 2,
        fillOpacity: 0.08
    }).addTo(mapa)
      .bindPopup("<strong>Área crítica:</strong> zona urbana inmediata al accidente, donde convergen cruces, viviendas y tránsito cotidiano.");

    // Marcadores con popups detallados

    // Accidente
    L.circleMarker(accidente, {
        radius: 10,
        fillColor: "#D90429",
        color: "#ffffff",
        weight: 2,
        fillOpacity: 1
    }).addTo(mapa)
      .bindPopup(`
        <h3>Accidente San Bernardo (2024)</h3>
        <p><strong>Colisión entre tren de pruebas EFE y convoy de carga FEPASA.</strong></p>
        <p>El incidente expuso debilidades en la coordinación operativa, 
        dependencias del factor humano y la estrecha convivencia entre la vía y la ciudad.</p>
      `);

    // Cruce vehicular
    L.circleMarker(cruceVehicular, {
        radius: 7,
        fillColor: "#F2994A",
        color: "#ffffff",
        weight: 2
    }).addTo(mapa)
      .bindPopup(`
        <strong>Cruce vehicular:</strong> punto de tránsito denso donde la visibilidad es limitada y la señalización depende del estado del CTC.
      `);

    // Cruce peatonal
    L.circleMarker(crucePeatonal, {
        radius: 7,
        fillColor: "#F6E05E",
        color: "#111",
        weight: 2
    }).addTo(mapa)
      .bindPopup(`
        <strong>Cruce peatonal:</strong> acceso usado diariamente por residentes y estudiantes. Representa el tipo de entorno donde ocurren atropellos.
      `);

    // Zona residencial
    L.circleMarker(zonaResidencial, {
        radius: 6,
        fillColor: "#2E7D5B",
        color: "#ffffff",
        weight: 2
    }).addTo(mapa)
      .bindPopup(`
        <strong>Barrio residencial:</strong> viviendas a metros de la vía. Ilustra la convivencia directa entre tren y ciudad.
      `);

    // Estación cercana
    L.circleMarker(estacion, {
        radius: 6,
        fillColor: "#1E3A68",
        color: "#ffffff",
        weight: 2
    }).addTo(mapa)
      .bindPopup(`
        <strong>Estación cercana:</strong> nodo ferroviario que concentra maniobras y circulación frecuente, aumentando la complejidad operativa del sector.
      `);
});
