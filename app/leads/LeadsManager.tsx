'use client'
import React from 'react'
import NewLeadButton from '../components/NewLeadButton'

interface SpectatorProps {
    allUser: any,
    currentUser: any,
}
export default function LeadsManager({allUser, currentUser}: SpectatorProps) {
  return (
    <div className='container'>  
        <div className='pt-5 pl-10'>
          <NewLeadButton allUser={allUser} currentUser={currentUser}/>
        </div>
        <div className='grid grid-cols-4 gap-4 mt-5'>
            {allUser.map((user: any, i: any) => (
                user.role != 'Spectator' && (
                    <section key={i} className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg ">
                        <div className="mx-auto w-full">
                            <span className='text-red-700'>{user.role}</span>
                        </div>
                        <div className="mt-6 w-fit mx-auto">
                            <img src={user.avatar} className="rounded-full w-28 h-28" alt="profile picture"/>
                        </div>

                        <div className="mt-8 ">
                            <h2 className="text-white font-bold text-2xl tracking-wide">{user.firstName} <br/> {user.lastName}</h2>
                        </div>
                        <p className="text-green-700 font-semibold mt-2.5" >
                            +995 {user.phoneNumber}
                        </p>
                        <div className='grid grid-cols-2 gap-1'>
                            <div className="mt-3 text-white text-sm">
                                <span className="text-gray-400 font-semibold">Leads: </span>
                                <span>{user.tasks?.length}</span>
                            </div>
                        </div>
                </section>
                )
            ))}
        </div>
    </div>
  )
}
