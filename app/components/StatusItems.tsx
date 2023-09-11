import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import dateFormat from 'dateformat';

export default function StatusItems({allLeads, bg}: any) {
  const router = useRouter()
  return (
    allLeads.map((item: any, i: any) => {
        return (
        <tr key={i}>
          <td className="py-4 px-6 border-b border-gray-200">{item.name}</td>
          <td className="py-4 px-6 border-b border-gray-200 truncate">{item.phone}</td>
          {item.status == 'sleep' && 
            <td className="py-4 px-6 border-b border-gray-200 truncate">{dateFormat(item.deadline, "mmm d, yyyy, h:MM:ss TT")}</td>
          }
          <td className="py-4 px-6 border-b border-gray-200 truncate">{item.user.firstName} {item.user.lastName}</td>
          <td className="py-4 px-6 border-b border-gray-200">
              <span className={`${bg} text-white py-2 px-8 rounded-full text-1xl`}>{item.status}</span>
          </td>
          <td className="py-4 px-6 flex items-center border-b border-gray-200">
            <h1 className='mr-12'>{item.stage}</h1>
            <button onClick={() => {
              axios.post(`/api/leads/status/${item.id}`, {
                status: 'none',
                deadline: undefined
              }).then(() => {
                toast.success("Lead Return Success")
                router.refresh();
              })
            }} className="flex rounded-2xl bg-gray-700 text-white p-2 items-center gap-3 hover:bg-gray-800">
              Return
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>  
          </td>
      </tr>
        )
      })
  )
}
