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
    phone: '',
    email: '',
  });

  useEffect(() => {
    // setChangeData({
    //   userId: data.user && data.user.id,
    //   name: data && data.name,
    //   phone: data && data.phone,
    //   email: data && data.email
    // })
    setChangeData({
      userId: data.user && data.user.id,
      name: data && data.name,
      phone: data && data.phone,
      email: data && data.email,
    })
  },[isOpen])

  const onSubmit:SubmitHandler<FieldValues> = () => {
    if(changeData.name && changeData.userId && changeData.phone){
      axios.post(`/api/leads/update/${data.id}`, {
        userId: changeData.userId,
        phone: changeData.phone,
        name: changeData.name,
        email: changeData.email ? changeData.email : ''
      }).then(() => {
        setChangeData({
          userId: '',
          name: '',
          phone: '',
          email: '',
        })
        toast.success("True")
        onClose()
        leadModal.onClose();
        router.refresh();
      })
    }
    else{
      toast.error("Fill Name and Phone")
    }
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
        <div>
          <label className='ml-1 text-gray-400 mb-1'>Name</label>
          <input
            className='w-full p-2 border rounded-2xl'
            placeholder={data.name}
            type='text'
            value={
              changeData.name
            }
            onChange={(e: any) => {setChangeData({userId: changeData.userId, phone: changeData.phone, name: e.target.value, email: changeData.email})}}
          />
        </div>
        <div>
          <label className='ml-1 text-gray-400 mb-1'>Phone</label>
          <input
            className='w-full p-2 border rounded-2xl'
            placeholder={data.phone}
            type='number'
            value={
              changeData.phone
            }
            onChange={(e: any) => {setChangeData({userId: changeData.userId, phone: e.target.value, name: changeData.name, email: changeData.email})}}
          />
        </div>
       <div>
       <label className='ml-1 text-gray-400 mb-1'>Email</label>
        <input
            className='w-full p-2 border rounded-2xl'
            placeholder={data.email}
            type='email'
            value={
              changeData.email
            }
            onChange={(e: any) => {setChangeData({userId: changeData.userId, phone: changeData.phone, name: changeData.name, email: e.target.value})}}
          />
       </div>
        {currentUser.role == "Admin" && (
          allUser && (
            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e: any) => {setChangeData({userId: e.target.value, phone: changeData.phone, name: changeData.name, email: data.email})}}>
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
        actionLabel={'Change'}
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
        body={bodyContent}
  />
  );
}

export default EditModal;
