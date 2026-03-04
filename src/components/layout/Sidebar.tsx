"use client"

import {
  ChevronRight,
  Folder,
  LayoutDashboard,
  LogOut,
  Menu,
  MenuIcon,
  Plus,
  Settings,
  User,
  X
} from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"


interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
  active?: boolean
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard className="size-5" />, href: "/dashboard", active: true },
  { label: "My Consultations", icon: <Folder className="size-5" />, href: "/my-consultations" },
]

export function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

  const pathname = usePathname()

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`fixed left-0 top-0 z-20 bg-card hidden h-screen flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out md:flex ${expanded ? "w-60" : "w-[72px]"}`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <MenuIcon className="" />
            <span
              className={`text-2xl font-bold tracking-tight text-primary whitespace-nowrap transition-all duration-300 ${expanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}
            >
              Consultelo
            </span>
          </Link>
        </div>

        {/* Create button */}
        <div className="px-3 mt-1 mb-2">
          <Link href="/consultation" >
            <button
              type="button"
              className={`flex items-center cursor-pointer justify-center gap-0 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:opacity-90 active:scale-95 ${expanded ? "w-full px-5 py-2.5 justify-start" : "w-11 h-11 justify-center mx-auto"}`}
            >
              <Plus className="size-6 shrink-0 text-white" />
              <span
                className={`whitespace-nowrap transition-all duration-300 text-white text-sm ${expanded ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"}`}
              >
                Create
              </span>
            </button>
          </Link>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto  ">
          <ul className="flex flex-col gap-0.5 ">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <SidebarNavItem
                  item={item}
                  expanded={expanded}
                  isActive={activeItem === item.href}
                  onClick={() => setActiveItem(item.href)}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="mt-auto border-t border-border px-3 py-3">
          <ul className="flex flex-col gap-0.5">
            <li>
              <SidebarNavItem
                item={{ label: "Settings", icon: <Settings className="size-5" />, href: "/profile" }}
                expanded={expanded}
                isActive={false}
                onClick={() => { }}
              />
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className={`flex items-center w-full cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${expanded ? "justify-start " : "justify-center"} text-sidebar-foreground hover:bg-sidebar-accent`}
              >
                <span
                  className={`shrink-0 transition-colors text-muted-foreground`}
                >
                  <LogOut />
                </span>
                <span
                  className={`whitespace-nowrap transition-all duration-300 ${expanded ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"}`}
                >
                  Log Out
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside >

      {/* Mobile bottom nav */}
      < nav className="fixed bottom-0 bg-card left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-sidebar px-1 py-1 md:hidden" >
        {
          mainNavItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveItem(item.href)}
              className={`flex flex-1 cursor-pointer hover:bg-sidebar-accent flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] transition-colors ${activeItem === item.href ? "text-primary font-semibold" : "text-muted-foreground"}`}
            >
              <span
                className={`flex items-center justify-center rounded-full px-4 py-1 transition-colors ${activeItem === item.href ? "bg-sidebar-accent" : ""}`}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))
        }
        < button
          onClick={() => setMobileOpen(true)
          }
          className="flex flex-1 flex-col cursor-pointer hover:bg-sidebar-accent  items-center gap-0.5 rounded-lg py-1.5 text-[10px] text-muted-foreground transition-colors"
        >
          <span className="flex items-center justify-center rounded-full px-4 py-1">
            <Menu className="size-5" />
          </span>
          More
        </button >
      </nav >

      {/* Mobile drawer */}
      {
        mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden ">
            <div
              className="absolute inset-0 bg-border/50 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute bg-card left-0 top-0 h-full w-72 animate-in slide-in-from-left duration-300 bg-sidebar flex flex-col shadow-xl">
              {/* Mobile header */}
              <div className="flex h-14 items-center justify-between px-4 border-b border-border">
                <div className="flex items-center justify-center gap-3 ">
                  <button onClick={() => setMobileOpen(false)} className="text-2xl font-bold  p-1.5 rounded-full hover:bg-sidebar-accent transition-colors cursor-pointer">
                    <MenuIcon className="size-5 -mt-0.5 cursor-pointer " />
                  </button>
                  <p className="text-2xl font-bold text-primary">Consultelo</p>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Mobile create */}
              <div className="px-3 py-3">
                <button className="flex cursor-pointer w-full items-center gap-3 rounded-full bg-primary px-5 py-2.5 text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                  <Plus className="size-5 text-white" />
                  <span className="text-sm text-white">Create</span>
                </button>
              </div>

              {/* Mobile nav */}
              <nav className="flex-1 overflow-y-auto px-3">
                <ul className="flex flex-col gap-0.5 ">
                  {mainNavItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => {
                          setActiveItem(item.href)
                          setMobileOpen(false)
                        }}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeItem === item.href ? "bg-primary/15 text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}
                      >
                        <span
                          className={activeItem === item.href ? "text-primary" : "text-muted-foreground"}
                        >
                          {item.icon}
                        </span>
                        {item.label}
                        <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile bottom */}
              <div className="border-t border-border px-3 py-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground hover:bg-primary/15 transition-colors"
                >
                  <User />
                  <span className="text-sm font-medium">Your Profile</span>
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

function SidebarNavItem({
  item,
  expanded,
  isActive,
  onClick,
}: {
  item: NavItem
  expanded: boolean
  isActive: boolean
  onClick: () => void
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${expanded ? "justify-start " : "justify-center"} ${isActive ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}
    >
      <span
        className={`shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
      >
        {item.icon}
      </span>
      <span
        className={`whitespace-nowrap transition-all duration-300 ${expanded ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"}`}
      >
        {item.label}
      </span>
      {expanded && isActive && (
        <ChevronRight className="ml-auto size-4 text-muted-foreground" />
      )}
    </Link>
  )
}