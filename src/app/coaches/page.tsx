'use client'

import { useEffect, useState, useDeferredValue } from 'react'
import { CoachCard } from '@/components/coaches/CoachCard'
import { SearchBar } from '@/components/coaches/SearchBar'
import type { Coach } from '@/lib/site-data'

type ApiCoach = {
  id: string
  full_name: string
  photo_url?: string | null
  cert_level?: string | null
  location?: string | null
  email?: string | null
  bio?: string | null
  chapters?: { name?: string | null; slug?: string | null } | null
}

export default function CoachesPage() {
  const [apiCoaches, setApiCoaches] = useState<ApiCoach[]>([])
  const [seedCoaches, setSeedCoaches] = useState<Coach[]>([])
  const [query, setQuery] = useState('')
  const [chapter, setChapter] = useState('All chapters')
  const [certification, setCertification] = useState('All certifications')
  const [loading, setLoading] = useState(true)

  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/search?q=`)
        const data = await res.json()
        if (data.source === 'seed-data') {
          setSeedCoaches(data.results ?? [])
        } else {
          setApiCoaches(data.results ?? [])
        }
      } catch {
        // fallback to empty
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (deferredQuery === '' && chapter === 'All chapters' && certification === 'All certifications') return
    async function search() {
      try {
        const params = new URLSearchParams({ q: deferredQuery, chapter, certification })
        const res = await fetch(`/api/search?${params}`)
        const data = await res.json()
        if (data.source === 'seed-data') {
          setSeedCoaches(data.results ?? [])
        } else {
          setApiCoaches(data.results ?? [])
        }
      } catch {
        // keep existing results
      }
    }
    search()
  }, [deferredQuery, chapter, certification])

  const coaches = apiCoaches.length > 0 ? apiCoaches : seedCoaches

  const chapterOptions = Array.from(
    new Set(
      seedCoaches.map((c) => c.chapter).concat(apiCoaches.map((c) => c.chapters?.name ?? ''))
    )
  ).filter(Boolean).sort()

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
          Coach Directory
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
          Searchable, chapter-aware coach profiles.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-700">
          Search by coach name, location, chapter, and certification level.
        </p>
      </section>

      <SearchBar
        query={query}
        chapter={chapter}
        certification={certification}
        chapterOptions={chapterOptions}
        onQueryChange={setQuery}
        onChapterChange={setChapter}
        onCertificationChange={setCertification}
        resultCount={coaches.length}
      />

      {loading ? (
        <p className="text-slate-500">Loading coaches…</p>
      ) : coaches.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coaches.map((coach) => (
            <CoachCard key={'id' in coach ? coach.id : coach.email} coach={coach as any} />
          ))}
        </section>
      ) : (
        <section className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">No coaches match those filters</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Try a different name, location, chapter, or certification filter.
          </p>
        </section>
      )}
    </main>
  )
}
