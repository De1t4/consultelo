'use client'
import { AuthContext, useAuth } from "@/client/context/AuthContext";
import { getConsultations } from "@/server/services/UsersService";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  // const { data: consultations } = useQuery({
  //   queryKey: ["consultations"],
  //   queryFn: () => getConsultations(),
  // });
  const { session, signUp, signOut } = useAuth();


  if (!session) {
    return (
      <>
        <button onClick={signUp}>Sign in with Google</button>
      </>
    );
  } else {
    return (
      <div>
        <h2>Welcome, {session?.user?.email}</h2>
        <button onClick={signOut}>Sign out</button>
      </div>
    );
  }

}
