import { redirect } from "next/navigation";
import getAllLeads from "../actions/getAllLeads";
import getAllUser from "../actions/getAllUsers";
import getCurrentUser from "../actions/getCurrentUser";
import getLeads from "../actions/getLeads";
import ClientOnly from "../components/ClientOnly";
import SleepClient from "./SleepClient";
import SleepOwner from "./SleepOwner";


const SleepPage = async ({params}: any) => {
  const leads = await getLeads({status: 'sleep'})
  const currentUser = await getCurrentUser();
  const ownerLeads = await getAllLeads({status: 'sleep'});
  const allUser = await getAllUser();
  if (currentUser?.role == "Admin"){
      return (
        <ClientOnly>
          <SleepOwner 
            leads={ownerLeads}
            currentUser={currentUser}
            allUser={allUser}
          />
        </ClientOnly>
      )
  }
  if(currentUser?.role == "Spectator"){
    return redirect("/leads")
  }
  return (
      <ClientOnly>
        <SleepClient leads={leads}/>
      </ClientOnly>
  );
}
 
export default SleepPage;
