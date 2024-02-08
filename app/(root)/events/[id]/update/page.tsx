import { auth } from '@clerk/nextjs'
import Eventform from '@components/shared/Eventform'
import React from 'react'

export default function UpdateEvent() {
  const {sessionClaims} = auth()
  const userId = sessionClaims?.userId as string
  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-center bg-cover py-5 md:py-10'>
        <h3 className='wrapper text-center sm:text-left h3-bold'>Update Event</h3>
      </section>

      <div className='wrapper my-8'>
        <Eventform userId={userId} type="Update"/>
      </div>
    </>
  )
}
