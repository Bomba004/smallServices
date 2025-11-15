/**
 * @file : src/components/global/btnLanguage.tsx
 * @version : 2.0.0
 * @lastUpdatedAt : [{ "date": "15/11/2025", "by": ["BomBa"], "comment": "مكون زرار تبديل اللغة" }]
 */

import { 
  Button,
  
  useSettings,
  Languages,
  useTranslation,
  } from "@/alias";

export const BtnLanguage= () => {
  // 🧠 قراءة الإعدادات من Cookies وتطبيقها مبكرًا
  const { language, changeLanguage } = useSettings() // Hook الإعدادات
  // 🧠 قراءة اللغة من Cookies وتطبيقها مبكرًا
  const { t } = useTranslation() // Hook الترجمة
  
  return (
    <Button
    variant="ghost"
    size="sm"
    onClick={() => changeLanguage(language == 'en' ? 'ar' : 'en')}
    title={t('CompGlobal.BtnLanguage.btnTitle' as string)}
    >
      <Languages className="w-4 h-4" />
      <span className="mr-2">{t('CompGlobal.BtnLanguage.span' as string)}</span>
    </Button>
  );
}