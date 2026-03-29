'use client'

import { useEffect, useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase'

const supabase = getSupabaseBrowserClient()

type Coach = {
  id: string
  full_name: string
  cert_level: string
  location: string
  chapter_id: string
}

type Payment = {
  coach_id: string
  payment_type: string
  status: string
}

const STATUS_COLORS: Record<string, string> = {
  paid: '#2d7a2d',
  pending: '#a06000',
  unpaid: '#999',
  failed: '#cc1f1f',
}

export default function AdminPage() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  async function load() {
    console.log('--- loading coaches ---')
    
    const { data: coachData, error: coachError } = await supabase
      .from('coaches')
      .select('id, full_name, cert_level, location, chapter_id')
      .eq('is_approved', true)

    console.log('coachData:', coachData)
    console.log('coachError:', coachError)

    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .select('coach_id, payment_type, status, amount_usd, paid_at')

    console.log('paymentData:', paymentData)
    console.log('paymentError:', paymentError)

    setCoaches(coachData ?? [])
    setPayments(paymentData ?? [])
    setLoading(false)
  }
  load()
}, [])

  function getPaymentStatus(coachId: string, paymentType: string): string {
    const match = payments.find(
      (p) => p.coach_id === coachId && p.payment_type === paymentType
    )
    return match?.status ?? 'unpaid'
  }

  async function handlePay(coachId: string, chapterId: string, paymentType: 'enrollment' | 'certification') {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chapterId, coachId, paymentType }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  if (loading) {
    return (
      <main style={{ padding: '64px 40px', fontFamily: 'sans-serif', textAlign: 'center', color: '#666' }}>
        Loading…
      </main>
    )
  }

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>Admin — Coach Payments</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
            <th style={th}>Coach</th>
            <th style={th}>Cert level</th>
            <th style={th}>Location</th>
            <th style={th}>Enrollment</th>
            <th style={th}>Certification</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coaches.map((coach) => {
            const enrollStatus = getPaymentStatus(coach.id, 'enrollment')
            const certStatus = getPaymentStatus(coach.id, 'certification')
            const enrollPaid = enrollStatus === 'paid'
            const certPaid = certStatus === 'paid'
            return (
              <tr key={coach.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={td}>{coach.full_name}</td>
                <td style={td}>{coach.cert_level}</td>
                <td style={td}>{coach.location}</td>
                <td style={td}>
                  <span style={{ color: STATUS_COLORS[enrollStatus] ?? '#999', fontWeight: 500 }}>
                    {enrollStatus}
                  </span>
                </td>
                <td style={td}>
                  <span style={{ color: STATUS_COLORS[certStatus] ?? '#999', fontWeight: 500 }}>
                    {certStatus}
                  </span>
                </td>
                <td style={td}>
                  <button
                    disabled={enrollPaid}
                    onClick={() => handlePay(coach.id, coach.chapter_id, 'enrollment')}
                    style={btnStyle(enrollPaid)}
                  >
                    Pay $50 enrollment
                  </button>
                  <button
                    disabled={certPaid}
                    onClick={() => handlePay(coach.id, coach.chapter_id, 'certification')}
                    style={{ ...btnStyle(certPaid), marginLeft: 8 }}
                  >
                    Pay $30 certification
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {coaches.length === 0 && (
        <p style={{ color: '#666', marginTop: 24 }}>No approved coaches found.</p>
      )}
    </main>
  )
}

const th: React.CSSProperties = { padding: '10px 12px', fontWeight: 600 }
const td: React.CSSProperties = { padding: '10px 12px', verticalAlign: 'middle' }

function btnStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: '6px 12px',
    fontSize: 13,
    borderRadius: 6,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? '#ddd' : '#cc1f1f',
    color: disabled ? '#999' : '#fff',
  }
}
