import React, { useState, useEffect } from 'react';
import { INSIGHT_ARTICLES } from '../data/energyData';
import { InsightArticle } from '../types';
import { SITE_IMAGES } from '../data/imageData';
import { HorizontalImageBanner } from './HorizontalImageBanner';
import {
  Search,
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  Mail,
  CheckCircle2,
  Download,
  ArrowLeft,
  Upload,
  User,
  Printer,
  FileUp,
  ExternalLink,
  ShieldAlert,
  Check
} from 'lucide-react';

interface InsightsTabProps {
  onSelectArticle: (article: InsightArticle) => void;
  selectedArticleProp?: InsightArticle | null;
}

export const InsightsTab: React.FC<InsightsTabProps> = ({ onSelectArticle, selectedArticleProp }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subscribed, setSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');
  
  // Single page full article reading state
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(selectedArticleProp || null);

  // PDF upload & view state
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string | null>(null);
  const [uploadedPdfName, setUploadedPdfName] = useState<string | null>(null);
  const [uploadedPdfSize, setUploadedPdfSize] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (selectedArticleProp) {
      setActiveArticle(selectedArticleProp);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedArticleProp]);

  const categories = ['All', 'Market Analysis', 'Policy Watch', 'Industry Report', 'Supply & Logistics'];

  const filteredArticles = INSIGHT_ARTICLES.filter((article) => {
    const matchesCat = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenArticle = (article: InsightArticle) => {
    setActiveArticle(article);
    setUploadedPdfUrl(null);
    setUploadedPdfName(null);
    setUploadedPdfSize(null);
    onSelectArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveArticle(null);
    setUploadedPdfUrl(null);
    setUploadedPdfName(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate a valid PDF Blob URL for the article if no custom PDF was uploaded
  const generatePdfBlobForArticle = (article: InsightArticle): string => {
    const cleanTitle = article.title.replace(/[^\w\s-.,]/g, '');
    const cleanAuthor = article.author.replace(/[^\w\s-.,]/g, '');
    const cleanExcerpt = article.excerpt.replace(/[^\w\s-.,]/g, '');
    const cleanCategory = article.category.replace(/[^\w\s-.,]/g, '');
    const cleanDate = article.date.replace(/[^\w\s-.,]/g, '');
    const p1 = (article.content[0] || '').replace(/[^\w\s-.,]/g, '');
    const p2 = (article.content[1] || '').replace(/[^\w\s-.,]/g, '');

    const pdfString = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kinds [ /Page ] /Count 1 /Kids [ 3 0 R ] >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [ 0 0 612 792 ] /Contents 5 0 R >>
endobj
4 0 obj
<< /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >>
endobj
5 0 obj
<< /Length 650 >>
stream
BT
/F1 16 Tf
50 740 Td
(THE DEVELOPERS ENERGY LIMITED) Tj
0 -20 Td
/F1 12 Tf
(EXECUTIVE MARKET INTELLIGENCE REPORT) Tj
0 -25 Td
/F1 14 Tf
(${cleanTitle.substring(0, 55)}) Tj
0 -18 Td
/F2 9 Tf
(Category: ${cleanCategory}  |  Published: ${cleanDate}  |  Author: ${cleanAuthor}) Tj
0 -25 Td
/F1 11 Tf
(EXECUTIVE BRIEF:) Tj
0 -15 Td
/F2 9.5 Tf
(${cleanExcerpt.substring(0, 90)}) Tj
0 -25 Td
/F1 11 Tf
(KEY REPORT ANALYSIS:) Tj
0 -15 Td
/F2 9.5 Tf
(${p1.substring(0, 90)}) Tj
0 -15 Td
(${p2.substring(0, 90)}) Tj
0 -30 Td
/F2 8 Tf
(Confidential Document - The Developers Energy Limited Advisory Desk - Accra, Ghana) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000125 00000 n 
0000000223 00000 n 
0000000350 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1000
%%EOF`;

    const blob = new Blob([pdfString], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert('Please select a valid PDF file.');
        return;
      }
      const url = URL.createObjectURL(file);
      setUploadedPdfUrl(url);
      setUploadedPdfName(file.name);
      setUploadedPdfSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    }
  };

  const handleDownloadPdf = () => {
    if (uploadedPdfUrl && uploadedPdfName) {
      const link = document.createElement('a');
      link.href = uploadedPdfUrl;
      link.download = uploadedPdfName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (activeArticle) {
      const pdfUrl = generatePdfBlobForArticle(activeArticle);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `The_Developers_Energy_${activeArticle.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setSubEmail('');
    }
  };

  // --------------------------------------------------------------------------
  // SINGLE PAGE ARTICLE READER VIEW
  // --------------------------------------------------------------------------
  if (activeArticle) {
    const currentPdfDisplayUrl = uploadedPdfUrl || generatePdfBlobForArticle(activeArticle);

    return (
      <div className="space-y-12 pb-20 bg-white text-black min-h-screen">
        {/* Top Header & Breadcrumb Toolbar */}
        <section className="bg-neutral-900 text-white py-10 border-b border-neutral-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-white hover:text-black text-xs font-bold transition-all text-neutral-200 border border-neutral-700 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Reports & Insights</span>
            </button>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-white text-black uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                  {activeArticle.date}
                </span>
                <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-300" />
                  {activeArticle.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {activeArticle.title}
              </h1>

              <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
                <User className="w-4 h-4 text-neutral-300" />
                <span>Issued by {activeArticle.author} &bull; Advisory Desk</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Executive Summary Callout */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-50 border-l-8 border-black text-sm sm:text-base text-neutral-900 leading-relaxed font-medium shadow-sm space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-500 block">
              Executive Summary & Brief
            </span>
            <p>&ldquo;{activeArticle.excerpt}&rdquo;</p>
          </div>

          {/* PDF HUB SECTION: UPLOAD, DISPLAY & DOWNLOAD */}
          <section className="bg-neutral-50 border border-neutral-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[10px] font-extrabold uppercase tracking-wider mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF Document Viewer & File Hub</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-black">
                  {uploadedPdfName ? uploadedPdfName : `${activeArticle.title} (PDF Version)`}
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  {uploadedPdfName
                    ? `Uploaded Custom Document (${uploadedPdfSize})`
                    : 'Official Report Document available for inline viewing and download.'}
                </p>
              </div>

              {/* Action buttons: Upload & Download */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="cursor-pointer px-4 py-2.5 rounded-full text-xs font-extrabold bg-white hover:bg-neutral-100 text-black border border-neutral-300 transition-all flex items-center gap-2 shadow-sm">
                  <Upload className="w-4 h-4 text-black" />
                  <span>Upload PDF File</span>
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleDownloadPdf}
                  className="px-5 py-2.5 rounded-full text-xs font-extrabold text-white bg-black hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-md active:scale-95"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Downloaded PDF!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-white" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Embedded Live PDF Display Viewer */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-neutral-600 bg-neutral-200/60 px-4 py-2 rounded-t-2xl border border-neutral-300 border-b-0">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>Document Stream Active</span>
                </span>
                <span>Format: PDF / 600DPI Print Specification</span>
              </div>

              <div className="w-full h-[600px] sm:h-[700px] rounded-b-2xl border border-neutral-300 bg-neutral-900 overflow-hidden shadow-inner">
                <iframe
                  src={currentPdfDisplayUrl}
                  title="Report PDF Viewer"
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          </section>

          {/* Key Executive Takeaways */}
          <section className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-lg font-extrabold text-black uppercase tracking-wide flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-black" />
              <span>Key Executive Takeaways</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {activeArticle.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-neutral-800 leading-relaxed font-medium">{takeaway}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Full Content Paragraphs */}
          <section className="space-y-6 text-neutral-800 text-base leading-relaxed max-w-4xl">
            <h3 className="text-xl font-extrabold text-black border-b border-neutral-200 pb-3">
              Detailed Market Intelligence Analysis
            </h3>

            {activeArticle.content.map((paragraph, idx) => (
              <p key={idx} className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Visual Chart Data if available */}
          {activeArticle.chartData && (
            <section className="bg-neutral-50 p-6 sm:p-8 rounded-3xl border border-neutral-200 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                Benchmark Price Trajectory (USD/bbl)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {activeArticle.chartData.map((d, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-neutral-200 text-center shadow-sm">
                    <span className="text-[10px] text-neutral-500 font-bold uppercase block">{d.label}</span>
                    <span className="text-xl font-extrabold text-black font-mono mt-1 block">${d.value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Return & Advisory Bar */}
          <div className="p-6 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <h4 className="text-lg font-extrabold text-white">Need Customized Advisory or Market Allocation?</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Consult with The Developers Energy trade desk regarding bespoke hedging or bulk allocations.
              </p>
            </div>

            <button
              onClick={handleBackToList}
              className="px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all shrink-0"
            >
              Back to Reports List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // CATALOG & GRID VIEW OF ALL REPORTS
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* PAGE HEADER */}
      <section className="bg-white py-14 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-white bg-black px-3.5 py-1.5 rounded-full inline-block">
            Market Intelligence
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">
            Insights & Reports
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Petroleum market analysis, price trend monitoring, regulatory shifts, and supply chain briefs from The Developers Energy advisory desk.
          </p>
        </div>
      </section>

      {/* FILTER & SEARCH BENTO BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-neutral-50 p-4 rounded-3xl border border-neutral-200">
          {/* Categories Pill Buttons */}
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

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports or topics..."
              className="w-full bg-white border border-neutral-300 text-black text-xs rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        {/* ARTICLES BENTO GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleOpenArticle(article)}
                className="bg-neutral-50 border border-neutral-200 rounded-3xl p-7 hover:border-black transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-black text-white uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-500">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-black group-hover:text-neutral-600 transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed mb-5 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-2 text-xs text-neutral-500">
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-600">
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    {article.date}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-black font-extrabold flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                      <span>Full Read & PDF</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-50 rounded-3xl border border-neutral-200 text-neutral-500">
            <FileText className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm">No articles match your search criteria.</p>
          </div>
        )}
      </section>

      {/* 1440px x 500px HORIZONTAL IMAGE HOLDER */}
      <HorizontalImageBanner
        imageUrl={SITE_IMAGES.horizontalBanners.insightsAnalytics}
        badgeText="PLATTS-ALIGNED MARKET ANALYTICS"
        title="High-Precision Market Briefings & Regulatory Intelligence"
        subtitle="Daily price window monitoring, GHS/USD exchange rate hedging analysis, and NPA policy updates tailored for bulk oil distributors and traders."
        stats={[
          { label: 'Intelligence Reports', value: '180+' },
          { label: 'Forecast Accuracy', value: '98.4%' },
          { label: 'Subscriber Network', value: '3,500+' },
        ]}
        ctaText="Subscribe to Intelligence"
        onCtaClick={() => {
          const form = document.querySelector('form');
          if (form) form.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* NEWSLETTER SUBSCRIPTION BENTO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white border border-neutral-800 rounded-3xl p-8 lg:p-10 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-white">Receive Bi-Weekly Petroleum Reports</h3>
            <p className="text-neutral-300 text-xs sm:text-sm mt-1">
              Direct market intelligence, price window trends, and NPA regulatory briefings delivered straight to your inbox.
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Subscribed successfully! You will receive our next market bulletin.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
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

