const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-inquiry-form]");
const formNote = document.querySelector("[data-form-note]");

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

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = "Poptávka z webu Kontejnerovka.cz";
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
    "",
    "Poznámka:",
    `${data.get("message") || ""}`,
    "",
    "Prosím o cenu a možný termín.",
  ];

  const mailto = new URL("mailto:info@kontejnerovka.cz");
  mailto.searchParams.set("subject", subject);
  mailto.searchParams.set("body", lines.join("\n"));

  window.location.href = mailto.toString();

  if (formNote) {
    formNote.textContent = "E-mail s poptávkou je připravený k odeslání ve vašem poštovním programu.";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  window.lucide?.createIcons();
});
