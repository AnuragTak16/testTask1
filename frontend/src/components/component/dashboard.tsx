'use client';

import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>
          CRM Admin Dashboard
        </h1>
        <p className='text-gray-600 mt-2'>Total number of Subadmin in CRM.</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-lg border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>Leads</h3>
          <p className='text-3xl font-bold text-gray-900 mb-2'>7,527</p>
          <p className='text-sm text-gray-600'>Total number of leads in CRM.</p>
        </div>
        <div className='bg-white p-6 rounded-lg border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>Employees</h3>
          <p className='text-3xl font-bold text-gray-900 mb-2'>21</p>
          <p className='text-sm text-gray-600'>
            Total number of employees in CRM.
          </p>
        </div>
      </div>
    </div>
  );
};
