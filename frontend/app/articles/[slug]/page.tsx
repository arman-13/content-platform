export const dynamic = "force-dynamic";

import { getArticle } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticle(slug);
  } catch {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      {/* Cover */}
      <div className="relative aspect-video rounded overflow-hidden mb-12 bg-white/5">
        <Image
          src={article.coverImageUrl}
          alt={article.title}
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>

      {/* Meta */}
      <div className="flex gap-2 flex-wrap mb-6">
        {article.tags.split(",").map((tag) => (
          <span key={tag} className="text-[10px] tracking-widest uppercase text-white/25 border border-white/10 px-2 py-0.5 rounded-full">
            {tag.trim()}
          </span>
        ))}
      </div>

      <h1 className="text-3xl md:text-4xl font-light text-white/90 leading-tight mb-6">
        {article.title}
      </h1>

      <p className="text-sm text-white/35 mb-12 tracking-wide">
        {article.authorName} · {formatDate(article.publishedAt)}
      </p>

      <p className="text-lg text-white/50 leading-relaxed mb-10 border-l border-white/15 pl-6">
        {article.summary}
      </p>

      {/* Content */}
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-light prose-headings:text-white/80
          prose-p:text-white/55 prose-p:leading-relaxed
          prose-a:text-white/70 prose-a:no-underline hover:prose-a:text-white"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
