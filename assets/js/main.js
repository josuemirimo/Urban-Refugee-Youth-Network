document.addEventListener("DOMContentLoaded", () => {
  const blogGrid = document.querySelector(".blog-grid");

  if (blogGrid && typeof blogPosts !== "undefined") {
    blogPosts.forEach(post => {
      const card = document.createElement("article");
      card.classList.add("blog-card");

      card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="blog-img" />
        <div class="blog-content">
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-date">${new Date(post.date).toLocaleDateString()}</p>
          <p class="blog-excerpt">${post.excerpt}</p>
          <a href="${post.link}" class="blog-btn">Read More</a>
        </div>
      `;

      blogGrid.appendChild(card);
    });
  }
    /* === HERO SLIDES RENDER === */
  const heroSlides = document.getElementById("heroSlides");
  const heroContent = document.getElementById("heroContent");
  const heroIndicators = document.getElementById("heroIndicators");

  if (heroSlides && Site.heroSlides) {
    let current = 0;
    let interval;

    // Render background slides
    Site.heroSlides.forEach(slide => {
      const img = document.createElement("div");
      img.className = "hero-slide";
      img.style.backgroundImage = `url(${slide.image})`;
      heroSlides.appendChild(img);
    });

    // Render text content
    const tagline = document.createElement("h1");
    tagline.className = "hero-tagline";
    heroContent.appendChild(tagline);

    const elevator = document.createElement("p");
    elevator.className = "hero-elevator";
    heroContent.appendChild(elevator);

    const actions = document.createElement("div");
    actions.className = "hero-actions";
    actions.innerHTML = `
      <a href="get-involved.html#donate" class="btn primary">Donate</a>
      <a href="programs.html" class="btn outline">Explore programs</a>
    `;
    heroContent.appendChild(actions);

    // Render indicators
    Site.heroSlides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "hero-dot";
      dot.addEventListener("click", () => {
        current = i;
        showSlide(current);
        resetInterval();
      });
      heroIndicators.appendChild(dot);
    });

    const dots = document.querySelectorAll(".hero-dot");

    function showSlide(index) {
      const slides = document.querySelectorAll(".hero-slide");
      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
      tagline.textContent = Site.heroSlides[index].tagline;
      elevator.textContent = Site.heroSlides[index].elevator;

      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    function nextSlide() {
      current = (current + 1) % Site.heroSlides.length;
      showSlide(current);
    }

    function resetInterval() {
      clearInterval(interval);
      interval = setInterval(nextSlide, 5000);
    }

    // Init
    showSlide(current);
    resetInterval();
  }


  /* === COUNTER ANIMATION === */
  function animateCounter(el, target, duration = 1500, suffix = "", prefix = "") {
    let start = 0;
    const isNumber = typeof target === "number";
    if (!isNumber) {
      el.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    const step = target / (duration / 30);
    clearInterval(el._counterInterval); // reset if already running
    el._counterInterval = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(el._counterInterval);
      }
      el.textContent = `${prefix}${Math.floor(start)}${suffix}`;
    }, 30);
  }

  /* === RENDER STATS === */
  const statsGrid = document.getElementById("statsGrid");
  if (statsGrid && Site.stats) {
    statsGrid.innerHTML = "";
    Site.stats.forEach(stat => {
      const statEl = document.createElement("div");
      statEl.className = "stat";
      statEl.innerHTML = `
        <i class="icon ${stat.icon}"></i>
        <div>
          <div class="num">0</div>
          <div>${stat.label}</div>
        </div>
      `;
      statsGrid.appendChild(statEl);
    });

    // Scroll Observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numEl = entry.target.querySelector(".num");
          const statData = Site.stats[Array.from(statsGrid.children).indexOf(entry.target)];

          // reset number before animating again
          numEl.textContent = "0";
          animateCounter(numEl, statData.value, 2000, statData.suffix || "", statData.prefix || "");
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll(".stat").forEach(stat => observer.observe(stat));
  }

  /* === ABOUT RENDER === */
  const aboutGrid = document.getElementById("aboutGrid");
  if (aboutGrid && Site.about) {
    aboutGrid.innerHTML = "";
    Site.about.forEach((item, index) => {
      const card = document.createElement("a");
      card.className = "about-card fade-in";
      card.href = item.link;
      card.style.animationDelay = `${index * 0.2}s`; // stagger effect
      card.innerHTML = `
        <div class="about-image">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="about-body">
          <h3 class="about-title">${item.title}</h3>
          <p>${item.blurb}</p>
        </div>
      `;
      aboutGrid.appendChild(card);
    });
  }

  /* === PROGRAMS RENDER === */
  const programGrid = document.getElementById("programGrid");
  if (programGrid && Site.programs) {
    programGrid.innerHTML = "";
    Site.programs.forEach(program => {
      const slug = program.title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const url = program.link ? program.link : `programs.html#${slug}`;

      const card = document.createElement("div");
      card.className = "program-card";
      card.innerHTML = `
        <div class="program-image">
          <img src="${program.image}" alt="${program.title}" loading="lazy">
        </div>
        <div class="program-body">
          <h3 class="program-title">${program.title}</h3>
          <p class="program-blurb">${program.blurb}</p>
          <a href="${url}" class="card-btn">Learn more →</a>
        </div>
      `;
      programGrid.appendChild(card);
    });
  }

  /* === GET INVOLVED RENDER === */
  const involvedGrid = document.querySelector("#get-involved .grid-3");
  if (involvedGrid && Site.getInvolved) {
    involvedGrid.innerHTML = "";
    Site.getInvolved.forEach(item => {
      const slug = item.title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const url = item.link ? item.link : `get-involved.html#${slug}`;

      const card = document.createElement("div");
      card.className = "involved-card";
      card.innerHTML = `
        <div class="involved-image">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="involved-body">
          <h3 class="involved-title">${item.title}</h3>
          <p>${item.blurb}</p>
          <a href="${url}" class="card-btn">Learn more →</a>
        </div>
      `;
      involvedGrid.appendChild(card);
    });
  }

  /* === GENERIC LOGO RENDERER === */
  function renderLogos(sectionId, items) {
    const grid = document.querySelector(`#${sectionId} .logos-grid`);
    if (!grid || !items) return;

    grid.innerHTML = "";
    items.forEach(item => {
      const logo = document.createElement("img");
      logo.src = item.logo;
      logo.alt = item.name;
      logo.className = "partner-logo";
      logo.loading = "lazy";
      logo.decoding = "async";
      logo.width = 160;
      logo.height = 48;

      if (item.link) {
        const link = document.createElement("a");
        link.href = item.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.appendChild(logo);
        grid.appendChild(link);
      } else {
        grid.appendChild(logo);
      }
    });
  }

  /* === RENDER PARTNERS / SPONSORS / DONORS === */
  renderLogos("partners", Site.partners);
  renderLogos("sponsors", Site.sponsors);
  renderLogos("donors", Site.donors);

  /* === RENDER EVENTS === */
  const eventsSection = document.getElementById("eventsGrid");
  if (eventsSection && Site.events) {
    eventsSection.innerHTML = "";
    Site.events.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <div class="event-image">
          <img src="${event.image}" alt="${event.name}" loading="lazy">
        </div>
        <div class="event-body">
          <h3 class="event-title">${event.name}</h3>
          <p class="event-date">
            <i class="bi bi-calendar-event"></i>
            ${new Date(event.startDate).toLocaleDateString()}
          </p>
          <p class="event-location">
            <i class="bi bi-geo-alt"></i>
            ${event.location.name}, ${event.location.city}
          </p>
          <p class="event-desc">${event.description}</p>
        </div>
      `;
      eventsSection.appendChild(card);
    });

    // === DYNAMIC SCHEMA.ORG JSON ===
    const eventsJson = {
      "@context": "https://schema.org",
      "@graph": Site.events.map(e => ({
        "@type": "Event",
        "name": e.name,
        "startDate": e.startDate,
        "endDate": e.endDate,
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
          "@type": "Place",
          "name": e.location.name,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": e.location.street,
            "addressLocality": e.location.city,
            "addressCountry": e.location.country
          }
        },
        "image": window.location.origin + "/" + e.image,
        "description": e.description,
        "organizer": {
          "@type": "NGO",
          "name": "Urban Refugee Youth Network (URYN)",
          "url": "https://urbanrefugeeyouthnetwork.org",
          "logo": "https://urbanrefugeeyouthnetwork.org/assets/images/logo_landscape.png"
        }
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(eventsJson, null, 2);
    document.head.appendChild(script);
  }

});
