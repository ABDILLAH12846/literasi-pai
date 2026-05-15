import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "~/server/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("Video")
    .select("*, Category(id, name, slug)")
    .eq("id", Number(id))
    .eq("published", true)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Video tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(data);
}
