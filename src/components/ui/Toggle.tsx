"use client"

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Toggle({ checked, onChange, disabled = false, className = "" }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors duration-200 ease-in-out cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${checked ? "bg-teal-500" : "bg-gray-300"}
        ${className}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white
          transition-transform duration-200 ease-in-out
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  )
}
