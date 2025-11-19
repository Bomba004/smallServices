/**
 * @file src/i18n/config.ts
 * @version 1.5.0
 * @lastUpdatedAt [{ "date": "01/11/2025", "by": ["BomBa"], "comment": "إصلاح مشكلة require() باستخدام import.meta.glob الديناميكي" }]
 *
 * ⚙️ المزايا:
 * - اكتشاف اللغة من المسار، الكوكيز، localStorage، أو المتصفح.
 * - تحميل ملفات JSON ديناميكيًا بطريقة آمنة متوافقة مع Vite.
 * - دعم fallback في حالة فقدان ملفات الترجمة.
 * - إنشاء روابط ديناميكية حسب اللغة الحالية.
 */

import i18n, { InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { T_Language } from '@/alias'

// 📦 تحميل ملفات JSON ديناميكيًا من مجلد locales
const locales = import.meta.glob('@/i18n/locales/**/*.json', { eager: true }) as Record<string, { default: "en" }>;

// 🧠 اختيار ملف الترجمة المناسب
const loadTranslation = (lang: T_Language) => {
  const file = Object.keys(locales).find(k => k.includes(`/locales/${lang}/translation.json`))
  return file ? locales[file] : locales['/locales/en/translation.json']
}

// 🌍 الموارد
const resources = {
  en: { common: loadTranslation('en') },
  ar: { common: loadTranslation('ar') },
}

// 🧭 وظيفة مخصصة لاكتشاف اللغة من URL | HTML | LocalStorage | navigator
const detectLanguage = (): T_Language => {
  // 1️⃣ من الـ URL
  const match = window.location.pathname.match(/^\/(ar|en)(\/|$)/)
  if (match) return match[1] as T_Language

  // 2️⃣ من HTML حيث يتم جلبه من Cookies: هذا الافضل ...
  const lang = document.documentElement.lang
  if (lang) return lang as T_Language
  
  // 3️⃣ من localStorage
  // const local = localStorage.getItem('lang')
  // if (local) return local as T_Language

  // 4️⃣ من المتصفح  navigator
  const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en'
  return browserLang as T_Language
}

// ⚙️ خيارات i18n
const options: InitOptions = {
  resources,
  fallbackLng: 'en',
  lng: detectLanguage(),
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  detection: {
    order: ['cookie', 'navigator', 'htmlTag', 'path'],
  },
  react: { useSuspense: false },
}

i18n.use(HttpBackend).use(LanguageDetector).use(initReactI18next).init(options)

// 🌐 تغيير اللغة وتحديث الرابط (URL)
export const changeLanguage = (lang: T_Language) => {
  i18n.changeLanguage(lang)
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'

  // 🔗 تحديث الرابط الحالي ليعكس اللغة الجديدة بدون إعادة تحميل الصفحة
  if (typeof window !== 'undefined') {
    const pathParts = window.location.pathname.split('/').filter(Boolean); // إزالة الفراغات
    const supportedLangs = ['ar', 'en', 'fr'] as const;

    // إذا كان أول جزء لغة بالفعل → استبدله
    if (supportedLangs.includes(pathParts[0] as T_Language)) {
      pathParts[0] = lang;
    } else {
      // إذا لم يكن، أضف اللغة كبداية للمسار
      pathParts.unshift(lang);
    }

    const newPath = '/' + pathParts.join('/');
    const newUrl = `${window.location.origin}${newPath}${window.location.search}${window.location.hash}`;

    // استبدال الحالة الحالية بدون إعادة تحميل الصفحة
    window.history.replaceState({}, '', newUrl);
  }
  
}
// 🚀 تهيئة اللغة عند بدء التطبيق
export const initLanguage = async () => {
  const lang = i18n.language as T_Language
  changeLanguage(lang)
}
// initLanguage()

// 📎 إنشاء روابط ديناميكية حسب اللغة الحالية
export const getLocalizedPath = (path: string) => {
  const lang = i18n.language as T_Language
  return `/${lang}${path.startsWith('/') ? '' : '/'}${path}`
}

export default i18n


// ==========-==========-==========-==========-==========-==========-==========-==========
// ==========-==========-==========-==========-==========-==========-==========-==========

