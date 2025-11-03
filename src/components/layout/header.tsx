/**
 * @file : @/components/layout/header.tsx
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لرأس التطبيق مع دعم تبديل الثيم واللغة باستخدام أنماط Tailwind CSS" }]
 */

import { Button, Languages, Moon, Settings, Sun, useTranslation, 
  useSettings,
  // useLocalization, useTheme,
 } from "@/alias";



// أنواع props للرأس
interface HeaderProps { onSettingsOpen: () => void; }

// مكون رأس التطبيق
export const Header: React.FC<HeaderProps> = ({ onSettingsOpen }) => {
// 🧠 قراءة الإعدادات من Cookies وتطبيقها مبكرًا
const { theme, language, changeTheme, changeLanguage } = useSettings()

  // const { language, setLanguage, t } = useLocalization();
  const { t } = useTranslation() // Hook الترجمة


  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* العنوان */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">📒</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('appTitle')}
            </h1>
          </div>

          {/* عناصر التحكم */}
          <div className="flex items-center gap-2">
            {/* تبديل اللغة */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => changeLanguage(language === 'ar' ? 'en' : 'ar')}
              title={language === 'ar' ? 'Switch to English' : 'التغيير إلى العربية'}
            >
              <Languages className="w-4 h-4" />
              <span className="mr-2">{language === 'ar' ? 'EN' : 'AR'}</span>
            </Button>

            {/* تبديل الثيم */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { changeTheme(theme === 'light' ? 'dark' : 'light'); }}
              title="تبديل المظهر"
            >
              {theme === 'dark' ? ( <Sun className="w-4 h-4" /> ) : ( <Moon className="w-4 h-4" /> )}
            </Button>

            {/* الإعدادات */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsOpen}
              title="الإعدادات"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};