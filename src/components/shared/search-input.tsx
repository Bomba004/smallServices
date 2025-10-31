/**
 * 📝 @/components/shared/search-input.tsx
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لمكون حقل البحث المتقدم مع إمكانيات الفلترة" }]
 */

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLocalization } from '../../hooks/use-localization';

// خيارات الفلترة
export interface FilterOptions {
  country?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  tags?: string[];
}

// واجهة خصائص SearchInput
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFilterChange?: (filters: FilterOptions) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  showFilters?: boolean;
}

/**
 * مكون حقل البحث المتقدم مع إمكانيات الفلترة
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onFilterChange,
  placeholder,
  className,
  autoFocus = false,
  showFilters = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  
  const inputRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  
  const { t } = useLocalization();

  // إغلاق لوحة الفلترة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // معالجة مسح البحث
  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  // معالجة تغيير الفلتر
  const handleFilterChange = (newFilters: FilterOptions) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  // اختصارات لوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      
      if (e.key === 'Escape' && value) {
        handleClear();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [value]);

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 transition-all duration-200',
          isFocused && 'ring-2 ring-blue-500 border-blue-500',
          value && 'border-blue-300 dark:border-blue-700'
        )}
      >
        {/* أيقونة البحث */}
        <div className="flex items-center justify-center pl-3 text-gray-400">
          <Search className="w-5 h-5" />
        </div>

        {/* حقل الإدخال */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || t('search')}
          className="w-full px-3 py-3 bg-transparent border-0 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          autoFocus={autoFocus}
        />

        {/* مجموعة الأزرار */}
        <div className="flex items-center gap-1 pr-2">
          {/* زر المسح */}
          {value && (
            <button
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded"
              title="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* زر الفلترة */}
          {showFilters && (
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={cn(
                  'p-1 transition-colors rounded',
                  Object.keys(filters).length > 0
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                )}
                title="الفلترة المتقدمة"
              >
                <Filter className="w-4 h-4" />
              </button>

              {/* لوحة الفلترة */}
              {showFilterPanel && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    الفلترة المتقدمة
                  </h3>
                  
                  <div className="space-y-4">
                    {/* فلترة حسب الدولة */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        الدولة
                      </label>
                      <select
                        value={filters.country || ''}
                        onChange={(e) => handleFilterChange({ 
                          country: e.target.value || undefined 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">كل الدول</option>
                        <option value="+20">مصر</option>
                        <option value="+966">السعودية</option>
                        <option value="+971">الإمارات</option>
                        <option value="+973">البحرين</option>
                        <option value="+974">قطر</option>
                        <option value="+965">الكويت</option>
                      </select>
                    </div>

                    {/* أزرار الإجراءات */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => {
                          setFilters({});
                          onFilterChange?.({});
                        }}
                        className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      >
                        إعادة تعيين
                      </button>
                      <button
                        onClick={() => setShowFilterPanel(false)}
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        تطبيق
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* تلميح اختصار لوحة المفاتيح */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-gray-400 border border-gray-300 dark:border-gray-600 rounded">
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">K</kbd>
          </div>
        </div>
      </div>

      {/* نتائج البحث السريع (يمكن توسيعه لاحقاً) */}
      {value && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-40 max-h-60 overflow-y-auto">
          <div className="p-3 text-sm text-gray-500 dark:text-gray-400">
            اكتب للبحث في الأسماء وأرقام الهواتف...
          </div>
        </div>
      )}
    </div>
  );
};