'use client'
import React from "react";
import { PiBellRingingBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import useNotificationModal from "../hooks/useNotificationModal";




export default function Navbar({notifications}: any) {
  const router = useRouter();
  const useNotification = useNotificationModal();
  return (
    <div style={{
      zIndex: '5'
    }} className='fixed font-sans top-4 right-5'>
           <nav className="items-center flex justify-end h-full border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap gap-4">

                 <button onClick={() => {
                    useNotification.onOpen();
                    router.refresh();
                 }} type="button" className="relative rounded-full inline-flex items-center p-2 mr-5 text-sm font-medium text-center text-white bg-transparent focus:ring-4 focus:outline-none">
                  <h1>
                    <PiBellRingingBold size={30} fill="black"/>
                  </h1>
                  {notifications > 0 && 
                    <div className="absolute inline-flex items-center justify-center w-7 h-7 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{notifications}</div>
                  }
                </button>
              </div>
            </nav>
    </div>
  )
}
