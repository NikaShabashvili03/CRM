'use client';


import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';


import Input from '@/app/components/inputs/input';
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import axios from 'axios';
import Modal from '@/app/components/modals/Modal';
import useEditProfileModal from '@/app/hooks/useEditProfileModal';
import { AiOutlineFileImage } from 'react-icons/ai';


const EditProfileModal = ({currentUser}: any) => {
  const {
    onClose,
    isOpen,
    user,
  } = useEditProfileModal();
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
          firstName: '',
          lastName: '',
          phoneNumber: '',
        },
  });
  const [data, setData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    role: user.role,
    email: user.email,
    avatar: user.avatar,
  });
  const Roles = [
    "User",
    "Admin",
    "Spectator"
  ]

  function covertToBase64(e: any){
    var render = new FileReader();
    render.readAsDataURL(e.target.files[0])
    render.onload = () => {
      setData({
        avatar: render.result, 
        firstName: data.firstName, 
        lastName: data.lastName, 
        phoneNumber: data.phoneNumber, 
        email: user.email,
        role: data.role
      })
    }
    render.onerror = (error: any) => {
      toast.error("Error :", error)
    }
  }
  const onSubmit:SubmitHandler<FieldValues> = () => {
    axios.post(`/api/profile/${user.id}`, {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      role: data.role,
      email: data.email,
      avatar: data.avatar.toString('base64'),
    }).then(() => {
      toast.success("User is updated")
      router.refresh();
      onClose()
    })
  }
  useEffect(() => {
    setData({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    })
  },[isOpen])
  const removeUser:SubmitHandler<FieldValues> = () => {
    axios.post(`/api/profile/delete/${user.id}`,).then(() => {
      toast.success("User is deleted")
      router.refresh();
      onClose()
    })
  }
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <div className='relative w-32 self-center h-32 flex rounded-full justify-center items-center'>
         <img className='w-full h-full bg-gray-300 rounded-full' src={data.avatar}></img>
         <AiOutlineFileImage size={40} className={`absolute ${data.avatar && 'opacity-90'}`}/>
         <input 
          onChange={covertToBase64} 
          className='absolute opacity-0 w-full h-full rounded-full' 
          type='file' 
          name='file' 
          accept=".jpeg, .png, .jpg"
          ></input>
      </div>
      <input
        className='p-2 border-2 rounded-2xl'
        value={data.firstName}
        onChange={(e: any) => setData({avatar: data.avatar ,firstName: e.target.value, lastName: data.lastName, phoneNumber: data.phoneNumber, role: data.role, email: data.email})}
        id="firstName"
        placeholder={'First Name'}
        disabled={isLoading}
      />
      <input
        className='p-2 border-2 rounded-2xl'
        value={data.lastName}
        onChange={(e: any) => setData({avatar: data.avatar ,firstName: data.firstName, lastName: e.target.value, phoneNumber: data.phoneNumber, role: data.role, email: data.email})}
        id="lastName"
        placeholder={'Last Name'}
        disabled={isLoading}  
      />
       <input
        className='p-2 border-2 rounded-2xl'
        value={data.phoneNumber}
        onChange={(e: any) => setData({avatar: data.avatar ,firstName: data.firstName, lastName: data.lastName, phoneNumber: e.target.value, role: data.role, email: data.email})}
        id="phoneNumber"
        placeholder={'Phone'}
        type="number"
        disabled={isLoading}
      />
      <select onChange={(e: any) => setData({avatar: data.avatar ,firstName: data.firstName, lastName: data.lastName, phoneNumber: data.phoneNumber, role: e.target.value, email: data.email})}>
        {currentUser.role == "Admin" ? (
          Roles.map((role: any, index) => {
            return(
               <>
                 {user.role == role ?
                  (
                    <option selected key={index} 
                      value={role}>
  
                      <div className="mx-2 -mt-1  ">{user.role}</div>
  
                    </option>
                  )
                  : (
                    <option key={index} value={role}>
  
                      <div className="mx-2 -mt-1  ">{role}
                      </div>
  
                    </option>
                  )}
               </>
            )
          })
        ) : (
            <option selected 
              value={'User'}>

              <div className="mx-2 -mt-1  ">{user.role}</div>

            </option>
        )}
      </select>
      <input
        className='p-2 border-2 rounded-2xl'
        value={data.email}
        onChange={(e: any) => setData({avatar: data.avatar ,firstName: data.firstName, lastName: data.lastName, phoneNumber: data.phoneNumber, role: data.role, email: e.target.value})}
        id="email"
        placeholder={'Email'}
        disabled={isLoading}  
      />
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      title={'Edit Profile'}
      actionLabel={'Add'}
      removeUser={currentUser.role == "Admin" ? handleSubmit(removeUser) : undefined}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      body={bodyContent}
    />
  );
}

export default EditProfileModal;
