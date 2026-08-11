'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NeumorphicCard from '@/components/NeumorphicCard'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  const features = [
    'Customer and lead management',
    'Sales and operations tracking',
    'Financial and process management',
    'Employee and team management',
    'Reports and analytics',
    'Mobile and web access',
    'Custom modules based on business needs'
  ]

  const customFeatures = [
    'Fully customized features',
    'Business-specific workflow model',
    'Personalized dashboard features',
    'Branding with your logo',
    'Module-based development support',
    'Scalable SaaS architecture'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/hero_banner_3.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-brand-primary bg-opacity-90 z-0" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 4px)',
          backgroundSize: '50px 50px'
        }} />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6" data-aos="fade-up">
            Software Application Development Services in Chennai
          </h1>
          <p className="text-xl lg:text-2xl max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            FuelDigi Marketing
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-10 relative">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #870d23 2px, #870d23 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, #870d23 2px, #870d23 4px)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            <NeumorphicCard data-aos="fade-up">
              <p className="text-lg text-black text-justify leading-relaxed">
                FuelDigi specializes in creating and developing software and mobile applications that seamlessly combine with your workflow and operational processes. We are a technology-driven company yielding bespoke digital products and SaaS solutions. It is tailored to each client's unique business essentials. Our solutions qualify businesses to automate tasks, improve productivity, and obtain better control over their daily operations through smart and user-friendly technology.
              </p>
            </NeumorphicCard>

            <NeumorphicCard data-aos="fade-up" data-aos-delay="100">
              <p className="text-lg text-black text-justify leading-relaxed">
                For modern business solutions, we develop flexible, secure, and scalable platforms for various enterprises. <a href="https://www.fueldigi.in/contact" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200">Fueldigi</a> expects that every organization processes things differently, which is why we approach understanding our customers' goals and needs to provide custom solutions.
              </p>
            </NeumorphicCard>

            <NeumorphicCard data-aos="fade-up" data-aos-delay="200">
              <p className="text-lg text-black text-justify leading-relaxed">
                As a sister concern of FuelDigi.com, we concentrate on delivering flexible, secure, and scalable solutions for <a href="https://www.fueldigi.in/products/crm-development-company-in-chennai" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200">modern businesses</a> across diverse endeavors. Fueldigi believes that every organization operates differently. So only my team takes a consultative approach to understand client goals and challenges. After understanding clients' vision, we build solutions. Our team is dedicated to creating reliable platforms that evolve with business needs and support long-term digital transformation.
              </p>
            </NeumorphicCard>

            <NeumorphicCard data-aos="fade-up" data-aos-delay="300">
              <p className="text-lg text-black text-justify leading-relaxed">
                Whether you require a ready-to-use SaaS platform or a fully customized solution. Our experts offer services according to specifications and branding needs. Our experts provide end-to-end services, including design, development, and deployment, and ongoing maintenance support your clients' needs.
              </p>
            </NeumorphicCard>

            <NeumorphicCard data-aos="fade-up" data-aos-delay="400">
              <p className="text-lg text-black text-justify leading-relaxed">
                Fueldigi products are available in the Google Play Store. We launch the app to handle the staff management <a href="https://play.google.com/store/apps/details?id=com.fdm2025.attendancehrsystem" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200">HRMS app</a>, lead and telecalling handling CRM app, and booking app for spa, salon, restaurants, and more. We are happy to offer services to help businesses lead more innovative technology, continuous improvement, and customer-focused solutions.
              </p>
            </NeumorphicCard>
          </div>
        </div>
      </section>

      {/* Products & Services Section */}
      <section className="py-10 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/28428591/pexels-photo-28428591.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-brand-primary bg-opacity-90 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-6" data-aos="fade-up">
            Fueldigi Smart Business Products & Services
          </h2>
          <p className="text-xl text-center mb-16 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            We deliver cloud-based software solutions that enable businesses automate and manage their daily functions efficiently.
          </p>

          <div className="max-w-7xl mx-auto">
            <p className="text-2xl font-bold mb-8 text-center" data-aos="fade-up" data-aos-delay="200">
              Our solutions are designed to sustain:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  data-aos="zoom-in"
                  data-aos-delay={index * 50}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-white rounded-full" />
                    <p className="text-lg">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assembled Features Section */}
      <section className="py-10 relative">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #870d23 2px, #870d23 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, #870d23 2px, #870d23 4px)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-center mb-6 text-primary" data-aos="fade-left">
              Assembled Features as Per Your Business Needs
            </h3>
            <p className="text-xl text-center mb-16 text-black max-w-3xl mx-auto" data-aos="fade-right" data-aos-delay="100">
              We know each business has different structure ideas, so we don't believe in one-size-fits-all software.
            </p>

            <p className="text-2xl font-bold mb-8 text-center text-gray-900" data-aos="fade-right" data-aos-delay="200">
              FuelDigi experts offer:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customFeatures.map((feature, index) => (
                <NeumorphicCard 
                  key={index}
                  className="hover:scale-105 transition-transform duration-300"
                  data-aos="flip-left"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-black font-medium">{feature}</p>
                  </div>
                </NeumorphicCard>
              ))}
            </div>

            <NeumorphicCard className="mt-12" data-aos="fade-up" data-aos-delay="400">
              <p className="text-lg text-black text-center leading-relaxed">
                Fueldigi experts analyze your necessities and deliver a solution designed exclusively for your business processes.
              </p>
            </NeumorphicCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
