import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseServerPublicClient } from "@/lib/supabase";

export async function getSupabaseServerAuthClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicClient = getSupabaseServerPublicClient();

  if (!url || !publicClient) {
    return null;
  }

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!key) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components can't always write cookies during render.
        }
      },
    },
  });
}
