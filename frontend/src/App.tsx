'use client';

import { useState } from 'react';

import { LeadsContent } from './components/component/lead-table';
import { EmployeeContent } from './components/component/employee-table';
import { Sidebar } from './components/component/sidebar';
import { Header } from './components/component/header';
import { LogoutModal } from './components/component/logout';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const renderContent = () => {
    switch (currentPage) {
      case 'leads':
        return <LeadsContent />;
      case 'employee':
        return <EmployeeContent />;
      case 'dashboard':
      default:
        return (
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                CRM Admin Dashboard
              </h1>
              <p className='text-gray-600 mt-2'>
                Total number of Subadmin in CRM.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-white p-6 rounded-lg border border-gray-200'>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Leads
                </h3>
                <p className='text-3xl font-bold text-gray-900 mb-2'>7,527</p>
                <p className='text-sm text-gray-600'>
                  Total number of leads in CRM.
                </p>
              </div>
              <div className='bg-white p-6 rounded-lg border border-gray-200'>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Employees
                </h3>
                <p className='text-3xl font-bold text-gray-900 mb-2'>21</p>
                <p className='text-sm text-gray-600'>
                  Total number of employees in CRM.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    console.log('User logged out');
    setShowLogoutModal(false);
  };

  return (
    <div className='flex h-screen w-full overflow-hidden bg-gray-100'>
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      <div className='flex-1 flex flex-col min-h-0'>
        <Header />
        <main className='flex-1 overflow-auto bg-gray-50 p-6'>
          {renderContent()}
        </main>
      </div>
      {showLogoutModal && (
        <LogoutModal
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={confirmLogout}
        />
      )}
    </div>
  );
}

export default App;
