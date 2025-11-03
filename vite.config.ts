// ✅ استيراد الأدوات اللازمة من Vite
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// ⚙️ إعدادات المشروع الأساسية
export default defineConfig({
  // 🧩 تفعيل مكون React
  plugins: [react()],
  
  // 🎨 إعدادات CSS و PostCSS
  css: {
    postcss: './postcss.config.js', // ملف إعدادات Tailwind و PostCSS
  },

  // ⚡ تحسين أداء التحزيم
  optimizeDeps: {
    include: ['tailwindcss'], // لتسريع تحليل المكتبة
  },

  // 📁 إعداد المسارات القصيرة (Aliases)
  resolve: {
    alias: {
      // يمكنك الآن استخدام هذه الأسماء بدل المسارات الطويلة
      '~': path.resolve(__dirname, './public'), // مجلد الملفات العامة
      '@': path.resolve(__dirname, './src'), // المجلد الرئيسي للكود
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },

  // 🚀 إعداد الخادم المحلي أثناء التطوير
  server: {
    port: 5173, // المنفذ الافتراضي (يمكن تغييره)
    open: true, // يفتح المتصفح تلقائيًا عند التشغيل
    hmr: { overlay: true }, // يعرض الأخطاء داخل المتصفح
    watch: { ignored: ['**/node_modules/**'], } // ✅ تجاهل التحذيرات القادمة من node_modules
  },
  // 📦 إعدادات البناء النهائي
  build: {
    sourcemap: false, // ⛔ إيقاف إنشاء ملفات .map في البناء
  },
  
})
