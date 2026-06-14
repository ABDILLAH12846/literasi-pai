import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-base font-bold text-gray-900">Resensiqro&apos;</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
              Platform ulasan dan rekomendasi buku Pendidikan Agama Islam. Read. Reflect. Grow.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 transition-colors hover:text-emerald-600">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/review-buku" className="text-sm text-gray-500 transition-colors hover:text-emerald-600">
                  Review Buku
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-500 transition-colors hover:text-emerald-600">
                  Login Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="mailto:sri.aqilah@example.com" className="transition-colors hover:text-emerald-600">
                  sri.aqilah@example.com
                </a>
              </li>
              <li>
                <a href="tel:+6281234567890" className="transition-colors hover:text-emerald-600">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="pt-2 text-xs text-gray-400">
                Sri Aqilah Maulida
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © {currentYear} Resensiqro&apos; — Read. Reflect. Grow.
          </p>
        </div>
      </div>
    </footer>
  );
}
