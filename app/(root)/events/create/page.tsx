import { auth } from '@clerk/nextjs'
import Eventform from '@components/shared/Eventform'
import React from 'react'

export default function CreateEvent() {
  const {sessionClaims} = auth()
  const userId = sessionClaims?.userId as string
  
  // const userId = "65c539523026e23c2ae7f81a"
  console.log(userId,"idjjhhiu");
  
  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-center bg-cover py-5 md:py-10'>
        <h3 className='wrapper text-center sm:text-left h3-bold'>Create Event</h3>
      </section>

      <div className='wrapper my-8'>
        <Eventform userId={userId} type="Create"/>
      </div>
    </>
  )
}
