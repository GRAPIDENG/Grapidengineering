/*
=========================================================
 GEPL API CLIENT
 Google Sheets → Apps Script → Website
=========================================================
*/

const GEPL_API_URL =
  "https://script.google.com/macros/s/AKfycbxdpQVGXjpy3kK5uEFigm-g9LOrFB7AJPUGSTH-cNAnzFIdzmYwemrOaBcpWMNnRFXH/exec";


/* -------------------------------------------------------
   Generic GET
------------------------------------------------------- */

async function apiGet(action, params = {}) {

  const url = new URL(GEPL_API_URL);

  url.searchParams.set("action", action);

  Object.entries(params).forEach(([key, value]) => {

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      url.searchParams.set(key, value);
    }

  });


  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store"
  });


  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    );
  }


  const result = await response.json();


  if (!result.success) {
    throw new Error(
      result.error || "API returned an error."
    );
  }


  return result.data;
}


/* -------------------------------------------------------
   CMS methods
------------------------------------------------------- */

const GEPL = {

  settings() {
    return apiGet("settings");
  },

  hero() {
    return apiGet("hero");
  },

  services() {
    return apiGet("services");
  },

  projects() {
    return apiGet("projects");
  },

  project(id) {
    return apiGet("project", { id });
  },

  clients() {
    return apiGet("clients");
  },

  industries() {
    return apiGet("industries");
  },

  team() {
    return apiGet("team");
  },

  testimonials() {
    return apiGet("testimonials");
  },

  careers() {
    return apiGet("careers");
  }

};
