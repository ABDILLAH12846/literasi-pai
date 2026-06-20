import PageLayout from "~/components/PageLayout";
import Footer from "~/components/Footer";
import Link from "next/link";

const benefits = [
  {
    icon: "📚",
    title: "Bacaan yang Relevan",
    desc: "Rekomendasi buku sesuai kebutuhan dan minat pengguna.",
  },
  {
    icon: "💡",
    title: "Inspirasi dan Solusi",
    desc: "Membantu menemukan wawasan dan motivasi dari setiap bacaan.",
  },
  {
    icon: "🌱",
    title: "Tumbuh Bersama Literasi",
    desc: "Mendukung pengembangan diri melalui budaya membaca.",
  },
];

export default function HomePage() {
  return (
    <PageLayout>
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 px-4 py-14 sm:px-8 sm:py-20 lg:py-28">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="islamic-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
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

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <h5 className="mb-4 text-xl font-extrabold tracking-tight text-white sm:mb-5 sm:text-2xl md:text-3xl lg:text-4xl">
            ResensiQro`
          </h5>
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-emerald-100 backdrop-blur-sm sm:mb-6 sm:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Read. Reflect. Grow.
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:mb-5 sm:text-4xl md:text-5xl lg:text-6xl">
            Temukan Bacaan,
            <br className="hidden sm:block" /> Temukan Solusi.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-emerald-100 sm:mb-10 sm:text-base md:text-lg">
            Rekomendasi buku yang membantu kamu bertumbuh dalam pengembangan
            diri, produktivitas, kesehatan mental, dan spiritualitas.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/review-buku"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl sm:px-8 sm:py-3.5 sm:text-base"
            >
              Jelajahi Review
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <a
              href="#tentang"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:px-8 sm:py-3.5 sm:text-base"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATISTIK RINGKAS
      ═══════════════════════════════════════════════════════ */}
      <section className="border-b border-gray-100 bg-white px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 text-center sm:gap-8">
          <div>
            <div className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
              12+
            </div>
            <div className="mt-0.5 text-xs text-gray-500 sm:text-sm">
              Buku Diulas
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
              4.5
            </div>
            <div className="mt-0.5 text-xs text-gray-500 sm:text-sm">
              Rating Rata-rata
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
              5
            </div>
            <div className="mt-0.5 text-xs text-gray-500 sm:text-sm">
              Kategori Buku
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TENTANG WEBSITE
      ═══════════════════════════════════════════════════════ */}
      <section id="tentang" className="bg-gray-50 px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center sm:mb-14">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 sm:text-sm">
              Tentang Kami
            </span>
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl">
              Apa Itu ResensiQro&apos;?
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
              ResensiQro&apos; merupakan platform literasi digital yang
              menyediakan rekomendasi dan ulasan buku untuk mendukung
              pembelajaran, pengembangan diri, serta penguatan nilai-nilai
              spiritual bagi mahasiswa dan generasi muda muslim.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Visi */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 sm:mb-4 sm:h-12 sm:w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 sm:mb-3 sm:text-xl">
                Visi
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
                Menjadi platform literasi digital yang membantu mahasiswa dan
                generasi muda Muslim menemukan bacaan yang inspiratif, relevan,
                dan bermanfaat untuk mendukung pengembangan diri, peningkatan
                wawasan, serta penguatan nilai-nilai keislaman.
              </p>
            </div>

            {/* Misi */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 sm:mb-4 sm:h-12 sm:w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 sm:mb-3 sm:text-xl">
                Misi
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed text-gray-500 sm:text-base">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  Menyediakan rekomendasi dan ulasan buku yang relevan dan
                  berkualitas.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  Mendorong budaya membaca dan pembelajaran sepanjang hayat.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  Mendukung pengembangan diri, wawasan, dan spiritualitas
                  generasi muda Muslim.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MANFAAT
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center sm:mb-14">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 sm:text-sm">
              Manfaat
            </span>
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl">
              Mengapa ResensiQro&apos;?
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
              Kami menyediakan ulasan yang membantu Anda menemukan buku terbaik
              dengan lebih mudah dan efisien.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group rounded-xl border border-gray-200 bg-gray-50 p-6 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-sm sm:p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white sm:mb-5 sm:h-14 sm:w-14">
                  {b.icon}
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-900 sm:mb-3 sm:text-lg">
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl">
            Mulai Perjalanan Membacamu
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-500 sm:mb-10 sm:text-base">
            Temukan buku yang sesuai dengan kebutuhanmu dan dapatkan wawasan
            baru dari setiap bacaan.
          </p>
          <Link
            href="/review-buku"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl sm:text-base"
          >
            Lihat Semua Review
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <Footer />
    </PageLayout>
  );
}
