'use client'

import { useState } from 'react'
import {
  ArrowLeft, Building2, Mail, Phone, User, CheckCircle,
  Loader2, Users, Briefcase, MapPin, AlertCircle, Info,
  ArrowRight, Shield, Zap, Star, LogOut, CreditCard, Calendar,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    Razorpay: any;
  }
}

// ── Usage Statistics Component ──────────────────────────────────────────────────────────────────────────────────
function UsageStatsCard({ currentUsage, planLimits }: { currentUsage: any; planLimits: any }) {
  const usage = currentUsage || {}
  const limits = planLimits || {}

  const stats = [
    {
      label: 'Active Users',
      current: usage.users ?? 0,
      limit: limits.users ?? 'Unlimited',
      icon: Users,
      color: '#870d23'
    },
    {
      label: 'Leads This Month',
      current: usage.leads ?? 0,
      limit: limits.leads === -1 ? 'Unlimited' : (limits.leads ?? 'Unlimited'),
      icon: Building2,
      color: '#3b82f6'
    },
    {
      label: 'Facebook Pages',
      current: usage.facebookPages ?? 0,
      limit: limits.facebookPages ?? 0,
      icon: Zap,
      color: '#f59e0b'
    }
  ]

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mt-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Info className="w-4 h-4" />
        Current Usage
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          const isUnlimited = stat.limit === 'Unlimited'
          const percentage = !isUnlimited && Number(stat.limit) > 0
            ? Math.min(100, (stat.current / Number(stat.limit)) * 100)
            : 0
          const isNearLimit = percentage > 80

          return (
            <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className="w-4 h-4" style={{ color: stat.color }} />
                <span className="text-xs font-medium text-gray-600">{stat.label}</span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-lg font-bold text-gray-900">{stat.current.toLocaleString()}</span>
                <span className="text-xs text-gray-500 mb-0.5">
                  / {isUnlimited ? '∞' : stat.limit}
                </span>
              </div>
              {!isUnlimited && Number(stat.limit) > 0 && (
                <div className="mt-2">
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${isNearLimit ? 'bg-red-500' : 'bg-[#870d23]'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium mt-1 block ${isNearLimit ? 'text-red-600' : 'text-gray-500'}`}>
                    {percentage.toFixed(1)}% used
                  </span>
                </div>
              )}
              {isUnlimited && (
                <span className="text-xs text-[#870d23] font-medium mt-1 block">Unlimited</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Billing History Component ────────────────────────────────────────────────────────────────────────────────────
function BillingHistoryCard({ paymentHistory }: { paymentHistory: any[] }) {
  const recentPayments = (paymentHistory || []).slice(0, 3)

  if (recentPayments.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Recent Payments
        </h4>
        <p className="text-sm text-gray-500 text-center py-4">No payment history available</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mt-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
        Recent Payments
      </h4>
      <div className="space-y-3">
        {recentPayments.map((payment: any, index: number) => {
          // amount stored in rupees directly (CRM backend)
          const amount = payment.amount || 0
          const date = new Date(payment.paidAt || payment.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
          })
          const statusColors: Record<string, string> = {
            captured: 'bg-[#fce8ec] text-[#870d23]',
            paid: 'bg-[#fce8ec] text-[#870d23]',
            failed: 'bg-red-100 text-red-700',
            pending: 'bg-yellow-100 text-yellow-700'
          }
          const displayStatus = payment.status === 'captured' ? 'paid' : (payment.status || 'paid')

          return (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0 bg-white rounded-lg px-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[payment.status] || 'bg-gray-100 text-gray-700'
                    }`}>
                    {displayStatus.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {payment.description || payment.type || 'Plan payment'} • {date}
                </div>
              </div>
              {(payment.paymentId || payment.razorpay_payment_id) && (
                <div className="text-xs text-gray-400 font-mono ml-2">
                  #{(payment.paymentId || payment.razorpay_payment_id).slice(-8)}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {(paymentHistory || []).length > 3 && (
        <p className="text-xs text-gray-500 text-center mt-3 pt-3 border-t border-gray-200">
          +{(paymentHistory || []).length - 3} more payments in history
        </p>
      )}
    </div>
  )
}

// ── Subscription Progress Bar ────────────────────────────────────────────────────────────────────────────────────
function SubscriptionProgressBar({ billing }: { billing: any }) {
  const startRaw = billing?.currentPeriodStart || billing?.lastPaymentDate || billing?.current_start
  const endRaw = billing?.currentPeriodEnd || billing?.current_end || billing?.nextBillingDate

  if (!endRaw) return null

  const end = new Date(endRaw).getTime()
  const now = Date.now()

  // If no start date, estimate from billing cycle
  const billingCycle = billing?.billingCycle || 'monthly'
  const cycleDays = billingCycle === 'yearly' ? 365 : 30
  const start = startRaw
    ? new Date(startRaw).getTime()
    : end - cycleDays * 86400000

  const totalDays = Math.round((end - start) / 86400000)
  const daysUsed = Math.max(0, Math.round((now - start) / 86400000))
  const daysLeft = Math.max(0, Math.round((end - now) / 86400000))
  const pct = Math.min(100, Math.max(0, Math.round((daysUsed / totalDays) * 100)))
  const remaining = 100 - pct

  let barColor = '#870d23'; let bgColor = '#dcfce7'; let label = 'Good'; let emoji = '🟢'
  if (remaining <= 10) { barColor = '#ef4444'; bgColor = '#fee2e2'; label = 'Critical'; emoji = '🔴' }
  else if (remaining <= 25) { barColor = '#f97316'; bgColor = '#ffedd5'; label = 'Expiring Soon'; emoji = '🟠' }
  else if (remaining <= 50) { barColor = '#eab308'; bgColor = '#fef9c3'; label = 'Halfway'; emoji = '🟡' }

  const fmtDate = (d: string | Date) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  const nextDate = fmtDate(endRaw)
  const lastDate = billing?.lastPaymentDate ? fmtDate(billing.lastPaymentDate) : (startRaw ? fmtDate(startRaw) : null)

  return (
    <div className="mt-4 bg-gray-50 rounded-xl border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">Billing Period</span>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: bgColor, color: barColor }}>
          {emoji} {label}
        </span>
      </div>

      {/* Last paid / Next due row */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-white rounded-lg px-3 py-2 border border-gray-100">
          <p className="text-xs text-gray-400 mb-0.5">Last Payment</p>
          <p className="text-xs font-bold text-gray-700">{lastDate || '—'}</p>
        </div>
        <div className="bg-white rounded-lg px-3 py-2 border border-gray-100">
          <p className="text-xs text-gray-400 mb-0.5">Next Due Date</p>
          <p className="text-xs font-bold" style={{ color: daysLeft <= 7 ? '#ef4444' : '#1f2937' }}>{nextDate}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: barColor }} />
      </div>

      {/* Days row */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400">{daysUsed} day{daysUsed !== 1 ? 's' : ''} used</span>
        <span className="text-xs font-bold" style={{ color: barColor }}>{daysLeft} day{daysLeft !== 1 ? 's' : ''} left</span>
      </div>

      {/* Percentage */}
      <div className="mt-1.5 text-center">
        <span className="text-xs font-semibold" style={{ color: barColor }}>
          {pct}% completed • {remaining}% remaining
        </span>
      </div>

      {/* Renews on */}
      <div className="mt-3 flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs text-gray-500 capitalize">{billingCycle} plan renews on</span>
        </div>
        <span className="text-xs font-bold text-gray-800">{nextDate}</span>
      </div>

      {/* Urgency alert */}
      {daysLeft <= 7 && daysLeft > 0 && (
        <div className="mt-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
          <span className="text-xs text-red-700 font-semibold">Renews in {daysLeft} day{daysLeft !== 1 ? 's' : ''}! Ensure payment is ready.</span>
        </div>
      )}
    </div>
  )
}

export default function CRMPaymentPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'existing' | 'new'>('existing')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    companyName: '',
    businessType: '',
    teamSize: ''
  })
  const [verifiedUser, setVerifiedUser] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [billingInfo, setBillingInfo] = useState<any>(null)
  const [extraUsers, setExtraUsers] = useState(0)
  const [currentUserCount, setCurrentUserCount] = useState(0)
  const [planLimits, setPlanLimits] = useState<any>(null)
  const [activePaymentTab, setActivePaymentTab] = useState<'plan' | 'users'>('plan')
  const [currentPlanInfo, setCurrentPlanInfo] = useState<any>(null)
  const [paymentHistory, setPaymentHistory] = useState<any[]>([])
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [orgUsers, setOrgUsers] = useState<any[]>([])
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<any>(null)
  const [deletePassword, setDeletePassword] = useState('')
  const [reducingSlots, setReducingSlots] = useState(false)
  const [confirmReleaseSlots, setConfirmReleaseSlots] = useState<number>(0)

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      platformFee: 1000,
      extraUserPrice: 500,
      leadLimit: 1000,
      leadOveragePrice: 1,
      userLimit: 3,
      facebookPages: 1,
      features: [
        'Telecalling page with call logging',
        'Basic reporting & analytics',
        'Email integration',
        'Role-based permission management',
        'Call tracking',
        'User management',
        'Calendar integration',
        'Mobile app access',
      ],
      limits: { leads: 1000, users: 3, facebookPages: 1 }
    },
    {
      id: 'professional',
      name: 'Professional Plan',
      platformFee: 2500,
      extraUserPrice: 1000,
      leadLimit: 2500,
      leadOveragePrice: 1,
      userLimit: 8,
      facebookPages: 2,
      features: [
        'All Starter Plan features',
        'Facebook lead integration (2 pages)',
        'Cold case management',
        'Automated reminders & follow-ups',
        'Advanced reporting & dashboards',
        'WhatsApp integration',
        'Team Management',
      ],
      popular: true,
      limits: { leads: 2500, users: 8, facebookPages: 2 }
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      platformFee: 4000,
      extraUserPrice: 1500,
      leadLimit: -1,
      leadOveragePrice: 0,
      userLimit: 12,
      facebookPages: 5,
      features: [
        'All Professional Plan features',
        'Facebook integration (up to 5 pages)',
        'Advanced analytics & insights',
        'Follow-up tracker with automation',
        'Import/Export functionality',
        'Custom fields & workflows',
        'Priority support',
        'Team performance analytics',
        'Bulk operations',
        'Work Progress Tracking',
        'Usage Dashboard',
      ],
      limits: { leads: -1, users: 12, facebookPages: 5 }
    }
  ]

  const handleVerifyUser = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://app.fdmcrm.in/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        })
      })
      const data = await response.json()

      if (response.ok && data.token) {
        setVerifiedUser({
          user: data.user,
          organization: data.organization,
          token: data.token
        })
        // Fetch current plan limits and user count
        await fetchCurrentPlanData(data.token)
        setStep(2)
      } else {
        alert(data.message || 'Invalid credentials')
      }
    } catch (error) {
      alert('Failed to verify user credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterUser = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://app.fdmcrm.in/api'}/auth/register-demo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
          organizationName: userData.companyName
        })
      })
      const data = await response.json()

      if (response.ok && data.token) {
        setVerifiedUser({
          user: data.user,
          organization: data.organization,
          token: data.token,
          isNew: true
        })
        // For new users, set default values
        setCurrentUserCount(1)
        setPlanLimits({ users: 1 })
        setStep(2)
      } else {
        alert(data.message || 'Registration failed')
      }
    } catch (error) {
      alert('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentPlanData = async (token: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.fdmcrm.in/api'
      const headers = { 'Authorization': `Bearer ${token}` }

      const [planRes, historyRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/plans/current`, { headers }),
        fetch(`${API_URL}/payment/payment-history`, { headers }),
        fetch(`${API_URL}/payment/org-users`, { headers })
      ])

      const planData = await planRes.json()
      const historyData = historyRes.ok ? await historyRes.json() : null
      const usersData = usersRes.ok ? await usersRes.json() : null

      if (planRes.ok) {
        const currentPlan = planData.organization?.accountType || planData.organization?.subscriptionPlan || 'starter'
        setCurrentUserCount(planData.currentUsage?.users || 1)
        setPlanLimits(planData.planLimits || {})
        setCurrentPlanInfo({
          planName: currentPlan,
          planLimits: planData.planLimits || {},
          currentUsage: planData.currentUsage || {},
          pricing: planData.pricing || {},
          overageInfo: planData.overageInfo || {}
        })
        setSelectedPlan(currentPlan)
      }
      if (historyData?.paymentHistory) setPaymentHistory(historyData.paymentHistory)
      if (usersData?.users) setOrgUsers(usersData.users)
      const sub = planData?.organization?.billing || null
      setSubscriptionInfo(sub)
    } catch (error) {
      console.error('Failed to fetch plan data:', error)
    }
  }

  const handleUserCountChange = (change: number) => {
    const newExtraUsers = Math.max(0, extraUsers + change)
    const newTotalUsers = currentUserCount + newExtraUsers
    if (newTotalUsers < currentUserCount) {
      alert(`You already have ${currentUserCount} users. To reduce users, delete them from Team Management first.`)
      return
    }
    setExtraUsers(newExtraUsers)
  }

  // Yearly extra-user price = monthly * 12 * (1 - discount)
  const YEARLY_EXTRA_USER_DISCOUNTS: Record<string, number> = { starter: 0.05, professional: 0.10, enterprise: 0.15 }
  const getExtraUserPrice = (planId: string, cycle: 'monthly' | 'yearly') => {
    const plan = plans.find(p => p.id === planId)
    if (!plan) return 0
    const monthly = plan.extraUserPrice
    if (cycle === 'yearly') {
      const disc = YEARLY_EXTRA_USER_DISCOUNTS[planId] || 0
      return Math.round(monthly * 12 * (1 - disc))
    }
    return monthly
  }

  const handleDeleteUser = async (user: any) => {
    if (!deletePassword.trim()) {
      alert('Please enter your password to confirm deletion.')
      return
    }
    setDeletingUserId(user._id)
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.fdmcrm.in/api'
      const res = await fetch(`${API_URL}/payment/delete-user/${user._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${verifiedUser.token}` },
        body: JSON.stringify({ password: deletePassword })
      })
      const data = await res.json()
      if (res.ok) {
        setConfirmDeleteUser(null)
        setDeletePassword('')
        // Refresh all plan data from DB so counts and limits are accurate
        await fetchCurrentPlanData(verifiedUser.token)
      } else {
        alert(data.message || 'Failed to delete user')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setDeletingUserId(null)
    }
  }

  const handleReduceSlots = async (slotsToRemove: number) => {
    setReducingSlots(true)
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.fdmcrm.in/api'
      const res = await fetch(`${API_URL}/payment/reduce-user-slots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${verifiedUser.token}` },
        body: JSON.stringify({ slotsToRemove })
      })
      const data = await res.json()
      if (res.ok) {
        // Refresh all plan data from DB so UI reflects the actual saved limit
        await fetchCurrentPlanData(verifiedUser.token)
      } else {
        alert(data.message || 'Failed to reduce slots')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setReducingSlots(false)
    }
  }

  const YEARLY_DISCOUNTS: Record<string, number> = { starter: 5, professional: 10, enterprise: 15 }

  const getDisplayPrice = (plan: typeof plans[0]) => {
    if (billingCycle === 'yearly') {
      const yearly = plan.platformFee * 12
      const disc = (yearly * (YEARLY_DISCOUNTS[plan.id] || 0)) / 100
      return Math.round(yearly - disc)
    }
    return plan.platformFee
  }

  const getMonthlyEquiv = (plan: typeof plans[0]) => Math.round(getDisplayPrice(plan) / 12)

  const validateDowngrade = (planId: string): string | null => {
    const target = plans.find(p => p.id === planId)
    if (!target) return null
    const currentUsers = currentPlanInfo?.currentUsage?.users || 0
    const currentLeads = currentPlanInfo?.currentUsage?.leads || 0
    if (currentUsers > target.userLimit) {
      return `You have ${currentUsers} active users but ${target.name} only supports ${target.userLimit} users. Please delete ${currentUsers - target.userLimit} user(s) from Team Management before downgrading.`
    }
    if (target.leadLimit !== -1 && currentLeads > target.leadLimit) {
      return `You have ${currentLeads} leads but ${target.name} only supports ${target.leadLimit} leads. Please reduce your leads before downgrading.`
    }
    return null
  }

  const handlePayment = async () => {
    setLoading(true)
    try {
      const selectedPlanData = plans.find(p => p.id === selectedPlan)

      if (activePaymentTab === 'plan') {
        const err = validateDowngrade(selectedPlan)
        if (err) { alert(err); setLoading(false); return }
      }

      let requestBody: any = { planId: selectedPlan, billingCycle }

      if (activePaymentTab === 'users') {
        const planUserLimit = currentPlanInfo?.planLimits?.users || 0
        const paidExtras = Math.max(0, currentUserCount + extraUsers - planUserLimit)
        if (paidExtras === 0) { setLoading(false); return }
        requestBody = {
          ...requestBody,
          extraUsers: paidExtras,
          isUserUpgrade: true
          // No extraUserCost sent — backend calculates price from planId + billingCycle
        }
      } else {
        requestBody = {
          ...requestBody,
          isUserUpgrade: false
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://app.fdmcrm.in/api'}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${verifiedUser.token}`
        },
        body: JSON.stringify(requestBody)
      })
      const data = await response.json()

      if (response.ok && data.orderId) {
        setBillingInfo(data.billing); // Store billing info including overages

        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
          const options = {
            key: data.razorpayKeyId,
            amount: data.amount,
            currency: data.currency,
            order_id: data.orderId,
            name: 'FuelDigi CRM',
            description: `${selectedPlanData?.name} Subscription`,
            handler: async function (response: any) {
              try {
                const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://app.fdmcrm.in/api'}/payment/verify-payment`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${verifiedUser.token}`
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    planId: selectedPlan,
                    billingCycle,
                    extraUsers: activePaymentTab === 'users'
                      ? Math.max(0, currentUserCount + extraUsers - (currentPlanInfo?.planLimits?.users || 0))
                      : 0,
                    isUserUpgrade: activePaymentTab === 'users'
                  })
                })

                if (verifyResponse.ok) {
                  setPaymentSuccess(true)
                  // Refresh subscription info so success screen shows correct dates
                  await fetchCurrentPlanData(verifiedUser.token)
                  setStep(3)
                } else {
                  alert('Payment verification failed')
                }
              } catch (error) {
                alert('Payment verification failed')
              }
            },
            prefill: {
              name: verifiedUser.user.name,
              email: verifiedUser.user.email,
              contact: verifiedUser.user.phone || userData.phone
            },
            theme: {
              color: '#870d23'
            },
            modal: {
              ondismiss: function () {
                setLoading(false)
              }
            }
          }
          const rzp = new window.Razorpay(options)
          rzp.open()
        }
      } else {
        alert(data.message || 'Failed to create payment order')
      }
    } catch (error) {
      alert('Payment initiation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-[#870d23] to-[#a01129] text-white py-6">
        <div className="container mx-auto px-6 py-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 mb-4 hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold">Subscribe to CRM</h1>
          <p className="text-white/90 mt-2">Choose your plan and start growing your business</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-[#870d23] text-white' : 'bg-gray-300 text-gray-600'}`}>
                {s}
              </div>
              {s < 3 && <div className={`w-24 h-1 ${step > s ? 'bg-[#870d23]' : 'bg-gray-300'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab('existing')}
                className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all ${activeTab === 'existing'
                  ? 'bg-gradient-to-r from-[#870d23] to-[#a01129] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Existing User Login
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all ${activeTab === 'new'
                  ? 'bg-gradient-to-r from-[#870d23] to-[#a01129] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                New User Registration
              </button>
            </div>

            {activeTab === 'existing' && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Login to Your Account</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <input
                      type="password"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      placeholder="Your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    onClick={handleVerifyUser}
                    disabled={loading || !userData.email || !userData.password}
                    className="w-full bg-gradient-to-r from-[#870d23] to-[#a01129] text-white font-bold py-4 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</> : 'Continue to Plan Selection'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'new' && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Account</h2>
                <p className="text-gray-600 mb-6">🎉 Start your 14-day free trial with full access</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <input
                      type="password"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      placeholder="Create a strong password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company/Business Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={userData.companyName}
                        onChange={(e) => setUserData({ ...userData, companyName: e.target.value })}
                        placeholder="Your Company Name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Type (Optional)</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={userData.businessType}
                        onChange={(e) => setUserData({ ...userData, businessType: e.target.value })}
                        placeholder="Real Estate, Education, Healthcare, etc."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Team Size (Optional)</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <select
                        value={userData.teamSize}
                        onChange={(e) => setUserData({ ...userData, teamSize: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                      >
                        <option value="">Select team size</option>
                        <option value="1-5">1-5 people</option>
                        <option value="6-20">6-20 people</option>
                        <option value="21-50">21-50 people</option>
                        <option value="50+">50+ people</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={handleRegisterUser}
                    disabled={loading || !userData.name || !userData.email || !userData.password || !userData.phone || !userData.companyName}
                    className="w-full bg-gradient-to-r from-[#870d23] to-[#a01129] text-white font-bold py-4 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating Account...</> : 'Create Account & Continue'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="max-w-5xl mx-auto">
            {verifiedUser?.isNew && (
              <div className="bg-[#fdf2f4] border border-[#f5c0cb] rounded-lg p-4 mb-6">
                <p className="text-[#870d23]">✅ Account created successfully!</p>
                <p className="text-[#870d23] text-sm mt-2">📧 Welcome email sent to {userData.email}</p>
                <p className="text-blue-700 text-sm mt-2">🎁 You have 14 days free trial with full access. After trial ends, upgrade your plan to continue using the system.</p>
              </div>
            )}
            {verifiedUser?.user && !verifiedUser?.isNew && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">✅ Welcome back, <strong>{verifiedUser.user.name}</strong>!</p>
                <p className="text-blue-700 text-sm mt-2">Manage your CRM subscription and team members.</p>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActivePaymentTab('plan')}
                className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all ${activePaymentTab === 'plan'
                  ? 'bg-gradient-to-r from-[#870d23] to-[#a01129] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
              >
                Choose Your CRM Plan
              </button>
              <button
                onClick={() => setActivePaymentTab('users')}
                className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all ${activePaymentTab === 'users'
                  ? 'bg-gradient-to-r from-[#870d23] to-[#a01129] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
              >
                Add Team Members
              </button>
            </div>

            {/* Plan Selection Tab */}
            {activePaymentTab === 'plan' && (
              <>
                {/* Current Plan Display */}
                {currentPlanInfo && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Current Plan</h3>
                        <p className="text-2xl font-bold text-[#870d23] capitalize">{currentPlanInfo.planName} Plan</p>
                        <p className="text-gray-600 mt-2">
                          Users: {currentPlanInfo.currentUsage?.users ?? 0} / {currentPlanInfo.planLimits?.users ?? 0} •
                          Leads: {currentPlanInfo.currentUsage?.leads ?? 0} / {currentPlanInfo.planLimits?.leads === -1 ? '∞' : (currentPlanInfo.planLimits?.leads ?? 0)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Monthly Fee</p>
                        <p className="text-xl font-bold text-gray-900">
                          ₹{currentPlanInfo.pricing?.monthly || plans.find(p => p.id === currentPlanInfo.planName)?.platformFee || 0}
                        </p>
                      </div>
                    </div>

                    {/* Usage Statistics */}
                    <UsageStatsCard
                      currentUsage={currentPlanInfo.currentUsage}
                      planLimits={currentPlanInfo.planLimits}
                    />

                    {/* Last Billed / Next Due */}
                    {subscriptionInfo && (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
                          <p className="text-xs text-gray-400 mb-1">Last Billed</p>
                          <p className="text-sm font-bold text-gray-800">
                            {subscriptionInfo.lastPaymentDate ? new Date(subscriptionInfo.lastPaymentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                          </p>
                        </div>
                        <div className={`rounded-xl border p-3 ${subscriptionInfo.nextBillingDate && (new Date(subscriptionInfo.nextBillingDate).getTime() - Date.now()) <= 7 * 86400000 ? 'bg-red-50 border-red-200' : 'bg-[#fdf2f4] border-[#f5c0cb]'}`}>
                          <p className="text-xs text-gray-400 mb-1">Next Due {subscriptionInfo.billingCycle ? `(${subscriptionInfo.billingCycle})` : ''}</p>
                          <p className={`text-sm font-bold ${subscriptionInfo.nextBillingDate && (new Date(subscriptionInfo.nextBillingDate).getTime() - Date.now()) <= 7 * 86400000 ? 'text-red-700' : 'text-[#870d23]'}`}>
                            {subscriptionInfo.nextBillingDate ? new Date(subscriptionInfo.nextBillingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                          </p>
                          {subscriptionInfo.nextBillingDate && (() => { const d = Math.max(0, Math.round((new Date(subscriptionInfo.nextBillingDate).getTime() - Date.now()) / 86400000)); if (d > 30) return null; return <p className={`text-xs mt-0.5 font-semibold ${d <= 7 ? 'text-red-600' : 'text-[#870d23]'}`}>{d === 0 ? 'Due today!' : `${d} day${d !== 1 ? 's' : ''} left`}</p> })()}
                        </div>
                      </div>
                    )}

                    {/* Billing History */}
                    <BillingHistoryCard paymentHistory={paymentHistory} />

                    {/* Subscription Progress */}
                    {subscriptionInfo && (
                      <SubscriptionProgressBar billing={subscriptionInfo} />
                    )}
                  </div>
                )}

                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Upgrade or Renew Your Plan</h2>

                {/* Billing cycle toggle */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>Monthly</span>
                  <button
                    onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                    className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${billingCycle === 'yearly' ? 'bg-[#870d23]' : 'bg-gray-300'
                      }`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'
                      }`} />
                  </button>
                  <span className={`text-sm font-semibold ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>Yearly</span>
                  {billingCycle === 'yearly' && (
                    <span className="bg-[#fce8ec] text-[#870d23] text-xs font-bold px-2.5 py-1 rounded-full border border-[#f5c0cb]">Save up to 15%</span>
                  )}
                </div>

                {billingCycle === 'yearly' && (
                  <div className="bg-[#fdf2f4] border border-[#f5c0cb] rounded-xl p-3 mb-6 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#870d23] flex-shrink-0" />
                    <p className="text-sm font-semibold text-[#870d23]">🎉 Yearly billing active — pay once and save up to 15% vs monthly!</p>
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div key={plan.id} className={`bg-white rounded-2xl shadow-xl p-6 cursor-pointer transition-all ${selectedPlan === plan.id ? 'ring-4 ring-[#870d23] scale-105' : 'hover:shadow-2xl'} ${plan.popular ? 'relative' : ''}`} onClick={() => setSelectedPlan(plan.id)}>
                      {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#870d23] text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>}
                      {billingCycle === 'yearly' && (
                        <div className="bg-[#870d23] text-white text-xs font-bold text-center py-1 rounded-t-xl -mx-6 -mt-6 mb-4 tracking-wide">
                          SAVE {YEARLY_DISCOUNTS[plan.id] || 0}% — YEARLY PLAN
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-1">
                        <span className="text-4xl font-bold text-[#870d23]">₹{getDisplayPrice(plan).toLocaleString('en-IN')}</span>
                        <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-gray-400 line-through">₹{(plan.platformFee * 12).toLocaleString('en-IN')}/year</span>
                          <span className="text-xs font-bold text-[#870d23]">≈ ₹{getMonthlyEquiv(plan).toLocaleString('en-IN')}/mo</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-500 mb-4">+ 18% GST</p>
                      <div className="mb-4 text-sm text-gray-600">
                        <p>Platform Fee: ₹{plan.platformFee}/month</p>
                        <p>Extra Users: ₹{plan.extraUserPrice}/user/month</p>
                        <p>Lead Limit: {plan.leadLimit === -1 ? 'Unlimited' : `${plan.leadLimit} (₹${plan.leadOveragePrice}/extra lead)`}</p>
                        <p>Users Included: {plan.id === 'enterprise' ? '12 included' : `Up to ${plan.userLimit}`}</p>
                        {plan.facebookPages > 0 && <p>Facebook Pages: {plan.facebookPages}</p>}
                      </div>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-[#870d23] flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      {selectedPlan === plan.id && <div className="text-center text-[#870d23] font-bold">✓ Selected</div>}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Team Members Tab */}
            {activePaymentTab === 'users' && (
              <>
                {/* Current Plan Display */}
                {currentPlanInfo && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Your Current Plan</h3>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xl font-bold text-[#870d23] capitalize">{currentPlanInfo.planName} Plan</p>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${billingCycle === 'yearly' ? 'bg-[#fce8ec] text-[#870d23]' : 'bg-blue-100 text-blue-700'
                            }`}>
                            {billingCycle === 'yearly' ? 'Yearly' : 'Monthly'}
                          </span>
                        </div>
                        {/* Dynamic price based on billing cycle */}
                        {(() => {
                          const plan = plans.find(p => p.id === currentPlanInfo.planName)
                          if (!plan) return null
                          const monthlyPrice = plan.platformFee
                          const yearlyPrice = getDisplayPrice(plan)
                          const extraUserMonthly = plan.extraUserPrice
                          const extraUserYearly = getExtraUserPrice(plan.id, 'yearly')
                          return (
                            <div className="mt-2 space-y-1">
                              <p className="text-2xl font-black text-gray-900">
                                ₹{billingCycle === 'yearly' ? yearlyPrice.toLocaleString('en-IN') : monthlyPrice.toLocaleString('en-IN')}
                                <span className="text-sm font-normal text-gray-500 ml-1">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                              </p>
                              {billingCycle === 'yearly' && (
                                <p className="text-xs text-[#870d23] font-semibold">
                                  ≈ ₹{Math.round(yearlyPrice / 12).toLocaleString('en-IN')}/mo · Save {YEARLY_DISCOUNTS[plan.id] || 0}%
                                </p>
                              )}
                              <p className="text-xs text-gray-500">
                                Extra user: ₹{billingCycle === 'yearly' ? extraUserYearly.toLocaleString('en-IN') + '/user/year' : extraUserMonthly.toLocaleString('en-IN') + '/user/month'}
                              </p>
                            </div>
                          )
                        })()}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {/* Billing cycle toggle */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                          <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-blue-500 text-white shadow' : 'text-gray-500 hover:text-gray-700'
                              }`}
                          >
                            Monthly
                          </button>
                          <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${billingCycle === 'yearly' ? 'bg-[#870d23] text-white shadow' : 'text-gray-500 hover:text-gray-700'
                              }`}
                          >
                            Yearly
                          </button>
                        </div>
                        <button
                          onClick={() => setActivePaymentTab('plan')}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                        >
                          Change Plan
                        </button>
                      </div>
                    </div>

                    {/* Usage Statistics */}
                    <UsageStatsCard
                      currentUsage={currentPlanInfo.currentUsage}
                      planLimits={currentPlanInfo.planLimits}
                    />

                    {/* Billing History */}
                    <BillingHistoryCard paymentHistory={paymentHistory} />

                    {/* Subscription Progress */}
                    {subscriptionInfo && (
                      <SubscriptionProgressBar billing={subscriptionInfo} />
                    )}
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Manage Team Members</h3>

                  {(() => {
                    const planUserLimit = currentPlanInfo?.planLimits?.users || 0
                    const PLAN_BASE: Record<string, number> = { starter: 3, professional: 8, enterprise: 12, pro: 10, basic: 2 }
                    const basePlanLimit = PLAN_BASE[currentPlanInfo?.planName] || planUserLimit
                    const extraUserPrice = plans.find(p => p.id === currentPlanInfo?.planName)?.extraUserPrice || 0
                    const totalSelected = currentUserCount + extraUsers
                    const paidSlots = Math.max(0, planUserLimit - basePlanLimit) // already paid extra slots
                    const emptySlots = Math.max(0, planUserLimit - currentUserCount) // unused slots
                    const paidExtras = Math.max(0, totalSelected - planUserLimit) // new extras to pay
                    const atPlanLimit = totalSelected >= planUserLimit

                    return (
                      <>
                        {/* Current slot summary */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-center">
                            <p className="text-xs text-blue-500 font-medium mb-1">Active Users</p>
                            <p className="text-2xl font-black text-blue-700">{currentUserCount}</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 text-center">
                            <p className="text-xs text-gray-500 font-medium mb-1">Plan Limit</p>
                            <p className="text-2xl font-black text-gray-700">{planUserLimit}</p>
                            <p className="text-xs text-gray-400">{basePlanLimit} base + {paidSlots} paid</p>
                          </div>
                          <div className={`rounded-xl border p-3 text-center ${emptySlots > 0 ? 'bg-[#fdf2f4] border-[#f5c0cb]' : 'bg-orange-50 border-orange-200'
                            }`}>
                            <p className={`text-xs font-medium mb-1 ${emptySlots > 0 ? 'text-[#870d23]' : 'text-orange-500'
                              }`}>Free Slots</p>
                            <p className={`text-2xl font-black ${emptySlots > 0 ? 'text-[#870d23]' : 'text-orange-700'
                              }`}>{emptySlots}</p>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-700">User Slots</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                              {totalSelected} / {planUserLimit} plan limit
                            </span>
                          </div>
                          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(100, (totalSelected / Math.max(planUserLimit, totalSelected)) * 100)}%`,
                                backgroundColor: paidExtras > 0 ? '#f97316' : '#870d23'
                              }}
                            />
                          </div>
                          <div className="flex justify-between mt-1.5">
                            <span className="text-xs text-gray-500">{currentUserCount} active</span>
                            <span className="text-xs font-semibold" style={{ color: paidExtras > 0 ? '#f97316' : '#870d23' }}>
                              {paidExtras > 0 ? `${paidExtras} paid extra${paidExtras !== 1 ? 's' : ''}` : `${emptySlots} free slot${emptySlots !== 1 ? 's' : ''} available`}
                            </span>
                          </div>
                        </div>

                        {/* Add users counter */}
                        <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div>
                            <p className="text-gray-700 font-semibold">Add More Users</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {paidExtras > 0
                                ? billingCycle === 'yearly'
                                  ? <span className="text-orange-600 font-semibold">{paidExtras} beyond plan limit → ₹{getExtraUserPrice(currentPlanInfo?.planName, 'yearly').toLocaleString('en-IN')}/slot/year + GST</span>
                                  : <span className="text-orange-600 font-semibold">{paidExtras} beyond plan limit → ₹{(paidExtras * extraUserPrice).toLocaleString('en-IN')}/mo + GST</span>
                                : <span className="text-[#870d23] font-semibold">Within plan limit — no extra charge</span>
                              }
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={() => handleUserCountChange(-1)} disabled={extraUsers === 0}
                              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-100 disabled:opacity-40">
                              -
                            </button>
                            <span className="text-xl font-black min-w-[3rem] text-center">{totalSelected}</span>
                            <button onClick={() => handleUserCountChange(1)}
                              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-colors ${atPlanLimit ? 'border-orange-400 text-orange-500 hover:bg-orange-50' : 'border-[#870d23] text-[#870d23] hover:bg-[#fdf2f4]'
                                }`}>
                              +
                            </button>
                          </div>
                        </div>

                        {/* Reduce empty slots */}
                        {emptySlots > 0 && extraUsers === 0 && (
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl mb-4">
                            <p className="text-sm font-semibold text-yellow-800 mb-2">
                              💡 You have {emptySlots} unused slot{emptySlots !== 1 ? 's' : ''} (paid but empty)
                            </p>
                            <p className="text-xs text-yellow-700 mb-3">
                              You can release these slots to reduce your monthly cost. Each slot costs ₹{extraUserPrice}/month.
                            </p>
                            <div className="flex items-center gap-3">
                              <select
                                id="slotsToRemove"
                                className="flex-1 border border-yellow-300 rounded-lg px-3 py-2 text-sm bg-white"
                                defaultValue="1"
                              >
                                {Array.from({ length: Math.min(emptySlots, paidSlots) }, (_, i) => i + 1).map(n => (
                                  <option key={n} value={n}>Remove {n} slot{n !== 1 ? 's' : ''} (−₹{(n * extraUserPrice).toLocaleString('en-IN')}/mo)</option>
                                ))}
                              </select>
                              <button
                                onClick={() => {
                                  const sel = document.getElementById('slotsToRemove') as HTMLSelectElement
                                  setConfirmReleaseSlots(parseInt(sel.value))
                                }}
                                disabled={reducingSlots}
                                className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 disabled:opacity-50 text-sm"
                              >
                                {reducingSlots ? 'Removing...' : 'Release Slots'}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Users list with delete */}
                        {orgUsers.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <Users className="w-4 h-4" /> Team Members ({orgUsers.length})
                            </p>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                              {orgUsers.map((u) => (
                                <div key={u._id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                                  <div>
                                    <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                                    <p className="text-xs text-gray-500">{u.email} • {u.role}</p>
                                  </div>
                                  <button
                                    onClick={() => setConfirmDeleteUser(u)}
                                    className="text-xs text-red-500 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 border border-red-200 transition-colors"
                                  >
                                    Delete
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )
                  })()}
                </div>

              </>
            )}

            {/* Delete confirmation modal — outside all tab blocks, renders instantly from any tab */}
            {confirmDeleteUser && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete User?</h3>
                  <p className="text-sm text-gray-600 text-center mb-3">
                    You are about to delete <strong>{confirmDeleteUser.name}</strong>
                    <span className="block text-xs text-gray-400 mt-0.5">{confirmDeleteUser.email}</span>
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-xs text-red-700 font-semibold text-center">
                      ⚠️ All data under this user (leads, calls, notes) will be permanently erased.
                      This action cannot be undone.
                    </p>
                  </div>
                  {/* Password confirmation */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Enter your admin password to confirm
                    </label>
                    <input
                      type="password"
                      value={deletePassword}
                      onChange={e => setDeletePassword(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleDeleteUser(confirmDeleteUser)}
                      placeholder="Your password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setConfirmDeleteUser(null); setDeletePassword('') }}
                      className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteUser(confirmDeleteUser)}
                      disabled={deletingUserId === confirmDeleteUser._id || !deletePassword.trim()}
                      className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {deletingUserId === confirmDeleteUser._id
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</>
                        : 'Yes, Delete'
                      }
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Release slots confirmation modal */}
            {confirmReleaseSlots > 0 && (() => {
              const extraUserPrice = plans.find(p => p.id === currentPlanInfo?.planName)?.extraUserPrice || 0
              const saving = confirmReleaseSlots * extraUserPrice
              const currentLimit = currentPlanInfo?.planLimits?.users || 0
              const newLimit = currentLimit - confirmReleaseSlots
              return (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Release {confirmReleaseSlots} User Slot{confirmReleaseSlots !== 1 ? 's' : ''}?</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Current limit</span>
                        <span className="font-bold text-gray-800">{currentLimit} users</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Slots to release</span>
                        <span className="font-bold text-red-600">−{confirmReleaseSlots}</span>
                      </div>
                      <div className="border-t border-yellow-300 pt-2 flex justify-between text-sm">
                        <span className="text-gray-600">New limit</span>
                        <span className="font-bold text-[#870d23]">{newLimit} users</span>
                      </div>
                      <div className="mt-3 bg-[#fdf2f4] border border-[#f5c0cb] rounded-lg p-2 text-center">
                        <p className="text-sm font-bold text-[#870d23]">
                          💰 You will save ₹{saving.toLocaleString('en-IN')}/month
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-center mb-4">
                      These slots will be removed from your plan. You can purchase them again later if needed.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setConfirmReleaseSlots(0)}
                        className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          const n = confirmReleaseSlots
                          setConfirmReleaseSlots(0)
                          await handleReduceSlots(n)
                        }}
                        disabled={reducingSlots}
                        className="flex-1 py-3 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {reducingSlots ? <><Loader2 className="w-4 h-4 animate-spin" /> Releasing...</> : 'Yes, Release'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Billing Summary — always visible on plan tab, dynamic on user tab */}
            {activePaymentTab === 'plan' && currentPlanInfo && (() => {
              const selPlan = plans.find(p => p.id === selectedPlan)
              if (!selPlan) return null

              const PLAN_BASE: Record<string, number> = { starter: 3, professional: 8, enterprise: 12, pro: 10, basic: 2 }
              const newPlanBase = PLAN_BASE[selectedPlan] || selPlan.userLimit
              const activeUsers = currentUserCount  // actual active users in org

              // Extra users to charge = active users BEYOND the new plan's base limit
              // NOT based on current limit — only charge for users that exceed the new plan
              const currentLimit = currentPlanInfo?.planLimits?.users || 0
              const extraUsersOnNewPlan = Math.max(0, activeUsers - newPlanBase)
              const extraUserCharge = extraUsersOnNewPlan * getExtraUserPrice(selPlan.id, billingCycle)

              const planFee = getDisplayPrice(selPlan)
              // Use currentMonthOverage (live overage) + totalUnpaidOverage (previous unpaid months)
              const currentMonthOverage = currentPlanInfo?.overageInfo?.currentMonthOverage || 0
              const previousUnpaidOverage = currentPlanInfo?.overageInfo?.totalUnpaidOverage || 0
              const overageRate = currentPlanInfo?.overageInfo?.overageRate || 1
              const overageAmt = (currentMonthOverage + previousUnpaidOverage) * overageRate
              const subtotal = planFee + extraUserCharge + overageAmt
              const gst = Math.round(subtotal * 0.18)
              const total = subtotal + gst

              const planIdx = (id: string) => plans.findIndex(p => p.id === id)
              const isSamePlan = selectedPlan === currentPlanInfo.planName
              const isUpgrade = planIdx(selectedPlan) > planIdx(currentPlanInfo.planName)
              const isDowngrade = planIdx(selectedPlan) < planIdx(currentPlanInfo.planName)

              // Users that need to be deleted before downgrade is allowed
              const usersToDelete = isDowngrade ? Math.max(0, activeUsers - newPlanBase) : 0
              const canProceed = usersToDelete === 0

              // Reduce slots state for plan tab
              const emptySlots = Math.max(0, currentLimit - activeUsers)
              const paidSlots = Math.max(0, currentLimit - (PLAN_BASE[currentPlanInfo.planName] || currentLimit))

              return (
                <div className="mt-6 space-y-4">

                  {/* Users management panel — shown inline on plan tab */}
                  {(isDowngrade || extraUsersOnNewPlan > 0 || emptySlots > 0) && (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                      <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4" /> Team Members Management
                        <span className="ml-auto text-xs font-normal text-gray-500">{activeUsers} active / {currentLimit} limit</span>
                      </h4>

                      {/* Downgrade warning with users to delete */}
                      {isDowngrade && usersToDelete > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                          <p className="text-sm font-bold text-red-800 mb-1">
                            ⚠️ Cannot downgrade yet — delete {usersToDelete} user{usersToDelete !== 1 ? 's' : ''} first
                          </p>
                          <p className="text-xs text-red-700">
                            {selPlan.name} supports {newPlanBase} users. You have {activeUsers} active users.
                            Delete {usersToDelete} user{usersToDelete !== 1 ? 's' : ''} below to proceed.
                          </p>
                        </div>
                      )}

                      {/* Reduce empty slots */}
                      {emptySlots > 0 && paidSlots > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                          <p className="text-sm font-semibold text-yellow-800 mb-1">
                            💡 {emptySlots} unused paid slot{emptySlots !== 1 ? 's' : ''} — save ₹{(emptySlots * selPlan.extraUserPrice).toLocaleString('en-IN')}/month
                          </p>
                          <p className="text-xs text-yellow-700 mb-3">Release empty slots to reduce your renewal cost.</p>
                          <div className="flex items-center gap-3">
                            <select id="planTabSlotsToRemove"
                              className="flex-1 border border-yellow-300 rounded-lg px-3 py-2 text-sm bg-white">
                              {Array.from({ length: Math.min(emptySlots, paidSlots) }, (_, i) => i + 1).map(n => (
                                <option key={n} value={n}>
                                  Remove {n} slot{n !== 1 ? 's' : ''} (−₹{(n * selPlan.extraUserPrice).toLocaleString('en-IN')}/mo)
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => {
                                const sel = document.getElementById('planTabSlotsToRemove') as HTMLSelectElement
                                setConfirmReleaseSlots(parseInt(sel.value))
                              }}
                              disabled={reducingSlots}
                              className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 disabled:opacity-50 text-sm whitespace-nowrap"
                            >
                              {reducingSlots ? 'Removing...' : 'Release Slots'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Users list with delete */}
                      {orgUsers.length > 0 && (
                        <div className="space-y-2 max-h-56 overflow-y-auto">
                          {orgUsers.map((u) => (
                            <div key={u._id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-100">
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                                <p className="text-xs text-gray-500">{u.email} • {u.role}</p>
                              </div>
                              <button
                                onClick={() => setConfirmDeleteUser(u)}
                                className="text-xs text-red-500 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 border border-red-200 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Billing summary card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-blue-900">Billing Summary</h3>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${isSamePlan ? 'bg-blue-100 text-blue-700' :
                        isUpgrade ? 'bg-[#fce8ec] text-[#870d23]' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                        {isSamePlan ? '🔄 Renew' : isUpgrade ? '⬆️ Upgrade' : '⬇️ Downgrade'} — {selPlan.name}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-blue-800">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{selPlan.name} ({billingCycle})</span>
                        <span className="font-semibold">₹{planFee.toLocaleString('en-IN')}</span>
                      </div>

                      {billingCycle === 'yearly' && (
                        <div className="flex justify-between items-center text-xs text-[#870d23]">
                          <span>Yearly discount ({YEARLY_DISCOUNTS[selectedPlan] || 0}% off)</span>
                          <span>−₹{((selPlan.platformFee * 12) - planFee).toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      {extraUsersOnNewPlan > 0 && (
                        <div className="flex justify-between items-center text-orange-700">
                          <span className="text-sm">
                            Extra Users ({extraUsersOnNewPlan} × ₹{selPlan.extraUserPrice.toLocaleString('en-IN')})
                            <span className="text-xs text-gray-500 ml-1">(beyond {newPlanBase} base)</span>
                          </span>
                          <span className="font-semibold">₹{extraUserCharge.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      {overageAmt > 0 && (
                        <div className="flex justify-between items-center text-red-700">
                          <span className="text-sm">
                            Lead Overages
                            <span className="text-xs text-gray-500 ml-1">
                              ({currentMonthOverage > 0 ? `${currentMonthOverage} extra leads this month` : ''}
                              {currentMonthOverage > 0 && previousUnpaidOverage > 0 ? ' + ' : ''}
                              {previousUnpaidOverage > 0 ? `₹${previousUnpaidOverage} prev. unpaid` : ''}
                              {` @ ₹${overageRate}/lead`})
                            </span>
                          </span>
                          <span className="font-semibold">₹{overageAmt.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>GST (18%)</span>
                        <span>₹{gst.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="border-t border-blue-300 pt-2.5 flex justify-between items-center">
                        <span className="font-bold text-blue-900 text-base">Total Amount</span>
                        <span className="font-black text-xl text-blue-900">₹{total.toLocaleString('en-IN')}</span>
                      </div>

                      {billingCycle === 'yearly' && (
                        <p className="text-xs text-[#870d23] font-semibold text-center pt-1">
                          🎉 You save ₹{((selPlan.platformFee * 12) - planFee).toLocaleString('en-IN')} vs monthly billing!
                        </p>
                      )}

                      {extraUsersOnNewPlan > 0 && (
                        <p className="text-xs text-orange-600 text-center">
                          You have {activeUsers} active users but {selPlan.name} only includes {newPlanBase}.
                          Delete {extraUsersOnNewPlan} user{extraUsersOnNewPlan !== 1 ? 's' : ''} above to remove this charge.
                        </p>
                      )}

                      {isDowngrade && !canProceed && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-red-700 font-bold">
                            ❌ Delete {usersToDelete} user{usersToDelete !== 1 ? 's' : ''} above before you can proceed with this downgrade.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })()}

            {activePaymentTab === 'users' && extraUsers > 0 && (currentUserCount + extraUsers) > (currentPlanInfo?.planLimits?.users || 0) && (() => {
              const planUserLimit = currentPlanInfo?.planLimits?.users || 0
              const paidExtras = Math.max(0, currentUserCount + extraUsers - planUserLimit)
              const monthlyRate = plans.find(p => p.id === currentPlanInfo?.planName)?.extraUserPrice || 0
              const yearlyRatePerSlot = getExtraUserPrice(currentPlanInfo?.planName, 'yearly')
              const pricePerSlot = billingCycle === 'yearly' ? yearlyRatePerSlot : monthlyRate
              const discountPct = YEARLY_EXTRA_USER_DISCOUNTS[currentPlanInfo?.planName] || 0

              const subtotal = paidExtras * pricePerSlot
              const gst = Math.round(subtotal * 0.18)
              const total = subtotal + gst

              return (
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 mt-6">
                  <h3 className="text-lg font-bold text-orange-900 mb-4">Billing Summary — Extra Users</h3>
                  <div className="space-y-2.5 text-orange-800">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        Extra Users ({paidExtras} × ₹{pricePerSlot.toLocaleString('en-IN')}/{billingCycle === 'yearly' ? 'year' : 'month'})
                      </span>
                      <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {billingCycle === 'yearly' && discountPct > 0 && (
                      <div className="flex justify-between items-center text-[#870d23]">
                        <span className="text-sm">Includes {Math.round(discountPct * 100)}% yearly discount</span>
                        <span className="font-semibold">₹{(paidExtras * (monthlyRate * 12 - yearlyRatePerSlot)).toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>GST (18%)</span>
                      <span>₹{gst.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="border-t border-orange-300 pt-2.5 flex justify-between items-center">
                      <span className="font-bold text-orange-900 text-base">Total Amount</span>
                      <span className="font-black text-xl text-orange-900">₹{total.toLocaleString('en-IN')}</span>
                    </div>

                    <p className="text-xs text-orange-600 text-center">
                      {billingCycle === 'yearly'
                        ? `₹${pricePerSlot.toLocaleString('en-IN')}/user charged once for the full year.`
                        : `₹${monthlyRate.toLocaleString('en-IN')}/user/month charged monthly going forward.`
                      }
                    </p>
                  </div>
                </div>
              )
            })()}

            <div className="flex gap-4 mt-8 justify-center">
              <button onClick={() => setStep(1)} className="px-8 py-3 border-2 border-gray-300 rounded-lg font-bold hover:bg-gray-50">Back</button>
              {activePaymentTab === 'users' && extraUsers > 0 && (currentUserCount + extraUsers) <= (currentPlanInfo?.planLimits?.users || 0) ? (
                <div className="px-8 py-3 bg-[#fce8ec] border-2 border-[#f0a0b0] text-[#870d23] font-bold rounded-lg text-center">
                  ✅ Within plan limit — no payment needed
                </div>
              ) : (() => {
                // Check if downgrade is blocked
                const selPlan = plans.find(p => p.id === selectedPlan)
                const PLAN_BASE: Record<string, number> = { starter: 3, professional: 8, enterprise: 12, pro: 10, basic: 2 }
                const newPlanBase = selPlan ? (PLAN_BASE[selectedPlan] || selPlan.userLimit) : 0
                const isDowngrade = activePaymentTab === 'plan' &&
                  plans.findIndex(p => p.id === selectedPlan) < plans.findIndex(p => p.id === currentPlanInfo?.planName)
                const usersToDelete = isDowngrade ? Math.max(0, currentUserCount - newPlanBase) : 0
                const blocked = usersToDelete > 0

                return (
                  <button
                    onClick={handlePayment}
                    disabled={loading || blocked || (activePaymentTab === 'users' && (currentUserCount + extraUsers) <= (currentPlanInfo?.planLimits?.users || 0) && extraUsers === 0)}
                    title={blocked ? `Delete ${usersToDelete} user(s) first` : ''}
                    className="px-8 py-3 bg-gradient-to-r from-[#870d23] to-[#a01129] text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading
                      ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                      : blocked
                        ? `❌ Delete ${usersToDelete} user${usersToDelete !== 1 ? 's' : ''} first`
                        : activePaymentTab === 'users'
                          ? `Pay for ${Math.max(0, currentUserCount + extraUsers - (currentPlanInfo?.planLimits?.users || 0))} Extra User${Math.max(0, currentUserCount + extraUsers - (currentPlanInfo?.planLimits?.users || 0)) !== 1 ? 's' : ''}${billingCycle === 'yearly' ? ' (Yearly)' : ''
                          }`
                          : 'Proceed to Payment'
                    }
                  </button>
                )
              })()}
            </div>
          </div>
        )}

        {step === 3 && paymentSuccess && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-[#fce8ec] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-[#870d23]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful! 🎉</h2>
            <p className="text-lg text-gray-700 mb-6">
              {activePaymentTab === 'users'
                ? `Your team member limit has been increased successfully. You can now add ${extraUsers} more team members.`
                : 'Your CRM subscription has been activated successfully.'
              }
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-blue-800 font-semibold mb-2">
                {activePaymentTab === 'users' ? '👥 Your team member limit has been updated!' : '📱 Your CRM features are now active!'}
              </p>
              <p className="text-blue-700 text-sm">
                {activePaymentTab === 'users'
                  ? 'Go to Team Management in your CRM app to add new team members.'
                  : 'Open your CRM mobile app to access all the premium features and start managing your leads effectively.'
                }
              </p>
            </div>

            {/* Billing dates summary */}
            {subscriptionInfo?.nextBillingDate && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <p className="text-xs text-gray-400 mb-1">Last Payment</p>
                  <p className="text-sm font-bold text-gray-800">
                    {subscriptionInfo.lastPaymentDate
                      ? new Date(subscriptionInfo.lastPaymentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                      : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="bg-[#fdf2f4] rounded-xl border border-[#f5c0cb] p-4">
                  <p className="text-xs text-gray-400 mb-1">Next Due Date {subscriptionInfo?.billingCycle ? `(${subscriptionInfo.billingCycle})` : ''}</p>
                  <p className="text-sm font-bold text-[#870d23]">
                    {new Date(subscriptionInfo.nextBillingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            )}

            <p className="text-gray-600 mb-8">Confirmation email sent to <strong>{verifiedUser?.user?.email || userData.email}</strong></p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fueldigi.crmapp', '_blank')}
                className="bg-gradient-to-r from-[#870d23] to-[#a01129] text-white font-bold px-8 py-4 rounded-lg hover:opacity-90"
              >
                Open Mobile App
              </button>
              <button
                onClick={() => router.push('/')}
                className="border-2 border-[#870d23] text-[#870d23] font-bold px-8 py-4 rounded-lg hover:bg-[#a01129] hover:text-white transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
