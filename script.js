const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-inquiry-form]");
const formNote = document.querySelector("[data-form-note]");
const copyInquiryButton = document.querySelector("[data-copy-inquiry]");

const track = (eventName, eventParams = {}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
};

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
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
  track("inquiry_form_submit", { form_name: "main_inquiry" });

  if (form.action.includes("formsubmit.co")) {
    if (formNote) {
      formNote.textContent = "Odesílám poptávku. Pokud se zobrazí potvrzení služby FormSubmit, stačí ho jednou potvrdit v e-mailu.";
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
    track("inquiry_copy", { form_name: "main_inquiry" });
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
  link.addEventListener("click", () => track("click_phone", { link_url: link.href }));
});

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener("click", () => track("click_email", { link_url: link.href }));
});

window.addEventListener("DOMContentLoaded", () => {
  window.lucide?.createIcons();
});
