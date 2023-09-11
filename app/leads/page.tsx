import { useRouter } from "next/router";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import LeadsOnwer from "./LeadsOnwer";
import LeadsClient from "./LeadsClient";
import getLeads from "../actions/getLeads";
import getAllLeads from "../actions/getAllLeads";
import getAllUser from "../actions/getAllUsers";
import LeadsManager from "./LeadsManager";
 

const LeadsPage = async ({params}: any) => {
  const currentUser = await getCurrentUser();
  const leads = await getLeads({status: 'none'});
  const allLeads = await getAllLeads({status: 'none'});
  const allUser = await getAllUser();

  
  if (currentUser?.role == "Admin"){
    return (
      <ClientOnly>
          <LeadsOnwer 
            allUser={allUser} 
            allLeads={allLeads}
            currentUser={currentUser}
            />
      </ClientOnly>
    )
  }
  if(currentUser?.role == "Spectator"){
    return (
      <ClientOnly>
        <LeadsManager currentUser={currentUser} allUser={allUser}/>
      </ClientOnly>
    )
  }
  return (
      <ClientOnly>
        <LeadsClient 
          currentUser={currentUser} 
          leads={leads}
          />
      </ClientOnly>
  );
}
 
export default LeadsPage;
