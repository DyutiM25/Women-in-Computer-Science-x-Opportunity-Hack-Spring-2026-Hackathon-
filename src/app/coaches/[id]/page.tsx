import { supabase } from "@/lib/supabase";

export default async function CoachPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await supabase
    .from("coaches")
    .select("id, full_name, photo_url, cert_level, location, bio, email, chapters(name, slug)")
    .eq("id", id)
    .single();

  if (!data) return <div className="p-10">Not found</div>;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">{data.full_name}</h1>
      <img
        src={data.photo_url || "/images/wial-usa-placeholder.png"}
        alt={data.full_name}
        className="mt-4 h-32 w-32 rounded-full object-cover"
      />
      <p className="mt-4">{data.cert_level}</p>
      <p>{data.location}</p>
      <p>{data.email}</p>
      <p className="mt-6 max-w-2xl">{data.bio}</p>
    </main>
  );
}
