import { getWallhavenImages } from "./api/wallhaven.js";
import { getPexelsImages } from "./pexels.js";
import { getUnsplashImages } from "./api/unsplash.js";

async function loadWallpapers(query) {
  const allResults = await Promise.all([
    getWallhavenImages(query),
    getPexelsImages(query),
    getUnsplashImages(query)
  ]);

  const wallpapers = allResults.flat();
  displayWallpapers(wallpapers);
}

function displayWallpapers(wallpapers) {
  const container = document.getElementById("wallpapers");
  container.innerHTML = "";

  wallpapers.forEach(wallpaper => {
    const img = document.createElement("img");
    img.src = wallpaper.thumbnail;
    img.alt = "Wallpaper";
    container.appendChild(img);
  });
}

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.trim() || "peach aesthetic";
  loadWallpapers(query);
});

loadWallpapers("peach aesthetic");

