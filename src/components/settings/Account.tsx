import React from 'react'
import { Button } from '../ui/Button'

export default function Account() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
        <button className="text-cyan-600 text-sm font-medium hover:text-cyan-700">
          Edit Profile
        </button>
      </div>

      <div className="space-y-6">
        {/* Full Name & Professional Title */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">Brief description for your public profile</p>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button variant='primary' className="px-6 py-2 text-sm font-medium rounded-lg hover:bg-cyan-600 transition-colors">
          Save Profile Changes
        </Button>
      </div>
      <hr className="my-8 border-gray-200" />
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Delete Account</h3>
        <p className="text-sm text-gray-600 mb-4">Deleting your account will permanently remove all your data</p>
        <Button variant='outline' className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
          Delete Account
        </Button>
      </div>
    </div>
  )
}
