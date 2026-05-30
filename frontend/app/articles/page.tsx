export const dynamic = "force-dynamic";

import { getArticles } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlesPage() {
  const { data: articles } = await getArticles(1, 20);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-16">
        <p className="text-xs tracking-widest uppercase text-white/30 mb-4">Writing</p>
        <h1 className="text-4xl font-light text-white/90">Articles</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="group">
            <div className="relative aspect-video rounded overflow-hidden mb-5 bg-white/5">
              <Image
                src={article.coverImageUrl}
                alt={article.title}
                fill
                className="object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-300"
              />
            </div>
            <div className="flex gap-2 flex-wrap mb-3">
              {article.tags.split(",").map((tag) => (
                <span key={tag} className="text-[10px] tracking-widest uppercase text-white/25 border border-white/10 px-2 py-0.5 rounded-full">
                  {tag.trim()}
                </span>
              ))}
            </div>
            <h2 className="text-base font-medium text-white/80 group-hover:text-white transition-colors leading-snug mb-2">
              {article.title}
            </h2>
            <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-3">{article.summary}</p>
            <p className="text-[10px] tracking-widest uppercase text-white/25">
              {article.authorName} · {formatDate(article.publishedAt)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
