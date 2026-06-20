import Link from "next/link";
import { createSupabaseServerClient } from "~/server/supabase";

const adminMenus = [
  {
    name: "Review Buku",
    desc: "Kelola ulasan buku Islami",
    href: "/admin/review-buku",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600",
  },
];

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Selamat datang, {user?.user_metadata?.name ?? "Admin"}! Kelola konten ResensiQro`.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {adminMenus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md sm:gap-5 sm:p-6"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${menu.color} sm:h-16 sm:w-16`}>
                {menu.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 sm:text-lg">
                  {menu.name}
                </h3>
                <p className="text-xs text-gray-500 sm:text-sm">{menu.desc}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-gray-300 transition-colors group-hover:text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
