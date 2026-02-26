import ConsultationList from '@/app/(owner)/my-consultations/components/ConsultationList'
import { getMyConsultations } from '@/services/consultation-service'
import { authOptions } from '@/shared/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  const initialData = await getMyConsultations(session.user.id)

  return (
    <section className='w-full '>
      {/* <ConsultationFilters consultations={initialData} /> */}
      <ConsultationList consultations={initialData} />
    </section>
  )
}
