'use client'
import React, { useState } from 'react'
import useCreateProfileModal from '../hooks/useCreateProfileModal';
import SortUsers from '../components/SortUsers';
import ProfileCard from './components/ProfileCard';

export default function UsersOwner({
    allUser,
    currentUser,
}: any) {
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
