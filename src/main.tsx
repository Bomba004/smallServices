/**
 * @file : @/main.tsx
 * @version : 1.0.1
 * @lastUpdatedAt : [{ "date": "01/11/2025", "by": ["BomBa"], "comment": "تهيئة احترافية للثيم قبل الـ Hydration" }]
 */

import {
  StrictMode, createRoot,
  Provider,
  store,

  App,
  LoaderScreen,
 } from '@/alias';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';

// نقطة تشغيل التطبيق
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
  <PersistGate loading={<LoaderScreen />} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>
  </StrictMode>,
);


