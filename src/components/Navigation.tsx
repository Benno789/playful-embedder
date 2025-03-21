
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, User } from 'lucide-react';

interface NavigationProps {
  active: 'home' | 'documents' | 'profile' | 'assets';
}

const Navigation: React.FC<NavigationProps> = ({ active }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-around items-center">
        <button 
          className={`flex flex-col items-center justify-center py-2 px-4 ${active === 'home' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => navigate('/dashboard')}
        >
          <Home className="h-6 w-6" />
        </button>
        
        <button 
          className={`flex flex-col items-center justify-center py-2 px-4 ${active === 'documents' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => navigate('/subscriptions')}
        >
          <FileText className="h-6 w-6" />
        </button>
        
        <button 
          className={`flex flex-col items-center justify-center py-2 px-4 ${active === 'profile' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => navigate('/analysis')}
        >
          <User className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
