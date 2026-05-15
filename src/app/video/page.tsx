"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageLayout from "~/components/PageLayout";
import CategoryChips from "~/components/CategoryChips";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Video {
  id: number;
  title: string;
  description: string | null;
  youtubeUrl: string;
  thumbnail: string | null;
  createdAt: string;
  Category: { id: number; name: string; slug: string };
}

function extractYoutubeId(url: string): string | null {
  return /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/.exec(url)?.[1] ?? null;
}

export default function VideoPage() {
  const [videos, setVideos] = useState<Video[]>([]);
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
      ? `/api/video?category=${selectedCategory}`
      : "/api/video";
    void fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setVideos(data as Video[]);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <PageLayout>
      <div className="p-4 sm:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Video Islami</h1>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              Kumpulan video pembelajaran Islami
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse rounded-xl bg-white p-3 shadow-sm sm:p-4">
                  <div className="mb-3 aspect-video rounded-lg bg-gray-200 sm:mb-4" />
                  <div className="mb-2 h-4 w-20 rounded bg-gray-200" />
                  <div className="mb-2 h-5 w-full rounded bg-gray-200 sm:h-6" />
                </div>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-sm sm:py-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 h-12 w-12 text-gray-300 sm:mb-4 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 className="text-base font-semibold text-gray-600 sm:text-lg">Belum ada video</h3>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">Video akan muncul di sini setelah ditambahkan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {videos.map((video) => {
                const ytId = extractYoutubeId(video.youtubeUrl);
                const thumbUrl = video.thumbnail ?? (ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null);
                return (
                  <Link
                    key={video.id}
                    href={`/video/${video.id}`}
                    className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-red-50">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-300 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg transition-transform group-hover:scale-110 sm:h-14 sm:w-14">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <span className="absolute left-2 top-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-medium text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
                        {video.Category.name}
                      </span>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="mb-1.5 line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-emerald-600 sm:mb-2 sm:text-lg">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="line-clamp-2 text-xs text-gray-500 sm:text-sm">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
