# Seat Booking Manager

Aplikasi manajemen seat booking dengan layout editor interaktif menggunakan React, TypeScript, Tailwind CSS, dan Konva.js.

## 🚀 Cara Menjalankan Project

### Prerequisites

- **Node.js** versi 18 atau lebih tinggi
- **pnpm** package manager

### Installation

1. Clone repository dan install dependencies:

```bash
pnpm install
```

2. Jalankan development server:

```bash
pnpm dev
```

3. Buka browser di `http://localhost:5174` (atau port yang ditampilkan di terminal)

### Available Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm preview   # Preview production build
pnpm lint      # Run ESLint
```

## 📁 File dan Folder Penting

### Struktur Direktori

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Navigasi header (fixed, responsive)
│   │   └── Layout.tsx       # Layout wrapper utama
│   └── ui/                  # shadcn/ui components
├── pages/
│   ├── Home.tsx            # Halaman landing
│   ├── Editor.tsx          # Halaman editor layout tempat duduk
│   └── Organizer.tsx       # Halaman kelola booking
├── hooks/                   # Custom React hooks
├── store/                   # Zustand state management
├── types/
│   └── routes.ts           # Route constants dan types
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
├── App.tsx                 # React Router configuration
├── main.tsx                # Entry point aplikasi
└── index.css               # Global styles + Tailwind config
```

### File Konfigurasi Penting

- **`package.json`** - Dependencies dan scripts
- **`tsconfig.json`** - TypeScript configuration
- **`vite.config.ts`** - Vite build configuration dengan path aliases
- **`postcss.config.js`** - PostCSS dengan Tailwind v4 plugin
- **`components.json`** - shadcn/ui CLI configuration
- **`src/index.css`** - Tailwind v4 configuration dengan `@theme` directive

### Routing

Routes didefinisikan di `src/types/routes.ts`:

- `/` - Home page
- `/editor` - Layout editor
- `/organizer` - Booking organizer

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Tailwind CSS v4** - Styling dengan `@import` dan `@theme`
- **shadcn/ui** - UI components
- **Zustand** - State management
- **Konva.js** - Canvas manipulation
- **Lucide React** - Icons

## 📝 Catatan Penting

### Tailwind CSS v4

Project ini menggunakan Tailwind CSS v4 yang memiliki sintaks berbeda dari v3:

- Menggunakan `@import "tailwindcss"` bukan `@tailwind` directives
- Konfigurasi menggunakan `@theme` directive di CSS
- Plugin PostCSS: `@tailwindcss/postcss`
- Tidak ada file `tailwind.config.js`

### Path Aliases

Gunakan `@/` untuk import dari `src/`:

```typescript
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
```

### shadcn/ui Components

Untuk menambah komponen shadcn/ui:

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
```

## 🎯 Next Steps

- [ ] Implementasi canvas editor dengan Konva.js di halaman Editor
- [ ] Buat Zustand store untuk state management
- [ ] Implementasi fitur booking di halaman Organizer
- [ ] Tambahkan autentikasi
- [ ] Setup database
