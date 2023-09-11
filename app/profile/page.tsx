import LoginClient from "../LoginClient";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getLeads from "../actions/getLeads";
import getAllLeads from "../actions/getAllLeads";
import getAllUser from "../actions/getAllUsers";
import ProfileOwner from "./ProfileOwner";
import ProfileClient from "./ProfileClient";
 

const LeadsPage = async ({params}: any) => {
  const currentUser = await getCurrentUser();
  const allUser = await getAllUser();

  if (currentUser?.role == "Admin"){
    return (
      <ClientOnly>
          <ProfileOwner
            allUser={allUser}
            currentUser={currentUser}
            />
      </ClientOnly>
    )
  }
  return (
      <ClientOnly>
        <ProfileClient 
          currentUser={currentUser} 
          />
      </ClientOnly>
  );
}
 
export default LeadsPage;
