/**
 * 📝 @/components/shared/theme-toggle.tsx
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لمكون تبديل الثيم بين الفاتح والداكن والتلقائي, مع دعم عدة أنماط عرض" }]
 */

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '../BUI/button';
import { useTheme } from '../../hooks/use-theme';
import { useLocalization } from '../../hooks/use-localization';
import { cn } from '../../lib/utils';

// واجهة خصائص ThemeToggle
interface ThemeToggleProps {
  variant?: 'button' | 'icon' | 'select';
  className?: string;
}

/**
 * مكون تبديل الثيم بين الفاتح والداكن والتلقائي
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'button',
  className 
}) => {
  const { theme, setTheme, effectiveTheme } = useTheme();
  const { t } = useLocalization();

  // خيارات الثيم
  const themeOptions = [
    {
      value: 'light' as const,
      label: { ar: 'فاتح', en: 'Light' },
      icon: Sun,
    },
    {
      value: 'dark' as const,
      label: { ar: 'داكن', en: 'Dark' },
      icon: Moon,
    },
    {
      value: 'auto' as const,
      label: { ar: 'تلقائي', en: 'Auto' },
      icon: Monitor,
    },
  ];

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const currentIndex = themeOptions.findIndex(opt => opt.value === theme);
          const nextIndex = (currentIndex + 1) % themeOptions.length;
          setTheme(themeOptions[nextIndex].value);
        }}
        className={cn('p-2', className)}
        title={`الثيم الحالي: ${themeOptions.find(opt => opt.value === theme)?.label.ar}`}
      >
        {effectiveTheme === 'dark' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </Button>
    );
  }

  if (variant === 'select') {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('theme')}
        </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {themeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label.ar}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // الوضع الافتراضي (button group)
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('theme')}
      </label>
      <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 p-1">
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isActive = theme === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all flex-1 justify-center',
                isActive
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
              title={option.label.ar}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{option.label.ar}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * نسخة مصغرة لتبديل الثيم (للاستخدام في الرأس)
 */
export const MiniThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, setTheme, effectiveTheme } = useTheme();

  const getNextTheme = () => {
    if (theme === 'light') return 'dark';
    if (theme === 'dark') return 'auto';
    return 'light';
  };

  const getIcon = () => {
    if (theme === 'auto') return Monitor;
    return effectiveTheme === 'dark' ? Moon : Sun;
  };

  const Icon = getIcon();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(getNextTheme())}
      className={cn('p-2', className)}
      title={`تبديل الثيم (${theme})`}
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
};