export const dynamic = "force-dynamic";

import { getTeam } from "@/lib/api";
import Image from "next/image";

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-20 max-w-2xl">
        <p className="text-xs tracking-widest uppercase text-white/30 mb-4">The Team</p>
        <h1 className="text-4xl font-light text-white/90 mb-6">Who We Are</h1>
        <p className="text-lg text-white/45 leading-relaxed">
          Collective is a small independent studio at the intersection of technology and culture. We write about systems and ideas, make music that doesn't ask for your attention, and document the people doing interesting work. We're fully independent — no investors, no algorithms to feed, no editorial calendar handed down from above.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {team.map((member) => (
          <div key={member.id} className="flex gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white/5 shrink-0">
              <Image
                src={member.avatarUrl}
                alt={member.fullName}
                fill
                className="object-cover opacity-80"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-medium text-white/90 mb-0.5">{member.fullName}</h2>
              <p className="text-xs tracking-widest uppercase text-white/35 mb-3">{member.role}</p>
              <p className="text-sm text-white/45 leading-relaxed mb-4">{member.bio}</p>

              {/* Contact links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${member.email}`}
                  className="text-xs text-white/35 hover:text-white/70 transition-colors"
                  title="Email"
                >
                  ✉ {member.email}
                </a>
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="text-xs text-white/35 hover:text-white/70 transition-colors"
                    title="Phone"
                  >
                    ☎ {member.phone}
                  </a>
                )}
                {member.gitHub && (
                  <a
                    href={member.gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/35 hover:text-white/70 transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/35 hover:text-white/70 transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
