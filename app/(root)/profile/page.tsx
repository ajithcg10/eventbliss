import { auth } from '@clerk/nextjs'
import Collection from '@components/shared/Collection'
import { Button } from '@components/ui/button'
import { getEventsByUser } from '@lib/actions/event.actions'
import Link from 'next/link'
import React from 'react'

export default async function Profile() {
  const {sessionClaims} = auth()
  const userId = sessionClaims?.userId as string 
  const organizedEvents = await getEventsByUser({userId,page:1})
  console.log(organizedEvents);
  
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

    {/* <section className="wrapper my-8">
      <Collection 
        data={orderedEvents}
        emptyTitle="No event tickets purchased yet"
        emptyStateSubtext="No worries - plenty of exciting events to explore!"
        collectionType="My_Tickets"
        limit={3}
        page={ordersPage}
        urlParamName="ordersPage"
        totalPages={orders?.totalPages}
      />
    </section> */}

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
        page={1}
        urlParamName="eventsPage"
        totalPages={organizedEvents?.totalPages}
      />
    </section>
  </>
  )
}
