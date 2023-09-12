import React from 'react'
import dateFormat from 'dateformat'
import Confetti from 'react-dom-confetti'
import { DateTimePicker } from 'react-rainbow-components';
import { IoMdClose } from 'react-icons/io'
import {PiArchiveDuotone,PiTrashSimpleBold,PiConfettiBold} from 'react-icons/pi'
import {BiNotepad, BiCommentDetail} from 'react-icons/bi'
import { MdOutlineLocalActivity } from 'react-icons/md';
import { BiSolidStar } from 'react-icons/bi';

import Activity from '../Activity';
export default function ActivityContainer({
  setOpenActivity,
  openActivity,
  confetti,
  setConfetti,
  sleepDeadlineModal,
  setSleepDeadlineModal,
  setLeadDeadline,
  leadDeadline,
  statusChange,
  setActivityModal,
  setCommentModal,
  activity,
  activityEdit,
  setActivityEdit,
  data,
  currentUser,
  AllStatus,
}: any,) {
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };
  return (
    <div className='border relative border-gray-400 rounded-t-2xl w-4/6'>
        <div className='w-full relative h-16 pl-5 lr-5 bg-white border-b border-gray-400 flex items-center justify-between rounded-t-2xl'>
            <button onClick={() => {
              setOpenActivity(!openActivity)
            }} id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" className={`text-black hover:bg-blue-700 hover:text-white ${openActivity && 'bg-blue-700 text-white '} font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center`} type="button">
                <svg className={`w-2.5 h-2.5 mr-2.5 transition-all duration-300 ${openActivity ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
                Add Activity 
            </button>

            <div className="p-4 relative">
                 <Confetti active={confetti} config={ config }/>
                 {sleepDeadlineModal && (
                          <div className="bg-white absolute flex top-1 left-0 rounded-r-2xl items-center justify-between w-full h-[90%]">
                            <button onClick={() => {
                                setSleepDeadlineModal(!sleepDeadlineModal)
                                setLeadDeadline(new Date());
                                }} className="mr-2"><IoMdClose size={20}/></button>
                            <DateTimePicker
                                      value={leadDeadline}
                                      onChange={(value: any) => {setLeadDeadline(value)}}
                                      formatStyle="small"
                            />
                            <button className="inline-flex items-center ml-2 px-4 py-2 bg-yellow-200 hover:bg-yellow-300 text-gray-800 text-sm font-medium rounded-md" 
                            onClick={
                              () => {
                                statusChange('sleep')
                                setSleepDeadlineModal(!sleepDeadlineModal)
                              }
                            }>
                              <PiArchiveDuotone className="h-5 w-5 mr-2"/>

                              Sleep
                            </button>
                          </div>
                    )}
                    <button onClick={() => {
                      setSleepDeadlineModal(!sleepDeadlineModal)
                    }} className="inline-flex items-center px-4 py-2 bg-yellow-200 hover:bg-yellow-300 text-gray-800 text-sm font-medium rounded-md">
                    <PiArchiveDuotone className="h-5 w-5 mr-2"/>

                    Sleep
                    </button>
                  <button onClick={() => {
                    statusChange('lost')
                  }} className="inline-flex items-center px-4 py-2 ml-5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                  <PiTrashSimpleBold className="h-5 w-5 mr-2"/>

                  Lost
                  </button>

                  <button onClick={() => {
                    setConfetti(true)
                    statusChange('won')
                  }} className="inline-flex items-center px-4 py-2 ml-5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md">

                  <PiConfettiBold className="h-5 w-5 mr-2"/>

                   Won
                  </button>
            </div>

          </div>
          <div className={`z-20  ${openActivity ? 'block' : 'hidden'} bg-white border border-gray-400 absolute top-[54px] left-5 divide-y divide-gray-100  rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                <li>
                  <button onClick={() => {setOpenActivity(false) 
                                          setActivityModal(true)}} className="flex px-4 py-2 w-full justify-start items-center hover:bg-gray-100">
                    <span className='w-7 h-7 flex rounded-lg items-center justify-center bg-red-500'>
                      <BiNotepad size={20} color='white'/>
                      </span>
                      <p className='text-base ml-2'>Activity</p>
                    </button>
                </li>
                <li>
                  <button onClick={() => {setOpenActivity(false) 
                                          setCommentModal(true)}} className="flex px-4 py-2 w-full justify-start items-center hover:bg-gray-100">
                    <span className='w-7 h-7 flex rounded-lg items-center justify-center bg-indigo-700'>
                      <BiCommentDetail size={20} color='white'/>
                      </span>
                      <p className='text-base ml-2'>Comment</p>
                    </button>
                </li>
              </ul>
              <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-center"></a>
              </div>
          </div>
          <div className='overflow-y-auto flex flex-col items-center bg-gray-100 h-[800px]'>

                
                



              <div className='mt-12 h-auto'>




                  {activity &&
                    activity.map((activity: any, i: any) => {
                      return (
                        <Activity activityEdit={activityEdit} setActivityEdit={setActivityEdit} setActivityModal={setActivityModal} setCommentModal={setCommentModal} dataUser={data.user} currentUser={currentUser} key={i} AllStatus={AllStatus} activity={activity}/>
                      )
                    }
                  )}




                  <div className='flex mt-2  w-[800px] h-auto'>
                              <div className="flex relative pb-10 sm:items-start mx-auto">
                              
                                <div  className="h-full w-6 absolute inset-0 flex items-center justify-center">
                                </div>
                                <span data-title='System Activity' className="cursor-pointer flex-shrink-0 w-8 h-8 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-white text-white relative z-10 title-font -top-2 -left-1 font-medium text-sm"><MdOutlineLocalActivity size={23} color='black'/></span>
                                    <div className='w-[800px] h-full p-5 relative '>
                                        <h1 data-title={`${dateFormat(data.createdAt, "mmmm d, yyyy, h:MM TT")}`} className='absolute cursor-pointer left-5 -top-1'>{dateFormat(data.createdAt, "dd mmm, yyyy")}</h1>
                                        <div className='w-full mt-5 shadow-xl bg-white rounded-2xl'>
                                          <div className='flex justify-between p-5'>
                                            <div className='flex'>
                                                  <span className='w-12 h-12 bg-black flex rounded-full items-center justify-center'><BiSolidStar color="white" size={35}/></span>
                                                  <span className='flex items-center'><h1 className='font-bold ml-2 text-sm'>Lead</h1><p className='ml-2 text-sm'>created for</p><h1 className='font-bold mx-2 text-sm'>{data.user?.firstName + " " + data.user?.lastName}</h1> by <h1 className='font-bold ml-2 text-sm'>{data.creator}</h1></span>
                                              </div>
                                          </div>
                                      </div>
                            </div>
                          </div>
                  </div>
                </div> 
          </div>
        </div>
  )
}
