import { notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "~/server/supabase";
import type { Video } from "~/types";

function extractYoutubeId(url: string): string | null {
  return /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/.exec(url)?.[1] ?? null;
}

async function getVideo(id: number): Promise<Video | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("Video")
    .select("*, Category(id, name, slug)")
    .eq("id", id)
    .eq("published", true)
    .single();

  return data as Video | null;
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await getVideo(Number(id));

  if (!video) notFound();

  const ytId = extractYoutubeId(video.youtubeUrl);
  const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 sm:mb-6">
        <Link href="/" className="hover:text-emerald-600">Beranda</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/video" className="hover:text-emerald-600">Video</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="truncate text-gray-700">{video.title}</span>
      </nav>

      {/* Video embed */}
      {embedUrl ? (
        <div className="mb-6 aspect-video overflow-hidden rounded-xl bg-black sm:mb-8 sm:rounded-2xl">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        <div className="mb-6 flex aspect-video items-center justify-center rounded-xl bg-gray-900 sm:mb-8 sm:rounded-2xl">
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Tonton di YouTube
          </a>
        </div>
      )}

      {/* Category & date */}
      <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          {video.Category.name}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(video.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 sm:mb-6 sm:text-3xl">
        {video.title}
      </h1>

      {/* Description */}
      {video.description && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 sm:mb-8 sm:p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400 sm:mb-3">
            Deskripsi
          </h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700 sm:text-base">
            {video.description}
          </p>
        </div>
      )}

      {/* Watch on YouTube button */}
      <div className="mb-8 sm:mb-12">
        <a
          href={video.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Tonton di YouTube
        </a>
      </div>

      {/* Back link */}
      <div className="border-t border-gray-200 pt-6">
        <Link
          href="/video"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Video
        </Link>
      </div>
    </div>
  );
}
