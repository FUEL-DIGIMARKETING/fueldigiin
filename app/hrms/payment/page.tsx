'use client'

import { useState } from 'react'
import {
  ArrowLeft, Building2, Mail, Phone, User, CheckCircle,
  Loader2, Users, Briefcase, MapPin, AlertCircle, Info,
  ArrowRight, Shield, Zap, Star, LogOut, CreditCard, Calendar,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

declare global { interface Window { Razorpay: any } }

const API = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://hrmssaas.fdmcrm.in'
const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''

// ── Plan definitions ──────────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'BASIC', name: 'Basic Plan',
    monthlyPrice: 5000, yearlyPrice: 52800, yearlyOriginal: 60000,
    icon: Shield, color: '#3b82f6', popular: false,
    description: 'Essential HR tools for growing teams',
    defaultFeatures: ['Employee Records', 'Complaints', 'Calendar', 'Add Employee', 'Checkout Request', 'Monthly Attendance Tracking', 'Attendance Record', 'Role Management'],
    planFeatures: ['Apply Leave', 'Holidays', 'Approval Requests', 'Today Attendance'],
  },
  {
    id: 'PRO', name: 'Pro Plan',
    monthlyPrice: 7000, yearlyPrice: 73920, yearlyOriginal: 84000,
    icon: Zap, color: '#870d23', popular: true,
    description: 'Full HR suite with payroll & reports',
    defaultFeatures: ['Employee Records', 'Complaints', 'Calendar', 'Add Employee', 'Checkout Request', 'Monthly Attendance Tracking', 'Attendance Record', 'Role Management'],
    planFeatures: ['Apply Leave', 'Holidays', 'Approval Requests', 'Today Attendance', 'Salary Management', 'Payslip Download', 'My Reports', 'Global Updater', 'Work From Home'],
  },
  {
    id: 'ENTERPRISE', name: 'Enterprise Plan',
    monthlyPrice: 10000, yearlyPrice: 105600, yearlyOriginal: 120000,
    icon: Star, color: '#7c3aed', popular: false,
    description: 'Complete enterprise HR platform',
    defaultFeatures: ['Employee Records', 'Complaints', 'Calendar', 'Add Employee', 'Checkout Request', 'Monthly Attendance Tracking', 'Attendance Record', 'Role Management'],
    planFeatures: ['Apply Leave', 'Holidays', 'Approval Requests', 'Today Attendance', 'Salary Management', 'Payslip Download', 'My Reports', 'Global Updater', 'Work From Home', 'Daily Work Updates', 'Employee Overview', 'Overtime'],
  },
]

const PLAN_ORDER = ['BASIC', 'PRO', 'ENTERPRISE']
const YEARLY_DISCOUNT = 12 // percent

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n: number) => '₹' + n.toLocaleString('en-IN')

const getPrice = (plan: typeof PLANS[0], interval: 'monthly' | 'yearly') =>
  interval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice

const getMonthlyEquiv = (plan: typeof PLANS[0]) =>
  Math.round(plan.yearlyPrice / 12)

const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if ((window as any).Razorpay) return resolve(true)
    const existing = document.querySelector('script[src*="checkout.razorpay"]')
    if (existing) {
      existing.addEventListener('load', () => resolve(true))
      existing.addEventListener('error', () => resolve(false))
      return
    }
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })

// ── Small UI components ───────────────────────────────────────────────────────
function ErrorBox({ msg }: { msg: string }) {
  if (!msg) return null
  return (
    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mt-3">
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <p className="text-red-700 text-sm font-medium">{msg}</p>
    </div>
  )
}

function InfoBox({ msg, color = 'blue' }: { msg: string; color?: string }) {
  const map: any = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800',
  }
  return (
    <div className={`flex items-start gap-3 border rounded-lg p-4 ${map[color]}`}>
      <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="text-sm font-medium">{msg}</p>
    </div>
  )
}

function Field({ label, icon: Icon, children }: { label: string; icon?: any; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />}
        {children}
      </div>
    </div>
  )
}

const inputCls = (hasIcon = true) =>
  `w-full ${hasIcon ? 'pl-10' : 'px-4'} pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent text-gray-900`

// ── Subscription period progress bar ────────────────────────────────────────
function SubscriptionProgressBar({ currentStart, currentEnd, planInterval }: {
  currentStart: string
  currentEnd: string
  planInterval: string
}) {
  const start = new Date(currentStart).getTime()
  const end = new Date(currentEnd).getTime()
  const now = Date.now()

  const totalDays = Math.round((end - start) / 86400000)
  const daysUsed = Math.round((now - start) / 86400000)
  const daysLeft = Math.max(0, Math.round((end - now) / 86400000))
  const pct = Math.min(100, Math.max(0, Math.round((daysUsed / totalDays) * 100)))
  const remaining = 100 - pct

  // Color thresholds based on % remaining
  let barColor = '#10b981'   // green  > 50%
  let bgColor  = '#dcfce7'
  let label    = 'Good'
  let emoji    = '🟢'
  if (remaining <= 10) {
    barColor = '#ef4444'; bgColor = '#fee2e2'; label = 'Critical'; emoji = '🔴'
  } else if (remaining <= 25) {
    barColor = '#f97316'; bgColor = '#ffedd5'; label = 'Expiring Soon'; emoji = '🟠'
  } else if (remaining <= 50) {
    barColor = '#eab308'; bgColor = '#fef9c3'; label = 'Halfway'; emoji = '🟡'
  }

  const endDate = new Date(currentEnd).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="px-6 py-4 border-t border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">Billing Period</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: bgColor, color: barColor }}>
          {emoji} {label}
        </span>
      </div>

      {/* Progress track */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>

      {/* Labels below bar */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400">
          {daysUsed} day{daysUsed !== 1 ? 's' : ''} used
        </span>
        <span className="text-xs font-bold" style={{ color: barColor }}>
          {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
        </span>
      </div>

      {/* Renews on */}
      <div className="mt-2 flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs text-gray-500">
          {planInterval === 'yearly' ? 'Annual' : 'Monthly'} plan renews on <strong>{endDate}</strong>
        </span>
      </div>
    </div>
  )
}

// ── Billing toggle component ──────────────────────────────────────────────────
function BillingToggle({
  interval, onChange,
}: {
  interval: 'monthly' | 'yearly'
  onChange: (v: 'monthly' | 'yearly') => void
}) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <span className={`text-sm font-semibold ${interval === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>
        Monthly
      </span>
      <button
        onClick={() => onChange(interval === 'monthly' ? 'yearly' : 'monthly')}
        className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
          interval === 'yearly' ? 'bg-[#870d23]' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
            interval === 'yearly' ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm font-semibold ${interval === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>
        Yearly
      </span>
      {interval === 'yearly' && (
        <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200">
          Save {YEARLY_DISCOUNT}%
        </span>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [activeTab, setActiveTab] = useState<'existing' | 'new'>('existing')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly')

  const [companyData, setCompanyData] = useState({
    companyId: '', companyName: '', companyEmail: '',
    phone: '', contactPerson: '', employeeCount: '',
    industry: '', address: '',
  })

  const [verifiedCompany, setVerifiedCompany] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState('PRO')
  const [newCompanyId, setNewCompanyId] = useState('')

  const [migrationNewId, setMigrationNewId] = useState('')
  const [migrating, setMigrating] = useState(false)
  const [migrationError, setMigrationError] = useState('')

  const [planChanging, setPlanChanging] = useState(false)
  const [planChangeSuccess, setPlanChangeSuccess] = useState(false)
  const [oldPlanName, setOldPlanName] = useState('')
  const [oldPlanInterval, setOldPlanInterval] = useState('')

  const currentPlan = verifiedCompany?.company?.subscription?.plan_name || null
  const currentInterval = verifiedCompany?.company?.subscription?.plan_interval || 'monthly'
  const isDemoCompany = verifiedCompany?.company?.companyType === 'DEMO'
  const isPaidCompany = verifiedCompany?.company?.companyType === 'PAID'
  const currentPlanIndex = PLAN_ORDER.indexOf(currentPlan || '')
  const selectedPlanIndex = PLAN_ORDER.indexOf(selectedPlan)
  const isDowngrade = selectedPlanIndex < currentPlanIndex && currentPlanIndex !== -1
  const isSamePlan = selectedPlan === currentPlan && billingInterval === currentInterval

  const handleVerifyCompany = async () => {
    setError('')
    if (!companyData.companyId.trim()) { setError('Company ID is required'); return }
    if (!companyData.companyEmail.trim()) { setError('Company email is required'); return }
    if (!companyData.contactPerson.trim()) { setError('Contact person is required'); return }
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/subscription/verify-company`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: companyData.companyId.trim().toUpperCase(),
          companyEmail: companyData.companyEmail,
          phone: companyData.phone,
          contactPerson: companyData.contactPerson,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setVerifiedCompany(data)
        if (data.company?.subscription?.plan_name) setSelectedPlan(data.company.subscription.plan_name)
        if (data.company?.subscription?.plan_interval) setBillingInterval(data.company.subscription.plan_interval)
        setStep(2)
      } else {
        setError(data.message || 'Company verification failed. Check your Company ID and email.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterAndSubscribe = async () => {
    setError('')
    if (!companyData.companyName.trim()) { setError('Company name is required'); return }
    if (!companyData.contactPerson.trim()) { setError('Contact person name is required'); return }
    if (!companyData.companyEmail.trim() || !companyData.companyEmail.includes('@')) { setError('A valid email address is required'); return }
    if (!companyData.phone.trim()) { setError('Phone number is required'); return }
    if (!companyData.employeeCount.trim()) { setError('Number of employees is required'); return }
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/company/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: companyData.companyName,
          contactName: companyData.contactPerson,
          email: companyData.companyEmail,
          phone: companyData.phone,
          employeeCount: parseInt(companyData.employeeCount),
          industry: companyData.industry,
          address: companyData.address,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setNewCompanyId(data.companyId)
        setVerifiedCompany({
          isNew: true,
          suggestedCompanyId: data.companyId,
          companyData: { companyId: data.companyId, companyName: companyData.companyName, companyEmail: companyData.companyEmail },
        })
        setStep(2)
      } else {
        setError(data.message || 'Registration failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const triggerDemoMigration = async (
    demoId: string,
    razorpay_payment_id: string,
    razorpay_subscription_id: string,
    razorpay_signature: string,
  ) => {
    setMigrating(true)
    setMigrationError('')
    try {
      const res = await fetch(`${API}/api/subscription/migrate-after-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoCompanyId: demoId,
          plan: selectedPlan,
          razorpay_payment_id,
          razorpay_subscription_id,
          razorpay_signature,
        }),
      })
      const data = await res.json()
      if (data.success) setMigrationNewId(data.newClientCode)
      else setMigrationError(data.message || 'Migration failed. Please contact support.')
    } catch {
      setMigrationError('Network error during migration. Contact support with your payment details.')
    } finally {
      setMigrating(false)
    }
  }

  const openRazorpay = async (
    subscriptionId: string,
    onSuccess: (response: { razorpay_payment_id: string; razorpay_subscription_id: string; razorpay_signature: string }) => Promise<void>,
    onCancel: () => void,
  ) => {
    const loaded = await loadRazorpayScript()
    if (!loaded) { setError('Failed to load Razorpay checkout. Check your internet connection.'); return false }
    if (!RAZORPAY_KEY) { setError('Razorpay key not configured. Please contact support.'); return false }
    const cId = verifiedCompany?.company?.companyId || newCompanyId
    const options = {
      key: RAZORPAY_KEY,
      subscription_id: subscriptionId,
      name: 'FuelDigi HRMS',
      description: `${selectedPlan} Plan — ${billingInterval === 'yearly' ? 'Yearly' : 'Monthly'} Subscription`,
      image: 'https://www.fueldigi.in/favicon.ico',
      handler: async (response: { razorpay_payment_id: string; razorpay_subscription_id: string; razorpay_signature: string }) => {
        await onSuccess(response)
      },
      prefill: {
        name: companyData.contactPerson || verifiedCompany?.company?.contactPerson || '',
        email: companyData.companyEmail || verifiedCompany?.company?.companyEmail || '',
        contact: companyData.phone || verifiedCompany?.company?.phone || '',
      },
      notes: { companyId: cId, planName: selectedPlan, planInterval: billingInterval },
      theme: { color: '#870d23' },
      modal: { ondismiss: onCancel },
    }
    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', (response: any) => {
      onCancel()
      setError(`Payment failed: ${response.error?.description || 'Unknown error'}. Please try again.`)
    })
    rzp.open()
    return true
  }

  const handlePayment = async () => {
    setError('')
    setLoading(true)
    try {
      const cId = verifiedCompany?.company?.companyId || newCompanyId
      const res = await fetch(`${API}/api/subscription/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: cId,
          companyData: verifiedCompany?.isNew ? verifiedCompany.companyData : null,
          planName: selectedPlan,
          planInterval: billingInterval,
        }),
      })
      const data = await res.json()
      if (!data.success) { setError(data.message || 'Failed to create subscription order'); setLoading(false); return }
      const opened = await openRazorpay(
        data.subscription_id,
        async (response) => {
          if (isDemoCompany && verifiedCompany?.company?.companyId) {
            await triggerDemoMigration(
              verifiedCompany.company.companyId,
              response.razorpay_payment_id,
              response.razorpay_subscription_id,
              response.razorpay_signature,
            )
          }
          setStep(3)
        },
        () => { setLoading(false); setError('Payment was cancelled. You can try again anytime.') },
      )
      if (opened) setLoading(false)
    } catch {
      setError('Payment initiation failed. Please try again.')
      setLoading(false)
    }
  }

  const handlePlanChange = async () => {
    if (isSamePlan) { setError('You are already on this plan and billing cycle.'); return }
    setError('')
    setPlanChanging(true)
    try {
      const cId = verifiedCompany?.company?.companyId
      setOldPlanName(currentPlan || '')
      setOldPlanInterval(currentInterval)
      const res = await fetch(`${API}/api/subscription/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId: cId, planName: selectedPlan, planInterval: billingInterval }),
      })
      const data = await res.json()
      if (!data.success) { setError(data.message || 'Failed to create subscription order'); setPlanChanging(false); return }
      const opened = await openRazorpay(
        data.subscription_id,
        async (_response) => {
          const changeRes = await fetch(`${API}/api/subscription/change-plan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyId: cId, newPlan: selectedPlan, planInterval: billingInterval }),
          })
          const changeData = await changeRes.json()
          if (changeData.success) { setPlanChangeSuccess(true); setStep(3) }
          else setError(changeData.message || 'Plan update failed after payment. Contact support.')
        },
        () => { setPlanChanging(false); setError('Payment was cancelled. You can try again anytime.') },
      )
      if (opened) setPlanChanging(false)
    } catch {
      setError('Payment initiation failed. Please try again.')
      setPlanChanging(false)
    }
  }

  const stepLabels = ['Company', 'Plan', 'Done']

  // ── Current subscription amount display helper ─────────────────────────────
  const subAmountDisplay = () => {
    const sub = verifiedCompany?.company?.subscription
    if (!sub?.plan_name) return '—'
    const plan = PLANS.find(p => p.id === sub.plan_name)
    if (!plan) return '—'
    const interval = sub.plan_interval || 'monthly'
    const amount = interval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
    return `${fmt(amount)}/${interval}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#870d23] to-[#d4145a] text-white py-6">
        <div className="container mx-auto px-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" /><span>Back</span>
          </button>
          <h1 className="text-3xl font-bold">HRMS Subscription</h1>
          <p className="text-white/90 mt-1">Upgrade your plan and unlock powerful HR features</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          {stepLabels.map((label, i) => {
            const s = i + 1
            return (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? 'bg-[#870d23] text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
                  <span className={`text-xs mt-1 font-medium ${step >= s ? 'text-[#870d23]' : 'text-gray-400'}`}>{label}</span>
                </div>
                {s < 3 && <div className={`w-20 h-1 mb-4 mx-1 rounded transition-all ${step > s ? 'bg-[#870d23]' : 'bg-gray-200'}`} />}
              </div>
            )
          })}
        </div>

        {/* ══ STEP 1 ══ */}
        {step === 1 && (
          <div className="max-w-xl mx-auto">
            <div className="flex gap-3 mb-6">
              {(['existing', 'new'] as const).map(tab => (
                <button key={tab} onClick={() => { setActiveTab(tab); setError('') }}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${activeTab === tab ? 'bg-gradient-to-r from-[#870d23] to-[#d4145a] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                  {tab === 'existing' ? '🏢 Existing Company' : '✨ New Company'}
                </button>
              ))}
            </div>

            {activeTab === 'existing' && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Verify Your Company</h2>
                <p className="text-gray-500 text-sm mb-6">Enter your Company ID to manage your subscription</p>
                <div className="space-y-4">
                  <Field label="Company ID *" icon={Building2}>
                    <input type="text" value={companyData.companyId}
                      onChange={e => setCompanyData({ ...companyData, companyId: e.target.value.toUpperCase() })}
                      placeholder="DEMO10012 or FDM10001" className={inputCls()} />
                  </Field>
                  <Field label="Company Email *" icon={Mail}>
                    <input type="email" value={companyData.companyEmail}
                      onChange={e => setCompanyData({ ...companyData, companyEmail: e.target.value })}
                      placeholder="company@example.com" className={inputCls()} />
                  </Field>
                  <Field label="Contact Person *" icon={User}>
                    <input type="text" value={companyData.contactPerson}
                      onChange={e => setCompanyData({ ...companyData, contactPerson: e.target.value })}
                      placeholder="John Doe" className={inputCls()} />
                  </Field>
                  <Field label="Phone Number" icon={Phone}>
                    <input type="tel" value={companyData.phone}
                      onChange={e => setCompanyData({ ...companyData, phone: e.target.value })}
                      placeholder="+91 9876543210" className={inputCls()} />
                  </Field>
                  <ErrorBox msg={error} />
                  <button onClick={handleVerifyCompany}
                    disabled={loading || !companyData.companyId || !companyData.companyEmail || !companyData.contactPerson}
                    className="w-full bg-gradient-to-r from-[#870d23] to-[#d4145a] text-white font-bold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all">
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Verifying...</> : <>Continue to Plan Selection <ArrowRight className="w-5 h-5" /></>}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'new' && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Register New Company</h2>
                <p className="text-gray-500 text-sm mb-4">Start your 7-day free trial — no credit card required</p>
                <InfoBox msg="🎯 7-day free trial with full access to all features. Upgrade anytime." color="green" />
                <div className="space-y-4 mt-4">
                  <Field label="Company Name *" icon={Building2}>
                    <input type="text" value={companyData.companyName}
                      onChange={e => setCompanyData({ ...companyData, companyName: e.target.value })}
                      placeholder="Your Company Name" className={inputCls()} />
                  </Field>
                  <Field label="Contact Person *" icon={User}>
                    <input type="text" value={companyData.contactPerson}
                      onChange={e => setCompanyData({ ...companyData, contactPerson: e.target.value })}
                      placeholder="John Doe" className={inputCls()} />
                  </Field>
                  <Field label="Email *" icon={Mail}>
                    <input type="email" value={companyData.companyEmail}
                      onChange={e => setCompanyData({ ...companyData, companyEmail: e.target.value })}
                      placeholder="company@example.com" className={inputCls()} />
                  </Field>
                  <Field label="Phone *" icon={Phone}>
                    <input type="tel" value={companyData.phone}
                      onChange={e => setCompanyData({ ...companyData, phone: e.target.value })}
                      placeholder="+91 9876543210" className={inputCls()} />
                  </Field>
                  <Field label="Number of Employees *" icon={Users}>
                    <input type="number" value={companyData.employeeCount}
                      onChange={e => setCompanyData({ ...companyData, employeeCount: e.target.value })}
                      placeholder="50" className={inputCls()} />
                  </Field>
                  <Field label="Industry (Optional)" icon={Briefcase}>
                    <input type="text" value={companyData.industry}
                      onChange={e => setCompanyData({ ...companyData, industry: e.target.value })}
                      placeholder="IT, Manufacturing, Healthcare" className={inputCls()} />
                  </Field>
                  <Field label="Location (Optional)" icon={MapPin}>
                    <textarea value={companyData.address}
                      onChange={e => setCompanyData({ ...companyData, address: e.target.value })}
                      placeholder="Company address" rows={2}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent text-gray-900 resize-none" />
                  </Field>
                  <ErrorBox msg={error} />
                  <button onClick={handleRegisterAndSubscribe}
                    disabled={loading || !companyData.companyName || !companyData.contactPerson || !companyData.companyEmail || !companyData.phone || !companyData.employeeCount}
                    className="w-full bg-gradient-to-r from-[#870d23] to-[#d4145a] text-white font-bold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all">
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Registering...</> : <>Register & Continue <ArrowRight className="w-5 h-5" /></>}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ STEP 2 ══ */}
        {step === 2 && (
          <div className="max-w-5xl mx-auto">

            {/* New company banner */}
            {verifiedCompany?.isNew && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-800 font-semibold">✅ Company registered! ID: <strong>{verifiedCompany.suggestedCompanyId}</strong></p>
                <p className="text-green-700 text-sm mt-1">📧 Login credentials sent to {companyData.companyEmail}</p>
                <p className="text-blue-700 text-sm mt-1">🎯 7-day free trial active. Select a plan below to subscribe.</p>
              </div>
            )}

            {/* Existing company info card */}
            {verifiedCompany?.company && !verifiedCompany?.isNew && (
              <div className="mb-6">
                <div className={`rounded-t-2xl px-6 py-4 flex items-center justify-between ${isDemoCompany ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-[#870d23] to-[#d4145a]'}`}>
                  <div>
                    <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-0.5">{isDemoCompany ? 'Demo Account' : 'Paid Account'}</p>
                    <p className="text-white text-xl font-black">{verifiedCompany.company.companyName}</p>
                    <p className="text-white/80 text-sm font-mono mt-0.5">{verifiedCompany.company.companyId}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white">
                    <span className={`w-2 h-2 rounded-full ${isDemoCompany ? 'bg-yellow-300' : 'bg-green-300'}`} />
                    {isDemoCompany ? 'DEMO' : 'ACTIVE'}
                  </div>
                </div>
                <div className="bg-white rounded-b-2xl shadow-xl border border-gray-100 divide-y divide-gray-100">
                  <div className="flex items-center justify-between px-6 py-3">
                    <span className="text-sm text-gray-500 font-medium">Current Plan</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-black px-3 py-1 rounded-full ${currentPlan === 'ENTERPRISE' ? 'bg-purple-100 text-purple-700' : currentPlan === 'PRO' ? 'bg-red-100 text-[#870d23]' : currentPlan === 'BASIC' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {currentPlan || (isDemoCompany ? 'DEMO TRIAL' : 'N/A')}
                      </span>
                      {currentInterval === 'yearly' && (
                        <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Yearly
                        </span>
                      )}
                    </div>
                  </div>
                  {verifiedCompany.company.subscription?.razorpay_subscription_id && (
                    <>
                      <div className="flex items-center justify-between px-6 py-3">
                        <span className="text-sm text-gray-500 font-medium">Status</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${verifiedCompany.company.subscription.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {(verifiedCompany.company.subscription.status || 'PENDING').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-6 py-3">
                        <span className="text-sm text-gray-500 font-medium">Amount</span>
                        <span className="text-sm font-bold text-gray-800">
                          {subAmountDisplay()}
                        </span>
                      </div>
                      {verifiedCompany.company.subscription.next_billing_date && (
                        <div className="flex items-center justify-between px-6 py-3 bg-amber-50">
                          <span className="text-sm text-amber-700 font-semibold">Next Billing</span>
                          <span className="text-sm font-bold text-amber-800">
                            {new Date(verifiedCompany.company.subscription.next_billing_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between px-6 py-3">
                        <span className="text-sm text-gray-500 font-medium">Subscription ID</span>
                        <span className="text-xs font-mono text-gray-600">{verifiedCompany.company.subscription.razorpay_subscription_id}</span>
                      </div>
                    </>
                  )}

                  {/* Progress bar — only for active paid subscriptions with period dates */}
                  {isPaidCompany &&
                    verifiedCompany.company.subscription?.status === 'active' &&
                    verifiedCompany.company.subscription?.current_start &&
                    verifiedCompany.company.subscription?.current_end && (
                    <SubscriptionProgressBar
                      currentStart={verifiedCompany.company.subscription.current_start}
                      currentEnd={verifiedCompany.company.subscription.current_end}
                      planInterval={verifiedCompany.company.subscription.plan_interval || 'monthly'}
                    />
                  )}
                  <div className="flex items-center justify-between px-6 py-3">
                    <span className="text-sm text-gray-500 font-medium">Admin Email</span>
                    <span className="text-sm text-gray-800">{verifiedCompany.company.companyEmail}</span>
                  </div>
                  {isDemoCompany && (
                    <div className="px-6 py-3 bg-orange-50 rounded-b-2xl">
                      <p className="text-orange-700 text-sm font-semibold">⏳ Trial active — select a plan and complete payment to get a permanent paid account</p>
                    </div>
                  )}
                  {isPaidCompany && (
                    <div className="px-6 py-3 bg-blue-50 rounded-b-2xl">
                      <p className="text-blue-700 text-sm font-medium">💳 Select a different plan or billing cycle below — Razorpay checkout will open to process payment</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Info banners */}
            {isDemoCompany && (
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-amber-900 mb-2">📋 What happens when you upgrade from DEMO?</h3>
                <ol className="text-amber-800 text-sm space-y-1 list-decimal list-inside">
                  <li>Payment is processed via Razorpay</li>
                  <li>Your DEMO company gets a new permanent ID (e.g. <strong>FDM10013</strong>)</li>
                  <li>All your data — employees, attendance, leaves, salary — is migrated automatically</li>
                  <li><strong>Log out</strong> of the app and log back in using your new Company ID</li>
                  <li>Your selected plan features are unlocked immediately</li>
                </ol>
                <div className="mt-3 flex items-center gap-2 bg-amber-100 rounded-lg p-3">
                  <LogOut className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <p className="text-amber-800 text-xs font-medium">After payment, you will see your new Company ID on the confirmation screen.</p>
                </div>
              </div>
            )}

            {isPaidCompany && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Upgrading / Changing Your Plan</h3>
                <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
                  <li>Select your new plan and billing cycle below</li>
                  <li>Click the Upgrade / Downgrade button</li>
                  <li>Razorpay checkout will open — complete the payment</li>
                  <li>Your new plan features activate instantly in the HRMS app</li>
                </ol>
              </div>
            )}

            {isPaidCompany && isDowngrade && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-800 font-semibold">⚠️ Downgrade Warning</p>
                <p className="text-red-700 text-sm mt-1">
                  Downgrading from <strong>{currentPlan}</strong> to <strong>{selectedPlan}</strong> will immediately disable features not included in the lower plan.
                </p>
              </div>
            )}

            {/* Plan heading + billing toggle */}
            <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
              {isPaidCompany ? 'Change Your Plan' : 'Choose Your Plan'}
            </h2>
            <p className="text-gray-500 text-center text-sm mb-6">All plans include default HR features. GST will be added during payment.</p>

            <BillingToggle interval={billingInterval} onChange={v => { setBillingInterval(v); setError('') }} />

            {/* Yearly savings banner */}
            {billingInterval === 'yearly' && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-green-800">🎉 You're saving {YEARLY_DISCOUNT}% with yearly billing!</p>
                  <p className="text-green-700 text-sm mt-0.5">Pay once a year and get 2 months free compared to monthly billing.</p>
                </div>
              </div>
            )}

            {/* Plan cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {PLANS.map(plan => {
                const PlanIcon = plan.icon
                const isSelected = selectedPlan === plan.id
                const isCurrent = plan.id === currentPlan && billingInterval === currentInterval
                const price = getPrice(plan, billingInterval)
                const monthlyEquiv = getMonthlyEquiv(plan)

                return (
                  <div key={plan.id}
                    onClick={() => { setSelectedPlan(plan.id); setError('') }}
                    className={`relative bg-white rounded-2xl shadow-lg cursor-pointer transition-all border-2 overflow-hidden ${isSelected ? 'border-[#870d23] scale-[1.02] shadow-xl' : 'border-transparent hover:border-gray-200 hover:shadow-xl'}`}>

                    {/* Yearly savings ribbon */}
                    {billingInterval === 'yearly' && (
                      <div className="bg-green-500 text-white text-xs font-bold text-center py-1.5 tracking-wide">
                        SAVE {YEARLY_DISCOUNT}% — 2 MONTHS FREE
                      </div>
                    )}

                    <div className="p-6">
                      {plan.popular && (
                        <div className="absolute top-10 right-0 bg-[#870d23] text-white px-3 py-1 text-xs font-bold rounded-l-full">
                          Most Popular
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute top-10 left-0 bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-r-full">
                          Current
                        </div>
                      )}

                      {/* Icon + name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: plan.color + '20' }}>
                          <PlanIcon className="w-5 h-5" style={{ color: plan.color }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{plan.name}</h3>
                          <p className="text-xs text-gray-500">{plan.description}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4 p-4 rounded-xl text-center" style={{ backgroundColor: plan.color + '08' }}>
                        {billingInterval === 'yearly' && plan.yearlyOriginal && (
                          <div className="mb-2">
                            <span className="text-lg text-gray-400 line-through">{fmt(plan.yearlyOriginal)}</span>
                          </div>
                        )}
                        <div className="flex items-end justify-center gap-1">
                          <span className="text-4xl font-black" style={{ color: plan.color }}>{fmt(price)}</span>
                          <span className="text-gray-500 text-sm mb-1.5">/{billingInterval === 'yearly' ? 'year' : 'month'}</span>
                        </div>
                        {billingInterval === 'yearly' && (
                          <div className="mt-2">
                            <span className="text-sm font-bold text-green-600">≈ {fmt(monthlyEquiv)}/month</span>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">+18% GST at checkout</p>
                      </div>

                      {/* Default features */}
                      <div className="mb-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Included in all plans</p>
                        {plan.defaultFeatures.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                            <CheckCircle className="w-3 h-3 text-gray-400 flex-shrink-0" />{f}
                          </div>
                        ))}
                        <p className="text-xs text-gray-400 ml-5">+{plan.defaultFeatures.length - 3} more default features</p>
                      </div>

                      {/* Plan features */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: plan.color }}>Plan features</p>
                        {plan.planFeatures.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                            <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: plan.color }} />{f}
                          </div>
                        ))}
                      </div>

                      {isSelected && (
                        <div className="mt-4 text-center text-sm font-bold py-2 rounded-lg" style={{ color: plan.color, backgroundColor: plan.color + '10' }}>
                          ✔ Selected
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <ErrorBox msg={error} />

            <div className="flex gap-4 justify-center mt-6 flex-wrap">
              <button onClick={() => { setStep(1); setError('') }}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all">
                Back
              </button>

              {isPaidCompany && !isSamePlan && (
                <button onClick={handlePlanChange} disabled={planChanging}
                  className={`px-8 py-3 font-bold rounded-xl text-white flex items-center gap-2 transition-all disabled:opacity-50 ${isDowngrade ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-[#870d23] to-[#d4145a] hover:opacity-90'}`}>
                  {planChanging
                    ? <><Loader2 className="w-5 h-5 animate-spin" />Opening Payment...</>
                    : <><CreditCard className="w-5 h-5" />{isDowngrade ? `↓ Downgrade to ${selectedPlan}` : `↑ Upgrade to ${selectedPlan}`} ({billingInterval})</>
                  }
                </button>
              )}

              {isPaidCompany && isSamePlan && (
                <div className="px-8 py-3 bg-gray-100 rounded-xl text-gray-500 font-medium">
                  Already on this plan &amp; billing cycle
                </div>
              )}

              {(isDemoCompany || verifiedCompany?.isNew || !verifiedCompany?.company) && (
                <button onClick={handlePayment} disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-[#870d23] to-[#d4145a] text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-all">
                  {loading
                    ? <><Loader2 className="w-5 h-5 animate-spin" />Opening Payment...</>
                    : <>Proceed to Payment ({billingInterval}) <ArrowRight className="w-5 h-5" /></>
                  }
                </button>
              )}
            </div>
          </div>
        )}

        {/* ══ STEP 3 ══ */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">

            {/* ── PAID plan change success ── */}
            {planChangeSuccess && (
              <div>
                <div className="bg-gradient-to-br from-[#870d23] to-[#d4145a] rounded-2xl shadow-2xl p-8 mb-6 text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-1">Payment Successful!</h2>
                  <p className="text-white/80 text-sm">Your {selectedPlan} Plan ({billingInterval}) is now active</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border-2 border-[#870d23] p-6 mb-6 text-center">
                  <p className="text-gray-500 text-sm font-medium mb-3">Plan Updated</p>
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-1">Previous</p>
                      <p className="font-mono font-bold text-gray-400 bg-gray-100 px-4 py-2 rounded-lg text-sm line-through">
                        {oldPlanName} ({oldPlanInterval})
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="text-center">
                      <p className="text-xs text-[#870d23] font-semibold mb-1">New Plan</p>
                      <p className="font-mono font-black text-[#870d23] bg-red-50 border-2 border-[#870d23] px-4 py-2 rounded-lg text-sm">
                        {selectedPlan} ({billingInterval})
                      </p>
                    </div>
                  </div>
                  {billingInterval === 'yearly' && (
                    <div className="mt-2 bg-green-50 border border-green-200 rounded-lg p-2">
                      <p className="text-green-700 text-xs font-semibold">🎉 Yearly plan active — you saved {YEARLY_DISCOUNT}% vs monthly billing!</p>
                    </div>
                  )}
                  <p className="text-gray-400 text-xs mt-3">Features updated instantly in your HRMS app</p>
                </div>

                <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-6 mb-6">
                  <h3 className="font-black text-amber-900 text-lg mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" /> What to do now
                  </h3>
                  <div className="space-y-3">
                    {[
                      { n: 1, text: 'Open the FuelDigi HRMS app on your phone or tablet' },
                      { n: 2, text: 'Pull down to refresh or go to Company Settings' },
                      { n: 3, text: `Your ${selectedPlan} plan features are now unlocked` },
                      { n: 4, text: 'If features are not visible, tap "Sync Subscription" in Company Settings' },
                    ].map(({ n, text }) => (
                      <div key={n} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-amber-200">
                        <div className="w-7 h-7 rounded-full bg-[#870d23] text-white font-black text-sm flex items-center justify-center flex-shrink-0">{n}</div>
                        <p className="text-amber-900 text-sm leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
                  <p className="font-bold text-green-900 mb-3">Features Unlocked with {selectedPlan} Plan:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PLANS.find(p => p.id === selectedPlan)?.planFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-green-800 bg-white rounded-lg px-3 py-2 border border-green-100">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-gray-400 text-xs text-center mb-6">
                  Confirmation email sent to <strong>{companyData.companyEmail || verifiedCompany?.company?.companyEmail}</strong>
                </p>

                <div className="flex gap-4 justify-center flex-wrap">
                  <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fdm2025.attendancehrsystem', '_blank')}
                    className="bg-gradient-to-r from-[#870d23] to-[#d4145a] text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-all">
                    Open Mobile App
                  </button>
                  <button onClick={() => router.push('/')}
                    className="border-2 border-[#870d23] text-[#870d23] font-bold px-8 py-3 rounded-xl hover:bg-[#870d23] hover:text-white transition-all">
                    Back to Home
                  </button>
                </div>
              </div>
            )}

            {/* ── DEMO migration success ── */}
            {!planChangeSuccess && isDemoCompany && (
              <div>
                {migrating && (
                  <div className="bg-white rounded-2xl shadow-xl p-10 text-center mb-6">
                    <Loader2 className="w-12 h-12 animate-spin text-[#870d23] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Migrating Your Account...</h2>
                    <p className="text-gray-500">Please wait. We are moving all your data to your new paid account.</p>
                  </div>
                )}

                {!migrating && migrationError && (
                  <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-bold text-red-800 mb-2">Migration Issue</h2>
                    <p className="text-red-700 text-sm mb-3">{migrationError}</p>
                    <p className="text-red-600 text-xs">Your payment was successful. Please contact support with your Demo Company ID: <strong>{verifiedCompany?.company?.companyId}</strong></p>
                  </div>
                )}

                {!migrating && migrationNewId && (
                  <div>
                    <div className="bg-gradient-to-br from-[#870d23] to-[#d4145a] rounded-2xl shadow-2xl p-8 mb-6 text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold mb-1">Payment Successful!</h2>
                      <p className="text-white/80 text-sm">Your {selectedPlan} Plan ({billingInterval}) is now active</p>
                      {billingInterval === 'yearly' && (
                        <p className="text-green-300 text-xs mt-1 font-semibold">🎉 Yearly plan — you saved {YEARLY_DISCOUNT}%!</p>
                      )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border-2 border-[#870d23] p-6 mb-6 text-center">
                      <p className="text-gray-500 text-sm font-medium mb-1">Your New Company ID</p>
                      <p className="text-5xl font-black text-[#870d23] tracking-widest mb-3">{migrationNewId}</p>
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">Old DEMO ID (no longer valid)</p>
                          <p className="font-mono font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg line-through text-sm">{verifiedCompany?.company?.companyId}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div className="text-center">
                          <p className="text-xs text-[#870d23] font-semibold mb-1">New Paid ID</p>
                          <p className="font-mono font-black text-[#870d23] bg-red-50 border-2 border-[#870d23] px-3 py-1.5 rounded-lg text-sm">{migrationNewId}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs">All your data has been automatically moved to this new ID</p>
                    </div>

                    <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-6 mb-6">
                      <h3 className="font-black text-amber-900 text-lg mb-4 flex items-center gap-2">
                        <LogOut className="w-5 h-5" /> Action Required — Do This Now
                      </h3>
                      <div className="space-y-3">
                        {[
                          { n: 1, text: 'Open the FuelDigi HRMS app on your phone or tablet' },
                          { n: 2, text: 'Tap your profile icon or the menu, then tap Log Out' },
                          { n: 3, text: `On the login screen, enter your new Company ID: ${migrationNewId}` },
                          { n: 4, text: 'Enter your existing email address and password (same as before)' },
                          { n: 5, text: `Tap Login — your ${selectedPlan} plan features are now unlocked` },
                        ].map(({ n, text }) => (
                          <div key={n} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-amber-200">
                            <div className="w-7 h-7 rounded-full bg-[#870d23] text-white font-black text-sm flex items-center justify-center flex-shrink-0">{n}</div>
                            <p className="text-amber-900 text-sm leading-relaxed">{text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">
                        <p className="text-red-700 text-xs font-semibold text-center">
                          Your old DEMO ID ({verifiedCompany?.company?.companyId}) will no longer work.
                          Always use <strong>{migrationNewId}</strong> to log in from now on.
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
                      <p className="font-bold text-green-900 mb-3">Features Unlocked with {selectedPlan} Plan:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {PLANS.find(p => p.id === selectedPlan)?.planFeatures.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-green-800 bg-white rounded-lg px-3 py-2 border border-green-100">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />{f}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-400 text-xs text-center mb-6">
                      Confirmation email sent to <strong>{companyData.companyEmail || verifiedCompany?.company?.companyEmail}</strong>
                    </p>
                  </div>
                )}

                <div className="flex gap-4 justify-center flex-wrap">
                  <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fdm2025.attendancehrsystem', '_blank')}
                    className="bg-gradient-to-r from-[#870d23] to-[#d4145a] text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-all">
                    Open Mobile App
                  </button>
                  <button onClick={() => router.push('/')}
                    className="border-2 border-[#870d23] text-[#870d23] font-bold px-8 py-3 rounded-xl hover:bg-[#870d23] hover:text-white transition-all">
                    Back to Home
                  </button>
                </div>
              </div>
            )}

            {/* ── New company success ── */}
            {!planChangeSuccess && !isDemoCompany && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h2>
                <p className="text-gray-600 mb-2">
                  Your <strong className="text-[#870d23]">{selectedPlan} Plan</strong> subscription is now active.
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Billing: <span className="font-semibold capitalize">{billingInterval}</span>
                  {billingInterval === 'yearly' && <span className="ml-2 text-green-600 font-semibold">🎉 {YEARLY_DISCOUNT}% saved!</span>}
                </p>
                {verifiedCompany?.isNew && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6 text-left">
                    <p className="font-bold text-yellow-900 mb-1">Your Company ID</p>
                    <p className="text-3xl font-black text-[#870d23] mb-2">{verifiedCompany.suggestedCompanyId}</p>
                    <p className="text-yellow-800 text-sm">Save this ID — you need it to log in. Credentials sent to your email.</p>
                  </div>
                )}
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 text-left">
                  <p className="font-bold text-green-900 mb-3">Features unlocked ({selectedPlan}):</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PLANS.find(p => p.id === selectedPlan)?.planFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-green-800">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-6">
                  Confirmation sent to <strong>{companyData.companyEmail || verifiedCompany?.company?.companyEmail}</strong>
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fdm2025.attendancehrsystem', '_blank')}
                    className="bg-gradient-to-r from-[#870d23] to-[#d4145a] text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-all">
                    Open Mobile App
                  </button>
                  <button onClick={() => router.push('/')}
                    className="border-2 border-[#870d23] text-[#870d23] font-bold px-8 py-3 rounded-xl hover:bg-[#870d23] hover:text-white transition-all">
                    Back to Home
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  )
}