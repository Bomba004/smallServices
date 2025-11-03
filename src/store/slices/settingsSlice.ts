/**
 * @file : src/store/slices/settingsSlice.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "تعريف Slice الإعدادات لإدارة الثيم، اللغة، وحالة القائمة الجانبية باستخدام Redux Toolkit" }]
 */

// 🧩 الاستيرادات
import { 
  createSlice, PayloadAction,
  changeLanguage,
  
  type T_Theme, 
  type T_Language,
 } from '@/alias';

//#region 1) Type: 📦 الواجهة (interface) التي تمثل الحالة الخاصة بالإعدادات
export interface SettingsState {
  theme: T_Theme;
  language: T_Language;
  sidebarCollapsed: boolean;
}
//#endregion

//#region 2) Data: 🧱 الحالة الابتدائية (Initial State)
export const initialState: SettingsState = {
  theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light', // الثيم الافتراضي
  language: 'en', // اللغة الافتراضية
  sidebarCollapsed: false, // حالة الطي الجانبي
};
//#endregion

//#region 3) 🧠 تعريف Slice الإعدادات + Method|Function: 
const settingsSlice = createSlice({
  name: 'settings', // اسم الـ Slice في مخزن Redux
  initialState,
  reducers: {
    //#region 🎨 تغيير الثيم
    // toggleTheme(state) { state.theme = state.theme === 'light' ? 'dark' : 'light'; document.documentElement.classList.toggle('dark', state.theme === 'dark'); },
    setTheme(state, action: PayloadAction<T_Theme>) { state.theme = action.payload;
      document.documentElement.setAttribute('data-theme', state.theme);
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
      document.documentElement.style.colorScheme = state.theme;
    },
    //#endregion

    //#region 🌐 تغيير اللغة
    setLanguage(state, action: PayloadAction<T_Language>) {
    state.language = action.payload; changeLanguage(action.payload); },
    // toggleLanguage: (state) => { state.language = state.language === 'ar' ? 'en' : 'ar'; changeLanguage(state.language); },
    //#endregion

    //#region 📏 تغيير حالة القائمة الجانبية
    toggleSidebar(state) { state.sidebarCollapsed = !state.sidebarCollapsed; },
    setSidebar(state, action: PayloadAction<boolean>) { state.sidebarCollapsed = action.payload; },
    //#endregion
  },
});
//#endregion

//#region 4) 📤 تصدير الـ Reducer (لاستخدامه في الـ store الرئيسي)
export default settingsSlice.reducer;
//#endregion

//#region 5) 🚀 تصدير الدوال (Actions) لاستخدامها في الواجهة الأمامية
export const {
  setTheme, /* toggleTheme, */
  setLanguage, /* toggleLanguage, */
  setSidebar, toggleSidebar,
} = settingsSlice.actions;
//#endregion
