
/**
 * @file : src/alias/index.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف التجميع المركزي لتصدير المكونات والدوال والأنواع المستخدمة في التطبيق" }] 
 */

// استيراد ملف الأنماط الرئيسي
// import '@/main.css';
import '@/styles/main.scss';


// تصدير React و ReactDOM
export { default as React,
  JSX, lazy,
  useState, useEffect, useCallback,
  StrictMode,

  } from 'react';
export * as ReactDOM from 'react-dom/client';

// تصدير دوال وأدوات مساعدة {Lib - Hooks}
export { initTippy } from '@/lib/initTippy'; //  تصدير تهيئة Tippy.js
export { createRoot } from 'react-dom/client'
export { useContacts } from '@/hooks/use-contacts';
export { useSettings } from '@/hooks/use-settings';
// export { useLocalization } from '@/hooks/use-localization';
// export { useTheme } from '@/hooks/use-theme';

// تصدير مكتبات إدارة الحالة (Redux)
export type { RootState, AppDispatch } from '@/store'
export { Provider, useDispatch, useSelector } from 'react-redux'; // Hooks من React-Redux, لتسهيل الوصول إلى المخزن (store) في المكونات
export { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
export { persistStore, persistReducer } from 'redux-persist';
export * from '@/store'
export * from '@/store/slices/loaderSlice';   // Actions من Slice الإعدادات
export * from '@/store/slices/settingsSlice'; // Actions من Slice الإعدادات

// تصدير مكونات واجهة المستخدم (components, BUI)
export { Modal } from '@/components/BUI/modal';
export { Button } from '@/components/BUI/button';
// Global Components
export { LoaderScreen } from '@/components/global/LoaderScreen';
export { BtnLanguage } from '@/components/global/btnLanguage';
export { BtnTheme } from '@/components/global/btnTheme';

export { Header } from '@/components/layout/header';
export { Footer } from '@/components/layout/footer';
export { ContactList } from '@/components/contacts/contact-list';
export { ContactForm } from '@/components/contacts/contact-form';

// تصدير المكون الرئيسي للتطبيق
export { default as App } from '@/App';
export { default as TEST } from '@/TEST';

// استيراد وتصدير i18n وأدوات الترجمة (react-i18next)
export { useTranslation } from 'react-i18next';
export * from '@/i18n/config';



// تصدير المكاتب الخارجية
export { default as tippy } from 'tippy.js'; // تصدير مكتبة التولتيب tippy.js
export { toast, Toaster } from 'sonner'; // تصدير مكتبة الإشعارات sonner

// تصدير أيقونات من مكتبة lucide-react
export { Plus, Sun, Moon, Settings, Languages  } from 'lucide-react';

// تصدير أنواع البيانات
export type * from '@/types';

