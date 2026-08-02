import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HorizontalImageBannerProps {
  imageUrl: string;
  badgeText?: string;
  title: string;
  subtitle?: string;
  stats?: { label: string; value: string }[];
  ctaText?: string;
  onCtaClick?: () => void;
  heightClassName?: string;
}

export const HorizontalImageBanner: React.FC<HorizontalImageBannerProps> = ({
  imageUrl,
  badgeText,
  title,
  subtitle,
  stats,
  ctaText,
  onCtaClick,
  heightClassName = 'min-h-[420px] sm:min-h-[500px]',
}) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={`relative w-full ${heightClassName} rounded-3xl overflow-hidden border border-neutral-300 shadow-xl group transition-all bg-black`}
      >
        {/* Background Image with Zoom on Hover */}
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
        />

        {/* Multi-stage Faded Gradient Overlays for High Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />

        {/* Content Overlay Container */}
        <div className="relative z-20 h-full w-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 space-y-6">
          <div className="max-w-2xl space-y-4">
            {badgeText && (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-extrabold uppercase tracking-widest shadow-md">
                {badgeText}
              </span>
            )}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:text-neutral-200 transition-colors">
              {title}
            </h2>

            {subtitle && (
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Bottom Row: Key Statistics & Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/20">
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-neutral-300 uppercase tracking-wider font-semibold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {ctaText && onCtaClick && (
              <button
                onClick={onCtaClick}
                className="self-start sm:self-auto inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 shadow-lg transition-all active:scale-95"
              >
                <span>{ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
