import SectionDashboard from '@components/dashboard/SectionDashboard'

export default function Page() {

	return (
		<section className="h-[calc(100vh-7rem)] flex justify-center items-center">
			<div>
				<h1 className="text-white text-5xl">Dashboard</h1>
				<SectionDashboard />
			</div>
		</section>
	)
}