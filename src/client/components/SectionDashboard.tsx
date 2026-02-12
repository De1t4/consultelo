"use client";
import { signOut, useSession } from "next-auth/react"
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { useEffect, useState } from "react";

export default function SectionDashboard() {
  const [isOpen, setIsOpen] = useState(false)
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
            <p>Bienvenido {session.user?.email}</p>
            <Button className="cursor-pointer" onClick={() => signOut()}>Cerrar sesión</Button>
            <Button className="cursor-pointer" onClick={() => setIsOpen(true)}>Abrir modal</Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <p className="text-black">Modal</p>
            </Modal>
          </>
        ) : (
          <p>No has iniciado sesión</p>
        )
      }
    </div>
  )
}
