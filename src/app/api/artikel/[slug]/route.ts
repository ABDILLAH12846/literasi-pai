import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "~/server/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("Article")
    .select("*, Category(id, name, slug)")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(data);
}
