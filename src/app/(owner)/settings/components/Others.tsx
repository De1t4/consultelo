import { useTheme } from "@/context/ThemeContext";

type Theme = 'light' | 'dark';

export default function Others() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="bg-card rounded-lg border border-border p-6 w-full">
      <h2 className="text-lg font-semibold text-foreground mb-6">Other Settings</h2>

      {/* Change Password */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-4">Change Theme</h3>
        <div className="space-y-4 w-full">
          <select
            id="theme"
            value={theme}
            onChange={(e) => toggleTheme(e.target.value as Theme)}
            className="w-full px-3 py-2 border text-foreground bg-card border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
          >
            <option value="" disabled>Select...</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      {/* <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-4">Change Language</h3>
        <div className="space-y-4 max-w-md w-full">
          <select
            id="language"
            defaultValue={""}
            className="w-full px-3 py-2 border text-foreground bg-card border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
          >
            <option value="" disabled>Select...</option>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div> */}
    </div>
  )
}
