import { Search, Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className='bg-white border-b border-gray-200 px-6 py-4 lg:px-8'>
      <div className='flex items-center justify-between'>
        {/* Mobile menu button */}
        <div className='flex items-center gap-4'>
          <button
            onClick={onMenuClick}
            className='lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100'
          >
            <Menu className='w-6 h-6' />
          </button>

          {/* Search bar */}
          <div className='flex-1 w-full max-w-md lg:max-w-lg'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                placeholder='Search leads, employees...'
                className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm'
              />
            </div>
          </div>
        </div>

        {/* Right side - notifications and user profile */}
        <div className='flex items-center gap-4'>
          {/* Notifications */}
          <button className='p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg relative'>
            <Bell className='w-6 h-6' />
            <span className='absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>

          {/* User profile */}
          <div className='flex items-center gap-3'>
            <div className='hidden sm:block text-right'>
              <div className='text-sm font-semibold text-gray-900'>
                John Doe
              </div>
              <div className='text-xs text-gray-500'>Administrator</div>
            </div>
            <div className='w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md'>
              <span className='text-sm font-semibold text-white'>JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
