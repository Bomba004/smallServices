/**
 * 📝 @/lib/validations.ts
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف التحقق من صحة البيانات, التنسيق، وعمليات مساعدة أخرى" }]
 */

import { COUNTRY_CODES } from './constants';

/**
 * مكتبة التحقق من صحة البيانات في النظام
 */

// واجهة لأخطاء التحقق
export interface ValidationErrors {
  [key: string]: string;
}

/**
 * التحقق من صحة رقم الهاتف حسب كود الدولة
 */
export function validatePhoneNumber(phone: string, countryCode: string): boolean {
  if (!phone.trim()) return false;
  
  const country = COUNTRY_CODES.find(c => c.code === countryCode);
  if (!country) return false;
  
  // إزالة المسافات والشارات الخاصة
  const cleanPhone = phone.replace(/\s+/g, '').replace(/[-\+()]/g, '');
  const fullPhone = countryCode + cleanPhone;
  
  return country.pattern.test(fullPhone);
}

/**
 * التحقق من صحة البريد الإلكتروني
 */
export function validateEmail(email: string): boolean {
  if (!email.trim()) return true; // اختياري
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * التحقق من صحة الاسم
 */
export function validateName(name: string): boolean {
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 50;
}

/**
 * التحقق من صحة الملاحظات
 */
export function validateNotes(notes: string): boolean {
  return notes.length <= 500; // حد أقصى 500 حرف
}

/**
 * التحقق من صحة بيانات جهة الاتصال كاملة
 */
export function validateContact(data: {
  name: string;
  phone: string;
  countryCode: string;
  email?: string;
  notes?: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  // التحقق من الاسم
  if (!data.name.trim()) {
    errors.name = 'الاسم مطلوب';
  } else if (!validateName(data.name)) {
    errors.name = 'الاسم يجب أن يكون بين 2 و 50 حرف';
  }

  // التحقق من رقم الهاتف
  if (!data.phone.trim()) {
    errors.phone = 'رقم الهاتف مطلوب';
  } else if (!validatePhoneNumber(data.phone, data.countryCode)) {
    errors.phone = 'رقم الهاتف غير صالح لهذه الدولة';
  }

  // التحقق من البريد الإلكتروني
  if (data.email && !validateEmail(data.email)) {
    errors.email = 'البريد الإلكتروني غير صالح';
  }

  // التحقق من الملاحظات
  if (data.notes && !validateNotes(data.notes)) {
    errors.notes = 'الملاحظات يجب ألا تزيد عن 500 حرف';
  }

  return errors;
}

/**
 * تنسيق رقم الهاتف لعرضه بشكل جميل
 */
export function formatPhoneForDisplay(phone: string, countryCode: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const phoneWithoutCode = cleanPhone.replace(countryCode.replace('+', ''), '');
  
  // تنسيق حسب الدولة
  switch (countryCode) {
    case '+20': // مصر
      return `${countryCode} ${phoneWithoutCode.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')}`;
    
    case '+966': // السعودية
      return `${countryCode} ${phoneWithoutCode.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')}`;
    
    case '+971': // الإمارات
      return `${countryCode} ${phoneWithoutCode.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')}`;
    
    default:
      return `${countryCode} ${phoneWithoutCode}`;
  }
}

/**
 * استخراج كود الدولة من رقم الهاتف الكامل
 */
export function extractCountryCode(phone: string): string {
  const country = COUNTRY_CODES.find(c => phone.startsWith(c.code));
  return country?.code || '+20'; // افتراضي مصر
}

/**
 * استخراج رقم الهاتف بدون كود الدولة
 */
export function extractPhoneWithoutCode(phone: string, countryCode: string): string {
  return phone.replace(countryCode, '').trim();
}