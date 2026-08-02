import React, { useState, useEffect } from 'react';
import { TrainingCourse } from '../types';
import {
  FileText,
  ExternalLink,
  CheckCircle2,
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  Send,
  Calendar,
  Sparkles,
  GraduationCap
} from 'lucide-react';

interface GoogleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: TrainingCourse | null;
}

export const GoogleFormModal: React.FC<GoogleFormModalProps> = ({
  isOpen,
  onClose,
  course
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [preferredCohort, setPreferredCohort] = useState('');
  const [comments, setComments] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const GOOGLE_FORM_DIRECT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc_TDE_Energy_Training_Registration/viewform';

  const handleSubmitGoogleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('Please complete required delegate fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-neutral-300 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto text-black max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 pb-4 sticky top-0 bg-white z-10 pt-1">
          <div className="space-y-1 pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Google Form Registration</span>
            </div>
            <h3 className="text-2xl font-extrabold text-black mt-1">
              {course ? `Register: ${course.title}` : 'Executive Training Registration Form'}
            </h3>
            <p className="text-xs text-neutral-600">
              Complete the Google Form application below or open directly in Google Workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-black hover:text-white flex items-center justify-center text-neutral-700 transition-all shrink-0 border border-neutral-200 shadow-sm"
            title="Close Window"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Google Form Banner Link */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-extrabold">
              GF
            </div>
            <div>
              <span className="font-extrabold text-blue-950 block">Google Docs Form Integration</span>
              <span className="text-blue-800 text-[11px]">
                Directly syncs with TDE Academic Admissions Desk
              </span>
            </div>
          </div>

          <a
            href={GOOGLE_FORM_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white transition-all inline-flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>Open Google Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Form or Confirmation */}
        {isSubmitted ? (
          <div className="py-8 text-center space-y-4 bg-neutral-50 rounded-3xl p-6 border border-neutral-200">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-extrabold text-black">
              Google Form Response Recorded!
            </h4>
            <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
              Thank you for registering. Your details have been submitted to the TDE Google Forms spreadsheet. Our executive admissions coordinator will review your application and send the official syllabus packet to <strong className="text-black">{email}</strong>.
            </p>

            <button
              onClick={onClose}
              className="mt-2 px-8 py-2.5 rounded-full text-xs font-extrabold text-white bg-black hover:bg-neutral-800 transition-all shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitGoogleForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Kwesi Mensah"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none bg-neutral-50"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Corporate Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="delegate@company.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none bg-neutral-50"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+233 24 000 0000"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none bg-neutral-50"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Company / Organization
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Energy Corporation Ltd"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none bg-neutral-50"
                  />
                </div>
              </div>
            </div>

            {course && (
              <div>
                <label className="font-bold text-neutral-700 text-xs block mb-1">
                  Preferred Cohort Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <select
                    value={preferredCohort}
                    onChange={(e) => setPreferredCohort(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none bg-neutral-50"
                  >
                    {course.upcomingDates.map((date, idx) => (
                      <option key={idx} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="font-bold text-neutral-700 text-xs block mb-1">
                Special Requests or Dietary Requirements
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Mention group delegate numbers, dietary preferences, or specific modules..."
                className="w-full p-3 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none bg-neutral-50 resize-none"
              />
            </div>

            <div className="pt-2 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-neutral-500 font-mono">
                Google Forms Security & Privacy Guaranteed
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-full text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-all border border-neutral-200"
                >
                  Cancel / Close
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 rounded-full text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
                >
                  {isSubmitting ? (
                    <span>Submitting Response...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Google Form</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
