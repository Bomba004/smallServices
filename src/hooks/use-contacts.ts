/**
 * @file : @/hooks/use-contacts.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لإدارة جهات الاتصال باستخدام React Hook" }]
 */

import { useState, useEffect } from 'react';
import type { Contact } from '../types';
import { storage } from '../lib/utils';
import { v4 as uuidv4 } from 'uuid';

// Hook لإدارة جهات الاتصال
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    return storage.get('contacts') || [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  // حفظ جهات الاتصال في localStorage عند التغيير
  useEffect(() => {
    storage.set('contacts', contacts);
  }, [contacts]);

  // إضافة جهة اتصال جديدة
  const addContact = (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>) => {
    const newContact: Contact = {
      ...contactData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false
    };
    
    setContacts(prev => [newContact, ...prev]);
    return newContact;
  };

  // تحديث جهة اتصال
  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id 
        ? { ...contact, ...updates, updatedAt: new Date() }
        : contact
    ));
  };

  // حذف مؤقت (إخفاء)
  const softDeleteContact = (id: string) => {
    updateContact(id, { isDeleted: true });
  };

  // حذف نهائي
  const permanentDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  // استعادة جهة اتصال محذوفة
  const restoreContact = (id: string) => {
    updateContact(id, { isDeleted: false });
  };

  // فلترة جهات الاتصال حسب البحث والحذف
  const filteredContacts = contacts.filter(contact => 
    !contact.isDeleted && (
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    )
  );

  return {
    contacts: filteredContacts,
    allContacts: contacts,
    searchQuery,
    setSearchQuery,
    addContact,
    updateContact,
    softDeleteContact,
    permanentDeleteContact,
    restoreContact
  };
}