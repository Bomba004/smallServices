/**
 * @file : @/lib/constants.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف يحتوي على ثوابت النظام مثل رموز الدول والإعدادات الافتراضية والترجمات" }]
 * 
 */


// استيراد الأنواع المطلوبة
import { type AppSettings, type Country } from '../types';

// ثوابت النظام
export const COUNTRY_CODES: Country[] = [
  {
    code: '+20',
    name: 'مصر',
    flag: '🇪🇬',
    pattern: /^(\+20)?1[0125][0-9]{8}$/
  },
  {
    code: '+966',
    name: 'السعودية',
    flag: '🇸🇦',
    pattern: /^(\+966)?5[0-9]{8}$/
  },
  {
    code: '+971',
    name: 'الإمارات',
    flag: '🇦🇪',
    pattern: /^(\+971)?5[0-9]{8}$/
  },
  {
    code: '+973',
    name: 'البحرين',
    flag: '🇧🇭',
    pattern: /^(\+973)?[36][0-9]{7}$/
  },
  {
    code: '+974',
    name: 'قطر',
    flag: '🇶🇦',
    pattern: /^(\+974)?[35][0-9]{7}$/
  },
  {
    code: '+965',
    name: 'الكويت',
    flag: '🇰🇼',
    pattern: /^(\+965)?[569][0-9]{7}$/
  }
];

// الإعدادات الافتراضية للتطبيق
export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'auto',
  language: 'ar',
  defaultCountry: '+20'
};

// [ ] TODO:Define system translations here
// // ترجمات النظام
// export const TRANSLATIONS = {
//   ar: {
//     appTitle: 'نظام إدارة جهات الاتصال',
//     addContact: 'إضافة جهة اتصال',
//     editContact: 'تعديل جهة اتصال',
//     name: 'الاسم',
//     phone: 'رقم الهاتف',
//     email: 'البريد الإلكتروني',
//     notes: 'ملاحظات',
//     save: 'حفظ',
//     cancel: 'إلغاء',
//     delete: 'حذف',
//     edit: 'تعديل',
//     search: 'بحث...',
//     noContacts: 'لا توجد جهات اتصال',
//     confirmDelete: 'هل أنت متأكد من حذف جهة الاتصال؟',
//     contactAdded: 'تم إضافة جهة الاتصال بنجاح',
//     contactUpdated: 'تم تحديث جهة الاتصال بنجاح',
//     contactDeleted: 'تم حذف جهة الاتصال بنجاح',
//     invalidPhone: 'رقم الهاتف غير صالح',
//     requiredField: 'هذا الحقل مطلوب',
//     settings: 'الإعدادات',
//     theme: 'المظهر',
//     language: 'اللغة',
//     light: 'فاتح',
//     dark: 'داكن',
//     auto: 'تلقائي'
//   },
//   en: {
//     appTitle: 'Contact Management System',
//     addContact: 'Add Contact',
//     editContact: 'Edit Contact',
//     name: 'Name',
//     phone: 'Phone Number',
//     email: 'Email',
//     notes: 'Notes',
//     save: 'Save',
//     cancel: 'Cancel',
//     delete: 'Delete',
//     edit: 'Edit',
//     search: 'Search...',
//     noContacts: 'No contacts available',
//     confirmDelete: 'Are you sure you want to delete this contact?',
//     contactAdded: 'Contact added successfully',
//     contactUpdated: 'Contact updated successfully',
//     contactDeleted: 'Contact deleted successfully',
//     invalidPhone: 'Invalid phone number',
//     requiredField: 'This field is required',
//     settings: 'Settings',
//     theme: 'Theme',
//     language: 'Language',
//     light: 'Light',
//     dark: 'Dark',
//     auto: 'Auto'
//   }
// };