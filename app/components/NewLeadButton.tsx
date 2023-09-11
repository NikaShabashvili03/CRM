import React from 'react'
import useNewLeadModal from '../hooks/useNewLeadModal';

export default function NewLeadButton({allUser, currentUser}: any) {
  const newLeadModal = useNewLeadModal();
  return (
    <div>
        <button onClick={() => {
            newLeadModal.onOpen();
            newLeadModal.setAllUsers(allUser);
            newLeadModal.setCurrentUser(currentUser)
        }} className=" lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-700 font-semibold hover:text-gray-900">Add New Lead</button>
    </div>
  )
}
