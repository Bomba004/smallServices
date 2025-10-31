/**
 * 📝 @/types/index.ts
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "" }]
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لضبط و تنظيم الانواع" }]
 */

// أنواع جديدة للـ Toast
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type Theme = 'light' | 'dark' | 'auto';
export type Language = 'ar' | 'en';
export type PrintFormat = 'a4' | 'a5' | 'receipt';



// واجهة خصائص Toast
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// أنواع جديدة للفلترة
export interface FilterOptions {
  country?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  tags?: string[];
}

// أنواع إضافية للإعدادات
export interface AppSettings {
  theme: Theme;
  language: Language;
  defaultCountry: string;
  enableNotifications: boolean;
  autoBackup: boolean;
  searchFilters: FilterOptions;
}

// أنواع TypeScript للنظام
export interface Contact {
  id: string;
  name: string;
  phone: string;
  countryCode: string;
  email?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

// نوع الدولة
export interface Country {
  code: string;
  name: string;
  flag: string;
  pattern: RegExp;
}

// نوع إعدادات التطبيق
export interface AppSettings {
  theme: Theme;
  language: Language;
  defaultCountry: string;
}