import { auth } from '@clerk/nextjs'
import { IEvent } from '@lib/dataBase/models/event.model'
import { formatDateTime } from '@lib/utils'
import { log } from 'console'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeletCofrimation'


type  CardProps ={
    event:IEvent,
    hidePrice?:boolean,
    hasOrderLink?:boolean

}
export default function Card({event,hidePrice,hasOrderLink}:CardProps) {
 const {sessionClaims} =auth()
 const userId = sessionClaims?.userId as string
const isEventCreator = userId === event?.organizer?._id.toString()


 
  
  return (
    <div className='group relative flex  min-h-[380px] w-full max-w-[400x] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] '>
        <Link 
            href={`/events/${event?._id}`}
            style={{backgroundImage:`url(${event?.imageUrl})`}}
            className='flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500' 
        />
        {isEventCreator && !hidePrice &&(
          <div className='absolute top 2 right-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
            <Link href={`/events/${event?._id}/update`}>
              <Image src={"/assets/icons/edit.svg"} alt='edit' width={20} height={
                20
              }/>
            </Link>
            <DeleteConfirmation eventId={event?._id}/>
          </div>
        )}


        <div
         
          className='flex min-h-[230x] flex-col gap-3 p-5 md:gap-4' 
        >
          {!hidePrice &&
               <div className='flex gap-2 '>
               <span className='p-semibold-14 w-min  rounded-full bg-green-100 px-4 y-1 text-green-600'>{event?.isFree ? "Free":`$${event?.price}`}</span>
               <p className='line-clamp-1 p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500'>{event?.category?.name}</p>
             </div>
          }
          <p className='p-medium-16  p-medium-18 text-grey-500'>
            {formatDateTime(event?.startDateTime).dateTime}
          </p>
          <Link  href={`/events/${event?._id}`}>
          <p className='p-medium-16 md:p-medium-20 flex-1 text-black line-clamp-2'>{event?.title}</p>
          </Link>
         
          <div className='flex-between w-full'>
            <p className='p-medium-14 md:p-medium-15 text-grey-600'>
              {event?.organizer?.firstName} {event?.organizer?.lastName}
            </p>
            {hasOrderLink && (
              <Link className='flex items-center' href={`/ordersPage?eventId=${event._id}`}>
                <p className='text-primary-500 mr-2'>Order Details</p>
                <Image  src="/assets/icons/arrow.svg" alt='icon' width={10} height={10}/>
              </Link>
            )}
          </div>
        </div>

  
    </div>
  )
}
