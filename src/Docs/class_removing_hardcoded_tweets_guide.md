# Class Guide: Move tweets to JSON and add Yap button

This guide explains the minimal edits made so students can follow along step-by-step.

Files changed:

- [src/data/tweets.json](src/data/tweets.json)
- [src/App.tsx](src/App.tsx)

Summary of changes (line-oriented explanation):

1. Import JSON and React state

- Added: `import tweetsData from "./data/tweets.json";`
  - Purpose: load the initial tweet list from a separate file instead of hardcoding in the component.

- Added: `const [tweets, setTweets] = useState<Tweet[]>(tweetsData as Tweet[]);`
  - Purpose: hold tweets in React state so new posts update the UI immediately.

2. Add a short `Tweet` type

- Added the `Tweet` TypeScript type so the students can see what fields a tweet may have.

3. Add input state and Yap handler

- Added: `const [input, setInput] = useState("");`
  - Purpose: keep the current input text.

- Added `handleYap()` function which:
  - ignores empty input,
  - creates a minimal `newTweet` with placeholders (name: "Student", username: "@you"),
  - prepends the new tweet into `tweets` via `setTweets`,
  - clears the input.

4. Wire the input and button

- Changed the `<Input />` to controlled input: `value={input}` and `onChange={(e) => setInput(e.target.value)}`.
- Added `onClick={handleYap}` to the `Yap` button.

5. Defensive rendering for missing fields

- When rendering name, username, time, likes, replies we used `??` defaults so missing fields don't break the UI. This simplifies the lesson because students don't need to supply every field yet.

How to teach this in class (simple steps):

1. Show `src/data/tweets.json` — explain it's plain JSON and easy to edit.
2. Open `src/App.tsx` and show the `import tweetsData` and `useState` lines.
3. Run the app and show the existing tweets load from the JSON file.
4. Explain controlled inputs and wire the `Yap` button (demonstrate `handleYap`).
5. Modify `tweets.json` live or add a new post with the `Yap` button.

Optional extensions (after students finish):

- Add an author input so students can enter their name/username.
- Persist tweets to `localStorage` so posts survive reloads.
- Add simple validation (max length, empty-check with an error message).

If you want, I can also:

- Add an exercise handout with step-by-step commands and checkpoints.
- Implement `localStorage` persistence now.

Part 2 — Relative timestamps

What's changed:

- Each tweet in [src/data/tweets.json](src/data/tweets.json) now includes a `createdAt` ISO string (e.g. `2026-05-03T09:58:00.000Z`).
- `src/App.tsx` now:
  - uses `createdAt` instead of a `time` string,
  - includes a tiny `timeAgo()` helper that converts an ISO timestamp to `now`, `Xm`, `Xh`, or `Xd` for display,
  - sets `createdAt: new Date().toISOString()` when creating a new Yap so the post immediately shows a relative time.

Teaching notes for Part 2:

1. Explain why `createdAt` (an ISO timestamp) is better than a free-form `time` string — it can be converted to any relative format.
2. Show the `timeAgo()` helper and walk through the simple math (seconds → minutes → hours → days).
3. Demonstrate creating a new Yap and show the timestamp updates to `now` and then to `1m`, `2m`, etc., if you wait.

Labeling: treat this as "Part 2" in the lesson plan — Part 1 moved tweets to JSON + added Yap; Part 2 adds relative timestamps.
