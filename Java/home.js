// Phase 1: static premium homepage.
// Dynamic CMS rendering will be enabled after the visual prototype is approved.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const message = document.getElementById("formMessage");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = "";

    const data = Object.fromEntries(new FormData(fomaxxx).entries());
    if (data.website) return;

    if (!data.name || !data.email || !data.phone) {
      message.textContent = "Please complete the required fields.";
      return;
    }

    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email)) {
      message.textContent = "Please enter a valid email address.";
      return;
    }

    if (!GEPL_API.ready()) {
      message.textContent = "Enquiry API is not connected in this prototype. Connect the Google Apps Script backend in config/config.js.";
      return;
    }

    try {
      const button = form.querySelector("button[type=submit]");
      button.disabled = true;
      button.textContent = "Submitting…";
      await GEPL_API.post("contact", data);
      form.reset();
      message.textContent = "Thank you. Our team will contact you shortly.";
      button.disabled = false;
      button.innerHTML = 'Submit Enquiry <span>↗</span>';
    } catch (error) {
      console.error(error);
      message.textContent = "Some content is temporarily unavailable. Please try again.";
      const button = form.querySelector("button[type=submit]");
      button.disabled = false;
      button.innerHTML = 'Submit Enquiry <span>↗</span>';
    }
  });
});
