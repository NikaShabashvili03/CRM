'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUsers } from 'react-icons/fi'

import {PiConfettiBold, PiTrashSimpleBold, PiArchiveDuotone} from 'react-icons/pi'
interface SidebarProps {
    children: React.ReactNode
    currentUser: any,
    Spectator?: boolean,
  };
const Sidebar: React.FC<SidebarProps> = ({ children, currentUser, Spectator}) => {
    const leadLength = {
        none: currentUser.tasks?.filter((item: any) => item.status == 'none').length,
        won: currentUser.tasks?.filter((item: any) => item.status == 'won').length,
        lost: currentUser.tasks?.filter((item: any) => item.status == 'lost').length,
        sleep: currentUser.tasks?.filter((item: any) => item.status == 'sleep').length
    }
    const pathname = usePathname();
    if(Spectator){
        return (
            <div className="min-h-screen font-sans z-10 flex flex-col bg-gray-50 flex-auto flex-shrink-0 antialiased text-gray-800 overflow-hidden">
                <div className="fixed z-10 flex flex-col top-0 left-0 w-64 bg-white text-black h-full">
                    <div className="flex items-center justify-center px-2 h-14 ">
                    <div className="text-2xl">CRM</div>
                    </div>
                    <div className="overflow-y-auto overflow-x-hidden flex-grow">
                    <ul className="flex flex-col py-4 space-y-1">
                        <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-600">Menu</div>
                        </div>
                        </li>
                        <li>
                            <Link href="/leads" className={`relative flex flex-row items-center h-11 focus:outline-none   hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6 ${pathname == "/leads" ? 'bg-indigo-500 hover:border-black hover:bg-indigo-600' : '' }`}>
                                <span className="inline-flex justify-center items-center ml-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate ">Leads</span>
                                {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span> */}
                            </Link>
                        </li>
                        <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide ">Settings</div>
                        </div>
                        </li>
                        <li>
                        <Link href="/profile" className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6 ${pathname == "/profile" ? 'bg-indigo-500 hover:border-black hover:bg-indigo-600' : '' }`}>
                            <span className="inline-flex justify-center items-center ml-4">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate ">Profile</span>
                        </Link>
                        </li>
                        <li>
                        <a onClick={() => {signOut()}} className="relative flex flex-row items-center cursor-pointer h-11 focus:outline-none hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="h-full ml-64 z-2 relative flex-grow">
                    {children}
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen font-sans z-10 flex flex-col bg-gray-50 flex-auto flex-shrink-0 antialiased text-gray-800 overflow-hidden">
            <div className="fixed flex z-10 flex-col top-0 left-0 w-64 bg-white text-black h-full">
                <div className="flex items-center justify-center px-2 h-14 ">
                <div className="text-2xl">CRM</div>
                </div>
                <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-4 space-y-1">
                    <li className="px-5">
                    <div className="flex flex-row items-center h-8">
                        <div className="text-sm font-light tracking-wide text-gray-600">Menu</div>
                    </div>
                    </li>
                    {/* <li>
                    <Link href="/dashboard" className={`relative flex flex-row items-center h-11 focus:outline-none   hover:bg-gray-50 hover:text-black border-l-4 border-transparent  hover:border-indigo-500  pr-6 ${pathname == "/dashboard" ? 'bg-indigo-500 hover:border-black hover:bg-indigo-600' : '' }`}>
                        <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate ">Dashboard</span>
                    </Link>
                    </li> */}
                    <li>
                    <Link href="/leads" className={`relative flex flex-row items-center h-11 focus:outline-none   hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6 ${pathname == "/leads" ? 'bg-indigo-500 hover:border-black hover:bg-indigo-600' : '' }`}>
                        <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate ">Leads</span>
                        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-black bg-green-500">{leadLength.none}</span>
                        {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span> */}
                    </Link>
                    </li>
                    {/* `<li>
                    <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Messages</span>
                    </a>
                    </li>
                    <li>
                    <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Notifications</span>
                        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
                    </a>x
                    </li>` */}
                    <li className="px-5">
                    <div className="flex flex-row items-center h-8">
                        <div className="text-sm font-light tracking-wide ">Stats</div>
                    </div>
                    </li>
                    <li>
                    <Link href="/won" className={`relative flex flex-row items-center h-11 focus:outline-none   hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6 ${pathname == "/won" ? 'bg-indigo-500 hover:border-black hover:bg-indigo-600' : '' }`}>
                        <PiConfettiBold className="inline-flex justify-center items-center ml-4"/>
                        <span className="ml-2 text-sm tracking-wide truncate ">Won</span>
                        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-black bg-green-500">{leadLength.won}</span>
                    </Link>
                    </li>
                    <li>
                    <Link href="/lost" className={`relative flex flex-row items-center h-11 focus:outline-none   hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6 ${pathname == "/lost" ? 'bg-indigo-500 hover:border-black hover:bg-indigo-600' : '' }`}>
                        <PiTrashSimpleBold className="inline-flex justify-center items-center ml-4"/>
                        <span className="ml-2 text-sm tracking-wide truncate ">Lost</span>
                        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-black bg-red-500">{leadLength.lost}</span>
                    </Link>
                    </li>
                    <li>
                    <Link href="/sleep" className={`relative flex flex-row items-center h-11 focus:outline-none   hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6 ${pathname == "/sleep" ? 'bg-indigo-500 hover:border-black hover:bg-indigo-600' : '' }`}>
                        <PiArchiveDuotone className="inline-flex justify-center items-center ml-4"/>
                        <span className="ml-2 text-sm tracking-wide truncate ">Sleep</span>
                        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-black bg-yellow-500">{leadLength.sleep}</span>
                    </Link>
                    </li>
                    <li className="px-5">
                    <div className="flex flex-row items-center h-8">
                        <div className="text-sm font-light tracking-wide ">Settings</div>
                    </div>
                    </li>
                    <li>
                    <Link href="/profile" className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6 ${pathname == "/profile" ? 'bg-indigo-500 hover:border-black hover:bg-indigo-600' : '' }`}>
                        <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate ">Profile</span>
                    </Link>
                    </li>
                    <li>
                    {currentUser.role == "Admin" && (
                    <Link href="/users" className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6 ${pathname == "/users" ? 'bg-indigo-500 hover:border-black hover:bg-indigo-600' : '' }`}>
                        <span className="inline-flex justify-center items-center ml-4">
                       <FiUsers size={20} className="ml-0.5"/>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Users</span>
                    </Link>
                    )}
                    </li>
                    <li>
                    <a onClick={() => {signOut()}} className="relative flex flex-row items-center cursor-pointer h-11 focus:outline-none hover:bg-gray-50  hover:text-black border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                    </a>
                    </li>
                </ul>
                </div>
            </div>
            <div className="ml-64 z-2 relative h-full flex-grow">
                {children}
            </div>
        </div>
    );
    
}

export default Sidebar;