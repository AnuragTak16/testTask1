import { useState } from 'react';
import { Upload } from 'lucide-react';
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

interface Lead {
  _id: string;
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
  onSubmit: (updatedLead: Lead) => void;
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
    tag: lead.tags.join(', '),
    status: lead.status,
    employee: lead.employee,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('company', formData.company);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('status', formData.status);
      data.append('employee', formData.employee);
      data.append(
        'tags',
        JSON.stringify(formData.tag.split(',').map((t) => t.trim()))
      );

      if (selectedFile) {
        data.append('image', selectedFile);
      }

      const response = await axios.put(
        `http://localhost:3000/api/updatelead/${lead._id}`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Lead successfully updated:', response.data);

      // call onSubmit to update frontend state
      onSubmit(response.data.lead);
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error updating lead:',
          error.response?.data || error.message
        );
      } else if (error instanceof Error) {
        console.error('Error updating lead:', error.message);
      } else {
        console.error('Error updating lead:', error);
      }
    }
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
          {/* Company */}
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

          {/* Email + Phone */}
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

          {/* File Upload */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Upload Image
            </label>
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center'>
              <Upload className='w-8 h-8 text-gray-400 mx-auto mb-2' />
              <input
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleFileChange}
                id='edit-upload-image'
              />
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='mt-1'
                onClick={() =>
                  document.getElementById('edit-upload-image')?.click()
                }
              >
                Choose from gallery
              </Button>
              {selectedFile && (
                <p className='text-sm mt-2'>{selectedFile.name}</p>
              )}
            </div>
          </div>

          {/* Tags + Status */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Tags (comma separated)
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
                <option value='new'>New</option>
                <option value='contacted'>Contacted</option>
                <option value='qualified'>Qualified</option>
                <option value='lost'>Lost</option>
              </select>
            </div>
          </div>

          {/* Employee */}
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
