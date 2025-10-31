
## [X] - تهيئة المشروع:
``` bash
npm create vite@latest ./ -- --template react-ts
npm install
```

## [X] -  تثبيت المكتبات المطلوبة:
``` bash
npm install tailwindcss @tailwindcss/forms @tailwindcss/typography autoprefixer postcss lucide-react clsx tailwind-merge @hookform/resolvers zod js-cookie sonner cmdk date-fns uuid @types/uuid
npm install -D @types/js-cookie
```

## [X] - هيكل الملفات:
``` text
src/
├── components/
│   ├── BUI/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   ├── contacts/
│   │   ├── contact-form.tsx
│   │   ├── contact-list.tsx
│   │   └── contact-card.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   └── sidebar.tsx
│   └── shared/
│       ├── search-input.tsx
│       └── theme-toggle.tsx
├── hooks/
│   ├── use-theme.ts
│   ├── use-localization.ts
│   └── use-contacts.ts
├── lib/
│   ├── utils.ts
│   ├── validations.ts
│   └── constants.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```
### Run Code:
```bash
# إنشاء هيكل الملفات والمجلدات
mkdir -p src/components/{BUI,contacts,layout,shared} src/hooks src/lib src/types

# إنشاء ملفات في components/BUI
touch src/components/BUI/{button.tsx,input.tsx,modal.tsx,toast.tsx}
# إنشاء ملفات في components/contacts
touch src/components/contacts/{contact-form.tsx,contact-list.tsx,contact-card.tsx}
# إنشاء ملفات في components/layout
touch src/components/layout/{header.tsx,sidebar.tsx}
# إنشاء ملفات في components/shared
touch src/components/shared/{search-input.tsx,theme-toggle.tsx}
# إنشاء ملفات في hooks
touch src/hooks/{use-theme.ts,use-localization.ts,use-contacts.ts}
# إنشاء ملفات في lib
touch src/lib/{utils.ts,validations.ts,constants.ts}
# إنشاء ملفات في types
touch src/types/index.ts
# إنشاء الملفات الرئيسية
touch src/{App.tsx,main.tsx}
```


## [ ] - قم بتكويد الملفات:
```
/**
 * 📝 @/
 * Version: 1.0.0
 * lastUpdatedAt:[{ "date": "31/10/2025", "by": ["BomBa"], "comment": "" }]
 */

```

## [ ] - :
```
```

## [ ] - :
```
```

## [ ] - :
```
```

## [ ] - :
```
```
