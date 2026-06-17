export interface ArticleBody {
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  categoryId: number | string;
}

export interface VideoBody {
  title: string;
  description?: string;
  youtubeUrl: string;
  thumbnail?: string;
  categoryId: number | string;
}

export interface BookReviewBody {
  bookTitle: string;
  author: string;
  review: string;
  rating: number | string;
  coverImage?: string;
  categoryId: number | string;
  about: string;
  reviewer: string;
  fit_to: string;
  quotes: string;
}

export interface QuizQuestionInput {
  question: string;
  options: string[];
  answer: number;
}

export interface QuizBody {
  title: string;
  description?: string;
  categoryId: number | string;
  questions?: QuizQuestionInput[];
}
