import { writeFileSync } from "node:fs";

const CACHE = "20260617a";
const GOOGLE_PROFILE = "https://share.google/3gRahFm7A2awhEeJJ";

const provider = {
  "@type": "LocalBusiness",
  "@id": "https://kontejnerovka.cz/#localbusiness",
  name: "Kontejnerovka.cz",
  legalName: "Matyáš Mašín",
  url: "https://kontejnerovka.cz/",
  telephone: "+420738505028",
  email: "info@kontejnerovka.cz",
  taxID: "01379178",
  vatID: "CZ9211070033",
  priceRange: "Dle adresy, odpadu, množství, přístupu a trasy",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Holýšovská 2923/4",
    addressLocality: "Praha 5 - Stodůlky",
    postalCode: "15500",
    addressCountry: "CZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.04112,
    longitude: 14.31985,
  },
  sameAs: [GOOGLE_PROFILE],
  hasMap: GOOGLE_PROFILE,
};

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const header = (file) => `<header class="site-header is-scrolled" data-header>
      <a class="brand" href="/"><span class="brand-mark">K</span><span><strong>Kontejnerovka.cz</strong><small>Praha a Středočeský kraj</small></span></a>
      <nav class="site-nav" id="site-nav" data-nav><a href="sluzby.html">Služby</a><a href="zemni-prace.html">Zemní práce</a><a href="cenik.html">Ceník</a><a href="lokality.html">Lokality</a><a href="reference.html">Realizace</a><a href="technika.html">Technika</a><a href="o-nas.html">O nás</a><a href="poradna.html">Poradna</a><a href="kontakt.html">Kontakt</a></nav>
      <div class="header-actions"><div class="language-switcher" aria-label="Jazyk webu"><a class="is-active" href="/${file}" lang="cs" aria-current="page">CZ</a><a href="/en/areas.html" hreflang="en" lang="en">EN</a></div><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle><i data-lucide="menu" aria-hidden="true"></i><span class="sr-only">Otevřít menu</span></button><a class="header-call" href="tel:+420738505028"><i data-lucide="phone" aria-hidden="true"></i>738&nbsp;505&nbsp;028</a></div>
    </header>`;

const footer = (footerText, secondaryLinks = []) => `<footer class="site-footer">
      <div><strong>Kontejnerovka.cz</strong><p>${footerText}</p></div>
      <div><p>Provozovatel: Matyáš Mašín</p><p>IČO: 01379178 · DIČ: CZ9211070033 · Plátce DPH</p><p>Holýšovská 2923/4, Stodůlky, 155 00 Praha 5</p></div>
      <div><a href="tel:+420738505028">738&nbsp;505&nbsp;028</a><a href="mailto:info@kontejnerovka.cz">info@kontejnerovka.cz</a><a href="${GOOGLE_PROFILE}" target="_blank" rel="noopener">Google profil</a>${secondaryLinks.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div>
    </footer>`;

const sectionCards = (items) =>
  items.map(({ title, text }) => `<article><h2>${title}</h2><p>${text}</p></article>`).join("\n        ");

const details = (items) =>
  items.map(({ q, a }) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n          ");

const linkCloud = (items) =>
  items.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join("");

const pageHtml = (page) => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider,
    areaServed: page.areas,
    serviceType: "Kontejnerová doprava, odvoz suti, odvoz zeminy a dovoz materiálu",
    url: `https://kontejnerovka.cz/${page.file}`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Úvod", item: "https://kontejnerovka.cz/" },
      { "@type": "ListItem", position: 2, name: "Lokality", item: "https://kontejnerovka.cz/lokality.html" },
      { "@type": "ListItem", position: 3, name: page.h1, item: `https://kontejnerovka.cz/${page.file}` },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return `<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${page.title}</title>
    <meta name="description" content="${page.description}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://kontejnerovka.cz/${page.file}">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://kontejnerovka.cz/${page.file}">
    <meta property="og:image" content="https://kontejnerovka.cz/assets/og-kontejnerovka.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${escapeHtml(page.h1)} - Kontejnerovka.cz">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${page.title}">
    <meta name="twitter:description" content="${page.description}">
    <meta name="twitter:image" content="https://kontejnerovka.cz/assets/og-kontejnerovka.png">
    <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
    <link rel="manifest" href="site.webmanifest">
    <link rel="stylesheet" href="styles.css?v=${CACHE}">
    <script src="script.js?v=20260618a" defer></script>
    <script type="application/ld+json">${JSON.stringify(serviceSchema, null, 2)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
    <script type="application/ld+json" data-visible-faq>${JSON.stringify(faq, null, 2)}</script>
  </head>
  <body>
    ${header(page.file)}
    <main class="page-main">
      <section class="subpage-hero">
        <p class="eyebrow">${page.eyebrow}</p>
        <h1>${page.h1}</h1>
        <p>${page.lead}</p>
        <div class="hero-actions"><a class="btn btn-primary" href="tel:+420738505028"><i data-lucide="phone-call" aria-hidden="true"></i>Zavolat kvůli ceně</a><a class="btn btn-dark" href="#poptavka"><i data-lucide="send" aria-hidden="true"></i>Poslat poptávku</a></div>
      </section>
      <div class="subpage-trustbar" aria-label="Co potřebuji pro přesnou cenu"><div><i data-lucide="timer-reset" aria-hidden="true"></i><span><strong>Pro cenu potřebuji</strong><span>adresu, materiál, odhad množství a termín.</span></span></div><div><i data-lucide="camera" aria-hidden="true"></i><span><strong>Auto s rukou</strong><span>hodí se tam, kde rozhoduje přesná manipulace a bezpečné složení.</span></span></div><div><i data-lucide="shield-check" aria-hidden="true"></i><span><strong>Až 8 t nákladu</strong><span>u suti, betonu a zeminy řeším hlavně váhu, ne jen objem.</span></span></div></div>

      <section class="section visual-proof subpage-showcase" aria-labelledby="field-proof-${page.file}">
        <div class="visual-proof-copy">
          <p class="eyebrow">Z terénu</p>
          <h2 id="field-proof-${page.file}">Reálná technika, jasná cena, praktická domluva</h2>
          <p>${page.proof}</p>
          <a class="section-link light" href="#poptavka">Chci cenu</a>
        </div>
        <div class="visual-proof-grid">
          <article class="visual-proof-card image-card"><img src="assets/truck-crane-extended.jpg" alt="Vlastní kontejnerové auto s rukou Kontejnerovka.cz při vysunuté manipulaci" width="1800" height="1442" loading="lazy"><div><span>Kontejnerová doprava</span><strong>Přistavení i odvoz se plánují podle reálného přístupu.</strong></div></article>
          <article class="visual-proof-card image-card"><img src="assets/container-tilt.jpg" alt="Vlastní kontejner Kontejnerovka.cz při sklápění v provozu" width="1800" height="1350" loading="lazy"><div><span>Kontejner v provozu</span><strong>Na fotce je skutečný kontejner při sklápění, ne ilustrační vizuál.</strong></div></article>
          <article class="visual-proof-card proof-card-dark"><span class="proof-number">Až 8 t</span><h3>Vlastní auto s rukou, ne obecná dopravní fráze.</h3><p>Pro cenu rozhoduji podle materiálu, odhadované váhy, přístupu na místo a toho, jestli se auto s rukou bezpečně dostane ke složení nebo nakládce.</p></article>
        </div>
      </section>

      <section class="section detail-grid">
        ${sectionCards(page.cards)}
      </section>

      <section class="section seo-panel">
        <h2>${page.panelTitle}</h2>
        <p>${page.panelText}</p>
        <ul>${page.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
        <ul class="link-cloud">${linkCloud(page.links)}</ul>
      </section>

      <section class="section faq">
        <div class="section-head compact"><p class="eyebrow">Dotazy</p><h2>Často pro tuto oblast</h2></div>
        <div class="faq-list">
          ${details(page.faq)}
        </div>
      </section>

      <section class="section service-note">
        <p class="eyebrow">Jak nacenit</p>
        <h2>Nejrychlejší je poslat obec, náklad a fotku místa</h2>
        <p>U všech obcí platí stejný princip: cena se potvrzuje podle přesné adresy, odpadu nebo materiálu, množství, přístupu, délky stání a trasy. Pokud řešíte i zemní práce, napište to rovnou — výkop, odvoz zeminy a dovoz recyklátu nebo štěrku se často dá sladit v jedné domluvě.</p>
      </section>

      <section class="cta-band"><h2>${page.cta}</h2><a class="btn btn-primary" href="#poptavka">Poslat údaje k nacenění</a></section>
      <!-- mini-inquiry:start -->
      <!-- mini-inquiry:end -->
    </main>
    ${footer(page.footer, page.footerLinks)}
    <div class="mobile-cta"><a href="tel:+420738505028"><i data-lucide="phone" aria-hidden="true"></i>Zavolat</a><a href="#poptavka"><i data-lucide="send" aria-hidden="true"></i>Získat cenu</a></div>
  </body>
</html>
`;
};

const pages = [
  {
    file: "kontejnery-chynava-podkozi.html",
    title: "Kontejnery Chyňava, Podkozí a Nenačovice | Odvoz suti",
    description: "Kontejnerová doprava pro Chyňavu, Podkozí, Nenačovice, Nouzov, Pavlov a Malé Kyšice. Odvoz suti, zeminy, odpadu a dovoz materiálu podle trasy.",
    eyebrow: "Chyňava a Podkozí",
    h1: "Kontejnery Chyňava, Podkozí, Nenačovice a okolí",
    lead: "Přistavení kontejneru, odvoz suti, zeminy, stavebního odpadu a dovoz recyklátu nebo štěrku pro obce mezi Unhoští, Kladnem a Berounskem. Pro cenu stačí obec, co se poveze a fotka místa.",
    proof: "Obce kolem Chyňavy a Podkozí dávají smysl řešit jako jednu trasu. U domů, zahrad a rekonstrukcí rozhoduje hlavně přístup a typ odpadu.",
    areas: ["Chyňava", "Podkozí", "Nenačovice", "Nouzov", "Pavlov", "Malé Kyšice", "Kyšice", "Běleč", "Družec", "Unhošť", "Kladno", "Beroun"],
    cards: [
      { title: "Obce v trase", text: "Chyňava, Podkozí, Nenačovice, Nouzov, Pavlov, Malé Kyšice, Kyšice, Běleč a Družec. Vzdálenější místa se nacení podle konkrétní zakázky." },
      { title: "Časté zakázky", text: "Odvoz suti po rekonstrukci, zemina ze zahrady nebo výkopu, stavební odpad, dřevo, bioodpad a dovoz štěrku nebo recyklátu na cesty." },
      { title: "Co poslat", text: "Obec, přesnou adresu, co se má odvézt nebo přivézt, množství, termín a fotku vjezdu nebo místa přistavení." },
    ],
    panelTitle: "Kontejner u Chyňavy: nejvíc rozhoduje přístup a druh odpadu",
    panelText: "V menších obcích bývá důležité, jestli se auto otočí, zda kontejner stojí na vlastním pozemku a jestli se veze čistá suť, zemina nebo směsný stavební odpad.",
    bullets: ["odvoz suti Chyňava, Podkozí a Nenačovice", "kontejner na zeminu u zahrad a výkopů", "dovoz recyklátu, štěrku, písku nebo kačírku", "nacenění podle adresy, množství a přístupu"],
    links: [["Kontejnery Unhošť", "kontejnery-unhost.html"], ["Kontejnery Kladno", "kontejnery-kladno.html"], ["Kontejnery Beroun", "kontejnery-beroun.html"], ["Odvoz suti", "odvoz-suti.html"], ["Odvoz zeminy", "odvoz-zeminy.html"]],
    faq: [
      { q: "Jezdíte do Chyňavy, Podkozí a Nenačovic?", a: "Ano, tyto obce řeším podle trasy mezi Unhoští, Kladnem a Berounskem. Nejrychlejší je poslat přesnou adresu a typ zakázky." },
      { q: "Co když nevím velikost kontejneru?", a: "Stačí popsat odpad a přibližné množství. Fotka hromady nebo místa pomůže doporučit vhodnou velikost." },
      { q: "Dovezete po odvozu zeminy i recyklát nebo štěrk?", a: "Ano, u výkopů a příjezdových cest se často vyplatí spojit odvoz zeminy s dovozem materiálu." },
    ],
    cta: "Potřebujete kontejner v Chyňavě, Podkozí nebo okolí?",
    footer: "Kontejnery Chyňava, Podkozí, Nenačovice a okolí.",
    footerLinks: [["Unhošť", "kontejnery-unhost.html"], ["Kladno", "kontejnery-kladno.html"]],
  },
  {
    file: "kontejnery-lodenice-morina-srbsko.html",
    title: "Kontejnery Loděnice, Mořina a Srbsko | Kontejnerovka.cz",
    description: "Kontejnerová doprava pro Loděnici, Chrustenice, Mořinu, Srbsko, Bubovice, Svatý Jan pod Skalou, Kuchař a Trněný Újezd.",
    eyebrow: "Loděnice, Mořina a Srbsko",
    h1: "Kontejnery Loděnice, Chrustenice, Mořina, Srbsko a okolí",
    lead: "Odvoz suti, zeminy a stavebního odpadu i dovoz recyklátu, štěrku nebo písku pro obce v trase mezi Rudnou, Berounskem a Českým krasem.",
    proof: "V této oblasti často rozhoduje úzký příjezd, svažitý pozemek, turisticky vytížené komunikace a přesné místo, kde může kontejner stát.",
    areas: ["Loděnice", "Chrustenice", "Mořina", "Trněný Újezd", "Kuchař", "Tachlovice", "Bubovice", "Svatý Jan pod Skalou", "Vráž", "Kozolupy", "Srbsko", "Beroun", "Rudná", "Nučice"],
    cards: [
      { title: "Obce v trase", text: "Loděnice, Chrustenice, Mořina, Trněný Újezd, Kuchař, Bubovice, Svatý Jan pod Skalou, Vráž, Kozolupy a Srbsko." },
      { title: "Typické práce", text: "Rekonstrukce domů, odvoz staré suti, zemina z výkopů, příprava cest a dovoz recyklátu nebo štěrku." },
      { title: "Na co pozor", text: "V užších ulicích a u domů ve svahu pomůže fotka vjezdu, místa pro kontejner a informace, zda jde o vlastní pozemek nebo ulici." },
    ],
    panelTitle: "Odvoz suti a zeminy u Loděnice a Mořiny",
    panelText: "U obcí kolem Českého krasu je praktické předem ověřit přístup pro kontejnerové auto. Cena se odvíjí od trasy, nákladu, množství a místa, kde lze bezpečně stát.",
    bullets: ["kontejner Loděnice, Chrustenice a Mořina", "odvoz suti Srbsko, Bubovice a Svatý Jan pod Skalou", "dovoz recyklátu na příjezdové cesty", "možnost spojit výkop, odvoz zeminy a dovoz materiálu"],
    links: [["Kontejnery Rudná", "kontejnery-rudna.html"], ["Kontejnery Nučice", "kontejnery-nucice.html"], ["Kontejnery Beroun", "kontejnery-beroun.html"], ["Dovoz recyklátu", "dovoz-recyklatu.html"], ["Odvoz zeminy", "odvoz-zeminy.html"]],
    faq: [
      { q: "Jezdíte do Mořiny, Srbska a Svatého Jana pod Skalou?", a: "Ano, podle trasy a rozsahu zakázky. U těchto obcí je důležité poslat přesnou adresu a fotku příjezdu." },
      { q: "Dá se kontejner přistavit v užší ulici?", a: "Někdy ano, ale musí být bezpečné místo pro auto i kontejner. Pošlete fotku a rozměry vjezdu nebo ulice." },
      { q: "Umíte dovézt recyklát na cestu?", a: "Ano, recyklát, štěrk nebo písek lze často spojit s odvozem zeminy nebo suti." },
    ],
    cta: "Řešíte odvoz nebo dovoz v okolí Loděnice a Mořiny?",
    footer: "Kontejnery Loděnice, Mořina, Srbsko a okolí.",
    footerLinks: [["Rudná", "kontejnery-rudna.html"], ["Beroun", "kontejnery-beroun.html"]],
  },
  {
    file: "kontejnery-nizbor-hyskov-zelezna.html",
    title: "Kontejnery Nižbor, Hýskov a Železná | Odvoz suti a zeminy",
    description: "Kontejnerová doprava Nižbor, Hýskov, Železná a okolí Berouna. Odvoz suti, zeminy, odpadu a dovoz recyklátu nebo štěrku podle trasy.",
    eyebrow: "Nižbor, Hýskov a Železná",
    h1: "Kontejnery Nižbor, Hýskov, Železná a okolí Berouna",
    lead: "Kontejner na suť, zeminu a stavební odpad pro obce kolem Berounky. Nacenění podle přesné adresy, množství, typu odpadu a přístupu pro auto.",
    proof: "U obcí kolem Berounky bývá důležitý příjezd, možnost otočení a místo, kde kontejner nebude překážet provozu ani sousedům.",
    areas: ["Nižbor", "Hýskov", "Železná", "Vráž", "Beroun", "Králův Dvůr", "Zdice", "Loděnice", "Chyňava"],
    cards: [
      { title: "Obce v trase", text: "Nižbor, Hýskov, Železná, Vráž, Beroun, Králův Dvůr, Zdice a navazující obce podle konkrétní zakázky." },
      { title: "Časté náklady", text: "Čistá suť, beton, zemina, stavební směs, dřevo, bioodpad a materiál na zpevnění ploch." },
      { title: "Rychlá cena", text: "Pošlete obec, náklad, množství a fotku místa. U vzdálenější trasy pomůže i možný termín a informace o stání." },
    ],
    panelTitle: "Kontejner u Nižboru a Hýskova: plánování podle trasy",
    panelText: "Zakázky v okolí Berouna dávají smysl hlavně při jasném množství a dobrém přístupu. U menších objemů rozhoduje efektivní spojení s další trasou.",
    bullets: ["odvoz suti Nižbor, Hýskov a Železná", "kontejner na zeminu z výkopu", "dovoz recyklátu nebo štěrku na cesty", "nacenění bez paušálního slibu podle reálné trasy"],
    links: [["Kontejnery Beroun", "kontejnery-beroun.html"], ["Kontejnery Zdice", "kontejnery-zdice.html"], ["Kontejnery Králův Dvůr", "kontejnery-kraluv-dvur.html"], ["Odvoz suti", "odvoz-suti.html"], ["Dovoz recyklátu", "dovoz-recyklatu.html"]],
    faq: [
      { q: "Jezdíte do Nižboru a Hýskova?", a: "Ano, podle trasy a rozsahu zakázky. Uveďte přesnou adresu, typ nákladu a přibližné množství." },
      { q: "Je možné spojit odvoz zeminy s dovozem recyklátu?", a: "Ano, u cest a zpevnění ploch to často dává praktický smysl." },
      { q: "Stačí orientační množství?", a: "Ano, ale fotka hromady nebo místa pomůže cenu zpřesnit a doporučit vhodný kontejner." },
    ],
    cta: "Potřebujete kontejner v Nižboru, Hýskově nebo Železné?",
    footer: "Kontejnery Nižbor, Hýskov, Železná a okolí Berouna.",
    footerLinks: [["Beroun", "kontejnery-beroun.html"], ["Zdice", "kontejnery-zdice.html"]],
  },
  {
    file: "kontejnery-hostoun-dobroviz-stredokluky.html",
    title: "Kontejnery Hostouň, Dobrovíz a Středokluky | Odvoz odpadu",
    description: "Kontejnerová doprava pro Hostouň, Dobrovíz, Středokluky, Kněževes a okolí letiště. Odvoz suti, zeminy, odpadu a dovoz materiálu.",
    eyebrow: "Hostouň, Dobrovíz a letiště",
    h1: "Kontejnery Hostouň, Dobrovíz, Středokluky, Kněževes a okolí",
    lead: "Odvoz suti, zeminy a odpadu i dovoz stavebního materiálu v oblasti kolem Hostivice, Dobrovíze, letiště a severozápadního okraje Prahy.",
    proof: "U letištních a průmyslových obcí se hodí doplnit časové okno, kontakt na člověka na místě a informaci, zda jde o dům, stavbu nebo firemní areál.",
    areas: ["Hostouň", "Dobrovíz", "Středokluky", "Kněževes", "Hostivice", "Jeneč", "Ruzyně", "Dědina", "Praha 6", "Praha-západ"],
    cards: [
      { title: "Obce v trase", text: "Hostouň, Dobrovíz, Středokluky, Kněževes, Hostivice, Jeneč, Ruzyně a Dědina." },
      { title: "Pro domy i firmy", text: "Rodinné domy, provozy, areály, menší stavby, rekonstrukce a úklid po pracích." },
      { title: "Co pomůže", text: "Přesná adresa, časové okno, typ odpadu, množství a fotka místa, kde může auto bezpečně stát." },
    ],
    panelTitle: "Kontejner v okolí letiště: důležitý je přístup a čas",
    panelText: "U Hostouně, Dobrovíze, Středokluk a Kněževsi často rozhoduje provoz v okolí, úzké ulice nebo firemní režim areálu. Čím přesnější údaje pošlete, tím rychleji lze potvrdit cenu.",
    bullets: ["kontejner Hostouň, Dobrovíz, Středokluky a Kněževes", "odvoz suti a stavebního odpadu v okolí letiště", "odvoz zeminy a dovoz materiálu pro domy i firmy", "návaznost na Hostivici, Jeneč, Ruzyni a Prahu 6"],
    links: [["Kontejnery Hostivice", "kontejnery-hostivice.html"], ["Odvoz suti Hostivice", "odvoz-suti-hostivice.html"], ["Kontejnery Praha 6", "kontejnery-praha-6.html"], ["Kontejnery Praha-západ", "kontejnery-praha-zapad.html"], ["Kontakt", "kontakt.html#formular"]],
    faq: [
      { q: "Jezdíte do Hostouně, Středokluk a Kněževsi?", a: "Ano, tyto obce řeším v návaznosti na Hostivici, Dobrovíz, Jeneč a Prahu 6. Cena se potvrdí podle adresy a typu zakázky." },
      { q: "Umíte řešit firemní areály?", a: "Ano. U firem je dobré doplnit časové okno, kontakt na osobu na místě a případná pravidla vjezdu." },
      { q: "Může kontejner stát na ulici?", a: "Někdy ano, ale záleží na místě a pravidlech obce. U veřejného stání je lepší vše ověřit předem." },
    ],
    cta: "Potřebujete kontejner v okolí Hostouně nebo letiště?",
    footer: "Kontejnery Hostouň, Dobrovíz, Středokluky a okolí letiště.",
    footerLinks: [["Hostivice", "kontejnery-hostivice.html"], ["Praha 6", "kontejnery-praha-6.html"]],
  },
  {
    file: "kontejnery-horovice.html",
    title: "Kontejnery Hořovice | Odvoz suti, zeminy a odpadu",
    description: "Kontejnerová doprava Hořovice a okolí. Odvoz suti, zeminy, stavebního odpadu a dovoz písku, štěrku nebo recyklátu podle trasy.",
    eyebrow: "Hořovice",
    h1: "Kontejnery Hořovice a okolí",
    lead: "Přistavení kontejneru, odvoz suti, zeminy a stavebního odpadu i dovoz stavebních materiálů pro Hořovice a navazující obce podle konkrétní trasy.",
    proof: "Hořovice řeším podle rozsahu zakázky a trasy. U vzdálenějších míst je důležité poslat množství a typ odpadu hned na začátku.",
    areas: ["Hořovice", "Zdice", "Králův Dvůr", "Beroun", "Žebrák", "Komárov", "Středočeský kraj"],
    cards: [
      { title: "Časté zakázky", text: "Odvoz suti po rekonstrukci, zemina z výkopu, stavební odpad a dovoz recyklátu nebo štěrku." },
      { title: "Co rozhoduje", text: "Vzdálenost, množství, typ odpadu, dostupná skládka nebo materiál a místo, kde může kontejner stát." },
      { title: "Jak nacenit", text: "Pošlete obec, přesnou adresu, co se poveze, množství, termín a fotku místa." },
    ],
    panelTitle: "Kontejner Hořovice: férově podle trasy a množství",
    panelText: "U Hořovic dává smysl nacenit zakázku podle konkrétního rozsahu. Jedna větší zakázka nebo spojení odvozu s dovozem materiálu může trasu výrazně zefektivnit.",
    bullets: ["kontejner Hořovice a okolí", "odvoz suti, betonu, zeminy a stavebního odpadu", "dovoz písku, štěrku a recyklátu", "možnost navázat na zemní práce"],
    links: [["Kontejnery Beroun", "kontejnery-beroun.html"], ["Kontejnery Zdice", "kontejnery-zdice.html"], ["Kontejnery Králův Dvůr", "kontejnery-kraluv-dvur.html"], ["Odvoz suti", "odvoz-suti.html"], ["Dovoz recyklátu", "dovoz-recyklatu.html"]],
    faq: [
      { q: "Jezdíte do Hořovic?", a: "Ano, podle trasy a rozsahu zakázky. Nejlepší je poslat přesnou adresu, typ odpadu a množství." },
      { q: "Dá se spojit odvoz a dovoz materiálu?", a: "Ano, u rekonstrukcí, výkopů a cest to často dává smysl. Uveďte obě části už v první zprávě." },
      { q: "Kolik stojí kontejner v Hořovicích?", a: "Cena se potvrdí podle adresy, odpadu, množství, skládkovného, přístupu a trasy. Bez těchto údajů by pevná částka byla zavádějící." },
    ],
    cta: "Potřebujete kontejner v Hořovicích?",
    footer: "Kontejnery Hořovice a okolí.",
    footerLinks: [["Beroun", "kontejnery-beroun.html"], ["Zdice", "kontejnery-zdice.html"]],
  },
  {
    file: "kontejnery-zdice.html",
    title: "Kontejnery Zdice | Odvoz suti, zeminy a stavebního odpadu",
    description: "Kontejnerová doprava Zdice, Beroun a okolí. Odvoz suti, zeminy, betonu a stavebního odpadu, dovoz recyklátu, písku a štěrku.",
    eyebrow: "Zdice",
    h1: "Kontejnery Zdice, Beroun a okolí",
    lead: "Kontejner na suť, beton, zeminu a stavební odpad pro Zdice a okolní obce. Dovoz recyklátu, písku nebo štěrku pro příjezdové cesty a stavby.",
    proof: "Zdice jsou praktickou trasou pro odvoz suti a zeminy z rekonstrukcí i dovoz materiálu na cesty a podklady.",
    areas: ["Zdice", "Beroun", "Králův Dvůr", "Hořovice", "Hýskov", "Nižbor", "Středočeský kraj"],
    cards: [
      { title: "Co vozím", text: "Suť, beton, zeminu, stavební směs, dřevo a bioodpad po domluvě." },
      { title: "Co dovezu", text: "Recyklát, štěrk, písek, kačírek nebo zeminu podle dostupnosti a místa složení." },
      { title: "Rychlá domluva", text: "Nejrychlejší je poslat obec, fotku, typ odpadu a množství. U materiálu napište účel použití." },
    ],
    panelTitle: "Kontejner Zdice a okolí Berouna",
    panelText: "U Zdic se často řeší kombinace rekonstrukce, odvozu suti a přípravy zpevněných ploch. Proto se vyplatí napsat, jestli budete potřebovat i dovoz recyklátu nebo štěrku.",
    bullets: ["odvoz suti Zdice", "kontejner na zeminu a beton", "dovoz recyklátu a štěrku", "nacenění podle trasy, skládky a přístupu"],
    links: [["Kontejnery Beroun", "kontejnery-beroun.html"], ["Kontejnery Hořovice", "kontejnery-horovice.html"], ["Kontejnery Králův Dvůr", "kontejnery-kraluv-dvur.html"], ["Odvoz betonu", "odvoz-betonu.html"], ["Dovoz štěrku", "dovoz-sterku.html"]],
    faq: [
      { q: "Jezdíte do Zdic?", a: "Ano, podle trasy a rozsahu zakázky. Pošlete adresu, náklad, množství a fotku místa." },
      { q: "Dovezete recyklát na příjezdovou cestu?", a: "Ano, napište plochu, požadovanou výšku vrstvy a místo složení." },
      { q: "Může být v suti beton?", a: "Ano, ale beton a čistá suť se řeší jinak než směsný stavební odpad. Popište složení předem." },
    ],
    cta: "Potřebujete kontejner ve Zdicích?",
    footer: "Kontejnery Zdice, Beroun a okolí.",
    footerLinks: [["Beroun", "kontejnery-beroun.html"], ["Hořovice", "kontejnery-horovice.html"]],
  },
  {
    file: "kontejnery-kraluv-dvur.html",
    title: "Kontejnery Králův Dvůr | Odvoz suti a zeminy",
    description: "Kontejnerová doprava Králův Dvůr, Beroun a okolí. Odvoz suti, zeminy, stavebního odpadu a dovoz recyklátu, písku nebo štěrku.",
    eyebrow: "Králův Dvůr",
    h1: "Kontejnery Králův Dvůr, Beroun a okolí",
    lead: "Přistavení kontejneru a odvoz suti, zeminy, betonu nebo stavebního odpadu pro Králův Dvůr, Beroun a navazující obce podle konkrétní trasy.",
    proof: "Králův Dvůr se často řeší společně s Berounem a Zdicemi. Pro rychlou cenu pomůže přesná adresa a fotka místa pro kontejner.",
    areas: ["Králův Dvůr", "Beroun", "Zdice", "Hýskov", "Nižbor", "Vráž", "Loděnice", "Středočeský kraj"],
    cards: [
      { title: "Pro domy i stavby", text: "Rekonstrukce, výkopy, zahrady, příjezdové cesty, firemní zakázky a odvoz stavebního odpadu." },
      { title: "Odvoz i dovoz", text: "Kontejner na suť a zeminu, odvoz betonu, dovoz recyklátu, písku nebo štěrku." },
      { title: "Co poslat", text: "Adresu, náklad, množství, termín, přístup a fotku místa. U ulice doplňte, zda je potřeba řešit stání." },
    ],
    panelTitle: "Kontejner Králův Dvůr: odvoz suti, zeminy i betonu",
    panelText: "Cena se potvrzuje podle konkrétní zakázky. U těžkých materiálů jako beton a zemina rozhoduje hmotnost a skládkovné, u směsného odpadu také složení.",
    bullets: ["kontejner Králův Dvůr a Beroun", "odvoz suti, betonu a zeminy", "dovoz recyklátu a štěrku", "férové nacenění před výjezdem"],
    links: [["Kontejnery Beroun", "kontejnery-beroun.html"], ["Kontejnery Zdice", "kontejnery-zdice.html"], ["Kontejnery Hořovice", "kontejnery-horovice.html"], ["Kontejner na beton", "kontejner-na-beton.html"], ["Odvoz zeminy", "odvoz-zeminy.html"]],
    faq: [
      { q: "Jezdíte do Králova Dvora?", a: "Ano, podle konkrétní trasy a rozsahu zakázky. Pošlete adresu, typ odpadu, množství a fotku místa." },
      { q: "Jak se liší čistá suť a stavební směs?", a: "Čistá suť je jednodušší a obvykle levnější na zpracování. Směsný stavební odpad s dřevem, plasty nebo vybavením se řeší jinak." },
      { q: "Umíte odvézt i zeminu z výkopu?", a: "Ano, zeminu odvezu kontejnerem. U většího množství napište odhad v m3 nebo pošlete fotku hromady." },
    ],
    cta: "Potřebujete kontejner v Králově Dvoře?",
    footer: "Kontejnery Králův Dvůr, Beroun a okolí.",
    footerLinks: [["Beroun", "kontejnery-beroun.html"], ["Zdice", "kontejnery-zdice.html"]],
  },
];

for (const page of pages) {
  writeFileSync(page.file, pageHtml(page), "utf8");
  console.log(`Generated ${page.file}`);
}
