'use client'

import { useFormConsult } from '@/hooks/context/FormConsultContext'
import { Check, Edit, Eye, HatGlasses, Menu, MessageSquareLock, Users } from 'lucide-react'
import { Button } from '../ui/Button'
import { Toggle } from '../ui/Toggle'

export default function SettingsForm() {
  const { currentStep, setValue, watch, setCurrentStep, isSubmitting, trigger } = useFormConsult()
  const isAnonymous = watch("allowAnonymous")
  const isPrivate = watch("privacy")
  const isViewComments = watch("viewComments")

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
        {currentStep === "drafting" ? (
          <>
            {/* Quick Settings Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
              <div className="h-8 w-8 rounded bg-teal-50 flex items-center justify-center">
                <Menu className="h-4 w-4 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Quick Settings</h3>
            </div>

            {/* Private Mode */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold text-gray-900 text-sm">Private Mode</label>
                <Toggle checked={isPrivate === "private"} onChange={(checked) => setValue("privacy", checked ? "private" : "public")} />
              </div>
              <p className="text-xs text-gray-500">
                Only people you invite can view this consultation.
              </p>
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-gray-900 text-sm mb-3">
                How do others respond?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setValue("allowAnonymous", false)}
                  type='button'
                  className={`
                          flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer hover:brightness-105
                          ${!isAnonymous
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 bg-white hover:border-gray-300"}
                        `}
                >
                  <HatGlasses className={`h-5 w-5 mb-2 ${!isAnonymous ? "text-teal-600" : "text-gray-400"}`} />
                  <span className={`text-sm font-medium ${!isAnonymous ? "text-gray-900" : "text-gray-600"}`}>
                    Anonymous
                  </span>
                </button>
                <button
                  onClick={() => setValue("allowAnonymous", true)}
                  type='button'
                  className={`
                          flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer hover:brightness-105
                          ${isAnonymous
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 bg-white hover:border-gray-300"}
                        `}
                >
                  <Users className={`h-5 w-5 mb-2 ${isAnonymous ? "text-teal-600" : "text-gray-400"}`} />
                  <span className={`text-sm font-medium ${isAnonymous ? "text-gray-900" : "text-gray-600"}`}>
                    Registered
                  </span>
                </button>
              </div>
              <div className="flex items-start gap-2 mt-3 p-2 bg-teal-50 rounded-lg">
                <div className="h-4 w-4 rounded-full bg-teal-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-xs text-teal-800">
                  Your identity is safe with us in either mode.
                </p>
              </div>
            </div>

            {/* Knowledge Sharing */}
            <div className="mb-6  border-gray-200 p-2 bg-teal-50/50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                  <MessageSquareLock className="h-5 w-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-gray-900 text-sm">
                      Shared responses
                    </label>
                    <Toggle checked={isViewComments} onChange={(checked) => setValue("viewComments", checked)} />
                  </div>
                  <p className="text-xs text-gray-500">
                    Allow users to view other users{"'"} responses.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Tier */}
            <div className="mb-6">
              <label className="block font-semibold text-gray-900 text-sm mb-3">
                Type of consultation
              </label>
              <select
                disabled
                className="w-full px-3 py-2 border disabled:text-gray-400 disabled:cursor-not-allowed  border-gray-200 rounded-lg text-sm outline-none focus:border-teal-500 transition-colors"
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
            <p className="text-xs text-center text-gray-500 mt-3">
              Step 2 involves confirming details.
            </p>
          </>
        ) : (
          <>
            {/* Summary Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
              <div className="h-8 w-8 rounded bg-teal-50 flex items-center justify-center">
                <Check className="h-4 w-4 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Summary & Settings</h3>
            </div>

            {/* Visibility */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 text-sm">Visibility</h4>
                <button type='button' className="text-xs text-teal-600 hover:underline font-medium">
                  Change
                </button>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <Eye className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Public Profile</p>
                  <p className="text-xs text-gray-500">Visible to all experts</p>
                </div>
              </div>
            </div>

            {/* Access Control */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 text-sm">Access Control</h4>
                <button type='button' className="text-xs text-teal-600 hover:underline font-medium">
                  Change
                </button>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Open Access</p>
                  <p className="text-xs text-gray-500">Not restricted to invite-only</p>
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 text-sm">Community</h4>
                <button type='button' className="text-xs text-teal-600 hover:underline font-medium">
                  Change
                </button>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <MessageSquareLock className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Knowledge Sharing On</p>
                  <p className="text-xs text-gray-500">Responses anonymized for learning</p>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                icon={Check}
                disabled={isSubmitting}
                type='submit'
                className="w-full justify-center disabled:cursor-not-allowed"
              >
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
            <p className="text-xs text-center text-gray-500 mt-4">
              By publishing, you agree to our{" "}
              <a href="#" className="text-teal-600 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
