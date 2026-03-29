import Link from 'next/link'
import { getStripe } from '@/lib/stripe'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    return <div>Invalid session.</div>
  }

  const session = await getStripe().checkout.sessions.retrieve(session_id)

  const paid = session.payment_status === 'paid'
  const amount = session.amount_total
    ? `$${(session.amount_total / 100).toFixed(2)}`
    : ''

  return (
    <main style={{ maxWidth: 480, margin: '80px auto', padding: '0 24px', fontFamily: 'sans-serif' }}>
      <div style={{
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: 32,
        textAlign: 'center',
      }}>
        {paid ? (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <h1 style={{ fontSize: 22, marginBottom: 8 }}>Payment received</h1>
            <p style={{ color: '#666', marginBottom: 16 }}>{amount} paid successfully</p>
            <p style={{ color: '#666', fontSize: 14 }}>
              A receipt has been sent to {session.customer_email ?? 'your email'}.
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 22 }}>Payment pending</h1>
            <p style={{ color: '#666' }}>We are confirming your payment.</p>
          </>
        )}
        <Link
          href="/admin"
          style={{
            display: 'inline-block',
            marginTop: 24,
            padding: '10px 24px',
            background: '#cc1f1f',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  )
}
