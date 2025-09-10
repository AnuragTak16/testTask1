import { useState } from 'react';
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
import axios from 'axios';

interface Employee {
  _id: string;
  serNo: number;
  company: string;
  email: string;
  phone: string;
  position: string;
  numberOfLeads: number;
  status: string;
}

interface EditEmployeeModalProps {
  open: boolean;
  employee: Employee;
  onClose: () => void;
  onSubmit: (employee: Employee) => void;
}

export function EditEmployeeModal({
  open,
  employee,
  onClose,
  onSubmit,
}: EditEmployeeModalProps) {
  const [formData, setFormData] = useState({
    company: employee.company,
    email: employee.email,
    phone: employee.phone,
    position: employee.position,
    numberOfLeads: employee.numberOfLeads,
    status: employee.status,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/updateemployee/${employee._id}`,
        {
          serNo: employee.serNo,
          ...formData,
        }
      );

      onSubmit(data.employee);
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error updating employee:',
          error.response?.data || error.message
        );
      } else if (error instanceof Error) {
        console.error(
          'An unexpected error occurred while updating the employee:',
          error.message
        );
      } else {
        console.error('Error adding employee:', error);
      }
    }
  };

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-md bg-white'>
        <DialogHeader className='flex flex-row items-center justify-between'>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>

        <DialogDescription className='mb-4'>
          Update the employee details below.
        </DialogDescription>

        {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Company
            </label>
            <input
              type='text'
              name='company'
              value={formData.company}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
              required
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Phone
              </label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Position
              </label>
              <input
                type='text'
                name='position'
                value={formData.position}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Number of Leads
              </label>
              <input
                type='number'
                name='numberOfLeads'
                value={formData.numberOfLeads}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Status
            </label>
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
              required
            >
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
              <option value='Pending'>Pending</option>
            </select>
          </div>

          <DialogFooter className='flex gap-4 pt-2'>
            <DialogClose asChild>
              <Button
                type='button'
                variant='outline'
                className='flex-1'
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              className='flex-1 bg-red-500 hover:bg-red-600 text-white'
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
