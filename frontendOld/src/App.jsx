
import {
  Route,
  Routes,
  useLocation
} from "react-router-dom"
import { useEffect } from "react";

import PublicRoutes from "./shared/routes/PublicRoutes";
import AdminRoutes from "./shared/routes/AdminRoutes";
import UserRoutes from "./shared/routes/UserRoutes";
import NotFound from './shared/pages/NotFound';
import Forbidden from './shared/pages/Forbidden';
import Footer from './shared/components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuthStore } from './features/auth/stores/authStore';

const AppLayout = () => {
  const location = useLocation();

  const hideFooterRoutes = [
    '/login',
    '/register',
    '/set-password',
    '*'
  ];

  const showFooterRoutes = [
    '/',
    '/home',
    '/quizzes-list',
    '/favorite-quizzes'
  ];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname) || !showFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        {/* Public Routes */}
        <Routes>
          {/* Public routes */}
          {PublicRoutes()}

          {/* Admin routes */}
          {AdminRoutes()}

          {/* User routes */}
          {UserRoutes()}

          {/* Error Routes */}
          <Route path='/403' element={<Forbidden />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </main>

      {!shouldHideFooter && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  )
}

const App = () => {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div>
      <AppLayout />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
};

export default App