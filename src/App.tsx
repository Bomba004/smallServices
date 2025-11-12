/**
 * @file : @/app.tsx
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "المكون الرئيسي للتطبيق مع إدارة جهات الاتصال ونماذج الإضافة/التعديل والإعدادات" }]
 */

import {
  useState, useEffect, 
  LoaderScreen,

  Contact, useContacts, Header, ContactList, ContactForm, Modal, Button, Plus, Toaster, toast,
  useSettings,
  TEST,

  } from '@/alias';

  const _testLoading = 5000; // محاكاة وقت تحميل البيانات بالمللي ثانية

// المكون الرئيسي للتطبيق
function App() {
  //#region 00 - تحميل البيانات الأولي عند بدء التطبيق, مع عرض شاشة التحميل
    useEffect(() => { loaderProcess(async () => {}, t('loading.loadingData' as string),  _testLoading || 300 ); }, []);
  //#endregion ====-====-====-====-====-====-====-====-====-====-====-====-====-====-====-====-====

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

  // const { t, i18n } = useTranslation() // Hook الترجمة
  const { t, i18n, loaderProcess } = useSettings();

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
  <>
    {/* <Toaster position="top-right" richColors /> */} {/* كومبوننت رسائل الاشعارات */}
    <LoaderScreen /> {/* شاشة التحميل العامة */}
    <div className="min-h-screen | app">
      {/* الرأس */}
      <Header onSettingsOpen={() => setIsSettingsModalOpen(true)} />
      <h1>{t('loading.loadingData' as string)}</h1>
      <h1>{t('app.title')}</h1>

      <br />
      <TEST />
      <br />

      <button onClick={() => loaderProcess(async () => { console.log('loader...'); }, t('loading.loadingData' as string), 2000)}>
        {t('loading.startLoading' as string)}
      </button>

    </div>
  </>
  );
}

export default App;