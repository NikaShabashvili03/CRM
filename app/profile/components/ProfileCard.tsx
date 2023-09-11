import useEditProfileModal from '@/app/hooks/useEditProfileModal'
import React, { useState } from 'react'

export default function ProfileCard({user, i} : any ) {
  const profileModal = useEditProfileModal();
  return (
    <section key={i} className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg ">
          <div className="flex relative items-center justify-between">
              <span className="text-gray-400 text-sm">{user.role}</span>
              <span onClick={() => {
                profileModal.onOpen();
                profileModal.setUser(user);
              }} className="text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </span>
          </div>
          <div className="mt-6 w-fit mx-auto">
              <img src={user.avatar} className="rounded-full w-28 h-28 object-cover" alt="profile picture"/>
          </div>

          <div className="mt-8 ">
              <h2 className="text-white font-bold text-2xl tracking-wide">{user.firstName} <br/> {user.lastName}</h2>
          </div>
          <p className="text-green-700 font-semibold mt-2.5" >
              +995 {user.phoneNumber}
          </p>
          <p className='text-white'>{user.email}</p>
          <div className='grid grid-cols-2 gap-1'>
            <div className="mt-3 text-white text-sm">
                <span className="text-gray-400 font-semibold">Leads: </span>
                <span>{user.tasks?.length}</span>
            </div>
            <div className="mt-3 text-green-500 text-sm">
                <span className="text-gray-400 font-semibold">Won: </span>
                <span>{user.tasks?.filter((item: any) => item.status == "won").length}</span>
            </div>
            <div className="mt-3 text-red-500 text-sm">
                <span className="text-gray-400 font-semibold">Lost: </span>
                <span>{user.tasks?.filter((item: any) => item.status == "lost").length}</span>
            </div>
            <div className="mt-3 text-yellow-500 text-sm">
                <span className="text-gray-400 font-semibold">Sleep: </span>
                <span>{user.tasks?.filter((item: any) => item.status == "sleep").length}</span>
            </div>
          </div>
          

      </section>
  )
}
