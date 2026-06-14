import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showAdminLink?: boolean;
}

export default function EmptyState({
  title = "Belum Ada Review Buku",
  description = "Review buku akan muncul di sini setelah ditambahkan oleh administrator.",
  showAdminLink = false,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 sm:py-24">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 sm:mb-5 sm:h-20 sm:w-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-emerald-400 sm:h-10 sm:w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h3 className="mb-1.5 text-base font-semibold text-gray-700 sm:text-lg">{title}</h3>
      <p className="mb-5 max-w-sm text-center text-sm text-gray-400 sm:mb-6">{description}</p>
      {showAdminLink && (
        <Link
          href="/admin/review-buku/create"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Review Pertama
        </Link>
      )}
    </div>
  );
}
