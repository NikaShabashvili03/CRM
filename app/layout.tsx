import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import LoginClient from './LoginClient'
import { redirect } from 'next/navigation'
import ClientOnly from './components/ClientOnly'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ToasterProvider from './providers/ToasterProvider'
import ModalsProvider from './providers/ModalProvider'
import getActivity from './actions/getActivity'
import getNotifications from './actions/getNotifications'
import getAllLeads from './actions/getAllLeads'
import getAllUser from './actions/getAllUsers'
import { useEffect, useState } from 'react'
import TimeProvider from './providers/TimeProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  const activitys = await getActivity();
  const notifications = await getNotifications();
  const allUser = await getAllUser();
  const sleepLeads = await getAllLeads({status: 'sleep'});
  const AllLeads = await getAllLeads({status: 'none'})
 
  if(!currentUser){
    return (
      <html lang="en">
        <body className={inter.className}>
              <ClientOnly>
                  <ToasterProvider/>
                  <LoginClient/>
              </ClientOnly>
          </body>
      </html>
    )
  }
  if(currentUser.role == "Admin" || currentUser.role == "User"){
    return (
      <html lang="en">
        <body className={inter.className}>
          <ClientOnly>
            <TimeProvider currentUser={currentUser} activitys={activitys} sleepLeads={sleepLeads}/>
            <ToasterProvider/>
            <ModalsProvider currentUser={currentUser} allUser={allUser} notifications={notifications} activitys={activitys}/>
            <Navbar notifications={notifications.length}/>
            <Sidebar
              currentUser={currentUser}
            >{children}</Sidebar> 
          </ClientOnly>
        </body>
      </html>
    )
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider/>
          <ModalsProvider currentUser={currentUser} allUser={allUser} notifications={notifications} activitys={activitys}/>
          <Sidebar
            Spectator
            currentUser={currentUser}
          >{children}</Sidebar> 
        </ClientOnly>
      </body>
    </html>
  )

}
