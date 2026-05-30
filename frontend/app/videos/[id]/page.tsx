export const dynamic = "force-dynamic";

import { getVideo } from "@/lib/api";
import { notFound } from "next/navigation";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let video;
  try {
    video = await getVideo(Number(id));
  } catch {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="text-[10px] tracking-widest uppercase text-white/25 mb-4">{video.category}</p>
      <h1 className="text-3xl md:text-4xl font-light text-white/90 leading-tight mb-4">{video.title}</h1>
      <p className="text-sm text-white/35 mb-10">{formatDate(video.publishedAt)}</p>

      {/* Embed */}
      <div className="relative aspect-video rounded overflow-hidden bg-black mb-10">
        <iframe
          src={video.videoUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <p className="text-base text-white/50 leading-relaxed">{video.description}</p>
    </div>
  );
}
