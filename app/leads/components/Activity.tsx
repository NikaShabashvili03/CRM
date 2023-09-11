import { format, parse } from 'date-fns';
import React, { useEffect, useState } from 'react'
import dateFormat from "dateformat";

import { IoTimeOutline } from 'react-icons/io5';
import { BiNotepad } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {RiAdminFill} from 'react-icons/ri'
import axios from 'axios';
export default function Activity({activity, key, AllStatus, currentUser, setActivityModal, setCommentModal, activityEdit, setActivityEdit}: any) {
    const [editActivity, setEditActivity] = useState(false)
    const Status = AllStatus[activity.status]
    const router = useRouter();
    const activityDelete = () => {
        axios.post(`/api/activity/delete/${activity.id}`).then(() => {
            router.refresh();
            setEditActivity(false);
            toast.success("Activity has been removed")
        })
    }

    const EditActivityFunc = () => {
        if(activity.status == "comment"){
            setCommentModal(true)
            setActivityModal(false)
            setActivityEdit({
                id: activity.id,
                deadline: activity.deadline,
                message: activity.message,
                status: activity.status,
            })
        }
        else{
            setActivityModal(true)
            setCommentModal(false)
            setActivityEdit({
                id: activity.id,
                deadline: activity.deadline,
                message: activity.message,
                status: activity.status,
            })
        }
    }
    if(activity.user?.id != currentUser?.id){
        return (
            <div key={key} className={`flex mt-2 opacity-80 w-[800px] h-auto`}>
                <div className="flex relative pb-10 sm:items-start mx-auto">
                <div  className="h-full w-6  absolute inset-0 flex items-center justify-center">
                    <div className="h-full bg-gray-300  border-dotted border-l-2 border-black pointer-events-none"></div>
                </div>
                    <span data-title={Status.title} className={`cursor-pointer flex-shrink-0 w-8 h-8 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center ${Status.logoBg} text-white relative z-10 title-font -top-2 -left-1 font-medium text-sm`}>{Status.logo}</span>
                    <div className='w-[800px] h-full  p-5 relative '>
                        {Status.deadline ?
                            <h1 data-title={`${dateFormat(activity.deadline, "mmmm d, yyyy, h:MM TT")}`} className='absolute cursor-pointer left-5 -top-1'>{dateFormat(activity.deadline, "dd mmm, yyyy")}</h1>
                            :
                            <h1 data-title={`${dateFormat(activity.updatedAt, "mmmm d, yyyy, h:MM TT")}`} className='absolute cursor-pointer left-5 -top-1'>{dateFormat(activity.updatedAt, "dd mmm, yyyy")}</h1>
                        }
                        <div className={`w-full mt-5 shadow-xl min-h-[200px] bg-white rounded-2xl `}>
                            <div className='flex justify-between p-5 pt-3'>
                            <div className='flex'>
                                <img src={activity.user.avatar} className='w-12 h-12 bg-black object-cover flex rounded-full items-center justify-center'></img>
                                <div className=' pt-2 w-[200px] ml-3'>
                                    <h1 className='text-2sm font-bold mb-2'>{activity.user?.firstName} {activity.user?.lastName}</h1>
                                    {Status.deadline && <div className={`p-1 px-2 border ${activity.lostActivity ? 'bg-red-300' : 'bg-gray-200'} bg-gray-200 rounded-xl w-[130px] text-center flex justify-center  items-center`}><IoTimeOutline size={20}/>  <h1 className="ml-1 text-1sm">{dateFormat(activity.deadline, "h:MM TT")}</h1> </div>}
                                </div>
                            </div>
                            
                            </div>
                            <div className='ml-14 mr-14 pb-4 text-sm break-words'>
                                {activity.message}
                            </div>
                        </div>
                </div>
                </div>
            </div>
        )
    }
    return (
      <div key={key} className={`flex mt-2 w-[800px] h-auto`}>
          <div className="flex relative pb-10 sm:items-start mx-auto">
          
          <div  className="h-full w-6  absolute inset-0 flex items-center justify-center">
          {/* <div className="h-full w-1 bg-gray-600 pointer-events-none"></div> */}
          <div className="h-full bg-gray-300  border-dotted border-l-2 border-black pointer-events-none"></div>
          </div>
              <span data-title={Status.title} className={`cursor-pointer flex-shrink-0 w-8 h-8 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center ${Status.logoBg} text-white relative z-10 title-font -top-2 -left-1 font-medium text-sm`}>{Status.logo}</span>
              <div className='w-[800px] h-full  p-5 relative '>
                  {Status.deadline ?
                    <h1 data-title={`${dateFormat(activity.deadline, "mmmm d, yyyy, h:MM TT")}`} className='absolute cursor-pointer left-5 -top-1'>{dateFormat(activity.deadline, "dd mmm, yyyy")}</h1>
                    :
                    <h1 data-title={`${dateFormat(activity.updatedAt, "mmmm d, yyyy, h:MM TT")}`} className='absolute cursor-pointer left-5 -top-1'>{dateFormat(activity.updatedAt, "dd mmm, yyyy")}</h1>
                  }
                  <div className={`w-full mt-5 shadow-xl min-h-[200px] bg-white rounded-2xl `}>
                      <div className='flex justify-between p-5 pt-3'>
                      <div className='flex'>
                          <img src={activity.user.avatar} className='w-12 h-12 bg-black object-cover flex rounded-full items-center justify-center'></img>
                          <div className=' pt-2 w-[200px] ml-3'>
                              <h1 className='text-2sm font-bold mb-2'>{activity.user?.firstName} {activity.user?.lastName}</h1>
                              {Status.deadline && <div className={`p-1 px-2 border ${activity.lostActivity ? 'bg-red-300' : 'bg-gray-200'} bg-gray-200 rounded-xl w-[130px] text-center flex justify-center  items-center`}><IoTimeOutline size={20}/>  <h1 className="ml-1 text-1sm">{dateFormat(activity.deadline, "h:MM TT")}</h1> </div>}
                          </div>
                      </div>
                      
                      <div className='relative'>
                                <span className='cursor-pointer' onClick={() => {
                                    setEditActivity(!editActivity);
                                }}>...</span>
                                {editActivity && (
                                    <div className='absolute z-30 border-2 shoadow -left-16 bg-white py-2 shadow-lg w-[80px] text-center'>
                                        <h1 className='p-1 cursor-pointer bg-white hover:bg-gray-200' onClick={() => {
                                            EditActivityFunc()
                                            setEditActivity(!editActivity);
                                        }}>Edit</h1>
                                        <h1 className='p-1 cursor-pointer bg-white hover:bg-gray-200' onClick={() => {
                                            setEditActivity(!editActivity);
                                            activityDelete()
                                        }}>Delete</h1>
                                    </div>
                                )}
                      </div>
                      </div>
                      <div className='ml-14 mr-14 pb-4 text-sm break-words'>
                         {activity.message}
                      </div>
                  </div>
          </div>
          </div>
      </div>
  )
}
