import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { logout } from '@/store/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../ThemeToggle';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const Layout = ({ children, title, description }: LayoutProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>
          {title ? `${title} | ${t('auth.title')}` : t('auth.title')}
        </title>
        <meta
          name="description"
          content={description || t('auth.description')}
        />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Helmet>
      <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <header className="w-full bg-white dark:bg-gray-800 shadow">
          <div className="max-w-[1550px] mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold dark:text-white">
              {t('navigation.dashboard')}
            </h1>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {t('welcome', { name: user?.name || user?.email })}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                {t('navigation.logout')}
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-[1550px] mx-auto p-4 lg:p-8 dark:text-white">
          <div className="col-span-12 md:col-span-9 space-y-6 dark:text-gray-100">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};
