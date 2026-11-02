# FlashStroma 2.0

Nowa, responsywna aplikacja FlashStromy z panelem administratora i Neon PostgreSQL. Oryginalne pliki HTML, artykuły, strony meczów i grafiki są zachowane w `public/legacy`.

## Co jest w aplikacji

- Wyniki, sezony, ulubione, tabele i bezpośrednie mecze.
- Wiadomości, kluby i składy, profile zawodników, rozgrywki, transfery i kontuzje.
- Panel administratora z dodawaniem, edycją i usuwaniem meczów, klubów, zawodników, rozgrywek, wiadomości, transferów, kontuzji, wydarzeń i statystyk meczowych.
- API zapisujące dane w Neon PostgreSQL. Panel jest chroniony hasłem administratora i podpisanym ciasteczkiem sesji.
- Import zachowanych danych z poprzedniej wersji.

## Uruchomienie

Wymagany Node.js 20 lub nowszy.

1. Zainstaluj zależność: `npm install`
2. Skopiuj `.env.example` do `.env` i ustaw wartości:
   - `DATABASE_URL` — connection string z panelu Neon (włącz SSL).
   - `ADMIN_PASSWORD` — własne, silne hasło do panelu.
   - `SESSION_SECRET` — losowy sekret o długości co najmniej 32 znaków.
3. Przygotuj tabele: `npm run db:migrate`
4. Odtwórz dane z oryginalnych stron: `npm run db:import:legacy`
5. Załaduj dane do bazy: `npm run db:seed`
6. Uruchom aplikację: `npm start`
7. Otwórz `http://localhost:3000`; panel jest pod „Panel administratora” w menu.

`db:import:legacy` można uruchomić ponownie po zmianie źródłowych plików w `public/legacy`. `db:seed` aktualizuje istniejące wpisy po ich identyfikatorze.

## Publikacja

To już aplikacja z serwerem Node.js, a nie wyłącznie statyczna strona GitHub Pages. Opublikuj katalog na hostingu obsługującym Node.js, ustaw tam trzy zmienne środowiskowe z `.env` i uruchom `npm start`. Neon musi być dostępny z hostingu. Nie commituj `.env` ani haseł.

Jeśli `DATABASE_URL` nie jest ustawione, aplikacja może wyświetlić zaimportowany plik `data/seed.json` w trybie podglądu, ale zmiany z panelu nie będą zapisywane.

