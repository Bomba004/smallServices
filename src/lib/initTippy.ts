/**
 * @file : @/lib/initTippy.ts
 * @version : 1.0.1
 * @lastUpdatedAt : [{ "date": "17/11/2025", "by": ["BomBa"], "comment": "ملف لتنظيم عنوان وصف العناصر" }]
 */

import {
  tippy,
} from '@/alias'

import { Instance } from "tippy.js";

let activeTippies: Instance[] = [];

export function initTippy(selector: string = "[B-title]") {
  // 1) تنظيف التولتيبس النشطة القديمة
  activeTippies.forEach((instance) => instance.destroy());
  activeTippies = [];

  // 2) إنشاء تولتيبس جديدة
  const instances = [
    ...tippy("[data-tippy-content]"),
    ...tippy(selector, {
      content: (reference: Element) =>
        reference.getAttribute("B-title") || "",
    }),
  ];

  activeTippies = instances;
}
