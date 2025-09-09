'use client';
import { LayoutDashboard, Users, Building2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  // const menuItems = [
  //   { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  //   { id: 'leads', label: 'Leads', icon: Users },
  //   { id: 'employee', label: 'Employee', icon: Building2 },
  //   { id: 'logout', label: 'Logout', icon: LogOut },
  // ];
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'leads', label: 'Leads', icon: Users, path: '/leads' },
    { id: 'employee', label: 'Employee', icon: Building2, path: '/employees' },
    // { id: 'logout', label: 'Logout', icon: LogOut, path: '/login' },
  ];

  return (
    <>
      {/* {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={onClose}
        /> */}
      {/* )} */}

      <div
        className={`  
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-80 bg-white border-r border-gray-200 
        flex flex-col flex-shrink-0
      
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}
      >
        {/* <div className='lg:hidden p-4 border-b border-gray-200'>
          <button
            onClick={onClose}
            className='p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100'
          >
            <X className='w-6 h-6' />
          </button>
        </div> */}

        <div className='p-6'>
          <button className='w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors'>
            Connect CRM
          </button>
        </div>

        <nav className='flex-1'>
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 hover:bg-gray-100 transition-colors ${
                  isActive ? 'bg-gray-200 font-semibold' : 'text-gray-700'
                }`
              }
              onClick={() => {
                if (item.id === 'logout') {
                  // Optional: handle logout logic here
                  console.log('Logging out...');
                }
              }}
            >
              <item.icon className='w-5 h-5' />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer space */}
        {/* <div className='p-6'>
          <div className='text-xs text-gray-400 text-center'>
            CRM Admin Panel v1.0
          </div>
        </div> */}
      </div>
    </>
  );
}
