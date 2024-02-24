"use client"
import { SignIn } from "@clerk/clerk-react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "@components/ui/button";
import { IEvent } from '@lib/dataBase/models/event.model'
import Link from "next/link";
import React from 'react'
import Checkout from "./Checkout";

export default function CheckoutButton({event}:{event:IEvent}) {
    const { user } = useUser();
    
    const userId = user?.publicMetadata.userId as string
   
    
    const hasEventFinished = new Date(event.startDateTime) < new Date()
  return (
    <div className="flex items-center gap-3">
        {
            hasEventFinished ? 
            <p className="p-2 text-red-400">Tickets Not Available</p>
            :
            <>
            <SignedOut>
              <Button asChild size="lg" className="button rounded-full">
                <Link href="/sign-in">
                    Get Tickets
                </Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Checkout event={event} userId={userId}/>
            </SignedIn>
            </>

        }

    </div>
  )
}
