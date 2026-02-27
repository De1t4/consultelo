import { Button } from "@/components/ui/Button"
import { AlertCircle, Home } from "lucide-react"
import Link from "next/link"

function NotFoundConsult() {
  return (
    <div className="max-w-3xl mx-auto bg-linear-to-b to-background  from-background text-center">
      {/* Main Content */}

      {/* Inquiry Card */}
      <div className="bg-background rounded-xl  p-8 mb-8 h-[70vh] flex flex-col justify-center items-center">
        <div className="mb-12 flex flex-col items-center">
          <div className="relative h-36 w-36 rounded-full bg-primary/20 dark:bg-primary/5 flex items-center justify-center shadow-lg mb-2">
            <AlertCircle className=" h-24 w-24 rounded-full text-primary dark:text-primary flex items-center justify-center " />
          </div >
          <h1 className="text-3xl font-bold text-foreground dark:text-primary mb-4 mt-2">
            Consultation Not Found
          </h1>
          <p className="text-lg text-muted-foreground">
            The consultation you are looking for does not exist or has been deleted.
            <br />
          </p>
        </div>

        <div className="flex justify-center items-center gap-4">
          <Link href="/">
            <Button variant="primary" className="flex items-center gap-2">
              <Home />
              Go to home
            </Button>
          </Link>
          <Button variant="outline" className="flex items-center gap-2 dark:text-primary">
            Contact Support
          </Button>

        </div>
      </div>



    </div>
  )
}

export default NotFoundConsult