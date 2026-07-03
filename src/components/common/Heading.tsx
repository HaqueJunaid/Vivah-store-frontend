import React from 'react'

const Heading: React.FC<{title: string}> = ({title}) => {
  return (
    <div>
        <h1 className='w-full font-semibold text-stone-900 text-4xl text-center'>{title}</h1>
    </div>
  )
}

export default Heading