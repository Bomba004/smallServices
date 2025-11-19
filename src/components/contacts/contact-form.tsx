/**
 * @file : @/components/contacts/contact-form.tsx
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لنموذج إضافة/تعديل جهة الاتصال مع حقول للتحقق من الصحة وقائمة اختيار الدولة" }]
 */

import React, { useState, useEffect } from 'react';
import type { Contact, Country } from '../../types';
import { Input } from '../BUI/input';
import { Button } from '../BUI/button';
import { COUNTRY_CODES } from '../../lib/constants';
import { validatePhoneNumber } from '../../lib/utils';
import { Search, ChevronDown } from 'lucide-react';

// أنواع props للنموذج
interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// مكون نموذج إضافة/تعديل جهة الاتصال
export const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '+20',
    email: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCountryList, setShowCountryList] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  // تعبئة البيانات عند التعديل
  useEffect(() => {
    if (contact) {
      const { countryCode, phone } = contact;
      const phoneWithoutCode = phone.replace(countryCode, '');
      
      setFormData({
        name: contact.name,
        phone: phoneWithoutCode,
        countryCode,
        email: contact.email || '',
        notes: contact.notes || ''
      });
    }
  }, [contact]);

  // فلترة الدول حسب البحث
  const filteredCountries = COUNTRY_CODES.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch)
  );

  // التحقق من صحة البيانات
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!validatePhoneNumber(formData.phone, formData.countryCode)) {
      newErrors.phone = 'رقم الهاتف غير صالح لهذه الدولة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // إرسال النموذج
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        phone: formData.countryCode + formData.phone,
        countryCode: formData.countryCode,
        email: formData.email.trim() || undefined,
        notes: formData.notes.trim() || undefined
      });
    }
  };

  // تحديث حقل في النموذج
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // اختيار دولة
  const handleCountrySelect = (country: Country) => {
    handleChange('countryCode', country.code);
    setShowCountryList(false);
    setCountrySearch('');
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.code === formData.countryCode);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* حقل الاسم */}
      <Input
        label="الاسم"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        required
        autoFocus
      />

      {/* حقل رقم الهاتف مع اختيار الدولة */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          رقم الهاتف
        </label>
        
        <div className="flex gap-2">
          {/* اختيار كود الدولة */}
          <div className="relative flex-1 max-w-[140px]">
            <button
              type="button"
              onClick={() => setShowCountryList(!showCountryList)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white flex items-center justify-between"
            >
              <span>{selectedCountry?.flag} {selectedCountry?.code}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* قائمة الدول */}
            {showCountryList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {/* شريط البحث في القائمة */}
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث عن دولة..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                {/* قائمة الدول */}
                <div className="py-1">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1 text-right">
                        <div className="font-medium">{country.name}</div>
                        <div className="text-sm text-gray-500">{country.code}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* حقل رقم الهاتف */}
          <div className="flex-1">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="رقم الهاتف"
            />
          </div>
        </div>
        
        {errors.phone && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
        )}
      </div>

      {/* حقل البريد الإلكتروني */}
      <Input
        label="البريد الإلكتروني (اختياري)"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
      />

      {/* حقل الملاحظات */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          الملاحظات (اختياري)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
          placeholder="أي ملاحظات إضافية..."
        />
      </div>

      {/* أزرار الإجراءات */}
      <div className="flex gap-3 justify-end pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          إلغاء
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'جاري الحفظ...' : (contact ? 'تحديث' : 'إضافة')}
        </Button>
      </div>
    </form>
  );
};