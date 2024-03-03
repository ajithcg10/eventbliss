"use client"
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@lib/utils'
import { ICategory } from '@lib/dataBase/models/category.model'
import { getAllCategories } from '@lib/actions/category.actions'

export default function CategoryFillter() {
  const [categories, setCategories] = useState<ICategory[]>([])
  const serachParams = useSearchParams()
  const router = useRouter()
  let newUrl =''
  // useEffect(()=>{
  //   const delayDebounce = setTimeout(()=>{
  //     if(categories){
  //       newUrl = formUrlQuery({
  //         params:serachParams.toString(),
  //         key:"query",
  //         value:categories
  //       })
  //     }
  //     else{
  //       newUrl = removeKeysFromQuery(
  //      {   params:serachParams.toString(),
  //         keysToRemove:["query"]}
  //       )
  //     }
  //     console.log(newUrl,"newUrl");
  //     router.push(newUrl,{ scroll:false })
  
  //   },300)
  //   return () => clearTimeout(delayDebounce)
  
  // },[categories,serachParams,router])
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[])
    }
   

    getCategories();
  }, [])



  const onSelectCategory =(category:string)=>{
    if(category && category !=="All"){
            newUrl = formUrlQuery({
              params:serachParams.toString(),
              key:"category",
              value:category
            })
          }
          else{
            newUrl = removeKeysFromQuery(
           {   params:serachParams.toString(),
              keysToRemove:["category"]}
            )
          }
     
          router.push(newUrl,{ scroll:false })

  }
  return (
    <Select onValueChange={(value:string)=>onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className='select-item p-regular-14'>All</SelectItem>
        {categories.length > 0 && categories.map((category) => (
          <SelectItem key={category?._id} value={category?.name} className='select-item p-regular-14'>
            {category?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

  )
}
