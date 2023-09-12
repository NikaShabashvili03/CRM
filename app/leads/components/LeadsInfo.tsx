import React from 'react'
import { BOARD_SECTIONS } from './constants'

export default function LeadsInfo({data}: any) {
  return (
      <div className="w-1/3 h-full px-1 flex justify-center items-center">
          {/* Lead Information */}
          <div className="w-full flex flex-col items-center h-full border relative border-gray-400 bg-white rounded-t-2xl">
              <div className="mt-5">
                <label className="ml-1 text-gray-500">Name</label>
                <h1 className="px-5 py-2 mt-1 w-[350px] border border-gray-300 rounded-xl">{data.name}</h1>
              </div>
              <div className="mt-5">
                <label className="ml-1 text-gray-500">Stage</label>
                <h1 className="px-5 py-2 mt-1 w-[350px] border border-gray-300 rounded-xl">{BOARD_SECTIONS[data.stage]}</h1>
              </div>
              <div className="mt-5">
                <label className="ml-1 text-gray-500">Email</label>
                <h1 className={`px-5 py-2 ${!data.email && 'h-11'} mt-1 w-[350px] border border-gray-300 rounded-xl`}>{data.email}</h1>
              </div>
              <div className="mt-5">
                <label className="ml-1 text-gray-500">Phone</label>
                <h1 className={`px-5 py-2 mt-1 w-[350px] border border-gray-300 rounded-xl`}>{data.phone}</h1>
              </div>
          </div>
        </div>
  )
}
