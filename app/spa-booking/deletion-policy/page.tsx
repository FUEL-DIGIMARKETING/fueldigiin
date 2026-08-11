import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function DeletionPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Link href="/products/spa-booking-software-in-chennai" className="inline-flex items-center gap-2 bg-[#870d23] hover:bg-[#6b0a1c] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to SPA
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Account Deletion Policy</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-4"><strong>River Salon and Day Spa Services Booking App</strong></p>
            <p className="mb-2">This page applies to the mobile application “River Salon and Spa - Booking” developed and published by FuelDigi Marketing on Google Play.</p>
            <p>River Salon and Day Spa respects user privacy. We provide a clear method for data deletion. The Account Deletion Policy summarizes the method for users to request the deletion of their account and associated personal data from the River Salon and Day Spa Services Booking App.</p>
          </div>
          
          <section>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Request Account Deletion</p>
            <p className="mb-2">If users request account deletion by sending an email to:</p>
          <p className="mb-2"><a href="mailto:riverdayspa@gmail.com" className="text-[#870d23] underline">riverdayspa@gmail.com</a></p>
            <p className="mb-2">The email request must contain the following details for verification:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>Registered full name</li>
              <li>Registered mobile number or email address</li>
              <li>Reason for account deletion (optional)</li>
              <li>Reason for account deletion (optional)</li>
            </ul>
            <p>All requests are subject to verification before processing.</p>
             <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data That Will Be Deleted</p>
            <p className="mb-4">The following data will be permanently deleted from our system within 7–14 working days upon successful verification and approval of the request from the customer side.</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>User account credentials</li>
              <li>Personal information (name, phone number, email address)</li>
              <li>Appointment booking history</li>
              <li>Membership details</li>
              <li>Gift card information (if applicable)</li>
              <li>Saved payment methods (if any)</li>
              <li>Device and login activity data</li>
            </ul>
            <p>Once deleted, this data cannot be recovered.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data That May Be Retained</p>
            <p className="mb-2">The following data may be retained for a limited period as required by law for legal, financial, or operational compliance.</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>Transaction and payment records</li>
              <li>Invoice and billing information</li>
              <li>Records required for audit or regulatory purposes</li>
            </ul>
            <p>The user data is retained securely and easily accessible by them.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Processing Timeline</p>
            <p className="mb-2">Account deletion requests will be processed within <b>7 to 14 working days</b> after verification.</p>
            <p>Once the deletion process has compleet our users will get a confirmation email.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important Notes</p>
             <ul className="list-disc pl-6 space-y-1">
              <li>Account deletion is irreversible once completed.</li>
              <li>Active appointments, memberships, or gift cards should be used or canceled before requesting deletion.</li>
              <li>If identity verification fails, the user's requests may be rejected.</li>
              <li>Deletion of the account process will result in loss of access to all services and data.</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children’s Privacy</p>
            <p>River Salon and Day Spa does not intentionally collect personal data from minors under the age of 18. If such data is identified in our database, it will be deleted immediately upon notification.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Policy Updates</p>
            <p>The company has the right to modify or update the deletion policy, which will be revised, so our user are able to analyze the page based on the policy before requesting their secure and safe information. River Salon and Day Spa will be communicated through the app or official page.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</p>
            <p className="mb-2">For account deletion or data-related queries, please contact:</p>
            <p className="font-bold mb-2">River Salon and Day Spa</p>
            <p>Email : <a href="mailto:riverdayspa@gmail.com" className="text-[#870d23] underline font-semibold">riverdayspa@gmail.com</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
