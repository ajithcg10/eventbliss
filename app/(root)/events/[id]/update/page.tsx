import { auth } from '@clerk/nextjs'
import Eventform from '@components/shared/Eventform'
import { getEventById } from '@lib/actions/event.actions'
import React from 'react'

type UpdateEventprops= {
params:{
  id:string,
}
}
export default async function UpdateEvent({params:{id} }:UpdateEventprops) {
  const {sessionClaims} = auth()
  const userId = sessionClaims?.userId as string
  
  
  const event = await getEventById(id)
 
  
  
  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-center bg-cover py-5 md:py-10'>
        <h3 className='wrapper text-center sm:text-left h3-bold'>Update Event</h3>
      </section>

      <div className='wrapper my-8'>
        <Eventform userId={userId} event={event} eventId={event?._id} type="Update"/>
      </div>
    </>
  )
}
