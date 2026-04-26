import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div 
      className="font-bold text-xl tracking-tight gradient-text select-none"
      style={{ width }}
    >
      MegaBlog
    </div>
  )
}

export default Logo
