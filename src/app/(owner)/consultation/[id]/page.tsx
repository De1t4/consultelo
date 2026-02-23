'use client'

import { useParams } from "next/navigation"

export default function Page() {
  const params = useParams<{ id: string }>()
  console.log(params.id)
  return (
    <>
      <p className="text-white">{params.id.toString()}</p>
    </>
  )
}
