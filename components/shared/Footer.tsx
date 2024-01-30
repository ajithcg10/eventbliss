import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className='flex-center wrapper flex-between flex flex-col gap-5 p-6 text-center sm:flex-row'>
        <Link href="/">
          <Image 
            src={"/assets/images/logo.svg"}
            alt='logo'
            height={90}
            width={128}
          />
        </Link>
        <p>2023 EventBliss. All Rights reserved</p>
      </div>
    </footer>
  )
}
