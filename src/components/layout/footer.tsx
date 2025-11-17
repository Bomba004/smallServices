/**
 * @file : @/components/layout/footer.tsx
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "17/11/2025", "by": ["BomBa"], "comment": "ملف لزيل التطبيق" }]
 */

import {
  // useLocalization, useTheme,
  } from "@/alias";



export const Footer: React.FC = () => {
  return (
    <footer className="">
      <hr className="w-full f"/>
      
      <div className="container mx-auto px-4 py-4">
        {/* القسم العلوي */}
        {/* القسم السفلي */}
        <div className="flex items-center justify-center">
          <p className="bg1">BonBa</p>
        </div>
      </div>

    </footer>
  );
};