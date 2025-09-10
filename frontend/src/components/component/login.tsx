'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storedData, setStoredData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/login',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      localStorage.setItem('accessToken', response.data.AccessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setStoredData({
        accessToken: response.data.AccessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
      });
      navigate('/dashboard');
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
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4'>
      <Card className='w-full max-w-md shadow-xl rounded-2xl'>
        <CardHeader className='bg-red-500 rounded-t-2xl'>
          <CardTitle className='text-center text-3xl font-bold text-white py-6'>
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className='p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
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
                className='mt-1 focus:ring-red-500 focus:border-red-500'
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
                className='mt-1 focus:ring-red-500 focus:border-red-500'
              />
            </div>

            {error && <p className='text-red-500 text-sm'>{error}</p>}

            <Button
              type='submit'
              className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Button
              type='button'
              className='w-full border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3 rounded-lg transition'
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
