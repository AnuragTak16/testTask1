'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
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

interface Lead {
  id: number;
  serNo: number;
  company: string;
  email: string;
  phone: string;
  tags: string[];
  status: string;
  employee: string;
}

interface EditLeadDialogProps {
  open: boolean;
  onClose: () => void;
  lead: Lead;
  onSubmit: (lead: Omit<Lead, 'id'>) => void;
}

export function EditLeadModal({
  open,
  onClose,
  lead,
  onSubmit,
}: EditLeadDialogProps) {
  const [formData, setFormData] = useState({
    company: lead.company,
    email: lead.email,
    phone: lead.phone,
    tag: lead.tags[0] || '',
    status: lead.status,
    employee: lead.employee,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      serNo: lead.serNo,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      tags: formData.tag ? [formData.tag] : [],
      status: formData.status,
      employee: formData.employee,
    });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-lg bg-white'>
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
          <DialogDescription>
            Update the details of the selected lead.
          </DialogDescription>
        </DialogHeader>

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
                Phone Number
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

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Upload Image
            </label>
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center'>
              <Upload className='w-8 h-8 text-gray-400 mx-auto mb-2' />
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='mt-1'
              >
                Choose from gallery
              </Button>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Tag
              </label>
              <input
                type='text'
                name='tag'
                value={formData.tag}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
              />
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
                <option value=''>Select status</option>
                <option value='Contacted'>Contacted</option>
                <option value='Qualified'>Qualified</option>
                <option value='Pending'>Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Employee
            </label>
            <select
              name='employee'
              value={formData.employee}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
              required
            >
              <option value='Facebook'>Facebook</option>
              <option value='Google'>Google</option>
              <option value='LinkedIn'>LinkedIn</option>
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
            >
              Update Lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
