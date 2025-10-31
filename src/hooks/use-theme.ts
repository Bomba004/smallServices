
/**
 * 📝 @/hooks/use-theme.ts
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملق لإدارة ثيم التطبيق (فاتح/داكن/تلقائي)" }]
 */

import { useState, useEffect } from 'react';
import type { Theme } from '../types';
import Cookies from 'js-cookie';

/**
 * Hook مخصص لإدارة ثيم التطبيق (فاتح/داكن/تلقائي)
 * يحفظ الإعدادات في الكوكيز لمدة 30 يوم
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // محاولة تحميل الثيم من الكوكيز أولاً
    const savedTheme = Cookies.get('theme') as Theme;
    return savedTheme || 'auto';
  });

  // حساب الثيم الفعال بناء على الإعدادات
  const effectiveTheme = theme === 'auto' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  useEffect(() => {
    const root = window.document.documentElement;
    
    // إزالة كلاس الثيمات السابقة
    root.classList.remove('light', 'dark');
    
    // إضافة كلاس الثيم الحالي
    root.classList.add(effectiveTheme);
    
    // حفظ الإعداد في الكوكيز لمدة 30 يوم
    Cookies.set('theme', theme, { expires: 30, path: '/' });
    
    // تحديث meta theme-color لمتصفحات الجوال
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        effectiveTheme === 'dark' ? '#1f2937' : '#ffffff'
      );
    }
  }, [theme, effectiveTheme]);

  // دالة لتبديل الثيم
  const toggleTheme = () => {
    setTheme(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'auto';
      return 'light';
    });
  };

  return { 
    theme, 
    setTheme, 
    effectiveTheme, 
    toggleTheme,
    isDark: effectiveTheme === 'dark'
  };
}