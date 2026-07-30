# Rent Management Tool 🏠

[![CI](https://github.com/hey-virender/do-rent/actions/workflows/ci.yml/badge.svg)](https://github.com/hey-virender/do-rent/actions/workflows/ci.yml)

**🔗 Live Demo:** [do-rent.vercel.app](https://do-rent.vercel.app)

A modern, full-stack Rent & Property Management platform designed for landlords and property managers to manage listings, tenants, and property data efficiently — without messy spreadsheets or manual follow-ups.

Built with scalability, clean UX, and real-world rental workflows in mind.

---

## 🚀 Features

### Property Management
- Create, edit, and update property listings with a **multi-step form**
- Draft mode support (save progress, resume later)
- Rule-based property configuration (auto-rendered from types, no hardcoding)
- Smart defaults (active properties always visible)

### Media Handling
- Image uploads with metadata support
- Temporary media cleanup strategy (e.g. `customMeta.status = temp`)
- Optimized asset handling for performance

### Validation & Safety
- Schema-based validation using **Zod**
- Server-side authorization & authentication
- SQL-injection-safe data access via **Prisma**

### UX & Architecture
- Clean, modular UI components
- Centralized state management for drafts and edit flows
- Type-driven rendering (UI auto-updates when types change)
- Designed for extensibility (tenants, payments, analytics)

---

## 🛠 Tech Stack

**Frontend**
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Custom component system
- Client & Server Components

**Backend**
- Next.js Server Actions
- Prisma ORM
- MongoDB (the Prisma datasource provider is `mongodb`)

**State & Validation**
- Zustand (draft & edit state)
- Zod (schema validation)

**Media**
- ImageKit (file uploads & lifecycle management)

---

## 📂 Project Structure (High Level)

```text

├── actions/          # Server actions (create/update property)
├── components/       # Reusable UI components
├── store/            # Zustand stores (property drafts, edit mode)
├── validations/      # Zod schemas
├── types/            # Core domain types (HouseListing, Rules, Media)
├── app/              # Next.js app router

---

## 🧪 Testing

```bash
npm test          # run once
npm run test:watch
```

**35 tests** covering the logic most likely to cause silent data corruption:

| Suite | What it protects |
|---|---|
| `tests/utils.test.ts` | `prismaUpdateFilter` — that partial updates never null out existing columns, while preserving legitimately falsy values like `0` halls and `petsAllowed: false` |
| `tests/auth.validation.test.ts` | Password confirmation, terms acceptance, Aadhaar length, role enum, date parsing |
| `tests/house.validation.test.ts` | Indian PIN code format, coordinate ranges, pricing floors, minimum area, and that `availableFrom` can be today but not yesterday |

CI runs on every push and pull request to `main`. The test suite is the gate;
lint runs alongside it as advisory while a backlog of ~20 pre-existing errors in
application code is worked through (four need React refactors rather than
one-line fixes). Prisma's generated client is excluded from linting.

---

## 🧭 Design Decisions & Tradeoffs

**Why filter `null` out of update payloads instead of passing them through?**
Prisma treats an explicit `null` as "set this column to NULL". A partial edit form that sends untouched fields as `null` would therefore erase data the user never intended to change. `prismaUpdateFilter` strips `undefined`, `null` and whitespace-only strings — but deliberately keeps `0` and `false`, because "zero halls" and "pets not allowed" are real answers. That distinction is the reason the function has tests.

**Why a multi-step wizard with draft persistence rather than one long form?**
A property listing needs location, pricing, specs, amenities, media and availability. As a single form it's abandoned halfway. Splitting it across steps with drafts held in Zustand means a landlord can stop and resume, at the cost of more state-management complexity than a single submit would need.

**Why validate with Zod schemas that are then sliced per step?**
There's one source of truth — `houseSchama` — and each wizard step picks the slice it owns (`houseSchama.shape.pricing`, `.pick({ name, overview })`). A field's rules can't drift between the step that collects it and the submit that saves it, because they're literally the same schema.

**Why Prisma on top of MongoDB rather than Mongoose?**
A listing is naturally document-shaped — nested location, pricing, specs, rules and availability objects, plus arrays of media and nearby places — so a document store fits the data. What Mongoose doesn't give is a generated, fully typed client: with Prisma the schema is the single source of truth and every query is type-checked against it, which matters when the same `HouseListing` shape flows through a six-step wizard, a Zod schema and a server action. The tradeoff is that Prisma's MongoDB support has no joins, so anything relational has to be modelled as embedded documents or resolved in application code.

**Why ImageKit rather than storing uploads directly?**
Images are uploaded before a listing is submitted, so orphaned files accumulate from abandoned drafts. Tagging uploads with a temporary status and cleaning them up separately keeps that garbage out of the database, and transformations happen at the CDN rather than in the app.

---

## 🚧 Known Limitations

- **No integration or end-to-end tests** — coverage is currently on pure logic and schemas only.
- **~20 outstanding lint errors** in application code, so the lint step is advisory rather than blocking. Four require React refactors (`react-hooks/static-components`, `immutability`, `set-state-in-effect`).
- **`generated/prisma/` is committed** and excluded from linting; it should be generated at install time instead.
- **`app/api/my-app/`** contains a stray nested Next.js scaffold that should be removed.
- **No pagination** on property listings.
- **Search relies on a generated `searchText` field** (`scripts/addSearchText.ts`) rather than full-text search.
