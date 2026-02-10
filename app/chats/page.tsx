import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

const page = async () => {
  const session = await auth()
  if(!session||session.user.role !== 'tenant'){
    toast.error('Unauthorized access')
    redirect('/')
  }
  return (
    <div>page</div>
  )
}

export default page