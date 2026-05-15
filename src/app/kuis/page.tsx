"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageLayout from "~/components/PageLayout";
import CategoryChips from "~/components/CategoryChips";
import type { Category, Quiz } from "~/types";

export default function KuisPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
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
      ? `/api/kuis?category=${selectedCategory}`
      : "/api/kuis";
    void fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setQuizzes(data as Quiz[]);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <PageLayout>
      <div className="p-4 sm:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Kuis Islami</h1>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              Uji pengetahuan Islami kamu dengan kuis interaktif
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
            <div className="space-y-3 sm:space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-xl bg-white p-4 shadow-sm sm:p-6">
                  <div className="mb-2 h-5 w-2/3 rounded bg-gray-200 sm:h-6" />
                  <div className="mb-2 h-3.5 w-1/3 rounded bg-gray-200 sm:h-4" />
                  <div className="h-3.5 w-24 rounded bg-gray-200 sm:h-4 sm:w-32" />
                </div>
              ))}
            </div>
          ) : quizzes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-sm sm:py-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 h-12 w-12 text-gray-300 sm:mb-4 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-base font-semibold text-gray-600 sm:text-lg">Belum ada kuis</h3>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">Kuis akan muncul di sini setelah ditambahkan</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {quizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={`/kuis/${quiz.id}`}
                  className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className="mb-1.5 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 sm:mb-2 sm:text-xs">
                          {quiz.Category.name}
                        </span>
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 sm:text-xl">{quiz.title}</h3>
                        {quiz.description && (
                          <p className="mt-1 text-xs text-gray-500 sm:text-sm">{quiz.description}</p>
                        )}
                        <p className="mt-1.5 text-[10px] text-gray-400 sm:mt-2 sm:text-xs">
                          {quiz.questions.length} soal
                        </p>
                      </div>
                      <span className="self-start rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors group-hover:bg-emerald-700 sm:px-5 sm:py-2.5 sm:text-sm">
                        Mulai Kuis
                      </span>
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
