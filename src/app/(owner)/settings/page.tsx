"use client"

import Account from "@/app/(owner)/settings/components/Account";
import Others from "@/app/(owner)/settings/components/Others";
import Security from "@/app/(owner)/settings/components/Security";
import { Lock, MonitorCog, User } from "lucide-react";
import { useState } from "react";
import { Tab, Tabs } from "./types/tab-types";


export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("account")

  const tabs: Tabs[] = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "others", label: "Others", icon: MonitorCog },
  ]

  const renderProfile = () => {
    if (activeTab === "account") return <Account />
    if (activeTab === "security") return <Security />
    if (activeTab === "others") return <Others />
    return <Account />
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl tracking-tight text-foreground font-bold mb-2">Account Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your profile, security preferences, and notifications.</p>
      </div>

      <div className="flex gap-6 max-md:flex-col">
        {/* Sidebar */}
        <aside className="w-64 shrink-0">
          <div className="bg-card rounded-lg border border-border p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                      w-full flex items-center gap-3 my-2 px-4 py-3 rounded-lg cursor-pointer text-sm font-medium transition-colors
                      ${activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }
                    `}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </aside>
        <main className="flex-1 space-y-6 max-md:flex">
          {renderProfile()}
        </main>
      </div>
    </>
  )
}
