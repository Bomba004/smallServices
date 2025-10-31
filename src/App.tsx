/**
 * 📝 @/app.tsx
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "المكون الرئيسي للتطبيق مع إدارة جهات الاتصال ونماذج الإضافة/التعديل والإعدادات" }]
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/header';
import { ContactList } from './components/contacts/contact-list';
import { ContactForm } from './components/contacts/contact-form';
import { Modal } from './components/BUI/modal';
import { Button } from './components/BUI/button';
import { useContacts } from './hooks/use-contacts';
import { useLocalization } from './hooks/use-localization';
import type { Contact } from './types';
import { Plus, Settings } from 'lucide-react';
import { toast, Toaster } from 'sonner';

// المكون الرئيسي للتطبيق
function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    contacts,
    searchQuery,
    setSearchQuery,
    addContact,
    updateContact,
    softDeleteContact
  } = useContacts();

  const { t } = useLocalization();

  // معالجة إضافة جهة اتصال جديدة
  const handleAddContact = async (contactData: any) => {
    setIsLoading(true);
      try {
      addContact(contactData);
      toast.success(t('contactAdded' as any));
      setIsAddModalOpen(false);
    } catch (error) {
      toast.error('حدث خطأ أثناء الإضافة');
    } finally {
      setIsLoading(false);
    }
  };

  // معالجة تحديث جهة اتصال
  const handleUpdateContact = async (contactData: any) => {
    if (!editingContact) return;
    
    setIsLoading(true);
    try {
      updateContact(editingContact.id, contactData);
      toast.success(t('contactUpdated' as any));
      setEditingContact(null);
      setIsAddModalOpen(false);
    } catch (error) {
      toast.error('حدث خطأ أثناء التحديث');
    } finally {
      setIsLoading(false);
    }
  };

  // معالجة حذف جهة اتصال
  const handleDeleteContact = (id: string) => {
    softDeleteContact(id);
    toast.success(t('contactDeleted' as any));
  };

  // فتح نموذج التعديل
  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsAddModalOpen(true);
  };

  // إغلاق النموذج
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingContact(null);
  };

  // إدارة اختصارات لوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + N: إضافة جهة اتصال جديدة
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setIsAddModalOpen(true);
      }

      // Ctrl/Cmd + F: التركيز على البحث
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }

      // Escape: إغلاق النماذج
      if (e.key === 'Escape') {
        handleCloseModal();
        setIsSettingsModalOpen(false);
      }

      // F12: طباعة
      if (e.key === 'F12') {
        e.preventDefault();
        window.print();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* الرأس */}
      <Header onSettingsOpen={() => setIsSettingsModalOpen(true)} />

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* شريط العنوان والإجراءات */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('contactsList' as any)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                إدارة جهات الاتصال الخاصة بك بسهولة وأمان
              </p>
            </div>

            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t('addContact' as any)}
            </Button>
          </div>

          {/* قائمة جهات الاتصال */}
          <ContactList
            contacts={contacts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
            onPermanentDelete={handleDeleteContact}
          />
        </div>
      </main>

      {/* زر الإضافة العائم */}
      <Button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full shadow-lg z-40 print:hidden"
        size="lg"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* مودال إضافة/تعديل جهة اتصال */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        title={editingContact ? t('editContact' as any) : t('addContact' as any)}
        size="lg"
      >
        <ContactForm
          contact={editingContact || undefined}
          onSubmit={editingContact ? handleUpdateContact : handleAddContact}
          onCancel={handleCloseModal}
          isLoading={isLoading}
        />
      </Modal>

      {/* مودال الإعدادات */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title={t('settings' as any)}
        size="md"
      >
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            إعدادات النظام والثيم واللغة
          </p>
          {/* يمكن إضافة المزيد من الإعدادات هنا */}
        </div>
      </Modal>

      {/* نظام الإشعارات */}
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white dark:border-gray-700',
        }}
      />
    </div>
  );
}

export default App;