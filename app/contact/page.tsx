'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import NeumorphicCard from '@/components/NeumorphicCard'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const countryCodes = [
  { code: '+91', country: 'IN', digits: 10, label: '🇮🇳 +91' },
  { code: '+1', country: 'US', digits: 10, label: '🇺🇸 +1' },
  { code: '+44', country: 'GB', digits: 10, label: '🇬🇧 +44' },
  { code: '+61', country: 'AU', digits: 9, label: '🇦🇺 +61' },
  { code: '+971', country: 'AE', digits: 9, label: '🇦🇪 +971' },
  { code: '+65', country: 'SG', digits: 8, label: '🇸🇬 +65' },
  { code: '+60', country: 'MY', digits: 9, label: '🇲🇾 +60' },
  { code: '+94', country: 'LK', digits: 9, label: '🇱🇰 +94' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [countryCode, setCountryCode] = useState('+91')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})

  const selectedCountry = countryCodes.find(c => c.code === countryCode)!

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email) ? '' : 'Please enter a valid email address'
  }

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '')
    if (!phone) return ''
    if (digits.length !== selectedCountry.digits)
      return `Phone number must be ${selectedCountry.digits} digits for ${selectedCountry.country}`
    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '')
      if (digitsOnly.length > selectedCountry.digits) return
      setFormData({ ...formData, phone: digitsOnly })
      setErrors(prev => ({ ...prev, phone: validatePhone(digitsOnly) }))
    } else if (name === 'email') {
      setFormData({ ...formData, email: value })
      setErrors(prev => ({ ...prev, email: validateEmail(value) }))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const emailErr = validateEmail(formData.email)
    const phoneErr = validatePhone(formData.phone)
    if (emailErr || phoneErr) {
      setErrors({ email: emailErr, phone: phoneErr })
      return
    }
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone: `${countryCode} ${formData.phone}` }),
      })
      const result = await response.json()
      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        setErrors({})
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Success Modal */}
      {submitStatus === 'success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setSubmitStatus(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl z-10" onClick={(e) => e.stopPropagation()}>
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
            <p className="text-gray-600 text-lg mb-6">Thank you for submitting the form. We will reach you soon!</p>
            <button
              onClick={() => setSubmitStatus(null)}
              className="bg-brand-primary text-white font-bold px-8 py-3 rounded-2xl hover:bg-[#6b0a1c] transition-all duration-300 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-20 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/28428591/pexels-photo-28428591.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-brand-primary bg-opacity-90 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ready to transform your business? Let's start the conversation.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

            {/* Contact Form */}
            <div>
              <NeumorphicCard>
                <p className="text-3xl font-bold mb-6 text-gray-900">Send Us a Message</p>
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-center">
                    Something went wrong. Please try again or email us directly at info@fueldigi.in
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary neumorphic-inset"
                      placeholder="Your Name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-primary neumorphic-inset ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                      placeholder="you@example.com" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <select
                        value={countryCode}
                        onChange={(e) => { setCountryCode(e.target.value); setFormData(f => ({ ...f, phone: '' })); setErrors(prev => ({ ...prev, phone: '' })) }}
                        className="w-full sm:w-40 px-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white text-sm"
                      >
                        {countryCodes.map(c => (
                          <option key={c.code} value={c.code}>{c.label}</option>
                        ))}
                      </select>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        className={`w-full flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-primary neumorphic-inset ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                        placeholder="Phone Number"
                        maxLength={selectedCountry.digits} />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary neumorphic-inset resize-none"
                      placeholder="Tell us about your project or inquiry..." />
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-[#6b0a1c] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : <><Send className="w-5 h-5" /> Send Message</>}
                  </button>
                </form>
              </NeumorphicCard>
            </div>

            {/* Contact Info */}
            <div>
              <div className="space-y-8">
                <div>
                  <p className="text-3xl font-bold mb-6 text-gray-900">Contact Information</p>
                  <p className="text-lg text-gray-700 mb-8">Have questions? We're here to help. Reach out to us through any of these channels.</p>
                </div>
                <a href="mailto:info@fueldigi.in" className="flex items-start gap-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-lg hover:bg-white/80 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2 text-gray-900">Email Us</p>
                    <p className="text-gray-700">info@fueldigi.in</p>
                  </div>
                </a>
                <a href="tel:+918438240280" className="flex items-start gap-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-lg hover:bg-white/80 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2 text-gray-900">Call Us</p>
                    <p className="text-gray-700">+91 84382 40280</p>
                    <p className="text-gray-700">+91 87542 36989</p>
                    <p className="text-sm text-gray-600">Mon-Sat: 10AM - 6PM IST</p>
                  </div>
                </a>
                <a href="https://maps.google.com/?q=Fueldigi+Marketing+Pvt+Ltd,+Chandrasekaran+Nagar+Second+Street,+Thoraipakkam,+Chennai,+Tamil+Nadu+600097" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-lg hover:bg-white/80 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2 text-gray-900">Visit Us</p>
                    <p className="text-gray-700">Door No.S102, Second Floor, Plot No.36,</p>
                    <p className="text-gray-700">Chandrasekaran Nagar Second Street,</p>
                    <p className="text-gray-700">Rajiv Gandhi Salai, Thoraipakkam,</p>
                    <p className="text-gray-700">Chennai, Tamil Nadu 600097</p>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-4xl font-bold mb-6 text-gray-900">Ready to Get Started?</p>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation and discover how FuelDigi can transform your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="https://play.google.com/store/apps/developer?id=Fueldigi+Marketing&hl=en_IN" variant="secondary">View Products</Button>
          </div>
        </div>
      </section>

      {/* Map Section - Full Width */}
      <div className="w-full h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.7032811521076!2d80.22963469999999!3d12.933296099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b4daabf517%3A0x4fa52672f29a3c93!2sFueldigi%20Marketing%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1774938571810!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <Footer />
    </div>
  )
}
