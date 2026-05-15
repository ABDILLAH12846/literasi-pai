"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageLayout from "~/components/PageLayout";
import CategoryChips from "~/components/CategoryChips";
import type { Category, BookReview } from "~/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${star <= rating ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewBukuPage() {
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetch("/api/category")
      .then((r) => r.json())
      .then((d) => setCategories(d as Category[]));
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `/api/review-buku?category=${selectedCategory}`
      : "/api/review-buku";
    void fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setReviews(data as BookReview[]);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <PageLayout>
      <div className="p-4 sm:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Review Buku</h1>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              Ulasan buku-buku bacaan Islami
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <CategoryChips
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse rounded-xl bg-white p-4 shadow-sm sm:p-6">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="h-28 w-20 rounded-lg bg-gray-200 sm:h-32 sm:w-24" />
                    <div className="flex-1">
                      <div className="mb-2 h-5 w-3/4 rounded bg-gray-200 sm:h-6" />
                      <div className="mb-2 h-3.5 w-1/2 rounded bg-gray-200 sm:h-4" />
                      <div className="mb-2 h-3.5 w-16 rounded bg-gray-200 sm:h-4 sm:w-20" />
                      <div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-sm sm:py-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 h-12 w-12 text-gray-300 sm:mb-4 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-base font-semibold text-gray-600 sm:text-lg">Belum ada review buku</h3>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">Review buku akan muncul di sini setelah ditambahkan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {reviews.map((review) => (
                <Link
                  key={review.id}
                  href={`/review-buku/${review.id}`}
                  className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex gap-3 p-4 sm:gap-5 sm:p-6">
                    <div className="flex-shrink-0">
                      {review.coverImage ? (
                        <img
                          src={review.coverImage}
                          alt={review.bookTitle}
                          className="h-28 w-20 rounded-lg object-cover shadow-sm sm:h-36 sm:w-28"
                        />
                      ) : (
                        <div className="flex h-28 w-20 items-center justify-center rounded-lg bg-emerald-50 sm:h-36 sm:w-28">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-300 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2 sm:flex-nowrap sm:justify-between">
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:px-2.5 sm:text-xs">
                          {review.Category.name}
                        </span>
                        <StarRating rating={review.rating} />
                      </div>
                      <h3 className="mb-0.5 text-base font-bold text-gray-900 group-hover:text-emerald-600 sm:mb-1 sm:text-lg">
                        {review.bookTitle}
                      </h3>
                      <p className="mb-2 text-xs text-gray-500 sm:mb-3 sm:text-sm">oleh {review.author}</p>
                      <p className="line-clamp-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
                        {review.review}
                      </p>
                      <p className="mt-2 text-[10px] text-gray-400 sm:mt-3 sm:text-xs">
                        {new Date(review.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
