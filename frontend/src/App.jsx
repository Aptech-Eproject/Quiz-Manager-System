
import {
  Route,
  Routes,
  useLocation
} from "react-router-dom"

import PublicRoutes from "./shared/routes/PublicRoutes";
import AdminRoutes from "./shared/routes/AdminRoutes";
import UserRoutes from "./shared/routes/UserRoutes";
import NotFound from './shared/pages/NotFound';
import Footer from './shared/components/Footer';

const AppLayout = () => {
  const location = useLocation();

  const hideFooterRoutes = [
    '/login',
    '/register',
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

          {/* Not Found Routes */}
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
  return (
    <AppLayout />
  )
};

export default App