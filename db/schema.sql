CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL DEFAULT '',
  crest TEXT NOT NULL DEFAULT '',
  stadium TEXT NOT NULL DEFAULT '',
  capacity INTEGER,
  description TEXT NOT NULL DEFAULT '',
  extras JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  photo TEXT NOT NULL DEFAULT '',
  age TEXT NOT NULL DEFAULT '',
  position TEXT NOT NULL DEFAULT '',
  value TEXT NOT NULL DEFAULT '',
  club TEXT NOT NULL DEFAULT '',
  season TEXT NOT NULL DEFAULT '2026/2027',
  average_rating NUMERIC(4,2),
  stats JSONB NOT NULL DEFAULT '[]'::jsonb,
  extras JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS competitions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  season TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'league',
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  season TEXT NOT NULL,
  kickoff TEXT NOT NULL DEFAULT '',
  competition TEXT NOT NULL DEFAULT '',
  home_team TEXT NOT NULL,
  home_score INTEGER NOT NULL DEFAULT 0,
  away_team TEXT NOT NULL,
  away_score INTEGER NOT NULL DEFAULT 0,
  page TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'finished',
  date TEXT NOT NULL DEFAULT '',
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Kluby',
  summary TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  page TEXT NOT NULL DEFAULT '',
  published_at TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS transfers (
  id TEXT PRIMARY KEY,
  player TEXT NOT NULL,
  photo TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'TRANSFER',
  status TEXT NOT NULL DEFAULT 'Transfer',
  from_club TEXT NOT NULL DEFAULT '',
  to_club TEXT NOT NULL DEFAULT '',
  fee TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS injuries (
  id TEXT PRIMARY KEY,
  player TEXT NOT NULL,
  photo TEXT NOT NULL DEFAULT '',
  injury TEXT NOT NULL DEFAULT '',
  club TEXT NOT NULL DEFAULT '',
  position TEXT NOT NULL DEFAULT '',
  return_date TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Kontuzja',
  note TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS match_events (
  id TEXT PRIMARY KEY,
  match_id TEXT NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  minute TEXT NOT NULL DEFAULT '',
  team TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'goal',
  player TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  score TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS match_player_stats (
  id TEXT PRIMARY KEY,
  match_id TEXT NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  team TEXT NOT NULL DEFAULT '',
  player TEXT NOT NULL DEFAULT '',
  position TEXT NOT NULL DEFAULT '',
  rating NUMERIC(4,2),
  goals INTEGER NOT NULL DEFAULT 0,
  assists INTEGER NOT NULL DEFAULT 0,
  minutes INTEGER,
  details JSONB NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS matches_season_competition_idx ON matches(season, competition);
CREATE INDEX IF NOT EXISTS news_published_idx ON news(published_at);
CREATE INDEX IF NOT EXISTS players_season_club_idx ON players(season, club);
CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
