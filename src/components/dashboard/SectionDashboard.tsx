"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@ui/Button";
import Link from "next/link";

export default function SectionDashboard() {
  const { data: session } = useSession()

  return (
    <div>
      {
        session ? (
          <>
            <p>Bienvenido {session.user.email}</p>
            <Link href="/consultation"><Button className="cursor-pointer" >Crear Consulta</Button></Link>
            <Button className="cursor-pointer" onClick={() => signOut()}>Cerrar sesión</Button>
          </>
        ) : (
          <p>No has iniciado sesión</p>
        )
      }
    </div>
  )
}
