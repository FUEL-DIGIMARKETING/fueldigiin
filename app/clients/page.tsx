'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import GlassCard from '@/components/GlassCard'
import { Star, Quote } from 'lucide-react'

export default function ClientsPage() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Solutions Inc.',
      role: 'CEO',
      image: 'https://images.unsplash.com/photo-1580982330720-bd5e0fed108b',
      text: 'FuelDigi\'s CRM system transformed how we manage our customer relationships. Sales are up 40% since implementation!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'Wellness Spa Co.',
      role: 'Operations Manager',
      image: 'https://images.pexels.com/photos/5816284/pexels-photo-5816284.jpeg',
      text: 'The spa booking system is a game-changer. Our no-shows dropped by 60% and bookings increased significantly.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      company: 'Global Enterprises',
      role: 'HR Director',
      image: 'https://images.pexels.com/photos/7693710/pexels-photo-7693710.jpeg',
      text: 'Their HRMS solution saved us countless hours. Payroll processing is now completely automated and error-free.',
      rating: 5
    }
  ]

  const clients = [
    'Tech Solutions Inc.',
    'Wellness Spa Co.',
    'Global Enterprises',
    'Digital Marketing Pro',
    'Healthcare Plus',
    'Retail Masters',
    'Finance Group',
    'Education Hub',
    'Manufacturing Co.',
    'Consulting Firm',
    'Real Estate Partners',
    'Food Services Ltd.'
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 parallax-container relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1604011237320-8e0506614fdf)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-brand-primary bg-opacity-90 z-0" />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6" data-aos="fade-up">Our Clients</h1>
          <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Trusted by businesses worldwide to deliver exceptional SaaS solutions.
          </p>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Trusted By Industry Leaders</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <div 
                key={index}
                className="neumorphic p-8 flex items-center justify-center text-center hover:scale-105 transition-transform"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div className="text-lg font-semibold text-gray-700">{client}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">What Our Clients Say</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <GlassCard key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-brand-primary opacity-20" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-20 bg-gradient-to-br from-brand-primary to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-6">Client Success Metrics</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div data-aos="zoom-in">
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-xl">Client Retention Rate</div>
            </div>
            <div data-aos="zoom-in" data-aos-delay="100">
              <div className="text-5xl font-bold mb-2">40%</div>
              <div className="text-xl">Average Productivity Increase</div>
            </div>
            <div data-aos="zoom-in" data-aos-delay="200">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl">Industries Served</div>
            </div>
            <div data-aos="zoom-in" data-aos-delay="300">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-xl">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center" data-aos="zoom-in">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Join Our Growing Family</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Become part of our success story. Let's build something amazing together.
          </p>
          <Button href="/contact" variant="primary">Get Started Today</Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
