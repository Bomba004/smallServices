// ✅ استيراد الأدوات
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// ⚙️ إعدادات Vite
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './public'),
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },

  // 🚀 إعداد الخادم المحلي
  server: {
    port: 5173,
    open: true,
    hmr: { overlay: true },
    watch: { ignored: ['**/node_modules/**'] },
  },

  // ⚡ إعدادات البناء (إيقاف الـ source maps)
  build: {
    sourcemap: false, // ⛔ إيقاف إنشاء ملفات .map نهائيًا
  },

  // ⚙️ إعدادات التطوير — لإخفاء التحذيرات الخاصة بالـ source map
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})
