import { Copy } from 'lucide-react'
import { useState } from 'react'

export default function ShareConsult({ consultationId, isOwner }: { consultationId: string, isOwner: boolean }) {
  const [copied, setCopied] = useState(false)
  const consultationUrl = `https://consultelo.vercel.app/consultation/${consultationId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(consultationUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOwner) return null

  return (
    <aside className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      <p className="font-semibold text-foreground text-sm mb-3">
        LINK TO YOUR CONSULTATION
      </p>
      <div className="flex items-center gap-3 flex-col">
        <div className="flex-1 min-w-0 bg-accent/20 border border-border rounded-lg px-4 py-3">
          <code className="text-xs text-foreground font-mono break-all whitespace-normal">
            {consultationUrl}
          </code>
        </div>
        <button
          onClick={handleCopy}
          className="flex h-10 w-full items-center justify-center cursor-pointer gap-2 px-4 py-3 bg-card border border-border text-foreground rounded-lg hover:bg-foreground/10 duration-300 transition-colors font-medium"
        >
          <Copy className="h-4 w-4 max-md:h-6 max-md:w-6" />
          <p>{copied ? "Copied!" : "Copy"}</p>
        </button>
      </div>
    </aside>
  )
}
