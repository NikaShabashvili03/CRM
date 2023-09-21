'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modals/leads/Modal'
import axios from 'axios';
import useLeadModal from '@/app/hooks/useLeadModal';
import { BiNotepad, BiCommentDetail } from 'react-icons/bi'
import ActivityForm from '../activity/ActivityForm';
import useEditModal from "@/app/hooks/useEditModal";
import ActivityContainer from "../activity/ActivityContainer";
import LeadsInfo from "../LeadsInfo";
import toast from "react-hot-toast";

const LeadModal = ({activitys}: any) => {
  const [confetti, setConfetti] = useState(false)
  const editModal = useEditModal();
  const leadModal = useLeadModal();
  const { 
    data, 
    currentUser,
  } = leadModal;
  const [openActivity, setOpenActivity] = useState(false);
  const router = useRouter();


  const [activity, setActivity] = useState(activitys.filter((item: any) => (item.taskId == data.id && item.userId == data.userId)));
  
  useEffect(() => {
    setActivity(activitys.filter((item: any) => (item.taskId == data.id)))
  },[activitys, leadModal.isOpen])

  const [leadDeadline, setLeadDeadline] = useState(new Date());
  const [sleepDeadlineModal, setSleepDeadlineModal] = useState(false)
  
  const statusChange = (status: any) => {
    axios.post(`/api/leads/status/${data.id}`, {
      status: status,
      deadline: leadDeadline
    }).then(() => {
      setConfetti(false)
      leadModal.onClose()
      router.refresh();
    })
  }
  const activityPost = (activityData: any) => {
      axios.post('/api/activity', {
        taskId: data.id,
        status: activityData.status,
        message: activityData.message,
        deadline: activityData.deadline && activityData.deadline,
      }).then(() => {
        router.refresh();
      })
      if(currentUser?.role == "Admin" && currentUser.id != data.userId){
        axios.post("/api/notification", {
          title: `You Have New ${activityData.status[0].toUpperCase() + activityData.status.slice(1)}`,
          logo: activityData.deadline ? "newActivity" : "newMessage",
          message: activityData.message.length > 25 ? activityData.message.slice(0, 25) + "..." : activityData.message,
          userId: data.userId,
          taskId: data.id,
          creator: currentUser.firstName + " " + currentUser.lastName
        }).then(() => {

        })
      }
  }

  const [activityModal, setActivityModal] = useState(false)
  const [commentModal, setCommentModal] = useState(false)

  const [activityEdit, setActivityEdit] = useState({
    id: '',
    deadline: null,
    message: '',
    status: '',
  });

  const AllStatus = {
    activity: {
      title: "Activity",
      logo: <BiNotepad size={20} color='white'/>,
      logoBg: 'bg-red-600',
      deadline: true,
    },
    comment: {
      title: "Comment",
      logo: <BiCommentDetail size={20} color='white'/>,
      logoBg: 'bg-indigo-600',
      deadline: false,
    },
  }

  let modalContent;

  if(activityModal && !commentModal){
    modalContent = (
      <>
            <ActivityForm
              title={"Activity"}
              Pickdeadline={true}
              CloseModal={setActivityModal}
              status={"activity"}
              activityPost={activityPost}
              setActivityEdit={setActivityEdit}
              activityEdit={activityEdit}
              setActivityModal={setActivityModal}
               setCommentModal={setCommentModal}
            />
      </>
    )
  }
  if(!activityModal && commentModal){
    modalContent = (
      <>
            <ActivityForm
              title={"Comment"}
              Pickdeadline={false}
              status={"comment"}
              CloseModal={setCommentModal}
              activityPost={activityPost}
              setActivityEdit={setActivityEdit}
              activityEdit={activityEdit}
              setActivityModal={setActivityModal}
              setCommentModal={setCommentModal}
            />
      </>
    )
  }


  const bodyContent = (
    <div className={`flex h-full w-full relative justify-between ${confetti && 'overflow-y-hidden'}`}>
        <ActivityContainer
          setOpenActivity={setOpenActivity}
          openActivity={openActivity}
          confetti={confetti}
          setConfetti={setConfetti}
          sleepDeadlineModal={sleepDeadlineModal}
          setSleepDeadlineModal={setSleepDeadlineModal}
          setLeadDeadline={setLeadDeadline}
          leadDeadline={leadDeadline}
          statusChange={statusChange}
          setActivityModal={setActivityModal}
          setCommentModal={setCommentModal}
          activity={activity}
          activityEdit={activityEdit}
          setActivityEdit={setActivityEdit}
          data={data}
          currentUser={currentUser}
          AllStatus={AllStatus}
        />
        <LeadsInfo data={data}/>
      </div>
  )
  return (
    <Modal
      isOpen={leadModal.isOpen}
      title={data.name}
      editModalOpen={
        () => {
          editModal.onOpen()
          editModal.setCurrentUser(currentUser)
          editModal.setData(data)
        }}
      // actionLabel={t("button")}
      // onSubmit={handleSubmit(onSubmit)}
      modal={modalContent}
      onClose={leadModal.onClose}
      body={bodyContent}
    />
  );
}

export default LeadModal;