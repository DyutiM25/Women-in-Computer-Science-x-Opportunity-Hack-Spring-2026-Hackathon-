import Link from "next/link";
import type { Coach as SiteCoach } from "@/lib/site-data";

type CoachCardProps = {
  coach: SiteCoach | CoachDirectoryItem;
};

export type CoachDirectoryItem = {
  id: string;
  full_name: string;
  photo_url?: string | null;
  cert_level?: string | null;
  location?: string | null;
  email?: string | null;
  bio?: string | null;
  chapters?: {
    name?: string | null;
    slug?: string | null;
  } | null;
};

function isDirectoryCoach(coach: SiteCoach | CoachDirectoryItem): coach is CoachDirectoryItem {
  return "full_name" in coach;
}

export function CoachCard({ coach }: CoachCardProps) {
  const isLiveCoach = isDirectoryCoach(coach);
  const name = isLiveCoach ? coach.full_name : coach.name;
  const chapter = isLiveCoach ? coach.chapters?.name ?? "" : coach.chapter;
  const certification = isLiveCoach ? coach.cert_level ?? "" : coach.certification;
  const location = isLiveCoach ? coach.location ?? "" : coach.location;
  const email = isLiveCoach ? coach.email ?? "" : coach.email;
  const bio = isLiveCoach ? coach.bio ?? "" : coach.bio;
  const photoUrl = isLiveCoach
    ? coach.photo_url || "/images/wial-usa-placeholder.png"
    : "/images/wial-usa-placeholder.png";

  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={photoUrl}
          alt={name}
          className="h-20 w-20 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-800">
            {chapter}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            {name}
          </h2>
          <span className="mt-3 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">
            {certification}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-700">{bio}</p>

      <dl className="mt-5 space-y-2 text-sm text-slate-600">
        <div className="flex justify-between gap-3">
          <dt>Location</dt>
          <dd>{location}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Contact</dt>
          <dd>{email}</dd>
        </div>
      </dl>

      {isLiveCoach ? (
        <Link
          href={`/coaches/${coach.id}`}
          className="mt-5 inline-block text-sm font-semibold text-red-600 transition hover:text-red-700"
        >
          View Profile
        </Link>
      ) : null}
    </article>
  );
}
