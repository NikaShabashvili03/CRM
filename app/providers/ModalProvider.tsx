'use client';

import NewLeadModal from "../leads/components/modals/NewLeadModal";
import EditModal from "../leads/components/modals/EditModal";
import LeadModal from "../leads/components/modals/LeadModal";
import EditProfileModal from "../profile/components/modals/EditProfileModal";
import NotificationModal from "../components/modals/notification/NoticiationModal";
import CreateProfileModal from "../profile/components/modals/CreateProfileModal";



const ModalsProvider = ({activitys, notifications,allUser, currentUser}: any) => {
  return ( 
    <>
      <NotificationModal notifications={notifications}/> 
      <LeadModal activitys={activitys}/> 
      <EditProfileModal currentUser={currentUser}/>

      <CreateProfileModal currentUser={currentUser}/>
      

      <NewLeadModal/>
      <EditModal allUser={allUser}/>
    </>
   );
}
 
export default ModalsProvider;