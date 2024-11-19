import React from 'react'
const CartDrawerPlaceholder = () => {
  return (
    <div className="p-3">
      {[...Array(6)]?.map((_, index) => (
        <div key={index} className="flex w-full rounded my-5">
          <div className="animated-background w-[65px] h-[65px]"></div>
          <div className="pl-2 w-full">
            <div className="animated-background  w-full h-[10px] mb-2"></div>
            <div className="animated-background  w-1/2 h-[10px]"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartDrawerPlaceholder
