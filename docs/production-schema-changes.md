# Applying schema changes to production

This repo's local dev/preview database is a separate SQLite file
(`.wrangler/state/v3/d1/...`) from the production Cloudflare D1 database.
Deploying code (via `wrangler deploy` / your normal deploy flow) does **not**
create, alter, or drop collection tables in production — that was verified
directly: adding a collection to `seed.json` and querying it from a live page
returns an empty result instead of creating the table. EmDash's own
`.emdash/migrations.json` only tracks the *framework's* internal schema
(auth, plugins, menus, etc.), not project-defined collections.

So collection schema changes (adding `events` — see below) must be applied to
production **explicitly**, using the EmDash CLI's authenticated remote
commands, run by whoever has production access. This doc is that runbook.

## Prerequisites

You need admin credentials on the production EmDash instance. This can't use
the `localhost`-only auth bypass this session relied on for local testing.

```bash
npx emdash login --url https://<your-production-url>
```

This runs an OAuth device-flow login and stores credentials for subsequent
commands (or use `-t <token>` / `-H "Header: value"` per-command if you're
behind Cloudflare Access — see the `emdash-cli` skill for that flow).

All commands below assume you've either run `login` once, or you append
`--url https://<your-production-url>` to every command.

---

## 1. Add the `events` collection

### 1a. Create the collection

```bash
npx emdash schema create events --label Events --label-singular Event
```

### 1b. Add its fields

The CLI's `schema add-field --type` only lists
`string, text, number, integer, boolean, datetime, image, reference, portableText, json`
— no `url` type — so `register_url` uses `string` here instead of the `url`
type used in `seed.json`'s schema definition (functionally identical for our
use — it's just rendered as a plain link href, no format validation lost).

```bash
npx emdash schema add-field events title --type string --label "Title" --required
npx emdash schema add-field events term --type string --label "Date / Time" --required
npx emdash schema add-field events status_label --type string --label "Status Label" --required
npx emdash schema add-field events status_kind --type string --label "Status Kind (open, closed, or upcoming)" --required
npx emdash schema add-field events location --type string --label "Location"
npx emdash schema add-field events body --type text --label "Summary (HTML, shown on cards)" --required
npx emdash schema add-field events detail --type text --label "Details (HTML, shown on event page)"
npx emdash schema add-field events image --type string --label "Image Path" --required
npx emdash schema add-field events alt --type string --label "Image Alt Text"
npx emdash schema add-field events featured --type boolean --label "Featured on Homepage"
npx emdash schema add-field events register_url --type string --label "Registration URL"
```

Verify it landed correctly before moving on:

```bash
npx emdash schema get events
```

### 1c. Add the real event content

The CLI takes content as a JSON file (`--file`) or inline `--data`. Save each
of the 4 events below as its own file (e.g. `event-1.json`) and run:

```bash
npx emdash content create events --slug john-cominsky-youth-football-camp --file event-1.json
npx emdash content create events --slug under-the-lights-free-youth-football-camp --file event-2.json
npx emdash content create events --slug event-two-cblew --file event-3.json
npx emdash content create events --slug annual-dodgeball-tournament --file event-4.json
```

`create` auto-publishes by default, so no separate publish step is needed.

**event-1.json** (John Cominsky Youth Football Camp):
```json
{
	"title": "John Cominsky Youth Football Camp",
	"term": "June 26, 2026 · 6:45–9:15 PM",
	"status_label": "Open",
	"status_kind": "open",
	"location": "Barberton High School Stadium · 555 Barber Rd, Barberton, OH 44203",
	"body": "Free for all kids. <a href=\"#register\">Click here to register</a> — spots go fast.",
	"detail": "A free night under the lights with John and a crew of coaches who care. Every kid runs drills, competes, and gets coached on effort, attitude, and toughness — no cost, no catch. Spots fill fast, so register early.",
	"image": "/photos/events/football-camp.jpg",
	"alt": "Youth football camp",
	"featured": true,
	"register_url": "https://app.betterunite.com/cominskyfamilyfoundation-johncominskyyouthfootballcamp/donate"
}
```

**event-2.json** (Under the Lights — Free Youth Football Camp):
```json
{
	"title": "Under the Lights — Free Youth Football Camp",
	"term": "Summer 2026",
	"status_label": "Upcoming",
	"status_kind": "upcoming",
	"location": "Barberton, OH",
	"body": "John speaks to the youth attending one of the free Under the Lights football camps — drills, effort, and heart.",
	"detail": "The Under the Lights camp is where it all started. A free evening of football for the youth of Barberton, capped by John speaking directly to the kids about showing up, working hard, and pushing the rock every single day.",
	"image": "/photos/initiatives/football-camp.jpg",
	"alt": "Under the Lights youth football camp",
	"featured": false
}
```

**event-3.json** (6th Annual Cornhole Tournament):
```json
{
	"title": "6th Annual Cornhole Tournament",
	"term": "Summer 2026",
	"status_label": "Spots Full",
	"status_kind": "closed",
	"location": "Barberton Moose Lodge · 250 31st St NW, Barberton, OH 44203",
	"body": "Our biggest fundraiser of the year — teams, boards, and a whole lot of community.",
	"detail": "Grab a partner and toss some bags for a good cause. Our annual cornhole tournament brings the whole community together for a night of friendly competition, food, and fundraising for the Foundation's youth initiatives.",
	"image": "/photos/events/cornhole.jpg",
	"alt": "Cornhole tournament",
	"featured": true
}
```

**event-4.json** (Barberton High School Dodgeball Tournament):
```json
{
	"title": "Barberton High School Dodgeball Tournament",
	"term": "Spring 2026",
	"status_label": "Upcoming",
	"status_kind": "upcoming",
	"location": "Barberton, OH",
	"body": "In partnership with the Barberton DECA program — a springtime showdown for a good cause.",
	"detail": "Run in partnership with the Barberton DECA program, our dodgeball tournament is a fast, fun springtime event that rallies students and the community around the Foundation's mission.",
	"image": "/photos/story/drills.jpg",
	"alt": "Dodgeball tournament action",
	"featured": false
}
```

### 1d. Verify

```bash
npx emdash content list events
```

Should show all 4 entries, published. Then check the live site: `/events`,
`/events/john-cominsky-youth-football-camp`, and the homepage's featured
events strip (shows the two with `featured: true`).

---

## Notes

- Local dev/preview already has this applied (`events` created and seeded
  with the same 4 entries) — this doc only covers replicating that to
  production, which needs its own credentials this session doesn't have.
- The `pages` collection is unused (nothing in the codebase queries it since
  `/pages/[slug]` was removed) but is being kept as-is for now — not deleted
  or hidden, in either local dev or production.
