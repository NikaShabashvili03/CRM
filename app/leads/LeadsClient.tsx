'use client'
import React from 'react'
import BoardSectionList from './components/BoardSectionList'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useNewLeadModal from '../hooks/useNewLeadModal'
import NewLeadButton from '../components/NewLeadButton'

export default function LeadsClient({leads, currentUser}: any) {
  const router = useRouter();
  const newLeadModal = useNewLeadModal();
  return ( 
    <div className='bg-gradient-to-l from-indigo-500 h-screen bg-no-repeat bg-cover'>
       <div className=" lg:px-20 md:px-6 pt-5 px-4">
          <div className=" flex justify-between items-center mb-4">
            <NewLeadButton currentUser={currentUser}/>
          </div>
        </div>
        <BoardSectionList Leads={leads} currentUser={currentUser}/>
    </div>
  )
}
