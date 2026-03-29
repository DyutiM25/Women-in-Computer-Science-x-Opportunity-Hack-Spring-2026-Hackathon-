import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase-server'

const PRICES = {
  enrollment: 5000,
  certification: 3000,
}

const LABELS = {
  enrollment: 'WIAL eLearning enrollment fee',
  certification: 'WIAL coach certification fee',
}

export async function POST(req: NextRequest) {
  try {
    const { chapterId, coachId, paymentType } = await req.json()

    if (!chapterId || !coachId || !paymentType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['enrollment', 'certification'].includes(paymentType)) {
      return NextResponse.json({ error: 'Invalid payment type' }, { status: 400 })
    }

    const { data: coach } = await getSupabaseAdmin()
      .from('coaches')
      .select('full_name, email')
      .eq('id', coachId)
      .single()

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: LABELS[paymentType as keyof typeof LABELS],
              description: coach ? `Coach: ${coach.full_name}` : undefined,
            },
            unit_amount: PRICES[paymentType as keyof typeof PRICES],
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin`,
      metadata: { chapterId, coachId, paymentType },
      customer_email: coach?.email ?? undefined,
    })

    await getSupabaseAdmin().from('payments').insert({
      chapter_id: chapterId,
      coach_id: coachId,
      payment_type: paymentType,
      amount_usd: PRICES[paymentType as keyof typeof PRICES],
      stripe_session_id: session.id,
      status: 'pending',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
