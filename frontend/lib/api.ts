import { Article, PagedResponse, TeamMember, Track, Video } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const getArticles = (page = 1, pageSize = 20) =>
  fetchApi<PagedResponse<Article>>(`/api/articles?page=${page}&pageSize=${pageSize}`);

export const getArticle = (slug: string) =>
  fetchApi<Article>(`/api/articles/${slug}`);

export const getTracks = (page = 1, pageSize = 20) =>
  fetchApi<PagedResponse<Track>>(`/api/tracks?page=${page}&pageSize=${pageSize}`);

export const getTrack = (id: number) =>
  fetchApi<Track>(`/api/tracks/${id}`);

export const getVideos = (page = 1, pageSize = 20) =>
  fetchApi<PagedResponse<Video>>(`/api/videos?page=${page}&pageSize=${pageSize}`);

export const getVideo = (id: number) =>
  fetchApi<Video>(`/api/videos/${id}`);

export const getTeam = () =>
  fetchApi<TeamMember[]>(`/api/team`);
