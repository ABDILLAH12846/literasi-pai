export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleRow {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  imageUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  createdById: string;
}

export interface Article extends ArticleRow {
  Category: Category;
}

export interface VideoRow {
  id: number;
  title: string;
  description: string | null;
  youtubeUrl: string;
  thumbnail: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  createdById: string;
}

export interface Video extends VideoRow {
  Category: Category;
}

export interface BookReviewRow {
  id: number;
  bookTitle: string;
  author: string;
  review: string;
  rating: number;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  createdById: string;
  about: string;
  reviewer: string;
  fit_to: string;
  quotes: string;
}

export interface BookReview extends BookReviewRow {
  Category: Category;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  order: number;
  quizId: number;
}

export interface QuizRow {
  id: number;
  title: string;
  description: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  createdById: string;
}

export interface Quiz extends QuizRow {
  Category: Category;
  questions: QuizQuestion[];
}

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? NonNullable<U> : never;
