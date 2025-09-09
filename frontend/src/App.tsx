//
import { Routes, Route } from 'react-router-dom';
import { EmployeeContent } from './components/component/employee-table';
import { LeadsContent } from './components/component/lead-table';
import { Sidebar } from './components/component/sidebar';
import { Header } from './components/component/header';
import { LogoutModal } from './components/component/logout';
import Login from './components/component/login';
import Signup from './components/component/signup';
import { useState } from 'react';
import { Dashboard } from './components/component/dashboard';

export function App() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className='flex h-screen w-full overflow-hidden bg-gray-100'>
      <Sidebar />
      <div className='flex-1 flex flex-col min-h-0'>
        <Header />
        <main className='flex-1 overflow-auto bg-gray-50 p-6'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/employees' element={<EmployeeContent />} />
            <Route path='/leads' element={<LeadsContent />} />
            <Route path='/' element={<Dashboard />} />{' '}
            {/* your dashboard JSX */}
          </Routes>
        </main>
      </div>

      {showLogoutModal && (
        <LogoutModal
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => console.log('User logged out')}
        />
      )}
    </div>
  );
}
