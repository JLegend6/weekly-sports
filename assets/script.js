async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Konnte ${path} nicht laden`);
  }
  return response.json();
}

function renderTicker(items) {
  const ticker = document.querySelector("[data-ticker]");
  if (!ticker) return;

  ticker.innerHTML = "";

  items.slice(0, 6).forEach((item) => {
    const row = document.createElement("a");
    row.className = "ticker-row";
    row.href = item.link || "ticker.html";
    row.innerHTML = `
      <strong>${item.time}</strong>
      <span><span class="badge">${item.type}</span> ${item.sport}: ${item.text}</span>
      <span>→</span>
    `;
    ticker.appendChild(row);
  });
}

function renderWeeklyPreview(data) {
  const container = document.querySelector("[data-weekly-preview]");
  if (!container) return;

  container.innerHTML = "";

  data.cards.forEach((card) => {
    const element = document.createElement("article");
    element.className = "card";
    element.innerHTML = `
      <h3>${card.title}</h3>
      <p>${card.text}</p>
    `;
    container.appendChild(element);
  });
}

async function init() {
  try {
    const ticker = await loadJson("data/ticker.json");
    renderTicker(ticker);
  } catch (error) {
    console.warn(error);
  }

  try {
    const preview = await loadJson("data/weekly-preview.json");
    renderWeeklyPreview(preview);
  } catch (error) {
    console.warn(error);
  }
}

document.addEventListener("DOMContentLoaded", init);
