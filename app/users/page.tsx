import LoginClient from "../LoginClient";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getAllUser from "../actions/getAllUsers";
import UsersOwner from "./UsersOwner";
import { redirect } from "next/navigation";
 

const UsersPage = async ({params}: any) => {
  const currentUser = await getCurrentUser();
  const allUser = await getAllUser();

  if (currentUser?.role == "Admin"){
    return (
      <ClientOnly>
          <UsersOwner
            allUser={allUser}
            currentUser={currentUser}
            />
      </ClientOnly>
    )
  }
  return redirect('/profile')
}
 
export default UsersPage;
