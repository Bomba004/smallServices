/**
 * @file : @/lib/initTippy.ts
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "17/11/2025", "by": ["BomBa"], "comment": "ملف لتنظيم عنوان وصف العناصر" }]
 */

import {
  tippy,
} from '@/alias'

export function initTippy(selector: string = "[B-title]"): void {
  // تطبيق Tippy على عناصر تحمل data-tippy-content
  tippy("[data-tippy-content]", {
    // theme: 'light'
  });

  // تطبيق Tippy على العناصر باستخدام السيلكتور الداعم لـ B-title
  tippy(selector, {
    content: (reference: Element) =>
      reference.getAttribute("B-title") || "",
      // theme: 'custom'
      // theme: 'gradient'
  });
}
