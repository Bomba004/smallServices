/**
 * @file : @/components/BUI/img.tsx
 * @version : 1.1.1
 * @lastUpdatedAt : [{ "date": "18/11/2025", "by": ["BomBa"], "comment": "Fix type issues" }]
 */

import { cn } from "@/alias";
import React from "react";

interface I_IMGProps extends React.SVGAttributes<SVGSVGElement> {
  src?: string | null;           // يسمح بـ null بشكل طبيعي
  size?: string | number | null; // الحجم
  className?: string;            // تم إزالة null لتوافق SVGAttributes
}

export const IMG: React.FC<I_IMGProps> = ({
  src = "",
  size = "1em",
  className,
  ...props
}) => {
  const baseStyles = `w-8 h-8`;

  return (
    <svg
      className={cn(baseStyles, className)}
      width={size ?? undefined}
      height={size ?? undefined}
      aria-hidden="true"
      {...props}
    >
      {src && <use href={src} />}
    </svg>
  );
};
