const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-inquiry-form]");
const formNote = document.querySelector("[data-form-note]");
const copyInquiryButton = document.querySelector("[data-copy-inquiry]");

const GA_MEASUREMENT_ID = "G-BCXFMBWZJ4";
const ANALYTICS_CONSENT_KEY = "kontejnerovka_analytics_consent";
const ANALYTICS_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
const CALCULATOR_STORAGE_KEY = "kontejnerovka_calculator_inquiry";

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

const servicePages = new Set([
  "pristaveni-kontejneru.html",
  "kontejner-na-sut.html",
  "kontejner-na-stavebni-odpad.html",
  "velkoobjemovy-kontejner.html",
  "odvoz-suti.html",
  "odvoz-zeminy.html",
  "odvoz-odpadu.html",
  "odvoz-dreva-bioodpadu.html",
  "odvoz-betonu.html",
  "dovoz-pisku.html",
  "dovoz-sterku.html",
  "dovoz-kacirku.html",
  "dovoz-pisku-sterku.html",
  "dovoz-recyklatu.html",
  "dovoz-betonu.html",
]);

const getPageSlug = () => {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
};

const getPageType = () => {
  const slug = getPageSlug();
  if (slug === "index.html") return "home";
  if (slug.startsWith("kontejnery-")) return "local_landing";
  if (servicePages.has(slug)) return "service_landing";
  if (["cenik.html", "poradna.html", "lokality.html", "reference.html", "o-nas.html"].includes(slug)) return "support";
  if (slug === "dekujeme.html") return "thank_you";
  return "other";
};

const cleanAnalyticsValue = (value, maxLength = 90) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const getLinkType = (href) => {
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("#kontakt")) return "form_anchor";
  if (href.startsWith("#")) return "anchor";
  if (href.startsWith("http") && !href.includes(window.location.hostname)) return "external";
  return "internal";
};

const ensurePageUrlField = () => {
  if (!form) return;

  let pageUrlField = form.querySelector('input[name="page_url"]');
  if (!(pageUrlField instanceof HTMLInputElement)) {
    pageUrlField = document.createElement("input");
    pageUrlField.type = "hidden";
    pageUrlField.name = "page_url";
    form.appendChild(pageUrlField);
  }

  pageUrlField.value = window.location.href;
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
    "mám zájem o nacenění služby Kontejnerovka.cz.",
    "",
    `Jméno: ${data.get("name") || ""}`,
    `Telefon: ${data.get("phone") || ""}`,
    `E-mail: ${data.get("email") || ""}`,
    `Obec / adresa: ${data.get("location") || ""}`,
    `Termín: ${data.get("date") || ""}`,
    `Služba: ${data.get("service") || ""}`,
    `Množství: ${data.get("amount") || ""}`,
    `Přístup: ${data.get("access") || ""}`,
    `Fotka: ${data.get("photo") || ""}`,
    "",
    "Poznámka:",
    `${data.get("message") || ""}`,
    "",
    "Prosím o cenu, možný termín a případně doporučení vhodné velikosti kontejneru.",
  ];

  return lines.join("\n");
};

form?.addEventListener("submit", (event) => {
  ensurePageUrlField();
  const submittedData = new FormData(form);

  track("lead_form_submit", {
    form_name: "main_inquiry",
    method: "web_form",
    page_type: getPageType(),
    page_path: window.location.pathname,
    selected_service: cleanAnalyticsValue(submittedData.get("service")),
    has_email: submittedData.get("email") ? "yes" : "no",
    has_amount: submittedData.get("amount") ? "yes" : "no",
    has_photo_note: submittedData.get("photo") ? "yes" : "no",
  });

  if (form.action.includes("api.web3forms.com")) {
    if (formNote) {
      formNote.textContent = "Odesílám údaje k nacenění. Pokud bude něco chybět, ozvu se pro doplnění.";
    }
    return;
  }

  event.preventDefault();

  const mailto = new URL("mailto:info@kontejnerovka.cz");
  mailto.searchParams.set("subject", "Poptávka z webu Kontejnerovka.cz");
  mailto.searchParams.set("body", getInquiryText());
  window.location.href = mailto.toString();

  if (formNote) {
    formNote.textContent = "E-mail s údaji k nacenění je připravený k odeslání ve vašem poštovním programu.";
  }
});

copyInquiryButton?.addEventListener("click", async () => {
  if (!form?.reportValidity()) return;
  const copiedData = new FormData(form);

  try {
    await navigator.clipboard.writeText(getInquiryText());
    track("inquiry_copy", {
      form_name: "main_inquiry",
      method: "copy_inquiry",
      page_type: getPageType(),
      selected_service: cleanAnalyticsValue(copiedData.get("service")),
    });
    if (formNote) {
      formNote.textContent = "Údaje k nacenění jsou zkopírované. Můžete je vložit do SMS, e-mailu nebo chatu.";
    }
  } catch {
    if (formNote) {
      formNote.textContent = "Kopírování se nepovedlo. Pošlete poptávku e-mailem nebo zavolejte.";
    }
  }
});

const getCheckedCalculatorOption = (calculator, name) => {
  const option = calculator.querySelector(`input[name="${name}"]:checked`);
  if (!(option instanceof HTMLInputElement)) return null;

  return {
    label: option.dataset.label || option.value,
    value: option.value,
    score: Number.parseInt(option.dataset.score || "0", 10),
    service: option.dataset.service || "",
  };
};

const getCalculatorState = (calculator) => {
  const fields = {
    job: getCheckedCalculatorOption(calculator, "job"),
    location: getCheckedCalculatorOption(calculator, "location"),
    size: getCheckedCalculatorOption(calculator, "size"),
    access: getCheckedCalculatorOption(calculator, "access"),
    term: getCheckedCalculatorOption(calculator, "term"),
  };

  const score = Object.values(fields).reduce((total, field) => total + (field?.score || 0), 0);
  const hasUnknown = Object.values(fields).some((field) => field?.value.includes("nevím") || field?.value.includes("poradit"));

  let band = {
    key: "middle",
    title: "Orientačně: střední cenová hladina",
    text: "Nejde o závaznou nabídku. Přesnou cenu potvrdíme podle adresy, druhu odpadu, množství, přístupu a termínu.",
  };

  if (score <= 6 && !hasUnknown) {
    band = {
      key: "lower",
      title: "Orientačně: nižší až střední cenová hladina",
      text: "Zakázka působí jednodušeji. Přesnou cenu ale potvrdíme až podle konkrétní adresy, odpadu, množství a přístupu.",
    };
  } else if (score >= 11 || hasUnknown) {
    band = {
      key: "higher",
      title: "Orientačně: vyšší nebo nejasná cenová hladina",
      text: "Zakázka potřebuje upřesnění. Nejde o závaznou nabídku, cenu potvrdíme podle odpadu, trasy, množství, přístupu a termínu.",
    };
  }

  return { fields, score, band, hasUnknown };
};

const getCalculatorFactors = ({ fields, hasUnknown }) => {
  const factors = [];

  if (fields.job?.value.includes("zeminy")) {
    factors.push("Zemina je těžká; cenu ovlivní objem, hmotnost, vlhkost a možnost naložení.");
  } else if (fields.job?.value.includes("stavebního") || fields.job?.value.includes("objemného")) {
    factors.push("Směsný nebo objemný odpad je nutné upřesnit, protože likvidace může být náročnější než čistá suť.");
  } else if (fields.job?.value.includes("dovoz")) {
    factors.push("U dovozu materiálu rozhoduje množství, frakce, dostupnost a místo složení.");
  } else {
    factors.push("Nejvíc rozhodne typ odpadu nebo materiálu a jeho čistota.");
  }

  if ((fields.location?.score || 0) <= 1) {
    factors.push("Blízká lokalita kolem Svárova, Unhoště, Nučic nebo Rudné může pomoct plánování trasy.");
  } else {
    factors.push("Vzdálenější lokalita nebo městské stání může zvýšit čas dopravy a domluvy.");
  }

  if (fields.access?.value.includes("ulici")) {
    factors.push("Stání na ulici může vyžadovat povolení nebo přesnější domluvu místa.");
  } else if (fields.access?.score >= 2) {
    factors.push("Horší přístup může prodloužit manipulaci a změnit vhodný postup.");
  } else if (hasUnknown) {
    factors.push("Nejasnou velikost nebo přístup nejrychleji vyřeší telefonát a fotka místa.");
  } else {
    factors.push("Fotka odpadu nebo místa pomůže rychleji potvrdit přesnou cenu.");
  }

  return factors.slice(0, 3);
};

const getCalculatorSummary = ({ fields, band }) =>
  [
    `Poptávám: ${fields.job?.label || "kontejnerovou dopravu"}.`,
    `Lokalita: ${fields.location?.label || "doplním"}.`,
    `Velikost: ${fields.size?.label || "doplním"}.`,
    `Přístup: ${fields.access?.label || "doplním"}.`,
    `Termín: ${fields.term?.label || "doplním"}.`,
    `${band.title}.`,
    "Beru na vědomí, že jde jen o orientační odhad a cenu potvrdíte podle konkrétní zakázky.",
  ].join(" ");

const setFormValue = (selector, value) => {
  const field = form?.querySelector(selector);
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;
  field.value = value;
  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
};

const fillInquiryFormFromCalculator = (payload) => {
  if (!form) return false;

  setFormValue('input[name="location"]', payload.fields.location?.label || "");
  setFormValue('input[name="date"]', payload.fields.term?.label || "");
  setFormValue('input[name="amount"]', payload.fields.size?.label || "");
  setFormValue('input[name="access"]', payload.fields.access?.label || "");
  setFormValue('input[name="photo"]', "Ideálně pošlu fotku odpadu nebo místa");

  const serviceValue = payload.fields.job?.service;
  if (serviceValue) {
    setFormValue('select[name="service"]', serviceValue);
  }

  const messageField = form.querySelector('textarea[name="message"]');
  if (messageField instanceof HTMLTextAreaElement) {
    const existingMessage = messageField.value.trim();
    const calculatorMessage = [
      "Orientační odhad z kalkulačky:",
      payload.summary,
      "",
      "Pro přesné nacenění doplním obec, typ odpadu nebo materiálu a případně fotku místa.",
    ].join("\n");

    messageField.value = existingMessage
      ? `${calculatorMessage}\n\nDalší poznámka:\n${existingMessage}`
      : calculatorMessage;
  }

  if (formNote) {
    formNote.textContent = "Odhad z kalkulačky je vložený do poptávky. Doplňte kontakt a odešlete, případně zavolejte pro rychlé potvrzení.";
  }

  form.scrollIntoView({ behavior: "smooth", block: "start" });
  track("calculator_use_in_form", {
    page_type: getPageType(),
    estimate_level: payload.band.key,
    selected_service: cleanAnalyticsValue(payload.fields.job?.label),
    selected_location: cleanAnalyticsValue(payload.fields.location?.label),
  });
  return true;
};

const storeCalculatorInquiry = (payload) => {
  try {
    window.sessionStorage.setItem(CALCULATOR_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // If sessionStorage is unavailable, the target form still works without prefill.
  }
};

const readPendingCalculatorInquiry = () => {
  try {
    const rawPayload = window.sessionStorage.getItem(CALCULATOR_STORAGE_KEY);
    if (!rawPayload) return null;
    window.sessionStorage.removeItem(CALCULATOR_STORAGE_KEY);
    return JSON.parse(rawPayload);
  } catch {
    return null;
  }
};

const setupPriceCalculator = () => {
  document.querySelectorAll("[data-price-calculator]").forEach((calculator) => {
    const resultTitle = calculator.querySelector("[data-calculator-result-title]");
    const resultText = calculator.querySelector("[data-calculator-result-text]");
    const factorsList = calculator.querySelector("[data-calculator-factors]");
    const summaryBox = calculator.querySelector("[data-calculator-summary]");
    const useButton = calculator.querySelector("[data-calculator-use]");

    const updateCalculator = (trigger = "initial", changedField = "") => {
      const state = getCalculatorState(calculator);
      const summary = getCalculatorSummary(state);
      const factors = getCalculatorFactors(state);
      const payload = { ...state, summary };

      if (resultTitle) resultTitle.textContent = state.band.title;
      if (resultText) resultText.textContent = state.band.text;
      if (summaryBox) summaryBox.textContent = summary;
      if (factorsList) {
        factorsList.innerHTML = factors.map((factor) => `<li>${factor}</li>`).join("");
      }

      calculator.__calculatorPayload = payload;

      if (trigger === "change") {
        if (!calculator.dataset.calculatorStarted) {
          calculator.dataset.calculatorStarted = "true";
          track("calculator_start", {
            page_type: getPageType(),
            page_path: window.location.pathname,
          });
        }

        track("calculator_step_change", {
          page_type: getPageType(),
          changed_field: changedField,
          estimate_level: state.band.key,
          selected_service: cleanAnalyticsValue(state.fields.job?.label),
          selected_location: cleanAnalyticsValue(state.fields.location?.label),
        });

        if (!calculator.dataset.calculatorCompleted) {
          calculator.dataset.calculatorCompleted = "true";
          track("calculator_complete", {
            page_type: getPageType(),
            estimate_level: state.band.key,
            selected_service: cleanAnalyticsValue(state.fields.job?.label),
            selected_location: cleanAnalyticsValue(state.fields.location?.label),
          });
        }
      }
    };

    calculator.addEventListener("change", (event) => {
      if (!(event.target instanceof HTMLInputElement)) return;
      updateCalculator("change", event.target.name);
    });

    calculator.querySelectorAll("[data-calculator-call], [data-calculator-advice]").forEach((link) => {
      link.addEventListener("click", () => {
        const payload = calculator.__calculatorPayload || { fields: {}, band: { key: "unknown" } };
        track("calculator_call_click", {
          page_type: getPageType(),
          estimate_level: payload.band.key,
          selected_service: cleanAnalyticsValue(payload.fields.job?.label),
          selected_location: cleanAnalyticsValue(payload.fields.location?.label),
        });
      });
    });

    useButton?.addEventListener("click", () => {
      const payload = calculator.__calculatorPayload || getCalculatorState(calculator);
      const completePayload = payload.summary ? payload : { ...payload, summary: getCalculatorSummary(payload) };

      track("calculator_inquiry_click", {
        page_type: getPageType(),
        estimate_level: completePayload.band.key,
        selected_service: cleanAnalyticsValue(completePayload.fields.job?.label),
        selected_location: cleanAnalyticsValue(completePayload.fields.location?.label),
      });

      if (fillInquiryFormFromCalculator(completePayload)) return;

      storeCalculatorInquiry(completePayload);
      window.location.href = "/#kontakt";
    });

    updateCalculator();
  });
};

const applyPendingCalculatorInquiry = () => {
  const payload = readPendingCalculatorInquiry();
  if (!payload) return;
  fillInquiryFormFromCalculator(payload);
};

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", () => {
    track("click_phone", {
      link_url: link.href,
      method: "phone",
      page_type: getPageType(),
      page_path: window.location.pathname,
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
      page_type: getPageType(),
      page_path: window.location.pathname,
    });
    track("generate_lead", {
      currency: "CZK",
      method: "email_click",
    });
  });
});

let formStartTracked = false;
form?.addEventListener("focusin", () => {
  if (formStartTracked) return;
  formStartTracked = true;

  track("form_start", {
    form_name: "main_inquiry",
    page_type: getPageType(),
    page_path: window.location.pathname,
  });
});

document
  .querySelectorAll(".btn[href], .section-link[href], .text-link[href], .mobile-cta a[href], .header-call[href], .contact-cards a[href], .quick-contact a[href]")
  .forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href") || "";
      track("cta_click", {
        page_type: getPageType(),
        page_path: window.location.pathname,
        link_type: getLinkType(href),
        link_text: cleanAnalyticsValue(link.textContent),
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
    page_type: getPageType(),
  });

  if (tracked) {
    try {
      window.sessionStorage.setItem("kontejnerovka_thank_you_tracked", "1");
    } catch {
      // Non-critical duplicate protection only.
    }
  }
};

const setupRevealAnimations = () => {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const revealTargets = document.querySelectorAll(".section, .contact-section, .cta-band, .subpage-hero");
  if (!revealTargets.length) return;

  revealTargets.forEach((target) => {
    target.setAttribute("data-reveal", "");
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    },
  );

  revealTargets.forEach((target) => observer.observe(target));
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
      <strong>Měření webu</strong>
      <p>Volitelné cookies pomáhají měřit kontakty a zlepšovat web. Bez souhlasu běží jen nezbytné funkce.</p>
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
  setupRevealAnimations();
  setupPriceCalculator();
  ensurePageUrlField();
  applyPendingCalculatorInquiry();
  addPrivacyControls();
  createCookieBanner();
  trackThankYouPage();
});
