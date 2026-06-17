"use client";

import { useEffect, useState } from "react";
import type { Category, BookReview } from "~/types";

const emptyForm = {
  bookTitle: "",
  author: "",
  review: "",
  rating: "5",
  coverImage: "",
  categoryId: "",
  about: "",
  reviewer: "",
  fit_to: "",
  quotes: "",
};

export default function AdminReviewBukuPage() {
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  async function loadReviews() {
    const res = await fetch("/api/review-buku");
    setReviews((await res.json()) as BookReview[]);
  }

  useEffect(() => {
    void loadReviews();
    void fetch("/api/category")
      .then((r) => r.json())
      .then((d) => setCategories(d as Category[]));
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(review: BookReview) {
    setEditingId(review.id);
    setForm({
      bookTitle: review.bookTitle,
      author: review.author,
      review: review.review,
      rating: String(review.rating),
      coverImage: review.coverImage ?? "",
      categoryId: String(review.categoryId),
      about: review.about,
      reviewer: review.reviewer,
      fit_to: review.fit_to,
      quotes: review.quotes,
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form, categoryId: Number(form.categoryId), rating: Number(form.rating) };

    if (editingId) {
      await fetch("/api/review-buku", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...payload }),
      });
    } else {
      await fetch("/api/review-buku", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    closeForm();
    void loadReviews();
  }

  async function handleDelete(id: number) {
    await fetch(`/api/review-buku?id=${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    void loadReviews();
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Kelola Review Buku</h1>
            <p className="mt-1 text-sm text-gray-500">Tambah, edit, dan hapus ulasan buku</p>
          </div>
          <button
            onClick={openCreateForm}
            className="self-start rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            + Tambah Review
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-6">
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                {editingId ? "Edit Review" : "Review Buku Baru"}
              </h2>
              <button type="button" onClick={closeForm} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Judul Buku</label>
                <input
                  type="text"
                  value={form.bookTitle}
                  onChange={(e) => setForm({ ...form, bookTitle: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Judul buku..."
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Penulis</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Nama penulis..."
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Kategori</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                >
                  <option value="">Pilih kategori...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Rating</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                  <option value="4">⭐⭐⭐⭐ (4)</option>
                  <option value="3">⭐⭐⭐ (3)</option>
                  <option value="2">⭐⭐ (2)</option>
                  <option value="1">⭐ (1)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">URL Cover Buku (opsional)</label>
                <input
                  type="url"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="https://..."
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Isi Review</label>
                <textarea
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Tulis review buku di sini..."
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Tentang</label>
                <textarea
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Tulis tentang buku di sini..."
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Resensi</label>
                <textarea
                  value={form.reviewer}
                  onChange={(e) => setForm({ ...form, reviewer: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Tulis resensi buku di sini..."
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Cocok Untuk:</label>
                <textarea
                  value={form.fit_to}
                  onChange={(e) => setForm({ ...form, fit_to: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Tulis siapa aja yang cocok dengan buku ini di sini..."
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Kutipan Menarik</label>
                <textarea
                  value={form.quotes}
                  onChange={(e) => setForm({ ...form, quotes: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Tulis kutipan menarik di sini..."
                  required
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2 sm:mt-4">
              <button type="button" onClick={closeForm} className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:px-5 sm:py-2.5 sm:text-sm">
                Batal
              </button>
              <button type="submit" className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 sm:px-6 sm:py-2.5 sm:text-sm">
                {editingId ? "Simpan Perubahan" : "Simpan Review"}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Buku</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Penulis</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Kategori</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Rating</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Tanggal</th>
                  <th className="px-4 py-3 text-right text-[10px] inline-flex uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-xs text-gray-400 sm:px-6 sm:py-12 sm:text-sm">
                      Belum ada review buku. Klik &quot;Tambah Review&quot; untuk membuat review pertama.
                    </td>
                  </tr>
                ) : (
                  reviews.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs font-medium text-gray-900 sm:px-6 sm:py-4 sm:text-sm">{r.bookTitle}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 sm:px-6 sm:py-4 sm:text-sm">{r.author}</td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4">
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:px-2.5 sm:text-xs">
                          {r.Category.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-amber-500 sm:px-6 sm:py-4 sm:text-sm">
                        {"⭐".repeat(r.rating)}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 sm:px-6 sm:py-4 sm:text-sm">
                        {new Date(r.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-4 py-3 text-right sm:px-6 sm:py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditForm(r)}
                            className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-[10px] font-medium text-gray-600 transition-colors hover:bg-gray-50 sm:px-3 sm:text-xs"
                          >
                            Edit
                          </button>
                          {deleteConfirm === r.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(r.id)}
                                className="rounded-lg bg-red-600 px-2.5 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-red-700 sm:px-3 sm:text-xs"
                              >
                                Ya, Hapus
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-[10px] font-medium text-gray-600 transition-colors hover:bg-gray-50 sm:px-3 sm:text-xs"
                              >
                                Batal
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(r.id)}
                              className="rounded-lg border border-red-200 px-2.5 py-1.5 text-[10px] font-medium text-red-600 transition-colors hover:bg-red-50 sm:px-3 sm:text-xs"
                            >
                              Hapus
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
