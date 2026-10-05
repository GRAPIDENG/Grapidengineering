/*
=========================================================
 GEPL GLOBAL FRONTEND
=========================================================
*/

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initNavigation();
    initHeader();
    initReveal();
    initYear();

  }
);


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

function initNavigation() {

  const button =
    document.getElementById("menuBtn");

  const menu =
    document.getElementById("mobileMenu");


  if (!button || !menu) {
    return;
  }


  button.addEventListener(
    "click",
    () => {

      menu.classList.toggle("open");

    }
  );


  menu.querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          menu.classList.remove(
            "open"
          );

        }
      );

    });

}


/* =====================================================
   HEADER SCROLL
===================================================== */

function initHeader() {

  const header =
    document.getElementById(
      "siteHeader"
    );

  if (!header) {
    return;
  }


  function updateHeader() {

    if (window.scrollY > 40) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }

  }


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function initReveal() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  if (!elements.length) {
    return;
  }


  if (
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    elements.forEach(
      element =>
        element.classList.add(
          "visible"
        )
    );

    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: .12
      }
    );


  elements.forEach(
    element =>
      observer.observe(element)
  );

}


/* =====================================================
   FOOTER YEAR
===================================================== */

function initYear() {

  const year =
    document.getElementById(
      "year"
    );

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

}
