import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '@/store/services/authApi';
import { useLoginMutation } from '@/store/services/authApi';
import { setCredentials } from '@/store/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RootState } from '@/store';
import { useTranslation } from 'react-i18next';

type FormData = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const { t } = useTranslation();

  // Get the intended destination
  const from = location.state?.from || '/';

  useEffect(() => {
    // If already authenticated, redirect to intended destination
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials({ token: result.token }));
      // Navigate to the intended destination
      navigate(from, { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.setError('root', {
          message: error.message || 'Invalid credentials',
        });
      } else {
        form.setError('root', {
          message: 'An unexpected error occurred',
        });
      }
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{t('auth.login')}</h2>
          <p className="mt-2 text-gray-600">{t('auth.signInMessage')}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isLoading}
                      placeholder={t('auth.emailPlaceholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.password')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isLoading}
                      placeholder={t('auth.passwordPlaceholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-sm text-red-500 text-center">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('auth.signingIn') : t('auth.login')}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
