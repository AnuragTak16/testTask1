'use client';

import { AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

interface DeleteConfirmModalProps {
  open: boolean;
  itemName: string;
  itemType?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  open,
  itemName,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className='max-w-md bg-white'>
        <div className='text-center my-4'>
          <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <AlertTriangle className='w-6 h-6 text-red-600' />
          </div>
          <AlertDialogDescription>
            Do you really want to delete the
            <span className='font-semibold text-gray-900'>"{itemName}"</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </div>

        <AlertDialogFooter className='flex gap-3'>
          <AlertDialogCancel
            onClick={onClose}
            className='flex-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50'
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className='flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg'
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
