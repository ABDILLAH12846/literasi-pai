import { notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "~/server/supabase";
import type { BookReview } from "~/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${star <= rating ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

async function getBookReview(id: number): Promise<BookReview | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("BookReview")
    .select("*, Category(id, name, slug)")
    .eq("id", id)
    .eq("published", true)
    .single();

  return data as BookReview | null;
}

export default async function ReviewBukuDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await getBookReview(Number(id));

  if (!review) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 sm:mb-6">
        <Link href="/" className="hover:text-emerald-600">Beranda</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/review-buku" className="hover:text-emerald-600">Koleksi Review</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="truncate max-w-[200px] text-gray-700">{review.bookTitle}</span>
      </nav>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl">
        <div className="p-5 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
            {/* Cover */}
            <div className="flex-shrink-0">
              {review.coverImage ? (
                <img
                  src={review.coverImage}
                  alt={review.bookTitle}
                  className="mx-auto h-48 w-32 rounded-lg object-cover shadow-md sm:h-64 sm:w-44"
                />
              ) : (
                <div className="mx-auto flex h-48 w-32 items-center justify-center rounded-lg bg-emerald-50 sm:h-64 sm:w-44">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <span className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 sm:mb-3">
                {review.Category.name}
              </span>

              <h1 className="mb-1 text-2xl font-bold text-gray-900 sm:mb-2 sm:text-3xl">
                {review.bookTitle}
              </h1>

              <p className="mb-3 text-base text-gray-500 sm:mb-4 sm:text-lg">
                oleh <span className="font-medium text-gray-700">{review.author}</span>
              </p>

              <div className="mb-4 flex items-center gap-2 sm:mb-6">
                <StarRating rating={review.rating} />
                <span className="text-sm font-medium text-gray-600">
                  {review.rating}/5
                </span>
              </div>

              <p className="text-xs text-gray-400">
                Ulasan ini dipublikasikan pada{" "}
                {new Date(review.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Review content */}
        <div className="border-t border-gray-100 bg-gray-50 p-5 sm:p-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400 sm:mb-4">
            Telaah Buku
          </h2>
          <div className="whitespace-pre-line text-sm leading-relaxed text-gray-700 sm:text-base">
            {review.review}
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-6 sm:mt-8">
        <Link
          href="/review-buku"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Koleksi Review
        </Link>
      </div>
    </div>
  );
}
