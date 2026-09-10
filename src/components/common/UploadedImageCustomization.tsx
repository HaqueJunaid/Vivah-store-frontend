import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Image as ImageIcon, X, ExternalLink, Maximize2 } from 'lucide-react';

interface UploadedImageCustomizationProps {
  imageUrl: string;
  itemTitle?: string;
  className?: string;
  compact?: boolean;
}

export const UploadedImageCustomization: React.FC<UploadedImageCustomizationProps> = ({
  imageUrl,
  itemTitle = 'Uploaded Custom Image',
  className = '',
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!imageUrl) return null;

  return (
    <>
      {/* Interactive Badge / Button */}
      <div 
        className={`relative inline-block ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className={`inline-flex items-center gap-1.5 bg-[#E41F66]/5 border border-[#E41F66]/20 text-[#E41F66] hover:bg-[#E41F66]/10 hover:border-[#E41F66]/40 transition-all duration-200 rounded-md font-medium cursor-pointer shadow-2xs group ${
            compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-0.5'
          }`}
          title="Click to view full uploaded customization image"
        >
          {/* Mini Thumbnail Dot/Icon */}
          <div className="relative w-4 h-4 rounded-sm overflow-hidden bg-stone-200 shrink-0 border border-[#E41F66]/20 flex items-center justify-center">
            <img 
              src={imageUrl} 
              alt="Thumbnail" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // If image fails to load, fallback to icon
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <ImageIcon className="w-2.5 h-2.5 text-[#E41F66] absolute inset-0 m-auto pointer-events-none" />
          </div>

          <span className="opacity-75 font-normal">Uploaded Image:</span>
          <span className="font-semibold underline decoration-dotted underline-offset-2 flex items-center gap-0.5">
            View
            <Maximize2 className="w-2.5 h-2.5 opacity-70 group-hover:scale-110 transition-transform" />
          </span>
        </button>

        {/* Hover Thumbnail Tooltip Preview (Floating) */}
        {isHovered && !isOpen && (
          <div 
            className="absolute bottom-full left-0 mb-2 z-40 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95"
            style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))' }}
          >
            <div className="bg-white border border-stone-200 p-1.5 rounded-xl shadow-xl w-36 overflow-hidden">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-100 border border-stone-100">
                <img 
                  src={imageUrl} 
                  alt="Hover preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="text-[10px] font-semibold text-center text-stone-600 mt-1 truncate">
                Click to expand
              </p>
            </div>
            {/* Tooltip arrow */}
            <div className="w-2.5 h-2.5 bg-white border-b border-r border-stone-200 transform rotate-45 mx-4 -mt-1.5"></div>
          </div>
        )}
      </div>

      {/* Full-Screen / Large Image Modal using Portal */}
      {isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-[#E41F66]/10 text-[#E41F66] rounded-lg">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 text-sm md:text-base leading-tight">
                    Custom Uploaded Image
                  </h3>
                  {itemTitle && (
                    <p className="text-xs text-stone-500 truncate max-w-xs sm:max-w-md">
                      For: {itemTitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors"
                  title="Open original image in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - High Res Image */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-stone-900/5 flex items-center justify-center min-h-[250px] max-h-[70vh]">
              <img
                src={imageUrl}
                alt={itemTitle || 'Custom Uploaded Image'}
                className="max-h-[65vh] max-w-full w-auto object-contain rounded-xl shadow-md border border-stone-200 bg-white"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-stone-100 bg-stone-50 text-xs text-stone-500">
              <span>Press <kbd className="px-1.5 py-0.5 bg-stone-200 rounded text-stone-700 font-mono text-[10px]">Esc</kbd> or click outside to close</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-900 text-white font-medium hover:bg-stone-800 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default UploadedImageCustomization;
