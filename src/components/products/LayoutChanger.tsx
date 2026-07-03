import React from 'react'
import type { LayoutChangerProps, LayoutChangerMode as LayoutMode } from '../../types/allTypes'

const LayoutChanger: React.FC<LayoutChangerProps> = ({ layout, setLayout }) => {
  const baseBtn =
    'inline-flex items-center justify-center h-8 w-8 text-stone-600 hover:text-stone-900'
  const activeBtn = 'border border-stone-800 text-stone-900'

  const Icon = ({ columns }: { columns: 2 | 3 | 4 }) => {
    return (
      <div className='gap-0.5 grid' style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns * 2 }).map((_, idx) => (
          <span key={idx} className='block bg-current/70 w-1 h-2.5' />
        ))}
      </div>
    )
  }

  // const ListIcon = () => (
  //   <div className='flex flex-col gap-1 w-4'>
  //     <span className='block bg-current/70 w-full h-0.5' />
  //     <span className='block bg-current/70 w-full h-0.5' />
  //     <span className='block bg-current/70 w-full h-0.5' />
  //   </div>
  // )

  return (
    <div className='flex items-center gap-1.5'>
      <button
        type='button'
        className={`${baseBtn} ${layout === 'grid-2' ? activeBtn : ''}`}
        onClick={() => setLayout('grid-2')}
        aria-label='2 column grid'
      >
        <Icon columns={2} />
      </button>
      <button
        type='button'
        className={`${baseBtn} ${layout === 'grid-3' ? activeBtn : ''}`}
        onClick={() => setLayout('grid-3')}
        aria-label='3 column grid'
      >
        <Icon columns={3} />
      </button>
      <button
        type='button'
        className={`${baseBtn} ${layout === 'grid-4' ? activeBtn : ''}`}
        onClick={() => setLayout('grid-4')}
        aria-label='4 column grid'
      >
        <Icon columns={4} />
      </button>
    </div>
  )
}

export default LayoutChanger
