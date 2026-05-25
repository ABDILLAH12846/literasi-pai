import PageLayout from "~/components/PageLayout";
import Link from "next/link";

const features = [
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
            Lentera PAI
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-emerald-100 sm:text-lg">
            Pusat pembelajaran Pendidikan Agama Islam yang menyediakan review buku-buku Islami untuk menunjang pembelajaran.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-16">
        <h2 className="mb-1 text-center text-xl font-bold text-gray-900 sm:mb-2 sm:text-2xl">
          Review Buku
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500 sm:mb-10">
          Jelajahi ulasan buku-buku Islami
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
      <footer className="border-t border-gray-200 bg-white px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold text-gray-700">Sri Aqilah Maulida</p>
          <div className="mt-2 flex flex-col items-center gap-1 text-xs text-gray-500 sm:text-sm">
            <a href="mailto:sri.aqilah@example.com" className="hover:text-emerald-600 transition-colors">
              sri.aqilah@example.com
            </a>
            <a href="tel:+6281234567890" className="hover:text-emerald-600 transition-colors">
              +62 812-3456-7890
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            © 2026 Lentera PAI — Platform Pembelajaran Pendidikan Agama Islam
          </p>
        </div>
      </footer>
    </PageLayout>
  );
}
