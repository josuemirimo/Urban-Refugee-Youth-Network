// Map program titles -> Bootstrap Icons
const PROGRAM_ICON_RULES = [
  { match: /education|literacy|training|skills?/i, icon: "bi-mortarboard" },
  { match: /health|srhr|gbv|wellbeing|psychosocial/i, icon: "bi-heart-pulse" },
  { match: /peace|conflict|coexistence|mediation|dialogue/i, icon: "bi-peace" },
  { match: /socio[- ]?economic|livelihood|entrepreneur|income|jobs?/i, icon: "bi-graph-up-arrow" },
  { match: /soccer|football|sport|league/i, icon: "bi-trophy" },
  { match: /festival|event|talent|showcase|culture/i, icon: "bi-stars" }
];

function pickProgramIcon(title = "") {
  const rule = PROGRAM_ICON_RULES.find(r => r.match.test(title));
  return rule ? rule.icon : "bi-people";
}


document.addEventListener("DOMContentLoaded", () => {
  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  set("brandName", Site.orgName);
  set("tagline", Site.tagline);
  set("elevator", Site.elevator);

  const grid = document.getElementById('programGrid');
  if (grid && Array.isArray(Site.programs)) {
    grid.innerHTML = '';
    Site.programs.forEach(p => {
      const iconClass = pickProgramIcon(p.title);
      grid.insertAdjacentHTML('beforeend', `
        <div class="col-md-6 col-lg-4 d-flex">
          <div class="card p-3 card-hover w-100">
            <div class="d-flex align-items-center mb-2">
              <i class="bi ${iconClass} me-2 fs-3 text-primary" aria-hidden="true"></i>
              <h5 class="mb-0">${p.title}</h5>
            </div>
            <p class="mb-0">${p.blurb}</p>
          </div>
        </div>`);
    });
  }
  loadStoriesTeaser();
});

async function loadStoriesTeaser() {
  const container = document.getElementById('storiesTeaser');
  if (!container) return;
  try {
    const res = await fetch('assets/data/stories.json');
    const list = await res.json();
    list.slice(0, 3).forEach(s => {
      container.insertAdjacentHTML('beforeend', `
        <div class="col-md-4">
          <article class="card h-100 card-hover">
            <img src="${s.img}" alt="${s.alt || ''}" class="card-img-top" loading="lazy" decoding="async" width="800" height="500">
            <div class="card-body">
              ${s.date ? `<time class="text-muted small d-block mb-1">${s.date}</time>` : ``}
              <h5 class="mt-0"><a href="${s.link}" class="stretched-link">${s.title}</a></h5>
              ${s.excerpt ? `<p class="mb-0">${s.excerpt}</p>` : ``}
            </div>
          </article>
        </div>`);
    });
  } catch (e) { /* console.error(e); */ }
}
