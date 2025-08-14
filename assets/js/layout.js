// NAV + FOOTER as Web Components (works offline, no server)
class SiteNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<nav class="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
  <div class="container">
    <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="index.html">
      <span id="brandName">URYNet</span>
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
            aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse pt-3 pt-lg-0" id="nav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link px-lg-3" href="about.html" data-page="about.html">
            <i class="bi bi-info-circle d-none d-lg-inline me-2" aria-hidden="true"></i> About
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link px-lg-3" href="programs.html" data-page="programs.html">
            <i class="bi bi-grid d-none d-lg-inline me-2" aria-hidden="true"></i> Programs
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link px-lg-3" href="events.html" data-page="events.html">
            <i class="bi bi-calendar-event d-none d-lg-inline me-2" aria-hidden="true"></i> Events
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link px-lg-3" href="stories.html" data-page="stories.html">
            <i class="bi bi-newspaper d-none d-lg-inline me-2" aria-hidden="true"></i> News/Stories
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link px-lg-3" href="get-involved.html" data-page="get-involved.html">
            <i class="bi bi-handshake d-none d-lg-inline me-2" aria-hidden="true"></i> Get Involved
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link px-lg-3" href="resources.html" data-page="resources.html">
            <i class="bi bi-folder2 d-none d-lg-inline me-2" aria-hidden="true"></i> Resources
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link px-lg-3" href="contact.html" data-page="contact.html">
            <i class="bi bi-chat-dots d-none d-lg-inline me-2" aria-hidden="true"></i> Contact
          </a>
        </li>
      </ul>
      <div class="d-flex flex-wrap gap-2 ms-lg-3">
        <a href="get-involved.html#donate" class="btn btn-primary btn-sm d-inline-flex align-items-center">
          <i class="bi bi-heart-fill me-2" aria-hidden="true"></i> Donate
        </a>
        <a href="get-involved.html#volunteer" class="btn btn-outline-primary btn-sm d-inline-flex align-items-center">
          <i class="bi bi-people me-2" aria-hidden="true"></i> Volunteer
        </a>
      </div>
    </div>
  </div>
</nav>`;
    const current = location.pathname.split('/').pop() || 'index.html';
    this.querySelectorAll('a.nav-link').forEach(a => {
      if (a.dataset.page && current === a.dataset.page) a.classList.add('active');
      if (!a.dataset.page && (current === '' || current === 'index.html')) a.classList.add('active');
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<footer class="footer mt-5 bg-body-tertiary border-top">
  <div class="container py-5">
    <div class="row g-4 align-items-start text-md-start text-center">
      <div class="col-md-4">
        <h5 class="fw-bold mb-3">Urban Refugee Youth Network</h5>
        <div class="contact small text-secondary">
          <p class="mb-1"><i class="bi bi-envelope me-2 text-primary"></i> info@urbanrefugeeyouthnetwork.org</p>
          <p class="mb-1"><i class="bi bi-telephone me-2 text-primary"></i> +256 775 251182</p>
          <p class="mb-1"><i class="bi bi-whatsapp me-2 text-success"></i> +256 789 025246</p>
          <p class="mb-0"><i class="bi bi-geo-alt me-2 text-primary"></i> Kampala, Uganda</p>
        </div>
      </div>

      <div class="col-md-4">
        <h6 class="text-uppercase text-secondary mb-2">Follow</h6>
        <div class="d-flex justify-content-md-start justify-content-center flex-wrap gap-2">
          <a class="btn-icon" href="https://www.facebook.com/profile.php?id=61562093632423" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a class="btn-icon" href="https://www.instagram.com/urbanrefugeeyouthnetwork/" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a class="btn-icon" href="https://x.com/refugee_net" aria-label="X"><i class="bi bi-twitter-x"></i></a>
          <a class="btn-icon" href="https://www.linkedin.com/company/urbanrefugeeyouthnetwork" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
          <a class="btn-icon" href="https://www.youtube.com/@urbanrefugeeyouthnetwork-uryn" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
        </div>
      </div>

      <div class="col-md-4">
        <h6 class="text-uppercase text-secondary mb-2">Newsletter</h6>
        <form action="#" class="input-group input-group-lg">
          <span class="input-group-text d-none d-md-inline" id="newsletter-label"><i class="bi bi-envelope-open"></i></span>
          <input type="email" class="form-control" placeholder="Your email" aria-label="Your email" aria-describedby="newsletter-label">
          <button class="btn btn-primary d-inline-flex align-items-center" type="submit">
            <i class="bi bi-send me-2" aria-hidden="true"></i> Join
          </button>
        </form>
        <p class="small text-secondary mt-2 mb-0">No spam. Unsubscribe anytime.</p>
      </div>
    </div>

    <hr class="border-secondary-subtle my-4">

    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
      <div>© <span id="year"></span> Urban Refugee Youth Network. All rights reserved.</div>
      <div class="d-flex gap-3">
        <a href="resources.html#privacy">Privacy</a>
        <a href="resources.html#safeguarding">Safeguarding</a>
        <a href="resources.html#terms">Terms</a>
      </div>
    </div>
  </div>
</footer>`;
    const y = this.querySelector('#year'); if (y) y.textContent = new Date().getFullYear();
  }
}

customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);