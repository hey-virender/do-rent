import { getMyProfile } from "@/actions/user.action";
import Profile from "@/components/user/Profile";


const page = async () => {
  const user = await getMyProfile();
  console.log("user profile:", user);
  
  const cleanUser = user ? JSON.parse(JSON.stringify(user)) : null;
  
  return (
    <>
    <Profile user={cleanUser} isOwnProfile={true}/>
    </>
  );
};

export default page;
