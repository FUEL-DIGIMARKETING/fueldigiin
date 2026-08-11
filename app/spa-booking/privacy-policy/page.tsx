import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Link href="/products/spa-booking-software-in-chennai" className="inline-flex items-center gap-2 bg-[#870d23] hover:bg-[#6b0a1c] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to SPA
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy - SPA</h1>
        <p className="text-xl text-black font-bold mb-8">River Salon and Day Spa Services Booking App</p>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p className='text-justify'>This page applies to the mobile application “River Salon and Spa - Booking” developed and published by FuelDigi Marketing on Google Play.</p>
          <p className='text-justify'>We protect our clients' privacy and personal information.</p>
          <p className='text-justify'>This policy explains the detailed information on how River Salon and Day Spa's booking app collects, uses, and stores data.</p>
          
          <section>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">1. Information We Collect</p>
            <p className='text-justify mb-4'>Our spa mobile app collects the following major details from our client while after install app for their effective usage.</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Full Name</li>
              <li>Phone Number</li>
              <li>Email Address</li>
              <li>Appointment Booking Details</li>
              <li>Membership Information</li>
              <li>Gift Card Purchase Details</li>
              <li>Location Information - It helps clients to find the nearest branch to get the best services.</li>
              <li>Payment Information - We use a more protective payment gateway.</li>
            </ul>
            <p className='text-justify'>To provide our services efficiently, we collect a few details from our clients.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">2. Purpose of Data Collection</p>
            <p className='text-justify mb-4'>For the following purposes, we collect details from you.</p>
            <ul className="list-disc pl-6 space-y-1 text-justify mb-4">
              <li>To process and manage your service bookings.</li>
              <li>It supports confirming your booking and appointments.</li>
              <li>To manage the membership card's valid period.</li>
              <li>To process gift card purchases.</li>
              <li>To enable secure online payments.</li>
              <li>We service updates, offers, and discounts.</li>
              <li>To enhance customer experience within the app.</li>
            </ul>
            <p className='text-justify'>We don’t sell your personal details for third-party marketing purposes.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">3. Payment Information</p>
            <p className='text-justify mb-4'>We have a trusted and secure payment gateway provider.</p>
            <ul className="list-disc pl-6 space-y-1 text-justify mb-4">
              <li>Our clients' card details are not on our server or cloud.</li>
              <li>The card details are stored securely only on our company database.</li>
              <li>Users have full control to add, manage, or remove saved payment methods at any time from their profile settings.</li>
            </ul>
            <p className='text-justify'>The financial details we collect are only for services booking-related.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">4. Data Storage & Security</p>
            <p className='text-justify mb-4'>We store the data only in our company database. If our clients need to delete their card and personal details, they can do so manually. The data will automatically be removed from our database.</p>
            <ul className="list-disc pl-6 space-y-1 text-justify mb-4">
              <li>Encrypted data transmission</li>
              <li>Restricted internal access</li>
              <li>Regular security monitoring</li>
            </ul>
            <p className='text-justify'>Your data is stored only for service-related usage and operational requirements.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Sharing of Information</p>
            <p className='text-justify'>We do not sell or share your personal information with third-party marketing agencies.</p>
            <p className='text-justify mb-4'>Your data may only be shared:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>We have secure payment gateway providers (for only transaction processing)</li>
              <li>We have authorized internal staff to manage the service.</li>
              <li>If required by law or legal authorities.</li>
            </ul>
            <p className='text-justify'>We may send you company-related offers, promotions, and updates directly from the River Salon and Day Spa contact number.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Membership & Gift Card Policy</p>
            <p className='text-justify mb-4'>Customers can:</p>
            <ul className="list-disc pl-6 space-y-1 text-justify mb-4">
              <li>Enroll in membership programs.</li>
              <li>Purchase and redeem gift cards.</li>
              <li>Manage bookings through their nearest River Day Spa location.</li>
            </ul>
            <p className='text-justify'>Membership details and gift card transactions are securely stored within the app for user convenience.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">7. User Rights</p>
            <p className='text-justify mb-4'>As a user of the River Salon and Day Spa Services Booking App, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 text-justify mb-4">
              <li>Access your personal information.</li>
              <li>Update your profile details.</li>
              <li>Remove saved payment methods.</li>
              <li>Request the deletion of your account.</li>
              <li>Opt out of promotional communications.</li>
            </ul>
            <p className='text-justify'>For any data-related requests, users may contact our support team at</p>
            <p>Email: <a href="mailto:riverdayspa@gmail.com" className="text-primary underline hover:text-black">riverdayspa@gmail.com</a></p>

            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-justify">8. Third-Party Links</p>
            <p className='text-justify'>Our app may contain links to external platforms (such as maps or payment gateways). We are not answerable for the privacy procedures of third-party assistance.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Children’s Privacy</p>
            <p className='text-justify'>Our services are not intended for individuals under the age of 18 without parental supervision. We do not collect any personal data from kids.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Policy Updates</p>
            <p className='text-justify'>River Salon and Day Spa reserves the right to edit or modify this Privacy Policy at any time. Any changes will be updated within the app with the revised practical date.</p>
            <p className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Us</p>
            <p>If you have queries regarding this Privacy Policy, please contact:</p>
            <p>River Salon and Day Spa</p>
            <p>Email: <a href="mailto:riverdayspa@gmail.com" className="text-primary underline hover:text-black">riverdayspa@gmail.com</a></p>
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
