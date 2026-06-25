const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-inquiry-form]");
const formNote = document.querySelector("[data-form-note]");
const copyInquiryButton = document.querySelector("[data-copy-inquiry]");

const GA_MEASUREMENT_ID = "G-BCXFMBWZJ4";
const ANALYTICS_CONSENT_KEY = "kontejnerovka_analytics_consent";
const ANALYTICS_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
const COOKIE_DISMISS_KEY = "kontejnerovka_cookie_banner_dismissed";
const CALCULATOR_STORAGE_KEY = "kontejnerovka_calculator_inquiry";
const pageLocale = document.documentElement.lang?.toLowerCase().startsWith("en") ? "en" : "cs";
const siteScript = document.querySelector('script[src*="script.js"]');
const assetUrl = (assetPath) => new URL(assetPath, siteScript?.src || `${window.location.origin}/`).href;
const copy = {
  cs: {
    invalidField: "Zkontrolujte prosím zvýrazněné pole.",
    submitting: "Odesílám údaje k nacenění. Pokud bude něco chybět, ozvu se pro doplnění.",
    mailtoSubject: "Poptávka z webu Kontejnerovka.cz",
    mailtoReady: "E-mail s údaji k nacenění je připravený k odeslání ve vašem poštovním programu.",
    copied: "Údaje k nacenění jsou zkopírované. Můžete je vložit do SMS, e-mailu nebo chatu.",
    copyFailed: "Kopírování se nepovedlo. Pošlete poptávku e-mailem nebo zavolejte.",
    inquiryGreeting: "Dobrý den,",
    inquiryIntro: "mám zájem o nacenění služby Kontejnerovka.cz.",
    name: "Jméno",
    phone: "Telefon",
    email: "E-mail",
    location: "Obec / adresa",
    date: "Termín",
    urgency: "Naléhavost",
    service: "Služba",
    amount: "Množství",
    containerSize: "Velikost kontejneru",
    access: "Přístup",
    standing: "Stání",
    wasteType: "Čistota odpadu",
    attachment: "Fotka / příloha",
    note: "Poznámka:",
    inquiryOutro: "Prosím o cenu, možný termín a případně doporučení vhodné velikosti kontejneru.",
    photoPlaceholder: "Ideálně pošlu fotku odpadu nebo místa",
    calculatorInserted: "Odhad z kalkulačky je vložený do poptávky. Doplňte kontakt a odešlete, případně zavolejte pro rychlé potvrzení.",
    calculatorMessageTitle: "Orientační odhad z kalkulačky:",
    calculatorMessageOutro: "Pro přesné nacenění doplním obec, typ odpadu nebo materiálu a případně fotku místa.",
    calculatorMessageExtra: "Další poznámka:",
    formAnchor: "/#kontakt",
    privacyHref: "ochrana-osobnich-udaju.html",
    privacyLink: "Ochrana osobních údajů",
    cookieSettings: "Nastavení cookies",
    cookieLabel: "Nastavení analytických cookies",
    cookieTitle: "Měření webu",
    cookieText: "Pomáhají měřit poptávky a zlepšovat web. Bez souhlasu běží jen nezbytné funkce.",
    cookieDecline: "Pouze nezbytné",
    cookieAccept: "Povolit měření",
    cookieClose: "Zavřít lištu cookies",
    calculatorBandMiddleTitle: "Orientačně: střední cenová hladina",
    calculatorBandMiddleText: "Nejde o závaznou nabídku. Přesnou cenu potvrdíme podle adresy, druhu odpadu, množství, přístupu a termínu.",
    calculatorBandLowerTitle: "Orientačně: nižší až střední cenová hladina",
    calculatorBandLowerText: "Zakázka působí jednodušeji. Přesnou cenu ale potvrdíme až podle konkrétní adresy, odpadu, množství a přístupu.",
    calculatorBandHigherTitle: "Orientačně: vyšší nebo nejasná cenová hladina",
    calculatorBandHigherText: "Zakázka potřebuje upřesnění. Nejde o závaznou nabídku, cenu potvrdíme podle odpadu, trasy, množství, přístupu a termínu.",
    calculatorFactorSoil: "Zemina je těžká; cenu ovlivní objem, hmotnost, vlhkost a možnost naložení.",
    calculatorFactorMixed: "Směsný nebo objemný odpad je nutné upřesnit, protože likvidace může být náročnější než čistá suť.",
    calculatorFactorDelivery: "U dovozu materiálu rozhoduje množství, frakce, dostupnost a místo složení.",
    calculatorFactorClean: "Nejvíc rozhodne typ odpadu nebo materiálu a jeho čistota.",
    calculatorFactorNear: "Blízká lokalita kolem Svárova, Unhoště, Nučic nebo Rudné může pomoct plánování trasy.",
    calculatorFactorFar: "Vzdálenější lokalita nebo městské stání může zvýšit čas dopravy a domluvy.",
    calculatorFactorStreet: "Stání na ulici může vyžadovat povolení nebo přesnější domluvu místa.",
    calculatorFactorDifficultAccess: "Horší přístup může prodloužit manipulaci a změnit vhodný postup.",
    calculatorFactorUnknownAccess: "Nejasnou velikost nebo přístup nejrychleji vyřeší telefonát a fotka místa.",
    calculatorFactorPhoto: "Fotka odpadu nebo místa pomůže rychleji potvrdit přesnou cenu.",
    calculatorSummaryJob: "Poptávám",
    calculatorSummaryLocation: "Lokalita",
    calculatorSummarySize: "Velikost",
    calculatorSummaryAccess: "Přístup",
    calculatorSummaryTerm: "Termín",
    calculatorDefaultJob: "kontejnerovou dopravu",
    calculatorDefaultValue: "doplním",
    calculatorAcknowledgement: "Beru na vědomí, že jde jen o orientační odhad a cenu potvrdíte podle konkrétní zakázky.",
  },
  en: {
    invalidField: "Please check the highlighted field.",
    submitting: "Sending your quote request. If anything is missing, we will contact you for the details.",
    mailtoSubject: "Quote request from Kontejnerovka.cz",
    mailtoReady: "Your email request is ready to send in your mail app.",
    copied: "The quote request details have been copied. You can paste them into an SMS, email or chat.",
    copyFailed: "Copying did not work. Please send the request by email or call us.",
    inquiryGreeting: "Hello,",
    inquiryIntro: "I would like a quote from Kontejnerovka.cz.",
    name: "Name",
    phone: "Phone",
    email: "Email",
    location: "Town / address",
    date: "Preferred date",
    urgency: "Urgency",
    service: "Service",
    amount: "Estimated amount",
    containerSize: "Container size",
    access: "Access",
    standing: "Where the container can stand",
    wasteType: "Waste type",
    attachment: "Photo / attachment",
    note: "Note:",
    inquiryOutro: "Please confirm the price, possible date and recommended container size if needed.",
    photoPlaceholder: "I can send a photo of the waste or the access point",
    calculatorInserted: "The calculator estimate has been added to the request. Add your contact details and submit it, or call for quick confirmation.",
    calculatorMessageTitle: "Indicative estimate from the calculator:",
    calculatorMessageOutro: "For an accurate quote I will add the town, waste or material type and, if possible, a photo of the place.",
    calculatorMessageExtra: "Additional note:",
    formAnchor: "/en/contact.html#form",
    privacyHref: "privacy.html",
    privacyLink: "Privacy policy",
    cookieSettings: "Cookie settings",
    cookieLabel: "Analytics cookie settings",
    cookieTitle: "Website analytics",
    cookieText: "They help measure enquiries and improve the website. Without consent, only essential functions run.",
    cookieDecline: "Essential only",
    cookieAccept: "Allow analytics",
    cookieClose: "Close cookie bar",
    calculatorBandMiddleTitle: "Indicative level: standard quote complexity",
    calculatorBandMiddleText: "This is not a binding quote. We confirm the exact price after checking the address, material, amount, access and timing.",
    calculatorBandLowerTitle: "Indicative level: lower to standard complexity",
    calculatorBandLowerText: "The job looks relatively straightforward, but the price still needs to be confirmed for the exact address, load, amount and access.",
    calculatorBandHigherTitle: "Indicative level: higher or unclear complexity",
    calculatorBandHigherText: "The job needs more detail before pricing. We will confirm the route, material, amount, access and timing before dispatch.",
    calculatorFactorSoil: "Soil is heavy; volume, weight, moisture and loading access can all change the quote.",
    calculatorFactorMixed: "Mixed or bulky waste needs clarification because disposal can be more complex than clean rubble.",
    calculatorFactorDelivery: "For material delivery, amount, fraction, availability and safe tipping point matter most.",
    calculatorFactorClean: "The biggest factor is the material type and whether it is clean or mixed.",
    calculatorFactorNear: "Close routes around Svárov, Unhošť, Nučice or Rudná can help with practical scheduling.",
    calculatorFactorFar: "A longer route or city placement may add transport time and coordination.",
    calculatorFactorStreet: "Street or public-space placement may need a permit or a more precise standing-place agreement.",
    calculatorFactorDifficultAccess: "Difficult access can increase handling time and change the best approach.",
    calculatorFactorUnknownAccess: "If size or access is unclear, a quick call and a photo are usually fastest.",
    calculatorFactorPhoto: "A photo of the material or standing place helps confirm the quote faster.",
    calculatorSummaryJob: "Request",
    calculatorSummaryLocation: "Area",
    calculatorSummarySize: "Size",
    calculatorSummaryAccess: "Access",
    calculatorSummaryTerm: "Timing",
    calculatorDefaultJob: "container transport",
    calculatorDefaultValue: "to be confirmed",
    calculatorAcknowledgement: "I understand this is only an indicative estimate and the price will be confirmed for the specific job.",
  },
};
const t = (key) => copy[pageLocale][key] || copy.cs[key] || key;

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

const isCookieBannerDismissed = () => {
  try {
    return window.sessionStorage.getItem(COOKIE_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

const dismissCookieBannerForSession = () => {
  try {
    window.sessionStorage.setItem(COOKIE_DISMISS_KEY, "1");
  } catch {
    // Session-only dismissal is a convenience; consent state is not changed.
  }
  hideCookieBanner();
};

const resetCookieBannerDismissal = () => {
  try {
    window.sessionStorage.removeItem(COOKIE_DISMISS_KEY);
  } catch {
    // If session storage is unavailable, the banner can still be recreated normally.
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
  // Consent Mode v2: bez souhlasu posílá GA4 jen anonymní cookieless pingy,
  // se souhlasem plné měření. Default musí být nastaven před "config".
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: hasAnalyticsConsent() ? "granted" : "denied",
  });
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
  "container-delivery.html",
  "rubble-container.html",
  "construction-waste-container.html",
  "large-container.html",
  "rubble-removal.html",
  "soil-removal.html",
  "waste-removal.html",
  "wood-green-waste-removal.html",
  "concrete-removal.html",
  "sand-delivery.html",
  "gravel-delivery.html",
  "pebble-delivery.html",
  "sand-gravel-delivery.html",
  "recycled-aggregate-delivery.html",
  "concrete-delivery.html",
]);

const getPageSlug = () => {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
};

const getPageType = () => {
  const slug = getPageSlug();
  if (slug === "index.html") return "home";
  if (slug.startsWith("kontejnery-") || slug.startsWith("containers-")) return "local_landing";
  if (servicePages.has(slug)) return "service_landing";
  if (["cenik.html", "poradna.html", "lokality.html", "reference.html", "o-nas.html", "pricing.html", "guide.html", "areas.html", "references.html", "about.html", "equipment.html"].includes(slug)) return "support";
  if (slug === "dekujeme.html" || slug === "thank-you.html") return "thank_you";
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
  if (href.includes("#kontakt") || href.includes("#form") || href.includes("#poptavka") || href.includes("#inquiry")) return "form_anchor";
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
  const attachment = data.get("attachment");
  const attachmentName = typeof File !== "undefined" && attachment instanceof File && attachment.name ? attachment.name : "";
  const lines = [
    t("inquiryGreeting"),
    "",
    t("inquiryIntro"),
    "",
    `${t("name")}: ${data.get("name") || ""}`,
    `${t("phone")}: ${data.get("phone") || ""}`,
    `${t("email")}: ${data.get("email") || ""}`,
    `${t("location")}: ${data.get("location") || ""}`,
    `${t("date")}: ${data.get("date") || ""}`,
    `${t("urgency")}: ${data.get("urgency") || ""}`,
    `${t("service")}: ${data.get("service") || ""}`,
    `${t("amount")}: ${data.get("amount") || ""}`,
    `${t("containerSize")}: ${data.get("container_size") || ""}`,
    `${t("access")}: ${data.get("access") || ""}`,
    `${t("standing")}: ${data.get("standing") || ""}`,
    `${t("wasteType")}: ${data.get("waste_type") || ""}`,
    `${t("attachment")}: ${attachmentName || data.get("photo") || ""}`,
    "",
    t("note"),
    `${data.get("message") || ""}`,
    "",
    t("inquiryOutro"),
  ];

  return lines.join("\n");
};

const copyTextToClipboard = async (text) => {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Clipboard copy failed");
  }
};

let validateInquiryForm = () => form?.reportValidity() ?? false;

const setupInquiryFormSteps = () => {
  if (!form) return;

  const steps = Array.from(form.querySelectorAll(".form-step"));
  if (!steps.length) return;

  const progress = Array.from(form.querySelectorAll(".form-progress span"));
  const nextButton = form.querySelector("[data-next]");
  const prevButton = form.querySelector("[data-prev]");
  const submitButton = form.querySelector("[data-submit]");
  const fileInput = form.querySelector('input[type="file"]');
  const fileName = form.querySelector("[data-file-name]");
  let currentStep = 0;

  const canValidate = (field, { includeConsent = true } = {}) => {
    if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return false;
    if (field.disabled) return false;
    if (field instanceof HTMLInputElement && ["hidden", "button", "submit"].includes(field.type)) return false;
    if (field.name === "botcheck" || field.classList.contains("hp-field")) return false;
    if (!includeConsent && field.name === "souhlas") return false;
    return true;
  };

  const setStep = (index, shouldTrack = true) => {
    currentStep = Math.max(0, Math.min(index, steps.length - 1));

    steps.forEach((step, stepIndex) => {
      const isActive = stepIndex === currentStep;
      step.classList.toggle("is-active", isActive);
      step.hidden = !isActive;
    });

    progress.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex <= currentStep);
      if (itemIndex === currentStep) {
        item.setAttribute("aria-current", "step");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    if (prevButton instanceof HTMLElement) prevButton.hidden = currentStep === 0;
    if (nextButton instanceof HTMLElement) nextButton.hidden = currentStep === steps.length - 1;
    if (submitButton instanceof HTMLElement) submitButton.hidden = currentStep !== steps.length - 1;
    if (copyInquiryButton instanceof HTMLElement) copyInquiryButton.hidden = currentStep !== steps.length - 1;
    if (formNote) formNote.textContent = "";

    if (shouldTrack) {
      track("form_step_view", {
        form_name: "main_inquiry",
        step_index: String(currentStep + 1),
        step_label: cleanAnalyticsValue(progress[currentStep]?.textContent || ""),
        page_type: getPageType(),
        page_path: window.location.pathname,
      });
    }
  };

  const validateFields = (fields, targetStep = currentStep, options = {}) => {
    const candidates = fields.filter((field) => canValidate(field, options));
    candidates.forEach((field) => field.classList.remove("is-invalid"));
    const invalid = candidates.find((field) => !field.checkValidity());

    if (!invalid) return true;

    setStep(targetStep, false);
    invalid.classList.add("is-invalid");
    if (formNote) formNote.textContent = t("invalidField");
    invalid.reportValidity();
    return false;
  };

  const validateCurrentStep = () => {
    const fields = Array.from(steps[currentStep].querySelectorAll("input, select, textarea"));
    return validateFields(fields, currentStep);
  };

  validateInquiryForm = (options = {}) => {
    for (let index = 0; index < steps.length; index += 1) {
      const fields = Array.from(steps[index].querySelectorAll("input, select, textarea"));
      if (!validateFields(fields, index, options)) return false;
    }
    return true;
  };

  nextButton?.addEventListener("click", () => {
    if (!validateCurrentStep()) {
      track("form_error", {
        form_name: "main_inquiry",
        reason: "invalid_step",
        step_index: String(currentStep + 1),
      });
      return;
    }
    setStep(currentStep + 1);
  });

  prevButton?.addEventListener("click", () => {
    setStep(currentStep - 1);
  });

  const clearInvalid = (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return;
    field.classList.remove("is-invalid");
    if (formNote && !form.querySelector(".is-invalid")) formNote.textContent = "";
  };

  form.addEventListener("input", clearInvalid);
  form.addEventListener("change", clearInvalid);

  if (fileInput instanceof HTMLInputElement && fileName) {
    const defaultFileText = fileInput.getAttribute("data-default-file") || fileName.textContent || "";
    fileInput.addEventListener("change", () => {
      const selectedFile = fileInput.files && fileInput.files[0];
      fileName.textContent = selectedFile ? selectedFile.name : defaultFileText;
      if (selectedFile) {
        track("file_upload_used", {
          form_name: "main_inquiry",
          file_type: selectedFile.type || "unknown",
          page_type: getPageType(),
        });
      }
    });
  }

  setStep(0, false);
};

setupInquiryFormSteps();

form?.addEventListener("submit", (event) => {
  ensurePageUrlField();
  const submittedData = new FormData(form);

  if (!validateInquiryForm()) {
    track("form_error", {
      form_name: "main_inquiry",
      reason: "invalid_form",
      page_type: getPageType(),
      page_path: window.location.pathname,
    });
    event.preventDefault();
    return;
  }

  const honeypot = form.querySelector('input[name="botcheck"], .hp-field');
  // U checkboxu je .value vždy "on", i nezaškrtnutého — rozhoduje .checked.
  const honeypotTriggered =
    honeypot instanceof HTMLInputElement &&
    (honeypot.type === "checkbox" ? honeypot.checked : Boolean(honeypot.value));
  if (honeypotTriggered) {
    track("form_error", {
      form_name: "main_inquiry",
      reason: "honeypot",
      page_type: getPageType(),
      page_path: window.location.pathname,
    });
    event.preventDefault();
    return;
  }

  const submittedAttachment = submittedData.get("attachment");
  const hasAttachment =
    typeof File !== "undefined" &&
    submittedAttachment instanceof File &&
    Boolean(submittedAttachment.name);

  track("lead_form_submit", {
    form_name: "main_inquiry",
    method: "web_form",
    page_type: getPageType(),
    page_path: window.location.pathname,
    selected_service: cleanAnalyticsValue(submittedData.get("service")),
    has_email: submittedData.get("email") ? "yes" : "no",
    has_amount: submittedData.get("amount") ? "yes" : "no",
    has_photo_note: submittedData.get("photo") || hasAttachment ? "yes" : "no",
  });

  if (form.action.includes("api.web3forms.com")) {
    if (formNote) {
      formNote.textContent = t("submitting");
    }
    return;
  }

  event.preventDefault();

  const mailto = new URL("mailto:info@kontejnerovka.cz");
  mailto.searchParams.set("subject", t("mailtoSubject"));
  mailto.searchParams.set("body", getInquiryText());
  window.location.href = mailto.toString();

  if (formNote) {
    formNote.textContent = t("mailtoReady");
  }
});

copyInquiryButton?.addEventListener("click", async () => {
  if (!validateInquiryForm({ includeConsent: false })) return;
  const copiedData = new FormData(form);

  try {
    await copyTextToClipboard(getInquiryText());
    track("inquiry_copy", {
      form_name: "main_inquiry",
      method: "copy_inquiry",
      page_type: getPageType(),
      selected_service: cleanAnalyticsValue(copiedData.get("service")),
    });
    if (formNote) {
      formNote.textContent = t("copied");
    }
  } catch {
    if (formNote) {
      formNote.textContent = t("copyFailed");
    }
  }
});

const setupMiniInquiryForms = () => {
  document.querySelectorAll("[data-mini-form]").forEach((miniForm) => {
    const miniFormNote = miniForm.querySelector("[data-mini-form-note]");
    const miniFileInput = miniForm.querySelector('input[type="file"]');
    const miniFileName = miniForm.querySelector("[data-file-name]");

    if (miniFileInput instanceof HTMLInputElement && miniFileName) {
      const defaultFileText = miniFileInput.getAttribute("data-default-file") || miniFileName.textContent || "";
      miniFileInput.addEventListener("change", () => {
        const selectedFile = miniFileInput.files && miniFileInput.files[0];
        miniFileName.textContent = selectedFile ? selectedFile.name : defaultFileText;
        if (selectedFile) {
          track("file_upload_used", {
            form_name: "mini_inquiry",
            file_type: selectedFile.type || "unknown",
            page_type: getPageType(),
          });
        }
      });
    }

    const clearMiniInvalid = (event) => {
      const field = event.target;
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return;
      field.classList.remove("is-invalid");
      if (miniFormNote && !miniForm.querySelector(".is-invalid")) miniFormNote.textContent = "";
    };

    miniForm.addEventListener("input", clearMiniInvalid);
    miniForm.addEventListener("change", clearMiniInvalid);

    let miniFormStartTracked = false;
    miniForm.addEventListener("focusin", () => {
      if (miniFormStartTracked) return;
      miniFormStartTracked = true;

      track("form_start", {
        form_name: "mini_inquiry",
        page_type: getPageType(),
        page_path: window.location.pathname,
      });
    });

    miniForm.addEventListener("submit", (event) => {
      const pageUrlField = miniForm.querySelector('input[name="page_url"]');
      if (pageUrlField instanceof HTMLInputElement) pageUrlField.value = window.location.href;

      if (!miniForm.checkValidity()) {
        event.preventDefault();
        const invalid = Array.from(miniForm.querySelectorAll("input, textarea, select")).find(
          (field) =>
            (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) &&
            !field.checkValidity()
        );
        if (invalid) {
          invalid.classList.add("is-invalid");
          invalid.reportValidity();
        }
        if (miniFormNote) miniFormNote.textContent = t("invalidField");
        track("form_error", {
          form_name: "mini_inquiry",
          reason: "invalid_form",
          page_type: getPageType(),
          page_path: window.location.pathname,
        });
        return;
      }

      const honeypot = miniForm.querySelector('input[name="botcheck"]');
      if (honeypot instanceof HTMLInputElement && honeypot.checked) {
        event.preventDefault();
        track("form_error", {
          form_name: "mini_inquiry",
          reason: "honeypot",
          page_type: getPageType(),
          page_path: window.location.pathname,
        });
        return;
      }

      const miniData = new FormData(miniForm);
      const miniAttachment = miniData.get("attachment");
      const hasMiniAttachment =
        typeof File !== "undefined" && miniAttachment instanceof File && Boolean(miniAttachment.name);

      track("lead_form_submit", {
        form_name: "mini_inquiry",
        method: "web_form",
        page_type: getPageType(),
        page_path: window.location.pathname,
        has_photo_note: hasMiniAttachment ? "yes" : "no",
      });

      if (miniFormNote) miniFormNote.textContent = t("submitting");
    });
  });
};

setupMiniInquiryForms();

const getCheckedCalculatorOption = (calculator, name) => {
  const option = calculator.querySelector(`input[name="${name}"]:checked`);
  if (!(option instanceof HTMLInputElement)) return null;

  return {
    label: option.dataset.label || option.value,
    value: option.value,
    score: Number.parseInt(option.dataset.score || "0", 10),
    service: option.dataset.service || "",
    kind: option.dataset.kind || "",
  };
};

const calculatorFieldMatches = (field, patterns) => {
  const value = `${field?.value || ""} ${field?.label || ""} ${field?.kind || ""}`.toLowerCase();
  return patterns.some((pattern) => value.includes(pattern));
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
  const hasUnknown = Object.values(fields).some((field) =>
    calculatorFieldMatches(field, ["nevím", "poradit", "not sure", "advise", "unknown"]),
  );

  let band = {
    key: "middle",
    title: t("calculatorBandMiddleTitle"),
    text: t("calculatorBandMiddleText"),
  };

  if (score <= 6 && !hasUnknown) {
    band = {
      key: "lower",
      title: t("calculatorBandLowerTitle"),
      text: t("calculatorBandLowerText"),
    };
  } else if (score >= 11 || hasUnknown) {
    band = {
      key: "higher",
      title: t("calculatorBandHigherTitle"),
      text: t("calculatorBandHigherText"),
    };
  }

  return { fields, score, band, hasUnknown };
};

const getCalculatorFactors = ({ fields, hasUnknown }) => {
  const factors = [];

  if (calculatorFieldMatches(fields.job, ["zeminy", "soil"])) {
    factors.push(t("calculatorFactorSoil"));
  } else if (calculatorFieldMatches(fields.job, ["stavebního", "objemného", "mixed", "bulky"])) {
    factors.push(t("calculatorFactorMixed"));
  } else if (calculatorFieldMatches(fields.job, ["dovoz", "delivery"])) {
    factors.push(t("calculatorFactorDelivery"));
  } else {
    factors.push(t("calculatorFactorClean"));
  }

  if ((fields.location?.score || 0) <= 1) {
    factors.push(t("calculatorFactorNear"));
  } else {
    factors.push(t("calculatorFactorFar"));
  }

  if (calculatorFieldMatches(fields.access, ["ulici", "street", "public"])) {
    factors.push(t("calculatorFactorStreet"));
  } else if (fields.access?.score >= 2) {
    factors.push(t("calculatorFactorDifficultAccess"));
  } else if (hasUnknown) {
    factors.push(t("calculatorFactorUnknownAccess"));
  } else {
    factors.push(t("calculatorFactorPhoto"));
  }

  return factors.slice(0, 3);
};

const getCalculatorSummary = ({ fields, band }) =>
  [
    `${t("calculatorSummaryJob")}: ${fields.job?.label || t("calculatorDefaultJob")}.`,
    `${t("calculatorSummaryLocation")}: ${fields.location?.label || t("calculatorDefaultValue")}.`,
    `${t("calculatorSummarySize")}: ${fields.size?.label || t("calculatorDefaultValue")}.`,
    `${t("calculatorSummaryAccess")}: ${fields.access?.label || t("calculatorDefaultValue")}.`,
    `${t("calculatorSummaryTerm")}: ${fields.term?.label || t("calculatorDefaultValue")}.`,
    `${band.title}.`,
    t("calculatorAcknowledgement"),
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
  setFormValue('input[name="photo"]', t("photoPlaceholder"));

  const serviceValue = payload.fields.job?.service;
  if (serviceValue) {
    setFormValue('select[name="service"]', serviceValue);
  }

  const messageField = form.querySelector('textarea[name="message"]');
  if (messageField instanceof HTMLTextAreaElement) {
    const existingMessage = messageField.value.trim();
    const calculatorMessage = [
      t("calculatorMessageTitle"),
      payload.summary,
      "",
      t("calculatorMessageOutro"),
    ].join("\n");

    messageField.value = existingMessage
      ? `${calculatorMessage}\n\n${t("calculatorMessageExtra")}\n${existingMessage}`
      : calculatorMessage;
  }

  if (formNote) {
    formNote.textContent = t("calculatorInserted");
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
      window.location.href = t("formAnchor");
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
  if (!window.location.pathname.endsWith("/dekujeme.html") && !window.location.pathname.endsWith("/en/thank-you.html")) return;

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

let iconsRequested = false;

const createLucideIcons = () => {
  window.lucide?.createIcons?.();
};

const loadLucideIcons = () => {
  if (iconsRequested) return;
  iconsRequested = true;

  if (window.lucide?.createIcons) {
    createLucideIcons();
    return;
  }

  const script = document.createElement("script");
  script.src = assetUrl("assets/icons.js");
  script.async = true;
  script.onload = createLucideIcons;
  document.head.appendChild(script);
};

const scheduleIconLoad = () => {
  const start = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadLucideIcons, { timeout: 1800 });
      return;
    }

    window.setTimeout(loadLucideIcons, 800);
  };

  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start, { once: true });
  }
};

const setupSubpagePolish = () => {
  const hero = document.querySelector(".page-main .subpage-hero");
  if (!hero || document.querySelector(".hero")) return;

  const pageType = getPageType().replaceAll("_", "-");
  document.body.classList.add(`page-type-${pageType}`);

  const utilityPages = new Set([
    "404.html",
    "dekujeme.html",
    "thank-you.html",
    "ochrana-osobnich-udaju.html",
    "privacy.html",
  ]);
  if (utilityPages.has(getPageSlug())) return;

  const inquiryTarget = (() => {
    if (document.getElementById("poptavka")) return "#poptavka";
    if (document.getElementById("inquiry")) return "#inquiry";
    if (document.getElementById("formular")) return "#formular";
    if (document.getElementById("form")) return "#form";
    return pageLocale === "en" ? "contact.html#form" : "kontakt.html#formular";
  })();

  if (!hero.querySelector(".hero-actions")) {
    const actions = document.createElement("div");
    actions.className = "hero-actions";
    actions.innerHTML =
      pageLocale === "en"
        ? `<a class="btn btn-primary" href="tel:+420738505028"><i data-lucide="phone-call" aria-hidden="true"></i>Call for a quote</a><a class="btn btn-dark" href="${inquiryTarget}"><i data-lucide="send" aria-hidden="true"></i>Send job details</a>`
        : `<a class="btn btn-primary" href="tel:+420738505028"><i data-lucide="phone-call" aria-hidden="true"></i>Zavolat kvůli ceně</a><a class="btn btn-dark" href="${inquiryTarget}"><i data-lucide="send" aria-hidden="true"></i>Poslat údaje</a>`;
    hero.appendChild(actions);
    actions.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href") || "";
        const linkType = getLinkType(href);
        track("cta_click", {
          page_type: getPageType(),
          page_path: window.location.pathname,
          link_type: linkType,
          link_text: cleanAnalyticsValue(link.textContent),
        });

        if (linkType === "phone") {
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
        }
      });
    });
  }

  if (!document.querySelector(".subpage-trustbar")) {
    const trustbar = document.createElement("div");
    trustbar.className = "subpage-trustbar";
    trustbar.setAttribute("aria-label", pageLocale === "en" ? "Quote advantages" : "Výhody rychlé poptávky");
    trustbar.innerHTML =
      pageLocale === "en"
        ? `
          <div><i data-lucide="timer-reset" aria-hidden="true"></i><span><strong>Fast quote</strong><span>Town, load, amount and date are enough.</span></span></div>
          <div><i data-lucide="camera" aria-hidden="true"></i><span><strong>Photo helps</strong><span>Access and waste type are clearer immediately.</span></span></div>
          <div><i data-lucide="shield-check" aria-hidden="true"></i><span><strong>Confirmed before dispatch</strong><span>Price, VAT and route are agreed first.</span></span></div>
        `
        : `
          <div><i data-lucide="timer-reset" aria-hidden="true"></i><span><strong>Rychlé nacenění</strong><span>Stačí obec, náklad, množství a termín.</span></span></div>
          <div><i data-lucide="camera" aria-hidden="true"></i><span><strong>Fotka pomůže</strong><span>Přístup i odpad se rozhodnou rychleji.</span></span></div>
          <div><i data-lucide="shield-check" aria-hidden="true"></i><span><strong>Potvrzení před výjezdem</strong><span>Cena, DPH i trasa jsou domluvené předem.</span></span></div>
        `;
    hero.insertAdjacentElement("afterend", trustbar);
  }

  createLucideIcons();
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
      rootMargin: "0px 0px -2% 0px",
      threshold: 0.04,
    },
  );

  revealTargets.forEach((target) => observer.observe(target));

  window.setTimeout(() => {
    revealTargets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        target.classList.add("is-visible");
      }
    });
  }, 900);
};

const setupMobileCtaFormGuard = () => {
  const zones = document.querySelectorAll(".contact-section");
  if (!zones.length || !("IntersectionObserver" in window)) return;

  const visibleZones = new Set();
  const sync = () => {
    document.body.classList.toggle("is-in-form-zone", visibleZones.size > 0);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleZones.add(entry.target);
        else visibleZones.delete(entry.target);
      });
      sync();
    },
    {
      rootMargin: "-10% 0px -18% 0px",
      threshold: 0.08,
    },
  );

  zones.forEach((zone) => observer.observe(zone));
};

const hideCookieBanner = () => {
  document.querySelector("[data-cookie-banner]")?.remove();
};

const createCookieBanner = () => {
  if (getAnalyticsConsent() || isCookieBannerDismissed()) return;

  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("data-cookie-banner", "");
  banner.setAttribute("aria-label", t("cookieLabel"));
  banner.innerHTML = `
    <button class="cookie-close" type="button" data-cookie-close aria-label="${t("cookieClose")}">×</button>
    <div>
      <strong>${t("cookieTitle")}</strong>
      <p>${t("cookieText")}</p>
      <a href="${t("privacyHref")}">${t("privacyLink")}</a>
    </div>
    <div class="cookie-actions">
      <button class="btn btn-dark" type="button" data-cookie-decline>${t("cookieDecline")}</button>
      <button class="btn btn-primary" type="button" data-cookie-accept>${t("cookieAccept")}</button>
    </div>
  `;

  document.body.appendChild(banner);

  banner.querySelector("[data-cookie-close]")?.addEventListener("click", dismissCookieBannerForSession);

  banner.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
    setAnalyticsConsent("granted");
    loadAnalytics();
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    hideCookieBanner();
    track("analytics_consent_granted");
    trackThankYouPage();
  });

  banner.querySelector("[data-cookie-decline]")?.addEventListener("click", () => {
    setAnalyticsConsent("denied");
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    hideCookieBanner();
  });
};

const addPrivacyControls = () => {
  const footerLinks = document.querySelector(".site-footer div:last-child");
  if (!footerLinks || footerLinks.querySelector("[data-cookie-settings]")) return;

  const privacyLink = document.createElement("a");
  privacyLink.href = t("privacyHref");
  privacyLink.textContent = t("privacyLink");
  footerLinks.appendChild(privacyLink);

  const settingsButton = document.createElement("button");
  settingsButton.className = "footer-privacy-button";
  settingsButton.type = "button";
  settingsButton.setAttribute("data-cookie-settings", "");
  settingsButton.textContent = t("cookieSettings");
  settingsButton.addEventListener("click", () => {
    clearAnalyticsConsent();
    resetCookieBannerDismissal();
    hideCookieBanner();
    createCookieBanner();
  });
  footerLinks.appendChild(settingsButton);
};

loadAnalytics();

window.addEventListener("DOMContentLoaded", () => {
  setupSubpagePolish();
  scheduleIconLoad();
  setupRevealAnimations();
  setupMobileCtaFormGuard();
  setupPriceCalculator();
  ensurePageUrlField();
  applyPendingCalculatorInquiry();
  addPrivacyControls();
  createCookieBanner();
  trackThankYouPage();
});
