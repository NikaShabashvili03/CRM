'use client'
import React, { useEffect, useState } from 'react'
import BoardSectionList from './components/BoardSectionList';
import useNewLeadModal from '../hooks/useNewLeadModal';
import SortLeads from '../components/SortLeads';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
 
export default function LeadsOnwer({allLeads, allUser, currentUser}: any) {
  const [leads, setLeads] = useState(allLeads); 
  return (
    <div className='bg-gradient-to-l from-indigo-500 h-screen bg-no-repeat bg-cover'>
      <SortLeads setLeads={setLeads} currentUser={currentUser} allUser={allUser} allLeads={allLeads}/>
      <BoardSectionList currentUser={currentUser} Leads={leads.reverse()}/>
    </div>
  )
}
