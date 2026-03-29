import type { Coach } from "@/lib/site-data";

type CoachCardProps = {
  coach: Coach;
};

export function CoachCard({ coach }: CoachCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-800">
            {coach.chapter}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            {coach.name}
          </h2>
        </div>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">
          {coach.certification}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-700">{coach.bio}</p>

      <dl className="mt-5 space-y-2 text-sm text-slate-600">
        <div className="flex justify-between gap-3">
          <dt>Location</dt>
          <dd>{coach.location}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Contact</dt>
          <dd>{coach.email}</dd>
        </div>
      </dl>
    </article>
  );
}
