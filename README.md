# FlashStroma 2.0

Pełna, responsywna aplikacja FlashStromy z panelem administratora i Neon PostgreSQL. Oryginalne strony HTML, artykuły, strony meczów i grafiki pozostają zachowane w `public/legacy`.

## W aplikacji

- Wyniki, sezony, ulubione, tabele i bezpośrednie mecze.
- Wiadomości, kluby i składy, profile zawodników, rozgrywki, transfery i kontuzje.
- Panel administratora do dodawania, edycji i usuwania danych.
- API dla Neon PostgreSQL, chronione hasłem administratora i podpisaną sesją.
- Import zachowanych danych oraz stron meczowych.

## Uruchomienie

Wymagany Node.js 20 lub nowszy.

1. Zainstaluj zależności: `npm install`
2. Skopiuj `.env.example` jako `.env` i ustaw `DATABASE_URL`, `ADMIN_PASSWORD` oraz `SESSION_SECRET`.
3. Uruchom: `npm start`
4. Otwórz `http://localhost:3000` i wybierz „Panel administratora”.

Przy pierwszym uruchomieniu z prawidłowym `DATABASE_URL` aplikacja tworzy tabele i automatycznie ładuje zachowane dane. Przygotowanie pliku danych można powtórzyć poleceniem `npm run db:import:legacy`; ponowne ładowanie do bazy wykonuje `npm run db:seed`.

## Neon i publikacja

W Neon Console wybierz projekt, kliknij **Connect**, zaznacz gałąź, bazę i rolę, a następnie skopiuj connection string. Połączenie może być pooled lub bezpośrednie.

To aplikacja z serwerem Node.js, a nie statyczna strona GitHub Pages. Opublikuj ją jako Web Service na hostingu Node, ustaw tam zmienne `DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET` i startuj przez `npm start`. Nie dodawaj pliku `.env` ani sekretów do GitHuba.
