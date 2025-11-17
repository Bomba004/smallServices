/**
 * @file : ./global.d.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "2025/11/01", "by": ["BomBa"], "comment": "تمكين استيراد ملفات JSON مباشرة في TypeScript" }]
 * 📘 تعريف عام لدعم استيراد ملفات JSON داخل TypeScript
 */

declare module '*.json' {
  const value: any
  export default value
}
