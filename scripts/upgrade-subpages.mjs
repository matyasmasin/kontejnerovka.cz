import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const SKIP_FILES = new Set([
  "404.html",
  "dekujeme.html",
  "index.html",
  "kontakt.html",
  "o-nas.html",
  "ochrana-osobnich-udaju.html",
  "poradna.html",
  "reference.html",
]);

const KEYWORD_VARIANTS = [
  {
    test: (file) =>
      file.includes("zeminy") ||
      file.includes("zeminu") ||
      file.includes("zemni-prace") ||
      file.startsWith("vykop-") ||
      file === "rovnani-terenu.html" ||
      file === "odbahneni-rybniku.html",
    type: "soil",
  },
  {
    test: (file) => file.startsWith("dovoz-"),
    type: "delivery",
  },
  {
    test: (file) =>
      file.includes("beton") ||
      file.includes("sut") ||
      file.includes("stavebni-odpad") ||
      file.includes("odpadu") ||
      file.includes("bioodpadu") ||
      file.includes("velkoobjemovy-kontejner"),
    type: "waste",
  },
  {
    test: (file) => file.startsWith("kontejnery-") || file.includes("praha-zapad") || file.includes("praha-vychod"),
    type: "local",
  },
];

const readHtml = (file) => readFileSync(file, "utf8");

const extractMatch = (pattern, html) => html.match(pattern)?.[1]?.trim() ?? "";

const stripTags = (value) => value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const getContext = (file, html) => {
  const hero = html.match(/<section class="subpage-hero">([\s\S]*?)<\/section>/)?.[1] ?? "";
  const eyebrow = stripTags(extractMatch(/<p class="eyebrow">([\s\S]*?)<\/p>/, hero));
  const h1 = stripTags(extractMatch(/<h1>([\s\S]*?)<\/h1>/, hero));
  const lead = stripTags(hero.replace(/[\s\S]*?<h1>[\s\S]*?<\/h1>/, "").match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? "");
  const label = eyebrow || h1.split(":")[0] || h1;
  const type = KEYWORD_VARIANTS.find((variant) => variant.test(file))?.type ?? "generic";
  const isLocal = type === "local" || /^odvoz-(suti|zeminy)-/.test(file) || file === "zemni-prace-kladno.html";
  return { eyebrow, h1, lead, label, type, isLocal };
};

const getCopy = (context) => {
  const label = context.label || "této zakázky";

  const variants = {
    local: {
      visualTitle: "V terénu rozhodne adresa, stání a návaznost celé zakázky",
      visualText: `${label} se nejlépe naceňuje podle přesné adresy, typu nákladu, možnosti stání a toho, jestli řešíte jen odvoz, nebo i navazující dovoz materiálu.`,
      proofTitle: "Adresa, náklad a fotka zkrátí domluvu na minimum.",
      proofText: "U lokálních stránek bývá největší rozdíl mezi dvorem, ulicí, stavbou a vnitroblokem. Fotka místa proto šetří zbytečné telefonáty.",
      cards: [
        {
          title: "Konkrétní adresa je víc než název oblasti",
          text: `U ${label} pomůže přesná ulice nebo obec. Stejná lokalita může znamenat pohodlný dvůr i problematické stání na ulici.`,
        },
        {
          title: "Vyplatí se napsat i druhou část zakázky",
          text: "Když po odvozu plánujete zásyp, recyklát, štěrk nebo další otočku, je lepší to uvést rovnou. Často to zlepší plán i cenu.",
        },
      ],
      noteEyebrow: "Lokální poznámka",
      noteTitle: "Nejrychlejší bývá zpráva s adresou, fotkou a tím, kde může auto stát",
      noteText: `Pro ${label} je důležitější reálný přístup než obecný slib. Ulice, dvůr, jednosměrka, stavba nebo firemní areál často rozhodnou víc než samotné množství.`,
      mobileTitle: `Řešíte ${label} přímo z mobilu?`,
      mobileText: "Pošlete adresu, typ nákladu, orientační množství a fotku místa, kde má stát kontejner nebo kam se má materiál složit.",
    },
    waste: {
      visualTitle: "Čistota materiálu, hmotnost a přístup jsou důležitější než obecný popis",
      visualText: `${label} se naceňuje podle složení materiálu, množství, hmotnosti a přístupu pro auto. Když je náklad promíchaný, je lepší to napsat otevřeně hned.`,
      proofTitle: "Fotka a pravdivý popis odpadu většinou ušetří nejvíc času.",
      proofText: "Rozdíl mezi čistou sutí, betonem, směsí a objemným odpadem je zásadní pro cenu i postup. Nejpřesnější bývá krátký popis doplněný fotkou.",
      cards: [
        {
          title: "Nemíchat odlišné odpady bez domluvy",
          text: "Když se do čisté suti přidá dřevo, plast, sádrokarton nebo vybavení bytu, mění se likvidace i vhodný postup. Lepší je to uvést před výjezdem.",
        },
        {
          title: "Hmotnost bývá důležitější než objem",
          text: "Suť, beton a zemina vypadají objemově menší, ale rychle ztěžknou. U těžkých materiálů je bezpečnější přesnější odhad a někdy i menší kontejner.",
        },
      ],
      noteEyebrow: "Praktická poznámka",
      noteTitle: "Když si nejste jistí, jak službu popsat, napište raději složení než marketingový název",
      noteText: "Na cenu má větší vliv to, co v nákladu opravdu je, než jestli tomu říkáte suť, stavební odpad nebo vyklízení. Krátký pravdivý popis je nejlepší start.",
      mobileTitle: "Chcete cenu bez zbytečného dopisování?",
      mobileText: "Pošlete fotku odpadu, napište adresu a doplňte, zda jde o čistý materiál, směs nebo těžké kusy. To většinou stačí pro první rozumný odhad.",
    },
    delivery: {
      visualTitle: "U dovozu rozhoduje frakce, množství a bezpečné místo složení",
      visualText: `${label} se plánuje podle účelu použití, množství, dostupnosti materiálu a toho, kam se dá bezpečně zajet a vysypat náklad.`,
      proofTitle: "Popis použití bývá užitečnější než neurčitá objednávka materiálu.",
      proofText: "Když neznáte přesnou frakci nebo objem, pomůže napsat, zda řešíte drenáž, zásyp, cestu, podklad nebo okrasnou vrstvu. Podle toho jde doporučit lepší variantu.",
      cards: [
        {
          title: "Napište, kam materiál přijde",
          text: "Jiný materiál se hodí pod dlažbu, jiný na drenáž, zásyp nebo finální povrch. Účel použití pomůže zvolit správnou frakci i množství.",
        },
        {
          title: "Fotka místa složení šetří komplikace při příjezdu",
          text: "U úzkých vjezdů, měkkého povrchu nebo složení na ulici pomůže fotka místa. Je lepší to vědět předem než řešit improvizaci na místě.",
        },
      ],
      noteEyebrow: "Dovoz materiálu",
      noteTitle: "Když si nejste jistí množstvím, pošlete rozměr plochy a výšku vrstvy",
      noteText: "Přibližná plocha, délka cesty, šířka zásypu nebo hloubka vrstvy pomůžou dopočítat orientační objem. Frakci pak lze potvrdit podle použití.",
      mobileTitle: "Řešíte dovoz a chcete to mít rychle?",
      mobileText: "Pošlete adresu, účel použití, odhad množství a fotku místa, kam se má materiál složit. Když frakci nevíte, doplňte aspoň použití.",
    },
    soil: {
      visualTitle: "U výkopů a zeminy je klíčový přístup techniky a návazný odvoz",
      visualText: `${label} se neplánuje jen podle kubíků. Důležitá je vlhkost a hmotnost zeminy, šířka přístupu, práce techniky a to, zda navazuje zásyp nebo dovoz dalšího materiálu.`,
      proofTitle: "Přístup pro techniku a odvoz je lepší řešit spolu, ne odděleně.",
      proofText: "U výkopů se rychle ukáže, že nestačí jen bagr nebo jen kontejner. Nejlépe funguje, když je předem jasné, kam se technika dostane a co se stane s vytěženým materiálem.",
      cards: [
        {
          title: "Nejdřív popsat místo, až potom řešit kubíky",
          text: "U zemních prací je rozdíl mezi otevřenou zahradou, úzkým dvorem a stavbou s omezeným vjezdem. Fotka a krátký popis přístupu pomůžou víc než hrubý odhad objemu.",
        },
        {
          title: "Odvoz a dovoz je lepší sladit do jedné domluvy",
          text: "Když po výkopu následuje zásyp, recyklát, štěrk nebo srovnání terénu, vyplatí se to řešit jako jeden celek. Šetří to čas i zbytečné přejezdy.",
        },
      ],
      noteEyebrow: "Zemní práce",
      noteTitle: "U zeminy a výkopů pomůže i orientační hloubka, šířka a fotka přístupu",
      noteText: "Mokrá hlína, kameny, příměs suti nebo kořenů a omezený přístup mohou změnit vhodný postup. Když to víme předem, je menší riziko zdržení na místě.",
      mobileTitle: "Řešíte výkop nebo odvoz zeminy právě teď?",
      mobileText: "Pošlete adresu, popište typ práce, přibližný rozsah a přidejte fotku přístupu nebo výkopu. To stačí pro první praktické posouzení.",
    },
    generic: {
      visualTitle: "Praktická domluva funguje lépe než obecný formulářový popis",
      visualText: `${label} se nejrychleji řeší podle adresy, fotky a krátkého popisu, co se má odvézt, přivézt nebo připravit.`,
      proofTitle: "Adresa, náklad a fotka bývají nejlepší kombinace pro rychlou cenu.",
      proofText: "Když je jasné místo, množství a přístup, většina nejasností odpadne ještě před výjezdem.",
      cards: [
        {
          title: "Krátký praktický popis je nejlepší start",
          text: "Napište, co se řeší, kde to je a jak vypadá přístup. To většinou stačí k prvnímu použitelnému odhadu.",
        },
        {
          title: "Fotka místa často nahradí dlouhé vysvětlování",
          text: "Jedna fotka příjezdu, hromady nebo místa stání pomůže rychleji než několik zpráv bez kontextu.",
        },
      ],
      noteEyebrow: "Rychlá domluva",
      noteTitle: "Když si nejste jistí, co přesně napsat, pošlete aspoň adresu a fotku",
      noteText: "Na většině stránek webu funguje stejný princip: přesné místo, reálný stav a stručný popis jsou lepší než neurčitá poptávka bez detailu.",
      mobileTitle: "Chcete to vyřešit rychle z telefonu?",
      mobileText: "Pošlete adresu, krátký popis a fotku. Když bude něco chybět, navážeme už jen krátkým doplněním.",
    },
  };

  return variants[context.type] ?? variants.generic;
};

const getCtaHref = (html) => (html.includes('id="poptavka"') ? "#poptavka" : "kontakt.html#formular");

const renderVisualSection = (file, context, copy, ctaHref) => {
  const id = `field-proof-${file.replace(/[^a-z0-9]+/gi, "-")}`;
  return `
      <section class="section visual-proof subpage-showcase" aria-labelledby="${id}" data-master-upgrade="visual-proof">
        <div class="visual-proof-copy">
          <p class="eyebrow">Z praxe</p>
          <h2 id="${id}">${copy.visualTitle}</h2>
          <p>${copy.visualText}</p>
          <a class="section-link light" href="${ctaHref}">Chci cenu</a>
        </div>
        <div class="visual-proof-grid">
          <article class="visual-proof-card image-card"><img src="assets/truck-crane-extended.jpg" alt="Vlastní kontejnerové auto s rukou Kontejnerovka.cz při vysunuté manipulaci" width="1800" height="1442" loading="lazy"><div><span>Reálný výjezd</span><strong>Přístup, trasa a stání se řeší předem, ne až na místě.</strong></div></article>
          <article class="visual-proof-card image-card"><img src="assets/container-tilt.jpg" alt="Vlastní kontejner Kontejnerovka.cz při sklápění v provozu" width="1800" height="1350" loading="lazy"><div><span>Kontejner v provozu</span><strong>Na fotce je skutečný kontejner při sklápění, odvozu a manipulaci na místě.</strong></div></article>
          <article class="visual-proof-card proof-card-dark"><span class="proof-number">3 údaje</span><h3>${copy.proofTitle}</h3><p>${copy.proofText}</p></article>
        </div>
      </section>
`;
};

const renderContentBlocks = (copy) => `
      <section class="section content-blocks" data-master-upgrade="content-blocks">
        <article><h2>${copy.cards[0].title}</h2><p>${copy.cards[0].text}</p></article>
        <article><h2>${copy.cards[1].title}</h2><p>${copy.cards[1].text}</p></article>
      </section>
`;

const renderServiceNote = (copy) => `
      <section class="section service-note" data-master-upgrade="service-note">
        <p class="eyebrow">${copy.noteEyebrow}</p>
        <h2>${copy.noteTitle}</h2>
        <p>${copy.noteText}</p>
      </section>
`;

const renderMobileAction = (copy) => `
      <section class="section mobile-action-box" data-master-upgrade="mobile-action-box">
        <h2>${copy.mobileTitle}</h2>
        <p>${copy.mobileText}</p>
        <div class="hero-actions"><a class="btn btn-primary" href="tel:+420738505028"><i data-lucide="phone-call" aria-hidden="true"></i>Zavolat</a><a class="btn btn-dark" href="#poptavka"><i data-lucide="send" aria-hidden="true"></i>Poslat poptávku</a></div>
      </section>
`;

const insertAfterHeroOrTrustbar = (html, block) => {
  if (/class="subpage-trustbar"/.test(html)) {
    const trustbarIndex = html.indexOf('<div class="subpage-trustbar"');
    const nextSectionIndex = html.indexOf('<section class="section', trustbarIndex);
    if (trustbarIndex !== -1 && nextSectionIndex !== -1) {
      return `${html.slice(0, nextSectionIndex)}\n${block}${html.slice(nextSectionIndex)}`;
    }
  }
  return html.replace(/(<section class="subpage-hero">[\s\S]*?<\/section>)/, `$1\n${block}`);
};

const insertAfterDetailGrid = (html, block) => {
  if (/class="section detail-grid"/.test(html)) {
    return html.replace(/(<section class="section detail-grid"[\s\S]*?<\/section>)/, `$1\n${block}`);
  }
  if (/class="section visual-proof subpage-showcase"/.test(html)) {
    return html.replace(/(<section class="section visual-proof subpage-showcase"[\s\S]*?<\/section>)/, `$1\n${block}`);
  }
  return insertAfterHeroOrTrustbar(html, block);
};

const insertBeforeFaqOrCta = (html, block) => {
  if (/class="section faq"/.test(html)) {
    return html.replace(/(\s*<section class="section faq")/, `\n${block}$1`);
  }
  return html.replace(/(\s*<section class="cta-band")/, `\n${block}$1`);
};

const insertBeforeCta = (html, block) => html.replace(/(\s*<section class="cta-band")/, `\n${block}$1`);

const shouldSkip = (file) => SKIP_FILES.has(file) || !file.endsWith(".html");

const files = readdirSync(".")
  .filter((file) => file.endsWith(".html"))
  .filter((file) => !shouldSkip(file));

const changed = [];

for (const file of files) {
  let html = readHtml(file);
  if (!html.includes('class="subpage-hero"')) continue;

  const context = getContext(file, html);
  const copy = getCopy(context);
  let nextHtml = html;
  const ctaHref = getCtaHref(nextHtml);

  if (!/class="section visual-proof subpage-showcase"/.test(nextHtml)) {
    nextHtml = insertAfterHeroOrTrustbar(nextHtml, renderVisualSection(file, context, copy, ctaHref));
  }

  if (!/class="section content-blocks"/.test(nextHtml) && file !== "technika.html" && file !== "lokality.html" && file !== "sluzby.html") {
    nextHtml = insertAfterDetailGrid(nextHtml, renderContentBlocks(copy));
  }

  if (!/class="section service-note"/.test(nextHtml) && file !== "cenik.html" && file !== "technika.html" && file !== "sluzby.html") {
    nextHtml = insertBeforeFaqOrCta(nextHtml, renderServiceNote(copy));
  }

  if (context.isLocal && !/class="section mobile-action-box"/.test(nextHtml)) {
    nextHtml = insertBeforeCta(nextHtml, renderMobileAction(copy));
  }

  if (nextHtml !== html) {
    writeFileSync(file, nextHtml);
    changed.push(file);
  }
}

console.log(`Upgraded ${changed.length} pages.`);
for (const file of changed) {
  console.log(file);
}
