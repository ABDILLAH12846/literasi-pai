import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "~/server/supabase";
import type { ArticleBody } from "~/types";

async function getAuthenticatedUser(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return null;
  }
  return data.user;
}

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");

  let query = supabase
    .from("Article")
    .select("*, Category(id, name, slug)")
    .eq("published", true)
    .order("createdAt", { ascending: false });

  if (categorySlug) {
    query = query.eq("Category.slug", categorySlug);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const user = await getAuthenticatedUser(supabase);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized — silakan login terlebih dahulu" }, { status: 401 });
  }

  const raw = await req.json();
  const body = raw as ArticleBody;
  const { title, content, excerpt, imageUrl, categoryId } = body;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data, error } = await supabase
    .from("Article")
    .insert({
      title,
      slug,
      content,
      excerpt,
      imageUrl,
      categoryId: Number(categoryId),
      createdById: user.id,
      published: true,
    })
    .select("*, Category(id, name, slug)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const user = await getAuthenticatedUser(supabase);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await req.json();
  const { id, title, content, excerpt, imageUrl, categoryId } = raw as {
    id: number;
  } & ArticleBody;

  if (!id) {
    return NextResponse.json({ error: "ID artikel diperlukan" }, { status: 400 });
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data, error } = await supabase
    .from("Article")
    .update({
      title,
      slug,
      content,
      excerpt,
      imageUrl,
      categoryId: Number(categoryId),
    })
    .eq("id", Number(id))
    .select("*, Category(id, name, slug)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const user = await getAuthenticatedUser(supabase);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID artikel diperlukan" }, { status: 400 });
  }

  const { error } = await supabase
    .from("Article")
    .delete()
    .eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
