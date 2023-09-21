'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { SafeUser } from "./types";
import Container from "@/app/components/Container";
import { useCallback, useState } from "react";
import { NextPage } from 'next';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import Input from './components/inputs/input';
import Button from './components/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useCreateProfileModal from './hooks/useCreateProfileModal';



const LoginClient: NextPage = (): JSX.Element => {
  const router = useRouter();
  // const createmodal = useCreateProfileModal();
  const [isLoading, setLoading] = useState(false);
  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
        defaultValues: {
          email: '',
          password: ''
        },
  });
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then((callback) => {
      if (callback?.ok) {
        toast.success("Login Success")
        router.refresh();
      }
      
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                  <h2 className='text-6xl mb-4 text-center text-blue-800'>CRM</h2>
              </div>
              <div className="divide-y justify-center divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 flex flex-col items-center sm:text-lg sm:leading-7">
                  <div className="relative">
                    <Input
                      id="email"
                      label="Email"
                      disabled={isLoading}
                      register={register}  
                      errors={errors}
                      required
                    />
                    </div>
                    <div className="relative">
                    <Input
                      id="password"
                      label="Password"
                      type="password"
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      required
                    />
                  </div>
                  <div className='w-full mt-12'>
                    <Button big label='Sign in' onClick={handleSubmit(onSubmit)}/>
                  </div>
                </div>

                    {/* Register button  */}

                    {/* <button onClick={() => {
                      createmodal.onOpen()
                    }}>Register</button> */}

                    {/* Users */}
                <div className='flex flex-col'>
                    <h1 className='font-bold'>Admin</h1>
                    <p>email: <i>Admin@mail.com</i></p>
                    <p> password: <i>admin</i></p>
                    <h1 className='font-bold'>User</h1>
                    <p>email: <i>User@mail.com</i></p>
                    <p>password: <i>user</i></p>
                    <h1 className='font-bold'>Spectator</h1>
                    <p>email: <i>Spectator@mail.com</i></p>
                    <p>password: <i>spectator</i></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   );
}
 
export default LoginClient;