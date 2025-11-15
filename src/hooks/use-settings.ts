/**
 * @file : src/hooks/use-settings.ts
 * @version : 1.1.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "Hook محسن مع معالجة أفضل للأخطاء والتحميل" }]
 */

import {
  useEffect, useCallback ,
  AppDispatch,
  RootState,

  useDispatch,
  useSelector,
  showLoader,
  hideLoader,
  setLanguage,
  setTheme,
  type T_Theme,
  type T_Language,
  useTranslation,
} from '@/alias';
import { optional } from 'zod';


// 🛠️ Hook مخصص لإدارة الإعدادات مع تحسينات
export const useSettings = () => {
  const { t, i18n } = useTranslation() // Hook الترجمة
  
  const dispatch = useDispatch<AppDispatch>();
  const { theme, language, sidebarCollapsed } = useSelector( (state: RootState) => state.settings );

  // ✅ تغيير الثيم مع حفظ في الكوكيز
  const changeTheme = useCallback(
    (newTheme: T_Theme) => {
      try {
        dispatch(setTheme(newTheme));
      } catch (error) { console.error('❌ Failed to change theme:', error); }
    },
    [dispatch]
  );

  // ✅ تغيير اللغة مع حفظ في الكوكيز
  const changeLanguage = useCallback(
    (newLang: T_Language) => {
      try {
        console.log(newLang);
        
        dispatch(setLanguage(newLang));
      } catch (error) { console.error('❌ Failed to change language:', error); }
    },
    [dispatch]
  );


  // ⚡ معالج التحميل المحسن
  const loaderProcess = useCallback(
    async <T>(
      asyncFunction: () => Promise<T>,
      message: string = t('loading.pleaseWait'),
      timer: number = 300 // minLoadingTime بالميلي ثانية
    ): Promise<T> => {
      const startTime = Date.now();
      
      try {
        dispatch(showLoader(message));
        const result = await asyncFunction();
        
        // ضمان الحد الأدنى لوقت التحميل
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < timer) {
          await new Promise(resolve => 
            setTimeout(resolve, timer - elapsedTime)
          );
        }
        
        return result;
      } catch (error) { console.error('❌ Loader process error:', error); throw error;
      } finally { dispatch(hideLoader()); }
    },
    [dispatch]
  );

  // 🎯 التبديل بين الثيمات
  const toggleTheme = useCallback(() => { changeTheme(theme === 'light' ? 'dark' : 'light'); }, [theme, changeTheme]);

  // 🎯 التبديل بين اللغات
  const toggleLanguage = useCallback(() => { changeLanguage(language === 'ar' ? 'en' : 'ar'); }, [language, changeLanguage]);

  return {
    // الحالة
    theme,
    language,
    sidebarCollapsed,
    
    // الدوال
    t, i18n,
    dispatch,
    
    changeTheme,
    changeLanguage,
    toggleTheme,
    toggleLanguage,
    loaderProcess,
  };
};