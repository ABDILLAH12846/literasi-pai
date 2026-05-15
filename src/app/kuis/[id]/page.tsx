"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Quiz } from "~/types";

async function getQuiz(id: number): Promise<Quiz | null> {
  const res = await fetch(`/api/kuis/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Gagal memuat kuis");
  return res.json() as Promise<Quiz>;
}

export default function KuisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizId, setQuizId] = useState<number | null>(null);

  useEffect(() => {
    void params.then(({ id }) => setQuizId(Number(id)));
  }, [params]);

  useEffect(() => {
    if (quizId === null) return;
    void getQuiz(quizId).then((data) => {
      setQuiz(data);
      setLoading(false);
    });
  }, [quizId]);

  function selectAnswer(optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [currentQ]: optionIndex }));
  }

  function nextQuestion() {
    if (quiz && currentQ < quiz.questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  }

  function restartQuiz() {
    setStarted(false);
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-2/3 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-32 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-8">
        <h1 className="mb-2 text-xl font-bold text-gray-900">Kuis tidak ditemukan</h1>
        <p className="mb-6 text-gray-500">Kuis yang kamu cari tidak ada atau sudah dihapus.</p>
        <Link href="/kuis" className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700">
          Kembali ke Kuis
        </Link>
      </div>
    );
  }

  const score = quiz.questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0),
    0
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 sm:mb-6">
        <Link href="/" className="hover:text-emerald-600">Beranda</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/kuis" className="hover:text-emerald-600">Kuis</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="truncate text-gray-700">{quiz.title}</span>
      </nav>

      {!started ? (
        /* Quiz intro card */
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-5 py-8 text-center text-white sm:px-8 sm:py-12">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 sm:h-16 sm:w-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{quiz.title}</h1>
            {quiz.description && (
              <p className="mx-auto max-w-md text-sm text-emerald-100 sm:text-base">{quiz.description}</p>
            )}
          </div>
          <div className="p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {quiz.questions.length} soal
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {quiz.Category.name}
              </span>
            </div>
            <button
              onClick={() => setStarted(true)}
              className="w-full rounded-lg bg-emerald-600 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700 sm:text-lg"
            >
              Mulai Kuis
            </button>
          </div>
        </div>
      ) : (
        /* Quiz questions */
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-6 sm:py-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900 sm:text-base">{quiz.title}</h2>
              <p className="text-xs text-gray-500">
                Soal {currentQ + 1} dari {quiz.questions.length}
              </p>
            </div>
            <button
              onClick={restartQuiz}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 sm:p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full bg-gray-100">
            <div
              className="h-full bg-emerald-600 transition-all"
              style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>

          <div className="p-4 sm:p-6">
            {!showResult ? (
              <>
                <h3 className="mb-4 text-base font-semibold text-gray-900 sm:mb-6 sm:text-lg">
                  {quiz.questions[currentQ]?.question}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {quiz.questions[currentQ]?.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectAnswer(idx)}
                      className={`w-full rounded-lg border-2 px-3 py-2.5 text-left text-xs font-medium transition-colors sm:px-4 sm:py-3 sm:text-sm ${
                        answers[currentQ] === idx
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold sm:mr-3 sm:h-6 sm:w-6 sm:text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex justify-end sm:mt-6">
                  <button
                    onClick={nextQuestion}
                    disabled={answers[currentQ] === undefined}
                    className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-2.5 sm:text-sm"
                  >
                    {currentQ < quiz.questions.length - 1 ? "Selanjutnya" : "Lihat Hasil"}
                  </button>
                </div>
              </>
            ) : (
              <div className="py-4 text-center sm:py-8">
                <div className="mb-3 sm:mb-4">
                  {score >= quiz.questions.length * 0.7 ? (
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 sm:mb-4 sm:h-20 sm:w-20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 sm:mb-4 sm:h-20 sm:w-20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="mb-1.5 text-xl font-bold text-gray-900 sm:mb-2 sm:text-2xl">
                  Skor: {score}/{quiz.questions.length}
                </h3>
                <p className="mb-4 text-sm text-gray-500 sm:mb-6">
                  {score >= quiz.questions.length * 0.7
                    ? "Alhamdulillah, hasil yang bagus! 🎉"
                    : "Terus belajar ya, kamu pasti bisa! 💪"}
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
                  <button
                    onClick={restartQuiz}
                    className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 sm:px-6 sm:py-2.5 sm:text-sm"
                  >
                    Main Lagi
                  </button>
                  <Link
                    href="/kuis"
                    className="rounded-lg bg-gray-100 px-5 py-2 text-center text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 sm:px-6 sm:py-2.5 sm:text-sm"
                  >
                    Kembali ke Daftar Kuis
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-6 sm:mt-8">
        <Link
          href="/kuis"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Kuis
        </Link>
      </div>
    </div>
  );
}
