/*
=========================================================
 GEPL PREMIUM HOMEPAGE
 CMS DATA LOADER
=========================================================
*/

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initHome();

  }
);


/* =====================================================
   HOMEPAGE INITIALIZATION
===================================================== */

async function initHome() {

  /*
    Load CMS datasets once.
    This prevents duplicate API requests.
  */

  const [
    hero,
    services,
    projects,
    industries,
    clients
  ] = await Promise.allSettled([

    GEPL.hero(),
    GEPL.services(),
    GEPL.projects(),
    GEPL.industries(),
    GEPL.clients()

  ]);


  const data = {

    hero:
      hero.status === "fulfilled"
        ? hero.value
        : [],

    services:
      services.status === "fulfilled"
        ? services.value
        : [],

    projects:
      projects.status === "fulfilled"
        ? projects.value
        : [],

    industries:
      industries.status === "fulfilled"
        ? industries.value
        : [],

    clients:
      clients.status === "fulfilled"
        ? clients.value
        : []

  };


  /*
    Store globally only if other
    frontend modules need the data.
  */

  window.GEPL_HOME_DATA = data;


  loadHero(data.hero);
  loadServices(data.services);
  loadProjects(data.projects);
  loadIndustries(data.industries);
  loadClients(data.clients);
  loadStats(
    data.projects,
    data.services,
    data.clients
  );

}


/* =====================================================
   HERO
===================================================== */

function loadHero(rows) {

  try {

    if (!rows || !rows.length) {
      return;
    }


    const hero =
      rows.find(
        row =>
          String(row.status)
            .toLowerCase() === "published"
      ) || rows[0];


    const subtitle =
      document.getElementById(
        "heroSubtitle"
      );

    const title =
      document.getElementById(
        "heroTitle"
      );

    const description =
      document.getElementById(
        "heroDescription"
      );


    if (
      subtitle &&
      hero.subtitle
    ) {

      subtitle.textContent =
        hero.subtitle;

    }


    if (
      title &&
      hero.title
    ) {

      title.textContent =
        hero.title;

    }


    if (
      description &&
      hero.description
    ) {

      description.textContent =
        hero.description;

    }


    /*
      Optional CMS background image
    */

    if (
      hero.background_image
    ) {

      const heroImage =
        document.querySelector(
          ".hero-image"
        );


      if (heroImage) {

        heroImage.style.backgroundImage =
          `url("${escapeAttribute(
            hero.background_image
          )}")`;

      }

    }

  }

  catch (error) {

    console.warn(
      "GEPL Hero:",
      error.message
    );

  }

}


/* =====================================================
   SERVICES
===================================================== */

function loadServices(services) {

  const container =
    document.getElementById(
      "servicesGrid"
    );


  if (!container) {
    return;
  }


  try {

    if (
      !services ||
      !services.length
    ) {

      /*
        Keep premium HTML fallback.
      */

      return;

    }


    const published =
      services

        .filter(
          item =>
            String(item.status)
              .toLowerCase() ===
            "published"
        )

        .sort(
          (a, b) =>
            Number(
              a.display_order || 999
            ) -
            Number(
              b.display_order || 999
            )
        );


    if (!published.length) {
      return;
    }


    container.innerHTML =
      published
        .map(
          (service, index) => {

            const number =
              String(index + 1)
                .padStart(2, "0");


            return `

              <article class="service-empty">

                <span>
                  ${number}
                </span>

                <h3>
                  ${escapeHTML(
                    service.title || ""
                  )}
                </h3>

                <p>
                  ${escapeHTML(
                    service.short_description || ""
                  )}
                </p>

                <a
                  href="service.html?id=${encodeURIComponent(
                    service.id || ""
                  )}"
                >
                  Explore →
                </a>

              </article>

            `;

          }
        )
        .join("");

  }

  catch (error) {

    console.warn(
      "GEPL Services:",
      error.message
    );

  }

}


/* =====================================================
   PROJECTS
===================================================== */

function loadProjects(projects) {

  const projectBox =
    document.getElementById(
      "featuredProject"
    );


  if (!projectBox) {
    return;
  }


  try {

    if (
      !projects ||
      !projects.length
    ) {

      return;

    }


    const published =
      projects.filter(
        item =>
          String(item.status)
            .toLowerCase() ===
          "published"
      );


    if (!published.length) {
      return;
    }


    const featured =
      published.find(
        item =>
          String(item.featured)
            .toLowerCase() ===
          "true"
      ) || published[0];


    /*
      Temporary fallback image.
      Replace with GEPL placeholder later.
    */

    const image =
      featured.cover_image ||
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85";


    projectBox.innerHTML = `

      <div class="project-image">

        <img
          src="${escapeAttribute(image)}"
          alt="${escapeAttribute(
            featured.project_name ||
            "GEPL Project"
          )}"
          loading="lazy"
          decoding="async"
        >

      </div>


      <div class="project-info">

        <span class="project-number">

          ${escapeHTML(
            featured.category ||
            "FEATURED PROJECT"
          )}

        </span>


        <h3>

          ${escapeHTML(
            featured.project_name ||
            ""
          )}

        </h3>


        <p>

          ${escapeHTML(
            featured.description ||
            ""
          )}

        </p>


        <a
          href="project.html?id=${encodeURIComponent(
            featured.id || ""
          )}"
          class="text-link"
        >

          View Project →

        </a>

      </div>

    `;

  }

  catch (error) {

    console.warn(
      "GEPL Projects:",
      error.message
    );

  }

}


/* =====================================================
   INDUSTRIES
===================================================== */

function loadIndustries(industries) {

  const container =
    document.getElementById(
      "industriesList"
    );


  if (!container) {
    return;
  }


  try {

    if (
      !industries ||
      !industries.length
    ) {

      return;

    }


    const published =
      industries

        .filter(
          item =>
            String(item.status)
              .toLowerCase() ===
            "published"
        )

        .sort(
          (a, b) =>
            Number(
              a.display_order || 999
            ) -
            Number(
              b.display_order || 999
            )
        );


    if (!published.length) {
      return;
    }


    container.innerHTML =
      published
        .map(
          item => `

            <a href="industries.html">

              ${escapeHTML(
                item.name || ""
              )}

              <span>↗</span>

            </a>

          `
        )
        .join("");

  }

  catch (error) {

    console.warn(
      "GEPL Industries:",
      error.message
    );

  }

}


/* =====================================================
   CLIENTS
===================================================== */

function loadClients(clients) {

  try {

    /*
      Keep available globally
      for future client section.
    */

    window.GEPL_CLIENTS =
      clients || [];

  }

  catch (error) {

    console.warn(
      "GEPL Clients:",
      error.message
    );

  }

}


/* =====================================================
   STATS
===================================================== */

function loadStats(
  projects,
  services,
  clients
) {

  try {

    const publishedProjects =
      (projects || []).filter(
        item =>
          String(item.status)
            .toLowerCase() ===
          "published"
      );


    const publishedServices =
      (services || []).filter(
        item =>
          String(item.status)
            .toLowerCase() ===
          "published"
      );


    const publishedClients =
      (clients || []).filter(
        item =>
          String(item.status)
            .toLowerCase() ===
          "published"
      );


    setStat(
      "projects",
      publishedProjects.length
    );


    setStat(
      "services",
      publishedServices.length
    );


    setStat(
      "clients",
      publishedClients.length
    );

  }

  catch (error) {

    console.warn(
      "GEPL Stats:",
      error.message
    );

  }

}


/* =====================================================
   STAT VALUE
===================================================== */

function setStat(
  name,
  value
) {

  const element =
    document.querySelector(
      `[data-stat="${name}"]`
    );


  if (!element) {
    return;
  }


  if (!value) {
    return;
  }


  animateNumber(
    element,
    Number(value)
  );

}


/* =====================================================
   NUMBER ANIMATION
===================================================== */

function animateNumber(
  element,
  target
) {

  const duration = 900;

  const startTime =
    performance.now();


  function update(
    currentTime
  ) {

    const progress =
      Math.min(
        (
          currentTime -
          startTime
        ) /
        duration,
        1
      );


    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const current =
      Math.round(
        target * eased
      );


    element.textContent =
      `${current}+`;


    if (
      progress < 1
    ) {

      requestAnimationFrame(
        update
      );

    }

  }


  requestAnimationFrame(
    update
  );

}


/* =====================================================
   SECURITY HELPERS
===================================================== */

function escapeHTML(value) {

  return String(
    value ?? ""
  )

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


function escapeAttribute(value) {

  return escapeHTML(
    value
  );

}
