/**
 * @file : src/store/index.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "إعداد مخزن Redux مع التخزين الدائم للإعدادات والمصادقة" }]
 */
/* 
``` bash
// يفضل عند استخدام vite استخدم اصدار "vite": "^5.4.0" اكثر استقرارا مع هذه المكتبات
npm cache clean --force
rm -rf node_modules package-lock.json
npm install react-redux @reduxjs/toolkit redux-persist js-cookie --legacy-peer-deps
```
- استخدم Hook ذكي لتسهيل الاستخدام في الواجهة الأمامية.
  📁 src/hooks/use-settings.ts
*/


import { configureStore, persistReducer, persistStore } from '@/alias';
import { indexedStorage } from './storage/indexedStorage';
// 1) استيراد Slices (المخفضات):
import loaderReducer from './slices/loaderSlice';
import settingsReducer from './slices/settingsSlice';

// 2)
// تهيئة التخزين الدائم للإعدادات (Settings Slice)
const settingsPersistConfig = { key: 'settings', storage: indexedStorage, whitelist: ['theme', 'language'], };
// تهيئة التخزين الدائم للمصادقة (Auth Slice)
// const authPersistConfig = { key: 'auth', storage: indexedStorage, whitelist: ['user', 'token'], };

// 3)
// إنشاء المخفضات الدائمة (settings)
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsReducer);
// إنشاء المخفضات الدائمة (auth)
// const persistedAuthReducer = persistReducer(authPersistConfig, auth);

// 4) تكوين المخزن (Store)
export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    settings: persistedSettingsReducer,
    // auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, }),
});

// 5) تهيئة المخزن الدائم (Persistor)
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
