/* p:0.1.r2
------------------------------------------------------ */

//#region 📦 استيراد المكتبات والوحدات الأساسية
// import React, { lazy } from "react";
import { 
  React, lazy,
  T_Link,
 } from "@/alias";

// import { createBrowserRouter, Navigate, RouterProvider } from "@/alias";
//#endregion

//#region 🧩 استيراد الأنواع والأيقونات
// import { FiFileText, FaUsersViewfinder, MdWarehouse, GrPieChart } from "@/utils/alias-Image-Icons";
//#endregion

//#region 🧭 تعريف الروابط (Links)
/**
 * @description مصفوفة روابط التنقل الرئيسية في التطبيق
 */
export const List_Links: T_Link[] = [
  { id: 1, to: '/', label: 'home' },
  { id: 2, to: '/about', label: 'about' },
  { id: 3, to: '/careers', label: 'careers' },
  { id: 4, to: '/history', label: 'history' },
  { id: 5, to: '/services', label: 'services' },
  { id: 6, to: '/contact', label: 'contact' },
  { id: 7, to: '/projects', label: 'projects' },
  { id: 8, to: '/blog', label: 'blog' },
  { id: 9, to: '/dashboard', label: 'dashboard' },
  { id: 10, to: '/dashboard__app', label: 'dashboard__app' },

  // روابط داخلية لتطبيق لوحة التحكم
  { id: 101, to: '/dashboard__app/invoices', label: 'Invoices', icon: <FiFileText /> },
  { id: 102, to: '/dashboard__app/accounts', label: 'Accounts', icon: <FaUsersViewfinder /> },
  { id: 103, to: '/dashboard__app/warehouses', label: 'Warehouses', icon: <MdWarehouse /> },
  { id: 104, to: '/dashboard__app/reports', label: 'Reports', icon: <GrPieChart /> },
];
//#endregion

//#region ⏳ تحميل مؤجل مع تأخير (Lazy Load with Delay)
/**
 * @function lazyWithDelay
 * @description تحميل مكون بشكل كسول (Lazy) مع تأخير زمني لإظهار شاشة تحميل لفترة محددة
 */
export const lazyWithDelay = (importFunc: () => Promise<any>, delay = 1000) =>
  React.lazy(() =>
    Promise.all([
      importFunc(),
      new Promise(res => setTimeout(res, delay)),
    ]).then(([module]) => module)
  );
//#endregion

//#region 🧱 تحميل التخطيطات (Layouts)
const MainLayout = lazy(() => import("@/layouts/MainLayout/MainLayout").then(m => ({ default: m.MainLayout })));
const MainLayout2 = lazy(() => import("@/layouts/MainLayout/MainLayout").then(m => ({ default: m.MainLayout2 })));
const AuthLayout = lazy(() => import("@/pages/auth/AuthLayout"));
const PrivateRoute = lazy(() => import("@/components/auth/PrivateRoute"));
const PrivateRouteUserOK = lazy(() => import("@/components/auth/PrivateRouteUserOK"));
//#endregion

//#region 🧩 تحميل المكونات العامة
import { /* LottieHandler, */ PageSuspenseFallback } from "@/components/feedback";
//#endregion

//#region 📄 تحميل الصفحات (Pages)
import { ErrorPage as Error } from "@/pages/ErrorPage";
// const ErrorPage = lazy(() => import("@/pages/ErrorPage"));

// const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Dashboard__App = lazy(() => import("@/pages/dashboard__app"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
//#endregion

//#region 🌐 إعداد مسارات التطبيق (Router Setup)
export const AppRouter = () => {

  
  /**
   * @function element
   * @description  دالة لعرض شاشة تحميل برسالة مترجمة
   * @description دالة لتحديد التخطيط (Layout) المستخدم لكل صفحة
   */
  const element = ({ header = true, footer = true, layout = 1 }: { header: boolean; footer: boolean; layout?: number }) => (
    <PageSuspenseFallback>
      {
        layout === 1 ? <MainLayout setting={{ header, footer }} /> :
        layout === 2 ? <MainLayout2 setting={{ header, footer }} /> : <></>
      }
    </PageSuspenseFallback>
  );
  /**
   * @function elementChildren
   * @description  دالة لعرض الاقسام الداخية مع قسم تحميل برسالة مترجمة
   */
  // const elementChildren = ({ children , auth= false}: { children: React.ReactNode, auth: Boolean }) => (
  //  !auth? <PageSuspenseFallback> <PrivateRoute> {children} </PrivateRoute> </PageSuspenseFallback> :
  //         <PageSuspenseFallback> <PrivateRouteUserOK> {children} </PrivateRouteUserOK> </PageSuspenseFallback>
  // );

  // تعريف جميع المسارات
  const router = createBrowserRouter(
    [
      //#region 🏠 الصفحة الرئيسية
      //! 🏠 (توجيه مباشر إلى الصفحة الرئيسية Home)
      // {
      //   path: "/",
      //   errorElement: <Error />,
      //   element: element({ header: true, footer: true }),
      //   children: [
      //     { index: true, element: <PageSuspenseFallback><Home /></PageSuspenseFallback> },
      //   ],
      // },
      
      //! 🏠 (توجيه مباشر إلى لوحة التحكم)
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
        errorElement: <Error />
      },
      //#endregion

      //#region 📊 لوحة التحكم الرئيسية
      {
        path: "/dashboard",
        errorElement: <Error />,
        element: element({ header: true, footer: true }),
        children: [
          {
            index: true,
            element: <PageSuspenseFallback><PrivateRoute><Dashboard /></PrivateRoute></PageSuspenseFallback>
          },
        ],
      },
      //#endregion

      //#region 🧭 لوحة التحكم الداخلية (Dashboard__App)
      {
        path: "/dashboard__app",
        errorElement: <Error />,
        element: element({ header: true, footer: false, layout: 2 }),
        children: [
          {
            index: true,
            element: <PageSuspenseFallback><PrivateRoute><Dashboard__App /></PrivateRoute></PageSuspenseFallback>
          },
        ],
      },
      //#endregion

      //#region 🔐 تسجيل الدخول
      {
        path: "/login",
        errorElement: <Error />,
        element: element({ header: false, footer: true }),
        children: [
          {
            index: true,
            element: 
            // <PageSuspenseFallback>
            //   <PrivateRouteUserOK>
            //     <h1>BomBaaaaaa</h1>
            //   </PrivateRouteUserOK>
            // </PageSuspenseFallback>,
            <PageSuspenseFallback>
              <PrivateRouteUserOK>
                <AuthLayout children_Is="Login">
                  <Login />
                </AuthLayout>
              </PrivateRouteUserOK>
            </PageSuspenseFallback>,
          },
        ],
      },
      //#endregion

      //#region ✍️ تسجيل حساب جديد
      {
        path: "/register",
        errorElement: <Error />,
        element: element({ header: true, footer: true }),
        children: [
          {
            index: true,
            element: <PageSuspenseFallback>
              <PrivateRouteUserOK>
                <AuthLayout children_Is="Register">
                  <Register />
                </AuthLayout>
              </PrivateRouteUserOK>
            </PageSuspenseFallback>,
          },
        ],
      },
      //#endregion
    ],
    {
      // إعدادات مستقبلية لمكتبة react-router
      future: {
        // v7_startTransition: true,
        v7_relativeSplatPath: true,
      }
    }
  );

  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
};
//#endregion

export default AppRouter;
