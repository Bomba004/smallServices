/**
 * @file : src/store/storage/indexedStorage.ts
 * @version : 1.0.1
 * @lastUpdatedAt : [{ "date": "01/11/2025", "by": ["BomBa"], "comment": "تصحيح طريقة التخزين لتعمل مع redux-persist بشكل سليم" }]
 */

import { get, set, del } from 'idb-keyval';

// 🧠 وحدة تخزين مخصصة لـ redux-persist
export const indexedStorage = {
  // 🔹 قراءة العنصر من IndexedDB
  async getItem(key: string): Promise<string | null> {
    try {
      const value = await get(key);
      // ❗ يجب إرجاع القيمة كما هي (string) دون JSON.stringify
      return value ?? null;
    } catch (err) {
      console.error('❌ IndexedDB getItem error:', err);
      return null;
    }
  },

  // 🔹 حفظ العنصر في IndexedDB
  async setItem(key: string, value: string): Promise<void> {
    try {
      // ❗ redux-persist يُرسل القيمة كسلسلة نصية، لذلك نخزنها كما هي
      await set(key, value);
    } catch (err) {
      console.error('❌ IndexedDB setItem error:', err);
    }
  },

  // 🔹 حذف العنصر
  async removeItem(key: string): Promise<void> {
    try {
      await del(key);
    } catch (err) {
      console.error('❌ IndexedDB removeItem error:', err);
    }
  },
};
