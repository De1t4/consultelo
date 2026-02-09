'use client';

import { LucideIcon } from "lucide-react";
import React from "react";

interface ActionButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  icon?: LucideIcon
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function Button({
  children,
  variant = "primary",
  icon: Icon,
  onClick,
  className = "",
  disabled = false
}: ActionButtonProps) {
  const variants = {
    primary: "bg-teal-500 hover:bg-teal-600 text-white shadow-sm",
    secondary: "bg-slate-600 hover:bg-slate-700 text-white",
    outline: "border-2 border-teal-500 text-teal-600 bg-white hover:bg-teal-500 hover:text-white",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center px-4 py-2 
        font-medium rounded-lg transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {Icon && <Icon className="h-4 w-4 mr-2" />}
      {children}
    </button>
  )
}
