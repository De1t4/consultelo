"use client";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@ui/Button";
import { useEffect } from "react";

export default function SectionDashboard() {
  const { data: session } = useSession()

  useEffect(() => {
    const fetchSession = async () => {
      const test = await fetch("/api/auth/consult").then(res => res.json())
      console.log(test);
    }
    fetchSession()
  }, [])
  return (
    <div>
      {
        session ? (
          <>
            <p>Bienvenido {session.user.email}</p>
            <Button className="cursor-pointer" onClick={() => signOut()}>Cerrar sesión</Button>
          </>
        ) : (
          <p>No has iniciado sesión</p>
        )
      }
    </div>
  )
}
