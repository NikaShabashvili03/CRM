'use client';


import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';


import Input from '@/app/components/inputs/input';
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Modal from '@/app/components/modals/Modal'
import useEditModal from '@/app/hooks/useEditModal';
import useLeadModal from '@/app/hooks/useLeadModal';


const EditModal = ({allUser}: any) => {
  const {
    onClose,
    isOpen,
    data,
    currentUser,
  } = useEditModal();
  const leadModal = useLeadModal();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
        defaultValues: {
          name: '',
          phone: '',
        },
  });
  const [changeData, setChangeData] = useState({
    userId: '',
    name: '',
    phone: ''
  });
  useEffect(() => {
    setChangeData({
      userId: data.user && data.user.id,
      name: data && data.name,
      phone: data && data.phone
    })
    register
  },[isOpen])

  console.log(changeData )
  const onSubmit:SubmitHandler<FieldValues> = () => {
    axios.post(`/api/leads/update/${data.id}`, {
      userId: changeData.userId,
      phone: changeData.phone,
      name: changeData.name,
    }).then(() => {
      toast.success("True")
      onClose()
      leadModal.onClose();
      router.refresh();
    })
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
        <input
          className='w-full p-2 border rounded-2xl'
          placeholder={data.name}
          value={
            changeData.name
          }
          onChange={(e: any) => {setChangeData({userId: changeData.userId, phone: changeData.phone, name: e.target.value})}}
        />
        <input
          className='w-full p-2 border rounded-2xl'
          placeholder={data.phone}
          value={
            changeData.phone
          }
          onChange={(e: any) => {setChangeData({userId: changeData.userId, phone: e.target.value, name: changeData.name})}}
        />
        {currentUser.role == "Admin" && (
          allUser && (
            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e: any) => {setChangeData({userId: e.target.value, phone: changeData.phone, name: changeData.name})}}>
              {data.user && (
                  allUser.map((option: any, index: any) => {
                    return(
                      data.user.id == option.id ?
                        <option selected key={index} 
                          value={option.id}>
  
                          <div className="mx-2 -mt-1  ">{data.user.firstName} {data.user.lastName}</div>
  
                        </option>
                      : option.role != "Spectator" && (
                          <option key={index} 
                            value={option.id}>
    
                            <div className="mx-2 -mt-1  ">{option.firstName} {option.lastName} 
                            </div>
    
                          </option>
                      )
                    )
                  }
                )
              )}
            </select>
          )
        )}
    </div>
  )

  return (
    <Modal
        isOpen={isOpen}
        title={'Add New Lead'}
        actionLabel={'Add'}
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
        body={bodyContent}
  />
  );
}

export default EditModal;
