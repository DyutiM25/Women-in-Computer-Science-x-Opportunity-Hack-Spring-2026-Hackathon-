export const dynamic = 'force-dynamic'

import { getSupabaseAdmin } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>
}) {
  const { chapter: slug } = await params
  const { data: chapter } = await getSupabaseAdmin()
    .from('chapters')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!chapter) notFound()

  return (
    <main>
      {/* Placeholder header — swap for Person A's <Header /> when merged */}
      <div style={{
        background: '#1a1a1a',
        padding: '16px 40px',
        color: '#fff',
        fontSize: 18,
        fontWeight: 500
      }}>
        WIAL — {chapter.name}
      </div>

      {/* Hero */}
      <section style={{
        background: '#cc1f1f',
        color: '#fff',
        padding: '64px 40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>{chapter.name}</h1>
        <p style={{ fontSize: 18, opacity: 0.9 }}>{chapter.description}</p>
      </section>

      {/* Chapter info */}
      <section style={{ maxWidth: 800, margin: '48px auto', padding: '0 40px' }}>
        <h2 style={{ fontSize: 24, marginBottom: 16 }}>About this chapter</h2>
        <p style={{ color: '#444', lineHeight: 1.7 }}>
          {chapter.description}
        </p>
        {chapter.contact_email && (
          <p style={{ marginTop: 24 }}>
            Contact:{' '}
            <a href={`mailto:${chapter.contact_email}`} style={{ color: '#cc1f1f' }}>
              {chapter.contact_email}
            </a>
          </p>
        )}
      </section>

      {/* Placeholder footer — swap for Person A's <Footer /> when merged */}
      <footer style={{
        background: '#1a1a1a',
        color: '#888',
        padding: '24px 40px',
        textAlign: 'center',
        fontSize: 13,
        marginTop: 80
      }}>
        © WIAL Global. All rights reserved.
      </footer>
    </main>
  )
}
