'use client';

import { useRouter } from 'next/navigation';


import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import useNotificationModal from '@/app/hooks/useNotificationModal';
import Modal from './Modal';
import useLeadModal from '@/app/hooks/useLeadModal';
import { BiCommentDetail, BiNotepad, BiAlarmExclamation } from 'react-icons/bi';
import {BsMoonStars} from 'react-icons/bs'
import {AiOutlineFileAdd} from 'react-icons/ai'
import dateFormat from 'dateformat';

const NotificationModal = ({notifications}: any) => {
  const notificationModal = useNotificationModal();
  const leadModal = useLeadModal();
  const router = useRouter();
  const removeNotification = (id: any) => {
    axios.delete(`/api/notification/${id}`).then(() => {
      router.refresh();
    })
  }
  const removeAllNotification = () => {
    axios.delete('/api/notification/delete').then(() => {
      toast.success("All Notification has been removed")
      router.refresh();
    })
  }
  const Logo = {
    missedDeadline: {
      logo: <BiAlarmExclamation fill='white' size={40} color='white'/>,
      logoBg: 'bg-red-800',
      logoBorder: 'border-red-700'
    },
    sleepReturn: {
      logo: <BsMoonStars fill='white' size={40} color='white'/>,
      logoBg: 'bg-yellow-500',
      logoBorder: 'border-yellow-400'
    },
    newMessage: {
      logo: <BiCommentDetail fill='white' size={40} color='white'/>,
      logoBg: 'bg-indigo-600',
      logoBorder: 'border-indigo-500'
    },
    newActivity: {
      logo: <BiNotepad fill='white' size={40} color='white'/>,
      logoBg: 'bg-red-600',
      logoBorder: 'border-red-500'
    },
    newLead: {
      logo: <AiOutlineFileAdd fill='white' size={40} color='white'/>,
      logoBg: 'bg-green-600',
      logoBorder: 'border-green-500'
    }
  } as any
  let bodyContent = (
    <div className="flex flex-col overflow-y-auto h-[860px] max-h-[860px] p-5 gap-8">
      {
        notifications.map((item: any) => {
          // Leadistvis 
          return(
              item.task ? (
                    <div className="flex flex-col relative py-5 px-4 bg-gray-200 shadow-md hover:shodow-lg rounded">
                      <div className='text-gray-600 text-xs absolute bottom-0'>{item.creator}</div>
                      <div className="flex items-center justify-between">
                        <div onClick={() => {
                            leadModal.onOpen();
                            leadModal.setData(item.task);
                            removeNotification(item.id);
                        }} className="flex items-center cursor-pointer hover:scale-105">
                          <div className={`w-16 h-16 relative rounded p-3 border ${Logo[item.logo]?.logoBorder} text-gray-100 ${Logo[item.logo]?.logoBg}`}>
                            {Logo[item.logo]?.logo}
                          </div>
                          <div className="flex relative flex-col ml-3">
                            <p className='text-xs absolute -top-4 text-gray-600'>{dateFormat(item.updatedAt, 'dd.mm.yyyy h:MM TT')}</p>
                            <div className="font-bold leading-none text-black">{item.title}</div>
                            {item.message && <p className="text-sm text-gray-500 leading-none mt-1">{item.message}</p>}
                          </div>
                        </div>
                        <button onClick={() => {
                           removeNotification(item.id); 
                        }} className="flex-no-shrink bg-gray-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-gray-500 hover:bg-gray-600 text-white rounded">Remove</button>
                      </div>
                    </div>
              ) :
              <div className="flex flex-col relative py-5 px-4 bg-gray-200 shadow-md hover:shodow-lg rounded">
                      <div className='text-gray-600 text-xs absolute bottom-0'>{item.creator}</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-16 h-16 relative rounded p-3 border ${Logo[item.logo]?.logoBorder} text-gray-100 ${Logo[item.logo]?.logoBg}`}>
                            {Logo[item.logo]?.logo}
                          </div>
                          <div className="flex relative flex-col ml-3">
                            <p className='text-xs absolute -top-4 text-gray-600'>{dateFormat(item.updatedAt, 'dd.mm.yyyy h:MM TT')}</p>
                            <div className="font-bold leading-none text-black">{item.title}</div>
                            {item.message && <p className="text-sm text-gray-500 leading-none mt-1">{item.message}</p>}
                          </div>
                        </div>
                        <button onClick={() => {
                           removeNotification(item.id); 
                        }} className="flex-no-shrink bg-gray-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-gray-299 hover:bg-gray-600 text-white rounded">Remove</button>
                      </div>
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
