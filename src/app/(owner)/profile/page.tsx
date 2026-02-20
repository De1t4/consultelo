"use client"

import Account from "@/components/settings/Account";
import Others from "@/components/settings/Others";
import Security from "@/components/settings/Security";
import { Lock, MonitorCog, User } from "lucide-react";
import { useState } from "react";

type Tab = "account" | "security" | "others"

interface Tabs {
  id: Tab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

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
    <div>
      <div className="max-w-7xl mx-auto px-6 py-8 mt-20">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile, security preferences, and notifications.</p>
        </div>

        <div className="flex gap-6 max-md:flex-col">
          {/* Sidebar */}
          <aside className="w-64 shrink-0">
            <div className="bg-background rounded-lg border border-border p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-sm font-medium transition-colors
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
      </div>
    </div>
  )
}
