"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageLayout from "~/components/PageLayout";
import CategoryChips from "~/components/CategoryChips";
import type { Category, Article } from "~/types";

export default function ArtikelPage() {
  const [articles, setArticles] = useState<Article[]>([]);
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
      ? `/api/artikel?category=${selectedCategory}`
      : "/api/artikel";
    void fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setArticles(data as Article[]);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <PageLayout>
      <div className="p-4 sm:p-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Artikel</h1>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              Kumpulan artikel pembelajaran.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-4 sm:mb-6">
            <CategoryChips
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse rounded-xl bg-white p-3 shadow-sm sm:p-4">
                  <div className="mb-3 aspect-video rounded-lg bg-gray-200 sm:mb-4" />
                  <div className="mb-2 h-4 w-20 rounded bg-gray-200" />
                  <div className="mb-2 h-5 w-full rounded bg-gray-200 sm:h-6" />
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 || !articles[0]?.Category ? (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-sm sm:py-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 h-12 w-12 text-gray-300 sm:mb-4 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="text-base font-semibold text-gray-600 sm:text-lg">Belum ada artikel</h3>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">Artikel akan muncul di sini setelah ditambahkan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {articles[0]?.Category && articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/artikel/${article.slug}`}
                  className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100 sm:h-48">
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-emerald-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-300 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                    <span className="absolute left-2 top-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-medium text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
                      {article.Category.name}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="mb-1.5 line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-emerald-600 sm:mb-2 sm:text-lg">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="mb-2 line-clamp-2 text-xs text-gray-500 sm:mb-3 sm:text-sm">
                        {article.excerpt}
                      </p>
                    )}
                    <p className="text-[10px] text-gray-400 sm:text-xs">
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
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
