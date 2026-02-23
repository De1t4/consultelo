import SectionDashboard from '@components/dashboard/SectionDashboard'
import ConsultationList from '@/components/dashboard/ConsultationList'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/shared/lib/auth'
import { redirect } from 'next/navigation'
import { getMyConsultations } from '@/services/consultation-service'

export default async function Page() {
	const session = await getServerSession(authOptions)

	if (!session?.user?.id) {
		redirect('/login')
	}

	const initialData = await getMyConsultations(session.user.id)

	return (
		<>
			<section className='w-full '>
				<SectionDashboard />
				<ConsultationList consultations={initialData} />
			</section>
		</>
	)
}