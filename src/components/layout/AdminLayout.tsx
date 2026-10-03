import { Outlet } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import Breadcrum from '../Admin/Breadcrum';
import { useState } from 'react';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen bg-stone-50 flex overflow-x-hidden">
      {/* Mobile Translucent Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Redesigned Sidebar */}
      <Sidebar isOpen={isOpen} onClose={handleClose} />

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen min-w-0 max-w-full lg:pl-72 flex flex-col transition-all duration-300">
        <Breadcrum setIsOpen={handleToggle} />
        <main className="flex-1 w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;