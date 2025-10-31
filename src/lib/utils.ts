/**
 * 📝 @/lib/utils.ts
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "استيراد المكتبات والأنواع اللازمة, وتضمين دعم Tailwind CSS" }]
 */


import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { COUNTRY_CODES } from './constants';

// دالة لدمج classes مع Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// دالة للتحقق من صحة رقم الهاتف حسب الدولة
export function validatePhoneNumber(phone: string, countryCode: string): boolean {
  const country = COUNTRY_CODES.find(c => c.code === countryCode);
  if (!country) return false;
  
  return country.pattern.test(phone);
}

// دالة لتنسيق رقم الهاتف
export function formatPhoneNumber(phone: string, countryCode: string): string {
  return `${countryCode} ${phone}`;
}

// دالة للتعامل مع localStorage
export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  }
};