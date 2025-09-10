import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Dashboard: React.FC = () => {
  const [leadsCount, setLeadsCount] = useState<number | null>(null);
  const [employeesCount, setEmployeesCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [leadsRes, employeesRes] = await Promise.all([
          axios.get('http://localhost:3000/api/leads/count'),
          axios.get('http://localhost:3000/api/employees/count'),
        ]);

        setLeadsCount(leadsRes.data.count);
        setEmployeesCount(employeesRes.data.count);
      } catch (error) {
        console.error('Failed to fetch counts', error);
      }
    };

    fetchCounts();

    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>
          CRM Admin Dashboard
        </h1>
        <p className='text-gray-600 mt-2'>Overview of your CRM data.</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-lg border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>Leads</h3>
          <p className='text-3xl font-bold text-gray-900 mb-2'>
            {leadsCount !== null ? leadsCount : 'Loading...'}
          </p>
          <p className='text-sm text-gray-600'>Total number of leads in CRM.</p>
        </div>
        <div className='bg-white p-6 rounded-lg border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>Employees</h3>
          <p className='text-3xl font-bold text-gray-900 mb-2'>
            {employeesCount !== null ? employeesCount : 'Loading...'}
          </p>
          <p className='text-sm text-gray-600'>
            Total number of employees in CRM.
          </p>
        </div>
      </div>
    </div>
  );
};
