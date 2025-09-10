import { Routes, Route, useLocation } from 'react-router-dom';
import { EmployeeContent } from './components/component/employee-content/employee-table';
import { Sidebar } from './components/component/sidebar';
import { Header } from './components/component/header';
import { LogoutModal } from './components/component/logout';
import Login from './components/component/login';
import { useState } from 'react';
import { Dashboard } from './components/component/dashboard';
import { LeadsContent } from './components/component/lead-content/lead-table';
import Signup from './components/component/signup';

export function App() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();

  // Pages where Sidebar and Header should NOT show
  const authPages = ['/', '/signup'];
  const showLayout = !authPages.includes(location.pathname);

  return (
    <div className='flex h-screen w-full overflow-hidden bg-gray-100'>
      {showLayout && <Sidebar onLogoutClick={() => setShowLogoutModal(true)} />}
      <div
        className={`flex-1 flex flex-col min-h-0 ${
          !showLayout ? 'w-full' : ''
        }`}
      >
        {showLayout && <Header />}
        <main className='flex-1 overflow-auto bg-gray-50 p-6'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/employees' element={<EmployeeContent />} />
            <Route path='/leads' element={<LeadsContent />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </main>
      </div>

      {/* Render Logout Modal */}
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
