'use client';
import { LayoutDashboard, Users, Building2, LogOut, X } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  currentPage,
  onPageChange,
  onLogout,
  isOpen,
  onClose,
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'employee', label: 'Employee', icon: Building2 },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={onClose}
        />
      )}

      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-80 bg-white border-r border-gray-200 
        flex flex-col flex-shrink-0
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}
      >
        <div className='lg:hidden p-4 border-b border-gray-200'>
          <button
            onClick={onClose}
            className='p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <div className='p-6'>
          <button className='w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors'>
            Connect CRM
          </button>
        </div>

        <nav className='flex-1 px-6'>
          <ul className='space-y-3'>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (item.id === 'logout') {
                        onLogout();
                      } else {
                        onPageChange(item.id);
                      }
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-red-50 text-red-600 border-l-4 border-red-500 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? 'text-red-600' : 'text-gray-500'
                      }`}
                    />
                    <span className='font-medium'>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
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
