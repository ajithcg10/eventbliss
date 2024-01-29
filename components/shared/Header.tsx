import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import MobileNav from './MobileNav'


export default function Header() {
  return (
    <header className='w-full border-b'>
        <div className='wrapper flex justify-between items-center'>
            <Link href={"/"} className='w-36'>
                <Image src={"/assets/images/logo.svg"} alt='logo' width={128} height={36} />
            </Link>
            <SignedIn>
                <nav className='md:flex hidden w-full max-w-xs'>
                    <NavItems/>
                </nav>
            </SignedIn>
            <div className='flex w-32 justify-end gap-3'>
                <SignedIn>
                    <UserButton afterSignOutUrl='/'/>
                    <MobileNav/>
                </SignedIn>
                <SignedOut>
                    <Button className='rounded-full'>
                        <Link href="/sign-in">
                        Login
                        </Link>
                    </Button>
                </SignedOut>
            </div>
        </div>
    </header>
    )}

