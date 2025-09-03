class SiteNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="site-nav">
      <div class="nav-left">
        <a href="index.html">
          <img src="assets/images/logo_landscape.png" alt="Urban Refugee Youth Network Logo" class="nav-logo">
        </a>
      </div>
      <div class="nav-center">
        <div class="nav-links">
          <a href="about.html" data-page="about.html"><i class="bi bi-info-circle"></i> About</a>
          <a href="programs.html" data-page="programs.html"><i class="bi bi-grid"></i> Programs</a>
          <a href="events.html" data-page="events.html"><i class="bi bi-calendar-event"></i> Events</a>
          <a href="stories.html" data-page="stories.html"><i class="bi bi-newspaper"></i> News/Stories</a>
          <a href="get-involved.html" data-page="get-involved.html"><i class="bi bi-heart"></i> Get Involved</a>
          <a href="resources.html" data-page="resources.html"><i class="bi bi-folder2"></i> Resources</a>
          <a href="contact.html" data-page="contact.html"><i class="bi bi-envelope"></i> Contact</a>
        </div>
      </div>
      <div class="nav-right">
        <a href="get-involved.html#donate" class="btn primary"><i class="bi bi-heart-fill"></i> Donate</a>
        <a href="get-involved.html#volunteer" class="btn outline"><i class="bi bi-people"></i> Volunteer</a>
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><i class="bi bi-list"></i></button>
      </div>
    </nav>`;

    this.initNavigation();
  }

  initNavigation() {
    const current = location.pathname.split('/').pop() || 'index.html';
    this.querySelectorAll('.nav-links a').forEach(a => {
      if (a.dataset.page && current === a.dataset.page) {
        a.classList.add('active');
      }
      if (!a.dataset.page && (current === '' || current === 'index.html')) {
        a.classList.add('active');
      }
    });

    const toggle = this.querySelector('.nav-toggle');
    const links = this.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('show');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.querySelector('i').className = isOpen ? 'bi bi-x' : 'bi bi-list';
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target) && links.classList.contains('show')) {
        links.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('i').className = 'bi bi-list';
      }
    });

    this.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          links.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.querySelector('i').className = 'bi bi-list';
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && links.classList.contains('show')) {
        links.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('i').className = 'bi bi-list';
      }
    });

    // Scroll effect
    window.addEventListener('scroll', () => {
      const nav = this.querySelector('.site-nav');
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer class="site-footer">
      <div class="floating-elements">
        <div class="floating-circle"></div>
        <div class="floating-circle"></div>
      </div>

      <div class="footer-columns">
        <div>
          <a href="index.html">
            <img src="assets/images/logo_landscape.png" alt="Urban Refugee Youth Network Logo" class="footer-logo">
          </a>
          <p><i class="bi bi-envelope"></i> info@urbanrefugeeyouthnetwork.org</p>
          <p><i class="bi bi-telephone"></i> +256 775 251182</p>
          <p><i class="bi bi-whatsapp"></i> +256 789 025246</p>
          <p><i class="bi bi-geo-alt"></i> Kampala, Uganda</p>
        </div>
        <div>
          <h6><i class="bi bi-share"></i> Follow Us</h6>
          <div class="social-links">
            <a href="https://www.facebook.com/profile.php?id=61562093632423" aria-label="Facebook" target="_blank"><i class="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/urbanrefugeeyouthnetwork/" aria-label="Instagram" target="_blank"><i class="bi bi-instagram"></i></a>
            <a href="https://x.com/refugee_net" aria-label="Twitter/X" target="_blank"><i class="bi bi-twitter-x"></i></a>
            <a href="https://www.linkedin.com/company/urbanrefugeeyouthnetwork" aria-label="LinkedIn" target="_blank"><i class="bi bi-linkedin"></i></a>
            <a href="https://www.youtube.com/@urbanrefugeeyouthnetwork-uryn" aria-label="YouTube" target="_blank"><i class="bi bi-youtube"></i></a>
          </div>
        </div>
        <div>
          <h6><i class="bi bi-envelope-open"></i> Stay Connected</h6>
          <form class="newsletter" id="newsletter-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit"><i class="bi bi-send"></i> Subscribe</button>
          </form>
          <p class="small">Join our newsletter for updates. No spam, unsubscribe anytime.</p>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© <span id="year"></span> Urban Refugee Youth Network. All rights reserved.</span>
        <div class="footer-links">
          <a href="resources.html#privacy">Privacy Policy</a>
          <a href="resources.html#safeguarding">Safeguarding</a>
          <a href="resources.html#terms">Terms of Service</a>
        </div>
      </div>
    </footer>`;

    this.initFooter();
  }

  initFooter() {
    const yearElement = this.querySelector('#year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    const form = this.querySelector('#newsletter-form');
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (input.value && this.isValidEmail(input.value)) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check-circle"></i> Subscribed!';
        button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

        setTimeout(() => {
          button.innerHTML = originalText;
          button.style.background = '';
          input.value = '';
        }, 2000);
      } else {
        input.style.borderColor = '#dc3545';
        input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';

        setTimeout(() => {
          input.style.borderColor = '';
          input.style.boxShadow = '';
        }, 2000);
      }
    });
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);
