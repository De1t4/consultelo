"use client";
import { useSession } from "next-auth/react"

export default function SectionDashboard() {
  const { data: session } = useSession()
  return (
    <div>
      {
        session ? (
          <p>Bienvenido {session.user?.email}</p>
        ) : (
          <p>No has iniciado sesión</p>
        )
      }
    </div>
  )
}
