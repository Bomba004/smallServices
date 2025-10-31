/**
 * 📝 @/components/contacts/contact-list.tsx
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لقائمة جهات الاتصال مع ميزات البحث والإحصائيات, وإظهار حالة عدم وجود نتائج." }]
 */

import React from 'react';
import type { Contact } from '../../types';
import { ContactCard } from './contact-card';
import { Search } from 'lucide-react';

// أنواع props لقائمة جهات الاتصال
interface ContactListProps {
  contacts: Contact[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

// مكون قائمة جهات الاتصال
export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  searchQuery,
  onSearchChange,
  onEdit,
  onDelete,
  onPermanentDelete
}) => {
  return (
    <div className="space-y-6">
      {/* شريط البحث */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="ابحث بالاسم أو رقم الهاتف..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* إحصائيات */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        عرض {contacts.length} جهة اتصال
      </div>

      {/* قائمة جهات الاتصال */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
            onPermanentDelete={onPermanentDelete}
          />
        ))}
      </div>

      {/* حالة عدم وجود نتائج */}
      {contacts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📱</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchQuery ? 'لا توجد نتائج' : 'لا توجد جهات اتصال'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery 
              ? 'جرب استخدام كلمات بحث مختلفة'
              : 'ابدأ بإضافة جهة اتصال جديدة'
            }
          </p>
        </div>
      )}
    </div>
  );
};