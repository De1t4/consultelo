"use client";
import { signOut, useSession } from "next-auth/react"
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { useState } from "react";

export default function SectionDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
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
