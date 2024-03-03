"use client"
import { Input } from '@components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@lib/utils'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'


export default function Serach({placeholder}:{placeholder:string}) {
const [query, setQuery] = useState('')
const serachParams = useSearchParams()
const router = useRouter()
let newUrl =''
useEffect(()=>{
  const delayDebounce = setTimeout(()=>{
    if(query){
      newUrl = formUrlQuery({
        params:serachParams.toString(),
        key:"query",
        value:query
      })
    }
    else{
      newUrl = removeKeysFromQuery(
     {   params:serachParams.toString(),
        keysToRemove:["query"]}
      )
    }

    router.push(newUrl,{ scroll:false })

  },300)
  return () => clearTimeout(delayDebounce)

},[query,serachParams,router])


  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
    <Image src="/assets/icons/search.svg" alt="search" width={24} height={24} />
    <Input 
      type="text"
      placeholder={placeholder}
      onChange={(e) => setQuery(e.target.value)}
      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  </div>
)
  
}
