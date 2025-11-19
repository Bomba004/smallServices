/**
 * @file : src/components/global/btnTheme.tsx
 * @version : 2.0.0
 * @lastUpdatedAt : [{ "date": "15/11/2025", "by": ["BomBa"], "comment": "مكون زرار تبديل الثيم" }]
 */

import {
  Button,

  useSettings,
  useTranslation,
  Sun, Moon,
} from "@/alias";

export const BtnTheme = () => {
  // 🧠 قراءة الإعدادات من Cookies وتطبيقها مبكرًا
  const { theme, changeTheme } = useSettings() // Hook الإعدادات
  // 🧠 قراءة اللغة من Cookies وتطبيقها مبكرًا
  const { t } = useTranslation() // Hook الترجمة

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => { changeTheme(theme === 'light' ? 'dark' : 'light'); }}
      title={t('CompGlobal.BtnTheme.btnTitle' as string)}
    >
      {theme === 'dark' ? (<Sun className="w-4 h-4" />) : (<Moon className="w-4 h-4" />)}
    </Button>
  );
}