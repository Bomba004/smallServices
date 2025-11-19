/**
 * @file : src/vite-env.d.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "تعريفات TypeScript الخاصة بـ Vite والبيئة" }]
 */

/// <reference types="vite/client" />

// ✅ تعريف مخصص لـ import.meta.env لتعرفه TypeScript
interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_APP_ENV?: 'development' | 'production'
  // أضف أي متغيرات بيئية أخرى تريدها هنا 👇
  readonly VITE_DEBUG?: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
