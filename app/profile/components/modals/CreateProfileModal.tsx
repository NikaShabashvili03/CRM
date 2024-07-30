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
import useCreateProfileModal from '@/app/hooks/useCreateProfileModal';
import { AiOutlineFileImage } from 'react-icons/ai';


const CreateProfileModal = () => {
  const {
    onClose,
    isOpen,
  } = useCreateProfileModal();
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
          email: '',
          role: 'User',
        },
  });
  const [avatar, setAvatar] = useState<any>();



  function covertToBase64(e: any){
    var render = new FileReader();

    render.readAsDataURL(e.target.files[0])
    render.onload = () => {
      setAvatar(render.result)
    }
    render.onerror = (error: any) => {
      toast.error("Error :", error)
    }
  }
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    axios.post(`/api/profile`, {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      password: data.password,
      email: data.email,
      role: data.role,
      avatar: avatar ? avatar.toString('base64') : '',
    }).then(() => {
      toast.success("User is created")
      router.refresh();
      setAvatar('')
      onClose()
    })
  }


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <div className='relative w-32 self-center h-32 flex rounded-full justify-center items-center'>
         <img className='w-full h-full bg-gray-300 rounded-full' src={avatar} alt='profile'/>
         <AiOutlineFileImage size={40} className={`absolute ${avatar && 'hidden'}`}/>
         <input 
          onChange={covertToBase64} 
          className='absolute opacity-0 w-full h-full rounded-full' 
          type='file' 
          name='file' 
          accept=".jpeg, .png, .jpg"
          ></input>
      </div>
      <input className='p-2 border rounded-2xl' type="text" placeholder="First Name" {...register("firstName", {required: true})} />
        <input className='p-2 border rounded-2xl' type="text" placeholder="Last Name" {...register("lastName", {required: true})} />
        <input className='p-2 border rounded-2xl' type="text" placeholder="Email" {...register("email", {required: true})} />
        <input className='p-2 border rounded-2xl' type="tel" placeholder="Phone" {...register("phoneNumber", {required: true})} />
        <select {...register("role", { required: true })}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Spectator">Spectator</option>
        </select>
        <input className='p-2 border rounded-2xl' type="text" placeholder="Password" {...register("password", {required: true})} />
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      title={'Edit Profile'}
      actionLabel={'Add'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      body={bodyContent}
    />
  );
}

export default CreateProfileModal;
