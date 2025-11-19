/**
 * @file : src/lib/stateCookies.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "إضافة إدارة الإعدادات باستخدام الكوكيز" }]
 * @description إدارة الكوكيز بطريقة آمنة ومنظمة
 */

// import Cookies from 'js-cookie'

// 🔒 اسم الكوكي الرئيسي
// const SETTINGS_KEY = 'settings'

// // 🧩 نوع الإعدادات
// export type AppSettings = {
//   theme: 'light' | 'dark' | 'system'
//   language: 'en' | 'ar'
// }

// // 🔧 القيم الافتراضية
// const defaultSettings: AppSettings = {
//   theme: 'system',
//   language: 'en',
// }

// 📦 جلب الإعدادات من الكوكي
// export const getSettings = (): AppSettings => {
//   try {
//     const raw = Cookies.get(SETTINGS_KEY)
//     return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings
//   } catch {
//     return defaultSettings
//   }
// }

// 💾 حفظ الإعدادات في الكوكي
// export const saveSettings = (settings: Partial<AppSettings>) => {
//   const current = getSettings()
//   const updated = { ...current, ...settings }
//   Cookies.set(SETTINGS_KEY, JSON.stringify(updated), {
//     expires: 30, // 30 يوم
//     path: '/',
//     sameSite: 'Strict',
//   })
// }

// 🧹 حذف الإعدادات
// export const clearSettings = () => {
//   Cookies.remove(SETTINGS_KEY, { path: '/' })
// }


// ==========-==========-==========-==========-==========-==========-==========-==========
// ==========-==========-==========-==========-==========-==========-==========-==========


// helpers.ts

// 🧩 تهيئة اللغة من الإعدادات
// export const preparationLanguage = () => { 
//   const { language, theme } = getSettings()
//   document.documentElement.lang = language
//   document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
//   document.documentElement.dataset.theme = theme
// }