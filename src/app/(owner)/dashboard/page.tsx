import SectionDashboard from '@components/dashboard/SectionDashboard'
import { getMyConsultationsAction } from '@/actions/consultation-action'
import ConsultationList from '@/components/dashboard/ConsultationList'

export default async function Page() {
	const initialData = await getMyConsultationsAction()

	return (
		<>
			<section className='w-full '>
				<SectionDashboard />
				<ConsultationList consultations={initialData} />
			</section>
		</>
	)
}