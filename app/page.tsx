import Image from 'next/image'
import getCurrentUser from './actions/getCurrentUser'
import DashboardClient from './dashboard/DashboardClient'
import { redirect } from 'next/navigation'

export default async function Home() {
  const currentUser = await getCurrentUser();

  if(currentUser?.role == "Spectator"){
    return redirect("/leads")
  }
  
  return redirect("/dashboard");
}