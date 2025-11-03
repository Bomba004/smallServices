/**
 * @file : src/store/index.ts
 * @version : 1.1.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "إعداد مخزن Redux مع التخزين الدائم باستخدام Cookies" }]
 */

import Cookies from 'js-cookie';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import {
  configureStore,
} from '@/alias';



// #region خطوات إعداد المخزن (Slices) مع التخزين الدائم: Cookies:-====-====-====-==== //
  // 1) 🍪 إنشاء وحدة تخزين مخصصة تعمل مع Cookies
  const createCookieStorage = () => {
    const isClient = typeof window !== 'undefined';
    
    return {
      getItem: (key: string): Promise<string | null> => {
        if (!isClient) return Promise.resolve(null);
        try {
          const value = Cookies.get(key);
          return Promise.resolve(value || null);
        } catch (error) {
          console.error(`❌ Failed to get ${key} from cookies:`, error);
          return Promise.resolve(null);
        }
      },
      
      setItem: (key: string, value: string): Promise<void> => {
        if (!isClient) return Promise.resolve();
        try {
          Cookies.set(key, value, { 
            expires: 30,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
          });
          return Promise.resolve();
        } catch (error) {
          console.error(`❌ Failed to set ${key} in cookies:`, error);
          return Promise.resolve();
        }
      },
      
      removeItem: (key: string): Promise<void> => {
        if (!isClient) return Promise.resolve();
        try {
          Cookies.remove(key, { path: '/' });
          return Promise.resolve();
        } catch (error) {
          console.error(`❌ Failed to remove ${key} from cookies:`, error);
          return Promise.resolve();
        }
      },
    };
  };

  // 2) ⚙️ إعدادات التخزين الدائم لـ Slice الإعدادات (settings Slice)
  const settingsPersistConfig = { key: 'settings', storage: createCookieStorage(), whitelist: ['theme', 'language', 'sidebarCollapsed'], };
  
  // 3) إنشاء المخفضات الدائمة (settings persisted reducers)
  const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsReducer);
// #endregion ====-====-====-====-====-====-====-====-====-====-====-====-====-====-==== //

// 4) استيراد Slices
import loaderReducer from './slices/loaderSlice';
import settingsReducer from './slices/settingsSlice';

// 5) تكوين المخزن
export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    settings: persistedSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 6) تهيئة المخزن الدائم
export const persistor = persistStore(store);

// 7) الأنواع
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;