/*
# NammaMate — Create categories, phrases, and favorites tables

1. Overview
NammaMate is a no-auth, single-tenant Kannada communication assistant.
Users browse situation categories and learn useful Kannada phrases.
Favorites are stored per-device using a locally-generated anonymous ID.

2. New Tables
- `categories`
  - `id` (uuid PK)
  - `slug` (text, unique) — URL-safe identifier (e.g. "travel")
  - `title` (text) — display title (e.g. "Travel & Transportation")
  - `description` (text) — short description shown on cards
  - `icon` (text) — Lucide icon name for the card
  - `color` (text) — hex or tailwind color reference for theming the card
  - `sort_order` (int, default 0) — controls display order
  - `created_at` (timestamptz)

- `phrases`
  - `id` (uuid PK)
  - `category_id` (uuid FK → categories.id ON DELETE CASCADE)
  - `kannada` (text) — the Kannada phrase
  - `kannada_script` (text) — same as kannada but kept for clarity / future transliteration
  - `english` (text) — English translation
  - `transliteration` (text) — Romanized pronunciation guide
  - `context` (text, nullable) — usage note or scenario hint
  - `sort_order` (int, default 0)
  - `created_at` (timestamptz)

- `favorites`
  - `id` (uuid PK)
  - `device_id` (text) — anonymous per-device identifier
  - `phrase_id` (uuid FK → phrases.id ON DELETE CASCADE)
  - `created_at` (timestamptz)
  - Unique constraint on (device_id, phrase_id)

3. Security
- Enable RLS on all tables.
- categories & phrases: public read (anon + authenticated SELECT only).
- favorites: anon + authenticated full CRUD — data is scoped by device_id which the client controls.
- `USING (true)` is acceptable here because the data is intentionally public (categories/phrases) or device-scoped with no sign-in (favorites).
*/

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'MessageCircle',
  color text NOT NULL DEFAULT '#102B28',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON categories TO anon, authenticated;

-- Phrases
CREATE TABLE IF NOT EXISTS phrases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  kannada text NOT NULL,
  kannada_script text NOT NULL,
  english text NOT NULL,
  transliteration text NOT NULL,
  context text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE phrases ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON phrases TO anon, authenticated;

CREATE INDEX IF NOT EXISTS idx_phrases_category_id ON phrases(category_id);

-- Favorites
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id text NOT NULL,
  phrase_id uuid NOT NULL REFERENCES phrases(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT favorites_device_phrase_unique UNIQUE (device_id, phrase_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON favorites TO anon, authenticated;

CREATE INDEX IF NOT EXISTS idx_favorites_device_id ON favorites(device_id);

-- Policies for categories (public read)
DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- Policies for phrases (public read)
DROP POLICY IF EXISTS "anon_select_phrases" ON phrases;
CREATE POLICY "anon_select_phrases" ON phrases FOR SELECT
  TO anon, authenticated USING (true);

-- Policies for favorites (device-scoped CRUD)
DROP POLICY IF EXISTS "anon_select_favorites" ON favorites;
CREATE POLICY "anon_select_favorites" ON favorites FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_favorites" ON favorites;
CREATE POLICY "anon_insert_favorites" ON favorites FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_favorites" ON favorites;
CREATE POLICY "anon_update_favorites" ON favorites FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_favorites" ON favorites;
CREATE POLICY "anon_delete_favorites" ON favorites FOR DELETE
  TO anon, authenticated USING (true);
