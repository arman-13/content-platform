export const dynamic = "force-dynamic";

import { getArticles, getTracks, getVideos } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function HomePage() {
  const [articlesRes, tracksRes, videosRes] = await Promise.all([
    getArticles(1, 3),
    getTracks(1, 2),
    getVideos(1, 2),
  ]);

  const articles = articlesRes.data;
  const tracks = tracksRes.data;
  const videos = videosRes.data;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Hero */}
      <section className="mb-32">
        <p className="text-xs tracking-widest uppercase text-white/30 mb-6">Collective</p>
        <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight text-white/90 max-w-3xl">
          Technology, music, and ideas — made with care.
        </h1>
        <p className="mt-6 text-lg text-white/40 max-w-xl leading-relaxed">
          An independent creative-tech studio publishing long-form writing, original music, and documentary video.
        </p>
      </section>

      {/* Latest Articles */}
      <section className="mb-24">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-xs tracking-widest uppercase text-white/30">Latest Articles</h2>
          <Link href="/articles" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="group">
              <div className="relative aspect-video rounded overflow-hidden mb-4 bg-white/5">
                <Image
                  src={article.coverImageUrl}
                  alt={article.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
              </div>
              <p className="text-[10px] tracking-widest uppercase text-white/30 mb-2">
                {article.authorName} · {formatDate(article.publishedAt)}
              </p>
              <h3 className="text-base font-medium text-white/80 group-hover:text-white transition-colors leading-snug mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{article.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Tracks */}
      <section className="mb-24">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-xs tracking-widest uppercase text-white/30">Latest Music</h2>
          <Link href="/music" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => (
            <Link key={track.id} href="/music" className="group flex gap-4 p-4 rounded-lg border border-white/5 hover:border-white/15 transition-colors">
              <div className="relative w-16 h-16 rounded overflow-hidden shrink-0 bg-white/5">
                <Image src={track.coverImageUrl} alt={track.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors truncate">{track.title}</p>
                <p className="text-xs text-white/40 truncate">{track.artist}</p>
                <p className="text-xs text-white/25 mt-1">{track.genre} · {track.duration}</p>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 group-hover:border-white/40 transition-colors">
                <svg className="w-3 h-3 text-white/60 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Videos */}
      <section className="mb-24">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-xs tracking-widest uppercase text-white/30">Latest Videos</h2>
          <Link href="/videos" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <Link key={video.id} href={`/videos/${video.id}`} className="group">
              <div className="relative aspect-video rounded overflow-hidden mb-4 bg-white/5">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-white/30 mb-2">{video.category}</p>
              <h3 className="text-base font-medium text-white/80 group-hover:text-white transition-colors">{video.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
