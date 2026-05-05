# Supabase Setup Guide (Read-only demo)

This repo uses Supabase for read-only access to a `tweets` table. The app fetches tweets unauthenticated using the public/anon key. No server or write setup is required for this simple demo.

Files to check:
- `src/lib/supabase.ts` — Supabase client used for reads
- `src/App.tsx` — app reads tweets from Supabase and shows them

---

## 1) Prerequisites
- Node.js and npm
- A Supabase account and project
- Vercel account (for deployment)
## 2) Create the `tweets` table (SQL)
Run this in Supabase → SQL editor. The block below creates the table, enables Row-Level Security (RLS), allows public reads, and adds a policy that permits authenticated inserts.

```sql
create extension if not exists pgcrypto;

create table tweets (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  name text,
  username text,
  user_id uuid,
  likes integer default 0,
  replies integer default 0,
  tag text,
  created_at timestamptz default now()
);

alter table tweets enable row level security;

-- allow public selects (anonymous reads)
create policy allow_read on tweets for select using (true);

-- allow inserts only for authenticated users; if `author_id` is provided it must match the signed-in user
create policy allow_insert_authenticated on tweets
  for insert
  with check (
    auth.uid() IS NOT NULL
    and (user_id is null or user_id = auth.uid())
  );
```

Notes:
- Reads are public so the demo app can fetch tweets anonymously using the anon key.
- Inserts require authentication; later you can enable Supabase Auth in the client and set `author_id = auth.uid()` when inserting.

3. In Supabase → Settings → API copy the Project URL and anon/public key.
4. Locally, create a `.env` with:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...anon...
```

5. Start the app:

```bash
npm install
npm run dev
```

The app will fetch tweets (reads only) using the anon key.

---


