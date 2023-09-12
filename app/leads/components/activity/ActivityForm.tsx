import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import { IoMdClose } from 'react-icons/io'
import { DateTimePicker } from 'react-rainbow-components';

interface ActivityFormProps {
  CloseModal: any;
  activityPost: any;
  title: string,
  Pickdeadline: boolean,
  status: any,
  setActivityEdit: any,
  activityEdit: any,
  setActivityModal: any,
  setCommentModal: any,
}
export default function ActivityForm({
  CloseModal,
  activityPost,
  title,
  Pickdeadline,
  status,
  setActivityEdit,
  activityEdit,
  setActivityModal,
  setCommentModal,
}: ActivityFormProps) {
  const router = useRouter();
  const [data, setData] = useState<any>({
    id: '',
    deadline: Pickdeadline ? new Date() : undefined,
    message: '',
    status: status,
  })

  useEffect(() => {
    if(activityEdit.status) {
      setData(activityEdit)
    }
  },[])
  console.log(data)
  const activityUpdate = () => {
    axios.post(`/api/activity/update/${data.id}`,{
      message: data.message,
      deadline: data.deadline,
    }).then(() => {
      toast.success("Activity is updated")
      router.refresh();
    })
  }
  return (
    <>
      <div className={`z-30 w-full h-full absolute bg-black/40`}>
            </div>


              <div className="bg-white z-40 group shadow-2xl w-[600px] h-auto rounded-t-2xl absolute right-5 bottom-0">
                    <div className="w-full flex justify-between p-5 rounded-t-2xl items-center bg-gray-300">
                        <h1 className="ml-5 text-xl">{title}</h1>
                        <button
                        className="
                          p-1
                          border-0 
                          left-0 top-0
                          ml-2
                          flex
                          text-center
                          items-center
                          justify-center
                          text-black
                          hover:opacity-70
                          transition
                        "
                        onClick={() => {
                          CloseModal(false)
                          setActivityEdit({
                            id: '',
                            deadline: null,
                            message: '',
                            status: '',
                          })
                        }}
                      >
                      <IoMdClose size={20} />
                    </button>
                    </div>
                  <form>
                      {Pickdeadline && 
                        <div className="w-full p-4 h-auto border-b border-gray-200">
                          <DateTimePicker
                                value={data.deadline}
                                onChange={(value: any) => {setData({deadline: value, message: data.message, status: status, id: data.id})}}
                                formatStyle="large"
                            />
                          </div>
                      }
                      <div className="w-full relative mt-5 h-[296px]">
                          <h1 className='absolute right-5 -top-5'>
                            {data.message.length}/191
                          </h1>
                          <div className="relative h-full w-full min-w-[200px]">
                            <textarea 
                              value={data.message}
                              onChange={(e) => {setData({deadline: data.deadline, message: e.target.value, status: status, id: data.id})}}
                              className="peer h-full w-full resize-none rounded-[7px] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all  disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                              placeholder=" "
                              maxLength={191}
                              required
                            ></textarea>
                          </div>
                      </div>
                      <div className="w-full flex h-[60px] bg-white items-center border-t border-gray-200">
                          <button onClick={() => {
                            !activityEdit.status ? activityPost(data) : activityUpdate()
                            setActivityEdit({
                              id: '',
                              deadline: null,
                              message: '',
                              status: '',
                            })
                            setActivityModal(false)
                            setCommentModal(false)
                          }
                          } disabled={!data.message} type='button' className={`px-8 py-2 ml-5 text-white ${!data.message ? 'bg-gray-200' : 'bg-blue-500'} rounded-xl `}>Post</button>
                      </div>
                  </form>
                </div>
    </>
  )
}
