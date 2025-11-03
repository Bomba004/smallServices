/* generate-json-locales.ts
هذا الملف يقوم بتحويل ملفات الترجمة الى JSON, حيث المشروع يعمل باستخدام ملفات TS للترجمة

⚠️ تأكد من أن ts-node مُثبت
npm i -D ts-node

امر التشغيل:
node --loader ts-node/esm src/i18n/generate-json-locales.ts



*/
// src/i18n/generate-json-locales.ts

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = ['en', 'ar'];
const baseLocalesPath = path.join(__dirname, 'locales');

for (const locale of locales) {
  const inputPath = path.join(baseLocalesPath, locale, 'index.ts');
  const outputPath = path.join(baseLocalesPath, locale, 'translation.json');

  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠ ملف غير موجود: ${inputPath}`);
    continue;
  }

  try {
    const moduleUrl = pathToFileURL(inputPath).href;
    const translationModule = await import(moduleUrl);
    const translation = translationModule.default;
    fs.writeFileSync(outputPath, JSON.stringify(translation, null, 2), 'utf-8');
    console.log(`✔ تم تحويل ${locale}/index.ts إلى translation.json`);
  } catch (err) {
    console.error(`❌ خطأ أثناء تحويل ${locale}:`, err);
  }
}
