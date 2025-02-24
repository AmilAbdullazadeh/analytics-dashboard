import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { router } from './routes';
import { setCredentials } from '@/store/features/auth/authSlice';
import { getAuthToken, isAuthenticated } from '@/utils/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for existing valid token on app load
    const token = getAuthToken();
    if (token && isAuthenticated()) {
      dispatch(setCredentials({ token }));
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
