'use client'

import { useEffect, useState } from 'react'
import { AdminWorkspaceNav } from '@/components/admin/AdminWorkspaceNav'
import { getSupabaseBrowserClient } from '@/lib/supabase'

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

export default function PaymentsPage() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const sb = getSupabaseBrowserClient()
      if (!sb) return
      const [{ data: coachData }, { data: paymentData }] = await Promise.all([
        sb.from('coaches').select('id, full_name, cert_level, location, chapter_id').eq('is_approved', true),
        sb.from('payments').select('coach_id, payment_type, status'),
      ])
      setCoaches(coachData ?? [])
      setPayments(paymentData ?? [])
      setLoading(false)
    }
    load()
  }, [])

  function getPaymentStatus(coachId: string, paymentType: string): string {
    return payments.find((p) => p.coach_id === coachId && p.payment_type === paymentType)?.status ?? 'unpaid'
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

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">Admin</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Coach Payments</h1>
        <AdminWorkspaceNav currentPath="/admin/payments" showAccessLink={false} />
      </section>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                {['Coach', 'Cert level', 'Location', 'Enrollment', 'Certification', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coaches.map((coach) => {
                const enrollStatus = getPaymentStatus(coach.id, 'enrollment')
                const certStatus = getPaymentStatus(coach.id, 'certification')
                const enrollPaid = enrollStatus === 'paid'
                const certPaid = certStatus === 'paid'
                return (
                  <tr key={coach.id} style={{ borderTop: '1px solid #eee' }}>
                    <td style={{ padding: '10px 16px' }}>{coach.full_name}</td>
                    <td style={{ padding: '10px 16px' }}>{coach.cert_level}</td>
                    <td style={{ padding: '10px 16px' }}>{coach.location}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ color: STATUS_COLORS[enrollStatus] ?? '#999', fontWeight: 500 }}>{enrollStatus}</span>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ color: STATUS_COLORS[certStatus] ?? '#999', fontWeight: 500 }}>{certStatus}</span>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <button
                        disabled={enrollPaid}
                        onClick={() => handlePay(coach.id, coach.chapter_id, 'enrollment')}
                        style={{ padding: '6px 12px', fontSize: 13, borderRadius: 6, border: 'none', cursor: enrollPaid ? 'not-allowed' : 'pointer', background: enrollPaid ? '#ddd' : '#cc1f1f', color: enrollPaid ? '#999' : '#fff', marginRight: 8 }}
                      >
                        Pay $50 enrollment
                      </button>
                      <button
                        disabled={certPaid}
                        onClick={() => handlePay(coach.id, coach.chapter_id, 'certification')}
                        style={{ padding: '6px 12px', fontSize: 13, borderRadius: 6, border: 'none', cursor: certPaid ? 'not-allowed' : 'pointer', background: certPaid ? '#ddd' : '#cc1f1f', color: certPaid ? '#999' : '#fff' }}
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
            <p style={{ padding: 24, color: '#666' }}>No approved coaches found.</p>
          )}
        </div>
      )}
    </main>
  )
}
