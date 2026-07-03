import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortBy: React.FC<{sort: string, setSort: (sort: string) => void}>  = ({sort, setSort}) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSort = e.target.value;
        setSort(selectedSort);
        searchParams.set('sort', selectedSort);
        setSearchParams(searchParams, { replace: true });
    }

    return (
        <div className='flex items-center gap-2 text-stone-700 text-sm'>
            <span>Sort:</span>
            <div className='relative'>
                <select
                    value={sort}
                    onChange={(e) => handleSortChange(e)}
                    className='px-3 py-2 pr-9 border border-stone-200 focus:border-stone-400 outline-none w-56 text-stone-800 text-sm appearance-none white'
                    aria-label='Sort products'
                >
                    <option value='default'>Default</option>
                    <option value='best-selling'>Best selling</option>
                    <option value='alpha-asc'>Alphabetically, A–Z</option>
                    <option value='alpha-desc'>Alphabetically, Z–A</option>
                    <option value='price-asc'>Price, low to high</option>
                    <option value='price-desc'>Price, high to low</option>
                    <option value='date-asc'>Date, old to new</option>
                    <option value='date-desc'>Date, new to old</option>
                </select>
                <span className='top-1/2 right-3 absolute text-stone-600 -translate-y-1/2 pointer-events-none'>
                    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M6 9L12 15L18 9' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                </span>
            </div>
        </div>
    )
}

export default SortBy