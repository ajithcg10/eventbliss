'use client'
import { headerLink } from '@constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavItems() {
  const pathName = usePathname()
  
  
 
  return (
    <ul className='md:flex-between flex w-full  items-start gap-5 max-md:flex-col'>
      {headerLink.map((item)=>{

        return ( 
          <li key={item.label} className={item.route === pathName ? "text-primary-500 flex-center p-medium-16 whitespace-nowrap":"flex-center p-medium-16 whitespace-nowrap"}>
            <Link href={item.route}>
                  {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
