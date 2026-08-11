'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import NeumorphicCard from '@/components/NeumorphicCard'
import { ArrowRight, Mail, Zap, BarChart3, FactoryIcon } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const whyChoose = [
  'FuelDigi email infrastructure supports reputation with an SMTP provider.',
  'It supports delivery providers for rebuilding campaigns or maintaining marketing workflows.',
  'We offer email delivery services via Amazon SES, SMTP, or cloud providers.',
  'Easy access to an intuitive drag-and-drop editor, reusable templates, and AI-assisted content generation.',
  'Real-time analytics on deliveries, opens, clicks, conversions, bounce rates, unsubscribe trends, and engagement metrics.',
  'It contains segments, advanced filters, behavioral data, demographics, custom attributes, and engagement history.',
  'Marketing automation responds to subscriber actions, engagement levels, purchases, or custom events.',
]

const benefits = [
  {
    number: '01',
    title: 'Bulk Email Marketing Software',
    desc: 'Flexible Email Delivery Infrastructure provides you complete freedom over how your emails are delivered. It helps organizations maintain ownership of their sender reputation while optimizing delivery costs and scalability.',
    items: ['Amazon SES', 'SendGrid', 'Custom SMTP Servers', 'Business Mail Servers', 'Cloud Email Providers', 'Private Email Infrastructure'],
  },
  {
    number: '02',
    title: 'Subscriber Management',
    desc: 'Easily manage your subscriber data accurately, organized, and ready for personalized campaigns, and maintain a clean and organized audience database.',
    items: ['Contact lists', 'Custom characteristics', 'Tags', 'Subscription preferences', 'Import/export tools', 'Consent management', 'Unsubscribe handling'],
  },
  {
    number: '03',
    title: 'AI-Powered Campaign Creation',
    desc: 'With our tool, spend less time writing and more time optimizing campaign performance; easily accelerate your marketing workflow using built-in AI capabilities.',
    items: ['Email subject content', 'Campaign content alignment', 'Marketing content copy', 'Call-to-action suggestions', 'Personalized messaging', 'Email variations', 'Content advancements'],
  },
  {
    number: '04',
    title: 'Advanced Marketing Automation',
    desc: 'In our tool, automation helps your marketing around the clock while delivering timely results. The features automate customer journeys that hold your audience engaged throughout their lifecycle.',
    items: ['Welcome email sequence', 'Lead campaigns', 'Customer onboarding', 'Re-engagement campaigns', 'Cart reminders', 'Product recommendations', 'Promotional emails', 'Subscription renewals', 'Follow-up sequences', 'Behavioral email triggers'],
  },
  {
    number: '05',
    title: 'Smart Audience Segmentation',
    desc: 'Fueldigi Campaigns run with smarter targeting lead to higher open rates, increased click-through rates, and better campaign performance in delivering the right message to the right audience at the right time.',
    items: ['Demographics', 'Geographic location', 'Email engagement', 'Asset behavior', 'Website activity', 'Custom fields', 'Tags', 'Subscription choices', 'Customer lifecycle phase'],
  },
  {
    number: '06',
    title: 'Drag-and-Drop Email Builder',
    desc: "This method helps create professional email campaigns in minutes without writing code. Whether you're sending business email, newsletters, promotional campaigns, product announcements, transactional messages, or event invitations, the AI-supported editor makes campaign creation unique.",
    items: ['Create responsive email templates', 'Visual drag-and-drop editor', 'Reusable content blocks', 'Brand customization', 'Mobile-friendly designs', 'Rich media support', 'CTA components', 'HTML editing when needed', 'AI-assisted content generation'],
  },
  {
    number: '07',
    title: 'Infrastructure Ownership Matters',
    desc: 'FuelDigi Campaigns tool empowers organizations to maintain full control while profiting from a modern marketing automation email marketing software platform. Owning your email delivery infrastructure provides important long-term advantages for finding customers.',
    items: ['Greater power over sender reputation', 'Lower operational costs', 'Enhanced deliverability', 'Easier provider migration', 'Flexible scaling', 'Better adherence management', 'Decreased dependence on proprietary platforms', 'Long-term business continuity'],
  },
  {
    number: '08',
    title: 'Real-Time Reporting & Analytics',
    desc: 'You make data-driven decisions to continuously improve campaign performance and measure campaign success with extensive reporting dashboards.',
    items: ['Delivery rate', 'Open rate', 'Click-through rate', 'Bounce rate', 'Spam complaints', 'Unsubscribes', 'Link performance', 'Device insights', 'Geographic engagement', 'Subscriber growth', 'Campaign comparisons'],
  },
  {
    number: '09',
    title: 'Designed for Growing Businesses',
    desc: "FuelDigi Campaigns adapts to organizations of every size. You can easily access it for your business email delivery process, whether you're sending thousands or millions of emails; the platform scales with your business.",
    items: ['SaaS Companies', 'Digital Marketing Agencies', 'eCommerce Stores', 'Educational Institutions', 'Healthcare Organizations', 'B2B Businesses', 'Startups', 'Enterprises', 'Nonprofits', 'Membership Platforms'],
  },
  {
    number: '10',
    title: 'Campaign Scheduling',
    desc: 'In email software, plan campaigns and deliver messages at the optimal time, and coordinate marketing initiatives with confidence.',
    items: ['Primary sending', 'Scheduled campaigns', 'Regular campaigns', 'Time zone scheduling', 'Draft management', 'Campaign approvals'],
  },
]

const industries = [
  'SaaS Companies', 'Digital Marketing Agencies', 'E-Commerce',
  'Educational Institutions', 'Healthcare Organizations', 'B2B Businesses',
  'Startups', 'Enterprises', 'Membership Platforms',
]

export default function EmailMarketingPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary bg-opacity-92 z-0" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 4px)',
          backgroundSize: '50px 50px',
        }} />

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" data-aos="fade-up">
            Email Marketing Software:<br />
            <span className="text-yellow-300"> Bulk Email Campaign</span> and Automated
          </h1>
          <p className="text-lg mb-5 text-white/75" data-aos="fade-up" data-aos-delay="150">
            <i>Email Marketing in Chennai: Campaign Automation Solution to Turn Your Subscribers into Customers</i>
          </p>
          <p className="text-lg mb-10 text-white/75" data-aos="fade-up" data-aos-delay="150">
            Your Own Infrastructure Now in Your Hands: Build, Send, Automate, and Scale up your email campaigns and take full control.
          </p>
          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            <a href="https://campaigns.fueldigi.in/login" target="_blank" rel="noopener noreferrer" className="bg-white text-brand-primary font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Start Free Today
            </a>
            <button
              onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-brand-primary transition-all duration-300"
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* About + Challenges Section */}
      <section className="pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #870d23 2px, #870d23 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, #870d23 2px, #870d23 4px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="container mx-auto px-4 relative z-10">
          {/* Row 1: Text left, Image right */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto mb-8 lg:mb-12">
            <div data-aos="fade-right">
              <p className="text-black text-lg leading-relaxed mb-5 text-justify">
                Find the AI-powered FuelDigi Campaign, an email marketing platform now in Chennai. It gives businesses complete control over creating, delivering, and optimizing email campaigns. The tool allows you to send via your preferred email delivery provider and offers powerful marketing features, including automation, campaign management, scheduled campaigns, audience segmentation, email automation, email templates, drag-and-drop email builder, welcome email, email personalization, campaign analytics, email reports, open rate tracking, click rate tracking, and real-time analytics. This unified platform enriches your business development support.
              </p>
              <p className="text-black text-lg leading-relaxed text-justify">
                FuelDigi Campaigns works for any kind of business, from <b>start-ups to large-scale companies such as agencies, SaaS companies, eCommerce businesses, enterprise marketing teams, and other industries or enterprises</b>. Our marketing team, FuelDigi Campaigns, helps you build your email ecosystem without renouncing ease of use or interpretation.
              </p>
            </div>

            <div className="relative" data-aos="fade-left">
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl" />
              <div className="relative bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-3xl p-2 shadow-2xl">
                <img
                  src="/assets/email-campaign.webp"
                  alt="FuelDigi Email Marketing Software"
                  className="w-full h-auto rounded-2xl object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">✉</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Platform</p>
                    <p className="text-sm font-bold text-gray-900">FuelDigi Campaigns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Row 2: Challenges — Image left, content right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            {/* Left: visual card */}
            <div className="relative order-2 lg:order-1" data-aos="fade-right">
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl" />
              <div className="bg-gradient-to-br from-gray-800 to-[#870d23] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                <p className="text-2xl font-bold text-white mb-2">Email Marketing Tool</p>
                <p className="text-sm text-white mb-4">The highest ROI marketing channels, but many organizations face limitations when using traditional email marketing platforms.</p>
                <p className="text-2xl font-bold text-white mb-6">Common challenges:</p>
                <ul className="space-y-3">
                  {[
                    'Expensive pricing for subscriber growth',
                    'Vendor-controlled sending infrastructure',
                    'Limited flexibility for SMTP configuration',
                    'Restrictions on sending volumes',
                    'Difficult migration between providers',
                    'Poor visibility into deliverability',
                    'Limited automation capabilities',
                    'Lack of ownership over email infrastructure',
                  ].map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 border border-red-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs font-bold">✕</span>
                      </div>
                      <span className="text-white/85 text-sm leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-yellow-300 text-sm font-semibold">
                    When your marketing platform controls your email delivery, your business becomes dull, so we launch FuelDigi Campaigns to avoid these limitations.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: text */}
            <div className="order-1 lg:order-2" data-aos="fade-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                Email Marketing Company in Chennai: The <span className="text-brand-primary">FuelDigi Email Campaigns</span> Tool
              </h2>
              <p className="text-lg text-black text-justify leading-relaxed">
                FuelDigi Campaigns was built to enrich your business more widely. Our platform separates <b>campaign management</b> from <b>email delivery</b>. Instead of forcing businesses into a closed ecosystem, we are giving organizations complete ownership of their sending infrastructure while providing enterprise-grade marketing automation tools to make it right, with flexibility, reputation, and more under control.
              </p>
              <p className="text-lg text-black text-justify leading-relaxed mt-4">
                  Our forum combines campaign creation, automation, subscriber management, segmentation, analytics, AI-powered content generation(AI), and SMTP integrations into one reflexive workspace.
                </p>
            </div>
          </div>
          <div className="max-w-5xl mx-auto space-y-6 mt-12">
            <p className="text-3xl font-bold text-center mb-8 text-gray-900" data-aos="fade-up">
              Why Marketing Teams Choose FuelDigi Campaigns
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {whyChoose.map((item, i) => (
                <NeumorphicCard
                  key={i}
                  className="hover:scale-105 transition-transform duration-300"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <p className="text-black leading-relaxed">{item}</p>
                  </div>
                </NeumorphicCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/28428591/pexels-photo-28428591.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-brand-primary bg-opacity-92 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-4" data-aos="fade-up">
            Benefits of Email Marketing Automation
          </h3>
          <p className="text-xl text-center mb-14 text-white/80 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Everything you need to build, send, and scale your email marketing — all in one platform.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                data-aos="zoom-in"
                data-aos-delay={i * 60}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-black text-yellow-300 leading-none">{b.number}</span>
                  <p className="text-lg font-bold leading-tight">{b.title}</p>
                </div>
                <p className="text-white/75 text-sm mb-4 leading-relaxed">{b.desc}</p>
                <ul className="space-y-1.5">
                  {b.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/90">
                      <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #870d23 2px, #870d23 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, #870d23 2px, #870d23 4px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-2xl font-bold text-center mb-4 text-primary" data-aos="fade-up">
            Designed for Growing Businesses
          </p>
          <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            FuelDigi Campaigns adapts to organizations of every size — from thousands to millions of emails.
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="bg-white border-2 border-brand-primary/20 rounded-full px-6 py-3 text-brand-primary font-semibold hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-105 shadow-md cursor-default"
                data-aos="zoom-in"
                data-aos-delay={i * 60}
              >
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — CRM-style curved */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#870d23] via-[#a01129] to-[#6b0a1c]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMlMwIDIyLjYyNyAwIDE2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        </div>

        {/* Top wave */}
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full absolute top-0 left-0">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#f9fafb" />
        </svg>

        <div className="container mx-auto px-4 relative z-10 mt-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <div className="flex items-center gap-2">
                  <FactoryIcon className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Best Email Marketing Company in Chennai</span>
                </div>
              </div>
            </div>
            <h4 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
              Ready to Own Your Bulk Email Sender?
            </h4>
            <p className="text-xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto">
              Whether you're launching your first newsletter or managing enterprise-scale campaigns, FuelDigi Campaigns gives you the flexibility, automation, and infrastructure ownership needed to grow with confidence.
            </p>
            <p className="text-lg text-white/75 mb-12 max-w-2xl mx-auto">
              Take control, improve deliverability, lower costs, and build stronger customer relationships — all from one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://campaigns.fueldigi.in/register"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white hover:bg-gray-100 text-[#870d23] font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/30 flex items-center gap-3"
              >
                <span className="text-lg">Start Your 14 Days Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="https://meetings.fueldigi.in/"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-[#870d23] text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Book a Demo
              </a>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <Mail className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white mb-1">Bulk Send</p>
                <p className="text-white/80 text-sm">Your Own Infrastructure</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <Zap className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white mb-1">100%</p>
                <p className="text-white/80 text-sm">Automated Campaigns</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <BarChart3 className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white mb-1">Real-Time</p>
                <p className="text-white/80 text-sm">Analytics & Reports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full absolute bottom-0 left-0">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#870d23" />
        </svg>
      </section>
    </div>
  )
}
