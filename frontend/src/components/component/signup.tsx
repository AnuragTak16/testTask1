'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post('http://localhost:3000/api/signup', formData);

      setMessage('Signup successful! Redirecting to login...');
      setFormData({ name: '', email: '', password: '' });

      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'Something went wrong');
      } else {
        setMessage('Server error, please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <Card className='w-full max-w-md shadow-xl rounded-2xl'>
        <CardHeader className='bg-red-500 rounded-t-2xl'>
          <CardTitle className='text-center text-3xl font-bold text-white py-6'>
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent className='p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                name='name'
                type='text'
                placeholder='John Doe'
                value={formData.name}
                onChange={handleChange}
                required
                className='mt-1 focus:ring-red-500 focus:border-red-500'
              />
            </div>

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

            {message && (
              <p
                className={`text-center text-sm ${
                  message.includes('successful')
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {message}
              </p>
            )}

            <Button
              type='submit'
              className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition'
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>

            <Button
              type='button'
              className='w-full border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3 rounded-lg transition'
              onClick={() => navigate('/')}
            >
              Already have an account? Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
