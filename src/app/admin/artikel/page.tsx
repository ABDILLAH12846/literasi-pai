"use client";

import { useEffect, useState } from "react";
import type { Category, Article } from "~/types";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  categoryId: "",
};

export default function AdminArtikelPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  async function loadArticles() {
    const res = await fetch("/api/artikel");
    setArticles((await res.json()) as Article[]);
  }

  useEffect(() => {
    void loadArticles();
    void fetch("/api/category")
      .then((r) => r.json())
      .then((d) => setCategories(d as Category[]));
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(article: Article) {
    setEditingId(article.id);
    setForm({
      title: article.title,
      excerpt: article.excerpt ?? "",
      content: article.content,
      imageUrl: article.imageUrl ?? "",
      categoryId: String(article.categoryId),
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
    const payload = { ...form, categoryId: Number(form.categoryId) };

    if (editingId) {
      await fetch("/api/artikel", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...payload }),
      });
    } else {
      await fetch("/api/artikel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    closeForm();
    void loadArticles();
  }

  async function handleDelete(id: number) {
    await fetch(`/api/artikel?id=${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    void loadArticles();
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Kelola Artikel</h1>
            <p className="mt-1 text-sm text-gray-500">Tambah, edit, dan hapus artikel pembelajaran</p>
          </div>
          <button
            onClick={openCreateForm}
            className="self-start rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            + Tambah Artikel
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-6">
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                {editingId ? "Edit Artikel" : "Artikel Baru"}
              </h2>
              <button type="button" onClick={closeForm} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Judul</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Judul artikel..."
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
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">URL Gambar</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="https://..."
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Excerpt</label>
                <input
                  type="text"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Ringkasan singkat..."
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Konten</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Tulis konten artikel di sini..."
                  required
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2 sm:mt-4">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 sm:px-6 sm:py-2.5 sm:text-sm"
              >
                {editingId ? "Simpan Perubahan" : "Simpan Artikel"}
              </button>
            </div>
          </form>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Judul</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Kategori</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Tanggal</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Status</th>
                  <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:text-xs">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-xs text-gray-400 sm:px-6 sm:py-12 sm:text-sm">
                      Belum ada artikel. Klik &quot;Tambah Artikel&quot; untuk membuat artikel pertama.
                    </td>
                  </tr>
                ) : (
                  articles.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs font-medium text-gray-900 sm:px-6 sm:py-4 sm:text-sm">{a.title}</td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4">
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:px-2.5 sm:text-xs">
                          {a.Category.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 sm:px-6 sm:py-4 sm:text-sm">
                        {new Date(a.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:text-xs ${a.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                          {a.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right sm:px-6 sm:py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditForm(a)}
                            className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-[10px] font-medium text-gray-600 transition-colors hover:bg-gray-50 sm:px-3 sm:text-xs"
                          >
                            Edit
                          </button>
                          {deleteConfirm === a.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(a.id)}
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
                              onClick={() => setDeleteConfirm(a.id)}
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
