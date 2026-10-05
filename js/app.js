/*
=========================================================
 GEPL GLOBAL FRONTEND
=========================================================
*/

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initNavigation();
    initCompanyDropdown();
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

      const isOpen =
        menu.classList.contains("open");

      menu.classList.toggle(
        "open",
        !isOpen
      );

      button.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

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

          button.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/* =====================================================
   COMPANY DROPDOWN
===================================================== */

function initCompanyDropdown() {


  /* ---------------------------------------------------
     DESKTOP COMPANY DROPDOWN
  --------------------------------------------------- */

  const dropdown =
    document.querySelector(
      ".nav-dropdown"
    );

  const dropdownButton =
    document.querySelector(
      ".nav-dropdown-btn"
    );


  if (
    dropdown &&
    dropdownButton
  ) {

    dropdownButton.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        const isOpen =
          dropdown.classList.contains(
            "open"
          );

        dropdown.classList.toggle(
          "open",
          !isOpen
        );

        dropdownButton.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );

      }
    );


    document.addEventListener(
      "click",
      event => {

        if (
          !dropdown.contains(event.target)
        ) {

          dropdown.classList.remove(
            "open"
          );

          dropdownButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );


    dropdown
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            dropdown.classList.remove(
              "open"
            );

            dropdownButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }


  /* ---------------------------------------------------
     MOBILE COMPANY ACCORDION
  --------------------------------------------------- */

  const mobileButton =
    document.getElementById(
      "mobileCompanyBtn"
    );

  const mobileMenu =
    document.getElementById(
      "mobileCompanyMenu"
    );


  if (
    mobileButton &&
    mobileMenu
  ) {

    mobileButton.addEventListener(
      "click",
      () => {

        const isOpen =
          mobileButton.classList.contains(
            "open"
          );

        mobileButton.classList.toggle(
          "open",
          !isOpen
        );

        mobileMenu.classList.toggle(
          "open",
          !isOpen
        );

        mobileButton.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );

      }
    );


    mobileMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            mobileButton.classList.remove(
              "open"
            );

            mobileMenu.classList.remove(
              "open"
            );

            mobileButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }

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
    {
      passive: true
    }
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

        entries.forEach(
          entry => {

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

          }
        );

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
