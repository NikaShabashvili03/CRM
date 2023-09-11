'use client'
import React from 'react'
import useEditProfileModal from '../hooks/useEditProfileModal';


export default function ProfileClient({currentUser}: any) {
  const editProfile = useEditProfileModal();
  return (
    <main className="profile-page bg-gradient-to-l from-indigo-500 h-screen flex justify-center items-center">
      <section className="relative bg-blueGray-200 w-[90%]">
        <div className="container mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  {currentUser.role == 'User' ? (
                       <div className="relative mt-12 w-32 h-32">
                        <img src={currentUser.avatar} className="shadow-xl rounded-full w-full h-full align-middle border-none absolute max-w-150-px"/>
                      </div>
                  ) : (
                    <>
                      <div className="absolute left-[45%] -top-12 mt-12 w-32 h-32">
                        <img src={currentUser.avatar} className="shadow-xl rounded-full w-full h-full align-middle border-none absolute max-w-150-px"/>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button onClick={() => {
                        editProfile.onOpen();
                        editProfile.setUser(currentUser);
                    }} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                      Edit
                    </button>
                  </div>
                </div>
                {currentUser.role == "User" && (
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{currentUser.tasks?.filter((item: any) => item.status == "none").length}</span><span className="text-sm text-blueGray-400">Leads</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-green-600">{currentUser.tasks?.filter((item: any) => item.status == "won").length}</span><span className="text-sm text-blueGray-400">Won</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-yellow-600">{currentUser.tasks?.filter((item: any) => item.status == "sleep").length}</span><span className="text-sm text-blueGray-400">Sleep</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-red-600">{currentUser.tasks?.filter((item: any) => item.status == "lost").length}</span><span className="text-sm text-blueGray-400">Lost</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <h2 className="text-2xl leading-normal text-blueGray-700 mb-2">
                  {currentUser.email}
                </h2>
                <h1>
                  {currentUser.role}
                </h1>
                <div className="mb-2 text-blueGray-600 mt-10">
                  +(995) {currentUser.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
