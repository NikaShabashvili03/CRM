
import LoginClient from "../LoginClient";
import ClientOnly from "../components/ClientOnly";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import WonClient from "./WonClient";
import getLeads from "../actions/getLeads";
import getCurrentUser from "../actions/getCurrentUser";
import getAllLeads from "../actions/getAllLeads";
import WonOwner from "./WonOwner";
import getAllUser from "../actions/getAllUsers";


const WonPage = async ({params}: any) => {
  const leads = await getLeads({status: 'won'})
  const currentUser = await getCurrentUser();
  const ownerLeads = await getAllLeads({status: 'won'});
  const allUser = await getAllUser();

  if (currentUser?.role == "Admin"){
    return (
      <ClientOnly>
        <WonOwner 
          leads={ownerLeads}
          currentUser={currentUser}
          allUser={allUser}
        />
      </ClientOnly>
    )
  }
  return (
      <ClientOnly>
        <WonClient leads={leads}/>
      </ClientOnly>
  );
}
 
export default WonPage;
