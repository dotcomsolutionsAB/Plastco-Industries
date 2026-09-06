(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobile = document.querySelector(".mobile-nav");

  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (header && document.body.classList.contains("page-home")) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const searchInput = document.querySelector("#product-search");
  const categorySelect = document.querySelector("#product-category");
  const filterCards = document.querySelectorAll(".product-card[data-cat]");
  if (filterCards.length && (searchInput || categorySelect)) {
    const applyFilters = function () {
      const term = searchInput ? searchInput.value.trim().toLowerCase() : "";
      const cat = categorySelect ? categorySelect.value : "all";
      filterCards.forEach(function (card) {
        const matchesCat = cat === "all" || card.getAttribute("data-cat") === cat;
        const matchesTerm = !term || card.textContent.toLowerCase().indexOf(term) !== -1;
        card.classList.toggle("is-hidden", !(matchesCat && matchesTerm));
      });
    };
    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (categorySelect) categorySelect.addEventListener("change", applyFilters);
  }

  const lightbox = document.querySelector("#lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    const lbTitle = lightbox.querySelector(".lightbox-caption strong");
    const lbSpec = lightbox.querySelector(".lightbox-caption span");
    const lbClose = lightbox.querySelector(".lightbox-close");

    var openLightbox = function (img, titleText, specText) {
      if (!img) return;
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || "";
      lbTitle.textContent = titleText || "";
      lbSpec.textContent = specText || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    };
    var closeLightbox = function () {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
    };

    document.querySelectorAll(".product-card").forEach(function (card) {
      card.addEventListener("click", function () {
        const img = card.querySelector(".card-media img");
        const title = card.querySelector("figcaption strong");
        const spec = card.querySelector("figcaption span");
        openLightbox(img, title ? title.textContent : "", spec ? spec.textContent : "");
      });
    });

    document.querySelectorAll(".cert-card").forEach(function (card) {
      card.addEventListener("click", function () {
        const img = card.querySelector("img");
        const title = card.querySelector("h3");
        const spec = card.querySelector("p");
        openLightbox(img, title ? title.textContent : "", spec ? spec.textContent : "");
      });
    });

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }

  const form = document.querySelector("#enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const phone = data.get("phone") || "";
      const interest = data.get("interest") || "";
      const message = data.get("message") || "";
      const subject = encodeURIComponent("Website enquiry from " + name);
      const body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\nInterest: " + interest + "\n\n" + message
      );
      window.location.href =
        "mailto:info@plastcoindustries.com?subject=" + subject + "&body=" + body;
      const ok = form.querySelector(".form-success");
      if (ok) ok.classList.add("show");
      form.reset();
    });
  }
})();
