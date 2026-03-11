'use client';

import { LucideIcon } from "lucide-react";
import React from "react";

interface ActionButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"
  icon?: LucideIcon
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  form?: string
}

export function Button({
  children,
  variant = "primary",
  icon: Icon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  form
}: ActionButtonProps) {
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white shadow-sm",
    secondary: "bg-slate-600 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
    ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
    destructive: "bg-red-600 hover:bg-red-700 text-white shadow-sm"
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
      className={`
        inline-flex items-center justify-center px-4 py-2 
        font-medium rounded-lg transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        ${variants[variant]}
        ${className}
      `}
    >
      {Icon && <Icon className="h-4 w-4 mr-2" />}
      {children}
    </button>
  )
}
