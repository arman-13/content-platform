export interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  authorName: string;
  publishedAt: string;
  tags: string;
  isPublished: boolean;
}

export interface Track {
  id: number;
  title: string;
  albumTitle: string;
  artist: string;
  genre: string;
  duration: string;
  coverImageUrl: string;
  audioUrl: string;
  publishedAt: string;
  isPublished: boolean;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  publishedAt: string;
  isPublished: boolean;
}

export interface TeamMember {
  id: number;
  fullName: string;
  role: string;
  bio: string;
  avatarUrl: string;
  email: string;
  phone?: string;
  gitHub?: string;
  linkedIn?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}
