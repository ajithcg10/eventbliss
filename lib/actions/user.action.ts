'use server'

import { connectDatbase } from "@lib/dataBase"
import User from "@lib/dataBase/models/user.model"
import Event from "@lib/dataBase/models/event.model"
import Order from "@lib/dataBase/models/order.model"
import { handleError } from "@lib/utils"
import { CreateUserParams, UpdateUserParams } from "@types"
import { revalidatePath } from "next/cache"

export async function createUser(user: CreateUserParams) {
    try {
      await connectDatbase()
  
      const newUser = await User.create(user)
      return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
      handleError(error)
    }
  }

export const GetUser = async (userId:string)=>{
    try{
        await connectDatbase()
        const getUser = await User.findById({userId})
        if(!getUser){
            throw new Error(`User ${userId} not found`)
        }
        return JSON.parse(JSON.stringify(getUser))
    }
    catch(err) {
        handleError(err)
    }
   

}



export const updateUser = async (clerkId:string,user:UpdateUserParams) => {
    try{
        await connectDatbase()
        const userUpdate = await User.findOneAndUpdate({clerkId},user,{new:true})
        if(!userUpdate) {
             throw new Error(`User ${user} not found`)
        }
        return JSON.parse(JSON.stringify(userUpdate))
    }
    catch(err) {
        handleError(err)
    }

}

export const deletedUser =async (clerkId:string) => {
    try{
         await connectDatbase()
        const user = await User.findOne({id:clerkId})
        if(!user){
            throw new Error(`User ${clerkId} not found`)
        }
        await Promise.all([
            Event.updateMany(
                {
                    _id:{$in: user.events}
                },
                {$pull:{organizer:user._id}}
            ),

            Order.updateMany(
                {
                    _id:{$in: user.orders}
                },
                {$unset:{buyer:1}}
            ),
        ])
        // Delete user
    const deletedUser = await User.findByIdAndDelete(user._id)
    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
    }
    
