'use client'

import { Linkedin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TiltedWrapper from '@/components/TiltedWrapper'

const team = [
  {
    name: 'Pavithra A',
    designation: 'Business Head',
    image: '/assets/pavi.png',
    linkedin: 'https://www.linkedin.com/in/pavithra-thara-0531a521a/',
  },
  {
    name: 'Vijayalakshmi N',
    designation: 'Full Stack Developer',
    image: '/assets/Viji.png',
    linkedin: 'https://www.linkedin.com/in/vijinach1810/',
  },
  {
    name: 'Sudhakar M',
    designation: 'Software Engineer',
    image: '/assets/Sudha_1.png',
    linkedin: 'https://www.linkedin.com/in/sudhakar-m23/',
  },
  {
    name: 'Silambarasan M',
    designation: 'Senior Graphic Designer',
    image: '/assets/Sibu_1.png',
    linkedin: 'https://www.linkedin.com/in/sibu-m-b48006262/',
  },
  {
    name: 'Mahesh B',
    designation: 'Senior SEO Specialist',
    image: '/assets/Mahesh_1.png',
    linkedin: 'https://www.linkedin.com/in/mahesh-babu21/',
  },
  {
    name: 'Aravindh M.P',
    designation: 'Social Media Executive',
    image: '/assets/aravindh.png',
    linkedin: 'https://www.linkedin.com/in/aravindh12',
  },
]

export default function TeamPage() {
  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #870d23 0%, #a91129 60%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 pb-32 flex flex-col md:flex-row items-center gap-10">

          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Meet Our <br /><span className="text-white/70">Talented Team</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              We are a passionate team of innovators, developers, designers, and strategists committed to developing cutting-edge software solutions to address your business challenges. Our areas of specialization include custom software development, web and mobile applications, SaaS solutions, and digital transformation.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-[#870d23] font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started
            </a>
          </div>

          {/* Right - Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="/assets/our_team.png"
              alt="Our Team"
              className="w-full max-w-sm md:max-w-md object-contain drop-shadow-2xl"
            />
          </div>

        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '100px' }}>
            <path d="M0,0 C240,100 480,0 720,60 C960,120 1200,20 1440,60 L1440,100 L0,100 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* CEO Feature Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* Left - About Content */}
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#870d23] uppercase tracking-widest mb-3">Leadership</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
                Driven by Vision, <br /><span className="text-[#870d23]">Building the Future</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
               Harikrishnan S is the visionary leader of FuelDigi. He is passionate about helping businesses grow through innovative digital marketing solutions. With expertise in strategy, technology, and brand development, he has built FuelDigi into a trusted partner for companies looking to strengthen their online presence and achieve real results.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Under his leadership, FuelDigi focuses on creativity, performance, and customer success. His dedication to delivering impactful digital experiences motivates the team and helps brands succeed in an ever-evolving digital world.
              </p>
              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-[#870d23]">5+</p>
                  <p className="text-sm text-gray-500">Years Experience</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-[#870d23]">50+</p>
                  <p className="text-sm text-gray-500">Clients Served</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-[#870d23]">4.9+</p>
                  <p className="text-sm text-gray-500">Ratings</p>
                </div>
              </div>
            </div>

            {/* Right - CEO Image Card */}
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-2xl overflow-hidden shadow-xl" style={{ width: 'min(450px, 100%)', height: 'clamp(280px, 50vw, 460px)' }}>
                <img
                  src="/assets/hk.png"
                  alt="Harikrishnan S"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex items-center justify-between w-full px-2">
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="text-gray-900 text-xl font-bold text-center">Harikrishnan S</h3>
                  <p className="text-[#870d23] text-sm font-medium mt-1 text-center">CEO & Founder</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/hari-krishnan-6127291a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-full shrink-0 ml-3 hover:scale-110 transition-all duration-300 shadow-md"
                  style={{ backgroundColor: '#0A66C2' }}
                  aria-label="Harikrishnan S LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team-section" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          {/* Section heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">The <span className="text-[#870d23]">Minds Behind </span>FuelDigi</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Leading with vision, innovation, and expertise.</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <TiltedWrapper key={member.name}>
                <div className="rounded-3xl overflow-hidden shadow-lg" style={{ background: 'linear-gradient(160deg, #fff7f0 0%, #ffffff 50%, #fde8e8 100%)' }}>

                  {/* Image — reduced height with responsive mobile sizing */}
                  <div style={{ backgroundColor: '#c9967f', borderRadius: '0 0 36px 36px', overflow: 'hidden', height: 'clamp(220px, 32vw, 300px)' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info Row — full width with padding */}
                  <div className="flex items-center justify-between px-6 py-5">
                    <div className="flex-1 min-w-0 pr-4">
                      <h3 className="text-gray-900 text-lg font-bold leading-tight">{member.name}</h3>
                      <p className="text-[#870d23] text-sm font-medium mt-1">{member.designation}</p>
                    </div>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 rounded-full shrink-0 ml-3 hover:scale-110 transition-all duration-300 shadow-md"
                      style={{ backgroundColor: '#0A66C2' }}
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                  </div>

                </div>
              </TiltedWrapper>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Gradient background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#870d23] via-[#a01129] to-white" /> */}
        {/* Glassmorphism overlay */}
        {/* <div className="absolute inset-0 backdrop-blur-sm bg-white/10" /> */}
        {/* Decorative blobs */}
        {/* <div className="absolute top-0 left-0 w-72 h-72 bg-[#870d23] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#870d23]/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" /> */}

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-[#870d23]/70 via-[#a01129] to-white backdrop-blur-md border border-white/30 rounded-3xl px-8 py-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Great Products Start with Great People</h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Meet the team that transforms ideas into powerful digital experiences. Let's create something amazing together.
            </p>
            <a
              href="https://wa.me/918438240280"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#870d23] font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Let's Talk
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

