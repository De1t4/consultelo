import { Button } from '@/components/ui/Button'
import { FolderOpen } from 'lucide-react'
import Link from 'next/link'

export default function EmptyState() {
  return (
    <>
      <div className='flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in duration-500 h-[50vh]'>
        <div className='p-6 bg-muted/20 rounded-full mb-6'>
          <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <h3 className='text-xl font-semibold text-foreground mb-2'>No consultations found</h3>
        <p className='text-muted-foreground text-sm max-w-xs mb-8'>
          Start a new consultation to get expert advice or manage your inquiries here.
        </p>
        <Link href="/consultation">
          <Button variant='primary' className='px-8 rounded-full'>
            Create Consultation
          </Button>
        </Link>
      </div>
    </>
  )
}
