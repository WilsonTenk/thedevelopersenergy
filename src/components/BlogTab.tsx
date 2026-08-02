import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';
import { SITE_IMAGES } from '../data/imageData';
import { HorizontalImageBanner } from './HorizontalImageBanner';
import {
  Search,
  Clock,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Mail,
  CheckCircle2,
  BookOpen,
  Share2,
  Copy,
  Check,
  Linkedin,
  Twitter,
  MessageCircle,
  Tag
} from 'lucide-react';

interface BlogTabProps {
  onOpenQuoteModal: (service?: string) => void;
}

export const BlogTab: React.FC<BlogTabProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const categories = [
    'All',
    'Commodities & Trade',
    'Policy & Geopolitics',
    'Tech & Innovation',
    'Energy Transition',
    'Downstream Logistics',
  ];

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput('');
    }
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    });
  };

  const handleShareSocial = (platform: 'linkedin' | 'twitter' | 'whatsapp' | 'native') => {
    if (!activePost) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${activePost.title} - The Developers Energy Journal`);

    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    } else if (platform === 'native') {
      if (navigator.share) {
        navigator.share({
          title: activePost.title,
          text: activePost.excerpt,
          url: window.location.href,
        }).catch(() => {});
      } else {
        handleCopyLink();
      }
    }
  };

  // If reading an article, render single-page article view
  if (activePost) {
    const relatedPosts = BLOG_POSTS.filter((p) => p.id !== activePost.id).slice(0, 2);

    return (
      <div className="bg-white min-h-screen pb-24 animate-in fade-in duration-200">
        {/* Sticky Top Article Navbar */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200 py-3 px-4 sm:px-8 flex items-center justify-between">
          <button
            onClick={() => {
              setActivePost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal Catalog</span>
          </button>

          {/* Social Share Bar */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-bold text-neutral-500 mr-1">Share Article:</span>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black transition-colors flex items-center gap-1.5 px-3 text-xs font-bold"
              title="Copy link"
            >
              {linkCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden md:inline">Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleShareSocial('linkedin')}
              className="p-2 rounded-full bg-neutral-100 hover:bg-blue-50 text-neutral-700 hover:text-blue-600 transition-colors"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleShareSocial('twitter')}
              className="p-2 rounded-full bg-neutral-100 hover:bg-sky-50 text-neutral-700 hover:text-sky-500 transition-colors"
              title="Share on X / Twitter"
            >
              <Twitter className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleShareSocial('whatsapp')}
              className="p-2 rounded-full bg-neutral-100 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-600 transition-colors"
              title="Share via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SINGLE ARTICLE PAGE CONTENT CONTAINER */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
          {/* Article Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3.5 py-1.5 rounded-full font-extrabold bg-black text-white uppercase tracking-wider">
                {activePost.category}
              </span>
              <span className="font-mono text-neutral-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-black" />
                {activePost.date}
              </span>
              <span className="font-mono text-neutral-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-black" />
                {activePost.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-tight tracking-tight">
              {activePost.title}
            </h1>

            {activePost.subtitle && (
              <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-medium">
                {activePost.subtitle}
              </p>
            )}

            {/* Author Profile Card */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                  {activePost.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-black">{activePost.author.name}</div>
                  <div className="text-xs text-neutral-500">{activePost.author.role}</div>
                </div>
              </div>

              <button
                onClick={() => onOpenQuoteModal(`Advisory with ${activePost.author.name}: ${activePost.title}`)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold text-white bg-black hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <span>Consult Author</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* High-Resolution Article Thumbnail Image */}
          {activePost.imageUrl && (
            <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-xl max-h-[460px] relative group">
              <img
                src={activePost.imageUrl}
                alt={activePost.title}
                className="w-full h-full object-cover max-h-[460px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          )}

          {/* Executive Summary Quote Box */}
          <div className="p-6 rounded-3xl bg-neutral-50 border-l-4 border-black text-neutral-800 text-sm sm:text-base italic leading-relaxed shadow-sm">
            &ldquo;{activePost.excerpt}&rdquo;
          </div>

          {/* Article Body Paragraphs */}
          <div className="space-y-6 text-neutral-800 text-base leading-relaxed tracking-normal">
            {activePost.content.map((paragraph, idx) => (
              <p key={idx} className="first-letter:text-3xl first-letter:font-extrabold first-letter:mr-1 first-letter:text-black">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-neutral-200 space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-black" />
              <span>Article Topics & Keywords</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activePost.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Share & Consultation Banner */}
          <div className="p-8 rounded-3xl bg-black text-white border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-extrabold text-white">Need Customized Advisory on this Subject?</h3>
              <p className="text-xs text-neutral-300">
                Discuss physical off-taking models, trade finance structures, or terminal logistics with our strategy desk.
              </p>
            </div>
            <button
              onClick={() => onOpenQuoteModal(`Advisory Desk: ${activePost.title}`)}
              className="px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors shrink-0 shadow-lg"
            >
              Consult Advisory Desk
            </button>
          </div>

          {/* Related Articles Section */}
          <div className="pt-12 border-t border-neutral-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-black tracking-tight">
                Recommended Editorials
              </h3>
              <button
                onClick={() => {
                  setActivePost(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-extrabold uppercase tracking-wider text-black hover:underline flex items-center gap-1"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setActivePost(post);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-neutral-50 border border-neutral-200 rounded-3xl overflow-hidden hover:border-black transition-all cursor-pointer group flex flex-col justify-between"
                >
                  {post.imageUrl && (
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold bg-black text-white uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="font-mono">{post.date}</span>
                      <span>&bull;</span>
                      <span className="font-mono">{post.readTime}</span>
                    </div>

                    <h4 className="text-lg font-bold text-black group-hover:text-neutral-600 transition-colors leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-extrabold text-black uppercase tracking-wider">
                    <span>Read Editorial</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  // DEFAULT MAIN CATALOG VIEW
  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* PAGE HEADER */}
      <section className="bg-white py-14 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-extrabold uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>Energy Desk Journal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight">
            Blog & Thought Leadership
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            In-depth commentary, technical briefs, and strategic perspectives on West African hydrocarbon markets, port logistics, and energy transition dynamics.
          </p>
        </div>
      </section>

      {/* FEATURED BLOG POST HERO CARD WITH THUMBNAIL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => {
            setActivePost(featuredPost);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-neutral-50 border border-neutral-200 rounded-3xl overflow-hidden cursor-pointer group hover:border-black transition-all shadow-xl grid grid-cols-1 lg:grid-cols-12"
        >
          {featuredPost.imageUrl && (
            <div className="lg:col-span-5 h-64 lg:h-auto relative overflow-hidden">
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full font-extrabold bg-black text-white text-xs uppercase tracking-wider shadow-md">
                  FEATURED EDITORIAL
                </span>
              </div>
            </div>
          )}

          <div className={`p-8 lg:p-12 flex flex-col justify-between space-y-6 ${featuredPost.imageUrl ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-neutral-500 font-mono text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-black" />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-black" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black group-hover:text-neutral-600 transition-colors leading-tight">
                {featuredPost.title}
              </h2>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {featuredPost.subtitle || featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                  {featuredPost.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-black">{featuredPost.author.name}</div>
                  <div className="text-[11px] text-neutral-500">{featuredPost.author.role}</div>
                </div>
              </div>

              <button className="px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center gap-2 self-start sm:self-auto shadow-md">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH BENTO BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-neutral-50 p-4 rounded-3xl border border-neutral-200">
          {/* Category Pill Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blog topics or tags..."
              className="w-full bg-white border border-neutral-300 text-black text-xs rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        {/* POSTS GRID WITH THUMBNAILS */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setActivePost(post);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-neutral-50 border border-neutral-200 rounded-3xl overflow-hidden hover:border-black transition-all cursor-pointer group flex flex-col justify-between"
              >
                {/* Thumbnail Image Header */}
                {post.imageUrl && (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold bg-black text-white uppercase tracking-wider shadow-sm">
                      {post.category}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {!post.imageUrl && (
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-black text-white uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="font-mono text-[11px] text-neutral-500">{post.readTime}</span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-black group-hover:text-neutral-600 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-neutral-600 border border-neutral-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
                  <span className="font-mono text-[11px] text-neutral-500">{post.date}</span>
                  <span className="text-black font-extrabold flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-50 rounded-3xl border border-neutral-200 text-neutral-500">
            <BookOpen className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm">No blog posts found matching your filter or query.</p>
          </div>
        )}
      </section>

      {/* 1440px x 500px HORIZONTAL IMAGE HOLDER */}
      <HorizontalImageBanner
        imageUrl={SITE_IMAGES.horizontalBanners.blogEditorial}
        badgeText="ENERGY DESK THOUGHT LEADERSHIP"
        title="West African Oil & Gas Strategic Perspectives"
        subtitle="Exploring Platts-aligned pricing benchmarks, Ghana crude production streams, port congestion mitigation, and energy transition finance."
        stats={[
          { label: 'Published Editorials', value: '45+ Briefs' },
          { label: 'Monthly Readers', value: '12,000+' },
          { label: 'Industry Citation', value: 'Top Tier' },
        ]}
        ctaText="Subscribe to Briefings"
        onCtaClick={() => {
          const form = document.querySelector('form');
          if (form) form.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* NEWSLETTER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white border border-neutral-800 rounded-3xl p-8 lg:p-12 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-white">Subscribe to Energy Desk Blog Briefings</h3>
            <p className="text-neutral-300 text-xs sm:text-sm mt-1">
              Receive new blog articles, market commentary, and West African petroleum logistics updates in your inbox.
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Subscribed successfully! You'll receive our upcoming editorials.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter corporate email..."
                className="flex-1 bg-neutral-900 border border-neutral-700 text-white text-xs rounded-full px-5 py-3 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-7 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
