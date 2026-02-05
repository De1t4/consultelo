'use client'
import RegisterForm from "@client/components/RegisterForm";

export default function Home() {

  // const { data: consultations } = useQuery({
  //   queryKey: ["consultations"],
  //   queryFn: () => getConsultations(),
  // });


  return (
    <>
      <RegisterForm />
    </>
  )

}
