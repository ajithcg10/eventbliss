import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import CategoryFillter from "@components/shared/CategoryFillter";
import Collection from "@components/shared/Collection";
import Serach from "@components/shared/Serach";
import { getAllEvents } from "@lib/actions/event.actions";
import { SearchParamProps } from "@types";

import Image from "next/image";
import Link from "next/link";

export default async function Home({searchParams}:SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const serachText = searchParams?.query as string
  const category= searchParams?.category as string
  

  const event = await getAllEvents(
{    query:serachText,
    category,
    page:page,
    limit:4}
  );


const {sessionClaims} = auth()
const userId = sessionClaims?.userId as string

  
  return (
    <>
    {/* SpotLight Section */}
      <section id="spot-light" className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            <Button size={"lg"} asChild className="button w-full sm:w-fit">
              <Link href={"#events"}>Explore Now</Link>
            </Button>
          </div>
          <Image 
            src={"/assets/images/hero.png"} 
            alt="hero" width={1000}
            height={1000} 
            className="object-contain max-h-[70vh] object-center 2xl:max-h-[50vh]: "
          />
        </div>
      </section>
      {/* SpotLight Section end */}
      {/* Event Section */}
      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold ">Trust by <br /> Thousands of Events</h2>
        <div className="flex w-full flex-col gap-5 md:row">
          <Serach placeholder="Serach...."/>
          <CategoryFillter/>
        </div>
        <Collection
          data={event?.data}
          emptyTitle="No Events Found"
          emptyStateSubText="come back later"
          collectionType="All_Events"
          limt={2}
          page={page}
          totalPages={event?.totalPages}
        />
      </section>
    </>
  );
}
