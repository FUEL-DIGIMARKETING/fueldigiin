import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function DeletionPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Link href="/products/hrms-development-services-in-chennai" className="inline-flex items-center gap-2 bg-[#870d23] hover:bg-[#6b0a1c] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to HRMS
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Account Deletion Policy – HRMS FDM</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p><strong>Application Name:</strong> HRMS FDM</p>
            <p><strong>Purpose:</strong> Internal Employee Attendance & HR Management Application</p>
            <p><strong>Developer:</strong> FuelDigi Marketing</p>
          </div>
          
          <section>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Request Account Deletion</p>
            <p>To request deletion of your HRMS FDM account, please follow the steps below:</p>
            
            <p className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step 1</p>
            <p>Send an email request to: <a href="mailto:info@fueldigi.in" className="text-[#870d23] underline">info@fueldigi.in</a></p>
            
            <p className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step 2</p>
            <p>Include the following details in your email to help us verify your identity:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Registered email address</li>
              <li>Employee ID</li>
              <li>Full name</li>
              <li>Reason for account deletion (optional)</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Deletion Timeline</p>
            <p>Upon successful verification of the request, account deletion will be processed within 7 to 14 working days.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data That Will Be Deleted</p>
            <p>The following data will be permanently removed from our systems:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>User account credentials</li>
              <li>Profile information (name, email, phone number, profile photo)</li>
              <li>Attendance records</li>
              <li>Leave and permission records</li>
              <li>Device and login activity information</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data That May Be Retained</p>
            <p>For legal, payroll, audit, or statutory compliance purposes, certain information may be retained for a limited period, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Salary and payroll records</li>
              <li>Financial and audit-related information</li>
            </ul>
            <p className="mt-3">Such retained data will not be accessible to the user and will be handled strictly in accordance with company policies and applicable legal requirements.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important Notes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>All account deletion requests are subject to identity verification</li>
              <li>Once the deletion process is completed, it cannot be reversed</li>
              <li>This application is intended solely for internal company use</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</p>
            <p>For any questions related to account deletion or data privacy, please contact:</p>
            <p><a href="mailto:info@fueldigi.in" className="text-[#870d23] underline font-semibold">info@fueldigi.in</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
