"use client";

import { useEffect, useState } from "react";
import type { Category, Quiz } from "~/types";

const emptyQuestion = () => ({ question: "", options: ["", "", "", ""], answer: 0 });

const emptyForm = {
  title: "",
  description: "",
  categoryId: "",
};

export default function AdminKuisPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [questions, setQuestions] = useState<ReturnType<typeof emptyQuestion>[]>([emptyQuestion()]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  async function loadQuizzes() {
    const res = await fetch("/api/kuis");
    setQuizzes((await res.json()) as Quiz[]);
  }

  useEffect(() => {
    void loadQuizzes();
    void fetch("/api/category")
      .then((r) => r.json())
      .then((d) => setCategories(d as Category[]));
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setQuestions([emptyQuestion()]);
    setShowForm(true);
  }

  function openEditForm(quiz: Quiz) {
    setEditingId(quiz.id);
    setForm({
      title: quiz.title,
      description: quiz.description ?? "",
      categoryId: String(quiz.categoryId),
    });
    setQuestions(
      quiz.questions.length > 0
        ? quiz.questions.map((q) => ({
            question: q.question,
            options: [...q.options],
            answer: q.answer,
          }))
        : [emptyQuestion()]
    );
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setQuestions([emptyQuestion()]);
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, emptyQuestion()]);
  }

  function removeQuestion(index: number) {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }

  function updateQuestion(index: number, field: "question" | "answer", value: string | number) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  }

  function updateOption(qIndex: number, oIndex: number, value: string) {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex) return q;
        const newOptions = [...q.options];
        newOptions[oIndex] = value;
        return { ...q, options: newOptions };
      })
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      categoryId: Number(form.categoryId),
      questions,
    };

    if (editingId) {
      await fetch("/api/kuis", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...payload }),
      });
    } else {
      await fetch("/api/kuis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    closeForm();
    void loadQuizzes();
  }

  async function handleDelete(id: number) {
    await fetch(`/api/kuis?id=${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    void loadQuizzes();
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Kelola Kuis Islami</h1>
            <p className="mt-1 text-sm text-gray-500">Tambah, edit, dan hapus kuis interaktif</p>
          </div>
          <button
            onClick={openCreateForm}
            className="self-start rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            + Tambah Kuis
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mb-8 sm:space-y-6 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                {editingId ? "Edit Kuis" : "Kuis Baru"}
              </h2>
              <button type="button" onClick={closeForm} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Judul Kuis</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Judul kuis..."
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
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Deskripsi</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Deskripsi kuis..."
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Soal-soal</h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="rounded-lg border border-emerald-600 px-3 py-1.5 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50 sm:px-4 sm:py-2 sm:text-sm"
                >
                  + Tambah Soal
                </button>
              </div>

              {questions.map((q, qi) => (
                <div key={qi} className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <div className="mb-2 flex items-center justify-between sm:mb-3">
                    <h4 className="text-xs font-bold text-gray-700 sm:text-sm">Soal {qi + 1}</h4>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qi)}
                        className="text-xs text-red-500 hover:text-red-700 sm:text-sm"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => updateQuestion(qi, "question", e.target.value)}
                    className="mb-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:mb-3"
                    placeholder="Pertanyaan..."
                    required
                  />
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuestion(qi, "answer", oi)}
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors sm:h-8 sm:w-8 sm:text-xs ${
                            q.answer === oi
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        >
                          {String.fromCharCode(65 + oi)}
                        </button>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateOption(qi, oi, e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:px-3 sm:py-2 sm:text-sm"
                          placeholder={`Opsi ${String.fromCharCode(65 + oi)}...`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] text-gray-400 sm:mt-2 sm:text-xs">Klik huruf untuk menandai jawaban benar</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={closeForm} className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:px-5 sm:py-2.5 sm:text-sm">
                Batal
              </button>
              <button type="submit" className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 sm:px-6 sm:py-2.5 sm:text-sm">
                {editingId ? "Simpan Perubahan" : "Simpan Kuis"}
              </button>
            </div>
          </form>
        )}

        {/* Quiz List */}
        <div className="space-y-3 sm:space-y-4">
          {quizzes.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white py-10 text-center shadow-sm sm:py-12">
              <p className="text-xs text-gray-400 sm:text-sm">
                Belum ada kuis. Klik &quot;Tambah Kuis&quot; untuk membuat kuis pertama.
              </p>
            </div>
          ) : (
            quizzes.map((quiz) => (
              <div key={quiz.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2 sm:mb-2">
                      <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:px-2.5 sm:text-xs">
                        {quiz.Category.name}
                      </span>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:text-xs ${quiz.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {quiz.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 sm:text-lg">{quiz.title}</h3>
                    {quiz.description && (
                      <p className="mt-1 text-xs text-gray-500 sm:text-sm">{quiz.description}</p>
                    )}
                    <p className="mt-1.5 text-[10px] text-gray-400 sm:mt-2 sm:text-xs">
                      {quiz.questions.length} soal • {new Date(quiz.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 self-start">
                    <button
                      onClick={() => openEditForm(quiz)}
                      className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-[10px] font-medium text-gray-600 transition-colors hover:bg-gray-50 sm:px-3 sm:text-xs"
                    >
                      Edit
                    </button>
                    {deleteConfirm === quiz.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(quiz.id)}
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
                        onClick={() => setDeleteConfirm(quiz.id)}
                        className="rounded-lg border border-red-200 px-2.5 py-1.5 text-[10px] font-medium text-red-600 transition-colors hover:bg-red-50 sm:px-3 sm:text-xs"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
