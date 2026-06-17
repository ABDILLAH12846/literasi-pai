import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "~/server/supabase";
import type { BookReviewBody } from "~/types";

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
    .from("BookReview")
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
  const body = raw as BookReviewBody;
  const { bookTitle, author, review, rating, coverImage, categoryId, about, reviewer, fit_to, quotes } = body;

  const { data, error } = await supabase
    .from("BookReview")
    .insert({
      bookTitle,
      author,
      review,
      rating: Number(rating),
      coverImage,
      categoryId: Number(categoryId),
      about,
      reviewer,
      fit_to,
      quotes,
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
  const { id, bookTitle, author, review, rating, coverImage, categoryId, about, reviewer, fit_to, quotes } = raw as {
    id: number;
  } & BookReviewBody;

  if (!id) {
    return NextResponse.json({ error: "ID review diperlukan" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("BookReview")
    .update({
      bookTitle,
      author,
      review,
      rating: Number(rating),
      coverImage,
      categoryId: Number(categoryId),
      about,
      reviewer,
      fit_to,
      quotes,
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
    return NextResponse.json({ error: "ID review diperlukan" }, { status: 400 });
  }

  const { error } = await supabase
    .from("BookReview")
    .delete()
    .eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
