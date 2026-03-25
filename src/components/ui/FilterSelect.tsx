import React from 'react'

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  disabled?: boolean;
}

export const FilterSelect = ({ label, value, onChange, options, disabled }: FilterSelectProps) => (
  <select
    disabled={disabled}
    value={value}
    name={label}
    onChange={(e) => onChange(e.target.value)}
    className='w-full md:w-40 px-3 py-2 bg-card border border-border rounded-xl text-sm text-foreground hover:border-primary/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-primary/20'
  >
    <option value="">{label}</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
