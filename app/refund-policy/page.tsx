import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 bg-[#870d23] hover:bg-[#6b0a1c] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy – HRMS FDM</h1>
        <p className="text-xl text-black font-bold mb-8"><b>Developer:</b> FuelDigi Marketing</p>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p className='text-justify'>FuelDigi Marketing is committed to maintaining transparency and fairness in all financial transactions made through the HRMS FDM application. This Refund Policy explains the conditions under which refunds may be requested and processed.</p>
          
          <section>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">1. Eligibility for Refund</p>
            <p className='text-justify mb-2'>Payments made for HRMS FDM services, including subscription plans and application usage fees, are generally non-refundable once the service has been activated or accessed.</p>
            <p className='text-justify mb-4'>However, refunds may be considered under the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Duplicate or excess payment due to a technical error</li>
              <li>Payment was deducted, but the service was not activated due to a system failure</li>
              <li>Transaction failure where the amount is debited, but the service is not delivered</li>
              <li>If the customer is not satisfied with the product or service and provides a valid and clear reason for requesting a refund</li>
            </ul>
            <p className='text-justify'>All refund requests must be submitted within 30 days of the transaction date.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">2. Satisfaction-Based Refund Policy</p>
            <p className='text-justify mb-4'>If a customer is not satisfied with the purchased product or service, a refund may be requested, subject to the following conditions:</p>
            <ul className="list-disc pl-6 space-y-1 text-justify mb-4">
              <li>The customer must provide a proper and genuine reason for requesting the refund</li>
              <li>Requests made within <b>15 days</b> from the date of purchase are eligible for a <b>full refund (100%)</b></li>
              <li>Requests made between <b>16 and 30 days</b> from the date of purchase are eligible for a <b>partial refund</b>, where <b>20% of the total amount will be retained by the company</b> as processing and service charges, and the remaining amount will be refunded.</li>
              <li>Refund requests made after <b>30 days</b> from the date of purchase will not be eligible for any refund</li>
            </ul>
            <p className='text-justify'>All such requests are subject to verification and approval by the authorized team.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">3. Non-Refundable Cases</p>
            <p className='text-justify mb-4'>Refunds will not be provided in the following situations:</p>
            <ul className="list-disc pl-6 space-y-1 text-justify mb-4">
              <li>User dissatisfaction after excessive or full usage of the service</li>
              <li>Partial usage of subscription or services beyond the defined refund period</li>
              <li>Change of mind without a valid reason</li>
              <li>Violation of company policies or misuse of the application</li>
              <li>Termination of service due to breach of terms and conditions</li>
            </ul>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">4. Refund Request Procedure</p>
            <p>To request a refund, users must send an email to: <a href="mailto:info@fueldigi.in" className="text-primary underline hover:text-black">info@fueldigi.in</a></p>
            <p className='text-justify'>The request must include:</p>
            <ul className="list-disc pl-6 space-y-1 text-justify mb-4">
              <li>Registered email address</li>
              <li>Employee ID / Organization name</li>
              <li>Transaction ID or payment reference number</li>
              <li>Date of payment</li>
              <li>Clear reason for the refund request</li>
            </ul>
            <p className='text-justify'>All refund requests are subject to identity verification and approval by the authorized team.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Refund Processing Timeline</p>
            <p className='text-justify'>Once a refund request is approved, the refund will be processed within <b>7 to 14 working days</b> through the original mode of payment.</p>
            <p className='text-justify mb-4'>Processing time may vary depending on the user’s bank or payment provider.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cancellation of Services</p>
            <p className='text-justify mb-2'>Service cancellation requests must be submitted in writing via email.</p>
             <p className='text-justify mb-4'>Cancellation does not automatically guarantee a refund unless it meets the eligibility and satisfaction-based refund conditions stated above.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">7. Fraud & Abuse Prevention</p>
            <p className='text-justify mb-4'>FuelDigi Marketing reserves the right to deny refund requests in cases of suspected fraud, misuse, or violation of application policies and terms.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">8. Policy Updates</p>
            <p className='text-justify'>This Refund Policy may be revised from time to time. Any changes will be reflected in the application or communicated by the organization.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Contact Information</p>
            <p className='text-justify'>For refund-related questions or support, please contact:</p>
            <p><b>FuelDigi Marketing</b> - <a href="mailto:info@fueldigi.in" className="text-primary underline hover:text-black">info@fueldigi.in</a></p>
            <p className='font-bold italic text-sm mt-4'>Last Updated : Feb 2026</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
