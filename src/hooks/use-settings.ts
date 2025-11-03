/**
 * @file : src/hooks/use-settings.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "إنشاء Hook لإدارة إعدادات التطبيق (الثيم واللغة)" }]
 * @description : Hook مخصص لإدارة إعدادات التطبيق مثل الثيم واللغة مع مزامنة الكوكيز و DOM
 */

import {
  AppDispatch, RootState, 
  useDispatch, useSelector,
  showLoader, hideLoader,
  setLanguage, setTheme,
  
  type T_Theme,
  type T_Language,
  } from "@/alias"


export const useSettings = () => {
  const dispatch = useDispatch<AppDispatch>()

  const loaderProcess = async (fun: Function,message: string, timer: number) => {
    dispatch(showLoader(message || 'loader... 📦'));
    await fun();
    await new Promise(res => setTimeout(res, timer || 10));
    dispatch(hideLoader());
  };
  
  
  const { theme, language } = useSelector((state: RootState) => state.settings)

  // 🎯 دوال جاهزة لتحديث الإعدادات
  const changeTheme = (theme: T_Theme) => dispatch(setTheme(theme as any))
  const changeLanguage = (lang: T_Language) => dispatch(setLanguage(lang))

  return { 
    theme, language,
    loaderProcess, changeTheme, changeLanguage,
  }
}
