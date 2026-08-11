import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Link href="/products/hrms-development-services-in-chennai" className="inline-flex items-center gap-2 bg-[#870d23] hover:bg-[#6b0a1c] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to HRMS
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy - HRMS</h1>
        <p className="text-xl text-gray-700 mb-8">Mobile-based Office Attendance & Human Resource Management System</p>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className='text-justify'>HRMS FDM is a mobile-based Office Attendance and Human Resource Management System developed and maintained by FuelDigi Marketing.</p>
          <p className='text-justify'>We are committed to safeguarding the privacy, confidentiality, and security of employee information. This Privacy Policy explains how information is collected, used, stored, and protected when using the HRMS FDM mobile application.</p>
          
          <section>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">1. Information We Collect</p>
            <p className='text-justify'>We collect only the information necessary for HR operations and attendance management.</p>
            <p className="text-xl font-semibold text-gray-900 mt-6 mb-3 text-justify">a) Personal Information</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Employee Name</li>
              <li>Employee ID</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Profile Photo</li>
              <li>User Role (Employee / Intern / HR / Super Admin)</li>
            </ul>
            <p className="text-xl font-semibold text-gray-900 mt-6 mb-3 text-justify">b) Employment & HR Information</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Attendance records (check-in and check-out time)</li>
              <li>Leave and permission details</li>
              <li>Salary and stipend information</li>
              <li>Bank details for salary processing</li>
              <li>Uploaded employee documents (if applicable)</li>
            </ul>
            <p className="text-xl font-semibold text-gray-900 mt-6 mb-3 text-justify">c) Location Information</p>
            <ul className="list-disc pl-6 space-y-1 text-justify">
              <li>GPS location is collected only at the time of attendance check-in and check-out</li>
              <li>Location data is used solely to verify physical office presence</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">2. Purpose of Data Collection</p>
            <p className='text-justify'>The collected information is used exclusively for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1 text-justify">
              <li>Secure user authentication and login</li>
              <li>Attendance monitoring using GPS verification</li>
              <li>Leave and permission management</li>
              <li>Salary calculation and payroll processing</li>
              <li>HR and administrative reporting</li>
              <li>Sending system notifications related to attendance, leave, and salary</li>
              <li>Improving system accuracy and operational efficiency</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">3. Data Access & Visibility</p>
            <ul className="list-disc pl-6 space-y-1 text-justify">
              <li>All employee data is treated as strictly confidential</li>
              <li>Only authorized HR personnel and Super Admin users can access employee records</li>
              <li>Employees can view only their own profile, attendance, leave, and salary information</li>
              <li>Employees cannot access other employees' personal or salary data</li>
              <li>No employee data is visible to the public or external users</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">4. Data Storage & Security</p>
            <ul className="list-disc pl-6 space-y-1 text-justify">
              <li>All data is securely stored using MongoDB Cloud (Atlas)</li>
              <li>Authentication is protected through JWT (JSON Web Tokens)</li>
              <li>User passwords are encrypted and not stored in plain text</li>
              <li>Access control is role-based (Employee, Intern, HR, Super Admin)</li>
              <li>Validation checks are applied for QR code and location verification</li>
              <li>We implement appropriate technical and organizational security measures to protect data against unauthorized access, loss, misuse, or disclosure.</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Sharing</p>
            <p className='text-justify'>We do not sell, rent, or share employee data with third parties.</p>
            <p className='text-justify'>Data is shared internally only:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Between employees and authorized HR / Super Admin users</li>
              <li>For official organizational and HR-related purposes only</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Camera & File Access</p>
            <ul className="list-disc pl-6 space-y-1 text-justify">
              <li>File access is used only for uploading employee documents when required</li>
              <li>Profile photos are uploaded voluntarily by employees</li>
              <li>Images and documents are used strictly for internal identification and HR records</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">7. Location Permissions</p>
            <ul className="list-disc pl-6 space-y-1 text-justify">
              <li>Location access is required only during attendance verification</li>
              <li>The application does not track location in the background</li>
              <li>Location data is not used for marketing or analytics purposes</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">8. Notifications</p>
            <p className='text-justify'>The application may send notifications related to:</p>
            <ul className="list-disc pl-6 space-y-1 text-justify">
              <li>Attendance check-in and check-out</li>
              <li>Leave approval or rejection</li>
              <li>Salary and payroll updates</li>
              <li>System reminders and announcements</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Data Retention</p>
            <ul className="list-disc pl-6 space-y-1 text-justify">
              <li>Employee data is retained for as long as the employee remains associated with the organization</li>
              <li>Data may be retained for legal, audit, or payroll requirements</li>
              <li>Upon employee exit, access to data is restricted and handled in accordance with company policy</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Children's Privacy</p>
            <p className='text-justify'>HRMS FDM is intended only for company employees and interns.</p>
            <p className='text-justify'>It is designed for users aged 13 years and above. We do not knowingly collect personal data from minors.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. User Rights</p>
            <p>Employees have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 text-justify">
              <li>View their personal data</li>
              <li>Request corrections to inaccurate information through HR</li>
              <li>Reset their password securely</li>
            </ul>
            <p className='text-justify'>All data-related requests must be handled through authorized HR or Super Admin users.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Changes to This Privacy Policy</p>
            <p className='text-justify'>This Privacy Policy may be updated periodically. Any changes will be communicated through the application or by the organization.</p>
            <p className='font-bold italic text-sm mt-4'>Last Updated : Feb 2026</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
