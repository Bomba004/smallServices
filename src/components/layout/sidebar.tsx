/**
 * 📝 @/components/layout/sidebar.tsx
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لمكون الشريط الجانبي للتطبيق, مع دعم التنقل بين الأقسام المختلفة" }]
 */

import React from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  Star, 
  Archive,
  Trash2,
  HelpCircle 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLocalization } from '../../hooks/use-localization';

// عناصر القائمة الجانبية
const menuItems = [
  {
    id: 'home',
    label: { ar: 'الرئيسية', en: 'Home' },
    icon: Home,
    href: '#',
    active: true,
  },
  {
    id: 'contacts',
    label: { ar: 'جهات الاتصال', en: 'Contacts' },
    icon: Users,
    href: '#contacts',
    active: false,
  },
  {
    id: 'favorites',
    label: { ar: 'المفضلة', en: 'Favorites' },
    icon: Star,
    href: '#favorites',
    active: false,
  },
  {
    id: 'archived',
    label: { ar: 'المؤرشفة', en: 'Archived' },
    icon: Archive,
    href: '#archived',
    active: false,
  },
  {
    id: 'trash',
    label: { ar: 'المحذوفة', en: 'Trash' },
    icon: Trash2,
    href: '#trash',
    active: false,
  },
];

const bottomMenuItems = [
  {
    id: 'settings',
    label: { ar: 'الإعدادات', en: 'Settings' },
    icon: Settings,
    href: '#settings',
  },
  {
    id: 'help',
    label: { ar: 'المساعدة', en: 'Help' },
    icon: HelpCircle,
    href: '#help',
  },
];

// واجهة خصائص Sidebar
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

/**
 * مكون الشريط الجانبي للتطبيق
 */
export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentView,
  onViewChange,
}) => {
  const { language, t } = useLocalization();

  // إغلاق الشريط الجانبي عند النقر خارجها (للجوال)
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* overlay للجوال */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* الشريط الجانبي */}
      <div
        id="sidebar"
        className={cn(
          'fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:transform-none',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* رأس الشريط الجانبي */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('appTitle')}
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* قائمة التنقل الرئيسية */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose(); // إغلاق الشريط على الجوال بعد الاختيار
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-right rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.label[language]}</span>
                </button>
              );
            })}
          </nav>

          {/* إحصائيات سريعة */}
          <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">42</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'جهة اتصال' : 'Contacts'}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'مفضلة' : 'Favorites'}
                </div>
              </div>
            </div>
          </div>

          {/* القائمة السفلية */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-right text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.label[language]}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};