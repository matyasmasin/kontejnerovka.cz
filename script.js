const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-inquiry-form]");
const formNote = document.querySelector("[data-form-note]");
const copyInquiryButton = document.querySelector("[data-copy-inquiry]");

const GA_MEASUREMENT_ID = "G-BCXFMBWZJ4";
const ANALYTICS_CONSENT_KEY = "kontejnerovka_analytics_consent";
const ANALYTICS_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

const getCookieConsent = () => {
  try {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${ANALYTICS_CONSENT_KEY}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  } catch {
    return null;
  }
};

const getAnalyticsConsent = () => {
  try {
    return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) || getCookieConsent();
  } catch {
    return getCookieConsent();
  }
};

const setAnalyticsConsent = (value) => {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // Analytics consent is optional. If storage is blocked, keep the site fully usable.
  }

  try {
    document.cookie = `${ANALYTICS_CONSENT_KEY}=${encodeURIComponent(value)}; path=/; max-age=${ANALYTICS_COOKIE_MAX_AGE}; SameSite=Lax`;
  } catch {
    // Cookie storage is a fallback only.
  }
};

const clearAnalyticsConsent = () => {
  try {
    window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
  } catch {
    // If storage is unavailable, removing the cookie below is enough.
  }

  try {
    document.cookie = `${ANALYTICS_CONSENT_KEY}=; path=/; max-age=0; SameSite=Lax`;
  } catch {
    // Cookie storage is a fallback only.
  }
};

const hasAnalyticsConsent = () => getAnalyticsConsent() === "granted";

const loadAnalytics = () => {
  if (!GA_MEASUREMENT_ID || window.__kontejnerovkaAnalyticsLoaded) return;

  window.__kontejnerovkaAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

const track = (eventName, eventParams = {}) => {
  if (!hasAnalyticsConsent()) return false;
  loadAnalytics();

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      transport_type: "beacon",
      ...eventParams,
    });
    return true;
  }

  return false;
};

const pageHasImageHero = Boolean(document.querySelector(".hero"));

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", !pageHasImageHero || window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  header?.classList.toggle("is-open", Boolean(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    header?.classList.remove("is-open");
  }
});

const getInquiryText = () => {
  const data = new FormData(form);
  const lines = [
    "Dobrý den,",
    "",
    "mám zájem o službu Kontejnerovka.cz.",
    "",
    `Jméno: ${data.get("name") || ""}`,
    `Telefon: ${data.get("phone") || ""}`,
    `E-mail: ${data.get("email") || ""}`,
    `Lokalita: ${data.get("location") || ""}`,
    `Termín: ${data.get("date") || ""}`,
    `Služba: ${data.get("service") || ""}`,
    `Množství: ${data.get("amount") || ""}`,
    `Přístup: ${data.get("access") || ""}`,
    "",
    "Poznámka:",
    `${data.get("message") || ""}`,
    "",
    "Prosím o cenu a možný termín.",
  ];

  return lines.join("\n");
};

form?.addEventListener("submit", (event) => {
  track("lead_form_submit", {
    form_name: "main_inquiry",
    method: "web_form",
  });

  if (form.action.includes("api.web3forms.com")) {
    if (formNote) {
      formNote.textContent = "Odesílám poptávku. Během chvíle by měla dorazit do e-mailu.";
    }
    return;
  }

  event.preventDefault();

  const mailto = new URL("mailto:info@kontejnerovka.cz");
  mailto.searchParams.set("subject", "Poptávka z webu Kontejnerovka.cz");
  mailto.searchParams.set("body", getInquiryText());
  window.location.href = mailto.toString();

  if (formNote) {
    formNote.textContent = "E-mail s poptávkou je připravený k odeslání ve vašem poštovním programu.";
  }
});

copyInquiryButton?.addEventListener("click", async () => {
  if (!form?.reportValidity()) return;

  try {
    await navigator.clipboard.writeText(getInquiryText());
    track("inquiry_copy", {
      form_name: "main_inquiry",
      method: "copy_inquiry",
    });
    if (formNote) {
      formNote.textContent = "Údaje poptávky jsou zkopírované. Můžete je vložit do SMS, e-mailu nebo chatu.";
    }
  } catch {
    if (formNote) {
      formNote.textContent = "Kopírování se nepovedlo. Pošlete poptávku e-mailem nebo zavolejte.";
    }
  }
});

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", () => {
    track("click_phone", {
      link_url: link.href,
      method: "phone",
    });
    track("generate_lead", {
      currency: "CZK",
      method: "phone_click",
    });
  });
});

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener("click", () => {
    track("click_email", {
      link_url: link.href,
      method: "email",
    });
    track("generate_lead", {
      currency: "CZK",
      method: "email_click",
    });
  });
});

const trackThankYouPage = () => {
  if (!window.location.pathname.endsWith("/dekujeme.html")) return;

  try {
    if (window.sessionStorage.getItem("kontejnerovka_thank_you_tracked") === "1") return;
  } catch {
    // Continue without duplicate protection if sessionStorage is unavailable.
  }

  const tracked = track("generate_lead", {
    currency: "CZK",
    method: "web_form",
  });

  if (tracked) {
    try {
      window.sessionStorage.setItem("kontejnerovka_thank_you_tracked", "1");
    } catch {
      // Non-critical duplicate protection only.
    }
  }
};

const hideCookieBanner = () => {
  document.querySelector("[data-cookie-banner]")?.remove();
};

const createCookieBanner = () => {
  if (getAnalyticsConsent()) return;

  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("data-cookie-banner", "");
  banner.setAttribute("aria-label", "Nastavení analytických cookies");
  banner.innerHTML = `
    <div>
      <strong>Pomůžete nám zlepšit web?</strong>
      <p>Používáme volitelné analytické cookies Google Analytics, abychom viděli, které stránky a kontaktní tlačítka fungují. Bez souhlasu poběží jen nezbytné funkce webu.</p>
      <a href="ochrana-osobnich-udaju.html">Ochrana osobních údajů</a>
    </div>
    <div class="cookie-actions">
      <button class="btn btn-dark" type="button" data-cookie-decline>Pouze nezbytné</button>
      <button class="btn btn-primary" type="button" data-cookie-accept>Povolit měření</button>
    </div>
  `;

  document.body.appendChild(banner);

  banner.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
    setAnalyticsConsent("granted");
    loadAnalytics();
    hideCookieBanner();
    track("analytics_consent_granted");
    trackThankYouPage();
  });

  banner.querySelector("[data-cookie-decline]")?.addEventListener("click", () => {
    setAnalyticsConsent("denied");
    hideCookieBanner();
  });
};

const addPrivacyControls = () => {
  const footerLinks = document.querySelector(".site-footer div:last-child");
  if (!footerLinks || footerLinks.querySelector("[data-cookie-settings]")) return;

  const privacyLink = document.createElement("a");
  privacyLink.href = "ochrana-osobnich-udaju.html";
  privacyLink.textContent = "Ochrana osobních údajů";
  footerLinks.appendChild(privacyLink);

  const settingsButton = document.createElement("button");
  settingsButton.className = "footer-privacy-button";
  settingsButton.type = "button";
  settingsButton.setAttribute("data-cookie-settings", "");
  settingsButton.textContent = "Nastavení cookies";
  settingsButton.addEventListener("click", () => {
    clearAnalyticsConsent();
    hideCookieBanner();
    createCookieBanner();
  });
  footerLinks.appendChild(settingsButton);
};

if (hasAnalyticsConsent()) {
  loadAnalytics();
}

window.addEventListener("DOMContentLoaded", () => {
  window.lucide?.createIcons();
  addPrivacyControls();
  createCookieBanner();
  trackThankYouPage();
});
