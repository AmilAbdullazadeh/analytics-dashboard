import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';
import jwt from 'jwt-encode';

const SECRET_KEY = 'your-secret-key';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginRequest = z.infer<typeof loginSchema>;

interface LoginResponse {
  token: string;
}

// Mock credentials
const VALID_CREDENTIALS = {
  email: 'test@example.com',
  password: 'test123456',
};

// Mock API implementation
const mockLogin = async (credentials: LoginRequest): Promise<LoginResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (
    credentials.email === VALID_CREDENTIALS.email &&
    credentials.password === VALID_CREDENTIALS.password
  ) {
    // Create a token with proper structure
    const token = jwt(
      {
        sub: '1',
        email: credentials.email,
        roles: ['user'],
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
        name: 'Test User',
        avatar: 'https://example.com/avatar.jpg',
      },
      SECRET_KEY,
    );

    return { token };
  }

  throw new Error('Invalid credentials. Please try again.');
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      queryFn: async (credentials) => {
        try {
          const response = await mockLogin(credentials);
          return { data: response };
        } catch (error) {
          return {
            error: {
              status: 401,
              data: {
                message:
                  error instanceof Error
                    ? error.message
                    : 'Authentication failed',
              },
            },
          };
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
