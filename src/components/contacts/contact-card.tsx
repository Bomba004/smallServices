/**
 * 📝 @/components/contacts/contact-card.tsx
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لبطاقة جهة الاتصال مع ميزات التعديل والحذف ونسخ رقم الهاتف." }]
 */

import React, { useState } from 'react';
import type { Contact } from '../../types';
import { Button } from '../BUI/button';
import { Edit2, Trash2, Phone, Mail, MoreVertical } from 'lucide-react';
import { formatPhoneNumber } from '../../lib/utils';
import { format } from 'date-fns';

// أنواع props لبطاقة جهة الاتصال
interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

// مكون بطاقة جهة الاتصال
export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onEdit,
  onDelete,
  onPermanentDelete
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // نسخ رقم الهاتف إلى الحافظة
  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(contact.phone);
    // يمكن إضافة toast هنا
  };

  // فتح تطبيق الهاتف
  const makeCall = () => {
    window.open(`tel:${contact.phone}`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      {/* رأس البطاقة مع القائمة */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {contact.name}
        </h3>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>

          {/* قائمة الإجراءات */}
          {showMenu && (
            <div className="absolute left-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  onEdit(contact);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3"
              >
                <Edit2 className="w-4 h-4" />
                تعديل
              </button>
              
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 flex items-center gap-3"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف
                </button>
              ) : (
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    تأكيد الحذف؟
                  </p>
                  <div className="flex gap-1">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        onDelete(contact.id);
                        setShowMenu(false);
                        setShowDeleteConfirm(false);
                      }}
                    >
                      نعم
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      لا
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* معلومات جهة الاتصال */}
      <div className="space-y-3">
        {/* رقم الهاتف */}
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-gray-400" />
          <button
            onClick={copyPhoneNumber}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors text-left"
            title="نسخ الرقم"
          >
            {formatPhoneNumber(
              contact.phone.replace(contact.countryCode, ''),
              contact.countryCode
            )}
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={makeCall}
            title="الاتصال"
          >
            📞
          </Button>
        </div>

        {/* البريد الإلكتروني */}
        {contact.email && (
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <a
              href={`mailto:${contact.email}`}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
            >
              {contact.email}
            </a>
          </div>
        )}

        {/* الملاحظات */}
        {contact.notes && (
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            {contact.notes}
          </div>
        )}

        {/* تاريخ الإنشاء */}
        <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
          تم الإضافة في {format(new Date(contact.createdAt), 'dd/MM/yyyy')}
        </div>
      </div>
    </div>
  );
};