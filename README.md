# Rent Management Tool 🏠

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
- PostgreSQL (or compatible SQL DB)

**State & Validation**
- Zustand (draft & edit state)
- Zod (schema validation)

**Media**
- ImageKit (file uploads & lifecycle management)

---

## 📂 Project Structure (High Level)

```text
src/
├── actions/          # Server actions (create/update property)
├── components/       # Reusable UI components
├── store/            # Zustand stores (property drafts, edit mode)
├── validations/      # Zod schemas
├── types/            # Core domain types (HouseListing, Rules, Media)
├── app/              # Next.js app router
