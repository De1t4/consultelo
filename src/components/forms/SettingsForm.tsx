'use client'

import { useFormConsult } from '@/hooks/context/FormConsultContext'
import { Check, Edit, Eye, HatGlasses, Loader2, Menu, MessageSquareLock, Users } from 'lucide-react'
import { Button } from '../ui/Button'
import { Toggle } from '../ui/Toggle'

export default function SettingsForm({ isPending }: { isPending: boolean }) {
  const { currentStep, setValue, watch, setCurrentStep, trigger } = useFormConsult()

  const isAnonymous = watch("allowAnonymous")
  const isPrivate = watch("privacy")
  const isViewComments = watch("viewComments")

  return (
    <div className="lg:col-span-1">
      <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
        {currentStep === "drafting" ? (
          <>
            {/* Quick Settings Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
                <Menu className="h-4 w-4 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Quick Settings</h3>
            </div>

            {/* Private Mode */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold text-foreground text-sm">Private Mode</label>
                <Toggle checked={isPrivate === "private"} onChange={(checked) => setValue("privacy", checked ? "private" : "public")} />
              </div>
              <p className="text-xs text-muted-foreground">
                Only people you invite can view this consultation.
              </p>
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-foreground text-sm mb-3">
                How do others respond?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setValue("allowAnonymous", false)}
                  type='button'
                  className={`
                          flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer hover:brightness-105
                          ${!isAnonymous
                      ? "border-primary bg-accent"
                      : "border-border bg-card hover:border-border/80"}
                        `}
                >
                  <HatGlasses className={`h-5 w-5 mb-2 ${!isAnonymous ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-sm font-medium ${!isAnonymous ? "text-foreground" : "text-muted-foreground"}`}>
                    Anonymous
                  </span>
                </button>
                <button
                  onClick={() => setValue("allowAnonymous", true)}
                  type='button'
                  className={`
                          flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer hover:brightness-105
                          ${isAnonymous
                      ? "border-primary bg-accent"
                      : "border-border bg-card hover:border-border/80"}
                        `}
                >
                  <Users className={`h-5 w-5 mb-2 ${isAnonymous ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-sm font-medium ${isAnonymous ? "text-foreground" : "text-muted-foreground"}`}>
                    Registered
                  </span>
                </button>
              </div>
              <div className="flex items-start gap-2 mt-3 p-2 bg-accent rounded-lg border border-border">
                <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-xs text-accent-foreground">
                  Your identity is safe with us in either mode.
                </p>
              </div>
            </div>

            {/* Knowledge Sharing */}
            <div className="mb-6 p-2 bg-accent/30 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <MessageSquareLock className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-foreground text-sm">
                      Shared responses
                    </label>
                    <Toggle checked={isViewComments} onChange={(checked) => setValue("viewComments", checked)} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Optimize decision-making by allowing access to other users{"'"} responses.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Tier */}
            <div className="mb-6">
              <label className="block font-semibold text-foreground text-sm mb-3">
                Type of consultation
              </label>
              <select
                disabled
                className="w-full px-3 py-2 border bg-accent/10 disabled:text-muted-foreground/60 disabled:cursor-not-allowed border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
              >
                <option value="expert-review">Open Question</option>
                <option value="expert-premium">Multiple Choice</option>
              </select>
            </div>

            {/* Continue Button */}
            <Button
              className="w-full justify-center cursor-pointer"
              type='button'
              onClick={async () => {
                const isValid = await trigger(["title", "body"])
                if (isValid) {
                  setCurrentStep("review")
                }
              }}
            >
              Continue to Review
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3">
              Step 2 involves confirming details.
            </p>
          </>
        ) : (
          <>
            {/* Summary Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
                <Check className="h-4 w-4 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Summary & Settings</h3>
            </div>

            {/* Privacy */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground text-sm">Privacy</h4>
                <button type='button' className="text-xs text-primary cursor-pointer hover:underline font-medium" onClick={() => setCurrentStep("drafting")}>
                  Change
                </button>
              </div>
              <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{isPrivate.charAt(0).toUpperCase() + isPrivate.slice(1)} Mode</p>
                  <p className="text-xs text-muted-foreground">{isPrivate === "private" ? "Only you and users invited can see this consultation" : "Visible to all users"}</p>
                </div>
              </div>
            </div>

            {/* Users */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground text-sm">Users</h4>
                <button type='button' className="text-xs text-primary cursor-pointer hover:underline font-medium" onClick={() => setCurrentStep("drafting")}>
                  Change
                </button>
              </div>
              <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{isAnonymous ? "Anonymous" : "Registered"} Users</p>
                  <p className="text-xs text-muted-foreground">{isAnonymous ? "Response only anonymous users" : "Response only registered users"}</p>
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground text-sm">Visibility</h4>
                <button type='button' className="text-xs text-primary cursor-pointer hover:underline font-medium" onClick={() => setCurrentStep("drafting")}>
                  Change
                </button>
              </div>
              <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
                  <MessageSquareLock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Response {isViewComments ? "Visible" : "Hidden"}</p>
                  <p className="text-xs text-muted-foreground">
                    Responses {isViewComments ? "Optimize decision-making by allowing access to other users' responses." : "Ensure the objectivity of participants by allowing independent responses, without the influence of prior opinions."}
                  </p>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                disabled={isPending}
                type='submit'
                className={`w-full flex justify-center items-center gap-1 ${isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Confirm & Publish
              </Button>
              <Button
                icon={Edit}
                variant="outline"
                type='button'
                onClick={() => setCurrentStep("drafting")}
                className="w-full justify-center"
              >
                Edit Information
              </Button>
            </div>

            {/* Terms */}
            <p className="text-xs text-center text-muted-foreground mt-4">
              By publishing, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
