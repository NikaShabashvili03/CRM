import { Task } from './types';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/app/types';
import { useEffect, useState } from 'react';

import {FaPhoneAlt, FaUserCircle,} from 'react-icons/fa'
import { toast } from 'react-hot-toast';
import useLeadModal from '@/app/hooks/useLeadModal';
import { BiSolidMessage } from 'react-icons/bi';
import dateFormat from 'dateformat';

type TaskItemProps = {
  task: Task;
  currentUser: SafeUser
  owner?: any,
};
 
const TaskItem = ({ task, currentUser }: TaskItemProps) => {
  const router = useRouter();
  const leadModal = useLeadModal();
  return (
    <div className='h-max flex-grow w-[275px] border-b-2 bg-white p-2 rounded-md flex flex-col gap-x-4 border-l-4 border-emerald-950		'>
      <div onClick={() => {}} className=''>
      <div className='flex justify-between items-center w-full'>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.name}</h5>
      <a className='text-gray-700 hover:text-gray-900' href={`tel:${task.phone}`}><FaPhoneAlt size={20}/></a>
      </div>
      <div className='flex justify-between items-center w-full'>
        <p className="font-normal text-gray-700 dark:text-gray-400">{task.phone}</p>
        <a className='text-gray-700 hover:text-gray-900' href={`https://wa.me/${task.phone}`}><BiSolidMessage size={20}/></a>
      </div>
      <div className='flex justify-between items-center w-full'>
        <p className="font-normal text-gray-400 dark:text-gray-400 text-sm">{dateFormat(task.updatedAt, "dd.mm.yyyy")}</p>
      </div>
      <div className='flex flex-col justify-between items-start w-full mt-5'>
      <p className="font-normal text-gray-700 dark:text-gray-400 text-sm">Lead</p>
      <button onClick={() => {
        leadModal.onOpen()
        leadModal.setCurrentUser(currentUser)
        leadModal.setData(task)
        router.refresh();
      }} type="button" className="focus:outline-none text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:ring-purple-300 font-sm rounded-lg text-sm px-3.5 mt-2 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">View</button>

      </div>
      <div className='flex justify-between items-center w-full mt-2'>
      <button className="font-normal text-gray-400 dark:text-gray-400 text-sm">+</button>
      <div className='flex items-center gap-2'>
      <p className="font-normal text-gray-700 dark:text-gray-400 text-sm">{task.user.firstName}  {task.user.lastName}</p>

      <img src={task.user.avatar} className='w-[20px] rounded-full h-[20px] bg-white'></img>

      </div>
      </div>
      </div>
    </div>

  );
};

export default TaskItem;
