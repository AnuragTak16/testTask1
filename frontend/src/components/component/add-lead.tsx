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
  serNo: number;
  company: string;
  email: string;
  phone: string;
  tags: string[];
  status: string;
  employee: string;
}

interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (lead: Lead) => void; // optional submit callback
}

export function AddLeadModal({ open, onClose, onSubmit }: AddLeadModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    phone: '',
    tag: '',
    status: '',
    employee: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLead: Lead = {
      serNo: 1,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      tags: formData.tag ? [formData.tag] : [],
      status: formData.status,
      employee: formData.employee,
    };

    if (onSubmit) {
      onSubmit(newLead);
    } else {
      console.log('Lead submitted:', newLead);
    }

    onClose(); // close after submit
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
          <DialogTitle>Add Lead</DialogTitle>
          <DialogDescription>
            Fill out the details below to create a new lead.
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
              placeholder='Loren'
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
                placeholder='example@email.com'
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
                placeholder='+1 234 567 890'
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

              {/* Hidden file input */}
              <input
                type='file'
                accept='image/*'
                id='upload-image'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log('Selected file:', file);
                    // TODO: handle file upload (preview, send to API, etc.)
                  }
                }}
              />

              {/* Button triggers hidden input */}
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='mt-1'
                onClick={() => document.getElementById('upload-image')?.click()}
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
                placeholder='Important'
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
              <option value=''>Select employee</option>
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
              Add Lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
