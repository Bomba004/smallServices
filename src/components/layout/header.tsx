/**
 * @file : @/components/layout/header.tsx
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لرأس التطبيق مع دعم تبديل الثيم واللغة باستخدام أنماط Tailwind CSS" }]
 */

import { Button, Settings, useTranslation, 
  BtnLanguage,
  BtnTheme,
  // useLocalization, useTheme,
  } from "@/alias";



// أنواع props للرأس
interface HeaderProps { onSettingsOpen: () => void; }

// مكون رأس التطبيق
export const Header: React.FC<HeaderProps> = ({ onSettingsOpen }) => {
// 🧠 قراءة اللغة من Cookies وتطبيقها مبكرًا
const { t } = useTranslation() // Hook الترجمة
// const { language, setLanguage, t } = useLocalization();
const imag_logo = `/images/icons/logo.svg#logo_001`;

  return (
    <header className="">
      <div className="container mx-auto px-4 py-4 | ">
        <div className="flex items-center justify-between">
          {/* الشعار و العنوان */}
          <div className="flex items-center gap-3">
            {/* <img src={imag_logo} alt="Logo" className="w-8 h-8" /> */}
            <svg className="w-8 h-8"> <use href={imag_logo} /> </svg>

            <h1 className="text-xl font-bold text-gray-900 dark:text-white | ellipsis-12ch"
              B-title={t('app.title')}
            >
              {t('app.title')}
            </h1>
          </div>

          {/* عناصر التحكم */}
          <div className="flex items-center gap-2">
            {/* تبديل اللغة */}
            <BtnLanguage />
            {/* تبديل الثيم */}
            <BtnTheme />
            {/* الإعدادات */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsOpen}
              title={t('CompGlobal.btnTitle' as string)}

            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <hr className="w-full f"/>
    </header>
  );
};