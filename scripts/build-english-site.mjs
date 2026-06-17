import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const enDir = path.join(rootDir, "en");
const baseUrl = "https://kontejnerovka.cz";
const todayDate = new Date().toISOString().slice(0, 10);
const phonePattern = "\\+?[0-9](?:[\\s.()\\-]?[0-9]){6,14}";
const phoneTitle = "Enter a phone number, for example +420 738 505 028 or +44 7700 900123.";

// lastmod per soubor: necommitnuté změny = dnešek, jinak datum posledního commitu
const fileLastmod = (relPath) => {
  try {
    const dirty = execSync(`git status --porcelain -- "${relPath}"`, { cwd: rootDir }).toString().trim();
    if (dirty) return todayDate;
    const committed = execSync(`git log -1 --format=%cs -- "${relPath}"`, { cwd: rootDir }).toString().trim();
    if (committed) return committed;
  } catch {
    // mimo git repo spadneme na dnešní datum
  }
  return todayDate;
};

const pairs = [
  { cz: "", en: "", priority: "1.0", changefreq: "weekly" },
  { cz: "sluzby.html", en: "services.html", priority: "0.9", changefreq: "weekly" },
  { cz: "cenik.html", en: "pricing.html", priority: "0.85", changefreq: "monthly" },
  { cz: "lokality.html", en: "areas.html", priority: "0.9", changefreq: "weekly" },
  { cz: "o-nas.html", en: "about.html", priority: "0.75", changefreq: "monthly", enNoindex: true },
  { cz: "reference.html", en: "references.html", priority: "0.75", changefreq: "monthly", enNoindex: true },
  { cz: "technika.html", en: "equipment.html", priority: "0.78", changefreq: "monthly", enNoindex: true },
  { cz: "kontakt.html", en: "contact.html", priority: "0.82", changefreq: "monthly" },
  { cz: "poradna.html", en: "guide.html", priority: "0.75", changefreq: "monthly" },
  { cz: "odvoz-suti-rekonstrukce-koupelny.html", en: "bathroom-renovation-rubble-removal.html", priority: "0.78", changefreq: "monthly", enNoindex: true },
  { cz: "kontejner-na-zeminu.html", en: "soil-container.html", priority: "0.78", changefreq: "monthly", enNoindex: true },
  { cz: "povoleni-kontejner-praha.html", en: "container-permit-prague.html", priority: "0.72", changefreq: "monthly" },
  { cz: "vyklizeni-odpad.html", en: "clearance-waste-removal.html", priority: "0.76", changefreq: "monthly", enNoindex: true },
  { cz: "recyklat-prijezdova-cesta.html", en: "recycled-aggregate-driveway.html", priority: "0.76", changefreq: "monthly", enNoindex: true },
  { cz: "dovoz-betonu.html", en: "concrete-delivery.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "dovoz-kacirku.html", en: "pebble-delivery.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "dovoz-pisku-sterku.html", en: "sand-gravel-delivery.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "dovoz-pisku.html", en: "sand-delivery.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "dovoz-recyklatu.html", en: "recycled-aggregate-delivery.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "dovoz-sterku.html", en: "gravel-delivery.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejner-na-stavebni-odpad.html", en: "construction-waste-container.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejner-na-sut.html", en: "rubble-container.html", priority: "0.8", changefreq: "monthly" },
  { cz: "kontejnery-beroun.html", en: "containers-beroun.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-hostivice.html", en: "containers-hostivice.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-kladno.html", en: "containers-kladno.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-praha-13.html", en: "containers-prague-13.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-praha-17.html", en: "containers-prague-17.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-praha-5.html", en: "containers-prague-5.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-praha-6.html", en: "containers-prague-6.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-praha-vychod.html", en: "containers-prague-east.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-praha-zapad.html", en: "containers-prague-west.html", priority: "0.8", changefreq: "monthly" },
  { cz: "kontejnery-praha.html", en: "containers-prague.html", priority: "0.8", changefreq: "monthly" },
  { cz: "kontejnery-rakovnik.html", en: "containers-rakovnik.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-rudna.html", en: "containers-rudna.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-nucice.html", en: "containers-nucice.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-slany.html", en: "containers-slany.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "kontejnery-unhost.html", en: "containers-unhost.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "odvoz-betonu.html", en: "concrete-removal.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "odvoz-dreva-bioodpadu.html", en: "wood-green-waste-removal.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "odvoz-odpadu.html", en: "waste-removal.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "odvoz-suti.html", en: "rubble-removal.html", priority: "0.8", changefreq: "monthly" },
  { cz: "odvoz-zeminy.html", en: "soil-removal.html", priority: "0.8", changefreq: "monthly" },
  { cz: "pristaveni-kontejneru.html", en: "container-delivery.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
  { cz: "velkoobjemovy-kontejner.html", en: "large-container.html", priority: "0.8", changefreq: "monthly", enNoindex: true },
];

const pairByCz = new Map(pairs.map((pair) => [pair.cz, pair]));
const pairByEn = new Map(pairs.map((pair) => [pair.en, pair]));

const areaNames = [
  "Prague",
  "Praha",
  "Central Bohemia",
  "Prague-West",
  "Prague-East",
  "Svárov",
  "Unhošť",
  "Nučice",
  "Rudná",
  "Hostivice",
  "Kladno",
  "Beroun",
  "Rakovník",
  "Hořovice",
  "Slaný",
  "Zdice",
  "Králův Dvůr",
];

const nav = [
  ["Services", "services.html"],
  ["Pricing", "pricing.html"],
  ["Areas", "areas.html"],
  ["References", "references.html"],
  ["Equipment", "equipment.html"],
  ["About", "about.html"],
  ["Guide", "guide.html"],
  ["Contact", "contact.html"],
];

const serviceLinks = [
  ["Container delivery", "pristaveni-kontejneru.html"],
  ["Rubble container", "kontejner-na-sut.html"],
  ["Construction waste container", "kontejner-na-stavebni-odpad.html"],
  ["Large container", "velkoobjemovy-kontejner.html"],
  ["Rubble removal", "odvoz-suti.html"],
  ["Soil removal", "odvoz-zeminy.html"],
  ["Waste removal", "odvoz-odpadu.html"],
  ["Wood and green waste", "odvoz-dreva-bioodpadu.html"],
  ["Concrete removal", "odvoz-betonu.html"],
  ["Sand delivery", "dovoz-pisku.html"],
  ["Gravel delivery", "dovoz-sterku.html"],
  ["Pea gravel delivery", "dovoz-kacirku.html"],
  ["Recycled aggregate", "dovoz-recyklatu.html"],
  ["Concrete delivery", "dovoz-betonu.html"],
];

const locationLinks = [
  ["Prague", "kontejnery-praha.html"],
  ["Prague 5", "kontejnery-praha-5.html"],
  ["Prague 6", "kontejnery-praha-6.html"],
  ["Prague 13", "kontejnery-praha-13.html"],
  ["Prague 17", "kontejnery-praha-17.html"],
  ["Prague-West", "kontejnery-praha-zapad.html"],
  ["Prague-East", "kontejnery-praha-vychod.html"],
  ["Unhošť and Svárov", "kontejnery-unhost.html"],
  ["Nučice", "kontejnery-nucice.html"],
  ["Rudná", "kontejnery-rudna.html"],
  ["Hostivice", "kontejnery-hostivice.html"],
  ["Kladno", "kontejnery-kladno.html"],
  ["Beroun", "kontejnery-beroun.html"],
  ["Slaný", "kontejnery-slany.html"],
  ["Rakovník", "kontejnery-rakovnik.html"],
];

const adviceLinks = [
  ["Bathroom renovation rubble removal", "odvoz-suti-rekonstrukce-koupelny.html"],
  ["Soil container from excavation work", "kontejner-na-zeminu.html"],
  ["Container permit in Prague", "povoleni-kontejner-praha.html"],
  ["Clearance waste removal", "vyklizeni-odpad.html"],
  ["Recycled aggregate for a driveway", "recyklat-prijezdova-cesta.html"],
];

const servicePages = [
  {
    cz: "pristaveni-kontejneru.html",
    eyebrow: "Container delivery",
    title: "Container delivery and collection in Prague and Central Bohemia",
    metaTitle: "Container Delivery Prague | Kontejnerovka.cz",
    description: "Waste container delivery and collection for rubble, soil, construction waste and materials in Prague, Prague-West, Unhošť, Nučice, Rudná and nearby areas.",
    intro: "We deliver the container to the agreed place, collect it after loading and handle the next step according to the load. Before dispatch we confirm the address, access, material, estimated amount, timing and price basis.",
    serviceType: "Container delivery and waste container hire",
    bestFor: ["Flat and house renovations", "Small construction sites", "Garden and land clearance", "One-off household or company clear-outs"],
    whatToSend: ["Exact town or address", "What will be loaded", "Estimated amount or photos", "Where the container can stand", "Preferred date and how long it should stay"],
    watch: "If the container stands on a street, pavement or another public area, a local permit may be needed. On private land the arrangement is usually simpler, but access still matters.",
    related: [["Rubble container", "kontejner-na-sut.html"], ["Pricing", "cenik.html"], ["Contact", "kontakt.html"]],
  },
  {
    cz: "kontejner-na-sut.html",
    eyebrow: "Rubble container",
    title: "Rubble container for renovation and demolition waste",
    metaTitle: "Rubble Container & Skip Hire Prague | Kontejnerovka.cz",
    description: "Rubble container hire for bricks, plaster, tiles, concrete and renovation debris. Prague, Prague-West, Unhošť, Nučice, Kladno and nearby areas.",
    intro: "A rubble container is suitable for clean construction rubble such as bricks, plaster, tiles and concrete. Clean sorting is important because mixed materials can change disposal rules and the final price.",
    serviceType: "Rubble container hire",
    bestFor: ["Bathroom and kitchen renovations", "Tiles, plaster, bricks and concrete", "Small demolition work", "Clean rubble from flats and houses"],
    whatToSend: ["Town or address", "Whether the rubble is clean or mixed", "Approximate volume or photo", "Access for the truck", "Whether the container will stand on private land or a public place"],
    watch: "Do not mix rubble with wood, insulation, plastics, paint, chemicals, asbestos or general waste without prior agreement.",
    related: [["Rubble removal", "odvoz-suti.html"], ["Bathroom renovation rubble", "odvoz-suti-rekonstrukce-koupelny.html"], ["Permit in Prague", "povoleni-kontejner-praha.html"]],
  },
  {
    cz: "kontejner-na-stavebni-odpad.html",
    eyebrow: "Construction waste",
    title: "Container for construction waste after renovation or building work",
    metaTitle: "Construction Waste Container Prague | Kontejnerovka.cz",
    description: "Container for construction waste, renovation debris and mixed building materials. Clear quote by address, composition, access and disposal requirements.",
    intro: "Construction waste is often more varied than clean rubble. We need to know what is in the load so the container, disposal route and price can be confirmed properly.",
    serviceType: "Construction waste container",
    bestFor: ["Renovation waste after flats and houses", "Mixed building debris by agreement", "Small sites with several material types", "Clear-outs linked to construction work"],
    whatToSend: ["Photos of the waste", "Main material types in the load", "Estimated volume", "Town, access and placement spot", "Any materials that may need special handling"],
    watch: "Hazardous waste, asbestos, oils, batteries, paint, chemicals, tyres and pressure vessels must be discussed before ordering.",
    related: [["Waste removal", "odvoz-odpadu.html"], ["Rubble container", "kontejner-na-sut.html"], ["Guide", "poradna.html"]],
  },
  {
    cz: "velkoobjemovy-kontejner.html",
    eyebrow: "Large container",
    title: "Large container for bulky waste, wood and clear-outs",
    metaTitle: "Large Container Hire Prague | Kontejnerovka.cz",
    description: "Large container hire for bulky waste, garden waste, wood and larger clear-outs. Quote by material, volume, access and route.",
    intro: "A larger container can help when the load is bulky rather than very heavy. For heavy rubble, concrete and soil, safe weight usually matters more than maximum volume.",
    serviceType: "Large waste container",
    bestFor: ["Bulky waste from clear-outs", "Wood, branches and green waste", "Larger garden or property clean-ups", "Loads where volume is the main issue"],
    whatToSend: ["Type of material", "Estimated volume or photos", "Whether the load is heavy or light", "Access and placement spot", "Preferred loading or collection date"],
    watch: "Large does not automatically mean better for heavy materials. Rubble, concrete and soil must stay within a safe weight.",
    related: [["Waste removal", "odvoz-odpadu.html"], ["Wood and green waste", "odvoz-dreva-bioodpadu.html"], ["Equipment", "technika.html"]],
  },
  {
    cz: "odvoz-suti.html",
    eyebrow: "Rubble removal",
    title: "Rubble removal from renovations, flats and small construction sites",
    metaTitle: "Rubble Removal Prague | Kontejnerovka.cz",
    description: "Rubble removal for bricks, plaster, tiles, concrete and clean renovation debris in Prague, Prague-West, Unhošť, Nučice, Kladno and Central Bohemia.",
    intro: "We remove rubble from renovation and demolition work after confirming the address, amount, access and composition of the load. A clear photo often makes quoting much faster.",
    serviceType: "Rubble removal",
    bestFor: ["Bathroom and kitchen renovations", "Removed tiles and plaster", "Bricks, concrete and clean debris", "One-off renovation rubble"],
    whatToSend: ["Where the rubble is", "Whether it is clean or mixed", "Estimated amount or photo", "Whether loading help is needed", "Access for the container truck"],
    watch: "Clean rubble is different from mixed construction waste. If there is insulation, wood, plastics or other material in the pile, say it before the quote.",
    related: [["Rubble container", "kontejner-na-sut.html"], ["Pricing", "cenik.html"], ["Bathroom renovation rubble", "odvoz-suti-rekonstrukce-koupelny.html"]],
  },
  {
    cz: "odvoz-zeminy.html",
    eyebrow: "Soil removal",
    title: "Soil removal from excavation, gardens and land works",
    metaTitle: "Soil Removal Prague and Central Bohemia | Kontejnerovka.cz",
    description: "Removal of soil and excavation material from Prague, Prague-West, Nučice, Rudná, Unhošť and nearby areas. Quote by weight, access, moisture and route.",
    intro: "Soil is heavy, especially when wet. We confirm the amount, access and possible impurities before agreeing the container and route.",
    serviceType: "Soil and excavation material removal",
    bestFor: ["Excavation around houses", "Garden and landscaping work", "Foundation and drainage preparation", "Combining soil removal with aggregate delivery"],
    whatToSend: ["Photo of the pile or excavation", "Whether the soil contains stones, roots or rubble", "Estimated cubic metres or tonnes", "Loading and access conditions", "Whether material delivery is also needed"],
    watch: "Do not mix soil with rubble, wood or green waste without agreement. Mixed loads can change the disposal route and price.",
    related: [["Soil container", "kontejner-na-zeminu.html"], ["Recycled aggregate delivery", "dovoz-recyklatu.html"], ["Gravel delivery", "dovoz-sterku.html"]],
  },
  {
    cz: "odvoz-odpadu.html",
    eyebrow: "Waste removal",
    title: "Waste removal for clear-outs, renovation waste and bulky loads",
    metaTitle: "Waste Removal Prague | Kontejnerovka.cz",
    description: "Waste removal for clear-outs, bulky waste and renovation waste by agreement. Prague, Prague-West, Kladno, Hostivice, Beroun and Central Bohemia.",
    intro: "Mixed waste needs a clear description before quoting. Tell us what is in the load, where it is and how the truck can access the place.",
    serviceType: "Waste removal",
    bestFor: ["House, garage and cellar clear-outs", "Bulky waste by agreement", "Renovation waste that is not clean rubble", "One-off clean-up jobs"],
    whatToSend: ["Photos of the waste", "Main material types", "Estimated amount", "Town and access", "Any items that may need special handling"],
    watch: "Hazardous waste, asbestos, chemicals, paint, oils, batteries, electronics and tyres must be discussed before collection.",
    related: [["Clearance waste removal", "vyklizeni-odpad.html"], ["Construction waste container", "kontejner-na-stavebni-odpad.html"], ["Contact", "kontakt.html"]],
  },
  {
    cz: "odvoz-dreva-bioodpadu.html",
    eyebrow: "Wood and green waste",
    title: "Wood, branches and green waste removal",
    metaTitle: "Wood and Green Waste Removal | Kontejnerovka.cz",
    description: "Removal of wood, branches, garden waste and green waste by container in Prague-West, Unhošť, Nučice, Rudná, Hostivice, Kladno and nearby areas.",
    intro: "We help with seasonal garden clean-ups, branches, wood and green waste. The quote depends on volume, access and whether the material is clean or mixed with other waste.",
    serviceType: "Wood and green waste removal",
    bestFor: ["Branches and garden cuttings", "Seasonal plot clean-ups", "Wood waste by agreement", "Light bulky material where volume matters"],
    whatToSend: ["Photo of the pile", "Whether it is clean green waste or mixed material", "Estimated volume", "Access and placement spot", "Preferred date"],
    watch: "If plastics, metal, soil, rubble or other waste are mixed in, say it before the quote.",
    related: [["Large container", "velkoobjemovy-kontejner.html"], ["Waste removal", "odvoz-odpadu.html"], ["Areas", "lokality.html"]],
  },
  {
    cz: "odvoz-betonu.html",
    eyebrow: "Concrete removal",
    title: "Concrete removal from demolition and renovation work",
    metaTitle: "Concrete Removal Prague | Kontejnerovka.cz",
    description: "Concrete removal by container for demolition pieces, slabs and renovation debris. Quote by weight, access, loading conditions and route.",
    intro: "Concrete is heavy and must be quoted with weight and access in mind. A photo helps confirm whether the load is concrete only or mixed with other materials.",
    serviceType: "Concrete removal",
    bestFor: ["Broken concrete pieces", "Small demolition work", "Old paths, slabs and foundations", "Clean recyclable concrete by agreement"],
    whatToSend: ["Photo and approximate amount", "Whether reinforcement or other materials are present", "Access for loading", "Town and exact place", "Preferred date"],
    watch: "Concrete mixed with soil, wood, insulation or general waste may require a different disposal route.",
    related: [["Rubble removal", "odvoz-suti.html"], ["Rubble container", "kontejner-na-sut.html"], ["Pricing", "cenik.html"]],
  },
  {
    cz: "dovoz-pisku.html",
    eyebrow: "Sand delivery",
    title: "Sand delivery for building work, paving and backfilling",
    metaTitle: "Sand Delivery Prague and Central Bohemia | Kontejnerovka.cz",
    description: "Sand delivery for construction, paving, backfilling and garden work in Prague, Prague-West, Kladno, Beroun and nearby Central Bohemia.",
    intro: "We deliver sand according to the required use, amount and place of unloading. Tell us what the sand is for so the right material can be discussed.",
    serviceType: "Sand delivery",
    bestFor: ["Paving preparation", "Backfilling and levelling", "Small construction work", "Gardens and house projects"],
    whatToSend: ["Required amount", "Purpose of the sand", "Town and unloading point", "Access for the truck", "Preferred delivery date"],
    watch: "For accurate delivery, confirm where the material can be safely tipped and whether access is firm enough.",
    related: [["Sand and gravel delivery", "dovoz-pisku-sterku.html"], ["Gravel delivery", "dovoz-sterku.html"], ["Contact", "kontakt.html"]],
  },
  {
    cz: "dovoz-sterku.html",
    eyebrow: "Gravel delivery",
    title: "Gravel delivery for drainage, bases and construction work",
    metaTitle: "Gravel Delivery Prague-West | Kontejnerovka.cz",
    description: "Gravel delivery for drainage, base layers, paths and construction work around Prague, Unhošť, Nučice, Rudná, Kladno and Central Bohemia.",
    intro: "Gravel delivery depends on fraction, quantity and the place where the material can be tipped. If you are unsure about the fraction, describe the use and we will discuss the practical option.",
    serviceType: "Gravel delivery",
    bestFor: ["Drainage and base layers", "Paths and access roads", "Construction and garden work", "Combining removal with material delivery"],
    whatToSend: ["Required fraction if known", "Estimated tonnes or cubic metres", "Use of the material", "Unloading point and access", "Delivery date"],
    watch: "The unloading place must be safe for the truck. A photo is useful for narrow driveways, soft ground or sloped access.",
    related: [["Recycled aggregate", "dovoz-recyklatu.html"], ["Pea gravel", "dovoz-kacirku.html"], ["Recycled aggregate driveway", "recyklat-prijezdova-cesta.html"]],
  },
  {
    cz: "dovoz-kacirku.html",
    eyebrow: "Pea gravel delivery",
    title: "Pea gravel and decorative gravel delivery",
    metaTitle: "Pea Gravel Delivery Prague-West | Kontejnerovka.cz",
    description: "Pea gravel and decorative gravel delivery for gardens, paths, drainage and landscaping in Prague-West, Kladno, Beroun and nearby areas.",
    intro: "Pea gravel is often used for gardens, paths, drainage and decorative surfaces. The quote depends on amount, fraction, availability and access to the unloading place.",
    serviceType: "Pea gravel delivery",
    bestFor: ["Garden paths and decorative areas", "Drainage layers", "Courtyards and landscaping", "Small residential projects"],
    whatToSend: ["Approximate amount", "Purpose and preferred fraction", "Town and unloading point", "Access conditions", "Preferred delivery date"],
    watch: "If the material needs to be tipped in a tight or shared space, send a photo before delivery.",
    related: [["Gravel delivery", "dovoz-sterku.html"], ["Sand and gravel delivery", "dovoz-pisku-sterku.html"], ["Areas", "lokality.html"]],
  },
  {
    cz: "dovoz-pisku-sterku.html",
    eyebrow: "Sand and gravel",
    title: "Sand and gravel delivery for construction, gardens and paths",
    metaTitle: "Sand and Gravel Delivery Prague | Kontejnerovka.cz",
    description: "Sand, gravel and aggregate delivery in Prague, Prague-West and Central Bohemia. Quote by amount, fraction, access and delivery route.",
    intro: "We deliver bulk materials for construction, landscaping, paths, drainage and backfilling. Tell us the intended use, amount and unloading point.",
    serviceType: "Sand and gravel delivery",
    bestFor: ["Backfilling and levelling", "Paving and base layers", "Drainage and landscaping", "Driveways and small construction sites"],
    whatToSend: ["Material type or intended use", "Approximate amount", "Town and access", "Where the load can be tipped", "Preferred delivery time"],
    watch: "Material availability and route affect the final quote. We confirm the price before dispatch.",
    related: [["Sand delivery", "dovoz-pisku.html"], ["Gravel delivery", "dovoz-sterku.html"], ["Recycled aggregate", "dovoz-recyklatu.html"]],
  },
  {
    cz: "dovoz-recyklatu.html",
    eyebrow: "Recycled aggregate",
    title: "Recycled aggregate delivery for bases, yards and access roads",
    metaTitle: "Recycled Aggregate Delivery | Kontejnerovka.cz",
    description: "Recycled aggregate delivery for driveways, base layers, yards and construction work around Prague, Nučice, Rudná, Unhošť, Kladno and Beroun.",
    intro: "Recycled aggregate can be a practical material for base layers, temporary access roads and paved areas. The right fraction and amount depend on the use.",
    serviceType: "Recycled aggregate delivery",
    bestFor: ["Driveway and yard bases", "Temporary access roads", "Base layers under further work", "Combining soil removal with material delivery"],
    whatToSend: ["What the material will be used for", "Required fraction if known", "Approximate amount", "Unloading point and access", "Whether soil or rubble is also being removed"],
    watch: "For driveways and yards, describe the final surface and traffic load. It helps choose a sensible material route.",
    related: [["Recycled aggregate driveway", "recyklat-prijezdova-cesta.html"], ["Soil removal", "odvoz-zeminy.html"], ["Gravel delivery", "dovoz-sterku.html"]],
  },
  {
    cz: "dovoz-betonu.html",
    eyebrow: "Concrete delivery",
    title: "Concrete delivery by agreement for smaller construction jobs",
    metaTitle: "Concrete Delivery Prague and Central Bohemia | Kontejnerovka.cz",
    description: "Concrete delivery by agreement for smaller construction jobs around Prague and Central Bohemia. Quote by location, amount, access and availability.",
    intro: "Concrete delivery is arranged according to the exact job, amount, route and access. Send the address, required volume and what the concrete is for.",
    serviceType: "Concrete delivery",
    bestFor: ["Small building jobs by agreement", "Foundations and repairs where access is suitable", "Projects combined with removal or aggregate delivery", "Jobs that need a confirmed route and timing"],
    whatToSend: ["Required amount", "Purpose of the concrete", "Town and unloading point", "Access and time window", "Whether removal or other material delivery is part of the job"],
    watch: "Concrete timing and access matter. The quote must be confirmed for the specific job before dispatch.",
    related: [["Sand and gravel delivery", "dovoz-pisku-sterku.html"], ["Concrete removal", "odvoz-betonu.html"], ["Contact", "kontakt.html"]],
  },
];

const advicePages = [
  {
    cz: "odvoz-suti-rekonstrukce-koupelny.html",
    eyebrow: "Renovation guide",
    title: "Rubble removal after a bathroom renovation",
    metaTitle: "Bathroom Renovation Rubble Removal | Kontejnerovka.cz",
    description: "Practical guide to ordering a container for bathroom renovation rubble in Prague and Central Bohemia: sorting, photos, permits and quote details.",
    intro: "Bathroom renovations usually create heavy but manageable rubble: tiles, plaster, bricks, concrete and sanitary ceramics. The quote is clearer when the load is described honestly and not mixed with unrelated waste.",
    problem: "The biggest price difference is usually between clean rubble and a mixed renovation load. A pile that includes wood, plastics, insulation, packaging, paint or old fittings may need a different disposal route.",
    steps: ["Send the address and Prague district or town.", "Describe whether the rubble is clean or mixed.", "Add a photo of the pile and the access point.", "Say whether the container can stand on private land or in the street.", "Confirm the preferred date and how long the container should stay."],
    faq: [
      ["Can bathroom rubble go into one container?", "Clean tiles, plaster, bricks and concrete can usually be discussed as rubble. Other materials should be described before ordering."],
      ["Do I need a permit in Prague?", "If the container stands on a street, pavement or another public place, the relevant district rules may apply."],
    ],
    related: [["Rubble container", "kontejner-na-sut.html"], ["Permit in Prague", "povoleni-kontejner-praha.html"], ["Pricing", "cenik.html"]],
  },
  {
    cz: "kontejner-na-zeminu.html",
    eyebrow: "Soil guide",
    title: "Container for soil from excavation work",
    metaTitle: "Soil Container Prague and Central Bohemia | Kontejnerovka.cz",
    description: "How to order a container for soil from excavation work. Practical notes on weight, moisture, access, mixing and combining removal with aggregate delivery.",
    intro: "Soil is often heavier than it looks, especially after rain. The right container and route depend on the amount, moisture, impurities and access to the excavation or pile.",
    problem: "Soil mixed with rubble, roots, stone, wood or green waste can change the disposal route. A photo helps avoid a wrong estimate.",
    steps: ["Estimate the amount in cubic metres or send a clear photo.", "Say whether the soil is wet, stony or mixed.", "Describe where the truck can stand and how loading will work.", "Mention whether recycled aggregate, gravel or sand should be delivered afterwards.", "Confirm the location and date."],
    faq: [
      ["Why is soil quoted carefully?", "Weight is the key factor. Wet soil can be much heavier than the same visible volume of dry material."],
      ["Can removal and delivery be combined?", "Often yes. Soil removal and recycled aggregate or gravel delivery can be planned together when the route and timing fit."],
    ],
    related: [["Soil removal", "odvoz-zeminy.html"], ["Recycled aggregate delivery", "dovoz-recyklatu.html"], ["Gravel delivery", "dovoz-sterku.html"]],
  },
  {
    cz: "povoleni-kontejner-praha.html",
    eyebrow: "Street placement",
    title: "Container permit in Prague: what to check before street placement",
    metaTitle: "Container Permit Prague | Kontejnerovka.cz",
    description: "Practical information for placing a waste container on a street, pavement or public area in Prague and Czech towns. Check district rules before ordering.",
    intro: "When a container stands on private land, the arrangement is usually simpler. When it stands on a street, pavement or another public area, local occupation rules may apply.",
    problem: "Permit requirements differ by municipality and, in Prague, by city district. The website should help customers ask the right questions without pretending every case is the same.",
    steps: ["Check whether the container can stand on your own land.", "If it must stand in the street, contact the relevant municipality or Prague district.", "Confirm dates, exact place and possible traffic restrictions.", "Send a photo of the planned placement spot.", "Tell us what the authority requires before dispatch."],
    faq: [
      ["Does every street placement need a permit?", "Not every situation is identical. Public space rules depend on the municipality or city district."],
      ["Can you quote before the permit is ready?", "We can discuss the job, but final timing may depend on the allowed placement spot and date."],
    ],
    related: [["Container delivery", "pristaveni-kontejneru.html"], ["Rubble container", "kontejner-na-sut.html"], ["Prague containers", "kontejnery-praha.html"]],
  },
  {
    cz: "vyklizeni-odpad.html",
    eyebrow: "Clearance waste",
    title: "Waste removal after house, garage or cellar clearance",
    metaTitle: "Clearance Waste Removal Prague | Kontejnerovka.cz",
    description: "Container-based waste removal after house, garage, cellar and garden clearance. Quote by material mix, amount, access and disposal route.",
    intro: "Clearance jobs can include bulky items, wood, old furniture, garden waste and mixed materials. The more clearly the waste is described, the more reliable the quote will be.",
    problem: "A clearance load may contain materials that cannot be treated like ordinary construction waste. Hazardous items must be discussed in advance.",
    steps: ["Send photos from several angles.", "List the main materials in the load.", "Mention any electronics, tyres, paint, oils, batteries or chemicals.", "Describe the access and where the container can stand.", "Confirm whether loading help is needed."],
    faq: [
      ["Can everything from a clearance go in one container?", "Not automatically. Mixed loads are possible only by agreement and hazardous items must be separated."],
      ["What helps the quote most?", "Photos, location, approximate volume and a clear note about unusual or hazardous items."],
    ],
    related: [["Waste removal", "odvoz-odpadu.html"], ["Large container", "velkoobjemovy-kontejner.html"], ["Contact", "kontakt.html"]],
  },
  {
    cz: "recyklat-prijezdova-cesta.html",
    eyebrow: "Driveway material",
    title: "Recycled aggregate for a driveway or yard base",
    metaTitle: "Recycled Aggregate for Driveways | Kontejnerovka.cz",
    description: "Practical guide to ordering recycled aggregate for driveways, yards and base layers. Delivery around Prague, Nučice, Rudná, Unhošť, Kladno and Beroun.",
    intro: "Recycled aggregate is often used for base layers, yards and access roads. To quote sensibly, we need the purpose, amount, access and whether any material should be removed first.",
    problem: "A driveway base is different from a decorative final surface. The required fraction and amount depend on the existing ground, planned finish and traffic load.",
    steps: ["Describe the area and intended use.", "Send a photo of the current surface and access.", "Estimate the required amount or dimensions.", "Say whether soil or rubble should be removed first.", "Confirm where the material can be tipped safely."],
    faq: [
      ["Can removal and delivery be handled together?", "Often yes, especially for excavation, drainage and driveway preparation."],
      ["Do I need to know the exact fraction?", "If you are unsure, describe the use and current surface. The material can then be discussed before quoting."],
    ],
    related: [["Recycled aggregate delivery", "dovoz-recyklatu.html"], ["Soil removal", "odvoz-zeminy.html"], ["Gravel delivery", "dovoz-sterku.html"]],
  },
];

const locationPages = [
  { cz: "kontejnery-praha.html", name: "Prague", local: "Prague (Praha)", nearby: "Prague 5, Prague 6, Prague 13, Prague 17 and other districts", focus: "flat renovations, rubble removal, clearance waste, soil removal and material delivery", note: "In Prague, access and street placement often decide the practical route. If the container will stand on a street or pavement, check the district rules before ordering." },
  { cz: "kontejnery-praha-5.html", name: "Prague 5", local: "Smíchov, Košíře, Motol, Jinonice, Radlice, Hlubočepy and nearby Prague 5 streets", nearby: "Prague 13 / Stodůlky, Prague 17 / Zličín, Prague-West, Rudná, Nučice and Hostivice", focus: "rubble containers, bathroom renovation waste, garden work and deliveries of sand, gravel or recycled aggregate", note: "For Prague 5, tell us whether the container can stand in a yard, on a building site or in the street. If you mean Stodůlky or Zličín, the exact address or map pin helps assign the right Prague district." },
  { cz: "kontejnery-praha-6.html", name: "Prague 6", local: "Ruzyně, Břevnov, Dejvice, Veleslavín and nearby districts", nearby: "Hostivice, Jeneč, Unhošť and Prague-West", focus: "renovation rubble, bulky waste, garden waste and material delivery", note: "Access, parked cars and public street placement are often the main points to clarify in Prague 6." },
  { cz: "kontejnery-praha-13.html", name: "Prague 13", local: "Stodůlky, Luka, Lužiny and surrounding areas", nearby: "Prague 5, Prague 17 / Zličín, Rudná and Nučice", focus: "flat renovation rubble, construction waste, soil removal and delivery of bulk materials", note: "A photo of the placement spot helps quickly check access in residential streets and courtyards." },
  { cz: "kontejnery-praha-17.html", name: "Prague 17", local: "Řepy, Zličín and the western edge of Prague", nearby: "Hostivice, Jeneč, Prague 6 and Prague-West", focus: "renovations, garden waste, bulky waste and smaller construction jobs", note: "When the container must stand in a public area, confirm the local rules and exact place first." },
  { cz: "kontejnery-praha-zapad.html", name: "Prague-West", local: "Prague-West, including Unhošť, Hostivice, Rudná, Nučice, Jeneč, Chýně and nearby villages", nearby: "Svárov, Červený Újezd, Ptice, Tachlovice and Loděnice", focus: "rubble, soil, garden waste, recycled aggregate and gravel delivery", note: "This is one of the most practical areas for planning routes between Prague, Kladno and Beroun." },
  { cz: "kontejnery-praha-vychod.html", name: "Prague-East", local: "Prague-East by individual route", nearby: "Prague, Central Bohemia and surrounding municipalities", focus: "container delivery, waste removal and bulk material delivery by agreement", note: "For Prague-East, an exact address and photo of access are especially useful because the route and disposal point can vary." },
  { cz: "kontejnery-unhost.html", name: "Unhošť and Svárov", local: "Unhošť, Svárov, Nouzov, Červený Újezd, Ptice, Pavlov, Kyšice, Malé and Velké Přítočno, Chyňava including Podkozí, Jeneč, Chýně and nearby villages", nearby: "Kladno, Rudná, Nučice and Prague-West", focus: "rubble removal, soil removal, garden waste and recycled aggregate delivery", note: "Svárov and Unhošť are among the closest service areas, which helps with practical route planning and quick communication." },
  { cz: "kontejnery-nucice.html", name: "Nučice", local: "Nučice, Rudná, Tachlovice, Mezouň, Vysoký Újezd, Dobříč, Chýnice, Loděnice and Chrustenice", nearby: "Drahelčice, Úhonice, Chýně, Jinočany, Zbuzany, Ořech, Choteč and Třebotov", focus: "soil from excavation, rubble removal, recycled aggregate and gravel for driveways", note: "Around Nučice, customers often combine soil removal with recycled aggregate or gravel delivery for the next stage of the work." },
  { cz: "kontejnery-rudna.html", name: "Rudná", local: "Rudná, Nučice, Chrášťany, Drahelčice, Chýně, Tachlovice and Úhonice", nearby: "Prague-West, Hostivice, Loděnice and Beroun direction", focus: "soil, rubble, construction waste and material delivery", note: "In Rudná and nearby villages, access to houses, gardens and driveways is usually the key detail for quoting." },
  { cz: "kontejnery-hostivice.html", name: "Hostivice", local: "Hostivice, Jeneč, Dobrovíz, Chýně and the area around Prague airport", nearby: "Prague 5, Prague 6, Unhošť and Prague-West", focus: "waste removal for homes and businesses, rubble containers and material delivery", note: "Hostivice is practical for routes between Prague, Unhošť and Kladno. Tell us if the job is near a narrow street, yard or business site." },
  { cz: "kontejnery-kladno.html", name: "Kladno", local: "Kladno, Unhošť, Braškov, Velká Dobrá, Kyšice, Doksy and nearby towns", nearby: "Svárov, Prague-West and Slaný direction", focus: "construction waste, rubble, soil, wood, green waste and delivery of aggregates", note: "For Kladno and nearby towns, the quote depends on the exact route, amount, access and disposal or material source." },
  { cz: "kontejnery-beroun.html", name: "Beroun", local: "Beroun, Loděnice, Vráž, Bubovice, Chyňava and surrounding municipalities", nearby: "Králův Dvůr, Zdice, Loděnice, Chrustenice and Rudná direction", focus: "soil removal, rubble removal, recycled aggregate, gravel and sand delivery", note: "Around Beroun it often makes sense to combine removal with delivery of material for base layers, paths or landscaping." },
  { cz: "kontejnery-slany.html", name: "Slaný", local: "Slaný and nearby towns", nearby: "Kladno, Velvary direction and Central Bohemia routes by agreement", focus: "rubble, soil, wood, green waste and delivery of bulk materials", note: "For Slaný, exact address and amount are important because the route is a major part of the quote." },
  { cz: "kontejnery-rakovnik.html", name: "Rakovník", local: "Rakovník and surrounding areas by route", nearby: "Kladno direction, Beroun direction and Central Bohemia routes by agreement", focus: "waste containers, soil removal, rubble and material delivery", note: "For more distant locations such as Rakovník, send the exact address, photos and amount so the route can be planned properly." },
];

const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const czPath = (slug) => (slug ? `/${slug}` : "/");
const enPath = (slug) => (slug ? `/en/${slug}` : "/en/");
const czUrl = (slug) => `${baseUrl}${czPath(slug)}`;
const enUrl = (slug) => `${baseUrl}${enPath(slug)}`;
const hrefForCz = (czSlug) => pairByCz.get(czSlug)?.en || "#";
const currentPairForEn = (slug) => pairByEn.get(slug);

const jsonScript = (data) => `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;

const businessId = `${baseUrl}/#localbusiness`;
const websiteId = `${baseUrl}/#website`;

const provider = {
  "@id": businessId,
  "@type": "LocalBusiness",
  name: "Kontejnerovka.cz",
  legalName: "Matyáš Mašín",
  url: `${baseUrl}/`,
  telephone: "+420738505028",
  email: "info@kontejnerovka.cz",
  taxID: "01379178",
  vatID: "CZ9211070033",
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
  sameAs: ["https://share.google/3gRahFm7A2awhEeJJ"],
  hasMap: "https://share.google/3gRahFm7A2awhEeJJ",
};

const providerRef = { "@id": businessId };

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: "Kontejnerovka.cz",
  url: `${baseUrl}/`,
  publisher: providerRef,
  inLanguage: ["cs", "en"],
};

const localBusinessSchema = (language = "en") => ({
  "@context": "https://schema.org",
  ...provider,
  image: `${baseUrl}/assets/og-kontejnerovka.png`,
  priceRange: language === "en" ? "Quoted by location, material, access and route" : "Dle lokality, materiálu, přístupu a trasy",
  areaServed: areaNames,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+420738505028",
    email: "info@kontejnerovka.cz",
    contactType: "customer service",
    areaServed: "CZ",
    availableLanguage: ["en", "cs"],
  },
});

const breadcrumb = (page) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: enUrl("") },
    { "@type": "ListItem", position: 2, name: page.breadcrumb || page.title, item: enUrl(page.en) },
  ],
});

const serviceSchema = (page) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${enUrl(page.en)}#service`,
  name: page.serviceType || page.title,
  description: page.description,
  provider: providerRef,
  areaServed: areaNames,
  url: enUrl(page.en),
});

const faqSchema = (page) =>
  page.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }
    : null;

const head = (page) => {
  const canonical = enUrl(page.en);
  const pair = currentPairForEn(page.en);
  const alternates = pair && !pair.enNoindex
    ? `
    <link rel="alternate" hreflang="cs" href="${czUrl(pair.cz)}">
    <link rel="alternate" hreflang="en" href="${enUrl(pair.en)}">
    <link rel="alternate" hreflang="x-default" href="${czUrl(pair.cz)}">`
    : "";
  const noscript = page.hasForm
    ? `
    <noscript><style>.inquiry-form .form-step[hidden],.inquiry-form [data-submit][hidden]{display:block!important}.inquiry-form [data-next],.inquiry-form [data-prev],.inquiry-form .form-progress{display:none!important}</style></noscript>`
    : "";
  const schema = (page.schema || []).filter(Boolean).map(jsonScript).join("\n    ");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">${noscript}
    <title>${esc(page.metaTitle || page.title)}</title>
    <meta name="description" content="${esc(page.description)}">
    <meta name="robots" content="${page.noindex || pair?.enNoindex ? "noindex, follow" : "index, follow"}">
    <link rel="canonical" href="${canonical}">${alternates}
    <meta property="og:title" content="${esc(page.ogTitle || page.metaTitle || page.title)}">
    <meta property="og:description" content="${esc(page.description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${baseUrl}/assets/og-kontejnerovka.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${baseUrl}/assets/og-kontejnerovka.png">
    <meta name="theme-color" content="#0b0f0d">
    <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="../assets/apple-touch-icon.png">
    <link rel="manifest" href="../site.webmanifest">
    <link rel="stylesheet" href="../styles.css?v=20260617d">
    <script src="../script.js?v=20260612c" defer></script>
    ${schema}
  </head>`;
};

const header = (page, home = false) => {
  const pair = currentPairForEn(page.en);
  const czHref = page.cz ? czPath(page.cz) : pair ? czPath(pair.cz) : "/";
  const enHref = enPath(page.en);
  return `<header class="site-header${home ? "" : " is-scrolled"}" data-header>
      <a class="brand" href="/en/"><span class="brand-mark">K</span><span><strong>Kontejnerovka.cz</strong><small>Prague and Central Bohemia</small></span></a>
      <nav class="site-nav" id="site-nav" data-nav>
        ${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
      </nav>
      <div class="header-actions">
        <div class="language-switcher" aria-label="Website language"><a href="${czHref}" hreflang="cs" lang="cs">CZ</a><a class="is-active" href="${enHref}" lang="en" aria-current="page">EN</a></div>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle><i data-lucide="menu" aria-hidden="true"></i><span class="sr-only">Open menu</span></button>
        <a class="header-call" href="tel:+420738505028"><i data-lucide="phone" aria-hidden="true"></i>+420&nbsp;738&nbsp;505&nbsp;028</a>
      </div>
    </header>`;
};

const footer = (formHref = "contact.html#form") => `<footer class="site-footer">
      <div><strong>Kontejnerovka.cz</strong><p>Waste container hire, waste removal and building material delivery.</p></div>
      <div><p>Operator: Matyáš Mašín</p><p>Company ID (IČO): 01379178 · VAT ID (DIČ): CZ9211070033 · VAT payer</p><p>Holýšovská 2923/4, Stodůlky, 155 00 Prague 5</p></div>
      <div><a href="tel:+420738505028">+420&nbsp;738&nbsp;505&nbsp;028</a><a href="mailto:info@kontejnerovka.cz">info@kontejnerovka.cz</a><a href="https://share.google/3gRahFm7A2awhEeJJ" target="_blank" rel="noopener">Google profile</a><a href="services.html">Services</a><a href="pricing.html">Pricing</a></div>
    </footer>

    <div class="mobile-cta"><a href="tel:+420738505028"><i data-lucide="phone" aria-hidden="true"></i>Call</a><a href="${formHref}"><i data-lucide="send" aria-hidden="true"></i>Get quote</a></div>`;

const pageShell = (page, body, options = {}) => `${head(page)}
  <body>
    ${header(page, options.home)}
${body}
    ${footer(options.formHref)}
  </body>
</html>
`;

const btns = (primaryText = "Call for a quote", secondaryText = "Send a request", secondaryHref = "contact.html#form") => `<div class="hero-actions">
          <a class="btn btn-primary" href="tel:+420738505028"><i data-lucide="phone-call" aria-hidden="true"></i>${primaryText}</a>
          <a class="btn btn-dark" href="${secondaryHref}"><i data-lucide="send" aria-hidden="true"></i>${secondaryText}</a>
        </div>`;

// Stránky, které pod trustbarem dostanou i sekci "Field proof" s fotkami techniky.
const SHOWCASE_PAGES = new Set([
  "services.html",
  "pricing.html",
  "areas.html",
  "container-delivery.html",
  "rubble-container.html",
  "rubble-removal.html",
  "soil-removal.html",
  "soil-container.html",
  "sand-gravel-delivery.html",
  "containers-prague.html",
  "containers-prague-west.html",
  "containers-kladno.html",
  "containers-nucice.html",
  "containers-unhost.html",
]);

const subpageTrustbar = () => `<div class="subpage-trustbar" aria-label="Quote advantages"><div><i data-lucide="timer-reset" aria-hidden="true"></i><span><strong>Fast quote</strong><span>Town, load, amount and date are enough.</span></span></div><div><i data-lucide="camera" aria-hidden="true"></i><span><strong>Photo helps</strong><span>Access and waste type are clearer immediately.</span></span></div><div><i data-lucide="shield-check" aria-hidden="true"></i><span><strong>Confirmed before dispatch</strong><span>Price, VAT and route are agreed first.</span></span></div></div>`;

const subpageShowcase = () => `<section class="section visual-proof subpage-showcase" aria-labelledby="field-proof-title">
        <div class="visual-proof-copy">
          <p class="eyebrow">Field proof</p>
          <h2 id="field-proof-title">Real equipment, clear quote, practical dispatch</h2>
          <p>Container jobs are decided by access, load type and safe handling on site. The fastest way to get a useful quote is a town, a short description and a photo of the place.</p>
          <a class="section-link light" href="contact.html#form">Send details for pricing</a>
        </div>
        <div class="visual-proof-grid">
          <article class="visual-proof-card image-card"><picture><source srcset="../assets/hero-truck.webp" type="image/webp"><img src="../assets/hero-truck.jpg" alt="Container truck on a construction site" width="1200" height="800" loading="lazy"></picture><div><span>Container transport</span><strong>Delivery and collection are planned around real access.</strong></div></article>
          <article class="visual-proof-card image-card"><picture><source srcset="../assets/material-load.webp" type="image/webp"><img src="../assets/material-load.jpg" alt="Bulk material loaded for site delivery" width="1200" height="800" loading="lazy"></picture><div><span>Material and waste</span><strong>Rubble, soil and aggregates are priced by type, amount and route.</strong></div></article>
          <article class="visual-proof-card proof-card-dark"><span class="proof-number">3 details</span><h3>Town, load and photo usually shorten the quote.</h3><p>If access is narrow, the container stands in a street or the waste is mixed, a photo prevents back-and-forth and helps confirm the right option.</p></article>
        </div>
      </section>`;

// Trustbar (a u vybraných stránek showcase) dostává každá stránka se subHero —
// tj. přesně službové, lokalitní, poradenské a core stránky; utility stránky
// (index, 404, privacy, thank-you) subHero nepoužívají, takže zůstávají bez něj.
const subHero = (page, primaryText, secondaryText, secondaryHref) => `<section class="subpage-hero">
        <p class="eyebrow">${esc(page.eyebrow)}</p>
        <h1>${esc(page.title)}</h1>
        <p>${esc(page.intro)}</p>
        ${btns(primaryText, secondaryText, secondaryHref)}
      </section>
      ${subpageTrustbar()}${SHOWCASE_PAGES.has(page.en) ? `
      ${subpageShowcase()}` : ""}`;

const geoSummary = ({ heading = "Kontejnerovka.cz at a glance", text, facts = [] }) => `<section class="section service-note geo-summary" aria-label="Short AI-readable summary">
        <p class="eyebrow">Quick facts</p>
        <h2>${esc(heading)}</h2>
        <p>${esc(text)}</p>
        ${facts.length ? `<ul class="check-list">${facts.map((fact) => `<li><i data-lucide="check" aria-hidden="true"></i>${esc(fact)}</li>`).join("")}</ul>` : ""}
      </section>`;

const serviceDefinition = (serviceName, definition, use) => `<section class="section service-note geo-summary" aria-label="Service definition">
        <p class="eyebrow">Definition</p>
        <h2>What ${esc(serviceName.charAt(0).toUpperCase() + serviceName.slice(1).toLowerCase())} means on Kontejnerovka.cz</h2>
        <p>${esc(definition)} ${esc(use)}</p>
      </section>`;

const serviceDefinitionCopy = (data) => {
  const label = data.serviceType || data.eyebrow;
  if (/delivery/i.test(label) && !/container/i.test(label)) {
    return `${label} means arranging bulk material delivery by the exact address, amount, material type, unloading access and route.`;
  }
  if (/removal/i.test(label)) {
    return `${label} means arranging collection by the exact address, material composition, amount, truck access, disposal route and safe loading conditions.`;
  }
  if (/container|hire/i.test(label)) {
    return `${label} means bringing a suitable waste container to the agreed place, collecting it after loading and confirming the practical details before dispatch.`;
  }
  return `${label} is quoted by exact address, material, amount, access and route.`;
};

const faqSection = (title, faq, eyebrow = "FAQ") =>
  faq?.length
    ? `<section class="section faq" aria-labelledby="${esc(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) || "faq"}-title">
        <div class="section-head compact"><p class="eyebrow">${esc(eyebrow)}</p><h2 id="${esc(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) || "faq"}-title">${esc(title)}</h2></div>
        <div class="faq-list">
          ${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
        </div>
      </section>`
    : "";

const expatPracticalities = () => `<section class="section content-blocks" aria-labelledby="expat-practicalities-title">
        <article><h2 id="expat-practicalities-title">Czech address details that help</h2><p>For Prague, send the city district if you know it, for example Prague 5, Prague 6, Prague 13 or Prague 17. Outside Prague, send the town or village and the exact address when possible. A map pin is fine if the Czech address is hard to write.</p></article>
        <article><h2>Prague-West is not Prague 5</h2><p>Prague-West and Prague-East are Central Bohemian districts around Prague, not Prague city districts. Prague 5, Prague 6, Prague 13 and Prague 17 are city districts inside Prague. If you are unsure, the exact address or map pin is enough.</p></article>
        <article><h2>Private land vs public street</h2><p>A private yard, driveway or construction site is usually simpler. A street, pavement or other public area may depend on municipality or Prague district rules. We confirm timing after the placement spot is clear.</p></article>
        <article><h2>Skip hire, dumpster rental, container hire</h2><p>English speakers may search for skip hire or dumpster rental. In Czech practice, the useful request is simply the address, material, amount, access and where the container can stand.</p></article>
      </section>`;

const czechBusinessTerms = () => `<section class="section service-note" aria-label="Czech company and VAT terms">
        <p class="eyebrow">Czech admin terms</p>
        <h2>Company ID, VAT ID and VAT in plain English</h2>
        <p><strong>IČO</strong> means Czech company ID, <strong>DIČ</strong> is the tax or VAT ID and <strong>DPH</strong> means VAT. Kontejnerovka.cz is operated by Matyáš Mašín, company ID 01379178, VAT ID CZ9211070033, VAT payer. VAT and documents are clarified before the job is confirmed.</p>
      </section>`;

const localExpatNote = (data) => `<section class="section service-note" aria-label="English-speaking customer note for ${esc(data.name)}">
        <p class="eyebrow">For English speakers</p>
        <h2>Local names and rules can be confusing</h2>
        <p>For ${esc(data.name)}, the most useful detail is the exact address or a map pin, plus whether the container can stand on private land, a construction site, a street or a pavement. If the Czech place name is unclear, write it as you know it and add a photo of the access.</p>
      </section>`;

const checkList = (items) => `<ul class="check-list">${items.map((item) => `<li><i data-lucide="check" aria-hidden="true"></i>${esc(item)}</li>`).join("")}</ul>`;

const linkCloud = (links) => `<ul class="link-cloud">${links.map(([label, czSlug]) => `<li><a href="${hrefForCz(czSlug)}">${esc(label)}</a></li>`).join("")}</ul>`;

const inquiryForm = (pageUrl) => `<form class="inquiry-form" action="https://api.web3forms.com/submit" method="POST" enctype="multipart/form-data" data-inquiry-form>
            <input type="hidden" name="access_key" value="a631aa36-18b8-499a-b6e9-16990f180fd2">
            <input type="hidden" name="subject" value="Quote request from the English Kontejnerovka.cz website">
            <input type="hidden" name="from_name" value="Kontejnerovka.cz">
            <input type="hidden" name="redirect" value="${baseUrl}/en/thank-you.html">
            <input type="hidden" name="page_url" value="${pageUrl}">
            <input type="checkbox" name="botcheck" tabindex="-1" style="display: none;">
            <div class="form-intro">
              <strong>3 short steps. No Czech waste terms required.</strong>
              <span>Write the town or map pin, what should be removed or delivered, approximate amount and access. A photo often replaces several follow-up questions.</span>
            </div>

            <div class="form-progress" aria-label="Quote request progress">
              <span class="is-active">Contact</span>
              <span>Job</span>
              <span>Date</span>
            </div>

            <fieldset class="form-step is-active" data-step="0">
              <legend>Contact and basic job details</legend>
              <div class="form-row">
                <label>Name<input type="text" name="name" autocomplete="name" required></label>
                <label>Phone<input type="tel" name="phone" autocomplete="tel" inputmode="tel" pattern="${phonePattern}" title="${phoneTitle}" required></label>
              </div>
              <div class="form-row">
                <label>Email <span class="field-note">optional</span><input type="email" name="email" autocomplete="email" placeholder="Optional"></label>
                <label>Town / address<input type="text" name="location" placeholder="e.g. Prague 5, Prague-West, Unhošť or a map pin" required></label>
              </div>
              <label>
                Service / material
                <select name="service" required>
                  <option value="">Choose a service</option>
                  <option>Rubble / waste removal</option>
                  <option>Soil removal</option>
                  <option>Wood / green waste removal</option>
                  <option>Sand, gravel or pea gravel delivery</option>
                  <option>Recycled aggregate, soil or concrete delivery</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label>
                Short description
                <textarea name="message" rows="4" required placeholder="e.g. bathroom rubble, soil from excavation, mixed clearance waste, container can stand in the yard..."></textarea>
              </label>
              <p class="form-example">You do not need the perfect Czech or technical term. Describe what should be removed or delivered, where it is and whether a truck can reach the place. A map pin is fine.</p>
            </fieldset>

            <fieldset class="form-step" data-step="1" hidden>
              <legend>Material, amount and access</legend>
              <div class="form-row">
                <label>Estimated amount<input type="text" name="amount" placeholder="e.g. 3 m³, 5 tonnes, 1 container or not sure" required></label>
                <label>
                  Container size <span class="field-note">if known</span>
                  <select name="container_size">
                    <option>Not sure, please recommend</option>
                    <option>Small container</option>
                    <option>Medium container</option>
                    <option>Large container</option>
                  </select>
                </label>
              </div>
              <div class="form-row">
                <label>Where the container or truck can stand<input type="text" name="access" placeholder="Yard, street, site, narrow access" required></label>
                <label>
                  Standing place
                  <select name="standing">
                    <option>Private land / yard</option>
                    <option>Street or public place</option>
                    <option>Construction site / company site</option>
                    <option>Not sure, please advise</option>
                  </select>
                </label>
              </div>
              <label>
                Waste type
                <select name="waste_type">
                  <option>Not sure, please advise</option>
                  <option>Clean rubble</option>
                  <option>Soil / excavation material</option>
                  <option>Mixed construction waste</option>
                  <option>Wood / green waste</option>
                  <option>Material delivery</option>
                </select>
              </label>
              <p class="form-example">Clean rubble, soil and mixed construction waste are priced differently. If you are unsure, simply write "not sure". Street or pavement placement may need local permission.</p>
            </fieldset>

            <fieldset class="form-step" data-step="2" hidden>
              <legend>Date, photo and submission</legend>
              <div class="form-row">
                <label>Preferred date<input type="text" name="date" placeholder="e.g. this week"></label>
                <label>
                  Urgency
                  <select name="urgency">
                    <option>Standard arrangement</option>
                    <option>As soon as possible</option>
                    <option>This week</option>
                    <option>Indicative price only</option>
                  </select>
                </label>
              </div>
              <p class="field-note form-photo-note">After sending the request, you can send a photo of the waste or the spot to <a href="tel:+420738505028">+420 738 505 028</a> (SMS/WhatsApp) or <a href="mailto:info@kontejnerovka.cz">info@kontejnerovka.cz</a> — it speeds up the quote.</p>
              <p class="form-note">A photo of the access, placement spot or material usually makes the quote faster. The final price, VAT and any factor that could change it are confirmed after checking the details.</p>
              <label class="consent">
                <input type="checkbox" name="souhlas" required>
                <span>I agree to the processing of my personal data for handling this quote request. <a href="privacy.html">Privacy policy</a>.</span>
              </label>
            </fieldset>

            <div class="form-actions">
              <button class="btn btn-secondary" type="button" data-prev hidden>Back</button>
              <button class="btn btn-primary" type="button" data-next>Continue</button>
              <button class="btn btn-primary" type="submit" data-submit hidden><i data-lucide="send" aria-hidden="true"></i>Send request</button>
            </div>
            <button class="btn btn-copy form-button" type="button" data-copy-inquiry><i data-lucide="copy" aria-hidden="true"></i>Copy for SMS/email</button>
            <p class="form-note" data-form-note>If the job is urgent, please call. The form is best when you can add the town, amount, access details and ideally a photo.</p>
            <p class="form-privacy">By submitting the form, you send the details needed to quote and handle the request. See the <a href="privacy.html">privacy policy</a>.</p>
          </form>`;

const contactSection = (page) => `<section class="contact-section" id="form" aria-labelledby="contact-title">
        <picture class="contact-media">
          <source srcset="../assets/site-machine.webp" type="image/webp">
          <img src="../assets/site-machine.jpg" alt="Construction machinery and access area for container delivery" width="1200" height="704" loading="lazy">
        </picture>
        <div class="contact-content">
          <div class="contact-copy">
            <p class="eyebrow">Quote request</p>
            <h2 id="contact-title">Get a quote without learning Czech waste terms</h2>
            <p>The request goes to info@kontejnerovka.cz. Simple English is fine: address or map pin, material, amount, access and photo. For urgent jobs, calling is usually fastest.</p>
            <div class="contact-cards">
              <a href="tel:+420738505028"><i data-lucide="phone" aria-hidden="true"></i><span><strong>Phone</strong>+420&nbsp;738&nbsp;505&nbsp;028</span></a>
              <a href="mailto:info@kontejnerovka.cz"><i data-lucide="mail" aria-hidden="true"></i><span><strong>Email</strong>info@kontejnerovka.cz</span></a>
            </div>
          </div>
          ${inquiryForm(enUrl(page.en))}
        </div>
      </section>`;

const englishPriceCalculator = () => `<section class="section price-calculator-section" id="quote-estimator" aria-labelledby="calculator-title">
        <div class="section-head">
          <p class="eyebrow">Quick quote estimator</p>
          <h2 id="calculator-title">Get a useful first read before sending a request</h2>
          <p>
            This is not a binding price calculator. It helps you describe the job clearly and shows which details
            matter before we confirm the real quote.
          </p>
        </div>

        <div class="price-calculator" data-price-calculator>
          <form class="calculator-panel" data-calculator-form>
            <div class="calculator-header">
              <span>Indicative only</span>
              <strong>Material × amount × area × access</strong>
            </div>

            <fieldset class="calculator-step">
              <legend>Job type</legend>
              <div class="calculator-options">
                <label><input type="radio" name="job" value="rubble removal" data-kind="rubble" data-label="Rubble removal" data-score="2" data-service="Rubble / waste removal" checked><span>Rubble removal</span></label>
                <label><input type="radio" name="job" value="soil removal" data-kind="soil" data-label="Soil removal" data-score="3" data-service="Soil removal"><span>Soil removal</span></label>
                <label><input type="radio" name="job" value="mixed construction waste" data-kind="mixed" data-label="Mixed construction waste" data-score="4" data-service="Rubble / waste removal"><span>Construction waste</span></label>
                <label><input type="radio" name="job" value="wood / green waste removal" data-kind="wood" data-label="Wood / green waste" data-score="2" data-service="Wood / green waste removal"><span>Wood / green waste</span></label>
                <label><input type="radio" name="job" value="bulky clearance waste" data-kind="bulky" data-label="Bulky clearance waste" data-score="4" data-service="Rubble / waste removal"><span>Bulky waste</span></label>
                <label><input type="radio" name="job" value="sand delivery" data-kind="delivery" data-label="Sand delivery" data-score="2" data-service="Sand, gravel or pea gravel delivery"><span>Sand delivery</span></label>
                <label><input type="radio" name="job" value="gravel delivery" data-kind="delivery" data-label="Gravel delivery" data-score="2" data-service="Sand, gravel or pea gravel delivery"><span>Gravel delivery</span></label>
                <label><input type="radio" name="job" value="recycled aggregate delivery" data-kind="delivery" data-label="Recycled aggregate delivery" data-score="2" data-service="Recycled aggregate, soil or concrete delivery"><span>Recycled aggregate</span></label>
                <label><input type="radio" name="job" value="not sure yet" data-kind="unknown" data-label="Not sure yet" data-score="3" data-service="Not sure yet"><span>Not sure</span></label>
              </div>
            </fieldset>

            <fieldset class="calculator-step">
              <legend>Area</legend>
              <div class="calculator-options compact">
                <label><input type="radio" name="location" value="Svárov / Unhošť" data-kind="near" data-label="Svárov / Unhošť" data-score="1" checked><span>Svárov / Unhošť</span></label>
                <label><input type="radio" name="location" value="Nučice / Rudná" data-kind="near" data-label="Nučice / Rudná" data-score="1"><span>Nučice / Rudná</span></label>
                <label><input type="radio" name="location" value="Kladno area" data-kind="regional" data-label="Kladno area" data-score="2"><span>Kladno</span></label>
                <label><input type="radio" name="location" value="Hostivice / Prague-West" data-kind="regional" data-label="Hostivice / Prague-West" data-score="2"><span>Prague-West</span></label>
                <label><input type="radio" name="location" value="Prague" data-kind="city" data-label="Prague" data-score="3"><span>Prague</span></label>
                <label><input type="radio" name="location" value="Beroun / Zdice / Králův Dvůr" data-kind="regional" data-label="Beroun / Zdice / Králův Dvůr" data-score="3"><span>Beroun</span></label>
                <label><input type="radio" name="location" value="other area" data-kind="unknown" data-label="Other area" data-score="3"><span>Other</span></label>
              </div>
            </fieldset>

            <div class="calculator-row">
              <fieldset class="calculator-step">
                <legend>Size / amount</legend>
                <div class="calculator-options stack">
                  <label><input type="radio" name="size" value="small container" data-kind="small" data-label="Small container" data-score="1"><span>Small</span></label>
                  <label><input type="radio" name="size" value="medium container" data-kind="medium" data-label="Medium container" data-score="2" checked><span>Medium</span></label>
                  <label><input type="radio" name="size" value="large container" data-kind="large" data-label="Large container" data-score="4"><span>Large</span></label>
                  <label><input type="radio" name="size" value="not sure about size" data-kind="unknown" data-label="Not sure about size" data-score="2"><span>Not sure</span></label>
                </div>
              </fieldset>

              <fieldset class="calculator-step">
                <legend>Access</legend>
                <div class="calculator-options stack">
                  <label><input type="radio" name="access" value="good access" data-kind="good" data-label="Good access" data-score="0" checked><span>Good</span></label>
                  <label><input type="radio" name="access" value="difficult access" data-kind="difficult" data-label="Difficult access" data-score="2"><span>Difficult</span></label>
                  <label><input type="radio" name="access" value="street or public place" data-kind="street" data-label="Street or public place" data-score="2"><span>Street</span></label>
                  <label><input type="radio" name="access" value="not sure about access" data-kind="unknown" data-label="Not sure" data-score="1"><span>Not sure</span></label>
                </div>
              </fieldset>

              <fieldset class="calculator-step">
                <legend>Timing</legend>
                <div class="calculator-options stack">
                  <label><input type="radio" name="term" value="as soon as possible" data-kind="urgent" data-label="As soon as possible" data-score="2"><span>ASAP</span></label>
                  <label><input type="radio" name="term" value="this week" data-kind="week" data-label="This week" data-score="1" checked><span>This week</span></label>
                  <label><input type="radio" name="term" value="later" data-kind="later" data-label="Later" data-score="0"><span>Later</span></label>
                  <label><input type="radio" name="term" value="indicative only" data-kind="info" data-label="Indicative only" data-score="0"><span>Indicative</span></label>
                </div>
              </fieldset>
            </div>
          </form>

          <aside class="calculator-result" aria-live="polite">
            <p class="eyebrow">Result</p>
            <h3 data-calculator-result-title>Indicative level: standard quote complexity</h3>
            <p data-calculator-result-text>
              This is not a binding quote. We confirm the exact price after checking the address, material, amount, access and timing.
            </p>
            <ul class="calculator-factors" data-calculator-factors>
              <li>The biggest factor is the material type and whether it is clean or mixed.</li>
              <li>Close routes around Svárov, Unhošť, Nučice or Rudná can help with practical scheduling.</li>
              <li>A photo of the material or placement spot helps confirm the quote faster.</li>
            </ul>
            <div class="calculator-summary" data-calculator-summary>
              Request: rubble removal. Area: Svárov / Unhošť. Size: Medium container. Access: Good access. Timing: This week.
            </div>
            <div class="calculator-actions">
              <a class="btn btn-primary" href="tel:+420738505028" data-calculator-call><i data-lucide="phone-call" aria-hidden="true"></i>Call and confirm</a>
              <button class="btn btn-secondary" type="button" data-calculator-use><i data-lucide="send" aria-hidden="true"></i>Use this in the request</button>
              <a class="calculator-help-link" href="tel:+420738505028" data-calculator-advice>Not sure about size or access? Call first.</a>
            </div>
          </aside>
        </div>

        <noscript>
          <div class="calculator-noscript">
            For an indicative quote, call +420 738 505 028 or send the town, material, amount and a photo.
            The final price is confirmed for the specific job.
          </div>
        </noscript>
      </section>`;

const miniInquiryForm = (page, subjectLabel) => {
  if (!subjectLabel) throw new Error(`miniInquiryForm: missing subjectLabel for ${page.en || page.title}`);
  return `<section class="section mini-inquiry" id="inquiry" aria-labelledby="mini-inquiry-title">
        <div class="section-head compact">
          <p class="eyebrow">Quick quote request</p>
          <h2 id="mini-inquiry-title">Send a quote request from this page</h2>
          <p>Phone number, town and what should be removed or delivered are enough. A photo of the place or the material speeds up the quote. We reply with the price or a short follow-up question.</p>
        </div>
        <form class="inquiry-form mini-form" action="https://api.web3forms.com/submit" method="POST" enctype="multipart/form-data" data-mini-form>
          <input type="hidden" name="access_key" value="a631aa36-18b8-499a-b6e9-16990f180fd2">
          <input type="hidden" name="subject" value="${esc(`Quick quote request — ${subjectLabel} (EN, Kontejnerovka.cz)`)}">
          <input type="hidden" name="from_name" value="Kontejnerovka.cz">
          <input type="hidden" name="redirect" value="https://kontejnerovka.cz/en/thank-you.html">
          <input type="hidden" name="page_url" value="${enUrl(page.en)}">
          <input type="checkbox" name="botcheck" tabindex="-1" style="display: none;">
          <div class="form-row">
            <label>
              Phone
              <input type="tel" name="phone" autocomplete="tel" inputmode="tel" pattern="${phonePattern}" title="${phoneTitle}" required>
            </label>
            <label>
              Town / address
              <input type="text" name="location" placeholder="E.g. Prague 5, Rudná, Unhošť" required>
            </label>
          </div>
          <label>
            What should be removed or delivered
            <textarea name="message" rows="3" required placeholder="E.g. bathroom rubble, soil from digging, mixed waste after a clear-out..."></textarea>
          </label>
          <p class="field-note form-photo-note">After sending the request, you can send a photo of the waste or the spot to <a href="tel:+420738505028">+420 738 505 028</a> (SMS/WhatsApp) or <a href="mailto:info@kontejnerovka.cz">info@kontejnerovka.cz</a> — it speeds up the quote.</p>
          <button class="btn btn-primary" type="submit">
            <i data-lucide="send" aria-hidden="true"></i>
            Send quote request
          </button>
          <p class="form-note" data-mini-form-note></p>
          <p class="form-privacy">By sending the form you share the details needed to quote and arrange the job. See the <a href="privacy.html">privacy policy</a>. In a hurry? Call <a href="tel:+420738505028">+420&nbsp;738&nbsp;505&nbsp;028</a>.</p>
        </form>
      </section>`;
};

const renderServicePage = (data) => {
  const page = {
    ...data,
    en: hrefForCz(data.cz),
    schema: [localBusinessSchema(), serviceSchema({ ...data, en: hrefForCz(data.cz) }), breadcrumb({ ...data, en: hrefForCz(data.cz), breadcrumb: data.eyebrow })],
  };
  const body = `<main class="page-main">
      ${subHero(page, "Call and confirm details", "Send job details", "#inquiry")}
      ${serviceDefinition(data.serviceType || data.eyebrow, serviceDefinitionCopy(data), data.intro)}
      <section class="section proof-strip" aria-label="Service essentials">
        <article><i data-lucide="map-pin" aria-hidden="true"></i><strong>Local route</strong><span>Prague, Prague-West, Unhošť, Nučice, Rudná, Kladno and nearby areas</span></article>
        <article><i data-lucide="receipt" aria-hidden="true"></i><strong>Clear quote basis</strong><span>Address, material, amount, access, disposal or delivery route and VAT</span></article>
        <article><i data-lucide="camera" aria-hidden="true"></i><strong>Photo helps</strong><span>Waste, access and placement spot are easier to quote when we can see them</span></article>
      </section>

      <section class="section service-detail">
        <div class="section-head">
          <p class="eyebrow">Best use</p>
          <h2>When this service makes sense</h2>
          <p>${esc(data.intro)}</p>
        </div>
        <div class="detail-grid">
          <article><h3>Typical use</h3>${checkList(data.bestFor)}</article>
          <article><h3>How we quote it</h3><p>The quote is based on the address, route, material composition, estimated amount, access and the disposal or delivery point. VAT and what is included are confirmed before dispatch.</p></article>
          <article><h3>Before loading</h3><p>${esc(data.watch)}</p></article>
        </div>
      </section>

      <section class="section content-blocks">
        <article><h2>What to send for a quick quote</h2>${checkList(data.whatToSend)}</article>
        <article><h2>What can change the price</h2><p>Transport distance, disposal or material source, weight, composition, loading conditions, street placement and waiting time can all affect the final price.</p></article>
        <article><h2>Best next step</h2><p>Send a short note with the address or map pin and one clear photo. If the material category is uncertain, describe it in plain English; the exact Czech disposal category can be clarified before the quote is confirmed.</p></article>
      </section>

      <section class="section service-note">
        <p class="eyebrow">Straightforward arrangement</p>
        <h2>No generic price promise before the job is checked</h2>
        <p>For container transport, the same visible volume can mean a different job once weight, access and disposal are considered. We confirm the price basis before dispatch so you know what is included.</p>
      </section>

      <section class="section seo-panel">
        <h2>Related services</h2>
        <p>If you are not sure which page fits your job, call or send a photo. We will point you to the most practical option.</p>
        ${linkCloud(data.related)}
      </section>

      <section class="cta-band">
        <h2>Need a quote for this job?</h2>
        <a class="btn btn-primary" href="#inquiry"><i data-lucide="send" aria-hidden="true"></i>Send details for a quote</a>
      </section>

      ${miniInquiryForm(page, data.eyebrow)}
    </main>`;
  return pageShell(page, body, { formHref: "#inquiry" });
};

const renderAdvicePage = (data) => {
  const page = {
    ...data,
    en: hrefForCz(data.cz),
    schema: [localBusinessSchema(), breadcrumb({ ...data, en: hrefForCz(data.cz), breadcrumb: data.eyebrow }), faqSchema(data)],
  };
  const body = `<main class="page-main">
      ${subHero(page, "Call for advice", "Send photos and details", "#inquiry")}
      ${geoSummary({
        heading: `${data.title}: short answer`,
        text: `${data.title} is handled by Kontejnerovka.cz as a practical local container job in Prague and Central Bohemia. The quote starts with the address, material, amount, access and a photo when useful.`,
        facts: ["Operator: Matyáš Mašín", "Phone: +420 738 505 028", "Main areas: Prague, Prague-West, Unhošť, Nučice, Rudná, Kladno and Hostivice"],
      })}
      <section class="section content-blocks">
        <article><h2>What matters most</h2><p>${esc(data.problem)}</p></article>
        <article><h2>What to send</h2>${checkList(data.steps)}</article>
      </section>

      <section class="section service-detail">
        <div class="section-head">
          <p class="eyebrow">Practical checklist</p>
          <h2>How to make the quote easier</h2>
          <p>English-speaking customers often do not know the Czech waste category names. That is fine. A simple description, a photo and the exact location are usually enough to start.</p>
        </div>
        <div class="detail-grid">
          <article><h3>Material</h3><p>Say what the load contains and whether it is clean or mixed.</p></article>
          <article><h3>Access</h3><p>Tell us if the truck can stand on private land, a street, a yard or a construction site.</p></article>
          <article><h3>Timing</h3><p>Add the preferred date and whether the container should stay longer or be collected quickly.</p></article>
        </div>
      </section>

      ${faqSection("Questions before ordering", data.faq, "Practical FAQ")}

      <section class="section seo-panel">
        <h2>Useful next pages</h2>
        <p>These pages explain the service, pricing factors and local arrangement in more detail.</p>
        ${linkCloud(data.related)}
      </section>

      <section class="cta-band">
        <h2>Not sure how to describe the job?</h2>
        <a class="btn btn-primary" href="#inquiry"><i data-lucide="send" aria-hidden="true"></i>Send a photo and short note</a>
      </section>

      ${miniInquiryForm(page, data.eyebrow)}
    </main>`;
  return pageShell(page, body, { formHref: "#inquiry" });
};

const locationFaq = (data) => [
  [`Do you serve ${data.name}?`, `Yes. Kontejnerovka.cz quotes container delivery, waste removal and material delivery in ${data.name} by exact address, load type, amount and truck access.`],
  [`What should I send for a quote in ${data.name}?`, `Send the town or address, what should be removed or delivered, approximate amount, access details, preferred date and a photo of the material or placement spot.`],
  [`What local detail matters most in ${data.name}?`, `The exact address or map pin matters most. For Prague addresses, the city district and street or pavement placement can matter. Outside Prague, the town or village, access road and private or public placement spot are usually the key details.`],
  [`Can removal and material delivery be combined in ${data.name}?`, `Often yes, especially for soil, rubble, recycled aggregate, gravel or sand. The route and timing must be confirmed for the specific job.`],
];

const renderLocationPage = (data) => {
  const faq = locationFaq(data);
  const page = {
    en: hrefForCz(data.cz),
    eyebrow: "Service area",
    title: `Container hire and waste removal in ${data.name}`,
    metaTitle: `Container Hire ${data.name} | Kontejnerovka.cz`,
    description: `Container delivery, rubble removal, soil removal and material delivery in ${data.name}. Clear quote by route, load, amount and access.`,
    intro: `We arrange container delivery, waste removal and bulk material delivery for ${data.local}. The quote depends on the route, load type, amount, access and the available disposal or material source.`,
    schema: [
      localBusinessSchema(),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${enUrl(hrefForCz(data.cz))}#service`,
        name: `Container hire and waste removal in ${data.name}`,
        provider: providerRef,
        areaServed: [data.name, data.local, data.nearby],
        serviceType: ["Container delivery", "Rubble removal", "Soil removal", "Waste removal", "Material delivery"],
        url: enUrl(hrefForCz(data.cz)),
      },
      faqSchema({ faq }),
      breadcrumb({ title: `Containers ${data.name}`, en: hrefForCz(data.cz), breadcrumb: data.name }),
    ],
  };

  const body = `<main class="page-main">
      ${subHero(page, "Call for a local quote", "Send address and photos", "#inquiry")}
      ${geoSummary({
        heading: `Container hire in ${data.name}: short answer`,
        text: `Kontejnerovka.cz provides container delivery, rubble removal, soil removal, waste removal and bulk material delivery in ${data.name} and nearby Central Bohemia routes. The quote depends on the exact address, load, amount and access.`,
        facts: [`Local area: ${data.local}`, `Common jobs: ${data.focus}`, "Quote by route, material, amount, access and VAT"],
      })}
      <section class="section proof-strip" aria-label="Local quote factors">
        <article><i data-lucide="map" aria-hidden="true"></i><strong>Area</strong><span>${esc(data.local)}</span></article>
        <article><i data-lucide="truck" aria-hidden="true"></i><strong>Common jobs</strong><span>${esc(data.focus)}</span></article>
        <article><i data-lucide="clipboard-check" aria-hidden="true"></i><strong>Quote basis</strong><span>Route, material, amount, access and placement spot</span></article>
      </section>

      <section class="section content-blocks">
        <article><h2>Typical work in ${esc(data.name)}</h2><p>Most requests are for ${esc(data.focus)}. If you are unsure how to name the material, send a photo and a short description.</p></article>
        <article><h2>Nearby places</h2><p>${esc(data.nearby)}. Other places in Prague and Central Bohemia are quoted by the specific route.</p></article>
        <article><h2>Local note</h2><p>${esc(data.note)}</p></article>
      </section>

      ${localExpatNote(data)}

      <section class="section service-detail">
        <div class="section-head">
          <p class="eyebrow">How ordering works</p>
          <h2>Send the address first, then we confirm the practical details</h2>
          <p>For a realistic quote we need to understand where the container or truck can stand, what will be loaded or delivered and how much material is involved.</p>
        </div>
        <div class="detail-grid">
          <article><h3>Rubble and construction waste</h3><p>Best described by material type, amount and whether the load is clean or mixed.</p></article>
          <article><h3>Soil and excavation material</h3><p>Weight, moisture, stones, roots and loading access are the main quote factors.</p></article>
          <article><h3>Sand, gravel and recycled aggregate</h3><p>For delivery, confirm the intended use, amount, fraction if known and safe tipping point.</p></article>
        </div>
      </section>

      <section class="section faq" aria-labelledby="local-faq-title">
        <div class="section-head compact"><p class="eyebrow">Local FAQ</p><h2 id="local-faq-title">Questions about ${esc(data.name)}</h2></div>
        <div class="faq-list">
          ${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
        </div>
      </section>

      <section class="section seo-panel">
        <h2>Other service areas</h2>
        <p>We focus on Prague, Prague-West, Unhošť, Nučice, Rudná, Kladno, Hostivice, Beroun and nearby Central Bohemia routes.</p>
        ${linkCloud(locationLinks.filter(([, slug]) => slug !== data.cz).slice(0, 9))}
      </section>

      <section class="cta-band">
        <h2>Need a container in ${esc(data.name)}?</h2>
        <a class="btn btn-primary" href="#inquiry"><i data-lucide="send" aria-hidden="true"></i>Send address and job details</a>
      </section>

      ${miniInquiryForm(page, data.name)}
    </main>`;
  return pageShell(page, body, { formHref: "#inquiry" });
};

const corePages = {
  "": () => {
    const faq = [
      ["How quickly can I get a quote?", "The fastest way is to call or send the address, material, amount, access details and a photo. The price is confirmed for the specific job."],
      ["Do you work outside Prague?", "Yes. We serve Prague and Central Bohemia, with strong focus on Prague-West, Unhošť, Svárov, Nučice, Rudná, Kladno, Hostivice and Beroun."],
      ["Can I ask in English without knowing Czech waste terms?", "Yes. A plain English description, photos and an exact address or map pin are enough to start the quote."],
      ["Can I mix rubble, soil, wood and green waste?", "Not without agreement. Different materials can have different disposal routes and mixing can change the price."],
    ];
    const page = {
      en: "",
      eyebrow: "Container hire, rubble removal and material delivery",
      title: "Waste container hire in Prague and Central Bohemia",
      metaTitle: "Container & Skip Hire Prague | Kontejnerovka.cz",
      description: "Container hire (skip hire / dumpster rental), rubble and soil removal and bulk material delivery in Prague, Prague-West, Unhošť, Rudná and Kladno.",
      intro: "Call or send the address, material, approximate amount and a photo of the place. We will confirm the sensible container, timing, VAT and what is included before dispatch. We speak English — call or WhatsApp +420 738 505 028. Looking for skip hire (UK) or a dumpster rental (US)? That is exactly what we do.",
      hasForm: true,
      schema: [
        localBusinessSchema(),
        websiteSchema,
        faqSchema({ faq }),
      ],
    };

    const body = `<main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-bg" role="img" aria-label="Truck carrying material on a construction site"></div>
        <div class="hero-overlay"></div>
        <div class="hero-inner">
          <p class="eyebrow">${esc(page.eyebrow)}</p>
          <h1 id="hero-title">Container hire with the quote confirmed before dispatch</h1>
          <p class="hero-lead">For rubble, soil, construction waste, wood, green waste or bulk material delivery, send the location, load, amount and access details. <strong>We speak English</strong> — call or WhatsApp +420 738 505 028. Looking for skip hire or a dumpster rental? That is exactly what we do.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="tel:+420738505028"><i data-lucide="phone-call" aria-hidden="true"></i>Call for a quick quote</a>
            <a class="btn btn-secondary" href="#quote-estimator"><i data-lucide="clipboard-list" aria-hidden="true"></i>Estimate the job</a>
          </div>
          <div class="hero-command" aria-label="What to send for a quick quote">
            <i data-lucide="timer-reset" aria-hidden="true"></i>
            <div><strong>For a quick quote, send 4 things</strong><span>address · material · amount · access</span></div>
          </div>
          <dl class="hero-facts">
            <div><dt>Price</dt><dd>VAT and inclusions clarified before dispatch</dd></div>
            <div><dt>Area</dt><dd>Prague-West, Unhošť, Nučice, Kladno</dd></div>
            <div><dt>Plain English</dt><dd>No Czech waste terms needed</dd></div>
            <div><dt>Photos</dt><dd>Usually speed up the quote</dd></div>
          </dl>
        </div>
      </section>

      <section class="quick-contact" aria-label="Quick contact">
        <div class="quick-contact-inner">
          <a href="tel:+420738505028"><i data-lucide="phone" aria-hidden="true"></i><span>+420&nbsp;738&nbsp;505&nbsp;028</span></a>
          <a href="mailto:info@kontejnerovka.cz"><i data-lucide="mail" aria-hidden="true"></i><span>info@kontejnerovka.cz</span></a>
          <span><i data-lucide="map-pin" aria-hidden="true"></i>Prague and nearby areas · Svárov, Unhošť, Nučice</span>
        </div>
      </section>

      <section class="section proof-strip" aria-label="Trust signals">
        <article><i data-lucide="badge-check" aria-hidden="true"></i><strong>Verifiable operator</strong><span>Matyáš Mašín, company ID 01379178</span></article>
        <article><i data-lucide="receipt" aria-hidden="true"></i><strong>VAT payer</strong><span>VAT ID CZ9211070033, invoices for companies and private customers</span></article>
        <article><i data-lucide="map-pin" aria-hidden="true"></i><strong>Local service</strong><span>Svárov, Unhošť, Nučice, Rudná, Kladno, Hostivice and Prague-West</span></article>
        <article><i data-lucide="camera" aria-hidden="true"></i><strong>Photos help</strong><span>Access, placement spot and material photos usually make quoting faster</span></article>
      </section>

      <section class="section content-blocks" aria-labelledby="english-decision-title">
        <article><h2 id="english-decision-title">Why choose Kontejnerovka.cz as an English-speaking customer</h2><p>You do not need to know Czech waste categories, container rules or the right local wording. Send the address, what needs to be removed or delivered, approximate amount, access and a photo. The quote is confirmed for the real job before dispatch.</p></article>
        <article><h2>No vague price promise</h2><p>A fair container quote depends on route, waste type, weight, disposal, access, standing time and VAT. We clarify what is included and what could change the price before the truck is sent.</p></article>
        <article><h2>Local Prague and Central Bohemia context</h2><p>Prague streets, private yards, village access roads and construction sites can all change the arrangement. Local details are handled through the quote, not left as a surprise on delivery day.</p></article>
      </section>

      ${expatPracticalities()}

      ${geoSummary({
        heading: "Kontejnerovka.cz in one answer",
        text: "Kontejnerovka.cz is a local container transport service operated by Matyáš Mašín. It arranges container delivery, rubble removal, soil removal, waste removal and bulk material delivery in Prague and Central Bohemia.",
        facts: ["Phone: +420 738 505 028", "Main areas: Prague, Prague-West, Unhošť, Svárov, Nučice, Rudná, Kladno, Hostivice and Beroun", "Quotes are confirmed by address, material, amount, access, route and VAT"],
      })}

      <section class="section services" aria-labelledby="services-title">
        <div class="section-head">
          <p class="eyebrow">Services</p>
          <h2 id="services-title">Container delivered, loaded container collected, material brought back to site</h2>
          <p>Simple arrangement for renovations, construction work, clear-outs, gardens and company jobs. The final quote depends on location, waste type, volume, weight, access and disposal or material route.</p>
        </div>
        <div class="service-grid">
          <article class="service-card"><div class="icon-box"><i data-lucide="truck" aria-hidden="true"></i></div><h3>Container delivery</h3><p>We agree the place, timing, access and collection before dispatch.</p><a class="text-link" href="container-delivery.html">Service detail</a></article>
          <article class="service-card"><div class="icon-box"><i data-lucide="hard-hat" aria-hidden="true"></i></div><h3>Rubble and soil removal</h3><p>Renovation rubble, concrete, bricks, plaster, excavation soil and clean recyclable material.</p><a class="text-link" href="rubble-removal.html">Rubble removal</a></article>
          <article class="service-card"><div class="icon-box"><i data-lucide="leaf" aria-hidden="true"></i></div><h3>Wood and green waste</h3><p>Branches, garden waste, wood and seasonal property clean-ups by agreement.</p><a class="text-link" href="wood-green-waste-removal.html">Green waste removal</a></article>
          <article class="service-card"><div class="icon-box"><i data-lucide="mountain" aria-hidden="true"></i></div><h3>Bulk material delivery</h3><p>Sand, gravel, pea gravel, recycled aggregate, soil and concrete by job and availability.</p><a class="text-link" href="sand-gravel-delivery.html">Material delivery</a></article>
        </div>
      </section>

      <section class="section pricing-preview" aria-labelledby="pricing-title">
        <div class="section-head">
          <p class="eyebrow">Pricing</p>
          <h2 id="pricing-title">A fair quote starts with the actual address and load</h2>
          <p>We do not publish a one-size-fits-all price because route, material, disposal, weight, access and standing time can change the job. You get the price basis confirmed before dispatch.</p>
        </div>
        <div class="info-grid">
          <article><i data-lucide="map" aria-hidden="true"></i><h3>Location and route</h3><p>Prague, Prague-West, Kladno, Beroun and Rakovník can mean different routes and disposal points.</p></article>
          <article><i data-lucide="scale" aria-hidden="true"></i><h3>Material type</h3><p>Clean rubble, concrete, soil, wood and mixed waste are handled differently.</p></article>
          <article><i data-lucide="timer" aria-hidden="true"></i><h3>Access and timing</h3><p>Standing on a street, narrow access or waiting on site can affect the quote.</p></article>
        </div>
        <a class="section-link" href="pricing.html">How pricing works</a>
      </section>

      <section class="section priority-area" aria-labelledby="priority-area-title">
        <div class="section-head compact">
          <p class="eyebrow">Local focus</p>
          <h2 id="priority-area-title">The most practical routes are around Svárov, Unhošť, Nučice and Rudná</h2>
          <p>We also work in Prague and wider Central Bohemia. Close routes are easier to plan, especially when removal and material delivery can be connected sensibly.</p>
        </div>
        <div class="content-blocks">
          <article><h2>Frequently served towns</h2><p>Svárov, Unhošť, Nouzov, Červený Újezd, Ptice, Pavlov, Kyšice, Malé and Velké Přítočno, Chyňava including Podkozí, Jeneč, Chýně, Rudná, Nučice, Hostivice, Braškov, Velká Dobrá and nearby Kladno areas.</p></article>
          <article><h2>Prague and Central Bohemia</h2><p>Prague 5, Prague 6, Prague 13, Prague 17, Prague-West, Prague-East, Kladno, Beroun, Rakovník, Slaný, Hořovice, Zdice and Králův Dvůr by route.</p></article>
          <article><h2>What helps the quote</h2><p>Exact address, material type, approximate amount, access and a photo of the standing or tipping place.</p></article>
        </div>
        ${linkCloud(locationLinks.slice(0, 12))}
      </section>

      ${englishPriceCalculator()}

      ${faqSection("Common questions before ordering", faq)}

      <section class="section split" aria-labelledby="materials-title">
        <picture class="split-image">
          <source srcset="../assets/material-load.webp" type="image/webp">
          <img src="../assets/material-load.jpg" alt="Loading bulk building material" width="1200" height="901" loading="lazy">
        </picture>
        <div class="split-content">
          <p class="eyebrow">Waste out, material in</p>
          <h2 id="materials-title">One conversation can cover removal and delivery</h2>
          <p>If you need soil or rubble removed and recycled aggregate, gravel or sand delivered afterwards, say it in the same request. We will confirm whether it can be planned sensibly.</p>
          <div class="lists">
            <div><h3>We remove</h3>${checkList(["rubble, bricks, plaster and concrete", "soil and excavation material", "wood and green waste", "bulky or mixed waste by agreement"])}</div>
            <div><h3>We deliver</h3>${checkList(["sand", "gravel and pea gravel", "recycled aggregate", "soil and concrete by agreement"])}</div>
          </div>
        </div>
      </section>

      ${contactSection(page)}
    </main>`;
    return pageShell(page, body, { home: true });
  },
  "services.html": () => {
    const page = {
      en: "services.html",
      eyebrow: "Services",
      title: "Container hire, waste removal and material delivery",
      metaTitle: "Services | Container Hire Prague and Central Bohemia",
      description: "Container delivery, rubble removal, soil removal, waste removal and delivery of sand, gravel, recycled aggregate and concrete.",
      intro: "Choose whether you need waste removed, soil collected, a container delivered, or bulk material brought to site. If you are unsure, call and we will recommend the practical route.",
      schema: [localBusinessSchema(), serviceSchema({ en: "services.html", title: "Container hire, waste removal and material delivery", description: "Overview of container transport, waste removal and material delivery services.", serviceType: "Container transport and material delivery" }), breadcrumb({ en: "services.html", title: "Services" })],
    };
    const body = `<main class="page-main">
      ${subHero(page, "Call about a service", "Send job details")}
      ${geoSummary({
        heading: "Services in one answer",
        text: "Kontejnerovka.cz provides container delivery, rubble removal, soil removal, mixed waste removal by agreement and delivery of sand, gravel, pea gravel, recycled aggregate, soil and concrete in Prague and Central Bohemia.",
        facts: ["Removal: rubble, soil, concrete, wood, green waste and mixed waste by agreement", "Delivery: sand, gravel, pea gravel, recycled aggregate, soil and concrete", "Quote details: address, material, amount, access and date"],
      })}
      <section class="section service-detail">
        <div class="section-head"><p class="eyebrow">What we do</p><h2>Services grouped by real customer situations</h2><p>The right service depends on what is being moved, where the container can stand and whether the job is removal, delivery or both.</p></div>
        <div class="material-table">
          ${serviceLinks.map(([label, slug]) => `<div><strong><a href="${hrefForCz(slug)}">${esc(label)}</a></strong><span>Details, quote factors and what to send before ordering.</span></div>`).join("")}
        </div>
      </section>
      <section class="section content-blocks">
        <article><h2>Removal jobs</h2><p>Rubble, soil, concrete, wood, green waste and mixed construction waste are quoted by material type, weight, amount, access and disposal route.</p></article>
        <article><h2>Material delivery</h2><p>Sand, gravel, pea gravel, recycled aggregate, soil and concrete are delivered according to amount, availability, route and safe tipping place.</p></article>
        <article><h2>When to call</h2><p>Call if the job is urgent, the access is narrow, the container would stand in a street, or you are not sure how to sort the waste.</p></article>
      </section>
      <section class="section seo-panel"><h2>Common situations</h2><p>These guides help when the job is easier to describe as a real situation than a waste category.</p>${linkCloud(adviceLinks)}</section>
      <section class="cta-band"><h2>Need help choosing the right service?</h2><a class="btn btn-primary" href="contact.html#form"><i data-lucide="send" aria-hidden="true"></i>Send a short description</a></section>
    </main>`;
    return pageShell(page, body);
  },
  "pricing.html": () => {
    const faq = [
      ["Why is there no fixed price list?", "Container transport depends on route, load, amount, disposal or material source, access and timing."],
      ["What should I send for a fast quote?", "Address or map pin, material, estimated amount, preferred date, placement spot and a photo if access is not obvious."],
      ["Can similar jobs cost differently?", "Yes. The same volume can differ by weight, waste composition, route, permit needs or disposal point."],
      ["What do IČO, DIČ, DPH and VAT mean?", "IČO is Czech company ID, DIČ is a tax or VAT ID and DPH means VAT. VAT and documents are clarified before the job is confirmed."],
    ];
    const page = {
      en: "pricing.html",
      eyebrow: "Pricing",
      title: "Container price: what affects the quote",
      metaTitle: "Skip Hire & Container Pricing Prague | Kontejnerovka.cz",
      description: "How container hire, rubble removal, soil removal, waste removal and material delivery are priced. Quote by address, material, amount, access, disposal and VAT.",
      intro: "We do not guess a fixed price from the website alone. Send the address, load, amount and access details; we will confirm what is included, VAT and any factor that could change the price.",
      schema: [localBusinessSchema(), breadcrumb({ en: "pricing.html", title: "Pricing" }), faqSchema({ faq })],
    };
    const body = `<main class="page-main">
      ${subHero(page, "Call and confirm price", "Send quote details")}
      ${geoSummary({
        heading: "Pricing in one answer",
        text: "Kontejnerovka.cz does not publish one fixed container price because transport, material, disposal, weight, access, standing time and VAT can change the quote. The price basis is confirmed before dispatch.",
        facts: ["Main factors: address, route, material, amount, access and timing", "Photos usually speed up quoting", "VAT and what is included are clarified before the job"],
      })}
      ${expatPracticalities()}
      ${englishPriceCalculator()}
      <section class="section"><div class="price-grid">
        <article><span>1</span><h2>Route</h2><p>Distance, route, timing, ability to turn or wait on site and the nearest suitable disposal or material source.</p></article>
        <article><span>2</span><h2>Material</h2><p>Clean rubble, soil, concrete, wood, green waste and mixed waste are not handled or priced the same way.</p></article>
        <article><span>3</span><h2>Amount and weight</h2><p>Soil, concrete and rubble are weight-sensitive. Bulky clearance waste is usually volume-sensitive.</p></article>
        <article><span>4</span><h2>Access</h2><p>Street placement, narrow driveways, waiting, loading conditions and permits can affect the final quote.</p></article>
      </div></section>
      <section class="section price-note"><h2>What to send for a quote</h2>${checkList(["address, town or map pin", "what will be removed or delivered", "approximate amount", "preferred date and standing time", "photo of the material or access if useful"])}</section>
      <section class="section service-note"><p class="eyebrow">Transparency</p><h2>We confirm the price basis before dispatch</h2><p>The goal is to avoid surprises. Before sending the truck, we clarify whether the quote includes VAT, transport, disposal fee or delivered material and what would change the price.</p></section>
      <section class="section content-blocks"><article><h2>Closest routes can help planning</h2><p>Svárov, Unhošť, Nučice, Rudná, Hostivice, Kladno and Prague-West are practical areas for route planning, but the final quote still depends on the load and access.</p></article><article><h2>Photos save time</h2><p>A photo can show material composition, volume, entrance width, slope, parked cars and the space needed for safe placement.</p></article><article><h2>VAT and documents</h2><p>Kontejnerovka.cz is operated by Matyáš Mašín, VAT payer. We clarify VAT, invoices and any Czech admin wording before the job is confirmed.</p></article></section>
      ${czechBusinessTerms()}
      ${faqSection("Pricing questions", faq)}
      <section class="cta-band"><h2>Want a realistic price for your address?</h2><a class="btn btn-primary" href="contact.html#form"><i data-lucide="send" aria-hidden="true"></i>Send details for pricing</a></section>
    </main>`;
    return pageShell(page, body);
  },
  "areas.html": () => {
    const page = {
      en: "areas.html",
      eyebrow: "Areas",
      title: "Container service areas in Prague and Central Bohemia",
      metaTitle: "Service Areas | Containers Prague and Central Bohemia",
      description: "Container delivery, waste removal and material delivery across Prague and Central Bohemia, focused on Prague-West, Unhošť, Nučice, Rudná and Kladno.",
      intro: "Every job is quoted by route, load, amount and access. The closest practical areas are around Svárov, Unhošť, Nučice, Rudná, Kladno, Hostivice and Prague-West.",
      schema: [localBusinessSchema(), { "@context": "https://schema.org", "@type": "CollectionPage", name: "Kontejnerovka.cz service areas", url: enUrl("areas.html"), about: "Container service areas in Prague and Central Bohemia", isPartOf: { "@id": websiteId } }, breadcrumb({ en: "areas.html", title: "Areas" })],
    };
    const body = `<main class="page-main">
      ${subHero(page, "Ask about your area", "Send the address")}
      ${geoSummary({
        heading: "Service area in one answer",
        text: "Kontejnerovka.cz serves Prague and Central Bohemia, especially Prague-West, Unhošť, Svárov, Nučice, Rudná, Kladno, Hostivice and Beroun. Wider routes are quoted by exact address and job details.",
        facts: ["Closest practical routes: Svárov, Unhošť, Nučice, Rudná and Hostivice", "Prague districts are quoted by access and placement spot", "Further Central Bohemia is quoted by route and amount"],
      })}
      ${expatPracticalities()}
      <section class="section location-sections">
        ${locationPages.map((item) => `<article><h2>${esc(item.name)}</h2><p>${esc(item.local)}. Common jobs: ${esc(item.focus)}. ${esc(item.note)}</p><a class="text-link" href="${hrefForCz(item.cz)}">View ${esc(item.name)}</a></article>`).join("")}
      </section>
      <section class="section content-blocks"><article><h2>Prague</h2><p>Access, street placement and district rules are often the key points. Send the district and whether the container can stand on private land, a street or a pavement.</p></article><article><h2>Prague-West and nearby towns</h2><p>Svárov, Unhošť, Nučice, Rudná, Hostivice and Kladno are practical for route planning and combined removal or delivery. Prague-West is a Central Bohemian district, not the same as Prague 5.</p></article><article><h2>Further Central Bohemia</h2><p>Beroun, Rakovník, Slaný, Hořovice, Zdice and Králův Dvůr are quoted by exact address, amount and route. A map pin is enough if local names are confusing.</p></article></section>
      <section class="cta-band"><h2>Not sure whether we serve your address?</h2><a class="btn btn-primary" href="contact.html#form"><i data-lucide="send" aria-hidden="true"></i>Send your town and job details</a></section>
    </main>`;
    return pageShell(page, body);
  },
  "about.html": () => {
    const page = {
      en: "about.html",
      eyebrow: "About",
      title: "Local container service for Prague, Unhošť and Central Bohemia",
      metaTitle: "About Kontejnerovka.cz | Container Service Prague",
      description: "Kontejnerovka.cz is a local container transport service operated by Matyáš Mašín, company ID 01379178, VAT payer, serving Prague and Central Bohemia.",
      intro: "Kontejnerovka.cz helps households, builders and companies arrange container delivery, waste removal and material delivery without unnecessary complexity.",
      schema: [localBusinessSchema(), breadcrumb({ en: "about.html", title: "About" })],
    };
    const body = `<main class="page-main">
      ${subHero(page, "Call about a job", "Send job details")}
      ${geoSummary({
        heading: "Company facts",
        text: "Kontejnerovka.cz is operated by Matyáš Mašín, company ID 01379178, VAT ID CZ9211070033. The service focuses on container transport, waste removal and material delivery in Prague and Central Bohemia.",
        facts: ["Public contact: +420 738 505 028 and info@kontejnerovka.cz", "Address: Holýšovská 2923/4, Stodůlky, 155 00 Prague 5", "Google Business Profile is linked for verification"],
      })}
      <section class="section proof-strip" aria-label="Company details"><article><i data-lucide="user-check" aria-hidden="true"></i><strong>Operator</strong><span>Matyáš Mašín</span></article><article><i data-lucide="receipt" aria-hidden="true"></i><strong>Company and VAT</strong><span>ID 01379178, VAT ID CZ9211070033</span></article><article><i data-lucide="map-pin" aria-hidden="true"></i><strong>Local focus</strong><span>Svárov, Unhošť, Nučice, Rudná, Kladno, Hostivice and Prague-West</span></article></section>
      <section class="section content-blocks"><article><h2>What we do most often</h2><p>Container delivery, rubble removal, soil removal, wood and green waste removal, mixed waste by agreement and delivery of sand, gravel, pea gravel, recycled aggregate, soil and concrete.</p></article><article><h2>How we communicate</h2><p>We ask for the address or map pin, material, amount, access and photo when useful. The aim is a clear arrangement before dispatch, not a vague promise.</p></article><article><h2>Why the details are public</h2><p>A local service should be verifiable. The website shows the operator, company ID, VAT ID, address, phone, email and Google Business Profile.</p></article></section>
      ${czechBusinessTerms()}
      <section class="section service-note"><p class="eyebrow">Trust</p><h2>Real proof is better than inflated claims</h2><p>We do not add invented reviews or pretend stock photos are finished jobs. References and photos belong on the website only when they are based on real work.</p></section>
      <section class="section seo-panel"><h2>Useful pages</h2><p>Learn how the service works before ordering.</p>${linkCloud([["Equipment and access", "technika.html"], ["References and proof", "reference.html"], ["Pricing", "cenik.html"], ["Contact", "kontakt.html"]])}</section>
      <section class="cta-band"><h2>Want to discuss a specific container job?</h2><a class="btn btn-primary" href="contact.html#form"><i data-lucide="send" aria-hidden="true"></i>Send details</a></section>
    </main>`;
    return pageShell(page, body);
  },
  "references.html": () => {
    const page = {
      en: "references.html",
      eyebrow: "References",
      title: "References, photos and proof without fake reviews",
      metaTitle: "References and Photos | Kontejnerovka.cz",
      description: "How Kontejnerovka.cz works with references: real photos, verifiable Google profile and no invented reviews or borrowed project claims.",
      intro: "References should be honest. We use real photos and verifiable reviews only when there is a true basis for them.",
      schema: [localBusinessSchema(), { "@context": "https://schema.org", "@type": "CollectionPage", name: "References and photos", url: enUrl("references.html"), description: "Real project proof and reference policy for Kontejnerovka.cz", isPartOf: { "@id": websiteId }, about: providerRef }, breadcrumb({ en: "references.html", title: "References" })],
    };
    const body = `<main class="page-main">
      ${subHero(page, "Call about a job", "Send a request")}
      ${geoSummary({
        heading: "Reference policy in one answer",
        text: "Kontejnerovka.cz publishes references and photos only when they are based on real jobs, verifiable reviews or customer-approved material. It does not use invented reviews or borrowed project photos.",
        facts: ["Useful reference: location, load type, access situation, result and photo", "No fake names or exaggerated claims", "Google Business Profile is the verifiable review source"],
      })}
      <section class="section proof-strip" aria-label="Trust proof"><article><i data-lucide="camera" aria-hidden="true"></i><strong>Real photos</strong><span>Vehicle, container, access and material when based on real jobs</span></article><article><i data-lucide="star" aria-hidden="true"></i><strong>Google profile</strong><span><a href="https://share.google/3gRahFm7A2awhEeJJ" target="_blank" rel="noopener">Verifiable business profile</a></span></article><article><i data-lucide="shield-check" aria-hidden="true"></i><strong>No invented reviews</strong><span>Trust must be built on real work and customer consent</span></article></section>
      <section class="section content-blocks"><article><h2>What makes a useful reference</h2><p>A useful job example shows the location, load type, access situation and result. It does not need to reveal the customer's exact address.</p></article><article><h2>What we do not publish</h2><p>No fake customer names, invented praise, borrowed project photos or exaggerated claims such as "cheapest in Prague".</p></article><article><h2>What will be added over time</h2><p>Real job photos from Svárov, Unhošť, Nučice, Rudná, Kladno, Hostivice, Prague-West and other served areas when available.</p></article></section>
      <section class="section service-detail"><div class="section-head"><p class="eyebrow">Photo value</p><h2>Good photos explain the job</h2><p>For container transport, photos are not decoration. They help customers understand truck access, container placement, waste type and the scale of the job.</p></div><div class="detail-grid"><article><h3>Vehicle and container</h3><p>Shows the real equipment and how much space placement may need.</p></article><article><h3>Material</h3><p>Clean rubble, soil, wood, green waste or mixed waste should be labelled honestly.</p></article><article><h3>Local context</h3><p>Local work in familiar towns is more useful than generic claims.</p></article></div></section>
      <section class="cta-band"><h2>Need a job quoted, not a marketing promise?</h2><a class="btn btn-primary" href="contact.html#form"><i data-lucide="send" aria-hidden="true"></i>Send job details</a></section>
    </main>`;
    return pageShell(page, body);
  },
  "equipment.html": () => {
    const page = {
      en: "equipment.html",
      eyebrow: "Equipment and access",
      title: "Hook-loader container truck for removal and material delivery",
      metaTitle: "Equipment and Container Access | Kontejnerovka.cz",
      description: "Practical information about hook-loader container delivery, access, placement spot, material weight and what to send before dispatch.",
      intro: "Container transport depends on the truck, access, safe placement spot, material type and weight. A photo of the place often answers more than a long description.",
      schema: [localBusinessSchema(), { "@context": "https://schema.org", "@type": "WebPage", name: "Equipment and container access", url: enUrl("equipment.html"), isPartOf: { "@id": websiteId }, about: providerRef }, breadcrumb({ en: "equipment.html", title: "Equipment" })],
    };
    const body = `<main class="page-main">
      ${subHero(page, "Call about access", "Send a photo")}
      ${geoSummary({
        heading: "Equipment in one answer",
        text: "Container delivery depends on truck access, safe placement spot, material weight and whether the container can stand on private land or a public place. A photo of the access usually makes the quote faster.",
        facts: ["Heavy materials: rubble, concrete and wet soil", "Access issues: narrow driveways, slope, parked cars, branches, cables and soft ground", "Public street placement may require local permission"],
      })}
      <section class="section split" aria-labelledby="equipment-title"><picture class="split-image"><source srcset="../assets/site-machine.webp" type="image/webp"><img src="../assets/site-machine.jpg" alt="Construction machinery and container access area" width="1200" height="704" loading="lazy"></picture><div class="split-copy"><p class="eyebrow">Practical check</p><h2 id="equipment-title">First we check whether the container can be placed safely</h2><p>Access width, slope, parked cars, branches, cables, soft ground and space for manoeuvring can all matter. If the container stands on a public place, local rules may also apply.</p>${checkList(["address and town", "photo of the placement spot", "what will be removed or delivered", "estimated amount and preferred date"])}<a class="section-link" href="contact.html#form">Send access details</a></div></section>
      <section class="section service-detail"><div class="section-head"><p class="eyebrow">Weight and volume</p><h2>Container size is chosen by material, not just volume</h2><p>Light bulky material is different from heavy rubble, concrete or wet soil. The safe solution depends on both volume and weight.</p></div><div class="detail-grid"><article><h3>Rubble and concrete</h3><p>Heavy material where clean sorting and safe weight matter.</p></article><article><h3>Soil</h3><p>Moisture, stones, roots and volume can change the job quickly.</p></article><article><h3>Wood and green waste</h3><p>Usually more volume-sensitive, but mixed material must be described.</p></article></div></section>
      <section class="section seo-panel"><h2>Related practical pages</h2><p>These pages help with access, permit and material decisions.</p>${linkCloud([["Container delivery", "pristaveni-kontejneru.html"], ["Permit in Prague", "povoleni-kontejner-praha.html"], ["Rubble container", "kontejner-na-sut.html"], ["Soil container", "kontejner-na-zeminu.html"]])}</section>
      <section class="cta-band"><h2>Unsure whether the truck can access the place?</h2><a class="btn btn-primary" href="contact.html#form"><i data-lucide="send" aria-hidden="true"></i>Send a photo of the access</a></section>
    </main>`;
    return pageShell(page, body);
  },
  "contact.html": () => {
    const page = {
      en: "contact.html",
      eyebrow: "Contact",
      title: "Call or send details for a container quote",
      metaTitle: "Contact & Container Ordering | Prague Area | Kontejnerovka.cz",
      description: "Contact Kontejnerovka.cz for container hire, rubble removal, soil removal, waste removal or material delivery in Prague and Central Bohemia.",
      intro: "Calling is fastest and we speak English. For a more accurate quote, send the town, material, amount, date, access and ideally a photo.",
      hasForm: true,
      schema: [localBusinessSchema(), { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Kontejnerovka.cz", url: enUrl("contact.html"), about: providerRef, isPartOf: { "@id": websiteId } }, breadcrumb({ en: "contact.html", title: "Contact" })],
    };
    const body = `<main class="page-main">
      ${subHero(page, "Call +420 738 505 028", "Send a quote request")}
      <section class="section proof-strip" aria-label="Contact details"><article><i data-lucide="phone" aria-hidden="true"></i><strong>Phone</strong><span>+420 738 505 028</span></article><article><i data-lucide="mail" aria-hidden="true"></i><strong>Email</strong><span>info@kontejnerovka.cz</span></article><article><i data-lucide="receipt" aria-hidden="true"></i><strong>VAT payer</strong><span>ID 01379178, VAT ID CZ9211070033</span></article><article><i data-lucide="map" aria-hidden="true"></i><strong>Google profile</strong><span><a href="https://share.google/3gRahFm7A2awhEeJJ" target="_blank" rel="noopener">Verify the business</a></span></article></section>
      <section class="section content-blocks"><article><h2>What to say by phone</h2><p>Town or map pin, material, approximate amount, date and access. If you do not know the container size, describe the job and we will discuss it.</p></article><article><h2>What to send in the form</h2><p>Address or map pin, material, amount, access, placement spot and a photo. In Prague, add the city district and whether the container must stand in the street or on the pavement.</p></article><article><h2>Closest areas</h2><p>Svárov, Unhošť, Nučice, Rudná, Hostivice, Prague-West and Kladno are strong route areas. Prague and wider Central Bohemia are quoted by job.</p></article></section>
      ${expatPracticalities()}
      ${contactSection(page)}
      <section class="section service-note"><p class="eyebrow">Company details</p><h2>Contact and invoicing details are public</h2><p>Operator: Matyáš Mašín. Company ID 01379178, VAT ID CZ9211070033, VAT payer. Address: Holýšovská 2923/4, Stodůlky, 155 00 Prague 5. A <a href="https://share.google/3gRahFm7A2awhEeJJ" target="_blank" rel="noopener">Google Business Profile</a> is available for verification.</p></section>
      ${czechBusinessTerms()}
    </main>`;
    return pageShell(page, body);
  },
  "guide.html": () => {
    const faq = [
      ["What is the easiest way to ask for a quote?", "Send the address or map pin, material, approximate amount, access and a photo."],
      ["Should I sort waste before ordering?", "Yes. Clean rubble, soil, wood and mixed waste can have different routes and prices."],
      ["Do I need a street permit?", "If the container stands on a public place, local rules may apply. Check the municipality or Prague district."],
      ["What is a zábor?", "Zábor means temporary use or occupation of public space. It may matter when a container stands on a street, pavement or other public area."],
    ];
    const page = {
      en: "guide.html",
      eyebrow: "Guide",
      title: "Practical guide to containers, waste sorting and material delivery",
      metaTitle: "Container Guide Prague | Kontejnerovka.cz",
      description: "Practical English guide for ordering a waste container in Prague and Central Bohemia: sorting rubble, soil, mixed waste, permits, photos and quote details.",
      intro: "If you do not know Czech waste terms, start with a simple description and a photo. The guide explains what usually matters before ordering.",
      schema: [localBusinessSchema(), breadcrumb({ en: "guide.html", title: "Guide" }), faqSchema({ faq })],
    };
    const body = `<main class="page-main">
      ${subHero(page, "Call for advice", "Send a photo")}
      ${geoSummary({
        heading: "Guide in one answer",
        text: "English-speaking customers can order a container without knowing Czech waste category names. Kontejnerovka.cz can start from a plain description, exact address, amount, access and a photo.",
        facts: ["Clean rubble, soil, wood, green waste and mixed waste are different categories", "Street placement may require local rules or permission", "A photo of waste and access reduces quoting errors"],
      })}
      <section class="section content-blocks"><article><h2>Sort before mixing</h2><p>Clean rubble, soil, wood, green waste and mixed waste are not the same. Mixing can change the quote or make disposal harder.</p></article><article><h2>Photos are useful</h2><p>A photo of the pile, access and placement spot makes the quote faster and reduces back-and-forth. A map pin is also useful if the address is hard to describe in Czech.</p></article><article><h2>Street placement</h2><p>If the container stands on a street, pavement or public area, local rules may apply before choosing the date. In Czech this is often connected with the word <strong>zábor</strong>.</p></article></section>
      <section class="section service-note" aria-label="Glossary for English-speaking customers">
        <p class="eyebrow">Expat glossary</p>
        <h2>Useful Czech waste terms in plain English</h2>
        <p><strong>Suť</strong> means rubble from renovation or demolition. <strong>Zemina</strong> means soil or excavation material. <strong>Směsný stavební odpad</strong> means mixed construction waste. <strong>Recyklát</strong> means recycled aggregate, often used for base layers or access roads. <strong>Zábor</strong> means temporary occupation of public space, often relevant for a container on a street or pavement. <strong>Skládka</strong> means landfill or disposal site. <strong>IČO</strong> is Czech company ID, <strong>DIČ</strong> is a tax or VAT ID and <strong>DPH</strong> means VAT.</p>
      </section>
      ${expatPracticalities()}
      ${faqSection("Guide questions", faq)}
      <section class="section service-detail"><div class="section-head"><p class="eyebrow">High-intent guides</p><h2>Common questions before ordering</h2><p>These pages are written for real situations rather than generic SEO phrases.</p></div><div class="detail-grid">${adviceLinks.map(([label, slug]) => `<article><h3><a href="${hrefForCz(slug)}">${esc(label)}</a></h3><p>Practical notes on what to send, what affects the price and what to check before ordering.</p></article>`).join("")}</div></section>
      <section class="section seo-panel"><h2>Service pages</h2><p>Use these when you already know the service or material.</p>${linkCloud(serviceLinks.slice(0, 12))}</section>
      <section class="cta-band"><h2>Still unsure what category your waste is?</h2><a class="btn btn-primary" href="contact.html#form"><i data-lucide="send" aria-hidden="true"></i>Send a photo and short note</a></section>
    </main>`;
    return pageShell(page, body);
  },
};

const utilityPages = {
  "thank-you.html": () => {
    const page = {
      en: "thank-you.html",
      cz: "dekujeme.html",
      noindex: true,
      eyebrow: "Quote request",
      title: "Thank you, your request has been sent",
      metaTitle: "Thank you | Kontejnerovka.cz",
      description: "Thank you for sending your quote request. We will get back with the price, timing or a request for missing details.",
      intro: "We will reply with the quote or ask for missing details. If you need the container urgently, call +420 738 505 028.",
      schema: [{ "@context": "https://schema.org", "@type": "WebPage", name: "Thank you", url: enUrl("thank-you.html"), isPartOf: { "@id": websiteId }, about: providerRef }],
    };
    const body = `<main class="page-main"><section class="subpage-hero"><p class="eyebrow">Quote request</p><h1>Thank you, your request has been sent</h1><p>We will get back with the price or missing details. If you need the container quickly, call +420&nbsp;738&nbsp;505&nbsp;028.</p><p>If you have not sent a photo of the waste, placement spot or access yet, send it now by SMS, WhatsApp or email. It often speeds up the exact quote.</p><div class="hero-actions"><a class="btn btn-primary" href="tel:+420738505028"><i data-lucide="phone-call" aria-hidden="true"></i>Call</a><a class="btn btn-dark" href="/en/"><i data-lucide="home" aria-hidden="true"></i>Back to the website</a></div></section></main>`;
    return pageShell(page, body);
  },
  "privacy.html": () => {
    const page = {
      en: "privacy.html",
      cz: "ochrana-osobnich-udaju.html",
      noindex: true,
      eyebrow: "Privacy",
      title: "Privacy policy and cookies",
      metaTitle: "Privacy Policy | Kontejnerovka.cz",
      description: "Information about personal data processing and optional analytics cookies on the English Kontejnerovka.cz website.",
      intro: "Personal data is used mainly to handle quote requests. Optional analytics cookies run only with consent.",
      schema: [localBusinessSchema(), { "@context": "https://schema.org", "@type": "WebPage", name: "Privacy policy and cookies", url: enUrl("privacy.html"), isPartOf: { "@id": websiteId }, about: providerRef }],
    };
    const body = `<main class="page-main">
      <section class="subpage-hero"><p class="eyebrow">Privacy</p><h1>Privacy policy and cookies</h1><p>Personal data is used mainly to handle quote requests. Optional analytics cookies run only with consent.</p></section>
      <section class="section content-blocks">
        <article><h2>Data controller</h2><p>The controller is Matyáš Mašín, company ID 01379178, VAT ID CZ9211070033, Holýšovská 2923/4, Stodůlky, 155 00 Prague 5. Contact: <a href="mailto:info@kontejnerovka.cz">info@kontejnerovka.cz</a>, <a href="tel:+420738505028">+420&nbsp;738&nbsp;505&nbsp;028</a>.</p></article>
        <article><h2>What data we process</h2><p>When you send a request, we process the details you provide: name, phone, email, location, preferred date, service description, amount, access and notes.</p></article>
        <article><h2>Form and email</h2><p>The website form uses Web3Forms to deliver the request to info@kontejnerovka.cz. You can also call or send an email directly.</p></article>
        <article><h2>Analytics and cookies</h2><p>The website may use Google Analytics 4 to measure visits and interactions such as phone clicks, email clicks, main CTA clicks, form starts and form submissions. We do not send names, phone numbers, emails or exact form locations to analytics.</p></article>
        <article><h2>Legal basis and retention</h2><p>Quote request data is processed to discuss and arrange a job. Accounting details are retained according to legal obligations. Analytics is processed only with consent.</p></article>
        <article><h2>Your rights</h2><p>You may request access, correction, deletion, restriction or object to processing. You may also contact the Czech Office for Personal Data Protection.</p></article>
      </section>
    </main>`;
    return pageShell(page, body);
  },
  "404.html": () => {
    const page = {
      en: "404.html",
      cz: "404.html",
      noindex: true,
      eyebrow: "404",
      title: "Page not found",
      metaTitle: "Page Not Found | Kontejnerovka.cz",
      description: "The page was not found. Continue to services, pricing or contact Kontejnerovka.cz.",
      intro: "The address may have changed. Continue to the homepage, services, pricing or call directly.",
      schema: [{ "@context": "https://schema.org", "@type": "WebPage", name: "Page not found", url: enUrl("404.html"), isPartOf: { "@id": websiteId }, about: providerRef }],
    };
    const body = `<main class="page-main"><section class="subpage-hero"><p class="eyebrow">404</p><h1>Page not found</h1><p>The address may have changed. Continue to the homepage, services, pricing or call directly.</p><div class="hero-actions"><a class="btn btn-primary" href="/en/"><i data-lucide="home" aria-hidden="true"></i>Homepage</a><a class="btn btn-dark" href="tel:+420738505028"><i data-lucide="phone-call" aria-hidden="true"></i>Call</a></div></section></main>`;
    return pageShell(page, body);
  },
};

const writeEnglishPages = () => {
  mkdirSync(enDir, { recursive: true });

  for (const pair of pairs) {
    const filename = pair.en || "index.html";
    let html;

    if (corePages[pair.en]) {
      html = corePages[pair.en]();
    } else {
      const service = servicePages.find((page) => page.cz === pair.cz);
      const advice = advicePages.find((page) => page.cz === pair.cz);
      const location = locationPages.find((page) => page.cz === pair.cz);
      if (service) html = renderServicePage(service);
      if (advice) html = renderAdvicePage(advice);
      if (location) html = renderLocationPage(location);
      if (!html) throw new Error(`Missing English page data for ${pair.cz}`);
    }

    writeFileSync(path.join(enDir, filename), html, "utf8");
  }

  for (const [filename, render] of Object.entries(utilityPages)) {
    writeFileSync(path.join(enDir, filename), render(), "utf8");
  }
};

const hreflangBlock = (pair) => `<link rel="alternate" hreflang="cs" href="${czUrl(pair.cz)}">
    <link rel="alternate" hreflang="en" href="${enUrl(pair.en)}">
    <link rel="alternate" hreflang="x-default" href="${czUrl(pair.cz)}">`;

const czechLanguageSwitcher = (enSlug, czSlug = pairByEn.get(enSlug)?.cz || "") =>
  `<div class="language-switcher" aria-label="Jazyk webu"><a class="is-active" href="${czPath(czSlug)}" lang="cs" aria-current="page">CZ</a><a href="${enPath(enSlug)}" hreflang="en" lang="en">EN</a></div>`;

const applyCzechHeaderSwitcher = (html, enSlug, czSlug) => {
  const switcher = czechLanguageSwitcher(enSlug, czSlug);
  let next = html
    .replace(/\s*<a href="\/en\/[^"]*" hreflang="en" lang="en">English<\/a>/g, "")
    .replace(/\s*<a href="\/en\/[^"]*" hreflang="en" lang="en">EN<\/a>/g, "");

  if (next.includes('class="language-switcher"')) {
    next = next.replace(/<div class="language-switcher"[\s\S]*?<\/div>/, switcher);
    return next;
  }

  const fullHeaderControls = /(\s*)<button class="nav-toggle"[\s\S]*?<\/button>(\s*)<nav class="site-nav" id="site-nav" data-nav>[\s\S]*?<\/nav>(\s*)<a class="header-call"[\s\S]*?<\/a>/;
  if (fullHeaderControls.test(next)) {
    next = next.replace(fullHeaderControls, (match, indent) => {
      const button = match.match(/<button class="nav-toggle"[\s\S]*?<\/button>/)?.[0] || "";
      const nav = match.match(/<nav class="site-nav" id="site-nav" data-nav>[\s\S]*?<\/nav>/)?.[0] || "";
      const call = match.match(/<a class="header-call"[\s\S]*?<\/a>/)?.[0] || "";
      return `${indent}${nav}${indent}<div class="header-actions">${switcher}${button}${call}</div>`;
    });
    return next;
  }

  return next.replace(/(\s*)<a class="header-call"[\s\S]*?<\/a>/, (match, indent) => `${indent}<div class="header-actions">${switcher}${match.trim()}</div>`);
};

const injectCzechHreflangAndNav = () => {
  for (const pair of pairs) {
    const file = path.join(rootDir, pair.cz || "index.html");
    let html = readFileSync(file, "utf8");

    html = html.replace(/\n\s*<link rel="alternate" hreflang="cs"[^>]+>\n\s*<link rel="alternate" hreflang="en"[^>]+>\n\s*<link rel="alternate" hreflang="x-default"[^>]+>/g, "");
    if (!pair.enNoindex) {
      const block = hreflangBlock(pair);
      if (html.includes('<link rel="canonical"')) {
        html = html.replace(/(<link rel="canonical" href="[^"]+">)/, `$1\n    ${block}`);
      }
    }

    html = applyCzechHeaderSwitcher(html, pair.en, pair.cz);

    writeFileSync(file, html, "utf8");
  }

  for (const [czFile, enSlug] of [
    ["404.html", "404.html"],
    ["dekujeme.html", "thank-you.html"],
    ["ochrana-osobnich-udaju.html", "privacy.html"],
  ]) {
    const file = path.join(rootDir, czFile);
    if (!readFileSync(file, "utf8")) continue;
    const html = applyCzechHeaderSwitcher(readFileSync(file, "utf8"), enSlug, czFile);
    writeFileSync(file, html, "utf8");
  }
};

const sitemapEntry = (loc, pair, relFile) => `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="cs" href="${czUrl(pair.cz)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl(pair.en)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${czUrl(pair.cz)}" />
    <lastmod>${fileLastmod(relFile)}</lastmod>
    <changefreq>${pair.changefreq}</changefreq>
    <priority>${pair.priority}</priority>
  </url>`;

const czOnlyPages = [
  { file: "zemni-prace.html", priority: "0.85", changefreq: "weekly" },
  { file: "vykop-zakladu.html", priority: "0.8", changefreq: "monthly" },
  { file: "vykop-bazenu.html", priority: "0.8", changefreq: "monthly" },
  { file: "vykop-jezirka.html", priority: "0.8", changefreq: "monthly" },
  { file: "odbahneni-rybniku.html", priority: "0.8", changefreq: "monthly" },
  { file: "rovnani-terenu.html", priority: "0.8", changefreq: "monthly" },
];

const writeSitemap = () => {
  const plainEntry = (loc, pair, relFile) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${fileLastmod(relFile)}</lastmod>
    <changefreq>${pair.changefreq}</changefreq>
    <priority>${pair.priority}</priority>
  </url>`;
  const entries = pairs.flatMap((pair) => pair.enNoindex
    ? [plainEntry(czUrl(pair.cz), pair, pair.cz || "index.html")]
    : [sitemapEntry(czUrl(pair.cz), pair, pair.cz || "index.html"), sitemapEntry(enUrl(pair.en), pair, `en/${pair.en || "index.html"}`)]).concat(czOnlyPages.map((p) => plainEntry(`${baseUrl}/${p.file}`, p, p.file))).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
  writeFileSync(path.join(rootDir, "sitemap.xml"), sitemap, "utf8");
};

writeEnglishPages();
injectCzechHreflangAndNav();
writeSitemap();

console.log(`Generated ${pairs.length} English pages, ${Object.keys(utilityPages).length} utility pages and bilingual sitemap.`);
