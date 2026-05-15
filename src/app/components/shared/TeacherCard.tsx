import type { ReactNode } from 'react';

interface TeacherCardProps {
  photo?: string;
  nickname: string;
  name: string;
  role: string;
  highlights: ReactNode[];
  gradient?: string;
  accentColor?: string;
}

export function TeacherCard({
  photo,
  nickname,
  name,
  role,
  highlights,
  gradient = 'from-[#ED1C24] to-[#39B54A]',
  accentColor = '#ED1C24',
}: TeacherCardProps) {
  return (
    <div className="relative bg-card border border-border rounded-2xl overflow-hidden hover:border-[#ED1C24]/50 transition-all hover:shadow-xl hover:shadow-[#ED1C24]/10">

      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-8 flex flex-col sm:flex-row gap-8 items-start">

        {/* Photo */}
        <div className="shrink-0 flex flex-col items-center gap-3">
          <div className={`p-[3px] rounded-full bg-gradient-to-br ${gradient} shadow-lg`}
               style={{ boxShadow: `0 0 24px ${accentColor}40` }}>
            {photo ? (
              <img
                src={photo}
                alt={name}
                className="size-28 rounded-full object-cover object-top bg-muted"
              />
            ) : (
              <div className="size-28 rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-foreground">
                {name.charAt(0)}
              </div>
            )}
          </div>
          {/* Nickname badge */}
          <div
            className="px-3 py-1 rounded-full border text-xs font-bold text-center max-w-[140px] leading-tight"
            style={{ borderColor: `${accentColor}60`, color: accentColor, background: `${accentColor}15` }}
          >
            {nickname}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-black text-foreground tracking-tight">{name}</h3>
          <p className="text-sm font-semibold mt-0.5 mb-5" style={{ color: accentColor }}>{role}</p>

          <ul className="space-y-2">
            {highlights.map((point, i) => {
              // Strings (and numbers) get the default bullet rendering.
              // ReactNodes pass through verbatim so the caller can build a richer layout.
              const isPrimitive = typeof point === 'string' || typeof point === 'number';
              if (isPrimitive) {
                return (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span
                      className="mt-1.5 size-1.5 rounded-full shrink-0"
                      style={{ background: accentColor }}
                    />
                    {point}
                  </li>
                );
              }
              return <li key={i} className="text-sm text-muted-foreground">{point}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
