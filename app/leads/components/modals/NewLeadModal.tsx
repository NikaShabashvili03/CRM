'use client';


import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';


import Input from '@/app/components/inputs/input';
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useNewLead from '@/app/hooks/useNewLeadModal';
import axios from 'axios';
import Modal from '@/app/components/modals/Modal';


const NewLeadModal = () => {
  const {
    currentUser,
    onClose,
    isOpen,
    allUsers,
  } = useNewLead();
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
          id: ''
        },
  });
  const [selectedUser, setSelectedUser] = useState({
    id: '',
  });
  useEffect(() => {
    if(currentUser.role == "Spectator"){
      isOpen && setSelectedUser({id: allUsers.filter((opt: any) => opt.role != 'Spectator')[0].id})
    }
    else{
      setSelectedUser({id: currentUser.id})
    }
  },[isOpen])
  const onSubmit:SubmitHandler<FieldValues> = (data) => {

    axios.post("/api/leads", {
      userId: selectedUser.id,
      name: data.name,
      phone: data.phone,
      stage: 'new',
      creator: currentUser.firstName + " " + currentUser.lastName
    }).then(() => {
      toast.success("Upload")
      setSelectedUser({id: currentUser.id})
      router.refresh();
      onClose();
    }) 
    if(selectedUser.id != currentUser.id){
      axios.post("/api/notification", {
        message: `You Have new lead`,
        userId: selectedUser.id,
        creator: currentUser.firstName
      }).then(() => {
        toast.success("Notification has been created")
      })
    }

  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Input
        id="name"
        label={'Name'}
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
      />
      <Input
        id="phone"
        label={'Phone'}
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {currentUser.role == "Admin" ?
          allUsers && (
            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e: any) => {setSelectedUser({id: e.target.value})}}>
              {allUsers.map((option: any, index: any) => {
                return(
                    option.role != "Spectator" && (
                      currentUser.id == option.id ?
                        <option selected key={index} 
                          value={option.id}>

                          <div className="mx-2 -mt-1  ">{currentUser.firstName} {currentUser.lastName}</div>

                        </option>
                      : <option key={index} 
                          value={option.id}>

                          <div className="mx-2 -mt-1  ">{option.firstName} {option.lastName} ({option.role})
                          </div>

                        </option>
                    )
                  )
                }
              )}
            </select>
          )
        : currentUser.role == "Spectator" 
          ?
          allUsers && (
            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e: any) => {setSelectedUser({id: e.target.value})}}>
              {allUsers.map((option: any, index: any) => {
                return(
                    option.role != "Spectator" && (
                      currentUser.id == option.id ?
                        <option selected key={index} 
                          value={option.id}>

                          <div className="mx-2 -mt-1  ">{currentUser.firstName} {currentUser.lastName}</div>

                        </option>
                      : <option key={index} 
                          value={option.id}>

                          <div className="mx-2 -mt-1  ">{option.firstName} {option.lastName} ({option.role})
                          </div>

                        </option>
                    )
                  )
                }
              )}
            </select>
          )
          :
          <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <option
              className='cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100' 
              value={JSON.stringify(currentUser)}>
                      <div className="mx-2 -mt-1  ">{currentUser.firstName} {currentUser.lastName} 
                      </div>
            </option>
          </select>
      }
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

export default NewLeadModal;
