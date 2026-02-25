"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@ui/Button";
import Link from "next/link";

export default function SectionDashboard() {
  const { data: session } = useSession()

  return (
    <div className="">
      {
        session ? (
          <>
            <h2 className="text-foreground text-5xl font-bold tracking-tight">Welcome {session.user.name}</h2>
            <p className="text-accent-foreground text-2xl font-medium">Start a new consultation.</p>
            <Link href="/consultation"><Button className="cursor-pointer" >Crear Consulta</Button></Link>
            <Button className="cursor-pointer" onClick={() => signOut()}>Cerrar sesión</Button>
          </>
        ) : (
          <p>You are not logged in</p>
        )
      }
    </div>
  )
}
