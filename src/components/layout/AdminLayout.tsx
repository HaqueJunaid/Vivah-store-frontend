import { Outlet } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import Breadcrum from '../Admin/Breadcrum';
import { useState } from 'react';

const AdminLayout = () => {

  const [isOpen, setIsOpen] = useState(false);
  const handleSetIsOpen = () => {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="relative w-full min-h-screen bg-stone-50 flex overflow-x-hidden">
      {isOpen && (
        <div 
          className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={handleSetIsOpen}
          aria-hidden="true"
        />
      )}
      <Sidebar isOpen={isOpen} setIsOpen={handleSetIsOpen} />
      <div className="flex-1 min-h-screen min-w-0 max-w-full lg:pl-68 flex flex-col">
        <Breadcrum setIsOpen={handleSetIsOpen} />
        <main className="flex-1 w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout