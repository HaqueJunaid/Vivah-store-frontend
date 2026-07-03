import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`bg-stone-200 animate-pulse rounded-md ${className}`} />
);

export const ProductCardSkeleton: React.FC = () => (
    <div className="border border-stone-200/50 rounded-none bg-white shadow-xs flex flex-col h-full">
        {/* Aspect Square image skeleton */}
        <div className="w-full aspect-square bg-stone-100 animate-pulse border-b border-stone-100" />
        
        {/* Info content skeleton */}
        <div className="p-4 md:p-5 flex flex-col flex-grow space-y-3">
            <Skeleton className="w-1/3 h-3 rounded-none" />
            <Skeleton className="w-3/4 h-4 rounded-none" />
            <Skeleton className="w-1/4 h-3.5 rounded-none" />
            <div className="pt-4 mt-auto">
                <Skeleton className="w-full h-10 rounded-none" />
            </div>
        </div>
    </div>
);

export const AddressSkeleton: React.FC = () => (
    <div className="border border-stone-300 rounded-md p-4 mb-4 mt-4 bg-white space-y-3 animate-pulse">
        <Skeleton className="w-2/3 h-6 mb-4" />
        <div className="space-y-2">
            <div className="flex justify-between w-full max-w-md"><Skeleton className="w-24 h-4" /><Skeleton className="w-40 h-4" /></div>
            <div className="flex justify-between w-full max-w-md"><Skeleton className="w-24 h-4" /><Skeleton className="w-40 h-4" /></div>
            <div className="flex justify-between w-full max-w-md"><Skeleton className="w-24 h-4" /><Skeleton className="w-40 h-4" /></div>
            <div className="flex justify-between w-full max-w-md"><Skeleton className="w-24 h-4" /><Skeleton className="w-40 h-4" /></div>
        </div>
        <div className="flex space-x-4 pt-4">
            <Skeleton className="w-20 h-9 rounded-lg" />
            <Skeleton className="w-20 h-9 rounded-lg" />
        </div>
    </div>
);

export const CartItemSkeleton: React.FC = () => (
    <div className="p-6 border border-stone-200 bg-white rounded-lg flex gap-4 items-center animate-pulse">
        <Skeleton className="w-24 h-24 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
            <Skeleton className="w-1/2 h-5" />
            <Skeleton className="w-1/4 h-4" />
            <Skeleton className="w-1/3 h-4" />
        </div>
        <Skeleton className="w-24 h-8 rounded-md shrink-0" />
    </div>
);

export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 5 }) => (
    <tr className="border-b border-stone-200 animate-pulse">
        {Array.from({ length: columns }).map((_, i) => (
            <td key={i} className="px-4 py-3">
                <Skeleton className="w-full h-4" />
            </td>
        ))}
    </tr>
);
