import { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Employee {
  company: string;
  email: string;
  phone: string;
  position: string;
  numberOfLeads: number;
  status: string;
}

interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (employee: Employee) => void;
}

export function AddEmployeeModal({
  open,
  onClose,
  onSubmit,
}: AddEmployeeDialogProps) {
  const [formData, setFormData] = useState<Employee>({
    company: '',
    email: '',
    phone: '',
    position: '',
    numberOfLeads: 0,
    status: 'Active',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === 'number'
        ? Number.parseInt(e.target.value) || 0
        : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/addemployee',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSubmit(response.data.employee);
      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            'Something went wrong'
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-lg bg-white'>
        <DialogHeader className='flex flex-row items-center justify-between'>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>

        <DialogDescription className='mb-4'>
          Fill out the details below to add a new employee.
        </DialogDescription>

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Company
            </label>
            <input
              type='text'
              name='company'
              value={formData.company}
              onChange={handleChange}
              placeholder='Enter company name'
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400'
              required
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter email address'
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Phone
              </label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='Enter phone number'
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400'
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Position
              </label>
              <input
                type='text'
                name='position'
                value={formData.position}
                onChange={handleChange}
                placeholder='Enter position'
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Number of Leads
              </label>
              <input
                type='number'
                name='numberOfLeads'
                value={formData.numberOfLeads}
                onChange={handleChange}
                placeholder='0'
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Status
            </label>
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 bg-white'
              required
            >
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
              <option value='Pending'>Pending</option>
            </select>
          </div>

          <DialogFooter className='flex gap-4 pt-4'>
            <DialogClose asChild>
              <Button type='button' variant='outline' className='flex-1'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              className='flex-1 bg-red-500 hover:bg-red-600 text-white'
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
