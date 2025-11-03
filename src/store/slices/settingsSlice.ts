/**
 * @file : src/store/slices/settingsSlice.ts
 * @version : 1.1.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "تحسين إدارة الثيم واللغة مع معالجة أفضل للـ DOM" }]
 */

import {
  createSlice, PayloadAction,
  changeLanguage,

  type T_Theme,
  type T_Language
} from '@/alias';

// 1) 🎯 الواجهة
export interface SettingsState {
  theme: T_Theme;
  language: T_Language;
  sidebarCollapsed: boolean;
}

// 2) 🏗️ الحالة الابتدائية للثيم
const getInitialTheme = (): T_Theme => {
  // التحقق من النظام لدي المستخدم أولاً, ثم من السمات المحفوظة في الـ DOM
  if (typeof window !== 'undefined') {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = document.documentElement.getAttribute('data-theme') as T_Theme;
    
    return savedTheme || (systemPrefersDark ? 'dark' : 'light');
  }
  return 'light';
};
// الحالة الابتدائية
export const initialState: SettingsState = {
  theme: getInitialTheme(),
  language: 'en',
  sidebarCollapsed: false,
};

// 3) 🎨 تطبيق الثيم على الـ DOM
const applyThemeToDOM = (theme: T_Theme) => {
  if (typeof document === 'undefined') return;
  
  const html = document.documentElement;
  
  // إزالة السمات السابقة
  html.classList.remove('light', 'dark');
  html.removeAttribute('data-theme');
  
  // إضافة السمات الجديدة
  html.classList.add(theme);
  html.setAttribute('data-theme', theme);
  html.style.colorScheme = theme;
};

// 4) 🧠 الـ Slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // تغيير الثيم
    setTheme: (state, action: PayloadAction<T_Theme>) => { state.theme = action.payload; applyThemeToDOM(action.payload); },
    
    // تغيير اللغة
    setLanguage: (state, action: PayloadAction<T_Language>) => { state.language = action.payload; changeLanguage(action.payload); },
    
    // تبديل حالة القائمة الجانبية
    toggleSidebar: (state) => { state.sidebarCollapsed = !state.sidebarCollapsed; },
    
    // تعيين حالة القائمة الجانبية
    setSidebar: (state, action: PayloadAction<boolean>) => { state.sidebarCollapsed = action.payload; },
    
    // 🔄 إعادة تعيين جميع الإعدادات, rest data
    resetSettings: (state) => { state.theme = getInitialTheme(); state.language = 'en'; state.sidebarCollapsed = false; applyThemeToDOM(state.theme); },
  },
});

// 5) 📤 التصدير
export default settingsSlice.reducer;
export const {
  setTheme,
  setLanguage,
  toggleSidebar,
  setSidebar,
  resetSettings,
} = settingsSlice.actions;