export type Tab = "account" | "security" | "others";

export interface Tabs {
  id: Tab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
