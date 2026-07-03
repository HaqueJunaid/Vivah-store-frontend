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
    <div className="relative w-full min-h-screen bg-stone-50 flex">
      <Sidebar isOpen={isOpen} setIsOpen={handleSetIsOpen} />
      <div className="flex-1 min-h-screen lg:pl-68">
        <Breadcrum setIsOpen={handleSetIsOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout