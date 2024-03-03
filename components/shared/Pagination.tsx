"use client"
import { Button } from '@components/ui/button'
import { formUrlQuery } from '@lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type PaginationProps = {
  urlParamName?:string ,
  page:number | string,
  totalPages:number | undefined,
}

export default function Pagination({urlParamName,page,totalPages}:PaginationProps) {
  const router = useRouter()
  const serachParams = useSearchParams()

  const onClick = (btnType:string)=>{
    const PageValue = btnType === 'next' 
    ? Number(page) + 1 
    : Number(page) - 1
    const newUrl = formUrlQuery({
      params:serachParams.toString(),
      key:urlParamName || 'page',
      value:PageValue.toString()
    })
    router.push(newUrl , {scroll:false})
  }
  return (
    <div className='flex gap-2'>
      <Button
      size={'lg'}
      variant={'outline'}
      className='w-28'
      onClick={()=>onClick('prev')}
      disabled={Number(page) <= 1}
      >
          previous
      </Button>
      <Button
      size={'lg'}
      variant={'outline'}
      className='w-28'
      onClick={()=>onClick('next')}
      disabled={Number(page) >= totalPages!}
      >
          Next
      </Button>
    </div>
  )
}
