
/**
 * @file : src/alias/index.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف التجميع المركزي لتصدير المكونات والدوال والأنواع المستخدمة في التطبيق" }] 
 */

// استيراد ملف الأنماط الرئيسي
import '@/main.css';

// تصدير React و ReactDOM
export { default as React, StrictMode, useState, useEffect, } from 'react';
export * as ReactDOM from 'react-dom/client';

// تصدير دوال وأدوات مساعدة {Hooks}
export { createRoot } from 'react-dom/client'
export { useContacts } from '@/hooks/use-contacts';
export { useSettings } from '@/hooks/use-settings';
// export { useLocalization } from '@/hooks/use-localization';
// export { useTheme } from '@/hooks/use-theme';

// تصدير مكتبات إدارة الحالة (Redux)
export type { RootState, AppDispatch } from '@/store'
export { Provider, useDispatch, useSelector } from 'react-redux'; // Hooks من React-Redux, لتسهيل الوصول إلى المخزن (store) في المكونات
export { configureStore , createSlice, type PayloadAction } from "@reduxjs/toolkit";
export { persistStore, persistReducer } from 'redux-persist';
export { store } from '@/store'
export * from '@/store/slices/loaderSlice';   // Actions من Slice الإعدادات
export * from '@/store/slices/settingsSlice'; // Actions من Slice الإعدادات

// تصدير مكونات واجهة المستخدم (components, BUI)
export { LoaderScreen } from '@/components/global/LoaderScreen';
export { Header } from '@/components/layout/header';
export { ContactList } from '@/components/contacts/contact-list';
export { ContactForm } from '@/components/contacts/contact-form';
export { Modal } from '@/components/BUI/modal';
export { Button } from '@/components/BUI/button';

// تصدير المكون الرئيسي للتطبيق
export { default as App } from '@/App';

// استيراد وتصدير i18n وأدوات الترجمة (react-i18next)
export { useTranslation } from 'react-i18next';
export * from '@/i18n/config';


// تصدير مكتبة التنبيهات
export { toast, Toaster } from 'sonner';
// تصدير أيقونات من مكتبة lucide-react
export { Plus, Sun, Moon, Settings, Languages  } from 'lucide-react';

// تصدير أنواع البيانات
export type * from '@/types';

