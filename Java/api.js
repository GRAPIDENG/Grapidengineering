// Phase 1 API layer.
// Phase 2 will connect these methods to Google Apps Script + Google Sheets.
const GEPL_API = {
  ready() {
    return typeof GEPL_CONFIG !== "undefined" &&
      GEPL_CONFIG.API_URL &&
      !GEPL_CONFIG.API_URL.includes("YOUR_GOOGLE_APPS_SCRIPT");
  },
  async get(action, params = {}) {
    if (!this.ready()) throw new Error("CMS API is not configured yet.");
    const query = new URLSearchParams({ action, ...params });
    const response = await fetch(`${GEPL_CONFIG.API_URL}?${query.toString()}`, {
      headers: { "Accept": "application/json" }
    });
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    const json = await response.json();
    if (!json.success) throw new Error(json.error || "API returned an error.");
    return json.data;
  },
  async post(action, payload) {
    if (!this.ready()) throw new Error("CMS API is not configured yet.");
    const response = await fetch(`${GEPL_CONFIG.API_URL}?action=${encodeURIComponent(action)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    const json = await response.json();
    if (!json.success) throw new Error(json.error || "API returned an error.");
    return json.data;
  }
};
