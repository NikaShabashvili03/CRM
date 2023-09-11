'use client';

import { useRouter } from 'next/navigation';


import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import useNotificationModal from '@/app/hooks/useNotificationModal';
import Modal from './Modal';
import useLeadModal from '@/app/hooks/useLeadModal';


const NotificationModal = ({notifications}: any) => {
  const notificationModal = useNotificationModal();
  const leadModal = useLeadModal();
  const router = useRouter();
  const removeNotification = (id: any) => {
    axios.delete(`/api/notification/${id}`).then(() => {
      toast.success("Notification has been removed")
      router.refresh();
    })
  }
  const removeAllNotification = () => {
    axios.delete('/api/notification/delete').then(() => {
      toast.success("All Notification has been removed")
      router.refresh();
    })
  }
  let bodyContent = (
    <div className="flex flex-col overflow-y-auto h-[860px] max-h-[860px] p-5 gap-8">
      {
        notifications.map((item: any) => {
          // Leadistvis 
          return(
              item.task ? (
              //   <div onClick={() => {
                  // leadModal.onOpen();
                  // leadModal.setData(item.task);
                  // removeNotification(item.id);
              // }} className={`bg-red-300 p-5 relative hover:bg-red-400`}>
                  // <button className='absolute right-2 top-1' onClick={() => {
                    // removeNotification(item.id); 
                  // }}>X</button>
              //     <p>{item.message}</p>
              //     <br></br>
              //     <h1>from: {item.creator}</h1>
              // </div>
                    <div className="flex flex-col py-5 px-4 bg-yellow-200 shadow-md hover:shodow-lg rounded">
                      <div className="flex items-center justify-between">
                        <div onClick={() => {
                            leadModal.onOpen();
                            leadModal.setData(item.task);
                            removeNotification(item.id);
                        }} className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 rounded p-3 border border-yellow-800 text-gray-100 bg-yellow-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <div className="flex flex-col ml-3">
                            <div className="font-medium leading-none text-yellow-500">Delete Your Acccount ?</div>
                            <p className="text-sm text-gray-500 leading-none mt-1">{item.message}</p>
                          </div>
                        </div>
                        <button onClick={() => {
                           removeNotification(item.id); 
                        }} className="flex-no-shrink bg-yellow-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-yellow-500 text-white rounded">Remove</button>
                      </div>
                    </div>
              ) :
              <div className={`bg-yellow-300 p-5 relative`}>
                  <button className='absolute right-2 top-1' onClick={() => {
                    removeNotification(item.id); 
                  }}>X</button>
                  <p>{item.message}</p>
                  <br></br>
                  <h1>from: {item.creator}</h1>
              </div>
            )
          })
      }
    </div>
  )

  return (
    <Modal
      isOpen={notificationModal.isOpen}
      title={'Notifications'}
      onClose={notificationModal.onClose}
      body={bodyContent}
      removeAllNotification={removeAllNotification}
    />
  );
}

export default NotificationModal;
