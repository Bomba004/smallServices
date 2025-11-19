/**
 * @file : src/store/slices/settingsSlice.ts
 * @version : 1.2.0
 * @lastUpdatedAt : [{ "date": "12/11/2025", "by": ["BomBa"], "comment": "تحسين منطق التهيئة وإدارة اللغة والثيم من URL أو الكوكيز" }]
 */

import {
  createSlice, PayloadAction,
  changeLanguage,
  type T_Theme,
  type T_Language
} from '@/alias';

// 1️⃣ الواجهة
export interface SettingsState {
  theme: T_Theme;
  language: T_Language;
  sidebarCollapsed: boolean;
}

// 2️⃣ أدوات مساعدة
const supportedLangs: T_Language[] = ['ar', 'en'];

/**
 * 🌓 تحديد الثيم الافتراضي
 * - التحقق من النظام أولاً
 * - ثم من السمة المحفوظة في الـ DOM (مثل SSR أو تحميل مسبق)
 */
const getInitialTheme = (): T_Theme => {
  if (typeof window !== 'undefined') {
    const savedTheme = document.documentElement.getAttribute('data-theme') as T_Theme | null;
    if (savedTheme) return savedTheme;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  return 'light';
};

/**
 * 🌍 تحديد اللغة والثيم من:
 *  1. URL أولاً
 *  2. ثم الكوكيز (settings)
 *  3. ثم القيم الافتراضية
 */
const getInitial = (): { theme: T_Theme; lang: T_Language } => {
  let theme: T_Theme = 'light';
  let lang: T_Language = 'en';

  try {
    // 🧭 استخراج اللغة من الـ URL مثل /ar أو /en
    const pathLang = window?.location?.pathname?.split('/')?.[1] as T_Language;
    const hasLangInURL = supportedLangs.includes(pathLang);

    // 🍪 استخراج إعدادات المستخدم من الكوكيز (redux-persist)
    const match = document.cookie.match(/settings=([^;]+)/);
    const cookieSettings = match ? JSON.parse(decodeURIComponent(match[1])) : null;

    // 🎯 تحديد اللغة
    if (hasLangInURL) lang = pathLang;
    else if (cookieSettings?.language) lang = cookieSettings.language.replace(/"/g, '');

    // 🎨 تحديد الثيم
    if (cookieSettings?.theme) theme = cookieSettings.theme.replace(/"/g, '');
    else theme = getInitialTheme();

    // ⚡ تطبيق القيم على الـ DOM فوراً لتجنب وميض الواجهة
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  } catch (err) {
    console.warn('⚠️ Preload settings failed:', err);
  }

  return { theme, lang };
};

// 3️⃣ الحالة الابتدائية
const { theme: initialTheme, lang: initialLang } = getInitial();
export const initialState: SettingsState = {
  theme: initialTheme,
  language: initialLang,
  sidebarCollapsed: false,
};

// 4️⃣ تطبيق الثيم على الـ DOM
const applyThemeToDOM = (theme: T_Theme) => {
  if (typeof document === 'undefined') return;

  const html = document.documentElement;
  html.classList.remove('light', 'dark');
  html.classList.add(theme);
  html.setAttribute('data-theme', theme);
  html.style.colorScheme = theme;
};

// 5️⃣ الـ Slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // 🎨 تغيير الثيم
    setTheme: (state, action: PayloadAction<T_Theme>) => {
      state.theme = action.payload;
      applyThemeToDOM(action.payload);
    },

    // 🌐 تغيير اللغة وتحديث الرابط (URL)
    setLanguage: (state, action: PayloadAction<T_Language>) => {
      const newLang = action.payload;
      state.language = newLang;
      // 🌍 تحديث اللغة في i18n أو النظام الخارجي
      changeLanguage(newLang);
      console.log('1: ',newLang);
    },


    // 📁 تبديل القائمة الجانبية
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    // 📁 تعيين حالة القائمة الجانبية
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },

    // 🔄 إعادة تعيين الإعدادات
    resetSettings: (state) => {
      state.theme = getInitialTheme();
      state.language = 'en';
      state.sidebarCollapsed = false;
      applyThemeToDOM(state.theme);
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    },
  },
});

// 6️⃣ التصدير
export default settingsSlice.reducer;
export const {
  setTheme,
  setLanguage,
  toggleSidebar,
  setSidebar,
  resetSettings,
} = settingsSlice.actions;
