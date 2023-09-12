import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import ProfileClient from "./ProfileClient";
 

const LeadsPage = async ({params}: any) => {
  const currentUser = await getCurrentUser();

  return (
      <ClientOnly>
        <ProfileClient 
          currentUser={currentUser} 
          />
      </ClientOnly>
  );
}
 
export default LeadsPage;
