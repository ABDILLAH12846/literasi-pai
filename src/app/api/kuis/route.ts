import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "~/server/supabase";
import type { QuizBody } from "~/types";

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
    .from("Quiz")
    .select("*, Category(id, name, slug), QuizQuestion(*)")
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
  const body = raw as QuizBody;
  const { title, description, categoryId, questions } = body;

  const { data: quiz, error: quizError } = await supabase
    .from("Quiz")
    .insert({
      title,
      description,
      categoryId: Number(categoryId),
      createdById: user.id,
      published: true,
    })
    .select("*, Category(id, name, slug)")
    .single();

  if (quizError) {
    return NextResponse.json({ error: quizError.message }, { status: 500 });
  }

  const quizId = (quiz as unknown as { id: number }).id;

  if (questions && questions.length > 0) {
    const questionsData = questions.map(
      (q, index: number) => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
        order: index,
        quizId,
      })
    );

    const { error: questionsError } = await supabase
      .from("QuizQuestion")
      .insert(questionsData);

    if (questionsError) {
      return NextResponse.json(
        { error: questionsError.message },
        { status: 500 }
      );
    }
  }

  const { data } = await supabase
    .from("Quiz")
    .select("*, Category(id, name, slug), QuizQuestion(*)")
    .eq("id", quizId)
    .single();

  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const user = await getAuthenticatedUser(supabase);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await req.json();
  const { id, title, description, categoryId, questions } = raw as {
    id: number;
  } & QuizBody;

  if (!id) {
    return NextResponse.json({ error: "ID kuis diperlukan" }, { status: 400 });
  }

  const { data: quiz, error: quizError } = await supabase
    .from("Quiz")
    .update({
      title,
      description,
      categoryId: Number(categoryId),
    })
    .eq("id", Number(id))
    .select("*, Category(id, name, slug)")
    .single();

  if (quizError) {
    return NextResponse.json({ error: quizError.message }, { status: 500 });
  }

  const quizId = (quiz as unknown as { id: number }).id;

  // Replace questions: delete old, insert new
  if (questions !== undefined) {
    const { error: delErr } = await supabase
      .from("QuizQuestion")
      .delete()
      .eq("quizId", quizId);

    if (delErr) {
      return NextResponse.json({ error: delErr.message }, { status: 500 });
    }

    if (questions.length > 0) {
      const questionsData = questions.map(
        (q, index: number) => ({
          question: q.question,
          options: q.options,
          answer: q.answer,
          order: index,
          quizId,
        })
      );

      const { error: insErr } = await supabase
        .from("QuizQuestion")
        .insert(questionsData);

      if (insErr) {
        return NextResponse.json({ error: insErr.message }, { status: 500 });
      }
    }
  }

  const { data } = await supabase
    .from("Quiz")
    .select("*, Category(id, name, slug), QuizQuestion(*)")
    .eq("id", quizId)
    .single();

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
    return NextResponse.json({ error: "ID kuis diperlukan" }, { status: 400 });
  }

  // Delete questions first (foreign key)
  await supabase
    .from("QuizQuestion")
    .delete()
    .eq("quizId", Number(id));

  const { error } = await supabase
    .from("Quiz")
    .delete()
    .eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
