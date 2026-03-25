import { getMyConsultations } from '@/features/consultations/services/consultation-queries'
import { authOptions } from '@/shared/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import ConsultationContent from './components/ConsultationContent'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  const initialData = await getMyConsultations(session.user.id)

  return (
    <section className='w-full '>
      <ConsultationContent consultations={initialData} />
    </section>
  )
}
