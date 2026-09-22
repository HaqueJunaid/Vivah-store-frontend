import React from 'react';
import { Plus } from 'lucide-react';

interface AddSubCategoryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const AddSubCategoryButton: React.FC<AddSubCategoryButtonProps> = ({
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Add new sub-category"
      className={`inline-flex items-center gap-1.5 text-xs font-semibold text-[#E41F66] hover:text-[#c41554] transition-colors py-1 px-2.5 rounded-lg hover:bg-[#E41F66]/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent ${className}`}
    >
      <Plus className="size-3.5" />
      <span>Add Sub-Category</span>
    </button>
  );
};

export default React.memo(AddSubCategoryButton);
