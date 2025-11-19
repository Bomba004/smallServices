/**
 * @file : @/components/ui/toast.tsx
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف مكون Toast لعرض الإشعارات للمستخدم, مع دعم لأنواع متعددة من الإشعارات" }]
 */

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

// أنواع Toast المتاحة
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// واجهة خصائص Toast
interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

// أيقونات لكل نوع من Toast
const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

// ألوان وخلفيات لكل نوع
const toastStyles = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-300',
    icon: 'text-green-500',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-300',
    icon: 'text-red-500',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-300',
    icon: 'text-yellow-500',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-300',
    icon: 'text-blue-500',
  },
};

/**
 * مكون Toast لعرض الإشعارات للمستخدم
 */
export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  const [isLeaving, setIsLeaving] = useState(false);
  
  const Icon = toastIcons[type];
  const styles = toastStyles[type];

  useEffect(() => {
    // إغلاق Toast تلقائياً بعد المدة المحددة
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  return (
    <div
      className={cn(
        'flex items-center w-full max-w-sm p-4 mb-2 rounded-md shadow-lg border transform transition-all duration-300',
        styles.bg,
        styles.border,
        isLeaving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      )}
      role="alert"
    >
      {/* أيقونة النوع */}
      <div className={cn('flex-shrink-0', styles.icon)}>
        <Icon className="w-5 h-5" />
      </div>
      
      {/* الرسالة */}
      <div className={cn('mr-3 text-sm font-medium flex-1', styles.text)}>
        {message}
      </div>
      
      {/* زر الإغلاق */}
      <button
        type="button"
        onClick={handleClose}
        className={cn(
          'ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 inline-flex items-center justify-center h-8 w-8 transition-colors',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          styles.text
        )}
        aria-label="إغلاق"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// نظام إدارة multiple toasts
interface ToastManagerProps {
  toasts: Array<{
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
  }>;
  onRemoveToast: (id: string) => void;
}

/**
 * مدير Toast لعرض عدة إشعارات في وقت واحد
 */
export const ToastManager: React.FC<ToastManagerProps> = ({
  toasts,
  onRemoveToast,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={onRemoveToast}
        />
      ))}
    </div>
  );
};