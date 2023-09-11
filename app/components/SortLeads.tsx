import React, { useState } from 'react'
import useNewLeadModal from '../hooks/useNewLeadModal';
import { AiOutlineUserSwitch, AiOutlineClear } from 'react-icons/ai'
import NewLeadButton from './NewLeadButton';

export default function SortLeads({setLeads, allUser, allLeads, currentUser, status}: any) {
  const [show, setShow] = useState(false)
  return (
    <div className="2xl:container 2xl:mx-auto px-5">
            <div className={`lg:px-20 md:px-6 pt-5 px-4 ${status && 'hidden'}`}>
                <div className={`flex justify-between items-center mb-4`}>
                    <NewLeadButton allUser={allUser} currentUser={currentUser}/>
                    <button onClick={() => {setShow(!show)}}  className={`cursor-pointer mt-2 sm:flex hover:bg-gray-700 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center`}>
                        <svg className=" mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 4V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 4V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 18V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 4V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 9V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Filters
                    </button>
                </div>
                <p className=" text-xl leading-5 text-gray-600 font-medium">{allUser.length} User</p>
            </div>

            <div id="filterSection" className={`relative md:py-4 lg:px-20 md:px-6 py-5 px-4 bg-transparent w-full ${show || status ? 'block' : 'hidden'}`}>
    
                    <button className='pr-5' onClick={() => {
                          setLeads(allLeads)
                      }}>
                        <div className="flex items-center justify-center">
                          <AiOutlineClear className='w-8 h-8 rounded-full flex text-center justify-center items-center'/>
                        </div>
                  </button>
                    {allUser.map((item: any, i: any) => {
                        return(
                            <button key={i} className={`pt-5 pr-5 ${currentUser.id == item.id ? "text-black" : "text-gray"}}`} onClick={() => {
                                setLeads(allLeads.filter((lead: any) => lead.user.id == item.id))
                            }}>
                                {currentUser.id == item.id ? 
                            
                                  <div className="flex space-x-2 md:justify-center md:items-center items-center justify-start ">
                                      <img src={item.avatar} className=" w-8 h-8 rounded-full bg-white shadow"/>
                                      <p className={`text-base leading-4`}>My Leads</p>
                                  </div>
                                :
                                <div className=" flex space-x-2 md:justify-center md:items-center items-center justify-start ">
                                    <img src={item.avatar} className=" w-8 h-8 rounded-full bg-white shadow"/>
                                    <p className=" text-base leading-4 text-gray-600">{item.firstName} {item.lastName}</p>
                                </div>
                                }

                            </button>
                        )
                    })}
                </div>
        </div>
  )
}
