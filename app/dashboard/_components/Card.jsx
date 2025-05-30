"use client"
import React from 'react'

function Card({icon , title , value}) {
  return (
    <div className='flex items-center gap-3 p-7 bg-sky-200 rounded-lg shadow-sm'>
      <div className='p-2 h-10 w-10 rounded-full bg-white text-purple-500'>
        {icon}
      </div>
      <div>
        <h2 className='font-bold text-xl'>{title}</h2>
        <h2 className='text-lg'>{value}</h2>
      </div>
    </div>
  )
}

export default Card