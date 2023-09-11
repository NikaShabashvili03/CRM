'use client'
import React, { useState } from 'react'
import StatusItems from '../components/StatusItems'
import SortLeads from '../components/SortLeads';

export default function LostOwner({leads, currentUser, allUser}: any) {
  const [allLeads, setLeads] = useState(leads); 
  return (
    <div className='bg-gradient-to-l from-indigo-500'>
      <SortLeads status setLeads={setLeads} currentUser={currentUser} allUser={allUser} allLeads={leads}/>
      <div className="shadow-lg rounded-lg w-full h-full overflow-hidden">
      <table className="w-full table-fixed">
          <thead>
              <tr className="bg-gray-100">
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Phone</th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Lead Owner</th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Last Stage</th>
              </tr>
          </thead>
          <tbody className="bg-white">
              <StatusItems bg={"bg-red-500"} allLeads={allLeads}/>
          </tbody>
      </table>
  </div>
  </div>
  )
}
