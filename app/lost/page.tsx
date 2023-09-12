import { redirect } from "next/navigation";
import getAllLeads from "../actions/getAllLeads";
import getAllUser from "../actions/getAllUsers";
import getCurrentUser from "../actions/getCurrentUser";
import getLeads from "../actions/getLeads";
import ClientOnly from "../components/ClientOnly";
import LostClient from "./LostClient";
import LostOwner from "./LostOwner";


const LostPage = async ({params}: any) => {
  const leads = await getLeads({status: 'lost'})
  const currentUser = await getCurrentUser();
  const ownerLeads = await getAllLeads({status: 'lost'});
  const allUser = await getAllUser();
  if (currentUser?.role == "Admin"){
    return (
      <ClientOnly>
        <LostOwner 
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
        <LostClient leads={leads}/>
      </ClientOnly>
  );
}
 
export default LostPage;
