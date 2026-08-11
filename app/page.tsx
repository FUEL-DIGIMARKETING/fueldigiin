'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSlider from '@/components/HeroSlider'
import GlassCard from '@/components/GlassCard'
import NeumorphicCard from '@/components/NeumorphicCard'
import Button from '@/components/Button'
import ParticlesBackground from '@/components/ParticlesBackground'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, Target, Users, Shield, Zap, TrendingUp, Clock, DollarSign, IndianRupee, Settings, Laptop, Headset, Lightbulb, Bolt, Layers } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Target className="w-12 h-12 text-brand-primary" />,
      title: 'Custom-built SaaS Solutions',
      description: 'Tailored software that perfectly fits your business needs and workflows.'
    },
    {
      icon: <Shield className="w-12 h-12 text-brand-primary" />,
      title: 'Cloud-based & Secure',
      description: 'Enterprise-grade security with 99.9% uptime guarantee.'
    },
    {
      icon: <Zap className="w-12 h-12 text-brand-primary" />,
      title: 'Mobile & Web Applications',
      description: 'Access your business tools anywhere, anytime on any device.'
    },
    {
      icon: <IndianRupee className="w-12 h-12 text-brand-primary" />,
      title: 'Affordable Pricing',
      description: 'Flexible pricing plans that scale with your business growth.'
    }
  ]

  const benefits = [
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Automates daily operations' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Improves productivity' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Saves time and cost' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Centralized business data' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Enriches decision-making' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Improves customer delight' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Supports business growth' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Enhances security & data reliability' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Enables anytime access' },
  ]

  const products = [
    {
      name: 'CRM System',
      description: 'Manage customer relationships, track leads, and boost sales with our intelligent CRM platform.',
      image: "/assets/custom-crm-software-development.webp",
      link: '/products/crm-development-company-in-chennai'
    },
    {
      name: 'HRMS',
      description: 'Streamline HR operations, payroll, attendance, and employee management in one place.',
      image: "/assets/hr-software-in-chennai.webp",
      link: '/products/hrms-development-services-in-chennai'
    },
    {
      name: 'Spa Booking',
      description: 'Complete booking management system for spas and wellness centers with online scheduling.',
      image: "/assets/spa-booking-software-in-chennai.webp",
      link: '/products/spa-booking-software-in-chennai'
    }
  ]

  const faqs = [
    {
      question: 'What makes FuelDigi different from other SaaS providers?',
      answer: 'FuelDigi focuses on customization and scalability. Unlike one-size-fits-all solutions, we build software that adapts to your specific business workflows, ensuring maximum efficiency and ROI.'
    },
    {
      question: 'How secure is your cloud platform?',
      answer: 'We implement enterprise-grade security measures including end-to-end encryption, regular security audits, and compliance with industry standards. Your data is backed up daily and stored in secure data centers.'
    },
    {
      question: 'Can I integrate FuelDigi products with my existing tools?',
      answer: 'Yes! Our products come with API integrations and support for popular third-party tools. We can also build custom integrations based on your requirements.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer dedicated 24/7 support through email, chat, and phone. Each client gets a dedicated account manager and access to our comprehensive knowledge base and training resources.'
    },
    {
      question: 'How quickly can I get started?',
      answer: 'After your free demo and consultation, we can have you up and running within 1-2 weeks. This includes setup, data migration, team training, and full deployment.'
    }
  ]

  const schemaData = {
     "@context": "https://schema.org",
  "@graph": [

    {
      "@type": "Organization",
      "@id": "https://www.fueldigi.in/#organization",
      "name": "FuelDigi",
      "url": "https://www.fueldigi.in/",
      "logo": "https://www.fueldigi.in/assets/best-digital-marketing-company-services-chennai-online-fdm.webp",
      "description": "FuelDigi is a SaaS product company offering custom software solutions including CRM, HRMS, and cloud-based business applications.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Door No.S102, Second Floor, Plot No.36, Chandrasekaran Nagar Second Street, Rajiv Gandhi Salai, Thoraipakkam",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600097",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+918754236989",
        "contactType": "customer support",
        "areaServed": "IN",
        "availableLanguage": ["English"]
      },
      "sameAs": [
        "https://www.fueldigi.in/"
      ]
    },


    {
      "@type": "WebSite",
      "@id": "https://www.fueldigi.in/#website",
      "url": "https://www.fueldigi.in/",
      "name": "FuelDigi",
      "publisher": {
        "@id": "https://www.fueldigi.in/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.fueldigi.in/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },


    {
      "@type": "Service",
      "serviceType": "Custom SaaS Software Development",
      "provider": {
        "@id": "https://www.fueldigi.in/#organization"
      },
      "areaServed": {
        "@type": "Place",
        "name": "India"
      },
      "description": "FuelDigi provides custom-built SaaS solutions including CRM systems, HRMS, and cloud-based applications to automate business operations and improve productivity.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Software Solutions",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "CRM Software"
            }
          },

          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "HRMS Software"
            }
          },


          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Spa Booking Software"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom SaaS Development"
            }
          }
        ]
      }
    },


    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.fueldigi.in/"
        }
      ]
    }

  ]
}

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Navbar />
      
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Custom Software Development Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              Software Development Company in Chennai | Fueldigi
            </h1>
            <p className="text-lg text-black">
              FuelDigi gives powerful, custom-made SaaS products and digital solutions created to simplify operations and accelerate your business success. This software implementation will reduce your workload and help you track and analyze work smartly with easy sources.
            </p>
            <p className="text-lg text-black mt-4">
              We build software based on your exact business needs — fully customizable, secure, and scalable.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <NeumorphicCard key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <p className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</p>
                  <p className="text-black">{feature.description}</p>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>

      {/* About FuelDigi Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border-4 border-[#870d23]/60">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right" data-aos-delay="100">
                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
                  <img src="/assets/software-development-company-in-chennai.webp" alt="FuelDigi Team" className="w-full h-full object-contain" />
                </div>
              </div>
              <div data-aos="fade-left" data-aos-delay="200">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-pulse text-primary">About FuelDigi</h2>
                <p className="text-lg mb-4 leading-relaxed text-black text-justify">
                  FuelDigi is a next-generation <a href="https://play.google.com/store/apps/developer?id=Fueldigi+Marketing&hl=en_IN" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200">SaaS product company</a> nourishing customized business software solutions tailored to modern business essentials.
                </p>
                <p className="text-lg mb-4 leading-relaxed text-black text-justify">
                  Fuedigi concentrates on creating flexible, user-friendly software, under the sister concern of FuelDigi.com, that adapts to your workflow rather than forcing you to adapt to software.
                </p>
                <p className="text-lg mb-6 leading-relaxed text-black text-justify">
                  Whether you need a custom-made SaaS product or a fully customized system, we, FuelDigi, build the solutions that grow with your business.
                </p>
                <Button href="/software-application-development-services-in-chennai" variant="glass" className="border-primary hover:scale-110 transition-transform duration-300">
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-primary">Our Products</h3>
            <p className="text-lg text-black max-w-3xl mx-auto">
              Explore our suite of powerful SaaS products designed to transform your business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <NeumorphicCard key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="transition-all duration-300 hover:-translate-y-2 hover:translate-x-2">
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-2xl font-bold mb-3 text-gray-900">{product.name}</p>
                  <p className="text-black mb-4">{product.description}</p>
                  <Button href={product.link} variant="secondary">
                    Learn More
                  </Button>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose FuelDigi Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <p className="text-4xl lg:text-5xl font-bold mb-6 text-primary">Why Choose FuelDigi?</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="neumorphic p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl" data-aos="flip-left">
              <Settings className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <p className="font-semibold text-gray-900 text-lg">Custom-built SaaS solutions</p>
            </div>
            <div className="neumorphic p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl" data-aos="flip-left" data-aos-delay="100">
              <Shield className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <p className="font-semibold text-gray-900 text-lg">Cloud-based & secure platform</p>
            </div>
            <div className="neumorphic p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl" data-aos="flip-left" data-aos-delay="200">
              <Laptop className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <p className="font-semibold text-gray-900 text-lg">Mobile & Web applications</p>
            </div>
            <div className="neumorphic p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl" data-aos="flip-left" data-aos-delay="300">
              <IndianRupee className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <p className="font-semibold text-gray-900 text-lg">Affordable and flexible pricing</p>
            </div>
            <div className="neumorphic p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl" data-aos="flip-left" data-aos-delay="300">
              <TrendingUp className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <p className="font-semibold text-gray-900 text-lg">Scalable architecture</p>
            </div>
            <div className="neumorphic p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl" data-aos="flip-left" data-aos-delay="300">
              <Headset className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <p className="font-semibold text-gray-900 text-lg">Dedicated support team</p>
            </div>
            <div className="neumorphic p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl" data-aos="flip-left" data-aos-delay="300">
              <Lightbulb className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <p className="font-semibold text-gray-900 text-lg">Business-focused design</p>
            </div>
            <div className="neumorphic p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl" data-aos="flip-left" data-aos-delay="300">
              <Bolt className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <p className="font-semibold text-gray-900 text-lg">Trusted sister concern of FuelDigi.com</p>
            </div>
          </div>

          <div className="text-center mt-12" data-aos="fade-up">
            <p className="text-lg text-black max-w-3xl mx-auto">
              Fueldigi doesn't just sell software — we build long-term digital solutions for your business success.
            </p>
          </div>
        </div>
      </section>
      
      {/* Industries We Serve */}
      <section className="relative overflow-hidden bg-white py-10">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Industries We Serve</h2>
        </div>

        <div className="relative w-full overflow-hidden" style={{ height: '420px' }}>

          {/* Scrolling strip */}
          <div className="absolute top-0 flex" style={{ animation: 'industriesScroll 40s linear infinite', width: 'max-content' }}>
            {[1, 2].map((copy) => (
              <div key={copy} className="relative flex-shrink-0 flex items-end" style={{ width: '200vw', height: '420px' }}>
                <img src="/assets/home-industries.png" alt="Industries" className="absolute inset-0 w-full h-full object-cover" />
                {[
                  'Manufacturing',
                  'Restaurant',
                  'Hotel',
                  'Travel & Tourism',
                  'Real Estate',
                  'Education',
                  'IT Company',
                  'Retail',
                ].map((label, i) => (
                  <div key={label} className="absolute flex flex-col items-center" style={{ left: `calc(${i} * 12.5% + 6.25%)`, top: '30px' }}>
                    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                      <svg className="w-4 h-4 text-[#870d23] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="text-[#870d23] font-bold text-sm whitespace-nowrap">{label}</span>
                    </div>
                    <div className="w-0.5 h-5 bg-[#870d23]/60" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Car fixed at bottom left */}
          <div className="absolute flex items-end" style={{ bottom: '12px', left: '40px' }}>
            <div className="relative">
              <img src="/assets/indus-car.png" alt="car" className="h-20 w-auto" style={{ display: 'block' }} />
              <img src="/assets/indus-tyre.png" alt="front tyre" className="absolute animate-tyre" style={{ width: '44px', height: '44px', bottom: '-4px', left: '28px' }} />
              <img src="/assets/indus-tyre.png" alt="back tyre" className="absolute animate-tyre" style={{ width: '44px', height: '44px', bottom: '-4px', right: '28px' }} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Client Benefits Section */}
      <section className="py-10 relative overflow-hidden">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <ParticlesBackground />
        </div>
        
        {/* Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-md bg-white/60 z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <p className="text-3xl lg:text-4xl font-bold mb-6 text-primary">
              How FuelDigi Helps Your Business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-6 neumorphic hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="text-brand-primary flex-shrink-0 animate-bounce">{benefit.icon}</div>
                <p className="text-gray-900 font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h4 className="text-2xl lg:text-3xl font-bold mb-6 text-primary">
              Frequently Asked Questions
            </h4>
          </div>

          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl neumorphic px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-brand-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-black">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 parallax-container relative overflow-hidden bg-white">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1490351267196-b7a67e26e41b)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#870d23] via-[#a50f2a] to-[#870d23] opacity-90 z-0" />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white" data-aos="zoom-in">
          <h5 className="text-xl lg:text-2xl font-bold mb-6">
            Start Your Digital Transformation Today
          </h5>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let FuelDigi power your business with clever SaaS solutions developed just for you. Contact us today for a free consultation and demo.
          </p>
          <p className="text-lg mb-8">
            Discover how customized software can transform your business processes.
          </p>
          <Button href="/contact" variant="glass" className="text-lg px-8 py-4">
            Request Free Demo
          </Button>
          <p className="mt-8 text-xl font-semibold">
            FuelDigi – Smart SaaS Solutions for Smarter Businesses
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
