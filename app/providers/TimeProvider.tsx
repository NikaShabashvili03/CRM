'use client'
import React, { useEffect, useState } from 'react'
import dateFormat from 'dateformat';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function TimeProvider({sleepLeads, activitys, currentUser}: any) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentDate(new Date());
    }, 1000);

    return () => {
        clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    function sleepLeadReturn () {
        sleepLeads.map((item: any, i: any) => {
            if(currentUser.id == item.user.id){
                if(currentDate >= item.deadline) {
                    axios.post(`/api/leads/status/${item.id}`, {
                        status: 'none',
                        deadline: undefined
                    }).then(() => {
                        toast.success("Lead Return Success")
                        axios.post("/api/notification", {
                            message: `You Sleeped Lead Return :)`,
                            userId: item.userId,
                            creator: 'Kolos-Resort',
                            taskId: item.id,
                        }).then(() => {
                            toast.success("Notification has been created")
                            router.refresh();
                        })
                    })
                }
            }
        })  
    }
    
    function lostActivity() {
        activitys.map((item: any, i: any) => {
            if(item.deadline && !item.lostActivity && currentUser.id == item.task.userId){
                if(currentDate >= item.deadline) {
                    axios.post(`/api/activity/${item.id}`,{
                        lost: true
                    })
                    .then(() => {
                        toast.success("You lost activity on your lead")
                        router.refresh();
                        axios.post("/api/notification", {
                            message: `You Have Lost Activity`,
                            userId: item.task.userId,
                            creator: 'Kolos-Resort',
                            taskId: item.taskId,
                        }).then(() => {
                            toast.success("Not created")
                        })
                    })
                }
            }
            if(item.deadline && item.lostActivity && currentUser.id == item.task.userId){
                if(currentDate < item.deadline) {
                    axios.post(`/api/activity/${item.id}`,{
                        lost: false
                    })
                    .then(() => {
                        router.refresh();
                    })
                }
            }
        })
    }










    lostActivity();
    sleepLeadReturn();
  },[sleepLeads, activitys])


    return <></>
}
