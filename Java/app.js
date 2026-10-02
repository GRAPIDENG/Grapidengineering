document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const progress = document.querySelector(".site-progress span");
  const menuToggle = document.querySelector(repeatepeatepeat.menu-toggle");
  const navLinks = document.querySelectorAll(".main-nav a");

  const updateScrollUI = () => {
    header?.classList.toggle("scrolled", window.scrollY > 30);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
    }
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  menuToggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.forEach(link => link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const counters = document.querySelectorAll("[data-counter]");
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.counter);
      const suffix = el.dataset.suffix || "";
      const duration = 1000;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: .6 });
  counters.forEach(el => counterObserver.observe(el));

  document.querySelectorAll("[data-whatsapp]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const phone = "VERIFY_WITH_MANAGEMENT";
      const message = encodeURIComponent("Hello Grapid Engineering, I would like to discuss an engineering project.");
      if (/^\\d+$/.test(phone)) window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
      else alert("WhatsApp number is pending management verification.");
    });
  });
});
