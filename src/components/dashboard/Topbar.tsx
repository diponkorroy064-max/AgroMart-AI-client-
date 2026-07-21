'use client';
import { Menu, X, Sun, Moon, Bell, User as UserIcon } from "lucide-react";
import { useTheme } from 'next-themes';

interface TopbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const Topbar = ({ open, setOpen }: TopbarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-0">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center">

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {open ? (
              <X className="w-6 h-6 text-gray-700 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
            )}
          </button>

        </div>
        <div className="flex items-center">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex text-gray-600 dark:text-gray-300 focus:outline-none mx-4"
          >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          <button className="flex text-gray-600 dark:text-gray-300 focus:outline-none mx-4">
            <Bell className="w-6 h-6" />
          </button>
          <div className="relative">
            <button className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
              <UserIcon className="h-full w-full object-cover" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
