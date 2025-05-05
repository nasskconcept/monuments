document.addEventListener("DOMContentLoaded", () => {
  // 1. Données
  const monuments = {
    eiffel: {
      title: "Tour Eiffel",
      city: "Paris",
      desc: "La tour Eiffel est un monument emblématique de Paris, construit par Gustave Eiffel pour l'Exposition universelle de 1889. Mesurant 330 mètres de hauteur, elle est faite de fer et a été initialement critiquée, mais elle est devenue un symbole mondial de la France et de l'ingénierie moderne. Elle attire des millions de visiteurs chaque année pour sa vue panoramique sur la ville.",
      coords: [48.8584, 2.2945],
    },
    "notre-dame": {
      title: "Notre-Dame de Paris",
      city: "Paris",
      desc: "Cathédrale gothique du XIIᵉ siècle, célèbre pour ses vitraux, ses gargouilles et son histoire tumultueuse (incluant l’incendie de 2019). Elle est l'un des exemples les plus emblématiques de l'architecture médiévale en France.",
      coords: [48.853, 2.3499],
    },
    arc: {
      title: "Arc de Triomphe",
      city: "Paris",
      desc: "Érigé en 1836 à la gloire de l’armée française, il commémore les victoires de Napoléon Bonaparte. Culminant à 50 mètres de hauteur, il offre une vue imprenable sur les Champs-Élysées et l’axe historique.",
      coords: [48.8738, 2.295],
    },
    "mont-saint-michel": {
      title: "Mont Saint-Michel",
      city: "Le Mont-Saint-Michel",
      desc: "Îlot rocheux fortifié en Normandie, surmonté d’une abbaye médiévale. Lieu de pèlerinage depuis le VIIIᵉ siècle, célèbre pour ses marées spectaculaires et son architecture unique.",
      coords: [48.6361, -1.5115],
    },
    versailles: {
      title: "Château de Versailles",
      city: "Versailles",
      desc: "Palais royal du XVIIᵉ siècle, symbole de l’absolutisme français. Construit pour Louis XIV, il est renommé pour ses jardins à la française, la galerie des Glaces et son parc somptueux.",
      coords: [48.8049, 2.1204],
    },
  };

  // 2. Sélecteurs DOM
  const buttons = document.querySelectorAll("nav .buttons button");
  const figures = document.querySelectorAll(".thumbnails figure");
  const infoSec = document.getElementById("info");
  const infoTitle = document.getElementById("info-title");
  const infoCity = document.getElementById("info-city");
  const infoDesc = document.getElementById("info-desc");

  // 3. Initialisation de la carte Leaflet
  const map = L.map("map").setView([46.5, 2.6], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  let marker = null;

  // 4. Fonction d’affichage
  function showMonument(key) {
    const data = monuments[key];
    if (!data) return;

    infoTitle.textContent = data.title;
    infoCity.textContent = data.city;
    infoDesc.textContent = data.desc;

    // Affiche et anime la section
    infoSec.classList.remove("hidden");
    void infoSec.offsetWidth;
    infoSec.classList.add("visible");

    if (marker) map.removeLayer(marker);
    marker = L.marker(data.coords).addTo(map);
    map.setView(data.coords, 12);
  }

  // 5. Gestionnaires d’événements

  // Pour les boutons
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => showMonument(btn.dataset.key));
  });

  figures.forEach((fig) => {
    fig.style.cursor = "pointer";
    fig.addEventListener("click", () => showMonument(fig.dataset.key));
  });
});
