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

  document.querySelectorAll(".filters").forEach(function (group) {
    const buttons = group.querySelectorAll("button");
    const cards = document.querySelectorAll(".product-card[data-cat]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        const cat = btn.getAttribute("data-filter");
        cards.forEach(function (card) {
          card.classList.toggle("is-hidden", cat !== "all" && card.getAttribute("data-cat") !== cat);
        });
      });
    });
  });

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
