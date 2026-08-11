import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function DeletionPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Link href="/products/crm-development-company-in-chennai" className="inline-flex items-center gap-2 bg-[#870d23] hover:bg-[#6b0a1c] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to CRM
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Account Deletion Policy – CRM FDM</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p><strong>Application Name:</strong> Fueldigi CRM Sales & Leads</p>
            <p><strong>Developer:</strong> FuelDigi Marketing</p>
          </div>
          
          <section>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Deletion Policy – User Data Removal Steps</p>
            <p className='text-justify mb-3'>Fueldigi respects users' rights to access their personal data. Here, we clarify the Data Deletion Policy, outlining how users can request to delete their data from our platform. </p>
            
            <p className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Request Data Deletion</p>
            <p className='text-justify mb-3'>We also offer the option to delete their personal data at any time via a request process.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Customer support contact form</li>
              <li>Registered official email request</li>
              <li>Account management section</li>
            </ul>
            <p className='text-justify mb-3'>Our support team will review and verify the request before initiating the deletion process.</p>
            <p className="text-xl font-semibold text-gray-900 mt-6 mb-3">Details Eligible for Deletion</p>
            <p className='text-justify mb-3'>Fueldigi deletes the data after verification upon receiving a professional mail request.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personal profile information</li>
              <li>Contact details</li>
              <li>Account-related data</li>
              <li>Stored customer preferences</li>
            </ul>
            <p className='text-justify mb-3'>Our technical team processes deletion from our active database and operational systems.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Deletion Procedure</p>
            <p className='text-justify mb-3'>We analyze the deletion request. Once approved, we start the process, such as:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>User request verification</li>
              <li>Removal of personal information</li>
              <li>Planned removal from backup databases</li>
              <li>Confirmation notification shared with the user.</li>
            </ul>
            <p className='text-justify mb-3'>The complete deletion process takes 7 to 30 working days.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Retention Exceptions</p>
            <p className='text-justify mb-3'>We may retain certain information that may be temporarily required for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Legal compliance</li>
              <li>Financial record upkeep</li>
              <li>Fraud deterrence</li>
              <li>Security investigations</li>
            </ul>
            <p className='text-justify mb-3'>This data is protected under the company's security policies.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Secure Data Removal</p>
            <p className='text-justify mb-3'>These data deletion steps are handled securely to ensure without further issues.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personal data should be removed securely from production servers.</li>
              <li>Restricted access to archived backups</li>
              <li>Team monitoring to confirm complete deletion where applicable</li>
            </ul>
            <p className='text-justify mb-3'>Throughout the process and steps, our team ensured secure protocols.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact for Data Deletion Requests</p>
            <p className='text-justify mb-3'>If our website, application, or services user wishes to remove their personal information, they can contact us via <a href="mailto:info@fueldigi.in" className="text-[#870d23] underline font-semibold">info@fueldigi.in</a> with a proper reason. Then, we analyze the mail information and remove data. The processing will be held and completed as mentioned in the above business days.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
