
/**
 * Datos de ejemplo para el prototipo.
 * En tu versión final puedes cargar este JSON desde un fichero aparte o un CMS.
 */
const EPISODES = [
  {
    slug: "hogar-azul",
    titulo: "Postal azul desde la cocina",
    sinopsis:
      "Un rato de sobremesa sonoro, con los ruidos de la cocina y una voz que acompaña sin exigir respuesta.",
    duracionSegundos: 165,
    fechaIso: "2025-10-01",
    etiquetas: ["hogar", "cotidiano"],
    portadaEmoji: "🧡",
    audioUrl: "media/postal-hogar-azul.mp3",
    lecturaFacilHtml:
      "En esta postal te acompaño mientras estás en la cocina. Hablamos de cosas sencillas del día. No hace falta que respondas. Solo escucha si te apetece.",
    transcriptWords: [
      // Cada entrada: { t: segundosDesdeInicio, w: "palabra" }
      { t: 0.0, w: "Hola," },
      { t: 0.6, w: "qué" },
      { t: 0.9, w: "bien" },
      { t: 1.2, w: "tenerte" },
      { t: 1.6, w: "un" },
      { t: 1.8, w: "ratito" },
      { t: 2.2, w: "por" },
      { t: 2.4, w: "aquí." },
      { t: 4.0, w: "Si" },
      { t: 4.2, w: "estás" },
      { t: 4.5, w: "en" },
      { t: 4.7, w: "la" },
      { t: 4.9, w: "cocina," },
      { t: 5.5, w: "puedes" },
      { t: 5.8, w: "seguir" },
      { t: 6.2, w: "a" },
      { t: 6.3, w: "lo" },
      { t: 6.5, w: "tuyo;" },
      { t: 7.2, w: "yo" },
      { t: 7.4, w: "te" },
      { t: 7.6, w: "acompaño" },
      { t: 8.1, w: "con" },
      { t: 8.3, w: "esta" },
      { t: 8.6, w: "postal." }
    ]
  },
  {
    slug: "camino-suave",
    titulo: "Postal para caminar despacio",
    sinopsis:
      "Una invitación ligera para salir a dar un paseo corto, mirando alrededor y respirando hondo.",
    duracionSegundos: 140,
    fechaIso: "2025-09-18",
    etiquetas: ["camino", "exterior"],
    portadaEmoji: "🚶‍♀️",
    audioUrl: "media/postal-camino-suave.mp3",
    lecturaFacilHtml:
      "Esta postal está pensada para acompañarte mientras caminas. No hace falta que hagas nada especial: solo prestar atención a tus pasos y a lo que te rodea.",
    transcriptWords: [
      { t: 0.0, w: "Te" },
      { t: 0.4, w: "propongo" },
      { t: 0.9, w: "un" },
      { t: 1.0, w: "paseo" },
      { t: 1.5, w: "lento." },
      { t: 2.3, w: "Solo" },
      { t: 2.6, w: "tú," },
      { t: 2.9, w: "tus" },
      { t: 3.1, w: "pasos" },
      { t: 3.5, w: "y" },
      { t: 3.7, w: "esta" },
      { t: 3.9, w: "voz" },
      { t: 4.2, w: "que" },
      { t: 4.4, w: "te" },
      { t: 4.6, w: "acompaña." }
    ]
  }
];

const appRoot = document.getElementById("app-root");
const bottomNavButtons = document.querySelectorAll(".bottom-nav__item");

/**
 * Utilidades de formato
 */
function formatSeconds(totalSeconds) {
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function getLatestEpisode() {
  return EPISODES.slice().sort((a, b) => (a.fechaIso < b.fechaIso ? 1 : -1))[0];
}

/**
 * Router sencillo basado en hash: #/  #/explorar  #/p/:slug  #/acerca  #/accesibilidad  #/politicas
 */
function parseRoute() {
  const hash = window.location.hash || "#/";
  const parts = hash.replace(/^#\//, "").split("/");
  if (!parts[0]) return { name: "home" };

  if (parts[0] === "explorar") {
    return { name: "explore" };
  }
  if (parts[0] === "acerca") {
    return { name: "about" };
  }
  if (parts[0] === "accesibilidad") {
    return { name: "accessibility" };
  }
  if (parts[0] === "politicas") {
    return { name: "policies" };
  }
  if (parts[0] === "p" && parts[1]) {
    return { name: "episode", slug: decodeURIComponent(parts[1]) };
  }
  return { name: "not-found" };
}

function setActiveNav(routeName) {
  bottomNavButtons.forEach((btn) => {
    const route = btn.getAttribute("data-route");
    if (!route) return;
    const name =
      route === "#/"
        ? "home"
        : route === "#/explorar"
        ? "explore"
        : route === "#/acerca"
        ? "about"
        : null;

    if (name && name === routeName) {
      btn.classList.add("bottom-nav__item--active");
    } else {
      btn.classList.remove("bottom-nav__item--active");
    }
  });
}

/**
 * Renderizadores de pantallas
 */
function renderHome() {
  const latest = getLatestEpisode();
  appRoot.innerHTML = `
    <section class="card card--hero" aria-labelledby="home-hero-title">
      <div class="home-hero">
        <p class="home-hero__eyebrow">Para escuchar sin prisas</p>
        <h1 id="home-hero-title" class="home-hero__title">Postales sonoras de compañía</h1>
        <p class="home-hero__subtitle">
          Pequeños audios que se leen en voz alta por ti, con transcripción palabra a palabra para seguir el ritmo.
        </p>
        <div class="home-hero__cta-row">
          <button
            class="button button--primary"
            data-link="#/p/${latest.slug}"
          >
            <span aria-hidden="true">▶</span>
            Escuchar la última postal
          </button>
          <button class="button button--ghost" data-link="#/explorar">
            Ver todas
          </button>
        </div>
      </div>
    </section>

    <section class="postal-list" aria-label="Listado de postales">
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <h2 style="margin:0; font-size:0.95rem;">Últimas postales</h2>
          <span class="badge">
            <span aria-hidden="true">☁️</span>
            Audio + texto
          </span>
        </div>
        ${EPISODES.map(
          (ep) => `
          <article class="postal-card">
            <div class="postal-card__cover" aria-hidden="true">${ep.portadaEmoji}</div>
            <div>
              <button
                class="button button--ghost button--full"
                data-link="#/p/${ep.slug}"
                aria-label="Abrir postal: ${ep.titulo}"
              >
                <span style="flex:1; text-align:left; font-weight:500;">
                  ${ep.titulo}
                </span>
                <span style="font-size:0.8rem; opacity:0.8;">
                  ${formatSeconds(ep.duracionSegundos)}
                </span>
              </button>
              <div class="postal-card__meta">
                <span>${new Date(ep.fechaIso).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short"
                })}</span>
                <span>·</span>
                <span>${ep.etiquetas.join(" · ")}</span>
              </div>
            </div>
          </article>
        `
        ).join("")}
      </div>
    </section>
  `;
}

function renderExplore() {
  appRoot.innerHTML = `
    <section class="card">
      <header style="margin-bottom:0.75rem;">
        <h1 class="page-title">Explorar postales</h1>
        <p class="page-text">
          Filtra por etiqueta o busca por título para encontrar la postal que mejor encaje con tu momento.
        </p>
      </header>
      <div class="filters" role="group" aria-label="Filtros de exploración">
        <select id="filter-tag" class="input" aria-label="Filtrar por etiqueta">
          <option value="">Todas las etiquetas</option>
          ${getAllTags()
            .map((tag) => `<option value="${tag}">${tag}</option>`)
            .join("")}
        </select>
        <select id="filter-sort" class="input" aria-label="Ordenar resultados">
          <option value="recent">Más recientes</option>
          <option value="short">Más cortas primero</option>
        </select>
        <input
          id="filter-search"
          class="input"
          type="search"
          placeholder="Buscar por título..."
          aria-label="Buscar por título"
        />
      </div>
    </section>

    <section class="postal-list" id="explore-results" aria-live="polite"></section>
  `;

  const tagSelect = document.getElementById("filter-tag");
  const sortSelect = document.getElementById("filter-sort");
  const searchInput = document.getElementById("filter-search");

  function applyFilters() {
    const tag = tagSelect.value;
    const sort = sortSelect.value;
    const query = searchInput.value.trim().toLowerCase();

    let list = EPISODES.slice();
    if (tag) {
      list = list.filter((ep) => ep.etiquetas.includes(tag));
    }
    if (query) {
      list = list.filter((ep) =>
        ep.titulo.toLowerCase().includes(query)
      );
    }

    if (sort === "recent") {
      list.sort((a, b) => (a.fechaIso < b.fechaIso ? 1 : -1));
    } else if (sort === "short") {
      list.sort((a, b) => a.duracionSegundos - b.duracionSegundos);
    }

    renderExploreResults(list);
  }

  tagSelect.addEventListener("change", applyFilters);
  sortSelect.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", applyFilters);

  applyFilters();
}

function renderExploreResults(list) {
  const container = document.getElementById("explore-results");
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `
      <div class="card">
        <p class="page-text">No hay postales para este filtro todavía.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="card">
      ${list
        .map(
          (ep) => `
        <article class="postal-card" style="margin-bottom:0.75rem;">
          <div class="postal-card__cover" aria-hidden="true">${ep.portadaEmoji}</div>
          <div>
            <button
              class="button button--ghost button--full"
              data-link="#/p/${ep.slug}"
              aria-label="Abrir postal: ${ep.titulo}"
            >
              <span style="flex:1; text-align:left; font-weight:500;">
                ${ep.titulo}
              </span>
              <span style="font-size:0.8rem; opacity:0.8;">
                ${formatSeconds(ep.duracionSegundos)}
              </span>
            </button>
            <div class="postal-card__meta">
              <span>${new Date(ep.fechaIso).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short"
              })}</span>
              <span>·</span>
              <span>${ep.etiquetas.join(" · ")}</span>
            </div>
          </div>
        </article>
      `
        )
        .join("")}
    </div>
  `;
}

function getAllTags() {
  const tags = new Set();
  EPISODES.forEach((ep) => ep.etiquetas.forEach((t) => tags.add(t)));
  return Array.from(tags);
}

/**
 * Transcripción sincronizada
 */
let currentAudio = null;
let transcriptWordSpans = [];
let transcriptActiveIndex = -1;

function buildTranscriptHtml(words) {
  // Para prototipo, agrupamos palabras en párrafos cortos de ~10 palabras
  const wordsPerParagraph = 10;
  const paragraphs = [];
  for (let i = 0; i < words.length; i += wordsPerParagraph) {
    paragraphs.push(words.slice(i, i + wordsPerParagraph));
  }

  return paragraphs
    .map(
      (para) =>
        `<p class="transcript__paragraph">` +
        para
          .map(
            (entry, index) =>
              `<span class="transcript__word" data-t="${entry.t}" data-index="${index}">${entry.w}</span>`
          )
          .join(" ") +
        `</p>`
    )
    .join("");
}

function setupTranscriptSync(audioEl, words) {
  transcriptWordSpans = Array.from(
    document.querySelectorAll(".transcript__word")
  );
  transcriptActiveIndex = -1;
  currentAudio = audioEl;

  if (!audioEl) return;

  audioEl.addEventListener("timeupdate", () => {
    const t = audioEl.currentTime;
    let newIndex = -1;

    // Buscamos la última palabra cuyo tiempo es menor o igual al tiempo actual
    for (let i = 0; i < words.length; i++) {
      if (t + 0.05 >= words[i].t) {
        newIndex = i;
      } else {
        break;
      }
    }

    if (newIndex === transcriptActiveIndex) return;
    transcriptActiveIndex = newIndex;

    transcriptWordSpans.forEach((span, i) => {
      if (i === transcriptActiveIndex) {
        span.classList.add("transcript__word--active");
        // Desplaza un poco para mantener la palabra activa visible
        span.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        span.classList.remove("transcript__word--active");
      }
    });
  });
}

/**
 * Página de detalle de postal /p/:slug
 */
function renderEpisode(slug) {
  const episode = EPISODES.find((ep) => ep.slug === slug);
  if (!episode) {
    renderNotFound();
    return;
  }

  const transcriptHtml = buildTranscriptHtml(episode.transcriptWords);

  appRoot.innerHTML = `
    <section class="card" aria-labelledby="episode-title">
      <header class="player-card__header">
        <button
          class="button button--ghost"
          data-link="#/"
          aria-label="Volver al inicio"
        >
          ← Inicio
        </button>
        <div class="chip-row">
          <span class="chip">${episode.etiquetas.join(" · ")}</span>
        </div>
      </header>

      <h1 id="episode-title" class="player-card__title">${episode.titulo}</h1>
      <p class="player-card__subtitle">${episode.sinopsis}</p>

      <div
        class="postal-card__cover"
        style="margin-bottom:0.9rem; width:80px; height:80px;"
        aria-hidden="true"
      >
        ${episode.portadaEmoji}
      </div>

      <section
        class="player"
        aria-label="Reproductor de audio con transcripción sincronizada"
      >
        <div class="player__row">
          <button class="player__play" id="player-play" aria-label="Reproducir o pausar la postal">
            ▶
          </button>
          <div class="player__timeline">
            <input
              id="player-seek"
              class="player__slider"
              type="range"
              min="0"
              max="${episode.duracionSegundos}"
              step="0.1"
              value="0"
              aria-label="Barra de progreso del audio"
            />
            <div class="player__timecodes">
              <span id="player-current">00:00</span>
              <span id="player-duration">${formatSeconds(
                episode.duracionSegundos
              )}</span>
            </div>
          </div>
        </div>

        <div class="player__speed-row">
          <span class="text-soft">Velocidad</span>
          <div class="player__speed-options" role="group" aria-label="Velocidad de reproducción">
            <button class="player__speed-btn" data-speed="0.75">0,75×</button>
            <button class="player__speed-btn player__speed-btn--active" data-speed="1">1×</button>
            <button class="player__speed-btn" data-speed="1.25">1,25×</button>
          </div>
        </div>

        <audio
          id="episode-audio"
          preload="metadata"
          src="${episode.audioUrl}"
          aria-hidden="true"
        ></audio>
      </section>

      <section class="tabs" aria-label="Texto de la postal">
        <div class="tabs__list" role="tablist">
          <button
            class="tab tab--active"
            role="tab"
            aria-selected="true"
            aria-controls="panel-transcripcion"
            id="tab-transcripcion"
          >
            Transcripción
          </button>
          <button
            class="tab"
            role="tab"
            aria-selected="false"
            aria-controls="panel-lectura-facil"
            id="tab-lectura-facil"
          >
            Lectura fácil
          </button>
        </div>
        <div
          id="panel-transcripcion"
          class="tabs__panel"
          role="tabpanel"
          aria-labelledby="tab-transcripcion"
        >
          ${transcriptHtml}
        </div>
        <div
          id="panel-lectura-facil"
          class="tabs__panel"
          role="tabpanel"
          aria-labelledby="tab-lectura-facil"
          hidden
        >
          ${episode.lecturaFacilHtml}
        </div>
      </section>

      <section style="margin-top:0.9rem; display:flex; justify-content:space-between; gap:0.5rem;">
        <button
          class="button button--ghost"
          data-link="#/explorar"
        >
          Volver a explorar
        </button>
        <button
          class="button button--primary"
          id="next-episode-btn"
        >
          Siguiente postal
        </button>
      </section>
    </section>
  `;

  // Lógica del player
  const audioEl = document.getElementById("episode-audio");
  const playBtn = document.getElementById("player-play");
  const seek = document.getElementById("player-seek");
  const currentTimeEl = document.getElementById("player-current");
  const durationEl = document.getElementById("player-duration");
  const speedButtons = document.querySelectorAll(".player__speed-btn");

  audioEl.addEventListener("loadedmetadata", () => {
    if (audioEl.duration && !isNaN(audioEl.duration)) {
      durationEl.textContent = formatSeconds(audioEl.duration);
      seek.max = audioEl.duration.toString();
    }
  });

  playBtn.addEventListener("click", () => {
    if (audioEl.paused) {
      audioEl.play();
      playBtn.textContent = "❚❚";
    } else {
      audioEl.pause();
      playBtn.textContent = "▶";
    }
  });

  audioEl.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatSeconds(audioEl.currentTime);
    seek.value = audioEl.currentTime.toString();
  });

  seek.addEventListener("input", () => {
    audioEl.currentTime = parseFloat(seek.value || "0");
  });

  speedButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const speed = parseFloat(btn.dataset.speed || "1");
      audioEl.playbackRate = speed;
      speedButtons.forEach((b) =>
        b.classList.toggle("player__speed-btn--active", b === btn)
      );
      // Persistimos preferencia básica
      try {
        localStorage.setItem("ps-preferred-speed", String(speed));
      } catch {}
    });
  });

  // Aplica velocidad guardada
  try {
    const storedSpeed = parseFloat(localStorage.getItem("ps-preferred-speed"));
    if (!isNaN(storedSpeed)) {
      audioEl.playbackRate = storedSpeed;
      speedButtons.forEach((b) =>
        b.classList.toggle(
          "player__speed-btn--active",
          parseFloat(b.dataset.speed || "1") === storedSpeed
        )
      );
    }
  } catch {}

  audioEl.addEventListener("ended", () => {
    playBtn.textContent = "▶";
    const btn = document.getElementById("next-episode-btn");
    btn?.focus();
  });

  // Tabs: Transcripción / Lectura fácil
  const tabTrans = document.getElementById("tab-transcripcion");
  const tabLect = document.getElementById("tab-lectura-facil");
  const panelTrans = document.getElementById("panel-transcripcion");
  const panelLect = document.getElementById("panel-lectura-facil");

  function showTranscript() {
    tabTrans.classList.add("tab--active");
    tabLect.classList.remove("tab--active");
    panelTrans.hidden = false;
    panelLect.hidden = true;
    tabTrans.setAttribute("aria-selected", "true");
    tabLect.setAttribute("aria-selected", "false");
    panelTrans.setAttribute("aria-live", "polite");
  }

  function showLecturaFacil() {
    tabLect.classList.add("tab--active");
    tabTrans.classList.remove("tab--active");
    panelLect.hidden = false;
    panelTrans.hidden = true;
    tabLect.setAttribute("aria-selected", "true");
    tabTrans.setAttribute("aria-selected", "false");
    panelLect.setAttribute("aria-live", "polite");
  }

  tabTrans.addEventListener("click", showTranscript);
  tabLect.addEventListener("click", showLecturaFacil);

  // Siguiente postal
  const nextBtn = document.getElementById("next-episode-btn");
  nextBtn.addEventListener("click", () => {
    const next = getNextEpisode(episode);
    if (next) {
      navigateTo(`#/p/${next.slug}`);
    } else {
      navigateTo("#/explorar");
    }
  });

  // Transcripción sincronizada
  setupTranscriptSync(audioEl, episode.transcriptWords);
}

function getNextEpisode(current) {
  const sorted = EPISODES.slice().sort((a, b) =>
    a.fechaIso < b.fechaIso ? 1 : -1
  );
  const idx = sorted.findIndex((ep) => ep.slug === current.slug);
  if (idx === -1 || idx === sorted.length - 1) return null;
  return sorted[idx + 1];
}

function renderAbout() {
  appRoot.innerHTML = `
    <section class="card">
      <h1 class="page-title">Acerca de este proyecto</h1>
      <p class="page-text">
        <strong>Postales sonoras de compañía</strong> es una pieza multimedia pensada
        para acompañar sin abrumar. Breves audios con texto sincronizado para
        que puedas seguir la voz a tu ritmo.
      </p>
      <p class="page-text">
        Este prototipo está optimizado para móviles y funciona como una
        aplicación web progresiva (PWA): puedes añadirla a tu pantalla de
        inicio y seguirá funcionando incluso con conexión limitada.
      </p>
      <p class="page-text">
        Incluye transcripciones palabra a palabra y una pestaña de lectura
        fácil para adaptar el contenido a diferentes necesidades de atención
        y comprensión.
      </p>

      <div style="margin-top:0.75rem;">
        <a href="#/accesibilidad" class="button button--ghost" role="button">
          Ver guía de accesibilidad
        </a>
      </div>
    </section>
  `;
}

function renderAccessibility() {
  appRoot.innerHTML = `
    <section class="card">
      <h1 class="page-title">Accesibilidad</h1>
      <p class="page-text">
        • El reproductor de audio se puede manejar con gestos táctiles y teclado.
      </p>
      <p class="page-text">
        • La transcripción se ilumina palabra a palabra para ayudar a seguir el ritmo de la voz.
      </p>
      <p class="page-text">
        • Siempre puedes cambiar a la pestaña de “Lectura fácil” para leer una versión simplificada del contenido.
      </p>
      <p class="page-text">
        • Los botones clave tienen foco visible y tamaño suficiente para su uso en pantalla táctil.
      </p>
      <p class="page-text">
        • Si el audio da error, sigue siendo posible leer el texto de la postal.
      </p>

      <div style="margin-top:0.75rem;">
        <a href="#/politicas" class="button button--ghost" role="button">
          Ver políticas y aviso de IA
        </a>
      </div>
    </section>
  `;
}

function renderPolicies() {
  appRoot.innerHTML = `
    <section class="card">
      <h1 class="page-title">Políticas y aviso IA</h1>
      <p class="page-text">
        Este prototipo no recoge datos personales ni utiliza cookies, más allá de la
        configuración básica de la propia plataforma de alojamiento (por ejemplo, GitHub Pages).
      </p>
      <p class="page-text">
        Algunas partes del contenido pueden haberse generado o revisado con ayuda de herramientas
        de inteligencia artificial. La curaduría y las decisiones finales de diseño son humanas.
      </p>
      <p class="page-text">
        Si reutilizas este código, revisa siempre la política de privacidad del lugar donde lo publiques
        y adapta este texto a tus necesidades reales.
      </p>
    </section>
  `;
}

function renderNotFound() {
  appRoot.innerHTML = `
    <section class="card">
      <h1 class="page-title">Página no encontrada</h1>
      <p class="page-text">
        No hemos encontrado esta postal. Puede que el enlace esté incompleto o ya no exista.
      </p>
      <button class="button button--primary" data-link="#/">
        Volver al inicio
      </button>
    </section>
  `;
}

/**
 * Navegación
 */
function navigateTo(hash) {
  if (window.location.hash === hash) {
    // Si ya estamos en la ruta, forzamos render
    onRouteChange();
  } else {
    window.location.hash = hash;
  }
}

function onRouteChange() {
  const route = parseRoute();
  setActiveNav(route.name);

  switch (route.name) {
    case "home":
      renderHome();
      break;
    case "explore":
      renderExplore();
      break;
    case "episode":
      renderEpisode(route.slug);
      break;
    case "about":
      renderAbout();
      break;
    case "accessibility":
      renderAccessibility();
      break;
    case "policies":
      renderPolicies();
      break;
    default:
      renderNotFound();
  }

  // Enlaces internos declarados con data-link
  appRoot.querySelectorAll("[data-link]").forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.getAttribute("data-link");
      if (target) navigateTo(target);
    });
  });
}

// Eventos globales
window.addEventListener("hashchange", onRouteChange);

bottomNavButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const route = btn.getAttribute("data-route");
    if (route) navigateTo(route);
  });
});

// Render inicial
onRouteChange();
