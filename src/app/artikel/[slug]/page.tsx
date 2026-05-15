import { notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "~/server/supabase";
import type { Article } from "~/types";

async function getArticle(slug: string): Promise<Article | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("Article")
    .select("*, Category(id, name, slug)")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  return data as Article | null;
}

export default async function ArtikelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 sm:mb-6">
        <Link href="/" className="hover:text-emerald-600">Beranda</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/artikel" className="hover:text-emerald-600">Artikel</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="truncate text-gray-700">{article.title}</span>
      </nav>

      {/* Hero image */}
      {article.imageUrl && (
        <div className="mb-6 aspect-video overflow-hidden rounded-xl bg-gray-100 sm:mb-8 sm:rounded-2xl">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Category & date */}
      <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          {article.Category.name}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(article.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl">
        {article.title}
      </h1>

      {/* Excerpt */}
      {article.excerpt && (
        <p className="mb-6 border-l-4 border-emerald-500 bg-emerald-50 p-4 text-base leading-relaxed text-gray-700 sm:mb-8 sm:p-5 sm:text-lg">
          {article.excerpt}
        </p>
      )}

      {/* Content */}
      <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-emerald-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700">
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="text-sm sm:text-base"
        />
      </div>

      {/* Back link */}
      <div className="mt-8 border-t border-gray-200 pt-6 sm:mt-12 sm:pt-8">
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Artikel
        </Link>
      </div>
    </div>
  );
}
