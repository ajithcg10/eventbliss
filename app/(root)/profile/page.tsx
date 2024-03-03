import { auth } from '@clerk/nextjs'
import Collection from '@components/shared/Collection'
import { Button } from '@components/ui/button'
import { getEventsByUser } from '@lib/actions/event.actions'
import { getOrderByUser } from '@lib/actions/order.action'
import { SearchParamProps } from '@types'
import Link from 'next/link'
import React from 'react'

export default async function Profile({searchParams}:SearchParamProps) {
  const {sessionClaims} = auth()
  const userId = sessionClaims?.userId as string 
  const orderPage = Number(searchParams?.orderPage ||1)
  const eventPage = Number(searchParams?.eventPage ||1)
  const organizedEvents = await getEventsByUser({userId,page:eventPage})

  const OrderBYuser = await getOrderByUser({ userId,page:orderPage})



  const data=OrderBYuser?.data.map((ite:any)=>{
    return ite.event
  });
  
  return (
    <>
    {/* My Tickets */}
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      <div className="wrapper flex items-center justify-between max-sm:justify-center">
        <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
        <Button asChild size="lg" className="button hidden sm:flex">
          <Link href="/#events">
            Explore More Events
          </Link>
        </Button>
      </div>
    </section>

    <section className="wrapper my-8">
      <Collection 
        data={data}
        emptyTitle="No event tickets purchased yet"
        emptyStateSubText="No worries - plenty of exciting events to explore!"
        collectionType="My_Tickets"
        limt={3}
        page={orderPage}
        urlParamName="ordersPage"
        totalPages={OrderBYuser?.totalPages}
      />
    </section>

    {/* Events Organized */}
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      <div className="wrapper flex items-center justify-between max-sm:justify-center">
        <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
        <Button asChild size="lg" className="button hidden sm:flex">
          <Link href="/events/create">
            Create New Event
          </Link>
        </Button>
      </div>
    </section>

    <section className="wrapper my-8">
      <Collection 
        data={organizedEvents?.data}
        emptyTitle="No events have been created yet"
        emptyStateSubText="Go create some now"
        collectionType="Event_Organized"
        limt={3}
        page={eventPage}
        urlParamName="eventsPage"
        totalPages={organizedEvents?.totalPages}
      />
    </section>
  </>
  )
}
