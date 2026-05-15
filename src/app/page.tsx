import PageLayout from "~/components/PageLayout";
import Link from "next/link";

const features = [
  {
    name: "Artikel",
    desc: "Kumpulan artikel pembelajaran PAI yang bermanfaat",
    href: "/artikel",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Video Islami",
    desc: "Kumpulan video pembelajaran Islami dari YouTube",
    href: "/video",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-red-500 to-red-600",
  },
  {
    name: "Review Buku",
    desc: "Ulasan buku-buku bacaan Islami terbaik",
    href: "/review-buku",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "from-amber-500 to-amber-600",
  },
  {
    name: "Kuis Islami",
    desc: "Uji pengetahuan Islami dengan kuis interaktif",
    href: "/kuis",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-purple-500 to-purple-600",
  },
];

export default function HomePage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 px-4 py-12 sm:px-8 sm:py-20">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" />
                <circle cx="0" cy="0" r="1" fill="white" />
                <circle cx="20" cy="0" r="1" fill="white" />
                <circle cx="0" cy="20" r="1" fill="white" />
                <circle cx="20" cy="20" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#islamic-pattern)" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-emerald-100 backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Platform Pembelajaran PAI
          </div>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:mb-4 sm:text-4xl md:text-5xl">
            Literasi PAI
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-emerald-100 sm:text-lg">
            Pusat pembelajaran Pendidikan Agama Islam yang menyediakan artikel, video, review buku, dan kuis interaktif untuk menunjang pembelajaran.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-16">
        <h2 className="mb-1 text-center text-xl font-bold text-gray-900 sm:mb-2 sm:text-2xl">
          Jelajahi Konten
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500 sm:mb-10">
          Pilih menu di bawah untuk mulai belajar
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-gray-300 hover:shadow-lg sm:rounded-2xl sm:p-8"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg sm:mb-5 sm:h-14 sm:w-14`}>
                {f.icon}
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-gray-900 group-hover:text-emerald-600 sm:mb-2 sm:text-xl">
                {f.name}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-sm font-medium text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100 sm:mt-4">
                Jelajahi
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs text-gray-400 sm:text-sm">
            © 2026 Literasi PAI — Platform Pembelajaran Pendidikan Agama Islam
          </p>
        </div>
      </footer>
    </PageLayout>
  );
}
