import React, { useState } from 'react';
import { InsightArticle } from '../types';
import { X, Calendar, Clock, User, CheckCircle2, FileText, ArrowRight, Download, Printer, Check } from 'lucide-react';

interface InsightDetailModalProps {
  article: InsightArticle | null;
  onClose: () => void;
  onConsult: (topic?: string) => void;
}

export const InsightDetailModal: React.FC<InsightDetailModalProps> = ({
  article,
  onClose,
  onConsult,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!article) return null;

  const handleDownloadReport = () => {
    const reportText = `================================================================================
THE DEVELOPERS ENERGY LIMITED - EXECUTIVE MARKET INTELLIGENCE REPORT
================================================================================
REPORT TITLE : ${article.title}
CATEGORY     : ${article.category}
PUBLISH DATE : ${article.date} | ${article.readTime}
AUTHOR       : ${article.author}

--------------------------------------------------------------------------------
EXECUTIVE BRIEF & SUMMARY:
"${article.excerpt}"

--------------------------------------------------------------------------------
KEY EXECUTIVE TAKEAWAYS:
${article.keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}

${
  article.chartData
    ? `--------------------------------------------------------------------------------
BENCHMARK PRICE TRAJECTORY (USD/bbl):
${article.chartData.map((d) => `${d.label}: $${d.value}`).join('  |  ')}
`
    : ''
}
--------------------------------------------------------------------------------
FULL REPORT ANALYSIS:
${article.content.join('\n\n')}

--------------------------------------------------------------------------------
CONFIDENTIALITY & DISCLAIMER:
This document is issued by The Developers Energy Limited Advisory Desk.
Contact: info@developersenergy.com | Accra, Ghana | West Africa.
================================================================================
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `The_Developers_Energy_Report_${article.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-neutral-300 rounded-3xl max-w-3xl w-full p-6 sm:p-10 space-y-6 max-h-[92vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 text-black shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-black text-white uppercase tracking-wider inline-block">
              {article.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-2 leading-tight">
              {article.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-black" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-black" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-neutral-500" />
                {article.author}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-neutral-100 border border-neutral-200">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
            <FileText className="w-4 h-4 text-black" />
            <span>Executive Report Available for Export</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadReport}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-full text-xs font-bold text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Report Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Brief (.TXT)</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-full text-xs font-bold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
              title="Print Report or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-black" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-2xl bg-neutral-50 border-l-4 border-black text-xs sm:text-sm text-neutral-800 italic leading-relaxed">
          &ldquo;{article.excerpt}&rdquo;
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-neutral-700 text-sm leading-relaxed">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Visual Chart Graphic simulation if available */}
        {article.chartData && (
          <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              Benchmark Price Trajectory (USD/bbl)
            </h4>
            <div className="flex items-end justify-between h-32 pt-4 px-2">
              {article.chartData.map((d, i) => {
                const maxVal = 90;
                const minVal = 70;
                const heightPct = Math.min(100, Math.max(20, ((d.value - minVal) / (maxVal - minVal)) * 100));
                return (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <span className="text-[10px] text-black font-mono-num font-bold">
                      ${d.value}
                    </span>
                    <div className="w-full max-w-[28px] bg-neutral-200 rounded-t-md overflow-hidden h-24 flex items-end">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className="w-full bg-black rounded-t-md transition-all duration-500"
                      />
                    </div>
                    <span className="text-[10px] text-neutral-500">{d.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Key Takeaways */}
        <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black">
            Key Executive Takeaways:
          </h4>
          <div className="space-y-2 text-xs text-neutral-700">
            {article.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300"
          >
            Close Report
          </button>
          <button
            onClick={() => {
              const title = article.title;
              onClose();
              onConsult(`Advisory on: ${title}`);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>Consult Advisory Desk on this Report</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
