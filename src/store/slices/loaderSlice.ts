/**
 * @file : src/store/slices/loaderSlice.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "01/11/2025", "by": ["BomBa"], "comment": "إدارة حالة شاشة التحميل عبر Redux" }]
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoaderState {
  active: boolean;     // هل شاشة التحميل فعالة؟
  message?: string;    // النص المعروض أثناء التحميل
}

const initialState: LoaderState = {
  active: false,
  message: 'جارٍ التحميل... ⏳',
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<string | undefined>) => {
      state.active = true;
      state.message = action.payload || 'جارٍ التحميل... ⏳';
    },
    hideLoader: (state) => {
      state.active = false;
      state.message = '';
    },
  },
});

export default loaderSlice.reducer;
export const { showLoader, hideLoader } = loaderSlice.actions;
