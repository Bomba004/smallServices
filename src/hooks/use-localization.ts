/**
 * 📝 @/hooks/use-localization.ts
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "Hook لإدارة الترجمة واللغة في التطبيق" }]
 */

import { useState, useEffect } from 'react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../lib/constants';
import Cookies from 'js-cookie';

// Hook لإدارة اللغة
export function useLocalization() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = Cookies.get('language') as Language;
    return saved || 'ar';
  });

  useEffect(() => {
    const html = document.documentElement;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
    html.lang = language;
    
    // حفظ في الكوكيز
    Cookies.set('language', language, { expires: 30 });
  }, [language]);

  const t = (key: keyof typeof TRANSLATIONS.ar) => {
    return TRANSLATIONS[language][key];
  };

  return { language, setLanguage, t };
}