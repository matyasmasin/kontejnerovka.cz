#!/usr/bin/env python3
# Jednorázový generátor stránek sekce Zemní práce (spuštěno 2026-06-12).
# Vygenerované soubory dál žijí jako statické HTML; skript je tu pro dohledatelnost.
import json

CACHE = "20260720c"
AREA = ["Svárov", "Unhošť", "Nučice", "Rudná", "Hostivice", "Kladno", "Beroun",
        "Praha-západ", "Praha", "Středočeský kraj"]

PROVIDER = {
    "@type": "LocalBusiness",
    "@id": "https://kontejnerovka.cz/#localbusiness",
    "name": "Kontejnerovka.cz",
    "legalName": "Matyáš Mašín",
    "url": "https://kontejnerovka.cz/",
    "telephone": "+420728505028",
    "email": "info@kontejnerovka.cz",
    "taxID": "01379178",
    "vatID": "CZ9211070033",
    "address": {"@type": "PostalAddress", "streetAddress": "Holýšovská 2923/4",
                 "addressLocality": "Praha 5 - Stodůlky", "postalCode": "15500", "addressCountry": "CZ"},
    "geo": {"@type": "GeoCoordinates", "latitude": 50.04112, "longitude": 14.31985},
    "sameAs": ["https://share.google/3gRahFm7A2awhEeJJ"],
    "hasMap": "https://share.google/3gRahFm7A2awhEeJJ",
}

TRUSTBAR = '''<div class="subpage-trustbar" aria-label="Proč zemní práce s námi"><div><i data-lucide="badge-check" aria-hidden="true"></i><span><strong>15 let praxe</strong><span>Zemní práce děláme od roku 2011.</span></span></div><div><i data-lucide="shovel" aria-hidden="true"></i><span><strong>Technika do 5 t</strong><span>Projede i tam, kam se velký stroj nedostane.</span></span></div><div><i data-lucide="shield-check" aria-hidden="true"></i><span><strong>Výkop, odvoz i dovoz</strong><span>Jedna parta, jedna domluva, cena předem.</span></span></div></div>'''

def faq_html(faq):
    return "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in faq)

def page_html(p):
    faq_ld = {"@context": "https://schema.org", "@type": "FAQPage",
              "mainEntity": [{"@type": "Question", "name": q,
                               "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p["faq"]]}
    service_ld = {"@context": "https://schema.org", "@type": "Service", "name": p["service"],
                  "provider": PROVIDER, "areaServed": AREA, "serviceType": p["service"],
                  "url": f"https://kontejnerovka.cz/{p['file']}"}
    crumbs = [{"@type": "ListItem", "position": 1, "name": "Úvod", "item": "https://kontejnerovka.cz/"}]
    if p["file"] != "zemni-prace.html":
        crumbs.append({"@type": "ListItem", "position": 2, "name": "Zemní práce",
                        "item": "https://kontejnerovka.cz/zemni-prace.html"})
    crumbs.append({"@type": "ListItem", "position": len(crumbs) + 1, "name": p["h1"],
                    "item": f"https://kontejnerovka.cz/{p['file']}"})
    bc_ld = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": crumbs}

    detail = "".join(f"<article><h2>{h}</h2><p>{t}</p></article>" for h, t in p["detail"])
    blocks = "".join(f"\n        <article>\n          <h2>{h}</h2>\n          <p>{t}</p>\n        </article>"
                     for h, t in p["blocks"])
    links = "".join(f'<li><a href="{href}">{label}</a></li>' for label, href in p["links"])
    bullets = "".join(f"\n          <li>{b}</li>" for b in p["bullets"])

    return f'''<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>{p["title"]}</title>
    <meta name="description" content="{p["desc"]}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://kontejnerovka.cz/{p["file"]}">
    <meta property="og:title" content="{p["title"]}">
    <meta property="og:description" content="{p["desc"]}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://kontejnerovka.cz/{p["file"]}">
    <meta property="og:image" content="https://kontejnerovka.cz/assets/og-kontejnerovka.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="{p["h1"]} - Kontejnerovka.cz">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{p["title"]}">
    <meta name="twitter:description" content="{p["desc"]}">
    <meta name="twitter:image" content="https://kontejnerovka.cz/assets/og-kontejnerovka.png">
    <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
    <link rel="manifest" href="site.webmanifest">
    <link rel="stylesheet" href="styles.css?v={CACHE}">
    <script src="script.js?v={CACHE}" defer></script>
    <script type="application/ld+json">{json.dumps(service_ld, ensure_ascii=False)}</script>
    <script type="application/ld+json">{json.dumps(bc_ld, ensure_ascii=False)}</script>
    <script type="application/ld+json" data-visible-faq>{json.dumps(faq_ld, ensure_ascii=False)}</script>
  </head>
  <body>
    <header class="site-header is-scrolled" data-header>
      <a class="brand" href="/"><span class="brand-mark">K</span><span><strong>Kontejnerovka.cz</strong><small>Praha a Středočeský kraj</small></span></a>
      <nav class="site-nav" id="site-nav" data-nav><a href="sluzby.html">Služby</a><a href="zemni-prace.html">Zemní práce</a><a href="cenik.html">Ceník</a><a href="lokality.html">Lokality</a><a href="reference.html">Realizace</a><a href="technika.html">Technika</a><a href="o-nas.html">O nás</a><a href="poradna.html">Poradna</a><a href="kontakt.html">Kontakt</a></nav>
      <div class="header-actions"><div class="language-switcher" aria-label="Jazyk webu"><a class="is-active" href="/{p["file"]}" lang="cs" aria-current="page">CZ</a><a href="/en/" hreflang="en" lang="en">EN</a></div><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle><i data-lucide="menu" aria-hidden="true"></i><span class="sr-only">Otevřít menu</span></button><a class="header-call" href="tel:+420728505028"><i data-lucide="phone" aria-hidden="true"></i>728&nbsp;505&nbsp;028</a></div>
    </header>
    <main class="page-main">
      <section class="subpage-hero">
        <p class="eyebrow">{p["eyebrow"]}</p>
        <h1>{p["h1"]}</h1>
        <p>{p["lead"]}</p>
      <div class="hero-actions"><a class="btn btn-primary" href="tel:+420728505028"><i data-lucide="phone-call" aria-hidden="true"></i>Zavolat kvůli ceně</a><a class="btn btn-dark" href="#poptavka"><i data-lucide="send" aria-hidden="true"></i>Poslat údaje</a></div></section>
      {TRUSTBAR}
      <section class="section detail-grid">
        {detail}
      </section>
      <section class="section content-blocks">{blocks}
      </section>
      <section class="section seo-panel">
        <h2>{p["panel_h2"]}</h2>
        <p>{p["panel_text"]}</p>
        <ul>{bullets}
        </ul>
        <ul class="link-cloud">{links}</ul>
      </section>
      <section class="section mobile-action-box">
        <h2>Rychlá poptávka z mobilu</h2>
        <p>Pošlete obec, co potřebujete vykopat nebo upravit, a fotku místa včetně vjezdu na pozemek.</p>
        <div class="hero-actions"><a class="btn btn-primary" href="tel:+420728505028"><i data-lucide="phone-call" aria-hidden="true"></i>Zavolat</a><a class="btn btn-dark" href="#poptavka"><i data-lucide="send" aria-hidden="true"></i>Poslat údaje</a></div>
      </section>
      <section class="section faq">
        <div class="section-head compact"><p class="eyebrow">Dotazy</p><h2>{p["faq_h2"]}</h2></div>
        <div class="faq-list">
          {faq_html(p["faq"])}
        </div>
      </section>
      <section class="section service-note">
        <p class="eyebrow">Kde jezdíme</p>
        <h2>Zemní práce na Praze-západ, Kladensku a Berounsku</h2>
        <p>Nejrychleji jsme ve Svárově, Unhošti, Nučicích, Rudné, Hostivici, na Kladensku a Praze-západ; Prahu, Berounsko a další části Středočeského kraje řešíme podle trasy. Výkop jde rovnou spojit s odvozem zeminy kontejnerem a dovozem štěrku, recyklátu nebo nové zeminy.</p>
      </section>
      <section class="cta-band"><h2>{p["cta"]}</h2><a class="btn btn-primary" href="#poptavka">Poslat údaje k nacenění</a></section>
      <!-- mini-inquiry:start -->
      <!-- mini-inquiry:end -->
    </main>
    <footer class="site-footer">
      <div><strong>Kontejnerovka.cz</strong><p>Kontejnerová doprava, zemní práce, odvoz odpadu a dovoz stavebních materiálů.</p></div>
      <div><p>Provozovatel: Matyáš Mašín</p><p>IČO: 01379178 · DIČ: CZ9211070033 · Plátce DPH</p><p>Holýšovská 2923/4, Stodůlky, 155 00 Praha 5</p></div>
      <div><a href="tel:+420728505028">728&nbsp;505&nbsp;028</a><a href="mailto:info@kontejnerovka.cz">info@kontejnerovka.cz</a><a href="https://share.google/3gRahFm7A2awhEeJJ" target="_blank" rel="noopener">Google profil</a><a href="sluzby.html">Služby</a><a href="cenik.html">Ceník</a></div>
    </footer>

    <div class="mobile-cta"><a href="tel:+420728505028"><i data-lucide="phone" aria-hidden="true"></i>Zavolat</a><a href="#poptavka"><i data-lucide="send" aria-hidden="true"></i>Získat cenu</a></div>
  </body>
</html>
'''

PAGES = [
    {
        "file": "zemni-prace.html",
        "service": "Zemní práce",
        "eyebrow": "Zemní práce",
        "title": "Zemní práce minibagrem a bagrem do 5 t | Praha a okolí",
        "desc": "Zemní práce pásovým minibagrem 2,5 t a bagrem 5 t: výkopy základů, bazénů a jezírek, rovnání terénu, odbahnění nádrží. 15 let praxe. Praha a Středočeský kraj.",
        "h1": "Zemní práce minibagrem a bagrem do 5 t",
        "lead": "Výkopy základů, bazénů a jezírek, rovnání terénu i odbahnění menších nádrží. Menší pásová technika projede tam, kam se velký stroj nedostane — ideální k rodinným domům a na zahrady. Zemní práce děláme 15 let.",
        "detail": [
            ("Naše technika", "Pásový minibagr 2,5 t na zahrady a užší vjezdy, pásový bagr 5 t na základy a větší výkopy, dumper 2 t na odvoz materiálu z míst, kam auto nezajede, a kloubový nakladač 5 t na rozhrnutí a nakládku."),
            ("Co děláme nejčastěji", "Výkopy základů pro rodinné domy a přístavby, stavební jámy pro bazény, zahradní a přírodní jezírka, rovnání terénu, odvoz hlíny ze zahrady a odbahnění menších vodních ploch."),
            ("Výhoda jedné party", "Výkop, odvoz zeminy kontejnerem i dovoz štěrku, recyklátu nebo nové zeminy domluvíte najednou. Nemusíte koordinovat bagristu, dopravce a materiál zvlášť."),
        ],
        "blocks": [
            ("Proč menší technika do 5 t", "K rodinnému domu, na zahradu nebo k návesní nádrži se velké stroje často vůbec nedostanou — nebo cestou rozjezdí všechno kolem. Pásová technika do 5 t je šetrnější k povrchům, projede užším vjezdem a přitom zvládne základy, bazény i jezírka."),
            ("Dumper 2 t: odvoz i z míst bez příjezdu", "Když se ke kopané jámě nedá zajet autem, hlínu a materiál převážíme pásovým dumperem na místo, kam už kontejner postavit jde. Stejně tak dopravíme štěrk nebo beton zadní částí pozemku ke stavbě."),
        ],
        "panel_h2": "Zemní práce pro rodinné domy, zahrady a menší nádrže",
        "panel_text": "Specializujeme se na zakázky, kde je výhodou menší technika: rodinné domy, zahrady, hůř přístupné pozemky a vesnické nádrže. Pro rychlé nacenění napište obec, co potřebujete vykopat nebo upravit, přibližné rozměry a pošlete fotku místa včetně vjezdu.",
        "bullets": [
            "pásový minibagr 2,5 t a pásový bagr 5 t, dumper 2 t, kloubový nakladač 5 t",
            "15 let praxe se zemními pracemi, reference a fotky realizací na vyžádání",
            "výkop spojíme s odvozem zeminy kontejnerem a dovozem materiálu",
            "fotka vjezdu a místa výkopu výrazně zrychlí nacenění",
        ],
        "links": [
            ("Výkop základů", "vykop-zakladu.html"), ("Výkop bazénu", "vykop-bazenu.html"),
            ("Zahradní jezírka", "vykop-jezirka.html"), ("Odbahnění nádrží", "odbahneni-rybniku.html"),
            ("Rovnání terénu", "rovnani-terenu.html"), ("Odvoz zeminy", "odvoz-zeminy.html"),
            ("Dovoz štěrku", "dovoz-sterku.html"),
        ],
        "faq_h2": "Často k zemním pracím",
        "faq": [
            ("Jak poznám, jestli stačí minibagr 2,5 t, nebo je potřeba bagr 5 t?",
             "To je naše starost. Napište, co se má kopat, přibližné rozměry a jak vypadá přístup na pozemek — podle toho doporučíme stroj. Minibagr projede užším vjezdem, pětituna má větší výkon i dosah."),
            ("Zvládnete i odvoz vykopané zeminy?",
             "Ano, to je naše hlavní výhoda. Zeminu odvezeme kontejnerem, a když se k výkopu nedá zajet, převeze ji dumper na místo, kde kontejner stát může."),
            ("Jezdíte i mimo Prahu-západ?",
             "Nejrychleji jsme ve Svárově, Unhošti a okolí, jezdíme po Praze i Středočeském kraji. U vzdálenějších míst rozhoduje rozsah zakázky — napište, co potřebujete."),
            ("Co poslat pro nacenění?",
             "Obec, co se má vykopat nebo upravit, přibližné rozměry, termín a fotku místa včetně vjezdu na pozemek. Ozveme se s cenou nebo doplňujícím dotazem."),
        ],
        "cta": "Plánujete výkop nebo úpravu pozemku?",
    },
    {
        "file": "vykop-zakladu.html",
        "service": "Výkop základů",
        "eyebrow": "Výkop základů",
        "title": "Výkop základů pro rodinný dům a přístavby | Kontejnerovka.cz",
        "desc": "Výkop základových pasů a desek pro rodinné domy, přístavby, garáže a ploty. Pásový bagr do 5 t, odvoz zeminy kontejnerem. Praha-západ, Kladno a okolí.",
        "h1": "Výkop základů pro rodinný dům, přístavbu i plot",
        "lead": "Základové pasy, desky a patky podle projektu — pro rodinné domy, přístavby, garáže, pergoly a ploty. Kopeme pásovým bagrem do 5 t, vykopanou zeminu rovnou odvezeme.",
        "detail": [
            ("Co kopeme", "Základové pasy a desky pro rodinné domy a přístavby, patky pro pergoly a garáže, rýhy pro ploty a přípojky, základy pro přírodní jezírka."),
            ("Podle projektu", "Hloubku a šířku základů určuje projekt a stavař — my kopeme přesně podle zadání a výšek. Na místě dáváme pozor na sítě a stávající konstrukce."),
            ("Zemina rovnou pryč", "Výkop základů znamená kubíky těžké zeminy. Odvezeme ji kontejnerem v rámci jedné zakázky, případně část necháme na pozdější zásypy."),
        ],
        "blocks": [
            ("Vjezd na pozemek rozhoduje o stroji", "Minibagr 2,5 t projede i užším vjezdem k zahradě, bagr 5 t potřebuje víc místa, ale výkop základů zvládne rychleji. Pošlete fotku vjezdu a napište jeho šířku — doporučíme vhodný stroj rovnou."),
            ("Základy a co dál", "Po výkopu umíme dovézt štěrk pod základovou desku nebo beton podle domluvy. Vše jedna parta — bagr, odvoz i materiál."),
        ],
        "panel_h2": "Výkop základů s odvozem zeminy v jedné zakázce",
        "panel_text": "Nejčastěji kopeme základy rodinných domů a přístaveb na Praze-západ a Kladensku. Pro nacenění pošlete projekt nebo rozměry základů (délka, šířka, hloubka), obec a fotku pozemku s vjezdem.",
        "bullets": [
            "základové pasy, desky i patky podle projektu",
            "minibagr 2,5 t pro užší vjezdy, bagr 5 t pro rychlejší výkop",
            "odvoz zeminy kontejnerem, dovoz štěrku pod desku",
            "15 let praxe se zemními pracemi",
        ],
        "links": [
            ("Zemní práce — přehled", "zemni-prace.html"), ("Odvoz zeminy", "odvoz-zeminy.html"),
            ("Kontejner na zeminu", "kontejner-na-zeminu.html"), ("Dovoz štěrku", "dovoz-sterku.html"),
            ("Výkop bazénu", "vykop-bazenu.html"),
        ],
        "faq_h2": "Často k výkopu základů",
        "faq": [
            ("Podle čeho se kope hloubka a šířka základů?",
             "Podle projektu a pokynů stavaře nebo statika. My zajistíme přesné provedení podle zadaných rozměrů a výšek."),
            ("Co s vykopanou zeminou?",
             "Odvezeme ji kontejnerem, nebo část necháme na pozemku na zásypy — podle toho, co dává u vaší stavby smysl. Řekněte nám to při poptávce."),
            ("Dostane se ke mně technika?",
             "Minibagr projede i užším vjezdem, bagr 5 t potřebuje víc prostoru. Pošlete fotku vjezdu a jeho šířku, doporučíme vhodný stroj."),
            ("Vykopete i rýhy pro přípojky?",
             "Ano, rýhy pro vodu, kanalizaci, elektřinu nebo drenáže kopeme běžně v rámci základů i samostatně."),
        ],
        "cta": "Chystáte základy domu nebo přístavby?",
    },
    {
        "file": "vykop-bazenu.html",
        "service": "Výkop bazénu",
        "eyebrow": "Výkop bazénu",
        "title": "Výkop bazénu — stavební jáma přesně podle bazénu | Praha a okolí",
        "desc": "Výkop stavební jámy pro bazén pásovým bagrem do 5 t včetně odvozu zeminy. Přesné dno podle pokynů dodavatele bazénu. Praha-západ, Kladno, Beroun a okolí.",
        "h1": "Výkop stavební jámy pro bazén",
        "lead": "Vykopeme jámu přesně podle rozměrů a pokynů dodavatele bazénu, srovnáme dno do roviny a těžkou zeminu rovnou odvezeme. I na zahradách, kam se velká technika nedostane.",
        "detail": [
            ("Jáma podle bazénu", "Kopeme podle podkladů od dodavatele bazénu — rozměry, manipulační prostor i hloubka včetně podsypu. Dno srovnáme podle výšek."),
            ("Zemina z bazénu je těžká", "Z bazénové jámy jsou to rychle desítky kubíků. Odvoz kontejnerem domluvíme rovnou s výkopem, ať hromada neleží na zahradě."),
            ("Zahrada bez příjezdu?", "Pokud k místu bazénu nezajede auto, zeminu od jámy převáží pásový dumper 2 t k místu, kde kontejner stát může. Trávník šetří pásy, ne kola."),
        ],
        "blocks": [
            ("Co potřebujeme vědět předem", "Rozměry bazénu a jámy (od dodavatele), obec, kudy se na pozemek dostaneme a kde může stát kontejner na zeminu. Fotka zahrady s vjezdem nacenění výrazně zrychlí."),
            ("Podsyp a obsyp v jedné domluvě", "Po výkopu dovezeme štěrk či písek na podsyp a obsyp bazénu podle pokynů dodavatele. Výkop, odvoz i materiál — jedna parta."),
        ],
        "panel_h2": "Výkop bazénu včetně odvozu zeminy a dovozu podsypu",
        "panel_text": "Bazénové jámy kopeme nejčastěji u rodinných domů na Praze-západ a Kladensku. Pošlete rozměry jámy od dodavatele bazénu, obec a fotku zahrady — ozveme se s cenou a možným termínem.",
        "bullets": [
            "jáma přesně podle podkladů dodavatele bazénu",
            "srovnané dno podle výšek, připravené na podsyp",
            "odvoz zeminy kontejnerem, u hůř přístupných zahrad dumperem",
            "dovoz štěrku a písku na podsyp i obsyp",
        ],
        "links": [
            ("Zemní práce — přehled", "zemni-prace.html"), ("Odvoz zeminy", "odvoz-zeminy.html"),
            ("Dovoz písku a štěrku", "dovoz-pisku-sterku.html"), ("Výkop jezírka", "vykop-jezirka.html"),
            ("Kontejner na zeminu", "kontejner-na-zeminu.html"),
        ],
        "faq_h2": "Často k výkopu bazénu",
        "faq": [
            ("Kolik zeminy z výkopu bazénu bude?",
             "Orientačně objem jámy zvětšený o nakypření — vykopaná zemina zabere zhruba o pětinu až třetinu víc místa, než měla v zemi. Proto se vyplatí domluvit odvoz rovnou s výkopem."),
            ("Zvládnete výkop i na zahradě bez příjezdu?",
             "Ano. Minibagr projede užším vjezdem a zeminu od jámy odveze pásový dumper na místo, kam jde postavit kontejner."),
            ("Srovnáte dno přesně?",
             "Ano, dno srovnáme podle výšek a pokynů dodavatele bazénu, aby sedl podsyp i usazení."),
        ],
        "cta": "Plánujete bazén na zahradě?",
    },
    {
        "file": "vykop-jezirka.html",
        "service": "Výkop jezírka",
        "eyebrow": "Výkop jezírka",
        "title": "Výkop zahradního a koupacího jezírka | Kontejnerovka.cz",
        "desc": "Výkop a tvarování zahradních jezírek i přírodních koupacích jezírek minibagrem. Terasy pro rostliny, odvoz zeminy, dovoz kačírku a kamene. Praha a okolí.",
        "h1": "Výkop zahradního jezírka i přírodního koupacího jezírka",
        "lead": "Vykopeme a vytvarujeme jezírko podle vašeho návrhu — od malého zahradního po přírodní koupací. Minibagr 2,5 t šetří zahradu, terasy a zóny pro rostliny tvarujeme rovnou při výkopu.",
        "detail": [
            ("Tvar podle návrhu", "Kopeme podle projektu nebo náčrtu: hloubkové zóny, terasy pro vodní rostliny, pozvolné vstupy i strmější stěny tam, kam patří."),
            ("Základy pro přírodní jezírka", "U koupacích jezírek vykopeme i základy pro zídky a techniku podle podkladů od dodavatele technologie."),
            ("Materiál na dokončení", "Po výkopu dovezeme kačírek, oblázky nebo kámen na lemy a vstupy. Zeminu z výkopu odvezeme, nebo ji použijeme na modelaci okolí."),
        ],
        "blocks": [
            ("Minibagr na zahradě", "Pásový minibagr 2,5 t projede užším vjezdem a na trávníku nadělá výrazně méně škody než velký stroj. Pro tvarování teras a zón je menší stroj přesnější volbou."),
            ("Fólii a technologii řeší váš dodavatel", "My připravíme přesný výkop a tvar podle jeho pokynů — vy tím získáte jistotu, že fólie i technologie sednou bez víceprací."),
        ],
        "panel_h2": "Výkop jezírka s odvozem zeminy a dovozem kameniva",
        "panel_text": "Jezírka kopeme na zahradách u rodinných domů po Praze-západ, Kladensku a okolí. Pošlete náčrt nebo rozměry, obec a fotku zahrady s vjezdem — doporučíme postup a ozveme se s cenou.",
        "bullets": [
            "zahradní jezírka, přírodní koupací jezírka i okrasné nádrže",
            "terasy a zóny pro rostliny tvarované rovnou při výkopu",
            "odvoz zeminy, nebo modelace okolí jezírka z výkopku",
            "dovoz kačírku, oblázků a kamene na dokončení",
        ],
        "links": [
            ("Zemní práce — přehled", "zemni-prace.html"), ("Dovoz kačírku", "dovoz-kacirku.html"),
            ("Odvoz zeminy", "odvoz-zeminy.html"), ("Odbahnění nádrží", "odbahneni-rybniku.html"),
            ("Rovnání terénu", "rovnani-terenu.html"),
        ],
        "faq_h2": "Často k výkopu jezírka",
        "faq": [
            ("Vykopete i větší koupací jezírko?",
             "Ano, přírodní koupací jezírka kopeme včetně základů pro zídky a technologii. Rozhoduje přístup na pozemek a rozsah — pošlete návrh a fotku zahrady."),
            ("Co se zeminou z výkopu?",
             "Buď ji odvezeme kontejnerem, nebo ji využijeme na modelaci terénu kolem jezírka — často se obojí kombinuje."),
            ("Dovezete i kačírek a kameny?",
             "Ano, kačírek, oblázky i kámen na lemy a vstupy dovezeme po výkopu v rámci jedné zakázky."),
            ("Pokládáte i fólii?",
             "Fólii a technologii řeší specializovaný dodavatel jezírka. My připravíme výkop přesně podle jeho pokynů, aby vše sedlo."),
        ],
        "cta": "Chcete jezírko na zahradě?",
    },
    {
        "file": "odbahneni-rybniku.html",
        "service": "Odbahnění nádrží",
        "eyebrow": "Odbahnění nádrží",
        "title": "Odbahnění menších rybníků a nádrží | Kamenné záhozy",
        "desc": "Odbahnění menších rybníků, návesních nádrží a jezírek technikou do 5 t. Kamenné záhozy, přelivové hrany, odvoz sedimentu. 15 let praxe. Střední Čechy.",
        "h1": "Odbahnění menších rybníků, návesních nádrží a jezírek",
        "lead": "Odbahníme menší vodní plochy, kde je výhodou šetrná technika do 5 t — návesní nádrže, požární nádrže, zahradní a přírodní jezírka. Včetně kamenných záhozů a přelivových hran. 15 let praxe.",
        "detail": [
            ("Pro menší vodní plochy", "Specializujeme se na nádrže a rybníčky, kam se velká technika nedostane nebo by poničila okolí. Pásový bagr do 5 t pracuje šetrně i na hrázi a podmáčeném terénu."),
            ("Kamenné záhozy a přelivy", "Provádíme kamenné záhozy břehů a hrází a stavbu přelivových hran. Kámen dovezeme v rámci zakázky."),
            ("Odvoz sedimentu", "Vytěžený sediment odvezeme. Dumper 2 t ho dopraví i z míst, kam se s kontejnerem nedá zajet."),
        ],
        "blocks": [
            ("Obce a spolky: návesní a požární nádrže", "Menší technika do 5 t je pro vesnické nádrže často jediná schůdná cesta — nezničí náves ani příjezdové cesty a zvládne pracovat v omezeném prostoru."),
            ("Co si ověřit předem", "U odbahnění většího rozsahu může hrát roli vodoprávní úřad a režim uložení sedimentu. Doporučíme, na co se zeptat — formální stránku si zajišťuje vlastník nádrže, my se postaráme o provedení."),
        ],
        "panel_h2": "Odbahnění s technikou do 5 t: šetrné k hrázi i okolí",
        "panel_text": "Odbahňujeme menší a střední vodní plochy po Středočeském kraji. Pro nacenění pošlete obec, přibližnou velikost plochy, fotky nádrže a příjezdu a informaci, zda lze nádrž vypustit.",
        "bullets": [
            "návesní, požární a soukromé nádrže, zahradní a přírodní jezírka",
            "kamenné záhozy břehů a přelivové hrany včetně dovozu kamene",
            "odvoz sedimentu, z hůř přístupných míst dumperem",
            "15 let praxe, reference z realizací na vyžádání",
        ],
        "links": [
            ("Zemní práce — přehled", "zemni-prace.html"), ("Výkop jezírka", "vykop-jezirka.html"),
            ("Odvoz zeminy", "odvoz-zeminy.html"), ("Rovnání terénu", "rovnani-terenu.html"),
        ],
        "faq_h2": "Často k odbahnění",
        "faq": [
            ("Jak velkou nádrž zvládnete?",
             "Menší a střední vodní plochy, kde stačí technika do 5 t — typicky návesní nádrže, požární nádrže a jezírka. Větší akce posoudíme podle místa, pošlete fotky a rozměry."),
            ("Potřebuji na odbahnění povolení?",
             "Záleží na rozsahu a na tom, jak se naloží se sedimentem. U větších akcí doporučujeme dotaz na vodoprávní úřad — poradíme, na co se zeptat, formální stránku zajišťuje vlastník."),
            ("Děláte i kamenné záhozy?",
             "Ano, kamenné záhozy břehů a hrází i přelivové hrany děláme včetně dovozu kamene."),
            ("Musí být nádrž vypuštěná?",
             "Ideálně ano — odbahnění se pak provádí rychleji a přesněji. Napište, jaké máte možnosti vypuštění, a domluvíme postup."),
        ],
        "cta": "Potřebujete odbahnit nádrž nebo jezírko?",
    },
    {
        "file": "rovnani-terenu.html",
        "service": "Rovnání terénu",
        "eyebrow": "Rovnání terénu",
        "title": "Rovnání terénu a úprava pozemku | Odvoz hlíny ze zahrady",
        "desc": "Rovnání a modelace terénu, úprava pozemku po stavbě, odvoz hlíny ze zahrady dumperem i z míst bez příjezdu. Nakladač 5 t, minibagr. Praha a okolí.",
        "h1": "Rovnání terénu, úprava pozemku a odvoz hlíny ze zahrady",
        "lead": "Srovnáme pozemek po stavbě, vymodelujeme zahradu, rozhrneme novou zeminu a přebytečnou hlínu odvezeme — dumperem i z míst, kam se autem nedá zajet.",
        "detail": [
            ("Rovnání a modelace", "Srovnání pozemku po stavbě, příprava plochy pro trávník, modelace terénu, svahování a úprava okolí domu minibagrem a kloubovým nakladačem 5 t."),
            ("Odvoz hlíny ze zahrady", "Přebytečnou hlínu naložíme a odvezeme. Ze zadních zahrad a míst bez příjezdu ji k kontejneru dopraví pásový dumper 2 t."),
            ("Nová zemina a substrát", "Dovezeme a rozhrneme novou zeminu, substrát nebo štěrk — na trávník, záhony i zpevněné plochy."),
        ],
        "blocks": [
            ("Po stavbě i u starší zahrady", "Typická zakázka: pozemek po stavbě plný nerovností, zbytků zeminy a kolejí od techniky. Srovnáme, odvezeme přebytky, navezeme čistou zeminu a připravíme plochu na trávník."),
            ("Kloubový nakladač 5 t", "Na rozhrnutí návozů, přemístění hromad a nakládku je nakladač výrazně rychlejší než ruční práce — a kloubové řízení šetří povrch při otáčení."),
        ],
        "panel_h2": "Úprava pozemku s odvozem i dovozem materiálu",
        "panel_text": "Rovnání terénu a úpravy zahrad děláme po Praze-západ, Kladensku a okolí. Pro nacenění pošlete obec, výměru plochy, co se má upravit a fotky pozemku včetně vjezdu.",
        "bullets": [
            "srovnání pozemku po stavbě a příprava na trávník",
            "modelace terénu a svahování minibagrem",
            "odvoz hlíny dumperem i ze zahrad bez příjezdu",
            "dovoz a rozhrnutí nové zeminy, substrátu nebo štěrku",
        ],
        "links": [
            ("Zemní práce — přehled", "zemni-prace.html"), ("Odvoz zeminy", "odvoz-zeminy.html"),
            ("Dovoz recyklátu", "dovoz-recyklatu.html"), ("Dovoz štěrku", "dovoz-sterku.html"),
            ("Výkop jezírka", "vykop-jezirka.html"),
        ],
        "faq_h2": "Často k rovnání terénu",
        "faq": [
            ("Odvezete hlínu i ze zadní části zahrady?",
             "Ano, právě na to máme pásový dumper 2 t. Hlínu převeze úzkým průjezdem k místu, kde může stát kontejner."),
            ("Dovezete i novou zeminu na trávník?",
             "Ano, dovezeme a rovnou rozhrneme zeminu, substrát nebo štěrk podle potřeby."),
            ("Srovnáte i svažitý pozemek?",
             "Ano, pásová technika pracuje i ve svahu. Pošlete fotky pozemku, ať posoudíme postup a bezpečnost."),
        ],
        "cta": "Chcete srovnat nebo upravit pozemek?",
    },
]

for p in PAGES:
    html = page_html(p)
    with open(p["file"], "w", encoding="utf-8") as f:
        f.write(html)
    print(f"OK {p['file']}")
print("HOTOVO")
