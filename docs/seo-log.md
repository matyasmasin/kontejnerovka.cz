
## 2026-06-13 - pridan tydenni automat + SEO hlidac

Automation: Kontejnerovka - pojistka a automaticky beh

- Stav pred: funkcni Node pipeline (GSC+GA4 pres OAuth), ale bez tydenniho automatu a bez hlidace
- Overeno naživo: GSC fetch OK, GA4 funkcni (cred matyas.masin7, property 538305751)
- Created: `scripts/seo-watchdog.mjs` - hlida stari dat (GSC+GA4) v kontejnerovka-private-growth/data, zapisuje stav a heartbeat log; exit 0/1
- Verified: watchdog 🟢 OK (GSC 0 dni, GA4 4 dny)
- Scheduled task: `seo-tydenni-kontejnerovka` (pondeli 8:24) - fetch-google-data + watchdog + hlaseni semaforem
- Vse tri weby (parkovani, kontejnerovka, autoservis1) ted bezi na jednotnem Node systemu s tydenni pojistkou
