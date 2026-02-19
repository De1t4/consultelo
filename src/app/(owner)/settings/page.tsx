"use client"

import { useState } from "react"

type Tab = "account" | "security" | "notifications" | "privacy"

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("account")


  return (
    <div>

    </div>
  )
}
