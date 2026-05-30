export const dynamic = "force-dynamic";

import { getVideos } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function VideosPage() {
  const { data: videos } = await getVideos(1, 20);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-16">
        <p className="text-xs tracking-widest uppercase text-white/30 mb-4">Moving Image</p>
        <h1 className="text-4xl font-light text-white/90">Videos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <Link key={video.id} href={`/videos/${video.id}`} className="group">
            <div className="relative aspect-video rounded overflow-hidden mb-4 bg-white/5">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover opacity-65 group-hover:opacity-85 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-[10px] tracking-widest uppercase text-white/25 mb-2">{video.category}</p>
            <h2 className="text-base font-medium text-white/80 group-hover:text-white transition-colors leading-snug mb-2">
              {video.title}
            </h2>
            <p className="text-sm text-white/35 leading-relaxed line-clamp-2">{video.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
