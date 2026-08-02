import React from 'react';
import { LeaderboardExecutive, MilestoneLeaderboardItem } from '../data/leaderboardData';
import {
  X,
  Linkedin,
  Twitter,
  Mail,
  Crown,
  Medal,
  Award,
  Trophy,
  CheckCircle2,
  Building2,
  MapPin,
  GraduationCap,
  Briefcase,
  ExternalLink,
  User
} from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  executive?: LeaderboardExecutive | null;
  milestone?: MilestoneLeaderboardItem | null;
  onContactExecutive?: (name: string) => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  executive,
  milestone,
  onContactExecutive
}) => {
  if (!isOpen || (!executive && !milestone)) return null;

  const getRankBadgeIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-amber-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-slate-300" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-neutral-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl text-white overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-black shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
              {executive ? `Executive Director Profile · Rank #${executive.rank}` : `Transaction Milestone · Rank #${milestone?.rank}`}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* EXECUTIVE VIEW */}
          {executive && (
            <>
              {/* Executive Hero Row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-neutral-800 text-center sm:text-left">
                {/* Photo Holder / Empty Image Holder */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-neutral-700 bg-neutral-800 shadow-xl flex items-center justify-center">
                    {executive.imageUrl ? (
                      <img
                        src={executive.imageUrl}
                        alt={executive.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-black text-white p-4 text-center border border-neutral-700">
                        <User className="w-9 h-9 text-neutral-400 mb-1" />
                        <span className="text-base font-extrabold tracking-widest font-mono text-neutral-200">
                          {executive.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-400 mt-0.5 uppercase tracking-wider">
                          Executive Portrait
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-black border border-neutral-700 rounded-xl px-2.5 py-1 flex items-center gap-1 shadow-md">
                    {getRankBadgeIcon(executive.rank)}
                    <span className="text-xs font-mono font-bold text-white">#{executive.rank}</span>
                  </div>
                </div>

                {/* Main Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {executive.name}
                    </h2>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-black font-mono">
                      {executive.division}
                    </span>
                  </div>

                  <p className="text-sm font-bold uppercase tracking-wider text-neutral-300">
                    {executive.role}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-neutral-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4 text-neutral-500" />
                      <span>{executive.experienceYears} Years Industry Tenure</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span>{executive.location}</span>
                    </span>
                  </div>

                  {/* Social & Contact Links */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-3">
                    {executive.linkedinUrl && (
                      <a
                        href={executive.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn Profile</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}

                    {executive.twitterUrl && (
                      <a
                        href={executive.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-200 hover:bg-white hover:text-black text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                        <span>Twitter / X</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}

                    {executive.email && (
                      <a
                        href={`mailto:${executive.email}`}
                        className="px-3.5 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-200 hover:bg-white hover:text-black text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{executive.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black border border-neutral-800 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                    Track Record Volume
                  </span>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {executive.dealVolumeMetric}
                  </div>
                  <p className="text-xs text-neutral-400">Total trade value facilitated</p>
                </div>

                <div className="bg-black border border-neutral-800 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                    Reliability Rating
                  </span>
                  <div className="text-xl font-extrabold text-emerald-400 font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{executive.reliabilityScore}</span>
                  </div>
                  <p className="text-xs text-neutral-400">NPA & International Audit standard</p>
                </div>
              </div>

              {/* Biography Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-white" />
                  <span>Executive Biography & Industry Leadership</span>
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed bg-black/60 border border-neutral-800 p-5 rounded-2xl">
                  {executive.fullBio}
                </p>
              </div>

              {/* Featured Achievement Callout */}
              <div className="bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                  <Crown className="w-4 h-4" />
                  <span>Key Featured Achievement</span>
                </div>
                <p className="text-sm font-bold text-white">
                  "{executive.featuredAchievement}"
                </p>
              </div>

              {/* Key Projects */}
              {executive.keyProjects && executive.keyProjects.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-neutral-400">
                    Notable Originations & Projects Led:
                  </h3>
                  <div className="space-y-2">
                    {executive.keyProjects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="bg-black/80 border border-neutral-800 rounded-xl p-3.5 text-xs text-neutral-200 flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-md bg-neutral-800 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Credentials */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 uppercase">
                  <GraduationCap className="w-4 h-4 text-white" />
                  <span>Academic Qualifications & Professional Credentials</span>
                </div>
                <p className="text-xs text-neutral-300 font-medium">
                  {executive.education}
                </p>
              </div>

              {/* Specialty Tags */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 block">
                  Core Technical Specialties:
                </span>
                <div className="flex flex-wrap gap-2">
                  {executive.specialty.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1 rounded-lg bg-black border border-neutral-800 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* MILESTONE VIEW */}
          {milestone && (
            <>
              <div className="space-y-4 pb-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-white text-black font-mono">
                    {milestone.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 font-bold">
                    {milestone.year}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {milestone.dealTitle}
                </h2>

                <p className="text-sm text-neutral-300 leading-relaxed bg-black/60 border border-neutral-800 p-5 rounded-2xl">
                  {milestone.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black border border-neutral-800 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                    Valuation / Capacity
                  </span>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {milestone.volumeOrValue}
                  </div>
                  <p className="text-xs text-neutral-400">{milestone.clientSegment}</p>
                </div>

                <div className="bg-black border border-neutral-800 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                    Location & Impact Rank
                  </span>
                  <div className="text-xl font-extrabold text-emerald-400 font-mono">
                    {milestone.impactScore}
                  </div>
                  <p className="text-xs text-neutral-400">{milestone.location}</p>
                </div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">Lead Executive Architect</span>
                  <span className="text-sm font-bold text-white">{milestone.leadExecutive}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs">
                  TDE
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="p-6 border-t border-neutral-800 bg-black flex flex-wrap items-center justify-between gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-neutral-800 hover:bg-neutral-900 text-xs font-bold text-neutral-300 transition-colors"
          >
            Close Profile
          </button>

          {executive && onContactExecutive && (
            <button
              onClick={() => {
                onClose();
                onContactExecutive(executive.name);
              }}
              className="px-7 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-extrabold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <span>Schedule Direct Meeting with {executive.name.split(' ')[0]}</span>
              <Mail className="w-4 h-4 text-black" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
