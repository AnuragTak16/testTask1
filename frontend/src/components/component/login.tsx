'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storedData, setStoredData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call API route /api/login
      const response = await axios.post('/api/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Save tokens and user info in localStorage
      localStorage.setItem('accessToken', response.data.AccessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setStoredData({
        accessToken: response.data.AccessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Something went wrong');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = localStorage.getItem('user');

    if (accessToken && refreshToken && user) {
      setStoredData({ accessToken, refreshToken, user: JSON.parse(user) });
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold text-gray-900'>
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='you@example.com'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='********'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className='text-red-500 text-sm'>{error}</p>}

            <Button
              type='submit'
              className='w-full bg-red-500 hover:bg-red-600 text-white'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {storedData && (
        <Card className='w-full max-w-md shadow-lg p-4'>
          <CardTitle className='text-lg font-bold text-gray-900 mb-2'>
            Stored Login Data
          </CardTitle>
          <pre className='bg-gray-100 p-4 rounded'>
            {JSON.stringify(storedData, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}
