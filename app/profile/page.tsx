import { getMyProfile } from "@/actions/user.action";
import { auth } from "@/auth";
import Profile from "@/components/user/Profile";
import { redirect } from "next/navigation";


const page = async () => {
  const session = await auth()
  if(!session?.user){
    redirect("/login");
  }
  const user = await getMyProfile();
  
  
  const cleanUser = user ? JSON.parse(JSON.stringify(user)) : null;
  
  return (
    <>
    <Profile user={cleanUser} isOwnProfile={true}/>
    </>
  );
};

export default page;
