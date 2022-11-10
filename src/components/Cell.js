import React from 'react'

export default function Cell({value}) {
  return (
      <input value={value === 0? '': value} className='cellInput' />
  )
}
