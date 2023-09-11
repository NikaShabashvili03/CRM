'use client'
import React, { useState } from 'react'
import ProfileCard from './components/ProfileCard'
import useCreateProfileModal from '../hooks/useCreateProfileModal'
import Button from '../components/Button';
import SortLeads from '../components/SortLeads';
import SortUsers from '../components/SortUsers';

export default function ProfileOwner({allUser, currentUser}: any) {
  const profileModal = useCreateProfileModal();
  const [filterUsers, setFilterUsers] = useState(allUser);
  return (
    <div className='bg-gradient-to-l from-indigo-500 h-screen'>
      <SortUsers setUser={setFilterUsers} allUser={allUser} currentUser={currentUser}/>
      <div className='w-32 ml-5 pt-5'>

      </div>
      <div className='grid grid-cols-4 gap-4 mt-5'>
        {filterUsers.map((user: any, i: any) => (
            <ProfileCard key={i} user={user}/>
        ))}
      </div>
    </div>
  )
}
